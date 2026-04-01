## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Linear Algebra (Matrix Multiplication)** - The forward pass is a single matrix-vector multiply, and understanding shapes like $(N \times d) \cdot (d \times 1) = (N \times 1)$ is essential
- **Mean Squared Error** - MSE is the standard way to measure how far predictions are from truth, and knowing why we square errors (rather than using absolute values) matters for gradient computation

---

## Concept

Linear regression is the simplest predictive model. Given an input matrix $X$ of shape $(N, d)$ where $N$ is the number of samples and $d$ is the number of features, and a weight vector $w$ of length $d$, the prediction is:

$$\hat{y} = X \cdot w$$

Each prediction is a weighted sum of the input features. Think of it as assigning importance to each feature: a large positive weight means that feature strongly pushes the prediction up, a large negative weight pushes it down. There is no bias term in this formulation (you can incorporate bias by adding a column of ones to $X$).

To evaluate how well the model fits, we use **Mean Squared Error (MSE)**:

$$\text{MSE} = \frac{1}{N} \sum_{i=1}^{N} (\hat{y}_i - y_i)^2$$

Squaring the errors does two useful things: it makes all errors positive (so they do not cancel out), and it penalizes large errors much more than small ones. An error of 2 contributes 4 to the loss, while an error of 10 contributes 100. This means the model prioritizes fixing its worst predictions.

---

## Solution

### Intuition

The forward pass is a single matrix-vector multiplication using `np.matmul`. The error computation squares the element-wise differences between predictions and ground truth, then averages them. Both operations are fully vectorized.

### Implementation

::tabs-start
```python
import numpy as np
from numpy.typing import NDArray

class Solution:

    def get_model_prediction(self, X: NDArray[np.float64], weights: NDArray[np.float64]) -> NDArray[np.float64]:
        prediction = np.matmul(X, weights)
        return np.round(prediction, 5)

    def get_error(self, model_prediction: NDArray[np.float64], ground_truth: NDArray[np.float64]) -> float:
        error = np.mean(np.square(model_prediction - ground_truth))
        return round(error, 5)
```
::tabs-end


### Walkthrough

Given $X = [[1, 2], [3, 4], [5, 6]]$, $w = [0.5, -0.5]$, and $y = [0, 1, 0]$:

| Step | Sample 1 | Sample 2 | Sample 3 |
|---|---|---|---|
| $\hat{y} = Xw$ | $1(0.5) + 2(-0.5) = -0.5$ | $3(0.5) + 4(-0.5) = -0.5$ | $5(0.5) + 6(-0.5) = -0.5$ |
| Error $\hat{y} - y$ | $-0.5 - 0 = -0.5$ | $-0.5 - 1 = -1.5$ | $-0.5 - 0 = -0.5$ |
| Squared | $0.25$ | $2.25$ | $0.25$ |

MSE $= (0.25 + 2.25 + 0.25) / 3 = 0.91667$

### Time & Space Complexity

- Time: $O(N \cdot d)$ for matrix-vector multiplication, $O(N)$ for MSE
- Space: $O(N)$ for the prediction vector

---

## Common Pitfalls

### Using Element-wise Multiply Instead of Matrix Multiply

`X * w` broadcasts and multiplies element-wise, which is not the dot product you want.

::tabs-start
```python
# Wrong: element-wise multiplication, wrong shape
prediction = X * weights

# Correct: matrix-vector multiplication
prediction = np.matmul(X, weights)
```
::tabs-end


### Forgetting to Square Before Averaging

Mean absolute error and mean squared error are different loss functions with different gradient properties.

::tabs-start
```python
# Wrong: this is MAE, not MSE
error = np.mean(np.abs(model_prediction - ground_truth))

# Correct: MSE squares the differences
error = np.mean(np.square(model_prediction - ground_truth))
```
::tabs-end


---

## In the GPT Project

This becomes `foundations/linear_regression.py`. The forward pass $\hat{y} = Xw$ is the same operation that happens inside every `nn.Linear` layer in the GPT model. Understanding it at this level makes the transformer's matrix multiplications intuitive.

---

## Key Takeaways

- Linear regression computes predictions as a matrix-vector product $\hat{y} = Xw$, which is the same operation as a single neural network layer without an activation function.
- MSE penalizes errors quadratically, making the model focus on reducing its largest mistakes first.
- The forward pass is the foundation: you must compute predictions before you can compute loss, and loss is what drives learning.
