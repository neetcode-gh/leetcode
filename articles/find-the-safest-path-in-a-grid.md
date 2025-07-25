## 1. Multi Source BFS + Dijkstra's Algorithm

::tabs-start

```python
class Solution:
    def maximumSafenessFactor(self, grid: List[List[int]]) -> int:
        N = len(grid)

        def in_bounds(r, c):
            return min(r, c) >= 0 and max(r, c) < N

        def precompute():
            q = deque()
            min_dist = {}
            for r in range(N):
                for c in range(N):
                    if grid[r][c]:
                        q.append([r, c, 0])
                        min_dist[(r, c)] = 0
            while q:
                r, c, dist = q.popleft()
                nei = [[r+1, c], [r-1, c], [r, c+1], [r, c-1]]
                for r2, c2 in nei:
                    if in_bounds(r2, c2) and (r2, c2) not in min_dist:
                        min_dist[(r2, c2)] = dist + 1
                        q.append([r2, c2, dist + 1])
            return min_dist

        min_dist = precompute()
        maxHeap = [(-min_dist[(0, 0)], 0, 0)]  # (dist, r, c)
        visit = set()
        visit.add((0, 0))

        while maxHeap:
            dist, r, c = heapq.heappop(maxHeap)
            dist = -dist
            if (r, c) == (N-1, N-1):
                return dist
            nei = [[r+1, c], [r-1, c], [r, c+1], [r, c-1]]
            for r2, c2 in nei:
                if in_bounds(r2, c2) and (r2, c2) not in visit:
                    visit.add((r2, c2))
                    dist2 = min(dist, min_dist[(r2, c2)])
                    heapq.heappush(maxHeap, (-dist2, r2, c2))
```

```java
public class Solution {
    public int maximumSafenessFactor(List<List<Integer>> grid) {
        int N = grid.size();
        int[][] minDist = precompute(grid, N);
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        boolean[][] visit = new boolean[N][N];

        maxHeap.offer(new int[]{minDist[0][0], 0, 0});
        visit[0][0] = true;

        while (!maxHeap.isEmpty()) {
            int[] curr = maxHeap.poll();
            int dist = curr[0], r = curr[1], c = curr[2];

            if (r == N - 1 && c == N - 1) {
                return dist;
            }

            for (int[] dir : new int[][]{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}) {
                int r2 = r + dir[0], c2 = c + dir[1];
                if (inBounds(r2, c2, N) && !visit[r2][c2]) {
                    visit[r2][c2] = true;
                    int dist2 = Math.min(dist, minDist[r2][c2]);
                    maxHeap.offer(new int[]{dist2, r2, c2});
                }
            }
        }
        return 0;
    }

    private int[][] precompute(List<List<Integer>> grid, int N) {
        int[][] minDist = new int[N][N];
        for (int[] row : minDist) Arrays.fill(row, -1);
        Queue<int[]> q = new LinkedList<>();

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid.get(r).get(c) == 1) {
                    q.offer(new int[]{r, c, 0});
                    minDist[r][c] = 0;
                }
            }
        }

        while (!q.isEmpty()) {
            int[] curr = q.poll();
            int r = curr[0], c = curr[1], dist = curr[2];

            for (int[] dir : new int[][]{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}) {
                int r2 = r + dir[0], c2 = c + dir[1];
                if (inBounds(r2, c2, N) && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = dist + 1;
                    q.offer(new int[]{r2, c2, dist + 1});
                }
            }
        }
        return minDist;
    }

    private boolean inBounds(int r, int c, int N) {
        return r >= 0 && c >= 0 && r < N && c < N;
    }
}
```

