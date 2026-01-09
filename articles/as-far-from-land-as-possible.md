## 1. Brute Force (BFS)

::tabs-start

```python
class Solution:
    def maxDistance(self, grid: list[list[int]]) -> int:
        N = len(grid)
        direct = [[0, 1], [0, -1], [1, 0], [-1, 0]]

        def bfs(row, col):
            q = deque([(row, col)])
            visit = [[False] * N for _ in range(N)]
            dist, visit[row][col] = 0, True

            while q:
                dist += 1
                for _ in range(len(q)):
                    r, c = q.popleft()
                    for dx, dy in direct:
                        newR, newC = r + dx, c + dy
                        if min(newR, newC) < 0 or max(newR, newC) >= N or visit[newR][newC]:
                            continue
                        if grid[newR][newC] == 1:
                            return dist
                        visit[newR][newC] = True
                        q.append((newR, newC))
            return -1

        res = -1
        for r in range(N):
            for c in range(N):
                if grid[r][c] == 0:
                    res = max(res, bfs(r, c))
                    if res == -1:
                        return res

        return res
```

```java
public class Solution {
    private static final int[][] direct = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    public int maxDistance(int[][] grid) {
        int N = grid.length;
        int res = -1;

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 0) {
                    res = Math.max(res, bfs(grid, r, c, N));
                    if (res == -1) return res;
                }
            }
        }
        return res;
    }

    private int bfs(int[][] grid, int row, int col, int N) {
        Queue<int[]> q = new LinkedList<>();
        boolean[][] visit = new boolean[N][N];
        q.offer(new int[]{row, col});
        visit[row][col] = true;
        int dist = 0;

        while (!q.isEmpty()) {
            dist++;
            for (int i = q.size(); i > 0; i--) {
                int[] cell = q.poll();
                int r = cell[0], c = cell[1];

                for (int[] d : direct) {
                    int newR = r + d[0], newC = c + d[1];
                    if (newR < 0 || newC < 0 || newR >= N || newC >= N || visit[newR][newC])
                        continue;
                    if (grid[newR][newC] == 1)
                        return dist;

                    visit[newR][newC] = true;
                    q.offer(new int[]{newR, newC});
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
    int maxDistance(vector<vector<int>>& grid) {
        int N = grid.size();
        int res = -1;

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 0) {
                    res = max(res, bfs(grid, r, c, N));
                    if (res == -1) return res;
                }
            }
        }
        return res;
    }

private:
    const int direct[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    int bfs(vector<vector<int>>& grid, int row, int col, int N) {
        queue<pair<int, int>> q;
        vector<vector<bool>> visit(N, vector<bool>(N, false));
        q.push({row, col});
        visit[row][col] = true;
        int dist = 0;

        while (!q.empty()) {
            dist++;
            for (int i = q.size(); i > 0; i--) {
                auto [r, c] = q.front();q.pop();

                for (auto& d : direct) {
                    int newR = r + d[0], newC = c + d[1];
                    if (newR < 0 || newC < 0 || newR >= N || newC >= N || visit[newR][newC])
                        continue;
                    if (grid[newR][newC] == 1)
                        return dist;

                    visit[newR][newC] = true;
                    q.push({newR, newC});
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
    maxDistance(grid) {
        const N = grid.length;
        const direct = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];

        const bfs = (row, col) => {
            const q = new Queue([[row, col]]);
            const visit = Array.from({ length: N }, () => Array(N).fill(false));
            visit[row][col] = true;
            let dist = 0;

            while (!q.isEmpty()) {
                dist++;
                for (let i = q.size(); i > 0; i--) {
                    const [r, c] = q.pop();
                    for (let d = 0; d < 4; d++) {
                        let newR = r + direct[d][0],
                            newC = c + direct[d][1];
                        if (
                            newR < 0 ||
                            newC < 0 ||
                            newR >= N ||
                            newC >= N ||
                            visit[newR][newC]
                        )
                            continue;
                        if (grid[newR][newC] === 1) return dist;

                        visit[newR][newC] = true;
                        q.push([newR, newC]);
                    }
                }
            }
            return -1;
        };

        let res = -1;
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 0) {
                    res = Math.max(res, bfs(r, c));
                    if (res === -1) return res;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private static readonly int[][] direct = new int[][] {
        new int[]{0, 1}, new int[]{0, -1}, new int[]{1, 0}, new int[]{-1, 0}
    };

    public int MaxDistance(int[][] grid) {
        int N = grid.Length;
        int res = -1;

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 0) {
                    res = Math.Max(res, Bfs(grid, r, c, N));
                    if (res == -1) return res;
                }
            }
        }
        return res;
    }

    private int Bfs(int[][] grid, int row, int col, int N) {
        Queue<int[]> q = new Queue<int[]>();
        bool[,] visit = new bool[N, N];
        q.Enqueue(new int[]{row, col});
        visit[row, col] = true;
        int dist = 0;

        while (q.Count > 0) {
            dist++;
            for (int i = q.Count; i > 0; i--) {
                int[] cell = q.Dequeue();
                int r = cell[0], c = cell[1];

                foreach (int[] d in direct) {
                    int newR = r + d[0], newC = c + d[1];
                    if (newR < 0 || newC < 0 || newR >= N || newC >= N || visit[newR, newC])
                        continue;
                    if (grid[newR][newC] == 1)
                        return dist;

                    visit[newR, newC] = true;
                    q.Enqueue(new int[]{newR, newC});
                }
            }
        }
        return -1;
    }
}
```

