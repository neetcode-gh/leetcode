## 1. Depth First Search + Breadth First Search - I

::tabs-start

```python
class Solution:
    def shortestBridge(self, grid: List[List[int]]) -> int:
        N = len(grid)
        direct = [[0, 1], [0, -1], [1, 0], [-1, 0]]

        def invalid(r, c):
            return r < 0 or c < 0 or r == N or c == N

        visit = set()

        def dfs(r, c):
            if invalid(r, c) or not grid[r][c] or (r, c) in visit:
                return
            visit.add((r, c))
            for dr, dc in direct:
                dfs(r + dr, c + dc)

        def bfs():
            res, q = 0, deque(visit)
            while q:
                for _ in range(len(q)):
                    r, c = q.popleft()
                    for dr, dc in direct:
                        curR, curC = r + dr, c + dc
                        if invalid(curR, curC) or (curR, curC) in visit:
                            continue
                        if grid[curR][curC]:
                            return res
                        q.append((curR, curC))
                        visit.add((curR, curC))
                res += 1

        for r in range(N):
            for c in range(N):
                if grid[r][c]:
                    dfs(r, c)
                    return bfs()
```

```java
public class Solution {
    private int N;
    private boolean[][] visited;
    private final int[][] direct = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    public int shortestBridge(int[][] grid) {
        N = grid.length;
        visited = new boolean[N][N];

        boolean found = false;
        for (int r = 0; r < N; r++) {
            if (found) break;
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    dfs(grid, r, c);
                    found = true;
                    break;
                }
            }
        }

        return bfs(grid);
    }

    private void dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= N || c >= N || grid[r][c] == 0 || visited[r][c])
            return;

        visited[r][c] = true;

        for (int[] d : direct) {
            dfs(grid, r + d[0], c + d[1]);
        }
    }

    private int bfs(int[][] grid) {
        Queue<int[]> q = new LinkedList<>();
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (visited[r][c]) {
                    q.offer(new int[]{r, c});
                }
            }
        }

        int res = 0;
        while (!q.isEmpty()) {
            for (int i = q.size(); i > 0; i--) {
                int[] cell = q.poll();
                int r = cell[0], c = cell[1];

                for (int[] d : direct) {
                    int curR = r + d[0], curC = c + d[1];

                    if (curR < 0 || curC < 0 || curR >= N || curC >= N || visited[curR][curC])
                        continue;

                    if (grid[curR][curC] == 1) return res;

                    q.offer(new int[]{curR, curC});
                    visited[curR][curC] = true;
                }
            }
            res++;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int N;
    vector<vector<bool>> visited;
    vector<vector<int>> direct = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    int shortestBridge(vector<vector<int>>& grid) {
        N = grid.size();
        visited = vector<vector<bool>>(N, vector<bool>(N, false));

        bool found = false;
        for (int r = 0; r < N; r++) {
            if (found) break;
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    dfs(grid, r, c);
                    found = true;
                    break;
                }
            }
        }

        return bfs(grid);
    }

private:
    void dfs(vector<vector<int>>& grid, int r, int c) {
        if (r < 0 || c < 0 || r >= N || c >= N || grid[r][c] == 0 || visited[r][c])
            return;

        visited[r][c] = true;
        for (auto& d : direct) {
            dfs(grid, r + d[0], c + d[1]);
        }
    }

    int bfs(vector<vector<int>>& grid) {
        queue<pair<int, int>> q;
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (visited[r][c]) {
                    q.push({r, c});
                }
            }
        }

        int res = 0;
        while (!q.empty()) {
            for (int i = q.size(); i > 0; i--) {
                auto [r, c] = q.front(); q.pop();

                for (auto& d : direct) {
                    int curR = r + d[0], curC = c + d[1];

                    if (curR < 0 || curC < 0 || curR >= N || curC >= N || visited[curR][curC])
                        continue;

                    if (grid[curR][curC] == 1) return res;
                    q.push({curR, curC});
                    visited[curR][curC] = true;
                }
            }
            res++;
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
    shortestBridge(grid) {
        const N = grid.length;
        const direct = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
        const visited = Array.from({ length: N }, () => Array(N).fill(false));
        const q = new Queue();

        const dfs = (r, c) => {
            if (
                r < 0 ||
                c < 0 ||
                r >= N ||
                c >= N ||
                grid[r][c] === 0 ||
                visited[r][c]
            )
                return;
            visited[r][c] = true;
            q.push([r, c]);

            for (const [dr, dc] of direct) {
                dfs(r + dr, c + dc);
            }
        };

        const bfs = () => {
            let res = 0;
            while (!q.isEmpty()) {
                for (let i = q.size(); i > 0; i--) {
                    const [r, c] = q.pop();
                    for (const [dr, dc] of direct) {
                        const curR = r + dr,
                            curC = c + dc;

                        if (
                            curR < 0 ||
                            curC < 0 ||
                            curR >= N ||
                            curC >= N ||
                            visited[curR][curC]
                        )
                            continue;
                        if (grid[curR][curC] === 1) return res;

                        q.push([curR, curC]);
                        visited[curR][curC] = true;
                    }
                }
                res++;
            }
        };

        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 1) {
                    dfs(r, c);
                    return bfs();
                }
            }
        }
    }
}
```

