## 1. Recursion

::tabs-start

```python
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        def dfs(r, c):
            if r == len(grid) - 1 and c == len(grid[0]) - 1:
                return grid[r][c]
            if r == len(grid) or c == len(grid[0]):
                return float('inf')
            return grid[r][c] + min(dfs(r + 1, c), dfs(r, c + 1))

        return dfs(0, 0)
```

```java
public class Solution {
    public int minPathSum(int[][] grid) {
        return dfs(0, 0, grid);
    }

    public int dfs(int r, int c, int[][] grid) {
        if (r == grid.length - 1 && c == grid[0].length - 1) {
            return grid[r][c];
        }
        if (r == grid.length || c == grid[0].length) {
            return Integer.MAX_VALUE;
        }
        return grid[r][c] + Math.min(dfs(r + 1, c, grid), dfs(r, c + 1, grid));
    }
}
```

```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        return dfs(0, 0, grid);
    }

    int dfs(int r, int c, vector<vector<int>>& grid) {
        if (r == grid.size() - 1 && c == grid[0].size() - 1) {
            return grid[r][c];
        }
        if (r == grid.size() || c == grid[0].size()) {
            return INT_MAX;
        }
        return grid[r][c] + min(dfs(r + 1, c, grid), dfs(r, c + 1, grid));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    minPathSum(grid) {
        const dfs = (r, c) => {
            if (r === grid.length - 1 && c === grid[0].length - 1) {
                return grid[r][c];
            }
            if (r === grid.length || c === grid[0].length) {
                return Infinity;
            }
            return grid[r][c] + Math.min(dfs(r + 1, c), dfs(r, c + 1));
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public int MinPathSum(int[][] grid) {
        return Dfs(0, 0, grid);
    }

    public int Dfs(int r, int c, int[][] grid) {
        int M = grid.Length, N = grid[0].Length;

        if (r == M - 1 && c == N - 1) {
            return grid[r][c];
        }
        if (r == M || c == N) {
            return int.MaxValue;
        }

        return grid[r][c] + Math.Min(Dfs(r + 1, c, grid), Dfs(r, c + 1, grid));
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ {m + n})$
- Space complexity: $O(m + n)$ for recursion stack.

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dp = [[-1] * n for _ in range(m)]

        def dfs(r, c):
            if r == m - 1 and c == n - 1:
                return grid[r][c]
            if r == m or c == n:
                return float('inf')
            if dp[r][c] != -1:
                return dp[r][c]

            dp[r][c] = grid[r][c] + min(dfs(r + 1, c), dfs(r, c + 1))
            return dp[r][c]

        return dfs(0, 0)
```

```java
public class Solution {
    private int[][] dp;

    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        dp = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dp[i][j] = -1;
            }
        }
        return dfs(0, 0, grid);
    }

    public int dfs(int r, int c, int[][] grid) {
        if (r == grid.length - 1 && c == grid[0].length - 1) {
            return grid[r][c];
        }
        if (r == grid.length || c == grid[0].length) {
            return Integer.MAX_VALUE;
        }
        if (dp[r][c] != -1) {
            return dp[r][c];
        }

        dp[r][c] = grid[r][c] + Math.min(dfs(r + 1, c, grid), dfs(r, c + 1, grid));
        return dp[r][c];
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        dp = vector<vector<int>>(m, vector<int>(n, -1));
        return dfs(0, 0, grid);
    }

    int dfs(int r, int c, vector<vector<int>>& grid) {
        if (r == grid.size() - 1 && c == grid[0].size() - 1) {
            return grid[r][c];
        }
        if (r == grid.size() || c == grid[0].size()) {
            return INT_MAX;
        }
        if (dp[r][c] != -1) {
            return dp[r][c];
        }

        dp[r][c] = grid[r][c] + min(dfs(r + 1, c, grid), dfs(r, c + 1, grid));
        return dp[r][c];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    minPathSum(grid) {
        const m = grid.length,
            n = grid[0].length;
        const dp = Array.from({ length: m }, () => Array(n).fill(-1));

        const dfs = (r, c) => {
            if (r === m - 1 && c === n - 1) {
                return grid[r][c];
            }
            if (r === m || c === n) {
                return Infinity;
            }
            if (dp[r][c] !== -1) {
                return dp[r][c];
            }

            dp[r][c] = grid[r][c] + Math.min(dfs(r + 1, c), dfs(r, c + 1));
            return dp[r][c];
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private int[,] dp;

    public int MinPathSum(int[][] grid) {
        int m = grid.Length, n = grid[0].Length;
        dp = new int[m, n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dp[i, j] = -1;
            }
        }
        return Dfs(0, 0, grid);
    }

    private int Dfs(int r, int c, int[][] grid) {
        int m = grid.Length, n = grid[0].Length;

        if (r == m - 1 && c == n - 1) {
            return grid[r][c];
        }
        if (r == m || c == n) {
            return int.MaxValue;
        }
        if (dp[r, c] != -1) {
            return dp[r, c];
        }

        dp[r, c] = grid[r][c] + Math.Min(Dfs(r + 1, c, grid), Dfs(r, c + 1, grid));
        return dp[r, c];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        dp = [[float("inf")] * (COLS + 1) for _ in range(ROWS + 1)]
        dp[ROWS - 1][COLS] = 0

        for r in range(ROWS - 1, -1, -1):
            for c in range(COLS - 1, -1, -1):
                dp[r][c] = grid[r][c] + min(dp[r + 1][c], dp[r][c + 1])

        return dp[0][0]
```

