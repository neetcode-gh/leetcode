## 1. Depth First Search

### Intuition

We want to find the smallest set of vertices from which all other vertices are reachable. A vertex must be in this set if no other vertex can reach it, meaning it has no incoming edges.

Using `dfs`, we traverse from each unvisited `node` and mark all reachable nodes. Any `node` that gets reached from another `node` can be removed from our candidate set. The nodes that remain are those with no incoming edges.

### Algorithm

1. Build an adjacency list from the edges.
2. Initialize a set containing all vertices as potential starting points.
3. For each unvisited vertex, run `dfs`:
   - Mark the vertex as visited.
   - For each neighbor, recursively visit it and remove it from the `res` set.
4. Return the remaining vertices in the set.

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

```csharp
public class Solution {
    public IList<int> FindSmallestSetOfVertices(int n, IList<IList<int>> edges) {
        List<int>[] adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();
        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
        }

        HashSet<int> res = new HashSet<int>();
        for (int i = 0; i < n; i++) res.Add(i);

        bool[] visited = new bool[n];
        for (int i = 0; i < n; i++) {
            Dfs(i, adj, visited, res);
        }
        return new List<int>(res);
    }

    private void Dfs(int node, List<int>[] adj, bool[] visited, HashSet<int> res) {
        visited[node] = true;
        foreach (int nei in adj[node]) {
            if (!visited[nei]) Dfs(nei, adj, visited, res);
            res.Remove(nei);
        }
    }
}
```

```go
func findSmallestSetOfVertices(n int, edges [][]int) []int {
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }
    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
    }

    res := make(map[int]bool)
    for i := 0; i < n; i++ {
        res[i] = true
    }
    visited := make([]bool, n)

    var dfs func(node int)
    dfs = func(node int) {
        visited[node] = true
        for _, nei := range adj[node] {
            if !visited[nei] {
                dfs(nei)
            }
            delete(res, nei)
        }
    }

    for i := 0; i < n; i++ {
        if !visited[i] {
            dfs(i)
        }
    }

    result := []int{}
    for k := range res {
        result = append(result, k)
    }
    return result
}
```

```kotlin
class Solution {
    fun findSmallestSetOfVertices(n: Int, edges: List<List<Int>>): List<Int> {
        val adj = Array(n) { mutableListOf<Int>() }
        for (edge in edges) {
            adj[edge[0]].add(edge[1])
        }

        val res = (0 until n).toMutableSet()
        val visited = BooleanArray(n)

        fun dfs(node: Int) {
            visited[node] = true
            for (nei in adj[node]) {
                if (!visited[nei]) dfs(nei)
                res.remove(nei)
            }
        }

        for (i in 0 until n) {
            if (!visited[i]) dfs(i)
        }
        return res.toList()
    }
}
```

```swift
class Solution {
    func findSmallestSetOfVertices(_ n: Int, _ edges: [[Int]]) -> [Int] {
        var adj = [[Int]](repeating: [], count: n)
        for edge in edges {
            adj[edge[0]].append(edge[1])
        }

        var res = Set(0..<n)
        var visited = [Bool](repeating: false, count: n)

        func dfs(_ node: Int) {
            visited[node] = true
            for nei in adj[node] {
                if !visited[nei] {
                    dfs(nei)
                }
                res.remove(nei)
            }
        }

        for i in 0..<n {
            if !visited[i] {
                dfs(i)
            }
        }
        return Array(res)
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

### Intuition

This is the same approach as recursive `dfs` but uses an explicit `stack` to avoid recursion. We process nodes iteratively, marking each visited `node` and removing any `node` that has an incoming edge from our candidate set.

### Algorithm

1. Build an adjacency list from the edges.
2. Initialize a boolean array where all vertices are potential `res`.
3. Use a `stack` for iterative `dfs`:
   - Pop a `node` from the `stack`.
   - Skip if already visited; otherwise mark as visited.
   - For each neighbor, add to `stack` if unvisited and mark as not a `res`.
4. Collect all vertices still marked as `res`.

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

```csharp
public class Solution {
    public IList<int> FindSmallestSetOfVertices(int n, IList<IList<int>> edges) {
        List<int>[] adj = new List<int>[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
        }
        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
        }

