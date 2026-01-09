## 1. Depth First Search

::tabs-start

```python
class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        visit = set()

        def dfs(i, j):
            if i < 0 or j < 0 or i >= rows or j >= cols or grid[i][j] == 0:
                return 1
            if (i, j) in visit:
                return 0

            visit.add((i, j))
            perim = dfs(i, j + 1) + dfs(i + 1, j) + dfs(i, j - 1) + dfs(i - 1, j)
            return perim

        for i in range(rows):
            for j in range(cols):
                if grid[i][j]:
                    return dfs(i, j)
        return 0
```

```java
public class Solution {
    private int[][] grid;
    private boolean[][] visited;
    private int rows, cols;

    public int islandPerimeter(int[][] grid) {
        this.grid = grid;
        this.rows = grid.length;
        this.cols = grid[0].length;
        this.visited = new boolean[rows][cols];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 1) {
                    return dfs(i, j);
                }
            }
        }
        return 0;
    }

    private int dfs(int i, int j) {
        if (i < 0 || j < 0 || i >= rows ||
            j >= cols || grid[i][j] == 0) {
            return 1;
        }
        if (visited[i][j]) {
            return 0;
        }

        visited[i][j] = true;
        return dfs(i, j + 1) + dfs(i + 1, j) +
               dfs(i, j - 1) + dfs(i - 1, j);
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> grid;
    vector<vector<bool>> visited;
    int rows, cols;

    int dfs(int i, int j) {
        if (i < 0 || j < 0 || i >= rows ||
            j >= cols || grid[i][j] == 0) {
            return 1;
        }
        if (visited[i][j]) {
            return 0;
        }

        visited[i][j] = true;
        return dfs(i, j + 1) + dfs(i + 1, j) +
               dfs(i, j - 1) + dfs(i - 1, j);
    }

public:
    int islandPerimeter(vector<vector<int>>& grid) {
        this->grid = grid;
        rows = grid.size();
        cols = grid[0].size();
        visited = vector<vector<bool>>(rows, vector<bool>(cols, false));

        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                if (grid[i][j] == 1) {
                    return dfs(i, j);
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
    islandPerimeter(grid) {
        const rows = grid.length,
            cols = grid[0].length;
        const visited = Array.from({ length: rows }, () =>
            Array(cols).fill(false),
        );

        const dfs = (i, j) => {
            if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] === 0) {
                return 1;
            }
            if (visited[i][j]) {
                return 0;
            }

            visited[i][j] = true;
            return (
                dfs(i, j + 1) + dfs(i + 1, j) + dfs(i, j - 1) + dfs(i - 1, j)
            );
        };

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j] === 1) {
                    return dfs(i, j);
                }
            }
        }
        return 0;
    }
}
```

```csharp
public class Solution {
    private int rows, cols;
    private HashSet<(int, int)> visit;

    public int IslandPerimeter(int[][] grid) {
        rows = grid.Length;
        cols = grid[0].Length;
        visit = new HashSet<(int, int)>();

        int Dfs(int i, int j) {
            if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] == 0) {
                return 1;
            }
            if (visit.Contains((i, j))) {
                return 0;
            }

            visit.Add((i, j));
            int perim = Dfs(i, j + 1) + Dfs(i + 1, j) + Dfs(i, j - 1) + Dfs(i - 1, j);
            return perim;
        }

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 1) {
                    return Dfs(i, j);
                }
            }
        }

        return 0;
    }
}
```

```go
func islandPerimeter(grid [][]int) int {
    rows, cols := len(grid), len(grid[0])
    visited := make(map[[2]int]bool)

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] == 0 {
            return 1
        }
        if visited[[2]int{i, j}] {
            return 0
        }

        visited[[2]int{i, j}] = true
        return dfs(i, j+1) + dfs(i+1, j) + dfs(i, j-1) + dfs(i-1, j)
    }

    for i := 0; i < rows; i++ {
        for j := 0; j < cols; j++ {
            if grid[i][j] == 1 {
                return dfs(i, j)
            }
        }
    }
    return 0
}
```

