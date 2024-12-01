## 1. Brute Force (Backtracking)

::tabs-start

```python
class Solution:
    def islandsAndTreasure(self, grid: List[List[int]]) -> None:
        ROWS, COLS = len(grid), len(grid[0])
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        INF = 2147483647
        visit = [[False for _ in range(COLS)] for _ in range(ROWS)]

        def dfs(r, c):
            if (r < 0 or c < 0 or r >= ROWS or
                c >= COLS or grid[r][c] == -1 or
                visit[r][c]):
                return INF
            if grid[r][c] == 0:
                return 0

            visit[r][c] = True
            res = INF
            for dx, dy in directions:
                res = min(res, 1 + dfs(r + dx, c + dy))
            visit[r][c] = False
            return res

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == INF:
                    grid[r][c] = dfs(r, c)
```

```java
public class Solution {
    private int[][] directions = {{1, 0}, {-1, 0}, 
                                  {0, 1}, {0, -1}};
    private int INF = 2147483647;
    private boolean[][] visit;
    private int ROWS, COLS;

    private int dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= ROWS || 
            c >= COLS || grid[r][c] == -1 || visit[r][c]) {
            return INF;
        }
        if (grid[r][c] == 0) {
            return 0;
        }
        visit[r][c] = true;
        int res = INF;
        for (int[] dir : directions) {
            int cur = dfs(grid, r + dir[0], c + dir[1]);
            if (cur != INF) {
                res = Math.min(res, 1 + cur);
            }
        }
        visit[r][c] = false;
        return res;
    }

    public void islandsAndTreasure(int[][] grid) {
        ROWS = grid.length;
        COLS = grid[0].length;
        visit = new boolean[ROWS][COLS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == INF) {
                    grid[r][c] = dfs(grid, r, c);
                }
            }
        }
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> directions = {{1, 0}, {-1, 0}, 
                                      {0, 1}, {0, -1}};
    int INF = 2147483647;
    vector<vector<bool>> visit;
    int ROWS, COLS;

    int dfs(vector<vector<int>>& grid, int r, int c) {
        if (r < 0 || c < 0 || r >= ROWS || 
            c >= COLS || grid[r][c] == -1 || visit[r][c]) {
            return INF;
        }
        if (grid[r][c] == 0) {
            return 0;
        }
        visit[r][c] = true;
        int res = INF;
        for (auto& dir : directions) {
            int cur = dfs(grid, r + dir[0], c + dir[1]);
            if (cur != INF) {
                res = min(res, 1 + cur);
            }
        }
        visit[r][c] = false;
        return res;
    }

    void islandsAndTreasure(vector<vector<int>>& grid) {
        ROWS = grid.size();
        COLS = grid[0].size();
        visit.assign(ROWS, vector<bool>(COLS, false));

        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                if (grid[r][c] == INF) {
                    grid[r][c] = dfs(grid, r, c);
                }
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {void}
     */
    islandsAndTreasure(grid) {
        let ROWS = grid.length;
        let COLS = grid[0].length;
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const INF = 2147483647;
        let visit = Array.from({ length: ROWS }, () => 
                    Array(COLS).fill(false));

        const dfs = (r, c) => {
            if (r < 0 || c < 0 || r >= ROWS || 
                c >= COLS || grid[r][c] === -1 || visit[r][c]) {
                return INF;
            }
            if (grid[r][c] === 0) {
                return 0;
            }
            visit[r][c] = true;
            let res = INF;
            for (let [dx, dy] of directions) {
                res = Math.min(res, 1 + dfs(r + dx, c + dy));
            }
            visit[r][c] = false;
            return res;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === INF) {
                    grid[r][c] = dfs(r, c);
                }
            }
        }
    }
}
```

