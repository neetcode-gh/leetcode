## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Graph Representation** - Building adjacency lists to model dependencies between nodes
- **Topological Sort** - Ordering nodes in a directed acyclic graph such that for every edge u->v, u comes before v
- **Depth-First Search (DFS)** - Traversing graphs recursively to detect cycles and build orderings
- **Cycle Detection** - Identifying cycles in directed graphs using visited states (unvisited, visiting, visited)

---

## 1. Topological Sort (DFS)

### Intuition

This problem requires ordering items while respecting two types of constraints: dependencies between items and group membership. Items in the same group must appear consecutively. The key insight is to perform two separate topological sorts: one for items within their groups, and one for the groups themselves. If item A depends on item B from a different group, then B's group must come before A's group.

### Algorithm

1. Assign unique group IDs to items without a group (those with `group[i] == -1`).
2. Build two adjacency lists:
   - Item graph: edges from prerequisite items to dependent items.
   - Group graph: edges from prerequisite groups to dependent groups (only when items are in different groups).
3. Perform topological sort on the item graph using `dfs` to get item ordering.
4. Perform topological sort on the group graph using `dfs` to get group ordering.
5. If either sort detects a cycle, return an empty array.
6. Group the sorted items by their group ID.
7. Iterate through groups in topological order and append their items to the result.

::tabs-start

```python
class Solution:
    def sortItems(self, n, m, group, beforeItems):
        for i in range(n):
            if group[i] == -1:
                group[i] = m
                m += 1

        item_adj = defaultdict(list)
        group_adj = defaultdict(list)
        for i in range(n):
            for par in beforeItems[i]:
                item_adj[par].append(i)
                if group[i] != group[par]:
                    group_adj[group[par]].append(group[i])

        itm = self.topo_sort(item_adj, n)
        if not itm: return []
        grp = self.topo_sort(group_adj, m)
        if not grp: return []

        grouping = defaultdict(list)
        for i in itm:
            grouping[group[i]].append(i)

        res = []
        for g in grp:
            res.extend(grouping[g])

        return res

    def topo_sort(self, adj, N):
        visited = [0] * N
        topo = []

        def dfs(node):
            if visited[node] == 1:
                return True
            if visited[node] == 2:
                return False
            visited[node] = 1
            for neighbor in adj[node]:
                if dfs(neighbor):
                    return True
            topo.append(node)
            visited[node] = 2
            return False

        for i in range(N):
            if visited[i] == 0:
                if dfs(i):
                    return []

        return topo[::-1]
```

