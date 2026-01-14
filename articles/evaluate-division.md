## 1. Breadth First Search

### Intuition

We can think of each equation `a / b = value` as a directed edge from `a` to `b` with weight `value`, and an edge from `b` to `a` with weight `1/value`. This transforms the problem into a graph traversal: to evaluate `x / y`, we need to find a path from `x` to `y` and multiply the edge weights along that path.

BFS works well here because we explore all neighbors at the current distance before moving further. Starting from the source variable, we track the accumulated product as we traverse. When we reach the target, that accumulated product gives us the answer.

### Algorithm

1. Build an adjacency list where each variable maps to a list of `(neighbor, weight)` pairs. For each equation `a / b = value`, add edges `a -> b` with weight `value` and `b -> a` with weight `1/value`.
2. For each query `(src, target)`:
   - If either variable is not in the graph, return `-1`.
   - Initialize a queue with `(src, 1.0)` and a visited set.
   - While the queue is not empty:
     - Dequeue a node and its accumulated weight.
     - If this node equals `target`, return the accumulated weight.
     - For each unvisited neighbor, enqueue it with the updated weight (current weight multiplied by edge weight).
   - If `target` is never reached, return `-1`.
3. Return the results for all queries.

::tabs-start

```python
class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        adj = collections.defaultdict(list)  # Map a -> list of [b, a/b]

        for i, eq in enumerate(equations):
            a, b = eq
            adj[a].append((b, values[i]))
            adj[b].append((a, 1 / values[i]))

        def bfs(src, target):
            if src not in adj or target not in adj:
                return -1
            q, visit = deque([(src, 1)]), set()
            visit.add(src)

            while q:
                node, w = q.popleft()
                if node == target:
                    return w
                for nei, weight in adj[node]:
                    if nei not in visit:
                        q.append((nei, w * weight))
                        visit.add(nei)
            return -1

        return [bfs(q[0], q[1]) for q in queries]
```

```java
public class Solution {
    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        Map<String, List<Pair>> adj = new HashMap<>(); // Map a -> list of [b, a/b]

        for (int i = 0; i < equations.size(); i++) {
            String a = equations.get(i).get(0);
            String b = equations.get(i).get(1);
            adj.putIfAbsent(a, new ArrayList<>());
            adj.putIfAbsent(b, new ArrayList<>());
            adj.get(a).add(new Pair(b, values[i]));
            adj.get(b).add(new Pair(a, 1 / values[i]));
        }

        double[] res = new double[queries.size()];
        for (int i = 0; i < queries.size(); i++) {
            String src = queries.get(i).get(0);
            String target = queries.get(i).get(1);
            res[i] = bfs(src, target, adj);
        }

        return res;
    }

    private double bfs(String src, String target, Map<String, List<Pair>> adj) {
        if (!adj.containsKey(src) || !adj.containsKey(target)) {
            return -1.0;
        }

        Queue<Pair> q = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        q.offer(new Pair(src, 1.0));
        visited.add(src);

        while (!q.isEmpty()) {
            Pair current = q.poll();
            String node = current.node;
            double weight = current.weight;

            if (node.equals(target)) {
                return weight;
            }

            for (Pair neighbor : adj.get(node)) {
                if (!visited.contains(neighbor.node)) {
                    visited.add(neighbor.node);
                    q.offer(new Pair(neighbor.node, weight * neighbor.weight));
                }
            }
        }

        return -1.0;
    }

    class Pair {
        String node;
        double weight;

        Pair(String node, double weight) {
            this.node = node;
            this.weight = weight;
        }
    }
}
```

```cpp
class Solution {
public:
    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        unordered_map<string, vector<pair<string, double>>> adj; // Map a -> list of [b, a/b]

        for (int i = 0; i < equations.size(); i++) {
            string a = equations[i][0];
            string b = equations[i][1];
            adj[a].emplace_back(b, values[i]);
            adj[b].emplace_back(a, 1.0 / values[i]);
        }

        vector<double> res;
        for (const auto& query : queries) {
            string src = query[0];
            string target = query[1];
            res.push_back(bfs(src, target, adj));
        }

        return res;
    }

private:
    double bfs(const string& src, const string& target, unordered_map<string, vector<pair<string, double>>>& adj) {
        if (!adj.count(src) || !adj.count(target)) {
            return -1.0;
        }

        queue<pair<string, double>> q;
        unordered_set<string> visited;
        q.emplace(src, 1.0);
        visited.insert(src);

        while (!q.empty()) {
            auto [node, weight] = q.front();
            q.pop();

            if (node == target) {
                return weight;
            }

            for (const auto& [nei, neiWeight] : adj[node]) {
                if (!visited.count(nei)) {
                    visited.insert(nei);
                    q.emplace(nei, weight * neiWeight);
                }
            }
        }

        return -1.0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[][]} equations
     * @param {number[]} values
     * @param {string[][]} queries
     * @return {number[]}
     */
    calcEquation(equations, values, queries) {
        const adj = new Map(); // Map a -> list of [b, a/b]

        for (let i = 0; i < equations.length; i++) {
            const [a, b] = equations[i];
            if (!adj.has(a)) adj.set(a, []);
            if (!adj.has(b)) adj.set(b, []);
            adj.get(a).push([b, values[i]]);
            adj.get(b).push([a, 1 / values[i]]);
        }

        const bfs = (src, target) => {
            if (!adj.has(src) || !adj.has(target)) return -1;

            const queue = new Queue([[src, 1.0]]);
            const visited = new Set();
            visited.add(src);

            while (!queue.isEmpty()) {
                const [node, weight] = queue.pop();

                if (node === target) return weight;

                for (const [nei, neiWeight] of adj.get(node)) {
                    if (!visited.has(nei)) {
                        visited.add(nei);
                        queue.push([nei, weight * neiWeight]);
                    }
                }
            }

            return -1;
        };

        return queries.map(([src, target]) => bfs(src, target));
    }
}
```

