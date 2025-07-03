## 1. Brute Force

::tabs-start

```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        m, n = len(matrix), len(matrix[0])
        res = 0

        for r in range(m):
            for c in range(n):
                if matrix[r][c] == "0":
                    continue
                k = 1
                while True:
                    if r + k > m or c + k > n:
                        break
                    flag = True

                    for i in range(r, r + k):
                        if matrix[i][c + k - 1] == "0":
                            flag = False
                            break
                    for j in range(c, c + k):
                        if matrix[r + k - 1][j] == "0":
                            flag = False
                            break

                    if not flag:
                        break
                    res = max(res, k * k)
                    k += 1

        return res
```

```java
public class Solution {
    public int maximalSquare(char[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int res = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (matrix[r][c] == '0') {
                    continue;
                }
                int k = 1;
                while (true) {
                    if (r + k > m || c + k > n) {
                        break;
                    }
                    boolean flag = true;

                    for (int i = r; i < r + k; i++) {
                        if (matrix[i][c + k - 1] == '0') {
                            flag = false;
                            break;
                        }
                    }
                    for (int j = c; j < c + k; j++) {
                        if (matrix[r + k - 1][j] == '0') {
                            flag = false;
                            break;
                        }
                    }

                    if (!flag) {
                        break;
                    }
                    res = Math.max(res, k * k);
                    k++;
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
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        int res = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (matrix[r][c] == '0') {
                    continue;
                }
                int k = 1;
                while (true) {
                    if (r + k > m || c + k > n) {
                        break;
                    }
                    bool flag = true;

                    for (int i = r; i < r + k; i++) {
                        if (matrix[i][c + k - 1] == '0') {
                            flag = false;
                            break;
                        }
                    }
                    for (int j = c; j < c + k; j++) {
                        if (matrix[r + k - 1][j] == '0') {
                            flag = false;
                            break;
                        }
                    }

                    if (!flag) {
                        break;
                    }
                    res = max(res, k * k);
                    k++;
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
     * @param {character[][]} matrix
     * @return {number}
     */
    maximalSquare(matrix) {
        const m = matrix.length,
            n = matrix[0].length;
        let res = 0;

        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                if (matrix[r][c] === '0') {
                    continue;
                }
                let k = 1;
                while (true) {
                    if (r + k > m || c + k > n) {
                        break;
                    }
                    let flag = true;

                    for (let i = r; i < r + k; i++) {
                        if (matrix[i][c + k - 1] === '0') {
                            flag = false;
                            break;
                        }
                    }
                    for (let j = c; j < c + k; j++) {
                        if (matrix[r + k - 1][j] === '0') {
                            flag = false;
                            break;
                        }
                    }

                    if (!flag) {
                        break;
                    }
                    res = Math.max(res, k * k);
                    k++;
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((m * n) ^ 2)$
- Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number columns.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        cache = {}

        def dfs(r, c):
            if r >= ROWS or c >= COLS:
                return 0
            if (r, c) not in cache:
                down = dfs(r + 1, c)
                right = dfs(r, c + 1)
                diag = dfs(r + 1, c + 1)
                cache[(r, c)] = 0
                if matrix[r][c] == "1":
                    cache[(r, c)] = 1 + min(down, right, diag)
            return cache[(r, c)]

        dfs(0, 0)
        return max(cache.values()) ** 2
```

```java
public class Solution {
    private int[][] dp;

    public int maximalSquare(char[][] matrix) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        dp = new int[ROWS][COLS];
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                dp[i][j] = -1;
            }
        }

        dfs(0, 0, matrix);
        int maxSquare = 0;
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                maxSquare = Math.max(maxSquare, dp[i][j]);
            }
        }
        return maxSquare * maxSquare;
    }

    private int dfs(int r, int c, char[][] matrix) {
        if (r >= matrix.length || c >= matrix[0].length) {
            return 0;
        }
        if (dp[r][c] != -1) {
            return dp[r][c];
        }
        int down = dfs(r + 1, c, matrix);
        int right = dfs(r, c + 1, matrix);
        int diag = dfs(r + 1, c + 1, matrix);
        dp[r][c] = 0;
        if (matrix[r][c] == '1') {
            dp[r][c] = 1 + Math.min(down, Math.min(right, diag));
        }
        return dp[r][c];
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        dp = vector<vector<int>>(ROWS, vector<int>(COLS, -1));

        dfs(0, 0, matrix);
        int maxSquare = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                maxSquare = max(maxSquare, dp[r][c]);
            }
        }
        return maxSquare * maxSquare;
    }

    int dfs(int r, int c, vector<vector<char>>& matrix) {
        if (r >= matrix.size() || c >= matrix[0].size()) {
            return 0;
        }
        if (dp[r][c] != -1) {
            return dp[r][c];
        }
        int down = dfs(r + 1, c, matrix);
        int right = dfs(r, c + 1, matrix);
        int diag = dfs(r + 1, c + 1, matrix);
        dp[r][c] = 0;
        if (matrix[r][c] == '1') {
            dp[r][c] = 1 + min(down, min(right, diag));
        }
        return dp[r][c];
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} matrix
     * @return {number}
     */
    maximalSquare(matrix) {
        const ROWS = matrix.length,
            COLS = matrix[0].length;
        const dp = Array.from({ length: ROWS }, () => Array(COLS).fill(-1));

        const dfs = (r, c) => {
            if (r >= ROWS || c >= COLS) {
                return 0;
            }
            if (dp[r][c] !== -1) {
                return dp[r][c];
            }
            const down = dfs(r + 1, c);
            const right = dfs(r, c + 1);
            const diag = dfs(r + 1, c + 1);
            dp[r][c] = 0;
            if (matrix[r][c] === '1') {
                dp[r][c] = 1 + Math.min(down, Math.min(right, diag));
            }
            return dp[r][c];
        };

        dfs(0, 0);
        let maxSquare = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                maxSquare = Math.max(maxSquare, dp[r][c]);
            }
        }
        return maxSquare * maxSquare;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number columns.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        m, n = len(matrix), len(matrix[0])
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        max_square = 0

        for r in range(m - 1, -1, -1):
            for c in range(n - 1, -1, -1):
                if matrix[r][c] == "1":
                    dp[r][c] = 1 + min(dp[r + 1][c], dp[r][c + 1], dp[r + 1][c + 1])
                    max_square = max(max_square, dp[r][c])

        return max_square * max_square
```

