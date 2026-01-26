## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Breadth First Search (BFS)** - The core algorithm for finding shortest distances from each source to all reachable cells
- **Multi-source BFS** - Understanding how to run BFS from multiple starting points and accumulate distances
- **Graph Traversal on Grids** - 4-directional movement, boundary checking, and handling obstacles in 2D matrices
- **Distance Accumulation** - Tracking cumulative distances and reachability counts across multiple BFS runs

---

## 1. BFS from Empty Land to All Houses

### Intuition

For each empty land cell, we want to know the sum of distances to all houses. BFS from each empty cell finds the shortest path to each house. If an empty cell cannot reach all houses, we mark it as blocked to avoid checking it again in future iterations.

This approach works well when there are many houses but few empty cells.

### Algorithm

1. Count the total number of houses in the grid.
2. For each empty cell (value `0`):
   - Run `BFS` to find distances to all reachable houses.
   - Sum up the distances and count houses reached.
   - If not all houses are reachable, mark all visited empty cells as obstacles (value `2`) to prune future searches.
   - Otherwise, track the minimum total distance.
3. Return the minimum distance found, or `-1` if no valid cell exists.

::tabs-start

```python
class Solution:
    def shortestDistance(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        total_houses = 0
        for row in range(rows):
            for col in range(cols):
                if grid[row][col] == 1:
                    total_houses += 1

        def bfs(start_row, start_col):
            distance_sum = 0
            houses_reached = 0

            q = deque([(start_row, start_col)])
            vis = [[False] * cols for _ in range(rows)]
            vis[start_row][start_col] = True

            steps = 0
            while q and houses_reached != total_houses:
                for _ in range(len(q)):
                    row, col = q.popleft()

                    if grid[row][col] == 1:
                        distance_sum += steps
                        houses_reached += 1
                        continue

                    for dr, dc in dirs:
                        next_row, next_col = row + dr, col + dc
                        if 0 <= next_row < rows and 0 <= next_col < cols:
                            if not vis[next_row][next_col] and grid[next_row][next_col] != 2:
                                vis[next_row][next_col] = True
                                q.append((next_row, next_col))

                steps += 1

            if houses_reached != total_houses:
                for row in range(rows):
                    for col in range(cols):
                        if grid[row][col] == 0 and vis[row][col]:
                            grid[row][col] = 2
                return float('inf')

            return distance_sum

        min_distance = float('inf')
        for row in range(rows):
            for col in range(cols):
                if grid[row][col] == 0:
                    min_distance = min(min_distance, bfs(row, col))

        return -1 if min_distance == float('inf') else min_distance
```

```java
class Solution {
    private int bfs(int[][] grid, int row, int col, int totalHouses) {
        // Next four directions.
        int dirs[][] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        
        int rows = grid.length;
        int cols = grid[0].length;
        int distanceSum = 0;
        int housesReached = 0;
        
        // Queue to do a bfs, starting from (row, col) cell.
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{ row, col });
        
        // Keep track of visited cells.
        boolean[][] vis = new boolean[rows][cols];
        vis[row][col] = true;

        int steps = 0;
        while (!q.isEmpty() && housesReached != totalHouses) {
            for (int i = q.size(); i > 0; --i) {
                int[] curr = q.poll();
                row = curr[0];
                col = curr[1];
                
                // If this cell is a house, then add the distance from source to this cell
                // and we go past from this cell.
                if (grid[row][col] == 1) {
                    distanceSum += steps;
                    housesReached++;
                    continue;
                }
                
                // This cell was empty cell, hence traverse the next cells which is not a blockage.
                for (int[] dir : dirs) {
                    int nextRow = row + dir[0]; 
                    int nextCol = col + dir[1];
                    if (nextRow >= 0 && nextCol >= 0 && nextRow < rows && nextCol < cols) {
                        if (!vis[nextRow][nextCol] && grid[nextRow][nextCol] != 2) {
                            vis[nextRow][nextCol] = true;
                            q.offer(new int[]{ nextRow, nextCol });
                        }
                    }
                }
            }
            
            // After traversing one level of cells, increment the steps by 1 to reach to next level.
            steps++;
        }

        // If we did not reach all houses, then any cell visited also cannot reach all houses.
        // Set all cells visted to 2 so we do not check them again and return MAX_VALUE.
        if (housesReached != totalHouses) {
            for (row = 0; row < rows; row++) {
                for (col = 0; col < cols; col++) {
                    if (grid[row][col] == 0 && vis[row][col]) {
                        grid[row][col] = 2;
                    }
                }
            }
            return Integer.MAX_VALUE;
        }
        
        // If we have reached all houses then return the total distance calculated.
        return distanceSum;
    }
    
    public int shortestDistance(int[][] grid) {
        int minDistance = Integer.MAX_VALUE;
        int rows = grid.length; 
        int cols = grid[0].length;
        int totalHouses = 0;
        
        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {
                if (grid[row][col] == 1) {
                    totalHouses++;
                }
            }
        }
        
        // Find the min distance sum for each empty cell.
        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {
                if (grid[row][col] == 0) {
                    minDistance = Math.min(minDistance, bfs(grid, row, col, totalHouses));
                }
            }
        }
        
        // If it is impossible to reach all houses from any empty cell, then return -1.
        if (minDistance == Integer.MAX_VALUE) {
            return -1;
        }
        
        return minDistance;
    }
};
```