```kotlin
class Solution {
    private lateinit var grid: Array<IntArray>
    private lateinit var visited: Array<BooleanArray>
    private var rows = 0
    private var cols = 0

    fun islandPerimeter(grid: Array<IntArray>): Int {
        this.grid = grid
        rows = grid.size
        cols = grid[0].size
        visited = Array(rows) { BooleanArray(cols) }

        for (i in 0 until rows) {
            for (j in 0 until cols) {
                if (grid[i][j] == 1) {
                    return dfs(i, j)
                }
            }
        }
        return 0
    }

    private fun dfs(i: Int, j: Int): Int {
        if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] == 0) {
            return 1
        }
        if (visited[i][j]) {
            return 0
        }

        visited[i][j] = true
        return dfs(i, j + 1) + dfs(i + 1, j) + dfs(i, j - 1) + dfs(i - 1, j)
    }
}
```

```swift
class Solution {
    private var grid = [[Int]]()
    private var visited = [[Bool]]()
    private var rows = 0
    private var cols = 0

    func islandPerimeter(_ grid: [[Int]]) -> Int {
        self.grid = grid
        rows = grid.count
        cols = grid[0].count
        visited = [[Bool]](repeating: [Bool](repeating: false, count: cols), count: rows)

        for i in 0..<rows {
            for j in 0..<cols {
                if grid[i][j] == 1 {
                    return dfs(i, j)
                }
            }
        }
        return 0
    }

    private func dfs(_ i: Int, _ j: Int) -> Int {
        if i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] == 0 {
            return 1
        }
        if visited[i][j] {
            return 0
        }

        visited[i][j] = true
        return dfs(i, j + 1) + dfs(i + 1, j) + dfs(i, j - 1) + dfs(i - 1, j)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the grid.

---

## 2. Breadth First Search

::tabs-start

```python
class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        visited = set()
        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]

        def bfs(r, c):
            queue = deque([(r, c)])
            visited.add((r, c))
            perimeter = 0

            while queue:
                x, y = queue.popleft()
                for dx, dy in directions:
                    nx, ny = x + dx, y + dy
                    if (nx < 0 or ny < 0 or nx >= rows or
                        ny >= cols or grid[nx][ny] == 0
                    ):
                        perimeter += 1
                    elif (nx, ny) not in visited:
                        visited.add((nx, ny))
                        queue.append((nx, ny))
            return perimeter

        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == 1:
                    return bfs(i, j)
        return 0
