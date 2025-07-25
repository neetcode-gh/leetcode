## 1. Brute Force (DFS)

::tabs-start

```python
class Solution:
    def canTraverseAllPairs(self, nums: List[int]) -> bool:
        n = len(nums)
        visit = [False] * n
        adj = [[] for _ in range(n)]
        for i in range(n):
            for j in range(i + 1, n):
                if gcd(nums[i], nums[j]) > 1:
                    adj[i].append(j)
                    adj[j].append(i)

        def dfs(node):
            visit[node] = True
            for nei in adj[node]:
                if not visit[nei]:
                    dfs(nei)

        dfs(0)
        for node in visit:
            if not node:
                return False
        return True
```

```java
public class Solution {
    public boolean canTraverseAllPairs(int[] nums) {
        int n = nums.length;
        boolean[] visit = new boolean[n];
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (gcd(nums[i], nums[j]) > 1) {
                    adj.get(i).add(j);
                    adj.get(j).add(i);
                }
            }
        }

        dfs(0, adj, visit);
        for (boolean node : visit) {
            if (!node) {
                return false;
            }
        }
        return true;
    }

    private void dfs(int node, List<List<Integer>> adj, boolean[] visit) {
        visit[node] = true;
        for (int nei : adj.get(node)) {
            if (!visit[nei]) {
                dfs(nei, adj, visit);
            }
        }
    }

    private int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}
```

```cpp
class Solution {
public:
    bool canTraverseAllPairs(vector<int>& nums) {
        int n = nums.size();
        vector<bool> visit(n, false);
        vector<vector<int>> adj(n);
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (__gcd(nums[i], nums[j]) > 1) {
                    adj[i].push_back(j);
                    adj[j].push_back(i);
                }
            }
        }

        dfs(0, adj, visit);
        for (bool node : visit) {
            if (!node) {
                return false;
            }
        }
        return true;
    }

private:
    void dfs(int node, vector<vector<int>>& adj, vector<bool>& visit) {
        visit[node] = true;
        for (int& nei : adj[node]) {
            if (!visit[nei]) {
                dfs(nei, adj, visit);
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    canTraverseAllPairs(nums) {
        const n = nums.length;
        const visit = new Array(n).fill(false);
        const adj = Array.from({ length: n }, () => []);

        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (gcd(nums[i], nums[j]) > 1) {
                    adj[i].push(j);
                    adj[j].push(i);
                }
            }
        }

        const dfs = (node) => {
            visit[node] = true;
            for (const nei of adj[node]) {
                if (!visit[nei]) {
                    dfs(nei);
                }
            }
        };

        dfs(0);
        return visit.every((node) => node);
    }
}
```

```csharp
public class Solution {
    public bool CanTraverseAllPairs(int[] nums) {
        int n = nums.Length;
        bool[] visited = new bool[n];
        List<int>[] adj = new List<int>[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
        }

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (GCD(nums[i], nums[j]) > 1) {
                    adj[i].Add(j);
                    adj[j].Add(i);
                }
            }
        }

        void DFS(int node) {
            visited[node] = true;
            foreach (int neighbor in adj[node]) {
                if (!visited[neighbor]) {
                    DFS(neighbor);
                }
            }
        }

        DFS(0);
        foreach (bool v in visited) {
            if (!v) return false;
        }

        return true;
    }

    private int GCD(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \log n)$
- Space complexity: $O(n ^ 2)$

---

## 2. Disjoint Set Union

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
    def canTraverseAllPairs(self, nums: List[int]) -> bool:
        uf = UnionFind(len(nums))

        factor_index = {}  # f -> index of value with factor f
        for i, n in enumerate(nums):
            f = 2
            while f * f <= n:
                if n % f == 0:
                    if f in factor_index:
                        uf.union(i, factor_index[f])
                    else:
                        factor_index[f] = i
                    while n % f == 0:
                        n = n // f
                f += 1
            if n > 1:
                if n in factor_index:
                    uf.union(i, factor_index[n])
                else:
                    factor_index[n] = i

        return uf.isConnected()
```

