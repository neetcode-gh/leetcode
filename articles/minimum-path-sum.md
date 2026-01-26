## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Recursion** - The brute force solution explores all paths using recursive calls
- **Dynamic Programming** - Both top-down (memoization) and bottom-up (tabulation) approaches are used
- **2D Grid Traversal** - Understanding how to navigate a grid moving only right or down
- **Space Optimization** - The optimal solution reduces 2D DP to 1D by reusing a single array

---

## 1. Recursion

### Intuition

From any cell, we can only move right or down. To find the minimum path sum to the bottom-right corner, we consider both choices and take the minimum. At the destination cell, we simply return its value. This naturally leads to a recursive solution where we explore all possible paths by branching at each cell.

### Algorithm

1. Define a recursive function `dfs(r, c)` that returns the minimum path sum from cell `(r, c)` to the bottom-right.
2. Base case: if we reach the bottom-right cell, return `grid[r][c]`.
3. If we go out of bounds (past the last row or column), return infinity to indicate an invalid path.
4. For each cell, return `grid[r][c] + min(dfs(r+1, c), dfs(r, c+1))`.
5. Start the recursion from `dfs(0, 0)`.

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

```go
func minPathSum(grid [][]int) int {
    var dfs func(r, c int) int
    dfs = func(r, c int) int {
        if r == len(grid)-1 && c == len(grid[0])-1 {
            return grid[r][c]
        }
        if r == len(grid) || c == len(grid[0]) {
            return 1 << 30
        }
        return grid[r][c] + min(dfs(r+1, c), dfs(r, c+1))
    }
    return dfs(0, 0)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun minPathSum(grid: Array<IntArray>): Int {
        fun dfs(r: Int, c: Int): Int {
            if (r == grid.size - 1 && c == grid[0].size - 1) {
                return grid[r][c]
            }
            if (r == grid.size || c == grid[0].size) {
                return Int.MAX_VALUE
            }
            return grid[r][c] + minOf(dfs(r + 1, c), dfs(r, c + 1))
        }
        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func minPathSum(_ grid: [[Int]]) -> Int {
        func dfs(_ r: Int, _ c: Int) -> Int {
            if r == grid.count - 1 && c == grid[0].count - 1 {
                return grid[r][c]
            }
            if r == grid.count || c == grid[0].count {
                return Int.max
            }
            return grid[r][c] + min(dfs(r + 1, c), dfs(r, c + 1))
        }
        return dfs(0, 0)
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

### Intuition

The plain recursive solution recalculates the same cells many times. For instance, both `dfs(0,1)` and `dfs(1,0)` might call `dfs(1,1)`. By caching (memoizing) results for each cell, we ensure each subproblem is solved only once. This transforms exponential time into polynomial time.

### Algorithm

1. Create a 2D memoization table `dp` initialized to `-1` (indicating uncomputed).
2. Define `dfs(r, c)` as before, but first check if `dp[r][c]` has been computed.
3. If `dp[r][c] != -1`, return the cached value.
4. Otherwise, compute `dp[r][c] = grid[r][c] + min(dfs(r+1, c), dfs(r, c+1))` and return it.
5. Return `dfs(0, 0)`.

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

```go
func minPathSum(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    dp := make([][]int, m)
    for i := range dp {
        dp[i] = make([]int, n)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(r, c int) int
    dfs = func(r, c int) int {
        if r == m-1 && c == n-1 {
            return grid[r][c]
        }
        if r == m || c == n {
            return 1 << 30
        }
        if dp[r][c] != -1 {
            return dp[r][c]
        }

        dp[r][c] = grid[r][c] + min(dfs(r+1, c), dfs(r, c+1))
        return dp[r][c]
    }

    return dfs(0, 0)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun minPathSum(grid: Array<IntArray>): Int {
        val m = grid.size
        val n = grid[0].size
        val dp = Array(m) { IntArray(n) { -1 } }

        fun dfs(r: Int, c: Int): Int {
            if (r == m - 1 && c == n - 1) {
                return grid[r][c]
            }
            if (r == m || c == n) {
                return Int.MAX_VALUE
            }
            if (dp[r][c] != -1) {
                return dp[r][c]
            }

            dp[r][c] = grid[r][c] + minOf(dfs(r + 1, c), dfs(r, c + 1))
            return dp[r][c]
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func minPathSum(_ grid: [[Int]]) -> Int {
        let m = grid.count, n = grid[0].count
        var dp = [[Int]](repeating: [Int](repeating: -1, count: n), count: m)

        func dfs(_ r: Int, _ c: Int) -> Int {
            if r == m - 1 && c == n - 1 {
                return grid[r][c]
            }
            if r == m || c == n {
                return Int.max
            }
            if dp[r][c] != -1 {
                return dp[r][c]
            }

            dp[r][c] = grid[r][c] + min(dfs(r + 1, c), dfs(r, c + 1))
            return dp[r][c]
        }

        return dfs(0, 0)
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

### Intuition

Instead of recursing from top-left to bottom-right, we can fill a DP table starting from the bottom-right corner. For each cell, we know the minimum path sum to reach the destination from the cell below and from the cell to the right. We take the minimum of these two and add the current cell value. This iterative approach avoids recursion overhead.

### Algorithm

1. Create a DP table of size `(ROWS+1) x (COLS+1)` initialized to infinity. The extra row and column handle boundary conditions.
2. Set `dp[ROWS-1][COLS] = 0` as the base case (one position past the destination, allowing the destination cell to be computed correctly).
3. Iterate from bottom-right to top-left: for each cell `(r, c)`, set `dp[r][c] = grid[r][c] + min(dp[r+1][c], dp[r][c+1])`.
4. Return `dp[0][0]`.

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

```go
func minPathSum(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    dp := make([][]int, ROWS+1)
    for i := range dp {
        dp[i] = make([]int, COLS+1)
        for j := range dp[i] {
            dp[i][j] = 1 << 30
        }
    }
    dp[ROWS-1][COLS] = 0

    for r := ROWS - 1; r >= 0; r-- {
        for c := COLS - 1; c >= 0; c-- {
            dp[r][c] = grid[r][c] + min(dp[r+1][c], dp[r][c+1])
        }
    }

    return dp[0][0]
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun minPathSum(grid: Array<IntArray>): Int {
        val ROWS = grid.size
        val COLS = grid[0].size
        val dp = Array(ROWS + 1) { IntArray(COLS + 1) { Int.MAX_VALUE } }
        dp[ROWS - 1][COLS] = 0

        for (r in ROWS - 1 downTo 0) {
            for (c in COLS - 1 downTo 0) {
                dp[r][c] = grid[r][c] + minOf(dp[r + 1][c], dp[r][c + 1])
            }
        }

        return dp[0][0]
    }
}
```

```swift
class Solution {
    func minPathSum(_ grid: [[Int]]) -> Int {
        let ROWS = grid.count, COLS = grid[0].count
        var dp = [[Int]](repeating: [Int](repeating: Int.max, count: COLS + 1), count: ROWS + 1)
        dp[ROWS - 1][COLS] = 0

        for r in stride(from: ROWS - 1, through: 0, by: -1) {
            for c in stride(from: COLS - 1, through: 0, by: -1) {
                dp[r][c] = grid[r][c] + min(dp[r + 1][c], dp[r][c + 1])
            }
        }

        return dp[0][0]
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

### Intuition

When filling the DP table row by row (from bottom to top), we only need the current row and the row below. In fact, since we process columns right to left, we can overwrite the same 1D array. The value at `dp[c]` represents the minimum path sum from `(r+1, c)`, and `dp[c+1]` represents the path from `(r, c+1)`. After updating, `dp[c]` will hold the result for `(r, c)`.

### Algorithm

1. Create a 1D array `dp` of size `COLS+1` initialized to infinity.
2. Set `dp[COLS-1] = 0` as the base case.
3. For each row from bottom to top:
   - For each column from right to left: `dp[c] = grid[r][c] + min(dp[c], dp[c+1])`.
4. Return `dp[0]`.

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

```go
func minPathSum(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    dp := make([]int, COLS+1)
    for i := range dp {
        dp[i] = 1 << 30
    }
    dp[COLS-1] = 0

    for r := ROWS - 1; r >= 0; r-- {
        for c := COLS - 1; c >= 0; c-- {
            dp[c] = grid[r][c] + min(dp[c], dp[c+1])
        }
    }

    return dp[0]
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun minPathSum(grid: Array<IntArray>): Int {
        val ROWS = grid.size
        val COLS = grid[0].size
        val dp = IntArray(COLS + 1) { Int.MAX_VALUE }
        dp[COLS - 1] = 0

        for (r in ROWS - 1 downTo 0) {
            for (c in COLS - 1 downTo 0) {
                dp[c] = grid[r][c] + minOf(dp[c], dp[c + 1])
            }
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func minPathSum(_ grid: [[Int]]) -> Int {
        let ROWS = grid.count, COLS = grid[0].count
        var dp = [Int](repeating: Int.max, count: COLS + 1)
        dp[COLS - 1] = 0

        for r in stride(from: ROWS - 1, through: 0, by: -1) {
            for c in stride(from: COLS - 1, through: 0, by: -1) {
                dp[c] = grid[r][c] + min(dp[c], dp[c + 1])
            }
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## Common Pitfalls

### Incorrect Boundary Initialization

When using bottom-up DP, the extra row and column must be initialized to infinity (or a very large value), except for one cell that serves as the base case. Initializing boundaries to `0` instead of infinity causes the algorithm to prefer going out of bounds, producing incorrect minimum sums.

### Integer Overflow with MAX_VALUE

When adding `grid[r][c]` to `Integer.MAX_VALUE` (or equivalent), the result overflows to a negative number, which then incorrectly becomes the minimum. Use a large but safe value like `1 << 30` instead, or add overflow checks before the addition.

### Wrong Iteration Direction in Space-Optimized Solution

In the 1D DP optimization, the iteration direction matters. When processing from bottom-right to top-left, you must iterate columns right-to-left within each row. Iterating left-to-right overwrites values before they are used, corrupting the DP state and producing wrong answers.
