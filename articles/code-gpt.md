## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Transformer Blocks** - Multi-headed attention, FFN, layer normalization, and residual connections, because the GPT model stacks multiple transformer blocks
- **Word and Position Embeddings** - Token embeddings map IDs to vectors, position embeddings encode order, and they are added together before entering the transformer stack
- **Softmax** - The final operation that converts logits into a probability distribution over the vocabulary

---

## Concept

GPT (Generative Pre-trained Transformer) assembles everything from the course into a complete language model. The architecture is:

1. **Token embeddings**: Map each input token ID to a dense vector of size $d_{\text{model}}$ using `nn.Embedding`.
2. **Position embeddings**: Add learned position vectors using a second `nn.Embedding`. Unlike the sinusoidal encoding from earlier, GPT uses learned positions.
3. **$N$ Transformer blocks**: Each block applies multi-headed self-attention (for inter-token communication) and a feed-forward network (for per-token computation), connected by residual paths and layer normalization.
4. **Final layer normalization**: Stabilizes the output of the last transformer block.
5. **Vocabulary projection**: A linear layer that maps from $d_{\text{model}}$ to vocabulary size, producing logits for every possible next token.
6. **Softmax**: Converts logits to probabilities.

At each position $t$, the model outputs a probability distribution over the vocabulary, predicting what token should come at position $t+1$. Causal masking inside the attention layers ensures position $t$ only sees tokens $0$ through $t$, so the model can be used autoregressively: generate one token, append it, and repeat.

This architecture scales remarkably well. GPT-2 Small uses $d=768$, 12 blocks, 12 heads. GPT-3 uses $d=12288$, 96 blocks, 96 heads. The structure is identical; only the numbers change.

---

## Solution

### Intuition

Compose all previously built components: embedding layers, a sequence of transformer blocks, final normalization, and a linear projection to vocabulary logits. The forward pass adds token and position embeddings, processes through all blocks, normalizes, projects, and applies softmax.

### Implementation

::tabs-start
```python
import torch
import torch.nn as nn
from torchtyping import TensorType

class GPT(nn.Module):

    def __init__(self, vocab_size: int, context_length: int, model_dim: int, num_blocks: int, num_heads: int):
        super().__init__()
        torch.manual_seed(0)
        self.word_embeddings = nn.Embedding(vocab_size, model_dim)
        self.position_embeddings = nn.Embedding(context_length, model_dim)
        self.transformer_blocks = nn.Sequential()
        for i in range(num_blocks):
            self.transformer_blocks.append(self.TransformerBlock(model_dim, num_heads))
        self.final_norm = nn.LayerNorm(model_dim)
        self.vocab_projection = nn.Linear(model_dim, vocab_size)

    def forward(self, context: TensorType[int]) -> TensorType[float]:
        torch.manual_seed(0)
        # Token embeddings + positional embeddings
        embedded = self.word_embeddings(context)
        positions = torch.arange(context.shape[1], device=context.device)
        embedded = embedded + self.position_embeddings(positions)

        # Pass through N transformer blocks, then final LayerNorm
        output = self.final_norm(self.transformer_blocks(embedded))
        logits = self.vocab_projection(output)  # (B, T, vocab_size)

        probabilities = nn.functional.softmax(logits, dim=-1)
        return torch.round(probabilities, decimals=4)

    class TransformerBlock(nn.Module):

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

        def __init__(self, model_dim: int, num_heads: int):
            super().__init__()
            torch.manual_seed(0)
            self.attention = self.MultiHeadedSelfAttention(model_dim, num_heads)
            self.linear_network = self.VanillaNeuralNetwork(model_dim)
            self.first_norm = nn.LayerNorm(model_dim)
            self.second_norm = nn.LayerNorm(model_dim)

        def forward(self, embedded: TensorType[float]) -> TensorType[float]:
            torch.manual_seed(0)
            embedded = embedded + self.attention(self.first_norm(embedded)) # skip connection
            embedded = embedded + self.linear_network(self.second_norm(embedded)) # another skip connection
            return embedded
```
::tabs-end


### Walkthrough

For `vocab_size = 100`, `context_length = 8`, `model_dim = 16`, `num_blocks = 2`, `num_heads = 4`, input shape $(1, 5)$:

| Step | Operation | Shape |
|---|---|---|
| Token embed | Look up 5 IDs in $(100, 16)$ table | $(1, 5, 16)$ |
| Position embed | Look up positions $[0..4]$ in $(8, 16)$ table | $(1, 5, 16)$ |
| Add | Token + position embeddings | $(1, 5, 16)$ |
| Block 1 | Pre-Norm attention (4 heads, size 4) + Pre-Norm FFN ($16 \to 64 \to 16$) | $(1, 5, 16)$ |
| Block 2 | Same architecture, further refining | $(1, 5, 16)$ |
| Final LN | LayerNorm across dim 16 | $(1, 5, 16)$ |
| Vocab proj | Linear $16 \to 100$ | $(1, 5, 100)$ |
| Softmax | Probabilities over vocabulary | $(1, 5, 100)$ |

Each of the 5 positions outputs a distribution over 100 tokens, predicting the next token.

### Time & Space Complexity

- Time: $O(N \cdot (T^2 \cdot d + T \cdot d^2))$ where $N$ is blocks, $T$ is sequence length, $d$ is model dimension
- Space: $O(V \cdot d + N \cdot d^2 + T^2)$ for embeddings, transformer parameters, and attention matrices

---

## Common Pitfalls

### Forgetting to Add Position Embeddings

Without position embeddings, the model has no way to distinguish "cat sat" from "sat cat." The representations would be identical.

::tabs-start
```python
# Wrong: no position information
embedded = self.word_embeddings(context)
output = self.transformer_blocks(embedded)

# Correct: add position embeddings
embedded = self.word_embeddings(context)
positions = torch.arange(context.shape[1], device=context.device)
embedded = embedded + self.position_embeddings(positions)
output = self.transformer_blocks(embedded)
```
::tabs-end


### Using nn.ModuleList Instead of nn.Sequential for Blocks

`nn.Sequential` chains modules automatically in `forward`. `nn.ModuleList` requires you to write the loop yourself. Both register parameters, but Sequential is cleaner here.

::tabs-start
```python
# Works but requires manual loop
self.blocks = nn.ModuleList([TransformerBlock(...) for _ in range(N)])
# forward: for block in self.blocks: x = block(x)

# Cleaner: Sequential handles the loop
self.blocks = nn.Sequential(*[TransformerBlock(...) for _ in range(N)])
# forward: x = self.blocks(x)
```
::tabs-end


---

## In the GPT Project

This becomes `model/gpt.py`. This is the culmination of the entire course: every previous problem (embeddings, attention, layer norm, FFN, transformer block) composes into this single model. The next two problems train it and make it generate text.

---

## Key Takeaways

- GPT composes token embeddings, position embeddings, a stack of transformer blocks, final normalization, and a vocabulary projection into a complete autoregressive language model.
- Learned position embeddings (rather than sinusoidal) let the model discover its own positional representation during training.
- The same architecture scales from tiny models (this problem) to GPT-3 (175 billion parameters) by increasing the model dimension, number of blocks, and number of heads.
