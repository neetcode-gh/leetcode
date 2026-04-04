## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Variance and standard deviation** - Understanding $\text{Var}(aX) = a^2 \text{Var}(X)$ is the core insight behind why initialization scales matter
- **Matrix multiplication** - Each layer multiplies its input by a weight matrix. If those weights have the wrong scale, the output variance changes every layer.
- **ReLU activation** - ReLU zeros out negative values, which cuts the variance roughly in half. Kaiming initialization compensates for this.

---

## Concept

Stack 10 layers with random $\mathcal{N}(0, 1)$ weights and the signal either explodes to infinity or collapses to zero. This is one of the most common reasons deep networks fail to train.

The math is straightforward. If layer $\ell$ computes $z_\ell = W_\ell \cdot a_{\ell-1}$, then:

$$\text{Var}(z_\ell) = n_{\ell-1} \cdot \text{Var}(W_\ell) \cdot \text{Var}(a_{\ell-1})$$

where $n_{\ell-1}$ is the number of input features (fan\_in). If $\text{Var}(W) = 1$ and fan\_in $= 64$, the variance multiplies by 64 every layer. After 10 layers: $64^{10} \approx 10^{18}$. The signal is gone.

**Xavier initialization** (Glorot, 2010) sets the variance so each layer preserves its input's variance for sigmoid/tanh:

$$\text{std} = \sqrt{\frac{2}{\text{fan\_in} + \text{fan\_out}}}$$

**Kaiming initialization** (He, 2015) adapts this for ReLU, which zeros out roughly half the distribution:

$$\text{std} = \sqrt{\frac{2}{\text{fan\_in}}}$$

The factor of 2 in the numerator compensates for the halved variance from ReLU. With Kaiming init, activation standard deviations stay roughly constant regardless of depth. With random init, they grow exponentially.

---

## Solution

### Intuition

Sample weights from $\mathcal{N}(0, \text{std}^2)$ where std is chosen to preserve variance across layers. Xavier averages fan\_in and fan\_out; Kaiming uses only fan\_in with a factor of 2 for ReLU. The `check_activations` function empirically validates this by forwarding random data through a multi-layer network and measuring the std at each layer.

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
            x = layers[2 * i](x)
            x = layers[2 * i + 1](x)
            stds.append(round(x.std().item(), 4))

        return stds
```
::tabs-end


### Walkthrough

For `xavier_init(fan_in=4, fan_out=3)`:

| Step | Computation | Result |
|---|---|---|
| Std formula | $\sqrt{2 / (4 + 3)} = \sqrt{2/7}$ | $0.5345$ |
| Sample | `torch.randn(3, 4)` with seed 0 | Standard normal matrix |
| Scale | Multiply by $0.5345$ | Each weight $\sim \mathcal{N}(0, 0.2857)$ |
| Round | 4 decimal places | `[[0.8237, -0.1568, -1.1646, 0.3038], ...]` |

For `check_activations(5, 64, 64, 'random')` vs `'kaiming'`:

| Init type | Layer 1 std | Layer 3 std | Layer 5 std | Trend |
|---|---|---|---|---|
| `random` | 3.97 | 166.15 | 4315.23 | Explodes exponentially |
| `kaiming` | 0.70 | 0.92 | 0.75 | Stays stable (~0.5-1.2) |

### Time & Space Complexity

- Time: $O(\text{fan\_in} \times \text{fan\_out})$ per weight matrix initialization
- Space: $O(\text{fan\_in} \times \text{fan\_out})$ for the weight matrix

---

## Common Pitfalls

### Using Xavier for ReLU Networks

Xavier assumes a symmetric activation (sigmoid/tanh). ReLU kills half the distribution, so Xavier underestimates the needed variance and activations shrink toward zero in deep ReLU networks.

::tabs-start
```python
# Wrong for ReLU: Xavier doesn't account for half the values being zeroed
std = math.sqrt(2.0 / (fan_in + fan_out))

# Correct for ReLU: Kaiming compensates with factor of 2/fan_in
std = math.sqrt(2.0 / fan_in)
```
::tabs-end


### Forgetting torch.manual_seed

Without setting the seed before each initialization, results are non-reproducible. The seed must be set immediately before `torch.randn` to get deterministic output.

::tabs-start
```python
# Wrong: seed set once at module level, not before each call
# (subsequent calls get different random values)

# Correct: set seed right before sampling
torch.manual_seed(0)
weights = torch.randn(fan_out, fan_in) * std
```
::tabs-end


---

## In the GPT Project

This becomes `foundations/weight_init.py`. Every `nn.Linear` layer in your GPT model uses initialization under the hood. PyTorch defaults to Kaiming for linear layers. The GPT-2 paper specifically mentions using scaled initialization ($1/\sqrt{N}$ where $N$ is the number of residual layers) to prevent the residual stream from growing too large in deep transformers.

---

## Key Takeaways

- Weight initialization controls whether signals survive through deep networks. Random $\mathcal{N}(0,1)$ weights cause exponential growth or decay of activations.
- Xavier works for sigmoid/tanh by balancing fan\_in and fan\_out. Kaiming works for ReLU by accounting for the halved variance from zeroing negative values.
- The `check_activations` experiment makes the theory concrete: with random init, stds grow to thousands in 5 layers. With Kaiming, they stay near 1.0 regardless of depth.
