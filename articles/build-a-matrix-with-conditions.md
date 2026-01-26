## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Graph Representation** - Building adjacency lists from edge lists to represent directed graphs
- **Topological Sort** - Ordering nodes in a directed acyclic graph such that all edges point forward
- **Cycle Detection** - Identifying cycles in directed graphs using DFS path tracking or in-degree analysis
- **DFS and BFS** - Implementing depth-first and breadth-first traversals for graph algorithms

---

## 1. Topological Sort (DFS)

### Intuition

The problem asks us to place numbers `1` to `k` in a `k x k` matrix such that certain numbers appear above others (row conditions) and certain numbers appear to the left of others (column conditions). This is essentially two independent ordering problems: one for rows and one for columns.

Each set of conditions forms a directed graph where an edge from A to B means A must come before B. Finding a valid ordering that satisfies all constraints is exactly what topological sort does. If there's a cycle in either graph, no valid ordering exists and we return an empty matrix.

### Algorithm

1. Build two directed graphs from `rowConditions` and `colConditions`.
2. Perform topological sort on `rowConditions` using DFS:
   - Track visited nodes and nodes in the current path (to detect cycles).
   - If a cycle is detected (node appears in current path), return empty.
   - Add nodes to the order in reverse post-order, then reverse the result.
3. Perform topological sort on `colConditions` similarly.
4. Create mappings from each number to its row index (from row order) and column index (from column order).
5. Place each number `1` to `k` at the position determined by these mappings.
6. Return the constructed matrix.

::tabs-start

```python
class Solution:
    def buildMatrix(self, k: int, rowConditions: List[List[int]], colConditions: List[List[int]]) -> List[List[int]]:
        def dfs(src, adj, visit, path, order):
            if src in path:
                return False
            if src in visit:
                return True
            visit.add(src)
            path.add(src)
            for nei in adj[src]:
                if not dfs(nei, adj, visit, path, order):
                    return False
            path.remove(src)
            order.append(src)
            return True

        def topo_sort(edges):
            adj = defaultdict(list)
            for src, dst in edges:
                adj[src].append(dst)

            visit, path = set(), set()
            order = []
            for src in range(1, k + 1):
                if src not in visit:
                    if not dfs(src, adj, visit, path, order):
                        return []
            return order[::-1]

        row_order = topo_sort(rowConditions)
        if not row_order: return []

        col_order = topo_sort(colConditions)
        if not col_order: return []

        val_to_row = {num: i for i, num in enumerate(row_order)}
        val_to_col = {num: i for i, num in enumerate(col_order)}
        res = [[0] * k for _ in range(k)]
        for num in range(1, k + 1):
            r, c = val_to_row[num], val_to_col[num]
            res[r][c] = num

        return res
```