        bool[] res = new bool[n];
        Array.Fill(res, true);
        bool[] visited = new bool[n];
        Stack<int> stack = new Stack<int>();

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                stack.Push(i);
                while (stack.Count > 0) {
                    int node = stack.Pop();
                    if (visited[node]) continue;
                    visited[node] = true;
                    foreach (int nei in adj[node]) {
                        if (!visited[nei]) stack.Push(nei);
                        res[nei] = false;
                    }
                }
            }
        }

        List<int> result = new List<int>();
        for (int i = 0; i < n; i++) {
            if (res[i]) result.Add(i);
        }
        return result;
    }
}
```

```go
func findSmallestSetOfVertices(n int, edges [][]int) []int {
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }
    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
    }

    res := make([]bool, n)
    for i := range res {
        res[i] = true
    }
    visited := make([]bool, n)
    stack := []int{}

    for i := 0; i < n; i++ {
        if !visited[i] {
            stack = append(stack, i)
            for len(stack) > 0 {
                node := stack[len(stack)-1]
                stack = stack[:len(stack)-1]
                if visited[node] {
                    continue
                }
                visited[node] = true
                for _, nei := range adj[node] {
                    if !visited[nei] {
                        stack = append(stack, nei)
                    }
                    res[nei] = false
                }
            }
        }
    }

    result := []int{}
    for i := 0; i < n; i++ {
        if res[i] {
            result = append(result, i)
        }
    }
    return result
}
```

```kotlin
class Solution {
    fun findSmallestSetOfVertices(n: Int, edges: List<List<Int>>): List<Int> {
        val adj = Array(n) { mutableListOf<Int>() }
        for (edge in edges) {
            adj[edge[0]].add(edge[1])
        }

        val res = BooleanArray(n) { true }
        val visited = BooleanArray(n)
        val stack = ArrayDeque<Int>()

        for (i in 0 until n) {
            if (!visited[i]) {
                stack.addLast(i)
                while (stack.isNotEmpty()) {
                    val node = stack.removeLast()
                    if (visited[node]) continue
                    visited[node] = true
                    for (nei in adj[node]) {
                        if (!visited[nei]) stack.addLast(nei)
                        res[nei] = false
                    }
                }
            }
        }

        return res.indices.filter { res[it] }
    }
}
```

```swift
class Solution {
    func findSmallestSetOfVertices(_ n: Int, _ edges: [[Int]]) -> [Int] {
        var adj = [[Int]](repeating: [], count: n)
        for edge in edges {
            adj[edge[0]].append(edge[1])
        }

        var res = [Bool](repeating: true, count: n)
        var visited = [Bool](repeating: false, count: n)
        var stack = [Int]()

        for i in 0..<n {
            if !visited[i] {
                stack.append(i)
                while !stack.isEmpty {
                    let node = stack.removeLast()
                    if visited[node] { continue }
                    visited[node] = true
                    for nei in adj[node] {
                        if !visited[nei] {
                            stack.append(nei)
                        }
                        res[nei] = false
                    }
                }
            }
        }

        var result = [Int]()
        for i in 0..<n {
            if res[i] {
                result.append(i)
            }
        }
        return result
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

### Intuition

A vertex needs to be in our starting set only if it cannot be reached from any other vertex. This happens exactly when the vertex has no incoming edges. We can track which vertices have incoming edges by building a list of sources for each destination.

### Algorithm

1. Create an array of lists where `incoming[v]` stores all vertices with edges pointing to `v`.
2. Iterate through all edges and populate the `incoming` lists.
3. Collect all vertices where `incoming[v]` is empty.
4. Return these vertices as the `res`.

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

```csharp
public class Solution {
    public IList<int> FindSmallestSetOfVertices(int n, IList<IList<int>> edges) {
        List<int>[] incoming = new List<int>[n];
        for (int i = 0; i < n; i++) {
            incoming[i] = new List<int>();
        }
        foreach (var edge in edges) {
            incoming[edge[1]].Add(edge[0]);
        }

        List<int> res = new List<int>();
        for (int i = 0; i < n; i++) {
            if (incoming[i].Count == 0) {
                res.Add(i);
            }
        }
        return res;
    }
}
```

```go
func findSmallestSetOfVertices(n int, edges [][]int) []int {
    incoming := make([][]int, n)
    for i := range incoming {
        incoming[i] = []int{}
    }
    for _, edge := range edges {
        incoming[edge[1]] = append(incoming[edge[1]], edge[0])
    }

    res := []int{}
    for i := 0; i < n; i++ {
        if len(incoming[i]) == 0 {
            res = append(res, i)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findSmallestSetOfVertices(n: Int, edges: List<List<Int>>): List<Int> {
        val incoming = Array(n) { mutableListOf<Int>() }
        for (edge in edges) {
            incoming[edge[1]].add(edge[0])
        }

        val res = mutableListOf<Int>()
        for (i in 0 until n) {
            if (incoming[i].isEmpty()) {
                res.add(i)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findSmallestSetOfVertices(_ n: Int, _ edges: [[Int]]) -> [Int] {
        var incoming = [[Int]](repeating: [], count: n)
        for edge in edges {
            incoming[edge[1]].append(edge[0])
        }

        var res = [Int]()
        for i in 0..<n {
            if incoming[i].isEmpty {
                res.append(i)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 4. Indegree Count (Optimal)

### Intuition

We do not need to store the actual source vertices for each destination. We only care whether a vertex has at least one incoming edge. A simple boolean array is sufficient: mark each destination as having an incoming edge, then return all vertices that were never marked.

### Algorithm

1. Create a boolean array `indegree` of size `n`, initialized to `false`.
2. For each edge `(src, dst)`, set `indegree[dst] = true`.
3. Collect all vertices `i` where `indegree[i]` is `false`.
4. Return these vertices as `res`.

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

```csharp
public class Solution {
    public IList<int> FindSmallestSetOfVertices(int n, IList<IList<int>> edges) {
        bool[] indegree = new bool[n];
        foreach (var edge in edges) {
            indegree[edge[1]] = true;
        }

        List<int> res = new List<int>();
        for (int i = 0; i < n; i++) {
            if (!indegree[i]) {
                res.Add(i);
            }
        }
        return res;
    }
}
```

```go
func findSmallestSetOfVertices(n int, edges [][]int) []int {
    indegree := make([]bool, n)
    for _, edge := range edges {
        indegree[edge[1]] = true
    }

    res := []int{}
    for i := 0; i < n; i++ {
        if !indegree[i] {
            res = append(res, i)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findSmallestSetOfVertices(n: Int, edges: List<List<Int>>): List<Int> {
        val indegree = BooleanArray(n)
        for (edge in edges) {
            indegree[edge[1]] = true
        }

        val res = mutableListOf<Int>()
        for (i in 0 until n) {
            if (!indegree[i]) {
                res.add(i)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findSmallestSetOfVertices(_ n: Int, _ edges: [[Int]]) -> [Int] {
        var indegree = [Bool](repeating: false, count: n)
        for edge in edges {
            indegree[edge[1]] = true
        }

        var res = [Int]()
        for i in 0..<n {
            if !indegree[i] {
                res.append(i)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## Common Pitfalls

### Tracking Outgoing Edges Instead of Incoming

The problem asks for nodes that cannot be reached from other nodes, which means nodes with zero incoming edges. Tracking outgoing edges instead will identify nodes that cannot reach others, which is the opposite of what is needed.

### Overcomplicating With Graph Traversal

Since the graph is acyclic and we only need nodes with no incoming edges, a simple pass through the edges is sufficient. Implementing full DFS or BFS adds unnecessary complexity and potential for bugs when a simple indegree check solves the problem optimally.