## 1. Dijkstra's Algorithm

::tabs-start

```python
class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        INF = float("inf")
        adj = [[] for _ in range(n)]
        dist = [[INF] * (k + 5) for _ in range(n)]
        for u, v, cst in flights:
            adj[u].append([v, cst])
        
        dist[src][0] = 0
        minHeap = [(0, src, -1)] # cost, node, stops
        while len(minHeap):
            cst, node, stops = heapq.heappop(minHeap)
            if dst == node: return cst
            if stops == k or dist[node][stops + 1] < cst:
                continue
            for nei, w in adj[node]:
                nextCst = cst + w
                nextStops = 1 + stops
                if dist[nei][nextStops + 1] > nextCst:
                    dist[nei][nextStops + 1] = nextCst
                    heapq.heappush(minHeap, (nextCst, nei, nextStops))

        return -1
```

```java
public class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int INF = Integer.MAX_VALUE;
        List<int[]>[] adj = new ArrayList[n];
        int[][] dist = new int[n][k + 5];
        for (int i = 0; i < n; i++) Arrays.fill(dist[i], INF);
        
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] flight : flights) {
            adj[flight[0]].add(new int[]{flight[1], flight[2]});
        }
        
        dist[src][0] = 0;
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(
            Comparator.comparingInt(a -> a[0])
        );
        minHeap.offer(new int[]{0, src, -1});

        while (!minHeap.isEmpty()) {
            int[] top = minHeap.poll();
            int cst = top[0], node = top[1], stops = top[2];
            if (node == dst) return cst;
            if (stops == k || dist[node][stops + 1] < cst) continue;
            for (int[] neighbor : adj[node]) {
                int nei = neighbor[0], w = neighbor[1];
                int nextCst = cst + w;
                int nextStops = stops + 1;
                if (dist[nei][nextStops + 1] > nextCst) {
                    dist[nei][nextStops + 1] = nextCst;
                    minHeap.offer(new int[]{nextCst, nei, nextStops});
                }
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        int INF = 1e9;
        vector<vector<pair<int, int>>> adj(n);
        vector<vector<int>> dist(n, vector<int>(k + 5, INF));
        
        for (auto& flight : flights) {
            adj[flight[0]].emplace_back(flight[1], flight[2]);
        }
        
        dist[src][0] = 0;
        priority_queue<tuple<int, int, int>, 
                       vector<tuple<int, int, int>>, greater<>> minHeap;
        minHeap.emplace(0, src, -1);
        
        while (!minHeap.empty()) {
            auto [cst, node, stops] = minHeap.top();
            minHeap.pop();
            if (node == dst) return cst;
            if (stops == k || dist[node][stops + 1] < cst) continue;
            for (auto& [nei, w] : adj[node]) {
                int nextCst = cst + w;
                int nextStops = stops + 1;
                if (dist[nei][nextStops + 1] > nextCst) {
                    dist[nei][nextStops + 1] = nextCst;
                    minHeap.emplace(nextCst, nei, nextStops);
                }
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} flights
     * @param {number} src
     * @param {number} dst
     * @param {number} k
     * @return {number}
     */
    findCheapestPrice(n, flights, src, dst, k) {
        const INF = Infinity;
        const adj = Array.from({ length: n }, () => []);
        const dist = Array.from({ length: n }, () => 
                     Array(k + 5).fill(INF));
        
        for (let [u, v, cst] of flights) {
            adj[u].push([v, cst]);
        }
        
        dist[src][0] = 0;
        const minHeap = new MinPriorityQueue(entry => entry[0]); 
        minHeap.push([0, src, -1]); // cost, node, stops
        while (!minHeap.isEmpty()) {
            const [cst, node, stops] = minHeap.pop();
            if (node === dst) return cst;
            if (stops === k || dist[node][stops + 1] < cst) continue;
            for (let [nei, w] of adj[node]) {
                const nextCst = cst + w;
                const nextStops = stops + 1;
                if (dist[nei][nextStops + 1] > nextCst) {
                    dist[nei][nextStops + 1] = nextCst;
                    minHeap.push([nextCst, nei, nextStops]);
                }
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int INF = int.MaxValue;
        List<int[]>[] adj = new List<int[]>[n];
        int[][] dist = new int[n][];
        
        for (int i = 0; i < n; i++) {
            adj[i] = new List<int[]>();
            dist[i] = new int[k + 2];
            Array.Fill(dist[i], INF);
        }
        
        foreach (var flight in flights) {
            adj[flight[0]].Add(new int[] { flight[1], flight[2] });
        }
        
        dist[src][0] = 0;
        var minHeap = new PriorityQueue<(int cst, int node, int stops), int>();
        minHeap.Enqueue((0, src, 0), 0);
        
        while (minHeap.Count > 0) {
            var (cst, node, stops) = minHeap.Dequeue();
            if (node == dst) return cst;
            if (stops > k) continue;
            
            foreach (var neighbor in adj[node]) {
                int nei = neighbor[0], w = neighbor[1];
                int nextCst = cst + w;
                int nextStops = stops + 1;
                
                if (dist[nei][nextStops] > nextCst) {
                    dist[nei][nextStops] = nextCst;
                    minHeap.Enqueue((nextCst, nei, nextStops), nextCst);
                }
            }
        }
        return -1;
    }
}
```

