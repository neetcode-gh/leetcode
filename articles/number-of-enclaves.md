## 1. Depth First Search

::tabs-start

```python
class Solution:
    def numEnclaves(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        direct = [[0, 1], [0, -1], [1, 0], [-1, 0]]

        # Return num of land cells
        def dfs(r, c):
            if (r < 0 or c < 0 or
                r == ROWS or c == COLS or
                not grid[r][c] or (r, c) in visit):
                return 0
            visit.add((r, c))
            res = 1
            for dr, dc in direct:
                res += dfs(r + dr, c + dc)
            return res

        visit = set()
        land, borderLand = 0, 0
        for r in range(ROWS):
            for c in range(COLS):
                land += grid[r][c]
                if (grid[r][c] and (r, c) not in visit and
                    (c in [0, COLS - 1] or r in [0, ROWS - 1])):
                    borderLand += dfs(r, c)

        return land - borderLand
```

```java
public class Solution {
    private int ROWS, COLS;
    private boolean[][] visit;
    private int[][] direct = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    public int numEnclaves(int[][] grid) {
        this.ROWS = grid.length;
        this.COLS = grid[0].length;
        this.visit = new boolean[ROWS][COLS];

        int land = 0, borderLand = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                land += grid[r][c];
                if (grid[r][c] == 1 && !visit[r][c] &&
                    (r == 0 || r == ROWS - 1 || c == 0 || c == COLS - 1)) {
                    borderLand += dfs(r, c, grid);
                }
            }
        }
        return land - borderLand;
    }

    private int dfs(int r, int c, int[][] grid) {
        if (r < 0 || c < 0 || r == ROWS || c == COLS ||
            grid[r][c] == 0 || visit[r][c]) {
            return 0;
        }
        visit[r][c] = true;
        int res = 1;
        for (int[] d : direct) {
            res += dfs(r + d[0], c + d[1], grid);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int ROWS, COLS;
    vector<vector<bool>> visit;
    vector<vector<int>> direct = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    int numEnclaves(vector<vector<int>>& grid) {
        this->ROWS = grid.size();
        this->COLS = grid[0].size();
        this->visit = vector<vector<bool>>(ROWS, vector<bool>(COLS, false));

        int land = 0, borderLand = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                land += grid[r][c];
                if (grid[r][c] == 1 && !visit[r][c] &&
                    (r == 0 || r == ROWS - 1 || c == 0 || c == COLS - 1)) {
                    borderLand += dfs(r, c, grid);
                }
            }
        }
        return land - borderLand;
    }

private:
    int dfs(int r, int c, vector<vector<int>>& grid) {
        if (r < 0 || c < 0 || r == ROWS || c == COLS ||
            grid[r][c] == 0 || visit[r][c]) {
            return 0;
        }
        visit[r][c] = true;
        int res = 1;
        for (auto& d : direct) {
            res += dfs(r + d[0], c + d[1], grid);
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
    numEnclaves(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        const visit = Array.from({ length: ROWS }, () =>
            Array(COLS).fill(false),
        );
        const direct = [0, 1, 0, -1, 0];

        const dfs = (r, c) => {
            if (
                r < 0 ||
                c < 0 ||
                r === ROWS ||
                c === COLS ||
                grid[r][c] === 0 ||
                visit[r][c]
            ) {
                return 0;
            }
            visit[r][c] = true;
            let res = 1;
            for (let d = 0; d < 4; d++) {
                res += dfs(r + direct[d], c + direct[d + 1]);
            }
            return res;
        };

        let land = 0,
            borderLand = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                land += grid[r][c];
                if (
                    grid[r][c] === 1 &&
                    !visit[r][c] &&
                    (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1)
                ) {
                    borderLand += dfs(r, c);
                }
            }
        }
        return land - borderLand;
    }
}
```

