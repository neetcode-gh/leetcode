## 1. Depth First Search - I

::tabs-start

```python
class Solution:
    def minReorder(self, n: int, connections: List[List[int]]) -> int:
        edges = {(a, b) for a, b in connections}
        neighbors = {city: [] for city in range(n)}
        visit = set()
        changes = 0

        for a, b in connections:
            neighbors[a].append(b)
            neighbors[b].append(a)

        def dfs(city):
            nonlocal changes
            visit.add(city)
            for neighbor in neighbors[city]:
                if neighbor in visit:
                    continue
                if (neighbor, city) not in edges:
                    changes += 1
                dfs(neighbor)

        dfs(0)
        return changes
```

```java
public class Solution {
    private Map<Integer, List<Integer>> neighbors;
    private boolean[] visit;
    private Set<String> edges;

    public int minReorder(int n, int[][] connections) {
        edges = new HashSet<>();
        neighbors = new HashMap<>();
        visit = new boolean[n];
        int[] changes = {0};

        for (int[] conn : connections) {
            int a = conn[0], b = conn[1];
            edges.add(a + "," + b);
            neighbors.computeIfAbsent(a, k -> new ArrayList<>()).add(b);
            neighbors.computeIfAbsent(b, k -> new ArrayList<>()).add(a);
        }

        dfs(0, changes);
        return changes[0];
    }

    private void dfs(int city, int[] changes) {
        visit[city] = true;
        for (int neighbor : neighbors.get(city)) {
            if (visit[neighbor]) continue;
            if (!edges.contains(neighbor + "," + city)) {
                changes[0]++;
            }
            dfs(neighbor, changes);
        }
    }
}
```

```cpp
class Solution {
public:
    int minReorder(int n, vector<vector<int>>& connections) {
        unordered_set<string> edges;
        unordered_map<int, vector<int>> neighbors;
        vector<bool> visit(n, false);
        int changes = 0;

        for (auto& c : connections) {
            edges.insert(to_string(c[0]) + "," + to_string(c[1]));
            neighbors[c[0]].push_back(c[1]);
            neighbors[c[1]].push_back(c[0]);
        }

        function<void(int)> dfs = [&](int city) {
            visit[city] = true;
            for (int neighbor : neighbors[city]) {
                if (visit[neighbor]) continue;
                if (edges.find(to_string(neighbor) + "," + to_string(city)) == edges.end()) {
                    changes++;
                }
                dfs(neighbor);
            }
        };

        dfs(0);
        return changes;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} connections
     * @return {number}
     */
    minReorder(n, connections) {
        const edges = new Set();
        const neighbors = Array.from({ length: n }, () => []);
        const visit = new Array(n).fill(false);
        let changes = 0;

        for (const [a, b] of connections) {
            edges.add(`${a},${b}`);
            neighbors[a].push(b);
            neighbors[b].push(a);
        }

        const dfs = (city) => {
            visit[city] = true;
            for (const neighbor of neighbors[city]) {
                if (visit[neighbor]) continue;
                if (!edges.has(`${neighbor},${city}`)) changes++;
                dfs(neighbor);
            }
        };

        dfs(0);
        return changes;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Depth First Search - II

::tabs-start

```python
class Solution:
    def minReorder(self, n: int, connections: List[List[int]]) -> int:
        adj = [[] for _ in range(n)]
        for u, v in connections:
            adj[u].append(v)
            adj[v].append(-u)

        def dfs(node, parent):
            changes = 0
            for nei in adj[node]:
                if abs(nei) == parent:
                    continue
                changes += dfs(abs(nei), node) + (nei > 0)
            return changes

        return dfs(0, -1)
