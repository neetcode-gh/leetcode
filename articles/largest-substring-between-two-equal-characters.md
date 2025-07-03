## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxLengthBetweenEqualCharacters(self, s: str) -> int:
        n = len(s)
        res = -1

        for i in range(n):
            for j in range(i + 1, n):
                if s[i] == s[j]:
                    res = max(res, j - i - 1)
        return res
```

```java
public class Solution {
    public int maxLengthBetweenEqualCharacters(String s) {
        int n = s.length();
        int res = -1;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (s.charAt(i) == s.charAt(j)) {
                    res = Math.max(res, j - i - 1);
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxLengthBetweenEqualCharacters(string s) {
        int n = s.size();
        int res = -1;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (s[i] == s[j]) {
                    res = max(res, j - i - 1);
                }
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxLengthBetweenEqualCharacters(s) {
        const n = s.length;
        let res = -1;

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (s[i] === s[j]) {
                    res = Math.max(res, j - i - 1);
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. First And Last Index

::tabs-start

```python
class Solution:
    def maxLengthBetweenEqualCharacters(self, s: str) -> int:
        res = -1
        firstIdx = {}
        lastIdx = {}

        for i, c in enumerate(s):
            if c not in firstIdx:
                firstIdx[c] = i
            else:
                lastIdx[c] = i

        for c in lastIdx:
            res = max(res, lastIdx[c] - firstIdx[c] - 1)

        return res
```

```java
public class Solution {
    public int maxLengthBetweenEqualCharacters(String s) {
        Map<Character, Integer> firstIdx = new HashMap<>();
        Map<Character, Integer> lastIdx = new HashMap<>();
        int res = -1;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (!firstIdx.containsKey(c)) {
                firstIdx.put(c, i);
            } else {
                lastIdx.put(c, i);
            }
        }

        for (char c : lastIdx.keySet()) {
            res = Math.max(res, lastIdx.get(c) - firstIdx.get(c) - 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxLengthBetweenEqualCharacters(string s) {
        unordered_map<char, int> firstIdx, lastIdx;
        int res = -1;

        for (int i = 0; i < s.size(); i++) {
            if (firstIdx.find(s[i]) == firstIdx.end()) {
                firstIdx[s[i]] = i;
            } else {
                lastIdx[s[i]] = i;
            }
        }

        for (auto& [c, idx] : lastIdx) {
            res = max(res, lastIdx[c] - firstIdx[c] - 1);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxLengthBetweenEqualCharacters(s) {
        const firstIdx = new Map();
        const lastIdx = new Map();
        let res = -1;

        for (let i = 0; i < s.length; i++) {
            if (!firstIdx.has(s[i])) {
                firstIdx.set(s[i], i);
            } else {
                lastIdx.set(s[i], i);
            }
        }

        for (const [char, idx] of lastIdx) {
            res = Math.max(res, lastIdx.get(char) - firstIdx.get(char) - 1);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 3. First Index (Hash Map)

::tabs-start

```python
class Solution:
    def maxLengthBetweenEqualCharacters(self, s: str) -> int:
        char_index = {}  # char -> first index
        res = -1

        for i, c in enumerate(s):
            if c in char_index:
                res = max(res, i - char_index[c] - 1)
            else:
                char_index[c] = i

        return res
```

```java
public class Solution {
    public int maxLengthBetweenEqualCharacters(String s) {
        Map<Character, Integer> charIndex = new HashMap<>();
        int res = -1;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (charIndex.containsKey(c)) {
                res = Math.max(res, i - charIndex.get(c) - 1);
            } else {
                charIndex.put(c, i);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxLengthBetweenEqualCharacters(string s) {
        unordered_map<char, int> charIndex;
        int res = -1;

        for (int i = 0; i < s.size(); i++) {
            if (charIndex.find(s[i]) != charIndex.end()) {
                res = max(res, i - charIndex[s[i]] - 1);
            } else {
                charIndex[s[i]] = i;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxLengthBetweenEqualCharacters(s) {
        const charIndex = new Map();
        let res = -1;

        for (let i = 0; i < s.length; i++) {
            if (charIndex.has(s[i])) {
                res = Math.max(res, i - charIndex.get(s[i]) - 1);
            } else {
                charIndex.set(s[i], i);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 4. First Index (Array)

::tabs-start

```python
class Solution:
    def maxLengthBetweenEqualCharacters(self, s: str) -> int:
        firstIdx = [-1] * 26
        res = -1

        for i, c in enumerate(s):
            j = ord(c) - ord('a')
            if firstIdx[j] != -1:
                res = max(res, i - firstIdx[j] - 1)
            else:
                firstIdx[j] = i

        return res
```

```java
public class Solution {
    public int maxLengthBetweenEqualCharacters(String s) {
        int[] firstIdx = new int[26];
        for (int i = 0; i < 26; i++) {
            firstIdx[i] = -1;
        }
        int res = -1;

        for (int i = 0; i < s.length(); i++) {
            int j = s.charAt(i) - 'a';
            if (firstIdx[j] != -1) {
                res = Math.max(res, i - firstIdx[j] - 1);
            } else {
                firstIdx[j] = i;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxLengthBetweenEqualCharacters(string s) {
        int firstIdx[26];
        fill(begin(firstIdx), end(firstIdx), -1);
        int res = -1;

        for (int i = 0; i < s.size(); i++) {
            int j = s[i] - 'a';
            if (firstIdx[j] != -1) {
                res = max(res, i - firstIdx[j] - 1);
            } else {
                firstIdx[j] = i;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxLengthBetweenEqualCharacters(s) {
        const firstIdx = Array(26).fill(-1);
        let res = -1;

        for (let i = 0; i < s.length; i++) {
            const j = s.charCodeAt(i) - 'a'.charCodeAt(0);
            if (firstIdx[j] !== -1) {
                res = Math.max(res, i - firstIdx[j] - 1);
            } else {
                firstIdx[j] = i;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.
