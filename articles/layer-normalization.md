## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Mean and Variance** - Computing $\mu = \frac{1}{d}\sum x_i$ and $\sigma^2 = \frac{1}{d}\sum(x_i - \mu)^2$ because these are the two statistics that layer normalization uses
- **Why Normalization Helps** - Without normalization, activations can grow or shrink across layers, causing exploding or vanishing gradients. Normalization keeps values in a stable range.

---

## Concept

Layer normalization normalizes the activations within a single training example across all features. Given an input vector $x$ of dimension $d$:

$$\hat{x}_i = \frac{x_i - \mu}{\sqrt{\sigma^2 + \epsilon}}$$

where $\mu$ is the mean of $x$, $\sigma^2$ is the variance, and $\epsilon$ (typically $10^{-5}$) prevents division by zero. After normalization, the output has zero mean and unit variance.

But here is the subtle part: we then apply an **affine transformation** with learned parameters $\gamma$ (scale) and $\beta$ (shift):

$$\text{out}_i = \gamma_i \cdot \hat{x}_i + \beta_i$$

Why learn parameters that could undo the normalization? Because the network might need activations with a non-zero mean or non-unit variance for certain layers. The $\gamma$ and $\beta$ parameters give it that flexibility. If normalization helps, the network keeps $\gamma \approx 1$ and $\beta \approx 0$. If not, it learns to compensate.

Layer norm differs from **batch normalization** in one critical way: batch norm normalizes across the batch dimension (each feature's statistics come from the batch), while layer norm normalizes across the feature dimension (each sample's statistics come from its own features). This makes layer norm independent of batch size and well-suited for transformers, where batch sizes vary and sequences have different lengths.

---

## Solution

### Intuition

Compute the mean and variance of the input, subtract the mean, divide by the standard deviation (with epsilon), then scale by gamma and shift by beta. Five lines of NumPy.

### Implementation

::tabs-start
```python
import numpy as np
from numpy.typing import NDArray


class Solution:
    def forward(self, x: NDArray[np.float64], gamma: NDArray[np.float64], beta: NDArray[np.float64]) -> NDArray[np.float64]:
        eps = 1e-5
        mean = np.mean(x)
        var = np.var(x)
        x_norm = (x - mean) / np.sqrt(var + eps)
        out = gamma * x_norm + beta
        return np.round(out, 5)
```
::tabs-end


### Walkthrough

Given `x = [1.0, 2.0, 3.0, 4.0]`, `gamma = [1.0, 1.0, 1.0, 1.0]`, `beta = [0.0, 0.0, 0.0, 0.0]`:

| Step | Computation | Result |
|---|---|---|
| Mean | $(1+2+3+4)/4$ | $\mu = 2.5$ |
| Variance | $((1-2.5)^2 + (2-2.5)^2 + (3-2.5)^2 + (4-2.5)^2)/4$ | $\sigma^2 = 1.25$ |
| Std | $\sqrt{1.25 + 10^{-5}}$ | $\approx 1.11803$ |
| Normalize | $[(1-2.5)/1.118, \ldots, (4-2.5)/1.118]$ | $[-1.3416, -0.4472, 0.4472, 1.3416]$ |
| Affine | $\gamma=1, \beta=0$, so output = normalized | $[-1.3416, -0.4472, 0.4472, 1.3416]$ |

With $\gamma = [2, 2, 2, 2]$ and $\beta = [1, 1, 1, 1]$, the output would be $[-1.6832, 0.1056, 1.8944, 3.6832]$.

### Time & Space Complexity

- Time: $O(d)$ where $d$ is the number of features
- Space: $O(d)$ for the normalized output

---

## Common Pitfalls

### Forgetting Epsilon

Without epsilon, a constant input (all same values) has variance 0, causing division by zero.

::tabs-start
```python
# Wrong: division by zero when variance is 0
x_norm = (x - mean) / np.sqrt(var)

# Correct: epsilon prevents division by zero
x_norm = (x - mean) / np.sqrt(var + 1e-5)
```
::tabs-end


### Using Batch Statistics Instead of Per-Sample Statistics

Layer norm computes mean and variance per sample. If you accidentally compute statistics across the batch dimension, you get batch normalization instead.

::tabs-start
```python
# Wrong for layer norm: statistics across batch
mean = np.mean(x, axis=0)  # this is batch norm

# Correct for layer norm: statistics across features (within each sample)
mean = np.mean(x)  # for a single sample vector
```
::tabs-end


---

## In the GPT Project

This becomes `model/normalization.py`. The transformer block uses layer normalization twice: once before multi-head attention and once before the feed-forward network. This Pre-Norm architecture is more stable than the original Post-Norm approach used in "Attention Is All You Need."

---

## Key Takeaways

- Layer normalization normalizes across features within each sample, making it independent of batch size and ideal for transformers.
- The epsilon term is small but essential: it prevents division by zero when all features have the same value.
- Learned $\gamma$ and $\beta$ parameters give the network the flexibility to undo normalization if needed, making layer norm a strictly more expressive operation than raw normalization.
