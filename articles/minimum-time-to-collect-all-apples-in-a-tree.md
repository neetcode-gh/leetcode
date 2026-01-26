## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Tree Data Structure** - Understanding parent-child relationships and traversing trees represented as edge lists
- **Depth First Search (DFS) on Trees** - Recursively exploring tree nodes while tracking the parent to avoid revisiting
- **Topological Sort (Kahn's Algorithm)** - Processing nodes from leaves to root using indegree tracking and a queue

---

## 1. Depth First Search

### Intuition

We start at node `0` and need to visit all nodes that have apples. The key observation is that if a subtree contains any apple (either at the child node itself or deeper in the subtree), we must traverse the edge to that child and back, costing `2` seconds. We use DFS to compute the time needed for each subtree. If a child has an apple or its subtree requires time (meaning there's an apple deeper), we add `2` plus the child's subtree time to our current total.

### Algorithm

1. Build an adjacency list from the edges (undirected tree).
2. Run DFS from node `0` with parent tracking to avoid revisiting:
   - For each child (excluding parent):
     - Recursively compute `childTime` for that subtree.
     - If `childTime > 0` or the child has an apple, add `2 + childTime` to the current time.
   - Return the accumulated time for this subtree.
3. Return the result of `dfs(0, -1)`.

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

```csharp
public class Solution {
    public int MinTime(int n, int[][] edges, List<bool> hasApple) {
        var adj = new Dictionary<int, List<int>>();
        for (int i = 0; i < n; i++) adj[i] = new List<int>();
        foreach (var e in edges) {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
        }

        int Dfs(int cur, int par) {
            int time = 0;
            foreach (var child in adj[cur]) {
                if (child == par) continue;
                int childTime = Dfs(child, cur);
                if (childTime > 0 || hasApple[child]) {
                    time += 2 + childTime;
                }
            }
            return time;
        }

        return Dfs(0, -1);
    }
}
```

```go
func minTime(n int, edges [][]int, hasApple []bool) int {
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }
    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
        adj[edge[1]] = append(adj[edge[1]], edge[0])
    }

    var dfs func(cur, parent int) int
    dfs = func(cur, parent int) int {
        time := 0
        for _, child := range adj[cur] {
            if child == parent {
                continue
            }
            childTime := dfs(child, cur)
            if childTime > 0 || hasApple[child] {
                time += 2 + childTime
            }
        }
        return time
    }

    return dfs(0, -1)
}
```

```kotlin
class Solution {
    fun minTime(n: Int, edges: Array<IntArray>, hasApple: List<Boolean>): Int {
        val adj = Array(n) { mutableListOf<Int>() }
        for (edge in edges) {
            adj[edge[0]].add(edge[1])
            adj[edge[1]].add(edge[0])
        }

        fun dfs(cur: Int, parent: Int): Int {
            var time = 0
            for (child in adj[cur]) {
                if (child == parent) continue
                val childTime = dfs(child, cur)
                if (childTime > 0 || hasApple[child]) {
                    time += 2 + childTime
                }
            }
            return time
        }

        return dfs(0, -1)
    }
}
```

```swift
class Solution {
    func minTime(_ n: Int, _ edges: [[Int]], _ hasApple: [Bool]) -> Int {
        var adj = [[Int]](repeating: [], count: n)
        for edge in edges {
            adj[edge[0]].append(edge[1])
            adj[edge[1]].append(edge[0])
        }

        func dfs(_ cur: Int, _ parent: Int) -> Int {
            var time = 0
            for child in adj[cur] {
                if child == parent { continue }
                let childTime = dfs(child, cur)
                if childTime > 0 || hasApple[child] {
                    time += 2 + childTime
                }
            }
            return time
        }

        return dfs(0, -1)
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

### Intuition

Instead of top-down DFS, we can process the tree from leaves to root. Starting from leaf nodes (nodes with only one connection, excluding the root), we propagate the time upward. If a leaf has an apple or already accumulated time from its subtree, we add `2` seconds to its parent. This bottom-up approach naturally handles the aggregation of times from multiple subtrees.

### Algorithm

1. Build an adjacency list and track the degree (number of connections) for each node.
2. Initialize a queue with all leaf nodes (degree `1`, excluding node `0`).
3. Process nodes in the queue:
   - For each neighbor of the current node with positive degree:
     - Decrement the neighbor's degree.
     - If the current node has an apple or has accumulated time, add `time[node] + 2` to `time[neighbor]`.
     - If the neighbor becomes a leaf (degree `1`) and isn't the root, add it to the queue.
4. Return `time[0]`.

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

```csharp
public class Solution {
    public int MinTime(int n, int[][] edges, List<bool> hasApple) {
        var adj = new Dictionary<int, List<int>>();
        for (int i = 0; i < n; i++) adj[i] = new List<int>();

        int[] indegree = new int[n];
        foreach (var e in edges) {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
            indegree[e[0]]++;
            indegree[e[1]]++;
        }

        var queue = new Queue<int>();
        for (int i = 1; i < n; i++) {
            if (indegree[i] == 1) {
                queue.Enqueue(i);
                indegree[i] = 0;
            }
        }

        int[] time = new int[n];
        while (queue.Count > 0) {
            int node = queue.Dequeue();
            foreach (var nei in adj[node]) {
                if (indegree[nei] <= 0) continue;

                indegree[nei]--;
                if (hasApple[node] || time[node] > 0)
                    time[nei] += time[node] + 2;
                if (indegree[nei] == 1 && nei != 0)
                    queue.Enqueue(nei);
            }
        }

        return time[0];
    }
}
```

```go
func minTime(n int, edges [][]int, hasApple []bool) int {
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }
    indegree := make([]int, n)
    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
        adj[edge[1]] = append(adj[edge[1]], edge[0])
        indegree[edge[0]]++
        indegree[edge[1]]++
    }

    queue := []int{}
    for i := 1; i < n; i++ {
        if indegree[i] == 1 {
            queue = append(queue, i)
            indegree[i] = 0
        }
    }

    time := make([]int, n)
    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        for _, nei := range adj[node] {
            if indegree[nei] <= 0 {
                continue
            }
            indegree[nei]--
            if hasApple[node] || time[node] > 0 {
                time[nei] += time[node] + 2
            }
            if indegree[nei] == 1 && nei != 0 {
                queue = append(queue, nei)
            }
        }
    }

    return time[0]
}
```

```kotlin
class Solution {
    fun minTime(n: Int, edges: Array<IntArray>, hasApple: List<Boolean>): Int {
        val adj = Array(n) { mutableListOf<Int>() }
        val indegree = IntArray(n)
        for (edge in edges) {
            adj[edge[0]].add(edge[1])
            adj[edge[1]].add(edge[0])
            indegree[edge[0]]++
            indegree[edge[1]]++
        }

        val queue = ArrayDeque<Int>()
        for (i in 1 until n) {
            if (indegree[i] == 1) {
                queue.add(i)
                indegree[i] = 0
            }
        }

        val time = IntArray(n)
        while (queue.isNotEmpty()) {
            val node = queue.removeFirst()
            for (nei in adj[node]) {
                if (indegree[nei] <= 0) continue
                indegree[nei]--
                if (hasApple[node] || time[node] > 0) {
                    time[nei] += time[node] + 2
                }
                if (indegree[nei] == 1 && nei != 0) {
                    queue.add(nei)
                }
            }
        }

        return time[0]
    }
}
```

```swift
class Solution {
    func minTime(_ n: Int, _ edges: [[Int]], _ hasApple: [Bool]) -> Int {
        var adj = [[Int]](repeating: [], count: n)
        var indegree = [Int](repeating: 0, count: n)
        for edge in edges {
            adj[edge[0]].append(edge[1])
            adj[edge[1]].append(edge[0])
            indegree[edge[0]] += 1
            indegree[edge[1]] += 1
        }

        var queue = [Int]()
        for i in 1..<n {
            if indegree[i] == 1 {
                queue.append(i)
                indegree[i] = 0
            }
        }

        var time = [Int](repeating: 0, count: n)
        var idx = 0
        while idx < queue.count {
            let node = queue[idx]
            idx += 1
            for nei in adj[node] {
                if indegree[nei] <= 0 { continue }
                indegree[nei] -= 1
                if hasApple[node] || time[node] > 0 {
                    time[nei] += time[node] + 2
                }
                if indegree[nei] == 1 && nei != 0 {
                    queue.append(nei)
                }
            }
        }

        return time[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## Common Pitfalls

### Not Tracking Parent Nodes

Since the tree is given as an undirected edge list, each edge appears in both directions in the adjacency list. Without tracking the parent node during DFS, you will revisit the parent as if it were a child, causing infinite recursion or incorrect double-counting of edges. Always pass the parent node to recursive calls and skip it when iterating through neighbors.

### Counting Edges Instead of Round Trips

Each edge must be traversed twice (once going down to collect apples, once coming back up). A common mistake is adding 1 instead of 2 to the time when an edge needs to be traversed. This results in answers that are exactly half of the correct value.

### Ignoring Apples in Subtrees

Some solutions only check if the current child node has an apple, forgetting that we also need to traverse to a child if its subtree contains apples deeper down. The correct condition is: traverse to a child if `hasApple[child]` is true OR if `childTime > 0` (meaning the subtree required time, indicating apples exist deeper).
