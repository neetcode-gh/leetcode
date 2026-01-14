## 1. Brute Force

### Intuition

We need to modify the matrix so that if any cell is `0`, then its **entire row and entire column** become `0`.

The main challenge is that if we change cells to `0` while scanning, those newly created zeros could incorrectly force more rows/columns to be zeroed.

To avoid this, the brute force approach uses a **separate copy** of the matrix:
- we read zeros from the original matrix
- we write the row/column changes into the copy
- at the end, we copy the final values back

This keeps the logic simple and prevents accidental cascading updates.

### Algorithm

1. Let `ROWS` and `COLS` be the matrix dimensions.
2. Create a copy matrix `mark` with the same values as the original matrix.
3. Traverse every cell `(r, c)` in the original matrix:
   - If `matrix[r][c] == 0`:
     - set all cells in row `r` of `mark` to `0`
     - set all cells in column `c` of `mark` to `0`
4. After processing all zeros, copy every value from `mark` back into `matrix`.
5. The original `matrix` is now updated correctly.

::tabs-start

```python
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        ROWS, COLS = len(matrix), len(matrix[0])
        mark = [[matrix[r][c] for c in range(COLS)] for r in range(ROWS)]

        for r in range(ROWS):
            for c in range(COLS):
                if matrix[r][c] == 0:
                    for col in range(COLS):
                        mark[r][col] = 0
                    for row in range(ROWS):
                        mark[row][c] = 0

        for r in range(ROWS):
            for c in range(COLS):
                matrix[r][c] = mark[r][c]
```

