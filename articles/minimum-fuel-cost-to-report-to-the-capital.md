## 1. Depth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Topological Sort (Kahn's Algorithm)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
