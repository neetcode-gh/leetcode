## 1. Kruskal's Algorithm - I

::tabs-start

```python
class UnionFind:
    def __init__(self, n):
        self.par = [i for i in range(n)]
        self.rank = [1] * n

    def find(self, v1):
        while v1 != self.par[v1]:
            self.par[v1] = self.par[self.par[v1]]
            v1 = self.par[v1]
        return v1

    def union(self, v1, v2):
        p1, p2 = self.find(v1), self.find(v2)
        if p1 == p2:
            return False
        if self.rank[p1] > self.rank[p2]:
            self.par[p2] = p1
            self.rank[p1] += self.rank[p2]
        else:
            self.par[p1] = p2
            self.rank[p2] += self.rank[p1]
        return True


class Solution:
    def findCriticalAndPseudoCriticalEdges(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        for i, e in enumerate(edges):
            e.append(i)  # [v1, v2, weight, original_index]

        edges.sort(key=lambda e: e[2])

        mst_weight = 0
        uf = UnionFind(n)
        for v1, v2, w, i in edges:
            if uf.union(v1, v2):
                mst_weight += w

        critical, pseudo = [], []
        for n1, n2, e_weight, i in edges:
            # Try without curr edge
            weight = 0
            uf = UnionFind(n)
            for v1, v2, w, j in edges:
                if i != j and uf.union(v1, v2):
                    weight += w
            if max(uf.rank) != n or weight > mst_weight:
                critical.append(i)
                continue

            # Try with curr edge
            uf = UnionFind(n)
            uf.union(n1, n2)
            weight = e_weight
            for v1, v2, w, j in edges:
                if uf.union(v1, v2):
                    weight += w
            if weight == mst_weight:
                pseudo.append(i)
        return [critical, pseudo]
```

```java
class UnionFind {
    int[] par, rank;

    public UnionFind(int n) {
        par = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            par[i] = i;
            rank[i] = 1;
        }
    }

    public int find(int v) {
        if (par[v] != v) {
            par[v] = find(par[v]);
        }
        return par[v];
    }

    public boolean union(int v1, int v2) {
        int p1 = find(v1), p2 = find(v2);
        if (p1 == p2) return false;
        if (rank[p1] > rank[p2]) {
            par[p2] = p1;
            rank[p1] += rank[p2];
        } else {
            par[p1] = p2;
            rank[p2] += rank[p1];
        }
        return true;
    }
}

public class Solution {
    public List<List<Integer>> findCriticalAndPseudoCriticalEdges(int n, int[][] edges) {
        List<int[]> edgeList = new ArrayList<>();
        for (int i = 0; i < edges.length; i++) {
            edgeList.add(new int[] { edges[i][0], edges[i][1], edges[i][2], i });
        }

        edgeList.sort(Comparator.comparingInt(a -> a[2]));

        int mstWeight = 0;
        UnionFind uf = new UnionFind(n);
        for (int[] edge : edgeList) {
            if (uf.union(edge[0], edge[1])) {
                mstWeight += edge[2];
            }
        }

        List<Integer> critical = new ArrayList<>();
        List<Integer> pseudo = new ArrayList<>();

        for (int[] edge : edgeList) {
            // Try without current edge
            UnionFind ufWithout = new UnionFind(n);
            int weight = 0;
            for (int[] other : edgeList) {
                if (other[3] != edge[3] && ufWithout.union(other[0], other[1])) {
                    weight += other[2];
                }
            }
            if (Arrays.stream(ufWithout.rank).max().getAsInt() != n || weight > mstWeight) {
                critical.add(edge[3]);
                continue;
            }

            // Try with current edge
            UnionFind ufWith = new UnionFind(n);
            ufWith.union(edge[0], edge[1]);
            weight = edge[2];
            for (int[] other : edgeList) {
                if (ufWith.union(other[0], other[1])) {
                    weight += other[2];
                }
            }
            if (weight == mstWeight) {
                pseudo.add(edge[3]);
            }
        }

        return Arrays.asList(critical, pseudo);
    }
}
```

```cpp
class UnionFind {
public:
    vector<int> par, rank;

    UnionFind(int n) : par(n), rank(n, 1) {
        iota(par.begin(), par.end(), 0);
    }

    int find(int v) {
        if (v != par[v]) {
            par[v] = find(par[v]);
        }
        return par[v];
    }

    bool unionSets(int v1, int v2) {
        int p1 = find(v1), p2 = find(v2);
        if (p1 == p2) return false;
        if (rank[p1] > rank[p2]) {
            par[p2] = p1;
            rank[p1] += rank[p2];
        } else {
            par[p1] = p2;
            rank[p2] += rank[p1];
        }
        return true;
    }
};

class Solution {
public:
    vector<vector<int>> findCriticalAndPseudoCriticalEdges(int n, vector<vector<int>>& edges) {
        vector<array<int, 4>> edgeList;
        for (int i = 0; i < edges.size(); ++i) {
            edgeList.push_back({ edges[i][0], edges[i][1], edges[i][2], i });
        }

        sort(edgeList.begin(), edgeList.end(), [](auto& a, auto& b) {
            return a[2] < b[2];
        });

        int mstWeight = 0;
        UnionFind uf(n);
        for (auto& edge : edgeList) {
            if (uf.unionSets(edge[0], edge[1])) {
                mstWeight += edge[2];
            }
        }

        vector<int> critical, pseudo;
        for (auto& edge : edgeList) {
            // Try without current edge
            UnionFind ufWithout(n);
            int weight = 0;
            for (auto& other : edgeList) {
                if (other[3] != edge[3] && ufWithout.unionSets(other[0], other[1])) {
                    weight += other[2];
                }
            }
            if (*max_element(ufWithout.rank.begin(), ufWithout.rank.end()) != n || weight > mstWeight) {
                critical.push_back(edge[3]);
                continue;
            }

            // Try with current edge
            UnionFind ufWith(n);
            ufWith.unionSets(edge[0], edge[1]);
            weight = edge[2];
            for (auto& other : edgeList) {
                if (ufWith.unionSets(other[0], other[1])) {
                    weight += other[2];
                }
            }
            if (weight == mstWeight) {
                pseudo.push_back(edge[3]);
            }
        }

        return { critical, pseudo };
    }
};
```

```javascript
class UnionFind {
    /**
     * @constructor
     * @param {number} n
     */
    constructor(n) {
        this.par = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(1);
    }

    /**
     * @param {number} v1
     * @return {number}
     */
    find(v1) {
        if (this.par[v1] !== v1) {
            this.par[v1] = this.find(this.par[v1]);
        }
        return this.par[v1];
    }

    /**
     * @param {number} v1
     * @param {number} v2
     * @return {boolean}
     */
    union(v1, v2) {
        const p1 = this.find(v1),
            p2 = this.find(v2);
        if (p1 === p2) return false;
        if (this.rank[p1] > this.rank[p2]) {
            this.par[p2] = p1;
            this.rank[p1] += this.rank[p2];
        } else {
            this.par[p1] = p2;
            this.rank[p2] += this.rank[p1];
        }
        return true;
    }
}

class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @return {number[][]}
     */
    findCriticalAndPseudoCriticalEdges(n, edges) {
        edges = edges.map((edge, idx) => [...edge, idx]);
        edges.sort((a, b) => a[2] - b[2]);

        const uf = new UnionFind(n);
        let mstWeight = 0;
        for (const [v1, v2, w] of edges) {
            if (uf.union(v1, v2)) {
                mstWeight += w;
            }
        }

        const critical = [];
        const pseudo = [];

        for (const [n1, n2, weight, i] of edges) {
            // Try without current edge
            const ufWithout = new UnionFind(n);
            let weightWithout = 0;
            for (const [v1, v2, w, j] of edges) {
                if (j !== i && ufWithout.union(v1, v2)) {
                    weightWithout += w;
                }
            }
            if (
                Math.max(...ufWithout.rank) !== n ||
                weightWithout > mstWeight
            ) {
                critical.push(i);
                continue;
            }

            // Try with current edge
            const ufWith = new UnionFind(n);
            ufWith.union(n1, n2);
            let weightWith = weight;
            for (const [v1, v2, w, j] of edges) {
                if (ufWith.union(v1, v2)) {
                    weightWith += w;
                }
            }
            if (weightWith === mstWeight) {
                pseudo.push(i);
            }
        }

        return [critical, pseudo];
    }
}
```

