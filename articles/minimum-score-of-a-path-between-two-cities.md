## 1. Depth First Search

::tabs-start

```python
class Solution:
    def minScore(self, n: int, roads: list[list[int]]) -> int:
        adj = defaultdict(list)
        for src, dst, dist in roads:
            adj[src].append((dst, dist))
            adj[dst].append((src, dist))

        res = float("inf")
        visit = set()

        def dfs(node):
            nonlocal res
            if node in visit:
                return
            visit.add(node)
            for nei, dist in adj[node]:
                res = min(res, dist)
                dfs(nei)

        dfs(1)
        return res
```

```java
public class Solution {
    private List<int[]>[] adj;
    private boolean[] visit;
    private int res;

    public int minScore(int n, int[][] roads) {
        adj = new ArrayList[n + 1];
        visit = new boolean[n + 1];
        res = Integer.MAX_VALUE;

        for (int i = 0; i <= n; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int[] road : roads) {
            adj[road[0]].add(new int[]{road[1], road[2]});
            adj[road[1]].add(new int[]{road[0], road[2]});
        }

        dfs(1);
        return res;
    }

    private void dfs(int node) {
        if (visit[node]) return;
        visit[node] = true;

        for (int[] edge : adj[node]) {
            res = Math.min(res, edge[1]);
            dfs(edge[0]);
        }
    }
}
```

```cpp
class Solution {
public:
    vector<vector<pair<int, int>>> adj;
    vector<bool> visit;
    int res;

    int minScore(int n, vector<vector<int>>& roads) {
        adj.resize(n + 1);
        visit.resize(n + 1, false);
        res = INT_MAX;

        for (auto& road : roads) {
            adj[road[0]].push_back({road[1], road[2]});
            adj[road[1]].push_back({road[0], road[2]});
        }

        dfs(1);
        return res;
    }

    void dfs(int node) {
        if (visit[node]) return;
        visit[node] = true;

        for (auto& edge : adj[node]) {
            res = min(res, edge.second);
            dfs(edge.first);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} roads
     * @return {number}
     */
    minScore(n, roads) {
        const adj = Array.from({ length: n + 1 }, () => []);
        for (const [src, dst, dist] of roads) {
            adj[src].push([dst, dist]);
            adj[dst].push([src, dist]);
        }

        let res = Infinity;
        const visit = new Array(n + 1).fill(false);

        const dfs = (node) => {
            if (visit[node]) return;
            visit[node] = true;

            for (const [nei, dist] of adj[node]) {
                res = Math.min(res, dist);
                dfs(nei);
            }
        };

        dfs(1);
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 2. Breadth First Search

::tabs-start

```python
class Solution:
    def minScore(self, n: int, roads: list[list[int]]) -> int:
        adj = [[] for _ in range(n + 1)]
        for src, dst, dist in roads:
            adj[src].append((dst, dist))
            adj[dst].append((src, dist))

        res = float("inf")
        visit = [False] * (n + 1)
        q = deque([1])
        visit[1] = True

        while q:
            node = q.popleft()
            for nei, dist in adj[node]:
                res = min(res, dist)
                if not visit[nei]:
                    visit[nei] = True
                    q.append(nei)

        return res
