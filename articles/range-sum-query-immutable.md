## 1. Brute Force

### Intuition

The simplest approach is to iterate through the array from `left` to `right` and add up all the elements. This works correctly but is inefficient when we need to answer many queries, since each query requires scanning through the entire range.

### Algorithm

1. Store the original array.
2. For each `sumRange(left, right)` query:
   - Initialize `res = 0`.
   - Loop through indices from `left` to `right`.
   - Add each element to `res`.
3. Return `res`.

::tabs-start

```python
class NumArray:
    def __init__(self, nums):
        self.nums = nums

    def sumRange(self, left, right):
        res = 0
        for i in range(left, right + 1):
            res += self.nums[i]
        return res
```

```java
public class NumArray {
    private final int[] nums;

    public NumArray(int[] nums) {
        this.nums = nums;
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
    const vector<int>& nums;

public:
    NumArray(const vector<int>& nums) : nums(nums) {}

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

- Time complexity: $O(n)$ for each $sumRange()$ query.
- Space complexity: $O(1)$ since we only make a reference to the input array.

---

## 2. Prefix Sum - I

### Intuition

We can precompute a prefix sum array where `prefix[i]` stores the sum of all elements from index `0` to `i`. To find the sum of any range `[left, right]`, we take `prefix[right]` and subtract `prefix[left - 1]` (if `left > 0`). This gives us constant-time queries after a linear-time preprocessing step.

### Algorithm

1. Build a prefix sum array during construction:
   - Maintain a running sum `cur`.
   - For each element, add it to `cur` and store in `prefix`.
2. For each `sumRange(left, right)` query:
   - Get `rightSum = prefix[right]`.
   - If `left > 0`, set `leftSum = prefix[left - 1]`, otherwise `leftSum = 0`.
   - Return `rightSum - leftSum`.

::tabs-start

```python
class NumArray:
    def __init__(self, nums):
        self.prefix = []
        cur = 0
        for num in nums:
            cur += num
            self.prefix.append(cur)

    def sumRange(self, left, right):
        rightSum = self.prefix[right]
        leftSum = self.prefix[left - 1] if left > 0 else 0
        return rightSum - leftSum
```

```java
public class NumArray {
    private int[] prefix;

    public NumArray(int[] nums) {
        prefix = new int[nums.length];
        int cur = 0;
        for (int i = 0; i < nums.length; i++) {
            cur += nums[i];
            prefix[i] = cur;
        }
    }

    public int sumRange(int left, int right) {
        int rightSum = prefix[right];
        int leftSum = left > 0 ? prefix[left - 1] : 0;
        return rightSum - leftSum;
    }
}
```

```cpp
class NumArray {
private:
    vector<int> prefix;

public:
    NumArray(const vector<int>& nums) {
        int cur = 0;
        for (int num : nums) {
            cur += num;
            prefix.push_back(cur);
        }
    }

    int sumRange(int left, int right) {
        int rightSum = prefix[right];
        int leftSum = left > 0 ? prefix[left - 1] : 0;
        return rightSum - leftSum;
    }
};
```

```javascript
class NumArray {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.prefix = [];
        let cur = 0;
        for (let num of nums) {
            cur += num;
            this.prefix.push(cur);
        }
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    sumRange(left, right) {
        const rightSum = this.prefix[right];
        const leftSum = left > 0 ? this.prefix[left - 1] : 0;
        return rightSum - leftSum;
    }
}
```

```csharp
public class NumArray {
    private int[] prefix;

    public NumArray(int[] nums) {
        prefix = new int[nums.Length];
        int cur = 0;
        for (int i = 0; i < nums.Length; i++) {
            cur += nums[i];
            prefix[i] = cur;
        }
    }

    public int SumRange(int left, int right) {
        int rightSum = prefix[right];
        int leftSum = left > 0 ? prefix[left - 1] : 0;
        return rightSum - leftSum;
    }
}
```

```go
type NumArray struct {
    prefix []int
}

func Constructor(nums []int) NumArray {
    prefix := make([]int, len(nums))
    cur := 0
    for i, num := range nums {
        cur += num
        prefix[i] = cur
    }
    return NumArray{prefix: prefix}
}

func (this *NumArray) SumRange(left int, right int) int {
    rightSum := this.prefix[right]
    leftSum := 0
    if left > 0 {
        leftSum = this.prefix[left-1]
    }
    return rightSum - leftSum
}
```

```kotlin
class NumArray(nums: IntArray) {
    private val prefix: IntArray

