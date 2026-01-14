## 1. Recursion

### Intuition

Starting from the top of the triangle, at each position we can move either directly down or diagonally down-right. We want to find the path from top to bottom with the minimum sum.

This naturally leads to a recursive approach: from position `(row, col)`, we add the current value and recurse to both possible next positions, taking the minimum result. The base case is reaching past the bottom row, where we return `0`.

### Algorithm

1. Define a recursive function `dfs(row, col)` that returns the minimum path sum from that position to the bottom.
2. Base case: if `row` exceeds the triangle height, return `0`.
3. Return the current cell value plus the minimum of `dfs(row + 1, col)` and `dfs(row + 1, col + 1)`.
4. Start the recursion from position `(0, 0)`.

::tabs-start

```python
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        def dfs(row, col):
            if row >= len(triangle):
                return 0
            return triangle[row][col] + min(dfs(row + 1, col), dfs(row + 1, col + 1))

        return dfs(0, 0)
```

```java
public class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        return dfs(0, 0, triangle);
    }

    private int dfs(int row, int col, List<List<Integer>> triangle) {
        if (row >= triangle.size()) {
            return 0;
        }
        return triangle.get(row).get(col) + Math.min(dfs(row + 1, col, triangle), dfs(row + 1, col + 1, triangle));
    }
}
```

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        return dfs(0, 0, triangle);
    }

