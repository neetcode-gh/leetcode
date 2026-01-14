## 1. Depth First Search

### Intuition

A graph is bipartite if we can split its nodes into two groups such that every edge connects nodes from different groups. This is equivalent to checking if the graph is 2-colorable. Using DFS, we assign a color to the starting node and then assign the opposite color to all its neighbors. If we ever find a neighbor that already has the same color as the current node, the graph is not bipartite. Since the graph may be disconnected, we run `dfs` from every unvisited node.

### Algorithm

1. Create a `color` array initialized to `0` (unvisited). Use `1` and `-1` as the two colors.
2. Define a recursive `dfs` function that takes a node `i` and a color `c`:
   - Assign `color[i] = c`.
   - For each neighbor, if it has the same color, return `false`.
   - If the neighbor is unvisited, recursively call `dfs` with the opposite color. If that returns `false`, propagate the failure.
   - Return `true` if all neighbors pass.
3. For each node, if unvisited, run `dfs` with color `1`. If any `dfs` fails, return `false`.
4. Return `true` if all components are bipartite.

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

```csharp
public class Solution {
    private int[] color;

    public bool IsBipartite(int[][] graph) {
        int n = graph.Length;
        color = new int[n]; // Map node i -> odd=1, even=-1

        for (int i = 0; i < n; i++) {
            if (color[i] == 0 && !Dfs(graph, i, 1)) {
                return false;
            }
        }
        return true;
    }

    private bool Dfs(int[][] graph, int i, int c) {
        color[i] = c;
        foreach (int nei in graph[i]) {
            if (color[nei] == c) {
                return false;
            }
            if (color[nei] == 0 && !Dfs(graph, nei, -c)) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func isBipartite(graph [][]int) bool {
    n := len(graph)
    color := make([]int, n) // Map node i -> odd=1, even=-1

    var dfs func(i, c int) bool
    dfs = func(i, c int) bool {
        color[i] = c
        for _, nei := range graph[i] {
            if color[nei] == c {
                return false
            }
            if color[nei] == 0 && !dfs(nei, -c) {
                return false
            }
        }
        return true
    }

    for i := 0; i < n; i++ {
        if color[i] == 0 && !dfs(i, 1) {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    private lateinit var color: IntArray

    fun isBipartite(graph: Array<IntArray>): Boolean {
        val n = graph.size
        color = IntArray(n) // Map node i -> odd=1, even=-1

        for (i in 0 until n) {
            if (color[i] == 0 && !dfs(graph, i, 1)) {
                return false
            }
        }
        return true
    }

    private fun dfs(graph: Array<IntArray>, i: Int, c: Int): Boolean {
        color[i] = c
        for (nei in graph[i]) {
            if (color[nei] == c) {
                return false
            }
            if (color[nei] == 0 && !dfs(graph, nei, -c)) {
                return false
            }
        }
        return true
    }
}
```

