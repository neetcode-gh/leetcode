## 1. Breadth First Search - I

### Intuition

We need to find shortest paths from node `0` to all other nodes, but with a twist: the path must alternate between red and blue edges. The key insight is that reaching a node via a red edge is different from reaching it via a blue edge, because it affects which color we can use next. So we track states as `(node, last_edge_color)` pairs. `BFS` naturally finds shortest paths in unweighted graphs, and since we want the first time we reach each node, we record the distance on first visit.

### Algorithm

1. Build adjacency lists for red and blue edges separately.
2. Initialize the answer array with `-1` for all nodes.
3. Start `BFS` from node `0` with no previous edge color (allowing either color first).
4. For each state `(node, length, edgeColor)`:
   - If this node has not been visited before, record `length` as its answer.
   - If the last edge was not red, explore all red edges to neighbors.
   - If the last edge was not blue, explore all blue edges to neighbors.
   - Track visited states as `(node, color)` to avoid cycles.
5. Return the answer array.

::tabs-start

```python
class Solution:
    def shortestAlternatingPaths(self, n: int, redEdges: list[list[int]], blueEdges: list[list[int]]) -> list[int]:
        red, blue = defaultdict(list), defaultdict(list)

        for src, dst in redEdges:
            red[src].append(dst)

        for src, dst in blueEdges:
            blue[src].append(dst)

        answer = [-1 for _ in range(n)]
        q = deque()
        q.append((0, 0, None))  # [node, length, prev_edge_color]
        visit = set()
        visit.add((0, None))

        while q:
            node, length, edgeColor = q.popleft()
            if answer[node] == -1:
                answer[node] = length

            if edgeColor != "RED":
                for nei in red[node]:
                    if (nei, "RED") not in visit:
                        visit.add((nei, "RED"))
                        q.append((nei, length + 1, "RED"))

            if edgeColor != "BLUE":
                for nei in blue[node]:
                    if (nei, "BLUE") not in visit:
                        visit.add((nei, "BLUE"))
                        q.append((nei, length + 1, "BLUE"))

        return answer
```

```java
public class Solution {
    public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {
        List<Integer>[] red = new ArrayList[n], blue = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            red[i] = new ArrayList<>();
            blue[i] = new ArrayList<>();
        }
        for (int[] edge : redEdges) red[edge[0]].add(edge[1]);
        for (int[] edge : blueEdges) blue[edge[0]].add(edge[1]);

        int[] answer = new int[n];
        Arrays.fill(answer, -1);
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{0, 0, -1});
        Set<String> visit = new HashSet<>();
        visit.add("0,-1");

        while (!q.isEmpty()) {
            int[] nodeData = q.poll();
            int node = nodeData[0], length = nodeData[1], edgeColor = nodeData[2];

            if (answer[node] == -1) answer[node] = length;

            if (edgeColor != 0) {
                for (int nei : red[node]) {
                    if (visit.add(nei + ",0")) {
                        q.offer(new int[]{nei, length + 1, 0});
                    }
                }
            }
            if (edgeColor != 1) {
                for (int nei : blue[node]) {
                    if (visit.add(nei + ",1")) {
                        q.offer(new int[]{nei, length + 1, 1});
                    }
                }
            }
        }
        return answer;
    }
}
```

