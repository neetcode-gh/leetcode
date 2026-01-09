## 1. Recursion

### Intuition
Instead of thinking about one person going from the top-left to the bottom-right and then back, we can simulate two people starting from the top-left and moving simultaneously toward the bottom-right. Since both paths must eventually reach the destination, we track their positions using four variables (r1, c1) and (r2, c2). At each step, both move either down or right, giving us 4 combinations of moves. When they land on the same cell, we only count the cherries once to avoid double counting.

### Algorithm
1. Use a recursive function `dfs(r1, c1, r2, c2)` that returns the maximum cherries collected when person 1 is at (r1, c1) and person 2 is at (r2, c2).
2. Base case: If either person goes out of bounds or lands on a thorn (-1), return a large negative value to invalidate this path.
3. Base case: If both reach the destination (n-1, n-1), return the cherry value at that cell.
4. Try all 4 combinations of moves: both down, both right, one down and one right, or vice versa.
5. Add cherries from both current positions, but subtract one if they are on the same cell.
6. Return the maximum result. If the final answer is negative, return 0 (no valid path exists).

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

```go
func cherryPickup(grid [][]int) int {
    n := len(grid)
    var dfs func(r1, c1, r2, c2 int) int
    dfs = func(r1, c1, r2, c2 int) int {
        if r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1 {
            return -1000
        }
        if r1 == n-1 && c1 == n-1 && r2 == n-1 && c2 == n-1 {
            return grid[r1][c1]
        }
        res := dfs(r1+1, c1, r2+1, c2)
        res = max(res, dfs(r1+1, c1, r2, c2+1))
        res = max(res, dfs(r1, c1+1, r2+1, c2))
        res = max(res, dfs(r1, c1+1, r2, c2+1))
        res += grid[r1][c1] + grid[r2][c2]
        if r1 == r2 && c1 == c2 {
            res -= grid[r1][c1]
        }
        return res
    }
    return max(0, dfs(0, 0, 0, 0))
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
        val n = grid.size
        fun dfs(r1: Int, c1: Int, r2: Int, c2: Int): Int {
            if (r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1) {
                return -1000
            }
            if (r1 == n - 1 && c1 == n - 1 && r2 == n - 1 && c2 == n - 1) {
                return grid[r1][c1]
            }
            var res = dfs(r1 + 1, c1, r2 + 1, c2)
            res = maxOf(res, dfs(r1 + 1, c1, r2, c2 + 1))
            res = maxOf(res, dfs(r1, c1 + 1, r2 + 1, c2))
            res = maxOf(res, dfs(r1, c1 + 1, r2, c2 + 1))
            res += grid[r1][c1] + grid[r2][c2]
            if (r1 == r2 && c1 == c2) res -= grid[r1][c1]
            return res
        }
        return maxOf(0, dfs(0, 0, 0, 0))
    }
}
```

