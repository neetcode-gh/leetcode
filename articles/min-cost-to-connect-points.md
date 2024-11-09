## 1. Kruskal's Algorithm

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
        pu = self.find(u)
        pv = self.find(v)
        if pu == pv:
            return False
        if self.Size[pu] < self.Size[pv]:
            pu, pv = pv, pu
        self.Size[pu] += self.Size[pv]
        self.Parent[pv] = pu
        return True

class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        n = len(points)
        dsu = DSU(n)
        edges = []
        for i in range(n):
            x1, y1 = points[i]
            for j in range(i + 1, n):
                x2, y2 = points[j]
                dist = abs(x1 - x2) + abs(y1 - y2)
                edges.append((dist, i, j))
        
        edges.sort()
        res = 0
        for dist, u, v in edges:
            if dsu.union(u, v):
                res += dist
        return res
```

```java
public class DSU {
    int[] Parent, Size;

    public DSU(int n) {
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) Parent[i] = i;
        Arrays.fill(Size, 1);
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
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }
}

public class Solution {
    public int minCostConnectPoints(int[][] points) {
        int n = points.length;
        DSU dsu = new DSU(n);
        List<int[]> edges = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int dist = Math.abs(points[i][0] - points[j][0]) + 
                           Math.abs(points[i][1] - points[j][1]);
                edges.add(new int[] {dist, i, j});
            }
        }
        
        edges.sort((a, b) -> Integer.compare(a[0], b[0]));
        int res = 0;

        for (int[] edge : edges) {
            if (dsu.union(edge[1], edge[2])) {
                res += edge[0];
            }
        }
        return res;
    }
}
```

```cpp
class DSU {
public:
    vector<int> Parent, Size;
    
    DSU(int n) : Parent(n + 1), Size(n + 1, 1) {
        for (int i = 0; i <= n; ++i) Parent[i] = i;
    }

    int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    bool unionSets(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (Size[pu] < Size[pv]) swap(pu, pv);
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }
};

class Solution {
public:
    int minCostConnectPoints(vector<vector<int>>& points) {
        int n = points.size();
        DSU dsu(n);
        vector<array<int, 3>> edges;

        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                int dist = abs(points[i][0] - points[j][0]) + 
                           abs(points[i][1] - points[j][1]);
                edges.push_back({dist, i, j});
            }
        }

        sort(edges.begin(), edges.end());
        int res = 0;

        for (auto& [dist, u, v] : edges) {
            if (dsu.unionSets(u, v)) {
                res += dist;
            }
        }
        return res;
    }
};
```

```javascript
class DSU {
    constructor(n) {
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
        let pu = this.find(u), pv = this.find(v);
        if (pu === pv) return false;
        if (this.Size[pu] < this.Size[pv]) [pu, pv] = [pv, pu];
        this.Size[pu] += this.Size[pv];
        this.Parent[pv] = pu;
        return true;
    }
}

class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    minCostConnectPoints(points) {
        const n = points.length;
        const dsu = new DSU(n);
        const edges = [];

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const dist = Math.abs(points[i][0] - points[j][0]) + 
                             Math.abs(points[i][1] - points[j][1]);
                edges.push([dist, i, j]);
            }
        }

        edges.sort((a, b) => a[0] - b[0]);
        let res = 0;

        for (const [dist, u, v] of edges) {
            if (dsu.union(u, v)) {
                res += dist;
            }
        }
        return res;
    }
}
```

```csharp
public class DSU {
    public int[] Parent, Size;
    
    public DSU(int n) {
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) Parent[i] = i;
        Array.Fill(Size, 1);
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
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }
}

public class Solution {
    public int MinCostConnectPoints(int[][] points) {
        int n = points.Length;
        DSU dsu = new DSU(n);
        List<(int, int, int)> edges = new List<(int, int, int)>();

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int dist = Math.Abs(points[i][0] - points[j][0]) + 
                           Math.Abs(points[i][1] - points[j][1]);
                edges.Add((dist, i, j));
            }
        }

        edges.Sort((a, b) => a.Item1.CompareTo(b.Item1));
        int res = 0;

        foreach (var edge in edges) {
            if (dsu.Union(edge.Item2, edge.Item3)) {
                res += edge.Item1;
            }
        }
        return res;
    }
}
```

```go
type DSU struct {
	Parent []int
	Size   []int
}

