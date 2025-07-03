## 1. Recursion

::tabs-start

```python
class Solution:
    def splitArray(self, nums: List[int], k: int) -> int:
        n = len(nums)

        def dfs(i, m):
            if i == n:
                return 0 if m == 0 else float("inf")
            if m == 0:
                return float("inf")

            res = float("inf")
            curSum = 0
            for j in range(i, n - m + 1):
                curSum += nums[j]
                res = min(res, max(curSum, dfs(j + 1, m - 1)))

            return res

        return dfs(0, k)
```

```java
public class Solution {
    public int splitArray(int[] nums, int k) {
        int n = nums.length;

        return dfs(nums, 0, k, n);
    }

    private int dfs(int[] nums, int i, int m, int n) {
        if (i == n) {
            return m == 0 ? 0 : Integer.MAX_VALUE;
        }
        if (m == 0) {
            return Integer.MAX_VALUE;
        }

        int res = Integer.MAX_VALUE;
        int curSum = 0;
        for (int j = i; j <= n - m; j++) {
            curSum += nums[j];
            res = Math.min(res, Math.max(curSum, dfs(nums, j + 1, m - 1, n)));
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int splitArray(vector<int>& nums, int k) {
        int n = nums.size();
        return dfs(nums, 0, k, n);
    }

private:
    int dfs(vector<int>& nums, int i, int m, int n) {
        if (i == n) {
            return m == 0 ? 0 : INT_MAX;
        }
        if (m == 0) {
            return INT_MAX;
        }

        int res = INT_MAX, curSum = 0;
        for (int j = i; j <= n - m; j++) {
            curSum += nums[j];
            res = min(res, max(curSum, dfs(nums, j + 1, m - 1, n)));
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
    splitArray(nums, k) {
        const n = nums.length;

        const dfs = (i, m) => {
            if (i === n) {
                return m === 0 ? 0 : Infinity;
            }
            if (m === 0) {
                return Infinity;
            }

            let res = Infinity;
            let curSum = 0;
            for (let j = i; j <= n - m; j++) {
                curSum += nums[j];
                res = Math.min(res, Math.max(curSum, dfs(j + 1, m - 1)));
            }

            return res;
        };

        return dfs(0, k);
    }
}
```

```csharp
public class Solution {
    public int SplitArray(int[] nums, int k) {
        int n = nums.Length;
        return Dfs(nums, 0, k, n);
    }

    private int Dfs(int[] nums, int i, int m, int n) {
        if (i == n) {
            return m == 0 ? 0 : int.MaxValue;
        }
        if (m == 0) {
            return int.MaxValue;
        }

        int res = int.MaxValue;
        int curSum = 0;
        for (int j = i; j <= n - m; j++) {
            curSum += nums[j];
            int next = Dfs(nums, j + 1, m - 1, n);
            if (next != int.MaxValue) {
                res = Math.Min(res, Math.Max(curSum, next));
            }
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

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def splitArray(self, nums: List[int], k: int) -> int:
        n = len(nums)
        dp = [[-1] * (k + 1) for _ in range(n)]

        def dfs(i, m):
            if i == n:
                return 0 if m == 0 else float("inf")
            if m == 0:
                return float("inf")
            if dp[i][m] != -1:
                return dp[i][m]

            res = float("inf")
            curSum = 0
            for j in range(i, n - m + 1):
                curSum += nums[j]
                res = min(res, max(curSum, dfs(j + 1, m - 1)))

            dp[i][m] = res
            return res

        return dfs(0, k)
```

