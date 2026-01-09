## 1. Dynamic Programming (Top-Down)

<details>
<summary>Example - Dry Run</summary>

Consider `obstacleGrid` (3x3 with obstacle at position (1,1)):

```markdown
Input: obstacleGrid (0 = empty, 1 = obstacle)

    0   1   2
  ┌───┬───┬───┐
0 │ 0 │ 0 │ 0 │
  ├───┼───┼───┤
1 │ 0 │ █ │ 0 │  ← obstacle at (1,1)
  ├───┼───┼───┤
2 │ 0 │ 0 │ 0 │
  └───┴───┴───┘

Legend: █ = obstacle (value 1), 0 = empty cell
```



**Top-Down DFS with Memoization**

The algorithm starts from `(0,0)` and recursively explores paths to `(2,2)`.
We can only move **right** or **down**. Each DFS call returns the number of paths from the current cell to the destination.



**Call Tree (simplified):**

```markdown
dfs(0,0)
├── dfs(1,0)                → go DOWN
│   ├── dfs(2,0)            → go DOWN
│   │   └── dfs(2,1)        → go RIGHT
│   │       └── dfs(2,2)    → DESTINATION! return 1
│   │   └── returns 1
│   ├── dfs(1,1) = 0        → OBSTACLE! return 0
│   └── returns 1 + 0 = 1
│
├── dfs(0,1)                → go RIGHT
│   ├── dfs(1,1) = 0        → OBSTACLE! return 0 (cached)
│   ├── dfs(0,2)            → go RIGHT
│   │   └── dfs(1,2)        → go DOWN
│   │       └── dfs(2,2)    → DESTINATION! return 1 (cached)
│   │   └── returns 1
│   └── returns 0 + 1 = 1
│
└── returns 1 + 1 = 2
```



**Memoization Table (dp) after all calls:**

```markdown
    0   1   2
  ┌───┬───┬───┐
0 │ 2 │ 1 │ 1 │  ← dp[0][0] = 2 (answer)
  ├───┼───┼───┤
1 │ 1 │ 0 │ 1 │  ← dp[1][1] = 0 (obstacle blocks all paths through it)
  ├───┼───┼───┤
2 │ 1 │ 1 │ 1 │  ← dp[2][2] = 1 (destination)
  └───┴───┴───┘

Each cell shows: number of paths from that cell to destination (2,2)
```



**The Two Valid Paths:**

```markdown
Path 1:                          Path 2:
    0   1   2                        0   1   2
  ┌───┬───┬───┐                    ┌───┬───┬───┐
0 │ ● │   │   │                  0 │ ● │ → │ ● │
  ├───┼───┼───┤                    ├───┼───┼───┤
1 │ ↓ │ █ │   │                  1 │   │ █ │ ↓ │
  ├───┼───┼───┤                    ├───┼───┼───┤
2 │ ● │ → │ ● │                  2 │   │   │ ● │
  └───┴───┴───┘                    └───┴───┴───┘

(0,0)→(1,0)→(2,0)→(2,1)→(2,2)    (0,0)→(0,1)→(0,2)→(1,2)→(2,2)
```

**Result:** `dp[0][0] = 2` unique paths from start to end

</details>

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Dynamic Programming (Bottom-Up)

<details>
<summary>Example - Dry Run</summary>

Consider `obstacleGrid` (3x3 with obstacle at position (1,1)):

```markdown
Input: obstacleGrid (0 = empty, 1 = obstacle)

    0   1   2
  ┌───┬───┬───┐
0 │ 0 │ 0 │ 0 │
  ├───┼───┼───┤
1 │ 0 │ █ │ 0 │  ← obstacle at (1,1)
  ├───┼───┼───┤
2 │ 0 │ 0 │ 0 │
  └───┴───┴───┘

Legend: █ = obstacle (value 1), 0 = empty cell
```



**Bottom-Up DP Table Construction**

The algorithm fills the DP table from destination `(2,2)` back to start `(0,0)`.
Each cell stores the number of paths from that cell to the destination.
Formula: `dp[r][c] = dp[r+1][c] + dp[r][c+1]` (paths from below + paths from right)



**Step 0: Initialize DP table with boundary**