```csharp
public class Solution {
    public int ShortestBridge(int[][] grid) {
        int N = grid.Length;
        int[][] directions = new int[][] {
            new int[] {0, 1}, new int[] {0, -1},
            new int[] {1, 0}, new int[] {-1, 0}
        };

        bool Invalid(int r, int c) {
            return r < 0 || c < 0 || r == N || c == N;
        }

        HashSet<(int, int)> visit = new HashSet<(int, int)>();

        void Dfs(int r, int c) {
            if (Invalid(r, c) || grid[r][c] == 0 || visit.Contains((r, c)))
                return;
            visit.Add((r, c));
            foreach (var d in directions) {
                Dfs(r + d[0], c + d[1]);
            }
        }

        int Bfs() {
            int res = 0;
            Queue<(int, int)> q = new Queue<(int, int)>(visit);

            while (q.Count > 0) {
                int size = q.Count;
                for (int i = 0; i < size; i++) {
                    var (r, c) = q.Dequeue();
                    foreach (var d in directions) {
                        int curR = r + d[0], curC = c + d[1];
                        if (Invalid(curR, curC) || visit.Contains((curR, curC)))
                            continue;
                        if (grid[curR][curC] == 1)
                            return res;
                        q.Enqueue((curR, curC));
                        visit.Add((curR, curC));
                    }
                }
                res++;
            }
            return -1;
        }

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    Dfs(r, c);
                    return Bfs();
                }
            }
        }

        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 2. Depth First Search + Breadth First Search - II

::tabs-start

```python
class Solution:
    def shortestBridge(self, grid: list[list[int]]) -> int:
        N, direct = len(grid), [(0, 1), (0, -1), (1, 0), (-1, 0)]

        def dfs(r, c):
            if 0 <= r < N and 0 <= c < N and grid[r][c] == 1:
                grid[r][c] = 2
                q.append((r, c))
                for dr, dc in direct:
                    dfs(r + dr, c + dc)

        q = deque()
        for r in range(N):
            for c in range(N):
                if grid[r][c]:
                    dfs(r, c)
                    break
            if q: break

        res = 0
        while q:
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in direct:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < N and 0 <= nc < N:
                        if grid[nr][nc] == 1:
                            return res
                        if grid[nr][nc] == 0:
                            grid[nr][nc] = 2
                            q.append((nr, nc))
            res += 1