```java
public class Solution {
    private int[][] dp;

    public int splitArray(int[] nums, int k) {
        int n = nums.length;
        dp = new int[n][k + 1];
        for (int[] it : dp) {
            Arrays.fill(it, -1);
        }
        return dfs(nums, 0, k, n);
    }

    private int dfs(int[] nums, int i, int m, int n) {
        if (i == n) {
            return m == 0 ? 0 : Integer.MAX_VALUE;
        }
        if (m == 0) {
            return Integer.MAX_VALUE;
        }
        if (dp[i][m] != -1) {
            return dp[i][m];
        }

        int res = Integer.MAX_VALUE;
        int curSum = 0;
        for (int j = i; j <= n - m; j++) {
            curSum += nums[j];
            res = Math.min(res, Math.max(curSum, dfs(nums, j + 1, m - 1, n)));
        }

        return dp[i][m] = res;
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;

public:
    int splitArray(vector<int>& nums, int k) {
        int n = nums.size();
        dp.assign(n, vector<int>(k + 1, -1));
        return dfs(nums, 0, k, n);
    }

private:
    int dfs(vector<int>& nums, int i, int m, int n) {
        if (i == n) {
            return m == 0 ? 0 : INT_MAX;
        }
        if (m == 0) {
            return INT_MAX;
        }
        if (dp[i][m] != -1) {
            return dp[i][m];
        }

        int res = INT_MAX, curSum = 0;
        for (int j = i; j <= n - m; j++) {
            curSum += nums[j];
            res = min(res, max(curSum, dfs(nums, j + 1, m - 1, n)));
        }

        return dp[i][m] = res;
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
    splitArray(nums, k) {
        const n = nums.length;
        const dp = Array.from({ length: n }, () => Array(k + 1).fill(-1));

        const dfs = (i, m) => {
            if (i === n) {
                return m === 0 ? 0 : Infinity;
            }
            if (m === 0) {
                return Infinity;
            }
            if (dp[i][m] !== -1) {
                return dp[i][m];
            }

            let res = Infinity;
            let curSum = 0;
            for (let j = i; j <= n - m; j++) {
                curSum += nums[j];
                res = Math.min(res, Math.max(curSum, dfs(j + 1, m - 1)));
            }

            return (dp[i][m] = res);
        };

        return dfs(0, k);
    }
}
```

```csharp
public class Solution {
    private int[,] dp;

    public int SplitArray(int[] nums, int k) {
        int n = nums.Length;
        dp = new int[n, k + 1];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= k; j++) {
                dp[i, j] = -1;
            }
        }

        return Dfs(nums, 0, k, n);
    }

    private int Dfs(int[] nums, int i, int m, int n) {
        if (i == n) {
            return m == 0 ? 0 : int.MaxValue;
        }
        if (m == 0) {
            return int.MaxValue;
        }
        if (dp[i, m] != -1) {
            return dp[i, m];
        }

        int res = int.MaxValue;
        int curSum = 0;
        for (int j = i; j <= n - m; j++) {
            curSum += nums[j];
            int next = Dfs(nums, j + 1, m - 1, n);
            if (next != int.MaxValue) {
                res = Math.Min(res, Math.Max(curSum, next));
            }
        }

        dp[i, m] = res;
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * n ^ 2)$
- Space complexity: $O(k * n)$

> Where $n$ is the size of the array $nums$ and $k$ is the number of sub-arrays to form.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def splitArray(self, nums: List[int], k: int) -> int:
        n = len(nums)
        dp = [[float("inf")] * (k + 1) for _ in range(n + 1)]
        dp[n][0] = 0

        for m in range(1, k + 1):
            for i in range(n - 1, -1, -1):
                curSum = 0
                for j in range(i, n - m + 1):
                    curSum += nums[j]
                    dp[i][m] = min(dp[i][m], max(curSum, dp[j + 1][m - 1]))

        return dp[0][k]
```

```java
public class Solution {
    public int splitArray(int[] nums, int k) {
        int n = nums.length;
        int[][] dp = new int[n + 1][k + 1];
        for (int[] it : dp) {
            Arrays.fill(it, Integer.MAX_VALUE);
        }
        dp[n][0] = 0;

        for (int m = 1; m <= k; m++) {
            for (int i = n - 1; i >= 0; i--) {
                int curSum = 0;
                for (int j = i; j < n - m + 1; j++) {
                    curSum += nums[j];
                    dp[i][m] = Math.min(dp[i][m], Math.max(curSum, dp[j + 1][m - 1]));
                }
            }
        }

        return dp[0][k];
    }
}
```

```cpp
class Solution {
public:
    int splitArray(vector<int>& nums, int k) {
        int n = nums.size();
        vector<vector<int>> dp(n + 1, vector<int>(k + 1, INT_MAX));
        dp[n][0] = 0;

        for (int m = 1; m <= k; m++) {
            for (int i = n - 1; i >= 0; i--) {
                int curSum = 0;
                for (int j = i; j < n - m + 1; j++) {
                    curSum += nums[j];
                    dp[i][m] = min(dp[i][m], max(curSum, dp[j + 1][m - 1]));
                }
            }
        }

        return dp[0][k];
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
    splitArray(nums, k) {
        const n = nums.length;
        const dp = Array.from({ length: n + 1 }, () =>
            Array(k + 1).fill(Infinity),
        );
        dp[n][0] = 0;

        for (let m = 1; m <= k; m++) {
            for (let i = n - 1; i >= 0; i--) {
                let curSum = 0;
                for (let j = i; j < n - m + 1; j++) {
                    curSum += nums[j];
                    dp[i][m] = Math.min(
                        dp[i][m],
                        Math.max(curSum, dp[j + 1][m - 1]),
                    );
                }
            }
        }

        return dp[0][k];
    }
}
```

```csharp
public class Solution {
    public int SplitArray(int[] nums, int k) {
        int n = nums.Length;
        int[,] dp = new int[n + 1, k + 1];

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= k; j++) {
                dp[i, j] = int.MaxValue;
            }
        }

        dp[n, 0] = 0;

        for (int m = 1; m <= k; m++) {
            for (int i = n - 1; i >= 0; i--) {
                int curSum = 0;
                for (int j = i; j < n - m + 1; j++) {
                    curSum += nums[j];
                    if (dp[j + 1, m - 1] != int.MaxValue) {
                        dp[i, m] = Math.Min(dp[i, m], Math.Max(curSum, dp[j + 1, m - 1]));
                    }
                }
            }
        }

        return dp[0, k];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * n ^ 2)$
- Space complexity: $O(k * n)$

> Where $n$ is the size of the array $nums$ and $k$ is the number of sub-arrays to form.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def splitArray(self, nums: List[int], k: int) -> int:
        n = len(nums)
        dp = [float("inf")] * (n + 1)
        dp[n] = 0

        for m in range(1, k + 1):
            nextDp = [float("inf")] * (n + 1)
            for i in range(n - 1, -1, -1):
                curSum = 0
                for j in range(i, n - m + 1):
                    curSum += nums[j]
                    nextDp[i] = min(nextDp[i], max(curSum, dp[j + 1]))
            dp = nextDp

        return dp[0]
```

