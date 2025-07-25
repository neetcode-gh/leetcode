## 1. Depth First Search

::tabs-start

```python
class Solution:
    def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
        n = len(graph)
        safe = {}

        def dfs(node):
            if node in safe:
                return safe[node]
            safe[node] = False
            for nei in graph[node]:
                if not dfs(nei):
                    return safe[node]
            safe[node] = True
            return safe[node]

        res = []
        for node in range(n):
            if dfs(node):
                res.append(node)
        return res
```

```java
public class Solution {
    private Boolean[] safe;

    public List<Integer> eventualSafeNodes(int[][] graph) {
        int n = graph.length;
        safe = new Boolean[n];
        List<Integer> res = new ArrayList<>();
        for (int node = 0; node < n; node++) {
            if (dfs(graph, node)) {
                res.add(node);
            }
        }
        return res;
    }

    private boolean dfs(int[][] graph, int node) {
        if (safe[node] != null) {
            return safe[node];
        }

        safe[node] = false;
        for (int nei : graph[node]) {
            if (!dfs(graph, nei)) {
                return false;
            }
        }
        safe[node] = true;
        return true;
    }
}
```

```cpp
class Solution {
    vector<int> safe;

public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> res;
        safe.assign(n, -1);
        for (int node = 0; node < n; node++) {
            if (dfs(graph, node)) {
                res.push_back(node);
            }
        }
        return res;
    }

private:
    bool dfs(vector<vector<int>>& graph, int node) {
        if (safe[node] != -1) {
            return safe[node];
        }
        safe[node] = 0;
        for (int nei : graph[node]) {
            if (!dfs(graph, nei)) {
                return false;
            }
        }
        safe[node] = 1;
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} graph
     * @return {number[]}
     */
    eventualSafeNodes(graph) {
        const n = graph.length;
        const safe = Array(n).fill(undefined);
        const res = [];

        const dfs = (node) => {
            if (safe[node] !== undefined) {
                return safe[node];
            }
            safe[node] = false;
            for (let nei of graph[node]) {
                if (!dfs(nei)) {
                    return false;
                }
            }
            safe[node] = true;
            return true;
        };

        for (let node = 0; node < n; node++) {
            if (dfs(node)) {
                res.push(node);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges in the given graph.

---

## 2. Topological Sort (Kahn's Algorithm)

::tabs-start

```python
class Solution:
    def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
        n = len(graph)
        outdegree = [0] * n
        parents = [[] for _ in range(n)]
        queue = deque()

        for node in range(n):
            outdegree[node] = len(graph[node])
            if outdegree[node] == 0:
                queue.append(node)
            for nei in graph[node]:
                parents[nei].append(node)

        while queue:
            node = queue.popleft()
            for parent in parents[node]:
                outdegree[parent] -= 1
                if outdegree[parent] == 0:
                    queue.append(parent)

        res = []
        for node in range(n):
            if outdegree[node] <= 0:
                res.append(node)
        return res
```

```java
public class Solution {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        int n = graph.length;
        int[] outdegree = new int[n];
        List<Integer>[] parents = new ArrayList[n];
        Queue<Integer> queue = new LinkedList<>();

        for (int i = 0; i < n; i++) {
            parents[i] = new ArrayList<>();
        }

        for (int node = 0; node < n; node++) {
            outdegree[node] = graph[node].length;
            if (outdegree[node] == 0) {
                queue.add(node);
            }
            for (int nei : graph[node]) {
                parents[nei].add(node);
            }
        }

        while (!queue.isEmpty()) {
            int node = queue.poll();
            for (int parent : parents[node]) {
                outdegree[parent]--;
                if (outdegree[parent] == 0) {
                    queue.add(parent);
                }
            }
        }

        List<Integer> res = new ArrayList<>();
        for (int node = 0; node < n; node++) {
            if (outdegree[node] <= 0) {
                res.add(node);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> outdegree(n, 0);
        vector<vector<int>> parents(n);
        queue<int> q;

        for (int node = 0; node < n; node++) {
            outdegree[node] = graph[node].size();
            if (outdegree[node] == 0) {
                q.push(node);
            }
            for (int nei : graph[node]) {
                parents[nei].push_back(node);
            }
        }

        while (!q.empty()) {
            int node = q.front();
            q.pop();
            for (int parent : parents[node]) {
                outdegree[parent]--;
                if (outdegree[parent] == 0) {
                    q.push(parent);
                }
            }
        }

        vector<int> res;
        for (int node = 0; node < n; node++) {
            if (outdegree[node] <= 0) {
                res.push_back(node);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} graph
     * @return {number[]}
     */
    eventualSafeNodes(graph) {
        const n = graph.length;
        const outdegree = Array(n).fill(0);
        const parents = Array.from({ length: n }, () => []);
        const queue = new Queue();

        for (let node = 0; node < n; node++) {
            outdegree[node] = graph[node].length;
            if (outdegree[node] === 0) {
                queue.push(node);
            }
            for (let nei of graph[node]) {
                parents[nei].push(node);
            }
        }

        while (!queue.isEmpty()) {
            const node = queue.pop();
            for (let parent of parents[node]) {
                outdegree[parent]--;
                if (outdegree[parent] === 0) {
                    queue.push(parent);
                }
            }
        }

        const res = [];
        for (let node = 0; node < n; node++) {
            if (outdegree[node] <= 0) {
                res.push(node);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges in the given graph.
