## 1. Recursion

::tabs-start

```python
class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])

        def dfs(r, c1, c2):
            if c1 < 0 or c2 < 0 or c1 >= COLS or c2 >= COLS or c1 > c2:
                return 0
            if r == ROWS - 1:
                return grid[r][c1] + (grid[r][c2] if c1 != c2 else 0)

            res = 0
            for c1_d in [-1, 0, 1]:
                for c2_d in [-1, 0, 1]:
                    res = max(res, dfs(r + 1, c1 + c1_d, c2 + c2_d))

            return res + grid[r][c1] + (grid[r][c2] if c1 != c2 else 0)

        return dfs(0, 0, COLS - 1)
```

```java
public class Solution {
    public int cherryPickup(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;

        return dfs(0, 0, COLS - 1, grid, ROWS, COLS);
    }

    private int dfs(int r, int c1, int c2, int[][] grid, int ROWS, int COLS) {
        if (c1 < 0 || c2 < 0 || c1 >= COLS || c2 >= COLS || c1 > c2) {
            return 0;
        }
        if (r == ROWS - 1) {
            return grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
        }

        int res = 0;
        for (int c1_d = -1; c1_d <= 1; c1_d++) {
            for (int c2_d = -1; c2_d <= 1; c2_d++) {
                res = Math.max(res, dfs(r + 1, c1 + c1_d, c2 + c2_d, grid, ROWS, COLS));
            }
        }
        return res + grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
    }
}
```

```cpp
class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        return dfs(0, 0, COLS - 1, grid, ROWS, COLS);
    }

private:
    int dfs(int r, int c1, int c2, vector<vector<int>>& grid, int ROWS, int COLS) {
        if (c1 < 0 || c2 < 0 || c1 >= COLS || c2 >= COLS || c1 > c2) {
            return 0;
        }
        if (r == ROWS - 1) {
            return grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
        }

        int res = 0;
        for (int c1_d = -1; c1_d <= 1; c1_d++) {
            for (int c2_d = -1; c2_d <= 1; c2_d++) {
                res = max(res, dfs(r + 1, c1 + c1_d, c2 + c2_d, grid, ROWS, COLS));
            }
        }
        return res + grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
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
        const ROWS = grid.length,
            COLS = grid[0].length;

        const dfs = (r, c1, c2) => {
            if (c1 < 0 || c2 < 0 || c1 >= COLS || c2 >= COLS || c1 > c2)
                return 0;
            if (r === ROWS - 1) {
                return grid[r][c1] + (c1 === c2 ? 0 : grid[r][c2]);
            }

            let res = 0;
            for (let c1_d = -1; c1_d <= 1; c1_d++) {
                for (let c2_d = -1; c2_d <= 1; c2_d++) {
                    res = Math.max(res, dfs(r + 1, c1 + c1_d, c2 + c2_d));
                }
            }
            return res + grid[r][c1] + (c1 === c2 ? 0 : grid[r][c2]);
        };

        return dfs(0, 0, COLS - 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * 9 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

> Where $n$ is the number of rows and $m$ is the number of columns in the grid.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        cache = {}

        def dfs(r, c1, c2):
            if (r, c1, c2) in cache:
                return cache[(r, c1, c2)]
            if c1 == c2 or min(c1, c2) < 0 or max(c1, c2) >= COLS:
                return 0
            if r == ROWS - 1:
                return grid[r][c1] + grid[r][c2]

            res = 0
            for c1_d in [-1, 0, 1]:
                for c2_d in [-1, 0, 1]:
                    res = max(res, dfs(r + 1, c1 + c1_d, c2 + c2_d))

            cache[(r, c1, c2)] = res + grid[r][c1] + (grid[r][c2] if c1 != c2 else 0)
            return cache[(r, c1, c2)]

        return dfs(0, 0, COLS - 1)
```

