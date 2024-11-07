## 1. Cycle Detection (DFS)

::tabs-start

```python
class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)
        adj = [[] for _ in range(n + 1)]

        def dfs(node, par):
            if visit[node]:
                return True
            
            visit[node] = True
            for nei in adj[node]:
                if nei == par:
                    continue
                if dfs(nei, node):
                    return True
            return False
        
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            visit = [False] * (n + 1)
            
            if dfs(u, -1):
                return [u, v]
        return []
```

```java
public class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            adj.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            int u = edge[0], v = edge[1];
            adj.get(u).add(v);
            adj.get(v).add(u);
            boolean[] visit = new boolean[n + 1];

            if (dfs(u, -1, adj, visit)) {
                return edge;
            }
        }
        return new int[0];
    }

    private boolean dfs(int node, int parent, 
                        List<List<Integer>> adj, boolean[] visit) {
        if (visit[node]) {
            return true;
        }

        visit[node] = true;
        for (int nei : adj.get(node)) {
            if (nei == parent) {
                continue;
            }
            if (dfs(nei, node, adj, visit)) {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<vector<int>> adj(n + 1);

        for (const auto& edge : edges) {
            int u = edge[0], v = edge[1];
            adj[u].push_back(v);
            adj[v].push_back(u);
            vector<bool> visit(n + 1, false);

            if (dfs(u, -1, adj, visit)) {
                return {u, v};
            }
        }
        return {};
    }

private:
    bool dfs(int node, int parent, 
             vector<vector<int>>& adj, vector<bool>& visit) {
        if (visit[node]) return true;
        visit[node] = true;
        for (int nei : adj[node]) {
            if (nei == parent) continue;
            if (dfs(nei, node, adj, visit)) return true;
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} edges
     * @return {number[]}
     */
    findRedundantConnection(edges) {
        const n = edges.length;
        const adj = Array.from({ length: n + 1 }, () => []);

        const dfs = (node, parent, visited) => {
            if (visited[node]) return true;
            visited[node] = true;
            for (const nei of adj[node]) {
                if (nei === parent) continue;
                if (dfs(nei, node, visited)) return true;
            }
            return false;
        };

        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
            const visited = Array(n + 1).fill(false);
            if (dfs(u, -1, visited)) {
                return [u, v];
            }
        }
        return [];
    }
}
```

```csharp
public class Solution {
    public int[] FindRedundantConnection(int[][] edges) {
        int n = edges.Length;
        List<List<int>> adj = new List<List<int>>();
        for (int i = 0; i <= n; i++) {
            adj.Add(new List<int>());
        }

        foreach (var edge in edges) {
            int u = edge[0], v = edge[1];
            adj[u].Add(v);
            adj[v].Add(u);
            bool[] visit = new bool[n + 1];

            if (Dfs(u, -1, adj, visit)) {
                return new int[] { u, v };
            }
        }
        return new int[0];
    }

    private bool Dfs(int node, int parent, 
                     List<List<int>> adj, bool[] visit) {
        if (visit[node]) return true;
        visit[node] = true;
        foreach (int nei in adj[node]) {
            if (nei == parent) continue;
            if (Dfs(nei, node, adj, visit)) return true;
        }
        return false;
    }
}
```

```go
func findRedundantConnection(edges [][]int) []int {
    n := len(edges)
    adj := make([][]int, n+1)
    visit := make([]bool, n+1)

    var dfs func(node, par int) bool
    dfs = func(node, par int) bool {
        if visit[node] {
            return true
        }
        visit[node] = true
        for _, nei := range adj[node] {
            if nei == par {
                continue
            }
            if dfs(nei, node) {
                return true
            }
        }
        return false
    }

    for _, edge := range edges {
        u, v := edge[0], edge[1]
        adj[u] = append(adj[u], v)
        adj[v] = append(adj[v], u)
        for i := 0; i <= n; i++ {
            visit[i] = false
        }
        
        if dfs(u, -1) {
            return []int{u, v}
        }
    }
    return []int{}
}
```

