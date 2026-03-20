## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Dynamic Programming** - Understanding memoization (top-down) and tabulation (bottom-up) approaches
- **2D Grid Traversal** - Navigating through rows and columns of a matrix
- **Recursion** - Building solutions by breaking problems into smaller subproblems

---

## 1. Dynamic Programming (Top-Down)

### Intuition

We want to count all possible paths from the top-left corner to the bottom-right corner, but some cells are blocked by obstacles. At any cell, we can only move right or down. This naturally leads to a recursive approach: the number of paths from a cell equals the sum of paths from the cell below and the cell to the right. If we hit an obstacle or go out of bounds, that path contributes `0`. Since many subproblems overlap (the same cell gets visited through different routes), we use memoization to avoid redundant calculations.

### Algorithm

1. Define a recursive function `dfs(r, c)` that returns the number of paths from cell `(r, c)` to the destination.
2. Base cases:
    - If `r` or `c` is out of bounds, or the cell contains an obstacle, return `0`.
    - If we reach the destination `(M-1, N-1)`, return `1`.
3. If the result for `(r, c)` is already in `dp`, return the cached value.
4. Otherwise, compute `dfs(r+1, c) + dfs(r, c+1)` and store it in `dp`.
5. Call `dfs(0, 0)` to get the total number of unique paths.


<br>

::tabs-start

```python
class Solution:
    def uniquePathsWithObstacles(self, grid: List[List[int]]) -> int:
        M, N = len(grid), len(grid[0])
        dp = {(M - 1, N - 1): 1}

        def dfs(r, c):
            if r == M or c == N or grid[r][c]:
                return 0
            if (r, c) in dp:
                return dp[(r, c)]
            dp[(r, c)] = dfs(r + 1, c) + dfs(r, c + 1)
            return dp[(r, c)]

        return dfs(0, 0)
```

```java
public class Solution {
    private int[][] dp;

    public int uniquePathsWithObstacles(int[][] grid) {
        int M = grid.length, N = grid[0].length;
        dp = new int[M][N];
        for (int i = 0; i < M; i++) {
            for (int j = 0; j < N; j++) {
                dp[i][j] = -1;
            }
        }
        return dfs(0, 0, grid, M, N);
    }

    private int dfs(int r, int c, int[][] grid, int M, int N) {
        if (r == M || c == N || grid[r][c] == 1) {
            return 0;
        }
        if (r == M - 1 && c == N - 1) {
            return 1;
        }
        if (dp[r][c] != -1) {
            return dp[r][c];
        }
        dp[r][c] = dfs(r + 1, c, grid, M, N) + dfs(r, c + 1, grid, M, N);
        return dp[r][c];
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {
        int M = grid.size(), N = grid[0].size();
        dp.resize(M, vector<int>(N, -1));
        return dfs(0, 0, grid, M, N);
    }

private:
    int dfs(int r, int c, vector<vector<int>>& grid, int M, int N) {
        if (r == M || c == N || grid[r][c] == 1) {
            return 0;
        }
        if (r == M - 1 && c == N - 1) {
            return 1;
        }
        if (dp[r][c] != -1) {
            return dp[r][c];
        }
        dp[r][c] = dfs(r + 1, c, grid, M, N) + dfs(r, c + 1, grid, M, N);
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
    uniquePathsWithObstacles(grid) {
        const M = grid.length,
            N = grid[0].length;
        const dp = Array.from({ length: M }, () => Array(N).fill(-1));

        const dfs = (r, c) => {
            if (r === M || c === N || grid[r][c] === 1) {
                return 0;
            }
            if (r === M - 1 && c === N - 1) {
                return 1;
            }
            if (dp[r][c] !== -1) {
                return dp[r][c];
            }
            dp[r][c] = dfs(r + 1, c) + dfs(r, c + 1);
            return dp[r][c];
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private int[,] dp;

    public int UniquePathsWithObstacles(int[][] grid) {
        int M = grid.Length, N = grid[0].Length;
        dp = new int[M, N];
        for (int i = 0; i < M; i++) {
            for (int j = 0; j < N; j++) {
                dp[i, j] = -1;
            }
        }
        return Dfs(0, 0, grid, M, N);
    }

    private int Dfs(int r, int c, int[][] grid, int M, int N) {
        if (r == M || c == N || grid[r][c] == 1) {
            return 0;
        }
        if (r == M - 1 && c == N - 1) {
            return 1;
        }
        if (dp[r, c] != -1) {
            return dp[r, c];
        }
        dp[r, c] = Dfs(r + 1, c, grid, M, N) + Dfs(r, c + 1, grid, M, N);
        return dp[r, c];
    }
}
```

