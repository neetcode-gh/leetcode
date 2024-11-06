## 1. Breadth First Search

::tabs-start

```python
class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        q = collections.deque()
        fresh = 0
        time = 0

        for r in range(len(grid)):
            for c in range(len(grid[0])):
                if grid[r][c] == 1:
                    fresh += 1
                if grid[r][c] == 2:
                    q.append((r, c))

        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        while fresh > 0 and q:
            length = len(q)
            for i in range(length):
                r, c = q.popleft()

                for dr, dc in directions:
                    row, col = r + dr, c + dc
                    if (row in range(len(grid))
                        and col in range(len(grid[0]))
                        and grid[row][col] == 1
                    ):
                        grid[row][col] = 2
                        q.append((row, col))
                        fresh -= 1
            time += 1
        return time if fresh == 0 else -1
```

```java
public class Solution {
    public int orangesRotting(int[][] grid) {
        Queue<int[]> q = new ArrayDeque<>();
        int fresh = 0;
        int time = 0;

        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == 1) {
                    fresh++;
                }
                if (grid[r][c] == 2) {
                    q.offer(new int[]{r, c});
                }
            }
        }

        int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        while (fresh > 0 && !q.isEmpty()) {
            int length = q.size();
            for (int i = 0; i < length; i++) {
                int[] curr = q.poll();
                int r = curr[0];
                int c = curr[1];

                for (int[] dir : directions) {
                    int row = r + dir[0];
                    int col = c + dir[1];
                    if (row >= 0 && row < grid.length && 
                        col >= 0 && col < grid[0].length &&
                        grid[row][col] == 1) {
                        grid[row][col] = 2;
                        q.offer(new int[]{row, col});
                        fresh--;
                    }
                }
            }
            time++;
        }
        return fresh == 0 ? time : -1;
    }
}
```

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        queue<pair<int, int>> q;
        int fresh = 0;
        int time = 0;

        for (int r = 0; r < grid.size(); r++) {
            for (int c = 0; c < grid[0].size(); c++) {
                if (grid[r][c] == 1) {
                    fresh++;
                }
                if (grid[r][c] == 2) {
                    q.push({r, c});
                }
            }
        }

        vector<pair<int, int>> directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        while (fresh > 0 && !q.empty()) {
            int length = q.size();
            for (int i = 0; i < length; i++) {
                auto curr = q.front();
                q.pop();
                int r = curr.first;
                int c = curr.second;

                for (const auto& dir : directions) {
                    int row = r + dir.first;
                    int col = c + dir.second;
                    if (row >= 0 && row < grid.size() && 
                        col >= 0 && col < grid[0].size() &&
                        grid[row][col] == 1) {
                        grid[row][col] = 2;
                        q.push({row, col});
                        fresh--;
                    }
                }
            }
            time++;
        }
        return fresh == 0 ? time : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    orangesRotting(grid) {
        const q = [];
        let fresh = 0;
        let time = 0;

        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[0].length; c++) {
                if (grid[r][c] === 1) {
                    fresh++;
                }
                if (grid[r][c] === 2) {
                    q.push([r, c]);
                }
            }
        }

        const directions = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
        while (fresh > 0 && q.length > 0) {
            const length = q.length;
            for (let i = 0; i < length; i++) {
                const [currR, currC] = q.shift();

                for (const [dr, dc] of directions) {
                    const row = currR + dr;
                    const col = currC + dc;
                    if (row >= 0 && row < grid.length &&
                        col >= 0 && col < grid[0].length &&
                        grid[row][col] === 1) {
                        grid[row][col] = 2;
                        q.push([row, col]);
                        fresh--;
                    }
                }
            }
            time++;
        }
        return fresh === 0 ? time : -1;
    }
}
```

```csharp
public class Solution {
    public int OrangesRotting(int[][] grid) {
        Queue<int[]> q = new Queue<int[]>();
        int fresh = 0;
        int time = 0;

        for (int r = 0; r < grid.Length; r++) {
            for (int c = 0; c < grid[0].Length; c++) {
                if (grid[r][c] == 1) {
                    fresh++;
                }
                if (grid[r][c] == 2) {
                    q.Enqueue(new int[] { r, c });
                }
            }
        }

        int[][] directions = { new int[] { 0, 1 }, new int[] { 0, -1 }, new int[] { 1, 0 }, new int[] { -1, 0 } };
        while (fresh > 0 && q.Count > 0) {
            int length = q.Count;
            for (int i = 0; i < length; i++) {
                int[] curr = q.Dequeue();
                int r = curr[0];
                int c = curr[1];

                foreach (int[] dir in directions) {
                    int row = r + dir[0];
                    int col = c + dir[1];
                    if (row >= 0 && row < grid.Length && 
                        col >= 0 && col < grid[0].Length &&
                        grid[row][col] == 1) {
                        grid[row][col] = 2;
                        q.Enqueue(new int[] { row, col });
                        fresh--;
                    }
                }
            }
            time++;
        }
        return fresh == 0 ? time : -1;
    }
}
```

```go
type Pair struct {
    row, col int
}

