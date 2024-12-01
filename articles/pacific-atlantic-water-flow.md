## 1. Brute Force (Backtracking)

::tabs-start

```python
class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(heights), len(heights[0])
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        pacific = atlantic = False

        def dfs(r, c, prevVal):
            nonlocal pacific, atlantic
            if r < 0 or c < 0:
                pacific = True
                return
            if r >= ROWS or c >= COLS:
                atlantic = True
                return
            if heights[r][c] > prevVal:
                return

            tmp = heights[r][c]
            heights[r][c] = float('inf')
            for dx, dy in directions:
                dfs(r + dx, c + dy, tmp)
                if pacific and atlantic:
                    break
            heights[r][c] = tmp

        res = []
        for r in range(ROWS):
            for c in range(COLS):
                pacific = False
                atlantic = False
                dfs(r, c, float('inf'))
                if pacific and atlantic:
                    res.append([r, c])
        return res
```

```java
public class Solution {
    int ROWS, COLS;
    boolean pacific, atlantic;
    int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        ROWS = heights.length;
        COLS = heights[0].length;
        List<List<Integer>> res = new ArrayList<>();

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                pacific = false;
                atlantic = false;
                dfs(heights, r, c, Integer.MAX_VALUE);
                if (pacific && atlantic) {
                    res.add(Arrays.asList(r, c));
                }
            }
        }
        return res;
    }

    private void dfs(int[][] heights, int r, int c, int prevVal) {
        if (r < 0 || c < 0) {
            pacific = true;
            return;
        }
        if (r >= ROWS || c >= COLS) {
            atlantic = true;
            return;
        }
        if (heights[r][c] > prevVal) {
            return;
        }

        int tmp = heights[r][c];
        heights[r][c] = Integer.MAX_VALUE;
        for (int[] dir : directions) {
            dfs(heights, r + dir[0], c + dir[1], tmp);
            if (pacific && atlantic) {
                break;
            }
        }
        heights[r][c] = tmp;
    }
}
```

```cpp
class Solution {
public:
    int ROWS, COLS;
    bool pacific, atlantic;
    vector<vector<int>> directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        ROWS = heights.size();
        COLS = heights[0].size();
        vector<vector<int>> res;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                pacific = false;
                atlantic = false;
                dfs(heights, r, c, INT_MAX);
                if (pacific && atlantic) {
                    res.push_back({r, c});
                }
            }
        }

        return res;
    }

    void dfs(vector<vector<int>>& heights, int r, int c, int prevVal) {
        if (r < 0 || c < 0) {
            pacific = true;
            return;
        }
        if (r >= ROWS || c >= COLS) {
            atlantic = true;
            return;
        }
        if (heights[r][c] > prevVal) {
            return;
        }

        int tmp = heights[r][c];
        heights[r][c] = INT_MAX;
        for (auto& dir : directions) {
            dfs(heights, r + dir[0], c + dir[1], tmp);
            if (pacific && atlantic) {
                break;
            }
        }
        heights[r][c] = tmp;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    pacificAtlantic(heights) {
        let ROWS = heights.length, COLS = heights[0].length;
        let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        let pacific = false, atlantic = false;

        const dfs = (r, c, prevVal) => {
            if (r < 0 || c < 0) {
                pacific = true;
                return;
            }
            if (r >= ROWS || c >= COLS) {
                atlantic = true;
                return;
            }
            if (heights[r][c] > prevVal) {
                return;
            }

            let tmp = heights[r][c];
            heights[r][c] = Infinity;
            for (let [dx, dy] of directions) {
                dfs(r + dx, c + dy, tmp);
                if (pacific && atlantic) {
                    break;
                }
            }
            heights[r][c] = tmp;
        };

        let res = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                pacific = false;
                atlantic = false;
                dfs(r, c, Infinity);
                if (pacific && atlantic) {
                    res.push([r, c]);
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    int ROWS, COLS;
    bool pacific, atlantic;
    int[][] directions = new int[][] {
        new int[] {1, 0}, new int[] {-1, 0}, new int[] {0, 1}, new int[] {0, -1}
    };

    public List<List<int>> PacificAtlantic(int[][] heights) {
        ROWS = heights.Length;
        COLS = heights[0].Length;
        List<List<int>> res = new List<List<int>>();

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                pacific = false;
                atlantic = false;
                Dfs(heights, r, c, int.MaxValue);
                if (pacific && atlantic) {
                    res.Add(new List<int>{r, c});
                }
            }
        }
        return res;
    }

    private void Dfs(int[][] heights, int r, int c, int prevVal) {
        if (r < 0 || c < 0) {
            pacific = true;
            return;
        }
        if (r >= ROWS || c >= COLS) {
            atlantic = true;
            return;
        }
        if (heights[r][c] > prevVal) {
            return;
        }

        int tmp = heights[r][c];
        heights[r][c] = int.MaxValue;
        foreach (var dir in directions) {
            Dfs(heights, r + dir[0], c + dir[1], tmp);
            if (pacific && atlantic) {
                break;
            }
        }
        heights[r][c] = tmp;
    }
}
```

