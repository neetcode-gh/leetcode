## 1. Simulation

::tabs-start

```python
class Solution:
    def minNumberOperations(self, target: List[int]) -> int:
        def rec(l, r, h):
            if l > r:
                return 0

            minIdx = l
            for i in range(l + 1, r + 1):
                if target[i] < target[minIdx]:
                    minIdx = i

            res = target[minIdx] - h
            return res + rec(l, minIdx - 1, target[minIdx]) + rec(minIdx + 1, r, target[minIdx])

        return rec(0, len(target) - 1, 0)
```

```java
public class Solution {
    public int minNumberOperations(int[] target) {
        return rec(target, 0, target.length - 1, 0);
    }

    private int rec(int[] target, int l, int r, int h) {
        if (l > r) return 0;

        int minIdx = l;
        for (int i = l + 1; i <= r; i++) {
            if (target[i] < target[minIdx]) {
                minIdx = i;
            }
        }

        int res = target[minIdx] - h;
        res += rec(target, l, minIdx - 1, target[minIdx]);
        res += rec(target, minIdx + 1, r, target[minIdx]);

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minNumberOperations(vector<int>& target) {
        return rec(target, 0, target.size() - 1, 0);
    }

private:
    int rec(vector<int>& target, int l, int r, int h) {
        if (l > r) return 0;

        int minIdx = l;
        for (int i = l + 1; i <= r; i++) {
            if (target[i] < target[minIdx]) {
                minIdx = i;
            }
        }

        int res = target[minIdx] - h;
        res += rec(target, l, minIdx - 1, target[minIdx]);
        res += rec(target, minIdx + 1, r, target[minIdx]);

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} target
     * @return {number}
     */
    minNumberOperations(target) {
        const rec = (l, r, h) => {
            if (l > r) return 0;

            let minIdx = l;
            for (let i = l + 1; i <= r; i++) {
                if (target[i] < target[minIdx]) {
                    minIdx = i;
                }
            }

            let res = target[minIdx] - h;
            res += rec(l, minIdx - 1, target[minIdx]);
            res += rec(minIdx + 1, r, target[minIdx]);

            return res;
        };

        return rec(0, target.length - 1, 0);
    }
}
```

```csharp
public class Solution {
    public int MinNumberOperations(int[] target) {
        return Rec(target, 0, target.Length - 1, 0);
    }

    private int Rec(int[] target, int l, int r, int h) {
        if (l > r) return 0;

        int minIdx = l;
        for (int i = l + 1; i <= r; i++) {
            if (target[i] < target[minIdx]) {
                minIdx = i;
            }
        }

        int res = target[minIdx] - h;
        res += Rec(target, l, minIdx - 1, target[minIdx]);
        res += Rec(target, minIdx + 1, r, target[minIdx]);

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$ for recursion stack.

---

## 2. Segment Tree

::tabs-start

```python
INF = float('inf')

class SegmentTree:
    def __init__(self, A):
        self.A = A[:]
        self.n = len(A)
        while (self.n & (self.n - 1)) != 0:
            self.A.append(INF)
            self.n += 1

        self.tree = [0] * (2 * self.n)
        self.build()

    def build(self):
        for i in range(self.n):
            self.tree[self.n + i] = i
        for j in range(self.n - 1, 0, -1):
            a = self.tree[j << 1]
            b = self.tree[(j << 1) | 1]
            self.tree[j] = a if self.A[a] <= self.A[b] else b

    def update(self, i, val):
        self.A[i] = val
        j = (self.n + i) >> 1
        while j >= 1:
            a = self.tree[j << 1]
            b = self.tree[(j << 1) | 1]
            self.tree[j] = a if self.A[a] <= self.A[b] else b
            j >>= 1

    def query(self, ql, qh):
        return self._query(1, 0, self.n - 1, ql, qh)

    def _query(self, node, l, h, ql, qh):
        if ql > h or qh < l:
            return -1
        if l >= ql and h <= qh:
            return self.tree[node]
        mid = (l + h) >> 1
        a = self._query(node << 1, l, mid, ql, qh)
        b = self._query((node << 1) | 1, mid + 1, h, ql, qh)

        if a == -1: return b
        if b == -1: return a
        return a if self.A[a] <= self.A[b] else b