```

```java
public class Solution {
    private int[][] direct = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    public int shortestBridge(int[][] grid) {
        int N = grid.length;
        Queue<int[]> q = new LinkedList<>();

        boolean found = false;
        for (int r = 0; r < N; r++) {
            if (found) break;
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    dfs(grid, r, c, q);
                    found = true;
                    break;
                }
            }
        }

        int res = 0;
        while (!q.isEmpty()) {
            for (int i = q.size(); i > 0; i--) {
                int[] cell = q.poll();
                int r = cell[0], c = cell[1];

                for (int[] d : direct) {
                    int nr = r + d[0], nc = c + d[1];

                    if (nr < 0 || nc < 0 || nr >= N || nc >= N) continue;
                    if (grid[nr][nc] == 1) return res;

                    if (grid[nr][nc] == 0) {
                        grid[nr][nc] = 2;
                        q.offer(new int[]{nr, nc});
                    }
                }
            }
            res++;
        }
        return res;
    }

    private void dfs(int[][] grid, int r, int c, Queue<int[]> q) {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid.length || grid[r][c] != 1)
            return;

        grid[r][c] = 2;
        q.offer(new int[]{r, c});
        for (int[] d : direct) {
            dfs(grid, r + d[0], c + d[1], q);
        }
    }
}
```

```cpp
class Solution {
    vector<vector<int>> direct;

public:
    int shortestBridge(vector<vector<int>>& grid) {
        int N = grid.size();
        direct = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        queue<pair<int, int>> q;

        bool found = false;
        for (int r = 0; r < N; r++) {
            if (found) break;
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    dfs(grid, r, c, q);
                    found = true;
                    break;
                }
            }
        }

        int res = 0;
        while (!q.empty()) {
            for (int i = q.size(); i > 0; i--) {
                auto [r, c] = q.front(); q.pop();

                for (auto& d : direct) {
                    int nr = r + d[0], nc = c + d[1];

                    if (nr < 0 || nc < 0 || nr >= N || nc >= N) continue;
                    if (grid[nr][nc] == 1) return res;

                    if (grid[nr][nc] == 0) {
                        grid[nr][nc] = 2;
                        q.push({nr, nc});
                    }
                }
            }
            res++;
        }
        return res;
    }

private:
    void dfs(vector<vector<int>>& grid, int r, int c, queue<pair<int, int>>& q) {
        if (r < 0 || c < 0 || r >= grid.size() || c >= grid.size() || grid[r][c] != 1)
            return;

        grid[r][c] = 2;
        q.push({r, c});
        for (auto& d : direct) {
            dfs(grid, r + d[0], c + d[1], q);
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
    shortestBridge(grid) {
        const N = grid.length;
        const direct = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
        const q = new Queue();

        const dfs = (r, c) => {
            if (r < 0 || c < 0 || r >= N || c >= N || grid[r][c] !== 1) return;
            grid[r][c] = 2;
            q.push([r, c]);
            for (const [dr, dc] of direct) {
                dfs(r + dr, c + dc);
            }
        };

        let found = false;
        for (let r = 0; r < N; r++) {
            if (found) break;
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 1) {
                    dfs(r, c);
                    found = true;
                    break;
                }
            }
        }

        let res = 0;
        while (!q.isEmpty()) {
            for (let i = q.size(); i > 0; i--) {
                const [r, c] = q.pop();
                for (const [dr, dc] of direct) {
                    let nr = r + dr,
                        nc = c + dc;
                    if (nr < 0 || nc < 0 || nr >= N || nc >= N) continue;
                    if (grid[nr][nc] === 1) return res;
                    if (grid[nr][nc] === 0) {
                        grid[nr][nc] = 2;
                        q.push([nr, nc]);
                    }
                }
            }
            res++;
        }
    }
}
```

```csharp
public class Solution {
    public int ShortestBridge(int[][] grid) {
        int N = grid.Length;
        int[][] direct = new int[][] {
            new int[] {0, 1}, new int[] {0, -1}, new int[] {1, 0}, new int[] {-1, 0}
        };

        Queue<(int, int)> q = new Queue<(int, int)>();

        void Dfs(int r, int c) {
            if (r >= 0 && r < N && c >= 0 && c < N && grid[r][c] == 1) {
                grid[r][c] = 2;
                q.Enqueue((r, c));
                foreach (var d in direct) {
                    Dfs(r + d[0], c + d[1]);
                }
            }
        }

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    Dfs(r, c);
                    break;
                }
            }
            if (q.Count > 0) break;
        }

        int res = 0;
        while (q.Count > 0) {
            int size = q.Count;
            for (int i = 0; i < size; i++) {
                var (r, c) = q.Dequeue();
                foreach (var d in direct) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
                        if (grid[nr][nc] == 1) {
                            return res;
                        }
                        if (grid[nr][nc] == 0) {
                            grid[nr][nc] = 2;
                            q.Enqueue((nr, nc));
                        }
                    }
                }
            }
            res++;
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Breadth First Search

