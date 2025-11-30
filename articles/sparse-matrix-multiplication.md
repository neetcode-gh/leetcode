## 1. Naive Iteration

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot k \cdot n)$
- Space complexity: $O(1)$

>  Where $m$ and $k$ represent the number of rows and columns in `mat1`, respectively and $k$ and $n$ represent the number of rows and columns in `mat2`, respectively.

---

## 2. List of Lists

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot k \cdot n)$
- Space complexity: $O(m \cdot k + k \cdot n)$

>  Where $m$ and $k$ represent the number of rows and columns in `mat1`, respectively and $k$ and $n$ represent the number of rows and columns in `mat2`, respectively.

---

## 3. Yale Format

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot n \cdot k)$
- Space complexity: $O(m \cdot k + k \cdot n)$

>  Where $m$ and $k$ represent the number of rows and columns in `mat1`, respectively and $k$ and $n$ represent the number of rows and columns in `mat2`, respectively.