```go
func maxDistance(grid [][]int) int {
    N := len(grid)
    direct := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

    bfs := func(row, col int) int {
        q := [][]int{{row, col}}
        visit := make([][]bool, N)
        for i := range visit {
            visit[i] = make([]bool, N)
        }
        visit[row][col] = true
        dist := 0

        for len(q) > 0 {
            dist++
            size := len(q)
            for i := 0; i < size; i++ {
                r, c := q[0][0], q[0][1]
                q = q[1:]

                for _, d := range direct {
                    newR, newC := r+d[0], c+d[1]
                    if newR < 0 || newC < 0 || newR >= N || newC >= N || visit[newR][newC] {
                        continue
                    }
                    if grid[newR][newC] == 1 {
                        return dist
                    }
                    visit[newR][newC] = true
                    q = append(q, []int{newR, newC})
                }
            }
        }
        return -1
    }

    res := -1
    for r := 0; r < N; r++ {
        for c := 0; c < N; c++ {
            if grid[r][c] == 0 {
                res = max(res, bfs(r, c))
                if res == -1 {
                    return res
                }
            }
        }
    }
    return res
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
    private val direct = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1), intArrayOf(1, 0), intArrayOf(-1, 0))

    fun maxDistance(grid: Array<IntArray>): Int {
        val N = grid.size
        var res = -1

        for (r in 0 until N) {
            for (c in 0 until N) {
                if (grid[r][c] == 0) {
                    res = maxOf(res, bfs(grid, r, c, N))
                    if (res == -1) return res
                }
            }
        }
        return res
    }

    private fun bfs(grid: Array<IntArray>, row: Int, col: Int, N: Int): Int {
        val q: java.util.Queue<IntArray> = java.util.LinkedList()
        val visit = Array(N) { BooleanArray(N) }
        q.offer(intArrayOf(row, col))
        visit[row][col] = true
        var dist = 0

        while (q.isNotEmpty()) {
            dist++
            for (i in q.size downTo 1) {
                val cell = q.poll()
                val r = cell[0]
                val c = cell[1]

                for (d in direct) {
                    val newR = r + d[0]
                    val newC = c + d[1]
                    if (newR < 0 || newC < 0 || newR >= N || newC >= N || visit[newR][newC])
                        continue
                    if (grid[newR][newC] == 1)
                        return dist

                    visit[newR][newC] = true
                    q.offer(intArrayOf(newR, newC))
                }
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func maxDistance(_ grid: [[Int]]) -> Int {
        let N = grid.count
        let direct = [[0, 1], [0, -1], [1, 0], [-1, 0]]

        func bfs(_ row: Int, _ col: Int) -> Int {
            var q = [[row, col]]
            var visit = [[Bool]](repeating: [Bool](repeating: false, count: N), count: N)
            visit[row][col] = true
            var dist = 0

            while !q.isEmpty {
                dist += 1
                let size = q.count
                for _ in 0..<size {
                    let cell = q.removeFirst()
                    let r = cell[0], c = cell[1]

                    for d in direct {
                        let newR = r + d[0], newC = c + d[1]
                        if newR < 0 || newC < 0 || newR >= N || newC >= N || visit[newR][newC] {
                            continue
                        }
                        if grid[newR][newC] == 1 {
                            return dist
                        }
                        visit[newR][newC] = true
                        q.append([newR, newC])
                    }
                }
            }
            return -1
        }

        var res = -1
        for r in 0..<N {
            for c in 0..<N {
                if grid[r][c] == 0 {
                    res = max(res, bfs(r, c))
                    if res == -1 {
                        return res
                    }
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 4)$
- Space complexity: $O(n ^ 2)$

---

## 2. Multi Source BFS (Overwriting Input)

::tabs-start

```python
class Solution:
    def maxDistance(self, grid: List[List[int]]) -> int:
        N = len(grid)
        q = deque()

        for r in range(N):
            for c in range(N):
                if grid[r][c]:
                    q.append([r, c])

        res = -1
        direct = [[0, 1], [1, 0], [0, -1], [-1, 0]]

        while q:
            r, c = q.popleft()
            res = grid[r][c]

            for dr, dc in direct:
                newR, newC = r + dr, c + dc
                if min(newR, newC) >= 0 and max(newR, newC) < N and grid[newR][newC] == 0:
                    q.append([newR, newC])
                    grid[newR][newC] = grid[r][c] + 1

        return res - 1 if res > 1 else -1
