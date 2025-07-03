## 1. Dijkstra's Algorithm

::tabs-start

```python
class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        ROWS, COLS = len(heights), len(heights[0])
        minHeap = [[0, 0, 0]]  # [diff, row, col]
        visit = set()
        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

        while minHeap:
            diff, r, c = heapq.heappop(minHeap)

            if (r, c) in visit:
                continue

            visit.add((r, c))

            if (r, c) == (ROWS - 1, COLS - 1):
                return diff

            for dr, dc in directions:
                newR, newC = r + dr, c + dc
                if (
                    newR < 0 or newC < 0 or
                    newR >= ROWS or newC >= COLS or
                    (newR, newC) in visit
                ):
                    continue

                newDiff = max(diff, abs(heights[r][c] - heights[newR][newC]))
                heapq.heappush(minHeap, [newDiff, newR, newC])

        return 0
```

```java
public class Solution {
    public int minimumEffortPath(int[][] heights) {
        int rows = heights.length;
        int cols = heights[0].length;
        int[][] dist = new int[rows][cols];
        for (int[] row : dist) {
            Arrays.fill(row, Integer.MAX_VALUE);
        }
        dist[0][0] = 0;

        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        minHeap.offer(new int[]{0, 0, 0}); // {diff, row, col}

        int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

        while (!minHeap.isEmpty()) {
            int[] curr = minHeap.poll();
            int diff = curr[0], r = curr[1], c = curr[2];

            if (r == rows - 1 && c == cols - 1) return diff;
            if (dist[r][c] < diff) continue;

            for (int[] dir : directions) {
                int newR = r + dir[0], newC = c + dir[1];
                if (newR < 0 || newC < 0 || newR >= rows || newC >= cols) {
                    continue;
                }

                int newDiff = Math.max(diff, Math.abs(heights[r][c] - heights[newR][newC]));
                if (newDiff < dist[newR][newC]) {
                    dist[newR][newC] = newDiff;
                    minHeap.offer(new int[]{newDiff, newR, newC});
                }
            }
        }

        return 0;
    }
}
```

```cpp
class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int rows = heights.size(), cols = heights[0].size();
        vector<vector<int>> dist(rows, vector<int>(cols, INT_MAX));
        dist[0][0] = 0;

        priority_queue<vector<int>, vector<vector<int>>, greater<>> minHeap;
        minHeap.push({0, 0, 0}); // {diff, row, col}

        vector<vector<int>> directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

        while (!minHeap.empty()) {
            auto curr = minHeap.top();
            minHeap.pop();
            int diff = curr[0], r = curr[1], c = curr[2];

            if (r == rows - 1 && c == cols - 1) return diff;
            if (dist[r][c] < diff) continue;

            for (auto& dir : directions) {
                int newR = r + dir[0], newC = c + dir[1];
                if (newR < 0 || newC < 0 || newR >= rows || newC >= cols) {
                    continue;
                }

                int newDiff = max(diff, abs(heights[r][c] - heights[newR][newC]));
                if (newDiff < dist[newR][newC]) {
                    dist[newR][newC] = newDiff;
                    minHeap.push({newDiff, newR, newC});
                }
            }
        }

        return 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number}
     */
    minimumEffortPath(heights) {
        const rows = heights.length;
        const cols = heights[0].length;
        const dist = Array.from({ length: rows }, () =>
            Array(cols).fill(Infinity),
        );
        dist[0][0] = 0;

        const minHeap = new MinPriorityQueue((a) => a[0]);
        minHeap.enqueue([0, 0, 0]); // [diff, row, col]

        const directions = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];

        while (!minHeap.isEmpty()) {
            const [diff, r, c] = minHeap.dequeue();

            if (r === rows - 1 && c === cols - 1) return diff;
            if (dist[r][c] < diff) continue;

            for (const [dr, dc] of directions) {
                const newR = r + dr;
                const newC = c + dc;
                if (newR < 0 || newC < 0 || newR >= rows || newC >= cols) {
                    continue;
                }

                const newDiff = Math.max(
                    diff,
                    Math.abs(heights[r][c] - heights[newR][newC]),
                );
                if (newDiff < dist[newR][newC]) {
                    dist[newR][newC] = newDiff;
                    minHeap.enqueue([newDiff, newR, newC]);
                }
            }
        }

        return 0;
    }
}
```

