## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Python String Operations** - Splitting strings, set comprehensions, and dictionary construction, because the entire preprocessing pipeline is built from these primitives
- **PyTorch Tensors** - Creating tensors from lists and understanding padding, since the final output is a padded tensor

---

## Concept

Neural networks cannot process raw text. They need numbers. NLP preprocessing converts strings into numerical tensors through a pipeline:

1. **Tokenization**: Split text into individual tokens (words in this case, though production systems use subword tokenizers like BPE).
2. **Vocabulary construction**: Collect all unique words, sort them, and assign each a unique integer ID starting from 1. We reserve 0 for padding.
3. **Encoding**: Replace each word with its integer ID.
4. **Padding**: Sentences have different lengths, but tensors must be rectangular. Shorter sequences are padded with zeros on the right so all sequences in a batch have the same length.

Why start IDs at 1? Because 0 is reserved as the **padding token**. Later, the model can use a mask to ignore these padding positions, so they do not affect attention scores or loss computation.

PyTorch provides `nn.utils.rnn.pad_sequence` to handle step 4. With `batch_first=True`, it returns a tensor of shape $(N, T)$ where $N$ is the number of sentences and $T$ is the length of the longest sentence.

---

## Solution

### Intuition

Combine positive and negative sentences, build a sorted vocabulary mapping words to IDs (starting at 1), encode each sentence as a tensor of IDs, and pad them into a single rectangular tensor using PyTorch's padding utility.

### Implementation

::tabs-start
```python
import torch
import torch.nn as nn
from torchtyping import TensorType
from typing import List

class Solution:
    def get_dataset(self, positive: List[str], negative: List[str]) -> TensorType[float]:
        combined = positive + negative

        # Build vocabulary: sorted unique words -> integer IDs starting at 1
        vocabulary = sorted({word for sentence in combined for word in sentence.split()})
        word_to_id = {word: idx + 1 for idx, word in enumerate(vocabulary)}

        # Encode each sentence as a tensor of word IDs
        encoded = [torch.tensor([word_to_id[w] for w in s.split()]) for s in combined]

        # Pad shorter sequences with 0s so output is a rectangular tensor
        return nn.utils.rnn.pad_sequence(encoded, batch_first=True)
```
::tabs-end


### Walkthrough

For `positive = ["I love this"]` and `negative = ["I hate this"]`:

| Step | Input | Output |
|---|---|---|
| Combine | two sentences | `["I love this", "I hate this"]` |
| Unique words | all words | `{"I", "hate", "love", "this"}` |
| Sort | alphabetical | `["I", "hate", "love", "this"]` |
| Word-to-ID | assign IDs from 1 | `{"I": 1, "hate": 2, "love": 3, "this": 4}` |
| Encode sent 1 | "I love this" | `[1, 3, 4]` |
| Encode sent 2 | "I hate this" | `[1, 2, 4]` |
| Pad | both length 3, no padding needed | `[[1, 3, 4], [1, 2, 4]]` |

If one sentence were "I really love this" (length 4), the shorter one would become `[1, 2, 4, 0]`.

### Time & Space Complexity

- Time: $O(S \cdot L)$ where $S$ is the number of sentences and $L$ is the average sentence length
- Space: $O(S \cdot T)$ where $T$ is the maximum sentence length (for the padded tensor)

---

## Common Pitfalls

### Starting Vocabulary IDs at 0

If IDs start at 0, the first word gets ID 0, which is the same as padding. The model cannot distinguish between that word and padding positions.

::tabs-start
```python
# Wrong: first word gets ID 0 = padding
word_to_id = {word: idx for idx, word in enumerate(vocabulary)}

# Correct: IDs start at 1, reserving 0 for padding
word_to_id = {word: idx + 1 for idx, word in enumerate(vocabulary)}
```
::tabs-end


### Not Sorting the Vocabulary

Without sorting, the vocabulary order depends on Python's set iteration order, which is non-deterministic. Different runs produce different ID assignments.

::tabs-start
```python
# Wrong: non-deterministic ordering
vocabulary = list({word for sentence in combined for word in sentence.split()})

# Correct: sorted for reproducibility
vocabulary = sorted({word for sentence in combined for word in sentence.split()})
```
::tabs-end


---

## In the GPT Project

This becomes `data/nlp_preprocessing.py`. While the GPT model uses character-level or BPE tokenization rather than word-level, the core pipeline is the same: tokenize, build vocabulary, encode, pad. Understanding this word-level version makes the more complex tokenizers straightforward.

---

## Key Takeaways

- NLP preprocessing converts variable-length strings into fixed-size numerical tensors that neural networks can process.
- Vocabulary IDs start at 1 so that 0 serves as a padding token, allowing models to mask and ignore padding positions.
- Sorting the vocabulary ensures deterministic ID assignment, which is critical for reproducibility and testing.
