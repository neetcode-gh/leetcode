## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Dynamic Programming** - Using memoization or tabulation to solve optimization problems with overlapping subproblems
- **2D/3D Arrays** - Working with multi-dimensional data structures for state representation
- **Recursion with Multiple Variables** - Tracking multiple entities (two robots) simultaneously through recursive state exploration

---

## 1. Recursion

### Intuition
Two robots start at the top corners of the grid and move down simultaneously, one row at a time. At each row, each robot can move diagonally left, straight down, or diagonally right. We track both robot positions and explore all 9 combinations of moves (3 choices for robot 1 times 3 choices for robot 2). If both robots land on the same cell, we only count the cherries once. We enforce `c1 <= c2` to avoid duplicate states since the robots are interchangeable.

### Algorithm
1. Define a recursive function `dfs(r, c1, c2)` where `r` is the current row, `c1` is robot 1's column, and `c2` is robot 2's column.
2. Base case: If `c1` or `c2` is out of bounds, or `c1 > c2`, return `0`.
3. Base case: If `r` equals `ROWS - 1`, return the sum of cherries at both positions (counting once if they overlap).
4. For each of the 9 direction combinations (`c1_d`, `c2_d` in `[-1, 0, 1]`):
   - Recursively call `dfs(r + 1, c1 + c1_d, c2 + c2_d)`.
   - Track the maximum result.
5. Add cherries from current positions to the result and return.

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

```csharp
public class Solution {
    private int ROWS, COLS;
    private int[][] grid;

    public int CherryPickup(int[][] grid) {
        this.grid = grid;
        ROWS = grid.Length;
        COLS = grid[0].Length;
        return Dfs(0, 0, COLS - 1);
    }

    private int Dfs(int r, int c1, int c2) {
        if (c1 < 0 || c2 < 0 || c1 >= COLS || c2 >= COLS || c1 > c2) {
            return 0;
        }
        if (r == ROWS - 1) {
            return grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
        }

        int res = 0;
        for (int c1_d = -1; c1_d <= 1; c1_d++) {
            for (int c2_d = -1; c2_d <= 1; c2_d++) {
                res = Math.Max(res, Dfs(r + 1, c1 + c1_d, c2 + c2_d));
            }
        }
        return res + grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
    }
}
```

```go
func cherryPickup(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])

    var dfs func(r, c1, c2 int) int
    dfs = func(r, c1, c2 int) int {
        if c1 < 0 || c2 < 0 || c1 >= COLS || c2 >= COLS || c1 > c2 {
            return 0
        }
        if r == ROWS-1 {
            if c1 == c2 {
                return grid[r][c1]
            }
            return grid[r][c1] + grid[r][c2]
        }

        res := 0
        for c1_d := -1; c1_d <= 1; c1_d++ {
            for c2_d := -1; c2_d <= 1; c2_d++ {
                res = max(res, dfs(r+1, c1+c1_d, c2+c2_d))
            }
        }
        if c1 == c2 {
            return res + grid[r][c1]
        }
        return res + grid[r][c1] + grid[r][c2]
    }

    return dfs(0, 0, COLS-1)
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun cherryPickup(grid: Array<IntArray>): Int {
        val ROWS = grid.size
        val COLS = grid[0].size

        fun dfs(r: Int, c1: Int, c2: Int): Int {
            if (c1 < 0 || c2 < 0 || c1 >= COLS || c2 >= COLS || c1 > c2) {
                return 0
            }
            if (r == ROWS - 1) {
                return grid[r][c1] + if (c1 == c2) 0 else grid[r][c2]
            }

            var res = 0
            for (c1_d in -1..1) {
                for (c2_d in -1..1) {
                    res = maxOf(res, dfs(r + 1, c1 + c1_d, c2 + c2_d))
                }
            }
            return res + grid[r][c1] + if (c1 == c2) 0 else grid[r][c2]
        }

        return dfs(0, 0, COLS - 1)
    }
}
```

