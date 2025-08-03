## 1. Breadth First Search

::tabs-start

```python
class Solution:
    def shortestPathBinaryMatrix(self, grid: list[list[int]]) -> int:
        N = len(grid)
        if grid[0][0] or grid[N - 1][N - 1]:
            return -1

        q = deque([(0, 0, 1)])
        visit = set((0, 0))
        direct = [(0, 1), (1, 0), (0, -1), (-1, 0),
                  (1, 1), (-1, -1), (1, -1), (-1, 1)]

        while q:
            r, c, length = q.popleft()
            if r == N - 1 and c == N - 1:
                return length

            for dr, dc in direct:
                nr, nc = r + dr, c + dc
                if (0 <= nr < N and 0 <= nc < N and grid[nr][nc] == 0 and
                    (nr, nc) not in visit):
                    q.append((nr, nc, length + 1))
                    visit.add((nr, nc))

        return -1
```

```java
public class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        int N = grid.length;
        if (grid[0][0] == 1 || grid[N - 1][N - 1] == 1) return -1;

        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0},
                              {1, 1}, {-1, -1}, {1, -1}, {-1, 1}};
        boolean[][] visit = new boolean[N][N];

        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{0, 0, 1});
        visit[0][0] = true;

        while (!q.isEmpty()) {
            int[] cell = q.poll();
            int r = cell[0], c = cell[1], length = cell[2];

            if (r == N - 1 && c == N - 1) return length;

            for (int[] d : directions) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < N && nc < N &&
                    grid[nr][nc] == 0 && !visit[nr][nc]) {
                    q.offer(new int[]{nr, nc, length + 1});
                    visit[nr][nc] = true;
                }
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int N = grid.size();
        if (grid[0][0] == 1 || grid[N - 1][N - 1] == 1) return -1;

        vector<pair<int, int>> directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0},
                                             {1, 1}, {-1, -1}, {1, -1}, {-1, 1}};
        vector<vector<bool>> visit(N, vector<bool>(N, false));

        queue<tuple<int, int, int>> q;
        q.push({0, 0, 1});
        visit[0][0] = true;

        while (!q.empty()) {
            auto [r, c, length] = q.front();
            q.pop();

            if (r == N - 1 && c == N - 1) return length;

            for (auto [dr, dc] : directions) {
                int nr = r + dr, nc = c + dc;
                if (nr >= 0 && nc >= 0 && nr < N && nc < N &&
                    grid[nr][nc] == 0 && !visit[nr][nc]) {
                    q.push({nr, nc, length + 1});
                    visit[nr][nc] = true;
                }
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    shortestPathBinaryMatrix(grid) {
        const N = grid.length;
        if (grid[0][0] === 1 || grid[N - 1][N - 1] === 1) return -1;

        const directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
            [1, 1],
            [-1, -1],
            [1, -1],
            [-1, 1],
        ];
        const visit = Array.from({ length: N }, () => Array(N).fill(false));

        const q = new Queue([[0, 0, 1]]);
        visit[0][0] = true;

        while (!q.isEmpty()) {
            const [r, c, length] = q.pop();
            if (r === N - 1 && c === N - 1) return length;

            for (const [dr, dc] of directions) {
                const nr = r + dr,
                    nc = c + dc;
                if (
                    nr >= 0 &&
                    nc >= 0 &&
                    nr < N &&
                    nc < N &&
                    grid[nr][nc] === 0 &&
                    !visit[nr][nc]
                ) {
                    q.push([nr, nc, length + 1]);
                    visit[nr][nc] = true;
                }
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int ShortestPathBinaryMatrix(int[][] grid) {
        int n = grid.Length;
        if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) {
            return -1;
        }

        var q = new Queue<(int r, int c, int length)>();
        q.Enqueue((0, 0, 1));
        var visit = new HashSet<(int, int)> { (0, 0) };
        (int dr, int dc)[] directions = new (int, int)[] {
            (0, 1), (1, 0), (0, -1), (-1, 0),
            (1, 1), (-1, -1), (1, -1), (-1, 1)
        };

        while (q.Count > 0) {
            var (r, c, length) = q.Dequeue();
            if (r == n - 1 && c == n - 1) {
                return length;
            }

            foreach (var (dr, dc) in directions) {
                int nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < n && nc >= 0 && nc < n
                    && grid[nr][nc] == 0
                    && !visit.Contains((nr, nc))) {
                    q.Enqueue((nr, nc, length + 1));
                    visit.Add((nr, nc));
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

## 2. Breadth First Search (Overwriting the Input)

::tabs-start

```python
class Solution:
    def shortestPathBinaryMatrix(self, grid: list[list[int]]) -> int:
        N = len(grid)
        direct = [0, 1, 0, -1, 0, 1, 1, -1, -1, 1]

        if grid[0][0] or grid[N - 1][N - 1]:
            return -1

        q = deque([(0, 0)])
        grid[0][0] = 1

        while q:
            r, c = q.popleft()
            dist = grid[r][c]

            if r == N - 1 and c == N - 1:
                return dist

            for d in range(9):
                nr, nc = r + direct[d], c + direct[d + 1]
                if 0 <= nr < N and 0 <= nc < N and grid[nr][nc] == 0:
                    grid[nr][nc] = dist + 1
                    q.append((nr, nc))

        return -1
