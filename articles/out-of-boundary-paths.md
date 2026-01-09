## 1. Recursion

::tabs-start

```python
class Solution:
    def findPaths(self, m: int, n: int, maxMove: int, startRow: int, startColumn: int) -> int:
        ROWS, COLS = m, n
        MOD = 10**9 + 7

        def dfs(r, c, moves):
            if r < 0 or r >= ROWS or c < 0 or c >= COLS:
                return 1
            if moves == 0:
                return 0

            return (
                dfs(r + 1, c, moves - 1) +
                dfs(r - 1, c, moves - 1) +
                dfs(r, c + 1, moves - 1) +
                dfs(r, c - 1, moves - 1)
            ) % MOD

        return dfs(startRow, startColumn, maxMove)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    private int dfs(int r, int c, int moves, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n) return 1;
        if (moves == 0) return 0;

        return (
            (dfs(r + 1, c, moves - 1, m, n) + dfs(r - 1, c, moves - 1, m, n)) % MOD +
            (dfs(r, c + 1, moves - 1, m, n) + dfs(r, c - 1, moves - 1, m, n)) % MOD
        ) % MOD;
    }

    public int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        return dfs(startRow, startColumn, maxMove, m, n);
    }
}
```

```cpp
class Solution {
private:
    int MOD = 1'000'000'007;

    int dfs(int r, int c, int moves, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n) return 1;
        if (moves == 0) return 0;

        return (
            (dfs(r + 1, c, moves - 1, m, n) + dfs(r - 1, c, moves - 1, m, n)) % MOD +
            (dfs(r, c + 1, moves - 1, m, n) + dfs(r, c - 1, moves - 1, m, n)) % MOD
        ) % MOD;
    }

public:
    int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        return dfs(startRow, startColumn, maxMove, m, n);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @param {number} maxMove
     * @param {number} startRow
     * @param {number} startColumn
     * @return {number}
     */
    findPaths(m, n, maxMove, startRow, startColumn) {
        const MOD = 1_000_000_007;

        const dfs = (r, c, moves) => {
            if (r < 0 || r >= m || c < 0 || c >= n) return 1;
            if (moves === 0) return 0;

            return (
                (((dfs(r + 1, c, moves - 1) + dfs(r - 1, c, moves - 1)) % MOD) +
                    ((dfs(r, c + 1, moves - 1) + dfs(r, c - 1, moves - 1)) %
                        MOD)) %
                MOD
            );
        };

        return dfs(startRow, startColumn, maxMove);
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    private int Dfs(int r, int c, int moves, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n) return 1;
        if (moves == 0) return 0;

        return (int)(
            ((long)(Dfs(r + 1, c, moves - 1, m, n) + Dfs(r - 1, c, moves - 1, m, n)) % MOD +
            (long)(Dfs(r, c + 1, moves - 1, m, n) + Dfs(r, c - 1, moves - 1, m, n)) % MOD) % MOD
        );
    }

    public int FindPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        return Dfs(startRow, startColumn, maxMove, m, n);
    }
}
```

```go
func findPaths(m int, n int, maxMove int, startRow int, startColumn int) int {
    MOD := 1_000_000_007

    var dfs func(r, c, moves int) int
    dfs = func(r, c, moves int) int {
        if r < 0 || r >= m || c < 0 || c >= n {
            return 1
        }
        if moves == 0 {
            return 0
        }

        return ((dfs(r+1, c, moves-1)+dfs(r-1, c, moves-1))%MOD +
            (dfs(r, c+1, moves-1)+dfs(r, c-1, moves-1))%MOD) % MOD
    }

    return dfs(startRow, startColumn, maxMove)
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007

    private fun dfs(r: Int, c: Int, moves: Int, m: Int, n: Int): Int {
        if (r < 0 || r >= m || c < 0 || c >= n) return 1
        if (moves == 0) return 0

        return (((dfs(r + 1, c, moves - 1, m, n) + dfs(r - 1, c, moves - 1, m, n)) % MOD +
                (dfs(r, c + 1, moves - 1, m, n) + dfs(r, c - 1, moves - 1, m, n)) % MOD) % MOD)
    }

    fun findPaths(m: Int, n: Int, maxMove: Int, startRow: Int, startColumn: Int): Int {
        return dfs(startRow, startColumn, maxMove, m, n)
    }
}
```

