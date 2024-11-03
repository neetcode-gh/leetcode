## 1. Depth First Search

::tabs-start

```python
class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        adj = defaultdict(list)
        for u, v, w in times:
            adj[u].append((v, w))
        
        dist = {node: float("inf") for node in range(1, n + 1)}

        def dfs(node, time):
            if time >= dist[node]:
                return
            
            dist[node] = time
            for nei, w in adj[node]:
                dfs(nei, time + w)
        
        dfs(k, 0)
        res = max(dist.values())
        return res if res < float('inf') else -1
```

```java
public class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        Map<Integer, List<int[]>> adj = new HashMap<>();
        for (int[] time : times) {
            adj.computeIfAbsent(time[0], 
            x -> new ArrayList<>()).add(new int[]{time[1], time[2]});
        }

        Map<Integer, Integer> dist = new HashMap<>();
        for (int i = 1; i <= n; i++) dist.put(i, Integer.MAX_VALUE);

        dfs(k, 0, adj, dist);
        int res = Collections.max(dist.values());
        return res == Integer.MAX_VALUE ? -1 : res;
    }

    private void dfs(int node, int time, 
                     Map<Integer, List<int[]>> adj, 
                     Map<Integer, Integer> dist) {
        if (time >= dist.get(node)) return;
        dist.put(node, time);
        if (!adj.containsKey(node)) return;
        for (int[] edge : adj.get(node)) {
            dfs(edge[0], time + edge[1], adj, dist);
        }
    }
}
```

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        unordered_map<int, vector<pair<int, int>>> adj;
        for (auto& time : times) {
            adj[time[0]].emplace_back(time[1], time[2]);
        }

        vector<int> dist(n + 1, INT_MAX);
        dfs(k, 0, adj, dist);
        
        int res = *max_element(dist.begin() + 1, dist.end());
        return res == INT_MAX ? -1 : res;
    }

private:
    void dfs(int node, int time, 
             unordered_map<int, vector<pair<int, int>>>& adj, 
             vector<int>& dist) {
        if (time >= dist[node]) return;
        dist[node] = time;
        for (auto& [nei, w] : adj[node]) {
            dfs(nei, time + w, adj, dist);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} times
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    networkDelayTime(times, n, k) {
        const adj = {};
        for (const [u, v, w] of times) {
            if (!adj[u]) adj[u] = [];
            adj[u].push([v, w]);
        }

        const dist = Array(n + 1).fill(Infinity);
        const dfs = (node, time) => {
            if (time >= dist[node]) return;
            dist[node] = time;
            if (!adj[node]) return;
            for (const [nei, w] of adj[node]) {
                dfs(nei, time + w);
            }
        }

        dfs(k, 0);
        const res = Math.max(...dist.slice(1));
        return res === Infinity ? -1 : res;
    }
}
```

```csharp
public class Solution {
    public int NetworkDelayTime(int[][] times, int n, int k) {
        var adj = new Dictionary<int, List<int[]>>();
        foreach (var time in times) {
            if (!adj.ContainsKey(time[0])) {
                adj[time[0]] = new List<int[]>();
            }
            adj[time[0]].Add(new int[] { time[1], time[2] });
        }

        var dist = new Dictionary<int, int>();
        for (int i = 1; i <= n; i++) dist[i] = int.MaxValue;

        Dfs(k, 0, adj, dist);
        int res = dist.Values.Max();
        return res == int.MaxValue ? -1 : res;
    }

    private void Dfs(int node, int time, 
                     Dictionary<int, List<int[]>> adj, 
                     Dictionary<int, int> dist) {
        if (time >= dist[node]) return;
        dist[node] = time;
        if (!adj.ContainsKey(node)) return;
        foreach (var edge in adj[node]) {
            Dfs(edge[0], time + edge[1], adj, dist);
        }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V * E)$
* Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 2. Floyd Warshall Algorithm

::tabs-start

```python
class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        inf = float('inf')
        dist = [[inf] * n for _ in range(n)]
        
        for u, v, w in times:
            dist[u-1][v-1] = w
        for i in range(n):
            dist[i][i] = 0
        
        for mid in range(n):
            for i in range(n):
                for j in range(n):
                    dist[i][j] = min(dist[i][j], dist[i][mid] + dist[mid][j])
        
        res = max(dist[k-1])
        return res if res < inf else -1
```

```java
public class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        int inf = Integer.MAX_VALUE / 2;
        int[][] dist = new int[n][n];
        
        for (int i = 0; i < n; i++) {
            Arrays.fill(dist[i], inf);
            dist[i][i] = 0;
        }
        
        for (int[] time : times) {
            int u = time[0] - 1, v = time[1] - 1, w = time[2];
            dist[u][v] = w;
        }
        
        for (int mid = 0; mid < n; mid++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    dist[i][j] = Math.min(dist[i][j], 
                                          dist[i][mid] + dist[mid][j]);
        
        int res = Arrays.stream(dist[k-1]).max().getAsInt();
        return res == inf ? -1 : res;
    }
}
```

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        int inf = INT_MAX / 2;
        vector<vector<int>> dist(n, vector<int>(n, inf));
        
