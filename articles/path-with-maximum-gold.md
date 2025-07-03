## 1. Backtracking (DFS) - I

::tabs-start

```python
class Solution:
    def getMaximumGold(self, grid: list[list[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        def dfs(r, c, visit):
            if min(r, c) < 0 or r == ROWS or c == COLS or grid[r][c] == 0 or (r, c) in visit:
                return 0

            visit.add((r, c))
            res = grid[r][c]

            for dr, dc in directions:
                res = max(res, grid[r][c] + dfs(r + dr, c + dc, visit))

            visit.remove((r, c))
            return res

        res = 0
        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] != 0:
                    res = max(res, dfs(r, c, set()))
        return res
```

```java
public class Solution {
    private int ROWS, COLS;
    private int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    public int getMaximumGold(int[][] grid) {
        ROWS = grid.length;
        COLS = grid[0].length;
        int res = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] != 0) {
                    res = Math.max(res, dfs(grid, r, c, new boolean[ROWS][COLS]));
                }
            }
        }
        return res;
    }

    private int dfs(int[][] grid, int r, int c, boolean[][] visit) {
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS ||
            grid[r][c] == 0 || visit[r][c]) {
            return 0;
        }

        visit[r][c] = true;
        int res = grid[r][c];

        for (int[] d : directions) {
            res = Math.max(res, grid[r][c] + dfs(grid, r + d[0], c + d[1], visit));
        }

        visit[r][c] = false;
        return res;
    }
}
```

```cpp
class Solution {
public:
    int ROWS, COLS;
    vector<vector<int>> directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    int getMaximumGold(vector<vector<int>>& grid) {
        ROWS = grid.size();
        COLS = grid[0].size();
        int res = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] != 0) {
                    vector<vector<bool>> visit(ROWS, vector<bool>(COLS, false));
                    res = max(res, dfs(grid, r, c, visit));
                }
            }
        }
        return res;
    }

private:
    int dfs(vector<vector<int>>& grid, int r, int c, vector<vector<bool>>& visit) {
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] == 0 || visit[r][c]) {
            return 0;
        }

        visit[r][c] = true;
        int res = grid[r][c];

        for (auto& d : directions) {
            res = max(res, grid[r][c] + dfs(grid, r + d[0], c + d[1], visit));
        }

        visit[r][c] = false;
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
    getMaximumGold(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        const directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];

        const dfs = (r, c, visit) => {
            if (
                r < 0 ||
                c < 0 ||
                r >= ROWS ||
                c >= COLS ||
                grid[r][c] === 0 ||
                visit[r][c]
            ) {
                return 0;
            }

            visit[r][c] = true;
            let res = grid[r][c];

            for (const [dr, dc] of directions) {
                res = Math.max(res, grid[r][c] + dfs(r + dr, c + dc, visit));
            }

            visit[r][c] = false;
            return res;
        };

        let res = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] !== 0) {
                    let visit = Array.from({ length: ROWS }, () =>
                        Array(COLS).fill(false),
                    );
                    res = Math.max(res, dfs(r, c, visit));
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N * 3 ^ N)$
- Space complexity: $O(N)$

> Where $N$ is the number of cells which contain gold.

---

## 2. Backtracking (DFS) - II

::tabs-start

```python
class Solution:
    def getMaximumGold(self, grid: list[list[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        def dfs(r, c):
            if min(r, c) < 0 or r == ROWS or c == COLS or grid[r][c] == 0:
                return 0

            gold = grid[r][c]
            grid[r][c] = 0
            res = 0

            for dr, dc in directions:
                res = max(res, dfs(r + dr, c + dc))

            grid[r][c] = gold
            return gold + res

        res = 0
        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] != 0:
                    res = max(res, dfs(r, c))
        return res
```

```java
public class Solution {
    private int ROWS, COLS;
    private int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    public int getMaximumGold(int[][] grid) {
        ROWS = grid.length;
        COLS = grid[0].length;
        int res = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] != 0) {
                    res = Math.max(res, dfs(grid, r, c));
                }
            }
        }
        return res;
    }

    private int dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] == 0) {
            return 0;
        }

        int gold = grid[r][c];
        grid[r][c] = 0;
        int res = 0;

        for (int[] d : directions) {
            res = Math.max(res, dfs(grid, r + d[0], c + d[1]));
        }

        grid[r][c] = gold;
        return gold + res;
    }
}
```

```cpp
class Solution {
public:
    int ROWS, COLS;
    vector<vector<int>> directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    int getMaximumGold(vector<vector<int>>& grid) {
        ROWS = grid.size();
        COLS = grid[0].size();
        int res = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] != 0) {
                    res = max(res, dfs(grid, r, c));
                }
            }
        }
        return res;
    }

