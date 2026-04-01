## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Single Neuron Forward Pass** - An MLP is many neurons organized into layers, each computing a weighted sum plus bias with an activation
- **Matrix Multiplication** - Each layer transforms its input by multiplying with a weight matrix, and understanding shape rules like $(B, d_{\text{in}}) \times (d_{\text{in}}, d_{\text{out}}) = (B, d_{\text{out}})$ is essential
- **ReLU Activation** - ReLU between layers introduces the non-linearity that gives deep networks their expressive power

---

## Concept

A Multi-Layer Perceptron (MLP) is a neural network with one or more hidden layers. Each layer performs a linear transformation followed by a non-linear activation:

$$h^{(l)} = \sigma(h^{(l-1)} W^{(l)} + b^{(l)})$$

where $h^{(l-1)}$ is the input to layer $l$, $W^{(l)}$ is the weight matrix, $b^{(l)}$ is the bias vector, and $\sigma$ is the activation function.

The key insight is: why do we need multiple layers? A single linear layer can only learn linear decision boundaries (hyperplanes). Two linear layers without an activation between them collapse into one (since $W_2(W_1 x + b_1) + b_2 = W_2 W_1 x + W_2 b_1 + b_2$ is still linear). ReLU between layers prevents this collapse. Each layer can "bend" the representation in a new way, and stacking enough layers with ReLU lets the network approximate any continuous function.

The output layer typically has no activation (for regression) or softmax (for classification). In this problem, we use no activation on the final layer, producing raw logits.

---

## Solution

### Intuition

We iterate through the list of weight matrices and bias vectors. For each layer, we compute the linear transformation using the `@` operator (matrix multiply), add the bias, and apply ReLU. The last layer skips the activation.

### Implementation

::tabs-start
```python
import numpy as np
from numpy.typing import NDArray
from typing import List


class Solution:
    def forward(self, x: NDArray[np.float64], weights: List[NDArray[np.float64]], biases: List[NDArray[np.float64]]) -> NDArray[np.float64]:
        h = x
        for i in range(len(weights)):
            h = h @ weights[i] + biases[i]  # Linear transformation
            if i < len(weights) - 1:
                h = np.maximum(0, h)         # ReLU on hidden layers only
        return np.round(h, 5)
```
::tabs-end


### Walkthrough

Given a 2-layer MLP with input $x = [1, 2]$, $W_1$ (shape $2 \times 3$), $b_1$ (shape $3$), $W_2$ (shape $3 \times 1$), $b_2$ (shape $1$):

| Layer | Operation | Example |
|---|---|---|
| 1 (hidden) | $h_1 = x @ W_1 + b_1$ | $[-0.5, 1.2, 0.3]$ |
| ReLU | $\max(0, h_1)$ | $[0, 1.2, 0.3]$ |
| 2 (output) | $h_2 = h_1 @ W_2 + b_2$ | $[0.9]$ (no activation) |

Notice that the negative value $-0.5$ was zeroed by ReLU. This sparsity is a feature: it means only a subset of neurons "fire" for any given input, giving each input its own activation pattern.

### Time & Space Complexity

- Time: $O(\sum_{l} d_{l-1} \cdot d_l)$ where $d_l$ is the dimension of layer $l$ (dominated by matrix multiplications)
- Space: $O(\max_l d_l)$ for the largest hidden representation

---

## Common Pitfalls

### Applying Activation to the Output Layer

The output layer should produce raw logits (for classification) or raw predictions (for regression). Applying ReLU to the output clips negative values, which prevents the model from predicting negative numbers.

::tabs-start
```python
# Wrong: ReLU on every layer including output
for i in range(len(weights)):
    h = h @ weights[i] + biases[i]
    h = np.maximum(0, h)  # don't do this on the last layer!

# Correct: skip activation on the last layer
for i in range(len(weights)):
    h = h @ weights[i] + biases[i]
    if i < len(weights) - 1:
        h = np.maximum(0, h)
```
::tabs-end


### Shape Mismatches in Weight Matrices

Each weight matrix must have its input dimension matching the previous layer's output dimension. A shape $(3, 4)$ weight matrix expects 3-dimensional input and produces 4-dimensional output.

::tabs-start
```python
# Wrong: weights[1] has incompatible input dimension
weights = [np.zeros((2, 3)), np.zeros((4, 1))]  # 3 != 4

# Correct: output dim of layer i matches input dim of layer i+1
weights = [np.zeros((2, 3)), np.zeros((3, 1))]  # 3 == 3
```
::tabs-end


---

## In the GPT Project

This becomes `foundations/mlp.py`. The feed-forward network (FFN) inside each transformer block is exactly an MLP with two layers: an up-projection that expands the dimension by 4x, ReLU, then a down-projection back to the original dimension.

---

## Key Takeaways

- An MLP chains linear transformations with ReLU activations, creating a network that can approximate any continuous function given enough width and depth.
- The `@` operator provides clean syntax for matrix multiplication, and the shape rule $(B, d_{\text{in}}) @ (d_{\text{in}}, d_{\text{out}}) = (B, d_{\text{out}})$ governs every layer.
- Without non-linear activations between layers, the entire network collapses to a single linear transformation regardless of how many layers you stack.
