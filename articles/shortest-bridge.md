## 1. Depth First Search + Breadth First Search - I

### Intuition

The problem asks for the minimum number of 0s to flip to connect two islands. This is essentially finding the shortest path between the two islands across water.

First, we identify one island completely using DFS and mark all its cells as visited. Then, we use BFS to expand outward from this island. BFS naturally finds the shortest path because it explores all cells at distance 1 before distance 2, and so on. The moment we reach a cell belonging to the second island, we have found the minimum bridge length.

### Algorithm

1. Find the first land cell and run `DFS` to mark all cells of the first island as visited.
2. Initialize a `BFS` queue with all cells from the first island.
3. Perform `BFS`, expanding outward level by level:
   - For each cell, check all four neighbors.
   - If a neighbor is part of the second island (land and not visited), return the current distance.
   - If a neighbor is water and not visited, mark it visited and add to the queue.
4. Increment the distance counter after processing each level.
5. Return the distance when the second island is reached.

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

```go
func shortestBridge(grid [][]int) int {
    N := len(grid)
    direct := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
    visit := make(map[[2]int]bool)

    invalid := func(r, c int) bool {
        return r < 0 || c < 0 || r == N || c == N
    }

    var dfs func(r, c int)
    dfs = func(r, c int) {
        if invalid(r, c) || grid[r][c] == 0 || visit[[2]int{r, c}] {
            return
        }
        visit[[2]int{r, c}] = true
        for _, d := range direct {
            dfs(r+d[0], c+d[1])
        }
    }

    bfs := func() int {
        res := 0
        q := [][]int{}
        for k := range visit {
            q = append(q, []int{k[0], k[1]})
        }

        for len(q) > 0 {
            size := len(q)
            for i := 0; i < size; i++ {
                r, c := q[0][0], q[0][1]
                q = q[1:]
                for _, d := range direct {
                    curR, curC := r+d[0], c+d[1]
                    if invalid(curR, curC) || visit[[2]int{curR, curC}] {
                        continue
                    }
                    if grid[curR][curC] == 1 {
                        return res
                    }
                    q = append(q, []int{curR, curC})
                    visit[[2]int{curR, curC}] = true
                }
            }
            res++
        }
        return -1
    }

    for r := 0; r < N; r++ {
        for c := 0; c < N; c++ {
            if grid[r][c] == 1 {
                dfs(r, c)
                return bfs()
            }
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun shortestBridge(grid: Array<IntArray>): Int {
        val N = grid.size
        val direct = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1), intArrayOf(1, 0), intArrayOf(-1, 0))
        val visit = HashSet<Pair<Int, Int>>()

        fun invalid(r: Int, c: Int) = r < 0 || c < 0 || r == N || c == N

        fun dfs(r: Int, c: Int) {
            if (invalid(r, c) || grid[r][c] == 0 || Pair(r, c) in visit) return
            visit.add(Pair(r, c))
            for (d in direct) {
                dfs(r + d[0], c + d[1])
            }
        }

        fun bfs(): Int {
            var res = 0
            val q = ArrayDeque(visit)

            while (q.isNotEmpty()) {
                repeat(q.size) {
                    val (r, c) = q.removeFirst()
                    for (d in direct) {
                        val curR = r + d[0]
                        val curC = c + d[1]
                        if (invalid(curR, curC) || Pair(curR, curC) in visit) continue
                        if (grid[curR][curC] == 1) return res
                        q.addLast(Pair(curR, curC))
                        visit.add(Pair(curR, curC))
                    }
                }
                res++
            }
            return -1
        }

        for (r in 0 until N) {
            for (c in 0 until N) {
                if (grid[r][c] == 1) {
                    dfs(r, c)
                    return bfs()
                }
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func shortestBridge(_ grid: [[Int]]) -> Int {
        let N = grid.count
        let direct = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        var visit = Set<[Int]>()
        var grid = grid

        func invalid(_ r: Int, _ c: Int) -> Bool {
            return r < 0 || c < 0 || r == N || c == N
        }

        func dfs(_ r: Int, _ c: Int) {
            if invalid(r, c) || grid[r][c] == 0 || visit.contains([r, c]) {
                return
            }
            visit.insert([r, c])
            for d in direct {
                dfs(r + d.0, c + d.1)
            }
        }

        func bfs() -> Int {
            var res = 0
            var q = Array(visit)

            while !q.isEmpty {
                let size = q.count
                for _ in 0..<size {
                    let cell = q.removeFirst()
                    let r = cell[0], c = cell[1]
                    for d in direct {
                        let curR = r + d.0, curC = c + d.1
                        if invalid(curR, curC) || visit.contains([curR, curC]) {
                            continue
                        }
                        if grid[curR][curC] == 1 {
                            return res
                        }
                        q.append([curR, curC])
                        visit.insert([curR, curC])
                    }
                }
                res += 1
            }
            return -1
        }

        for r in 0..<N {
            for c in 0..<N {
                if grid[r][c] == 1 {
                    dfs(r, c)
                    return bfs()
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

## 2. Depth First Search + Breadth First Search - II

### Intuition

This is a space-optimized version of the previous approach. Instead of using a separate visited set, we modify the grid directly by marking visited land cells with the value 2. This distinguishes them from unvisited land (value 1) and water (value 0).

During BFS expansion, water cells are also marked as 2 when visited. When we encounter a cell with value 1, we know it belongs to the second island.

### Algorithm

1. Find the first land cell and run `DFS` to mark all its cells with value `2`.
2. During `DFS`, add each cell to the `BFS` queue.
3. Perform `BFS`, expanding outward level by level:
   - For each cell, check all four neighbors.
   - If a neighbor has value `1`, return the current distance (found second island).
   - If a neighbor has value `0`, mark it as `2` and add to the queue.
4. Increment the distance counter after processing each level.
5. Return the distance when the second island is reached.

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

```go
func shortestBridge(grid [][]int) int {
    N := len(grid)
    direct := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
    q := [][]int{}

    var dfs func(r, c int)
    dfs = func(r, c int) {
        if r >= 0 && r < N && c >= 0 && c < N && grid[r][c] == 1 {
            grid[r][c] = 2
            q = append(q, []int{r, c})
            for _, d := range direct {
                dfs(r+d[0], c+d[1])
            }
        }
    }

    found := false
    for r := 0; r < N && !found; r++ {
        for c := 0; c < N; c++ {
            if grid[r][c] == 1 {
                dfs(r, c)
                found = true
                break
            }
        }
    }

    res := 0
    for len(q) > 0 {
        size := len(q)
        for i := 0; i < size; i++ {
            r, c := q[0][0], q[0][1]
            q = q[1:]
            for _, d := range direct {
                nr, nc := r+d[0], c+d[1]
                if nr >= 0 && nr < N && nc >= 0 && nc < N {
                    if grid[nr][nc] == 1 {
                        return res
                    }
                    if grid[nr][nc] == 0 {
                        grid[nr][nc] = 2
                        q = append(q, []int{nr, nc})
                    }
                }
            }
        }
        res++
    }
    return res
}
```

```kotlin
class Solution {
    fun shortestBridge(grid: Array<IntArray>): Int {
        val N = grid.size
        val direct = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1), intArrayOf(1, 0), intArrayOf(-1, 0))
        val q = ArrayDeque<Pair<Int, Int>>()

        fun dfs(r: Int, c: Int) {
            if (r in 0 until N && c in 0 until N && grid[r][c] == 1) {
                grid[r][c] = 2
                q.addLast(Pair(r, c))
                for (d in direct) {
                    dfs(r + d[0], c + d[1])
                }
            }
        }

        outer@ for (r in 0 until N) {
            for (c in 0 until N) {
                if (grid[r][c] == 1) {
                    dfs(r, c)
                    break@outer
                }
            }
        }

        var res = 0
        while (q.isNotEmpty()) {
            repeat(q.size) {
                val (r, c) = q.removeFirst()
                for (d in direct) {
                    val nr = r + d[0]
                    val nc = c + d[1]
                    if (nr in 0 until N && nc in 0 until N) {
                        if (grid[nr][nc] == 1) return res
                        if (grid[nr][nc] == 0) {
                            grid[nr][nc] = 2
                            q.addLast(Pair(nr, nc))
                        }
                    }
                }
            }
            res++
        }
        return res
    }
}
```

```swift
class Solution {
    func shortestBridge(_ grid: [[Int]]) -> Int {
        var grid = grid
        let N = grid.count
        let direct = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        var q = [[Int]]()

        func dfs(_ r: Int, _ c: Int) {
            if r >= 0 && r < N && c >= 0 && c < N && grid[r][c] == 1 {
                grid[r][c] = 2
                q.append([r, c])
                for d in direct {
                    dfs(r + d.0, c + d.1)
                }
            }
        }

        outerLoop: for r in 0..<N {
            for c in 0..<N {
                if grid[r][c] == 1 {
                    dfs(r, c)
                    break outerLoop
                }
            }
        }

        var res = 0
        while !q.isEmpty {
            let size = q.count
            for _ in 0..<size {
                let cell = q.removeFirst()
                let r = cell[0], c = cell[1]
                for d in direct {
                    let nr = r + d.0, nc = c + d.1
                    if nr >= 0 && nr < N && nc >= 0 && nc < N {
                        if grid[nr][nc] == 1 {
                            return res
                        }
                        if grid[nr][nc] == 0 {
                            grid[nr][nc] = 2
                            q.append([nr, nc])
                        }
                    }
                }
            }
            res += 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Breadth First Search

### Intuition

We can use BFS for both phases: identifying the first island and expanding to find the bridge. This avoids the recursive overhead of DFS and may be preferable for very large islands.

The first BFS explores all connected land cells starting from the first land cell found, marking them as visited. The second BFS then expands from all boundary cells of the first island simultaneously, searching for the second island.

### Algorithm

1. Find the first land cell.
2. Run `BFS` from this cell to identify all cells of the first island, marking them as `2` and adding them to a second queue.
3. Perform `BFS` using the second queue, expanding outward level by level:
   - For each cell, check all four neighbors.
   - If a neighbor has value `1`, return the current distance.
   - If a neighbor has value `0`, mark it as `2` and add to the queue.
4. Increment the distance counter after processing each level.
5. Return the distance when the second island is reached.

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

```go
func shortestBridge(grid [][]int) int {
    N := len(grid)
    direct := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
    q2 := [][]int{}

    found := false
    for r := 0; r < N && !found; r++ {
        for c := 0; c < N; c++ {
            if grid[r][c] == 1 {
                q1 := [][]int{{r, c}}
                grid[r][c] = 2

                for len(q1) > 0 {
                    x, y := q1[0][0], q1[0][1]
                    q1 = q1[1:]
                    q2 = append(q2, []int{x, y})

                    for _, d := range direct {
                        nx, ny := x+d[0], y+d[1]
                        if nx >= 0 && ny >= 0 && nx < N && ny < N && grid[nx][ny] == 1 {
                            grid[nx][ny] = 2
                            q1 = append(q1, []int{nx, ny})
                        }
                    }
                }
                found = true
                break
            }
        }
    }

    res := 0
    for len(q2) > 0 {
        size := len(q2)
        for i := 0; i < size; i++ {
            x, y := q2[0][0], q2[0][1]
            q2 = q2[1:]

            for _, d := range direct {
                nx, ny := x+d[0], y+d[1]
                if nx >= 0 && ny >= 0 && nx < N && ny < N {
                    if grid[nx][ny] == 1 {
                        return res
                    }
                    if grid[nx][ny] == 0 {
                        grid[nx][ny] = 2
                        q2 = append(q2, []int{nx, ny})
                    }
                }
            }
        }
        res++
    }
    return res
}
```

```kotlin
class Solution {
    fun shortestBridge(grid: Array<IntArray>): Int {
        val N = grid.size
        val direct = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1), intArrayOf(1, 0), intArrayOf(-1, 0))
        val q2 = ArrayDeque<Pair<Int, Int>>()

        outer@ for (r in 0 until N) {
            for (c in 0 until N) {
                if (grid[r][c] == 1) {
                    val q1 = ArrayDeque<Pair<Int, Int>>()
                    q1.addLast(Pair(r, c))
                    grid[r][c] = 2

                    while (q1.isNotEmpty()) {
                        val (x, y) = q1.removeFirst()
                        q2.addLast(Pair(x, y))

                        for (d in direct) {
                            val nx = x + d[0]
                            val ny = y + d[1]
                            if (nx in 0 until N && ny in 0 until N && grid[nx][ny] == 1) {
                                grid[nx][ny] = 2
                                q1.addLast(Pair(nx, ny))
                            }
                        }
                    }
                    break@outer
                }
            }
        }

        var res = 0
        while (q2.isNotEmpty()) {
            repeat(q2.size) {
                val (x, y) = q2.removeFirst()
                for (d in direct) {
                    val nx = x + d[0]
                    val ny = y + d[1]
                    if (nx in 0 until N && ny in 0 until N) {
                        if (grid[nx][ny] == 1) return res
                        if (grid[nx][ny] == 0) {
                            grid[nx][ny] = 2
                            q2.addLast(Pair(nx, ny))
                        }
                    }
                }
            }
            res++
        }
        return res
    }
}
```

```swift
class Solution {
    func shortestBridge(_ grid: [[Int]]) -> Int {
        var grid = grid
        let N = grid.count
        let direct = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        var q2 = [[Int]]()

        outerLoop: for r in 0..<N {
            for c in 0..<N {
                if grid[r][c] == 1 {
                    var q1 = [[r, c]]
                    grid[r][c] = 2

                    while !q1.isEmpty {
                        let cell = q1.removeFirst()
                        let x = cell[0], y = cell[1]
                        q2.append([x, y])

                        for d in direct {
                            let nx = x + d.0, ny = y + d.1
                            if nx >= 0 && ny >= 0 && nx < N && ny < N && grid[nx][ny] == 1 {
                                grid[nx][ny] = 2
                                q1.append([nx, ny])
                            }
                        }
                    }
                    break outerLoop
                }
            }
        }

        var res = 0
        while !q2.isEmpty {
            let size = q2.count
            for _ in 0..<size {
                let cell = q2.removeFirst()
                let x = cell[0], y = cell[1]

                for d in direct {
                    let nx = x + d.0, ny = y + d.1
                    if nx >= 0 && ny >= 0 && nx < N && ny < N {
                        if grid[nx][ny] == 1 {
                            return res
                        }
                        if grid[nx][ny] == 0 {
                            grid[nx][ny] = 2
                            q2.append([nx, ny])
                        }
                    }
                }
            }
            res += 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Disjoint Set Union + Breadth First Search

### Intuition

A Disjoint Set Union (DSU) data structure can identify connected components. By scanning the grid and unioning adjacent land cells, we naturally group cells into their respective islands.

Once we know which cells belong to the first island (tracked during the initial union phase), we start BFS from the boundary cells of that island. As we expand, we union newly visited cells with the first island. When a union operation connects to a cell that was already land (value 1) but in a different component, we have found the bridge.

### Algorithm

1. Initialize a `DSU` with `n * n + 1` elements.
2. Scan the grid, unioning adjacent land cells. Track the first island's root.
3. Identify boundary cells of the first island (cells adjacent to water) and add them to the `BFS` queue.
4. Perform `BFS`, expanding outward level by level:
   - For each cell, check all four neighbors.
   - If a neighbor is land and unioning returns `true` (different component), return the current distance.
   - If a neighbor is water, mark it as land, union with current cell, and add to queue.
5. Increment distance after each level.
6. Return the distance when the islands are connected.

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

```go
type DSU struct {
    parent []int
    rank   []int
}

func NewDSU(n int) *DSU {
    parent := make([]int, n)
    rank := make([]int, n)
    for i := 0; i < n; i++ {
        parent[i] = i
        rank[i] = 1
    }
    return &DSU{parent, rank}
}

func (d *DSU) Find(node int) int {
    if d.parent[node] != node {
        d.parent[node] = d.Find(d.parent[node])
    }
    return d.parent[node]
}

func (d *DSU) Union(u, v int) bool {
    pu, pv := d.Find(u), d.Find(v)
    if pu == pv {
        return false
    }
    if d.rank[pv] > d.rank[pu] {
        pu, pv = pv, pu
    }
    d.parent[pv] = pu
    d.rank[pu] += d.rank[pv]
    return true
}

func shortestBridge(grid [][]int) int {
    n := len(grid)
    direct := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
    dsu := NewDSU(n*n + 1)
    q := [][]int{}

    idx := func(r, c int) int {
        return r*n + c + 1
    }

    firstIsland := -1
    for r := 0; r < n; r++ {
        for c := 0; c < n; c++ {
            if grid[r][c] == 1 {
                firstIsland = dsu.Find(idx(r, c))
                if c+1 < n && grid[r][c+1] == 1 {
                    dsu.Union(idx(r, c), idx(r, c+1))
                }
                if r+1 < n && grid[r+1][c] == 1 {
                    dsu.Union(idx(r, c), idx(r+1, c))
                }
            }
        }
    }

    for r := 0; r < n; r++ {
        for c := 0; c < n; c++ {
            if grid[r][c] == 1 && dsu.Find(idx(r, c)) == firstIsland {
                for _, d := range direct {
                    nr, nc := r+d[0], c+d[1]
                    if nr >= 0 && nc >= 0 && nr < n && nc < n && grid[nr][nc] == 0 {
                        q = append(q, []int{r, c})
                        break
                    }
                }
            }
        }
    }

    res := 0
    for len(q) > 0 {
        size := len(q)
        for i := 0; i < size; i++ {
            r, c := q[0][0], q[0][1]
            q = q[1:]
            for _, d := range direct {
                nr, nc := r+d[0], c+d[1]
                if nr >= 0 && nc >= 0 && nr < n && nc < n {
                    if grid[nr][nc] == 1 && dsu.Union(idx(r, c), idx(nr, nc)) {
                        return res
                    }
                    if grid[nr][nc] == 0 {
                        grid[nr][nc] = 1
                        dsu.Union(idx(r, c), idx(nr, nc))
                        q = append(q, []int{nr, nc})
                    }
                }
            }
        }
        res++
    }
    return res
}
```

```kotlin
class DSU(n: Int) {
    private val parent = IntArray(n) { it }
    private val rank = IntArray(n) { 1 }

    fun find(node: Int): Int {
        if (parent[node] != node) {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    fun union(u: Int, v: Int): Boolean {
        var pu = find(u)
        var pv = find(v)
        if (pu == pv) return false
        if (rank[pv] > rank[pu]) {
            val temp = pu
            pu = pv
            pv = temp
        }
        parent[pv] = pu
        rank[pu] += rank[pv]
        return true
    }
}

class Solution {
    fun shortestBridge(grid: Array<IntArray>): Int {
        val n = grid.size
        val direct = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1), intArrayOf(1, 0), intArrayOf(-1, 0))
        val dsu = DSU(n * n + 1)
        val q = ArrayDeque<Pair<Int, Int>>()

        fun idx(r: Int, c: Int) = r * n + c + 1

        var firstIsland = -1
        for (r in 0 until n) {
            for (c in 0 until n) {
                if (grid[r][c] == 1) {
                    firstIsland = dsu.find(idx(r, c))
                    if (c + 1 < n && grid[r][c + 1] == 1) {
                        dsu.union(idx(r, c), idx(r, c + 1))
                    }
                    if (r + 1 < n && grid[r + 1][c] == 1) {
                        dsu.union(idx(r, c), idx(r + 1, c))
                    }
                }
            }
        }

        for (r in 0 until n) {
            for (c in 0 until n) {
                if (grid[r][c] == 1 && dsu.find(idx(r, c)) == firstIsland) {
                    for (d in direct) {
                        val nr = r + d[0]
                        val nc = c + d[1]
                        if (nr in 0 until n && nc in 0 until n && grid[nr][nc] == 0) {
                            q.addLast(Pair(r, c))
                            break
                        }
                    }
                }
            }
        }

        var res = 0
        while (q.isNotEmpty()) {
            repeat(q.size) {
                val (r, c) = q.removeFirst()
                for (d in direct) {
                    val nr = r + d[0]
                    val nc = c + d[1]
                    if (nr in 0 until n && nc in 0 until n) {
                        if (grid[nr][nc] == 1 && dsu.union(idx(r, c), idx(nr, nc))) {
                            return res
                        }
                        if (grid[nr][nc] == 0) {
                            grid[nr][nc] = 1
                            dsu.union(idx(r, c), idx(nr, nc))
                            q.addLast(Pair(nr, nc))
                        }
                    }
                }
            }
            res++
        }
        return res
    }
}
```

```swift
class DSU {
    private var parent: [Int]
    private var rank: [Int]

    init(_ n: Int) {
        parent = Array(0..<n)
        rank = [Int](repeating: 1, count: n)
    }

    func find(_ node: Int) -> Int {
        if parent[node] != node {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    func union(_ u: Int, _ v: Int) -> Bool {
        var pu = find(u)
        var pv = find(v)
        if pu == pv { return false }
        if rank[pv] > rank[pu] {
            swap(&pu, &pv)
        }
        parent[pv] = pu
        rank[pu] += rank[pv]
        return true
    }
}

class Solution {
    func shortestBridge(_ grid: [[Int]]) -> Int {
        var grid = grid
        let n = grid.count
        let direct = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        let dsu = DSU(n * n + 1)
        var q = [[Int]]()

        func idx(_ r: Int, _ c: Int) -> Int {
            return r * n + c + 1
        }

        var firstIsland = -1
        for r in 0..<n {
            for c in 0..<n {
                if grid[r][c] == 1 {
                    firstIsland = dsu.find(idx(r, c))
                    if c + 1 < n && grid[r][c + 1] == 1 {
                        _ = dsu.union(idx(r, c), idx(r, c + 1))
                    }
                    if r + 1 < n && grid[r + 1][c] == 1 {
                        _ = dsu.union(idx(r, c), idx(r + 1, c))
                    }
                }
            }
        }

        for r in 0..<n {
            for c in 0..<n {
                if grid[r][c] == 1 && dsu.find(idx(r, c)) == firstIsland {
                    for d in direct {
                        let nr = r + d.0, nc = c + d.1
                        if nr >= 0 && nc >= 0 && nr < n && nc < n && grid[nr][nc] == 0 {
                            q.append([r, c])
                            break
                        }
                    }
                }
            }
        }

        var res = 0
        while !q.isEmpty {
            let size = q.count
            for _ in 0..<size {
                let cell = q.removeFirst()
                let r = cell[0], c = cell[1]
                for d in direct {
                    let nr = r + d.0, nc = c + d.1
                    if nr >= 0 && nc >= 0 && nr < n && nc < n {
                        if grid[nr][nc] == 1 && dsu.union(idx(r, c), idx(nr, nc)) {
                            return res
                        }
                        if grid[nr][nc] == 0 {
                            grid[nr][nc] = 1
                            _ = dsu.union(idx(r, c), idx(nr, nc))
                            q.append([nr, nc])
                        }
                    }
                }
            }
            res += 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$