```go
func pacificAtlantic(heights [][]int) [][]int {
    rows, cols := len(heights), len(heights[0])
    directions := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
    result := make([][]int, 0)
    
    var pacific, atlantic bool
    
    var dfs func(r, c int, prevVal int)
    dfs = func(r, c int, prevVal int) {
        if r < 0 || c < 0 {
            pacific = true
            return
        }
        if r >= rows || c >= cols {
            atlantic = true
            return
        }
        if heights[r][c] > prevVal {
            return
        }
        
        tmp := heights[r][c]
        heights[r][c] = int(^uint(0) >> 1)
        
        for _, dir := range directions {
            dfs(r + dir[0], c + dir[1], tmp)
            if pacific && atlantic {
                break
            }
        }
        heights[r][c] = tmp
    }
    
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            pacific = false
            atlantic = false
            dfs(r, c, int(^uint(0) >> 1))
            if pacific && atlantic {
                result = append(result, []int{r, c})
            }
        }
    }
    
    return result
}
```

```kotlin
class Solution {
    private var pacific = false
    private var atlantic = false
    private val directions = arrayOf(
        intArrayOf(1, 0),
        intArrayOf(-1, 0),
        intArrayOf(0, 1),
        intArrayOf(0, -1)
    )
    
    fun pacificAtlantic(heights: Array<IntArray>): List<List<Int>> {
        val rows = heights.size
        val cols = heights[0].size
        val result = mutableListOf<List<Int>>()
        
        fun dfs(r: Int, c: Int, prevVal: Int) {
            when {
                r < 0 || c < 0 -> {
                    pacific = true
                    return
                }
                r >= rows || c >= cols -> {
                    atlantic = true
                    return
                }
                heights[r][c] > prevVal -> return
            }
            
            val tmp = heights[r][c]
            heights[r][c] = Int.MAX_VALUE
            
            for (dir in directions) {
                dfs(r + dir[0], c + dir[1], tmp)
                if (pacific && atlantic) break
            }
            heights[r][c] = tmp
        }
        
        for (r in 0 until rows) {
            for (c in 0 until cols) {
                pacific = false
                atlantic = false
                dfs(r, c, Int.MAX_VALUE)
                if (pacific && atlantic) {
                    result.add(listOf(r, c))
                }
            }
        }
        
        return result
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n * 4 ^ {m * n})$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Depth First Search

::tabs-start

```python
class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(heights), len(heights[0])
        pac, atl = set(), set()

        def dfs(r, c, visit, prevHeight):
            if ((r, c) in visit or 
                r < 0 or c < 0 or 
                r == ROWS or c == COLS or 
                heights[r][c] < prevHeight
            ):
                return
            visit.add((r, c))
            dfs(r + 1, c, visit, heights[r][c])
            dfs(r - 1, c, visit, heights[r][c])
            dfs(r, c + 1, visit, heights[r][c])
            dfs(r, c - 1, visit, heights[r][c])

        for c in range(COLS):
            dfs(0, c, pac, heights[0][c])
            dfs(ROWS - 1, c, atl, heights[ROWS - 1][c])

        for r in range(ROWS):
            dfs(r, 0, pac, heights[r][0])
            dfs(r, COLS - 1, atl, heights[r][COLS - 1])

        res = []
        for r in range(ROWS):
            for c in range(COLS):
                if (r, c) in pac and (r, c) in atl:
                    res.append([r, c])
        return res
```

```java
public class Solution {
    private int[][] directions = {{1, 0}, {-1, 0}, 
                                  {0, 1}, {0, -1}};
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        int ROWS = heights.length, COLS = heights[0].length;
        boolean[][] pac = new boolean[ROWS][COLS];
        boolean[][] atl = new boolean[ROWS][COLS];