```cpp
class Solution {
    static constexpr int directions[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

public:
    int maximumSafenessFactor(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<vector<int>> minDist = precompute(grid, N);
        priority_queue<vector<int>> maxHeap;
        vector<vector<bool>> visit(N, vector<bool>(N, false));

        maxHeap.push({minDist[0][0], 0, 0});
        visit[0][0] = true;

        while (!maxHeap.empty()) {
            vector<int> cur = maxHeap.top(); maxHeap.pop();
            int dist = cur[0], r = cur[1], c = cur[2];

            if (r == N - 1 && c == N - 1) {
                return dist;
            }

            for (const auto& dir : directions) {
                int r2 = r + dir[0], c2 = c + dir[1];
                if (inBounds(r2, c2, N) && !visit[r2][c2]) {
                    visit[r2][c2] = true;
                    int dist2 = min(dist, minDist[r2][c2]);
                    maxHeap.push({dist2, r2, c2});
                }
            }
        }
        return 0;
    }

private:
    vector<vector<int>> precompute(vector<vector<int>>& grid, int N) {
        vector<vector<int>> minDist(N, vector<int>(N, -1));
        queue<vector<int>> q;

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.push({r, c, 0});
                    minDist[r][c] = 0;
                }
            }
        }

        while (!q.empty()) {
            vector<int> cur = q.front();
            q.pop();
            int r = cur[0], c = cur[1], dist = cur[2];

            for (const auto& dir : directions) {
                int r2 = r + dir[0], c2 = c + dir[1];
                if (inBounds(r2, c2, N) && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = dist + 1;
                    q.push({r2, c2, dist + 1});
                }
            }
        }
        return minDist;
    }

    bool inBounds(int r, int c, int N) {
        return r >= 0 && c >= 0 && r < N && c < N;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maximumSafenessFactor(grid) {
        const N = grid.length;
        const directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];

        const inBounds = (r, c) => {
            return r >= 0 && c >= 0 && r < N && c < N;
        };

        const precompute = () => {
            const q = new Queue();
            const minDist = Array.from({ length: N }, () => Array(N).fill(-1));

            for (let r = 0; r < N; r++) {
                for (let c = 0; c < N; c++) {
                    if (grid[r][c] === 1) {
                        q.push([r, c, 0]);
                        minDist[r][c] = 0;
                    }
                }
            }

            while (!q.isEmpty()) {
                let [r, c, dist] = q.pop();

                for (let [dr, dc] of directions) {
                    let r2 = r + dr,
                        c2 = c + dc;
                    if (inBounds(r2, c2) && minDist[r2][c2] === -1) {
                        minDist[r2][c2] = dist + 1;
                        q.push([r2, c2, dist + 1]);
                    }
                }
            }
            return minDist;
        };

        const minDist = precompute();
        const maxHeap = new MaxPriorityQueue({ priority: (x) => x[0] });
        const visit = Array.from({ length: N }, () => Array(N).fill(false));

        maxHeap.enqueue([minDist[0][0], 0, 0]);
        visit[0][0] = true;

        while (!maxHeap.isEmpty()) {
            let [dist, r, c] = maxHeap.dequeue().element;

            if (r === N - 1 && c === N - 1) {
                return dist;
            }

            for (let [dr, dc] of directions) {
                let r2 = r + dr,
                    c2 = c + dc;
                if (inBounds(r2, c2) && !visit[r2][c2]) {
                    visit[r2][c2] = true;
                    let dist2 = Math.min(dist, minDist[r2][c2]);
                    maxHeap.enqueue([dist2, r2, c2]);
                }
            }
        }
        return 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \log n)$
- Space complexity: $O(n ^ 2)$

---

## 2. Multi Source BFS + Dijkstra's Algorithm (Overwriting the Input)

::tabs-start

```python
class Solution:
    def maximumSafenessFactor(self, grid):
        N = len(grid)
        minDist = grid
        directions = [0, 1, 0, -1, 0]

        q = deque()
        for r in range(N):
            for c in range(N):
                if grid[r][c] == 1:
                    q.append(r * N + c)
                    minDist[r][c] = 0
                else:
                    minDist[r][c] = -1

        while q:
            node = q.popleft()
            r, c = divmod(node, N)
            for i in range(4):
                r2, c2 = r + directions[i], c + directions[i + 1]
                if 0 <= r2 < N and 0 <= c2 < N and minDist[r2][c2] == -1:
                    minDist[r2][c2] = minDist[r][c] + 1
                    q.append(r2 * N + c2)

        maxHeap = [(-minDist[0][0], 0)]
        safeFactor = [0] * (N * N)
        safeFactor[0] = minDist[0][0]

        while maxHeap:
            dist, node = heapq.heappop(maxHeap)
            dist = -dist
            r, c = divmod(node, N)
            if r == N - 1 and c == N - 1:
                return dist
            if safeFactor[node] > dist:
                continue

            for i in range(4):
                r2, c2 = r + directions[i], c + directions[i + 1]
                node2 = r2 * N + c2
                if 0 <= r2 < N and 0 <= c2 < N:
                    dist2 = min(dist, minDist[r2][c2])
                    if dist2 > safeFactor[node2]:
                        safeFactor[node2] = dist2
                        heapq.heappush(maxHeap, (-dist2, node2))

        return 0