```cpp
class Solution {
private:
    int bfs(vector<vector<int>>& grid, int row, int col, int totalHouses) {
        // Next four directions.
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        
        int rows = grid.size();
        int cols = grid[0].size();
        int distanceSum = 0;
        int housesReached = 0;

        // Queue to do a bfs, starting from (r,c) cell
        queue<pair<int, int>> q;
        q.push({ row, col });

        // Keep track of visited cells
        vector<vector<bool>> vis(rows, vector<bool> (cols, false));
        vis[row][col] = true;

        int steps = 0;

        while (!q.empty() && housesReached != totalHouses) {
            for (int i = q.size(); i > 0; --i) {
                auto curr = q.front();
                q.pop();

                row = curr.first;
                col = curr.second;

                // If this cell is a house, then add the distance from the source to this cell
                // and we go past from this cell.
                if (grid[row][col] == 1) {
                    distanceSum += steps;
                    housesReached++;
                    continue;
                }

                // This cell was an empty cell, hence traverse the next cells which is not a blockage.
                for (auto& dir : dirs) {
                    int nextRow = row + dir[0];
                    int nextCol = col + dir[1];

                    if (nextRow >= 0 && nextCol >= 0 && nextRow < rows && nextCol < cols) {
                        if (!vis[nextRow][nextCol] && grid[nextRow][nextCol] != 2) {
                            vis[nextRow][nextCol] = true;
                            q.push({nextRow, nextCol});
                        }
                    }
                }
            }
            
            // After traversing one level cells, increment the steps by 1 to reach to next level.
            steps++;
        }

        // If we did not reach all houses, then any cell visited also cannot reach all houses.
        // Set all cells visted to 2 so we do not check them again and return INT_MAX.
        if (housesReached != totalHouses) {
            for (row = 0; row < rows; row++) {
                for (col = 0; col < cols; col++) {
                    if (grid[row][col] == 0 && vis[row][col]) {
                        grid[row][col] = 2;
                    }
                }
            }
            return INT_MAX;
        }
        // If we have reached all houses then return the total distance calculated.
        return distanceSum;
    }

public:
    int shortestDistance(vector<vector<int>>& grid) {
        int minDistance = INT_MAX;
        int rows = grid.size();
        int cols = grid[0].size();
        int totalHouses = 0;

        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {
                if (grid[row][col] == 1) { 
                    totalHouses++;
                }
            }
        }

        // Find the min distance sum for each empty cell.
        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {
                if (grid[row][col] == 0) {
                    minDistance = min(minDistance, bfs(grid, row, col, totalHouses));
                }
            }
        }

        // If it is impossible to reach all houses from any empty cell, then return -1.
        if (minDistance == INT_MAX) {
            return -1;
        }
        return minDistance;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    shortestDistance(grid) {
        let minDistance = Number.MAX_VALUE;
        let rows = grid.length;
        let cols = grid[0].length;
        let totalHouses = 0;

        for (let row = 0; row < rows; ++row) {
            for (let col = 0; col < cols; ++col) {
                if (grid[row][col] == 1) {
                    totalHouses++;
                }
            }
        }

        // Find the min distance sum for each empty cell.
        for (let row = 0; row < rows; ++row) {
            for (let col = 0; col < cols; ++col) {
                if (grid[row][col] == 0) {
                    minDistance = Math.min(minDistance, this.bfs(grid, row, col, totalHouses));
                }
            }
        }

        // If it is impossible to reach all houses from any empty cell, then return -1.
        if (minDistance == Number.MAX_VALUE) {
            return -1;
        }
        return minDistance;
    }

    bfs(grid, row, col, totalHouses) {
        // Next four directions.
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        let rows = grid.length;
        let cols = grid[0].length;
        let distanceSum = 0;
        let housesReached = 0;

        // Use a queue to do a bfs, starting from cell located at (row, col).
        // Using @datastructures-js/queue implementation
        let queue = new Queue([[row, col]]);

        // Keep track of visited cells.
        let vis = new Array(rows).fill(false).map(() => new Array(cols).fill(false));
        vis[row][col] = true;

        let steps = 0;

        while (!queue.isEmpty() && housesReached != totalHouses) {
            // Record the cells that we will explore in the next level
            let next_queue = new Queue();
            let currentLevelSize = queue.size();

            for (let i = 0; i < currentLevelSize; i++) {
                let curr = queue.dequeue();
                let currRow = curr[0];
                let currCol = curr[1];

                // If this cell is a house, then add the distance from source to this cell
                // and we go past from this cell.
                if (grid[currRow][currCol] == 1) {
                    distanceSum += steps;
                    housesReached++;
                    continue;
                }

                // This cell was empty cell, hence traverse the next cells which is not a blockage.
                dirs.forEach((dir) => {
                    let nextRow = currRow + dir[0];
                    let nextCol = currCol + dir[1];
                    if (nextRow >= 0 && nextCol >= 0 && nextRow < rows && nextCol < cols) {
                        if (!vis[nextRow][nextCol] && grid[nextRow][nextCol] != 2) {
                            vis[nextRow][nextCol] = true;
                            next_queue.enqueue([nextRow, nextCol]);
                        }
                    }
                });
            }

            // Set the queue equal to the next level queue.
            queue = next_queue;
            // After traversing one level cells, increment the steps by 1 to reach to next level.
            steps++;
        }

        // If we did not reach all houses, then any cell visited also cannot reach all houses.
        // Set all cells visited to 2 so we do not check them again and return MAX_VALUE.
        if (housesReached != totalHouses) {
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    if (grid[row][col] == 0 && vis[row][col]) {
                        grid[row][col] = 2;
                    }
                }
            }
            return Number.MAX_VALUE;
        }

        // If we have reached all houses then return the total distance calculated.
        return distanceSum;
    }
}
```

```csharp
public class Solution {
    private int[][] dirs = new int[][] { new int[] {1, 0}, new int[] {-1, 0}, new int[] {0, 1}, new int[] {0, -1} };

    public int ShortestDistance(int[][] grid) {
        int minDistance = int.MaxValue;
        int rows = grid.Length;
        int cols = grid[0].Length;
        int totalHouses = 0;

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (grid[row][col] == 1) {
                    totalHouses++;
                }
            }
        }

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (grid[row][col] == 0) {
                    minDistance = Math.Min(minDistance, Bfs(grid, row, col, totalHouses));
                }
            }
        }

        return minDistance == int.MaxValue ? -1 : minDistance;
    }

    private int Bfs(int[][] grid, int row, int col, int totalHouses) {
        int rows = grid.Length;
        int cols = grid[0].Length;
        int distanceSum = 0;
        int housesReached = 0;

        Queue<int[]> q = new Queue<int[]>();
        q.Enqueue(new int[] { row, col });

        bool[][] vis = new bool[rows][];
        for (int i = 0; i < rows; i++) {
            vis[i] = new bool[cols];
        }
        vis[row][col] = true;

        int steps = 0;

        while (q.Count > 0 && housesReached != totalHouses) {
            int size = q.Count;
            for (int i = 0; i < size; i++) {
                int[] curr = q.Dequeue();
                row = curr[0];
                col = curr[1];

                if (grid[row][col] == 1) {
                    distanceSum += steps;
                    housesReached++;
                    continue;
                }

                foreach (int[] dir in dirs) {
                    int nextRow = row + dir[0];
                    int nextCol = col + dir[1];
                    if (nextRow >= 0 && nextCol >= 0 && nextRow < rows && nextCol < cols) {
                        if (!vis[nextRow][nextCol] && grid[nextRow][nextCol] != 2) {
                            vis[nextRow][nextCol] = true;
                            q.Enqueue(new int[] { nextRow, nextCol });
                        }
                    }
                }
            }
            steps++;
        }

        if (housesReached != totalHouses) {
            for (row = 0; row < rows; row++) {
                for (col = 0; col < cols; col++) {
                    if (grid[row][col] == 0 && vis[row][col]) {
                        grid[row][col] = 2;
                    }
                }
            }
            return int.MaxValue;
        }

        return distanceSum;
    }
}
```