```swift
class Solution {
    func cherryPickup(_ grid: [[Int]]) -> Int {
        let n = grid.count
        func dfs(_ r1: Int, _ c1: Int, _ r2: Int, _ c2: Int) -> Int {
            if r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1 {
                return -1000
            }
            if r1 == n - 1 && c1 == n - 1 && r2 == n - 1 && c2 == n - 1 {
                return grid[r1][c1]
            }
            var res = dfs(r1 + 1, c1, r2 + 1, c2)
            res = max(res, dfs(r1 + 1, c1, r2, c2 + 1))
            res = max(res, dfs(r1, c1 + 1, r2 + 1, c2))
            res = max(res, dfs(r1, c1 + 1, r2, c2 + 1))
            res += grid[r1][c1] + grid[r2][c2]
            if r1 == r2 && c1 == c2 {
                res -= grid[r1][c1]
            }
            return res
        }
        return max(0, dfs(0, 0, 0, 0))
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(16 ^ n)$
* Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

### Intuition
The recursive solution has overlapping subproblems since the same combination of positions can be reached through different paths. By storing the results of each state (r1, c1, r2, c2) in a 4D memoization table, we avoid redundant calculations. This transforms the exponential time complexity into polynomial time.

### Algorithm
1. Create a 4D DP array initialized to negative infinity to track visited states.
2. Use the same recursive function `dfs(r1, c1, r2, c2)` as before.
3. Before computing, check if the current state is already cached in the DP array. If so, return the cached value.
4. After computing the result for a state, store it in the DP array before returning.
5. The rest of the logic remains identical to the recursive approach.

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

```go
func cherryPickup(grid [][]int) int {
    n := len(grid)
    dp := make([][][][]int, n)
    for i := range dp {
        dp[i] = make([][][]int, n)
        for j := range dp[i] {
            dp[i][j] = make([][]int, n)
            for k := range dp[i][j] {
                dp[i][j][k] = make([]int, n)
                for l := range dp[i][j][k] {
                    dp[i][j][k][l] = -1 << 30
                }
            }
        }
    }

    var dfs func(r1, c1, r2, c2 int) int
    dfs = func(r1, c1, r2, c2 int) int {
        if r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1 {
            return -1000
        }
        if r1 == n-1 && c1 == n-1 && r2 == n-1 && c2 == n-1 {
            return grid[r1][c1]
        }
        if dp[r1][c1][r2][c2] != -1<<30 {
            return dp[r1][c1][r2][c2]
        }
        res := dfs(r1+1, c1, r2+1, c2)
        res = max(res, dfs(r1+1, c1, r2, c2+1))
        res = max(res, dfs(r1, c1+1, r2+1, c2))
        res = max(res, dfs(r1, c1+1, r2, c2+1))
        res += grid[r1][c1] + grid[r2][c2]
        if r1 == r2 && c1 == c2 {
            res -= grid[r1][c1]
        }
        dp[r1][c1][r2][c2] = res
        return res
    }
    return max(0, dfs(0, 0, 0, 0))
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
        val n = grid.size
        val dp = Array(n) { Array(n) { Array(n) { IntArray(n) { Int.MIN_VALUE } } } }

        fun dfs(r1: Int, c1: Int, r2: Int, c2: Int): Int {
            if (r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1) {
                return -1000
            }
            if (r1 == n - 1 && c1 == n - 1 && r2 == n - 1 && c2 == n - 1) {
                return grid[r1][c1]
            }
            if (dp[r1][c1][r2][c2] != Int.MIN_VALUE) {
                return dp[r1][c1][r2][c2]
            }
            var res = dfs(r1 + 1, c1, r2 + 1, c2)
            res = maxOf(res, dfs(r1 + 1, c1, r2, c2 + 1))
            res = maxOf(res, dfs(r1, c1 + 1, r2 + 1, c2))
            res = maxOf(res, dfs(r1, c1 + 1, r2, c2 + 1))
            res += grid[r1][c1] + grid[r2][c2]
            if (r1 == r2 && c1 == c2) res -= grid[r1][c1]
            dp[r1][c1][r2][c2] = res
            return res
        }
        return maxOf(0, dfs(0, 0, 0, 0))
    }
}
```

```swift
class Solution {
    func cherryPickup(_ grid: [[Int]]) -> Int {
        let n = grid.count
        var dp = Array(repeating: Array(repeating: Array(repeating: Array(repeating: Int.min, count: n), count: n), count: n), count: n)

        func dfs(_ r1: Int, _ c1: Int, _ r2: Int, _ c2: Int) -> Int {
            if r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1 {
                return -1000
            }
            if r1 == n - 1 && c1 == n - 1 && r2 == n - 1 && c2 == n - 1 {
                return grid[r1][c1]
            }
            if dp[r1][c1][r2][c2] != Int.min {
                return dp[r1][c1][r2][c2]
            }
            var res = dfs(r1 + 1, c1, r2 + 1, c2)
            res = max(res, dfs(r1 + 1, c1, r2, c2 + 1))
            res = max(res, dfs(r1, c1 + 1, r2 + 1, c2))
            res = max(res, dfs(r1, c1 + 1, r2, c2 + 1))
            res += grid[r1][c1] + grid[r2][c2]
            if r1 == r2 && c1 == c2 {
                res -= grid[r1][c1]
            }
            dp[r1][c1][r2][c2] = res
            return res
        }
        return max(0, dfs(0, 0, 0, 0))
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 4)$
* Space complexity: $O(n ^ 4)$

---

## 3. Dynamic Programming (Top-Down) Optimized

### Intuition
We can reduce the state space by observing that both people always take the same number of steps. If person 1 is at (r1, c1), then they have taken r1 + c1 steps. Since person 2 has also taken the same number of steps, if we know r2, we can derive c2 as (r1 + c1 - r2). This reduces our state from 4 dimensions to 3 dimensions.

### Algorithm
1. Create a 3D DP array using only (r1, c1, r2) as state variables.
2. Compute c2 dynamically as `c2 = r1 + c1 - r2`.
3. Check bounds for all four coordinates, including the computed c2.
4. Base case: When person 1 reaches (n-1, n-1), return the cherry value.
5. Try all 4 move combinations, recursively compute the maximum cherries, and cache the result.
6. Add cherries from both positions, avoiding double counting when positions match.

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

```go
func cherryPickup(grid [][]int) int {
    n := len(grid)
    dp := make([][][]int, n)
    for i := range dp {
        dp[i] = make([][]int, n)
        for j := range dp[i] {
            dp[i][j] = make([]int, n)
            for k := range dp[i][j] {
                dp[i][j][k] = -1 << 30
            }
        }
    }

    var dfs func(r1, c1, r2 int) int
    dfs = func(r1, c1, r2 int) int {
        c2 := r1 + c1 - r2
        if r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1 {
            return -1000
        }
        if r1 == n-1 && c1 == n-1 {
            return grid[r1][c1]
        }
        if dp[r1][c1][r2] != -1<<30 {
            return dp[r1][c1][r2]
        }
        res := dfs(r1+1, c1, r2+1)
        res = max(res, dfs(r1+1, c1, r2))
        res = max(res, dfs(r1, c1+1, r2+1))
        res = max(res, dfs(r1, c1+1, r2))
        res += grid[r1][c1]
        if !(r1 == r2 && c1 == c2) {
            res += grid[r2][c2]
        }
        dp[r1][c1][r2] = res
        return res
    }
    return max(0, dfs(0, 0, 0))
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
        val n = grid.size
        val dp = Array(n) { Array(n) { IntArray(n) { Int.MIN_VALUE } } }

        fun dfs(r1: Int, c1: Int, r2: Int): Int {
            val c2 = r1 + c1 - r2
            if (r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1) {
                return -1000
            }
            if (r1 == n - 1 && c1 == n - 1) {
                return grid[r1][c1]
            }
            if (dp[r1][c1][r2] != Int.MIN_VALUE) {
                return dp[r1][c1][r2]
            }
            var res = dfs(r1 + 1, c1, r2 + 1)
            res = maxOf(res, dfs(r1 + 1, c1, r2))
            res = maxOf(res, dfs(r1, c1 + 1, r2 + 1))
            res = maxOf(res, dfs(r1, c1 + 1, r2))
            res += grid[r1][c1]
            if (!(r1 == r2 && c1 == c2)) res += grid[r2][c2]
            dp[r1][c1][r2] = res
            return res
        }
        return maxOf(0, dfs(0, 0, 0))
    }
}
```

```swift
class Solution {
    func cherryPickup(_ grid: [[Int]]) -> Int {
        let n = grid.count
        var dp = Array(repeating: Array(repeating: Array(repeating: Int.min, count: n), count: n), count: n)

        func dfs(_ r1: Int, _ c1: Int, _ r2: Int) -> Int {
            let c2 = r1 + c1 - r2
            if r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1 {
                return -1000
            }
            if r1 == n - 1 && c1 == n - 1 {
                return grid[r1][c1]
            }
            if dp[r1][c1][r2] != Int.min {
                return dp[r1][c1][r2]
            }
            var res = dfs(r1 + 1, c1, r2 + 1)
            res = max(res, dfs(r1 + 1, c1, r2))
            res = max(res, dfs(r1, c1 + 1, r2 + 1))
            res = max(res, dfs(r1, c1 + 1, r2))
            res += grid[r1][c1]
            if !(r1 == r2 && c1 == c2) {
                res += grid[r2][c2]
            }
            dp[r1][c1][r2] = res
            return res
        }
        return max(0, dfs(0, 0, 0))
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 3)$
* Space complexity: $O(n ^ 3)$

---

## 4. Dynamic Programming (Bottom-Up)

### Intuition
Instead of recursion with memoization, we can fill the DP table iteratively starting from the destination and working backward to the start. We iterate through all valid combinations of (r1, c1, r2) in reverse order, computing c2 from the constraint, and build up the solution from smaller subproblems.

### Algorithm
1. Create a 3D DP array with dimensions [n][n][n].
2. Iterate from (n-1, n-1, n-1) down to (0, 0, 0) for (r1, c1, r2).
3. For each state, compute c2 = r1 + c1 - r2. Skip if c2 is out of bounds.
4. Skip states where either position lands on a thorn.
5. Base case: If at destination, store the cherry value.
6. Otherwise, look at all 4 possible next states (from the already computed future states) and take the maximum.
7. Add current cherries, avoiding double counting when both are on the same cell.
8. Return dp[0][0][0], clamped to 0 if negative.

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

```go
func cherryPickup(grid [][]int) int {
    n := len(grid)
    dp := make([][][]int, n)
    for i := range dp {
        dp[i] = make([][]int, n)
        for j := range dp[i] {
            dp[i][j] = make([]int, n)
            for k := range dp[i][j] {
                dp[i][j][k] = -1000000000
            }
        }
    }

    for r1 := n - 1; r1 >= 0; r1-- {
        for c1 := n - 1; c1 >= 0; c1-- {
            for r2 := n - 1; r2 >= 0; r2-- {
                c2 := r1 + c1 - r2
                if c2 < 0 || c2 >= n {
                    continue
                }
                if grid[r1][c1] == -1 || grid[r2][c2] == -1 {
                    continue
                }

                if r1 == n-1 && c1 == n-1 {
                    dp[r1][c1][r2] = grid[r1][c1]
                } else {
                    res := -1000000000
                    if r1+1 < n && r2+1 < n {
                        res = max(res, dp[r1+1][c1][r2+1])
                    }
                    if r1+1 < n {
                        res = max(res, dp[r1+1][c1][r2])
                    }
                    if c1+1 < n && r2+1 < n {
                        res = max(res, dp[r1][c1+1][r2+1])
                    }
                    if c1+1 < n {
                        res = max(res, dp[r1][c1+1][r2])
                    }
                    if res == -1000000000 {
                        continue
                    }
                    res += grid[r1][c1]
                    if r1 != r2 || c1 != c2 {
                        res += grid[r2][c2]
                    }
                    dp[r1][c1][r2] = res
                }
            }
        }
    }
    return max(0, dp[0][0][0])
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
        val n = grid.size
        val dp = Array(n) { Array(n) { IntArray(n) { Int.MIN_VALUE / 2 } } }

        for (r1 in n - 1 downTo 0) {
            for (c1 in n - 1 downTo 0) {
                for (r2 in n - 1 downTo 0) {
                    val c2 = r1 + c1 - r2
                    if (c2 < 0 || c2 >= n) continue
                    if (grid[r1][c1] == -1 || grid[r2][c2] == -1) continue

                    if (r1 == n - 1 && c1 == n - 1) {
                        dp[r1][c1][r2] = grid[r1][c1]
                    } else {
                        var res = Int.MIN_VALUE / 2
                        if (r1 + 1 < n && r2 + 1 < n) res = maxOf(res, dp[r1 + 1][c1][r2 + 1])
                        if (r1 + 1 < n) res = maxOf(res, dp[r1 + 1][c1][r2])
                        if (c1 + 1 < n && r2 + 1 < n) res = maxOf(res, dp[r1][c1 + 1][r2 + 1])
                        if (c1 + 1 < n) res = maxOf(res, dp[r1][c1 + 1][r2])
                        if (res == Int.MIN_VALUE / 2) continue
                        res += grid[r1][c1]
                        if (r1 != r2 || c1 != c2) res += grid[r2][c2]
                        dp[r1][c1][r2] = res
                    }
                }
            }
        }
        return maxOf(0, dp[0][0][0])
    }
}
```

```swift
class Solution {
    func cherryPickup(_ grid: [[Int]]) -> Int {
        let n = grid.count
        let minVal = Int.min / 2
        var dp = Array(repeating: Array(repeating: Array(repeating: minVal, count: n), count: n), count: n)

        for r1 in stride(from: n - 1, through: 0, by: -1) {
            for c1 in stride(from: n - 1, through: 0, by: -1) {
                for r2 in stride(from: n - 1, through: 0, by: -1) {
                    let c2 = r1 + c1 - r2
                    if c2 < 0 || c2 >= n { continue }
                    if grid[r1][c1] == -1 || grid[r2][c2] == -1 { continue }

                    if r1 == n - 1 && c1 == n - 1 {
                        dp[r1][c1][r2] = grid[r1][c1]
                    } else {
                        var res = minVal
                        if r1 + 1 < n && r2 + 1 < n { res = max(res, dp[r1 + 1][c1][r2 + 1]) }
                        if r1 + 1 < n { res = max(res, dp[r1 + 1][c1][r2]) }
                        if c1 + 1 < n && r2 + 1 < n { res = max(res, dp[r1][c1 + 1][r2 + 1]) }
                        if c1 + 1 < n { res = max(res, dp[r1][c1 + 1][r2]) }
                        if res == minVal { continue }
                        res += grid[r1][c1]
                        if r1 != r2 || c1 != c2 { res += grid[r2][c2] }
                        dp[r1][c1][r2] = res
                    }
                }
            }
        }
        return max(0, dp[0][0][0])
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 3)$
* Space complexity: $O(n ^ 3)$

---

## 5. Dynamic Programming (Space Optimized)

### Intuition
Since we process states by the total number of steps k = r1 + c1 = r2 + c2, and each state only depends on states from the previous step count, we only need to keep track of the previous layer. This reduces space from O(n^3) to O(n^2) by using two 2D arrays that alternate between the current and previous step.

### Algorithm
1. Create a 2D `prev` array of size [n][n] representing states for the previous step count.
2. Initialize prev[0][0] with the starting cell's cherry value.
3. For each step count k from 1 to 2n-2:
   - Create a new 2D `dp` array for the current step.
   - For each valid (r1, r2) pair where c1 = k - r1 and c2 = k - r2 are within bounds:
     - Look at all 4 transitions from the previous step.
     - Take the maximum and add current cherries (avoiding double counting).
   - Set prev = dp for the next iteration.
4. Return prev[n-1][n-1], clamped to 0 if negative.

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

```go
func cherryPickup(grid [][]int) int {
    n := len(grid)
    prev := make([][]int, n)
    for i := range prev {
        prev[i] = make([]int, n)
        for j := range prev[i] {
            prev[i][j] = -1 << 30
        }
    }
    prev[0][0] = grid[0][0]

    for k := 1; k < 2*n-1; k++ {
        dp := make([][]int, n)
        for i := range dp {
            dp[i] = make([]int, n)
            for j := range dp[i] {
                dp[i][j] = -1 << 30
            }
        }
        for r1 := max(0, k-(n-1)); r1 <= min(n-1, k); r1++ {
            c1 := k - r1
            if c1 >= n || grid[r1][c1] == -1 {
                continue
            }
            for r2 := max(0, k-(n-1)); r2 <= min(n-1, k); r2++ {
                c2 := k - r2
                if c2 >= n || grid[r2][c2] == -1 {
                    continue
                }
                val := prev[r1][r2]
                if r1 > 0 {
                    val = max(val, prev[r1-1][r2])
                }
                if r2 > 0 {
                    val = max(val, prev[r1][r2-1])
                }
                if r1 > 0 && r2 > 0 {
                    val = max(val, prev[r1-1][r2-1])
                }
                if val < 0 {
                    continue
                }
                val += grid[r1][c1]
                if r1 != r2 {
                    val += grid[r2][c2]
                }
                dp[r1][r2] = val
            }
        }
        prev = dp
    }
    return max(0, prev[n-1][n-1])
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
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
    fun cherryPickup(grid: Array<IntArray>): Int {
        val n = grid.size
        var prev = Array(n) { IntArray(n) { Int.MIN_VALUE } }
        prev[0][0] = grid[0][0]

        for (k in 1 until 2 * n - 1) {
            val dp = Array(n) { IntArray(n) { Int.MIN_VALUE } }
            for (r1 in maxOf(0, k - (n - 1))..minOf(n - 1, k)) {
                val c1 = k - r1
                if (c1 >= n || grid[r1][c1] == -1) continue
                for (r2 in maxOf(0, k - (n - 1))..minOf(n - 1, k)) {
                    val c2 = k - r2
                    if (c2 >= n || grid[r2][c2] == -1) continue
                    var value = prev[r1][r2]
                    if (r1 > 0) value = maxOf(value, prev[r1 - 1][r2])
                    if (r2 > 0) value = maxOf(value, prev[r1][r2 - 1])
                    if (r1 > 0 && r2 > 0) value = maxOf(value, prev[r1 - 1][r2 - 1])
                    if (value < 0) continue
                    value += grid[r1][c1]
                    if (r1 != r2) value += grid[r2][c2]
                    dp[r1][r2] = value
                }
            }
            prev = dp
        }
        return maxOf(0, prev[n - 1][n - 1])
    }
}
```

```swift
class Solution {
    func cherryPickup(_ grid: [[Int]]) -> Int {
        let n = grid.count
        var prev = Array(repeating: Array(repeating: Int.min, count: n), count: n)
        prev[0][0] = grid[0][0]

        for k in 1..<(2 * n - 1) {
            var dp = Array(repeating: Array(repeating: Int.min, count: n), count: n)
            for r1 in max(0, k - (n - 1))...min(n - 1, k) {
                let c1 = k - r1
                if c1 >= n || grid[r1][c1] == -1 { continue }
                for r2 in max(0, k - (n - 1))...min(n - 1, k) {
                    let c2 = k - r2
                    if c2 >= n || grid[r2][c2] == -1 { continue }
                    var val = prev[r1][r2]
                    if r1 > 0 { val = max(val, prev[r1 - 1][r2]) }
                    if r2 > 0 { val = max(val, prev[r1][r2 - 1]) }
                    if r1 > 0 && r2 > 0 { val = max(val, prev[r1 - 1][r2 - 1]) }
                    if val < 0 { continue }
                    val += grid[r1][c1]
                    if r1 != r2 { val += grid[r2][c2] }
                    dp[r1][r2] = val
                }
            }
            prev = dp
        }
        return max(0, prev[n - 1][n - 1])
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 3)$
* Space complexity: $O(n ^ 2)$