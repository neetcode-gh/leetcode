## 1. Depth First Search - I

### Intuition

A closed island is a group of land cells (`0`s) that is completely surrounded by water (`1`s) and does not touch the grid boundary. The key observation is that any island touching the boundary cannot be closed. We use `dfs` to explore each island, and during exploration, if we ever go out of bounds, we know this island is not closed. We return a boolean indicating whether the entire island stayed within bounds.

### Algorithm

1. Create a `visited` set to track explored cells.
2. For each unvisited land cell, start a `dfs`.
3. In the `dfs`:
   - If out of bounds, return `false` (not closed).
   - If the cell is water or already `visited`, return `true` (valid boundary).
   - Mark the cell as `visited`.
   - Recursively check all four neighbors, combining results with AND logic (all must be valid for the island to be closed).
4. If the `dfs` returns `true` for an island, increment the result counter.
5. Return the total count of closed islands.

::tabs-start

```python
class Solution:
    def closedIsland(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        visit = set()

        def dfs(r, c):
            if r < 0 or c < 0 or r == ROWS or c == COLS:
                return 0  # False
            if grid[r][c] == 1 or (r, c) in visit:
                return 1  # True

            visit.add((r, c))
            res = True
            for dx, dy in directions:
                if not dfs(r + dx, c + dy):
                    res = False
            return res

        res = 0
        for r in range(ROWS):
            for c in range(COLS):
                if not grid[r][c] and (r, c) not in visit:
                    res += dfs(r, c)

        return res
```

```java
public class Solution {
    private int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
    private boolean[][] visit;
    private int ROWS, COLS;

    public int closedIsland(int[][] grid) {
        ROWS = grid.length;
        COLS = grid[0].length;
        visit = new boolean[ROWS][COLS];

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0 && !visit[r][c]) {
                    if (dfs(grid, r, c)) {
                        res++;
                    }
                }
            }
        }
        return res;
    }

    private boolean dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r == ROWS || c == COLS) {
            return false;
        }
        if (grid[r][c] == 1 || visit[r][c]) {
            return true;
        }

        visit[r][c] = true;
        boolean res = true;
        for (int[] d : directions) {
            if (!dfs(grid, r + d[0], c + d[1])) {
                res = false;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
    int ROWS, COLS;
    vector<vector<int>> directions;
    vector<vector<bool>> visit;

public:
    int closedIsland(vector<vector<int>>& grid) {
        ROWS = grid.size();
        COLS = grid[0].size();
        directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        visit.assign(ROWS, vector<bool>(COLS, false));

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0 && !visit[r][c]) {
                    if (dfs(grid, r, c)) {
                        res++;
                    }
                }
            }
        }
        return res;
    }

private:
    bool dfs(vector<vector<int>>& grid, int r, int c) {
        if (r < 0 || c < 0 || r == ROWS || c == COLS) {
            return false;
        }
        if (grid[r][c] == 1 || visit[r][c]) {
            return true;
        }

        visit[r][c] = true;
        bool res = true;
        for (auto& d : directions) {
            if (!dfs(grid, r + d[0], c + d[1])) {
                res = false;
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
    closedIsland(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        const directions = [0, 1, 0, -1, 0];
        const visit = Array.from({ length: ROWS }, () =>
            Array(COLS).fill(false),
        );

        const dfs = (r, c) => {
            if (r < 0 || c < 0 || r === ROWS || c === COLS) return false;
            if (grid[r][c] === 1 || visit[r][c]) return true;

            visit[r][c] = true;
            let res = true;
            for (let d = 0; d < 4; d++) {
                if (!dfs(r + directions[d], c + directions[d + 1])) {
                    res = false;
                }
            }
            return res;
        };

        let res = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 0 && !visit[r][c]) {
                    if (dfs(r, c)) res++;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private int[][] directions = new int[][] {
        new int[] {0, 1}, new int[] {0, -1},
        new int[] {1, 0}, new int[] {-1, 0}
    };
    private bool[,] visit;
    private int ROWS, COLS;

    public int ClosedIsland(int[][] grid) {
        ROWS = grid.Length;
        COLS = grid[0].Length;
        visit = new bool[ROWS, COLS];

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0 && !visit[r, c]) {
                    if (Dfs(grid, r, c)) {
                        res++;
                    }
                }
            }
        }
        return res;
    }

    private bool Dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r == ROWS || c == COLS) {
            return false;
        }
        if (grid[r][c] == 1 || visit[r, c]) {
            return true;
        }

        visit[r, c] = true;
        bool res = true;
        foreach (var d in directions) {
            if (!Dfs(grid, r + d[0], c + d[1])) {
                res = false;
            }
        }
        return res;
    }
}
```

