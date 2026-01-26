## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Greedy algorithms** - Making locally optimal choices (prioritizing high-value bits) to achieve global optimum
- **Bit manipulation** - Using XOR to flip bits and bit shifting to calculate binary values
- **Binary number representation** - Understanding positional value where leftmost bits contribute more
- **2D array traversal** - Iterating through rows and columns of a matrix

---

## 1. Greedy (Overwriting the Input)

### Intuition

Each row represents a binary number, and higher-order bits contribute more to the total score. The leftmost bit has the highest value, so we want it to be 1 in every row. First, flip any row where the first bit is 0. After that, for each column, we want to maximize the number of 1s. If a column has more 0s than 1s, flip it. This greedy strategy ensures we maximize the score by prioritizing high-value bits.

### Algorithm

1. For each row, if the first element is 0, flip the entire row using XOR.
2. For each column (starting from column 1), count the number of 1s.
   - If 0s outnumber 1s, flip the entire column.
3. Calculate the final score by summing each cell's contribution:
   - A cell at column `c` contributes `value * 2^(COLS - c - 1)` to the total.
4. Return the total `res`.

::tabs-start

```python
class Solution:
    def matrixScore(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])

        for r in range(ROWS):
            if grid[r][0] == 0:
                for c in range(COLS):
                    grid[r][c] ^= 1

        for c in range(COLS):
            one_cnt = sum(grid[r][c] for r in range(ROWS))
            if one_cnt < ROWS - one_cnt:
                for r in range(ROWS):
                    grid[r][c] ^= 1

        res = 0
        for r in range(ROWS):
            for c in range(COLS):
                res += grid[r][c] << (COLS - c - 1)

        return res
```

```java
public class Solution {
    public int matrixScore(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;

        for (int r = 0; r < ROWS; r++) {
            if (grid[r][0] == 0) {
                for (int c = 0; c < COLS; c++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        for (int c = 0; c < COLS; c++) {
            int oneCnt = 0;
            for (int r = 0; r < ROWS; r++) {
                oneCnt += grid[r][c];
            }
            if (oneCnt < ROWS - oneCnt) {
                for (int r = 0; r < ROWS; r++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                res += grid[r][c] << (COLS - c - 1);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int matrixScore(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();

        for (int r = 0; r < ROWS; r++) {
            if (grid[r][0] == 0) {
                for (int c = 0; c < COLS; c++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        for (int c = 0; c < COLS; c++) {
            int oneCnt = 0;
            for (int r = 0; r < ROWS; r++) {
                oneCnt += grid[r][c];
            }
            if (oneCnt < ROWS - oneCnt) {
                for (int r = 0; r < ROWS; r++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                res += grid[r][c] << (COLS - c - 1);
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
    matrixScore(grid) {
        let ROWS = grid.length,
            COLS = grid[0].length;

        for (let r = 0; r < ROWS; r++) {
            if (grid[r][0] === 0) {
                for (let c = 0; c < COLS; c++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        for (let c = 0; c < COLS; c++) {
            let oneCnt = 0;
            for (let r = 0; r < ROWS; r++) {
                oneCnt += grid[r][c];
            }
            if (oneCnt < ROWS - oneCnt) {
                for (let r = 0; r < ROWS; r++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        let res = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                res += grid[r][c] << (COLS - c - 1);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MatrixScore(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;

        for (int r = 0; r < ROWS; r++) {
            if (grid[r][0] == 0) {
                for (int c = 0; c < COLS; c++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        for (int c = 0; c < COLS; c++) {
            int oneCnt = 0;
            for (int r = 0; r < ROWS; r++) {
                oneCnt += grid[r][c];
            }
            if (oneCnt < ROWS - oneCnt) {
                for (int r = 0; r < ROWS; r++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                res += grid[r][c] << (COLS - c - 1);
            }
        }

        return res;
    }
}
```

