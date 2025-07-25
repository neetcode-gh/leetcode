## 1. Brute Force

::tabs-start

```python
class NumMatrix:

    def __init__(self, matrix: list[list[int]]):
        self.matrix = matrix

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        res = 0
        for r in range(row1, row2 + 1):
            for c in range(col1, col2 + 1):
                res += self.matrix[r][c]
        return res
```

```java
public class NumMatrix {

    private int[][] matrix;

    public NumMatrix(int[][] matrix) {
        this.matrix = matrix;
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        int res = 0;
        for (int r = row1; r <= row2; r++) {
            for (int c = col1; c <= col2; c++) {
                res += matrix[r][c];
            }
        }
        return res;
    }
}
```

```cpp
class NumMatrix {
private:
    vector<vector<int>> matrix;

public:
    NumMatrix(vector<vector<int>>& matrix) {
        this->matrix = matrix;
    }

    int sumRegion(int row1, int col1, int row2, int col2) {
        int res = 0;
        for (int r = row1; r <= row2; r++) {
            for (int c = col1; c <= col2; c++) {
                res += matrix[r][c];
            }
        }
        return res;
    }
};
```

```javascript
class NumMatrix {
    /**
     * @param {number[][]} matrix
     */
    constructor(matrix) {
        this.matrix = matrix;
    }

    /**
     * @param {number} row1
     * @param {number} col1
     * @param {number} row2
     * @param {number} col2
     * @return {number}
     */
    sumRegion(row1, col1, row2, col2) {
        let res = 0;
        for (let r = row1; r <= row2; r++) {
            for (let c = col1; c <= col2; c++) {
                res += this.matrix[r][c];
            }
        }
        return res;
    }
}
```

```csharp
public class NumMatrix {
    private int[][] matrix;

    public NumMatrix(int[][] matrix) {
        this.matrix = matrix;
    }

    public int SumRegion(int row1, int col1, int row2, int col2) {
        int res = 0;
        for (int r = row1; r <= row2; r++) {
            for (int c = col1; c <= col2; c++) {
                res += matrix[r][c];
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$ for each query.
- Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns in the matrix.

---

## 2. One Dimensional Prefix Sum

::tabs-start

```python
class NumMatrix:

    def __init__(self, matrix: list[list[int]]):
        self.prefixSum = [[0] * len(matrix[0]) for _ in range(len(matrix))]

        for row in range(len(matrix)):
            self.prefixSum[row][0] = matrix[row][0]
            for col in range(1, len(matrix[0])):
                self.prefixSum[row][col] = self.prefixSum[row][col - 1] + matrix[row][col]

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        res = 0
        for row in range(row1, row2 + 1):
            if col1 > 0:
                res += self.prefixSum[row][col2] - self.prefixSum[row][col1 - 1]
            else:
                res += self.prefixSum[row][col2]
        return res
```

```java
public class NumMatrix {

    private int[][] prefixSum;

    public NumMatrix(int[][] matrix) {
        int rows = matrix.length, cols = matrix[0].length;
        prefixSum = new int[rows][cols];

        for (int row = 0; row < rows; row++) {
            prefixSum[row][0] = matrix[row][0];
            for (int col = 1; col < cols; col++) {
                prefixSum[row][col] = prefixSum[row][col - 1] + matrix[row][col];
            }
        }
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        int res = 0;
        for (int row = row1; row <= row2; row++) {
            if (col1 > 0) {
                res += prefixSum[row][col2] - prefixSum[row][col1 - 1];
            } else {
                res += prefixSum[row][col2];
            }
        }
        return res;
    }
}
```

```cpp
class NumMatrix {
private:
    vector<vector<int>> prefixSum;

public:
    NumMatrix(vector<vector<int>>& matrix) {
        int rows = matrix.size(), cols = matrix[0].size();
        prefixSum = vector<vector<int>>(rows, vector<int>(cols, 0));

        for (int row = 0; row < rows; row++) {
            prefixSum[row][0] = matrix[row][0];
            for (int col = 1; col < cols; col++) {
                prefixSum[row][col] = prefixSum[row][col - 1] + matrix[row][col];
            }
        }
    }

    int sumRegion(int row1, int col1, int row2, int col2) {
        int res = 0;
        for (int row = row1; row <= row2; row++) {
            if (col1 > 0) {
                res += prefixSum[row][col2] - prefixSum[row][col1 - 1];
            } else {
                res += prefixSum[row][col2];
            }
        }
        return res;
    }
};
```

```javascript
class NumMatrix {
    /**
     * @param {number[][]} matrix
     */
    constructor(matrix) {
        this.prefixSum = Array.from({ length: matrix.length }, () =>
            Array(matrix[0].length).fill(0),
        );

        for (let row = 0; row < matrix.length; row++) {
            this.prefixSum[row][0] = matrix[row][0];
            for (let col = 1; col < matrix[0].length; col++) {
                this.prefixSum[row][col] =
                    this.prefixSum[row][col - 1] + matrix[row][col];
            }
        }
    }

    /**
     * @param {number} row1
     * @param {number} col1
     * @param {number} row2
     * @param {number} col2
     * @return {number}
     */
    sumRegion(row1, col1, row2, col2) {
        let res = 0;
        for (let row = row1; row <= row2; row++) {
            if (col1 > 0) {
                res +=
                    this.prefixSum[row][col2] - this.prefixSum[row][col1 - 1];
            } else {
                res += this.prefixSum[row][col2];
            }
        }
        return res;
    }
}
```

```csharp
public class NumMatrix {
    private int[][] prefixSum;

