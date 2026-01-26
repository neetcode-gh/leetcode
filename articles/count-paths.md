## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Recursion** - Breaking down the problem into smaller subproblems (paths from adjacent cells)
- **Dynamic Programming (Memoization)** - Caching computed results to avoid redundant calculations
- **Dynamic Programming (Tabulation)** - Building solutions bottom-up using a DP table
- **Combinatorics** - Understanding that path counting is equivalent to choosing positions for moves

---

## 1. Recursion

### Intuition
This is the **pure recursive (brute force)** way to think about the problem.

From any cell `(i, j)` in the grid:
- You can only move **right** or **down**.
- The total number of paths from `(i, j)` is:
  > paths going right + paths going down

Base ideas:
- If you **reach the bottom-right cell**, you found **one valid path**.
- If you **go out of bounds**, that path is invalid (count = 0).

So the problem naturally breaks into **smaller subproblems**, making recursion a direct fit.

### Algorithm
1. Start from the top-left cell `(0, 0)`.
2. At each cell `(i, j)`:
   - If `(i, j)` is the destination `(m-1, n-1)`, return `1`.
   - If `(i, j)` is outside the grid, return `0`.
3. Recursively compute:
   - Paths by moving **right** -> `(i, j + 1)`
   - Paths by moving **down** -> `(i + 1, j)`
4. Return the sum of both.
5. The answer is the result from `(0, 0)`.

::tabs-start

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:

        def dfs(i, j):
            if i == (m - 1) and j == (n - 1):
                return 1
            if i >= m or j >= n:
                return 0
            return dfs(i, j + 1) + dfs(i + 1, j)

        return dfs(0, 0)
```

```java
public class Solution {
    public int uniquePaths(int m, int n) {
        return dfs(0, 0, m, n);
    }

    public int dfs(int i, int j, int m, int n) {
        if (i == (m - 1) && j == (n - 1)) {
            return 1;
        }
        if (i >= m || j >= n) return 0;
        return dfs(i, j + 1, m, n) +
               dfs(i + 1, j, m, n);
    }
}
```

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        return dfs(0, 0, m, n);
    }

    int dfs(int i, int j, int m, int n) {
        if (i == (m - 1) && j == (n - 1)) {
            return 1;
        }
        if (i >= m || j >= n) return 0;
        return dfs(i, j + 1, m, n) +
               dfs(i + 1, j, m, n);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    uniquePaths(m, n) {
        const dfs = (i, j) => {
            if (i == m - 1 && j == n - 1) {
                return 1;
            }
            if (i >= m || j >= n) return 0;
            return dfs(i, j + 1) + dfs(i + 1, j);
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public int UniquePaths(int m, int n) {
        return Dfs(0, 0, m, n);
    }

    int Dfs(int i, int j, int m, int n) {
        if (i == (m - 1) && j == (n - 1)) {
            return 1;
        }
        if (i >= m || j >= n) return 0;
        return Dfs(i, j + 1, m, n) +
               Dfs(i + 1, j, m, n);
    }
}
```

```go
func uniquePaths(m int, n int) int {
    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == m-1 && j == n-1 {
            return 1
        }
        if i >= m || j >= n {
            return 0
        }
        return dfs(i, j+1) + dfs(i+1, j)
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    fun uniquePaths(m: Int, n: Int): Int {
        fun dfs(i: Int, j: Int): Int {
            if (i == m - 1 && j == n - 1) return 1
            if (i >= m || j >= n) return 0
            return dfs(i, j + 1) + dfs(i + 1, j)
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func uniquePaths(_ m: Int, _ n: Int) -> Int {
        func dfs(_ i: Int, _ j: Int) -> Int {
            if i == m - 1 && j == n - 1 {
                return 1
            }
            if i >= m || j >= n {
                return 0
            }
            return dfs(i, j + 1) + dfs(i + 1, j)
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ {m + n})$
- Space complexity: $O(m + n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Dynamic Programming (Top-Down)

### Intuition
This is the **optimized version of recursion** using **memoization**.

In the brute-force approach, the same cell `(i, j)` is solved many times.  
But the number of paths from a cell **never changes**, so we can **store it once and reuse it**.

Think of it this way:
- Every cell `(i, j)` asks:  
  **“How many ways can I reach the destination from here?”**
- Once answered, we **cache** it so we never recompute it.

This turns an exponential recursion into a polynomial-time solution.

### Algorithm
1. Create a 2D memo table `memo[m][n]`, initialized to `-1`.
2. Define a recursive function `dfs(i, j)`:
   - If `(i, j)` is the destination `(m-1, n-1)`, return `1`.
   - If `(i, j)` is out of bounds, return `0`.
   - If `memo[i][j]` is already computed, return it.
3. Otherwise:
   - Compute paths by moving **right** and **down**:
     `memo[i][j] = dfs(i, j+1) + dfs(i+1, j)`
4. Return `memo[i][j]`.
5. Start recursion from `(0, 0)`.

::tabs-start

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        memo = [[-1] * n for _ in range(m)]
        def dfs(i, j):
            if i == (m - 1) and j == (n - 1):
                return 1
            if i >= m or j >= n:
                return 0
            if memo[i][j] != -1:
                return memo[i][j]

            memo[i][j] =  dfs(i, j + 1) + dfs(i + 1, j)
            return memo[i][j]

        return dfs(0, 0)
```

