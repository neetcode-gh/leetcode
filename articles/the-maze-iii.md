## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Dijkstra's Algorithm** - Finding the shortest path with weighted edges (rolling distances)
- **Priority Queue / Min-Heap** - Efficiently extracting the minimum distance state and comparing paths lexicographically
- **String Comparison** - Tie-breaking between equal-distance paths requires lexicographic ordering
- **2D Matrix Navigation** - Rolling the ball in four directions while checking for the hole

---

## 1. Dijkstra's

### Intuition

This problem extends Maze II by adding a hole the ball can fall into and requiring the lexicographically smallest path among all shortest paths. The ball must stop at the hole if it rolls over it during movement.

We use Dijkstra's algorithm with a priority queue that orders states by distance first, then by path string lexicographically. This ensures when we first reach the hole, we have both the shortest distance and the lexicographically smallest path for that distance.

### Algorithm

1. Define a helper function to check if a cell is valid (within bounds and not a wall).
2. Define a function to get neighbors: for each direction (ordered as `'d'`, `'l'`, `'r'`, `'u'` for lexicographic preference), roll the ball until hitting a wall or the hole.
3. Initialize a min-heap with the starting position, ordered by `(distance, path)`.
4. Use a set to track visited positions.
5. While the heap is not empty:
   - Pop the state with minimum distance (and lexicographically smallest path for ties).
   - If already visited, skip. If at the hole, return the path.
   - Mark as visited and add all neighbor states to the heap.
6. If the heap empties without reaching the hole, return `"impossible"`.

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

```go
func findShortestWay(maze [][]int, ball []int, hole []int) string {
    m, n := len(maze), len(maze[0])

    valid := func(row, col int) bool {
        return row >= 0 && row < m && col >= 0 && col < n && maze[row][col] == 0
    }

    getNeighbors := func(row, col int) [][]interface{} {
        directions := [][]interface{}{{0, -1, "l"}, {-1, 0, "u"}, {0, 1, "r"}, {1, 0, "d"}}
        neighbors := [][]interface{}{}

        for _, d := range directions {
            dy, dx, direction := d[0].(int), d[1].(int), d[2].(string)
            currRow, currCol := row, col
            dist := 0

            for valid(currRow+dy, currCol+dx) {
                currRow += dy
                currCol += dx
                dist++
                if currRow == hole[0] && currCol == hole[1] {
                    break
                }
            }
            neighbors = append(neighbors, []interface{}{currRow, currCol, dist, direction})
        }
        return neighbors
    }

    pq := &PriorityQueue{}
    heap.Init(pq)
    heap.Push(pq, &State{0, "", ball[0], ball[1]})

    seen := make(map[[2]int]bool)

    for pq.Len() > 0 {
        curr := heap.Pop(pq).(*State)

        key := [2]int{curr.row, curr.col}
        if seen[key] {
            continue
        }

        if curr.row == hole[0] && curr.col == hole[1] {
            return curr.path
        }

        seen[key] = true

        for _, neighbor := range getNeighbors(curr.row, curr.col) {
            nextRow := neighbor[0].(int)
            nextCol := neighbor[1].(int)
            dist := neighbor[2].(int)
            direction := neighbor[3].(string)
            heap.Push(pq, &State{curr.dist + dist, curr.path + direction, nextRow, nextCol})
        }
    }

    return "impossible"
}

type State struct {
    dist int
    path string
    row  int
    col  int
}

type PriorityQueue []*State

func (pq PriorityQueue) Len() int { return len(pq) }
func (pq PriorityQueue) Less(i, j int) bool {
    if pq[i].dist != pq[j].dist {
        return pq[i].dist < pq[j].dist
    }
    return pq[i].path < pq[j].path
}
func (pq PriorityQueue) Swap(i, j int)       { pq[i], pq[j] = pq[j], pq[i] }
func (pq *PriorityQueue) Push(x interface{}) { *pq = append(*pq, x.(*State)) }
func (pq *PriorityQueue) Pop() interface{} {
    old := *pq
    n := len(old)
    x := old[n-1]
    *pq = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun findShortestWay(maze: Array<IntArray>, ball: IntArray, hole: IntArray): String {
        val m = maze.size
        val n = maze[0].size
        val textDirections = arrayOf("l", "u", "r", "d")
        val directions = arrayOf(intArrayOf(0, -1), intArrayOf(-1, 0), intArrayOf(0, 1), intArrayOf(1, 0))

        fun valid(row: Int, col: Int): Boolean {
            return row in 0 until m && col in 0 until n && maze[row][col] == 0
        }

        fun getNeighbors(row: Int, col: Int): List<IntArray> {
            val neighbors = mutableListOf<IntArray>()
            for (i in 0 until 4) {
                val dy = directions[i][0]
                val dx = directions[i][1]
                var currRow = row
                var currCol = col
                var dist = 0

                while (valid(currRow + dy, currCol + dx)) {
                    currRow += dy
                    currCol += dx
                    dist++
                    if (currRow == hole[0] && currCol == hole[1]) break
                }
                neighbors.add(intArrayOf(currRow, currCol, dist, i))
            }
            return neighbors
        }

        data class State(val dist: Int, val path: String, val row: Int, val col: Int)

        val pq = PriorityQueue<State>(compareBy({ it.dist }, { it.path }))
        pq.offer(State(0, "", ball[0], ball[1]))

        val seen = HashSet<Pair<Int, Int>>()

        while (pq.isNotEmpty()) {
            val curr = pq.poll()

            val key = Pair(curr.row, curr.col)
            if (key in seen) continue

            if (curr.row == hole[0] && curr.col == hole[1]) {
                return curr.path
            }

            seen.add(key)

            for (neighbor in getNeighbors(curr.row, curr.col)) {
                val nextRow = neighbor[0]
                val nextCol = neighbor[1]
                val dist = neighbor[2]
                val dirIdx = neighbor[3]
                pq.offer(State(curr.dist + dist, curr.path + textDirections[dirIdx], nextRow, nextCol))
            }
        }

        return "impossible"
    }
}
```

