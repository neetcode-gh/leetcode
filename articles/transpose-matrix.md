## 1. Iteration - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$ for the output array.

> Where $n$ is the number of rows and $m$ is the number of columns in the matrix.

---

## 2. Iteration - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the number of rows and $m$ is the number of columns in the matrix.