```java
public class Solution {
    public int[] sortItems(int n, int m, int[] group, List<List<Integer>> beforeItems) {
        for (int i = 0; i < n; i++) {
            if (group[i] == -1) {
                group[i] = m++;
            }
        }

        List<Integer>[] itemAdj = new ArrayList[n];
        List<Integer>[] groupAdj = new ArrayList[m];
        for (int i = 0; i < n; i++) {
            itemAdj[i] = new ArrayList<>();
        }
        for (int i = 0; i < m; i++) {
            groupAdj[i] = new ArrayList<>();
        }

        for (int i = 0; i < n; i++) {
            for (int parent : beforeItems.get(i)) {
                itemAdj[parent].add(i);
                if (group[i] != group[parent]) {
                    groupAdj[group[parent]].add(group[i]);
                }
            }
        }

        List<Integer> itm = topoSort(itemAdj, n);
        if (itm.isEmpty()) return new int[]{};
        List<Integer> grp = topoSort(groupAdj, m);
        if (grp.isEmpty()) return new int[]{};

        List<Integer>[] grouping = new ArrayList[m];
        for (int i = 0; i < m; i++) {
            grouping[i] = new ArrayList<>();
        }
        for (int i : itm) {
            grouping[group[i]].add(i);
        }

        List<Integer> res = new ArrayList<>();
        for (int g : grp) {
            res.addAll(grouping[g]);
        }

        return res.stream().mapToInt(Integer::intValue).toArray();
    }

    private List<Integer> topoSort(List<Integer>[] adj, int N) {
        int[] visited = new int[N];
        List<Integer> topo = new ArrayList<>();

        for (int i = 0; i < N; i++) {
            if (visited[i] == 0) {
                if (dfs(i, adj, visited, topo)) {
                    return new ArrayList<>();
                }
            }
        }

        Collections.reverse(topo);
        return topo;
    }

    private boolean dfs(int node, List<Integer>[] adj, int[] visited, List<Integer> topo) {
        if (visited[node] == 1) return true;
        if (visited[node] == 2) return false;
        visited[node] = 1;
        for (int neighbor : adj[node]) {
            if (dfs(neighbor, adj, visited, topo)) {
                return true;
            }
        }
        topo.add(node);
        visited[node] = 2;
        return false;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortItems(int n, int m, vector<int>& group, vector<vector<int>>& beforeItems) {
        for (int i = 0; i < n; ++i) {
            if (group[i] == -1) {
                group[i] = m++;
            }
        }

        vector<vector<int>> itemAdj(n), groupAdj(m);
        for (int i = 0; i < n; ++i) {
            for (int parent : beforeItems[i]) {
                itemAdj[parent].push_back(i);
                if (group[i] != group[parent]) {
                    groupAdj[group[parent]].push_back(group[i]);
                }
            }
        }

        vector<int> itm = topoSort(itemAdj, n);
        if (itm.empty()) return {};
        vector<int> grp = topoSort(groupAdj, m);
        if (grp.empty()) return {};

        unordered_map<int, vector<int>> grouping;
        for (int i : itm) {
            grouping[group[i]].push_back(i);
        }

        vector<int> res;
        for (int& g : grp) {
            res.insert(res.end(), grouping[g].begin(), grouping[g].end());
        }

        return res;
    }

private:
    vector<int> topoSort(const vector<vector<int>>& adj, int N) {
        vector<int> visited(N, 0), topo;
        function<bool(int)> dfs = [&](int node) {
            if (visited[node] == 1) return true;
            if (visited[node] == 2) return false;
            visited[node] = 1;
            for (int neighbor : adj[node]) {
                if (dfs(neighbor)) return true;
            }
            topo.push_back(node);
            visited[node] = 2;
            return false;
        };

        for (int i = 0; i < N; ++i) {
            if (visited[i] == 0 && dfs(i)) {
                return {};
            }
        }

        reverse(topo.begin(), topo.end());
        return topo;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} m
     * @param {number[]} group
     * @param {number[][]} beforeItems
     * @return {number[]}
     */
    sortItems(n, m, group, beforeItems) {
        for (let i = 0; i < n; i++) {
            if (group[i] === -1) {
                group[i] = m++;
            }
        }

        const itemAdj = Array.from({ length: n }, () => []);
        const groupAdj = Array.from({ length: m }, () => []);
        for (let i = 0; i < n; i++) {
            for (const parent of beforeItems[i]) {
                itemAdj[parent].push(i);
                if (group[i] !== group[parent]) {
                    groupAdj[group[parent]].push(group[i]);
                }
            }
        }

        const itm = this.topoSort(itemAdj, n);
        if (!itm.length) return [];
        const grp = this.topoSort(groupAdj, m);
        if (!grp.length) return [];

        const grouping = {};
        for (const i of itm) {
            if (!grouping[group[i]]) grouping[group[i]] = [];
            grouping[group[i]].push(i);
        }

        const res = [];
        for (const g of grp) {
            if (grouping[g]) res.push(...grouping[g]);
        }

        return res;
    }

    /**
     * @param {number[][]} adj
     * @param {number} N
     * @return {number[]}
     */
    topoSort(adj, N) {
        const visited = new Array(N).fill(0);
        const topo = [];

        const dfs = (node) => {
            if (visited[node] === 1) return true;
            if (visited[node] === 2) return false;
            visited[node] = 1;
            for (const neighbor of adj[node]) {
                if (dfs(neighbor)) return true;
            }
            topo.push(node);
            visited[node] = 2;
            return false;
        };

        for (let i = 0; i < N; i++) {
            if (visited[i] === 0 && dfs(i)) {
                return [];
            }
        }

        return topo.reverse();
    }
}
```