```go
func matrixScore(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])

    for r := 0; r < ROWS; r++ {
        if grid[r][0] == 0 {
            for c := 0; c < COLS; c++ {
                grid[r][c] ^= 1
            }
        }
    }

    for c := 0; c < COLS; c++ {
        oneCnt := 0
        for r := 0; r < ROWS; r++ {
            oneCnt += grid[r][c]
        }
        if oneCnt < ROWS-oneCnt {
            for r := 0; r < ROWS; r++ {
                grid[r][c] ^= 1
            }
        }
    }

    res := 0
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            res += grid[r][c] << (COLS - c - 1)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun matrixScore(grid: Array<IntArray>): Int {
        val ROWS = grid.size
        val COLS = grid[0].size

        for (r in 0 until ROWS) {
            if (grid[r][0] == 0) {
                for (c in 0 until COLS) {
                    grid[r][c] = grid[r][c] xor 1
                }
            }
        }

        for (c in 0 until COLS) {
            var oneCnt = 0
            for (r in 0 until ROWS) {
                oneCnt += grid[r][c]
            }
            if (oneCnt < ROWS - oneCnt) {
                for (r in 0 until ROWS) {
                    grid[r][c] = grid[r][c] xor 1
                }
            }
        }

        var res = 0
        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                res += grid[r][c] shl (COLS - c - 1)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func matrixScore(_ grid: [[Int]]) -> Int {
        var grid = grid
        let ROWS = grid.count
        let COLS = grid[0].count

        for r in 0..<ROWS {
            if grid[r][0] == 0 {
                for c in 0..<COLS {
                    grid[r][c] ^= 1
                }
            }
        }

        for c in 0..<COLS {
            var oneCnt = 0
            for r in 0..<ROWS {
                oneCnt += grid[r][c]
            }
            if oneCnt < ROWS - oneCnt {
                for r in 0..<ROWS {
                    grid[r][c] ^= 1
                }
            }
        }

        var res = 0
        for r in 0..<ROWS {
            for c in 0..<COLS {
                res += grid[r][c] << (COLS - c - 1)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Greedy (Optimal)

### Intuition

We can compute the score without modifying the grid. After row flips to ensure all first bits are 1, we know every row contributes `2^(COLS - 1)` from the first column. For other columns, instead of tracking the actual values, we count how many cells would be 1 after both row and column optimizations. A cell is effectively 1 if it differs from the first cell in its row (since the first cell becomes 1 after row flip). We then take the maximum of this count and its complement for each column.

### Algorithm

1. Initialize the result with `ROWS * 2^(COLS - 1)` (all first bits are 1).
2. For each column `c` from 1 to `COLS - 1`:
   - Count cells that differ from the first cell in their row.
   - Take the maximum of this `cnt` and `ROWS - cnt` (the better choice after potential column flip).
   - Add `cnt * 2^(COLS - c - 1)` to the result.
3. Return the result.

::tabs-start

```python
class Solution:
    def matrixScore(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        res = ROWS * (1 << (COLS - 1))

        for c in range(1, COLS):
            cnt = 0
            for r in range(ROWS):
                if grid[r][c] != grid[r][0]:
                    cnt += 1

            cnt = max(cnt, ROWS - cnt)
            res += cnt * (1 << (COLS - c - 1))

        return res
```

```java
public class Solution {
    public int matrixScore(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int res = ROWS * (1 << (COLS - 1));

        for (int c = 1; c < COLS; c++) {
            int cnt = 0;
            for (int r = 0; r < ROWS; r++) {
                if (grid[r][c] != grid[r][0]) {
                    cnt++;
                }
            }
            cnt = Math.max(cnt, ROWS - cnt);
            res += cnt * (1 << (COLS - c - 1));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int matrixScore(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        int res = ROWS * (1 << (COLS - 1));

        for (int c = 1; c < COLS; c++) {
            int cnt = 0;
            for (int r = 0; r < ROWS; r++) {
                if (grid[r][c] != grid[r][0]) {
                    cnt++;
                }
            }
            cnt = max(cnt, ROWS - cnt);
            res += cnt * (1 << (COLS - c - 1));
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
    matrixScore(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        let res = ROWS * (1 << (COLS - 1));

        for (let c = 1; c < COLS; c++) {
            let cnt = 0;
            for (let r = 0; r < ROWS; r++) {
                if (grid[r][c] !== grid[r][0]) {
                    cnt++;
                }
            }
            cnt = Math.max(cnt, ROWS - cnt);
            res += cnt * (1 << (COLS - c - 1));
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MatrixScore(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int res = ROWS * (1 << (COLS - 1));

        for (int c = 1; c < COLS; c++) {
            int cnt = 0;
            for (int r = 0; r < ROWS; r++) {
                if (grid[r][c] != grid[r][0]) {
                    cnt++;
                }
            }
            cnt = Math.Max(cnt, ROWS - cnt);
            res += cnt * (1 << (COLS - c - 1));
        }
        return res;
    }
}
```

```go
func matrixScore(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    res := ROWS * (1 << (COLS - 1))

    for c := 1; c < COLS; c++ {
        cnt := 0
        for r := 0; r < ROWS; r++ {
            if grid[r][c] != grid[r][0] {
                cnt++
            }
        }
        if ROWS-cnt > cnt {
            cnt = ROWS - cnt
        }
        res += cnt * (1 << (COLS - c - 1))
    }
    return res
}
```

```kotlin
class Solution {
    fun matrixScore(grid: Array<IntArray>): Int {
        val ROWS = grid.size
        val COLS = grid[0].size
        var res = ROWS * (1 shl (COLS - 1))

        for (c in 1 until COLS) {
            var cnt = 0
            for (r in 0 until ROWS) {
                if (grid[r][c] != grid[r][0]) {
                    cnt++
                }
            }
            cnt = maxOf(cnt, ROWS - cnt)
            res += cnt * (1 shl (COLS - c - 1))
        }
        return res
    }
}
```

```swift
class Solution {
    func matrixScore(_ grid: [[Int]]) -> Int {
        let ROWS = grid.count
        let COLS = grid[0].count
        var res = ROWS * (1 << (COLS - 1))

        for c in 1..<COLS {
            var cnt = 0
            for r in 0..<ROWS {
                if grid[r][c] != grid[r][0] {
                    cnt += 1
                }
            }
            cnt = max(cnt, ROWS - cnt)
            res += cnt * (1 << (COLS - c - 1))
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns.

## Common Pitfalls

### Flipping Columns Before Rows

A critical ordering mistake is flipping columns before ensuring all first bits are 1. Row flips must happen first because they determine which cells need flipping in each row. Flipping columns first may undo progress or lead to suboptimal results since the leftmost bit has the highest value.

### Flipping Columns When 1s Equal 0s

When a column has exactly half 1s and half 0s, flipping it makes no difference to the score. Some solutions incorrectly flip in this case or use `<=` instead of `<` in the comparison. Only flip when 0s strictly outnumber 1s to avoid unnecessary operations.

### Miscalculating Bit Position Values

When computing the final score, using incorrect powers of 2 for each column position causes wrong answers. The leftmost column contributes `2^(COLS-1)`, not `2^0`. Ensure you use `COLS - c - 1` as the exponent for column `c` when calculating each bit's contribution.