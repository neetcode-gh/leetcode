## 1. Brute Force (DFS)

::tabs-start

```python
class Solution:
    def numberOfGoodPaths(self, vals: List[int], edges: List[List[int]]) -> int:
        n = len(vals)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        def dfs(node, startNode, parent):
            if vals[node] > vals[startNode]:
                return 0

            res = 0
            if vals[node] == vals[startNode] and node >= startNode:
                res += 1

            for child in adj[node]:
                if child == parent:
                    continue
                res += dfs(child, startNode, node)

            return res


        res = 0
        for node in range(n):
            res += dfs(node, node, -1)
        return res
```

```java
public class Solution {
    public int numberOfGoodPaths(int[] vals, int[][] edges) {
        int n = vals.length;
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
            adj[edge[1]].add(edge[0]);
        }

        int res = 0;
        for (int node = 0; node < n; node++) {
            res += dfs(node, node, -1, vals, adj);
        }
        return res;
    }

    private int dfs(int node, int startNode, int parent, int[] vals, List<Integer>[] adj) {
        if (vals[node] > vals[startNode]) {
            return 0;
        }

        int res = 0;
        if (vals[node] == vals[startNode] && node >= startNode) {
            res += 1;
        }

        for (int child : adj[node]) {
            if (child == parent) {
                continue;
            }
            res += dfs(child, startNode, node, vals, adj);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numberOfGoodPaths(vector<int>& vals, vector<vector<int>>& edges) {
        int n = vals.size();
        vector<vector<int>> adj(n);
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        int res = 0;
        for (int node = 0; node < n; node++) {
            res += dfs(node, node, -1, vals, adj);
        }
        return res;
    }

private:
    int dfs(int node, int startNode, int parent, vector<int>& vals, vector<vector<int>>& adj) {
        if (vals[node] > vals[startNode]) {
            return 0;
        }

        int res = 0;
        if (vals[node] == vals[startNode] && node >= startNode) {
            res += 1;
        }

        for (int child : adj[node]) {
            if (child == parent) {
                continue;
            }
            res += dfs(child, startNode, node, vals, adj);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} vals
     * @param {number[][]} edges
     * @return {number}
     */
    numberOfGoodPaths(vals, edges) {
        const n = vals.length;
        const adj = Array.from({ length: n }, () => []);

        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        const dfs = (node, startNode, parent) => {
            if (vals[node] > vals[startNode]) {
                return 0;
            }

            let res = 0;
            if (vals[node] === vals[startNode] && node >= startNode) {
                res += 1;
            }

            for (const child of adj[node]) {
                if (child === parent) continue;
                res += dfs(child, startNode, node);
            }
            return res;
        };

        let res = 0;
        for (let node = 0; node < n; node++) {
            res += dfs(node, node, -1);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Brute Force (BFS)

::tabs-start

```python
class Solution:
    def numberOfGoodPaths(self, vals, edges):
        n = len(vals)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        res = 0
        for startNode in range(n):
            q = deque([startNode])
            visited = set([startNode])
            count = 0

            while q:
                node = q.popleft()
                if vals[node] == vals[startNode] and node >= startNode:
                    count += 1

                for child in adj[node]:
                    if child not in visited and vals[child] <= vals[startNode]:
                        visited.add(child)
                        q.append(child)

            res += count

        return res
```

```java
public class Solution {
    public int numberOfGoodPaths(int[] vals, int[][] edges) {
        int n = vals.length;
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
            adj[edge[1]].add(edge[0]);
        }