    init {
        prefix = IntArray(nums.size)
        var cur = 0
        for (i in nums.indices) {
            cur += nums[i]
            prefix[i] = cur
        }
    }

    fun sumRange(left: Int, right: Int): Int {
        val rightSum = prefix[right]
        val leftSum = if (left > 0) prefix[left - 1] else 0
        return rightSum - leftSum
    }
}
```

```swift
class NumArray {
    private var prefix: [Int]

    init(_ nums: [Int]) {
        prefix = [Int]()
        var cur = 0
        for num in nums {
            cur += num
            prefix.append(cur)
        }
    }

    func sumRange(_ left: Int, _ right: Int) -> Int {
        let rightSum = prefix[right]
        let leftSum = left > 0 ? prefix[left - 1] : 0
        return rightSum - leftSum
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ for each $sumRange()$ query, $O(n)$ for building the prefix sum array.
- Space complexity: $O(n)$

---

## 3. Prefix Sum - II

### Intuition

This is a cleaner variation of the prefix sum approach. By creating an array of size `n + 1` where `prefix[0] = 0`, we avoid the edge case when `left = 0`. The value `prefix[i + 1]` represents the sum of the first `i + 1` elements. The range sum becomes simply `prefix[right + 1] - prefix[left]`.

### Algorithm

1. Create a `prefix` array of size `n + 1` initialized to `0`.
2. Build the prefix sums:
   - For each index `i`, set `prefix[i + 1] = prefix[i] + nums[i]`.
3. For each `sumRange(left, right)` query:
   - Return `prefix[right + 1] - prefix[left]`.

::tabs-start

```python
class NumArray:
    def __init__(self, nums):
        self.prefix = [0] * (len(nums) + 1)
        for i in range(len(nums)):
            self.prefix[i + 1] = self.prefix[i] + nums[i]


    def sumRange(self, left, right):
        return self.prefix[right + 1] - self.prefix[left]
```

```java
public class NumArray {
    private int[] prefix;

    public NumArray(int[] nums) {
        prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }

    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}
```

```cpp
class NumArray {
private:
    vector<int> prefix;

public:
    NumArray(const vector<int>& nums) {
        prefix = vector<int>(nums.size() + 1, 0);
        for (int i = 0; i < nums.size(); i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }

    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};
```

```javascript
class NumArray {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.prefix = new Array(nums.length + 1).fill(0);
        for (let i = 0; i < nums.length; i++) {
            this.prefix[i + 1] = this.prefix[i] + nums[i];
        }
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    sumRange(left, right) {
        return this.prefix[right + 1] - this.prefix[left];
    }
}
```

```csharp
public class NumArray {
    private int[] prefix;

    public NumArray(int[] nums) {
        prefix = new int[nums.Length + 1];
        for (int i = 0; i < nums.Length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }

    public int SumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}
```

```go
type NumArray struct {
    prefix []int
}

func Constructor(nums []int) NumArray {
    prefix := make([]int, len(nums)+1)
    for i := 0; i < len(nums); i++ {
        prefix[i+1] = prefix[i] + nums[i]
    }
    return NumArray{prefix: prefix}
}

func (this *NumArray) SumRange(left int, right int) int {
    return this.prefix[right+1] - this.prefix[left]
}
```

```kotlin
class NumArray(nums: IntArray) {
    private val prefix: IntArray

    init {
        prefix = IntArray(nums.size + 1)
        for (i in nums.indices) {
            prefix[i + 1] = prefix[i] + nums[i]
        }
    }

    fun sumRange(left: Int, right: Int): Int {
        return prefix[right + 1] - prefix[left]
    }
}
```

```swift
class NumArray {
    private var prefix: [Int]

    init(_ nums: [Int]) {
        prefix = Array(repeating: 0, count: nums.count + 1)
        for i in 0..<nums.count {
            prefix[i + 1] = prefix[i] + nums[i]
        }
    }

    func sumRange(_ left: Int, _ right: Int) -> Int {
        return prefix[right + 1] - prefix[left]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ for each $sumRange()$ query, $O(n)$ for building the prefix sum array.
- Space complexity: $O(n)$

---

## 4. Segment Tree

### Intuition

A segment tree is a binary tree where each node stores the sum of a range of elements. The root contains the sum of the entire array, and each leaf contains a single element. While this is overkill for an immutable array (prefix sums are simpler and faster), segment trees become essential when updates are needed. For this immutable version, queries still run in logarithmic time.

### Algorithm

1. Build the segment tree:
   - Store leaf values at indices `n` to `2n - 1`.
   - Compute internal nodes bottom-up: `tree[i] = tree[2*i] + tree[2*i + 1]`.
2. For each `sumRange(left, right)` query:
   - Shift `left` and `right` to leaf positions.
   - While `left < right`:
     - If `left` is odd, add `tree[left]` to the result and increment `left`.
     - If `right` is odd, decrement `right` and add `tree[right]` to the result.
     - Move both pointers to their parents.
3. Return the accumulated sum.

::tabs-start

```python
class SegmentTree:
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (2 * self.n)
        for i in range(self.n):
            self.tree[self.n + i] = nums[i]
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = self.tree[2 * i] + self.tree[2 * i + 1]

    def query(self, left, right):
        left += self.n
        right += self.n + 1
        res = 0
        while left < right:
            if left % 2 == 1:
                res += self.tree[left]
                left += 1
            if right % 2 == 1:
                right -= 1
                res += self.tree[right]
            left //= 2
            right //= 2
        return res

class NumArray:
    def __init__(self, nums):
        self.segTree = SegmentTree(nums)

    def sumRange(self, left, right):
        return self.segTree.query(left, right)
```

```java
class SegmentTree {
    private int[] tree;
    private int n;

    public SegmentTree(int[] nums) {
        n = nums.length;
        tree = new int[2 * n];
        for (int i = 0; i < n; i++) {
            tree[n + i] = nums[i];
        }
        for (int i = n - 1; i > 0; i--) {
            tree[i] = tree[2 * i] + tree[2 * i + 1];
        }
    }

    public int query(int left, int right) {
        int sum = 0;
        left += n;
        right += n + 1;
        while (left < right) {
            if (left % 2 == 1) sum += tree[left++];
            if (right % 2 == 1) sum += tree[--right];
            left /= 2;
            right /= 2;
        }
        return sum;
    }
}

public class NumArray {
    private SegmentTree segTree;

    public NumArray(int[] nums) {
        segTree = new SegmentTree(nums);
    }

    public int sumRange(int left, int right) {
        return segTree.query(left, right);
    }
}
```

```cpp
class SegmentTree {
private:
    vector<int> tree;
    int n;

public:
    SegmentTree(const vector<int>& nums) {
        n = nums.size();
        tree.resize(2 * n);
        for (int i = 0; i < n; i++) {
            tree[n + i] = nums[i];
        }
        for (int i = n - 1; i > 0; i--) {
            tree[i] = tree[2 * i] + tree[2 * i + 1];
        }
    }

    int query(int left, int right) {
        int sum = 0;
        left += n;
        right += n + 1;
        while (left < right) {
            if (left % 2 == 1) sum += tree[left++];
            if (right % 2 == 1) sum += tree[--right];
            left /= 2;
            right /= 2;
        }
        return sum;
    }
};

class NumArray {
private:
    SegmentTree segTree;

public:
    NumArray(const vector<int>& nums) : segTree(nums) {}

    int sumRange(int left, int right) {
        return segTree.query(left, right);
    }
};
```

```javascript
class SegmentTree {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.n = nums.length;
        this.tree = Array(this.n * 2).fill(0);
        for (let i = 0; i < this.n; i++) {
            this.tree[this.n + i] = nums[i];
        }
        for (let i = this.n - 1; i > 0; i--) {
            this.tree[i] = this.tree[2 * i] + this.tree[2 * i + 1];
        }
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    query(left, right) {
        let sum = 0;
        left += this.n;
        right += this.n + 1;
        while (left < right) {
            if (left % 2 === 1) sum += this.tree[left++];
            if (right % 2 === 1) sum += this.tree[--right];
            left = Math.floor(left / 2);
            right = Math.floor(right / 2);
        }
        return sum;
    }
}

class NumArray {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.segTree = new SegmentTree(nums);
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

    public SegmentTree(int[] nums) {
        n = nums.Length;
        tree = new int[2 * n];
        for (int i = 0; i < n; i++) {
            tree[n + i] = nums[i];
        }
        for (int i = n - 1; i > 0; i--) {
            tree[i] = tree[2 * i] + tree[2 * i + 1];
        }
    }

    public int Query(int left, int right) {
        int sum = 0;
        left += n;
        right += n + 1;
        while (left < right) {
            if (left % 2 == 1) sum += tree[left++];
            if (right % 2 == 1) sum += tree[--right];
            left /= 2;
            right /= 2;
        }
        return sum;
    }
}

public class NumArray {
    private SegmentTree segTree;

    public NumArray(int[] nums) {
        segTree = new SegmentTree(nums);
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

func NewSegmentTree(nums []int) *SegmentTree {
    n := len(nums)
    tree := make([]int, 2*n)
    for i := 0; i < n; i++ {
        tree[n+i] = nums[i]
    }
    for i := n - 1; i > 0; i-- {
        tree[i] = tree[2*i] + tree[2*i+1]
    }
    return &SegmentTree{tree: tree, n: n}
}

func (st *SegmentTree) Query(left, right int) int {
    sum := 0
    left += st.n
    right += st.n + 1
    for left < right {
        if left%2 == 1 {
            sum += st.tree[left]
            left++
        }
        if right%2 == 1 {
            right--
            sum += st.tree[right]
        }
        left /= 2
        right /= 2
    }
    return sum
}

type NumArray struct {
    segTree *SegmentTree
}

func Constructor(nums []int) NumArray {
    return NumArray{segTree: NewSegmentTree(nums)}
}

func (this *NumArray) SumRange(left int, right int) int {
    return this.segTree.Query(left, right)
}
```

```kotlin
class SegmentTree(nums: IntArray) {
    private val tree: IntArray
    private val n: Int = nums.size

    init {
        tree = IntArray(2 * n)
        for (i in 0 until n) {
            tree[n + i] = nums[i]
        }
        for (i in n - 1 downTo 1) {
            tree[i] = tree[2 * i] + tree[2 * i + 1]
        }
    }

    fun query(left: Int, right: Int): Int {
        var l = left + n
        var r = right + n + 1
        var sum = 0
        while (l < r) {
            if (l % 2 == 1) sum += tree[l++]
            if (r % 2 == 1) sum += tree[--r]
            l /= 2
            r /= 2
        }
        return sum
    }
}

class NumArray(nums: IntArray) {
    private val segTree = SegmentTree(nums)

    fun sumRange(left: Int, right: Int): Int {
        return segTree.query(left, right)
    }
}
```

```swift
class SegmentTree {
    private var tree: [Int]
    private var n: Int

    init(_ nums: [Int]) {
        n = nums.count
        tree = Array(repeating: 0, count: 2 * n)
        for i in 0..<n {
            tree[n + i] = nums[i]
        }
        for i in stride(from: n - 1, through: 1, by: -1) {
            tree[i] = tree[2 * i] + tree[2 * i + 1]
        }
    }

    func query(_ left: Int, _ right: Int) -> Int {
        var l = left + n
        var r = right + n + 1
        var sum = 0
        while l < r {
            if l % 2 == 1 {
                sum += tree[l]
                l += 1
            }
            if r % 2 == 1 {
                r -= 1
                sum += tree[r]
            }
            l /= 2
            r /= 2
        }
        return sum
    }
}

class NumArray {
    private var segTree: SegmentTree

    init(_ nums: [Int]) {
        segTree = SegmentTree(nums)
    }

    func sumRange(_ left: Int, _ right: Int) -> Int {
        return segTree.query(left, right)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$ for each $sumRange()$ query, $O(n)$ for building the Segment Tree.
- Space complexity: $O(n)$

---

## Common Pitfalls

### Off-by-One Error When Left Index Is Zero

When using a prefix sum array where `prefix[i]` represents the sum from index 0 to i, computing `sumRange(0, right)` requires special handling. Attempting to access `prefix[-1]` causes an error. The fix is either to check `if left > 0` before subtracting, or use a prefix array of size `n + 1` where `prefix[0] = 0` so that `prefix[right + 1] - prefix[left]` always works without edge cases.

### Modifying the Original Array After Preprocessing

Since prefix sums are precomputed during initialization, any subsequent changes to the original array will not be reflected in query results. This approach only works for immutable arrays. If updates are needed, a different data structure like a segment tree or Fenwick tree must be used instead of static prefix sums.