private:
    int dfs(int row, int col, vector<vector<int>>& triangle) {
        if (row >= triangle.size()) {
            return 0;
        }
        return triangle[row][col] + min(dfs(row + 1, col, triangle), dfs(row + 1, col + 1, triangle));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} triangle
     * @return {number}
     */
    minimumTotal(triangle) {
        const dfs = (row, col) => {
            if (row >= triangle.length) {
                return 0;
            }
            return (
                triangle[row][col] +
                Math.min(dfs(row + 1, col), dfs(row + 1, col + 1))
            );
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public int MinimumTotal(List<List<int>> triangle) {
        int Dfs(int row, int col) {
            if (row >= triangle.Count) {
                return 0;
            }
            return triangle[row][col] + Math.Min(Dfs(row + 1, col), Dfs(row + 1, col + 1));
        }

        return Dfs(0, 0);
    }
}
```

```go
func minimumTotal(triangle [][]int) int {
    var dfs func(row, col int) int
    dfs = func(row, col int) int {
        if row >= len(triangle) {
            return 0
        }
        return triangle[row][col] + min(dfs(row+1, col), dfs(row+1, col+1))
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
    fun minimumTotal(triangle: List<List<Int>>): Int {
        fun dfs(row: Int, col: Int): Int {
            if (row >= triangle.size) {
                return 0
            }
            return triangle[row][col] + minOf(dfs(row + 1, col), dfs(row + 1, col + 1))
        }
        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func minimumTotal(_ triangle: [[Int]]) -> Int {
        func dfs(_ row: Int, _ col: Int) -> Int {
            if row >= triangle.count {
                return 0
            }
            return triangle[row][col] + min(dfs(row + 1, col), dfs(row + 1, col + 1))
        }
        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution recomputes the same subproblems many times. For example, position `(2, 1)` might be reached from both `(1, 0)` and `(1, 1)`. We can use memoization to store results once computed.

By caching the minimum path sum from each position, we ensure each subproblem is solved only once. This transforms the exponential time complexity into polynomial.

### Algorithm

1. Create a memoization table `memo` initialized with infinity to mark unvisited cells.
2. Define `dfs(row, col)` that first checks the `memo` cache before computing.
3. If cached, return the stored value immediately.
4. Otherwise, compute the result recursively, store it in `memo`, and return it.
5. Start from `(0, 0)` and return the result.

::tabs-start

```python
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        memo = [[0] * len(triangle[r]) for r in range(len(triangle))]
        INF = float("inf")
        for r in range(len(triangle)):
            for c in range(len(triangle[r])):
                memo[r][c] = INF

        def dfs(row, col):
            if row >= len(triangle):
                return 0
            if memo[row][col] != INF:
                return memo[row][col]

            memo[row][col] = triangle[row][col] + min(dfs(row + 1, col), dfs(row + 1, col + 1))
            return memo[row][col]

        return dfs(0, 0)
```

```java
public class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int[][] memo = new int[triangle.size()][];
        int INF = Integer.MAX_VALUE;
        for (int r = 0; r < triangle.size(); r++) {
            memo[r] = new int[triangle.get(r).size()];
            Arrays.fill(memo[r], INF);
        }

        return dfs(0, 0, triangle, memo);
    }

    private int dfs(int row, int col, List<List<Integer>> triangle, int[][] memo) {
        if (row >= triangle.size()) {
            return 0;
        }
        if (memo[row][col] != Integer.MAX_VALUE) {
            return memo[row][col];
        }

        memo[row][col] = triangle.get(row).get(col) + Math.min(dfs(row + 1, col, triangle, memo), dfs(row + 1, col + 1, triangle, memo));
        return memo[row][col];
    }
}
```

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        vector<vector<int>> memo(triangle.size(), vector<int>(0));
        int INF = INT_MAX;
        for (int r = 0; r < triangle.size(); ++r) {
            memo[r].resize(triangle[r].size(), INF);
        }

        return dfs(0, 0, triangle, memo);
    }

private:
    int dfs(int row, int col, vector<vector<int>>& triangle, vector<vector<int>>& memo) {
        if (row >= triangle.size()) {
            return 0;
        }
        if (memo[row][col] != INT_MAX) {
            return memo[row][col];
        }

        memo[row][col] = triangle[row][col] + min(dfs(row + 1, col, triangle, memo), dfs(row + 1, col + 1, triangle, memo));
        return memo[row][col];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} triangle
     * @return {number}
     */
    minimumTotal(triangle) {
        const memo = Array.from({ length: triangle.length }, (_, r) =>
            Array(triangle[r].length).fill(Infinity),
        );

        const dfs = (row, col) => {
            if (row >= triangle.length) {
                return 0;
            }
            if (memo[row][col] !== Infinity) {
                return memo[row][col];
            }

            memo[row][col] =
                triangle[row][col] +
                Math.min(dfs(row + 1, col), dfs(row + 1, col + 1));
            return memo[row][col];
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private int[][] memo;
    private List<List<int>> triangle;
    private int INF = int.MaxValue;

    public int MinimumTotal(List<List<int>> triangle) {
        this.triangle = triangle;
        memo = new int[triangle.Count][];
        for (int r = 0; r < triangle.Count; r++) {
            memo[r] = new int[triangle[r].Count];
            for (int c = 0; c < triangle[r].Count; c++) {
                memo[r][c] = INF;
            }
        }
        return Dfs(0, 0);
    }

    private int Dfs(int row, int col) {
        if (row >= triangle.Count) {
            return 0;
        }
        if (memo[row][col] != INF) {
            return memo[row][col];
        }

        memo[row][col] = triangle[row][col] + Math.Min(Dfs(row + 1, col), Dfs(row + 1, col + 1));
        return memo[row][col];
    }
}
```

```go
func minimumTotal(triangle [][]int) int {
    n := len(triangle)
    memo := make([][]int, n)
    for r := 0; r < n; r++ {
        memo[r] = make([]int, len(triangle[r]))
        for c := 0; c < len(triangle[r]); c++ {
            memo[r][c] = math.MaxInt32
        }
    }

    var dfs func(row, col int) int
    dfs = func(row, col int) int {
        if row >= n {
            return 0
        }
        if memo[row][col] != math.MaxInt32 {
            return memo[row][col]
        }
        memo[row][col] = triangle[row][col] + min(dfs(row+1, col), dfs(row+1, col+1))
        return memo[row][col]
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
    fun minimumTotal(triangle: List<List<Int>>): Int {
        val n = triangle.size
        val memo = Array(n) { r -> IntArray(triangle[r].size) { Int.MAX_VALUE } }

        fun dfs(row: Int, col: Int): Int {
            if (row >= n) return 0
            if (memo[row][col] != Int.MAX_VALUE) return memo[row][col]
            memo[row][col] = triangle[row][col] + minOf(dfs(row + 1, col), dfs(row + 1, col + 1))
            return memo[row][col]
        }
        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func minimumTotal(_ triangle: [[Int]]) -> Int {
        let n = triangle.count
        var memo = triangle.map { $0.map { _ in Int.max } }

        func dfs(_ row: Int, _ col: Int) -> Int {
            if row >= n {
                return 0
            }
            if memo[row][col] != Int.max {
                return memo[row][col]
            }
            memo[row][col] = triangle[row][col] + min(dfs(row + 1, col), dfs(row + 1, col + 1))
            return memo[row][col]
        }
        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of recursing from top to bottom, we can build the solution from the bottom up. Starting from the last row (where the values are the path sums themselves), we work upward. At each cell, we add the minimum of the two cells below it.

This eliminates recursion overhead and naturally fills the `dp` table in the correct order. By the time we reach the top, `dp[0][0]` contains the minimum path sum.

### Algorithm

1. Create a `dp` table with the same shape as the triangle.
2. Initialize the bottom row of `dp` with the bottom row of the triangle.
3. Iterate from the second-to-last row up to the first row.
4. For each cell, set `dp[row][col] = triangle[row][col] + min(dp[row+1][col], dp[row+1][col+1])`.
5. Return `dp[0][0]`.

::tabs-start

```python
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        n = len(triangle)
        dp = [[0] * len(triangle[row]) for row in range(n)]
        dp[-1] = triangle[-1][:]

        for row in range(n - 2, -1, -1):
            for col in range(len(triangle[row])):
                dp[row][col] = triangle[row][col] + min(dp[row + 1][col], dp[row + 1][col + 1])

        return dp[0][0]
```

```java
public class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[][] dp = new int[n][n];
        for (int col = 0; col < triangle.get(n - 1).size(); col++) {
            dp[n - 1][col] = triangle.get(n - 1).get(col);
        }

        for (int row = n - 2; row >= 0; row--) {
            for (int col = 0; col < triangle.get(row).size(); col++) {
                dp[row][col] = triangle.get(row).get(col) + Math.min(dp[row + 1][col], dp[row + 1][col + 1]);
            }
        }

        return dp[0][0];
    }
}
```

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int col = 0; col < triangle[n - 1].size(); ++col) {
            dp[n - 1][col] = triangle[n - 1][col];
        }

        for (int row = n - 2; row >= 0; --row) {
            for (int col = 0; col < triangle[row].size(); ++col) {
                dp[row][col] = triangle[row][col] + min(dp[row + 1][col], dp[row + 1][col + 1]);
            }
        }

        return dp[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} triangle
     * @return {number}
     */
    minimumTotal(triangle) {
        const n = triangle.length;
        const dp = Array.from({ length: n }, (_, i) =>
            Array(triangle[i].length).fill(0),
        );
        for (let col = 0; col < triangle[n - 1].length; col++) {
            dp[n - 1][col] = triangle[n - 1][col];
        }

        for (let row = n - 2; row >= 0; row--) {
            for (let col = 0; col < triangle[row].length; col++) {
                dp[row][col] =
                    triangle[row][col] +
                    Math.min(dp[row + 1][col], dp[row + 1][col + 1]);
            }
        }

        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public int MinimumTotal(List<List<int>> triangle) {
        int n = triangle.Count;
        int[][] dp = new int[n][];
        for (int i = 0; i < n; i++) {
            dp[i] = new int[triangle[i].Count];
        }

        for (int c = 0; c < triangle[n - 1].Count; c++) {
            dp[n - 1][c] = triangle[n - 1][c];
        }

        for (int row = n - 2; row >= 0; row--) {
            for (int col = 0; col < triangle[row].Count; col++) {
                dp[row][col] = triangle[row][col] + Math.Min(dp[row + 1][col], dp[row + 1][col + 1]);
            }
        }

        return dp[0][0];
    }
}
```

```go
func minimumTotal(triangle [][]int) int {
    n := len(triangle)
    dp := make([][]int, n)
    for i := 0; i < n; i++ {
        dp[i] = make([]int, len(triangle[i]))
    }

    for col := 0; col < len(triangle[n-1]); col++ {
        dp[n-1][col] = triangle[n-1][col]
    }

    for row := n - 2; row >= 0; row-- {
        for col := 0; col < len(triangle[row]); col++ {
            dp[row][col] = triangle[row][col] + min(dp[row+1][col], dp[row+1][col+1])
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
    fun minimumTotal(triangle: List<List<Int>>): Int {
        val n = triangle.size
        val dp = Array(n) { i -> IntArray(triangle[i].size) }

        for (col in triangle[n - 1].indices) {
            dp[n - 1][col] = triangle[n - 1][col]
        }

        for (row in n - 2 downTo 0) {
            for (col in triangle[row].indices) {
                dp[row][col] = triangle[row][col] + minOf(dp[row + 1][col], dp[row + 1][col + 1])
            }
        }

        return dp[0][0]
    }
}
```

```swift
class Solution {
    func minimumTotal(_ triangle: [[Int]]) -> Int {
        let n = triangle.count
        var dp = triangle.map { $0.map { _ in 0 } }

        for col in 0..<triangle[n - 1].count {
            dp[n - 1][col] = triangle[n - 1][col]
        }

        for row in stride(from: n - 2, through: 0, by: -1) {
            for col in 0..<triangle[row].count {
                dp[row][col] = triangle[row][col] + min(dp[row + 1][col], dp[row + 1][col + 1])
            }
        }

        return dp[0][0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Space Optimized) - I

### Intuition

When building top-down, we only need the previous row to compute the current row. We can use a single array that grows as we move down the triangle, updating values as we go.

The tricky part is handling the edges correctly. The leftmost element of each row can only come from the leftmost element above. The rightmost can only come from the rightmost above. Middle elements take the minimum of their two parents.

### Algorithm

1. Initialize `dp` with the first row of the triangle.
2. For each subsequent row, create a new `nxtDp` array of appropriate size.
3. Set the first element as `dp[0] + triangle[row][0]`.
4. For middle elements, take `triangle[row][col] + min(dp[col], dp[col-1])`.
5. Set the last element as `dp[last] + triangle[row][last]`.
6. Replace `dp` with `nxtDp`.
7. Return the minimum value in the final `dp` array.

::tabs-start

```python
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        n = len(triangle)
        dp = triangle[0][:]

        for row in range(1, n):
            nxtDp = [0] * len(triangle[row])
            nxtDp[0] = dp[0] + triangle[row][0]
            for col in range(1, len(triangle[row]) - 1):
                nxtDp[col] = triangle[row][col] + min(dp[col], dp[col - 1])
            nxtDp[-1] = dp[-1] + triangle[row][-1]
            dp = nxtDp

        return min(dp)
```

```java
public class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[] dp = new int[n];
        dp[0] = triangle.get(0).get(0);

        for (int row = 1; row < n; row++) {
            int[] nxtDp = new int[row + 1];
            nxtDp[0] = dp[0] + triangle.get(row).get(0);
            for (int col = 1; col < row; col++) {
                nxtDp[col] = triangle.get(row).get(col) + Math.min(dp[col], dp[col - 1]);
            }
            nxtDp[row] = dp[row - 1] + triangle.get(row).get(row);
            dp = nxtDp;
        }

        int minPath = Integer.MAX_VALUE;
        for (int value : dp) {
            minPath = Math.min(minPath, value);
        }
        return minPath;
    }
}
```

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> dp = triangle[0];

        for (int row = 1; row < n; row++) {
            vector<int> nxtDp(row + 1, 0);
            nxtDp[0] = dp[0] + triangle[row][0];
            for (int col = 1; col < row; col++) {
                nxtDp[col] = triangle[row][col] + min(dp[col], dp[col - 1]);
            }
            nxtDp[row] = dp[row - 1] + triangle[row][row];
            dp = nxtDp;
        }

        return *min_element(dp.begin(), dp.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} triangle
     * @return {number}
     */
    minimumTotal(triangle) {
        let n = triangle.length;
        let dp = [...triangle[0]];

        for (let row = 1; row < n; row++) {
            let nxtDp = new Array(row + 1).fill(0);
            nxtDp[0] = dp[0] + triangle[row][0];
            for (let col = 1; col < row; col++) {
                nxtDp[col] =
                    triangle[row][col] + Math.min(dp[col], dp[col - 1]);
            }
            nxtDp[row] = dp[row - 1] + triangle[row][row];
            dp = nxtDp;
        }

        return Math.min(...dp);
    }
}
```

```csharp
public class Solution {
    public int MinimumTotal(List<List<int>> triangle) {
        int n = triangle.Count;
        int[] dp = new int[triangle[0].Count];
        for (int i = 0; i < triangle[0].Count; i++) {
            dp[i] = triangle[0][i];
        }

        for (int row = 1; row < n; row++) {
            int[] nxtDp = new int[triangle[row].Count];
            nxtDp[0] = dp[0] + triangle[row][0];
            for (int col = 1; col < triangle[row].Count - 1; col++) {
                nxtDp[col] = triangle[row][col] + Math.Min(dp[col], dp[col - 1]);
            }
            nxtDp[triangle[row].Count - 1] = dp[dp.Length - 1] + triangle[row][triangle[row].Count - 1];
            dp = nxtDp;
        }

        int ans = dp[0];
        for (int i = 1; i < dp.Length; i++) {
            ans = Math.Min(ans, dp[i]);
        }
        return ans;
    }
}
```

```go
func minimumTotal(triangle [][]int) int {
    n := len(triangle)
    dp := make([]int, len(triangle[0]))
    copy(dp, triangle[0])

    for row := 1; row < n; row++ {
        nxtDp := make([]int, row+1)
        nxtDp[0] = dp[0] + triangle[row][0]
        for col := 1; col < row; col++ {
            nxtDp[col] = triangle[row][col] + min(dp[col], dp[col-1])
        }
        nxtDp[row] = dp[row-1] + triangle[row][row]
        dp = nxtDp
    }

    minPath := dp[0]
    for _, v := range dp {
        if v < minPath {
            minPath = v
        }
    }
    return minPath
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
    fun minimumTotal(triangle: List<List<Int>>): Int {
        val n = triangle.size
        var dp = triangle[0].toIntArray()

        for (row in 1 until n) {
            val nxtDp = IntArray(row + 1)
            nxtDp[0] = dp[0] + triangle[row][0]
            for (col in 1 until row) {
                nxtDp[col] = triangle[row][col] + minOf(dp[col], dp[col - 1])
            }
            nxtDp[row] = dp[row - 1] + triangle[row][row]
            dp = nxtDp
        }

        return dp.minOrNull() ?: 0
    }
}
```

```swift
class Solution {
    func minimumTotal(_ triangle: [[Int]]) -> Int {
        let n = triangle.count
        var dp = triangle[0]

        for row in 1..<n {
            var nxtDp = [Int](repeating: 0, count: row + 1)
            nxtDp[0] = dp[0] + triangle[row][0]
            for col in 1..<row {
                nxtDp[col] = triangle[row][col] + min(dp[col], dp[col - 1])
            }
            nxtDp[row] = dp[row - 1] + triangle[row][row]
            dp = nxtDp
        }

        return dp.min() ?? 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ extra space.

---

## 5. Dynamic Programming (Space Optimized) - II

### Intuition

Working bottom-up with space optimization is cleaner because we process elements left to right, and each cell only depends on cells to its right in the row below. This means we can safely overwrite values as we go without corrupting data we still need.

We start with the bottom row and repeatedly update each position with the minimum path sum from that point down. The final answer ends up in `dp[0]`.

### Algorithm

1. Initialize `dp` as a copy of the bottom row.
2. Iterate from the second-to-last row up to the first.
3. For each position in the current row, update `dp[col] = triangle[row][col] + min(dp[col], dp[col+1])`.
4. Since we process left to right and `dp[col+1]` is accessed before `dp[col]` is overwritten, no data is lost.
5. Return `dp[0]` after processing all rows.

::tabs-start

```python
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        n = len(triangle)
        dp = triangle[-1][:]

        for row in range(n - 2, -1, -1):
            for col in range(len(triangle[row])):
                dp[col] = triangle[row][col] + min(dp[col], dp[col + 1])

        return dp[0]
```

```java
public class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) {
            dp[i] = triangle.get(n - 1).get(i);
        }

        for (int row = n - 2; row >= 0; row--) {
            for (int col = 0; col < triangle.get(row).size(); col++) {
                dp[col] = triangle.get(row).get(col) + Math.min(dp[col], dp[col + 1]);
            }
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> dp(triangle.back());

        for (int row = n - 2; row >= 0; --row) {
            for (int col = 0; col < triangle[row].size(); ++col) {
                dp[col] = triangle[row][col] + min(dp[col], dp[col + 1]);
            }
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} triangle
     * @return {number}
     */
    minimumTotal(triangle) {
        const n = triangle.length;
        const dp = [...triangle[n - 1]];

        for (let row = n - 2; row >= 0; row--) {
            for (let col = 0; col < triangle[row].length; col++) {
                dp[col] = triangle[row][col] + Math.min(dp[col], dp[col + 1]);
            }
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int MinimumTotal(List<List<int>> triangle) {
        int n = triangle.Count;
        int[] dp = new int[triangle[n - 1].Count];
        for (int i = 0; i < triangle[n - 1].Count; i++) {
            dp[i] = triangle[n - 1][i];
        }

        for (int row = n - 2; row >= 0; row--) {
            for (int col = 0; col < triangle[row].Count; col++) {
                dp[col] = triangle[row][col] + Math.Min(dp[col], dp[col + 1]);
            }
        }

        return dp[0];
    }
}
```

```go
func minimumTotal(triangle [][]int) int {
    n := len(triangle)
    dp := make([]int, len(triangle[n-1]))
    copy(dp, triangle[n-1])

    for row := n - 2; row >= 0; row-- {
        for col := 0; col < len(triangle[row]); col++ {
            dp[col] = triangle[row][col] + min(dp[col], dp[col+1])
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
    fun minimumTotal(triangle: List<List<Int>>): Int {
        val n = triangle.size
        val dp = triangle[n - 1].toIntArray()

        for (row in n - 2 downTo 0) {
            for (col in triangle[row].indices) {
                dp[col] = triangle[row][col] + minOf(dp[col], dp[col + 1])
            }
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func minimumTotal(_ triangle: [[Int]]) -> Int {
        let n = triangle.count
        var dp = triangle[n - 1]

        for row in stride(from: n - 2, through: 0, by: -1) {
            for col in 0..<triangle[row].count {
                dp[col] = triangle[row][col] + min(dp[col], dp[col + 1])
            }
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ extra space.

---

## 6. Dynamic Programming (In-Place)

### Intuition

If we are allowed to modify the input triangle, we can skip creating a separate DP array entirely. We use the triangle itself to store intermediate results, applying the same bottom-up logic.

This approach uses constant extra space but modifies the input data. Each cell in the triangle gets replaced with the minimum path sum from that cell to the bottom.

### Algorithm

1. Iterate from the second-to-last row up to the first.
2. For each cell, update `triangle[row][col] += min(triangle[row+1][col], triangle[row+1][col+1])`.
3. The update modifies the current cell based on the two cells directly below it.
4. After all iterations, `triangle[0][0]` contains the minimum path sum.
5. Return `triangle[0][0]`.

::tabs-start

```python
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        for row in range(len(triangle) - 2, -1, -1):
            for col in range(len(triangle[row])):
                triangle[row][col] += min(triangle[row + 1][col], triangle[row + 1][col + 1])

        return triangle[0][0]
```

```java
public class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        for (int row = triangle.size() - 2; row >= 0; row--) {
            for (int col = 0; col < triangle.get(row).size(); col++) {
                triangle.get(row).set(col, triangle.get(row).get(col) +
                    Math.min(triangle.get(row + 1).get(col), triangle.get(row + 1).get(col + 1)));
            }
        }
        return triangle.get(0).get(0);
    }
}
```

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        for (int row = triangle.size() - 2; row >= 0; row--) {
            for (int col = 0; col < triangle[row].size(); col++) {
                triangle[row][col] += min(triangle[row + 1][col], triangle[row + 1][col + 1]);
            }
        }
        return triangle[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} triangle
     * @return {number}
     */
    minimumTotal(triangle) {
        for (let row = triangle.length - 2; row >= 0; row--) {
            for (let col = 0; col < triangle[row].length; col++) {
                triangle[row][col] += Math.min(
                    triangle[row + 1][col],
                    triangle[row + 1][col + 1],
                );
            }
        }
        return triangle[0][0];
    }
}
```

```csharp
public class Solution {
    public int MinimumTotal(List<List<int>> triangle) {
        for (int row = triangle.Count - 2; row >= 0; row--) {
            for (int col = 0; col < triangle[row].Count; col++) {
                triangle[row][col] += Math.Min(triangle[row + 1][col], triangle[row + 1][col + 1]);
            }
        }
        return triangle[0][0];
    }
}
```

```go
func minimumTotal(triangle [][]int) int {
    for row := len(triangle) - 2; row >= 0; row-- {
        for col := 0; col < len(triangle[row]); col++ {
            triangle[row][col] += min(triangle[row+1][col], triangle[row+1][col+1])
        }
    }
    return triangle[0][0]
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
    fun minimumTotal(triangle: MutableList<MutableList<Int>>): Int {
        for (row in triangle.size - 2 downTo 0) {
            for (col in triangle[row].indices) {
                triangle[row][col] += minOf(triangle[row + 1][col], triangle[row + 1][col + 1])
            }
        }
        return triangle[0][0]
    }
}
```

```swift
class Solution {
    func minimumTotal(_ triangle: [[Int]]) -> Int {
        var triangle = triangle
        for row in stride(from: triangle.count - 2, through: 0, by: -1) {
            for col in 0..<triangle[row].count {
                triangle[row][col] += min(triangle[row + 1][col], triangle[row + 1][col + 1])
            }
        }
        return triangle[0][0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Using Top-Down DP Without Tracking the Minimum at the Bottom

When using top-down dynamic programming, the minimum path sum ends up at one of the cells in the last row, not necessarily at a fixed position. A common mistake is to return `dp[n-1][0]` or `dp[n-1][n-1]` instead of finding the minimum across the entire bottom row. The bottom-up approach avoids this by naturally propagating the answer to `dp[0][0]`.

### Incorrect Index Handling for Adjacent Cells

In the triangle, a cell at position `(row, col)` can only move to `(row+1, col)` or `(row+1, col+1)`. A common error is to treat this like a standard grid where you can move to `col-1` as well. Since each row has exactly `row+1` elements, the valid adjacent indices are strictly `col` and `col+1` in the next row.

### Forgetting to Handle Single-Element Triangles

When the triangle has only one row with a single element, some implementations may fail if they assume there are at least two rows. Always ensure your base case or loop bounds correctly handle the edge case where `n == 1`, returning the single element as the answer.
