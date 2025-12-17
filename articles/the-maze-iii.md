## 1. Dijkstra's

::tabs-start

```python
class Solution:
    def findShortestWay(self, maze: List[List[int]], ball: List[int], hole: List[int]) -> str:
        def valid(row, col):
            return 0 <= row < m and 0 <= col < n and maze[row][col] == 0
        
        def get_neighbors(row, col):
            directions = [(0, -1, 'l'), (-1, 0, 'u'), (0, 1, 'r'), (1, 0, 'd')]
            neighbors = []
            
            for dy, dx, direction in directions:
                curr_row = row
                curr_col = col
                dist = 0
                
                while valid(curr_row + dy, curr_col + dx):
                    curr_row += dy
                    curr_col += dx
                    dist += 1
                    if [curr_row, curr_col] == hole:
                        break
                    
                neighbors.append((curr_row, curr_col, dist, direction))
                
            return neighbors

        m = len(maze)
        n = len(maze[0])
        heap = [(0, "", ball[0], ball[1])]
        seen = set()
        
        while heap:
            curr_dist, path, row, col = heapq.heappop(heap)
            
            if (row, col) in seen:
                continue
            
            if [row, col] == hole:
                return path
            
            seen.add((row, col))
            
            for next_row, next_col, dist, direction in get_neighbors(row, col):
                heapq.heappush(heap, (curr_dist + dist, path + direction, next_row, next_col))

        return "impossible"
```

```java
class State {
    int row;
    int col;
    int dist;
    String path;
    
    public State(int row, int col, int dist, String path) {
        this.row = row;
        this.col = col;
        this.dist = dist;
        this.path = path;
    }
}

class Solution {
    int[][] directions = new int[][]{{0, -1}, {-1, 0}, {0, 1}, {1, 0}};
    String[] textDirections = new String[]{"l", "u", "r", "d"};
    int m;
    int n;
    
    public String findShortestWay(int[][] maze, int[] ball, int[] hole) {
        m = maze.length;
        n = maze[0].length;
        
        PriorityQueue<State> heap = new PriorityQueue<>((a, b) -> {
            int distA = a.dist;
            int distB = b.dist;
            
            if (distA == distB) {
                return a.path.compareTo(b.path);
            }
            
            return distA - distB;
        });
        
        boolean[][] seen = new boolean[m][n];
        heap.add(new State(ball[0], ball[1], 0, ""));
        
        while (!heap.isEmpty()) {
            State curr = heap.remove();
            int row = curr.row;
            int col = curr.col;
            
            if (seen[row][col]) {
                continue;
            }
            
            if (row == hole[0] && col == hole[1]) {
                return curr.path;
            }
            
            seen[row][col] = true;
            
            for (State nextState: getNeighbors(row, col, maze, hole)) {
                int nextRow = nextState.row;
                int nextCol = nextState.col;
                int nextDist = nextState.dist;
                String nextChar = nextState.path;
                heap.add(new State(nextRow, nextCol, curr.dist + nextDist, curr.path + nextChar));
            }
        }
        
        return "impossible";
    }
    
    private boolean valid(int row, int col, int[][] maze) {
        if (row < 0 || row >= m || col < 0 || col >= n) {
            return false;
        }

        return maze[row][col] == 0;
    }
    
    private List<State> getNeighbors(int row, int col, int[][] maze, int[] hole) {
        List<State> neighbors = new ArrayList<>();
        
        for (int i = 0; i < 4; i++) {
            int dy = directions[i][0];
            int dx = directions[i][1];
            String direction = textDirections[i];
            
            int currRow = row;
            int currCol = col;
            int dist = 0;
            
            while (valid(currRow + dy, currCol + dx, maze)) {
                currRow += dy;
                currCol += dx;
                dist++;
                if (currRow == hole[0] && currCol == hole[1]) {
                    break;
                }
            }
            
            neighbors.add(new State(currRow, currCol, dist, direction));
        }
        
        return neighbors;
    }
}
```

