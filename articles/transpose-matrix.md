## 1. Iteration - I

### Intuition

Transposing a matrix means flipping it over its main diagonal, turning rows into columns and columns into rows. The element at position `(r, c)` in the original matrix moves to position `(c, r)` in the transposed matrix.

Since the dimensions may change (an `m x n` matrix becomes `n x m`), we need to create a new result matrix with swapped dimensions. Then we simply copy each element to its new position.

### Algorithm

1. Get the number of rows and columns in the original matrix.
2. Create a result matrix with dimensions `COLS x ROWS`.
3. Iterate through each element at position `(r, c)` in the original matrix.
4. Place the element at position `(c, r)` in the `res` matrix.
5. Return the `res` matrix.

::tabs-start

```python
class Solution:
    def transpose(self, matrix: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(matrix), len(matrix[0])
        res = [[0] * ROWS for _ in range(COLS)]

        for r in range(ROWS):
            for c in range(COLS):
                res[c][r] = matrix[r][c]

        return res
```

```java
public class Solution {
    public int[][] transpose(int[][] matrix) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        int[][] res = new int[COLS][ROWS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                res[c][r] = matrix[r][c];
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> transpose(vector<vector<int>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        vector<vector<int>> res(COLS, vector<int>(ROWS));

        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                res[c][r] = matrix[r][c];
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number[][]}
     */
    transpose(matrix) {
        const ROWS = matrix.length,
            COLS = matrix[0].length;
        const res = Array.from({ length: COLS }, () => Array(ROWS).fill(0));

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                res[c][r] = matrix[r][c];
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] Transpose(int[][] matrix) {
        int ROWS = matrix.Length;
        int COLS = matrix[0].Length;
        int[][] res = new int[COLS][];

        for (int i = 0; i < COLS; i++) {
            res[i] = new int[ROWS];
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                res[c][r] = matrix[r][c];
            }
        }

        return res;
    }
}
```

```go
func transpose(matrix [][]int) [][]int {
    ROWS, COLS := len(matrix), len(matrix[0])
    res := make([][]int, COLS)
    for i := range res {
        res[i] = make([]int, ROWS)
    }

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            res[c][r] = matrix[r][c]
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun transpose(matrix: Array<IntArray>): Array<IntArray> {
        val ROWS = matrix.size
        val COLS = matrix[0].size
        val res = Array(COLS) { IntArray(ROWS) }

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                res[c][r] = matrix[r][c]
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func transpose(_ matrix: [[Int]]) -> [[Int]] {
        let ROWS = matrix.count
        let COLS = matrix[0].count
        var res = [[Int]](repeating: [Int](repeating: 0, count: ROWS), count: COLS)

        for r in 0..<ROWS {
            for c in 0..<COLS {
                res[c][r] = matrix[r][c]
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$ for the output array.

> Where $n$ is the number of rows and $m$ is the number of columns in the matrix.

---

## 2. Iteration - II

### Intuition

For square matrices, we can transpose in-place by swapping elements across the main diagonal. We only need to process elements above (or below) the diagonal to avoid swapping twice.

However, for non-square matrices, in-place transposition is not possible since the dimensions change. In this case, we fall back to creating a new matrix. This approach optimizes memory usage when the input is square.

### Algorithm

1. Check if the matrix is square (`ROWS == COLS`).
2. If square, iterate through elements above the diagonal where `c < r`.
3. Swap each element `matrix[r][c]` with `matrix[c][r]`.
4. Return the modified matrix.
5. If not square, create a new `res` matrix with swapped dimensions.
6. Copy elements from `(r, c)` to `(c, r)` and return the `res` matrix.

::tabs-start

```python
class Solution:
    def transpose(self, matrix: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(matrix), len(matrix[0])

        if ROWS == COLS:
            for r in range(ROWS):
                for c in range(r):
                    matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]

            return matrix

        res = [[0] * ROWS for _ in range(COLS)]

        for r in range(ROWS):
            for c in range(COLS):
                res[c][r] = matrix[r][c]

        return res
