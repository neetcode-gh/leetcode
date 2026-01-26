## Prerequisites
Before attempting this problem, you should be comfortable with:
- **2D Arrays (Matrices)** - Understanding how to traverse and access elements in a grid
- **Nested Loops** - Iterating over both rows and columns, plus sub-regions within the matrix
- **Finding Maximum Values** - Tracking the maximum element within a sliding window region

---

## 1. Iteration

### Intuition

For each position in the output matrix, we need to find the maximum value in the corresponding 3x3 region of the input grid. The output matrix is (n-2) x (n-2) since we cannot center a 3x3 window on the edges. We simply iterate over all valid starting positions and scan the 3x3 window to find the maximum.

### Algorithm

1. Create an output matrix of size `(n-2) x (n-2)`.
2. For each position `(i, j)` in the output matrix:
   - Scan the 3x3 region starting at `(i, j)` in the input grid.
   - Find the maximum value among all 9 cells.
   - Store this maximum at position `(i, j)` in the output.
3. Return the output matrix.

::tabs-start

```python
class Solution:
    def largestLocal(self, grid: List[List[int]]) -> List[List[int]]:
        N = len(grid)
        res = [[0] * (N - 2) for _ in range(N - 2)]

        for i in range(N - 2):
            for j in range(N - 2):
                for r in range(i, i + 3):
                    for c in range(j, j + 3):
                        res[i][j] = max(res[i][j], grid[r][c])

        return res
```

```java
public class Solution {
    public int[][] largestLocal(int[][] grid) {
        int N = grid.length;
        int[][] res = new int[N - 2][N - 2];

        for (int i = 0; i < N - 2; i++) {
            for (int j = 0; j < N - 2; j++) {
                for (int r = i; r < i + 3; r++) {
                    for (int c = j; c < j + 3; c++) {
                        res[i][j] = Math.max(res[i][j], grid[r][c]);
                    }
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
    vector<vector<int>> largestLocal(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<vector<int>> res(N - 2, vector<int>(N - 2, 0));

        for (int i = 0; i < N - 2; i++) {
            for (int j = 0; j < N - 2; j++) {
                for (int r = i; r < i + 3; r++) {
                    for (int c = j; c < j + 3; c++) {
                        res[i][j] = max(res[i][j], grid[r][c]);
                    }
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
     * @return {number[][]}
     */
    largestLocal(grid) {
        const N = grid.length;
        const res = Array.from({ length: N - 2 }, () => Array(N - 2).fill(0));

        for (let i = 0; i < N - 2; i++) {
            for (let j = 0; j < N - 2; j++) {
                for (let r = i; r < i + 3; r++) {
                    for (let c = j; c < j + 3; c++) {
                        res[i][j] = Math.max(res[i][j], grid[r][c]);
                    }
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] LargestLocal(int[][] grid) {
        int N = grid.Length;
        int[][] res = new int[N - 2][];
        for (int i = 0; i < N - 2; i++) {
            res[i] = new int[N - 2];
        }

        for (int i = 0; i < N - 2; i++) {
            for (int j = 0; j < N - 2; j++) {
                for (int r = i; r < i + 3; r++) {
                    for (int c = j; c < j + 3; c++) {
                        res[i][j] = Math.Max(res[i][j], grid[r][c]);
                    }
                }
            }
        }

        return res;
    }
}
```

