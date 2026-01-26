## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Dynamic Programming** - Understanding DP transitions for subsequence problems where each element depends on previous valid elements
- **Segment Trees** - Implementing range maximum queries and point updates efficiently in O(log n) time
- **Coordinate Compression** - Mapping large value ranges to smaller indices when the actual values are sparse

---

## 1. Brute Force (Recursion)

### Intuition
We want the **longest increasing subsequence**, but with an extra rule:

- It must be strictly increasing (`nums[j] > nums[i]`)
- The jump between consecutive chosen numbers can't be too big (`nums[j] - nums[i] <= k`)

The brute-force recursion tries **every possible "next pick"** after position `i`.

Think of it like:
- Start at index `i`
- From there, try all later indices `j > i` that are valid "next steps"
- Take the best (longest) option among them

Because we don't store results (no `memo`), the same subproblems get recomputed many times → slow, but simple.

### Algorithm
1. Define a recursive function `dfs(i)`:
   - It returns the length of the best valid subsequence starting at index `i`.
2. Inside `dfs(i)`:
   - Start with `res = 1` (at minimum, the subsequence is just `nums[i]`).
   - Loop through all `j` from `i+1` to end:
     - Skip if `nums[j] <= nums[i]` (not increasing).
     - Skip if `nums[j] - nums[i] > k` (jump too large).
     - Otherwise, try taking `j` next: `res = max(res, 1 + dfs(j))`
   - Return `res`.
3. Try starting from every index `i`:
   - Answer is `max(dfs(i))` over all `i`.

::tabs-start

```python
class Solution:
    def lengthOfLIS(self, nums: List[int], k: int) -> int:
        def dfs(i):
            res = 1
            for j in range(i + 1, len(nums)):
                if nums[j] <= nums[i]:
                    continue
                if nums[j] - nums[i] <= k:
                    res = max(res, 1 + dfs(j))
            return res

        res = 0
        for i in range(len(nums)):
            res = max(res, dfs(i))
        return res
```

```java
public class Solution {
    public int lengthOfLIS(int[] nums, int k) {
        int n = nums.length;
        int res = 0;

        for (int i = 0; i < n; i++) {
            res = Math.max(res, dfs(nums, k, i));
        }

        return res;
    }

    private int dfs(int[] nums, int k, int i) {
        int res = 1;

        for (int j = i + 1; j < nums.length; j++) {
            if (nums[j] <= nums[i]) continue;
            if (nums[j] - nums[i] <= k) {
                res = Math.max(res, 1 + dfs(nums, k, j));
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums, int k) {
        int n = nums.size();
        int res = 0;

        for (int i = 0; i < n; i++) {
            res = max(res, dfs(nums, k, i));
        }

        return res;
    }

private:
    int dfs(vector<int>& nums, int k, int i) {
        int res = 1;

        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[j] <= nums[i]) continue;
            if (nums[j] - nums[i] <= k) {
                res = max(res, 1 + dfs(nums, k, j));
            }
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
    lengthOfLIS(nums, k) {
        const dfs = (i) => {
            let res = 1;

            for (let j = i + 1; j < nums.length; j++) {
                if (nums[j] <= nums[i]) continue;
                if (nums[j] - nums[i] <= k) {
                    res = Math.max(res, 1 + dfs(j));
                }
            }

            return res;
        };

        let res = 0;
        for (let i = 0; i < nums.length; i++) {
            res = Math.max(res, dfs(i));
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLIS(int[] nums, int k) {
        int n = nums.Length;
        int res = 0;

        for (int i = 0; i < n; i++) {
            res = Math.Max(res, Dfs(nums, k, i));
        }

        return res;
    }

    private int Dfs(int[] nums, int k, int i) {
        int res = 1;

        for (int j = i + 1; j < nums.Length; j++) {
            if (nums[j] <= nums[i]) continue;
            if (nums[j] - nums[i] <= k) {
                res = Math.Max(res, 1 + Dfs(nums, k, j));
            }
        }

        return res;
    }
}
```