```csharp
public class Solution {
    public int[] SortItems(int n, int m, int[] group, IList<IList<int>> beforeItems) {
        for (int i = 0; i < n; i++) {
            if (group[i] == -1) {
                group[i] = m++;
            }
        }

        List<int>[] itemAdj = new List<int>[n];
        List<int>[] groupAdj = new List<int>[m];
        for (int i = 0; i < n; i++) itemAdj[i] = new List<int>();
        for (int i = 0; i < m; i++) groupAdj[i] = new List<int>();

        for (int i = 0; i < n; i++) {
            foreach (int parent in beforeItems[i]) {
                itemAdj[parent].Add(i);
                if (group[i] != group[parent]) {
                    groupAdj[group[parent]].Add(group[i]);
                }
            }
        }

        List<int> itm = TopoSort(itemAdj, n);
        if (itm.Count == 0) return new int[0];
        List<int> grp = TopoSort(groupAdj, m);
        if (grp.Count == 0) return new int[0];

        List<int>[] grouping = new List<int>[m];
        for (int i = 0; i < m; i++) grouping[i] = new List<int>();
        foreach (int i in itm) {
            grouping[group[i]].Add(i);
        }

        List<int> res = new List<int>();
        foreach (int g in grp) {
            res.AddRange(grouping[g]);
        }

        return res.ToArray();
    }

    private List<int> TopoSort(List<int>[] adj, int N) {
        int[] visited = new int[N];
        List<int> topo = new List<int>();

        for (int i = 0; i < N; i++) {
            if (visited[i] == 0 && Dfs(i, adj, visited, topo)) {
                return new List<int>();
            }
        }

        topo.Reverse();
        return topo;
    }

    private bool Dfs(int node, List<int>[] adj, int[] visited, List<int> topo) {
        if (visited[node] == 1) return true;
        if (visited[node] == 2) return false;
        visited[node] = 1;
        foreach (int neighbor in adj[node]) {
            if (Dfs(neighbor, adj, visited, topo)) {
                return true;
            }
        }
        topo.Add(node);
        visited[node] = 2;
        return false;
    }
}
```

```go
func sortItems(n int, m int, group []int, beforeItems [][]int) []int {
    for i := 0; i < n; i++ {
        if group[i] == -1 {
            group[i] = m
            m++
        }
    }

    itemAdj := make([][]int, n)
    groupAdj := make([][]int, m)
    for i := 0; i < n; i++ {
        itemAdj[i] = []int{}
    }
    for i := 0; i < m; i++ {
        groupAdj[i] = []int{}
    }

    for i := 0; i < n; i++ {
        for _, parent := range beforeItems[i] {
            itemAdj[parent] = append(itemAdj[parent], i)
            if group[i] != group[parent] {
                groupAdj[group[parent]] = append(groupAdj[group[parent]], group[i])
            }
        }
    }

    itm := topoSort(itemAdj, n)
    if len(itm) == 0 {
        return []int{}
    }
    grp := topoSort(groupAdj, m)
    if len(grp) == 0 {
        return []int{}
    }

    grouping := make([][]int, m)
    for i := 0; i < m; i++ {
        grouping[i] = []int{}
    }
    for _, i := range itm {
        grouping[group[i]] = append(grouping[group[i]], i)
    }

    res := []int{}
    for _, g := range grp {
        res = append(res, grouping[g]...)
    }

    return res
}

func topoSort(adj [][]int, N int) []int {
    visited := make([]int, N)
    topo := []int{}

    var dfs func(node int) bool
    dfs = func(node int) bool {
        if visited[node] == 1 {
            return true
        }
        if visited[node] == 2 {
            return false
        }
        visited[node] = 1
        for _, neighbor := range adj[node] {
            if dfs(neighbor) {
                return true
            }
        }
        topo = append(topo, node)
        visited[node] = 2
        return false
    }

    for i := 0; i < N; i++ {
        if visited[i] == 0 && dfs(i) {
            return []int{}
        }
    }

    for i, j := 0, len(topo)-1; i < j; i, j = i+1, j-1 {
        topo[i], topo[j] = topo[j], topo[i]
    }
    return topo
}
```

