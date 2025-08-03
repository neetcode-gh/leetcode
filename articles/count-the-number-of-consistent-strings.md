## 1. Brute Force

::tabs-start

```python
class Solution:
    def countConsistentStrings(self, allowed: str, words: List[str]) -> int:
        res = 0

        for w in words:
            flag = 1
            for c in w:
                if c not in allowed:
                    flag = 0
                    break
            res += flag

        return res
```

```java
public class Solution {
    public int countConsistentStrings(String allowed, String[] words) {
        int res = 0;

        for (String w : words) {
            boolean flag = true;
            for (char c : w.toCharArray()) {
                if (allowed.indexOf(c) == -1) {
                    flag = false;
                    break;
                }
            }
            if (flag) res++;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countConsistentStrings(string allowed, vector<string>& words) {
        int res = 0;

        for (string& w : words) {
            bool flag = true;
            for (char c : w) {
                if (allowed.find(c) == string::npos) {
                    flag = false;
                    break;
                }
            }
            res += flag;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} allowed
     * @param {string[]} words
     * @return {number}
     */
    countConsistentStrings(allowed, words) {
        let res = 0;

        for (let w of words) {
            let flag = 1;
            for (let c of w) {
                if (!allowed.includes(c)) {
                    flag = 0;
                    break;
                }
            }
            res += flag;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m * l)$
- Space complexity: $O(1)$

> Where $n$ is the number of words, $m$ is the length of the string $allowed$, and $l$ is the length of the longest word.

---

## 2. Hash Set

::tabs-start

```python
class Solution:
    def countConsistentStrings(self, allowed: str, words: List[str]) -> int:
        allowed = set(allowed)

        res = len(words)
        for w in words:
            for c in w:
                if c not in allowed:
                    res -= 1
                    break

        return res
```

```java
public class Solution {
    public int countConsistentStrings(String allowed, String[] words) {
        Set<Character> allowedSet = new HashSet<>();
        for (char c : allowed.toCharArray()) {
            allowedSet.add(c);
        }

        int res = words.length;
        for (String w : words) {
            for (char c : w.toCharArray()) {
                if (!allowedSet.contains(c)) {
                    res--;
                    break;
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
    int countConsistentStrings(string allowed, vector<string>& words) {
        unordered_set<char> allowedSet(allowed.begin(), allowed.end());

        int res = words.size();
        for (string& w : words) {
            for (char c : w) {
                if (allowedSet.find(c) == allowedSet.end()) {
                    res--;
                    break;
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
     * @param {string} allowed
     * @param {string[]} words
     * @return {number}
     */
    countConsistentStrings(allowed, words) {
        const allowedSet = new Set(allowed);
        let res = words.length;

        for (let w of words) {
            for (let c of w) {
                if (!allowedSet.has(c)) {
                    res--;
                    break;
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * l + m)$
- Space complexity: $O(m)$

> Where $n$ is the number of words, $m$ is the length of the string $allowed$, and $l$ is the length of the longest word.

---

## 3. Boolean Array

::tabs-start

```python
class Solution:
    def countConsistentStrings(self, allowed: str, words: List[str]) -> int:
        allowedArr = [False] * 26
        for c in allowed:
            allowedArr[ord(c) - ord('a')] = True

        res = len(words)
        for w in words:
            for c in w:
                if not allowedArr[ord(c) - ord('a')]:
                    res -= 1
                    break

        return res
```

```java
public class Solution {
    public int countConsistentStrings(String allowed, String[] words) {
        Set<Character> allowedSet = new HashSet<>();
        for (char c : allowed.toCharArray()) {
            allowedSet.add(c);
        }

        int res = words.length;
        for (String w : words) {
            for (char c : w.toCharArray()) {
                if (!allowedSet.contains(c)) {
                    res--;
                    break;
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
    int countConsistentStrings(string allowed, vector<string>& words) {
        bool allowedArr[26] = {};
        for (char c : allowed) {
            allowedArr[c - 'a'] = true;
        }

        int res = words.size();
        for (const string& w : words) {
            for (char c : w) {
                if (!allowedArr[c - 'a']) {
                    res--;
                    break;
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
     * @param {string} allowed
     * @param {string[]} words
     * @return {number}
     */
    countConsistentStrings(allowed, words) {
        const allowedArr = new Array(26).fill(false);
        for (let c of allowed) {
            allowedArr[c.charCodeAt(0) - 97] = true;
        }

        let res = words.length;
        for (let w of words) {
            for (let c of w) {
                if (!allowedArr[c.charCodeAt(0) - 97]) {
                    res--;
                    break;
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * l + m)$
- Space complexity: $O(m)$

> Where $n$ is the number of words, $m$ is the length of the string $allowed$, and $l$ is the length of the longest word.

---

## 4. Bitmask

::tabs-start

```python
class Solution:
    def countConsistentStrings(self, allowed: str, words: List[str]) -> int:
        bit_mask = 0
        for c in allowed:
            bit = 1 << (ord(c) - ord('a'))
            bit_mask = bit_mask | bit

        res = len(words)
        for w in words:
            for c in w:
                bit = 1 << (ord(c) - ord('a'))
                if bit & bit_mask == 0:
                    res -= 1
                    break

        return res
```

```java
public class Solution {
    public int countConsistentStrings(String allowed, String[] words) {
        int bitMask = 0;
        for (char c : allowed.toCharArray()) {
            bitMask |= 1 << (c - 'a');
        }

        int res = words.length;
        for (String w : words) {
            for (char c : w.toCharArray()) {
                int bit = 1 << (c - 'a');
                if ((bit & bitMask) == 0) {
                    res--;
                    break;
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
    int countConsistentStrings(string allowed, vector<string>& words) {
        int bitMask = 0;
        for (char c : allowed) {
            bitMask |= (1 << (c - 'a'));
        }

        int res = words.size();
        for (const string& w : words) {
            for (char c : w) {
                int bit = 1 << (c - 'a');
                if ((bit & bitMask) == 0) {
                    res--;
                    break;
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
     * @param {string} allowed
     * @param {string[]} words
     * @return {number}
     */
    countConsistentStrings(allowed, words) {
        let bitMask = 0;
        for (let c of allowed) {
            bitMask |= 1 << (c.charCodeAt(0) - 97);
        }

        let res = words.length;
        for (let w of words) {
            for (let c of w) {
                const bit = 1 << (c.charCodeAt(0) - 97);
                if ((bit & bitMask) === 0) {
                    res--;
                    break;
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * l + m)$
- Space complexity: $O(1)$

> Where $n$ is the number of words, $m$ is the length of the string $allowed$, and $l$ is the length of the longest word.
