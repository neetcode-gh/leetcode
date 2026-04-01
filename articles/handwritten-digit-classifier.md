## Prerequisites

Before attempting this problem, you should be comfortable with:

- **PyTorch nn.Module** - Defining layers in `__init__` and chaining them in `forward`, because this is the standard pattern for all PyTorch models
- **MLP Architecture** - Understanding how linear layers, activations, and dropout compose into a classifier
- **Image as Vector** - A $28 \times 28$ grayscale image is flattened to a 784-dimensional vector, treating each pixel as an input feature

---

## Concept

The handwritten digit classifier is the "hello world" of deep learning. It takes a flattened $28 \times 28 = 784$-dimensional MNIST image and predicts which digit (0-9) it represents.

The architecture is a two-layer MLP:

1. **Linear** ($784 \to 512$): projects the high-dimensional pixel space into a learned 512-dimensional representation
2. **ReLU**: introduces non-linearity so the network can learn curved decision boundaries between digits
3. **Dropout** ($p = 0.2$): randomly zeros 20% of activations during training. This forces the network to spread information across neurons rather than relying on a few. During evaluation, dropout is turned off.
4. **Linear** ($512 \to 10$): projects to 10 class scores, one per digit
5. **Sigmoid**: squashes each score to $(0, 1)$

Dropout is a form of regularization. Without it, the 400,000+ parameters ($784 \times 512 + 512 \times 10$) can easily memorize the training data. With dropout, the network must learn robust features that survive random neuron removal.

Despite its simplicity, this architecture achieves over 97% accuracy on MNIST. More complex architectures (CNNs) push this above 99%, but the MLP approach teaches the core pattern.

---

## Solution

### Intuition

We define a PyTorch `nn.Module` with two linear layers, ReLU, dropout, and sigmoid. The forward method chains these sequentially, transforming 784-dimensional input into 10 class probabilities.

### Implementation

::tabs-start
```python
import torch
import torch.nn as nn
from torchtyping import TensorType

class Solution(nn.Module):
    def __init__(self):
        super().__init__()
        torch.manual_seed(0)
        self.first_linear = nn.Linear(784, 512)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(p=0.2)
        self.projection = nn.Linear(512, 10)
        self.sigmoid = nn.Sigmoid()

    def forward(self, images: TensorType[float]) -> TensorType[float]:
        torch.manual_seed(0)
        x = self.first_linear(images)   # (batch, 784) -> (batch, 512)
        x = self.relu(x)
        x = self.dropout(x)
        x = self.projection(x)          # (batch, 512) -> (batch, 10)
        x = self.sigmoid(x)
        return torch.round(x, decimals=4)
```
::tabs-end


### Walkthrough

For a single $28 \times 28$ image flattened to 784 values:

| Layer | Input Shape | Operation | Output Shape |
|---|---|---|---|
| Linear 1 | $(1, 784)$ | $xW_1 + b_1$ | $(1, 512)$ |
| ReLU | $(1, 512)$ | $\max(0, x)$ | $(1, 512)$ |
| Dropout | $(1, 512)$ | Zero 20%, scale rest by $1.25$ | $(1, 512)$ |
| Linear 2 | $(1, 512)$ | $xW_2 + b_2$ | $(1, 10)$ |
| Sigmoid | $(1, 10)$ | $1/(1+e^{-x})$ | $(1, 10)$ |

The output is 10 values, each representing the model's confidence for a digit. The highest value is the prediction.

### Time & Space Complexity

- Time: $O(784 \times 512 + 512 \times 10)$ per sample for the two matrix multiplications
- Space: $O(784 \times 512 + 512 \times 10)$ for the weight matrices

---

## Common Pitfalls

### Forgetting to Set the Random Seed

Without `torch.manual_seed(0)`, weight initialization and dropout patterns are random, making the output non-deterministic and tests fail.

::tabs-start
```python
# Wrong: non-deterministic initialization
def __init__(self):
    super().__init__()
    self.first_linear = nn.Linear(784, 512)

# Correct: deterministic
def __init__(self):
    super().__init__()
    torch.manual_seed(0)
    self.first_linear = nn.Linear(784, 512)
```
::tabs-end


### Using Softmax Instead of Sigmoid

Softmax produces a distribution that sums to 1 (probabilities are coupled). Sigmoid produces independent probabilities for each class. The problem specifies sigmoid.

::tabs-start
```python
# Wrong: softmax couples the outputs
x = nn.functional.softmax(x, dim=-1)

# Correct: sigmoid gives independent per-class probabilities
x = self.sigmoid(x)
```
::tabs-end


---

## In the GPT Project

This becomes `foundations/digit_classifier.py`. While GPT does not classify images, this problem teaches the PyTorch `nn.Module` pattern (define layers in `__init__`, chain in `forward`) that every subsequent model in the course uses.

---

## Key Takeaways

- A two-layer MLP with dropout achieves strong results on MNIST, demonstrating that simple architectures can solve real problems.
- Dropout regularization prevents overfitting by forcing the network to learn distributed representations rather than relying on individual neurons.
- The `nn.Module` pattern (layers in `__init__`, computation in `forward`) is the standard PyTorch model structure used in every problem from here onward.