func orangesRotting(grid [][]int) int {
    rows, cols := len(grid), len(grid[0])
    queue := make([]Pair, 0)
    fresh := 0
    time := 0
    
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == 1 {
                fresh++
            }
            if grid[r][c] == 2 {
                queue = append(queue, Pair{r, c})
            }
        }
    }
    
    directions := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
    
    for fresh > 0 && len(queue) > 0 {
        length := len(queue)
        
        for i := 0; i < length; i++ {
            current := queue[0]
            queue = queue[1:] 
            
            for _, dir := range directions {
                newRow := current.row + dir[0]
                newCol := current.col + dir[1]
                
                if newRow >= 0 && newRow < rows &&
                   newCol >= 0 && newCol < cols &&
                   grid[newRow][newCol] == 1 {
                    grid[newRow][newCol] = 2
                    queue = append(queue, Pair{newRow, newCol})
                    fresh--
                }
            }
        }
        time++
    }
    
    if fresh == 0 {
        return time
    }
    return -1
}
```

```kotlin
class Solution {
    data class Pair(val row: Int, val col: Int)
    
    fun orangesRotting(grid: Array<IntArray>): Int {
        val rows = grid.size
        val cols = grid[0].size
        val queue = ArrayDeque<Pair>()
        var fresh = 0
        var time = 0
        
        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (grid[r][c] == 1) {
                    fresh++
                }
                if (grid[r][c] == 2) {
                    queue.addLast(Pair(r, c))
                }
            }
        }
        
        val directions = arrayOf(
            intArrayOf(0, 1),
            intArrayOf(0, -1),
            intArrayOf(1, 0),
            intArrayOf(-1, 0)
        )
        
        while (fresh > 0 && queue.isNotEmpty()) {
            val length = queue.size
            
            repeat(length) {
                val current = queue.removeFirst()
                
                for (dir in directions) {
                    val newRow = current.row + dir[0]
                    val newCol = current.col + dir[1]
                    
                    if (newRow in 0 until rows &&
                        newCol in 0 until cols &&
                        grid[newRow][newCol] == 1) {
                        grid[newRow][newCol] = 2
                        queue.addLast(Pair(newRow, newCol))
                        fresh--
                    }
                }
            }
            time++
        }
        
        return if (fresh == 0) time else -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the $grid$.

---

## 2. Breadth First Search (No Queue) 

::tabs-start

```python
class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        fresh = 0
        time = 0

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == 1:
                    fresh += 1

        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

        while fresh > 0:
            flag = False
            for r in range(ROWS):
                for c in range(COLS):
                    if grid[r][c] == 2:
                        for dr, dc in directions:
                            row, col = r + dr, c + dc
                            if (row in range(ROWS) and 
                                col in range(COLS) and 
                                grid[row][col] == 1):
                                grid[row][col] = 3  
                                fresh -= 1
                                flag = True

            if not flag:
                return -1

            for r in range(ROWS):
                for c in range(COLS):
                    if grid[r][c] == 3:
                        grid[r][c] = 2  

            time += 1

        return time
```

