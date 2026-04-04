## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Layer Normalization** - BatchNorm normalizes along a different axis than LayerNorm, so understanding LayerNorm first clarifies what changes and why
- **NumPy Broadcasting** - The batch mean and variance have shape `(features,)` but the input has shape `(batch_size, features)`, and broadcasting handles the subtraction automatically
- **Exponential Moving Average** - The running statistics use a momentum-based update rule that smoothly tracks the batch statistics over training

---

## Concept

Batch Normalization normalizes across the **batch dimension** for each feature. While LayerNorm normalizes each sample independently (across features), BatchNorm computes statistics across all samples in the batch for each feature column. This introduces a dependency on the batch during training, which is why BatchNorm requires separate behavior at inference time using pre-computed running statistics.

The critical difference from LayerNorm: during training, you compute mean and variance along `axis=0` (batch). During inference, you use the running statistics that were accumulated during training, because a single-sample batch would have meaningless statistics.

---

## Solution

### Intuition

Convert to NumPy arrays. Branch on the `training` flag: if training, compute batch mean/variance along axis 0, normalize, and update running statistics with exponential moving average. If inference, use the running statistics directly. In both cases, apply the affine transform with gamma and beta.

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

Given `x = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]`, `gamma = [1,1,1,1]`, `beta = [0,0,0,0]`, `momentum = 0.1`, `training = True`:

| Step | Computation | Result |
|---|---|---|
| Batch mean | `mean(x, axis=0)` | $[5, 6, 7, 8]$ |
| Batch var | `var(x, axis=0)` | $[10.667, 10.667, 10.667, 10.667]$ |
| Normalize row 1 | $(1 - 5) / \sqrt{10.667 + \epsilon}$ | $-1.2247$ |
| Normalize row 2 | $(5 - 5) / \sqrt{10.667 + \epsilon}$ | $0.0$ |
| Normalize row 3 | $(9 - 5) / \sqrt{10.667 + \epsilon}$ | $1.2247$ |
| Running mean | $0.9 \times [0,0,0,0] + 0.1 \times [5,6,7,8]$ | $[0.5, 0.6, 0.7, 0.8]$ |
| Running var | $0.9 \times [1,1,1,1] + 0.1 \times [10.667,...]$ | $[1.9667, 1.9667, 1.9667, 1.9667]$ |

The training flag controls which statistics are used. In inference mode, the running mean/var are used directly and are not updated.

### Time & Space Complexity

- Time: $O(N \cdot d)$ where $N$ is batch size and $d$ is the number of features
- Space: $O(d)$ for the mean and variance vectors

---

## Common Pitfalls

### Normalizing Along the Wrong Axis

LayerNorm uses `axis=1` (across features). BatchNorm uses `axis=0` (across batch). Mixing these up produces completely wrong results.

::tabs-start
```python
# Wrong: normalizing across features (that's LayerNorm)
batch_mean = np.mean(x, axis=1)

# Correct: normalizing across the batch
batch_mean = np.mean(x, axis=0)
```
::tabs-end


### Using Batch Statistics During Inference

At inference time, you might have a batch size of 1, making batch mean/var meaningless. Always use the running statistics when `training=False`.

::tabs-start
```python
# Wrong: always using batch stats
batch_mean = np.mean(x, axis=0)
x_hat = (x - batch_mean) / np.sqrt(np.var(x, axis=0) + eps)

# Correct: branch on training flag
if training:
    batch_mean = np.mean(x, axis=0)
    batch_var = np.var(x, axis=0)
    x_hat = (x - batch_mean) / np.sqrt(batch_var + eps)
else:
    x_hat = (x - running_mean) / np.sqrt(running_var + eps)
```
::tabs-end


---

## In the GPT Project

BatchNorm is widely used in CNNs and MLPs but is rarely used in transformers. GPT and most modern LLMs use LayerNorm (or RMSNorm) instead, because attention operates on variable-length sequences where batch statistics across samples are less meaningful. Understanding BatchNorm is still important because it introduces the concept of train/eval mode differences that appear throughout deep learning.

---

## Key Takeaways

- BatchNorm normalizes across the batch (axis 0), not across features. This is the opposite axis from LayerNorm.
- The running statistics are an exponential moving average of batch statistics, accumulated during training for use during inference.
- The momentum parameter controls how quickly the running statistics track the batch statistics. A momentum of 0.1 means 10% of the new batch statistics and 90% of the old running statistics.