private:
    int dfs(vector<vector<int>>& grid, int r, int c) {
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] == 0) {
            return 0;
        }

        int gold = grid[r][c];
        grid[r][c] = 0;
        int res = 0;

        for (auto& d : directions) {
            res = max(res, dfs(grid, r + d[0], c + d[1]));
        }

        grid[r][c] = gold;
        return gold + res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    getMaximumGold(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        const directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];

        const dfs = (r, c) => {
            if (r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] === 0) {
                return 0;
            }

            let gold = grid[r][c];
            grid[r][c] = 0;
            let res = 0;

            for (const [dr, dc] of directions) {
                res = Math.max(res, dfs(r + dr, c + dc));
            }

            grid[r][c] = gold;
            return gold + res;
        };

        let res = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] !== 0) {
                    res = Math.max(res, dfs(r, c));
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N * 3 ^ N)$
- Space complexity: $O(N)$ for recursion stack.

> Where $N$ is the number of cells which contain gold.

---

## 3. Backtracking (BFS)

::tabs-start

```python
class Solution:
    def getMaximumGold(self, grid: list[list[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        directions = [1, 0, -1, 0, 1]
        index = [[0] * COLS for _ in range(ROWS)]
        idx = 0

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] != 0:
                    index[r][c] = idx
                    idx += 1

        res = 0
        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] > 0:
                    q = deque([(r, c, grid[r][c], 1 << index[r][c])])
                    while q:
                        row, col, gold, mask = q.popleft()
                        res = max(res, gold)

                        for i in range(4):
                            nr, nc = row + directions[i], col + directions[i + 1]
                            if 0 <= nr < ROWS and 0 <= nc < COLS and grid[nr][nc] > 0:
                                idx = index[nr][nc]
                                if not (mask & (1 << idx)):
                                    q.append((nr, nc, gold + grid[nr][nc], mask | (1 << idx)))

        return res
```

```java
public class Solution {
    public int getMaximumGold(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int[][] index = new int[ROWS][COLS];
        int idx = 0;
        int[] directions = {1, 0, -1, 0, 1};

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] != 0) {
                    index[r][c] = idx++;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] > 0) {
                    Queue<int[]> q = new LinkedList<>();
                    q.offer(new int[]{r, c, grid[r][c], 1 << index[r][c]});

                    while (!q.isEmpty()) {
                        int[] cur = q.poll();
                        int row = cur[0], col = cur[1], gold = cur[2], mask = cur[3];
                        res = Math.max(res, gold);

                        for (int i = 0; i < 4; i++) {
                            int nr = row + directions[i], nc = col + directions[i + 1];
                            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] > 0) {
                                int newIdx = index[nr][nc];
                                if ((mask & (1 << newIdx)) == 0) {
                                    q.offer(new int[]{nr, nc, gold + grid[nr][nc], mask | (1 << newIdx)});
                                }
                            }
                        }
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
    int getMaximumGold(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        vector<vector<int>> index(ROWS, vector<int>(COLS, 0));
        int idx = 0;
        int directions[] = {1, 0, -1, 0, 1};

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] != 0) {
                    index[r][c] = idx++;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] > 0) {
                    queue<tuple<int, int, int, int>> q;
                    q.push({r, c, grid[r][c], 1 << index[r][c]});

                    while (!q.empty()) {
                        auto [row, col, gold, mask] = q.front();q.pop();
                        res = max(res, gold);
                        for (int i = 0; i < 4; i++) {
                            int nr = row + directions[i], nc = col + directions[i + 1];
                            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] > 0) {
                                int newIdx = index[nr][nc];
                                if ((mask & (1 << newIdx)) == 0) {
                                    q.push({nr, nc, gold + grid[nr][nc], mask | (1 << newIdx)});
                                }
                            }
                        }
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
     * @return {number}
     */
    getMaximumGold(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        const index = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
        let idx = 0;
        const directions = [1, 0, -1, 0, 1];

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] !== 0) {
                    index[r][c] = idx++;
                }
            }
        }

        let res = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] > 0) {
                    const q = new Queue([[r, c, grid[r][c], 1 << index[r][c]]]);

                    while (!q.isEmpty()) {
                        const [row, col, gold, mask] = q.pop();
                        res = Math.max(res, gold);
                        for (let i = 0; i < 4; i++) {
                            const nr = row + directions[i],
                                nc = col + directions[i + 1];
                            if (
                                nr >= 0 &&
                                nr < ROWS &&
                                nc >= 0 &&
                                nc < COLS &&
                                grid[nr][nc] > 0
                            ) {
                                const newIdx = index[nr][nc];
                                if (!(mask & (1 << newIdx))) {
                                    q.push([
                                        nr,
                                        nc,
                                        gold + grid[nr][nc],
                                        mask | (1 << newIdx),
                                    ]);
                                }
                            }
                        }
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

- Time complexity: $O(N * 3 ^ N)$
- Space complexity: $O(N)$

> Where $N$ is the number of cells which contain gold.