```swift
class Solution {
    func findPaths(_ m: Int, _ n: Int, _ maxMove: Int, _ startRow: Int, _ startColumn: Int) -> Int {
        let MOD = 1_000_000_007

        func dfs(_ r: Int, _ c: Int, _ moves: Int) -> Int {
            if r < 0 || r >= m || c < 0 || c >= n { return 1 }
            if moves == 0 { return 0 }

            return (((dfs(r + 1, c, moves - 1) + dfs(r - 1, c, moves - 1)) % MOD +
                    (dfs(r, c + 1, moves - 1) + dfs(r, c - 1, moves - 1)) % MOD) % MOD)
        }

        return dfs(startRow, startColumn, maxMove)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(4 ^ N)$
- Space complexity: $O(N)$

> Where $m$ is the number of rows, $n$ is the number of columns, and $N$ is the maximum number of allowed moves.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def findPaths(self, m: int, n: int, maxMove: int, startRow: int, startColumn: int) -> int:
        ROWS, COLS = m, n
        MOD = 10**9 + 7
        cache = {}

        def dfs(r, c, moves):
            if r < 0 or r >= ROWS or c < 0 or c >= COLS:
                return 1
            if moves == 0:
                return 0
            if (r, c, moves) in cache:
                return cache[(r, c, moves)]

            cache[(r, c, moves)] = (
                dfs(r + 1, c, moves - 1) +
                dfs(r - 1, c, moves - 1) +
                dfs(r, c + 1, moves - 1) +
                dfs(r, c - 1, moves - 1)
            ) % MOD
            return cache[(r, c, moves)]

        return dfs(startRow, startColumn, maxMove)
```

```java
public class Solution {
    private int[][][] dp;
    private static final int MOD = 1_000_000_007;

    private int dfs(int r, int c, int moves, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n) return 1;
        if (moves == 0) return 0;
        if (dp[r][c][moves] != -1) return dp[r][c][moves];

        dp[r][c][moves] = (
            (dfs(r + 1, c, moves - 1, m, n) + dfs(r - 1, c, moves - 1, m, n)) % MOD +
            (dfs(r, c + 1, moves - 1, m, n) + dfs(r, c - 1, moves - 1, m, n)) % MOD
        ) % MOD;
        return dp[r][c][moves];
    }

    public int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        dp = new int[m][n][maxMove + 1];
        for (int[][] layer : dp) {
            for (int[] row : layer) {
                Arrays.fill(row, -1);
            }
        }
        return dfs(startRow, startColumn, maxMove, m, n);
    }
}
```

```cpp
class Solution {
private:
    vector<vector<vector<int>>> dp;
    int MOD = 1'000'000'007;

    int dfs(int r, int c, int moves, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n) return 1;
        if (moves == 0) return 0;
        if (dp[r][c][moves] != -1) return dp[r][c][moves];

        dp[r][c][moves] = (
            (dfs(r + 1, c, moves - 1, m, n) + dfs(r - 1, c, moves - 1, m, n)) % MOD +
            (dfs(r, c + 1, moves - 1, m, n) + dfs(r, c - 1, moves - 1, m, n)) % MOD
        ) % MOD;
        return dp[r][c][moves];
    }

public:
    int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        dp = vector<vector<vector<int>>>(m, vector<vector<int>>(n, vector<int>(maxMove + 1, -1)));
        return dfs(startRow, startColumn, maxMove, m, n);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @param {number} maxMove
     * @param {number} startRow
     * @param {number} startColumn
     * @return {number}
     */
    findPaths(m, n, maxMove, startRow, startColumn) {
        const MOD = 1_000_000_007;
        const dp = Array.from({ length: m }, () =>
            Array.from({ length: n }, () => Array(maxMove + 1).fill(-1)),
        );

        const dfs = (r, c, moves) => {
            if (r < 0 || r >= m || c < 0 || c >= n) return 1;
            if (moves === 0) return 0;
            if (dp[r][c][moves] !== -1) return dp[r][c][moves];

            dp[r][c][moves] =
                (((dfs(r + 1, c, moves - 1) + dfs(r - 1, c, moves - 1)) % MOD) +
                    ((dfs(r, c + 1, moves - 1) + dfs(r, c - 1, moves - 1)) %
                        MOD)) %
                MOD;
            return dp[r][c][moves];
        };

        return dfs(startRow, startColumn, maxMove);
    }
}
```

