## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Gradient Descent** - The update rule $w \leftarrow w - \alpha \nabla L$ is how models learn, and this problem applies it to multiple weights simultaneously
- **Linear Regression Forward Pass** - You need to compute $\hat{y} = Xw$ before you can compute gradients
- **Partial Derivatives** - Each weight has its own gradient telling it which direction to move, computed by holding all other weights constant

---

## Concept

Training linear regression means finding the weight vector $w$ that minimizes the MSE loss. The forward pass gives us predictions, the loss tells us how bad they are, and the gradient tells us how to adjust each weight.

The MSE loss is:

$$L = \frac{1}{N} \sum_{i=1}^{N} (\hat{y}_i - y_i)^2$$

The partial derivative with respect to weight $w_j$ is:

$$\frac{\partial L}{\partial w_j} = \frac{-2}{N} \sum_{i=1}^{N} (y_i - \hat{y}_i) \cdot x_{i,j}$$

In plain terms: the gradient for weight $j$ is the average of (the error at each sample times that sample's $j$-th feature). This makes sense intuitively: if a feature is large and the error is large, that weight needs a big update.

This can be computed as a single dot product: $\frac{-2}{N} (y - \hat{y})^T X_j$ where $X_j$ is the $j$-th column of $X$. Each weight is updated independently using the gradient descent rule. This is called **batch gradient descent** because we use all $N$ samples for each update.

---

## Solution

### Intuition

At each iteration, compute predictions with current weights, compute the gradient for each weight as a dot product of the residual error with the corresponding feature column, and update. Repeat for `num_iterations` steps.

### Implementation

::tabs-start
```python
import numpy as np
from numpy.typing import NDArray


class Solution:
    def get_derivative(self, model_prediction: NDArray[np.float64], ground_truth: NDArray[np.float64], N: int, X: NDArray[np.float64], desired_weight: int) -> float:
        # note that N is just len(X)
        return -2 * np.dot(ground_truth - model_prediction, X[:, desired_weight]) / N

    def get_model_prediction(self, X: NDArray[np.float64], weights: NDArray[np.float64]) -> NDArray[np.float64]:
        return np.squeeze(np.matmul(X, weights))

    learning_rate = 0.01

    def train_model(
        self,
        X: NDArray[np.float64],
        Y: NDArray[np.float64],
        num_iterations: int,
        initial_weights: NDArray[np.float64]
    ) -> NDArray[np.float64]:
        for _ in range(num_iterations):
            prediction = self.get_model_prediction(X, initial_weights)
            for j in range(len(initial_weights)):
                gradient = self.get_derivative(prediction, Y, len(X), X, j)
                initial_weights[j] -= gradient * self.learning_rate

        return np.round(initial_weights, 5)
```
::tabs-end


### Walkthrough

Given $X = [[1, 2], [3, 4]]$, $Y = [5, 11]$, `initial_weights = [0, 0]`, `learning_rate = 0.01`, 1 iteration:

| Step | Computation | Result |
|---|---|---|
| Forward | $\hat{y} = Xw = [0, 0]$ | error $= [5, 11]$ |
| Gradient $w_0$ | $\frac{-2}{2}((5)(1) + (11)(3))$ | $-38$ |
| Gradient $w_1$ | $\frac{-2}{2}((5)(2) + (11)(4))$ | $-54$ |
| Update $w_0$ | $0 - 0.01 \times (-38)$ | $0.38$ |
| Update $w_1$ | $0 - 0.01 \times (-54)$ | $0.54$ |

After more iterations, the weights converge toward the true relationship $y = 1x_1 + 2x_2 + 1$.

### Time & Space Complexity

- Time: $O(T \cdot d \cdot N)$ where $T$ is iterations, $d$ is features, $N$ is samples
- Space: $O(N)$ for prediction and gradient vectors

---

## Common Pitfalls

### Updating Weights with Stale Predictions

If you recompute predictions inside the inner weight loop, each weight sees a different prediction vector. Compute predictions once per iteration, then update all weights.

::tabs-start
```python
# Wrong: recomputing predictions after each weight update
for j in range(len(weights)):
    prediction = self.get_model_prediction(X, weights)  # stale!
    gradient = self.get_derivative(prediction, Y, N, X, j)
    weights[j] -= gradient * lr

# Correct: compute predictions once, update all weights
prediction = self.get_model_prediction(X, weights)
for j in range(len(weights)):
    gradient = self.get_derivative(prediction, Y, N, X, j)
    weights[j] -= gradient * lr
```
::tabs-end


### Getting the Gradient Sign Wrong

The derivative formula has a negative sign because we compute $(y - \hat{y})$, not $(\hat{y} - y)$. Flipping the sign makes the model diverge instead of converge.

::tabs-start
```python
# Wrong: wrong sign, model diverges
return 2 * np.dot(ground_truth - model_prediction, X[:, j]) / N

# Correct: negative sign
return -2 * np.dot(ground_truth - model_prediction, X[:, j]) / N
```
::tabs-end


---

## In the GPT Project

This becomes `foundations/linear_regression_training.py`. The pattern here (compute gradient per parameter, update each one) is exactly what `optimizer.step()` does under the hood in PyTorch. The difference is that PyTorch automates the gradient computation with autograd.

---

## Key Takeaways

- Training computes the partial derivative of the loss with respect to each weight, which is a dot product between the error vector and the feature column.
- Batch gradient descent uses all samples per update, giving stable gradients but requiring a pass over the full dataset each iteration.
- The learning rate of 0.01 is small enough to converge but large enough to make progress. Too large and the weights oscillate; too small and training crawls.