```markdown
DP Table (4x4, extra row/col for boundary handling):

    0   1   2   3
  ┌───┬───┬───┬───┐
0 │ ? │ ? │ ? │ 0 │
  ├───┼───┼───┼───┤
1 │ ? │ ? │ ? │ 0 │  ← boundary column (col 3)
  ├───┼───┼───┼───┤
2 │ ? │ ? │ 1 │ 0 │  ← dp[2][2] = 1 (destination initialized)
  ├───┼───┼───┼───┤
3 │ 0 │ 0 │ 0 │ 0 │  ← boundary row
  └───┴───┴───┴───┘
```



**Step 1: Process row 2 (bottom row, right to left)**

```markdown
c=2: dp[2][2] = 1 (already set - destination)
c=1: dp[2][1] = dp[3][1] + dp[2][2] = 0 + 1 = 1
c=0: dp[2][0] = dp[3][0] + dp[2][1] = 0 + 1 = 1

    0   1   2   3
  ┌───┬───┬───┬───┐
0 │ ? │ ? │ ? │ 0 │
  ├───┼───┼───┼───┤
1 │ ? │ ? │ ? │ 0 │
  ├───┼───┼───┼───┤
2 │ 1 │ 1 │ 1 │ 0 │  ← row 2 complete: only one way to reach end from each cell
  ├───┼───┼───┼───┤
3 │ 0 │ 0 │ 0 │ 0 │
  └───┴───┴───┴───┘
```



**Step 2: Process row 1 (middle row, right to left)**

```markdown
c=2: dp[1][2] = dp[2][2] + dp[1][3] = 1 + 0 = 1
c=1: grid[1][1] = OBSTACLE! → dp[1][1] = 0 (no paths through obstacle)
c=0: dp[1][0] = dp[2][0] + dp[1][1] = 1 + 0 = 1

    0   1   2   3
  ┌───┬───┬───┬───┐
0 │ ? │ ? │ ? │ 0 │
  ├───┼───┼───┼───┤
1 │ 1 │ 0 │ 1 │ 0 │  ← dp[1][1] = 0 because █ blocks all paths
  ├───┼───┼───┼───┤
2 │ 1 │ 1 │ 1 │ 0 │
  ├───┼───┼───┼───┤
3 │ 0 │ 0 │ 0 │ 0 │
  └───┴───┴───┴───┘
```



**Step 3: Process row 0 (top row, right to left)**

```markdown
c=2: dp[0][2] = dp[1][2] + dp[0][3] = 1 + 0 = 1
c=1: dp[0][1] = dp[1][1] + dp[0][2] = 0 + 1 = 1
c=0: dp[0][0] = dp[1][0] + dp[0][1] = 1 + 1 = 2  ← ANSWER!

    0   1   2   3
  ┌───┬───┬───┬───┐
0 │ 2 │ 1 │ 1 │ 0 │  ← dp[0][0] = 2 paths to destination
  ├───┼───┼───┼───┤
1 │ 1 │ 0 │ 1 │ 0 │
  ├───┼───┼───┼───┤
2 │ 1 │ 1 │ 1 │ 0 │
  ├───┼───┼───┼───┤
3 │ 0 │ 0 │ 0 │ 0 │
  └───┴───┴───┴───┘
```



**Final DP Table (without boundary):**

```markdown
    0   1   2
  ┌───┬───┬───┐
0 │ 2 │ 1 │ 1 │  ← 2 paths from start
  ├───┼───┼───┤
1 │ 1 │ 0 │ 1 │  ← obstacle = 0 paths
  ├───┼───┼───┤
2 │ 1 │ 1 │ 1 │  ← destination
  └───┴───┴───┘

Result: dp[0][0] = 2 unique paths
```

</details>

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 3. Dynamic Programming (Space Optimized)

<details>
<summary>Example - Dry Run</summary>

Consider `obstacleGrid` (3x3 with obstacle at position (1,1)):

```markdown
Input: obstacleGrid (0 = empty, 1 = obstacle)

    0   1   2
  ┌───┬───┬───┐
0 │ 0 │ 0 │ 0 │
  ├───┼───┼───┤
1 │ 0 │ █ │ 0 │  ← obstacle at (1,1)
  ├───┼───┼───┤
2 │ 0 │ 0 │ 0 │
  └───┴───┴───┘

Legend: █ = obstacle (value 1), 0 = empty cell
```



**Space Optimization: 1D Array Instead of 2D Table**

Instead of a 2D DP table, we use a 1D array of size `N+1 = 4`.

