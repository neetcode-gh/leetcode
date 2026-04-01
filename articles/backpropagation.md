## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Chain Rule** - Computing derivatives of composite functions like $f(g(h(x)))$ by multiplying the individual derivatives, because backpropagation is literally the chain rule applied systematically
- **Single Neuron Forward Pass** - You need the forward pass ($z = x \cdot w + b$, then sigmoid) before you can compute gradients going backward
- **Gradient Descent** - Once you have the gradients, you update weights by stepping opposite to them

---

## Concept

Backpropagation is how neural networks learn. It computes how much each weight and bias contributed to the total loss by applying the chain rule backward through the computation graph.

For a single neuron with sigmoid activation and squared error loss, the chain of computation is:

$$z = x \cdot w + b \quad \rightarrow \quad \hat{y} = \sigma(z) \quad \rightarrow \quad L = \frac{1}{2}(\hat{y} - y)^2$$

To find $\frac{\partial L}{\partial w}$, we chain the derivatives step by step:

$$\frac{\partial L}{\partial w} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial z} \cdot \frac{\partial z}{\partial w}$$

Each piece is simple on its own:
- $\frac{\partial L}{\partial \hat{y}} = \hat{y} - y$ (error signal)
- $\frac{\partial \hat{y}}{\partial z} = \hat{y}(1 - \hat{y})$ (sigmoid derivative, which has this elegant form)
- $\frac{\partial z}{\partial w} = x$ (the input itself)

The product of the first two, $(\hat{y} - y) \cdot \hat{y}(1 - \hat{y})$, is called the **delta**. It captures "how wrong are we, scaled by how sensitive the activation is at this operating point." The weight gradient is delta times the input. The bias gradient is just delta (since $\frac{\partial z}{\partial b} = 1$).

---

## Solution

### Intuition

We run the forward pass to get $\hat{y}$, compute the delta term (error times sigmoid derivative), then multiply by each input to get the weight gradients. The bias gradient is the delta itself.

### Implementation

::tabs-start
```python
import numpy as np
from numpy.typing import NDArray
from typing import Tuple


class Solution:
    def backward(self, x: NDArray[np.float64], w: NDArray[np.float64], b: float, y_true: float) -> Tuple[NDArray[np.float64], float]:
        z = np.dot(x, w) + b
        y_hat = 1.0 / (1.0 + np.exp(-z))

        error = y_hat - y_true
        sigmoid_deriv = y_hat * (1.0 - y_hat)
        delta = error * sigmoid_deriv

        dL_dw = np.round(delta * x, 5)
        dL_db = round(float(delta), 5)

        return (dL_dw, dL_db)
```
::tabs-end


### Walkthrough

Given `x = [1.0, 2.0]`, `w = [0.5, -0.5]`, `b = 0.1`, `y_true = 1.0`:

| Step | Computation | Result |
|---|---|---|
| Linear | $z = 1.0(0.5) + 2.0(-0.5) + 0.1$ | $-0.4$ |
| Sigmoid | $\hat{y} = 1/(1 + e^{0.4})$ | $0.40131$ |
| Error | $\hat{y} - y$ | $-0.59869$ |
| Sigmoid deriv | $0.40131 \times 0.59869$ | $0.24026$ |
| Delta | $-0.59869 \times 0.24026$ | $-0.14384$ |
| $dL/dw$ | $[-0.14384 \times 1.0, -0.14384 \times 2.0]$ | $[-0.14384, -0.28768]$ |
| $dL/db$ | $-0.14384$ | $-0.14384$ |

The negative gradients mean: increase $w_0$, increase $w_1$, and increase $b$ to push $\hat{y}$ closer to 1.0.

### Time & Space Complexity

- Time: $O(d)$ where $d$ is the number of input features
- Space: $O(d)$ for the weight gradient vector

---

## Common Pitfalls

### Getting the Error Direction Wrong

The error is $\hat{y} - y$, not $y - \hat{y}$. Flipping it negates all gradients, making the model move away from the target.

::tabs-start
```python
# Wrong: inverted error
error = y_true - y_hat

# Correct: prediction minus truth
error = y_hat - y_true
```
::tabs-end


### Forgetting the Sigmoid Derivative

The sigmoid derivative is part of the chain. Without it, you are computing the gradient as if the activation were linear, which gives wrong weight updates.

::tabs-start
```python
# Wrong: missing sigmoid derivative in the chain
delta = error  # only the error, no activation derivative

# Correct: error * sigmoid derivative
sigmoid_deriv = y_hat * (1.0 - y_hat)
delta = error * sigmoid_deriv
```
::tabs-end


---

## In the GPT Project

This becomes `foundations/backprop.py`. In practice, PyTorch's autograd computes all of this automatically when you call `loss.backward()`. But understanding the manual chain-rule computation explains what happens under the hood and why vanishing gradients occur (the sigmoid derivative term can be very small).

---

## Key Takeaways

- Backpropagation decomposes the gradient into a chain of simple derivatives. Each link in the chain corresponds to one operation in the forward pass.
- The "delta" term (error times activation derivative) is the core building block. In deeper networks, deltas propagate backward through layers.
- The sigmoid derivative $\hat{y}(1-\hat{y})$ peaks at 0.25 when $\hat{y} = 0.5$ and approaches 0 at the extremes, which is why deep sigmoid networks suffer from vanishing gradients.
