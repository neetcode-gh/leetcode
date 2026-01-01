## 1. Arithmetic Sequence

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
                total += (1 + lenSubstring) * lenSubstring / 2;
                left = right;
            }
        }

        return total;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$

- Space complexity: $O(1)$ constant space

>  Where $N$ is the length of the input string `s`.

---

## 2. Dynamic Programming

::tabs-start

```python
class Solution:
    def countLetters(self, S: str) -> int:
        total = 1
        substrings = [0] * len(S)
        substrings[0] = 1

        for i in range(1, len(S)):
            if S[i - 1] == S[i]:
                substrings[i] = substrings[i-1] + 1
            else:
                substrings[i] = 1

            total += substrings[i]

        return total
```

```java
class Solution {
    public int countLetters(String S) {
        int substrings[] = new int[S.length()];
        int total = 1;
        substrings[0] = 1;

        for (int i = 1; i < S.length(); i++) {
            if (S.charAt(i) == S.charAt(i - 1)) {
                substrings[i] = substrings[i - 1] + 1;
            } else {
                substrings[i] = 1;
            }

            total += substrings[i];
        }

        return total;
    }
}
```

```cpp
class Solution {
public:
    int countLetters(string s) {
        vector<int> substrings(s.length());
        int total = 1;
        substrings[0] = 1;

        for (int i = 1; i < s.length(); i++) {
            if (s[i] == s[i - 1]) {
                substrings[i] = substrings[i - 1] + 1;
            } else {
                substrings[i] = 1;
            }

            total += substrings[i];
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
        let substrings = new Array(s.length);
        let total = 1;
        substrings[0] = 1;
        
        for (let i = 1; i < s.length; i++) {
            if (s[i] === s[i - 1]) {
                substrings[i] = substrings[i - 1] + 1;
            } else {
                substrings[i] = 1;
            }

            total += substrings[i];
        }

        return total;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$

- Space complexity: $O(N)$

>  Where $N$ is the length of the input string `s`.

---

## 3. Dynamic Programming (Optimized)

::tabs-start

```python
class Solution:
    def countLetters(self, S: str) -> int:
        total = 1
        count = 1
        
        for i in range(1, len(S)):
            if S[i] == S[i-1]:
                count += 1
            else:
                count = 1

            total += count

        return total
```

```java
class Solution {
    public int countLetters(String S) {
        int total = 1, count = 1;
        
        for (int i = 1; i < S.length(); i++) {
            if (S.charAt(i) == S.charAt(i-1)) {
                count++;
            } else {
                count = 1;
            }

            total += count;
        }

        return total;
    }
}
```

```cpp
class Solution {
public:
    int countLetters(string s) {
        int total = 1, count = 1;

        for (int i = 1; i < s.length(); i++) {
            if (s[i] == s[i-1]) {
                count++;
            } else {
                count = 1;
            }
            total += count;
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
        let total = 1, count = 1;

        for (let i = 1; i < s.length; i++) {
            if (s[i] === s[i-1]) {
                count++;
            } else {
                count = 1;
            }

            total += count;
        }

        return total;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$

- Space complexity: $O(1)$ constant space

>  Where $N$ is the length of the input string `s`.