Key insight:
- `dp[c]` (before update) = paths from the cell below (previous row)
- `dp[c+1]` (after update) = paths from the cell to the right (current row)
- Formula: `dp[c] += dp[c+1]`



**Step 0: Initialize 1D DP array**

```markdown
dp = [ 0 ,  0 ,  1 ,  0 ]
       ↑    ↑    ↑    ↑
      c=0  c=1  c=2  c=3 (boundary)

       ?    ?   dst  boundary
```



**Step 1: Process row 2 (bottom row, right to left)**

```markdown
c=2: grid[2][2] = 0 (empty)
     dp[2] += dp[3]  →  dp[2] = 1 + 0 = 1

c=1: grid[2][1] = 0 (empty)
     dp[1] += dp[2]  →  dp[1] = 0 + 1 = 1

c=0: grid[2][0] = 0 (empty)
     dp[0] += dp[1]  →  dp[0] = 0 + 1 = 1

dp = [ 1 ,  1 ,  1 ,  0 ]
       ↑    ↑    ↑
      c=0  c=1  c=2

Represents row 2 of the 2D table:
┌───┬───┬───┐
│ 1 │ 1 │ 1 │  ← row 2
└───┴───┴───┘
```



**Step 2: Process row 1 (middle row, right to left)**

```markdown
c=2: grid[1][2] = 0 (empty)
     dp[2] += dp[3]  →  dp[2] = 1 + 0 = 1

c=1: grid[1][1] = 1 (OBSTACLE!)
     dp[1] = 0  →  RESET to 0 (no paths through obstacle)

c=0: grid[1][0] = 0 (empty)
     dp[0] += dp[1]  →  dp[0] = 1 + 0 = 1

dp = [ 1 ,  0 ,  1 ,  0 ]
            ↑
           █ obstacle blocks paths

Represents row 1 of the 2D table:
┌───┬───┬───┐
│ 1 │ 0 │ 1 │  ← row 1 (obstacle at c=1)
└───┴───┴───┘
```



**Step 3: Process row 0 (top row, right to left)**

```markdown
c=2: grid[0][2] = 0 (empty)
     dp[2] += dp[3]  →  dp[2] = 1 + 0 = 1

c=1: grid[0][1] = 0 (empty)
     dp[1] += dp[2]  →  dp[1] = 0 + 1 = 1

c=0: grid[0][0] = 0 (empty)
     dp[0] += dp[1]  →  dp[0] = 1 + 1 = 2  ← ANSWER!

dp = [ 2 ,  1 ,  1 ,  0 ]
       ↑
      answer

Represents row 0 of the 2D table:
┌───┬───┬───┐
│ 2 │ 1 │ 1 │  ← row 0
└───┴───┴───┘
```



**Evolution of the 1D DP Array:**

```markdown
                  c=0  c=1  c=2  c=3
                ┌────┬────┬────┬────┐
Initialize:     │  0 │  0 │  1 │  0 │
                └────┴────┴────┴────┘
                           ↑
                          dst
                           │
                           ▼
                ┌────┬────┬────┬────┐
After row 2:    │  1 │  1 │  1 │  0 │
                └────┴────┴────┴────┘
                           │
                           ▼
                ┌────┬────┬────┬────┐
After row 1:    │  1 │  0 │  1 │  0 │  ← obstacle at c=1 resets to 0
                └────┴────┴────┴────┘
                      ↑
                      █
                           │
                           ▼
                ┌────┬────┬────┬────┐
After row 0:    │  2 │  1 │  1 │  0 │  ← dp[0] = 2
                └────┴────┴────┴────┘
                  ↑
                answer

Result: dp[0] = 2 unique paths
```

</details>

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 4. Dynamic Programming (In-Place)

<details>
<summary>Example - Dry Run</summary>

Consider `obstacleGrid` (3x3 with obstacle at position (1,1)):

```markdown
Input: obstacleGrid (0 = empty, 1 = obstacle)

    0   1   2
  ┌───┬───┬───┐
0 │ 0 │ 0 │ 0 │
  ├───┼───┼───┤
1 │ 0 │ █ │ 0 │  ← obstacle at (1,1), value = 1
  ├───┼───┼───┤
2 │ 0 │ 0 │ 0 │
  └───┴───┴───┘

Legend: █ = obstacle (value 1), 0 = empty cell
```



**In-Place Modification: Reuse Input Grid**