```go
func closedIsland(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    directions := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
    visit := make([][]bool, ROWS)
    for i := range visit {
        visit[i] = make([]bool, COLS)
    }

    var dfs func(r, c int) bool
    dfs = func(r, c int) bool {
        if r < 0 || c < 0 || r == ROWS || c == COLS {
            return false
        }
        if grid[r][c] == 1 || visit[r][c] {
            return true
        }

        visit[r][c] = true
        res := true
        for _, d := range directions {
            if !dfs(r+d[0], c+d[1]) {
                res = false
            }
        }
        return res
    }

    res := 0
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if grid[r][c] == 0 && !visit[r][c] {
                if dfs(r, c) {
                    res++
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    private val directions = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1),
                                      intArrayOf(1, 0), intArrayOf(-1, 0))
    private lateinit var visit: Array<BooleanArray>
    private var ROWS = 0
    private var COLS = 0

    fun closedIsland(grid: Array<IntArray>): Int {
        ROWS = grid.size
        COLS = grid[0].size
        visit = Array(ROWS) { BooleanArray(COLS) }

        var res = 0
        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (grid[r][c] == 0 && !visit[r][c]) {
                    if (dfs(grid, r, c)) {
                        res++
                    }
                }
            }
        }
        return res
    }

    private fun dfs(grid: Array<IntArray>, r: Int, c: Int): Boolean {
        if (r < 0 || c < 0 || r == ROWS || c == COLS) {
            return false
        }
        if (grid[r][c] == 1 || visit[r][c]) {
            return true
        }

        visit[r][c] = true
        var res = true
        for (d in directions) {
            if (!dfs(grid, r + d[0], c + d[1])) {
                res = false
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func closedIsland(_ grid: [[Int]]) -> Int {
        let ROWS = grid.count, COLS = grid[0].count
        let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        var visit = Array(repeating: Array(repeating: false, count: COLS), count: ROWS)

        func dfs(_ r: Int, _ c: Int) -> Bool {
            if r < 0 || c < 0 || r == ROWS || c == COLS {
                return false
            }
            if grid[r][c] == 1 || visit[r][c] {
                return true
            }

            visit[r][c] = true
            var res = true
            for d in directions {
                if !dfs(r + d[0], c + d[1]) {
                    res = false
                }
            }
            return res
        }

        var res = 0
        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid[r][c] == 0 && !visit[r][c] {
                    if dfs(r, c) {
                        res += 1
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

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given grid.

---

## 2. Depth First Search - II

### Intuition

Instead of tracking whether each island is closed during `dfs`, we can first eliminate all islands that touch the boundary. By running `dfs` from every boundary land cell and marking those cells as water, we effectively remove all non-closed islands. After this preprocessing, any remaining land cells must belong to closed islands, so we simply count them.

### Algorithm

1. Run `dfs` from every land cell on the grid boundary (first/last row and first/last column) to mark those cells as water (`1`).
2. This "sinks" all islands connected to the boundary.
3. Iterate through the interior cells of the grid.
4. For each unvisited land cell, run `dfs` to mark the entire island as `visited` and increment the count.
5. Return the count of closed islands.

::tabs-start

```python
class Solution:
    def closedIsland(self, grid: list[list[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        directions = [0, 1, 0, -1, 0]

        def dfs(r, c):
            if r < 0 or c < 0 or r == ROWS or c == COLS or grid[r][c] == 1:
                return
            grid[r][c] = 1
            for d in range(4):
                dfs(r + directions[d], c + directions[d + 1])

        for r in range(ROWS):
            dfs(r, 0)
            dfs(r, COLS - 1)
        for c in range(COLS):
            dfs(0, c)
            dfs(ROWS - 1, c)

        res = 0
        for r in range(1, ROWS - 1):
            for c in range(1, COLS - 1):
                if grid[r][c] == 0:
                    dfs(r, c)
                    res += 1
        return res
```

```java
public class Solution {
    private int ROWS, COLS;
    private int[] directions = {0, 1, 0, -1, 0};

    public int closedIsland(int[][] grid) {
        ROWS = grid.length;
        COLS = grid[0].length;

        for (int r = 0; r < ROWS; r++) {
            dfs(grid, r, 0);
            dfs(grid, r, COLS - 1);
        }
        for (int c = 0; c < COLS; c++) {
            dfs(grid, 0, c);
            dfs(grid, ROWS - 1, c);
        }

        int res = 0;
        for (int r = 1; r < ROWS - 1; r++) {
            for (int c = 1; c < COLS - 1; c++) {
                if (grid[r][c] == 0) {
                    dfs(grid, r, c);
                    res++;
                }
            }
        }
        return res;
    }

    private void dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] == 1) {
            return;
        }
        grid[r][c] = 1;
        for (int d = 0; d < 4; d++) {
            dfs(grid, r + directions[d], c + directions[d + 1]);
        }
    }
}
```

```cpp
class Solution {
    const int directions[5] = {0, 1, 0, -1, 0};
    int ROWS, COLS;

public:
    int closedIsland(vector<vector<int>>& grid) {
        ROWS = grid.size();
        COLS = grid[0].size();

        for (int r = 0; r < ROWS; r++) {
            dfs(grid, r, 0);
            dfs(grid, r, COLS - 1);
        }
        for (int c = 0; c < COLS; c++) {
            dfs(grid, 0, c);
            dfs(grid, ROWS - 1, c);
        }

        int res = 0;
        for (int r = 1; r < ROWS - 1; r++) {
            for (int c = 1; c < COLS - 1; c++) {
                if (grid[r][c] == 0) {
                    dfs(grid, r, c);
                    res++;
                }
            }
        }
        return res;
    }

private:
    void dfs(vector<vector<int>>& grid, int r, int c) {
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] == 1) {
            return;
        }
        grid[r][c] = 1;
        for (int d = 0; d < 4; d++) {
            dfs(grid, r + directions[d], c + directions[d + 1]);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    closedIsland(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        const directions = [0, 1, 0, -1, 0];

        const dfs = (r, c) => {
            if (r < 0 || c < 0 || r === ROWS || c === COLS || grid[r][c] === 1)
                return;
            grid[r][c] = 1;
            for (let d = 0; d < 4; d++) {
                dfs(r + directions[d], c + directions[d + 1]);
            }
        };

        for (let r = 0; r < ROWS; r++) {
            dfs(r, 0);
            dfs(r, COLS - 1);
        }
        for (let c = 0; c < COLS; c++) {
            dfs(0, c);
            dfs(ROWS - 1, c);
        }

        let res = 0;
        for (let r = 1; r < ROWS - 1; r++) {
            for (let c = 1; c < COLS - 1; c++) {
                if (grid[r][c] === 0) {
                    dfs(r, c);
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
    private int ROWS, COLS;
    private int[] directions = {0, 1, 0, -1, 0};

    public int ClosedIsland(int[][] grid) {
        ROWS = grid.Length;
        COLS = grid[0].Length;

        for (int r = 0; r < ROWS; r++) {
            Dfs(grid, r, 0);
            Dfs(grid, r, COLS - 1);
        }
        for (int c = 0; c < COLS; c++) {
            Dfs(grid, 0, c);
            Dfs(grid, ROWS - 1, c);
        }

        int res = 0;
        for (int r = 1; r < ROWS - 1; r++) {
            for (int c = 1; c < COLS - 1; c++) {
                if (grid[r][c] == 0) {
                    Dfs(grid, r, c);
                    res++;
                }
            }
        }
        return res;
    }

    private void Dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] == 1) {
            return;
        }
        grid[r][c] = 1;
        for (int d = 0; d < 4; d++) {
            Dfs(grid, r + directions[d], c + directions[d + 1]);
        }
    }
}
```

```go
func closedIsland(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    directions := []int{0, 1, 0, -1, 0}

    var dfs func(r, c int)
    dfs = func(r, c int) {
        if r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] == 1 {
            return
        }
        grid[r][c] = 1
        for d := 0; d < 4; d++ {
            dfs(r+directions[d], c+directions[d+1])
        }
    }

    for r := 0; r < ROWS; r++ {
        dfs(r, 0)
        dfs(r, COLS-1)
    }
    for c := 0; c < COLS; c++ {
        dfs(0, c)
        dfs(ROWS-1, c)
    }

    res := 0
    for r := 1; r < ROWS-1; r++ {
        for c := 1; c < COLS-1; c++ {
            if grid[r][c] == 0 {
                dfs(r, c)
                res++
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    private val directions = intArrayOf(0, 1, 0, -1, 0)
    private var ROWS = 0
    private var COLS = 0

    fun closedIsland(grid: Array<IntArray>): Int {
        ROWS = grid.size
        COLS = grid[0].size

        for (r in 0 until ROWS) {
            dfs(grid, r, 0)
            dfs(grid, r, COLS - 1)
        }
        for (c in 0 until COLS) {
            dfs(grid, 0, c)
            dfs(grid, ROWS - 1, c)
        }

        var res = 0
        for (r in 1 until ROWS - 1) {
            for (c in 1 until COLS - 1) {
                if (grid[r][c] == 0) {
                    dfs(grid, r, c)
                    res++
                }
            }
        }
        return res
    }

    private fun dfs(grid: Array<IntArray>, r: Int, c: Int) {
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] == 1) {
            return
        }
        grid[r][c] = 1
        for (d in 0 until 4) {
            dfs(grid, r + directions[d], c + directions[d + 1])
        }
    }
}
```

```swift
class Solution {
    func closedIsland(_ grid: [[Int]]) -> Int {
        var grid = grid
        let ROWS = grid.count, COLS = grid[0].count
        let directions = [0, 1, 0, -1, 0]

        func dfs(_ r: Int, _ c: Int) {
            if r < 0 || c < 0 || r >= ROWS || c >= COLS || grid[r][c] == 1 {
                return
            }
            grid[r][c] = 1
            for d in 0..<4 {
                dfs(r + directions[d], c + directions[d + 1])
            }
        }

        for r in 0..<ROWS {
            dfs(r, 0)
            dfs(r, COLS - 1)
        }
        for c in 0..<COLS {
            dfs(0, c)
            dfs(ROWS - 1, c)
        }

        var res = 0
        for r in 1..<(ROWS - 1) {
            for c in 1..<(COLS - 1) {
                if grid[r][c] == 0 {
                    dfs(r, c)
                    res += 1
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given grid.

---

## 3. Breadth First Search

### Intuition

BFS provides an iterative alternative to `dfs` for exploring islands. Starting from a land cell, we use a queue to visit all connected land cells level by level. While exploring, if any neighbor would take us out of bounds, we know the island is not closed. We track this with a flag and only count the island if it never touched the boundary.

### Algorithm

1. Create a `visited` array to track explored cells.
2. For each unvisited land cell, start a `bfs`.
3. Initialize a queue with the starting cell and a flag `isClosed = true`.
4. While the queue is not empty:
   - Dequeue a cell and explore its four neighbors.
   - If a neighbor is out of bounds, set `isClosed = false` (but continue `bfs` to mark all cells).
   - If the neighbor is valid land and unvisited, mark it `visited` and add to queue.
5. After `bfs` completes, if `isClosed` is `true`, increment the result.
6. Return the total count of closed islands.

::tabs-start

```python
class Solution:
    def closedIsland(self, grid: list[list[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        visit = set()
        res = 0

        def bfs(r, c):
            q = deque([(r, c)])
            visit.add((r, c))
            is_closed = True

            while q:
                x, y = q.popleft()
                for dx, dy in directions:
                    nx, ny = x + dx, y + dy
                    if nx < 0 or ny < 0 or nx >= ROWS or ny >= COLS:
                        is_closed = False
                        continue
                    if grid[nx][ny] == 1 or (nx, ny) in visit:
                        continue
                    visit.add((nx, ny))
                    q.append((nx, ny))

            return is_closed

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == 0 and (r, c) not in visit:
                    res += bfs(r, c)

        return res
```

```java
public class Solution {
    private int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
    private int ROWS, COLS;
    private boolean[][] visit;

    public int closedIsland(int[][] grid) {
        ROWS = grid.length;
        COLS = grid[0].length;
        visit = new boolean[ROWS][COLS];
        int res = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0 && !visit[r][c]) {
                    if (bfs(grid, r, c)) res++;
                }
            }
        }
        return res;
    }

    private boolean bfs(int[][] grid, int r, int c) {
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{r, c});
        visit[r][c] = true;
        boolean isClosed = true;

        while (!q.isEmpty()) {
            int[] cell = q.poll();
            int x = cell[0], y = cell[1];

            for (int[] d : directions) {
                int nx = x + d[0], ny = y + d[1];
                if (nx < 0 || ny < 0 || nx >= ROWS || ny >= COLS) {
                    isClosed = false;
                    continue;
                }
                if (grid[nx][ny] == 1 || visit[nx][ny]) continue;
                visit[nx][ny] = true;
                q.offer(new int[]{nx, ny});
            }
        }
        return isClosed;
    }
}
```

```cpp
class Solution {
    int directions[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
    int ROWS, COLS;
    vector<vector<bool>> visit;

public:
    int closedIsland(vector<vector<int>>& grid) {
        ROWS = grid.size();
        COLS = grid[0].size();
        visit.assign(ROWS, vector<bool>(COLS, false));
        int res = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0 && !visit[r][c]) {
                    if (bfs(grid, r, c)) res++;
                }
            }
        }
        return res;
    }

private:
    bool bfs(vector<vector<int>>& grid, int r, int c) {
        queue<pair<int, int>> q;
        q.push({r, c});
        visit[r][c] = true;
        bool isClosed = true;

        while (!q.empty()) {
            auto [x, y] = q.front();q.pop();
            for (auto& d : directions) {
                int nx = x + d[0], ny = y + d[1];
                if (nx < 0 || ny < 0 || nx >= ROWS || ny >= COLS) {
                    isClosed = false;
                    continue;
                }
                if (grid[nx][ny] == 1 || visit[nx][ny]) continue;
                visit[nx][ny] = true;
                q.push({nx, ny});
            }
        }
        return isClosed;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    closedIsland(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        const directions = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
        const visit = Array.from({ length: ROWS }, () =>
            Array(COLS).fill(false),
        );
        let res = 0;

        const bfs = (r, c) => {
            const q = new Queue([[r, c]]);
            visit[r][c] = true;
            let isClosed = true;

            while (!q.isEmpty()) {
                const [x, y] = q.pop();
                for (const [dx, dy] of directions) {
                    const nx = x + dx,
                        ny = y + dy;
                    if (nx < 0 || ny < 0 || nx >= ROWS || ny >= COLS) {
                        isClosed = false;
                        continue;
                    }
                    if (grid[nx][ny] === 1 || visit[nx][ny]) continue;
                    visit[nx][ny] = true;
                    q.push([nx, ny]);
                }
            }
            return isClosed;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 0 && !visit[r][c]) {
                    if (bfs(r, c)) res++;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private int[][] directions = new int[][] {
        new int[] {0, 1}, new int[] {0, -1},
        new int[] {1, 0}, new int[] {-1, 0}
    };
    private int ROWS, COLS;
    private bool[,] visit;

    public int ClosedIsland(int[][] grid) {
        ROWS = grid.Length;
        COLS = grid[0].Length;
        visit = new bool[ROWS, COLS];
        int res = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0 && !visit[r, c]) {
                    if (Bfs(grid, r, c)) res++;
                }
            }
        }
        return res;
    }

    private bool Bfs(int[][] grid, int r, int c) {
        Queue<int[]> q = new Queue<int[]>();
        q.Enqueue(new int[] {r, c});
        visit[r, c] = true;
        bool isClosed = true;

        while (q.Count > 0) {
            int[] cell = q.Dequeue();
            int x = cell[0], y = cell[1];

            foreach (var d in directions) {
                int nx = x + d[0], ny = y + d[1];
                if (nx < 0 || ny < 0 || nx >= ROWS || ny >= COLS) {
                    isClosed = false;
                    continue;
                }
                if (grid[nx][ny] == 1 || visit[nx, ny]) continue;
                visit[nx, ny] = true;
                q.Enqueue(new int[] {nx, ny});
            }
        }
        return isClosed;
    }
}
```

```go
func closedIsland(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    directions := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
    visit := make([][]bool, ROWS)
    for i := range visit {
        visit[i] = make([]bool, COLS)
    }

    bfs := func(r, c int) bool {
        queue := [][]int{{r, c}}
        visit[r][c] = true
        isClosed := true

        for len(queue) > 0 {
            cell := queue[0]
            queue = queue[1:]
            x, y := cell[0], cell[1]

            for _, d := range directions {
                nx, ny := x+d[0], y+d[1]
                if nx < 0 || ny < 0 || nx >= ROWS || ny >= COLS {
                    isClosed = false
                    continue
                }
                if grid[nx][ny] == 1 || visit[nx][ny] {
                    continue
                }
                visit[nx][ny] = true
                queue = append(queue, []int{nx, ny})
            }
        }
        return isClosed
    }

    res := 0
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if grid[r][c] == 0 && !visit[r][c] {
                if bfs(r, c) {
                    res++
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    private val directions = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1),
                                      intArrayOf(1, 0), intArrayOf(-1, 0))
    private lateinit var visit: Array<BooleanArray>
    private var ROWS = 0
    private var COLS = 0

    fun closedIsland(grid: Array<IntArray>): Int {
        ROWS = grid.size
        COLS = grid[0].size
        visit = Array(ROWS) { BooleanArray(COLS) }
        var res = 0

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (grid[r][c] == 0 && !visit[r][c]) {
                    if (bfs(grid, r, c)) res++
                }
            }
        }
        return res
    }

    private fun bfs(grid: Array<IntArray>, r: Int, c: Int): Boolean {
        val queue = ArrayDeque<IntArray>()
        queue.add(intArrayOf(r, c))
        visit[r][c] = true
        var isClosed = true

        while (queue.isNotEmpty()) {
            val (x, y) = queue.removeFirst()

            for (d in directions) {
                val nx = x + d[0]
                val ny = y + d[1]
                if (nx < 0 || ny < 0 || nx >= ROWS || ny >= COLS) {
                    isClosed = false
                    continue
                }
                if (grid[nx][ny] == 1 || visit[nx][ny]) continue
                visit[nx][ny] = true
                queue.add(intArrayOf(nx, ny))
            }
        }
        return isClosed
    }
}
```

```swift
class Solution {
    func closedIsland(_ grid: [[Int]]) -> Int {
        let ROWS = grid.count, COLS = grid[0].count
        let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        var visit = Array(repeating: Array(repeating: false, count: COLS), count: ROWS)

        func bfs(_ r: Int, _ c: Int) -> Bool {
            var queue = [[r, c]]
            visit[r][c] = true
            var isClosed = true
            var idx = 0

            while idx < queue.count {
                let x = queue[idx][0], y = queue[idx][1]
                idx += 1

                for d in directions {
                    let nx = x + d[0], ny = y + d[1]
                    if nx < 0 || ny < 0 || nx >= ROWS || ny >= COLS {
                        isClosed = false
                        continue
                    }
                    if grid[nx][ny] == 1 || visit[nx][ny] { continue }
                    visit[nx][ny] = true
                    queue.append([nx, ny])
                }
            }
            return isClosed
        }

        var res = 0
        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid[r][c] == 0 && !visit[r][c] {
                    if bfs(r, c) {
                        res += 1
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

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given grid.

---

## 4. Disjoint Set Union

### Intuition

We can model this problem using Union-Find (DSU). Each land cell belongs to a component, and we union adjacent land cells together. The trick is to also create a virtual "boundary" node. Whenever a land cell is on the boundary or adjacent to the grid edge, we union it with this boundary node. After processing, any land component that shares the same root as the boundary node is not closed. We count components whose root differs from the boundary node's root.

### Algorithm

1. Create a DSU with size `ROWS * COLS + 1`, where index `N = ROWS * COLS` represents the boundary.
2. For each land cell, check its four neighbors:
   - If the neighbor is out of bounds, `union` the cell with the boundary node `N`.
   - If the neighbor is valid land, `union` the two cells.
3. Find the `root` of the boundary node.
4. Iterate through all land cells. If a cell is its own `root` (representative of a component) and that `root` differs from the boundary `root`, count it.
5. Return the count of distinct closed island components.

::tabs-start

```python
class DSU:
    def __init__(self, n):
        self.Parent = list(range(n + 1))
        self.Size = [1] * (n + 1)

    def find(self, node):
        if self.Parent[node] != node:
            self.Parent[node] = self.find(self.Parent[node])
        return self.Parent[node]

    def union(self, u, v):
        pu, pv = self.find(u), self.find(v)
        if pu == pv:
            return False
        if self.Size[pu] >= self.Size[pv]:
            self.Size[pu] += self.Size[pv]
            self.Parent[pv] = pu
        else:
            self.Size[pv] += self.Size[pu]
            self.Parent[pu] = pv
        return True

class Solution:
    def closedIsland(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        N = ROWS * COLS
        def index(r, c):
            return r * COLS + c

        dsu = DSU(N)
        directions = [0, 1, 0, -1, 0]
        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == 0:
                    for d in range(4):
                        nr, nc = r + directions[d], c + directions[d + 1]
                        if min(nr, nc) < 0 or nr == ROWS or nc == COLS:
                            dsu.union(N, index(r, c))
                        elif grid[nr][nc] == 0:
                            dsu.union(index(r, c), index(nr, nc))

        res = 0
        rootN = dsu.find(N)
        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == 1:
                    continue
                node = index(r, c)
                root = dsu.find(node)
                if root == node and root != rootN:
                    res += 1
        return res
```

```java
class DSU {
    int[] Parent, Size;

    public DSU(int n) {
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    public int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    public boolean union(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (Size[pu] >= Size[pv]) {
            Size[pu] += Size[pv];
            Parent[pv] = pu;
        } else {
            Size[pv] += Size[pu];
            Parent[pu] = pv;
        }
        return true;
    }
}

public class Solution {
    public int closedIsland(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int N = ROWS * COLS;

        DSU dsu = new DSU(N);
        int[] directions = {0, 1, 0, -1, 0};

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0) {
                    for (int d = 0; d < 4; d++) {
                        int nr = r + directions[d], nc = c + directions[d + 1];
                        if (nr < 0 || nc < 0 || nr == ROWS || nc == COLS) {
                            dsu.union(N, r * COLS + c);
                        } else if (grid[nr][nc] == 0) {
                            dsu.union(r * COLS + c, nr * COLS + nc);
                        }
                    }
                }
            }
        }

        int res = 0, rootN = dsu.find(N);
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0) {
                    int node = r * COLS + c;
                    int root = dsu.find(node);
                    if (root == node && root != rootN) {
                        res++;
                    }
                }
            }
        }
        return res;
    }
}
```

```cpp
class DSU {
public:
    vector<int> Parent, Size;

    DSU(int n) {
        Parent.resize(n + 1);
        Size.resize(n + 1, 1);
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
        }
    }

    int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    bool unionSets(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (Size[pu] >= Size[pv]) {
            Size[pu] += Size[pv];
            Parent[pv] = pu;
        } else {
            Size[pv] += Size[pu];
            Parent[pu] = pv;
        }
        return true;
    }
};

class Solution {
public:
    int closedIsland(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        int N = ROWS * COLS;

        DSU dsu(N);
        int directions[5] = {0, 1, 0, -1, 0};

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0) {
                    for (int d = 0; d < 4; d++) {
                        int nr = r + directions[d], nc = c + directions[d + 1];
                        if (nr < 0 || nc < 0 || nr == ROWS || nc == COLS) {
                            dsu.unionSets(N, r * COLS + c);
                        } else if (grid[nr][nc] == 0) {
                            dsu.unionSets(r * COLS + c, nr * COLS + nc);
                        }
                    }
                }
            }
        }

        int res = 0, rootN = dsu.find(N);
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0) {
                    int node = r * COLS + c;
                    int root = dsu.find(node);
                    if (root == node && root != rootN) {
                        res++;
                    }
                }
            }
        }
        return res;
    }
};
```

```javascript
class DSU {
    /**
     * @constructor
     * @param {number} n
     */
    constructor(n) {
        this.parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.size = new Array(n + 1).fill(1);
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node) {
        if (this.parent[node] !== node) {
            this.parent[node] = this.find(this.parent[node]);
        }
        return this.parent[node];
    }

