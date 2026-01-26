## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Graph Representation** - Understanding adjacency lists and how to represent directed graphs from edge arrays
- **Breadth-First Search (BFS)** - Computing shortest distances in unweighted graphs using queue-based traversal
- **Depth-First Search (DFS)** - Traversing graph paths iteratively or recursively while tracking visited nodes

---

## 1. Breadth First Search

### Intuition

We want a node reachable from both `node1` and `node2` that minimizes the maximum of the two distances. First, we compute distances from `node1` to all reachable nodes, then do the same from `node2`. For each node reachable from both, the "cost" is the larger of the two distances. We pick the node with the smallest such cost, breaking ties by choosing the smaller index.

### Algorithm

1. Build an adjacency list from the edges array.
2. Run BFS from `node1` to compute distances to all reachable nodes, storing them in `node1Dist`.
3. Run BFS from `node2` to compute distances, storing them in `node2Dist`.
4. Iterate through all nodes. For each node reachable from both sources:
   - Compute `dist = max(node1Dist[i], node2Dist[i])`.
   - If this is smaller than the best seen so far, update the result.
5. Return the best node index, or `-1` if none exists.

::tabs-start

```python
class Solution:
    def closestMeetingNode(self, edges: list[int], node1: int, node2: int) -> int:
        adj = defaultdict(list)
        for i, nei in enumerate(edges):
            adj[i].append(nei)

        def bfs(src, distMap):
            q = deque([(src, 0)])
            distMap[src] = 0
            while q:
                node, dist = q.popleft()
                for nei in adj[node]:
                    if nei not in distMap:
                        q.append((nei, dist + 1))
                        distMap[nei] = dist + 1

        node1Dist, node2Dist = {}, {}
        bfs(node1, node1Dist)
        bfs(node2, node2Dist)

        res, resDist = -1, float("inf")
        for i in range(len(edges)):
            if i in node1Dist and i in node2Dist:
                dist = max(node1Dist[i], node2Dist[i])
                if dist < resDist:
                    resDist, res = dist, i

        return res
```

```java
public class Solution {
    public int closestMeetingNode(int[] edges, int node1, int node2) {
        int n = edges.length;
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (edges[i] != -1) adj[i].add(edges[i]);
        }

        int[] node1Dist = bfs(node1, n, adj);
        int[] node2Dist = bfs(node2, n, adj);

        int res = -1, resDist = Integer.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            if (node1Dist[i] != -1 && node2Dist[i] != -1) {
                int dist = Math.max(node1Dist[i], node2Dist[i]);
                if (dist < resDist) {
                    resDist = dist;
                    res = i;
                }
            }
        }
        return res;
    }

    private int[] bfs(int src, int n, List<Integer>[] adj) {
        int[] distMap = new int[n];
        Arrays.fill(distMap, -1);
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{src, 0});
        distMap[src] = 0;

        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int node = cur[0], dist = cur[1];

            for (int nei : adj[node]) {
                if (distMap[nei] == -1) {
                    q.offer(new int[]{nei, dist + 1});
                    distMap[nei] = dist + 1;
                }
            }
        }
        return distMap;
    }
}
```

```cpp
class Solution {
public:
    int closestMeetingNode(vector<int>& edges, int node1, int node2) {
        int n = edges.size();
        vector<vector<int>> adj(n);
        for (int i = 0; i < n; i++) {
            if (edges[i] != -1) adj[i].push_back(edges[i]);
        }

        vector<int> node1Dist = bfs(node1, n, adj);
        vector<int> node2Dist = bfs(node2, n, adj);

        int res = -1, resDist = INT_MAX;
        for (int i = 0; i < n; i++) {
            if (node1Dist[i] != -1 && node2Dist[i] != -1) {
                int dist = max(node1Dist[i], node2Dist[i]);
                if (dist < resDist) {
                    resDist = dist;
                    res = i;
                }
            }
        }
        return res;
    }

private:
    vector<int> bfs(int src, int n, vector<vector<int>>& adj) {
        vector<int> distMap(n, -1);
        queue<pair<int, int>> q;
        q.push({src, 0});
        distMap[src] = 0;

        while (!q.empty()) {
            auto [node, dist] = q.front();
            q.pop();

            for (int nei : adj[node]) {
                if (distMap[nei] == -1) {
                    q.push({nei, dist + 1});
                    distMap[nei] = dist + 1;
                }
            }
        }
        return distMap;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} edges
     * @param {number} node1
     * @param {number} node2
     * @return {number}
     */
    closestMeetingNode(edges, node1, node2) {
        const n = edges.length;
        const adj = Array.from({ length: n }, () => []);
        for (let i = 0; i < n; i++) {
            if (edges[i] !== -1) adj[i].push(edges[i]);
        }

        const bfs = (src) => {
            const distMap = Array(n).fill(-1);
            const q = new Queue([[src, 0]]);
            distMap[src] = 0;

            while (!q.isEmpty()) {
                const [node, dist] = q.pop();
                for (const nei of adj[node]) {
                    if (distMap[nei] === -1) {
                        q.push([nei, dist + 1]);
                        distMap[nei] = dist + 1;
                    }
                }
            }
            return distMap;
        };

        const node1Dist = bfs(node1);
        const node2Dist = bfs(node2);

        let res = -1,
            resDist = Infinity;
        for (let i = 0; i < n; i++) {
            if (node1Dist[i] !== -1 && node2Dist[i] !== -1) {
                let dist = Math.max(node1Dist[i], node2Dist[i]);
                if (dist < resDist) {
                    resDist = dist;
                    res = i;
                }
            }
        }
        return res;
    }
}
```