```go
func findCheapestPrice(n int, flights [][]int, src int, dst int, k int) int {
    INF := 1000000000
    adj := make([][]struct{ to, cost int }, n)
    dist := make([][]int, n)
    for i := range dist {
        dist[i] = make([]int, k+5)
        for j := range dist[i] {
            dist[i][j] = INF
        }
    }
    for _, flight := range flights {
        from, to, cost := flight[0], flight[1], flight[2]
        adj[from] = append(adj[from], struct{ to, cost int }{to, cost})
    }
    dist[src][0] = 0
    minHeap := priorityqueue.NewWith(func(a, b interface{}) int {
        return utils.IntComparator(a.([3]int)[0], b.([3]int)[0])
    })
    minHeap.Enqueue([3]int{0, src, -1})
    for !minHeap.Empty() {
        value, _ := minHeap.Dequeue()
        cst, node, stops := value.([3]int)[0], value.([3]int)[1], value.([3]int)[2]
        if node == dst {
            return cst
        }
        if stops == k || dist[node][stops+1] < cst {
            continue
        }
        for _, nei := range adj[node] {
            nextCst := cst + nei.cost
            nextStops := stops + 1
            if dist[nei.to][nextStops+1] > nextCst {
                dist[nei.to][nextStops+1] = nextCst
                minHeap.Enqueue([3]int{nextCst, nei.to, nextStops})
            }
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun findCheapestPrice(n: Int, flights: Array<IntArray>, src: Int, dst: Int, k: Int): Int {
        val INF = 1_000_000_000
        val adj = Array(n) { mutableListOf<Pair<Int, Int>>() }
        val dist = Array(n) { IntArray(k + 5) { INF } }
        for (flight in flights) {
            adj[flight[0]].add(Pair(flight[1], flight[2]))
        }
        dist[src][0] = 0
        val minHeap = PriorityQueue(compareBy<Triple<Int, Int, Int>> { it.first })
        minHeap.add(Triple(0, src, -1))
        while (minHeap.isNotEmpty()) {
            val (cst, node, stops) = minHeap.poll()
            if (node == dst) return cst
            if (stops == k || dist[node][stops + 1] < cst) continue
            for ((nei, w) in adj[node]) {
                val nextCst = cst + w
                val nextStops = stops + 1
                if (dist[nei][nextStops + 1] > nextCst) {
                    dist[nei][nextStops + 1] = nextCst
                    minHeap.add(Triple(nextCst, nei, nextStops))
                }
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O((n + m) * k)$
* Space complexity: $O(n * k)$

> Where $n$ is the number of flights, $m$ is the number of edges and $k$ is the number of stops.

---

## 2. Bellman Ford Algorithm

::tabs-start

```python
class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        prices = [float("inf")] * n
        prices[src] = 0

        for i in range(k + 1):
            tmpPrices = prices.copy()

            for s, d, p in flights:  # s=source, d=dest, p=price
                if prices[s] == float("inf"):
                    continue
                if prices[s] + p < tmpPrices[d]:
                    tmpPrices[d] = prices[s] + p
            prices = tmpPrices
        return -1 if prices[dst] == float("inf") else prices[dst]
