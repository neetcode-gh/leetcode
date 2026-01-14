## 1. Naive Iteration

### Intuition

Standard matrix multiplication computes each element of the result by taking the dot product of a row from the first matrix and a column from the second. For sparse matrices (matrices with many zeros), we can skip computations involving zero elements since they contribute nothing to the result. By checking if an element in mat1 is non-zero before processing, we avoid unnecessary multiplications.

### Algorithm

1. Create a result matrix of size `m x n` initialized with zeros.
2. Iterate through each row of `mat1`.
3. For each element in the row, check if it is non-zero.
4. If non-zero, multiply it with each element in the corresponding row of `mat2` and add to the appropriate position in the result.
5. Return the result matrix.

::tabs-start

```python
class Solution:
    def multiply(self, mat1: List[List[int]], mat2: List[List[int]]) -> List[List[int]]:
        
        # Product matrix.
        ans = [[0] * len(mat2[0]) for _ in range(len(mat1))]
        
        for row_index, row_elements in enumerate(mat1):
            for element_index, row_element in enumerate(row_elements):
                # If current element of mat1 is non-zero then iterate over all columns of mat2.
                if row_element:
                    for col_index, col_element in enumerate(mat2[element_index]):
                        ans[row_index][col_index] += row_element * col_element
        
        return ans
```

```java
class Solution {
    public int[][] multiply(int[][] mat1, int[][] mat2) {
        int n = mat1.length;
        int k = mat1[0].length;
        int m = mat2[0].length;
        
        // Product matrix will have 'n x m' size.
        int[][] ans = new int[n][m];
        
        for (int rowIndex = 0; rowIndex < n; ++rowIndex) {
            for (int elementIndex = 0; elementIndex < k; ++elementIndex) {
                // If current element of mat1 is non-zero then iterate over all columns of mat2.
                if (mat1[rowIndex][elementIndex] != 0)  {
                    for (int colIndex = 0; colIndex < m; ++colIndex) {
                        ans[rowIndex][colIndex] += mat1[rowIndex][elementIndex] * mat2[elementIndex][colIndex];
                    }
                }
            }
        }
        
        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> multiply(vector<vector<int>>& mat1, vector<vector<int>>& mat2) {
        int n = mat1.size();
        int k = mat1[0].size();
        int m = mat2[0].size();
        
        // Product matrix will have 'n x m' size.
        vector<vector<int>> ans (n, vector<int>(m, 0));
        
        for (int rowIndex = 0; rowIndex < n; ++rowIndex) {
            for (int elementIndex = 0; elementIndex < k; ++elementIndex) {
                // If current element of mat1 is non-zero then iterate over all columns of mat2.
                if (mat1[rowIndex][elementIndex] != 0)  {
                    for (int colIndex = 0; colIndex < m; ++colIndex) {
                        ans[rowIndex][colIndex] += mat1[rowIndex][elementIndex] * mat2[elementIndex][colIndex];
                    }
                }
            }
        }
        
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} mat1
     * @param {number[][]} mat2
     * @return {number[][]}
     */
    multiply(mat1, mat2) {
        // Product matrix.
        let ans = Array(mat1.length).fill(0).map(x => Array(mat2[0].length).fill(0))

        mat1.forEach((rowElements, rowIndex) => {
            rowElements.forEach((rowElement, elementIndex) => {
                // If current element of mat1 is non-zero then iterate over all columns of mat2.
                if (rowElement) {
                    mat2[elementIndex].forEach((colElement, colIndex) => {
                        ans[rowIndex][colIndex] += rowElement * colElement;
                    });
                }
            });
        });

        return ans
    }
}
```

```csharp
public class Solution {
    public int[][] Multiply(int[][] mat1, int[][] mat2) {
        int n = mat1.Length;
        int k = mat1[0].Length;
        int m = mat2[0].Length;

        // Product matrix will have 'n x m' size.
        int[][] ans = new int[n][];
        for (int i = 0; i < n; i++) {
            ans[i] = new int[m];
        }

        for (int rowIndex = 0; rowIndex < n; rowIndex++) {
            for (int elementIndex = 0; elementIndex < k; elementIndex++) {
                // If current element of mat1 is non-zero then iterate over all columns of mat2.
                if (mat1[rowIndex][elementIndex] != 0) {
                    for (int colIndex = 0; colIndex < m; colIndex++) {
                        ans[rowIndex][colIndex] += mat1[rowIndex][elementIndex] * mat2[elementIndex][colIndex];
                    }
                }
            }
        }

        return ans;
    }
}
```

```go
func multiply(mat1 [][]int, mat2 [][]int) [][]int {
    n := len(mat1)
    k := len(mat1[0])
    m := len(mat2[0])

    // Product matrix will have 'n x m' size.
    ans := make([][]int, n)
    for i := range ans {
        ans[i] = make([]int, m)
    }

    for rowIndex := 0; rowIndex < n; rowIndex++ {
        for elementIndex := 0; elementIndex < k; elementIndex++ {
            // If current element of mat1 is non-zero then iterate over all columns of mat2.
            if mat1[rowIndex][elementIndex] != 0 {
                for colIndex := 0; colIndex < m; colIndex++ {
                    ans[rowIndex][colIndex] += mat1[rowIndex][elementIndex] * mat2[elementIndex][colIndex]
                }
            }
        }
    }

    return ans
}
```