```go
func largestLocal(grid [][]int) [][]int {
    N := len(grid)
    res := make([][]int, N-2)
    for i := range res {
        res[i] = make([]int, N-2)
    }

    for i := 0; i < N-2; i++ {
        for j := 0; j < N-2; j++ {
            for r := i; r < i+3; r++ {
                for c := j; c < j+3; c++ {
                    if grid[r][c] > res[i][j] {
                        res[i][j] = grid[r][c]
                    }
                }
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun largestLocal(grid: Array<IntArray>): Array<IntArray> {
        val N = grid.size
        val res = Array(N - 2) { IntArray(N - 2) }

        for (i in 0 until N - 2) {
            for (j in 0 until N - 2) {
                for (r in i until i + 3) {
                    for (c in j until j + 3) {
                        res[i][j] = maxOf(res[i][j], grid[r][c])
                    }
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func largestLocal(_ grid: [[Int]]) -> [[Int]] {
        let N = grid.count
        var res = [[Int]](repeating: [Int](repeating: 0, count: N - 2), count: N - 2)

        for i in 0..<(N - 2) {
            for j in 0..<(N - 2) {
                for r in i..<(i + 3) {
                    for c in j..<(j + 3) {
                        res[i][j] = max(res[i][j], grid[r][c])
                    }
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n ^ 2)$ for the output array.

---

## 2. Generalized Approach (Sparse Table)

### Intuition

While the simple iteration works well for a fixed 3x3 window, a Sparse Table allows us to answer any rectangular range maximum query in O(1) time after O(n^2 log^2 n) preprocessing. This is overkill for this specific problem but demonstrates a generalized technique useful when the window size varies or when we need to answer many range queries efficiently.

### Algorithm

1. Build a 2D Sparse Table during preprocessing:
   - `sparseTable[r][c][i][j]` stores the maximum in the submatrix starting at `(r, c)` with dimensions `(2^i) x (2^j)`.
   - Build iteratively: first handle single rows/columns, then combine four quadrants for larger regions.
2. For each query `(x1, y1, x2, y2)`:
   - Compute the appropriate power-of-two dimensions that cover the range.
   - Combine up to four overlapping submatrices to get the maximum.
3. Apply queries for each `(n-k+1) x (n-k+1)` output position with window size `k=3`.

::tabs-start

```python
class SparseTable:
    def __init__(self, grid: List[List[int]]):
        self.n = len(grid)
        self.LOG = [0] * (self.n + 1)
        for i in range(2, self.n + 1):
            self.LOG[i] = self.LOG[i // 2] + 1

        self.sparse_table = [[[[0] * (self.LOG[self.n] + 1) for _ in range(self.LOG[self.n] + 1)] for _ in range(self.n)] for _ in range(self.n)]

        for r in range(self.n):
            for c in range(self.n):
                self.sparse_table[r][c][0][0] = grid[r][c]

        for i in range(self.LOG[self.n] + 1):
            for j in range(self.LOG[self.n] + 1):
                for r in range(self.n - (1 << i) + 1):
                    for c in range(self.n - (1 << j) + 1):
                        if i == 0 and j == 0:
                            self.sparse_table[r][c][i][j] = grid[r][c]
                        elif i == 0:
                            self.sparse_table[r][c][i][j] = max(
                                self.sparse_table[r][c][i][j - 1],
                                self.sparse_table[r][c + (1 << (j - 1))][i][j - 1],
                            )
                        elif j == 0:
                            self.sparse_table[r][c][i][j] = max(
                                self.sparse_table[r][c][i - 1][j],
                                self.sparse_table[r + (1 << (i - 1))][c][i - 1][j],
                            )
                        else:
                            self.sparse_table[r][c][i][j] = max(
                                self.sparse_table[r][c][i - 1][j - 1],
                                self.sparse_table[r + (1 << (i - 1))][c][i - 1][j - 1],
                                self.sparse_table[r][c + (1 << (j - 1))][i - 1][j - 1],
                                self.sparse_table[r + (1 << (i - 1))][c + (1 << (j - 1))][i - 1][j - 1],
                            )

    def query(self, x1: int, y1: int, x2: int, y2: int) -> int:
        lx, ly = self.LOG[x2 - x1 + 1], self.LOG[y2 - y1 + 1]
        return max(
            self.sparse_table[x1][y1][lx][ly],
            self.sparse_table[x2 - (1 << lx) + 1][y1][lx][ly],
            self.sparse_table[x1][y2 - (1 << ly) + 1][lx][ly],
            self.sparse_table[x2 - (1 << lx) + 1][y2 - (1 << ly) + 1][lx][ly],
        )


class Solution:
    def largestLocal(self, grid: List[List[int]]) -> List[List[int]]:
        N, k = len(grid), 3
        sparse_table = SparseTable(grid)
        res = [[0] * (N - k + 1) for _ in range(N - k + 1)]

        for i in range(N - k + 1):
            for j in range(N - k + 1):
                res[i][j] = sparse_table.query(i, j, i + k - 1, j + k - 1)

        return res
```

```java
class SparseTable {
    private int[][][][] sparseTable;
    private int[] log;
    private int n;

    public SparseTable(int[][] grid) {
        n = grid.length;
        log = new int[n + 1];
        for (int i = 2; i <= n; i++) {
            log[i] = log[i >> 1] + 1;
        }

        int maxLog = log[n];
        sparseTable = new int[n][n][maxLog + 1][maxLog + 1];

        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                sparseTable[r][c][0][0] = grid[r][c];
            }
        }

        for (int i = 0; i <= maxLog; i++) {
            for (int j = 0; j <= maxLog; j++) {
                for (int r = 0; r + (1 << i) <= n; r++) {
                    for (int c = 0; c + (1 << j) <= n; c++) {
                        if (i == 0 && j == 0) continue;
                        if (i == 0) {
                            sparseTable[r][c][i][j] = Math.max(
                                sparseTable[r][c][i][j - 1],
                                sparseTable[r][c + (1 << (j - 1))][i][j - 1]
                            );
                        } else if (j == 0) {
                            sparseTable[r][c][i][j] = Math.max(
                                sparseTable[r][c][i - 1][j],
                                sparseTable[r + (1 << (i - 1))][c][i - 1][j]
                            );
                        } else {
                            sparseTable[r][c][i][j] = Math.max(
                                Math.max(sparseTable[r][c][i - 1][j - 1], sparseTable[r + (1 << (i - 1))][c][i - 1][j - 1]),
                                Math.max(sparseTable[r][c + (1 << (j - 1))][i - 1][j - 1],
                                         sparseTable[r + (1 << (i - 1))][c + (1 << (j - 1))][i - 1][j - 1])
                            );
                        }
                    }
                }
            }
        }
    }

    public int query(int x1, int y1, int x2, int y2) {
        int lx = log[x2 - x1 + 1];
        int ly = log[y2 - y1 + 1];
        return Math.max(
            Math.max(sparseTable[x1][y1][lx][ly], sparseTable[x2 - (1 << lx) + 1][y1][lx][ly]),
            Math.max(sparseTable[x1][y2 - (1 << ly) + 1][lx][ly],
                     sparseTable[x2 - (1 << lx) + 1][y2 - (1 << ly) + 1][lx][ly])
        );
    }
}

