## 1. Hash Map

::tabs-start

```python
class Solution:
    def longestPalindrome(self, s: str) -> int:
        count = defaultdict(int)
        res = 0

        for c in s:
            count[c] += 1
            if count[c] % 2 == 0:
                res += 2

        for cnt in count.values():
            if cnt % 2:
                res += 1
                break

        return res
```

```java
public class Solution {
    public int longestPalindrome(String s) {
        Map<Character, Integer> count = new HashMap<>();
        int res = 0;

        for (char c : s.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
            if (count.get(c) % 2 == 0) {
                res += 2;
            }
        }

        for (int cnt : count.values()) {
            if (cnt % 2 == 1) {
                res += 1;
                break;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestPalindrome(string s) {
        unordered_map<char, int> count;
        int res = 0;

        for (char c : s) {
            count[c]++;
            if (count[c] % 2 == 0) {
                res += 2;
            }
        }

        for (auto& [ch, cnt] : count) {
            if (cnt % 2 == 1) {
                res += 1;
                break;
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
    longestPalindrome(s) {
        const count = {};
        let res = 0;

        for (let c of s) {
            count[c] = (count[c] || 0) + 1;
            if (count[c] % 2 === 0) {
                res += 2;
            }
        }

        for (let key in count) {
            if (count[key] % 2 === 1) {
                res += 1;
                break;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(m)$

> Where $n$ is the length of the given string, and $m$ is the number of distinct characters in the string.

---

## 2. Hash Map (Optimal)

::tabs-start

```python
class Solution:
    def longestPalindrome(self, s: str) -> int:
        count = defaultdict(int)
        res = 0

        for c in s:
            count[c] += 1
            if count[c] % 2 == 0:
                res += 2

        return res + (res < len(s))
```

```java
public class Solution {
    public int longestPalindrome(String s) {
        Map<Character, Integer> count = new HashMap<>();
        int res = 0;

        for (char c : s.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
            if (count.get(c) % 2 == 0) {
                res += 2;
            }
        }

        return res + (res < s.length() ? 1 : 0);
    }
}
```

```cpp
class Solution {
public:
    int longestPalindrome(string s) {
        unordered_map<char, int> count;
        int res = 0;

        for (char c : s) {
            count[c]++;
            if (count[c] % 2 == 0) {
                res += 2;
            }
        }

        return res + (res < s.size());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindrome(s) {
        const count = {};
        let res = 0;

        for (let c of s) {
            count[c] = (count[c] || 0) + 1;
            if (count[c] % 2 === 0) {
                res += 2;
            }
        }

        return res + (res < s.length ? 1 : 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(m)$

> Where $n$ is the length of the given string, and $m$ is the number of distinct characters in the string.

---

## 3. Hash Set

::tabs-start

```python
class Solution:
    def longestPalindrome(self, s: str) -> int:
        seen = set()
        res = 0

        for c in s:
            if c in seen:
                seen.remove(c)
                res += 2
            else:
                seen.add(c)

        return res + 1 if seen else res
```

```java
public class Solution {
    public int longestPalindrome(String s) {
        Set<Character> seen = new HashSet<>();
        int res = 0;

        for (char c : s.toCharArray()) {
            if (seen.contains(c)) {
                seen.remove(c);
                res += 2;
            } else {
                seen.add(c);
            }
        }

        return seen.isEmpty() ? res : res + 1;
    }
}
```

```cpp
class Solution {
public:
    int longestPalindrome(string s) {
        unordered_set<char> seen;
        int res = 0;

        for (char c : s) {
            if (seen.count(c)) {
                seen.erase(c);
                res += 2;
            } else {
                seen.insert(c);
            }
        }

        return seen.empty() ? res : res + 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindrome(s) {
        const seen = new Set();
        let res = 0;

        for (let c of s) {
            if (seen.has(c)) {
                seen.delete(c);
                res += 2;
            } else {
                seen.add(c);
            }
        }

        return seen.size === 0 ? res : res + 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(m)$

> Where $n$ is the length of the given string, and $m$ is the number of distinct characters in the string.

---

## 4. Bitmask

::tabs-start

```python
class Solution:
    def longestPalindrome(self, s: str) -> int:
        mask1 = 0  # [a - z]
        mask2 = 0  # [A - Z]
        res = 0

        for c in s:
            if 'a' <= c <= 'z':
                bit = 1 << (ord(c) - ord('a'))
                if mask1 & bit:
                    res += 2
                mask1 ^= bit
            else:
                bit = 1 << (ord(c) - ord('A'))
                if mask2 & bit:
                    res += 2
                mask2 ^= bit

        return res + 1 if mask1 or mask2 else res
```

```java
public class Solution {
    public int longestPalindrome(String s) {
        int mask1 = 0; // [a - z]
        int mask2 = 0; // [A - Z]
        int res = 0;

        for (char c : s.toCharArray()) {
            if (c >= 'a' && c <= 'z') {
                int bit = 1 << (c - 'a');
                if ((mask1 & bit) != 0) {
                    res += 2;
                }
                mask1 ^= bit;
            } else {
                int bit = 1 << (c - 'A');
                if ((mask2 & bit) != 0) {
                    res += 2;
                }
                mask2 ^= bit;
            }
        }

        return (mask1 != 0 || mask2 != 0) ? res + 1 : res;
    }
}
```

```cpp
class Solution {
public:
    int longestPalindrome(string s) {
        int mask1 = 0; // [a - z]
        int mask2 = 0; // [A - Z]
        int res = 0;

        for (char c : s) {
            if ('a' <= c && c <= 'z') {
                int bit = 1 << (c - 'a');
                if (mask1 & bit) {
                    res += 2;
                }
                mask1 ^= bit;
            } else {
                int bit = 1 << (c - 'A');
                if (mask2 & bit) {
                    res += 2;
                }
                mask2 ^= bit;
            }
        }

        return (mask1 || mask2) ? res + 1 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindrome(s) {
        let mask1 = 0; // [a - z]
        let mask2 = 0; // [A - Z]
        let res = 0;

        for (let c of s) {
            if (c >= 'a' && c <= 'z') {
                let bit = 1 << (c.charCodeAt(0) - 97);
                if (mask1 & bit) {
                    res += 2;
                }
                mask1 ^= bit;
            } else {
                let bit = 1 << (c.charCodeAt(0) - 65);
                if (mask2 & bit) {
                    res += 2;
                }
                mask2 ^= bit;
            }
        }

        return mask1 || mask2 ? res + 1 : res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
