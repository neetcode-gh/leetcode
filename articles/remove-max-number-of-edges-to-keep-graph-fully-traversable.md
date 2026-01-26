## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Union-Find (Disjoint Set Union)** - Implementing DSU with path compression and union by rank for efficient component tracking
- **Graph Connectivity** - Understanding when a graph is fully connected (single component)
- **Greedy Algorithms** - Processing edges in optimal order to maximize removable edges
- **Multiple Data Structures** - Maintaining separate Union-Find structures for different constraints

---

## 1. Disjoint Set Union

### Intuition

We need to keep both Alice and Bob connected across all nodes while removing as many edges as possible.
Type 3 edges (usable by both) are most valuable since they count toward connectivity for both users simultaneously.
We use two separate Union-Find structures to track connectivity for Alice and Bob independently.
By processing type 3 edges first, we maximize their usage, then fill in gaps with type 1 (Alice-only) and type 2 (Bob-only) edges.

### Algorithm

1. Create two separate DSU (Disjoint Set Union) structures, one for Alice and one for Bob.
2. First pass: process all type `3` edges. For each edge, attempt to union in both DSUs. Count it as used if it connects new components in either DSU.
3. Second pass: process type `1` edges (Alice only) and type `2` edges (Bob only). For each edge, attempt to union in the appropriate DSU and count if successful.
4. After processing all edges, check if both DSUs have all nodes connected (single component).
5. If both are fully connected, return `total_edges - used_edges`. Otherwise, return `-1`.

::tabs-start

```python
class DSU:
    def __init__(self, n):
        self.n = n
        self.Parent = list(range(n + 1))
        self.Size = [1] * (n + 1)

    def find(self, node):
        if self.Parent[node] != node:
            self.Parent[node] = self.find(self.Parent[node])
        return self.Parent[node]

    def union(self, u, v):
        pu = self.find(u)
        pv = self.find(v)
        if pu == pv:
            return 0
        if self.Size[pu] < self.Size[pv]:
            pu, pv = pv, pu
        self.Size[pu] += self.Size[pv]
        self.Parent[pv] = pu
        self.n -= 1
        return 1

    def isConnected(self):
        return self.n == 1

class Solution:
    def maxNumEdgesToRemove(self, n: int, edges: List[List[int]]) -> int:
        alice, bob = DSU(n), DSU(n)
        cnt = 0

        for type, src, dst in edges:
            if type == 3:
                cnt += (alice.union(src, dst) | bob.union(src, dst))

        for type, src, dst in edges:
            if type == 1:
                cnt += alice.union(src, dst)
            elif type == 2:
                cnt += bob.union(src, dst)

        if alice.isConnected() and bob.isConnected():
            return len(edges) - cnt
        return -1
```

```java
class DSU {
    private int[] parent, size;
    private int n;

    public DSU(int n) {
        this.n = n;
        parent = new int[n + 1];
        size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }

    public int find(int node) {
        if (parent[node] != node) {
            parent[node] = find(parent[node]);
        }
        return parent[node];
    }

    public int union(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) {
            return 0;
        }
        if (size[pu] < size[pv]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        size[pu] += size[pv];
        parent[pv] = pu;
        n--;
        return 1;
    }

    public boolean isConnected() {
        return n == 1;
    }
}

public class Solution {
    public int maxNumEdgesToRemove(int n, int[][] edges) {
        DSU alice = new DSU(n), bob = new DSU(n);
        int cnt = 0;

        for (int[] edge : edges) {
            if (edge[0] == 3) {
                cnt += (alice.union(edge[1], edge[2]) | bob.union(edge[1], edge[2]));
            }
        }

        for (int[] edge : edges) {
            if (edge[0] == 1) {
                cnt += alice.union(edge[1], edge[2]);
            } else if (edge[0] == 2) {
                cnt += bob.union(edge[1], edge[2]);
            }
        }

        if (alice.isConnected() && bob.isConnected()) {
            return edges.length - cnt;
        }
        return -1;
    }
}
```

```cpp
class DSU {
private:
    vector<int> parent, size;
    int n;

public:
    DSU(int n) : n(n), parent(n + 1), size(n + 1, 1) {
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
        }
    }

    int find(int node) {
        if (parent[node] != node) {
            parent[node] = find(parent[node]);
        }
        return parent[node];
    }

    int unionSets(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) {
            return 0;
        }
        if (size[pu] < size[pv]) {
            swap(pu, pv);
        }
        size[pu] += size[pv];
        parent[pv] = pu;
        n--;
        return 1;
    }

    bool isConnected() {
        return n == 1;
    }
};

class Solution {
public:
    int maxNumEdgesToRemove(int n, vector<vector<int>>& edges) {
        DSU alice(n), bob(n);
        int cnt = 0;

        for (auto& edge : edges) {
            if (edge[0] == 3) {
                cnt += (alice.unionSets(edge[1], edge[2]) | bob.unionSets(edge[1], edge[2]));
            }
        }

        for (auto& edge : edges) {
            if (edge[0] == 1) {
                cnt += alice.unionSets(edge[1], edge[2]);
            } else if (edge[0] == 2) {
                cnt += bob.unionSets(edge[1], edge[2]);
            }
        }

        if (alice.isConnected() && bob.isConnected()) {
            return edges.size() - cnt;
        }
        return -1;
    }
};
```