```java
public class Solution {
    private Set<Integer> visit;
    private Set<Integer> path;
    private List<Integer> order;

    public int[][] buildMatrix(int k, int[][] rowConditions, int[][] colConditions) {
        int[] rowOrder = topoSort(k, rowConditions);
        if (rowOrder == null) return new int[0][0];
        int[] colOrder = topoSort(k, colConditions);
        if (colOrder == null) return new int[0][0];

        Map<Integer, Integer> valToRow = new HashMap<>();
        for (int i = 0; i < rowOrder.length; i++) {
            valToRow.put(rowOrder[i], i);
        }
        Map<Integer, Integer> valToCol = new HashMap<>();
        for (int i = 0; i < colOrder.length; i++) {
            valToCol.put(colOrder[i], i);
        }

        int[][] res = new int[k][k];
        for (int num = 1; num <= k; num++) {
            int r = valToRow.get(num);
            int c = valToCol.get(num);
            res[r][c] = num;
        }
        return res;
    }

    private int[] topoSort(int k, int[][] edges) {
        Map<Integer, List<Integer>> adj = new HashMap<>();
        for (int i = 1; i <= k; i++) {
            adj.put(i, new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
        }

        visit = new HashSet<>();
        path = new HashSet<>();
        order = new ArrayList<>();

        for (int i = 1; i <= k; i++) {
            if (!visit.contains(i)) {
                if (!dfs(i, adj)) {
                    return null;
                }
            }
        }

        Collections.reverse(order);
        return order.stream().mapToInt(i -> i).toArray();
    }

    private boolean dfs(int src, Map<Integer, List<Integer>> adj) {
        if (path.contains(src)) return false;
        if (visit.contains(src)) return true;

        visit.add(src);
        path.add(src);
        for (int nei : adj.get(src)) {
            if (!dfs(nei, adj)) {
                return false;
            }
        }
        path.remove(src);
        order.add(src);
        return true;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> buildMatrix(int k, vector<vector<int>>& rowConditions, vector<vector<int>>& colConditions) {
        vector<int> rowOrder = topoSort(k, rowConditions);
        if (rowOrder.empty()) return {};
        vector<int> colOrder = topoSort(k, colConditions);
        if (colOrder.empty()) return {};

        unordered_map<int, int> valToRow, valToCol;
        for (int i = 0; i < rowOrder.size(); i++) {
            valToRow[rowOrder[i]] = i;
        }
        for (int i = 0; i < colOrder.size(); i++) {
            valToCol[colOrder[i]] = i;
        }

        vector<vector<int>> res(k, vector<int>(k, 0));
        for (int num = 1; num <= k; num++) {
            int r = valToRow[num];
            int c = valToCol[num];
            res[r][c] = num;
        }
        return res;
    }

private:
    unordered_set<int> visit;
    unordered_set<int> path;
    vector<int> order;

    vector<int> topoSort(int k, vector<vector<int>>& edges) {
        unordered_map<int, vector<int>> adj;
        for (int i = 1; i <= k; i++) {
            adj[i] = {};
        }
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
        }

        visit.clear();
        path.clear();
        order.clear();
        for (int i = 1; i <= k; i++) {
            if (visit.find(i) == visit.end()) {
                if (!dfs(i, adj)) {
                    return {};
                }
            }
        }

        reverse(order.begin(), order.end());
        return order;
    }

    bool dfs(int src, unordered_map<int, vector<int>>& adj) {
        if (path.find(src) != path.end()) return false;
        if (visit.find(src) != visit.end()) return true;

        visit.insert(src);
        path.insert(src);
        for (int nei : adj[src]) {
            if (!dfs(nei, adj)) {
                return false;
            }
        }
        path.erase(src);
        order.push_back(src);
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} k
     * @param {number[][]} rowConditions
     * @param {number[][]} colConditions
     * @return {number[][]}
     */
    buildMatrix(k, rowConditions, colConditions) {
        const rowOrder = this.topoSort(k, rowConditions);
        if (!rowOrder) return [];
        const colOrder = this.topoSort(k, colConditions);
        if (!colOrder) return [];

        const valToRow = {};
        rowOrder.forEach((num, i) => {
            valToRow[num] = i;
        });

        const valToCol = {};
        colOrder.forEach((num, i) => {
            valToCol[num] = i;
        });

        const res = Array.from({ length: k }, () => Array(k).fill(0));
        for (let num = 1; num <= k; num++) {
            const r = valToRow[num];
            const c = valToCol[num];
            res[r][c] = num;
        }
        return res;
    }

    /**
     * @param {number} k
     * @param {number[][]} edges
     * @return {number[]}
     */
    topoSort(k, edges) {
        const adj = Array.from({ length: k + 1 }, () => []);
        edges.forEach(([src, dst]) => {
            adj[src].push(dst);
        });

        const visit = new Set();
        const path = new Set();
        const order = [];

        const dfs = (src) => {
            if (path.has(src)) return false;
            if (visit.has(src)) return true;

            visit.add(src);
            path.add(src);
            for (const nei of adj[src]) {
                if (!dfs(nei)) {
                    return false;
                }
            }
            path.delete(src);
            order.push(src);
            return true;
        };

        for (let src = 1; src <= k; src++) {
            if (!visit.has(src)) {
                if (!dfs(src)) {
                    return null;
                }
            }
        }
        return order.reverse();
    }
}
```

