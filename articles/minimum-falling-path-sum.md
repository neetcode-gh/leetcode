## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Dynamic Programming Fundamentals** - Understanding how to break problems into overlapping subproblems and use memoization or tabulation
- **2D Grid/Matrix Traversal** - Ability to navigate and process elements in a 2D array with boundary checks
- **Recursion with Memoization** - Converting recursive solutions to top-down DP by caching computed results

---

## 1. Recursion

### Intuition

A falling path starts at any cell in the first row and moves to an adjacent cell in the next row (directly below, diagonally left, or diagonally right). We want to find the path with the minimum sum. For each starting column in the first row, we recursively explore all valid paths and track the minimum total. This brute force approach considers all possible paths, leading to exponential time complexity.

### Algorithm

1. Define `dfs(r, c)` that returns the minimum path sum starting from cell `(r, c)` to the bottom row.
2. Base cases:
   - If `r == n`, we've gone past the last row, return `0`.
   - If `c` is out of bounds, return `Infinity` (invalid path).
3. Return `matrix[r][c]` plus the minimum of `dfs(r+1, c-1)`, `dfs(r+1, c)`, and `dfs(r+1, c+1)`.
4. Try starting from each column in row `0` and return the minimum result.

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        N = len(matrix)

        def dfs(r, c):
            if r == N:
                return 0
            if c < 0 or c >= N:
                return float("inf")
            return matrix[r][c] + min(
                dfs(r + 1, c - 1),
                dfs(r + 1, c),
                dfs(r + 1, c + 1)
            )

        res = float("inf")
        for c in range(N):
            res = min(res, dfs(0, c))
        return res
```

```java
public class Solution {
    private int dfs(int r, int c, int[][] matrix, int N) {
        if (r == N) return 0;
        if (c < 0 || c >= N) return Integer.MAX_VALUE;
        return matrix[r][c] + Math.min(
            Math.min(dfs(r + 1, c - 1, matrix, N), dfs(r + 1, c, matrix, N)),
            dfs(r + 1, c + 1, matrix, N)
        );
    }

