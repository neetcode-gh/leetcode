## Prerequisites

Before attempting this problem, you should be comfortable with:

- **NumPy Array Operations** - Element-wise operations and broadcasting are how we apply functions to entire arrays at once instead of looping
- **Derivatives** - Knowing the derivative of an activation tells you how gradients flow during backpropagation, which directly affects whether training works
- **Why Non-Linearity Matters** - Without activation functions, stacking linear layers collapses into a single linear transformation, so the network can only learn linear relationships

---

## Concept

Activation functions are what give neural networks their power. A linear layer computes $z = Wx + b$, which is just a weighted sum. Stack two linear layers and you get another linear function. No matter how deep you go, you can only learn straight lines. Activation functions break this limitation by introducing a non-linear "bend" after each linear step.

**Sigmoid** squashes any real number into the range $(0, 1)$:

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

Think of it as a "confidence meter." Large positive values map close to 1, large negative values map close to 0, and zero maps to exactly 0.5. This makes sigmoid natural for binary classification output layers, where you want a probability. The downside is the **vanishing gradient problem**: when $|z|$ is large, the derivative $\sigma'(z) = \sigma(z)(1 - \sigma(z))$ is nearly zero, so gradients shrink to nothing during backpropagation and deep layers stop learning.

**ReLU** (Rectified Linear Unit) is simpler:

$$\text{ReLU}(z) = \max(0, z)$$

Positive inputs pass through unchanged, negative inputs become zero. ReLU is the default activation for hidden layers because it is fast to compute, does not saturate for positive values (gradients stay at 1), and produces sparse activations. Its weakness is "dying ReLU": if a neuron always receives negative input, its gradient is always zero and it never updates.

---

## Solution

### Intuition

Both functions are applied element-wise to a NumPy array. Sigmoid uses the formula directly with `np.exp`. ReLU uses `np.maximum` to compare each element with zero. No loops needed.

### Implementation

::tabs-start
```python
import numpy as np
from numpy.typing import NDArray


class Solution:

    def sigmoid(self, z: NDArray[np.float64]) -> NDArray[np.float64]:
        return np.round(1 / (1 + np.exp(-z)), 5)

    def relu(self, z: NDArray[np.float64]) -> NDArray[np.float64]:
        return np.maximum(0, z)
```
::tabs-end


### Walkthrough

For `z = [-1.0, 0.0, 1.0, 2.0]`:

| Element | Sigmoid: $\frac{1}{1+e^{-z}}$ | ReLU: $\max(0, z)$ |
|---|---|---|
| $-1.0$ | $1/(1+e^{1}) \approx 0.26894$ | $0$ |
| $0.0$ | $1/(1+1) = 0.5$ | $0$ |
| $1.0$ | $1/(1+e^{-1}) \approx 0.73106$ | $1.0$ |
| $2.0$ | $1/(1+e^{-2}) \approx 0.88080$ | $2.0$ |

Notice that sigmoid compresses everything into $(0,1)$, while ReLU is identity for positive values and zero for negatives.

### Time & Space Complexity

- Time: $O(n)$ where $n$ is the number of elements in the input array
- Space: $O(n)$ for the output array

---

## Common Pitfalls

### Using np.max Instead of np.maximum for ReLU

`np.max` returns the single largest element of an array. `np.maximum` compares element-wise.

::tabs-start
```python
# Wrong: returns a single scalar
result = np.max(0, z)

# Correct: element-wise comparison with 0
result = np.maximum(0, z)
```
::tabs-end


### Numerical Overflow in Sigmoid

For very large negative $z$ values, $e^{-z}$ overflows. A common fix is to use a conditional formula, but NumPy handles this gracefully for standard float64 ranges.

::tabs-start
```python
# Potentially unstable for extreme values
result = 1 / (1 + np.exp(-z))

# More robust: use np.clip or the identity sigmoid(-z) = 1 - sigmoid(z)
z_clipped = np.clip(z, -500, 500)
result = 1 / (1 + np.exp(-z_clipped))
```
::tabs-end


---

## In the GPT Project

This becomes `foundations/activations.py`. Every hidden layer in the GPT model uses ReLU (specifically inside the feed-forward network of each transformer block), and sigmoid appears in simpler models like the sentiment classifier and digit classifier.

---

## Key Takeaways

- Sigmoid maps to $(0,1)$ and is used for binary classification outputs, but vanishing gradients make it a poor choice for hidden layers in deep networks.
- ReLU is the default hidden-layer activation because its gradient is either 0 or 1, avoiding the vanishing gradient problem for positive inputs.
- Both are parameter-free and applied element-wise, so they add no learnable parameters to a model.