```java
public class Solution {
    int[][] memo;
    public int uniquePaths(int m, int n) {
        memo = new int[m][n];
        for(int[] it : memo) {
            Arrays.fill(it, -1);
        }
        return dfs(0, 0, m, n);
    }

    public int dfs(int i, int j, int m, int n) {
        if (i == (m - 1) && j == (n - 1)) {
            return 1;
        }
        if (i >= m || j >= n) return 0;
        if (memo[i][j] != -1) {
            return memo[i][j];
        }
        return memo[i][j] = dfs(i, j + 1, m, n) +
                            dfs(i + 1, j, m, n);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> memo;
    int uniquePaths(int m, int n) {
        memo.resize(m, vector<int>(n, -1));
        return dfs(0, 0, m, n);
    }

    int dfs(int i, int j, int m, int n) {
        if (i == (m - 1) && j == (n - 1)) {
            return 1;
        }
        if (i >= m || j >= n) return 0;
        if (memo[i][j] != -1) {
            return memo[i][j];
        }
        return memo[i][j] = dfs(i, j + 1, m, n) +
                            dfs(i + 1, j, m, n);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    uniquePaths(m, n) {
        const memo = Array.from({ length: m }, () => Array(n).fill(-1));
        const dfs = (i, j) => {
            if (i == m - 1 && j == n - 1) {
                return 1;
            }
            if (i >= m || j >= n) return 0;
            if (memo[i][j] != -1) {
                return memo[i][j];
            }
            memo[i][j] = dfs(i, j + 1) + dfs(i + 1, j);
            return memo[i][j];
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    int[,] memo;
    public int UniquePaths(int m, int n) {
        memo = new int[m, n];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                memo[i, j] = -1;

        return Dfs(0, 0, m, n);
    }

    int Dfs(int i, int j, int m, int n) {
        if (i == (m - 1) && j == (n - 1)) {
            return 1;
        }
        if (i >= m || j >= n) return 0;
        if (memo[i, j] != -1) {
            return memo[i, j];
        }
        return memo[i, j] = Dfs(i, j + 1, m, n) +
                            Dfs(i + 1, j, m, n);
    }
}
```

```go
func uniquePaths(m int, n int) int {
    memo := make([][]int, m)
    for i := range memo {
        memo[i] = make([]int, n)
        for j := range memo[i] {
            memo[i][j] = -1
        }
    }

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == m-1 && j == n-1 {
            return 1
        }
        if i >= m || j >= n {
            return 0
        }
        if memo[i][j] != -1 {
            return memo[i][j]
        }

        memo[i][j] = dfs(i, j+1) + dfs(i+1, j)
        return memo[i][j]
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    fun uniquePaths(m: Int, n: Int): Int {
        val memo = Array(m) { IntArray(n) { -1 } }

        fun dfs(i: Int, j: Int): Int {
            if (i == m - 1 && j == n - 1) return 1
            if (i >= m || j >= n) return 0
            if (memo[i][j] != -1) return memo[i][j]

            memo[i][j] = dfs(i, j + 1) + dfs(i + 1, j)
            return memo[i][j]
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func uniquePaths(_ m: Int, _ n: Int) -> Int {
        var memo = Array(repeating: Array(repeating: -1, count: n), count: m)

        func dfs(_ i: Int, _ j: Int) -> Int {
            if i == m - 1 && j == n - 1 {
                return 1
            }
            if i >= m || j >= n {
                return 0
            }
            if memo[i][j] != -1 {
                return memo[i][j]
            }

            memo[i][j] = dfs(i, j + 1) + dfs(i + 1, j)
            return memo[i][j]
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

## 3. Dynamic Programming (Bottom-Up)

### Intuition
Instead of starting from the top and recursing, we **build the answer from the destination backward**.

From any cell `(i, j)`, the number of unique paths to the destination is:
- paths from the **cell below** `(i+1, j)`
- plus paths from the **cell to the right** `(i, j+1)`

If we already know these values, we can compute the current cell directly.

So we:
- Set the destination cell to `1`
- Fill the grid **bottom-up**, **right-to-left**

### Algorithm
1. Create a `(m+1) x (n+1)` DP table initialized with `0`.
2. Set `dp[m-1][n-1] = 1` (only one way to stay at destination).
3. Traverse rows from `m-1` to `0` and columns from `n-1` to `0`.
4. For each cell `(i, j)`: `dp[i][j] = dp[i+1][j] + dp[i][j+1]`
5. Return `dp[0][0]`.

::tabs-start

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        dp[m - 1][n - 1] = 1

        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                dp[i][j] += dp[i + 1][j] + dp[i][j + 1]

        return dp[0][0]
```

