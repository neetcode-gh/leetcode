## 1. Dynamic Programming (Top Down)

::tabs-start

```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        dp = [[-1] * n for _ in range(n)]

        def dfs(i, j):
            if i < 0 or j == n:
                return 0
            if dp[i][j] != -1:
                return dp[i][j]

            if s[i] == s[j]:
                length = 1 if i == j else 2
                dp[i][j] = length + dfs(i - 1, j + 1)
            else:
                dp[i][j] = max(dfs(i - 1, j), dfs(i, j + 1))

            return dp[i][j]

        for i in range(n):
            dfs(i, i)  # odd length
            dfs(i, i + 1)  # even length

        return max(max(row) for row in dp if row != -1)
```

```java
public class Solution {
    private int[][] dp;

    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        dp = new int[n][n];

        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }

        for (int i = 0; i < n; i++) {
            dfs(i, i, s);       // Odd length
            dfs(i, i + 1, s);   // Even length
        }

        int maxLength = 0;
        for (int[] row : dp) {
            for (int val : row) {
                maxLength = Math.max(maxLength, val);
            }
        }

        return maxLength;
    }

    private int dfs(int i, int j, String s) {
        if (i < 0 || j == s.length()) {
            return 0;
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }

        if (s.charAt(i) == s.charAt(j)) {
            int length = (i == j) ? 1 : 2;
            dp[i][j] = length + dfs(i - 1, j + 1, s);
        } else {
            dp[i][j] = Math.max(dfs(i - 1, j, s), dfs(i, j + 1, s));
        }

        return dp[i][j];
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    int longestPalindromeSubseq(string s) {
        int n = s.size();
        dp.resize(n, vector<int>(n, -1));

        for (int i = 0; i < n; i++) {
            dfs(i, i, s);       // Odd length
            dfs(i, i + 1, s);   // Even length
        }

        int maxLength = 0;
        for (const auto& row : dp) {
            for (int val : row) {
                maxLength = max(maxLength, val);
            }
        }

        return maxLength;
    }

private:
    int dfs(int i, int j, const string& s) {
        if (i < 0 || j == s.size()) {
            return 0;
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }

        if (s[i] == s[j]) {
            int length = (i == j) ? 1 : 2;
            dp[i][j] = length + dfs(i - 1, j + 1, s);
        } else {
            dp[i][j] = max(dfs(i - 1, j, s), dfs(i, j + 1, s));
        }

        return dp[i][j];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindromeSubseq(s) {
        const n = s.length;
        const dp = Array.from({ length: n }, () => Array(n).fill(-1));

        const dfs = (i, j) => {
            if (i < 0 || j === n) {
                return 0;
            }
            if (dp[i][j] !== -1) {
                return dp[i][j];
            }

            if (s[i] === s[j]) {
                const length = i === j ? 1 : 2;
                dp[i][j] = length + dfs(i - 1, j + 1);
            } else {
                dp[i][j] = Math.max(dfs(i - 1, j), dfs(i, j + 1));
            }

            return dp[i][j];
        };

        for (let i = 0; i < n; i++) {
            dfs(i, i); // Odd length
            dfs(i, i + 1); // Even length
        }

        let maxLength = 0;
        for (const row of dp) {
            for (const val of row) {
                maxLength = Math.max(maxLength, val);
            }
        }

        return maxLength;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 2. Dynamic Programming (Top-Down Optimized)

::tabs-start

```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        cache = {}

        def dfs(i, j):
            if i > j:
                return 0
            if i == j:
                return 1
            if (i, j) in cache:
                return cache[(i, j)]

            if s[i] == s[j]:
                cache[(i, j)] = dfs(i + 1, j - 1) + 2
            else:
                cache[(i, j)] = max(dfs(i + 1, j), dfs(i, j - 1))

            return cache[(i, j)]

        return dfs(0, len(s) - 1)
