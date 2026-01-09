## 1. Depth First Search

::tabs-start

```python
class Solution:
    
    # We don't use the state WHITE as such anywhere. Instead, the "null" value in the states array below is a substitute for WHITE.
    GRAY = 1
    BLACK = 2

    def leadsToDestination(self, n: int, edges: List[List[int]], source: int, destination: int) -> bool:
        graph = self.buildDigraph(n, edges)
        return self.leadsToDest(graph, source, destination, [None] * n)
        
    def leadsToDest(self, graph, node, dest, states):
        
        # If the state is GRAY, this is a backward edge and hence, it creates a Loop.
        if states[node] != None:
            return states[node] == Solution.BLACK
        
        # If this is a leaf node, it should be equal to the destination.
        if len(graph[node]) == 0:
            return node == dest
        
        # Now, we are processing this node. So we mark it as GRAY.
        states[node] = Solution.GRAY
        
        for next_node in graph[node]:
            
            # If we get a `false` from any recursive call on the neighbors, we short circuit and return from there.
            if not self.leadsToDest(graph, next_node, dest, states):
                return False
        
        # Recursive processing done for the node. We mark it BLACK.
        states[node] = Solution.BLACK
        return True
        
    def buildDigraph(self, n, edges):
        graph = [[] for _ in range(n)]
        
        for edge in edges:
            graph[edge[0]].append(edge[1])
            
        return graph   
```

```java
class Solution {
    
    // We don't use the state WHITE as such anywhere. Instead, the "null" value in the states array below is a substitute for WHITE.
    enum Color { GRAY, BLACK };
    
    public boolean leadsToDestination(int n, int[][] edges, int source, int destination) {
        
        List<Integer>[] graph = buildDigraph(n, edges);
        return leadsToDest(graph, source, destination, new Color[n]);
    }
    
    private boolean leadsToDest(List<Integer>[] graph, int node, int dest, Color[] states) {
        
        // If the state is GRAY, this is a backward edge and hence, it creates a loop.
        if (states[node] != null) {
            return states[node] == Color.BLACK;
        }
        
        // If this is a leaf node, it should be equal to the destination.
        if (graph[node].isEmpty()) {
            return node == dest;
        }
        
        // Now, we are processing this node. So we mark it as GRAY
        states[node] = Color.GRAY;
        
        for (int next : graph[node]) {
            
            // If we get a `false` from any recursive call on the neighbors, we short circuit and return from there.
            if (!leadsToDest(graph, next, dest, states)) {
                return false;
            }
        }
        
        // Recursive processing done for the node. We mark it BLACK
        states[node] = Color.BLACK;
        return true;
    }
    
    private List<Integer>[] buildDigraph(int n, int[][] edges) {
        List<Integer>[] graph = new List[n];
        for (int i = 0; i < n; i++) {
            graph[i] = new ArrayList<>();
        }
        
        for (int[] edge : edges) {
            graph[edge[0]].add(edge[1]);
        }
        
        return graph;
    }
}
```

```cpp
class Solution {
public:
    static const int GRAY = 1;
    static const int BLACK = 2;
    
    bool leadsToDestination(int n, vector<vector<int>>& edges, int source, int destination) {
        vector<vector<int>> graph = buildDigraph(n, edges);
        vector<int> states(n, 0);
        return leadsToDest(graph, source, destination, states);
    }
    
private:
    bool leadsToDest(vector<vector<int>>& graph, int node, int dest, vector<int>& states) {
        if (states[node] != 0) {
            return states[node] == BLACK;
        }
        if (graph[node].size() == 0) {
            return node == dest;
        }
        states[node] = GRAY;
        for (int next_node : graph[node]) {
            if (!leadsToDest(graph, next_node, dest, states)) {
                return false;
            }
        }
        states[node] = BLACK;
        return true;
    }
    
    vector<vector<int>> buildDigraph(int n, vector<vector<int>>& edges) {
        vector<vector<int>> graph(n);
        for (auto& edge : edges) {
            graph[edge[0]].push_back(edge[1]);
        }
        return graph;
    }
};
```

```javascript
class Solution {
    static GRAY = 1;
    static BLACK = 2;

    /**
     * @param {number} n
     * @param {number[][]} edges
     * @param {number} source
     * @param {number} destination
     * @return {boolean}
     */
    leadsToDestination(n, edges, source, destination) {
        const graph = this.buildDigraph(n, edges);
        const states = new Array(n).fill(null);
        return this.leadsToDest(graph, source, destination, states);
    }

    /**
     * @param {number[][]} graph
     * @param {number} node
     * @param {number} dest
     * @param {(number|null)[]} states
     * @return {boolean}
     */
    leadsToDest(graph, node, dest, states) {
        if (states[node] !== null) {
            return states[node] === Solution.BLACK;
        }
        if (graph[node].length === 0) {
            return node === dest;
        }
        states[node] = Solution.GRAY;
        for (const next_node of graph[node]) {
            if (!this.leadsToDest(graph, next_node, dest, states)) {
                return false;
            }
        }
        states[node] = Solution.BLACK;
        return true;
    }

    /**
     * @param {number} n
     * @param {number[][]} edges
     * @return {number[][]}
     */
    buildDigraph(n, edges) {
        const graph = Array.from({ length: n }, () => []);
        for (const edge of edges) {
            graph[edge[0]].push(edge[1]);
        }
        return graph;
    }
}
```