```go
func shortestDistance(grid [][]int) int {
    rows, cols := len(grid), len(grid[0])
    dirs := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

    totalHouses := 0
    for row := 0; row < rows; row++ {
        for col := 0; col < cols; col++ {
            if grid[row][col] == 1 {
                totalHouses++
            }
        }
    }

    bfs := func(startRow, startCol int) int {
        distanceSum := 0
        housesReached := 0

        q := [][]int{{startRow, startCol}}
        vis := make([][]bool, rows)
        for i := range vis {
            vis[i] = make([]bool, cols)
        }
        vis[startRow][startCol] = true

        steps := 0

        for len(q) > 0 && housesReached != totalHouses {
            size := len(q)
            for i := 0; i < size; i++ {
                curr := q[0]
                q = q[1:]
                row, col := curr[0], curr[1]

                if grid[row][col] == 1 {
                    distanceSum += steps
                    housesReached++
                    continue
                }

                for _, dir := range dirs {
                    nextRow, nextCol := row+dir[0], col+dir[1]
                    if nextRow >= 0 && nextCol >= 0 && nextRow < rows && nextCol < cols {
                        if !vis[nextRow][nextCol] && grid[nextRow][nextCol] != 2 {
                            vis[nextRow][nextCol] = true
                            q = append(q, []int{nextRow, nextCol})
                        }
                    }
                }
            }
            steps++
        }

        if housesReached != totalHouses {
            for row := 0; row < rows; row++ {
                for col := 0; col < cols; col++ {
                    if grid[row][col] == 0 && vis[row][col] {
                        grid[row][col] = 2
                    }
                }
            }
            return math.MaxInt32
        }

        return distanceSum
    }

    minDistance := math.MaxInt32
    for row := 0; row < rows; row++ {
        for col := 0; col < cols; col++ {
            if grid[row][col] == 0 {
                minDistance = min(minDistance, bfs(row, col))
            }
        }
    }

    if minDistance == math.MaxInt32 {
        return -1
    }
    return minDistance
}
```

```kotlin
class Solution {
    private val dirs = arrayOf(intArrayOf(1, 0), intArrayOf(-1, 0), intArrayOf(0, 1), intArrayOf(0, -1))

    fun shortestDistance(grid: Array<IntArray>): Int {
        val rows = grid.size
        val cols = grid[0].size

        var totalHouses = 0
        for (row in 0 until rows) {
            for (col in 0 until cols) {
                if (grid[row][col] == 1) {
                    totalHouses++
                }
            }
        }

        var minDistance = Int.MAX_VALUE
        for (row in 0 until rows) {
            for (col in 0 until cols) {
                if (grid[row][col] == 0) {
                    minDistance = minOf(minDistance, bfs(grid, row, col, totalHouses))
                }
            }
        }

        return if (minDistance == Int.MAX_VALUE) -1 else minDistance
    }

    private fun bfs(grid: Array<IntArray>, startRow: Int, startCol: Int, totalHouses: Int): Int {
        val rows = grid.size
        val cols = grid[0].size
        var distanceSum = 0
        var housesReached = 0

        val q = ArrayDeque<IntArray>()
        q.add(intArrayOf(startRow, startCol))

        val vis = Array(rows) { BooleanArray(cols) }
        vis[startRow][startCol] = true

        var steps = 0

        while (q.isNotEmpty() && housesReached != totalHouses) {
            val size = q.size
            repeat(size) {
                val curr = q.removeFirst()
                val row = curr[0]
                val col = curr[1]

                if (grid[row][col] == 1) {
                    distanceSum += steps
                    housesReached++
                    return@repeat
                }

                for (dir in dirs) {
                    val nextRow = row + dir[0]
                    val nextCol = col + dir[1]
                    if (nextRow in 0 until rows && nextCol in 0 until cols) {
                        if (!vis[nextRow][nextCol] && grid[nextRow][nextCol] != 2) {
                            vis[nextRow][nextCol] = true
                            q.add(intArrayOf(nextRow, nextCol))
                        }
                    }
                }
            }
            steps++
        }

        if (housesReached != totalHouses) {
            for (row in 0 until rows) {
                for (col in 0 until cols) {
                    if (grid[row][col] == 0 && vis[row][col]) {
                        grid[row][col] = 2
                    }
                }
            }
            return Int.MAX_VALUE
        }

        return distanceSum
    }
}
```