```kotlin
class Solution {
    fun multiply(mat1: Array<IntArray>, mat2: Array<IntArray>): Array<IntArray> {
        val n = mat1.size
        val k = mat1[0].size
        val m = mat2[0].size

        // Product matrix will have 'n x m' size.
        val ans = Array(n) { IntArray(m) }

        for (rowIndex in 0 until n) {
            for (elementIndex in 0 until k) {
                // If current element of mat1 is non-zero then iterate over all columns of mat2.
                if (mat1[rowIndex][elementIndex] != 0) {
                    for (colIndex in 0 until m) {
                        ans[rowIndex][colIndex] += mat1[rowIndex][elementIndex] * mat2[elementIndex][colIndex]
                    }
                }
            }
        }

        return ans
    }
}
```

```swift
class Solution {
    func multiply(_ mat1: [[Int]], _ mat2: [[Int]]) -> [[Int]] {
        let n = mat1.count
        let k = mat1[0].count
        let m = mat2[0].count

        // Product matrix will have 'n x m' size.
        var ans = [[Int]](repeating: [Int](repeating: 0, count: m), count: n)

        for rowIndex in 0..<n {
            for elementIndex in 0..<k {
                // If current element of mat1 is non-zero then iterate over all columns of mat2.
                if mat1[rowIndex][elementIndex] != 0 {
                    for colIndex in 0..<m {
                        ans[rowIndex][colIndex] += mat1[rowIndex][elementIndex] * mat2[elementIndex][colIndex]
                    }
                }
            }
        }

        return ans
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot k \cdot n)$
- Space complexity: $O(1)$

>  Where $m$ and $k$ represent the number of rows and columns in `mat1`, respectively and $k$ and $n$ represent the number of rows and columns in `mat2`, respectively.

---

## 2. List of Lists

### Intuition

To further optimize sparse matrix multiplication, we can preprocess both matrices to store only their non-zero elements. For each row, we keep a list of (value, column) pairs representing non-zero entries. This compressed representation allows us to iterate only over non-zero elements when computing the product, making the algorithm efficient for highly sparse matrices.

### Algorithm

1. Compress both matrices by storing only non-zero elements. For each row, create a list of `(value, column index)` pairs.
2. Create a result matrix of size `m x n` initialized with zeros.
3. For each row in `mat1`, iterate through its non-zero elements.
4. For each non-zero element at column `c` in `mat1`, look at row `c` of the compressed `mat2`.
5. Multiply the `mat1` element with each non-zero element in that row of `mat2` and add to the result.
6. Return the result matrix.

::tabs-start

```python
class Solution:
    def multiply(self, mat1: List[List[int]], mat2: List[List[int]]) -> List[List[int]]:
        def compress_matrix(matrix: List[List[int]]) -> List[List[int]]:
            rows, cols = len(matrix), len(matrix[0])
            compressed_matrix = [[] for _ in range(rows)]
            for row in range(rows):
                for col in range(cols):
                    if matrix[row][col]:
                        compressed_matrix[row].append([matrix[row][col], col])
            return compressed_matrix
        
        m = len(mat1)
        k = len(mat1[0])
        n = len(mat2[0])
        
        # Store the non-zero values of each matrix.
        A = compress_matrix(mat1)
        B = compress_matrix(mat2)
        
        ans = [[0] * n for _ in range(m)]
        
        for mat1_row in range(m):
            # Iterate on all current 'row' non-zero elements of mat1.
            for element1, mat1_col in A[mat1_row]:
                # Multiply and add all non-zero elements of mat2
                # where the row is equal to col of current element of mat1.
                for element2, mat2_col in B[mat1_col]:
                    ans[mat1_row][mat2_col] += element1 * element2
                    
        return ans
