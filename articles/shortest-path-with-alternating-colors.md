## 1. Breadth First Search - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 2. Breadth First Search - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 3. Depth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.