        for (int i = 0; i < n; i++)
            dist[i][i] = 0;
        
        for (auto& time : times) {
            int u = time[0] - 1, v = time[1] - 1, w = time[2];
            dist[u][v] = w;
        }
        
        for (int mid = 0; mid < n; mid++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    dist[i][j] = min(dist[i][j], 
                                     dist[i][mid] + dist[mid][j]);
        
        int res = *max_element(dist[k-1].begin(), dist[k-1].end());
        return res == inf ? -1 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} times
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    networkDelayTime(times, n, k) {
        const inf = Infinity;
        const dist = Array.from({ length: n }, () => 
                     Array(n).fill(inf));
        
        for (let i = 0; i < n; i++) {
            dist[i][i] = 0;
        }
        
        for (const [u, v, w] of times) {
            dist[u - 1][v - 1] = w;
        }
        
        for (let mid = 0; mid < n; mid++)
            for (let i = 0; i < n; i++)
                for (let j = 0; j < n; j++)
                    dist[i][j] = Math.min(dist[i][j], 
                                 dist[i][mid] + dist[mid][j]);
        
        const res = Math.max(...dist[k - 1]);
        return res === inf ? -1 : res;
    }
}
```

```csharp
public class Solution {
    public int NetworkDelayTime(int[][] times, int n, int k) {
        int inf = int.MaxValue / 2;
        int[,] dist = new int[n, n];
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                dist[i, j] = i == j ? 0 : inf;
            }
        }
        
        foreach (var time in times) {
            int u = time[0] - 1, v = time[1] - 1, w = time[2];
            dist[u, v] = w;
        }
        
        for (int mid = 0; mid < n; mid++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    dist[i, j] = Math.Min(dist[i, j], 
                                          dist[i, mid] + dist[mid, j]);
        
        int res = Enumerable.Range(0, n).Select(i => dist[k-1, i]).Max();
        return res == inf ? -1 : res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V ^ 3)$
* Space complexity: $O(V ^ 2)$

> Where $V$ is the number of vertices.

---

## 3. Bellman Ford Algorithm

::tabs-start

```python
class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        dist = [float('inf')] * n
        dist[k - 1] = 0
        for _ in range(n - 1):
            for u, v, w in times:
                if dist[u - 1] + w < dist[v - 1]:
                    dist[v - 1] = dist[u - 1] + w
        max_dist = max(dist)
        return max_dist if max_dist < float('inf') else -1
```

