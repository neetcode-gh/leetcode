## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Graph Traversal (DFS/BFS)** - The ball's movement through the maze is modeled as graph exploration
- **Dijkstra's Algorithm** - The optimal solution uses Dijkstra's to find the shortest weighted path
- **Priority Queue / Min-Heap** - Required for efficient implementation of Dijkstra's algorithm
- **2D Matrix Navigation** - Rolling the ball requires moving in four directions until hitting a wall

---

## 1. Depth First Search

### Intuition

Unlike Maze I where we just need to determine reachability, here we need to find the shortest distance. The ball rolls until it hits a wall, and each cell it passes counts as one unit of distance.

We can use DFS with distance tracking: maintain a distance matrix where each cell stores the shortest known distance to reach it. When we find a shorter path to a stopping position, update the distance and continue exploring from there.

### Algorithm

1. Initialize a distance matrix with infinity, set the starting position's distance to `0`.
2. Define a recursive `dfs` function:
   - For each of the four directions:
     - Roll the ball and count the cells traversed until hitting a wall.
     - Calculate the total distance to the stopping position.
     - If this distance is shorter than the previously recorded distance, update it and recursively explore from the new position.
3. Start `dfs` from the initial position.
4. Return the distance at the destination, or `-1` if it remains infinity.

::tabs-start

```java
class Solution {
    public int shortestDistance(int[][] maze, int[] start, int[] dest) {
        int[][] distance = new int[maze.length][maze[0].length];
        for (int[] row: distance)
            Arrays.fill(row, Integer.MAX_VALUE);
        distance[start[0]][start[1]] = 0;
        dfs(maze, start, distance);
        return distance[dest[0]][dest[1]] == Integer.MAX_VALUE ? -1 : distance[dest[0]][dest[1]];
    }

    public void dfs(int[][] maze, int[] start, int[][] distance) {
        int[][] dirs={{0,1}, {0,-1}, {-1,0}, {1,0}};
        for (int[] dir: dirs) {
            int x = start[0] + dir[0];
            int y = start[1] + dir[1];
            int count = 0;
            while (x >= 0 && y >= 0 && x < maze.length && y < maze[0].length && maze[x][y] == 0) {
                x += dir[0];
                y += dir[1];
                count++;
            }
            if (distance[start[0]][start[1]] + count < distance[x - dir[0]][y - dir[1]]) {
                distance[x - dir[0]][y - dir[1]] = distance[start[0]][start[1]] + count;
                dfs(maze, new int[]{x - dir[0],y - dir[1]}, distance);
            }
        }
    }
}
```

```go
func shortestDistance(maze [][]int, start []int, destination []int) int {
    m, n := len(maze), len(maze[0])
    distance := make([][]int, m)
    for i := range distance {
        distance[i] = make([]int, n)
        for j := range distance[i] {
            distance[i][j] = math.MaxInt32
        }
    }
    distance[start[0]][start[1]] = 0

    var dfs func(start []int)
    dfs = func(start []int) {
        dirs := [][]int{{0, 1}, {0, -1}, {-1, 0}, {1, 0}}
        for _, dir := range dirs {
            x, y := start[0]+dir[0], start[1]+dir[1]
            count := 0
            for x >= 0 && y >= 0 && x < m && y < n && maze[x][y] == 0 {
                x += dir[0]
                y += dir[1]
                count++
            }
            if distance[start[0]][start[1]]+count < distance[x-dir[0]][y-dir[1]] {
                distance[x-dir[0]][y-dir[1]] = distance[start[0]][start[1]] + count
                dfs([]int{x - dir[0], y - dir[1]})
            }
        }
    }

    dfs(start)
    if distance[destination[0]][destination[1]] == math.MaxInt32 {
        return -1
    }
    return distance[destination[0]][destination[1]]
}
```

