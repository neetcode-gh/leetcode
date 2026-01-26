## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Segment Trees** - Divide-and-conquer data structure enabling O(log n) range queries and point updates
- **Binary Indexed Tree (Fenwick Tree)** - Space-efficient tree using bit manipulation for prefix sum queries and updates
- **Square Root Decomposition** - Dividing arrays into blocks for balanced query and update performance
- **Bit Manipulation** - Operations like `index & -index` used in Fenwick trees to navigate the tree structure

---

## 1. Brute Force

### Intuition

The simplest approach stores the array directly. Updates are instant since we just modify a single element. For range sum queries, we iterate through the range and accumulate the total. This is efficient for updates but slow for frequent queries over large ranges.

### Algorithm

1. Store the input array.
2. For `update(index, val)`: Set `nums[index] = val`.
3. For `sumRange(left, right)`:
   - Initialize `res = 0`.
   - Loop from `left` to `right`, adding each element to `res`.
   - Return `res`.

::tabs-start

```python
class NumArray:

    def __init__(self, nums: List[int]):
        self.nums = nums

    def update(self, index: int, val: int) -> None:
        self.nums[index] = val

    def sumRange(self, left: int, right: int) -> int:
        res = 0
        for i in range(left, right + 1):
            res += self.nums[i]
        return res
```

```java
public class NumArray {
    private int[] nums;

    public NumArray(int[] nums) {
        this.nums = nums;
    }

    public void update(int index, int val) {
        nums[index] = val;
    }

    public int sumRange(int left, int right) {
        int res = 0;
        for (int i = left; i <= right; i++) {
            res += nums[i];
        }
        return res;
    }
}
```

```cpp
class NumArray {
private:
    vector<int> nums;

public:
    NumArray(vector<int>& nums) {
        this->nums = nums;
    }

    void update(int index, int val) {
        nums[index] = val;
    }

    int sumRange(int left, int right) {
        int res = 0;
        for (int i = left; i <= right; i++) {
            res += nums[i];
        }
        return res;
    }
};
```

```javascript
class NumArray {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.nums = nums;
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    update(index, val) {
        this.nums[index] = val;
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    sumRange(left, right) {
        let res = 0;
        for (let i = left; i <= right; i++) {
            res += this.nums[i];
        }
        return res;
    }
}
```

```csharp
public class NumArray {
    private int[] nums;

    public NumArray(int[] nums) {
        this.nums = nums;
    }

    public void Update(int index, int val) {
        nums[index] = val;
    }

    public int SumRange(int left, int right) {
        int res = 0;
        for (int i = left; i <= right; i++) {
            res += nums[i];
        }
        return res;
    }
}
```

```go
type NumArray struct {
    nums []int
}

func Constructor(nums []int) NumArray {
    return NumArray{nums: nums}
}

func (this *NumArray) Update(index int, val int) {
    this.nums[index] = val
}

func (this *NumArray) SumRange(left int, right int) int {
    res := 0
    for i := left; i <= right; i++ {
        res += this.nums[i]
    }
    return res
}
```

```kotlin
class NumArray(private val nums: IntArray) {

    fun update(index: Int, `val`: Int) {
        nums[index] = `val`
    }

    fun sumRange(left: Int, right: Int): Int {
        var res = 0
        for (i in left..right) {
            res += nums[i]
        }
        return res
    }
}
```

```swift
class NumArray {
    private var nums: [Int]

    init(_ nums: [Int]) {
        self.nums = nums
    }

    func update(_ index: Int, _ val: Int) {
        nums[index] = val
    }

    func sumRange(_ left: Int, _ right: Int) -> Int {
        var res = 0
        for i in left...right {
            res += nums[i]
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ for initializing the input array.
    - $O(1)$ for each $update()$ function call.
    - $O(n)$ for each $sumRange()$ function call.
- Space complexity: $O(n)$

---

## 2. Recursive Segment Tree

### Intuition

A segment tree divides the array into segments, with each node storing the sum of its segment. The root covers the entire array, and leaves store individual elements. Updates propagate from a leaf to the root, and queries combine relevant segments. This recursive implementation is intuitive but has some function call overhead.

### Algorithm

1. Pad the array size to the next power of two for balanced tree structure.
2. Build the tree recursively:
   - Leaves store array elements.
   - Internal nodes store the sum of their children.
3. For `update(index, val)`:
   - Recursively navigate to the leaf at `index`.
   - Update the leaf and propagate changes up to the root.
4. For `sumRange(left, right)`:
   - Recursively query the tree.
   - If the current segment is outside the range, return `0`.
   - If the current segment is fully inside, return the node value.
   - Otherwise, query both children and sum the results.

::tabs-start

```python
class SegmentTree:
    def __init__(self, N, A):
        self.n = N
        while (self.n & (self.n - 1)) != 0:
            self.n += 1
        self.tree = [0] * (2 * self.n)
        self.build(0, 0, self.n - 1, A)

    def build(self, node, start, end, A):
        if start == end:
            if start < len(A):
                self.tree[node] = A[start]
        else:
            mid = (start + end) // 2
            left = 2 * node + 1
            right = 2 * node + 2
            self.build(left, start, mid, A)
            self.build(right, mid + 1, end, A)
            self.tree[node] = self.tree[left] + self.tree[right]

    def update(self, i, val):
        def _update(node, start, end, idx, value):
            if start == end:
                self.tree[node] = value
            else:
                mid = (start + end) // 2
                left = 2 * node + 1
                right = 2 * node + 2
                if idx <= mid:
                    _update(left, start, mid, idx, value)
                else:
                    _update(right, mid + 1, end, idx, value)
                self.tree[node] = self.tree[left] + self.tree[right]
        _update(0, 0, self.n - 1, i, val)

    def query(self, l, r):
        def _query(node, start, end, L, R):
            if R < start or L > end:
                return 0
            if L <= start and end <= R:
                return self.tree[node]
            mid = (start + end) // 2
            left = 2 * node + 1
            right = 2 * node + 2
            left_sum = _query(left, start, mid, L, R)
            right_sum = _query(right, mid + 1, end, L, R)
            return left_sum + right_sum
        return _query(0, 0, self.n - 1, l, r)

class NumArray:

    def __init__(self, nums: List[int]):
        self.segTree = SegmentTree(len(nums), nums)

    def update(self, index: int, val: int) -> None:
        self.segTree.update(index, val)

    def sumRange(self, left: int, right: int) -> int:
        return self.segTree.query(left, right)
```

```java
class SegmentTree {
    int n;
    int[] tree;

    SegmentTree(int N, int[] A) {
        this.n = N;
        while (Integer.bitCount(n) != 1) {
            n++;
        }
        tree = new int[2 * n];
        build(0, 0, n - 1, A);
    }

    void build(int node, int start, int end, int[] A) {
        if (start == end) {
            tree[node] = (start < A.length) ? A[start] : 0;
            return;
        }
        int mid = start + (end - start) / 2;
        build(node * 2 + 1, start, mid, A);
        build(node * 2 + 2, mid + 1, end, A);
        tree[node] = tree[node * 2 + 1] + tree[node * 2 + 2];
    }

    void update(int idx, int val) {
        update(0, 0, n - 1, idx, val);
    }

    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
            return;
        }
        int mid = start + (end - start) / 2;
        if (idx <= mid) {
            update(node * 2 + 1, start, mid, idx, val);
        } else {
            update(node * 2 + 2, mid + 1, end, idx, val);
        }
        tree[node] = tree[node * 2 + 1] + tree[node * 2 + 2];
    }

    int query(int l, int r) {
        return query(0, 0, n - 1, l, r);
    }

    int query(int node, int start, int end, int l, int r) {
        if (start > r || end < l) {
            return 0;
        }
        if (start >= l && end <= r) {
            return tree[node];
        }
        int mid = start + (end - start) / 2;
        int leftSum = query(node * 2 + 1, start, mid, l, r);
        int rightSum = query(node * 2 + 2, mid + 1, end, l, r);
        return leftSum + rightSum;
    }
}

public class NumArray {
    private SegmentTree segTree;

    public NumArray(int[] nums) {
        this.segTree = new SegmentTree(nums.length, nums);
    }

    public void update(int index, int val) {
        this.segTree.update(index, val);
    }

    public int sumRange(int left, int right) {
        return this.segTree.query(left, right);
    }
}
```

```cpp
class SegmentTree {
public:
    int n;
    vector<int> tree;