```cpp
class Solution {
private:
    // State: (distance, path, row, col)
    // Priority queue will sort by distance first, then path lexicographically
    using State = tuple<int, string, int, int>;
    
    vector<vector<int>> directions = {{0, -1}, {-1, 0}, {0, 1}, {1, 0}};
    vector<string> textDirections = {"l", "u", "r", "d"};
    int m;
    int n;
    
    bool valid(int row, int col, vector<vector<int>>& maze) {
        if (row < 0 || row >= m || col < 0 || col >= n) {
            return false;
        }
        return maze[row][col] == 0;
    }
    
    vector<State> getNeighbors(int row, int col, vector<vector<int>>& maze, vector<int>& hole) {
        vector<State> neighbors;
        
        for (int i = 0; i < 4; i++) {
            int dy = directions[i][0];
            int dx = directions[i][1];
            string direction = textDirections[i];
            
            int currRow = row;
            int currCol = col;
            int dist = 0;
            
            while (valid(currRow + dy, currCol + dx, maze)) {
                currRow += dy;
                currCol += dx;
                dist++;
                
                if (currRow == hole[0] && currCol == hole[1]) {
                    break;
                }
            }
            
            neighbors.push_back(make_tuple(dist, direction, currRow, currCol));
        }
        
        return neighbors;
    }
    
public:
    string findShortestWay(vector<vector<int>>& maze, vector<int>& ball, vector<int>& hole) {
        m = maze.size();
        n = maze[0].size();
        
        // Min heap: sorts by distance, then path lexicographically
        priority_queue<State, vector<State>, greater<State>> heap;
        vector<vector<bool>> seen(m, vector<bool>(n, false));
        
        heap.push(make_tuple(0, "", ball[0], ball[1]));
        
        while (!heap.empty()) {
            State curr = heap.top();
            heap.pop();
            
            int dist = get<0>(curr);
            string path = get<1>(curr);
            int row = get<2>(curr);
            int col = get<3>(curr);
            
            if (seen[row][col]) {
                continue;
            }
            
            if (row == hole[0] && col == hole[1]) {
                return path;
            }
            
            seen[row][col] = true;
            
            for (State& nextState : getNeighbors(row, col, maze, hole)) {
                int nextDist = get<0>(nextState);
                string nextChar = get<1>(nextState);
                int nextRow = get<2>(nextState);
                int nextCol = get<3>(nextState);
                
                heap.push(make_tuple(dist + nextDist, path + nextChar, nextRow, nextCol));
            }
        }
        
        return "impossible";
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} maze
     * @param {number[]} ball
     * @param {number[]} hole
     * @return {string}
     */
    findShortestWay(maze, ball, hole) {
        const m = maze.length;
        const n = maze[0].length;
        
        const valid = (row, col) => {
            return row >= 0 && row < m && col >= 0 && col < n && maze[row][col] === 0;
        };
        
        const getNeighbors = (row, col) => {
            const directions = [[0, -1, 'l'], [-1, 0, 'u'], [0, 1, 'r'], [1, 0, 'd']];
            const neighbors = [];
            
            for (const [dy, dx, direction] of directions) {
                let currRow = row;
                let currCol = col;
                let dist = 0;
                
                while (valid(currRow + dy, currCol + dx)) {
                    currRow += dy;
                    currCol += dx;
                    dist++;
                    
                    if (currRow === hole[0] && currCol === hole[1]) {
                        break;
                    }
                }
                
                neighbors.push([currRow, currCol, dist, direction]);
            }
            
            return neighbors;
        };
        
        const pq = new PriorityQueue((a, b) => {
            if (a.dist !== b.dist) {
                return a.dist - b.dist;
            }
            return a.path.localeCompare(b.path);
        });
        
        pq.enqueue({ dist: 0, path: "", row: ball[0], col: ball[1] });
        
        const seen = new Set();
        
        while (!pq.isEmpty()) {
            const { dist: currDist, path, row, col } = pq.dequeue();
            
            const key = `${row},${col}`;
            if (seen.has(key)) {
                continue;
            }
            
            if (row === hole[0] && col === hole[1]) {
                return path;
            }
            
            seen.add(key);
            
            for (const [nextRow, nextCol, dist, direction] of getNeighbors(row, col)) {
                pq.enqueue({
                    dist: currDist + dist,
                    path: path + direction,
                    row: nextRow,
                    col: nextCol
                });
            }
        }
        
        return "impossible";
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \log n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of squares in `maze`.
