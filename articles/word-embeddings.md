## Prerequisites

Before attempting this problem, you should be comfortable with:

- **NumPy Fancy Indexing** - Selecting specific rows from a matrix using an array of indices, because embedding lookup is literally just `matrix[indices]`
- **Vector Representations** - Understanding that words can be represented as points in a continuous space where proximity reflects meaning

---

## Concept

Word embeddings map discrete tokens (words, characters, or subwords) to dense vectors of real numbers. This solves a fundamental problem: neural networks need numerical inputs, but text is categorical.

The naive approach is **one-hot encoding**: a vocabulary of $V$ words becomes $V$-dimensional vectors with a single 1 and the rest 0s. But this is wasteful (GPT-2's vocabulary has 50,257 tokens) and treats all words as equally different. "King" and "queen" are just as far apart as "king" and "banana."

An embedding matrix $E$ has shape $(V, d)$, where each row is a $d$-dimensional vector for one token. Looking up token $i$ is just selecting row $i$ from $E$:

$$\text{embed}(\text{token\_ids}) = E[\text{token\_ids}]$$

This is equivalent to multiplying a one-hot vector by $E$, but indexing is $O(1)$ per token versus $O(V)$ for the matrix multiply. The embedding vectors are learned parameters: during training, backpropagation updates only the rows that were looked up in each batch.

The magic happens during training. Words used in similar contexts develop similar embedding vectors. "King" and "queen" end up close together. "Paris" and "France" develop a similar offset as "Tokyo" and "Japan." These relationships emerge automatically from the training data.

---

## Solution

### Intuition

Embedding lookup is a single line of NumPy fancy indexing. Given an embedding matrix and a list of token IDs, we return the rows at those indices.

### Implementation

::tabs-start
```python
import numpy as np
from numpy.typing import NDArray


class Solution:
    def lookup(self, embeddings: NDArray[np.float64], token_ids: NDArray[np.int64]) -> NDArray[np.float64]:
        return np.round(embeddings[token_ids], 5)
```
::tabs-end


### Walkthrough

Given a $4 \times 3$ embedding matrix (vocabulary size 4, embedding dimension 3):

| Token ID | Embedding Vector |
|---|---|
| 0 | $[0.1, 0.2, 0.3]$ |
| 1 | $[0.4, 0.5, 0.6]$ |
| 2 | $[0.7, 0.8, 0.9]$ |
| 3 | $[1.0, 1.1, 1.2]$ |

For `token_ids = [2, 0, 3]`:

| Position | Token ID | Looked-up Row |
|---|---|---|
| 0 | 2 | $[0.7, 0.8, 0.9]$ |
| 1 | 0 | $[0.1, 0.2, 0.3]$ |
| 2 | 3 | $[1.0, 1.1, 1.2]$ |

Result shape: $(3, 3)$.

### Time & Space Complexity

- Time: $O(T \cdot d)$ where $T$ is the number of tokens and $d$ is the embedding dimension
- Space: $O(T \cdot d)$ for the output matrix

---

## Common Pitfalls

### Treating Embedding as a Matrix Multiply

While mathematically equivalent to one-hot times $E$, actually constructing one-hot vectors is wasteful. Use indexing.

::tabs-start
```python
# Wrong: wasteful one-hot matrix multiply
one_hot = np.eye(V)[token_ids]  # creates huge intermediate matrix
result = one_hot @ embeddings

# Correct: direct indexing, O(1) per token
result = embeddings[token_ids]
```
::tabs-end


### Off-by-One Token IDs

If your vocabulary starts at 1 (reserving 0 for padding), make sure the embedding matrix has $V+1$ rows, or subtract 1 from IDs before lookup.

::tabs-start
```python
# Wrong: token ID 5 indexes row 5, but if vocab starts at 1,
# that's actually the 6th word
result = embeddings[token_ids]

# Correct if IDs are 1-indexed: either expand matrix or shift IDs
result = embeddings[token_ids - 1]
```
::tabs-end


---

## In the GPT Project

This becomes `model/embeddings.py`. The GPT model uses `nn.Embedding`, which is PyTorch's version of this lookup table. The model has two embedding layers: one for token IDs and one for position indices. Their outputs are added together before entering the transformer blocks.

---

## Key Takeaways

- Embedding lookup is just array indexing, making it $O(1)$ per token. This is far more efficient than the mathematically equivalent one-hot matrix multiply.
- Embedding vectors are learned parameters that capture semantic relationships. Similar words develop similar vectors during training.
- The embedding matrix is one of the largest components in language models: GPT-2's is $50{,}257 \times 768 = 38$ million parameters.