```csharp
public class Solution {
    private HashSet<int> visit;
    private HashSet<int> path;
    private List<int> order;

    public int[][] BuildMatrix(int k, int[][] rowConditions, int[][] colConditions) {
        int[] rowOrder = TopoSort(k, rowConditions);
        if (rowOrder == null) return new int[0][];

        int[] colOrder = TopoSort(k, colConditions);
        if (colOrder == null) return new int[0][];

        Dictionary<int, int> valToRow = new Dictionary<int, int>();
        for (int i = 0; i < rowOrder.Length; i++) {
            valToRow[rowOrder[i]] = i;
        }

        Dictionary<int, int> valToCol = new Dictionary<int, int>();
        for (int i = 0; i < colOrder.Length; i++) {
            valToCol[colOrder[i]] = i;
        }

        int[][] res = new int[k][];
        for (int i = 0; i < k; i++) {
            res[i] = new int[k];
        }

        for (int num = 1; num <= k; num++) {
            int r = valToRow[num];
            int c = valToCol[num];
            res[r][c] = num;
        }

        return res;
    }

    private int[] TopoSort(int k, int[][] edges) {
        Dictionary<int, List<int>> adj = new Dictionary<int, List<int>>();
        for (int i = 1; i <= k; i++) {
            adj[i] = new List<int>();
        }

        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
        }

        visit = new HashSet<int>();
        path = new HashSet<int>();
        order = new List<int>();

        for (int i = 1; i <= k; i++) {
            if (!visit.Contains(i)) {
                if (!DFS(i, adj)) {
                    return null;
                }
            }
        }

        order.Reverse();
        return order.ToArray();
    }

    private bool DFS(int src, Dictionary<int, List<int>> adj) {
        if (path.Contains(src)) return false;
        if (visit.Contains(src)) return true;

        visit.Add(src);
        path.Add(src);
        foreach (int nei in adj[src]) {
            if (!DFS(nei, adj)) {
                return false;
            }
        }
        path.Remove(src);
        order.Add(src);
        return true;
    }
}
```

```go
func buildMatrix(k int, rowConditions [][]int, colConditions [][]int) [][]int {
    topoSort := func(edges [][]int) []int {
        adj := make([][]int, k+1)
        for i := range adj {
            adj[i] = []int{}
        }
        for _, edge := range edges {
            adj[edge[0]] = append(adj[edge[0]], edge[1])
        }

        visit := make(map[int]bool)
        path := make(map[int]bool)
        order := []int{}

        var dfs func(src int) bool
        dfs = func(src int) bool {
            if path[src] {
                return false
            }
            if visit[src] {
                return true
            }
            visit[src] = true
            path[src] = true
            for _, nei := range adj[src] {
                if !dfs(nei) {
                    return false
                }
            }
            delete(path, src)
            order = append(order, src)
            return true
        }

        for i := 1; i <= k; i++ {
            if !visit[i] {
                if !dfs(i) {
                    return nil
                }
            }
        }

        for i, j := 0, len(order)-1; i < j; i, j = i+1, j-1 {
            order[i], order[j] = order[j], order[i]
        }
        return order
    }

    rowOrder := topoSort(rowConditions)
    if rowOrder == nil {
        return [][]int{}
    }

    colOrder := topoSort(colConditions)
    if colOrder == nil {
        return [][]int{}
    }

    valToRow := make(map[int]int)
    for i, num := range rowOrder {
        valToRow[num] = i
    }
    valToCol := make(map[int]int)
    for i, num := range colOrder {
        valToCol[num] = i
    }

    res := make([][]int, k)
    for i := range res {
        res[i] = make([]int, k)
    }
    for num := 1; num <= k; num++ {
        r, c := valToRow[num], valToCol[num]
        res[r][c] = num
    }
    return res
}
```

