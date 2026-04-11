## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Multi-Head Self-Attention** - GQA modifies how heads share K and V, so understanding standard MHA with independent KV heads per query head is essential
- **KV-Cache** - GQA's primary motivation is reducing the KV-Cache memory footprint during inference, so understanding the cache size problem comes first
- **Tensor Reshaping** - The implementation requires `view`, `transpose`, and `repeat_interleave` to reshape between `(B, T, D)` and `(B, heads, T, head_dim)` formats

---

## Concept

Standard Multi-Head Attention gives every query head its own K and V projections. During inference with KV-Cache, all those K and V tensors must be stored, and the memory cost scales linearly with the number of heads. Grouped Query Attention reduces this by sharing K, V across groups of query heads.

With $h$ query heads and $g$ KV heads, each KV head serves $h/g$ query heads. The key operation is `repeat_interleave`: it expands the $g$ KV heads to $h$ by repeating each one $h/g$ times, making the shapes match for standard attention math. When $g = h$, GQA is identical to MHA. When $g = 1$, it becomes Multi-Query Attention.

---

## Solution

### Intuition

Project x into Q with `num_heads` heads and K, V with `num_kv_heads` heads. Reshape into the multi-head format. Expand K and V by repeating each KV head to match Q's head count. From here, it's standard scaled dot-product attention with a causal mask. Concatenate the heads and apply the output projection.

### Implementation

::tabs-start
```python
import torch
import torch.nn as nn
from torchtyping import TensorType

class GroupedQueryAttention(nn.Module):
    def __init__(self, model_dim: int, num_heads: int, num_kv_heads: int):
        super().__init__()
        torch.manual_seed(0)
        self.num_heads = num_heads
        self.num_kv_heads = num_kv_heads
        self.head_dim = model_dim // num_heads

        self.q_proj = nn.Linear(model_dim, num_heads * self.head_dim, bias=False)
        self.k_proj = nn.Linear(model_dim, num_kv_heads * self.head_dim, bias=False)
        self.v_proj = nn.Linear(model_dim, num_kv_heads * self.head_dim, bias=False)
        self.output_proj = nn.Linear(num_heads * self.head_dim, model_dim, bias=False)

    def forward(self, x: TensorType[float]) -> TensorType[float]:
        B, T, D = x.shape

        # Project to Q, K, V and reshape into heads
        q = self.q_proj(x).view(B, T, self.num_heads, self.head_dim).transpose(1, 2)
        k = self.k_proj(x).view(B, T, self.num_kv_heads, self.head_dim).transpose(1, 2)
        v = self.v_proj(x).view(B, T, self.num_kv_heads, self.head_dim).transpose(1, 2)

        # Expand K, V to match Q's num_heads by repeating each KV head
        repeats = self.num_heads // self.num_kv_heads
        k = k.repeat_interleave(repeats, dim=1)
        v = v.repeat_interleave(repeats, dim=1)

        # Scaled dot-product attention with causal mask
        scores = (q @ k.transpose(-2, -1)) * (self.head_dim ** -0.5)
        mask = torch.tril(torch.ones(T, T, device=x.device))
        scores = scores.masked_fill(mask == 0, float('-inf'))
        weights = torch.softmax(scores, dim=-1)

        out = (weights @ v).transpose(1, 2).contiguous().view(B, T, -1)
        return torch.round(self.output_proj(out), decimals=4)
```
::tabs-end


### Walkthrough

For `model_dim=8`, `num_heads=4`, `num_kv_heads=2`:

| Step | Operation | Shape |
|---|---|---|
| Q projection | `q_proj(x)` then reshape | `(B, 4, T, 2)` -- 4 query heads, head_dim=2 |
| K projection | `k_proj(x)` then reshape | `(B, 2, T, 2)` -- only 2 KV heads |
| V projection | `v_proj(x)` then reshape | `(B, 2, T, 2)` -- only 2 KV heads |
| Expand K | `repeat_interleave(2, dim=1)` | `(B, 4, T, 2)` -- each KV head repeated 2x |
| Expand V | `repeat_interleave(2, dim=1)` | `(B, 4, T, 2)` -- now matches Q |
| Attention | Standard scaled dot-product | `(B, 4, T, 2)` per head |
| Concat + project | Merge heads, output projection | `(B, T, 8)` |

**Memory savings:** K and V projections produce `num_kv_heads * head_dim = 2 * 2 = 4` values per token instead of `num_heads * head_dim = 4 * 2 = 8`. In the KV-Cache, this halves the memory per layer. For Llama 2 70B (64 query heads, 8 KV heads), the savings are 8x.

### Time & Space Complexity

- Time: $O(T^2 \cdot d)$ for attention (same as MHA, since K, V are expanded before the attention computation)
- Space: $O(g \cdot T \cdot d_h)$ for KV-Cache storage, where $g$ is the number of KV heads and $d_h$ is the head dimension. This is $g/h$ of standard MHA.

---

## Common Pitfalls

### Using `repeat` Instead of `repeat_interleave`

`repeat` tiles the entire tensor, while `repeat_interleave` repeats each element individually. With 2 KV heads and 4 query heads, you want `[KV0, KV0, KV1, KV1]`, not `[KV0, KV1, KV0, KV1]`.

::tabs-start
```python
# Wrong: repeat tiles the whole tensor
k = k.repeat(1, repeats, 1, 1)  # [KV0, KV1, KV0, KV1] -- wrong grouping!

# Correct: repeat_interleave repeats each element
k = k.repeat_interleave(repeats, dim=1)  # [KV0, KV0, KV1, KV1] -- correct groups
```
::tabs-end


### Forgetting the Causal Mask

GQA is used in decoder-only models (GPT, Llama) where tokens must not attend to future positions. Without the lower-triangular mask, the model breaks autoregressive generation.

::tabs-start
```python
# Wrong: no causal mask
weights = torch.softmax(scores, dim=-1)

# Correct: apply causal mask before softmax
mask = torch.tril(torch.ones(T, T, device=x.device))
scores = scores.masked_fill(mask == 0, float('-inf'))
weights = torch.softmax(scores, dim=-1)
```
::tabs-end


### Wrong Reshape Order

The view/transpose sequence matters. Q has `num_heads` heads, but K and V have `num_kv_heads` heads. Using `num_heads` for the K reshape would produce incorrect head dimensions.

::tabs-start
```python
# Wrong: reshaping K with num_heads
k = self.k_proj(x).view(B, T, self.num_heads, self.head_dim)  # Shape mismatch!

# Correct: reshaping K with num_kv_heads
k = self.k_proj(x).view(B, T, self.num_kv_heads, self.head_dim)
```
::tabs-end


---

## In the GPT Project

GQA is the attention variant used by Llama 2/3, Mistral, and Gemma. In a full GPT implementation, you would combine GQA with KV-Cache from the previous problem: the cache stores only `num_kv_heads` worth of K, V per layer (not `num_heads`), giving a direct memory reduction proportional to the head ratio.

---

## Key Takeaways

- GQA shares K and V across groups of query heads, reducing KV-Cache memory by a factor of `num_heads / num_kv_heads` with minimal quality loss.
- `repeat_interleave` is the key operation: it expands each KV head to serve its assigned group of query heads, making the shapes compatible for standard attention.
- GQA generalizes both MHA ($g = h$) and MQA ($g = 1$). Most production models use an intermediate value (e.g., Llama 2 70B uses 64 query heads with 8 KV heads).
- The attention computation after expansion is identical to standard MHA. The savings come entirely from the smaller projection layers and smaller cache.
