## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Training Loop Basics** - You need the forward/backward pass and loss computation before you can inspect what's going wrong with them
- **Weight Initialization** - Many diagnostic signals (vanishing/exploding activations) are caused by bad initialization, so knowing what "good" looks like is essential
- **PyTorch Autograd** - Computing gradient statistics requires calling `loss.backward()` and reading `.weight.grad` from each layer

---

## Concept

Training diagnostics is the practice of inspecting a network's internal state to identify why it's not learning. Three signals tell you almost everything: activation statistics (is the signal dying or exploding as it flows forward?), gradient statistics (is the learning signal dying or exploding as it flows backward?), and the dead neuron fraction (are neurons permanently stuck at zero?).

The `diagnose` function applies a simple priority-ordered ruleset: dead neurons first (most severe), then exploding gradients, then vanishing gradients, then activation range checks.

---

## Solution

### Intuition

For activation stats, forward the input through the model layer by layer, recording mean, std, and dead fraction at each Linear layer. For gradient stats, run a full forward/backward pass and read the `.weight.grad` of each Linear layer. The diagnose function is a priority-ordered series of threshold checks.

### Implementation

::tabs-start
```python
import torch
import torch.nn as nn
from typing import List, Dict


class Solution:

    def compute_activation_stats(self, model: nn.Module, x: torch.Tensor) -> List[Dict[str, float]]:
        stats = []
        with torch.no_grad():
            for module in model.children():
                x = module(x)
                if isinstance(module, nn.Linear):
                    mean_val = round(x.mean().item(), 4)
                    std_val = round(x.std().item(), 4)
                    if x.dim() >= 2:
                        dead_frac = round(((x <= 0).all(dim=0)).float().mean().item(), 4)
                    else:
                        dead_frac = round((x <= 0).float().mean().item(), 4)
                    stats.append({'mean': mean_val, 'std': std_val, 'dead_fraction': dead_frac})
        return stats

    def compute_gradient_stats(self, model: nn.Module, x: torch.Tensor, y: torch.Tensor) -> List[Dict[str, float]]:
        model.zero_grad()
        output = model(x)
        loss = nn.MSELoss()(output, y)
        loss.backward()
        stats = []
        for module in model.children():
            if isinstance(module, nn.Linear):
                grad = module.weight.grad
                mean_val = round(grad.mean().item(), 4)
                std_val = round(grad.std().item(), 4)
                norm_val = round(torch.norm(grad).item(), 4)
                stats.append({'mean': mean_val, 'std': std_val, 'norm': norm_val})
        return stats

    def diagnose(self, activation_stats: List[Dict], gradient_stats: List[Dict]) -> str:
        for s in activation_stats:
            if s['dead_fraction'] > 0.5:
                return 'dead_neurons'
        for s in gradient_stats:
            if s['norm'] > 1000:
                return 'exploding_gradients'
        if gradient_stats and gradient_stats[-1]['norm'] < 1e-5:
            return 'vanishing_gradients'
        for s in activation_stats:
            if s['std'] < 0.1:
                return 'vanishing_gradients'
            if s['std'] > 10.0:
                return 'exploding_gradients'
        return 'healthy'
```
::tabs-end


### Walkthrough

For a healthy 3-layer MLP with Kaiming initialization:

| Diagnostic | Layer 1 | Layer 2 | Layer 3 |
|---|---|---|---|
| Activation mean | $\approx 0.03$ | $\approx -0.15$ | $\approx 0.18$ |
| Activation std | $\approx 1.41$ | $\approx 1.51$ | $\approx 1.21$ |
| Dead fraction | $0$ | $0.0625$ | $0$ |
| Gradient norm | $\approx 1.94$ | $\approx 3.31$ | $\approx 3.0$ |

All stds are between 0.1 and 10, no dead fractions above 0.5, no gradient norms above 1000 or below 1e-5. Diagnosis: `'healthy'`.

For a broken MLP with huge $\mathcal{N}(0, 10)$ initialization:

| Diagnostic | Layer 1 | Layer 2 | Layer 3 |
|---|---|---|---|
| Activation std | $56.27$ | $3424.29$ | $155246.73$ |

The activation std at layer 1 is already $56 > 10$, so `diagnose` returns `'exploding_gradients'`.

### Time & Space Complexity

- Time: $O(N \cdot d \cdot L)$ where $N$ is batch size, $d$ is layer width, $L$ is number of layers. One forward pass for activations, one forward + backward for gradients.
- Space: $O(d)$ per layer for the stats, plus the model's own memory for gradients.

---

## Common Pitfalls

### Recording Stats at the Wrong Layer Type

The problem asks for stats at `nn.Linear` layers (for activations) and `nn.Linear` layers (for gradients). Recording after ReLU instead of after Linear would miss the pre-activation information and the dead fraction wouldn't be correct.

::tabs-start
```python
# Wrong: checking after ReLU for activation stats
if isinstance(module, nn.ReLU):
    stats.append(...)

# Correct: checking after Linear for activation stats
if isinstance(module, nn.Linear):
    stats.append(...)
```
::tabs-end


### Checking Diagnose Conditions Out of Order

The priority order matters. Dead neurons are checked first because they are the most severe (permanent damage). If you check activation std before dead_fraction, you might return `'vanishing_gradients'` when the real problem is dead neurons.

::tabs-start
```python
# Wrong: checking std before dead_fraction
for s in activation_stats:
    if s['std'] < 0.1:
        return 'vanishing_gradients'  # Misses dead neurons!

# Correct: check dead_fraction first
for s in activation_stats:
    if s['dead_fraction'] > 0.5:
        return 'dead_neurons'
```
::tabs-end


---

## In the GPT Project

These diagnostics are exactly what you would use when debugging a GPT training run. If the loss plateaus, you check activation statistics to see if the signal is dying in deep layers. If the loss explodes to NaN, you check gradient norms to confirm exploding gradients before adding gradient clipping.

---

## Key Takeaways

- Activation std should stay in a reasonable range (roughly 0.1 to 10). Outside that range, the network is either dying or exploding.
- Dead neurons (output always $\leq 0$) are permanent: ReLU's gradient is zero for negative inputs, so the weights never update.
- Gradient norms tell you whether the learning signal is reaching the early layers. A norm near zero means the network isn't learning; a norm in the thousands means it's unstable.
- The diagnose function uses a priority order because some failure modes are more severe than others and should be caught first.
