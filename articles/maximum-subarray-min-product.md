## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxSumMinProduct(self, nums: List[int]) -> int:
        res, MOD = 0, 1000000007
        for i in range(len(nums)):
            total_sum = 0
            mini = float("inf")
            for j in range(i, len(nums)):
                mini = min(mini, nums[j])
                total_sum += nums[j]
                cur = (mini * total_sum) % MOD
                res = max(res, cur)
        return res
```

```java
public class Solution {
    public int maxSumMinProduct(int[] nums) {
        long res = 0, MOD = 1000000007;
        for (int i = 0; i < nums.length; i++) {
            long totalSum = 0, mini = Long.MAX_VALUE;
            for (int j = i; j < nums.length; j++) {
                mini = Math.min(mini, nums[j]);
                totalSum += nums[j];
                long cur = (mini * totalSum) % MOD;
                res = Math.max(res, cur);
            }
        }
        return (int) res;
    }
}
```

```cpp
class Solution {
public:
    int maxSumMinProduct(vector<int>& nums) {
        long long res = 0, MOD = 1000000007;
        for (int i = 0; i < nums.size(); i++) {
            long long total_sum = 0, mini = INT_MAX;
            for (int j = i; j < nums.size(); j++) {
                mini = min(mini, (long long)nums[j]);
                total_sum += nums[j];
                long long cur = (mini * total_sum) % MOD;
                res = max(res, cur);
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
     * @return {number}
     */
    maxSumMinProduct(nums) {
        let res = 0,
            MOD = 1000000007;
        for (let i = 0; i < nums.length; i++) {
            let totalSum = 0,
                mini = Infinity;
            for (let j = i; j < nums.length; j++) {
                mini = Math.min(mini, nums[j]);
                totalSum += nums[j];
                let cur = (mini * totalSum) % MOD;
                res = Math.max(res, cur);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Divide And Conquer (Brute Force)

::tabs-start

```python
class Solution:
    def maxSumMinProduct(self, nums: List[int]) -> int:
        MOD = 10**9 + 7

        def rec(l, r):
            if l > r:
                return 0

            min_idx = l
            total_sum = 0
            for i in range(l, r + 1):
                total_sum += nums[i]
                if nums[i] < nums[min_idx]:
                    min_idx = i

            cur = total_sum * nums[min_idx]
            left = rec(l, min_idx - 1)
            right = rec(min_idx + 1, r)

            return max(cur, left, right)

        return rec(0, len(nums) - 1) % MOD
```

```java
public class Solution {
    public int maxSumMinProduct(int[] nums) {
        int MOD = 1_000_000_007;
        return (int) (rec(nums, 0, nums.length - 1) % MOD);
    }

    private long rec(int[] nums, int l, int r) {
        if (l > r) return 0;

        int minIdx = l;
        long totalSum = 0;
        for (int i = l; i <= r; i++) {
            totalSum += nums[i];
            if (nums[i] < nums[minIdx]) {
                minIdx = i;
            }
        }

        long cur = totalSum * nums[minIdx];
        long left = rec(nums, l, minIdx - 1);
        long right = rec(nums, minIdx + 1, r);

        return Math.max(cur, Math.max(left, right));
    }
}
```

```cpp
class Solution {
public:
    int maxSumMinProduct(vector<int>& nums) {
        const int MOD = 1e9 + 7;
        return rec(nums, 0, nums.size() - 1) % MOD;
    }

private:
    long long rec(vector<int>& nums, int l, int r) {
        if (l > r) return 0;

        int minIdx = l;
        long long totalSum = 0;
        for (int i = l; i <= r; i++) {
            totalSum += nums[i];
            if (nums[i] < nums[minIdx]) {
                minIdx = i;
            }
        }

        long long cur = totalSum * nums[minIdx];
        long long left = rec(nums, l, minIdx - 1);
        long long right = rec(nums, minIdx + 1, r);

        return max(cur, max(left, right));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSumMinProduct(nums) {
        const MOD = 1_000_000_007;

        const rec = (l, r) => {
            if (l > r) return 0n;

            let minIdx = l;
            let totalSum = 0n;
            for (let i = l; i <= r; i++) {
                totalSum += BigInt(nums[i]);
                if (nums[i] < nums[minIdx]) {
                    minIdx = i;
                }
            }

            let cur = totalSum * BigInt(nums[minIdx]);
            let left = rec(l, minIdx - 1);
            let right = rec(minIdx + 1, r);

            if (cur < left) cur = left;
            if (cur < right) cur = right;
            return cur;
        };

        return Number(rec(0, nums.length - 1) % BigInt(MOD));
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Divide And Conquer (Segment Tree)

::tabs-start

```python
class SegmentTree:
    def __init__(self, N, A):
        self.n = N
        while (self.n & (self.n - 1)) != 0:
            self.n += 1
        self.build(N, A)

    def build(self, N, A):
        self.tree = [(-1, float('inf'))] * (2 * self.n)
        for i in range(N):
            self.tree[self.n + i] = (i, A[i])
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = min(self.tree[i << 1], self.tree[i << 1 | 1], key=lambda x: x[1])

    def query(self, l, r):
        res = (-1, float('inf'))
        l += self.n
        r += self.n + 1
        while l < r:
            if l & 1:
                res = min(res, self.tree[l], key=lambda x: x[1])
                l += 1
            if r & 1:
                r -= 1
                res = min(res, self.tree[r], key=lambda x: x[1])
            l >>= 1
            r >>= 1
        return res[0]

class Solution:
    def maxSumMinProduct(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        segTree = SegmentTree(len(nums), nums)
        prefix_sum = [0] * (len(nums) + 1)
        for i in range(0, len(nums)):
            prefix_sum[i + 1] += prefix_sum[i] + nums[i]

        def rec(l, r):
            if l > r:
                return 0

            min_idx = segTree.query(l, r)
            total_sum = prefix_sum[r + 1] - prefix_sum[l]
            cur = total_sum * nums[min_idx]
            left = rec(l, min_idx - 1)
            right = rec(min_idx + 1, r)

            return max(cur, left, right)

        return rec(0, len(nums) - 1) % MOD
```

```java
class SegmentTree {
    private int n;
    private long[][] tree;

    public SegmentTree(int n, int[] nums) {
        this.n = n;
        while ((this.n & (this.n - 1)) != 0) {
            this.n++;
        }
        build(n, nums);
    }

    private void build(int n, int[] nums) {
        tree = new long[2 * this.n][2];
        Arrays.fill(tree, new long[]{-1, Long.MAX_VALUE});
        for (int i = 0; i < n; i++) {
            tree[this.n + i] = new long[]{i, nums[i]};
        }
        for (int i = this.n - 1; i > 0; i--) {
            tree[i] = merge(tree[i << 1], tree[i << 1 | 1]);
        }
    }

    private long[] merge(long[] a, long[] b) {
        return a[1] < b[1] ? a : b;
    }

    public int query(int l, int r) {
        long[] res = new long[]{-1, Long.MAX_VALUE};
        l += this.n;
        r += this.n + 1;
        while (l < r) {
            if ((l & 1) == 1) res = merge(res, tree[l++]);
            if ((r & 1) == 1) res = merge(res, tree[--r]);
            l >>= 1;
            r >>= 1;
        }
        return (int) res[0];
    }
}

public class Solution {
    public int maxSumMinProduct(int[] nums) {
        int MOD = 1_000_000_007;
        SegmentTree segTree = new SegmentTree(nums.length, nums);
        long[] prefixSum = new long[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        return (int) (rec(0, nums.length - 1, nums, prefixSum, segTree) % MOD);
    }

    private long rec(int l, int r, int[] nums, long[] prefixSum, SegmentTree segTree) {
        if (l > r) return 0;
        int minIdx = segTree.query(l, r);
        long totalSum = prefixSum[r + 1] - prefixSum[l];
        long cur = totalSum * nums[minIdx];
        long left = rec(l, minIdx - 1, nums, prefixSum, segTree);
        long right = rec(minIdx + 1, r, nums, prefixSum, segTree);
        return Math.max(cur, Math.max(left, right));
    }
}
```

```cpp
class SegmentTree {
    int n;
    vector<pair<int, long long>> tree;

public:
    SegmentTree(int n, vector<int>& nums) : n(n) {
        while ((this->n & (this->n - 1)) != 0) this->n++;
        build(n, nums);
    }

    void build(int n, vector<int>& nums) {
        tree.resize(2 * this->n, {-1, LLONG_MAX});
        for (int i = 0; i < n; i++) {
            tree[this->n + i] = {i, nums[i]};
        }
        for (int i = this->n - 1; i > 0; i--) {
            tree[i] = min(tree[i << 1], tree[i << 1 | 1], [](auto& a, auto& b) { return a.second < b.second; });
        }
    }

    int query(int l, int r) {
        pair<int, long long> res = {-1, LLONG_MAX};
        l += this->n;
        r += this->n + 1;
        while (l < r) {
            if (l & 1) res = min(res, tree[l++], [](auto& a, auto& b) { return a.second < b.second; });
            if (r & 1) res = min(res, tree[--r], [](auto& a, auto& b) { return a.second < b.second; });
            l >>= 1;
            r >>= 1;
        }
        return res.first;
    }
};

class Solution {
public:
    int maxSumMinProduct(vector<int>& nums) {
        const int MOD = 1e9 + 7;
        SegmentTree segTree(nums.size(), nums);
        vector<long long> prefixSum(nums.size() + 1, 0);
        for (int i = 0; i < nums.size(); i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        return rec(0, nums.size() - 1, nums, prefixSum, segTree) % MOD;
    }

private:
    long long rec(int l, int r, vector<int>& nums, vector<long long>& prefixSum, SegmentTree& segTree) {
        if (l > r) return 0;
        int minIdx = segTree.query(l, r);
        long long totalSum = prefixSum[r + 1] - prefixSum[l];
        long long cur = totalSum * nums[minIdx];
        long long left = rec(l, minIdx - 1, nums, prefixSum, segTree);
        long long right = rec(minIdx + 1, r, nums, prefixSum, segTree);
        return max(cur, max(left, right));
    }
};
```

```javascript
class SegmentTree {
    /**
     * @constructor
     * @param {number} n
     * @param {number[]} nums
     */
    constructor(n, nums) {
        this.n = n;
        while ((this.n & (this.n - 1)) !== 0) {
            this.n++;
        }
        this.build(n, nums);
    }

    /**
     * @param {number} n
     * @param {number[]} nums
     * @return {void}
     */
    build(n, nums) {
        this.tree = Array(2 * this.n).fill([
            BigInt(-1),
            BigInt(Number.MAX_SAFE_INTEGER),
        ]);
        for (let i = 0; i < n; i++) {
            this.tree[this.n + i] = [BigInt(i), BigInt(nums[i])];
        }
        for (let i = this.n - 1; i > 0; i--) {
            this.tree[i] = this._merge(
                this.tree[i << 1],
                this.tree[(i << 1) | 1],
            );
        }
    }

    /**
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    _merge(a, b) {
        return a[1] < b[1] ? a : b;
    }

    /**
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    query(l, r) {
        let res = [BigInt(-1), BigInt(Number.MAX_SAFE_INTEGER)];
        l += this.n;
        r += this.n + 1;
        while (l < r) {
            if (l & 1) res = this._merge(res, this.tree[l++]);
            if (r & 1) res = this._merge(res, this.tree[--r]);
            l >>= 1;
            r >>= 1;
        }
        return Number(res[0]);
    }
}

class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSumMinProduct(nums) {
        const MOD = BigInt(1_000_000_007);
        const segTree = new SegmentTree(nums.length, nums);
        const prefixSum = Array(nums.length + 1).fill(BigInt(0));
        for (let i = 0; i < nums.length; i++) {
            prefixSum[i + 1] = prefixSum[i] + BigInt(nums[i]);
        }

        const rec = (l, r) => {
            if (l > r) return BigInt(0);
            const minIdx = segTree.query(l, r);
            const totalSum = prefixSum[r + 1] - prefixSum[l];
            let cur = totalSum * BigInt(nums[minIdx]);
            let left = rec(l, minIdx - 1);
            let right = rec(minIdx + 1, r);

            if (cur < left) cur = left;
            if (cur < right) cur = right;
            return cur;
        };

        return Number(rec(0, nums.length - 1) % MOD);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Monotonic Stack

::tabs-start

```python
class Solution:
    def maxSumMinProduct(self, nums: List[int]) -> int:
        n = len(nums)
        prefix_sum = [0] * (n + 1)
        for i in range(n):
            prefix_sum[i + 1] = prefix_sum[i] + nums[i]

        prev_min, nxt_min = [-1] * n, [n] * n
        stack = []

        for i in range(n):
            while stack and nums[stack[-1]] >= nums[i]:
                stack.pop()
            if stack:
                prev_min[i] = stack[-1]
            stack.append(i)

        stack.clear()

        for i in range(n - 1, -1, -1):
            while stack and nums[stack[-1]] >= nums[i]:
                stack.pop()
            if stack:
                nxt_min[i] = stack[-1]
            stack.append(i)

        res = 0

        for i in range(n):
            l, r = prev_min[i] + 1, nxt_min[i] - 1
            total_sum = prefix_sum[r + 1] - prefix_sum[l]
            res = max(res, nums[i] * total_sum)

        return res % (10 ** 9 + 7)
```

```java
public class Solution {
    public int maxSumMinProduct(int[] nums) {
        int n = nums.length;
        long[] prefixSum = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        int[] prevMin = new int[n];
        int[] nxtMin = new int[n];
        Arrays.fill(prevMin, -1);
        Arrays.fill(nxtMin, n);

        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && nums[stack.peek()] >= nums[i]) {
                stack.pop();
            }
            if (!stack.isEmpty()) {
                prevMin[i] = stack.peek();
            }
            stack.push(i);
        }

        stack.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && nums[stack.peek()] >= nums[i]) {
                stack.pop();
            }
            if (!stack.isEmpty()) {
                nxtMin[i] = stack.peek();
            }
            stack.push(i);
        }

        long res = 0;
        int MOD = 1_000_000_007;
        for (int i = 0; i < n; i++) {
            int l = prevMin[i] + 1, r = nxtMin[i] - 1;
            long totalSum = prefixSum[r + 1] - prefixSum[l];
            res = Math.max(res, nums[i] * totalSum);
        }

        return (int)(res % MOD);
    }
}
```

```cpp
class Solution {
public:
    int maxSumMinProduct(vector<int>& nums) {
        int n = nums.size();
        vector<long long> prefixSum(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        vector<int> prevMin(n, -1), nxtMin(n, n);
        stack<int> stack;

        for (int i = 0; i < n; i++) {
            while (!stack.empty() && nums[stack.top()] >= nums[i]) {
                stack.pop();
            }
            if (!stack.empty()) {
                prevMin[i] = stack.top();
            }
            stack.push(i);
        }

        while (!stack.empty()) stack.pop();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.empty() && nums[stack.top()] >= nums[i]) {
                stack.pop();
            }
            if (!stack.empty()) {
                nxtMin[i] = stack.top();
            }
            stack.push(i);
        }

        long long res = 0;
        int MOD = 1e9 + 7;
        for (int i = 0; i < n; i++) {
            int l = prevMin[i] + 1, r = nxtMin[i] - 1;
            long long totalSum = prefixSum[r + 1] - prefixSum[l];
            res = max(res, nums[i] * totalSum);
        }

        return res % MOD;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSumMinProduct(nums) {
        const n = nums.length;
        const prefixSum = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        const prevMin = new Array(n).fill(-1);
        const nxtMin = new Array(n).fill(n);
        const stack = [];

        for (let i = 0; i < n; i++) {
            while (stack.length && nums[stack[stack.length - 1]] >= nums[i]) {
                stack.pop();
            }
            if (stack.length) {
                prevMin[i] = stack[stack.length - 1];
            }
            stack.push(i);
        }

        stack.length = 0;
        for (let i = n - 1; i >= 0; i--) {
            while (stack.length && nums[stack[stack.length - 1]] >= nums[i]) {
                stack.pop();
            }
            if (stack.length) {
                nxtMin[i] = stack[stack.length - 1];
            }
            stack.push(i);
        }

        let res = 0n;
        const MOD = 10n ** 9n + 7n;
        for (let i = 0; i < n; i++) {
            const l = prevMin[i] + 1;
            const r = nxtMin[i] - 1;
            const totalSum = BigInt(prefixSum[r + 1] - prefixSum[l]);
            const tmp = BigInt(nums[i]) * totalSum;
            if (tmp > res) res = tmp;
        }

        return Number(res % MOD);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 5. Monotonic Stack (Space Optimized) - I

::tabs-start

```python
class Solution:
    def maxSumMinProduct(self, nums: List[int]) -> int:
        n = len(nums)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]

        res = 0
        stack = []

        for i, num in enumerate(nums):
            new_start = i
            while stack and stack[-1][1] > num:
                start, val = stack.pop()
                total = prefix[i] - prefix[start]
                res = max(res, val * total)
                new_start = start
            stack.append((new_start, num))

        while stack:
            start, val = stack.pop()
            total = prefix[n] - prefix[start]
            res = max(res, val * total)

        return res % (10**9 + 7)
```

```java
public class Solution {
    public int maxSumMinProduct(int[] nums) {
        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        long res = 0;
        Stack<int[]> stack = new Stack<>();
        for (int i = 0; i < n; i++) {
            int newStart = i;
            while (!stack.isEmpty() && stack.peek()[1] > nums[i]) {
                int[] top = stack.pop();
                int start = top[0], val = top[1];
                long total = prefix[i] - prefix[start];
                res = Math.max(res, val * total);
                newStart = start;
            }
            stack.push(new int[]{newStart, nums[i]});
        }

        while (!stack.isEmpty()) {
            int[] top = stack.pop();
            int start = top[0], val = top[1];
            long total = prefix[n] - prefix[start];
            res = Math.max(res, val * total);
        }

        return (int) (res % (1_000_000_007));
    }
}
```

```cpp
class Solution {
public:
    int maxSumMinProduct(vector<int>& nums) {
        int n = nums.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        long long res = 0;
        stack<pair<int, int>> stack;
        for (int i = 0; i < n; i++) {
            int newStart = i;
            while (!stack.empty() && stack.top().second > nums[i]) {
                auto [start, val] = stack.top();
                stack.pop();
                long long total = prefix[i] - prefix[start];
                res = max(res, val * total);
                newStart = start;
            }
            stack.push({newStart, nums[i]});
        }

        while (!stack.empty()) {
            auto [start, val] = stack.top();
            stack.pop();
            long long total = prefix[n] - prefix[start];
            res = max(res, val * total);
        }

        return res % 1000000007;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSumMinProduct(nums) {
        const n = nums.length;
        const prefix = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        let res = 0n;
        const MOD = 10n ** 9n + 7n;
        const stack = [];

        for (let i = 0; i < n; i++) {
            let newStart = i;
            while (stack.length && stack[stack.length - 1][1] > nums[i]) {
                const [start, val] = stack.pop();
                const total = BigInt(prefix[i] - prefix[start]);
                const tmp = BigInt(val) * total;
                if (tmp > res) res = tmp;
                newStart = start;
            }
            stack.push([newStart, nums[i]]);
        }

        while (stack.length) {
            const [start, val] = stack.pop();
            const total = BigInt(prefix[n] - prefix[start]);
            const tmp = BigInt(val) * total;
            if (tmp > res) res = tmp;
        }

        return Number(res % MOD);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 6. Monotonic Stack (Space Optimized) - II

::tabs-start

```python
class Solution:
    def maxSumMinProduct(self, nums: List[int]) -> int:
        n = len(nums)
        prefix_sum = [0] * (n + 1)
        for i in range(n):
            prefix_sum[i + 1] = prefix_sum[i] + nums[i]

        res, stack = 0, []
        for i in range(n + 1):
            while stack and (i == n or nums[i] < nums[stack[-1]]):
                j = stack.pop()
                start = 0 if not stack else stack[-1] + 1
                res = max(res, nums[j] * (prefix_sum[i] - prefix_sum[start]))
            stack.append(i)

        return res % (10 ** 9 + 7)
```

```java
public class Solution {
    public int maxSumMinProduct(int[] nums) {
        int n = nums.length;
        long[] prefixSum = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        long res = 0;
        int mod = 1_000_000_007;
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i <= n; i++) {
            while (!stack.isEmpty() && (i == n || nums[i] < nums[stack.peek()])) {
                int j = stack.pop();
                int start = stack.isEmpty() ? 0 : stack.peek() + 1;
                res = Math.max(res, (long) nums[j] * (prefixSum[i] - prefixSum[start]));
            }
            stack.push(i);
        }

        return (int) (res % mod);
    }
}
```

```cpp
class Solution {
public:
    int maxSumMinProduct(vector<int>& nums) {
        int n = nums.size();
        vector<long long> prefixSum(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        long long res = 0;
        const int mod = 1e9 + 7;
        stack<int> st;
        for (int i = 0; i <= n; i++) {
            while (!st.empty() && (i == n || nums[i] < nums[st.top()])) {
                int j = st.top();
                st.pop();
                int start = st.empty() ? 0 : st.top() + 1;
                res = max(res, (long long) nums[j] * (prefixSum[i] - prefixSum[start]));
            }
            st.push(i);
        }

        return res % mod;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSumMinProduct(nums) {
        const n = nums.length;
        const prefixSum = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        let res = 0n;
        const MOD = 10n ** 9n + 7n;
        const stack = [];
        for (let i = 0; i <= n; i++) {
            while (
                stack.length &&
                (i === n || nums[i] < nums[stack[stack.length - 1]])
            ) {
                const j = stack.pop();
                const start =
                    stack.length === 0 ? 0 : stack[stack.length - 1] + 1;
                const total = BigInt(prefixSum[i] - prefixSum[start]);
                const tmp = BigInt(nums[j]) * total;
                if (tmp > res) res = tmp;
            }
            stack.push(i);
        }

        return Number(res % MOD);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