```cpp
class Solution {
public:
    vector<int> shortestAlternatingPaths(int n, vector<vector<int>>& redEdges, vector<vector<int>>& blueEdges) {
        vector<vector<int>> red(n), blue(n);
        for (auto& edge : redEdges) red[edge[0]].push_back(edge[1]);
        for (auto& edge : blueEdges) blue[edge[0]].push_back(edge[1]);

        vector<int> answer(n, -1);
        queue<vector<int>> q;
        q.push({0, 0, -1});
        unordered_set<string> visit;
        visit.insert("0,-1");

        while (!q.empty()) {
            vector<int> nodeData = q.front();
            q.pop();
            int node = nodeData[0], length = nodeData[1], edgeColor = nodeData[2];

            if (answer[node] == -1) answer[node] = length;

            if (edgeColor != 0) {
                for (int nei : red[node]) {
                    string key = to_string(nei) + ",0";
                    if (visit.insert(key).second) {
                        q.push({nei, length + 1, 0});
                    }
                }
            }
            if (edgeColor != 1) {
                for (int nei : blue[node]) {
                    string key = to_string(nei) + ",1";
                    if (visit.insert(key).second) {
                        q.push({nei, length + 1, 1});
                    }
                }
            }
        }
        return answer;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} redEdges
     * @param {number[][]} blueEdges
     * @return {number[]}
     */
    shortestAlternatingPaths(n, redEdges, blueEdges) {
        const red = Array.from({ length: n }, () => []);
        const blue = Array.from({ length: n }, () => []);

        for (const [src, dst] of redEdges) red[src].push(dst);
        for (const [src, dst] of blueEdges) blue[src].push(dst);

        const answer = new Array(n).fill(-1);
        const q = new Queue([[0, 0, null]]);
        const visit = new Set(['0,null']);

        while (!q.isEmpty()) {
            const [node, length, edgeColor] = q.pop();
            if (answer[node] === -1) answer[node] = length;

            if (edgeColor !== 'RED') {
                for (const nei of red[node]) {
                    if (!visit.has(`${nei},RED`)) {
                        visit.add(`${nei},RED`);
                        q.push([nei, length + 1, 'RED']);
                    }
                }
            }
            if (edgeColor !== 'BLUE') {
                for (const nei of blue[node]) {
                    if (!visit.has(`${nei},BLUE`)) {
                        visit.add(`${nei},BLUE`);
                        q.push([nei, length + 1, 'BLUE']);
                    }
                }
            }
        }
        return answer;
    }
}
```

```csharp
public class Solution {
    public int[] ShortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {
        List<int>[] red = new List<int>[n], blue = new List<int>[n];
        for (int i = 0; i < n; i++) {
            red[i] = new List<int>();
            blue[i] = new List<int>();
        }
        foreach (var edge in redEdges) red[edge[0]].Add(edge[1]);
        foreach (var edge in blueEdges) blue[edge[0]].Add(edge[1]);

        int[] answer = new int[n];
        Array.Fill(answer, -1);
        Queue<int[]> q = new Queue<int[]>();
        q.Enqueue(new int[]{0, 0, -1});
        HashSet<string> visit = new HashSet<string>();
        visit.Add("0,-1");

        while (q.Count > 0) {
            int[] nodeData = q.Dequeue();
            int node = nodeData[0], length = nodeData[1], edgeColor = nodeData[2];

            if (answer[node] == -1) answer[node] = length;

            if (edgeColor != 0) {
                foreach (int nei in red[node]) {
                    if (visit.Add(nei + ",0")) {
                        q.Enqueue(new int[]{nei, length + 1, 0});
                    }
                }
            }
            if (edgeColor != 1) {
                foreach (int nei in blue[node]) {
                    if (visit.Add(nei + ",1")) {
                        q.Enqueue(new int[]{nei, length + 1, 1});
                    }
                }
            }
        }
        return answer;
    }
}
```

```go
func shortestAlternatingPaths(n int, redEdges [][]int, blueEdges [][]int) []int {
    red := make([][]int, n)
    blue := make([][]int, n)
    for i := 0; i < n; i++ {
        red[i] = []int{}
        blue[i] = []int{}
    }
    for _, edge := range redEdges {
        red[edge[0]] = append(red[edge[0]], edge[1])
    }
    for _, edge := range blueEdges {
        blue[edge[0]] = append(blue[edge[0]], edge[1])
    }

    answer := make([]int, n)
    for i := range answer {
        answer[i] = -1
    }
    type state struct {
        node, length, color int
    }
    q := []state{{0, 0, -1}}
    visit := make(map[string]bool)
    visit["0,-1"] = true

    for len(q) > 0 {
        cur := q[0]
        q = q[1:]
        node, length, edgeColor := cur.node, cur.length, cur.color

        if answer[node] == -1 {
            answer[node] = length
        }

        if edgeColor != 0 {
            for _, nei := range red[node] {
                key := fmt.Sprintf("%d,0", nei)
                if !visit[key] {
                    visit[key] = true
                    q = append(q, state{nei, length + 1, 0})
                }
            }
        }
        if edgeColor != 1 {
            for _, nei := range blue[node] {
                key := fmt.Sprintf("%d,1", nei)
                if !visit[key] {
                    visit[key] = true
                    q = append(q, state{nei, length + 1, 1})
                }
            }
        }
    }
    return answer
}
```