```go
func lengthOfLIS(nums []int, k int) int {
    var dfs func(i int) int
    dfs = func(i int) int {
        res := 1
        for j := i + 1; j < len(nums); j++ {
            if nums[j] <= nums[i] {
                continue
            }
            if nums[j]-nums[i] <= k {
                res = max(res, 1+dfs(j))
            }
        }
        return res
    }

    res := 0
    for i := 0; i < len(nums); i++ {
        res = max(res, dfs(i))
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
    fun lengthOfLIS(nums: IntArray, k: Int): Int {
        fun dfs(i: Int): Int {
            var res = 1
            for (j in i + 1 until nums.size) {
                if (nums[j] <= nums[i]) continue
                if (nums[j] - nums[i] <= k) {
                    res = maxOf(res, 1 + dfs(j))
                }
            }
            return res
        }

        var res = 0
        for (i in nums.indices) {
            res = maxOf(res, dfs(i))
        }
        return res
    }
}
```

```swift
class Solution {
    func lengthOfLIS(_ nums: [Int], _ k: Int) -> Int {
        func dfs(_ i: Int) -> Int {
            var res = 1
            for j in (i + 1)..<nums.count {
                if nums[j] <= nums[i] { continue }
                if nums[j] - nums[i] <= k {
                    res = max(res, 1 + dfs(j))
                }
            }
            return res
        }

        var res = 0
        for i in 0..<nums.count {
            res = max(res, dfs(i))
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Bottom-Up)

### Intuition
This is the optimized version of the brute-force recursion.

Instead of recomputing the LIS starting at every index again and again, we **build the answer bottom-up**.

Key idea:
- Let `dp[i]` = length of the longest valid increasing subsequence **ending at index `i`**.
- To extend a subsequence ending at `j` to `i`, three things must hold:
  1. `j < i` (comes before)
  2. `nums[j] < nums[i]` (strictly increasing)
  3. `nums[i] - nums[j] <= k` (difference constraint)

For each position `i`, we look back at all previous `j` and choose the best valid one.

### Algorithm
1. Initialize:
   - `dp[i] = 1` for all `i` (each number alone is a subsequence).
   - `res = 0` to track the global maximum.
2. For each index `i` from `0` to `n-1`:
   - For each index `j` from `0` to `i-1`:
     - Skip if `nums[j] >= nums[i]`.
     - Skip if `nums[i] - nums[j] > k`.
     - Otherwise:
       - Update `dp[i] = max(dp[i], 1 + dp[j])`.
   - Update `res = max(res, dp[i])`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def lengthOfLIS(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0
        dp = [1] * n
        for i in range(n):
            for j in range(i):
                if nums[j] >= nums[i]:
                    continue
                if nums[i] - nums[j] <= k:
                    dp[i] = max(dp[i], 1 + dp[j])
            res = max(res, dp[i])
        return res
```

```java
public class Solution {
    public int lengthOfLIS(int[] nums, int k) {
        int n = nums.length, res = 0;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] >= nums[i]) continue;
                if (nums[i] - nums[j] <= k) {
                    dp[i] = Math.max(dp[i], 1 + dp[j]);
                }
            }
            res = Math.max(res, dp[i]);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;
        vector<int> dp(n, 1);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] >= nums[i]) continue;
                if (nums[i] - nums[j] <= k) {
                    dp[i] = max(dp[i], 1 + dp[j]);
                }
            }
            res = max(res, dp[i]);
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
    lengthOfLIS(nums, k) {
        const n = nums.length;
        let res = 0;
        const dp = new Array(n).fill(1);

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (nums[j] >= nums[i]) continue;
                if (nums[i] - nums[j] <= k) {
                    dp[i] = Math.max(dp[i], 1 + dp[j]);
                }
            }
            res = Math.max(res, dp[i]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLIS(int[] nums, int k) {
        int n = nums.Length, res = 0;
        int[] dp = new int[n];
        Array.Fill(dp, 1);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] >= nums[i]) continue;
                if (nums[i] - nums[j] <= k) {
                    dp[i] = Math.Max(dp[i], 1 + dp[j]);
                }
            }
            res = Math.Max(res, dp[i]);
        }

        return res;
    }
}
```

```go
func lengthOfLIS(nums []int, k int) int {
    n := len(nums)
    res := 0
    dp := make([]int, n)
    for i := range dp {
        dp[i] = 1
    }

    for i := 0; i < n; i++ {
        for j := 0; j < i; j++ {
            if nums[j] >= nums[i] {
                continue
            }
            if nums[i]-nums[j] <= k {
                if 1+dp[j] > dp[i] {
                    dp[i] = 1 + dp[j]
                }
            }
        }
        if dp[i] > res {
            res = dp[i]
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun lengthOfLIS(nums: IntArray, k: Int): Int {
        val n = nums.size
        var res = 0
        val dp = IntArray(n) { 1 }

        for (i in 0 until n) {
            for (j in 0 until i) {
                if (nums[j] >= nums[i]) continue
                if (nums[i] - nums[j] <= k) {
                    dp[i] = maxOf(dp[i], 1 + dp[j])
                }
            }
            res = maxOf(res, dp[i])
        }

        return res
    }
}
```

