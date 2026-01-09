## 1. Simulation

### Intuition

Think of building the target array as painting horizontal layers. Each operation increments a contiguous subarray by 1, which is like painting one layer. We can recursively find the minimum element in a range, paint up to that height, then solve the left and right portions independently.

The minimum element acts as a "floor" that separates the problem into independent subproblems. We paint `min_value - current_height` layers across the whole range, then recursively handle the regions to the left and right of the minimum.

### Algorithm

1. Define a recursive function with parameters: left bound, right bound, and current height.
2. Base case: if left > right, return 0.
3. Find the index of the minimum value in the range.
4. Add `target[minIdx] - height` to the result (layers needed to reach this minimum).
5. Recursively solve for the left portion and right portion using the new height.
6. Return the total.

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

```go
func minNumberOperations(target []int) int {
    var rec func(l, r, h int) int
    rec = func(l, r, h int) int {
        if l > r {
            return 0
        }

        minIdx := l
        for i := l + 1; i <= r; i++ {
            if target[i] < target[minIdx] {
                minIdx = i
            }
        }

        res := target[minIdx] - h
        res += rec(l, minIdx-1, target[minIdx])
        res += rec(minIdx+1, r, target[minIdx])

        return res
    }

    return rec(0, len(target)-1, 0)
}
```

```kotlin
class Solution {
    fun minNumberOperations(target: IntArray): Int {
        fun rec(l: Int, r: Int, h: Int): Int {
            if (l > r) return 0

            var minIdx = l
            for (i in l + 1..r) {
                if (target[i] < target[minIdx]) {
                    minIdx = i
                }
            }

            var res = target[minIdx] - h
            res += rec(l, minIdx - 1, target[minIdx])
            res += rec(minIdx + 1, r, target[minIdx])

            return res
        }

        return rec(0, target.size - 1, 0)
    }
}
```

```swift
class Solution {
    func minNumberOperations(_ target: [Int]) -> Int {
        func rec(_ l: Int, _ r: Int, _ h: Int) -> Int {
            if l > r { return 0 }

            var minIdx = l
            for i in (l + 1)...r {
                if target[i] < target[minIdx] {
                    minIdx = i
                }
            }

            var res = target[minIdx] - h
            res += rec(l, minIdx - 1, target[minIdx])
            res += rec(minIdx + 1, r, target[minIdx])

            return res
        }

        return rec(0, target.count - 1, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$ for recursion stack.

---

## 2. Segment Tree

### Intuition

The simulation approach is slow because finding the minimum in each range takes O(n) time. A segment tree allows O(log n) range minimum queries, speeding up the overall algorithm.

The logic remains the same: divide at the minimum, but now we query the segment tree instead of scanning linearly. This reduces the total time from O(n^2) to O(n log n).

### Algorithm

1. Build a segment tree that stores indices of minimum values for each range.
2. Use the same recursive divide-and-conquer approach:
   - Query the segment tree for the minimum index in the current range.
   - Add the difference between the minimum value and current height.
   - Recursively process left and right subranges.
3. Return the total operation count.

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

```go
const INF = int(^uint(0) >> 1)

type SegmentTree struct {
    A    []int
    tree []int
    n    int
}

func NewSegmentTree(arr []int) *SegmentTree {
    n := len(arr)
    pow2 := 1
    for pow2 < n {
        pow2 <<= 1
    }

    A := make([]int, pow2)
    copy(A, arr)
    for i := len(arr); i < pow2; i++ {
        A[i] = INF
    }

    tree := make([]int, 2*pow2)
    st := &SegmentTree{A: A, tree: tree, n: pow2}
    st.build()
    return st
}

func (st *SegmentTree) build() {
    for i := 0; i < st.n; i++ {
        st.tree[st.n+i] = i
    }
    for i := st.n - 1; i > 0; i-- {
        a := st.tree[i<<1]
        b := st.tree[(i<<1)|1]
        if st.A[a] <= st.A[b] {
            st.tree[i] = a
        } else {
            st.tree[i] = b
        }
    }
}

func (st *SegmentTree) Query(ql, qh int) int {
    return st.query(1, 0, st.n-1, ql, qh)
}

func (st *SegmentTree) query(node, l, h, ql, qh int) int {
    if ql > h || qh < l {
        return -1
    }
    if l >= ql && h <= qh {
        return st.tree[node]
    }
    mid := (l + h) >> 1
    a := st.query(node<<1, l, mid, ql, qh)
    b := st.query((node<<1)|1, mid+1, h, ql, qh)
    if a == -1 {
        return b
    }
    if b == -1 {
        return a
    }
    if st.A[a] <= st.A[b] {
        return a
    }
    return b
}

func minNumberOperations(target []int) int {
    seg := NewSegmentTree(target)

    var rec func(l, r, h int) int
    rec = func(l, r, h int) int {
        if l > r {
            return 0
        }
        minIdx := seg.Query(l, r)
        res := target[minIdx] - h
        res += rec(l, minIdx-1, target[minIdx])
        res += rec(minIdx+1, r, target[minIdx])
        return res
    }

    return rec(0, len(target)-1, 0)
}
```

```kotlin
class SegmentTree(arr: IntArray) {
    private val A: IntArray
    private val tree: IntArray
    private val n: Int

