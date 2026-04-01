## Prerequisites

Before attempting this problem, you should be comfortable with:

- **GPT Architecture** - The complete model that takes a context of token IDs and outputs probability distributions at each position
- **Autoregressive Generation** - Producing text one token at a time by feeding each prediction back as input, because generation is a loop that alternates between model forward passes and token sampling
- **Sampling from Distributions** - Using `torch.multinomial` to draw from a probability distribution, which introduces controlled randomness into the output

---

## Concept

Text generation with GPT is an autoregressive loop: the model generates one token at a time, appends it to the context, and repeats. This is the inference-time procedure that turns a trained language model into a text generator.

The generation loop:

1. **Crop** the context to the model's maximum context length (if it has grown too long).
2. **Forward pass**: Feed the context through the model to get probabilities at every position.
3. **Extract last position**: Only the final position's distribution matters, since it predicts the next token.
4. **Sample**: Draw a token from the distribution using `torch.multinomial`.
5. **Append**: Add the sampled token to the context.
6. **Decode**: Convert the token ID to a character.
7. Repeat for the desired number of new characters.

**Sampling vs. greedy decoding**: Taking the argmax (most probable token) every time produces deterministic but repetitive text. Sampling from the full distribution introduces variety. In production, temperature scaling ($\text{probs} = \text{softmax}(\text{logits}/T)$) and top-k/top-p filtering control the creativity-coherence tradeoff.

The context window is finite. Once the context exceeds the maximum length $C$, earlier tokens are cropped off. The model's "memory" is limited to the most recent $C$ tokens. This is why GPT models have a context length limit (1024 for GPT-2, 8192+ for modern models).

---

## Solution

### Intuition

Loop for the desired number of characters. Each iteration: crop context if needed, forward pass, extract last position's probabilities, sample a token, append to context, decode. The RNG state is managed for reproducibility.

### Implementation

::tabs-start
```python
import torch
import torch.nn as nn
from torchtyping import TensorType

class Solution:
    def generate(self, model, new_chars: int, context: TensorType[int], context_length: int, int_to_char: dict) -> str:
        generator = torch.manual_seed(0)
        initial_state = generator.get_state()
        result = []
        for _ in range(new_chars):
            # Crop context to max length the model can handle
            if context.shape[1] > context_length:
                context = context[:, -context_length:]

            # Forward pass -> logits for every position
            logits = model(context)                          # (1, T, vocab_size)
            last_logits = logits[:, -1, :]                   # (1, vocab_size)
            probs = nn.functional.softmax(last_logits, dim=-1)

            # Sample next token and reset RNG for reproducibility
            next_token = torch.multinomial(probs, 1, generator=generator)
            generator.set_state(initial_state)

            # Append token to context and decode
            context = torch.cat((context, next_token), dim=-1)
            result.append(int_to_char[next_token.item()])
        return ''.join(result)
```
::tabs-end


### Walkthrough

For a trained model with `context_length = 8`, initial `context = [[5, 12, 3]]`, and `new_chars = 4`:

| Step | Context Length | Action | Sampled Token | Decoded |
|---|---|---|---|---|
| 1 | 3 (no crop) | Forward on 3 tokens, sample from last position | 7 | 'e' |
| 2 | 4 (no crop) | Forward on 4 tokens | 15 | 'l' |
| 3 | 5 (no crop) | Forward on 5 tokens | 15 | 'l' |
| 4 | 6 (no crop) | Forward on 6 tokens | 3 | 'o' |

Result: `"ello"`. Once the context grows past 8 tokens, it would be cropped to the last 8.

### Time & Space Complexity

- Time: $O(n \cdot T^2 \cdot d)$ where $n$ is the number of new characters and $T$ is the (growing) context length
- Space: $O(T \cdot V + T^2)$ for the probability distribution and attention matrices

---

## Common Pitfalls

### Forgetting to Crop the Context

Without cropping, the context grows past the model's maximum length, causing position embedding index errors.

::tabs-start
```python
# Wrong: context grows indefinitely
logits = model(context)  # crashes when context > context_length

# Correct: crop to max length before forward pass
if context.shape[1] > context_length:
    context = context[:, -context_length:]
logits = model(context)
```
::tabs-end


### Using Argmax Instead of Sampling

Greedy decoding (argmax) produces deterministic but often repetitive text. The problem expects sampling with `torch.multinomial`.

::tabs-start
```python
# Wrong: deterministic, repetitive output
next_token = torch.argmax(probs, dim=-1, keepdim=True)

# Correct: sampling introduces variety
next_token = torch.multinomial(probs, 1, generator=generator)
```
::tabs-end


### Taking Logits from All Positions Instead of the Last

The model outputs logits at every position, but only the last position predicts the next token. Using logits from other positions gives you predictions for tokens that already exist.

::tabs-start
```python
# Wrong: using all positions
probs = nn.functional.softmax(logits, dim=-1)  # (1, T, V)

# Correct: only the last position predicts the next token
last_logits = logits[:, -1, :]  # (1, V)
probs = nn.functional.softmax(last_logits, dim=-1)
```
::tabs-end


---

## In the GPT Project

This becomes `generate.py`. This is the final problem in the course. After training your GPT model, this generation function is what makes it produce text. You feed in a seed context (even a single character), and the model generates character by character, producing text that mimics the patterns in its training data.

---

## Key Takeaways

- Autoregressive generation produces text one token at a time, feeding each prediction back as input to produce the next one.
- The context window limits the model's "memory" to the most recent $C$ tokens. Older tokens are cropped and forgotten.
- Sampling from the distribution (rather than taking argmax) produces more diverse and natural text, and forms the basis for more advanced decoding strategies like temperature scaling and top-p sampling.