```go
func closestMeetingNode(edges []int, node1 int, node2 int) int {
    n := len(edges)
    adj := make([][]int, n)
    for i := 0; i < n; i++ {
        adj[i] = []int{}
        if edges[i] != -1 {
            adj[i] = append(adj[i], edges[i])
        }
    }

    bfs := func(src int) []int {
        distMap := make([]int, n)
        for i := range distMap {
            distMap[i] = -1
        }
        q := [][]int{{src, 0}}
        distMap[src] = 0

        for len(q) > 0 {
            node, dist := q[0][0], q[0][1]
            q = q[1:]
            for _, nei := range adj[node] {
                if distMap[nei] == -1 {
                    q = append(q, []int{nei, dist + 1})
                    distMap[nei] = dist + 1
                }
            }
        }
        return distMap
    }

    node1Dist := bfs(node1)
    node2Dist := bfs(node2)

    res, resDist := -1, math.MaxInt32
    for i := 0; i < n; i++ {
        if node1Dist[i] != -1 && node2Dist[i] != -1 {
            dist := max(node1Dist[i], node2Dist[i])
            if dist < resDist {
                resDist = dist
                res = i
            }
        }
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun closestMeetingNode(edges: IntArray, node1: Int, node2: Int): Int {
        val n = edges.size
        val adj = Array(n) { mutableListOf<Int>() }
        for (i in 0 until n) {
            if (edges[i] != -1) adj[i].add(edges[i])
        }

        fun bfs(src: Int): IntArray {
            val distMap = IntArray(n) { -1 }
            val q: ArrayDeque<Pair<Int, Int>> = ArrayDeque()
            q.add(Pair(src, 0))
            distMap[src] = 0

            while (q.isNotEmpty()) {
                val (node, dist) = q.removeFirst()
                for (nei in adj[node]) {
                    if (distMap[nei] == -1) {
                        q.add(Pair(nei, dist + 1))
                        distMap[nei] = dist + 1
                    }
                }
            }
            return distMap
        }

        val node1Dist = bfs(node1)
        val node2Dist = bfs(node2)

        var res = -1
        var resDist = Int.MAX_VALUE
        for (i in 0 until n) {
            if (node1Dist[i] != -1 && node2Dist[i] != -1) {
                val dist = maxOf(node1Dist[i], node2Dist[i])
                if (dist < resDist) {
                    resDist = dist
                    res = i
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func closestMeetingNode(_ edges: [Int], _ node1: Int, _ node2: Int) -> Int {
        let n = edges.count
        var adj = [[Int]](repeating: [], count: n)
        for i in 0..<n {
            if edges[i] != -1 {
                adj[i].append(edges[i])
            }
        }

        func bfs(_ src: Int) -> [Int] {
            var distMap = [Int](repeating: -1, count: n)
            var q = [(src, 0)]
            distMap[src] = 0

            while !q.isEmpty {
                let (node, dist) = q.removeFirst()
                for nei in adj[node] {
                    if distMap[nei] == -1 {
                        q.append((nei, dist + 1))
                        distMap[nei] = dist + 1
                    }
                }
            }
            return distMap
        }

        let node1Dist = bfs(node1)
        let node2Dist = bfs(node2)

        var res = -1
        var resDist = Int.max
        for i in 0..<n {
            if node1Dist[i] != -1 && node2Dist[i] != -1 {
                let dist = max(node1Dist[i], node2Dist[i])
                if dist < resDist {
                    resDist = dist
                    res = i
                }
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

## 2. Breadth First Search (Optimal)

### Intuition

Since each node has at most one outgoing edge, we do not need a full adjacency list. We can traverse directly using the edges array. The BFS logic remains the same, but we simplify by following `edges[node]` directly instead of iterating through neighbors.

### Algorithm

1. Run BFS from `node1`: follow `edges[node]` until we hit `-1` or revisit a node, recording distances in `node1Dist`.
2. Run BFS from `node2` the same way, storing results in `node2Dist`.
3. Scan all nodes. For each one reachable from both sources, track the minimum of `max(node1Dist[i], node2Dist[i])`.
4. Return the node with the smallest maximum distance, or `-1` if unreachable.

::tabs-start

```python
class Solution:
    def closestMeetingNode(self, edges: list[int], node1: int, node2: int) -> int:
        n = len(edges)

        def bfs(src):
            dist = [-1] * n
            q = deque([src])
            dist[src] = 0

            while q:
                node = q.popleft()
                nei = edges[node]
                if nei == -1 or dist[nei] >= 0:
                    continue
                q.append(nei)
                dist[nei] = dist[node] + 1
            return dist

        node1Dist, node2Dist = bfs(node1), bfs(node2)

        res, resDist = -1, float("inf")
        for i in range(n):
            if node1Dist[i] != -1 and node2Dist[i] != -1:
                dist = max(node1Dist[i], node2Dist[i])
                if dist < resDist:
                    resDist, res = dist, i

        return res
