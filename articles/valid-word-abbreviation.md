## 1. Two Pointers

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$

> Where $n$ and $m$ are the lengths of the strings $word$ and $abbr$, respectively.