```java
public class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m + 1][n + 1];
        dp[m - 1][n - 1] = 1;

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                dp[i][j] += dp[i + 1][j] + dp[i][j + 1];
            }
        }

        return dp[0][0];
    }
}
```

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        dp[m - 1][n - 1] = 1;

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                dp[i][j] += dp[i + 1][j] + dp[i][j + 1];
            }
        }

        return dp[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    uniquePaths(m, n) {
        let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
        dp[m - 1][n - 1] = 1;

        for (let i = m - 1; i >= 0; i--) {
            for (let j = n - 1; j >= 0; j--) {
                dp[i][j] += dp[i + 1][j] + dp[i][j + 1];
            }
        }

        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public int UniquePaths(int m, int n) {
        int[,] dp = new int[m + 1, n + 1];
        dp[m - 1, n - 1] = 1;

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                dp[i, j] += dp[i + 1, j] + dp[i, j + 1];
            }
        }

        return dp[0, 0];
    }
}
```

```go
func uniquePaths(m int, n int) int {
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }
    dp[m-1][n-1] = 1

    for i := m - 1; i >= 0; i-- {
        for j := n - 1; j >= 0; j-- {
            dp[i][j] += dp[i+1][j] + dp[i][j+1]
        }
    }

    return dp[0][0]
}
```

```kotlin
class Solution {
    fun uniquePaths(m: Int, n: Int): Int {
        val dp = Array(m + 1) { IntArray(n + 1) }
        dp[m - 1][n - 1] = 1

        for (i in m - 1 downTo 0) {
            for (j in n - 1 downTo 0) {
                dp[i][j] += dp[i + 1][j] + dp[i][j + 1]
            }
        }

        return dp[0][0]
    }
}
```

```swift
class Solution {
    func uniquePaths(_ m: Int, _ n: Int) -> Int {
        var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: m + 1)
        dp[m - 1][n - 1] = 1