    /**
     * @param {number} u
     * @param {number} u=v
     * @return {boolean}
     */
    union(u, v) {
        let pu = this.find(u),
            pv = this.find(v);
        if (pu === pv) return false;
        if (this.size[pu] >= this.size[pv]) {
            this.size[pu] += this.size[pv];
            this.parent[pv] = pu;
        } else {
            this.size[pv] += this.size[pu];
            this.parent[pu] = pv;
        }
        return true;
    }
}

class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    closedIsland(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        const N = ROWS * COLS;

        const dsu = new DSU(N);
        const directions = [0, 1, 0, -1, 0];

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 0) {
                    for (let d = 0; d < 4; d++) {
                        let nr = r + directions[d],
                            nc = c + directions[d + 1];
                        if (nr < 0 || nc < 0 || nr === ROWS || nc === COLS) {
                            dsu.union(N, r * COLS + c);
                        } else if (grid[nr][nc] === 0) {
                            dsu.union(r * COLS + c, nr * COLS + nc);
                        }
                    }
                }
            }
        }

        let res = 0,
            rootN = dsu.find(N);
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 0) {
                    let node = r * COLS + c;
                    let root = dsu.find(node);
                    if (root === node && root !== rootN) {
                        res++;
                    }
                }
            }
        }
        return res;
    }
}
```

```csharp
public class DSU {
    private int[] Parent, Size;