```csharp
public class Solution {
    public int NumEnclaves(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        bool[][] visit = new bool[ROWS][];
        for (int i = 0; i < ROWS; i++) visit[i] = new bool[COLS];
        int[][] direct = new int[][] {
            new int[] { 0, 1 }, new int[] { 0, -1 },
            new int[] { 1, 0 }, new int[] { -1, 0 }
        };

        int Dfs(int r, int c) {
            if (r < 0 || c < 0 || r == ROWS || c == COLS || grid[r][c] == 0 || visit[r][c])
                return 0;

            visit[r][c] = true;
            int res = 1;
            foreach (var d in direct) {
                res += Dfs(r + d[0], c + d[1]);
            }
            return res;
        }

        int land = 0, borderLand = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                land += grid[r][c];
                if (grid[r][c] == 1 && !visit[r][c] &&
                    (r == 0 || r == ROWS - 1 || c == 0 || c == COLS - 1)) {
                    borderLand += Dfs(r, c);
                }
            }
        }

        return land - borderLand;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given grid.

---

## 2. Breadth First Search

::tabs-start

```python
class Solution:
    def numEnclaves(self, grid: list[list[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        direct = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        visit = [[False] * COLS for _ in range(ROWS)]
        q = deque()

        land, borderLand = 0, 0
        for r in range(ROWS):
            for c in range(COLS):
                land += grid[r][c]
                if (grid[r][c] == 1 and
                    (r in [0, ROWS - 1] or c in [0, COLS - 1])
                ):
                    q.append((r, c))
                    visit[r][c] = True

        while q:
            r, c = q.popleft()
            borderLand += 1
            for dr, dc in direct:
                nr, nc = r + dr, c + dc
                if (0 <= nr < ROWS and 0 <= nc < COLS and
                    grid[nr][nc] == 1 and not visit[nr][nc]
                ):
                    q.append((nr, nc))
                    visit[nr][nc] = True

        return land - borderLand
```

```java
public class Solution {
    public int numEnclaves(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int[][] direct = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        boolean[][] visit = new boolean[ROWS][COLS];
        Queue<int[]> q = new LinkedList<>();

        int land = 0, borderLand = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                land += grid[r][c];
                if (grid[r][c] == 1 && (r == 0 || r == ROWS - 1 ||
                    c == 0 || c == COLS - 1)) {
                    q.offer(new int[]{r, c});
                    visit[r][c] = true;
                }
            }
        }

        while (!q.isEmpty()) {
            int[] cell = q.poll();
            int r = cell[0], c = cell[1];
            borderLand++;

            for (int[] d : direct) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < ROWS && nc < COLS &&
                    grid[nr][nc] == 1 && !visit[nr][nc]) {
                    q.offer(new int[]{nr, nc});
                    visit[nr][nc] = true;
                }
            }
        }

        return land - borderLand;
    }
}
```

```cpp
class Solution {
public:
    int ROWS, COLS;
    vector<vector<bool>> visit;
    vector<vector<int>> direct = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    int numEnclaves(vector<vector<int>>& grid) {
        this->ROWS = grid.size();
        this->COLS = grid[0].size();
        this->visit = vector<vector<bool>>(ROWS, vector<bool>(COLS, false));

        int land = 0, borderLand = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                land += grid[r][c];
                if (grid[r][c] == 1 && !visit[r][c] &&
                    (r == 0 || r == ROWS - 1 || c == 0 || c == COLS - 1)) {
                    borderLand += dfs(r, c, grid);
                }
            }
        }
        return land - borderLand;
    }