```java
public class Solution {
    public int splitArray(int[] nums, int k) {
        int n = nums.length;
        int[] dp = new int[n + 1];
        int[] nextDp = new int[n + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[n] = 0;

        for (int m = 1; m <= k; m++) {
            Arrays.fill(nextDp, Integer.MAX_VALUE);
            for (int i = n - 1; i >= 0; i--) {
                int curSum = 0;
                for (int j = i; j < n - m + 1; j++) {
                    curSum += nums[j];
                    nextDp[i] = Math.min(nextDp[i], Math.max(curSum, dp[j + 1]));
                }
            }
            int[] temp = dp;
            dp = nextDp;
            nextDp = temp;
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int splitArray(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> dp(n + 1, INT_MAX), nextDp(n + 1, INT_MAX);
        dp[n] = 0;

        for (int m = 1; m <= k; m++) {
            fill(nextDp.begin(), nextDp.end(), INT_MAX);
            for (int i = n - 1; i >= 0; i--) {
                int curSum = 0;
                for (int j = i; j < n - m + 1; j++) {
                    curSum += nums[j];
                    nextDp[i] = min(nextDp[i], max(curSum, dp[j + 1]));
                }
            }
            dp.swap(nextDp);
        }

        return dp[0];
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
    splitArray(nums, k) {
        const n = nums.length;
        let dp = new Array(n + 1).fill(Infinity);
        let nextDp = new Array(n + 1).fill(Infinity);
        dp[n] = 0;

        for (let m = 1; m <= k; m++) {
            nextDp.fill(Infinity);
            for (let i = n - 1; i >= 0; i--) {
                let curSum = 0;
                for (let j = i; j < n - m + 1; j++) {
                    curSum += nums[j];
                    nextDp[i] = Math.min(
                        nextDp[i],
                        Math.max(curSum, dp[j + 1]),
                    );
                }
            }
            [dp, nextDp] = [nextDp, dp];
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int SplitArray(int[] nums, int k) {
        int n = nums.Length;
        int[] dp = new int[n + 1];
        int[] nextDp = new int[n + 1];
        Array.Fill(dp, int.MaxValue);
        dp[n] = 0;

        for (int m = 1; m <= k; m++) {
            Array.Fill(nextDp, int.MaxValue);
            for (int i = n - 1; i >= 0; i--) {
                int curSum = 0;
                for (int j = i; j < n - m + 1; j++) {
                    curSum += nums[j];
                    if (dp[j + 1] != int.MaxValue) {
                        nextDp[i] = Math.Min(nextDp[i], Math.Max(curSum, dp[j + 1]));
                    }
                }
            }
            var temp = dp;
            dp = nextDp;
            nextDp = temp;
        }

        return dp[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * n ^ 2)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums$ and $k$ is the number of sub-arrays to form.

---

## 5. Binary Search

::tabs-start

```python
class Solution:
    def splitArray(self, nums: List[int], k: int) -> int:
        def canSplit(largest):
            subarray = 1
            curSum = 0
            for num in nums:
                curSum += num
                if curSum > largest:
                    subarray += 1
                    if subarray > k:
                        return False
                    curSum = num
            return True

        l, r = max(nums), sum(nums)
        res = r
        while l <= r:
            mid = l + (r - l) // 2
            if canSplit(mid):
                res = mid
                r = mid - 1
            else:
                l = mid + 1
        return res
```

```java
public class Solution {
    public int splitArray(int[] nums, int k) {
        int l = 0, r = 0, res = 0;
        for (int num : nums) {
            l = Math.max(l, num);
            r += num;
        }
        res = r;

        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (canSplit(nums, k, mid)) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return res;
    }