```java
public class Solution {
    private int[][][] cache;
    public int cherryPickup(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        cache = new int[ROWS][COLS][COLS];
        for (int[][] i : cache) {
            for (int[] j : i) {
                Arrays.fill(j, -1);
            }
        }

        return dfs(0, 0, COLS - 1, grid);
    }

    private int dfs(int r, int c1, int c2, int[][] grid) {
        if (Math.min(c1, c2) < 0 || Math.max(c1, c2) >= grid[0].length) {
            return 0;
        }
        if (cache[r][c1][c2] != -1) {
            return cache[r][c1][c2];
        }
        if (r == grid.length - 1) {
            return cache[r][c1][c2] = grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
        }

        int res = 0;
        for (int c1_d = -1; c1_d <= 1; c1_d++) {
            for (int c2_d = -1; c2_d <= 1; c2_d++) {
                res = Math.max(res, dfs(r + 1, c1 + c1_d, c2 + c2_d, grid));
            }
        }
        return cache[r][c1][c2] = res + grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
    }
}
```

```cpp
class Solution {
    vector<vector<vector<int>>> cache;

public:
    int cherryPickup(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        cache.assign(ROWS, vector<vector<int>>(COLS, vector<int>(COLS, -1)));
        return dfs(0, 0, COLS - 1, grid);
    }

private:
    int dfs(int r, int c1, int c2, vector<vector<int>>& grid) {
        if (min(c1, c2) < 0 || max(c1, c2) >= grid[0].size()) {
            return 0;
        }
        if (cache[r][c1][c2] != -1) {
            return cache[r][c1][c2];
        }
        if (r == grid.size() - 1) {
            return cache[r][c1][c2] = grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
        }

        int res = 0;
        for (int c1_d = -1; c1_d <= 1; c1_d++) {
            for (int c2_d = -1; c2_d <= 1; c2_d++) {
                res = max(res, dfs(r + 1, c1 + c1_d, c2 + c2_d, grid));
            }
        }
        return cache[r][c1][c2] = res + grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
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
        const ROWS = grid.length,
            COLS = grid[0].length;
        const cache = Array.from({ length: ROWS }, () =>
            Array.from({ length: COLS }, () => Array(COLS).fill(-1)),
        );

        const dfs = (r, c1, c2) => {
            if (Math.min(c1, c2) < 0 || Math.max(c1, c2) >= COLS) {
                return 0;
            }
            if (cache[r][c1][c2] !== -1) return cache[r][c1][c2];
            if (r === ROWS - 1) {
                return (cache[r][c1][c2] =
                    grid[r][c1] + (c1 === c2 ? 0 : grid[r][c2]));
            }

            let res = 0;
            for (let c1_d = -1; c1_d <= 1; c1_d++) {
                for (let c2_d = -1; c2_d <= 1; c2_d++) {
                    res = Math.max(res, dfs(r + 1, c1 + c1_d, c2 + c2_d));
                }
            }
            return (cache[r][c1][c2] =
                res + grid[r][c1] + (c1 === c2 ? 0 : grid[r][c2]));
        };

        return dfs(0, 0, COLS - 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m ^ 2)$
- Space complexity: $O(n * m ^ 2)$

> Where $n$ is the number of rows and $m$ is the number of columns in the grid.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        dp = [[[0] * COLS for _ in range(COLS)] for _ in range(ROWS)]

        for r in range(ROWS - 1, -1, -1):
            for c1 in range(COLS):
                for c2 in range(COLS):
                    res = grid[r][c1]
                    if c1 != c2:
                        res += grid[r][c2]

                    if r != ROWS - 1:
                        max_cherries = 0
                        for d1 in [-1, 0, 1]:
                            for d2 in [-1, 0, 1]:
                                nc1, nc2 = c1 + d1, c2 + d2
                                if 0 <= nc1 < COLS and 0 <= nc2 < COLS:
                                    max_cherries = max(max_cherries, dp[r + 1][nc1][nc2])
                        res += max_cherries

                    dp[r][c1][c2] = res

        return dp[0][0][COLS - 1]
```

