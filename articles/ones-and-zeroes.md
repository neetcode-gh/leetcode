## 1. Recursion

::tabs-start

```python
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        arr = [[0] * 2 for _ in range(len(strs))]
        for i, s in enumerate(strs):
            for c in s:
                arr[i][ord(c) - ord('0')] += 1

        def dfs(i, m, n):
            if i == len(strs):
                return 0

            res = dfs(i + 1, m, n)
            if m >= arr[i][0] and n >= arr[i][1]:
                res = max(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]))
            return res

        return dfs(0, m, n)
```

```java
public class Solution {
    public int findMaxForm(String[] strs, int m, int n) {
        int[][] arr = new int[strs.length][2];
        for (int i = 0; i < strs.length; i++) {
            for (char c : strs[i].toCharArray()) {
                arr[i][c - '0']++;
            }
        }

        return dfs(0, m, n, arr);
    }

    private int dfs(int i, int m, int n, int[][] arr) {
        if (i == arr.length) {
            return 0;
        }

        int res = dfs(i + 1, m, n, arr);
        if (m >= arr[i][0] && n >= arr[i][1]) {
            res = Math.max(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1], arr));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<vector<int>> arr(strs.size(), vector<int>(2));
        for (int i = 0; i < strs.size(); i++) {
            for (char c : strs[i]) {
                arr[i][c - '0']++;
            }
        }
        return dfs(0, m, n, arr);
    }

private:
    int dfs(int i, int m, int n, vector<vector<int>>& arr) {
        if (i == arr.size()) {
            return 0;
        }

        int res = dfs(i + 1, m, n, arr);
        if (m >= arr[i][0] && n >= arr[i][1]) {
            res = max(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1], arr));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    findMaxForm(strs, m, n) {
        const arr = Array.from({ length: strs.length }, () => [0, 0]);
        for (let i = 0; i < strs.length; i++) {
            for (const c of strs[i]) {
                arr[i][c - '0']++;
            }
        }

        const dfs = (i, m, n) => {
            if (i === strs.length) {
                return 0;
            }

            let res = dfs(i + 1, m, n);
            if (m >= arr[i][0] && n >= arr[i][1]) {
                res = Math.max(
                    res,
                    1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]),
                );
            }
            return res;
        };

        return dfs(0, m, n);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ N)$
- Space complexity: $O(N)$ for recursion stack.

> Where $N$ represents the number of binary strings, and $m$ and $n$ are the maximum allowable counts of zeros and ones, respectively.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        arr = [[0] * 2 for _ in range(len(strs))]
        for i, s in enumerate(strs):
            for c in s:
                arr[i][ord(c) - ord('0')] += 1

        dp = {}

        def dfs(i, m, n):
            if i == len(strs):
                return 0
            if m == 0 and n == 0:
                return 0
            if (i, m, n) in dp:
                return dp[(i, m, n)]

            res = dfs(i + 1, m, n)
            if m >= arr[i][0] and n >= arr[i][1]:
                res = max(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]))
            dp[(i, m, n)] = res
            return res

        return dfs(0, m, n)
```