```csharp
public class Solution {
    public double[] CalcEquation(List<List<string>> equations, double[] values, List<List<string>> queries) {
        var adj = new Dictionary<string, List<(string, double)>>();

        for (int i = 0; i < equations.Count; i++) {
            string a = equations[i][0];
            string b = equations[i][1];
            double val = values[i];

            if (!adj.ContainsKey(a)) adj[a] = new List<(string, double)>();
            if (!adj.ContainsKey(b)) adj[b] = new List<(string, double)>();

            adj[a].Add((b, val));
            adj[b].Add((a, 1.0 / val));
        }

        double Bfs(string src, string target) {
            if (!adj.ContainsKey(src) || !adj.ContainsKey(target)) return -1.0;
            var queue = new Queue<(string, double)>();
            var visited = new HashSet<string>();

            queue.Enqueue((src, 1.0));
            visited.Add(src);

            while (queue.Count > 0) {
                var (node, weight) = queue.Dequeue();
                if (node == target) return weight;

                foreach (var (nei, w) in adj[node]) {
                    if (!visited.Contains(nei)) {
                        visited.Add(nei);
                        queue.Enqueue((nei, weight * w));
                    }
                }
            }

            return -1.0;
        }

        double[] res = new double[queries.Count];
        for (int i = 0; i < queries.Count; i++) {
            res[i] = Bfs(queries[i][0], queries[i][1]);
        }

        return res;
    }
}
```

```go
func calcEquation(equations [][]string, values []float64, queries [][]string) []float64 {
    adj := make(map[string][][2]interface{})

    for i, eq := range equations {
        a, b := eq[0], eq[1]
        adj[a] = append(adj[a], [2]interface{}{b, values[i]})
        adj[b] = append(adj[b], [2]interface{}{a, 1.0 / values[i]})
    }

    bfs := func(src, target string) float64 {
        if _, ok := adj[src]; !ok {
            return -1.0
        }
        if _, ok := adj[target]; !ok {
            return -1.0
        }

        queue := [][2]interface{}{{src, 1.0}}
        visited := make(map[string]bool)
        visited[src] = true

        for len(queue) > 0 {
            node := queue[0][0].(string)
            weight := queue[0][1].(float64)
            queue = queue[1:]

            if node == target {
                return weight
            }

            for _, nei := range adj[node] {
                neiNode := nei[0].(string)
                neiWeight := nei[1].(float64)
                if !visited[neiNode] {
                    visited[neiNode] = true
                    queue = append(queue, [2]interface{}{neiNode, weight * neiWeight})
                }
            }
        }

        return -1.0
    }

    res := make([]float64, len(queries))
    for i, q := range queries {
        res[i] = bfs(q[0], q[1])
    }

    return res
}
```

```kotlin
class Solution {
    fun calcEquation(equations: List<List<String>>, values: DoubleArray, queries: List<List<String>>): DoubleArray {
        val adj = HashMap<String, MutableList<Pair<String, Double>>>()

        for (i in equations.indices) {
            val (a, b) = equations[i]
            adj.getOrPut(a) { mutableListOf() }.add(Pair(b, values[i]))
            adj.getOrPut(b) { mutableListOf() }.add(Pair(a, 1.0 / values[i]))
        }

        fun bfs(src: String, target: String): Double {
            if (src !in adj || target !in adj) return -1.0

            val queue: ArrayDeque<Pair<String, Double>> = ArrayDeque()
            val visited = HashSet<String>()
            queue.add(Pair(src, 1.0))
            visited.add(src)

            while (queue.isNotEmpty()) {
                val (node, weight) = queue.removeFirst()

                if (node == target) return weight

                for ((nei, neiWeight) in adj[node]!!) {
                    if (nei !in visited) {
                        visited.add(nei)
                        queue.add(Pair(nei, weight * neiWeight))
                    }
                }
            }

            return -1.0
        }

        return queries.map { (src, target) -> bfs(src, target) }.toDoubleArray()
    }
}
```