class Solution:
    def minNumberOperations(self, target: List[int]) -> int:
        seg = SegmentTree(target)
        stack = [(0, len(target) - 1, 0)]
        res = 0

        while stack:
            l, r, h = stack.pop()
            if l > r:
                continue
            minIdx = seg.query(l, r)
            res += target[minIdx] - h
            stack.append((l, minIdx - 1, target[minIdx]))
            stack.append((minIdx + 1, r, target[minIdx]))

        return res
```

```java
class SegmentTree {
    int[] A;
    int[] tree;
    int n;
    final int INF = Integer.MAX_VALUE;

    SegmentTree(int[] arr) {
        int len = arr.length;
        int pow2 = 1;
        while (pow2 < len) pow2 <<= 1;
        n = pow2;

        A = new int[n];
        System.arraycopy(arr, 0, A, 0, arr.length);
        for (int i = arr.length; i < n; i++) A[i] = INF;

        tree = new int[2 * n];
        build();
    }

    void build() {
        for (int i = 0; i < n; i++) {
            tree[n + i] = i;
        }
        for (int i = n - 1; i > 0; i--) {
            int a = tree[i << 1], b = tree[(i << 1) | 1];
            tree[i] = A[a] <= A[b] ? a : b;
        }
    }

    int query(int ql, int qh) {
        return _query(1, 0, n - 1, ql, qh);
    }

    int _query(int node, int l, int h, int ql, int qh) {
        if (ql > h || qh < l) return -1;
        if (ql <= l && h <= qh) return tree[node];
        int mid = (l + h) >> 1;
        int left = _query(node << 1, l, mid, ql, qh);
        int right = _query((node << 1) | 1, mid + 1, h, ql, qh);
        if (left == -1) return right;
        if (right == -1) return left;
        return A[left] <= A[right] ? left : right;
    }
}

public class Solution {
    public int minNumberOperations(int[] target) {
        SegmentTree seg = new SegmentTree(target);
        return rec(0, target.length - 1, 0, target, seg);
    }

    private int rec(int l, int r, int h, int[] target, SegmentTree seg) {
        if (l > r) return 0;
        int minIdx = seg.query(l, r);
        int res = target[minIdx] - h;
        res += rec(l, minIdx - 1, target[minIdx], target, seg);
        res += rec(minIdx + 1, r, target[minIdx], target, seg);
        return res;
    }
}
```

```cpp
class SegmentTree {
public:
    int n;
    vector<int> A, tree;
    const int INF = INT_MAX;

    SegmentTree(vector<int>& arr) {
        A = arr;
        n = arr.size();
        while (__builtin_popcount(n) != 1) {
            A.push_back(INF);
            n++;
        }
        tree.resize(2 * n);
        build();
    }

    void build() {
        for (int i = 0; i < n; ++i) {
            tree[n + i] = i;
        }
        for (int j = n - 1; j >= 1; --j) {
            int a = tree[j << 1], b = tree[(j << 1) | 1];
            tree[j] = A[a] <= A[b] ? a : b;
        }
    }

    int query(int ql, int qh) {
        return _query(1, 0, n - 1, ql, qh);
    }

    int _query(int node, int l, int h, int ql, int qh) {
        if (ql > h || qh < l) return -1;
        if (l >= ql && h <= qh) return tree[node];
        int mid = (l + h) >> 1;
        int a = _query(node << 1, l, mid, ql, qh);
        int b = _query((node << 1) | 1, mid + 1, h, ql, qh);
        if (a == -1) return b;
        if (b == -1) return a;
        return A[a] <= A[b] ? a : b;
    }
};

class Solution {
public:
    int minNumberOperations(vector<int>& target) {
        SegmentTree seg(target);
        return rec(0, target.size() - 1, 0, target, seg);
    }

    int rec(int l, int r, int h, vector<int>& target, SegmentTree& seg) {
        if (l > r) return 0;
        int minIdx = seg.query(l, r);
        int res = target[minIdx] - h;
        res += rec(l, minIdx - 1, target[minIdx], target, seg);
        res += rec(minIdx + 1, r, target[minIdx], target, seg);
        return res;
    }
};
```

```javascript
class SegmentTree {
    constructor(A) {
        this.A = [...A];
        this.n = A.length;
        this.INF = Number.POSITIVE_INFINITY;

        while ((this.n & (this.n - 1)) !== 0) {
            this.A.push(this.INF);
            this.n++;
        }

        this.tree = Array(2 * this.n).fill(0);
        this.build();
    }

    build() {
        for (let i = 0; i < this.n; i++) {
            this.tree[this.n + i] = i;
        }
        for (let j = this.n - 1; j >= 1; j--) {
            let a = this.tree[j << 1];
            let b = this.tree[(j << 1) | 1];
            this.tree[j] = this.A[a] <= this.A[b] ? a : b;
        }
    }