public class Solution {
    public int[][] largestLocal(int[][] grid) {
        int n = grid.length;
        int k = 3;
        SparseTable st = new SparseTable(grid);
        int[][] res = new int[n - k + 1][n - k + 1];

        for (int i = 0; i <= n - k; i++) {
            for (int j = 0; j <= n - k; j++) {
                res[i][j] = st.query(i, j, i + k - 1, j + k - 1);
            }
        }

        return res;
    }
}
```

```cpp
class SparseTable {
public:
    vector<vector<vector<vector<int>>>> sparseTable;
    vector<int> log;
    int n;

    SparseTable(vector<vector<int>>& grid) {
        n = grid.size();
        log.resize(n + 1, 0);
        for (int i = 2; i <= n; i++) {
            log[i] = log[i / 2] + 1;
        }

        int maxLog = log[n];
        sparseTable.resize(n, vector<vector<vector<int>>>(n, vector<vector<int>>(maxLog + 1, vector<int>(maxLog + 1))));

        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                sparseTable[r][c][0][0] = grid[r][c];
            }
        }

        for (int i = 0; i <= maxLog; i++) {
            for (int j = 0; j <= maxLog; j++) {
                for (int r = 0; r + (1 << i) <= n; r++) {
                    for (int c = 0; c + (1 << j) <= n; c++) {
                        if (i == 0 && j == 0) continue;
                        if (i == 0) {
                            sparseTable[r][c][i][j] = max(
                                sparseTable[r][c][i][j - 1],
                                sparseTable[r][c + (1 << (j - 1))][i][j - 1]
                            );
                        } else if (j == 0) {
                            sparseTable[r][c][i][j] = max(
                                sparseTable[r][c][i - 1][j],
                                sparseTable[r + (1 << (i - 1))][c][i - 1][j]
                            );
                        } else {
                            sparseTable[r][c][i][j] = max(
                                max(sparseTable[r][c][i - 1][j - 1], sparseTable[r + (1 << (i - 1))][c][i - 1][j - 1]),
                                max(sparseTable[r][c + (1 << (j - 1))][i - 1][j - 1],
                                    sparseTable[r + (1 << (i - 1))][c + (1 << (j - 1))][i - 1][j - 1])
                            );
                        }
                    }
                }
            }
        }
    }

    int query(int x1, int y1, int x2, int y2) {
        int lx = log[x2 - x1 + 1];
        int ly = log[y2 - y1 + 1];
        return max(
            max(sparseTable[x1][y1][lx][ly], sparseTable[x2 - (1 << lx) + 1][y1][lx][ly]),
            max(sparseTable[x1][y2 - (1 << ly) + 1][lx][ly],
                sparseTable[x2 - (1 << lx) + 1][y2 - (1 << ly) + 1][lx][ly])
        );
    }
};