    public DSU(int n) {
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    public int Find(int node) {
        if (Parent[node] != node) {
            Parent[node] = Find(Parent[node]);
        }
        return Parent[node];
    }

    public bool Union(int u, int v) {
        int pu = Find(u), pv = Find(v);
        if (pu == pv) return false;
        if (Size[pu] >= Size[pv]) {
            Size[pu] += Size[pv];
            Parent[pv] = pu;
        } else {
            Size[pv] += Size[pu];
            Parent[pu] = pv;
        }
        return true;
    }
}

public class Solution {
    public int ClosedIsland(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int N = ROWS * COLS;

        DSU dsu = new DSU(N);
        int[] directions = {0, 1, 0, -1, 0};

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0) {
                    for (int d = 0; d < 4; d++) {
                        int nr = r + directions[d], nc = c + directions[d + 1];
                        if (nr < 0 || nc < 0 || nr == ROWS || nc == COLS) {
                            dsu.Union(N, r * COLS + c);
                        } else if (grid[nr][nc] == 0) {
                            dsu.Union(r * COLS + c, nr * COLS + nc);
                        }
                    }
                }
            }
        }

        int res = 0, rootN = dsu.Find(N);
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0) {
                    int node = r * COLS + c;
                    int root = dsu.Find(node);
                    if (root == node && root != rootN) {
                        res++;
                    }
                }
            }
        }
        return res;
    }
}
```

```go
type DSU struct {
    Parent []int
    Size   []int
}

