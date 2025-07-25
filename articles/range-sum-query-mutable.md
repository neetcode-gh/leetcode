## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ for initializing the input array.
    - $O(1)$ for each $update()$ function call.
    - $O(n)$ for each $sumRange()$ function call.
- Space complexity: $O(n)$

---

## 2. Recursive Segment Tree

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ for initializing the input array.
    - $O(\log n)$ for each $update()$ function call.
    - $O(\log n)$ for each $sumRange()$ function call.
- Space complexity: $O(n)$

---

## 3. Iterative Segement Tree

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ for initializing the input array.
    - $O(\log n)$ for each $update()$ function call.
    - $O(\log n)$ for each $sumRange()$ function call.
- Space complexity: $O(n)$

---

## 4. Square Root Decomposition (Update Optimized)

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ for initializing the input array.
    - $O(1)$ for each $update()$ function call.
    - $O(\sqrt {n})$ for each $sumRange()$ function call.
- Space complexity: $O(n)$

---

## 5. Square Root Decomposition (Query Optimized)

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ for initializing the input array.
    - $O(\sqrt {n})$ for each $update()$ function call.
    - $O(\sqrt {n})$ for each $sumRange()$ function call.
- Space complexity: $O(n)$

---

## 6. Binary Indexed Tree (Fenwick Tree)

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ for initializing the input array.
    - $O(\log n)$ for each $update()$ function call.
    - $O(\log n)$ for each $sumRange()$ function call.
- Space complexity: $O(n)$