```kotlin
class Solution {
    fun sortItems(n: Int, m: Int, group: IntArray, beforeItems: List<List<Int>>): IntArray {
        var mVar = m
        for (i in 0 until n) {
            if (group[i] == -1) {
                group[i] = mVar++
            }
        }

        val itemAdj = Array(n) { mutableListOf<Int>() }
        val groupAdj = Array(mVar) { mutableListOf<Int>() }

        for (i in 0 until n) {
            for (parent in beforeItems[i]) {
                itemAdj[parent].add(i)
                if (group[i] != group[parent]) {
                    groupAdj[group[parent]].add(group[i])
                }
            }
        }

        val itm = topoSort(itemAdj, n)
        if (itm.isEmpty()) return intArrayOf()
        val grp = topoSort(groupAdj, mVar)
        if (grp.isEmpty()) return intArrayOf()

        val grouping = Array(mVar) { mutableListOf<Int>() }
        for (i in itm) {
            grouping[group[i]].add(i)
        }

        val res = mutableListOf<Int>()
        for (g in grp) {
            res.addAll(grouping[g])
        }

        return res.toIntArray()
    }

    private fun topoSort(adj: Array<MutableList<Int>>, N: Int): List<Int> {
        val visited = IntArray(N)
        val topo = mutableListOf<Int>()

        fun dfs(node: Int): Boolean {
            if (visited[node] == 1) return true
            if (visited[node] == 2) return false
            visited[node] = 1
            for (neighbor in adj[node]) {
                if (dfs(neighbor)) return true
            }
            topo.add(node)
            visited[node] = 2
            return false
        }

        for (i in 0 until N) {
            if (visited[i] == 0 && dfs(i)) {
                return emptyList()
            }
        }

        return topo.reversed()
    }
}
```

```swift
class Solution {
    func sortItems(_ n: Int, _ m: Int, _ group: [Int], _ beforeItems: [[Int]]) -> [Int] {
        var m = m
        var group = group
        for i in 0..<n {
            if group[i] == -1 {
                group[i] = m
                m += 1
            }
        }

        var itemAdj = [[Int]](repeating: [], count: n)
        var groupAdj = [[Int]](repeating: [], count: m)

        for i in 0..<n {
            for parent in beforeItems[i] {
                itemAdj[parent].append(i)
                if group[i] != group[parent] {
                    groupAdj[group[parent]].append(group[i])
                }
            }
        }

        let itm = topoSort(itemAdj, n)
        if itm.isEmpty { return [] }
        let grp = topoSort(groupAdj, m)
        if grp.isEmpty { return [] }

        var grouping = [[Int]](repeating: [], count: m)
        for i in itm {
            grouping[group[i]].append(i)
        }

        var res = [Int]()
        for g in grp {
            res.append(contentsOf: grouping[g])
        }

        return res
    }

    private func topoSort(_ adj: [[Int]], _ N: Int) -> [Int] {
        var visited = [Int](repeating: 0, count: N)
        var topo = [Int]()

        func dfs(_ node: Int) -> Bool {
            if visited[node] == 1 { return true }
            if visited[node] == 2 { return false }
            visited[node] = 1
            for neighbor in adj[node] {
                if dfs(neighbor) { return true }
            }
            topo.append(node)
            visited[node] = 2
            return false
        }

        for i in 0..<N {
            if visited[i] == 0 && dfs(i) {
                return []
            }
        }

        return topo.reversed()
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of items and $E$ is the total number of $beforeItems$ dependencies.

---

## 2. Topological Sort (Kahn's Algorithm)

### Intuition

Kahn's algorithm offers an iterative approach to topological sorting using in-degrees. Nodes with no incoming edges (in-degree 0) can be processed first. As we process each node, we reduce the in-degree of its neighbors. This BFS-style approach naturally detects cycles: if we cannot process all nodes, a cycle exists.

### Algorithm

1. Assign unique group IDs to ungrouped items.
2. Build item and group adjacency lists, tracking `indegree` for both.
3. For the item graph, add an edge from each prerequisite to the dependent item.
4. For the group graph, add an edge when a dependency crosses group boundaries.
5. Perform Kahn's algorithm on items:
   - Start with all items having `indegree` `0`.
   - Process items, reducing `indegree`s of neighbors.
   - If the result size does not equal `n`, return empty (cycle detected).
6. Perform Kahn's algorithm on groups similarly.
7. Group the topologically sorted items by their group ID.
8. Output items in group topological order.

::tabs-start

```python
class Solution:
    def sortItems(self, n, m, group, beforeItems):
        for i in range(n):
            if group[i] == -1:
                group[i] = m
                m += 1

        item_adj = defaultdict(list)
        group_adj = defaultdict(list)
        item_indegree = [0] * n
        group_indegree = [0] * m

        for i in range(n):
            for par in beforeItems[i]:
                item_adj[par].append(i)
                item_indegree[i] += 1
                if group[i] != group[par]:
                    group_adj[group[par]].append(group[i])
                    group_indegree[group[i]] += 1

        itm = self.topo_sort(item_adj, item_indegree, n)
        if not itm: return []
        grp = self.topo_sort(group_adj, group_indegree, m)
        if not grp: return []

        grouping = defaultdict(list)
        for i in itm:
            grouping[group[i]].append(i)

        res = []
        for g in grp:
            res.extend(grouping[g])

        return res

    def topo_sort(self, adj, indegree, N):
        topo = []
        q = deque([i for i in range(N) if indegree[i] == 0])

        while q:
            node = q.popleft()
            topo.append(node)
            for neighbor in adj[node]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    q.append(neighbor)

        return topo if len(topo) == N else []
