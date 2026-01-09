## 1. Depth First Search

### Intuition

Flood fill is like using the paint bucket tool in image editors. Starting from a pixel, we want to change its color and spread to all connected pixels of the same original color. This naturally maps to a graph traversal problem where each pixel is a node connected to its four neighbors.

DFS works well here because we recursively explore as far as possible in one direction before backtracking. By changing the color as we visit each pixel, we mark it as visited, preventing infinite loops. If the new color equals the original, we skip the operation entirely to avoid unnecessary work.

### Algorithm

1. Store the original color of the starting pixel.
2. If the original color equals the new color, return immediately (no work needed).
3. Define a recursive DFS function that takes row and column coordinates.
4. In DFS: if out of bounds or the pixel color does not match the original, return.
5. Otherwise, change the pixel to the new color and recursively call DFS on all four neighbors (up, down, left, right).
6. Start DFS from the initial coordinates and return the modified image.

::tabs-start

```python
class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        if image[sr][sc] == color:
            return image

        m, n = len(image), len(image[0])
        dirs = [1,0,-1,0,1]

        def dfs(r, c, org):
            if not (0 <= r < m) or not (0 <= c < n) or image[r][c] != org:
                return

            image[r][c] = color
            for d in range(4):
                dfs(r + dirs[d], c + dirs[d + 1], org)

        dfs(sr, sc, image[sr][sc])
        return image
```

```java
public class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int orig = image[sr][sc];
        if (orig == color) return image;
        int m = image.length, n = image[0].length;
        dfs(image, sr, sc, orig, color, m, n);
        return image;
    }

    private void dfs(int[][] image, int r, int c, int orig, int color, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || image[r][c] != orig) return;
        image[r][c] = color;
        dfs(image, r + 1, c, orig, color, m, n);
        dfs(image, r - 1, c, orig, color, m, n);
        dfs(image, r, c + 1, orig, color, m, n);
        dfs(image, r, c - 1, orig, color, m, n);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        int orig = image[sr][sc];
        if (orig == color) return image;
        m = image.size();
        n = image[0].size();
        dfs(image, sr, sc, orig, color);
        return image;
    }
private:
    int m, n;
    void dfs(vector<vector<int>>& image, int r, int c, int orig, int color) {
        if (r < 0 || r >= m || c < 0 || c >= n || image[r][c] != orig) return;
        image[r][c] = color;
        dfs(image, r + 1, c, orig, color);
        dfs(image, r - 1, c, orig, color);
        dfs(image, r, c + 1, orig, color);
        dfs(image, r, c - 1, orig, color);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} image
     * @param {number} sr
     * @param {number} sc
     * @param {number} color
     * @return {number[][]}
     */
    floodFill(image, sr, sc, color) {
        const orig = image[sr][sc];
        if (orig === color) return image;
        const m = image.length, n = image[0].length;
        const dfs = (r, c) => {
            if (r < 0 || r >= m || c < 0 || c >= n || image[r][c] !== orig) return;
            image[r][c] = color;
            dfs(r + 1, c);
            dfs(r - 1, c);
            dfs(r, c + 1);
            dfs(r, c - 1);
        };
        dfs(sr, sc);
        return image;
    }
}
```

```csharp
public class Solution {
    public int[][] FloodFill(int[][] image, int sr, int sc, int color) {
        int orig = image[sr][sc];
        if (orig == color) return image;
        int m = image.Length, n = image[0].Length;
        DFS(image, sr, sc, orig, color, m, n);
        return image;
    }

    private void DFS(int[][] image, int r, int c, int orig, int color, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || image[r][c] != orig) return;
        image[r][c] = color;
        DFS(image, r + 1, c, orig, color, m, n);
        DFS(image, r - 1, c, orig, color, m, n);
        DFS(image, r, c + 1, orig, color, m, n);
        DFS(image, r, c - 1, orig, color, m, n);
    }
}
```

```go
func floodFill(image [][]int, sr int, sc int, color int) [][]int {
    orig := image[sr][sc]
    if orig == color {
        return image
    }
    m, n := len(image), len(image[0])

    var dfs func(r, c int)
    dfs = func(r, c int) {
        if r < 0 || r >= m || c < 0 || c >= n || image[r][c] != orig {
            return
        }
        image[r][c] = color
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
    }

    dfs(sr, sc)
    return image
}
```

```kotlin
class Solution {
    fun floodFill(image: Array<IntArray>, sr: Int, sc: Int, color: Int): Array<IntArray> {
        val orig = image[sr][sc]
        if (orig == color) return image
        val m = image.size
        val n = image[0].size

        fun dfs(r: Int, c: Int) {
            if (r < 0 || r >= m || c < 0 || c >= n || image[r][c] != orig) return
            image[r][c] = color
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)
        }

        dfs(sr, sc)
        return image
    }
}
```

