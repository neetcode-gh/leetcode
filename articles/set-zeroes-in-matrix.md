## 1. Brute Force

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
        const ROWS = matrix.length, COLS = matrix[0].length;
        const mark = matrix.map(row => [...row]);

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Iteration

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
        const rows = matrix.length, cols = matrix[0].length;
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m + n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 3. Iteration (Space Optimized)

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns.