## 1. Brute Force (Recursion)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Bottom-Up)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming + Segment Tree (Coordinate Compression)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming + Segment Tree

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log m)$
- Space complexity: $O(m)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum element in the array.
