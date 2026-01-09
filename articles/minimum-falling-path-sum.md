## 1. Recursion

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