```

```java
public class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        int N = grid.length;
        int[] direct = {0, 1, 0, -1, 0, 1, 1, -1, -1, 1};

        if (grid[0][0] == 1 || grid[N - 1][N - 1] == 1)
            return -1;

        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{0, 0});
        grid[0][0] = 1;

        while (!q.isEmpty()) {
            int[] cell = q.poll();
            int r = cell[0], c = cell[1];
            int dist = grid[r][c];

            if (r == N - 1 && c == N - 1)
                return dist;

            for (int d = 0; d < 9; d++) {
                int nr = r + direct[d], nc = c + direct[d + 1];

                if (nr >= 0 && nc >= 0 && nr < N && nc < N && grid[nr][nc] == 0) {
                    grid[nr][nc] = dist + 1;
                    q.offer(new int[]{nr, nc});
                }
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int N = grid.size();
        int direct[10] = {0, 1, 0, -1, 0, 1, 1, -1, -1, 1};

        if (grid[0][0] || grid[N - 1][N - 1])
            return -1;

        queue<pair<int, int>> q;
        q.push({0, 0});
        grid[0][0] = 1;

        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();
            int dist = grid[r][c];

            if (r == N - 1 && c == N - 1)
                return dist;

            for (int d = 0; d < 9; d++) {
                int nr = r + direct[d], nc = c + direct[d + 1];

                if (nr >= 0 && nc >= 0 && nr < N && nc < N && grid[nr][nc] == 0) {
                    grid[nr][nc] = dist + 1;
                    q.push({nr, nc});
                }
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    shortestPathBinaryMatrix(grid) {
        const N = grid.length;
        const direct = [0, 1, 0, -1, 0, 1, 1, -1, -1, 1];

        if (grid[0][0] || grid[N - 1][N - 1]) return -1;

        let q = [[0, 0]];
        grid[0][0] = 1;

        while (q.length) {
            let [r, c] = q.shift();
            let dist = grid[r][c];

            if (r === N - 1 && c === N - 1) return dist;

            for (let d = 0; d < 9; d++) {
                let nr = r + direct[d],
                    nc = c + direct[d + 1];

                if (
                    nr >= 0 &&
                    nc >= 0 &&
                    nr < N &&
                    nc < N &&
                    grid[nr][nc] === 0
                ) {
                    grid[nr][nc] = dist + 1;
                    q.push([nr, nc]);
                }
            }
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int ShortestPathBinaryMatrix(int[][] grid) {
        int N = grid.Length;
        int[] direct = new int[]{0, 1, 0, -1, 0, 1, 1, -1, -1, 1};

        if (grid[0][0] == 1 || grid[N - 1][N - 1] == 1) {
            return -1;
        }

        var q = new Queue<(int r, int c)>();
        q.Enqueue((0, 0));
        grid[0][0] = 1;

        while (q.Count > 0) {
            var (r, c) = q.Dequeue();
            int dist = grid[r][c];

            if (r == N - 1 && c == N - 1) {
                return dist;
            }

            for (int d = 0; d < 9; d++) {
                int nr = r + direct[d];
                int nc = c + direct[d + 1];
                if (nr >= 0 && nr < N && nc >= 0 && nc < N && grid[nr][nc] == 0) {
                    grid[nr][nc] = dist + 1;
                    q.Enqueue((nr, nc));
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

## 3. Bidirectional Breadth First Search

::tabs-start

```python
class Solution:
    def shortestPathBinaryMatrix(self, grid: list[list[int]]) -> int:
        N = len(grid)
        if grid[0][0] or grid[N - 1][N - 1]:
            return -1
        if N == 1:
            return 1

        direct = [0, 1, 0, -1, 0, 1, 1, -1, -1, 1]
        q1 = deque([(0, 0)])
        q2 = deque([(N - 1, N - 1)])
        grid[0][0] = -1
        grid[N - 1][N - 1] = -2

        res = 2
        start, end = -1, -2
        while q1 and q2:
            for _ in range(len(q1)):
                r, c = q1.popleft()
                for d in range(9):
                    nr, nc = r + direct[d], c + direct[d + 1]
                    if 0 <= nr < N and 0 <= nc < N:
                        if grid[nr][nc] == end:
                            return res
                        if grid[nr][nc] == 0:
                            grid[nr][nc] = start
                            q1.append((nr, nc))

            q1, q2 = q2, q1
            start, end = end, start
            res += 1

        return -1
```

```java
public class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        int N = grid.length;
        if (grid[0][0] == 1 || grid[N - 1][N - 1] == 1) return -1;
        if (N == 1) return 1;

        int[] direct = {0, 1, 0, -1, 0, 1, 1, -1, -1, 1};
        Queue<int[]> q1 = new LinkedList<>(), q2 = new LinkedList<>();
        q1.offer(new int[]{0, 0});
        q2.offer(new int[]{N - 1, N - 1});
        grid[0][0] = -1;
        grid[N - 1][N - 1] = -2;

        int res = 2, start = -1, end = -2;
        while (!q1.isEmpty() && !q2.isEmpty()) {
            for (int i = q1.size(); i > 0; i--) {
                int[] cell = q1.poll();
                int r = cell[0], c = cell[1];

                for (int d = 0; d < 9; d++) {
                    int nr = r + direct[d], nc = c + direct[d + 1];
                    if (nr >= 0 && nc >= 0 && nr < N && nc < N) {
                        if (grid[nr][nc] == end) return res;
                        if (grid[nr][nc] == 0) {
                            grid[nr][nc] = start;
                            q1.offer(new int[]{nr, nc});
                        }
                    }
                }
            }
            Queue<int[]> temp = q1;
            q1 = q2;
            q2 = temp;
            int tempVal = start;
            start = end;
            end = tempVal;
            res++;
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int N = grid.size();
        if (grid[0][0] || grid[N - 1][N - 1]) return -1;
        if (N == 1) return 1;

        int direct[10] = {0, 1, 0, -1, 0, 1, 1, -1, -1, 1};
        queue<pair<int, int>> q1, q2;
        q1.push({0, 0});
        q2.push({N - 1, N - 1});
        grid[0][0] = -1;
        grid[N - 1][N - 1] = -2;

        int res = 2, start = -1, end = -2;
        while (!q1.empty() && !q2.empty()) {
            for (int i = q1.size(); i > 0; i--) {
                auto [r, c] = q1.front();
                q1.pop();

                for (int d = 0; d < 9; d++) {
                    int nr = r + direct[d], nc = c + direct[d + 1];
                    if (nr >= 0 && nc >= 0 && nr < N && nc < N) {
                        if (grid[nr][nc] == end) return res;
                        if (grid[nr][nc] == 0) {
                            grid[nr][nc] = start;
                            q1.push({nr, nc});
                        }
                    }
                }
            }
            swap(q1, q2);
            swap(start, end);
            res++;
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    shortestPathBinaryMatrix(grid) {
        const N = grid.length;
        if (grid[0][0] || grid[N - 1][N - 1]) return -1;
        if (N === 1) return 1;

        const direct = [0, 1, 0, -1, 0, 1, 1, -1, -1, 1];
        let q1 = new Queue([[0, 0]]);
        let q2 = new Queue([[N - 1, N - 1]]);
        grid[0][0] = -1;
        grid[N - 1][N - 1] = -2;

        let res = 2,
            start = -1,
            end = -2;
        while (!q1.isEmpty() && !q2.isEmpty()) {
            for (let i = q1.size(); i > 0; i--) {
                const [r, c] = q1.pop();
                for (let d = 0; d < 9; d++) {
                    let nr = r + direct[d],
                        nc = c + direct[d + 1];
                    if (nr >= 0 && nc >= 0 && nr < N && nc < N) {
                        if (grid[nr][nc] === end) return res;
                        if (grid[nr][nc] === 0) {
                            grid[nr][nc] = start;
                            q1.push([nr, nc]);
                        }
                    }
                }
            }
            [q1, q2] = [q2, q1];
            [start, end] = [end, start];
            res++;
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int ShortestPathBinaryMatrix(int[][] grid) {
        int N = grid.Length;
        if (grid[0][0] != 0 || grid[N - 1][N - 1] != 0) {
            return -1;
        }
        if (N == 1) {
            return 1;
        }

        int[] direct = new int[] { 0, 1, 0, -1, 0, 1, 1, -1, -1, 1 };
        var q1 = new Queue<(int r, int c)>();
        var q2 = new Queue<(int r, int c)>();
        q1.Enqueue((0, 0));
        q2.Enqueue((N - 1, N - 1));
        grid[0][0] = -1;
        grid[N - 1][N - 1] = -2;

        int res = 2;
        int start = -1, end = -2;
        while (q1.Count > 0 && q2.Count > 0) {
            int size = q1.Count;
            for (int i = 0; i < size; i++) {
                var (r, c) = q1.Dequeue();
                for (int d = 0; d < 9; d++) {
                    int nr = r + direct[d];
                    int nc = c + direct[d + 1];
                    if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
                        if (grid[nr][nc] == end) {
                            return res;
                        }
                        if (grid[nr][nc] == 0) {
                            grid[nr][nc] = start;
                            q1.Enqueue((nr, nc));
                        }
                    }
                }
            }

            var tmpQ = q1;
            q1 = q2;
            q2 = tmpQ;
            int tmp = start;
            start = end;
            end = tmp;
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
