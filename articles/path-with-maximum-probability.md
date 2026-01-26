## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Graph Representation** - Building adjacency lists to represent weighted undirected graphs
- **Dijkstra's Algorithm** - Finding optimal paths using a priority queue (max-heap for this problem)
- **Priority Queue / Heap** - Efficiently extracting the maximum or minimum element
- **Bellman-Ford Algorithm** - Relaxing edges iteratively to find optimal paths

---

## 1. Dijkstra's Algorithm - I

### Intuition

This problem asks for the path with maximum probability, which is similar to finding the shortest path but with multiplication instead of addition. Since probabilities are between 0 and 1, multiplying them gives smaller values, so we want to maximize the product. Dijkstra's algorithm works here because we can negate probabilities (or use a max-heap) to always process the most promising path first. Once we reach the destination, we have found the optimal path.

### Algorithm

1. Build an adjacency list where each node maps to its neighbors and the corresponding edge probabilities.
2. Use a max-heap (priority queue) to always process the node with the highest probability first. Start with probability `1.0` at the source node.
3. Mark nodes as visited once processed to avoid redundant work.
4. For each node popped from the heap, if it is the destination, return the current probability.
5. Otherwise, for each unvisited neighbor, compute the new probability by multiplying the current probability with the edge probability, and push it to the heap.
6. If the destination is never reached, return `0`.

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

```go
import (
    "container/heap"
)

type Pair struct {
    node int
    prob float64
}

type MaxHeap []Pair

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i].prob > h[j].prob }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(Pair)) }
func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func maxProbability(n int, edges [][]int, succProb []float64, start_node int, end_node int) float64 {
    adj := make([][]Pair, n)
    for i := 0; i < n; i++ {
        adj[i] = []Pair{}
    }

    for i, edge := range edges {
        src, dst := edge[0], edge[1]
        adj[src] = append(adj[src], Pair{dst, succProb[i]})
        adj[dst] = append(adj[dst], Pair{src, succProb[i]})
    }

    maxProb := make([]float64, n)
    maxProb[start_node] = 1.0

    pq := &MaxHeap{Pair{start_node, 1.0}}
    heap.Init(pq)

    for pq.Len() > 0 {
        top := heap.Pop(pq).(Pair)
        node, currProb := top.node, top.prob

        if node == end_node {
            return currProb
        }
        if currProb < maxProb[node] {
            continue
        }

        for _, nei := range adj[node] {
            newProb := currProb * nei.prob
            if newProb > maxProb[nei.node] {
                maxProb[nei.node] = newProb
                heap.Push(pq, Pair{nei.node, newProb})
            }
        }
    }

    return 0.0
}
```

```kotlin
class Solution {
    fun maxProbability(n: Int, edges: Array<IntArray>, succProb: DoubleArray, start_node: Int, end_node: Int): Double {
        val adj = Array(n) { mutableListOf<Pair<Int, Double>>() }

        for (i in edges.indices) {
            val (src, dst) = edges[i]
            adj[src].add(Pair(dst, succProb[i]))
            adj[dst].add(Pair(src, succProb[i]))
        }

        val maxProb = DoubleArray(n)
        maxProb[start_node] = 1.0

        val pq = PriorityQueue<Pair<Int, Double>>(compareByDescending { it.second })
        pq.offer(Pair(start_node, 1.0))

        while (pq.isNotEmpty()) {
            val (node, currProb) = pq.poll()

            if (node == end_node) return currProb
            if (currProb < maxProb[node]) continue

            for ((nei, edgeProb) in adj[node]) {
                val newProb = currProb * edgeProb
                if (newProb > maxProb[nei]) {
                    maxProb[nei] = newProb
                    pq.offer(Pair(nei, newProb))
                }
            }
        }

        return 0.0
    }
}
```