```swift
class Solution {
    func findShortestWay(_ maze: [[Int]], _ ball: [Int], _ hole: [Int]) -> String {
        let m = maze.count
        let n = maze[0].count

        func valid(_ row: Int, _ col: Int) -> Bool {
            return row >= 0 && row < m && col >= 0 && col < n && maze[row][col] == 0
        }

        func getNeighbors(_ row: Int, _ col: Int) -> [(Int, Int, Int, String)] {
            let directions = [(0, -1, "l"), (-1, 0, "u"), (0, 1, "r"), (1, 0, "d")]
            var neighbors = [(Int, Int, Int, String)]()

            for (dy, dx, direction) in directions {
                var currRow = row
                var currCol = col
                var dist = 0

                while valid(currRow + dy, currCol + dx) {
                    currRow += dy
                    currCol += dx
                    dist += 1
                    if currRow == hole[0] && currCol == hole[1] {
                        break
                    }
                }
                neighbors.append((currRow, currCol, dist, direction))
            }
            return neighbors
        }

        var heap = Heap<(dist: Int, path: String, row: Int, col: Int)>(comparator: {
            if $0.dist != $1.dist { return $0.dist < $1.dist }
            return $0.path < $1.path
        })
        heap.insert((0, "", ball[0], ball[1]))

        var seen = Set<String>()

        while !heap.isEmpty {
            let curr = heap.remove()!

            let key = "\(curr.row),\(curr.col)"
            if seen.contains(key) { continue }

            if curr.row == hole[0] && curr.col == hole[1] {
                return curr.path
            }

            seen.insert(key)

            for neighbor in getNeighbors(curr.row, curr.col) {
                let (nextRow, nextCol, dist, direction) = neighbor
                heap.insert((curr.dist + dist, curr.path + direction, nextRow, nextCol))
            }
        }

        return "impossible"
    }
}

struct Heap<T> {
    var elements: [T] = []
    let comparator: (T, T) -> Bool

    var isEmpty: Bool { elements.isEmpty }

    mutating func insert(_ element: T) {
        elements.append(element)
        siftUp(elements.count - 1)
    }

    mutating func remove() -> T? {
        guard !elements.isEmpty else { return nil }
        elements.swapAt(0, elements.count - 1)
        let element = elements.removeLast()
        if !elements.isEmpty { siftDown(0) }
        return element
    }

    private mutating func siftUp(_ index: Int) {
        var i = index
        while i > 0 {
            let parent = (i - 1) / 2
            if comparator(elements[i], elements[parent]) {
                elements.swapAt(i, parent)
                i = parent
            } else { break }
        }
    }

    private mutating func siftDown(_ index: Int) {
        var i = index
        while 2 * i + 1 < elements.count {
            var j = 2 * i + 1
            if j + 1 < elements.count && comparator(elements[j + 1], elements[j]) { j += 1 }
            if comparator(elements[j], elements[i]) {
                elements.swapAt(i, j)
                i = j
            } else { break }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \log n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of squares in `maze`.

---

## Common Pitfalls

### Not Stopping at the Hole During Rolling

Unlike Maze I and II, the ball must stop if it rolls over the hole. A common mistake is letting the ball continue past the hole to the wall. During each roll, check if the current position equals the hole and break the rolling loop immediately if so.

### Incorrect Lexicographic Ordering of Directions

When multiple paths have the same shortest distance, the lexicographically smallest path must be returned. The directions must be ordered as `d`, `l`, `r`, `u` (alphabetically) in the priority queue comparator, or the path strings must be compared correctly when distances are equal.

### Priority Queue Not Comparing Paths Correctly

The priority queue must order states first by distance, then by path string lexicographically. Using only distance comparison or comparing paths incorrectly leads to returning a non-lexicographically-smallest path among equally short paths.

### Returning Path Without Reaching the Hole

The ball must actually fall into the hole, not just pass over or stop adjacent to it. If the destination is never reached by any valid rolling path, return `"impossible"`. Ensure the hole check happens when the ball actually stops at or rolls into the hole position.

### Not Tracking Visited States Properly

Without proper visited tracking, the algorithm may revisit the same position multiple times, leading to infinite loops or incorrect paths. Mark positions as visited only after processing them from the priority queue, not when adding them, to ensure the shortest path is found first.