```swift
class Solution {
    func cherryPickup(_ grid: [[Int]]) -> Int {
        let ROWS = grid.count
        let COLS = grid[0].count

        func dfs(_ r: Int, _ c1: Int, _ c2: Int) -> Int {
            if c1 < 0 || c2 < 0 || c1 >= COLS || c2 >= COLS || c1 > c2 {
                return 0
            }
            if r == ROWS - 1 {
                return grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2])
            }

            var res = 0
            for c1_d in -1...1 {
                for c2_d in -1...1 {
                    res = max(res, dfs(r + 1, c1 + c1_d, c2 + c2_d))
                }
            }
            return res + grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2])
        }

        return dfs(0, 0, COLS - 1)
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

### Intuition
The recursive solution recomputes the same states multiple times. Since the state is defined by `(r, c1, c2)`, we can use a 3D cache to store results for previously visited states. When we encounter a state we have already solved, we return the cached value instead of recomputing it.

### Algorithm
1. Create a 3D cache array of size `[ROWS][COLS][COLS]` initialized to `-1`.
2. In the recursive function, first check if the state is already in the cache. If so, return the cached value.
3. Perform the same logic as the recursive solution: handle base cases, try all 9 move combinations, and compute the maximum.
4. Before returning, store the computed result in the cache.
5. Return the cached result.

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

```csharp
public class Solution {
    private int[,,] cache;
    private int[][] grid;

    public int CherryPickup(int[][] grid) {
        this.grid = grid;
        int ROWS = grid.Length, COLS = grid[0].Length;
        cache = new int[ROWS, COLS, COLS];
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                for (int k = 0; k < COLS; k++) {
                    cache[i, j, k] = -1;
                }
            }
        }
        return Dfs(0, 0, COLS - 1, ROWS, COLS);
    }

    private int Dfs(int r, int c1, int c2, int ROWS, int COLS) {
        if (Math.Min(c1, c2) < 0 || Math.Max(c1, c2) >= COLS) {
            return 0;
        }
        if (cache[r, c1, c2] != -1) {
            return cache[r, c1, c2];
        }
        if (r == ROWS - 1) {
            return cache[r, c1, c2] = grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
        }

        int res = 0;
        for (int c1_d = -1; c1_d <= 1; c1_d++) {
            for (int c2_d = -1; c2_d <= 1; c2_d++) {
                res = Math.Max(res, Dfs(r + 1, c1 + c1_d, c2 + c2_d, ROWS, COLS));
            }
        }
        return cache[r, c1, c2] = res + grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
    }
}
```

```go
func cherryPickup(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    cache := make([][][]int, ROWS)
    for i := range cache {
        cache[i] = make([][]int, COLS)
        for j := range cache[i] {
            cache[i][j] = make([]int, COLS)
            for k := range cache[i][j] {
                cache[i][j][k] = -1
            }
        }
    }

    var dfs func(r, c1, c2 int) int
    dfs = func(r, c1, c2 int) int {
        if min(c1, c2) < 0 || max(c1, c2) >= COLS {
            return 0
        }
        if cache[r][c1][c2] != -1 {
            return cache[r][c1][c2]
        }
        if r == ROWS-1 {
            if c1 == c2 {
                cache[r][c1][c2] = grid[r][c1]
            } else {
                cache[r][c1][c2] = grid[r][c1] + grid[r][c2]
            }
            return cache[r][c1][c2]
        }

        res := 0
        for c1_d := -1; c1_d <= 1; c1_d++ {
            for c2_d := -1; c2_d <= 1; c2_d++ {
                res = max(res, dfs(r+1, c1+c1_d, c2+c2_d))
            }
        }
        if c1 == c2 {
            cache[r][c1][c2] = res + grid[r][c1]
        } else {
            cache[r][c1][c2] = res + grid[r][c1] + grid[r][c2]
        }
        return cache[r][c1][c2]
    }

    return dfs(0, 0, COLS-1)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun cherryPickup(grid: Array<IntArray>): Int {
        val ROWS = grid.size
        val COLS = grid[0].size
        val cache = Array(ROWS) { Array(COLS) { IntArray(COLS) { -1 } } }

        fun dfs(r: Int, c1: Int, c2: Int): Int {
            if (minOf(c1, c2) < 0 || maxOf(c1, c2) >= COLS) {
                return 0
            }
            if (cache[r][c1][c2] != -1) {
                return cache[r][c1][c2]
            }
            if (r == ROWS - 1) {
                cache[r][c1][c2] = grid[r][c1] + if (c1 == c2) 0 else grid[r][c2]
                return cache[r][c1][c2]
            }

            var res = 0
            for (c1_d in -1..1) {
                for (c2_d in -1..1) {
                    res = maxOf(res, dfs(r + 1, c1 + c1_d, c2 + c2_d))
                }
            }
            cache[r][c1][c2] = res + grid[r][c1] + if (c1 == c2) 0 else grid[r][c2]
            return cache[r][c1][c2]
        }

        return dfs(0, 0, COLS - 1)
    }
}
```

```swift
class Solution {
    func cherryPickup(_ grid: [[Int]]) -> Int {
        let ROWS = grid.count
        let COLS = grid[0].count
        var cache = Array(repeating: Array(repeating: Array(repeating: -1, count: COLS), count: COLS), count: ROWS)

        func dfs(_ r: Int, _ c1: Int, _ c2: Int) -> Int {
            if min(c1, c2) < 0 || max(c1, c2) >= COLS {
                return 0
            }
            if cache[r][c1][c2] != -1 {
                return cache[r][c1][c2]
            }
            if r == ROWS - 1 {
                cache[r][c1][c2] = grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2])
                return cache[r][c1][c2]
            }