```csharp
public class UnionFind {
    private int[] parent, rank;

    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 1;
        }
    }

    public int Find(int x) {
        if (parent[x] != x) {
            parent[x] = Find(parent[x]);
        }
        return parent[x];
    }

    public bool Union(int x, int y) {
        int px = Find(x), py = Find(y);
        if (px == py) return false;

        if (rank[px] > rank[py]) {
            parent[py] = px;
            rank[px] += rank[py];
        } else {
            parent[px] = py;
            rank[py] += rank[px];
        }

        return true;
    }

    public int[] GetRanks() {
        return rank;
    }
}

public class Solution {
    public List<List<int>> FindCriticalAndPseudoCriticalEdges(int n, int[][] edges) {
        var edgeList = new List<int[]>();
        for (int i = 0; i < edges.Length; i++) {
            edgeList.Add(new int[] { edges[i][0], edges[i][1], edges[i][2], i });
        }

        edgeList.Sort((a, b) => a[2].CompareTo(b[2]));

        int mstWeight = 0;
        var uf = new UnionFind(n);
        foreach (var edge in edgeList) {
            if (uf.Union(edge[0], edge[1])) {
                mstWeight += edge[2];
            }
        }

        var critical = new List<int>();
        var pseudo = new List<int>();

        foreach (var edge in edgeList) {
            var ufWithout = new UnionFind(n);
            int weight = 0;
            foreach (var other in edgeList) {
                if (other[3] != edge[3] && ufWithout.Union(other[0], other[1])) {
                    weight += other[2];
                }
            }

            if (ufWithout.GetRanks().Max() != n || weight > mstWeight) {
                critical.Add(edge[3]);
                continue;
            }

            var ufWith = new UnionFind(n);
            ufWith.Union(edge[0], edge[1]);
            weight = edge[2];
            foreach (var other in edgeList) {
                if (other[3] != edge[3] && ufWith.Union(other[0], other[1])) {
                    weight += other[2];
                }
            }

            if (weight == mstWeight) {
                pseudo.Add(edge[3]);
            }
        }

        return new List<List<int>> { critical, pseudo };
    }
}
```

```go
type UnionFind struct {
    par  []int
    rank []int
}

func NewUnionFind(n int) *UnionFind {
    par := make([]int, n)
    rank := make([]int, n)
    for i := 0; i < n; i++ {
        par[i] = i
        rank[i] = 1
    }
    return &UnionFind{par: par, rank: rank}
}

func (uf *UnionFind) Find(v int) int {
    if uf.par[v] != v {
        uf.par[v] = uf.Find(uf.par[v])
    }
    return uf.par[v]
}

func (uf *UnionFind) Union(v1, v2 int) bool {
    p1, p2 := uf.Find(v1), uf.Find(v2)
    if p1 == p2 {
        return false
    }
    if uf.rank[p1] > uf.rank[p2] {
        uf.par[p2] = p1
        uf.rank[p1] += uf.rank[p2]
    } else {
        uf.par[p1] = p2
        uf.rank[p2] += uf.rank[p1]
    }
    return true
}

func (uf *UnionFind) MaxRank() int {
    maxR := 0
    for _, r := range uf.rank {
        if r > maxR {
            maxR = r
        }
    }
    return maxR
}

func findCriticalAndPseudoCriticalEdges(n int, edges [][]int) [][]int {
    edgeList := make([][4]int, len(edges))
    for i, e := range edges {
        edgeList[i] = [4]int{e[0], e[1], e[2], i}
    }

    sort.Slice(edgeList, func(i, j int) bool {
        return edgeList[i][2] < edgeList[j][2]
    })

    mstWeight := 0
    uf := NewUnionFind(n)
    for _, edge := range edgeList {
        if uf.Union(edge[0], edge[1]) {
            mstWeight += edge[2]
        }
    }

    var critical, pseudo []int
    for _, edge := range edgeList {
        // Try without current edge
        ufWithout := NewUnionFind(n)
        weight := 0
        for _, other := range edgeList {
            if other[3] != edge[3] && ufWithout.Union(other[0], other[1]) {
                weight += other[2]
            }
        }
        if ufWithout.MaxRank() != n || weight > mstWeight {
            critical = append(critical, edge[3])
            continue
        }

        // Try with current edge
        ufWith := NewUnionFind(n)
        ufWith.Union(edge[0], edge[1])
        weight = edge[2]
        for _, other := range edgeList {
            if ufWith.Union(other[0], other[1]) {
                weight += other[2]
            }
        }
        if weight == mstWeight {
            pseudo = append(pseudo, edge[3])
        }
    }

    return [][]int{critical, pseudo}
}
```

```kotlin
class UnionFind(n: Int) {
    val par = IntArray(n) { it }
    val rank = IntArray(n) { 1 }

    fun find(v: Int): Int {
        if (par[v] != v) {
            par[v] = find(par[v])
        }
        return par[v]
    }

    fun union(v1: Int, v2: Int): Boolean {
        val p1 = find(v1)
        val p2 = find(v2)
        if (p1 == p2) return false
        if (rank[p1] > rank[p2]) {
            par[p2] = p1
            rank[p1] += rank[p2]
        } else {
            par[p1] = p2
            rank[p2] += rank[p1]
        }
        return true
    }

    fun maxRank(): Int = rank.maxOrNull() ?: 0
}

class Solution {
    fun findCriticalAndPseudoCriticalEdges(n: Int, edges: Array<IntArray>): List<List<Int>> {
        val edgeList = edges.mapIndexed { i, e ->
            intArrayOf(e[0], e[1], e[2], i)
        }.sortedBy { it[2] }

        var mstWeight = 0
        val uf = UnionFind(n)
        for (edge in edgeList) {
            if (uf.union(edge[0], edge[1])) {
                mstWeight += edge[2]
            }
        }

        val critical = mutableListOf<Int>()
        val pseudo = mutableListOf<Int>()

        for (edge in edgeList) {
            // Try without current edge
            val ufWithout = UnionFind(n)
            var weight = 0
            for (other in edgeList) {
                if (other[3] != edge[3] && ufWithout.union(other[0], other[1])) {
                    weight += other[2]
                }
            }
            if (ufWithout.maxRank() != n || weight > mstWeight) {
                critical.add(edge[3])
                continue
            }

            // Try with current edge
            val ufWith = UnionFind(n)
            ufWith.union(edge[0], edge[1])
            weight = edge[2]
            for (other in edgeList) {
                if (ufWith.union(other[0], other[1])) {
                    weight += other[2]
                }
            }
            if (weight == mstWeight) {
                pseudo.add(edge[3])
            }
        }

        return listOf(critical, pseudo)
    }
}
```

```swift
class UnionFind {
    var par: [Int]
    var rank: [Int]

    init(_ n: Int) {
        par = Array(0..<n)
        rank = Array(repeating: 1, count: n)
    }

    func find(_ v: Int) -> Int {
        if par[v] != v {
            par[v] = find(par[v])
        }
        return par[v]
    }

    func union(_ v1: Int, _ v2: Int) -> Bool {
        let p1 = find(v1), p2 = find(v2)
        if p1 == p2 { return false }
        if rank[p1] > rank[p2] {
            par[p2] = p1
            rank[p1] += rank[p2]
        } else {
            par[p1] = p2
            rank[p2] += rank[p1]
        }
        return true
    }

    func maxRank() -> Int {
        return rank.max() ?? 0
    }
}

class Solution {
    func findCriticalAndPseudoCriticalEdges(_ n: Int, _ edges: [[Int]]) -> [[Int]] {
        var edgeList = edges.enumerated().map { (i, e) in
            [e[0], e[1], e[2], i]
        }.sorted { $0[2] < $1[2] }

        var mstWeight = 0
        let uf = UnionFind(n)
        for edge in edgeList {
            if uf.union(edge[0], edge[1]) {
                mstWeight += edge[2]
            }
        }

        var critical = [Int]()
        var pseudo = [Int]()

        for edge in edgeList {
            // Try without current edge
            let ufWithout = UnionFind(n)
            var weight = 0
            for other in edgeList {
                if other[3] != edge[3] && ufWithout.union(other[0], other[1]) {
                    weight += other[2]
                }
            }
            if ufWithout.maxRank() != n || weight > mstWeight {
                critical.append(edge[3])
                continue
            }

            // Try with current edge
            let ufWith = UnionFind(n)
            ufWith.union(edge[0], edge[1])
            weight = edge[2]
            for other in edgeList {
                if ufWith.union(other[0], other[1]) {
                    weight += other[2]
                }
            }
            if weight == mstWeight {
                pseudo.append(edge[3])
            }
        }

        return [critical, pseudo]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(E ^ 2)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 2. Kruskal's Algorithm - II

::tabs-start

```python
class UnionFind:
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
            return False
        self.n -= 1
        if self.Size[pu] < self.Size[pv]:
            pu, pv = pv, pu
        self.Size[pu] += self.Size[pv]
        self.Parent[pv] = pu
        return True

    def isConnected(self):
        return self.n == 1

