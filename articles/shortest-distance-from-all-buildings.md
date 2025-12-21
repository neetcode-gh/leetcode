## 1. BFS from Empty Land to All Houses

::tabs-start

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^2 \cdot M^2)$
- Space complexity: $O(N \cdot M)$

>  Where $N$ and $M$ are the number of rows and columns in `grid` respectively.

---

## 2. BFS from Houses to Empty Land

::tabs-start

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^2 \cdot M^2)$
- Space complexity: $O(N \cdot M)$

>  Where $N$ and $M$ are the number of rows and columns in `grid` respectively.

---

## 3. BFS from Houses to Empty Land (Optimized)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^2 \cdot M^2)$
- Space complexity: $O(N \cdot M)$

>  Where $N$ and $M$ are the number of rows and columns in `grid` respectively.
