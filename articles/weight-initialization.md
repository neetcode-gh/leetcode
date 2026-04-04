## Prerequisites

Before attempting this problem, you should be comfortable with:

- **MLP Architecture** - You need to know how stacked linear layers work, because initialization's purpose is to keep signals stable across those layers
- **Variance of Random Variables** - Xavier and Kaiming initialization derive their formulas from variance propagation through matrix multiplies
- **ReLU Activation** - Kaiming init specifically compensates for ReLU zeroing out half the distribution, so understanding ReLU's behavior is essential

---

## Concept

When you multiply an input by a random weight matrix, the output's variance depends on both the input's variance and the weights' variance. Stack 10 layers and this compounds: if each layer doubles the variance, the output is $2^{10} = 1024$ times larger. Xavier and Kaiming initialization set the weight standard deviation so that variance is preserved through each layer.

Xavier assumes symmetric activations (sigmoid/tanh) and averages fan_in and fan_out. Kaiming accounts for ReLU killing half the values by using a factor of 2 instead of 1 in the numerator.

---

## Solution

### Intuition

For `xavier_init` and `kaiming_init`, compute the appropriate standard deviation from the formula, generate a random normal matrix, and scale it. For `check_activations`, build an MLP with the specified initialization, forward a random input, and record the standard deviation at each layer to see if the signal stays stable or diverges.

### Implementation

::tabs-start
```python
import torch
import torch.nn as nn
import math


class Solution:

    def xavier_init(self, fan_in: int, fan_out: int) -> list[list[float]]:
        torch.manual_seed(0)
        std = math.sqrt(2.0 / (fan_in + fan_out))
        weights = torch.randn(fan_out, fan_in) * std
        return torch.round(weights, decimals=4).tolist()

    def kaiming_init(self, fan_in: int, fan_out: int) -> list[list[float]]:
        torch.manual_seed(0)
        std = math.sqrt(2.0 / fan_in)
        weights = torch.randn(fan_out, fan_in) * std
        return torch.round(weights, decimals=4).tolist()

    def check_activations(self, num_layers: int, input_dim: int, hidden_dim: int, init_type: str) -> list[float]:
        torch.manual_seed(0)
        layers = []
        dims = [input_dim] + [hidden_dim] * num_layers
        for i in range(num_layers):
            layer = nn.Linear(dims[i], dims[i + 1], bias=False)
            if init_type == 'xavier':
                nn.init.xavier_normal_(layer.weight)
            elif init_type == 'kaiming':
                nn.init.kaiming_normal_(layer.weight, nonlinearity='relu')
            elif init_type == 'random':
                layer.weight.data = torch.randn_like(layer.weight)
            layers.append(layer)
            layers.append(nn.ReLU())

        x = torch.randn(1, input_dim)
        stds = []
        for i in range(num_layers):
            x = layers[2 * i](x)      # Linear
            x = layers[2 * i + 1](x)  # ReLU
            stds.append(round(x.std().item(), 4))

        return stds
```
::tabs-end


### Walkthrough

For `xavier_init(fan_in=4, fan_out=3)`:

| Step | Computation | Result |
|---|---|---|
| Std | $\sqrt{2 / (4 + 3)} = \sqrt{2/7}$ | $0.5345$ |
| Random matrix | `torch.randn(3, 4)` with seed 0 | Standard normal samples |
| Scale | Multiply each element by $0.5345$ | Xavier-initialized weights |

For `check_activations(num_layers=5, input_dim=64, hidden_dim=64, init_type='random')`:

| Layer | Activation Std |
|---|---|
| 1 | $3.97$ |
| 2 | $27.13$ |
| 3 | $166.15$ |
| 4 | $925.03$ |
| 5 | $4315.23$ |

With random $\mathcal{N}(0, 1)$ weights, the standard deviation grows exponentially -- the signal explodes. With Kaiming init, it stays near 1.0 across all layers.

### Time & Space Complexity

- Time: $O(\text{fan\_in} \times \text{fan\_out})$ per init call, $O(L \times d^2)$ for `check_activations` where $L$ is layers and $d$ is hidden dimension
- Space: $O(\text{fan\_in} \times \text{fan\_out})$ for the weight matrix

---

## Common Pitfalls

### Confusing Xavier and Kaiming Formulas

Xavier uses the average of fan_in and fan_out. Kaiming uses only fan_in. Swapping them gives wrong variance preservation for the intended activation function.

::tabs-start
```python
# Wrong: using fan_out in Kaiming
std = math.sqrt(2.0 / (fan_in + fan_out))  # This is Xavier, not Kaiming

# Correct: Kaiming uses only fan_in
std = math.sqrt(2.0 / fan_in)
```
::tabs-end


### Forgetting to Reset the Seed

Each method needs `torch.manual_seed(0)` at the start. If the seed is set once globally and multiple methods are called, the random state drifts and outputs won't match.

::tabs-start
```python
# Wrong: seed set only once
torch.manual_seed(0)
xavier_result = self.xavier_init(4, 3)
kaiming_result = self.kaiming_init(4, 3)  # Different random state!

# Correct: each method sets its own seed
def xavier_init(self, fan_in, fan_out):
    torch.manual_seed(0)
    # ...
```
::tabs-end


---

## In the GPT Project

This becomes the initialization strategy for all weight matrices in the transformer. PyTorch uses Kaiming by default for `nn.Linear`, but GPT-style models often use a scaled normal initialization. The `check_activations` diagnostic is exactly what you would run to verify your model is initialized correctly before training.

---

## Key Takeaways

- Weight initialization determines whether a deep network trains or dies. Without it, activations either explode or vanish within a few layers.
- Xavier preserves variance for symmetric activations by using $\text{std} = \sqrt{2 / (\text{fan\_in} + \text{fan\_out})}$.
- Kaiming compensates for ReLU cutting half the distribution by using $\text{std} = \sqrt{2 / \text{fan\_in}}$. The factor of 2 directly accounts for the lost variance.
- The `check_activations` diagnostic is a real technique: forward a random input and check whether the standard deviation stays stable across layers.
