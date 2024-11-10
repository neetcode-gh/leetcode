## 1. Brute Force

::tabs-start

```python
class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        n = len(grid)
        visit = [[False] * n for _ in range(n)]

        def dfs(node, t):
            r, c = node
            if min(r, c) < 0 or max(r, c) >= n or visit[r][c]:
                return 1000000
            if r == (n - 1) and c == (n - 1):
                return max(t, grid[r][c])
            visit[r][c] = True
            t = max(t, grid[r][c])
            res = min(dfs((r + 1, c), t),
                       dfs((r - 1, c), t),
                       dfs((r, c + 1), t),
                       dfs((r, c - 1), t))
            visit[r][c] = False
            return res
        
        return dfs((0, 0), 0)
```

```java
public class Solution {
    public int swimInWater(int[][] grid) {
        int n = grid.length;
        boolean[][] visit = new boolean[n][n];

        return dfs(grid, visit, 0, 0, 0);
    }

    private int dfs(int[][] grid, boolean[][] visit, 
                    int r, int c, int t) {
        int n = grid.length;
        if (r < 0 || c < 0 || r >= n || c >= n || visit[r][c]) {
            return 1000000;
        }
        if (r == n - 1 && c == n - 1) {
            return Math.max(t, grid[r][c]);
        }
        visit[r][c] = true;
        t = Math.max(t, grid[r][c]);
        int res = Math.min(Math.min(dfs(grid, visit, r + 1, c, t),
                                     dfs(grid, visit, r - 1, c, t)),
                           Math.min(dfs(grid, visit, r, c + 1, t),
                                    dfs(grid, visit, r, c - 1, t)));
        visit[r][c] = false;
        return res;
    }
}
```

```cpp
class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<vector<bool>> visit(n, vector<bool>(n, false));
        return dfs(grid, visit, 0, 0, 0);
    }

private:
    int dfs(vector<vector<int>>& grid, vector<vector<bool>>& visit, 
            int r, int c, int t) {
        int n = grid.size();
        if (r < 0 || c < 0 || r >= n || c >= n || visit[r][c]) {
            return 1000000;
        }
        if (r == n - 1 && c == n - 1) {
            return max(t, grid[r][c]);
        }
        visit[r][c] = true;
        t = max(t, grid[r][c]);
        int res = min(min(dfs(grid, visit, r + 1, c, t),
                                     dfs(grid, visit, r - 1, c, t)),
                           min(dfs(grid, visit, r, c + 1, t),
                                    dfs(grid, visit, r, c - 1, t)));
        visit[r][c] = false;
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
    swimInWater(grid) {
        const n = grid.length;
        const visit = Array.from({ length: n }, () => 
                      Array(n).fill(false));
        
        const dfs = (r, c, t) => {
            if (r < 0 || c < 0 || r >= n || 
                c >= n || visit[r][c]) {
                return 1000000;
            }
            if (r === n - 1 && c === n - 1) {
                return Math.max(t, grid[r][c]);
            }
            visit[r][c] = true;
            t = Math.max(t, grid[r][c]);
            const res = Math.min(
                Math.min(dfs(r + 1, c, t),
                        dfs(r - 1, c, t)),
                Math.min(dfs(r, c + 1, t),
                        dfs(r, c - 1, t))
            );
            visit[r][c] = false;
            return res;
        }

        return dfs(0, 0, 0);
    }
}
```

```csharp
public class Solution {
    public int SwimInWater(int[][] grid) {
        int n = grid.Length;
        bool[][] visit = new bool[n][];
        for (int i = 0; i < n; i++) {
            visit[i] = new bool[n];
        }
        return Dfs(grid, visit, 0, 0, 0);
    }

    private int Dfs(int[][] grid, bool[][] visit, 
                    int r, int c, int t) {
        int n = grid.Length;
        if (r < 0 || c < 0 || r >= n || 
            c >= n || visit[r][c]) {
            return 1000000;
        }
        if (r == n - 1 && c == n - 1) {
            return Math.Max(t, grid[r][c]);
        }
        visit[r][c] = true;
        t = Math.Max(t, grid[r][c]);
        int res = Math.Min(Math.Min(Dfs(grid, visit, r + 1, c, t),
                                     Dfs(grid, visit, r - 1, c, t)),
                           Math.Min(Dfs(grid, visit, r, c + 1, t),
                                    Dfs(grid, visit, r, c - 1, t)));
        visit[r][c] = false;
        return res;
    }
}
```

