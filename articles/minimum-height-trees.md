## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Tree/Graph Representation** - Understanding how to represent trees using adjacency lists
- **Depth First Search (DFS)** - Ability to traverse trees recursively while computing subtree properties like height
- **Breadth First Search (BFS) / Topological Sort** - Understanding level-by-level processing and leaf removal techniques
- **Tree Properties** - Familiarity with concepts like tree diameter, centroids, and the relationship between tree structure and height

---

## 1. Brute Force (DFS)

### Intuition

The most straightforward approach is to try each node as a potential root and measure the resulting tree height. The height of a tree rooted at any node is the maximum distance to any other node, which we can find using `dfs`.

By computing the height for every possible root, we can identify which nodes produce the minimum height. While simple to understand, this repeats a lot of work since we recompute distances from scratch for each candidate root.

### Algorithm

1. Build an adjacency list from the edges.
2. Define a `dfs` function that computes the height of the tree when rooted at a given node.
3. For each node from `0` to `n-1`, run `dfs` to get its tree height.
4. Track the minimum height seen and collect all nodes that achieve this minimum.
5. Return the list of nodes with minimum height.

::tabs-start

```python
class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        def dfs(node, parent):
            hgt = 0
            for nei in adj[node]:
                if nei == parent:
                    continue
                hgt = max(hgt, 1 + dfs(nei, node))
            return hgt

        minHgt = n
        res = []
        for i in range(n):
            curHgt = dfs(i, -1)
            if curHgt == minHgt:
                res.append(i)
            elif curHgt < minHgt:
                res = [i]
                minHgt = curHgt

        return res
```

```java
public class Solution {
    private List<List<Integer>> adj;

    public List<Integer> findMinHeightTrees(int n, int[][] edges) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        int minHgt = n;
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            int curHgt = dfs(i, -1);
            if (curHgt == minHgt) {
                result.add(i);
            } else if (curHgt < minHgt) {
                result = new ArrayList<>();
                result.add(i);
                minHgt = curHgt;
            }
        }
        return result;
    }

    private int dfs(int node, int parent) {
        int hgt = 0;
        for (int nei : adj.get(node)) {
            if (nei == parent) {
                continue;
            }
            hgt = Math.max(hgt, 1 + dfs(nei, node));
        }
        return hgt;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> adj;

    int dfs(int node, int parent) {
        int hgt = 0;
        for (int nei : adj[node]) {
            if (nei == parent)
                continue;
            hgt = max(hgt, 1 + dfs(nei, node));
        }
        return hgt;
    }

public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        adj.resize(n);
        for (const auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        int minHgt = n;
        vector<int> result;
        for (int i = 0; i < n; i++) {
            int curHgt = dfs(i, -1);
            if (curHgt == minHgt) {
                result.push_back(i);
            } else if (curHgt < minHgt) {
                result = {i};
                minHgt = curHgt;
            }
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @return {number[]}
     */
    findMinHeightTrees(n, edges) {
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        const dfs = (node, parent) => {
            let hgt = 0;
            for (const nei of adj[node]) {
                if (nei === parent) continue;
                hgt = Math.max(hgt, 1 + dfs(nei, node));
            }
            return hgt;
        };

        let minHgt = n;
        const result = [];
        for (let i = 0; i < n; i++) {
            const curHgt = dfs(i, -1);
            if (curHgt === minHgt) {
                result.push(i);
            } else if (curHgt < minHgt) {
                result.length = 0;
                result.push(i);
                minHgt = curHgt;
            }
        }
        return result;
    }
}
```

```csharp
public class Solution {
    private List<List<int>> adj;

    public List<int> FindMinHeightTrees(int n, int[][] edges) {
        adj = new List<List<int>>();
        for (int i = 0; i < n; i++) {
            adj.Add(new List<int>());
        }
        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        int minHgt = n;
        List<int> result = new List<int>();
        for (int i = 0; i < n; i++) {
            int curHgt = Dfs(i, -1);
            if (curHgt == minHgt) {
                result.Add(i);
            } else if (curHgt < minHgt) {
                result = new List<int> { i };
                minHgt = curHgt;
            }
        }
        return result;
    }

    private int Dfs(int node, int parent) {
        int hgt = 0;
        foreach (int nei in adj[node]) {
            if (nei == parent) continue;
            hgt = Math.Max(hgt, 1 + Dfs(nei, node));
        }
        return hgt;
    }
}
```

```go
func findMinHeightTrees(n int, edges [][]int) []int {
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }
    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
        adj[edge[1]] = append(adj[edge[1]], edge[0])
    }

    var dfs func(node, parent int) int
    dfs = func(node, parent int) int {
        hgt := 0
        for _, nei := range adj[node] {
            if nei == parent {
                continue
            }
            hgt = max(hgt, 1+dfs(nei, node))
        }
        return hgt
    }

    minHgt := n
    result := []int{}
    for i := 0; i < n; i++ {
        curHgt := dfs(i, -1)
        if curHgt == minHgt {
            result = append(result, i)
        } else if curHgt < minHgt {
            result = []int{i}
            minHgt = curHgt
        }
    }
    return result
}
```