```csharp
public class Solution {
    public int MinimumEffortPath(int[][] heights) {
        int rows = heights.Length, cols = heights[0].Length;
        var directions = new int[][] {
            new int[] { 0, 1 },
            new int[] { 0, -1 },
            new int[] { 1, 0 },
            new int[] { -1, 0 }
        };

        var minHeap = new PriorityQueue<(int diff, int r, int c), int>();
        var visited = new HashSet<(int, int)>();
        minHeap.Enqueue((0, 0, 0), 0);

        while (minHeap.Count > 0) {
            var current = minHeap.Dequeue();
            int diff = current.diff, r = current.r, c = current.c;

            if (visited.Contains((r, c))) continue;
            visited.Add((r, c));

            if (r == rows - 1 && c == cols - 1) {
                return diff;
            }

            foreach (var dir in directions) {
                int newR = r + dir[0];
                int newC = c + dir[1];

                if (newR < 0 || newC < 0 || newR >= rows || newC >= cols || visited.Contains((newR, newC))) {
                    continue;
                }

                int newDiff = Math.Max(diff, Math.Abs(heights[r][c] - heights[newR][newC]));
                minHeap.Enqueue((newDiff, newR, newC), newDiff);
            }
        }

        return 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * \log (m * n))$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given matrix.

---

## 2. Binary Search + DFS

::tabs-start

```python
class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        ROWS, COLS = len(heights), len(heights[0])
        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

        def dfs(r, c, limit, visited):
            if r == ROWS - 1 and c == COLS - 1:
                return True

            visited.add((r, c))
            for dr, dc in directions:
                newR, newC = r + dr, c + dc
                if (newR < 0 or newC < 0 or
                    newR >= ROWS or newC >= COLS or
                    (newR, newC) in visited or
                    abs(heights[newR][newC] - heights[r][c]) > limit):
                    continue

                if dfs(newR, newC, limit, visited):
                    return True
            return False

        l, r = 0, 1000000
        res = r

        while l <= r:
            mid = (l + r) // 2
            if dfs(0, 0, mid, set()):
                res = mid
                r = mid - 1
            else:
                l = mid + 1

        return res
```

```java
public class Solution {
    private int ROWS, COLS;
    private int[][] heights;
    private int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
    private boolean[][] visited;

    public int minimumEffortPath(int[][] heights) {
        this.heights = heights;
        this.ROWS = heights.length;
        this.COLS = heights[0].length;
        this.visited = new boolean[ROWS][COLS];

        int l = 0, r = 1_000_000, res = r;

        while (l <= r) {
            int mid = (l + r) / 2;
            for (boolean[] row : visited) Arrays.fill(row, false);
            if (dfs(0, 0, mid)) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }

        return res;
    }