```csharp
public class Solution {
    private int[,,] dp;
    private const int MOD = 1_000_000_007;

    private int Dfs(int r, int c, int moves, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n) return 1;
        if (moves == 0) return 0;
        if (dp[r, c, moves] != -1) return dp[r, c, moves];

        dp[r, c, moves] = (int)(
            ((long)(Dfs(r + 1, c, moves - 1, m, n) + Dfs(r - 1, c, moves - 1, m, n)) % MOD +
            (long)(Dfs(r, c + 1, moves - 1, m, n) + Dfs(r, c - 1, moves - 1, m, n)) % MOD) % MOD
        );
        return dp[r, c, moves];
    }

    public int FindPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        dp = new int[m, n, maxMove + 1];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                for (int k = 0; k <= maxMove; k++) {
                    dp[i, j, k] = -1;
                }
            }
        }
        return Dfs(startRow, startColumn, maxMove, m, n);
    }
}
```

```go
func findPaths(m int, n int, maxMove int, startRow int, startColumn int) int {
    MOD := 1_000_000_007
    dp := make([][][]int, m)
    for i := range dp {
        dp[i] = make([][]int, n)
        for j := range dp[i] {
            dp[i][j] = make([]int, maxMove+1)
            for k := range dp[i][j] {
                dp[i][j][k] = -1
            }
        }
    }

    var dfs func(r, c, moves int) int
    dfs = func(r, c, moves int) int {
        if r < 0 || r >= m || c < 0 || c >= n {
            return 1
        }
        if moves == 0 {
            return 0
        }
        if dp[r][c][moves] != -1 {
            return dp[r][c][moves]
        }

        dp[r][c][moves] = ((dfs(r+1, c, moves-1)+dfs(r-1, c, moves-1))%MOD +
            (dfs(r, c+1, moves-1)+dfs(r, c-1, moves-1))%MOD) % MOD
        return dp[r][c][moves]
    }

    return dfs(startRow, startColumn, maxMove)
}
```

```kotlin
class Solution {
    private lateinit var dp: Array<Array<IntArray>>
    private val MOD = 1_000_000_007

    private fun dfs(r: Int, c: Int, moves: Int, m: Int, n: Int): Int {
        if (r < 0 || r >= m || c < 0 || c >= n) return 1
        if (moves == 0) return 0
        if (dp[r][c][moves] != -1) return dp[r][c][moves]

        dp[r][c][moves] = (((dfs(r + 1, c, moves - 1, m, n) + dfs(r - 1, c, moves - 1, m, n)) % MOD +
                (dfs(r, c + 1, moves - 1, m, n) + dfs(r, c - 1, moves - 1, m, n)) % MOD) % MOD)
        return dp[r][c][moves]
    }

    fun findPaths(m: Int, n: Int, maxMove: Int, startRow: Int, startColumn: Int): Int {
        dp = Array(m) { Array(n) { IntArray(maxMove + 1) { -1 } } }
        return dfs(startRow, startColumn, maxMove, m, n)
    }
}
```