```csharp
public class Solution {
    private const int GRAY = 1;
    private const int BLACK = 2;

    public bool LeadsToDestination(int n, int[][] edges, int source, int destination) {
        List<int>[] graph = BuildDigraph(n, edges);
        int?[] states = new int?[n];
        return LeadsToDest(graph, source, destination, states);
    }

    private bool LeadsToDest(List<int>[] graph, int node, int dest, int?[] states) {
        if (states[node] != null) {
            return states[node] == BLACK;
        }
        if (graph[node].Count == 0) {
            return node == dest;
        }
        states[node] = GRAY;
        foreach (int nextNode in graph[node]) {
            if (!LeadsToDest(graph, nextNode, dest, states)) {
                return false;
            }
        }
        states[node] = BLACK;
        return true;
    }

    private List<int>[] BuildDigraph(int n, int[][] edges) {
        List<int>[] graph = new List<int>[n];
        for (int i = 0; i < n; i++) {
            graph[i] = new List<int>();
        }
        foreach (int[] edge in edges) {
            graph[edge[0]].Add(edge[1]);
        }
        return graph;
    }
}
```

```go
func leadsToDestination(n int, edges [][]int, source int, destination int) bool {
    const GRAY, BLACK = 1, 2

    graph := make([][]int, n)
    for i := range graph {
        graph[i] = []int{}
    }
    for _, edge := range edges {
        graph[edge[0]] = append(graph[edge[0]], edge[1])
    }

    states := make([]int, n)

    var leadsToDest func(node int) bool
    leadsToDest = func(node int) bool {
        if states[node] != 0 {
            return states[node] == BLACK
        }
        if len(graph[node]) == 0 {
            return node == destination
        }
        states[node] = GRAY
        for _, nextNode := range graph[node] {
            if !leadsToDest(nextNode) {
                return false
            }
        }
        states[node] = BLACK
        return true
    }

    return leadsToDest(source)
}
```

```kotlin
class Solution {
    companion object {
        private const val GRAY = 1
        private const val BLACK = 2
    }

    fun leadsToDestination(n: Int, edges: Array<IntArray>, source: Int, destination: Int): Boolean {
        val graph = Array(n) { mutableListOf<Int>() }
        for (edge in edges) {
            graph[edge[0]].add(edge[1])
        }

        val states = IntArray(n)

        fun leadsToDest(node: Int): Boolean {
            if (states[node] != 0) {
                return states[node] == BLACK
            }
            if (graph[node].isEmpty()) {
                return node == destination
            }
            states[node] = GRAY
            for (nextNode in graph[node]) {
                if (!leadsToDest(nextNode)) {
                    return false
                }
            }
            states[node] = BLACK
            return true
        }

        return leadsToDest(source)
    }
}
```

```swift
class Solution {
    private let GRAY = 1
    private let BLACK = 2

    func leadsToDestination(_ n: Int, _ edges: [[Int]], _ source: Int, _ destination: Int) -> Bool {
        var graph = [[Int]](repeating: [], count: n)
        for edge in edges {
            graph[edge[0]].append(edge[1])
        }

        var states = [Int](repeating: 0, count: n)

        func leadsToDest(_ node: Int) -> Bool {
            if states[node] != 0 {
                return states[node] == BLACK
            }
            if graph[node].isEmpty {
                return node == destination
            }
            states[node] = GRAY
            for nextNode in graph[node] {
                if !leadsToDest(nextNode) {
                    return false
                }
            }
            states[node] = BLACK
            return true
        }

        return leadsToDest(source)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - Typically for an entire DFS over an input graph, it takes $O(V + E)$ where $V$ represents the number of vertices in the graph and likewise, $E$ represents the number of edges in the graph. In the worst case $E$ can be $O(V^2)$ in case each vertex is connected to every other vertex in the graph. However even in the worst case, we will end up discovering a cycle very early on and prune the recursion tree. If we were to traverse the entire graph, then the complexity would be $O(V^2)$ as the $O(E)$ part would dominate. However, due to pruning and backtracking in case of cycle detection, we end up with an overall time complexity of $O(V)$.

- Space complexity: $O(V + E)$
    - Where $O(E)$ is occupied by the adjacency list and $O(V)$ is occupied by the recursion stack and the color states.

>  Where $V$ represents the number of vertices in the graph and $E$ represents the number of edges in the graph.

---

### Why not Breadth-First Search?

From this [Stack Overflow](https://stackoverflow.com/questions/2869647/why-dfs-and-not-bfs-for-finding-cycle-in-graphs) answer:

> A BFS could be reasonable if the graph is undirected (be my guest at showing an efficient algorithm using BFS that would report the cycles in a directed graph!), where each cross edge defines a cycle (edge going from a node to an already visited node). If the cross edge is `{v1, v2}`, and the root (in the BFS tree) that contains those nodes is `r`, then the cycle is `r ~ v1 - v2 ~ r` (~ is a path, - a single edge), which can be reported almost as easily as in DFS.
>
> The only reason to use a BFS would be if you know your (undirected) graph is going to have long paths and small path cover (in other words, deep and narrow). In that case, BFS would require proportionally less memory for its queue than DFS' stack (both still linear of course).
>
> In all other cases, DFS is clearly the winner.