    private boolean canSplit(int[] nums, int k, int largest) {
        int subarray = 1, curSum = 0;
        for (int num : nums) {
            curSum += num;
            if (curSum > largest) {
                subarray++;
                if (subarray > k) return false;
                curSum = num;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    int splitArray(vector<int>& nums, int k) {
        int l = *max_element(nums.begin(), nums.end());
        int r = accumulate(nums.begin(), nums.end(), 0);
        int res = r;

        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (canSplit(nums, k, mid)) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return res;
    }

private:
    bool canSplit(vector<int>& nums, int k, int largest) {
        int subarray = 1, curSum = 0;
        for (int num : nums) {
            curSum += num;
            if (curSum > largest) {
                subarray++;
                if (subarray > k) return 0;
                curSum = num;
            }
        }
        return true;
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
    splitArray(nums, k) {
        const canSplit = (largest) => {
            let subarray = 1,
                curSum = 0;
            for (const num of nums) {
                curSum += num;
                if (curSum > largest) {
                    subarray++;
                    if (subarray > k) return false;
                    curSum = num;
                }
            }
            return true;
        };

        let l = Math.max(...nums);
        let r = nums.reduce((a, b) => a + b, 0);
        let res = r;

        while (l <= r) {
            const mid = Math.floor(l + (r - l) / 2);
            if (canSplit(mid)) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int SplitArray(int[] nums, int k) {
        int l = 0, r = 0, res = 0;
        foreach (int num in nums) {
            l = Math.Max(l, num);
            r += num;
        }
        res = r;

        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (CanSplit(nums, k, mid)) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return res;
    }

    private bool CanSplit(int[] nums, int k, int largest) {
        int subarray = 1, curSum = 0;
        foreach (int num in nums) {
            curSum += num;
            if (curSum > largest) {
                subarray++;
                if (subarray > k) return false;
                curSum = num;
            }
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log s)$
- Space complexity: $O(1)$

> Where $n$ is the size of the array $nums$ and $s$ is the sum of all the elements in the array.

---

## 6. Binary Search + Prefix Sum

::tabs-start

```python
class Solution:
    def splitArray(self, nums: List[int], k: int) -> int:
        n = len(nums)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]

        def canSplit(largest):
            subarrays = 0
            i = 0
            while i < n:
                l, r = i + 1, n
                while l <= r:
                    mid = l + (r - l) // 2
                    if prefix[mid] - prefix[i] <= largest:
                        l = mid + 1
                    else:
                        r = mid - 1
                subarrays += 1
                i = r
                if subarrays > k:
                    return False
            return True

        l, r = max(nums), sum(nums)
        res = r
        while l <= r:
            mid = l + (r - l) // 2
            if canSplit(mid):
                res = mid
                r = mid - 1
            else:
                l = mid + 1

        return res
```

```java
public class Solution {
    private int[] prefix;
    private int n;

    public int splitArray(int[] nums, int k) {
        n = nums.length;
        prefix = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        int l = Integer.MIN_VALUE, r = 0;
        for (int num : nums) {
            l = Math.max(l, num);
            r += num;
        }

        int res = r;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (canSplit(mid, k)) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return res;
    }

    private boolean canSplit(int largest, int k) {
        int subarrays = 0, i = 0;
        while (i < n) {
            int l = i + 1, r = n;
            while (l <= r) {
                int mid = l + (r - l) / 2;
                if (prefix[mid] - prefix[i] <= largest) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
            subarrays++;
            i = r;
            if (subarrays > k) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
private:
    vector<int> prefix;
    int n;

public:
    int splitArray(vector<int>& nums, int k) {
        n = nums.size();
        prefix.resize(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        int l = *max_element(nums.begin(), nums.end());
        int r = accumulate(nums.begin(), nums.end(), 0);
        int res = r;

        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (canSplit(mid, k)) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }

        return res;
    }

private:
    bool canSplit(int largest, int k) {
        int subarrays = 0, i = 0;
        while (i < n) {
            int l = i + 1, r = n;
            while (l <= r) {
                int mid = l + (r - l) / 2;
                if (prefix[mid] - prefix[i] <= largest) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
            subarrays++;
            i = r;
            if (subarrays > k) {
                return false;
            }
        }
        return true;
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
    splitArray(nums, k) {
        const n = nums.length;
        const prefix = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        const canSplit = (largest) => {
            let subarrays = 0,
                i = 0;
            while (i < n) {
                let l = i + 1,
                    r = n;
                while (l <= r) {
                    const mid = Math.floor(l + (r - l) / 2);
                    if (prefix[mid] - prefix[i] <= largest) {
                        l = mid + 1;
                    } else {
                        r = mid - 1;
                    }
                }
                subarrays++;
                i = r;
                if (subarrays > k) {
                    return false;
                }
            }
            return true;
        };

        let l = Math.max(...nums);
        let r = nums.reduce((a, b) => a + b, 0),
            res = r;
        while (l <= r) {
            const mid = Math.floor(l + (r - l) / 2);
            if (canSplit(mid)) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private int[] prefix;
    private int n;

    public int SplitArray(int[] nums, int k) {
        n = nums.Length;
        prefix = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        int l = int.MinValue, r = 0;
        foreach (int num in nums) {
            l = Math.Max(l, num);
            r += num;
        }

        int res = r;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (CanSplit(mid, k)) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return res;
    }

    private bool CanSplit(int largest, int k) {
        int subarrays = 0, i = 0;
        while (i < n) {
            int l = i + 1, r = n;
            while (l <= r) {
                int mid = l + (r - l) / 2;
                if (prefix[mid] - prefix[i] <= largest) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
            subarrays++;
            i = r;
            if (subarrays > k) {
                return false;
            }
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + (k * \log n * \log s))$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums$, $s$ is the sum of all the elements in the array, and $k$ is the number of sub-arrays to form.