```java
public class Solution {
    public int orangesRotting(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int fresh = 0, time = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) fresh++;
            }
        }

        int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

        while (fresh > 0) {
            boolean flag = false;
            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (grid[r][c] == 2) {
                        for (int[] d : directions) {
                            int row = r + d[0], col = c + d[1];
                            if (row >= 0 && col >= 0 && 
                                row < ROWS && col < COLS && 
                                grid[row][col] == 1) {
                                grid[row][col] = 3;
                                fresh--;
                                flag = true;
                            }
                        }
                    }
                }
            }

            if (!flag) return -1;

            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (grid[r][c] == 3) grid[r][c] = 2;
                }
            }

            time++;
        }

        return time;
    }
}
```

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        int fresh = 0, time = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) fresh++;
            }
        }

        vector<vector<int>> directions = {{0, 1}, {0, -1}, 
                                          {1, 0}, {-1, 0}};

        while (fresh > 0) {
            bool flag = false;
            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (grid[r][c] == 2) {
                        for (auto& d : directions) {
                            int row = r + d[0], col = c + d[1];
                            if (row >= 0 && col >= 0 && 
                                row < ROWS && col < COLS && 
                                grid[row][col] == 1) {
                                grid[row][col] = 3;
                                fresh--;
                                flag = true;
                            }
                        }
                    }
                }
            }

            if (!flag) return -1;

            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (grid[r][c] == 3) grid[r][c] = 2;
                }
            }

            time++;
        }

        return time;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    orangesRotting(grid) {
        let ROWS = grid.length, COLS = grid[0].length;
        let fresh = 0, time = 0;

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1) fresh++;
            }
        }

        let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

        while (fresh > 0) {
            let flag = false;
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    if (grid[r][c] === 2) {
                        for (let [dr, dc] of directions) {
                            let row = r + dr, col = c + dc;
                            if (row >= 0 && col >= 0 && 
                                row < ROWS && col < COLS && 
                                grid[row][col] === 1) {
                                grid[row][col] = 3;
                                fresh--;
                                flag = true;
                            }
                        }
                    }
                }
            }

            if (!flag) return -1;

            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    if (grid[r][c] === 3) grid[r][c] = 2;
                }
            }

            time++;
        }

        return time;
    }
}
```

```csharp
public class Solution {
    public int OrangesRotting(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int fresh = 0, time = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) fresh++;
            }
        }

        int[][] directions = new int[][] {
            new int[] {0, 1}, new int[] {0, -1}, 
            new int[] {1, 0}, new int[] {-1, 0}
        };

        while (fresh > 0) {
            bool flag = false;
            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (grid[r][c] == 2) {
                        foreach (var d in directions) {
                            int row = r + d[0], col = c + d[1];
                            if (row >= 0 && col >= 0 && 
                                row < ROWS && col < COLS && 
                                grid[row][col] == 1) {
                                grid[row][col] = 3;
                                fresh--;
                                flag = true;
                            }
                        }
                    }
                }
            }

            if (!flag) return -1;

            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (grid[r][c] == 3) grid[r][c] = 2;
                }
            }

            time++;
        }

        return time;
    }
}
```

```go
func orangesRotting(grid [][]int) int {
    rows, cols := len(grid), len(grid[0])
    fresh := 0
    time := 0
    
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == 1 {
                fresh++
            }
        }
    }
    
    directions := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
    
    for fresh > 0 {
        flag := false
        for r := 0; r < rows; r++ {
            for c := 0; c < cols; c++ {
                if grid[r][c] == 2 {
                    for _, d := range directions {
                        row, col := r+d[0], c+d[1]
                        if row >= 0 && row < rows && 
                           col >= 0 && col < cols && 
                           grid[row][col] == 1 {
                            grid[row][col] = 3
                            fresh--
                            flag = true
                        }
                    }
                }
            }
        }
        
        if !flag {
            return -1
        }
        
        for r := 0; r < rows; r++ {
            for c := 0; c < cols; c++ {
                if grid[r][c] == 3 {
                    grid[r][c] = 2
                }
            }
        }
        time++
    }
    
    return time
}
```

```kotlin
class Solution {
    fun orangesRotting(grid: Array<IntArray>): Int {
        val rows = grid.size
        val cols = grid[0].size
        var fresh = 0
        var time = 0
        
        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (grid[r][c] == 1) fresh++
            }
        }
        
        val directions = arrayOf(
            intArrayOf(0, 1),
            intArrayOf(0, -1),
            intArrayOf(1, 0),
            intArrayOf(-1, 0)
        )
        
        while (fresh > 0) {
            var flag = false
            for (r in 0 until rows) {
                for (c in 0 until cols) {
                    if (grid[r][c] == 2) {
                        for (d in directions) {
                            val row = r + d[0]
                            val col = c + d[1]
                            if (row in 0 until rows && 
                                col in 0 until cols && 
                                grid[row][col] == 1) {
                                grid[row][col] = 3
                                fresh--
                                flag = true
                            }
                        }
                    }
                }
            }
            
            if (!flag) return -1
            
            for (r in 0 until rows) {
                for (c in 0 until cols) {
                    if (grid[r][c] == 3) grid[r][c] = 2
                }
            }
            time++
        }
        
        return time
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O((m * n) ^ 2)$
* Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns in the $grid$.