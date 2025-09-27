## 1. Recursion

::tabs-start

```python
class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        n = len(grid)
        def dfs(r1, c1, r2, c2):
            if r1 >= n or c1 >= n or r2 >= n or c2 >= n or grid[r1][c1] == -1 or grid[r2][c2] == -1:
                return -1000

            if r1 == n - 1 and r2 == n - 1 and c1 == n - 1 and c2 == n - 1:
                return grid[r1][c1]

            res = dfs(r1 + 1, c1, r2 + 1, c2)
            res = max(res, dfs(r1 + 1, c1, r2, c2 + 1))
            res = max(res, dfs(r1, c1 + 1, r2 + 1, c2))
            res = max(res, dfs(r1, c1 + 1, r2, c2 + 1))
            res += grid[r1][c1] + grid[r2][c2]
            res -= (grid[r1][c1] if (r1 == r2 and c1 == c2) else 0)
            return res

        return max(0, dfs(0, 0, 0, 0))
```

```java
public class Solution {
    public int cherryPickup(int[][] grid) {
        int n = grid.length;
        return Math.max(0, dfs(0, 0, 0, 0, grid, n));
    }

    private int dfs(int r1, int c1, int r2, int c2, int[][] grid, int n) {
        if (r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1)
            return -1000;

        if (r1 == n - 1 && c1 == n - 1 && r2 == n - 1 && c2 == n - 1)
            return grid[r1][c1];

        int res = dfs(r1 + 1, c1, r2 + 1, c2, grid, n);
        res = Math.max(res, dfs(r1 + 1, c1, r2, c2 + 1, grid, n));
        res = Math.max(res, dfs(r1, c1 + 1, r2 + 1, c2, grid, n));
        res = Math.max(res, dfs(r1, c1 + 1, r2, c2 + 1, grid, n));
        res += grid[r1][c1] + grid[r2][c2];
        if (r1 == r2 && c1 == c2) res -= grid[r1][c1];
        return res;
    }
}
```

```cpp
class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int n = grid.size();
        return max(0, dfs(0, 0, 0, 0, grid, n));
    }

    int dfs(int r1, int c1, int r2, int c2, vector<vector<int>>& grid, int n) {
        if (r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1)
            return -1000;

        if (r1 == n - 1 && c1 == n - 1 && r2 == n - 1 && c2 == n - 1)
            return grid[r1][c1];

        int res = dfs(r1 + 1, c1, r2 + 1, c2, grid, n);
        res = max(res, dfs(r1 + 1, c1, r2, c2 + 1, grid, n));
        res = max(res, dfs(r1, c1 + 1, r2 + 1, c2, grid, n));
        res = max(res, dfs(r1, c1 + 1, r2, c2 + 1, grid, n));
        res += grid[r1][c1] + grid[r2][c2];
        if (r1 == r2 && c1 == c2) res -= grid[r1][c1];
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    cherryPickup(grid) {
        const n = grid.length;
        const dfs = (r1, c1, r2, c2) => {
            if (r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] === -1 || grid[r2][c2] === -1)
                return -1000;

            if (r1 === n - 1 && c1 === n - 1 && r2 === n - 1 && c2 === n - 1)
                return grid[r1][c1];

            let res = dfs(r1 + 1, c1, r2 + 1, c2);
            res = Math.max(res, dfs(r1 + 1, c1, r2, c2 + 1));
            res = Math.max(res, dfs(r1, c1 + 1, r2 + 1, c2));
            res = Math.max(res, dfs(r1, c1 + 1, r2, c2 + 1));
            res += grid[r1][c1] + grid[r2][c2];
            if (r1 === r2 && c1 === c2) res -= grid[r1][c1];
            return res;
        };
        return Math.max(0, dfs(0, 0, 0, 0));
    }
}
```