::tabs-start

```python
class Solution:
    def shortestBridge(self, grid: list[list[int]]) -> int:
        N, direct = len(grid), [(0, 1), (0, -1), (1, 0), (-1, 0)]
        q2 = deque()

        found = False
        for r in range(N):
            if found: break
            for c in range(N):
                if grid[r][c] == 1:
                    q1 = deque([(r, c)])
                    grid[r][c] = 2
                    while q1:
                        x, y = q1.popleft()
                        q2.append((x, y))
                        for dx, dy in direct:
                            nx, ny = x + dx, y + dy
                            if 0 <= nx < N and 0 <= ny < N and grid[nx][ny] == 1:
                                grid[nx][ny] = 2
                                q1.append((nx, ny))
                    found = True
                    break

        res = 0
        while q2:
            for _ in range(len(q2)):
                x, y = q2.popleft()
                for dx, dy in direct:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < N and 0 <= ny < N:
                        if grid[nx][ny] == 1:
                            return res
                        if grid[nx][ny] == 0:
                            grid[nx][ny] = 2
                            q2.append((nx, ny))
            res += 1

        return res
```

```java
public class Solution {
    public int shortestBridge(int[][] grid) {
        int N = grid.length;
        int[][] direct = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        Queue<int[]> q2 = new LinkedList<>();

        boolean found = false;
        for (int r = 0; r < N; r++) {
            if (found) break;
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    Queue<int[]> q1 = new LinkedList<>();
                    q1.offer(new int[]{r, c});
                    grid[r][c] = 2;

                    while (!q1.isEmpty()) {
                        int[] cell = q1.poll();
                        int x = cell[0], y = cell[1];
                        q2.offer(new int[]{x, y});

                        for (int[] d : direct) {
                            int nx = x + d[0], ny = y + d[1];
                            if (nx >= 0 && ny >= 0 && nx < N && ny < N && grid[nx][ny] == 1) {
                                grid[nx][ny] = 2;
                                q1.offer(new int[]{nx, ny});
                            }
                        }
                    }
                    found = true;
                    break;
                }
            }
        }

        int res = 0;
        while (!q2.isEmpty()) {
            for (int i = q2.size(); i > 0; i--) {
                int[] cell = q2.poll();
                int x = cell[0], y = cell[1];

                for (int[] d : direct) {
                    int nx = x + d[0], ny = y + d[1];

                    if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
                        if (grid[nx][ny] == 1) return res;
                        if (grid[nx][ny] == 0) {
                            grid[nx][ny] = 2;
                            q2.offer(new int[]{nx, ny});
                        }
                    }
                }
            }
            res++;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int shortestBridge(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<vector<int>> direct = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        queue<pair<int, int>> q2;

        bool found = false;
        for (int r = 0; r < N; r++) {
            if (found) break;
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    queue<pair<int, int>> q1;
                    q1.push({r, c});
                    grid[r][c] = 2;

                    while (!q1.empty()) {
                        auto [x, y] = q1.front(); q1.pop();
                        q2.push({x, y});

                        for (auto& d : direct) {
                            int nx = x + d[0], ny = y + d[1];
                            if (nx >= 0 && ny >= 0 && nx < N && ny < N && grid[nx][ny] == 1) {
                                grid[nx][ny] = 2;
                                q1.push({nx, ny});
                            }
                        }
                    }
                    found = true;
                    break;
                }
            }
        }

        int res = 0;
        while (!q2.empty()) {
            for (int i = q2.size(); i > 0; i--) {
                auto [x, y] = q2.front(); q2.pop();

                for (auto& d : direct) {
                    int nx = x + d[0], ny = y + d[1];

                    if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
                        if (grid[nx][ny] == 1) return res;
                        if (grid[nx][ny] == 0) {
                            grid[nx][ny] = 2;
                            q2.push({nx, ny});
                        }
                    }
                }
            }
            res++;
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
    shortestBridge(grid) {
        const N = grid.length;
        const direct = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
        const q2 = new Queue();

        let found = false;
        for (let r = 0; r < N; r++) {
            if (found) break;
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 1) {
                    const q1 = new Queue([[r, c]]);
                    grid[r][c] = 2;

                    while (!q1.isEmpty()) {
                        let [x, y] = q1.pop();
                        q2.push([x, y]);

                        for (let [dx, dy] of direct) {
                            let nx = x + dx,
                                ny = y + dy;
                            if (
                                nx >= 0 &&
                                ny >= 0 &&
                                nx < N &&
                                ny < N &&
                                grid[nx][ny] === 1
                            ) {
                                grid[nx][ny] = 2;
                                q1.push([nx, ny]);
                            }
                        }
                    }
                    found = true;
                    break;
                }
            }
        }

        let res = 0;
        while (!q2.isEmpty()) {
            for (let i = q2.size(); i > 0; i--) {
                const [x, y] = q2.pop();

                for (let [dx, dy] of direct) {
                    let nx = x + dx,
                        ny = y + dy;
                    if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
                        if (grid[nx][ny] === 1) return res;
                        if (grid[nx][ny] === 0) {
                            grid[nx][ny] = 2;
                            q2.push([nx, ny]);
                        }
                    }
                }
            }
            res++;
        }
    }
}
```