```kotlin
class Solution {
    private lateinit var adj: Array<MutableList<Int>>

    fun findMinHeightTrees(n: Int, edges: Array<IntArray>): List<Int> {
        adj = Array(n) { mutableListOf() }
        for (edge in edges) {
            adj[edge[0]].add(edge[1])
            adj[edge[1]].add(edge[0])
        }

        var minHgt = n
        var result = mutableListOf<Int>()
        for (i in 0 until n) {
            val curHgt = dfs(i, -1)
            if (curHgt == minHgt) {
                result.add(i)
            } else if (curHgt < minHgt) {
                result = mutableListOf(i)
                minHgt = curHgt
            }
        }
        return result
    }

    private fun dfs(node: Int, parent: Int): Int {
        var hgt = 0
        for (nei in adj[node]) {
            if (nei == parent) continue
            hgt = maxOf(hgt, 1 + dfs(nei, node))
        }
        return hgt
    }
}
```

```swift
class Solution {
    func findMinHeightTrees(_ n: Int, _ edges: [[Int]]) -> [Int] {
        var adj = [[Int]](repeating: [], count: n)
        for edge in edges {
            adj[edge[0]].append(edge[1])
            adj[edge[1]].append(edge[0])
        }

        func dfs(_ node: Int, _ parent: Int) -> Int {
            var hgt = 0
            for nei in adj[node] {
                if nei == parent { continue }
                hgt = max(hgt, 1 + dfs(nei, node))
            }
            return hgt
        }

        var minHgt = n
        var result = [Int]()
        for i in 0..<n {
            let curHgt = dfs(i, -1)
            if curHgt == minHgt {
                result.append(i)
            } else if curHgt < minHgt {
                result = [i]
                minHgt = curHgt
            }
        }
        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V * (V + E))$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 2. Dynamic Programming On Trees (Rerooting)

### Intuition

Rather than recomputing everything for each root, we can reuse information. The tree height from any node depends on the longest path in two directions: down into its subtree and up through its parent to the rest of the tree.

We run two `dfs` passes. The first computes the two longest downward paths for each node (we need two in case the longest path goes through the child we came from). The second pass propagates information from parent to children, combining the parent's best path with sibling subtree heights.

### Algorithm

1. Build an adjacency list and initialize a `dp` array storing the top two heights for each node.
2. First `dfs` (post-order): for each node, compute the two longest paths into its children's subtrees.
3. Second `dfs` (pre-order): propagate the "upward" height from parent to children, updating each node's best heights to include paths through the parent.
4. After both passes, each node's maximum height (`dp[i][0]`) represents its tree height as root.
5. Find the minimum value across all nodes and return all nodes achieving that minimum.

::tabs-start

```python
class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        dp = [[0] * 2 for _ in range(n)] # top two heights for each node

        def dfs(node, parent):
            for nei in adj[node]:
                if nei == parent:
                    continue
                dfs(nei, node)
                curHgt = 1 + dp[nei][0]
                if curHgt > dp[node][0]:
                    dp[node][1] = dp[node][0]
                    dp[node][0] = curHgt
                elif curHgt > dp[node][1]:
                    dp[node][1] = curHgt

        def dfs1(node, parent, topHgt):
            if topHgt > dp[node][0]:
                dp[node][1] = dp[node][0]
                dp[node][0] = topHgt
            elif topHgt > dp[node][1]:
                dp[node][1] = topHgt

            for nei in adj[node]:
                if nei == parent:
                    continue
                toChild = 1 + (dp[node][1] if dp[node][0] == 1 + dp[nei][0] else dp[node][0])
                dfs1(nei, node, toChild)

        dfs(0, -1)
        dfs1(0, -1, 0)

        minHgt, res = n, []
        for i in range(n):
            minHgt = min(minHgt, dp[i][0])
        for i in range(n):
            if minHgt == dp[i][0]:
                res.append(i)
        return res
```

```java
class Solution {
    private List<List<Integer>> adj;
    private int[][] dp;

    public List<Integer> findMinHeightTrees(int n, int[][] edges) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        dp = new int[n][2]; // top two heights for each node
        dfs(0, -1);
        dfs1(0, -1, 0);