    init {
        var pow2 = 1
        while (pow2 < arr.size) pow2 = pow2 shl 1
        n = pow2

        A = IntArray(n) { Int.MAX_VALUE }
        arr.copyInto(A)

        tree = IntArray(2 * n)
        build()
    }

    private fun build() {
        for (i in 0 until n) {
            tree[n + i] = i
        }
        for (i in n - 1 downTo 1) {
            val a = tree[i shl 1]
            val b = tree[(i shl 1) or 1]
            tree[i] = if (A[a] <= A[b]) a else b
        }
    }

    fun query(ql: Int, qh: Int): Int {
        return query(1, 0, n - 1, ql, qh)
    }

    private fun query(node: Int, l: Int, h: Int, ql: Int, qh: Int): Int {
        if (ql > h || qh < l) return -1
        if (l >= ql && h <= qh) return tree[node]
        val mid = (l + h) shr 1
        val a = query(node shl 1, l, mid, ql, qh)
        val b = query((node shl 1) or 1, mid + 1, h, ql, qh)
        if (a == -1) return b
        if (b == -1) return a
        return if (A[a] <= A[b]) a else b
    }
}

class Solution {
    fun minNumberOperations(target: IntArray): Int {
        val seg = SegmentTree(target)

        fun rec(l: Int, r: Int, h: Int): Int {
            if (l > r) return 0
            val minIdx = seg.query(l, r)
            var res = target[minIdx] - h
            res += rec(l, minIdx - 1, target[minIdx])
            res += rec(minIdx + 1, r, target[minIdx])
            return res
        }

        return rec(0, target.size - 1, 0)
    }
}
```

```swift
class SegmentTree {
    private var A: [Int]
    private var tree: [Int]
    private var n: Int

    init(_ arr: [Int]) {
        var pow2 = 1
        while pow2 < arr.count { pow2 <<= 1 }
        n = pow2

        A = Array(repeating: Int.max, count: n)
        for i in 0..<arr.count {
            A[i] = arr[i]
        }

        tree = Array(repeating: 0, count: 2 * n)
        build()
    }

    private func build() {
        for i in 0..<n {
            tree[n + i] = i
        }
        for i in stride(from: n - 1, through: 1, by: -1) {
            let a = tree[i << 1]
            let b = tree[(i << 1) | 1]
            tree[i] = A[a] <= A[b] ? a : b
        }
    }

    func query(_ ql: Int, _ qh: Int) -> Int {
        return queryHelper(1, 0, n - 1, ql, qh)
    }

    private func queryHelper(_ node: Int, _ l: Int, _ h: Int, _ ql: Int, _ qh: Int) -> Int {
        if ql > h || qh < l { return -1 }
        if l >= ql && h <= qh { return tree[node] }
        let mid = (l + h) >> 1
        let a = queryHelper(node << 1, l, mid, ql, qh)
        let b = queryHelper((node << 1) | 1, mid + 1, h, ql, qh)
        if a == -1 { return b }
        if b == -1 { return a }
        return A[a] <= A[b] ? a : b
    }
}

class Solution {
    func minNumberOperations(_ target: [Int]) -> Int {
        let seg = SegmentTree(target)

        func rec(_ l: Int, _ r: Int, _ h: Int) -> Int {
            if l > r { return 0 }
            let minIdx = seg.query(l, r)
            var res = target[minIdx] - h
            res += rec(l, minIdx - 1, target[minIdx])
            res += rec(minIdx + 1, r, target[minIdx])
            return res
        }

        return rec(0, target.count - 1, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 3. Greedy

### Intuition

Consider how we would paint the array left to right. At the first element, we need `target[0]` operations to build it from 0. For each subsequent element, if it is taller than the previous one, we need additional operations to "extend" our brush strokes upward. If it is shorter or equal, the existing strokes can simply continue or stop.

The key insight: we only need new operations when the height increases. The total count is the first element plus the sum of all positive increases between consecutive elements.

### Algorithm

1. Initialize result with `target[0]` (operations needed for the first element).
2. For each subsequent element:
   - If `target[i] > target[i-1]`, add the difference to result.
   - Otherwise, add nothing (existing operations cover this).
3. Return the result.

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

```go
func minNumberOperations(target []int) int {
    res := target[0]
    for i := 1; i < len(target); i++ {
        if target[i] > target[i-1] {
            res += target[i] - target[i-1]
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun minNumberOperations(target: IntArray): Int {
        var res = target[0]
        for (i in 1 until target.size) {
            res += maxOf(target[i] - target[i - 1], 0)
        }
        return res
    }
}
```

```swift
class Solution {
    func minNumberOperations(_ target: [Int]) -> Int {
        var res = target[0]
        for i in 1..<target.count {
            res += max(target[i] - target[i - 1], 0)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$