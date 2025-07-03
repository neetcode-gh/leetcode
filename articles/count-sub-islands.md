## 1. Depth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Breadth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.