```java
class UnionFind {
    private int n;
    private int[] Parent;
    private int[] Size;

    public UnionFind(int n) {
        this.n = n;
        this.Parent = new int[n + 1];
        this.Size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            this.Parent[i] = i;
            this.Size[i] = 1;
        }
    }

    public int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    public boolean union(int u, int v) {
        int pu = find(u);
        int pv = find(v);
        if (pu == pv) return false;
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
    public boolean canTraverseAllPairs(int[] nums) {
        int n = nums.length;
        UnionFind uf = new UnionFind(n);
        Map<Integer, Integer> factorIndex = new HashMap<>();

        for (int i = 0; i < n; i++) {
            int num = nums[i];
            int f = 2;
            while (f * f <= num) {
                if (num % f == 0) {
                    if (factorIndex.containsKey(f)) {
                        uf.union(i, factorIndex.get(f));
                    } else {
                        factorIndex.put(f, i);
                    }
                    while (num % f == 0) {
                        num /= f;
                    }
                }
                f++;
            }
            if (num > 1) {
                if (factorIndex.containsKey(num)) {
                    uf.union(i, factorIndex.get(num));
                } else {
                    factorIndex.put(num, i);
                }
            }
        }

        return uf.isConnected();
    }
}
```

```cpp
class UnionFind {
private:
    int n;
    vector<int> Parent;
    vector<int> Size;

public:
    UnionFind(int n) : n(n), Parent(n + 1), Size(n + 1, 1) {
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
        }
    }

    int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    bool unionNodes(int u, int v) {
        int pu = find(u);
        int pv = find(v);
        if (pu == pv) return false;
        n--;
        if (Size[pu] < Size[pv]) swap(pu, pv);
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
    bool canTraverseAllPairs(vector<int>& nums) {
        int n = nums.size();
        UnionFind uf(n);

        unordered_map<int, int> factor_index;

        for (int i = 0; i < n; i++) {
            int num = nums[i];
            int f = 2;
            while (f * f <= num) {
                if (num % f == 0) {
                    if (factor_index.count(f)) {
                        uf.unionNodes(i, factor_index[f]);
                    } else {
                        factor_index[f] = i;
                    }
                    while (num % f == 0) {
                        num /= f;
                    }
                }
                f++;
            }
            if (num > 1) {
                if (factor_index.count(num)) {
                    uf.unionNodes(i, factor_index[num]);
                } else {
                    factor_index[num] = i;
                }
            }
        }

        return uf.isConnected();
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
     * @param {number[]} nums
     * @return {boolean}
     */
    canTraverseAllPairs(nums) {
        const n = nums.length;
        const uf = new UnionFind(n);
        const factor_index = new Map();

        for (let i = 0; i < n; i++) {
            let num = nums[i];
            let f = 2;
            while (f * f <= num) {
                if (num % f === 0) {
                    if (factor_index.has(f)) {
                        uf.union(i, factor_index.get(f));
                    } else {
                        factor_index.set(f, i);
                    }
                    while (num % f === 0) {
                        num = Math.floor(num / f);
                    }
                }
                f++;
            }
            if (num > 1) {
                if (factor_index.has(num)) {
                    uf.union(i, factor_index.get(num));
                } else {
                    factor_index.set(num, i);
                }
            }
        }

        return uf.isConnected();
    }
}
```

