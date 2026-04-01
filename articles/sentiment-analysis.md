## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Word Embeddings** - Mapping token IDs to dense vectors using `nn.Embedding`, because this model starts by embedding the input tokens
- **PyTorch nn.Module** - Defining layers in `__init__` and chaining them in `forward`, the standard pattern for all PyTorch models
- **Binary Classification** - Using sigmoid to convert a raw score into a probability in $(0, 1)$, where values near 1 indicate positive sentiment

---

## Concept

Sentiment analysis classifies text as positive or negative. This problem uses a simple but effective **embedding bag** architecture:

1. **Embed** each word using `nn.Embedding`, producing a matrix of shape $(B, T, d)$ where $B$ is batch size, $T$ is sequence length, and $d$ is embedding dimension.
2. **Average** all word embeddings in each sentence across the sequence dimension (`dim=1`), producing a single vector of shape $(B, d)$ per sentence.
3. **Project** this averaged vector to a single score using `nn.Linear`.
4. **Sigmoid** converts the score to a probability.

The averaging step is the key design choice. It creates a fixed-size representation from variable-length input without any recurrence or attention. This makes it a **bag-of-words** model: word order is thrown away. "I love not this" and "I not love this" produce the same representation.

Despite ignoring word order, bag-of-words models work surprisingly well for sentiment because individual words carry strong signals. "Amazing," "terrible," "boring," and "fantastic" are strong sentiment indicators regardless of position. The embedding layer learns these associations: positive words develop vectors that point in one direction, negative words point in another, and the linear layer learns to separate them.

---

## Solution

### Intuition

Define an embedding layer, a linear projection, and sigmoid. In the forward pass: embed input tokens, average across the sequence dimension to collapse variable-length input to a fixed-size vector, project to a scalar, and apply sigmoid.

### Implementation

::tabs-start
```python
import torch
import torch.nn as nn
from torchtyping import TensorType

class Solution(nn.Module):
    def __init__(self, vocabulary_size: int):
        super().__init__()
        torch.manual_seed(0)
        self.embedding_layer = nn.Embedding(vocabulary_size, 16)
        self.linear_layer = nn.Linear(16, 1)
        self.sigmoid_layer = nn.Sigmoid()

    def forward(self, x: TensorType[int]) -> TensorType[float]:
        embeddings = self.embedding_layer(x)
        averaged = torch.mean(embeddings, dim=1)
        projected = self.linear_layer(averaged)
        return torch.round(self.sigmoid_layer(projected), decimals=4)
```
::tabs-end


### Walkthrough

For `x = [[3, 1, 4]]` (1 sentence, 3 tokens) and `vocabulary_size = 10`:

| Step | Shape | What Happens |
|---|---|---|
| Embed | $(1, 3, 16)$ | Look up rows 3, 1, 4 from the $(10, 16)$ embedding matrix |
| Average | $(1, 16)$ | Mean across `dim=1`: 3 word vectors become 1 sentence vector |
| Linear | $(1, 1)$ | $(1, 16) \times (16, 1) + \text{bias}$ produces a scalar |
| Sigmoid | $(1, 1)$ | Squash to $(0, 1)$: close to 1 = positive, close to 0 = negative |

### Time & Space Complexity

- Time: $O(T \cdot d + d)$ where $T$ is sequence length and $d = 16$ is embedding dimension
- Space: $O(V \cdot d + d)$ for the embedding matrix and linear weights

---

## Common Pitfalls

### Averaging Over the Wrong Dimension

`dim=0` averages across the batch (wrong: collapses different sentences together). `dim=1` averages across the sequence (correct: collapses words within each sentence).

::tabs-start
```python
# Wrong: averages across batch, mixing different sentences
averaged = torch.mean(embeddings, dim=0)

# Correct: averages across sequence within each sentence
averaged = torch.mean(embeddings, dim=1)
```
::tabs-end


### Forgetting to Handle Padding

If input sequences are padded with 0s, the padding tokens have their own embedding vectors that get included in the average. For this problem the test cases handle this, but in production you would mask padding before averaging.

::tabs-start
```python
# Simple (works for this problem)
averaged = torch.mean(embeddings, dim=1)

# Production: mask padding before averaging
mask = (x != 0).unsqueeze(-1).float()
averaged = (embeddings * mask).sum(dim=1) / mask.sum(dim=1)
```
::tabs-end


---

## In the GPT Project

This becomes `foundations/sentiment.py`. While GPT uses attention instead of averaging (so word order matters), this problem demonstrates the core NLP pattern: embed tokens, aggregate into a fixed-size representation, then classify. The GPT approach replaces "average" with "attend," which is strictly more powerful.

---

## Key Takeaways

- Averaging word embeddings is the simplest way to create fixed-size sentence representations from variable-length inputs.
- Bag-of-words models ignore word order but work well when individual words carry strong signals, as in sentiment analysis.
- The embedding layer learns task-specific representations during training, so "great" and "excellent" develop similar vectors without any manual feature engineering.
