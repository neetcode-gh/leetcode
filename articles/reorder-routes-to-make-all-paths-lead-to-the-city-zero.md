## 1. Depth First Search - I

### Intuition

We need all cities to reach city 0, so we traverse outward from city 0 and check edge directions. Build an undirected `neighbors` graph for traversal, but store original edges in `edges` set to check direction. When moving from `city` A to `neighbor` B, if the original edge goes from A to B (away from 0), it needs to be reversed. `dfs` ensures we visit every city exactly once.

### Algorithm

1. Store all original directed edges in a set called `edges` as `(a, b)` pairs.
2. Build an adjacency list called `neighbors` treating edges as undirected.
3. Start `dfs` from city 0, marking visited cities in `visit` set.
4. For each `neighbor`:
   - If not visited, check if `(neighbor, city)` exists in the `edges` set.
   - If not, the edge points away from 0 and needs reversal; increment `changes`.
   - Recursively visit the `neighbor`.
5. Return the total count of edges to reverse.

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

```csharp
public class Solution {
    private Dictionary<int, List<int>> neighbors;
    private bool[] visit;
    private HashSet<string> edges;

    public int MinReorder(int n, int[][] connections) {
        edges = new HashSet<string>();
        neighbors = new Dictionary<int, List<int>>();
        visit = new bool[n];
        int changes = 0;

        for (int i = 0; i < n; i++) {
            neighbors[i] = new List<int>();
        }

        foreach (var conn in connections) {
            int a = conn[0], b = conn[1];
            edges.Add($"{a},{b}");
            neighbors[a].Add(b);
            neighbors[b].Add(a);
        }

        void Dfs(int city) {
            visit[city] = true;
            foreach (int neighbor in neighbors[city]) {
                if (visit[neighbor]) continue;
                if (!edges.Contains($"{neighbor},{city}")) changes++;
                Dfs(neighbor);
            }
        }

        Dfs(0);
        return changes;
    }
}
```

```go
func minReorder(n int, connections [][]int) int {
    edges := make(map[string]bool)
    neighbors := make([][]int, n)
    visit := make([]bool, n)
    changes := 0

    for i := 0; i < n; i++ {
        neighbors[i] = []int{}
    }

    for _, conn := range connections {
        a, b := conn[0], conn[1]
        edges[fmt.Sprintf("%d,%d", a, b)] = true
        neighbors[a] = append(neighbors[a], b)
        neighbors[b] = append(neighbors[b], a)
    }

    var dfs func(city int)
    dfs = func(city int) {
        visit[city] = true
        for _, neighbor := range neighbors[city] {
            if visit[neighbor] {
                continue
            }
            if !edges[fmt.Sprintf("%d,%d", neighbor, city)] {
                changes++
            }
            dfs(neighbor)
        }
    }

    dfs(0)
    return changes
}
```

```kotlin
class Solution {
    fun minReorder(n: Int, connections: Array<IntArray>): Int {
        val edges = HashSet<String>()
        val neighbors = Array(n) { mutableListOf<Int>() }
        val visit = BooleanArray(n)
        var changes = 0

        for (conn in connections) {
            val (a, b) = conn[0] to conn[1]
            edges.add("$a,$b")
            neighbors[a].add(b)
            neighbors[b].add(a)
        }

        fun dfs(city: Int) {
            visit[city] = true
            for (neighbor in neighbors[city]) {
                if (visit[neighbor]) continue
                if (!edges.contains("$neighbor,$city")) changes++
                dfs(neighbor)
            }
        }

        dfs(0)
        return changes
    }
}
```