```csharp
public class Solution {
    public class UnionFind {
        public int Count;
        private int[] Parent;
        private int[] Size;

        public UnionFind(int n) {
            Count = n;
            Parent = new int[n];
            Size = new int[n];
            for (int i = 0; i < n; i++) {
                Parent[i] = i;
                Size[i] = 1;
            }
        }

        public int Find(int x) {
            if (Parent[x] != x) {
                Parent[x] = Find(Parent[x]);
            }
            return Parent[x];
        }

        public bool Union(int x, int y) {
            int px = Find(x);
            int py = Find(y);
            if (px == py) return false;
            Count--;
            if (Size[px] < Size[py]) {
                int temp = px;
                px = py;
                py = temp;
            }
            Size[px] += Size[py];
            Parent[py] = px;
            return true;
        }

        public bool IsConnected() {
            return Count == 1;
        }
    }

    public bool CanTraverseAllPairs(int[] nums) {
        int n = nums.Length;
        if (n == 1) return true;
        if (Array.Exists(nums, x => x == 1)) return false;

        UnionFind uf = new UnionFind(n);
        Dictionary<int, int> factorIndex = new Dictionary<int, int>();

        for (int i = 0; i < n; i++) {
            int num = nums[i];
            int original = num;
            for (int f = 2; f * f <= num; f++) {
                if (num % f == 0) {
                    if (factorIndex.ContainsKey(f)) {
                        uf.Union(i, factorIndex[f]);
                    } else {
                        factorIndex[f] = i;
                    }
                    while (num % f == 0) {
                        num /= f;
                    }
                }
            }
            if (num > 1) {
                if (factorIndex.ContainsKey(num)) {
                    uf.Union(i, factorIndex[num]);
                } else {
                    factorIndex[num] = i;
                }
            }
        }

        return uf.IsConnected();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n\sqrt {m})$
- Space complexity: $O(n \log m)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum value in the array.

---

## 3. Sieve of Eratosthenes + DSU

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
    def canTraverseAllPairs(self, nums: List[int]) -> bool:
        N = len(nums)
        if N == 1:
            return True
        if any(num == 1 for num in nums):
            return False

        MAX = max(nums)
        sieve = [0] * (MAX + 1)
        p = 2
        while p * p <= MAX:
            if sieve[p] == 0:
                for composite in range(p * p, MAX + 1, p):
                    sieve[composite] = p
            p += 1

        uf = UnionFind(N + MAX + 1)
        for i in range(N):
            num = nums[i]
            if sieve[num] == 0:  # num is prime
                uf.union(i, N + num)
                continue

            while num > 1:
                prime = sieve[num] if sieve[num] != 0 else num
                uf.union(i, N + prime)
                while num % prime == 0:
                    num //= prime

        root = uf.find(0)
        for i in range(1, N):
            if uf.find(i) != root:
                return False
        return True
```

