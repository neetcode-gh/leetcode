## 1. Dynamic Programming (Top-Down)

### Intuition
We want to find the maximum sum of a subsequence where consecutive elements are at most `k` indices apart. For each index, we can either start a new subsequence there or extend a previous subsequence. Using recursion with memoization, we explore starting from each position and try extending to any position within the next `k` indices, taking the maximum result.

### Algorithm
1. Create a memoization array to store computed results for each starting index.
2. Define a recursive function `dfs(i)` that returns the maximum subsequence sum starting from index `i`.
3. For each index `i`, initialize the result as `nums[i]` (taking just this element).
4. Try extending to each index `j` in the range `[i+1, i+k]` and update the result as `max(result, nums[i] + dfs(j))`.
5. Store and return the memoized result.
6. The answer is the maximum of `dfs(i)` for all starting indices.

::tabs-start

```python
class Solution:
    def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
        memo = [None] * len(nums)

        def dfs(i):
            if memo[i] != None:
                return memo[i]

            res = nums[i]
            for j in range(i + 1, len(nums)):
                if j - i > k:
                    break
                res = max(res, nums[i] + dfs(j))

            memo[i] = res
            return res

        ans = float('-inf')
        for i in range(len(nums)):
            ans = max(ans, dfs(i))
        return ans
```

```java
public class Solution {
    private int[] nums;
    private Integer[] memo;
    private int k;

    public int constrainedSubsetSum(int[] nums, int k) {
        this.nums = nums;
        this.memo = new Integer[nums.length];
        this.k = k;

        int ans = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            ans = Math.max(ans, dfs(i));
        }
        return ans;
    }

    private int dfs(int i) {
        if (memo[i] != null) {
            return memo[i];
        }

        int res = nums[i];
        for (int j = i + 1; j < nums.length && j - i <= k; j++) {
            res = Math.max(res, nums[i] + dfs(j));
        }

        memo[i] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    int constrainedSubsetSum(vector<int>& nums, int k) {
        vector<int> memo(nums.size(), INT_MIN);
        int ans = INT_MIN;
        for (int i = 0; i < nums.size(); i++) {
            ans = max(ans, dfs(nums, memo, k, i));
        }
        return ans;
    }

private:
    int dfs(vector<int>& nums, vector<int>& memo, int k, int i) {
        if (memo[i] != INT_MIN) {
            return memo[i];
        }

        int res = nums[i];
        for (int j = i + 1; j < nums.size() && j - i <= k; j++) {
            res = max(res, nums[i] + dfs(nums, memo, k, j));
        }

        memo[i] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    constrainedSubsetSum(nums, k) {
        const memo = new Array(nums.length).fill(null);

        const dfs = (i) => {
            if (memo[i] !== null) {
                return memo[i];
            }

            let res = nums[i];
            for (let j = i + 1; j < nums.length && j - i <= k; j++) {
                res = Math.max(res, nums[i] + dfs(j));
            }

            memo[i] = res;
            return res;
        };

        let ans = -Infinity;
        for (let i = 0; i < nums.length; i++) {
            ans = Math.max(ans, dfs(i));
        }
        return ans;
    }
}
```

```csharp
public class Solution {
    private int[] nums;
    private int?[] memo;
    private int k;

    public int ConstrainedSubsetSum(int[] nums, int k) {
        this.nums = nums;
        this.memo = new int?[nums.Length];
        this.k = k;

        int ans = int.MinValue;
        for (int i = 0; i < nums.Length; i++) {
            ans = Math.Max(ans, Dfs(i));
        }
        return ans;
    }

    private int Dfs(int i) {
        if (memo[i].HasValue) {
            return memo[i].Value;
        }

        int res = nums[i];
        for (int j = i + 1; j < nums.Length && j - i <= k; j++) {
            res = Math.Max(res, nums[i] + Dfs(j));
        }

        memo[i] = res;
        return res;
    }
}
```

