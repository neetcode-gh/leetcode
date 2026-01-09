## 1. Depth First Search

::tabs-start

```python
class Solution:
    def dfs(self, m, n, maze, curr, destination, visit):
        if visit[curr[0]][curr[1]]:
            return False
        if curr[0] == destination[0] and curr[1] == destination[1]:
            return True

        visit[curr[0]][curr[1]] = True
        dirX = [0, 1, 0, -1]
        dirY = [-1, 0, 1, 0]

        for i in range(4):
            r = curr[0]
            c = curr[1]
            # Move the ball in the chosen direction until it can.
            while r >= 0 and r < m and c >= 0 and c < n and maze[r][c] == 0:
                r += dirX[i]
                c += dirY[i]
            # Revert the last move to get the cell to which the ball rolls.
            if self.dfs(m, n, maze, [r - dirX[i], c - dirY[i]], destination, visit):
                return True
        return False

    def hasPath(self, maze: List[List[int]], start: List[int], destination: List[int]) -> bool:
        m = len(maze)
        n = len(maze[0])
        visit = [[False] * n for _ in range(m)]
        return self.dfs(m, n, maze, start, destination, visit)
```

```java
class Solution {
    public boolean dfs(int m, int n, int[][] maze, int[] curr, int[] destination,
                boolean[][] visit) {
                    
        if (visit[curr[0]][curr[1]]) {
            return false;
        }

        if (curr[0] == destination[0] && curr[1] == destination[1]) {
            return true;
        }

        visit[curr[0]][curr[1]] = true;
        int[] dirX = {0, 1, 0, -1};
        int[] dirY = {-1, 0, 1, 0};

        for (int i = 0; i < 4; i++) {
            int r = curr[0], c = curr[1];
            // Move the ball in the chosen direction until it can.
            while (r >= 0 && r < m && c >= 0 && c < n && maze[r][c] == 0) {
                r += dirX[i];
                c += dirY[i];
            }

            // Revert the last move to get the cell to which the ball rolls.
            if (dfs(m, n, maze, new int[]{r - dirX[i], c - dirY[i]}, destination, visit)) {
                return true;
            }
        }
        return false;
    }

    public boolean hasPath(int[][] maze, int[] start, int[] destination) {
        int m = maze.length;
        int n = maze[0].length;
        boolean[][] visit = new boolean[m][n];
        return dfs(m, n, maze, start, destination, visit);
    }
}
```

```cpp
class Solution {
public:
    bool dfs(int m, int n, vector<vector<int>>& maze, vector<int> curr, vector<int>& destination,
             vector<vector<bool>>& visit) {
        if (visit[curr[0]][curr[1]]) {
            return false;
        }
        if (curr[0] == destination[0] && curr[1] == destination[1]) {
            return true;
        }

        visit[curr[0]][curr[1]] = true;
        vector<int> dirX{0, 1, 0, -1};
        vector<int> dirY{-1, 0, 1, 0};

        for (int i = 0; i < 4; i++) {
            int r = curr[0], c = curr[1];
            // Move the ball in the chosen direction until it can.
            while (r >= 0 && r < m && c >= 0 && c < n && maze[r][c] == 0) {
                r += dirX[i];
                c += dirY[i];
            }
            // Revert the last move to get the cell to which the ball rolls. 
            if (dfs(m, n, maze, {r - dirX[i], c - dirY[i]}, destination, visit)) {
                return true;
            }
        }
        return false;
    }

    bool hasPath(vector<vector<int>>& maze, vector<int>& start, vector<int>& destination) {
        int m = maze.size();
        int n = maze[0].size();
        vector<vector<bool>> visit(m, vector<bool>(n));
        return dfs(m, n, maze, start, destination, visit);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @param {number[][]} maze
     * @param {number[]} curr
     * @param {number[]} destination
     * @param {boolean[][]} visit
     * @return {boolean}
     */
    dfs(m, n, maze, curr, destination, visit) {
        if (visit[curr[0]][curr[1]]) {
            return false;
        }
        if (curr[0] === destination[0] && curr[1] === destination[1]) {
            return true;
        }
        visit[curr[0]][curr[1]] = true;
        const dirX = [0, 1, 0, -1];
        const dirY = [-1, 0, 1, 0];
        for (let i = 0; i < 4; i++) {
            let r = curr[0];
            let c = curr[1];
            // Move the ball in the chosen direction until it can.
            while (r >= 0 && r < m && c >= 0 && c < n && maze[r][c] === 0) {
                r += dirX[i];
                c += dirY[i];
            }
            // Revert the last move to get the cell to which the ball rolls.
            if (this.dfs(m, n, maze, [r - dirX[i], c - dirY[i]], destination, visit)) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {number[][]} maze
     * @param {number[]} start
     * @param {number[]} destination
     * @return {boolean}
     */
    hasPath(maze, start, destination) {
        const m = maze.length;
        const n = maze[0].length;
        const visit = Array.from({ length: m }, () => Array(n).fill(false));
        return this.dfs(m, n, maze, start, destination, visit);
    }
}
```