```

```java
public class Solution {
    public int[] sortItems(int n, int m, int[] group, List<List<Integer>> beforeItems) {
        for (int i = 0; i < n; i++) {
            if (group[i] == -1) {
                group[i] = m++;
            }
        }

        List<List<Integer>> itemAdj = new ArrayList<>();
        List<List<Integer>> groupAdj = new ArrayList<>();
        for (int i = 0; i < n; i++) itemAdj.add(new ArrayList<>());
        for (int i = 0; i < m; i++) groupAdj.add(new ArrayList<>());

        int[] itemIndegree = new int[n];
        int[] groupIndegree = new int[m];

        for (int i = 0; i < n; i++) {
            for (int par : beforeItems.get(i)) {
                itemAdj.get(par).add(i);
                itemIndegree[i]++;
                if (group[i] != group[par]) {
                    groupAdj.get(group[par]).add(group[i]);
                    groupIndegree[group[i]]++;
                }
            }
        }

        List<Integer> itm = topoSort(itemAdj, itemIndegree, n);
        if (itm.isEmpty()) return new int[0];
        List<Integer> grp = topoSort(groupAdj, groupIndegree, m);
        if (grp.isEmpty()) return new int[0];

        Map<Integer, List<Integer>> grouping = new HashMap<>();
        for (int i : itm) {
            grouping.computeIfAbsent(group[i], x -> new ArrayList<>()).add(i);
        }

        List<Integer> res = new ArrayList<>();
        for (int g : grp) {
            res.addAll(grouping.getOrDefault(g, new ArrayList<>()));
        }

        return res.stream().mapToInt(Integer::intValue).toArray();
    }

    private List<Integer> topoSort(List<List<Integer>> adj, int[] indegree, int N) {
        Queue<Integer> q = new LinkedList<>();
        List<Integer> topo = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            if (indegree[i] == 0) q.add(i);
        }