    update(i, val) {
        this.A[i] = val;
        let j = (this.n + i) >> 1;
        while (j >= 1) {
            let a = this.tree[j << 1];
            let b = this.tree[(j << 1) | 1];
            this.tree[j] = this.A[a] <= this.A[b] ? a : b;
            j >>= 1;
        }
    }

    query(ql, qh) {
        return this._query(1, 0, this.n - 1, ql, qh);
    }

    _query(node, l, h, ql, qh) {
        if (ql > h || qh < l) return -1;
        if (l >= ql && h <= qh) return this.tree[node];

        let mid = (l + h) >> 1;
        let a = this._query(node << 1, l, mid, ql, qh);
        let b = this._query((node << 1) | 1, mid + 1, h, ql, qh);

        if (a === -1) return b;
        if (b === -1) return a;
        return this.A[a] <= this.A[b] ? a : b;
    }
}

class Solution {
    /**
     * @param {number[]} target
     * @return {number}
     */
    minNumberOperations(target) {
        const seg = new SegmentTree(target);

        const rec = (l, r, h) => {
            if (l > r) return 0;

            const minIdx = seg.query(l, r);
            let res = target[minIdx] - h;
            res += rec(l, minIdx - 1, target[minIdx]);
            res += rec(minIdx + 1, r, target[minIdx]);
            return res;
        };

        return rec(0, target.length - 1, 0);
    }
}
```

```csharp
public class SegmentTree {
    private int[] A;
    private int[] tree;
    private int n;
    private const int INF = int.MaxValue;

    public SegmentTree(int[] arr) {
        int len = arr.Length;
        int pow2 = 1;
        while (pow2 < len) pow2 <<= 1;
        n = pow2;

        A = new int[n];
        Array.Copy(arr, A, arr.Length);
        for (int i = arr.Length; i < n; i++) A[i] = INF;

        tree = new int[2 * n];
        Build();
    }

    private void Build() {
        for (int i = 0; i < n; i++) {
            tree[n + i] = i;
        }
        for (int i = n - 1; i > 0; i--) {
            int a = tree[i << 1];
            int b = tree[(i << 1) | 1];
            tree[i] = A[a] <= A[b] ? a : b;
        }
    }

    public int Query(int ql, int qh) {
        return Query(1, 0, n - 1, ql, qh);
    }

    private int Query(int node, int l, int h, int ql, int qh) {
        if (ql > h || qh < l) return -1;
        if (ql <= l && h <= qh) return tree[node];

        int mid = (l + h) >> 1;
        int left = Query(node << 1, l, mid, ql, qh);
        int right = Query((node << 1) | 1, mid + 1, h, ql, qh);

        if (left == -1) return right;
        if (right == -1) return left;
        return A[left] <= A[right] ? left : right;
    }
}

public class Solution {
    public int MinNumberOperations(int[] target) {
        var seg = new SegmentTree(target);
        return Rec(0, target.Length - 1, 0, target, seg);
    }

    private int Rec(int l, int r, int h, int[] target, SegmentTree seg) {
        if (l > r) return 0;
        int minIdx = seg.Query(l, r);
        int res = target[minIdx] - h;
        res += Rec(l, minIdx - 1, target[minIdx], target, seg);
        res += Rec(minIdx + 1, r, target[minIdx], target, seg);
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 3. Greedy

::tabs-start

```python
class Solution:
    def minNumberOperations(self, target: List[int]) -> int:
        res = target[0]
        for i in range(1, len(target)):
            res += max(target[i] - target[i - 1], 0)
        return res
```

```java
public class Solution {
    public int minNumberOperations(int[] target) {
        int res = target[0];
        for (int i = 1; i < target.length; i++) {
            res += Math.max(target[i] - target[i - 1], 0);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minNumberOperations(vector<int>& target) {
        int res = target[0];
        for (int i = 1; i < target.size(); i++) {
            res += max(target[i] - target[i - 1], 0);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} target
     * @return {number}
     */
    minNumberOperations(target) {
        let res = target[0];
        for (let i = 1; i < target.length; i++) {
            res += Math.max(target[i] - target[i - 1], 0);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinNumberOperations(int[] target) {
        int res = target[0];
        for (int i = 1; i < target.Length; i++) {
            res += Math.Max(target[i] - target[i - 1], 0);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$