```kotlin
class Solution {
    fun shortestAlternatingPaths(n: Int, redEdges: Array<IntArray>, blueEdges: Array<IntArray>): IntArray {
        val red = Array(n) { mutableListOf<Int>() }
        val blue = Array(n) { mutableListOf<Int>() }
        for (edge in redEdges) red[edge[0]].add(edge[1])
        for (edge in blueEdges) blue[edge[0]].add(edge[1])

        val answer = IntArray(n) { -1 }
        val q: ArrayDeque<IntArray> = ArrayDeque()
        q.add(intArrayOf(0, 0, -1))
        val visit = HashSet<String>()
        visit.add("0,-1")

        while (q.isNotEmpty()) {
            val (node, length, edgeColor) = q.removeFirst()

            if (answer[node] == -1) answer[node] = length

            if (edgeColor != 0) {
                for (nei in red[node]) {
                    if (visit.add("$nei,0")) {
                        q.add(intArrayOf(nei, length + 1, 0))
                    }
                }
            }
            if (edgeColor != 1) {
                for (nei in blue[node]) {
                    if (visit.add("$nei,1")) {
                        q.add(intArrayOf(nei, length + 1, 1))
                    }
                }
            }
        }
        return answer
    }
}
```

```swift
class Solution {
    func shortestAlternatingPaths(_ n: Int, _ redEdges: [[Int]], _ blueEdges: [[Int]]) -> [Int] {
        var red = [[Int]](repeating: [], count: n)
        var blue = [[Int]](repeating: [], count: n)
        for edge in redEdges { red[edge[0]].append(edge[1]) }
        for edge in blueEdges { blue[edge[0]].append(edge[1]) }

        var answer = [Int](repeating: -1, count: n)
        var q = [(node: Int, length: Int, color: Int)]()
        q.append((0, 0, -1))
        var visit = Set<String>()
        visit.insert("0,-1")

        while !q.isEmpty {
            let (node, length, edgeColor) = q.removeFirst()

            if answer[node] == -1 { answer[node] = length }

            if edgeColor != 0 {
                for nei in red[node] {
                    let key = "\(nei),0"
                    if !visit.contains(key) {
                        visit.insert(key)
                        q.append((nei, length + 1, 0))
                    }
                }
            }
            if edgeColor != 1 {
                for nei in blue[node] {
                    let key = "\(nei),1"
                    if !visit.contains(key) {
                        visit.insert(key)
                        q.append((nei, length + 1, 1))
                    }
                }
            }
        }
        return answer
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 2. Breadth First Search - II

### Intuition

This approach uses a cleaner state representation. Instead of tracking the edge color explicitly, we use `0` for red and `1` for blue, and toggle between them using XOR (`color ^ 1`). We maintain a 2D distance array where `dist[node][color]` stores the shortest distance to reach `node` when the last edge used was `color`. Starting from node `0` with both colors as valid starting points, we relax edges only when we find a shorter path.

### Algorithm

1. Build separate adjacency lists for red (index `0`) and blue (index `1`) edges.
2. Create a 2D distance array initialized to infinity, with `dist[0][0] = dist[0][1] = 0`.
3. Start `BFS` with two initial states: `(0, 0)` and `(0, 1)` representing starting with red or blue.
4. For each state `(node, color)`:
   - Explore neighbors through edges of the current color.
   - If `dist[neighbor][opposite_color] > dist[node][color] + 1`, update it and enqueue.
5. The answer for each node is the minimum of `dist[node][0]` and `dist[node][1]`.
6. Return `-1` for nodes where both distances remain infinity.

::tabs-start

```python
class Solution:
    def shortestAlternatingPaths(self, n: int, redEdges: list[list[int]], blueEdges: list[list[int]]) -> list[int]:
        def buildGraph(edges):
            adj = [[] for _ in range(n)]
            for u, v in edges:
                adj[u].append(v)
            return adj

        red, blue = buildGraph(redEdges), buildGraph(blueEdges)
        adj = [red, blue]
        INF = float("inf")
        dist = [[INF] * 2 for _ in range(n)]
        dist[0][0] = dist[0][1] = 0

        q = deque([(0, 0), (0, 1)])
        while q:
            node, color = q.popleft()
            for nei in adj[color][node]:
                if dist[nei][color ^ 1] > dist[node][color] + 1:
                    dist[nei][color ^ 1] = dist[node][color] + 1
                    q.append((nei, color ^ 1))

        answer = [0] + [-1] * (n - 1)
        for i in range(1, n):
            answer[i] = min(dist[i][0], dist[i][1])
            if answer[i] == INF:
                answer[i] = -1
        return answer
