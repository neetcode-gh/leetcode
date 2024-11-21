## 1. Depth First Search

::tabs-start

```python
class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        adj = [[] for _ in range(n)]
        visit = [False] * n
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        def dfs(node):
            for nei in adj[node]:
                if not visit[nei]:
                    visit[nei] = True
                    dfs(nei)
        
        res = 0
        for node in range(n):
            if not visit[node]:
                visit[node] = True
                dfs(node)
                res += 1
        return res
```

```java
public class Solution {
    public int countComponents(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        boolean[] visit = new boolean[n];
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        int res = 0;
        for (int node = 0; node < n; node++) {
            if (!visit[node]) {
                dfs(adj, visit, node);
                res++;
            }
        }
        return res;
    }

    private void dfs(List<List<Integer>> adj, boolean[] visit, int node) {
        visit[node] = true;
        for (int nei : adj.get(node)) {
            if (!visit[nei]) {
                dfs(adj, visit, nei);
            }
        }
    }
}
```

```cpp
class Solution {
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        vector<bool> visit(n, false);
        for (const auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        int res = 0;
        for (int node = 0; node < n; ++node) {
            if (!visit[node]) {
                dfs(adj, visit, node);
                res++;
            }
        }
        return res;
    }

private:
    void dfs(const vector<vector<int>>& adj, vector<bool>& visit, int node) {
        visit[node] = true;
        for (int nei : adj[node]) {
            if (!visit[nei]) {
                dfs(adj, visit, nei);
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @returns {number}
     */
    countComponents(n, edges) {
        const adj = Array.from({ length: n }, () => []);
        const visit = Array(n).fill(false);

        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        const dfs = (node) => {
            for (const nei of adj[node]) {
                if (!visit[nei]) {
                    visit[nei] = true;
                    dfs(nei);
                }
            }
        };

        let res = 0;
        for (let node = 0; node < n; node++) {
            if (!visit[node]) {
                visit[node] = true;
                dfs(node);
                res++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CountComponents(int n, int[][] edges) {
        List<List<int>> adj = new List<List<int>>();
        bool[] visit = new bool[n];
        for (int i = 0; i < n; i++) {
            adj.Add(new List<int>());
        }
        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        int res = 0;
        for (int node = 0; node < n; node++) {
            if (!visit[node]) {
                Dfs(adj, visit, node);
                res++;
            }
        }
        return res;
    }

    private void Dfs(List<List<int>> adj, bool[] visit, int node) {
        visit[node] = true;
        foreach (var nei in adj[node]) {
            if (!visit[nei]) {
                Dfs(adj, visit, nei);
            }
        }
    }
}
```

```go
func countComponents(n int, edges [][]int) int {
    adj := make([][]int, n)
	visit := make([]bool, n)
	for _, edge := range edges {
		u, v := edge[0], edge[1]
		adj[u] = append(adj[u], v)
		adj[v] = append(adj[v], u)
	}

	var dfs func(int)
	dfs = func(node int) {
		for _, nei := range adj[node] {
			if !visit[nei] {
				visit[nei] = true
				dfs(nei)
			}
		}
	}

	res := 0
	for node := 0; node < n; node++ {
		if !visit[node] {
			visit[node] = true
			dfs(node)
			res++
		}
	}
	return res
}
```

```kotlin
class Solution {
    fun countComponents(n: Int, edges: Array<IntArray>): Int {
        val adj = Array(n) { mutableListOf<Int>() }
        val visit = BooleanArray(n)
        for ((u, v) in edges) {
            adj[u].add(v)
            adj[v].add(u)
        }

        fun dfs(node: Int) {
            for (nei in adj[node]) {
                if (!visit[nei]) {
                    visit[nei] = true
                    dfs(nei)
                }
            }
        }

        var res = 0
        for (node in 0 until n) {
            if (!visit[node]) {
                visit[node] = true
                dfs(node)
                res++
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V + E)$
* Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges in the graph.

---

## 2. Breadth First Search

::tabs-start

```python
class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        adj = [[] for _ in range(n)]
        visit = [False] * n
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        def bfs(node):
            q = deque([node])
            visit[node] = True
            while q:
                cur = q.popleft()
                for nei in adj[cur]:
                    if not visit[nei]:
                        visit[nei] = True
                        q.append(nei)
        
        res = 0
        for node in range(n):
            if not visit[node]:
                bfs(node)
                res += 1
        return res
```

```java
public class Solution {
    public int countComponents(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        boolean[] visit = new boolean[n];
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        int res = 0;
        for (int node = 0; node < n; node++) {
            if (!visit[node]) {
                bfs(adj, visit, node);
                res++;
            }
        }
        return res;
    }