```swift
class Solution {
    func lengthOfLIS(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        var res = 0
        var dp = [Int](repeating: 1, count: n)

        for i in 0..<n {
            for j in 0..<i {
                if nums[j] >= nums[i] { continue }
                if nums[i] - nums[j] <= k {
                    dp[i] = max(dp[i], 1 + dp[j])
                }
            }
            res = max(res, dp[i])
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming + Segment Tree (Coordinate Compression)

### Intuition
The `O(n^2)` `dp` checks every previous index `j` for each `i`.
We can speed this up by thinking in terms of **values**, not indices:

Let `best[x]` = the best LIS length of a valid subsequence **ending with value `x`** (or at some value ≤ x).

For a number `num`, the previous value we can come from must be in:
- `(num - k) ... (num - 1)`  (strictly smaller, and difference ≤ k)

So we want:
- `curr = 1 + max(best[v])` for all `v ∈ [num-k, num-1]`

This is a classic **range maximum query + point update** problem:
- Query max on a value range: `[num-k, num-1]`
- Update at value `num` with the new `curr`

A **Segment Tree** supports:
- `query(l, r)` in `O(log M)`
- `update(pos, val)` in `O(log M)`

But values can be large, so we use **coordinate compression** to map only the needed values to `[0..M-1]`.

### Algorithm
1. **Coordinate Compression**
   - Collect all values that might be needed in queries/updates:
     - `num` (update position)
     - `num - 1` (right boundary of query)
     - `num - k` (left boundary of query)
   - Sort them and map each to a compressed index.

2. **Segment Tree Setup**
   - Build a segment tree of size `M` (number of compressed values).
   - Initially all zeros (meaning no subsequence yet).

3. **Process numbers left to right**
   For each `num`:
   - Find compressed indices:
     - `l = index(num - k)`
     - `r = index(num - 1)`
   - Query:
     - `bestPrev = max value in segment tree over [l, r]`
   - Compute:
     - `curr = bestPrev + 1`
   - Update:
     - set `tree[index(num)] = max(tree[index(num)], curr)`
   - Track global answer `res`.

4. Return `res`.

::tabs-start

```python
class SegmentTree:
    def __init__(self, N):
        self.n = N
        while (self.n & (self.n - 1)) != 0:
            self.n += 1
        self.tree = [0] * (2 * self.n)

    def update(self, i, val):
        if val <= self.tree[self.n + i]:
            return
        self.tree[self.n + i] = val
        j = (self.n + i) >> 1
        while j >= 1:
            self.tree[j] = max(self.tree[j << 1], self.tree[j << 1 | 1])
            j >>= 1

    def query(self, ql, qh):
        l = ql + self.n
        r = qh + self.n + 1
        res = 0
        while l < r:
            if l & 1:
                res = max(res, self.tree[l])
                l += 1
            if r & 1:
                r -= 1
                res = max(res, self.tree[r])
            l >>= 1
            r >>= 1
        return res


class Solution:
    def lengthOfLIS(self, nums: List[int], k: int) -> int:
        n = len(nums)
        mp = {}
        tmp = set([0])
        for num in nums:
            if num - k > 0:
                tmp.add(num - k)
            if num - 1 > 0:
                tmp.add(num - 1)
            tmp.add(num)

        index = 0
        for value in sorted(tmp):
            mp[value] = index
            index += 1

        ST = SegmentTree(index)
        res = 0
        for num in nums:
            l = mp.get(num - k, 0)
            r = mp.get(num - 1, 0)
            curr = ST.query(l, r) + 1
            res = max(res, curr)
            ST.update(mp[num], curr)

        return res
```

```java
class SegmentTree {
    private int n;
    private int[] tree;

    public SegmentTree(int N) {
        this.n = N;
        while (Integer.bitCount(n) != 1) {
            n++;
        }
        tree = new int[2 * n];
    }

