## 1. Depth First Search

::tabs-start

```python
class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        visit = set()

        def dfs(r, c):
            if (r < 0 or r == ROWS or c < 0 or
                c == COLS or grid[r][c] == 0 or
                (r, c) in visit
            ):
                return 0
            visit.add((r, c))
            return (1 + dfs(r + 1, c) + 
                        dfs(r - 1, c) + 
                        dfs(r, c + 1) + 
                        dfs(r, c - 1))

        area = 0
        for r in range(ROWS):
            for c in range(COLS):
                area = max(area, dfs(r, c))
        return area
```

```java
public class Solution {
    private static final int[][] directions = {{1, 0}, {-1, 0}, 
                                               {0, 1}, {0, -1}};
    
    public int maxAreaOfIsland(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int area = 0;
        
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    area = Math.max(area, dfs(grid, r, c));
                }
            }
        }
        
        return area;
    }
    
    private int dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.length || 
            c >= grid[0].length || grid[r][c] == 0) {
            return 0;
        }
        
        grid[r][c] = 0;
        int res = 1;
        for (int[] dir : directions) {
            res += dfs(grid, r + dir[0], c + dir[1]);
        }
        return res;
    }
}
```

```cpp
class Solution {
    int directions[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        int area = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    area = max(area, dfs(grid, r, c));
                }
            }
        }
        
        return area;
    }
    
    int dfs(vector<vector<int>>& grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.size() || 
            c >= grid[0].size() || grid[r][c] == 0) {
            return 0;
        }
        
        grid[r][c] = 0;
        int res = 1;
        for (int i = 0; i < 4; i++) {
            res += dfs(grid, r + directions[i][0], 
                             c + directions[i][1]);
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
    maxAreaOfIsland(grid) {
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const ROWS = grid.length, COLS = grid[0].length;

        const dfs = (r, c) => {
            if (r < 0 || c < 0 || r >= ROWS || 
                c >= COLS || grid[r][c] === 0) return 0;
            
            grid[r][c] = 0;
            let res = 1;
            for (const [dr, dc] of directions) {
                res += dfs(r + dr, c + dc);
            }
            return res;
        };

        let area = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1) {
                    area = Math.max(area, dfs(r, c));
                }
            }
        }

        return area;
    }
}
```

```csharp
public class Solution {
    private static readonly int[][] directions = new int[][] {
        new int[] {1, 0}, new int[] {-1, 0}, 
        new int[] {0, 1}, new int[] {0, -1}
    };
    
    public int MaxAreaOfIsland(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int area = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    area = Math.Max(area, Dfs(grid, r, c));
                }
            }
        }

        return area;
    }

    private int Dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.Length || 
            c >= grid[0].Length || grid[r][c] == 0) {
            return 0;
        }

        grid[r][c] = 0;
        int res = 1;
        foreach (var dir in directions) {
            res += Dfs(grid, r + dir[0], c + dir[1]);
        }
        return res;
    }
}
```

```go
func maxAreaOfIsland(grid [][]int) int {
    rows, cols := len(grid), len(grid[0])
    visit := make(map[[2]int]bool)

    var dfs func(r, c int) int
    dfs = func(r, c int) int {
        if r < 0 || r >= rows || c < 0 || c >= cols || 
           grid[r][c] == 0 || visit[[2]int{r, c}] {
            return 0
        }
        visit[[2]int{r, c}] = true
        return 1 + dfs(r+1, c) + dfs(r-1, c) + dfs(r, c+1) + dfs(r, c-1)
    }

    area := 0
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            area = max(area, dfs(r, c))
        }
    }
    return area
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
    fun maxAreaOfIsland(grid: Array<IntArray>): Int {
        val rows = grid.size
        val cols = grid[0].size
        val visit = HashSet<Pair<Int, Int>>()

        fun dfs(r: Int, c: Int): Int {
            if (r < 0 || r >= rows || c < 0 || c >= cols || 
                grid[r][c] == 0 || visit.contains(r to c)) {
                return 0
            }
            visit.add(r to c)
            return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)
        }

        var area = 0
        for (r in 0 until rows) {
            for (c in 0 until cols) {
                area = maxOf(area, dfs(r, c))
            }
        }
        return area
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the $grid$.

---

## 2. Breadth First Search

::tabs-start

```python
class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
        ROWS, COLS = len(grid), len(grid[0])
        area = 0

        def bfs(r, c):
            q = deque()
            grid[r][c] = 0
            q.append((r, c))
            res = 1

            while q:
                row, col = q.popleft()  
                for dr, dc in directions:
                    nr, nc = dr + row, dc + col
                    if (nr < 0 or nc < 0 or nr >= ROWS or
                        nc >= COLS or grid[nr][nc] == 0
                    ):
                        continue
                    q.append((nr, nc))
                    grid[nr][nc] = 0
                    res += 1
            return res

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == 1:
                    area = max(area, bfs(r, c))

        return area