```

```java
public class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int[] prices = new int[n];
        Arrays.fill(prices, Integer.MAX_VALUE);
        prices[src] = 0;

        for (int i = 0; i <= k; i++) {
            int[] tmpPrices = Arrays.copyOf(prices, n);

            for (int[] flight : flights) {
                int s = flight[0];
                int d = flight[1];
                int p = flight[2];

                if (prices[s] == Integer.MAX_VALUE) {
                    continue;
                }

                if (prices[s] + p < tmpPrices[d]) {
                    tmpPrices[d] = prices[s] + p;
                }
            }

            prices = tmpPrices;
        }

        return prices[dst] == Integer.MAX_VALUE ? -1 : prices[dst];
    }
}
```

```cpp
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> prices(n, INT_MAX);
        prices[src] = 0;

        for (int i = 0; i <= k; i++) {
            vector<int> tmpPrices = prices;

            for (const auto& flight : flights) {
                int s = flight[0];
                int d = flight[1];
                int p = flight[2];

                if (prices[s] == INT_MAX)
                    continue;

                if (prices[s] + p < tmpPrices[d])
                    tmpPrices[d] = prices[s] + p;
            }

            prices = tmpPrices;
        }

        return prices[dst] == INT_MAX ? -1 : prices[dst];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} flights
     * @param {number} src
     * @param {number} dst
     * @param {number} k
     * @return {number}
     */
    findCheapestPrice(n, flights, src, dst, k) {
        let prices = new Array(n).fill(Number.MAX_SAFE_INTEGER);
        prices[src] = 0;

        for (let i = 0; i <= k; i++) {
            const tmpPrices = [...prices];

            for (const flight of flights) {
                const s = flight[0];
                const d = flight[1];
                const p = flight[2];

                if (prices[s] === Number.MAX_SAFE_INTEGER) continue;

                if (prices[s] + p < tmpPrices[d]) tmpPrices[d] = prices[s] + p;
            }

            prices = tmpPrices;
        }

        return prices[dst] === Number.MAX_SAFE_INTEGER ? -1 : prices[dst];
    }
}
```

```csharp
public class Solution {
    public int FindCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int[] prices = new int[n];
        Array.Fill(prices, int.MaxValue);
        prices[src] = 0;

        for (int i = 0; i <= k; i++) {
            int[] tmpPrices = (int[])prices.Clone();

            foreach (var flight in flights) {
                int s = flight[0];
                int d = flight[1];
                int p = flight[2];

                if (prices[s] == int.MaxValue)
                    continue;

                if (prices[s] + p < tmpPrices[d])
                    tmpPrices[d] = prices[s] + p;
            }

            prices = tmpPrices;
        }