```swift
class Solution {
    func findPaths(_ m: Int, _ n: Int, _ maxMove: Int, _ startRow: Int, _ startColumn: Int) -> Int {
        let MOD = 1_000_000_007
        var dp = [[[Int]]](repeating: [[Int]](repeating: [Int](repeating: -1, count: maxMove + 1), count: n), count: m)

        func dfs(_ r: Int, _ c: Int, _ moves: Int) -> Int {
            if r < 0 || r >= m || c < 0 || c >= n { return 1 }
            if moves == 0 { return 0 }
            if dp[r][c][moves] != -1 { return dp[r][c][moves] }

            dp[r][c][moves] = (((dfs(r + 1, c, moves - 1) + dfs(r - 1, c, moves - 1)) % MOD +
                    (dfs(r, c + 1, moves - 1) + dfs(r, c - 1, moves - 1)) % MOD) % MOD)
            return dp[r][c][moves]
        }

        return dfs(startRow, startColumn, maxMove)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * N)$
- Space complexity: $O(m * n * N)$

> Where $m$ is the number of rows, $n$ is the number of columns, and $N$ is the maximum number of allowed moves.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def findPaths(self, m: int, n: int, maxMove: int, startRow: int, startColumn: int) -> int:
        MOD = 10**9 + 7
        dp = [[[0] * (maxMove + 1) for _ in range(n)] for _ in range(m)]

        for moves in range(1, maxMove + 1):
            for r in range(m):
                for c in range(n):
                    dp[r][c][moves] = (
                        (dp[r - 1][c][moves - 1] if r > 0 else 1) +
                        (dp[r + 1][c][moves - 1] if r < m - 1 else 1) +
                        (dp[r][c - 1][moves - 1] if c > 0 else 1) +
                        (dp[r][c + 1][moves - 1] if c < n - 1 else 1)
                    ) % MOD

        return dp[startRow][startColumn][maxMove]
```

```java
public class Solution {
    public int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        final int MOD = 1_000_000_007;
        int[][][] dp = new int[m][n][maxMove + 1];

        for (int moves = 1; moves <= maxMove; moves++) {
            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n; c++) {
                    long up = (r > 0) ? dp[r - 1][c][moves - 1] : 1;
                    long down = (r < m - 1) ? dp[r + 1][c][moves - 1] : 1;
                    long left = (c > 0) ? dp[r][c - 1][moves - 1] : 1;
                    long right = (c < n - 1) ? dp[r][c + 1][moves - 1] : 1;

                    dp[r][c][moves] = (int) ((up + down + left + right) % MOD);
                }
            }
        }

        return dp[startRow][startColumn][maxMove];
    }
}
```

```cpp
class Solution {
public:
    int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        const int MOD = 1'000'000'007;
        vector<vector<vector<uint>>> dp(m, vector<vector<uint>>(n, vector<uint>(maxMove + 1, 0)));

        for (int moves = 1; moves <= maxMove; moves++) {
            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n; c++) {
                    dp[r][c][moves] = (
                        (r > 0 ? dp[r - 1][c][moves - 1] : 1) +
                        (r < m - 1 ? dp[r + 1][c][moves - 1] : 1) +
                        (c > 0 ? dp[r][c - 1][moves - 1] : 1) +
                        (c < n - 1 ? dp[r][c + 1][moves - 1] : 1)
                    ) % MOD;
                }
            }
        }

        return dp[startRow][startColumn][maxMove];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @param {number} maxMove
     * @param {number} startRow
     * @param {number} startColumn
     * @return {number}
     */
    findPaths(m, n, maxMove, startRow, startColumn) {
        const MOD = 1_000_000_007;
        const dp = Array.from({ length: m }, () =>
            Array.from({ length: n }, () => Array(maxMove + 1).fill(0)),
        );

        for (let moves = 1; moves <= maxMove; moves++) {
            for (let r = 0; r < m; r++) {
                for (let c = 0; c < n; c++) {
                    dp[r][c][moves] =
                        ((r > 0 ? dp[r - 1][c][moves - 1] : 1) +
                            (r < m - 1 ? dp[r + 1][c][moves - 1] : 1) +
                            (c > 0 ? dp[r][c - 1][moves - 1] : 1) +
                            (c < n - 1 ? dp[r][c + 1][moves - 1] : 1)) %
                        MOD;
                }
            }
        }

        return dp[startRow][startColumn][maxMove];
    }
}
```