```java
public class Solution {
    private int[][][] dp;
    private int[][] arr;

    public int findMaxForm(String[] strs, int m, int n) {
        arr = new int[strs.length][2];
        for (int i = 0; i < strs.length; i++) {
            for (char c : strs[i].toCharArray()) {
                arr[i][c - '0']++;
            }
        }

        dp = new int[strs.length][m + 1][n + 1];
        for (int i = 0; i < strs.length; i++) {
            for (int j = 0; j <= m; j++) {
                for (int k = 0; k <= n; k++) {
                    dp[i][j][k] = -1;
                }
            }
        }

        return dfs(0, m, n);
    }

    private int dfs(int i, int m, int n) {
        if (i == arr.length) {
            return 0;
        }
        if (m == 0 && n == 0) {
            return 0;
        }
        if (dp[i][m][n] != -1) {
            return dp[i][m][n];
        }

        int res = dfs(i + 1, m, n);
        if (m >= arr[i][0] && n >= arr[i][1]) {
            res = Math.max(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]));
        }
        dp[i][m][n] = res;
        return res;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<vector<int>>> dp;
    vector<vector<int>> arr;

public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        arr = vector<vector<int>>(strs.size(), vector<int>(2));
        for (int i = 0; i < strs.size(); i++) {
            for (char c : strs[i]) {
                arr[i][c - '0']++;
            }
        }

        dp = vector<vector<vector<int>>>(strs.size(), vector<vector<int>>(m + 1, vector<int>(n + 1, -1)));
        return dfs(0, m, n);
    }

private:
    int dfs(int i, int m, int n) {
        if (i == arr.size()) {
            return 0;
        }
        if (m == 0 && n == 0) {
            return 0;
        }
        if (dp[i][m][n] != -1) {
            return dp[i][m][n];
        }

        int res = dfs(i + 1, m, n);
        if (m >= arr[i][0] && n >= arr[i][1]) {
            res = max(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]));
        }
        dp[i][m][n] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    findMaxForm(strs, m, n) {
        const arr = Array.from({ length: strs.length }, () => [0, 0]);
        for (let i = 0; i < strs.length; i++) {
            for (const c of strs[i]) {
                arr[i][c - '0']++;
            }
        }

        const dp = Array.from({ length: strs.length }, () =>
            Array.from({ length: m + 1 }, () => Array(n + 1).fill(-1)),
        );

        const dfs = (i, m, n) => {
            if (i === strs.length) return 0;
            if (m === 0 && n === 0) return 0;
            if (dp[i][m][n] !== -1) return dp[i][m][n];

            let res = dfs(i + 1, m, n);
            if (m >= arr[i][0] && n >= arr[i][1]) {
                res = Math.max(
                    res,
                    1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]),
                );
            }
            dp[i][m][n] = res;
            return res;
        };

        return dfs(0, m, n);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * N)$
- Space complexity: $O(m * n * N)$

> Where $N$ represents the number of binary strings, and $m$ and $n$ are the maximum allowable counts of zeros and ones, respectively.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        arr = [[0] * 2 for _ in range(len(strs))]
        for i, s in enumerate(strs):
            for c in s:
                arr[i][ord(c) - ord('0')] += 1

        dp = [[[0] * (n + 1) for _ in range(m + 1)] for _ in range(len(strs) + 1)]

        for i in range(1, len(strs) + 1):
            for j in range(m + 1):
                for k in range(n + 1):
                    dp[i][j][k] = dp[i - 1][j][k]
                    if j >= arr[i - 1][0] and k >= arr[i - 1][1]:
                        dp[i][j][k] = max(dp[i][j][k], 1 + dp[i - 1][j - arr[i - 1][0]][k - arr[i - 1][1]])

        return dp[len(strs)][m][n]
```

```java
public class Solution {
    public int findMaxForm(String[] strs, int m, int n) {
        int[][] arr = new int[strs.length][2];
        for (int i = 0; i < strs.length; i++) {
            for (char c : strs[i].toCharArray()) {
                arr[i][c - '0']++;
            }
        }

        int[][][] dp = new int[strs.length + 1][m + 1][n + 1];

        for (int i = 1; i <= strs.length; i++) {
            for (int j = 0; j <= m; j++) {
                for (int k = 0; k <= n; k++) {
                    dp[i][j][k] = dp[i - 1][j][k];
                    if (j >= arr[i - 1][0] && k >= arr[i - 1][1]) {
                        dp[i][j][k] = Math.max(dp[i][j][k], 1 + dp[i - 1][j - arr[i - 1][0]][k - arr[i - 1][1]]);
                    }
                }
            }
        }

        return dp[strs.length][m][n];
    }
}
```

