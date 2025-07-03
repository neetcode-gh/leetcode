## 1. Depth First Search

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the image.

---

## 2. Breadth First Search

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the image.