    SegmentTree(int N, vector<int>& A) {
        this->n = N;
        while (__builtin_popcount(n) != 1) {
            n++;
        }
        tree.resize(2 * n);
        build(0, 0, n - 1, A);
    }

    void build(int node, int start, int end, vector<int>& A) {
        if (start == end) {
            tree[node] = (start < A.size()) ? A[start] : 0;
        } else {
            int mid = (start + end) / 2;
            build(2 * node + 1, start, mid, A);
            build(2 * node + 2, mid + 1, end, A);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
        } else {
            int mid = (start + end) / 2;
            if (idx <= mid) {
                update(2 * node + 1, start, mid, idx, val);
            } else {
                update(2 * node + 2, mid + 1, end, idx, val);
            }
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) {
            return 0;
        }
        if (l <= start && end <= r) {
            return tree[node];
        }
        int mid = (start + end) / 2;
        int leftSum = query(2 * node + 1, start, mid, l, r);
        int rightSum = query(2 * node + 2, mid + 1, end, l, r);
        return leftSum + rightSum;
    }

    void update(int idx, int val) {
        update(0, 0, n - 1, idx, val);
    }

    int query(int l, int r) {
        return query(0, 0, n - 1, l, r);
    }
};

class NumArray {
    SegmentTree* segTree;

public:
    NumArray(vector<int>& nums) {
        this->segTree = new SegmentTree(nums.size(), nums);
    }

    void update(int index, int val) {
        this->segTree->update(index, val);
    }

    int sumRange(int left, int right) {
        return this->segTree->query(left, right);
    }
};
```

```javascript
class SegmentTree {
    /**
     * @constructor
     * @param {number} N
     * @param {number[]} A
     */
    constructor(N, A) {
        this.n = N;
        while ((this.n & (this.n - 1)) !== 0) {
            this.n++;
        }
        this.tree = new Int32Array(2 * this.n);
        this.build(0, 0, this.n - 1, A);
    }

    /**
     * @param {number} node
     * @param {number} start
     * @param {number} end
     * @param {number[]} A
     */
    build(node, start, end, A) {
        if (start === end) {
            this.tree[node] = start < A.length ? A[start] : 0;
        } else {
            const mid = Math.floor((start + end) / 2);
            this.build(2 * node + 1, start, mid, A);
            this.build(2 * node + 2, mid + 1, end, A);
            this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
        }
    }

    /**
     * @param {number} node
     * @param {number} start
     * @param {number} end
     * @param {number} idx
     * @param {number} val
     * @return {void}
     */
    _update(node, start, end, idx, val) {
        if (start === end) {
            this.tree[node] = val;
        } else {
            const mid = Math.floor((start + end) / 2);
            if (idx <= mid) {
                this._update(2 * node + 1, start, mid, idx, val);
            } else {
                this._update(2 * node + 2, mid + 1, end, idx, val);
            }
            this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
        }
    }

    /**
     * @param {number} node
     * @param {number} start
     * @param {number} end
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    _query(node, start, end, l, r) {
        if (r < start || end < l) {
            return 0;
        }
        if (l <= start && end <= r) {
            return this.tree[node];
        }
        const mid = Math.floor((start + end) / 2);
        const leftSum = this._query(2 * node + 1, start, mid, l, r);
        const rightSum = this._query(2 * node + 2, mid + 1, end, l, r);
        return leftSum + rightSum;
    }

    /**
     * @param {number} idx
     * @param {number} val
     * @return {void}
     */
    update(idx, val) {
        this._update(0, 0, this.n - 1, idx, val);
    }

