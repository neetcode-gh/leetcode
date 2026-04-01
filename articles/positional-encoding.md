## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Trigonometry** - Sine and cosine are periodic functions, and each frequency captures position information at a different scale, from fine-grained (nearby tokens) to coarse (distant tokens)
- **Word Embeddings** - Positional encodings are added to word embeddings, so you need to understand what embeddings represent before you can augment them with position information

---

## Concept

Transformers process all tokens in parallel, unlike RNNs that process sequentially. This parallelism is what makes transformers fast, but it means the model has no built-in notion of token order. Without positional information, "the cat sat on the mat" and "mat the on sat cat the" would produce identical representations.

Sinusoidal positional encoding fixes this by adding a unique, fixed signal to each position. For position $pos$ and dimension $i$:

$$PE(pos, 2i) = \sin\left(\frac{pos}{10000^{2i/d}}\right)$$
$$PE(pos, 2i+1) = \cos\left(\frac{pos}{10000^{2i/d}}\right)$$

Even-indexed dimensions use sine, odd-indexed dimensions use cosine. The denominator $10000^{2i/d}$ creates a spectrum of wavelengths: dimension 0 oscillates rapidly (wavelength $2\pi$), while the last dimension oscillates very slowly (wavelength $10000 \cdot 2\pi$).

Think of it like a binary clock. The seconds hand spins fast, the minutes hand slower, the hours hand slowest. Each position gets a unique "time" reading across all these frequencies. The model can learn to read these patterns to determine relative positions: the encoding for position $pos + k$ is a linear function of the encoding at position $pos$, making it easy for attention to learn relative position relationships.

---

## Solution

### Intuition

Construct a matrix of shape `(seq_len, d_model)`, compute position indices and frequency divisors using broadcasting, then fill even columns with sine values and odd columns with cosine values.

### Implementation

::tabs-start
```python
import numpy as np
from numpy.typing import NDArray


class Solution:
    def get_positional_encoding(self, seq_len: int, d_model: int) -> NDArray[np.float64]:
        PE = np.zeros((seq_len, d_model))
        position = np.arange(seq_len).reshape(-1, 1)       # (seq_len, 1)
        div_term = 10000 ** (np.arange(0, d_model, 2) / d_model)  # (d_model/2,)
        PE[:, 0::2] = np.sin(position / div_term)           # Even indices: sine
        PE[:, 1::2] = np.cos(position / div_term[:PE[:, 1::2].shape[1]])  # Odd indices: cosine
        return np.round(PE, 5)
```
::tabs-end


### Walkthrough

For `seq_len = 3` and `d_model = 4`:

| | Col 0 (sin, freq=1) | Col 1 (cos, freq=1) | Col 2 (sin, freq=100) | Col 3 (cos, freq=100) |
|---|---|---|---|---|
| pos=0 | $\sin(0/1) = 0$ | $\cos(0/1) = 1$ | $\sin(0/100) = 0$ | $\cos(0/100) = 1$ |
| pos=1 | $\sin(1/1) = 0.841$ | $\cos(1/1) = 0.540$ | $\sin(1/100) = 0.010$ | $\cos(1/100) = 1.000$ |
| pos=2 | $\sin(2/1) = 0.909$ | $\cos(2/1) = -0.416$ | $\sin(2/100) = 0.020$ | $\cos(2/100) = 1.000$ |

Notice: low-frequency columns (0, 1) change rapidly with position, high-frequency columns (2, 3) change slowly. This multi-scale encoding gives each position a unique fingerprint.

### Time & Space Complexity

- Time: $O(\text{seq\_len} \times d\_\text{model})$ for computing all sine/cosine values
- Space: $O(\text{seq\_len} \times d\_\text{model})$ for the encoding matrix

---

## Common Pitfalls

### Applying Sine to All Columns

Sine goes on even indices only. Odd indices use cosine. Using the same function everywhere loses half the positional information.

::tabs-start
```python
# Wrong: sine everywhere
PE[:, :] = np.sin(position / div_term_full)

# Correct: sine on even, cosine on odd
PE[:, 0::2] = np.sin(position / div_term)
PE[:, 1::2] = np.cos(position / div_term[:num_odd_cols])
```
::tabs-end


### Wrong Divisor Formula

The divisor is $10000^{2i/d}$ where $i$ indexes pairs of dimensions. Using $10000^{i/d}$ (without the factor of 2) produces wrong frequencies.

::tabs-start
```python
# Wrong: missing factor of 2
div_term = 10000 ** (np.arange(0, d_model, 2) / (d_model * 2))

# Correct: 2i/d, where arange(0, d_model, 2) already gives 2i
div_term = 10000 ** (np.arange(0, d_model, 2) / d_model)
```
::tabs-end


---

## In the GPT Project

This becomes `model/positional_encoding.py`. The GPT model in this course actually uses **learned** positional embeddings (`nn.Embedding`) rather than sinusoidal ones, but understanding sinusoidal encoding explains the concept. The original "Attention Is All You Need" paper used sinusoidal, while GPT-2 and GPT-3 switched to learned embeddings.

---

## Key Takeaways

- Sinusoidal positional encoding injects position information using fixed sine and cosine patterns at geometrically spaced frequencies.
- Different frequencies capture different position scales: high frequencies distinguish nearby tokens, low frequencies distinguish distant ones.
- Positional encodings are **added** to word embeddings (not concatenated), so they must have the same dimension as the embedding vectors.
