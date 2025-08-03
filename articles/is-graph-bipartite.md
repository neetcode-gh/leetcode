## 1. Depth First Search

::tabs-start

```python
class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        color = [0] * len(graph)  # Map node i -> odd=1, even=-1

        def dfs(i, c):
            color[i] = c
            for nei in graph[i]:
                if color[nei] == c:
                    return False
                if color[nei] == 0 and not dfs(nei, -c):
                    return False
            return True

        for i in range(len(graph)):
            if color[i] == 0 and not dfs(i, 1):
                return False
        return True
```

```java
public class Solution {
    private int[] color;

    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        color = new int[n]; // Map node i -> odd=1, even=-1

        for (int i = 0; i < n; i++) {
            if (color[i] == 0 && !dfs(graph, i, 1)) {
                return false;
            }
        }
        return true;
    }

    private boolean dfs(int[][] graph, int i, int c) {
        color[i] = c;
        for (int nei : graph[i]) {
            if (color[nei] == c) {
                return false;
            }
            if (color[nei] == 0 && !dfs(graph, nei, -c)) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
private:
    vector<int> color;

    bool dfs(vector<vector<int>>& graph, int i, int c) {
        color[i] = c;
        for (int nei : graph[i]) {
            if (color[nei] == c) {
                return false;
            }
            if (color[nei] == 0 && !dfs(graph, nei, -c)) {
                return false;
            }
        }
        return true;
    }

public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        color.assign(n, 0); // Map node i -> odd=1, even=-1

        for (int i = 0; i < n; i++) {
            if (color[i] == 0 && !dfs(graph, i, 1)) {
                return false;
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} graph
     * @return {boolean}
     */
    isBipartite(graph) {
        let n = graph.length;
        let color = new Array(n).fill(0); // Map node i -> odd=1, even=-1

        const dfs = (i, c) => {
            color[i] = c;
            for (let nei of graph[i]) {
                if (color[nei] === c) {
                    return false;
                }
                if (color[nei] === 0 && !dfs(nei, -c)) {
                    return false;
                }
            }
            return true;
        };

        for (let i = 0; i < n; i++) {
            if (color[i] === 0 && !dfs(i, 1)) {
                return false;
            }
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 2. Breadth First Search

::tabs-start

```python
class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        color = [0] * len(graph)  # Map node i -> odd=1, even=-1

        def bfs(i):
            if color[i]:
                return True
            q = deque([i])
            color[i] = -1
            while q:
                i = q.popleft()
                for nei in graph[i]:
                    if color[i] == color[nei]:
                        return False
                    elif not color[nei]:
                        q.append(nei)
                        color[nei] = -1 * color[i]
            return True

        for i in range(len(graph)):
            if not bfs(i):
                return False
        return True
