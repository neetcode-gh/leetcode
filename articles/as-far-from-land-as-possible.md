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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$