        while (!q.isEmpty()) {
            int node = q.poll();
            topo.add(node);
            for (int neighbor : adj.get(node)) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) q.add(neighbor);
            }
        }

        return topo.size() == N ? topo : new ArrayList<>();
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortItems(int n, int m, vector<int>& group, vector<vector<int>>& beforeItems) {
        for (int i = 0; i < n; i++) {
            if (group[i] == -1) group[i] = m++;
        }

        vector<vector<int>> itemAdj(n), groupAdj(m);
        vector<int> itemIndegree(n, 0), groupIndegree(m, 0);

        for (int i = 0; i < n; i++) {
            for (int& par : beforeItems[i]) {
                itemAdj[par].push_back(i);
                itemIndegree[i]++;
                if (group[i] != group[par]) {
                    groupAdj[group[par]].push_back(group[i]);
                    groupIndegree[group[i]]++;
                }
            }
        }

        vector<int> itm = topoSort(itemAdj, itemIndegree, n);
        if (itm.empty()) return {};
        vector<int> grp = topoSort(groupAdj, groupIndegree, m);
        if (grp.empty()) return {};

        unordered_map<int, vector<int>> grouping;
        for (int& i : itm) {
            grouping[group[i]].push_back(i);
        }

        vector<int> res;
        for (int& g : grp) {
            res.insert(res.end(), grouping[g].begin(), grouping[g].end());
        }

        return res;
    }

private:
    vector<int> topoSort(vector<vector<int>>& adj, vector<int>& indegree, int N) {
        queue<int> q;
        vector<int> topo;
        for (int i = 0; i < N; i++) {
            if (indegree[i] == 0) q.push(i);
        }

        while (!q.empty()) {
            int node = q.front(); q.pop();
            topo.push_back(node);
            for (int& neighbor : adj[node]) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) q.push(neighbor);
            }
        }

        return topo.size() == N ? topo : vector<int>();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} m
     * @param {number[]} group
     * @param {number[][]} beforeItems
     * @return {number[]}
     */
    sortItems(n, m, group, beforeItems) {
        for (let i = 0; i < n; i++) {
            if (group[i] === -1) group[i] = m++;
        }

        const itemAdj = Array.from({ length: n }, () => []);
        const groupAdj = Array.from({ length: m }, () => []);
        const itemIndegree = Array(n).fill(0);
        const groupIndegree = Array(m).fill(0);

        for (let i = 0; i < n; i++) {
            for (const par of beforeItems[i]) {
                itemAdj[par].push(i);
                itemIndegree[i]++;
                if (group[i] !== group[par]) {
                    groupAdj[group[par]].push(group[i]);
                    groupIndegree[group[i]]++;
                }
            }
        }

        const itm = this.topoSort(itemAdj, itemIndegree, n);
        if (itm.length === 0) return [];
        const grp = this.topoSort(groupAdj, groupIndegree, m);
        if (grp.length === 0) return [];

        const grouping = new Map();
        for (const i of itm) {
            if (!grouping.has(group[i])) grouping.set(group[i], []);
            grouping.get(group[i]).push(i);
        }

        const res = [];
        for (const g of grp) {
            if (grouping.has(g)) res.push(...grouping.get(g));
        }

        return res;
    }

    /**
     * @param {number[][]} adj
     * @param {number[]} indegree
     * @param {number} N
     * @return {number[]}
     */
    topoSort(adj, indegree, N) {
        const q = new Queue();
        const topo = [];
        for (let i = 0; i < N; i++) {
            if (indegree[i] === 0) q.push(i);
        }

        while (!q.isEmpty()) {
            const node = q.pop();
            topo.push(node);
            for (const neighbor of adj[node]) {
                indegree[neighbor]--;
                if (indegree[neighbor] === 0) q.push(neighbor);
            }
        }

        return topo.length === N ? topo : [];
    }
}
```

```csharp
public class Solution {
    public int[] SortItems(int n, int m, int[] group, IList<IList<int>> beforeItems) {
        for (int i = 0; i < n; i++) {
            if (group[i] == -1) group[i] = m++;
        }

        List<List<int>> itemAdj = new List<List<int>>();
        List<List<int>> groupAdj = new List<List<int>>();
        for (int i = 0; i < n; i++) itemAdj.Add(new List<int>());
        for (int i = 0; i < m; i++) groupAdj.Add(new List<int>());

        int[] itemIndegree = new int[n];
        int[] groupIndegree = new int[m];

        for (int i = 0; i < n; i++) {
            foreach (int par in beforeItems[i]) {
                itemAdj[par].Add(i);
                itemIndegree[i]++;
                if (group[i] != group[par]) {
                    groupAdj[group[par]].Add(group[i]);
                    groupIndegree[group[i]]++;
                }
            }
        }

        List<int> itm = TopoSort(itemAdj, itemIndegree, n);
        if (itm.Count == 0) return new int[0];
        List<int> grp = TopoSort(groupAdj, groupIndegree, m);
        if (grp.Count == 0) return new int[0];

        Dictionary<int, List<int>> grouping = new Dictionary<int, List<int>>();
        foreach (int i in itm) {
            if (!grouping.ContainsKey(group[i])) grouping[group[i]] = new List<int>();
            grouping[group[i]].Add(i);
        }

        List<int> res = new List<int>();
        foreach (int g in grp) {
            if (grouping.ContainsKey(g)) res.AddRange(grouping[g]);
        }

        return res.ToArray();
    }