```

```java
public class Solution {
    private int[][] dp;

    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        dp = new int[n][n];

        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }

        return dfs(0, n - 1, s);
    }

    private int dfs(int i, int j, String s) {
        if (i > j) {
            return 0;
        }
        if (i == j) {
            return 1;
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }

        if (s.charAt(i) == s.charAt(j)) {
            dp[i][j] = dfs(i + 1, j - 1, s) + 2;
        } else {
            dp[i][j] = Math.max(dfs(i + 1, j, s), dfs(i, j - 1, s));
        }

        return dp[i][j];
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    int longestPalindromeSubseq(string s) {
        int n = s.size();
        dp.resize(n, vector<int>(n, -1));
        return dfs(0, n - 1, s);
    }

private:
    int dfs(int i, int j, const string& s) {
        if (i > j) {
            return 0;
        }
        if (i == j) {
            return 1;
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }

        if (s[i] == s[j]) {
            dp[i][j] = dfs(i + 1, j - 1, s) + 2;
        } else {
            dp[i][j] = max(dfs(i + 1, j, s), dfs(i, j - 1, s));
        }

        return dp[i][j];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindromeSubseq(s) {
        const n = s.length;
        const dp = Array.from({ length: n }, () => Array(n).fill(-1));

        const dfs = (i, j) => {
            if (i > j) {
                return 0;
            }
            if (i === j) {
                return 1;
            }
            if (dp[i][j] !== -1) {
                return dp[i][j];
            }

            if (s[i] === s[j]) {
                dp[i][j] = dfs(i + 1, j - 1) + 2;
            } else {
                dp[i][j] = Math.max(dfs(i + 1, j), dfs(i, j - 1));
            }

            return dp[i][j];
        };

        return dfs(0, n - 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Using LCS Idea)

::tabs-start

```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        return self.longestCommonSubsequence(s, s[::-1])

    def longestCommonSubsequence(self, s1: str, s2: str) -> int:
        N, M = len(s1), len(s2)
        dp = [[0] * (M + 1) for _ in range(N + 1)]

        for i in range(N):
            for j in range(M):
                if s1[i] == s2[j]:
                    dp[i + 1][j + 1] = 1 + dp[i][j]
                else:
                    dp[i + 1][j + 1] = max(dp[i + 1][j], dp[i][j + 1])

        return dp[N][M]
```

```java
public class Solution {
    public int longestPalindromeSubseq(String s) {
        return longestCommonSubsequence(s, new StringBuilder(s).reverse().toString());
    }

    public int longestCommonSubsequence(String s1, String s2) {
        int N = s1.length(), M = s2.length();
        int[][] dp = new int[N + 1][M + 1];

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (s1.charAt(i) == s2.charAt(j)) {
                    dp[i + 1][j + 1] = 1 + dp[i][j];
                } else {
                    dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
        }

        return dp[N][M];
    }
}
```

```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        string reversedS = s;
        reverse(reversedS.begin(), reversedS.end());
        return longestCommonSubsequence(s, reversedS);
    }

    int longestCommonSubsequence(const string& s1, const string& s2) {
        int N = s1.size(), M = s2.size();
        vector<vector<int>> dp(N + 1, vector<int>(M + 1, 0));

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (s1[i] == s2[j]) {
                    dp[i + 1][j + 1] = 1 + dp[i][j];
                } else {
                    dp[i + 1][j + 1] = max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
        }

        return dp[N][M];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindromeSubseq(s) {
        return this.longestCommonSubsequence(s, s.split('').reverse().join(''));
    }

    /**
     * @param {string} s1
     * @param {string} s2
     * @return {number}
     */
    longestCommonSubsequence(s1, s2) {
        const N = s1.length,
            M = s2.length;
        const dp = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                if (s1[i] === s2[j]) {
                    dp[i + 1][j + 1] = 1 + dp[i][j];
                } else {
                    dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
        }

        return dp[N][M];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        dp = [0] * n

        for i in range(n - 1, -1, -1):
            dp[i] = 1
            prev = 0
            for j in range(i + 1, n):
                temp = dp[j]

                if s[i] == s[j]:
                    dp[j] = prev + 2
                else:
                    dp[j] = max(dp[j], dp[j - 1])

                prev = temp

        return dp[n - 1]
```

```java
public class Solution {
    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        int[] dp = new int[n];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = 1;
            int prev = 0;
            for (int j = i + 1; j < n; j++) {
                int temp = dp[j];

                if (s.charAt(i) == s.charAt(j)) {
                    dp[j] = prev + 2;
                } else {
                    dp[j] = Math.max(dp[j], dp[j - 1]);
                }
                prev = temp;
            }
        }

        return dp[n - 1];
    }
}
```

```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        int n = s.size();
        vector<int> dp(n, 0);

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = 1;
            int prev = 0;
            for (int j = i + 1; j < n; j++) {
                int temp = dp[j];

                if (s[i] == s[j]) {
                    dp[j] = prev + 2;
                } else {
                    dp[j] = max(dp[j], dp[j - 1]);
                }

                prev = temp;
            }
        }

        return dp[n - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindromeSubseq(s) {
        const n = s.length;
        const dp = new Array(n).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            dp[i] = 1;
            let prev = 0;
            for (let j = i + 1; j < n; j++) {
                const temp = dp[j];

                if (s[i] === s[j]) {
                    dp[j] = prev + 2;
                } else {
                    dp[j] = Math.max(dp[j], dp[j - 1]);
                }

                prev = temp;
            }
        }

        return dp[n - 1];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$
