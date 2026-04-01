## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Gradient Descent** - The update rule $w \leftarrow w - \alpha \nabla L$ is what the training loop executes each epoch
- **Linear Regression Forward Pass** - Computing $\hat{y} = Xw + b$ and MSE loss, because this training loop trains a linear regression model
- **Vectorized Gradients** - The gradient $\frac{2}{N} X^T (\hat{y} - y)$ computes all weight derivatives in one matrix operation, which is far more efficient than looping

---

## Concept

A training loop is the engine that drives learning. It repeats four steps: forward pass, loss computation, gradient calculation, and weight update. Every neural network uses this exact pattern, from linear regression to GPT.

For linear regression with MSE loss:

1. **Forward pass**: $\hat{y} = Xw + b$
2. **Loss**: $L = \frac{1}{N}\sum(\hat{y}_i - y_i)^2$
3. **Gradients**: $\frac{\partial L}{\partial w} = \frac{2}{N} X^T (\hat{y} - y)$ and $\frac{\partial L}{\partial b} = \frac{2}{N} \sum(\hat{y}_i - y_i)$
4. **Update**: $w \leftarrow w - \alpha \frac{\partial L}{\partial w}$ and $b \leftarrow b - \alpha \frac{\partial L}{\partial b}$

The gradient $\frac{2}{N} X^T (\hat{y} - y)$ is the vectorized form that computes all weight gradients simultaneously. Compare this to the previous linear-regression-training problem where we computed each weight's gradient with a separate dot product. The matrix form $X^T \cdot \text{error}$ does it all at once.

This loop repeats for a fixed number of **epochs**. Each epoch processes the entire dataset. Over time, the weights and bias converge to values that minimize the training loss. This is the same pattern PyTorch uses, except PyTorch automates steps 3-4 with `loss.backward()` and `optimizer.step()`.

---

## Solution

### Intuition

Initialize weights to zeros and bias to zero. Each epoch: compute predictions, compute error, compute vectorized gradients, and update all parameters. Return the final weights and bias.

### Implementation

::tabs-start
```python
import numpy as np
from numpy.typing import NDArray
from typing import Tuple


class Solution:
    def train(self, X: NDArray[np.float64], y: NDArray[np.float64], epochs: int, lr: float) -> Tuple[NDArray[np.float64], float]:
        n = X.shape[0]
        w = np.zeros(X.shape[1])
        b = 0.0

        for _ in range(epochs):
            # Forward pass
            y_hat = X @ w + b
            error = y_hat - y

            # Compute gradients of MSE loss
            dw = (2.0 / n) * (X.T @ error)
            db = (2.0 / n) * np.sum(error)

            # Update weights
            w = w - lr * dw
            b = b - lr * db

        return (np.round(w, 5), round(float(b), 5))
```
::tabs-end


### Walkthrough

Given $X = [[1, 2], [3, 4]]$, $y = [5, 11]$, `lr = 0.01`, `epochs = 2`:

| Epoch | $\hat{y}$ | Error | $dw$ | $db$ | Updated $w$ | Updated $b$ |
|---|---|---|---|---|---|---|
| 1 | $[0, 0]$ | $[-5, -11]$ | $[-38, -54]$ | $-16$ | $[0.38, 0.54]$ | $0.16$ |
| 2 | $[1.62, 3.46]$ | $[-3.38, -7.54]$ | $[-26.54, -33.54]$ | $-10.92$ | $[0.6454, 0.8754]$ | $0.2692$ |

The weights move toward the true relationship each epoch.

### Time & Space Complexity

- Time: $O(E \cdot N \cdot d)$ where $E$ is epochs, $N$ is samples, $d$ is features
- Space: $O(d)$ for the weight vector and $O(N)$ for predictions

---

## Common Pitfalls

### Forgetting the Bias Gradient

The bias has its own gradient. If you only update weights, the model cannot learn functions with non-zero intercepts.

::tabs-start
```python
# Wrong: only updating weights
w = w - lr * dw
# missing: b = b - lr * db

# Correct: update both
w = w - lr * dw
b = b - lr * db
```
::tabs-end


### Getting the Gradient Formula Wrong

The MSE gradient has a factor of $2/N$. Getting this wrong changes the effective learning rate, which can cause divergence or slow convergence.

::tabs-start
```python
# Wrong: missing the 2/N factor
dw = X.T @ error

# Correct: properly scaled gradient
dw = (2.0 / n) * (X.T @ error)
```
::tabs-end


---

## In the GPT Project

This becomes `foundations/training_loop.py`. The four-step pattern (forward, loss, gradient, update) is identical in every training loop. When you train GPT later, `model(x)` is the forward pass, `F.cross_entropy(logits, y)` is the loss, `loss.backward()` computes gradients, and `optimizer.step()` does the update.

---

## Key Takeaways

- The training loop pattern (forward, loss, backward, update) is universal across all gradient-based models, from linear regression to billion-parameter transformers.
- Vectorized gradient computation using $X^T \cdot \text{error}$ replaces per-weight loops, turning $O(d \cdot N)$ separate dot products into a single matrix multiply.
- Initializing weights to zeros works for linear regression but causes symmetry problems in deeper networks, where random initialization is needed to break symmetry.
