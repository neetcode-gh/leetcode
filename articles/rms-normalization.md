## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Layer Normalization** - RMSNorm is a simplification of LayerNorm, so understanding the full version makes it clear what RMSNorm removes and why
- **Batch Normalization** - Seeing all three normalization variants (BatchNorm, LayerNorm, RMSNorm) builds intuition for why modern LLMs settled on the simplest one
- **Basic NumPy** - The entire implementation is four lines of array math: square, mean, sqrt, divide, multiply

---

## Concept

RMS Normalization is the simplest normalization technique used in modern LLMs. It drops the two most complex parts of LayerNorm: the mean subtraction (re-centering) and the beta shift parameter. All that remains is dividing by the root mean square and scaling by gamma.

The insight from the RMSNorm paper: the re-centering (subtracting the mean) in LayerNorm is not what stabilizes training. The re-scaling (dividing by a magnitude measure) is. RMSNorm keeps only the re-scaling, using fewer operations and fewer parameters.

---

## Solution

### Intuition

Compute the RMS of the input vector (square each element, take the mean, add epsilon, take the square root). Divide the input by the RMS to normalize. Multiply by gamma to scale. There is no subtraction and no beta.

### Implementation

::tabs-start
```python
import numpy as np
from typing import List


class Solution:
    def rms_norm(self, x: List[float], gamma: List[float], eps: float) -> List[float]:
        x = np.array(x)
        gamma = np.array(gamma)
        # RMS = sqrt(mean(x^2) + eps)
        rms = np.sqrt(np.mean(x ** 2) + eps)
        # Normalize
        x_hat = x / rms
        # Scale (no shift -- no beta!)
        return np.round(gamma * x_hat, 4).tolist()
```
::tabs-end


### Walkthrough

Given `x = [1.0, 2.0, 3.0]`, `gamma = [1.0, 1.0, 1.0]`, `eps = 1e-5`:

| Step | Computation | Result |
|---|---|---|
| Square | $[1^2, 2^2, 3^2]$ | $[1, 4, 9]$ |
| Mean of squares | $(1 + 4 + 9) / 3$ | $4.6667$ |
| RMS | $\sqrt{4.6667 + 10^{-5}}$ | $2.1602$ |
| Normalize | $[1/2.1602, \ 2/2.1602, \ 3/2.1602]$ | $[0.4629, \ 0.9258, \ 1.3887]$ |
| Scale | Multiply by $\gamma = [1, 1, 1]$ | $[0.4629, \ 0.9258, \ 1.3887]$ |

With `gamma = [2.0, 0.5, 1.0]`, the same normalized values become $[0.9258, 0.4629, 1.3887]$ -- gamma selectively scales each feature.

### Time & Space Complexity

- Time: $O(d)$ where $d$ is the feature dimension -- one pass to compute the mean of squares, one pass to normalize and scale
- Space: $O(d)$ for the normalized vector

---

## Common Pitfalls

### Adding a Beta (Shift) Parameter

RMSNorm does not have a beta parameter. LayerNorm has both gamma and beta; RMSNorm only has gamma. Adding a beta term turns it back into something closer to LayerNorm.

::tabs-start
```python
# Wrong: adding beta like LayerNorm
return np.round(gamma * x_hat + beta, 4).tolist()

# Correct: gamma only, no shift
return np.round(gamma * x_hat, 4).tolist()
```
::tabs-end


### Subtracting the Mean First

RMSNorm does not center the data. If you subtract the mean before computing the RMS, you've implemented LayerNorm's normalization step, not RMSNorm's.

::tabs-start
```python
# Wrong: centering first (that's LayerNorm)
x_centered = x - np.mean(x)
rms = np.sqrt(np.mean(x_centered ** 2) + eps)

# Correct: compute RMS directly from x
rms = np.sqrt(np.mean(x ** 2) + eps)
```
::tabs-end


---

## In the GPT Project

RMSNorm is what modern GPT-style models (Llama, Mistral, Gemma) use instead of LayerNorm. It appears as "Pre-RMSNorm" in architecture diagrams, meaning it's applied before each attention and feed-forward sublayer. The original GPT-2 used LayerNorm; the switch to RMSNorm in newer models is a pure simplification that reduces computation with no quality loss.

---

## Key Takeaways

- RMSNorm is LayerNorm minus the mean subtraction and minus the beta parameter. It's the simplest normalization used in production LLMs.
- The RMS (root mean square) measures the magnitude of the vector. Dividing by it ensures all vectors have roughly unit scale, preventing activations from growing or shrinking through layers.
- Only gamma (scale) is learned, not beta (shift). This halves the number of normalization parameters compared to LayerNorm.
- The epsilon term prevents division by zero when the input is all zeros. It's added inside the square root, not outside.