```csharp
public class Solution {
    public int ShortestBridge(int[][] grid) {
        int N = grid.Length;
        int[][] directions = new int[][] {
            new int[] {0, 1}, new int[] {0, -1}, new int[] {1, 0}, new int[] {-1, 0}
        };

        Queue<(int, int)> q2 = new Queue<(int, int)>();
        bool found = false;

        for (int r = 0; r < N; r++) {
            if (found) break;
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    Queue<(int, int)> q1 = new Queue<(int, int)>();
                    q1.Enqueue((r, c));
                    grid[r][c] = 2;

                    while (q1.Count > 0) {
                        var (x, y) = q1.Dequeue();
                        q2.Enqueue((x, y));

                        foreach (var d in directions) {
                            int nx = x + d[0], ny = y + d[1];
                            if (nx >= 0 && nx < N && ny >= 0 && ny < N && grid[nx][ny] == 1) {
                                grid[nx][ny] = 2;
                                q1.Enqueue((nx, ny));
                            }
                        }
                    }

                    found = true;
                    break;
                }
            }
        }

        int res = 0;
        while (q2.Count > 0) {
            int size = q2.Count;
            for (int i = 0; i < size; i++) {
                var (x, y) = q2.Dequeue();
                foreach (var d in directions) {
                    int nx = x + d[0], ny = y + d[1];
                    if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
                        if (grid[nx][ny] == 1) {
                            return res;
                        }
                        if (grid[nx][ny] == 0) {
                            grid[nx][ny] = 2;
                            q2.Enqueue((nx, ny));
                        }
                    }
                }
            }
            res++;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Disjoint Set Union + Breadth First Search

::tabs-start

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n

    def find(self, node):
        cur = node
        while cur != self.parent[cur]:
            self.parent[cur] = self.parent[self.parent[cur]]
            cur = self.parent[cur]
        return cur

    def union(self, u, v):
        pu, pv = self.find(u), self.find(v)
        if pu == pv:
            return False
        if self.rank[pv] > self.rank[pu]:
            pu, pv = pv, pu
        self.parent[pv] = pu
        self.rank[pu] += self.rank[pv]
        return True

class Solution:
    def shortestBridge(self, grid: list[list[int]]) -> int:
        n, direct = len(grid), [(0, 1), (0, -1), (1, 0), (-1, 0)]
        dsu = DSU(n * n + 1)

        def idx(r, c):
            return r * n + c + 1

        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:
                    first_island = dsu.find(idx(r, c))
                    if c + 1 < n and grid[r][c + 1] == 1:
                        dsu.union(idx(r, c), idx(r, c + 1))
                    if r + 1 < n and grid[r + 1][c] == 1:
                        dsu.union(idx(r, c), idx(r + 1, c))

        q = deque()
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:
                    if dsu.find(idx(r, c)) != first_island:
                        continue
                    for dx, dy in direct:
                        nr, nc = r + dx, c + dy
                        if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                            q.append((r,c))
                            break

        res = 0
        while q:
            for _ in range(len(q)):
                r, c = q.popleft()
                for dx, dy in direct:
                    nr, nc = r + dx, c + dy
                    if 0 <= nr < n and 0 <= nc < n:
                        if grid[nr][nc] == 1 and dsu.union(idx(r, c), idx(nr, nc)):
                            return res
                        if grid[nr][nc] == 0:
                            grid[nr][nc] = 1
                            dsu.union(idx(r, c), idx(nr, nc))
                            q.append((nr, nc))
            res += 1
```