```swift
class Solution {
    func calcEquation(_ equations: [[String]], _ values: [Double], _ queries: [[String]]) -> [Double] {
        var adj = [String: [(String, Double)]]()

        for i in 0..<equations.count {
            let a = equations[i][0]
            let b = equations[i][1]
            adj[a, default: []].append((b, values[i]))
            adj[b, default: []].append((a, 1.0 / values[i]))
        }

        func bfs(_ src: String, _ target: String) -> Double {
            guard adj[src] != nil, adj[target] != nil else { return -1.0 }

            var queue = [(src, 1.0)]
            var visited = Set<String>()
            visited.insert(src)

            while !queue.isEmpty {
                let (node, weight) = queue.removeFirst()

                if node == target {
                    return weight
                }

                for (nei, neiWeight) in adj[node]! {
                    if !visited.contains(nei) {
                        visited.insert(nei)
                        queue.append((nei, weight * neiWeight))
                    }
                }
            }

            return -1.0
        }

        return queries.map { bfs($0[0], $0[1]) }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(n + m)$

> Where $n$ is the number of unique strings and $m$ is the number of queries.

---

## 2. Depth First Search

### Intuition

Like BFS, DFS also explores paths through the graph, but it goes deep before backtracking. We recursively explore from the source, multiplying edge weights as we go. The first complete path we find from source to target gives us the answer.

DFS is often simpler to implement recursively. At each step, we check if we have reached the target. If not, we try all unvisited neighbors, and if any recursive call succeeds (returns a non-negative result), we multiply by the current edge weight and return.

### Algorithm

1. Build the same adjacency list as in BFS.
2. For each query `(src, target)`:
   - If either variable is not in the graph, return `-1`.
   - If `src == target`, return `1.0` (any variable divided by itself is `1`).
   - Mark `src` as visited and explore all neighbors recursively.
   - For each unvisited neighbor, recursively search for `target`. If found, multiply the result by the edge weight and return.
   - If no path is found, return `-1`.
3. Return the results for all queries.

::tabs-start

```python
class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        adj = collections.defaultdict(list)  # Map a -> list of [b, a/b]

        for i, eq in enumerate(equations):
            a, b = eq
            adj[a].append((b, values[i]))
            adj[b].append((a, 1 / values[i]))

        def dfs(src, target, visited):
            if src not in adj or target not in adj:
                return -1
            if src == target:
                return 1

            visited.add(src)

            for nei, weight in adj[src]:
                if nei not in visited:
                    result = dfs(nei, target, visited)
                    if result != -1:
                        return weight * result

            return -1

        return [dfs(q[0], q[1], set()) for q in queries]
```

```java
public class Solution {
    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        Map<String, List<Pair>> adj = new HashMap<>(); // Map a -> list of [b, a/b]

        for (int i = 0; i < equations.size(); i++) {
            String a = equations.get(i).get(0);
            String b = equations.get(i).get(1);
            adj.putIfAbsent(a, new ArrayList<>());
            adj.putIfAbsent(b, new ArrayList<>());
            adj.get(a).add(new Pair(b, values[i]));
            adj.get(b).add(new Pair(a, 1 / values[i]));
        }

        double[] res = new double[queries.size()];
        for (int i = 0; i < queries.size(); i++) {
            String src = queries.get(i).get(0);
            String target = queries.get(i).get(1);
            res[i] = dfs(src, target, adj, new HashSet<>());
        }

        return res;
    }

    private double dfs(String src, String target, Map<String, List<Pair>> adj, Set<String> visited) {
        if (!adj.containsKey(src) || !adj.containsKey(target)) {
            return -1.0;
        }
        if (src.equals(target)) {
            return 1.0;
        }

        visited.add(src);

        for (Pair neighbor : adj.get(src)) {
            if (!visited.contains(neighbor.node)) {
                double result = dfs(neighbor.node, target, adj, visited);
                if (result != -1.0) {
                    return neighbor.weight * result;
                }
            }
        }

        return -1.0;
    }

    class Pair {
        String node;
        double weight;

        Pair(String node, double weight) {
            this.node = node;
            this.weight = weight;
        }
    }
}
```

```cpp
class Solution {
public:
    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        unordered_map<string, vector<pair<string, double>>> adj; // Map a -> list of [b, a/b]

        for (int i = 0; i < equations.size(); i++) {
            string a = equations[i][0];
            string b = equations[i][1];
            adj[a].emplace_back(b, values[i]);
            adj[b].emplace_back(a, 1.0 / values[i]);
        }

        vector<double> res;
        for (const auto& query : queries) {
            string src = query[0];
            string target = query[1];
            res.push_back(dfs(src, target, adj, unordered_set<string>()));
        }

        return res;
    }

