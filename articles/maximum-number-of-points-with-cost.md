## 1. Recursion

::tabs-start

```python
class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        m, n = len(points), len(points[0])

        def dfs(r, c):
            if r == m - 1:
                return 0

            res = 0
            for col in range(n):
                res = max(res, points[r + 1][col] - abs(col - c) + dfs(r + 1, col))
            return res

        ans = 0
        for c in range(n):
            ans = max(ans, points[0][c] + dfs(0, c))
        return ans
```

```java
public class Solution {
    int m, n;
    int[][] points;

    long dfs(int r, int c) {
        if (r == m - 1) return 0;
        long res = 0;
        for (int col = 0; col < n; col++) {
            res = Math.max(res, points[r + 1][col] - Math.abs(col - c) + dfs(r + 1, col));
        }
        return res;
    }

    public long maxPoints(int[][] points) {
        this.m = points.length;
        this.n = points[0].length;
        this.points = points;
        long ans = 0;
        for (int c = 0; c < n; c++) {
            ans = Math.max(ans, points[0][c] + dfs(0, c));
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    int m, n;
    vector<vector<int>> points;

    long long dfs(int r, int c) {
        if (r == m - 1) return 0;
        long long res = 0;
        for (int col = 0; col < n; col++) {
            res = max(res, points[r + 1][col] - abs(col - c) + dfs(r + 1, col));
        }
        return res;
    }

    long long maxPoints(vector<vector<int>>& points) {
        this->points = points;
        m = points.size();
        n = points[0].size();
        long long ans = 0;
        for (int c = 0; c < n; c++) {
            ans = max(ans, points[0][c] + dfs(0, c));
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    maxPoints(points) {
        let m = points.length, n = points[0].length;

        function dfs(r, c) {
            if (r === m - 1) return 0;
            let res = 0;
            for (let col = 0; col < n; col++) {
                res = Math.max(res, points[r + 1][col] - Math.abs(col - c) + dfs(r + 1, col));
            }
            return res;
        }

        let ans = 0;
        for (let c = 0; c < n; c++) {
            ans = Math.max(ans, points[0][c] + dfs(0, c));
        }
        return ans;
    }
}
```

```csharp
public class Solution {
    int m, n;
    int[][] points;

    long Dfs(int r, int c) {
        if (r == m - 1) return 0;
        long res = 0;
        for (int col = 0; col < n; col++) {
            res = Math.Max(res, points[r + 1][col] - Math.Abs(col - c) + Dfs(r + 1, col));
        }
        return res;
    }

    public long MaxPoints(int[][] points) {
        this.points = points;
        m = points.Length;
        n = points[0].Length;
        long ans = 0;
        for (int c = 0; c < n; c++) {
            ans = Math.Max(ans, points[0][c] + Dfs(0, c));
        }
        return ans;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ m)$
* Space complexity: $O(m)$ for recursion stack.

> Where $m$ is the number of rows, and $n$ is the number of columns.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        m, n = len(points), len(points[0])
        memo = {}

        def dfs(r, c):
            if (r, c) in memo:
                return memo[(r, c)]
            if r == m - 1:
                return 0

            res = 0
            for col in range(n):
                res = max(res, points[r + 1][col] - abs(col - c) + dfs(r + 1, col))

            memo[(r, c)] = res
            return res

        ans = 0
        for c in range(n):
            ans = max(ans, points[0][c] + dfs(0, c))
        return ans
```

```java
class Solution {
    int m, n;
    int[][] points;
    Long[][] memo;

    long dfs(int r, int c) {
        if (memo[r][c] != null) return memo[r][c];
        if (r == m - 1) return 0;

        long res = 0;
        for (int col = 0; col < n; col++) {
            res = Math.max(res, points[r + 1][col] - Math.abs(col - c) + dfs(r + 1, col));
        }
        return memo[r][c] = res;
    }

    public long maxPoints(int[][] points) {
        this.points = points;
        m = points.length;
        n = points[0].length;
        memo = new Long[m][n];
        long ans = 0;
        for (int c = 0; c < n; c++) {
            ans = Math.max(ans, points[0][c] + dfs(0, c));
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    int m, n;
    vector<vector<int>> points;
    vector<vector<long long>> memo;

    long long dfs(int r, int c) {
        if (memo[r][c] != -1) return memo[r][c];
        if (r == m - 1) return 0;

        long long res = 0;
        for (int col = 0; col < n; col++) {
            res = max(res, (long long)points[r + 1][col] - abs(col - c) + dfs(r + 1, col));
        }
        return memo[r][c] = res;
    }

    long long maxPoints(vector<vector<int>>& points) {
        this->points = points;
        m = points.size();
        n = points[0].size();
        memo.assign(m, vector<long long>(n, -1));
        long long ans = 0;
        for (int c = 0; c < n; c++) {
            ans = max(ans, (long long)points[0][c] + dfs(0, c));
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    maxPoints(points) {
        let m = points.length, n = points[0].length;
        let memo = {};

        function dfs(r, c) {
            let key = r + "," + c;
            if (key in memo) return memo[key];
            if (r === m - 1) return 0;

            let res = 0;
            for (let col = 0; col < n; col++) {
                res = Math.max(res, points[r + 1][col] - Math.abs(col - c) + dfs(r + 1, col));
            }
            return memo[key] = res;
        }

        let ans = 0;
        for (let c = 0; c < n; c++) {
            ans = Math.max(ans, points[0][c] + dfs(0, c));
        }
        return ans;
    }
}
```

