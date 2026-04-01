## Prerequisites

Before attempting this problem, you should be comfortable with:

- **PyTorch Tensors** - Creating, slicing, and stacking tensors, because the data loader converts flat token sequences into batched training tensors
- **Next-Token Prediction** - Understanding that a language model predicts token $t+1$ given tokens $0$ through $t$, which dictates how we construct input-target pairs

---

## Concept

A GPT data loader creates batches of input-target pairs from a flat sequence of token IDs. The model learns by next-token prediction: given a context of tokens, predict what comes next. So we need overlapping windows where the target is the input shifted by one position.

Given an encoded text (a 1D tensor of token IDs), a **context length** $C$, and a **batch size** $B$:

1. **Sample** $B$ random starting positions from range $[0, \text{len}(\text{data}) - C)$.
2. For each position $i$:
   - **Input** $x$: tokens $i$ to $i + C - 1$ (length $C$).
   - **Target** $y$: tokens $i + 1$ to $i + C$ (length $C$).

The target is the input shifted right by one. At every position, the model is asked: "given everything up to here, what comes next?" This means a single context window of length $C$ actually provides $C$ training examples. A batch of $B$ windows provides $B \times C$ training examples, which is highly efficient.

Random starting positions ensure the model sees different slices of the training data each iteration, acting as a form of data augmentation for language modeling.

---

## Solution

### Intuition

Sample random starting indices with `torch.randint`, then for each index use tensor slicing to extract the input window and the target window (offset by one). `torch.stack` combines individual sequences into a batch tensor.

### Implementation

::tabs-start
```python
import torch
from torchtyping import TensorType
from typing import Tuple

class Solution:
    def create_batches(self, data: TensorType[int], context_length: int, batch_size: int) -> Tuple[TensorType[int], TensorType[int]]:
        torch.manual_seed(0)
        ix = torch.randint(len(data) - context_length, (batch_size,))
        x = torch.stack([data[i:i + context_length] for i in ix])
        y = torch.stack([data[i + 1:i + 1 + context_length] for i in ix])
        return x, y
```
::tabs-end


### Walkthrough

For `data = [10, 20, 30, 40, 50, 60]`, `context_length = 3`, `batch_size = 2`:

| Step | Computation | Result |
|---|---|---|
| Valid range | $[0, 6 - 3) = [0, 3)$ | Indices can be 0, 1, or 2 |
| Sample 2 indices | `torch.randint(3, (2,))` | Suppose $[1, 0]$ |
| Batch 0 (start=1) | x=$[20,30,40]$, y=$[30,40,50]$ | Target is input shifted by 1 |
| Batch 1 (start=0) | x=$[10,20,30]$, y=$[20,30,40]$ | Target is input shifted by 1 |
| Stack | x shape $(2,3)$, y shape $(2,3)$ | Ready for the model |

At position 0 of batch 0, the model sees $[20]$ and must predict $30$. At position 1, it sees $[20, 30]$ and must predict $40$.

### Time & Space Complexity

- Time: $O(B \cdot C)$ where $B$ is batch size and $C$ is context length
- Space: $O(B \cdot C)$ for the input and target tensors

---

## Common Pitfalls

### Off-by-One in the Random Range

If you sample from $[0, \text{len}(\text{data}))$ instead of $[0, \text{len}(\text{data}) - C)$, starting positions near the end will cause index-out-of-bounds when extracting the target window.

::tabs-start
```python
# Wrong: index can be too large, y slice goes past end
ix = torch.randint(len(data), (batch_size,))

# Correct: ensure room for context_length + 1 tokens
ix = torch.randint(len(data) - context_length, (batch_size,))
```
::tabs-end


### Forgetting the +1 Offset for Targets

The target window starts one position after the input window. Without the offset, input and target are identical and the model learns nothing.

::tabs-start
```python
# Wrong: target same as input
y = torch.stack([data[i:i + context_length] for i in ix])

# Correct: target shifted by 1
y = torch.stack([data[i + 1:i + 1 + context_length] for i in ix])
```
::tabs-end


---

## In the GPT Project

This becomes `data/loader.py`. The training loop calls this data loader every epoch to sample a fresh batch. The GPT model receives `x` as input and its output logits are compared against `y` using cross-entropy loss.

---

## Key Takeaways

- The data loader creates input-target pairs by shifting the input window by one position, which is the standard setup for next-token prediction.
- Random starting positions ensure the model sees diverse training data each iteration, preventing overfitting to a fixed set of windows.
- Each context window of length $C$ provides $C$ independent training examples, making language model training data-efficient.