```kotlin
class Solution {
    fun buildMatrix(k: Int, rowConditions: Array<IntArray>, colConditions: Array<IntArray>): Array<IntArray> {
        fun topoSort(edges: Array<IntArray>): IntArray? {
            val adj = Array(k + 1) { mutableListOf<Int>() }
            for (edge in edges) {
                adj[edge[0]].add(edge[1])
            }

            val visit = mutableSetOf<Int>()
            val path = mutableSetOf<Int>()
            val order = mutableListOf<Int>()

            fun dfs(src: Int): Boolean {
                if (src in path) return false
                if (src in visit) return true
                visit.add(src)
                path.add(src)
                for (nei in adj[src]) {
                    if (!dfs(nei)) return false
                }
                path.remove(src)
                order.add(src)
                return true
            }

            for (i in 1..k) {
                if (i !in visit) {
                    if (!dfs(i)) return null
                }
            }
            return order.reversed().toIntArray()
        }

        val rowOrder = topoSort(rowConditions) ?: return arrayOf()
        val colOrder = topoSort(colConditions) ?: return arrayOf()

        val valToRow = mutableMapOf<Int, Int>()
        rowOrder.forEachIndexed { i, num -> valToRow[num] = i }
        val valToCol = mutableMapOf<Int, Int>()
        colOrder.forEachIndexed { i, num -> valToCol[num] = i }

        val res = Array(k) { IntArray(k) }
        for (num in 1..k) {
            val r = valToRow[num]!!
            val c = valToCol[num]!!
            res[r][c] = num
        }
        return res
    }
}
```

```swift
class Solution {
    func buildMatrix(_ k: Int, _ rowConditions: [[Int]], _ colConditions: [[Int]]) -> [[Int]] {
        func topoSort(_ edges: [[Int]]) -> [Int]? {
            var adj = [[Int]](repeating: [], count: k + 1)
            for edge in edges {
                adj[edge[0]].append(edge[1])
            }

            var visit = Set<Int>()
            var path = Set<Int>()
            var order = [Int]()

            func dfs(_ src: Int) -> Bool {
                if path.contains(src) { return false }
                if visit.contains(src) { return true }
                visit.insert(src)
                path.insert(src)
                for nei in adj[src] {
                    if !dfs(nei) { return false }
                }
                path.remove(src)
                order.append(src)
                return true
            }

            for i in 1...k {
                if !visit.contains(i) {
                    if !dfs(i) { return nil }
                }
            }
            return order.reversed()
        }

        guard let rowOrder = topoSort(rowConditions) else { return [] }
        guard let colOrder = topoSort(colConditions) else { return [] }

        var valToRow = [Int: Int]()
        for (i, num) in rowOrder.enumerated() {
            valToRow[num] = i
        }
        var valToCol = [Int: Int]()
        for (i, num) in colOrder.enumerated() {
            valToCol[num] = i
        }

        var res = [[Int]](repeating: [Int](repeating: 0, count: k), count: k)
        for num in 1...k {
            let r = valToRow[num]!
            let c = valToCol[num]!
            res[r][c] = num
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k ^ 2 + n + m)$
- Space complexity:
    - $O(k + n + m)$ extra space.
    - $O(k ^ 2)$ space for the output matrix.

> Where $n$ is the size of the array $rowConditions$, $m$ is the size of the array $colConditions$, and $k$ is the size of the output matrix.

---

## 2. Topological Sort (Kahn's Algorithm)

### Intuition

This approach solves the same problem using Kahn's algorithm (BFS-based topological sort) instead of DFS. The key insight remains the same: we need valid orderings for both rows and columns. Kahn's algorithm processes nodes with zero incoming edges first, which naturally produces a valid topological order when no cycle exists.

If we process fewer than `k` nodes, it means there's a cycle in the graph and no valid ordering is possible.

### Algorithm

1. For each condition set (row and column), build an adjacency list and compute in-degrees for all nodes.
2. Initialize a queue with all nodes that have zero in-degree.
3. Process nodes from the queue:
   - Add the current node to the order.
   - Decrease the in-degree of all neighbors.
   - Add neighbors with zero in-degree to the queue.
4. If the order contains fewer than `k` nodes, a cycle exists; return empty matrix.
5. Create index mappings from the row and column orderings.
6. Place each number at its determined (row, column) position in the matrix.
7. Return the matrix.

::tabs-start

```python
class Solution:
    def buildMatrix(self, k: int, rowConditions: List[List[int]], colConditions: List[List[int]]) -> List[List[int]]:
        def topo_sort(edges):
            indegree = [0] * (k + 1)
            adj = [[] for _ in range(k + 1)]
            for u, v in edges:
                adj[u].append(v)
                indegree[v] += 1

            order = []
            q = deque()
            for i in range(1, k + 1):
                if not indegree[i]:
                    q.append(i)

            while q:
                node = q.popleft()
                order.append(node)
                for nei in adj[node]:
                    indegree[nei] -= 1
                    if not indegree[nei]:
                        q.append(nei)

            return order

        row_order = topo_sort(rowConditions)
        if len(row_order) != k: return []

        col_order = topo_sort(colConditions)
        if len(col_order) != k: return []

        res = [[0] * k for _ in range(k)]
        colIndex = [0] * (k + 1)
        for i in range(k):
            colIndex[col_order[i]] = i

        for i in range(k):
            res[i][colIndex[row_order[i]]] = row_order[i]
        return res
