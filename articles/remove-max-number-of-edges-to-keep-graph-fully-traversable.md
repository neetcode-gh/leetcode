## 1. Disjoint Set Union

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(E * α(V))$
- Space complexity: $O(V)$

> Where $V$ is the number of verticies and $E$ is the number of edges.
