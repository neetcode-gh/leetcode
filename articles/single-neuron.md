## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Dot Products** - The weighted sum $x \cdot w$ is the core computation, and understanding it geometrically (projection of input onto weight direction) builds intuition
- **Activation Functions** - Sigmoid, ReLU, and linear activations each produce different output ranges and have different gradient properties
- **Linear Regression** - A neuron with no activation is exactly linear regression, so this builds directly on the previous problem

---

## Concept

A single neuron is the atomic building block of every neural network. It takes a vector of inputs $x$, computes a weighted sum with weights $w$, adds a bias $b$, and passes the result through an activation function:

$$z = x \cdot w + b$$
$$a = \sigma(z)$$

Think of $z$ as the neuron's "raw opinion" about the input. The dot product measures how aligned the input is with the weight vector. The bias shifts this opinion up or down. The activation function then shapes the output range.

The three activations here represent three common use cases:
- **Sigmoid** ($\frac{1}{1+e^{-z}}$): squashes output to $(0, 1)$, used for binary classification where you want a probability
- **ReLU** ($\max(0, z)$): passes positive values, blocks negatives, used in hidden layers for its clean gradient behavior
- **Linear** ($z$): no transformation, used for regression where the output can be any real number

A full neural network is just many of these neurons organized into layers. Each neuron in a layer receives the outputs of the previous layer as its inputs. The power comes from combining many simple nonlinear functions into a complex one.

---

## Solution

### Intuition

We compute the dot product of inputs and weights using `np.dot`, add the bias, then branch on the activation type. This is the simplest possible neural network forward pass.

### Implementation

::tabs-start
```python
import numpy as np
from numpy.typing import NDArray


class Solution:
    def forward(self, x: NDArray[np.float64], w: NDArray[np.float64], b: float, activation: str) -> float:
        z = np.dot(x, w) + b
        if activation == "sigmoid":
            result = 1.0 / (1.0 + np.exp(-z))
        elif activation == "relu":
            result = max(0.0, z)
        else:
            result = z
        return round(float(result), 5)
```
::tabs-end


### Walkthrough

Given `x = [1.0, 2.0]`, `w = [0.5, -0.5]`, `b = 0.1`:

| Step | Computation | Result |
|---|---|---|
| Dot product | $(1.0)(0.5) + (2.0)(-0.5)$ | $-0.5$ |
| Add bias | $-0.5 + 0.1$ | $z = -0.4$ |
| Sigmoid | $1 / (1 + e^{0.4})$ | $0.40131$ |
| ReLU | $\max(0, -0.4)$ | $0.0$ |
| Linear | $-0.4$ | $-0.4$ |

The negative $z$ means the input is "misaligned" with the weight direction. Sigmoid maps this to a below-0.5 probability, ReLU zeros it out, and linear passes it through.

### Time & Space Complexity

- Time: $O(d)$ where $d$ is the number of input features (for the dot product)
- Space: $O(1)$ since we only store scalar values

---

## Common Pitfalls

### Forgetting the Bias

The bias shifts the decision boundary. Without it, the neuron can only represent functions that pass through the origin.

::tabs-start
```python
# Wrong: missing bias
z = np.dot(x, w)

# Correct: include bias
z = np.dot(x, w) + b
```
::tabs-end


### Using max() vs np.maximum() for Scalar ReLU

For a single scalar, Python's built-in `max` works fine. But if you later vectorize to arrays, you need `np.maximum`.

::tabs-start
```python
# Fine for scalars
result = max(0.0, z)

# Required for arrays (vectorized ReLU)
result = np.maximum(0, z_array)
```
::tabs-end


---

## In the GPT Project

This becomes `foundations/neuron.py`. A single neuron is what each element of an `nn.Linear` layer computes. The feed-forward network inside each transformer block has thousands of these neurons operating in parallel via matrix multiplication.

---

## Key Takeaways

- A single neuron computes $\sigma(x \cdot w + b)$, and every neural network is built from compositions of this operation.
- The activation function determines the neuron's output range and non-linearity. Choosing the right activation for the right layer is a key design decision.
- The dot product $x \cdot w$ measures similarity between the input and the weight vector. Training adjusts $w$ so that this similarity is high for inputs the neuron should activate on.