```

```java
public class Solution {
    public int maximumSafenessFactor(List<List<Integer>> grid) {
        int N = grid.size();
        int[][] minDist = new int[N][N];
        int[] directions = {0, 1, 0, -1, 0};

        Queue<Integer> q = new LinkedList<>();
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid.get(r).get(c) == 1) {
                    q.offer(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.isEmpty()) {
            int node = q.poll();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.offer(r2 * N + c2);
                }
            }
        }

        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> Integer.compare(b[0], a[0]));
        int[] safeFactor = new int[N * N];
        Arrays.fill(safeFactor, -1);
        safeFactor[0] = minDist[0][0];
        maxHeap.offer(new int[]{safeFactor[0], 0});

        while (!maxHeap.isEmpty()) {
            int[] top = maxHeap.poll();
            int dist = top[0], node = top[1];
            int r = node / N, c = node % N;
            if (r == N - 1 && c == N - 1) {
                return dist;
            }
            if (safeFactor[node] > dist) {
                continue;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                int node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N) {
                    int dist2 = Math.min(dist, minDist[r2][c2]);
                    if (dist2 > safeFactor[node2]) {
                        safeFactor[node2] = dist2;
                        maxHeap.offer(new int[]{dist2, node2});
                    }
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
    int maximumSafenessFactor(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<int> directions = {0, 1, 0, -1, 0};
        vector<vector<int>>& minDist = grid;

        queue<int> q;
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.push(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.empty()) {
            int node = q.front(); q.pop();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.push(r2 * N + c2);
                }
            }
        }

        priority_queue<pair<int, int>> maxHeap;
        vector<int> safeFactor(N * N, 0);
        safeFactor[0] = minDist[0][0];
        maxHeap.push({safeFactor[0], 0});

        while (!maxHeap.empty()) {
            auto [dist, node] = maxHeap.top(); maxHeap.pop();
            int r = node / N, c = node % N;
            if (r == N - 1 && c == N - 1) {
                return dist;
            }
            if (safeFactor[node] > dist) {
                continue;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1], node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N) {
                    int dist2 = min(dist, minDist[r2][c2]);
                    if (dist2 > safeFactor[node2]) {
                        safeFactor[node2] = dist2;
                        maxHeap.push({dist2, node2});
                    }
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
     * @param {number[][]} grid
     * @return {number}
     */
    maximumSafenessFactor(grid) {
        const N = grid.length;
        const directions = [0, 1, 0, -1, 0];
        const minDist = grid;

        const q = new Queue();
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 1) {
                    q.push(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.isEmpty()) {
            let node = q.pop();
            let r = Math.floor(node / N),
                c = node % N;
            for (let i = 0; i < 4; i++) {
                let r2 = r + directions[i],
                    c2 = c + directions[i + 1];
                if (
                    r2 >= 0 &&
                    c2 >= 0 &&
                    r2 < N &&
                    c2 < N &&
                    minDist[r2][c2] === -1
                ) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.push(r2 * N + c2);
                }
            }
        }

        let maxHeap = new MaxPriorityQueue({ priority: (x) => x[0] });
        let safeFactor = new Array(N * N).fill(0);
        safeFactor[0] = minDist[0][0];
        maxHeap.enqueue([safeFactor[0], 0]);

        while (!maxHeap.isEmpty()) {
            let [dist, node] = maxHeap.dequeue().element;
            let r = Math.floor(node / N),
                c = node % N;
            if (r === N - 1 && c === N - 1) {
                return dist;
            }
            if (safeFactor[node] > dist) {
                continue;
            }

            for (let i = 0; i < 4; i++) {
                let r2 = r + directions[i],
                    c2 = c + directions[i + 1],
                    node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N) {
                    let dist2 = Math.min(dist, minDist[r2][c2]);
                    if (dist2 > safeFactor[node2]) {
                        safeFactor[node2] = dist2;
                        maxHeap.enqueue([dist2, node2]);
                    }
                }
            }
        }
        return 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \log n)$