```csharp
public class Solution {
    private int[][] directions = new int[][] {
        new int[] {1, 0}, new int[] {-1, 0}, 
        new int[] {0, 1}, new int[] {0, -1}
    };
    private int INF = 2147483647;
    private bool[,] visit;
    private int ROWS, COLS;

    private int Dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= ROWS || 
            c >= COLS || grid[r][c] == -1 || visit[r, c]) {
            return INF;
        }
        if (grid[r][c] == 0) {
            return 0;
        }
        visit[r, c] = true;
        int res = INF;
        foreach (var dir in directions) {
            int cur = Dfs(grid, r + dir[0], c + dir[1]);
            if (cur != INF) {
                res = Math.Min(res, 1 + cur);
            }
        }
        visit[r, c] = false;
        return res;
    }

    public void islandsAndTreasure(int[][] grid) {
        ROWS = grid.Length;
        COLS = grid[0].Length;
        visit = new bool[ROWS, COLS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == INF) {
                    grid[r][c] = Dfs(grid, r, c);
                }
            }
        }
    }
}
```

```go
func islandsAndTreasure(grid [][]int) {
    rows, cols := len(grid), len(grid[0])
    directions := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
    INF := 2147483647
    visit := make([][]bool, rows)
    for i := range visit {
        visit[i] = make([]bool, cols)
    }

    var dfs func(r, c int) int
    dfs = func(r, c int) int {
        if r < 0 || c < 0 || r >= rows || c >= cols || 
           grid[r][c] == -1 || visit[r][c] {
            return INF
        }
        if grid[r][c] == 0 {
            return 0
        }

        visit[r][c] = true
        res := INF
        for _, d := range directions {
            dx, dy := d[0], d[1]
            res = min(res, 1+dfs(r+dx, c+dy))
        }
        visit[r][c] = false
        return res
    }

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == INF {
                grid[r][c] = dfs(r, c)
            }
        }
    }
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private val directions = arrayOf(
        intArrayOf(1, 0), intArrayOf(-1, 0),
        intArrayOf(0, 1), intArrayOf(0, -1)
    )
    private val INF = 2147483647
    private lateinit var visit: Array<BooleanArray>
    private var rows = 0
    private var cols = 0

    private fun dfs(grid: Array<IntArray>, r: Int, c: Int): Int {
        if (r < 0 || c < 0 || r >= rows || c >= cols || 
            grid[r][c] == -1 || visit[r][c]) {
            return INF
        }
        if (grid[r][c] == 0) {
            return 0
        }
        visit[r][c] = true
        var res = INF
        for (dir in directions) {
            val cur = dfs(grid, r + dir[0], c + dir[1])
            if (cur != INF) {
                res = minOf(res, 1 + cur)
            }
        }
        visit[r][c] = false
        return res
    }

    fun islandsAndTreasure(grid: Array<IntArray>): Unit {
        rows = grid.size
        cols = grid[0].size
        visit = Array(rows) { BooleanArray(cols) }

        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (grid[r][c] == INF) {
                    grid[r][c] = dfs(grid, r, c)
                }
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n * 4 ^ {m * n})$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the $grid$.

---

## 2. Breadth First Search

::tabs-start

```python
class Solution:
    def islandsAndTreasure(self, grid: List[List[int]]) -> None:
        ROWS, COLS = len(grid), len(grid[0])
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        INF = 2147483647

        def bfs(r, c):
            q = deque([(r, c)])
            visit = [[False] * COLS for _ in range(ROWS)]
            visit[r][c] = True
            steps = 0
            while q:
                for _ in range(len(q)):
                    row, col = q.popleft()
                    if grid[row][col] == 0:
                        return steps
                    for dr, dc in directions:
                        nr, nc = row + dr, col + dc
                        if (0 <= nr < ROWS and 0 <= nc < COLS and 
                            not visit[nr][nc] and grid[nr][nc] != -1
                        ):
                            visit[nr][nc] = True
                            q.append((nr, nc))
                steps += 1
            return INF

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == INF:
                    grid[r][c] = bfs(r, c)
```

```java
public class Solution {
    private int[][] directions = {{1, 0}, {-1, 0}, 
                                  {0, 1}, {0, -1}};
    private int INF = 2147483647;
    private int ROWS, COLS;

