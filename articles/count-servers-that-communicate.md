## 1. Brute Force

### Intuition

A server can communicate if there is at least one other server in the same row or column. For each server, we can directly check its entire row and column to see if any other server exists. If we find at least one, this server counts toward our result.

### Algorithm

1. Iterate through each cell in the grid.
2. For each cell containing a server (value 1):
   - Check all other cells in the same row for another server.
   - If not found in the row, check all other cells in the same column.
   - If another server is found in either the row or column, increment the result.
3. Return the total count of servers that can communicate.

::tabs-start

```python
class Solution:
    def countServers(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        res = 0

        for r in range(m):
            for c in range(n):
                if grid[r][c] == 0:
                    continue

                found = False
                for col in range(n):
                    if col != c and grid[r][col] == 1:
                        found = True
                        break

                if not found:
                    for row in range(m):
                        if row != r and grid[row][c] == 1:
                            found = True
                            break

                if found:
                    res += 1

        return res
```

```java
public class Solution {
    public int countServers(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int res = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 0) continue;

                boolean found = false;
                for (int col = 0; col < n; col++) {
                    if (col != c && grid[r][col] == 1) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    for (int row = 0; row < m; row++) {
                        if (row != r && grid[row][c] == 1) {
                            found = true;
                            break;
                        }
                    }
                }

                if (found) res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countServers(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int res = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 0) continue;

                bool found = false;
                for (int col = 0; col < n; col++) {
                    if (col != c && grid[r][col] == 1) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    for (int row = 0; row < m; row++) {
                        if (row != r && grid[row][c] == 1) {
                            found = true;
                            break;
                        }
                    }
                }

                if (found) res++;
            }
        }

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
    countServers(grid) {
        let m = grid.length, n = grid[0].length;
        let res = 0;

        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                if (grid[r][c] === 0) continue;

                let found = false;
                for (let col = 0; col < n; col++) {
                    if (col !== c && grid[r][col] === 1) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    for (let row = 0; row < m; row++) {
                        if (row !== r && grid[row][c] === 1) {
                            found = true;
                            break;
                        }
                    }
                }

                if (found) res++;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountServers(int[][] grid) {
        int m = grid.Length, n = grid[0].Length;
        int res = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 0) continue;

                bool found = false;
                for (int col = 0; col < n; col++) {
                    if (col != c && grid[r][col] == 1) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    for (int row = 0; row < m; row++) {
                        if (row != r && grid[row][c] == 1) {
                            found = true;
                            break;
                        }
                    }
                }

                if (found) res++;
            }
        }

        return res;
    }
}
```

```go
func countServers(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    res := 0

    for r := 0; r < m; r++ {
        for c := 0; c < n; c++ {
            if grid[r][c] == 0 {
                continue
            }

            found := false
            for col := 0; col < n; col++ {
                if col != c && grid[r][col] == 1 {
                    found = true
                    break
                }
            }

            if !found {
                for row := 0; row < m; row++ {
                    if row != r && grid[row][c] == 1 {
                        found = true
                        break
                    }
                }
            }

            if found {
                res++
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countServers(grid: Array<IntArray>): Int {
        val m = grid.size
        val n = grid[0].size
        var res = 0

        for (r in 0 until m) {
            for (c in 0 until n) {
                if (grid[r][c] == 0) continue

                var found = false
                for (col in 0 until n) {
                    if (col != c && grid[r][col] == 1) {
                        found = true
                        break
                    }
                }

                if (!found) {
                    for (row in 0 until m) {
                        if (row != r && grid[row][c] == 1) {
                            found = true
                            break
                        }
                    }
                }

                if (found) res++
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func countServers(_ grid: [[Int]]) -> Int {
        let m = grid.count, n = grid[0].count
        var res = 0

        for r in 0..<m {
            for c in 0..<n {
                if grid[r][c] == 0 { continue }

                var found = false
                for col in 0..<n {
                    if col != c && grid[r][col] == 1 {
                        found = true
                        break
                    }
                }

                if !found {
                    for row in 0..<m {
                        if row != r && grid[row][c] == 1 {
                            found = true
                            break
                        }
                    }
                }

                if found { res += 1 }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n ^ 2)$
* Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns of the given matrix $grid$.

---

## 2. Iteration

### Intuition

Instead of checking each server's row and column individually, we can precompute the count of servers in each row and column. A server can communicate if there is more than one server in its row or more than one server in its column. This allows us to determine each server's status in constant time after the preprocessing step.

### Algorithm

1. Create two arrays: `row_cnt` to store server counts per row and `col_cnt` for columns.
2. First pass: Count the number of servers in each row and column.
3. Second pass: For each server, check if its row count or column count is greater than 1.
   - If yes, this server can communicate with at least one other server.
4. Return the total count of communicating servers.

::tabs-start

```python
class Solution:
    def countServers(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        row_cnt = [0] * ROWS
        col_cnt = [0] * COLS

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == 1:
                    row_cnt[r] += 1
                    col_cnt[c] += 1

        res = 0
        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] and max(row_cnt[r], col_cnt[c]) > 1:
                    res += 1

        return res