    private List<int> TopoSort(List<List<int>> adj, int[] indegree, int N) {
        Queue<int> q = new Queue<int>();
        List<int> topo = new List<int>();
        for (int i = 0; i < N; i++) {
            if (indegree[i] == 0) q.Enqueue(i);
        }

        while (q.Count > 0) {
            int node = q.Dequeue();
            topo.Add(node);
            foreach (int neighbor in adj[node]) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) q.Enqueue(neighbor);
            }
        }

        return topo.Count == N ? topo : new List<int>();
    }
}
```

```go
func sortItems(n int, m int, group []int, beforeItems [][]int) []int {
    for i := 0; i < n; i++ {
        if group[i] == -1 {
            group[i] = m
            m++
        }
    }

    itemAdj := make([][]int, n)
    groupAdj := make([][]int, m)
    for i := 0; i < n; i++ {
        itemAdj[i] = []int{}
    }
    for i := 0; i < m; i++ {
        groupAdj[i] = []int{}
    }

    itemIndegree := make([]int, n)
    groupIndegree := make([]int, m)

    for i := 0; i < n; i++ {
        for _, par := range beforeItems[i] {
            itemAdj[par] = append(itemAdj[par], i)
            itemIndegree[i]++
            if group[i] != group[par] {
                groupAdj[group[par]] = append(groupAdj[group[par]], group[i])
                groupIndegree[group[i]]++
            }
        }
    }

    itm := topoSort(itemAdj, itemIndegree, n)
    if len(itm) == 0 {
        return []int{}
    }
    grp := topoSort(groupAdj, groupIndegree, m)
    if len(grp) == 0 {
        return []int{}
    }

    grouping := make(map[int][]int)
    for _, i := range itm {
        grouping[group[i]] = append(grouping[group[i]], i)
    }

    res := []int{}
    for _, g := range grp {
        res = append(res, grouping[g]...)
    }

    return res
}

func topoSort(adj [][]int, indegree []int, N int) []int {
    q := []int{}
    topo := []int{}
    for i := 0; i < N; i++ {
        if indegree[i] == 0 {
            q = append(q, i)
        }
    }

    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        topo = append(topo, node)
        for _, neighbor := range adj[node] {
            indegree[neighbor]--
            if indegree[neighbor] == 0 {
                q = append(q, neighbor)
            }
        }
    }

    if len(topo) == N {
        return topo
    }
    return []int{}
}
```

```kotlin
class Solution {
    fun sortItems(n: Int, m: Int, group: IntArray, beforeItems: List<List<Int>>): IntArray {
        var mVar = m
        for (i in 0 until n) {
            if (group[i] == -1) group[i] = mVar++
        }

        val itemAdj = MutableList(n) { mutableListOf<Int>() }
        val groupAdj = MutableList(mVar) { mutableListOf<Int>() }
        val itemIndegree = IntArray(n)
        val groupIndegree = IntArray(mVar)

        for (i in 0 until n) {
            for (par in beforeItems[i]) {
                itemAdj[par].add(i)
                itemIndegree[i]++
                if (group[i] != group[par]) {
                    groupAdj[group[par]].add(group[i])
                    groupIndegree[group[i]]++
                }
            }
        }

        val itm = topoSort(itemAdj, itemIndegree, n)
        if (itm.isEmpty()) return intArrayOf()
        val grp = topoSort(groupAdj, groupIndegree, mVar)
        if (grp.isEmpty()) return intArrayOf()

        val grouping = mutableMapOf<Int, MutableList<Int>>()
        for (i in itm) {
            grouping.getOrPut(group[i]) { mutableListOf() }.add(i)
        }

        val res = mutableListOf<Int>()
        for (g in grp) {
            grouping[g]?.let { res.addAll(it) }
        }

        return res.toIntArray()
    }

