## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Python Dictionaries** - Creating bidirectional mappings between keys and values, because the vocabulary is a pair of dictionaries (string-to-int and int-to-string)
- **Character-Level Tokenization** - Treating each character as an individual token, which is the simplest tokenization approach and the one used in this course's GPT model

---

## Concept

Before a language model can process text, it needs a vocabulary: a bidirectional mapping between characters (or tokens) and integers. The model works with integers internally, so we need `encode` to convert text to numbers and `decode` to convert numbers back to text.

The construction process is:

1. **Extract unique characters** from the training text.
2. **Sort them** alphabetically for deterministic ordering.
3. **Build `stoi`** (string-to-integer): assign each character a unique index starting from 0.
4. **Build `itos`** (integer-to-string): the reverse mapping.

This is character-level tokenization. The vocabulary size equals the number of unique characters in the training data, typically 50-100 for English text. Compare this to BPE (50,000+ tokens) or word-level (100,000+ tokens). Character-level vocabularies produce much longer sequences but never encounter out-of-vocabulary tokens (as long as the character appeared in training).

The `encode`/`decode` functions must be inverses: `decode(encode(text)) == text`. This round-trip property is essential. If you cannot perfectly reconstruct the original text, the model cannot learn the correct input-output mapping.

---

## Solution

### Intuition

Extract unique characters with `set()`, sort them, build two dictionaries with enumerate. Encoding is a list comprehension of dictionary lookups. Decoding joins the looked-up characters.

### Implementation

::tabs-start
```python
from typing import Dict, List, Tuple

class Solution:
    def build_vocab(self, text: str) -> Tuple[Dict[str, int], Dict[int, str]]:
        chars = sorted(set(text))
        stoi = {ch: i for i, ch in enumerate(chars)}
        itos = {i: ch for ch, i in stoi.items()}
        return stoi, itos

    def encode(self, text: str, stoi: Dict[str, int]) -> List[int]:
        return [stoi[ch] for ch in text]

    def decode(self, ids: List[int], itos: Dict[int, str]) -> str:
        return ''.join(itos[i] for i in ids)
```
::tabs-end


### Walkthrough

For `text = "hello"`:

| Step | Input | Output |
|---|---|---|
| Unique chars | "hello" | `{'h', 'e', 'l', 'o'}` |
| Sort | set | `['e', 'h', 'l', 'o']` |
| stoi | sorted chars | `{'e': 0, 'h': 1, 'l': 2, 'o': 3}` |
| itos | reversed | `{0: 'e', 1: 'h', 2: 'l', 3: 'o'}` |
| Encode "hello" | lookup each char | $[1, 0, 2, 2, 3]$ |
| Decode $[1,0,2,2,3]$ | lookup each int | "hello" |

Round-trip: `decode(encode("hello")) = "hello"`.

### Time & Space Complexity

- Time: $O(N \log N)$ for building vocabulary (sorting unique characters), $O(N)$ for encoding/decoding where $N$ is text length
- Space: $O(V)$ for the vocabulary dictionaries where $V$ is the number of unique characters

---

## Common Pitfalls

### Not Sorting the Unique Characters

Python sets have no guaranteed iteration order. Without sorting, the same text may produce different vocabularies on different runs.

::tabs-start
```python
# Wrong: non-deterministic order
chars = list(set(text))

# Correct: sorted for reproducibility
chars = sorted(set(text))
```
::tabs-end


### Building itos Incorrectly

The `itos` mapping must be the exact inverse of `stoi`. Building it independently can introduce mismatches.

::tabs-start
```python
# Wrong: building independently, might not be exact inverse
itos = {i: ch for i, ch in enumerate(chars)}

# Correct: derive from stoi to guarantee inverse relationship
itos = {i: ch for ch, i in stoi.items()}
```
::tabs-end


---

## In the GPT Project

This becomes `data/vocab.py`. The GPT model in this course uses character-level tokenization, so this vocabulary is what converts raw training text into the integer sequences that the model processes. Production models like GPT-2 use BPE instead, but the concept is the same: a bidirectional mapping between tokens and integers.

---

## Key Takeaways

- A character-level vocabulary is the simplest tokenization approach, with vocabulary size equal to the number of unique characters in the training data.
- The `stoi`/`itos` pair enables lossless round-trip conversion between text and integer sequences, which is a hard requirement for any tokenizer.
- Sorting the unique characters ensures deterministic ID assignment. Without sorting, the same text could produce different vocabularies across runs.