class Solution {
public:
    vector<vector<int>> largestLocal(vector<vector<int>>& grid) {
        int n = grid.size(), k = 3;
        SparseTable st(grid);
        vector<vector<int>> res(n - k + 1, vector<int>(n - k + 1));

        for (int i = 0; i <= n - k; i++) {
            for (int j = 0; j <= n - k; j++) {
                res[i][j] = st.query(i, j, i + k - 1, j + k - 1);
            }
        }

        return res;
    }
};
```

```javascript
class SparseTable {
    /**
     * @constructor
     * @param {number[][]} grid
     */
    constructor(grid) {
        this.n = grid.length;
        this.log = Array(this.n + 1).fill(0);
        for (let i = 2; i <= this.n; i++) {
            this.log[i] = this.log[Math.floor(i / 2)] + 1;
        }

        const maxLog = this.log[this.n];
        this.sparseTable = Array.from({ length: this.n }, () =>
            Array.from({ length: this.n }, () =>
                Array.from({ length: maxLog + 1 }, () =>
                    Array(maxLog + 1).fill(0),
                ),
            ),
        );

        for (let r = 0; r < this.n; r++) {
            for (let c = 0; c < this.n; c++) {
                this.sparseTable[r][c][0][0] = grid[r][c];
            }
        }

        for (let i = 0; i <= maxLog; i++) {
            for (let j = 0; j <= maxLog; j++) {
                for (let r = 0; r + (1 << i) <= this.n; r++) {
                    for (let c = 0; c + (1 << j) <= this.n; c++) {
                        if (i === 0 && j === 0) continue;
                        if (i === 0) {
                            this.sparseTable[r][c][i][j] = Math.max(
                                this.sparseTable[r][c][i][j - 1],
                                this.sparseTable[r][c + (1 << (j - 1))][i][
                                    j - 1
                                ],
                            );
                        } else if (j === 0) {
                            this.sparseTable[r][c][i][j] = Math.max(
                                this.sparseTable[r][c][i - 1][j],
                                this.sparseTable[r + (1 << (i - 1))][c][i - 1][
                                    j
                                ],
                            );
                        } else {
                            this.sparseTable[r][c][i][j] = Math.max(
                                Math.max(
                                    this.sparseTable[r][c][i - 1][j - 1],
                                    this.sparseTable[r + (1 << (i - 1))][c][
                                        i - 1
                                    ][j - 1],
                                ),
                                Math.max(
                                    this.sparseTable[r][c + (1 << (j - 1))][
                                        i - 1
                                    ][j - 1],
                                    this.sparseTable[r + (1 << (i - 1))][
                                        c + (1 << (j - 1))
                                    ][i - 1][j - 1],
                                ),
                            );
                        }
                    }
                }
            }
        }
    }

    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @return {number}
     */
    query(x1, y1, x2, y2) {
        const lx = this.log[x2 - x1 + 1];
        const ly = this.log[y2 - y1 + 1];
        return Math.max(
            Math.max(
                this.sparseTable[x1][y1][lx][ly],
                this.sparseTable[x2 - (1 << lx) + 1][y1][lx][ly],
            ),
            Math.max(
                this.sparseTable[x1][y2 - (1 << ly) + 1][lx][ly],
                this.sparseTable[x2 - (1 << lx) + 1][y2 - (1 << ly) + 1][lx][
                    ly
                ],
            ),
        );
    }
}