```go
func constrainedSubsetSum(nums []int, k int) int {
    memo := make([]int, len(nums))
    for i := range memo {
        memo[i] = math.MinInt32
    }

    var dfs func(i int) int
    dfs = func(i int) int {
        if memo[i] != math.MinInt32 {
            return memo[i]
        }

        res := nums[i]
        for j := i + 1; j < len(nums) && j-i <= k; j++ {
            res = max(res, nums[i]+dfs(j))
        }

        memo[i] = res
        return res
    }

    ans := math.MinInt32
    for i := 0; i < len(nums); i++ {
        ans = max(ans, dfs(i))
    }
    return ans
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private lateinit var nums: IntArray
    private lateinit var memo: Array<Int?>
    private var k: Int = 0

    fun constrainedSubsetSum(nums: IntArray, k: Int): Int {
        this.nums = nums
        this.memo = arrayOfNulls(nums.size)
        this.k = k

        var ans = Int.MIN_VALUE
        for (i in nums.indices) {
            ans = maxOf(ans, dfs(i))
        }
        return ans
    }

    private fun dfs(i: Int): Int {
        memo[i]?.let { return it }

        var res = nums[i]
        for (j in i + 1 until nums.size) {
            if (j - i > k) break
            res = maxOf(res, nums[i] + dfs(j))
        }

        memo[i] = res
        return res
    }
}
```

```swift
class Solution {
    private var nums: [Int] = []
    private var memo: [Int?] = []
    private var k: Int = 0

    func constrainedSubsetSum(_ nums: [Int], _ k: Int) -> Int {
        self.nums = nums
        self.memo = [Int?](repeating: nil, count: nums.count)
        self.k = k

        var ans = Int.min
        for i in 0..<nums.count {
            ans = max(ans, dfs(i))
        }
        return ans
    }

    private func dfs(_ i: Int) -> Int {
        if let cached = memo[i] {
            return cached
        }

        var res = nums[i]
        for j in (i + 1)..<nums.count {
            if j - i > k { break }
            res = max(res, nums[i] + dfs(j))
        }

        memo[i] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Bottom-Up)

### Intuition
Instead of recursion, we can solve this iteratively. We define `dp[i]` as the maximum sum of a constrained subsequence ending at index `i`. For each position, we look back at the previous `k` elements and take the best one to extend from (if it improves our sum).

### Algorithm
1. Initialize a DP array where `dp[i] = nums[i]` (each element starts as its own subsequence).
2. For each index `i` from `1` to `n-1`, iterate through all indices `j` in the range `[max(0, i-k), i-1]`.
3. Update `dp[i] = max(dp[i], nums[i] + dp[j])` to potentially extend from a previous subsequence.
4. Return the maximum value in the DP array.

::tabs-start

```python
class Solution:
    def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
        dp = [num for num in nums]

        for i in range(1, len(nums)):
            for j in range(max(0, i - k), i):
                dp[i] = max(dp[i], nums[i] + dp[j])

        return max(dp)