```swift
class Solution {
    func minReorder(_ n: Int, _ connections: [[Int]]) -> Int {
        var edges = Set<String>()
        var neighbors = [[Int]](repeating: [], count: n)
        var visit = [Bool](repeating: false, count: n)
        var changes = 0

        for conn in connections {
            let a = conn[0], b = conn[1]
            edges.insert("\(a),\(b)")
            neighbors[a].append(b)
            neighbors[b].append(a)
        }

        func dfs(_ city: Int) {
            visit[city] = true
            for neighbor in neighbors[city] {
                if visit[neighbor] { continue }
                if !edges.contains("\(neighbor),\(city)") { changes += 1 }
                dfs(neighbor)
            }
        }

        dfs(0)
        return changes
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Depth First Search - II

### Intuition

Instead of using a separate set to track edge directions, we can encode direction information directly in the adjacency list. When adding edges, we store the original direction as a positive value and the reverse as negative. During `dfs`, positive `nei` values indicate edges pointing away from city 0, which need reversal.

### Algorithm

1. Build an adjacency list called `adj` where each edge `(u, v)` adds `v` to `adj[u]` and `-u` to `adj[v]`.
2. Start `dfs` from city 0 with `parent = -1`.
3. For each `nei` (neighbor):
   - Skip if `abs(nei)` equals the `parent` (to avoid going back).
   - Add 1 to the count if `nei > 0` (edge needs reversal).
   - Recursively process `abs(nei)` as the next `node`.
4. Return the total count.

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

```csharp
public class Solution {
    public int MinReorder(int n, int[][] connections) {
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();

        foreach (var conn in connections) {
            adj[conn[0]].Add(conn[1]);
            adj[conn[1]].Add(-conn[0]);
        }

        int Dfs(int node, int parent) {
            int changes = 0;
            foreach (int nei in adj[node]) {
                if (Math.Abs(nei) == parent) continue;
                changes += Dfs(Math.Abs(nei), node) + (nei > 0 ? 1 : 0);
            }
            return changes;
        }

        return Dfs(0, -1);
    }
}
```

```go
func minReorder(n int, connections [][]int) int {
    adj := make([][]int, n)
    for i := 0; i < n; i++ {
        adj[i] = []int{}
    }

    for _, conn := range connections {
        u, v := conn[0], conn[1]
        adj[u] = append(adj[u], v)
        adj[v] = append(adj[v], -u)
    }

    var dfs func(node, parent int) int
    dfs = func(node, parent int) int {
        changes := 0
        for _, nei := range adj[node] {
            absNei := nei
            if absNei < 0 {
                absNei = -absNei
            }
            if absNei == parent {
                continue
            }
            add := 0
            if nei > 0 {
                add = 1
            }
            changes += dfs(absNei, node) + add
        }
        return changes
    }

    return dfs(0, -1)
}
```

```kotlin
class Solution {
    fun minReorder(n: Int, connections: Array<IntArray>): Int {
        val adj = Array(n) { mutableListOf<Int>() }

        for (conn in connections) {
            adj[conn[0]].add(conn[1])
            adj[conn[1]].add(-conn[0])
        }

        fun dfs(node: Int, parent: Int): Int {
            var changes = 0
            for (nei in adj[node]) {
                if (kotlin.math.abs(nei) == parent) continue
                changes += dfs(kotlin.math.abs(nei), node) + if (nei > 0) 1 else 0
            }
            return changes
        }

        return dfs(0, -1)
    }
}
```

```swift
class Solution {
    func minReorder(_ n: Int, _ connections: [[Int]]) -> Int {
        var adj = [[Int]](repeating: [], count: n)

        for conn in connections {
            adj[conn[0]].append(conn[1])
            adj[conn[1]].append(-conn[0])
        }

        func dfs(_ node: Int, _ parent: Int) -> Int {
            var changes = 0
            for nei in adj[node] {
                if abs(nei) == parent { continue }
                changes += dfs(abs(nei), node) + (nei > 0 ? 1 : 0)
            }
            return changes
        }

        return dfs(0, -1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Breadth First Search

### Intuition

`bfs` works equally well since we just need to visit all nodes once from city 0. We store each edge with a flag `isForward` indicating if it is a forward edge (pointing away from city 0). Processing level by level in `queue`, whenever we traverse a forward edge, we count it as needing reversal.

### Algorithm

1. Build an adjacency list called `adj` where each edge `(u, v)` stores `(v, 1)` in `adj[u]` and `(u, 0)` in `adj[v]`.
2. Initialize a `queue` with city 0 and mark it visited in `visit` array.
3. While the `queue` is not empty:
   - Dequeue a `node`.
   - For each unvisited `neighbor`, mark it visited, add `isForward` to the count, and enqueue it.
4. Return the total count.

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

```csharp
public class Solution {
    public int MinReorder(int n, int[][] connections) {
        var adj = new List<int[]>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int[]>();

        foreach (var conn in connections) {
            adj[conn[0]].Add(new int[] { conn[1], 1 });
            adj[conn[1]].Add(new int[] { conn[0], 0 });
        }

        var visited = new bool[n];
        var queue = new Queue<int>();
        queue.Enqueue(0);
        visited[0] = true;
        int changes = 0;

        while (queue.Count > 0) {
            int node = queue.Dequeue();
            foreach (var edge in adj[node]) {
                int neighbor = edge[0], isForward = edge[1];
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    changes += isForward;
                    queue.Enqueue(neighbor);
                }
            }
        }
        return changes;
    }
}
```

```go
func minReorder(n int, connections [][]int) int {
    adj := make([][][2]int, n)
    for i := 0; i < n; i++ {
        adj[i] = [][2]int{}
    }

    for _, conn := range connections {
        adj[conn[0]] = append(adj[conn[0]], [2]int{conn[1], 1})
        adj[conn[1]] = append(adj[conn[1]], [2]int{conn[0], 0})
    }

    visited := make([]bool, n)
    queue := []int{0}
    visited[0] = true
    changes := 0

    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        for _, edge := range adj[node] {
            neighbor, isForward := edge[0], edge[1]
            if !visited[neighbor] {
                visited[neighbor] = true
                changes += isForward
                queue = append(queue, neighbor)
            }
        }
    }
    return changes
}
```

```kotlin
class Solution {
    fun minReorder(n: Int, connections: Array<IntArray>): Int {
        val adj = Array(n) { mutableListOf<IntArray>() }

        for (conn in connections) {
            adj[conn[0]].add(intArrayOf(conn[1], 1))
            adj[conn[1]].add(intArrayOf(conn[0], 0))
        }

        val visited = BooleanArray(n)
        val queue = ArrayDeque<Int>()
        queue.add(0)
        visited[0] = true
        var changes = 0

        while (queue.isNotEmpty()) {
            val node = queue.removeFirst()
            for (edge in adj[node]) {
                val (neighbor, isForward) = edge[0] to edge[1]
                if (!visited[neighbor]) {
                    visited[neighbor] = true
                    changes += isForward
                    queue.add(neighbor)
                }
            }
        }
        return changes
    }
}
```

```swift
class Solution {
    func minReorder(_ n: Int, _ connections: [[Int]]) -> Int {
        var adj = [[(Int, Int)]](repeating: [], count: n)

        for conn in connections {
            adj[conn[0]].append((conn[1], 1))
            adj[conn[1]].append((conn[0], 0))
        }

        var visited = [Bool](repeating: false, count: n)
        var queue = [Int]()
        queue.append(0)
        visited[0] = true
        var changes = 0

        while !queue.isEmpty {
            let node = queue.removeFirst()
            for (neighbor, isForward) in adj[node] {
                if !visited[neighbor] {
                    visited[neighbor] = true
                    changes += isForward
                    queue.append(neighbor)
                }
            }
        }
        return changes
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
