## 1. Brute Force (DFS)

### Intuition

The problem asks for the maximum count of any single color along any valid path in the graph. A direct approach is to try every possible starting node and every possible color, then use DFS to explore all paths and count how many nodes of that color we encounter. If we detect a cycle during DFS, the answer is -1 since valid paths cannot contain cycles.

### Algorithm

1. Build an adjacency list from the edges.
2. For each node from 0 to n-1, and for each color from 0 to 25:
   - Run DFS from that node, tracking visited nodes in the current path to detect cycles.
   - Count nodes matching the target color along the path.
   - If a cycle is detected, return -1 immediately.
   - Track the maximum color count found.
3. Return the maximum count.

::tabs-start

```python
class Solution:
    def largestPathValue(self, colors: str, edges: list[list[int]]) -> int:
        n = len(colors)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)

        visit = [False] * n
        def dfs(node, c):
            if visit[node]:
                return float("inf")

            visit[node] = True
            clrCnt = 0
            for nei in adj[node]:
                cur = dfs(nei, c)
                if cur == float("inf"):
                    return cur
                clrCnt = max(clrCnt, cur)
            visit[node] = False
            return clrCnt + (c == (ord(colors[node]) - ord('a')))

        res = -1
        for i in range(n):
            for c in range(26):
                cnt = dfs(i, c)
                if cnt == float("inf"):
                    return -1
                res = max(res, cnt)
        return res
```

```java
public class Solution {
    private int n;
    private List<Integer>[] adj;
    private boolean[] visit;

    public int largestPathValue(String colors, int[][] edges) {
        this.n = colors.length();
        this.adj = new ArrayList[n];
        this.visit = new boolean[n];

        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
        }

        int res = -1;
        for (int i = 0; i < n; i++) {
            for (int c = 0; c < 26; c++) {
                int cnt = dfs(i, c, colors);
                if (cnt == Integer.MAX_VALUE) return -1;
                res = Math.max(res, cnt);
            }
        }
        return res;
    }

    private int dfs(int node, int c, String colors) {
        if (visit[node]) return Integer.MAX_VALUE;

        visit[node] = true;
        int clrCnt = 0;
        for (int nei : adj[node]) {
            int cur = dfs(nei, c, colors);
            if (cur == Integer.MAX_VALUE) return cur;
            clrCnt = Math.max(clrCnt, cur);
        }
        visit[node] = false;
        return clrCnt + ((colors.charAt(node) - 'a') == c ? 1 : 0);
    }
}
```

```cpp
class Solution {
public:
    int n;
    vector<vector<int>> adj;
    vector<bool> visit;

    int largestPathValue(string colors, vector<vector<int>>& edges) {
        n = colors.size();
        adj.assign(n, vector<int>());
        visit.assign(n, false);

        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
        }

        int res = -1;
        for (int i = 0; i < n; i++) {
            for (int c = 0; c < 26; c++) {
                int cnt = dfs(i, c, colors);
                if (cnt == 1e9) return -1;
                res = max(res, cnt);
            }
        }
        return res;
    }

private:
    int dfs(int node, int c, string& colors) {
        if (visit[node]) return 1e9;

        visit[node] = true;
        int clrCnt = 0;
        for (int nei : adj[node]) {
            int cur = dfs(nei, c, colors);
            if (cur == 1e9) return cur;
            clrCnt = max(clrCnt, cur);
        }
        visit[node] = false;
        return clrCnt + ((colors[node] - 'a') == c ? 1 : 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} colors
     * @param {number[][]} edges
     * @return {number}
     */
    largestPathValue(colors, edges) {
        const n = colors.length;
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
        }

        const visit = new Array(n).fill(false);
        const dfs = (node, c) => {
            if (visit[node]) return Infinity;

            visit[node] = true;
            let clrCnt = 0;
            for (const nei of adj[node]) {
                const cur = dfs(nei, c);
                if (cur === Infinity) return cur;
                clrCnt = Math.max(clrCnt, cur);
            }
            visit[node] = false;
            return clrCnt + (c === colors.charCodeAt(node) - 97 ? 1 : 0);
        };

        let res = -1;
        for (let i = 0; i < n; i++) {
            for (let c = 0; c < 26; c++) {
                const cnt = dfs(i, c);
                if (cnt === Infinity) return -1;
                res = Math.max(res, cnt);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private int n;
    private List<int>[] adj;
    private bool[] visit;

    public int LargestPathValue(string colors, int[][] edges) {
        n = colors.Length;
        adj = new List<int>[n];
        visit = new bool[n];

        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
        }
        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
        }

        int res = -1;
        for (int i = 0; i < n; i++) {
            for (int c = 0; c < 26; c++) {
                int cnt = Dfs(i, c, colors);
                if (cnt == int.MaxValue) return -1;
                res = Math.Max(res, cnt);
            }
        }
        return res;
    }

    private int Dfs(int node, int c, string colors) {
        if (visit[node]) return int.MaxValue;

        visit[node] = true;
        int clrCnt = 0;
        foreach (int nei in adj[node]) {
            int cur = Dfs(nei, c, colors);
            if (cur == int.MaxValue) return cur;
            clrCnt = Math.Max(clrCnt, cur);
        }
        visit[node] = false;
        return clrCnt + ((colors[node] - 'a') == c ? 1 : 0);
    }
}
```