```java
class UnionFind {
    private int[] Parent;
    private int[] Size;

    public UnionFind(int n) {
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
        int pu = find(u);
        int pv = find(v);
        if (pu == pv) {
            return false;
        }
        if (Size[pu] < Size[pv]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }
}

public class Solution {
    public boolean canTraverseAllPairs(int[] nums) {
        int N = nums.length;
        if (N == 1) {
            return true;
        }
        int MAX = 0;
        for (int num : nums) {
            MAX = Math.max(MAX, num);
            if (num == 1) {
                return false;
            }
        }

        int[] sieve = new int[MAX + 1];
        for (int p = 2; p * p <= MAX; p++) {
            if (sieve[p] == 0) {
                for (int composite = p * p; composite <= MAX; composite += p) {
                    sieve[composite] = p;
                }
            }
        }

        UnionFind uf = new UnionFind(N + MAX + 1);
        for (int i = 0; i < N; i++) {
            int num = nums[i];
            if (sieve[num] == 0) { // num is prime
                uf.union(i, N + num);
                continue;
            }

            while (num > 1) {
                int prime = sieve[num] != 0 ? sieve[num] : num;
                uf.union(i, N + prime);
                while (num % prime == 0) {
                    num /= prime;
                }
            }
        }

        int root = uf.find(0);
        for (int i = 1; i < N; i++) {
            if (uf.find(i) != root) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class UnionFind {
private:
    vector<int> Parent, Size;

public:
    UnionFind(int n) {
        Parent.resize(n + 1);
        Size.resize(n + 1, 1);
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
        }
    }

    int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    bool unionSet(int u, int v) {
        int pu = find(u);
        int pv = find(v);
        if (pu == pv) {
            return false;
        }
        if (Size[pu] < Size[pv]) {
            swap(pu, pv);
        }
        Size[pu] += Size[pv];
        Parent[pv] = pu;
        return true;
    }
};

class Solution {
public:
    bool canTraverseAllPairs(vector<int>& nums) {
        int N = nums.size();
        if (N == 1) {
            return true;
        }
        for (int num : nums) {
            if (num == 1) {
                return false;
            }
        }

        int MAX = *max_element(nums.begin(), nums.end());
        vector<int> sieve(MAX + 1, 0);
        for (int p = 2; p * p <= MAX; p++) {
            if (sieve[p] == 0) {
                for (int composite = p * p; composite <= MAX; composite += p) {
                    sieve[composite] = p;
                }
            }
        }

        UnionFind uf(N + MAX + 1);
        for (int i = 0; i < N; i++) {
            int num = nums[i];
            if (sieve[num] == 0) { // num is prime
                uf.unionSet(i, N + num);
                continue;
            }

            while (num > 1) {
                int prime = sieve[num] != 0 ? sieve[num] : num;
                uf.unionSet(i, N + prime);
                while (num % prime == 0) {
                    num /= prime;
                }
            }
        }

        int root = uf.find(0);
        for (int i = 1; i < N; i++) {
            if (uf.find(i) != root) {
                return false;
            }
        }
        return true;
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
     * @param {number[]} nums
     * @return {boolean}
     */
    canTraverseAllPairs(nums) {
        const N = nums.length;
        if (N === 1) return true;
        if (nums.includes(1)) return false;

        const MAX = Math.max(...nums);
        const sieve = Array(MAX + 1).fill(0);
        for (let p = 2; p * p <= MAX; p++) {
            if (sieve[p] === 0) {
                for (let composite = p * p; composite <= MAX; composite += p) {
                    sieve[composite] = p;
                }
            }
        }

        const uf = new UnionFind(N + MAX + 1);
        for (let i = 0; i < N; i++) {
            let num = nums[i];
            if (sieve[num] === 0) {
                // num is prime
                uf.union(i, N + num);
                continue;
            }

            while (num > 1) {
                const prime = sieve[num] !== 0 ? sieve[num] : num;
                uf.union(i, N + prime);
                while (num % prime === 0) {
                    num = Math.floor(num / prime);
                }
            }
        }

        const root = uf.find(0);
        for (let i = 1; i < N; i++) {
            if (uf.find(i) !== root) {
                return false;
            }
        }
        return true;
    }
}
```

```csharp
public class UnionFind {
    public int[] Parent;
    public int[] Size;

    public UnionFind(int n) {
        Parent = new int[n];
        Size = new int[n];
        for (int i = 0; i < n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    public int Find(int x) {
        if (Parent[x] != x) {
            Parent[x] = Find(Parent[x]);
        }
        return Parent[x];
    }

    public bool Union(int x, int y) {
        int px = Find(x);
        int py = Find(y);
        if (px == py) return false;
        if (Size[px] < Size[py]) {
            int temp = px;
            px = py;
            py = temp;
        }
        Parent[py] = px;
        Size[px] += Size[py];
        return true;
    }
}

public class Solution {
    public bool CanTraverseAllPairs(int[] nums) {
        int n = nums.Length;
        if (n == 1) return true;
        if (Array.Exists(nums, x => x == 1)) return false;

        int maxVal = nums.Max();
        int[] sieve = new int[maxVal + 1];
        for (int i = 2; i * i <= maxVal; i++) {
            if (sieve[i] == 0) {
                for (int j = i * i; j <= maxVal; j += i) {
                    if (sieve[j] == 0) sieve[j] = i;
                }
            }
        }

        UnionFind uf = new UnionFind(n + maxVal + 1);

        for (int i = 0; i < n; i++) {
            int num = nums[i];
            if (sieve[num] == 0) {
                uf.Union(i, n + num);
                continue;
            }

            while (num > 1) {
                int prime = sieve[num] != 0 ? sieve[num] : num;
                uf.Union(i, n + prime);
                while (num % prime == 0) {
                    num /= prime;
                }
            }
        }

        int root = uf.Find(0);
        for (int i = 1; i < n; i++) {
            if (uf.Find(i) != root) return false;
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n \log m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum value in the array.

---

## 4. Sieve of Eratosthenes + DFS

::tabs-start

```python
class Solution:
    def canTraverseAllPairs(self, nums: List[int]) -> bool:
        N = len(nums)
        if N == 1:
            return True
        if any(num == 1 for num in nums):
            return False

        MAX = max(nums)
        sieve = [0] * (MAX + 1)
        p = 2
        while p * p <= MAX:
            if sieve[p] == 0:
                for composite in range(p * p, MAX + 1, p):
                    sieve[composite] = p
            p += 1

        adj = defaultdict(list)
        for i in range(N):
            num = nums[i]
            if sieve[num] == 0:  # num is prime
                adj[i].append(N + num)
                adj[N + num].append(i)
                continue

            while num > 1:
                prime = sieve[num] if sieve[num] != 0 else num
                adj[i].append(N + prime)
                adj[N + prime].append(i)
                while num % prime == 0:
                    num //= prime

        visited = set()
        def dfs(node):
            visited.add(node)
            for nei in adj[node]:
                if nei not in visited:
                    dfs(nei)

        dfs(0)
        for i in range(N):
            if i not in visited:
                return False
        return True
