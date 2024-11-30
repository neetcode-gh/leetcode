## 1. Recursion

::tabs-start

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        def rec(i, j):
            if i == len(s):
                return True
            if j == len(t):
                return False
            
            if s[i] == t[j]:
                return rec(i + 1, j + 1)
            return rec(i, j + 1)
        return rec(0, 0)
```

```java
public class Solution {
    public boolean isSubsequence(String s, String t) {
        return rec(s, t, 0, 0);
    }

    private boolean rec(String s, String t, int i, int j) {
        if (i == s.length()) return true;
        if (j == t.length()) return false;
        if (s.charAt(i) == t.charAt(j)) {
            return rec(s, t, i + 1, j + 1);
        }
        return rec(s, t, i, j + 1);
    }
}
```

```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        return rec(s, t, 0, 0);
    }

private:
    bool rec(string& s, string& t, int i, int j) {
        if (i == s.size()) return true;
        if (j == t.size()) return false;
        if (s[i] == t[j]) {
            return rec(s, t, i + 1, j + 1);
        }
        return rec(s, t, i, j + 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isSubsequence(s, t) {
        const rec = (i, j) => {
            if (i === s.length) return true;
            if (j === t.length) return false;
            if (s[i] === t[j]) return rec(i + 1, j + 1);
            return rec(i, j + 1);
        };
        return rec(0, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m)$
* Space complexity: $O(n)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        n, m = len(s), len(t)
        memo = [[-1] * m for _ in range(n)]

        def rec(i, j):
            if i == n:
                return True
            if j == m:
                return False
            if memo[i][j] != -1:
                return memo[i][j] == 1
            if s[i] == t[j]:
                memo[i][j] = 1 if rec(i + 1, j + 1) else 0
            else:
                memo[i][j] = 1 if rec(i, j + 1) else 0
            return memo[i][j] == 1

        return rec(0, 0)
```

```java
public class Solution {
    public boolean isSubsequence(String s, String t) {
        int n = s.length(), m = t.length();
        int[][] memo = new int[n][m];
        for (int[] row : memo) {
            Arrays.fill(row, -1);
        }
        return rec(s, t, 0, 0, memo);
    }

    private boolean rec(String s, String t, int i, int j, int[][] memo) {
        if (i == s.length()) return true;
        if (j == t.length()) return false;
        if (memo[i][j] != -1) return memo[i][j] == 1;
        if (s.charAt(i) == t.charAt(j)) {
            memo[i][j] = rec(s, t, i + 1, j + 1, memo) ? 1 : 0;
        } else {
            memo[i][j] = rec(s, t, i, j + 1, memo) ? 1 : 0;
        }
        return memo[i][j] == 1;
    }
}
```

```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int n = s.size(), m = t.size();
        vector<vector<int>> memo(n, vector<int>(m, -1));
        return rec(s, t, 0, 0, memo);
    }

private:
    bool rec(string& s, string& t, int i, int j, vector<vector<int>>& memo) {
        if (i == s.size()) return true;
        if (j == t.size()) return false;
        if (memo[i][j] != -1) return memo[i][j] == 1;
        if (s[i] == t[j]) {
            memo[i][j] = rec(s, t, i + 1, j + 1, memo) ? 1 : 0;
        } else {
            memo[i][j] = rec(s, t, i, j + 1, memo) ? 1 : 0;
        }
        return memo[i][j] == 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isSubsequence(s, t) {
        const n = s.length, m = t.length;
        const memo = Array.from({ length: n }, () => Array(m).fill(-1));

        const rec = (i, j) => {
            if (i === n) return true;
            if (j === m) return false;
            if (memo[i][j] !== -1) return memo[i][j] === 1;
            if (s[i] === t[j]) {
                memo[i][j] = rec(i + 1, j + 1) ? 1 : 0;
            } else {
                memo[i][j] = rec(i, j + 1) ? 1 : 0;
            }
            return memo[i][j] === 1;
        };

        return rec(0, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m)$
* Space complexity: $O(n * m)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        n, m = len(s), len(t)
        dp = [[False] * (m + 1) for _ in range(n + 1)]
        
        for j in range(m + 1):
            dp[n][j] = True
        
        for i in range(n - 1, -1, -1):
            for j in range(m - 1, -1, -1):
                if s[i] == t[j]:
                    dp[i][j] = dp[i + 1][j + 1]
                else:
                    dp[i][j] = dp[i][j + 1]
        
        return dp[0][0]
```

```java
public class Solution {
    public boolean isSubsequence(String s, String t) {
        int n = s.length(), m = t.length();
        boolean[][] dp = new boolean[n + 1][m + 1];
        
        for (int j = 0; j <= m; j++) {
            dp[n][j] = true;
        }
        
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                if (s.charAt(i) == t.charAt(j)) {
                    dp[i][j] = dp[i + 1][j + 1];
                } else {
                    dp[i][j] = dp[i][j + 1];
                }
            }
        }
        
        return dp[0][0];
    }
}
```

```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int n = s.size(), m = t.size();
        vector<vector<bool>> dp(n + 1, vector<bool>(m + 1, false));
        
        for (int j = 0; j <= m; ++j) {
            dp[n][j] = true;
        }
        
        for (int i = n - 1; i >= 0; --i) {
            for (int j = m - 1; j >= 0; --j) {
                if (s[i] == t[j]) {
                    dp[i][j] = dp[i + 1][j + 1];
                } else {
                    dp[i][j] = dp[i][j + 1];
                }
            }
        }
        
        return dp[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isSubsequence(s, t) {
        const n = s.length, m = t.length;
        const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(false));
        
        for (let j = 0; j <= m; j++) {
            dp[n][j] = true;
        }
        
        for (let i = n - 1; i >= 0; i--) {
            for (let j = m - 1; j >= 0; j--) {
                if (s[i] === t[j]) {
                    dp[i][j] = dp[i + 1][j + 1];
                } else {
                    dp[i][j] = dp[i][j + 1];
                }
            }
        }
        
        return dp[0][0];
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m)$
* Space complexity: $O(n * m)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.

---

## 4. Two Pointers

::tabs-start

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = j = 0
        while i < len(s) and j < len(t):
            if s[i] == t[j]:
                i += 1
            j += 1
        return i == len(s)
```

```java
public class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0, j = 0;
        while (i < s.length() && j < t.length()) {
            if (s.charAt(i) == t.charAt(j)) {
                i++;
            }
            j++;
        }
        return i == s.length();
    }
}
```

```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int i = 0, j = 0;
        while (i < s.length() && j < t.length()) {
            if (s[i] == t[j]) {
                i++;
            }
            j++;
        }
        return i == s.length();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isSubsequence(s, t) {
        let i = 0, j = 0;
        while (i < s.length && j < t.length) {
            if (s.charAt(i) == t.charAt(j)) {
                i++;
            }
            j++;
        }
        return i == s.length;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n + m)$
