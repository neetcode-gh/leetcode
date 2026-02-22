## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Two Pointers** - Using left and right pointers to identify groups of consecutive characters
- **Arithmetic Series Formula** - Calculating the sum 1 + 2 + ... + n = n\*(n+1)/2 for counting substrings
- **String Traversal** - Iterating through strings and comparing adjacent characters

---

## 1. Arithmetic Sequence

### Intuition

The string can be split into consecutive groups of identical characters. For each group of length `L`, the number of substrings containing only that character follows the arithmetic sequence formula: `1 + 2 + 3 + ... + L = L*(L+1)/2`. We scan through the string, identify each group, and sum up the contributions.

### Algorithm

1. Use two pointers, `left` and `right`, both starting at `0`.
2. Move `right` through the string until a different character is found or the end is reached.
3. When a group ends (character changes or string ends):
    - Calculate the length of the group as `(right - left)`.
    - Add the arithmetic sum: `(length * (length + 1)) / 2` to the total.
    - Move `left` to `right` to start the next group.
4. Return the total count.

::tabs-start

```python
class Solution:
    def countLetters(self, S: str) -> int:
        total = left = 0

        for right in range(len(S) + 1):
            if right == len(S) or S[left] != S[right]:
                len_substring = right - left
                # more details about the sum of the arithmetic sequence:
                # https://en.wikipedia.org/wiki/Arithmetic_progression#Sum
                total += (1 + len_substring) * len_substring // 2
                left = right

        return total
```

```java
class Solution {
    public int countLetters(String S) {
        int total = 0;
        for (int left = 0, right = 0; right <= S.length(); right++) {
            if (right == S.length() || S.charAt(left) != S.charAt(right)) {
                int lenSubstring = right - left;
                // more details about the sum of the arithmetic sequence:
                // https://en.wikipedia.org/wiki/Arithmetic_progression#Sum
                total += (1 + lenSubstring) * lenSubstring / 2;
                left = right;
            }
        }

        return total;
    }
}
```

```cpp
class Solution {
public:
    int countLetters(string s) {
        int total = 0;
        for (int left = 0, right = 0; right <= s.length(); right++) {
            if (right == s.length() || s[left] != s[right]) {
                int lenSubstring = right - left;
                // more details about the sum of the arithmetic sequence:
                // https://en.wikipedia.org/wiki/Arithmetic_progression#Sum
                total += (1 + lenSubstring) * lenSubstring / 2;
                left = right;
            }
        }

        return total;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countLetters(s) {
        let total = 0;
        for (let left = 0, right = 0; right <= s.length; right++) {
            if (right === s.length || s[left] !== s[right]) {
                let lenSubstring = right - left;
                // more details about the sum of the arithmetic sequence:
                // https://en.wikipedia.org/wiki/Arithmetic_progression#Sum
                total += ((1 + lenSubstring) * lenSubstring) / 2;
                left = right;
            }
        }

        return total;
    }
}
```

```csharp
public class Solution {
    public int CountLetters(string s) {
        int total = 0;
        for (int left = 0, right = 0; right <= s.Length; right++) {
            if (right == s.Length || s[left] != s[right]) {
                int lenSubstring = right - left;
                total += (1 + lenSubstring) * lenSubstring / 2;
                left = right;
            }
        }

        return total;
    }
}
```

```go
func countLetters(s string) int {
    total := 0
    left := 0

    for right := 0; right <= len(s); right++ {
        if right == len(s) || s[left] != s[right] {
            lenSubstring := right - left
            total += (1 + lenSubstring) * lenSubstring / 2
            left = right
        }
    }

    return total
}
```

```kotlin
class Solution {
    fun countLetters(s: String): Int {
        var total = 0
        var left = 0

        for (right in 0..s.length) {
            if (right == s.length || s[left] != s[right]) {
                val lenSubstring = right - left
                total += (1 + lenSubstring) * lenSubstring / 2
                left = right
            }
        }

        return total
    }
}
```

```swift
class Solution {
    func countLetters(_ s: String) -> Int {
        var total = 0
        let chars = Array(s)
        var left = 0

        for right in 0...chars.count {
            if right == chars.count || chars[left] != chars[right] {
                let lenSubstring = right - left
                total += (1 + lenSubstring) * lenSubstring / 2
                left = right
            }
        }

        return total
    }
}
```

```rust
impl Solution {
    pub fn count_letters(s: String) -> i32 {
        let s = s.as_bytes();
        let mut total = 0;
        let mut left = 0;

        for right in 0..=s.len() {
            if right == s.len() || s[left] != s[right] {
                let len_substring = (right - left) as i32;
                total += (1 + len_substring) * len_substring / 2;
                left = right;
            }
        }

        total
    }
}
```

```rust
impl Solution {
    pub fn count_letters(s: String) -> i32 {
        let s = s.as_bytes();
        let mut total = 1;
        let mut count = 1;

        for i in 1..s.len() {
            if s[i] == s[i - 1] {
                count += 1;
            } else {
                count = 1;
            }
            total += count;
        }

        total
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$

- Space complexity: $O(1)$ constant space

> Where $N$ is the length of the input string `s`.

---

## Common Pitfalls

### Using Wrong Formula for Counting Substrings

For a group of `L` identical consecutive characters, the number of valid substrings is `L * (L + 1) / 2`, not `L` or `L * L`. This arithmetic sum counts substrings of lengths 1, 2, 3, ..., L.

```python
# Wrong: Only counts substrings of length 1
total += length

# Wrong: Overcounts
total += length * length

# Correct: Sum of 1 + 2 + ... + L
total += length * (length + 1) // 2
```

### Forgetting to Process the Last Group

When iterating through the string to find groups of identical characters, the last group may not be processed if the loop only triggers on character changes. Ensure the final group is counted either by extending the loop to `len(s) + 1` or by handling it after the loop ends.