```

```java
public class Solution {
    private static final int[][] directions = {{1, 0}, {-1, 0}, 
                                               {0, 1}, {0, -1}};
    
    public int maxAreaOfIsland(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int area = 0;
        
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    area = Math.max(area, bfs(grid, r, c));
                }
            }
        }
        
        return area;
    }
    
    private int bfs(int[][] grid, int r, int c) {
        Queue<int[]> q = new LinkedList<>();
        grid[r][c] = 0;
        q.add(new int[]{r, c});
        int res = 1;

        while (!q.isEmpty()) {
            int[] node = q.poll();
            int row = node[0], col = node[1];
            
            for (int[] dir : directions) {
                int nr = row + dir[0], nc = col + dir[1];
                if (nr >= 0 && nc >= 0 && nr < grid.length && 
                    nc < grid[0].length && grid[nr][nc] == 1) {
                    q.add(new int[]{nr, nc});
                    grid[nr][nc] = 0;
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
    int directions[4][2] = {{1, 0}, {-1, 0}, 
                            {0, 1}, {0, -1}};
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        int area = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    area = max(area, bfs(grid, r, c));
                }
            }
        }

        return area;
    }

    int bfs(vector<vector<int>>& grid, int r, int c) {
        queue<pair<int, int>> q;
        grid[r][c] = 0;
        q.push({r, c});
        int res = 1;

        while (!q.empty()) {
            auto node = q.front();q.pop();
            int row = node.first, col = node.second;
            for (int i = 0; i < 4; i++) {
                int nr = row + directions[i][0];
                int nc = col + directions[i][1];
                if (nr >= 0 && nc >= 0 && nr < grid.size() && 
                    nc < grid[0].size() && grid[nr][nc] == 1) {
                    q.push({nr, nc});
                    grid[nr][nc] = 0;
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
    maxAreaOfIsland(grid) {
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const ROWS = grid.length, COLS = grid[0].length;
        let area = 0;

        const bfs = (r, c) => {
            const q = new Queue();
            q.push([r, c]);
            grid[r][c] = 0;
            let res = 1;
            
            while (!q.isEmpty()) {
                const [row, col] = q.pop();
                for (const [dr, dc] of directions) {
                    const nr = row + dr, nc = col + dc;
                    if (nr >= 0 && nc >= 0 && nr < ROWS && 
                        nc < COLS && grid[nr][nc] === 1) {
                        q.push([nr, nc]);
                        grid[nr][nc] = 0;
                        res++;
                    }
                }
            }
            return res;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1) {
                    area = Math.max(area, bfs(r, c));
                }
            }
        }

        return area;
    }
}
```

```csharp
public class Solution {
    private static readonly int[][] directions = new int[][] {
        new int[] {1, 0}, new int[] {-1, 0}, 
        new int[] {0, 1}, new int[] {0, -1}
    };

    public int MaxAreaOfIsland(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int area = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    area = Math.Max(area, Bfs(grid, r, c));
                }
            }
        }

        return area;
    }

    private int Bfs(int[][] grid, int r, int c) {
        Queue<int[]> q = new Queue<int[]>();
        grid[r][c] = 0;
        q.Enqueue(new int[] { r, c });
        int res = 1;

        while (q.Count > 0) {
            var node = q.Dequeue();
            int row = node[0], col = node[1];

            foreach (var dir in directions) {
                int nr = row + dir[0], nc = col + dir[1];
                if (nr >= 0 && nc >= 0 && nr < grid.Length && 
                    nc < grid[0].Length && grid[nr][nc] == 1) {
                    q.Enqueue(new int[] { nr, nc });
                    grid[nr][nc] = 0;
                    res++;
                }
            }
        }
        return res;
    }
}
```

```go
func maxAreaOfIsland(grid [][]int) int {
    directions := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
    rows, cols := len(grid), len(grid[0])
    area := 0

    var bfs func(r, c int) int
    bfs = func(r, c int) int {
        q := [][]int{{r, c}}
        grid[r][c] = 0
        res := 1

        for len(q) > 0 {
            front := q[0]
            q = q[1:]
            row, col := front[0], front[1]
            for _, dir := range directions {
                nr, nc := row+dir[0], col+dir[1]
                if nr < 0 || nc < 0 || nr >= rows || 
                   nc >= cols || grid[nr][nc] == 0 {
                    continue
                }
                q = append(q, []int{nr, nc})
                grid[nr][nc] = 0
                res++
            }
        }
        return res
    }

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == 1 {
                area = max(area, bfs(r, c))
            }
        }
    }
    return area
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
    fun maxAreaOfIsland(grid: Array<IntArray>): Int {
        val directions = arrayOf(intArrayOf(1, 0), 
                                 intArrayOf(-1, 0), 
                                 intArrayOf(0, 1), 
                                 intArrayOf(0, -1))
        val rows = grid.size
        val cols = grid[0].size
        var area = 0
        
        fun bfs(r: Int, c: Int): Int {
            val queue = ArrayDeque<Pair<Int, Int>>()
            grid[r][c] = 0
            queue.add(Pair(r, c))
            var res = 1
            
            while (queue.isNotEmpty()) {
                val (row, col) = queue.removeFirst()
                
                for ((dr, dc) in directions) {
                    val nr = dr + row
                    val nc = dc + col
                    
                    if (nr < 0 || nc < 0 || nr >= rows || 
                        nc >= cols || grid[nr][nc] == 0) {
                        continue
                    }
                    
                    queue.add(Pair(nr, nc))
                    grid[nr][nc] = 0
                    res++
                }
            }
            
            return res
        }
        
        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (grid[r][c] == 1) {
                    area = maxOf(area, bfs(r, c))
                }
            }
        }
        
        return area
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the $grid$.

