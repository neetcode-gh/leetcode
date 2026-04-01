## Prerequisites

Before attempting this problem, you should be comfortable with:

- **NumPy Array Operations** - PyTorch tensors mirror NumPy arrays in API and behavior, so if you know NumPy, you already know 80% of PyTorch
- **Reshaping and Dimension Semantics** - Understanding what `dim=0` vs `dim=1` means in a 2D tensor is critical because getting the wrong dimension silently produces wrong results

---

## Concept

PyTorch is the most widely used deep learning framework. Its core data structure is the **tensor**, which works like a NumPy array but adds two superpowers: automatic differentiation (autograd) and GPU acceleration.

**Reshaping** changes a tensor's dimensions without touching its data. A $(2, 4)$ tensor has 8 elements, and you can reshape it to $(4, 2)$, $(1, 8)$, or $(8, 1)$. The total element count must stay the same. This is used constantly: for example, flattening a 2D image into a 1D vector for a linear layer.

**Averaging** along a dimension collapses that dimension. For a $(3, 2)$ tensor, averaging along `dim=0` (rows) produces a $(2,)$ tensor with column means. Averaging along `dim=1` (columns) produces a $(3,)$ tensor with row means. Think of `dim=` as "the dimension that disappears."

**Concatenation** joins tensors along a dimension. Concatenating two $(2, 3)$ tensors along `dim=1` produces a $(2, 6)$ tensor. The tensors must agree on all other dimensions.

**MSE Loss** is available as `torch.nn.functional.mse_loss`, computing $\frac{1}{N}\sum(pred_i - target_i)^2$. Using built-in loss functions is preferred because they handle edge cases and are numerically stable.

---

## Solution

### Intuition

Each method exercises a core PyTorch operation. We use `torch.reshape` for reshaping, `torch.mean` with a dimension argument for averaging, `torch.cat` for concatenation, and `torch.nn.functional.mse_loss` for the loss computation.

### Implementation

::tabs-start
```python
import torch
import torch.nn
from torchtyping import TensorType


class Solution:
    def reshape(self, to_reshape: TensorType[float]) -> TensorType[float]:
        M, N = to_reshape.shape
        reshaped = torch.reshape(to_reshape, (M * N // 2, 2))
        return torch.round(reshaped, decimals=4)

    def average(self, to_avg: TensorType[float]) -> TensorType[float]:
        averaged = torch.mean(to_avg, dim = 0)
        return torch.round(averaged, decimals=4)

    def concatenate(self, cat_one: TensorType[float], cat_two: TensorType[float]) -> TensorType[float]:
        concatenated = torch.cat((cat_one, cat_two), dim = 1)
        return torch.round(concatenated, decimals=4)

    def get_loss(self, prediction: TensorType[float], target: TensorType[float]) -> TensorType[float]:
        loss = torch.nn.functional.mse_loss(prediction, target)
        return torch.round(loss, decimals=4)
```
::tabs-end


### Walkthrough

| Operation | Input | Computation | Output |
|---|---|---|---|
| Reshape $(2,4) \to (4,2)$ | $[[1,2,3,4],[5,6,7,8]]$ | Split into pairs of 2 | $[[1,2],[3,4],[5,6],[7,8]]$ |
| Average `dim=0` | $[[1,2],[3,4],[5,6]]$ | Column means | $[3.0, 4.0]$ |
| Concat `dim=1` | $[[1,2],[3,4]]$ and $[[5,6],[7,8]]$ | Side by side | $[[1,2,5,6],[3,4,7,8]]$ |
| MSE Loss | pred=$[1.0,2.0]$, target=$[1.5,2.5]$ | $(0.25+0.25)/2$ | $0.25$ |

### Time & Space Complexity

- Time: $O(n)$ for each operation where $n$ is the total number of elements
- Space: $O(n)$ for the output tensors

---

## Common Pitfalls

### Wrong Dimension for Averaging

`dim=0` averages across rows (column-wise means), `dim=1` averages across columns (row-wise means). These are easy to confuse.

::tabs-start
```python
# Wrong: averages across columns instead of rows
averaged = torch.mean(to_avg, dim=1)

# Correct: averages across rows (column means)
averaged = torch.mean(to_avg, dim=0)
```
::tabs-end


### Mismatched Shapes for Concatenation

Concatenation along `dim=1` requires the same number of rows. Different row counts cause a runtime error.

::tabs-start
```python
# Wrong: different number of rows (2 vs 3)
torch.cat((torch.zeros(2, 3), torch.zeros(3, 3)), dim=1)

# Correct: same number of rows
torch.cat((torch.zeros(2, 3), torch.zeros(2, 3)), dim=1)
```
::tabs-end


---

## In the GPT Project

This becomes `foundations/pytorch_basics.py`. Every subsequent problem uses these operations. Reshaping appears when flattening logits for cross-entropy loss. Averaging is used in layer normalization. Concatenation joins multi-head attention outputs. MSE loss trains regression models.

---

## Key Takeaways

- PyTorch tensors mirror NumPy arrays in API but add autograd and GPU support, making them the foundation of modern deep learning.
- `torch.reshape`, `torch.mean`, and `torch.cat` are the three tensor manipulation functions you will use most often.
- Using built-in functions like `mse_loss` is safer than manual computation because they handle numerical edge cases automatically.
