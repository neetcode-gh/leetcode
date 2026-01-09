## 1. Recursion

### Intuition

We need to pick one cell from each row such that the total points are maximized. The tricky part is the penalty: if we pick column `c` in row `r` and column `c'` in row `r+1`, we lose `|c - c'|` points.

A natural approach is to try all possibilities. For each starting column in the first row, we recursively explore all column choices in subsequent rows, subtracting the movement penalty and adding the cell value. We return the maximum sum found.

### Algorithm

1. Define a recursive function `dfs(r, c)` that returns the maximum points obtainable from row `r+1` to the last row, given we are currently at column `c` in row `r`.
2. Base case: if `r` is the last row, return `0` (no more rows to process).
3. For each column `col` in the next row, compute `points[r+1][col] - |col - c| + dfs(r+1, col)`.
4. Return the maximum over all column choices.
5. The answer is the maximum of `points[0][c] + dfs(0, c)` for all starting columns `c`.

::tabs-start

```python
class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        m, n = len(points), len(points[0])

        def dfs(r, c):
            if r == m - 1:
                return 0

            res = 0
            for col in range(n):
                res = max(res, points[r + 1][col] - abs(col - c) + dfs(r + 1, col))
            return res

        ans = 0
        for c in range(n):
            ans = max(ans, points[0][c] + dfs(0, c))
        return ans
```

```java
public class Solution {
    int m, n;
    int[][] points;

    long dfs(int r, int c) {
        if (r == m - 1) return 0;
        long res = 0;
        for (int col = 0; col < n; col++) {
            res = Math.max(res, points[r + 1][col] - Math.abs(col - c) + dfs(r + 1, col));
        }
        return res;
    }

    public long maxPoints(int[][] points) {
        this.m = points.length;
        this.n = points[0].length;
        this.points = points;
        long ans = 0;
        for (int c = 0; c < n; c++) {
            ans = Math.max(ans, points[0][c] + dfs(0, c));
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    int m, n;
    vector<vector<int>> points;

    long long dfs(int r, int c) {
        if (r == m - 1) return 0;
        long long res = 0;
        for (int col = 0; col < n; col++) {
            res = max(res, points[r + 1][col] - abs(col - c) + dfs(r + 1, col));
        }
        return res;
    }

    long long maxPoints(vector<vector<int>>& points) {
        this->points = points;
        m = points.size();
        n = points[0].size();
        long long ans = 0;
        for (int c = 0; c < n; c++) {
            ans = max(ans, points[0][c] + dfs(0, c));
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    maxPoints(points) {
        let m = points.length, n = points[0].length;

        function dfs(r, c) {
            if (r === m - 1) return 0;
            let res = 0;
            for (let col = 0; col < n; col++) {
                res = Math.max(res, points[r + 1][col] - Math.abs(col - c) + dfs(r + 1, col));
            }
            return res;
        }

        let ans = 0;
        for (let c = 0; c < n; c++) {
            ans = Math.max(ans, points[0][c] + dfs(0, c));
        }
        return ans;
    }
}
```

```csharp
public class Solution {
    int m, n;
    int[][] points;

    long Dfs(int r, int c) {
        if (r == m - 1) return 0;
        long res = 0;
        for (int col = 0; col < n; col++) {
            res = Math.Max(res, points[r + 1][col] - Math.Abs(col - c) + Dfs(r + 1, col));
        }
        return res;
    }

    public long MaxPoints(int[][] points) {
        this.points = points;
        m = points.Length;
        n = points[0].Length;
        long ans = 0;
        for (int c = 0; c < n; c++) {
            ans = Math.Max(ans, points[0][c] + Dfs(0, c));
        }
        return ans;
    }
}
```

```go
func maxPoints(points [][]int) int64 {
    m, n := len(points), len(points[0])

    var dfs func(r, c int) int64
    dfs = func(r, c int) int64 {
        if r == m-1 {
            return 0
        }
        var res int64 = 0
        for col := 0; col < n; col++ {
            diff := col - c
            if diff < 0 {
                diff = -diff
            }
            val := int64(points[r+1][col]) - int64(diff) + dfs(r+1, col)
            if val > res {
                res = val
            }
        }
        return res
    }

    var ans int64 = 0
    for c := 0; c < n; c++ {
        val := int64(points[0][c]) + dfs(0, c)
        if val > ans {
            ans = val
        }
    }
    return ans
}
```