```

```java
public class Solution {
    public int[][] buildMatrix(int k, int[][] rowConditions, int[][] colConditions) {
        int[] rowOrder = topoSort(k, rowConditions);
        if (rowOrder.length != k) return new int[0][0];

        int[] colOrder = topoSort(k, colConditions);
        if (colOrder.length != k) return new int[0][0];

        int[][] res = new int[k][k];
        int[] colIndex = new int[k + 1];
        for (int i = 0; i < k; i++) {
            colIndex[colOrder[i]] = i;
        }

        for (int i = 0; i < k; i++) {
            res[i][colIndex[rowOrder[i]]] = rowOrder[i];
        }

        return res;
    }

    private int[] topoSort(int k, int[][] edges) {
        int[] indegree = new int[k + 1];
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= k; i++) {
            adj.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            indegree[edge[1]]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        int[] order = new int[k];
        int idx = 0;
        for (int i = 1; i <= k; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }

        while (!queue.isEmpty()) {
            int node = queue.poll();
            order[idx++] = node;
            for (int nei : adj.get(node)) {
                indegree[nei]--;
                if (indegree[nei] == 0) {
                    queue.offer(nei);
                }
            }
        }

        if (idx != k) return new int[0];
        return order;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> buildMatrix(int k, vector<vector<int>>& rowConditions, vector<vector<int>>& colConditions) {
        vector<int> rowOrder = topoSort(k, rowConditions);
        if (rowOrder.size() != k) return {};

        vector<int> colOrder = topoSort(k, colConditions);
        if (colOrder.size() != k) return {};

        vector<vector<int>> res(k, vector<int>(k, 0));
        vector<int> colIndex(k + 1);
        for (int i = 0; i < k; i++) {
            colIndex[colOrder[i]] = i;
        }
        for (int i = 0; i < k; i++) {
            res[i][colIndex[rowOrder[i]]] = rowOrder[i];
        }
        return res;
    }

private:
    vector<int> topoSort(int k, vector<vector<int>>& edges) {
        vector<int> indegree(k + 1, 0);
        vector<vector<int>> adj(k + 1);
        for (const auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            indegree[edge[1]]++;
        }

        queue<int> q;
        vector<int> order;
        for (int i = 1; i <= k; i++) {
            if (indegree[i] == 0) {
                q.push(i);
            }
        }

        while (!q.empty()) {
            int node = q.front();
            q.pop();
            order.push_back(node);

            for (int nei : adj[node]) {
                indegree[nei]--;
                if (indegree[nei] == 0) {
                    q.push(nei);
                }
            }
        }

        if (order.size() != k) return {};
        return order;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} k
     * @param {number[][]} rowConditions
     * @param {number[][]} colConditions
     * @return {number[][]}
     */
    buildMatrix(k, rowConditions, colConditions) {
        const rowOrder = this.topoSort(k, rowConditions);
        if (rowOrder.length !== k) return [];

        const colOrder = this.topoSort(k, colConditions);
        if (colOrder.length !== k) return [];

        const res = Array.from({ length: k }, () => Array(k).fill(0));
        const colIndex = Array(k + 1).fill(0);

        for (let i = 0; i < k; i++) {
            colIndex[colOrder[i]] = i;
        }

        for (let i = 0; i < k; i++) {
            res[i][colIndex[rowOrder[i]]] = rowOrder[i];
        }

        return res;
    }

    /**
     * @param {number} k
     * @param {number[][]} edges
     * @return {number[]}
     */
    topoSort(k, edges) {
        const indegree = Array(k + 1).fill(0);
        const adj = Array.from({ length: k + 1 }, () => []);

        for (const [u, v] of edges) {
            adj[u].push(v);
            indegree[v]++;
        }

        const queue = new Queue();
        const order = [];

        for (let i = 1; i <= k; i++) {
            if (indegree[i] === 0) {
                queue.push(i);
            }
        }

        while (!queue.isEmpty()) {
            const node = queue.pop();
            order.push(node);
            for (const nei of adj[node]) {
                indegree[nei]--;
                if (indegree[nei] === 0) {
                    queue.push(nei);
                }
            }
        }

        return order.length === k ? order : [];
    }
}
```

```csharp
public class Solution {
    public int[][] BuildMatrix(int k, int[][] rowConditions, int[][] colConditions) {
        int[] rowOrder = TopoSort(k, rowConditions);
        if (rowOrder.Length != k) return new int[0][];

        int[] colOrder = TopoSort(k, colConditions);
        if (colOrder.Length != k) return new int[0][];

        int[][] res = new int[k][];
        for (int i = 0; i < k; i++) res[i] = new int[k];

        int[] colIndex = new int[k + 1];
        for (int i = 0; i < k; i++) {
            colIndex[colOrder[i]] = i;
        }

        for (int i = 0; i < k; i++) {
            res[i][colIndex[rowOrder[i]]] = rowOrder[i];
        }

        return res;
    }