```go
func hasPath(maze [][]int, start []int, destination []int) bool {
    m, n := len(maze), len(maze[0])
    visit := make([][]bool, m)
    for i := range visit {
        visit[i] = make([]bool, n)
    }

    var dfs func(curr []int) bool
    dfs = func(curr []int) bool {
        if visit[curr[0]][curr[1]] {
            return false
        }
        if curr[0] == destination[0] && curr[1] == destination[1] {
            return true
        }
        visit[curr[0]][curr[1]] = true
        dirX := []int{0, 1, 0, -1}
        dirY := []int{-1, 0, 1, 0}

        for i := 0; i < 4; i++ {
            r, c := curr[0], curr[1]
            for r >= 0 && r < m && c >= 0 && c < n && maze[r][c] == 0 {
                r += dirX[i]
                c += dirY[i]
            }
            if dfs([]int{r - dirX[i], c - dirY[i]}) {
                return true
            }
        }
        return false
    }

    return dfs(start)
}
```

```kotlin
class Solution {
    fun hasPath(maze: Array<IntArray>, start: IntArray, destination: IntArray): Boolean {
        val m = maze.size
        val n = maze[0].size
        val visit = Array(m) { BooleanArray(n) }

        fun dfs(curr: IntArray): Boolean {
            if (visit[curr[0]][curr[1]]) return false
            if (curr[0] == destination[0] && curr[1] == destination[1]) return true

            visit[curr[0]][curr[1]] = true
            val dirX = intArrayOf(0, 1, 0, -1)
            val dirY = intArrayOf(-1, 0, 1, 0)

            for (i in 0 until 4) {
                var r = curr[0]
                var c = curr[1]
                while (r in 0 until m && c in 0 until n && maze[r][c] == 0) {
                    r += dirX[i]
                    c += dirY[i]
                }
                if (dfs(intArrayOf(r - dirX[i], c - dirY[i]))) {
                    return true
                }
            }
            return false
        }

        return dfs(start)
    }
}
```

```swift
class Solution {
    func hasPath(_ maze: [[Int]], _ start: [Int], _ destination: [Int]) -> Bool {
        let m = maze.count
        let n = maze[0].count
        var visit = [[Bool]](repeating: [Bool](repeating: false, count: n), count: m)

        func dfs(_ curr: [Int]) -> Bool {
            if visit[curr[0]][curr[1]] { return false }
            if curr[0] == destination[0] && curr[1] == destination[1] { return true }

            visit[curr[0]][curr[1]] = true
            let dirX = [0, 1, 0, -1]
            let dirY = [-1, 0, 1, 0]

            for i in 0..<4 {
                var r = curr[0]
                var c = curr[1]
                while r >= 0 && r < m && c >= 0 && c < n && maze[r][c] == 0 {
                    r += dirX[i]
                    c += dirY[i]
                }
                if dfs([r - dirX[i], c - dirY[i]]) {
                    return true
                }
            }
            return false
        }

        return dfs(start)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot n \cdot (m + n))$
- Space complexity: $O(m \cdot n)$

>  Where $m$ and $n$ are the number of rows and columns in `maze`.

---

## 2. Breadth First Search

::tabs-start

```python
class Solution:
    def hasPath(self, maze: List[List[int]], start: List[int], destination: List[int]) -> bool:
        m = len(maze)
        n = len(maze[0])
        visit = [[False] * n for _ in range(m)]
        queue = deque()
        
        queue.append(start)
        visit[start[0]][start[1]] = True
        dirX = [0, 1, 0, -1]
        dirY = [-1, 0, 1, 0]

        while queue:
            curr = queue.popleft()
            if curr[0] == destination[0] and curr[1] == destination[1]:
                return True

            for i in range(4):
                r = curr[0]
                c = curr[1]
                # Move the ball in the chosen direction until it can.
                while r >= 0 and r < m and c >= 0 and c < n and maze[r][c] == 0:
                    r += dirX[i]
                    c += dirY[i]
                # Revert the last move to get the cell to which the ball rolls.
                r -= dirX[i]
                c -= dirY[i]
                if not visit[r][c]:
                    queue.append([r, c])
                    visit[r][c] = True
        return False