        int minHgt = n;
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            minHgt = Math.min(minHgt, dp[i][0]);
        }
        for (int i = 0; i < n; i++) {
            if (minHgt == dp[i][0]) {
                res.add(i);
            }
        }
        return res;
    }

    private void dfs(int node, int parent) {
        for (int nei : adj.get(node)) {
            if (nei == parent) continue;
            dfs(nei, node);
            int curHgt = 1 + dp[nei][0];
            if (curHgt > dp[node][0]) {
                dp[node][1] = dp[node][0];
                dp[node][0] = curHgt;
            } else if (curHgt > dp[node][1]) {
                dp[node][1] = curHgt;
            }
        }
    }

    private void dfs1(int node, int parent, int topHgt) {
        if (topHgt > dp[node][0]) {
            dp[node][1] = dp[node][0];
            dp[node][0] = topHgt;
        } else if (topHgt > dp[node][1]) {
            dp[node][1] = topHgt;
        }

        for (int nei : adj.get(node)) {
            if (nei == parent) continue;
            int toChild = 1 + ((dp[node][0] == 1 + dp[nei][0]) ? dp[node][1] : dp[node][0]);
            dfs1(nei, node, toChild);
        }
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> adj;
    vector<vector<int>> dp;

    void dfs(int node, int parent) {
        for (int nei : adj[node]) {
            if (nei == parent) continue;
            dfs(nei, node);
            int curHgt = 1 + dp[nei][0];
            if (curHgt > dp[node][0]) {
                dp[node][1] = dp[node][0];
                dp[node][0] = curHgt;
            } else if (curHgt > dp[node][1]) {
                dp[node][1] = curHgt;
            }
        }
    }

    void dfs1(int node, int parent, int topHgt) {
        if (topHgt > dp[node][0]) {
            dp[node][1] = dp[node][0];
            dp[node][0] = topHgt;
        } else if (topHgt > dp[node][1]) {
            dp[node][1] = topHgt;
        }

        for (int nei : adj[node]) {
            if (nei == parent) continue;
            int toChild = 1 + ((dp[node][0] == 1 + dp[nei][0]) ? dp[node][1] : dp[node][0]);
            dfs1(nei, node, toChild);
        }
    }

public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        adj.resize(n);
        dp.assign(n, vector<int>(2, 0)); // top two heights for each node
        for (const auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        dfs(0, -1);
        dfs1(0, -1, 0);

        int minHgt = n;
        vector<int> res;
        for (int i = 0; i < n; i++) {
            minHgt = min(minHgt, dp[i][0]);
        }
        for (int i = 0; i < n; i++) {
            if (minHgt == dp[i][0]) {
                res.push_back(i);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @return {number[]}
     */
    findMinHeightTrees(n, edges) {
        const adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        // top two heights for each node
        const dp = Array.from({ length: n }, () => [0, 0]);

        const dfs = (node, parent) => {
            for (const nei of adj[node]) {
                if (nei === parent) continue;
                dfs(nei, node);
                const curHgt = 1 + dp[nei][0];
                if (curHgt > dp[node][0]) {
                    dp[node][1] = dp[node][0];
                    dp[node][0] = curHgt;
                } else if (curHgt > dp[node][1]) {
                    dp[node][1] = curHgt;
                }
            }
        };

        const dfs1 = (node, parent, topHgt) => {
            if (topHgt > dp[node][0]) {
                dp[node][1] = dp[node][0];
                dp[node][0] = topHgt;
            } else if (topHgt > dp[node][1]) {
                dp[node][1] = topHgt;
            }

            for (const nei of adj[node]) {
                if (nei === parent) continue;
                const toChild =
                    1 +
                    (dp[node][0] === 1 + dp[nei][0]
                        ? dp[node][1]
                        : dp[node][0]);
                dfs1(nei, node, toChild);
            }
        };

        dfs(0, -1);
        dfs1(0, -1, 0);

        let minHgt = n;
        const res = [];
        for (let i = 0; i < n; i++) {
            minHgt = Math.min(minHgt, dp[i][0]);
        }
        for (let i = 0; i < n; i++) {
            if (minHgt === dp[i][0]) {
                res.push(i);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private List<List<int>> adj;
    private int[][] dp;

    public List<int> FindMinHeightTrees(int n, int[][] edges) {
        adj = new List<List<int>>();
        for (int i = 0; i < n; i++) {
            adj.Add(new List<int>());
        }

        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        dp = new int[n][];
        for (int i = 0; i < n; i++) {
            dp[i] = new int[2]; // top two heights
        }

        Dfs(0, -1);
        Dfs1(0, -1, 0);

        int minHgt = n;
        List<int> res = new List<int>();
        for (int i = 0; i < n; i++) {
            minHgt = Math.Min(minHgt, dp[i][0]);
        }
        for (int i = 0; i < n; i++) {
            if (dp[i][0] == minHgt) {
                res.Add(i);
            }
        }
        return res;
    }

    private void Dfs(int node, int parent) {
        foreach (int nei in adj[node]) {
            if (nei == parent) continue;
            Dfs(nei, node);
            int curHgt = 1 + dp[nei][0];
            if (curHgt > dp[node][0]) {
                dp[node][1] = dp[node][0];
                dp[node][0] = curHgt;
            } else if (curHgt > dp[node][1]) {
                dp[node][1] = curHgt;
            }
        }
    }

    private void Dfs1(int node, int parent, int topHgt) {
        if (topHgt > dp[node][0]) {
            dp[node][1] = dp[node][0];
            dp[node][0] = topHgt;
        } else if (topHgt > dp[node][1]) {
            dp[node][1] = topHgt;
        }

        foreach (int nei in adj[node]) {
            if (nei == parent) continue;
            int toChild = 1 + ((dp[node][0] == 1 + dp[nei][0]) ? dp[node][1] : dp[node][0]);
            Dfs1(nei, node, toChild);
        }
    }
}
```

```go
func findMinHeightTrees(n int, edges [][]int) []int {
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }
    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
        adj[edge[1]] = append(adj[edge[1]], edge[0])
    }

    dp := make([][2]int, n)

    var dfs func(node, parent int)
    dfs = func(node, parent int) {
        for _, nei := range adj[node] {
            if nei == parent {
                continue
            }
            dfs(nei, node)
            curHgt := 1 + dp[nei][0]
            if curHgt > dp[node][0] {
                dp[node][1] = dp[node][0]
                dp[node][0] = curHgt
            } else if curHgt > dp[node][1] {
                dp[node][1] = curHgt
            }
        }
    }

    var dfs1 func(node, parent, topHgt int)
    dfs1 = func(node, parent, topHgt int) {
        if topHgt > dp[node][0] {
            dp[node][1] = dp[node][0]
            dp[node][0] = topHgt
        } else if topHgt > dp[node][1] {
            dp[node][1] = topHgt
        }

        for _, nei := range adj[node] {
            if nei == parent {
                continue
            }
            toChild := dp[node][0]
            if dp[node][0] == 1+dp[nei][0] {
                toChild = dp[node][1]
            }
            dfs1(nei, node, 1+toChild)
        }
    }

    dfs(0, -1)
    dfs1(0, -1, 0)

    minHgt := n
    for i := 0; i < n; i++ {
        minHgt = min(minHgt, dp[i][0])
    }
    result := []int{}
    for i := 0; i < n; i++ {
        if dp[i][0] == minHgt {
            result = append(result, i)
        }
    }
    return result
}
```

```kotlin
class Solution {
    private lateinit var adj: Array<MutableList<Int>>
    private lateinit var dp: Array<IntArray>

    fun findMinHeightTrees(n: Int, edges: Array<IntArray>): List<Int> {
        adj = Array(n) { mutableListOf() }
        for (edge in edges) {
            adj[edge[0]].add(edge[1])
            adj[edge[1]].add(edge[0])
        }

        dp = Array(n) { IntArray(2) }
        dfs(0, -1)
        dfs1(0, -1, 0)

        var minHgt = n
        for (i in 0 until n) {
            minHgt = minOf(minHgt, dp[i][0])
        }
        val result = mutableListOf<Int>()
        for (i in 0 until n) {
            if (dp[i][0] == minHgt) {
                result.add(i)
            }
        }
        return result
    }

    private fun dfs(node: Int, parent: Int) {
        for (nei in adj[node]) {
            if (nei == parent) continue
            dfs(nei, node)
            val curHgt = 1 + dp[nei][0]
            if (curHgt > dp[node][0]) {
                dp[node][1] = dp[node][0]
                dp[node][0] = curHgt
            } else if (curHgt > dp[node][1]) {
                dp[node][1] = curHgt
            }
        }
    }

    private fun dfs1(node: Int, parent: Int, topHgt: Int) {
        if (topHgt > dp[node][0]) {
            dp[node][1] = dp[node][0]
            dp[node][0] = topHgt
        } else if (topHgt > dp[node][1]) {
            dp[node][1] = topHgt
        }

        for (nei in adj[node]) {
            if (nei == parent) continue
            val toChild = 1 + if (dp[node][0] == 1 + dp[nei][0]) dp[node][1] else dp[node][0]
            dfs1(nei, node, toChild)
        }
    }
}
```

```swift
class Solution {
    func findMinHeightTrees(_ n: Int, _ edges: [[Int]]) -> [Int] {
        var adj = [[Int]](repeating: [], count: n)
        for edge in edges {
            adj[edge[0]].append(edge[1])
            adj[edge[1]].append(edge[0])
        }

        var dp = [[Int]](repeating: [0, 0], count: n)

        func dfs(_ node: Int, _ parent: Int) {
            for nei in adj[node] {
                if nei == parent { continue }
                dfs(nei, node)
                let curHgt = 1 + dp[nei][0]
                if curHgt > dp[node][0] {
                    dp[node][1] = dp[node][0]
                    dp[node][0] = curHgt
                } else if curHgt > dp[node][1] {
                    dp[node][1] = curHgt
                }
            }
        }

        func dfs1(_ node: Int, _ parent: Int, _ topHgt: Int) {
            if topHgt > dp[node][0] {
                dp[node][1] = dp[node][0]
                dp[node][0] = topHgt
            } else if topHgt > dp[node][1] {
                dp[node][1] = topHgt
            }

            for nei in adj[node] {
                if nei == parent { continue }
                let toChild = 1 + (dp[node][0] == 1 + dp[nei][0] ? dp[node][1] : dp[node][0])
                dfs1(nei, node, toChild)
            }
        }

        dfs(0, -1)
        dfs1(0, -1, 0)

        var minHgt = n
        for i in 0..<n {
            minHgt = min(minHgt, dp[i][0])
        }
        var result = [Int]()
        for i in 0..<n {
            if dp[i][0] == minHgt {
                result.append(i)
            }
        }
        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 3. Find Centroids of the Tree (DFS)

### Intuition

The minimum height trees are rooted at the centroid(s) of the tree. These centroids lie at the middle of the longest path (diameter) in the tree. If the diameter has odd length, there are two centroids; if even, there's exactly one.

We find the diameter using two `bfs`/`dfs` passes: first find the farthest node from any starting point, then find the farthest node from that. The path between these two endpoints is the diameter, and its middle node(s) are the answer.

### Algorithm

1. Build an adjacency list from the edges.
2. Run `dfs` from node `0` to find the farthest node (call it `node_a`).
3. Run `dfs` from `node_a` to find the farthest node (`node_b`) and the diameter length.
4. Trace the path from `node_a` to `node_b`, collecting all nodes along the way.
5. If the diameter is even, return the single middle node; if odd, return the two middle nodes.

::tabs-start

```python
class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        if n == 1:
            return [0]

        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        def dfs(node, parent):
            farthest_node = node
            max_distance = 0
            for nei in adj[node]:
                if nei != parent:
                    nei_node, nei_distance = dfs(nei, node)
                    if nei_distance + 1 > max_distance:
                        max_distance = nei_distance + 1
                        farthest_node = nei_node
            return farthest_node, max_distance

        node_a, _ = dfs(0, -1)
        node_b, diameter = dfs(node_a, -1)

        centroids = []

        def find_centroids(node, parent):
            if node == node_b:
                centroids.append(node)
                return True
            for nei in adj[node]:
                if nei != parent:
                    if find_centroids(nei, node):
                        centroids.append(node)
                        return True
            return False

        find_centroids(node_a, -1)
        L = len(centroids)
        if diameter % 2 == 0:
            return [centroids[L // 2]]
        else:
            return [centroids[L // 2 - 1], centroids[L // 2]]
```

```java
public class Solution {
    private List<Integer>[] adj;
    private List<Integer> centroids;
    private int nodeB;

    public List<Integer> findMinHeightTrees(int n, int[][] edges) {
        if (n == 1)
            return Collections.singletonList(0);

        adj = new ArrayList[n];
        for (int i = 0; i < n; ++i)
            adj[i] = new ArrayList<>();

        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
            adj[edge[1]].add(edge[0]);
        }

        int nodeA = dfs(0, -1)[0];
        nodeB = dfs(nodeA, -1)[0];
        centroids = new ArrayList<>();
        findCentroids(nodeA, -1);

        int L = centroids.size();
        if (dfs(nodeA, -1)[1] % 2 == 0) {
            return Collections.singletonList(centroids.get(L / 2));
        } else {
            return Arrays.asList(centroids.get(L / 2 - 1), centroids.get(L / 2));
        }
    }

    private int[] dfs(int node, int parent) {
        int farthestNode = node, maxDistance = 0;
        for (int neighbor : adj[node]) {
            if (neighbor != parent) {
                int[] res = dfs(neighbor, node);
                if (res[1] + 1 > maxDistance) {
                    maxDistance = res[1] + 1;
                    farthestNode = res[0];
                }
            }
        }
        return new int[] { farthestNode, maxDistance };
    }

    private boolean findCentroids(int node, int parent) {
        if (node == nodeB) {
            centroids.add(node);
            return true;
        }
        for (int neighbor : adj[node]) {
            if (neighbor != parent) {
                if (findCentroids(neighbor, node)) {
                    centroids.add(node);
                    return true;
                }
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> adj;
    vector<int> centroids;
    int nodeB;

    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        if (n == 1)
            return {0};

        adj.resize(n);
        for (const auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        int nodeA = dfs(0, -1).first;
        nodeB = dfs(nodeA, -1).first;
        findCentroids(nodeA, -1);

        int L = centroids.size();
        if (dfs(nodeA, -1).second % 2 == 0)
            return {centroids[L / 2]};
        else
            return {centroids[L / 2 - 1], centroids[L / 2]};
    }

private:
    pair<int, int> dfs(int node, int parent) {
        int farthestNode = node, maxDistance = 0;
        for (int neighbor : adj[node]) {
            if (neighbor != parent) {
                auto res = dfs(neighbor, node);
                if (res.second + 1 > maxDistance) {
                    maxDistance = res.second + 1;
                    farthestNode = res.first;
                }
            }
        }
        return {farthestNode, maxDistance};
    }

    bool findCentroids(int node, int parent) {
        if (node == nodeB) {
            centroids.push_back(node);
            return true;
        }
        for (int neighbor : adj[node]) {
            if (neighbor != parent) {
                if (findCentroids(neighbor, node)) {
                    centroids.push_back(node);
                    return true;
                }
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @return {number[]}
     */
    findMinHeightTrees(n, edges) {
        if (n === 1) return [0];

        const adj = Array.from({ length: n }, () => []);

        for (const [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        const dfs = (node, parent) => {
            let farthestNode = node;
            let maxDistance = 0;

            for (const neighbor of adj[node]) {
                if (neighbor !== parent) {
                    const [farthest, dist] = dfs(neighbor, node);
                    if (dist + 1 > maxDistance) {
                        maxDistance = dist + 1;
                        farthestNode = farthest;
                    }
                }
            }
            return [farthestNode, maxDistance];
        };

        const findCentroids = (node, parent, centroids) => {
            if (node === nodeB) {
                centroids.push(node);
                return true;
            }

            for (const neighbor of adj[node]) {
                if (neighbor !== parent) {
                    if (findCentroids(neighbor, node, centroids)) {
                        centroids.push(node);
                        return true;
                    }
                }
            }
            return false;
        };

        const [nodeA] = dfs(0, -1);
        const [nodeB, diameter] = dfs(nodeA, -1);
        this.nodeB = nodeB;

        const centroids = [];
        findCentroids(nodeA, -1, centroids);

        const L = centroids.length;
        return diameter % 2 === 0
            ? [centroids[Math.floor(L / 2)]]
            : [centroids[Math.floor(L / 2) - 1], centroids[Math.floor(L / 2)]];
    }
}
```

```csharp
public class Solution {
    private List<int>[] adj;
    private int nodeB;
    private List<int> centroids;

    public List<int> FindMinHeightTrees(int n, int[][] edges) {
        if (n == 1) return new List<int> { 0 };

        adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();

        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        var nodeA = Dfs(0, -1).Item1;
        var dfsRes = Dfs(nodeA, -1);
        nodeB = dfsRes.Item1;
        int diameter = dfsRes.Item2;

        centroids = new List<int>();
        FindCentroids(nodeA, -1);

        int L = centroids.Count;
        if (diameter % 2 == 0) {
            return new List<int> { centroids[L / 2] };
        } else {
            return new List<int> { centroids[L / 2 - 1], centroids[L / 2] };
        }
    }

    private (int, int) Dfs(int node, int parent) {
        int farthestNode = node;
        int maxDistance = 0;

        foreach (int nei in adj[node]) {
            if (nei == parent) continue;
            var (neiNode, neiDist) = Dfs(nei, node);
            if (neiDist + 1 > maxDistance) {
                maxDistance = neiDist + 1;
                farthestNode = neiNode;
            }
        }

        return (farthestNode, maxDistance);
    }

    private bool FindCentroids(int node, int parent) {
        if (node == nodeB) {
            centroids.Add(node);
            return true;
        }

        foreach (int nei in adj[node]) {
            if (nei == parent) continue;
            if (FindCentroids(nei, node)) {
                centroids.Add(node);
                return true;
            }
        }
        return false;
    }
}
```

```go
func findMinHeightTrees(n int, edges [][]int) []int {
    if n == 1 {
        return []int{0}
    }

    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }
    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
        adj[edge[1]] = append(adj[edge[1]], edge[0])
    }

    var dfs func(node, parent int) (int, int)
    dfs = func(node, parent int) (int, int) {
        farthestNode := node
        maxDistance := 0
        for _, nei := range adj[node] {
            if nei != parent {
                neiNode, neiDist := dfs(nei, node)
                if neiDist+1 > maxDistance {
                    maxDistance = neiDist + 1
                    farthestNode = neiNode
                }
            }
        }
        return farthestNode, maxDistance
    }

    nodeA, _ := dfs(0, -1)
    nodeB, diameter := dfs(nodeA, -1)

    centroids := []int{}
    var findCentroids func(node, parent int) bool
    findCentroids = func(node, parent int) bool {
        if node == nodeB {
            centroids = append(centroids, node)
            return true
        }
        for _, nei := range adj[node] {
            if nei != parent {
                if findCentroids(nei, node) {
                    centroids = append(centroids, node)
                    return true
                }
            }
        }
        return false
    }

    findCentroids(nodeA, -1)
    L := len(centroids)
    if diameter%2 == 0 {
        return []int{centroids[L/2]}
    }
    return []int{centroids[L/2-1], centroids[L/2]}
}
```

```kotlin
class Solution {
    private lateinit var adj: Array<MutableList<Int>>
    private var nodeB = 0
    private val centroids = mutableListOf<Int>()

    fun findMinHeightTrees(n: Int, edges: Array<IntArray>): List<Int> {
        if (n == 1) return listOf(0)

        adj = Array(n) { mutableListOf() }
        for (edge in edges) {
            adj[edge[0]].add(edge[1])
            adj[edge[1]].add(edge[0])
        }

        val nodeA = dfs(0, -1).first
        val (nodeBVal, diameter) = dfs(nodeA, -1)
        nodeB = nodeBVal

        centroids.clear()
        findCentroids(nodeA, -1)

        val L = centroids.size
        return if (diameter % 2 == 0) {
            listOf(centroids[L / 2])
        } else {
            listOf(centroids[L / 2 - 1], centroids[L / 2])
        }
    }

    private fun dfs(node: Int, parent: Int): Pair<Int, Int> {
        var farthestNode = node
        var maxDistance = 0
        for (nei in adj[node]) {
            if (nei != parent) {
                val (neiNode, neiDist) = dfs(nei, node)
                if (neiDist + 1 > maxDistance) {
                    maxDistance = neiDist + 1
                    farthestNode = neiNode
                }
            }
        }
        return Pair(farthestNode, maxDistance)
    }

    private fun findCentroids(node: Int, parent: Int): Boolean {
        if (node == nodeB) {
            centroids.add(node)
            return true
        }
        for (nei in adj[node]) {
            if (nei != parent) {
                if (findCentroids(nei, node)) {
                    centroids.add(node)
                    return true
                }
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func findMinHeightTrees(_ n: Int, _ edges: [[Int]]) -> [Int] {
        if n == 1 { return [0] }

        var adj = [[Int]](repeating: [], count: n)
        for edge in edges {
            adj[edge[0]].append(edge[1])
            adj[edge[1]].append(edge[0])
        }

        func dfs(_ node: Int, _ parent: Int) -> (Int, Int) {
            var farthestNode = node
            var maxDistance = 0
            for nei in adj[node] {
                if nei != parent {
                    let (neiNode, neiDist) = dfs(nei, node)
                    if neiDist + 1 > maxDistance {
                        maxDistance = neiDist + 1
                        farthestNode = neiNode
                    }
                }
            }
            return (farthestNode, maxDistance)
        }

        let (nodeA, _) = dfs(0, -1)
        let (nodeB, diameter) = dfs(nodeA, -1)

        var centroids = [Int]()
        func findCentroids(_ node: Int, _ parent: Int) -> Bool {
            if node == nodeB {
                centroids.append(node)
                return true
            }
            for nei in adj[node] {
                if nei != parent {
                    if findCentroids(nei, node) {
                        centroids.append(node)
                        return true
                    }
                }
            }
            return false
        }

        _ = findCentroids(nodeA, -1)
        let L = centroids.count
        if diameter % 2 == 0 {
            return [centroids[L / 2]]
        } else {
            return [centroids[L / 2 - 1], centroids[L / 2]]
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 4. Topological Sorting (BFS)

### Intuition

Imagine peeling the tree like an onion, removing leaves layer by layer. The nodes that remain at the very end (when only `1` or `2` nodes are left) must be the centroids, since they're the innermost points of the tree.

Each round of removal brings us one step closer to the center. Since a tree can have at most `2` centroids (on a diameter of odd length), we stop when `2` or fewer nodes remain.

### Algorithm

1. Build an adjacency list and track each node's edge count (degree).
2. Initialize a queue with all leaf nodes (degree = `1`), excluding the special case where `n = 1`.
3. While more than `2` nodes remain:
   - Remove all current leaves from the queue.
   - For each removed leaf, decrement its neighbor's degree.
   - If a neighbor becomes a leaf, add it to the queue.
4. The remaining nodes in the queue are the minimum height tree roots.

::tabs-start

```python
class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        if n == 1:
            return [0]

        adj = defaultdict(list)
        for n1, n2 in edges:
            adj[n1].append(n2)
            adj[n2].append(n1)

        edge_cnt = {}
        leaves = deque()

        for src, neighbors in adj.items():
            edge_cnt[src] = len(neighbors)
            if len(neighbors) == 1:
                leaves.append(src)

        while leaves:
            if n <= 2:
                return list(leaves)
            for _ in range(len(leaves)):
                node = leaves.popleft()
                n -= 1
                for nei in adj[node]:
                    edge_cnt[nei] -= 1
                    if edge_cnt[nei] == 1:
                        leaves.append(nei)
```

```java
public class Solution {
    public List<Integer> findMinHeightTrees(int n, int[][] edges) {
        if (n == 1) return Collections.singletonList(0);

        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; ++i)
            adj[i] = new ArrayList<>();

        for (int[] edge : edges) {
            adj[edge[0]].add(edge[1]);
            adj[edge[1]].add(edge[0]);
        }

        int[] edge_cnt = new int[n];
        Queue<Integer> leaves = new LinkedList<>();

        for (int i = 0; i < n; i++) {
            edge_cnt[i] = adj[i].size();
            if (adj[i].size() == 1)
                leaves.offer(i);
        }

        while (!leaves.isEmpty()) {
            if (n <= 2) return new ArrayList<>(leaves);
            int size = leaves.size();
            for (int i = 0; i < size; ++i) {
                int node = leaves.poll();
                n--;
                for (int nei : adj[node]) {
                    edge_cnt[nei]--;
                    if (edge_cnt[nei] == 1)
                        leaves.offer(nei);
                }
            }
        }

        return new ArrayList<>();
    }
}
```

```cpp
class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        if (n == 1) return {0};

        vector<vector<int>> adj(n);
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        vector<int> edge_cnt(n);
        queue<int> leaves;

        for (int i = 0; i < n; ++i) {
            edge_cnt[i] = adj[i].size();
            if (adj[i].size() == 1)
                leaves.push(i);
        }

        while (!leaves.empty()) {
            if (n <= 2) {
                vector<int> result;
                while (!leaves.empty()) {
                    result.push_back(leaves.front());
                    leaves.pop();
                }
                return result;
            }
            int size = leaves.size();
            for (int i = 0; i < size; ++i) {
                int node = leaves.front();
                leaves.pop();
                --n;
                for (int& nei : adj[node]) {
                    --edge_cnt[nei];
                    if (edge_cnt[nei] == 1)
                        leaves.push(nei);
                }
            }
        }

        return {};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @return {number[]}
     */
    findMinHeightTrees(n, edges) {
        if (n === 1) return [0];

        const adj = Array.from({ length: n }, () => []);

        for (const [n1, n2] of edges) {
            adj[n1].push(n2);
            adj[n2].push(n1);
        }

        const edgeCnt = Array(n).fill(0);
        const leaves = new Queue();

        for (let i = 0; i < n; i++) {
            edgeCnt[i] = adj[i].length;
            if (adj[i].length === 1) {
                leaves.push(i);
            }
        }

        while (!leaves.isEmpty()) {
            if (n <= 2) return leaves.toArray();
            const size = leaves.size();
            for (let i = 0; i < size; i++) {
                const node = leaves.pop();
                n--;
                for (const nei of adj[node]) {
                    edgeCnt[nei]--;
                    if (edgeCnt[nei] === 1) {
                        leaves.push(nei);
                    }
                }
            }
        }

        return [];
    }
}
```

```csharp
public class Solution {
    public List<int> FindMinHeightTrees(int n, int[][] edges) {
        if (n == 1) return new List<int> { 0 };

        var adj = new Dictionary<int, List<int>>();
        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
        }

        foreach (var edge in edges) {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        var edgeCnt = new Dictionary<int, int>();
        var leaves = new Queue<int>();

        foreach (var kvp in adj) {
            edgeCnt[kvp.Key] = kvp.Value.Count;
            if (kvp.Value.Count == 1) {
                leaves.Enqueue(kvp.Key);
            }
        }

        while (leaves.Count > 0) {
            if (n <= 2) return new List<int>(leaves);

            int sz = leaves.Count;
            for (int i = 0; i < sz; i++) {
                int node = leaves.Dequeue();
                n--;
                foreach (int nei in adj[node]) {
                    edgeCnt[nei]--;
                    if (edgeCnt[nei] == 1) {
                        leaves.Enqueue(nei);
                    }
                }
            }
        }

        return new List<int>();
    }
}
```

```go
func findMinHeightTrees(n int, edges [][]int) []int {
    if n == 1 {
        return []int{0}
    }

    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }
    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], edge[1])
        adj[edge[1]] = append(adj[edge[1]], edge[0])
    }

    edgeCnt := make([]int, n)
    leaves := []int{}
    for i := 0; i < n; i++ {
        edgeCnt[i] = len(adj[i])
        if len(adj[i]) == 1 {
            leaves = append(leaves, i)
        }
    }

    for len(leaves) > 0 {
        if n <= 2 {
            return leaves
        }
        size := len(leaves)
        for i := 0; i < size; i++ {
            node := leaves[0]
            leaves = leaves[1:]
            n--
            for _, nei := range adj[node] {
                edgeCnt[nei]--
                if edgeCnt[nei] == 1 {
                    leaves = append(leaves, nei)
                }
            }
        }
    }

    return []int{}
}
```

```kotlin
class Solution {
    fun findMinHeightTrees(n: Int, edges: Array<IntArray>): List<Int> {
        if (n == 1) return listOf(0)

        val adj = Array(n) { mutableListOf<Int>() }
        for (edge in edges) {
            adj[edge[0]].add(edge[1])
            adj[edge[1]].add(edge[0])
        }

        val edgeCnt = IntArray(n)
        val leaves = ArrayDeque<Int>()
        for (i in 0 until n) {
            edgeCnt[i] = adj[i].size
            if (adj[i].size == 1) leaves.add(i)
        }

        var remaining = n
        while (leaves.isNotEmpty()) {
            if (remaining <= 2) return leaves.toList()
            val size = leaves.size
            repeat(size) {
                val node = leaves.removeFirst()
                remaining--
                for (nei in adj[node]) {
                    edgeCnt[nei]--
                    if (edgeCnt[nei] == 1) leaves.add(nei)
                }
            }
        }

        return emptyList()
    }
}
```

```swift
class Solution {
    func findMinHeightTrees(_ n: Int, _ edges: [[Int]]) -> [Int] {
        if n == 1 { return [0] }

        var adj = [[Int]](repeating: [], count: n)
        for edge in edges {
            adj[edge[0]].append(edge[1])
            adj[edge[1]].append(edge[0])
        }

        var edgeCnt = [Int](repeating: 0, count: n)
        var leaves = [Int]()
        for i in 0..<n {
            edgeCnt[i] = adj[i].count
            if adj[i].count == 1 {
                leaves.append(i)
            }
        }

        var remaining = n
        while !leaves.isEmpty {
            if remaining <= 2 { return leaves }
            let size = leaves.count
            for _ in 0..<size {
                let node = leaves.removeFirst()
                remaining -= 1
                for nei in adj[node] {
                    edgeCnt[nei] -= 1
                    if edgeCnt[nei] == 1 {
                        leaves.append(nei)
                    }
                }
            }
        }

        return []
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## Common Pitfalls

### Forgetting the Single Node Edge Case

When `n = 1`, there are no edges and the only node `0` is trivially the root of a minimum height tree. Many solutions fail to handle this case, leading to empty results or index errors when trying to process an empty edge list.

### Using a Visited Set Instead of Parent Tracking in DFS

In tree traversal, using a full visited set is unnecessary overhead. Since trees have no cycles, simply passing the parent node to avoid revisiting the previous node is sufficient and more efficient. Using a visited set can also cause issues if not cleared properly between multiple DFS calls.

### Incorrectly Implementing Leaf Removal in Topological Sort

When peeling leaves layer by layer, a common mistake is modifying the degree array while iterating over the current batch of leaves. This can cause nodes to be processed prematurely or skipped entirely. Always process all current-level leaves before updating degrees for the next level.
