## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Tree/Graph Representation** - Understanding how to represent trees using adjacency lists and traversing undirected graphs
- **Depth First Search (DFS)** - Ability to traverse trees recursively while tracking parent nodes to avoid revisiting
- **Ceiling Division** - Knowing how to compute the ceiling of integer division (e.g., using `(a + b - 1) / b` or math.ceil)

---

## 1. Depth First Search

### Intuition

Think of the tree as a network of cities where everyone needs to travel to the capital (node `0`). Since the tree structure means there's only one path from any city to the capital, we can work backwards from the leaves.

The key insight is that as we move toward the capital, passengers accumulate. At each node, we collect all the people from its subtree, and the number of cars needed to transport them equals the ceiling of passengers divided by seats. By using `dfs` to traverse from leaves to the root, we can count passengers bottom-up and calculate fuel costs as people flow toward the capital.

### Algorithm

1. Build an adjacency list from the given roads.
2. Run `dfs` starting from node `0`, tracking the parent to avoid revisiting.
3. For each node, recursively gather passengers from all child subtrees.
4. After processing children, add the fuel cost for moving those passengers one edge closer to the capital: `ceil(passengers / seats)`.
5. Return total passengers from the subtree (including the current node's representative).
6. The accumulated fuel cost across all edges gives the answer.

::tabs-start

```python
class Solution:
    def minimumFuelCost(self, roads: list[list[int]], seats: int) -> int:
        adj = defaultdict(list)
        for src, dst in roads:
            adj[src].append(dst)
            adj[dst].append(src)

        res = 0
        def dfs(node, parent):
            nonlocal res
            passengers = 0
            for child in adj[node]:
                if child != parent:
                    p = dfs(child, node)
                    passengers += p
                    res += ceil(p / seats)
            return passengers + 1

        dfs(0, -1)
        return res
```

```java
public class Solution {
    private List<Integer>[] adj;
    private long res = 0;

    public long minimumFuelCost(int[][] roads, int seats) {
        int n = roads.length + 1;
        adj = new ArrayList[n];

        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int[] road : roads) {
            adj[road[0]].add(road[1]);
            adj[road[1]].add(road[0]);
        }

        dfs(0, -1, seats);
        return res;
    }

    private int dfs(int node, int parent, int seats) {
        int passengers = 0;
        for (int child : adj[node]) {
            if (child != parent) {
                int p = dfs(child, node, seats);
                passengers += p;
                res += Math.ceil((double) p / seats);
            }
        }
        return passengers + 1;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> adj;
    long long res = 0;

public:
    long long minimumFuelCost(vector<vector<int>>& roads, int seats) {
        int n = roads.size() + 1;
        adj.resize(n);

        for (auto& road : roads) {
            adj[road[0]].push_back(road[1]);
            adj[road[1]].push_back(road[0]);
        }

        dfs(0, -1, seats);
        return res;
    }

private:
    int dfs(int node, int parent, int seats) {
        int passengers = 0;
        for (int child : adj[node]) {
            if (child != parent) {
                int p = dfs(child, node, seats);
                passengers += p;
                res += ceil((double) p / seats);
            }
        }
        return passengers + 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} roads
     * @param {number} seats
     * @return {number}
     */
    minimumFuelCost(roads, seats) {
        const n = roads.length + 1;
        const adj = Array.from({ length: n }, () => []);
        let res = 0;

        for (const [src, dst] of roads) {
            adj[src].push(dst);
            adj[dst].push(src);
        }

        const dfs = (node, parent) => {
            let passengers = 0;
            for (const child of adj[node]) {
                if (child !== parent) {
                    let p = dfs(child, node);
                    passengers += p;
                    res += Math.ceil(p / seats);
                }
            }
            return passengers + 1;
        };

        dfs(0, -1);
        return res;
    }
}
```

```csharp
public class Solution {
    private List<int>[] adj;
    private long res = 0;

    public long MinimumFuelCost(int[][] roads, int seats) {
        int n = roads.Length + 1;
        adj = new List<int>[n];

        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
        }

        foreach (var road in roads) {
            adj[road[0]].Add(road[1]);
            adj[road[1]].Add(road[0]);
        }

        Dfs(0, -1, seats);
        return res;
    }

    private int Dfs(int node, int parent, int seats) {
        int passengers = 0;
        foreach (int child in adj[node]) {
            if (child != parent) {
                int p = Dfs(child, node, seats);
                passengers += p;
                res += (int)Math.Ceiling((double)p / seats);
            }
        }
        return passengers + 1;
    }
}
```

```go
func minimumFuelCost(roads [][]int, seats int) int64 {
    n := len(roads) + 1
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }

    for _, road := range roads {
        adj[road[0]] = append(adj[road[0]], road[1])
        adj[road[1]] = append(adj[road[1]], road[0])
    }

    var res int64 = 0

    var dfs func(node, parent int) int
    dfs = func(node, parent int) int {
        passengers := 0
        for _, child := range adj[node] {
            if child != parent {
                p := dfs(child, node)
                passengers += p
                res += int64((p + seats - 1) / seats)
            }
        }
        return passengers + 1
    }

    dfs(0, -1)
    return res
}
```

```kotlin
class Solution {
    private lateinit var adj: Array<MutableList<Int>>
    private var res = 0L

    fun minimumFuelCost(roads: Array<IntArray>, seats: Int): Long {
        val n = roads.size + 1
        adj = Array(n) { mutableListOf() }

        for (road in roads) {
            adj[road[0]].add(road[1])
            adj[road[1]].add(road[0])
        }

        dfs(0, -1, seats)
        return res
    }

    private fun dfs(node: Int, parent: Int, seats: Int): Int {
        var passengers = 0
        for (child in adj[node]) {
            if (child != parent) {
                val p = dfs(child, node, seats)
                passengers += p
                res += kotlin.math.ceil(p.toDouble() / seats).toLong()
            }
        }
        return passengers + 1
    }
}
```

```swift
class Solution {
    func minimumFuelCost(_ roads: [[Int]], _ seats: Int) -> Int {
        let n = roads.count + 1
        var adj = [[Int]](repeating: [], count: n)
        var res = 0

        for road in roads {
            adj[road[0]].append(road[1])
            adj[road[1]].append(road[0])
        }

        func dfs(_ node: Int, _ parent: Int) -> Int {
            var passengers = 0
            for child in adj[node] {
                if child != parent {
                    let p = dfs(child, node)
                    passengers += p
                    res += (p + seats - 1) / seats
                }
            }
            return passengers + 1
        }

        dfs(0, -1)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Topological Sort (Kahn's Algorithm)

### Intuition

Instead of recursion, we can process the tree level by level starting from the leaf nodes. Leaves have only one connection, so we identify them by their degree. As each leaf "sends" its passengers toward the capital, we remove it from consideration and check if its neighbor becomes a new leaf.

This approach simulates the natural flow of people gathering and moving inward. Each time a node is processed, we calculate how many cars are needed to transport its passengers one step closer to the root.

### Algorithm

1. Build an adjacency list and track the degree (number of edges) for each node.
2. Initialize a passengers array where each node starts with `1` (itself).
3. Add all nodes with degree `1` (except node `0`) to the queue as initial leaves.
4. Process the queue: for each leaf, add `ceil(passengers / seats)` to the total fuel.
5. Transfer the leaf's passengers to its neighbor and decrement the neighbor's degree.
6. If the neighbor becomes a leaf (degree `1`) and is not the capital, add it to the queue.
7. Return the total fuel cost.

::tabs-start

```python
class Solution:
    def minimumFuelCost(self, roads: list[list[int]], seats: int) -> int:
        n = len(roads) + 1
        adj = [[] for _ in range(n)]
        indegree = [0] * n
        passengers = [1] * n
        res = 0

        for src, dst in roads:
            adj[src].append(dst)
            adj[dst].append(src)
            indegree[src] += 1
            indegree[dst] += 1

        q = deque()
        for i in range(1, n):
            if indegree[i] == 1:
                q.append(i)

        while q:
            node = q.popleft()
            res += math.ceil(passengers[node] / seats)
            for parent in adj[node]:
                indegree[parent] -= 1
                if indegree[parent] == 1 and parent != 0:
                    q.append(parent)
                passengers[parent] += passengers[node]

        return res
```

```java
public class Solution {
    public long minimumFuelCost(int[][] roads, int seats) {
        int n = roads.length + 1;
        List<Integer>[] adj = new ArrayList[n];
        int[] indegree = new int[n];
        int[] passengers = new int[n];
        Arrays.fill(passengers, 1);
        long res = 0;

        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();

        for (int[] road : roads) {
            int src = road[0], dst = road[1];
            adj[src].add(dst);
            adj[dst].add(src);
            indegree[src]++;
            indegree[dst]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 1; i < n; i++) {
            if (indegree[i] == 1) q.offer(i);
        }

        while (!q.isEmpty()) {
            int node = q.poll();
            res += (int) Math.ceil((double) passengers[node] / seats);
            for (int parent : adj[node]) {
                if (--indegree[parent] == 1 && parent != 0) q.offer(parent);
                passengers[parent] += passengers[node];
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long minimumFuelCost(vector<vector<int>>& roads, int seats) {
        int n = roads.size() + 1;
        vector<vector<int>> adj(n);
        vector<int> indegree(n, 0), passengers(n, 1);
        long long res = 0;

        for (auto& road : roads) {
            int src = road[0], dst = road[1];
            adj[src].push_back(dst);
            adj[dst].push_back(src);
            indegree[src]++;
            indegree[dst]++;
        }

        queue<int> q;
        for (int i = 1; i < n; i++) {
            if (indegree[i] == 1) q.push(i);
        }

        while (!q.empty()) {
            int node = q.front();q.pop();
            res += ceil((double) passengers[node] / seats);
            for (int parent : adj[node]) {
                if (--indegree[parent] == 1 && parent != 0) q.push(parent);
                passengers[parent] += passengers[node];
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} roads
     * @param {number} seats
     * @return {number}
     */
    minimumFuelCost(roads, seats) {
        const n = roads.length + 1;
        const adj = Array.from({ length: n }, () => []);
        const indegree = new Array(n).fill(0);
        const passengers = new Array(n).fill(1);
        let res = 0;

        for (const [src, dst] of roads) {
            adj[src].push(dst);
            adj[dst].push(src);
            indegree[src] += 1;
            indegree[dst] += 1;
        }

        const q = new Queue();
        for (let i = 1; i < n; i++) {
            if (indegree[i] === 1) q.push(i);
        }

        while (!q.isEmpty()) {
            const node = q.pop();
            res += Math.ceil(passengers[node] / seats);
            for (const parent of adj[node]) {
                if (--indegree[parent] === 1 && parent !== 0) q.push(parent);
                passengers[parent] += passengers[node];
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long MinimumFuelCost(int[][] roads, int seats) {
        int n = roads.Length + 1;
        List<int>[] adj = new List<int>[n];
        int[] indegree = new int[n];
        int[] passengers = new int[n];
        Array.Fill(passengers, 1);
        long res = 0;

        for (int i = 0; i < n; i++) adj[i] = new List<int>();

        foreach (var road in roads) {
            int src = road[0], dst = road[1];
            adj[src].Add(dst);
            adj[dst].Add(src);
            indegree[src]++;
            indegree[dst]++;
        }

        Queue<int> q = new Queue<int>();
        for (int i = 1; i < n; i++) {
            if (indegree[i] == 1) q.Enqueue(i);
        }

        while (q.Count > 0) {
            int node = q.Dequeue();
            res += (int)Math.Ceiling((double)passengers[node] / seats);
            foreach (int parent in adj[node]) {
                if (--indegree[parent] == 1 && parent != 0) q.Enqueue(parent);
                passengers[parent] += passengers[node];
            }
        }

        return res;
    }
}
```

```go
func minimumFuelCost(roads [][]int, seats int) int64 {
    n := len(roads) + 1
    adj := make([][]int, n)
    indegree := make([]int, n)
    passengers := make([]int, n)
    for i := range passengers {
        passengers[i] = 1
    }
    var res int64 = 0

    for i := range adj {
        adj[i] = []int{}
    }

    for _, road := range roads {
        src, dst := road[0], road[1]
        adj[src] = append(adj[src], dst)
        adj[dst] = append(adj[dst], src)
        indegree[src]++
        indegree[dst]++
    }

    q := []int{}
    for i := 1; i < n; i++ {
        if indegree[i] == 1 {
            q = append(q, i)
        }
    }

    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        res += int64((passengers[node] + seats - 1) / seats)
        for _, parent := range adj[node] {
            indegree[parent]--
            if indegree[parent] == 1 && parent != 0 {
                q = append(q, parent)
            }
            passengers[parent] += passengers[node]
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun minimumFuelCost(roads: Array<IntArray>, seats: Int): Long {
        val n = roads.size + 1
        val adj = Array(n) { mutableListOf<Int>() }
        val indegree = IntArray(n)
        val passengers = IntArray(n) { 1 }
        var res = 0L

        for (road in roads) {
            val (src, dst) = road
            adj[src].add(dst)
            adj[dst].add(src)
            indegree[src]++
            indegree[dst]++
        }

        val q = ArrayDeque<Int>()
        for (i in 1 until n) {
            if (indegree[i] == 1) q.add(i)
        }

        while (q.isNotEmpty()) {
            val node = q.removeFirst()
            res += kotlin.math.ceil(passengers[node].toDouble() / seats).toLong()
            for (parent in adj[node]) {
                if (--indegree[parent] == 1 && parent != 0) q.add(parent)
                passengers[parent] += passengers[node]
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func minimumFuelCost(_ roads: [[Int]], _ seats: Int) -> Int {
        let n = roads.count + 1
        var adj = [[Int]](repeating: [], count: n)
        var indegree = [Int](repeating: 0, count: n)
        var passengers = [Int](repeating: 1, count: n)
        var res = 0

        for road in roads {
            let src = road[0], dst = road[1]
            adj[src].append(dst)
            adj[dst].append(src)
            indegree[src] += 1
            indegree[dst] += 1
        }

        var q = [Int]()
        for i in 1..<n {
            if indegree[i] == 1 { q.append(i) }
        }

        while !q.isEmpty {
            let node = q.removeFirst()
            res += (passengers[node] + seats - 1) / seats
            for parent in adj[node] {
                indegree[parent] -= 1
                if indegree[parent] == 1 && parent != 0 { q.append(parent) }
                passengers[parent] += passengers[node]
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Counting Fuel for the Capital Node

The capital (node 0) does not need to travel anywhere, so you should not add fuel cost for passengers arriving at node 0. A common mistake is calculating `ceil(passengers / seats)` for the capital itself, which incorrectly inflates the total fuel cost.

### Incorrect Ceiling Division

When calculating cars needed, you need `ceil(passengers / seats)`. Integer division truncates, so `7 / 3 = 2` instead of the correct `3`. Use `(passengers + seats - 1) / seats` or a ceiling function to get the correct result. Floating-point division with casting can also introduce precision errors.

### Revisiting the Parent in DFS

Since the graph is undirected, the adjacency list includes edges in both directions. When traversing with DFS, you must skip the parent node to avoid infinite recursion. Forgetting to pass and check the parent parameter causes stack overflow or incorrect passenger counts.