```cpp
class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<vector<int>> arr(strs.size(), vector<int>(2));
        for (int i = 0; i < strs.size(); i++) {
            for (char c : strs[i]) {
                arr[i][c - '0']++;
            }
        }

        vector<vector<vector<int>>> dp(strs.size() + 1, vector<vector<int>>(m + 1, vector<int>(n + 1, 0)));

        for (int i = 1; i <= strs.size(); i++) {
            for (int j = 0; j <= m; j++) {
                for (int k = 0; k <= n; k++) {
                    dp[i][j][k] = dp[i - 1][j][k];
                    if (j >= arr[i - 1][0] && k >= arr[i - 1][1]) {
                        dp[i][j][k] = max(dp[i][j][k], 1 + dp[i - 1][j - arr[i - 1][0]][k - arr[i - 1][1]]);
                    }
                }
            }
        }

        return dp[strs.size()][m][n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    findMaxForm(strs, m, n) {
        const arr = strs.map((s) => {
            const zeros = s.split('').filter((c) => c === '0').length;
            const ones = s.length - zeros;
            return [zeros, ones];
        });

        const dp = Array.from({ length: strs.length + 1 }, () =>
            Array.from({ length: m + 1 }, () => Array(n + 1).fill(0)),
        );

        for (let i = 1; i <= strs.length; i++) {
            for (let j = 0; j <= m; j++) {
                for (let k = 0; k <= n; k++) {
                    dp[i][j][k] = dp[i - 1][j][k];
                    if (j >= arr[i - 1][0] && k >= arr[i - 1][1]) {
                        dp[i][j][k] = Math.max(
                            dp[i][j][k],
                            1 + dp[i - 1][j - arr[i - 1][0]][k - arr[i - 1][1]],
                        );
                    }
                }
            }
        }

        return dp[strs.length][m][n];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * N)$
- Space complexity: $O(m * n * N)$

> Where $N$ represents the number of binary strings, and $m$ and $n$ are the maximum allowable counts of zeros and ones, respectively.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        arr = [[0, 0] for _ in range(len(strs))]
        for i, s in enumerate(strs):
            for c in s:
                arr[i][ord(c) - ord('0')] += 1

        dp = [[0] * (n + 1) for _ in range(m + 1)]

        for zeros, ones in arr:
            for j in range(m, zeros - 1, -1):
                for k in range(n, ones - 1, -1):
                    dp[j][k] = max(dp[j][k], 1 + dp[j - zeros][k - ones])

        return dp[m][n]
```

```java
public class Solution {
    public int findMaxForm(String[] strs, int m, int n) {
        int[][] arr = new int[strs.length][2];
        for (int i = 0; i < strs.length; i++) {
            for (char c : strs[i].toCharArray()) {
                arr[i][c - '0']++;
            }
        }

        int[][] dp = new int[m + 1][n + 1];

        for (int[] pair : arr) {
            int zeros = pair[0], ones = pair[1];
            for (int j = m; j >= zeros; j--) {
                for (int k = n; k >= ones; k--) {
                    dp[j][k] = Math.max(dp[j][k], 1 + dp[j - zeros][k - ones]);
                }
            }
        }

        return dp[m][n];
    }
}
```

```cpp
class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<vector<int>> arr(strs.size(), vector<int>(2));
        for (int i = 0; i < strs.size(); i++) {
            for (char c : strs[i]) {
                arr[i][c - '0']++;
            }
        }

        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

        for (const auto& pair : arr) {
            int zeros = pair[0], ones = pair[1];
            for (int j = m; j >= zeros; j--) {
                for (int k = n; k >= ones; k--) {
                    dp[j][k] = max(dp[j][k], 1 + dp[j - zeros][k - ones]);
                }
            }
        }

        return dp[m][n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    findMaxForm(strs, m, n) {
        const arr = Array.from({ length: strs.length }, () => [0, 0]);
        for (let i = 0; i < strs.length; i++) {
            for (const c of strs[i]) {
                arr[i][c - '0']++;
            }
        }

        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

        for (const [zeros, ones] of arr) {
            for (let j = m; j >= zeros; j--) {
                for (let k = n; k >= ones; k--) {
                    dp[j][k] = Math.max(dp[j][k], 1 + dp[j - zeros][k - ones]);
                }
            }
        }

        return dp[m][n];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * N)$
- Space complexity: $O(m * n + N)$

> Where $N$ represents the number of binary strings, and $m$ and $n$ are the maximum allowable counts of zeros and ones, respectively.
