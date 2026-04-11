## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Self-Attention** - KV-Cache optimizes the attention computation, so you need to understand Q, K, V projections and the scaled dot-product formula
- **Autoregressive Generation** - The cache only helps during generation (one new token at a time), not during the initial prompt processing
- **Tensor Concatenation** - The cache grows by concatenating new K, V along the sequence dimension with `torch.cat`

---

## Concept

During autoregressive generation, each new token requires attending to all previous tokens. Without caching, this means recomputing K and V for the entire context at every step -- quadratic total work. KV-Cache stores the K and V tensors from previous steps and only computes new K, V for the current token, then concatenates.

The key insight: K and V for previous tokens do not change between generation steps. Only Q needs to be computed fresh for the new token. The cache turns an $O(N^2)$ total cost (across $N$ generation steps) into $O(N)$ per step.

---

## Solution

### Intuition

The `KVCache` class stores K and V tensors and grows them by concatenating along the sequence dimension. The `CachedAttention` module projects the new input into Q, K, V, updates the cache with the new K and V, then computes attention using Q (from just the new token) against the full cached K and V (from all tokens so far).

### Implementation

::tabs-start
```python
import torch
import torch.nn as nn
from typing import Tuple, Optional

class KVCache:
    def __init__(self):
        self.cache_k: Optional[torch.Tensor] = None
        self.cache_v: Optional[torch.Tensor] = None

    def update(self, new_k: torch.Tensor, new_v: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
        if self.cache_k is None:
            self.cache_k = new_k
            self.cache_v = new_v
        else:
            self.cache_k = torch.cat([self.cache_k, new_k], dim=1)
            self.cache_v = torch.cat([self.cache_v, new_v], dim=1)
        return self.cache_k, self.cache_v

    def clear(self):
        self.cache_k = None
        self.cache_v = None

class CachedAttention(nn.Module):
    def __init__(self, model_dim: int):
        super().__init__()
        torch.manual_seed(0)
        self.q_proj = nn.Linear(model_dim, model_dim, bias=False)
        self.k_proj = nn.Linear(model_dim, model_dim, bias=False)
        self.v_proj = nn.Linear(model_dim, model_dim, bias=False)

    def forward(self, x: torch.Tensor, kv_cache: Optional[KVCache] = None) -> Tuple[torch.Tensor, KVCache]:
        q = self.q_proj(x)
        k = self.k_proj(x)
        v = self.v_proj(x)

        if kv_cache is None:
            kv_cache = KVCache()

        full_k, full_v = kv_cache.update(k, v)

        # Scaled dot-product attention
        scores = (q @ full_k.transpose(-2, -1)) * (full_k.shape[-1] ** -0.5)
        weights = torch.softmax(scores, dim=-1)
        output = weights @ full_v

        return torch.round(output, decimals=4), kv_cache
```
::tabs-end


### Walkthrough

Generating 3 tokens step by step:

| Step | Input Shape | Cache K Before | Operation | Cache K After |
|---|---|---|---|---|
| 1 | `(1, 1, 4)` | empty | Init cache with $k_1$ | `(1, 1, 4)` |
| 2 | `(1, 1, 4)` | `(1, 1, 4)` | Concat $k_2$: `cat([k_1, k_2], dim=1)` | `(1, 2, 4)` |
| 3 | `(1, 1, 4)` | `(1, 2, 4)` | Concat $k_3$: `cat([k_1, k_2, k_3], dim=1)` | `(1, 3, 4)` |

At step 3, the attention computation is:
- Q shape: `(1, 1, 4)` (only the new token's query)
- K shape: `(1, 3, 4)` (all 3 tokens' keys from cache)
- Scores: `(1, 1, 4) @ (1, 4, 3)` = `(1, 1, 3)` (one attention weight per cached token)
- Output: `(1, 1, 3) @ (1, 3, 4)` = `(1, 1, 4)` (weighted sum of all 3 values)

### Time & Space Complexity

- Time: $O(N \cdot d)$ per generation step, where $N$ is the current sequence length and $d$ is model dimension. Without cache, each step would be $O(N^2 \cdot d)$.
- Space: $O(N \cdot d)$ for the cached K and V tensors, growing linearly with sequence length.

---

## Common Pitfalls

### Concatenating Along the Wrong Dimension

K and V have shape `(batch, seq_len, model_dim)`. The cache grows along `dim=1` (sequence length). Concatenating along `dim=0` (batch) or `dim=2` (model_dim) would corrupt the tensors.

::tabs-start
```python
# Wrong: concatenating along batch dimension
self.cache_k = torch.cat([self.cache_k, new_k], dim=0)

# Correct: concatenating along sequence dimension
self.cache_k = torch.cat([self.cache_k, new_k], dim=1)
```
::tabs-end


### Recomputing K, V for the Full Context

The whole point of the cache is to avoid recomputing K, V for previous tokens. If you project the full context through `k_proj` and `v_proj` at each step, you lose the speedup entirely.

::tabs-start
```python
# Wrong: projecting full context (defeats the purpose)
full_input = torch.cat([previous_tokens, new_token], dim=1)
k = self.k_proj(full_input)  # Recomputes K for all tokens!

# Correct: only project the new token
k = self.k_proj(x)  # x is only the new token
full_k, full_v = kv_cache.update(k, v)  # Cache handles history
```
::tabs-end


---

## In the GPT Project

KV-Cache is the single most important inference optimization. Every production LLM (ChatGPT, Claude, Gemini) uses it. Without it, generating 1000 tokens would require $\sum_{i=1}^{1000} i^2 \approx 333$ million attention operations instead of $\sum_{i=1}^{1000} i \approx 500{,}000$. This module becomes the foundation for further optimizations like Grouped Query Attention and Paged Attention.

---

## Key Takeaways

- KV-Cache stores K and V from previous tokens so they don't need to be recomputed. Only the new token's K and V are computed and appended.
- The cache grows by one entry per generation step via `torch.cat` along the sequence dimension.
- No causal mask is needed in the cached forward pass: the cache naturally contains only past tokens, enforcing causality by construction.
- The memory cost is linear in sequence length ($O(N \cdot d)$ per layer), which is why long context windows are expensive. This motivates optimizations like Grouped Query Attention (fewer KV heads = smaller cache).