```go
func largestPathValue(colors string, edges [][]int) int {
    n := len(colors)
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }
    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
    }

    visit := make([]bool, n)
    var dfs func(node, c int) int
    dfs = func(node, c int) int {
        if visit[node] {
            return math.MaxInt32
        }

        visit[node] = true
        clrCnt := 0
        for _, nei := range adj[node] {
            cur := dfs(nei, c)
            if cur == math.MaxInt32 {
                return cur
            }
            clrCnt = max(clrCnt, cur)
        }
        visit[node] = false
        add := 0
        if int(colors[node]-'a') == c {
            add = 1
        }
        return clrCnt + add
    }

    res := -1
    for i := 0; i < n; i++ {
        for c := 0; c < 26; c++ {
            cnt := dfs(i, c)
            if cnt == math.MaxInt32 {
                return -1
            }
            res = max(res, cnt)
        }
    }
    return res
}
```

```kotlin
class Solution {
    private lateinit var adj: Array<MutableList<Int>>
    private lateinit var visit: BooleanArray

    fun largestPathValue(colors: String, edges: Array<IntArray>): Int {
        val n = colors.length
        adj = Array(n) { mutableListOf<Int>() }
        visit = BooleanArray(n)

        for (edge in edges) {
            adj[edge[0]].add(edge[1])
        }

        var res = -1
        for (i in 0 until n) {
            for (c in 0 until 26) {
                val cnt = dfs(i, c, colors)
                if (cnt == Int.MAX_VALUE) return -1
                res = maxOf(res, cnt)
            }
        }
        return res
    }

    private fun dfs(node: Int, c: Int, colors: String): Int {
        if (visit[node]) return Int.MAX_VALUE

        visit[node] = true
        var clrCnt = 0
        for (nei in adj[node]) {
            val cur = dfs(nei, c, colors)
            if (cur == Int.MAX_VALUE) return cur
            clrCnt = maxOf(clrCnt, cur)
        }
        visit[node] = false
        return clrCnt + if ((colors[node] - 'a') == c) 1 else 0
    }
}
```