```go
func swimInWater(grid [][]int) int {
    n := len(grid)
    visit := make([][]bool, n)
    for i := range visit {
        visit[i] = make([]bool, n)
    }

    var dfs func(r, c, t int) int
    dfs = func(r, c, t int) int {
        if r < 0 || c < 0 || r >= n || c >= n || visit[r][c] {
            return 1000000
        }
        if r == n-1 && c == n-1 {
            return max(t, grid[r][c])
        }
        visit[r][c] = true
        t = max(t, grid[r][c])
        
        res := min(
            min(dfs(r+1, c, t), dfs(r-1, c, t)),
            min(dfs(r, c+1, t), dfs(r, c-1, t)),
        )
        
        visit[r][c] = false
        return res
    }
    
    return dfs(0, 0, 0)
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
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
    fun swimInWater(grid: Array<IntArray>): Int {
        val n = grid.size
        val visit = Array(n) { BooleanArray(n) }

        fun dfs(r: Int, c: Int, t: Int): Int {
            if (r < 0 || c < 0 || r >= n || c >= n || visit[r][c]) {
                return 1000000
            }
            if (r == n - 1 && c == n - 1) return maxOf(t, grid[r][c])
            visit[r][c] = true
            val time = maxOf(t, grid[r][c])

            val res = minOf(
                dfs(r + 1, c, time),
                dfs(r - 1, c, time),
                dfs(r, c + 1, time),
                dfs(r, c - 1, time)
            )

            visit[r][c] = false
            return res
        }

        return dfs(0, 0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(4 ^ {n ^ 2})$
* Space complexity: $O(n ^ 2)$

---

## 2. Depth First Search

::tabs-start

```python
class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        n = len(grid)
        visit = [[False] * n for _ in range(n)]
        minH = maxH = grid[0][0]
        for row in range(n):
            maxH = max(maxH, max(grid[row]))
            minH = min(minH, min(grid[row]))

        def dfs(node, t):
            r, c = node
            if (min(r, c) < 0 or max(r, c) >= n or 
                visit[r][c] or grid[r][c] > t):
                return False
            if r == (n - 1) and c == (n - 1):
                return True
            visit[r][c] = True
            return (dfs((r + 1, c), t) or
                    dfs((r - 1, c), t) or
                    dfs((r, c + 1), t) or
                    dfs((r, c - 1), t))
            
        for t in range(minH, maxH):
            if dfs((0, 0), t):
                return t
            for r in range(n):
                for c in range(n):
                    visit[r][c] = False
        
        return maxH
```

```java
public class Solution {
    public int swimInWater(int[][] grid) {
        int n = grid.length;
        boolean[][] visit = new boolean[n][n];
        int minH = grid[0][0], maxH = grid[0][0];
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                maxH = Math.max(maxH, grid[row][col]);
                minH = Math.min(minH, grid[row][col]);
            }
        }

        for (int t = minH; t < maxH; t++) {
            if (dfs(grid, visit, 0, 0, t)) {
                return t;
            }
            for (int r = 0; r < n; r++) {
                Arrays.fill(visit[r], false);
            }
        }
        return maxH;
    }

    private boolean dfs(int[][] grid, boolean[][] visit, int r, int c, int t) {
        if (r < 0 || c < 0 || r >= grid.length || 
            c >= grid.length || visit[r][c] || grid[r][c] > t) {
            return false;
        }
        if (r == grid.length - 1 && c == grid.length - 1) {
            return true;
        }
        visit[r][c] = true;
        return dfs(grid, visit, r + 1, c, t) || 
               dfs(grid, visit, r - 1, c, t) || 
               dfs(grid, visit, r, c + 1, t) || 
               dfs(grid, visit, r, c - 1, t);
    }
}
```

```cpp
class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<vector<bool>> visit(n, vector<bool>(n, false));
        int minH = grid[0][0], maxH = grid[0][0];
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                maxH = max(maxH, grid[row][col]);
                minH = min(minH, grid[row][col]);
            }
        }

        for (int t = minH; t < maxH; t++) {
            if (dfs(grid, visit, 0, 0, t)) {
                return t;
            }
            for (int r = 0; r < n; r++) {
                fill(visit[r].begin(), visit[r].end(), false);
            }
        }
        return maxH;
    }

