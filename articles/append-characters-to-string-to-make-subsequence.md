## 1. Two Pointers

::tabs-start

```python
class Solution:
    def appendCharacters(self, s: str, t: str) -> int:
        i, j = 0, 0

        while i < len(s) and j < len(t):
            if s[i] == t[j]:
                i += 1
                j += 1
            else:
                i += 1
        return len(t) - j
```

```java
public class Solution {
    public int appendCharacters(String s, String t) {
        int i = 0, j = 0;

        while (i < s.length() && j < t.length()) {
            if (s.charAt(i) == t.charAt(j)) {
                i++;
                j++;
            } else {
                i++;
            }
        }
        return t.length() - j;
    }
}
```

```cpp
class Solution {
public:
    int appendCharacters(string s, string t) {
        int i = 0, j = 0;

        while (i < s.length() && j < t.length()) {
            if (s[i] == t[j]) {
                i++;
                j++;
            } else {
                i++;
            }
        }
        return t.length() - j;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {number}
     */
    appendCharacters(s, t) {
        let i = 0,
            j = 0;

        while (i < s.length && j < t.length) {
            if (s[i] === t[j]) {
                i++;
                j++;
            } else {
                i++;
            }
        }
        return t.length - j;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$

> Where $n$ and $m$ are the lengths of the strings $s$ and $t$, respectively.

---

## 2. Index Jumping

::tabs-start

```python
class Solution:
    def appendCharacters(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        store = [[n + 1] * 26 for _ in range(n)]
        store[n - 1][ord(s[n - 1]) - ord('a')] = n - 1

        for i in range(n - 2, -1, -1):
            store[i] = store[i + 1][:]
            store[i][ord(s[i]) - ord('a')] = i

        i, j = 0, 0
        while i < n and j < m:
            if store[i][ord(t[j]) - ord('a')] == n + 1:
                break

            i = store[i][ord(t[j]) - ord('a')] + 1
            j += 1

        return m - j
```

```java
public class Solution {
    public int appendCharacters(String s, String t) {
        int n = s.length(), m = t.length();
        int[][] store = new int[n][26];
        for (int[] row : store) {
            Arrays.fill(row, n + 1);
        }
        store[n - 1][s.charAt(n - 1) - 'a'] = n - 1;

        for (int i = n - 2; i >= 0; i--) {
            store[i] = store[i + 1].clone();
            store[i][s.charAt(i) - 'a'] = i;
        }

        int i = 0, j = 0;
        while (i < n && j < m) {
            if (store[i][t.charAt(j) - 'a'] == n + 1) {
                break;
            }
            i = store[i][t.charAt(j) - 'a'] + 1;
            j++;
        }

        return m - j;
    }
}
```

```cpp
class Solution {
public:
    int appendCharacters(string s, string t) {
        int n = s.length(), m = t.length();
        vector<vector<int>> store(n, vector<int>(26, n + 1));
        store[n - 1][s[n - 1] - 'a'] = n - 1;

        for (int i = n - 2; i >= 0; i--) {
            store[i] = store[i + 1];
            store[i][s[i] - 'a'] = i;
        }

        int i = 0, j = 0;
        while (i < n && j < m) {
            if (store[i][t[j] - 'a'] == n + 1) {
                break;
            }
            i = store[i][t[j] - 'a'] + 1;
            j++;
        }

        return m - j;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {number}
     */
    appendCharacters(s, t) {
        const n = s.length,
            m = t.length;
        const store = Array.from({ length: n }, () => Array(26).fill(n + 1));
        store[n - 1][s.charCodeAt(n - 1) - 97] = n - 1;

        for (let i = n - 2; i >= 0; i--) {
            store[i] = store[i + 1].slice();
            store[i][s.charCodeAt(i) - 97] = i;
        }

        let i = 0,
            j = 0;
        while (i < n && j < m) {
            if (store[i][t.charCodeAt(j) - 97] === n + 1) {
                break;
            }
            i = store[i][t.charCodeAt(j) - 97] + 1;
            j++;
        }

        return m - j;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n)$

> Where $n$ and $m$ are the lengths of the strings $s$ and $t$, respectively.
