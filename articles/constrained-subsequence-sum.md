## 1. Dynamic Programming (Top-Down)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Bottom-Up)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming + Segment Tree

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Max-Heap

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 5. Monotonic Deque

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(k)$