private:
    bool dfs(vector<vector<int>>& grid, vector<vector<bool>>& visit, 
                                        int r, int c, int t) {
        if (r < 0 || c < 0 || r >= grid.size() || 
            c >= grid.size() || visit[r][c] || grid[r][c] > t) {
            return false;
        }
        if (r == grid.size() - 1 && c == grid.size() - 1) {
            return true;
        }
        visit[r][c] = true;
        return dfs(grid, visit, r + 1, c, t) || 
               dfs(grid, visit, r - 1, c, t) || 
               dfs(grid, visit, r, c + 1, t) || 
               dfs(grid, visit, r, c - 1, t);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    swimInWater(grid) {
        const n = grid.length;
        const visit = Array.from({ length: n }, () => 
                      Array(n).fill(false));
        let minH = grid[0][0], maxH = grid[0][0];
        for (let row = 0; row < n; row++) {
            for (let col = 0; col < n; col++) {
                maxH = Math.max(maxH, grid[row][col]);
                minH = Math.min(minH, grid[row][col]);
            }
        }

        const dfs = (node, t) => {
            const [r, c] = node;
            if (Math.min(r, c) < 0 || Math.max(r, c) >= n || 
                visit[r][c] || grid[r][c] > t) {
                return false;
            }
            if (r === n - 1 && c === n - 1) {
                return true;
            }
            visit[r][c] = true;
            return dfs([r + 1, c], t) || 
                   dfs([r - 1, c], t) || 
                   dfs([r, c + 1], t) || 
                   dfs([r, c - 1], t);
        };

        for (let t = minH; t < maxH; t++) {
            if (dfs([0, 0], t)) {
                return t;
            }
            for (let r = 0; r < n; r++) {
                for (let c = 0; c < n; c++) {
                    visit[r][c] = false;
                }
            }
        }
        return maxH;
    }
}
```

```csharp
public class Solution {
    public int SwimInWater(int[][] grid) {
        int n = grid.Length;
        bool[][] visit = new bool[n][];
        for (int i = 0; i < n; i++) {
            visit[i] = new bool[n];
        }
        int minH = grid[0][0], maxH = grid[0][0];
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                maxH = Math.Max(maxH, grid[row][col]);
                minH = Math.Min(minH, grid[row][col]);
            }
        }

        for (int t = minH; t < maxH; t++) {
            if (dfs(grid, visit, 0, 0, t)) {
                return t;
            }
            for (int r = 0; r < n; r++) {
                Array.Fill(visit[r], false);
            }
        }
        return maxH;
    }

    private bool dfs(int[][] grid, bool[][] visit, int r, int c, int t) {
        if (r < 0 || c < 0 || r >= grid.Length || 
            c >= grid.Length || visit[r][c] || grid[r][c] > t) {
            return false;
        }
        if (r == grid.Length - 1 && c == grid.Length - 1) {
            return true;
        }
        visit[r][c] = true;
        return dfs(grid, visit, r + 1, c, t) || 
               dfs(grid, visit, r - 1, c, t) || 
               dfs(grid, visit, r, c + 1, t) || 
               dfs(grid, visit, r, c - 1, t);
    }
}
```

```go
func swimInWater(grid [][]int) int {
    n := len(grid)
    minH, maxH := grid[0][0], grid[0][0]
    for r := 0; r < n; r++ {
        for c := 0; c < n; c++ {
            if grid[r][c] < minH {
                minH = grid[r][c]
            }
            if grid[r][c] > maxH {
                maxH = grid[r][c]
            }
        }
    }

    visit := make([][]bool, n)
    for i := range visit {
        visit[i] = make([]bool, n)
    }

    var dfs func(r, c, t int) bool
    dfs = func(r, c, t int) bool {
        if r < 0 || c < 0 || r >= n || c >= n || 
           visit[r][c] || grid[r][c] > t {
            return false
        }
        if r == n-1 && c == n-1 {
            return true
        }
        visit[r][c] = true
        found := dfs(r+1, c, t) || dfs(r-1, c, t) || 
                 dfs(r, c+1, t) || dfs(r, c-1, t)
        return found
    }

    for t := minH; t <= maxH; t++ {
        if dfs(0, 0, t) {
            return t
        }
        for i := range visit {
            for j := range visit[i] {
                visit[i][j] = false
            }
        }
    }

    return maxH
}
```

```kotlin
class Solution {
    fun swimInWater(grid: Array<IntArray>): Int {
        val n = grid.size
        var minH = grid[0][0]
        var maxH = grid[0][0]
        for (row in grid) {
            minH = minOf(minH, row.minOrNull() ?: minH)
            maxH = maxOf(maxH, row.maxOrNull() ?: maxH)
        }

        val visit = Array(n) { BooleanArray(n) }

        fun dfs(r: Int, c: Int, t: Int): Boolean {
            if (r < 0 || c < 0 || r >= n || c >= n || 
                visit[r][c] || grid[r][c] > t) {
                return false
            }
            if (r == n - 1 && c == n - 1) {
                return true
            }
            visit[r][c] = true
            return dfs(r + 1, c, t) || dfs(r - 1, c, t) || 
                   dfs(r, c + 1, t) || dfs(r, c - 1, t)
        }

        for (t in minH..maxH) {
            if (dfs(0, 0, t)) return t
            for (r in 0 until n) {
                visit[r].fill(false)
            }
        }

        return maxH
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 4)$
* Space complexity: $O(n ^ 2)$

---

## 3. Binary Search + DFS

::tabs-start

```python
class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        n = len(grid)
        visit = [[False] * n for _ in range(n)]
        minH = maxH = grid[0][0]
        for row in range(n):
            maxH = max(maxH, max(grid[row]))
            minH = min(minH, min(grid[row]))

        def dfs(node, t):
            r, c = node
            if (min(r, c) < 0 or max(r, c) >= n or 
                visit[r][c] or grid[r][c] > t):
                return False
            if r == (n - 1) and c == (n - 1):
                return True
            visit[r][c] = True
            return (dfs((r + 1, c), t) or
                    dfs((r - 1, c), t) or
                    dfs((r, c + 1), t) or
                    dfs((r, c - 1), t))
        
        l, r = minH, maxH
        while l < r:
            m = (l + r) >> 1
            if dfs((0, 0), m):
                r = m
            else:
                l = m + 1
            for row in range(n):
                for col in range(n):
                    visit[row][col] = False
        
        return r
```

```java
public class Solution {
    public int swimInWater(int[][] grid) {
        int n = grid.length;
        boolean[][] visit = new boolean[n][n];
        int minH = grid[0][0], maxH = grid[0][0];
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                maxH = Math.max(maxH, grid[row][col]);
                minH = Math.min(minH, grid[row][col]);
            }
        }

        int l = minH, r = maxH;
        while (l < r) {
            int m = (l + r) >> 1;
            if (dfs(grid, visit, 0, 0, m)) {
                r = m;
            } else {
                l = m + 1;
            }
            for (int row = 0; row < n; row++) {
                Arrays.fill(visit[row], false);
            }
        }
        return r;
    }

    private boolean dfs(int[][] grid, boolean[][] visit, int r, int c, int t) {
        if (r < 0 || c < 0 || r >= grid.length || 
            c >= grid.length || visit[r][c] || grid[r][c] > t) {
            return false;
        }
        if (r == grid.length - 1 && c == grid.length - 1) {
            return true;
        }
        visit[r][c] = true;
        return dfs(grid, visit, r + 1, c, t) || 
               dfs(grid, visit, r - 1, c, t) || 
               dfs(grid, visit, r, c + 1, t) || 
               dfs(grid, visit, r, c - 1, t);
    }
}
```

```cpp
class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<vector<bool>> visit(n, vector<bool>(n, false));
        int minH = grid[0][0], maxH = grid[0][0];
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                maxH = max(maxH, grid[row][col]);
                minH = min(minH, grid[row][col]);
            }
        }

        int l = minH, r = maxH;
        while (l < r) {
            int m = (l + r) >> 1;
            if (dfs(grid, visit, 0, 0, m)) {
                r = m;
            } else {
                l = m + 1;
            }
            for (int row = 0; row < n; row++) {
                fill(visit[row].begin(), visit[row].end(), false);
            }
        }
        return r;
    }

private:
    bool dfs(vector<vector<int>>& grid, vector<vector<bool>>& visit, 
                                        int r, int c, int t) {
        if (r < 0 || c < 0 || r >= grid.size() || 
            c >= grid.size() || visit[r][c] || grid[r][c] > t) {
            return false;
        }
        if (r == grid.size() - 1 && c == grid.size() - 1) {
            return true;
        }
        visit[r][c] = true;
        return dfs(grid, visit, r + 1, c, t) || 
               dfs(grid, visit, r - 1, c, t) || 
               dfs(grid, visit, r, c + 1, t) || 
               dfs(grid, visit, r, c - 1, t);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    swimInWater(grid) {
        const n = grid.length;
        const visit = Array.from({ length: n }, () => 
                      Array(n).fill(false));
        let minH = grid[0][0], maxH = grid[0][0];
        for (let row = 0; row < n; row++) {
            for (let col = 0; col < n; col++) {
                maxH = Math.max(maxH, grid[row][col]);
                minH = Math.min(minH, grid[row][col]);
            }
        }

        const dfs = (node, t) => {
            const [r, c] = node;
            if (Math.min(r, c) < 0 || Math.max(r, c) >= n || 
                visit[r][c] || grid[r][c] > t) {
                return false;
            }
            if (r === n - 1 && c === n - 1) {
                return true;
            }
            visit[r][c] = true;
            return dfs([r + 1, c], t) || 
                   dfs([r - 1, c], t) || 
                   dfs([r, c + 1], t) || 
                   dfs([r, c - 1], t);
        };

        let l = minH, r = maxH;
        while (l < r) {
            let m = (l + r) >> 1;
            if (dfs([0, 0], m)) {
                r = m;
            } else {
                l = m + 1;
            }
            for (let row = 0; row < n; row++) {
                for (let col = 0; col < n; col++) {
                    visit[row][col] = false;
                }
            }
        }
        return r;
    }
}
```

```csharp
public class Solution {
    public int SwimInWater(int[][] grid) {
        int n = grid.Length;
        bool[][] visit = new bool[n][];
        for (int i = 0; i < n; i++) {
            visit[i] = new bool[n];
        }
        int minH = grid[0][0], maxH = grid[0][0];
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                maxH = Math.Max(maxH, grid[row][col]);
                minH = Math.Min(minH, grid[row][col]);
            }
        }

        int l = minH, r = maxH;
        while (l < r) {
            int m = (l + r) >> 1;
            if (dfs(grid, visit, 0, 0, m)) {
                r = m;
            } else {
                l = m + 1;
            }
            for (int row = 0; row < n; row++) {
                Array.Fill(visit[row], false);
            }
        }
        return r;
    }

    private bool dfs(int[][] grid, bool[][] visit, int r, int c, int t) {
        if (r < 0 || c < 0 || r >= grid.Length || 
            c >= grid.Length || visit[r][c] || grid[r][c] > t) {
            return false;
        }
        if (r == grid.Length - 1 && c == grid.Length - 1) {
            return true;
        }
        visit[r][c] = true;
        return dfs(grid, visit, r + 1, c, t) || 
               dfs(grid, visit, r - 1, c, t) || 
               dfs(grid, visit, r, c + 1, t) || 
               dfs(grid, visit, r, c - 1, t);
    }
}
```

```go
func swimInWater(grid [][]int) int {
    n := len(grid)
    minH, maxH := grid[0][0], grid[0][0]
    for r := 0; r < n; r++ {
        for c := 0; c < n; c++ {
            if grid[r][c] < minH {
                minH = grid[r][c]
            }
            if grid[r][c] > maxH {
                maxH = grid[r][c]
            }
        }
    }

    visit := make([][]bool, n)
    for i := range visit {
        visit[i] = make([]bool, n)
    }

    var dfs func(r, c, t int) bool
    dfs = func(r, c, t int) bool {
        if r < 0 || c < 0 || r >= n || c >= n || 
           visit[r][c] || grid[r][c] > t {
            return false
        }
        if r == n-1 && c == n-1 {
            return true
        }
        visit[r][c] = true
        found := dfs(r+1, c, t) || dfs(r-1, c, t) || 
                 dfs(r, c+1, t) || dfs(r, c-1, t)
        return found
    }

    l, r := minH, maxH
    for l < r {
        m := (l + r) / 2
        if dfs(0, 0, m) {
            r = m
        } else {
            l = m + 1
        }
        for i := range visit {
            for j := range visit[i] {
                visit[i][j] = false
            }
        }
    }

    return r
}
```

```kotlin
class Solution {
    fun swimInWater(grid: Array<IntArray>): Int {
        val n = grid.size
        var minH = grid[0][0]
        var maxH = grid[0][0]
        for (row in grid) {
            minH = minOf(minH, row.minOrNull() ?: minH)
            maxH = maxOf(maxH, row.maxOrNull() ?: maxH)
        }

        val visit = Array(n) { BooleanArray(n) }

        fun dfs(r: Int, c: Int, t: Int): Boolean {
            if (r < 0 || c < 0 || r >= n || c >= n || 
                visit[r][c] || grid[r][c] > t) {
                return false
            }
            if (r == n - 1 && c == n - 1) {
                return true
            }
            visit[r][c] = true
            return dfs(r + 1, c, t) || dfs(r - 1, c, t) || 
                   dfs(r, c + 1, t) || dfs(r, c - 1, t)
        }

        var l = minH
        var r = maxH
        while (l < r) {
            val m = (l + r) / 2
            if (dfs(0, 0, m)) {
                r = m
            } else {
                l = m + 1
            }
            for (row in visit) {
                row.fill(false)
            }
        }

        return r
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 \log n)$
* Space complexity: $O(n ^ 2)$

---

## 4. Dijkstra's Algorithm

::tabs-start

```python
class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        N = len(grid)
        visit = set()
        minH = [[grid[0][0], 0, 0]]  # (time/max-height, r, c)
        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