```swift
class Solution {
    private var adj = [[Int]]()
    private var visit = [Bool]()

    func largestPathValue(_ colors: String, _ edges: [[Int]]) -> Int {
        let n = colors.count
        let colorsArr = Array(colors)
        adj = Array(repeating: [Int](), count: n)
        visit = Array(repeating: false, count: n)

        for edge in edges {
            adj[edge[0]].append(edge[1])
        }

        func dfs(_ node: Int, _ c: Int) -> Int {
            if visit[node] { return Int.max }

            visit[node] = true
            var clrCnt = 0
            for nei in adj[node] {
                let cur = dfs(nei, c)
                if cur == Int.max { return cur }
                clrCnt = max(clrCnt, cur)
            }
            visit[node] = false
            let colorIndex = Int(colorsArr[node].asciiValue! - Character("a").asciiValue!)
            return clrCnt + (colorIndex == c ? 1 : 0)
        }

        var res = -1
        for i in 0..<n {
            for c in 0..<26 {
                let cnt = dfs(i, c)
                if cnt == Int.max { return -1 }
                res = max(res, cnt)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V * (V + E))$
- Space complexity: $O(V + E)$

> Where $V$ is the number of verticies and $E$ is the number of edges.

---

## 2. Depth First Search

### Intuition

Instead of checking one color at a time, we can track all 26 color counts simultaneously for each node. Using memoization, once we compute the maximum color counts reachable from a node, we store and reuse that result. We use two sets: one for globally visited nodes (already fully processed) and one for the current DFS path (to detect cycles).

### Algorithm

1. Build an adjacency list from the edges.
2. Create a 2D array `count[node][color]` to store the maximum count of each color reachable from each node.
3. For each node, run DFS:
   - If the node is in the current path, a cycle exists; return infinity.
   - If already fully visited, return 0.
   - Mark the node as in the current path and initialize its own color count to 1.
   - For each neighbor, recursively compute counts and update the current node's counts by taking the maximum.
   - Remove the node from the current path after processing.
4. Return the maximum value across all `count[node][color]`, or -1 if a cycle was detected.

::tabs-start

```python
class Solution:
    def largestPathValue(self, colors: str, edges: list[list[int]]) -> int:
        adj = defaultdict(list)
        for src, dst in edges:
            adj[src].append(dst)

        def dfs(node):
            if node in path:
                return float("inf")
            if node in visit:
                return 0

            visit.add(node)
            path.add(node)
            colorIndex = ord(colors[node]) - ord('a')
            count[node][colorIndex] = 1

            for nei in adj[node]:
                if dfs(nei) == float("inf"):
                    return float("inf")
                for c in range(26):
                    count[node][c] = max(
                        count[node][c],
                        (1 if c == colorIndex else 0) + count[nei][c]
                    )

            path.remove(node)
            return 0

        n, res = len(colors), 0
        visit, path = set(), set()
        count = [[0] * 26 for _ in range(n)]

        for i in range(n):
            if dfs(i) == float("inf"):
                return -1
            res = max(res, max(count[i]))

        return res
```

```java
public class Solution {
    private int n;
    private List<Integer>[] adj;
    private boolean[] visit, path;
    private int[][] count;

    public int largestPathValue(String colors, int[][] edges) {
        this.n = colors.length();
        this.adj = new ArrayList[n];
        this.visit = new boolean[n];
        this.path = new boolean[n];
        this.count = new int[n][26];

        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            if (dfs(i, colors) == Integer.MAX_VALUE) return -1;
            for (int c = 0; c < 26; c++) {
                res = Math.max(res, count[i][c]);
            }
        }
        return res;
    }

    private int dfs(int node, String colors) {
        if (path[node]) return Integer.MAX_VALUE;
        if (visit[node]) return 0;

        visit[node] = true;
        path[node] = true;
        int colorIndex = colors.charAt(node) - 'a';
        count[node][colorIndex] = 1;

        for (int nei : adj[node]) {
            if (dfs(nei, colors) == Integer.MAX_VALUE) {
                return Integer.MAX_VALUE;
            }
            for (int c = 0; c < 26; c++) {
                count[node][c] = Math.max(
                    count[node][c],
                    (c == colorIndex ? 1 : 0) + count[nei][c]
                );
            }
        }

        path[node] = false;
        return 0;
    }
}
```

```cpp
class Solution {
public:
    int n, INF = 1e9;
    vector<vector<int>> adj;
    vector<bool> visit, path;
    vector<vector<int>> count;

    int largestPathValue(string colors, vector<vector<int>>& edges) {
        this->n = colors.size();
        adj.resize(n);
        visit.assign(n, false);
        path.assign(n, false);
        count.assign(n, vector<int>(26));

        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            if (dfs(i, colors) == INF) return -1;
            for (int c = 0; c < 26; c++) {
                res = max(res, count[i][c]);
            }
        }
        return res;
    }