```java
public class Solution {
    public void setZeroes(int[][] matrix) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        int[][] mark = new int[ROWS][COLS];

        for (int r = 0; r < ROWS; r++) {
            System.arraycopy(matrix[r], 0, mark[r], 0, COLS);
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (matrix[r][c] == 0) {
                    for (int col = 0; col < COLS; col++) {
                        mark[r][col] = 0;
                    }
                    for (int row = 0; row < ROWS; row++) {
                        mark[row][c] = 0;
                    }
                }
            }
        }

        for (int r = 0; r < ROWS; r++) {
            System.arraycopy(mark[r], 0, matrix[r], 0, COLS);
        }
    }
}
```

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        vector<vector<int>> mark = matrix;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (matrix[r][c] == 0) {
                    for (int col = 0; col < COLS; col++) {
                        mark[r][col] = 0;
                    }
                    for (int row = 0; row < ROWS; row++) {
                        mark[row][c] = 0;
                    }
                }
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                matrix[r][c] = mark[r][c];
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {void}
     */
    setZeroes(matrix) {
        const ROWS = matrix.length,
            COLS = matrix[0].length;
        const mark = matrix.map((row) => [...row]);

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (matrix[r][c] === 0) {
                    for (let col = 0; col < COLS; col++) {
                        mark[r][col] = 0;
                    }
                    for (let row = 0; row < ROWS; row++) {
                        mark[row][c] = 0;
                    }
                }
            }
        }

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                matrix[r][c] = mark[r][c];
            }
        }
    }
}
```

```csharp
public class Solution {
    public void SetZeroes(int[][] matrix) {
        int ROWS = matrix.Length, COLS = matrix[0].Length;
        int[][] mark = new int[ROWS][];
        for (int r = 0; r < ROWS; r++) {
            mark[r] = (int[]) matrix[r].Clone();
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (matrix[r][c] == 0) {
                    for (int col = 0; col < COLS; col++) {
                        mark[r][col] = 0;
                    }
                    for (int row = 0; row < ROWS; row++) {
                        mark[row][c] = 0;
                    }
                }
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                matrix[r][c] = mark[r][c];
            }
        }
    }
}
```

```go
func setZeroes(matrix [][]int) {
    ROWS, COLS := len(matrix), len(matrix[0])
    mark := make([][]int, ROWS)
    for i := 0; i < ROWS; i++ {
        mark[i] = make([]int, COLS)
        copy(mark[i], matrix[i])
    }

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if matrix[r][c] == 0 {
                for col := 0; col < COLS; col++ {
                    mark[r][col] = 0
                }
                for row := 0; row < ROWS; row++ {
                    mark[row][c] = 0
                }
            }
        }
    }

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            matrix[r][c] = mark[r][c]
        }
    }
}
```

```kotlin
class Solution {
    fun setZeroes(matrix: Array<IntArray>) {
        val ROWS = matrix.size
        val COLS = matrix[0].size
        val mark = Array(ROWS) { IntArray(COLS) }

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                mark[r][c] = matrix[r][c]
            }
        }

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (matrix[r][c] == 0) {
                    for (col in 0 until COLS) {
                        mark[r][col] = 0
                    }
                    for (row in 0 until ROWS) {
                        mark[row][c] = 0
                    }
                }
            }
        }

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                matrix[r][c] = mark[r][c]
            }
        }
    }
}
```

```swift
class Solution {
    func setZeroes(_ matrix: inout [[Int]]) {
        let rows = matrix.count
        let cols = matrix[0].count
        var mark = matrix

        for r in 0..<rows {
            for c in 0..<cols {
                if matrix[r][c] == 0 {
                    for col in 0..<cols {
                        mark[r][col] = 0
                    }
                    for row in 0..<rows {
                        mark[row][c] = 0
                    }
                }
            }
        }

        for r in 0..<rows {
            for c in 0..<cols {
                matrix[r][c] = mark[r][c]
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((m * n) * (m + n))$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Iteration

### Intuition

We need to update the matrix so that if a cell is `0`, then **its entire row and entire column** are set to `0`.

The key challenge is to avoid modifying the matrix **too early**.
If we directly set rows and columns to `0` while scanning, newly created zeros could incorrectly trigger more rows and columns to be zeroed.

To handle this safely, we split the process into **two passes**:
1. First pass: **record** which rows and columns need to be zeroed using `rows` and `cols` flags
2. Second pass: **apply** the zeroing based on that record

We use two helper arrays:
- `rows[r]` → whether row `r` should be zeroed
- `cols[c]` → whether column `c` should be zeroed

This keeps the logic clean and easy to reason about.

### Algorithm

1. Let `ROWS` and `COLS` be the dimensions of the matrix.
2. Create two boolean arrays:
   - `rows` of size `ROWS`, initialized to `false`
   - `cols` of size `COLS`, initialized to `false`
3. Traverse the matrix:
   - If `matrix[r][c] == 0`:
     - mark `rows[r] = true`
     - mark `cols[c] = true`
4. Traverse the matrix again:
   - If `rows[r]` is `true` **or** `cols[c]` is `true`:
     - set `matrix[r][c] = 0`
5. The matrix is now correctly updated.

::tabs-start

```python
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        ROWS, COLS = len(matrix), len(matrix[0])
        rows, cols = [False] * ROWS, [False] * COLS

        for r in range(ROWS):
            for c in range(COLS):
                if matrix[r][c] == 0:
                    rows[r] = True
                    cols[c] = True

        for r in range(ROWS):
            for c in range(COLS):
                if rows[r] or cols[c]:
                    matrix[r][c] = 0
```

```java
public class Solution {
    public void setZeroes(int[][] matrix) {
        int rows = matrix.length, cols = matrix[0].length;
        boolean[] rowZero = new boolean[rows];
        boolean[] colZero = new boolean[cols];

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (matrix[r][c] == 0) {
                    rowZero[r] = true;
                    colZero[c] = true;
                }
            }
        }

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (rowZero[r] || colZero[c]) {
                    matrix[r][c] = 0;
                }
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int rows = matrix.size(), cols = matrix[0].size();
        vector<bool> rowZero(rows, false);
        vector<bool> colZero(cols, false);

        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                if (matrix[r][c] == 0) {
                    rowZero[r] = true;
                    colZero[c] = true;
                }
            }
        }

        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                if (rowZero[r] || colZero[c]) {
                    matrix[r][c] = 0;
                }
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {void}
     */
    setZeroes(matrix) {
        const rows = matrix.length,
            cols = matrix[0].length;
        const rowZero = Array(rows).fill(false);
        const colZero = Array(cols).fill(false);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (matrix[r][c] === 0) {
                    rowZero[r] = true;
                    colZero[c] = true;
                }
            }
        }

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (rowZero[r] || colZero[c]) {
                    matrix[r][c] = 0;
                }
            }
        }
    }
}
```

```csharp
public class Solution {
    public void SetZeroes(int[][] matrix) {
        int rows = matrix.Length, cols = matrix[0].Length;
        bool[] rowZero = new bool[rows];
        bool[] colZero = new bool[cols];

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (matrix[r][c] == 0) {
                    rowZero[r] = true;
                    colZero[c] = true;
                }
            }
        }

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (rowZero[r] || colZero[c]) {
                    matrix[r][c] = 0;
                }
            }
        }
    }
}
```

```go
func setZeroes(matrix [][]int) {
    ROWS, COLS := len(matrix), len(matrix[0])
    rows := make([]bool, ROWS)
    cols := make([]bool, COLS)

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if matrix[r][c] == 0 {
                rows[r] = true
                cols[c] = true
            }
        }
    }

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if rows[r] || cols[c] {
                matrix[r][c] = 0
            }
        }
    }
}
```

```kotlin
class Solution {
    fun setZeroes(matrix: Array<IntArray>) {
        val ROWS = matrix.size
        val COLS = matrix[0].size
        val rows = BooleanArray(ROWS)
        val cols = BooleanArray(COLS)

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (matrix[r][c] == 0) {
                    rows[r] = true
                    cols[c] = true
                }
            }
        }

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (rows[r] || cols[c]) {
                    matrix[r][c] = 0
                }
            }
        }
    }
}
```

```swift
class Solution {
    func setZeroes(_ matrix: inout [[Int]]) {
        let rows = matrix.count
        let cols = matrix[0].count
        var rowFlags = Array(repeating: false, count: rows)
        var colFlags = Array(repeating: false, count: cols)

        for r in 0..<rows {
            for c in 0..<cols {
                if matrix[r][c] == 0 {
                    rowFlags[r] = true
                    colFlags[c] = true
                }
            }
        }

        for r in 0..<rows {
            for c in 0..<cols {
                if rowFlags[r] || colFlags[c] {
                    matrix[r][c] = 0
                }
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m + n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 3. Iteration (Space Optimized)

### Intuition

We need to set an entire row and column to `0` if any cell in that row or column is `0`.

The common two-array solution uses extra space to remember which rows/columns should be zeroed.
To optimize space, we can reuse the matrix itself as the "marker storage":

- Use the **first row** to mark which columns should become zero
- Use the **first column** to mark which rows should become zero

One complication:
- `matrix[0][0]` sits at the intersection of the first row and first column, so it can't independently represent both.
- Also, we must separately track whether the **first row** originally contained a zero.

That's why we keep a boolean `rowZero`:
- `rowZero = true` means the first row must be zeroed at the end.

### Algorithm

1. Initialize `rowZero = false`.
2. First pass (mark rows and columns):
   - Traverse every cell `(r, c)`:
     - If `matrix[r][c] == 0`:
       - mark the column by setting `matrix[0][c] = 0`
       - if `r > 0`, mark the row by setting `matrix[r][0] = 0`
       - if `r == 0`, set `rowZero = true` (first row needs to be zeroed)
3. Second pass (apply markers to the inner matrix):
   - For `r` from `1` to `ROWS - 1`:
     - For `c` from `1` to `COLS - 1`:
       - If `matrix[0][c] == 0` or `matrix[r][0] == 0`, set `matrix[r][c] = 0`
4. Handle the first column:
   - If `matrix[0][0] == 0`, zero out the entire first column
5. Handle the first row:
   - If `rowZero` is `true`, zero out the entire first row

::tabs-start

```python
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        ROWS, COLS = len(matrix), len(matrix[0])
        rowZero = False

        for r in range(ROWS):
            for c in range(COLS):
                if matrix[r][c] == 0:
                    matrix[0][c] = 0
                    if r > 0:
                        matrix[r][0] = 0
                    else:
                        rowZero = True

        for r in range(1, ROWS):
            for c in range(1, COLS):
                if matrix[0][c] == 0 or matrix[r][0] == 0:
                    matrix[r][c] = 0

        if matrix[0][0] == 0:
            for r in range(ROWS):
                matrix[r][0] = 0

        if rowZero:
            for c in range(COLS):
                matrix[0][c] = 0
```

```java
public class Solution {
    public void setZeroes(int[][] matrix) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        boolean rowZero = false;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (matrix[r][c] == 0) {
                    matrix[0][c] = 0;
                    if (r > 0) {
                        matrix[r][0] = 0;
                    } else {
                        rowZero = true;
                    }
                }
            }
        }

        for (int r = 1; r < ROWS; r++) {
            for (int c = 1; c < COLS; c++) {
                if (matrix[0][c] == 0 || matrix[r][0] == 0) {
                    matrix[r][c] = 0;
                }
            }
        }

        if (matrix[0][0] == 0) {
            for (int r = 0; r < ROWS; r++) {
                matrix[r][0] = 0;
            }
        }

        if (rowZero) {
            for (int c = 0; c < COLS; c++) {
                matrix[0][c] = 0;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        bool rowZero = false;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (matrix[r][c] == 0) {
                    matrix[0][c] = 0;
                    if (r > 0) {
                        matrix[r][0] = 0;
                    } else {
                        rowZero = true;
                    }
                }
            }
        }

        for (int r = 1; r < ROWS; r++) {
            for (int c = 1; c < COLS; c++) {
                if (matrix[0][c] == 0 || matrix[r][0] == 0) {
                    matrix[r][c] = 0;
                }
            }
        }

        if (matrix[0][0] == 0) {
            for (int r = 0; r < ROWS; r++) {
                matrix[r][0] = 0;
            }
        }

        if (rowZero) {
            for (int c = 0; c < COLS; c++) {
                matrix[0][c] = 0;
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {void}
     */
    setZeroes(matrix) {
        const ROWS = matrix.length;
        const COLS = matrix[0].length;
        let rowZero = false;

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (matrix[r][c] == 0) {
                    matrix[0][c] = 0;
                    if (r > 0) {
                        matrix[r][0] = 0;
                    } else {
                        rowZero = true;
                    }
                }
            }
        }

        for (let r = 1; r < ROWS; r++) {
            for (let c = 1; c < COLS; c++) {
                if (matrix[0][c] == 0 || matrix[r][0] == 0) {
                    matrix[r][c] = 0;
                }
            }
        }

        if (matrix[0][0] == 0) {
            for (let r = 0; r < ROWS; r++) {
                matrix[r][0] = 0;
            }
        }

        if (rowZero) {
            for (let c = 0; c < COLS; c++) {
                matrix[0][c] = 0;
            }
        }
    }
}
```

```csharp
public class Solution {
    public void SetZeroes(int[][] matrix) {
        int ROWS = matrix.Length, COLS = matrix[0].Length;
        bool rowZero = false;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (matrix[r][c] == 0) {
                    matrix[0][c] = 0;
                    if (r > 0) {
                        matrix[r][0] = 0;
                    } else {
                        rowZero = true;
                    }
                }
            }
        }

        for (int r = 1; r < ROWS; r++) {
            for (int c = 1; c < COLS; c++) {
                if (matrix[0][c] == 0 || matrix[r][0] == 0) {
                    matrix[r][c] = 0;
                }
            }
        }

        if (matrix[0][0] == 0) {
            for (int r = 0; r < ROWS; r++) {
                matrix[r][0] = 0;
            }
        }

        if (rowZero) {
            for (int c = 0; c < COLS; c++) {
                matrix[0][c] = 0;
            }
        }
    }
}
```

```go
func setZeroes(matrix [][]int) {
    ROWS, COLS := len(matrix), len(matrix[0])
    rowZero := false

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if matrix[r][c] == 0 {
                matrix[0][c] = 0
                if r > 0 {
                    matrix[r][0] = 0
                } else {
                    rowZero = true
                }
            }
        }
    }

    for r := 1; r < ROWS; r++ {
        for c := 1; c < COLS; c++ {
            if matrix[0][c] == 0 || matrix[r][0] == 0 {
                matrix[r][c] = 0
            }
        }
    }

    if matrix[0][0] == 0 {
        for r := 0; r < ROWS; r++ {
            matrix[r][0] = 0
        }
    }

    if rowZero {
        for c := 0; c < COLS; c++ {
            matrix[0][c] = 0
        }
    }
}
```

```kotlin
class Solution {
    fun setZeroes(matrix: Array<IntArray>) {
        val ROWS = matrix.size
        val COLS = matrix[0].size
        var rowZero = false

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (matrix[r][c] == 0) {
                    matrix[0][c] = 0
                    if (r > 0) {
                        matrix[r][0] = 0
                    } else {
                        rowZero = true
                    }
                }
            }
        }

        for (r in 1 until ROWS) {
            for (c in 1 until COLS) {
                if (matrix[0][c] == 0 || matrix[r][0] == 0) {
                    matrix[r][c] = 0
                }
            }
        }

        if (matrix[0][0] == 0) {
            for (r in 0 until ROWS) {
                matrix[r][0] = 0
            }
        }

        if (rowZero) {
            for (c in 0 until COLS) {
                matrix[0][c] = 0
            }
        }
    }
}
```

```swift
class Solution {
    func setZeroes(_ matrix: inout [[Int]]) {
        let ROWS = matrix.count
        let COLS = matrix[0].count
        var rowZero = false

        for r in 0..<ROWS {
            for c in 0..<COLS {
                if matrix[r][c] == 0 {
                    matrix[0][c] = 0
                    if r > 0 {
                        matrix[r][0] = 0
                    } else {
                        rowZero = true
                    }
                }
            }
        }

        for r in 1..<ROWS {
            for c in 1..<COLS {
                if matrix[0][c] == 0 || matrix[r][0] == 0 {
                    matrix[r][c] = 0
                }
            }
        }

        if matrix[0][0] == 0 {
            for r in 0..<ROWS {
                matrix[r][0] = 0
            }
        }

        if rowZero {
            for c in 0..<COLS {
                matrix[0][c] = 0
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## Common Pitfalls

### Modifying the Matrix While Scanning

Setting cells to zero while still scanning causes cascading updates where newly created zeros trigger more rows and columns to be zeroed. This produces incorrect results because the algorithm cannot distinguish between original zeros and zeros created during processing.

### Forgetting to Track the First Row Separately

In the space-optimized approach, `matrix[0][0]` serves double duty for marking both the first row and first column. Using a single variable to track both leads to incorrect results. A separate boolean is needed to track whether the first row originally contained a zero.

### Incorrect Order of Final Updates

When using the first row and column as markers, the order of applying updates matters. If you zero the first row or column too early, you lose the marker information needed to process the rest of the matrix. Always update the inner cells first, then handle the first row and column last.