```java
public class Solution {
    public int cherryPickup(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int[][][] dp = new int[ROWS][COLS][COLS];

        for (int r = ROWS - 1; r >= 0; r--) {
            for (int c1 = 0; c1 < COLS; c1++) {
                for (int c2 = 0; c2 < COLS; c2++) {
                    int res = grid[r][c1];
                    if (c1 != c2) {
                        res += grid[r][c2];
                    }

                    if (r != ROWS - 1) {
                        int maxCherries = 0;
                        for (int d1 = -1; d1 <= 1; d1++) {
                            for (int d2 = -1; d2 <= 1; d2++) {
                                int nc1 = c1 + d1, nc2 = c2 + d2;
                                if (nc1 >= 0 && nc1 < COLS && nc2 >= 0 && nc2 < COLS) {
                                    maxCherries = Math.max(maxCherries, dp[r + 1][nc1][nc2]);
                                }
                            }
                        }
                        res += maxCherries;
                    }

                    dp[r][c1][c2] = res;
                }
            }
        }

        return dp[0][0][COLS - 1];
    }
}
```

```cpp
class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        int dp[ROWS][COLS][COLS];

        for (int r = ROWS - 1; r >= 0; r--) {
            for (int c1 = 0; c1 < COLS; c1++) {
                for (int c2 = 0; c2 < COLS; c2++) {
                    int res = grid[r][c1];
                    if (c1 != c2) {
                        res += grid[r][c2];
                    }

                    if (r != ROWS - 1) {
                        int maxCherries = 0;
                        for (int d1 = -1; d1 <= 1; d1++) {
                            for (int d2 = -1; d2 <= 1; d2++) {
                                int nc1 = c1 + d1, nc2 = c2 + d2;
                                if (nc1 >= 0 && nc1 < COLS && nc2 >= 0 && nc2 < COLS) {
                                    maxCherries = max(maxCherries, dp[r + 1][nc1][nc2]);
                                }
                            }
                        }
                        res += maxCherries;
                    }

                    dp[r][c1][c2] = res;
                }
            }
        }

        return dp[0][0][COLS - 1];
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
        const ROWS = grid.length,
            COLS = grid[0].length;
        const dp = Array.from({ length: ROWS }, () =>
            Array.from({ length: COLS }, () => Array(COLS).fill(0)),
        );

        for (let r = ROWS - 1; r >= 0; r--) {
            for (let c1 = 0; c1 < COLS; c1++) {
                for (let c2 = 0; c2 < COLS; c2++) {
                    let res = grid[r][c1];
                    if (c1 !== c2) {
                        res += grid[r][c2];
                    }

                    if (r !== ROWS - 1) {
                        let maxCherries = 0;
                        for (let d1 = -1; d1 <= 1; d1++) {
                            for (let d2 = -1; d2 <= 1; d2++) {
                                const nc1 = c1 + d1,
                                    nc2 = c2 + d2;
                                if (
                                    nc1 >= 0 &&
                                    nc1 < COLS &&
                                    nc2 >= 0 &&
                                    nc2 < COLS
                                ) {
                                    maxCherries = Math.max(
                                        maxCherries,
                                        dp[r + 1][nc1][nc2],
                                    );
                                }
                            }
                        }
                        res += maxCherries;
                    }

                    dp[r][c1][c2] = res;
                }
            }
        }

        return dp[0][0][COLS - 1];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m ^ 2)$
- Space complexity: $O(n * m ^ 2)$

> Where $n$ is the number of rows and $m$ is the number of columns in the grid.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        dp = [[0] * COLS for _ in range(COLS)]

        for r in reversed(range(ROWS)):
            cur_dp = [[0] * COLS for _ in range(COLS)]
            for c1 in range(COLS):
                for c2 in range(c1, COLS):
                    max_cherries = 0
                    cherries = grid[r][c1] + (grid[r][c2] if c1 != c2 else 0)
                    for d1 in [-1, 0, 1]:
                        for d2 in [-1, 0, 1]:
                            nc1, nc2 = c1 + d1, c2 + d2
                            if 0 <= nc1 < COLS and 0 <= nc2 < COLS:
                                max_cherries = max(max_cherries, cherries + dp[nc1][nc2])
                    cur_dp[c1][c2] = max_cherries
            dp = cur_dp

        return dp[0][COLS - 1]
```