```swift
class Solution {
    func shortestDistance(_ grid: [[Int]]) -> Int {
        var grid = grid
        let rows = grid.count
        let cols = grid[0].count
        let dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        var totalHouses = 0
        for row in 0..<rows {
            for col in 0..<cols {
                if grid[row][col] == 1 {
                    totalHouses += 1
                }
            }
        }

        func bfs(_ startRow: Int, _ startCol: Int) -> Int {
            var distanceSum = 0
            var housesReached = 0

            var q = [(startRow, startCol)]
            var vis = Array(repeating: Array(repeating: false, count: cols), count: rows)
            vis[startRow][startCol] = true

            var steps = 0

            while !q.isEmpty && housesReached != totalHouses {
                let size = q.count
                for _ in 0..<size {
                    let (row, col) = q.removeFirst()

                    if grid[row][col] == 1 {
                        distanceSum += steps
                        housesReached += 1
                        continue
                    }

                    for (dr, dc) in dirs {
                        let nextRow = row + dr
                        let nextCol = col + dc
                        if nextRow >= 0 && nextCol >= 0 && nextRow < rows && nextCol < cols {
                            if !vis[nextRow][nextCol] && grid[nextRow][nextCol] != 2 {
                                vis[nextRow][nextCol] = true
                                q.append((nextRow, nextCol))
                            }
                        }
                    }
                }
                steps += 1
            }

            if housesReached != totalHouses {
                for row in 0..<rows {
                    for col in 0..<cols {
                        if grid[row][col] == 0 && vis[row][col] {
                            grid[row][col] = 2
                        }
                    }
                }
                return Int.max
            }

            return distanceSum
        }

        var minDistance = Int.max
        for row in 0..<rows {
            for col in 0..<cols {
                if grid[row][col] == 0 {
                    minDistance = min(minDistance, bfs(row, col))
                }
            }
        }

        return minDistance == Int.max ? -1 : minDistance
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^2 \cdot M^2)$
- Space complexity: $O(N \cdot M)$

>  Where $N$ and $M$ are the number of rows and columns in `grid` respectively.

---

## 2. BFS from Houses to Empty Land

### Intuition

Instead of searching from empty cells, we search from each house. Each BFS computes the distance from one house to all reachable empty cells. We accumulate these distances in a separate matrix.

For each empty cell, we also track how many houses can reach it. Only cells reachable by all houses are valid candidates.

### Algorithm

1. Create a `distances` matrix where each cell stores `[total_distance, house_count]`.
2. For each house (value `1`):
   - Run `BFS` to all reachable empty cells.
   - For each visited empty cell, add the distance to its total and increment its house count.
3. After processing all houses:
   - Scan the grid for empty cells where `house_count == total_houses`.
   - Return the minimum total distance among valid cells.
4. Return `-1` if no valid cell exists.

::tabs-start

```python
class Solution:
    def shortestDistance(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        total_houses = 0

        distances = [[[0, 0] for _ in range(cols)] for _ in range(rows)]

        def bfs(start_row, start_col):
            q = deque([(start_row, start_col)])
            vis = [[False] * cols for _ in range(rows)]
            vis[start_row][start_col] = True
            steps = 0

            while q:
                for _ in range(len(q)):
                    row, col = q.popleft()

                    if grid[row][col] == 0:
                        distances[row][col][0] += steps
                        distances[row][col][1] += 1

                    for dr, dc in dirs:
                        next_row, next_col = row + dr, col + dc
                        if 0 <= next_row < rows and 0 <= next_col < cols:
                            if not vis[next_row][next_col] and grid[next_row][next_col] == 0:
                                vis[next_row][next_col] = True
                                q.append((next_row, next_col))
                steps += 1

        for row in range(rows):
            for col in range(cols):
                if grid[row][col] == 1:
                    total_houses += 1
                    bfs(row, col)

        min_distance = float('inf')
        for row in range(rows):
            for col in range(cols):
                if distances[row][col][1] == total_houses:
                    min_distance = min(min_distance, distances[row][col][0])

        return -1 if min_distance == float('inf') else min_distance
```

```java
class Solution {
    private void bfs(int[][] grid, int[][][] distances, int row, int col) {
        int dirs[][] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        
        int rows = grid.length;
        int cols = grid[0].length;

        // Use a queue to do a bfs, starting from each cell located at (row, col).
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{ row, col });

        // Keep track of visited cells.
        boolean[][] vis = new boolean[rows][cols];
        vis[row][col] = true;

        int steps = 0;

        while (!q.isEmpty()) {
            for (int i = q.size(); i > 0; --i) {
                int[] curr = q.poll();
                row = curr[0];
                col = curr[1];

                // If we reached an empty cell, then add the distance
                // and increment the count of houses reached at this cell.
                if (grid[row][col] == 0) {
                    distances[row][col][0] += steps;
                    distances[row][col][1] += 1;
                }

                // Traverse the next cells which is not a blockage.
                for (int[] dir : dirs) {
                    int nextRow = row + dir[0];
                    int nextCol = col + dir[1];

                    if (nextRow >= 0 && nextCol >= 0 && nextRow < rows && nextCol < cols) {
                        if (!vis[nextRow][nextCol] && grid[nextRow][nextCol] == 0) {
                            vis[nextRow][nextCol] = true;
                            q.offer(new int[]{ nextRow, nextCol });
                        }
                    }
                }
            }

            // After traversing one level cells, increment the steps by 1.
            steps++;
        }
    }

    public int shortestDistance(int[][] grid) {
        int minDistance = Integer.MAX_VALUE;
        int rows = grid.length;
        int cols = grid[0].length;
        int totalHouses = 0;

        // Store { total_dist, houses_count } for each cell.
        int[][][] distances = new int[rows][cols][2];

        // Count houses and start bfs from each house.
        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {
                if (grid[row][col] == 1) {
                    totalHouses++;
                    bfs(grid, distances, row, col);
                }
            }
        }

        // Check all empty lands with houses count equal to total houses and find the min ans.
        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {
                if (distances[row][col][1] == totalHouses) {
                    minDistance = Math.min(minDistance, distances[row][col][0]);
                }
            }
        }

        // If we haven't found a valid cell return -1.
        if (minDistance == Integer.MAX_VALUE) {
            return -1;
        }
        return minDistance;
    }
};
```

```cpp
class Solution {
private:
    void bfs(vector<vector<int>>& grid, vector<vector<vector<int>>>& distances, int row, int col) {
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        
        int rows = grid.size(), cols = grid[0].size();
        
        // Queue to do a bfs, starting from each cell located at (r,c).
        queue<pair<int, int>> q;
        q.push({ row, col });
        
        // Keep track of visited cells.
        vector<vector<bool>> vis (rows, vector<bool>(cols, false));
        vis[row][col] = true;
        
        int steps = 0;
        
        while (!q.empty()) {
            for (int i = q.size(); i > 0; --i) {
                auto curr = q.front();
                q.pop();
                row = curr.first;
                col = curr.second;
                
                // If we reached an empty cell, then add the distance
                // and increment the count of houses reached at this cell.
                if (grid[row][col] == 0) {
                    distances[row][col][0] += steps;
                    distances[row][col][1] += 1;
                }
                
                // Traverse the next cells which is not a blockage.
                for (auto& dir : dirs) {
                    int nextRow = row + dir[0];
                    int nextCol = col + dir[1];
                    if (nextRow >= 0 && nextCol >= 0 && nextRow < rows && nextCol < cols) {
                        if (!vis[nextRow][nextCol] && grid[nextRow][nextCol] == 0) {
                            vis[nextRow][nextCol] = true;
                            q.push({ nextRow, nextCol });
                        }
                    }
                }
            }
            
            // After traversing one level cells, increment the steps by 1.
            steps++;
        }
    }
    
public:
    int shortestDistance(vector<vector<int>>& grid) {
        int minDistance = INT_MAX;
        int rows = grid.size();
        int cols = grid[0].size();
        int totalHouses = 0;
        
        // Store { total_dist, houses_count } for each cell.
        vector<vector<vector<int>>> distances (rows, vector<vector<int>> (cols, {0, 0}));
        
        // Count houses and start bfs from each house.
        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {
                if (grid[row][col] == 1) {
                    totalHouses++;
                    bfs(grid, distances, row, col);
                }
            }
        }
        