    private void bfs(List<List<Integer>> adj, boolean[] visit, int node) {
        Queue<Integer> q = new LinkedList<>();
        q.offer(node);
        visit[node] = true;
        while (!q.isEmpty()) {
            int cur = q.poll();
            for (int nei : adj.get(cur)) {
                if (!visit[nei]) {
                    visit[nei] = true;
                    q.offer(nei);
                }
            }
        }
    }
}
```

```cpp
class Solution {
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        vector<bool> visit(n, false);
        for (const auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        int res = 0;
        for (int node = 0; node < n; ++node) {
            if (!visit[node]) {
                bfs(adj, visit, node);
                res++;
            }
        }
        return res;
    }

private:
    void bfs(vector<vector<int>>& adj, vector<bool>& visit, int node) {
        queue<int> q;
        q.push(node);
        visit[node] = true;
        while (!q.empty()) {
            int cur = q.front();
            q.pop();
            for (int nei : adj[cur]) {
                if (!visit[nei]) {
                    visit[nei] = true;
                    q.push(nei);
                }
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @returns {number}
     */
    countComponents(n, edges) {
        const adj = Array.from({ length: n }, () => []);
        const visit = Array(n).fill(false);

        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        const bfs = (node) => {
            const q = new Queue([node]);
            visit[node] = true;
            while (!q.isEmpty()) {
                const cur = q.pop();
                for (const nei of adj[cur]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        q.push(nei);
                    }
                }
            }
        };

        let res = 0;
        for (let node = 0; node < n; node++) {
            if (!visit[node]) {
                bfs(node);
                res++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CountComponents(int n, int[][] edges) {
        List<List<int>> adj = new List<List<int>>();
        bool[] visit = new bool[n];
        for (int i = 0; i < n; i++) {
            adj.Add(new List<int>());
        }
        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        int res = 0;
        for (int node = 0; node < n; node++) {
            if (!visit[node]) {
                Bfs(adj, visit, node);
                res++;
            }
        }
        return res;
    }

    private void Bfs(List<List<int>> adj, bool[] visit, int node) {
        Queue<int> q = new Queue<int>();
        q.Enqueue(node);
        visit[node] = true;
        while (q.Count > 0) {
            int cur = q.Dequeue();
            foreach (var nei in adj[cur]) {
                if (!visit[nei]) {
                    visit[nei] = true;
                    q.Enqueue(nei);
                }
            }
        }
    }
}
```

```go
func countComponents(n int, edges [][]int) int {
    adj := make([][]int, n)
	visit := make([]bool, n)
	for _, edge := range edges {
		u, v := edge[0], edge[1]
		adj[u] = append(adj[u], v)
		adj[v] = append(adj[v], u)
	}

	bfs := func(node int) {
		q := []int{node}
		visit[node] = true
		for len(q) > 0 {
			cur := q[0]
			q = q[1:] 
			for _, nei := range adj[cur] {
				if !visit[nei] {
					visit[nei] = true
					q = append(q, nei) 
				}
			}
		}
	}

	res := 0
	for node := 0; node < n; node++ {
		if !visit[node] {
			bfs(node)
			res++
		}
	}
	return res
}
```

```kotlin
class Solution {
    fun countComponents(n: Int, edges: Array<IntArray>): Int {
        val adj = Array(n) { mutableListOf<Int>() }
        val visit = BooleanArray(n)
        for ((u, v) in edges) {
            adj[u].add(v)
            adj[v].add(u)
        }

        fun bfs(node: Int) {
            val q: Queue<Int> = LinkedList()
            q.offer(node)
            visit[node] = true
            while (q.isNotEmpty()) {
                val cur = q.poll()
                for (nei in adj[cur]) {
                    if (!visit[nei]) {
                        visit[nei] = true
                        q.offer(nei)
                    }
                }
            }
        }

        var res = 0
        for (node in 0 until n) {
            if (!visit[node]) {
                bfs(node)
                res++
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V + E)$
* Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges in the graph.

---

## 3. Disjoint Set Union (Rank | Size)

::tabs-start

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n

    def find(self, node):
        cur = node
        while cur != self.parent[cur]:
            self.parent[cur] = self.parent[self.parent[cur]]
            cur = self.parent[cur]
        return cur

    def union(self, u, v):
        pu = self.find(u)
        pv = self.find(v)
        if pu == pv:
            return False
        if self.rank[pv] > self.rank[pu]:
            pu, pv = pv, pu
        self.parent[pv] = pu
        self.rank[pu] += self.rank[pv]
        return True

class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        dsu = DSU(n)
        res = n
        for u, v in edges:
            if dsu.union(u, v):
                res -= 1
        return res
```

```java
public class DSU {
    int[] parent;
    int[] rank;

    public DSU(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 1;
        }
    }

    public int find(int node) {
        int cur = node;
        while (cur != parent[cur]) {
            parent[cur] = parent[parent[cur]];
            cur = parent[cur];
        }
        return cur;
    }

    public boolean union(int u, int v) {
        int pu = find(u);
        int pv = find(v);
        if (pu == pv) {
            return false;
        }
        if (rank[pv] > rank[pu]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        parent[pv] = pu;
        rank[pu] += rank[pv];
        return true;
    }
}

public class Solution {
    public int countComponents(int n, int[][] edges) {
        DSU dsu = new DSU(n);
        int res = n;
        for (int[] edge : edges) {
            if (dsu.union(edge[0], edge[1])) {
                res--;
            }
        }
        return res;
    }
}
```

```cpp
class DSU {
public:
    vector<int> parent;
    vector<int> rank;

    DSU(int n) {
        parent.resize(n);
        rank.resize(n, 1);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    int find(int node) {
        int cur = node;
        while (cur != parent[cur]) {
            parent[cur] = parent[parent[cur]];
            cur = parent[cur];
        }
        return cur;
    }

    bool unionSets(int u, int v) {
        int pu = find(u);
        int pv = find(v);
        if (pu == pv) {
            return false;
        }
        if (rank[pv] > rank[pu]) {
            swap(pu, pv);
        }
        parent[pv] = pu;
        rank[pu] += rank[pv];
        return true;
    }
};

class Solution {
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        DSU dsu(n);
        int res = n;
        for (auto& edge : edges) {
            if (dsu.unionSets(edge[0], edge[1])) {
                res--;
            }
        }
        return res;
    }
};
```

```javascript
class DSU {
    /**
     * @param {number} n
     */
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(1);
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node) {
        let cur = node;
        while (cur !== this.parent[cur]) {
            this.parent[cur] = this.parent[this.parent[cur]];
            cur = this.parent[cur];
        }
        return cur;
    }

    /**
     * @param {number} u
     * @param {number} v
     * @return {boolean}
     */
    union(u, v) {
        let pu = this.find(u);
        let pv = this.find(v);
        if (pu === pv) {
            return false;
        }
        if (this.rank[pv] > this.rank[pu]) {
            [pu, pv] = [pv, pu];
        }
        this.parent[pv] = pu;
        this.rank[pu] += this.rank[pv];
        return true;
    }
}

class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @returns {number}
     */
    countComponents(n, edges) {
        const dsu = new DSU(n);
        let res = n;
        for (const [u, v] of edges) {
            if (dsu.union(u, v)) {
                res--;
            }
        }
        return res;
    }
}
```

```csharp
public class DSU {
    private int[] parent;
    private int[] rank;

    public DSU(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 1;
        }
    }

    public int Find(int node) {
        int cur = node;
        while (cur != parent[cur]) {
            parent[cur] = parent[parent[cur]];
            cur = parent[cur];
        }
        return cur;
    }

    public bool Union(int u, int v) {
        int pu = Find(u);
        int pv = Find(v);
        if (pu == pv) {
            return false;
        }
        if (rank[pv] > rank[pu]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        parent[pv] = pu;
        rank[pu] += rank[pv];
        return true;
    }
}

public class Solution {
    public int CountComponents(int n, int[][] edges) {
        DSU dsu = new DSU(n);
        int res = n;
        foreach (var edge in edges) {
            if (dsu.Union(edge[0], edge[1])) {
                res--;
            }
        }
        return res;
    }
}
```

```go
type DSU struct {
    parent []int
    rank   []int
}

func NewDSU(n int) *DSU {
    dsu := &DSU{
        parent: make([]int, n),
        rank:   make([]int, n),
    }
    for i := 0; i < n; i++ {
        dsu.parent[i] = i
        dsu.rank[i] = 1
    }
    return dsu
}

func (dsu *DSU) Find(node int) int {
    cur := node
    for cur != dsu.parent[cur] {
        dsu.parent[cur] = dsu.parent[dsu.parent[cur]]
        cur = dsu.parent[cur]
    }
    return cur
}

func (dsu *DSU) Union(u, v int) bool {
    pu := dsu.Find(u)
    pv := dsu.Find(v)
    if pu == pv {
        return false
    }
    if dsu.rank[pv] > dsu.rank[pu] {
        pu, pv = pv, pu
    }
    dsu.parent[pv] = pu
    dsu.rank[pu] += dsu.rank[pv]
    return true
}

func countComponents(n int, edges [][]int) int {
    dsu := NewDSU(n)
    res := n
    for _, edge := range edges {
        u, v := edge[0], edge[1]
        if dsu.Union(u, v) {
            res--
        }
    }
    return res
}
```

```kotlin
class DSU(n: Int) {
    val parent = IntArray(n) { it }
    val rank = IntArray(n) { 1 }

    fun find(node: Int): Int {
        var cur = node
        while (cur != parent[cur]) {
            parent[cur] = parent[parent[cur]]
            cur = parent[cur]
        }
        return cur
    }

    fun union(u: Int, v: Int): Boolean {
        val pu = find(u)
        val pv = find(v)
        if (pu == pv) {
            return false
        }
        if (rank[pv] > rank[pu]) {
            parent[pu] = pv
        } else {
            parent[pv] = pu
            rank[pu] += rank[pv]
        }
        return true
    }
}

class Solution {
    fun countComponents(n: Int, edges: Array<IntArray>): Int {
        val dsu = DSU(n)
        var res = n
        for (edge in edges) {
            val (u, v) = edge
            if (dsu.union(u, v)) {
                res--
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V + (E * α(V)))$
* Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges in the graph. $α()$ is used for amortized complexity.