```swift
class Solution {
    private var color = [Int]()

    func isBipartite(_ graph: [[Int]]) -> Bool {
        let n = graph.count
        color = [Int](repeating: 0, count: n) // Map node i -> odd=1, even=-1

        for i in 0..<n {
            if color[i] == 0 && !dfs(graph, i, 1) {
                return false
            }
        }
        return true
    }

    private func dfs(_ graph: [[Int]], _ i: Int, _ c: Int) -> Bool {
        color[i] = c
        for nei in graph[i] {
            if color[nei] == c {
                return false
            }
            if color[nei] == 0 && !dfs(graph, nei, -c) {
                return false
            }
        }
        return true
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

### Intuition

BFS provides another way to check 2-colorability. Starting from an uncolored node, we assign it a color and add it to a queue. For each node we process, we check all neighbors: if a neighbor has the same color, the graph is not bipartite; if uncolored, we assign it the opposite color and enqueue it. BFS naturally explores the graph level by level, alternating colors between levels.

### Algorithm

1. Create a `color` array initialized to `0`.
2. For each node `i` from `0` to `n-1`:
   - If already colored, skip it.
   - Initialize a queue with node `i` and set `color[i] = -1`.
   - While the queue is not empty:
     - Dequeue a node.
     - For each neighbor: if it has the same color, return `false`. If uncolored, assign the opposite color and enqueue it.
3. Return `true` if all nodes are processed without conflict.

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

```csharp
public class Solution {
    public bool IsBipartite(int[][] graph) {
        int n = graph.Length;
        int[] color = new int[n]; // Map node i -> odd=1, even=-1

        for (int i = 0; i < n; i++) {
            if (color[i] != 0) continue;
            Queue<int> q = new Queue<int>();
            q.Enqueue(i);
            color[i] = -1;

            while (q.Count > 0) {
                int node = q.Dequeue();
                foreach (int nei in graph[node]) {
                    if (color[nei] == color[node]) {
                        return false;
                    } else if (color[nei] == 0) {
                        q.Enqueue(nei);
                        color[nei] = -color[node];
                    }
                }
            }
        }
        return true;
    }
}
```

```go
func isBipartite(graph [][]int) bool {
    n := len(graph)
    color := make([]int, n) // Map node i -> odd=1, even=-1

    for i := 0; i < n; i++ {
        if color[i] != 0 {
            continue
        }
        q := []int{i}
        color[i] = -1

        for len(q) > 0 {
            node := q[0]
            q = q[1:]
            for _, nei := range graph[node] {
                if color[nei] == color[node] {
                    return false
                } else if color[nei] == 0 {
                    q = append(q, nei)
                    color[nei] = -color[node]
                }
            }
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isBipartite(graph: Array<IntArray>): Boolean {
        val n = graph.size
        val color = IntArray(n) // Map node i -> odd=1, even=-1

        for (i in 0 until n) {
            if (color[i] != 0) continue
            val q: Queue<Int> = LinkedList()
            q.offer(i)
            color[i] = -1

            while (q.isNotEmpty()) {
                val node = q.poll()
                for (nei in graph[node]) {
                    if (color[nei] == color[node]) {
                        return false
                    } else if (color[nei] == 0) {
                        q.offer(nei)
                        color[nei] = -color[node]
                    }
                }
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isBipartite(_ graph: [[Int]]) -> Bool {
        let n = graph.count
        var color = [Int](repeating: 0, count: n) // Map node i -> odd=1, even=-1

        for i in 0..<n {
            if color[i] != 0 { continue }
            var q = [i]
            color[i] = -1

            while !q.isEmpty {
                let node = q.removeFirst()
                for nei in graph[node] {
                    if color[nei] == color[node] {
                        return false
                    } else if color[nei] == 0 {
                        q.append(nei)
                        color[nei] = -color[node]
                    }
                }
            }
        }
        return true
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

### Intuition

Iterative DFS uses an explicit stack instead of recursion to traverse the graph. The coloring logic remains the same: assign a color to a node, then process all neighbors by checking for conflicts and pushing uncolored neighbors onto the stack with the opposite color. This avoids potential stack overflow issues with very deep graphs while achieving the same result as recursive DFS.

### Algorithm

1. Create a `color` array initialized to `0`.
2. For each node `i` from `0` to `n-1`:
   - If already colored, skip it.
   - Set `color[i] = -1` and push `i` onto the stack.
   - While the stack is not empty:
     - Pop a node.
     - For each neighbor: if it has the same color, return `false`. If uncolored, assign the opposite color and push it onto the stack.
3. Return `true` if no conflicts are found.

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

```csharp
public class Solution {
    public bool IsBipartite(int[][] graph) {
        int n = graph.Length;
        int[] color = new int[n]; // Map node i -> odd=1, even=-1
        Stack<int> stack = new Stack<int>();

        for (int i = 0; i < n; i++) {
            if (color[i] != 0) continue;
            color[i] = -1;
            stack.Push(i);
            while (stack.Count > 0) {
                int node = stack.Pop();
                foreach (int nei in graph[node]) {
                    if (color[node] == color[nei]) return false;
                    if (color[nei] == 0) {
                        stack.Push(nei);
                        color[nei] = -color[node];
                    }
                }
            }
        }
        return true;
    }
}
```

```go
func isBipartite(graph [][]int) bool {
    n := len(graph)
    color := make([]int, n) // Map node i -> odd=1, even=-1
    stack := []int{}

    for i := 0; i < n; i++ {
        if color[i] != 0 {
            continue
        }
        color[i] = -1
        stack = append(stack, i)
        for len(stack) > 0 {
            node := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            for _, nei := range graph[node] {
                if color[node] == color[nei] {
                    return false
                }
                if color[nei] == 0 {
                    stack = append(stack, nei)
                    color[nei] = -color[node]
                }
            }
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun isBipartite(graph: Array<IntArray>): Boolean {
        val n = graph.size
        val color = IntArray(n) // Map node i -> odd=1, even=-1
        val stack = ArrayDeque<Int>()

        for (i in 0 until n) {
            if (color[i] != 0) continue
            color[i] = -1
            stack.addLast(i)
            while (stack.isNotEmpty()) {
                val node = stack.removeLast()
                for (nei in graph[node]) {
                    if (color[node] == color[nei]) return false
                    if (color[nei] == 0) {
                        stack.addLast(nei)
                        color[nei] = -color[node]
                    }
                }
            }
        }
        return true
    }
}
```

```swift
class Solution {
    func isBipartite(_ graph: [[Int]]) -> Bool {
        let n = graph.count
        var color = [Int](repeating: 0, count: n) // Map node i -> odd=1, even=-1
        var stack = [Int]()

        for i in 0..<n {
            if color[i] != 0 { continue }
            color[i] = -1
            stack.append(i)
            while !stack.isEmpty {
                let node = stack.removeLast()
                for nei in graph[node] {
                    if color[node] == color[nei] { return false }
                    if color[nei] == 0 {
                        stack.append(nei)
                        color[nei] = -color[node]
                    }
                }
            }
        }
        return true
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

### Intuition

DSU (Union-Find) offers an alternative perspective. For a bipartite graph, a node must be in a different set than all of its neighbors, but all neighbors should belong to the same set. For each node, we union all its neighbors together. If a node ever ends up in the same set as one of its neighbors, the graph is not bipartite. This works because being in the same connected component in the neighbor graph implies they must share a color in a valid 2-coloring.

### Algorithm

1. Initialize a DSU structure with `n` nodes.
2. For each node:
   - If it has no neighbors, continue.
   - For each neighbor:
     - If the node and neighbor are in the same set, return `false`.
     - Union the neighbor with the first neighbor of the current node (grouping all neighbors together).
3. Return `true` if no conflict is detected.

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

```csharp
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

    public int Find(int node) {
        if (Parent[node] != node) {
            Parent[node] = Find(Parent[node]);
        }
        return Parent[node];
    }

    public bool Union(int u, int v) {
        int pu = Find(u), pv = Find(v);
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

public class Solution {
    public bool IsBipartite(int[][] graph) {
        int n = graph.Length;
        DSU dsu = new DSU(n);

        for (int node = 0; node < n; node++) {
            foreach (int nei in graph[node]) {
                if (dsu.Find(node) == dsu.Find(nei)) {
                    return false;
                }
                dsu.Union(graph[node][0], nei);
            }
        }
        return true;
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
    for i := 0; i < n; i++ {
        parent[i] = i
    }
    return &DSU{Parent: parent, Size: size}
}

func (d *DSU) Find(node int) int {
    if d.Parent[node] != node {
        d.Parent[node] = d.Find(d.Parent[node])
    }
    return d.Parent[node]
}

func (d *DSU) Union(u, v int) bool {
    pu, pv := d.Find(u), d.Find(v)
    if pu == pv {
        return false
    }
    if d.Size[pu] > d.Size[pv] {
        d.Parent[pv] = pu
    } else if d.Size[pu] < d.Size[pv] {
        d.Parent[pu] = pv
    } else {
        d.Parent[pv] = pu
        d.Size[pu]++
    }
    return true
}

func isBipartite(graph [][]int) bool {
    n := len(graph)
    dsu := NewDSU(n)

    for node := 0; node < n; node++ {
        for _, nei := range graph[node] {
            if dsu.Find(node) == dsu.Find(nei) {
                return false
            }
            dsu.Union(graph[node][0], nei)
        }
    }
    return true
}
```

```kotlin
class DSU(n: Int) {
    private val parent = IntArray(n) { it }
    private val size = IntArray(n)

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
        if (size[pu] > size[pv]) {
            parent[pv] = pu
        } else if (size[pu] < size[pv]) {
            parent[pu] = pv
        } else {
            parent[pv] = pu
            size[pu]++
        }
        return true
    }
}

class Solution {
    fun isBipartite(graph: Array<IntArray>): Boolean {
        val n = graph.size
        val dsu = DSU(n)

        for (node in 0 until n) {
            for (nei in graph[node]) {
                if (dsu.find(node) == dsu.find(nei)) {
                    return false
                }
                dsu.union(graph[node][0], nei)
            }
        }
        return true
    }
}
```

```swift
class DSU {
    private var parent: [Int]
    private var size: [Int]

    init(_ n: Int) {
        parent = Array(0..<n)
        size = [Int](repeating: 0, count: n)
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
        if size[pu] > size[pv] {
            parent[pv] = pu
        } else if size[pu] < size[pv] {
            parent[pu] = pv
        } else {
            parent[pv] = pu
            size[pu] += 1
        }
        return true
    }
}

class Solution {
    func isBipartite(_ graph: [[Int]]) -> Bool {
        let n = graph.count
        let dsu = DSU(n)

        for node in 0..<n {
            for nei in graph[node] {
                if dsu.find(node) == dsu.find(nei) {
                    return false
                }
                dsu.union(graph[node][0], nei)
            }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + (E * α(V)))$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges. $α()$ is used for amortized complexity.

---

## Common Pitfalls

### Forgetting to Handle Disconnected Components

The graph may consist of multiple disconnected components. If you only run BFS/DFS from node 0, you will miss other components that might not be bipartite. Always iterate through all nodes and start a new traversal from any unvisited node to ensure every component is checked.

### Checking Only Unvisited Neighbors

When traversing the graph, you must check the color of all neighbors, not just unvisited ones. If a neighbor is already colored with the same color as the current node, the graph is not bipartite. Skipping already-visited neighbors misses these conflict cases.

### Using Wrong Initial Color Values

Using `0` as a valid color while also using it to represent "unvisited" creates ambiguity. A clean approach is to use `0` for unvisited nodes and `1`/`-1` as the two actual colors. Alternatively, use a separate visited array. Mixing up these states leads to incorrect bipartiteness detection.