```

```java
public class Solution {
    public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {
        List<Integer>[][] adj = new ArrayList[2][n];
        adj[0] = buildGraph(n, redEdges);
        adj[1] = buildGraph(n, blueEdges);

        int INF = Integer.MAX_VALUE;
        int[][] dist = new int[n][2];

        for (int i = 0; i < n; i++) Arrays.fill(dist[i], INF);
        dist[0][0] = dist[0][1] = 0;

        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{0, 0});
        q.offer(new int[]{0, 1});

        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int node = cur[0], color = cur[1];

            for (int nei : adj[color][node]) {
                if (dist[nei][color ^ 1] > dist[node][color] + 1) {
                    dist[nei][color ^ 1] = dist[node][color] + 1;
                    q.offer(new int[]{nei, color ^ 1});
                }
            }
        }

        int[] answer = new int[n];
        for (int i = 0; i < n; i++) {
            answer[i] = Math.min(dist[i][0], dist[i][1]);
            if (answer[i] == INF) answer[i] = -1;
        }
        return answer;
    }

    private List<Integer>[] buildGraph(int n, int[][] edges) {
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
        }
        return adj;
    }
}
```

```cpp
class Solution {
public:
    vector<int> shortestAlternatingPaths(int n, vector<vector<int>>& redEdges, vector<vector<int>>& blueEdges) {
        vector<vector<int>> red = buildGraph(n, redEdges);
        vector<vector<int>> blue = buildGraph(n, blueEdges);
        vector<vector<int>> adj[] = {red, blue};

        const int INF = 1e6;
        vector<vector<int>> dist(n, vector<int>(2, INF));
        dist[0][0] = dist[0][1] = 0;

        queue<pair<int, int>> q;
        q.push({0, 0});
        q.push({0, 1});

        while (!q.empty()) {
            auto [node, color] = q.front();q.pop();
            for (int nei : adj[color][node]) {
                if (dist[nei][color ^ 1] > dist[node][color] + 1) {
                    dist[nei][color ^ 1] = dist[node][color] + 1;
                    q.push({nei, color ^ 1});
                }
            }
        }

        vector<int> answer(n, -1);
        for (int i = 0; i < n; i++) {
            answer[i] = min(dist[i][0], dist[i][1]);
            if (answer[i] == INF) answer[i] = -1;
        }
        return answer;
    }

private:
    vector<vector<int>> buildGraph(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
        }
        return adj;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} redEdges
     * @param {number[][]} blueEdges
     * @return {number[]}
     */
    shortestAlternatingPaths(n, redEdges, blueEdges) {
        const red = this.buildGraph(n, redEdges);
        const blue = this.buildGraph(n, blueEdges);
        const adj = [red, blue];
        const INF = 1e6;
        const dist = Array.from({ length: n }, () => [INF, INF]);
        dist[0][0] = dist[0][1] = 0;

        const q = new Queue([
            [0, 0],
            [0, 1],
        ]);
        while (!q.isEmpty()) {
            const [node, color] = q.pop();
            for (const nei of adj[color][node]) {
                if (dist[nei][color ^ 1] > dist[node][color] + 1) {
                    dist[nei][color ^ 1] = dist[node][color] + 1;
                    q.push([nei, color ^ 1]);
                }
            }
        }

        return Array.from({ length: n }, (_, i) => {
            let minDist = Math.min(dist[i][0], dist[i][1]);
            return minDist === INF ? -1 : minDist;
        });
    }

    /**
     * @param {number} n
     * @param {number[][]} edges
     * @return {number[][]}
     */
    buildGraph(n, edges) {
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
        }
        return adj;
    }
}
```

```csharp
public class Solution {
    public int[] ShortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {
        List<int>[][] adj = new List<int>[2][];
        adj[0] = BuildGraph(n, redEdges);
        adj[1] = BuildGraph(n, blueEdges);

        int INF = int.MaxValue;
        int[][] dist = new int[n][];
        for (int i = 0; i < n; i++) {
            dist[i] = new int[] { INF, INF };
        }
        dist[0][0] = dist[0][1] = 0;

        Queue<int[]> q = new Queue<int[]>();
        q.Enqueue(new int[] { 0, 0 });
        q.Enqueue(new int[] { 0, 1 });

        while (q.Count > 0) {
            int[] cur = q.Dequeue();
            int node = cur[0], color = cur[1];

            foreach (int nei in adj[color][node]) {
                if (dist[nei][color ^ 1] > dist[node][color] + 1) {
                    dist[nei][color ^ 1] = dist[node][color] + 1;
                    q.Enqueue(new int[] { nei, color ^ 1 });
                }
            }
        }

        int[] answer = new int[n];
        for (int i = 0; i < n; i++) {
            answer[i] = Math.Min(dist[i][0], dist[i][1]);
            if (answer[i] == INF) answer[i] = -1;
        }
        return answer;
    }

