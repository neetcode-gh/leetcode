## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Layer Normalization** - You just implemented normalizing across features within each sample. Batch normalization normalizes across the batch for each feature instead.
- **Mean and Variance** - Computing $\mu = \frac{1}{N}\sum x_i$ and $\sigma^2 = \frac{1}{N}\sum(x_i - \mu)^2$ along the batch axis
- **Training vs Inference** - Batch norm behaves differently in training (uses batch statistics) and inference (uses running statistics). This dual behavior is the trickiest part.

---

## Concept

Layer normalization normalizes across features within each sample (axis=1). Batch normalization flips the axis: it normalizes across the batch for each feature (axis=0).

For a batch of $N$ samples, each with $D$ features:

**During training:**
1. Compute mean and variance for each feature across the batch
2. Normalize: $\hat{x} = \frac{x - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}}$
3. Scale and shift: $y = \gamma \cdot \hat{x} + \beta$ (learned parameters)
4. Update running statistics via exponential moving average

**During inference:**
Use the accumulated running statistics instead of batch statistics. This is critical because at inference time you might process a single sample, making batch statistics meaningless.

The running statistics update uses momentum $m$:

$$\text{running\_mean} = (1 - m) \cdot \text{running\_mean} + m \cdot \mu_B$$

This exponential moving average gives recent batches more weight while smoothing over the entire training history.

Why does batch norm help? It reduces "internal covariate shift": as earlier layers update during training, the distribution of inputs to later layers constantly changes. Batch norm re-centers and re-scales these distributions, allowing higher learning rates and faster convergence.

---

## Solution

### Intuition

In training mode: compute mean and variance along axis=0, normalize, apply affine transform, update running stats. In inference mode: skip the batch statistics entirely and use the running mean/variance that were accumulated during training.

### Implementation

::tabs-start
```python
import numpy as np
from typing import Tuple, List


class Solution:
    def batch_norm(self, x: List[List[float]], gamma: List[float], beta: List[float],
                   running_mean: List[float], running_var: List[float],
                   momentum: float, eps: float, training: bool) -> Tuple[List[List[float]], List[float], List[float]]:
        x = np.array(x)
        gamma = np.array(gamma)
        beta = np.array(beta)
        running_mean = np.array(running_mean, dtype=np.float64)
        running_var = np.array(running_var, dtype=np.float64)

        if training:
            batch_mean = np.mean(x, axis=0)
            batch_var = np.var(x, axis=0)
            x_hat = (x - batch_mean) / np.sqrt(batch_var + eps)
            running_mean = (1 - momentum) * running_mean + momentum * batch_mean
            running_var = (1 - momentum) * running_var + momentum * batch_var
        else:
            x_hat = (x - running_mean) / np.sqrt(running_var + eps)

        out = gamma * x_hat + beta
        return (np.round(out, 4).tolist(), np.round(running_mean, 4).tolist(), np.round(running_var, 4).tolist())
```
::tabs-end


### Walkthrough

Given a batch of 3 samples with 4 features, `gamma = [1,1,1,1]`, `beta = [0,0,0,0]`, training=True:

```
x = [[1, 2, 3, 4],
     [5, 6, 7, 8],
     [9, 10, 11, 12]]
```

| Step | Computation | Result |
|---|---|---|
| Batch mean (axis=0) | $[1+5+9, 2+6+10, ...] / 3$ | $\mu_B = [5, 6, 7, 8]$ |
| Batch variance | $[(1-5)^2 + (5-5)^2 + (9-5)^2] / 3, ...$ | $\sigma_B^2 = [10.667, 10.667, 10.667, 10.667]$ |
| Normalize row 1 | $(1 - 5) / \sqrt{10.667}$ | $-1.2247$ |
| Normalize row 2 | $(5 - 5) / \sqrt{10.667}$ | $0.0$ |
| Normalize row 3 | $(9 - 5) / \sqrt{10.667}$ | $1.2247$ |
| Update running mean | $0.9 \cdot [0,0,0,0] + 0.1 \cdot [5,6,7,8]$ | $[0.5, 0.6, 0.7, 0.8]$ |
| Update running var | $0.9 \cdot [1,1,1,1] + 0.1 \cdot [10.667,...]$ | $[1.9667, 1.9667, 1.9667, 1.9667]$ |

With `gamma = [2, 0.5, 1.5]` and `beta = [1, -1, 0.5]`, the affine transform would scale and shift each feature independently.

### Time & Space Complexity

- Time: $O(N \cdot D)$ where $N$ is batch size and $D$ is features
- Space: $O(N \cdot D)$ for the normalized output (plus $O(D)$ for running statistics)

---

## Common Pitfalls

### Using Batch Statistics During Inference

During inference (`training=False`), you must use the running statistics, not the current batch. Using batch statistics at inference time means your model's output depends on what other samples are in the batch.

::tabs-start
```python
# Wrong: always using batch statistics
batch_mean = np.mean(x, axis=0)
batch_var = np.var(x, axis=0)
x_hat = (x - batch_mean) / np.sqrt(batch_var + eps)

# Correct: check training flag
if training:
    batch_mean = np.mean(x, axis=0)
    batch_var = np.var(x, axis=0)
    x_hat = (x - batch_mean) / np.sqrt(batch_var + eps)
else:
    x_hat = (x - running_mean) / np.sqrt(running_var + eps)
```
::tabs-end


### Normalizing Along the Wrong Axis

Batch norm normalizes across the batch (axis=0), not across features (axis=1). Normalizing across features gives you layer normalization instead.

::tabs-start
```python
# Wrong: this is layer normalization (axis=1)
batch_mean = np.mean(x, axis=1, keepdims=True)

# Correct: batch normalization normalizes across samples (axis=0)
batch_mean = np.mean(x, axis=0)
```
::tabs-end


---

## In the GPT Project

This becomes `model/batch_normalization.py`. While modern transformers (GPT, LLaMA) use **layer normalization** rather than batch normalization, understanding batch norm is essential context. Batch norm was the breakthrough that made training deep CNNs practical (ResNets), and the distinction between batch vs layer normalization is a common interview question. The key tradeoff: batch norm depends on batch size and behaves differently at train/eval time, while layer norm is batch-independent and consistent.

---

## Key Takeaways

- Batch normalization normalizes across the batch for each feature (axis=0), while layer normalization normalizes across features for each sample (axis=1). The axis flip changes everything about when and where each technique works best.
- The train/inference split is the hardest part: during training you use live batch statistics and update running estimates. During inference you use those accumulated running estimates because batch statistics from a single sample are meaningless.
- Running statistics use an exponential moving average controlled by momentum. This smooths over the randomness of individual mini-batches while tracking the distribution as the network learns.
