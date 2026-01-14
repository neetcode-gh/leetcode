## 1. Depth First Search

### Intuition

An island in `grid2` is a sub-island if every land cell of that island is also land in `grid1`. We can use DFS to explore each island in `grid2` and simultaneously check if all its cells correspond to land in `grid1`. If any cell in the island exists in `grid2` but not in `grid1`, the entire island is disqualified. We must explore the complete island before deciding, so we continue the DFS even after finding a mismatch.

### Algorithm

1. Create a visited set to track explored cells.
2. For each unvisited land cell in `grid2`, start a DFS.
3. In the DFS:
   - Return `true` if out of bounds, on water, or already visited (base cases).
   - Mark the current cell as visited.
   - Check if `grid1` has land at this position; if not, the result becomes `false`.
   - Recursively explore all four directions, combining results with AND.
   - Return whether this island is a valid sub-island.
4. Count and return the number of valid sub-islands.

::tabs-start

```python
class Solution:
    def countSubIslands(self, grid1: List[List[int]], grid2: List[List[int]]) -> int:
        ROWS, COLS = len(grid1), len(grid1[0])
        visit = set()

        def dfs(r, c):
            if (min(r, c) < 0 or r == ROWS or c == COLS or
                grid2[r][c] == 0 or (r, c) in visit):
                return True

            visit.add((r, c))
            res = grid1[r][c]

            res &= dfs(r - 1, c)
            res &= dfs(r + 1, c)
            res &= dfs(r, c - 1)
            res &= dfs(r, c + 1)
            return res

        count = 0
        for r in range(ROWS):
            for c in range(COLS):
                if grid2[r][c] and (r, c) not in visit:
                    count += dfs(r, c)
        return count
```

```java
public class Solution {
    private boolean[][] visit;

    public int countSubIslands(int[][] grid1, int[][] grid2) {
        int ROWS = grid1.length, COLS = grid1[0].length;
        visit = new boolean[ROWS][COLS];
        int count = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid2[r][c] == 1 && !visit[r][c] && dfs(r, c, grid1, grid2)) {
                    count++;
                }
            }
        }
        return count;
    }

    private boolean dfs(int r, int c, int[][] grid1, int[][] grid2) {
        if (r < 0 || c < 0 || r >= grid1.length || c >= grid1[0].length ||
            grid2[r][c] == 0 || visit[r][c]) {
            return true;
        }
        visit[r][c] = true;
        boolean res = grid1[r][c] == 1;
        res &= dfs(r - 1, c, grid1, grid2);
        res &= dfs(r + 1, c, grid1, grid2);
        res &= dfs(r, c - 1, grid1, grid2);
        res &= dfs(r, c + 1, grid1, grid2);
        return res;
    }

}
```

```cpp
class Solution {
    vector<vector<bool>> visit;

public:
    int countSubIslands(vector<vector<int>>& grid1, vector<vector<int>>& grid2) {
        int ROWS = grid1.size(), COLS = grid1[0].size();
        visit.assign(ROWS, vector<bool>(COLS, false));

        int count = 0;
        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                if (grid2[r][c] && !visit[r][c]) {
                    count += dfs(r, c, grid1, grid2);
                }
            }
        }
        return count;
    }

private:
    bool dfs(int r, int c, vector<vector<int>>& grid1, vector<vector<int>>& grid2) {
        if (r < 0 || c < 0 || r >= grid1.size() || c >= grid1[0].size() ||
            grid2[r][c] == 0 || visit[r][c]) {
            return true;
        }

        visit[r][c] = true;
        bool res = grid1[r][c] == 1;
        res &= dfs(r - 1, c, grid1, grid2);
        res &= dfs(r + 1, c, grid1, grid2);
        res &= dfs(r, c - 1, grid1, grid2);
        res &= dfs(r, c + 1, grid1, grid2);
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid1
     * @param {number[][]} grid2
     * @return {number}
     */
    countSubIslands(grid1, grid2) {
        const ROWS = grid1.length,
            COLS = grid1[0].length;
        const visit = Array.from({ length: ROWS }, () =>
            Array(COLS).fill(false),
        );

        const dfs = (r, c) => {
            if (
                r < 0 ||
                c < 0 ||
                r >= ROWS ||
                c >= COLS ||
                grid2[r][c] === 0 ||
                visit[r][c]
            )
                return true;
            visit[r][c] = true;
            let res = grid1[r][c] === 1;
            res &= dfs(r - 1, c);
            res &= dfs(r + 1, c);
            res &= dfs(r, c - 1);
            res &= dfs(r, c + 1);
            return res;
        };

        let count = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid2[r][c] === 1 && !visit[r][c]) {
                    if (dfs(r, c)) count++;
                }
            }
        }
        return count;
    }
}
```