```

```java
class Solution {
    public ArrayList<ArrayList<Pair<Integer, Integer>>> compressMatrix(int[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;
        
        ArrayList<ArrayList<Pair<Integer, Integer>>> compressedMatrix = new ArrayList<>();
        
        for (int row = 0; row < rows; ++row) {
            ArrayList<Pair<Integer, Integer>> currRow = new ArrayList<>();
            for (int col = 0; col < cols; ++col) {
                if (matrix[row][col] != 0) {
                    currRow.add(new Pair(matrix[row][col], col)); 
                }
            }
            compressedMatrix.add(currRow);
        }
        return compressedMatrix;
    }
    
    public int[][] multiply(int[][] mat1, int[][] mat2) {
        int m = mat1.length;
        int k = mat1[0].length;
        int n = mat2[0].length;
        
        // Store the non-zero values of each matrix.
        ArrayList<ArrayList<Pair<Integer, Integer>>> A = compressMatrix(mat1);
        ArrayList<ArrayList<Pair<Integer, Integer>>> B = compressMatrix(mat2);
        
        int[][] ans = new int[m][n];
        
        for (int mat1Row = 0; mat1Row < m; ++mat1Row) {
            // Iterate on all current 'row' non-zero elements of mat1.
            for (Pair mat1Element : A.get(mat1Row)) {
                int element1 = (int)mat1Element.getKey();
                int mat1Col = (int)mat1Element.getValue();

                // Multiply and add all non-zero elements of mat2
                // where the row is equal to col of current element of mat1.
                for (Pair mat2Element : B.get(mat1Col)) {
                    int element2 = (int)mat2Element.getKey();
                    int mat2Col = (int)mat2Element.getValue();                 
                    ans[mat1Row][mat2Col] += element1 * element2;
                }
            }
        }
        
        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<pair<int, int>>> compressMatrix(vector<vector<int>>& matrix) {
        int rows = matrix.size();
        int cols = matrix[0].size();
        vector<vector<pair<int, int>>> compressedMatrix(rows);
        
        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {
                if (matrix[row][col] != 0) {
                    compressedMatrix[row].push_back({matrix[row][col], col}); 
                }
            }
        }
        return compressedMatrix;
    }
    
    vector<vector<int>> multiply(vector<vector<int>>& mat1, vector<vector<int>>& mat2) {
        int m = mat1.size();
        int k = mat1[0].size();
        int n = mat2[0].size();
        
        // Store the non-zero values of each matrix.
        vector<vector<pair<int, int>>> A = compressMatrix(mat1);
        vector<vector<pair<int, int>>> B = compressMatrix(mat2);
        
        vector<vector<int>> ans(m, vector<int>(n, 0));
        
        for (int mat1Row = 0; mat1Row < m; ++mat1Row) {
            // Iterate on all current 'row' non-zero elements of mat1.
            for (auto [element1, mat1Col] : A[mat1Row]) {

                // Multiply and add all non-zero elements of mat2
                // where the row is equal to col of current element of mat1.
                for (auto [element2, mat2Col] : B[mat1Col]) {
                    ans[mat1Row][mat2Col] += element1 * element2;
                }
            }
        }
        
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} mat1
     * @param {number[][]} mat2
     * @return {number[][]}
     */
    multiply(mat1, mat2) {
        let compressMatrix = (matrix) => {
            let rows = matrix.length;
            let cols = matrix[0].length;
            let compressedMatrix = [];
            matrix.forEach((rowElements, row) => {
                let currRow = [];
                rowElements.forEach((element, col) => {
                    if (element) {
                        currRow.push([element, col]);
                    }
                });
                compressedMatrix.push(currRow);
            });
            return compressedMatrix;
        }

        let m = mat1.length;
        let k = mat1[0].length;
        let n = mat2[0].length;

        // Store the non-zero values of each matrix.
        let A = compressMatrix(mat1);
        let B = compressMatrix(mat2);

        let ans = Array(m).fill(0).map(x => Array(n).fill(0));

        for (let mat1Row = 0; mat1Row < m; ++mat1Row) {
            // Iterate on all current 'row' non-zero elements of mat1.
            for (let mat1Element of A[mat1Row]) {
                let [element1, mat1Col] = mat1Element;

                // Multiply and add all non-zero elements of mat2
                // where the row is equal to col of current element of mat1.
                for (let mat2Element of B[mat1Col]) {
                    let [element2, mat2Col] = mat2Element;
                    ans[mat1Row][mat2Col] += element1 * element2;
                }
            }
        }
        return ans;
    }
}
```

```csharp
public class Solution {
    private List<List<(int val, int col)>> CompressMatrix(int[][] matrix) {
        int rows = matrix.Length;
        int cols = matrix[0].Length;
        var compressedMatrix = new List<List<(int val, int col)>>();

        for (int row = 0; row < rows; row++) {
            var currRow = new List<(int val, int col)>();
            for (int col = 0; col < cols; col++) {
                if (matrix[row][col] != 0) {
                    currRow.Add((matrix[row][col], col));
                }
            }
            compressedMatrix.Add(currRow);
        }
        return compressedMatrix;
    }

    public int[][] Multiply(int[][] mat1, int[][] mat2) {
        int m = mat1.Length;
        int k = mat1[0].Length;
        int n = mat2[0].Length;

        // Store the non-zero values of each matrix.
        var A = CompressMatrix(mat1);
        var B = CompressMatrix(mat2);

        int[][] ans = new int[m][];
        for (int i = 0; i < m; i++) {
            ans[i] = new int[n];
        }

        for (int mat1Row = 0; mat1Row < m; mat1Row++) {
            // Iterate on all current 'row' non-zero elements of mat1.
            foreach (var (element1, mat1Col) in A[mat1Row]) {
                // Multiply and add all non-zero elements of mat2
                // where the row is equal to col of current element of mat1.
                foreach (var (element2, mat2Col) in B[mat1Col]) {
                    ans[mat1Row][mat2Col] += element1 * element2;
                }
            }
        }

        return ans;
    }
}
```

```go
func multiply(mat1 [][]int, mat2 [][]int) [][]int {
    compressMatrix := func(matrix [][]int) [][][2]int {
        rows := len(matrix)
        cols := len(matrix[0])
        compressedMatrix := make([][][2]int, rows)

        for row := 0; row < rows; row++ {
            var currRow [][2]int
            for col := 0; col < cols; col++ {
                if matrix[row][col] != 0 {
                    currRow = append(currRow, [2]int{matrix[row][col], col})
                }
            }
            compressedMatrix[row] = currRow
        }
        return compressedMatrix
    }

    m := len(mat1)
    n := len(mat2[0])

    // Store the non-zero values of each matrix.
    A := compressMatrix(mat1)
    B := compressMatrix(mat2)

    ans := make([][]int, m)
    for i := range ans {
        ans[i] = make([]int, n)
    }

    for mat1Row := 0; mat1Row < m; mat1Row++ {
        // Iterate on all current 'row' non-zero elements of mat1.
        for _, mat1Element := range A[mat1Row] {
            element1, mat1Col := mat1Element[0], mat1Element[1]

            // Multiply and add all non-zero elements of mat2
            // where the row is equal to col of current element of mat1.
            for _, mat2Element := range B[mat1Col] {
                element2, mat2Col := mat2Element[0], mat2Element[1]
                ans[mat1Row][mat2Col] += element1 * element2
            }
        }
    }

    return ans
}
```

```kotlin
class Solution {
    private fun compressMatrix(matrix: Array<IntArray>): List<List<Pair<Int, Int>>> {
        val rows = matrix.size
        val cols = matrix[0].size
        val compressedMatrix = mutableListOf<List<Pair<Int, Int>>>()

        for (row in 0 until rows) {
            val currRow = mutableListOf<Pair<Int, Int>>()
            for (col in 0 until cols) {
                if (matrix[row][col] != 0) {
                    currRow.add(matrix[row][col] to col)
                }
            }
            compressedMatrix.add(currRow)
        }
        return compressedMatrix
    }