```java
public class Solution {
    public int maximalSquare(char[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int[][] dp = new int[m + 1][n + 1];
        int maxSquare = 0;

        for (int r = m - 1; r >= 0; r--) {
            for (int c = n - 1; c >= 0; c--) {
                if (matrix[r][c] == '1') {
                    dp[r][c] = 1 + Math.min(dp[r + 1][c], Math.min(dp[r][c + 1], dp[r + 1][c + 1]));
                    maxSquare = Math.max(maxSquare, dp[r][c]);
                }
            }
        }

        return maxSquare * maxSquare;
    }
}
```

```cpp
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        int maxSquare = 0;

        for (int r = m - 1; r >= 0; r--) {
            for (int c = n - 1; c >= 0; c--) {
                if (matrix[r][c] == '1') {
                    dp[r][c] = 1 + min({dp[r + 1][c], dp[r][c + 1], dp[r + 1][c + 1]});
                    maxSquare = max(maxSquare, dp[r][c]);
                }
            }
        }

        return maxSquare * maxSquare;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} matrix
     * @return {number}
     */
    maximalSquare(matrix) {
        const m = matrix.length,
            n = matrix[0].length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
        let maxSquare = 0;

        for (let r = m - 1; r >= 0; r--) {
            for (let c = n - 1; c >= 0; c--) {
                if (matrix[r][c] === '1') {
                    dp[r][c] =
                        1 +
                        Math.min(dp[r + 1][c], dp[r][c + 1], dp[r + 1][c + 1]);
                    maxSquare = Math.max(maxSquare, dp[r][c]);
                }
            }
        }

        return maxSquare * maxSquare;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number columns.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        m, n = len(matrix), len(matrix[0])
        dp = [0] * (n + 1)
        max_square = 0

        for r in range(m - 1, -1, -1):
            prev = 0
            for c in range(n - 1, -1, -1):
                temp = dp[c]
                if matrix[r][c] == "1":
                    dp[c] = 1 + min(dp[c], dp[c + 1], prev)
                    max_square = max(max_square, dp[c])
                else:
                    dp[c] = 0
                prev = temp

        return max_square * max_square
```

```java
public class Solution {
    public int maximalSquare(char[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int[] dp = new int[n + 1];
        int maxSquare = 0;

        for (int r = m - 1; r >= 0; r--) {
            int prev = 0;
            for (int c = n - 1; c >= 0; c--) {
                int temp = dp[c];
                if (matrix[r][c] == '1') {
                    dp[c] = 1 + Math.min(dp[c], Math.min(dp[c + 1], prev));
                    maxSquare = Math.max(maxSquare, dp[c]);
                } else {
                    dp[c] = 0;
                }
                prev = temp;
            }
        }

        return maxSquare * maxSquare;
    }
}
```

```cpp
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<int> dp(n + 1, 0);
        int maxSquare = 0;

        for (int r = m - 1; r >= 0; r--) {
            int prev = 0;
            for (int c = n - 1; c >= 0; c--) {
                int temp = dp[c];
                if (matrix[r][c] == '1') {
                    dp[c] = 1 + min({dp[c], dp[c + 1], prev});
                    maxSquare = max(maxSquare, dp[c]);
                } else {
                    dp[c] = 0;
                }
                prev = temp;
            }
        }

        return maxSquare * maxSquare;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} matrix
     * @return {number}
     */
    maximalSquare(matrix) {
        const m = matrix.length,
            n = matrix[0].length;
        const dp = new Array(n + 1).fill(0);
        let maxSquare = 0;
        let prev = 0;

        for (let r = m - 1; r >= 0; r--) {
            for (let c = n - 1; c >= 0; c--) {
                const temp = dp[c];
                if (matrix[r][c] === '1') {
                    dp[c] = 1 + Math.min(dp[c], dp[c + 1], prev);
                    maxSquare = Math.max(maxSquare, dp[c]);
                } else {
                    dp[c] = 0;
                }
                prev = temp;
            }
        }

        return maxSquare * maxSquare;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(n)$

> Where $m$ is the number of rows and $n$ is the number columns.