---

## 3. Disjoint Set Union

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
        if self.Size[pu] >= self.Size[pv]:
            self.Size[pu] += self.Size[pv]
            self.Parent[pv] = pu
        else:
            self.Size[pv] += self.Size[pu]
            self.Parent[pu] = pv
        return True
    
    def getSize(self, node):
        par = self.find(node)
        return self.Size[par]

class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        dsu = DSU(ROWS * COLS)

        def index(r, c):
            return r * COLS + c

        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        area = 0

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == 1:
                    for dr, dc in directions:
                        nr, nc = r + dr, c + dc
                        if (nr < 0 or nc < 0 or nr >= ROWS or
                            nc >= COLS or grid[nr][nc] == 0
                        ):
                            continue
                            
                        dsu.union(index(r, c), index(nr, nc))

                    area = max(area, dsu.getSize(index(r, c)))

        return area
```

```java
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

    public int find(int node) {
        if (node != Parent[node]) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    public boolean union(int u, int v) {
        int pu = find(u);
        int pv = find(v);
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

    public int getSize(int node) {
        return Size[find(node)];
    }
}

public class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        int ROWS = grid.length;
        int COLS = grid[0].length;
        DSU dsu = new DSU(ROWS * COLS);

        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        int area = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    for (int[] d : directions) {
                        int nr = r + d[0];
                        int nc = c + d[1];
                        if (nr >= 0 && nc >= 0 && nr < ROWS && 
                            nc < COLS && grid[nr][nc] == 1) {
                            dsu.union(r * COLS + c, nr * COLS + nc);
                        }
                    }
                    area = Math.max(area, dsu.getSize(r * COLS + c));
                }
            }
        }

        return area;
    }
}
```

```cpp
class DSU {
    vector<int> Parent, Size;
public:
    DSU(int n) {
        Parent.resize(n + 1);
        Size.resize(n + 1);
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    int find(int node) {
        if (node != Parent[node]) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    bool unionBySize(int u, int v) {
        int pu = find(u);
        int pv = find(v);
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

    int getSize(int node) {
        return Size[find(node)];
    }
};

class Solution {
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int ROWS = grid.size();
        int COLS = grid[0].size();
        DSU dsu(ROWS * COLS);

        int directions[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        int area = 0;

        auto index = [&](int r, int c) {
            return r * COLS + c;
        };

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    for (auto& d : directions) {
                        int nr = r + d[0];
                        int nc = c + d[1];
                        if (nr >= 0 && nc >= 0 && nr < ROWS && 
                            nc < COLS && grid[nr][nc] == 1) {
                            dsu.unionBySize(index(r, c), index(nr, nc));
                        }
                    }
                    area = max(area, dsu.getSize(index(r, c)));
                }
            }
        }

        return area;
    }
};
```

```javascript
class DSU {
    constructor(n) {
        this.Parent = Array(n + 1).fill(0).map((_, i) => i);
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
        let pu = this.find(u);
        let pv = this.find(v);
        if (pu === pv) return false;
        if (this.Size[pu] >= this.Size[pv]) {
            this.Size[pu] += this.Size[pv];
            this.Parent[pv] = pu;
        } else {
            this.Size[pv] += this.Size[pu];
            this.Parent[pu] = pv;
        }
        return true;
    }

    /**
     * @param {number} node
     * @return {number}
     */
    getSize(node) {
        return this.Size[this.find(node)];
    }
}

class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maxAreaOfIsland(grid) {
        const ROWS = grid.length;
        const COLS = grid[0].length;
        const dsu = new DSU(ROWS * COLS);

        const directions = [
            [1, 0], [-1, 0], [0, 1], [0, -1]
        ];
        let area = 0;