```csharp
public class Solution {
    public int CherryPickup(int[][] grid) {
        int n = grid.Length;
        return Math.Max(0, Dfs(0, 0, 0, 0, grid, n));
    }

    private int Dfs(int r1, int c1, int r2, int c2, int[][] grid, int n) {
        if (r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1)
            return -1000;

        if (r1 == n - 1 && c1 == n - 1 && r2 == n - 1 && c2 == n - 1)
            return grid[r1][c1];

        int res = Dfs(r1 + 1, c1, r2 + 1, c2, grid, n);
        res = Math.Max(res, Dfs(r1 + 1, c1, r2, c2 + 1, grid, n));
        res = Math.Max(res, Dfs(r1, c1 + 1, r2 + 1, c2, grid, n));
        res = Math.Max(res, Dfs(r1, c1 + 1, r2, c2 + 1, grid, n));
        res += grid[r1][c1] + grid[r2][c2];
        if (r1 == r2 && c1 == c2) res -= grid[r1][c1];
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(16 ^ n)$
* Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        n = len(grid)
        dp = [[[[float("-inf")] * n for _ in range(n)] for _ in range(n)] for _ in range(n)]

        def dfs(r1, c1, r2, c2):
            if r1 >= n or c1 >= n or r2 >= n or c2 >= n or grid[r1][c1] == -1 or grid[r2][c2] == -1:
                return -1000

            if r1 == n - 1 and r2 == n - 1 and c1 == n - 1 and c2 == n - 1:
                return grid[r1][c1]

            if dp[r1][c1][r2][c2] != float("-inf"):
                return dp[r1][c1][r2][c2]

            res = dfs(r1 + 1, c1, r2 + 1, c2)
            res = max(res, dfs(r1 + 1, c1, r2, c2 + 1))
            res = max(res, dfs(r1, c1 + 1, r2 + 1, c2))
            res = max(res, dfs(r1, c1 + 1, r2, c2 + 1))
            res += grid[r1][c1] + grid[r2][c2]
            if r1 == r2 and c1 == c2:
                res -= grid[r1][c1]

            dp[r1][c1][r2][c2] = res
            return res

        return max(0, dfs(0, 0, 0, 0))
```