        // Check all empty lands with houses count equal to total houses and find the min ans.
        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {
                if (distances[row][col][1] == totalHouses) {
                    minDistance = min(minDistance, distances[row][col][0]);
                }
            }
        }
        
        // If we haven't found a valid cell return -1.
        if (minDistance == INT_MAX) {
            return -1;
        }
        return minDistance;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    shortestDistance(grid) {
        let minDistance = Number.MAX_VALUE;
        let rows = grid.length;
        let cols = grid[0].length;
        let totalHouses = 0;
        // Store { total_dist, houses_count } for each cell.
        let distances = new Array(rows).fill(0).map(() => new Array(cols).fill(0).map(() => new Array(2).fill(0)));

        // Count houses and start BFS from each house.
        for (let row = 0; row < rows; ++row) {
            for (let col = 0; col < cols; ++col) {
                if (grid[row][col] == 1) {
                    totalHouses++;
                    this.bfs(grid, distances, row, col);
                }
            }
        }

        // Check all empty lands with houses count equal to total houses and find the min ans.
        for (let row = 0; row < rows; ++row) {
            for (let col = 0; col < cols; ++col) {
                if (distances[row][col][1] == totalHouses) {
                    minDistance = Math.min(minDistance, distances[row][col][0]);
                }
            }
        }

        // If we haven't found a valid cell return -1.
        if (minDistance == Number.MAX_VALUE) {
            return -1;
        }
        return minDistance;
    }

    bfs(grid, distances, row, col) {
        // Next four directions.
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        let rows = grid.length;
        let cols = grid[0].length;

        // Use a queue to do a BFS, starting from cell at (row, col).
        // Using @datastructures-js/queue implementation
        let queue = new Queue([[row, col]]);

        // Keep track of visited cells
        let vis = new Array(rows).fill(false).map(() => new Array(cols).fill(false));
        vis[row][col] = true;
        let steps = 0;

        while (!queue.isEmpty()) {
            // Record the cells that we will explore in the next level
            let next_queue = new Queue();
            let currentLevelSize = queue.size();

            for (let i = 0; i < currentLevelSize; i++) {
                let curr = queue.dequeue();
                let currRow = curr[0];
                let currCol = curr[1];

                // If we reached an empty cell, then add the distance
                // and increment the count of houses reached at this cell.
                if (grid[currRow][currCol] == 0) {
                    distances[currRow][currCol][0] += steps;
                    distances[currRow][currCol][1]++;
                }

                // Traverse the next cells which is not a blockage.
                dirs.forEach((dir) => {
                    let nextRow = currRow + dir[0];
                    let nextCol = currCol + dir[1];
                    if (nextRow >= 0 && nextCol >= 0 && nextRow < rows && nextCol < cols) {
                        if (!vis[nextRow][nextCol] && grid[nextRow][nextCol] == 0) {
                            vis[nextRow][nextCol] = true;
                            next_queue.enqueue([nextRow, nextCol]);
                        }
                    }
                });
            }

            // Set the queue equal to the next level queue.
            queue = next_queue;
            // After traversing one level cells, increment the steps by 1 to reach to next level.
            steps++;
        }
    }
}
```

```csharp
public class Solution {
    private int[][] dirs = new int[][] { new int[] {1, 0}, new int[] {-1, 0}, new int[] {0, 1}, new int[] {0, -1} };

    public int ShortestDistance(int[][] grid) {
        int minDistance = int.MaxValue;
        int rows = grid.Length;
        int cols = grid[0].Length;
        int totalHouses = 0;

        int[][][] distances = new int[rows][][];
        for (int i = 0; i < rows; i++) {
            distances[i] = new int[cols][];
            for (int j = 0; j < cols; j++) {
                distances[i][j] = new int[2];
            }
        }

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (grid[row][col] == 1) {
                    totalHouses++;
                    Bfs(grid, distances, row, col);
                }
            }
        }

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (distances[row][col][1] == totalHouses) {
                    minDistance = Math.Min(minDistance, distances[row][col][0]);
                }
            }
        }

        return minDistance == int.MaxValue ? -1 : minDistance;
    }

    private void Bfs(int[][] grid, int[][][] distances, int startRow, int startCol) {
        int rows = grid.Length;
        int cols = grid[0].Length;

        Queue<int[]> q = new Queue<int[]>();
        q.Enqueue(new int[] { startRow, startCol });

        bool[][] vis = new bool[rows][];
        for (int i = 0; i < rows; i++) {
            vis[i] = new bool[cols];
        }
        vis[startRow][startCol] = true;

        int steps = 0;

        while (q.Count > 0) {
            int size = q.Count;
            for (int i = 0; i < size; i++) {
                int[] curr = q.Dequeue();
                int row = curr[0];
                int col = curr[1];

                if (grid[row][col] == 0) {
                    distances[row][col][0] += steps;
                    distances[row][col][1]++;
                }

                foreach (int[] dir in dirs) {
                    int nextRow = row + dir[0];
                    int nextCol = col + dir[1];
                    if (nextRow >= 0 && nextCol >= 0 && nextRow < rows && nextCol < cols) {
                        if (!vis[nextRow][nextCol] && grid[nextRow][nextCol] == 0) {
                            vis[nextRow][nextCol] = true;
                            q.Enqueue(new int[] { nextRow, nextCol });
                        }
                    }
                }
            }
            steps++;
        }
    }
}
```

```go
func shortestDistance(grid [][]int) int {
    rows, cols := len(grid), len(grid[0])
    dirs := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
    totalHouses := 0

    distances := make([][][]int, rows)
    for i := 0; i < rows; i++ {
        distances[i] = make([][]int, cols)
        for j := 0; j < cols; j++ {
            distances[i][j] = make([]int, 2)
        }
    }

    bfs := func(startRow, startCol int) {
        q := [][]int{{startRow, startCol}}
        vis := make([][]bool, rows)
        for i := range vis {
            vis[i] = make([]bool, cols)
        }
        vis[startRow][startCol] = true
        steps := 0

        for len(q) > 0 {
            size := len(q)
            for i := 0; i < size; i++ {
                curr := q[0]
                q = q[1:]
                row, col := curr[0], curr[1]

                if grid[row][col] == 0 {
                    distances[row][col][0] += steps
                    distances[row][col][1]++
                }

                for _, dir := range dirs {
                    nextRow, nextCol := row+dir[0], col+dir[1]
                    if nextRow >= 0 && nextCol >= 0 && nextRow < rows && nextCol < cols {
                        if !vis[nextRow][nextCol] && grid[nextRow][nextCol] == 0 {
                            vis[nextRow][nextCol] = true
                            q = append(q, []int{nextRow, nextCol})
                        }
                    }
                }
            }
            steps++
        }
    }

    for row := 0; row < rows; row++ {
        for col := 0; col < cols; col++ {
            if grid[row][col] == 1 {
                totalHouses++
                bfs(row, col)
            }
        }
    }

    minDistance := math.MaxInt32
    for row := 0; row < rows; row++ {
        for col := 0; col < cols; col++ {
            if distances[row][col][1] == totalHouses {
                if distances[row][col][0] < minDistance {
                    minDistance = distances[row][col][0]
                }
            }
        }
    }

    if minDistance == math.MaxInt32 {
        return -1
    }
    return minDistance
}
```

```kotlin
class Solution {
    private val dirs = arrayOf(intArrayOf(1, 0), intArrayOf(-1, 0), intArrayOf(0, 1), intArrayOf(0, -1))