```java
class DSU {
    private int[] parent, rank;

    public DSU(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        Arrays.fill(rank, 1);
    }

    public int find(int node) {
        if (parent[node] != node) {
            parent[node] = find(parent[node]);
        }
        return parent[node];
    }

    public boolean union(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;

        if (rank[pv] > rank[pu]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        parent[pv] = pu;
        rank[pu] += rank[pv];
        return true;
    }
}

public class Solution {
    private int n;
    private int idx(int r, int c) {
        return r * n + c + 1;
    }

    public int shortestBridge(int[][] grid) {
        n = grid.length;
        int[][] direct = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        DSU dsu = new DSU(n * n + 1);
        Queue<int[]> q = new LinkedList<>();


        int firstIsland = -1;
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    firstIsland = dsu.find(idx(r, c));
                    if (c + 1 < n && grid[r][c + 1] == 1)
                        dsu.union(idx(r, c), idx(r, c + 1));
                    if (r + 1 < n && grid[r + 1][c] == 1)
                        dsu.union(idx(r, c), idx(r + 1, c));
                }
            }
        }

        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1 && dsu.find(idx(r, c)) == firstIsland) {
                    for (int[] d : direct) {
                        int nr = r + d[0], nc = c + d[1];
                        if (nr >= 0 && nc >= 0 && nr < n && nc < n && grid[nr][nc] == 0) {
                            q.offer(new int[]{r, c});
                            break;
                        }
                    }
                }
            }
        }

        int res = 0;
        while (!q.isEmpty()) {
            for (int i = q.size(); i > 0; i--) {
                int[] cell = q.poll();
                int r = cell[0], c = cell[1];

                for (int[] d : direct) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nc >= 0 && nr < n && nc < n) {
                        if (grid[nr][nc] == 1 && dsu.union(idx(r, c), idx(nr, nc))) {
                            return res;
                        }
                        if (grid[nr][nc] == 0) {
                            grid[nr][nc] = 1;
                            dsu.union(idx(r, c), idx(nr, nc));
                            q.offer(new int[]{nr, nc});
                        }
                    }
                }
            }
            res++;
        }
        return res;
    }
}
```