- Space complexity: $O(n ^ 2)$

---

## 3. Multi Source BFS + Binary Search

::tabs-start

```python
class Solution:
    def maximumSafenessFactor(self, grid):
        N = len(grid)
        minDist = grid
        directions = [0, 1, 0, -1, 0]

        q = deque()
        for r in range(N):
            for c in range(N):
                if grid[r][c] == 1:
                    q.append(r * N + c)
                    minDist[r][c] = 0
                else:
                    minDist[r][c] = -1

        while q:
            node = q.popleft()
            r, c = divmod(node, N)
            for i in range(4):
                r2, c2 = r + directions[i], c + directions[i + 1]
                if 0 <= r2 < N and 0 <= c2 < N and minDist[r2][c2] == -1:
                    minDist[r2][c2] = minDist[r][c] + 1
                    q.append(r2 * N + c2)

        def canReach(threshold):
            q = deque([0])
            visited = [False] * (N * N)
            visited[0] = True

            while q:
                node = q.popleft()
                r, c = divmod(node, N)
                if r == N - 1 and c == N - 1:
                    return True

                for i in range(4):
                    r2, c2 = r + directions[i], c + directions[i + 1]
                    node2 = r2 * N + c2
                    if (0 <= r2 < N and 0 <= c2 < N and not visited[node2] and
                        minDist[r2][c2] >= threshold
                    ):
                        visited[node2] = True
                        q.append(node2)

            return False

        l, r = 0, min(minDist[0][0], minDist[N - 1][N - 1])
        while l <= r:
            mid = (l + r) // 2
            if canReach(mid):
                l = mid + 1
            else:
                r = mid - 1

        return l - 1
```

