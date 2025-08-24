## 1. Dijkstra's Algorithm - I

::tabs-start

```python
class Solution:
    def maxProbability(self, n: int, edges: List[List[int]], succProb: List[float], start_node: int, end_node: int) -> float:
        adj = collections.defaultdict(list)
        for i in range(len(edges)):
            src, dst = edges[i]
            adj[src].append((dst, succProb[i]))
            adj[dst].append((src, succProb[i]))

        pq = [(-1, start_node)]
        visit = set()

        while pq:
            prob, cur = heapq.heappop(pq)
            visit.add(cur)

            if cur == end_node:
                return -prob

            for nei, edgeProb in adj[cur]:
                if nei not in visit:
                    heapq.heappush(pq, (prob * edgeProb, nei))

        return 0.0
```

```java
public class Solution {
    public double maxProbability(int n, int[][] edges, double[] succProb, int start_node, int end_node) {
        List<Pair>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();

        for (int i = 0; i < edges.length; i++) {
            int src = edges[i][0], dst = edges[i][1];
            adj[src].add(new Pair(dst, succProb[i]));
            adj[dst].add(new Pair(src, succProb[i]));
        }

        double[] maxProb = new double[n];
        maxProb[start_node] = 1.0;
        PriorityQueue<Pair> pq = new PriorityQueue<>((a, b) -> Double.compare(b.prob, a.prob));
        pq.offer(new Pair(start_node, 1.0));

        while (!pq.isEmpty()) {
            Pair top = pq.poll();
            int node = top.node;
            double curr_prob = top.prob;

            if (node == end_node) return curr_prob;
            if (curr_prob > maxProb[node]) continue;

            for (Pair nei : adj[node]) {
                double new_prob = curr_prob * nei.prob;
                if (new_prob > maxProb[nei.node]) {
                    maxProb[nei.node] = new_prob;
                    pq.offer(new Pair(nei.node, new_prob));
                }
            }
        }

        return 0.0;
    }

    static class Pair {
        int node;
        double prob;

        Pair(int node, double prob) {
            this.node = node;
            this.prob = prob;
        }
    }
}
```

```cpp
class Solution {
public:
    double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start_node, int end_node) {
        vector<vector<pair<int, double>>> adj(n);
        for (int i = 0; i < edges.size(); i++) {
            int src = edges[i][0], dst = edges[i][1];
            adj[src].emplace_back(dst, succProb[i]);
            adj[dst].emplace_back(src, succProb[i]);
        }

        vector<double> maxProb(n, 0.0);
        maxProb[start_node] = 1.0;
        priority_queue<pair<double, int>> pq;
        pq.emplace(1.0, start_node);

        while (!pq.empty()) {
            auto [curr_prob, node] = pq.top(); pq.pop();

            if (node == end_node) return curr_prob;
            if (curr_prob > maxProb[node]) continue;

            for (auto& [nei, edge_prob] : adj[node]) {
                double new_prob = curr_prob * edge_prob;
                if (new_prob > maxProb[nei]) {
                    maxProb[nei] = new_prob;
                    pq.emplace(new_prob, nei);
                }
            }
        }

        return 0.0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @param {number[]} succProb
     * @param {number} start_node
     * @param {number} end_node
     * @return {number}
     */
    maxProbability(n, edges, succProb, start_node, end_node) {
        let adj = new Map();
        for (let i = 0; i < n; i++) adj.set(i, []);

        for (let i = 0; i < edges.length; i++) {
            let [src, dst] = edges[i];
            adj.get(src).push([dst, succProb[i]]);
            adj.get(dst).push([src, succProb[i]]);
        }

        let pq = new MaxPriorityQueue(x => x[0]);
        pq.enqueue([1.0, start_node]);
        let visited = new Set();

        while (!pq.isEmpty()) {
            let [prob, cur] = pq.dequeue();
            visited.add(cur);

            if (cur === end_node) return prob;

            for (let [nei, edgeProb] of adj.get(cur)) {
                if (!visited.has(nei)) {
                    pq.enqueue([prob * edgeProb, nei]);
                }
            }
        }

        return 0.0;
    }
}
```