        return prices[dst] == int.MaxValue ? -1 : prices[dst];
    }
}
```

```go
func findCheapestPrice(n int, flights [][]int, src int, dst int, k int) int {
    prices := make([]int, n)
    for i := range prices {
        prices[i] = math.MaxInt32
    }
    prices[src] = 0

    for i := 0; i <= k; i++ {
        tmpPrices := make([]int, n)
        copy(tmpPrices, prices)
        
        for _, flight := range flights {
            s, d, p := flight[0], flight[1], flight[2]
            if prices[s] == math.MaxInt32 {
                continue
            }
            if prices[s] + p < tmpPrices[d] {
                tmpPrices[d] = prices[s] + p
            }
        }
        prices = tmpPrices
    }
    
    if prices[dst] == math.MaxInt32 {
        return -1
    }
    return prices[dst]
}
```

```kotlin
class Solution {
    fun findCheapestPrice(n: Int, flights: Array<IntArray>, src: Int, dst: Int, k: Int): Int {
        val prices = IntArray(n) { Int.MAX_VALUE }
        prices[src] = 0

        repeat(k + 1) {
            val tmpPrices = prices.copyOf()
            for ((s, d, p) in flights) {
                if (prices[s] == Int.MAX_VALUE) continue
                if (prices[s] + p < tmpPrices[d]) {
                    tmpPrices[d] = prices[s] + p
                }
            }
            tmpPrices.copyInto(prices)
        }

        return if (prices[dst] == Int.MAX_VALUE) -1 else prices[dst]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n + (m * k))$
* Space complexity: $O(n)$

> Where $n$ is the number of flights, $m$ is the number of edges and $k$ is the number of stops.

---

## 3. Shortest Path Faster Algorithm

::tabs-start

```python
class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        prices = [float("inf")] * n
        prices[src] = 0
        adj = [[] for _ in range(n)]
        for u, v, cst in flights:
            adj[u].append([v, cst])

        q = deque([(0, src, 0)])
        while q:
            cst, node, stops = q.popleft()
            if stops > k:
                continue
            
            for nei, w in adj[node]:
                nextCost = cst + w
                if nextCost < prices[nei]:
                    prices[nei] = nextCost
                    q.append((nextCost, nei, stops + 1))

        return prices[dst] if prices[dst] != float("inf") else -1
```

```java
public class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int[] prices = new int[n];
        Arrays.fill(prices, Integer.MAX_VALUE);
        prices[src] = 0;
        List<int[]>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (var flight : flights) {
            adj[flight[0]].add(new int[] { flight[1], flight[2] });
        }

        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[] { 0, src, 0 });

        while (!q.isEmpty()) {
            var curr = q.poll();
            int cst = curr[0], node = curr[1], stops = curr[2];
            if (stops > k) continue;

            for (var neighbor : adj[node]) {
                int nei = neighbor[0], w = neighbor[1];
                int nextCost = cst + w;
                if (nextCost < prices[nei]) {
                    prices[nei] = nextCost;
                    q.offer(new int[] { nextCost, nei, stops + 1 });
                }
            }
        }
        return prices[dst] == Integer.MAX_VALUE ? -1 : prices[dst];
    }
}
```

```cpp
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> prices(n, INT_MAX);
        prices[src] = 0;
        vector<vector<pair<int, int>>> adj(n);
        for (const auto& flight : flights) {
            adj[flight[0]].emplace_back(flight[1], flight[2]);
        }

        queue<tuple<int, int, int>> q;
        q.push({0, src, 0});

        while (!q.empty()) {
            auto [cst, node, stops] = q.front();
            q.pop();
            if (stops > k) continue;

            for (const auto& neighbor : adj[node]) {
                int nei = neighbor.first, w = neighbor.second;
                int nextCost = cst + w;
                if (nextCost < prices[nei]) {
                    prices[nei] = nextCost;
                    q.push({nextCost, nei, stops + 1});
                }
            }
        }
        return prices[dst] == INT_MAX ? -1 : prices[dst];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} flights
     * @param {number} src
     * @param {number} dst
     * @param {number} k
     * @return {number}
     */
    findCheapestPrice(n, flights, src, dst, k) {
        const prices = Array(n).fill(Infinity);
        prices[src] = 0;
        const adj = Array.from({ length: n }, () => []);
        
        for (const [u, v, cst] of flights) {
            adj[u].push([v, cst]);
        }

        const q = new Queue([[0, src, 0]]); // [cost, node, stops]

        while (!q.isEmpty()) {
            const [cst, node, stops] = q.pop();
            if (stops > k) continue;

            for (const [nei, w] of adj[node]) {
                const nextCost = cst + w;
                if (nextCost < prices[nei]) {
                    prices[nei] = nextCost;
                    q.push([nextCost, nei, stops + 1]);
                }
            }
        }
        return prices[dst] === Infinity ? -1 : prices[dst];
    }
}
```

```csharp
public class Solution {
    public int FindCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int[] prices = new int[n];
        Array.Fill(prices, int.MaxValue);
        prices[src] = 0;
        List<int[]>[] adj = new List<int[]>[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new List<int[]>();
        }
        foreach (var flight in flights) {
            adj[flight[0]].Add(new int[] { flight[1], flight[2] });
        }

        var q = new Queue<(int cst, int node, int stops)>();
        q.Enqueue((0, src, 0));

        while (q.Count > 0) {
            var (cst, node, stops) = q.Dequeue();
            if (stops > k) continue;

            foreach (var neighbor in adj[node]) {
                int nei = neighbor[0], w = neighbor[1];
                int nextCost = cst + w;
                if (nextCost < prices[nei]) {
                    prices[nei] = nextCost;
                    q.Enqueue((nextCost, nei, stops + 1));
                }
            }
        }
        return prices[dst] == int.MaxValue ? -1 : prices[dst];
    }
}
```

```go
func findCheapestPrice(n int, flights [][]int, src int, dst int, k int) int {
    prices := make([]int, n)
    for i := range prices {
        prices[i] = math.MaxInt32
    }
    prices[src] = 0

    adj := make([][][2]int, n)
    for _, flight := range flights {
        from, to, cost := flight[0], flight[1], flight[2]
        adj[from] = append(adj[from], [2]int{to, cost})
    }

    q := [][3]int{{0, src, 0}}

    for len(q) > 0 {
        curr := q[0]
        q = q[1:]
        cst, node, stops := curr[0], curr[1], curr[2]

        if stops > k {
            continue
        }

        for _, neighbor := range adj[node] {
            nei, w := neighbor[0], neighbor[1]
            nextCost := cst + w
            if nextCost < prices[nei] {
                prices[nei] = nextCost
                q = append(q, [3]int{nextCost, nei, stops + 1})
            }
        }
    }

    if prices[dst] == math.MaxInt32 {
        return -1
    }
    return prices[dst]
}
```

```kotlin
class Solution {
    fun findCheapestPrice(n: Int, flights: Array<IntArray>, src: Int, dst: Int, k: Int): Int {
        val prices = IntArray(n) { Int.MAX_VALUE }
        prices[src] = 0

        val adj = Array(n) { mutableListOf<Pair<Int, Int>>() }
        for (flight in flights) {
            val (from, to, cost) = flight
            adj[from].add(Pair(to, cost))
        }

        val q: Queue<Triple<Int, Int, Int>> = LinkedList()
        q.offer(Triple(0, src, 0))

        while (q.isNotEmpty()) {
            val (cst, node, stops) = q.poll()
            if (stops > k) continue

            for ((nei, w) in adj[node]) {
                val nextCost = cst + w
                if (nextCost < prices[nei]) {
                    prices[nei] = nextCost
                    q.offer(Triple(nextCost, nei, stops + 1))
                }
            }
        }

        return if (prices[dst] == Int.MAX_VALUE) -1 else prices[dst]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * k)$
* Space complexity: $O(n + m)$

> Where $n$ is the number of flights, $m$ is the number of edges and $k$ is the number of stops.