    public NumMatrix(int[][] matrix) {
        int rows = matrix.Length;
        int cols = matrix[0].Length;
        prefixSum = new int[rows][];

        for (int i = 0; i < rows; i++) {
            prefixSum[i] = new int[cols];
            prefixSum[i][0] = matrix[i][0];
            for (int j = 1; j < cols; j++) {
                prefixSum[i][j] = prefixSum[i][j - 1] + matrix[i][j];
            }
        }
    }

    public int SumRegion(int row1, int col1, int row2, int col2) {
        int res = 0;
        for (int row = row1; row <= row2; row++) {
            if (col1 > 0) {
                res += prefixSum[row][col2] - prefixSum[row][col1 - 1];
            } else {
                res += prefixSum[row][col2];
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the matrix.

---

## 3. Two Dimensional Prefix Sum

::tabs-start

```python
class NumMatrix:

    def __init__(self, matrix: list[list[int]]):
        ROWS, COLS = len(matrix), len(matrix[0])
        self.sumMat = [[0] * (COLS + 1) for _ in range(ROWS + 1)]

        for r in range(ROWS):
            prefix = 0
            for c in range(COLS):
                prefix += matrix[r][c]
                above = self.sumMat[r][c + 1]
                self.sumMat[r + 1][c + 1] = prefix + above

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        row1, col1, row2, col2 = row1 + 1, col1 + 1, row2 + 1, col2 + 1
        bottomRight = self.sumMat[row2][col2]
        above = self.sumMat[row1 - 1][col2]
        left = self.sumMat[row2][col1 - 1]
        topLeft = self.sumMat[row1 - 1][col1 - 1]
        return bottomRight - above - left + topLeft
```

```java
public class NumMatrix {

    private int[][] sumMat;

    public NumMatrix(int[][] matrix) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        sumMat = new int[ROWS + 1][COLS + 1];

        for (int r = 0; r < ROWS; r++) {
            int prefix = 0;
            for (int c = 0; c < COLS; c++) {
                prefix += matrix[r][c];
                int above = sumMat[r][c + 1];
                sumMat[r + 1][c + 1] = prefix + above;
            }
        }
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        row1++; col1++; row2++; col2++;
        int bottomRight = sumMat[row2][col2];
        int above = sumMat[row1 - 1][col2];
        int left = sumMat[row2][col1 - 1];
        int topLeft = sumMat[row1 - 1][col1 - 1];
        return bottomRight - above - left + topLeft;
    }
}
```

```cpp
class NumMatrix {
private:
    vector<vector<int>> sumMat;

public:
    NumMatrix(vector<vector<int>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        sumMat = vector<vector<int>>(ROWS + 1, vector<int>(COLS + 1, 0));

        for (int r = 0; r < ROWS; r++) {
            int prefix = 0;
            for (int c = 0; c < COLS; c++) {
                prefix += matrix[r][c];
                int above = sumMat[r][c + 1];
                sumMat[r + 1][c + 1] = prefix + above;
            }
        }
    }

    int sumRegion(int row1, int col1, int row2, int col2) {
        row1++; col1++; row2++; col2++;
        int bottomRight = sumMat[row2][col2];
        int above = sumMat[row1 - 1][col2];
        int left = sumMat[row2][col1 - 1];
        int topLeft = sumMat[row1 - 1][col1 - 1];
        return bottomRight - above - left + topLeft;
    }
};
```

```javascript
class NumMatrix {
    /**
     * @param {number[][]} matrix
     */
    constructor(matrix) {
        const ROWS = matrix.length,
            COLS = matrix[0].length;
        this.sumMat = Array.from({ length: ROWS + 1 }, () =>
            Array(COLS + 1).fill(0),
        );

        for (let r = 0; r < ROWS; r++) {
            let prefix = 0;
            for (let c = 0; c < COLS; c++) {
                prefix += matrix[r][c];
                const above = this.sumMat[r][c + 1];
                this.sumMat[r + 1][c + 1] = prefix + above;
            }
        }
    }

    /**
     * @param {number} row1
     * @param {number} col1
     * @param {number} row2
     * @param {number} col2
     * @return {number}
     */
    sumRegion(row1, col1, row2, col2) {
        row1++;
        col1++;
        row2++;
        col2++;
        const bottomRight = this.sumMat[row2][col2];
        const above = this.sumMat[row1 - 1][col2];
        const left = this.sumMat[row2][col1 - 1];
        const topLeft = this.sumMat[row1 - 1][col1 - 1];
        return bottomRight - above - left + topLeft;
    }
}
```

```csharp
public class NumMatrix {
    private int[,] sumMat;

    public NumMatrix(int[][] matrix) {
        int ROWS = matrix.Length;
        int COLS = matrix[0].Length;
        sumMat = new int[ROWS + 1, COLS + 1];

        for (int r = 0; r < ROWS; r++) {
            int prefix = 0;
            for (int c = 0; c < COLS; c++) {
                prefix += matrix[r][c];
                int above = sumMat[r, c + 1];
                sumMat[r + 1, c + 1] = prefix + above;
            }
        }
    }

    public int SumRegion(int row1, int col1, int row2, int col2) {
        row1++; col1++; row2++; col2++;
        int bottomRight = sumMat[row2, col2];
        int above = sumMat[row1 - 1, col2];
        int left = sumMat[row2, col1 - 1];
        int topLeft = sumMat[row1 - 1, col1 - 1];
        return bottomRight - above - left + topLeft;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ for each query.
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the matrix.
