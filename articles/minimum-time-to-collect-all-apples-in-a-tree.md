## 1. Depth First Search

::tabs-start

```python
class Solution:
    def minTime(self, n: int, edges: List[List[int]], hasApple: List[bool]) -> int:
        adj = {i: [] for i in range(n)}
        for par, child in edges:
            adj[par].append(child)
            adj[child].append(par)

        def dfs(cur, par):
            time = 0
            for child in adj[cur]:
                if child == par:
                    continue
                childTime = dfs(child, cur)
                if childTime > 0 or hasApple[child]:
                    time += 2 + childTime
            return time

        return dfs(0, -1)
```

```java
public class Solution {
    public int minTime(int n, int[][] edges, List<Boolean> hasApple) {
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
            adj[edge[1]].add(edge[0]);
        }

        return dfs(0, -1, adj, hasApple);
    }

    private int dfs(int cur, int parent, List<Integer>[] adj, List<Boolean> hasApple) {
        int time = 0;
        for (int child : adj[cur]) {
            if (child == parent) continue;
            int childTime = dfs(child, cur, adj, hasApple);
            if (childTime > 0 || hasApple.get(child)) {
                time += 2 + childTime;
            }
        }
        return time;
    }
}
```

```cpp
class Solution {
public:
    int minTime(int n, vector<vector<int>>& edges, vector<bool>& hasApple) {
        vector<vector<int>> adj(n);
        for (const auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        return dfs(0, -1, adj, hasApple);
    }

private:
    int dfs(int cur, int parent, vector<vector<int>>& adj, vector<bool>& hasApple) {
        int time = 0;
        for (int child : adj[cur]) {
            if (child == parent) continue;
            int childTime = dfs(child, cur, adj, hasApple);
            if (childTime > 0 || hasApple[child]) {
                time += 2 + childTime;
            }
        }
        return time;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @param {boolean[]} hasApple
     * @return {number}
     */
    minTime(n, edges, hasApple) {
        const adj = Array.from({ length: n }, () => []);
        for (const [parent, child] of edges) {
            adj[parent].push(child);
            adj[child].push(parent);
        }

        const dfs = (cur, parent) => {
            let time = 0;
            for (const child of adj[cur]) {
                if (child === parent) continue;
                const childTime = dfs(child, cur);
                if (childTime > 0 || hasApple[child]) {
                    time += 2 + childTime;
                }
            }
            return time;
        };

        return dfs(0, -1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 2. Topological Sort (Kahn's Algorithm)

::tabs-start

```python
class Solution:
    def minTime(self, n: int, edges: List[List[int]], hasApple: List[bool]) -> int:
        adj = defaultdict(list)
        indegree = [0] * n
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            indegree[u] += 1
            indegree[v] += 1

        queue = deque()
        for i in range(1, n):
            if indegree[i] == 1:
                queue.append(i)
                indegree[i] = 0

        time = [0] * n
        while queue:
            node = queue.popleft()
            for nei in adj[node]:
                if indegree[nei] <= 0:
                    continue

                indegree[nei] -= 1
                if hasApple[node] or time[node] > 0:
                    time[nei] += time[node] + 2
                if indegree[nei] == 1 and nei != 0:
                    queue.append(nei)

        return time[0]
```

```java
public class Solution {
    public int minTime(int n, int[][] edges, List<Boolean> hasApple) {
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        int[] indegree = new int[n];
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
            adj[edge[1]].add(edge[0]);
            indegree[edge[0]]++;
            indegree[edge[1]]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 1; i < n; i++) {
            if (indegree[i] == 1) {
                queue.offer(i);
                indegree[i] = 0;
            }
        }

        int[] time = new int[n];
        while (!queue.isEmpty()) {
            int node = queue.poll();
            for (int neighbor : adj[node]) {
                if (indegree[neighbor] <= 0) {
                    continue;
                }

                indegree[neighbor]--;
                if (hasApple.get(node) || time[node] > 0) {
                    time[neighbor] += time[node] + 2;
                }
                if (indegree[neighbor] == 1 && neighbor != 0) {
                    queue.offer(neighbor);
                }
            }
        }

        return time[0];
    }
}
```

```cpp
class Solution {
public:
    int minTime(int n, vector<vector<int>>& edges, vector<bool>& hasApple) {
        vector<vector<int>> adj(n);
        vector<int> indegree(n, 0);

        for (const auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
            indegree[edge[0]]++;
            indegree[edge[1]]++;
        }

        queue<int> q;
        for (int i = 1; i < n; ++i) {
            if (indegree[i] == 1) {
                q.push(i);
                indegree[i] = 0;
            }
        }

        vector<int> time(n, 0);
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            for (int neighbor : adj[node]) {
                if (indegree[neighbor] <= 0) {
                    continue;
                }

                indegree[neighbor]--;
                if (hasApple[node] || time[node] > 0) {
                    time[neighbor] += time[node] + 2;
                }
                if (indegree[neighbor] == 1 && neighbor != 0) {
                    q.push(neighbor);
                }
            }
        }

        return time[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @param {boolean[]} hasApple
     * @return {number}
     */
    minTime(n, edges, hasApple) {
        const adj = Array.from({ length: n }, () => []);
        const indegree = Array(n).fill(0);

        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
            indegree[u]++;
            indegree[v]++;
        }

        const queue = new Queue();
        for (let i = 1; i < n; i++) {
            if (indegree[i] === 1) {
                queue.push(i);
                indegree[i] = 0;
            }
        }

        const time = Array(n).fill(0);
        while (!queue.isEmpty()) {
            const node = queue.pop();
            for (const neighbor of adj[node]) {
                if (indegree[neighbor] <= 0) {
                    continue;
                }

                indegree[neighbor]--;
                if (hasApple[node] || time[node] > 0) {
                    time[neighbor] += time[node] + 2;
                }
                if (indegree[neighbor] === 1 && neighbor !== 0) {
                    queue.push(neighbor);
                }
            }
        }

        return time[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.