```

```java
public class Solution {
    public int countServers(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int[] row_cnt = new int[ROWS];
        int[] col_cnt = new int[COLS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    row_cnt[r]++;
                    col_cnt[c]++;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1 && Math.max(row_cnt[r], col_cnt[c]) > 1) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countServers(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        vector<int> row_cnt(ROWS, 0), col_cnt(COLS, 0);

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    row_cnt[r]++;
                    col_cnt[c]++;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1 && max(row_cnt[r], col_cnt[c]) > 1) {
                    res++;
                }
            }
        }

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
    countServers(grid) {
        let ROWS = grid.length, COLS = grid[0].length;
        let row_cnt = new Array(ROWS).fill(0);
        let col_cnt = new Array(COLS).fill(0);

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1) {
                    row_cnt[r]++;
                    col_cnt[c]++;
                }
            }
        }

        let res = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1 && Math.max(row_cnt[r], col_cnt[c]) > 1) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountServers(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int[] row_cnt = new int[ROWS];
        int[] col_cnt = new int[COLS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    row_cnt[r]++;
                    col_cnt[c]++;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1 && Math.Max(row_cnt[r], col_cnt[c]) > 1) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```go
func countServers(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    rowCnt := make([]int, ROWS)
    colCnt := make([]int, COLS)

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if grid[r][c] == 1 {
                rowCnt[r]++
                colCnt[c]++
            }
        }
    }

    res := 0
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if grid[r][c] == 1 && max(rowCnt[r], colCnt[c]) > 1 {
                res++
            }
        }
    }

    return res
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
    fun countServers(grid: Array<IntArray>): Int {
        val ROWS = grid.size
        val COLS = grid[0].size
        val rowCnt = IntArray(ROWS)
        val colCnt = IntArray(COLS)

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (grid[r][c] == 1) {
                    rowCnt[r]++
                    colCnt[c]++
                }
            }
        }

        var res = 0
        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (grid[r][c] == 1 && maxOf(rowCnt[r], colCnt[c]) > 1) {
                    res++
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func countServers(_ grid: [[Int]]) -> Int {
        let ROWS = grid.count, COLS = grid[0].count
        var rowCnt = [Int](repeating: 0, count: ROWS)
        var colCnt = [Int](repeating: 0, count: COLS)

        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid[r][c] == 1 {
                    rowCnt[r] += 1
                    colCnt[c] += 1
                }
            }
        }

        var res = 0
        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid[r][c] == 1 && max(rowCnt[r], colCnt[c]) > 1 {
                    res += 1
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m + n)$

> Where $m$ is the number of rows and $n$ is the number of columns of the given matrix $grid$.

---

## 3. Iteration (Space Optimized)

### Intuition

We can avoid using extra arrays by processing rows and columns separately and using the grid itself to mark processed servers. First, we process all rows with multiple servers and mark those servers. Then, we process columns and only count unmarked servers in columns with multiple servers. The marking prevents double counting servers that belong to both a communicating row and column.

### Algorithm

1. Process rows first:
   - For each row with more than one server, add all servers in that row to the result.
   - Mark these servers by setting their value to -1.
2. Process columns:
   - For each column, count total servers (using absolute values) and unmarked servers.
   - If the column has two or more servers, add the count of unmarked servers to the result.
   - Restore marked servers by setting -1 back to 1.
3. Return the total count.

::tabs-start

```python
class Solution:
    def countServers(self, grid: List[List[int]]) -> int:
        res = 0
        ROWS, COLS = len(grid), len(grid[0])

        # Rows
        for r in range(ROWS):
            row_sum = sum(grid[r])
            if row_sum <= 1:
                continue
            res += row_sum
            for c in range(COLS):
                if grid[r][c]:
                    grid[r][c] = -1  # Mark

        # Cols
        for c in range(COLS):
            col_sum = unmarked = 0
            for r in range(ROWS):
                col_sum += abs(grid[r][c])
                if grid[r][c] > 0:
                    unmarked += 1
                elif grid[r][c] < 0:
                    grid[r][c] = 1 # Unmark
            if col_sum >= 2:
                res += unmarked

        return res
```

```java
public class Solution {
    public int countServers(int[][] grid) {
        int res = 0;
        int ROWS = grid.length, COLS = grid[0].length;

        // Rows
        for (int r = 0; r < ROWS; r++) {
            int rowSum = 0;
            for (int c = 0; c < COLS; c++) {
                rowSum += grid[r][c];
            }
            if (rowSum <= 1) continue;
            res += rowSum;
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) grid[r][c] = -1; // Mark
            }
        }

        // Cols
        for (int c = 0; c < COLS; c++) {
            int colSum = 0, unmarked = 0;
            for (int r = 0; r < ROWS; r++) {
                colSum += Math.abs(grid[r][c]);
                if (grid[r][c] > 0) unmarked++;
                else if (grid[r][c] < 0) grid[r][c] = 1; // Unmark
            }
            if (colSum >= 2) res += unmarked;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countServers(vector<vector<int>>& grid) {
        int res = 0;
        int ROWS = grid.size(), COLS = grid[0].size();

        // Rows
        for (int r = 0; r < ROWS; r++) {
            int rowSum = accumulate(grid[r].begin(), grid[r].end(), 0);
            if (rowSum <= 1) continue;
            res += rowSum;
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) grid[r][c] = -1; // Mark
            }
        }

        // Cols
        for (int c = 0; c < COLS; c++) {
            int colSum = 0, unmarked = 0;
            for (int r = 0; r < ROWS; r++) {
                colSum += abs(grid[r][c]);
                if (grid[r][c] > 0) unmarked++;
                else if (grid[r][c] < 0) grid[r][c] = 1; // Unmark
            }
            if (colSum >= 2) res += unmarked;
        }

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
    countServers(grid) {
        let res = 0;
        const ROWS = grid.length, COLS = grid[0].length;

        // Rows
        for (let r = 0; r < ROWS; r++) {
            let rowSum = grid[r].reduce((a, b) => a + b, 0);
            if (rowSum <= 1) continue;
            res += rowSum;
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1) grid[r][c] = -1; // Mark
            }
        }

        // Cols
        for (let c = 0; c < COLS; c++) {
            let colSum = 0, unmarked = 0;
            for (let r = 0; r < ROWS; r++) {
                colSum += Math.abs(grid[r][c]);
                if (grid[r][c] > 0) unmarked++;
                else if (grid[r][c] < 0) grid[r][c] = 1; // Unmark
            }
            if (colSum >= 2) res += unmarked;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountServers(int[][] grid) {
        int res = 0;
        int ROWS = grid.Length, COLS = grid[0].Length;

        // Rows
        for (int r = 0; r < ROWS; r++) {
            int rowSum = 0;
            for (int c = 0; c < COLS; c++) {
                rowSum += grid[r][c];
            }
            if (rowSum <= 1) continue;
            res += rowSum;
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) grid[r][c] = -1; // Mark
            }
        }

        // Cols
        for (int c = 0; c < COLS; c++) {
            int colSum = 0, unmarked = 0;
            for (int r = 0; r < ROWS; r++) {
                colSum += Math.Abs(grid[r][c]);
                if (grid[r][c] > 0) unmarked++;
                else if (grid[r][c] < 0) grid[r][c] = 1; // Unmark
            }
            if (colSum >= 2) res += unmarked;
        }

        return res;
    }
}
```

```go
func countServers(grid [][]int) int {
    res := 0
    ROWS, COLS := len(grid), len(grid[0])

    // Rows
    for r := 0; r < ROWS; r++ {
        rowSum := 0
        for c := 0; c < COLS; c++ {
            rowSum += grid[r][c]
        }
        if rowSum <= 1 {
            continue
        }
        res += rowSum
        for c := 0; c < COLS; c++ {
            if grid[r][c] == 1 {
                grid[r][c] = -1 // Mark
            }
        }
    }

    // Cols
    for c := 0; c < COLS; c++ {
        colSum, unmarked := 0, 0
        for r := 0; r < ROWS; r++ {
            if grid[r][c] < 0 {
                colSum += -grid[r][c]
            } else {
                colSum += grid[r][c]
            }
            if grid[r][c] > 0 {
                unmarked++
            } else if grid[r][c] < 0 {
                grid[r][c] = 1 // Unmark
            }
        }
        if colSum >= 2 {
            res += unmarked
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countServers(grid: Array<IntArray>): Int {
        var res = 0
        val ROWS = grid.size
        val COLS = grid[0].size

        // Rows
        for (r in 0 until ROWS) {
            val rowSum = grid[r].sum()
            if (rowSum <= 1) continue
            res += rowSum
            for (c in 0 until COLS) {
                if (grid[r][c] == 1) grid[r][c] = -1 // Mark
            }
        }

        // Cols
        for (c in 0 until COLS) {
            var colSum = 0
            var unmarked = 0
            for (r in 0 until ROWS) {
                colSum += kotlin.math.abs(grid[r][c])
                if (grid[r][c] > 0) unmarked++
                else if (grid[r][c] < 0) grid[r][c] = 1 // Unmark
            }
            if (colSum >= 2) res += unmarked
        }

        return res
    }
}
```

```swift
class Solution {
    func countServers(_ grid: [[Int]]) -> Int {
        var grid = grid
        var res = 0
        let ROWS = grid.count, COLS = grid[0].count

        // Rows
        for r in 0..<ROWS {
            let rowSum = grid[r].reduce(0, +)
            if rowSum <= 1 { continue }
            res += rowSum
            for c in 0..<COLS {
                if grid[r][c] == 1 { grid[r][c] = -1 } // Mark
            }
        }

        // Cols
        for c in 0..<COLS {
            var colSum = 0, unmarked = 0
            for r in 0..<ROWS {
                colSum += abs(grid[r][c])
                if grid[r][c] > 0 { unmarked += 1 }
                else if grid[r][c] < 0 { grid[r][c] = 1 } // Unmark
            }
            if colSum >= 2 { res += unmarked }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns of the given matrix $grid$.