```kotlin
class Solution {
    fun findRedundantConnection(edges: Array<IntArray>): IntArray {
        val n = edges.size
        val adj = Array(n + 1) { mutableListOf<Int>() }

        fun dfs(node: Int, par: Int, visit: BooleanArray): Boolean {
            if (visit[node]) {
                return true
            }
            visit[node] = true
            for (nei in adj[node]) {
                if (nei == par) continue
                if (dfs(nei, node, visit)) return true
            }
            return false
        }

        for (edge in edges) {
            val u = edge[0]
            val v = edge[1]
            adj[u].add(v)
            adj[v].add(u)
            val visit = BooleanArray(n + 1)

            if (dfs(u, -1, visit)) {
                return intArrayOf(u, v)
            }
        }
        return intArrayOf()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(E * (V + E))$
* Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges in the graph.

---

## 2. Depth First Search (Optimal)

::tabs-start

```python
class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)
        adj = [[] for _ in range(n + 1)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        visit = [False] * (n + 1)
        cycle = set()
        cycleStart = -1
        
        def dfs(node, par):
            nonlocal cycleStart
            if visit[node]:
                cycleStart = node
                return True  
            
            visit[node] = True
            for nei in adj[node]:
                if nei == par:
                    continue
                if dfs(nei, node):
                    if cycleStart != -1:
                        cycle.add(node)
                    if node == cycleStart:
                        cycleStart = -1
                    return True
            return False
        
        dfs(1, -1)
        
        for u, v in reversed(edges):
            if u in cycle and v in cycle:
                return [u, v]

        return []
```

```java
public class Solution {
    private boolean[] visit;
    private List<List<Integer>> adj;
    private Set<Integer> cycle;
    private int cycleStart;

    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) 
            adj.add(new ArrayList<>());

        for (int[] edge : edges) {
            int u = edge[0], v = edge[1];
            adj.get(u).add(v);
            adj.get(v).add(u);
        }

        visit = new boolean[n + 1];
        cycle = new HashSet<>();
        cycleStart = -1;
        dfs(1, -1);

        for (int i = edges.length - 1; i >= 0; i--) {
            int u = edges[i][0], v = edges[i][1];
            if (cycle.contains(u) && cycle.contains(v)) {
                return new int[]{u, v};
            }
        }
        return new int[0];
    }

    private boolean dfs(int node, int par) {
        if (visit[node]) {
            cycleStart = node;
            return true;
        }
        visit[node] = true;
        for (int nei : adj.get(node)) {
            if (nei == par) continue;
            if (dfs(nei, node)) {
                if (cycleStart != -1) cycle.add(node);
                if (node == cycleStart) {
                    cycleStart = -1;
                }
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
    vector<bool> visit;
    vector<vector<int>> adj;
    unordered_set<int> cycle;
    int cycleStart;
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        adj.resize(n + 1);
        for (auto& edge : edges) {
            int u = edge[0], v = edge[1];
            adj[u].push_back(v);
            adj[v].push_back(u);
        }

        visit.resize(n + 1, false);
        cycleStart = -1;
        dfs(1, -1);

        for (int i = edges.size() - 1; i >= 0; i--) {
            int u = edges[i][0], v = edges[i][1];
            if (cycle.count(u) && cycle.count(v)) {
                return {u, v};
            }
        }
        return {};
    }

private:
    bool dfs(int node, int par) {
        if (visit[node]) {
            cycleStart = node;
            return true;
        }
        visit[node] = true;
        for (int nei : adj[node]) {
            if (nei == par) continue;
            if (dfs(nei, node)) {
                if (cycleStart != -1) cycle.insert(node);
                if (node == cycleStart) {
                    cycleStart = -1;
                }
                return true;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} edges
     * @return {number[]}
     */
    findRedundantConnection(edges) {
        const n = edges.length;
        const adj = Array.from({ length: n + 1 }, () => []);

        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        const visit = Array(n + 1).fill(false);
        const cycle = new Set();
        let cycleStart = -1;

        const dfs = (node, par) => {
            if (visit[node]) {
                cycleStart = node;
                return true;
            }
            visit[node] = true;
            for (const nei of adj[node]) {
                if (nei === par) continue;
                if (dfs(nei, node)) {
                    if (cycleStart !== -1) cycle.add(node);
                    if (node === cycleStart) {
                        cycleStart = -1;
                    }
                    return true;
                }
            }
            return false;
        };

        dfs(1, -1);

        for (let i = edges.length - 1; i >= 0; i--) {
            const [u, v] = edges[i];
            if (cycle.has(u) && cycle.has(v)) {
                return [u, v];
            }
        }
        return [];
    }
}
```

```csharp
public class Solution {
    public int[] FindRedundantConnection(int[][] edges) {
        int n = edges.Length;
        List<int>[] adj = new List<int>[n + 1];
        for (int i = 0; i <= n; i++) adj[i] = new List<int>();

        foreach (var edge in edges) {
            int u = edge[0], v = edge[1];
            adj[u].Add(v);
            adj[v].Add(u);
        }

        bool[] visit = new bool[n + 1];
        HashSet<int> cycle = new HashSet<int>();
        int cycleStart = -1;

        bool Dfs(int node, int par) {
            if (visit[node]) {
                cycleStart = node;
                return true;
            }
            visit[node] = true;
            foreach (int nei in adj[node]) {
                if (nei == par) continue;
                if (Dfs(nei, node)) {
                    if (cycleStart != -1) cycle.Add(node);
                    if (node == cycleStart) {
                        cycleStart = -1;
                    }
                    return true;
                }
            }
            return false;
        }

        Dfs(1, -1);

        for (int i = edges.Length - 1; i >= 0; i--) {
            int u = edges[i][0], v = edges[i][1];
            if (cycle.Contains(u) && cycle.Contains(v)) {
                return new int[] { u, v };
            }
        }
        return new int[0];
    }
}
```

```go
func findRedundantConnection(edges [][]int) []int {
    n := len(edges)
    adj := make([][]int, n+1)
    for _, edge := range edges {
        u, v := edge[0], edge[1]
        adj[u] = append(adj[u], v)
        adj[v] = append(adj[v], u)
    }

    visit := make([]bool, n+1)
    cycle := make(map[int]bool)
    cycleStart := -1

    var dfs func(node, par int) bool
    dfs = func(node, par int) bool {
        if visit[node] {
            cycleStart = node
            return true
        }
        
        visit[node] = true
        for _, nei := range adj[node] {
            if nei == par {
                continue
            }
            if dfs(nei, node) {
                if cycleStart != -1 {
                    cycle[node] = true
                }
                if node == cycleStart {
                    cycleStart = -1
                }
                return true
            }
        }
        return false
    }

    dfs(1, -1)

    for i := len(edges) - 1; i >= 0; i-- {
        u, v := edges[i][0], edges[i][1]
        if cycle[u] && cycle[v] {
            return []int{u, v}
        }
    }
    return []int{}
}
```

```kotlin
class Solution {
    fun findRedundantConnection(edges: Array<IntArray>): IntArray {
        val n = edges.size
        val adj = Array(n + 1) { mutableListOf<Int>() }
        for ((u, v) in edges) {
            adj[u].add(v)
            adj[v].add(u)
        }

        val visit = BooleanArray(n + 1)
        val cycle = HashSet<Int>()
        var cycleStart = -1

        fun dfs(node: Int, par: Int): Boolean {
            if (visit[node]) {
                cycleStart = node
                return true
            }
            visit[node] = true
            for (nei in adj[node]) {
                if (nei == par) continue
                if (dfs(nei, node)) {
                    if (cycleStart != -1) {
                        cycle.add(node)
                    }
                    if (node == cycleStart) {
                        cycleStart = -1
                    }
                    return true
                }
            }
            return false
        }

        dfs(1, -1)

        for (i in edges.indices.reversed()) {
            val (u, v) = edges[i]
            if (u in cycle && v in cycle) {
                return intArrayOf(u, v)
            }
        }
        return intArrayOf()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V + E)$
* Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges in the graph.

---

## 3. Kanh's Algorithm (BFS)

::tabs-start

```python
class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)
        indegree = [0] * (n + 1)
        adj = [[] for _ in range(n + 1)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            indegree[u] += 1
            indegree[v] += 1
        
        q = deque()
        for i in range(1, n + 1):
            if indegree[i] == 1:
                q.append(i)

        while q:
            node = q.popleft()
            indegree[node] -= 1
            for nei in adj[node]:
                indegree[nei] -= 1
                if indegree[nei] == 1:
                    q.append(nei)

        for u, v in edges[::-1]:
            if indegree[u] == 2 and indegree[v]:
                return [u, v]
        return []
```

```java
public class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        int[] indegree = new int[n + 1];
        List<List<Integer>> adj = new ArrayList<>(n + 1);
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1];
            adj.get(u).add(v);
            adj.get(v).add(u);
            indegree[u]++;
            indegree[v]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 1; i <= n; i++) {
            if (indegree[i] == 1) q.offer(i);
        }

        while (!q.isEmpty()) {
            int node = q.poll();
            indegree[node]--;
            for (int nei : adj.get(node)) {
                indegree[nei]--;
                if (indegree[nei] == 1) q.offer(nei);
            }
        }

        for (int i = edges.length - 1; i >= 0; i--) {
            int u = edges[i][0], v = edges[i][1];
            if (indegree[u] == 2 && indegree[v] > 0) 
                return new int[]{u, v};
        }
        return new int[0];
    }
}
```

```cpp
class Solution {
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> indegree(n + 1, 0);
        vector<vector<int>> adj(n + 1);
        for (auto& edge : edges) {
            int u = edge[0], v = edge[1];
            adj[u].push_back(v);
            adj[v].push_back(u);
            indegree[u]++;
            indegree[v]++;
        }

        queue<int> q;
        for (int i = 1; i <= n; i++) {
            if (indegree[i] == 1) q.push(i);
        }

        while (!q.empty()) {
            int node = q.front(); q.pop();
            indegree[node]--;
            for (int nei : adj[node]) {
                indegree[nei]--;
                if (indegree[nei] == 1) q.push(nei);
            }
        }

        for (int i = edges.size() - 1; i >= 0; i--) {
            int u = edges[i][0], v = edges[i][1];
            if (indegree[u] == 2 && indegree[v]) 
                return {u, v};
        }
        return {};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} edges
     * @return {number[]}
     */
    findRedundantConnection(edges) {
        const n = edges.length;
        const indegree = new Array(n + 1).fill(0);
        const adj = Array.from({ length: n + 1 }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
            indegree[u]++;
            indegree[v]++;
        }

        const q = new Queue();
        for (let i = 1; i <= n; i++) {
            if (indegree[i] === 1) q.push(i);
        }

        while (!q.isEmpty()) {
            const node = q.pop();
            indegree[node]--;
            for (const nei of adj[node]) {
                indegree[nei]--;
                if (indegree[nei] === 1) q.push(nei);
            }
        }

        for (let i = edges.length - 1; i >= 0; i--) {
            const [u, v] = edges[i];
            if (indegree[u] === 2 && indegree[v]) 
                return [u, v];
        }
        return [];
    }
}
```

```csharp
public class Solution {
    public int[] FindRedundantConnection(int[][] edges) {
        int n = edges.Length;
        int[] indegree = new int[n + 1];
        List<int>[] adj = new List<int>[n + 1];
        for (int i = 0; i <= n; i++) adj[i] = new List<int>();
        foreach (var edge in edges) {
            int u = edge[0], v = edge[1];
            adj[u].Add(v);
            adj[v].Add(u);
            indegree[u]++;
            indegree[v]++;
        }

        Queue<int> q = new Queue<int>();
        for (int i = 1; i <= n; i++) {
            if (indegree[i] == 1) q.Enqueue(i);
        }

        while (q.Count > 0) {
            int node = q.Dequeue();
            indegree[node]--;
            foreach (int nei in adj[node]) {
                indegree[nei]--;
                if (indegree[nei] == 1) q.Enqueue(nei);
            }
        }

        for (int i = edges.Length - 1; i >= 0; i--) {
            int u = edges[i][0], v = edges[i][1];
            if (indegree[u] == 2 && indegree[v] > 0) 
                return new int[] {u, v};
        }
        return new int[0];
    }
}
```

```go
func findRedundantConnection(edges [][]int) []int {
    n := len(edges)
    indegree := make([]int, n+1)
    adj := make([][]int, n+1)
    for _, edge := range edges {
        u, v := edge[0], edge[1]
        adj[u] = append(adj[u], v)
        adj[v] = append(adj[v], u)
        indegree[u]++
        indegree[v]++
    }

    q := []int{}
    for i := 1; i <= n; i++ {
        if indegree[i] == 1 {
            q = append(q, i)
        }
    }

    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        indegree[node]--
        for _, nei := range adj[node] {
            indegree[nei]--
            if indegree[nei] == 1 {
                q = append(q, nei)
            }
        }
    }

    for i := len(edges) - 1; i >= 0; i-- {
        u, v := edges[i][0], edges[i][1]
        if indegree[u] == 2 && indegree[v] == 2 {
            return []int{u, v}
        }
    }
    return []int{}
}
```

```kotlin
class Solution {
    fun findRedundantConnection(edges: Array<IntArray>): IntArray {
        val n = edges.size
        val indegree = IntArray(n + 1)
        val adj = Array(n + 1) { mutableListOf<Int>() }

        for ((u, v) in edges) {
            adj[u].add(v)
            adj[v].add(u)
            indegree[u]++
            indegree[v]++
        }

        val q: Queue<Int> = LinkedList()
        for (i in 1..n) {
            if (indegree[i] == 1) {
                q.add(i)
            }
        }

        while (q.isNotEmpty()) {
            val node = q.poll()
            indegree[node]--
            for (nei in adj[node]) {
                indegree[nei]--
                if (indegree[nei] == 1) {
                    q.add(nei)
                }
            }
        }

        for (i in edges.indices.reversed()) {
            val (u, v) = edges[i]
            if (indegree[u] == 2 && indegree[v] == 2) {
                return intArrayOf(u, v)
            }
        }
        return intArrayOf()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V + E)$
* Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges in the graph.

---

## 4. Disjoint Set Union

::tabs-start

```python
class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        par = [i for i in range(len(edges) + 1)]
        rank = [1] * (len(edges) + 1)

        def find(n):
            p = par[n]
            while p != par[p]:
                par[p] = par[par[p]]
                p = par[p]
            return p

        def union(n1, n2):
            p1, p2 = find(n1), find(n2)

            if p1 == p2:
                return False
            if rank[p1] > rank[p2]:
                par[p2] = p1
                rank[p1] += rank[p2]
            else:
                par[p1] = p2
                rank[p2] += rank[p1]
            return True

        for n1, n2 in edges:
            if not union(n1, n2):
                return [n1, n2]
```

```java
public class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int[] par = new int[edges.length + 1];
        int[] rank = new int[edges.length + 1];
        for (int i = 0; i < par.length; i++) {
            par[i] = i;
            rank[i] = 1;
        }

        for (int[] edge : edges) {
            if (!union(par, rank, edge[0], edge[1]))
                return new int[]{edge[0], edge[1]};
        }
        return new int[0];
    }

    private int find(int[] par, int n) {
        int p = par[n];
        while (p != par[p]) {
            par[p] = par[par[p]];
            p = par[p];
        }
        return p;
    }

    private boolean union(int[] par, int[] rank, int n1, int n2) {
        int p1 = find(par, n1);
        int p2 = find(par, n2);

        if (p1 == p2)
            return false;
        if (rank[p1] > rank[p2]) {
            par[p2] = p1;
            rank[p1] += rank[p2];
        } else {
            par[p1] = p2;
            rank[p2] += rank[p1];
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> par(n + 1), rank(n + 1, 1);
        for (int i = 0; i <= n; ++i)
            par[i] = i;

        for (const auto& edge : edges) {
            if (!Union(par, rank, edge[0], edge[1]))
                return vector<int>{ edge[0], edge[1] };
        }
        return {};
    }

private:
    int Find(vector<int>& par, int n) {
        int p = par[n];
        while (p != par[p]) {
            par[p] = par[par[p]];
            p = par[p];
        }
        return p;
    }

    bool Union(vector<int>& par, vector<int>& rank, int n1, int n2) {
        int p1 = Find(par, n1);
        int p2 = Find(par, n2);

        if (p1 == p2)
            return false;
        if (rank[p1] > rank[p2]) {
            par[p2] = p1;
            rank[p1] += rank[p2];
        } else {
            par[p1] = p2;
            rank[p2] += rank[p1];
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} edges
     * @return {number[]}
     */
    findRedundantConnection(edges) {
        const par = new Array(edges.length + 1).fill(0).map((_, i) => i);
        const rank = new Array(edges.length + 1).fill(1);

        /**
         * @param {number} n
         * @return {number}
         */
        function find(n) {
            let p = par[n];
            while (p !== par[p]) {
                par[p] = par[par[p]];
                p = par[p];
            }
            return p;
        }

        /**
         * @param {number} n1
         * @param {number} n2
         * @return {boolean}
         */
        function union(n1, n2) {
            const p1 = find(n1);
            const p2 = find(n2);

            if (p1 === p2) {
                return false;
            }
            if (rank[p1] > rank[p2]) {
                par[p2] = p1;
                rank[p1] += rank[p2];
            } else {
                par[p1] = p2;
                rank[p2] += rank[p1];
            }
            return true;
        }

        for (const [n1, n2] of edges) {
            if (!union(n1, n2)) {
                return [n1, n2];
            }
        }
        return [];
    }
}
```

```csharp
public class Solution {
    
    public int[] FindRedundantConnection(int[][] edges) {
        int[] par = new int[edges.Length + 1];
        int[] rank = new int[edges.Length + 1];
        for (int i = 0; i < par.Length; i++) {
            par[i] = i;
            rank[i] = 1;
        }

        foreach (var edge in edges) {
            if (!Union(par, rank, edge[0], edge[1]))
                return new int[]{ edge[0], edge[1] };
        }
        return new int[0];
    }

    private int Find(int[] par, int n) {
        int p = par[n];
        while (p != par[p]) {
            par[p] = par[par[p]];
            p = par[p];
        }
        return p;
    }

    private bool Union(int[] par, int[] rank, int n1, int n2) {
        int p1 = Find(par, n1);
        int p2 = Find(par, n2);

        if (p1 == p2)
            return false;
        if (rank[p1] > rank[p2]) {
            par[p2] = p1;
            rank[p1] += rank[p2];
        } else {
            par[p1] = p2;
            rank[p2] += rank[p1];
        }
        return true;
    }
}
```

```go
func findRedundantConnection(edges [][]int) []int {
    n := len(edges)
    par := make([]int, n+1)
    rank := make([]int, n+1)
    
    for i := 0; i <= n; i++ {
        par[i] = i
        rank[i] = 1
    }

    var find func(int) int
    find = func(x int) int {
        if par[x] != x {
            par[x] = find(par[x])
        }
        return par[x]
    }

    union := func(x, y int) bool {
        rootX, rootY := find(x), find(y)
        if rootX == rootY {
            return false
        }
        if rank[rootX] > rank[rootY] {
            par[rootY] = rootX
            rank[rootX] += rank[rootY]
        } else {
            par[rootX] = rootY
            rank[rootY] += rank[rootX]
        }
        return true
    }

    for _, edge := range edges {
        if !union(edge[0], edge[1]) {
            return edge
        }
    }
    return []int{}
}
```

```kotlin
class Solution {
    fun findRedundantConnection(edges: Array<IntArray>): IntArray {
        val n = edges.size
        val par = IntArray(n + 1) { it }
        val rank = IntArray(n + 1) { 1 }

        fun find(x: Int): Int {
            if (par[x] != x) {
                par[x] = find(par[x])
            }
            return par[x]
        }

        fun union(x: Int, y: Int): Boolean {
            val rootX = find(x)
            val rootY = find(y)
            if (rootX == rootY) {
                return false
            }
            if (rank[rootX] > rank[rootY]) {
                par[rootY] = rootX
                rank[rootX] += rank[rootY]
            } else {
                par[rootX] = rootY
                rank[rootY] += rank[rootX]
            }
            return true
        }

        for ((u, v) in edges) {
            if (!union(u, v)) {
                return intArrayOf(u, v)
            }
        }
        return intArrayOf()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V + (E * α(V)))$
* Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges in the graph. $α()$ is used for amortized complexity.