## 1. Brute Force

### Intuition

Two islands are considered the same if one can be translated (shifted) to match the other. To identify distinct islands, we need a way to represent each island's shape independent of its position. We do this by normalizing each island: recording each cell's position relative to the island's origin (the first cell we encounter). Then we compare each new island against all previously found unique islands.

### Algorithm

1. Use DFS to explore each island, recording cells as offsets from the starting cell (origin).
2. For each newly discovered island, compare it against all previously stored unique islands:
   - If sizes differ, they are different.
   - Otherwise, compare cell by cell.
3. If the island matches none of the stored islands, add it to the unique list.
4. Return the count of unique islands.

::tabs-start

```python
class Solution:
    def numDistinctIslands(self, grid: List[List[int]]) -> int:
        
        def current_island_is_unique():
            for other_island in unique_islands:
                if len(other_island) != len(current_island):
                    continue
                for cell_1, cell_2 in zip(current_island, other_island):
                    if cell_1 != cell_2:
                        break
                else:
                    return False
            return True
            
        # Do a DFS to find all cells in the current island.
        def dfs(row, col):
            if row < 0 or col < 0 or row >= len(grid) or col >= len(grid[0]):
                return
            if (row, col) in seen or not grid[row][col]:
                return
            seen.add((row, col))
            current_island.append((row - row_origin, col - col_origin))
            dfs(row + 1, col)
            dfs(row - 1, col)
            dfs(row, col + 1)
            dfs(row, col - 1)
        
        # Repeatedly start DFS's as long as there are islands remaining.
        seen = set()
        unique_islands = []
        for row in range(len(grid)):
            for col in range(len(grid[0])):
                current_island = []
                row_origin = row
                col_origin = col
                dfs(row, col)
                if not current_island or not current_island_is_unique():
                    continue
                unique_islands.append(current_island)
        print(unique_islands)
        return len(unique_islands)
```

```java
class Solution {

    private List<List<int[]>> uniqueIslands = new ArrayList<>(); // All known unique islands.
    private List<int[]> currentIsland = new ArrayList<>(); // Current Island
    private int[][] grid; // Input grid
    private boolean[][] seen; // Cells that have been explored. 
     
    public int numDistinctIslands(int[][] grid) {   
        this.grid = grid;
        this.seen = new boolean[grid.length][grid[0].length];   
        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[0].length; col++) {
                dfs(row, col);
                if (currentIsland.isEmpty()) {
                    continue;
                }
                // Translate the island we just found to the top left.
                int minCol = grid[0].length - 1;
                for (int i = 0; i < currentIsland.size(); i++) {
                    minCol = Math.min(minCol, currentIsland.get(i)[1]);
                }
                for (int[] cell : currentIsland) {
                    cell[0] -= row;
                    cell[1] -= minCol;
                }
                // If this island is unique, add it to the list.
                if (currentIslandUnique()) {
                    uniqueIslands.add(currentIsland);
                }
                currentIsland = new ArrayList<>();
            }
        }
        return uniqueIslands.size();
    }
    
    private void dfs(int row, int col) {
        if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) return;
        if (seen[row][col] || grid[row][col] == 0) return;
        seen[row][col] = true;
        currentIsland.add(new int[]{row, col});
        dfs(row + 1, col);
        dfs(row - 1, col);
        dfs(row, col + 1);
        dfs(row, col - 1);
    }
    
    private boolean currentIslandUnique() {
        for (List<int[]> otherIsland : uniqueIslands) {
            if (currentIsland.size() != otherIsland.size()) {
                continue;
            }
            if (equalIslands(currentIsland, otherIsland)) {
                return false;
            }
        }
        return true;
    }
    
    private boolean equalIslands(List<int[]> island1, List<int[]> island2) {
        for (int i = 0; i < island1.size(); i++) {
            if (island1.get(i)[0] != island2.get(i)[0] || island1.get(i)[1] != island2.get(i)[1]) {
                return false;
            }
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M^2 \cdot N^2)$
- Space complexity: $O(N \cdot M)$

>  Where $M$ is the number of rows, and $N$ is the number of columns

---

## 2. Hash By Local Coordinates

### Intuition

Instead of comparing islands one by one, we can use a hash set for O(1) lookup. Each island is represented as a set of relative coordinates (offsets from the origin cell). Since sets of tuples are hashable (using frozenset in Python), we can directly add each island's shape to a set of unique islands. Duplicate shapes will naturally be filtered out.

### Algorithm

1. Use DFS to explore each island, storing cells as relative coordinates from the starting cell.
2. Convert the set of coordinates to a frozenset (or equivalent hashable structure).
3. Add the frozenset to a set of unique islands.
4. Return the size of the unique islands set.

::tabs-start

```python
class Solution:
    def numDistinctIslands(self, grid: List[List[int]]) -> int:
        # Do a DFS to find all cells in the current island.
        def dfs(row, col):
            if row < 0 or col < 0 or row >= len(grid) or col >= len(grid[0]):
                return
            if (row, col) in seen or not grid[row][col]:
                return
            seen.add((row, col))
            current_island.add((row - row_origin, col - col_origin))
            dfs(row + 1, col)
            dfs(row - 1, col)
            dfs(row, col + 1)
            dfs(row, col - 1)
        
        # Repeatedly start DFS's as long as there are islands remaining.
        seen = set()
        unique_islands = set()
        for row in range(len(grid)):
            for col in range(len(grid[0])):
                current_island = set()
                row_origin = row
                col_origin = col
                dfs(row, col)
                if current_island:
                    unique_islands.add(frozenset(current_island))
        
        return len(unique_islands)
