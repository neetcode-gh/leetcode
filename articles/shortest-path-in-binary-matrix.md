## 1. Breadth First Search

### Intuition

We need to find the shortest path from the top-left corner to the bottom-right corner in a binary matrix, where we can only travel through cells containing `0`. Since we want the shortest path and each step has equal weight, `BFS` is the natural choice. `BFS` explores cells level by level, guaranteeing that the first time we reach the destination, we have found the shortest path. We can move in all 8 directions (horizontal, vertical, and diagonal), so we check all 8 neighbors at each step.

### Algorithm

1. If the start cell `(0, 0)` or end cell `(N-1, N-1)` is blocked (contains `1`), return `-1`.
2. Initialize a queue with the starting position `(0, 0, 1)` where `1` represents the path `length`.
3. Use a visited set or array to track cells we have already explored.
4. While the queue is not empty:
   - Dequeue a cell `(r, c, length)`.
   - If this is the destination `(N-1, N-1)`, return `length` as the shortest path.
   - For each of the 8 directions, check if the neighbor is valid, unvisited, and contains `0`.
   - If so, mark it as visited and enqueue it with `length + 1`.
5. If the queue empties without reaching the destination, return `-1` (no path exists).

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

```go
func shortestPathBinaryMatrix(grid [][]int) int {
    n := len(grid)
    if grid[0][0] == 1 || grid[n-1][n-1] == 1 {
        return -1
    }

    directions := [][]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0},
                          {1, 1}, {-1, -1}, {1, -1}, {-1, 1}}
    visit := make([][]bool, n)
    for i := range visit {
        visit[i] = make([]bool, n)
    }

    q := [][]int{{0, 0, 1}}
    visit[0][0] = true

    for len(q) > 0 {
        cell := q[0]
        q = q[1:]
        r, c, length := cell[0], cell[1], cell[2]

        if r == n-1 && c == n-1 {
            return length
        }

        for _, d := range directions {
            nr, nc := r+d[0], c+d[1]
            if nr >= 0 && nc >= 0 && nr < n && nc < n &&
                grid[nr][nc] == 0 && !visit[nr][nc] {
                q = append(q, []int{nr, nc, length + 1})
                visit[nr][nc] = true
            }
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun shortestPathBinaryMatrix(grid: Array<IntArray>): Int {
        val n = grid.size
        if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1

        val directions = arrayOf(
            intArrayOf(0, 1), intArrayOf(1, 0), intArrayOf(0, -1), intArrayOf(-1, 0),
            intArrayOf(1, 1), intArrayOf(-1, -1), intArrayOf(1, -1), intArrayOf(-1, 1)
        )
        val visit = Array(n) { BooleanArray(n) }

        val q = ArrayDeque<IntArray>()
        q.add(intArrayOf(0, 0, 1))
        visit[0][0] = true

        while (q.isNotEmpty()) {
            val (r, c, length) = q.removeFirst()

            if (r == n - 1 && c == n - 1) return length

            for (d in directions) {
                val nr = r + d[0]
                val nc = c + d[1]
                if (nr in 0 until n && nc in 0 until n &&
                    grid[nr][nc] == 0 && !visit[nr][nc]) {
                    q.add(intArrayOf(nr, nc, length + 1))
                    visit[nr][nc] = true
                }
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func shortestPathBinaryMatrix(_ grid: [[Int]]) -> Int {
        let n = grid.count
        if grid[0][0] == 1 || grid[n - 1][n - 1] == 1 {
            return -1
        }

        let directions = [(0, 1), (1, 0), (0, -1), (-1, 0),
                          (1, 1), (-1, -1), (1, -1), (-1, 1)]
        var visit = [[Bool]](repeating: [Bool](repeating: false, count: n), count: n)

        var q = [(r: Int, c: Int, length: Int)]()
        q.append((0, 0, 1))
        visit[0][0] = true

        while !q.isEmpty {
            let (r, c, length) = q.removeFirst()

            if r == n - 1 && c == n - 1 {
                return length
            }

            for (dr, dc) in directions {
                let nr = r + dr
                let nc = c + dc
                if nr >= 0 && nc >= 0 && nr < n && nc < n &&
                   grid[nr][nc] == 0 && !visit[nr][nc] {
                    q.append((nr, nc, length + 1))
                    visit[nr][nc] = true
                }
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 2. Breadth First Search (Overwriting the Input)

### Intuition

This approach is similar to the standard `BFS` but optimizes space by using the input grid itself to store distances. Instead of maintaining a separate visited set, we overwrite each cell with its `distance` from the start. A cell value of `0` indicates unvisited, while any positive value represents the shortest distance to reach that cell. This eliminates the need for extra space while preserving the `BFS` guarantee of finding the shortest path.

### Algorithm

1. If the start or end cell is blocked, return `-1`.
2. Initialize a queue with `(0, 0)` and set `grid[0][0] = 1` (distance of 1).
3. While the queue is not empty:
   - Dequeue a cell `(r, c)` and read its `distance` from `grid[r][c]`.
   - If this is the destination, return the `distance`.
   - For each of the 8 neighbors, if the neighbor is in bounds and equals `0`:
     - Set its value to `dist + 1`.
     - Enqueue the neighbor.
4. Return `-1` if the destination is unreachable.

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

```go
func shortestPathBinaryMatrix(grid [][]int) int {
    n := len(grid)
    direct := []int{0, 1, 0, -1, 0, 1, 1, -1, -1, 1}

    if grid[0][0] == 1 || grid[n-1][n-1] == 1 {
        return -1
    }

    q := [][]int{{0, 0}}
    grid[0][0] = 1

    for len(q) > 0 {
        cell := q[0]
        q = q[1:]
        r, c := cell[0], cell[1]
        dist := grid[r][c]

        if r == n-1 && c == n-1 {
            return dist
        }

        for d := 0; d < 9; d++ {
            nr := r + direct[d]
            nc := c + direct[d+1]
            if nr >= 0 && nc >= 0 && nr < n && nc < n && grid[nr][nc] == 0 {
                grid[nr][nc] = dist + 1
                q = append(q, []int{nr, nc})
            }
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun shortestPathBinaryMatrix(grid: Array<IntArray>): Int {
        val n = grid.size
        val direct = intArrayOf(0, 1, 0, -1, 0, 1, 1, -1, -1, 1)

        if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) {
            return -1
        }

        val q = ArrayDeque<IntArray>()
        q.add(intArrayOf(0, 0))
        grid[0][0] = 1

        while (q.isNotEmpty()) {
            val (r, c) = q.removeFirst()
            val dist = grid[r][c]

            if (r == n - 1 && c == n - 1) {
                return dist
            }

            for (d in 0 until 9) {
                val nr = r + direct[d]
                val nc = c + direct[d + 1]
                if (nr in 0 until n && nc in 0 until n && grid[nr][nc] == 0) {
                    grid[nr][nc] = dist + 1
                    q.add(intArrayOf(nr, nc))
                }
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func shortestPathBinaryMatrix(_ grid: [[Int]]) -> Int {
        var grid = grid
        let n = grid.count
        let direct = [0, 1, 0, -1, 0, 1, 1, -1, -1, 1]

        if grid[0][0] == 1 || grid[n - 1][n - 1] == 1 {
            return -1
        }

        var q = [(Int, Int)]()
        q.append((0, 0))
        grid[0][0] = 1

        while !q.isEmpty {
            let (r, c) = q.removeFirst()
            let dist = grid[r][c]

            if r == n - 1 && c == n - 1 {
                return dist
            }

            for d in 0..<9 {
                let nr = r + direct[d]
                let nc = c + direct[d + 1]
                if nr >= 0 && nc >= 0 && nr < n && nc < n && grid[nr][nc] == 0 {
                    grid[nr][nc] = dist + 1
                    q.append((nr, nc))
                }
            }
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Bidirectional Breadth First Search

### Intuition

Standard `BFS` explores outward from the source in all directions. Bidirectional `BFS` runs two searches simultaneously: one from the start and one from the end. When the two search frontiers meet, we have found the shortest path. This reduces the search space significantly because instead of exploring a circle of radius `d`, we explore two circles of radius `d/2`. The total area explored is roughly half of what single-direction `BFS` would cover.

### Algorithm

1. Handle edge cases: if start or end is blocked, return `-1`. If the grid is `1x1`, return `1`.
2. Initialize two queues: `q1` starting from `(0, 0)` and `q2` starting from `(N-1, N-1)`.
3. Mark the start cell with `-1` and the end cell with `-2` to distinguish the two frontiers.
4. Alternate between expanding `q1` and `q2`:
   - For each cell in the current queue, explore all 8 neighbors.
   - If a neighbor belongs to the other frontier (`end` or `start`), return the current path length.
   - If a neighbor is unvisited (`0`), mark it with the current frontier's marker and add it to the queue.
5. Swap the queues and markers after each level, incrementing the path length.
6. Return `-1` if the frontiers never meet.

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

```go
func shortestPathBinaryMatrix(grid [][]int) int {
    n := len(grid)
    if grid[0][0] != 0 || grid[n-1][n-1] != 0 {
        return -1
    }
    if n == 1 {
        return 1
    }

    direct := []int{0, 1, 0, -1, 0, 1, 1, -1, -1, 1}
    q1 := [][]int{{0, 0}}
    q2 := [][]int{{n - 1, n - 1}}
    grid[0][0] = -1
    grid[n-1][n-1] = -2

    res := 2
    start, end := -1, -2

    for len(q1) > 0 && len(q2) > 0 {
        size := len(q1)
        for i := 0; i < size; i++ {
            cell := q1[0]
            q1 = q1[1:]
            r, c := cell[0], cell[1]

            for d := 0; d < 9; d++ {
                nr := r + direct[d]
                nc := c + direct[d+1]
                if nr >= 0 && nc >= 0 && nr < n && nc < n {
                    if grid[nr][nc] == end {
                        return res
                    }
                    if grid[nr][nc] == 0 {
                        grid[nr][nc] = start
                        q1 = append(q1, []int{nr, nc})
                    }
                }
            }
        }
        q1, q2 = q2, q1
        start, end = end, start
        res++
    }

    return -1
}
```

```kotlin
class Solution {
    fun shortestPathBinaryMatrix(grid: Array<IntArray>): Int {
        val n = grid.size
        if (grid[0][0] != 0 || grid[n - 1][n - 1] != 0) {
            return -1
        }
        if (n == 1) {
            return 1
        }

        val direct = intArrayOf(0, 1, 0, -1, 0, 1, 1, -1, -1, 1)
        var q1 = ArrayDeque<IntArray>()
        var q2 = ArrayDeque<IntArray>()
        q1.add(intArrayOf(0, 0))
        q2.add(intArrayOf(n - 1, n - 1))
        grid[0][0] = -1
        grid[n - 1][n - 1] = -2

        var res = 2
        var start = -1
        var end = -2

        while (q1.isNotEmpty() && q2.isNotEmpty()) {
            val size = q1.size
            repeat(size) {
                val (r, c) = q1.removeFirst()
                for (d in 0 until 9) {
                    val nr = r + direct[d]
                    val nc = c + direct[d + 1]
                    if (nr in 0 until n && nc in 0 until n) {
                        if (grid[nr][nc] == end) {
                            return res
                        }
                        if (grid[nr][nc] == 0) {
                            grid[nr][nc] = start
                            q1.add(intArrayOf(nr, nc))
                        }
                    }
                }
            }
            val temp = q1
            q1 = q2
            q2 = temp
            val tmpVal = start
            start = end
            end = tmpVal
            res++
        }

        return -1
    }
}
```

```swift
class Solution {
    func shortestPathBinaryMatrix(_ grid: [[Int]]) -> Int {
        var grid = grid
        let n = grid.count
        if grid[0][0] != 0 || grid[n - 1][n - 1] != 0 {
            return -1
        }
        if n == 1 {
            return 1
        }

        let direct = [0, 1, 0, -1, 0, 1, 1, -1, -1, 1]
        var q1 = [(Int, Int)]()
        var q2 = [(Int, Int)]()
        q1.append((0, 0))
        q2.append((n - 1, n - 1))
        grid[0][0] = -1
        grid[n - 1][n - 1] = -2

        var res = 2
        var start = -1
        var end = -2

        while !q1.isEmpty && !q2.isEmpty {
            let size = q1.count
            for _ in 0..<size {
                let (r, c) = q1.removeFirst()
                for d in 0..<9 {
                    let nr = r + direct[d]
                    let nc = c + direct[d + 1]
                    if nr >= 0 && nc >= 0 && nr < n && nc < n {
                        if grid[nr][nc] == end {
                            return res
                        }
                        if grid[nr][nc] == 0 {
                            grid[nr][nc] = start
                            q1.append((nr, nc))
                        }
                    }
                }
            }
            swap(&q1, &q2)
            swap(&start, &end)
            res += 1
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## Common Pitfalls

### Forgetting to Check Start and End Cells

Before starting BFS, verify that both the starting cell `(0, 0)` and the destination cell `(n-1, n-1)` are passable (value 0). If either is blocked (value 1), return -1 immediately. Missing this check causes BFS to run unnecessarily or return incorrect results.

### Using Only 4 Directions Instead of 8

This problem allows diagonal movement, so all 8 directions must be explored: up, down, left, right, and the four diagonals. Using only the standard 4-directional movement leads to longer paths or failure to find a path that exists through diagonal moves.

### Marking Cells as Visited Too Late

Cells must be marked as visited when they are added to the queue, not when they are dequeued. Marking upon dequeue allows the same cell to be added multiple times from different neighbors, causing incorrect path lengths and memory issues. Always mark visited immediately upon enqueueing.