```java
public class Solution {
    public int minPathSum(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int[][] dp = new int[ROWS + 1][COLS + 1];

        for (int r = 0; r <= ROWS; r++) {
            for (int c = 0; c <= COLS; c++) {
                dp[r][c] = Integer.MAX_VALUE;
            }
        }
        dp[ROWS - 1][COLS] = 0;

        for (int r = ROWS - 1; r >= 0; r--) {
            for (int c = COLS - 1; c >= 0; c--) {
                dp[r][c] = grid[r][c] + Math.min(dp[r + 1][c], dp[r][c + 1]);
            }
        }

        return dp[0][0];
    }
}
```

```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        vector<vector<int>> dp(ROWS + 1, vector<int>(COLS + 1, INT_MAX));
        dp[ROWS - 1][COLS] = 0;

        for (int r = ROWS - 1; r >= 0; r--) {
            for (int c = COLS - 1; c >= 0; c--) {
                dp[r][c] = grid[r][c] + min(dp[r + 1][c], dp[r][c + 1]);
            }
        }

        return dp[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    minPathSum(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        const dp = Array.from({ length: ROWS + 1 }, () =>
            Array(COLS + 1).fill(Infinity),
        );
        dp[ROWS - 1][COLS] = 0;

        for (let r = ROWS - 1; r >= 0; r--) {
            for (let c = COLS - 1; c >= 0; c--) {
                dp[r][c] = grid[r][c] + Math.min(dp[r + 1][c], dp[r][c + 1]);
            }
        }

        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public int MinPathSum(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int[,] dp = new int[ROWS + 1, COLS + 1];

        for (int r = 0; r <= ROWS; r++) {
            for (int c = 0; c <= COLS; c++) {
                dp[r, c] = int.MaxValue;
            }
        }

        dp[ROWS - 1, COLS] = 0;

        for (int r = ROWS - 1; r >= 0; r--) {
            for (int c = COLS - 1; c >= 0; c--) {
                dp[r, c] = grid[r][c] + Math.Min(dp[r + 1, c], dp[r, c + 1]);
            }
        }

        return dp[0, 0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        dp = [float("inf")] * (COLS + 1)
        dp[COLS - 1] = 0

        for r in range(ROWS - 1, -1, -1):
            for c in range(COLS - 1, -1, -1):
                dp[c] = grid[r][c] + min(dp[c], dp[c + 1])

        return dp[0]
```

```java
public class Solution {
    public int minPathSum(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int[] dp = new int[COLS + 1];
        for (int c = 0; c <= COLS; c++) {
            dp[c] = Integer.MAX_VALUE;
        }
        dp[COLS - 1] = 0;

        for (int r = ROWS - 1; r >= 0; r--) {
            for (int c = COLS - 1; c >= 0; c--) {
                dp[c] = grid[r][c] + Math.min(dp[c], dp[c + 1]);
            }
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        vector<int> dp(COLS + 1, INT_MAX);
        dp[COLS - 1] = 0;

        for (int r = ROWS - 1; r >= 0; r--) {
            for (int c = COLS - 1; c >= 0; c--) {
                dp[c] = grid[r][c] + min(dp[c], dp[c + 1]);
            }
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    minPathSum(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        const dp = new Array(COLS + 1).fill(Infinity);
        dp[COLS - 1] = 0;

        for (let r = ROWS - 1; r >= 0; r--) {
            for (let c = COLS - 1; c >= 0; c--) {
                dp[c] = grid[r][c] + Math.min(dp[c], dp[c + 1]);
            }
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int MinPathSum(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int[] dp = new int[COLS + 1];
        for (int c = 0; c <= COLS; c++) {
            dp[c] = int.MaxValue;
        }
        dp[COLS - 1] = 0;

        for (int r = ROWS - 1; r >= 0; r--) {
            for (int c = COLS - 1; c >= 0; c--) {
                dp[c] = grid[r][c] + Math.Min(dp[c], dp[c + 1]);
            }
        }

        return dp[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(n)$

> Where $m$ is the number of rows and $n$ is the number of columns.
