## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Matrix Multiplication** - Attention is built from three matrix multiplies: $Q \times K^T$, softmax normalization, and multiplication by $V$
- **Softmax** - Converts raw attention scores into a probability distribution so each token's output is a weighted average of value vectors
- **Word Embeddings** - The input to attention is a sequence of embedding vectors, and the output is a sequence of context-aware embedding vectors

---

## Concept

Self-attention is the mechanism that makes transformers work. It lets each token in a sequence "look at" every other token and compute a weighted sum of their representations. The result is that each token's output vector encodes information from the entire sequence, weighted by relevance.

Each input embedding is projected into three spaces using learned linear transformations:

- **Query** ($Q$): "What am I looking for?"
- **Key** ($K$): "What do I contain?"
- **Value** ($V$): "What information should I pass along?"

The attention formula is:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

$QK^T$ computes a similarity score between every pair of tokens. The score is high when a query and key are aligned (the token is "looking for" what the other token "contains"). Dividing by $\sqrt{d_k}$ prevents the dot products from growing too large as $d_k$ increases, which would push softmax into saturated regions with near-zero gradients.

In a **causal** (decoder-only) transformer like GPT, a lower-triangular mask is applied before softmax: future positions are set to $-\infty$, making their softmax weights zero. This ensures each token can only attend to itself and earlier tokens, which is essential for autoregressive generation where the model predicts one token at a time.

---

## Solution

### Intuition

Project the input into Q, K, V using linear layers. Compute attention scores as the scaled dot product of Q and K. Apply a causal mask. Softmax. Multiply by V to produce context-aware representations.

### Implementation

::tabs-start
```python
import torch
import torch.nn as nn
from torchtyping import TensorType

class SingleHeadAttention(nn.Module):

    def __init__(self, embedding_dim: int, attention_dim: int):
        super().__init__()
        torch.manual_seed(0)
        self.key_gen = nn.Linear(embedding_dim, attention_dim, bias=False)
        self.query_gen = nn.Linear(embedding_dim, attention_dim, bias=False)
        self.value_gen = nn.Linear(embedding_dim, attention_dim, bias=False)

    def forward(self, embedded: TensorType[float]) -> TensorType[float]:
        # Project input into Key, Query, Value spaces
        k = self.key_gen(embedded)   # (B, T, attention_dim)
        q = self.query_gen(embedded) # (B, T, attention_dim)
        v = self.value_gen(embedded) # (B, T, attention_dim)

        # Attention scores: (Q @ K^T) / sqrt(d_k)
        scores = q @ torch.transpose(k, 1, 2)
        context_length, attention_dim = k.shape[1], k.shape[2]
        scores = scores / (attention_dim ** 0.5)

        # Causal mask: prevent attending to future tokens
        lower_triangular = torch.tril(torch.ones(context_length, context_length))
        mask = lower_triangular == 0
        scores = scores.masked_fill(mask, float('-inf'))
        scores = nn.functional.softmax(scores, dim=2)

        return torch.round(scores @ v, decimals=4)
```
::tabs-end


### Walkthrough

For a sequence of 3 tokens with `embedding_dim = 4`, `attention_dim = 2`:

| Step | Operation | Shape |
|---|---|---|
| Project Q, K, V | Linear: $(B, 3, 4) \to (B, 3, 2)$ | 3 matrices, each $(B, 3, 2)$ |
| $QK^T$ | $(B, 3, 2) \times (B, 2, 3)$ | $(B, 3, 3)$ raw scores |
| Scale | Divide by $\sqrt{2} \approx 1.414$ | $(B, 3, 3)$ scaled scores |
| Mask | Upper triangle $\to -\infty$ | Token 0 sees [0], token 1 sees [0,1], token 2 sees [0,1,2] |
| Softmax | Each row becomes probabilities | $(B, 3, 3)$ attention weights |
| Output | Weights $\times$ V | $(B, 3, 2)$ context-aware vectors |

### Time & Space Complexity

- Time: $O(T^2 \cdot d)$ where $T$ is sequence length and $d$ is attention dimension
- Space: $O(T^2)$ for the attention score matrix

---

## Common Pitfalls

### Forgetting to Scale by sqrt(d_k)

Without scaling, large $d_k$ values make dot products large, pushing softmax into saturation where gradients vanish.

::tabs-start
```python
# Wrong: unscaled dot products
scores = q @ torch.transpose(k, 1, 2)
scores = nn.functional.softmax(scores, dim=2)

# Correct: scale by sqrt(d_k)
scores = q @ torch.transpose(k, 1, 2)
scores = scores / (attention_dim ** 0.5)
scores = nn.functional.softmax(scores, dim=2)
```
::tabs-end


### Applying the Mask After Softmax

The mask must be applied before softmax. After softmax, setting values to zero does not produce a valid probability distribution (the remaining values would not sum to 1).

::tabs-start
```python
# Wrong: mask after softmax
scores = nn.functional.softmax(scores, dim=2)
scores = scores.masked_fill(mask, 0)  # row doesn't sum to 1!

# Correct: mask before softmax with -inf
scores = scores.masked_fill(mask, float('-inf'))
scores = nn.functional.softmax(scores, dim=2)
```
::tabs-end


---

## In the GPT Project

This becomes `model/attention.py`. Self-attention is the core of every transformer block. The GPT model stacks multiple transformer blocks, each containing multi-headed self-attention (which runs several of these single-head attention modules in parallel).

---

## Key Takeaways

- Self-attention computes pairwise similarity between all tokens using $QK^T$, then uses these similarities to take a weighted average of value vectors.
- Scaling by $\sqrt{d_k}$ is not optional. Without it, attention weights become too "sharp" (one token gets all the weight), preventing the model from learning smooth attention patterns.
- Causal masking ensures autoregressive behavior: token $t$'s output depends only on tokens $0$ through $t$, which is what makes left-to-right text generation possible.