private:
    int dfs(int r, int c, vector<vector<int>>& grid) {
        if (r < 0 || c < 0 || r == ROWS || c == COLS ||
            grid[r][c] == 0 || visit[r][c]) {
            return 0;
        }
        visit[r][c] = true;
        int res = 1;
        for (auto& d : direct) {
            res += dfs(r + d[0], c + d[1], grid);
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
    numEnclaves(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        const direct = [0, 1, 0, -1, 0];
        const visit = Array.from({ length: ROWS }, () =>
            Array(COLS).fill(false),
        );
        const q = new Queue();

        let land = 0,
            borderLand = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                land += grid[r][c];
                if (
                    grid[r][c] === 1 &&
                    (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1)
                ) {
                    q.push([r, c]);
                    visit[r][c] = true;
                }
            }
        }

        while (!q.isEmpty()) {
            let [r, c] = q.pop();
            borderLand++;
            for (let d = 0; d < 4; d++) {
                let nr = r + direct[d],
                    nc = c + direct[d + 1];
                if (
                    nr >= 0 &&
                    nc >= 0 &&
                    nr < ROWS &&
                    nc < COLS &&
                    grid[nr][nc] === 1 &&
                    !visit[nr][nc]
                ) {
                    q.push([nr, nc]);
                    visit[nr][nc] = true;
                }
            }
        }

        return land - borderLand;
    }
}
```

```csharp
public class Solution {
    public int NumEnclaves(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int[][] direct = new int[][] {
            new int[] {0, 1}, new int[] {0, -1},
            new int[] {1, 0}, new int[] {-1, 0}
        };

        bool[][] visit = new bool[ROWS][];
        for (int i = 0; i < ROWS; i++) visit[i] = new bool[COLS];

        Queue<int[]> q = new Queue<int[]>();
        int land = 0, borderLand = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                land += grid[r][c];
                if (grid[r][c] == 1 && (r == 0 || r == ROWS - 1 || c == 0 || c == COLS - 1)) {
                    q.Enqueue(new int[] { r, c });
                    visit[r][c] = true;
                }
            }
        }

        while (q.Count > 0) {
            var cell = q.Dequeue();
            int r = cell[0], c = cell[1];
            borderLand++;

            foreach (var d in direct) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < ROWS && nc < COLS &&
                    grid[nr][nc] == 1 && !visit[nr][nc]) {
                    q.Enqueue(new int[] { nr, nc });
                    visit[nr][nc] = true;
                }
            }
        }

        return land - borderLand;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given grid.

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
    def numEnclaves(self, grid: list[list[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        N = ROWS * COLS
        def index(r, c):
            return r * COLS + c

        dsu = DSU(N)
        directions = [0, 1, 0, -1, 0]
        land = 0
        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == 0:
                    continue
                land += 1
                for d in range(4):
                    nr, nc = r + directions[d], c + directions[d + 1]
                    if 0 <= nr < ROWS and 0 <= nc < COLS:
                        if grid[nr][nc] == 1:
                            dsu.union(index(r, c), index(nr, nc))
                    else:
                        dsu.union(N, index(r, c))

        borderLand = dsu.Size[dsu.find(N)]
        return land - borderLand + 1
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
    public int numEnclaves(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int N = ROWS * COLS;
        DSU dsu = new DSU(N);
        int[] directions = {0, 1, 0, -1, 0};
        int land = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0) continue;
                land++;
                for (int d = 0; d < 4; d++) {
                    int nr = r + directions[d], nc = c + directions[d + 1];
                    if (nr >= 0 && nc >= 0 && nr < ROWS && nc < COLS) {
                        if (grid[nr][nc] == 1) {
                            dsu.union(r * COLS + c, nr * COLS + nc);
                        }
                    } else {
                        dsu.union(N, r * COLS + c);
                    }
                }
            }
        }

        int borderLand = dsu.Size[dsu.find(N)];
        return land - borderLand + 1;
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
    int numEnclaves(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        int N = ROWS * COLS;
        DSU dsu(N);
        vector<int> directions = {0, 1, 0, -1, 0};
        int land = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0) continue;
                land++;
                for (int d = 0; d < 4; d++) {
                    int nr = r + directions[d], nc = c + directions[d + 1];
                    if (nr >= 0 && nc >= 0 && nr < ROWS && nc < COLS) {
                        if (grid[nr][nc] == 1) {
                            dsu.unionSets(r * COLS + c, nr * COLS + nc);
                        }
                    } else {
                        dsu.unionSets(N, r * COLS + c);
                    }
                }
            }
        }

        int borderLand = dsu.Size[dsu.find(N)];
        return land - borderLand + 1;
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
    numEnclaves(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        const N = ROWS * COLS;
        const dsu = new DSU(N);
        const directions = [0, 1, 0, -1, 0];
        let land = 0;

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 0) continue;
                land++;
                for (let d = 0; d < 4; d++) {
                    let nr = r + directions[d],
                        nc = c + directions[d + 1];
                    if (nr >= 0 && nc >= 0 && nr < ROWS && nc < COLS) {
                        if (grid[nr][nc] === 1) {
                            dsu.union(r * COLS + c, nr * COLS + nc);
                        }
                    } else {
                        dsu.union(N, r * COLS + c);
                    }
                }
            }
        }

        const borderLand = dsu.size[dsu.find(N)];
        return land - borderLand + 1;
    }
}
```

```csharp
public class DSU {
    public int[] Parent, Size;

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
    public int NumEnclaves(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int N = ROWS * COLS;
        DSU dsu = new DSU(N);
        int[] directions = new int[] { 0, 1, 0, -1, 0 };
        int land = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 0) continue;
                land++;
                for (int d = 0; d < 4; d++) {
                    int nr = r + directions[d], nc = c + directions[d + 1];
                    if (nr >= 0 && nc >= 0 && nr < ROWS && nc < COLS) {
                        if (grid[nr][nc] == 1) {
                            dsu.Union(r * COLS + c, nr * COLS + nc);
                        }
                    } else {
                        dsu.Union(N, r * COLS + c);
                    }
                }
            }
        }

        int borderLand = dsu.Size[dsu.Find(N)];
        return land - borderLand + 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given grid.
