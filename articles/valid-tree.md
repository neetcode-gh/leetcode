## 1. Cycle Detection (DFS)

::tabs-start

```python
class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        if len(edges) > (n - 1):
            return False
        
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        
        visit = set()
        def dfs(node, par):
            if node in visit:
                return False
            
            visit.add(node)
            for nei in adj[node]:
                if nei == par:
                    continue
                if not dfs(nei, node):
                    return False
            return True
        
        return dfs(0, -1) and len(visit) == n
```

```java
public class Solution {
    public boolean validTree(int n, int[][] edges) {
        if (edges.length > n - 1) {
            return false;
        }

        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        Set<Integer> visit = new HashSet<>();
        if (!dfs(0, -1, visit, adj)) {
            return false;
        }
        
        return visit.size() == n;
    }

    private boolean dfs(int node, int parent, Set<Integer> visit, 
                        List<List<Integer>> adj) {
        if (visit.contains(node)) {
            return false;
        }
        
        visit.add(node);
        for (int nei : adj.get(node)) {
            if (nei == parent) {
                continue;
            }
            if (!dfs(nei, node, visit, adj)) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        if (edges.size() > n - 1) {
            return false;
        }

        vector<vector<int>> adj(n);
        for (const auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        unordered_set<int> visit;
        if (!dfs(0, -1, visit, adj)) {
            return false;
        }

        return visit.size() == n;
    }

private:
    bool dfs(int node, int parent, unordered_set<int>& visit, 
             vector<vector<int>>& adj) {
        if (visit.count(node)) {
            return false;
        }

        visit.insert(node);
        for (int nei : adj[node]) {
            if (nei == parent) {
                continue;
            }
            if (!dfs(nei, node, visit, adj)) {
                return false;
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @returns {boolean}
     */
    validTree(n, edges) {
        if (edges.length > n - 1) {
            return false;
        }

        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        const visit = new Set();
        const dfs = (node, parent) => {
            if (visit.has(node)) {
                return false;
            }

            visit.add(node);
            for (const nei of adj[node]) {
                if (nei === parent) {
                    continue;
                }
                if (!dfs(nei, node)) {
                    return false;
                }
            }
            return true;
        };

        return dfs(0, -1) && visit.size === n;
    }
}
```

```csharp
public class Solution {
    public bool ValidTree(int n, int[][] edges) {
        if (edges.Length > n - 1) {
            return false;
        }

        List<List<int>> adj = new List<List<int>>();
        for (int i = 0; i < n; i++) {
            adj.Add(new List<int>());
        }

        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        HashSet<int> visit = new HashSet<int>();
        if (!Dfs(0, -1, visit, adj)) {
            return false;
        }

        return visit.Count == n;
    }

    private bool Dfs(int node, int parent, HashSet<int> visit, 
                     List<List<int>> adj) {
        if (visit.Contains(node)) {
            return false;
        }

        visit.Add(node);
        foreach (var nei in adj[node]) {
            if (nei == parent) {
                continue;
            }
            if (!Dfs(nei, node, visit, adj)) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func validTree(n int, edges [][]int) bool {
    if len(edges) > n-1 {
		return false
	}
	
	adj := make([][]int, n)
	for _, edge := range edges {
		u, v := edge[0], edge[1]
		adj[u] = append(adj[u], v)
		adj[v] = append(adj[v], u)
	}

	visit := make(map[int]bool)
	var dfs func(node, parent int) bool
	dfs = func(node, parent int) bool {
		if visit[node] {
			return false
		}
		visit[node] = true
		for _, nei := range adj[node] {
			if nei == parent {
				continue
			}
			if !dfs(nei, node) {
				return false
			}
		}
		return true
	}

	return dfs(0, -1) && len(visit) == n
}
```

