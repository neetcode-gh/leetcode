## 1. Depth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot n \cdot max(m,n))$
- Space complexity: $O(m \cdot n)$

>  Where $m$ and $n$ are the number of rows and columns in `maze`.

---

## 2. Breadth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \cdot n \cdot (m + n))$
- Space complexity: $O(m \cdot n)$

>  Where $m$ and $n$ are the number of rows and columns in `maze`.

---

## 3. Dijkstra's Algorithm 

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O((mn)^2)$
- Space complexity: $O(mn)$

>  Where $m$ and $n$ are the number of rows and columns in `maze`.

---

## 4. Dijkstra's Algorithm and Priority Queue

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(mn \cdot \log(mn))$
- Space complexity: $O(m \cdot n)$

>  Where $m$ and $n$ are the number of rows and columns in `maze`.