```swift
class Solution {
    func maxProbability(_ n: Int, _ edges: [[Int]], _ succProb: [Double], _ start_node: Int, _ end_node: Int) -> Double {
        var adj = [[(Int, Double)]](repeating: [], count: n)

        for i in 0..<edges.count {
            let src = edges[i][0], dst = edges[i][1]
            adj[src].append((dst, succProb[i]))
            adj[dst].append((src, succProb[i]))
        }

        var maxProb = [Double](repeating: 0.0, count: n)
        maxProb[start_node] = 1.0

        var pq = [(Double, Int)]() // (prob, node)
        pq.append((1.0, start_node))

        while !pq.isEmpty {
            pq.sort { $0.0 > $1.0 }
            let (currProb, node) = pq.removeFirst()

            if node == end_node {
                return currProb
            }
            if currProb < maxProb[node] {
                continue
            }

            for (nei, edgeProb) in adj[node] {
                let newProb = currProb * edgeProb
                if newProb > maxProb[nei] {
                    maxProb[nei] = newProb
                    pq.append((newProb, nei))
                }
            }
        }

        return 0.0
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

### Intuition

This is a refined version of Dijkstra's algorithm that tracks the maximum probability to reach each node. Instead of just using a visited set, we maintain an array storing the best probability found so far for each node. This allows us to skip processing a node if we have already found a better path to it, reducing unnecessary work.

### Algorithm

1. Build an adjacency list mapping each node to its neighbors and edge probabilities.
2. Initialize a `maxProb` array where `maxProb[i]` stores the highest probability to reach node `i`. Set `maxProb[start] = 1.0`.
3. Use a max-heap starting with `(1.0, start_node)`.
4. For each node popped from the heap, if it is the destination, return the probability. If the current probability is worse than the recorded best, skip it.
5. For each neighbor, compute the new probability. If it improves the best known probability for that neighbor, update the array and push the neighbor to the heap.
6. Return `0` if the destination is unreachable.

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

```go
import (
    "container/heap"
)

type Pair struct {
    node int
    prob float64
}