        const index = (r, c) => r * COLS + c;

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1) {
                    for (let [dr, dc] of directions) {
                        let nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nc >= 0 && nr < ROWS && 
                            nc < COLS && grid[nr][nc] === 1) {
                            dsu.union(index(r, c), index(nr, nc));
                        }
                    }
                    area = Math.max(area, dsu.getSize(index(r, c)));
                }
            }
        }

        return area;
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
        if (node != Parent[node]) {
            Parent[node] = Find(Parent[node]);
        }
        return Parent[node];
    }

    public bool Union(int u, int v) {
        int pu = Find(u);
        int pv = Find(v);
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

    public int GetSize(int node) {
        return Size[Find(node)];
    }
}

public class Solution {
    public int MaxAreaOfIsland(int[][] grid) {
        int ROWS = grid.Length;
        int COLS = grid[0].Length;
        DSU dsu = new DSU(ROWS * COLS);

        int[][] directions = new int[][] {
            new int[] { 1, 0 }, new int[] { -1, 0 }, 
            new int[] { 0, 1 }, new int[] { 0, -1 }
        };
        int area = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) {
                    foreach (var d in directions) {
                        int nr = r + d[0];
                        int nc = c + d[1];
                        if (nr >= 0 && nc >= 0 && nr < ROWS && 
                            nc < COLS && grid[nr][nc] == 1) {
                            dsu.Union(r * COLS + c, nr * COLS + nc);
                        }
                    }
                    area = Math.Max(area, dsu.GetSize(r * COLS + c));
                }
            }
        }

        return area;
    }
}
```

```go
type DSU struct {
    Parent []int
    Size   []int
}

func (dsu *DSU) find(node int) int {
    if dsu.Parent[node] != node {
        dsu.Parent[node] = dsu.find(dsu.Parent[node])
    }
    return dsu.Parent[node]
}

func (dsu *DSU) union(u, v int) bool {
    pu := dsu.find(u)
    pv := dsu.find(v)
    if pu == pv {
        return false
    }
    if dsu.Size[pu] >= dsu.Size[pv] {
        dsu.Size[pu] += dsu.Size[pv]
        dsu.Parent[pv] = pu
    } else {
        dsu.Size[pv] += dsu.Size[pu]
        dsu.Parent[pu] = pv
    }
    return true
}

func (dsu *DSU) getSize(node int) int {
    par := dsu.find(node)
    return dsu.Size[par]
}

func maxAreaOfIsland(grid [][]int) int {
    rows, cols := len(grid), len(grid[0])
    dsu := DSU{
        Parent: make([]int, rows*cols+1),
        Size:   make([]int, rows*cols+1),
    }

    for i := 0; i <= rows*cols; i++ {
        dsu.Parent[i] = i
        dsu.Size[i] = 1
    }

    index := func(r, c int) int {
        return r*cols + c
    }

    directions := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
    area := 0

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == 1 {
                for _, dir := range directions {
                    nr, nc := r+dir[0], c+dir[1]
                    if nr < 0 || nc < 0 || nr >= rows || 
                       nc >= cols || grid[nr][nc] == 0 {
                        continue
                    }
                    dsu.union(index(r, c), index(nr, nc))
                }
                area = max(area, dsu.getSize(index(r, c)))
            }
        }
    }
    return area
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class DSU(n: Int) {
    val Parent = IntArray(n + 1) { it }
    val Size = IntArray(n + 1) { 1 }

    fun find(node: Int): Int {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node])
        }
        return Parent[node]
    }

    fun union(u: Int, v: Int): Boolean {
        val pu = find(u)
        val pv = find(v)
        if (pu == pv) {
            return false
        }
        if (Size[pu] >= Size[pv]) {
            Size[pu] += Size[pv]
            Parent[pv] = pu
        } else {
            Size[pv] += Size[pu]
            Parent[pu] = pv
        }
        return true
    }

    fun getSize(node: Int): Int {
        val par = find(node)
        return Size[par]
    }
}

class Solution {
    fun maxAreaOfIsland(grid: Array<IntArray>): Int {
        val rows = grid.size
        val cols = grid[0].size
        val dsu = DSU(rows * cols)

        val index = { r: Int, c: Int -> r * cols + c }

        val directions = arrayOf(
            intArrayOf(1, 0),
            intArrayOf(-1, 0),
            intArrayOf(0, 1),
            intArrayOf(0, -1)
        )
        var area = 0

        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (grid[r][c] == 1) {
                    for (dir in directions) {
                        val nr = r + dir[0]
                        val nc = c + dir[1]
                        if (nr < 0 || nc < 0 || nr >= rows || 
                            nc >= cols || grid[nr][nc] == 0) {
                            continue
                        }
                        dsu.union(index(r, c), index(nr, nc))
                    }
                    area = maxOf(area, dsu.getSize(index(r, c)))
                }
            }
        }
        return area
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the $grid$.