## Prerequisites

Before attempting this problem, you should be comfortable with:

- **GPT Architecture** - The complete model that takes token IDs and outputs probability distributions over the vocabulary
- **Cross-Entropy Loss** - The standard loss for next-token prediction, which compares predicted distributions against actual next tokens
- **PyTorch Training Loop** - The forward-backward-step pattern, because this problem puts it all together for a real language model

---

## Concept

Training a GPT model follows the standard deep learning training loop, but with specifics tailored to language modeling.

Each epoch:

1. **Sample a batch**: Randomly select starting positions in the training data and extract input-target pairs (target = input shifted by one).
2. **Forward pass**: Feed input tokens through the model. Output shape is $(B, T, V)$ where $B$ is batch size, $T$ is context length, $V$ is vocabulary size.
3. **Compute loss**: Reshape logits to $(B \cdot T, V)$ and targets to $(B \cdot T)$, then apply cross-entropy. This treats each position as an independent classification problem.
4. **Backward pass**: `loss.backward()` computes gradients for every parameter.
5. **Update**: `optimizer.step()` applies AdamW updates.

The reshaping in step 3 is worth understanding. PyTorch's `cross_entropy` expects 2D logits (samples x classes) and 1D targets. A batch of $B$ sequences of length $T$ has $B \times T$ prediction positions, each choosing from $V$ vocabulary tokens. Flattening gives us exactly the right shapes.

**AdamW** is the standard optimizer for transformers. It extends Adam with proper weight decay (L2 regularization applied to weights directly, not through the gradient). The "W" in AdamW stands for "weight decay" done correctly.

For an untrained model with vocabulary size $V$, the initial loss should be near $\ln(V)$ (random guessing gives uniform probability $1/V$ per token). As training progresses, the loss decreases as the model learns patterns in the data.

---

## Solution

### Intuition

For each epoch, sample a random batch, run the forward pass, compute cross-entropy loss with reshaping, backpropagate, and step the optimizer. Return the final loss value.

### Implementation

::tabs-start
```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class Solution:
    def train(self, model: nn.Module, data: torch.Tensor, epochs: int, context_length: int, batch_size: int, lr: float) -> float:
        optimizer = torch.optim.AdamW(model.parameters(), lr=lr)

        for epoch in range(epochs):
            torch.manual_seed(epoch)
            ix = torch.randint(len(data) - context_length, (batch_size,))
            x = torch.stack([data[i:i + context_length] for i in ix])
            y = torch.stack([data[i + 1:i + 1 + context_length] for i in ix])

            logits = model(x)
            B, T, C = logits.shape
            loss = F.cross_entropy(logits.view(B * T, C), y.view(B * T))

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

        return round(loss.item(), 4)
```
::tabs-end


### Walkthrough

For `vocab_size = 50`, `context_length = 8`, `batch_size = 4`, `lr = 0.001`, `epochs = 3`:

| Epoch | Seed | Batch Shape | Logits Shape | Loss Shape | Expected Loss |
|---|---|---|---|---|---|
| 0 | 0 | x: $(4,8)$, y: $(4,8)$ | $(4,8,50)$ | scalar | $\approx \ln(50) \approx 3.91$ (random) |
| 1 | 1 | different batch | $(4,8,50)$ | scalar | Lower (learning) |
| 2 | 2 | different batch | $(4,8,50)$ | scalar | Lower still |

The reshape `logits.view(32, 50)` and `y.view(32)` flattens 4 sequences of 8 positions into 32 independent classification problems, each choosing from 50 tokens.

### Time & Space Complexity

- Time: $O(E \cdot (B \cdot T^2 \cdot d + B \cdot T \cdot V))$ per training run, where $E$ is epochs
- Space: $O(P + B \cdot T \cdot V)$ where $P$ is total model parameters and $B \cdot T \cdot V$ is the logits tensor

---

## Common Pitfalls

### Forgetting optimizer.zero_grad()

Without zeroing gradients, they accumulate across epochs. The updates become the sum of all previous gradients, causing erratic training.

::tabs-start
```python
# Wrong: gradients accumulate
loss.backward()
optimizer.step()

# Correct: zero before backward
optimizer.zero_grad()
loss.backward()
optimizer.step()
```
::tabs-end


### Wrong Reshape for Cross-Entropy

The logits must be $(B \cdot T, V)$ and targets must be $(B \cdot T)$. Getting the view dimensions wrong produces incorrect loss values or runtime errors.

::tabs-start
```python
# Wrong: forgot to flatten batch and time dimensions
loss = F.cross_entropy(logits, y)  # shape mismatch

# Correct: flatten to 2D logits and 1D targets
B, T, C = logits.shape
loss = F.cross_entropy(logits.view(B * T, C), y.view(B * T))
```
::tabs-end


---

## In the GPT Project

This becomes `train.py`. This is where the model actually learns. The training loop takes a randomly initialized GPT model and raw training data, and produces a model that can predict the next character. The loss decreasing over epochs is the signal that the model is learning patterns in the text.

---

## Key Takeaways

- Training GPT uses the universal loop: sample batch, forward, loss, backward, step. The only language-model-specific part is the reshape for cross-entropy.
- Cross-entropy loss treats each position independently: a batch of $B$ sequences of length $T$ yields $B \times T$ classification examples.
- Setting `torch.manual_seed(epoch)` gives each epoch a different but reproducible batch, balancing randomness with reproducibility.