            var res = 0
            for c1_d in -1...1 {
                for c2_d in -1...1 {
                    res = max(res, dfs(r + 1, c1 + c1_d, c2 + c2_d))
                }
            }
            cache[r][c1][c2] = res + grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2])
            return cache[r][c1][c2]
        }

        return dfs(0, 0, COLS - 1)
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

### Intuition
Instead of using recursion with memoization, we can build the solution iteratively from the bottom row up. For each cell combination at row `r`, we look at all possible transitions from row `r+1` and take the maximum. This eliminates recursion overhead and makes the computation order explicit.

### Algorithm
1. Create a 3D DP array of size `[ROWS][COLS][COLS]`.
2. Process rows from bottom to top (`r = ROWS-1` to `0`).
3. For each `(c1, c2)` pair at row `r`:
   - Calculate cherries at current positions (handling overlap).
   - If at the last row, the value is just the current cherries.
   - Otherwise, look at all 9 possible `(nc1, nc2)` positions in row `r+1`.
   - Take the maximum from valid next positions and add current cherries.
4. Store the result in `dp[r][c1][c2]`.
5. Return `dp[0][0][COLS-1]`.

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

```csharp
public class Solution {
    public int CherryPickup(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int[,,] dp = new int[ROWS, COLS, COLS];

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
                                    maxCherries = Math.Max(maxCherries, dp[r + 1, nc1, nc2]);
                                }
                            }
                        }
                        res += maxCherries;
                    }

                    dp[r, c1, c2] = res;
                }
            }
        }

        return dp[0, 0, COLS - 1];
    }
}
```

```go
func cherryPickup(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    dp := make([][][]int, ROWS)
    for i := range dp {
        dp[i] = make([][]int, COLS)
        for j := range dp[i] {
            dp[i][j] = make([]int, COLS)
        }
    }

    for r := ROWS - 1; r >= 0; r-- {
        for c1 := 0; c1 < COLS; c1++ {
            for c2 := 0; c2 < COLS; c2++ {
                res := grid[r][c1]
                if c1 != c2 {
                    res += grid[r][c2]
                }

                if r != ROWS-1 {
                    maxCherries := 0
                    for d1 := -1; d1 <= 1; d1++ {
                        for d2 := -1; d2 <= 1; d2++ {
                            nc1, nc2 := c1+d1, c2+d2
                            if nc1 >= 0 && nc1 < COLS && nc2 >= 0 && nc2 < COLS {
                                if dp[r+1][nc1][nc2] > maxCherries {
                                    maxCherries = dp[r+1][nc1][nc2]
                                }
                            }
                        }
                    }
                    res += maxCherries
                }

                dp[r][c1][c2] = res
            }
        }
    }

    return dp[0][0][COLS-1]
}
```

