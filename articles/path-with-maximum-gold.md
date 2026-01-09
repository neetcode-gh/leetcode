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

```csharp
public class Solution {
    private int ROWS, COLS;
    private int[][] directions = new int[][] {
        new int[] {1, 0}, new int[] {-1, 0},
        new int[] {0, 1}, new int[] {0, -1}
    };

    public int GetMaximumGold(int[][] grid) {
        ROWS = grid.Length;
        COLS = grid[0].Length;
        int res = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] != 0) {
                    res = Math.Max(res, Dfs(grid, r, c, new bool[ROWS, COLS]));
                }
            }
        }
        return res;
    }

    private int Dfs(int[][] grid, int r, int c, bool[,] visit) {
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS ||
            grid[r][c] == 0 || visit[r, c]) {
            return 0;
        }

        visit[r, c] = true;
        int res = grid[r][c];

        foreach (var d in directions) {
            res = Math.Max(res, grid[r][c] + Dfs(grid, r + d[0], c + d[1], visit));
        }

        visit[r, c] = false;
        return res;
    }
}
```

```go
func getMaximumGold(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    directions := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

    var dfs func(r, c int, visit [][]bool) int
    dfs = func(r, c int, visit [][]bool) int {
        if r < 0 || c < 0 || r >= ROWS || c >= COLS ||
           grid[r][c] == 0 || visit[r][c] {
            return 0
        }

        visit[r][c] = true
        res := grid[r][c]

        for _, d := range directions {
            res = max(res, grid[r][c]+dfs(r+d[0], c+d[1], visit))
        }

        visit[r][c] = false
        return res
    }

    res := 0
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if grid[r][c] != 0 {
                visit := make([][]bool, ROWS)
                for i := range visit {
                    visit[i] = make([]bool, COLS)
                }
                res = max(res, dfs(r, c, visit))
            }
        }
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private var ROWS = 0
    private var COLS = 0
    private val directions = arrayOf(intArrayOf(1, 0), intArrayOf(-1, 0),
                                     intArrayOf(0, 1), intArrayOf(0, -1))

    fun getMaximumGold(grid: Array<IntArray>): Int {
        ROWS = grid.size
        COLS = grid[0].size
        var res = 0

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (grid[r][c] != 0) {
                    res = maxOf(res, dfs(grid, r, c, Array(ROWS) { BooleanArray(COLS) }))
                }
            }
        }
        return res
    }

    private fun dfs(grid: Array<IntArray>, r: Int, c: Int, visit: Array<BooleanArray>): Int {
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS ||
            grid[r][c] == 0 || visit[r][c]) {
            return 0
        }

        visit[r][c] = true
        var res = grid[r][c]

        for (d in directions) {
            res = maxOf(res, grid[r][c] + dfs(grid, r + d[0], c + d[1], visit))
        }

        visit[r][c] = false
        return res
    }
}
```

```swift
class Solution {
    func getMaximumGold(_ grid: [[Int]]) -> Int {
        let ROWS = grid.count, COLS = grid[0].count
        let directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        func dfs(_ r: Int, _ c: Int, _ visit: inout [[Bool]]) -> Int {
            if r < 0 || c < 0 || r >= ROWS || c >= COLS ||
               grid[r][c] == 0 || visit[r][c] {
                return 0
            }

            visit[r][c] = true
            var res = grid[r][c]

            for (dr, dc) in directions {
                res = max(res, grid[r][c] + dfs(r + dr, c + dc, &visit))
            }

            visit[r][c] = false
            return res
        }

        var res = 0
        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid[r][c] != 0 {
                    var visit = [[Bool]](repeating: [Bool](repeating: false, count: COLS), count: ROWS)
                    res = max(res, dfs(r, c, &visit))
                }
            }
        }
        return res
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

```csharp
public class Solution {
    private int ROWS, COLS;
    private int[][] directions = new int[][] {
        new int[] {1, 0}, new int[] {-1, 0},
        new int[] {0, 1}, new int[] {0, -1}
    };

    public int GetMaximumGold(int[][] grid) {
        ROWS = grid.Length;
        COLS = grid[0].Length;
        int res = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] != 0) {
                    res = Math.Max(res, Dfs(grid, r, c));
                }
            }
        }
        return res;
    }

    private int Dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] == 0) {
            return 0;
        }

        int gold = grid[r][c];
        grid[r][c] = 0;
        int res = 0;

        foreach (var d in directions) {
            res = Math.Max(res, Dfs(grid, r + d[0], c + d[1]));
        }

        grid[r][c] = gold;
        return gold + res;
    }
}
```

```go
func getMaximumGold(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    directions := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

    var dfs func(r, c int) int
    dfs = func(r, c int) int {
        if r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] == 0 {
            return 0
        }

        gold := grid[r][c]
        grid[r][c] = 0
        res := 0

        for _, d := range directions {
            res = max(res, dfs(r+d[0], c+d[1]))
        }

        grid[r][c] = gold
        return gold + res
    }

    res := 0
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if grid[r][c] != 0 {
                res = max(res, dfs(r, c))
            }
        }
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private var ROWS = 0
    private var COLS = 0
    private val directions = arrayOf(intArrayOf(1, 0), intArrayOf(-1, 0),
                                     intArrayOf(0, 1), intArrayOf(0, -1))

    fun getMaximumGold(grid: Array<IntArray>): Int {
        ROWS = grid.size
        COLS = grid[0].size
        var res = 0

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (grid[r][c] != 0) {
                    res = maxOf(res, dfs(grid, r, c))
                }
            }
        }
        return res
    }

    private fun dfs(grid: Array<IntArray>, r: Int, c: Int): Int {
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] == 0) {
            return 0
        }

        val gold = grid[r][c]
        grid[r][c] = 0
        var res = 0

        for (d in directions) {
            res = maxOf(res, dfs(grid, r + d[0], c + d[1]))
        }

        grid[r][c] = gold
        return gold + res
    }
}
```

```swift
class Solution {
    func getMaximumGold(_ grid: [[Int]]) -> Int {
        var grid = grid
        let ROWS = grid.count, COLS = grid[0].count
        let directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        func dfs(_ r: Int, _ c: Int) -> Int {
            if r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] == 0 {
                return 0
            }

            let gold = grid[r][c]
            grid[r][c] = 0
            var res = 0

            for (dr, dc) in directions {
                res = max(res, dfs(r + dr, c + dc))
            }

            grid[r][c] = gold
            return gold + res
        }