```

```java
public class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n]; // Map node i -> odd=1, even=-1

        for (int i = 0; i < n; i++) {
            if (color[i] != 0) continue;
            Queue<Integer> q = new LinkedList<>();
            q.offer(i);
            color[i] = -1;

            while (!q.isEmpty()) {
                int node = q.poll();
                for (int nei : graph[node]) {
                    if (color[nei] == color[node]) {
                        return false;
                    } else if (color[nei] == 0) {
                        q.offer(nei);
                        color[nei] = -color[node];
                    }
                }
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, 0); // Map node i -> odd=1, even=-1

        for (int i = 0; i < n; i++) {
            if (color[i] != 0) continue;
            queue<int> q;
            q.push(i);
            color[i] = -1;

            while (!q.empty()) {
                int node = q.front();
                q.pop();
                for (int nei : graph[node]) {
                    if (color[nei] == color[node]) {
                        return false;
                    } else if (color[nei] == 0) {
                        q.push(nei);
                        color[nei] = -color[node];
                    }
                }
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} graph
     * @return {boolean}
     */
    isBipartite(graph) {
        let n = graph.length;
        let color = new Array(n).fill(0); // Map node i -> odd=1, even=-1

        for (let i = 0; i < n; i++) {
            if (color[i] !== 0) continue;
            let q = new Queue([i]);
            color[i] = -1;

            while (!q.isEmpty()) {
                let node = q.pop();
                for (let nei of graph[node]) {
                    if (color[nei] === color[node]) {
                        return false;
                    } else if (color[nei] === 0) {
                        q.push(nei);
                        color[nei] = -color[node];
                    }
                }
            }
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 3. Iterative DFS

::tabs-start

```python
class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        color = [0] * len(graph)  # Map node i -> odd=1, even=-1
        stack = []

        for i in range(len(graph)):
            if color[i] != 0:
                continue
            color[i] = -1
            stack.append(i)
            while stack:
                node = stack.pop()
                for nei in graph[node]:
                    if color[node] == color[nei]:
                        return False
                    elif not color[nei]:
                        stack.append(nei)
                        color[nei] = -1 * color[node]

        return True
```

```java
public class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n]; // Map node i -> odd=1, even=-1
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < n; i++) {
            if (color[i] != 0) continue;
            color[i] = -1;
            stack.push(i);
            while (!stack.isEmpty()) {
                int node = stack.pop();
                for (int nei : graph[node]) {
                    if (color[node] == color[nei]) return false;
                    if (color[nei] == 0) {
                        stack.push(nei);
                        color[nei] = -color[node];
                    }
                }
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n); // Map node i -> odd=1, even=-1
        stack<int> stack;

        for (int i = 0; i < n; i++) {
            if (color[i] != 0) continue;
            color[i] = -1;
            stack.push(i);
            while (!stack.empty()) {
                int node = stack.top();
                stack.pop();
                for (int nei : graph[node]) {
                    if (color[node] == color[nei]) return false;
                    if (color[nei] == 0) {
                        stack.push(nei);
                        color[nei] = -color[node];
                    }
                }
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} graph
     * @return {boolean}
     */
    isBipartite(graph) {
        let n = graph.length;
        let color = new Array(n).fill(0); // Map node i -> odd=1, even=-1
        let stack = [];

        for (let i = 0; i < n; i++) {
            if (color[i] !== 0) continue;
            color[i] = -1;
            stack.push(i);
            while (stack.length > 0) {
                let node = stack.pop();
                for (let nei of graph[node]) {
                    if (color[node] === color[nei]) return false;
                    if (color[nei] === 0) {
                        stack.push(nei);
                        color[nei] = -color[node];
                    }
                }
            }
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 4. Disjoint Set Union

::tabs-start

```python
class DSU:
    def __init__(self, n):
        self.Parent = list(range(n))
        self.Size = [0] * n

    def find(self, node):
        if self.Parent[node] != node:
            self.Parent[node] = self.find(self.Parent[node])
        return self.Parent[node]

    def union(self, u, v):
        pu, pv = self.find(u), self.find(v)
        if pu == pv:
            return False
        if self.Size[pu] > self.Size[pv]:
            self.Parent[pv] = pu
        elif self.Size[pu] < self.Size[pv]:
            self.Parent[pu] = pv
        else:
            self.Parent[pv] = pu
            self.Size[pu] += 1
        return True

class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        n = len(graph)
        dsu = DSU(n)

        for node in range(n):
            for nei in graph[node]:
                if dsu.find(node) == dsu.find(nei):
                    return False
                dsu.union(graph[node][0], nei)

        return True
```

```java
public class DSU {
    private int[] Parent, Size;

    public DSU(int n) {
        Parent = new int[n];
        Size = new int[n];
        for (int i = 0; i < n; i++) {
            Parent[i] = i;
            Size[i] = 0;
        }
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
        if (Size[pu] > Size[pv]) {
            Parent[pv] = pu;
        } else if (Size[pu] < Size[pv]) {
            Parent[pu] = pv;
        } else {
            Parent[pv] = pu;
            Size[pu]++;
        }
        return true;
    }
}

class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        DSU dsu = new DSU(n);

        for (int node = 0; node < n; node++) {
            for (int nei : graph[node]) {
                if (dsu.find(node) == dsu.find(nei)) {
                    return false;
                }
                dsu.union(graph[node][0], nei);
            }
        }
        return true;
    }
}
```

```cpp
class DSU {
private:
    vector<int> Parent, Size;

public:
    DSU(int n) {
        Parent.resize(n);
        Size.resize(n, 0);
        for (int i = 0; i < n; i++) {
            Parent[i] = i;
        }
    }

    int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    bool unionSet(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (Size[pu] > Size[pv]) {
            Parent[pv] = pu;
        } else if (Size[pu] < Size[pv]) {
            Parent[pu] = pv;
        } else {
            Parent[pv] = pu;
            Size[pu]++;
        }
        return true;
    }
};

class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        DSU dsu(n);

        for (int node = 0; node < n; node++) {
            for (int& nei : graph[node]) {
                if (dsu.find(node) == dsu.find(nei)) {
                    return false;
                }
                dsu.unionSet(graph[node][0], nei);
            }
        }
        return true;
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
     * @param {number[][]} graph
     * @return {boolean}
     */
    isBipartite(graph) {
        let n = graph.length;
        let dsu = new DSU(n);

        for (let node = 0; node < n; node++) {
            for (let nei of graph[node]) {
                if (dsu.find(node) === dsu.find(nei)) {
                    return false;
                }
                dsu.union(graph[node][0], nei);
            }
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + (E * α(V)))$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges. $α()$ is used for amortized complexity.