    /**
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    query(l, r) {
        return this._query(0, 0, this.n - 1, l, r);
    }
}

class NumArray {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.segTree = new SegmentTree(nums.length, nums);
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    update(index, val) {
        this.segTree.update(index, val);
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    sumRange(left, right) {
        return this.segTree.query(left, right);
    }
}
```

```csharp
class SegmentTree {
    private int[] tree;
    private int n;

    public SegmentTree(int N, int[] A) {
        n = N;
        while ((n & (n - 1)) != 0) {
            n++;
        }
        tree = new int[2 * n];
        Build(0, 0, n - 1, A);
    }

    private void Build(int node, int start, int end, int[] A) {
        if (start == end) {
            tree[node] = start < A.Length ? A[start] : 0;
        } else {
            int mid = (start + end) / 2;
            Build(2 * node + 1, start, mid, A);
            Build(2 * node + 2, mid + 1, end, A);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    private void UpdateHelper(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
        } else {
            int mid = (start + end) / 2;
            if (idx <= mid) {
                UpdateHelper(2 * node + 1, start, mid, idx, val);
            } else {
                UpdateHelper(2 * node + 2, mid + 1, end, idx, val);
            }
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    private int QueryHelper(int node, int start, int end, int l, int r) {
        if (r < start || end < l) {
            return 0;
        }
        if (l <= start && end <= r) {
            return tree[node];
        }
        int mid = (start + end) / 2;
        int leftSum = QueryHelper(2 * node + 1, start, mid, l, r);
        int rightSum = QueryHelper(2 * node + 2, mid + 1, end, l, r);
        return leftSum + rightSum;
    }

    public void Update(int idx, int val) {
        UpdateHelper(0, 0, n - 1, idx, val);
    }

    public int Query(int l, int r) {
        return QueryHelper(0, 0, n - 1, l, r);
    }
}

public class NumArray {
    private SegmentTree segTree;

    public NumArray(int[] nums) {
        segTree = new SegmentTree(nums.Length, nums);
    }

    public void Update(int index, int val) {
        segTree.Update(index, val);
    }

    public int SumRange(int left, int right) {
        return segTree.Query(left, right);
    }
}
```

```go
type SegmentTree struct {
    tree []int
    n    int
}

func NewSegmentTree(N int, A []int) *SegmentTree {
    n := N
    for n&(n-1) != 0 {
        n++
    }
    tree := make([]int, 2*n)
    st := &SegmentTree{tree: tree, n: n}
    st.build(0, 0, n-1, A)
    return st
}

func (st *SegmentTree) build(node, start, end int, A []int) {
    if start == end {
        if start < len(A) {
            st.tree[node] = A[start]
        }
    } else {
        mid := (start + end) / 2
        st.build(2*node+1, start, mid, A)
        st.build(2*node+2, mid+1, end, A)
        st.tree[node] = st.tree[2*node+1] + st.tree[2*node+2]
    }
}

func (st *SegmentTree) updateHelper(node, start, end, idx, val int) {
    if start == end {
        st.tree[node] = val
    } else {
        mid := (start + end) / 2
        if idx <= mid {
            st.updateHelper(2*node+1, start, mid, idx, val)
        } else {
            st.updateHelper(2*node+2, mid+1, end, idx, val)
        }
        st.tree[node] = st.tree[2*node+1] + st.tree[2*node+2]
    }
}

func (st *SegmentTree) queryHelper(node, start, end, l, r int) int {
    if r < start || end < l {
        return 0
    }
    if l <= start && end <= r {
        return st.tree[node]
    }
    mid := (start + end) / 2
    leftSum := st.queryHelper(2*node+1, start, mid, l, r)
    rightSum := st.queryHelper(2*node+2, mid+1, end, l, r)
    return leftSum + rightSum
}

func (st *SegmentTree) Update(idx, val int) {
    st.updateHelper(0, 0, st.n-1, idx, val)
}

func (st *SegmentTree) Query(l, r int) int {
    return st.queryHelper(0, 0, st.n-1, l, r)
}

type NumArray struct {
    segTree *SegmentTree
}

func Constructor(nums []int) NumArray {
    return NumArray{segTree: NewSegmentTree(len(nums), nums)}
}

func (this *NumArray) Update(index int, val int) {
    this.segTree.Update(index, val)
}

func (this *NumArray) SumRange(left int, right int) int {
    return this.segTree.Query(left, right)
}
```

```kotlin
class SegmentTree(N: Int, A: IntArray) {
    private var n: Int = N
    private val tree: IntArray

    init {
        while (n and (n - 1) != 0) {
            n++
        }
        tree = IntArray(2 * n)
        build(0, 0, n - 1, A)
    }

    private fun build(node: Int, start: Int, end: Int, A: IntArray) {
        if (start == end) {
            tree[node] = if (start < A.size) A[start] else 0
        } else {
            val mid = (start + end) / 2
            build(2 * node + 1, start, mid, A)
            build(2 * node + 2, mid + 1, end, A)
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2]
        }
    }

    private fun updateHelper(node: Int, start: Int, end: Int, idx: Int, value: Int) {
        if (start == end) {
            tree[node] = value
        } else {
            val mid = (start + end) / 2
            if (idx <= mid) {
                updateHelper(2 * node + 1, start, mid, idx, value)
            } else {
                updateHelper(2 * node + 2, mid + 1, end, idx, value)
            }
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2]
        }
    }

    private fun queryHelper(node: Int, start: Int, end: Int, l: Int, r: Int): Int {
        if (r < start || end < l) {
            return 0
        }
        if (l <= start && end <= r) {
            return tree[node]
        }
        val mid = (start + end) / 2
        val leftSum = queryHelper(2 * node + 1, start, mid, l, r)
        val rightSum = queryHelper(2 * node + 2, mid + 1, end, l, r)
        return leftSum + rightSum
    }

    fun update(idx: Int, value: Int) {
        updateHelper(0, 0, n - 1, idx, value)
    }

    fun query(l: Int, r: Int): Int {
        return queryHelper(0, 0, n - 1, l, r)
    }
}

class NumArray(nums: IntArray) {
    private val segTree = SegmentTree(nums.size, nums)

    fun update(index: Int, `val`: Int) {
        segTree.update(index, `val`)
    }

    fun sumRange(left: Int, right: Int): Int {
        return segTree.query(left, right)
    }
}
```

```swift
class SegmentTree {
    private var tree: [Int]
    private var n: Int

    init(_ N: Int, _ A: [Int]) {
        n = N
        while n & (n - 1) != 0 {
            n += 1
        }
        tree = Array(repeating: 0, count: 2 * n)
        build(0, 0, n - 1, A)
    }

    private func build(_ node: Int, _ start: Int, _ end: Int, _ A: [Int]) {
        if start == end {
            tree[node] = start < A.count ? A[start] : 0
        } else {
            let mid = (start + end) / 2
            build(2 * node + 1, start, mid, A)
            build(2 * node + 2, mid + 1, end, A)
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2]
        }
    }

    private func updateHelper(_ node: Int, _ start: Int, _ end: Int, _ idx: Int, _ val: Int) {
        if start == end {
            tree[node] = val
        } else {
            let mid = (start + end) / 2
            if idx <= mid {
                updateHelper(2 * node + 1, start, mid, idx, val)
            } else {
                updateHelper(2 * node + 2, mid + 1, end, idx, val)
            }
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2]
        }
    }

    private func queryHelper(_ node: Int, _ start: Int, _ end: Int, _ l: Int, _ r: Int) -> Int {
        if r < start || end < l {
            return 0
        }
        if l <= start && end <= r {
            return tree[node]
        }
        let mid = (start + end) / 2
        let leftSum = queryHelper(2 * node + 1, start, mid, l, r)
        let rightSum = queryHelper(2 * node + 2, mid + 1, end, l, r)
        return leftSum + rightSum
    }

    func update(_ idx: Int, _ val: Int) {
        updateHelper(0, 0, n - 1, idx, val)
    }

    func query(_ l: Int, _ r: Int) -> Int {
        return queryHelper(0, 0, n - 1, l, r)
    }
}

class NumArray {
    private var segTree: SegmentTree

    init(_ nums: [Int]) {
        segTree = SegmentTree(nums.count, nums)
    }

    func update(_ index: Int, _ val: Int) {
        segTree.update(index, val)
    }

    func sumRange(_ left: Int, _ right: Int) -> Int {
        return segTree.query(left, right)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ for initializing the input array.
    - $O(\log n)$ for each $update()$ function call.
    - $O(\log n)$ for each $sumRange()$ function call.
- Space complexity: $O(n)$

---

## 3. Iterative Segment Tree

### Intuition

This iterative version of the segment tree eliminates recursion overhead. Leaves are stored at indices `n` to `2n-1`, and internal nodes at indices `1` to `n-1`. Updates walk up from the leaf using bit operations, and queries work from both ends toward the root, collecting partial sums along the way.

### Algorithm

1. Build the tree:
   - Place array elements at leaf positions `n + i`.
   - Compute internal nodes bottom-up: `tree[i] = tree[2i] + tree[2i+1]`.
2. For `update(index, val)`:
   - Update the leaf at `n + index`.
   - Walk up to the root, updating each parent node.
3. For `sumRange(left, right)`:
   - Initialize `res = 0`, shift `left` and `right` to leaf positions.
   - While `left < right`:
     - If `left` is odd, add `tree[left]` and move right.
     - If `right` is odd, move left and add `tree[right]`.
     - Move both pointers to their parents.
   - Return `res`.

::tabs-start

```python
class SegmentTree:
    def __init__(self, N, A):
        self.n = N
        while (self.n & (self.n - 1)) != 0:
            self.n += 1
        self.build(N, A)

    def build(self, N, A):
        self.tree = [0] * (2 * self.n)
        for i in range(N):
            self.tree[self.n + i] = A[i]
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = self.tree[i << 1] + self.tree[i << 1 | 1]

    def update(self, i, val):
        self.tree[self.n + i] = val
        j = (self.n + i) >> 1
        while j >= 1:
            self.tree[j] = self.tree[j << 1] + self.tree[j << 1 | 1]
            j >>= 1

    def query(self, l, r):
        res = 0
        l += self.n
        r += self.n + 1
        while l < r:
            if l & 1:
                res += self.tree[l]
                l += 1
            if r & 1:
                r -= 1
                res += self.tree[r]
            l >>= 1
            r >>= 1
        return res

class NumArray:

    def __init__(self, nums: List[int]):
        self.segTree = SegmentTree(len(nums), nums)

    def update(self, index: int, val: int) -> None:
        self.segTree.update(index, val)

    def sumRange(self, left: int, right: int) -> int:
        return self.segTree.query(left, right)
```

```java
class SegmentTree {
    int n;
    int[] tree;

    SegmentTree(int N, int[] A) {
        this.n = N;
        while (Integer.bitCount(n) != 1) {
            n++;
        }
        build(N, A);
    }

    void build(int N, int[] A) {
        tree = new int[2 * n];
        for (int i = 0; i < N; i++) {
            tree[n + i] = A[i];
        }
        for (int i = n - 1; i > 0; --i) {
            tree[i] = tree[i << 1] + tree[i << 1 | 1];
        }
    }

    void update(int i, int val) {
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = tree[j << 1] + tree[j << 1 | 1];
        }
    }

    int query(int l, int r) {
        int res = 0;
        for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
            if ((l & 1) == 1) res += tree[l++];
            if ((r & 1) == 1) res += tree[--r];
        }
        return res;
    }
}

public class NumArray {
    private int[] nums;
    private SegmentTree segTree;

    public NumArray(int[] nums) {
        this.segTree = new SegmentTree(nums.length, nums);
    }

    public void update(int index, int val) {
        this.segTree.update(index, val);
    }

    public int sumRange(int left, int right) {
        return this.segTree.query(left, right);
    }
}
```

```cpp
class SegmentTree {
public:
    int n;
    vector<int> tree;

    SegmentTree(int N, vector<int>& A) {
        this->n = N;
        while (__builtin_popcount(n) != 1) {
            n++;
        }
        build(N, A);
    }

    void build(int N, vector<int>& A) {
        tree.resize(2 * n);
        for (int i = 0; i < N; i++) {
            tree[n + i] = A[i];
        }
        for (int i = n - 1; i > 0; --i) {
            tree[i] = tree[i << 1] + tree[i << 1 | 1];
        }
    }

    void update(int i, int val) {
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = tree[j << 1] + tree[j << 1 | 1];
        }
    }

    int query(int l, int r) {
        int res = 0;
        for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
            if (l & 1) res += tree[l++];
            if (r & 1) res += tree[--r];
        }
        return res;
    }
};

class NumArray {
    SegmentTree* segTree;

public:
    NumArray(vector<int>& nums) {
        this->segTree = new SegmentTree(nums.size(), nums);
    }

    void update(int index, int val) {
        this->segTree->update(index, val);
    }

    int sumRange(int left, int right) {
        return this->segTree->query(left, right);
    }
};
```

```javascript
class SegmentTree {
    /**
     * @constructor
     * @param {number} N
     * @param {number[]} A
     */
    constructor(N, A) {
        this.n = N;
        while ((this.n & (this.n - 1)) !== 0) {
            this.n++;
        }
        this.build(N, A);
    }

