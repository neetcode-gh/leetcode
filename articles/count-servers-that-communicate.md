## 1. Brute Force

::tabs-start

```python
class Solution:
    def countServers(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        res = 0

        for r in range(m):
            for c in range(n):
                if grid[r][c] == 0:
                    continue

                found = False
                for col in range(n):
                    if col != c and grid[r][col] == 1:
                        found = True
                        break

                if not found:
                    for row in range(m):
                        if row != r and grid[row][c] == 1:
                            found = True
                            break

                if found:
                    res += 1

        return res
```

```java
public class Solution {
    public int countServers(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int res = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 0) continue;

                boolean found = false;
                for (int col = 0; col < n; col++) {
                    if (col != c && grid[r][col] == 1) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    for (int row = 0; row < m; row++) {
                        if (row != r && grid[row][c] == 1) {
                            found = true;
                            break;
                        }
                    }
                }

                if (found) res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countServers(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int res = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 0) continue;

                bool found = false;
                for (int col = 0; col < n; col++) {
                    if (col != c && grid[r][col] == 1) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    for (int row = 0; row < m; row++) {
                        if (row != r && grid[row][c] == 1) {
                            found = true;
                            break;
                        }
                    }
                }

                if (found) res++;
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
    countServers(grid) {
        let m = grid.length, n = grid[0].length;
        let res = 0;

        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                if (grid[r][c] === 0) continue;

                let found = false;
                for (let col = 0; col < n; col++) {
                    if (col !== c && grid[r][col] === 1) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    for (let row = 0; row < m; row++) {
                        if (row !== r && grid[row][c] === 1) {
                            found = true;
                            break;
                        }
                    }
                }

                if (found) res++;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountServers(int[][] grid) {
        int m = grid.Length, n = grid[0].Length;
        int res = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 0) continue;

                bool found = false;
                for (int col = 0; col < n; col++) {
                    if (col != c && grid[r][col] == 1) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    for (int row = 0; row < m; row++) {
                        if (row != r && grid[row][c] == 1) {
                            found = true;
                            break;
                        }
                    }
                }

                if (found) res++;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n ^ 2)$
* Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns of the given matrix $grid$.

---

## 2. Iteration

::tabs-start

```python
class Solution:
    def countServers(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        row_cnt = [0] * ROWS
        col_cnt = [0] * COLS

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == 1:
                    row_cnt[r] += 1
                    col_cnt[c] += 1

        res = 0
        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] and max(row_cnt[r], col_cnt[c]) > 1:
                    res += 1

        return res