```

```java
public class Solution {
    public int minReorder(int n, int[][] connections) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());

        for (int[] conn : connections) {
            adj.get(conn[0]).add(conn[1]);
            adj.get(conn[1]).add(-conn[0]);
        }

        return dfs(0, -1, adj);
    }

    private int dfs(int node, int parent, List<List<Integer>> adj) {
        int changes = 0;
        for (int nei : adj.get(node)) {
            if (Math.abs(nei) == parent) continue;
            changes += dfs(Math.abs(nei), node, adj) + (nei > 0 ? 1 : 0);
        }
        return changes;
    }
}
```

```cpp
class Solution {
public:
    int minReorder(int n, vector<vector<int>>& connections) {
        vector<vector<int>> adj(n);
        for (auto& conn : connections) {
            int u = conn[0], v = conn[1];
            adj[u].push_back(v);
            adj[v].push_back(-u);
        }

        return dfs(0, -1, adj);
    }

private:
    int dfs(int node, int parent, vector<vector<int>>& adj) {
        int changes = 0;
        for (int nei : adj[node]) {
            if (abs(nei) == parent) continue;
            changes += dfs(abs(nei), node, adj) + (nei > 0);
        }
        return changes;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} connections
     * @return {number}
     */
    minReorder(n, connections) {
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of connections) {
            adj[u].push(v);
            adj[v].push(-u);
        }

        const dfs = (node, parent) => {
            let changes = 0;
            for (const nei of adj[node]) {
                if (Math.abs(nei) === parent) continue;
                changes += dfs(Math.abs(nei), node) + (nei > 0 ? 1 : 0);
            }
            return changes;
        };

        return dfs(0, -1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Breadth First Search

::tabs-start

```python
class Solution:
    def minReorder(self, n: int, connections: List[List[int]]) -> int:
        adj = [[] for _ in range(n)]
        for u, v in connections:
            adj[u].append((v, 1))
            adj[v].append((u, 0))

        visit = [False] * n
        queue = deque([0])
        visit[0] = True
        changes = 0

        while queue:
            node = queue.popleft()
            for neighbor, isForward in adj[node]:
                if not visit[neighbor]:
                    visit[neighbor] = True
                    changes += isForward
                    queue.append(neighbor)
        return changes
```

```java
public class Solution {
    public int minReorder(int n, int[][] connections) {
        List<int[]>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();

        for (int[] conn : connections) {
            adj[conn[0]].add(new int[]{conn[1], 1});
            adj[conn[1]].add(new int[]{conn[0], 0});
        }

        boolean[] visited = new boolean[n];
        Queue<Integer> queue = new LinkedList<>();
        queue.add(0);
        visited[0] = true;
        int changes = 0;

        while (!queue.isEmpty()) {
            int node = queue.poll();
            for (int[] edge : adj[node]) {
                int neighbor = edge[0], isForward = edge[1];
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    changes += isForward;
                    queue.add(neighbor);
                }
            }
        }
        return changes;
    }
}
```

```cpp
class Solution {
public:
    int minReorder(int n, vector<vector<int>>& connections) {
        vector<vector<pair<int, int>>> adj(n);
        for (auto& conn : connections) {
            adj[conn[0]].push_back({conn[1], 1});
            adj[conn[1]].push_back({conn[0], 0});
        }

        vector<bool> visit(n, false);
        queue<int> q;
        q.push(0);
        visit[0] = true;
        int changes = 0;

        while (!q.empty()) {
            int node = q.front();
            q.pop();
            for (auto& [neighbor, isForward] : adj[node]) {
                if (!visit[neighbor]) {
                    visit[neighbor] = true;
                    changes += isForward;
                    q.push(neighbor);
                }
            }
        }
        return changes;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} connections
     * @return {number}
     */
    minReorder(n, connections) {
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of connections) {
            adj[u].push([v, 1]);
            adj[v].push([u, 0]);
        }

        const visited = Array(n).fill(false);
        const queue = new Queue();
        queue.push(0);
        visited[0] = true;
        let changes = 0;

        while (!queue.isEmpty()) {
            const node = queue.pop();
            for (const [neighbor, isForward] of adj[node]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    changes += isForward;
                    queue.push(neighbor);
                }
            }
        }
        return changes;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
