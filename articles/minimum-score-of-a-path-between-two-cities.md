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

```csharp
public class Solution {
    private List<int[]>[] adj;
    private bool[] visit;
    private int res;

    public int MinScore(int n, int[][] roads) {
        adj = new List<int[]>[n + 1];
        visit = new bool[n + 1];
        res = int.MaxValue;

        for (int i = 0; i <= n; i++) {
            adj[i] = new List<int[]>();
        }

        foreach (var road in roads) {
            adj[road[0]].Add(new int[] { road[1], road[2] });
            adj[road[1]].Add(new int[] { road[0], road[2] });
        }

        Dfs(1);
        return res;
    }

    private void Dfs(int node) {
        if (visit[node]) return;
        visit[node] = true;

        foreach (var edge in adj[node]) {
            res = Math.Min(res, edge[1]);
            Dfs(edge[0]);
        }
    }
}
```

```go
func minScore(n int, roads [][]int) int {
    adj := make([][][2]int, n+1)
    for i := range adj {
        adj[i] = [][2]int{}
    }
    for _, road := range roads {
        adj[road[0]] = append(adj[road[0]], [2]int{road[1], road[2]})
        adj[road[1]] = append(adj[road[1]], [2]int{road[0], road[2]})
    }

    res := 1 << 30
    visit := make([]bool, n+1)

    var dfs func(node int)
    dfs = func(node int) {
        if visit[node] {
            return
        }
        visit[node] = true

        for _, edge := range adj[node] {
            if edge[1] < res {
                res = edge[1]
            }
            dfs(edge[0])
        }
    }

    dfs(1)
    return res
}
```

```kotlin
class Solution {
    private lateinit var adj: Array<MutableList<IntArray>>
    private lateinit var visit: BooleanArray
    private var res = Int.MAX_VALUE

    fun minScore(n: Int, roads: Array<IntArray>): Int {
        adj = Array(n + 1) { mutableListOf<IntArray>() }
        visit = BooleanArray(n + 1)
        res = Int.MAX_VALUE

        for (road in roads) {
            adj[road[0]].add(intArrayOf(road[1], road[2]))
            adj[road[1]].add(intArrayOf(road[0], road[2]))
        }

        dfs(1)
        return res
    }

    private fun dfs(node: Int) {
        if (visit[node]) return
        visit[node] = true

        for (edge in adj[node]) {
            res = minOf(res, edge[1])
            dfs(edge[0])
        }
    }
}
```