```csharp
public class Solution {
    private bool[,] visit;

    public int CountSubIslands(int[][] grid1, int[][] grid2) {
        int ROWS = grid1.Length, COLS = grid1[0].Length;
        visit = new bool[ROWS, COLS];
        int count = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid2[r][c] == 1 && !visit[r, c] && Dfs(r, c, grid1, grid2)) {
                    count++;
                }
            }
        }
        return count;
    }

    private bool Dfs(int r, int c, int[][] grid1, int[][] grid2) {
        if (r < 0 || c < 0 || r >= grid1.Length || c >= grid1[0].Length ||
            grid2[r][c] == 0 || visit[r, c]) {
            return true;
        }
        visit[r, c] = true;
        bool res = grid1[r][c] == 1;
        res &= Dfs(r - 1, c, grid1, grid2);
        res &= Dfs(r + 1, c, grid1, grid2);
        res &= Dfs(r, c - 1, grid1, grid2);
        res &= Dfs(r, c + 1, grid1, grid2);
        return res;
    }
}
```

```go
func countSubIslands(grid1 [][]int, grid2 [][]int) int {
    ROWS, COLS := len(grid1), len(grid1[0])
    visit := make([][]bool, ROWS)
    for i := range visit {
        visit[i] = make([]bool, COLS)
    }

    var dfs func(r, c int) bool
    dfs = func(r, c int) bool {
        if r < 0 || c < 0 || r >= ROWS || c >= COLS ||
            grid2[r][c] == 0 || visit[r][c] {
            return true
        }
        visit[r][c] = true
        res := grid1[r][c] == 1
        res = dfs(r-1, c) && res
        res = dfs(r+1, c) && res
        res = dfs(r, c-1) && res
        res = dfs(r, c+1) && res
        return res
    }

    count := 0
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if grid2[r][c] == 1 && !visit[r][c] && dfs(r, c) {
                count++
            }
        }
    }
    return count
}
```

```kotlin
class Solution {
    private lateinit var visit: Array<BooleanArray>

    fun countSubIslands(grid1: Array<IntArray>, grid2: Array<IntArray>): Int {
        val ROWS = grid1.size
        val COLS = grid1[0].size
        visit = Array(ROWS) { BooleanArray(COLS) }
        var count = 0
        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (grid2[r][c] == 1 && !visit[r][c] && dfs(r, c, grid1, grid2)) {
                    count++
                }
            }
        }
        return count
    }

    private fun dfs(r: Int, c: Int, grid1: Array<IntArray>, grid2: Array<IntArray>): Boolean {
        if (r < 0 || c < 0 || r >= grid1.size || c >= grid1[0].size ||
            grid2[r][c] == 0 || visit[r][c]) {
            return true
        }
        visit[r][c] = true
        var res = grid1[r][c] == 1
        res = dfs(r - 1, c, grid1, grid2) && res
        res = dfs(r + 1, c, grid1, grid2) && res
        res = dfs(r, c - 1, grid1, grid2) && res
        res = dfs(r, c + 1, grid1, grid2) && res
        return res
    }
}
```

