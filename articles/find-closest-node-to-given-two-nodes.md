## 1. Breadth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Breadth First Search (Optimal)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Depth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Iterative Depth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