    private int[] TopoSort(int k, int[][] edges) {
        int[] indegree = new int[k + 1];
        List<List<int>> adj = new List<List<int>>();
        for (int i = 0; i <= k; i++) {
            adj.Add(new List<int>());
        }

        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
            indegree[edge[1]]++;
        }

        Queue<int> queue = new Queue<int>();
        int[] order = new int[k];
        int idx = 0;
        for (int i = 1; i <= k; i++) {
            if (indegree[i] == 0) {
                queue.Enqueue(i);
            }
        }

        while (queue.Count > 0) {
            int node = queue.Dequeue();
            order[idx++] = node;
            foreach (var nei in adj[node]) {
                indegree[nei]--;
                if (indegree[nei] == 0) {
                    queue.Enqueue(nei);
                }
            }
        }

        if (idx != k) return new int[0];
        return order;
    }
}
```

```go
func buildMatrix(k int, rowConditions [][]int, colConditions [][]int) [][]int {
    topoSort := func(edges [][]int) []int {
        indegree := make([]int, k+1)
        adj := make([][]int, k+1)
        for i := range adj {
            adj[i] = []int{}
        }
        for _, edge := range edges {
            adj[edge[0]] = append(adj[edge[0]], edge[1])
            indegree[edge[1]]++
        }

        queue := []int{}
        order := []int{}
        for i := 1; i <= k; i++ {
            if indegree[i] == 0 {
                queue = append(queue, i)
            }
        }

        for len(queue) > 0 {
            node := queue[0]
            queue = queue[1:]
            order = append(order, node)
            for _, nei := range adj[node] {
                indegree[nei]--
                if indegree[nei] == 0 {
                    queue = append(queue, nei)
                }
            }
        }

        if len(order) != k {
            return nil
        }
        return order
    }

    rowOrder := topoSort(rowConditions)
    if rowOrder == nil {
        return [][]int{}
    }

    colOrder := topoSort(colConditions)
    if colOrder == nil {
        return [][]int{}
    }

    res := make([][]int, k)
    for i := range res {
        res[i] = make([]int, k)
    }
    colIndex := make([]int, k+1)
    for i := 0; i < k; i++ {
        colIndex[colOrder[i]] = i
    }
    for i := 0; i < k; i++ {
        res[i][colIndex[rowOrder[i]]] = rowOrder[i]
    }
    return res
}
```

```kotlin
class Solution {
    fun buildMatrix(k: Int, rowConditions: Array<IntArray>, colConditions: Array<IntArray>): Array<IntArray> {
        fun topoSort(edges: Array<IntArray>): IntArray? {
            val indegree = IntArray(k + 1)
            val adj = Array(k + 1) { mutableListOf<Int>() }
            for (edge in edges) {
                adj[edge[0]].add(edge[1])
                indegree[edge[1]]++
            }

            val queue = ArrayDeque<Int>()
            val order = mutableListOf<Int>()
            for (i in 1..k) {
                if (indegree[i] == 0) {
                    queue.add(i)
                }
            }

            while (queue.isNotEmpty()) {
                val node = queue.removeFirst()
                order.add(node)
                for (nei in adj[node]) {
                    indegree[nei]--
                    if (indegree[nei] == 0) {
                        queue.add(nei)
                    }
                }
            }

            return if (order.size == k) order.toIntArray() else null
        }

        val rowOrder = topoSort(rowConditions) ?: return arrayOf()
        val colOrder = topoSort(colConditions) ?: return arrayOf()

        val res = Array(k) { IntArray(k) }
        val colIndex = IntArray(k + 1)
        for (i in 0 until k) {
            colIndex[colOrder[i]] = i
        }
        for (i in 0 until k) {
            res[i][colIndex[rowOrder[i]]] = rowOrder[i]
        }
        return res
    }
}
```

```swift
class Solution {
    func buildMatrix(_ k: Int, _ rowConditions: [[Int]], _ colConditions: [[Int]]) -> [[Int]] {
        func topoSort(_ edges: [[Int]]) -> [Int]? {
            var indegree = [Int](repeating: 0, count: k + 1)
            var adj = [[Int]](repeating: [], count: k + 1)
            for edge in edges {
                adj[edge[0]].append(edge[1])
                indegree[edge[1]] += 1
            }

            var queue = [Int]()
            var order = [Int]()
            for i in 1...k {
                if indegree[i] == 0 {
                    queue.append(i)
                }
            }

            var front = 0
            while front < queue.count {
                let node = queue[front]
                front += 1
                order.append(node)
                for nei in adj[node] {
                    indegree[nei] -= 1
                    if indegree[nei] == 0 {
                        queue.append(nei)
                    }
                }
            }

            return order.count == k ? order : nil
        }

        guard let rowOrder = topoSort(rowConditions) else { return [] }
        guard let colOrder = topoSort(colConditions) else { return [] }

        var res = [[Int]](repeating: [Int](repeating: 0, count: k), count: k)
        var colIndex = [Int](repeating: 0, count: k + 1)
        for i in 0..<k {
            colIndex[colOrder[i]] = i
        }
        for i in 0..<k {
            res[i][colIndex[rowOrder[i]]] = rowOrder[i]
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k ^ 2 + n + m)$
- Space complexity:
    - $O(k + n + m)$ extra space.
    - $O(k ^ 2)$ space for the output matrix.

> Where $n$ is the size of the array $rowConditions$, $m$ is the size of the array $colConditions$, and $k$ is the size of the output matrix.

---

## Common Pitfalls

### Treating Row and Column Conditions as One Graph
Row conditions and column conditions must be processed as two separate, independent graphs. Combining them into a single graph leads to incorrect cycle detection and wrong orderings since row ordering has no relation to column ordering.

### Not Detecting Cycles Properly in DFS
When using DFS for topological sort, you need both a `visited` set (permanently processed nodes) and a `path` set (nodes in current recursion stack). Using only one set fails to detect back edges that indicate cycles.
```python
# Wrong: single visited set misses cycles
if src in visited:
    return True  # Should check path set too

# Correct: check both sets
if src in path:
    return False  # Cycle detected
if src in visited:
    return True   # Already processed
```

### Forgetting to Include Nodes Without Edges
Numbers from 1 to k that don't appear in any condition still need positions in the matrix. The topological sort must iterate over all values 1 to k, not just those present in the edge list.

### Off-by-One Errors with 1-Indexed Values
The values are 1 to k (1-indexed) but arrays are typically 0-indexed. When building adjacency lists or index mappings, mixing these up causes index out of bounds errors or incorrect placements.