    /**
     * @param {number} N
     * @param {number[]} A
     * @return {void}
     */
    build(N, A) {
        this.tree = new Int32Array(2 * this.n);
        for (let i = 0; i < N; i++) {
            this.tree[this.n + i] = A[i];
        }
        for (let i = this.n - 1; i > 0; i--) {
            this.tree[i] = this.tree[i << 1] + this.tree[(i << 1) | 1];
        }
    }

    /**
     * @param {number} i
     * @param {number} val
     * @return {void}
     */
    update(i, val) {
        this.tree[this.n + i] = val;
        for (let j = (this.n + i) >> 1; j >= 1; j >>= 1) {
            this.tree[j] = this.tree[j << 1] + this.tree[(j << 1) | 1];
        }
    }

    /**
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    query(l, r) {
        let res = 0;
        l += this.n;
        r += this.n + 1;

        while (l < r) {
            if (l & 1) res += this.tree[l++];
            if (r & 1) res += this.tree[--r];
            l >>= 1;
            r >>= 1;
        }

        return res;
    }
}

class NumArray {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.segTree = new SegmentTree(nums.length, nums);
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    update(index, val) {
        this.segTree.update(index, val);
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    sumRange(left, right) {
        return this.segTree.query(left, right);
    }
}
```

```csharp
class SegmentTree {
    private int[] tree;
    private int n;

    public SegmentTree(int N, int[] A) {
        n = N;
        while ((n & (n - 1)) != 0) {
            n++;
        }
        Build(N, A);
    }

    private void Build(int N, int[] A) {
        tree = new int[2 * n];
        for (int i = 0; i < N; i++) {
            tree[n + i] = A[i];
        }
        for (int i = n - 1; i > 0; i--) {
            tree[i] = tree[i << 1] + tree[(i << 1) | 1];
        }
    }

    public void Update(int i, int val) {
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = tree[j << 1] + tree[(j << 1) | 1];
        }
    }

    public int Query(int l, int r) {
        int res = 0;
        l += n;
        r += n + 1;
        while (l < r) {
            if ((l & 1) == 1) res += tree[l++];
            if ((r & 1) == 1) res += tree[--r];
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

public class NumArray {
    private SegmentTree segTree;

    public NumArray(int[] nums) {
        segTree = new SegmentTree(nums.Length, nums);
    }

    public void Update(int index, int val) {
        segTree.Update(index, val);
    }

    public int SumRange(int left, int right) {
        return segTree.Query(left, right);
    }
}
```

```go
type SegmentTree struct {
    tree []int
    n    int
}

func NewSegmentTree(N int, A []int) *SegmentTree {
    n := N
    for n&(n-1) != 0 {
        n++
    }
    st := &SegmentTree{n: n}
    st.build(N, A)
    return st
}

func (st *SegmentTree) build(N int, A []int) {
    st.tree = make([]int, 2*st.n)
    for i := 0; i < N; i++ {
        st.tree[st.n+i] = A[i]
    }
    for i := st.n - 1; i > 0; i-- {
        st.tree[i] = st.tree[i<<1] + st.tree[(i<<1)|1]
    }
}

func (st *SegmentTree) Update(i, val int) {
    st.tree[st.n+i] = val
    for j := (st.n + i) >> 1; j >= 1; j >>= 1 {
        st.tree[j] = st.tree[j<<1] + st.tree[(j<<1)|1]
    }
}

func (st *SegmentTree) Query(l, r int) int {
    res := 0
    l += st.n
    r += st.n + 1
    for l < r {
        if l&1 == 1 {
            res += st.tree[l]
            l++
        }
        if r&1 == 1 {
            r--
            res += st.tree[r]
        }
        l >>= 1
        r >>= 1
    }
    return res
}

type NumArray struct {
    segTree *SegmentTree
}

func Constructor(nums []int) NumArray {
    return NumArray{segTree: NewSegmentTree(len(nums), nums)}
}

func (this *NumArray) Update(index int, val int) {
    this.segTree.Update(index, val)
}

func (this *NumArray) SumRange(left int, right int) int {
    return this.segTree.Query(left, right)
}
```

```kotlin
class SegmentTree(N: Int, A: IntArray) {
    private var n: Int = N
    private lateinit var tree: IntArray

    init {
        while (n and (n - 1) != 0) {
            n++
        }
        build(N, A)
    }

    private fun build(N: Int, A: IntArray) {
        tree = IntArray(2 * n)
        for (i in 0 until N) {
            tree[n + i] = A[i]
        }
        for (i in n - 1 downTo 1) {
            tree[i] = tree[i shl 1] + tree[(i shl 1) or 1]
        }
    }

    fun update(i: Int, value: Int) {
        tree[n + i] = value
        var j = (n + i) shr 1
        while (j >= 1) {
            tree[j] = tree[j shl 1] + tree[(j shl 1) or 1]
            j = j shr 1
        }
    }

    fun query(l: Int, r: Int): Int {
        var left = l + n
        var right = r + n + 1
        var res = 0
        while (left < right) {
            if (left and 1 == 1) res += tree[left++]
            if (right and 1 == 1) res += tree[--right]
            left = left shr 1
            right = right shr 1
        }
        return res
    }
}

class NumArray(nums: IntArray) {
    private val segTree = SegmentTree(nums.size, nums)

    fun update(index: Int, `val`: Int) {
        segTree.update(index, `val`)
    }

    fun sumRange(left: Int, right: Int): Int {
        return segTree.query(left, right)
    }
}
```

```swift
class SegmentTree {
    private var tree: [Int]
    private var n: Int

    init(_ N: Int, _ A: [Int]) {
        n = N
        while n & (n - 1) != 0 {
            n += 1
        }
        tree = Array(repeating: 0, count: 2 * n)
        build(N, A)
    }

    private func build(_ N: Int, _ A: [Int]) {
        for i in 0..<N {
            tree[n + i] = A[i]
        }
        for i in stride(from: n - 1, through: 1, by: -1) {
            tree[i] = tree[i << 1] + tree[(i << 1) | 1]
        }
    }

    func update(_ i: Int, _ val: Int) {
        tree[n + i] = val
        var j = (n + i) >> 1
        while j >= 1 {
            tree[j] = tree[j << 1] + tree[(j << 1) | 1]
            j >>= 1
        }
    }

    func query(_ l: Int, _ r: Int) -> Int {
        var left = l + n
        var right = r + n + 1
        var res = 0
        while left < right {
            if left & 1 == 1 {
                res += tree[left]
                left += 1
            }
            if right & 1 == 1 {
                right -= 1
                res += tree[right]
            }
            left >>= 1
            right >>= 1
        }
        return res
    }
}

class NumArray {
    private var segTree: SegmentTree

    init(_ nums: [Int]) {
        segTree = SegmentTree(nums.count, nums)
    }

    func update(_ index: Int, _ val: Int) {
        segTree.update(index, val)
    }

    func sumRange(_ left: Int, _ right: Int) -> Int {
        return segTree.query(left, right)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ for initializing the input array.
    - $O(\log n)$ for each $update()$ function call.
    - $O(\log n)$ for each $sumRange()$ function call.
- Space complexity: $O(n)$

---

## 4. Square Root Decomposition (Update Optimized)

### Intuition

We divide the array into blocks of size approximately square root of n. Each block stores the sum of its elements. Updates modify one element and one block sum, both in constant time. Queries iterate through at most square root of n blocks, plus some individual elements at the boundaries.

### Algorithm

1. Divide the array into blocks of size `sqrt(n)`.
2. Precompute the sum of each block.
3. For `update(index, val)`:
   - Find the block containing `index`.
   - Update the block sum by adding the difference `val - nums[index]`.
   - Update `nums[index] = val`.
4. For `sumRange(left, right)`:
   - Sum individual elements until reaching a block boundary.
   - Sum complete blocks.
   - Sum remaining individual elements.
   - Return the total.

::tabs-start

```python
class SqrtDecomposition:

    def __init__(self, nums):
        self.A = nums[:]
        self.n = len(nums)
        self.block_size = int(self.n ** 0.5) + 1
        self.blocks = [0] * self.block_size

        for i in range(self.n):
            self.blocks[i // self.block_size] += self.A[i]

    def query(self, left, right):
        total_sum = 0
        while left <= right and left % self.block_size != 0:
            total_sum += self.A[left]
            left += 1

        while left + self.block_size - 1 <= right:
            total_sum += self.blocks[left // self.block_size]
            left += self.block_size

        while left <= right:
            total_sum += self.A[left]
            left += 1

        return total_sum

    def update(self, index, val):
        block_index = index // self.block_size
        self.blocks[block_index] += val - self.A[index]
        self.A[index] = val

class NumArray:

    def __init__(self, nums: List[int]):
        self.sq = SqrtDecomposition(nums)

    def update(self, index: int, val: int) -> None:
        self.sq.update(index, val)

    def sumRange(self, left: int, right: int) -> int:
        return self.sq.query(left, right)
```

```java
class SqrtDecomposition {
    private int[] nums, blocks;
    private int blockSize, n;

    public SqrtDecomposition(int[] nums) {
        this.nums = nums.clone();
        this.n = nums.length;
        this.blockSize = (int) Math.sqrt(n) + 1;
        this.blocks = new int[blockSize];

        for (int i = 0; i < n; i++) {
            blocks[i / blockSize] += nums[i];
        }
    }

    public int query(int left, int right) {
        int totalSum = 0;
        while (left <= right && left % blockSize != 0) {
            totalSum += nums[left++];
        }

        while (left + blockSize - 1 <= right) {
            totalSum += blocks[left / blockSize];
            left += blockSize;
        }

        while (left <= right) {
            totalSum += nums[left++];
        }

        return totalSum;
    }

    public void update(int index, int val) {
        int blockIndex = index / blockSize;
        blocks[blockIndex] += val - nums[index];
        nums[index] = val;
    }
}

public class NumArray {
    private SqrtDecomposition sq;

    public NumArray(int[] nums) {
        sq = new SqrtDecomposition(nums);
    }

    public void update(int index, int val) {
        sq.update(index, val);
    }

    public int sumRange(int left, int right) {
        return sq.query(left, right);
    }
}
```

```cpp
class SqrtDecomposition {
private:
    vector<int> nums, blocks;
    int blockSize, n;

public:
    SqrtDecomposition(vector<int>& nums) {
        this->nums = nums;
        this->n = nums.size();
        this->blockSize = sqrt(n) + 1;
        this->blocks.resize(blockSize, 0);

        for (int i = 0; i < n; i++) {
            blocks[i / blockSize] += nums[i];
        }
    }

    int query(int left, int right) {
        int totalSum = 0;
        while (left <= right && left % blockSize != 0) {
            totalSum += nums[left++];
        }

        while (left + blockSize - 1 <= right) {
            totalSum += blocks[left / blockSize];
            left += blockSize;
        }

        while (left <= right) {
            totalSum += nums[left++];
        }

        return totalSum;
    }

    void update(int index, int val) {
        int blockIndex = index / blockSize;
        blocks[blockIndex] += val - nums[index];
        nums[index] = val;
    }
};

class NumArray {
private:
    SqrtDecomposition* sq;

public:
    NumArray(vector<int>& nums) {
        sq = new SqrtDecomposition(nums);
    }

    void update(int index, int val) {
        sq->update(index, val);
    }

    int sumRange(int left, int right) {
        return sq->query(left, right);
    }
};
```

```javascript
class SqrtDecomposition {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.nums = [...nums];
        this.n = nums.length;
        this.blockSize = Math.floor(Math.sqrt(this.n)) + 1;
        this.blocks = new Array(this.blockSize).fill(0);

        for (let i = 0; i < this.n; i++) {
            this.blocks[Math.floor(i / this.blockSize)] += nums[i];
        }
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    query(left, right) {
        let totalSum = 0;
        while (left <= right && left % this.blockSize !== 0) {
            totalSum += this.nums[left++];
        }

        while (left + this.blockSize - 1 <= right) {
            totalSum += this.blocks[Math.floor(left / this.blockSize)];
            left += this.blockSize;
        }

        while (left <= right) {
            totalSum += this.nums[left++];
        }

        return totalSum;
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    update(index, val) {
        let blockIndex = Math.floor(index / this.blockSize);
        this.blocks[blockIndex] += val - this.nums[index];
        this.nums[index] = val;
    }
}

class NumArray {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.sq = new SqrtDecomposition(nums);
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    update(index, val) {
        this.sq.update(index, val);
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    sumRange(left, right) {
        return this.sq.query(left, right);
    }
}
```

```csharp
class SqrtDecomposition {
    private int[] nums, blocks;
    private int blockSize, n;

    public SqrtDecomposition(int[] nums) {
        this.nums = (int[])nums.Clone();
        n = nums.Length;
        blockSize = (int)Math.Sqrt(n) + 1;
        blocks = new int[blockSize];

        for (int i = 0; i < n; i++) {
            blocks[i / blockSize] += nums[i];
        }
    }

    public int Query(int left, int right) {
        int totalSum = 0;
        while (left <= right && left % blockSize != 0) {
            totalSum += nums[left++];
        }
        while (left + blockSize - 1 <= right) {
            totalSum += blocks[left / blockSize];
            left += blockSize;
        }
        while (left <= right) {
            totalSum += nums[left++];
        }
        return totalSum;
    }

    public void Update(int index, int val) {
        int blockIndex = index / blockSize;
        blocks[blockIndex] += val - nums[index];
        nums[index] = val;
    }
}

public class NumArray {
    private SqrtDecomposition sq;

    public NumArray(int[] nums) {
        sq = new SqrtDecomposition(nums);
    }

    public void Update(int index, int val) {
        sq.Update(index, val);
    }

    public int SumRange(int left, int right) {
        return sq.Query(left, right);
    }
}
```

```go
type SqrtDecomposition struct {
    nums      []int
    blocks    []int
    blockSize int
    n         int
}

func NewSqrtDecomposition(nums []int) *SqrtDecomposition {
    n := len(nums)
    blockSize := int(math.Sqrt(float64(n))) + 1
    blocks := make([]int, blockSize)
    numsCopy := make([]int, n)
    copy(numsCopy, nums)

    for i := 0; i < n; i++ {
        blocks[i/blockSize] += nums[i]
    }

    return &SqrtDecomposition{
        nums:      numsCopy,
        blocks:    blocks,
        blockSize: blockSize,
        n:         n,
    }
}

func (sq *SqrtDecomposition) Query(left, right int) int {
    totalSum := 0
    for left <= right && left%sq.blockSize != 0 {
        totalSum += sq.nums[left]
        left++
    }
    for left+sq.blockSize-1 <= right {
        totalSum += sq.blocks[left/sq.blockSize]
        left += sq.blockSize
    }
    for left <= right {
        totalSum += sq.nums[left]
        left++
    }
    return totalSum
}

func (sq *SqrtDecomposition) Update(index, val int) {
    blockIndex := index / sq.blockSize
    sq.blocks[blockIndex] += val - sq.nums[index]
    sq.nums[index] = val
}

type NumArray struct {
    sq *SqrtDecomposition
}

func Constructor(nums []int) NumArray {
    return NumArray{sq: NewSqrtDecomposition(nums)}
}

func (this *NumArray) Update(index int, val int) {
    this.sq.Update(index, val)
}

func (this *NumArray) SumRange(left int, right int) int {
    return this.sq.Query(left, right)
}
```

```kotlin
class SqrtDecomposition(nums: IntArray) {
    private val nums: IntArray = nums.copyOf()
    private val n: Int = nums.size
    private val blockSize: Int = kotlin.math.sqrt(n.toDouble()).toInt() + 1
    private val blocks: IntArray = IntArray(blockSize)

    init {
        for (i in 0 until n) {
            blocks[i / blockSize] += nums[i]
        }
    }

    fun query(left: Int, right: Int): Int {
        var l = left
        var totalSum = 0
        while (l <= right && l % blockSize != 0) {
            totalSum += nums[l++]
        }
        while (l + blockSize - 1 <= right) {
            totalSum += blocks[l / blockSize]
            l += blockSize
        }
        while (l <= right) {
            totalSum += nums[l++]
        }
        return totalSum
    }

    fun update(index: Int, value: Int) {
        val blockIndex = index / blockSize
        blocks[blockIndex] += value - nums[index]
        nums[index] = value
    }
}

class NumArray(nums: IntArray) {
    private val sq = SqrtDecomposition(nums)

    fun update(index: Int, `val`: Int) {
        sq.update(index, `val`)
    }

    fun sumRange(left: Int, right: Int): Int {
        return sq.query(left, right)
    }
}
```

```swift
class SqrtDecomposition {
    private var nums: [Int]
    private var blocks: [Int]
    private var blockSize: Int
    private var n: Int

    init(_ nums: [Int]) {
        self.nums = nums
        n = nums.count
        blockSize = Int(Double(n).squareRoot()) + 1
        blocks = Array(repeating: 0, count: blockSize)

        for i in 0..<n {
            blocks[i / blockSize] += nums[i]
        }
    }

    func query(_ left: Int, _ right: Int) -> Int {
        var l = left
        var totalSum = 0
        while l <= right && l % blockSize != 0 {
            totalSum += nums[l]
            l += 1
        }
        while l + blockSize - 1 <= right {
            totalSum += blocks[l / blockSize]
            l += blockSize
        }
        while l <= right {
            totalSum += nums[l]
            l += 1
        }
        return totalSum
    }

    func update(_ index: Int, _ val: Int) {
        let blockIndex = index / blockSize
        blocks[blockIndex] += val - nums[index]
        nums[index] = val
    }
}

class NumArray {
    private var sq: SqrtDecomposition

    init(_ nums: [Int]) {
        sq = SqrtDecomposition(nums)
    }

    func update(_ index: Int, _ val: Int) {
        sq.update(index, val)
    }

    func sumRange(_ left: Int, _ right: Int) -> Int {
        return sq.query(left, right)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ for initializing the input array.
    - $O(1)$ for each $update()$ function call.
    - $O(\sqrt {n})$ for each $sumRange()$ function call.
- Space complexity: $O(n)$

---

## 5. Square Root Decomposition (Query Optimized)

### Intuition

This variant maintains prefix sums within each block instead of block sums. Queries become faster because we can compute range sums using prefix sums directly. However, updates are slower since we must update all prefix sums within the affected block.

### Algorithm

1. Divide the array into blocks of size `sqrt(n)`.
2. Build prefix sums within each block.
3. For `update(index, val)`:
   - Compute the difference `val - nums[index]`.
   - Update `nums[index] = val`.
   - Update all prefix sums from `index` to the end of its block.
4. For `sumRange(left, right)`:
   - If `left` is not at a block start, subtract the prefix sum before `left`.
   - Add complete block prefix sums.
   - Add the prefix sum at `right`.
   - Return the total.

::tabs-start

```python
class SqrtDecomposition:

    def __init__(self, nums):
        self.A = nums[:]
        self.prefix_sums = nums[:]
        self.n = len(nums)
        self.block_size = int(self.n ** 0.5) + 1

        for i in range(1, self.n):
            if i % self.block_size != 0:
                self.prefix_sums[i] += self.prefix_sums[i - 1]

    def query(self, left, right):
        total_sum = -(self.prefix_sums[left - 1] if left % self.block_size != 0 else 0)

        while left // self.block_size < right // self.block_size:
            block_end = min(self.n - 1, (left // self.block_size) * self.block_size + self.block_size - 1)
            total_sum += self.prefix_sums[block_end]
            left = block_end + 1

        total_sum += self.prefix_sums[right]
        return total_sum

        total_sum += self.prefix_sums[right]
        return total_sum

    def update(self, index, val):
        diff = val - self.A[index]
        self.A[index] = val

        block_end = min(self.n - 1, (index // self.block_size) * self.block_size + self.block_size - 1)
        for i in range(index, block_end + 1):
            self.prefix_sums[i] += diff

class NumArray:

    def __init__(self, nums: List[int]):
        self.sq = SqrtDecomposition(nums)

    def update(self, index: int, val: int) -> None:
        self.sq.update(index, val)

    def sumRange(self, left: int, right: int) -> int:
        return self.sq.query(left, right)
```

```java
class SqrtDecomposition {
    private int[] nums, prefixSums;
    private int blockSize, n;

    public SqrtDecomposition(int[] nums) {
        this.nums = nums.clone();
        this.n = nums.length;
        this.blockSize = (int) Math.sqrt(n) + 1;
        this.prefixSums = nums.clone();

        for (int i = 1; i < n; i++) {
            if (i % blockSize != 0) {
                prefixSums[i] += prefixSums[i - 1];
            }
        }
    }

    public int query(int left, int right) {
        int totalSum = (left % blockSize != 0) ? -prefixSums[left - 1] : 0;

        while (left / blockSize < right / blockSize) {
            int blockEnd = Math.min(n - 1, (left / blockSize) * blockSize + blockSize - 1);
            totalSum += prefixSums[blockEnd];
            left = blockEnd + 1;
        }

        totalSum += prefixSums[right];
        return totalSum;
    }

    public void update(int index, int val) {
        int diff = val - nums[index];
        nums[index] = val;

        int blockEnd = Math.min(n - 1, (index / blockSize) * blockSize + blockSize - 1);
        for (int i = index; i <= blockEnd; i++) {
            prefixSums[i] += diff;
        }
    }
}

public class NumArray {
    private SqrtDecomposition sq;

    public NumArray(int[] nums) {
        sq = new SqrtDecomposition(nums);
    }

    public void update(int index, int val) {
        sq.update(index, val);
    }

    public int sumRange(int left, int right) {
        return sq.query(left, right);
    }
}
```

```cpp
class SqrtDecomposition {
private:
    vector<int> nums, prefixSums;
    int blockSize, n;

public:
    SqrtDecomposition(vector<int>& nums) {
        this->nums = nums;
        this->n = nums.size();
        this->blockSize = sqrt(n) + 1;
        this->prefixSums = nums;

        for (int i = 1; i < n; i++) {
            if (i % blockSize != 0) {
                prefixSums[i] += prefixSums[i - 1];
            }
        }
    }

    int query(int left, int right) {
        int totalSum = (left % blockSize != 0) ? -prefixSums[left - 1] : 0;

        while (left / blockSize < right / blockSize) {
            int blockEnd = min(n - 1, (left / blockSize) * blockSize + blockSize - 1);
            totalSum += prefixSums[blockEnd];
            left = blockEnd + 1;
        }

        totalSum += prefixSums[right];
        return totalSum;
    }

    void update(int index, int val) {
        int diff = val - nums[index];
        nums[index] = val;

        int blockEnd = min(n - 1, (index / blockSize) * blockSize + blockSize - 1);
        for (int i = index; i <= blockEnd; i++) {
            prefixSums[i] += diff;
        }
    }
};

class NumArray {
private:
    SqrtDecomposition* sq;

public:
    NumArray(vector<int>& nums) {
        sq = new SqrtDecomposition(nums);
    }

    void update(int index, int val) {
        sq->update(index, val);
    }

    int sumRange(int left, int right) {
        return sq->query(left, right);
    }
};
```

```javascript
class SqrtDecomposition {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.nums = [...nums];
        this.n = nums.length;
        this.blockSize = Math.floor(Math.sqrt(this.n)) + 1;
        this.prefixSums = [...nums];

        for (let i = 1; i < this.n; i++) {
            if (i % this.blockSize !== 0) {
                this.prefixSums[i] += this.prefixSums[i - 1];
            }
        }
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    query(left, right) {
        let totalSum =
            left % this.blockSize !== 0 ? -this.prefixSums[left - 1] : 0;

        while (
            Math.floor(left / this.blockSize) <
            Math.floor(right / this.blockSize)
        ) {
            const blockEnd = Math.min(
                this.n - 1,
                Math.floor(left / this.blockSize) * this.blockSize +
                    this.blockSize -
                    1,
            );
            totalSum += this.prefixSums[blockEnd];
            left = blockEnd + 1;
        }

        totalSum += this.prefixSums[right];
        return totalSum;
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    update(index, val) {
        const diff = val - this.nums[index];
        this.nums[index] = val;

        const blockEnd = Math.min(
            this.n - 1,
            Math.floor(index / this.blockSize) * this.blockSize +
                this.blockSize -
                1,
        );
        for (let i = index; i <= blockEnd; i++) {
            this.prefixSums[i] += diff;
        }
    }
}

class NumArray {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.sq = new SqrtDecomposition(nums);
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    update(index, val) {
        this.sq.update(index, val);
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    sumRange(left, right) {
        return this.sq.query(left, right);
    }
}
```

```csharp
class SqrtDecomposition {
    private int[] nums, prefixSums;
    private int blockSize, n;

    public SqrtDecomposition(int[] nums) {
        this.nums = (int[])nums.Clone();
        n = nums.Length;
        blockSize = (int)Math.Sqrt(n) + 1;
        prefixSums = (int[])nums.Clone();

        for (int i = 1; i < n; i++) {
            if (i % blockSize != 0) {
                prefixSums[i] += prefixSums[i - 1];
            }
        }
    }

    public int Query(int left, int right) {
        int totalSum = (left % blockSize != 0) ? -prefixSums[left - 1] : 0;

        while (left / blockSize < right / blockSize) {
            int blockEnd = Math.Min(n - 1, (left / blockSize) * blockSize + blockSize - 1);
            totalSum += prefixSums[blockEnd];
            left = blockEnd + 1;
        }

        totalSum += prefixSums[right];
        return totalSum;
    }

    public void Update(int index, int val) {
        int diff = val - nums[index];
        nums[index] = val;

        int blockEnd = Math.Min(n - 1, (index / blockSize) * blockSize + blockSize - 1);
        for (int i = index; i <= blockEnd; i++) {
            prefixSums[i] += diff;
        }
    }
}

public class NumArray {
    private SqrtDecomposition sq;

    public NumArray(int[] nums) {
        sq = new SqrtDecomposition(nums);
    }

    public void Update(int index, int val) {
        sq.Update(index, val);
    }

    public int SumRange(int left, int right) {
        return sq.Query(left, right);
    }
}
```

```go
type SqrtDecomposition struct {
    nums       []int
    prefixSums []int
    blockSize  int
    n          int
}

func NewSqrtDecomposition(nums []int) *SqrtDecomposition {
    n := len(nums)
    blockSize := int(math.Sqrt(float64(n))) + 1
    numsCopy := make([]int, n)
    prefixSums := make([]int, n)
    copy(numsCopy, nums)
    copy(prefixSums, nums)

    for i := 1; i < n; i++ {
        if i%blockSize != 0 {
            prefixSums[i] += prefixSums[i-1]
        }
    }

    return &SqrtDecomposition{
        nums:       numsCopy,
        prefixSums: prefixSums,
        blockSize:  blockSize,
        n:          n,
    }
}

func (sq *SqrtDecomposition) Query(left, right int) int {
    totalSum := 0
    if left%sq.blockSize != 0 {
        totalSum = -sq.prefixSums[left-1]
    }

    for left/sq.blockSize < right/sq.blockSize {
        blockEnd := min(sq.n-1, (left/sq.blockSize)*sq.blockSize+sq.blockSize-1)
        totalSum += sq.prefixSums[blockEnd]
        left = blockEnd + 1
    }

    totalSum += sq.prefixSums[right]
    return totalSum
}

func (sq *SqrtDecomposition) Update(index, val int) {
    diff := val - sq.nums[index]
    sq.nums[index] = val

    blockEnd := min(sq.n-1, (index/sq.blockSize)*sq.blockSize+sq.blockSize-1)
    for i := index; i <= blockEnd; i++ {
        sq.prefixSums[i] += diff
    }
}

type NumArray struct {
    sq *SqrtDecomposition
}

func Constructor(nums []int) NumArray {
    return NumArray{sq: NewSqrtDecomposition(nums)}
}

func (this *NumArray) Update(index int, val int) {
    this.sq.Update(index, val)
}

func (this *NumArray) SumRange(left int, right int) int {
    return this.sq.Query(left, right)
}
```

```kotlin
class SqrtDecomposition(nums: IntArray) {
    private val nums: IntArray = nums.copyOf()
    private val prefixSums: IntArray = nums.copyOf()
    private val n: Int = nums.size
    private val blockSize: Int = kotlin.math.sqrt(n.toDouble()).toInt() + 1

    init {
        for (i in 1 until n) {
            if (i % blockSize != 0) {
                prefixSums[i] += prefixSums[i - 1]
            }
        }
    }

    fun query(left: Int, right: Int): Int {
        var l = left
        var totalSum = if (l % blockSize != 0) -prefixSums[l - 1] else 0

        while (l / blockSize < right / blockSize) {
            val blockEnd = minOf(n - 1, (l / blockSize) * blockSize + blockSize - 1)
            totalSum += prefixSums[blockEnd]
            l = blockEnd + 1
        }

        totalSum += prefixSums[right]
        return totalSum
    }

    fun update(index: Int, value: Int) {
        val diff = value - nums[index]
        nums[index] = value

        val blockEnd = minOf(n - 1, (index / blockSize) * blockSize + blockSize - 1)
        for (i in index..blockEnd) {
            prefixSums[i] += diff
        }
    }
}

class NumArray(nums: IntArray) {
    private val sq = SqrtDecomposition(nums)

    fun update(index: Int, `val`: Int) {
        sq.update(index, `val`)
    }

    fun sumRange(left: Int, right: Int): Int {
        return sq.query(left, right)
    }
}
```

```swift
class SqrtDecomposition {
    private var nums: [Int]
    private var prefixSums: [Int]
    private var blockSize: Int
    private var n: Int

    init(_ nums: [Int]) {
        self.nums = nums
        self.prefixSums = nums
        n = nums.count
        blockSize = Int(Double(n).squareRoot()) + 1

        for i in 1..<n {
            if i % blockSize != 0 {
                prefixSums[i] += prefixSums[i - 1]
            }
        }
    }

    func query(_ left: Int, _ right: Int) -> Int {
        var l = left
        var totalSum = (l % blockSize != 0) ? -prefixSums[l - 1] : 0

        while l / blockSize < right / blockSize {
            let blockEnd = min(n - 1, (l / blockSize) * blockSize + blockSize - 1)
            totalSum += prefixSums[blockEnd]
            l = blockEnd + 1
        }

        totalSum += prefixSums[right]
        return totalSum
    }

    func update(_ index: Int, _ val: Int) {
        let diff = val - nums[index]
        nums[index] = val

        let blockEnd = min(n - 1, (index / blockSize) * blockSize + blockSize - 1)
        for i in index...blockEnd {
            prefixSums[i] += diff
        }
    }
}

class NumArray {
    private var sq: SqrtDecomposition

    init(_ nums: [Int]) {
        sq = SqrtDecomposition(nums)
    }

    func update(_ index: Int, _ val: Int) {
        sq.update(index, val)
    }

    func sumRange(_ left: Int, _ right: Int) -> Int {
        return sq.query(left, right)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ for initializing the input array.
    - $O(\sqrt {n})$ for each $update()$ function call.
    - $O(\sqrt {n})$ for each $sumRange()$ function call.
- Space complexity: $O(n)$

---

## 6. Binary Indexed Tree (Fenwick Tree)

### Intuition

A Binary Indexed Tree (or Fenwick Tree) uses a clever encoding where each index stores a partial sum based on the binary representation of its index. The key insight is that `index & -index` gives the lowest set bit, which determines how many elements are summed at each position. This allows both updates and prefix sum queries in logarithmic time with minimal overhead.

### Algorithm

1. Initialize the BIT with size `n + 1` (1-indexed).
2. Build by calling `update` for each element.
3. For `update(index, val)`:
   - Compute `diff = val - nums[index]`.
   - Update `nums[index] = val`.
   - Walk up the tree, adding `diff` to each relevant position using `index += index & -index`.
4. For `prefixSum(index)`:
   - Accumulate sums while walking down using `index -= index & -index`.
5. For `sumRange(left, right)`:
   - Return `prefixSum(right + 1) - prefixSum(left)`.

::tabs-start

```python
class BIT:
    def __init__(self, nums):
        self.n = len(nums) + 1
        self.nums = [0] * self.n
        self.tree = [0] * self.n
        for i in range(self.n - 1):
            self.update(i, nums[i])

    def update(self, index, val):
        index += 1
        diff = val - self.nums[index]
        self.nums[index] = val
        while index < self.n:
            self.tree[index] += diff
            index += index & -index

    def prefix_sum(self, index):
        total_sum = 0
        while index > 0:
            total_sum += self.tree[index]
            index -= index & -index
        return total_sum

    def query(self, left, right):
        return self.prefix_sum(right + 1) - self.prefix_sum(left)


class NumArray:
    def __init__(self, nums: List[int]):
        self.bit = BIT(nums)

    def update(self, index: int, val: int) -> None:
        self.bit.update(index, val)

    def sumRange(self, left: int, right: int) -> int:
        return self.bit.query(left, right)
```

```java
class BIT {
    private int[] nums;
    private int[] tree;
    private int n;

    public BIT(int[] nums) {
        this.n = nums.length + 1;
        this.nums = new int[n];
        this.tree = new int[n];
        for (int i = 0; i < n - 1; i++) {
            update(i, nums[i]);
        }
    }

    public void update(int index, int val) {
        index++;
        int diff = val - nums[index];
        nums[index] = val;
        while (index < n) {
            tree[index] += diff;
            index += index & -index;
        }
    }

    public int prefixSum(int index) {
        int totalSum = 0;
        while (index > 0) {
            totalSum += tree[index];
            index -= index & -index;
        }
        return totalSum;
    }

    public int query(int left, int right) {
        return prefixSum(right + 1) - prefixSum(left);
    }
}

public class NumArray {
    private BIT bit;

    public NumArray(int[] nums) {
        this.bit = new BIT(nums);
    }

    public void update(int index, int val) {
        bit.update(index, val);
    }

    public int sumRange(int left, int right) {
        return bit.query(left, right);
    }
}
```

```cpp
class BIT {
    vector<int> nums;
    vector<int> tree;
    int n;

public:
    BIT(vector<int>& nums) {
        n = nums.size() + 1;
        this->nums.resize(n);
        tree.resize(n, 0);
        for (int i = 0; i < nums.size(); i++) {
            update(i, nums[i]);
        }
    }

    void update(int index, int val) {
        index++;
        int diff = val - nums[index];
        nums[index] = val;
        while (index < n) {
            tree[index] += diff;
            index += index & -index;
        }
    }

    int prefixSum(int index) {
        int totalSum = 0;
        while (index > 0) {
            totalSum += tree[index];
            index -= index & -index;
        }
        return totalSum;
    }

    int query(int left, int right) {
        return prefixSum(right + 1) - prefixSum(left);
    }
};

class NumArray {
    BIT bit;

public:
    NumArray(vector<int>& nums) : bit(nums) {}

    void update(int index, int val) {
        bit.update(index, val);
    }

    int sumRange(int left, int right) {
        return bit.query(left, right);
    }
};
```

```javascript
class BIT {
    /**
     * @constructor
     * @param {number[]} nums
     */
    constructor(nums) {
        this.n = nums.length + 1;
        this.tree = new Int32Array(this.n);
        this.nums = new Int32Array(this.n);
        for (let i = 0; i < this.n - 1; i++) {
            this.update(i, nums[i]);
        }
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    update(index, val) {
        index++;
        const diff = val - this.nums[index];
        this.nums[index] = val;
        while (index < this.n) {
            this.tree[index] += diff;
            index += index & -index;
        }
    }

    /**
     * @param {number} index
     * @return {number}
     */
    prefixSum(index) {
        let totalSum = 0;
        while (index > 0) {
            totalSum += this.tree[index];
            index -= index & -index;
        }
        return totalSum;
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    query(left, right) {
        return this.prefixSum(right + 1) - this.prefixSum(left);
    }
}

class NumArray {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.bit = new BIT(nums);
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    update(index, val) {
        this.bit.update(index, val);
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    sumRange(left, right) {
        return this.bit.query(left, right);
    }
}
```

```csharp
class BIT {
    private int[] nums;
    private int[] tree;
    private int n;

    public BIT(int[] nums) {
        n = nums.Length + 1;
        this.nums = new int[n];
        tree = new int[n];
        for (int i = 0; i < n - 1; i++) {
            Update(i, nums[i]);
        }
    }

    public void Update(int index, int val) {
        index++;
        int diff = val - nums[index];
        nums[index] = val;
        while (index < n) {
            tree[index] += diff;
            index += index & -index;
        }
    }

    public int PrefixSum(int index) {
        int totalSum = 0;
        while (index > 0) {
            totalSum += tree[index];
            index -= index & -index;
        }
        return totalSum;
    }

    public int Query(int left, int right) {
        return PrefixSum(right + 1) - PrefixSum(left);
    }
}

public class NumArray {
    private BIT bit;

    public NumArray(int[] nums) {
        bit = new BIT(nums);
    }

    public void Update(int index, int val) {
        bit.Update(index, val);
    }

    public int SumRange(int left, int right) {
        return bit.Query(left, right);
    }
}
```

```go
type BIT struct {
    nums []int
    tree []int
    n    int
}

func NewBIT(nums []int) *BIT {
    n := len(nums) + 1
    bit := &BIT{
        nums: make([]int, n),
        tree: make([]int, n),
        n:    n,
    }
    for i := 0; i < n-1; i++ {
        bit.Update(i, nums[i])
    }
    return bit
}

func (bit *BIT) Update(index, val int) {
    index++
    diff := val - bit.nums[index]
    bit.nums[index] = val
    for index < bit.n {
        bit.tree[index] += diff
        index += index & -index
    }
}

func (bit *BIT) PrefixSum(index int) int {
    totalSum := 0
    for index > 0 {
        totalSum += bit.tree[index]
        index -= index & -index
    }
    return totalSum
}

func (bit *BIT) Query(left, right int) int {
    return bit.PrefixSum(right+1) - bit.PrefixSum(left)
}

type NumArray struct {
    bit *BIT
}

func Constructor(nums []int) NumArray {
    return NumArray{bit: NewBIT(nums)}
}

func (this *NumArray) Update(index int, val int) {
    this.bit.Update(index, val)
}

func (this *NumArray) SumRange(left int, right int) int {
    return this.bit.Query(left, right)
}
```

```kotlin
class BIT(nums: IntArray) {
    private val n: Int = nums.size + 1
    private val tree: IntArray = IntArray(n)
    private val numsArr: IntArray = IntArray(n)

    init {
        for (i in 0 until n - 1) {
            update(i, nums[i])
        }
    }

    fun update(index: Int, value: Int) {
        var idx = index + 1
        val diff = value - numsArr[idx]
        numsArr[idx] = value
        while (idx < n) {
            tree[idx] += diff
            idx += idx and -idx
        }
    }

    fun prefixSum(index: Int): Int {
        var idx = index
        var totalSum = 0
        while (idx > 0) {
            totalSum += tree[idx]
            idx -= idx and -idx
        }
        return totalSum
    }

    fun query(left: Int, right: Int): Int {
        return prefixSum(right + 1) - prefixSum(left)
    }
}

class NumArray(nums: IntArray) {
    private val bit = BIT(nums)

    fun update(index: Int, `val`: Int) {
        bit.update(index, `val`)
    }

    fun sumRange(left: Int, right: Int): Int {
        return bit.query(left, right)
    }
}
```

```swift
class BIT {
    private var nums: [Int]
    private var tree: [Int]
    private var n: Int

    init(_ nums: [Int]) {
        n = nums.count + 1
        self.nums = Array(repeating: 0, count: n)
        tree = Array(repeating: 0, count: n)
        for i in 0..<(n - 1) {
            update(i, nums[i])
        }
    }

    func update(_ index: Int, _ val: Int) {
        var idx = index + 1
        let diff = val - nums[idx]
        nums[idx] = val
        while idx < n {
            tree[idx] += diff
            idx += idx & -idx
        }
    }

    func prefixSum(_ index: Int) -> Int {
        var idx = index
        var totalSum = 0
        while idx > 0 {
            totalSum += tree[idx]
            idx -= idx & -idx
        }
        return totalSum
    }

    func query(_ left: Int, _ right: Int) -> Int {
        return prefixSum(right + 1) - prefixSum(left)
    }
}

class NumArray {
    private var bit: BIT

    init(_ nums: [Int]) {
        bit = BIT(nums)
    }

    func update(_ index: Int, _ val: Int) {
        bit.update(index, val)
    }

    func sumRange(_ left: Int, _ right: Int) -> Int {
        return bit.query(left, right)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ for initializing the input array.
    - $O(\log n)$ for each $update()$ function call.
    - $O(\log n)$ for each $sumRange()$ function call.
- Space complexity: $O(n)$

---

## Common Pitfalls

### Confusing Update Value with Delta

When updating a position, some implementations expect the new value while others expect the change (delta) from the old value. In a Fenwick tree, you typically need to compute `diff = newValue - oldValue` and propagate this difference. Passing the new value directly without computing the delta corrupts the tree, causing all subsequent queries to return incorrect results.

### Wrong Index Manipulation in Fenwick Tree

Fenwick trees use 1-based indexing internally because the operation `index & -index` gives 0 for index 0, causing an infinite loop. Forgetting to convert between 0-based problem indices and 1-based tree indices leads to skipped elements or out-of-bounds access. Always add 1 when accessing the tree and remember the tree array needs size `n + 1`.

### Incorrect Segment Tree Range Boundaries

In segment tree queries, the condition for checking if the current segment is completely outside the query range must be `start > right || end < left`, not using `>=` or `<=`. Similarly, checking if the segment is completely inside should be `start >= left && end <= right`. Mixing up these conditions causes partial overlaps to be incorrectly handled, returning wrong sums or missing contributions.
