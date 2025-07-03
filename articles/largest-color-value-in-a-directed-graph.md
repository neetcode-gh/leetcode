## 1. Brute Force (DFS)

::tabs-start

```python
class Solution:
    def largestPathValue(self, colors: str, edges: list[list[int]]) -> int:
        n = len(colors)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)

        visit = [False] * n
        def dfs(node, c):
            if visit[node]:
                return float("inf")

            visit[node] = True
            clrCnt = 0
            for nei in adj[node]:
                cur = dfs(nei, c)
                if cur == float("inf"):
                    return cur
                clrCnt = max(clrCnt, cur)
            visit[node] = False
            return clrCnt + (c == (ord(colors[node]) - ord('a')))

        res = -1
        for i in range(n):
            for c in range(26):
                cnt = dfs(i, c)
                if cnt == float("inf"):
                    return -1
                res = max(res, cnt)
        return res
```

```java
public class Solution {
    private int n;
    private List<Integer>[] adj;
    private boolean[] visit;

    public int largestPathValue(String colors, int[][] edges) {
        this.n = colors.length();
        this.adj = new ArrayList[n];
        this.visit = new boolean[n];

        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
        }

        int res = -1;
        for (int i = 0; i < n; i++) {
            for (int c = 0; c < 26; c++) {
                int cnt = dfs(i, c, colors);
                if (cnt == Integer.MAX_VALUE) return -1;
                res = Math.max(res, cnt);
            }
        }
        return res;
    }

    private int dfs(int node, int c, String colors) {
        if (visit[node]) return Integer.MAX_VALUE;

        visit[node] = true;
        int clrCnt = 0;
        for (int nei : adj[node]) {
            int cur = dfs(nei, c, colors);
            if (cur == Integer.MAX_VALUE) return cur;
            clrCnt = Math.max(clrCnt, cur);
        }
        visit[node] = false;
        return clrCnt + ((colors.charAt(node) - 'a') == c ? 1 : 0);
    }
}
```

```cpp
class Solution {
public:
    int n;
    vector<vector<int>> adj;
    vector<bool> visit;

    int largestPathValue(string colors, vector<vector<int>>& edges) {
        n = colors.size();
        adj.assign(n, vector<int>());
        visit.assign(n, false);

        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
        }

        int res = -1;
        for (int i = 0; i < n; i++) {
            for (int c = 0; c < 26; c++) {
                int cnt = dfs(i, c, colors);
                if (cnt == 1e9) return -1;
                res = max(res, cnt);
            }
        }
        return res;
    }

private:
    int dfs(int node, int c, string& colors) {
        if (visit[node]) return 1e9;

        visit[node] = true;
        int clrCnt = 0;
        for (int nei : adj[node]) {
            int cur = dfs(nei, c, colors);
            if (cur == 1e9) return cur;
            clrCnt = max(clrCnt, cur);
        }
        visit[node] = false;
        return clrCnt + ((colors[node] - 'a') == c ? 1 : 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} colors
     * @param {number[][]} edges
     * @return {number}
     */
    largestPathValue(colors, edges) {
        const n = colors.length;
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
        }

        const visit = new Array(n).fill(false);
        const dfs = (node, c) => {
            if (visit[node]) return Infinity;

            visit[node] = true;
            let clrCnt = 0;
            for (const nei of adj[node]) {
                const cur = dfs(nei, c);
                if (cur === Infinity) return cur;
                clrCnt = Math.max(clrCnt, cur);
            }
            visit[node] = false;
            return clrCnt + (c === colors.charCodeAt(node) - 97 ? 1 : 0);
        };

        let res = -1;
        for (let i = 0; i < n; i++) {
            for (let c = 0; c < 26; c++) {
                const cnt = dfs(i, c);
                if (cnt === Infinity) return -1;
                res = Math.max(res, cnt);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V * (V + E))$
- Space complexity: $O(V + E)$

> Where $V$ is the number of verticies and $E$ is the number of edges.

---

## 2. Depth First Search

::tabs-start

```python
class Solution:
    def largestPathValue(self, colors: str, edges: list[list[int]]) -> int:
        adj = defaultdict(list)
        for src, dst in edges:
            adj[src].append(dst)

        def dfs(node):
            if node in path:
                return float("inf")
            if node in visit:
                return 0

            visit.add(node)
            path.add(node)
            colorIndex = ord(colors[node]) - ord('a')
            count[node][colorIndex] = 1

            for nei in adj[node]:
                if dfs(nei) == float("inf"):
                    return float("inf")
                for c in range(26):
                    count[node][c] = max(
                        count[node][c],
                        (1 if c == colorIndex else 0) + count[nei][c]
                    )

            path.remove(node)
            return 0

        n, res = len(colors), 0
        visit, path = set(), set()
        count = [[0] * 26 for _ in range(n)]

        for i in range(n):
            if dfs(i) == float("inf"):
                return -1
            res = max(res, max(count[i]))

        return res