        for (int c = 0; c < COLS; c++) {
            dfs(0, c, pac, heights);
            dfs(ROWS - 1, c, atl, heights);
        }
        for (int r = 0; r < ROWS; r++) {
            dfs(r, 0, pac, heights);
            dfs(r, COLS - 1, atl, heights);
        }

        List<List<Integer>> res = new ArrayList<>();
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (pac[r][c] && atl[r][c]) {
                    res.add(Arrays.asList(r, c));
                }
            }
        }
        return res;
    }

    private void dfs(int r, int c, boolean[][] ocean, int[][] heights) {
        ocean[r][c] = true;
        for (int[] d : directions) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < heights.length && 
                nc >= 0 && nc < heights[0].length && 
                !ocean[nr][nc] && heights[nr][nc] >= heights[r][c]) {
                dfs(nr, nc, ocean, heights);
            }
        }
    }
}
```

```cpp
class Solution {
    vector<pair<int, int>> directions = {{1, 0}, {-1, 0}, 
                                         {0, 1}, {0, -1}};
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        int ROWS = heights.size(), COLS = heights[0].size();
        vector<vector<bool>> pac(ROWS, vector<bool>(COLS, false));
        vector<vector<bool>> atl(ROWS, vector<bool>(COLS, false));

        for (int c = 0; c < COLS; ++c) {
            dfs(0, c, pac, heights);
            dfs(ROWS - 1, c, atl, heights);
        }
        for (int r = 0; r < ROWS; ++r) {
            dfs(r, 0, pac, heights);
            dfs(r, COLS - 1, atl, heights);
        }

        vector<vector<int>> res;
        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                if (pac[r][c] && atl[r][c]) {
                    res.push_back({r, c});
                }
            }
        }
        return res;
    }

