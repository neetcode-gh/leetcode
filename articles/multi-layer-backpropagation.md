## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Single-neuron backpropagation** - The chain rule through one neuron ($z \to \sigma \to L$). Now you're chaining through multiple layers, but the principle is identical.
- **ReLU activation** - Unlike sigmoid, ReLU's derivative is binary: 1 where $z > 0$, 0 elsewhere. This creates the "dead neuron" problem when $z \leq 0$ for all inputs.
- **Matrix multiplication** - Gradients through linear layers involve transposing weight matrices. Understanding $z = xW^T + b$ and its Jacobian is essential.

---

## Concept

Single-neuron backprop had three links in the chain rule: loss $\to$ activation $\to$ weights. A multi-layer network has more links but the same idea: multiply local derivatives as you walk backward from the loss.

For a 2-layer MLP with ReLU:

$$x \xrightarrow{W_1, b_1} z_1 \xrightarrow{\text{ReLU}} a_1 \xrightarrow{W_2, b_2} z_2 \xrightarrow{\text{MSE}} L$$

Each arrow is one step in the chain rule. Working backward from $L$:

1. $\frac{\partial L}{\partial z_2}$ is the error signal from MSE
2. $\frac{\partial L}{\partial W_2}$ and $\frac{\partial L}{\partial b_2}$ use $a_1$ (the layer's input)
3. $\frac{\partial L}{\partial a_1}$ passes the gradient backward through $W_2$
4. $\frac{\partial L}{\partial z_1}$ multiplies by the ReLU mask (binary: 1 or 0)
5. $\frac{\partial L}{\partial W_1}$ and $\frac{\partial L}{\partial b_1}$ use $x$ (the network's input)

The ReLU derivative is the critical piece: where $z_1 > 0$, the gradient passes through unchanged. Where $z_1 \leq 0$, the gradient is zeroed out. This is why neurons can "die" during training: if a neuron's pre-activation is always negative, it permanently stops learning.

---

## Solution

### Intuition

Run the forward pass to get all intermediate values ($z_1$, $a_1$, $z_2$), compute MSE loss, then walk backward applying the chain rule at each layer. Each layer's weight gradient is the outer product of the incoming error signal and the layer's input.

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

Given `x = [1.0, 2.0]`, `W1 = [[1, 0], [0, 1]]` (identity), `b1 = [0, 0]`, `W2 = [[0.5, 0.5]]`, `b2 = [0]`, `y_true = [1.0]`:

| Step | Operation | Result |
|---|---|---|
| Layer 1 linear | $z_1 = x \cdot W_1^T + b_1$ | $[1.0, 2.0]$ |
| ReLU | $a_1 = \max(0, z_1)$ | $[1.0, 2.0]$ (all positive, all pass) |
| Layer 2 linear | $z_2 = a_1 \cdot W_2^T + b_2$ | $[1.5]$ |
| MSE loss | $(1.5 - 1.0)^2$ | $0.25$ |
| Output gradient | $\frac{2(1.5 - 1.0)}{1}$ | $dz_2 = [1.0]$ |
| Layer 2 weights | $[1.0] \cdot [1.0, 2.0]$ | $dW_2 = [[1.0, 2.0]]$ |
| Gradient to $a_1$ | $[1.0] \cdot W_2 = [0.5, 0.5]$ | Passes through ReLU (mask is all 1s) |
| Layer 1 weights | $[0.5, 0.5]^T \cdot [1.0, 2.0]$ | $dW_1 = [[0.5, 1.0], [0.5, 1.0]]$ |

### Time & Space Complexity

- Time: $O(d_1 \cdot d_2 + d_2 \cdot d_3)$ where $d_i$ are layer dimensions (matrix multiplications dominate)
- Space: $O(d_1 \cdot d_2 + d_2 \cdot d_3)$ for the gradient matrices

---

## Common Pitfalls

### Forgetting the ReLU Mask

The ReLU derivative is not 1 everywhere. Where $z_1 \leq 0$, the gradient must be zeroed. Omitting this gives incorrect gradients for any neuron that was in the "dead zone."

::tabs-start
```python
# Wrong: gradient flows through regardless of ReLU
dz1 = da1  # ignores the ReLU mask entirely

# Correct: multiply by the ReLU indicator
dz1 = da1 * (z1 > 0).astype(float)
```
::tabs-end


### Wrong Reshape for Outer Product

The weight gradient $dW = \delta^T \cdot x$ requires the error signal as a column vector and the input as a row vector. Forgetting to reshape gives either a scalar (dot product) or an error.

::tabs-start
```python
# Wrong: this computes a dot product (scalar), not a matrix
dW2 = dz2 @ a1

# Correct: outer product via reshape
dW2 = dz2.reshape(-1, 1) @ a1.reshape(1, -1)
```
::tabs-end


---

## In the GPT Project

This becomes `foundations/multi_layer_backprop.py`. Understanding multi-layer backprop is what makes the rest of the course click: when you call `loss.backward()` in PyTorch, it is doing exactly these chain-rule computations automatically through the entire transformer. The ReLU dead-zone issue you encounter here also appears in the feed-forward network inside each transformer block.

---

## Key Takeaways

- Multi-layer backpropagation is the same chain rule as single-neuron backprop, just applied to more links. Each layer's weight gradient is the outer product of the error signal arriving from above and the activation arriving from below.
- The ReLU derivative acts as a binary gate: gradients flow through neurons that fired ($z > 0$) and are killed for neurons that didn't. This is computationally cheap but creates the dead neuron problem.
- Saving intermediate values ($z_1$, $a_1$) during the forward pass is essential. You need them to compute gradients during the backward pass. This is why training uses more memory than inference.