```csharp
public class Solution {
    public double MaxProbability(int n, int[][] edges, double[] succProb, int start_node, int end_node) {
        List<Pair>[] adj = new List<Pair>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<Pair>();

        for (int i = 0; i < edges.Length; i++) {
            int src = edges[i][0], dst = edges[i][1];
            adj[src].Add(new Pair(dst, succProb[i]));
            adj[dst].Add(new Pair(src, succProb[i]));
        }

        double[] maxProb = new double[n];
        maxProb[start_node] = 1.0;

        var pq = new PriorityQueue<Pair, double>();
        pq.Enqueue(new Pair(start_node, 1.0), -1.0); // negative to simulate max-heap

        while (pq.Count > 0) {
            var top = pq.Dequeue();
            int node = top.Node;
            double currProb = top.Prob;

            if (node == end_node) return currProb;
            if (currProb < maxProb[node]) continue;

            foreach (var nei in adj[node]) {
                double newProb = currProb * nei.Prob;
                if (newProb > maxProb[nei.Node]) {
                    maxProb[nei.Node] = newProb;
                    pq.Enqueue(new Pair(nei.Node, newProb), -newProb);
                }
            }
        }

        return 0.0;
    }

    public class Pair {
        public int Node { get; }
        public double Prob { get; }

        public Pair(int node, double prob) {
            Node = node;
            Prob = prob;
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((V + E) \log V)$
- Space complexity: $O(V + E)$

> Where $V$ is the number nodes and $E$ is the number of edges.

---

## 2. Dijkstra's Algorithm - II

::tabs-start

```python
class Solution:
    def maxProbability(self, n: int, edges: List[List[int]], succProb: List[float], start_node: int, end_node: int) -> float:
        adj = [[] for _ in range(n)]
        for i in range(len(edges)):
            src, dst = edges[i]
            adj[src].append((dst, succProb[i]))
            adj[dst].append((src, succProb[i]))

        maxProb = [0] * n
        maxProb[start_node] = 1.0
        pq = [(-1.0, start_node)]

        while pq:
            curr_prob, node = heapq.heappop(pq)
            curr_prob *= -1

            if node == end_node:
                return curr_prob
            if curr_prob > maxProb[node]:
                continue

            for nei, edge_prob in adj[node]:
                new_prob = curr_prob * edge_prob
                if new_prob > maxProb[nei]:
                    maxProb[nei] = new_prob
                    heapq.heappush(pq, (-new_prob, nei))

        return 0.0
```

```java
public class Solution {
    public double maxProbability(int n, int[][] edges, double[] succProb, int start_node, int end_node) {
        List<Pair>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();

        for (int i = 0; i < edges.length; i++) {
            int src = edges[i][0], dst = edges[i][1];
            adj[src].add(new Pair(dst, succProb[i]));
            adj[dst].add(new Pair(src, succProb[i]));
        }

        double[] maxProb = new double[n];
        maxProb[start_node] = 1.0;
        PriorityQueue<Pair> pq = new PriorityQueue<>((a, b) -> Double.compare(b.prob, a.prob));
        pq.offer(new Pair(start_node, 1.0));

        while (!pq.isEmpty()) {
            Pair top = pq.poll();
            int node = top.node;
            double curr_prob = top.prob;

            if (node == end_node) return curr_prob;
            if (curr_prob > maxProb[node]) continue;

            for (Pair nei : adj[node]) {
                double new_prob = curr_prob * nei.prob;
                if (new_prob > maxProb[nei.node]) {
                    maxProb[nei.node] = new_prob;
                    pq.offer(new Pair(nei.node, new_prob));
                }
            }
        }

        return 0.0;
    }

    static class Pair {
        int node;
        double prob;