class Solution:
    def findCriticalAndPseudoCriticalEdges(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        for i, e in enumerate(edges):
            e.append(i)
        edges.sort(key = lambda e : e[2])

        def findMST(index, include):
            uf = UnionFind(n)
            wgt = 0
            if include:
                wgt += edges[index][2]
                uf.union(edges[index][0], edges[index][1])

            for i, e in enumerate(edges):
                if i == index:
                    continue
                if uf.union(e[0], e[1]):
                    wgt += e[2]
            return wgt if uf.isConnected() else float("inf")

        mst_wgt = findMST(-1, False)
        critical, pseudo = [], []
        for i, e in enumerate(edges):
            if mst_wgt < findMST(i, False):
                critical.append(e[3])
            elif mst_wgt == findMST(i, True):
                pseudo.append(e[3])

        return [critical, pseudo]
```

```java
class UnionFind {
    private int n;
    private int[] Parent, Size;

    public UnionFind(int n) {
        this.n = n;
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    public int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    public boolean union(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) {
            return false;
        }
        n--;
        if (Size[pu] < Size[pv]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }

    public boolean isConnected() {
        return n == 1;
    }
}

public class Solution {
    public List<List<Integer>> findCriticalAndPseudoCriticalEdges(int n, int[][] edges) {
        for (int i = 0; i < edges.length; i++) {
            edges[i] = Arrays.copyOf(edges[i], edges[i].length + 1);
            edges[i][3] = i;
        }

        Arrays.sort(edges, Comparator.comparingInt(a -> a[2]));


        int mst_wgt = findMST(n, edges, -1, false);
        List<Integer> critical = new ArrayList<>();
        List<Integer> pseudo = new ArrayList<>();

        for (int i = 0; i < edges.length; i++) {
            if (mst_wgt < findMST(n, edges, i, false)) {
                critical.add(edges[i][3]);
            } else if (mst_wgt == findMST(n, edges, i, true)) {
                pseudo.add(edges[i][3]);
            }
        }

        return Arrays.asList(critical, pseudo);
    }

    public int findMST(int n, int[][] edges, int index, boolean include) {
        UnionFind uf = new UnionFind(n);
        int wgt = 0;
        if (include) {
            wgt += edges[index][2];
            uf.union(edges[index][0], edges[index][1]);
        }
        for (int i = 0; i < edges.length; i++) {
            if (i == index) {
                continue;
            }
            if (uf.union(edges[i][0], edges[i][1])) {
                wgt += edges[i][2];
            }
        }
        return uf.isConnected() ? wgt : Integer.MAX_VALUE;
    }
}
```

```cpp
class UnionFind {
private:
    int n;
    vector<int> Parent, Size;

public:
    UnionFind(int n) : n(n), Parent(n + 1), Size(n + 1, 1) {
        for (int i = 0; i <= n; ++i) {
            Parent[i] = i;
        }
    }

    int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    bool unionSets(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        n--;
        if (Size[pu] < Size[pv]) {
            swap(pu, pv);
        }
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }

    bool isConnected() {
        return n == 1;
    }
};

class Solution {
public:
    vector<vector<int>> findCriticalAndPseudoCriticalEdges(int n, vector<vector<int>>& edges) {
        for (int i = 0; i < edges.size(); ++i) {
            edges[i].push_back(i);
        }

        sort(edges.begin(), edges.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[2] < b[2];
        });

        auto findMST = [&](int index, bool include) -> int {
            UnionFind uf(n);
            int wgt = 0;
            if (include) {
                wgt += edges[index][2];
                uf.unionSets(edges[index][0], edges[index][1]);
            }
            for (int i = 0; i < edges.size(); ++i) {
                if (i == index) continue;
                if (uf.unionSets(edges[i][0], edges[i][1])) {
                    wgt += edges[i][2];
                }
            }
            return uf.isConnected() ? wgt : INT_MAX;
        };

        int mst_wgt = findMST(-1, false);
        vector<int> critical, pseudo;

        for (int i = 0; i < edges.size(); ++i) {
            if (mst_wgt < findMST(i, false)) {
                critical.push_back(edges[i][3]);
            } else if (mst_wgt == findMST(i, true)) {
                pseudo.push_back(edges[i][3]);
            }
        }

        return { critical, pseudo };
    }
};
```

```javascript
class UnionFind {
    /**
     * @constructor
     * @param {number} n
     */
    constructor(n) {
        this.Parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.Size = Array(n + 1).fill(1);
        this.n = n;
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node) {
        if (this.Parent[node] !== node) {
            this.Parent[node] = this.find(this.Parent[node]);
        }
        return this.Parent[node];
    }

    /**
     * @param {number} u
     * @param {number} v
     * @return {boolean}
     */
    union(u, v) {
        let pu = this.find(u);
        let pv = this.find(v);
        if (pu === pv) return false;
        this.n--;
        if (this.Size[pu] < this.Size[pv]) {
            [pu, pv] = [pv, pu];
        }
        this.Size[pu] += this.Size[pv];
        this.Parent[pv] = pu;
        return true;
    }

    /**
     * @return {number}
     */
    isConnected() {
        return this.n === 1;
    }
}

class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @return {number[][]}
     */
    findCriticalAndPseudoCriticalEdges(n, edges) {
        edges.forEach((edge, i) => edge.push(i));
        edges.sort((a, b) => a[2] - b[2]);

        const findMST = (index, include) => {
            const uf = new UnionFind(n);
            let wgt = 0;
            if (include) {
                wgt += edges[index][2];
                uf.union(edges[index][0], edges[index][1]);
            }
            for (let i = 0; i < edges.length; i++) {
                if (i === index) continue;
                if (uf.union(edges[i][0], edges[i][1])) {
                    wgt += edges[i][2];
                }
            }
            return uf.isConnected() ? wgt : Infinity;
        };

        const mst_wgt = findMST(-1, false);
        const critical = [];
        const pseudo = [];

        edges.forEach((edge, i) => {
            if (mst_wgt < findMST(i, false)) {
                critical.push(edge[3]);
            } else if (mst_wgt === findMST(i, true)) {
                pseudo.push(edge[3]);
            }
        });

        return [critical, pseudo];
    }
}
```

```csharp
public class UnionFind {
    private int count;
    private int[] parent, size;