private:
    void dfs(int r, int c, vector<vector<bool>>& ocean, vector<vector<int>>& heights) {
        ocean[r][c] = true;
        for (auto [dr, dc] : directions) {
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < heights.size() && 
                nc >= 0 && nc < heights[0].size() && 
                !ocean[nr][nc] && heights[nr][nc] >= heights[r][c]) {
                dfs(nr, nc, ocean, heights);
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    pacificAtlantic(heights) {
        let ROWS = heights.length, COLS = heights[0].length;
        let pac = Array.from({ length: ROWS }, () => 
                  Array(COLS).fill(false));
        let atl = Array.from({ length: ROWS }, () => 
                  Array(COLS).fill(false));

        const dfs = (r, c, ocean) => {
            ocean[r][c] = true;
            let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
            for (let [dr, dc] of directions) {
                let nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < ROWS && nc >= 0 && 
                    nc < COLS && !ocean[nr][nc] && 
                    heights[nr][nc] >= heights[r][c]) {
                    dfs(nr, nc, ocean);
                }
            }
        }

        for (let c = 0; c < COLS; c++) {
            dfs(0, c, pac);
            dfs(ROWS - 1, c, atl);
        }
        for (let r = 0; r < ROWS; r++) {
            dfs(r, 0, pac);
            dfs(r, COLS - 1, atl);
        }

        let res = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (pac[r][c] && atl[r][c]) {
                    res.push([r, c]);
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private int[][] directions = new int[][] { 
        new int[] { 1, 0 }, new int[] { -1, 0 }, 
        new int[] { 0, 1 }, new int[] { 0, -1 } 
    };
    public List<List<int>> PacificAtlantic(int[][] heights) {
        int ROWS = heights.Length, COLS = heights[0].Length;
        bool[,] pac = new bool[ROWS, COLS];
        bool[,] atl = new bool[ROWS, COLS];

        for (int c = 0; c < COLS; c++) {
            Dfs(0, c, pac, heights);
            Dfs(ROWS - 1, c, atl, heights);
        }
        for (int r = 0; r < ROWS; r++) {
            Dfs(r, 0, pac, heights);
            Dfs(r, COLS - 1, atl, heights);
        }

        List<List<int>> res = new List<List<int>>();
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (pac[r, c] && atl[r, c]) {
                    res.Add(new List<int> { r, c });
                }
            }
        }
        return res;
    }

    private void Dfs(int r, int c, bool[,] ocean, int[][] heights) {
        ocean[r, c] = true;
        foreach (var dir in directions) {
            int nr = r + dir[0], nc = c + dir[1];
            if (nr >= 0 && nr < heights.Length && nc >= 0 && 
                nc < heights[0].Length && !ocean[nr, nc] && 
                heights[nr][nc] >= heights[r][c]) {
                Dfs(nr, nc, ocean, heights);
            }
        }
    }
}
```

```go
func pacificAtlantic(heights [][]int) [][]int {
    rows, cols := len(heights), len(heights[0])
    pac := make(map[[2]int]bool)
    atl := make(map[[2]int]bool)
    
    var dfs func(r, c int, visit map[[2]int]bool, prevHeight int)
    dfs = func(r, c int, visit map[[2]int]bool, prevHeight int) {
        coord := [2]int{r, c}
        if visit[coord] ||
           r < 0 || c < 0 ||
           r == rows || c == cols ||
           heights[r][c] < prevHeight {
            return
        }
        
        visit[coord] = true
        
        dfs(r+1, c, visit, heights[r][c])
        dfs(r-1, c, visit, heights[r][c])
        dfs(r, c+1, visit, heights[r][c])
        dfs(r, c-1, visit, heights[r][c])
    }
    
    for c := 0; c < cols; c++ {
        dfs(0, c, pac, heights[0][c])
        dfs(rows-1, c, atl, heights[rows-1][c])
    }
    
    for r := 0; r < rows; r++ {
        dfs(r, 0, pac, heights[r][0])
        dfs(r, cols-1, atl, heights[r][cols-1])
    }
    
    result := make([][]int, 0)
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            coord := [2]int{r, c}
            if pac[coord] && atl[coord] {
                result = append(result, []int{r, c})
            }
        }
    }
    
    return result
}
```

```kotlin
class Solution {
    fun pacificAtlantic(heights: Array<IntArray>): List<List<Int>> {
        val rows = heights.size
        val cols = heights[0].size
        val pac = HashSet<Pair<Int, Int>>()
        val atl = HashSet<Pair<Int, Int>>()
        
        fun dfs(r: Int, c: Int, visit: HashSet<Pair<Int, Int>>, prevHeight: Int) {
            val coord = r to c
            if (coord in visit ||
                r < 0 || c < 0 ||
                r == rows || c == cols ||
                heights[r][c] < prevHeight
            ) {
                return
            }
            
            visit.add(coord)
            
            dfs(r + 1, c, visit, heights[r][c])
            dfs(r - 1, c, visit, heights[r][c])
            dfs(r, c + 1, visit, heights[r][c])
            dfs(r, c - 1, visit, heights[r][c])
        }
        
        for (c in 0 until cols) {
            dfs(0, c, pac, heights[0][c])
            dfs(rows - 1, c, atl, heights[rows - 1][c])
        }
        
        for (r in 0 until rows) {
            dfs(r, 0, pac, heights[r][0])
            dfs(r, cols - 1, atl, heights[r][cols - 1])
        }
        
        return (0 until rows).flatMap { r ->
            (0 until cols).mapNotNull { c ->
                if ((r to c) in pac && (r to c) in atl) {
                    listOf(r, c)
                } else null
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 3. Breadth First Search

::tabs-start

```python
class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(heights), len(heights[0])
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        pac = [[False] * COLS for _ in range(ROWS)]
        atl = [[False] * COLS for _ in range(ROWS)]

        def bfs(source, ocean):
            q = deque(source)
            while q:
                r, c = q.popleft()
                ocean[r][c] = True
                for dr, dc in directions:
                    nr, nc = r + dr, c + dc
                    if (0 <= nr < ROWS and 0 <= nc < COLS and 
                        not ocean[nr][nc] and 
                        heights[nr][nc] >= heights[r][c]
                    ):
                        q.append((nr, nc))

        pacific = []
        atlantic = []
        for c in range(COLS):
            pacific.append((0, c))
            atlantic.append((ROWS - 1, c))

        for r in range(ROWS):
            pacific.append((r, 0))
            atlantic.append((r, COLS - 1))
            
        bfs(pacific, pac)
        bfs(atlantic, atl)

        res = []
        for r in range(ROWS):
            for c in range(COLS):
                if pac[r][c] and atl[r][c]:
                    res.append([r, c])
        return res
```

```java
public class Solution {
    private int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        int ROWS = heights.length, COLS = heights[0].length;
        boolean[][] pac = new boolean[ROWS][COLS];
        boolean[][] atl = new boolean[ROWS][COLS];
        
        Queue<int[]> pacQueue = new LinkedList<>();
        Queue<int[]> atlQueue = new LinkedList<>();
        
        for (int c = 0; c < COLS; c++) {
            pacQueue.add(new int[]{0, c});
            atlQueue.add(new int[]{ROWS - 1, c});
        }
        for (int r = 0; r < ROWS; r++) {
            pacQueue.add(new int[]{r, 0});
            atlQueue.add(new int[]{r, COLS - 1});
        }
        
        bfs(pacQueue, pac, heights);
        bfs(atlQueue, atl, heights);
        
        List<List<Integer>> res = new ArrayList<>();
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (pac[r][c] && atl[r][c]) {
                    res.add(Arrays.asList(r, c));
                }
            }
        }
        return res;
    }
    
    private void bfs(Queue<int[]> q, boolean[][] ocean, int[][] heights) {
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int r = cur[0], c = cur[1];
            ocean[r][c] = true;
            for (int[] d : directions) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < heights.length && nc >= 0 && 
                    nc < heights[0].length && !ocean[nr][nc] && 
                    heights[nr][nc] >= heights[r][c]) {
                    q.add(new int[]{nr, nc});
                }
            }
        }
    }
}
```

```cpp
class Solution {
    vector<pair<int, int>> directions = {{1, 0}, {-1, 0}, 
                                         {0, 1}, {0, -1}};
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        int ROWS = heights.size(), COLS = heights[0].size();
        vector<vector<bool>> pac(ROWS, vector<bool>(COLS, false));
        vector<vector<bool>> atl(ROWS, vector<bool>(COLS, false));
        
        queue<pair<int, int>> pacQueue, atlQueue;
        
        for (int c = 0; c < COLS; ++c) {
            pacQueue.push({0, c});
            atlQueue.push({ROWS - 1, c});
        }
        for (int r = 0; r < ROWS; ++r) {
            pacQueue.push({r, 0});
            atlQueue.push({r, COLS - 1});
        }

        bfs(pacQueue, pac, heights);
        bfs(atlQueue, atl, heights);

        vector<vector<int>> res;
        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                if (pac[r][c] && atl[r][c]) {
                    res.push_back({r, c});
                }
            }
        }
        return res;
    }

private:
    void bfs(queue<pair<int, int>>& q, vector<vector<bool>>& ocean, 
                                        vector<vector<int>>& heights) {
        while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            ocean[r][c] = true;
            for (auto [dr, dc] : directions) {
                int nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < heights.size() && nc >= 0 && 
                    nc < heights[0].size() && !ocean[nr][nc] && 
                    heights[nr][nc] >= heights[r][c]) {
                    q.push({nr, nc});
                }
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    pacificAtlantic(heights) {
        let ROWS = heights.length, COLS = heights[0].length;
        let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        let pac = Array.from({ length: ROWS }, () => 
                  Array(COLS).fill(false));
        let atl = Array.from({ length: ROWS }, () => 
                  Array(COLS).fill(false));

        let pacQueue = new Queue()
        let atlQueue = new Queue();
        for (let c = 0; c < COLS; c++) {
            pacQueue.push([0, c]);
            atlQueue.push([ROWS - 1, c]);
        }
        for (let r = 0; r < ROWS; r++) {
            pacQueue.push([r, 0]);
            atlQueue.push([r, COLS - 1]);
        }

        const bfs = (queue, ocean, heights) => {
            while (!queue.isEmpty()) {
                let [r, c] = queue.pop();
                ocean[r][c] = true;
                for (let [dr, dc] of directions) {
                    let nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && 
                        nc < COLS && !ocean[nr][nc] && 
                        heights[nr][nc] >= heights[r][c]) {
                        queue.push([nr, nc]);
                    }
                }
            }
        }
        bfs(pacQueue, pac, heights);
        bfs(atlQueue, atl, heights);

        let res = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (pac[r][c] && atl[r][c]) {
                    res.push([r, c]);
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private int[][] directions = new int[][] { 
        new int[] { 1, 0 }, new int[] { -1, 0 }, 
        new int[] { 0, 1 }, new int[] { 0, -1 } 
    };
    public List<List<int>> PacificAtlantic(int[][] heights) {
        int ROWS = heights.Length, COLS = heights[0].Length;
        bool[,] pac = new bool[ROWS, COLS];
        bool[,] atl = new bool[ROWS, COLS];

        Queue<int[]> pacQueue = new Queue<int[]>();
        Queue<int[]> atlQueue = new Queue<int[]>();

        for (int c = 0; c < COLS; c++) {
            pacQueue.Enqueue(new int[] { 0, c });
            atlQueue.Enqueue(new int[] { ROWS - 1, c });
        }
        for (int r = 0; r < ROWS; r++) {
            pacQueue.Enqueue(new int[] { r, 0 });
            atlQueue.Enqueue(new int[] { r, COLS - 1 });
        }

        Bfs(pacQueue, pac, heights);
        Bfs(atlQueue, atl, heights);

        List<List<int>> res = new List<List<int>>();
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (pac[r, c] && atl[r, c]) {
                    res.Add(new List<int> { r, c });
                }
            }
        }
        return res;
    }

    private void Bfs(Queue<int[]> q, bool[,] ocean, int[][] heights) {
        while (q.Count > 0) {
            int[] cur = q.Dequeue();
            int r = cur[0], c = cur[1];
            ocean[r, c] = true;
            foreach (var dir in directions) {
                int nr = r + dir[0], nc = c + dir[1];
                if (nr >= 0 && nr < heights.Length && nc >= 0 && 
                    nc < heights[0].Length && !ocean[nr, nc] && 
                    heights[nr][nc] >= heights[r][c]) {
                    q.Enqueue(new int[] { nr, nc });
                }
            }
        }
    }
}
```

```go
func pacificAtlantic(heights [][]int) [][]int {
    rows, cols := len(heights), len(heights[0])
    directions := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
    
    pac := make([][]bool, rows)
    atl := make([][]bool, rows)
    for i := range pac {
        pac[i] = make([]bool, cols)
        atl[i] = make([]bool, cols)
    }

    bfs := func(source [][2]int, ocean [][]bool) {
        q := list.New()
        for _, s := range source {
            q.PushBack(s)
        }
        for q.Len() > 0 {
            element := q.Front()
            q.Remove(element)
            r, c := element.Value.([2]int)[0], element.Value.([2]int)[1]
            ocean[r][c] = true
            for _, dir := range directions {
                nr, nc := r+dir[0], c+dir[1]
                if nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                    !ocean[nr][nc] && heights[nr][nc] >= heights[r][c] {
                    q.PushBack([2]int{nr, nc})
                }
            }
        }
    }

    pacific := [][2]int{}
    atlantic := [][2]int{}
    for c := 0; c < cols; c++ {
        pacific = append(pacific, [2]int{0, c})
        atlantic = append(atlantic, [2]int{rows - 1, c})
    }
    for r := 0; r < rows; r++ {
        pacific = append(pacific, [2]int{r, 0})
        atlantic = append(atlantic, [2]int{r, cols - 1})
    }

    bfs(pacific, pac)
    bfs(atlantic, atl)

    res := [][]int{}
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if pac[r][c] && atl[r][c] {
                res = append(res, []int{r, c})
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun pacificAtlantic(heights: Array<IntArray>): List<List<Int>> {
        val rows = heights.size
        val cols = heights[0].size
        val directions = arrayOf(intArrayOf(1, 0), 
                                 intArrayOf(-1, 0), 
                                 intArrayOf(0, 1), 
                                 intArrayOf(0, -1))
        
        val pac = Array(rows) { BooleanArray(cols) }
        val atl = Array(rows) { BooleanArray(cols) }

        fun bfs(source: List<IntArray>, ocean: Array<BooleanArray>) {
            val q = LinkedList<IntArray>()
            q.addAll(source)
            while (q.isNotEmpty()) {
                val (r, c) = q.poll()
                ocean[r][c] = true
                for (dir in directions) {
                    val nr = r + dir[0]
                    val nc = c + dir[1]
                    if (nr in 0 until rows && nc in 0 until cols &&
                        !ocean[nr][nc] && heights[nr][nc] >= heights[r][c]) {
                        q.offer(intArrayOf(nr, nc))
                    }
                }
            }
        }

        val pacific = mutableListOf<IntArray>()
        val atlantic = mutableListOf<IntArray>()
        for (c in 0 until cols) {
            pacific.add(intArrayOf(0, c))
            atlantic.add(intArrayOf(rows - 1, c))
        }
        for (r in 0 until rows) {
            pacific.add(intArrayOf(r, 0))
            atlantic.add(intArrayOf(r, cols - 1))
        }

        bfs(pacific, pac)
        bfs(atlantic, atl)

        val result = mutableListOf<List<Int>>()
        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (pac[r][c] && atl[r][c]) {
                    result.add(listOf(r, c))
                }
            }
        }
        return result
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.