```

```java
public class Solution {
    public boolean canTraverseAllPairs(int[] nums) {
        int N = nums.length;
        if (N == 1) return true;
        for (int num : nums) {
            if (num == 1) return false;
        }

        int MAX = Arrays.stream(nums).max().getAsInt();
        int[] sieve = new int[MAX + 1];
        for (int p = 2; p * p <= MAX; p++) {
            if (sieve[p] == 0) {
                for (int composite = p * p; composite <= MAX; composite += p) {
                    sieve[composite] = p;
                }
            }
        }

        Map<Integer, List<Integer>> adj = new HashMap<>();
        for (int i = 0; i < N; i++) {
            int num = nums[i];
            adj.putIfAbsent(i, new ArrayList<>());

            if (sieve[num] == 0) {
                adj.putIfAbsent(N + num, new ArrayList<>());
                adj.get(i).add(N + num);
                adj.get(N + num).add(i);
                continue;
            }

            while (num > 1) {
                int prime = (sieve[num] == 0) ? num : sieve[num];
                adj.putIfAbsent(N + prime, new ArrayList<>());
                adj.get(i).add(N + prime);
                adj.get(N + prime).add(i);
                while (num % prime == 0) num /= prime;
            }
        }

        Set<Integer> visited = new HashSet<>();
        dfs(0, adj, visited);
        for (int i = 0; i < N; i++) {
            if (!visited.contains(i)) return false;
        }
        return true;
    }

