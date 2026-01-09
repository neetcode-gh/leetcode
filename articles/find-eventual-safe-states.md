## 1. Depth First Search

### Intuition

A node is safe if every path starting from it eventually leads to a terminal node (a node with no outgoing edges). Conversely, a node is unsafe if it can reach a cycle. We can use DFS with memoization to determine safety: initially mark a node as unsafe when we start exploring it (to detect cycles), then mark it safe only if all its neighbors are safe. If we revisit a node marked unsafe during exploration, we have found a cycle.

### Algorithm

1. Create a hash map `safe` to track each node's safety status.
2. For each node, run DFS:
   - If the node's status is already known, return it.
   - Mark the node as `false` (unsafe) initially to detect cycles.
   - Recursively check all neighbors. If any neighbor is unsafe, return `false`.
   - If all neighbors are safe, mark the current node as `true` (safe).
3. Collect all nodes where `dfs(node)` returns `true` and return them in order.

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

```go
func eventualSafeNodes(graph [][]int) []int {
    n := len(graph)
    safe := make(map[int]bool)
    visited := make(map[int]bool)

    var dfs func(node int) bool
    dfs = func(node int) bool {
        if _, exists := visited[node]; exists {
            return safe[node]
        }
        visited[node] = true
        safe[node] = false
        for _, nei := range graph[node] {
            if !dfs(nei) {
                return false
            }
        }
        safe[node] = true
        return true
    }

    res := []int{}
    for node := 0; node < n; node++ {
        if dfs(node) {
            res = append(res, node)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun eventualSafeNodes(graph: Array<IntArray>): List<Int> {
        val n = graph.size
        val safe = arrayOfNulls<Boolean>(n)

        fun dfs(node: Int): Boolean {
            if (safe[node] != null) {
                return safe[node]!!
            }
            safe[node] = false
            for (nei in graph[node]) {
                if (!dfs(nei)) {
                    return false
                }
            }
            safe[node] = true
            return true
        }

        val res = mutableListOf<Int>()
        for (node in 0 until n) {
            if (dfs(node)) {
                res.add(node)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func eventualSafeNodes(_ graph: [[Int]]) -> [Int] {
        let n = graph.count
        var safe = [Int: Bool]()

        func dfs(_ node: Int) -> Bool {
            if let isSafe = safe[node] {
                return isSafe
            }
            safe[node] = false
            for nei in graph[node] {
                if !dfs(nei) {
                    return false
                }
            }
            safe[node] = true
            return true
        }

        var res = [Int]()
        for node in 0..<n {
            if dfs(node) {
                res.append(node)
            }
        }
        return res
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

### Intuition

Think of safe nodes as those that can reach terminal nodes. If we reverse the edge directions, safe nodes are those reachable from terminal nodes. Using Kahn's algorithm on this reversed perspective: terminal nodes have zero out-degree in the original graph. We start from these terminal nodes and work backward, removing edges. Any node whose out-degree reaches zero is safe because all its paths lead to already-confirmed safe nodes.

### Algorithm

1. Build a reverse adjacency list (`parents`) and track the out-degree of each node.
2. Add all terminal nodes (out-degree = 0) to a queue.
3. Process nodes from the queue:
   - For each parent of the current node, decrement its out-degree.
   - If a parent's out-degree becomes zero, add it to the queue.
4. After processing, all nodes with out-degree zero are safe.
5. Return the safe nodes in sorted order.

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

```go
func eventualSafeNodes(graph [][]int) []int {
    n := len(graph)
    outdegree := make([]int, n)
    parents := make([][]int, n)
    queue := []int{}

    for node := 0; node < n; node++ {
        parents[node] = []int{}
        outdegree[node] = len(graph[node])
        if outdegree[node] == 0 {
            queue = append(queue, node)
        }
        for _, nei := range graph[node] {
            parents[nei] = append(parents[nei], node)
        }
    }

    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        for _, parent := range parents[node] {
            outdegree[parent]--
            if outdegree[parent] == 0 {
                queue = append(queue, parent)
            }
        }
    }

    res := []int{}
    for node := 0; node < n; node++ {
        if outdegree[node] <= 0 {
            res = append(res, node)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun eventualSafeNodes(graph: Array<IntArray>): List<Int> {
        val n = graph.size
        val outdegree = IntArray(n)
        val parents = Array(n) { mutableListOf<Int>() }
        val queue: ArrayDeque<Int> = ArrayDeque()

        for (node in 0 until n) {
            outdegree[node] = graph[node].size
            if (outdegree[node] == 0) {
                queue.add(node)
            }
            for (nei in graph[node]) {
                parents[nei].add(node)
            }
        }

        while (queue.isNotEmpty()) {
            val node = queue.removeFirst()
            for (parent in parents[node]) {
                outdegree[parent]--
                if (outdegree[parent] == 0) {
                    queue.add(parent)
                }
            }
        }

        val res = mutableListOf<Int>()
        for (node in 0 until n) {
            if (outdegree[node] <= 0) {
                res.add(node)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func eventualSafeNodes(_ graph: [[Int]]) -> [Int] {
        let n = graph.count
        var outdegree = [Int](repeating: 0, count: n)
        var parents = [[Int]](repeating: [], count: n)
        var queue = [Int]()

        for node in 0..<n {
            outdegree[node] = graph[node].count
            if outdegree[node] == 0 {
                queue.append(node)
            }
            for nei in graph[node] {
                parents[nei].append(node)
            }
        }

        while !queue.isEmpty {
            let node = queue.removeFirst()
            for parent in parents[node] {
                outdegree[parent] -= 1
                if outdegree[parent] == 0 {
                    queue.append(parent)
                }
            }
        }

        var res = [Int]()
        for node in 0..<n {
            if outdegree[node] <= 0 {
                res.append(node)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges in the given graph.