```kotlin
class Solution {
    private var m = 0
    private var n = 0
    private lateinit var points: Array<IntArray>

    fun maxPoints(points: Array<IntArray>): Long {
        this.points = points
        m = points.size
        n = points[0].size
        var ans: Long = 0
        for (c in 0 until n) {
            ans = maxOf(ans, points[0][c].toLong() + dfs(0, c))
        }
        return ans
    }

    private fun dfs(r: Int, c: Int): Long {
        if (r == m - 1) return 0
        var res: Long = 0
        for (col in 0 until n) {
            res = maxOf(res, points[r + 1][col] - kotlin.math.abs(col - c) + dfs(r + 1, col))
        }
        return res
    }
}
```

```swift
class Solution {
    var m = 0
    var n = 0
    var points = [[Int]]()

    func maxPoints(_ points: [[Int]]) -> Int {
        self.points = points
        m = points.count
        n = points[0].count
        var ans: Int = 0
        for c in 0..<n {
            ans = max(ans, points[0][c] + dfs(0, c))
        }
        return ans
    }

    private func dfs(_ r: Int, _ c: Int) -> Int {
        if r == m - 1 { return 0 }
        var res = 0
        for col in 0..<n {
            res = max(res, points[r + 1][col] - abs(col - c) + dfs(r + 1, col))
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ m)$
* Space complexity: $O(m)$ for recursion stack.

> Where $m$ is the number of rows, and $n$ is the number of columns.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution recalculates the same subproblems multiple times. For a given `(row, column)` pair, the maximum points from that position onward is always the same, regardless of how we got there.

By storing (memoizing) the result for each `(r, c)` pair, we avoid redundant computation. This transforms the exponential solution into a polynomial one.

### Algorithm

1. Create a memoization table `memo` to cache results for each `(r, c)` pair.
2. Define `dfs(r, c)` as before, but first check if the result is already cached.
3. If cached, return it immediately.
4. Otherwise, compute the result by trying all columns in the next row, cache it, and return.
5. The final answer is computed the same way as the recursive approach.

::tabs-start

```python
class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        m, n = len(points), len(points[0])
        memo = {}

        def dfs(r, c):
            if (r, c) in memo:
                return memo[(r, c)]
            if r == m - 1:
                return 0

            res = 0
            for col in range(n):
                res = max(res, points[r + 1][col] - abs(col - c) + dfs(r + 1, col))

            memo[(r, c)] = res
            return res

        ans = 0
        for c in range(n):
            ans = max(ans, points[0][c] + dfs(0, c))
        return ans
```

```java
class Solution {
    int m, n;
    int[][] points;
    Long[][] memo;

    long dfs(int r, int c) {
        if (memo[r][c] != null) return memo[r][c];
        if (r == m - 1) return 0;

        long res = 0;
        for (int col = 0; col < n; col++) {
            res = Math.max(res, points[r + 1][col] - Math.abs(col - c) + dfs(r + 1, col));
        }
        return memo[r][c] = res;
    }