    fun shortestDistance(grid: Array<IntArray>): Int {
        val rows = grid.size
        val cols = grid[0].size
        var totalHouses = 0

        val distances = Array(rows) { Array(cols) { IntArray(2) } }

        for (row in 0 until rows) {
            for (col in 0 until cols) {
                if (grid[row][col] == 1) {
                    totalHouses++
                    bfs(grid, distances, row, col)
                }
            }
        }

        var minDistance = Int.MAX_VALUE
        for (row in 0 until rows) {
            for (col in 0 until cols) {
                if (distances[row][col][1] == totalHouses) {
                    minDistance = minOf(minDistance, distances[row][col][0])
                }
            }
        }

        return if (minDistance == Int.MAX_VALUE) -1 else minDistance
    }

    private fun bfs(grid: Array<IntArray>, distances: Array<Array<IntArray>>, startRow: Int, startCol: Int) {
        val rows = grid.size
        val cols = grid[0].size

        val q = ArrayDeque<IntArray>()
        q.add(intArrayOf(startRow, startCol))

        val vis = Array(rows) { BooleanArray(cols) }
        vis[startRow][startCol] = true

        var steps = 0

        while (q.isNotEmpty()) {
            val size = q.size
            repeat(size) {
                val curr = q.removeFirst()
                val row = curr[0]
                val col = curr[1]

                if (grid[row][col] == 0) {
                    distances[row][col][0] += steps
                    distances[row][col][1]++
                }

                for (dir in dirs) {
                    val nextRow = row + dir[0]
                    val nextCol = col + dir[1]
                    if (nextRow in 0 until rows && nextCol in 0 until cols) {
                        if (!vis[nextRow][nextCol] && grid[nextRow][nextCol] == 0) {
                            vis[nextRow][nextCol] = true
                            q.add(intArrayOf(nextRow, nextCol))
                        }
                    }
                }
            }
            steps++
        }
    }
}
```

```swift
class Solution {
    func shortestDistance(_ grid: [[Int]]) -> Int {
        let rows = grid.count
        let cols = grid[0].count
        let dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        var totalHouses = 0

        var distances = [[[Int]]](repeating: [[Int]](repeating: [0, 0], count: cols), count: rows)

        func bfs(_ startRow: Int, _ startCol: Int) {
            var q = [(startRow, startCol)]
            var vis = [[Bool]](repeating: [Bool](repeating: false, count: cols), count: rows)
            vis[startRow][startCol] = true
            var steps = 0

            while !q.isEmpty {
                let size = q.count
                for _ in 0..<size {
                    let (row, col) = q.removeFirst()

                    if grid[row][col] == 0 {
                        distances[row][col][0] += steps
                        distances[row][col][1] += 1
                    }

                    for (dr, dc) in dirs {
                        let nextRow = row + dr
                        let nextCol = col + dc
                        if nextRow >= 0 && nextCol >= 0 && nextRow < rows && nextCol < cols {
                            if !vis[nextRow][nextCol] && grid[nextRow][nextCol] == 0 {
                                vis[nextRow][nextCol] = true
                                q.append((nextRow, nextCol))
                            }
                        }
                    }
                }
                steps += 1
            }
        }

        for row in 0..<rows {
            for col in 0..<cols {
                if grid[row][col] == 1 {
                    totalHouses += 1
                    bfs(row, col)
                }
            }
        }

        var minDistance = Int.max
        for row in 0..<rows {
            for col in 0..<cols {
                if distances[row][col][1] == totalHouses {
                    minDistance = min(minDistance, distances[row][col][0])
                }
            }
        }

        return minDistance == Int.max ? -1 : minDistance
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^2 \cdot M^2)$
- Space complexity: $O(N \cdot M)$

>  Where $N$ and $M$ are the number of rows and columns in `grid` respectively.

---

## 3. BFS from Houses to Empty Land (Optimized)

### Intuition

We can optimize the previous approach by eliminating the separate visited array and the house count tracking. The key insight is to use the grid values themselves as visit markers.

Initially, empty cells have value 0. After the first house's BFS, all reachable empty cells are decremented to -1. The second house's BFS only visits cells with value -1 (reachable by exactly one house), and decrements them to -2. This continues for each house. Cells that become unreachable are naturally pruned.

### Algorithm

1. Create a `total` matrix to accumulate distances.
2. Initialize `emptyLandValue = 0`.
3. For each house:
   - Run `BFS`, only visiting cells with value equal to `emptyLandValue`.
   - For each visited cell, add the distance to `total` and decrement the cell value.
   - Track the minimum total distance among cells visited in this `BFS`.
   - Decrement `emptyLandValue` for the next iteration.
4. Return the minimum distance found, or `-1` if no valid cell exists.

::tabs-start

```python
class Solution:
    def shortestDistance(self, grid: List[List[int]]) -> int:
        # Next four directions.
        dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]
        rows = len(grid)
        cols = len(grid[0])
        
        # Total Matrix to store total distance sum for each empty cell.
        total = [[0] * cols for _ in range(rows)]
        empty_land_value = 0
        min_dist = float('inf')
        
        for row in range(rows):
            for col in range(cols):
                # Start a BFS from each house.
                if grid[row][col] == 1:
                    min_dist = float('inf')
                    
                    # Use a queue to perform a BFS, starting from the cell at (row, col).
                    q = deque([(row, col)])
                    steps = 0
                    
                    while q:
                        steps += 1
                        level_size = len(q)
                        
                        for level in range(level_size):
                            curr = q.popleft()
                            
                            for dir in dirs:
                                next_row = curr[0] + dir[0]
                                next_col = curr[1] + dir[1]
                                
                                # For each cell with the value equal to empty land value
                                # add distance and decrement the cell value by 1.
                                if (0 <= next_row < rows and
                                    0 <= next_col < cols and
                                    grid[next_row][next_col] == empty_land_value):
                                    
                                    grid[next_row][next_col] -= 1
                                    total[next_row][next_col] += steps
                                    q.append((next_row, next_col))
                                    min_dist = min(min_dist, total[next_row][next_col])
                        
                    # Decrement empty land value to be searched in next iteration.
                    empty_land_value -= 1
        
        return -1 if min_dist == float('inf') else min_dist
```

```java
class Solution {
    public int shortestDistance(int[][] grid) {
        // Next four directions.
        int dirs[][] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        
        int rows = grid.length;
        int cols = grid[0].length;
        
        // Total Matrix to store total distance sum for each empty cell.
        int[][] total = new int[rows][cols];

        int emptyLandValue = 0;
        int minDist = Integer.MAX_VALUE;

        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {

                // Start a BFS from each house.
                if (grid[row][col] == 1) {
                    minDist = Integer.MAX_VALUE;

                    // Use a queue to perform a BFS, starting from the cell at (r, c).
                    Queue<int[]> q = new LinkedList<>();
                    q.offer(new int[]{ row, col });

                    int steps = 0;

                    while (!q.isEmpty()) {
                        steps++;

                        for (int level = q.size(); level > 0; --level) {
                            int[] curr = q.poll();

                            for (int[] dir : dirs) {
                                int nextRow = curr[0] + dir[0];
                                int nextCol = curr[1] + dir[1];

                                // For each cell with the value equal to empty land value
                                // add distance and decrement the cell value by 1.
                                if (nextRow >= 0 && nextRow < rows &&
                                    nextCol >= 0 && nextCol < cols &&
                                    grid[nextRow][nextCol] == emptyLandValue) {
                                    grid[nextRow][nextCol]--;
                                    total[nextRow][nextCol] += steps;

                                    q.offer(new int[]{ nextRow, nextCol });
                                    minDist = Math.min(minDist, total[nextRow][nextCol]);
                                }
                            }
                        }
                    }

                    // Decrement empty land value to be searched in next iteration.
                    emptyLandValue--;
                }
            }
        }

        return minDist == Integer.MAX_VALUE ? -1 : minDist;
    }
}
```

```cpp
class Solution {
public:
    int shortestDistance(vector<vector<int>>& grid) {
        // Next four directions.
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        
        int rows = grid.size();
        int cols = grid[0].size();
        
        // Total Matrix to store total distance sum for each empty cell.
        vector<vector<int>> total(rows, vector<int> (cols, 0));

        int emptyLandValue = 0;
        int minDist = INT_MAX;

        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {

                // Start a bfs from each house.
                if (grid[row][col] == 1) {
                    minDist = INT_MAX;

                    // Use a queue to perform a BFS, starting from the cell located at (row, col).
                    queue<pair<int, int>> q;
                    q.push({ row, col });
                    
                    int steps = 0;

                    while (!q.empty()) {
                        steps++;

                        for (int level = q.size(); level > 0; --level) {
                            auto curr = q.front();
                            q.pop();

                            for (auto& dir : dirs) {
                                int nextRow = curr.first + dir[0];
                                int nextCol = curr.second + dir[1];

                                // For each cell with the value equal to empty land value
                                // add distance and decrement the cell value by 1.
                                if (nextRow >= 0 && nextRow < rows &&
                                    nextCol >= 0 && nextCol < cols &&
                                    grid[nextRow][nextCol] == emptyLandValue) {
                                    grid[nextRow][nextCol]--;
                                    total[nextRow][nextCol] += steps;

                                    q.push({ nextRow, nextCol });
                                    minDist = min(minDist, total[nextRow][nextCol]);
                                }
                            }
                        }
                    }

                    // Decrement empty land value to be searched in next iteration.
                    emptyLandValue--;
                }
            }
        }

        return minDist == INT_MAX ? -1 : minDist;
    }
};
```

```javascript
// Next four directions.
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    shortestDistance(grid) {
        const rows = grid.length;
        const cols = grid[0].length;

        // Total Matrix to store total distance sum for each empty cell.
        const total = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
        let emptyLandValue = 0;
        let minDist = Number.MAX_VALUE;

        for (let row = 0; row < rows; ++row) {
            for (let col = 0; col < cols; ++col) {
                // Start a BFS from each house.
                if (grid[row][col] === 1) {
                    minDist = Number.MAX_VALUE;

                    // Use a queue to perform a BFS, starting from the cell located at (row, col).
                    // Using @datastructures-js/queue implementation
                    const q = new Queue([{row, col}]);
                    let steps = 0;

                    while (!q.isEmpty()) {
                        steps++;
                        const levelSize = q.size();

                        for (let level = 0; level < levelSize; level++) {
                            const curr = q.dequeue();

                            dirs.forEach((dir) => {
                                const nextRow = curr.row + dir[0];
                                const nextCol = curr.col + dir[1];

                                // For each cell with the value equal to empty land value
                                // add distance and decrement the cell value by 1.
                                if (nextRow >= 0 && nextRow < rows &&
                                    nextCol >= 0 && nextCol < cols &&
                                    grid[nextRow][nextCol] === emptyLandValue) {
                                    grid[nextRow][nextCol]--;
                                    total[nextRow][nextCol] += steps;
                                    q.enqueue({row: nextRow, col: nextCol});
                                    minDist = Math.min(minDist, total[nextRow][nextCol]);
                                }
                            });
                        }
                    }

                    // Decrement empty land value to be searched in next iteration.
                    emptyLandValue--;
                }
            }
        }

        return minDist === Number.MAX_VALUE ? -1 : minDist;
    }
}
```

```csharp
public class Solution {
    public int ShortestDistance(int[][] grid) {
        int[][] dirs = new int[][] { new int[] {1, 0}, new int[] {-1, 0}, new int[] {0, 1}, new int[] {0, -1} };

        int rows = grid.Length;
        int cols = grid[0].Length;

        int[][] total = new int[rows][];
        for (int i = 0; i < rows; i++) {
            total[i] = new int[cols];
        }

        int emptyLandValue = 0;
        int minDist = int.MaxValue;

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (grid[row][col] == 1) {
                    minDist = int.MaxValue;

                    Queue<int[]> q = new Queue<int[]>();
                    q.Enqueue(new int[] { row, col });

                    int steps = 0;

                    while (q.Count > 0) {
                        steps++;
                        int levelSize = q.Count;

                        for (int level = 0; level < levelSize; level++) {
                            int[] curr = q.Dequeue();

                            foreach (int[] dir in dirs) {
                                int nextRow = curr[0] + dir[0];
                                int nextCol = curr[1] + dir[1];

                                if (nextRow >= 0 && nextRow < rows &&
                                    nextCol >= 0 && nextCol < cols &&
                                    grid[nextRow][nextCol] == emptyLandValue) {
                                    grid[nextRow][nextCol]--;
                                    total[nextRow][nextCol] += steps;
                                    q.Enqueue(new int[] { nextRow, nextCol });
                                    minDist = Math.Min(minDist, total[nextRow][nextCol]);
                                }
                            }
                        }
                    }

                    emptyLandValue--;
                }
            }
        }

        return minDist == int.MaxValue ? -1 : minDist;
    }
}
```

```go
func shortestDistance(grid [][]int) int {
    dirs := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
    rows, cols := len(grid), len(grid[0])

    total := make([][]int, rows)
    for i := 0; i < rows; i++ {
        total[i] = make([]int, cols)
    }

    emptyLandValue := 0
    minDist := math.MaxInt32

    for row := 0; row < rows; row++ {
        for col := 0; col < cols; col++ {
            if grid[row][col] == 1 {
                minDist = math.MaxInt32

                q := [][]int{{row, col}}
                steps := 0

                for len(q) > 0 {
                    steps++
                    levelSize := len(q)

                    for level := 0; level < levelSize; level++ {
                        curr := q[0]
                        q = q[1:]

                        for _, dir := range dirs {
                            nextRow := curr[0] + dir[0]
                            nextCol := curr[1] + dir[1]

                            if nextRow >= 0 && nextRow < rows &&
                                nextCol >= 0 && nextCol < cols &&
                                grid[nextRow][nextCol] == emptyLandValue {
                                grid[nextRow][nextCol]--
                                total[nextRow][nextCol] += steps
                                q = append(q, []int{nextRow, nextCol})
                                if total[nextRow][nextCol] < minDist {
                                    minDist = total[nextRow][nextCol]
                                }
                            }
                        }
                    }
                }

                emptyLandValue--
            }
        }
    }

    if minDist == math.MaxInt32 {
        return -1
    }
    return minDist
}
```

```kotlin
class Solution {
    fun shortestDistance(grid: Array<IntArray>): Int {
        val dirs = arrayOf(intArrayOf(1, 0), intArrayOf(-1, 0), intArrayOf(0, 1), intArrayOf(0, -1))
        val rows = grid.size
        val cols = grid[0].size

        val total = Array(rows) { IntArray(cols) }

        var emptyLandValue = 0
        var minDist = Int.MAX_VALUE

        for (row in 0 until rows) {
            for (col in 0 until cols) {
                if (grid[row][col] == 1) {
                    minDist = Int.MAX_VALUE

                    val q = ArrayDeque<IntArray>()
                    q.add(intArrayOf(row, col))

                    var steps = 0

                    while (q.isNotEmpty()) {
                        steps++
                        val levelSize = q.size

                        repeat(levelSize) {
                            val curr = q.removeFirst()

                            for (dir in dirs) {
                                val nextRow = curr[0] + dir[0]
                                val nextCol = curr[1] + dir[1]

                                if (nextRow in 0 until rows &&
                                    nextCol in 0 until cols &&
                                    grid[nextRow][nextCol] == emptyLandValue) {
                                    grid[nextRow][nextCol]--
                                    total[nextRow][nextCol] += steps
                                    q.add(intArrayOf(nextRow, nextCol))
                                    minDist = minOf(minDist, total[nextRow][nextCol])
                                }
                            }
                        }
                    }

                    emptyLandValue--
                }
            }
        }

        return if (minDist == Int.MAX_VALUE) -1 else minDist
    }
}
```

```swift
class Solution {
    func shortestDistance(_ grid: [[Int]]) -> Int {
        var grid = grid
        let dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        let rows = grid.count
        let cols = grid[0].count

        var total = [[Int]](repeating: [Int](repeating: 0, count: cols), count: rows)

        var emptyLandValue = 0
        var minDist = Int.max

        for row in 0..<rows {
            for col in 0..<cols {
                if grid[row][col] == 1 {
                    minDist = Int.max

                    var q = [(row, col)]
                    var steps = 0

                    while !q.isEmpty {
                        steps += 1
                        let levelSize = q.count

                        for _ in 0..<levelSize {
                            let curr = q.removeFirst()

                            for (dr, dc) in dirs {
                                let nextRow = curr.0 + dr
                                let nextCol = curr.1 + dc

                                if nextRow >= 0 && nextRow < rows &&
                                   nextCol >= 0 && nextCol < cols &&
                                   grid[nextRow][nextCol] == emptyLandValue {
                                    grid[nextRow][nextCol] -= 1
                                    total[nextRow][nextCol] += steps
                                    q.append((nextRow, nextCol))
                                    minDist = min(minDist, total[nextRow][nextCol])
                                }
                            }
                        }
                    }

                    emptyLandValue -= 1
                }
            }
        }

        return minDist == Int.max ? -1 : minDist
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^2 \cdot M^2)$
- Space complexity: $O(N \cdot M)$

>  Where $N$ and $M$ are the number of rows and columns in `grid` respectively.

---

## Common Pitfalls

### Not Checking Reachability to All Houses

An empty cell is only valid if it can reach ALL houses. Simply finding the minimum distance sum is insufficient; you must also verify that the cell can reach every house. Cells that cannot reach all houses should be excluded from consideration, or the solution returns -1 if no valid cell exists.

### Incorrect Early Termination

Some implementations try to optimize by stopping BFS early when a house is found. However, BFS from a house must continue to all reachable empty cells to correctly accumulate distances. Early termination leads to incomplete distance sums and incorrect results.

### Modifying Grid Without Tracking Reachability

The optimized approach uses decreasing values (0, -1, -2, ...) to track which cells are reachable by all previously processed houses. A common mistake is not understanding that a cell with value `k` should only be visited by the `(|k|+1)`-th house's BFS. Cells not matching the expected value are either obstacles, houses, or unreachable from some previous house.

### Confusing BFS Direction

There are two valid approaches: BFS from empty cells to houses, or BFS from houses to empty cells. Mixing concepts from both approaches leads to incorrect logic. When doing BFS from houses, each house's BFS contributes distances to empty cells. When doing BFS from empty cells, each empty cell computes its total distance to all houses.

### Integer Overflow with Distance Sums

In large grids with many houses, the sum of distances can become very large. Using `Integer.MAX_VALUE` or similar sentinels for invalid cells, then performing arithmetic operations, can cause overflow. Ensure proper handling of sentinel values in comparisons and avoid adding to them.
