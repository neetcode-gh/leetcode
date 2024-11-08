## 1. Recursion

::tabs-start

```python
class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

        def dfs(r, c, prevVal):
            if (min(r, c) < 0 or r >= ROWS or 
                c >= COLS or matrix[r][c] <= prevVal
            ):
                return 0
            
            res = 1
            for d in directions:
                res = max(res, 1 + dfs(r + d[0], c + d[1], matrix[r][c]))
            return res

        LIP = 0
        for r in range(ROWS):
            for c in range(COLS):
                LIP = max(LIP, dfs(r, c, float('-inf')))
        return LIP
```

```java
public class Solution {
    int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    private int dfs(int[][] matrix, int r, int c, int prevVal) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        if (r < 0 || r >= ROWS || c < 0 || 
            c >= COLS || matrix[r][c] <= prevVal) {
            return 0;
        }

        int res = 1;
        for (int[] d : directions) {
            res = Math.max(res, 1 + dfs(matrix, r + d[0], 
                                    c + d[1], matrix[r][c]));
        }
        return res;
    }

    public int longestIncreasingPath(int[][] matrix) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        int LIP = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                LIP = Math.max(LIP, dfs(matrix, r, c, Integer.MIN_VALUE));
            }
        }
        return LIP;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> directions = {{-1, 0}, {1, 0}, 
                                      {0, -1}, {0, 1}};
    
    int dfs(vector<vector<int>>& matrix, int r, int c, int prevVal) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        if (r < 0 || r >= ROWS || c < 0 || 
            c >= COLS || matrix[r][c] <= prevVal)
            return 0;
        
        int res = 1;
        for (auto d : directions)
            res = max(res, 1 + dfs(matrix, r + d[0], 
                                   c + d[1], matrix[r][c]));
        return res;
    }

    int longestIncreasingPath(vector<vector<int>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size(), LIP = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                LIP = max(LIP, dfs(matrix, r, c, INT_MIN));
            }
        }
        return LIP;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    longestIncreasingPath(matrix) {
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        const ROWS = matrix.length, COLS = matrix[0].length;

        const dfs = (r, c, prevVal) => {
            if (r < 0 || r >= ROWS || c < 0 || 
                c >= COLS || matrix[r][c] <= prevVal) {
                return 0;
            }

            let res = 1;
            for (let d of directions) {
                res = Math.max(res, 1 + dfs(r + d[0], 
                                        c + d[1], matrix[r][c]));
            }
            return res;
        };

        let LIP = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                LIP = Math.max(LIP, dfs(r, c, -Infinity));
            }
        }
        return LIP;
    }
}
```

```csharp
public class Solution {
    private static int[][] directions = new int[][] {
        new int[] {-1, 0}, new int[] {1, 0}, 
        new int[] {0, -1}, new int[] {0, 1}
    };

    private int Dfs(int[][] matrix, int r, int c, int prevVal) {
        int ROWS = matrix.Length, COLS = matrix[0].Length;
        if (r < 0 || r >= ROWS || c < 0 || 
            c >= COLS || matrix[r][c] <= prevVal) {
            return 0;
        }

        int res = 1;
        foreach (var dir in directions) {
            res = Math.Max(res, 1 + Dfs(matrix, r + dir[0], 
                                    c + dir[1], matrix[r][c]));
        }
        return res;
    }

    public int LongestIncreasingPath(int[][] matrix) {
        int ROWS = matrix.Length, COLS = matrix[0].Length;
        int LIP = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                LIP = Math.Max(LIP, Dfs(matrix, r, c, int.MinValue));
            }
        }
        return LIP;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n * 4 ^ {m * n})$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given $matrix$.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        dp = {}  # (r, c) -> LIP

        def dfs(r, c, prevVal):
            if (r < 0 or r == ROWS or c < 0 or 
                c == COLS or matrix[r][c] <= prevVal
            ):
                return 0
            if (r, c) in dp:
                return dp[(r, c)]

            res = 1
            res = max(res, 1 + dfs(r + 1, c, matrix[r][c]))
            res = max(res, 1 + dfs(r - 1, c, matrix[r][c]))
            res = max(res, 1 + dfs(r, c + 1, matrix[r][c]))
            res = max(res, 1 + dfs(r, c - 1, matrix[r][c]))
            dp[(r, c)] = res
            return res

        for r in range(ROWS):
            for c in range(COLS):
                dfs(r, c, -1)
        return max(dp.values())
```