```

```java
class Solution {
    
    private int[][] grid;
    private boolean[][] seen;
    private Set<Pair<Integer, Integer>> currentIsland;
    private int currRowOrigin;
    private int currColOrigin;
    
    private void dfs(int row, int col) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
            return;
        }
        if (grid[row][col] == 0 || seen[row][col]) {
            return;
        }    
        seen[row][col] = true;
        currentIsland.add(new Pair<>(row - currRowOrigin, col - currColOrigin));
        dfs(row + 1, col);
        dfs(row - 1, col);
        dfs(row, col + 1);
        dfs(row, col - 1);    
    }
    
    public int numDistinctIslands(int[][] grid) {
        this.grid = grid;
        this.seen = new boolean[grid.length][grid[0].length];   
        Set<Set<Pair<Integer, Integer>>> islands = new HashSet<>();
        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[0].length; col++) {
                this.currentIsland = new HashSet<>();
                this.currRowOrigin = row;
                this.currColOrigin = col;
                dfs(row, col);
                if (!currentIsland.isEmpty()) {
                    islands.add(currentIsland);
                }
            }
        }         
        return islands.size();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M \cdot N)$
- Space complexity: $O(M \cdot N)$

>  Where $M$ is the number of rows, and $N$ is the number of columns

---

## 3. Hash By Path Signature

### Intuition

Another way to uniquely identify an island's shape is through its DFS traversal path. If we always explore directions in the same order (e.g., Down, Up, Right, Left), two identical shapes will produce the same sequence of moves. We record each direction taken during DFS, and importantly, we also record when we backtrack. This backtrack marker is crucial because without it, different shapes could produce the same direction sequence.

### Algorithm

1. Use DFS to explore each island, recording the direction of each move (D, U, R, L).
2. After exploring all neighbors from a cell, append a backtrack marker (e.g., "0").
3. Convert the path signature to a string and add it to a set of unique islands.
4. Return the size of the unique islands set.

::tabs-start

```python
class Solution:
    def numDistinctIslands(self, grid: List[List[int]]) -> int:
        # Do a DFS to find all cells in the current island.
        def dfs(row, col, direction):
            if row < 0 or col < 0 or row >= len(grid) or col >= len(grid[0]):
                return
            if (row, col) in seen or not grid[row][col]:
                return
            seen.add((row, col))
            path_signature.append(direction)
            dfs(row + 1, col, "D")
            dfs(row - 1, col, "U")
            dfs(row, col + 1, "R")
            dfs(row, col - 1, "L")
            path_signature.append("0")
        
        # Repeatedly start DFS's as long as there are islands remaining.
        seen = set()
        unique_islands = set()
        for row in range(len(grid)):
            for col in range(len(grid[0])):
                path_signature = []
                dfs(row, col, "0")
                if path_signature:
                    unique_islands.add(tuple(path_signature))
        
        return len(unique_islands)
```