    private List<int>[] BuildGraph(int n, int[][] edges) {
        List<int>[] adj = new List<int>[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
        }
        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
        }
        return adj;
    }
}
```

```go
func shortestAlternatingPaths(n int, redEdges [][]int, blueEdges [][]int) []int {
    buildGraph := func(edges [][]int) [][]int {
        adj := make([][]int, n)
        for i := 0; i < n; i++ {
            adj[i] = []int{}
        }
        for _, edge := range edges {
            adj[edge[0]] = append(adj[edge[0]], edge[1])
        }
        return adj
    }

    red := buildGraph(redEdges)
    blue := buildGraph(blueEdges)
    adj := [2][][]int{red, blue}

    INF := 1000000
    dist := make([][]int, n)
    for i := 0; i < n; i++ {
        dist[i] = []int{INF, INF}
    }
    dist[0][0], dist[0][1] = 0, 0

    q := [][2]int{{0, 0}, {0, 1}}
    for len(q) > 0 {
        cur := q[0]
        q = q[1:]
        node, color := cur[0], cur[1]
        for _, nei := range adj[color][node] {
            if dist[nei][color^1] > dist[node][color]+1 {
                dist[nei][color^1] = dist[node][color] + 1
                q = append(q, [2]int{nei, color ^ 1})
            }
        }
    }

    answer := make([]int, n)
    for i := 0; i < n; i++ {
        answer[i] = min(dist[i][0], dist[i][1])
        if answer[i] == INF {
            answer[i] = -1
        }
    }
    return answer
}
```

```kotlin
class Solution {
    fun shortestAlternatingPaths(n: Int, redEdges: Array<IntArray>, blueEdges: Array<IntArray>): IntArray {
        fun buildGraph(edges: Array<IntArray>): Array<MutableList<Int>> {
            val adj = Array(n) { mutableListOf<Int>() }
            for (edge in edges) adj[edge[0]].add(edge[1])
            return adj
        }

        val red = buildGraph(redEdges)
        val blue = buildGraph(blueEdges)
        val adj = arrayOf(red, blue)

        val INF = Int.MAX_VALUE
        val dist = Array(n) { intArrayOf(INF, INF) }
        dist[0][0] = 0
        dist[0][1] = 0

        val q = ArrayDeque<IntArray>()
        q.add(intArrayOf(0, 0))
        q.add(intArrayOf(0, 1))

        while (q.isNotEmpty()) {
            val (node, color) = q.removeFirst()
            for (nei in adj[color][node]) {
                if (dist[nei][color xor 1] > dist[node][color] + 1) {
                    dist[nei][color xor 1] = dist[node][color] + 1
                    q.add(intArrayOf(nei, color xor 1))
                }
            }
        }

        return IntArray(n) { i ->
            val minDist = minOf(dist[i][0], dist[i][1])
            if (minDist == INF) -1 else minDist
        }
    }
}
```

```swift
class Solution {
    func shortestAlternatingPaths(_ n: Int, _ redEdges: [[Int]], _ blueEdges: [[Int]]) -> [Int] {
        func buildGraph(_ edges: [[Int]]) -> [[Int]] {
            var adj = [[Int]](repeating: [], count: n)
            for edge in edges { adj[edge[0]].append(edge[1]) }
            return adj
        }

        let red = buildGraph(redEdges)
        let blue = buildGraph(blueEdges)
        let adj = [red, blue]

        let INF = Int.max
        var dist = [[Int]](repeating: [INF, INF], count: n)
        dist[0][0] = 0
        dist[0][1] = 0

        var q = [(Int, Int)]()
        q.append((0, 0))
        q.append((0, 1))

        while !q.isEmpty {
            let (node, color) = q.removeFirst()
            for nei in adj[color][node] {
                if dist[nei][color ^ 1] > dist[node][color] + 1 {
                    dist[nei][color ^ 1] = dist[node][color] + 1
                    q.append((nei, color ^ 1))
                }
            }
        }

        var answer = [Int](repeating: -1, count: n)
        for i in 0..<n {
            let minDist = min(dist[i][0], dist[i][1])
            answer[i] = minDist == INF ? -1 : minDist
        }
        return answer
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 3. Depth First Search

### Intuition

While `BFS` is typically preferred for shortest path problems, `DFS` can also work here because we are tracking distances and only updating when we find a shorter path. The recursion naturally handles the alternating color constraint. We start `DFS` from node `0` twice: once beginning with red edges and once with blue. Whenever we find a shorter path to a node with a particular ending color, we update the distance and continue exploring.

### Algorithm

1. Build separate adjacency lists for red and blue edges.
2. Initialize a 2D distance array with infinity, setting `dist[0][0] = dist[0][1] = 0`.
3. Run `DFS` starting from node `0` with color `0` (red), then again with color `1` (blue).
4. In `DFS` for state `(node, color)`:
   - For each neighbor reachable via the current color:
     - If `dist[neighbor][opposite_color] > dist[node][color] + 1`:
       - Update the distance.
       - Recursively call `DFS` on the neighbor with the opposite color.
5. Build the answer by taking the minimum of both color distances for each node.
6. Return `-1` for unreachable nodes.

::tabs-start

```python
class Solution:
    def shortestAlternatingPaths(self, n: int, redEdges: list[list[int]], blueEdges: list[list[int]]) -> list[int]:
        def buildGraph(edges):
            adj = [[] for _ in range(n)]
            for u, v in edges:
                adj[u].append(v)
            return adj

        red, blue = buildGraph(redEdges), buildGraph(blueEdges)
        adj = [red, blue]
        INF = float("inf")
        dist = [[INF] * 2 for _ in range(n)]
        dist[0][0] = dist[0][1] = 0

        def dfs(node, color):
            for nei in adj[color][node]:
                if dist[nei][color ^ 1] > dist[node][color] + 1:
                    dist[nei][color ^ 1] = dist[node][color] + 1
                    dfs(nei, color ^ 1)

        dfs(0, 0)
        dfs(0, 1)

        answer = [0] + [-1] * (n - 1)
        for i in range(1, n):
            answer[i] = min(dist[i][0], dist[i][1])
            if answer[i] == INF:
                answer[i] = -1

        return answer
```

```java
public class Solution {
    public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {
        List<Integer>[][] adj = new ArrayList[2][n];
        adj[0] = buildGraph(n, redEdges);
        adj[1] = buildGraph(n, blueEdges);

        int INF = Integer.MAX_VALUE;
        int[][] dist = new int[n][2];
        for (int i = 0; i < n; i++) Arrays.fill(dist[i], INF);
        dist[0][0] = dist[0][1] = 0;

        dfs(0, 0, adj, dist);
        dfs(0, 1, adj, dist);

        int[] answer = new int[n];
        for (int i = 0; i < n; i++) {
            answer[i] = Math.min(dist[i][0], dist[i][1]);
            if (answer[i] == INF) answer[i] = -1;
        }
        return answer;
    }

    private void dfs(int node, int color, List<Integer>[][] adj, int[][] dist) {
        for (int nei : adj[color][node]) {
            if (dist[nei][color ^ 1] > dist[node][color] + 1) {
                dist[nei][color ^ 1] = dist[node][color] + 1;
                dfs(nei, color ^ 1, adj, dist);
            }
        }
    }

    private List<Integer>[] buildGraph(int n, int[][] edges) {
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
        }
        return adj;
    }
}
```

```cpp
class Solution {
public:
    vector<int> shortestAlternatingPaths(int n, vector<vector<int>>& redEdges, vector<vector<int>>& blueEdges) {
        vector<vector<int>> adj[2] = {buildGraph(n, redEdges), buildGraph(n, blueEdges)};

        int INF = numeric_limits<int>::max();
        vector<vector<int>> dist(n, vector<int>(2, INF));
        dist[0][0] = dist[0][1] = 0;

        dfs(0, 0, adj, dist);
        dfs(0, 1, adj, dist);

        vector<int> answer(n, -1);
        for (int i = 0; i < n; i++) {
            answer[i] = min(dist[i][0], dist[i][1]);
            if (answer[i] == INF) answer[i] = -1;
        }
        return answer;
    }

private:
    void dfs(int node, int color, vector<vector<int>> adj[], vector<vector<int>>& dist) {
        for (int nei : adj[color][node]) {
            if (dist[nei][color ^ 1] > dist[node][color] + 1) {
                dist[nei][color ^ 1] = dist[node][color] + 1;
                dfs(nei, color ^ 1, adj, dist);
            }
        }
    }

    vector<vector<int>> buildGraph(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
        }
        return adj;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} redEdges
     * @param {number[][]} blueEdges
     * @return {number[]}
     */
    shortestAlternatingPaths(n, redEdges, blueEdges) {
        const INF = Number.MAX_SAFE_INTEGER;
        const adj = [
            Array.from({ length: n }, () => []),
            Array.from({ length: n }, () => []),
        ];

        redEdges.forEach(([u, v]) => adj[0][u].push(v));
        blueEdges.forEach(([u, v]) => adj[1][u].push(v));

        const dist = Array.from({ length: n }, () => [INF, INF]);
        dist[0][0] = dist[0][1] = 0;

        const dfs = (node, color) => {
            adj[color][node].forEach((nei) => {
                if (dist[nei][color ^ 1] > dist[node][color] + 1) {
                    dist[nei][color ^ 1] = dist[node][color] + 1;
                    dfs(nei, color ^ 1);
                }
            });
        };

        dfs(0, 0);
        dfs(0, 1);

        return dist.map(([red, blue]) => {
            let res = Math.min(red, blue);
            return res === INF ? -1 : res;
        });
    }
}
```

```csharp
public class Solution {
    private List<int>[][] adj;
    private int[][] dist;
    private int INF = int.MaxValue;

    public int[] ShortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {
        adj = new List<int>[2][];
        adj[0] = BuildGraph(n, redEdges);
        adj[1] = BuildGraph(n, blueEdges);

        dist = new int[n][];
        for (int i = 0; i < n; i++) {
            dist[i] = new int[] { INF, INF };
        }
        dist[0][0] = dist[0][1] = 0;

        Dfs(0, 0);
        Dfs(0, 1);

        int[] answer = new int[n];
        for (int i = 0; i < n; i++) {
            answer[i] = Math.Min(dist[i][0], dist[i][1]);
            if (answer[i] == INF) answer[i] = -1;
        }
        return answer;
    }

    private void Dfs(int node, int color) {
        foreach (int nei in adj[color][node]) {
            if (dist[nei][color ^ 1] > dist[node][color] + 1) {
                dist[nei][color ^ 1] = dist[node][color] + 1;
                Dfs(nei, color ^ 1);
            }
        }
    }

    private List<int>[] BuildGraph(int n, int[][] edges) {
        List<int>[] adj = new List<int>[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
        }
        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
        }
        return adj;
    }
}
```

```go
func shortestAlternatingPaths(n int, redEdges [][]int, blueEdges [][]int) []int {
    buildGraph := func(edges [][]int) [][]int {
        adj := make([][]int, n)
        for i := 0; i < n; i++ {
            adj[i] = []int{}
        }
        for _, edge := range edges {
            adj[edge[0]] = append(adj[edge[0]], edge[1])
        }
        return adj
    }

    adj := [2][][]int{buildGraph(redEdges), buildGraph(blueEdges)}

    INF := 1 << 30
    dist := make([][]int, n)
    for i := 0; i < n; i++ {
        dist[i] = []int{INF, INF}
    }
    dist[0][0], dist[0][1] = 0, 0

    var dfs func(node, color int)
    dfs = func(node, color int) {
        for _, nei := range adj[color][node] {
            if dist[nei][color^1] > dist[node][color]+1 {
                dist[nei][color^1] = dist[node][color] + 1
                dfs(nei, color^1)
            }
        }
    }

    dfs(0, 0)
    dfs(0, 1)

    answer := make([]int, n)
    for i := 0; i < n; i++ {
        answer[i] = min(dist[i][0], dist[i][1])
        if answer[i] == INF {
            answer[i] = -1
        }
    }
    return answer
}
```

```kotlin
class Solution {
    private lateinit var adj: Array<Array<MutableList<Int>>>
    private lateinit var dist: Array<IntArray>
    private val INF = Int.MAX_VALUE

    fun shortestAlternatingPaths(n: Int, redEdges: Array<IntArray>, blueEdges: Array<IntArray>): IntArray {
        fun buildGraph(edges: Array<IntArray>): Array<MutableList<Int>> {
            val adj = Array(n) { mutableListOf<Int>() }
            for (edge in edges) adj[edge[0]].add(edge[1])
            return adj
        }

        adj = arrayOf(buildGraph(redEdges), buildGraph(blueEdges))
        dist = Array(n) { intArrayOf(INF, INF) }
        dist[0][0] = 0
        dist[0][1] = 0

        dfs(0, 0)
        dfs(0, 1)

        return IntArray(n) { i ->
            val minDist = minOf(dist[i][0], dist[i][1])
            if (minDist == INF) -1 else minDist
        }
    }

    private fun dfs(node: Int, color: Int) {
        for (nei in adj[color][node]) {
            if (dist[nei][color xor 1] > dist[node][color] + 1) {
                dist[nei][color xor 1] = dist[node][color] + 1
                dfs(nei, color xor 1)
            }
        }
    }
}
```

```swift
class Solution {
    private var adj = [[[Int]]]()
    private var dist = [[Int]]()
    private let INF = Int.max

    func shortestAlternatingPaths(_ n: Int, _ redEdges: [[Int]], _ blueEdges: [[Int]]) -> [Int] {
        func buildGraph(_ edges: [[Int]]) -> [[Int]] {
            var adj = [[Int]](repeating: [], count: n)
            for edge in edges { adj[edge[0]].append(edge[1]) }
            return adj
        }

        adj = [buildGraph(redEdges), buildGraph(blueEdges)]
        dist = [[Int]](repeating: [INF, INF], count: n)
        dist[0][0] = 0
        dist[0][1] = 0

        dfs(0, 0)
        dfs(0, 1)

        var answer = [Int](repeating: -1, count: n)
        for i in 0..<n {
            let minDist = min(dist[i][0], dist[i][1])
            answer[i] = minDist == INF ? -1 : minDist
        }
        return answer
    }

    private func dfs(_ node: Int, _ color: Int) {
        for nei in adj[color][node] {
            if dist[nei][color ^ 1] > dist[node][color] + 1 {
                dist[nei][color ^ 1] = dist[node][color] + 1
                dfs(nei, color ^ 1)
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.
