## Prerequisites

Before attempting this problem, you should be comfortable with:

- **BPE Vocabulary** - You need to understand that a tokenizer vocabulary maps substrings to token IDs, and not all substrings of a word will be in the vocabulary
- **Greedy Algorithms** - The tokenization algorithm is greedy left-to-right longest match: always consume the longest possible token from the current position
- **String Manipulation** - The core algorithm is substring matching with a sliding window over the input text

---

## Concept

Greedy tokenization starts at position 0, finds the longest substring in the vocabulary, consumes it as a token, then repeats from the next position. This deterministic process creates surprising behaviors: consecutive numbers get completely different token structures, and languages with fewer vocabulary entries need more tokens per word.

The three functions expose these behaviors: `tokenize_numbers` shows the inconsistency, `count_tokens` measures total token usage, and `fertility_score` computes the tokens-per-word ratio that determines how efficient a language is for the model.

---

## Solution

### Intuition

Implement a single greedy tokenization helper that all three methods share. Starting from position $i$, try substrings from longest to shortest until one matches the vocabulary. Consume it and advance $i$. If nothing matches, consume a single character. Then `tokenize_numbers` converts each number to a string and tokenizes it, `count_tokens` tokenizes the full text and returns the length, and `fertility_score` divides token count by word count.

### Implementation

::tabs-start
```python
from typing import List, Dict

class Solution:
    def tokenize_numbers(self, numbers: List[int], vocab: Dict[str, int]) -> List[List[str]]:
        result = []
        for num in numbers:
            text = str(num)
            tokens = self._greedy_tokenize(text, vocab)
            result.append(tokens)
        return result

    def count_tokens(self, text: str, vocab: Dict[str, int]) -> int:
        tokens = self._greedy_tokenize(text, vocab)
        return len(tokens)

    def fertility_score(self, text: str, vocab: Dict[str, int]) -> float:
        tokens = self._greedy_tokenize(text, vocab)
        words = text.split()
        return round(len(tokens) / len(words), 4)

    def _greedy_tokenize(self, text: str, vocab: Dict[str, int]) -> List[str]:
        tokens = []
        i = 0
        while i < len(text):
            best = None
            for length in range(len(text) - i, 0, -1):
                substr = text[i:i + length]
                if substr in vocab:
                    best = substr
                    break
            if best is None:
                tokens.append(text[i])
                i += 1
            else:
                tokens.append(best)
                i += len(best)
        return tokens
```
::tabs-end


### Walkthrough

**Tokenize numbers** with `vocab = {"0"-"9": single digits, "22": 16, "225": 18, "49": 19}`:

| Number | String | Greedy Match | Tokens |
|---|---|---|---|
| 2249 | `"2249"` | pos 0: longest match is `"22"`, pos 2: longest match is `"49"` | `["22", "49"]` |
| 2250 | `"2250"` | pos 0: longest match is `"225"`, pos 3: longest match is `"0"` | `["225", "0"]` |
| 2251 | `"2251"` | pos 0: longest match is `"225"`, pos 3: longest match is `"1"` | `["225", "1"]` |

Numbers 2249 and 2250 differ by 1, but their token structures are completely different. This is why LLMs struggle with arithmetic.

**Fertility score** for `"the cat sat"` with a vocab that includes `"the"`, `"cat"`, `"sat"`:

- Tokens: `["the", " ", "cat", " ", "sat"]` = 5 tokens
- Words: `["the", "cat", "sat"]` = 3 words
- Fertility: $5 / 3 = 1.6667$

### Time & Space Complexity

- Time: $O(n \cdot m)$ where $n$ is the text length and $m$ is the maximum token length in the vocabulary. The inner loop tries substrings from longest to shortest.
- Space: $O(n)$ for the list of tokens

---

## Common Pitfalls

### Searching Shortest-First Instead of Longest-First

The greedy algorithm must try the longest possible match first. Searching from shortest to longest would always match single characters (since individual characters are typically in the vocabulary), producing character-level tokenization.

::tabs-start
```python
# Wrong: shortest first
for length in range(1, len(text) - i + 1):
    substr = text[i:i + length]
    if substr in vocab:
        best = substr  # Keeps overwriting with longer matches -- inefficient!

# Correct: longest first, break on first match
for length in range(len(text) - i, 0, -1):
    substr = text[i:i + length]
    if substr in vocab:
        best = substr
        break
```
::tabs-end


### Forgetting the Single-Character Fallback

If no substring starting at position $i$ is in the vocabulary, you must consume a single character and move on. Without this fallback, the algorithm would loop forever on unknown characters.

::tabs-start
```python
# Wrong: no fallback (infinite loop on unknown chars)
if best is None:
    raise ValueError("No match found")

# Correct: consume single character
if best is None:
    tokens.append(text[i])
    i += 1
```
::tabs-end


---

## In the GPT Project

This is directly relevant to how GPT processes input. The tokenizer runs before any neural network computation, and its quirks determine what the model "sees." The inconsistent number tokenization explains why GPT struggles with arithmetic (it doesn't see digits consistently), and fertility differences explain why non-English languages are more expensive and get less context window.

---

## Key Takeaways

- Greedy left-to-right longest match is simple but creates non-obvious token boundaries. Consecutive numbers can have completely different token structures.
- Fertility (tokens per word) measures how efficient a language is for a given tokenizer. English averages around 1.3 in GPT-4; some languages are 3-6x higher.
- The shared `_greedy_tokenize` helper avoids code duplication: all three methods use the same tokenization logic and just differ in what they compute from the result.
- Real BPE tokenizers use merge-order priority rather than simple longest match, but the edge cases are similar.