    private void dfs(int node, Map<Integer, List<Integer>> adj, Set<Integer> visited) {
        visited.add(node);
        for (int neighbor : adj.get(node)) {
            if (!visited.contains(neighbor)) {
                dfs(neighbor, adj, visited);
            }
        }
    }
}
```

```cpp
class Solution {
public:
    bool canTraverseAllPairs(vector<int>& nums) {
        int N = nums.size();
        if (N == 1) return true;
        if (find(nums.begin(), nums.end(), 1) != nums.end()) return false;

        int MAX = *max_element(nums.begin(), nums.end());
        vector<int> sieve(MAX + 1, 0);
        for (int p = 2; p * p <= MAX; p++) {
            if (sieve[p] == 0) {
                for (int composite = p * p; composite <= MAX; composite += p) {
                    sieve[composite] = p;
                }
            }
        }

        unordered_map<int, vector<int>> adj;
        for (int i = 0; i < N; i++) {
            int num = nums[i];
            if (!adj.count(i)) adj[i] = {};

            if (sieve[num] == 0) {
                adj[N + num].push_back(i);
                adj[i].push_back(N + num);
                continue;
            }

            while (num > 1) {
                int prime = (sieve[num] == 0) ? num : sieve[num];
                adj[N + prime].push_back(i);
                adj[i].push_back(N + prime);
                while (num % prime == 0) num /= prime;
            }
        }

        unordered_set<int> visited;
        dfs(0, adj, visited);
        for (int i = 0; i < N; i++) {
            if (visited.find(i) == visited.end()) return false;
        }
        return true;
    }

private:
    void dfs(int node, unordered_map<int, vector<int>>& adj, unordered_set<int>& visited) {
        visited.insert(node);
        for (int& neighbor : adj[node]) {
            if (visited.find(neighbor) == visited.end()) {
                dfs(neighbor, adj, visited);
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    canTraverseAllPairs(nums) {
        const N = nums.length;
        if (N === 1) return true;
        if (nums.includes(1)) return false;

        const MAX = Math.max(...nums);
        const sieve = new Array(MAX + 1).fill(0);
        for (let p = 2; p * p <= MAX; p++) {
            if (sieve[p] === 0) {
                for (let composite = p * p; composite <= MAX; composite += p) {
                    sieve[composite] = p;
                }
            }
        }

        const adj = new Map();
        for (let i = 0; i < N; i++) {
            if (!adj.has(i)) adj.set(i, []);
            let num = nums[i];

            if (sieve[num] === 0) {
                if (!adj.has(N + num)) adj.set(N + num, []);
                adj.get(i).push(N + num);
                adj.get(N + num).push(i);
                continue;
            }

            while (num > 1) {
                const prime = sieve[num] === 0 ? num : sieve[num];
                if (!adj.has(N + prime)) adj.set(N + prime, []);
                adj.get(i).push(N + prime);
                adj.get(N + prime).push(i);
                while (num % prime === 0) num = Math.floor(num / prime);
            }
        }

        const visited = new Set();
        const dfs = (node) => {
            visited.add(node);
            for (const neighbor of adj.get(node) || []) {
                if (!visited.has(neighbor)) {
                    dfs(neighbor);
                }
            }
        };

        dfs(0);
        for (let i = 0; i < N; i++) {
            if (!visited.has(i)) return false;
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool CanTraverseAllPairs(int[] nums) {
        int N = nums.Length;
        if (N == 1) return true;
        if (Array.Exists(nums, num => num == 1)) return false;

        int MAX = nums.Max();
        int[] sieve = new int[MAX + 1];
        for (int p = 2; p * p <= MAX; p++) {
            if (sieve[p] == 0) {
                for (int mult = p * p; mult <= MAX; mult += p) {
                    if (sieve[mult] == 0) {
                        sieve[mult] = p;
                    }
                }
            }
        }

        Dictionary<int, List<int>> adj = new Dictionary<int, List<int>>();
        for (int i = 0; i < N; i++) {
            int num = nums[i];
            if (sieve[num] == 0) {
                AddEdge(adj, i, N + num);
                continue;
            }
            while (num > 1) {
                int prime = sieve[num] != 0 ? sieve[num] : num;
                AddEdge(adj, i, N + prime);
                while (num % prime == 0) {
                    num /= prime;
                }
            }
        }

        HashSet<int> visited = new HashSet<int>();
        DFS(0, adj, visited);

        for (int i = 0; i < N; i++) {
            if (!visited.Contains(i)) return false;
        }

        return true;
    }

    private void AddEdge(Dictionary<int, List<int>> adj, int u, int v) {
        if (!adj.ContainsKey(u)) adj[u] = new List<int>();
        if (!adj.ContainsKey(v)) adj[v] = new List<int>();
        adj[u].Add(v);
        adj[v].Add(u);
    }

    private void DFS(int node, Dictionary<int, List<int>> adj, HashSet<int> visited) {
        visited.Add(node);
        if (!adj.ContainsKey(node)) return;
        foreach (int nei in adj[node]) {
            if (!visited.Contains(nei)) {
                DFS(nei, adj, visited);
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n \log m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum value in the array.

---

## 5. Sieve of Eratosthenes + BFS

::tabs-start

```python
class Solution:
    def canTraverseAllPairs(self, nums: List[int]) -> bool:
        N = len(nums)
        if N == 1:
            return True
        if any(num == 1 for num in nums):
            return False

        MAX = max(nums)
        sieve = [0] * (MAX + 1)
        p = 2
        while p * p <= MAX:
            if sieve[p] == 0:
                for composite in range(p * p, MAX + 1, p):
                    sieve[composite] = p
            p += 1

        adj = defaultdict(list)
        for i in range(N):
            num = nums[i]
            if sieve[num] == 0:  # num is prime
                adj[i].append(N + num)
                adj[N + num].append(i)
                continue

            while num > 1:
                prime = sieve[num] if sieve[num] != 0 else num
                adj[i].append(N + prime)
                adj[N + prime].append(i)
                while num % prime == 0:
                    num //= prime

        visited = set()
        queue = deque([0])
        visited.add(0)
        while queue:
            node = queue.popleft()
            for nei in adj[node]:
                if nei not in visited:
                    visited.add(nei)
                    queue.append(nei)

        for i in range(N):
            if i not in visited:
                return False
        return True
```

```java
public class Solution {
    public boolean canTraverseAllPairs(int[] nums) {
        int N = nums.length;
        if (N == 1) return true;
        for (int num : nums) {
            if (num == 1) return false;
        }

        int MAX = Arrays.stream(nums).max().getAsInt();
        int[] sieve = new int[MAX + 1];
        int p = 2;
        while (p * p <= MAX) {
            if (sieve[p] == 0) {
                for (int composite = p * p; composite <= MAX; composite += p) {
                    sieve[composite] = p;
                }
            }
            p++;
        }

        Map<Integer, List<Integer>> adj = new HashMap<>();
        for (int i = 0; i < N; i++) {
            int num = nums[i];
            if (sieve[num] == 0) { // num is prime
                adj.computeIfAbsent(i, k -> new ArrayList<>()).add(N + num);
                adj.computeIfAbsent(N + num, k -> new ArrayList<>()).add(i);
                continue;
            }

            while (num > 1) {
                int prime = (sieve[num] != 0) ? sieve[num] : num;
                adj.computeIfAbsent(i, k -> new ArrayList<>()).add(N + prime);
                adj.computeIfAbsent(N + prime, k -> new ArrayList<>()).add(i);
                while (num % prime == 0) {
                    num /= prime;
                }
            }
        }

        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        queue.add(0);
        visited.add(0);

        while (!queue.isEmpty()) {
            int node = queue.poll();
            for (int nei : adj.getOrDefault(node, new ArrayList<>())) {
                if (!visited.contains(nei)) {
                    visited.add(nei);
                    queue.add(nei);
                }
            }
        }

        for (int i = 0; i < N; i++) {
            if (!visited.contains(i)) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool canTraverseAllPairs(vector<int>& nums) {
        int N = nums.size();
        if (N == 1) return true;
        if (find(nums.begin(), nums.end(), 1) != nums.end()) return false;

        int MAX = *max_element(nums.begin(), nums.end());
        vector<int> sieve(MAX + 1, 0);
        int p = 2;
        while (p * p <= MAX) {
            if (sieve[p] == 0) {
                for (int composite = p * p; composite <= MAX; composite += p) {
                    sieve[composite] = p;
                }
            }
            p++;
        }

        unordered_map<int, vector<int>> adj;
        for (int i = 0; i < N; i++) {
            int num = nums[i];
            if (sieve[num] == 0) { // num is prime
                adj[i].push_back(N + num);
                adj[N + num].push_back(i);
                continue;
            }

            while (num > 1) {
                int prime = (sieve[num] != 0) ? sieve[num] : num;
                adj[i].push_back(N + prime);
                adj[N + prime].push_back(i);
                while (num % prime == 0) {
                    num /= prime;
                }
            }
        }

        unordered_set<int> visited;
        queue<int> q;
        q.push(0);
        visited.insert(0);

        while (!q.empty()) {
            int node = q.front();
            q.pop();
            for (int& nei : adj[node]) {
                if (visited.find(nei) == visited.end()) {
                    visited.insert(nei);
                    q.push(nei);
                }
            }
        }

        for (int i = 0; i < N; i++) {
            if (visited.find(i) == visited.end()) {
                return false;
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    canTraverseAllPairs(nums) {
        const N = nums.length;
        if (N === 1) return true;
        if (nums.includes(1)) return false;

        const MAX = Math.max(...nums);
        const sieve = Array(MAX + 1).fill(0);
        let p = 2;
        while (p * p <= MAX) {
            if (sieve[p] === 0) {
                for (let composite = p * p; composite <= MAX; composite += p) {
                    sieve[composite] = p;
                }
            }
            p++;
        }

        const adj = new Map();
        for (let i = 0; i < N; i++) {
            let num = nums[i];
            if (sieve[num] === 0) {
                // num is prime
                if (!adj.has(i)) adj.set(i, []);
                if (!adj.has(N + num)) adj.set(N + num, []);
                adj.get(i).push(N + num);
                adj.get(N + num).push(i);
                continue;
            }

            while (num > 1) {
                const prime = sieve[num] !== 0 ? sieve[num] : num;
                if (!adj.has(i)) adj.set(i, []);
                if (!adj.has(N + prime)) adj.set(N + prime, []);
                adj.get(i).push(N + prime);
                adj.get(N + prime).push(i);
                while (num % prime === 0) {
                    num = Math.floor(num / prime);
                }
            }
        }

        const visited = new Set();
        const queue = new Queue([0]);
        visited.add(0);

        while (!queue.isEmpty()) {
            const node = queue.pop();
            if (adj.has(node)) {
                for (const nei of adj.get(node)) {
                    if (!visited.has(nei)) {
                        visited.add(nei);
                        queue.push(nei);
                    }
                }
            }
        }

        for (let i = 0; i < N; i++) {
            if (!visited.has(i)) {
                return false;
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public bool CanTraverseAllPairs(int[] nums) {
        int N = nums.Length;
        if (N == 1) return true;
        if (nums.Contains(1)) return false;

        int MAX = nums.Max();
        int[] sieve = new int[MAX + 1];
        for (int p = 2; p * p <= MAX; p++) {
            if (sieve[p] == 0) {
                for (int composite = p * p; composite <= MAX; composite += p) {
                    if (sieve[composite] == 0) {
                        sieve[composite] = p;
                    }
                }
            }
        }

        Dictionary<int, List<int>> adj = new Dictionary<int, List<int>>();
        for (int i = 0; i < N; i++) {
            int num = nums[i];
            if (sieve[num] == 0) {
                AddEdge(adj, i, N + num);
                continue;
            }

            while (num > 1) {
                int prime = sieve[num] != 0 ? sieve[num] : num;
                AddEdge(adj, i, N + prime);
                while (num % prime == 0) {
                    num /= prime;
                }
            }
        }

        HashSet<int> visited = new HashSet<int>();
        Queue<int> queue = new Queue<int>();
        queue.Enqueue(0);
        visited.Add(0);

        while (queue.Count > 0) {
            int node = queue.Dequeue();
            if (!adj.ContainsKey(node)) continue;
            foreach (int nei in adj[node]) {
                if (!visited.Contains(nei)) {
                    visited.Add(nei);
                    queue.Enqueue(nei);
                }
            }
        }

        for (int i = 0; i < N; i++) {
            if (!visited.Contains(i)) return false;
        }

        return true;
    }

    private void AddEdge(Dictionary<int, List<int>> adj, int u, int v) {
        if (!adj.ContainsKey(u)) adj[u] = new List<int>();
        if (!adj.ContainsKey(v)) adj[v] = new List<int>();
        adj[u].Add(v);
        adj[v].Add(u);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n \log m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum value in the array.