```java
public class Solution {
    int n;
    int[][][][] dp;
    int[][] grid;

    public int cherryPickup(int[][] grid) {
        this.n = grid.length;
        this.grid = grid;
        dp = new int[n][n][n][n];
        for (int a = 0; a < n; a++)
            for (int b = 0; b < n; b++)
                for (int c = 0; c < n; c++)
                    for (int d = 0; d < n; d++)
                        dp[a][b][c][d] = Integer.MIN_VALUE;
        return Math.max(0, dfs(0, 0, 0, 0));
    }

    private int dfs(int r1, int c1, int r2, int c2) {
        if (r1 >= n || c1 >= n || r2 >= n || c2 >= n ||
            grid[r1][c1] == -1 || grid[r2][c2] == -1) {
            return -1000;
        }
        if (r1 == n - 1 && c1 == n - 1 && r2 == n - 1 && c2 == n - 1) {
            return grid[r1][c1];
        }
        if (dp[r1][c1][r2][c2] != Integer.MIN_VALUE) {
            return dp[r1][c1][r2][c2];
        }
        int res = dfs(r1 + 1, c1, r2 + 1, c2);
        res = Math.max(res, dfs(r1 + 1, c1, r2, c2 + 1));
        res = Math.max(res, dfs(r1, c1 + 1, r2 + 1, c2));
        res = Math.max(res, dfs(r1, c1 + 1, r2, c2 + 1));
        res += grid[r1][c1] + grid[r2][c2];
        if (r1 == r2 && c1 == c2) res -= grid[r1][c1];
        dp[r1][c1][r2][c2] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    int n;
    vector<vector<vector<vector<int>>>> dp;
    vector<vector<int>> grid;

    int cherryPickup(vector<vector<int>>& grid) {
        this->n = grid.size();
        this->grid = grid;
        dp = vector(n, vector(n, vector(n, vector<int>(n, INT_MIN))));
        return max(0, dfs(0, 0, 0, 0));
    }

    int dfs(int r1, int c1, int r2, int c2) {
        if (r1 >= n || c1 >= n || r2 >= n || c2 >= n ||
            grid[r1][c1] == -1 || grid[r2][c2] == -1) {
            return -1000;
        }
        if (r1 == n - 1 && c1 == n - 1 && r2 == n - 1 && c2 == n - 1) {
            return grid[r1][c1];
        }
        if (dp[r1][c1][r2][c2] != INT_MIN) {
            return dp[r1][c1][r2][c2];
        }
        int res = dfs(r1 + 1, c1, r2 + 1, c2);
        res = max(res, dfs(r1 + 1, c1, r2, c2 + 1));
        res = max(res, dfs(r1, c1 + 1, r2 + 1, c2));
        res = max(res, dfs(r1, c1 + 1, r2, c2 + 1));
        res += grid[r1][c1] + grid[r2][c2];
        if (r1 == r2 && c1 == c2) res -= grid[r1][c1];
        return dp[r1][c1][r2][c2] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    cherryPickup(grid) {
        const n = grid.length;
        const dp = Array.from({ length: n }, () =>
            Array.from({ length: n }, () =>
                Array.from({ length: n }, () =>
                    Array(n).fill(-Infinity)
                )
            )
        );

        const dfs = (r1, c1, r2, c2) => {
            if (r1 >= n || c1 >= n || r2 >= n || c2 >= n ||
                grid[r1][c1] === -1 || grid[r2][c2] === -1) {
                return -1000;
            }
            if (r1 === n - 1 && c1 === n - 1 && r2 === n - 1 && c2 === n - 1) {
                return grid[r1][c1];
            }
            if (dp[r1][c1][r2][c2] !== -Infinity) {
                return dp[r1][c1][r2][c2];
            }

            let res = dfs(r1 + 1, c1, r2 + 1, c2);
            res = Math.max(res, dfs(r1 + 1, c1, r2, c2 + 1));
            res = Math.max(res, dfs(r1, c1 + 1, r2 + 1, c2));
            res = Math.max(res, dfs(r1, c1 + 1, r2, c2 + 1));
            res += grid[r1][c1] + grid[r2][c2];
            if (r1 === r2 && c1 === c2) res -= grid[r1][c1];

            dp[r1][c1][r2][c2] = res;
            return res;
        };

        return Math.max(0, dfs(0, 0, 0, 0));
    }
}
```

```csharp
public class Solution {
    int n;
    int[,,,] dp;
    int[][] grid;

    public int CherryPickup(int[][] grid) {
        n = grid.Length;
        this.grid = grid;
        dp = new int[n,n,n,n];
        for (int a = 0; a < n; a++)
            for (int b = 0; b < n; b++)
                for (int c = 0; c < n; c++)
                    for (int d = 0; d < n; d++)
                        dp[a,b,c,d] = int.MinValue;
        return Math.Max(0, Dfs(0, 0, 0, 0));
    }

    private int Dfs(int r1, int c1, int r2, int c2) {
        if (r1 >= n || c1 >= n || r2 >= n || c2 >= n ||
            grid[r1][c1] == -1 || grid[r2][c2] == -1) {
            return -1000;
        }
        if (r1 == n - 1 && c1 == n - 1 && r2 == n - 1 && c2 == n - 1) {
            return grid[r1][c1];
        }
        if (dp[r1,c1,r2,c2] != int.MinValue) {
            return dp[r1,c1,r2,c2];
        }
        int res = Dfs(r1 + 1, c1, r2 + 1, c2);
        res = Math.Max(res, Dfs(r1 + 1, c1, r2, c2 + 1));
        res = Math.Max(res, Dfs(r1, c1 + 1, r2 + 1, c2));
        res = Math.Max(res, Dfs(r1, c1 + 1, r2, c2 + 1));
        res += grid[r1][c1] + grid[r2][c2];
        if (r1 == r2 && c1 == c2) res -= grid[r1][c1];
        dp[r1,c1,r2,c2] = res;
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 4)$
* Space complexity: $O(n ^ 4)$

---

## 3. Dynamic Programming (Top-Down) Optimized

::tabs-start

```python
class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        n = len(grid)
        dp = [[[float("-inf")] * n for _ in range(n)] for _ in range(n)]

        def dfs(r1, c1, r2):
            c2 = r1 + c1 - r2
            if r1 >= n or c1 >= n or r2 >= n or c2 >= n or grid[r1][c1] == -1 or grid[r2][c2] == -1:
                return -1000

            if r1 == n - 1 and c1 == n - 1:
                return grid[r1][c1]

            if dp[r1][c1][r2] != float("-inf"):
                return dp[r1][c1][r2]

            res = dfs(r1 + 1, c1, r2 + 1)
            res = max(res, dfs(r1 + 1, c1, r2))
            res = max(res, dfs(r1, c1 + 1, r2 + 1))
            res = max(res, dfs(r1, c1 + 1, r2))
            res += grid[r1][c1]
            if (r1, c1) != (r2, c2):
                res += grid[r2][c2]

            dp[r1][c1][r2] = res
            return res

        return max(0, dfs(0, 0, 0))
