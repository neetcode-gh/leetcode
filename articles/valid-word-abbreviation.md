## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Two Pointers Technique** - Simultaneously traversing two strings with independent indices
- **String Parsing** - Converting sequences of digit characters into numeric values
- **Character Classification** - Distinguishing between alphabetic characters and digits

---

## 1. Two Pointers

### Intuition

We need to verify that the abbreviation correctly represents the word. The abbreviation contains letters and numbers, where numbers indicate how many characters to skip. We use two pointers to traverse both strings simultaneously. When we see a letter in the abbreviation, it must match the current character in the word. When we see a number, we parse the full number and skip that many characters in the word. A leading zero in any number makes the abbreviation invalid.

### Algorithm

1. Initialize two pointers: `i` for the word and `j` for the abbreviation.
2. While both pointers are within bounds:
   - If `abbr[j]` is `'0'`, return `false` (leading zeros are invalid).
   - If `abbr[j]` is a letter:
     - Check if `word[i] == abbr[j]`. If not, return `false`.
     - Increment both `i` and `j`.
   - If `abbr[j]` is a digit:
     - Parse the complete number by collecting consecutive digits.
     - Advance `i` by that number (skip characters in the word).
3. Return `true` if both pointers have reached the end of their respective strings.

::tabs-start

```python
class Solution:
    def validWordAbbreviation(self, word: str, abbr: str) -> bool:
        n, m = len(word), len(abbr)
        i = j = 0

        while i < n and j < m:
            if abbr[j] == '0':
                return False

            if word[i] == abbr[j]:
                i, j = i + 1, j + 1
            elif abbr[j].isalpha():
                return False
            else:
                subLen = 0
                while j < m and abbr[j].isdigit():
                    subLen = subLen * 10 + int(abbr[j])
                    j += 1
                i += subLen

        return i == n and j == m
```

```java
public class Solution {
    public boolean validWordAbbreviation(String word, String abbr) {
        int n = word.length(), m = abbr.length();
        int i = 0, j = 0;

        while (i < n && j < m) {
            if (abbr.charAt(j) == '0') return false;

            if (Character.isLetter(abbr.charAt(j))) {
                if (i < n && word.charAt(i) == abbr.charAt(j)) {
                    i++;
                    j++;
                } else {
                    return false;
                }
            } else {
                int subLen = 0;
                while (j < m && Character.isDigit(abbr.charAt(j))) {
                    subLen = subLen * 10 + (abbr.charAt(j) - '0');
                    j++;
                }
                i += subLen;
            }
        }

        return i == n && j == m;
    }
}
```

```cpp
class Solution {
public:
    bool validWordAbbreviation(string word, string abbr) {
        int n = word.length(), m = abbr.length();
        int i = 0, j = 0;

        while (i < n && j < m) {
            if (abbr[j] == '0') return false;

            if (isalpha(abbr[j])) {
                if (word[i] == abbr[j]) {
                    i++; j++;
                } else {
                    return false;
                }
            } else {
                int subLen = 0;
                while (j < m && isdigit(abbr[j])) {
                    subLen = subLen * 10 + (abbr[j] - '0');
                    j++;
                }
                i += subLen;
            }
        }

        return i == n && j == m;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} word
     * @param {string} abbr
     * @return {boolean}
     */
    validWordAbbreviation(word, abbr) {
        let n = word.length,
            m = abbr.length;
        let i = 0,
            j = 0;

        while (i < n && j < m) {
            if (abbr[j] === '0') return false;

            if (isNaN(abbr[j])) {
                if (word[i] === abbr[j]) {
                    i++;
                    j++;
                } else {
                    return false;
                }
            } else {
                let subLen = 0;
                while (j < m && !isNaN(abbr[j]) && abbr[j] !== ' ') {
                    subLen = subLen * 10 + parseInt(abbr[j]);
                    j++;
                }
                i += subLen;
            }
        }

        return i === n && j === m;
    }
}
```

```csharp
public class Solution {
    public bool ValidWordAbbreviation(string word, string abbr) {
        int n = word.Length, m = abbr.Length;
        int i = 0, j = 0;

        while (i < n && j < m) {
            if (abbr[j] == '0') return false;

            if (char.IsLetter(abbr[j])) {
                if (i < n && word[i] == abbr[j]) {
                    i++; j++;
                } else {
                    return false;
                }
            } else {
                int subLen = 0;
                while (j < m && char.IsDigit(abbr[j])) {
                    subLen = subLen * 10 + (abbr[j] - '0');
                    j++;
                }
                i += subLen;
            }
        }

        return i == n && j == m;
    }
}
```

```go
func validWordAbbreviation(word string, abbr string) bool {
    n, m := len(word), len(abbr)
    i, j := 0, 0

    for i < n && j < m {
        if abbr[j] == '0' {
            return false
        }

        if abbr[j] >= 'a' && abbr[j] <= 'z' {
            if word[i] == abbr[j] {
                i++
                j++
            } else {
                return false
            }
        } else {
            subLen := 0
            for j < m && abbr[j] >= '0' && abbr[j] <= '9' {
                subLen = subLen*10 + int(abbr[j]-'0')
                j++
            }
            i += subLen
        }
    }

    return i == n && j == m
}
```

```kotlin
class Solution {
    fun validWordAbbreviation(word: String, abbr: String): Boolean {
        val n = word.length
        val m = abbr.length
        var i = 0
        var j = 0

        while (i < n && j < m) {
            if (abbr[j] == '0') return false

            if (abbr[j].isLetter()) {
                if (word[i] == abbr[j]) {
                    i++
                    j++
                } else {
                    return false
                }
            } else {
                var subLen = 0
                while (j < m && abbr[j].isDigit()) {
                    subLen = subLen * 10 + (abbr[j] - '0')
                    j++
                }
                i += subLen
            }
        }

        return i == n && j == m
    }
}
```

```swift
class Solution {
    func validWordAbbreviation(_ word: String, _ abbr: String) -> Bool {
        let wordArr = Array(word)
        let abbrArr = Array(abbr)
        let n = wordArr.count
        let m = abbrArr.count
        var i = 0, j = 0

        while i < n && j < m {
            if abbrArr[j] == "0" {
                return false
            }

            if abbrArr[j].isLetter {
                if wordArr[i] == abbrArr[j] {
                    i += 1
                    j += 1
                } else {
                    return false
                }
            } else {
                var subLen = 0
                while j < m && abbrArr[j].isNumber {
                    subLen = subLen * 10 + Int(String(abbrArr[j]))!
                    j += 1
                }
                i += subLen
            }
        }

        return i == n && j == m
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$

> Where $n$ and $m$ are the lengths of the strings $word$ and $abbr$, respectively.

---

## Common Pitfalls

### Allowing Leading Zeros in Numbers

The abbreviation `"a02b"` is invalid because the number has a leading zero. Many solutions forget to check for this edge case. Before parsing a multi-digit number, always verify that the first digit is not `'0'`. A leading zero makes the abbreviation invalid regardless of the number's value.

### Skipping Past the End of the Word

After parsing a number from the abbreviation and advancing the word pointer, you must verify that the pointer does not exceed the word length. For example, with `word = "hi"` and `abbr = "5"`, skipping 5 characters goes beyond the word's length. Always check `i <= n` after advancing, and ensure both pointers reach their respective ends simultaneously.