```

```java
public class Solution {
    private int n;
    private List<Integer>[] adj;
    private boolean[] visit, path;
    private int[][] count;

    public int largestPathValue(String colors, int[][] edges) {
        this.n = colors.length();
        this.adj = new ArrayList[n];
        this.visit = new boolean[n];
        this.path = new boolean[n];
        this.count = new int[n][26];

        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            if (dfs(i, colors) == Integer.MAX_VALUE) return -1;
            for (int c = 0; c < 26; c++) {
                res = Math.max(res, count[i][c]);
            }
        }
        return res;
    }

    private int dfs(int node, String colors) {
        if (path[node]) return Integer.MAX_VALUE;
        if (visit[node]) return 0;

        visit[node] = true;
        path[node] = true;
        int colorIndex = colors.charAt(node) - 'a';
        count[node][colorIndex] = 1;

        for (int nei : adj[node]) {
            if (dfs(nei, colors) == Integer.MAX_VALUE) {
                return Integer.MAX_VALUE;
            }
            for (int c = 0; c < 26; c++) {
                count[node][c] = Math.max(
                    count[node][c],
                    (c == colorIndex ? 1 : 0) + count[nei][c]
                );
            }
        }

        path[node] = false;
        return 0;
    }
}
```

```cpp
class Solution {
public:
    int n, INF = 1e9;
    vector<vector<int>> adj;
    vector<bool> visit, path;
    vector<vector<int>> count;

    int largestPathValue(string colors, vector<vector<int>>& edges) {
        this->n = colors.size();
        adj.resize(n);
        visit.assign(n, false);
        path.assign(n, false);
        count.assign(n, vector<int>(26));

        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            if (dfs(i, colors) == INF) return -1;
            for (int c = 0; c < 26; c++) {
                res = max(res, count[i][c]);
            }
        }
        return res;
    }