```

```java
public class Solution {
    int[][][] dp;
    int[][] grid;
    int n;

    public int cherryPickup(int[][] grid) {
        this.n = grid.length;
        this.grid = grid;
        dp = new int[n][n][n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                for (int k = 0; k < n; k++)
                    dp[i][j][k] = Integer.MIN_VALUE;

        return Math.max(0, dfs(0, 0, 0));
    }

    private int dfs(int r1, int c1, int r2) {
        int c2 = r1 + c1 - r2;
        if (r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1)
            return -1000;

        if (r1 == n - 1 && c1 == n - 1)
            return grid[r1][c1];

        if (dp[r1][c1][r2] != Integer.MIN_VALUE)
            return dp[r1][c1][r2];

        int res = dfs(r1 + 1, c1, r2 + 1);
        res = Math.max(res, dfs(r1 + 1, c1, r2));
        res = Math.max(res, dfs(r1, c1 + 1, r2 + 1));
        res = Math.max(res, dfs(r1, c1 + 1, r2));

        res += grid[r1][c1];
        if (!(r1 == r2 && c1 == c2)) res += grid[r2][c2];

        return dp[r1][c1][r2] = res;
    }
}
```

```cpp
class Solution {
    vector<vector<vector<int>>> dp;
    vector<vector<int>> grid;
    int n;

public:
    int cherryPickup(vector<vector<int>>& grid) {
        this->n = grid.size();
        this->grid = grid;
        dp.assign(n, vector<vector<int>>(n, vector<int>(n, INT_MIN)));
        return max(0, dfs(0, 0, 0));
    }

    int dfs(int r1, int c1, int r2) {
        int c2 = r1 + c1 - r2;
        if (r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1)
            return -1000;

        if (r1 == n - 1 && c1 == n - 1)
            return grid[r1][c1];

        if (dp[r1][c1][r2] != INT_MIN)
            return dp[r1][c1][r2];

        int res = dfs(r1 + 1, c1, r2 + 1);
        res = max(res, dfs(r1 + 1, c1, r2));
        res = max(res, dfs(r1, c1 + 1, r2 + 1));
        res = max(res, dfs(r1, c1 + 1, r2));

        res += grid[r1][c1];
        if (!(r1 == r2 && c1 == c2)) res += grid[r2][c2];

        return dp[r1][c1][r2] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    cherryPickup(grid) {
        const n = grid.length;
        const dp = Array.from({ length: n }, () =>
            Array.from({ length: n }, () =>
                Array(n).fill(-Infinity)
            )
        );

        const dfs = (r1, c1, r2) => {
            const c2 = r1 + c1 - r2;
            if (r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] === -1 || grid[r2][c2] === -1)
                return -1000;

            if (r1 === n - 1 && c1 === n - 1)
                return grid[r1][c1];

            if (dp[r1][c1][r2] !== -Infinity)
                return dp[r1][c1][r2];

            let res = dfs(r1 + 1, c1, r2 + 1);
            res = Math.max(res, dfs(r1 + 1, c1, r2));
            res = Math.max(res, dfs(r1, c1 + 1, r2 + 1));
            res = Math.max(res, dfs(r1, c1 + 1, r2));

            res += grid[r1][c1];
            if (!(r1 === r2 && c1 === c2)) res += grid[r2][c2];

            return dp[r1][c1][r2] = res;
        };

        return Math.max(0, dfs(0, 0, 0));
    }
}
```

```csharp
public class Solution {
    private int[,,] dp;
    private int[][] grid;
    private int n;