```csharp
public class Solution {
    public int FindPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        const int MOD = 1_000_000_007;
        int[,,] dp = new int[m, n, maxMove + 1];

        for (int moves = 1; moves <= maxMove; moves++) {
            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n; c++) {
                    long up = (r > 0) ? dp[r - 1, c, moves - 1] : 1;
                    long down = (r < m - 1) ? dp[r + 1, c, moves - 1] : 1;
                    long left = (c > 0) ? dp[r, c - 1, moves - 1] : 1;
                    long right = (c < n - 1) ? dp[r, c + 1, moves - 1] : 1;

                    dp[r, c, moves] = (int)((up + down + left + right) % MOD);
                }
            }
        }

        return dp[startRow, startColumn, maxMove];
    }
}
```

```go
func findPaths(m int, n int, maxMove int, startRow int, startColumn int) int {
    MOD := 1_000_000_007
    dp := make([][][]int, m)
    for i := range dp {
        dp[i] = make([][]int, n)
        for j := range dp[i] {
            dp[i][j] = make([]int, maxMove+1)
        }
    }

    for moves := 1; moves <= maxMove; moves++ {
        for r := 0; r < m; r++ {
            for c := 0; c < n; c++ {
                up, down, left, right := 1, 1, 1, 1
                if r > 0 {
                    up = dp[r-1][c][moves-1]
                }
                if r < m-1 {
                    down = dp[r+1][c][moves-1]
                }
                if c > 0 {
                    left = dp[r][c-1][moves-1]
                }
                if c < n-1 {
                    right = dp[r][c+1][moves-1]
                }
                dp[r][c][moves] = (up + down + left + right) % MOD
            }
        }
    }

    return dp[startRow][startColumn][maxMove]
}
```

```kotlin
class Solution {
    fun findPaths(m: Int, n: Int, maxMove: Int, startRow: Int, startColumn: Int): Int {
        val MOD = 1_000_000_007
        val dp = Array(m) { Array(n) { IntArray(maxMove + 1) } }

        for (moves in 1..maxMove) {
            for (r in 0 until m) {
                for (c in 0 until n) {
                    val up = if (r > 0) dp[r - 1][c][moves - 1].toLong() else 1L
                    val down = if (r < m - 1) dp[r + 1][c][moves - 1].toLong() else 1L
                    val left = if (c > 0) dp[r][c - 1][moves - 1].toLong() else 1L
                    val right = if (c < n - 1) dp[r][c + 1][moves - 1].toLong() else 1L

                    dp[r][c][moves] = ((up + down + left + right) % MOD).toInt()
                }
            }
        }

        return dp[startRow][startColumn][maxMove]
    }
}
```

```swift
class Solution {
    func findPaths(_ m: Int, _ n: Int, _ maxMove: Int, _ startRow: Int, _ startColumn: Int) -> Int {
        let MOD = 1_000_000_007
        var dp = [[[Int]]](repeating: [[Int]](repeating: [Int](repeating: 0, count: maxMove + 1), count: n), count: m)

        for moves in 1...maxMove {
            for r in 0..<m {
                for c in 0..<n {
                    let up = (r > 0) ? dp[r - 1][c][moves - 1] : 1
                    let down = (r < m - 1) ? dp[r + 1][c][moves - 1] : 1
                    let left = (c > 0) ? dp[r][c - 1][moves - 1] : 1
                    let right = (c < n - 1) ? dp[r][c + 1][moves - 1] : 1

                    dp[r][c][moves] = (up + down + left + right) % MOD
                }
            }
        }

        return dp[startRow][startColumn][maxMove]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * N)$
- Space complexity: $O(m * n * N)$

> Where $m$ is the number of rows, $n$ is the number of columns, and $N$ is the maximum number of allowed moves.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def findPaths(self, m: int, n: int, maxMove: int, startRow: int, startColumn: int) -> int:
        MOD = 10**9 + 7
        dp = [[0] * n for _ in range(m)]

        for moves in range(1, maxMove + 1):
            tmp = [[0] * n for _ in range(m)]
            for r in range(m):
                for c in range(n):
                    if r + 1 == m:
                        tmp[r][c] = (tmp[r][c] + 1) % MOD
                    else:
                        tmp[r][c] = (tmp[r][c] + dp[r + 1][c]) % MOD
                    if r - 1 < 0:
                        tmp[r][c] = (tmp[r][c] + 1) % MOD
                    else:
                        tmp[r][c] = (tmp[r][c] + dp[r - 1][c]) % MOD
                    if c + 1 == n:
                        tmp[r][c] = (tmp[r][c] + 1) % MOD
                    else:
                        tmp[r][c] = (tmp[r][c] + dp[r][c + 1]) % MOD
                    if c - 1 < 0:
                        tmp[r][c] = (tmp[r][c] + 1) % MOD
                    else:
                        tmp[r][c] = (tmp[r][c] + dp[r][c - 1]) % MOD
            dp = tmp

        return dp[startRow][startColumn]
```