private:
    int dfs(int node, string& colors) {
        if (path[node]) return INF;
        if (visit[node]) return 0;

        visit[node] = true;
        path[node] = true;
        int colorIndex = colors[node] - 'a';
        count[node][colorIndex] = 1;

        for (int& nei : adj[node]) {
            if (dfs(nei, colors) == INF) return INF;
            for (int c = 0; c < 26; c++) {
                count[node][c] = max(
                    count[node][c],
                    (c == colorIndex ? 1 : 0) + count[nei][c]
                );
            }
        }

        path[node] = false;
        return 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} colors
     * @param {number[][]} edges
     * @return {number}
     */
    largestPathValue(colors, edges) {
        const n = colors.length;
        const adj = Array.from({ length: n }, () => []);
        for (const [src, dst] of edges) {
            adj[src].push(dst);
        }

        const visit = new Array(n).fill(false);
        const path = new Array(n).fill(false);
        const count = Array.from({ length: n }, () => new Array(26).fill(0));

        const dfs = (node) => {
            if (path[node]) return Infinity;
            if (visit[node]) return 0;

            visit[node] = true;
            path[node] = true;
            const colorIndex = colors.charCodeAt(node) - 'a'.charCodeAt(0);
            count[node][colorIndex] = 1;

            for (const nei of adj[node]) {
                if (dfs(nei) === Infinity) return Infinity;
                for (let c = 0; c < 26; c++) {
                    count[node][c] = Math.max(
                        count[node][c],
                        (c === colorIndex ? 1 : 0) + count[nei][c],
                    );
                }
            }

            path[node] = false;
            return 0;
        };

        let res = 0;
        for (let i = 0; i < n; i++) {
            if (dfs(i) === Infinity) return -1;
            for (let c = 0; c < 26; c++) {
                res = Math.max(res, count[i][c]);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private int n;
    private List<int>[] adj;
    private bool[] visit, path;
    private int[][] count;

    public int LargestPathValue(string colors, int[][] edges) {
        n = colors.Length;
        adj = new List<int>[n];
        visit = new bool[n];
        path = new bool[n];
        count = new int[n][];

        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
            count[i] = new int[26];
        }
        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            if (Dfs(i, colors) == int.MaxValue) return -1;
            for (int c = 0; c < 26; c++) {
                res = Math.Max(res, count[i][c]);
            }
        }
        return res;
    }

    private int Dfs(int node, string colors) {
        if (path[node]) return int.MaxValue;
        if (visit[node]) return 0;

        visit[node] = true;
        path[node] = true;
        int colorIndex = colors[node] - 'a';
        count[node][colorIndex] = 1;

        foreach (int nei in adj[node]) {
            if (Dfs(nei, colors) == int.MaxValue) return int.MaxValue;
            for (int c = 0; c < 26; c++) {
                count[node][c] = Math.Max(
                    count[node][c],
                    (c == colorIndex ? 1 : 0) + count[nei][c]
                );
            }
        }

        path[node] = false;
        return 0;
    }
}
```

```go
func largestPathValue(colors string, edges [][]int) int {
    n := len(colors)
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }
    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
    }

    visit := make([]bool, n)
    path := make([]bool, n)
    count := make([][]int, n)
    for i := range count {
        count[i] = make([]int, 26)
    }

    var dfs func(node int) int
    dfs = func(node int) int {
        if path[node] {
            return math.MaxInt32
        }
        if visit[node] {
            return 0
        }

        visit[node] = true
        path[node] = true
        colorIndex := int(colors[node] - 'a')
        count[node][colorIndex] = 1

        for _, nei := range adj[node] {
            if dfs(nei) == math.MaxInt32 {
                return math.MaxInt32
            }
            for c := 0; c < 26; c++ {
                add := 0
                if c == colorIndex {
                    add = 1
                }
                count[node][c] = max(count[node][c], add+count[nei][c])
            }
        }

        path[node] = false
        return 0
    }

    res := 0
    for i := 0; i < n; i++ {
        if dfs(i) == math.MaxInt32 {
            return -1
        }
        for c := 0; c < 26; c++ {
            res = max(res, count[i][c])
        }
    }
    return res
}
```

```kotlin
class Solution {
    private lateinit var adj: Array<MutableList<Int>>
    private lateinit var visit: BooleanArray
    private lateinit var path: BooleanArray
    private lateinit var count: Array<IntArray>