private:
    int dfs(int node, string& colors) {
        if (path[node]) return INF;
        if (visit[node]) return 0;

        visit[node] = true;
        path[node] = true;
        int colorIndex = colors[node] - 'a';
        count[node][colorIndex] = 1;

        for (int& nei : adj[node]) {
            if (dfs(nei, colors) == INF) return INF;
            for (int c = 0; c < 26; c++) {
                count[node][c] = max(
                    count[node][c],
                    (c == colorIndex ? 1 : 0) + count[nei][c]
                );
            }
        }

        path[node] = false;
        return 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} colors
     * @param {number[][]} edges
     * @return {number}
     */
    largestPathValue(colors, edges) {
        const n = colors.length;
        const adj = Array.from({ length: n }, () => []);
        for (const [src, dst] of edges) {
            adj[src].push(dst);
        }

        const visit = new Array(n).fill(false);
        const path = new Array(n).fill(false);
        const count = Array.from({ length: n }, () => new Array(26).fill(0));

        const dfs = (node) => {
            if (path[node]) return Infinity;
            if (visit[node]) return 0;

            visit[node] = true;
            path[node] = true;
            const colorIndex = colors.charCodeAt(node) - 'a'.charCodeAt(0);
            count[node][colorIndex] = 1;

            for (const nei of adj[node]) {
                if (dfs(nei) === Infinity) return Infinity;
                for (let c = 0; c < 26; c++) {
                    count[node][c] = Math.max(
                        count[node][c],
                        (c === colorIndex ? 1 : 0) + count[nei][c],
                    );
                }
            }

            path[node] = false;
            return 0;
        };

        let res = 0;
        for (let i = 0; i < n; i++) {
            if (dfs(i) === Infinity) return -1;
            for (let c = 0; c < 26; c++) {
                res = Math.max(res, count[i][c]);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of verticies and $E$ is the number of edges.

---

## 3. Topological Sort (Kahn's Algorithm)

::tabs-start

```python
class Solution:
    def largestPathValue(self, colors: str, edges: list[list[int]]) -> int:
        n = len(colors)
        adj = [[] for _ in range(n)]
        indegree = [0] * n
        count = [[0] * 26 for _ in range(n)]

        for u, v in edges:
            adj[u].append(v)
            indegree[v] += 1

        q = deque()
        for i in range(n):
            if indegree[i] == 0:
                q.append(i)

        visit = res = 0
        while q:
            node = q.popleft()
            visit += 1
            colorIndex = ord(colors[node]) - ord('a')
            count[node][colorIndex] += 1
            res = max(res, count[node][colorIndex])

            for nei in adj[node]:
                for c in range(26):
                    count[nei][c] = max(count[nei][c], count[node][c])

                indegree[nei] -= 1
                if indegree[nei] == 0:
                    q.append(nei)

        return res if visit == n else -1
```

```java
public class Solution {
    public int largestPathValue(String colors, int[][] edges) {
        int n = colors.length();
        List<Integer>[] adj = new ArrayList[n];
        int[] indegree = new int[n];
        int[][] count = new int[n][26];

        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
            indegree[edge[1]]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                q.add(i);
            }
        }

        int visit = 0, res = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            visit++;
            int colorIndex = colors.charAt(node) - 'a';
            count[node][colorIndex]++;
            res = Math.max(res, count[node][colorIndex]);

            for (int nei : adj[node]) {
                for (int c = 0; c < 26; c++) {
                    count[nei][c] = Math.max(count[nei][c], count[node][c]);
                }
                if (--indegree[nei] == 0) {
                    q.add(nei);
                }
            }
        }

        return visit == n ? res : -1;
    }
}
```

```cpp
class Solution {
public:
    int largestPathValue(string colors, vector<vector<int>>& edges) {
        int n = colors.size();
        vector<vector<int>> adj(n);
        vector<int> indegree(n);
        vector<vector<int>> count(n, vector<int>(26));

        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            indegree[edge[1]]++;
        }

        queue<int> q;
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                q.push(i);
            }
        }

        int visit = 0, res = 0;
        while (!q.empty()) {
            int node = q.front();q.pop();
            visit++;
            int colorIndex = colors[node] - 'a';
            count[node][colorIndex]++;
            res = max(res, count[node][colorIndex]);

            for (int& nei : adj[node]) {
                for (int c = 0; c < 26; c++) {
                    count[nei][c] = max(count[nei][c], count[node][c]);
                }
                if (--indegree[nei] == 0) {
                    q.push(nei);
                }
            }
        }

        return visit == n ? res : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} colors
     * @param {number[][]} edges
     * @return {number}
     */
    largestPathValue(colors, edges) {
        const n = colors.length;
        const adj = Array.from({ length: n }, () => []);
        const indegree = new Array(n).fill(0);
        const count = Array.from({ length: n }, () => new Array(26).fill(0));

        for (const [u, v] of edges) {
            adj[u].push(v);
            indegree[v]++;
        }

        const q = new Queue();
        for (let i = 0; i < n; i++) {
            if (indegree[i] === 0) {
                q.push(i);
            }
        }

        let visit = 0,
            res = 0;
        while (!q.isEmpty()) {
            const node = q.pop();
            visit++;
            const colorIndex = colors.charCodeAt(node) - 'a'.charCodeAt(0);
            count[node][colorIndex]++;
            res = Math.max(res, count[node][colorIndex]);

            for (const nei of adj[node]) {
                for (let c = 0; c < 26; c++) {
                    count[nei][c] = Math.max(count[nei][c], count[node][c]);
                }
                if (--indegree[nei] === 0) {
                    q.push(nei);
                }
            }
        }

        return visit === n ? res : -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of verticies and $E$ is the number of edges.
