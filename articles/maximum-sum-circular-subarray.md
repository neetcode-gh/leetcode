## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        n = len(nums)
        res = nums[0]

        for i in range(n):
            cur_sum = 0
            for j in range(i, i + n):
                cur_sum += nums[j % n]
                res = max(res, cur_sum)

        return res
```

```java
public class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int n = nums.length;
        int res = nums[0];

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < i + n; j++) {
                curSum += nums[j % n];
                res = Math.max(res, curSum);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int n = nums.size();
        int res = nums[0];

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < i + n; j++) {
                curSum += nums[j % n];
                res = max(res, curSum);
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
    maxSubarraySumCircular(nums) {
        const n = nums.length;
        let res = nums[0];

        for (let i = 0; i < n; i++) {
            let curSum = 0;
            for (let j = i; j < i + n; j++) {
                curSum += nums[j % n];
                res = Math.max(res, curSum);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxSubarraySumCircular(int[] nums) {
        int n = nums.Length;
        int res = nums[0];

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < i + n; j++) {
                curSum += nums[j % n];
                res = Math.Max(res, curSum);
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

## 2. Prefix & Suffix Sums

::tabs-start

```python
class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        n = len(nums)
        right_max = [0] * n
        right_max[-1] = nums[-1]
        suffix_sum = nums[-1]

        for i in range(n - 2, -1, -1):
            suffix_sum += nums[i]
            right_max[i] = max(right_max[i + 1], suffix_sum)

        max_sum = nums[0]
        cur_max = 0
        prefix_sum = 0

        for i in range(n):
            cur_max = max(cur_max, 0) + nums[i]
            max_sum = max(max_sum, cur_max)
            prefix_sum += nums[i]
            if i + 1 < n:
                max_sum = max(max_sum, prefix_sum + right_max[i + 1])

        return max_sum
```

```java
public class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int n = nums.length;
        int[] rightMax = new int[n];
        rightMax[n - 1] = nums[n - 1];
        int suffixSum = nums[n - 1];

        for (int i = n - 2; i >= 0; i--) {
            suffixSum += nums[i];
            rightMax[i] = Math.max(rightMax[i + 1], suffixSum);
        }

        int maxSum = nums[0];
        int curMax = 0;
        int prefixSum = 0;

        for (int i = 0; i < n; i++) {
            curMax = Math.max(curMax, 0) + nums[i];
            maxSum = Math.max(maxSum, curMax);
            prefixSum += nums[i];
            if (i + 1 < n) {
                maxSum = Math.max(maxSum, prefixSum + rightMax[i + 1]);
            }
        }

        return maxSum;
    }
}
```

```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int n = nums.size();
        vector<int> rightMax(n);
        rightMax[n - 1] = nums[n - 1];
        int suffixSum = nums[n - 1];

        for (int i = n - 2; i >= 0; --i) {
            suffixSum += nums[i];
            rightMax[i] = max(rightMax[i + 1], suffixSum);
        }

        int maxSum = nums[0];
        int curMax = 0;
        int prefixSum = 0;

        for (int i = 0; i < n; ++i) {
            curMax = max(curMax, 0) + nums[i];
            maxSum = max(maxSum, curMax);
            prefixSum += nums[i];
            if (i + 1 < n) {
                maxSum = max(maxSum, prefixSum + rightMax[i + 1]);
            }
        }

        return maxSum;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubarraySumCircular(nums) {
        const n = nums.length;
        const rightMax = new Array(n).fill(0);
        rightMax[n - 1] = nums[n - 1];
        let suffixSum = nums[n - 1];

        for (let i = n - 2; i >= 0; i--) {
            suffixSum += nums[i];
            rightMax[i] = Math.max(rightMax[i + 1], suffixSum);
        }

        let maxSum = nums[0];
        let curMax = 0;
        let prefixSum = 0;

        for (let i = 0; i < n; i++) {
            curMax = Math.max(curMax, 0) + nums[i];
            maxSum = Math.max(maxSum, curMax);
            prefixSum += nums[i];
            if (i + 1 < n) {
                maxSum = Math.max(maxSum, prefixSum + rightMax[i + 1]);
            }
        }

        return maxSum;
    }
}
```

```csharp
public class Solution {
    public int MaxSubarraySumCircular(int[] nums) {
        int n = nums.Length;
        int[] rightMax = new int[n];
        rightMax[n - 1] = nums[n - 1];
        int suffixSum = nums[n - 1];

        for (int i = n - 2; i >= 0; i--) {
            suffixSum += nums[i];
            rightMax[i] = Math.Max(rightMax[i + 1], suffixSum);
        }

        int maxSum = nums[0];
        int curMax = 0;
        int prefixSum = 0;

        for (int i = 0; i < n; i++) {
            curMax = Math.Max(curMax, 0) + nums[i];
            maxSum = Math.Max(maxSum, curMax);
            prefixSum += nums[i];
            if (i + 1 < n) {
                maxSum = Math.Max(maxSum, prefixSum + rightMax[i + 1]);
            }
        }

        return maxSum;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Kadane's Algorithm

::tabs-start

```python
class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        globMax, globMin = nums[0], nums[0]
        curMax, curMin = 0, 0
        total = 0

        for num in nums:
            curMax = max(curMax + num, num)
            curMin = min(curMin + num, num)
            total += num
            globMax = max(globMax, curMax)
            globMin = min(globMin, curMin)

        return max(globMax, total - globMin) if globMax > 0 else globMax
```

```java
public class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int globMax = nums[0], globMin = nums[0];
        int curMax = 0, curMin = 0, total = 0;

        for (int num : nums) {
            curMax = Math.max(curMax + num, num);
            curMin = Math.min(curMin + num, num);
            total += num;
            globMax = Math.max(globMax, curMax);
            globMin = Math.min(globMin, curMin);
        }

        return globMax > 0 ? Math.max(globMax, total - globMin) : globMax;
    }
}
```

```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int globMax = nums[0], globMin = nums[0];
        int curMax = 0, curMin = 0, total = 0;

        for (int& num : nums) {
            curMax = max(curMax + num, num);
            curMin = min(curMin + num, num);
            total += num;
            globMax = max(globMax, curMax);
            globMin = min(globMin, curMin);
        }

        return globMax > 0 ? max(globMax, total - globMin) : globMax;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubarraySumCircular(nums) {
        let globMax = nums[0],
            globMin = nums[0];
        let curMax = 0,
            curMin = 0,
            total = 0;

        for (const num of nums) {
            curMax = Math.max(curMax + num, num);
            curMin = Math.min(curMin + num, num);
            total += num;
            globMax = Math.max(globMax, curMax);
            globMin = Math.min(globMin, curMin);
        }

        return globMax > 0 ? Math.max(globMax, total - globMin) : globMax;
    }
}
```

```csharp
public class Solution {
    public int MaxSubarraySumCircular(int[] nums) {
        int globMax = nums[0], globMin = nums[0];
        int curMax = 0, curMin = 0, total = 0;

        foreach (int num in nums) {
            curMax = Math.Max(curMax + num, num);
            globMax = Math.Max(globMax, curMax);

            curMin = Math.Min(curMin + num, num);
            globMin = Math.Min(globMin, curMin);

            total += num;
        }

        return globMax > 0 ? Math.Max(globMax, total - globMin) : globMax;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