private:
    double dfs(const string& src, const string& target, unordered_map<string, vector<pair<string, double>>>& adj, unordered_set<string> visited) {
        if (!adj.count(src) || !adj.count(target)) {
            return -1.0;
        }
        if (src == target) {
            return 1.0;
        }

        visited.insert(src);

        for (const auto& [nei, weight] : adj[src]) {
            if (!visited.count(nei)) {
                double result = dfs(nei, target, adj, visited);
                if (result != -1.0) {
                    return weight * result;
                }
            }
        }

        return -1.0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[][]} equations
     * @param {number[]} values
     * @param {string[][]} queries
     * @return {number[]}
     */
    calcEquation(equations, values, queries) {
        const adj = new Map(); // Map a -> list of [b, a/b]

        for (let i = 0; i < equations.length; i++) {
            const [a, b] = equations[i];
            if (!adj.has(a)) adj.set(a, []);
            if (!adj.has(b)) adj.set(b, []);
            adj.get(a).push([b, values[i]]);
            adj.get(b).push([a, 1 / values[i]]);
        }

        const dfs = (src, target, visited) => {
            if (!adj.has(src) || !adj.has(target)) return -1;
            if (src === target) return 1;

            visited.add(src);

            for (const [nei, weight] of adj.get(src)) {
                if (!visited.has(nei)) {
                    const result = dfs(nei, target, visited);
                    if (result !== -1) {
                        return weight * result;
                    }
                }
            }

            return -1;
        };

        return queries.map(([src, target]) => dfs(src, target, new Set()));
    }
}
```

```csharp
public class Solution {
    public double[] CalcEquation(List<List<string>> equations, double[] values, List<List<string>> queries) {
        var adj = new Dictionary<string, List<(string, double)>>();

        for (int i = 0; i < equations.Count; i++) {
            string a = equations[i][0], b = equations[i][1];
            double val = values[i];

            if (!adj.ContainsKey(a)) adj[a] = new List<(string, double)>();
            if (!adj.ContainsKey(b)) adj[b] = new List<(string, double)>();

            adj[a].Add((b, val));
            adj[b].Add((a, 1.0 / val));
        }

        double Dfs(string src, string target, HashSet<string> visited) {
            if (!adj.ContainsKey(src) || !adj.ContainsKey(target)) return -1.0;
            if (src == target) return 1.0;

            visited.Add(src);

            foreach (var (nei, weight) in adj[src]) {
                if (!visited.Contains(nei)) {
                    double result = Dfs(nei, target, visited);
                    if (result != -1.0) {
                        return weight * result;
                    }
                }
            }

            return -1.0;
        }

        double[] res = new double[queries.Count];
        for (int i = 0; i < queries.Count; i++) {
            var visited = new HashSet<string>();
            res[i] = Dfs(queries[i][0], queries[i][1], visited);
        }

        return res;
    }
}
```

```go
func calcEquation(equations [][]string, values []float64, queries [][]string) []float64 {
    adj := make(map[string][][2]interface{})

    for i, eq := range equations {
        a, b := eq[0], eq[1]
        adj[a] = append(adj[a], [2]interface{}{b, values[i]})
        adj[b] = append(adj[b], [2]interface{}{a, 1.0 / values[i]})
    }

    var dfs func(src, target string, visited map[string]bool) float64
    dfs = func(src, target string, visited map[string]bool) float64 {
        if _, ok := adj[src]; !ok {
            return -1.0
        }
        if _, ok := adj[target]; !ok {
            return -1.0
        }
        if src == target {
            return 1.0
        }

        visited[src] = true

        for _, nei := range adj[src] {
            neiNode := nei[0].(string)
            weight := nei[1].(float64)
            if !visited[neiNode] {
                result := dfs(neiNode, target, visited)
                if result != -1.0 {
                    return weight * result
                }
            }
        }

        return -1.0
    }

    res := make([]float64, len(queries))
    for i, q := range queries {
        visited := make(map[string]bool)
        res[i] = dfs(q[0], q[1], visited)
    }

    return res
}
```

```kotlin
class Solution {
    fun calcEquation(equations: List<List<String>>, values: DoubleArray, queries: List<List<String>>): DoubleArray {
        val adj = HashMap<String, MutableList<Pair<String, Double>>>()

        for (i in equations.indices) {
            val (a, b) = equations[i]
            adj.getOrPut(a) { mutableListOf() }.add(Pair(b, values[i]))
            adj.getOrPut(b) { mutableListOf() }.add(Pair(a, 1.0 / values[i]))
        }

        fun dfs(src: String, target: String, visited: HashSet<String>): Double {
            if (src !in adj || target !in adj) return -1.0
            if (src == target) return 1.0

            visited.add(src)

            for ((nei, weight) in adj[src]!!) {
                if (nei !in visited) {
                    val result = dfs(nei, target, visited)
                    if (result != -1.0) {
                        return weight * result
                    }
                }
            }

            return -1.0
        }

        return queries.map { (src, target) -> dfs(src, target, HashSet()) }.toDoubleArray()
    }
}
```

```swift
class Solution {
    func calcEquation(_ equations: [[String]], _ values: [Double], _ queries: [[String]]) -> [Double] {
        var adj = [String: [(String, Double)]]()

        for i in 0..<equations.count {
            let a = equations[i][0]
            let b = equations[i][1]
            adj[a, default: []].append((b, values[i]))
            adj[b, default: []].append((a, 1.0 / values[i]))
        }

        func dfs(_ src: String, _ target: String, _ visited: inout Set<String>) -> Double {
            guard adj[src] != nil, adj[target] != nil else { return -1.0 }
            if src == target { return 1.0 }

            visited.insert(src)

            for (nei, weight) in adj[src]! {
                if !visited.contains(nei) {
                    let result = dfs(nei, target, &visited)
                    if result != -1.0 {
                        return weight * result
                    }
                }
            }

            return -1.0
        }

        return queries.map { query -> Double in
            var visited = Set<String>()
            return dfs(query[0], query[1], &visited)
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(n + m)$

> Where $n$ is the number of unique strings and $m$ is the number of queries.

---

## 3. Disjoint Set Union

### Intuition

Union-Find can track connected components, but here we need to track ratios between variables. The key insight is to store each variable's weight relative to its root. When we union two variables `x` and `y` with ratio `x/y = value`, we connect their roots and adjust weights so that the ratio relationship is preserved.

To query `x/y`, we find both roots. If they differ, no path exists. If they match, the answer is `weight[x] / weight[y]`, since both weights are relative to the same root.

### Algorithm

1. Initialize `parent` and `weight` maps. Each variable starts as its own parent with weight `1.0`.
2. The `find` operation uses path compression: while finding the root, update the weight to be relative to the root by multiplying along the path.
3. The `union` operation connects two variables: find both roots, and if different, set one root's parent to the other and adjust the weight to maintain the given ratio.
4. Process all equations by calling `union` for each pair.
5. For each query `(x, y)`:
   - If either variable is unknown or they have different roots, return `-1`.
   - Otherwise, return `weight[x] / weight[y]`.

::tabs-start

```python
class UnionFind:
    def __init__(self):
        self.parent = {}
        self.weight = {}

    def add(self, x):
        if x not in self.parent:
            self.parent[x] = x
            self.weight[x] = 1.0

    def find(self, x):
        if x != self.parent[x]:
            orig_parent = self.parent[x]
            self.parent[x] = self.find(self.parent[x])
            self.weight[x] *= self.weight[orig_parent]
        return self.parent[x]

    def union(self, x, y, value):
        self.add(x)
        self.add(y)
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x != root_y:
            self.parent[root_x] = root_y
            self.weight[root_x] = value * self.weight[y] / self.weight[x]

    def get_ratio(self, x, y):
        if x not in self.parent or y not in self.parent or self.find(x) != self.find(y):
            return -1.0
        return self.weight[x] / self.weight[y]

class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        uf = UnionFind()

        for (a, b), value in zip(equations, values):
            uf.union(a, b, value)

        return [uf.get_ratio(a, b) for a, b in queries]
```

```java
class UnionFind {
    private final Map<String, String> parent;
    private final Map<String, Double> weight;

    public UnionFind() {
        parent = new HashMap<>();
        weight = new HashMap<>();
    }

    public void add(String x) {
        if (!parent.containsKey(x)) {
            parent.put(x, x);
            weight.put(x, 1.0);
        }
    }

    public String find(String x) {
        if (!x.equals(parent.get(x))) {
            String origParent = parent.get(x);
            parent.put(x, find(origParent));
            weight.put(x, weight.get(x) * weight.get(origParent));
        }
        return parent.get(x);
    }

    public void union(String x, String y, double value) {
        add(x);
        add(y);
        String rootX = find(x);
        String rootY = find(y);

        if (!rootX.equals(rootY)) {
            parent.put(rootX, rootY);
            weight.put(rootX, value * weight.get(y) / weight.get(x));
        }
    }

    public double getRatio(String x, String y) {
        if (!parent.containsKey(x) || !parent.containsKey(y) || !find(x).equals(find(y))) {
            return -1.0;
        }
        return weight.get(x) / weight.get(y);
    }
}

public class Solution {
    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        UnionFind uf = new UnionFind();

        for (int i = 0; i < equations.size(); i++) {
            List<String> equation = equations.get(i);
            String a = equation.get(0);
            String b = equation.get(1);
            uf.union(a, b, values[i]);
        }

        double[] result = new double[queries.size()];
        for (int i = 0; i < queries.size(); i++) {
            List<String> query = queries.get(i);
            String a = query.get(0);
            String b = query.get(1);
            result[i] = uf.getRatio(a, b);
        }

        return result;
    }
}
```

```cpp
class UnionFind {
    unordered_map<string, string> parent;
    unordered_map<string, double> weight;

public:
    void add(const string& x) {
        if (parent.find(x) == parent.end()) {
            parent[x] = x;
            weight[x] = 1.0;
        }
    }

    string find(const string& x) {
        if (x != parent[x]) {
            string origParent = parent[x];
            parent[x] = find(parent[x]);
            weight[x] *= weight[origParent];
        }
        return parent[x];
    }

    void unionSets(const string& x, const string& y, double value) {
        add(x);
        add(y);
        string rootX = find(x);
        string rootY = find(y);

        if (rootX != rootY) {
            parent[rootX] = rootY;
            weight[rootX] = value * weight[y] / weight[x];
        }
    }

    double getRatio(const string& x, const string& y) {
        if (parent.find(x) == parent.end() || parent.find(y) == parent.end() || find(x) != find(y)) {
            return -1.0;
        }
        return weight[x] / weight[y];
    }
};

class Solution {
public:
    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        UnionFind uf;

        for (int i = 0; i < equations.size(); i++) {
            string a = equations[i][0];
            string b = equations[i][1];
            uf.unionSets(a, b, values[i]);
        }

        vector<double> result;
        for (const auto& query : queries) {
            string a = query[0];
            string b = query[1];
            result.push_back(uf.getRatio(a, b));
        }

        return result;
    }
};
```

```javascript
class UnionFind {
    constructor() {
        this.parent = new Map();
        this.weight = new Map();
    }

    /**
     * @param {string} x
     * @return {void}
     */
    add(x) {
        if (!this.parent.has(x)) {
            this.parent.set(x, x);
            this.weight.set(x, 1.0);
        }
    }

    /**
     * @param {string} x
     * @return {string}
     */
    find(x) {
        if (x !== this.parent.get(x)) {
            const origParent = this.parent.get(x);
            this.parent.set(x, this.find(origParent));
            this.weight.set(
                x,
                this.weight.get(x) * this.weight.get(origParent),
            );
        }
        return this.parent.get(x);
    }

    /**
     * @param {string} x
     * @param {string} y
     * @param {number} value
     * @return {number}
     */
    union(x, y, value) {
        this.add(x);
        this.add(y);
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
            this.parent.set(rootX, rootY);
            this.weight.set(
                rootX,
                (value * this.weight.get(y)) / this.weight.get(x),
            );
        }
    }

    /**
     * @param {string} x
     * @param {string} y
     * @return {number}
     */
    getRatio(x, y) {
        if (
            !this.parent.has(x) ||
            !this.parent.has(y) ||
            this.find(x) !== this.find(y)
        ) {
            return -1.0;
        }
        return this.weight.get(x) / this.weight.get(y);
    }
}

class Solution {
    /**
     * @param {string[][]} equations
     * @param {number[]} values
     * @param {string[][]} queries
     * @return {number[]}
     */
    calcEquation(equations, values, queries) {
        const uf = new UnionFind();

        for (let i = 0; i < equations.length; i++) {
            const [a, b] = equations[i];
            uf.union(a, b, values[i]);
        }

        return queries.map(([a, b]) => uf.getRatio(a, b));
    }
}
```

```csharp
public class UnionFind {
    private Dictionary<string, string> parent = new Dictionary<string, string>();
    private Dictionary<string, double> weight = new Dictionary<string, double>();

    public void Add(string x) {
        if (!parent.ContainsKey(x)) {
            parent[x] = x;
            weight[x] = 1.0;
        }
    }

    public string Find(string x) {
        if (parent[x] != x) {
            string origParent = parent[x];
            parent[x] = Find(origParent);
            weight[x] *= weight[origParent];
        }
        return parent[x];
    }

    public void Union(string x, string y, double value) {
        Add(x);
        Add(y);
        string rootX = Find(x);
        string rootY = Find(y);

        if (rootX != rootY) {
            parent[rootX] = rootY;
            weight[rootX] = value * weight[y] / weight[x];
        }
    }

    public double GetRatio(string x, string y) {
        if (!parent.ContainsKey(x) || !parent.ContainsKey(y) || Find(x) != Find(y)) {
            return -1.0;
        }
        return weight[x] / weight[y];
    }
}

public class Solution {
    public double[] CalcEquation(List<List<string>> equations, double[] values, List<List<string>> queries) {
        var uf = new UnionFind();

        for (int i = 0; i < equations.Count; i++) {
            string a = equations[i][0];
            string b = equations[i][1];
            uf.Union(a, b, values[i]);
        }

        double[] res = new double[queries.Count];
        for (int i = 0; i < queries.Count; i++) {
            string a = queries[i][0];
            string b = queries[i][1];
            res[i] = uf.GetRatio(a, b);
        }

        return res;
    }
}
```

```go
type UnionFind struct {
    parent map[string]string
    weight map[string]float64
}

func NewUnionFind() *UnionFind {
    return &UnionFind{
        parent: make(map[string]string),
        weight: make(map[string]float64),
    }
}

func (uf *UnionFind) Add(x string) {
    if _, ok := uf.parent[x]; !ok {
        uf.parent[x] = x
        uf.weight[x] = 1.0
    }
}

func (uf *UnionFind) Find(x string) string {
    if uf.parent[x] != x {
        origParent := uf.parent[x]
        uf.parent[x] = uf.Find(origParent)
        uf.weight[x] *= uf.weight[origParent]
    }
    return uf.parent[x]
}

func (uf *UnionFind) Union(x, y string, value float64) {
    uf.Add(x)
    uf.Add(y)
    rootX := uf.Find(x)
    rootY := uf.Find(y)

    if rootX != rootY {
        uf.parent[rootX] = rootY
        uf.weight[rootX] = value * uf.weight[y] / uf.weight[x]
    }
}

func (uf *UnionFind) GetRatio(x, y string) float64 {
    _, okX := uf.parent[x]
    _, okY := uf.parent[y]
    if !okX || !okY || uf.Find(x) != uf.Find(y) {
        return -1.0
    }
    return uf.weight[x] / uf.weight[y]
}

func calcEquation(equations [][]string, values []float64, queries [][]string) []float64 {
    uf := NewUnionFind()

    for i, eq := range equations {
        uf.Union(eq[0], eq[1], values[i])
    }

    res := make([]float64, len(queries))
    for i, q := range queries {
        res[i] = uf.GetRatio(q[0], q[1])
    }

    return res
}
```

```kotlin
class UnionFind {
    private val parent = HashMap<String, String>()
    private val weight = HashMap<String, Double>()

    fun add(x: String) {
        if (x !in parent) {
            parent[x] = x
            weight[x] = 1.0
        }
    }

    fun find(x: String): String {
        if (parent[x] != x) {
            val origParent = parent[x]!!
            parent[x] = find(origParent)
            weight[x] = weight[x]!! * weight[origParent]!!
        }
        return parent[x]!!
    }

    fun union(x: String, y: String, value: Double) {
        add(x)
        add(y)
        val rootX = find(x)
        val rootY = find(y)

        if (rootX != rootY) {
            parent[rootX] = rootY
            weight[rootX] = value * weight[y]!! / weight[x]!!
        }
    }

    fun getRatio(x: String, y: String): Double {
        if (x !in parent || y !in parent || find(x) != find(y)) {
            return -1.0
        }
        return weight[x]!! / weight[y]!!
    }
}

class Solution {
    fun calcEquation(equations: List<List<String>>, values: DoubleArray, queries: List<List<String>>): DoubleArray {
        val uf = UnionFind()

        for (i in equations.indices) {
            val (a, b) = equations[i]
            uf.union(a, b, values[i])
        }

        return queries.map { (a, b) -> uf.getRatio(a, b) }.toDoubleArray()
    }
}
```

```swift
class UnionFind {
    private var parent = [String: String]()
    private var weight = [String: Double]()

    func add(_ x: String) {
        if parent[x] == nil {
            parent[x] = x
            weight[x] = 1.0
        }
    }

    func find(_ x: String) -> String {
        if parent[x] != x {
            let origParent = parent[x]!
            parent[x] = find(origParent)
            weight[x] = weight[x]! * weight[origParent]!
        }
        return parent[x]!
    }

    func union(_ x: String, _ y: String, _ value: Double) {
        add(x)
        add(y)
        let rootX = find(x)
        let rootY = find(y)

        if rootX != rootY {
            parent[rootX] = rootY
            weight[rootX] = value * weight[y]! / weight[x]!
        }
    }

    func getRatio(_ x: String, _ y: String) -> Double {
        if parent[x] == nil || parent[y] == nil || find(x) != find(y) {
            return -1.0
        }
        return weight[x]! / weight[y]!
    }
}

class Solution {
    func calcEquation(_ equations: [[String]], _ values: [Double], _ queries: [[String]]) -> [Double] {
        let uf = UnionFind()

        for i in 0..<equations.count {
            let a = equations[i][0]
            let b = equations[i][1]
            uf.union(a, b, values[i])
        }

        return queries.map { uf.getRatio($0[0], $0[1]) }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((m + n)\log n)$
- Space complexity: $O(n + m)$

> Where $n$ is the number of unique strings and $m$ is the number of queries.

---

## 4. Floyd Warshall

### Intuition

Floyd-Warshall computes shortest paths between all pairs of nodes. Here, instead of distances, we compute the product of ratios. If we know `a/b` and `b/c`, then `a/c = (a/b) * (b/c)`. We precompute all such transitive ratios.

This approach trades query time for preprocessing time. After running Floyd-Warshall, each query becomes a simple lookup.

### Algorithm

1. Build a graph where `graph[a][b] = value` for equation `a/b = value`, and `graph[b][a] = 1/value`.
2. Run Floyd-Warshall: for each intermediate node `k`, and for each pair of nodes `(i, j)` connected through `k`, compute `graph[i][j] = graph[i][k] * graph[k][j]` if this path does not already exist.
3. For each query `(a, b)`:
   - If `a` is in the graph and `b` is reachable from `a`, return `graph[a][b]`.
   - Otherwise, return `-1`.

::tabs-start

```python
class Solution:
    def calcEquation(self, equations, values, queries):
        graph = collections.defaultdict(dict)

        for (a, b), value in zip(equations, values):
            graph[a][b] = value
            graph[b][a] = 1.0 / value

        for k in graph:
            for i in graph[k]:
                for j in graph[k]:
                    if j not in graph[i]:
                        graph[i][j] = graph[i][k] * graph[k][j]

        result = []
        for a, b in queries:
            if a in graph and b in graph[a]:
                result.append(graph[a][b])
            else:
                result.append(-1.0)
        return result
```

```java
public class Solution {
    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        Map<String, Map<String, Double>> graph = new HashMap<>();

        for (int i = 0; i < equations.size(); i++) {
            String a = equations.get(i).get(0);
            String b = equations.get(i).get(1);
            double value = values[i];
            graph.computeIfAbsent(a, k -> new HashMap<>()).put(b, value);
            graph.computeIfAbsent(b, k -> new HashMap<>()).put(a, 1.0 / value);
        }

        for (String k : graph.keySet()) {
            for (String i : graph.get(k).keySet()) {
                for (String j : graph.get(k).keySet()) {
                    graph.computeIfAbsent(i, x -> new HashMap<>()).putIfAbsent(j, graph.get(i).get(k) * graph.get(k).get(j));
                }
            }
        }

        double[] result = new double[queries.size()];
        for (int i = 0; i < queries.size(); i++) {
            String a = queries.get(i).get(0);
            String b = queries.get(i).get(1);
            if (graph.containsKey(a) && graph.get(a).containsKey(b)) {
                result[i] = graph.get(a).get(b);
            } else {
                result[i] = -1.0;
            }
        }

        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        unordered_map<string, unordered_map<string, double>> graph;

        for (int i = 0; i < equations.size(); i++) {
            string a = equations[i][0];
            string b = equations[i][1];
            double value = values[i];
            graph[a][b] = value;
            graph[b][a] = 1.0 / value;
        }

        for (const auto& pair : graph) {
            const string& k = pair.first;
            for (const auto& pair1 : graph[k]) {
                const string& i = pair1.first;
                for (const auto& pair2 : graph[k]) {
                    const string& j = pair2.first;
                    if (!graph[i].count(j)) {
                        graph[i][j] = graph[i][k] * graph[k][j];
                    }
                }
            }
        }

        vector<double> result;
        for (const auto& query : queries) {
            const string& a = query[0];
            const string& b = query[1];
            if (!graph.count(a) || !graph[a].count(b)) {
                result.push_back(-1.0);
            } else {
                result.push_back(graph[a][b]);
            }
        }

        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[][]} equations
     * @param {number[]} values
     * @param {string[][]} queries
     * @return {number[]}
     */
    calcEquation(equations, values, queries) {
        const graph = new Map();

        for (let i = 0; i < equations.length; i++) {
            const [a, b] = equations[i];
            const value = values[i];
            if (!graph.has(a)) graph.set(a, new Map());
            if (!graph.has(b)) graph.set(b, new Map());
            graph.get(a).set(b, value);
            graph.get(b).set(a, 1 / value);
        }

        for (const k of graph.keys()) {
            for (const i of graph.get(k).keys()) {
                for (const j of graph.get(k).keys()) {
                    if (!graph.get(i).has(j)) {
                        graph
                            .get(i)
                            .set(j, graph.get(i).get(k) * graph.get(k).get(j));
                    }
                }
            }
        }

        return queries.map(([a, b]) => {
            if (graph.has(a) && graph.get(a).has(b)) {
                return graph.get(a).get(b);
            } else {
                return -1.0;
            }
        });
    }
}
```

```csharp
public class Solution {
    public double[] CalcEquation(List<List<string>> equations, double[] values, List<List<string>> queries) {
        var graph = new Dictionary<string, Dictionary<string, double>>();

        for (int i = 0; i < equations.Count; i++) {
            string a = equations[i][0];
            string b = equations[i][1];
            double val = values[i];

            if (!graph.ContainsKey(a)) graph[a] = new Dictionary<string, double>();
            if (!graph.ContainsKey(b)) graph[b] = new Dictionary<string, double>();

            graph[a][b] = val;
            graph[b][a] = 1.0 / val;
        }

        foreach (var k in graph.Keys.ToList()) {
            foreach (var i in graph[k].Keys.ToList()) {
                foreach (var j in graph[k].Keys.ToList()) {
                    if (!graph[i].ContainsKey(j)) {
                        graph[i][j] = graph[i][k] * graph[k][j];
                    }
                }
            }
        }

        double[] result = new double[queries.Count];
        for (int i = 0; i < queries.Count; i++) {
            string a = queries[i][0];
            string b = queries[i][1];
            if (graph.ContainsKey(a) && graph[a].ContainsKey(b)) {
                result[i] = graph[a][b];
            } else {
                result[i] = -1.0;
            }
        }

        return result;
    }
}
```

```go
func calcEquation(equations [][]string, values []float64, queries [][]string) []float64 {
    graph := make(map[string]map[string]float64)

    for i, eq := range equations {
        a, b := eq[0], eq[1]
        if graph[a] == nil {
            graph[a] = make(map[string]float64)
        }
        if graph[b] == nil {
            graph[b] = make(map[string]float64)
        }
        graph[a][b] = values[i]
        graph[b][a] = 1.0 / values[i]
    }

    for k := range graph {
        for i := range graph[k] {
            for j := range graph[k] {
                if _, ok := graph[i][j]; !ok {
                    graph[i][j] = graph[i][k] * graph[k][j]
                }
            }
        }
    }

    result := make([]float64, len(queries))
    for i, q := range queries {
        a, b := q[0], q[1]
        if graph[a] != nil {
            if val, ok := graph[a][b]; ok {
                result[i] = val
            } else {
                result[i] = -1.0
            }
        } else {
            result[i] = -1.0
        }
    }

    return result
}
```

```kotlin
class Solution {
    fun calcEquation(equations: List<List<String>>, values: DoubleArray, queries: List<List<String>>): DoubleArray {
        val graph = HashMap<String, HashMap<String, Double>>()

        for (i in equations.indices) {
            val (a, b) = equations[i]
            val value = values[i]
            graph.getOrPut(a) { HashMap() }[b] = value
            graph.getOrPut(b) { HashMap() }[a] = 1.0 / value
        }

        for (k in graph.keys) {
            for (i in graph[k]!!.keys) {
                for (j in graph[k]!!.keys) {
                    if (j !in graph[i]!!) {
                        graph[i]!![j] = graph[i]!![k]!! * graph[k]!![j]!!
                    }
                }
            }
        }

        return queries.map { (a, b) ->
            if (graph[a]?.containsKey(b) == true) {
                graph[a]!![b]!!
            } else {
                -1.0
            }
        }.toDoubleArray()
    }
}
```

```swift
class Solution {
    func calcEquation(_ equations: [[String]], _ values: [Double], _ queries: [[String]]) -> [Double] {
        var graph = [String: [String: Double]]()

        for i in 0..<equations.count {
            let a = equations[i][0]
            let b = equations[i][1]
            let value = values[i]
            graph[a, default: [:]][b] = value
            graph[b, default: [:]][a] = 1.0 / value
        }

        let keys = Array(graph.keys)
        for k in keys {
            for i in graph[k]!.keys {
                for j in graph[k]!.keys {
                    if graph[i]![j] == nil {
                        graph[i]![j] = graph[i]![k]! * graph[k]![j]!
                    }
                }
            }
        }

        return queries.map { query -> Double in
            let a = query[0]
            let b = query[1]
            if let val = graph[a]?[b] {
                return val
            } else {
                return -1.0
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n ^ 3)$
- Space complexity: $O(n ^ 2 + m)$

> Where $n$ is the number of unique strings and $m$ is the number of queries.

---

## Common Pitfalls

### Forgetting to Add Reciprocal Edges

When building the graph, each equation `a / b = value` must create two edges: `a -> b` with weight `value` AND `b -> a` with weight `1/value`. Forgetting the reciprocal edge means you can only traverse the relationship in one direction, causing valid queries to return `-1` when the path exists in reverse.

### Not Handling Unknown Variables

A query might contain variables that never appeared in any equation. Before starting BFS/DFS, you must check if both the source and target variables exist in the graph. Attempting to traverse from a non-existent node will cause null pointer errors or infinite loops depending on your implementation.

### Incorrect Weight Multiplication Order in Union-Find

In the weighted Union-Find approach, the weight calculation during union is subtle: when connecting `rootX` to `rootY`, the new weight for `rootX` must be `value * weight[y] / weight[x]`. Getting this formula wrong (such as dividing instead of multiplying, or using the wrong variables) will produce incorrect ratios for subsequent queries.