```

```java
public class Solution {
    public int closestMeetingNode(int[] edges, int node1, int node2) {
        int n = edges.length;
        int[] node1Dist = bfs(node1, edges, n);
        int[] node2Dist = bfs(node2, edges, n);

        int res = -1, resDist = Integer.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            if (node1Dist[i] != -1 && node2Dist[i] != -1) {
                int dist = Math.max(node1Dist[i], node2Dist[i]);
                if (dist < resDist) {
                    resDist = dist;
                    res = i;
                }
            }
        }

        return res;
    }

    private int[] bfs(int src, int[] edges, int n) {
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new LinkedList<>();
        q.offer(src);
        dist[src] = 0;

        while (!q.isEmpty()) {
            int node = q.poll();
            int nei = edges[node];
            if (nei == -1 || dist[nei] != -1) {
                continue;
            }

            q.offer(nei);
            dist[nei] = dist[node] + 1;
        }
        return dist;
    }
}
```

```cpp
class Solution {
public:
    int closestMeetingNode(vector<int>& edges, int node1, int node2) {
        int n = edges.size();
        vector<int> node1Dist = bfs(node1, edges, n);
        vector<int> node2Dist = bfs(node2, edges, n);

        int res = -1, resDist = INT_MAX;
        for (int i = 0; i < n; i++) {
            if (node1Dist[i] != -1 && node2Dist[i] != -1) {
                int dist = max(node1Dist[i], node2Dist[i]);
                if (dist < resDist) {
                    resDist = dist;
                    res = i;
                }
            }
        }
        return res;
    }

private:
    vector<int> bfs(int src, vector<int>& edges, int n) {
        vector<int> dist(n, -1);
        queue<int> q;
        q.push(src);
        dist[src] = 0;

        while (!q.empty()) {
            int node = q.front();
            q.pop();
            int nei = edges[node];
            if (nei == -1 || dist[nei] != -1) {
                continue;
            }

            q.push(nei);
            dist[nei] = dist[node] + 1;
        }
        return dist;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} edges
     * @param {number} node1
     * @param {number} node2
     * @return {number}
     */
    closestMeetingNode(edges, node1, node2) {
        const n = edges.length;

        const bfs = (src) => {
            const dist = Array(n).fill(-1);
            const q = new Queue([src]);
            dist[src] = 0;

            while (!q.isEmpty()) {
                const node = q.pop();
                const nei = edges[node];
                if (nei === -1 || dist[nei] !== -1) {
                    continue;
                }

                q.push(nei);
                dist[nei] = dist[node] + 1;
            }
            return dist;
        };

        const node1Dist = bfs(node1);
        const node2Dist = bfs(node2);

        let res = -1,
            resDist = Infinity;
        for (let i = 0; i < n; i++) {
            if (node1Dist[i] !== -1 && node2Dist[i] !== -1) {
                let dist = Math.max(node1Dist[i], node2Dist[i]);
                if (dist < resDist) {
                    resDist = dist;
                    res = i;
                }
            }
        }
        return res;
    }
}
```

```go
func closestMeetingNode(edges []int, node1 int, node2 int) int {
    n := len(edges)

    bfs := func(src int) []int {
        dist := make([]int, n)
        for i := range dist {
            dist[i] = -1
        }
        q := []int{src}
        dist[src] = 0

        for len(q) > 0 {
            node := q[0]
            q = q[1:]
            nei := edges[node]
            if nei == -1 || dist[nei] != -1 {
                continue
            }
            q = append(q, nei)
            dist[nei] = dist[node] + 1
        }
        return dist
    }

    node1Dist := bfs(node1)
    node2Dist := bfs(node2)

    res, resDist := -1, math.MaxInt32
    for i := 0; i < n; i++ {
        if node1Dist[i] != -1 && node2Dist[i] != -1 {
            dist := max(node1Dist[i], node2Dist[i])
            if dist < resDist {
                resDist = dist
                res = i
            }
        }
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun closestMeetingNode(edges: IntArray, node1: Int, node2: Int): Int {
        val n = edges.size

        fun bfs(src: Int): IntArray {
            val dist = IntArray(n) { -1 }
            val q: ArrayDeque<Int> = ArrayDeque()
            q.add(src)
            dist[src] = 0

            while (q.isNotEmpty()) {
                val node = q.removeFirst()
                val nei = edges[node]
                if (nei == -1 || dist[nei] != -1) {
                    continue
                }
                q.add(nei)
                dist[nei] = dist[node] + 1
            }
            return dist
        }

        val node1Dist = bfs(node1)
        val node2Dist = bfs(node2)

        var res = -1
        var resDist = Int.MAX_VALUE
        for (i in 0 until n) {
            if (node1Dist[i] != -1 && node2Dist[i] != -1) {
                val dist = maxOf(node1Dist[i], node2Dist[i])
                if (dist < resDist) {
                    resDist = dist
                    res = i
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func closestMeetingNode(_ edges: [Int], _ node1: Int, _ node2: Int) -> Int {
        let n = edges.count

        func bfs(_ src: Int) -> [Int] {
            var dist = [Int](repeating: -1, count: n)
            var q = [src]
            dist[src] = 0

            while !q.isEmpty {
                let node = q.removeFirst()
                let nei = edges[node]
                if nei == -1 || dist[nei] != -1 {
                    continue
                }
                q.append(nei)
                dist[nei] = dist[node] + 1
            }
            return dist
        }

        let node1Dist = bfs(node1)
        let node2Dist = bfs(node2)

        var res = -1
        var resDist = Int.max
        for i in 0..<n {
            if node1Dist[i] != -1 && node2Dist[i] != -1 {
                let dist = max(node1Dist[i], node2Dist[i])
                if dist < resDist {
                    resDist = dist
                    res = i
                }
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

## 3. Depth First Search

### Intuition

DFS achieves the same goal as BFS here. Starting from each source node, we recursively follow edges and record distances. The graph structure (each node has at most one outgoing edge) means DFS naturally follows the single path from each source without branching.

### Algorithm

1. Initialize distance arrays `node1Dist` and `node2Dist` with `-1` (unreachable).
2. Set `node1Dist[node1] = 0` and `node2Dist[node2] = 0`.
3. Run DFS from `node1`: for each unvisited neighbor, set its distance and recurse.
4. Run DFS from `node2` similarly.
5. Find the node with the minimum value of `max(node1Dist[i], node2Dist[i])` among nodes reachable from both.
6. Return that node, or `-1` if none.

::tabs-start

```python
class Solution:
    def closestMeetingNode(self, edges: List[int], node1: int, node2: int) -> int:
        n = len(edges)

        def dfs(node, dist):
            nei = edges[node]
            if nei != -1 and dist[nei] == -1:
                dist[nei] = dist[node] + 1
                dfs(nei, dist)

        node1Dist = [-1] * n
        node2Dist = [-1] * n
        node1Dist[node1] = node2Dist[node2] = 0

        dfs(node1, node1Dist)
        dfs(node2, node2Dist)

        res, resDist = -1, float("inf")
        for i in range(n):
            if min(node1Dist[i], node2Dist[i]) != -1:
                dist = max(node1Dist[i], node2Dist[i])
                if dist < resDist:
                    resDist, res = dist, i

        return res
```

```java
public class Solution {
    public int closestMeetingNode(int[] edges, int node1, int node2) {
        int n = edges.length;
        int[] node1Dist = new int[n];
        int[] node2Dist = new int[n];
        Arrays.fill(node1Dist, -1);
        Arrays.fill(node2Dist, -1);
        node1Dist[node1] = 0;
        node2Dist[node2] = 0;

        dfs(node1, edges, node1Dist);
        dfs(node2, edges, node2Dist);

        int res = -1, resDist = Integer.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            if (Math.min(node1Dist[i], node2Dist[i]) != -1) {
                int dist = Math.max(node1Dist[i], node2Dist[i]);
                if (dist < resDist) {
                    resDist = dist;
                    res = i;
                }
            }
        }
        return res;
    }

    private void dfs(int node, int[] edges, int[] dist) {
        int nei = edges[node];
        if (nei != -1 && dist[nei] == -1) {
            dist[nei] = dist[node] + 1;
            dfs(nei, edges, dist);
        }
    }
}
```

```cpp
class Solution {
public:
    int closestMeetingNode(vector<int>& edges, int node1, int node2) {
        int n = edges.size();
        vector<int> node1Dist(n, -1), node2Dist(n, -1);
        node1Dist[node1] = node2Dist[node2] = 0;

        dfs(node1, edges, node1Dist);
        dfs(node2, edges, node2Dist);

        int res = -1, resDist = INT_MAX;
        for (int i = 0; i < n; i++) {
            if (min(node1Dist[i], node2Dist[i]) != -1) {
                int dist = max(node1Dist[i], node2Dist[i]);
                if (dist < resDist) {
                    resDist = dist;
                    res = i;
                }
            }
        }
        return res;
    }

private:
    void dfs(int node, vector<int>& edges, vector<int>& dist) {
        int nei = edges[node];
        if (nei != -1 && dist[nei] == -1) {
            dist[nei] = dist[node] + 1;
            dfs(nei, edges, dist);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} edges
     * @param {number} node1
     * @param {number} node2
     * @return {number}
     */
    closestMeetingNode(edges, node1, node2) {
        const n = edges.length;

        const dfs = (node, dist) => {
            const nei = edges[node];
            if (nei !== -1 && dist[nei] === -1) {
                dist[nei] = dist[node] + 1;
                dfs(nei, dist);
            }
        };

        const node1Dist = Array(n).fill(-1);
        const node2Dist = Array(n).fill(-1);
        node1Dist[node1] = 0;
        node2Dist[node2] = 0;

        dfs(node1, node1Dist);
        dfs(node2, node2Dist);

        let res = -1,
            resDist = Infinity;
        for (let i = 0; i < n; i++) {
            if (Math.min(node1Dist[i], node2Dist[i]) !== -1) {
                const dist = Math.max(node1Dist[i], node2Dist[i]);
                if (dist < resDist) {
                    resDist = dist;
                    res = i;
                }
            }
        }
        return res;
    }
}
```

```go
func closestMeetingNode(edges []int, node1 int, node2 int) int {
    n := len(edges)

    var dfs func(node int, dist []int)
    dfs = func(node int, dist []int) {
        nei := edges[node]
        if nei != -1 && dist[nei] == -1 {
            dist[nei] = dist[node] + 1
            dfs(nei, dist)
        }
    }

    node1Dist := make([]int, n)
    node2Dist := make([]int, n)
    for i := range node1Dist {
        node1Dist[i] = -1
        node2Dist[i] = -1
    }
    node1Dist[node1] = 0
    node2Dist[node2] = 0

    dfs(node1, node1Dist)
    dfs(node2, node2Dist)

    res, resDist := -1, math.MaxInt32
    for i := 0; i < n; i++ {
        if min(node1Dist[i], node2Dist[i]) != -1 {
            dist := max(node1Dist[i], node2Dist[i])
            if dist < resDist {
                resDist = dist
                res = i
            }
        }
    }
    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun closestMeetingNode(edges: IntArray, node1: Int, node2: Int): Int {
        val n = edges.size

        fun dfs(node: Int, dist: IntArray) {
            val nei = edges[node]
            if (nei != -1 && dist[nei] == -1) {
                dist[nei] = dist[node] + 1
                dfs(nei, dist)
            }
        }

        val node1Dist = IntArray(n) { -1 }
        val node2Dist = IntArray(n) { -1 }
        node1Dist[node1] = 0
        node2Dist[node2] = 0

        dfs(node1, node1Dist)
        dfs(node2, node2Dist)

        var res = -1
        var resDist = Int.MAX_VALUE
        for (i in 0 until n) {
            if (minOf(node1Dist[i], node2Dist[i]) != -1) {
                val dist = maxOf(node1Dist[i], node2Dist[i])
                if (dist < resDist) {
                    resDist = dist
                    res = i
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func closestMeetingNode(_ edges: [Int], _ node1: Int, _ node2: Int) -> Int {
        let n = edges.count

        func dfs(_ node: Int, _ dist: inout [Int]) {
            let nei = edges[node]
            if nei != -1 && dist[nei] == -1 {
                dist[nei] = dist[node] + 1
                dfs(nei, &dist)
            }
        }

        var node1Dist = [Int](repeating: -1, count: n)
        var node2Dist = [Int](repeating: -1, count: n)
        node1Dist[node1] = 0
        node2Dist[node2] = 0

        dfs(node1, &node1Dist)
        dfs(node2, &node2Dist)

        var res = -1
        var resDist = Int.max
        for i in 0..<n {
            if min(node1Dist[i], node2Dist[i]) != -1 {
                let dist = max(node1Dist[i], node2Dist[i])
                if dist < resDist {
                    resDist = dist
                    res = i
                }
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

## 4. Iterative Depth First Search

### Intuition

Since each node has exactly one outgoing edge, we can replace recursion with a simple while loop. Starting from each source, we follow edges iteratively until we reach `-1` or a visited node. This avoids recursion overhead while computing the same distances.

### Algorithm

1. For each source node, initialize its distance to `0`.
2. Iteratively follow `edges[node]` while the neighbor exists and is unvisited:
   - Set the neighbor's distance to current `distance + 1`.
   - Move to the neighbor.
3. Repeat for both `node1` and `node2`.
4. Find the node minimizing `max(node1Dist[i], node2Dist[i])` among doubly-reachable nodes.
5. Return the result.

::tabs-start

```python
class Solution:
    def closestMeetingNode(self, edges: list[int], node1: int, node2: int) -> int:
        n = len(edges)

        def dfs(node):
            dist = [-1] * n
            dist[node] = 0
            while edges[node] != -1 and dist[edges[node]] == -1:
                nei = edges[node]
                dist[nei] = dist[node] + 1
                node = nei
            return dist

        node1Dist, node2Dist = dfs(node1), dfs(node2)
        res, resDist = -1, float("inf")
        for i in range(n):
            if min(node1Dist[i], node2Dist[i]) != -1:
                dist = max(node1Dist[i], node2Dist[i])
                if dist < resDist:
                    resDist, res = dist, i
        return res
```

```java
public class Solution {
    public int closestMeetingNode(int[] edges, int node1, int node2) {
        int n = edges.length;
        int[] node1Dist = dfs(node1, edges, n);
        int[] node2Dist = dfs(node2, edges, n);

        int res = -1, resDist = Integer.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            if (Math.min(node1Dist[i], node2Dist[i]) != -1) {
                int dist = Math.max(node1Dist[i], node2Dist[i]);
                if (dist < resDist) {
                    resDist = dist;
                    res = i;
                }
            }
        }
        return res;
    }

    private int[] dfs(int node, int[] edges, int n) {
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        dist[node] = 0;
        while (edges[node] != -1 && dist[edges[node]] == -1) {
            int nei = edges[node];
            dist[nei] = dist[node] + 1;
            node = nei;
        }
        return dist;
    }
}
```

```cpp
class Solution {
public:
    int closestMeetingNode(vector<int>& edges, int node1, int node2) {
        int n = edges.size();
        vector<int> node1Dist = dfs(node1, edges, n);
        vector<int> node2Dist = dfs(node2, edges, n);

        int res = -1, resDist = INT_MAX;
        for (int i = 0; i < n; i++) {
            if (min(node1Dist[i], node2Dist[i]) != -1) {
                int dist = max(node1Dist[i], node2Dist[i]);
                if (dist < resDist) {
                    resDist = dist;
                    res = i;
                }
            }
        }
        return res;
    }

private:
    vector<int> dfs(int node, vector<int>& edges, int n) {
        vector<int> dist(n, -1);
        dist[node] = 0;
        while (edges[node] != -1 && dist[edges[node]] == -1) {
            int nei = edges[node];
            dist[nei] = dist[node] + 1;
            node = nei;
        }
        return dist;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} edges
     * @param {number} node1
     * @param {number} node2
     * @return {number}
     */
    closestMeetingNode(edges, node1, node2) {
        const n = edges.length;

        const dfs = (node) => {
            const dist = Array(n).fill(-1);
            dist[node] = 0;
            while (edges[node] !== -1 && dist[edges[node]] === -1) {
                const nei = edges[node];
                dist[nei] = dist[node] + 1;
                node = nei;
            }
            return dist;
        };

        const node1Dist = dfs(node1);
        const node2Dist = dfs(node2);

        let res = -1,
            resDist = Infinity;
        for (let i = 0; i < n; i++) {
            if (Math.min(node1Dist[i], node2Dist[i]) !== -1) {
                const dist = Math.max(node1Dist[i], node2Dist[i]);
                if (dist < resDist) {
                    resDist = dist;
                    res = i;
                }
            }
        }
        return res;
    }
}
```

```go
func closestMeetingNode(edges []int, node1 int, node2 int) int {
    n := len(edges)

    dfs := func(node int) []int {
        dist := make([]int, n)
        for i := range dist {
            dist[i] = -1
        }
        dist[node] = 0
        for edges[node] != -1 && dist[edges[node]] == -1 {
            nei := edges[node]
            dist[nei] = dist[node] + 1
            node = nei
        }
        return dist
    }

    node1Dist := dfs(node1)
    node2Dist := dfs(node2)

    res, resDist := -1, math.MaxInt32
    for i := 0; i < n; i++ {
        if min(node1Dist[i], node2Dist[i]) != -1 {
            dist := max(node1Dist[i], node2Dist[i])
            if dist < resDist {
                resDist = dist
                res = i
            }
        }
    }
    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun closestMeetingNode(edges: IntArray, node1: Int, node2: Int): Int {
        val n = edges.size

        fun dfs(startNode: Int): IntArray {
            val dist = IntArray(n) { -1 }
            var node = startNode
            dist[node] = 0
            while (edges[node] != -1 && dist[edges[node]] == -1) {
                val nei = edges[node]
                dist[nei] = dist[node] + 1
                node = nei
            }
            return dist
        }

        val node1Dist = dfs(node1)
        val node2Dist = dfs(node2)

        var res = -1
        var resDist = Int.MAX_VALUE
        for (i in 0 until n) {
            if (minOf(node1Dist[i], node2Dist[i]) != -1) {
                val dist = maxOf(node1Dist[i], node2Dist[i])
                if (dist < resDist) {
                    resDist = dist
                    res = i
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func closestMeetingNode(_ edges: [Int], _ node1: Int, _ node2: Int) -> Int {
        let n = edges.count

        func dfs(_ startNode: Int) -> [Int] {
            var dist = [Int](repeating: -1, count: n)
            var node = startNode
            dist[node] = 0
            while edges[node] != -1 && dist[edges[node]] == -1 {
                let nei = edges[node]
                dist[nei] = dist[node] + 1
                node = nei
            }
            return dist
        }

        let node1Dist = dfs(node1)
        let node2Dist = dfs(node2)

        var res = -1
        var resDist = Int.max
        for i in 0..<n {
            if min(node1Dist[i], node2Dist[i]) != -1 {
                let dist = max(node1Dist[i], node2Dist[i])
                if dist < resDist {
                    resDist = dist
                    res = i
                }
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

### Using Sum Instead of Maximum Distance

The problem asks for the node that minimizes the maximum of the two distances, not the sum. Using `node1Dist[i] + node2Dist[i]` instead of `max(node1Dist[i], node2Dist[i])` produces incorrect results.

### Not Handling Cycles Properly

The graph can contain cycles, so distance computation must mark visited nodes to avoid infinite loops. Always check if a node has already been assigned a distance before processing it.

### Forgetting to Return the Smallest Index on Ties

When multiple nodes have the same minimum maximum distance, the problem requires returning the smallest index. Iterating from index 0 and using strict less-than comparison ensures the first valid node is selected.