```

```java
public class Solution {
    public int countServers(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int[] row_cnt = new int[ROWS];
        int[] col_cnt = new int[COLS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    row_cnt[r]++;
                    col_cnt[c]++;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1 && Math.max(row_cnt[r], col_cnt[c]) > 1) {
                    res++;
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
    int countServers(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        vector<int> row_cnt(ROWS, 0), col_cnt(COLS, 0);

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    row_cnt[r]++;
                    col_cnt[c]++;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1 && max(row_cnt[r], col_cnt[c]) > 1) {
                    res++;
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
     * @return {number}
     */
    countServers(grid) {
        let ROWS = grid.length, COLS = grid[0].length;
        let row_cnt = new Array(ROWS).fill(0);
        let col_cnt = new Array(COLS).fill(0);

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1) {
                    row_cnt[r]++;
                    col_cnt[c]++;
                }
            }
        }

        let res = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1 && Math.max(row_cnt[r], col_cnt[c]) > 1) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountServers(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int[] row_cnt = new int[ROWS];
        int[] col_cnt = new int[COLS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    row_cnt[r]++;
                    col_cnt[c]++;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1 && Math.Max(row_cnt[r], col_cnt[c]) > 1) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m + n)$

> Where $m$ is the number of rows and $n$ is the number of columns of the given matrix $grid$.

---

## 3. Iteration (Space Optimized)

::tabs-start

```python
class Solution:
    def countServers(self, grid: List[List[int]]) -> int:
        res = 0
        ROWS, COLS = len(grid), len(grid[0])

        # Rows
        for r in range(ROWS):
            row_sum = sum(grid[r])
            if row_sum <= 1:
                continue
            res += row_sum
            for c in range(COLS):
                if grid[r][c]:
                    grid[r][c] = -1  # Mark

        # Cols
        for c in range(COLS):
            col_sum = unmarked = 0
            for r in range(ROWS):
                col_sum += abs(grid[r][c])
                if grid[r][c] > 0:
                    unmarked += 1
                elif grid[r][c] < 0:
                    grid[r][c] = 1 # Unmark
            if col_sum >= 2:
                res += unmarked

        return res
```

```java
public class Solution {
    public int countServers(int[][] grid) {
        int res = 0;
        int ROWS = grid.length, COLS = grid[0].length;

        // Rows
        for (int r = 0; r < ROWS; r++) {
            int rowSum = 0;
            for (int c = 0; c < COLS; c++) {
                rowSum += grid[r][c];
            }
            if (rowSum <= 1) continue;
            res += rowSum;
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) grid[r][c] = -1; // Mark
            }
        }

        // Cols
        for (int c = 0; c < COLS; c++) {
            int colSum = 0, unmarked = 0;
            for (int r = 0; r < ROWS; r++) {
                colSum += Math.abs(grid[r][c]);
                if (grid[r][c] > 0) unmarked++;
                else if (grid[r][c] < 0) grid[r][c] = 1; // Unmark
            }
            if (colSum >= 2) res += unmarked;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countServers(vector<vector<int>>& grid) {
        int res = 0;
        int ROWS = grid.size(), COLS = grid[0].size();

        // Rows
        for (int r = 0; r < ROWS; r++) {
            int rowSum = accumulate(grid[r].begin(), grid[r].end(), 0);
            if (rowSum <= 1) continue;
            res += rowSum;
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) grid[r][c] = -1; // Mark
            }
        }

        // Cols
        for (int c = 0; c < COLS; c++) {
            int colSum = 0, unmarked = 0;
            for (int r = 0; r < ROWS; r++) {
                colSum += abs(grid[r][c]);
                if (grid[r][c] > 0) unmarked++;
                else if (grid[r][c] < 0) grid[r][c] = 1; // Unmark
            }
            if (colSum >= 2) res += unmarked;
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
    countServers(grid) {
        let res = 0;
        const ROWS = grid.length, COLS = grid[0].length;

        // Rows
        for (let r = 0; r < ROWS; r++) {
            let rowSum = grid[r].reduce((a, b) => a + b, 0);
            if (rowSum <= 1) continue;
            res += rowSum;
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1) grid[r][c] = -1; // Mark
            }
        }

        // Cols
        for (let c = 0; c < COLS; c++) {
            let colSum = 0, unmarked = 0;
            for (let r = 0; r < ROWS; r++) {
                colSum += Math.abs(grid[r][c]);
                if (grid[r][c] > 0) unmarked++;
                else if (grid[r][c] < 0) grid[r][c] = 1; // Unmark
            }
            if (colSum >= 2) res += unmarked;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int CountServers(int[][] grid) {
        int res = 0;
        int ROWS = grid.Length, COLS = grid[0].Length;

        // Rows
        for (int r = 0; r < ROWS; r++) {
            int rowSum = 0;
            for (int c = 0; c < COLS; c++) {
                rowSum += grid[r][c];
            }
            if (rowSum <= 1) continue;
            res += rowSum;
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) grid[r][c] = -1; // Mark
            }
        }

        // Cols
        for (int c = 0; c < COLS; c++) {
            int colSum = 0, unmarked = 0;
            for (int r = 0; r < ROWS; r++) {
                colSum += Math.Abs(grid[r][c]);
                if (grid[r][c] > 0) unmarked++;
                else if (grid[r][c] < 0) grid[r][c] = 1; // Unmark
            }
            if (colSum >= 2) res += unmarked;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns of the given matrix $grid$.