type MaxHeap []Pair

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i].prob > h[j].prob }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(Pair)) }
func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func maxProbability(n int, edges [][]int, succProb []float64, start_node int, end_node int) float64 {
    adj := make([][]Pair, n)
    for i := 0; i < n; i++ {
        adj[i] = []Pair{}
    }

    for i, edge := range edges {
        src, dst := edge[0], edge[1]
        adj[src] = append(adj[src], Pair{dst, succProb[i]})
        adj[dst] = append(adj[dst], Pair{src, succProb[i]})
    }

    maxProb := make([]float64, n)
    maxProb[start_node] = 1.0

    pq := &MaxHeap{Pair{start_node, 1.0}}
    heap.Init(pq)

    for pq.Len() > 0 {
        top := heap.Pop(pq).(Pair)
        node, currProb := top.node, top.prob

        if node == end_node {
            return currProb
        }
        if currProb < maxProb[node] {
            continue
        }

        for _, nei := range adj[node] {
            newProb := currProb * nei.prob
            if newProb > maxProb[nei.node] {
                maxProb[nei.node] = newProb
                heap.Push(pq, Pair{nei.node, newProb})
            }
        }
    }

    return 0.0
}
```

```kotlin
class Solution {
    fun maxProbability(n: Int, edges: Array<IntArray>, succProb: DoubleArray, start_node: Int, end_node: Int): Double {
        val adj = Array(n) { mutableListOf<Pair<Int, Double>>() }

        for (i in edges.indices) {
            val (src, dst) = edges[i]
            adj[src].add(Pair(dst, succProb[i]))
            adj[dst].add(Pair(src, succProb[i]))
        }

        val maxProb = DoubleArray(n)
        maxProb[start_node] = 1.0

        val pq = PriorityQueue<Pair<Int, Double>>(compareByDescending { it.second })
        pq.offer(Pair(start_node, 1.0))

        while (pq.isNotEmpty()) {
            val (node, currProb) = pq.poll()

            if (node == end_node) return currProb
            if (currProb < maxProb[node]) continue

            for ((nei, edgeProb) in adj[node]) {
                val newProb = currProb * edgeProb
                if (newProb > maxProb[nei]) {
                    maxProb[nei] = newProb
                    pq.offer(Pair(nei, newProb))
                }
            }
        }

        return 0.0
    }
}
```

```swift
class Solution {
    func maxProbability(_ n: Int, _ edges: [[Int]], _ succProb: [Double], _ start_node: Int, _ end_node: Int) -> Double {
        var adj = [[(Int, Double)]](repeating: [], count: n)

        for i in 0..<edges.count {
            let src = edges[i][0], dst = edges[i][1]
            adj[src].append((dst, succProb[i]))
            adj[dst].append((src, succProb[i]))
        }

        var maxProb = [Double](repeating: 0.0, count: n)
        maxProb[start_node] = 1.0

        var pq = [(Double, Int)]()
        pq.append((1.0, start_node))

        while !pq.isEmpty {
            pq.sort { $0.0 > $1.0 }
            let (currProb, node) = pq.removeFirst()

            if node == end_node {
                return currProb
            }
            if currProb < maxProb[node] {
                continue
            }

            for (nei, edgeProb) in adj[node] {
                let newProb = currProb * edgeProb
                if newProb > maxProb[nei] {
                    maxProb[nei] = newProb
                    pq.append((newProb, nei))
                }
            }
        }

        return 0.0
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

### Intuition

The Bellman-Ford algorithm can find the best path by relaxing all edges repeatedly. For this problem, we relax edges to maximize probability instead of minimizing distance. Since the graph is undirected, we check both directions for each edge. The algorithm runs for at most `n` iterations, but we can stop early if no updates occur in a round, meaning we have found the optimal solution.

### Algorithm

1. Initialize a `maxProb` array with all zeros except `maxProb[start] = 1.0`.
2. For up to `n` iterations, iterate through all edges.
3. For each edge `(src, dst)` with probability `p`, try to relax in both directions: if `maxProb[src] * p > maxProb[dst]`, update `maxProb[dst]`, and vice versa.
4. Track whether any update occurred. If no updates happen in an iteration, break early.
5. Return `maxProb[end_node]`.

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

```go
func maxProbability(n int, edges [][]int, succProb []float64, start_node int, end_node int) float64 {
    maxProb := make([]float64, n)
    maxProb[start_node] = 1.0

    for i := 0; i < n; i++ {
        updated := false
        for j := 0; j < len(edges); j++ {
            src, dst := edges[j][0], edges[j][1]

            if maxProb[src] * succProb[j] > maxProb[dst] {
                maxProb[dst] = maxProb[src] * succProb[j]
                updated = true
            }

            if maxProb[dst] * succProb[j] > maxProb[src] {
                maxProb[src] = maxProb[dst] * succProb[j]
                updated = true
            }
        }
        if !updated {
            break
        }
    }

    return maxProb[end_node]
}
```

```kotlin
class Solution {
    fun maxProbability(n: Int, edges: Array<IntArray>, succProb: DoubleArray, start_node: Int, end_node: Int): Double {
        val maxProb = DoubleArray(n)
        maxProb[start_node] = 1.0

        for (i in 0 until n) {
            var updated = false
            for (j in edges.indices) {
                val (src, dst) = edges[j]

                if (maxProb[src] * succProb[j] > maxProb[dst]) {
                    maxProb[dst] = maxProb[src] * succProb[j]
                    updated = true
                }

                if (maxProb[dst] * succProb[j] > maxProb[src]) {
                    maxProb[src] = maxProb[dst] * succProb[j]
                    updated = true
                }
            }
            if (!updated) break
        }

        return maxProb[end_node]
    }
}
```

```swift
class Solution {
    func maxProbability(_ n: Int, _ edges: [[Int]], _ succProb: [Double], _ start_node: Int, _ end_node: Int) -> Double {
        var maxProb = [Double](repeating: 0.0, count: n)
        maxProb[start_node] = 1.0

        for _ in 0..<n {
            var updated = false
            for j in 0..<edges.count {
                let src = edges[j][0], dst = edges[j][1]

                if maxProb[src] * succProb[j] > maxProb[dst] {
                    maxProb[dst] = maxProb[src] * succProb[j]
                    updated = true
                }

                if maxProb[dst] * succProb[j] > maxProb[src] {
                    maxProb[src] = maxProb[dst] * succProb[j]
                    updated = true
                }
            }
            if !updated {
                break
            }
        }

        return maxProb[end_node]
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

### Intuition

SPFA is an optimization of Bellman-Ford that uses a queue to process only nodes whose distances (or probabilities) have changed. Instead of iterating through all edges in every round, we only process edges from nodes that might lead to improvements. This can be significantly faster in practice, especially for sparse graphs.

### Algorithm

1. Build an adjacency list and initialize `maxProb` array with `maxProb[start] = 1.0`.
2. Use a queue and add the start node. Maintain a boolean array to track which nodes are currently in the queue.
3. While the queue is not empty, dequeue a node and mark it as no longer in the queue.
4. For each neighbor, compute the new probability. If it improves the neighbor's best probability, update it.
5. If the neighbor is not already in the queue, add it and mark it as in the queue.
6. Return `maxProb[end_node]`.

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

```go
func maxProbability(n int, edges [][]int, succProb []float64, start_node int, end_node int) float64 {
    adj := make([][][2]float64, n)
    for i := 0; i < n; i++ {
        adj[i] = [][2]float64{}
    }

    for i, edge := range edges {
        src, dst := edge[0], edge[1]
        adj[src] = append(adj[src], [2]float64{float64(dst), succProb[i]})
        adj[dst] = append(adj[dst], [2]float64{float64(src), succProb[i]})
    }

    maxProb := make([]float64, n)
    maxProb[start_node] = 1.0

    queue := []int{start_node}

    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]

        for _, pair := range adj[node] {
            nei := int(pair[0])
            edgeProb := pair[1]
            newProb := maxProb[node] * edgeProb
            if newProb > maxProb[nei] {
                maxProb[nei] = newProb
                queue = append(queue, nei)
            }
        }
    }

