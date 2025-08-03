## 1. Depth First Search

::tabs-start

```python
class Solution:
    def findSmallestSetOfVertices(self, n: int, edges: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)

        res = set(range(n))
        visited = [False] * n

        def dfs(node):
            visited[node] = True
            for nei in adj[node]:
                if not visited[nei]:
                    dfs(nei)
                res.discard(nei)

        for i in range(n):
            if not visited[i]:
                dfs(i)
        return list(res)
```

```java
public class Solution {
    public List<Integer> findSmallestSetOfVertices(int n, List<List<Integer>> edges) {
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (List<Integer> edge : edges) {
            adj[edge.get(0)].add(edge.get(1));
        }

        Set<Integer> res = new HashSet<>();
        for (int i = 0; i < n; i++) {
            res.add(i);
        }

        boolean[] visited = new boolean[n];
        for (int i = 0; i < n; i++) {
            dfs(i, adj, visited, res);
        }
        return new ArrayList<>(res);
    }

    private void dfs(int node, List<Integer>[] adj, boolean[] visited, Set<Integer> res) {
        visited[node] = true;
        for (int nei : adj[node]) {
            if (!visited[nei]) dfs(nei, adj, visited, res);
            res.remove(nei);
        }
    }
}
```

```cpp
class Solution {
public:
    vector<int> findSmallestSetOfVertices(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
        }

        unordered_set<int> res;
        vector<bool> visited(n, false);
        for (int i = 0; i < n; i++) res.insert(i);

        function<void(int)> dfs = [&](int node) {
            visited[node] = true;
            for (int& nei : adj[node]) {
                if (!visited[nei]) dfs(nei);
                res.erase(nei);
            }
        };

        for (int i = 0; i < n; i++) {
            if (!visited[i]) dfs(i);
        }
        return vector<int>(res.begin(), res.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @return {number[]}
     */
    findSmallestSetOfVertices(n, edges) {
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
        }

        const res = new Set(Array.from({ length: n }, (_, i) => i));
        const visited = new Array(n).fill(false);

        const dfs = (node) => {
            visited[node] = true;
            for (const nei of adj[node]) {
                if (!visited[nei]) dfs(nei);
                res.delete(nei);
            }
        };

        for (let i = 0; i < n; i++) {
            if (!visited[i]) dfs(i);
        }

        return Array.from(res);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 2. Iterative DFS

::tabs-start

```python
class Solution:
    def findSmallestSetOfVertices(self, n: int, edges: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)

        res = [True] * n
        visited = [False] * n
        stack = []

        for i in range(n):
            if not visited[i]:
                stack.append(i)
                while stack:
                    node = stack.pop()
                    if visited[node]:
                        continue
                    visited[node] = True
                    for nei in adj[node]:
                        if not visited[nei]:
                            stack.append(nei)
                        res[nei] = False

        return [i for i in range(n) if res[i]]
```

```java
public class Solution {
    public List<Integer> findSmallestSetOfVertices(int n, List<List<Integer>> edges) {
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (List<Integer> edge : edges) {
            adj[edge.get(0)].add(edge.get(1));
        }

        boolean[] res = new boolean[n];
        Arrays.fill(res, true);
        boolean[] visited = new boolean[n];
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                stack.push(i);
                while (!stack.isEmpty()) {
                    int node = stack.pop();
                    if (visited[node]) continue;
                    visited[node] = true;
                    for (int nei : adj[node]) {
                        if (!visited[nei]) stack.push(nei);
                        res[nei] = false;
                    }
                }
            }
        }

        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (res[i]) result.add(i);
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findSmallestSetOfVertices(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
        }

        vector<bool> res(n, true), visited(n, false);
        stack<int> stack;

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                stack.push(i);
                while (!stack.empty()) {
                    int node = stack.top();
                    stack.pop();
                    if (visited[node]) continue;
                    visited[node] = true;
                    for (int nei : adj[node]) {
                        if (!visited[nei]) stack.push(nei);
                        res[nei] = false;
                    }
                }
            }
        }

        vector<int> result;
        for (int i = 0; i < n; i++) {
            if (res[i]) result.push_back(i);
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @return {number[]}
     */
    findSmallestSetOfVertices(n, edges) {
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
        }

        const res = Array(n).fill(true);
        const visited = Array(n).fill(false);
        const stack = [];

        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                stack.push(i);
                while (stack.length) {
                    const node = stack.pop();
                    if (visited[node]) continue;
                    visited[node] = true;
                    for (const nei of adj[node]) {
                        if (!visited[nei]) stack.push(nei);
                        res[nei] = false;
                    }
                }
            }
        }

        return res.map((val, i) => (val ? i : -1)).filter((i) => i !== -1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 3. Indegree Count

::tabs-start

```python
class Solution:
    def findSmallestSetOfVertices(self, n: int, edges: List[List[int]]) -> List[int]:
        incoming = collections.defaultdict(list)
        for src, dst in edges:
            incoming[dst].append(src)

        res = []
        for i in range(n):
            if not incoming[i]:
                res.append(i)
        return res
```

```java
public class Solution {
    public List<Integer> findSmallestSetOfVertices(int n, List<List<Integer>> edges) {
        List<Integer>[] incoming = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            incoming[i] = new ArrayList<>();
        }
        for (List<Integer> edge : edges) {
            incoming[edge.get(1)].add(edge.get(0));
        }

        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (incoming[i].isEmpty()) {
                res.add(i);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findSmallestSetOfVertices(int n, vector<vector<int>>& edges) {
        vector<vector<int>> incoming(n);
        for (auto& edge : edges) {
            incoming[edge[1]].push_back(edge[0]);
        }

        vector<int> res;
        for (int i = 0; i < n; i++) {
            if (incoming[i].empty()) {
                res.push_back(i);
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
     * @param {number[][]} edges
     * @return {number[]}
     */
    findSmallestSetOfVertices(n, edges) {
        const incoming = Array.from({ length: n }, () => []);

        for (const [src, dst] of edges) {
            incoming[dst].push(src);
        }

        const res = [];
        for (let i = 0; i < n; i++) {
            if (incoming[i].length === 0) {
                res.push(i);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 4. Indegree Count

::tabs-start

```python
class Solution:
    def findSmallestSetOfVertices(self, n: int, edges: List[List[int]]) -> List[int]:
        indegree = [False] * n
        for src, dst in edges:
            indegree[dst] = True
        return [i for i in range(n) if not indegree[i]]
```

```java
public class Solution {
    public List<Integer> findSmallestSetOfVertices(int n, List<List<Integer>> edges) {
        boolean[] indegree = new boolean[n];
        for (List<Integer> edge : edges) {
            indegree[edge.get(1)] = true;
        }

        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (!indegree[i]) {
                res.add(i);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findSmallestSetOfVertices(int n, vector<vector<int>>& edges) {
        vector<bool> indegree(n, false);
        for (const auto& edge : edges) {
            indegree[edge[1]] = true;
        }

        vector<int> res;
        for (int i = 0; i < n; i++) {
            if (!indegree[i]) {
                res.push_back(i);
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
     * @param {number[][]} edges
     * @return {number[]}
     */
    findSmallestSetOfVertices(n, edges) {
        const indegree = new Array(n).fill(false);
        for (const [src, dst] of edges) {
            indegree[dst] = true;
        }

        let res = [];
        for (let i = 0; i < n; i++) {
            if (!indegree[i]) res.push(i);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.