        Pair(int node, double prob) {
            this.node = node;
            this.prob = prob;
        }
    }
}
```

```cpp
class Solution {
public:
    double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start_node, int end_node) {
        vector<vector<pair<int, double>>> adj(n);
        for (int i = 0; i < edges.size(); i++) {
            int src = edges[i][0], dst = edges[i][1];
            adj[src].emplace_back(dst, succProb[i]);
            adj[dst].emplace_back(src, succProb[i]);
        }

        vector<double> maxProb(n, 0.0);
        maxProb[start_node] = 1.0;
        priority_queue<pair<double, int>> pq;
        pq.emplace(1.0, start_node);

        while (!pq.empty()) {
            auto [curr_prob, node] = pq.top(); pq.pop();

            if (node == end_node) return curr_prob;
            if (curr_prob > maxProb[node]) continue;

            for (auto& [nei, edge_prob] : adj[node]) {
                double new_prob = curr_prob * edge_prob;
                if (new_prob > maxProb[nei]) {
                    maxProb[nei] = new_prob;
                    pq.emplace(new_prob, nei);
                }
            }
        }

        return 0.0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @param {number[]} succProb
     * @param {number} start_node
     * @param {number} end_node
     * @return {number}
     */
    maxProbability(n, edges, succProb, start_node, end_node) {
        let adj = Array.from({ length: n }, () => []);
        for (let i = 0; i < edges.length; i++) {
            let [src, dst] = edges[i];
            adj[src].push([dst, succProb[i]]);
            adj[dst].push([src, succProb[i]]);
        }

        let maxProb = Array(n).fill(0);
        maxProb[start_node] = 1.0;
        let pq = new MaxPriorityQueue(x => x[1]);
        pq.enqueue([start_node, 1.0]);

        while (!pq.isEmpty()) {
            let [node, curr_prob] = pq.dequeue();

            if (node === end_node) return curr_prob;
            if (curr_prob > maxProb[node]) continue;

            for (let [nei, edge_prob] of adj[node]) {
                let new_prob = curr_prob * edge_prob;
                if (new_prob > maxProb[nei]) {
                    maxProb[nei] = new_prob;
                    pq.enqueue([nei, new_prob]);
                }
            }
        }

        return 0.0;
    }
}
```

```csharp
public class Solution {
    public double MaxProbability(int n, int[][] edges, double[] succProb, int start_node, int end_node) {
        List<Pair>[] adj = new List<Pair>[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new List<Pair>();
        }

        for (int i = 0; i < edges.Length; i++) {
            int src = edges[i][0], dst = edges[i][1];
            adj[src].Add(new Pair(dst, succProb[i]));
            adj[dst].Add(new Pair(src, succProb[i]));
        }

        double[] maxProb = new double[n];
        maxProb[start_node] = 1.0;

        var pq = new PriorityQueue<Pair, double>();
        pq.Enqueue(new Pair(start_node, 1.0), -1.0);

        while (pq.Count > 0) {
            var top = pq.Dequeue();
            int node = top.Node;
            double currProb = top.Prob;

            if (node == end_node) return currProb;
            if (currProb < maxProb[node]) continue;

            foreach (var nei in adj[node]) {
                double newProb = currProb * nei.Prob;
                if (newProb > maxProb[nei.Node]) {
                    maxProb[nei.Node] = newProb;
                    pq.Enqueue(new Pair(nei.Node, newProb), -newProb);
                }
            }
        }

        return 0.0;
    }

    public class Pair {
        public int Node { get; }
        public double Prob { get; }