class Solution {
    /**
     * @param {number[][]} grid
     * @return {number[][]}
     */
    largestLocal(grid) {
        const n = grid.length,
            k = 3;
        const st = new SparseTable(grid);
        const res = Array.from({ length: n - k + 1 }, () =>
            Array(n - k + 1).fill(0),
        );

        for (let i = 0; i <= n - k; i++) {
            for (let j = 0; j <= n - k; j++) {
                res[i][j] = st.query(i, j, i + k - 1, j + k - 1);
            }
        }

        return res;
    }
}
```

```csharp
public class SparseTable {
    private int[,,,] sparseTable;
    private int[] log;
    private int n;

    public SparseTable(int[][] grid) {
        n = grid.Length;
        log = new int[n + 1];
        for (int i = 2; i <= n; i++) {
            log[i] = log[i >> 1] + 1;
        }

        int maxLog = log[n];
        sparseTable = new int[n, n, maxLog + 1, maxLog + 1];

        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                sparseTable[r, c, 0, 0] = grid[r][c];
            }
        }

        for (int i = 0; i <= maxLog; i++) {
            for (int j = 0; j <= maxLog; j++) {
                for (int r = 0; r + (1 << i) <= n; r++) {
                    for (int c = 0; c + (1 << j) <= n; c++) {
                        if (i == 0 && j == 0) continue;
                        if (i == 0) {
                            sparseTable[r, c, i, j] = Math.Max(
                                sparseTable[r, c, i, j - 1],
                                sparseTable[r, c + (1 << (j - 1)), i, j - 1]
                            );
                        } else if (j == 0) {
                            sparseTable[r, c, i, j] = Math.Max(
                                sparseTable[r, c, i - 1, j],
                                sparseTable[r + (1 << (i - 1)), c, i - 1, j]
                            );
                        } else {
                            sparseTable[r, c, i, j] = Math.Max(
                                Math.Max(sparseTable[r, c, i - 1, j - 1],
                                        sparseTable[r + (1 << (i - 1)), c, i - 1, j - 1]),
                                Math.Max(sparseTable[r, c + (1 << (j - 1)), i - 1, j - 1],
                                        sparseTable[r + (1 << (i - 1)), c + (1 << (j - 1)), i - 1, j - 1])
                            );
                        }
                    }
                }
            }
        }
    }

    public int Query(int x1, int y1, int x2, int y2) {
        int lx = log[x2 - x1 + 1];
        int ly = log[y2 - y1 + 1];
        return Math.Max(
            Math.Max(sparseTable[x1, y1, lx, ly], sparseTable[x2 - (1 << lx) + 1, y1, lx, ly]),
            Math.Max(sparseTable[x1, y2 - (1 << ly) + 1, lx, ly],
                    sparseTable[x2 - (1 << lx) + 1, y2 - (1 << ly) + 1, lx, ly])
        );
    }
}

public class Solution {
    public int[][] LargestLocal(int[][] grid) {
        int n = grid.Length;
        int k = 3;
        SparseTable st = new SparseTable(grid);
        int[][] res = new int[n - k + 1][];
        for (int i = 0; i <= n - k; i++) {
            res[i] = new int[n - k + 1];
            for (int j = 0; j <= n - k; j++) {
                res[i][j] = st.Query(i, j, i + k - 1, j + k - 1);
            }
        }
        return res;
    }
}
```

```go
type SparseTable struct {
    sparseTable [][][][]int
    log         []int
    n           int
}

func NewSparseTable(grid [][]int) *SparseTable {
    n := len(grid)
    log := make([]int, n+1)
    for i := 2; i <= n; i++ {
        log[i] = log[i/2] + 1
    }

    maxLog := log[n]
    sparseTable := make([][][][]int, n)
    for r := range sparseTable {
        sparseTable[r] = make([][][]int, n)
        for c := range sparseTable[r] {
            sparseTable[r][c] = make([][]int, maxLog+1)
            for i := range sparseTable[r][c] {
                sparseTable[r][c][i] = make([]int, maxLog+1)
            }
        }
    }

    for r := 0; r < n; r++ {
        for c := 0; c < n; c++ {
            sparseTable[r][c][0][0] = grid[r][c]
        }
    }

    for i := 0; i <= maxLog; i++ {
        for j := 0; j <= maxLog; j++ {
            for r := 0; r+(1<<i) <= n; r++ {
                for c := 0; c+(1<<j) <= n; c++ {
                    if i == 0 && j == 0 {
                        continue
                    }
                    if i == 0 {
                        sparseTable[r][c][i][j] = max(
                            sparseTable[r][c][i][j-1],
                            sparseTable[r][c+(1<<(j-1))][i][j-1],
                        )
                    } else if j == 0 {
                        sparseTable[r][c][i][j] = max(
                            sparseTable[r][c][i-1][j],
                            sparseTable[r+(1<<(i-1))][c][i-1][j],
                        )
                    } else {
                        sparseTable[r][c][i][j] = max(
                            max(sparseTable[r][c][i-1][j-1], sparseTable[r+(1<<(i-1))][c][i-1][j-1]),
                            max(sparseTable[r][c+(1<<(j-1))][i-1][j-1],
                                sparseTable[r+(1<<(i-1))][c+(1<<(j-1))][i-1][j-1]),
                        )
                    }
                }
            }
        }
    }

    return &SparseTable{sparseTable, log, n}
}