```java
class Solution {
    
    private int[][] grid;
    private boolean[][] visited;
    private StringBuffer currentIsland;

    public int numDistinctIslands(int[][] grid) {  
        this.grid = grid;
        this.visited = new boolean[grid.length][grid[0].length];
        Set<String> islands = new HashSet<>();
        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[0].length; col++) {
                currentIsland = new StringBuffer();
                dfs(row, col, '0');
                if (currentIsland.length() == 0) {
                    continue;
                }
                islands.add(currentIsland.toString());
            }
        }
        return islands.size();
    }
   
    private void dfs(int row, int col, char dir) {
        if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) {
            return;
        }
        if (visited[row][col] || grid[row][col] == 0) {
            return;
        }
        visited[row][col] = true;
        currentIsland.append(dir);
        dfs(row + 1, col, 'D');
        dfs(row - 1, col, 'U');
        dfs(row, col + 1, 'R');
        dfs(row, col - 1, 'L');
        currentIsland.append('0');
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>>* grid;
    vector<vector<bool>> visited;
    string currentIsland;
    
    void dfs(int row, int col, char dir) {
        if (row < 0 || col < 0 || row >= grid->size() || col >= (*grid)[0].size()) {
            return;
        }
        if (visited[row][col] || (*grid)[row][col] == 0) {
            return;
        }
        visited[row][col] = true;
        currentIsland += dir;
        dfs(row + 1, col, 'D');
        dfs(row - 1, col, 'U');
        dfs(row, col + 1, 'R');
        dfs(row, col - 1, 'L');
        currentIsland += '0';
    }
    
public:
    int numDistinctIslands(vector<vector<int>>& grid) {
        this->grid = &grid;
        visited = vector<vector<bool>>(grid.size(), vector<bool>(grid[0].size(), false));
        unordered_set<string> islands;
        
        for (int row = 0; row < grid.size(); row++) {
            for (int col = 0; col < grid[0].size(); col++) {
                currentIsland = "";
                dfs(row, col, '0');
                if (currentIsland.empty()) {
                    continue;
                }
                islands.insert(currentIsland);
            }
        }
        return islands.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    numDistinctIslands(grid) {
        this.grid = grid;
        this.visited = Array.from({ length: grid.length }, () =>
            Array(grid[0].length).fill(false)
        );
        const islands = new Set();

        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                this.currentIsland = [];
                this.dfs(row, col, '0');
                if (this.currentIsland.length === 0) {
                    continue;
                }
                islands.add(this.currentIsland.join(''));
            }
        }
        return islands.size;
    }

    dfs(row, col, dir) {
        if (row < 0 || col < 0 || row >= this.grid.length || col >= this.grid[0].length) {
            return;
        }
        if (this.visited[row][col] || this.grid[row][col] === 0) {
            return;
        }
        this.visited[row][col] = true;
        this.currentIsland.push(dir);
        this.dfs(row + 1, col, 'D');
        this.dfs(row - 1, col, 'U');
        this.dfs(row, col + 1, 'R');
        this.dfs(row, col - 1, 'L');
        this.currentIsland.push('0');
    }
}
```

```csharp
public class Solution {
    private int[][] grid;
    private bool[,] visited;
    private StringBuilder currentIsland;

    public int NumDistinctIslands(int[][] grid) {
        this.grid = grid;
        int rows = grid.Length, cols = grid[0].Length;
        visited = new bool[rows, cols];
        HashSet<string> islands = new HashSet<string>();

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                currentIsland = new StringBuilder();
                Dfs(row, col, '0');
                if (currentIsland.Length == 0) continue;
                islands.Add(currentIsland.ToString());
            }
        }
        return islands.Count;
    }

    private void Dfs(int row, int col, char dir) {
        if (row < 0 || col < 0 || row >= grid.Length || col >= grid[0].Length) {
            return;
        }
        if (visited[row, col] || grid[row][col] == 0) {
            return;
        }
        visited[row, col] = true;
        currentIsland.Append(dir);
        Dfs(row + 1, col, 'D');
        Dfs(row - 1, col, 'U');
        Dfs(row, col + 1, 'R');
        Dfs(row, col - 1, 'L');
        currentIsland.Append('0');
    }
}
```