```

```java
public class Solution {
    public int islandPerimeter(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        boolean[][] visited = new boolean[rows][cols];
        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 1) {
                    Queue<int[]> queue = new LinkedList<>();
                    queue.offer(new int[]{i, j});
                    visited[i][j] = true;
                    int perimeter = 0;

                    while (!queue.isEmpty()) {
                        int[] cell = queue.poll();
                        int x = cell[0], y = cell[1];

                        for (int[] dir : directions) {
                            int nx = x + dir[0], ny = y + dir[1];
                            if (nx < 0 || ny < 0 || nx >= rows ||
                                ny >= cols || grid[nx][ny] == 0) {
                                perimeter++;
                            } else if (!visited[nx][ny]) {
                                visited[nx][ny] = true;
                                queue.offer(new int[]{nx, ny});
                            }
                        }
                    }
                    return perimeter;
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
    int islandPerimeter(vector<vector<int>>& grid) {
        int rows = grid.size(), cols = grid[0].size();
        vector<vector<bool>> visited(rows, vector<bool>(cols, false));
        int directions[4][2] = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};

        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                if (grid[i][j] == 1) {
                    queue<pair<int, int>> q;
                    q.push({i, j});
                    visited[i][j] = true;
                    int perimeter = 0;

                    while (!q.empty()) {
                        auto [x, y] = q.front();
                        q.pop();

                        for (auto& dir : directions) {
                            int nx = x + dir[0], ny = y + dir[1];
                            if (nx < 0 || ny < 0 || nx >= rows ||
                                ny >= cols || grid[nx][ny] == 0) {
                                perimeter++;
                            } else if (!visited[nx][ny]) {
                                visited[nx][ny] = true;
                                q.push({nx, ny});
                            }
                        }
                    }
                    return perimeter;
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
    islandPerimeter(grid) {
        const rows = grid.length,
            cols = grid[0].length;
        const visited = Array.from({ length: rows }, () =>
            Array(cols).fill(false),
        );
        const directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ];

        const bfs = (r, c) => {
            const queue = new Queue([[r, c]]);
            visited[r][c] = true;
            let perimeter = 0;
            while (!queue.isEmpty()) {
                const [x, y] = queue.pop();

                for (const [dx, dy] of directions) {
                    const nx = x + dx,
                        ny = y + dy;

                    if (
                        nx < 0 ||
                        ny < 0 ||
                        nx >= rows ||
                        ny >= cols ||
                        grid[nx][ny] === 0
                    ) {
                        perimeter++;
                    } else if (!visited[nx][ny]) {
                        visited[nx][ny] = true;
                        queue.push([nx, ny]);
                    }
                }
            }
            return perimeter;
        };

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j] === 1) {
                    return bfs(i, j);
                }
            }
        }
        return 0;
    }
}
```

```csharp
public class Solution {
    public int IslandPerimeter(int[][] grid) {
        int rows = grid.Length;
        int cols = grid[0].Length;
        var visited = new HashSet<(int, int)>();
        int[][] directions = new int[][] {
            new int[] { 0, 1 },
            new int[] { 1, 0 },
            new int[] { 0, -1 },
            new int[] { -1, 0 }
        };

        int Bfs(int r, int c) {
            var queue = new Queue<(int, int)>();
            queue.Enqueue((r, c));
            visited.Add((r, c));
            int perimeter = 0;

            while (queue.Count > 0) {
                var (x, y) = queue.Dequeue();
                foreach (var dir in directions) {
                    int nx = x + dir[0];
                    int ny = y + dir[1];

                    if (nx < 0 || ny < 0 || nx >= rows || ny >= cols || grid[nx][ny] == 0) {
                        perimeter++;
                    } else if (!visited.Contains((nx, ny))) {
                        visited.Add((nx, ny));
                        queue.Enqueue((nx, ny));
                    }
                }
            }

            return perimeter;
        }

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 1) {
                    return Bfs(i, j);
                }
            }
        }

        return 0;
    }
}
```

```go
func islandPerimeter(grid [][]int) int {
    rows, cols := len(grid), len(grid[0])
    visited := make(map[[2]int]bool)
    directions := [][2]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}

    bfs := func(r, c int) int {
        queue := [][2]int{{r, c}}
        visited[[2]int{r, c}] = true
        perimeter := 0

        for len(queue) > 0 {
            cell := queue[0]
            queue = queue[1:]
            x, y := cell[0], cell[1]

            for _, dir := range directions {
                nx, ny := x+dir[0], y+dir[1]
                if nx < 0 || ny < 0 || nx >= rows || ny >= cols || grid[nx][ny] == 0 {
                    perimeter++
                } else if !visited[[2]int{nx, ny}] {
                    visited[[2]int{nx, ny}] = true
                    queue = append(queue, [2]int{nx, ny})
                }
            }
        }
        return perimeter
    }

    for i := 0; i < rows; i++ {
        for j := 0; j < cols; j++ {
            if grid[i][j] == 1 {
                return bfs(i, j)
            }
        }
    }
    return 0
}
```

```kotlin
class Solution {
    fun islandPerimeter(grid: Array<IntArray>): Int {
        val rows = grid.size
        val cols = grid[0].size
        val visited = HashSet<Pair<Int, Int>>()
        val directions = arrayOf(intArrayOf(0, 1), intArrayOf(1, 0), intArrayOf(0, -1), intArrayOf(-1, 0))

        fun bfs(r: Int, c: Int): Int {
            val queue: Queue<Pair<Int, Int>> = LinkedList()
            queue.offer(Pair(r, c))
            visited.add(Pair(r, c))
            var perimeter = 0

            while (queue.isNotEmpty()) {
                val (x, y) = queue.poll()
                for (dir in directions) {
                    val nx = x + dir[0]
                    val ny = y + dir[1]
                    if (nx < 0 || ny < 0 || nx >= rows || ny >= cols || grid[nx][ny] == 0) {
                        perimeter++
                    } else if (!visited.contains(Pair(nx, ny))) {
                        visited.add(Pair(nx, ny))
                        queue.offer(Pair(nx, ny))
                    }
                }
            }
            return perimeter
        }

        for (i in 0 until rows) {
            for (j in 0 until cols) {
                if (grid[i][j] == 1) {
                    return bfs(i, j)
                }
            }
        }
        return 0
    }
}
```

```swift
class Solution {
    func islandPerimeter(_ grid: [[Int]]) -> Int {
        let rows = grid.count
        let cols = grid[0].count
        var visited = Set<[Int]>()
        let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]