```java
public class Solution {
    int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    int[][] dp;

    private int dfs(int[][] matrix, int r, int c, int prevVal) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        if (r < 0 || r >= ROWS || c < 0 || 
            c >= COLS || matrix[r][c] <= prevVal) {
            return 0;
        }
        if (dp[r][c] != -1) return dp[r][c];

        int res = 1;
        for (int[] d : directions) {
            res = Math.max(res, 1 + dfs(matrix, r + d[0], 
                                    c + d[1], matrix[r][c]));
        }
        return dp[r][c] = res;
    }

    public int longestIncreasingPath(int[][] matrix) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        int LIP = 0;
        dp = new int[ROWS][COLS];
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                dp[i][j] = -1;
            }
        }
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                LIP = Math.max(LIP, dfs(matrix, r, c, Integer.MIN_VALUE));
            }
        }
        return LIP;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> directions = {{-1, 0}, {1, 0}, 
                                      {0, -1}, {0, 1}};
    vector<vector<int>> dp;

    int dfs(vector<vector<int>>& matrix, int r, int c, int prevVal) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        if (r < 0 || r >= ROWS || c < 0 || 
            c >= COLS || matrix[r][c] <= prevVal) {
            return 0;
        }
        if (dp[r][c] != -1) return dp[r][c];

        int res = 1;
        for (vector<int> d : directions) {
            res = max(res, 1 + dfs(matrix, r + d[0], 
                               c + d[1], matrix[r][c]));
        }
        dp[r][c] = res;
        return res;
    }

    int longestIncreasingPath(vector<vector<int>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        dp = vector<vector<int>>(ROWS, vector<int>(COLS, -1));
        int LIP = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                LIP = max(LIP, dfs(matrix, r, c, INT_MIN));
            }
        }
        return LIP;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    longestIncreasingPath(matrix) {
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        const ROWS = matrix.length, COLS = matrix[0].length;
        let dp = Array.from({ length: ROWS }, () => 
                 Array(COLS).fill(-1));

        const dfs = (r, c, prevVal) => {
            if (r < 0 || r >= ROWS || c < 0 || 
                c >= COLS || matrix[r][c] <= prevVal) {
                return 0;
            }
            if (dp[r][c] !== -1) return dp[r][c];

            let res = 1;
            for (let d of directions) {
                res = Math.max(res, 1 + dfs(r + d[0], 
                                        c + d[1], matrix[r][c]));
            }
            dp[r][c] = res;
            return res;
        };

        let LIP = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                LIP = Math.max(LIP, dfs(r, c, -Infinity));
            }
        }
        return LIP;
    }
}
```

```csharp
public class Solution {
    int[][] directions = new int[][] {
        new int[] {-1, 0}, new int[] {1, 0}, 
        new int[] {0, -1}, new int[] {0, 1}
    };
    int[,] dp;

    private int Dfs(int[][] matrix, int r, int c, int prevVal) {
        int ROWS = matrix.Length, COLS = matrix[0].Length;
        if (r < 0 || r >= ROWS || c < 0 || 
            c >= COLS || matrix[r][c] <= prevVal) {
            return 0;
        }
        if (dp[r, c] != -1) return dp[r, c];

        int res = 1;
        foreach (int[] d in directions) {
            res = Math.Max(res, 1 + Dfs(matrix, r + d[0], 
                                    c + d[1], matrix[r][c]));
        }

        dp[r, c] = res;
        return res;
    }

    public int LongestIncreasingPath(int[][] matrix) {
        int ROWS = matrix.Length, COLS = matrix[0].Length;
        dp = new int[ROWS, COLS];
        
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                dp[i, j] = -1;
            }
        }

        int LIP = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                LIP = Math.Max(LIP, Dfs(matrix, r, c, int.MinValue));
            }
        }
        return LIP;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given $matrix$.

---

## 3. Topological Sort (Kahn's Algorithm)

::tabs-start

```python
from collections import deque

class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
        indegree = [[0] * COLS for _ in range(ROWS)]
        
        for r in range(ROWS):
            for c in range(COLS):
                for d in directions:
                    nr, nc = d[0] + r, d[1] + c
                    if (0 <= nr < ROWS and 0 <= nc < COLS and 
                        matrix[nr][nc] < matrix[r][c]
                    ):
                        indegree[r][c] += 1

        q = deque()
        for r in range(ROWS):
            for c in range(COLS):
                if indegree[r][c] == 0:
                    q.append([r, c])

        LIS = 0
        while q:
            for _ in range(len(q)):
                r, c = q.popleft()
                for d in directions:
                    nr, nc = r + d[0], c + d[1]
                    if (0 <= nr < ROWS and 0 <= nc < COLS and 
                        matrix[nr][nc] > matrix[r][c]
                    ):
                        indegree[nr][nc] -= 1
                        if indegree[nr][nc] == 0:
                            q.append([nr, nc])
            LIS += 1
        return LIS