```go
func numDistinctIslands(grid [][]int) int {
    rows, cols := len(grid), len(grid[0])
    visited := make([][]bool, rows)
    for i := range visited {
        visited[i] = make([]bool, cols)
    }
    islands := make(map[string]bool)

    var currentIsland strings.Builder
    var dfs func(row, col int, dir byte)
    dfs = func(row, col int, dir byte) {
        if row < 0 || col < 0 || row >= rows || col >= cols {
            return
        }
        if visited[row][col] || grid[row][col] == 0 {
            return
        }
        visited[row][col] = true
        currentIsland.WriteByte(dir)
        dfs(row+1, col, 'D')
        dfs(row-1, col, 'U')
        dfs(row, col+1, 'R')
        dfs(row, col-1, 'L')
        currentIsland.WriteByte('0')
    }

    for row := 0; row < rows; row++ {
        for col := 0; col < cols; col++ {
            currentIsland.Reset()
            dfs(row, col, '0')
            if currentIsland.Len() == 0 {
                continue
            }
            islands[currentIsland.String()] = true
        }
    }
    return len(islands)
}
```

```kotlin
class Solution {
    private lateinit var grid: Array<IntArray>
    private lateinit var visited: Array<BooleanArray>
    private lateinit var currentIsland: StringBuilder

    fun numDistinctIslands(grid: Array<IntArray>): Int {
        this.grid = grid
        val rows = grid.size
        val cols = grid[0].size
        visited = Array(rows) { BooleanArray(cols) }
        val islands = HashSet<String>()

        for (row in 0 until rows) {
            for (col in 0 until cols) {
                currentIsland = StringBuilder()
                dfs(row, col, '0')
                if (currentIsland.isEmpty()) continue
                islands.add(currentIsland.toString())
            }
        }
        return islands.size
    }

    private fun dfs(row: Int, col: Int, dir: Char) {
        if (row < 0 || col < 0 || row >= grid.size || col >= grid[0].size) {
            return
        }
        if (visited[row][col] || grid[row][col] == 0) {
            return
        }
        visited[row][col] = true
        currentIsland.append(dir)
        dfs(row + 1, col, 'D')
        dfs(row - 1, col, 'U')
        dfs(row, col + 1, 'R')
        dfs(row, col - 1, 'L')
        currentIsland.append('0')
    }
}
```

```swift
class Solution {
    private var grid: [[Int]] = []
    private var visited: [[Bool]] = []
    private var currentIsland: [Character] = []

    func numDistinctIslands(_ grid: [[Int]]) -> Int {
        self.grid = grid
        let rows = grid.count, cols = grid[0].count
        visited = Array(repeating: Array(repeating: false, count: cols), count: rows)
        var islands = Set<String>()

        for row in 0..<rows {
            for col in 0..<cols {
                currentIsland = []
                dfs(row, col, "0")
                if currentIsland.isEmpty { continue }
                islands.insert(String(currentIsland))
            }
        }
        return islands.count
    }

    private func dfs(_ row: Int, _ col: Int, _ dir: Character) {
        if row < 0 || col < 0 || row >= grid.count || col >= grid[0].count {
            return
        }
        if visited[row][col] || grid[row][col] == 0 {
            return
        }
        visited[row][col] = true
        currentIsland.append(dir)
        dfs(row + 1, col, "D")
        dfs(row - 1, col, "U")
        dfs(row, col + 1, "R")
        dfs(row, col - 1, "L")
        currentIsland.append("0")
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M \cdot N)$
- Space complexity: $O(M \cdot N)$

>  Where $M$ is the number of rows, and $N$ is the number of columns