```java
public class Solution {
    private static int[] directions = {0, 1, 0, -1, 0};

    public int maximumSafenessFactor(List<List<Integer>> grid) {
        int N = grid.size();
        int[][] minDist = new int[N][N];

        Queue<Integer> q = new LinkedList<>();
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid.get(r).get(c) == 1) {
                    q.offer(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.isEmpty()) {
            int node = q.poll();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.offer(r2 * N + c2);
                }
            }
        }

        int l = 0, r = Math.min(minDist[0][0], minDist[N - 1][N - 1]);
        while (l <= r) {
            int mid = (l + r) / 2;
            if (canReach(minDist, N, mid)) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return l - 1;
    }

    private boolean canReach(int[][] minDist, int N, int threshold) {
        Queue<Integer> q = new LinkedList<>();
        boolean[] visited = new boolean[N * N];
        q.offer(0);
        visited[0] = true;

        while (!q.isEmpty()) {
            int node = q.poll();
            int r = node / N, c = node % N;
            if (r == N - 1 && c == N - 1) {
                return true;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                int node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && !visited[node2] &&
                    minDist[r2][c2] >= threshold) {
                    visited[node2] = true;
                    q.offer(node2);
                }
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
    static constexpr int directions[5] = {0, 1, 0, -1, 0};

public:
    int maximumSafenessFactor(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<vector<int>>& minDist = grid;

        queue<int> q;
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.push(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.empty()) {
            int node = q.front(); q.pop();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.push(r2 * N + c2);
                }
            }
        }

        int l = 0, r = min(minDist[0][0], minDist[N - 1][N - 1]);
        while (l <= r) {
            int mid = (l + r) / 2;
            if (canReach(minDist, N, mid)) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return l - 1;
    }

private:
    bool canReach(vector<vector<int>>& minDist, int N, int threshold) {
        queue<int> q;
        vector<bool> visited(N * N, false);
        q.push(0);
        visited[0] = true;

        while (!q.empty()) {
            int node = q.front(); q.pop();
            int r = node / N, c = node % N;
            if (r == N - 1 && c == N - 1) {
                return true;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1], node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && !visited[node2] &&
                    minDist[r2][c2] >= threshold) {
                    visited[node2] = true;
                    q.push(node2);
                }
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maximumSafenessFactor(grid) {
        const N = grid.length;
        const minDist = grid;
        const directions = [0, 1, 0, -1, 0];

        let q = new Queue();
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 1) {
                    q.push(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.isEmpty()) {
            let node = q.pop();
            let r = Math.floor(node / N),
                c = node % N;
            for (let i = 0; i < 4; i++) {
                let r2 = r + directions[i],
                    c2 = c + directions[i + 1];
                if (
                    r2 >= 0 &&
                    c2 >= 0 &&
                    r2 < N &&
                    c2 < N &&
                    minDist[r2][c2] === -1
                ) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.push(r2 * N + c2);
                }
            }
        }

        const canReach = (threshold) => {
            q = new Queue([0]);
            let visited = new Array(N * N).fill(false);
            visited[0] = true;

            while (!q.isEmpty()) {
                let node = q.pop();
                let r = Math.floor(node / N),
                    c = node % N;
                if (r === N - 1 && c === N - 1) return true;

                for (let i = 0; i < 4; i++) {
                    let r2 = r + directions[i],
                        c2 = c + directions[i + 1],
                        node2 = r2 * N + c2;
                    if (
                        r2 >= 0 &&
                        c2 >= 0 &&
                        r2 < N &&
                        c2 < N &&
                        !visited[node2] &&
                        minDist[r2][c2] >= threshold
                    ) {
                        visited[node2] = true;
                        q.push(node2);
                    }
                }
            }
            return false;
        };

        let l = 0,
            r = Math.min(minDist[0][0], minDist[N - 1][N - 1]);
        while (l <= r) {
            let mid = Math.floor((l + r) / 2);
            if (canReach(mid)) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return l - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \log n)$
- Space complexity: $O(n ^ 2)$

---

## 4. Breadth First Search (0-1 BFS)

::tabs-start

```python
class Solution:
    def maximumSafenessFactor(self, grid):
        N = len(grid)
        minDist = grid
        directions = [0, 1, 0, -1, 0]

        q = deque()
        for r in range(N):
            for c in range(N):
                if grid[r][c] == 1:
                    q.append(r * N + c)
                    minDist[r][c] = 0
                else:
                    minDist[r][c] = -1

        while q:
            node = q.popleft()
            r, c = divmod(node, N)
            for i in range(4):
                r2, c2 = r + directions[i], c + directions[i + 1]
                if 0 <= r2 < N and 0 <= c2 < N and minDist[r2][c2] == -1:
                    minDist[r2][c2] = minDist[r][c] + 1
                    q.append(r2 * N + c2)

        safeFactor = [-1] * (N * N)
        res = safeFactor[0] = min(minDist[N - 1][N - 1], minDist[0][0])
        q.append(0)

        while q:
            node = q.popleft()
            r, c = divmod(node, N)
            res = min(res, safeFactor[node])
            if r == N - 1 and c == N - 1:
                break

            for i in range(4):
                r2, c2 = r + directions[i], c + directions[i + 1]
                node2 = r2 * N + c2
                if 0 <= r2 < N and 0 <= c2 < N and safeFactor[node2] == -1:
                    safeFactor[node2] = min(safeFactor[node], minDist[r2][c2])
                    if safeFactor[node2] < res:
                        q.append(node2)
                    else:
                        q.appendleft(node2)

        return res