        func bfs(_ r: Int, _ c: Int) -> Int {
            var queue = [[r, c]]
            visited.insert([r, c])
            var perimeter = 0

            while !queue.isEmpty {
                let cell = queue.removeFirst()
                let x = cell[0], y = cell[1]

                for dir in directions {
                    let nx = x + dir[0], ny = y + dir[1]
                    if nx < 0 || ny < 0 || nx >= rows || ny >= cols || grid[nx][ny] == 0 {
                        perimeter += 1
                    } else if !visited.contains([nx, ny]) {
                        visited.insert([nx, ny])
                        queue.append([nx, ny])
                    }
                }
            }
            return perimeter
        }

        for i in 0..<rows {
            for j in 0..<cols {
                if grid[i][j] == 1 {
                    return bfs(i, j)
                }
            }
        }
        return 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the grid.

---

## 3. Iteration - I

::tabs-start

```python
class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        m, n, res = len(grid), len(grid[0]), 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    res += (i + 1 >= m or grid[i + 1][j] == 0)
                    res += (j + 1 >= n or grid[i][j + 1] == 0)
                    res += (i - 1 < 0 or grid[i - 1][j] == 0)
                    res += (j - 1 < 0 or grid[i][j - 1] == 0)
        return res
```

```java
public class Solution {
    public int islandPerimeter(int[][] grid) {
        int m = grid.length, n = grid[0].length, res = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    res += (i + 1 >= m || grid[i + 1][j] == 0) ? 1 : 0;
                    res += (j + 1 >= n || grid[i][j + 1] == 0) ? 1 : 0;
                    res += (i - 1 < 0 || grid[i - 1][j] == 0) ? 1 : 0;
                    res += (j - 1 < 0 || grid[i][j - 1] == 0) ? 1 : 0;
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
    int islandPerimeter(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size(), res = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    res += (i + 1 >= m || grid[i + 1][j] == 0) ? 1 : 0;
                    res += (j + 1 >= n || grid[i][j + 1] == 0) ? 1 : 0;
                    res += (i - 1 < 0 || grid[i - 1][j] == 0) ? 1 : 0;
                    res += (j - 1 < 0 || grid[i][j - 1] == 0) ? 1 : 0;
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
    islandPerimeter(grid) {
        const m = grid.length,
            n = grid[0].length;
        let res = 0;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === 1) {
                    res += i + 1 >= m || grid[i + 1][j] === 0 ? 1 : 0;
                    res += j + 1 >= n || grid[i][j + 1] === 0 ? 1 : 0;
                    res += i - 1 < 0 || grid[i - 1][j] === 0 ? 1 : 0;
                    res += j - 1 < 0 || grid[i][j - 1] === 0 ? 1 : 0;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int IslandPerimeter(int[][] grid) {
        int m = grid.Length;
        int n = grid[0].Length;
        int res = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    if (i + 1 >= m || grid[i + 1][j] == 0) res++;
                    if (j + 1 >= n || grid[i][j + 1] == 0) res++;
                    if (i - 1 < 0 || grid[i - 1][j] == 0) res++;
                    if (j - 1 < 0 || grid[i][j - 1] == 0) res++;
                }
            }
        }

        return res;
    }
}
```

```go
func islandPerimeter(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    res := 0
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == 1 {
                if i+1 >= m || grid[i+1][j] == 0 {
                    res++
                }
                if j+1 >= n || grid[i][j+1] == 0 {
                    res++
                }
                if i-1 < 0 || grid[i-1][j] == 0 {
                    res++
                }
                if j-1 < 0 || grid[i][j-1] == 0 {
                    res++
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun islandPerimeter(grid: Array<IntArray>): Int {
        val m = grid.size
        val n = grid[0].size
        var res = 0
        for (i in 0 until m) {
            for (j in 0 until n) {
                if (grid[i][j] == 1) {
                    if (i + 1 >= m || grid[i + 1][j] == 0) res++
                    if (j + 1 >= n || grid[i][j + 1] == 0) res++
                    if (i - 1 < 0 || grid[i - 1][j] == 0) res++
                    if (j - 1 < 0 || grid[i][j - 1] == 0) res++
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func islandPerimeter(_ grid: [[Int]]) -> Int {
        let m = grid.count, n = grid[0].count
        var res = 0
        for i in 0..<m {
            for j in 0..<n {
                if grid[i][j] == 1 {
                    if i + 1 >= m || grid[i + 1][j] == 0 { res += 1 }
                    if j + 1 >= n || grid[i][j + 1] == 0 { res += 1 }
                    if i - 1 < 0 || grid[i - 1][j] == 0 { res += 1 }
                    if j - 1 < 0 || grid[i][j - 1] == 0 { res += 1 }
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns in the grid.

---

## 4. Iteration - II

::tabs-start

```python
class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        res = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 1:
                    res += 4
                    if r and grid[r - 1][c]:
                        res -= 2
                    if c and grid[r][c - 1] == 1:
                        res -= 2
        return res
```

```java
public class Solution {
    public int islandPerimeter(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int res = 0;;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    res += 4;
                    if (r > 0 && grid[r - 1][c] == 1) {
                        res -= 2;
                    }
                    if (c > 0 && grid[r][c - 1] == 1) {
                        res -= 2;
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
    int islandPerimeter(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int res = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c]) {
                    res += 4;
                    if (r && grid[r - 1][c]) {
                        res -= 2;
                    }
                    if (c && grid[r][c - 1]) {
                        res -= 2;
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
    islandPerimeter(grid) {
        const m = grid.length,
            n = grid[0].length;
        let res = 0;
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    res += 4;
                    if (r > 0 && grid[r - 1][c] == 1) {
                        res -= 2;
                    }
                    if (c > 0 && grid[r][c - 1] == 1) {
                        res -= 2;
                    }
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int IslandPerimeter(int[][] grid) {
        int m = grid.Length;
        int n = grid[0].Length;
        int res = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    res += 4;
                    if (r > 0 && grid[r - 1][c] == 1) {
                        res -= 2;
                    }
                    if (c > 0 && grid[r][c - 1] == 1) {
                        res -= 2;
                    }
                }
            }
        }

        return res;
    }
}
```

```go
func islandPerimeter(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    res := 0
    for r := 0; r < m; r++ {
        for c := 0; c < n; c++ {
            if grid[r][c] == 1 {
                res += 4
                if r > 0 && grid[r-1][c] == 1 {
                    res -= 2
                }
                if c > 0 && grid[r][c-1] == 1 {
                    res -= 2
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun islandPerimeter(grid: Array<IntArray>): Int {
        val m = grid.size
        val n = grid[0].size
        var res = 0
        for (r in 0 until m) {
            for (c in 0 until n) {
                if (grid[r][c] == 1) {
                    res += 4
                    if (r > 0 && grid[r - 1][c] == 1) {
                        res -= 2
                    }
                    if (c > 0 && grid[r][c - 1] == 1) {
                        res -= 2
                    }
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func islandPerimeter(_ grid: [[Int]]) -> Int {
        let m = grid.count, n = grid[0].count
        var res = 0
        for r in 0..<m {
            for c in 0..<n {
                if grid[r][c] == 1 {
                    res += 4
                    if r > 0 && grid[r - 1][c] == 1 {
                        res -= 2
                    }
                    if c > 0 && grid[r][c - 1] == 1 {
                        res -= 2
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

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns in the grid.