```java
public class Solution {
    public int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        final int MOD = 1_000_000_007;
        int[][] dp = new int[m][n];

        for (int moves = 1; moves <= maxMove; moves++) {
            int[][] tmp = new int[m][n];
            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n; c++) {
                    if (r + 1 == m) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD;
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r + 1][c]) % MOD;
                    }
                    if (r - 1 < 0) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD;
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r - 1][c]) % MOD;
                    }
                    if (c + 1 == n) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD;
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r][c + 1]) % MOD;
                    }
                    if (c - 1 < 0) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD;
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r][c - 1]) % MOD;
                    }
                }
            }
            dp = tmp;
        }

        return dp[startRow][startColumn];
    }
}
```

```cpp
class Solution {
public:
    int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        const int MOD = 1'000'000'007;
        vector<vector<int>> dp(m, vector<int>(n, 0));

        for (int moves = 1; moves <= maxMove; moves++) {
            vector<vector<int>> tmp(m, vector<int>(n, 0));
            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n; c++) {
                    if (r + 1 == m) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD;
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r + 1][c]) % MOD;
                    }
                    if (r - 1 < 0) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD;
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r - 1][c]) % MOD;
                    }
                    if (c + 1 == n) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD;
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r][c + 1]) % MOD;
                    }
                    if (c - 1 < 0) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD;
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r][c - 1]) % MOD;
                    }
                }
            }
            dp = tmp;
        }

        return dp[startRow][startColumn];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @param {number} maxMove
     * @param {number} startRow
     * @param {number} startColumn
     * @return {number}
     */
    findPaths(m, n, maxMove, startRow, startColumn) {
        const MOD = 1_000_000_007;
        let dp = Array.from({ length: m }, () => Array(n).fill(0));

        for (let moves = 1; moves <= maxMove; moves++) {
            const tmp = Array.from({ length: m }, () => Array(n).fill(0));
            for (let r = 0; r < m; r++) {
                for (let c = 0; c < n; c++) {
                    if (r + 1 === m) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD;
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r + 1][c]) % MOD;
                    }
                    if (r - 1 < 0) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD;
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r - 1][c]) % MOD;
                    }
                    if (c + 1 === n) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD;
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r][c + 1]) % MOD;
                    }
                    if (c - 1 < 0) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD;
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r][c - 1]) % MOD;
                    }
                }
            }
            dp = tmp;
        }

        return dp[startRow][startColumn];
    }
}
```

