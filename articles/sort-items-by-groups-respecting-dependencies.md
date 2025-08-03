## 1. Topological Sort (DFS)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of items and $E$ is the total number of $beforeItems$ dependencies.

---

## 2. Topological Sort (Kahn's Algorithm)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of items and $E$ is the total number of $beforeItems$ dependencies.