```

```java
public class Solution {
    private static final int[] directions = {0, 1, 0, -1, 0};

    public int maximumSafenessFactor(List<List<Integer>> grid) {
        int N = grid.size();
        int[][] minDist = new int[N][N];

        Deque<Integer> q = new ArrayDeque<>();
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid.get(r).get(c) == 1) {
                    q.offerLast(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.isEmpty()) {
            int node = q.pollFirst();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.offerLast(r2 * N + c2);
                }
            }
        }

        int[] safeFactor = new int[N * N];
        Arrays.fill(safeFactor, -1);
        int res = safeFactor[0] = Math.min(minDist[N - 1][N - 1], minDist[0][0]);
        q.offerLast(0);

        while (!q.isEmpty()) {
            int node = q.pollFirst();
            int r = node / N, c = node % N;
            res = Math.min(res, safeFactor[node]);
            if (r == N - 1 && c == N - 1) {
                break;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1], node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && safeFactor[node2] == -1) {
                    safeFactor[node2] = Math.min(safeFactor[node], minDist[r2][c2]);
                    if (safeFactor[node2] < res) {
                        q.offerLast(node2);
                    } else {
                        q.offerFirst(node2);
                    }
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maximumSafenessFactor(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<vector<int>>& minDist = grid;
        constexpr int directions[5] = {0, 1, 0, -1, 0};

        deque<int> q;
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.push_back(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.empty()) {
            int node = q.front(); q.pop_front();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.push_back(r2 * N + c2);
                }
            }
        }

        vector<int> safeFactor(N * N, -1);
        int res = safeFactor[0] = min(minDist[N - 1][N - 1], minDist[0][0]);
        q.push_back(0);

        while (!q.empty()) {
            int node = q.front(); q.pop_front();
            int r = node / N, c = node % N;
            res = min(res, safeFactor[node]);
            if (r == N - 1 && c == N - 1) {
                break;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1], node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && safeFactor[node2] == -1) {
                    safeFactor[node2] = min(safeFactor[node], minDist[r2][c2]);
                    if (safeFactor[node2] < res) {
                        q.push_back(node2);
                    } else {
                        q.push_front(node2);
                    }
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
    maximumSafenessFactor(grid) {
        const N = grid.length;
        const minDist = grid;
        const directions = [0, 1, 0, -1, 0];

        const q = new Deque();
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 1) {
                    q.pushBack(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.isEmpty()) {
            let node = q.popFront();
            let r = Math.floor(node / N),
                c = node % N;
            for (let i = 0; i < 4; i++) {
                let r2 = r + directions[i],
                    c2 = c + directions[i + 1];
                if (
                    r2 >= 0 &&
                    c2 >= 0 &&
                    r2 < N &&
                    c2 < N &&
                    minDist[r2][c2] === -1
                ) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.pushBack(r2 * N + c2);
                }
            }
        }

        let safeFactor = new Array(N * N).fill(-1);
        let res = (safeFactor[0] = Math.min(
            minDist[N - 1][N - 1],
            minDist[0][0],
        ));
        q.pushBack(0);

        while (!q.isEmpty()) {
            let node = q.popFront();
            let r = Math.floor(node / N),
                c = node % N;
            res = Math.min(res, safeFactor[node]);
            if (r === N - 1 && c === N - 1) {
                break;
            }

            for (let i = 0; i < 4; i++) {
                let r2 = r + directions[i],
                    c2 = c + directions[i + 1],
                    node2 = r2 * N + c2;
                if (
                    r2 >= 0 &&
                    c2 >= 0 &&
                    r2 < N &&
                    c2 < N &&
                    safeFactor[node2] === -1
                ) {
                    safeFactor[node2] = Math.min(
                        safeFactor[node],
                        minDist[r2][c2],
                    );
                    if (safeFactor[node2] < res) {
                        q.pushBack(node2);
                    } else {
                        q.pushFront(node2);
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

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$