    fun multiply(mat1: Array<IntArray>, mat2: Array<IntArray>): Array<IntArray> {
        val m = mat1.size
        val n = mat2[0].size

        // Store the non-zero values of each matrix.
        val A = compressMatrix(mat1)
        val B = compressMatrix(mat2)

        val ans = Array(m) { IntArray(n) }

        for (mat1Row in 0 until m) {
            // Iterate on all current 'row' non-zero elements of mat1.
            for ((element1, mat1Col) in A[mat1Row]) {
                // Multiply and add all non-zero elements of mat2
                // where the row is equal to col of current element of mat1.
                for ((element2, mat2Col) in B[mat1Col]) {
                    ans[mat1Row][mat2Col] += element1 * element2
                }
            }
        }

        return ans
    }
}
```

```swift
class Solution {
    private func compressMatrix(_ matrix: [[Int]]) -> [[(Int, Int)]] {
        let rows = matrix.count
        let cols = matrix[0].count
        var compressedMatrix = [[(Int, Int)]]()

        for row in 0..<rows {
            var currRow = [(Int, Int)]()
            for col in 0..<cols {
                if matrix[row][col] != 0 {
                    currRow.append((matrix[row][col], col))
                }
            }
            compressedMatrix.append(currRow)
        }
        return compressedMatrix
    }