        var res = 0
        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid[r][c] != 0 {
                    res = max(res, dfs(r, c))
                }
            }
        }
        return res
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

```csharp
public class Solution {
    public int GetMaximumGold(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int[,] index = new int[ROWS, COLS];
        int idx = 0;
        int[] directions = {1, 0, -1, 0, 1};

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] != 0) {
                    index[r, c] = idx++;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] > 0) {
                    var q = new Queue<(int, int, int, int)>();
                    q.Enqueue((r, c, grid[r][c], 1 << index[r, c]));

                    while (q.Count > 0) {
                        var (row, col, gold, mask) = q.Dequeue();
                        res = Math.Max(res, gold);

                        for (int i = 0; i < 4; i++) {
                            int nr = row + directions[i], nc = col + directions[i + 1];
                            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] > 0) {
                                int newIdx = index[nr, nc];
                                if ((mask & (1 << newIdx)) == 0) {
                                    q.Enqueue((nr, nc, gold + grid[nr][nc], mask | (1 << newIdx)));
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

```go
func getMaximumGold(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    directions := []int{1, 0, -1, 0, 1}
    index := make([][]int, ROWS)
    for i := range index {
        index[i] = make([]int, COLS)
    }
    idx := 0

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if grid[r][c] != 0 {
                index[r][c] = idx
                idx++
            }
        }
    }

    res := 0
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if grid[r][c] > 0 {
                type state struct {
                    row, col, gold, mask int
                }
                q := []state{{r, c, grid[r][c], 1 << index[r][c]}}

                for len(q) > 0 {
                    cur := q[0]
                    q = q[1:]
                    res = max(res, cur.gold)

                    for i := 0; i < 4; i++ {
                        nr, nc := cur.row+directions[i], cur.col+directions[i+1]
                        if nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] > 0 {
                            newIdx := index[nr][nc]
                            if (cur.mask & (1 << newIdx)) == 0 {
                                q = append(q, state{nr, nc, cur.gold + grid[nr][nc], cur.mask | (1 << newIdx)})
                            }
                        }
                    }
                }
            }
        }
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun getMaximumGold(grid: Array<IntArray>): Int {
        val ROWS = grid.size
        val COLS = grid[0].size
        val directions = intArrayOf(1, 0, -1, 0, 1)
        val index = Array(ROWS) { IntArray(COLS) }
        var idx = 0

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (grid[r][c] != 0) {
                    index[r][c] = idx++
                }
            }
        }

        var res = 0
        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (grid[r][c] > 0) {
                    val q = ArrayDeque<IntArray>()
                    q.add(intArrayOf(r, c, grid[r][c], 1 shl index[r][c]))

                    while (q.isNotEmpty()) {
                        val cur = q.removeFirst()
                        val row = cur[0]
                        val col = cur[1]
                        val gold = cur[2]
                        val mask = cur[3]
                        res = maxOf(res, gold)

                        for (i in 0 until 4) {
                            val nr = row + directions[i]
                            val nc = col + directions[i + 1]
                            if (nr in 0 until ROWS && nc in 0 until COLS && grid[nr][nc] > 0) {
                                val newIdx = index[nr][nc]
                                if ((mask and (1 shl newIdx)) == 0) {
                                    q.add(intArrayOf(nr, nc, gold + grid[nr][nc], mask or (1 shl newIdx)))
                                }
                            }
                        }
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
    func getMaximumGold(_ grid: [[Int]]) -> Int {
        let ROWS = grid.count, COLS = grid[0].count
        let directions = [1, 0, -1, 0, 1]
        var index = [[Int]](repeating: [Int](repeating: 0, count: COLS), count: ROWS)
        var idx = 0

        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid[r][c] != 0 {
                    index[r][c] = idx
                    idx += 1
                }
            }
        }

        var res = 0
        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid[r][c] > 0 {
                    var q = [(Int, Int, Int, Int)]()
                    q.append((r, c, grid[r][c], 1 << index[r][c]))

                    while !q.isEmpty {
                        let (row, col, gold, mask) = q.removeFirst()
                        res = max(res, gold)

                        for i in 0..<4 {
                            let nr = row + directions[i], nc = col + directions[i + 1]
                            if nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] > 0 {
                                let newIdx = index[nr][nc]
                                if (mask & (1 << newIdx)) == 0 {
                                    q.append((nr, nc, gold + grid[nr][nc], mask | (1 << newIdx)))
                                }
                            }
                        }
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

- Time complexity: $O(N * 3 ^ N)$
- Space complexity: $O(N)$

> Where $N$ is the number of cells which contain gold.