    public long maxPoints(int[][] points) {
        this.points = points;
        m = points.length;
        n = points[0].length;
        memo = new Long[m][n];
        long ans = 0;
        for (int c = 0; c < n; c++) {
            ans = Math.max(ans, points[0][c] + dfs(0, c));
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    int m, n;
    vector<vector<int>> points;
    vector<vector<long long>> memo;

    long long dfs(int r, int c) {
        if (memo[r][c] != -1) return memo[r][c];
        if (r == m - 1) return 0;

        long long res = 0;
        for (int col = 0; col < n; col++) {
            res = max(res, (long long)points[r + 1][col] - abs(col - c) + dfs(r + 1, col));
        }
        return memo[r][c] = res;
    }

    long long maxPoints(vector<vector<int>>& points) {
        this->points = points;
        m = points.size();
        n = points[0].size();
        memo.assign(m, vector<long long>(n, -1));
        long long ans = 0;
        for (int c = 0; c < n; c++) {
            ans = max(ans, (long long)points[0][c] + dfs(0, c));
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    maxPoints(points) {
        let m = points.length, n = points[0].length;
        let memo = {};

        function dfs(r, c) {
            let key = r + "," + c;
            if (key in memo) return memo[key];
            if (r === m - 1) return 0;

            let res = 0;
            for (let col = 0; col < n; col++) {
                res = Math.max(res, points[r + 1][col] - Math.abs(col - c) + dfs(r + 1, col));
            }
            return memo[key] = res;
        }

        let ans = 0;
        for (let c = 0; c < n; c++) {
            ans = Math.max(ans, points[0][c] + dfs(0, c));
        }
        return ans;
    }
}
```

```csharp
public class Solution {
    int m, n;
    int[][] points;
    long[,] memo;

    long Dfs(int r, int c) {
        if (memo[r, c] != -1) return memo[r, c];
        if (r == m - 1) return 0;

        long res = 0;
        for (int col = 0; col < n; col++) {
            res = Math.Max(res, points[r + 1][col] - Math.Abs(col - c) + Dfs(r + 1, col));
        }
        memo[r, c] = res;
        return res;
    }

    public long MaxPoints(int[][] points) {
        this.points = points;
        m = points.Length;
        n = points[0].Length;
        memo = new long[m, n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                memo[i, j] = -1;
            }
        }
        long ans = 0;
        for (int c = 0; c < n; c++) {
            ans = Math.Max(ans, points[0][c] + Dfs(0, c));
        }
        return ans;
    }
}
```

```go
func maxPoints(points [][]int) int64 {
    m, n := len(points), len(points[0])
    memo := make([][]int64, m)
    for i := range memo {
        memo[i] = make([]int64, n)
        for j := range memo[i] {
            memo[i][j] = -1
        }
    }

    var dfs func(r, c int) int64
    dfs = func(r, c int) int64 {
        if memo[r][c] != -1 {
            return memo[r][c]
        }
        if r == m-1 {
            return 0
        }
        var res int64 = 0
        for col := 0; col < n; col++ {
            diff := col - c
            if diff < 0 {
                diff = -diff
            }
            val := int64(points[r+1][col]) - int64(diff) + dfs(r+1, col)
            if val > res {
                res = val
            }
        }
        memo[r][c] = res
        return res
    }

    var ans int64 = 0
    for c := 0; c < n; c++ {
        val := int64(points[0][c]) + dfs(0, c)
        if val > ans {
            ans = val
        }
    }
    return ans
}
```

```kotlin
class Solution {
    private var m = 0
    private var n = 0
    private lateinit var points: Array<IntArray>
    private lateinit var memo: Array<LongArray>

    fun maxPoints(points: Array<IntArray>): Long {
        this.points = points
        m = points.size
        n = points[0].size
        memo = Array(m) { LongArray(n) { -1 } }
        var ans: Long = 0
        for (c in 0 until n) {
            ans = maxOf(ans, points[0][c].toLong() + dfs(0, c))
        }
        return ans
    }

    private fun dfs(r: Int, c: Int): Long {
        if (memo[r][c] != -1L) return memo[r][c]
        if (r == m - 1) return 0
        var res: Long = 0
        for (col in 0 until n) {
            res = maxOf(res, points[r + 1][col] - kotlin.math.abs(col - c) + dfs(r + 1, col))
        }
        memo[r][c] = res
        return res
    }
}
```

```swift
class Solution {
    var m = 0
    var n = 0
    var points = [[Int]]()
    var memo = [[Int]]()

    func maxPoints(_ points: [[Int]]) -> Int {
        self.points = points
        m = points.count
        n = points[0].count
        memo = Array(repeating: Array(repeating: -1, count: n), count: m)
        var ans = 0
        for c in 0..<n {
            ans = max(ans, points[0][c] + dfs(0, c))
        }
        return ans
    }

    private func dfs(_ r: Int, _ c: Int) -> Int {
        if memo[r][c] != -1 { return memo[r][c] }
        if r == m - 1 { return 0 }
        var res = 0
        for col in 0..<n {
            res = max(res, points[r + 1][col] - abs(col - c) + dfs(r + 1, col))
        }
        memo[r][c] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n ^ 2)$
* Space complexity: $O(n)$

> Where $m$ is the number of rows, and $n$ is the number of columns.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Computing `max(dp[c'] - |c - c'|)` for each column `c` normally takes O(n) time per cell, making the total O(m * n^2). We can optimize this using prefix maximums.

The penalty `|c - c'|` splits into two cases:
- If `c' <= c`: the penalty is `c - c'`, so we want `max(dp[c'] + c')` for all `c' <= c`.
- If `c' > c`: the penalty is `c' - c`, so we want `max(dp[c'] - c')` for all `c' > c`.

By precomputing a `left` array (max of `dp[c'] + c'` from the left) and a `right` array (max of `dp[c'] - c'` from the right), we can answer each column's query in O(1) time.

### Algorithm

1. Initialize `dp` with the first row's values.
2. For each subsequent row:
   - Build `left[c]` = max over all `c' <= c` of `dp[c']`. Propagate left-to-right, subtracting 1 at each step.
   - Build `right[c]` = max over all `c' >= c` of `dp[c']`. Propagate right-to-left, subtracting 1 at each step.
   - For each column `c`, set `nextDp[c] = points[r][c] + max(left[c], right[c])`.
3. After processing all rows, return the maximum value in `dp`.

::tabs-start

```python
class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        ROWS, COLS = len(points), len(points[0])
        dp = points[0]

        for r in range(1, ROWS):
            left = [0] * COLS
            left[0] = dp[0]
            for c in range(1, COLS):
                left[c] = max(dp[c], left[c - 1] - 1)

            right = [0] * COLS
            right[COLS - 1] = dp[COLS - 1]
            for c in range(COLS - 2, -1, -1):
                right[c] = max(dp[c], right[c + 1] - 1)

            nextDp = points[r][:]
            for c in range(COLS):
                nextDp[c] += max(left[c], right[c])

            dp = nextDp

        return max(dp)
```

```java
public class Solution {
    public long maxPoints(int[][] points) {
        int ROWS = points.length, COLS = points[0].length;
        long[] dp = new long[COLS];
        for (int c = 0; c < COLS; c++) dp[c] = points[0][c];

        for (int r = 1; r < ROWS; r++) {
            long[] left = new long[COLS];
            left[0] = dp[0];
            for (int c = 1; c < COLS; c++)
                left[c] = Math.max(dp[c], left[c - 1] - 1);

            long[] right = new long[COLS];
            right[COLS - 1] = dp[COLS - 1];
            for (int c = COLS - 2; c >= 0; c--)
                right[c] = Math.max(dp[c], right[c + 1] - 1);

            long[] nextDp = new long[COLS];
            for (int c = 0; c < COLS; c++)
                nextDp[c] = points[r][c] + Math.max(left[c], right[c]);

            dp = nextDp;
        }

        long ans = 0;
        for (long val : dp) ans = Math.max(ans, val);
        return ans;
    }
}
```

```cpp
class Solution {
public:
    long long maxPoints(vector<vector<int>>& points) {
        int ROWS = points.size(), COLS = points[0].size();
        vector<long long> dp(points[0].begin(), points[0].end());

        for (int r = 1; r < ROWS; r++) {
            vector<long long> left(COLS), right(COLS);
            left[0] = dp[0];
            for (int c = 1; c < COLS; c++)
                left[c] = max(dp[c], left[c - 1] - 1);

            right[COLS - 1] = dp[COLS - 1];
            for (int c = COLS - 2; c >= 0; c--)
                right[c] = max(dp[c], right[c + 1] - 1);

            vector<long long> nextDp(COLS);
            for (int c = 0; c < COLS; c++)
                nextDp[c] = points[r][c] + max(left[c], right[c]);

            dp = move(nextDp);
        }

        return *max_element(dp.begin(), dp.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    maxPoints(points) {
        let ROWS = points.length, COLS = points[0].length;
        let dp = [...points[0]];

        for (let r = 1; r < ROWS; r++) {
            let left = Array(COLS).fill(0);
            left[0] = dp[0];
            for (let c = 1; c < COLS; c++)
                left[c] = Math.max(dp[c], left[c - 1] - 1);

            let right = Array(COLS).fill(0);
            right[COLS - 1] = dp[COLS - 1];
            for (let c = COLS - 2; c >= 0; c--)
                right[c] = Math.max(dp[c], right[c + 1] - 1);

            let nextDp = [...points[r]];
            for (let c = 0; c < COLS; c++)
                nextDp[c] += Math.max(left[c], right[c]);

            dp = nextDp;
        }

        return Math.max(...dp);
    }
}
```

```csharp
public class Solution {
    public long MaxPoints(int[][] points) {
        int ROWS = points.Length, COLS = points[0].Length;
        long[] dp = new long[COLS];
        for (int c = 0; c < COLS; c++) dp[c] = points[0][c];

        for (int r = 1; r < ROWS; r++) {
            long[] left = new long[COLS];
            left[0] = dp[0];
            for (int c = 1; c < COLS; c++)
                left[c] = Math.Max(dp[c], left[c - 1] - 1);

            long[] right = new long[COLS];
            right[COLS - 1] = dp[COLS - 1];
            for (int c = COLS - 2; c >= 0; c--)
                right[c] = Math.Max(dp[c], right[c + 1] - 1);

            long[] nextDp = new long[COLS];
            for (int c = 0; c < COLS; c++)
                nextDp[c] = points[r][c] + Math.Max(left[c], right[c]);

            dp = nextDp;
        }

        long ans = 0;
        foreach (long val in dp) ans = Math.Max(ans, val);
        return ans;
    }
}
```

```go
func maxPoints(points [][]int) int64 {
    ROWS, COLS := len(points), len(points[0])
    dp := make([]int64, COLS)
    for c := 0; c < COLS; c++ {
        dp[c] = int64(points[0][c])
    }

    for r := 1; r < ROWS; r++ {
        left := make([]int64, COLS)
        left[0] = dp[0]
        for c := 1; c < COLS; c++ {
            left[c] = max64(dp[c], left[c-1]-1)
        }

        right := make([]int64, COLS)
        right[COLS-1] = dp[COLS-1]
        for c := COLS - 2; c >= 0; c-- {
            right[c] = max64(dp[c], right[c+1]-1)
        }

        nextDp := make([]int64, COLS)
        for c := 0; c < COLS; c++ {
            nextDp[c] = int64(points[r][c]) + max64(left[c], right[c])
        }
        dp = nextDp
    }

    var ans int64 = 0
    for _, val := range dp {
        if val > ans {
            ans = val
        }
    }
    return ans
}

func max64(a, b int64) int64 {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxPoints(points: Array<IntArray>): Long {
        val ROWS = points.size
        val COLS = points[0].size
        var dp = LongArray(COLS) { points[0][it].toLong() }

        for (r in 1 until ROWS) {
            val left = LongArray(COLS)
            left[0] = dp[0]
            for (c in 1 until COLS) {
                left[c] = maxOf(dp[c], left[c - 1] - 1)
            }

            val right = LongArray(COLS)
            right[COLS - 1] = dp[COLS - 1]
            for (c in COLS - 2 downTo 0) {
                right[c] = maxOf(dp[c], right[c + 1] - 1)
            }

            val nextDp = LongArray(COLS)
            for (c in 0 until COLS) {
                nextDp[c] = points[r][c] + maxOf(left[c], right[c])
            }
            dp = nextDp
        }

        return dp.maxOrNull() ?: 0
    }
}
```

```swift
class Solution {
    func maxPoints(_ points: [[Int]]) -> Int {
        let ROWS = points.count
        let COLS = points[0].count
        var dp = points[0].map { Int($0) }

        for r in 1..<ROWS {
            var left = [Int](repeating: 0, count: COLS)
            left[0] = dp[0]
            for c in 1..<COLS {
                left[c] = max(dp[c], left[c - 1] - 1)
            }

            var right = [Int](repeating: 0, count: COLS)
            right[COLS - 1] = dp[COLS - 1]
            for c in stride(from: COLS - 2, through: 0, by: -1) {
                right[c] = max(dp[c], right[c + 1] - 1)
            }

            var nextDp = [Int](repeating: 0, count: COLS)
            for c in 0..<COLS {
                nextDp[c] = points[r][c] + max(left[c], right[c])
            }
            dp = nextDp
        }

        return dp.max() ?? 0
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(n)$

> Where $m$ is the number of rows, and $n$ is the number of columns.

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

We can reduce memory usage by combining the left and right sweeps into a single pass. Instead of storing separate `left` and `right` arrays, we build the left maximum in a `cur` array during the left-to-right pass. Then, during the right-to-left pass, we update `cur[c]` by taking the max of the current left value and the running right maximum, adding the cell value as we go.

This avoids allocating a separate `right` array, reducing the constant factor in space usage.

### Algorithm

1. Initialize `prev` with the first row's values.
2. For each subsequent row:
   - Create a `cur` array and build left maximums by iterating left-to-right: `cur[c] = max(prev[c], cur[c-1] - 1)`.
   - Iterate right-to-left, tracking `rightMax`. For each column, update `cur[c] = max(cur[c], rightMax) + points[r][c]`, then update `rightMax = max(prev[c], rightMax - 1)`.
   - Handle the last column separately since it was not processed in the right-to-left loop.
   - Set `prev = cur` for the next iteration.
3. Return the maximum value in `prev`.

::tabs-start

```python
class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        ROWS, COLS = len(points), len(points[0])
        prev = points[0]

        for r in range(1, ROWS):
            cur = [0] * COLS
            cur[0] = prev[0]
            for c in range(1, COLS):
                cur[c] = max(prev[c], cur[c - 1] - 1)

            rightMax = prev[COLS - 1]
            for c in range(COLS - 2, -1 , -1):
                rightMax = max(prev[c], rightMax - 1)
                cur[c] = max(cur[c], rightMax) + points[r][c]

            cur[COLS - 1] += points[r][COLS - 1]
            prev = cur

        return max(prev)
```

```java
public class Solution {
    public long maxPoints(int[][] points) {
        int rows = points.length, cols = points[0].length;
        long[] prev = new long[cols];
        for (int c = 0; c < cols; c++) prev[c] = points[0][c];

        for (int r = 1; r < rows; r++) {
            long[] cur = new long[cols];
            cur[0] = prev[0];
            for (int c = 1; c < cols; c++)
                cur[c] = Math.max(prev[c], cur[c - 1] - 1);

            long rightMax = prev[cols - 1];
            for (int c = cols - 2; c >= 0; c--) {
                rightMax = Math.max(prev[c], rightMax - 1);
                cur[c] = Math.max(cur[c], rightMax) + points[r][c];
            }
            cur[cols - 1] += points[r][cols - 1];
            prev = cur;
        }

        long ans = 0;
        for (long val : prev) ans = Math.max(ans, val);
        return ans;
    }
}
```

```cpp
class Solution {
public:
    long long maxPoints(vector<vector<int>>& points) {
        int rows = points.size(), cols = points[0].size();
        vector<long long> prev(cols);
        for (int c = 0; c < cols; c++) prev[c] = points[0][c];

        for (int r = 1; r < rows; r++) {
            vector<long long> cur(cols);
            cur[0] = prev[0];
            for (int c = 1; c < cols; c++)
                cur[c] = max(prev[c], cur[c - 1] - 1);

            long long rightMax = prev[cols - 1];
            for (int c = cols - 2; c >= 0; c--) {
                rightMax = max(prev[c], rightMax - 1);
                cur[c] = max(cur[c], rightMax) + points[r][c];
            }
            cur[cols - 1] += points[r][cols - 1];
            prev = cur;
        }
        return *max_element(prev.begin(), prev.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    maxPoints(points) {
        let rows = points.length, cols = points[0].length;
        let prev = points[0].map(v => v);

        for (let r = 1; r < rows; r++) {
            let cur = Array(cols).fill(0);
            cur[0] = prev[0];
            for (let c = 1; c < cols; c++)
                cur[c] = Math.max(prev[c], cur[c - 1] - 1);

            let rightMax = prev[cols - 1];
            for (let c = cols - 2; c >= 0; c--) {
                rightMax = Math.max(prev[c], rightMax - 1);
                cur[c] = Math.max(cur[c], rightMax) + points[r][c];
            }
            cur[cols - 1] += points[r][cols - 1];
            prev = cur;
        }
        return Math.max(...prev);
    }
}
```

```csharp
public class Solution {
    public long MaxPoints(int[][] points) {
        int rows = points.Length, cols = points[0].Length;
        long[] prev = new long[cols];
        for (int c = 0; c < cols; c++) prev[c] = points[0][c];

        for (int r = 1; r < rows; r++) {
            long[] cur = new long[cols];
            cur[0] = prev[0];
            for (int c = 1; c < cols; c++)
                cur[c] = Math.Max(prev[c], cur[c - 1] - 1);

            long rightMax = prev[cols - 1];
            for (int c = cols - 2; c >= 0; c--) {
                rightMax = Math.Max(prev[c], rightMax - 1);
                cur[c] = Math.Max(cur[c], rightMax) + points[r][c];
            }
            cur[cols - 1] += points[r][cols - 1];
            prev = cur;
        }
        long ans = long.MinValue;
        foreach (long val in prev) ans = Math.Max(ans, val);
        return ans;
    }
}
```

```go
func maxPoints(points [][]int) int64 {
    rows, cols := len(points), len(points[0])
    prev := make([]int64, cols)
    for c := 0; c < cols; c++ {
        prev[c] = int64(points[0][c])
    }

    for r := 1; r < rows; r++ {
        cur := make([]int64, cols)
        cur[0] = prev[0]
        for c := 1; c < cols; c++ {
            cur[c] = max64(prev[c], cur[c-1]-1)
        }

        rightMax := prev[cols-1]
        for c := cols - 2; c >= 0; c-- {
            rightMax = max64(prev[c], rightMax-1)
            cur[c] = max64(cur[c], rightMax) + int64(points[r][c])
        }
        cur[cols-1] += int64(points[r][cols-1])
        prev = cur
    }

    var ans int64 = prev[0]
    for _, val := range prev {
        if val > ans {
            ans = val
        }
    }
    return ans
}

func max64(a, b int64) int64 {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxPoints(points: Array<IntArray>): Long {
        val rows = points.size
        val cols = points[0].size
        var prev = LongArray(cols) { points[0][it].toLong() }

        for (r in 1 until rows) {
            val cur = LongArray(cols)
            cur[0] = prev[0]
            for (c in 1 until cols) {
                cur[c] = maxOf(prev[c], cur[c - 1] - 1)
            }

            var rightMax = prev[cols - 1]
            for (c in cols - 2 downTo 0) {
                rightMax = maxOf(prev[c], rightMax - 1)
                cur[c] = maxOf(cur[c], rightMax) + points[r][c]
            }
            cur[cols - 1] += points[r][cols - 1]
            prev = cur
        }

        return prev.maxOrNull() ?: 0
    }
}
```

```swift
class Solution {
    func maxPoints(_ points: [[Int]]) -> Int {
        let rows = points.count
        let cols = points[0].count
        var prev = points[0].map { $0 }

        for r in 1..<rows {
            var cur = [Int](repeating: 0, count: cols)
            cur[0] = prev[0]
            for c in 1..<cols {
                cur[c] = max(prev[c], cur[c - 1] - 1)
            }

            var rightMax = prev[cols - 1]
            for c in stride(from: cols - 2, through: 0, by: -1) {
                rightMax = max(prev[c], rightMax - 1)
                cur[c] = max(cur[c], rightMax) + points[r][c]
            }
            cur[cols - 1] += points[r][cols - 1]
            prev = cur
        }

        return prev.max() ?? 0
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(n)$

> Where $m$ is the number of rows, and $n$ is the number of columns.