    private fun topoSort(adj: MutableList<MutableList<Int>>, indegree: IntArray, N: Int): List<Int> {
        val q = ArrayDeque<Int>()
        val topo = mutableListOf<Int>()
        for (i in 0 until N) {
            if (indegree[i] == 0) q.add(i)
        }

        while (q.isNotEmpty()) {
            val node = q.removeFirst()
            topo.add(node)
            for (neighbor in adj[node]) {
                indegree[neighbor]--
                if (indegree[neighbor] == 0) q.add(neighbor)
            }
        }

        return if (topo.size == N) topo else emptyList()
    }
}
```

```swift
class Solution {
    func sortItems(_ n: Int, _ m: Int, _ group: [Int], _ beforeItems: [[Int]]) -> [Int] {
        var m = m
        var group = group
        for i in 0..<n {
            if group[i] == -1 {
                group[i] = m
                m += 1
            }
        }

        var itemAdj = [[Int]](repeating: [], count: n)
        var groupAdj = [[Int]](repeating: [], count: m)
        var itemIndegree = [Int](repeating: 0, count: n)
        var groupIndegree = [Int](repeating: 0, count: m)

        for i in 0..<n {
            for par in beforeItems[i] {
                itemAdj[par].append(i)
                itemIndegree[i] += 1
                if group[i] != group[par] {
                    groupAdj[group[par]].append(group[i])
                    groupIndegree[group[i]] += 1
                }
            }
        }

        let itm = topoSort(itemAdj, &itemIndegree, n)
        if itm.isEmpty { return [] }
        let grp = topoSort(groupAdj, &groupIndegree, m)
        if grp.isEmpty { return [] }

        var grouping = [Int: [Int]]()
        for i in itm {
            grouping[group[i], default: []].append(i)
        }

        var res = [Int]()
        for g in grp {
            if let items = grouping[g] {
                res.append(contentsOf: items)
            }
        }

        return res
    }

    private func topoSort(_ adj: [[Int]], _ indegree: inout [Int], _ N: Int) -> [Int] {
        var q = [Int]()
        var topo = [Int]()
        for i in 0..<N {
            if indegree[i] == 0 {
                q.append(i)
            }
        }

        while !q.isEmpty {
            let node = q.removeFirst()
            topo.append(node)
            for neighbor in adj[node] {
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0 {
                    q.append(neighbor)
                }
            }
        }

        return topo.count == N ? topo : []
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of items and $E$ is the total number of $beforeItems$ dependencies.

## Common Pitfalls

### Forgetting to Assign Unique Group IDs to Ungrouped Items

Items with `group[i] == -1` must each be assigned a unique group ID. A common mistake is to either skip these items or assign them all to the same group. If ungrouped items share a group ID, they will be forced to appear consecutively in the output, which may violate dependency constraints.

### Only Performing One Level of Topological Sort

This problem requires two separate topological sorts: one for items within groups and one for the groups themselves. Attempting to solve it with a single topological sort will fail because it cannot properly handle the constraint that items in the same group must appear consecutively.

### Ignoring Cross-Group Dependencies When Building the Group Graph

When item A depends on item B and they belong to different groups, B's group must come before A's group. Forgetting to add edges to the group graph for cross-group dependencies will result in incorrect group ordering and wrong answers.

### Not Detecting Cycles in Both Graphs

Cycles can exist in either the item graph or the group graph. If a cycle exists in either graph, no valid ordering exists and an empty array should be returned. Failing to check for cycles in both graphs can lead to infinite loops or incorrect outputs.

### Incorrect Handling of Empty Groups

After topological sorting, some groups may have no items assigned to them. When iterating through the sorted groups to build the final result, failing to handle empty groups gracefully can cause errors or incorrect output.