    private boolean dfs(int r, int c, int limit) {
        if (r == ROWS - 1 && c == COLS - 1) {
            return true;
        }

        visited[r][c] = true;
        for (int[] dir : directions) {
            int newR = r + dir[0];
            int newC = c + dir[1];
            if (newR < 0 || newC < 0 || newR >= ROWS || newC >= COLS || visited[newR][newC]) {
                continue;
            }
            if (Math.abs(heights[newR][newC] - heights[r][c]) > limit) {
                continue;
            }
            if (dfs(newR, newC, limit)) {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
private:
    int ROWS, COLS;
    vector<vector<int>> heights;
    vector<vector<bool>> visited;
    vector<vector<int>> directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        this->heights = heights;
        this->ROWS = heights.size();
        this->COLS = heights[0].size();
        this->visited = vector<vector<bool>>(ROWS, vector<bool>(COLS, false));

        int l = 0, r = 1'000'000, res = r;
        while (l <= r) {
            int mid = (l + r) / 2;
            for (auto& row : visited) {
                fill(row.begin(), row.end(), false);
            }
            if (dfs(0, 0, mid)) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return res;
    }

private:
    bool dfs(int r, int c, int limit) {
        if (r == ROWS - 1 && c == COLS - 1) {
            return true;
        }

        visited[r][c] = true;
        for (const auto& dir : directions) {
            int newR = r + dir[0];
            int newC = c + dir[1];
            if (newR < 0 || newC < 0 || newR >= ROWS || newC >= COLS || visited[newR][newC]) {
                continue;
            }
            if (abs(heights[newR][newC] - heights[r][c]) > limit) {
                continue;
            }
            if (dfs(newR, newC, limit)) {
                return true;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number}
     */
    minimumEffortPath(heights) {
        const ROWS = heights.length;
        const COLS = heights[0].length;
        const directions = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
        let visited = Array.from({ length: ROWS }, () =>
            Array(COLS).fill(false),
        );

        const dfs = (r, c, limit) => {
            if (r === ROWS - 1 && c === COLS - 1) {
                return true;
            }

            visited[r][c] = true;
            for (const [dr, dc] of directions) {
                const newR = r + dr;
                const newC = c + dc;

                if (
                    newR < 0 ||
                    newC < 0 ||
                    newR >= ROWS ||
                    newC >= COLS ||
                    visited[newR][newC]
                ) {
                    continue;
                }
                if (Math.abs(heights[newR][newC] - heights[r][c]) > limit) {
                    continue;
                }
                if (dfs(newR, newC, limit)) {
                    return true;
                }
            }
            return false;
        };

        let l = 0,
            r = 1_000_000,
            res = r;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            for (const row of visited) {
                row.fill(false);
            }
            if (dfs(0, 0, mid)) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private int[][] directions = new int[][] {
        new int[] { 0, 1 },
        new int[] { 0, -1 },
        new int[] { 1, 0 },
        new int[] { -1, 0 }
    };

    public int MinimumEffortPath(int[][] heights) {
        int rows = heights.Length;
        int cols = heights[0].Length;

        bool Dfs(int r, int c, int limit, HashSet<(int, int)> visited) {
            if (r == rows - 1 && c == cols - 1)
                return true;

            visited.Add((r, c));

            foreach (var dir in directions) {
                int newR = r + dir[0];
                int newC = c + dir[1];

                if (newR < 0 || newC < 0 || newR >= rows || newC >= cols ||
                    visited.Contains((newR, newC)) ||
                    Math.Abs(heights[newR][newC] - heights[r][c]) > limit)
                    continue;

                if (Dfs(newR, newC, limit, visited))
                    return true;
            }

            return false;
        }

        int left = 0, right = 1000000, res = right;

        while (left <= right) {
            int mid = (left + right) / 2;
            var visited = new HashSet<(int, int)>();
            if (Dfs(0, 0, mid, visited)) {
                res = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * \log (m * n))$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given matrix.

---

## 3. Kruskal's Algorithm

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
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        ROWS, COLS = len(heights), len(heights[0])
        edges = []
        for r in range(ROWS):
            for c in range(COLS):
                if r + 1 < ROWS:
                    edges.append((abs(heights[r][c] - heights[r + 1][c]), r * COLS + c, (r + 1) * COLS + c))
                if c + 1 < COLS:
                    edges.append((abs(heights[r][c] - heights[r][c + 1]), r * COLS + c, r * COLS + c + 1))

        edges.sort()
        dsu = DSU(ROWS * COLS)
        for weight, u, v in edges:
            dsu.union(u, v)
            if dsu.find(0) == dsu.find(ROWS * COLS - 1):
                return weight
        return 0
```

```java
class DSU {
    private int[] Parent;
    private int[] Size;

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
        int pu = find(u);
        int pv = find(v);
        if (pu == pv) {
            return false;
        }
        if (Size[pu] < Size[pv]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }
}

public class Solution {
    public int minimumEffortPath(int[][] heights) {
        int ROWS = heights.length;
        int COLS = heights[0].length;
        List<int[]> edges = new ArrayList<>();
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (r + 1 < ROWS) {
                    edges.add(new int[]{Math.abs(heights[r][c] - heights[r + 1][c]), r * COLS + c, (r + 1) * COLS + c});
                }
                if (c + 1 < COLS) {
                    edges.add(new int[]{Math.abs(heights[r][c] - heights[r][c + 1]), r * COLS + c, r * COLS + c + 1});
                }
            }
        }

        edges.sort(Comparator.comparingInt(a -> a[0]));
        DSU dsu = new DSU(ROWS * COLS);
        for (int[] edge : edges) {
            int weight = edge[0], u = edge[1], v = edge[2];
            dsu.union(u, v);
            if (dsu.find(0) == dsu.find(ROWS * COLS - 1)) {
                return weight;
            }
        }
        return 0;
    }
}
```

```cpp
class DSU {
private:
    vector<int> Parent, Size;

public:
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
        int pu = find(u);
        int pv = find(v);
        if (pu == pv) {
            return false;
        }
        if (Size[pu] < Size[pv]) {
            swap(pu, pv);
        }
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }
};

class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int ROWS = heights.size();
        int COLS = heights[0].size();
        vector<tuple<int, int, int>> edges;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (r + 1 < ROWS) {
                    edges.push_back({abs(heights[r][c] - heights[r + 1][c]), r * COLS + c, (r + 1) * COLS + c});
                }
                if (c + 1 < COLS) {
                    edges.push_back({abs(heights[r][c] - heights[r][c + 1]), r * COLS + c, r * COLS + c + 1});
                }
            }
        }

        sort(edges.begin(), edges.end());
        DSU dsu(ROWS * COLS);
        for (auto& edge : edges) {
            int weight, u, v;
            tie(weight, u, v) = edge;
            dsu.unionSets(u, v);
            if (dsu.find(0) == dsu.find(ROWS * COLS - 1)) {
                return weight;
            }
        }
        return 0;
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
     * @param {number[][]} heights
     * @return {number}
     */
    minimumEffortPath(heights) {
        const ROWS = heights.length;
        const COLS = heights[0].length;
        const edges = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (r + 1 < ROWS) {
                    edges.push([
                        Math.abs(heights[r][c] - heights[r + 1][c]),
                        r * COLS + c,
                        (r + 1) * COLS + c,
                    ]);
                }
                if (c + 1 < COLS) {
                    edges.push([
                        Math.abs(heights[r][c] - heights[r][c + 1]),
                        r * COLS + c,
                        r * COLS + c + 1,
                    ]);
                }
            }
        }

        edges.sort((a, b) => a[0] - b[0]);
        const dsu = new DSU(ROWS * COLS);
        for (const [weight, u, v] of edges) {
            dsu.union(u, v);
            if (dsu.find(0) === dsu.find(ROWS * COLS - 1)) {
                return weight;
            }
        }
        return 0;
    }
}
```

```csharp
public class DSU {
    private int[] parent;
    private int[] size;