```

```java
public class Solution {
    public int minScore(int n, int[][] roads) {
        List<int[]>[] adj = new ArrayList[n + 1];
        for (int i = 0; i <= n; i++) adj[i] = new ArrayList<>();

        for (int[] road : roads) {
            adj[road[0]].add(new int[]{road[1], road[2]});
            adj[road[1]].add(new int[]{road[0], road[2]});
        }

        int res = Integer.MAX_VALUE;
        boolean[] visit = new boolean[n + 1];
        Queue<Integer> q = new LinkedList<>();
        q.offer(1);
        visit[1] = true;

        while (!q.isEmpty()) {
            int node = q.poll();
            for (int[] edge : adj[node]) {
                int nei = edge[0], dist = edge[1];
                res = Math.min(res, dist);
                if (!visit[nei]) {
                    visit[nei] = true;
                    q.offer(nei);
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minScore(int n, vector<vector<int>>& roads) {
        vector<vector<pair<int, int>>> adj(n + 1);
        for (auto& road : roads) {
            adj[road[0]].emplace_back(road[1], road[2]);
            adj[road[1]].emplace_back(road[0], road[2]);
        }

        int res = INT_MAX;
        vector<bool> visit(n + 1, false);
        queue<int> q;
        q.push(1);
        visit[1] = true;

        while (!q.empty()) {
            int node = q.front();q.pop();
            for (auto& [nei, dist] : adj[node]) {
                res = min(res, dist);
                if (!visit[nei]) {
                    visit[nei] = true;
                    q.push(nei);
                }
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} roads
     * @return {number}
     */
    minScore(n, roads) {
        const adj = Array.from({ length: n + 1 }, () => []);
        for (const [src, dst, dist] of roads) {
            adj[src].push([dst, dist]);
            adj[dst].push([src, dist]);
        }

        let res = Infinity;
        const visit = new Array(n + 1).fill(false);
        const q = new Queue([1]);
        visit[1] = true;

        while (!q.isEmpty()) {
            const node = q.pop();
            for (const [nei, dist] of adj[node]) {
                res = Math.min(res, dist);
                if (!visit[nei]) {
                    visit[nei] = true;
                    q.push(nei);
                }
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

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 3. Iterative DFS

::tabs-start

```python
class Solution:
    def minScore(self, n: int, roads: list[list[int]]) -> int:
        adj = [[] for _ in range(n + 1)]
        for src, dst, dist in roads:
            adj[src].append((dst, dist))
            adj[dst].append((src, dist))

        res = float("inf")
        visit = [False] * (n + 1)
        stack = [1]
        visit[1] = True

        while stack:
            node = stack.pop()
            for nei, dist in adj[node]:
                res = min(res, dist)
                if not visit[nei]:
                    visit[nei] = True
                    stack.append(nei)

        return res
```

```java
public class Solution {
    public int minScore(int n, int[][] roads) {
        List<int[]>[] adj = new ArrayList[n + 1];
        for (int i = 0; i <= n; i++) adj[i] = new ArrayList<>();

        for (int[] road : roads) {
            adj[road[0]].add(new int[]{road[1], road[2]});
            adj[road[1]].add(new int[]{road[0], road[2]});
        }

        int res = Integer.MAX_VALUE;
        boolean[] visit = new boolean[n + 1];
        Stack<Integer> stack = new Stack<>();
        stack.push(1);
        visit[1] = true;

        while (!stack.isEmpty()) {
            int node = stack.pop();
            for (int[] edge : adj[node]) {
                int nei = edge[0], dist = edge[1];
                res = Math.min(res, dist);
                if (!visit[nei]) {
                    visit[nei] = true;
                    stack.push(nei);
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minScore(int n, vector<vector<int>>& roads) {
        vector<vector<pair<int, int>>> adj(n + 1);
        for (auto& road : roads) {
            adj[road[0]].emplace_back(road[1], road[2]);
            adj[road[1]].emplace_back(road[0], road[2]);
        }

        int res = INT_MAX;
        vector<bool> visit(n + 1, false);
        stack<int> stk;
        stk.push(1);
        visit[1] = true;

        while (!stk.empty()) {
            int node = stk.top();stk.pop();
            for (auto& [nei, dist] : adj[node]) {
                res = min(res, dist);
                if (!visit[nei]) {
                    visit[nei] = true;
                    stk.push(nei);
                }
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} roads
     * @return {number}
     */
    minScore(n, roads) {
        const adj = Array.from({ length: n + 1 }, () => []);
        for (const [src, dst, dist] of roads) {
            adj[src].push([dst, dist]);
            adj[dst].push([src, dist]);
        }

        let res = Infinity;
        const visit = new Array(n + 1).fill(false);
        const stack = [1];
        visit[1] = true;

        while (stack.length) {
            const node = stack.pop();
            for (const [nei, dist] of adj[node]) {
                res = Math.min(res, dist);
                if (!visit[nei]) {
                    visit[nei] = true;
                    stack.push(nei);
                }
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

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 4. Disjoint Set Union

::tabs-start

```python
class DSU:
    def __init__(self, n):
        self.Parent = list(range(n + 1))
        self.Size = [1] * (n + 1)

    def find(self, node):
        if self.Parent[node] != node:
            self.Parent[node] = self.find(self.Parent[node])
        return self.Parent[node]

    def union(self, u, v):
        pu, pv = self.find(u), self.find(v)
        if pu == pv:
            return False
        if self.Size[pu] >= self.Size[pv]:
            self.Size[pu] += self.Size[pv]
            self.Parent[pv] = pu
        else:
            self.Size[pv] += self.Size[pu]
            self.Parent[pu] = pv
        return True

class Solution:
    def minScore(self, n: int, roads: list[list[int]]) -> int:
        dsu = DSU(n)
        for src, dst, _ in roads:
            dsu.union(src, dst)

        res = float("inf")
        root = dsu.find(1)
        for src, dst, dist in roads:
            if dsu.find(src) == root:
                res = min(res, dist)

        return res
```

```java
class DSU {
    int[] parent, size;

    public DSU(int n) {
        parent = new int[n + 1];
        size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }

    public int find(int node) {
        if (parent[node] != node) {
            parent[node] = find(parent[node]);
        }
        return parent[node];
    }

    public boolean union(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (size[pu] >= size[pv]) {
            size[pu] += size[pv];
            parent[pv] = pu;
        } else {
            size[pv] += size[pu];
            parent[pu] = pv;
        }
        return true;
    }
}

public class Solution {
    public int minScore(int n, int[][] roads) {
        DSU dsu = new DSU(n);
        for (int[] road : roads) {
            dsu.union(road[0], road[1]);
        }

        int res = Integer.MAX_VALUE;
        int root = dsu.find(1);
        for (int[] road : roads) {
            if (dsu.find(road[0]) == root) {
                res = Math.min(res, road[2]);
            }
        }

        return res;
    }
}
```

```cpp
class DSU {
public:
    vector<int> parent, size;

    DSU(int n) {
        parent.resize(n + 1);
        size.resize(n + 1, 1);
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
        }
    }

    int find(int node) {
        if (parent[node] != node) {
            parent[node] = find(parent[node]);
        }
        return parent[node];
    }

    bool unionSets(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (size[pu] >= size[pv]) {
            size[pu] += size[pv];
            parent[pv] = pu;
        } else {
            size[pv] += size[pu];
            parent[pu] = pv;
        }
        return true;
    }
};

class Solution {
public:
    int minScore(int n, vector<vector<int>>& roads) {
        DSU dsu(n);
        for (auto& road : roads) {
            dsu.unionSets(road[0], road[1]);
        }

        int res = INT_MAX;
        int root = dsu.find(1);
        for (auto& road : roads) {
            if (dsu.find(road[0]) == root) {
                res = min(res, road[2]);
            }
        }

        return res;
    }
};
```

```javascript
class DSU {
    /**
     * @constructor
     * @param {number} n
     */
    constructor(n) {
        this.parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.size = new Array(n + 1).fill(1);
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node) {
        if (this.parent[node] !== node) {
            this.parent[node] = this.find(this.parent[node]);
        }
        return this.parent[node];
    }

    /**
     * @param {number} u
     * @param {number} u=v
     * @return {boolean}
     */
    union(u, v) {
        let pu = this.find(u),
            pv = this.find(v);
        if (pu === pv) return false;
        if (this.size[pu] >= this.size[pv]) {
            this.size[pu] += this.size[pv];
            this.parent[pv] = pu;
        } else {
            this.size[pv] += this.size[pu];
            this.parent[pu] = pv;
        }
        return true;
    }
}

class Solution {
    /**
     * @param {number} n
     * @param {number[][]} roads
     * @return {number}
     */
    minScore(n, roads) {
        const dsu = new DSU(n);
        for (const [src, dst] of roads) {
            dsu.union(src, dst);
        }

        let res = Infinity;
        const root = dsu.find(1);
        for (const [src, dst, dist] of roads) {
            if (dsu.find(src) === root) {
                res = Math.min(res, dist);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + (E * α(V)))$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges in the graph. $α()$ is used for amortized complexity.
