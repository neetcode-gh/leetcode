## 1. Greedy (Overwriting the Input)

::tabs-start

```python
class Solution:
    def matrixScore(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])

        for r in range(ROWS):
            if grid[r][0] == 0:
                for c in range(COLS):
                    grid[r][c] ^= 1

        for c in range(COLS):
            one_cnt = sum(grid[r][c] for r in range(ROWS))
            if one_cnt < ROWS - one_cnt:
                for r in range(ROWS):
                    grid[r][c] ^= 1

        res = 0
        for r in range(ROWS):
            for c in range(COLS):
                res += grid[r][c] << (COLS - c - 1)

        return res
```

```java
public class Solution {
    public int matrixScore(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;

        for (int r = 0; r < ROWS; r++) {
            if (grid[r][0] == 0) {
                for (int c = 0; c < COLS; c++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        for (int c = 0; c < COLS; c++) {
            int oneCnt = 0;
            for (int r = 0; r < ROWS; r++) {
                oneCnt += grid[r][c];
            }
            if (oneCnt < ROWS - oneCnt) {
                for (int r = 0; r < ROWS; r++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                res += grid[r][c] << (COLS - c - 1);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int matrixScore(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();

        for (int r = 0; r < ROWS; r++) {
            if (grid[r][0] == 0) {
                for (int c = 0; c < COLS; c++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        for (int c = 0; c < COLS; c++) {
            int oneCnt = 0;
            for (int r = 0; r < ROWS; r++) {
                oneCnt += grid[r][c];
            }
            if (oneCnt < ROWS - oneCnt) {
                for (int r = 0; r < ROWS; r++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                res += grid[r][c] << (COLS - c - 1);
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
    matrixScore(grid) {
        let ROWS = grid.length,
            COLS = grid[0].length;

        for (let r = 0; r < ROWS; r++) {
            if (grid[r][0] === 0) {
                for (let c = 0; c < COLS; c++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        for (let c = 0; c < COLS; c++) {
            let oneCnt = 0;
            for (let r = 0; r < ROWS; r++) {
                oneCnt += grid[r][c];
            }
            if (oneCnt < ROWS - oneCnt) {
                for (let r = 0; r < ROWS; r++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        let res = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                res += grid[r][c] << (COLS - c - 1);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Greedy (Optimal)

::tabs-start

```python
class Solution:
    def matrixScore(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        res = ROWS * (1 << (COLS - 1))

        for c in range(1, COLS):
            cnt = 0
            for r in range(ROWS):
                if grid[r][c] != grid[r][0]:
                    cnt += 1

            cnt = max(cnt, ROWS - cnt)
            res += cnt * (1 << (COLS - c - 1))

        return res
```

```java
public class Solution {
    public int matrixScore(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int res = ROWS * (1 << (COLS - 1));

        for (int c = 1; c < COLS; c++) {
            int cnt = 0;
            for (int r = 0; r < ROWS; r++) {
                if (grid[r][c] != grid[r][0]) {
                    cnt++;
                }
            }
            cnt = Math.max(cnt, ROWS - cnt);
            res += cnt * (1 << (COLS - c - 1));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int matrixScore(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        int res = ROWS * (1 << (COLS - 1));

        for (int c = 1; c < COLS; c++) {
            int cnt = 0;
            for (int r = 0; r < ROWS; r++) {
                if (grid[r][c] != grid[r][0]) {
                    cnt++;
                }
            }
            cnt = max(cnt, ROWS - cnt);
            res += cnt * (1 << (COLS - c - 1));
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
    matrixScore(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        let res = ROWS * (1 << (COLS - 1));

        for (let c = 1; c < COLS; c++) {
            let cnt = 0;
            for (let r = 0; r < ROWS; r++) {
                if (grid[r][c] !== grid[r][0]) {
                    cnt++;
                }
            }
            cnt = Math.max(cnt, ROWS - cnt);
            res += cnt * (1 << (COLS - c - 1));
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns.