    private int bfs(int[][] grid, int r, int c) {
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{r, c});
        boolean[][] visit = new boolean[ROWS][COLS];
        visit[r][c] = true;
        int steps = 0;

        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int[] curr = q.poll();
                int row = curr[0], col = curr[1];
                if (grid[row][col] == 0) return steps;
                for (int[] dir : directions) {
                    int nr = row + dir[0], nc = col + dir[1];
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && 
                        !visit[nr][nc] && grid[nr][nc] != -1) {
                        visit[nr][nc] = true;
                        q.add(new int[]{nr, nc});
                    }
                }
            }
            steps++;
        }
        return INF;
    }

    public void islandsAndTreasure(int[][] grid) {
        ROWS = grid.length;
        COLS = grid[0].length;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == INF) {
                    grid[r][c] = bfs(grid, r, c);
                }
            }
        }
    }
}
```

```cpp
class Solution {
public:
    int ROWS, COLS;
    vector<vector<int>> directions = {{1, 0}, {-1, 0}, 
                                      {0, 1}, {0, -1}};
    int INF = INT_MAX;

    int bfs(vector<vector<int>>& grid, int r, int c) {
        queue<pair<int, int>> q;
        q.push({r, c});
        vector<vector<bool>> visit(ROWS, vector<bool>(COLS, false));
        visit[r][c] = true;
        int steps = 0;

        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                auto [row, col] = q.front();
                q.pop();
                if (grid[row][col] == 0) return steps;
                for (auto& dir : directions) {
                    int nr = row + dir[0], nc = col + dir[1];
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && 
                        !visit[nr][nc] && grid[nr][nc] != -1) {
                        visit[nr][nc] = true;
                        q.push({nr, nc});
                    }
                }
            }
            steps++;
        }
        return INF;
    }

    void islandsAndTreasure(vector<vector<int>>& grid) {
        ROWS = grid.size();
        COLS = grid[0].size();

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == INF) {
                    grid[r][c] = bfs(grid, r, c);
                }
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {void}
     */
    islandsAndTreasure(grid) {
        let ROWS = grid.length;
        let COLS = grid[0].length;
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const INF = 2147483647;
        let visit = Array.from({ length: ROWS }, () => 
                    Array(COLS).fill(false));

        const bfs = (r, c) => {
            const q = new Queue([[r, c]]);
            const visit = Array.from({ length: ROWS }, () => 
                          Array(COLS).fill(false));
            visit[r][c] = true;
            let steps = 0;

            while (!q.isEmpty()) {
                let size = q.size();
                for (let i = 0; i < size; i++) {
                    const [row, col] = q.pop();
                    if (grid[row][col] === 0) return steps;
                    for (let [dr, dc] of directions) {
                        const nr = row + dr, nc = col + dc;
                        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && 
                            !visit[nr][nc] && grid[nr][nc] !== -1) {
                            visit[nr][nc] = true;
                            q.push([nr, nc]);
                        }
                    }
                }
                steps++;
            }
            return INF;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === INF) {
                    grid[r][c] = bfs(r, c);
                }
            }
        }
    }
}
```

```csharp
public class Solution {
    private int[][] directions = new int[][] {
        new int[] { 1, 0 }, new int[] { -1, 0 },
        new int[] { 0, 1 }, new int[] { 0, -1 }
    };
    private int INF = int.MaxValue;
    private int ROWS, COLS;

    private int Bfs(int[][] grid, int r, int c) {
        var q = new Queue<int[]>();
        q.Enqueue(new int[] { r, c });
        bool[][] visit = new bool[ROWS][];
        for (int i = 0; i < ROWS; i++) visit[i] = new bool[COLS];
        visit[r][c] = true;
        int steps = 0;

        while (q.Count > 0) {
            int size = q.Count;
            for (int i = 0; i < size; i++) {
                var curr = q.Dequeue();
                int row = curr[0], col = curr[1];
                if (grid[row][col] == 0) return steps;
                foreach (var dir in directions) {
                    int nr = row + dir[0], nc = col + dir[1];
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && 
                        !visit[nr][nc] && grid[nr][nc] != -1) {
                        visit[nr][nc] = true;
                        q.Enqueue(new int[] { nr, nc });
                    }
                }
            }
            steps++;
        }
        return INF;
    }

    public void islandsAndTreasure(int[][] grid) {
        ROWS = grid.Length;
        COLS = grid[0].Length;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == INF) {
                    grid[r][c] = Bfs(grid, r, c);
                }
            }
        }
    }
}
```

```go
func islandsAndTreasure(grid [][]int) {
    rows, cols := len(grid), len(grid[0])
    directions := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
    INF := 2147483647

    bfs := func(r, c int) int {
        q := [][2]int{{r, c}}
        visit := make([][]bool, rows)
        for i := range visit {
            visit[i] = make([]bool, cols)
        }
        visit[r][c] = true
        steps := 0

        for len(q) > 0 {
            size := len(q)
            for i := 0; i < size; i++ {
                current := q[0]
                q = q[1:]
                row, col := current[0], current[1]
                if grid[row][col] == 0 {
                    return steps
                }
                for _, dir := range directions {
                    nr, nc := row+dir[0], col+dir[1]
                    if nr >= 0 && nc >= 0 && nr < rows && nc < cols && 
                       !visit[nr][nc] && grid[nr][nc] != -1 {
                        visit[nr][nc] = true
                        q = append(q, [2]int{nr, nc})
                    }
                }
            }
            steps++
        }
        return INF
    }

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == INF {
                grid[r][c] = bfs(r, c)
            }
        }
    }
}
```

```kotlin
class Solution {
    private val directions = arrayOf(
        intArrayOf(1, 0), intArrayOf(-1, 0), 
        intArrayOf(0, 1), intArrayOf(0, -1)
    )
    private val INF = 2147483647