    public void update(int i, int val) {
        if (val <= tree[n + i]) return;
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = Math.max(tree[j << 1], tree[(j << 1) + 1]);
        }
    }

    public int query(int ql, int qh) {
        int l = ql + n, r = qh + n + 1, res = 0;
        while (l < r) {
            if ((l & 1) == 1) res = Math.max(res, tree[l++]);
            if ((r & 1) == 1) res = Math.max(res, tree[--r]);
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

public class Solution {
    public int lengthOfLIS(int[] nums, int k) {
        int n = nums.length;
        TreeSet<Integer> tmp = new TreeSet<>();
        tmp.add(0);
        for (int num : nums) {
            if (num - k > 0) tmp.add(num - k);
            if (num - 1 > 0) tmp.add(num - 1);
            tmp.add(num);
        }

        Map<Integer, Integer> mp = new HashMap<>();
        int index = 0;
        for (int val : tmp) {
            mp.put(val, index++);
        }

        SegmentTree ST = new SegmentTree(index);
        int res = 0;
        for (int num : nums) {
            int l = mp.getOrDefault(num - k, 0);
            int r = mp.getOrDefault(num - 1, 0);
            int curr = ST.query(l, r) + 1;
            res = Math.max(res, curr);
            ST.update(mp.get(num), curr);
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
        this->n = N;
        while (__builtin_popcount(n) != 1) {
            n++;
        }
        tree.resize(2 * n, 0);
    }

    void update(int i, int val) {
        if (val <= tree[n + i]) return;
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = max(tree[j << 1], tree[(j << 1) + 1]);
        }
    }

    int query(int ql, int qh) {
        int l = ql + n, r = qh + n + 1, res = 0;
        while (l < r) {
            if (l & 1) res = max(res, tree[l++]);
            if (r & 1) res = max(res, tree[--r]);
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
};

class Solution {
public:
    int lengthOfLIS(vector<int>& nums, int k) {
        int n = nums.size();
        unordered_map<int, int> mp;
        set<int> tmp = {0};

        for (int num : nums) {
            if (num - k > 0) tmp.insert(num - k);
            if (num - 1 > 0) tmp.insert(num - 1);
            tmp.insert(num);
        }

        int index = 0;
        for (const int& val : tmp) {
            mp[val] = index++;
        }

        SegmentTree ST(index);
        int ans = 0;
        for (int& num : nums) {
            int l = mp[num - k];
            int r = mp[num - 1];
            int curr = ST.query(l, r) + 1;
            ans = max(ans, curr);
            ST.update(mp[num], curr);
        }

        return ans;
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
        this.tree = Array(2 * this.n).fill(0);
    }

    /**
     * @param {number} i
     * @param {number} val
     * @return {void}
     */
    update(i, val) {
        if (val <= this.tree[this.n + i]) return;
        this.tree[this.n + i] = val;
        for (let j = (this.n + i) >> 1; j >= 1; j >>= 1) {
            this.tree[j] = Math.max(this.tree[j << 1], this.tree[(j << 1) + 1]);
        }
    }

    /**
     * @param {number} ql
     * @param {number} qh
     * @return {number}
     */
    query(ql, qh) {
        let l = ql + this.n,
            r = qh + this.n + 1,
            res = 0;
        while (l < r) {
            if (l & 1) res = Math.max(res, this.tree[l++]);
            if (r & 1) res = Math.max(res, this.tree[--r]);
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    lengthOfLIS(nums, k) {
        const n = nums.length;
        const tmp = new Set([0]);
        for (const num of nums) {
            if (num - k > 0) tmp.add(num - k);
            if (num - 1 > 0) tmp.add(num - 1);
            tmp.add(num);
        }

        const mp = new Map();
        let index = 0;
        Array.from(tmp)
            .sort((a, b) => a - b)
            .forEach((val) => mp.set(val, index++));

        const ST = new SegmentTree(index);
        let ans = 0;
        for (const num of nums) {
            const l = mp.has(num - k) ? mp.get(num - k) : 0;
            const r = mp.has(num - 1) ? mp.get(num - 1) : 0;
            const curr = ST.query(l, r) + 1;
            ans = Math.max(ans, curr);
            ST.update(mp.get(num), curr);
        }
        return ans;
    }
}
```

```csharp
public class SegmentTree {
    private int n;
    private int[] tree;

    public SegmentTree(int N) {
        this.n = N;
        while ((n & (n - 1)) != 0) {
            n++;
        }
        tree = new int[2 * n];
    }

    public void Update(int i, int val) {
        if (val <= tree[n + i]) return;
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = Math.Max(tree[j << 1], tree[(j << 1) + 1]);
        }
    }

    public int Query(int ql, int qh) {
        int l = ql + n, r = qh + n + 1, res = 0;
        while (l < r) {
            if ((l & 1) == 1) res = Math.Max(res, tree[l++]);
            if ((r & 1) == 1) res = Math.Max(res, tree[--r]);
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

public class Solution {
    public int LengthOfLIS(int[] nums, int k) {
        int n = nums.Length;
        var tmp = new SortedSet<int> { 0 };
        foreach (int num in nums) {
            if (num - k > 0) tmp.Add(num - k);
            if (num - 1 > 0) tmp.Add(num - 1);
            tmp.Add(num);
        }

        var mp = new Dictionary<int, int>();
        int index = 0;
        foreach (int val in tmp) {
            mp[val] = index++;
        }

        var ST = new SegmentTree(index);
        int res = 0;
        foreach (int num in nums) {
            int l = mp.ContainsKey(num - k) ? mp[num - k] : 0;
            int r = mp.ContainsKey(num - 1) ? mp[num - 1] : 0;
            int curr = ST.Query(l, r) + 1;
            res = Math.Max(res, curr);
            ST.Update(mp[num], curr);
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
    for n&(n-1) != 0 {
        n++
    }
    return &SegmentTree{n: n, tree: make([]int, 2*n)}
}

func (st *SegmentTree) Update(i, val int) {
    if val <= st.tree[st.n+i] {
        return
    }
    st.tree[st.n+i] = val
    for j := (st.n + i) >> 1; j >= 1; j >>= 1 {
        st.tree[j] = max(st.tree[j<<1], st.tree[j<<1|1])
    }
}

func (st *SegmentTree) Query(ql, qh int) int {
    l, r, res := ql+st.n, qh+st.n+1, 0
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
    return res
}

func lengthOfLIS(nums []int, k int) int {
    tmp := map[int]bool{0: true}
    for _, num := range nums {
        if num-k > 0 {
            tmp[num-k] = true
        }
        if num-1 > 0 {
            tmp[num-1] = true
        }
        tmp[num] = true
    }

    keys := make([]int, 0, len(tmp))
    for key := range tmp {
        keys = append(keys, key)
    }
    sort.Ints(keys)

    mp := make(map[int]int)
    for i, val := range keys {
        mp[val] = i
    }

    ST := NewSegmentTree(len(keys))
    res := 0
    for _, num := range nums {
        l, ok := mp[num-k]
        if !ok {
            l = 0
        }
        r, ok := mp[num-1]
        if !ok {
            r = 0
        }
        curr := ST.Query(l, r) + 1
        if curr > res {
            res = curr
        }
        ST.Update(mp[num], curr)
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
    private var n = N
    private val tree: IntArray

    init {
        while (n and (n - 1) != 0) {
            n++
        }
        tree = IntArray(2 * n)
    }

    fun update(i: Int, value: Int) {
        if (value <= tree[n + i]) return
        tree[n + i] = value
        var j = (n + i) shr 1
        while (j >= 1) {
            tree[j] = maxOf(tree[j shl 1], tree[(j shl 1) + 1])
            j = j shr 1
        }
    }

    fun query(ql: Int, qh: Int): Int {
        var l = ql + n
        var r = qh + n + 1
        var res = 0
        while (l < r) {
            if (l and 1 == 1) res = maxOf(res, tree[l++])
            if (r and 1 == 1) res = maxOf(res, tree[--r])
            l = l shr 1
            r = r shr 1
        }
        return res
    }
}

class Solution {
    fun lengthOfLIS(nums: IntArray, k: Int): Int {
        val tmp = sortedSetOf(0)
        for (num in nums) {
            if (num - k > 0) tmp.add(num - k)
            if (num - 1 > 0) tmp.add(num - 1)
            tmp.add(num)
        }

        val mp = mutableMapOf<Int, Int>()
        var index = 0
        for (value in tmp) {
            mp[value] = index++
        }

        val ST = SegmentTree(index)
        var res = 0
        for (num in nums) {
            val l = mp.getOrDefault(num - k, 0)
            val r = mp.getOrDefault(num - 1, 0)
            val curr = ST.query(l, r) + 1
            res = maxOf(res, curr)
            ST.update(mp[num]!!, curr)
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
        var n = N
        while n & (n - 1) != 0 {
            n += 1
        }
        self.n = n
        self.tree = [Int](repeating: 0, count: 2 * n)
    }

    func update(_ i: Int, _ val: Int) {
        if val <= tree[n + i] { return }
        tree[n + i] = val
        var j = (n + i) >> 1
        while j >= 1 {
            tree[j] = max(tree[j << 1], tree[(j << 1) + 1])
            j >>= 1
        }
    }

    func query(_ ql: Int, _ qh: Int) -> Int {
        var l = ql + n
        var r = qh + n + 1
        var res = 0
        while l < r {
            if l & 1 == 1 {
                res = max(res, tree[l])
                l += 1
            }
            if r & 1 == 1 {
                r -= 1
                res = max(res, tree[r])
            }
            l >>= 1
            r >>= 1
        }
        return res
    }
}

class Solution {
    func lengthOfLIS(_ nums: [Int], _ k: Int) -> Int {
        var tmp = Set<Int>([0])
        for num in nums {
            if num - k > 0 { tmp.insert(num - k) }
            if num - 1 > 0 { tmp.insert(num - 1) }
            tmp.insert(num)
        }

        var mp = [Int: Int]()
        var index = 0
        for value in tmp.sorted() {
            mp[value] = index
            index += 1
        }

        let ST = SegmentTree(index)
        var res = 0
        for num in nums {
            let l = mp[num - k] ?? 0
            let r = mp[num - 1] ?? 0
            let curr = ST.query(l, r) + 1
            res = max(res, curr)
            ST.update(mp[num]!, curr)
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

## 4. Dynamic Programming + Segment Tree

### Intuition
We want the longest increasing subsequence where consecutive values differ by at most `k`.

Instead of DP over indices (`dp[i]`), think DP over **values**:
- Let `best[x]` = the best LIS length of any valid subsequence that ends with value `x`.

When we process a value `num`, the previous value must be:
- strictly smaller than `num`
- and within distance `k`

So the previous value must lie in the range:
- `[num - k, num - 1]`

That means:
- `dpEndingAtNum = 1 + max(best[v])` for `v ∈ [num-k, num-1]`

We need a data structure that supports:
- **Range maximum query** over `[num-k, num-1]`
- **Point update** at index `num` with the new best value

A **segment tree** supports both in `O(log M)` where `M` is the maximum value we index.

### Algorithm
1. Let `M = max(nums)` and build a segment tree over indices `[0 .. M]`,
   where each index `x` stores `best[x]` (initially all zeros).
2. Initialize `res = 0`.
3. For each `num` in `nums` (left to right):
   - Compute query bounds:
     - `l = max(0, num - k)`
     - `r = num - 1`
   - If `r < l`, then there is no valid smaller value → `bestPrev = 0`
     else `bestPrev = segmentTree.query(l, r)`
   - `curr = bestPrev + 1`
   - Update: `segmentTree.update(num, curr)` (keep the maximum at `num`)
   - `res = max(res, curr)`
4. Return `res`.

::tabs-start

```python
class SegmentTree:
    def __init__(self, N):
        self.n = N
        while (self.n & (self.n - 1)) != 0:
            self.n += 1
        self.tree = [0] * (2 * self.n)

    def update(self, i, val):
        if val <= self.tree[self.n + i]:
            return
        self.tree[self.n + i] = val
        j = (self.n + i) >> 1
        while j >= 1:
            self.tree[j] = max(self.tree[j << 1], self.tree[j << 1 | 1])
            j >>= 1

    def query(self, ql, qh):
        l = ql + self.n
        r = qh + self.n + 1
        res = 0
        while l < r:
            if l & 1:
                res = max(res, self.tree[l])
                l += 1
            if r & 1:
                r -= 1
                res = max(res, self.tree[r])
            l >>= 1
            r >>= 1
        return res


class Solution:
    def lengthOfLIS(self, nums: List[int], k: int) -> int:
        max_val = max(nums)
        ST = SegmentTree(max_val + 1)
        res = 0
        for num in nums:
            l = max(0, num - k)
            r = max(0, num - 1)
            curr = ST.query(l, r) + 1
            res = max(res, curr)
            ST.update(num, curr)

        return res
```

```java
class SegmentTree {
    private int[] tree;
    private int n;

    public SegmentTree(int N) {
        this.n = N;
        while ((this.n & (this.n - 1)) != 0) {
            this.n++;
        }
        this.tree = new int[2 * this.n];
    }

    public void update(int i, int val) {
        if (val <= tree[n + i]) return;
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = Math.max(tree[j << 1], tree[(j << 1) + 1]);
        }
    }

    public int query(int l, int r) {
        l += n;
        r += n + 1;
        int res = 0;
        while (l < r) {
            if ((l & 1) == 1) {
                res = Math.max(res, tree[l++]);
            }
            if ((r & 1) == 1) {
                res = Math.max(res, tree[--r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

public class Solution {
    public int lengthOfLIS(int[] nums, int k) {
        int maxVal = 0;
        for (int num : nums) {
            maxVal = Math.max(maxVal, num);
        }

        SegmentTree ST = new SegmentTree(maxVal + 1);
        int res = 0;
        for (int num : nums) {
            int l = Math.max(0, num - k);
            int r = Math.max(0, num - 1);
            int curr = ST.query(l, r) + 1;
            res = Math.max(res, curr);
            ST.update(num, curr);
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
        tree.resize(2 * n, 0);
    }

    void update(int i, int val) {
        if (val <= tree[n + i]) return;
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = max(tree[j << 1], tree[(j << 1) + 1]);
        }
    }

    int query(int l, int r) {
        l += n;
        r += n + 1;
        int res = 0;
        while (l < r) {
            if (l & 1) {
                res = max(res, tree[l++]);
            }
            if (r & 1) {
                res = max(res, tree[--r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
};

class Solution {
public:
    int lengthOfLIS(vector<int>& nums, int k) {
        int maxVal = *max_element(nums.begin(), nums.end());
        SegmentTree ST(maxVal + 1);
        int res = 0;
        for (int& num : nums) {
            int l = max(0, num - k);
            int r = max(0, num - 1);
            int curr = ST.query(l, r) + 1;
            res = max(res, curr);
            ST.update(num, curr);
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
        this.tree = Array(2 * this.n).fill(0);
    }

    /**
     * @param {number} i
     * @param {number} val
     * @return {void}
     */
    update(i, val) {
        if (val <= this.tree[this.n + i]) return;
        this.tree[this.n + i] = val;
        for (let j = (this.n + i) >> 1; j >= 1; j >>= 1) {
            this.tree[j] = Math.max(this.tree[j << 1], this.tree[(j << 1) + 1]);
        }
    }

    /**
     * @param {number} ql
     * @param {number} qh
     * @return {number}
     */
    query(ql, qh) {
        let l = ql + this.n,
            r = qh + this.n + 1,
            res = 0;
        while (l < r) {
            if (l & 1) res = Math.max(res, this.tree[l++]);
            if (r & 1) res = Math.max(res, this.tree[--r]);
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    lengthOfLIS(nums, k) {
        const maxVal = Math.max(...nums);
        const ST = new SegmentTree(maxVal + 1);
        let res = 0;
        for (const num of nums) {
            const l = Math.max(0, num - k);
            const r = Math.max(0, num - 1);
            const curr = ST.query(l, r) + 1;
            res = Math.max(res, curr);
            ST.update(num, curr);
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
        this.n = N;
        while ((n & (n - 1)) != 0) {
            n++;
        }
        tree = new int[2 * n];
    }

    public void Update(int i, int val) {
        if (val <= tree[n + i]) return;
        tree[n + i] = val;
        for (int j = (n + i) >> 1; j >= 1; j >>= 1) {
            tree[j] = Math.Max(tree[j << 1], tree[(j << 1) + 1]);
        }
    }

    public int Query(int l, int r) {
        l += n;
        r += n + 1;
        int res = 0;
        while (l < r) {
            if ((l & 1) == 1) res = Math.Max(res, tree[l++]);
            if ((r & 1) == 1) res = Math.Max(res, tree[--r]);
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

public class Solution {
    public int LengthOfLIS(int[] nums, int k) {
        int maxVal = 0;
        foreach (int num in nums) {
            maxVal = Math.Max(maxVal, num);
        }

        var ST = new SegmentTree(maxVal + 1);
        int res = 0;
        foreach (int num in nums) {
            int l = Math.Max(0, num - k);
            int r = Math.Max(0, num - 1);
            int curr = ST.Query(l, r) + 1;
            res = Math.Max(res, curr);
            ST.Update(num, curr);
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
    for n&(n-1) != 0 {
        n++
    }
    return &SegmentTree{n: n, tree: make([]int, 2*n)}
}

func (st *SegmentTree) Update(i, val int) {
    if val <= st.tree[st.n+i] {
        return
    }
    st.tree[st.n+i] = val
    for j := (st.n + i) >> 1; j >= 1; j >>= 1 {
        st.tree[j] = max(st.tree[j<<1], st.tree[j<<1|1])
    }
}

func (st *SegmentTree) Query(l, r int) int {
    l += st.n
    r += st.n + 1
    res := 0
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
    return res
}

func lengthOfLIS(nums []int, k int) int {
    maxVal := 0
    for _, num := range nums {
        if num > maxVal {
            maxVal = num
        }
    }

    ST := NewSegmentTree(maxVal + 1)
    res := 0
    for _, num := range nums {
        l := max(0, num-k)
        r := max(0, num-1)
        curr := ST.Query(l, r) + 1
        if curr > res {
            res = curr
        }
        ST.Update(num, curr)
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
    private var n = N
    private val tree: IntArray

    init {
        while (n and (n - 1) != 0) {
            n++
        }
        tree = IntArray(2 * n)
    }

    fun update(i: Int, value: Int) {
        if (value <= tree[n + i]) return
        tree[n + i] = value
        var j = (n + i) shr 1
        while (j >= 1) {
            tree[j] = maxOf(tree[j shl 1], tree[(j shl 1) + 1])
            j = j shr 1
        }
    }

    fun query(l: Int, r: Int): Int {
        var left = l + n
        var right = r + n + 1
        var res = 0
        while (left < right) {
            if (left and 1 == 1) res = maxOf(res, tree[left++])
            if (right and 1 == 1) res = maxOf(res, tree[--right])
            left = left shr 1
            right = right shr 1
        }
        return res
    }
}

class Solution {
    fun lengthOfLIS(nums: IntArray, k: Int): Int {
        val maxVal = nums.maxOrNull() ?: 0
        val ST = SegmentTree(maxVal + 1)
        var res = 0
        for (num in nums) {
            val l = maxOf(0, num - k)
            val r = maxOf(0, num - 1)
            val curr = ST.query(l, r) + 1
            res = maxOf(res, curr)
            ST.update(num, curr)
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
        var n = N
        while n & (n - 1) != 0 {
            n += 1
        }
        self.n = n
        self.tree = [Int](repeating: 0, count: 2 * n)
    }

    func update(_ i: Int, _ val: Int) {
        if val <= tree[n + i] { return }
        tree[n + i] = val
        var j = (n + i) >> 1
        while j >= 1 {
            tree[j] = max(tree[j << 1], tree[(j << 1) + 1])
            j >>= 1
        }
    }

    func query(_ l: Int, _ r: Int) -> Int {
        var left = l + n
        var right = r + n + 1
        var res = 0
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
        return res
    }
}

class Solution {
    func lengthOfLIS(_ nums: [Int], _ k: Int) -> Int {
        let maxVal = nums.max() ?? 0
        let ST = SegmentTree(maxVal + 1)
        var res = 0
        for num in nums {
            let l = max(0, num - k)
            let r = max(0, num - 1)
            let curr = ST.query(l, r) + 1
            res = max(res, curr)
            ST.update(num, curr)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log m)$
- Space complexity: $O(m)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum element in the array.

---

## Common Pitfalls

### Querying an Invalid Range

When the current number minus `k` is less than or equal to zero, or when `num - 1` is less than `num - k`, the query range becomes invalid. You must handle the case where there are no valid previous values to extend from, which means the current element starts a new subsequence of length 1.

### Using the Wrong Data Structure

This problem requires efficient range maximum queries and point updates. Using a simple DP array results in O(n*k) time complexity per element, which is too slow. A segment tree or similar data structure is necessary to achieve the O(log m) per-operation complexity needed for this problem.

### Off-by-One in Range Boundaries

The constraint requires `nums[j] - nums[i] <= k` with strict inequality `nums[j] > nums[i]`. This means you should query the range `[num - k, num - 1]`, not `[num - k, num]`. Including `num` in the query would violate the strictly increasing requirement.

### Not Using Coordinate Compression When Needed

When the maximum value in `nums` is very large but the number of distinct values is small, building a segment tree of size `max(nums)` wastes memory. Coordinate compression maps values to a smaller range, but you must ensure the compressed values maintain their relative ordering and the distance constraint is correctly applied to the original values, not the compressed indices.

### Updating Before Querying

The order of operations matters: you must query for the best previous subsequence before updating the current position. Updating first can cause the current element to incorrectly contribute to its own computation, leading to wrong answers.