```java
public class Solution {
    public int cherryPickup(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int[][] dp = new int[COLS][COLS];

        for (int r = ROWS - 1; r >= 0; r--) {
            int[][] cur_dp = new int[COLS][COLS];
            for (int c1 = 0; c1 < COLS; c1++) {
                for (int c2 = c1; c2 < COLS; c2++) {
                    int maxCherries = 0;
                    int cherries = grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
                    for (int d1 = -1; d1 <= 1; d1++) {
                        for (int d2 = -1; d2 <= 1; d2++) {
                            int nc1 = c1 + d1, nc2 = c2 + d2;
                            if (nc1 >= 0 && nc1 < COLS && nc2 >= 0 && nc2 < COLS) {
                                maxCherries = Math.max(maxCherries, cherries + dp[nc1][nc2]);
                            }
                        }
                    }
                    cur_dp[c1][c2] = maxCherries;
                }
            }
            dp = cur_dp;
        }
        return dp[0][COLS - 1];
    }
}
```

```cpp
class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        vector<vector<int>> dp(COLS, vector<int>(COLS, 0));

        for (int r = ROWS - 1; r >= 0; r--) {
            vector<vector<int>> cur_dp(COLS, vector<int>(COLS, 0));
            for (int c1 = 0; c1 < COLS; c1++) {
                for (int c2 = c1; c2 < COLS; c2++) {
                    int maxCherries = 0;
                    int cherries = grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
                    for (int d1 = -1; d1 <= 1; d1++) {
                        for (int d2 = -1; d2 <= 1; d2++) {
                            int nc1 = c1 + d1, nc2 = c2 + d2;
                            if (nc1 >= 0 && nc1 < COLS && nc2 >= 0 && nc2 < COLS) {
                                maxCherries = max(maxCherries, cherries + dp[nc1][nc2]);
                            }
                        }
                    }
                    cur_dp[c1][c2] = maxCherries;
                }
            }
            dp = cur_dp;
        }
        return dp[0][COLS - 1];
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
        const ROWS = grid.length,
            COLS = grid[0].length;
        let dp = Array.from({ length: COLS }, () => Array(COLS).fill(0));

        for (let r = ROWS - 1; r >= 0; r--) {
            const cur_dp = Array.from({ length: COLS }, () =>
                Array(COLS).fill(0),
            );
            for (let c1 = 0; c1 < COLS; c1++) {
                for (let c2 = c1; c2 < COLS; c2++) {
                    let maxCherries = 0;
                    const cherries =
                        grid[r][c1] + (c1 === c2 ? 0 : grid[r][c2]);
                    for (let d1 = -1; d1 <= 1; d1++) {
                        for (let d2 = -1; d2 <= 1; d2++) {
                            const nc1 = c1 + d1,
                                nc2 = c2 + d2;
                            if (
                                nc1 >= 0 &&
                                nc1 < COLS &&
                                nc2 >= 0 &&
                                nc2 < COLS
                            ) {
                                maxCherries = Math.max(
                                    maxCherries,
                                    cherries + dp[nc1][nc2],
                                );
                            }
                        }
                    }
                    cur_dp[c1][c2] = maxCherries;
                }
            }
            dp = cur_dp;
        }

        return dp[0][COLS - 1];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m ^ 2)$
- Space complexity: $O(m ^ 2)$

> Where $n$ is the number of rows and $m$ is the number of columns in the grid.