```swift
class Solution {
    func countSubIslands(_ grid1: [[Int]], _ grid2: [[Int]]) -> Int {
        let ROWS = grid1.count, COLS = grid1[0].count
        var visit = [[Bool]](repeating: [Bool](repeating: false, count: COLS), count: ROWS)

        func dfs(_ r: Int, _ c: Int) -> Bool {
            if r < 0 || c < 0 || r >= ROWS || c >= COLS ||
               grid2[r][c] == 0 || visit[r][c] {
                return true
            }
            visit[r][c] = true
            var res = grid1[r][c] == 1
            res = dfs(r - 1, c) && res
            res = dfs(r + 1, c) && res
            res = dfs(r, c - 1) && res
            res = dfs(r, c + 1) && res
            return res
        }

        var count = 0
        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid2[r][c] == 1 && !visit[r][c] && dfs(r, c) {
                    count += 1
                }
            }
        }
        return count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Breadth First Search

### Intuition

Similar to DFS, we can use BFS to explore islands in `grid2`. Starting from any unvisited land cell, we use a queue to visit all connected land cells level by level. During the traversal, we check if each cell also exists as land in `grid1`. If any cell fails this check, the island is not a sub-island, but we continue exploring to mark all cells as visited.

### Algorithm

1. Create a visited matrix and a directions array for the four neighbors.
2. For each unvisited land cell in `grid2`, start a BFS.
3. In the BFS:
   - Initialize a queue with the starting cell and mark it visited.
   - Set result to `true`.
   - While the queue is not empty:
     - Dequeue a cell; if `grid1` has water at this position, set result to `false`.
     - Add all unvisited land neighbors in `grid2` to the queue and mark them visited.
   - Return whether this island is a valid sub-island.
4. Count and return the number of valid sub-islands.

::tabs-start

```python
class Solution:
    def countSubIslands(self, grid1: List[List[int]], grid2: List[List[int]]) -> int:
        ROWS, COLS = len(grid1), len(grid1[0])
        visit = [[False] * COLS for _ in range(ROWS)]
        directions = [1, 0, -1, 0, 1]

        def bfs(r, c):
            queue = deque([(r, c)])
            visit[r][c] = True
            res = True

            while queue:
                r, c = queue.popleft()
                if grid1[r][c] == 0:
                    res = False

                for i in range(4):
                    nr, nc = r + directions[i], c + directions[i + 1]
                    if 0 <= nr < ROWS and 0 <= nc < COLS and not visit[nr][nc] and grid2[nr][nc]:
                        visit[nr][nc] = True
                        queue.append((nr, nc))
            return res

        count = 0
        for r in range(ROWS):
            for c in range(COLS):
                if grid2[r][c] == 1 and not visit[r][c]:
                    if bfs(r, c):
                        count += 1
        return count
```

```java
public class Solution {
    private boolean[][] visit;
    private int[] directions = {1, 0, -1, 0, 1};

