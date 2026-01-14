## 1. Recursion

### Intuition

Unlike the standard falling path problem where we can move to adjacent columns, here we must pick a different column in each row. For each cell in a row, we recursively try all columns in the next row except the current one. This constraint increases complexity since we need to consider more transitions. The brute force approach explores all valid paths.

### Algorithm

1. Define `helper(r, c)` that returns the minimum path sum from cell `(r, c)` to the last row.
2. Base case: if `r == n-1`, return `grid[r][c]` (we've reached the last row).
3. For each column `next_col` in the next row where `next_col != c`:
   - Recursively compute the path sum and track the minimum.
4. Return `grid[r][c]` plus the minimum path sum found.
5. Try starting from each column in row `0` and return the minimum result.

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        N = len(grid)

        def helper(r, c):
            if r == N - 1:
                return grid[r][c]
            res = float("inf")
            for next_col in range(N):
                if c != next_col:
                    res = min(res, grid[r][c] + helper(r + 1, next_col))
            return res

        res = float("inf")
        for c in range(N):
            res = min(res, helper(0, c))
        return res
```

```java
public class Solution {
    private int helper(int[][] grid, int r, int c) {
        int N = grid.length;
        if (r == N - 1) {
            return grid[r][c];
        }
        int res = Integer.MAX_VALUE;
        for (int nextCol = 0; nextCol < N; nextCol++) {
            if (c != nextCol) {
                res = Math.min(res, grid[r][c] + helper(grid, r + 1, nextCol));
            }
        }
        return res;
    }

    public int minFallingPathSum(int[][] grid) {
        int N = grid.length;
        int res = Integer.MAX_VALUE;
        for (int c = 0; c < N; c++) {
            res = Math.min(res, helper(grid, 0, c));
        }
        return res;
    }
}
```

```cpp
class Solution {
    int helper(vector<vector<int>>& grid, int r, int c) {
        int N = grid.size();
        if (r == N - 1) {
            return grid[r][c];
        }
        int res = INT_MAX;
        for (int nextCol = 0; nextCol < N; nextCol++) {
            if (c != nextCol) {
                res = min(res, grid[r][c] + helper(grid, r + 1, nextCol));
            }
        }
        return res;
    }

public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int N = grid.size();
        int res = INT_MAX;
        for (int c = 0; c < N; c++) {
            res = min(res, helper(grid, 0, c));
        }
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
    minFallingPathSum(grid) {
        const N = grid.length;

        const helper = (r, c) => {
            if (r === N - 1) return grid[r][c];
            let res = Infinity;
            for (let nextCol = 0; nextCol < N; nextCol++) {
                if (c !== nextCol) {
                    res = Math.min(res, grid[r][c] + helper(r + 1, nextCol));
                }
            }
            return res;
        };

        let res = Infinity;
        for (let c = 0; c < N; c++) {
            res = Math.min(res, helper(0, c));
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinFallingPathSum(int[][] grid) {
        int N = grid.Length;
        int res = int.MaxValue;
        for (int c = 0; c < N; c++) {
            res = Math.Min(res, Helper(grid, 0, c, N));
        }
        return res;
    }

    private int Helper(int[][] grid, int r, int c, int N) {
        if (r == N - 1) {
            return grid[r][c];
        }
        int res = int.MaxValue;
        for (int nextCol = 0; nextCol < N; nextCol++) {
            if (c != nextCol) {
                res = Math.Min(res, grid[r][c] + Helper(grid, r + 1, nextCol, N));
            }
        }
        return res;
    }
}
```

```go
func minFallingPathSum(grid [][]int) int {
    n := len(grid)

    var helper func(r, c int) int
    helper = func(r, c int) int {
        if r == n-1 {
            return grid[r][c]
        }
        res := math.MaxInt32
        for nextCol := 0; nextCol < n; nextCol++ {
            if c != nextCol {
                res = min(res, grid[r][c]+helper(r+1, nextCol))
            }
        }
        return res
    }

    res := math.MaxInt32
    for c := 0; c < n; c++ {
        res = min(res, helper(0, c))
    }
    return res
}
```

```kotlin
class Solution {
    fun minFallingPathSum(grid: Array<IntArray>): Int {
        val n = grid.size

        fun helper(r: Int, c: Int): Int {
            if (r == n - 1) return grid[r][c]
            var res = Int.MAX_VALUE
            for (nextCol in 0 until n) {
                if (c != nextCol) {
                    res = minOf(res, grid[r][c] + helper(r + 1, nextCol))
                }
            }
            return res
        }

        var res = Int.MAX_VALUE
        for (c in 0 until n) {
            res = minOf(res, helper(0, c))
        }
        return res
    }
}
```

```swift
class Solution {
    func minFallingPathSum(_ grid: [[Int]]) -> Int {
        let n = grid.count

        func helper(_ r: Int, _ c: Int) -> Int {
            if r == n - 1 {
                return grid[r][c]
            }
            var res = Int.max
            for nextCol in 0..<n {
                if c != nextCol {
                    res = min(res, grid[r][c] + helper(r + 1, nextCol))
                }
            }
            return res
        }

        var res = Int.max
        for c in 0..<n {
            res = min(res, helper(0, c))
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution recomputes the same `(r, c)` states multiple times. By storing computed results in a memoization table, we ensure each state is solved only once. This reduces time complexity from exponential to O(n^3), since for each of the n^2 cells, we may consider up to n transitions.

### Algorithm

1. Create a memo table (dictionary or 2D array) to cache results.
2. Define `helper(r, c)` that returns the minimum path sum from `(r, c)` to the last row.
3. If `(r, c)` is already computed, return the cached value.
4. Base case: if `r == n-1`, return `grid[r][c]`.
5. For each `next_col != c`, recursively compute and track the minimum.
6. Cache and return `grid[r][c]` plus the minimum found.
7. Return the minimum among all starting columns.

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        N = len(grid)
        cache = {}

        def helper(r, c):
            if r == N - 1:
                return grid[r][c]
            if (r, c) in cache:
                return cache[(r, c)]

            res = float("inf")
            for next_col in range(N):
                if c != next_col:
                    res = min(res, grid[r][c] + helper(r + 1, next_col))
            cache[(r, c)] = res
            return res

        res = float("inf")
        for c in range(N):
            res = min(res, helper(0, c))
        return res
```

```java
public class Solution {
    private int[][] memo;

    private int helper(int[][] grid, int r, int c) {
        int N = grid.length;
        if (r == N - 1) {
            return grid[r][c];
        }
        if (memo[r][c] != Integer.MIN_VALUE) {
            return memo[r][c];
        }

        int res = Integer.MAX_VALUE;
        for (int nextCol = 0; nextCol < N; nextCol++) {
            if (c != nextCol) {
                res = Math.min(res, grid[r][c] + helper(grid, r + 1, nextCol));
            }
        }
        memo[r][c] = res;
        return res;
    }

    public int minFallingPathSum(int[][] grid) {
        int N = grid.length;
        memo = new int[N][N];
        for (int[] row : memo) {
            Arrays.fill(row, Integer.MIN_VALUE);
        }
        int res = Integer.MAX_VALUE;
        for (int c = 0; c < N; c++) {
            res = Math.min(res, helper(grid, 0, c));
        }
        return res;
    }
}
```

```cpp
class Solution {
    vector<vector<int>> memo;

    int helper(vector<vector<int>>& grid, int r, int c) {
        int N = grid.size();
        if (r == N - 1) {
            return grid[r][c];
        }
        if (memo[r][c] != INT_MIN) {
            return memo[r][c];
        }
        int res = INT_MAX;
        for (int nextCol = 0; nextCol < N; nextCol++) {
            if (c != nextCol) {
                res = min(res, grid[r][c] + helper(grid, r + 1, nextCol));
            }
        }
        memo[r][c] = res;
        return res;
    }

public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int N = grid.size();
        memo.assign(N, vector<int>(N, INT_MIN));
        int res = INT_MAX;
        for (int c = 0; c < N; c++) {
            res = min(res, helper(grid, 0, c));
        }
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
    minFallingPathSum(grid) {
        const N = grid.length;
        const memo = Array.from({ length: N }, () => Array(N).fill(-Infinity));

        const helper = (r, c) => {
            if (r === N - 1) return grid[r][c];
            if (memo[r][c] !== -Infinity) return memo[r][c];
            let res = Infinity;
            for (let nextCol = 0; nextCol < N; nextCol++) {
                if (c !== nextCol) {
                    res = Math.min(res, grid[r][c] + helper(r + 1, nextCol));
                }
            }
            memo[r][c] = res;
            return res;
        };

        let res = Infinity;
        for (let c = 0; c < N; c++) {
            res = Math.min(res, helper(0, c));
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private int[,] memo;

    public int MinFallingPathSum(int[][] grid) {
        int N = grid.Length;
        memo = new int[N, N];
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                memo[i, j] = int.MinValue;
            }
        }
        int res = int.MaxValue;
        for (int c = 0; c < N; c++) {
            res = Math.Min(res, Helper(grid, 0, c, N));
        }
        return res;
    }

    private int Helper(int[][] grid, int r, int c, int N) {
        if (r == N - 1) return grid[r][c];
        if (memo[r, c] != int.MinValue) return memo[r, c];

        int res = int.MaxValue;
        for (int nextCol = 0; nextCol < N; nextCol++) {
            if (c != nextCol) {
                res = Math.Min(res, grid[r][c] + Helper(grid, r + 1, nextCol, N));
            }
        }
        memo[r, c] = res;
        return res;
    }
}
```

```go
func minFallingPathSum(grid [][]int) int {
    n := len(grid)
    memo := make([][]int, n)
    for i := range memo {
        memo[i] = make([]int, n)
        for j := range memo[i] {
            memo[i][j] = math.MinInt32
        }
    }

    var helper func(r, c int) int
    helper = func(r, c int) int {
        if r == n-1 {
            return grid[r][c]
        }
        if memo[r][c] != math.MinInt32 {
            return memo[r][c]
        }
        res := math.MaxInt32
        for nextCol := 0; nextCol < n; nextCol++ {
            if c != nextCol {
                res = min(res, grid[r][c]+helper(r+1, nextCol))
            }
        }
        memo[r][c] = res
        return res
    }

    res := math.MaxInt32
    for c := 0; c < n; c++ {
        res = min(res, helper(0, c))
    }
    return res
}
```

```kotlin
class Solution {
    fun minFallingPathSum(grid: Array<IntArray>): Int {
        val n = grid.size
        val memo = Array(n) { IntArray(n) { Int.MIN_VALUE } }

        fun helper(r: Int, c: Int): Int {
            if (r == n - 1) return grid[r][c]
            if (memo[r][c] != Int.MIN_VALUE) return memo[r][c]

            var res = Int.MAX_VALUE
            for (nextCol in 0 until n) {
                if (c != nextCol) {
                    res = minOf(res, grid[r][c] + helper(r + 1, nextCol))
                }
            }
            memo[r][c] = res
            return res
        }

        var res = Int.MAX_VALUE
        for (c in 0 until n) {
            res = minOf(res, helper(0, c))
        }
        return res
    }
}
```

```swift
class Solution {
    func minFallingPathSum(_ grid: [[Int]]) -> Int {
        let n = grid.count
        var memo = Array(repeating: Array(repeating: Int.min, count: n), count: n)

        func helper(_ r: Int, _ c: Int) -> Int {
            if r == n - 1 {
                return grid[r][c]
            }
            if memo[r][c] != Int.min {
                return memo[r][c]
            }
            var res = Int.max
            for nextCol in 0..<n {
                if c != nextCol {
                    res = min(res, grid[r][c] + helper(r + 1, nextCol))
                }
            }
            memo[r][c] = res
            return res
        }

        var res = Int.max
        for c in 0..<n {
            res = min(res, helper(0, c))
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We can build the solution iteratively from the last row upward. For each cell, we compute the minimum path sum by considering all columns in the next row except the current one. This bottom-up approach fills a 2D DP table where `dp[r][c]` represents the minimum path sum from cell `(r, c)` to any cell in the last row.

### Algorithm

1. Create a 2D DP table initialized to infinity.
2. Fill the last row: `dp[n-1][c] = grid[n-1][c]` for all columns.
3. For each row `r` from `n-2` down to `0`:
   - For each column `c`:
     - For each `next_col != c`:
       - Update `dp[r][c] = min(dp[r][c], grid[r][c] + dp[r+1][next_col])`.
4. Return the minimum value in `dp[0]`.

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        N = len(grid)
        dp = [[float("inf")] * N for _ in range(N)]

        for c in range(N):
            dp[N - 1][c] = grid[N - 1][c]

        for r in range(N - 2, -1, -1):
            for c in range(N):
                for next_col in range(N):
                    if c != next_col:
                        dp[r][c] = min(dp[r][c], grid[r][c] + dp[r + 1][next_col])

        return min(dp[0])
```

```java
public class Solution {
    public int minFallingPathSum(int[][] grid) {
        int N = grid.length;
        int[][] dp = new int[N][N];

        for (int c = 0; c < N; c++) {
            dp[N - 1][c] = grid[N - 1][c];
        }

        for (int r = N - 2; r >= 0; r--) {
            for (int c = 0; c < N; c++) {
                dp[r][c] = Integer.MAX_VALUE;
                for (int nextCol = 0; nextCol < N; nextCol++) {
                    if (c != nextCol) {
                        dp[r][c] = Math.min(dp[r][c], grid[r][c] + dp[r + 1][nextCol]);
                    }
                }
            }
        }

        int res = Integer.MAX_VALUE;
        for (int c = 0; c < N; c++) {
            res = Math.min(res, dp[0][c]);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<vector<int>> dp(N, vector<int>(N, INT_MAX));

        for (int c = 0; c < N; c++) {
            dp[N - 1][c] = grid[N - 1][c];
        }

        for (int r = N - 2; r >= 0; r--) {
            for (int c = 0; c < N; c++) {
                dp[r][c] = INT_MAX;
                for (int nextCol = 0; nextCol < N; nextCol++) {
                    if (c != nextCol) {
                        dp[r][c] = min(dp[r][c], grid[r][c] + dp[r + 1][nextCol]);
                    }
                }
            }
        }

        int res = INT_MAX;
        for (int c = 0; c < N; c++) {
            res = min(res, dp[0][c]);
        }
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
    minFallingPathSum(grid) {
        const N = grid.length;
        const dp = Array.from({ length: N }, () => Array(N).fill(Infinity));

        for (let c = 0; c < N; c++) {
            dp[N - 1][c] = grid[N - 1][c];
        }

        for (let r = N - 2; r >= 0; r--) {
            for (let c = 0; c < N; c++) {
                for (let nextCol = 0; nextCol < N; nextCol++) {
                    if (c !== nextCol) {
                        dp[r][c] = Math.min(
                            dp[r][c],
                            grid[r][c] + dp[r + 1][nextCol],
                        );
                    }
                }
            }
        }

        return Math.min(...dp[0]);
    }
}
```

```csharp
public class Solution {
    public int MinFallingPathSum(int[][] grid) {
        int N = grid.Length;
        int[,] dp = new int[N, N];

        for (int c = 0; c < N; c++) {
            dp[N - 1, c] = grid[N - 1][c];
        }

        for (int r = N - 2; r >= 0; r--) {
            for (int c = 0; c < N; c++) {
                dp[r, c] = int.MaxValue;
                for (int nextCol = 0; nextCol < N; nextCol++) {
                    if (c != nextCol) {
                        dp[r, c] = Math.Min(dp[r, c], grid[r][c] + dp[r + 1, nextCol]);
                    }
                }
            }
        }

        int res = int.MaxValue;
        for (int c = 0; c < N; c++) {
            res = Math.Min(res, dp[0, c]);
        }
        return res;
    }
}
```

```go
func minFallingPathSum(grid [][]int) int {
    n := len(grid)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, n)
        for j := range dp[i] {
            dp[i][j] = math.MaxInt32
        }
    }

    for c := 0; c < n; c++ {
        dp[n-1][c] = grid[n-1][c]
    }

    for r := n - 2; r >= 0; r-- {
        for c := 0; c < n; c++ {
            for nextCol := 0; nextCol < n; nextCol++ {
                if c != nextCol {
                    dp[r][c] = min(dp[r][c], grid[r][c]+dp[r+1][nextCol])
                }
            }
        }
    }

    res := math.MaxInt32
    for c := 0; c < n; c++ {
        res = min(res, dp[0][c])
    }
    return res
}
```

```kotlin
class Solution {
    fun minFallingPathSum(grid: Array<IntArray>): Int {
        val n = grid.size
        val dp = Array(n) { IntArray(n) { Int.MAX_VALUE } }

        for (c in 0 until n) {
            dp[n - 1][c] = grid[n - 1][c]
        }

        for (r in n - 2 downTo 0) {
            for (c in 0 until n) {
                for (nextCol in 0 until n) {
                    if (c != nextCol) {
                        dp[r][c] = minOf(dp[r][c], grid[r][c] + dp[r + 1][nextCol])
                    }
                }
            }
        }

        return dp[0].minOrNull()!!
    }
}
```

```swift
class Solution {
    func minFallingPathSum(_ grid: [[Int]]) -> Int {
        let n = grid.count
        var dp = Array(repeating: Array(repeating: Int.max, count: n), count: n)

        for c in 0..<n {
            dp[n - 1][c] = grid[n - 1][c]
        }

        for r in stride(from: n - 2, through: 0, by: -1) {
            for c in 0..<n {
                for nextCol in 0..<n {
                    if c != nextCol {
                        dp[r][c] = min(dp[r][c], grid[r][c] + dp[r + 1][nextCol])
                    }
                }
            }
        }

        return dp[0].min()!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

Since each row only depends on the next row's values, we can reduce space from O(n^2) to O(n) by using a single 1D array. We process rows from top to bottom, updating the array for each row while referencing the values from the previous iteration.

### Algorithm

1. Initialize DP array with the first row of the grid.
2. For each subsequent row `r`:
   - Create a new DP array for the current row.
   - For each column `curr_c`:
     - For each `prev_c != curr_c`, track the minimum from the previous row.
     - Set `next_dp[curr_c] = grid[r][curr_c] + min_prev`.
   - Replace the DP array with the new array.
3. Return the minimum value in the final DP array.

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        N = len(grid)
        dp = grid[0]

        for r in range(1, N):
            next_dp = [float("inf")] * N
            for curr_c in range(N):
                for prev_c in range(N):
                    if prev_c != curr_c:
                        next_dp[curr_c] = min(
                            next_dp[curr_c],
                            grid[r][curr_c] + dp[prev_c]
                        )
            dp = next_dp

        return min(dp)
```

```java
public class Solution {
    public int minFallingPathSum(int[][] grid) {
        int N = grid.length;
        int[] dp = grid[0];

        for (int r = 1; r < N; r++) {
            int[] nextDp = new int[N];
            Arrays.fill(nextDp, Integer.MAX_VALUE);

            for (int currC = 0; currC < N; currC++) {
                for (int prevC = 0; prevC < N; prevC++) {
                    if (prevC != currC) {
                        nextDp[currC] = Math.min(
                            nextDp[currC],
                            grid[r][currC] + dp[prevC]
                        );
                    }
                }
            }
            dp = nextDp;
        }

        int res = Integer.MAX_VALUE;
        for (int i : dp) res = Math.min(res, i);
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<int> dp = grid[0];

        for (int r = 1; r < N; r++) {
            vector<int> nextDp(N, INT_MAX);
            for (int currC = 0; currC < N; currC++) {
                for (int prevC = 0; prevC < N; prevC++) {
                    if (prevC != currC) {
                        nextDp[currC] = min(
                            nextDp[currC],
                            grid[r][currC] + dp[prevC]
                        );
                    }
                }
            }
            dp = nextDp;
        }

        return *min_element(dp.begin(), dp.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    minFallingPathSum(grid) {
        const N = grid.length;
        let dp = grid[0];

        for (let r = 1; r < N; r++) {
            const nextDp = Array(N).fill(Infinity);
            for (let currC = 0; currC < N; currC++) {
                for (let prevC = 0; prevC < N; prevC++) {
                    if (prevC !== currC) {
                        nextDp[currC] = Math.min(
                            nextDp[currC],
                            grid[r][currC] + dp[prevC],
                        );
                    }
                }
            }
            dp = nextDp;
        }

        return Math.min(...dp);
    }
}
```

```csharp
public class Solution {
    public int MinFallingPathSum(int[][] grid) {
        int N = grid.Length;
        int[] dp = (int[])grid[0].Clone();

        for (int r = 1; r < N; r++) {
            int[] nextDp = new int[N];
            Array.Fill(nextDp, int.MaxValue);

            for (int currC = 0; currC < N; currC++) {
                for (int prevC = 0; prevC < N; prevC++) {
                    if (prevC != currC) {
                        nextDp[currC] = Math.Min(nextDp[currC], grid[r][currC] + dp[prevC]);
                    }
                }
            }
            dp = nextDp;
        }

        int res = int.MaxValue;
        foreach (int val in dp) {
            res = Math.Min(res, val);
        }
        return res;
    }
}
```

```go
func minFallingPathSum(grid [][]int) int {
    n := len(grid)
    dp := make([]int, n)
    copy(dp, grid[0])

    for r := 1; r < n; r++ {
        nextDp := make([]int, n)
        for i := range nextDp {
            nextDp[i] = math.MaxInt32
        }
        for currC := 0; currC < n; currC++ {
            for prevC := 0; prevC < n; prevC++ {
                if prevC != currC {
                    nextDp[currC] = min(nextDp[currC], grid[r][currC]+dp[prevC])
                }
            }
        }
        dp = nextDp
    }

    res := math.MaxInt32
    for _, val := range dp {
        res = min(res, val)
    }
    return res
}
```

```kotlin
class Solution {
    fun minFallingPathSum(grid: Array<IntArray>): Int {
        val n = grid.size
        var dp = grid[0].clone()

        for (r in 1 until n) {
            val nextDp = IntArray(n) { Int.MAX_VALUE }
            for (currC in 0 until n) {
                for (prevC in 0 until n) {
                    if (prevC != currC) {
                        nextDp[currC] = minOf(nextDp[currC], grid[r][currC] + dp[prevC])
                    }
                }
            }
            dp = nextDp
        }

        return dp.minOrNull()!!
    }
}
```

```swift
class Solution {
    func minFallingPathSum(_ grid: [[Int]]) -> Int {
        let n = grid.count
        var dp = grid[0]

        for r in 1..<n {
            var nextDp = Array(repeating: Int.max, count: n)
            for currC in 0..<n {
                for prevC in 0..<n {
                    if prevC != currC {
                        nextDp[currC] = min(nextDp[currC], grid[r][currC] + dp[prevC])
                    }
                }
            }
            dp = nextDp
        }

        return dp.min()!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n)$

---

## 5. Dynamic Programming (Time Optimized)

### Intuition

The O(n^3) complexity comes from checking all `n` columns for each of `n^2` cells. We can optimize by observing that when transitioning to a cell, we usually want the minimum from the previous row, unless that minimum is in the same column. So we only need to track the two smallest values from each row: if the current column matches the smallest, use the second smallest; otherwise, use the smallest.

### Algorithm

1. Initialize DP by computing the two smallest (value, index) pairs from the first row.
2. For each subsequent row:
   - For each column, compute the path sum using the smallest previous value if columns differ, else the second smallest.
   - Collect all results and find the new two smallest pairs.
3. Return the minimum value from the final DP.

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        def get_min_two(row):
            two_smallest = []
            for val, idx in row:
                if len(two_smallest) < 2:
                    two_smallest.append((val, idx))
                elif two_smallest[1][0] > val:
                    two_smallest.pop()
                    two_smallest.append((val, idx))
                two_smallest.sort()
            return two_smallest

        N = len(grid)
        first_row = [(val, idx) for idx, val in enumerate(grid[0])]
        dp = get_min_two(first_row)

        for r in range(1, N):
            next_dp = []
            for curr_c in range(N):
                curr_val = grid[r][curr_c]
                min_val = float("inf")
                for prev_val, prev_c in dp:
                    if curr_c != prev_c:
                        min_val = min(min_val, curr_val + prev_val)
                next_dp.append((min_val, curr_c))
            dp = get_min_two(next_dp)

        return min(val for val, idx in dp)
```

```java
public class Solution {
    public List<int[]> getMinTwo(List<int[]> row) {
        List<int[]> twoSmallest = new ArrayList<>();
        for (int[] entry : row) {
            if (twoSmallest.size() < 2) {
                twoSmallest.add(entry);
            } else if (twoSmallest.get(1)[0] > entry[0]) {
                twoSmallest.remove(1);
                twoSmallest.add(entry);
            }
            twoSmallest.sort((a, b) -> a[0] - b[0]);
        }
        return twoSmallest;
    }

    public int minFallingPathSum(int[][] grid) {
        int N = grid.length;

        List<int[]> firstRow = new ArrayList<>();
        for (int i = 0; i < grid[0].length; i++) {
            firstRow.add(new int[]{grid[0][i], i});
        }

        List<int[]> dp = getMinTwo(firstRow);

        for (int r = 1; r < N; r++) {
            List<int[]> nextDp = new ArrayList<>();
            for (int c = 0; c < grid[0].length; c++) {
                int currVal = grid[r][c];
                int minVal = Integer.MAX_VALUE;
                for (int[] prev : dp) {
                    if (prev[1] != c) {
                        minVal = Math.min(minVal, currVal + prev[0]);
                    }
                }
                nextDp.add(new int[]{minVal, c});
            }
            dp = getMinTwo(nextDp);
        }

        return dp.stream().mapToInt(a -> a[0]).min().getAsInt();
    }
}
```

```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int N = grid.size();

        auto getMinTwo = [](vector<pair<int, int>>& row) {
            vector<pair<int, int>> twoSmallest;
            for (auto& entry : row) {
                if (twoSmallest.size() < 2) {
                    twoSmallest.push_back(entry);
                } else if (twoSmallest[1].first > entry.first) {
                    twoSmallest.pop_back();
                    twoSmallest.push_back(entry);
                }
                sort(twoSmallest.begin(), twoSmallest.end());
            }
            return twoSmallest;
        };

        vector<pair<int, int>> firstRow;
        for (int i = 0; i < grid[0].size(); i++) {
            firstRow.push_back({grid[0][i], i});
        }

        vector<pair<int, int>> dp = getMinTwo(firstRow);

        for (int r = 1; r < N; r++) {
            vector<pair<int, int>> nextDp;
            for (int c = 0; c < grid[0].size(); c++) {
                int currVal = grid[r][c];
                int minVal = INT_MAX;
                for (auto& prev : dp) {
                    if (prev.second != c) {
                        minVal = min(minVal, currVal + prev.first);
                    }
                }
                nextDp.push_back({minVal, c});
            }
            dp = getMinTwo(nextDp);
        }

        int result = INT_MAX;
        for (auto& entry : dp) {
            result = min(result, entry.first);
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    minFallingPathSum(grid) {
        const N = grid.length;

        const getMinTwo = (row) => {
            const twoSmallest = [];
            for (const [val, idx] of row) {
                if (twoSmallest.length < 2) {
                    twoSmallest.push([val, idx]);
                } else if (twoSmallest[1][0] > val) {
                    twoSmallest.pop();
                    twoSmallest.push([val, idx]);
                }
                twoSmallest.sort((a, b) => a[0] - b[0]);
            }
            return twoSmallest;
        };

        const firstRow = grid[0].map((val, idx) => [val, idx]);
        let dp = getMinTwo(firstRow);

        for (let r = 1; r < N; r++) {
            const nextDp = [];
            for (let c = 0; c < grid[0].length; c++) {
                const currVal = grid[r][c];
                let minVal = Infinity;
                for (const [prevVal, prevC] of dp) {
                    if (c !== prevC) {
                        minVal = Math.min(minVal, currVal + prevVal);
                    }
                }
                nextDp.push([minVal, c]);
            }
            dp = getMinTwo(nextDp);
        }

        return Math.min(...dp.map(([val]) => val));
    }
}
```

```csharp
public class Solution {
    public int MinFallingPathSum(int[][] grid) {
        int N = grid.Length;

        List<int[]> GetMinTwo(List<int[]> row) {
            var twoSmallest = new List<int[]>();
            foreach (var entry in row) {
                if (twoSmallest.Count < 2) {
                    twoSmallest.Add(entry);
                } else if (twoSmallest[1][0] > entry[0]) {
                    twoSmallest.RemoveAt(1);
                    twoSmallest.Add(entry);
                }
                twoSmallest.Sort((a, b) => a[0].CompareTo(b[0]));
            }
            return twoSmallest;
        }

        var firstRow = new List<int[]>();
        for (int i = 0; i < grid[0].Length; i++) {
            firstRow.Add(new int[] { grid[0][i], i });
        }

        var dp = GetMinTwo(firstRow);

        for (int r = 1; r < N; r++) {
            var nextDp = new List<int[]>();
            for (int c = 0; c < grid[0].Length; c++) {
                int currVal = grid[r][c];
                int minVal = int.MaxValue;
                foreach (var prev in dp) {
                    if (prev[1] != c) {
                        minVal = Math.Min(minVal, currVal + prev[0]);
                    }
                }
                nextDp.Add(new int[] { minVal, c });
            }
            dp = GetMinTwo(nextDp);
        }

        return dp.Min(a => a[0]);
    }
}
```

```go
func minFallingPathSum(grid [][]int) int {
    n := len(grid)

    getMinTwo := func(row [][2]int) [][2]int {
        twoSmallest := make([][2]int, 0, 2)
        for _, entry := range row {
            if len(twoSmallest) < 2 {
                twoSmallest = append(twoSmallest, entry)
            } else if twoSmallest[1][0] > entry[0] {
                twoSmallest[1] = entry
            }
            sort.Slice(twoSmallest, func(i, j int) bool {
                return twoSmallest[i][0] < twoSmallest[j][0]
            })
        }
        return twoSmallest
    }

    firstRow := make([][2]int, n)
    for i, val := range grid[0] {
        firstRow[i] = [2]int{val, i}
    }
    dp := getMinTwo(firstRow)

    for r := 1; r < n; r++ {
        nextDp := make([][2]int, n)
        for c := 0; c < n; c++ {
            currVal := grid[r][c]
            minVal := math.MaxInt32
            for _, prev := range dp {
                if c != prev[1] {
                    minVal = min(minVal, currVal+prev[0])
                }
            }
            nextDp[c] = [2]int{minVal, c}
        }
        dp = getMinTwo(nextDp)
    }

    res := math.MaxInt32
    for _, entry := range dp {
        res = min(res, entry[0])
    }
    return res
}
```

```kotlin
class Solution {
    fun minFallingPathSum(grid: Array<IntArray>): Int {
        val n = grid.size

        fun getMinTwo(row: List<Pair<Int, Int>>): List<Pair<Int, Int>> {
            val twoSmallest = mutableListOf<Pair<Int, Int>>()
            for (entry in row) {
                if (twoSmallest.size < 2) {
                    twoSmallest.add(entry)
                } else if (twoSmallest[1].first > entry.first) {
                    twoSmallest.removeAt(1)
                    twoSmallest.add(entry)
                }
                twoSmallest.sortBy { it.first }
            }
            return twoSmallest
        }

        val firstRow = grid[0].mapIndexed { idx, value -> Pair(value, idx) }
        var dp = getMinTwo(firstRow)

        for (r in 1 until n) {
            val nextDp = mutableListOf<Pair<Int, Int>>()
            for (c in 0 until n) {
                val currVal = grid[r][c]
                var minVal = Int.MAX_VALUE
                for ((prevVal, prevC) in dp) {
                    if (c != prevC) {
                        minVal = minOf(minVal, currVal + prevVal)
                    }
                }
                nextDp.add(Pair(minVal, c))
            }
            dp = getMinTwo(nextDp)
        }

        return dp.minOfOrNull { it.first }!!
    }
}
```

```swift
class Solution {
    func minFallingPathSum(_ grid: [[Int]]) -> Int {
        let n = grid.count

        func getMinTwo(_ row: [(Int, Int)]) -> [(Int, Int)] {
            var twoSmallest: [(Int, Int)] = []
            for entry in row {
                if twoSmallest.count < 2 {
                    twoSmallest.append(entry)
                } else if twoSmallest[1].0 > entry.0 {
                    twoSmallest.removeLast()
                    twoSmallest.append(entry)
                }
                twoSmallest.sort { $0.0 < $1.0 }
            }
            return twoSmallest
        }

        let firstRow = grid[0].enumerated().map { ($0.element, $0.offset) }
        var dp = getMinTwo(firstRow)

        for r in 1..<n {
            var nextDp: [(Int, Int)] = []
            for c in 0..<n {
                let currVal = grid[r][c]
                var minVal = Int.max
                for (prevVal, prevC) in dp {
                    if c != prevC {
                        minVal = min(minVal, currVal + prevVal)
                    }
                }
                nextDp.append((minVal, c))
            }
            dp = getMinTwo(nextDp)
        }

        return dp.map { $0.0 }.min()!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 6. Dynamic Programming (Optimal)

### Intuition

We can further optimize by not storing an entire array of pairs. Instead, we only track four values: the index and value of the smallest element, and the index and value of the second smallest element from the previous row. For each cell in the current row, we add the appropriate previous minimum based on column matching. Then we update our tracked values for the next iteration. This achieves O(n^2) time with O(1) extra space.

### Algorithm

1. Initialize `dpIdx1`, `dpIdx2` (indices of first and second smallest) and `dpVal1`, `dpVal2` (their values) to represent the previous row's state.
2. For each row:
   - Track new smallest and second smallest values and indices.
   - For each column `j`:
     - If `j != dpIdx1`, add `dpVal1`; otherwise add `dpVal2`.
     - Update the running smallest and second smallest for this row.
3. After processing all rows, return `dpVal1` (the overall minimum).

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        n = len(grid)
        if n == 1:
            return grid[0][0]

        dp_idx1 = dp_idx2 = -1
        dp_val1 = dp_val2 = 0

        for i in range(n):
            nextDp_idx1 = nextDp_idx2 = -1
            nextDp_val1 = nextDp_val2 = float("inf")

            for j in range(n):
                cur = dp_val1 if j != dp_idx1 else dp_val2
                cur += grid[i][j]

                if nextDp_idx1 == -1 or cur < nextDp_val1:
                    nextDp_idx2, nextDp_val2 = nextDp_idx1, nextDp_val1
                    nextDp_idx1, nextDp_val1 = j, cur
                elif nextDp_idx2 == -1 or cur < nextDp_val2:
                    nextDp_idx2, nextDp_val2 = j, cur

            dp_idx1, dp_idx2, dp_val1, dp_val2 = nextDp_idx1, nextDp_idx2, nextDp_val1, nextDp_val2

        return dp_val1
```

```java
public class Solution {
    public int minFallingPathSum(int[][] grid) {
        int n = grid.length;
        if (n == 1) {
            return grid[0][0];
        }

        int dpIdx1 = -1, dpIdx2 = -1;
        int dpVal1 = 0, dpVal2 = 0;

        for (int i = 0; i < n; i++) {
            int nextDpIdx1 = -1, nextDpIdx2 = -1;
            int nextDpVal1 = Integer.MAX_VALUE, nextDpVal2 = Integer.MAX_VALUE;

            for (int j = 0; j < n; j++) {
                int cur = (j != dpIdx1) ? dpVal1 : dpVal2;
                cur += grid[i][j];

                if (nextDpIdx1 == -1 || cur < nextDpVal1) {
                    nextDpIdx2 = nextDpIdx1;
                    nextDpVal2 = nextDpVal1;
                    nextDpIdx1 = j;
                    nextDpVal1 = cur;
                } else if (nextDpIdx2 == -1 || cur < nextDpVal2) {
                    nextDpIdx2 = j;
                    nextDpVal2 = cur;
                }
            }

            dpIdx1 = nextDpIdx1;
            dpIdx2 = nextDpIdx2;
            dpVal1 = nextDpVal1;
            dpVal2 = nextDpVal2;
        }

        return dpVal1;
    }
}
```

```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int n = grid.size();
        if (n == 1) {
            return grid[0][0];
        }

        int dpIdx1 = -1, dpIdx2 = -1;
        int dpVal1 = 0, dpVal2 = 0;

        for (int i = 1; i < n; i++) {
            int nextDpIdx1 = -1, nextDpIdx2 = -1;
            int nextDpVal1 = INT_MAX, nextDpVal2 = INT_MAX;

            for (int j = 0; j < n; j++) {
                int cur = (j != dpIdx1) ? dpVal1 : dpVal2;
                cur += grid[i][j];

                if (nextDpIdx1 == -1 || cur < nextDpVal1) {
                    nextDpIdx2 = nextDpIdx1;
                    nextDpVal2 = nextDpVal1;
                    nextDpIdx1 = j;
                    nextDpVal1 = cur;
                } else if (nextDpIdx2 == -1 || cur < nextDpVal2) {
                    nextDpIdx2 = j;
                    nextDpVal2 = cur;
                }
            }

            dpIdx1 = nextDpIdx1;
            dpIdx2 = nextDpIdx2;
            dpVal1 = nextDpVal1;
            dpVal2 = nextDpVal2;
        }

        return dpVal1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    minFallingPathSum(grid) {
        const n = grid.length;
        if (n === 1) return grid[0][0];

        let dpIdx1 = -1,
            dpIdx2 = -1;
        let dpVal1 = 0,
            dpVal2 = 0;

        for (let i = 0; i < n; i++) {
            let nextDpIdx1 = -1,
                nextDpIdx2 = -1;
            let nextDpVal1 = Infinity,
                nextDpVal2 = Infinity;

            for (let j = 0; j < n; j++) {
                let cur = j !== dpIdx1 ? dpVal1 : dpVal2;
                cur += grid[i][j];

                if (nextDpIdx1 === -1 || cur < nextDpVal1) {
                    nextDpIdx2 = nextDpIdx1;
                    nextDpVal2 = nextDpVal1;
                    nextDpIdx1 = j;
                    nextDpVal1 = cur;
                } else if (nextDpIdx2 === -1 || cur < nextDpVal2) {
                    nextDpIdx2 = j;
                    nextDpVal2 = cur;
                }
            }

            dpIdx1 = nextDpIdx1;
            dpIdx2 = nextDpIdx2;
            dpVal1 = nextDpVal1;
            dpVal2 = nextDpVal2;
        }

        return dpVal1;
    }
}
```

```csharp
public class Solution {
    public int MinFallingPathSum(int[][] grid) {
        int n = grid.Length;
        if (n == 1) return grid[0][0];

        int dpIdx1 = -1, dpIdx2 = -1;
        int dpVal1 = 0, dpVal2 = 0;

        for (int i = 0; i < n; i++) {
            int nextDpIdx1 = -1, nextDpIdx2 = -1;
            int nextDpVal1 = int.MaxValue, nextDpVal2 = int.MaxValue;

            for (int j = 0; j < n; j++) {
                int cur = (j != dpIdx1) ? dpVal1 : dpVal2;
                cur += grid[i][j];

                if (nextDpIdx1 == -1 || cur < nextDpVal1) {
                    nextDpIdx2 = nextDpIdx1;
                    nextDpVal2 = nextDpVal1;
                    nextDpIdx1 = j;
                    nextDpVal1 = cur;
                } else if (nextDpIdx2 == -1 || cur < nextDpVal2) {
                    nextDpIdx2 = j;
                    nextDpVal2 = cur;
                }
            }

            dpIdx1 = nextDpIdx1;
            dpIdx2 = nextDpIdx2;
            dpVal1 = nextDpVal1;
            dpVal2 = nextDpVal2;
        }

        return dpVal1;
    }
}
```

```go
func minFallingPathSum(grid [][]int) int {
    n := len(grid)
    if n == 1 {
        return grid[0][0]
    }

    dpIdx1, dpIdx2 := -1, -1
    dpVal1, dpVal2 := 0, 0

    for i := 0; i < n; i++ {
        nextDpIdx1, nextDpIdx2 := -1, -1
        nextDpVal1, nextDpVal2 := math.MaxInt32, math.MaxInt32

        for j := 0; j < n; j++ {
            cur := dpVal1
            if j == dpIdx1 {
                cur = dpVal2
            }
            cur += grid[i][j]

            if nextDpIdx1 == -1 || cur < nextDpVal1 {
                nextDpIdx2, nextDpVal2 = nextDpIdx1, nextDpVal1
                nextDpIdx1, nextDpVal1 = j, cur
            } else if nextDpIdx2 == -1 || cur < nextDpVal2 {
                nextDpIdx2, nextDpVal2 = j, cur
            }
        }

        dpIdx1, dpIdx2, dpVal1, dpVal2 = nextDpIdx1, nextDpIdx2, nextDpVal1, nextDpVal2
    }

    return dpVal1
}
```

```kotlin
class Solution {
    fun minFallingPathSum(grid: Array<IntArray>): Int {
        val n = grid.size
        if (n == 1) return grid[0][0]

        var dpIdx1 = -1
        var dpIdx2 = -1
        var dpVal1 = 0
        var dpVal2 = 0

        for (i in 0 until n) {
            var nextDpIdx1 = -1
            var nextDpIdx2 = -1
            var nextDpVal1 = Int.MAX_VALUE
            var nextDpVal2 = Int.MAX_VALUE

            for (j in 0 until n) {
                var cur = if (j != dpIdx1) dpVal1 else dpVal2
                cur += grid[i][j]

                if (nextDpIdx1 == -1 || cur < nextDpVal1) {
                    nextDpIdx2 = nextDpIdx1
                    nextDpVal2 = nextDpVal1
                    nextDpIdx1 = j
                    nextDpVal1 = cur
                } else if (nextDpIdx2 == -1 || cur < nextDpVal2) {
                    nextDpIdx2 = j
                    nextDpVal2 = cur
                }
            }

            dpIdx1 = nextDpIdx1
            dpIdx2 = nextDpIdx2
            dpVal1 = nextDpVal1
            dpVal2 = nextDpVal2
        }

        return dpVal1
    }
}
```

```swift
class Solution {
    func minFallingPathSum(_ grid: [[Int]]) -> Int {
        let n = grid.count
        if n == 1 { return grid[0][0] }

        var dpIdx1 = -1, dpIdx2 = -1
        var dpVal1 = 0, dpVal2 = 0

        for i in 0..<n {
            var nextDpIdx1 = -1, nextDpIdx2 = -1
            var nextDpVal1 = Int.max, nextDpVal2 = Int.max

            for j in 0..<n {
                var cur = (j != dpIdx1) ? dpVal1 : dpVal2
                cur += grid[i][j]

                if nextDpIdx1 == -1 || cur < nextDpVal1 {
                    nextDpIdx2 = nextDpIdx1
                    nextDpVal2 = nextDpVal1
                    nextDpIdx1 = j
                    nextDpVal1 = cur
                } else if nextDpIdx2 == -1 || cur < nextDpVal2 {
                    nextDpIdx2 = j
                    nextDpVal2 = cur
                }
            }

            dpIdx1 = nextDpIdx1
            dpIdx2 = nextDpIdx2
            dpVal1 = nextDpVal1
            dpVal2 = nextDpVal2
        }

        return dpVal1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Confusing with Standard Falling Path Sum

Unlike the standard falling path problem where you move to adjacent columns, this variant requires choosing a different column in each row. Using the adjacent-column logic from the standard problem will produce incorrect results.

### O(n^3) Time Complexity Trap

A naive approach checks all `n` columns from the previous row for each of `n^2` cells, resulting in O(n^3) time. The key optimization is tracking only the two smallest values from each row, since you only need the second smallest when the current column matches the smallest.

### Edge Case with Single Column Grid

When `n = 1`, there is only one column, making it impossible to pick a different column in each row after the first. The answer is simply `grid[0][0]` since a 1x1 grid has only one cell. Failing to handle this edge case causes index errors or infinite loops.

### Incorrect Second Minimum Tracking

When optimizing to O(n^2), you must correctly track both the minimum and second minimum values along with their column indices. Common mistakes include not updating both values properly, using the wrong index for comparison, or forgetting to handle ties when multiple columns have the same minimum value.

### Integer Overflow with Large Negative Values

Grid values can be negative, so initializing with `INT_MIN` as a sentinel can cause overflow when added to grid values. Use a distinct sentinel value or nullable type to distinguish uncomputed states from valid negative sums.