```kotlin
class Solution {
    fun shortestDistance(maze: Array<IntArray>, start: IntArray, destination: IntArray): Int {
        val m = maze.size
        val n = maze[0].size
        val distance = Array(m) { IntArray(n) { Int.MAX_VALUE } }
        distance[start[0]][start[1]] = 0

        fun dfs(s: IntArray) {
            val dirs = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1), intArrayOf(-1, 0), intArrayOf(1, 0))
            for (dir in dirs) {
                var x = s[0] + dir[0]
                var y = s[1] + dir[1]
                var count = 0
                while (x in 0 until m && y in 0 until n && maze[x][y] == 0) {
                    x += dir[0]
                    y += dir[1]
                    count++
                }
                if (distance[s[0]][s[1]] + count < distance[x - dir[0]][y - dir[1]]) {
                    distance[x - dir[0]][y - dir[1]] = distance[s[0]][s[1]] + count
                    dfs(intArrayOf(x - dir[0], y - dir[1]))
                }
            }
        }

        dfs(start)
        return if (distance[destination[0]][destination[1]] == Int.MAX_VALUE) -1
               else distance[destination[0]][destination[1]]
    }
}
```

```swift
class Solution {
    func shortestDistance(_ maze: [[Int]], _ start: [Int], _ destination: [Int]) -> Int {
        let m = maze.count
        let n = maze[0].count
        var distance = [[Int]](repeating: [Int](repeating: Int.max, count: n), count: m)
        distance[start[0]][start[1]] = 0

        func dfs(_ s: [Int]) {
            let dirs = [[0, 1], [0, -1], [-1, 0], [1, 0]]
            for dir in dirs {
                var x = s[0] + dir[0]
                var y = s[1] + dir[1]
                var count = 0
                while x >= 0 && y >= 0 && x < m && y < n && maze[x][y] == 0 {
                    x += dir[0]
                    y += dir[1]
                    count += 1
                }
                if distance[s[0]][s[1]] + count < distance[x - dir[0]][y - dir[1]] {
                    distance[x - dir[0]][y - dir[1]] = distance[s[0]][s[1]] + count
                    dfs([x - dir[0], y - dir[1]])
                }
            }
        }

        dfs(start)
        return distance[destination[0]][destination[1]] == Int.max ? -1 : distance[destination[0]][destination[1]]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot n \cdot max(m,n))$
- Space complexity: $O(m \cdot n)$

>  Where $m$ and $n$ are the number of rows and columns in `maze`.

---

## 2. Breadth First Search

### Intuition

BFS can also solve this problem, but unlike typical BFS for shortest path, we cannot stop when we first reach the destination. This is because the ball rolls varying distances, so the first path to reach a position might not be the shortest.

Instead, we use BFS with distance relaxation: whenever we find a shorter path to a stopping position, we update the distance and add it back to the queue for further exploration.

### Algorithm

1. Initialize a distance matrix with infinity and set the start position's distance to `0`.
2. Add the start position to a queue.
3. While the queue is not empty:
   - Dequeue the current position.
   - For each direction, roll the ball and count the distance.
   - If the new total distance is shorter than the recorded distance at the stopping position, update it and enqueue that position.
4. Return the distance at the destination, or `-1` if unreachable.

::tabs-start

```java
class Solution {
    public int shortestDistance(int[][] maze, int[] start, int[] dest) {
        int[][] distance = new int[maze.length][maze[0].length];
        for (int[] row: distance)
            Arrays.fill(row, Integer.MAX_VALUE);

        distance[start[0]][start[1]] = 0;
        int[][] dirs={{0, 1} ,{0, -1}, {-1, 0}, {1, 0}};
        Queue < int[] > queue = new LinkedList < > ();
        queue.add(start);
        while (!queue.isEmpty()) {
            int[] s = queue.remove();
            for (int[] dir: dirs) {
                int x = s[0] + dir[0];
                int y = s[1] + dir[1];
                int count = 0;
                while (x >= 0 && y >= 0 && x < maze.length && y < maze[0].length && maze[x][y] == 0) {
                    x += dir[0];
                    y += dir[1];
                    count++;
                }

                if (distance[s[0]][s[1]] + count < distance[x - dir[0]][y - dir[1]]) {
                    distance[x - dir[0]][y - dir[1]] = distance[s[0]][s[1]] + count;
                    queue.add(new int[] {x - dir[0], y - dir[1]});
                }
            }
        }
        return distance[dest[0]][dest[1]] == Integer.MAX_VALUE ? -1 : distance[dest[0]][dest[1]];
    }
}
```

```go
func shortestDistance(maze [][]int, start []int, destination []int) int {
    m, n := len(maze), len(maze[0])
    distance := make([][]int, m)
    for i := range distance {
        distance[i] = make([]int, n)
        for j := range distance[i] {
            distance[i][j] = math.MaxInt32
        }
    }
    distance[start[0]][start[1]] = 0

    dirs := [][]int{{0, 1}, {0, -1}, {-1, 0}, {1, 0}}
    queue := [][]int{start}

    for len(queue) > 0 {
        s := queue[0]
        queue = queue[1:]
        for _, dir := range dirs {
            x, y := s[0]+dir[0], s[1]+dir[1]
            count := 0
            for x >= 0 && y >= 0 && x < m && y < n && maze[x][y] == 0 {
                x += dir[0]
                y += dir[1]
                count++
            }
            if distance[s[0]][s[1]]+count < distance[x-dir[0]][y-dir[1]] {
                distance[x-dir[0]][y-dir[1]] = distance[s[0]][s[1]] + count
                queue = append(queue, []int{x - dir[0], y - dir[1]})
            }
        }
    }

    if distance[destination[0]][destination[1]] == math.MaxInt32 {
        return -1
    }
    return distance[destination[0]][destination[1]]
}
```

```kotlin
class Solution {
    fun shortestDistance(maze: Array<IntArray>, start: IntArray, destination: IntArray): Int {
        val m = maze.size
        val n = maze[0].size
        val distance = Array(m) { IntArray(n) { Int.MAX_VALUE } }
        distance[start[0]][start[1]] = 0

        val dirs = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1), intArrayOf(-1, 0), intArrayOf(1, 0))
        val queue: Queue<IntArray> = LinkedList()
        queue.add(start)

        while (queue.isNotEmpty()) {
            val s = queue.poll()
            for (dir in dirs) {
                var x = s[0] + dir[0]
                var y = s[1] + dir[1]
                var count = 0
                while (x in 0 until m && y in 0 until n && maze[x][y] == 0) {
                    x += dir[0]
                    y += dir[1]
                    count++
                }
                if (distance[s[0]][s[1]] + count < distance[x - dir[0]][y - dir[1]]) {
                    distance[x - dir[0]][y - dir[1]] = distance[s[0]][s[1]] + count
                    queue.add(intArrayOf(x - dir[0], y - dir[1]))
                }
            }
        }

        return if (distance[destination[0]][destination[1]] == Int.MAX_VALUE) -1
               else distance[destination[0]][destination[1]]
    }
}
```

```swift
class Solution {
    func shortestDistance(_ maze: [[Int]], _ start: [Int], _ destination: [Int]) -> Int {
        let m = maze.count
        let n = maze[0].count
        var distance = [[Int]](repeating: [Int](repeating: Int.max, count: n), count: m)
        distance[start[0]][start[1]] = 0

        let dirs = [[0, 1], [0, -1], [-1, 0], [1, 0]]
        var queue = [start]

        while !queue.isEmpty {
            let s = queue.removeFirst()
            for dir in dirs {
                var x = s[0] + dir[0]
                var y = s[1] + dir[1]
                var count = 0
                while x >= 0 && y >= 0 && x < m && y < n && maze[x][y] == 0 {
                    x += dir[0]
                    y += dir[1]
                    count += 1
                }
                if distance[s[0]][s[1]] + count < distance[x - dir[0]][y - dir[1]] {
                    distance[x - dir[0]][y - dir[1]] = distance[s[0]][s[1]] + count
                    queue.append([x - dir[0], y - dir[1]])
                }
            }
        }

        return distance[destination[0]][destination[1]] == Int.max ? -1 : distance[destination[0]][destination[1]]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot n \cdot (m + n))$
- Space complexity: $O(m \cdot n)$

>  Where $m$ and $n$ are the number of rows and columns in `maze`.

---

## 3. Dijkstra's Algorithm

### Intuition

Since edge weights (rolling distances) vary, Dijkstra's algorithm is a natural fit. The key insight is that once we process a position with Dijkstra (after extracting it with the minimum distance), we have found the shortest path to that position.

This version uses a simple implementation where we scan the entire distance matrix to find the unvisited position with minimum distance. While correct, this approach is slower than using a priority queue.

### Algorithm

1. Initialize a distance matrix with infinity and a visited matrix with `false`. Set start distance to `0`.
2. Repeat until no unvisited positions remain:
   - Find the unvisited position with minimum distance.
   - Mark it as visited.
   - For each direction, roll the ball and count the distance.
   - If the new distance is shorter, update the distance matrix.
3. Return the distance at the destination, or `-1` if unreachable.

::tabs-start

```java
class Solution {
    public int shortestDistance(int[][] maze, int[] start, int[] dest) {
        int[][] distance = new int[maze.length][maze[0].length];
        boolean[][] visited = new boolean[maze.length][maze[0].length];
        for (int[] row: distance)
            Arrays.fill(row, Integer.MAX_VALUE);

        distance[start[0]][start[1]] = 0;
        dijkstra(maze, distance, visited);
        return distance[dest[0]][dest[1]] == Integer.MAX_VALUE ? -1 : distance[dest[0]][dest[1]];
    }

    public int[] minDistance(int[][] distance, boolean[][] visited) {
        int[] min={-1,-1};
        int min_val = Integer.MAX_VALUE;

        for (int i = 0; i < distance.length; i++) {
            for (int j = 0; j < distance[0].length; j++) {
                if (!visited[i][j] && distance[i][j] < min_val) {
                    min = new int[] {i, j};
                    min_val = distance[i][j];
                }
            }
        }

        return min;
    }

    public void dijkstra(int[][] maze, int[][] distance, boolean[][] visited) {
        int[][] dirs={{0,1},{0,-1},{-1,0},{1,0}};
        while (true) {
            int[] s = minDistance(distance, visited);
            if (s[0] < 0)
                break;
            visited[s[0]][s[1]] = true;
            for (int[] dir: dirs) {
                int x = s[0] + dir[0];
                int y = s[1] + dir[1];
                int count = 0;
                while (x >= 0 && y >= 0 && x < maze.length && y < maze[0].length && maze[x][y] == 0) {
                    x += dir[0];
                    y += dir[1];
                    count++;
                }

                if (distance[s[0]][s[1]] + count < distance[x - dir[0]][y - dir[1]]) {
                    distance[x - dir[0]][y - dir[1]] = distance[s[0]][s[1]] + count;
                }
            }
        }
    }
}
```

```go
func shortestDistance(maze [][]int, start []int, destination []int) int {
    m, n := len(maze), len(maze[0])
    distance := make([][]int, m)
    visited := make([][]bool, m)
    for i := range distance {
        distance[i] = make([]int, n)
        visited[i] = make([]bool, n)
        for j := range distance[i] {
            distance[i][j] = math.MaxInt32
        }
    }
    distance[start[0]][start[1]] = 0

    minDistance := func() []int {
        minPos := []int{-1, -1}
        minVal := math.MaxInt32
        for i := 0; i < m; i++ {
            for j := 0; j < n; j++ {
                if !visited[i][j] && distance[i][j] < minVal {
                    minPos = []int{i, j}
                    minVal = distance[i][j]
                }
            }
        }
        return minPos
    }

    dirs := [][]int{{0, 1}, {0, -1}, {-1, 0}, {1, 0}}
    for {
        s := minDistance()
        if s[0] < 0 {
            break
        }
        visited[s[0]][s[1]] = true
        for _, dir := range dirs {
            x, y := s[0]+dir[0], s[1]+dir[1]
            count := 0
            for x >= 0 && y >= 0 && x < m && y < n && maze[x][y] == 0 {
                x += dir[0]
                y += dir[1]
                count++
            }
            if distance[s[0]][s[1]]+count < distance[x-dir[0]][y-dir[1]] {
                distance[x-dir[0]][y-dir[1]] = distance[s[0]][s[1]] + count
            }
        }
    }

    if distance[destination[0]][destination[1]] == math.MaxInt32 {
        return -1
    }
    return distance[destination[0]][destination[1]]
}
```

```kotlin
class Solution {
    fun shortestDistance(maze: Array<IntArray>, start: IntArray, destination: IntArray): Int {
        val m = maze.size
        val n = maze[0].size
        val distance = Array(m) { IntArray(n) { Int.MAX_VALUE } }
        val visited = Array(m) { BooleanArray(n) }
        distance[start[0]][start[1]] = 0

        fun minDistance(): IntArray {
            var minPos = intArrayOf(-1, -1)
            var minVal = Int.MAX_VALUE
            for (i in 0 until m) {
                for (j in 0 until n) {
                    if (!visited[i][j] && distance[i][j] < minVal) {
                        minPos = intArrayOf(i, j)
                        minVal = distance[i][j]
                    }
                }
            }
            return minPos
        }

        val dirs = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1), intArrayOf(-1, 0), intArrayOf(1, 0))
        while (true) {
            val s = minDistance()
            if (s[0] < 0) break
            visited[s[0]][s[1]] = true
            for (dir in dirs) {
                var x = s[0] + dir[0]
                var y = s[1] + dir[1]
                var count = 0
                while (x in 0 until m && y in 0 until n && maze[x][y] == 0) {
                    x += dir[0]
                    y += dir[1]
                    count++
                }
                if (distance[s[0]][s[1]] + count < distance[x - dir[0]][y - dir[1]]) {
                    distance[x - dir[0]][y - dir[1]] = distance[s[0]][s[1]] + count
                }
            }
        }

        return if (distance[destination[0]][destination[1]] == Int.MAX_VALUE) -1
               else distance[destination[0]][destination[1]]
    }
}
```

```swift
class Solution {
    func shortestDistance(_ maze: [[Int]], _ start: [Int], _ destination: [Int]) -> Int {
        let m = maze.count
        let n = maze[0].count
        var distance = [[Int]](repeating: [Int](repeating: Int.max, count: n), count: m)
        var visited = [[Bool]](repeating: [Bool](repeating: false, count: n), count: m)
        distance[start[0]][start[1]] = 0

        func minDistance() -> [Int] {
            var minPos = [-1, -1]
            var minVal = Int.max
            for i in 0..<m {
                for j in 0..<n {
                    if !visited[i][j] && distance[i][j] < minVal {
                        minPos = [i, j]
                        minVal = distance[i][j]
                    }
                }
            }
            return minPos
        }

        let dirs = [[0, 1], [0, -1], [-1, 0], [1, 0]]
        while true {
            let s = minDistance()
            if s[0] < 0 { break }
            visited[s[0]][s[1]] = true
            for dir in dirs {
                var x = s[0] + dir[0]
                var y = s[1] + dir[1]
                var count = 0
                while x >= 0 && y >= 0 && x < m && y < n && maze[x][y] == 0 {
                    x += dir[0]
                    y += dir[1]
                    count += 1
                }
                if distance[s[0]][s[1]] + count < distance[x - dir[0]][y - dir[1]] {
                    distance[x - dir[0]][y - dir[1]] = distance[s[0]][s[1]] + count
                }
            }
        }

        return distance[destination[0]][destination[1]] == Int.max ? -1 : distance[destination[0]][destination[1]]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((mn)^2)$
- Space complexity: $O(mn)$

>  Where $m$ and $n$ are the number of rows and columns in `maze`.

---

## 4. Dijkstra's Algorithm and Priority Queue

### Intuition

Using a priority queue (min-heap) optimizes Dijkstra's algorithm by efficiently extracting the position with the minimum distance. Instead of scanning the entire matrix, we simply pop from the heap.

When we pop a position from the heap, if its distance is already worse than what we have recorded, we skip it (this handles duplicate entries). Otherwise, we explore all four directions and add newly discovered shorter paths to the heap.

### Algorithm

1. Initialize a distance matrix with infinity. Set start distance to `0`.
2. Add the start position to a min-heap, ordered by distance.
3. While the heap is not empty:
   - Pop the position with minimum distance.
   - If its distance exceeds the recorded distance, skip it.
   - For each direction, roll the ball and count the distance.
   - If the new distance is shorter, update the distance matrix and push the new position to the heap.
4. Return the distance at the destination, or `-1` if unreachable.

::tabs-start

```python
class Solution:
    def shortestDistance(self, maze: List[List[int]], start: List[int], destination: List[int]) -> int:
        distance = [[float('inf')] * len(maze[0]) for _ in range(len(maze))]
        distance[start[0]][start[1]] = 0
        self.dijkstra(maze, start, distance)
        return -1 if distance[destination[0]][destination[1]] == float('inf') else distance[destination[0]][destination[1]]
    
