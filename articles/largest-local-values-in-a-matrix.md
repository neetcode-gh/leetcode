## 1. Iteration

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n ^ 2)$ for the output array.

---

## 2. Generalized Approach (Sparse Table)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \log ^ 2 n)$
- Space complexity:
    - $O(n ^ 2 \log ^ 2 n)$ extra space.
    - $O((n - k) ^ 2)$ for the output matrix.

> Where $n$ is the size of the given square grid and $k$ is the fixed size of the submatrix window.
