## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Logarithms** - $\log(x)$ approaches $-\infty$ as $x$ approaches 0, which is why cross-entropy heavily penalizes confident wrong predictions
- **Sigmoid and Softmax** - These produce the predicted probabilities that cross-entropy evaluates
- **NumPy Broadcasting** - Element-wise operations on arrays make the loss computation vectorized and efficient

---

## Concept

Cross-entropy loss measures how far a model's predicted probabilities are from the true labels. It is the standard loss function for classification, and understanding why requires thinking about what we want the loss to do.

**Binary cross-entropy** handles two-class problems. For $N$ samples with true labels $y_i \in \{0, 1\}$ and predicted probabilities $\hat{y}_i$:

$$\text{BCE} = -\frac{1}{N} \sum_{i=1}^{N} \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right]$$

When $y_i = 1$, only $\log(\hat{y}_i)$ matters. If the model predicts 0.99, the loss is $-\log(0.99) \approx 0.01$ (small). If it predicts 0.01, the loss is $-\log(0.01) \approx 4.6$ (huge). This asymmetric punishment for confident wrong answers is exactly what drives learning.

**Categorical cross-entropy** extends this to multiple classes with one-hot labels:

$$\text{CCE} = -\frac{1}{N} \sum_{i=1}^{N} \sum_{c=1}^{C} y_{i,c} \log(\hat{y}_{i,c})$$

Since $y$ is one-hot, the inner sum selects only the log-probability of the true class. Everything else is multiplied by zero.

A small epsilon (e.g., $10^{-7}$) clips predictions away from 0 and 1 to avoid $\log(0)$, which is undefined.

---

## Solution

### Intuition

For binary cross-entropy, we apply the formula directly: clip predictions with epsilon, compute the log terms, average, and negate. For categorical cross-entropy, we sum over classes first (axis=1), then average over samples.

### Implementation

::tabs-start
```python
import numpy as np
from numpy.typing import NDArray


class Solution:

    def binary_cross_entropy(self, y_true: NDArray[np.float64], y_pred: NDArray[np.float64]) -> float:
        epsilon = 1e-7
        y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
        loss = -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))
        return round(loss, 4)

    def categorical_cross_entropy(self, y_true: NDArray[np.float64], y_pred: NDArray[np.float64]) -> float:
        epsilon = 1e-7
        y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
        loss = -np.mean(np.sum(y_true * np.log(y_pred), axis=1))
        return round(loss, 4)
```
::tabs-end


### Walkthrough

**Binary cross-entropy** with `y_true = [1, 0, 1]` and `y_pred = [0.9, 0.1, 0.8]`:

| Sample | $y$ | $\hat{y}$ | Loss term |
|---|---|---|---|
| 1 | 1 | 0.9 | $-\log(0.9) = 0.10536$ |
| 2 | 0 | 0.1 | $-\log(1 - 0.1) = -\log(0.9) = 0.10536$ |
| 3 | 1 | 0.8 | $-\log(0.8) = 0.22314$ |

Average: $(0.10536 + 0.10536 + 0.22314) / 3 = 0.14462$

**Categorical cross-entropy** with `y_true = [[1,0,0], [0,1,0]]` and `y_pred = [[0.7,0.2,0.1], [0.1,0.8,0.1]]`:

| Sample | True class | Predicted prob | Loss term |
|---|---|---|---|
| 1 | class 0 | 0.7 | $-\log(0.7) = 0.35667$ |
| 2 | class 1 | 0.8 | $-\log(0.8) = 0.22314$ |

Average: $(0.35667 + 0.22314) / 2 = 0.28991$

### Time & Space Complexity

- Time: $O(N \cdot C)$ where $N$ is the number of samples and $C$ is the number of classes
- Space: $O(N \cdot C)$ for intermediate arrays

---

## Common Pitfalls

### Forgetting to Clip Predictions

Without epsilon clipping, $\log(0)$ produces $-\infty$ and breaks training.

::tabs-start
```python
# Wrong: log(0) is undefined
loss = -np.mean(y_true * np.log(y_pred))

# Correct: clip away from 0 and 1
y_pred = np.clip(y_pred, 1e-7, 1 - 1e-7)
loss = -np.mean(y_true * np.log(y_pred))
```
::tabs-end


### Mixing Up Binary and Categorical

Binary cross-entropy expects 1D arrays (one probability per sample). Categorical expects 2D arrays (one probability per class per sample). Using the wrong one silently produces wrong gradients.

::tabs-start
```python
# Wrong: using BCE formula on one-hot encoded multi-class data
loss = -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))

# Correct: for multi-class, sum over classes first, then average over samples
loss = -np.mean(np.sum(y_true * np.log(y_pred), axis=1))
```
::tabs-end


---

## In the GPT Project

This becomes `foundations/loss.py`. Cross-entropy loss is what the GPT training loop minimizes. At each position, the model predicts a distribution over the vocabulary, and cross-entropy measures how well that distribution matches the actual next token.

---

## Key Takeaways

- Cross-entropy loss is the standard for classification because it heavily penalizes confident wrong predictions via the $-\log$ function.
- Epsilon clipping prevents $\log(0)$ errors. This is such a common need that PyTorch's built-in `cross_entropy` handles it automatically.
- Binary cross-entropy handles two classes; categorical cross-entropy generalizes to any number of classes using one-hot labels.