```

```java
public class Solution {
    private static final int[][] direct = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    public int maxDistance(int[][] grid) {
        int N = grid.length;
        Queue<int[]> q = new LinkedList<>();
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.offer(new int[]{r, c});
                }
            }
        }

        int res = -1;
        while (!q.isEmpty()) {
            int[] cell = q.poll();
            int r = cell[0], c = cell[1];
            res = grid[r][c];
            for (int d = 0; d < 4; d++) {
                int newR = r + direct[d][0], newC = c + direct[d][1];
                if (newR >= 0 && newC >= 0 && newR < N && newC < N && grid[newR][newC] == 0) {
                    q.offer(new int[]{newR, newC});
                    grid[newR][newC] = grid[r][c] + 1;
                }
            }
        }
        return res > 1 ? res - 1 : -1;
    }
}
```

```cpp
class Solution {
    const int direct[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

public:
    int maxDistance(vector<vector<int>>& grid) {
        int N = grid.size();
        queue<pair<int, int>> q;
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.push({r, c});
                }
            }
        }

        int res = -1;
        while (!q.empty()) {
            auto [r, c] = q.front();q.pop();
            res = grid[r][c];
            for (int d = 0; d < 4; d++) {
                int newR = r + direct[d][0], newC = c + direct[d][1];
                if (newR >= 0 && newC >= 0 && newR < N && newC < N && grid[newR][newC] == 0) {
                    q.push({newR, newC});
                    grid[newR][newC] = grid[r][c] + 1;
                }
            }
        }
        return res > 1 ? res - 1 : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maxDistance(grid) {
        const N = grid.length;
        const q = new Queue();
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 1) {
                    q.push([r, c]);
                }
            }
        }

        let res = -1;
        const direct = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
        while (!q.isEmpty()) {
            const [r, c] = q.pop();
            res = grid[r][c];
            for (let d = 0; d < 4; d++) {
                let newR = r + direct[d][0],
                    newC = c + direct[d][1];
                if (
                    newR >= 0 &&
                    newC >= 0 &&
                    newR < N &&
                    newC < N &&
                    grid[newR][newC] === 0
                ) {
                    q.push([newR, newC]);
                    grid[newR][newC] = grid[r][c] + 1;
                }
            }
        }
        return res > 1 ? res - 1 : -1;
    }
}
```

```csharp
public class Solution {
    private static readonly int[][] direct = new int[][] {
        new int[]{0, 1}, new int[]{0, -1}, new int[]{1, 0}, new int[]{-1, 0}
    };

