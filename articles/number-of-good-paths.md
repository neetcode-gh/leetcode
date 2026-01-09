## 1. Brute Force (DFS)

### Intuition

A good path starts and ends with nodes having the same value, and all nodes along the path have values less than or equal to that value. For each node, we can run a `dfs` to explore all reachable nodes where path values stay at or below the starting node's value. We count nodes with the same value as valid endpoints.

### Algorithm

1. Build an adjacency list from the edges.
2. For each node `startNode`, run a `dfs`:
   - Only traverse to children with values less than or equal to `vals[startNode]`.
   - Count nodes that have the same value as `startNode` and have index greater than or equal to `startNode` (to avoid double counting).
3. Sum up all counts and return the total.

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

```csharp
public class Solution {
    private List<int>[] adj;
    private int[] vals;

    public int NumberOfGoodPaths(int[] vals, int[][] edges) {
        int n = vals.Length;
        this.vals = vals;
        adj = new List<int>[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
        }

        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        int res = 0;
        for (int node = 0; node < n; node++) {
            res += Dfs(node, node, -1);
        }
        return res;
    }

    private int Dfs(int node, int startNode, int parent) {
        if (vals[node] > vals[startNode]) {
            return 0;
        }

        int res = 0;
        if (vals[node] == vals[startNode] && node >= startNode) {
            res += 1;
        }

        foreach (int child in adj[node]) {
            if (child == parent) continue;
            res += Dfs(child, startNode, node);
        }
        return res;
    }
}
```

```go
func numberOfGoodPaths(vals []int, edges [][]int) int {
    n := len(vals)
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }

    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
        adj[edge[1]] = append(adj[edge[1]], edge[0])
    }

    var dfs func(node, startNode, parent int) int
    dfs = func(node, startNode, parent int) int {
        if vals[node] > vals[startNode] {
            return 0
        }

        res := 0
        if vals[node] == vals[startNode] && node >= startNode {
            res += 1
        }

        for _, child := range adj[node] {
            if child == parent {
                continue
            }
            res += dfs(child, startNode, node)
        }
        return res
    }

    res := 0
    for node := 0; node < n; node++ {
        res += dfs(node, node, -1)
    }
    return res
}
```

```kotlin
class Solution {
    private lateinit var adj: Array<MutableList<Int>>
    private lateinit var vals: IntArray

    fun numberOfGoodPaths(vals: IntArray, edges: Array<IntArray>): Int {
        val n = vals.size
        this.vals = vals
        adj = Array(n) { mutableListOf<Int>() }

        for (edge in edges) {
            adj[edge[0]].add(edge[1])
            adj[edge[1]].add(edge[0])
        }

        var res = 0
        for (node in 0 until n) {
            res += dfs(node, node, -1)
        }
        return res
    }

    private fun dfs(node: Int, startNode: Int, parent: Int): Int {
        if (vals[node] > vals[startNode]) {
            return 0
        }

        var res = 0
        if (vals[node] == vals[startNode] && node >= startNode) {
            res += 1
        }

        for (child in adj[node]) {
            if (child == parent) continue
            res += dfs(child, startNode, node)
        }
        return res
    }
}
```