    public int countSubIslands(int[][] grid1, int[][] grid2) {
        int ROWS = grid1.length, COLS = grid1[0].length;
        visit = new boolean[ROWS][COLS];
        int count = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid2[r][c] == 1 && !visit[r][c]) {
                    if (bfs(r, c, grid1, grid2)) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    private boolean bfs(int r, int c, int[][] grid1, int[][] grid2) {
        Queue<int[]> queue = new LinkedList<>();
        queue.add(new int[]{r, c});
        visit[r][c] = true;
        boolean res = true;

        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int cr = cell[0], cc = cell[1];
            if (grid1[cr][cc] == 0) {
                res = false;
            }

            for (int i = 0; i < 4; i++) {
                int nr = cr + directions[i], nc = cc + directions[i + 1];
                if (nr >= 0 && nr < grid1.length && nc >= 0 && nc < grid1[0].length &&
                    grid2[nr][nc] == 1 && !visit[nr][nc]) {
                    visit[nr][nc] = true;
                    queue.add(new int[]{nr, nc});
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
    vector<vector<bool>> visit;
    vector<int> directions = {1, 0, -1, 0, 1};

public:
    int countSubIslands(vector<vector<int>>& grid1, vector<vector<int>>& grid2) {
        int ROWS = grid1.size(), COLS = grid1[0].size();
        visit.assign(ROWS, vector<bool>(COLS, false));
        int count = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid2[r][c] == 1 && !visit[r][c]) {
                    if (bfs(r, c, grid1, grid2)) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

private:
    bool bfs(int r, int c, vector<vector<int>>& grid1, vector<vector<int>>& grid2) {
        queue<pair<int, int>> q;
        q.push({r, c});
        visit[r][c] = true;
        bool res = true;

        while (!q.empty()) {
            auto [cr, cc] = q.front(); q.pop();

            if (grid1[cr][cc] == 0) res = false;

            for (int i = 0; i < 4; i++) {
                int nr = cr + directions[i], nc = cc + directions[i + 1];
                if (nr >= 0 && nr < grid1.size() && nc >= 0 && nc < grid1[0].size() &&
                    grid2[nr][nc] == 1 && !visit[nr][nc]) {
                    visit[nr][nc] = true;
                    q.push({nr, nc});
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
     * @param {number[][]} grid1
     * @param {number[][]} grid2
     * @return {number}
     */
    countSubIslands(grid1, grid2) {
        const ROWS = grid1.length,
            COLS = grid1[0].length;
        const visit = Array.from({ length: ROWS }, () =>
            Array(COLS).fill(false),
        );
        const directions = [1, 0, -1, 0, 1];
        let count = 0;

        const bfs = (sr, sc) => {
            const queue = new Queue([[sr, sc]]);
            visit[sr][sc] = true;
            let res = true;

            while (!queue.isEmpty()) {
                const [r, c] = queue.pop();
                if (grid1[r][c] === 0) res = false;

                for (let i = 0; i < 4; i++) {
                    const nr = r + directions[i],
                        nc = c + directions[i + 1];
                    if (
                        nr >= 0 &&
                        nr < ROWS &&
                        nc >= 0 &&
                        nc < COLS &&
                        grid2[nr][nc] === 1 &&
                        !visit[nr][nc]
                    ) {
                        visit[nr][nc] = true;
                        queue.push([nr, nc]);
                    }
                }
            }
            return res;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid2[r][c] === 1 && !visit[r][c]) {
                    if (bfs(r, c)) count++;
                }
            }
        }
        return count;
    }
}
```

```csharp
public class Solution {
    private bool[,] visit;
    private int[] directions = {1, 0, -1, 0, 1};

    public int CountSubIslands(int[][] grid1, int[][] grid2) {
        int ROWS = grid1.Length, COLS = grid1[0].Length;
        visit = new bool[ROWS, COLS];
        int count = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid2[r][c] == 1 && !visit[r, c]) {
                    if (Bfs(r, c, grid1, grid2)) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    private bool Bfs(int r, int c, int[][] grid1, int[][] grid2) {
        Queue<int[]> queue = new Queue<int[]>();
        queue.Enqueue(new int[]{r, c});
        visit[r, c] = true;
        bool res = true;

        while (queue.Count > 0) {
            int[] cell = queue.Dequeue();
            int cr = cell[0], cc = cell[1];
            if (grid1[cr][cc] == 0) res = false;

            for (int i = 0; i < 4; i++) {
                int nr = cr + directions[i], nc = cc + directions[i + 1];
                if (nr >= 0 && nr < grid1.Length && nc >= 0 && nc < grid1[0].Length &&
                    grid2[nr][nc] == 1 && !visit[nr, nc]) {
                    visit[nr, nc] = true;
                    queue.Enqueue(new int[]{nr, nc});
                }
            }
        }
        return res;
    }
}
```

```go
func countSubIslands(grid1 [][]int, grid2 [][]int) int {
    ROWS, COLS := len(grid1), len(grid1[0])
    visit := make([][]bool, ROWS)
    for i := range visit {
        visit[i] = make([]bool, COLS)
    }
    directions := []int{1, 0, -1, 0, 1}

    bfs := func(sr, sc int) bool {
        queue := [][]int{{sr, sc}}
        visit[sr][sc] = true
        res := true

        for len(queue) > 0 {
            cell := queue[0]
            queue = queue[1:]
            r, c := cell[0], cell[1]
            if grid1[r][c] == 0 {
                res = false
            }

            for i := 0; i < 4; i++ {
                nr, nc := r+directions[i], c+directions[i+1]
                if nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS &&
                    grid2[nr][nc] == 1 && !visit[nr][nc] {
                    visit[nr][nc] = true
                    queue = append(queue, []int{nr, nc})
                }
            }
        }
        return res
    }

    count := 0
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if grid2[r][c] == 1 && !visit[r][c] {
                if bfs(r, c) {
                    count++
                }
            }
        }
    }
    return count
}
```

```kotlin
class Solution {
    fun countSubIslands(grid1: Array<IntArray>, grid2: Array<IntArray>): Int {
        val ROWS = grid1.size
        val COLS = grid1[0].size
        val visit = Array(ROWS) { BooleanArray(COLS) }
        val directions = intArrayOf(1, 0, -1, 0, 1)
        var count = 0

        fun bfs(sr: Int, sc: Int): Boolean {
            val queue = ArrayDeque<Pair<Int, Int>>()
            queue.add(Pair(sr, sc))
            visit[sr][sc] = true
            var res = true

            while (queue.isNotEmpty()) {
                val (r, c) = queue.removeFirst()
                if (grid1[r][c] == 0) res = false

                for (i in 0 until 4) {
                    val nr = r + directions[i]
                    val nc = c + directions[i + 1]
                    if (nr in 0 until ROWS && nc in 0 until COLS &&
                        grid2[nr][nc] == 1 && !visit[nr][nc]) {
                        visit[nr][nc] = true
                        queue.add(Pair(nr, nc))
                    }
                }
            }
            return res
        }

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (grid2[r][c] == 1 && !visit[r][c]) {
                    if (bfs(r, c)) count++
                }
            }
        }
        return count
    }
}
```

```swift
class Solution {
    func countSubIslands(_ grid1: [[Int]], _ grid2: [[Int]]) -> Int {
        let ROWS = grid1.count, COLS = grid1[0].count
        var visit = [[Bool]](repeating: [Bool](repeating: false, count: COLS), count: ROWS)
        let directions = [1, 0, -1, 0, 1]

        func bfs(_ sr: Int, _ sc: Int) -> Bool {
            var queue = [[Int]]()
            queue.append([sr, sc])
            visit[sr][sc] = true
            var res = true

            while !queue.isEmpty {
                let cell = queue.removeFirst()
                let r = cell[0], c = cell[1]
                if grid1[r][c] == 0 { res = false }

                for i in 0..<4 {
                    let nr = r + directions[i], nc = c + directions[i + 1]
                    if nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS &&
                       grid2[nr][nc] == 1 && !visit[nr][nc] {
                        visit[nr][nc] = true
                        queue.append([nr, nc])
                    }
                }
            }
            return res
        }

        var count = 0
        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid2[r][c] == 1 && !visit[r][c] {
                    if bfs(r, c) { count += 1 }
                }
            }
        }
        return count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 3. Disjoint Set Union

### Intuition

We can use Union-Find to group connected land cells in `grid2` into islands. The key insight is that we also create a special "invalid" node (indexed at `N`, where `N` is the total number of cells). Any land cell in `grid2` that corresponds to water in `grid1` gets unioned with this invalid node. After processing, the number of sub-islands equals the total land cells minus the number of union operations performed (since each union either merges two components or marks one as invalid).

### Algorithm

1. Initialize a DSU with `N+1` nodes (`N` cells plus one invalid node).
2. For each land cell in `grid2`:
   - Count it as a land cell.
   - Union it with its right neighbor if the neighbor is also land in `grid2`.
   - Union it with its bottom neighbor if the neighbor is also land in `grid2`.
   - If `grid1` has water at this position, union this cell with the invalid node `N`.
3. Track the number of successful unions (where two different components merge).
4. Return land count minus union count, which gives the number of valid sub-islands.

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
        pu = self.find(u)
        pv = self.find(v)
        if pu == pv:
            return False
        if self.Size[pu] < self.Size[pv]:
            pu, pv = pv, pu
        self.Size[pu] += self.Size[pv]
        self.Parent[pv] = pu
        return True

class Solution:
    def countSubIslands(self, grid1, grid2):
        ROWS, COLS = len(grid1), len(grid1[0])
        N = ROWS * COLS
        dsu = DSU(N)

        def getId(r, c):
            return r * COLS + c

        land = unions = 0
        for r in range(ROWS):
            for c in range(COLS):
                if not grid2[r][c]:
                    continue
                land += 1
                if r + 1 < ROWS and grid2[r + 1][c]:
                    unions += dsu.union(getId(r, c), getId(r + 1, c))
                if c + 1 < COLS and grid2[r][c + 1]:
                    unions += dsu.union(getId(r, c), getId(r, c + 1))
                if not grid1[r][c]:
                    unions += dsu.union(getId(r, c), N)

        return land - unions
```

```java
class DSU {
    int[] Parent, Size;

    DSU(int n) {
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) Parent[i] = i;
    }

    int find(int node) {
        if (Parent[node] != node) Parent[node] = find(Parent[node]);
        return Parent[node];
    }

    int union(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return 0;
        if (Size[pu] < Size[pv]) {
            int temp = pu; pu = pv; pv = temp;
        }
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return 1;
    }
}

public class Solution {
    public int countSubIslands(int[][] grid1, int[][] grid2) {
        int ROWS = grid1.length, COLS = grid1[0].length, N = ROWS * COLS;
        DSU dsu = new DSU(N);

        int land = 0, unions = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid2[r][c] == 0) continue;
                land++;
                if (r + 1 < ROWS && grid2[r + 1][c] == 1)
                    unions += dsu.union(r * COLS + c, (r + 1) * COLS + c);
                if (c + 1 < COLS && grid2[r][c + 1] == 1)
                    unions += dsu.union(r * COLS + c, r * COLS + c + 1);
                if (grid1[r][c] == 0)
                    unions += dsu.union(r * COLS + c, N);
            }
        }
        return land - unions;
    }
}
```

```cpp
class DSU {
    vector<int> Parent, Size;

public:
    DSU(int n) {
        Parent.resize(n + 1);
        Size.assign(n + 1, 1);
        for (int i = 0; i <= n; i++) Parent[i] = i;
    }