```javascript
class DSU {
    /**
     * @param {number} n
     */
    constructor(n) {
        this.n = n;
        this.parent = Array(n + 1)
            .fill(0)
            .map((_, i) => i);
        this.size = Array(n + 1).fill(1);
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node) {
        if (this.parent[node] !== node) {
            this.parent[node] = this.find(this.parent[node]);
        }
        return this.parent[node];
    }

    /**
     * @param {number} u
     * @param {number} v
     * @return {number}
     */
    union(u, v) {
        let pu = this.find(u),
            pv = this.find(v);
        if (pu === pv) {
            return 0;
        }
        if (this.size[pu] < this.size[pv]) {
            [pu, pv] = [pv, pu];
        }
        this.size[pu] += this.size[pv];
        this.parent[pv] = pu;
        this.n--;
        return 1;
    }

    /**
     * @return {boolean}
     */
    isConnected() {
        return this.n === 1;
    }
}

class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @return {number}
     */
    maxNumEdgesToRemove(n, edges) {
        let alice = new DSU(n),
            bob = new DSU(n);
        let cnt = 0;

        for (let [type, src, dst] of edges) {
            if (type === 3) {
                cnt += alice.union(src, dst) | bob.union(src, dst);
            }
        }

        for (let [type, src, dst] of edges) {
            if (type === 1) {
                cnt += alice.union(src, dst);
            } else if (type === 2) {
                cnt += bob.union(src, dst);
            }
        }

        return alice.isConnected() && bob.isConnected()
            ? edges.length - cnt
            : -1;
    }
}
```

```csharp
public class DSU {
    private int[] parent, size;
    private int n;

    public DSU(int n) {
        this.n = n;
        parent = new int[n + 1];
        size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }

    public int Find(int node) {
        if (parent[node] != node) {
            parent[node] = Find(parent[node]);
        }
        return parent[node];
    }

    public int Union(int u, int v) {
        int pu = Find(u), pv = Find(v);
        if (pu == pv) {
            return 0;
        }
        if (size[pu] < size[pv]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        size[pu] += size[pv];
        parent[pv] = pu;
        n--;
        return 1;
    }

    public bool IsConnected() {
        return n == 1;
    }
}

public class Solution {
    public int MaxNumEdgesToRemove(int n, int[][] edges) {
        DSU alice = new DSU(n), bob = new DSU(n);
        int cnt = 0;

        foreach (var edge in edges) {
            if (edge[0] == 3) {
                cnt += (alice.Union(edge[1], edge[2]) | bob.Union(edge[1], edge[2]));
            }
        }

        foreach (var edge in edges) {
            if (edge[0] == 1) {
                cnt += alice.Union(edge[1], edge[2]);
            } else if (edge[0] == 2) {
                cnt += bob.Union(edge[1], edge[2]);
            }
        }

        if (alice.IsConnected() && bob.IsConnected()) {
            return edges.Length - cnt;
        }
        return -1;
    }
}
```

```go
type DSU struct {
    parent []int
    size   []int
    n      int
}

func NewDSU(n int) *DSU {
    parent := make([]int, n+1)
    size := make([]int, n+1)
    for i := 0; i <= n; i++ {
        parent[i] = i
        size[i] = 1
    }
    return &DSU{parent: parent, size: size, n: n}
}

func (d *DSU) Find(node int) int {
    if d.parent[node] != node {
        d.parent[node] = d.Find(d.parent[node])
    }
    return d.parent[node]
}

func (d *DSU) Union(u, v int) int {
    pu, pv := d.Find(u), d.Find(v)
    if pu == pv {
        return 0
    }
    if d.size[pu] < d.size[pv] {
        pu, pv = pv, pu
    }
    d.size[pu] += d.size[pv]
    d.parent[pv] = pu
    d.n--
    return 1
}

func (d *DSU) IsConnected() bool {
    return d.n == 1
}

func maxNumEdgesToRemove(n int, edges [][]int) int {
    alice, bob := NewDSU(n), NewDSU(n)
    cnt := 0

    for _, edge := range edges {
        if edge[0] == 3 {
            a := alice.Union(edge[1], edge[2])
            b := bob.Union(edge[1], edge[2])
            if a == 1 || b == 1 {
                cnt++
            }
        }
    }

    for _, edge := range edges {
        if edge[0] == 1 {
            cnt += alice.Union(edge[1], edge[2])
        } else if edge[0] == 2 {
            cnt += bob.Union(edge[1], edge[2])
        }
    }

    if alice.IsConnected() && bob.IsConnected() {
        return len(edges) - cnt
    }
    return -1
}
```

