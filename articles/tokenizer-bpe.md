## Prerequisites

Before attempting this problem, you should be comfortable with:

- **String Manipulation** - Working with characters, counting adjacent pairs, and merging substrings, because BPE is fundamentally a string algorithm
- **Greedy Algorithms** - BPE makes the locally optimal choice at each step (merge the most frequent pair), which builds a globally useful vocabulary
- **NLP Tokenization Trade-offs** - Character-level tokenization produces long sequences; word-level cannot handle new words. BPE balances both.

---

## Concept

Byte Pair Encoding (BPE) is the tokenization algorithm used by GPT-2, GPT-3, and most modern language models. It finds the sweet spot between character-level tokenization (every character is a token, so sequences are very long) and word-level tokenization (every word is a token, so rare words are out-of-vocabulary).

The algorithm starts with individual characters as tokens and iteratively merges the most frequent adjacent pair:

1. Count the frequency of every adjacent token pair.
2. Find the most frequent pair (break ties lexicographically).
3. Merge all non-overlapping occurrences of that pair into a single new token.
4. Repeat for a specified number of merges.

Each merge creates a new token. Common words like "the" quickly become single tokens after a few merges (t+h, th+e). Rare words like "pneumonoultramicroscopicsilicovolcanoconiosis" stay as subword pieces. This is exactly what you want: common patterns get compressed, rare patterns decompose into known parts.

The merge table is the tokenizer's learned vocabulary. GPT-2 uses about 50,000 merges, producing a vocabulary of 50,257 tokens. The encoding process replays the merges in order to tokenize any input text.

---

## Solution

### Intuition

Start with individual characters. At each step, count all adjacent pairs, find the most frequent one (lexicographic tiebreak), and merge non-overlapping occurrences left to right. Record each merge.

### Implementation

::tabs-start
```python
from typing import List


class Solution:
    def get_merges(self, corpus: str, num_merges: int) -> List[List[str]]:
        tokens = list(corpus)
        merges = []
        for _ in range(num_merges):
            if len(tokens) < 2:
                break
            # Count adjacent pair frequencies
            pairs = {}
            for i in range(len(tokens) - 1):
                pair = (tokens[i], tokens[i + 1])
                pairs[pair] = pairs.get(pair, 0) + 1

            if not pairs:
                break

            # Find most frequent pair (tiebreak: lexicographically smallest)
            best_count = max(pairs.values())
            candidates = sorted(p for p, c in pairs.items() if c == best_count)
            best = candidates[0]

            merges.append([best[0], best[1]])

            # Merge all non-overlapping occurrences left to right
            new_tokens = []
            i = 0
            while i < len(tokens):
                if i < len(tokens) - 1 and tokens[i] == best[0] and tokens[i + 1] == best[1]:
                    new_tokens.append(best[0] + best[1])
                    i += 2
                else:
                    new_tokens.append(tokens[i])
                    i += 1
            tokens = new_tokens

        return merges
```
::tabs-end


### Walkthrough

For `corpus = "aaabab"` and `num_merges = 3`:

| Merge | Tokens Before | Pair Counts | Best Pair | Tokens After |
|---|---|---|---|---|
| 1 | `['a','a','a','b','a','b']` | ('a','a'):2, ('a','b'):2, ('b','a'):1 | ('a','a') (lex) | `['aa','a','b','a','b']` |
| 2 | `['aa','a','b','a','b']` | ('aa','a'):1, ('a','b'):2, ('b','a'):1 | ('a','b') | `['aa','ab','ab']` |
| 3 | `['aa','ab','ab']` | ('aa','ab'):1, ('ab','ab'):1 | ('aa','ab') (lex) | `['aaab','ab']` |

Result: `[['a','a'], ['a','b'], ['aa','ab']]`

### Time & Space Complexity

- Time: $O(M \cdot N)$ where $M$ is the number of merges and $N$ is the current token list length
- Space: $O(N)$ for the token list and pair frequency dictionary

---

## Common Pitfalls

### Overlapping Merges

When merging "aa" in "aaa", you get "aa" + "a" (non-overlapping, left to right), not "a" + "aa". The left-to-right scan prevents double-counting.

::tabs-start
```python
# Wrong: re-scanning allows overlapping merges
for i in range(len(tokens) - 1):
    if tokens[i] == best[0] and tokens[i+1] == best[1]:
        tokens[i] = best[0] + best[1]
        del tokens[i+1]  # index shift causes overlaps

# Correct: build new list, skip by 2 on match
new_tokens = []
i = 0
while i < len(tokens):
    if i < len(tokens) - 1 and tokens[i] == best[0] and tokens[i+1] == best[1]:
        new_tokens.append(best[0] + best[1])
        i += 2
    else:
        new_tokens.append(tokens[i])
        i += 1
```
::tabs-end


### Wrong Tiebreaking

When multiple pairs have the same frequency, lexicographic ordering ensures deterministic results. Without it, different runs may produce different merge tables.

::tabs-start
```python
# Wrong: arbitrary tiebreak
best = max(pairs, key=pairs.get)

# Correct: lexicographic tiebreak among equally frequent pairs
best_count = max(pairs.values())
candidates = sorted(p for p, c in pairs.items() if c == best_count)
best = candidates[0]
```
::tabs-end


---

## In the GPT Project

This becomes `data/tokenizer.py`. BPE is the standard tokenization algorithm for production language models. GPT-2 uses BPE with 50,257 tokens. In this course, the character-level GPT uses a simpler character vocabulary, but understanding BPE is essential for working with real-world models.

---

## Key Takeaways

- BPE learns subword tokens by greedily merging the most frequent adjacent pairs, achieving a vocabulary that compresses common patterns while decomposing rare words into known pieces.
- Non-overlapping left-to-right merging ensures deterministic, reproducible results.
- BPE eliminates out-of-vocabulary problems: any input can be encoded as a sequence of subword tokens, even words the model has never seen before.