```kotlin
class Solution {
    fun validTree(n: Int, edges: Array<IntArray>): Boolean {
        if (edges.size > n - 1) return false
        
        val adj = Array(n) { mutableListOf<Int>() }
        for ((u, v) in edges) {
            adj[u].add(v)
            adj[v].add(u)
        }
        
        val visit = HashSet<Int>()
        
        fun dfs(node: Int, parent: Int): Boolean {
            if (node in visit) return false
            visit.add(node)
            for (nei in adj[node]) {
                if (nei == parent) continue
                if (!dfs(nei, node)) return false
            }
            return true
        }
        
        return dfs(0, -1) && visit.size == n
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V + E)$
* Space complexity: $O(V + E)$

> Where $V$ is the number vertices and $E$ is the number of edges in the graph.

---

## 2. Breadth First Search

::tabs-start

```python
class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        if len(edges) > n - 1:
            return False
        
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        
        visit = set()
        q = deque([(0, -1)])  # (current node, parent node)
        visit.add(0)
        
        while q:
            node, parent = q.popleft()
            for nei in adj[node]:
                if nei == parent:
                    continue
                if nei in visit:
                    return False
                visit.add(nei)
                q.append((nei, node))
        
        return len(visit) == n
```

```java
public class Solution {
    public boolean validTree(int n, int[][] edges) {
        if (edges.length > n - 1) {
            return false;
        }

        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        Set<Integer> visit = new HashSet<>();
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{0, -1});  // {current node, parent node}
        visit.add(0);

        while (!q.isEmpty()) {
            int[] pair = q.poll();
            int node = pair[0], parent = pair[1];
            for (int nei : adj.get(node)) {
                if (nei == parent) {
                    continue;
                }
                if (visit.contains(nei)) {
                    return false;
                }
                visit.add(nei);
                q.offer(new int[]{nei, node});
            }
        }