```kotlin
class Solution {
    fun cherryPickup(grid: Array<IntArray>): Int {
        val ROWS = grid.size
        val COLS = grid[0].size
        val dp = Array(ROWS) { Array(COLS) { IntArray(COLS) } }

        for (r in ROWS - 1 downTo 0) {
            for (c1 in 0 until COLS) {
                for (c2 in 0 until COLS) {
                    var res = grid[r][c1]
                    if (c1 != c2) {
                        res += grid[r][c2]
                    }

                    if (r != ROWS - 1) {
                        var maxCherries = 0
                        for (d1 in -1..1) {
                            for (d2 in -1..1) {
                                val nc1 = c1 + d1
                                val nc2 = c2 + d2
                                if (nc1 in 0 until COLS && nc2 in 0 until COLS) {
                                    maxCherries = maxOf(maxCherries, dp[r + 1][nc1][nc2])
                                }
                            }
                        }
                        res += maxCherries
                    }

                    dp[r][c1][c2] = res
                }
            }
        }

        return dp[0][0][COLS - 1]
    }
}
```

```swift
class Solution {
    func cherryPickup(_ grid: [[Int]]) -> Int {
        let ROWS = grid.count
        let COLS = grid[0].count
        var dp = Array(repeating: Array(repeating: Array(repeating: 0, count: COLS), count: COLS), count: ROWS)

        for r in stride(from: ROWS - 1, through: 0, by: -1) {
            for c1 in 0..<COLS {
                for c2 in 0..<COLS {
                    var res = grid[r][c1]
                    if c1 != c2 {
                        res += grid[r][c2]
                    }

                    if r != ROWS - 1 {
                        var maxCherries = 0
                        for d1 in -1...1 {
                            for d2 in -1...1 {
                                let nc1 = c1 + d1
                                let nc2 = c2 + d2
                                if nc1 >= 0 && nc1 < COLS && nc2 >= 0 && nc2 < COLS {
                                    maxCherries = max(maxCherries, dp[r + 1][nc1][nc2])
                                }
                            }
                        }
                        res += maxCherries
                    }

                    dp[r][c1][c2] = res
                }
            }
        }

        return dp[0][0][COLS - 1]
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

### Intuition
Since each row's computation only depends on the row below it, we do not need to store the entire 3D array. We can use two 2D arrays: one for the current row and one for the previous row (the row below). After processing each row, we swap them. This reduces space complexity from `O(n * m^2)` to `O(m^2)`.

### Algorithm
1. Create a 2D `dp` array of size `[COLS][COLS]` for the previous row's results.
2. Process rows from bottom to top.
3. For each row, create a new 2D `cur_dp` array for the current row.
4. For each `(c1, c2)` pair where `c1 <= c2`:
   - Calculate cherries at current positions.
   - Look at all 9 next positions in the `dp` array (previous row).
   - Take the maximum and add current cherries.
5. After processing the row, set `dp = cur_dp`.
6. Return `dp[0][COLS-1]`.

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

```csharp
public class Solution {
    public int CherryPickup(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int[,] dp = new int[COLS, COLS];

        for (int r = ROWS - 1; r >= 0; r--) {
            int[,] cur_dp = new int[COLS, COLS];
            for (int c1 = 0; c1 < COLS; c1++) {
                for (int c2 = c1; c2 < COLS; c2++) {
                    int maxCherries = 0;
                    int cherries = grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2]);
                    for (int d1 = -1; d1 <= 1; d1++) {
                        for (int d2 = -1; d2 <= 1; d2++) {
                            int nc1 = c1 + d1, nc2 = c2 + d2;
                            if (nc1 >= 0 && nc1 < COLS && nc2 >= 0 && nc2 < COLS) {
                                maxCherries = Math.Max(maxCherries, cherries + dp[nc1, nc2]);
                            }
                        }
                    }
                    cur_dp[c1, c2] = maxCherries;
                }
            }
            dp = cur_dp;
        }
        return dp[0, COLS - 1];
    }
}
```

```go
func cherryPickup(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    dp := make([][]int, COLS)
    for i := range dp {
        dp[i] = make([]int, COLS)
    }

    for r := ROWS - 1; r >= 0; r-- {
        cur_dp := make([][]int, COLS)
        for i := range cur_dp {
            cur_dp[i] = make([]int, COLS)
        }
        for c1 := 0; c1 < COLS; c1++ {
            for c2 := c1; c2 < COLS; c2++ {
                maxCherries := 0
                cherries := grid[r][c1]
                if c1 != c2 {
                    cherries += grid[r][c2]
                }
                for d1 := -1; d1 <= 1; d1++ {
                    for d2 := -1; d2 <= 1; d2++ {
                        nc1, nc2 := c1+d1, c2+d2
                        if nc1 >= 0 && nc1 < COLS && nc2 >= 0 && nc2 < COLS {
                            if cherries+dp[nc1][nc2] > maxCherries {
                                maxCherries = cherries + dp[nc1][nc2]
                            }
                        }
                    }
                }
                cur_dp[c1][c2] = maxCherries
            }
        }
        dp = cur_dp
    }

    return dp[0][COLS-1]
}
```

```kotlin
class Solution {
    fun cherryPickup(grid: Array<IntArray>): Int {
        val ROWS = grid.size
        val COLS = grid[0].size
        var dp = Array(COLS) { IntArray(COLS) }

        for (r in ROWS - 1 downTo 0) {
            val cur_dp = Array(COLS) { IntArray(COLS) }
            for (c1 in 0 until COLS) {
                for (c2 in c1 until COLS) {
                    var maxCherries = 0
                    val cherries = grid[r][c1] + if (c1 == c2) 0 else grid[r][c2]
                    for (d1 in -1..1) {
                        for (d2 in -1..1) {
                            val nc1 = c1 + d1
                            val nc2 = c2 + d2
                            if (nc1 in 0 until COLS && nc2 in 0 until COLS) {
                                maxCherries = maxOf(maxCherries, cherries + dp[nc1][nc2])
                            }
                        }
                    }
                    cur_dp[c1][c2] = maxCherries
                }
            }
            dp = cur_dp
        }
        return dp[0][COLS - 1]
    }
}
```

```swift
class Solution {
    func cherryPickup(_ grid: [[Int]]) -> Int {
        let ROWS = grid.count
        let COLS = grid[0].count
        var dp = Array(repeating: Array(repeating: 0, count: COLS), count: COLS)

        for r in stride(from: ROWS - 1, through: 0, by: -1) {
            var cur_dp = Array(repeating: Array(repeating: 0, count: COLS), count: COLS)
            for c1 in 0..<COLS {
                for c2 in c1..<COLS {
                    var maxCherries = 0
                    let cherries = grid[r][c1] + (c1 == c2 ? 0 : grid[r][c2])
                    for d1 in -1...1 {
                        for d2 in -1...1 {
                            let nc1 = c1 + d1
                            let nc2 = c2 + d2
                            if nc1 >= 0 && nc1 < COLS && nc2 >= 0 && nc2 < COLS {
                                maxCherries = max(maxCherries, cherries + dp[nc1][nc2])
                            }
                        }
                    }
                    cur_dp[c1][c2] = maxCherries
                }
            }
            dp = cur_dp
        }

        return dp[0][COLS - 1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m ^ 2)$
- Space complexity: $O(m ^ 2)$

> Where $n$ is the number of rows and $m$ is the number of columns in the grid.

---

## Common Pitfalls

### Double Counting Cherries When Robots Overlap
Forgetting to check if both robots land on the same cell and counting cherries twice. When `c1 == c2`, you must only add `grid[r][c1]` once, not `grid[r][c1] + grid[r][c2]`.

```python
# Wrong: always adds both
res = grid[r][c1] + grid[r][c2]

# Correct: check for overlap
res = grid[r][c1] + (grid[r][c2] if c1 != c2 else 0)
```

### Using 4 Directions Instead of 3
Treating this like a general grid traversal where robots can move in any direction. Each robot can only move down-left, down, or down-right (3 choices), not up or stay in place. This gives 9 total combinations per step, not 16.

### Incorrect State Space for Memoization
Using only `(r, c1)` or `(r, c2)` for caching, forgetting that the state depends on both robot positions simultaneously. The correct state is `(r, c1, c2)` since both robots move together row by row.

### Off-by-One Error on Base Case
Checking `r == ROWS` instead of `r == ROWS - 1` for the base case. Since indexing is 0-based, the last row is at index `ROWS - 1`, and that is where you should collect final cherries and stop recursion.
