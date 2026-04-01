## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Tokenization** - Splitting text into tokens (words here, characters or subwords in other contexts), because this dataset loader starts from raw text
- **Data Loader Concepts** - Creating input-target pairs where the target is the input shifted by one position, which is the standard for next-token prediction

---

## Concept

The GPT data loader works with pre-encoded integer sequences. But before encoding, someone has to take raw text, split it into tokens, and create batches. That is what this dataset loader does: it combines tokenization and batch creation in a single pipeline.

The process is:

1. **Tokenize** the raw text by splitting on whitespace to get a list of word tokens.
2. **Sample** random starting indices within valid bounds using PyTorch's random number generator.
3. For each index $i$:
   - **Input**: words from position $i$ to $i + C - 1$ (the context window).
   - **Target**: words from position $i + 1$ to $i + C$ (shifted by one).

The key difference from the integer data loader is that this version works with string tokens directly. The output is lists of words rather than tensors of integers. This is useful for debugging: you can print a batch and actually read the text to verify your data pipeline is correct.

The context length $C$ determines how many previous words the model can "see" when predicting the next one. A larger context gives more information but costs more memory and computation (attention is $O(C^2)$).

---

## Solution

### Intuition

Split the raw text into words, sample random starting positions, and extract context-length windows for both input and target. The target is always the input shifted right by one word.

### Implementation

::tabs-start
```python
import torch
from typing import List, Tuple

class Solution:
    def batch_loader(self, raw_dataset: str, context_length: int, batch_size: int) -> Tuple[List[List[str]], List[List[str]]]:
        torch.manual_seed(0)
        tokenized = raw_dataset.split()
        indices = torch.randint(low=0, high=len(tokenized) - context_length, size=(batch_size,)).tolist()
        X = []
        Y = []
        for idx in indices:
            X.append(tokenized[idx:idx+context_length])
            Y.append(tokenized[idx+1:idx+1+context_length])
        return X, Y
```
::tabs-end


### Walkthrough

For `raw_dataset = "the cat sat on the mat"`, `context_length = 3`, `batch_size = 2`:

| Step | Computation | Result |
|---|---|---|
| Tokenize | split on whitespace | `["the", "cat", "sat", "on", "the", "mat"]` |
| Valid range | $[0, 6-3) = [0, 3)$ | Indices 0, 1, or 2 |
| Sample | 2 random indices | Suppose $[2, 0]$ |
| Batch 0 (idx=2) | X=`["sat","on","the"]`, Y=`["on","the","mat"]` | Target shifted by 1 |
| Batch 1 (idx=0) | X=`["the","cat","sat"]`, Y=`["cat","sat","on"]` | Target shifted by 1 |

Each target word is the next word after the corresponding input position.

### Time & Space Complexity

- Time: $O(N + B \cdot C)$ where $N$ is text length (for splitting), $B$ is batch size, $C$ is context length
- Space: $O(N + B \cdot C)$ for the tokenized text and batch lists

---

## Common Pitfalls

### Using Python's random Instead of torch.randint

The problem uses `torch.manual_seed(0)` for reproducibility. Using `random.randint` instead produces different indices and fails the test cases.

::tabs-start
```python
# Wrong: different RNG, non-reproducible
import random
random.seed(0)
indices = [random.randint(0, len(tokenized) - context_length - 1) for _ in range(batch_size)]

# Correct: torch RNG matches expected output
torch.manual_seed(0)
indices = torch.randint(low=0, high=len(tokenized) - context_length, size=(batch_size,)).tolist()
```
::tabs-end


### Forgetting to Convert Tensor Indices to Python List

`torch.randint` returns a tensor. Using it directly for list slicing works, but `.tolist()` makes the code clearer and avoids potential type issues.

::tabs-start
```python
# Works but less clear
indices = torch.randint(low=0, high=n, size=(batch_size,))
for idx in indices:
    X.append(tokenized[idx:idx+context_length])  # idx is a tensor

# Better: explicit conversion
indices = torch.randint(low=0, high=n, size=(batch_size,)).tolist()
```
::tabs-end


---

## In the GPT Project

This becomes `data/dataset.py`. In the full pipeline, this dataset loader feeds into the vocabulary encoder, which converts the word tokens to integers, which then feed into the GPT model. Having a word-level loader helps verify the data pipeline produces sensible text before encoding.

---

## Key Takeaways

- A dataset loader combines tokenization and batch creation, going from raw text to training pairs in one step.
- Word-level tokenization by splitting on whitespace is the simplest approach, though it cannot handle subword patterns or unseen words like BPE can.
- Using `torch.manual_seed` ensures reproducible batches. This is critical for debugging and testing, and it is the pattern used in the GPT training loop.