    fun islandsAndTreasure(grid: Array<IntArray>): Unit {
        val rows = grid.size
        val cols = grid[0].size

        fun bfs(r: Int, c: Int): Int {
            val q = ArrayDeque<Pair<Int, Int>>()
            q.add(Pair(r, c))
            val visit = Array(rows) { BooleanArray(cols) }
            visit[r][c] = true
            var steps = 0

            while (q.isNotEmpty()) {
                repeat(q.size) {
                    val (row, col) = q.removeFirst()
                    if (grid[row][col] == 0) {
                        return steps
                    }
                    for (dir in directions) {
                        val nr = row + dir[0]
                        val nc = col + dir[1]
                        if (nr in 0 until rows && nc in 0 until cols && 
                            !visit[nr][nc] && grid[nr][nc] != -1) {
                            visit[nr][nc] = true
                            q.add(Pair(nr, nc))
                        }
                    }
                }
                steps++
            }
            return INF
        }

        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (grid[r][c] == INF) {
                    grid[r][c] = bfs(r, c)
                }
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O((m * n) ^ 2)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the $grid$.

---

## 3. Multi Source BFS

::tabs-start

```python
class Solution:
    def islandsAndTreasure(self, grid: List[List[int]]) -> None:
        ROWS, COLS = len(grid), len(grid[0])
        visit = set()
        q = deque()

        def addCell(r, c):
            if (min(r, c) < 0 or r == ROWS or c == COLS or
                (r, c) in visit or grid[r][c] == -1
            ):
                return
            visit.add((r, c))
            q.append([r, c])

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == 0:
                    q.append([r, c])
                    visit.add((r, c))

        dist = 0
        while q:
            for i in range(len(q)):
                r, c = q.popleft()
                grid[r][c] = dist
                addCell(r + 1, c)
                addCell(r - 1, c)
                addCell(r, c + 1)
                addCell(r, c - 1)
            dist += 1
```

```java
public class Solution {
    public void islandsAndTreasure(int[][] grid) {
        Queue<int[]> q = new LinkedList<>();
        int m = grid.length;
        int n = grid[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 0) {
                    q.add(new int[] { i, j });
                }
            }
        }
        if (q.size() == 0) return;

        int[][] dirs = { { -1, 0 }, { 0, -1 }, 
                         { 1, 0 }, { 0, 1 } };
        while (!q.isEmpty()) {
            int[] node = q.poll();
            int row = node[0];
            int col = node[1];
            for (int[] dir : dirs) {
                int r = row + dir[0];
                int c = col + dir[1];
                if (r >= m || c >= n || r < 0 ||
                    c < 0 || grid[r][c] != Integer.MAX_VALUE) {
                    continue;
                }
                q.add(new int[] { r, c });

                grid[r][c] = grid[row][col] + 1;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void islandsAndTreasure(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        
        queue<pair<int, int>> q;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 0) {
                    q.push({i, j});
                }
            }
        }
        
        vector<vector<int>> dirs = {{-1, 0}, {1, 0}, 
                                    {0, -1}, {0, 1}};
        while (!q.empty()) {
            int row = q.front().first;
            int col = q.front().second;
            q.pop();
            
            for (int i = 0; i < 4; i++) {
                int r = row + dirs[i][0];
                int c = col + dirs[i][1];
                
                if (r < 0 || r >= m || c < 0 || 
                    c >= n || grid[r][c] != INT_MAX) {
                    continue;
                }
                
                grid[r][c] = grid[row][col] + 1;
                q.push({r, c});
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     */
    islandsAndTreasure(grid) {
        let ROWS = grid.length;
        let COLS = grid[0].length;
        let visit = new Set();
        let q = new Queue();

        /**
         * @param {number} r
         * @param {number} c
         */
        function addCell(r, c) {
            if (Math.min(r, c) < 0 || r === ROWS || c === COLS ||
                visit.has(r + ',' + c) || grid[r][c] === -1
            ) {
                return;
            }
            visit.add(r + ',' + c);
            q.push([r, c]);
        }

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 0) {
                    q.push([r, c]);
                    visit.add(r + ',' + c);
                }
            }
        }

        let dist = 0;
        while (!q.isEmpty()) {
            for (let i = q.size(); i > 0; i--) {
                let [r, c] = q.pop();
                grid[r][c] = dist;
                addCell(r + 1, c);
                addCell(r - 1, c);
                addCell(r, c + 1);
                addCell(r, c - 1);
            }
            dist += 1;
        }
    }
}
```

```csharp
public class Solution {
    public void islandsAndTreasure(int[][] grid) {
        Queue<int[]> q = new Queue<int[]>();
        int m = grid.Length;
        int n = grid[0].Length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 0) q.Enqueue(new int[] { i, j });
            }
        }

        if (q.Count == 0) return;
        
        int[][] dirs = { 
            new int[] { -1, 0 }, new int[] { 0, -1 }, 
            new int[] { 1, 0 }, new int[] { 0, 1 } 
        };
        while (q.Count > 0) {
            int[] cur = q.Dequeue();
            int row = cur[0];
            int col = cur[1];
            foreach (int[] dir in dirs) {
                int r = row + dir[0];
                int c = col + dir[1];
                if (r >= m || c >= n || r < 0 ||
                    c < 0 || grid[r][c] != int.MaxValue) {
                    continue;   
                }
                q.Enqueue(new int[] { r, c });

                grid[r][c] = grid[row][col] + 1;
            }
        }
    }
}
```

```go
func islandsAndTreasure(grid [][]int) {
    m, n := len(grid), len(grid[0])
    q := [][2]int{}

    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == 0 {
                q = append(q, [2]int{i, j})
            }
        }
    }
    if len(q) == 0 {
        return
    }

    dirs := [][]int{{-1, 0}, {0, -1}, {1, 0}, {0, 1}}

    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        row, col := node[0], node[1]

        for _, dir := range dirs {
            r, c := row+dir[0], col+dir[1]
            if r >= m || c >= n || r < 0 || c < 0 || 
               grid[r][c] != 2147483647 {
                continue
            }
            q = append(q, [2]int{r, c})
            grid[r][c] = grid[row][col] + 1
        }
    }
}
```

```kotlin
class Solution {
    fun islandsAndTreasure(grid: Array<IntArray>): Unit {
        val m = grid.size
        val n = grid[0].size
        val q: Queue<Pair<Int, Int>> = LinkedList()

        for (i in 0 until m) {
            for (j in 0 until n) {
                if (grid[i][j] == 0) {
                    q.add(Pair(i, j))
                }
            }
        }
        if (q.isEmpty()) return

        val dirs = arrayOf(
            intArrayOf(-1, 0), intArrayOf(0, -1), 
            intArrayOf(1, 0), intArrayOf(0, 1)
        )

        while (q.isNotEmpty()) {
            val (row, col) = q.poll()
            for (dir in dirs) {
                val r = row + dir[0]
                val c = col + dir[1]
                if (r !in 0 until m || c !in 0 until n || 
                    grid[r][c] != Int.MAX_VALUE) {
                    continue
                }
                q.add(Pair(r, c))
                grid[r][c] = grid[row][col] + 1
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the $grid$.