```csharp
public class Solution {
    int m, n;
    int[][] points;
    long[,] memo;

    long Dfs(int r, int c) {
        if (memo[r, c] != -1) return memo[r, c];
        if (r == m - 1) return 0;

        long res = 0;
        for (int col = 0; col < n; col++) {
            res = Math.Max(res, points[r + 1][col] - Math.Abs(col - c) + Dfs(r + 1, col));
        }
        memo[r, c] = res;
        return res;
    }

    public long MaxPoints(int[][] points) {
        this.points = points;
        m = points.Length;
        n = points[0].Length;
        memo = new long[m, n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                memo[i, j] = -1;
            }
        }
        long ans = 0;
        for (int c = 0; c < n; c++) {
            ans = Math.Max(ans, points[0][c] + Dfs(0, c));
        }
        return ans;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n ^ 2)$
* Space complexity: $O(n)$

> Where $m$ is the number of rows, and $n$ is the number of columns.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        ROWS, COLS = len(points), len(points[0])
        dp = points[0]

        for r in range(1, ROWS):
            left = [0] * COLS
            left[0] = dp[0]
            for c in range(1, COLS):
                left[c] = max(dp[c], left[c - 1] - 1)

            right = [0] * COLS
            right[COLS - 1] = dp[COLS - 1]
            for c in range(COLS - 2, -1, -1):
                right[c] = max(dp[c], right[c + 1] - 1)

            nextDp = points[r][:]
            for c in range(COLS):
                nextDp[c] += max(left[c], right[c])

            dp = nextDp

        return max(dp)
```

```java
public class Solution {
    public long maxPoints(int[][] points) {
        int ROWS = points.length, COLS = points[0].length;
        long[] dp = new long[COLS];
        for (int c = 0; c < COLS; c++) dp[c] = points[0][c];

        for (int r = 1; r < ROWS; r++) {
            long[] left = new long[COLS];
            left[0] = dp[0];
            for (int c = 1; c < COLS; c++)
                left[c] = Math.max(dp[c], left[c - 1] - 1);

            long[] right = new long[COLS];
            right[COLS - 1] = dp[COLS - 1];
            for (int c = COLS - 2; c >= 0; c--)
                right[c] = Math.max(dp[c], right[c + 1] - 1);

            long[] nextDp = new long[COLS];
            for (int c = 0; c < COLS; c++)
                nextDp[c] = points[r][c] + Math.max(left[c], right[c]);

            dp = nextDp;
        }

        long ans = 0;
        for (long val : dp) ans = Math.max(ans, val);
        return ans;
    }
}
```

```cpp
class Solution {
public:
    long long maxPoints(vector<vector<int>>& points) {
        int ROWS = points.size(), COLS = points[0].size();
        vector<long long> dp(points[0].begin(), points[0].end());

        for (int r = 1; r < ROWS; r++) {
            vector<long long> left(COLS), right(COLS);
            left[0] = dp[0];
            for (int c = 1; c < COLS; c++)
                left[c] = max(dp[c], left[c - 1] - 1);

            right[COLS - 1] = dp[COLS - 1];
            for (int c = COLS - 2; c >= 0; c--)
                right[c] = max(dp[c], right[c + 1] - 1);

            vector<long long> nextDp(COLS);
            for (int c = 0; c < COLS; c++)
                nextDp[c] = points[r][c] + max(left[c], right[c]);

            dp = move(nextDp);
        }

        return *max_element(dp.begin(), dp.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    maxPoints(points) {
        let ROWS = points.length, COLS = points[0].length;
        let dp = [...points[0]];

        for (let r = 1; r < ROWS; r++) {
            let left = Array(COLS).fill(0);
            left[0] = dp[0];
            for (let c = 1; c < COLS; c++)
                left[c] = Math.max(dp[c], left[c - 1] - 1);

            let right = Array(COLS).fill(0);
            right[COLS - 1] = dp[COLS - 1];
            for (let c = COLS - 2; c >= 0; c--)
                right[c] = Math.max(dp[c], right[c + 1] - 1);

            let nextDp = [...points[r]];
            for (let c = 0; c < COLS; c++)
                nextDp[c] += Math.max(left[c], right[c]);

            dp = nextDp;
        }

        return Math.max(...dp);
    }
}
```