    func multiply(_ mat1: [[Int]], _ mat2: [[Int]]) -> [[Int]] {
        let m = mat1.count
        let n = mat2[0].count

        // Store the non-zero values of each matrix.
        let A = compressMatrix(mat1)
        let B = compressMatrix(mat2)

        var ans = [[Int]](repeating: [Int](repeating: 0, count: n), count: m)

        for mat1Row in 0..<m {
            // Iterate on all current 'row' non-zero elements of mat1.
            for (element1, mat1Col) in A[mat1Row] {
                // Multiply and add all non-zero elements of mat2
                // where the row is equal to col of current element of mat1.
                for (element2, mat2Col) in B[mat1Col] {
                    ans[mat1Row][mat2Col] += element1 * element2
                }
            }
        }

        return ans
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot k \cdot n)$
- Space complexity: $O(m \cdot k + k \cdot n)$

>  Where $m$ and $k$ represent the number of rows and columns in `mat1`, respectively and $k$ and $n$ represent the number of rows and columns in `mat2`, respectively.

---

## 3. Yale Format

### Intuition

The Yale format (also known as Compressed Sparse Row/Column) is a standard way to represent sparse matrices efficiently. It uses three arrays: values (non-zero elements), column/row indices, and row/column pointers that mark where each row/column starts in the values array. By compressing mat1 row-wise and mat2 column-wise, we can efficiently compute dot products by merging two sorted lists of indices.

### Algorithm

1. Compress `mat1` using Compressed Sparse Row (CSR) format: store values, column indices, and row pointers.
2. Compress `mat2` using Compressed Sparse Column (CSC) format: store values, row indices, and column pointers.
3. For each cell `(row, col)` in the result matrix, find the range of non-zero elements in `mat1`'s row and `mat2`'s column.
4. Use a two-pointer technique to merge these ranges: when column index in `mat1` matches row index in `mat2`, multiply the values and add to the result.
5. Return the result matrix.

::tabs-start

```python
class SparseMatrix:
    def __init__(self, matrix: List[List[int]], col_wise: bool):
        self.values, self.row_index, self.col_index = self.compress_matrix(matrix, col_wise)

    def compress_matrix(self, matrix: List[List[int]], col_wise: bool):
        return self.compress_col_wise(matrix) if col_wise else self.compress_row_wise(matrix)

    # Compressed Sparse Row
    def compress_row_wise(self, matrix: List[List[int]]):
        values = []
        row_index = [0]
        col_index = []

        for row in range(len(matrix)):
            for col in range(len(matrix[0])):
                if matrix[row][col]:
                    values.append(matrix[row][col])
                    col_index.append(col)
            row_index.append(len(values))

        return values, row_index, col_index

    # Compressed Sparse Column
    def compress_col_wise(self, matrix: List[List[int]]):
        values = []
        row_index = []
        col_index = [0]

        for col in range(len(matrix[0])):
            for row in range(len(matrix)):
                if matrix[row][col]:
                    values.append(matrix[row][col])
                    row_index.append(row)
            col_index.append(len(values))

        return values, row_index, col_index

class Solution:
    def multiply(self, mat1: List[List[int]], mat2: List[List[int]]) -> List[List[int]]:
            A = SparseMatrix(mat1, False)
            B = SparseMatrix(mat2, True)
            
            ans = [[0] * len(mat2[0]) for _ in range(len(mat1))]

            for row in range(len(ans)):
                for col in range(len(ans[0])):

                    # Row element range indices
                    mat1_row_start = A.row_index[row]
                    mat1_row_end = A.row_index[row + 1]

                    # Column element range indices
                    mat2_col_start = B.col_index[col]
                    mat2_col_end = B.col_index[col + 1]
                    
                    # Iterate over both row and column.
                    while mat1_row_start < mat1_row_end and mat2_col_start < mat2_col_end:
                        if A.col_index[mat1_row_start] < B.row_index[mat2_col_start]:
                            mat1_row_start += 1
                        elif A.col_index[mat1_row_start] > B.row_index[mat2_col_start]:
                            mat2_col_start += 1
                        # Row index and col index are same so we can multiply these elements.
                        else:
                            ans[row][col] += A.values[mat1_row_start] * B.values[mat2_col_start]
                            mat1_row_start += 1
                            mat2_col_start += 1
    
            return ans
```

```java
class Solution {
    class SparseMatrix {
        public int cols = 0, rows = 0;
        public ArrayList<Integer> values = new ArrayList<>(); 
        public ArrayList<Integer> colIndex = new ArrayList<>(); 
        public ArrayList<Integer> rowIndex = new ArrayList<>();

        // Compressed Sparse Row
        public SparseMatrix(int[][] matrix) {
            rows = matrix.length;
            cols = matrix[0].length; 
            rowIndex.add(0);

            for (int row = 0; row < rows; ++row) {
                for (int col = 0; col < cols; ++col) {
                    if (matrix[row][col] != 0) {
                        values.add(matrix[row][col]);
                        colIndex.add(col);
                    }
                }
                rowIndex.add(values.size());
            }
        }

        // Compressed Sparse Column
        public SparseMatrix(int[][] matrix, boolean colWise) {
            rows = matrix.length;
            cols = matrix[0].length;
            colIndex.add(0);

            for (int col = 0; col < cols; ++col) {
                for (int row = 0; row < rows; ++row) {
                    if (matrix[row][col] != 0) {
                        values.add(matrix[row][col]);
                        rowIndex.add(row);
                    }
                }
                colIndex.add(values.size());
            }
        }
    };

    
    public int[][] multiply(int[][] mat1, int[][] mat2) {
        SparseMatrix A = new SparseMatrix(mat1); 
        SparseMatrix B = new SparseMatrix(mat2, true);
        
        int[][] ans = new int[mat1.length][mat2[0].length];
        
        for (int row = 0; row < ans.length; ++row) {
            for (int col = 0; col < ans[0].length; ++col) {
                
                // Row element range indices
                int matrixOneRowStart = A.rowIndex.get(row);
                int matrixOneRowEnd = A.rowIndex.get(row + 1);
                
                // Column element range indices
                int matrixTwoColStart = B.colIndex.get(col);
                int matrixTwoColEnd = B.colIndex.get(col + 1);
                
                // Iterate over both row and column.
                while (matrixOneRowStart < matrixOneRowEnd && matrixTwoColStart < matrixTwoColEnd) {
                    if (A.colIndex.get(matrixOneRowStart) < B.rowIndex.get(matrixTwoColStart)) {
                        matrixOneRowStart++;
                    } else if (A.colIndex.get(matrixOneRowStart) > B.rowIndex.get(matrixTwoColStart)) {
                        matrixTwoColStart++;
                    } else {
                        // Row index and col index are same so we can multiply these elements.
                        ans[row][col] += A.values.get(matrixOneRowStart) * B.values.get(matrixTwoColStart);
                        matrixOneRowStart++;
                        matrixTwoColStart++;
                    }
                }
            }
        }
        
        return ans;
    }
}
```

```cpp
class SparseMatrix {
public:
    int cols = 0, rows = 0;
    vector<int> values, colIndex, rowIndex;

    // Compressed Sparse Row
    SparseMatrix(vector<vector<int>>& matrix) {
        rows = matrix.size();
        cols = matrix[0].size(); 
        rowIndex.push_back(0);
        
        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {
                if (matrix[row][col]) {
                    values.push_back(matrix[row][col]);
                    colIndex.push_back(col);
                }
            }
            rowIndex.push_back(values.size());
        }
    }

    // Compressed Sparse Column
    SparseMatrix(vector<vector<int>>& matrix, bool colWise) {
        rows = matrix.size();
        cols = matrix[0].size();
        colIndex.push_back(0);
        
        for (int col = 0; col < cols; ++col) {
            for (int row = 0; row < rows; ++row) {
                if (matrix[row][col]) {
                    values.push_back(matrix[row][col]);
                    rowIndex.push_back(row);
                }
            }
            colIndex.push_back(values.size());
        }
    }
};

class Solution {
public:
    vector<vector<int>> multiply(vector<vector<int>>& mat1, vector<vector<int>>& mat2) {
        SparseMatrix A (mat1); 
        SparseMatrix B (mat2, true);
        
        vector<vector<int>> ans(mat1.size(), vector<int>(mat2[0].size(), 0));
        
        for (int row = 0; row < ans.size(); ++row) {
            for (int col = 0; col < ans[0].size(); ++col) {
                
                // Row element range indices
                int matrixOneRowStart = A.rowIndex[row];
                int matrixOneRowEnd = A.rowIndex[row + 1];
                
                // Column element range indices
                int matrixTwoColStart = B.colIndex[col];
                int matrixTwoColEnd = B.colIndex[col + 1];
                
                // Iterate over both row and column.
                while (matrixOneRowStart < matrixOneRowEnd && matrixTwoColStart < matrixTwoColEnd) {
                    if (A.colIndex[matrixOneRowStart] < B.rowIndex[matrixTwoColStart]) {
                        matrixOneRowStart++;
                    } else if (A.colIndex[matrixOneRowStart] > B.rowIndex[matrixTwoColStart]) {
                        matrixTwoColStart++;
                    } else {
                        // Row index and col index are same so we can multiply these elements.
                        ans[row][col] += A.values[matrixOneRowStart] * B.values[matrixTwoColStart];
                        matrixOneRowStart++;
                        matrixTwoColStart++;
                    }
                }
            }
        }
        
        return ans;
    }
};
```

```javascript
class SparseMatrix {
    constructor(matrix, colWise) {
        [this.values, this.rowIndex, this.colIndex] = this.compressMatrix(matrix, colWise);
    }

    compressMatrix(matrix, colWise) {
        return (colWise ? this.compressColWise(matrix) : this.compressRowWise(matrix));
    }

    // Compressed Sparse Row
    compressRowWise(matrix) {
        let values = []
        let rowIndex = [0]
        let colIndex = []

        for (let row = 0; row < matrix.length; ++row) {
            for (let col = 0; col < matrix[0].length; ++col) {
                if (matrix[row][col]) {
                    values.push(matrix[row][col]);
                    colIndex.push(col);
                }
            }
            rowIndex.push(values.length);
        }

        return [values, rowIndex, colIndex];
    }

    // Compressed Sparse Col
    compressColWise(matrix) {
        let values = []
        let rowIndex = []
        let colIndex = [0]

        for (let col = 0; col < matrix[0].length; ++col) {
            for (let row = 0; row < matrix.length; ++row) {
                if (matrix[row][col]) {
                    values.push(matrix[row][col]);
                    rowIndex.push(row);
                }
            }
            colIndex.push(values.length);
        }

        return [values, rowIndex, colIndex];
    }
}

class Solution {
    /**
     * @param {number[][]} mat1
     * @param {number[][]} mat2
     * @return {number[][]}
     */
    multiply(mat1, mat2) {
        let A = new SparseMatrix(mat1, false)
        let B = new SparseMatrix(mat2, true)

        let ans = Array(mat1.length).fill(0).map(x => Array(mat2[0].length).fill(0));

        ans.forEach((_, row) => {
            ans[row].forEach((_, col) => {
                // Row element range indices
                let matrixOneRowStart = A.rowIndex[row];
                let matrixOneRowEnd = A.rowIndex[row + 1];
                // Column element range indices
                let matrixTwoColStart = B.colIndex[col];
                let matrixTwoColEnd = B.colIndex[col + 1];
                // Iterate over both row and column.
                while (matrixOneRowStart < matrixOneRowEnd && matrixTwoColStart < matrixTwoColEnd) {
                    if (A.colIndex[matrixOneRowStart] < B.rowIndex[matrixTwoColStart]) {
                        matrixOneRowStart++;
                    } else if (A.colIndex[matrixOneRowStart] > B.rowIndex[matrixTwoColStart]) {
                        matrixTwoColStart++;
                    } else {
                        // Row index and col index are same so we can multiply these elements.
                        ans[row][col] += A.values[matrixOneRowStart] * B.values[matrixTwoColStart];
                        matrixOneRowStart++;
                        matrixTwoColStart++;
                    }
                }
            });
        });

        return ans;
    }
}
```

```csharp
public class Solution {
    class SparseMatrix {
        public int cols = 0, rows = 0;
        public List<int> values = new List<int>();
        public List<int> colIndex = new List<int>();
        public List<int> rowIndex = new List<int>();

        // Compressed Sparse Row
        public SparseMatrix(int[][] matrix) {
            rows = matrix.Length;
            cols = matrix[0].Length;
            rowIndex.Add(0);

            for (int row = 0; row < rows; row++) {
                for (int col = 0; col < cols; col++) {
                    if (matrix[row][col] != 0) {
                        values.Add(matrix[row][col]);
                        colIndex.Add(col);
                    }
                }
                rowIndex.Add(values.Count);
            }
        }

        // Compressed Sparse Column
        public SparseMatrix(int[][] matrix, bool colWise) {
            rows = matrix.Length;
            cols = matrix[0].Length;
            colIndex.Add(0);

            for (int col = 0; col < cols; col++) {
                for (int row = 0; row < rows; row++) {
                    if (matrix[row][col] != 0) {
                        values.Add(matrix[row][col]);
                        rowIndex.Add(row);
                    }
                }
                colIndex.Add(values.Count);
            }
        }
    }

    public int[][] Multiply(int[][] mat1, int[][] mat2) {
        SparseMatrix A = new SparseMatrix(mat1);
        SparseMatrix B = new SparseMatrix(mat2, true);

        int[][] ans = new int[mat1.Length][];
        for (int i = 0; i < mat1.Length; i++) {
            ans[i] = new int[mat2[0].Length];
        }

        for (int row = 0; row < ans.Length; row++) {
            for (int col = 0; col < ans[0].Length; col++) {
                // Row element range indices
                int matrixOneRowStart = A.rowIndex[row];
                int matrixOneRowEnd = A.rowIndex[row + 1];

                // Column element range indices
                int matrixTwoColStart = B.colIndex[col];
                int matrixTwoColEnd = B.colIndex[col + 1];

                // Iterate over both row and column.
                while (matrixOneRowStart < matrixOneRowEnd && matrixTwoColStart < matrixTwoColEnd) {
                    if (A.colIndex[matrixOneRowStart] < B.rowIndex[matrixTwoColStart]) {
                        matrixOneRowStart++;
                    } else if (A.colIndex[matrixOneRowStart] > B.rowIndex[matrixTwoColStart]) {
                        matrixTwoColStart++;
                    } else {
                        // Row index and col index are same so we can multiply these elements.
                        ans[row][col] += A.values[matrixOneRowStart] * B.values[matrixTwoColStart];
                        matrixOneRowStart++;
                        matrixTwoColStart++;
                    }
                }
            }
        }

        return ans;
    }
}
```

```go
type SparseMatrix struct {
    values   []int
    rowIndex []int
    colIndex []int
}

func newSparseMatrixRowWise(matrix [][]int) *SparseMatrix {
    rows := len(matrix)
    cols := len(matrix[0])
    sm := &SparseMatrix{
        rowIndex: []int{0},
    }

    for row := 0; row < rows; row++ {
        for col := 0; col < cols; col++ {
            if matrix[row][col] != 0 {
                sm.values = append(sm.values, matrix[row][col])
                sm.colIndex = append(sm.colIndex, col)
            }
        }
        sm.rowIndex = append(sm.rowIndex, len(sm.values))
    }

    return sm
}

func newSparseMatrixColWise(matrix [][]int) *SparseMatrix {
    rows := len(matrix)
    cols := len(matrix[0])
    sm := &SparseMatrix{
        colIndex: []int{0},
    }

    for col := 0; col < cols; col++ {
        for row := 0; row < rows; row++ {
            if matrix[row][col] != 0 {
                sm.values = append(sm.values, matrix[row][col])
                sm.rowIndex = append(sm.rowIndex, row)
            }
        }
        sm.colIndex = append(sm.colIndex, len(sm.values))
    }

    return sm
}

func multiply(mat1 [][]int, mat2 [][]int) [][]int {
    A := newSparseMatrixRowWise(mat1)
    B := newSparseMatrixColWise(mat2)

    ans := make([][]int, len(mat1))
    for i := range ans {
        ans[i] = make([]int, len(mat2[0]))
    }

    for row := 0; row < len(ans); row++ {
        for col := 0; col < len(ans[0]); col++ {
            // Row element range indices
            matrixOneRowStart := A.rowIndex[row]
            matrixOneRowEnd := A.rowIndex[row+1]

            // Column element range indices
            matrixTwoColStart := B.colIndex[col]
            matrixTwoColEnd := B.colIndex[col+1]

            // Iterate over both row and column.
            for matrixOneRowStart < matrixOneRowEnd && matrixTwoColStart < matrixTwoColEnd {
                if A.colIndex[matrixOneRowStart] < B.rowIndex[matrixTwoColStart] {
                    matrixOneRowStart++
                } else if A.colIndex[matrixOneRowStart] > B.rowIndex[matrixTwoColStart] {
                    matrixTwoColStart++
                } else {
                    // Row index and col index are same so we can multiply these elements.
                    ans[row][col] += A.values[matrixOneRowStart] * B.values[matrixTwoColStart]
                    matrixOneRowStart++
                    matrixTwoColStart++
                }
            }
        }
    }

    return ans
}
```

```kotlin
class Solution {
    class SparseMatrix {
        val values = mutableListOf<Int>()
        val colIndex = mutableListOf<Int>()
        val rowIndex = mutableListOf<Int>()

        // Compressed Sparse Row
        constructor(matrix: Array<IntArray>) {
            val rows = matrix.size
            val cols = matrix[0].size
            rowIndex.add(0)

            for (row in 0 until rows) {
                for (col in 0 until cols) {
                    if (matrix[row][col] != 0) {
                        values.add(matrix[row][col])
                        colIndex.add(col)
                    }
                }
                rowIndex.add(values.size)
            }
        }

        // Compressed Sparse Column
        constructor(matrix: Array<IntArray>, colWise: Boolean) {
            val rows = matrix.size
            val cols = matrix[0].size
            colIndex.add(0)

            for (col in 0 until cols) {
                for (row in 0 until rows) {
                    if (matrix[row][col] != 0) {
                        values.add(matrix[row][col])
                        rowIndex.add(row)
                    }
                }
                colIndex.add(values.size)
            }
        }
    }

    fun multiply(mat1: Array<IntArray>, mat2: Array<IntArray>): Array<IntArray> {
        val A = SparseMatrix(mat1)
        val B = SparseMatrix(mat2, true)

        val ans = Array(mat1.size) { IntArray(mat2[0].size) }

        for (row in ans.indices) {
            for (col in ans[0].indices) {
                // Row element range indices
                var matrixOneRowStart = A.rowIndex[row]
                val matrixOneRowEnd = A.rowIndex[row + 1]

                // Column element range indices
                var matrixTwoColStart = B.colIndex[col]
                val matrixTwoColEnd = B.colIndex[col + 1]

                // Iterate over both row and column.
                while (matrixOneRowStart < matrixOneRowEnd && matrixTwoColStart < matrixTwoColEnd) {
                    when {
                        A.colIndex[matrixOneRowStart] < B.rowIndex[matrixTwoColStart] -> {
                            matrixOneRowStart++
                        }
                        A.colIndex[matrixOneRowStart] > B.rowIndex[matrixTwoColStart] -> {
                            matrixTwoColStart++
                        }
                        else -> {
                            // Row index and col index are same so we can multiply these elements.
                            ans[row][col] += A.values[matrixOneRowStart] * B.values[matrixTwoColStart]
                            matrixOneRowStart++
                            matrixTwoColStart++
                        }
                    }
                }
            }
        }

        return ans
    }
}
```

```swift
class Solution {
    class SparseMatrix {
        var values = [Int]()
        var colIndex = [Int]()
        var rowIndex = [Int]()

        // Compressed Sparse Row
        init(matrix: [[Int]]) {
            let rows = matrix.count
            let cols = matrix[0].count
            rowIndex.append(0)

            for row in 0..<rows {
                for col in 0..<cols {
                    if matrix[row][col] != 0 {
                        values.append(matrix[row][col])
                        colIndex.append(col)
                    }
                }
                rowIndex.append(values.count)
            }
        }

        // Compressed Sparse Column
        init(matrix: [[Int]], colWise: Bool) {
            let rows = matrix.count
            let cols = matrix[0].count
            colIndex.append(0)

            for col in 0..<cols {
                for row in 0..<rows {
                    if matrix[row][col] != 0 {
                        values.append(matrix[row][col])
                        rowIndex.append(row)
                    }
                }
                colIndex.append(values.count)
            }
        }
    }

    func multiply(_ mat1: [[Int]], _ mat2: [[Int]]) -> [[Int]] {
        let A = SparseMatrix(matrix: mat1)
        let B = SparseMatrix(matrix: mat2, colWise: true)

        var ans = [[Int]](repeating: [Int](repeating: 0, count: mat2[0].count), count: mat1.count)

        for row in 0..<ans.count {
            for col in 0..<ans[0].count {
                // Row element range indices
                var matrixOneRowStart = A.rowIndex[row]
                let matrixOneRowEnd = A.rowIndex[row + 1]

                // Column element range indices
                var matrixTwoColStart = B.colIndex[col]
                let matrixTwoColEnd = B.colIndex[col + 1]

                // Iterate over both row and column.
                while matrixOneRowStart < matrixOneRowEnd && matrixTwoColStart < matrixTwoColEnd {
                    if A.colIndex[matrixOneRowStart] < B.rowIndex[matrixTwoColStart] {
                        matrixOneRowStart += 1
                    } else if A.colIndex[matrixOneRowStart] > B.rowIndex[matrixTwoColStart] {
                        matrixTwoColStart += 1
                    } else {
                        // Row index and col index are same so we can multiply these elements.
                        ans[row][col] += A.values[matrixOneRowStart] * B.values[matrixTwoColStart]
                        matrixOneRowStart += 1
                        matrixTwoColStart += 1
                    }
                }
            }
        }

        return ans
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot n \cdot k)$
- Space complexity: $O(m \cdot k + k \cdot n)$

>  Where $m$ and $k$ represent the number of rows and columns in `mat1`, respectively and $k$ and $n$ represent the number of rows and columns in `mat2`, respectively.

## Common Pitfalls

### Not Skipping Zero Elements in the First Matrix

The main optimization for sparse matrices is to skip multiplications when an element in `mat1` is zero. Checking only for zeros in `mat2` or not checking at all results in unnecessary computations and misses the performance benefit of sparse matrix multiplication.

### Confusing Row and Column Indices During Multiplication

In matrix multiplication, element `mat1[i][k]` multiplies with `mat2[k][j]` to contribute to `result[i][j]`. Mixing up the shared index `k` or the result indices `i` and `j` leads to incorrect results.

### Initializing the Result Matrix Incorrectly

The result matrix must be initialized with zeros and have dimensions `m x n` where `m` is the number of rows in `mat1` and `n` is the number of columns in `mat2`. Using wrong dimensions or forgetting to initialize with zeros causes index errors or incorrect sums.
