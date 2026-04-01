## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Derivatives** - The derivative $f'(x)$ tells you the slope at any point, which is the direction of steepest increase
- **Iterative Algorithms** - Running the same update step in a loop until convergence

---

## Concept

Every neural network learns by gradient descent. The idea is simple: if you know which direction makes the loss bigger (the gradient), step the opposite way.

For a function $f(x) = x^2$, the minimum is at $x = 0$. The derivative $f'(x) = 2x$ tells us the slope. If $x$ is positive, the slope is positive, meaning the function is increasing, so we should decrease $x$. If $x$ is negative, we should increase it. The update rule captures this:

$$x_{\text{new}} = x - \alpha \cdot f'(x)$$

The learning rate $\alpha$ controls step size. Too large and you overshoot the minimum, bouncing back and forth. Too small and training takes forever. In practice, finding the right learning rate is one of the most important parts of training a model.

This generalizes to functions of many variables. In a neural network, $x$ becomes a vector of millions of weights, $f$ becomes the loss function, and the gradient $\nabla f$ is a vector of partial derivatives pointing uphill. You subtract it to go downhill.

---

## Solution

### Intuition

We start at some initial value and repeatedly apply the update rule. Each iteration computes the derivative at the current position ($2x$), multiplies by the learning rate, and subtracts. The value shrinks geometrically toward zero.

### Implementation

::tabs-start
```python
class Solution:
    def get_minimizer(self, iterations: int, learning_rate: float, init: int) -> float:
        minimizer = init

        for _ in range(iterations):
            derivative = 2 * minimizer
            minimizer = minimizer - learning_rate * derivative

        return round(minimizer, 5)
```
::tabs-end


### Walkthrough

With `init = 10`, `learning_rate = 0.1`, `iterations = 3`:

| Iteration | $x$ | $f'(x) = 2x$ | Update: $x - 0.1 \cdot f'(x)$ |
|---|---|---|---|
| 1 | 10.0 | 20.0 | $10 - 2.0 = 8.0$ |
| 2 | 8.0 | 16.0 | $8 - 1.6 = 6.4$ |
| 3 | 6.4 | 12.8 | $6.4 - 1.28 = 5.12$ |

Each step multiplies $x$ by $(1 - 2\alpha) = 0.8$, so convergence is geometric.

### Time & Space Complexity

- Time: $O(n)$ where $n$ is the number of iterations
- Space: $O(1)$

---

## Common Pitfalls

### Forgetting to Update the Variable

A common mistake is computing the derivative but not actually subtracting it from the current value:

::tabs-start
```python
# Wrong: derivative computed but minimizer never changes
derivative = 2 * minimizer
# missing: minimizer = minimizer - learning_rate * derivative

# Correct
derivative = 2 * minimizer
minimizer = minimizer - learning_rate * derivative
```
::tabs-end


### Using the Wrong Derivative

For $f(x) = x^2$, the derivative is $2x$, not $x^2$ or $2$. The derivative must be evaluated at the current $x$ each iteration, not precomputed once.

---

## In the GPT Project

This becomes `foundations/gradient_descent.py`. Every other problem in the course uses gradient descent under the hood. When you train your GPT at the end, `optimizer.step()` is doing exactly this update rule on every weight in the network simultaneously.

---

## Key Takeaways

- Gradient descent finds minima by repeatedly stepping opposite to the gradient, scaled by the learning rate.
- The learning rate is the single most important hyperparameter. Too large causes divergence, too small causes slow convergence.
- For convex functions like $x^2$, gradient descent converges to the global minimum. Neural network loss surfaces are not convex, but gradient descent still works well in practice.