```java
public class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[k - 1] = 0;

        for (int i = 0; i < n - 1; i++) {
            for (int[] time : times) {
                int u = time[0] - 1, v = time[1] - 1, w = time[2];
                if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }

        int maxDist = Arrays.stream(dist).max().getAsInt();
        return maxDist == Integer.MAX_VALUE ? -1 : maxDist;
    }
}
```

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<int> dist(n, INT_MAX);
        dist[k - 1] = 0;

        for (int i = 0; i < n - 1; ++i) {
            for (const auto& time : times) {
                int u = time[0] - 1, v = time[1] - 1, w = time[2];
                if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }

        int maxDist = *max_element(dist.begin(), dist.end());
        return maxDist == INT_MAX ? -1 : maxDist;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} times
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    networkDelayTime(times, n, k) {
        let dist = new Array(n).fill(Infinity);
        dist[k - 1] = 0;

        for (let i = 0; i < n - 1; i++) {
            for (const [u, v, w] of times) {
                if (dist[u - 1] + w < dist[v - 1]) {
                    dist[v - 1] = dist[u - 1] + w;
                }
            }
        }

        const maxDist = Math.max(...dist);
        return maxDist === Infinity ? -1 : maxDist;
    }
}
```

```csharp
public class Solution {
    public int NetworkDelayTime(int[][] times, int n, int k) {
        int[] dist = Enumerable.Repeat(int.MaxValue, n).ToArray();
        dist[k - 1] = 0;

        for (int i = 0; i < n - 1; i++) {
            foreach (var time in times) {
                int u = time[0] - 1, v = time[1] - 1, w = time[2];
                if (dist[u] != int.MaxValue && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }

        int maxDist = dist.Max();
        return maxDist == int.MaxValue ? -1 : maxDist;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V * E)$
* Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 4. Shortest Path Faster Algorithm

::tabs-start

```python
class Solution:
    def networkDelayTime(self, times, n, k):
        adj = defaultdict(list)
        for u, v, w in times:
            adj[u].append((v, w))
        
        dist = {node: float("inf") for node in range(1, n + 1)}
        q = deque([(k, 0)])
        dist[k] = 0

        while q:
            node, time = q.popleft()
            if dist[node] < time:
                continue
            for nei, w in adj[node]:
                if time + w < dist[nei]:
                    dist[nei] = time + w
                    q.append((nei, time + w))

        res = max(dist.values())
        return res if res < float('inf') else -1
```

```java
public class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        Map<Integer, List<int[]>> adj = new HashMap<>();
        for (int i = 1; i <= n; i++) adj.put(i, new ArrayList<>());
        for (int[] time : times) {
            adj.get(time[0]).add(new int[] {time[1], time[2]});
        }
        Map<Integer, Integer> dist = new HashMap<>();
        for (int i = 1; i <= n; i++) dist.put(i, Integer.MAX_VALUE);
        dist.put(k, 0);
        
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[] {k, 0});

        while (!q.isEmpty()) {
            int[] curr = q.poll();
            int node = curr[0], time = curr[1];
            if (dist.get(node) < time) {
                continue;
            }
            for (int[] nei : adj.get(node)) {
                int nextNode = nei[0], weight = nei[1];
                if (time + weight < dist.get(nextNode)) {
                    dist.put(nextNode, time + weight);
                    q.offer(new int[] {nextNode, time + weight});
                }
            }
        }

        int res = Collections.max(dist.values());
        return res == Integer.MAX_VALUE ? -1 : res;
    }
}
```

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        unordered_map<int, vector<pair<int, int>>> adj;
        for (const auto& time : times) {
            adj[time[0]].emplace_back(time[1], time[2]);
        }
        
        unordered_map<int, int> dist;
        for (int i = 1; i <= n; ++i) dist[i] = INT_MAX;
        dist[k] = 0;

        queue<pair<int, int>> q;
        q.emplace(k, 0);

        while (!q.empty()) {
            auto [node, time] = q.front();
            q.pop();
            if (dist[node] < time) continue;
            for (const auto& [nei, w] : adj[node]) {
                if (time + w < dist[nei]) {
                    dist[nei] = time + w;
                    q.emplace(nei, time + w);
                }
            }
        }

        int res = 0;
        for (const auto& [node, time] : dist) {
            res = max(res, time);
        }
        return res == INT_MAX ? -1 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} times
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    networkDelayTime(times, n, k) {
        const adj = {};
        for (let i = 1; i <= n; i++) adj[i] = [];
        for (const [u, v, w] of times) {
            adj[u].push([v, w]);
        }

        const dist = {};
        for (let i = 1; i <= n; i++) dist[i] = Infinity;
        dist[k] = 0;

        const q = new Queue([[k, 0]]);

        while (!q.isEmpty()) {
            const [node, time] = q.pop();
            if (dist[node] < time) continue;
            for (const [nei, w] of adj[node]) {
                if (time + w < dist[nei]) {
                    dist[nei] = time + w;
                    q.push([nei, time + w]);
                }
            }
        }

        let res = Math.max(...Object.values(dist));
        return res === Infinity ? -1 : res;
    }
}
```

```csharp
public class Solution {
    public int NetworkDelayTime(int[][] times, int n, int k) {
        var adj = new Dictionary<int, List<int[]>>();
        for (int i = 1; i <= n; i++) adj[i] = new List<int[]>();
        foreach (var time in times) {
            adj[time[0]].Add(new int[] {time[1], time[2]});
        }
        
        var dist = new Dictionary<int, int>();
        for (int i = 1; i <= n; i++) dist[i] = int.MaxValue;
        dist[k] = 0;

        var q = new Queue<int[]>();
        q.Enqueue(new int[] {k, 0});

        while (q.Count > 0) {
            var curr = q.Dequeue();
            int node = curr[0], time = curr[1];
            if (dist[node] < time) continue;
            foreach (var nei in adj[node]) {
                int nextNode = nei[0], weight = nei[1];
                if (time + weight < dist[nextNode]) {
                    dist[nextNode] = time + weight;
                    q.Enqueue(new int[] {nextNode, time + weight});
                }
            }
        }

        int res = 0;
        foreach (var time in dist.Values) { 
            res = Math.Max(res, time);
        }
        return res == int.MaxValue ? -1 : res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V + E)$ in average case, $O(V * E)$ in worst case.
* Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 5. Dijkstra's Algorithm

::tabs-start

```python
class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        edges = collections.defaultdict(list)
        for u, v, w in times:
            edges[u].append((v, w))

        minHeap = [(0, k)]
        visit = set()
        t = 0
        while minHeap:
            w1, n1 = heapq.heappop(minHeap)
            if n1 in visit:
                continue
            visit.add(n1)
            t = w1

            for n2, w2 in edges[n1]:
                if n2 not in visit:
                    heapq.heappush(minHeap, (w1 + w2, n2))
        return t if len(visit) == n else -1
```

```java
public class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        Map<Integer, List<int[]>> edges = new HashMap<>();
        for (int[] time : times) {
            edges.computeIfAbsent(time[0], 
            key -> new ArrayList<>()).add(new int[]{time[1], time[2]});
        }

        PriorityQueue<int[]> minHeap = new PriorityQueue<>(
                                       Comparator.comparingInt(a -> a[0]));
        minHeap.offer(new int[]{0, k});

        Set<Integer> visited = new HashSet<>();
        int t = 0;
        while (!minHeap.isEmpty()) {
            int[] curr = minHeap.poll();
            int w1 = curr[0], n1 = curr[1];
            if (visited.contains(n1)) {
                continue;
            }
            visited.add(n1);
            t = w1;

            if (edges.containsKey(n1)) {
                for (int[] next : edges.get(n1)) {
                    int n2 = next[0], w2 = next[1];
                    if (!visited.contains(n2)) {
                        minHeap.offer(new int[]{w1 + w2, n2});
                    }
                }
            }
        }

        return visited.size() == n ? t : -1;
    }
}
```

```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        unordered_map<int, vector<pair<int, int>>> edges;
        for (const auto& time : times) {
            edges[time[0]].emplace_back(time[1], time[2]);
        }

        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> minHeap;
        minHeap.push({0, k});

        set<int> visited;
        int t = 0;
        while (!minHeap.empty()) {
            auto curr = minHeap.top();
            minHeap.pop();
            int w1 = curr.first, n1 = curr.second;
            if (visited.count(n1)) {
                continue;
            }
            visited.insert(n1);
            t = w1;

            if (edges.count(n1)) {
                for (const auto& next : edges[n1]) {
                    int n2 = next.first, w2 = next.second;
                    if (!visited.count(n2)) {
                        minHeap.push({w1 + w2, n2});
                    }
                }
            }
        }

        return visited.size() == n ? t : -1;
    }
};
```

```javascript
/**
 * const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */

class Solution {
    /**
     * @param {number[][]} times
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    networkDelayTime(times, n, k) {
        const edges = new Map();
        for (let i = 1; i <= n; i++) {
            edges.set(i, []);
        }
        for (const [u, v, w] of times) {
            edges.get(u).push([v, w]);
        }

        const minHeap = new MinPriorityQueue(entry => entry[0]);
        minHeap.enqueue([0, k]);

        const visit = new Set();
        let t = 0;

        while (!minHeap.isEmpty()) {
            const [w1, n1] = minHeap.dequeue();
            if (visit.has(n1)) continue;
            visit.add(n1);
            t = w1;

            for (const [n2, w2] of edges.get(n1)) {
                if (!visit.has(n2)) {
                    minHeap.enqueue([w1 + w2, n2]);
                }
            }
        }

        return visit.size === n ? t : -1;
    }
}
```

```csharp
public class Solution {
    public int NetworkDelayTime(int[][] times, int n, int k) {
        var edges = new Dictionary<int, List<int[]>>();
        foreach (var time in times) {
            if (!edges.ContainsKey(time[0])) {
                edges[time[0]] = new List<int[]>();
            }
            edges[time[0]].Add(new int[] { time[1], time[2] });
        }

        var pq = new PriorityQueue<int, int>();
        pq.Enqueue(k, 0);

        var dist = new Dictionary<int, int>();
        for (int i = 1; i <= n; i++) {
            dist[i] = int.MaxValue;
        }
        dist[k] = 0;

        while (pq.Count > 0) {
            // Correctly using TryDequeue to get node and its distance
            if (pq.TryDequeue(out int node, out int minDist)) {
                if (minDist > dist[node]) {
                    continue;
                }

                if (edges.ContainsKey(node)) {
                    foreach (var edge in edges[node]) {
                        var next = edge[0];
                        var weight = edge[1];
                        var newDist = minDist + weight;
                        if (newDist < dist[next]) {
                            dist[next] = newDist;
                            pq.Enqueue(next, newDist);
                        }
                    }
                }
            }
        }

        int result = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == int.MaxValue) return -1;
            result = Math.Max(result, dist[i]);
        }

        return result;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(E \log V)$
* Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.