    return maxProb[end_node]
}
```

```kotlin
class Solution {
    fun maxProbability(n: Int, edges: Array<IntArray>, succProb: DoubleArray, start_node: Int, end_node: Int): Double {
        val adj = Array(n) { mutableListOf<Pair<Int, Double>>() }

        for (i in edges.indices) {
            val (src, dst) = edges[i]
            adj[src].add(Pair(dst, succProb[i]))
            adj[dst].add(Pair(src, succProb[i]))
        }

        val maxProb = DoubleArray(n)
        maxProb[start_node] = 1.0

        val queue = ArrayDeque<Int>()
        queue.add(start_node)

        while (queue.isNotEmpty()) {
            val node = queue.removeFirst()

            for ((nei, edgeProb) in adj[node]) {
                val newProb = maxProb[node] * edgeProb
                if (newProb > maxProb[nei]) {
                    maxProb[nei] = newProb
                    queue.add(nei)
                }
            }
        }

        return maxProb[end_node]
    }
}
```

```swift
class Solution {
    func maxProbability(_ n: Int, _ edges: [[Int]], _ succProb: [Double], _ start_node: Int, _ end_node: Int) -> Double {
        var adj = [[(Int, Double)]](repeating: [], count: n)

        for i in 0..<edges.count {
            let src = edges[i][0], dst = edges[i][1]
            adj[src].append((dst, succProb[i]))
            adj[dst].append((src, succProb[i]))
        }

        var maxProb = [Double](repeating: 0.0, count: n)
        maxProb[start_node] = 1.0

        var queue = [start_node]

        while !queue.isEmpty {
            let node = queue.removeFirst()

            for (nei, edgeProb) in adj[node] {
                let newProb = maxProb[node] * edgeProb
                if newProb > maxProb[nei] {
                    maxProb[nei] = newProb
                    queue.append(nei)
                }
            }
        }

        return maxProb[end_node]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V * E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number nodes and $E$ is the number of edges.

---

## Common Pitfalls

### Using Min-Heap Instead of Max-Heap

Unlike shortest path problems where we minimize distance, this problem requires maximizing probability. Using a min-heap (the default in most languages) will process low-probability paths first, leading to incorrect results or inefficiency. Always use a max-heap or negate the probabilities when using a min-heap.

### Initializing Start Probability to Zero

The starting node should have a probability of `1.0` (certainty), not `0.0`. Multiplying any edge probability by zero will always yield zero, preventing the algorithm from finding any valid path. Initialize `maxProb[start_node] = 1.0` before beginning the search.

### Forgetting the Graph is Undirected

Each edge connects two nodes bidirectionally, so you must add both directions to the adjacency list. Forgetting to add the reverse edge means some paths will be unreachable, potentially missing the optimal solution or returning zero when a valid path exists.