    public int MaxDistance(int[][] grid) {
        int N = grid.Length;
        Queue<int[]> q = new Queue<int[]>();
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.Enqueue(new int[]{r, c});
                }
            }
        }

        int res = -1;
        while (q.Count > 0) {
            int[] cell = q.Dequeue();
            int row = cell[0], col = cell[1];
            res = grid[row][col];
            for (int d = 0; d < 4; d++) {
                int newR = row + direct[d][0], newC = col + direct[d][1];
                if (newR >= 0 && newC >= 0 && newR < N && newC < N && grid[newR][newC] == 0) {
                    q.Enqueue(new int[]{newR, newC});
                    grid[newR][newC] = grid[row][col] + 1;
                }
            }
        }
        return res > 1 ? res - 1 : -1;
    }
}
```

```go
func maxDistance(grid [][]int) int {
    N := len(grid)
    direct := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
    q := [][]int{}

    for r := 0; r < N; r++ {
        for c := 0; c < N; c++ {
            if grid[r][c] == 1 {
                q = append(q, []int{r, c})
            }
        }
    }

    res := -1
    for len(q) > 0 {
        cell := q[0]
        q = q[1:]
        r, c := cell[0], cell[1]
        res = grid[r][c]
        for d := 0; d < 4; d++ {
            newR, newC := r+direct[d][0], c+direct[d][1]
            if newR >= 0 && newC >= 0 && newR < N && newC < N && grid[newR][newC] == 0 {
                q = append(q, []int{newR, newC})
                grid[newR][newC] = grid[r][c] + 1
            }
        }
    }
    if res > 1 {
        return res - 1
    }
    return -1
}
```

```kotlin
class Solution {
    private val direct = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1), intArrayOf(1, 0), intArrayOf(-1, 0))

    fun maxDistance(grid: Array<IntArray>): Int {
        val N = grid.size
        val q: java.util.Queue<IntArray> = java.util.LinkedList()
        for (r in 0 until N) {
            for (c in 0 until N) {
                if (grid[r][c] == 1) {
                    q.offer(intArrayOf(r, c))
                }
            }
        }

        var res = -1
        while (q.isNotEmpty()) {
            val cell = q.poll()
            val r = cell[0]
            val c = cell[1]
            res = grid[r][c]
            for (d in direct) {
                val newR = r + d[0]
                val newC = c + d[1]
                if (newR >= 0 && newC >= 0 && newR < N && newC < N && grid[newR][newC] == 0) {
                    q.offer(intArrayOf(newR, newC))
                    grid[newR][newC] = grid[r][c] + 1
                }
            }
        }
        return if (res > 1) res - 1 else -1
    }
}
```

```swift
class Solution {
    func maxDistance(_ grid: [[Int]]) -> Int {
        var grid = grid
        let N = grid.count
        let direct = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        var q = [[Int]]()

        for r in 0..<N {
            for c in 0..<N {
                if grid[r][c] == 1 {
                    q.append([r, c])
                }
            }
        }

        var res = -1
        while !q.isEmpty {
            let cell = q.removeFirst()
            let r = cell[0], c = cell[1]
            res = grid[r][c]
            for d in 0..<4 {
                let newR = r + direct[d][0], newC = c + direct[d][1]
                if newR >= 0 && newC >= 0 && newR < N && newC < N && grid[newR][newC] == 0 {
                    q.append([newR, newC])
                    grid[newR][newC] = grid[r][c] + 1
                }
            }
        }
        return res > 1 ? res - 1 : -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Multi Source BFS

::tabs-start

```python
class Solution:
    def maxDistance(self, grid: List[List[int]]) -> int:
        N = len(grid)
        direct = [0, 1, 0, -1, 0]
        visit = [[False] * N for _ in range(N)]
        q = deque()

        for r in range(N):
            for c in range(N):
                if grid[r][c] == 1:
                    visit[r][c] = True
                    q.append((r, c))

        res = 0
        while q:
            res += 1
            for _ in range(len(q)):
                r, c = q.popleft()
                for d in range(4):
                    newR, newC = r + direct[d], c + direct[d + 1]
                    if 0 <= newR < N and 0 <= newC < N and not visit[newR][newC]:
                        q.append((newR, newC))
                        visit[newR][newC] = True

        return res - 1 if res > 1 else -1
```

```java
public class Solution {
    public int maxDistance(int[][] grid) {
        int N = grid.length;
        int[] direct = {0, 1, 0, -1, 0};
        boolean[][] visit = new boolean[N][N];
        Queue<int[]> q = new LinkedList<>();
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    visit[r][c] = true;
                    q.offer(new int[]{r, c});
                }
            }
        }

        int res = 0;
        while (!q.isEmpty()) {
            res++;
            for (int i = q.size(); i > 0; i--) {
                int[] cur = q.poll();
                int r = cur[0], c = cur[1];
                for (int d = 0; d < 4; d++) {
                    int newR = r + direct[d], newC = c + direct[d + 1];
                    if (newR >= 0 && newC >= 0 && newR < N && newC < N && !visit[newR][newC]) {
                        q.offer(new int[]{newR, newC});
                        visit[newR][newC] = true;
                    }
                }
            }
        }
        return res > 1 ? res - 1 : -1;
    }
}
```

```cpp
class Solution {
public:
    int maxDistance(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<int> direct = {0, 1, 0, -1, 0};
        vector<vector<bool>> visit(N, vector<bool>(N, false));
        queue<pair<int, int>> q;
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    visit[r][c] = true;
                    q.push({r, c});
                }
            }
        }

        int res = 0;
        while (!q.empty()) {
            res++;
            for (int i = q.size(); i > 0; i--) {
                auto [r, c] = q.front();q.pop();
                for (int d = 0; d < 4; d++) {
                    int newR = r + direct[d], newC = c + direct[d + 1];
                    if (newR >= 0 && newC >= 0 && newR < N && newC < N && !visit[newR][newC]) {
                        q.push({newR, newC});
                        visit[newR][newC] = true;
                    }
                }
            }
        }
        return res > 1 ? res - 1 : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maxDistance(grid) {
        const N = grid.length;
        const direct = [0, 1, 0, -1, 0];
        const visit = Array.from({ length: N }, () => Array(N).fill(false));
        const q = new Queue();
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 1) {
                    visit[r][c] = true;
                    q.push([r, c]);
                }
            }
        }

        let res = 0;
        while (!q.isEmpty()) {
            res++;
            for (let i = q.size(); i > 0; i--) {
                const [r, c] = q.pop();
                for (let d = 0; d < 4; d++) {
                    let newR = r + direct[d],
                        newC = c + direct[d + 1];
                    if (
                        newR >= 0 &&
                        newC >= 0 &&
                        newR < N &&
                        newC < N &&
                        !visit[newR][newC]
                    ) {
                        q.push([newR, newC]);
                        visit[newR][newC] = true;
                    }
                }
            }
        }
        return res > 1 ? res - 1 : -1;
    }
}
```

```csharp
public class Solution {
    public int MaxDistance(int[][] grid) {
        int N = grid.Length;
        int[] direct = {0, 1, 0, -1, 0};
        bool[,] visit = new bool[N, N];
        Queue<int[]> q = new Queue<int[]>();
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    visit[r, c] = true;
                    q.Enqueue(new int[]{r, c});
                }
            }
        }

        int res = 0;
        while (q.Count > 0) {
            res++;
            for (int i = q.Count; i > 0; i--) {
                int[] cur = q.Dequeue();
                int row = cur[0], col = cur[1];
                for (int d = 0; d < 4; d++) {
                    int newR = row + direct[d], newC = col + direct[d + 1];
                    if (newR >= 0 && newC >= 0 && newR < N && newC < N && !visit[newR, newC]) {
                        q.Enqueue(new int[]{newR, newC});
                        visit[newR, newC] = true;
                    }
                }
            }
        }
        return res > 1 ? res - 1 : -1;
    }
}
```

```go
func maxDistance(grid [][]int) int {
    N := len(grid)
    direct := []int{0, 1, 0, -1, 0}
    visit := make([][]bool, N)
    for i := range visit {
        visit[i] = make([]bool, N)
    }
    q := [][]int{}

    for r := 0; r < N; r++ {
        for c := 0; c < N; c++ {
            if grid[r][c] == 1 {
                visit[r][c] = true
                q = append(q, []int{r, c})
            }
        }
    }

    res := 0
    for len(q) > 0 {
        res++
        size := len(q)
        for i := 0; i < size; i++ {
            r, c := q[0][0], q[0][1]
            q = q[1:]
            for d := 0; d < 4; d++ {
                newR, newC := r+direct[d], c+direct[d+1]
                if newR >= 0 && newC >= 0 && newR < N && newC < N && !visit[newR][newC] {
                    q = append(q, []int{newR, newC})
                    visit[newR][newC] = true
                }
            }
        }
    }
    if res > 1 {
        return res - 1
    }
    return -1
}
```

```kotlin
class Solution {
    fun maxDistance(grid: Array<IntArray>): Int {
        val N = grid.size
        val direct = intArrayOf(0, 1, 0, -1, 0)
        val visit = Array(N) { BooleanArray(N) }
        val q: java.util.Queue<IntArray> = java.util.LinkedList()
        for (r in 0 until N) {
            for (c in 0 until N) {
                if (grid[r][c] == 1) {
                    visit[r][c] = true
                    q.offer(intArrayOf(r, c))
                }
            }
        }

        var res = 0
        while (q.isNotEmpty()) {
            res++
            for (i in q.size downTo 1) {
                val cur = q.poll()
                val row = cur[0]
                val col = cur[1]
                for (d in 0 until 4) {
                    val newR = row + direct[d]
                    val newC = col + direct[d + 1]
                    if (newR >= 0 && newC >= 0 && newR < N && newC < N && !visit[newR][newC]) {
                        q.offer(intArrayOf(newR, newC))
                        visit[newR][newC] = true
                    }
                }
            }
        }
        return if (res > 1) res - 1 else -1
    }
}
```

```swift
class Solution {
    func maxDistance(_ grid: [[Int]]) -> Int {
        let N = grid.count
        let direct = [0, 1, 0, -1, 0]
        var visit = [[Bool]](repeating: [Bool](repeating: false, count: N), count: N)
        var q = [[Int]]()

        for r in 0..<N {
            for c in 0..<N {
                if grid[r][c] == 1 {
                    visit[r][c] = true
                    q.append([r, c])
                }
            }
        }

        var res = 0
        while !q.isEmpty {
            res += 1
            let size = q.count
            for _ in 0..<size {
                let cur = q.removeFirst()
                let row = cur[0], col = cur[1]
                for d in 0..<4 {
                    let newR = row + direct[d], newC = col + direct[d + 1]
                    if newR >= 0 && newC >= 0 && newR < N && newC < N && !visit[newR][newC] {
                        q.append([newR, newC])
                        visit[newR][newC] = true
                    }
                }
            }
        }
        return res > 1 ? res - 1 : -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Overwrting the Input)

::tabs-start

```python
class Solution:
    def maxDistance(self, grid: List[List[int]]) -> int:
        N, INF = len(grid), 10**6

        for r in range(N):
            for c in range(N):
                if grid[r][c] == 1:
                    continue
                grid[r][c] = INF
                if r > 0:
                    grid[r][c] = min(grid[r][c], grid[r - 1][c] + 1)
                if c > 0:
                    grid[r][c] = min(grid[r][c], grid[r][c - 1] + 1)

        res = 0
        for r in range(N - 1, -1, -1):
            for c in range(N - 1, -1, -1):
                if grid[r][c] == 1:
                    continue
                if r < N - 1:
                    grid[r][c] = min(grid[r][c], grid[r + 1][c] + 1)
                if c < N - 1:
                    grid[r][c] = min(grid[r][c], grid[r][c + 1] + 1)
                res = max(res, grid[r][c])

        return res - 1 if res < INF else -1
```

```java
public class Solution {
    public int maxDistance(int[][] grid) {
        int N = grid.length, INF = 1000000;

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) continue;
                grid[r][c] = INF;
                if (r > 0) grid[r][c] = Math.min(grid[r][c], grid[r - 1][c] + 1);
                if (c > 0) grid[r][c] = Math.min(grid[r][c], grid[r][c - 1] + 1);
            }
        }