    public int minFallingPathSum(int[][] matrix) {
        int N = matrix.length;
        int res = Integer.MAX_VALUE;
        for (int c = 0; c < N; c++) {
            res = Math.min(res, dfs(0, c, matrix, N));
        }
        return res;
    }
}
```

```cpp
class Solution {
private:
    int dfs(int r, int c, vector<vector<int>>& matrix, int N) {
        if (r == N) return 0;
        if (c < 0 || c >= N) return INT_MAX;
        return matrix[r][c] + min({
            dfs(r + 1, c - 1, matrix, N),
            dfs(r + 1, c, matrix, N),
            dfs(r + 1, c + 1, matrix, N)
        });
    }

public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int N = matrix.size();
        int res = INT_MAX;
        for (int c = 0; c < N; c++) {
            res = min(res, dfs(0, c, matrix, N));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    minFallingPathSum(matrix) {
        const N = matrix.length;

        const dfs = (r, c) => {
            if (r === N) return 0;
            if (c < 0 || c >= N) return Infinity;
            return (
                matrix[r][c] +
                Math.min(dfs(r + 1, c - 1), dfs(r + 1, c), dfs(r + 1, c + 1))
            );
        };

        let res = Infinity;
        for (let c = 0; c < N; c++) {
            res = Math.min(res, dfs(0, c));
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinFallingPathSum(int[][] matrix) {
        int N = matrix.Length;
        int res = int.MaxValue;
        for (int c = 0; c < N; c++) {
            res = Math.Min(res, Dfs(matrix, 0, c, N));
        }
        return res;
    }

    private int Dfs(int[][] matrix, int r, int c, int N) {
        if (r == N) return 0;
        if (c < 0 || c >= N) return int.MaxValue;
        return matrix[r][c] + Math.Min(
            Math.Min(Dfs(matrix, r + 1, c - 1, N), Dfs(matrix, r + 1, c, N)),
            Dfs(matrix, r + 1, c + 1, N)
        );
    }
}
```

```go
func minFallingPathSum(matrix [][]int) int {
    n := len(matrix)

    var dfs func(r, c int) int
    dfs = func(r, c int) int {
        if r == n {
            return 0
        }
        if c < 0 || c >= n {
            return math.MaxInt32
        }
        return matrix[r][c] + min(
            dfs(r+1, c-1),
            min(dfs(r+1, c), dfs(r+1, c+1)),
        )
    }

    res := math.MaxInt32
    for c := 0; c < n; c++ {
        res = min(res, dfs(0, c))
    }
    return res
}
```

```kotlin
class Solution {
    fun minFallingPathSum(matrix: Array<IntArray>): Int {
        val n = matrix.size

        fun dfs(r: Int, c: Int): Int {
            if (r == n) return 0
            if (c < 0 || c >= n) return Int.MAX_VALUE
            return matrix[r][c] + minOf(
                dfs(r + 1, c - 1),
                dfs(r + 1, c),
                dfs(r + 1, c + 1)
            )
        }

        var res = Int.MAX_VALUE
        for (c in 0 until n) {
            res = minOf(res, dfs(0, c))
        }
        return res
    }
}
```

```swift
class Solution {
    func minFallingPathSum(_ matrix: [[Int]]) -> Int {
        let n = matrix.count

        func dfs(_ r: Int, _ c: Int) -> Int {
            if r == n { return 0 }
            if c < 0 || c >= n { return Int.max }
            return matrix[r][c] + min(
                dfs(r + 1, c - 1),
                min(dfs(r + 1, c), dfs(r + 1, c + 1))
            )
        }

        var res = Int.max
        for c in 0..<n {
            res = min(res, dfs(0, c))
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(3 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution has overlapping subproblems: the same `(r, c)` state is computed multiple times. By caching results in a `memoization` table, we avoid redundant calculations. Each unique `(r, c)` pair is computed only once, reducing time complexity from exponential to polynomial.

### Algorithm

1. Create a `cache` (dictionary or 2D array) to store computed results.
2. Define `dfs(r, c)` that returns the minimum path sum from `(r, c)` to the bottom.
3. Before computing, check if `(r, c)` is already in the `cache`; if so, return the cached value.
4. Compute the result as `matrix[r][c]` plus the minimum of the three possible moves.
5. Store the result in the `cache` and return it.
6. Return the minimum among all starting columns in row `0`.

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        N = len(matrix)
        cache = {}

        def dfs(r, c):
            if r == N:
                return 0
            if c < 0 or c >= N:
                return float("inf")
            if (r, c) in cache:
                return cache[(r, c)]
            cache[(r, c)] = matrix[r][c] + min(
                dfs(r + 1, c - 1),
                dfs(r + 1, c),
                dfs(r + 1, c + 1)
            )
            return cache[(r, c)]

        res = float("inf")
        for c in range(N):
            res = min(res, dfs(0, c))
        return res
```

```java
public class Solution {
    private int[][] cache;

    private int dfs(int r, int c, int[][] matrix, int N) {
        if (r == N) return 0;
        if (c < 0 || c >= N) return Integer.MAX_VALUE;
        if (cache[r][c] != Integer.MIN_VALUE) return cache[r][c];

        cache[r][c] = matrix[r][c] + Math.min(
            Math.min(dfs(r + 1, c - 1, matrix, N), dfs(r + 1, c, matrix, N)),
            dfs(r + 1, c + 1, matrix, N)
        );
        return cache[r][c];
    }

    public int minFallingPathSum(int[][] matrix) {
        int N = matrix.length;
        cache = new int[N][N];
        for (int[] row : cache) {
            Arrays.fill(row, Integer.MIN_VALUE);
        }

        int res = Integer.MAX_VALUE;
        for (int c = 0; c < N; c++) {
            res = Math.min(res, dfs(0, c, matrix, N));
        }
        return res;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> cache;

    int dfs(int r, int c, vector<vector<int>>& matrix, int N) {
        if (r == N) return 0;
        if (c < 0 || c >= N) return INT_MAX;
        if (cache[r][c] != INT_MIN) return cache[r][c];

        cache[r][c] = matrix[r][c] + min({
            dfs(r + 1, c - 1, matrix, N),
            dfs(r + 1, c, matrix, N),
            dfs(r + 1, c + 1, matrix, N)
        });
        return cache[r][c];
    }

public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int N = matrix.size();
        cache = vector<vector<int>>(N, vector<int>(N, INT_MIN));

        int res = INT_MAX;
        for (int c = 0; c < N; c++) {
            res = min(res, dfs(0, c, matrix, N));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    minFallingPathSum(matrix) {
        const N = matrix.length;
        const cache = Array.from({ length: N }, () => Array(N).fill(null));

        const dfs = (r, c) => {
            if (r === N) return 0;
            if (c < 0 || c >= N) return Infinity;
            if (cache[r][c] !== null) return cache[r][c];

            cache[r][c] =
                matrix[r][c] +
                Math.min(dfs(r + 1, c - 1), dfs(r + 1, c), dfs(r + 1, c + 1));
            return cache[r][c];
        };

        let res = Infinity;
        for (let c = 0; c < N; c++) {
            res = Math.min(res, dfs(0, c));
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private int[,] cache;

    public int MinFallingPathSum(int[][] matrix) {
        int N = matrix.Length;
        cache = new int[N, N];
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                cache[i, j] = int.MinValue;
            }
        }

        int res = int.MaxValue;
        for (int c = 0; c < N; c++) {
            res = Math.Min(res, Dfs(matrix, 0, c, N));
        }
        return res;
    }

    private int Dfs(int[][] matrix, int r, int c, int N) {
        if (r == N) return 0;
        if (c < 0 || c >= N) return int.MaxValue;
        if (cache[r, c] != int.MinValue) return cache[r, c];

        cache[r, c] = matrix[r][c] + Math.Min(
            Math.Min(Dfs(matrix, r + 1, c - 1, N), Dfs(matrix, r + 1, c, N)),
            Dfs(matrix, r + 1, c + 1, N)
        );
        return cache[r, c];
    }
}
```

```go
func minFallingPathSum(matrix [][]int) int {
    n := len(matrix)
    cache := make([][]int, n)
    for i := range cache {
        cache[i] = make([]int, n)
        for j := range cache[i] {
            cache[i][j] = math.MinInt32
        }
    }

    var dfs func(r, c int) int
    dfs = func(r, c int) int {
        if r == n {
            return 0
        }
        if c < 0 || c >= n {
            return math.MaxInt32
        }
        if cache[r][c] != math.MinInt32 {
            return cache[r][c]
        }

        cache[r][c] = matrix[r][c] + min(
            dfs(r+1, c-1),
            min(dfs(r+1, c), dfs(r+1, c+1)),
        )
        return cache[r][c]
    }

    res := math.MaxInt32
    for c := 0; c < n; c++ {
        res = min(res, dfs(0, c))
    }
    return res
}
```

```kotlin
class Solution {
    fun minFallingPathSum(matrix: Array<IntArray>): Int {
        val n = matrix.size
        val cache = Array(n) { IntArray(n) { Int.MIN_VALUE } }

        fun dfs(r: Int, c: Int): Int {
            if (r == n) return 0
            if (c < 0 || c >= n) return Int.MAX_VALUE
            if (cache[r][c] != Int.MIN_VALUE) return cache[r][c]

            cache[r][c] = matrix[r][c] + minOf(
                dfs(r + 1, c - 1),
                dfs(r + 1, c),
                dfs(r + 1, c + 1)
            )
            return cache[r][c]
        }

        var res = Int.MAX_VALUE
        for (c in 0 until n) {
            res = minOf(res, dfs(0, c))
        }
        return res
    }
}
```

```swift
class Solution {
    func minFallingPathSum(_ matrix: [[Int]]) -> Int {
        let n = matrix.count
        var cache = Array(repeating: Array(repeating: Int.min, count: n), count: n)

        func dfs(_ r: Int, _ c: Int) -> Int {
            if r == n { return 0 }
            if c < 0 || c >= n { return Int.max }
            if cache[r][c] != Int.min { return cache[r][c] }

            cache[r][c] = matrix[r][c] + min(
                dfs(r + 1, c - 1),
                min(dfs(r + 1, c), dfs(r + 1, c + 1))
            )
            return cache[r][c]
        }

        var res = Int.max
        for c in 0..<n {
            res = min(res, dfs(0, c))
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * n)$
- Space complexity: $O(n * n)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We can solve this iteratively by building up solutions row by row. For each cell, the minimum path sum to reach it equals its value plus the minimum of the three cells above it that could lead here. By processing rows from top to bottom and only keeping the previous row's values, we achieve `O(n)` space complexity.

### Algorithm

1. Initialize a 1D `dp` array with the first row of the matrix.
2. For each subsequent row `r`:
   - Track `leftUp` (the previous row's value to the left) to avoid overwriting issues.
   - For each column `c`:
     - `midUp = dp[c]` (directly above).
     - `rightUp = dp[c+1]` if within bounds, else infinity.
     - Update `dp[c] = matrix[r][c] + min(leftUp, midUp, rightUp)`.
     - Set `leftUp = midUp` for the next iteration.
3. Return the minimum value in the final `dp` array.

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        N = len(matrix)
        dp = matrix[0][:]

        for r in range(1, N):
            leftUp = float('inf')
            for c in range(N):
                midUp = dp[c]
                rightUp = dp[c + 1] if c < N - 1 else float('inf')
                dp[c] = matrix[r][c] + min(midUp, leftUp, rightUp)
                leftUp = midUp

        return min(dp)
```

```java
public class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int N = matrix.length;
        int[] dp = new int[N];
        for (int c = 0; c < N; c++) {
            dp[c] = matrix[0][c];
        }

        for (int r = 1; r < N; r++) {
            int leftUp = Integer.MAX_VALUE;
            for (int c = 0; c < N; c++) {
                int midUp = dp[c];
                int rightUp = (c < N - 1) ? dp[c + 1] : Integer.MAX_VALUE;
                dp[c] = matrix[r][c] + Math.min(midUp, Math.min(leftUp, rightUp));
                leftUp = midUp;
            }
        }

        int ans = Integer.MAX_VALUE;
        for (int val : dp) {
            ans = Math.min(ans, val);
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int N = matrix.size();
        vector<int> dp(N);

        for (int c = 0; c < N; c++) {
            dp[c] = matrix[0][c];
        }

        for (int r = 1; r < N; r++) {
            int leftUp = INT_MAX;
            for (int c = 0; c < N; c++) {
                int midUp = dp[c];
                int rightUp = (c < N - 1) ? dp[c + 1] : INT_MAX;
                dp[c] = matrix[r][c] + min(midUp, min(leftUp, rightUp));
                leftUp = midUp;
            }
        }

        int ans = INT_MAX;
        for (int val : dp) {
            ans = min(ans, val);
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    minFallingPathSum(matrix) {
        const N = matrix.length;
        const dp = matrix[0].slice();

        for (let r = 1; r < N; r++) {
            let leftUp = Infinity;
            for (let c = 0; c < N; c++) {
                const midUp = dp[c];
                const rightUp = c < N - 1 ? dp[c + 1] : Infinity;
                dp[c] = matrix[r][c] + Math.min(midUp, leftUp, rightUp);
                leftUp = midUp;
            }
        }

        return Math.min(...dp);
    }
}
```

```csharp
public class Solution {
    public int MinFallingPathSum(int[][] matrix) {
        int N = matrix.Length;
        int[] dp = new int[N];
        for (int c = 0; c < N; c++) {
            dp[c] = matrix[0][c];
        }

        for (int r = 1; r < N; r++) {
            int leftUp = int.MaxValue;
            for (int c = 0; c < N; c++) {
                int midUp = dp[c];
                int rightUp = (c < N - 1) ? dp[c + 1] : int.MaxValue;
                dp[c] = matrix[r][c] + Math.Min(midUp, Math.Min(leftUp, rightUp));
                leftUp = midUp;
            }
        }

        int ans = int.MaxValue;
        foreach (int val in dp) {
            ans = Math.Min(ans, val);
        }
        return ans;
    }
}
```

```go
func minFallingPathSum(matrix [][]int) int {
    n := len(matrix)
    dp := make([]int, n)
    copy(dp, matrix[0])

    for r := 1; r < n; r++ {
        leftUp := math.MaxInt32
        for c := 0; c < n; c++ {
            midUp := dp[c]
            rightUp := math.MaxInt32
            if c < n-1 {
                rightUp = dp[c+1]
            }
            dp[c] = matrix[r][c] + min(midUp, min(leftUp, rightUp))
            leftUp = midUp
        }
    }

    ans := math.MaxInt32
    for _, val := range dp {
        ans = min(ans, val)
    }
    return ans
}
```

```kotlin
class Solution {
    fun minFallingPathSum(matrix: Array<IntArray>): Int {
        val n = matrix.size
        val dp = matrix[0].clone()

        for (r in 1 until n) {
            var leftUp = Int.MAX_VALUE
            for (c in 0 until n) {
                val midUp = dp[c]
                val rightUp = if (c < n - 1) dp[c + 1] else Int.MAX_VALUE
                dp[c] = matrix[r][c] + minOf(midUp, leftUp, rightUp)
                leftUp = midUp
            }
        }

        return dp.minOrNull()!!
    }
}
```

```swift
class Solution {
    func minFallingPathSum(_ matrix: [[Int]]) -> Int {
        let n = matrix.count
        var dp = matrix[0]

        for r in 1..<n {
            var leftUp = Int.max
            for c in 0..<n {
                let midUp = dp[c]
                let rightUp = c < n - 1 ? dp[c + 1] : Int.max
                dp[c] = matrix[r][c] + min(midUp, min(leftUp, rightUp))
                leftUp = midUp
            }
        }

        return dp.min()!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (In-Place)

### Intuition

If we are allowed to modify the input matrix, we can avoid using any extra space for DP. We update each cell in place to store the minimum path sum to reach that cell. This is the most space-efficient approach, using only `O(1)` extra space beyond the input.

### Algorithm

1. Start from the second row (index `1`).
2. For each cell `(r, c)`:
   - Compute the minimum of the three cells above: `(r-1, c-1)`, `(r-1, c)`, `(r-1, c+1)` (treating out-of-bounds as infinity).
   - Add this minimum to `matrix[r][c]`.
3. After processing all rows, return the minimum value in the last row.

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        N = len(matrix)

        for r in range(1, N):
            for c in range(N):
                mid = matrix[r - 1][c]
                left = matrix[r - 1][c - 1] if c > 0 else float("inf")
                right = matrix[r - 1][c + 1] if c < N - 1 else float("inf")
                matrix[r][c] = matrix[r][c] + min(mid, left, right)

        return min(matrix[-1])
```

```java
public class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int N = matrix.length;

        for (int r = 1; r < N; r++) {
            for (int c = 0; c < N; c++) {
                int mid = matrix[r - 1][c];
                int left = (c > 0) ? matrix[r - 1][c - 1] : Integer.MAX_VALUE;
                int right = (c < N - 1) ? matrix[r - 1][c + 1] : Integer.MAX_VALUE;
                matrix[r][c] = matrix[r][c] + Math.min(mid, Math.min(left, right));
            }
        }

        int res = Integer.MAX_VALUE;
        for (int c = 0; c < N; c++) {
            res = Math.min(res, matrix[N - 1][c]);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int N = matrix.size();

        for (int r = 1; r < N; r++) {
            for (int c = 0; c < N; c++) {
                int mid = matrix[r - 1][c];
                int left = (c > 0) ? matrix[r - 1][c - 1] : INT_MAX;
                int right = (c < N - 1) ? matrix[r - 1][c + 1] : INT_MAX;
                matrix[r][c] = matrix[r][c] + min({mid, left, right});
            }
        }

        return *min_element(matrix[N - 1].begin(), matrix[N - 1].end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    minFallingPathSum(matrix) {
        const N = matrix.length;

        for (let r = 1; r < N; r++) {
            for (let c = 0; c < N; c++) {
                const mid = matrix[r - 1][c];
                const left = c > 0 ? matrix[r - 1][c - 1] : Infinity;
                const right = c < N - 1 ? matrix[r - 1][c + 1] : Infinity;
                matrix[r][c] = matrix[r][c] + Math.min(mid, left, right);
            }
        }

        return Math.min(...matrix[N - 1]);
    }
}
```

```csharp
public class Solution {
    public int MinFallingPathSum(int[][] matrix) {
        int N = matrix.Length;

        for (int r = 1; r < N; r++) {
            for (int c = 0; c < N; c++) {
                int mid = matrix[r - 1][c];
                int left = (c > 0) ? matrix[r - 1][c - 1] : int.MaxValue;
                int right = (c < N - 1) ? matrix[r - 1][c + 1] : int.MaxValue;
                matrix[r][c] = matrix[r][c] + Math.Min(mid, Math.Min(left, right));
            }
        }

        int res = int.MaxValue;
        for (int c = 0; c < N; c++) {
            res = Math.Min(res, matrix[N - 1][c]);
        }
        return res;
    }
}
```

```go
func minFallingPathSum(matrix [][]int) int {
    n := len(matrix)

    for r := 1; r < n; r++ {
        for c := 0; c < n; c++ {
            mid := matrix[r-1][c]
            left := math.MaxInt32
            if c > 0 {
                left = matrix[r-1][c-1]
            }
            right := math.MaxInt32
            if c < n-1 {
                right = matrix[r-1][c+1]
            }
            matrix[r][c] = matrix[r][c] + min(mid, min(left, right))
        }
    }

    res := math.MaxInt32
    for _, val := range matrix[n-1] {
        res = min(res, val)
    }
    return res
}
```

```kotlin
class Solution {
    fun minFallingPathSum(matrix: Array<IntArray>): Int {
        val n = matrix.size

        for (r in 1 until n) {
            for (c in 0 until n) {
                val mid = matrix[r - 1][c]
                val left = if (c > 0) matrix[r - 1][c - 1] else Int.MAX_VALUE
                val right = if (c < n - 1) matrix[r - 1][c + 1] else Int.MAX_VALUE
                matrix[r][c] = matrix[r][c] + minOf(mid, left, right)
            }
        }

        return matrix[n - 1].minOrNull()!!
    }
}
```

```swift
class Solution {
    func minFallingPathSum(_ matrix: [[Int]]) -> Int {
        var matrix = matrix
        let n = matrix.count

        for r in 1..<n {
            for c in 0..<n {
                let mid = matrix[r - 1][c]
                let left = c > 0 ? matrix[r - 1][c - 1] : Int.max
                let right = c < n - 1 ? matrix[r - 1][c + 1] : Int.max
                matrix[r][c] = matrix[r][c] + min(mid, min(left, right))
            }
        }

        return matrix[n - 1].min()!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Out-of-Bounds Column Access

When computing the minimum from the three cells above (left-diagonal, directly above, right-diagonal), forgetting to check column boundaries causes index errors. The leftmost column has no left-diagonal parent, and the rightmost column has no right-diagonal parent. Always handle these edge cases by treating out-of-bounds values as infinity.

### Modifying Input While Reading

In the in-place DP approach, you update `matrix[r][c]` using values from the previous row. Since you read from the same row you just wrote to, there is no conflict. However, if you mistakenly read from cells you have already updated in the current row, you will get incorrect results. Process each row independently from the previous row.

### Forgetting to Check All Starting Columns

The path can start from any column in the first row. A common mistake is starting only from column 0 or assuming the minimum value in the first row is the optimal start. You must either try all starting columns explicitly or let the DP naturally propagate all possibilities.