func (st *SparseTable) Query(x1, y1, x2, y2 int) int {
    lx := st.log[x2-x1+1]
    ly := st.log[y2-y1+1]
    return max(
        max(st.sparseTable[x1][y1][lx][ly], st.sparseTable[x2-(1<<lx)+1][y1][lx][ly]),
        max(st.sparseTable[x1][y2-(1<<ly)+1][lx][ly],
            st.sparseTable[x2-(1<<lx)+1][y2-(1<<ly)+1][lx][ly]),
    )
}

func largestLocal(grid [][]int) [][]int {
    n := len(grid)
    k := 3
    st := NewSparseTable(grid)
    res := make([][]int, n-k+1)
    for i := 0; i <= n-k; i++ {
        res[i] = make([]int, n-k+1)
        for j := 0; j <= n-k; j++ {
            res[i][j] = st.Query(i, j, i+k-1, j+k-1)
        }
    }
    return res
}
```

```kotlin
class SparseTable(grid: Array<IntArray>) {
    private val sparseTable: Array<Array<Array<IntArray>>>
    private val log: IntArray
    private val n: Int

    init {
        n = grid.size
        log = IntArray(n + 1)
        for (i in 2..n) {
            log[i] = log[i shr 1] + 1
        }

        val maxLog = log[n]
        sparseTable = Array(n) { Array(n) { Array(maxLog + 1) { IntArray(maxLog + 1) } } }

        for (r in 0 until n) {
            for (c in 0 until n) {
                sparseTable[r][c][0][0] = grid[r][c]
            }
        }

        for (i in 0..maxLog) {
            for (j in 0..maxLog) {
                for (r in 0 until n - (1 shl i) + 1) {
                    for (c in 0 until n - (1 shl j) + 1) {
                        if (i == 0 && j == 0) continue
                        if (i == 0) {
                            sparseTable[r][c][i][j] = maxOf(
                                sparseTable[r][c][i][j - 1],
                                sparseTable[r][c + (1 shl (j - 1))][i][j - 1]
                            )
                        } else if (j == 0) {
                            sparseTable[r][c][i][j] = maxOf(
                                sparseTable[r][c][i - 1][j],
                                sparseTable[r + (1 shl (i - 1))][c][i - 1][j]
                            )
                        } else {
                            sparseTable[r][c][i][j] = maxOf(
                                maxOf(sparseTable[r][c][i - 1][j - 1],
                                      sparseTable[r + (1 shl (i - 1))][c][i - 1][j - 1]),
                                maxOf(sparseTable[r][c + (1 shl (j - 1))][i - 1][j - 1],
                                      sparseTable[r + (1 shl (i - 1))][c + (1 shl (j - 1))][i - 1][j - 1])
                            )
                        }
                    }
                }
            }
        }
    }

    fun query(x1: Int, y1: Int, x2: Int, y2: Int): Int {
        val lx = log[x2 - x1 + 1]
        val ly = log[y2 - y1 + 1]
        return maxOf(
            maxOf(sparseTable[x1][y1][lx][ly], sparseTable[x2 - (1 shl lx) + 1][y1][lx][ly]),
            maxOf(sparseTable[x1][y2 - (1 shl ly) + 1][lx][ly],
                  sparseTable[x2 - (1 shl lx) + 1][y2 - (1 shl ly) + 1][lx][ly])
        )
    }
}