```kotlin
class DSU(n: Int) {
    private val parent = IntArray(n + 1) { it }
    private val size = IntArray(n + 1) { 1 }
    private var n = n

    fun find(node: Int): Int {
        if (parent[node] != node) {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    fun union(u: Int, v: Int): Int {
        var pu = find(u)
        var pv = find(v)
        if (pu == pv) {
            return 0
        }
        if (size[pu] < size[pv]) {
            val temp = pu
            pu = pv
            pv = temp
        }
        size[pu] += size[pv]
        parent[pv] = pu
        n--
        return 1
    }

    fun isConnected(): Boolean {
        return n == 1
    }
}

class Solution {
    fun maxNumEdgesToRemove(n: Int, edges: Array<IntArray>): Int {
        val alice = DSU(n)
        val bob = DSU(n)
        var cnt = 0

        for (edge in edges) {
            if (edge[0] == 3) {
                cnt += (alice.union(edge[1], edge[2]) or bob.union(edge[1], edge[2]))
            }
        }

        for (edge in edges) {
            if (edge[0] == 1) {
                cnt += alice.union(edge[1], edge[2])
            } else if (edge[0] == 2) {
                cnt += bob.union(edge[1], edge[2])
            }
        }

        return if (alice.isConnected() && bob.isConnected()) {
            edges.size - cnt
        } else {
            -1
        }
    }
}
```

```swift
class DSU {
    private var parent: [Int]
    private var size: [Int]
    private var n: Int

    init(_ n: Int) {
        self.n = n
        self.parent = Array(0...n)
        self.size = Array(repeating: 1, count: n + 1)
    }

    func find(_ node: Int) -> Int {
        if parent[node] != node {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    func union(_ u: Int, _ v: Int) -> Int {
        var pu = find(u)
        var pv = find(v)
        if pu == pv {
            return 0
        }
        if size[pu] < size[pv] {
            let temp = pu
            pu = pv
            pv = temp
        }
        size[pu] += size[pv]
        parent[pv] = pu
        n -= 1
        return 1
    }

    func isConnected() -> Bool {
        return n == 1
    }
}

class Solution {
    func maxNumEdgesToRemove(_ n: Int, _ edges: [[Int]]) -> Int {
        let alice = DSU(n)
        let bob = DSU(n)
        var cnt = 0

        for edge in edges {
            if edge[0] == 3 {
                cnt += (alice.union(edge[1], edge[2]) | bob.union(edge[1], edge[2]))
            }
        }

        for edge in edges {
            if edge[0] == 1 {
                cnt += alice.union(edge[1], edge[2])
            } else if edge[0] == 2 {
                cnt += bob.union(edge[1], edge[2])
            }
        }

        if alice.isConnected() && bob.isConnected() {
            return edges.count - cnt
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(E * α(V))$
- Space complexity: $O(V)$

> Where $V$ is the number of verticies and $E$ is the number of edges.

---

## Common Pitfalls

### Processing Type 3 Edges After Type 1 and Type 2

The order of processing matters significantly. Type 3 edges (usable by both Alice and Bob) should be processed first because they provide connectivity to both users with a single edge. If you process type 1 and type 2 edges first, you may use two separate edges to connect nodes that could have been connected by one type 3 edge, resulting in fewer removable edges.

### Using a Single Union-Find Structure for Both Users

Alice and Bob have different connectivity requirements since type 1 edges only work for Alice and type 2 edges only work for Bob. Using a single DSU structure fails to track their independent connectivity. You must maintain two separate Union-Find structures and update them according to which edge types each user can traverse.

### Incorrect Counting of Used Type 3 Edges

When processing a type 3 edge, it counts as "used" if it connects new components for either Alice or Bob (or both). A common mistake is counting it as used only if it helps both, or counting it twice. Use bitwise OR (`|`) on the union results: `alice.union() | bob.union()` returns 1 if the edge was useful for at least one user.

### Not Verifying Full Connectivity for Both Users

After processing all edges, you must verify that both Alice's and Bob's graphs are fully connected (single component each). Returning the edge count without this check can give a valid-looking answer even when full traversal is impossible. If either DSU has more than one component, return `-1`.

### Off-by-One Errors in Component Counting

The Union-Find structure should track the number of connected components, starting at `n` (number of nodes) and decreasing by 1 with each successful union. A graph is fully connected when exactly 1 component remains. Initializing the count incorrectly or not decrementing on successful unions leads to wrong connectivity checks.