func NewDSU(n int) *DSU {
	parent := make([]int, n)
	size := make([]int, n)
	for i := range parent {
		parent[i] = i
		size[i] = 1
	}
	return &DSU{Parent: parent, Size: size}
}

func (dsu *DSU) find(node int) int {
	if dsu.Parent[node] != node {
		dsu.Parent[node] = dsu.find(dsu.Parent[node])
	}
	return dsu.Parent[node]
}

func (dsu *DSU) union(u, v int) bool {
	pu, pv := dsu.find(u), dsu.find(v)
	if pu == pv {
		return false
	}
	if dsu.Size[pu] < dsu.Size[pv] {
		pu, pv = pv, pu
	}
	dsu.Size[pu] += dsu.Size[pv]
	dsu.Parent[pv] = pu
	return true
}

func minCostConnectPoints(points [][]int) int {
	n := len(points)
	dsu := NewDSU(n)
	var edges [][]int
	for i := 0; i < n; i++ {
		x1, y1 := points[i][0], points[i][1]
		for j := i + 1; j < n; j++ {
			x2, y2 := points[j][0], points[j][1]
			dist := int(math.Abs(float64(x1-x2)) + math.Abs(float64(y1-y2)))
			edges = append(edges, []int{dist, i, j})
		}
	}

	sort.Slice(edges, func(a, b int) bool {
		return edges[a][0] < edges[b][0]
	})

	res := 0
	for _, edge := range edges {
		dist, u, v := edge[0], edge[1], edge[2]
		if dsu.union(u, v) {
			res += dist
		}
	}
	return res
}
```

```kotlin
class DSU(n: Int) {
    private val parent = IntArray(n) { it }
    private val size = IntArray(n) { 1 }

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
    fun minCostConnectPoints(points: Array<IntArray>): Int {
        val n = points.size
        val dsu = DSU(n)
        val edges = mutableListOf<Triple<Int, Int, Int>>()

        for (i in 0 until n) {
            val (x1, y1) = points[i]
            for (j in i + 1 until n) {
                val (x2, y2) = points[j]
                val dist = abs(x1 - x2) + abs(y1 - y2)
                edges.add(Triple(dist, i, j))
            }
        }

        edges.sortBy { it.first }
        var res = 0
        for ((dist, u, v) in edges) {
            if (dsu.union(u, v)) {
                res += dist
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 \log n)$
* Space complexity: $O(n ^ 2)$

---

## 2. Prim's Algorithm

::tabs-start

```python
class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        N = len(points)
        adj = {i: [] for i in range(N)}
        for i in range(N):
            x1, y1 = points[i]
            for j in range(i + 1, N):
                x2, y2 = points[j]
                dist = abs(x1 - x2) + abs(y1 - y2)
                adj[i].append([dist, j])
                adj[j].append([dist, i])

        res = 0
        visit = set()
        minH = [[0, 0]]
        while len(visit) < N:
            cost, i = heapq.heappop(minH)
            if i in visit:
                continue
            res += cost
            visit.add(i)
            for neiCost, nei in adj[i]:
                if nei not in visit:
                    heapq.heappush(minH, [neiCost, nei])
        return res
```

```java
public class Solution {
    public int minCostConnectPoints(int[][] points) {
        int N = points.length;
        Map<Integer, List<int[]>> adj = new HashMap<>();
        for (int i = 0; i < N; i++) {
            int x1 = points[i][0];
            int y1 = points[i][1];
            for (int j = i + 1; j < N; j++) {
                int x2 = points[j][0];
                int y2 = points[j][1];
                int dist = Math.abs(x1 - x2) + Math.abs(y1 - y2);
                adj.computeIfAbsent(i, k -> new ArrayList<>()).add(new int[]{dist, j});
                adj.computeIfAbsent(j, k -> new ArrayList<>()).add(new int[]{dist, i});
            }
        }

        int res = 0;
        Set<Integer> visit = new HashSet<>();
        PriorityQueue<int[]> minH = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        minH.offer(new int[]{0, 0});
        while (visit.size() < N) {
            int[] curr = minH.poll();
            int cost = curr[0];
            int i = curr[1];
            if (visit.contains(i)) {
                continue;
            }
            res += cost;
            visit.add(i);
            for (int[] nei : adj.getOrDefault(i, Collections.emptyList())) {
                int neiCost = nei[0];
                int neiIndex = nei[1];
                if (!visit.contains(neiIndex)) {
                    minH.offer(new int[]{neiCost, neiIndex});
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
    int minCostConnectPoints(vector<vector<int>>& points) {
        int N = points.size();
        unordered_map<int, vector<pair<int, int>>> adj;
        for (int i = 0; i < N; i++) {
            int x1 = points[i][0];
            int y1 = points[i][1];
            for (int j = i + 1; j < N; j++) {
                int x2 = points[j][0];
                int y2 = points[j][1];
                int dist = abs(x1 - x2) + abs(y1 - y2);
                adj[i].push_back({dist, j});
                adj[j].push_back({dist, i});
            }
        }

        int res = 0;
        unordered_set<int> visit;
        priority_queue<pair<int, int>, vector<pair<int, int>>, 
                                greater<pair<int, int>>> minH;
        minH.push({0, 0});
        while (visit.size() < N) {
            auto curr = minH.top();
            minH.pop();
            int cost = curr.first;
            int i = curr.second;
            if (visit.count(i)) {
                continue;
            }
            res += cost;
            visit.insert(i);
            for (const auto& nei : adj[i]) {
                int neiCost = nei.first;
                int neiIndex = nei.second;
                if (!visit.count(neiIndex)) {
                    minH.push({neiCost, neiIndex});
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
     * @param {number[][]} points
     * @return {number}
     */
    minCostConnectPoints(points) {
        const N = points.length;
        const adj = new Map();
        for (let i = 0; i < N; i++) {
            adj.set(i, []);
        }

        for (let i = 0; i < N; i++) {
            const [x1, y1] = points[i];
            for (let j = i + 1; j < N; j++) {
                const [x2, y2] = points[j];
                const dist = Math.abs(x1 - x2) + Math.abs(y1 - y2);
                adj.get(i).push([dist, j]);
                adj.get(j).push([dist, i]);
            }
        }

        let res = 0;
        const visit = new Set();
        const minHeap = new MinPriorityQueue(entry => entry[0]);
        minHeap.push([0, 0]);

        while (visit.size < N) {
            const [cost, i] = minHeap.pop();
            if (visit.has(i)) continue;
            res += cost;
            visit.add(i);
            for (const [neiCost, nei] of adj.get(i)) {
                if (!visit.has(nei)) {
                    minHeap.push([neiCost, nei]);
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinCostConnectPoints(int[][] points) {
        int N = points.Length;
        var adj = new Dictionary<int, List<int[]>>();
        for (int i = 0; i < N; i++) {
            int x1 = points[i][0];
            int y1 = points[i][1];
            for (int j = i + 1; j < N; j++) {
                int x2 = points[j][0];
                int y2 = points[j][1];
                int dist = Math.Abs(x1 - x2) + Math.Abs(y1 - y2);
                if (!adj.ContainsKey(i))
                    adj[i] = new List<int[]>();
                adj[i].Add(new int[] { j, dist });

                if (!adj.ContainsKey(j))
                    adj[j] = new List<int[]>();
                adj[j].Add(new int[] { i, dist });
            }
        }

        int res = 0;
        var visit = new HashSet<int>();
        var pq = new PriorityQueue<int, int>(); 
        pq.Enqueue(0, 0); 

        while (visit.Count < N && pq.Count > 0) {
            if (pq.TryPeek(out int i, out int cost)) {
                pq.Dequeue();

                if (visit.Contains(i)) {
                    continue;
                }

                res += cost;
                visit.Add(i);

                if (adj.ContainsKey(i)) {
                    foreach (var edge in adj[i]) {
                        var nei = edge[0];
                        var neiCost = edge[1];
                        if (!visit.Contains(nei)) {
                            pq.Enqueue(nei, neiCost);
                        }
                    }
                }
            }
        }
        return visit.Count == N ? res : -1;
    }
}
```

```go
func minCostConnectPoints(points [][]int) int {
	n := len(points)
	adj := make(map[int][][]int)
	for i := 0; i < n; i++ {
		x1, y1 := points[i][0], points[i][1]
		for j := i + 1; j < n; j++ {
			x2, y2 := points[j][0], points[j][1]
			dist := int(math.Abs(float64(x1-x2)) + math.Abs(float64(y1-y2)))
			adj[i] = append(adj[i], []int{dist, j})
			adj[j] = append(adj[j], []int{dist, i})
		}
	}

	res := 0
	visit := make(map[int]bool)
	pq := priorityqueue.NewWith(func(a, b interface{}) int {
		return utils.IntComparator(a.([]int)[0], b.([]int)[0])
	})
	pq.Enqueue([]int{0, 0})

	for len(visit) < n {
		item, ok := pq.Dequeue()
		if !ok {
			continue
		}
		cost, point := item.([]int)[0], item.([]int)[1]
		if visit[point] {
			continue
		}
		res += cost
		visit[point] = true

		for _, edge := range adj[point] {
			neiCost, neiPoint := edge[0], edge[1]
			if !visit[neiPoint] {
				pq.Enqueue([]int{neiCost, neiPoint})
			}
		}
	}
	return res
}
```

```kotlin

class Solution {
    fun minCostConnectPoints(points: Array<IntArray>): Int {
        val n = points.size
        val adj = HashMap<Int, MutableList<Pair<Int, Int>>>()
        
        for (i in 0 until n) {
            val (x1, y1) = points[i]
            for (j in i + 1 until n) {
                val (x2, y2) = points[j]
                val dist = abs(x1 - x2) + abs(y1 - y2)
                adj.computeIfAbsent(i) { mutableListOf() }.add(dist to j)
                adj.computeIfAbsent(j) { mutableListOf() }.add(dist to i)
            }
        }

        var res = 0
        val visited = mutableSetOf<Int>()
        val minHeap = PriorityQueue(compareBy<Pair<Int, Int>> { it.first })
        
        minHeap.add(0 to 0)  
        
        while (visited.size < n) {
            val (cost, point) = minHeap.poll()
            if (point in visited) continue
            res += cost
            visited.add(point)

            for ((neiCost, nei) in adj[point] ?: emptyList()) {
                if (nei !in visited) {
                    minHeap.add(neiCost to nei)
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 \log n)$
* Space complexity: $O(n ^ 2)$

---

## 3. Prim's Algorithm (Optimal)

::tabs-start

```python
class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        n, node = len(points), 0
        dist = [100000000] * n
        visit = [False] * n
        edges, res = 0, 0

        while edges < n - 1:
            visit[node] = True
            nextNode = -1
            for i in range(n):
                if visit[i]:
                    continue
                curDist = (abs(points[i][0] - points[node][0]) + 
                           abs(points[i][1] - points[node][1]))
                dist[i] = min(dist[i], curDist)
                if nextNode == -1 or dist[i] < dist[nextNode]:
                    nextNode = i
                    
            res += dist[nextNode]
            node = nextNode
            edges += 1

        return res
```

```java
public class Solution {
    public int minCostConnectPoints(int[][] points) {
        int n = points.length, node = 0;
        int[] dist = new int[n];
        boolean[] visit = new boolean[n];
        Arrays.fill(dist, 100000000);
        int edges = 0, res = 0;

        while (edges < n - 1) {
            visit[node] = true;
            int nextNode = -1;
            for (int i = 0; i < n; i++) {
                if (visit[i]) continue;
                int curDist = Math.abs(points[i][0] - points[node][0]) + 
                              Math.abs(points[i][1] - points[node][1]);
                dist[i] = Math.min(dist[i], curDist);
                if (nextNode == -1 || dist[i] < dist[nextNode]) {
                    nextNode = i;
                }
            }
            res += dist[nextNode];
            node = nextNode;
            edges++;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minCostConnectPoints(vector<vector<int>>& points) {
        int n = points.size(), node = 0;
        vector<int> dist(n, 100000000);
        vector<bool> visit(n, false);
        int edges = 0, res = 0;

        while (edges < n - 1) {
            visit[node] = true;
            int nextNode = -1;
            for (int i = 0; i < n; i++) {
                if (visit[i]) continue;
                int curDist = abs(points[i][0] - points[node][0]) + 
                               abs(points[i][1] - points[node][1]);
                dist[i] = min(dist[i], curDist);
                if (nextNode == -1 || dist[i] < dist[nextNode]) {
                    nextNode = i;
                }
            }
            res += dist[nextNode];
            node = nextNode;
            edges++;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    minCostConnectPoints(points) {
        const n = points.length;
        let node = 0;
        const dist = new Array(n).fill(100000000);
        const visit = new Array(n).fill(false);
        let edges = 0, res = 0;

        while (edges < n - 1) {
            visit[node] = true;
            let nextNode = -1;
            for (let i = 0; i < n; i++) {
                if (visit[i]) continue;
                const curDist = Math.abs(points[i][0] - points[node][0]) + 
                                 Math.abs(points[i][1] - points[node][1]);
                dist[i] = Math.min(dist[i], curDist);
                if (nextNode === -1 || dist[i] < dist[nextNode]) {
                    nextNode = i;
                }
            }
            res += dist[nextNode];
            node = nextNode;
            edges++;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinCostConnectPoints(int[][] points) {
        int n = points.Length, node = 0;
        int[] dist = new int[n];
        bool[] visit = new bool[n];
        Array.Fill(dist, 100000000);
        int edges = 0, res = 0;

        while (edges < n - 1) {
            visit[node] = true;
            int nextNode = -1;
            for (int i = 0; i < n; i++) {
                if (visit[i]) continue;
                int curDist = Math.Abs(points[i][0] - points[node][0]) + 
                               Math.Abs(points[i][1] - points[node][1]);
                dist[i] = Math.Min(dist[i], curDist);
                if (nextNode == -1 || dist[i] < dist[nextNode]) {
                    nextNode = i;
                }
            }
            res += dist[nextNode];
            node = nextNode;
            edges++;
        }
        return res;
    }
}
```

```go
func minCostConnectPoints(points [][]int) int {
	n := len(points)
	node := 0
	dist := make([]int, n)
	for i := range dist {
		dist[i] = 100000000
	}
	visit := make([]bool, n)
	edges, res := 0, 0

	for edges < n-1 {
		visit[node] = true
		nextNode := -1
		for i := 0; i < n; i++ {
			if visit[i] {
				continue
			}
			curDist := int(math.Abs(float64(points[i][0]-points[node][0])) + 
				math.Abs(float64(points[i][1]-points[node][1])))
			if curDist < dist[i] {
				dist[i] = curDist
			}
			if nextNode == -1 || dist[i] < dist[nextNode] {
				nextNode = i
			}
		}
		res += dist[nextNode]
		node = nextNode
		edges++
	}
	return res
}
```

```kotlin
class Solution {
    fun minCostConnectPoints(points: Array<IntArray>): Int {
        val n = points.size
        var node = 0
        val dist = IntArray(n) { 100000000 }
        val visit = BooleanArray(n)
        var edges = 0
        var res = 0

        while (edges < n - 1) {
            visit[node] = true
            var nextNode = -1
            for (i in 0 until n) {
                if (visit[i]) continue
                val curDist = abs(points[i][0] - points[node][0]) + 
                              abs(points[i][1] - points[node][1])
                dist[i] = minOf(dist[i], curDist)
                if (nextNode == -1 || dist[i] < dist[nextNode]) {
                    nextNode = i
                }
            }
            res += dist[nextNode]
            node = nextNode
            edges++
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$