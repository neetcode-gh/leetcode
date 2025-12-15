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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot n \cdot (m + n))$
- Space complexity: $O(m \cdot n)$

>  Where $m$ and $n$ are the number of rows and columns in `maze`.