        visit.add((0, 0))
        while minH:
            t, r, c = heapq.heappop(minH)
            if r == N - 1 and c == N - 1:
                return t
            for dr, dc in directions:
                neiR, neiC = r + dr, c + dc
                if (neiR < 0 or neiC < 0 or 
                    neiR == N or neiC == N or
                    (neiR, neiC) in visit
                ):
                    continue
                visit.add((neiR, neiC))
                heapq.heappush(minH, [max(t, grid[neiR][neiC]), neiR, neiC])
```

```java
public class Solution {
    public int swimInWater(int[][] grid) {
        int N = grid.length;
        boolean[][] visit = new boolean[N][N]; 
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(
            Comparator.comparingInt(a -> a[0])
        );
        int[][] directions = {
            {0, 1}, {0, -1}, {1, 0}, {-1, 0}
        };

        minHeap.offer(new int[]{grid[0][0], 0, 0});
        visit[0][0] = true; 

        while (!minHeap.isEmpty()) {
            int[] curr = minHeap.poll();
            int t = curr[0], r = curr[1], c = curr[2];
            if (r == N - 1 && c == N - 1) {
                return t; 
            }
            for (int[] dir : directions) {
                int neiR = r + dir[0], neiC = c + dir[1];
                if (neiR >= 0 && neiC >= 0 && neiR < N && 
                    neiC < N && !visit[neiR][neiC]) {
                    visit[neiR][neiC] = true; 
                    minHeap.offer(new int[]{
                        Math.max(t, grid[neiR][neiC]), 
                        neiR, neiC
                    });
                }
            }
        }
        return N * N; 
    }
}
```

```cpp
class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int N = grid.size();
        set<pair<int, int>> visit;
        priority_queue<vector<int>, 
                       vector<vector<int>>, greater<>> minHeap;
        vector<vector<int>> directions = {
            {0, 1}, {0, -1}, {1, 0}, {-1, 0}
        };