```swift
class Solution {
    func floodFill(_ image: inout [[Int]], _ sr: Int, _ sc: Int, _ color: Int) -> [[Int]] {
        let orig = image[sr][sc]
        if orig == color { return image }
        let m = image.count, n = image[0].count

        func dfs(_ r: Int, _ c: Int) {
            if r < 0 || r >= m || c < 0 || c >= n || image[r][c] != orig { return }
            image[r][c] = color
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)
        }

        dfs(sr, sc)
        return image
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the image.

---

## 2. Breadth First Search

### Intuition

BFS explores pixels level by level, processing all pixels at distance 1 from the start before those at distance 2, and so on. While DFS dives deep immediately, BFS spreads outward uniformly. Both achieve the same result for flood fill, but BFS uses a queue instead of the call stack.

The key is to color pixels when adding them to the queue, not when processing them. This prevents adding the same pixel multiple times and keeps the queue size manageable.

### Algorithm

1. Store the original color and check if it equals the new color (early return if so).
2. Initialize a queue with the starting pixel coordinates.
3. Immediately change the starting pixel to the new color.
4. While the queue is not empty:
   - Dequeue a pixel.
   - For each of the four neighbors, if it is within bounds and has the original color, change it to the new color and enqueue it.
5. Return the modified image.

::tabs-start

```python
class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        orig = image[sr][sc]
        if orig == color:
            return image

        m, n = len(image), len(image[0])
        q = deque([(sr, sc)])
        image[sr][sc] = color
        dirs = [(1,0), (-1,0), (0,1), (0,-1)]

        while q:
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and image[nr][nc] == orig:
                    image[nr][nc] = color
                    q.append((nr, nc))

        return image
```

```java
public class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int orig = image[sr][sc];
        if (orig == color) return image;
        int m = image.length, n = image[0].length;
        Deque<int[]> q = new ArrayDeque<>();
        q.add(new int[]{sr, sc});
        image[sr][sc] = color;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};

        while (!q.isEmpty()) {
            int[] cell = q.remove();
            int r = cell[0], c = cell[1];
            for (int[] d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && image[nr][nc] == orig) {
                    image[nr][nc] = color;
                    q.add(new int[]{nr, nc});
                }
            }
        }
        return image;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        int orig = image[sr][sc];
        if (orig == color) return image;
        int m = image.size(), n = image[0].size();
        queue<pair<int,int>> q;
        q.emplace(sr, sc);
        image[sr][sc] = color;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};

        while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            for (auto &d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && image[nr][nc] == orig) {
                    image[nr][nc] = color;
                    q.emplace(nr, nc);
                }
            }
        }
        return image;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} image
     * @param {number} sr
     * @param {number} sc
     * @param {number} color
     * @return {number[][]}
     */
    floodFill(image, sr, sc, color) {
        const orig = image[sr][sc];
        if (orig === color) return image;
        const m = image.length, n = image[0].length;
        const q = new Queue([[sr, sc]]);
        image[sr][sc] = color;
        const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

        while (!q.isEmpty()) {
            const [r, c] = q.pop();
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && image[nr][nc] === orig) {
                    image[nr][nc] = color;
                    q.push([nr, nc]);
                }
            }
        }
        return image;
    }
}
```

```csharp
public class Solution {
    public int[][] FloodFill(int[][] image, int sr, int sc, int color) {
        int orig = image[sr][sc];
        if (orig == color) return image;
        int m = image.Length, n = image[0].Length;
        var q = new Queue<(int r, int c)>();
        q.Enqueue((sr, sc));
        image[sr][sc] = color;
        var dirs = new (int dr, int dc)[] { (1,0), (-1,0), (0,1), (0,-1) };

        while (q.Count > 0) {
            var (r, c) = q.Dequeue();
            foreach (var (dr, dc) in dirs) {
                int nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && image[nr][nc] == orig) {
                    image[nr][nc] = color;
                    q.Enqueue((nr, nc));
                }
            }
        }
        return image;
    }
}
```

```go
func floodFill(image [][]int, sr int, sc int, color int) [][]int {
    orig := image[sr][sc]
    if orig == color {
        return image
    }
    m, n := len(image), len(image[0])
    q := [][]int{{sr, sc}}
    image[sr][sc] = color
    dirs := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

    for len(q) > 0 {
        cell := q[0]
        q = q[1:]
        r, c := cell[0], cell[1]
        for _, d := range dirs {
            nr, nc := r+d[0], c+d[1]
            if nr >= 0 && nr < m && nc >= 0 && nc < n && image[nr][nc] == orig {
                image[nr][nc] = color
                q = append(q, []int{nr, nc})
            }
        }
    }
    return image
}
```

```kotlin
class Solution {
    fun floodFill(image: Array<IntArray>, sr: Int, sc: Int, color: Int): Array<IntArray> {
        val orig = image[sr][sc]
        if (orig == color) return image
        val m = image.size
        val n = image[0].size
        val q: Queue<IntArray> = LinkedList()
        q.add(intArrayOf(sr, sc))
        image[sr][sc] = color
        val dirs = arrayOf(intArrayOf(1, 0), intArrayOf(-1, 0), intArrayOf(0, 1), intArrayOf(0, -1))

        while (q.isNotEmpty()) {
            val (r, c) = q.poll()
            for (d in dirs) {
                val nr = r + d[0]
                val nc = c + d[1]
                if (nr in 0 until m && nc in 0 until n && image[nr][nc] == orig) {
                    image[nr][nc] = color
                    q.add(intArrayOf(nr, nc))
                }
            }
        }
        return image
    }
}
```

```swift
class Solution {
    func floodFill(_ image: inout [[Int]], _ sr: Int, _ sc: Int, _ color: Int) -> [[Int]] {
        let orig = image[sr][sc]
        if orig == color { return image }
        let m = image.count, n = image[0].count
        var q = [(sr, sc)]
        image[sr][sc] = color
        let dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        while !q.isEmpty {
            let (r, c) = q.removeFirst()
            for (dr, dc) in dirs {
                let nr = r + dr, nc = c + dc
                if nr >= 0 && nr < m && nc >= 0 && nc < n && image[nr][nc] == orig {
                    image[nr][nc] = color
                    q.append((nr, nc))
                }
            }
        }
        return image
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the image.