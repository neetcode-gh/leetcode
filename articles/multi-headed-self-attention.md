## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Self-Attention** - The scaled dot-product attention with Q, K, V projections and causal masking, because multi-head attention runs several of these in parallel
- **PyTorch nn.ModuleList** - Managing a list of sub-modules so PyTorch tracks their parameters for gradient computation
- **Tensor Concatenation** - Joining tensors along the feature dimension to combine head outputs

---

## Concept

A single attention head can only learn one type of relationship between tokens. Multi-headed attention fixes this by running several heads in parallel, each with its own Q, K, V projections. Each head can specialize in different patterns.

If the total attention dimension is $d$ and we have $h$ heads, each head operates on dimension $d/h$. This means we are not adding computation; we are splitting the same budget across heads. The process is:

1. Create $h$ heads, each with attention dimension $d/h$.
2. Run each head independently on the same input.
3. Concatenate all head outputs along the feature dimension.

Why does this help? Different heads learn different things. In practice, researchers have observed that some heads learn syntactic relationships (attending to the previous word), some learn semantic relationships (attending to the subject of a sentence), and some learn positional patterns (attending to nearby tokens). A single head would have to compromise between all these patterns; multiple heads can specialize.

The output shape is $(B, T, d)$, the same as a single head with the full dimension. This makes multi-head attention a drop-in replacement for single-head attention.

---

## Solution

### Intuition

Create a list of `SingleHeadAttention` modules, each with attention dimension `attention_dim // num_heads`. Run each head on the same input. Concatenate outputs along the last dimension.

### Implementation

::tabs-start
```python
import torch
import torch.nn as nn
from torchtyping import TensorType

class MultiHeadedSelfAttention(nn.Module):

    def __init__(self, embedding_dim: int, attention_dim: int, num_heads: int):
        super().__init__()
        torch.manual_seed(0)
        self.att_heads = nn.ModuleList()
        for i in range(num_heads):
            self.att_heads.append(self.SingleHeadAttention(embedding_dim, attention_dim // num_heads))

    def forward(self, embedded: TensorType[float]) -> TensorType[float]:
        head_outputs = []
        for head in self.att_heads:
            head_outputs.append(head(embedded))
        concatenated = torch.cat(head_outputs, dim = 2)
        return torch.round(concatenated, decimals=4)

    class SingleHeadAttention(nn.Module):
        def __init__(self, embedding_dim: int, attention_dim: int):
            super().__init__()
            torch.manual_seed(0)
            self.key_gen = nn.Linear(embedding_dim, attention_dim, bias=False)
            self.query_gen = nn.Linear(embedding_dim, attention_dim, bias=False)
            self.value_gen = nn.Linear(embedding_dim, attention_dim, bias=False)

        def forward(self, embedded: TensorType[float]) -> TensorType[float]:
            k = self.key_gen(embedded)
            q = self.query_gen(embedded)
            v = self.value_gen(embedded)

            scores = q @ torch.transpose(k, 1, 2) # @ is the same as torch.matmul()
            context_length, attention_dim = k.shape[1], k.shape[2]
            scores = scores / (attention_dim ** 0.5)

            lower_triangular = torch.tril(torch.ones(context_length, context_length))
            mask = lower_triangular == 0
            scores = scores.masked_fill(mask, float('-inf'))
            scores = nn.functional.softmax(scores, dim = 2)

            return scores @ v
```
::tabs-end


### Walkthrough

For `embedding_dim = 8`, `attention_dim = 8`, `num_heads = 4`, sequence of 3 tokens:

| Head | Input Shape | Q, K, V Shape | Attention Output |
|---|---|---|---|
| Head 0 | $(B, 3, 8)$ | $(B, 3, 2)$ | $(B, 3, 2)$ |
| Head 1 | $(B, 3, 8)$ | $(B, 3, 2)$ | $(B, 3, 2)$ |
| Head 2 | $(B, 3, 8)$ | $(B, 3, 2)$ | $(B, 3, 2)$ |
| Head 3 | $(B, 3, 8)$ | $(B, 3, 2)$ | $(B, 3, 2)$ |
| Concat | 4 outputs along dim=2 | | $(B, 3, 8)$ |

Each head projects from 8 to 2 dimensions (8/4 = 2), and concatenation restores the full 8 dimensions.

### Time & Space Complexity

- Time: $O(h \cdot T^2 \cdot d/h) = O(T^2 \cdot d)$ where $T$ is sequence length, $d$ is attention dimension, $h$ is heads
- Space: $O(h \cdot T^2 + T \cdot d)$ for attention matrices and output

---

## Common Pitfalls

### Using a Python List Instead of nn.ModuleList

A plain Python list does not register sub-modules with PyTorch. Their parameters will not be updated during training.

::tabs-start
```python
# Wrong: parameters not tracked
self.att_heads = []
for i in range(num_heads):
    self.att_heads.append(SingleHeadAttention(...))

# Correct: nn.ModuleList registers parameters
self.att_heads = nn.ModuleList()
for i in range(num_heads):
    self.att_heads.append(SingleHeadAttention(...))
```
::tabs-end


### Wrong Head Dimension

Each head should get `attention_dim // num_heads`, not `attention_dim`. Using the full dimension means each head is as large as a single-head attention, multiplying computation by $h$.

::tabs-start
```python
# Wrong: each head uses full dimension, total params * h
SingleHeadAttention(embedding_dim, attention_dim)

# Correct: each head uses 1/h of the dimension
SingleHeadAttention(embedding_dim, attention_dim // num_heads)
```
::tabs-end


---

## In the GPT Project

This becomes `model/multi_head_attention.py`. The GPT model uses multi-headed attention in every transformer block. GPT-2 Small uses 12 heads with model dimension 768, so each head operates on 64 dimensions.

---

## Key Takeaways

- Multi-headed attention runs several attention heads in parallel, each specializing in different relationship patterns, without increasing total computation over a single large head.
- Each head operates on a $d/h$ dimensional subspace, and concatenation reconstructs the full dimension, making it a drop-in replacement for single-head attention.
- Using `nn.ModuleList` (not a plain Python list) is essential so PyTorch can track and update each head's parameters during training.
