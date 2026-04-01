## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Multi-Headed Self-Attention** - The attention mechanism that lets tokens communicate with each other, because the transformer block wraps it with normalization and residual connections
- **Layer Normalization** - Normalizing activations for training stability, applied before each sub-layer in the Pre-Norm architecture
- **Residual (Skip) Connections** - Adding the input directly to the output of a sub-layer, creating gradient highways that enable training of very deep networks

---

## Concept

A transformer block is the repeating unit of every transformer model. GPT-2 stacks 12 of them. GPT-3 stacks 96. Each block combines two sub-layers with residual connections and layer normalization:

$$x = x + \text{MultiHeadAttention}(\text{LayerNorm}(x))$$
$$x = x + \text{FFN}(\text{LayerNorm}(x))$$

This is the **Pre-Norm** architecture (normalize before the sub-layer), which is more stable than the original Post-Norm design from "Attention Is All You Need."

**Residual connections** are what make deep transformers trainable. Without them, gradients must pass through dozens of layers and shrink exponentially. The skip path $x + f(x)$ gives gradients a direct route back, keeping them healthy. Think of it as: the sub-layer only needs to learn the *difference* from the input, not the full transformation.

The **feed-forward network (FFN)** is a two-layer MLP applied independently to each token:

$$\text{FFN}(x) = \text{Dropout}(\text{ReLU}(xW_1 + b_1) W_2 + b_2)$$

It expands the dimension by 4x (e.g., 768 to 3072 in GPT-2), applies ReLU, then projects back down. This expansion gives the network extra capacity to process each token's representation. While attention handles inter-token communication, the FFN handles per-token computation.

---

## Solution

### Intuition

The transformer block applies Pre-Norm attention with a skip connection, then Pre-Norm FFN with another skip connection. The `VanillaNeuralNetwork` sub-module implements the FFN with 4x expansion, ReLU, and dropout.

### Implementation

::tabs-start
```python
import torch
import torch.nn as nn
from torchtyping import TensorType

class TransformerBlock(nn.Module):

    def __init__(self, model_dim: int, num_heads: int):
        super().__init__()
        torch.manual_seed(0)
        self.attention = self.MultiHeadedSelfAttention(model_dim, num_heads)
        self.linear_network = self.VanillaNeuralNetwork(model_dim)
        self.first_norm = nn.LayerNorm(model_dim)
        self.second_norm = nn.LayerNorm(model_dim)

    def forward(self, embedded: TensorType[float]) -> TensorType[float]:
        # Round answer to 4 decimal places
        torch.manual_seed(0)
        embedded = embedded + self.attention(self.first_norm(embedded)) # skip connection
        embedded = embedded + self.linear_network(self.second_norm(embedded)) # another skip connection
        return torch.round(embedded, decimals=4)


    class MultiHeadedSelfAttention(nn.Module):

        class SingleHeadAttention(nn.Module):
            def __init__(self, model_dim: int, head_size: int):
                super().__init__()
                torch.manual_seed(0)
                self.key_gen = nn.Linear(model_dim, head_size, bias=False)
                self.query_gen = nn.Linear(model_dim, head_size, bias=False)
                self.value_gen = nn.Linear(model_dim, head_size, bias=False)

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

        def __init__(self, model_dim: int, num_heads: int):
            super().__init__()
            torch.manual_seed(0)
            self.att_heads = nn.ModuleList()
            for i in range(num_heads):
                self.att_heads.append(self.SingleHeadAttention(model_dim, model_dim // num_heads))

        def forward(self, embedded: TensorType[float]) -> TensorType[float]:
            head_outputs = []
            for head in self.att_heads:
                head_outputs.append(head(embedded))
            concatenated = torch.cat(head_outputs, dim = 2)
            return concatenated

    class VanillaNeuralNetwork(nn.Module):

        def __init__(self, model_dim: int):
            super().__init__()
            torch.manual_seed(0)
            self.up_projection = nn.Linear(model_dim, model_dim * 4)
            self.relu = nn.ReLU()
            self.down_projection = nn.Linear(model_dim * 4, model_dim)
            self.dropout = nn.Dropout(0.2) # using p = 0.2

        def forward(self, x: TensorType[float]) -> TensorType[float]:
            torch.manual_seed(0)
            return self.dropout(self.down_projection(self.relu(self.up_projection(x))))
```
::tabs-end


### Walkthrough

For `model_dim = 8` and `num_heads = 2`, with input shape $(B, T, 8)$:

| Step | Operation | Shape |
|---|---|---|
| LayerNorm 1 | Normalize across dim 8 | $(B, T, 8)$ |
| Multi-Head Attention | 2 heads, each head_size=4, concat | $(B, T, 8)$ |
| Residual 1 | $x + \text{attention}(LN(x))$ | $(B, T, 8)$ |
| LayerNorm 2 | Normalize the sum | $(B, T, 8)$ |
| FFN up-project | Linear $8 \to 32$ + ReLU | $(B, T, 32)$ |
| FFN down-project | Linear $32 \to 8$ + Dropout | $(B, T, 8)$ |
| Residual 2 | $x + \text{FFN}(LN(x))$ | $(B, T, 8)$ |

The output shape matches the input, so blocks can be stacked arbitrarily deep.

### Time & Space Complexity

- Time: $O(T^2 \cdot d + T \cdot d^2)$ where $T$ is sequence length and $d$ is model dimension (attention is $T^2 d$, FFN is $T d^2$ due to 4x expansion)
- Space: $O(T^2 + T \cdot d)$ for attention matrices and intermediate representations

---

## Common Pitfalls

### Post-Norm Instead of Pre-Norm

Applying layer normalization after the sub-layer (Post-Norm) instead of before it (Pre-Norm) is less stable for deep networks.

::tabs-start
```python
# Wrong (Post-Norm): less stable for deep networks
embedded = self.first_norm(embedded + self.attention(embedded))

# Correct (Pre-Norm): normalize before the sub-layer
embedded = embedded + self.attention(self.first_norm(embedded))
```
::tabs-end


### Forgetting the Residual Connection

Without the skip path, the block must learn the full transformation, and gradients must pass through every sub-layer. Deep networks become untrainable.

::tabs-start
```python
# Wrong: no residual, gradients vanish in deep networks
embedded = self.attention(self.first_norm(embedded))

# Correct: residual connection preserves gradient flow
embedded = embedded + self.attention(self.first_norm(embedded))
```
::tabs-end


---

## In the GPT Project

This becomes `model/transformer.py`. The GPT model stacks $N$ of these blocks in `nn.Sequential`. Each block refines the token representations: attention lets tokens share information, and the FFN processes each token independently. Stacking blocks gives the model progressively deeper understanding of the input.

---

## Key Takeaways

- A transformer block combines attention (inter-token communication) with an FFN (per-token computation), connected by residual paths and layer normalization.
- Residual connections enable deep networks by providing gradient highways that bypass the sub-layers.
- The 4x expansion in the FFN gives the network additional parameter capacity. In GPT-2, the FFN contains two-thirds of each block's parameters.