```swift
class Solution {
    private var adj = [[(Int, Int)]]()
    private var visit = [Bool]()
    private var res = Int.max

    func minScore(_ n: Int, _ roads: [[Int]]) -> Int {
        adj = [[(Int, Int)]](repeating: [], count: n + 1)
        visit = [Bool](repeating: false, count: n + 1)
        res = Int.max

        for road in roads {
            adj[road[0]].append((road[1], road[2]))
            adj[road[1]].append((road[0], road[2]))
        }

        dfs(1)
        return res
    }

    private func dfs(_ node: Int) {
        if visit[node] { return }
        visit[node] = true

        for (nei, dist) in adj[node] {
            res = min(res, dist)
            dfs(nei)
        }
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

```csharp
public class Solution {
    public int MinScore(int n, int[][] roads) {
        List<int[]>[] adj = new List<int[]>[n + 1];
        for (int i = 0; i <= n; i++) adj[i] = new List<int[]>();

        foreach (var road in roads) {
            adj[road[0]].Add(new int[] { road[1], road[2] });
            adj[road[1]].Add(new int[] { road[0], road[2] });
        }

        int res = int.MaxValue;
        bool[] visit = new bool[n + 1];
        Queue<int> q = new Queue<int>();
        q.Enqueue(1);
        visit[1] = true;

        while (q.Count > 0) {
            int node = q.Dequeue();
            foreach (var edge in adj[node]) {
                int nei = edge[0], dist = edge[1];
                res = Math.Min(res, dist);
                if (!visit[nei]) {
                    visit[nei] = true;
                    q.Enqueue(nei);
                }
            }
        }

        return res;
    }
}
```

```go
func minScore(n int, roads [][]int) int {
    adj := make([][][2]int, n+1)
    for i := range adj {
        adj[i] = [][2]int{}
    }
    for _, road := range roads {
        adj[road[0]] = append(adj[road[0]], [2]int{road[1], road[2]})
        adj[road[1]] = append(adj[road[1]], [2]int{road[0], road[2]})
    }

    res := 1 << 30
    visit := make([]bool, n+1)
    q := []int{1}
    visit[1] = true

    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        for _, edge := range adj[node] {
            if edge[1] < res {
                res = edge[1]
            }
            if !visit[edge[0]] {
                visit[edge[0]] = true
                q = append(q, edge[0])
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun minScore(n: Int, roads: Array<IntArray>): Int {
        val adj = Array(n + 1) { mutableListOf<IntArray>() }
        for (road in roads) {
            adj[road[0]].add(intArrayOf(road[1], road[2]))
            adj[road[1]].add(intArrayOf(road[0], road[2]))
        }

        var res = Int.MAX_VALUE
        val visit = BooleanArray(n + 1)
        val q = ArrayDeque<Int>()
        q.add(1)
        visit[1] = true

        while (q.isNotEmpty()) {
            val node = q.removeFirst()
            for (edge in adj[node]) {
                val (nei, dist) = edge[0] to edge[1]
                res = minOf(res, dist)
                if (!visit[nei]) {
                    visit[nei] = true
                    q.add(nei)
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func minScore(_ n: Int, _ roads: [[Int]]) -> Int {
        var adj = [[(Int, Int)]](repeating: [], count: n + 1)
        for road in roads {
            adj[road[0]].append((road[1], road[2]))
            adj[road[1]].append((road[0], road[2]))
        }

        var res = Int.max
        var visit = [Bool](repeating: false, count: n + 1)
        var q = [1]
        visit[1] = true

        while !q.isEmpty {
            let node = q.removeFirst()
            for (nei, dist) in adj[node] {
                res = min(res, dist)
                if !visit[nei] {
                    visit[nei] = true
                    q.append(nei)
                }
            }
        }

        return res
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

```csharp
public class Solution {
    public int MinScore(int n, int[][] roads) {
        List<int[]>[] adj = new List<int[]>[n + 1];
        for (int i = 0; i <= n; i++) adj[i] = new List<int[]>();

        foreach (var road in roads) {
            adj[road[0]].Add(new int[] { road[1], road[2] });
            adj[road[1]].Add(new int[] { road[0], road[2] });
        }

        int res = int.MaxValue;
        bool[] visit = new bool[n + 1];
        Stack<int> stack = new Stack<int>();
        stack.Push(1);
        visit[1] = true;

        while (stack.Count > 0) {
            int node = stack.Pop();
            foreach (var edge in adj[node]) {
                int nei = edge[0], dist = edge[1];
                res = Math.Min(res, dist);
                if (!visit[nei]) {
                    visit[nei] = true;
                    stack.Push(nei);
                }
            }
        }

        return res;
    }
}
```

```go
func minScore(n int, roads [][]int) int {
    adj := make([][][2]int, n+1)
    for i := range adj {
        adj[i] = [][2]int{}
    }
    for _, road := range roads {
        adj[road[0]] = append(adj[road[0]], [2]int{road[1], road[2]})
        adj[road[1]] = append(adj[road[1]], [2]int{road[0], road[2]})
    }

    res := 1 << 30
    visit := make([]bool, n+1)
    stack := []int{1}
    visit[1] = true

    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        for _, edge := range adj[node] {
            if edge[1] < res {
                res = edge[1]
            }
            if !visit[edge[0]] {
                visit[edge[0]] = true
                stack = append(stack, edge[0])
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun minScore(n: Int, roads: Array<IntArray>): Int {
        val adj = Array(n + 1) { mutableListOf<IntArray>() }
        for (road in roads) {
            adj[road[0]].add(intArrayOf(road[1], road[2]))
            adj[road[1]].add(intArrayOf(road[0], road[2]))
        }

        var res = Int.MAX_VALUE
        val visit = BooleanArray(n + 1)
        val stack = ArrayDeque<Int>()
        stack.addLast(1)
        visit[1] = true

        while (stack.isNotEmpty()) {
            val node = stack.removeLast()
            for (edge in adj[node]) {
                val (nei, dist) = edge[0] to edge[1]
                res = minOf(res, dist)
                if (!visit[nei]) {
                    visit[nei] = true
                    stack.addLast(nei)
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func minScore(_ n: Int, _ roads: [[Int]]) -> Int {
        var adj = [[(Int, Int)]](repeating: [], count: n + 1)
        for road in roads {
            adj[road[0]].append((road[1], road[2]))
            adj[road[1]].append((road[0], road[2]))
        }

        var res = Int.max
        var visit = [Bool](repeating: false, count: n + 1)
        var stack = [1]
        visit[1] = true

        while !stack.isEmpty {
            let node = stack.removeLast()
            for (nei, dist) in adj[node] {
                res = min(res, dist)
                if !visit[nei] {
                    visit[nei] = true
                    stack.append(nei)
                }
            }
        }

        return res
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
    public int MinScore(int n, int[][] roads) {
        DSU dsu = new DSU(n);
        foreach (var road in roads) {
            dsu.Union(road[0], road[1]);
        }

        int res = int.MaxValue;
        int root = dsu.Find(1);
        foreach (var road in roads) {
            if (dsu.Find(road[0]) == root) {
                res = Math.Min(res, road[2]);
            }
        }

        return res;
    }
}
```

```go
type DSU struct {
    parent, size []int
}

func NewDSU(n int) *DSU {
    parent := make([]int, n+1)
    size := make([]int, n+1)
    for i := range parent {
        parent[i] = i
        size[i] = 1
    }
    return &DSU{parent, size}
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

func minScore(n int, roads [][]int) int {
    dsu := NewDSU(n)
    for _, road := range roads {
        dsu.Union(road[0], road[1])
    }

    res := 1 << 30
    root := dsu.Find(1)
    for _, road := range roads {
        if dsu.Find(road[0]) == root {
            if road[2] < res {
                res = road[2]
            }
        }
    }

    return res
}
```

```kotlin
class DSU(n: Int) {
    private val parent = IntArray(n + 1) { it }
    private val size = IntArray(n + 1) { 1 }

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
    fun minScore(n: Int, roads: Array<IntArray>): Int {
        val dsu = DSU(n)
        for (road in roads) {
            dsu.union(road[0], road[1])
        }

        var res = Int.MAX_VALUE
        val root = dsu.find(1)
        for (road in roads) {
            if (dsu.find(road[0]) == root) {
                res = minOf(res, road[2])
            }
        }

        return res
    }
}
```

```swift
class DSU {
    private var parent: [Int]
    private var size: [Int]

    init(_ n: Int) {
        parent = Array(0...n)
        size = [Int](repeating: 1, count: n + 1)
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
    func minScore(_ n: Int, _ roads: [[Int]]) -> Int {
        let dsu = DSU(n)
        for road in roads {
            _ = dsu.union(road[0], road[1])
        }

        var res = Int.max
        let root = dsu.find(1)
        for road in roads {
            if dsu.find(road[0]) == root {
                res = min(res, road[2])
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + (E * α(V)))$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges in the graph. $α()$ is used for amortized complexity.