    int find(int node) {
        if (Parent[node] != node) Parent[node] = find(Parent[node]);
        return Parent[node];
    }

    bool unionSets(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (Size[pu] < Size[pv]) swap(pu, pv);
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }
};

class Solution {
public:
    int countSubIslands(vector<vector<int>>& grid1, vector<vector<int>>& grid2) {
        int ROWS = grid1.size(), COLS = grid1[0].size(), N = ROWS * COLS;
        DSU dsu(N);

        int land = 0, unions = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (!grid2[r][c]) continue;
                land++;
                if (r + 1 < ROWS && grid2[r + 1][c])
                    unions += dsu.unionSets(r * COLS + c, (r + 1) * COLS + c);
                if (c + 1 < COLS && grid2[r][c + 1])
                    unions += dsu.unionSets(r * COLS + c, r * COLS + c + 1);
                if (!grid1[r][c])
                    unions += dsu.unionSets(r * COLS + c, N);
            }
        }
        return land - unions;
    }
};
```

```javascript
class DSU {
    constructor(n) {
        this.Parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.Size = Array(n + 1).fill(1);
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node) {
        if (this.Parent[node] !== node) {
            this.Parent[node] = this.find(this.Parent[node]);
        }
        return this.Parent[node];
    }

    /**
     * @param {number} u
     * @param {number} v
     * @return {boolean}
     */
    union(u, v) {
        let pu = this.find(u),
            pv = this.find(v);
        if (pu === pv) return false;
        if (this.Size[pu] < this.Size[pv]) [pu, pv] = [pv, pu];
        this.Size[pu] += this.Size[pv];
        this.Parent[pv] = pu;
        return true;
    }
}