```swift
class Solution {
    private var adj: [[Int]] = []
    private var vals: [Int] = []

    func numberOfGoodPaths(_ vals: [Int], _ edges: [[Int]]) -> Int {
        let n = vals.count
        self.vals = vals
        adj = Array(repeating: [Int](), count: n)

        for edge in edges {
            adj[edge[0]].append(edge[1])
            adj[edge[1]].append(edge[0])
        }

        var res = 0
        for node in 0..<n {
            res += dfs(node, node, -1)
        }
        return res
    }

    private func dfs(_ node: Int, _ startNode: Int, _ parent: Int) -> Int {
        if vals[node] > vals[startNode] {
            return 0
        }

        var res = 0
        if vals[node] == vals[startNode] && node >= startNode {
            res += 1
        }

        for child in adj[node] {
            if child == parent { continue }
            res += dfs(child, startNode, node)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Brute Force (BFS)

### Intuition

This is the same logic as the `dfs` approach but uses `bfs` instead. Starting from each node, we explore all reachable nodes using a queue, only visiting neighbors with values at or below the starting node's value. We count valid endpoints with matching values.

### Algorithm

1. Build an adjacency list from the edges.
2. For each node `startNode`, run a `bfs`:
   - Use a queue and a visited set.
   - Only add neighbors to the queue if their value is at most `vals[startNode]`.
   - Count nodes with the same value as `startNode` and index at least `startNode`.
3. Return the total count.

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

```csharp
public class Solution {
    public int NumberOfGoodPaths(int[] vals, int[][] edges) {
        int n = vals.Length;
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
        }

        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        int res = 0;
        for (int startNode = 0; startNode < n; startNode++) {
            var q = new Queue<int>();
            var visited = new HashSet<int>();
            q.Enqueue(startNode);
            visited.Add(startNode);
            int count = 0;

            while (q.Count > 0) {
                int node = q.Dequeue();
                if (vals[node] == vals[startNode] && node >= startNode) {
                    count++;
                }

                foreach (int child in adj[node]) {
                    if (!visited.Contains(child) && vals[child] <= vals[startNode]) {
                        visited.Add(child);
                        q.Enqueue(child);
                    }
                }
            }

            res += count;
        }
        return res;
    }
}
```

```go
func numberOfGoodPaths(vals []int, edges [][]int) int {
    n := len(vals)
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }

    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
        adj[edge[1]] = append(adj[edge[1]], edge[0])
    }

    res := 0
    for startNode := 0; startNode < n; startNode++ {
        q := []int{startNode}
        visited := make(map[int]bool)
        visited[startNode] = true
        count := 0

        for len(q) > 0 {
            node := q[0]
            q = q[1:]
            if vals[node] == vals[startNode] && node >= startNode {
                count++
            }

            for _, child := range adj[node] {
                if !visited[child] && vals[child] <= vals[startNode] {
                    visited[child] = true
                    q = append(q, child)
                }
            }
        }

        res += count
    }
    return res
}
```

```kotlin
class Solution {
    fun numberOfGoodPaths(vals: IntArray, edges: Array<IntArray>): Int {
        val n = vals.size
        val adj = Array(n) { mutableListOf<Int>() }

        for (edge in edges) {
            adj[edge[0]].add(edge[1])
            adj[edge[1]].add(edge[0])
        }

        var res = 0
        for (startNode in 0 until n) {
            val q: java.util.LinkedList<Int> = java.util.LinkedList()
            val visited = HashSet<Int>()
            q.offer(startNode)
            visited.add(startNode)
            var count = 0

            while (q.isNotEmpty()) {
                val node = q.poll()
                if (vals[node] == vals[startNode] && node >= startNode) {
                    count++
                }

                for (child in adj[node]) {
                    if (child !in visited && vals[child] <= vals[startNode]) {
                        visited.add(child)
                        q.offer(child)
                    }
                }
            }

            res += count
        }
        return res
    }
}
```

```swift
class Solution {
    func numberOfGoodPaths(_ vals: [Int], _ edges: [[Int]]) -> Int {
        let n = vals.count
        var adj = [[Int]](repeating: [], count: n)

        for edge in edges {
            adj[edge[0]].append(edge[1])
            adj[edge[1]].append(edge[0])
        }

        var res = 0
        for startNode in 0..<n {
            var q = [startNode]
            var visited = Set([startNode])
            var count = 0

            while !q.isEmpty {
                let node = q.removeFirst()
                if vals[node] == vals[startNode] && node >= startNode {
                    count += 1
                }

                for child in adj[node] {
                    if !visited.contains(child) && vals[child] <= vals[startNode] {
                        visited.insert(child)
                        q.append(child)
                    }
                }
            }

            res += count
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Disjoint Set Union

### Intuition

Processing nodes in increasing order of their values allows us to incrementally build connected components. When we process nodes with value `v`, we union them with their neighbors that have values at most `v`. At each step, nodes with value `v` in the same component can form good paths with each other. The number of such paths equals the count of same-valued nodes per component.

### Algorithm

1. Group nodes by their values and sort the values in ascending order.
2. Initialize a Union-Find structure.
3. For each value (from smallest to largest):
   - For each node with this value, union it with neighbors having smaller or equal values.
   - Group nodes with the current value by their connected component roots.
   - For each component, if `k` nodes have the current value, add `1 + 2 + ... + k = k*(k+1)/2` to the `res` (or equivalently, add incrementally).
4. Return the total `res`.

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

```csharp
public class DSU {
    private int[] parent, size;

    public DSU(int n) {
        parent = new int[n + 1];
        size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }

    public int Find(int node) {
        if (parent[node] != node) {
            parent[node] = Find(parent[node]);
        }
        return parent[node];
    }

    public bool Union(int u, int v) {
        int pu = Find(u), pv = Find(v);
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
    public int NumberOfGoodPaths(int[] vals, int[][] edges) {
        int n = vals.Length;
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();

        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        var valToIndex = new SortedDictionary<int, List<int>>();
        for (int i = 0; i < n; i++) {
            if (!valToIndex.ContainsKey(vals[i])) {
                valToIndex[vals[i]] = new List<int>();
            }
            valToIndex[vals[i]].Add(i);
        }

        var dsu = new DSU(n);
        int res = 0;

        foreach (var kvp in valToIndex) {
            var nodes = kvp.Value;
            foreach (int i in nodes) {
                foreach (int nei in adj[i]) {
                    if (vals[nei] <= vals[i]) dsu.Union(nei, i);
                }
            }

            var count = new Dictionary<int, int>();
            foreach (int i in nodes) {
                int root = dsu.Find(i);
                if (!count.ContainsKey(root)) count[root] = 0;
                count[root]++;
                res += count[root];
            }
        }
        return res;
    }
}
```

```go
type DSU struct {
    parent []int
    size   []int
}

func NewDSU(n int) *DSU {
    parent := make([]int, n+1)
    size := make([]int, n+1)
    for i := 0; i <= n; i++ {
        parent[i] = i
        size[i] = 1
    }
    return &DSU{parent: parent, size: size}
}

func (d *DSU) Find(node int) int {
    if d.parent[node] != node {
        d.parent[node] = d.Find(d.parent[node])
    }
    return d.parent[node]
}

func (d *DSU) Union(u, v int) bool {
    pu, pv := d.Find(u), d.Find(v)
    if pu == pv {
        return false
    }
    if d.size[pu] >= d.size[pv] {
        d.size[pu] += d.size[pv]
        d.parent[pv] = pu
    } else {
        d.size[pv] += d.size[pu]
        d.parent[pu] = pv
    }
    return true
}

func numberOfGoodPaths(vals []int, edges [][]int) int {
    n := len(vals)
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }

    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
        adj[edge[1]] = append(adj[edge[1]], edge[0])
    }

    valToIndex := make(map[int][]int)
    for i, val := range vals {
        valToIndex[val] = append(valToIndex[val], i)
    }

    sortedVals := make([]int, 0, len(valToIndex))
    for val := range valToIndex {
        sortedVals = append(sortedVals, val)
    }
    sort.Ints(sortedVals)

    dsu := NewDSU(n)
    res := 0

    for _, val := range sortedVals {
        nodes := valToIndex[val]
        for _, i := range nodes {
            for _, nei := range adj[i] {
                if vals[nei] <= vals[i] {
                    dsu.Union(nei, i)
                }
            }
        }

        count := make(map[int]int)
        for _, i := range nodes {
            root := dsu.Find(i)
            count[root]++
            res += count[root]
        }
    }
    return res
}
```

```kotlin
class DSU(n: Int) {
    val parent = IntArray(n + 1) { it }
    val size = IntArray(n + 1) { 1 }

    fun find(node: Int): Int {
        if (parent[node] != node) {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    fun union(u: Int, v: Int): Boolean {
        val pu = find(u)
        val pv = find(v)
        if (pu == pv) return false
        if (size[pu] >= size[pv]) {
            size[pu] += size[pv]
            parent[pv] = pu
        } else {
            size[pv] += size[pu]
            parent[pu] = pv
        }
        return true
    }
}

class Solution {
    fun numberOfGoodPaths(vals: IntArray, edges: Array<IntArray>): Int {
        val n = vals.size
        val adj = Array(n) { mutableListOf<Int>() }

        for (edge in edges) {
            adj[edge[0]].add(edge[1])
            adj[edge[1]].add(edge[0])
        }

        val valToIndex = TreeMap<Int, MutableList<Int>>()
        for (i in 0 until n) {
            valToIndex.getOrPut(vals[i]) { mutableListOf() }.add(i)
        }

        val dsu = DSU(n)
        var res = 0

        for ((_, nodes) in valToIndex) {
            for (i in nodes) {
                for (nei in adj[i]) {
                    if (vals[nei] <= vals[i]) dsu.union(nei, i)
                }
            }

            val count = mutableMapOf<Int, Int>()
            for (i in nodes) {
                val root = dsu.find(i)
                count[root] = count.getOrDefault(root, 0) + 1
                res += count[root]!!
            }
        }
        return res
    }
}
```

```swift
class DSU {
    var parent: [Int]
    var size: [Int]

    init(_ n: Int) {
        parent = Array(0...n)
        size = Array(repeating: 1, count: n + 1)
    }

    func find(_ node: Int) -> Int {
        if parent[node] != node {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    func union(_ u: Int, _ v: Int) -> Bool {
        let pu = find(u), pv = find(v)
        if pu == pv { return false }
        if size[pu] >= size[pv] {
            size[pu] += size[pv]
            parent[pv] = pu
        } else {
            size[pv] += size[pu]
            parent[pu] = pv
        }
        return true
    }
}

class Solution {
    func numberOfGoodPaths(_ vals: [Int], _ edges: [[Int]]) -> Int {
        let n = vals.count
        var adj = [[Int]](repeating: [], count: n)

        for edge in edges {
            adj[edge[0]].append(edge[1])
            adj[edge[1]].append(edge[0])
        }

        var valToIndex = [Int: [Int]]()
        for i in 0..<n {
            valToIndex[vals[i], default: []].append(i)
        }

        let dsu = DSU(n)
        var res = 0

        for val in valToIndex.keys.sorted() {
            let nodes = valToIndex[val]!
            for i in nodes {
                for nei in adj[i] {
                    if vals[nei] <= vals[i] {
                        _ = dsu.union(nei, i)
                    }
                }
            }

            var count = [Int: Int]()
            for i in nodes {
                let root = dsu.find(i)
                count[root, default: 0] += 1
                res += count[root]!
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Disjoint Set Union (Union By Value)

### Intuition

Instead of grouping nodes by value, we can sort the edges by the maximum value of their endpoints. Processing edges in this order ensures that when we connect two components, we only form new good paths when both component representatives have the same value. Each component tracks how many nodes share the maximum value, allowing us to compute new paths during union operations.

### Algorithm

1. Initialize a Union-Find where each component tracks the count of nodes with the maximum value in that component.
2. Sort edges by the maximum of `vals[u]` and `vals[v]`.
3. Start with `n` good paths (each node alone is a valid path).
4. For each edge, union the two endpoints:
   - If the representatives have different values, the one with the smaller value gets absorbed.
   - If they have equal values, multiply the counts from both sides to get new good paths, then merge.
5. Return the total `res`.

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

```csharp
public class DSU {
    private int[] parent, count, vals;

    public DSU(int n, int[] vals) {
        this.parent = new int[n];
        this.vals = vals;
        this.count = new int[n];
        Array.Fill(count, 1);

        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    public int Find(int node) {
        if (parent[node] != node) {
            parent[node] = Find(parent[node]);
        }
        return parent[node];
    }

    public int Union(int u, int v) {
        int pu = Find(u), pv = Find(v);
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
    public int NumberOfGoodPaths(int[] vals, int[][] edges) {
        int n = vals.Length;
        var dsu = new DSU(n, vals);

        Array.Sort(edges, (a, b) =>
            Math.Max(vals[a[0]], vals[a[1]]).CompareTo(Math.Max(vals[b[0]], vals[b[1]])));

        int res = n;
        foreach (var edge in edges) {
            res += dsu.Union(edge[0], edge[1]);
        }
        return res;
    }
}
```

```go
type DSU struct {
    parent []int
    count  []int
    vals   []int
}

func NewDSU(n int, vals []int) *DSU {
    parent := make([]int, n)
    count := make([]int, n)
    for i := 0; i < n; i++ {
        parent[i] = i
        count[i] = 1
    }
    return &DSU{parent: parent, count: count, vals: vals}
}

func (d *DSU) Find(node int) int {
    if d.parent[node] != node {
        d.parent[node] = d.Find(d.parent[node])
    }
    return d.parent[node]
}

func (d *DSU) Union(u, v int) int {
    pu, pv := d.Find(u), d.Find(v)
    if pu == pv {
        return 0
    }
    if d.vals[pu] < d.vals[pv] {
        d.parent[pu] = pv
    } else if d.vals[pu] > d.vals[pv] {
        d.parent[pv] = pu
    } else {
        d.parent[pv] = pu
        result := d.count[pu] * d.count[pv]
        d.count[pu] += d.count[pv]
        return result
    }
    return 0
}

func numberOfGoodPaths(vals []int, edges [][]int) int {
    n := len(vals)
    dsu := NewDSU(n, vals)

    sort.Slice(edges, func(i, j int) bool {
        maxI := max(vals[edges[i][0]], vals[edges[i][1]])
        maxJ := max(vals[edges[j][0]], vals[edges[j][1]])
        return maxI < maxJ
    })

    res := n
    for _, edge := range edges {
        res += dsu.Union(edge[0], edge[1])
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class DSU(n: Int, private val vals: IntArray) {
    private val parent = IntArray(n) { it }
    private val count = IntArray(n) { 1 }

    fun find(node: Int): Int {
        if (parent[node] != node) {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    fun union(u: Int, v: Int): Int {
        val pu = find(u)
        val pv = find(v)
        if (pu == pv) {
            return 0
        }
        if (vals[pu] < vals[pv]) {
            parent[pu] = pv
        } else if (vals[pu] > vals[pv]) {
            parent[pv] = pu
        } else {
            parent[pv] = pu
            val result = count[pu] * count[pv]
            count[pu] += count[pv]
            return result
        }
        return 0
    }
}

class Solution {
    fun numberOfGoodPaths(vals: IntArray, edges: Array<IntArray>): Int {
        val n = vals.size
        val dsu = DSU(n, vals)

        edges.sortBy { maxOf(vals[it[0]], vals[it[1]]) }

        var res = n
        for ((u, v) in edges) {
            res += dsu.union(u, v)
        }
        return res
    }
}
```

```swift
class DSU {
    var parent: [Int]
    var count: [Int]
    var vals: [Int]

    init(_ n: Int, _ vals: [Int]) {
        parent = Array(0..<n)
        count = Array(repeating: 1, count: n)
        self.vals = vals
    }

    func find(_ node: Int) -> Int {
        if parent[node] != node {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    func union(_ u: Int, _ v: Int) -> Int {
        let pu = find(u), pv = find(v)
        if pu == pv {
            return 0
        }
        if vals[pu] < vals[pv] {
            parent[pu] = pv
        } else if vals[pu] > vals[pv] {
            parent[pv] = pu
        } else {
            parent[pv] = pu
            let result = count[pu] * count[pv]
            count[pu] += count[pv]
            return result
        }
        return 0
    }
}

class Solution {
    func numberOfGoodPaths(_ vals: [Int], _ edges: [[Int]]) -> Int {
        let n = vals.count
        let dsu = DSU(n, vals)

        let sortedEdges = edges.sorted {
            max(vals[$0[0]], vals[$0[1]]) < max(vals[$1[0]], vals[$1[1]])
        }

        var res = n
        for edge in sortedEdges {
            res += dsu.union(edge[0], edge[1])
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log n)$
- Space complexity: $O(n)$