```go
func uniquePathsWithObstacles(grid [][]int) int {
    M, N := len(grid), len(grid[0])
    dp := make([][]int, M)
    for i := range dp {
        dp[i] = make([]int, N)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(r, c int) int
    dfs = func(r, c int) int {
        if r == M || c == N || grid[r][c] == 1 {
            return 0
        }
        if r == M-1 && c == N-1 {
            return 1
        }
        if dp[r][c] != -1 {
            return dp[r][c]
        }
        dp[r][c] = dfs(r+1, c) + dfs(r, c+1)
        return dp[r][c]
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    fun uniquePathsWithObstacles(grid: Array<IntArray>): Int {
        val M = grid.size
        val N = grid[0].size
        val dp = Array(M) { IntArray(N) { -1 } }

        fun dfs(r: Int, c: Int): Int {
            if (r == M || c == N || grid[r][c] == 1) {
                return 0
            }
            if (r == M - 1 && c == N - 1) {
                return 1
            }
            if (dp[r][c] != -1) {
                return dp[r][c]
            }
            dp[r][c] = dfs(r + 1, c) + dfs(r, c + 1)
            return dp[r][c]
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func uniquePathsWithObstacles(_ grid: [[Int]]) -> Int {
        let M = grid.count, N = grid[0].count
        var dp = [[Int]](repeating: [Int](repeating: -1, count: N), count: M)

        func dfs(_ r: Int, _ c: Int) -> Int {
            if r == M || c == N || grid[r][c] == 1 {
                return 0
            }
            if r == M - 1 && c == N - 1 {
                return 1
            }
            if dp[r][c] != -1 {
                return dp[r][c]
            }
            dp[r][c] = dfs(r + 1, c) + dfs(r, c + 1)
            return dp[r][c]
        }

        return dfs(0, 0)
    }
}
```

```rust
impl Solution {
    pub fn unique_paths_with_obstacles(obstacle_grid: Vec<Vec<i32>>) -> i32 {
        let m = obstacle_grid.len();
        let n = obstacle_grid[0].len();
        let mut dp = vec![vec![-1; n]; m];

        fn dfs(r: usize, c: usize, grid: &[Vec<i32>], dp: &mut Vec<Vec<i32>>,
               m: usize, n: usize) -> i32 {
            if r == m || c == n || grid[r][c] == 1 {
                return 0;
            }
            if r == m - 1 && c == n - 1 {
                return 1;
            }
            if dp[r][c] != -1 {
                return dp[r][c];
            }
            dp[r][c] = dfs(r + 1, c, grid, dp, m, n)
                      + dfs(r, c + 1, grid, dp, m, n);
            dp[r][c]
        }

        dfs(0, 0, &obstacle_grid, &mut dp, m, n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Dynamic Programming (Bottom-Up)

### Intuition

Instead of solving recursively from the start, we can build the solution iteratively from the destination back to the start. Each cell stores the number of ways to reach the destination from that cell. For any cell, this count is the sum of the counts from the cell below and the cell to the right. Obstacles simply have a count of `0` since no path can go through them.

### Algorithm

1. If the start or destination cell has an obstacle, return `0` immediately.
2. Create a 2D `dp` table with an extra row and column (initialized to `0`) for boundary handling.
3. Set `dp[M-1][N-1] = 1` since there is exactly one way to reach the destination from itself.
4. Iterate from the bottom-right to the top-left:
    - If the current cell has an obstacle, set `dp[r][c] = 0`.
    - Otherwise, set `dp[r][c] = dp[r+1][c] + dp[r][c+1]`.
5. Return `dp[0][0]` as the answer.


<br>

::tabs-start

```python
class Solution:
    def uniquePathsWithObstacles(self, grid: List[List[int]]) -> int:
        M, N = len(grid), len(grid[0])
        if grid[0][0] == 1 or grid[M - 1][N - 1] == 1:
            return 0
        dp = [[0] * (N + 1) for _ in range(M + 1)]


        dp[M - 1][N - 1] = 1

        for r in range(M - 1, -1, -1):
            for c in range(N - 1, -1, -1):
                if grid[r][c] == 1:
                    dp[r][c] = 0
                else:
                    dp[r][c] += dp[r + 1][c]
                    dp[r][c] += dp[r][c + 1]

        return dp[0][0]