This approach modifies the input grid directly to store path counts.
- Empty cells (0) become path counts
- Obstacles (1) become 0 (no paths through them)
- Formula: `grid[r][c] = grid[r+1][c] + grid[r][c+1]`



**Step 0: Initialize destination**

```markdown
grid[2][2] = 1 (1 way to reach destination from itself)

    0   1   2
  ┌───┬───┬───┐
0 │ 0 │ 0 │ 0 │
  ├───┼───┼───┤
1 │ 0 │ █ │ 0 │  ← obstacle still has value 1
  ├───┼───┼───┤
2 │ 0 │ 0 │ 1 │  ← destination initialized
  └───┴───┴───┘
```



**Step 1: Process row 2 (bottom row, right to left)**

```markdown
(2,2): SKIP - destination already set to 1
(2,1): grid[2][1] = 0 (empty), compute paths:
       down = 0 (out of bounds), right = grid[2][2] = 1
       grid[2][1] = 0 + 1 = 1
(2,0): grid[2][0] = 0 (empty), compute paths:
       down = 0 (out of bounds), right = grid[2][1] = 1
       grid[2][0] = 0 + 1 = 1

    0   1   2
  ┌───┬───┬───┐
0 │ 0 │ 0 │ 0 │
  ├───┼───┼───┤
1 │ 0 │ █ │ 0 │
  ├───┼───┼───┤
2 │ 1 │ 1 │ 1 │  ← bottom row: only one way to reach end
  └───┴───┴───┘
```



**Step 2: Process row 1 (middle row, right to left)**

```markdown
(1,2): grid[1][2] = 0 (empty), compute paths:
       down = grid[2][2] = 1, right = 0 (out of bounds)
       grid[1][2] = 1 + 0 = 1
(1,1): grid[1][1] = 1 (OBSTACLE!)
       grid[1][1] = 0  ← convert obstacle to 0 (no paths through)
(1,0): grid[1][0] = 0 (empty), compute paths:
       down = grid[2][0] = 1, right = grid[1][1] = 0
       grid[1][0] = 1 + 0 = 1

    0   1   2
  ┌───┬───┬───┐
0 │ 0 │ 0 │ 0 │
  ├───┼───┼───┤
1 │ 1 │ 0 │ 1 │  ← obstacle converted: █ (1) → 0
  ├───┼───┼───┤
2 │ 1 │ 1 │ 1 │
  └───┴───┴───┘
```



**Step 3: Process row 0 (top row, right to left)**

```markdown
(0,2): grid[0][2] = 0 (empty), compute paths:
       down = grid[1][2] = 1, right = 0 (out of bounds)
       grid[0][2] = 1 + 0 = 1
(0,1): grid[0][1] = 0 (empty), compute paths:
       down = grid[1][1] = 0, right = grid[0][2] = 1
       grid[0][1] = 0 + 1 = 1
(0,0): grid[0][0] = 0 (empty), compute paths:
       down = grid[1][0] = 1, right = grid[0][1] = 1
       grid[0][0] = 1 + 1 = 2  ← ANSWER!

    0   1   2
  ┌───┬───┬───┐
0 │ 2 │ 1 │ 1 │  ← grid[0][0] = 2 paths to destination
  ├───┼───┼───┤
1 │ 1 │ 0 │ 1 │
  ├───┼───┼───┤
2 │ 1 │ 1 │ 1 │
  └───┴───┴───┘
```



**Before and After Transformation:**

```markdown
BEFORE (Input):                    AFTER (In-Place Modified):

    0   1   2                          0   1   2
  ┌───┬───┬───┐                      ┌───┬───┬───┐
0 │ 0 │ 0 │ 0 │                    0 │ 2 │ 1 │ 1 │  ← answer
  ├───┼───┼───┤                      ├───┼───┼───┤
1 │ 0 │ █ │ 0 │       ═══════►     1 │ 1 │ 0 │ 1 │  ← █ became 0
  ├───┼───┼───┤                      ├───┼───┼───┤
2 │ 0 │ 0 │ 0 │                    2 │ 1 │ 1 │ 1 │
  └───┴───┴───┘                      └───┴───┴───┘

  0 = empty cell                     Each cell = # of paths to (2,2)
  █ = obstacle (1)                   Obstacle → 0 (no paths through it)

Result: grid[0][0] = 2 unique paths
```

</details>

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns.