class Solution {
    /**
     * @param {number[][]} grid1
     * @param {number[][]} grid2
     * @return {number}
     */
    countSubIslands(grid1, grid2) {
        const ROWS = grid1.length,
            COLS = grid1[0].length,
            N = ROWS * COLS;
        const dsu = new DSU(N);

        const getId = (r, c) => r * COLS + c;

        let land = 0,
            unions = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid2[r][c] === 0) continue;
                land++;
                if (r + 1 < ROWS && grid2[r + 1][c] === 1)
                    unions += dsu.union(getId(r, c), getId(r + 1, c));
                if (c + 1 < COLS && grid2[r][c + 1] === 1)
                    unions += dsu.union(getId(r, c), getId(r, c + 1));
                if (grid1[r][c] === 0) unions += dsu.union(getId(r, c), N);
            }
        }
        return land - unions;
    }
}
```

```csharp
public class DSU {
    private int[] Parent, Size;

    public DSU(int n) {
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) Parent[i] = i;
        Array.Fill(Size, 1);
    }

    public int Find(int node) {
        if (Parent[node] != node) Parent[node] = Find(Parent[node]);
        return Parent[node];
    }

    public int Union(int u, int v) {
        int pu = Find(u), pv = Find(v);
        if (pu == pv) return 0;
        if (Size[pu] < Size[pv]) {
            int temp = pu; pu = pv; pv = temp;
        }
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return 1;
    }
}