func NewDSU(n int) *DSU {
    parent := make([]int, n+1)
    size := make([]int, n+1)
    for i := 0; i <= n; i++ {
        parent[i] = i
        size[i] = 1
    }
    return &DSU{Parent: parent, Size: size}
}

func (d *DSU) Find(node int) int {
    if d.Parent[node] != node {
        d.Parent[node] = d.Find(d.Parent[node])
    }
    return d.Parent[node]
}

func (d *DSU) Union(u, v int) bool {
    pu, pv := d.Find(u), d.Find(v)
    if pu == pv {
        return false
    }
    if d.Size[pu] >= d.Size[pv] {
        d.Size[pu] += d.Size[pv]
        d.Parent[pv] = pu
    } else {
        d.Size[pv] += d.Size[pu]
        d.Parent[pu] = pv
    }
    return true
}

func closedIsland(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    N := ROWS * COLS

    dsu := NewDSU(N)
    directions := []int{0, 1, 0, -1, 0}

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if grid[r][c] == 0 {
                for d := 0; d < 4; d++ {
                    nr, nc := r+directions[d], c+directions[d+1]
                    if nr < 0 || nc < 0 || nr == ROWS || nc == COLS {
                        dsu.Union(N, r*COLS+c)
                    } else if grid[nr][nc] == 0 {
                        dsu.Union(r*COLS+c, nr*COLS+nc)
                    }
                }
            }
        }
    }

    res := 0
    rootN := dsu.Find(N)
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if grid[r][c] == 0 {
                node := r*COLS + c
                root := dsu.Find(node)
                if root == node && root != rootN {
                    res++
                }
            }
        }
    }
    return res
}
```

```kotlin
class DSU(n: Int) {
    private val parent = IntArray(n + 1) { it }
    private val size = IntArray(n + 1) { 1 }