    fun largestPathValue(colors: String, edges: Array<IntArray>): Int {
        val n = colors.length
        adj = Array(n) { mutableListOf<Int>() }
        visit = BooleanArray(n)
        path = BooleanArray(n)
        count = Array(n) { IntArray(26) }

        for (edge in edges) {
            adj[edge[0]].add(edge[1])
        }

        var res = 0
        for (i in 0 until n) {
            if (dfs(i, colors) == Int.MAX_VALUE) return -1
            for (c in 0 until 26) {
                res = maxOf(res, count[i][c])
            }
        }
        return res
    }

    private fun dfs(node: Int, colors: String): Int {
        if (path[node]) return Int.MAX_VALUE
        if (visit[node]) return 0

        visit[node] = true
        path[node] = true
        val colorIndex = colors[node] - 'a'
        count[node][colorIndex] = 1

        for (nei in adj[node]) {
            if (dfs(nei, colors) == Int.MAX_VALUE) return Int.MAX_VALUE
            for (c in 0 until 26) {
                count[node][c] = maxOf(
                    count[node][c],
                    (if (c == colorIndex) 1 else 0) + count[nei][c]
                )
            }
        }

        path[node] = false
        return 0
    }
}
```

```swift
class Solution {
    private var adj = [[Int]]()
    private var visit = [Bool]()
    private var path = [Bool]()
    private var count = [[Int]]()