* Space complexity: $O(1)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.

## 5. Follow-Up Solution (Index Jumping)

::tabs-start

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        n, m = len(s), len(t)
        if m == 0:
            return n == 0
        
        store = [[m + 1] * 26 for _ in range(m)]
        store[m - 1][ord(t[m - 1]) - ord('a')] = m - 1
        
        for i in range(m - 2, -1, -1):
            store[i] = store[i + 1][:]
            store[i][ord(t[i]) - ord('a')] = i
        
        i, j = 0, 0
        while i < n and j < m:
            j = store[j][ord(s[i]) - ord('a')] + 1
            if j > m:
                return False
            i += 1
        
        return i == n
```

```java
public class Solution {
    public boolean isSubsequence(String s, String t) {
        int n = s.length(), m = t.length();
        if (m == 0) return n == 0;

        int[][] store = new int[m][26];
        for (int i = 0; i < m; i++) {
            Arrays.fill(store[i], m + 1);
        }

        store[m - 1][t.charAt(m - 1) - 'a'] = m - 1;

        for (int i = m - 2; i >= 0; i--) {
            store[i] = store[i + 1].clone();
            store[i][t.charAt(i) - 'a'] = i;
        }

        int i = 0, j = 0;
        while (i < n && j < m) {
            j = store[j][s.charAt(i) - 'a'] + 1;
            if (j > m) return false;
            i++;
        }
        
        return i == n;
    }
}
```

```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int n = s.length(), m = t.length();
        if (m == 0) return n == 0;

        vector<vector<int>> store(m, vector<int>(26, m + 1));
        store[m - 1][t[m - 1] - 'a'] = m - 1;
        
        for (int i = m - 2; i >= 0; i--) {
            store[i] = store[i + 1];
            store[i][t[i] - 'a'] = i;
        }

        int i = 0, j = 0;
        while (i < n && j < m) {
            j = store[j][s[i] - 'a'] + 1;
            if (j > m) return false;
            i++;
        }

        return i == n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isSubsequence(s, t) {
        const n = s.length, m = t.length;
        if (m === 0) return n === 0;

        const store = Array.from({ length: m }, () => Array(26).fill(m + 1));
        store[m - 1][t.charCodeAt(m - 1) - 'a'.charCodeAt(0)] = m - 1;

        for (let i = m - 2; i >= 0; i--) {
            store[i] = [...store[i + 1]];
            store[i][t.charCodeAt(i) - 'a'.charCodeAt(0)] = i;
        }

        let i = 0, j = 0;
        while (i < n && j < m) {
            j = store[j][s.charCodeAt(i) - 'a'.charCodeAt(0)] + 1;
            if (j > m) return false;
            i++;
        }

        return i === n;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n + m)$
* Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.