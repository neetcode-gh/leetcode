## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Exponentials and Logarithms** - The exponential function amplifies differences between values, and understanding $e^x$ behavior is critical for seeing why softmax works
- **Probability Distributions** - A valid distribution sums to 1 with all values in $[0, 1]$, which is exactly what softmax produces from arbitrary real numbers

---

## Concept

A neural network's output layer for multi-class classification produces raw scores called **logits**. These can be any real number, positive or negative. Softmax converts them into a proper probability distribution.

Given a vector $z$ of length $K$:

$$\text{softmax}(z_i) = \frac{e^{z_i}}{\sum_{j=1}^{K} e^{z_j}}$$

Each output is in $(0, 1)$ and they all sum to $1$. The exponential function does the heavy lifting: it makes larger logits get disproportionately more probability mass. If one logit is much bigger than the rest, softmax pushes its probability close to 1 and the others close to 0. This "winner-take-more" behavior makes the model's prediction sharp and decisive.

A practical concern is **numerical stability**. If any $z_i$ is very large (say 1000), $e^{1000}$ overflows to infinity. The fix is to subtract $\max(z)$ from all elements before exponentiating:

$$\frac{e^{z_i - c}}{\sum_j e^{z_j - c}} = \frac{e^{z_i} / e^c}{\sum_j e^{z_j} / e^c} = \frac{e^{z_i}}{\sum_j e^{z_j}}$$

The constant cancels out, so the result is identical. But now the largest exponent is $e^0 = 1$, which is safe.

---

## Solution

### Intuition

We shift the input by subtracting the maximum value for numerical stability, exponentiate each element, then divide by the sum of all exponentials. Three lines of NumPy, no loops.

### Implementation

::tabs-start
```python
import numpy as np
from numpy.typing import NDArray


class Solution:

    def softmax(self, z: NDArray[np.float64]) -> NDArray[np.float64]:
        shifted = z - np.max(z)
        exps = np.exp(shifted)
        return np.round(exps / np.sum(exps), 4)
```
::tabs-end


### Walkthrough

For `z = [1.0, 2.0, 3.0]`:

| Step | Computation | Result |
|---|---|---|
| Shift | $z - \max(z) = [1-3, 2-3, 3-3]$ | $[-2.0, -1.0, 0.0]$ |
| Exponentiate | $[e^{-2}, e^{-1}, e^{0}]$ | $[0.1353, 0.3679, 1.0]$ |
| Sum | $0.1353 + 0.3679 + 1.0$ | $1.5032$ |
| Normalize | $[0.1353, 0.3679, 1.0] / 1.5032$ | $[0.0900, 0.2447, 0.6652]$ |

The largest logit (3.0) gets the highest probability (0.6652), and all three sum to 1.0.

### Time & Space Complexity

- Time: $O(n)$ where $n$ is the length of the input vector
- Space: $O(n)$ for the intermediate and output arrays

---

## Common Pitfalls

### Forgetting the Numerical Stability Trick

Without subtracting the max, large logits cause overflow.

::tabs-start
```python
# Wrong: overflows for large z values
exps = np.exp(z)
return exps / np.sum(exps)

# Correct: subtract max first
shifted = z - np.max(z)
exps = np.exp(shifted)
return exps / np.sum(exps)
```
::tabs-end


### Confusing Softmax with Sigmoid

Sigmoid maps each element independently to $(0,1)$. Softmax creates a distribution that sums to 1 across all elements. They are not interchangeable.

::tabs-start
```python
# Wrong for multi-class: outputs don't sum to 1
probs = 1 / (1 + np.exp(-z))

# Correct for multi-class: proper probability distribution
probs = np.exp(z - np.max(z)) / np.sum(np.exp(z - np.max(z)))
```
::tabs-end


---

## In the GPT Project

This becomes `foundations/softmax.py`. Softmax is the final operation in the GPT model's forward pass, converting raw vocabulary logits into a probability distribution over the next token.

---

## Key Takeaways

- Softmax converts arbitrary real-valued logits into a proper probability distribution that sums to 1.
- Subtracting the maximum value before exponentiation prevents numerical overflow without changing the result.
- The exponential function amplifies differences between logits, making softmax act as a "soft" version of argmax.