    def dijkstra(self, maze: List[List[int]], start: List[int], distance: List[List[int]]) -> None:
        dirs = [[0, 1], [0, -1], [-1, 0], [1, 0]]
        queue = []
        heapq.heappush(queue, (0, start[0], start[1]))  # (distance, x, y)
        
        while queue:
            dist, sx, sy = heapq.heappop(queue)
            
            if distance[sx][sy] < dist:
                continue
            
            for dx, dy in dirs:
                x, y = sx + dx, sy + dy
                count = 0
                
                while 0 <= x < len(maze) and 0 <= y < len(maze[0]) and maze[x][y] == 0:
                    x += dx
                    y += dy
                    count += 1
                
                if distance[sx][sy] + count < distance[x - dx][y - dy]:
                    distance[x - dx][y - dy] = distance[sx][sy] + count
                    heapq.heappush(queue, (distance[x - dx][y - dy], x - dx, y - dy))
```

```java
class Solution {
    public int shortestDistance(int[][] maze, int[] start, int[] dest) {
        int[][] distance = new int[maze.length][maze[0].length];

        for (int[] row: distance)
            Arrays.fill(row, Integer.MAX_VALUE);

        distance[start[0]][start[1]] = 0;
        dijkstra(maze, start, distance);
        return distance[dest[0]][dest[1]] == Integer.MAX_VALUE ? -1 : distance[dest[0]][dest[1]];
    }