```csharp
public class Solution {
    public int FindPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        const int MOD = 1_000_000_007;
        int[,] dp = new int[m, n];

        for (int moves = 1; moves <= maxMove; moves++) {
            int[,] tmp = new int[m, n];
            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n; c++) {
                    if (r + 1 == m) {
                        tmp[r, c] = (tmp[r, c] + 1) % MOD;
                    } else {
                        tmp[r, c] = (tmp[r, c] + dp[r + 1, c]) % MOD;
                    }
                    if (r - 1 < 0) {
                        tmp[r, c] = (tmp[r, c] + 1) % MOD;
                    } else {
                        tmp[r, c] = (tmp[r, c] + dp[r - 1, c]) % MOD;
                    }
                    if (c + 1 == n) {
                        tmp[r, c] = (tmp[r, c] + 1) % MOD;
                    } else {
                        tmp[r, c] = (tmp[r, c] + dp[r, c + 1]) % MOD;
                    }
                    if (c - 1 < 0) {
                        tmp[r, c] = (tmp[r, c] + 1) % MOD;
                    } else {
                        tmp[r, c] = (tmp[r, c] + dp[r, c - 1]) % MOD;
                    }
                }
            }
            dp = tmp;
        }

        return dp[startRow, startColumn];
    }
}
```

```go
func findPaths(m int, n int, maxMove int, startRow int, startColumn int) int {
    MOD := 1_000_000_007
    dp := make([][]int, m)
    for i := range dp {
        dp[i] = make([]int, n)
    }

    for moves := 1; moves <= maxMove; moves++ {
        tmp := make([][]int, m)
        for i := range tmp {
            tmp[i] = make([]int, n)
        }
        for r := 0; r < m; r++ {
            for c := 0; c < n; c++ {
                if r+1 == m {
                    tmp[r][c] = (tmp[r][c] + 1) % MOD
                } else {
                    tmp[r][c] = (tmp[r][c] + dp[r+1][c]) % MOD
                }
                if r-1 < 0 {
                    tmp[r][c] = (tmp[r][c] + 1) % MOD
                } else {
                    tmp[r][c] = (tmp[r][c] + dp[r-1][c]) % MOD
                }
                if c+1 == n {
                    tmp[r][c] = (tmp[r][c] + 1) % MOD
                } else {
                    tmp[r][c] = (tmp[r][c] + dp[r][c+1]) % MOD
                }
                if c-1 < 0 {
                    tmp[r][c] = (tmp[r][c] + 1) % MOD
                } else {
                    tmp[r][c] = (tmp[r][c] + dp[r][c-1]) % MOD
                }
            }
        }
        dp = tmp
    }

    return dp[startRow][startColumn]
}
```

```kotlin
class Solution {
    fun findPaths(m: Int, n: Int, maxMove: Int, startRow: Int, startColumn: Int): Int {
        val MOD = 1_000_000_007
        var dp = Array(m) { IntArray(n) }

        for (moves in 1..maxMove) {
            val tmp = Array(m) { IntArray(n) }
            for (r in 0 until m) {
                for (c in 0 until n) {
                    if (r + 1 == m) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r + 1][c]) % MOD
                    }
                    if (r - 1 < 0) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r - 1][c]) % MOD
                    }
                    if (c + 1 == n) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r][c + 1]) % MOD
                    }
                    if (c - 1 < 0) {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r][c - 1]) % MOD
                    }
                }
            }
            dp = tmp
        }

        return dp[startRow][startColumn]
    }
}
```

```swift
class Solution {
    func findPaths(_ m: Int, _ n: Int, _ maxMove: Int, _ startRow: Int, _ startColumn: Int) -> Int {
        let MOD = 1_000_000_007
        var dp = [[Int]](repeating: [Int](repeating: 0, count: n), count: m)

        for _ in 1...maxMove {
            var tmp = [[Int]](repeating: [Int](repeating: 0, count: n), count: m)
            for r in 0..<m {
                for c in 0..<n {
                    if r + 1 == m {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r + 1][c]) % MOD
                    }
                    if r - 1 < 0 {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r - 1][c]) % MOD
                    }
                    if c + 1 == n {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r][c + 1]) % MOD
                    }
                    if c - 1 < 0 {
                        tmp[r][c] = (tmp[r][c] + 1) % MOD
                    } else {
                        tmp[r][c] = (tmp[r][c] + dp[r][c - 1]) % MOD
                    }
                }
            }
            dp = tmp
        }

        return dp[startRow][startColumn]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * N)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows, $n$ is the number of columns, and $N$ is the maximum number of allowed moves.