    public int CherryPickup(int[][] grid) {
        this.n = grid.Length;
        this.grid = grid;
        dp = new int[n, n, n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                for (int k = 0; k < n; k++)
                    dp[i, j, k] = int.MinValue;

        return Math.Max(0, Dfs(0, 0, 0));
    }

    private int Dfs(int r1, int c1, int r2) {
        int c2 = r1 + c1 - r2;
        if (r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1)
            return -1000;

        if (r1 == n - 1 && c1 == n - 1)
            return grid[r1][c1];

        if (dp[r1, c1, r2] != int.MinValue)
            return dp[r1, c1, r2];

        int res = Dfs(r1 + 1, c1, r2 + 1);
        res = Math.Max(res, Dfs(r1 + 1, c1, r2));
        res = Math.Max(res, Dfs(r1, c1 + 1, r2 + 1));
        res = Math.Max(res, Dfs(r1, c1 + 1, r2));

        res += grid[r1][c1];
        if (!(r1 == r2 && c1 == c2)) res += grid[r2][c2];

        dp[r1, c1, r2] = res;
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 3)$
* Space complexity: $O(n ^ 3)$

---

## 4. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        n = len(grid)
        dp = [[[float("-inf")] * n for _ in range(n)] for _ in range(n)]

        for r1 in reversed(range(n)):
            for c1 in reversed(range(n)):
                for r2 in reversed(range(n)):
                    c2 = r1 + c1 - r2
                    if c2 < 0 or c2 >= n:
                        continue
                    if grid[r1][c1] == -1 or grid[r2][c2] == -1:
                        continue

                    if r1 == n - 1 and c1 == n - 1:
                        dp[r1][c1][r2] = grid[r1][c1]
                    else:
                        res = max(
                            dp[r1 + 1][c1][r2 + 1] if r1 + 1 < n and r2 + 1 < n else -1000,
                            dp[r1 + 1][c1][r2] if r1 + 1 < n else -1000,
                            dp[r1][c1 + 1][r2 + 1] if c1 + 1 < n and r2 + 1 < n else -1000,
                            dp[r1][c1 + 1][r2] if c1 + 1 < n else -1000
                        )
                        if res == -1000:
                            continue
                        res += grid[r1][c1]
                        if (r1, c1) != (r2, c2):
                            res += grid[r2][c2]
                        dp[r1][c1][r2] = res

        return max(0, dp[0][0][0])
```

```java
public class Solution {
    public int cherryPickup(int[][] grid) {
        int n = grid.length;
        int[][][] dp = new int[n][n][n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                for (int k = 0; k < n; k++)
                    dp[i][j][k] = Integer.MIN_VALUE / 2;

        for (int r1 = n - 1; r1 >= 0; r1--) {
            for (int c1 = n - 1; c1 >= 0; c1--) {
                for (int r2 = n - 1; r2 >= 0; r2--) {
                    int c2 = r1 + c1 - r2;
                    if (c2 < 0 || c2 >= n) continue;
                    if (grid[r1][c1] == -1 || grid[r2][c2] == -1) continue;

                    if (r1 == n - 1 && c1 == n - 1) {
                        dp[r1][c1][r2] = grid[r1][c1];
                    } else {
                        int res = Integer.MIN_VALUE / 2;
                        if (r1 + 1 < n && r2 + 1 < n) res = Math.max(res, dp[r1 + 1][c1][r2 + 1]);
                        if (r1 + 1 < n) res = Math.max(res, dp[r1 + 1][c1][r2]);
                        if (c1 + 1 < n && r2 + 1 < n) res = Math.max(res, dp[r1][c1 + 1][r2 + 1]);
                        if (c1 + 1 < n) res = Math.max(res, dp[r1][c1 + 1][r2]);
                        if (res == Integer.MIN_VALUE / 2) continue;
                        res += grid[r1][c1];
                        if (r1 != r2 || c1 != c2) res += grid[r2][c2];
                        dp[r1][c1][r2] = res;
                    }
                }
            }
        }
        return Math.max(0, dp[0][0][0]);
    }
}
```

```cpp
class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(n, vector<int>(n, -1000000000)));

        for (int r1 = n - 1; r1 >= 0; r1--) {
            for (int c1 = n - 1; c1 >= 0; c1--) {
                for (int r2 = n - 1; r2 >= 0; r2--) {
                    int c2 = r1 + c1 - r2;
                    if (c2 < 0 || c2 >= n) continue;
                    if (grid[r1][c1] == -1 || grid[r2][c2] == -1) continue;

                    if (r1 == n - 1 && c1 == n - 1) {
                        dp[r1][c1][r2] = grid[r1][c1];
                    } else {
                        int res = -1000000000;
                        if (r1 + 1 < n && r2 + 1 < n) res = max(res, dp[r1 + 1][c1][r2 + 1]);
                        if (r1 + 1 < n) res = max(res, dp[r1 + 1][c1][r2]);
                        if (c1 + 1 < n && r2 + 1 < n) res = max(res, dp[r1][c1 + 1][r2 + 1]);
                        if (c1 + 1 < n) res = max(res, dp[r1][c1 + 1][r2]);
                        if (res == -1000000000) continue;
                        res += grid[r1][c1];
                        if (r1 != r2 || c1 != c2) res += grid[r2][c2];
                        dp[r1][c1][r2] = res;
                    }
                }
            }
        }
        return max(0, dp[0][0][0]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    cherryPickup(grid) {
        const n = grid.length;
        const dp = Array.from({ length: n }, () =>
            Array.from({ length: n }, () => Array(n).fill(-1e9))
        );

        for (let r1 = n - 1; r1 >= 0; r1--) {
            for (let c1 = n - 1; c1 >= 0; c1--) {
                for (let r2 = n - 1; r2 >= 0; r2--) {
                    let c2 = r1 + c1 - r2;
                    if (c2 < 0 || c2 >= n) continue;
                    if (grid[r1][c1] === -1 || grid[r2][c2] === -1) continue;

                    if (r1 === n - 1 && c1 === n - 1) {
                        dp[r1][c1][r2] = grid[r1][c1];
                    } else {
                        let res = -1e9;
                        if (r1 + 1 < n && r2 + 1 < n) res = Math.max(res, dp[r1 + 1][c1][r2 + 1]);
                        if (r1 + 1 < n) res = Math.max(res, dp[r1 + 1][c1][r2]);
                        if (c1 + 1 < n && r2 + 1 < n) res = Math.max(res, dp[r1][c1 + 1][r2 + 1]);
                        if (c1 + 1 < n) res = Math.max(res, dp[r1][c1 + 1][r2]);
                        if (res === -1e9) continue;
                        res += grid[r1][c1];
                        if (r1 !== r2 || c1 !== c2) res += grid[r2][c2];
                        dp[r1][c1][r2] = res;
                    }
                }
            }
        }
        return Math.max(0, dp[0][0][0]);
    }
}
```

```csharp
public class Solution {
    public int CherryPickup(int[][] grid) {
        int n = grid.Length;
        int[,,] dp = new int[n,n,n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                for (int k = 0; k < n; k++)
                    dp[i,j,k] = int.MinValue / 2;

        for (int r1 = n - 1; r1 >= 0; r1--) {
            for (int c1 = n - 1; c1 >= 0; c1--) {
                for (int r2 = n - 1; r2 >= 0; r2--) {
                    int c2 = r1 + c1 - r2;
                    if (c2 < 0 || c2 >= n) continue;
                    if (grid[r1][c1] == -1 || grid[r2][c2] == -1) continue;

                    if (r1 == n - 1 && c1 == n - 1) {
                        dp[r1,c1,r2] = grid[r1][c1];
                    } else {
                        int res = int.MinValue / 2;
                        if (r1 + 1 < n && r2 + 1 < n) res = Math.Max(res, dp[r1 + 1,c1,r2 + 1]);
                        if (r1 + 1 < n) res = Math.Max(res, dp[r1 + 1,c1,r2]);
                        if (c1 + 1 < n && r2 + 1 < n) res = Math.Max(res, dp[r1,c1 + 1,r2 + 1]);
                        if (c1 + 1 < n) res = Math.Max(res, dp[r1,c1 + 1,r2]);
                        if (res == int.MinValue / 2) continue;
                        res += grid[r1][c1];
                        if (r1 != r2 || c1 != c2) res += grid[r2][c2];
                        dp[r1,c1,r2] = res;
                    }
                }
            }
        }
        return Math.Max(0, dp[0,0,0]);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 3)$
* Space complexity: $O(n ^ 3)$

---

## 5. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        n = len(grid)
        prev = [[float("-inf")] * n for _ in range(n)]
        prev[0][0] = grid[0][0]

        for k in range(1, 2 * n - 1):
            dp = [[float("-inf")] * n for _ in range(n)]
            for r1 in range(max(0, k - (n - 1)), min(n, k + 1)):
                c1 = k - r1
                if c1 >= n or grid[r1][c1] == -1:
                    continue
                for r2 in range(max(0, k - (n - 1)), min(n, k + 1)):
                    c2 = k - r2
                    if c2 >= n or grid[r2][c2] == -1:
                        continue
                    val = prev[r1][r2]
                    if r1 > 0: val = max(val, prev[r1 - 1][r2])
                    if r2 > 0: val = max(val, prev[r1][r2 - 1])
                    if r1 > 0 and r2 > 0: val = max(val, prev[r1 - 1][r2 - 1])
                    if val < 0: continue
                    val += grid[r1][c1]
                    if r1 != r2: val += grid[r2][c2]
                    dp[r1][r2] = val
            prev = dp

        return max(0, prev[n - 1][n - 1])
```

```java
public class Solution {
    public int cherryPickup(int[][] grid) {
        int n = grid.length;
        int[][] prev = new int[n][n];
        for (int[] row : prev) java.util.Arrays.fill(row, Integer.MIN_VALUE);
        prev[0][0] = grid[0][0];

        for (int k = 1; k < 2 * n - 1; k++) {
            int[][] dp = new int[n][n];
            for (int[] row : dp) java.util.Arrays.fill(row, Integer.MIN_VALUE);
            for (int r1 = Math.max(0, k - (n - 1)); r1 <= Math.min(n - 1, k); r1++) {
                int c1 = k - r1;
                if (c1 >= n || grid[r1][c1] == -1) continue;
                for (int r2 = Math.max(0, k - (n - 1)); r2 <= Math.min(n - 1, k); r2++) {
                    int c2 = k - r2;
                    if (c2 >= n || grid[r2][c2] == -1) continue;
                    int val = prev[r1][r2];
                    if (r1 > 0) val = Math.max(val, prev[r1 - 1][r2]);
                    if (r2 > 0) val = Math.max(val, prev[r1][r2 - 1]);
                    if (r1 > 0 && r2 > 0) val = Math.max(val, prev[r1 - 1][r2 - 1]);
                    if (val < 0) continue;
                    val += grid[r1][c1];
                    if (r1 != r2) val += grid[r2][c2];
                    dp[r1][r2] = val;
                }
            }
            prev = dp;
        }

        return Math.max(0, prev[n - 1][n - 1]);
    }
}
```

```cpp
class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<vector<int>> prev(n, vector<int>(n, INT_MIN));
        prev[0][0] = grid[0][0];

        for (int k = 1; k < 2 * n - 1; k++) {
            vector<vector<int>> dp(n, vector<int>(n, INT_MIN));
            for (int r1 = max(0, k - (n - 1)); r1 <= min(n - 1, k); r1++) {
                int c1 = k - r1;
                if (c1 >= n || grid[r1][c1] == -1) continue;
                for (int r2 = max(0, k - (n - 1)); r2 <= min(n - 1, k); r2++) {
                    int c2 = k - r2;
                    if (c2 >= n || grid[r2][c2] == -1) continue;
                    int val = prev[r1][r2];
                    if (r1 > 0) val = max(val, prev[r1 - 1][r2]);
                    if (r2 > 0) val = max(val, prev[r1][r2 - 1]);
                    if (r1 > 0 && r2 > 0) val = max(val, prev[r1 - 1][r2 - 1]);
                    if (val < 0) continue;
                    val += grid[r1][c1];
                    if (r1 != r2) val += grid[r2][c2];
                    dp[r1][r2] = val;
                }
            }
            prev = dp;
        }

        return max(0, prev[n - 1][n - 1]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    cherryPickup(grid) {
        const n = grid.length;
        let prev = Array.from({ length: n }, () => Array(n).fill(-Infinity));
        prev[0][0] = grid[0][0];

        for (let k = 1; k < 2 * n - 1; k++) {
            let dp = Array.from({ length: n }, () => Array(n).fill(-Infinity));
            for (let r1 = Math.max(0, k - (n - 1)); r1 <= Math.min(n - 1, k); r1++) {
                let c1 = k - r1;
                if (c1 >= n || grid[r1][c1] === -1) continue;
                for (let r2 = Math.max(0, k - (n - 1)); r2 <= Math.min(n - 1, k); r2++) {
                    let c2 = k - r2;
                    if (c2 >= n || grid[r2][c2] === -1) continue;
                    let val = prev[r1][r2];
                    if (r1 > 0) val = Math.max(val, prev[r1 - 1][r2]);
                    if (r2 > 0) val = Math.max(val, prev[r1][r2 - 1]);
                    if (r1 > 0 && r2 > 0) val = Math.max(val, prev[r1 - 1][r2 - 1]);
                    if (val < 0) continue;
                    val += grid[r1][c1];
                    if (r1 !== r2) val += grid[r2][c2];
                    dp[r1][r2] = val;
                }
            }
            prev = dp;
        }

        return Math.max(0, prev[n - 1][n - 1]);
    }
}
```

```csharp
public class Solution {
    public int CherryPickup(int[][] grid) {
        int n = grid.Length;
        int[][] prev = new int[n][];
        for (int i = 0; i < n; i++) {
            prev[i] = new int[n];
            for (int j = 0; j < n; j++) prev[i][j] = int.MinValue;
        }
        prev[0][0] = grid[0][0];

        for (int k = 1; k < 2 * n - 1; k++) {
            int[][] dp = new int[n][];
            for (int i = 0; i < n; i++) {
                dp[i] = new int[n];
                for (int j = 0; j < n; j++) dp[i][j] = int.MinValue;
            }
            for (int r1 = Math.Max(0, k - (n - 1)); r1 <= Math.Min(n - 1, k); r1++) {
                int c1 = k - r1;
                if (c1 >= n || grid[r1][c1] == -1) continue;
                for (int r2 = Math.Max(0, k - (n - 1)); r2 <= Math.Min(n - 1, k); r2++) {
                    int c2 = k - r2;
                    if (c2 >= n || grid[r2][c2] == -1) continue;
                    int val = prev[r1][r2];
                    if (r1 > 0) val = Math.Max(val, prev[r1 - 1][r2]);
                    if (r2 > 0) val = Math.Max(val, prev[r1][r2 - 1]);
                    if (r1 > 0 && r2 > 0) val = Math.Max(val, prev[r1 - 1][r2 - 1]);
                    if (val < 0) continue;
                    val += grid[r1][c1];
                    if (r1 != r2) val += grid[r2][c2];
                    dp[r1][r2] = val;
                }
            }
            prev = dp;
        }

        return Math.Max(0, prev[n - 1][n - 1]);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 3)$
* Space complexity: $O(n ^ 2)$