```

```java
class Solution {
    public boolean hasPath(int[][] maze, int[] start, int[] destination) {
        int m = maze.length;
        int n = maze[0].length;
        boolean[][] visit = new boolean[m][n];
        int[] dirX = {0, 1, 0, -1};
        int[] dirY = {-1, 0, 1, 0};

        Queue<int[]> queue = new LinkedList<>();
        queue.offer(start);
        visit[start[0]][start[1]] = true;

        while (!queue.isEmpty()) {
            int[] curr = queue.poll();
            if (curr[0] == destination[0] && curr[1] == destination[1]) {
                return true;
            }
            for (int i = 0; i < 4; i++) {
                int r = curr[0];
                int c = curr[1];
                // Move the ball in the chosen direction until it can.
                while (r >= 0 && r < m && c >= 0 && c < n && maze[r][c] == 0) {
                    r += dirX[i];
                    c += dirY[i];
                }
                // Revert the last move to get the cell to which the ball rolls.
                r -= dirX[i];
                c -= dirY[i];
                if (!visit[r][c]) {
                    queue.offer(new int[]{r, c});
                    visit[r][c] = true;
                }
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool hasPath(vector<vector<int>>& maze, vector<int>& start, vector<int>& destination) {
        int m = maze.size();
        int n = maze[0].size();
        vector<vector<bool>> visit(m, vector<bool>(n, false));
        vector<int> dirX{0, 1, 0, -1};
        vector<int> dirY{-1, 0, 1, 0};

        queue<vector<int>> q;
        q.push(start);
        visit[start[0]][start[1]] = true;

        while (!q.empty()) {
            vector<int> curr = q.front();
            q.pop();
            if (curr[0] == destination[0] && curr[1] == destination[1]) {
                return true;
            }

            for (int i = 0; i < 4; i++) {
                int r = curr[0];
                int c = curr[1];
                // Move the ball in the chosen direction until it can.
                while (r >= 0 && r < m && c >= 0 && c < n && maze[r][c] == 0) {
                    r += dirX[i];
                    c += dirY[i];
                }
                // Revert the last move to get the cell to which the ball rolls.
                r -= dirX[i];
                c -= dirY[i];
                if (!visit[r][c]) {
                    q.push({r, c});
                    visit[r][c] = true;
                }
            }
        }
        return false;
    }
};
```

```go
func hasPath(maze [][]int, start []int, destination []int) bool {
    m, n := len(maze), len(maze[0])
    visit := make([][]bool, m)
    for i := range visit {
        visit[i] = make([]bool, n)
    }

    queue := [][]int{start}
    visit[start[0]][start[1]] = true
    dirX := []int{0, 1, 0, -1}
    dirY := []int{-1, 0, 1, 0}

    for len(queue) > 0 {
        curr := queue[0]
        queue = queue[1:]
        if curr[0] == destination[0] && curr[1] == destination[1] {
            return true
        }

        for i := 0; i < 4; i++ {
            r, c := curr[0], curr[1]
            for r >= 0 && r < m && c >= 0 && c < n && maze[r][c] == 0 {
                r += dirX[i]
                c += dirY[i]
            }
            r -= dirX[i]
            c -= dirY[i]
            if !visit[r][c] {
                queue = append(queue, []int{r, c})
                visit[r][c] = true
            }
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun hasPath(maze: Array<IntArray>, start: IntArray, destination: IntArray): Boolean {
        val m = maze.size
        val n = maze[0].size
        val visit = Array(m) { BooleanArray(n) }
        val dirX = intArrayOf(0, 1, 0, -1)
        val dirY = intArrayOf(-1, 0, 1, 0)

        val queue: Queue<IntArray> = LinkedList()
        queue.offer(start)
        visit[start[0]][start[1]] = true

        while (queue.isNotEmpty()) {
            val curr = queue.poll()
            if (curr[0] == destination[0] && curr[1] == destination[1]) {
                return true
            }

            for (i in 0 until 4) {
                var r = curr[0]
                var c = curr[1]
                while (r in 0 until m && c in 0 until n && maze[r][c] == 0) {
                    r += dirX[i]
                    c += dirY[i]
                }
                r -= dirX[i]
                c -= dirY[i]
                if (!visit[r][c]) {
                    queue.offer(intArrayOf(r, c))
                    visit[r][c] = true
                }
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func hasPath(_ maze: [[Int]], _ start: [Int], _ destination: [Int]) -> Bool {
        let m = maze.count
        let n = maze[0].count
        var visit = [[Bool]](repeating: [Bool](repeating: false, count: n), count: m)
        let dirX = [0, 1, 0, -1]
        let dirY = [-1, 0, 1, 0]

        var queue = [start]
        visit[start[0]][start[1]] = true

        while !queue.isEmpty {
            let curr = queue.removeFirst()
            if curr[0] == destination[0] && curr[1] == destination[1] {
                return true
            }

            for i in 0..<4 {
                var r = curr[0]
                var c = curr[1]
                while r >= 0 && r < m && c >= 0 && c < n && maze[r][c] == 0 {
                    r += dirX[i]
                    c += dirY[i]
                }
                r -= dirX[i]
                c -= dirY[i]
                if !visit[r][c] {
                    queue.append([r, c])
                    visit[r][c] = true
                }
            }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot n \cdot (m + n))$
- Space complexity: $O(m \cdot n)$

>  Where $m$ and $n$ are the number of rows and columns in `maze`.