```cpp
class DSU {
public:
    vector<int> parent, rank;

    DSU(int n) : parent(n), rank(n, 1) {
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int node) {
        if (parent[node] != node)
            parent[node] = find(parent[node]);
        return parent[node];
    }

    bool unionSet(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (rank[pv] > rank[pu]) swap(pu, pv);
        parent[pv] = pu;
        rank[pu] += rank[pv];
        return true;
    }
};

class Solution {
public:
    int shortestBridge(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<vector<int>> direct = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        DSU dsu(N * N + 1);
        queue<pair<int, int>> q;

        auto idx = [&](int r, int c) {
            return r * N + c + 1;
        };

        int firstIsland = -1;
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    firstIsland = dsu.find(idx(r, c));
                    if (c + 1 < N && grid[r][c + 1] == 1)
                        dsu.unionSet(idx(r, c), idx(r, c + 1));
                    if (r + 1 < N && grid[r + 1][c] == 1)
                        dsu.unionSet(idx(r, c), idx(r + 1, c));
                }
            }
        }

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1 && dsu.find(idx(r, c)) == firstIsland) {
                    for (auto& d : direct) {
                        int nr = r + d[0], nc = c + d[1];
                        if (nr >= 0 && nc >= 0 && nr < N && nc < N && grid[nr][nc] == 0) {
                            q.push({r, c});
                            break;
                        }
                    }
                }
            }
        }

        int res = 0;
        while (!q.empty()) {
            for (int i = q.size(); i > 0; i--) {
                auto [r, c] = q.front();q.pop();
                for (auto& d : direct) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nc >= 0 && nr < N && nc < N) {
                        if (grid[nr][nc] == 1 && dsu.unionSet(idx(r, c), idx(nr, nc)))
                            return res;
                        if (grid[nr][nc] == 0) {
                            grid[nr][nc] = 1;
                            dsu.unionSet(idx(r, c), idx(nr, nc));
                            q.push({nr, nc});
                        }
                    }
                }
            }
            res++;
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
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(1);
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
     * @param {number} v
     * @return {boolean}
     */
    union(u, v) {
        let pu = this.find(u),
            pv = this.find(v);
        if (pu === pv) return false;

        if (this.rank[pv] > this.rank[pu]) [pu, pv] = [pv, pu];
        this.parent[pv] = pu;
        this.rank[pu] += this.rank[pv];
        return true;
    }
}

class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    shortestBridge(grid) {
        const N = grid.length;
        const direct = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
        const dsu = new DSU(N * N + 1);
        const q = new Queue();

        const idx = (r, c) => r * N + c + 1;

        let firstIsland = -1;
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 1) {
                    firstIsland = dsu.find(idx(r, c));
                    if (c + 1 < N && grid[r][c + 1] === 1)
                        dsu.union(idx(r, c), idx(r, c + 1));
                    if (r + 1 < N && grid[r + 1][c] === 1)
                        dsu.union(idx(r, c), idx(r + 1, c));
                }
            }
        }

        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 1 && dsu.find(idx(r, c)) === firstIsland) {
                    for (const [dx, dy] of direct) {
                        let nr = r + dx,
                            nc = c + dy;
                        if (
                            nr >= 0 &&
                            nc >= 0 &&
                            nr < N &&
                            nc < N &&
                            grid[nr][nc] === 0
                        ) {
                            q.push([r, c]);
                            break;
                        }
                    }
                }
            }
        }

        let res = 0;
        while (!q.isEmpty()) {
            for (let i = q.size(); i > 0; i--) {
                const [r, c] = q.pop();
                for (let [dx, dy] of direct) {
                    let nr = r + dx,
                        nc = c + dy;
                    if (nr >= 0 && nc >= 0 && nr < N && nc < N) {
                        if (
                            grid[nr][nc] === 1 &&
                            dsu.union(idx(r, c), idx(nr, nc))
                        ) {
                            return res;
                        }
                        if (grid[nr][nc] === 0) {
                            grid[nr][nc] = 1;
                            dsu.union(idx(r, c), idx(nr, nc));
                            q.push([nr, nc]);
                        }
                    }
                }
            }
            res++;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int ShortestBridge(int[][] grid) {
        int N = grid.Length;
        int[][] direct = new int[][] {
            new int[] {0, 1}, new int[] {0, -1}, new int[] {1, 0}, new int[] {-1, 0}
        };
        Queue<int[]> q2 = new Queue<int[]>();

        bool found = false;
        for (int r = 0; r < N; r++) {
            if (found) break;
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    Queue<int[]> q1 = new Queue<int[]>();
                    q1.Enqueue(new int[] { r, c });
                    grid[r][c] = 2;

                    while (q1.Count > 0) {
                        int[] cell = q1.Dequeue();
                        int x = cell[0], y = cell[1];
                        q2.Enqueue(new int[] { x, y });

                        foreach (var d in direct) {
                            int nx = x + d[0], ny = y + d[1];
                            if (nx >= 0 && ny >= 0 && nx < N && ny < N && grid[nx][ny] == 1) {
                                grid[nx][ny] = 2;
                                q1.Enqueue(new int[] { nx, ny });
                            }
                        }
                    }
                    found = true;
                    break;
                }
            }
        }

        int res = 0;
        while (q2.Count > 0) {
            int size = q2.Count;
            for (int i = 0; i < size; i++) {
                int[] cell = q2.Dequeue();
                int x = cell[0], y = cell[1];

                foreach (var d in direct) {
                    int nx = x + d[0], ny = y + d[1];
                    if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
                        if (grid[nx][ny] == 1) return res;
                        if (grid[nx][ny] == 0) {
                            grid[nx][ny] = 2;
                            q2.Enqueue(new int[] { nx, ny });
                        }
                    }
                }
            }
            res++;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$