        int res = 0;
        for (int r = N - 1; r >= 0; r--) {
            for (int c = N - 1; c >= 0; c--) {
                if (grid[r][c] == 1) continue;
                if (r < N - 1) grid[r][c] = Math.min(grid[r][c], grid[r + 1][c] + 1);
                if (c < N - 1) grid[r][c] = Math.min(grid[r][c], grid[r][c + 1] + 1);
                res = Math.max(res, grid[r][c]);
            }
        }

        return res < INF ? res - 1 : -1;
    }
}
```

```cpp
class Solution {
public:
    int maxDistance(vector<vector<int>>& grid) {
        int N = grid.size(), INF = 1000000;

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) continue;
                grid[r][c] = INF;
                if (r > 0) grid[r][c] = min(grid[r][c], grid[r - 1][c] + 1);
                if (c > 0) grid[r][c] = min(grid[r][c], grid[r][c - 1] + 1);
            }
        }

        int res = 0;
        for (int r = N - 1; r >= 0; r--) {
            for (int c = N - 1; c >= 0; c--) {
                if (grid[r][c] == 1) continue;
                if (r < N - 1) grid[r][c] = min(grid[r][c], grid[r + 1][c] + 1);
                if (c < N - 1) grid[r][c] = min(grid[r][c], grid[r][c + 1] + 1);
                res = max(res, grid[r][c]);
            }
        }

        return res < INF ? res - 1 : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maxDistance(grid) {
        const N = grid.length,
            INF = 1000000;

        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 1) continue;
                grid[r][c] = INF;
                if (r > 0)
                    grid[r][c] = Math.min(grid[r][c], grid[r - 1][c] + 1);
                if (c > 0)
                    grid[r][c] = Math.min(grid[r][c], grid[r][c - 1] + 1);
            }
        }

        let res = 0;
        for (let r = N - 1; r >= 0; r--) {
            for (let c = N - 1; c >= 0; c--) {
                if (grid[r][c] === 1) continue;
                if (r < N - 1)
                    grid[r][c] = Math.min(grid[r][c], grid[r + 1][c] + 1);
                if (c < N - 1)
                    grid[r][c] = Math.min(grid[r][c], grid[r][c + 1] + 1);
                res = Math.max(res, grid[r][c]);
            }
        }

        return res < INF ? res - 1 : -1;
    }
}
```

```csharp
public class Solution {
    public int MaxDistance(int[][] grid) {
        int N = grid.Length, INF = 1000000;

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) continue;
                grid[r][c] = INF;
                if (r > 0) grid[r][c] = Math.Min(grid[r][c], grid[r - 1][c] + 1);
                if (c > 0) grid[r][c] = Math.Min(grid[r][c], grid[r][c - 1] + 1);
            }
        }

        int res = 0;
        for (int r = N - 1; r >= 0; r--) {
            for (int c = N - 1; c >= 0; c--) {
                if (grid[r][c] == 1) continue;
                if (r < N - 1) grid[r][c] = Math.Min(grid[r][c], grid[r + 1][c] + 1);
                if (c < N - 1) grid[r][c] = Math.Min(grid[r][c], grid[r][c + 1] + 1);
                res = Math.Max(res, grid[r][c]);
            }
        }

        return res < INF ? res - 1 : -1;
    }
}
```

```go
func maxDistance(grid [][]int) int {
    N := len(grid)
    INF := 1000000

    for r := 0; r < N; r++ {
        for c := 0; c < N; c++ {
            if grid[r][c] == 1 {
                continue
            }
            grid[r][c] = INF
            if r > 0 && grid[r-1][c]+1 < grid[r][c] {
                grid[r][c] = grid[r-1][c] + 1
            }
            if c > 0 && grid[r][c-1]+1 < grid[r][c] {
                grid[r][c] = grid[r][c-1] + 1
            }
        }
    }

    res := 0
    for r := N - 1; r >= 0; r-- {
        for c := N - 1; c >= 0; c-- {
            if grid[r][c] == 1 {
                continue
            }
            if r < N-1 && grid[r+1][c]+1 < grid[r][c] {
                grid[r][c] = grid[r+1][c] + 1
            }
            if c < N-1 && grid[r][c+1]+1 < grid[r][c] {
                grid[r][c] = grid[r][c+1] + 1
            }
            if grid[r][c] > res {
                res = grid[r][c]
            }
        }
    }

    if res < INF {
        return res - 1
    }
    return -1
}
```

```kotlin
class Solution {
    fun maxDistance(grid: Array<IntArray>): Int {
        val N = grid.size
        val INF = 1000000

        for (r in 0 until N) {
            for (c in 0 until N) {
                if (grid[r][c] == 1) continue
                grid[r][c] = INF
                if (r > 0) grid[r][c] = minOf(grid[r][c], grid[r - 1][c] + 1)
                if (c > 0) grid[r][c] = minOf(grid[r][c], grid[r][c - 1] + 1)
            }
        }

        var res = 0
        for (r in N - 1 downTo 0) {
            for (c in N - 1 downTo 0) {
                if (grid[r][c] == 1) continue
                if (r < N - 1) grid[r][c] = minOf(grid[r][c], grid[r + 1][c] + 1)
                if (c < N - 1) grid[r][c] = minOf(grid[r][c], grid[r][c + 1] + 1)
                res = maxOf(res, grid[r][c])
            }
        }

        return if (res < INF) res - 1 else -1
    }
}
```

```swift
class Solution {
    func maxDistance(_ grid: [[Int]]) -> Int {
        var grid = grid
        let N = grid.count
        let INF = 1000000

        for r in 0..<N {
            for c in 0..<N {
                if grid[r][c] == 1 { continue }
                grid[r][c] = INF
                if r > 0 { grid[r][c] = min(grid[r][c], grid[r - 1][c] + 1) }
                if c > 0 { grid[r][c] = min(grid[r][c], grid[r][c - 1] + 1) }
            }
        }

        var res = 0
        for r in stride(from: N - 1, through: 0, by: -1) {
            for c in stride(from: N - 1, through: 0, by: -1) {
                if grid[r][c] == 1 { continue }
                if r < N - 1 { grid[r][c] = min(grid[r][c], grid[r + 1][c] + 1) }
                if c < N - 1 { grid[r][c] = min(grid[r][c], grid[r][c + 1] + 1) }
                res = max(res, grid[r][c])
            }
        }

        return res < INF ? res - 1 : -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 5. Dynamic Programming

::tabs-start

```python
class Solution:
    def maxDistance(self, grid: List[List[int]]) -> int:
        N = len(grid)
        res, INF = -1, 10**6
        dp = [[INF] * (N + 2) for _ in range(N + 2)]

        for r in range(1, N + 1):
            for c in range(1, N + 1):
                if grid[r - 1][c - 1] == 1:
                    dp[r][c] = 0
                else:
                    dp[r][c] = min(dp[r - 1][c], dp[r][c - 1]) + 1

        for r in range(N, 0, -1):
            for c in range(N, 0, -1):
                if grid[r - 1][c - 1] == 0:
                    dp[r][c] = min(dp[r][c], min(dp[r + 1][c], dp[r][c + 1]) + 1)
                    res = max(res, dp[r][c])

        return res if res < INF else -1
```

```java
public class Solution {
    public int maxDistance(int[][] grid) {
        int N = grid.length;
        int INF = 1000000;
        int[][] dp = new int[N + 2][N + 2];
        for (int[] row : dp) {
            Arrays.fill(row, INF);
        }

        for (int r = 1; r <= N; r++) {
            for (int c = 1; c <= N; c++) {
                if (grid[r - 1][c - 1] == 1) {
                    dp[r][c] = 0;
                } else {
                    dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + 1;
                }
            }
        }

        int res = -1;
        for (int r = N; r > 0; r--) {
            for (int c = N; c > 0; c--) {
                if (grid[r - 1][c - 1] == 0) {
                    dp[r][c] = Math.min(dp[r][c], Math.min(dp[r + 1][c], dp[r][c + 1]) + 1);
                    res = Math.max(res, dp[r][c]);
                }
            }
        }
        return res < INF ? res : -1;
    }
}
```

```cpp
class Solution {
public:
    int maxDistance(vector<vector<int>>& grid) {
        int N = grid.size();
        int INF = 1000000, res = -1;
        vector<vector<int>> dp(N + 2, vector<int>(N + 2, INF));

        for (int r = 1; r <= N; r++) {
            for (int c = 1; c <= N; c++) {
                if (grid[r - 1][c - 1] == 1) {
                    dp[r][c] = 0;
                } else {
                    dp[r][c] = min(dp[r - 1][c], dp[r][c - 1]) + 1;
                }
            }
        }

        for (int r = N; r > 0; r--) {
            for (int c = N; c > 0; c--) {
                if (grid[r - 1][c - 1] == 0) {
                    dp[r][c] = min(dp[r][c], min(dp[r + 1][c], dp[r][c + 1]) + 1);
                    res = max(res, dp[r][c]);
                }
            }
        }
        return res < INF ? res : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maxDistance(grid) {
        const N = grid.length;
        const INF = 1000000;
        let res = -1;
        let dp = Array.from({ length: N + 2 }, () => Array(N + 2).fill(INF));

        for (let r = 1; r <= N; r++) {
            for (let c = 1; c <= N; c++) {
                if (grid[r - 1][c - 1] === 1) {
                    dp[r][c] = 0;
                } else {
                    dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + 1;
                }
            }
        }

        for (let r = N; r > 0; r--) {
            for (let c = N; c > 0; c--) {
                if (grid[r - 1][c - 1] === 0) {
                    dp[r][c] = Math.min(
                        dp[r][c],
                        Math.min(dp[r + 1][c], dp[r][c + 1]) + 1,
                    );
                    res = Math.max(res, dp[r][c]);
                }
            }
        }
        return res < INF ? res : -1;
    }
}
```

```csharp
public class Solution {
    public int MaxDistance(int[][] grid) {
        int N = grid.Length;
        int INF = 1000000;
        int[,] dp = new int[N + 2, N + 2];
        for (int i = 0; i < N + 2; i++) {
            for (int j = 0; j < N + 2; j++) {
                dp[i, j] = INF;
            }
        }

        for (int r = 1; r <= N; r++) {
            for (int c = 1; c <= N; c++) {
                if (grid[r - 1][c - 1] == 1) {
                    dp[r, c] = 0;
                } else {
                    dp[r, c] = Math.Min(dp[r - 1, c], dp[r, c - 1]) + 1;
                }
            }
        }

        int res = -1;
        for (int r = N; r > 0; r--) {
            for (int c = N; c > 0; c--) {
                if (grid[r - 1][c - 1] == 0) {
                    dp[r, c] = Math.Min(dp[r, c], Math.Min(dp[r + 1, c], dp[r, c + 1]) + 1);
                    res = Math.Max(res, dp[r, c]);
                }
            }
        }
        return res < INF ? res : -1;
    }
}
```

```go
func maxDistance(grid [][]int) int {
    N := len(grid)
    INF := 1000000
    dp := make([][]int, N+2)
    for i := range dp {
        dp[i] = make([]int, N+2)
        for j := range dp[i] {
            dp[i][j] = INF
        }
    }

    for r := 1; r <= N; r++ {
        for c := 1; c <= N; c++ {
            if grid[r-1][c-1] == 1 {
                dp[r][c] = 0
            } else {
                dp[r][c] = min(dp[r-1][c], dp[r][c-1]) + 1
            }
        }
    }

    res := -1
    for r := N; r > 0; r-- {
        for c := N; c > 0; c-- {
            if grid[r-1][c-1] == 0 {
                dp[r][c] = min(dp[r][c], min(dp[r+1][c], dp[r][c+1])+1)
                if dp[r][c] > res {
                    res = dp[r][c]
                }
            }
        }
    }
    if res < INF {
        return res
    }
    return -1
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxDistance(grid: Array<IntArray>): Int {
        val N = grid.size
        val INF = 1000000
        val dp = Array(N + 2) { IntArray(N + 2) { INF } }

        for (r in 1..N) {
            for (c in 1..N) {
                if (grid[r - 1][c - 1] == 1) {
                    dp[r][c] = 0
                } else {
                    dp[r][c] = minOf(dp[r - 1][c], dp[r][c - 1]) + 1
                }
            }
        }

        var res = -1
        for (r in N downTo 1) {
            for (c in N downTo 1) {
                if (grid[r - 1][c - 1] == 0) {
                    dp[r][c] = minOf(dp[r][c], minOf(dp[r + 1][c], dp[r][c + 1]) + 1)
                    res = maxOf(res, dp[r][c])
                }
            }
        }
        return if (res < INF) res else -1
    }
}
```

```swift
class Solution {
    func maxDistance(_ grid: [[Int]]) -> Int {
        let N = grid.count
        let INF = 1000000
        var dp = [[Int]](repeating: [Int](repeating: INF, count: N + 2), count: N + 2)

        for r in 1...N {
            for c in 1...N {
                if grid[r - 1][c - 1] == 1 {
                    dp[r][c] = 0
                } else {
                    dp[r][c] = min(dp[r - 1][c], dp[r][c - 1]) + 1
                }
            }
        }

        var res = -1
        for r in stride(from: N, through: 1, by: -1) {
            for c in stride(from: N, through: 1, by: -1) {
                if grid[r - 1][c - 1] == 0 {
                    dp[r][c] = min(dp[r][c], min(dp[r + 1][c], dp[r][c + 1]) + 1)
                    res = max(res, dp[r][c])
                }
            }
        }
        return res < INF ? res : -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$