class Solution {
    fun largestLocal(grid: Array<IntArray>): Array<IntArray> {
        val n = grid.size
        val k = 3
        val st = SparseTable(grid)
        return Array(n - k + 1) { i ->
            IntArray(n - k + 1) { j ->
                st.query(i, j, i + k - 1, j + k - 1)
            }
        }
    }
}
```

```swift
class SparseTable {
    private var sparseTable: [[[[Int]]]]
    private var log: [Int]
    private var n: Int

    init(_ grid: [[Int]]) {
        n = grid.count
        log = [Int](repeating: 0, count: n + 1)
        for i in 2...n {
            log[i] = log[i / 2] + 1
        }

        let maxLog = log[n]
        sparseTable = [[[[Int]]]](repeating: [[[Int]]](repeating: [[Int]](repeating: [Int](repeating: 0, count: maxLog + 1), count: maxLog + 1), count: n), count: n)

        for r in 0..<n {
            for c in 0..<n {
                sparseTable[r][c][0][0] = grid[r][c]
            }
        }

        for i in 0...maxLog {
            for j in 0...maxLog {
                for r in 0..<(n - (1 << i) + 1) {
                    for c in 0..<(n - (1 << j) + 1) {
                        if i == 0 && j == 0 { continue }
                        if i == 0 {
                            sparseTable[r][c][i][j] = max(
                                sparseTable[r][c][i][j - 1],
                                sparseTable[r][c + (1 << (j - 1))][i][j - 1]
                            )
                        } else if j == 0 {
                            sparseTable[r][c][i][j] = max(
                                sparseTable[r][c][i - 1][j],
                                sparseTable[r + (1 << (i - 1))][c][i - 1][j]
                            )
                        } else {
                            sparseTable[r][c][i][j] = max(
                                max(sparseTable[r][c][i - 1][j - 1],
                                    sparseTable[r + (1 << (i - 1))][c][i - 1][j - 1]),
                                max(sparseTable[r][c + (1 << (j - 1))][i - 1][j - 1],
                                    sparseTable[r + (1 << (i - 1))][c + (1 << (j - 1))][i - 1][j - 1])
                            )
                        }
                    }
                }
            }
        }
    }

    func query(_ x1: Int, _ y1: Int, _ x2: Int, _ y2: Int) -> Int {
        let lx = log[x2 - x1 + 1]
        let ly = log[y2 - y1 + 1]
        return max(
            max(sparseTable[x1][y1][lx][ly], sparseTable[x2 - (1 << lx) + 1][y1][lx][ly]),
            max(sparseTable[x1][y2 - (1 << ly) + 1][lx][ly],
                sparseTable[x2 - (1 << lx) + 1][y2 - (1 << ly) + 1][lx][ly])
        )
    }
}

class Solution {
    func largestLocal(_ grid: [[Int]]) -> [[Int]] {
        let n = grid.count
        let k = 3
        let st = SparseTable(grid)
        var res = [[Int]](repeating: [Int](repeating: 0, count: n - k + 1), count: n - k + 1)

        for i in 0...(n - k) {
            for j in 0...(n - k) {
                res[i][j] = st.query(i, j, i + k - 1, j + k - 1)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \log ^ 2 n)$
- Space complexity:
    - $O(n ^ 2 \log ^ 2 n)$ extra space.
    - $O((n - k) ^ 2)$ for the output matrix.

> Where $n$ is the size of the given square grid and $k$ is the fixed size of the submatrix window.

---

## Common Pitfalls

### Incorrect Output Matrix Dimensions

For an `n x n` input grid with a `3 x 3` window, the output matrix should be `(n-2) x (n-2)`, not `n x n` or `(n-1) x (n-1)`. This is because the 3x3 window cannot be centered on edge cells. Miscalculating the output dimensions leads to array index out of bounds errors or incorrect results.

### Off-by-One Errors in Window Boundaries

When iterating over the 3x3 window starting at position `(i, j)`, the window spans rows `i` to `i+2` and columns `j` to `j+2` (inclusive). A common mistake is using `i+3` or `j+3` as the upper bound in exclusive loop conditions but then accessing indices incorrectly, or confusing whether loop bounds should be inclusive or exclusive.