        for i in stride(from: m - 1, through: 0, by: -1) {
            for j in stride(from: n - 1, through: 0, by: -1) {
                dp[i][j] += dp[i + 1][j] + dp[i][j + 1]
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

## 4. Dynamic Programming (Space Optimized)

### Intuition
Each cell only depends on:
- the **cell to the right** (same row)
- the **cell below** (previous row)

So instead of storing the entire 2D grid, we can keep **just one row** at a time.
We update the row from **right to left**, using values from:
- the current row (`newRow[j + 1]`)
- the previous row (`row[j]`)

This reduces space while keeping the same logic.

### Algorithm
1. Initialize a 1D array `row` of size `n` with all `1`s
   (only one way to move right along the bottom row).
2. Repeat for `m - 1` rows:
   - Create a new row filled with `1`s.
   - Traverse columns from right to left (excluding last column).
   - Update: `newRow[j] = newRow[j + 1] + row[j]`
   - Replace `row` with `newRow`.
3. Return `row[0]` (top-left cell).

::tabs-start

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        row = [1] * n

        for i in range(m - 1):
            newRow = [1] * n
            for j in range(n - 2, -1, -1):
                newRow[j] = newRow[j + 1] + row[j]
            row = newRow
        return row[0]
```

```java
public class Solution {
    public int uniquePaths(int m, int n) {
        int[] row = new int[n];
        Arrays.fill(row, 1);

        for (int i = 0; i < m - 1; i++) {
            int[] newRow = new int[n];
            Arrays.fill(newRow, 1);
            for (int j = n - 2; j >= 0; j--) {
                newRow[j] = newRow[j + 1] + row[j];
            }
            row = newRow;
        }
        return row[0];
    }
}
```

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> row(n, 1);

        for (int i = 0; i < m - 1; ++i) {
            vector<int> newRow(n, 1);
            for (int j = n - 2; j >= 0; --j) {
                newRow[j] = newRow[j + 1] + row[j];
            }
            row = newRow;
        }
        return row[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    uniquePaths(m, n) {
        let row = new Array(n).fill(1);

        for (let i = 0; i < m - 1; i++) {
            const newRow = new Array(n).fill(1);
            for (let j = n - 2; j >= 0; j--) {
                newRow[j] = newRow[j + 1] + row[j];
            }
            row = newRow;
        }
        return row[0];
    }
}
```

```csharp
public class Solution {
    public int UniquePaths(int m, int n) {
        var row = new int[n];
        Array.Fill(row, 1);
        for (int i = 0; i < m - 1; i++) {
            var newRow = new int[n];
            Array.Fill(newRow, 1);
            for (int j = n - 2; j >=0; j--) {
                newRow[j] = newRow[j + 1] + row[j];
            }
            row = newRow;
        }
        return row[0];
    }
}
```

```go
func uniquePaths(m int, n int) int {
    row := make([]int, n)
    for i := range row {
        row[i] = 1
    }

    for i := 0; i < m - 1; i++ {
        newRow := make([]int, n)
        newRow[n-1] = 1
        for j := n - 2; j >= 0; j-- {
            newRow[j] = newRow[j+1] + row[j]
        }
        row = newRow
    }

    return row[0]
}
```

```kotlin
class Solution {
    fun uniquePaths(m: Int, n: Int): Int {
        var row = IntArray(n) { 1 }

        for (i in 0 until m - 1) {
            val newRow = IntArray(n) { 1 }
            for (j in n - 2 downTo 0) {
                newRow[j] = newRow[j + 1] + row[j]
            }
            row = newRow
        }

        return row[0]
    }
}
```

```swift
class Solution {
    func uniquePaths(_ m: Int, _ n: Int) -> Int {
        var row = Array(repeating: 1, count: n)

        for _ in 0..<(m - 1) {
            var newRow = Array(repeating: 1, count: n)
            for j in stride(from: n - 2, through: 0, by: -1) {
                newRow[j] = newRow[j + 1] + row[j]
            }
            row = newRow
        }
        return row[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 5. Dynamic Programming (Optimal)

### Intuition
From any cell, you can reach the destination by moving:
- **right**
- **down**

The number of ways to reach a cell equals:
> ways from the cell **below** + ways from the cell **to the right**

Instead of using a full 2D table, we notice that:
- each row only depends on the row **below it**
- so a **single 1D array** is enough

We keep updating this array from **right to left**, accumulating paths.

### Algorithm
1. Initialize a 1D array `dp` of size `n` with all values as `1`
   (only one way along the last row).
2. For each remaining row (from bottom to top):
   - Traverse columns from right to left (excluding last column).
   - Update: `dp[j] = dp[j] + dp[j + 1]`
3. After all rows are processed, `dp[0]` contains the total number of unique paths.
4. Return `dp[0]`.

::tabs-start

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [1] * n
        for i in range(m - 2, -1, -1):
            for j in range(n - 2, -1, -1):
                dp[j] += dp[j + 1]

        return dp[0]
```

```java
public class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);

        for (int i = m - 2; i >= 0; i--) {
            for (int j = n - 2; j >= 0; j--) {
                dp[j] += dp[j + 1];
            }
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(n, 1);

        for (int i = m - 2; i >= 0; i--) {
            for (int j = n - 2; j >= 0; j--) {
                dp[j] += dp[j + 1];
            }
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    uniquePaths(m, n) {
        let dp = new Array(n).fill(1);

        for (let i = m - 2; i >= 0; i--) {
            for (let j = n - 2; j >= 0; j--) {
                dp[j] += dp[j + 1];
            }
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int UniquePaths(int m, int n) {
        int[] dp = new int[n];
        Array.Fill(dp, 1);

        for (int i = m - 2; i >= 0; i--) {
            for (int j = n - 2; j >= 0; j--) {
                dp[j] += dp[j + 1];
            }
        }

        return dp[0];
    }
}
```

```go
func uniquePaths(m int, n int) int {
    dp := make([]int, n)
    for i := range dp {
        dp[i] = 1
    }

    for i := m - 2; i >= 0; i-- {
        for j := n - 2; j >= 0; j-- {
            dp[j] += dp[j+1]
        }
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun uniquePaths(m: Int, n: Int): Int {
        var dp = IntArray(n) { 1 }

        for (i in m - 2 downTo 0) {
            for (j in n - 2 downTo 0) {
                dp[j] += dp[j + 1]
            }
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func uniquePaths(_ m: Int, _ n: Int) -> Int {
        var dp = Array(repeating: 1, count: n)

        for _ in stride(from: m - 2, through: 0, by: -1) {
            for j in stride(from: n - 2, through: 0, by: -1) {
                dp[j] += dp[j + 1]
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

## 6. Math

### Intuition
To go from the top-left to the bottom-right of an `m x n` grid, you can only move **right** or **down**.

- You must move **down (m - 1)** times  
- You must move **right (n - 1)** times  

So overall, you make **(m + n - 2)** moves.

The problem becomes:
> In how many different ways can we arrange these right and down moves?

This is a **combinations** problem:
- Choose positions for the right moves (or down moves)

That gives:
$\binom{m+n-2}{n-1}$

### Algorithm
1. If either `m` or `n` is `1`, return `1` (only one path).
2. Always use the smaller value between `m` and `n` to reduce calculations.
3. Compute the combination value iteratively (without factorials).
4. Return the final result.

::tabs-start

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        if m == 1 or n == 1:
            return 1
        if m < n:
            m, n = n, m

        res = j = 1
        for i in range(m, m + n - 1):
            res *= i
            res //= j
            j += 1

        return res
```

```java
public class Solution {
    public int uniquePaths(int m, int n) {
        if (m == 1 || n == 1) {
            return 1;
        }
        if (m < n) {
            int temp = m;
            m = n;
            n = temp;
        }

        long res = 1;
        int j = 1;
        for (int i = m; i < m + n - 1; i++) {
            res *= i;
            res /= j;
            j++;
        }

        return (int) res;
    }
}
```

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        if (m == 1 || n == 1) {
            return 1;
        }
        if (m < n) {
            swap(m, n);
        }

        long long res = 1;
        int j = 1;
        for (int i = m; i < m + n - 1; i++) {
            res *= i;
            res /= j;
            j++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    uniquePaths(m, n) {
        if (m === 1 || n === 1) {
            return 1;
        }
        if (m < n) {
            [m, n] = [n, m];
        }

        let res = 1,
            j = 1;
        for (let i = m; i < m + n - 1; i++) {
            res *= i;
            res = Math.floor(res / j);
            j++;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int UniquePaths(int m, int n) {
        if (m == 1 || n == 1) {
            return 1;
        }
        if (m < n) {
            int temp = m;
            m = n;
            n = temp;
        }

        long res = 1;
        int j = 1;
        for (int i = m; i < m + n - 1; i++) {
            res *= i;
            res /= j;
            j++;
        }

        return (int) res;
    }
}
```

```go
func uniquePaths(m int, n int) int {
    if m == 1 || n == 1 {
        return 1
    }
    if m < n {
        tmp := m
        m = n
        n = tmp
    }

    res, j := 1, 1
    for i := m; i < m + n - 1; i++ {
        res *= i
        res /= j
        j++
    }

    return res
}
```

```kotlin
class Solution {
    fun uniquePaths(m: Int, n: Int): Int {
        if (m == 1 || n == 1) return 1
        var m = m
        var n = n
        if (m < n) {
            val tmp = m
            m = n
            n = tmp
        }

        var res: Long = 1
        var j = 1
        for (i in m until m + n - 1) {
            res *= i
            res /= j
            j++
        }

        return res.toInt()
    }
}
```

```swift
class Solution {
    func uniquePaths(_ m: Int, _ n: Int) -> Int {
        if m == 1 || n == 1 {
            return 1
        }
        var m = m, n = n
        if m < n {
            swap(&m, &n)
        }

        var res = 1
        var j = 1
        for i in m..<(m + n - 1) {
            res *= i
            res /= j
            j += 1
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(min(m, n))$
- Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## Common Pitfalls

### Confusing Rows and Columns with Moves
Misunderstanding that an `m x n` grid requires `m - 1` down moves and `n - 1` right moves (not `m` and `n`). The total moves is `(m - 1) + (n - 1) = m + n - 2`.

### Wrong Base Case in Recursion
Returning `1` when reaching any boundary instead of only the destination cell. The base case should trigger only at `(m-1, n-1)`, not when hitting the last row or column.
```python
# Wrong: counts incomplete paths
if i == m - 1 or j == n - 1:
    return 1
# Correct: only count at destination
if i == m - 1 and j == n - 1:
    return 1
```

### Integer Overflow in Math Solution
When computing combinations for larger grids, intermediate multiplication can overflow. Use `long` types and divide as you multiply to keep values manageable.
```java
// Risk of overflow
res = factorial(m + n - 2) / (factorial(m - 1) * factorial(n - 1));
// Safer: multiply and divide iteratively
res *= i;
res /= j;
```