## 1. Depth First Search - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given grid.

---

## 2. Depth First Search - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given grid.

---

## 3. Breadth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given grid.

---

## 4. Disjoint Set Union

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given grid.