public class Solution {
    public int CountSubIslands(int[][] grid1, int[][] grid2) {
        int ROWS = grid1.Length, COLS = grid1[0].Length, N = ROWS * COLS;
        DSU dsu = new DSU(N);

        int land = 0, unions = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid2[r][c] == 0) continue;
                land++;
                if (r + 1 < ROWS && grid2[r + 1][c] == 1)
                    unions += dsu.Union(r * COLS + c, (r + 1) * COLS + c);
                if (c + 1 < COLS && grid2[r][c + 1] == 1)
                    unions += dsu.Union(r * COLS + c, r * COLS + c + 1);
                if (grid1[r][c] == 0)
                    unions += dsu.Union(r * COLS + c, N);
            }
        }
        return land - unions;
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

func (d *DSU) Union(u, v int) int {
    pu, pv := d.Find(u), d.Find(v)
    if pu == pv {
        return 0
    }
    if d.Size[pu] < d.Size[pv] {
        pu, pv = pv, pu
    }
    d.Size[pu] += d.Size[pv]
    d.Parent[pv] = pu
    return 1
}

func countSubIslands(grid1 [][]int, grid2 [][]int) int {
    ROWS, COLS := len(grid1), len(grid1[0])
    N := ROWS * COLS
    dsu := NewDSU(N)

    getId := func(r, c int) int {
        return r*COLS + c
    }

    land, unions := 0, 0
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if grid2[r][c] == 0 {
                continue
            }
            land++
            if r+1 < ROWS && grid2[r+1][c] == 1 {
                unions += dsu.Union(getId(r, c), getId(r+1, c))
            }
            if c+1 < COLS && grid2[r][c+1] == 1 {
                unions += dsu.Union(getId(r, c), getId(r, c+1))
            }
            if grid1[r][c] == 0 {
                unions += dsu.Union(getId(r, c), N)
            }
        }
    }
    return land - unions
}
```

```kotlin
class DSU(n: Int) {
    private val parent = IntArray(n + 1) { it }
    private val size = IntArray(n + 1) { 1 }

