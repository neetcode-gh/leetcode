## 1. Dynamic Programming (Top-Down)

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