    public DSU(int n) {
        parent = new int[n + 1];
        size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }

    public int Find(int node) {
        if (parent[node] != node) {
            parent[node] = Find(parent[node]);
        }
        return parent[node];
    }

    public bool Union(int u, int v) {
        int pu = Find(u);
        int pv = Find(v);
        if (pu == pv) return false;
        if (size[pu] < size[pv]) {
            (pu, pv) = (pv, pu);
        }
        size[pu] += size[pv];
        parent[pv] = pu;
        return true;
    }
}

public class Solution {
    public int MinimumEffortPath(int[][] heights) {
        int rows = heights.Length;
        int cols = heights[0].Length;
        List<(int, int, int)> edges = new List<(int, int, int)>();

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                int id = r * cols + c;
                if (r + 1 < rows) {
                    int downId = (r + 1) * cols + c;
                    int diff = Math.Abs(heights[r][c] - heights[r + 1][c]);
                    edges.Add((diff, id, downId));
                }
                if (c + 1 < cols) {
                    int rightId = r * cols + (c + 1);
                    int diff = Math.Abs(heights[r][c] - heights[r][c + 1]);
                    edges.Add((diff, id, rightId));
                }
            }
        }

        edges.Sort((a, b) => a.Item1.CompareTo(b.Item1));
        DSU dsu = new DSU(rows * cols);

        foreach (var (weight, u, v) in edges) {
            dsu.Union(u, v);
            if (dsu.Find(0) == dsu.Find(rows * cols - 1)) {
                return weight;
            }
        }

        return 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * \log (m * n))$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given matrix.

---

## 4. Shortest Path Faster Algorithm

::tabs-start

```python
class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        ROWS, COLS = len(heights), len(heights[0])
        dist = [float('inf')] * (ROWS * COLS)
        dist[0] = 0
        in_queue = [False] * (ROWS * COLS)

        def index(r, c):
            return r * COLS + c

        queue = deque([0])
        in_queue[0] = True
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

        while queue:
            u = queue.popleft()
            in_queue[u] = False
            r, c = divmod(u, COLS)

            for dr, dc in directions:
                newR, newC = r + dr, c + dc
                if 0 <= newR < ROWS and 0 <= newC < COLS:
                    v = index(newR, newC)
                    weight = abs(heights[r][c] - heights[newR][newC])
                    new_dist = max(dist[u], weight)
                    if new_dist < dist[v]:
                        dist[v] = new_dist
                        if not in_queue[v]:
                            queue.append(v)
                            in_queue[v] = True

        return dist[ROWS * COLS - 1]
```