    public void dijkstra(int[][] maze, int[] start, int[][] distance) {
        int[][] dirs={{0,1},{0,-1},{-1,0},{1,0}};
        PriorityQueue < int[] > queue = new PriorityQueue < > ((a, b) -> a[2] - b[2]);
        queue.offer(new int[]{start[0],start[1],0});

        while (!queue.isEmpty()) {
            int[] s = queue.poll();
            if(distance[s[0]][s[1]] < s[2])
                continue;

            for (int[] dir: dirs) {
                int x = s[0] + dir[0];
                int y = s[1] + dir[1];
                int count = 0;
                while (x >= 0 && y >= 0 && x < maze.length && y < maze[0].length && maze[x][y] == 0) {
                    x += dir[0];
                    y += dir[1];
                    count++;
                }
                
                if (distance[s[0]][s[1]] + count < distance[x - dir[0]][y - dir[1]]) {
                    distance[x - dir[0]][y - dir[1]] = distance[s[0]][s[1]] + count;
                    queue.offer(new int[]{x - dir[0], y - dir[1], distance[x - dir[0]][y - dir[1]]});
                }
            }
        }
    }
}
```

```cpp
class Solution {
public:
    int shortestDistance(vector<vector<int>>& maze, vector<int>& start, vector<int>& destination) {
        int m = maze.size();
        int n = maze[0].size();
        vector<vector<int>> distance(m, vector<int>(n, INT_MAX));
        distance[start[0]][start[1]] = 0;
        dijkstra(maze, start, distance);
        return distance[destination[0]][destination[1]] == INT_MAX ? -1 : distance[destination[0]][destination[1]];
    }
    
private:
    void dijkstra(vector<vector<int>>& maze, vector<int>& start, vector<vector<int>>& distance) {
        int m = maze.size();
        int n = maze[0].size();
        vector<vector<int>> dirs = {{0, 1}, {0, -1}, {-1, 0}, {1, 0}};
        
        // Min-heap: {distance, x, y}
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> pq;
        pq.push({0, start[0], start[1]});
        
        while (!pq.empty()) {
            vector<int> s = pq.top();
            pq.pop();
            int dist = s[0], sx = s[1], sy = s[2];
            
            if (distance[sx][sy] < dist)
                continue;
            
            for (auto& dir : dirs) {
                int x = sx + dir[0];
                int y = sy + dir[1];
                int count = 0;
                
                while (x >= 0 && y >= 0 && x < m && y < n && maze[x][y] == 0) {
                    x += dir[0];
                    y += dir[1];
                    count++;
                }
                
                if (distance[sx][sy] + count < distance[x - dir[0]][y - dir[1]]) {
                    distance[x - dir[0]][y - dir[1]] = distance[sx][sy] + count;
                    pq.push({distance[x - dir[0]][y - dir[1]], x - dir[0], y - dir[1]});
                }
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} maze
     * @param {number[]} start
     * @param {number[]} destination
     * @return {number}
     */
    shortestDistance(maze, start, destination) {
        const m = maze.length;
        const n = maze[0].length;
        const distance = Array.from({ length: m }, () => Array(n).fill(Infinity));
        distance[start[0]][start[1]] = 0;
        this.dijkstra(maze, start, distance);
        return distance[destination[0]][destination[1]] === Infinity ? -1 : distance[destination[0]][destination[1]];
    }

    /**
     * @param {number[][]} maze
     * @param {number[]} start
     * @param {number[][]} distance
     * @return {void}
     */
    dijkstra(maze, start, distance) {
        const m = maze.length;
        const n = maze[0].length;
        const dirs = [[0, 1], [0, -1], [-1, 0], [1, 0]];

        // @datastructures-js/priority-queue MinPriorityQueue implementation
        const pq = new MinPriorityQueue((element) => element.dist);
        pq.enqueue({ dist: 0, x: start[0], y: start[1] });

        while (!pq.isEmpty()) {
            const { dist, x: sx, y: sy } = pq.dequeue();

            if (distance[sx][sy] < dist)
                continue;

            for (const [dx, dy] of dirs) {
                let x = sx + dx;
                let y = sy + dy;
                let count = 0;

                while (x >= 0 && y >= 0 && x < m && y < n && maze[x][y] === 0) {
                    x += dx;
                    y += dy;
                    count++;
                }

                if (distance[sx][sy] + count < distance[x - dx][y - dy]) {
                    distance[x - dx][y - dy] = distance[sx][sy] + count;
                    pq.enqueue({ dist: distance[x - dx][y - dy], x: x - dx, y: y - dy });
                }
            }
        }
    }
}
```

```go
func shortestDistance(maze [][]int, start []int, destination []int) int {
    m, n := len(maze), len(maze[0])
    distance := make([][]int, m)
    for i := range distance {
        distance[i] = make([]int, n)
        for j := range distance[i] {
            distance[i][j] = math.MaxInt32
        }
    }
    distance[start[0]][start[1]] = 0

    dirs := [][]int{{0, 1}, {0, -1}, {-1, 0}, {1, 0}}
    pq := &PriorityQueue{}
    heap.Init(pq)
    heap.Push(pq, []int{0, start[0], start[1]})

    for pq.Len() > 0 {
        curr := heap.Pop(pq).([]int)
        dist, sx, sy := curr[0], curr[1], curr[2]

        if distance[sx][sy] < dist {
            continue
        }

        for _, dir := range dirs {
            x, y := sx+dir[0], sy+dir[1]
            count := 0
            for x >= 0 && y >= 0 && x < m && y < n && maze[x][y] == 0 {
                x += dir[0]
                y += dir[1]
                count++
            }
            if distance[sx][sy]+count < distance[x-dir[0]][y-dir[1]] {
                distance[x-dir[0]][y-dir[1]] = distance[sx][sy] + count
                heap.Push(pq, []int{distance[x-dir[0]][y-dir[1]], x - dir[0], y - dir[1]})
            }
        }
    }

    if distance[destination[0]][destination[1]] == math.MaxInt32 {
        return -1
    }
    return distance[destination[0]][destination[1]]
}

type PriorityQueue [][]int

func (pq PriorityQueue) Len() int { return len(pq) }
func (pq PriorityQueue) Less(i, j int) bool { return pq[i][0] < pq[j][0] }
func (pq PriorityQueue) Swap(i, j int) { pq[i], pq[j] = pq[j], pq[i] }
func (pq *PriorityQueue) Push(x interface{}) { *pq = append(*pq, x.([]int)) }
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
    fun shortestDistance(maze: Array<IntArray>, start: IntArray, destination: IntArray): Int {
        val m = maze.size
        val n = maze[0].size
        val distance = Array(m) { IntArray(n) { Int.MAX_VALUE } }
        distance[start[0]][start[1]] = 0

        val dirs = arrayOf(intArrayOf(0, 1), intArrayOf(0, -1), intArrayOf(-1, 0), intArrayOf(1, 0))
        val pq = PriorityQueue<IntArray>(compareBy { it[2] })
        pq.offer(intArrayOf(start[0], start[1], 0))

        while (pq.isNotEmpty()) {
            val (sx, sy, dist) = pq.poll()

            if (distance[sx][sy] < dist) continue

            for (dir in dirs) {
                var x = sx + dir[0]
                var y = sy + dir[1]
                var count = 0
                while (x in 0 until m && y in 0 until n && maze[x][y] == 0) {
                    x += dir[0]
                    y += dir[1]
                    count++
                }
                if (distance[sx][sy] + count < distance[x - dir[0]][y - dir[1]]) {
                    distance[x - dir[0]][y - dir[1]] = distance[sx][sy] + count
                    pq.offer(intArrayOf(x - dir[0], y - dir[1], distance[x - dir[0]][y - dir[1]]))
                }
            }
        }

        return if (distance[destination[0]][destination[1]] == Int.MAX_VALUE) -1
               else distance[destination[0]][destination[1]]
    }
}
```

```swift
class Solution {
    func shortestDistance(_ maze: [[Int]], _ start: [Int], _ destination: [Int]) -> Int {
        let m = maze.count
        let n = maze[0].count
        var distance = [[Int]](repeating: [Int](repeating: Int.max, count: n), count: m)
        distance[start[0]][start[1]] = 0

        let dirs = [[0, 1], [0, -1], [-1, 0], [1, 0]]
        var heap = Heap<(dist: Int, x: Int, y: Int)>(comparator: { $0.dist < $1.dist })
        heap.insert((0, start[0], start[1]))

        while !heap.isEmpty {
            let curr = heap.remove()!
            let (dist, sx, sy) = curr

            if distance[sx][sy] < dist { continue }

            for dir in dirs {
                var x = sx + dir[0]
                var y = sy + dir[1]
                var count = 0
                while x >= 0 && y >= 0 && x < m && y < n && maze[x][y] == 0 {
                    x += dir[0]
                    y += dir[1]
                    count += 1
                }
                if distance[sx][sy] + count < distance[x - dir[0]][y - dir[1]] {
                    distance[x - dir[0]][y - dir[1]] = distance[sx][sy] + count
                    heap.insert((distance[x - dir[0]][y - dir[1]], x - dir[0], y - dir[1]))
                }
            }
        }

        return distance[destination[0]][destination[1]] == Int.max ? -1 : distance[destination[0]][destination[1]]
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

- Time complexity: $O(mn \cdot \log(mn))$
- Space complexity: $O(m \cdot n)$

>  Where $m$ and $n$ are the number of rows and columns in `maze`.

---

## Common Pitfalls

### Stopping BFS on First Arrival at Destination

Unlike standard BFS where the first path to a node is the shortest, the ball can reach the same position via paths of different lengths due to variable rolling distances. You must continue exploring until all shorter paths are exhausted. The correct approach is to only finalize a distance when extracted from a priority queue or when no shorter path exists.

### Counting Distance Incorrectly During Rolling

The ball rolls through multiple cells before stopping, and each cell traversed counts as one unit of distance. A common error is counting only the stopping position or miscounting the cells rolled. Increment the counter inside the while loop as the ball moves, not after it stops.

### Forgetting to Step Back After Hitting a Wall

The rolling loop continues until the ball hits a wall or boundary, meaning the final position is invalid. You must subtract the direction vector once to get the actual stopping position. Forgetting this step causes the ball to be placed inside walls or outside the maze.