        return visit.size() == n;
    }
}
```

```cpp
class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        if (edges.size() > n - 1) {
            return false;
        }

        vector<vector<int>> adj(n);
        for (const auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        unordered_set<int> visit;
        queue<pair<int, int>> q;
        q.push({0, -1});  // {current node, parent node}
        visit.insert(0);

        while (!q.empty()) {
            auto [node, parent] = q.front();
            q.pop();
            for (int nei : adj[node]) {
                if (nei == parent) {
                    continue;
                }
                if (visit.count(nei)) {
                    return false;
                }
                visit.insert(nei);
                q.push({nei, node});
            }
        }

        return visit.size() == n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @returns {boolean}
     */
    validTree(n, edges) {
        if (edges.length > n - 1) {
            return false;
        }

        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        const visit = new Set();
        const q = new Queue([[0, -1]]);  // [current node, parent node]
        visit.add(0);

        while (!q.isEmpty()) {
            const [node, parent] = q.pop();
            for (const nei of adj[node]) {
                if (nei === parent) continue;
                if (visit.has(nei)) return false;
                visit.add(nei);
                q.push([nei, node]);
            }
        }

        return visit.size === n;
    }
}
```

```csharp
public class Solution {
    public bool ValidTree(int n, int[][] edges) {
        if (edges.Length > n - 1) {
            return false;
        }

        List<List<int>> adj = new List<List<int>>();
        for (int i = 0; i < n; i++) {
            adj.Add(new List<int>());
        }

        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        HashSet<int> visit = new HashSet<int>();
        Queue<(int, int)> q = new Queue<(int, int)>();
        q.Enqueue((0, -1));  // (current node, parent node)
        visit.Add(0);

        while (q.Count > 0) {
            var (node, parent) = q.Dequeue();
            foreach (var nei in adj[node]) {
                if (nei == parent) {
                    continue;
                }
                if (visit.Contains(nei)) {
                    return false;
                }
                visit.Add(nei);
                q.Enqueue((nei, node));
            }
        }

        return visit.Count == n;
    }
}
```

```go
func validTree(n int, edges [][]int) bool {
    if len(edges) > n-1 {
		return false
	}

	adj := make([][]int, n)
	for _, edge := range edges {
		u, v := edge[0], edge[1]
		adj[u] = append(adj[u], v)
		adj[v] = append(adj[v], u)
	}

	visit := make(map[int]bool)
	q := [][2]int{{0, -1}} // (current node, parent node)
	visit[0] = true

	for len(q) > 0 {
		node, parent := q[0][0], q[0][1]
		q = q[1:]

		for _, nei := range adj[node] {
			if nei == parent {
				continue
			}
			if visit[nei] {
				return false
			}
			visit[nei] = true
			q = append(q, [2]int{nei, node})
		}
	}

	return len(visit) == n
}
```

```kotlin
class Solution {
    fun validTree(n: Int, edges: Array<IntArray>): Boolean {
        if (edges.size > n - 1) return false

        val adj = Array(n) { mutableListOf<Int>() }
        for ((u, v) in edges) {
            adj[u].add(v)
            adj[v].add(u)
        }

        val visit = mutableSetOf<Int>()
        val q: Queue<Pair<Int, Int>> = LinkedList()  // Queue of (node, parent)
        q.offer(0 to -1)
        visit.add(0)

        while (q.isNotEmpty()) {
            val (node, parent) = q.poll()

            for (nei in adj[node]) {
                if (nei == parent) continue
                if (nei in visit) return false
                visit.add(nei)
                q.offer(nei to node)
            }
        }

        return visit.size == n
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V + E)$
* Space complexity: $O(V + E)$

> Where $V$ is the number vertices and $E$ is the number of edges in the graph.

---

## 3. Disjoint Set Union

::tabs-start

```python
class DSU:
    def __init__(self, n):
        self.comps = n
        self.Parent = list(range(n + 1))
        self.Size = [1] * (n + 1)

    def find(self, node):
        if self.Parent[node] != node:
            self.Parent[node] = self.find(self.Parent[node])
        return self.Parent[node]

    def union(self, u, v):
        pu = self.find(u)
        pv = self.find(v)
        if pu == pv:
            return False

        self.comps -= 1
        if self.Size[pu] < self.Size[pv]:
            pu, pv = pv, pu
        self.Size[pu] += self.Size[pv]
        self.Parent[pv] = pu
        return True
    
    def components(self):
        return self.comps

class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        if len(edges) > n - 1:
            return False
        
        dsu = DSU(n)
        for u, v in edges:
            if not dsu.union(u, v):
                return False
        return dsu.components() == 1
```

```java
public class DSU {
    int[] Parent, Size;
    int comps;

    public DSU(int n) {
        comps = n;
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    public int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    public boolean union(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (Size[pu] < Size[pv]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        comps--;
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }

    public int components() {
        return comps;
    }
}

public class Solution {
    public boolean validTree(int n, int[][] edges) {
        if (edges.length > n - 1) {
            return false;
        }

        DSU dsu = new DSU(n);
        for (int[] edge : edges) {
            if (!dsu.union(edge[0], edge[1])) {
                return false;
            }
        }
        return dsu.components() == 1;
    }
}
```

```cpp
class DSU {
    vector<int> Parent, Size;
    int comps;
public:
    DSU(int n) {
        comps = n;
        Parent.resize(n + 1);
        Size.resize(n + 1);
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    bool unionNodes(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (Size[pu] < Size[pv]) {
            swap(pu, pv);
        }
        comps--;
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }

    int components() {
        return comps;
    }
};

class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        if (edges.size() > n - 1) {
            return false;
        }

        DSU dsu(n);
        for (auto& edge : edges) {
            if (!dsu.unionNodes(edge[0], edge[1])) {
                return false;
            }
        }
        return dsu.components() == 1;
    }
};
```

```javascript
class DSU {
    constructor(n) {
        this.comps = n;
        this.Parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.Size = Array(n + 1).fill(1);
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node) {
        if (this.Parent[node] !== node) {
            this.Parent[node] = this.find(this.Parent[node]);
        }
        return this.Parent[node];
    }

    /**
     * @param {number} u
     * @param {number} v
     * @return {boolean}
     */
    union(u, v) {
        let pu = this.find(u);
        let pv = this.find(v);
        if (pu === pv) return false;
        if (this.Size[pu] < this.Size[pv]) {
            [pu, pv] = [pv, pu];
        }
        this.comps--;
        this.Size[pu] += this.Size[pv];
        this.Parent[pv] = pu;
        return true;
    }

    /**
     * @return {number}
     */
    components() {
        return this.comps;
    }
}

class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @returns {boolean}
     */
    validTree(n, edges) {
        if (edges.length > n - 1) {
            return false;
        }

        const dsu = new DSU(n);
        for (const [u, v] of edges) {
            if (!dsu.union(u, v)) {
                return false;
            }
        }
        return dsu.components() === 1;
    }
}
```

```csharp
public class DSU {
    private int[] Parent, Size;
    private int comps;

    public DSU(int n) {
        comps = n;
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    public int Find(int node) {
        if (Parent[node] != node) {
            Parent[node] = Find(Parent[node]);
        }
        return Parent[node];
    }

    public bool Union(int u, int v) {
        int pu = Find(u), pv = Find(v);
        if (pu == pv) return false;
        if (Size[pu] < Size[pv]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        comps--;
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }

    public int Components() {
        return comps;
    }
}

public class Solution {
    public bool ValidTree(int n, int[][] edges) {
        if (edges.Length > n - 1) {
            return false;
        }

        DSU dsu = new DSU(n);
        foreach (var edge in edges) {
            if (!dsu.Union(edge[0], edge[1])) {
                return false;
            }
        }
        return dsu.Components() == 1;
    }
}
```

```go
type DSU struct {
	Parent []int
	Size   []int
	Comps  int
}

func NewDSU(n int) *DSU {
	parent := make([]int, n+1)
	size := make([]int, n+1)
	for i := 0; i <= n; i++ {
		parent[i] = i
		size[i] = 1
	}
	return &DSU{Parent: parent, Size: size, Comps: n}
}

func (dsu *DSU) Find(node int) int {
	if dsu.Parent[node] != node {
		dsu.Parent[node] = dsu.Find(dsu.Parent[node])
	}
	return dsu.Parent[node]
}

func (dsu *DSU) Union(u, v int) bool {
	pu, pv := dsu.Find(u), dsu.Find(v)
	if pu == pv {
		return false
	}
	dsu.Comps--
	if dsu.Size[pu] < dsu.Size[pv] {
		pu, pv = pv, pu
	}
	dsu.Size[pu] += dsu.Size[pv]
	dsu.Parent[pv] = pu
	return true
}

func (dsu *DSU) Components() int {
	return dsu.Comps
}

func validTree(n int, edges [][]int) bool {
    if len(edges) > n-1 {
		return false
	}
	dsu := NewDSU(n)
	for _, edge := range edges {
		if !dsu.Union(edge[0], edge[1]) {
			return false
		}
	}
	return dsu.Components() == 1
}
```

```kotlin
class DSU(n: Int) {
    private val parent = IntArray(n + 1) { it }
    private val size = IntArray(n + 1) { 1 }
    var comps = n
        private set

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

        comps--
        if (size[pu] < size[pv]) {
            parent[pu] = pv
            size[pv] += size[pu]
        } else {
            parent[pv] = pu
            size[pu] += size[pv]
        }
        return true
    }
}

class Solution {
    fun validTree(n: Int, edges: Array<IntArray>): Boolean {
        if (edges.size > n - 1) return false

        val dsu = DSU(n)
        for ((u, v) in edges) {
            if (!dsu.union(u, v)) return false
        }
        return dsu.comps == 1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V + (E * α(V)))$
* Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges in the graph. $α()$ is used for amortized complexity.