```

```java
public class Solution {
    public int constrainedSubsetSum(int[] nums, int k) {
        int n = nums.length;
        int[] dp = new int[n];
        System.arraycopy(nums, 0, dp, 0, n);

        for (int i = 1; i < n; i++) {
            for (int j = Math.max(0, i - k); j < i; j++) {
                dp[i] = Math.max(dp[i], nums[i] + dp[j]);
            }
        }

        int res = Integer.MIN_VALUE;
        for (int val : dp) {
            res = Math.max(res, val);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int constrainedSubsetSum(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> dp(nums.begin(), nums.end());

        for (int i = 1; i < n; i++) {
            for (int j = max(0, i - k); j < i; j++) {
                dp[i] = max(dp[i], nums[i] + dp[j]);
            }
        }

        return *max_element(dp.begin(), dp.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    constrainedSubsetSum(nums, k) {
        const n = nums.length;
        const dp = [...nums];

        for (let i = 1; i < n; i++) {
            for (let j = Math.max(0, i - k); j < i; j++) {
                dp[i] = Math.max(dp[i], nums[i] + dp[j]);
            }
        }

        return Math.max(...dp);
    }
}
```

```csharp
public class Solution {
    public int ConstrainedSubsetSum(int[] nums, int k) {
        int n = nums.Length;
        int[] dp = (int[])nums.Clone();

        for (int i = 1; i < n; i++) {
            for (int j = Math.Max(0, i - k); j < i; j++) {
                dp[i] = Math.Max(dp[i], nums[i] + dp[j]);
            }
        }

        int res = int.MinValue;
        foreach (int val in dp) {
            res = Math.Max(res, val);
        }
        return res;
    }
}
```

```go
func constrainedSubsetSum(nums []int, k int) int {
    n := len(nums)
    dp := make([]int, n)
    copy(dp, nums)

    for i := 1; i < n; i++ {
        for j := max(0, i-k); j < i; j++ {
            dp[i] = max(dp[i], nums[i]+dp[j])
        }
    }

    res := dp[0]
    for _, val := range dp {
        res = max(res, val)
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun constrainedSubsetSum(nums: IntArray, k: Int): Int {
        val n = nums.size
        val dp = nums.copyOf()

        for (i in 1 until n) {
            for (j in maxOf(0, i - k) until i) {
                dp[i] = maxOf(dp[i], nums[i] + dp[j])
            }
        }

        return dp.max()!!
    }
}
```

```swift
class Solution {
    func constrainedSubsetSum(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        var dp = nums

        for i in 1..<n {
            for j in max(0, i - k)..<i {
                dp[i] = max(dp[i], nums[i] + dp[j])
            }
        }

        return dp.max()!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming + Segment Tree

### Intuition
The bottleneck in the previous approach is finding the maximum DP value in a sliding window of size `k`. A segment tree can answer range maximum queries in `O(log n)` time, allowing us to efficiently find the best previous subsequence to extend from.

### Algorithm
1. Build a segment tree that supports point updates and range maximum queries.
2. Initialize the tree with the first element's value.
3. For each index `i` from `1` to `n-1`:
   - Query the segment tree for the maximum value in the range `[max(0, i-k), i-1]`.
   - Compute `current = nums[i] + max(0, queryResult)` (we add `0` if all previous values are negative, meaning we start fresh).
   - Update the segment tree at index `i` with `current`.
   - Track the overall maximum result.
4. Return the maximum result found.

::tabs-start

```python
class SegmentTree:
    def __init__(self, N):
        self.n = N
        while (self.n & (self.n - 1)) != 0:
            self.n += 1
        self.tree = [float('-inf')] * (2 * self.n)

    def update(self, i, val):
        i += self.n
        self.tree[i] = val
        while i > 1:
            i >>= 1
            self.tree[i] = max(self.tree[i << 1], self.tree[i << 1 | 1])

    def query(self, l, r):
        res = float('-inf')
        l += self.n
        r += self.n + 1
        while l < r:
            if l & 1:
                res = max(res, self.tree[l])
                l += 1
            if r & 1:
                r -= 1
                res = max(res, self.tree[r])
            l >>= 1
            r >>= 1
        return max(0, res)

class Solution:
    def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
        n = len(nums)
        maxSegTree = SegmentTree(n)
        maxSegTree.update(0, nums[0])
        res = nums[0]

        for i in range(1, n):
            cur = nums[i] + maxSegTree.query(max(0, i - k), i - 1)
            maxSegTree.update(i, cur)
            res = max(res, cur)

        return res
```

```java
class SegmentTree {
    int n;
    int[] tree;

    public SegmentTree(int N) {
        this.n = N;
        while ((this.n & (this.n - 1)) != 0) {
            this.n++;
        }
        tree = new int[2 * this.n];
        for (int i = 0; i < 2 * this.n; i++) {
            tree[i] = Integer.MIN_VALUE;
        }
    }

    public void update(int i, int val) {
        i += n;
        tree[i] = val;
        while (i > 1) {
            i >>= 1;
            tree[i] = Math.max(tree[i << 1], tree[(i << 1) | 1]);
        }
    }

    public int query(int l, int r) {
        int res = Integer.MIN_VALUE;
        l += n;
        r += n + 1;
        while (l < r) {
            if ((l & 1) == 1) {
                res = Math.max(res, tree[l]);
                l++;
            }
            if ((r & 1) == 1) {
                r--;
                res = Math.max(res, tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return Math.max(0, res);
    }
}

public class Solution {
    public int constrainedSubsetSum(int[] nums, int k) {
        int n = nums.length;
        SegmentTree maxSegTree = new SegmentTree(n);
        maxSegTree.update(0, nums[0]);
        int res = nums[0];

        for (int i = 1; i < n; i++) {
            int cur = nums[i] + maxSegTree.query(Math.max(0, i - k), i - 1);
            maxSegTree.update(i, cur);
            res = Math.max(res, cur);
        }

        return res;
    }
}
```

```cpp
class SegmentTree {
public:
    int n;
    vector<int> tree;

    SegmentTree(int N) {
        n = N;
        while ((n & (n - 1)) != 0) {
            n++;
        }
        tree.assign(2 * n, INT_MIN);
    }

    void update(int i, int val) {
        i += n;
        tree[i] = val;
        while (i > 1) {
            i >>= 1;
            tree[i] = max(tree[i << 1], tree[i << 1 | 1]);
        }
    }

    int query(int l, int r) {
        int res = INT_MIN;
        l += n;
        r += n + 1;
        while (l < r) {
            if (l & 1) {
                res = max(res, tree[l]);
                l++;
            }
            if (r & 1) {
                r--;
                res = max(res, tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return max(0, res);
    }
};

class Solution {
public:
    int constrainedSubsetSum(vector<int>& nums, int k) {
        int n = nums.size();
        SegmentTree maxSegTree(n);
        maxSegTree.update(0, nums[0]);
        int res = nums[0];

        for (int i = 1; i < n; i++) {
            int cur = nums[i] + maxSegTree.query(max(0, i - k), i - 1);
            maxSegTree.update(i, cur);
            res = max(res, cur);
        }

        return res;
    }
};
```

```javascript
class SegmentTree {
    /**
     * @constructor
     * @param {number} N
     */
    constructor(N) {
        this.n = N;
        while ((this.n & (this.n - 1)) !== 0) {
            this.n++;
        }
        this.tree = new Array(2 * this.n).fill(-Infinity);
    }

    /**
     * @param {number} i
     * @param {number} val
     * @return {void}
     */
    update(i, val) {
        i += this.n;
        this.tree[i] = val;
        while (i > 1) {
            i >>= 1;
            this.tree[i] = Math.max(this.tree[i << 1], this.tree[(i << 1) | 1]);
        }
    }

    /**
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    query(l, r) {
        let res = -Infinity;
        l += this.n;
        r += this.n + 1;
        while (l < r) {
            if (l & 1) {
                res = Math.max(res, this.tree[l]);
                l++;
            }
            if (r & 1) {
                r--;
                res = Math.max(res, this.tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return Math.max(0, res);
    }
}

class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    constrainedSubsetSum(nums, k) {
        const n = nums.length;
        const maxSegTree = new SegmentTree(n);
        maxSegTree.update(0, nums[0]);
        let res = nums[0];

        for (let i = 1; i < n; i++) {
            let cur = nums[i] + maxSegTree.query(Math.max(0, i - k), i - 1);
            maxSegTree.update(i, cur);
            res = Math.max(res, cur);
        }

        return res;
    }
}
```

```csharp
public class SegmentTree {
    private int n;
    private int[] tree;

    public SegmentTree(int N) {
        n = N;
        while ((n & (n - 1)) != 0) {
            n++;
        }
        tree = new int[2 * n];
        Array.Fill(tree, int.MinValue);
    }

    public void Update(int i, int val) {
        i += n;
        tree[i] = val;
        while (i > 1) {
            i >>= 1;
            tree[i] = Math.Max(tree[i << 1], tree[(i << 1) | 1]);
        }
    }

    public int Query(int l, int r) {
        int res = int.MinValue;
        l += n;
        r += n + 1;
        while (l < r) {
            if ((l & 1) == 1) {
                res = Math.Max(res, tree[l]);
                l++;
            }
            if ((r & 1) == 1) {
                r--;
                res = Math.Max(res, tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return Math.Max(0, res);
    }
}

public class Solution {
    public int ConstrainedSubsetSum(int[] nums, int k) {
        int n = nums.Length;
        SegmentTree maxSegTree = new SegmentTree(n);
        maxSegTree.Update(0, nums[0]);
        int res = nums[0];

        for (int i = 1; i < n; i++) {
            int cur = nums[i] + maxSegTree.Query(Math.Max(0, i - k), i - 1);
            maxSegTree.Update(i, cur);
            res = Math.Max(res, cur);
        }

        return res;
    }
}
```

```go
type SegmentTree struct {
    n    int
    tree []int
}

func NewSegmentTree(N int) *SegmentTree {
    n := N
    for (n & (n - 1)) != 0 {
        n++
    }
    tree := make([]int, 2*n)
    for i := range tree {
        tree[i] = math.MinInt32
    }
    return &SegmentTree{n: n, tree: tree}
}

func (st *SegmentTree) Update(i, val int) {
    i += st.n
    st.tree[i] = val
    for i > 1 {
        i >>= 1
        st.tree[i] = max(st.tree[i<<1], st.tree[i<<1|1])
    }
}

func (st *SegmentTree) Query(l, r int) int {
    res := math.MinInt32
    l += st.n
    r += st.n + 1
    for l < r {
        if l&1 == 1 {
            res = max(res, st.tree[l])
            l++
        }
        if r&1 == 1 {
            r--
            res = max(res, st.tree[r])
        }
        l >>= 1
        r >>= 1
    }
    return max(0, res)
}

func constrainedSubsetSum(nums []int, k int) int {
    n := len(nums)
    maxSegTree := NewSegmentTree(n)
    maxSegTree.Update(0, nums[0])
    res := nums[0]

    for i := 1; i < n; i++ {
        cur := nums[i] + maxSegTree.Query(max(0, i-k), i-1)
        maxSegTree.Update(i, cur)
        res = max(res, cur)
    }

    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class SegmentTree(N: Int) {
    private var n: Int = N
    private val tree: IntArray

    init {
        while ((n and (n - 1)) != 0) {
            n++
        }
        tree = IntArray(2 * n) { Int.MIN_VALUE }
    }

    fun update(i: Int, value: Int) {
        var idx = i + n
        tree[idx] = value
        while (idx > 1) {
            idx = idx shr 1
            tree[idx] = maxOf(tree[idx shl 1], tree[(idx shl 1) or 1])
        }
    }

    fun query(l: Int, r: Int): Int {
        var res = Int.MIN_VALUE
        var left = l + n
        var right = r + n + 1
        while (left < right) {
            if (left and 1 == 1) {
                res = maxOf(res, tree[left])
                left++
            }
            if (right and 1 == 1) {
                right--
                res = maxOf(res, tree[right])
            }
            left = left shr 1
            right = right shr 1
        }
        return maxOf(0, res)
    }
}

class Solution {
    fun constrainedSubsetSum(nums: IntArray, k: Int): Int {
        val n = nums.size
        val maxSegTree = SegmentTree(n)
        maxSegTree.update(0, nums[0])
        var res = nums[0]

        for (i in 1 until n) {
            val cur = nums[i] + maxSegTree.query(maxOf(0, i - k), i - 1)
            maxSegTree.update(i, cur)
            res = maxOf(res, cur)
        }

        return res
    }
}
```

```swift
class SegmentTree {
    private var n: Int
    private var tree: [Int]

    init(_ N: Int) {
        n = N
        while (n & (n - 1)) != 0 {
            n += 1
        }
        tree = [Int](repeating: Int.min, count: 2 * n)
    }

    func update(_ i: Int, _ val: Int) {
        var idx = i + n
        tree[idx] = val
        while idx > 1 {
            idx >>= 1
            tree[idx] = max(tree[idx << 1], tree[(idx << 1) | 1])
        }
    }

    func query(_ l: Int, _ r: Int) -> Int {
        var res = Int.min
        var left = l + n
        var right = r + n + 1
        while left < right {
            if left & 1 == 1 {
                res = max(res, tree[left])
                left += 1
            }
            if right & 1 == 1 {
                right -= 1
                res = max(res, tree[right])
            }
            left >>= 1
            right >>= 1
        }
        return max(0, res)
    }
}

class Solution {
    func constrainedSubsetSum(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        let maxSegTree = SegmentTree(n)
        maxSegTree.update(0, nums[0])
        var res = nums[0]

        for i in 1..<n {
            let cur = nums[i] + maxSegTree.query(max(0, i - k), i - 1)
            maxSegTree.update(i, cur)
            res = max(res, cur)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Max-Heap

### Intuition
We can use a max-heap to efficiently track the maximum DP value among the previous `k` elements. The heap stores pairs of (dp value, index). Before using the top of the heap, we remove any entries that are outside our window (more than `k` positions behind).

### Algorithm
1. Initialize the result with `nums[0]` and push `(nums[0], 0)` onto a max-heap.
2. For each index `i` from `1` to `n-1`:
   - Pop elements from the heap while the top element's index is more than `k` positions behind `i`.
   - Compute `current = max(nums[i], nums[i] + heap.top())` to either start fresh or extend.
   - Update the result with `current`.
   - Push `(current, i)` onto the heap.
3. Return the maximum result.

::tabs-start

```python
class Solution:
    def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
        res = nums[0]
        max_heap = [(-nums[0], 0)]  # max_sum, index

        for i in range(1, len(nums)):
            while i - max_heap[0][1] > k:
                heapq.heappop(max_heap)

            cur_max = max(nums[i], nums[i] - max_heap[0][0])
            res = max(res, cur_max)
            heapq.heappush(max_heap, (-cur_max, i))

        return res
```

```java
public class Solution {
    public int constrainedSubsetSum(int[] nums, int k) {
        int res = nums[0];
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>(
            (a, b) -> b[0] - a[0] // max_sum, index
        );
        maxHeap.offer(new int[]{nums[0], 0});

        for (int i = 1; i < nums.length; i++) {
            while (i - maxHeap.peek()[1] > k) {
                maxHeap.poll();
            }

            int curMax = Math.max(nums[i], nums[i] + maxHeap.peek()[0]);
            res = Math.max(res, curMax);
            maxHeap.offer(new int[]{curMax, i});
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int constrainedSubsetSum(vector<int>& nums, int k) {
        int res = nums[0];
        priority_queue<pair<int, int>> maxHeap; // max_sum, index
        maxHeap.emplace(nums[0], 0);

        for (int i = 1; i < nums.size(); i++) {
            while (i - maxHeap.top().second > k) {
                maxHeap.pop();
            }

            int curMax = max(nums[i], nums[i] + maxHeap.top().first);
            res = max(res, curMax);
            maxHeap.emplace(curMax, i);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    constrainedSubsetSum(nums, k) {
        let res = nums[0];
        const maxHeap = new PriorityQueue(
            (a, b) => b[0] - a[0], // max_sum, index
        );
        maxHeap.enqueue([nums[0], 0]);

        for (let i = 1; i < nums.length; i++) {
            while (i - maxHeap.front()[1] > k) {
                maxHeap.dequeue();
            }

            let curMax = Math.max(nums[i], nums[i] + maxHeap.front()[0]);
            res = Math.max(res, curMax);
            maxHeap.enqueue([curMax, i]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int ConstrainedSubsetSum(int[] nums, int k) {
        int res = nums[0];
        var maxHeap = new PriorityQueue<int[], int>();
        maxHeap.Enqueue(new int[] { nums[0], 0 }, -nums[0]);

        for (int i = 1; i < nums.Length; i++) {
            while (i - maxHeap.Peek()[1] > k) {
                maxHeap.Dequeue();
            }

            int curMax = Math.Max(nums[i], nums[i] + maxHeap.Peek()[0]);
            res = Math.Max(res, curMax);
            maxHeap.Enqueue(new int[] { curMax, i }, -curMax);
        }

        return res;
    }
}
```

```go
import "container/heap"

type MaxHeap [][]int

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i][0] > h[j][0] }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *MaxHeap) Push(x interface{}) {
    *h = append(*h, x.([]int))
}

func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func constrainedSubsetSum(nums []int, k int) int {
    res := nums[0]
    maxHeap := &MaxHeap{{nums[0], 0}}
    heap.Init(maxHeap)

    for i := 1; i < len(nums); i++ {
        for i-(*maxHeap)[0][1] > k {
            heap.Pop(maxHeap)
        }

        curMax := max(nums[i], nums[i]+(*maxHeap)[0][0])
        res = max(res, curMax)
        heap.Push(maxHeap, []int{curMax, i})
    }

    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun constrainedSubsetSum(nums: IntArray, k: Int): Int {
        var res = nums[0]
        val maxHeap = PriorityQueue<IntArray>(compareByDescending { it[0] })
        maxHeap.offer(intArrayOf(nums[0], 0))

        for (i in 1 until nums.size) {
            while (i - maxHeap.peek()[1] > k) {
                maxHeap.poll()
            }

            val curMax = maxOf(nums[i], nums[i] + maxHeap.peek()[0])
            res = maxOf(res, curMax)
            maxHeap.offer(intArrayOf(curMax, i))
        }

        return res
    }
}
```

```swift
class Solution {
    func constrainedSubsetSum(_ nums: [Int], _ k: Int) -> Int {
        var res = nums[0]
        var maxHeap = Heap<(Int, Int)>(sort: { $0.0 > $1.0 })
        maxHeap.insert((nums[0], 0))

        for i in 1..<nums.count {
            while i - maxHeap.peek()!.1 > k {
                maxHeap.remove()
            }

            let curMax = max(nums[i], nums[i] + maxHeap.peek()!.0)
            res = max(res, curMax)
            maxHeap.insert((curMax, i))
        }

        return res
    }
}

struct Heap<T> {
    var elements: [T]
    let sort: (T, T) -> Bool

    init(sort: @escaping (T, T) -> Bool, elements: [T] = []) {
        self.sort = sort
        self.elements = elements
        if !elements.isEmpty {
            for i in stride(from: elements.count / 2 - 1, through: 0, by: -1) {
                siftDown(from: i)
            }
        }
    }

    var isEmpty: Bool { elements.isEmpty }
    var count: Int { elements.count }

    func peek() -> T? { elements.first }

    mutating func insert(_ value: T) {
        elements.append(value)
        siftUp(from: elements.count - 1)
    }

    mutating func remove() -> T? {
        guard !elements.isEmpty else { return nil }
        elements.swapAt(0, elements.count - 1)
        let removed = elements.removeLast()
        if !elements.isEmpty { siftDown(from: 0) }
        return removed
    }

    private mutating func siftUp(from index: Int) {
        var child = index
        var parent = (child - 1) / 2
        while child > 0 && sort(elements[child], elements[parent]) {
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
            if left < elements.count && sort(elements[left], elements[candidate]) {
                candidate = left
            }
            if right < elements.count && sort(elements[right], elements[candidate]) {
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

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 5. Monotonic Deque

### Intuition
A monotonic decreasing deque provides `O(1)` access to the maximum value in a sliding window. We maintain a deque where values are in decreasing order. The front always holds the maximum DP value within our window, and we remove elements from the back that are smaller than the current value (since they will never be useful).

### Algorithm
1. Initialize a deque with `(0, nums[0])` representing (index, dp value) and set result to `nums[0]`.
2. For each index `i` from `1` to `n-1`:
   - Remove the front element if its index is outside the window (less than `i - k`).
   - Compute `current = max(0, deque.front().value) + nums[i]`.
   - Remove elements from the back while they have values less than or equal to `current`.
   - Add `(i, current)` to the back of the deque.
   - Update the result with `current`.
3. Return the maximum result.

::tabs-start

```python
class Solution:
    def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
        n = len(nums)
        dq = deque([(0, nums[0])])
        res = nums[0]

        for i in range(1, n):
            if dq and dq[0][0] < i - k:
                dq.popleft()

            cur = max(0, dq[0][1]) + nums[i]
            while dq and cur > dq[-1][1]:
                dq.pop()

            dq.append((i, cur))
            res = max(res, cur)

        return res
```

```java
public class Solution {
    public int constrainedSubsetSum(int[] nums, int k) {
        int n = nums.length;
        Deque<int[]> dq = new ArrayDeque<>();
        dq.offer(new int[]{0, nums[0]});
        int res = nums[0];

        for (int i = 1; i < n; i++) {
            if (!dq.isEmpty() && dq.peekFirst()[0] < i - k) {
                dq.pollFirst();
            }

            int cur = Math.max(0, dq.peekFirst()[1]) + nums[i];
            while (!dq.isEmpty() && cur > dq.peekLast()[1]) {
                dq.pollLast();
            }

            dq.offer(new int[]{i, cur});
            res = Math.max(res, cur);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int constrainedSubsetSum(vector<int>& nums, int k) {
        int n = nums.size();
        deque<pair<int, int>> dq{{0, nums[0]}};
        int res = nums[0];

        for (int i = 1; i < n; i++) {
            if (!dq.empty() && dq.front().first < i - k) {
                dq.pop_front();
            }

            int cur = max(0, dq.front().second) + nums[i];
            while (!dq.empty() && cur > dq.back().second) {
                dq.pop_back();
            }

            dq.emplace_back(i, cur);
            res = max(res, cur);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    constrainedSubsetSum(nums, k) {
        const n = nums.length;
        const dq = new Deque([[0, nums[0]]]);
        let res = nums[0];

        for (let i = 1; i < n; i++) {
            if (!dq.isEmpty() && dq.front()[0] < i - k) {
                dq.popFront();
            }

            let cur = Math.max(0, dq.front()[1]) + nums[i];
            while (!dq.isEmpty() && cur > dq.back()[1]) {
                dq.popBack();
            }

            dq.pushBack([i, cur]);
            res = Math.max(res, cur);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int ConstrainedSubsetSum(int[] nums, int k) {
        int n = nums.Length;
        var dq = new LinkedList<int[]>();
        dq.AddLast(new int[] { 0, nums[0] });
        int res = nums[0];

        for (int i = 1; i < n; i++) {
            while (dq.Count > 0 && dq.First.Value[0] < i - k) {
                dq.RemoveFirst();
            }

            int cur = Math.Max(0, dq.First.Value[1]) + nums[i];
            while (dq.Count > 0 && cur > dq.Last.Value[1]) {
                dq.RemoveLast();
            }

            dq.AddLast(new int[] { i, cur });
            res = Math.Max(res, cur);
        }

        return res;
    }
}
```

```go
func constrainedSubsetSum(nums []int, k int) int {
    n := len(nums)
    dq := [][]int{{0, nums[0]}}
    res := nums[0]

    for i := 1; i < n; i++ {
        for len(dq) > 0 && dq[0][0] < i-k {
            dq = dq[1:]
        }

        cur := max(0, dq[0][1]) + nums[i]
        for len(dq) > 0 && cur > dq[len(dq)-1][1] {
            dq = dq[:len(dq)-1]
        }

        dq = append(dq, []int{i, cur})
        res = max(res, cur)
    }

    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun constrainedSubsetSum(nums: IntArray, k: Int): Int {
        val n = nums.size
        val dq = ArrayDeque<IntArray>()
        dq.addLast(intArrayOf(0, nums[0]))
        var res = nums[0]

        for (i in 1 until n) {
            while (dq.isNotEmpty() && dq.first()[0] < i - k) {
                dq.removeFirst()
            }

            val cur = maxOf(0, dq.first()[1]) + nums[i]
            while (dq.isNotEmpty() && cur > dq.last()[1]) {
                dq.removeLast()
            }

            dq.addLast(intArrayOf(i, cur))
            res = maxOf(res, cur)
        }

        return res
    }
}
```

```swift
class Solution {
    func constrainedSubsetSum(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        var dq: [(Int, Int)] = [(0, nums[0])]
        var res = nums[0]

        for i in 1..<n {
            while !dq.isEmpty && dq.first!.0 < i - k {
                dq.removeFirst()
            }

            let cur = max(0, dq.first!.1) + nums[i]
            while !dq.isEmpty && cur > dq.last!.1 {
                dq.removeLast()
            }

            dq.append((i, cur))
            res = max(res, cur)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(k)$

---

## Common Pitfalls

### Forcing Extension When Starting Fresh is Better
When all previous DP values in the window are negative, it's better to start a new subsequence at the current index rather than extending. Failing to take `max(0, previous_max)` leads to suboptimal sums.

```python
# Wrong: always extends from previous
cur = nums[i] + dq[0][1]

# Correct: start fresh if previous max is negative
cur = nums[i] + max(0, dq[0][1])
```

### Not Maintaining Monotonic Decreasing Order in Deque
The deque must store values in decreasing order so the front always has the maximum. Forgetting to pop smaller values from the back before inserting breaks this invariant.

```python
# Wrong: just appends without cleanup
dq.append((i, cur))

# Correct: remove smaller values first
while dq and cur > dq[-1][1]:
    dq.pop()
dq.append((i, cur))
```

### Incorrect Window Boundary Check
The constraint allows elements at most `k` indices apart, meaning index `i` can extend from indices `i-k` through `i-1`. Using `< i - k` instead of `<= i - k - 1` (or equivalently `< i - k`) for removal is an off-by-one error.

### Using O(nk) Approach for Large Inputs
The naive DP solution that checks all `k` previous elements for each position times out on large inputs. Using a segment tree, heap, or monotonic deque is necessary to achieve `O(n log n)` or `O(n)` time.

### Returning Maximum DP Value Instead of Tracking Running Maximum
In some implementations, the maximum sum subsequence might not end at the last index. You must track the maximum across all DP values, not just return `dp[n-1]`.