        minHeap.push({grid[0][0], 0, 0});
        visit.insert({0, 0});

        while (!minHeap.empty()) {
            auto curr = minHeap.top();
            minHeap.pop();
            int t = curr[0], r = curr[1], c = curr[2];
            if (r == N - 1 && c == N - 1) {
                return t;
            }
            for (const auto& dir : directions) {
                int neiR = r + dir[0], neiC = c + dir[1];
                if (neiR < 0 || neiC < 0 || neiR == N || 
                    neiC == N || visit.count({neiR, neiC})) {
                    continue;
                }
                visit.insert({neiR, neiC});
                minHeap.push({
                    max(t, grid[neiR][neiC]), neiR, neiC
                });
            }
        }

        return N * N;
    }
};
```

```javascript
/**
 * const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */

class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    swimInWater(grid) {
        const N = grid.length;
        const visit = new Set();
        const minPQ = new MinPriorityQueue(entry => entry[0]);
        const directions = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];

        minPQ.push([grid[0][0], 0, 0]);
        visit.add('0,0');

        while (!minPQ.isEmpty()) {
            const [t, r, c] = minPQ.pop();
            if (r === N - 1 && c === N - 1) {
                return t;
            }
            for (const [dr, dc] of directions) {
                const neiR = r + dr;
                const neiC = c + dc;
                if (
                    neiR < 0 ||
                    neiC < 0 ||
                    neiR >= N ||
                    neiC >= N ||
                    visit.has(`${neiR},${neiC}`)
                ) {
                    continue;
                }
                visit.add(`${neiR},${neiC}`);
                minPQ.push([
                    Math.max(t, grid[neiR][neiC]), neiR, neiC
                ]);
            }
        }
    }
}
```

```csharp
public class Solution {
    public int SwimInWater(int[][] grid) {
        int N = grid.Length;
        var visit = new HashSet<(int, int)>();
        var minHeap = new PriorityQueue<(int t, int r, int c), int>();
        int[][] directions = { 
            new int[]{0, 1}, new int[]{0, -1}, 
            new int[]{1, 0}, new int[]{-1, 0} 
        };

        minHeap.Enqueue((grid[0][0], 0, 0), grid[0][0]);
        visit.Add((0, 0));

        while (minHeap.Count > 0) {
            var curr = minHeap.Dequeue();
            int t = curr.t, r = curr.r, c = curr.c;
            if (r == N - 1 && c == N - 1) {
                return t;
            }
            foreach (var dir in directions) {
                int neiR = r + dir[0], neiC = c + dir[1];
                if (neiR < 0 || neiC < 0 || neiR >= N || 
                    neiC >= N || visit.Contains((neiR, neiC))) {
                    continue;
                }
                visit.Add((neiR, neiC));
                minHeap.Enqueue(
                    (Math.Max(t, grid[neiR][neiC]), neiR, neiC), 
                    Math.Max(t, grid[neiR][neiC]));
            }
        }

        return N * N;  
    }
}
```

```go
type Node struct {
    time, r, c int
}