        public Pair(int node, double prob) {
            Node = node;
            Prob = prob;
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((V + E) \log V)$
- Space complexity: $O(V + E)$

> Where $V$ is the number nodes and $E$ is the number of edges.

---

## 3. Bellman Ford Algorithm

::tabs-start

```python
class Solution:
    def maxProbability(self, n: int, edges: List[List[int]], succProb: List[float], start_node: int, end_node: int) -> float:
        maxProb = [0.0] * n
        maxProb[start_node] = 1.0

        for i in range(n):
            updated = False
            for j in range(len(edges)):
                src, dst = edges[j]
                if maxProb[src] * succProb[j] > maxProb[dst]:
                    maxProb[dst] = maxProb[src] * succProb[j]
                    updated = True

                if maxProb[dst] * succProb[j] > maxProb[src]:
                    maxProb[src] = maxProb[dst] * succProb[j]
                    updated = True

            if not updated:
                break

        return maxProb[end_node]
```

```java
public class Solution {
    public double maxProbability(int n, int[][] edges, double[] succProb, int start_node, int end_node) {
        double[] maxProb = new double[n];
        maxProb[start_node] = 1.0;

        for (int i = 0; i < n; i++) {
            boolean updated = false;
            for (int j = 0; j < edges.length; j++) {
                int src = edges[j][0], dst = edges[j][1];

                if (maxProb[src] * succProb[j] > maxProb[dst]) {
                    maxProb[dst] = maxProb[src] * succProb[j];
                    updated = true;
                }

                if (maxProb[dst] * succProb[j] > maxProb[src]) {
                    maxProb[src] = maxProb[dst] * succProb[j];
                    updated = true;
                }
            }
            if (!updated) break;
        }

        return maxProb[end_node];
    }
}
```

```cpp
class Solution {
public:
    double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start_node, int end_node) {
        vector<double> maxProb(n, 0.0);
        maxProb[start_node] = 1.0;

        for (int i = 0; i < n; i++) {
            bool updated = false;
            for (int j = 0; j < edges.size(); j++) {
                int src = edges[j][0], dst = edges[j][1];

                if (maxProb[src] * succProb[j] > maxProb[dst]) {
                    maxProb[dst] = maxProb[src] * succProb[j];
                    updated = true;
                }

                if (maxProb[dst] * succProb[j] > maxProb[src]) {
                    maxProb[src] = maxProb[dst] * succProb[j];
                    updated = true;
                }
            }
            if (!updated) break;
        }

        return maxProb[end_node];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @param {number[]} succProb
     * @param {number} start_node
     * @param {number} end_node
     * @return {number}
     */
    maxProbability(n, edges, succProb, start_node, end_node) {
        let maxProb = new Array(n).fill(0.0);
        maxProb[start_node] = 1.0;

        for (let i = 0; i < n; i++) {
            let updated = false;
            for (let j = 0; j < edges.length; j++) {
                let [src, dst] = edges[j];

                if (maxProb[src] * succProb[j] > maxProb[dst]) {
                    maxProb[dst] = maxProb[src] * succProb[j];
                    updated = true;
                }

                if (maxProb[dst] * succProb[j] > maxProb[src]) {
                    maxProb[src] = maxProb[dst] * succProb[j];
                    updated = true;
                }
            }
            if (!updated) break;
        }

        return maxProb[end_node];
    }
}
```

```csharp
public class Solution {
    public double MaxProbability(int n, int[][] edges, double[] succProb, int start_node, int end_node) {
        double[] maxProb = new double[n];
        maxProb[start_node] = 1.0;

        for (int i = 0; i < n; i++) {
            bool updated = false;
            for (int j = 0; j < edges.Length; j++) {
                int src = edges[j][0], dst = edges[j][1];

                if (maxProb[src] * succProb[j] > maxProb[dst]) {
                    maxProb[dst] = maxProb[src] * succProb[j];
                    updated = true;
                }

                if (maxProb[dst] * succProb[j] > maxProb[src]) {
                    maxProb[src] = maxProb[dst] * succProb[j];
                    updated = true;
                }
            }
            if (!updated) break;
        }

        return maxProb[end_node];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V * E)$
- Space complexity: $O(V)$

> Where $V$ is the number nodes and $E$ is the number of edges.

---

## 4. Shortest Path Faster Algorithm

::tabs-start

```python
class Solution:
    def maxProbability(self, n: int, edges: List[List[int]], succProb: List[float], start_node: int, end_node: int) -> float:
        adj = [[] for _ in range(n)]
        for i in range(len(edges)):
            src, dst = edges[i]
            adj[src].append((dst, succProb[i]))
            adj[dst].append((src, succProb[i]))

        maxProb = [0.0] * n
        maxProb[start_node] = 1.0
        q = deque([start_node])

        while q:
            node = q.popleft()

            for nei, edge_prob in adj[node]:
                new_prob = maxProb[node] * edge_prob
                if new_prob > maxProb[nei]:
                    maxProb[nei] = new_prob
                    q.append(nei)

        return maxProb[end_node]
```

```java
public class Solution {
    public double maxProbability(int n, int[][] edges, double[] succProb, int start_node, int end_node) {
        List<Pair>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();

        for (int i = 0; i < edges.length; i++) {
            int src = edges[i][0], dst = edges[i][1];
            adj[src].add(new Pair(dst, succProb[i]));
            adj[dst].add(new Pair(src, succProb[i]));
        }

        double[] maxProb = new double[n];
        maxProb[start_node] = 1.0;
        Queue<Integer> q = new LinkedList<>();
        q.offer(start_node);

        while (!q.isEmpty()) {
            int node = q.poll();

            for (Pair nei : adj[node]) {
                double newProb = maxProb[node] * nei.prob;
                if (newProb > maxProb[nei.node]) {
                    maxProb[nei.node] = newProb;
                    q.offer(nei.node);
                }
            }
        }

        return maxProb[end_node];
    }

    static class Pair {
        int node;
        double prob;

        Pair(int node, double prob) {
            this.node = node;
            this.prob = prob;
        }
    }
}
```

```cpp
class Solution {
public:
    double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start_node, int end_node) {
        vector<vector<pair<int, double>>> adj(n);

        for (int i = 0; i < edges.size(); i++) {
            int src = edges[i][0], dst = edges[i][1];
            adj[src].emplace_back(dst, succProb[i]);
            adj[dst].emplace_back(src, succProb[i]);
        }

        vector<double> maxProb(n, 0.0);
        maxProb[start_node] = 1.0;
        queue<int> q;
        q.push(start_node);

        while (!q.empty()) {
            int node = q.front();
            q.pop();

            for (auto& [nei, edgeProb] : adj[node]) {
                double newProb = maxProb[node] * edgeProb;
                if (newProb > maxProb[nei]) {
                    maxProb[nei] = newProb;
                    q.push(nei);
                }
            }
        }

        return maxProb[end_node];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @param {number[]} succProb
     * @param {number} start_node
     * @param {number} end_node
     * @return {number}
     */
    maxProbability(n, edges, succProb, start_node, end_node) {
        let adj = Array.from({ length: n }, () => []);
        for (let i = 0; i < edges.length; i++) {
            let [src, dst] = edges[i];
            adj[src].push([dst, succProb[i]]);
            adj[dst].push([src, succProb[i]]);
        }

        let maxProb = new Array(n).fill(0.0);
        maxProb[start_node] = 1.0;
        const q = new Queue([start_node]);

        while (!q.isEmpty()) {
            let node = q.pop();

            for (let [nei, edgeProb] of adj[node]) {
                let newProb = maxProb[node] * edgeProb;
                if (newProb > maxProb[nei]) {
                    maxProb[nei] = newProb;
                    q.push(nei);
                }
            }
        }

        return maxProb[end_node];
    }
}
```

```csharp
public class Solution {
    public double MaxProbability(int n, int[][] edges, double[] succProb, int start_node, int end_node) {
        List<Pair>[] adj = new List<Pair>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<Pair>();

        for (int i = 0; i < edges.Length; i++) {
            int src = edges[i][0], dst = edges[i][1];
            adj[src].Add(new Pair(dst, succProb[i]));
            adj[dst].Add(new Pair(src, succProb[i]));
        }

        double[] maxProb = new double[n];
        maxProb[start_node] = 1.0;
        Queue<int> q = new Queue<int>();
        q.Enqueue(start_node);

        while (q.Count > 0) {
            int node = q.Dequeue();

            foreach (Pair nei in adj[node]) {
                double newProb = maxProb[node] * nei.prob;
                if (newProb > maxProb[nei.node]) {
                    maxProb[nei.node] = newProb;
                    q.Enqueue(nei.node);
                }
            }
        }

        return maxProb[end_node];
    }

    public class Pair {
        public int node;
        public double prob;

        public Pair(int node, double prob) {
            this.node = node;
            this.prob = prob;
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V * E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number nodes and $E$ is the number of edges.