    fun find(node: Int): Int {
        if (parent[node] != node) parent[node] = find(parent[node])
        return parent[node]
    }

    fun union(u: Int, v: Int): Int {
        var pu = find(u)
        var pv = find(v)
        if (pu == pv) return 0
        if (size[pu] < size[pv]) {
            val temp = pu; pu = pv; pv = temp
        }
        size[pu] += size[pv]
        parent[pv] = pu
        return 1
    }
}

class Solution {
    fun countSubIslands(grid1: Array<IntArray>, grid2: Array<IntArray>): Int {
        val ROWS = grid1.size
        val COLS = grid1[0].size
        val N = ROWS * COLS
        val dsu = DSU(N)

        fun getId(r: Int, c: Int) = r * COLS + c

        var land = 0
        var unions = 0
        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                if (grid2[r][c] == 0) continue
                land++
                if (r + 1 < ROWS && grid2[r + 1][c] == 1)
                    unions += dsu.union(getId(r, c), getId(r + 1, c))
                if (c + 1 < COLS && grid2[r][c + 1] == 1)
                    unions += dsu.union(getId(r, c), getId(r, c + 1))
                if (grid1[r][c] == 0)
                    unions += dsu.union(getId(r, c), N)
            }
        }
        return land - unions
    }
}
```

```swift
class DSU {
    var parent: [Int]
    var size: [Int]

    init(_ n: Int) {
        parent = Array(0...n)
        size = [Int](repeating: 1, count: n + 1)
    }

    func find(_ node: Int) -> Int {
        if parent[node] != node {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    func union(_ u: Int, _ v: Int) -> Int {
        var pu = find(u), pv = find(v)
        if pu == pv { return 0 }
        if size[pu] < size[pv] {
            swap(&pu, &pv)
        }
        size[pu] += size[pv]
        parent[pv] = pu
        return 1
    }
}

class Solution {
    func countSubIslands(_ grid1: [[Int]], _ grid2: [[Int]]) -> Int {
        let ROWS = grid1.count, COLS = grid1[0].count
        let N = ROWS * COLS
        let dsu = DSU(N)

        func getId(_ r: Int, _ c: Int) -> Int {
            return r * COLS + c
        }

        var land = 0, unions = 0
        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid2[r][c] == 0 { continue }
                land += 1
                if r + 1 < ROWS && grid2[r + 1][c] == 1 {
                    unions += dsu.union(getId(r, c), getId(r + 1, c))
                }
                if c + 1 < COLS && grid2[r][c + 1] == 1 {
                    unions += dsu.union(getId(r, c), getId(r, c + 1))
                }
                if grid1[r][c] == 0 {
                    unions += dsu.union(getId(r, c), N)
                }
            }
        }
        return land - unions
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## Common Pitfalls

### Returning Early When a Mismatch is Found
A critical mistake is returning `false` immediately when finding a cell that exists in `grid2` but not in `grid1`. This leaves part of the island unexplored and unvisited, causing those cells to be counted as separate islands later.

```python
# Wrong: Early return leaves island partially visited
if grid1[r][c] == 0:
    return False  # Other cells in this island won't be marked

# Correct: Continue exploring, track result with a variable
res = grid1[r][c] == 1
res &= dfs(r - 1, c)  # Must visit all cells
```

### Using OR Instead of AND for Recursive Results
When combining results from the four directional DFS calls, using OR (`|`) instead of AND (`&`) will incorrectly mark an island as a sub-island if any single cell matches, rather than requiring all cells to match.

### Checking the Wrong Grid for Land Cells
When deciding whether to explore a neighboring cell, the check must be against `grid2` (where we're finding islands), not `grid1`. The `grid1` check determines validity, but `grid2` determines connectivity.