func swimInWater(grid [][]int) int {
    N := len(grid)
    directions := [][2]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

    pq := priorityqueue.NewWith(func(a, b interface{}) int {
        return utils.IntComparator(a.(Node).time, b.(Node).time)
    })

    pq.Enqueue(Node{grid[0][0], 0, 0})
    visited := make(map[[2]int]bool)
    visited[[2]int{0, 0}] = true

    for !pq.Empty() {
        item, _ := pq.Dequeue()
        node := item.(Node)
        t, r, c := node.time, node.r, node.c

        if r == N-1 && c == N-1 {
            return t
        }

        for _, dir := range directions {
            neiR, neiC := r+dir[0], c+dir[1]
            if neiR < 0 || neiC < 0 || neiR >= N || neiC >= N || 
               visited[[2]int{neiR, neiC}] {
                continue
            }

            visited[[2]int{neiR, neiC}] = true
            pq.Enqueue(Node{max(t, grid[neiR][neiC]), neiR, neiC})
        }
    }

    return -1
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
    fun swimInWater(grid: Array<IntArray>): Int {
        val N = grid.size
        val directions = listOf(Pair(0, 1), Pair(0, -1), Pair(1, 0), Pair(-1, 0))
        
        val minHeap = PriorityQueue(compareBy<Pair<Int, Pair<Int, Int>>> { it.first })
        minHeap.offer(Pair(grid[0][0], Pair(0, 0)))
        
        val visited = HashSet<Pair<Int, Int>>()
        visited.add(Pair(0, 0))

        while (minHeap.isNotEmpty()) {
            val (t, pos) = minHeap.poll()
            val (r, c) = pos

            if (r == N - 1 && c == N - 1) return t

            for ((dr, dc) in directions) {
                val neiR = r + dr
                val neiC = c + dc
                if (neiR !in 0 until N || neiC !in 0 until N || Pair(neiR, neiC) in visited) {
                    continue
                }

                visited.add(Pair(neiR, neiC))
                minHeap.offer(Pair(maxOf(t, grid[neiR][neiC]), Pair(neiR, neiC)))
            }
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 \log n)$
* Space complexity: $O(n ^ 2)$

---

## 5. Kruskal's Algorithm

::tabs-start

```python
class DSU:
    def __init__(self, n):
        self.Parent = list(range(n + 1))
        self.Size = [1] * (n + 1)

    def find(self, node):
        if self.Parent[node] != node:
            self.Parent[node] = self.find(self.Parent[node])
        return self.Parent[node]

    def union(self, u, v):
        pu = self.find(u)
        pv = self.find(v)
        if pu == pv:
            return False
        if self.Size[pu] < self.Size[pv]:
            pu, pv = pv, pu
        self.Size[pu] += self.Size[pv]
        self.Parent[pv] = pu
        return True
    
    def connected(self, u, v):
        return self.find(u) == self.find(v)

class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        N = len(grid)
        dsu = DSU(N * N)
        positions = sorted((grid[r][c], r, c) for r in range(N) for c in range(N))
        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        
        for t, r, c in positions:
            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < N and 0 <= nc < N and grid[nr][nc] <= t:
                    dsu.union(r * N + c, nr * N + nc)
            if dsu.connected(0, N * N - 1):
                return t
```

```java
public class DSU {
    private int[] Parent;
    private int[] Size;

    public DSU(int n) {
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) Parent[i] = i;
        Arrays.fill(Size, 1);
    }

    public int find(int node) {
        if (Parent[node] != node)
            Parent[node] = find(Parent[node]);
        return Parent[node];
    }

    public boolean union(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (Size[pu] < Size[pv]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }

    public boolean connected(int u, int v) {
        return find(u) == find(v);
    }
}

public class Solution {
    public int swimInWater(int[][] grid) {
        int N = grid.length;
        DSU dsu = new DSU(N * N);
        List<int[]> positions = new ArrayList<>();
        for (int r = 0; r < N; r++)
            for (int c = 0; c < N; c++)
                positions.add(new int[]{grid[r][c], r, c});
        positions.sort(Comparator.comparingInt(a -> a[0]));
        int[][] directions = {
            {0, 1}, {1, 0}, {0, -1}, {-1, 0}
        };

        for (int[] pos : positions) {
            int t = pos[0], r = pos[1], c = pos[2];
            for (int[] dir : directions) {
                int nr = r + dir[0], nc = c + dir[1];
                if (nr >= 0 && nr < N && nc >= 0 && 
                    nc < N && grid[nr][nc] <= t) {
                    dsu.union(r * N + c, nr * N + nc);
                }
            }
            if (dsu.connected(0, N * N - 1)) return t;
        }
        return N * N;
    }
}
```

```cpp
class DSU {
    vector<int> Parent, Size;
public:
    DSU(int n) : Parent(n + 1), Size(n + 1, 1) {
        for (int i = 0; i <= n; i++) Parent[i] = i;
    }

    int find(int node) {
        if (Parent[node] != node)
            Parent[node] = find(Parent[node]);
        return Parent[node];
    }

    bool unionSets(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (Size[pu] < Size[pv]) swap(pu, pv);
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }

    bool connected(int u, int v) {
        return find(u) == find(v);
    }
};

class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int N = grid.size();
        DSU dsu(N * N);
        vector<tuple<int, int, int>> positions;
        for (int r = 0; r < N; r++)
            for (int c = 0; c < N; c++)
                positions.emplace_back(grid[r][c], r, c);

        sort(positions.begin(), positions.end());
        vector<pair<int, int>> directions = {
            {0, 1}, {1, 0}, {0, -1}, {-1, 0}
        };

        for (auto& [t, r, c] : positions) {
            for (auto& [dr, dc] : directions) {
                int nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < N && nc >= 0 && 
                    nc < N && grid[nr][nc] <= t) {
                    dsu.unionSets(r * N + c, nr * N + nc);
                }
            }
            if (dsu.connected(0, N * N - 1)) return t;
        }
        return N * N;
    }
};
```

```javascript
class DSU {
    constructor(n) {
        this.Parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.Size = Array(n + 1).fill(1);
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node) {
        if (this.Parent[node] !== node) {
            this.Parent[node] = this.find(this.Parent[node]);
        }
        return this.Parent[node];
    }

    /**
     * @param {number} u
     * @param {number} v
     * @return {boolean}
     */
    union(u, v) {
        let pu = this.find(u), pv = this.find(v);
        if (pu === pv) return false;
        if (this.Size[pu] < this.Size[pv]) [pu, pv] = [pv, pu];
        this.Size[pu] += this.Size[pv];
        this.Parent[pv] = pu;
        return true;
    }

    /**
     * @param {number} n
     * @param {number} n
     * @return {boolean}
     */
    connected(u, v) {
        return this.find(u) == this.find(v);
    }
}

class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    swimInWater(grid) {
        const N = grid.length;
        const dsu = new DSU(N * N);
        const positions = [];
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                positions.push([grid[r][c], r, c]);
            }
        }
        positions.sort((a, b) => a[0] - b[0]);
        const directions = [
            [0, 1], [1, 0], [0, -1], [-1, 0]
        ];

        for (const [t, r, c] of positions) {
            for (const [dr, dc] of directions) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < N && nc >= 0 && 
                    nc < N && grid[nr][nc] <= t) {
                    dsu.union(r * N + c, nr * N + nc);
                }
            }
            if (dsu.connected(0, N * N - 1)) return t;
        }
        return N * N;
    }
}
```

```csharp
public class DSU {
    private int[] Parent, Size;

    public DSU(int n) {
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) Parent[i] = i;
        Array.Fill(Size, 1);
    }

    public int Find(int node) {
        if (Parent[node] != node)
            Parent[node] = Find(Parent[node]);
        return Parent[node];
    }

    public bool Union(int u, int v) {
        int pu = Find(u), pv = Find(v);
        if (pu == pv) return false;
        if (Size[pu] < Size[pv]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }

    public bool Connected(int u, int v) {
        return Find(u) == Find(v);
    }
}

public class Solution {
    public int SwimInWater(int[][] grid) {
        int N = grid.Length;
        DSU dsu = new DSU(N * N);
        List<int[]> positions = new List<int[]>();
        for (int r = 0; r < N; r++)
            for (int c = 0; c < N; c++)
                positions.Add(new int[] {grid[r][c], r, c});
        positions.Sort((a, b) => a[0] - b[0]);
        int[][] directions = new int[][] { 
            new int[] {0, 1}, new int[] {1, 0}, 
            new int[] {0, -1}, new int[] {-1, 0} 
        };

        foreach (var pos in positions) {
            int t = pos[0], r = pos[1], c = pos[2];
            foreach (var dir in directions) {
                int nr = r + dir[0], nc = c + dir[1];
                if (nr >= 0 && nr < N && nc >= 0 && 
                    nc < N && grid[nr][nc] <= t) {
                    dsu.Union(r * N + c, nr * N + nc);
                }
            }
            if (dsu.Connected(0, N * N - 1)) return t;
        }
        return N * N;
    }
}
```

```go
type DSU struct {
    Parent, Size []int
}

func NewDSU(n int) *DSU {
    dsu := &DSU{
        Parent: make([]int, n+1),
        Size:   make([]int, n+1),
    }
    for i := 0; i <= n; i++ {
        dsu.Parent[i] = i
        dsu.Size[i] = 1
    }
    return dsu
}

func (dsu *DSU) Find(node int) int {
    if dsu.Parent[node] != node {
        dsu.Parent[node] = dsu.Find(dsu.Parent[node])
    }
    return dsu.Parent[node]
}

func (dsu *DSU) Union(u, v int) bool {
    pu, pv := dsu.Find(u), dsu.Find(v)
    if pu == pv {
        return false
    }
    if dsu.Size[pu] < dsu.Size[pv] {
        pu, pv = pv, pu
    }
    dsu.Size[pu] += dsu.Size[pv]
    dsu.Parent[pv] = pu
    return true
}

func (dsu *DSU) Connected(u, v int) bool {
    return dsu.Find(u) == dsu.Find(v)
}

func swimInWater(grid [][]int) int {
    N := len(grid)
    dsu := NewDSU(N * N)
    positions := make([][3]int, 0, N*N)
    for r := 0; r < N; r++ {
        for c := 0; c < N; c++ {
            positions = append(positions, [3]int{grid[r][c], r, c})
        }
    }
    sort.Slice(positions, func(i, j int) bool { 
        return positions[i][0] < positions[j][0] 
    })
    directions := [][2]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}

    for _, pos := range positions {
        t, r, c := pos[0], pos[1], pos[2]
        for _, d := range directions {
            nr, nc := r+d[0], c+d[1]
            if nr >= 0 && nc >= 0 && nr < N && nc < N && grid[nr][nc] <= t {
                dsu.Union(r*N+c, nr*N+nc)
            }
        }
        if dsu.Connected(0, N*N-1) {
            return t
        }
    }
    return -1
}
```

```kotlin
class DSU(n: Int) {
    private val parent = IntArray(n + 1) { it }
    private val size = IntArray(n + 1) { 1 }

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
        if (size[pu] < size[pv]) {
            val temp = pu
            pu = pv
            pv = temp
        }
        size[pu] += size[pv]
        parent[pv] = pu
        return true
    }

    fun connected(u: Int, v: Int): Boolean {
        return find(u) == find(v)
    }
}

class Solution {
    fun swimInWater(grid: Array<IntArray>): Int {
        val N = grid.size
        val dsu = DSU(N * N)
        val positions = mutableListOf<Triple<Int, Int, Int>>()
        for (r in grid.indices) {
            for (c in grid[r].indices) {
                positions.add(Triple(grid[r][c], r, c))
            }
        }
        positions.sortBy { it.first }
        val directions = listOf(Pair(0, 1), Pair(1, 0), Pair(0, -1), Pair(-1, 0))

        for ((t, r, c) in positions) {
            for ((dr, dc) in directions) {
                val nr = r + dr
                val nc = c + dc
                if (nr in 0 until N && nc in 0 until N && grid[nr][nc] <= t) {
                    dsu.union(r * N + c, nr * N + nc)
                }
            }
            if (dsu.connected(0, N * N - 1)) {
                return t
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 \log n)$
* Space complexity: $O(n ^ 2)$