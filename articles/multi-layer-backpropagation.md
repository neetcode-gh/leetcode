## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Single-Neuron Backpropagation** - The chain rule mechanics are identical; multi-layer just has more links in the chain
- **Matrix Calculus Basics** - Weight gradients involve outer products ($\frac{\partial L}{\partial W} = \delta^T \cdot x$), not element-wise multiplies
- **ReLU Activation** - Its derivative is a binary mask (1 where input > 0, 0 elsewhere), which makes the backward pass clean but introduces the dead neuron problem

---

## Concept

Multi-layer backpropagation extends the single-neuron case to a full network. The chain rule still applies link by link, but now there are two weight matrices, two bias vectors, and a ReLU in between. The key new element is routing the gradient backward through the ReLU, which acts as a binary gate: gradients flow through unchanged where the pre-activation was positive, and are killed where it was negative.

---

## Solution

### Intuition

Run the forward pass to compute all intermediate values ($z_1$, $a_1$, $z_2$, loss). Then walk backward: compute $\frac{\partial L}{\partial z_2}$ from the MSE loss, get layer-2 gradients, propagate through $W_2$ and the ReLU mask to get $\frac{\partial L}{\partial z_1}$, then compute layer-1 gradients.

### Implementation

::tabs-start
```python
import numpy as np
from typing import List


class Solution:
    def forward_and_backward(self,
                              x: List[float],
                              W1: List[List[float]], b1: List[float],
                              W2: List[List[float]], b2: List[float],
                              y_true: List[float]) -> dict:
        x = np.array(x)
        W1 = np.array(W1)
        b1 = np.array(b1)
        W2 = np.array(W2)
        b2 = np.array(b2)
        y_true = np.array(y_true)

        # Forward pass
        z1 = x @ W1.T + b1          # pre-activation layer 1
        a1 = np.maximum(0, z1)       # ReLU activation
        z2 = a1 @ W2.T + b2          # output (predictions)
        loss = np.mean((z2 - y_true) ** 2)

        # Backward pass
        n = len(y_true) if y_true.ndim > 0 else 1
        dz2 = 2 * (z2 - y_true) / n  # dL/dz2
        dW2 = dz2.reshape(-1, 1) @ a1.reshape(1, -1)  # dL/dW2
        db2 = dz2                      # dL/db2

        da1 = dz2.reshape(1, -1) @ W2  # dL/da1
        da1 = da1.flatten()
        dz1 = da1 * (z1 > 0).astype(float)  # ReLU derivative
        dW1 = dz1.reshape(-1, 1) @ x.reshape(1, -1)  # dL/dW1
        db1 = dz1                      # dL/db1

        return {
            'loss': round(float(loss), 4),
            'dW1': np.round(dW1, 4).tolist(),
            'db1': np.round(db1, 4).tolist(),
            'dW2': np.round(dW2, 4).tolist(),
            'db2': np.round(db2, 4).tolist(),
        }
```
::tabs-end


### Walkthrough

Given `x = [1.0, 2.0]`, `W1 = [[1,0],[0,1]]` (identity), `b1 = [0,0]`, `W2 = [[0.5, 0.5]]`, `b2 = [0]`, `y_true = [1.0]`:

| Step | Computation | Result |
|---|---|---|
| $z_1$ | $[1, 2] \cdot I^T + [0, 0]$ | $[1, 2]$ |
| $a_1$ | $\max(0, [1, 2])$ | $[1, 2]$ (all positive, ReLU passes everything) |
| $z_2$ | $[1, 2] \cdot [0.5, 0.5]^T + 0$ | $[1.5]$ |
| Loss | $(1.5 - 1.0)^2$ | $0.25$ |
| $dz_2$ | $2(1.5 - 1.0) / 1$ | $[1.0]$ |
| $dW_2$ | $[1.0]^T \cdot [1, 2]$ | $[[1.0, 2.0]]$ |
| $db_2$ | $dz_2$ | $[1.0]$ |
| $da_1$ | $[1.0] \cdot [[0.5, 0.5]]$ | $[0.5, 0.5]$ |
| ReLU mask | $z_1 > 0 \to [1, 1]$ | (both pass) |
| $dz_1$ | $[0.5, 0.5] \odot [1, 1]$ | $[0.5, 0.5]$ |
| $dW_1$ | $[0.5, 0.5]^T \cdot [1, 2]$ | $[[0.5, 1.0], [0.5, 1.0]]$ |
| $db_1$ | $dz_1$ | $[0.5, 0.5]$ |

### Time & Space Complexity

- Time: $O(d_{\text{in}} \cdot d_{\text{hidden}} + d_{\text{hidden}} \cdot d_{\text{out}})$ for the matrix multiplications in both forward and backward passes
- Space: $O(d_{\text{hidden}})$ for the intermediate activations $z_1$ and $a_1$ that must be saved for the backward pass

---

## Common Pitfalls

### Getting the Gradient Shape Wrong

Weight gradient $dW$ is an outer product of the upstream gradient and the layer's input. The shapes must match the weight matrix: $dW_2$ has shape `(output_size, hidden_size)`, not `(hidden_size, output_size)`.

::tabs-start
```python
# Wrong: shapes reversed
dW2 = a1.reshape(-1, 1) @ dz2.reshape(1, -1)  # (hidden, output) -- wrong!

# Correct: upstream gradient as rows, input as columns
dW2 = dz2.reshape(-1, 1) @ a1.reshape(1, -1)  # (output, hidden) -- correct
```
::tabs-end


### Forgetting the ReLU Mask

The gradient through ReLU is not the identity. It's a binary mask based on the pre-activation $z_1$, not the post-activation $a_1$. Missing this step lets gradients flow through dead neurons.

::tabs-start
```python
# Wrong: no ReLU derivative
dz1 = da1  # Treats ReLU as linear!

# Correct: apply ReLU derivative mask
dz1 = da1 * (z1 > 0).astype(float)
```
::tabs-end


---

## In the GPT Project

This is the foundation of what `loss.backward()` does in PyTorch. In the GPT project, autograd handles all of this automatically, but understanding the manual computation explains why vanishing gradients happen (the ReLU mask kills gradients), why residual connections help (they provide a gradient shortcut past the ReLU), and why gradient clipping is sometimes needed.

---

## Key Takeaways

- Multi-layer backpropagation is the single-neuron chain rule applied repeatedly. Each layer adds one more link to the chain.
- The ReLU derivative is a binary mask: 1 where $z > 0$, 0 elsewhere. This is why dead neurons (always-negative pre-activations) can never recover -- their gradient is permanently zero.
- Weight gradients are outer products: $dW = \delta^T \cdot \text{input}$. Bias gradients equal the upstream gradient directly, because $\frac{\partial z}{\partial b} = 1$.
- The forward pass must save intermediate values ($z_1$, $a_1$) because the backward pass needs them for the ReLU mask and the weight gradient computations.