    public UnionFind(int n) {
        count = n;
        parent = new int[n];
        size = new int[n];
        for (int i = 0; i < n; i++) {
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

    public bool Union(int u, int v) {
        int pu = Find(u), pv = Find(v);
        if (pu == pv) return false;
        count--;
        if (size[pu] < size[pv]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        size[pu] += size[pv];
        parent[pv] = pu;
        return true;
    }

    public bool IsConnected() {
        return count == 1;
    }
}

public class Solution {
    public List<List<int>> FindCriticalAndPseudoCriticalEdges(int n, int[][] edges) {
        var indexedEdges = new List<int[]>();
        for (int i = 0; i < edges.Length; i++) {
            var edge = new int[] { edges[i][0], edges[i][1], edges[i][2], i };
            indexedEdges.Add(edge);
        }

        indexedEdges.Sort((a, b) => a[2].CompareTo(b[2]));
        int[][] sortedEdges = indexedEdges.ToArray();

        int mstWeight = FindMST(n, sortedEdges, -1, false);
        var critical = new List<int>();
        var pseudo = new List<int>();

        for (int i = 0; i < sortedEdges.Length; i++) {
            if (FindMST(n, sortedEdges, i, false) > mstWeight) {
                critical.Add(sortedEdges[i][3]);
            } else if (FindMST(n, sortedEdges, i, true) == mstWeight) {
                pseudo.Add(sortedEdges[i][3]);
            }
        }

        return new List<List<int>> { critical, pseudo };
    }

    private int FindMST(int n, int[][] edges, int skipIndex, bool includeEdge) {
        var uf = new UnionFind(n);
        int weight = 0;

        if (includeEdge) {
            weight += edges[skipIndex][2];
            uf.Union(edges[skipIndex][0], edges[skipIndex][1]);
        }

        for (int i = 0; i < edges.Length; i++) {
            if (i == skipIndex) continue;
            if (uf.Union(edges[i][0], edges[i][1])) {
                weight += edges[i][2];
            }
        }

        return uf.IsConnected() ? weight : int.MaxValue;
    }
}
```

```go
type UnionFind struct {
    n      int
    parent []int
    size   []int
}

func NewUnionFind(n int) *UnionFind {
    parent := make([]int, n+1)
    size := make([]int, n+1)
    for i := 0; i <= n; i++ {
        parent[i] = i
        size[i] = 1
    }
    return &UnionFind{n: n, parent: parent, size: size}
}

func (uf *UnionFind) Find(node int) int {
    if uf.parent[node] != node {
        uf.parent[node] = uf.Find(uf.parent[node])
    }
    return uf.parent[node]
}

func (uf *UnionFind) Union(u, v int) bool {
    pu, pv := uf.Find(u), uf.Find(v)
    if pu == pv {
        return false
    }
    uf.n--
    if uf.size[pu] < uf.size[pv] {
        pu, pv = pv, pu
    }
    uf.size[pu] += uf.size[pv]
    uf.parent[pv] = pu
    return true
}

func (uf *UnionFind) IsConnected() bool {
    return uf.n == 1
}

func findCriticalAndPseudoCriticalEdges(n int, edges [][]int) [][]int {
    edgeList := make([][4]int, len(edges))
    for i, e := range edges {
        edgeList[i] = [4]int{e[0], e[1], e[2], i}
    }
    sort.Slice(edgeList, func(i, j int) bool {
        return edgeList[i][2] < edgeList[j][2]
    })

    findMST := func(index int, include bool) int {
        uf := NewUnionFind(n)
        wgt := 0
        if include {
            wgt += edgeList[index][2]
            uf.Union(edgeList[index][0], edgeList[index][1])
        }
        for i, e := range edgeList {
            if i == index {
                continue
            }
            if uf.Union(e[0], e[1]) {
                wgt += e[2]
            }
        }
        if uf.IsConnected() {
            return wgt
        }
        return math.MaxInt32
    }

    mstWgt := findMST(-1, false)
    var critical, pseudo []int

    for i, e := range edgeList {
        if mstWgt < findMST(i, false) {
            critical = append(critical, e[3])
        } else if mstWgt == findMST(i, true) {
            pseudo = append(pseudo, e[3])
        }
    }

    return [][]int{critical, pseudo}
}
```

```kotlin
class UnionFind(n: Int) {
    private var count = n
    private val parent = IntArray(n) { it }
    private val size = IntArray(n) { 1 }

    fun find(node: Int): Int {
        if (parent[node] != node) {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    fun union(u: Int, v: Int): Boolean {
        var pu = find(u)
        var pv = find(v)
        if (pu == pv) return false
        count--
        if (size[pu] < size[pv]) {
            pu = pv.also { pv = pu }
        }
        size[pu] += size[pv]
        parent[pv] = pu
        return true
    }

    fun isConnected(): Boolean = count == 1
}

class Solution {
    fun findCriticalAndPseudoCriticalEdges(n: Int, edges: Array<IntArray>): List<List<Int>> {
        val edgeList = edges.mapIndexed { i, e ->
            intArrayOf(e[0], e[1], e[2], i)
        }.sortedBy { it[2] }

        fun findMST(index: Int, include: Boolean): Int {
            val uf = UnionFind(n)
            var wgt = 0
            if (include) {
                wgt += edgeList[index][2]
                uf.union(edgeList[index][0], edgeList[index][1])
            }
            for (i in edgeList.indices) {
                if (i == index) continue
                if (uf.union(edgeList[i][0], edgeList[i][1])) {
                    wgt += edgeList[i][2]
                }
            }
            return if (uf.isConnected()) wgt else Int.MAX_VALUE
        }

        val mstWgt = findMST(-1, false)
        val critical = mutableListOf<Int>()
        val pseudo = mutableListOf<Int>()

        for (i in edgeList.indices) {
            if (mstWgt < findMST(i, false)) {
                critical.add(edgeList[i][3])
            } else if (mstWgt == findMST(i, true)) {
                pseudo.add(edgeList[i][3])
            }
        }

        return listOf(critical, pseudo)
    }
}
```

```swift
class UnionFind {
    private var count: Int
    private var parent: [Int]
    private var size: [Int]

    init(_ n: Int) {
        count = n
        parent = Array(0..<n)
        size = Array(repeating: 1, count: n)
    }

    func find(_ node: Int) -> Int {
        if parent[node] != node {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    func union(_ u: Int, _ v: Int) -> Bool {
        var pu = find(u)
        var pv = find(v)
        if pu == pv { return false }
        count -= 1
        if size[pu] < size[pv] {
            swap(&pu, &pv)
        }
        size[pu] += size[pv]
        parent[pv] = pu
        return true
    }

    func isConnected() -> Bool {
        return count == 1
    }
}

class Solution {
    func findCriticalAndPseudoCriticalEdges(_ n: Int, _ edges: [[Int]]) -> [[Int]] {
        let edgeList = edges.enumerated().map { (i, e) in
            [e[0], e[1], e[2], i]
        }.sorted { $0[2] < $1[2] }

        func findMST(_ index: Int, _ include: Bool) -> Int {
            let uf = UnionFind(n)
            var wgt = 0
            if include {
                wgt += edgeList[index][2]
                uf.union(edgeList[index][0], edgeList[index][1])
            }
            for i in 0..<edgeList.count {
                if i == index { continue }
                if uf.union(edgeList[i][0], edgeList[i][1]) {
                    wgt += edgeList[i][2]
                }
            }
            return uf.isConnected() ? wgt : Int.max
        }

        let mstWgt = findMST(-1, false)
        var critical = [Int]()
        var pseudo = [Int]()

        for i in 0..<edgeList.count {
            if mstWgt < findMST(i, false) {
                critical.append(edgeList[i][3])
            } else if mstWgt == findMST(i, true) {
                pseudo.append(edgeList[i][3])
            }
        }

        return [critical, pseudo]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(E ^ 2)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 3. Dijkstra's Algorithm

::tabs-start

```python
class Solution:
    def findCriticalAndPseudoCriticalEdges(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        for i, edge in enumerate(edges):
            edge.append(i)

        adj = defaultdict(list)
        for u, v, w, idx in edges:
            adj[u].append((v, w, idx))
            adj[v].append((u, w, idx))

        def minimax(src, dst, exclude_idx):
            dist = [float('inf')] * n
            dist[src] = 0
            pq = [(0, src)]

            while pq:
                max_w, u = heappop(pq)
                if u == dst:
                    return max_w

                for v, weight, edge_idx in adj[u]:
                    if edge_idx == exclude_idx:
                        continue
                    new_w = max(max_w, weight)
                    if new_w < dist[v]:
                        dist[v] = new_w
                        heappush(pq, (new_w, v))

            return float('inf')

        critical, pseudo = [], []
        for i, (u, v, w, idx) in enumerate(edges):
            if w < minimax(u, v, idx):
                critical.append(idx)
            elif w == minimax(u, v, -1):
                pseudo.append(idx)

        return [critical, pseudo]
```

```java
public class Solution {
    private List<int[]>[] adj;

    public List<List<Integer>> findCriticalAndPseudoCriticalEdges(int n, int[][] edges) {
        for (int i = 0; i < edges.length; i++) {
            edges[i] = Arrays.copyOf(edges[i], edges[i].length + 1);
            edges[i][3] = i;
        }

        adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            adj[edge[0]].add(new int[]{edge[1], edge[2], edge[3]});
            adj[edge[1]].add(new int[]{edge[0], edge[2], edge[3]});
        }


        List<Integer> critical = new ArrayList<>();
        List<Integer> pseudo = new ArrayList<>();

        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2], idx = edge[3];
            if (w < minimax(n, u, v, idx)) {
                critical.add(idx);
            } else if (w == minimax(n, u, v, -1)) {
                pseudo.add(idx);
            }
        }

        return Arrays.asList(critical, pseudo);
    }

    public int minimax(int n, int src, int dst, int excludeIdx) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        pq.offer(new int[]{0, src});

        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int maxW = curr[0], u = curr[1];
            if (u == dst) return maxW;

            for (int[] neighbor : adj[u]) {
                int v = neighbor[0], weight = neighbor[1], edgeIdx = neighbor[2];
                if (edgeIdx == excludeIdx) continue;
                int newW = Math.max(maxW, weight);
                if (newW < dist[v]) {
                    dist[v] = newW;
                    pq.offer(new int[]{newW, v});
                }
            }
        }
        return Integer.MAX_VALUE;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findCriticalAndPseudoCriticalEdges(int n, vector<vector<int>>& edges) {
        for (int i = 0; i < edges.size(); ++i) {
            edges[i].push_back(i);
        }

        vector<vector<vector<int>>> adj(n);
        for (const auto& edge : edges) {
            adj[edge[0]].push_back({edge[1], edge[2], edge[3]});
            adj[edge[1]].push_back({edge[0], edge[2], edge[3]});
        }

        auto minimax = [&](int src, int dst, int excludeIdx) -> int {
            vector<int> dist(n, INT_MAX);
            dist[src] = 0;

            priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
            pq.push({0, src});

            while (!pq.empty()) {
                auto [maxW, u] = pq.top();
                pq.pop();
                if (u == dst) return maxW;

                for (const auto& neighbor : adj[u]) {
                    int v = neighbor[0], weight = neighbor[1], edgeIdx = neighbor[2];
                    if (edgeIdx == excludeIdx) continue;
                    int newW = max(maxW, weight);
                    if (newW < dist[v]) {
                        dist[v] = newW;
                        pq.push({newW, v});
                    }
                }
            }
            return INT_MAX;
        };

        vector<int> critical, pseudo;
        for (const auto& edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2], idx = edge[3];
            if (w < minimax(u, v, idx)) {
                critical.push_back(idx);
            } else if (w == minimax(u, v, -1)) {
                pseudo.push_back(idx);
            }
        }

        return {critical, pseudo};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @return {number[][]}
     */
    findCriticalAndPseudoCriticalEdges(n, edges) {
        edges.forEach((edge, i) => edge.push(i));

        const adj = Array.from({ length: n }, () => []);
        for (const [u, v, w, idx] of edges) {
            adj[u].push([v, w, idx]);
            adj[v].push([u, w, idx]);
        }

        const minimax = (src, dst, excludeIdx) => {
            const dist = Array(n).fill(Infinity);
            dist[src] = 0;

            const pq = new PriorityQueue((a, b) => a[0] - b[0]);
            pq.enqueue([0, src]);

            while (!pq.isEmpty()) {
                const [maxW, u] = pq.dequeue();
                if (u === dst) return maxW;

                for (const [v, weight, edgeIdx] of adj[u]) {
                    if (edgeIdx === excludeIdx) continue;
                    const newW = Math.max(maxW, weight);
                    if (newW < dist[v]) {
                        dist[v] = newW;
                        pq.enqueue([newW, v]);
                    }
                }
            }
            return Infinity;
        };

        const critical = [];
        const pseudo = [];

        for (const [u, v, w, idx] of edges) {
            if (w < minimax(u, v, idx)) {
                critical.push(idx);
            } else if (w === minimax(u, v, -1)) {
                pseudo.push(idx);
            }
        }

        return [critical, pseudo];
    }
}
```

```csharp
public class Solution {
    private List<int[]>[] adj;

    public List<List<int>> FindCriticalAndPseudoCriticalEdges(int n, int[][] edges) {
        for (int i = 0; i < edges.Length; i++) {
            Array.Resize(ref edges[i], edges[i].Length + 1);
            edges[i][3] = i;
        }

        adj = new List<int[]>[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new List<int[]>();
        }
        foreach (var edge in edges) {
            adj[edge[0]].Add(new int[] { edge[1], edge[2], edge[3] });
            adj[edge[1]].Add(new int[] { edge[0], edge[2], edge[3] });
        }

        var critical = new List<int>();
        var pseudo = new List<int>();

        foreach (var edge in edges) {
            int u = edge[0], v = edge[1], w = edge[2], idx = edge[3];
            if (w < Minimax(n, u, v, idx)) {
                critical.Add(idx);
            } else if (w == Minimax(n, u, v, -1)) {
                pseudo.Add(idx);
            }
        }

        return new List<List<int>> { critical, pseudo };
    }

    private int Minimax(int n, int src, int dst, int excludeIdx) {
        int[] dist = new int[n];
        Array.Fill(dist, int.MaxValue);
        dist[src] = 0;

        var pq = new PriorityQueue<(int weight, int node), int>();
        pq.Enqueue((0, src), 0);

        while (pq.Count > 0) {
            var (maxW, u) = pq.Dequeue();
            if (u == dst) return maxW;

            foreach (var neighbor in adj[u]) {
                int v = neighbor[0], weight = neighbor[1], edgeIdx = neighbor[2];
                if (edgeIdx == excludeIdx) continue;
                int newW = Math.Max(maxW, weight);
                if (newW < dist[v]) {
                    dist[v] = newW;
                    pq.Enqueue((newW, v), newW);
                }
            }
        }

        return int.MaxValue;
    }
}
```

```go
func findCriticalAndPseudoCriticalEdges(n int, edges [][]int) [][]int {
    for i := range edges {
        edges[i] = append(edges[i], i)
    }

    adj := make([][][3]int, n)
    for i := 0; i < n; i++ {
        adj[i] = make([][3]int, 0)
    }
    for _, edge := range edges {
        adj[edge[0]] = append(adj[edge[0]], [3]int{edge[1], edge[2], edge[3]})
        adj[edge[1]] = append(adj[edge[1]], [3]int{edge[0], edge[2], edge[3]})
    }

    minimax := func(src, dst, excludeIdx int) int {
        dist := make([]int, n)
        for i := range dist {
            dist[i] = math.MaxInt32
        }
        dist[src] = 0

        pq := &IntHeap{{0, src}}
        heap.Init(pq)

        for pq.Len() > 0 {
            curr := heap.Pop(pq).([2]int)
            maxW, u := curr[0], curr[1]
            if u == dst {
                return maxW
            }

            for _, neighbor := range adj[u] {
                v, weight, edgeIdx := neighbor[0], neighbor[1], neighbor[2]
                if edgeIdx == excludeIdx {
                    continue
                }
                newW := max(maxW, weight)
                if newW < dist[v] {
                    dist[v] = newW
                    heap.Push(pq, [2]int{newW, v})
                }
            }
        }
        return math.MaxInt32
    }

    var critical, pseudo []int
    for _, edge := range edges {
        u, v, w, idx := edge[0], edge[1], edge[2], edge[3]
        if w < minimax(u, v, idx) {
            critical = append(critical, idx)
        } else if w == minimax(u, v, -1) {
            pseudo = append(pseudo, idx)
        }
    }

    return [][]int{critical, pseudo}
}

type IntHeap [][2]int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i][0] < h[j][0] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x any)        { *h = append(*h, x.([2]int)) }
func (h *IntHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    private lateinit var adj: Array<MutableList<IntArray>>

    fun findCriticalAndPseudoCriticalEdges(n: Int, edges: Array<IntArray>): List<List<Int>> {
        val indexedEdges = edges.mapIndexed { i, e ->
            intArrayOf(e[0], e[1], e[2], i)
        }.toTypedArray()

        adj = Array(n) { mutableListOf<IntArray>() }
        for (edge in indexedEdges) {
            adj[edge[0]].add(intArrayOf(edge[1], edge[2], edge[3]))
            adj[edge[1]].add(intArrayOf(edge[0], edge[2], edge[3]))
        }

        val critical = mutableListOf<Int>()
        val pseudo = mutableListOf<Int>()

        for (edge in indexedEdges) {
            val (u, v, w, idx) = edge.let { Triple(it[0], it[1], it[2]) to it[3] }.let {
                listOf(it.first.first, it.first.second, it.first.third, it.second)
            }
            if (w < minimax(n, u, v, idx)) {
                critical.add(idx)
            } else if (w == minimax(n, u, v, -1)) {
                pseudo.add(idx)
            }
        }

        return listOf(critical, pseudo)
    }

    private fun minimax(n: Int, src: Int, dst: Int, excludeIdx: Int): Int {
        val dist = IntArray(n) { Int.MAX_VALUE }
        dist[src] = 0

        val pq = PriorityQueue<IntArray>(compareBy { it[0] })
        pq.add(intArrayOf(0, src))

        while (pq.isNotEmpty()) {
            val (maxW, u) = pq.poll()
            if (u == dst) return maxW

            for (neighbor in adj[u]) {
                val (v, weight, edgeIdx) = Triple(neighbor[0], neighbor[1], neighbor[2])
                if (edgeIdx == excludeIdx) continue
                val newW = maxOf(maxW, weight)
                if (newW < dist[v]) {
                    dist[v] = newW
                    pq.add(intArrayOf(newW, v))
                }
            }
        }
        return Int.MAX_VALUE
    }
}
```

```swift
class Solution {
    private var adj: [[[Int]]] = []

    func findCriticalAndPseudoCriticalEdges(_ n: Int, _ edges: [[Int]]) -> [[Int]] {
        var indexedEdges = edges.enumerated().map { (i, e) in
            [e[0], e[1], e[2], i]
        }

        adj = Array(repeating: [[Int]](), count: n)
        for edge in indexedEdges {
            adj[edge[0]].append([edge[1], edge[2], edge[3]])
            adj[edge[1]].append([edge[0], edge[2], edge[3]])
        }

        var critical = [Int]()
        var pseudo = [Int]()

        for edge in indexedEdges {
            let u = edge[0], v = edge[1], w = edge[2], idx = edge[3]
            if w < minimax(n, u, v, idx) {
                critical.append(idx)
            } else if w == minimax(n, u, v, -1) {
                pseudo.append(idx)
            }
        }

        return [critical, pseudo]
    }

    private func minimax(_ n: Int, _ src: Int, _ dst: Int, _ excludeIdx: Int) -> Int {
        var dist = Array(repeating: Int.max, count: n)
        dist[src] = 0

        var pq = Heap<(Int, Int)>(comparator: { $0.0 < $1.0 })
        pq.insert((0, src))

        while !pq.isEmpty {
            let (maxW, u) = pq.remove()!
            if u == dst { return maxW }

            for neighbor in adj[u] {
                let v = neighbor[0], weight = neighbor[1], edgeIdx = neighbor[2]
                if edgeIdx == excludeIdx { continue }
                let newW = max(maxW, weight)
                if newW < dist[v] {
                    dist[v] = newW
                    pq.insert((newW, v))
                }
            }
        }
        return Int.max
    }
}

struct Heap<T> {
    private var elements: [T] = []
    private let comparator: (T, T) -> Bool

    init(comparator: @escaping (T, T) -> Bool) {
        self.comparator = comparator
    }

    var isEmpty: Bool { elements.isEmpty }

    mutating func insert(_ element: T) {
        elements.append(element)
        siftUp(from: elements.count - 1)
    }

    mutating func remove() -> T? {
        guard !elements.isEmpty else { return nil }
        elements.swapAt(0, elements.count - 1)
        let element = elements.removeLast()
        if !elements.isEmpty { siftDown(from: 0) }
        return element
    }

    private mutating func siftUp(from index: Int) {
        var child = index
        var parent = (child - 1) / 2
        while child > 0 && comparator(elements[child], elements[parent]) {
            elements.swapAt(child, parent)
            child = parent
            parent = (child - 1) / 2
        }
    }

    private mutating func siftDown(from index: Int) {
        var parent = index
        while true {
            let left = 2 * parent + 1
            let right = 2 * parent + 2
            var candidate = parent
            if left < elements.count && comparator(elements[left], elements[candidate]) {
                candidate = left
            }
            if right < elements.count && comparator(elements[right], elements[candidate]) {
                candidate = right
            }
            if candidate == parent { return }
            elements.swapAt(parent, candidate)
            parent = candidate
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(E ^ 2 \log V)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 4. Kruskal's Algorithm + DFS

::tabs-start

```python
class UnionFind:
    def __init__(self, n):
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
            return False
        if self.Size[pu] < self.Size[pv]:
            pu, pv = pv, pu
        self.Size[pu] += self.Size[pv]
        self.Parent[pv] = pu
        return True

class Solution:
    def findCriticalAndPseudoCriticalEdges(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        mst = [[] for _ in range(n)]
        mstEdge = []

        edge_list = [(w, u, v, i) for i, (u, v, w) in enumerate(edges)]
        edge_list.sort()

        uf = UnionFind(n)
        for w, u, v, i in edge_list:
            if uf.union(u, v):
                mst[u].append((v, i))
                mst[v].append((u, i))
                mstEdge.append(i)

        def dfs(node):
            for next, ind in mst[node]:
                if path and ind == path[-1]:
                    continue
                path.append(ind)
                if next == dst or dfs(next):
                    return True
                path.pop()
            return False

        pseudo, mstEdge = set(), set(mstEdge)
        for ind in range(len(edges)):
            if ind in mstEdge:
                continue
            path, dst = [], edges[ind][1]
            dfs(edges[ind][0])
            for i in path:
                if edges[i][2] == edges[ind][2]:
                    pseudo.add(i)
                    pseudo.add(ind)

        return [list(mstEdge - pseudo), list(pseudo)]
```

```java
class UnionFind {
    private int[] parent;
    private int[] size;

    public UnionFind(int n) {
        parent = new int[n];
        size = new int[n];
        for (int i = 0; i < n; i++) {
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

    public boolean union(int u, int v) {
        int pu = find(u);
        int pv = find(v);
        if (pu == pv) {
            return false;
        }
        if (size[pu] < size[pv]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        size[pu] += size[pv];
        parent[pv] = pu;
        return true;
    }
}

public class Solution {
    private List<List<Integer>> mst;
    private Set<Integer> mstEdges;
    private Set<Integer> pseudoCriticalEdges;
    private int destination;
    private List<Integer> path;

    public List<List<Integer>> findCriticalAndPseudoCriticalEdges(int n, int[][] edges) {
        mst = new ArrayList<>();
        mstEdges = new HashSet<>();
        pseudoCriticalEdges = new HashSet<>();

        for (int i = 0; i < n; i++) {
            mst.add(new ArrayList<>());
        }

        List<int[]> edgeList = new ArrayList<>();
        for (int i = 0; i < edges.length; i++) {
            edgeList.add(new int[]{edges[i][2], edges[i][0], edges[i][1], i});
        }
        edgeList.sort(Comparator.comparingInt(a -> a[0]));

        UnionFind uf = new UnionFind(n);
        for (int[] edge : edgeList) {
            int weight = edge[0], u = edge[1], v = edge[2], index = edge[3];
            if (uf.union(u, v)) {
                mst.get(u).add(index);
                mst.get(v).add(index);
                mstEdges.add(index);
            }
        }

        for (int i = 0; i < edges.length; i++) {
            if (mstEdges.contains(i)) {
                continue;
            }
            path = new ArrayList<>();
            destination = edges[i][1];
            if (dfs(edges[i][0], -1, edges)) {
                for (int p : path) {
                    if (edges[p][2] == edges[i][2]) {
                        pseudoCriticalEdges.add(i);
                        pseudoCriticalEdges.add(p);
                    }
                }
            }
        }

        List<Integer> critical = new ArrayList<>();
        for (int edge : mstEdges) {
            if (!pseudoCriticalEdges.contains(edge)) {
                critical.add(edge);
            }
        }

        return Arrays.asList(critical, new ArrayList<>(pseudoCriticalEdges));
    }

    private boolean dfs(int node, int parent, int[][] edges) {
        if (node == destination) {
            return true;
        }
        for (int edgeIndex : mst.get(node)) {
            if (edgeIndex == parent) {
                continue;
            }
            path.add(edgeIndex);
            int nextNode = edges[edgeIndex][0] == node ? edges[edgeIndex][1] : edges[edgeIndex][0];
            if (dfs(nextNode, edgeIndex, edges)) {
                return true;
            }
            path.remove(path.size() - 1);
        }
        return false;
    }
}
```

```cpp
class UnionFind {
    vector<int> parent, size;

public:
    UnionFind(int n) {
        parent.resize(n);
        size.resize(n, 1);
        for (int i = 0; i < n; ++i) {
            parent[i] = i;
        }
    }

    int find(int node) {
        if (parent[node] != node) {
            parent[node] = find(parent[node]);
        }
        return parent[node];
    }

    bool unionSets(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (size[pu] < size[pv]) swap(pu, pv);
        size[pu] += size[pv];
        parent[pv] = pu;
        return true;
    }
};

class Solution {
    vector<vector<int>> mst;
    set<int> mstEdges, pseudoCriticalEdges;
    vector<int> path;
    int destination;

public:
    vector<vector<int>> findCriticalAndPseudoCriticalEdges(int n, vector<vector<int>>& edges) {
        mst.resize(n);
        vector<array<int, 4>> edgeList;
        for (int i = 0; i < edges.size(); ++i) {
            edgeList.push_back({edges[i][2], edges[i][0], edges[i][1], i});
        }
        sort(edgeList.begin(), edgeList.end());

        UnionFind uf(n);
        for (auto& [w, u, v, idx] : edgeList) {
            if (uf.unionSets(u, v)) {
                mst[u].push_back(idx);
                mst[v].push_back(idx);
                mstEdges.insert(idx);
            }
        }

        for (int i = 0; i < edges.size(); ++i) {
            if (mstEdges.count(i)) continue;
            path.clear();
            destination = edges[i][1];
            if (dfs(edges[i][0], -1, edges)) {
                for (int p : path) {
                    if (edges[p][2] == edges[i][2]) {
                        pseudoCriticalEdges.insert(p);
                        pseudoCriticalEdges.insert(i);
                    }
                }
            }
        }

        vector<int> critical;
        for (int e : mstEdges) {
            if (!pseudoCriticalEdges.count(e)) critical.push_back(e);
        }

        return {critical, vector<int>(pseudoCriticalEdges.begin(), pseudoCriticalEdges.end())};
    }

    bool dfs(int node, int parent, vector<vector<int>>& edges) {
        if (node == destination) return true;
        for (int& edgeIdx : mst[node]) {
            if (edgeIdx == parent) continue;
            path.push_back(edgeIdx);
            int next = edges[edgeIdx][0] == node ? edges[edgeIdx][1] : edges[edgeIdx][0];
            if (dfs(next, edgeIdx, edges)) return true;
            path.pop_back();
        }
        return false;
    }
};
```

```javascript
class UnionFind {
    /**
     * @constructor
     * @param {number} n
     */
    constructor(n) {
        this.Parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.Size = Array(n + 1).fill(1);
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node) {
        if (this.Parent[node] !== node) {
            this.Parent[node] = this.find(this.Parent[node]);
        }
        return this.Parent[node];
    }

    /**
     * @param {number} u
     * @param {number} v
     * @return {boolean}
     */
    union(u, v) {
        let pu = this.find(u);
        let pv = this.find(v);
        if (pu === pv) return false;
        if (this.Size[pu] < this.Size[pv]) {
            [pu, pv] = [pv, pu];
        }
        this.Size[pu] += this.Size[pv];
        this.Parent[pv] = pu;
        return true;
    }
}

class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @return {number[][]}
     */
    findCriticalAndPseudoCriticalEdges(n, edges) {
        const mst = Array.from({ length: n }, () => []);
        const mstEdges = new Set();
        const pseudoCriticalEdges = new Set();
        const edgeList = edges
            .map((e, i) => [...e, i])
            .sort((a, b) => a[2] - b[2]);

        const uf = new UnionFind(n);

        for (const [u, v, w, idx] of edgeList) {
            if (uf.union(u, v)) {
                mst[u].push([v, idx]);
                mst[v].push([u, idx]);
                mstEdges.add(idx);
            }
        }

        let path = [];
        let destination = null;

        const dfs = (node, parent) => {
            if (node === destination) return true;
            for (const [next, edgeIdx] of mst[node]) {
                if (edgeIdx === parent) continue;
                path.push(edgeIdx);
                if (dfs(next, edgeIdx)) return true;
                path.pop();
            }
            return false;
        };

        for (let i = 0; i < edges.length; i++) {
            if (mstEdges.has(i)) continue;

            path = [];
            destination = edges[i][1];
            if (dfs(edges[i][0], -1)) {
                for (const edgeIdx of path) {
                    if (edges[edgeIdx][2] === edges[i][2]) {
                        pseudoCriticalEdges.add(i);
                        pseudoCriticalEdges.add(edgeIdx);
                    }
                }
            }
        }

        const critical = [...mstEdges].filter(
            (edgeIdx) => !pseudoCriticalEdges.has(edgeIdx),
        );
        const pseudo = [...pseudoCriticalEdges];

        return [critical, pseudo];
    }
}
```

```csharp
public class UnionFind {
    private int[] parent;
    private int[] size;

    public UnionFind(int n) {
        parent = new int[n];
        size = new int[n];
        for (int i = 0; i < n; i++) {
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

    public bool Union(int u, int v) {
        int pu = Find(u);
        int pv = Find(v);
        if (pu == pv) return false;
        if (size[pu] < size[pv]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        size[pu] += size[pv];
        parent[pv] = pu;
        return true;
    }
}

public class Solution {
    private List<List<int>> mst;
    private HashSet<int> mstEdges;
    private HashSet<int> pseudoCriticalEdges;
    private int destination;
    private List<int> path;

    public List<List<int>> FindCriticalAndPseudoCriticalEdges(int n, int[][] edges) {
        mst = new List<List<int>>();
        mstEdges = new HashSet<int>();
        pseudoCriticalEdges = new HashSet<int>();

        for (int i = 0; i < n; i++) {
            mst.Add(new List<int>());
        }

        var edgeList = new List<int[]>();
        for (int i = 0; i < edges.Length; i++) {
            edgeList.Add(new int[] { edges[i][2], edges[i][0], edges[i][1], i });
        }
        edgeList.Sort((a, b) => a[0].CompareTo(b[0]));

        UnionFind uf = new UnionFind(n);
        foreach (var edge in edgeList) {
            int weight = edge[0], u = edge[1], v = edge[2], index = edge[3];
            if (uf.Union(u, v)) {
                mst[u].Add(index);
                mst[v].Add(index);
                mstEdges.Add(index);
            }
        }

        for (int i = 0; i < edges.Length; i++) {
            if (mstEdges.Contains(i)) continue;
            path = new List<int>();
            destination = edges[i][1];
            if (DFS(edges[i][0], -1, edges)) {
                foreach (int p in path) {
                    if (edges[p][2] == edges[i][2]) {
                        pseudoCriticalEdges.Add(i);
                        pseudoCriticalEdges.Add(p);
                    }
                }
            }
        }

        var critical = new List<int>();
        foreach (int edge in mstEdges) {
            if (!pseudoCriticalEdges.Contains(edge)) {
                critical.Add(edge);
            }
        }

        return new List<List<int>>() { critical, new List<int>(pseudoCriticalEdges) };
    }

    private bool DFS(int node, int parent, int[][] edges) {
        if (node == destination) return true;
        foreach (int edgeIndex in mst[node]) {
            if (edgeIndex == parent) continue;
            path.Add(edgeIndex);
            int nextNode = edges[edgeIndex][0] == node ? edges[edgeIndex][1] : edges[edgeIndex][0];
            if (DFS(nextNode, edgeIndex, edges)) return true;
            path.RemoveAt(path.Count - 1);
        }
        return false;
    }
}
```

```go
type UnionFind struct {
    parent []int
    size   []int
}

func NewUnionFind(n int) *UnionFind {
    parent := make([]int, n)
    size := make([]int, n)
    for i := 0; i < n; i++ {
        parent[i] = i
        size[i] = 1
    }
    return &UnionFind{parent: parent, size: size}
}

func (uf *UnionFind) Find(node int) int {
    if uf.parent[node] != node {
        uf.parent[node] = uf.Find(uf.parent[node])
    }
    return uf.parent[node]
}

func (uf *UnionFind) Union(u, v int) bool {
    pu, pv := uf.Find(u), uf.Find(v)
    if pu == pv {
        return false
    }
    if uf.size[pu] < uf.size[pv] {
        pu, pv = pv, pu
    }
    uf.size[pu] += uf.size[pv]
    uf.parent[pv] = pu
    return true
}

func findCriticalAndPseudoCriticalEdges(n int, edges [][]int) [][]int {
    mst := make([][][2]int, n)
    mstEdges := make(map[int]bool)

    edgeList := make([][4]int, len(edges))
    for i, e := range edges {
        edgeList[i] = [4]int{e[2], e[0], e[1], i}
    }
    sort.Slice(edgeList, func(i, j int) bool {
        return edgeList[i][0] < edgeList[j][0]
    })

    uf := NewUnionFind(n)
    for _, edge := range edgeList {
        w, u, v, idx := edge[0], edge[1], edge[2], edge[3]
        if uf.Union(u, v) {
            mst[u] = append(mst[u], [2]int{v, idx})
            mst[v] = append(mst[v], [2]int{u, idx})
            mstEdges[idx] = true
        }
    }

    pseudoCritical := make(map[int]bool)

    var dfs func(node, parent, dest int, path *[]int) bool
    dfs = func(node, parent, dest int, path *[]int) bool {
        if node == dest {
            return true
        }
        for _, neighbor := range mst[node] {
            next, edgeIdx := neighbor[0], neighbor[1]
            if edgeIdx == parent {
                continue
            }
            *path = append(*path, edgeIdx)
            if dfs(next, edgeIdx, dest, path) {
                return true
            }
            *path = (*path)[:len(*path)-1]
        }
        return false
    }

    for i := 0; i < len(edges); i++ {
        if mstEdges[i] {
            continue
        }
        path := []int{}
        dest := edges[i][1]
        if dfs(edges[i][0], -1, dest, &path) {
            for _, p := range path {
                if edges[p][2] == edges[i][2] {
                    pseudoCritical[i] = true
                    pseudoCritical[p] = true
                }
            }
        }
    }

    var critical, pseudo []int
    for idx := range mstEdges {
        if !pseudoCritical[idx] {
            critical = append(critical, idx)
        }
    }
    for idx := range pseudoCritical {
        pseudo = append(pseudo, idx)
    }

    return [][]int{critical, pseudo}
}
```

```kotlin
class UnionFind(n: Int) {
    private val parent = IntArray(n) { it }
    private val size = IntArray(n) { 1 }

    fun find(node: Int): Int {
        if (parent[node] != node) {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    fun union(u: Int, v: Int): Boolean {
        var pu = find(u)
        var pv = find(v)
        if (pu == pv) return false
        if (size[pu] < size[pv]) {
            pu = pv.also { pv = pu }
        }
        size[pu] += size[pv]
        parent[pv] = pu
        return true
    }
}

class Solution {
    private lateinit var mst: Array<MutableList<IntArray>>
    private val mstEdges = mutableSetOf<Int>()
    private val pseudoCriticalEdges = mutableSetOf<Int>()
    private var destination = 0
    private val path = mutableListOf<Int>()

    fun findCriticalAndPseudoCriticalEdges(n: Int, edges: Array<IntArray>): List<List<Int>> {
        mst = Array(n) { mutableListOf<IntArray>() }

        val edgeList = edges.mapIndexed { i, e ->
            intArrayOf(e[2], e[0], e[1], i)
        }.sortedBy { it[0] }

        val uf = UnionFind(n)
        for (edge in edgeList) {
            val (w, u, v, idx) = listOf(edge[0], edge[1], edge[2], edge[3])
            if (uf.union(u, v)) {
                mst[u].add(intArrayOf(v, idx))
                mst[v].add(intArrayOf(u, idx))
                mstEdges.add(idx)
            }
        }

        for (i in edges.indices) {
            if (i in mstEdges) continue
            path.clear()
            destination = edges[i][1]
            if (dfs(edges[i][0], -1, edges)) {
                for (p in path) {
                    if (edges[p][2] == edges[i][2]) {
                        pseudoCriticalEdges.add(i)
                        pseudoCriticalEdges.add(p)
                    }
                }
            }
        }

        val critical = mstEdges.filter { it !in pseudoCriticalEdges }
        return listOf(critical, pseudoCriticalEdges.toList())
    }

    private fun dfs(node: Int, parent: Int, edges: Array<IntArray>): Boolean {
        if (node == destination) return true
        for (neighbor in mst[node]) {
            val (next, edgeIdx) = neighbor[0] to neighbor[1]
            if (edgeIdx == parent) continue
            path.add(edgeIdx)
            val nextNode = if (edges[edgeIdx][0] == node) edges[edgeIdx][1] else edges[edgeIdx][0]
            if (dfs(nextNode, edgeIdx, edges)) return true
            path.removeAt(path.size - 1)
        }
        return false
    }
}
```

```swift
class UnionFind {
    private var parent: [Int]
    private var size: [Int]

    init(_ n: Int) {
        parent = Array(0..<n)
        size = Array(repeating: 1, count: n)
    }

    func find(_ node: Int) -> Int {
        if parent[node] != node {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    func union(_ u: Int, _ v: Int) -> Bool {
        var pu = find(u)
        var pv = find(v)
        if pu == pv { return false }
        if size[pu] < size[pv] {
            swap(&pu, &pv)
        }
        size[pu] += size[pv]
        parent[pv] = pu
        return true
    }
}

class Solution {
    private var mst: [[(Int, Int)]] = []
    private var mstEdges = Set<Int>()
    private var pseudoCriticalEdges = Set<Int>()
    private var destination = 0
    private var path = [Int]()

    func findCriticalAndPseudoCriticalEdges(_ n: Int, _ edges: [[Int]]) -> [[Int]] {
        mst = Array(repeating: [(Int, Int)](), count: n)
        mstEdges = Set<Int>()
        pseudoCriticalEdges = Set<Int>()

        let edgeList = edges.enumerated().map { (i, e) in
            [e[2], e[0], e[1], i]
        }.sorted { $0[0] < $1[0] }

        let uf = UnionFind(n)
        for edge in edgeList {
            let w = edge[0], u = edge[1], v = edge[2], idx = edge[3]
            if uf.union(u, v) {
                mst[u].append((v, idx))
                mst[v].append((u, idx))
                mstEdges.insert(idx)
            }
        }

        for i in 0..<edges.count {
            if mstEdges.contains(i) { continue }
            path = []
            destination = edges[i][1]
            if dfs(edges[i][0], -1, edges) {
                for p in path {
                    if edges[p][2] == edges[i][2] {
                        pseudoCriticalEdges.insert(i)
                        pseudoCriticalEdges.insert(p)
                    }
                }
            }
        }

        let critical = mstEdges.filter { !pseudoCriticalEdges.contains($0) }
        return [Array(critical), Array(pseudoCriticalEdges)]
    }

    private func dfs(_ node: Int, _ parent: Int, _ edges: [[Int]]) -> Bool {
        if node == destination { return true }
        for (next, edgeIdx) in mst[node] {
            if edgeIdx == parent { continue }
            path.append(edgeIdx)
            let nextNode = edges[edgeIdx][0] == node ? edges[edgeIdx][1] : edges[edgeIdx][0]
            if dfs(nextNode, edgeIdx, edges) { return true }
            path.removeLast()
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(E ^ 2)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of vertices and $E$ is the number of edges.