```csharp
public class Solution {
    public long MaxPoints(int[][] points) {
        int ROWS = points.Length, COLS = points[0].Length;
        long[] dp = new long[COLS];
        for (int c = 0; c < COLS; c++) dp[c] = points[0][c];

        for (int r = 1; r < ROWS; r++) {
            long[] left = new long[COLS];
            left[0] = dp[0];
            for (int c = 1; c < COLS; c++)
                left[c] = Math.Max(dp[c], left[c - 1] - 1);

            long[] right = new long[COLS];
            right[COLS - 1] = dp[COLS - 1];
            for (int c = COLS - 2; c >= 0; c--)
                right[c] = Math.Max(dp[c], right[c + 1] - 1);

            long[] nextDp = new long[COLS];
            for (int c = 0; c < COLS; c++)
                nextDp[c] = points[r][c] + Math.Max(left[c], right[c]);

            dp = nextDp;
        }

        long ans = 0;
        foreach (long val in dp) ans = Math.Max(ans, val);
        return ans;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(n)$

> Where $m$ is the number of rows, and $n$ is the number of columns.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        ROWS, COLS = len(points), len(points[0])
        prev = points[0]

        for r in range(1, ROWS):
            cur = [0] * COLS
            cur[0] = prev[0]
            for c in range(1, COLS):
                cur[c] = max(prev[c], cur[c - 1] - 1)

            rightMax = prev[COLS - 1]
            for c in range(COLS - 2, -1 , -1):
                rightMax = max(prev[c], rightMax - 1)
                cur[c] = max(cur[c], rightMax) + points[r][c]

            cur[COLS - 1] += points[r][COLS - 1]
            prev = cur

        return max(prev)
```

```java
public class Solution {
    public long maxPoints(int[][] points) {
        int rows = points.length, cols = points[0].length;
        long[] prev = new long[cols];
        for (int c = 0; c < cols; c++) prev[c] = points[0][c];

        for (int r = 1; r < rows; r++) {
            long[] cur = new long[cols];
            cur[0] = prev[0];
            for (int c = 1; c < cols; c++)
                cur[c] = Math.max(prev[c], cur[c - 1] - 1);

            long rightMax = prev[cols - 1];
            for (int c = cols - 2; c >= 0; c--) {
                rightMax = Math.max(prev[c], rightMax - 1);
                cur[c] = Math.max(cur[c], rightMax) + points[r][c];
            }
            cur[cols - 1] += points[r][cols - 1];
            prev = cur;
        }

        long ans = 0;
        for (long val : prev) ans = Math.max(ans, val);
        return ans;
    }
}
```

```cpp
class Solution {
public:
    long long maxPoints(vector<vector<int>>& points) {
        int rows = points.size(), cols = points[0].size();
        vector<long long> prev(cols);
        for (int c = 0; c < cols; c++) prev[c] = points[0][c];

        for (int r = 1; r < rows; r++) {
            vector<long long> cur(cols);
            cur[0] = prev[0];
            for (int c = 1; c < cols; c++)
                cur[c] = max(prev[c], cur[c - 1] - 1);

            long long rightMax = prev[cols - 1];
            for (int c = cols - 2; c >= 0; c--) {
                rightMax = max(prev[c], rightMax - 1);
                cur[c] = max(cur[c], rightMax) + points[r][c];
            }
            cur[cols - 1] += points[r][cols - 1];
            prev = cur;
        }
        return *max_element(prev.begin(), prev.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    maxPoints(points) {
        let rows = points.length, cols = points[0].length;
        let prev = points[0].map(v => v);

        for (let r = 1; r < rows; r++) {
            let cur = Array(cols).fill(0);
            cur[0] = prev[0];
            for (let c = 1; c < cols; c++)
                cur[c] = Math.max(prev[c], cur[c - 1] - 1);

            let rightMax = prev[cols - 1];
            for (let c = cols - 2; c >= 0; c--) {
                rightMax = Math.max(prev[c], rightMax - 1);
                cur[c] = Math.max(cur[c], rightMax) + points[r][c];
            }
            cur[cols - 1] += points[r][cols - 1];
            prev = cur;
        }
        return Math.max(...prev);
    }
}
```

```csharp
public class Solution {
    public long MaxPoints(int[][] points) {
        int rows = points.Length, cols = points[0].Length;
        long[] prev = new long[cols];
        for (int c = 0; c < cols; c++) prev[c] = points[0][c];

        for (int r = 1; r < rows; r++) {
            long[] cur = new long[cols];
            cur[0] = prev[0];
            for (int c = 1; c < cols; c++)
                cur[c] = Math.Max(prev[c], cur[c - 1] - 1);

            long rightMax = prev[cols - 1];
            for (int c = cols - 2; c >= 0; c--) {
                rightMax = Math.Max(prev[c], rightMax - 1);
                cur[c] = Math.Max(cur[c], rightMax) + points[r][c];
            }
            cur[cols - 1] += points[r][cols - 1];
            prev = cur;
        }
        long ans = long.MinValue;
        foreach (long val in prev) ans = Math.Max(ans, val);
        return ans;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(n)$

> Where $m$ is the number of rows, and $n$ is the number of columns.