    fun find(node: Int): Int {
        if (parent[node] != node) {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    fun union(u: Int, v: Int): Boolean {
        val pu = find(u)
        val pv = find(v)
        if (pu == pv) return false
        if (size[pu] >= size[pv]) {
            size[pu] += size[pv]
            parent[pv] = pu
        } else {
            size[pv] += size[pu]
            parent[pu] = pv
        }
        return true
    }
}

class Solution {
    fun closedIsland(grid: Array<IntArray>): Int {
        val ROWS = grid.size
        val COLS = grid[0].size
        val N = ROWS * COLS

        val dsu = DSU(N)
        val directions = intArrayOf(0, 1, 0, -1, 0)

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (grid[r][c] == 0) {
                    for (d in 0 until 4) {
                        val nr = r + directions[d]
                        val nc = c + directions[d + 1]
                        if (nr < 0 || nc < 0 || nr == ROWS || nc == COLS) {
                            dsu.union(N, r * COLS + c)
                        } else if (grid[nr][nc] == 0) {
                            dsu.union(r * COLS + c, nr * COLS + nc)
                        }
                    }
                }
            }
        }

        var res = 0
        val rootN = dsu.find(N)
        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (grid[r][c] == 0) {
                    val node = r * COLS + c
                    val root = dsu.find(node)
                    if (root == node && root != rootN) {
                        res++
                    }
                }
            }
        }
        return res
    }
}
```

```swift
class DSU {
    var parent: [Int]
    var size: [Int]