        int res = 0;
        for (int startNode = 0; startNode < n; startNode++) {
            Queue<Integer> q = new LinkedList<>();
            Set<Integer> visited = new HashSet<>();
            q.offer(startNode);
            visited.add(startNode);
            int count = 0;

            while (!q.isEmpty()) {
                int node = q.poll();
                if (vals[node] == vals[startNode] && node >= startNode) {
                    count++;
                }

                for (int child : adj[node]) {
                    if (!visited.contains(child) && vals[child] <= vals[startNode]) {
                        visited.add(child);
                        q.offer(child);
                    }
                }
            }

            res += count;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numberOfGoodPaths(vector<int>& vals, vector<vector<int>>& edges) {
        int n = vals.size();
        vector<vector<int>> adj(n);
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        int res = 0;
        for (int startNode = 0; startNode < n; startNode++) {
            queue<int> q;
            unordered_set<int> visited;
            q.push(startNode);
            visited.insert(startNode);
            int count = 0;

            while (!q.empty()) {
                int node = q.front();
                q.pop();
                if (vals[node] == vals[startNode] && node >= startNode) {
                    count++;
                }

                for (int child : adj[node]) {
                    if (visited.find(child) == visited.end() && vals[child] <= vals[startNode]) {
                        visited.insert(child);
                        q.push(child);
                    }
                }
            }

            res += count;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} vals
     * @param {number[][]} edges
     * @return {number}
     */
    numberOfGoodPaths(vals, edges) {
        const n = vals.length;
        const adj = Array.from({ length: n }, () => []);

        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        let res = 0;
        for (let startNode = 0; startNode < n; startNode++) {
            const q = new Queue([startNode]);
            const visited = new Set([startNode]);
            let count = 0;

            while (q.length) {
                let node = q.shift();
                if (vals[node] === vals[startNode] && node >= startNode) {
                    count++;
                }

                for (const child of adj[node]) {
                    if (!visited.has(child) && vals[child] <= vals[startNode]) {
                        visited.add(child);
                        q.push(child);
                    }
                }
            }

            res += count;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Disjoint Set Union

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
    def numberOfGoodPaths(self, vals: List[int], edges: List[List[int]]) -> int:
        adj = collections.defaultdict(list)
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        valToIndex = collections.defaultdict(list)
        for i, val in enumerate(vals):
            valToIndex[val].append(i)

        res = 0
        uf = DSU(len(vals))

        for val in sorted(valToIndex.keys()):
            for i in valToIndex[val]:
                for nei in adj[i]:
                    if vals[nei] <= vals[i]:
                        uf.union(nei, i)

            count = collections.defaultdict(int)
            for i in valToIndex[val]:
                count[uf.find(i)] += 1
                res += count[uf.find(i)]

        return res
```

```java
class DSU {
    private int[] parent, size;

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
    public int numberOfGoodPaths(int[] vals, int[][] edges) {
        int n = vals.length;
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();

        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
            adj[edge[1]].add(edge[0]);
        }

        TreeMap<Integer, List<Integer>> valToIndex = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            valToIndex.putIfAbsent(vals[i], new ArrayList<>());
            valToIndex.get(vals[i]).add(i);
        }

        DSU dsu = new DSU(n);
        int res = 0;

        for (int val : valToIndex.keySet()) {
            for (int i : valToIndex.get(val)) {
                for (int nei : adj[i]) {
                    if (vals[nei] <= vals[i]) dsu.union(nei, i);
                }
            }

            Map<Integer, Integer> count = new HashMap<>();
            for (int i : valToIndex.get(val)) {
                int root = dsu.find(i);
                count.put(root, count.getOrDefault(root, 0) + 1);
                res += count.get(root);
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
        for (int i = 0; i <= n; i++) parent[i] = i;
    }

    int find(int node) {
        if (parent[node] != node) parent[node] = find(parent[node]);
        return parent[node];
    }

    bool unite(int u, int v) {
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
    int numberOfGoodPaths(vector<int>& vals, vector<vector<int>>& edges) {
        int n = vals.size();
        vector<vector<int>> adj(n);
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        map<int, vector<int>> valToIndex;
        for (int i = 0; i < n; i++) valToIndex[vals[i]].push_back(i);

        DSU dsu(n);
        int res = 0;

        for (auto& [val, nodes] : valToIndex) {
            for (int& i : nodes) {
                for (int& nei : adj[i]) {
                    if (vals[nei] <= vals[i]) dsu.unite(nei, i);
                }
            }

            unordered_map<int, int> count;
            for (int& i : nodes) {
                int root = dsu.find(i);
                count[root]++;
                res += count[root];
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
     * @param {number[]} vals
     * @param {number[][]} edges
     * @return {number}
     */
    numberOfGoodPaths(vals, edges) {
        const n = vals.length;
        const adj = Array.from({ length: n }, () => []);

        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        const valToIndex = new Map();
        for (let i = 0; i < n; i++) {
            if (!valToIndex.has(vals[i])) valToIndex.set(vals[i], []);
            valToIndex.get(vals[i]).push(i);
        }

        const dsu = new DSU(n);
        let res = 0;

        for (const [val, nodes] of [...valToIndex.entries()].sort(
            (a, b) => a[0] - b[0],
        )) {
            for (const i of nodes) {
                for (const nei of adj[i]) {
                    if (vals[nei] <= vals[i]) dsu.union(nei, i);
                }
            }

            const count = new Map();
            for (const i of nodes) {
                const root = dsu.find(i);
                count.set(root, (count.get(root) || 0) + 1);
                res += count.get(root);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Disjoint Set Union (Union By Value)

::tabs-start

```python
class DSU:
    def __init__(self, n, vals):
        self.parent = list(range(n))
        self.vals = vals
        self.count = [1] * n # count of nodes with max value of the component

    def find(self, node):
        if self.parent[node] != node:
            self.parent[node] = self.find(self.parent[node])
        return self.parent[node]

    def union(self, u, v):
        pu, pv = self.find(u), self.find(v)
        if pu == pv:
            return 0
        if self.vals[pu] < self.vals[pv]:
            self.parent[pu] = pv
        elif self.vals[pu] > self.vals[pv]:
            self.parent[pv] = pu
        else:
            self.parent[pv] = pu
            result = self.count[pu] * self.count[pv]
            self.count[pu] += self.count[pv]
            return result

        return 0


class Solution:
    def numberOfGoodPaths(self, vals: List[int], edges: List[List[int]]) -> int:
        n = len(vals)
        dsu = DSU(n, vals)

        # Sort edges based on max value of the two nodes
        edges.sort(key=lambda edge: max(vals[edge[0]], vals[edge[1]]))

        res = n  # Each node alone is a good path
        for u, v in edges:
            res += dsu.union(u, v)
        return res
```

```java
class DSU {
    private int[] parent, count, vals;

    public DSU(int n, int[] vals) {
        this.parent = new int[n];
        this.vals = vals;
        this.count = new int[n]; // count of nodes with max value of the component
        Arrays.fill(count, 1);

        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    public int find(int node) {
        if (parent[node] != node) {
            parent[node] = find(parent[node]);
        }
        return parent[node];
    }

    public int union(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) {
            return 0;
        }
        if (vals[pu] < vals[pv]) {
            parent[pu] = pv;
        } else if (vals[pu] > vals[pv]) {
            parent[pv] = pu;
        } else {
            parent[pv] = pu;
            int result = count[pu] * count[pv];
            count[pu] += count[pv];
            return result;
        }
        return 0;
    }
}

public class Solution {
    public int numberOfGoodPaths(int[] vals, int[][] edges) {
        int n = vals.length;
        DSU dsu = new DSU(n, vals);

        // Sort edges based on max value of the two nodes
        Arrays.sort(edges,
            Comparator.comparingInt(edge -> Math.max(vals[edge[0]], vals[edge[1]]))
        );

        int res = n; // Each node alone is a good path
        for (int[] edge : edges) {
            res += dsu.union(edge[0], edge[1]);
        }
        return res;
    }
}
```

```cpp
class DSU {
    vector<int> parent, count, vals;

public:
    DSU(int n, vector<int>& vals) : vals(vals), parent(n), count(n, 1) {
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int node) {
        if (parent[node] != node) {
            parent[node] = find(parent[node]);
        }
        return parent[node];
    }

    int unionNodes(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) {
            return 0;
        }
        if (vals[pu] < vals[pv]) {
            parent[pu] = pv;
        } else if (vals[pu] > vals[pv]) {
            parent[pv] = pu;
        } else {
            parent[pv] = pu;
            int result = count[pu] * count[pv];
            count[pu] += count[pv];
            return result;
        }
        return 0;
    }
};

class Solution {
public:
    int numberOfGoodPaths(vector<int>& vals, vector<vector<int>>& edges) {
        int n = vals.size();
        DSU dsu(n, vals);

        // Sort edges based on max value of the two nodes
        sort(edges.begin(), edges.end(), [&](auto& a, auto& b) {
            return max(vals[a[0]], vals[a[1]]) < max(vals[b[0]], vals[b[1]]);
        });

        int res = n; // Each node alone is a good path
        for (auto& edge : edges) {
            res += dsu.unionNodes(edge[0], edge[1]);
        }
        return res;
    }
};
```

```javascript
class DSU {
    /**
     * @param {number} n
     * @param {number[]} vals
     */
    constructor(n, vals) {
        this.parent = Array(n)
            .fill(0)
            .map((_, i) => i);
        this.vals = vals;
        this.count = Array(n).fill(1); // count of nodes with max value of the component
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
     * @param {number} v
     * @return {number}
     */
    union(u, v) {
        let pu = this.find(u),
            pv = this.find(v);
        if (pu === pv) {
            return 0;
        }
        if (this.vals[pu] < this.vals[pv]) {
            this.parent[pu] = pv;
        } else if (this.vals[pu] > this.vals[pv]) {
            this.parent[pv] = pu;
        } else {
            this.parent[pv] = pu;
            let result = this.count[pu] * this.count[pv];
            this.count[pu] += this.count[pv];
            return result;
        }
        return 0;
    }
}

class Solution {
    /**
     * @param {number[]} vals
     * @param {number[][]} edges
     * @return {number}
     */
    numberOfGoodPaths(vals, edges) {
        let n = vals.length;
        let dsu = new DSU(n, vals);

        // Sort edges based on max value of the two nodes
        edges.sort(
            (a, b) =>
                Math.max(vals[a[0]], vals[a[1]]) -
                Math.max(vals[b[0]], vals[b[1]]),
        );

        let res = n; // Each node alone is a good path
        for (let [u, v] of edges) {
            res += dsu.union(u, v);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log n)$
- Space complexity: $O(n)$