```java
public class Solution {
    public int minimumEffortPath(int[][] heights) {
        int ROWS = heights.length, COLS = heights[0].length;
        int[] dist = new int[ROWS * COLS];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[0] = 0;

        boolean[] inQueue = new boolean[ROWS * COLS];
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(0);
        inQueue[0] = true;

        int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

        while (!queue.isEmpty()) {
            int u = queue.poll();
            inQueue[u] = false;

            int r = u / COLS, c = u % COLS;

            for (int[] dir : directions) {
                int newR = r + dir[0], newC = c + dir[1];
                if (newR >= 0 && newC >= 0 && newR < ROWS && newC < COLS) {
                    int v = newR * COLS + newC;
                    int weight = Math.abs(heights[r][c] - heights[newR][newC]);
                    int newDist = Math.max(dist[u], weight);
                    if (newDist < dist[v]) {
                        dist[v] = newDist;
                        if (!inQueue[v]) {
                            queue.offer(v);
                            inQueue[v] = true;
                        }
                    }
                }
            }
        }

        return dist[ROWS * COLS - 1];
    }
}
```

```cpp
class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int ROWS = heights.size(), COLS = heights[0].size();
        vector<int> dist(ROWS * COLS, INT_MAX);
        dist[0] = 0;

        vector<bool> inQueue(ROWS * COLS, false);
        queue<int> q;
        q.push(0);
        inQueue[0] = true;

        vector<vector<int>> directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

        while (!q.empty()) {
            int u = q.front();
            q.pop();
            inQueue[u] = false;

            int r = u / COLS, c = u % COLS;

            for (const auto& dir : directions) {
                int newR = r + dir[0], newC = c + dir[1];
                if (newR >= 0 && newC >= 0 && newR < ROWS && newC < COLS) {
                    int v = newR * COLS + newC;
                    int weight = abs(heights[r][c] - heights[newR][newC]);
                    int newDist = max(dist[u], weight);
                    if (newDist < dist[v]) {
                        dist[v] = newDist;
                        if (!inQueue[v]) {
                            q.push(v);
                            inQueue[v] = true;
                        }
                    }
                }
            }
        }

        return dist[ROWS * COLS - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number}
     */
    minimumEffortPath(heights) {
        const ROWS = heights.length,
            COLS = heights[0].length;
        const dist = Array(ROWS * COLS).fill(Infinity);
        dist[0] = 0;

        const inQueue = Array(ROWS * COLS).fill(false);
        const queue = new Queue();
        queue.push(0);
        inQueue[0] = true;

        const directions = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];

        while (!queue.isEmpty()) {
            const u = queue.pop();
            inQueue[u] = false;

            const r = Math.floor(u / COLS),
                c = u % COLS;
            for (const [dr, dc] of directions) {
                const newR = r + dr,
                    newC = c + dc;
                if (newR >= 0 && newC >= 0 && newR < ROWS && newC < COLS) {
                    const v = newR * COLS + newC;
                    const weight = Math.abs(
                        heights[r][c] - heights[newR][newC],
                    );
                    const newDist = Math.max(dist[u], weight);
                    if (newDist < dist[v]) {
                        dist[v] = newDist;
                        if (!inQueue[v]) {
                            queue.push(v);
                            inQueue[v] = true;
                        }
                    }
                }
            }
        }

        return dist[ROWS * COLS - 1];
    }
}
```

```csharp
public class Solution {
    public int MinimumEffortPath(int[][] heights) {
        int rows = heights.Length;
        int cols = heights[0].Length;
        int[] dist = Enumerable.Repeat(int.MaxValue, rows * cols).ToArray();
        bool[] inQueue = new bool[rows * cols];
        dist[0] = 0;

        int Index(int r, int c) => r * cols + c;

        Queue<int> queue = new Queue<int>();
        queue.Enqueue(0);
        inQueue[0] = true;

        int[][] directions = new int[][] {
            new int[] {0, 1}, new int[] {0, -1},
            new int[] {1, 0}, new int[] {-1, 0}
        };

        while (queue.Count > 0) {
            int u = queue.Dequeue();
            inQueue[u] = false;
            int r = u / cols, c = u % cols;

            foreach (var dir in directions) {
                int newR = r + dir[0], newC = c + dir[1];
                if (newR >= 0 && newR < rows && newC >= 0 && newC < cols) {
                    int v = Index(newR, newC);
                    int weight = Math.Abs(heights[r][c] - heights[newR][newC]);
                    int newDist = Math.Max(dist[u], weight);
                    if (newDist < dist[v]) {
                        dist[v] = newDist;
                        if (!inQueue[v]) {
                            queue.Enqueue(v);
                            inQueue[v] = true;
                        }
                    }
                }
            }
        }

        return dist[rows * cols - 1];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(m * n)$ time in average case.
    - $O(m ^ 2 * n ^ 2)$ time in worst case.
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given matrix.
