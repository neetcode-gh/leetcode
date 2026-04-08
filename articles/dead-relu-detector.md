## Prerequisites

Before attempting this problem, you should be comfortable with:

- **ReLU Activation** - A neuron is "dead" because ReLU outputs exactly 0 for all negative inputs, and its gradient is also 0, so the weights can never update
- **Training Diagnostics** - This problem builds on the diagnostic mindset: inspecting internal network state to find problems before they waste training time
- **PyTorch Module Iteration** - You need to iterate through `model.children()` and check `isinstance(module, nn.ReLU)` to find the right layers

---

## Concept

Dead ReLU neurons output zero for every sample in the batch. Because ReLU's gradient is zero for negative inputs, these neurons receive no gradient updates and are permanently stuck. The `detect_dead_neurons` method measures this per ReLU layer, and `suggest_fix` maps the severity pattern to the most appropriate intervention.

The fix priority reflects real debugging experience: severe death (> 50%) means the activation function itself is the problem (switch to LeakyReLU). Early-layer death (> 30% in layer 1) means initialization is bad (re-init). Depth-increasing death means the learning rate is too aggressive (reduce it).

---

## Solution

### Intuition

Forward the input through the model layer by layer. After each ReLU, check which neurons output zero for all samples in the batch -- those are dead. For `suggest_fix`, apply the priority-ordered rules based on the pattern of dead fractions.

### Implementation

::tabs-start
```python
import torch
import torch.nn as nn
from typing import List


class Solution:

    def detect_dead_neurons(self, model: nn.Module, x: torch.Tensor) -> List[float]:
        dead_fractions = []
        with torch.no_grad():
            for module in model.children():
                x = module(x)
                if isinstance(module, nn.ReLU):
                    # A neuron is dead if it outputs 0 for ALL samples in the batch
                    dead = (x == 0).all(dim=0).float().mean().item()
                    dead_fractions.append(round(dead, 4))
        return dead_fractions

    def suggest_fix(self, dead_fractions: List[float]) -> str:
        if len(dead_fractions) == 0:
            return 'healthy'

        max_frac = max(dead_fractions)

        # Any layer > 0.5 dead -> use LeakyReLU
        if max_frac > 0.5:
            return 'use_leaky_relu'

        # First layer > 0.3 dead -> reinitialize weights
        if dead_fractions[0] > 0.3:
            return 'reinitialize'

        # Dead fraction increases with depth -> reduce learning rate
        if len(dead_fractions) >= 2:
            increasing = all(
                dead_fractions[i] < dead_fractions[i + 1]
                for i in range(len(dead_fractions) - 1)
            )
            if increasing and dead_fractions[-1] > 0.1:
                return 'reduce_learning_rate'

        # All layers < 0.1 dead -> healthy
        if max_frac < 0.1:
            return 'healthy'

        return 'healthy'
```
::tabs-end


### Walkthrough

**Healthy network** (Kaiming init): dead fractions = `[0.0, 0.0312, 0.0156]`. Max is 0.0312 < 0.1, so `suggest_fix` returns `'healthy'`.

**Broken network** (biases pushed very negative): dead fractions = `[0.5312, 0.8828, 0.9688]`. The first layer already has 0.5312 > 0.5, so the check `max_frac > 0.5` triggers and `suggest_fix` returns `'use_leaky_relu'`.

**Decision logic for `suggest_fix`:**

| Dead Fractions | Rule Triggered | Fix |
|---|---|---|
| `[0.02, 0.03, 0.01]` | All < 0.1 | `'healthy'` |
| `[0.1, 0.4, 0.65]` | Layer 3 has 0.65 > 0.5 | `'use_leaky_relu'` |
| `[0.35, 0.1, 0.05]` | Layer 1 has 0.35 > 0.3 | `'reinitialize'` |
| `[0.05, 0.08, 0.15]` | Strictly increasing, last > 0.1 | `'reduce_learning_rate'` |

### Time & Space Complexity

- Time: $O(N \cdot d \cdot L)$ where $N$ is batch size, $d$ is layer width, $L$ is number of ReLU layers
- Space: $O(d)$ per layer for the boolean dead-neuron mask

---

## Common Pitfalls

### Checking After Linear Instead of After ReLU

Dead neurons are a ReLU-specific concept. The Linear layer's output can be negative (that's fine -- it hasn't been activated yet). You need to check after the ReLU to see which neurons are stuck at exactly zero.

::tabs-start
```python
# Wrong: checking after Linear
if isinstance(module, nn.Linear):
    dead = (x == 0).all(dim=0).float().mean().item()

# Correct: checking after ReLU
if isinstance(module, nn.ReLU):
    dead = (x == 0).all(dim=0).float().mean().item()
```
::tabs-end


### Using `<= 0` Instead of `== 0` for ReLU Output

After ReLU, the output is either 0 (dead) or positive. Using `<= 0` is equivalent to `== 0` in this context, but conceptually we are checking for exactly zero output, which is what ReLU produces for negative inputs.

### Missing the "Strictly Increasing" Check

The `reduce_learning_rate` fix requires dead fractions to be **strictly** increasing across all layers. If any layer has the same or lower dead fraction as the previous one, the pattern doesn't match.

::tabs-start
```python
# Wrong: non-strict comparison
increasing = all(
    dead_fractions[i] <= dead_fractions[i + 1]  # allows equal!
    for i in range(len(dead_fractions) - 1)
)

# Correct: strictly increasing
increasing = all(
    dead_fractions[i] < dead_fractions[i + 1]
    for i in range(len(dead_fractions) - 1)
)
```
::tabs-end


---

## In the GPT Project

GPT uses GELU activation, not ReLU, so the dead neuron problem doesn't apply directly. But the diagnostic technique is universal: inspecting per-layer activation patterns to find silent failures. The same approach works for detecting saturated sigmoids, collapsed layer norms, or any other "the model trains but doesn't learn" scenario.

---

## Key Takeaways

- A dead ReLU neuron outputs zero for every sample in the batch. It receives zero gradient and can never recover. This is a permanent failure mode.
- The severity pattern determines the fix: widespread death needs a new activation function, early-layer death needs re-initialization, and depth-correlated death needs a lower learning rate.
- Detection requires checking after the ReLU layer, not after the Linear layer. The Linear output being negative is expected; it's the ReLU output being zero for all samples that indicates death.
- LeakyReLU, PReLU, ELU, and GELU all avoid this problem by having non-zero gradients for negative inputs.