    init(_ n: Int) {
        parent = Array(0...n)
        size = Array(repeating: 1, count: n + 1)
    }

    func find(_ node: Int) -> Int {
        if parent[node] != node {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    func union(_ u: Int, _ v: Int) -> Bool {
        let pu = find(u), pv = find(v)
        if pu == pv { return false }
        if size[pu] >= size[pv] {
            size[pu] += size[pv]
            parent[pv] = pu
        } else {
            size[pv] += size[pu]
            parent[pu] = pv
        }
        return true
    }
}

class Solution {
    func closedIsland(_ grid: [[Int]]) -> Int {
        let ROWS = grid.count, COLS = grid[0].count
        let N = ROWS * COLS

        let dsu = DSU(N)
        let directions = [0, 1, 0, -1, 0]

        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid[r][c] == 0 {
                    for d in 0..<4 {
                        let nr = r + directions[d], nc = c + directions[d + 1]
                        if nr < 0 || nc < 0 || nr == ROWS || nc == COLS {
                            _ = dsu.union(N, r * COLS + c)
                        } else if grid[nr][nc] == 0 {
                            _ = dsu.union(r * COLS + c, nr * COLS + nc)
                        }
                    }
                }
            }
        }

        var res = 0
        let rootN = dsu.find(N)
        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid[r][c] == 0 {
                    let node = r * COLS + c
                    let root = dsu.find(node)
                    if root == node && root != rootN {
                        res += 1
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

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given grid.