```

```java
public class Solution {
    public int longestIncreasingPath(int[][] matrix) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        int[][] indegree = new int[ROWS][COLS];
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                for (int[] d : directions) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < ROWS && nc >= 0 && 
                        nc < COLS && matrix[nr][nc] < matrix[r][c]) {
                        indegree[r][c]++;
                    }
                }
            }
        }

        Queue<int[]> q = new LinkedList<>();
        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                if (indegree[r][c] == 0) {
                    q.offer(new int[]{r, c});
                }
            }
        }

        int LIS = 0;
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; ++i) {
                int[] node = q.poll();
                int r = node[0], c = node[1];
                for (int[] d : directions) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < ROWS && nc >= 0 && 
                        nc < COLS && matrix[nr][nc] > matrix[r][c]) {
                        if (--indegree[nr][nc] == 0) {
                            q.offer(new int[]{nr, nc});
                        }
                    }
                }
            }
            LIS++;
        }
        return LIS;
    }
}
```

```cpp
class Solution {
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        vector<vector<int>> indegree(ROWS, vector<int>(COLS, 0));
        vector<vector<int>> directions = {{-1, 0}, {1, 0}, 
                                          {0, -1}, {0, 1}};
        
        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                for (auto& d : directions) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < ROWS && nc >= 0 && 
                        nc < COLS && matrix[nr][nc] < matrix[r][c]) {
                        indegree[r][c]++;
                    }
                }
            }
        }
        
        queue<pair<int, int>> q;
        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                if (indegree[r][c] == 0) {
                    q.push({r, c});
                }
            }
        }
        
        int LIS = 0;
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; ++i) {
                auto [r, c] = q.front();
                q.pop();
                for (auto& d : directions) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < ROWS && nc >= 0 && 
                        nc < COLS && matrix[nr][nc] > matrix[r][c]) {
                        if (--indegree[nr][nc] == 0) {
                            q.push({nr, nc});
                        }
                    }
                }
            }
            LIS++;
        }
        return LIS;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    longestIncreasingPath(matrix) {
        const ROWS = matrix.length, COLS = matrix[0].length;
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        let indegree = Array.from({ length: ROWS }, () => 
                       Array(COLS).fill(0));
        
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                for (const [dr, dc] of directions) {
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && 
                        nc < COLS && matrix[nr][nc] < matrix[r][c]) {
                        indegree[r][c]++;
                    }
                }
            }
        }

        let q = new Queue();
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (indegree[r][c] === 0) {
                    q.push([r, c]);
                }
            }
        }

        let LIS = 0;
        while (!q.isEmpty()) {
            const size = q.size();
            for (let i = 0; i < size; i++) {
                const [r, c] = q.pop();
                for (const [dr, dc] of directions) {
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && 
                        nc < COLS && matrix[nr][nc] > matrix[r][c]) {
                        indegree[nr][nc]--;
                        if (indegree[nr][nc] === 0) {
                            q.push([nr, nc]);
                        }
                    }
                }
            }
            LIS++;
        }
        return LIS;
    }
}
```

```csharp
public class Solution {
    public int LongestIncreasingPath(int[][] matrix) {
        int ROWS = matrix.Length, COLS = matrix[0].Length;
        int[][] indegree = new int[ROWS][];
        for (int i = 0; i < ROWS; i++) {
            indegree[i] = new int[COLS];
        }
        int[][] directions = new int[][] { 
            new int[] { -1, 0 }, new int[] { 1, 0 }, 
            new int[] { 0, -1 }, new int[] { 0, 1 } 
        };

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                foreach (var d in directions) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < ROWS && nc >= 0 && 
                        nc < COLS && matrix[nr][nc] < matrix[r][c]) {
                        indegree[r][c]++;
                    }
                }
            }
        }

        Queue<int[]> q = new Queue<int[]>();
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (indegree[r][c] == 0) {
                    q.Enqueue(new int[] { r, c });
                }
            }
        }

        int LIS = 0;
        while (q.Count > 0) {
            int size = q.Count;
            for (int i = 0; i < size; i++) {
                int[] node = q.Dequeue();
                int r = node[0], c = node[1];
                foreach (var d in directions) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < ROWS && nc >= 0 && 
                        nc < COLS && matrix[nr][nc] > matrix[r][c]) {
                        if (--indegree[nr][nc] == 0) {
                            q.Enqueue(new int[] { nr, nc });
                        }
                    }
                }
            }
            LIS++;
        }
        return LIS;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the given $matrix$.