```

```java
public class Solution {
    public int uniquePathsWithObstacles(int[][] grid) {
        int M = grid.length, N = grid[0].length;
        if (grid[0][0] == 1 || grid[M - 1][N - 1] == 1) {
            return 0;
        }

        int[][] dp = new int[M + 1][N + 1];
        dp[M - 1][N - 1] = 1;

        for (int r = M - 1; r >= 0; r--) {
            for (int c = N - 1; c >= 0; c--) {
                if (grid[r][c] == 1) {
                    dp[r][c] = 0;
                } else {
                    dp[r][c] += dp[r + 1][c];
                    dp[r][c] += dp[r][c + 1];
                }
            }
        }

        return dp[0][0];
    }
}
```

```cpp
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {
        int M = grid.size(), N = grid[0].size();
        if (grid[0][0] == 1 || grid[M - 1][N - 1] == 1) {
            return 0;
        }

        vector<vector<uint>> dp(M + 1, vector<uint>(N + 1, 0));
        dp[M - 1][N - 1] = 1;

        for (int r = M - 1; r >= 0; r--) {
            for (int c = N - 1; c >= 0; c--) {
                if (grid[r][c] == 1) {
                    dp[r][c] = 0;
                } else {
                    dp[r][c] += dp[r + 1][c];
                    dp[r][c] += dp[r][c + 1];
                }
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
    uniquePathsWithObstacles(grid) {
        const M = grid.length,
            N = grid[0].length;
        if (grid[0][0] === 1 || grid[M - 1][N - 1] === 1) {
            return 0;
        }

        const dp = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));
        dp[M - 1][N - 1] = 1;

        for (let r = M - 1; r >= 0; r--) {
            for (let c = N - 1; c >= 0; c--) {
                if (grid[r][c] === 1) {
                    dp[r][c] = 0;
                } else {
                    dp[r][c] += dp[r + 1][c];
                    dp[r][c] += dp[r][c + 1];
                }
            }
        }

        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public int UniquePathsWithObstacles(int[][] grid) {
        int M = grid.Length, N = grid[0].Length;
        if (grid[0][0] == 1 || grid[M - 1][N - 1] == 1) {
            return 0;
        }

        int[,] dp = new int[M + 1, N + 1];
        dp[M - 1, N - 1] = 1;

        for (int r = M - 1; r >= 0; r--) {
            for (int c = N - 1; c >= 0; c--) {
                if (grid[r][c] == 1) {
                    dp[r, c] = 0;
                } else {
                    dp[r, c] += dp[r + 1, c];
                    dp[r, c] += dp[r, c + 1];
                }
            }
        }

        return dp[0, 0];
    }
}
```

```go
func uniquePathsWithObstacles(grid [][]int) int {
    M, N := len(grid), len(grid[0])
    if grid[0][0] == 1 || grid[M-1][N-1] == 1 {
        return 0
    }

    dp := make([][]int, M+1)
    for i := range dp {
        dp[i] = make([]int, N+1)
    }
    dp[M-1][N-1] = 1

    for r := M - 1; r >= 0; r-- {
        for c := N - 1; c >= 0; c-- {
            if grid[r][c] == 1 {
                dp[r][c] = 0
            } else {
                dp[r][c] += dp[r+1][c]
                dp[r][c] += dp[r][c+1]
            }
        }
    }

    return dp[0][0]
}
```

```kotlin
class Solution {
    fun uniquePathsWithObstacles(grid: Array<IntArray>): Int {
        val M = grid.size
        val N = grid[0].size
        if (grid[0][0] == 1 || grid[M - 1][N - 1] == 1) {
            return 0
        }

        val dp = Array(M + 1) { IntArray(N + 1) }
        dp[M - 1][N - 1] = 1

        for (r in M - 1 downTo 0) {
            for (c in N - 1 downTo 0) {
                if (grid[r][c] == 1) {
                    dp[r][c] = 0
                } else {
                    dp[r][c] += dp[r + 1][c]
                    dp[r][c] += dp[r][c + 1]
                }
            }
        }

        return dp[0][0]
    }
}
```

```swift
class Solution {
    func uniquePathsWithObstacles(_ grid: [[Int]]) -> Int {
        let M = grid.count, N = grid[0].count
        if grid[0][0] == 1 || grid[M - 1][N - 1] == 1 {
            return 0
        }

        var dp = [[Int]](repeating: [Int](repeating: 0, count: N + 1), count: M + 1)
        dp[M - 1][N - 1] = 1

        for r in stride(from: M - 1, through: 0, by: -1) {
            for c in stride(from: N - 1, through: 0, by: -1) {
                if grid[r][c] == 1 {
                    dp[r][c] = 0
                } else {
                    dp[r][c] += dp[r + 1][c]
                    dp[r][c] += dp[r][c + 1]
                }
            }
        }

        return dp[0][0]
    }
}
```

```rust
impl Solution {
    pub fn unique_paths_with_obstacles(obstacle_grid: Vec<Vec<i32>>) -> i32 {
        let m = obstacle_grid.len();
        let n = obstacle_grid[0].len();
        if obstacle_grid[0][0] == 1 || obstacle_grid[m - 1][n - 1] == 1 {
            return 0;
        }

        let mut dp = vec![vec![0; n + 1]; m + 1];
        dp[m - 1][n - 1] = 1;

        for r in (0..m).rev() {
            for c in (0..n).rev() {
                if obstacle_grid[r][c] == 1 {
                    dp[r][c] = 0;
                } else {
                    dp[r][c] += dp[r + 1][c];
                    dp[r][c] += dp[r][c + 1];
                }
            }
        }

        dp[0][0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 3. Dynamic Programming (Space Optimized)

### Intuition

Looking at the bottom-up approach, we notice that each cell only depends on the cell directly below it and the cell to its right. Since we process row by row from bottom to top, we only need to keep track of one row at a time. The value `dp[c]` before updating represents the count from the row below, and `dp[c+1]` after updating represents the count from the right. This reduces space from `O(m * n)` to `O(n)`.

### Algorithm

1. Create a 1D array `dp` of size `N+1`, initialized to `0`.
2. Set `dp[N-1] = 1` to represent the destination.
3. Iterate through each row from bottom to top:
    - For each column `c` from right to left:
        - If the cell has an obstacle, set `dp[c] = 0`.
        - Otherwise, add `dp[c+1]` to `dp[c]` (accumulating paths from below and right).
4. Return `dp[0]` as the final answer.


<br>

::tabs-start

```python
class Solution:
    def uniquePathsWithObstacles(self, grid: List[List[int]]) -> int:
        M, N = len(grid), len(grid[0])
        dp = [0] * (N + 1)
        dp[N - 1] = 1

        for r in range(M - 1, -1, -1):
            for c in range(N - 1, -1, -1):
                if grid[r][c]:
                    dp[c] = 0
                else:
                    dp[c] += dp[c + 1]

        return dp[0]
```

```java
public class Solution {
    public int uniquePathsWithObstacles(int[][] grid) {
        int M = grid.length, N = grid[0].length;
        int[] dp = new int[N + 1];
        dp[N - 1] = 1;

        for (int r = M - 1; r >= 0; r--) {
            for (int c = N - 1; c >= 0; c--) {
                if (grid[r][c] == 1) {
                    dp[c] = 0;
                } else {
                    dp[c] += dp[c + 1];
                }
            }
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {
        int M = grid.size(), N = grid[0].size();
        vector<uint> dp(N + 1, 0);
        dp[N - 1] = 1;

        for (int r = M - 1; r >= 0; r--) {
            for (int c = N - 1; c >= 0; c--) {
                if (grid[r][c] == 1) {
                    dp[c] = 0;
                } else {
                    dp[c] += dp[c + 1];
                }
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
    uniquePathsWithObstacles(grid) {
        const M = grid.length,
            N = grid[0].length;
        const dp = new Array(N + 1).fill(0);
        dp[N - 1] = 1;

        for (let r = M - 1; r >= 0; r--) {
            for (let c = N - 1; c >= 0; c--) {
                if (grid[r][c] === 1) {
                    dp[c] = 0;
                } else {
                    dp[c] += dp[c + 1];
                }
            }
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int UniquePathsWithObstacles(int[][] grid) {
        int M = grid.Length, N = grid[0].Length;
        int[] dp = new int[N + 1];
        dp[N - 1] = 1;

        for (int r = M - 1; r >= 0; r--) {
            for (int c = N - 1; c >= 0; c--) {
                if (grid[r][c] == 1) {
                    dp[c] = 0;
                } else {
                    dp[c] += dp[c + 1];
                }
            }
        }

        return dp[0];
    }
}
```

```go
func uniquePathsWithObstacles(grid [][]int) int {
    M, N := len(grid), len(grid[0])
    dp := make([]int, N+1)
    dp[N-1] = 1

    for r := M - 1; r >= 0; r-- {
        for c := N - 1; c >= 0; c-- {
            if grid[r][c] == 1 {
                dp[c] = 0
            } else {
                dp[c] += dp[c+1]
            }
        }
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun uniquePathsWithObstacles(grid: Array<IntArray>): Int {
        val M = grid.size
        val N = grid[0].size
        val dp = IntArray(N + 1)
        dp[N - 1] = 1

        for (r in M - 1 downTo 0) {
            for (c in N - 1 downTo 0) {
                if (grid[r][c] == 1) {
                    dp[c] = 0
                } else {
                    dp[c] += dp[c + 1]
                }
            }
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func uniquePathsWithObstacles(_ grid: [[Int]]) -> Int {
        let M = grid.count, N = grid[0].count
        var dp = [Int](repeating: 0, count: N + 1)
        dp[N - 1] = 1

        for r in stride(from: M - 1, through: 0, by: -1) {
            for c in stride(from: N - 1, through: 0, by: -1) {
                if grid[r][c] == 1 {
                    dp[c] = 0
                } else {
                    dp[c] += dp[c + 1]
                }
            }
        }

        return dp[0]
    }
}
```

```rust
impl Solution {
    pub fn unique_paths_with_obstacles(obstacle_grid: Vec<Vec<i32>>) -> i32 {
        let m = obstacle_grid.len();
        let n = obstacle_grid[0].len();
        let mut dp = vec![0; n + 1];
        dp[n - 1] = 1;

        for r in (0..m).rev() {
            for c in (0..n).rev() {
                if obstacle_grid[r][c] == 1 {
                    dp[c] = 0;
                } else {
                    dp[c] += dp[c + 1];
                }
            }
        }

        dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 4. Dynamic Programming (In-Place)

### Intuition

We can avoid using any extra space by reusing the input grid itself to store the path counts. The key insight is that once we process a cell, we no longer need its original value (which was just `0` or `1` for obstacle). We transform `grid` so each cell holds the number of paths from that cell to the destination. Obstacles get converted to `0` since no path passes through them.

### Algorithm

1. If the start or destination has an obstacle, return `0`.
2. Set `grid[M-1][N-1] = 1` to mark the destination.
3. Iterate from the bottom-right to the top-left (skipping the destination cell):
    - If the cell is an obstacle, set it to `0`.
    - Otherwise, compute `down + right` where `down` is the cell below and `right` is the cell to the right.
4. Return `grid[0][0]` as the answer.


<br>

::tabs-start

```python
class Solution:
    def uniquePathsWithObstacles(self, grid: List[List[int]]) -> int:
        M, N = len(grid), len(grid[0])
        if grid[0][0] == 1 or grid[M - 1][N - 1] == 1:
            return 0

        grid[M - 1][N - 1] = 1

        for r in range(M - 1, -1, -1):
            for c in range(N - 1, -1, -1):
                if r == M - 1 and c == N - 1:
                    continue

                if grid[r][c] == 1:
                    grid[r][c] = 0
                else:
                    down = grid[r + 1][c] if r + 1 < M else 0
                    right = grid[r][c + 1] if c + 1 < N else 0
                    grid[r][c] = down + right

        return grid[0][0]
```

```java
public class Solution {
    public int uniquePathsWithObstacles(int[][] grid) {
        int M = grid.length, N = grid[0].length;
        if (grid[0][0] == 1 || grid[M - 1][N - 1] == 1) {
            return 0;
        }

        grid[M - 1][N - 1] = 1;

        for (int r = M - 1; r >= 0; r--) {
            for (int c = N - 1; c >= 0; c--) {
                if (r == M - 1 && c == N - 1) {
                    continue;
                }

                if (grid[r][c] == 1) {
                    grid[r][c] = 0;
                } else {
                    int down = (r + 1 < M) ? grid[r + 1][c] : 0;
                    int right = (c + 1 < N) ? grid[r][c + 1] : 0;
                    grid[r][c] = down + right;
                }
            }
        }

        return grid[0][0];
    }
}
```

```cpp
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {
        int M = grid.size(), N = grid[0].size();
        if (grid[0][0] == 1 || grid[M - 1][N - 1] == 1) {
            return 0;
        }

        grid[M - 1][N - 1] = 1;

        for (int r = M - 1; r >= 0; r--) {
            for (int c = N - 1; c >= 0; c--) {
                if (r == M - 1 && c == N - 1) {
                    continue;
                }

                if (grid[r][c] == 1) {
                    grid[r][c] = 0;
                } else {
                    uint down = (r + 1 < M) ? grid[r + 1][c] : 0;
                    uint right = (c + 1 < N) ? grid[r][c + 1] : 0;
                    grid[r][c] = down + right;
                }
            }
        }

        return grid[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    uniquePathsWithObstacles(grid) {
        const M = grid.length,
            N = grid[0].length;
        if (grid[0][0] === 1 || grid[M - 1][N - 1] === 1) {
            return 0;
        }

        grid[M - 1][N - 1] = 1;

        for (let r = M - 1; r >= 0; r--) {
            for (let c = N - 1; c >= 0; c--) {
                if (r === M - 1 && c === N - 1) {
                    continue;
                }

                if (grid[r][c] === 1) {
                    grid[r][c] = 0;
                } else {
                    const down = r + 1 < M ? grid[r + 1][c] : 0;
                    const right = c + 1 < N ? grid[r][c + 1] : 0;
                    grid[r][c] = down + right;
                }
            }
        }

        return grid[0][0];
    }
}
```

```csharp
public class Solution {
    public int UniquePathsWithObstacles(int[][] grid) {
        int M = grid.Length, N = grid[0].Length;
        if (grid[0][0] == 1 || grid[M - 1][N - 1] == 1) {
            return 0;
        }

        grid[M - 1][N - 1] = 1;

        for (int r = M - 1; r >= 0; r--) {
            for (int c = N - 1; c >= 0; c--) {
                if (r == M - 1 && c == N - 1) {
                    continue;
                }

                if (grid[r][c] == 1) {
                    grid[r][c] = 0;
                } else {
                    int down = (r + 1 < M) ? grid[r + 1][c] : 0;
                    int right = (c + 1 < N) ? grid[r][c + 1] : 0;
                    grid[r][c] = down + right;
                }
            }
        }

        return grid[0][0];
    }
}
```

```go
func uniquePathsWithObstacles(grid [][]int) int {
    M, N := len(grid), len(grid[0])
    if grid[0][0] == 1 || grid[M-1][N-1] == 1 {
        return 0
    }

    grid[M-1][N-1] = 1

    for r := M - 1; r >= 0; r-- {
        for c := N - 1; c >= 0; c-- {
            if r == M-1 && c == N-1 {
                continue
            }

            if grid[r][c] == 1 {
                grid[r][c] = 0
            } else {
                down := 0
                if r+1 < M {
                    down = grid[r+1][c]
                }
                right := 0
                if c+1 < N {
                    right = grid[r][c+1]
                }
                grid[r][c] = down + right
            }
        }
    }

    return grid[0][0]
}
```

```kotlin
class Solution {
    fun uniquePathsWithObstacles(grid: Array<IntArray>): Int {
        val M = grid.size
        val N = grid[0].size
        if (grid[0][0] == 1 || grid[M - 1][N - 1] == 1) {
            return 0
        }

        grid[M - 1][N - 1] = 1

        for (r in M - 1 downTo 0) {
            for (c in N - 1 downTo 0) {
                if (r == M - 1 && c == N - 1) {
                    continue
                }

                if (grid[r][c] == 1) {
                    grid[r][c] = 0
                } else {
                    val down = if (r + 1 < M) grid[r + 1][c] else 0
                    val right = if (c + 1 < N) grid[r][c + 1] else 0
                    grid[r][c] = down + right
                }
            }
        }

        return grid[0][0]
    }
}
```

```swift
class Solution {
    func uniquePathsWithObstacles(_ grid: [[Int]]) -> Int {
        var grid = grid
        let M = grid.count, N = grid[0].count
        if grid[0][0] == 1 || grid[M - 1][N - 1] == 1 {
            return 0
        }

        grid[M - 1][N - 1] = 1

        for r in stride(from: M - 1, through: 0, by: -1) {
            for c in stride(from: N - 1, through: 0, by: -1) {
                if r == M - 1 && c == N - 1 {
                    continue
                }

                if grid[r][c] == 1 {
                    grid[r][c] = 0
                } else {
                    let down = (r + 1 < M) ? grid[r + 1][c] : 0
                    let right = (c + 1 < N) ? grid[r][c + 1] : 0
                    grid[r][c] = down + right
                }
            }
        }

        return grid[0][0]
    }
}
```

```rust
impl Solution {
    pub fn unique_paths_with_obstacles(mut obstacle_grid: Vec<Vec<i32>>) -> i32 {
        let m = obstacle_grid.len();
        let n = obstacle_grid[0].len();
        if obstacle_grid[0][0] == 1 || obstacle_grid[m - 1][n - 1] == 1 {
            return 0;
        }

        obstacle_grid[m - 1][n - 1] = 1;

        for r in (0..m).rev() {
            for c in (0..n).rev() {
                if r == m - 1 && c == n - 1 {
                    continue;
                }

                if obstacle_grid[r][c] == 1 {
                    obstacle_grid[r][c] = 0;
                } else {
                    let down = if r + 1 < m { obstacle_grid[r + 1][c] } else { 0 };
                    let right = if c + 1 < n { obstacle_grid[r][c + 1] } else { 0 };
                    obstacle_grid[r][c] = down + right;
                }
            }
        }

        obstacle_grid[0][0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## Common Pitfalls

### Not Checking Start or End for Obstacles

If either the starting cell `grid[0][0]` or the destination cell `grid[M-1][N-1]` contains an obstacle, there are zero paths. Forgetting this check leads to incorrect results.

### Incorrect Base Case Initialization

When filling the first row or first column, all cells after an obstacle should have zero paths. A common mistake is initializing the entire edge with `1`s without considering that obstacles block all subsequent cells.

```python
# Wrong: doesn't account for obstacles blocking the path
for c in range(N):
    dp[0][c] = 1
# Correct: stop when hitting an obstacle
for c in range(N):
    if grid[0][c] == 1:
        break
    dp[0][c] = 1
```

### Confusing Obstacle Value with Path Count

In the in-place approach, obstacles are marked as `1` in the input but need to become `0` in the DP array. Confusing these values causes obstacles to be counted as having one path.

### Off-by-One Errors in Grid Iteration

When iterating bottom-up or right-to-left, ensure loop bounds are correct. Starting at `M-1` and going to `0` requires `range(M-1, -1, -1)` in Python, not `range(M-1, 0, -1)` which skips the first row.