    func largestPathValue(_ colors: String, _ edges: [[Int]]) -> Int {
        let n = colors.count
        let colorsArr = Array(colors)
        adj = Array(repeating: [Int](), count: n)
        visit = Array(repeating: false, count: n)
        path = Array(repeating: false, count: n)
        count = Array(repeating: Array(repeating: 0, count: 26), count: n)

        for edge in edges {
            adj[edge[0]].append(edge[1])
        }

        func dfs(_ node: Int) -> Int {
            if path[node] { return Int.max }
            if visit[node] { return 0 }

            visit[node] = true
            path[node] = true
            let colorIndex = Int(colorsArr[node].asciiValue! - Character("a").asciiValue!)
            count[node][colorIndex] = 1

            for nei in adj[node] {
                if dfs(nei) == Int.max { return Int.max }
                for c in 0..<26 {
                    count[node][c] = max(
                        count[node][c],
                        (c == colorIndex ? 1 : 0) + count[nei][c]
                    )
                }
            }

            path[node] = false
            return 0
        }

        var res = 0
        for i in 0..<n {
            if dfs(i) == Int.max { return -1 }
            for c in 0..<26 {
                res = max(res, count[i][c])
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of verticies and $E$ is the number of edges.

---

## 3. Topological Sort (Kahn's Algorithm)

### Intuition

Since we need valid paths in a directed graph, topological sorting naturally fits. We process nodes in topological order using Kahn's algorithm (BFS with indegree tracking). For each node, we propagate color counts to its neighbors before they are processed. If we cannot process all nodes, a cycle exists. This approach avoids recursion and handles cycle detection elegantly.

### Algorithm

1. Build an adjacency list and compute the indegree of each node.
2. Initialize a 2D array `count[node][color]` for tracking color frequencies.
3. Add all nodes with indegree 0 to a queue.
4. Process nodes in BFS order:
   - Increment the count for the node's own color.
   - Update the result with this color count.
   - For each neighbor, propagate the current node's color counts, then decrement the neighbor's indegree. If it becomes 0, add it to the queue.
5. If the number of processed nodes equals n, return the result. Otherwise, return -1 (cycle detected).

::tabs-start

```python
class Solution:
    def largestPathValue(self, colors: str, edges: list[list[int]]) -> int:
        n = len(colors)
        adj = [[] for _ in range(n)]
        indegree = [0] * n
        count = [[0] * 26 for _ in range(n)]

        for u, v in edges:
            adj[u].append(v)
            indegree[v] += 1

        q = deque()
        for i in range(n):
            if indegree[i] == 0:
                q.append(i)

        visit = res = 0
        while q:
            node = q.popleft()
            visit += 1
            colorIndex = ord(colors[node]) - ord('a')
            count[node][colorIndex] += 1
            res = max(res, count[node][colorIndex])

            for nei in adj[node]:
                for c in range(26):
                    count[nei][c] = max(count[nei][c], count[node][c])

                indegree[nei] -= 1
                if indegree[nei] == 0:
                    q.append(nei)

        return res if visit == n else -1
```

```java
public class Solution {
    public int largestPathValue(String colors, int[][] edges) {
        int n = colors.length();
        List<Integer>[] adj = new ArrayList[n];
        int[] indegree = new int[n];
        int[][] count = new int[n][26];

        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
            indegree[edge[1]]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                q.add(i);
            }
        }

        int visit = 0, res = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            visit++;
            int colorIndex = colors.charAt(node) - 'a';
            count[node][colorIndex]++;
            res = Math.max(res, count[node][colorIndex]);

            for (int nei : adj[node]) {
                for (int c = 0; c < 26; c++) {
                    count[nei][c] = Math.max(count[nei][c], count[node][c]);
                }
                if (--indegree[nei] == 0) {
                    q.add(nei);
                }
            }
        }

        return visit == n ? res : -1;
    }
}
```

```cpp
class Solution {
public:
    int largestPathValue(string colors, vector<vector<int>>& edges) {
        int n = colors.size();
        vector<vector<int>> adj(n);
        vector<int> indegree(n);
        vector<vector<int>> count(n, vector<int>(26));

        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            indegree[edge[1]]++;
        }

        queue<int> q;
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                q.push(i);
            }
        }

        int visit = 0, res = 0;
        while (!q.empty()) {
            int node = q.front();q.pop();
            visit++;
            int colorIndex = colors[node] - 'a';
            count[node][colorIndex]++;
            res = max(res, count[node][colorIndex]);

            for (int& nei : adj[node]) {
                for (int c = 0; c < 26; c++) {
                    count[nei][c] = max(count[nei][c], count[node][c]);
                }
                if (--indegree[nei] == 0) {
                    q.push(nei);
                }
            }
        }

        return visit == n ? res : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} colors
     * @param {number[][]} edges
     * @return {number}
     */
    largestPathValue(colors, edges) {
        const n = colors.length;
        const adj = Array.from({ length: n }, () => []);
        const indegree = new Array(n).fill(0);
        const count = Array.from({ length: n }, () => new Array(26).fill(0));

        for (const [u, v] of edges) {
            adj[u].push(v);
            indegree[v]++;
        }

        const q = new Queue();
        for (let i = 0; i < n; i++) {
            if (indegree[i] === 0) {
                q.push(i);
            }
        }

        let visit = 0,
            res = 0;
        while (!q.isEmpty()) {
            const node = q.pop();
            visit++;
            const colorIndex = colors.charCodeAt(node) - 'a'.charCodeAt(0);
            count[node][colorIndex]++;
            res = Math.max(res, count[node][colorIndex]);

            for (const nei of adj[node]) {
                for (let c = 0; c < 26; c++) {
                    count[nei][c] = Math.max(count[nei][c], count[node][c]);
                }
                if (--indegree[nei] === 0) {
                    q.push(nei);
                }
            }
        }

        return visit === n ? res : -1;
    }
}
```

```csharp
public class Solution {
    public int LargestPathValue(string colors, int[][] edges) {
        int n = colors.Length;
        var adj = new List<int>[n];
        var indegree = new int[n];
        var count = new int[n][];

        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
            count[i] = new int[26];
        }

        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
            indegree[edge[1]]++;
        }

        var q = new Queue<int>();
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                q.Enqueue(i);
            }
        }

        int visit = 0, res = 0;
        while (q.Count > 0) {
            int node = q.Dequeue();
            visit++;
            int colorIndex = colors[node] - 'a';
            count[node][colorIndex]++;
            res = Math.Max(res, count[node][colorIndex]);

            foreach (int nei in adj[node]) {
                for (int c = 0; c < 26; c++) {
                    count[nei][c] = Math.Max(count[nei][c], count[node][c]);
                }
                if (--indegree[nei] == 0) {
                    q.Enqueue(nei);
                }
            }
        }

        return visit == n ? res : -1;
    }
}
```

```go
func largestPathValue(colors string, edges [][]int) int {
    n := len(colors)
    adj := make([][]int, n)
    indegree := make([]int, n)
    count := make([][]int, n)

    for i := range adj {
        adj[i] = []int{}
        count[i] = make([]int, 26)
    }

    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
        indegree[edge[1]]++
    }

    q := []int{}
    for i := 0; i < n; i++ {
        if indegree[i] == 0 {
            q = append(q, i)
        }
    }

    visit, res := 0, 0
    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        visit++
        colorIndex := int(colors[node] - 'a')
        count[node][colorIndex]++
        res = max(res, count[node][colorIndex])

        for _, nei := range adj[node] {
            for c := 0; c < 26; c++ {
                count[nei][c] = max(count[nei][c], count[node][c])
            }
            indegree[nei]--
            if indegree[nei] == 0 {
                q = append(q, nei)
            }
        }
    }

    if visit == n {
        return res
    }
    return -1
}
```

```kotlin
class Solution {
    fun largestPathValue(colors: String, edges: Array<IntArray>): Int {
        val n = colors.length
        val adj = Array(n) { mutableListOf<Int>() }
        val indegree = IntArray(n)
        val count = Array(n) { IntArray(26) }

        for (edge in edges) {
            adj[edge[0]].add(edge[1])
            indegree[edge[1]]++
        }

        val q = ArrayDeque<Int>()
        for (i in 0 until n) {
            if (indegree[i] == 0) {
                q.add(i)
            }
        }

        var visit = 0
        var res = 0
        while (q.isNotEmpty()) {
            val node = q.removeFirst()
            visit++
            val colorIndex = colors[node] - 'a'
            count[node][colorIndex]++
            res = maxOf(res, count[node][colorIndex])

            for (nei in adj[node]) {
                for (c in 0 until 26) {
                    count[nei][c] = maxOf(count[nei][c], count[node][c])
                }
                indegree[nei]--
                if (indegree[nei] == 0) {
                    q.add(nei)
                }
            }
        }

        return if (visit == n) res else -1
    }
}
```

```swift
class Solution {
    func largestPathValue(_ colors: String, _ edges: [[Int]]) -> Int {
        let n = colors.count
        let colorsArr = Array(colors)
        var adj = Array(repeating: [Int](), count: n)
        var indegree = Array(repeating: 0, count: n)
        var count = Array(repeating: Array(repeating: 0, count: 26), count: n)

        for edge in edges {
            adj[edge[0]].append(edge[1])
            indegree[edge[1]] += 1
        }

        var q = [Int]()
        for i in 0..<n {
            if indegree[i] == 0 {
                q.append(i)
            }
        }

        var visit = 0
        var res = 0
        var idx = 0
        while idx < q.count {
            let node = q[idx]
            idx += 1
            visit += 1
            let colorIndex = Int(colorsArr[node].asciiValue! - Character("a").asciiValue!)
            count[node][colorIndex] += 1
            res = max(res, count[node][colorIndex])

            for nei in adj[node] {
                for c in 0..<26 {
                    count[nei][c] = max(count[nei][c], count[node][c])
                }
                indegree[nei] -= 1
                if indegree[nei] == 0 {
                    q.append(nei)
                }
            }
        }

        return visit == n ? res : -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of verticies and $E$ is the number of edges.