```

```java
public class Solution {
    public int[][] transpose(int[][] matrix) {
        int ROWS = matrix.length, COLS = matrix[0].length;

        if (ROWS == COLS) {
            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < r; c++) {
                    int tmp = matrix[r][c];
                    matrix[r][c] = matrix[c][r];
                    matrix[c][r] = tmp;
                }
            }

            return matrix;
        }

        int[][] res = new int[COLS][ROWS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                res[c][r] = matrix[r][c];
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> transpose(vector<vector<int>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size();

        if (ROWS == COLS) {
            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < r; c++) {
                    swap(matrix[r][c], matrix[c][r]);
                }
            }

            return matrix;
        }

        vector<vector<int>> res(COLS, vector<int>(ROWS));

        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                res[c][r] = matrix[r][c];
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number[][]}
     */
    transpose(matrix) {
        const ROWS = matrix.length,
            COLS = matrix[0].length;

        if (ROWS === COLS) {
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < r; c++) {
                    [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
                }
            }

            return matrix;
        }

        const res = Array.from({ length: COLS }, () => Array(ROWS).fill(0));

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                res[c][r] = matrix[r][c];
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] Transpose(int[][] matrix) {
        int ROWS = matrix.Length;
        int COLS = matrix[0].Length;

        if (ROWS == COLS) {
            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < r; c++) {
                    int temp = matrix[r][c];
                    matrix[r][c] = matrix[c][r];
                    matrix[c][r] = temp;
                }
            }
            return matrix;
        }

        int[][] res = new int[COLS][];
        for (int i = 0; i < COLS; i++) {
            res[i] = new int[ROWS];
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                res[c][r] = matrix[r][c];
            }
        }

        return res;
    }
}
```

```go
func transpose(matrix [][]int) [][]int {
    ROWS, COLS := len(matrix), len(matrix[0])

    if ROWS == COLS {
        for r := 0; r < ROWS; r++ {
            for c := 0; c < r; c++ {
                matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
            }
        }
        return matrix
    }

    res := make([][]int, COLS)
    for i := range res {
        res[i] = make([]int, ROWS)
    }

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            res[c][r] = matrix[r][c]
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun transpose(matrix: Array<IntArray>): Array<IntArray> {
        val ROWS = matrix.size
        val COLS = matrix[0].size

        if (ROWS == COLS) {
            for (r in 0 until ROWS) {
                for (c in 0 until r) {
                    val temp = matrix[r][c]
                    matrix[r][c] = matrix[c][r]
                    matrix[c][r] = temp
                }
            }
            return matrix
        }

        val res = Array(COLS) { IntArray(ROWS) }

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                res[c][r] = matrix[r][c]
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func transpose(_ matrix: [[Int]]) -> [[Int]] {
        let ROWS = matrix.count
        let COLS = matrix[0].count
        var matrix = matrix

        if ROWS == COLS {
            for r in 0..<ROWS {
                for c in 0..<r {
                    let temp = matrix[r][c]
                    matrix[r][c] = matrix[c][r]
                    matrix[c][r] = temp
                }
            }
            return matrix
        }

        var res = [[Int]](repeating: [Int](repeating: 0, count: ROWS), count: COLS)

        for r in 0..<ROWS {
            for c in 0..<COLS {
                res[c][r] = matrix[r][c]
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the number of rows and $m$ is the number of columns in the matrix.

---

## Common Pitfalls

### Swapping Dimensions Incorrectly

When creating the result matrix, you must swap the dimensions. The original matrix has dimensions `ROWS x COLS`, but the transposed matrix must have dimensions `COLS x ROWS`. A common mistake is creating a matrix with the same dimensions as the original, which leads to index out of bounds errors or incorrect results.

### Confusing Transpose with In-Place Swap for Non-Square Matrices

For square matrices, you can transpose in-place by swapping elements across the diagonal. However, for non-square matrices, in-place transposition is not possible because the dimensions change. Attempting to apply the in-place swap technique to a rectangular matrix will result in incorrect output or runtime errors.
