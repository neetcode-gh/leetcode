## 1. Brute Force

::tabs-start

```python
class Solution:
    def waysToSplitArray(self, nums: List[int]) -> int:
        n = len(nums)
        res = 0

        for i in range(n - 1):
            leftSum = 0
            for j in range(i + 1):
                leftSum += nums[j]

            rightSum = 0
            for j in range(i + 1, n):
                rightSum += nums[j]

            res += (1 if leftSum >= rightSum else 0)

        return res
```

```java
public class Solution {
    public int waysToSplitArray(int[] nums) {
        int n = nums.length;
        int res = 0;

        for (int i = 0; i < n - 1; i++) {
            long leftSum = 0;
            for (int j = 0; j <= i; j++) {
                leftSum += nums[j];
            }

            long rightSum = 0;
            for (int j = i + 1; j < n; j++) {
                rightSum += nums[j];
            }

            if (leftSum >= rightSum) {
                res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int waysToSplitArray(vector<int>& nums) {
        int n = nums.size();
        int res = 0;

        for (int i = 0; i < n - 1; i++) {
            long long leftSum = 0;
            for (int j = 0; j <= i; j++) {
                leftSum += nums[j];
            }

            long long rightSum = 0;
            for (int j = i + 1; j < n; j++) {
                rightSum += nums[j];
            }

            if (leftSum >= rightSum) {
                res++;
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
    waysToSplitArray(nums) {
        let n = nums.length;
        let res = 0;

        for (let i = 0; i < n - 1; i++) {
            let leftSum = 0;
            for (let j = 0; j <= i; j++) {
                leftSum += nums[j];
            }

            let rightSum = 0;
            for (let j = i + 1; j < n; j++) {
                rightSum += nums[j];
            }

            if (leftSum >= rightSum) {
                res++;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Prefix Sum

::tabs-start

```python
class Solution:
    def waysToSplitArray(self, nums: List[int]) -> int:
        n = len(nums)
        prefix = [0] * (n + 1)

        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]

        res = 0
        for i in range(1, n):
            left = prefix[i]
            right = prefix[n] - prefix[i]
            if left >= right:
                res += 1

        return res
```

```java
public class Solution {
    public int waysToSplitArray(int[] nums) {
        int n = nums.length;
        long[] prefix = new long[n + 1];

        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        int res = 0;
        for (int i = 1; i < n; i++) {
            long left = prefix[i];
            long right = prefix[n] - prefix[i];
            if (left >= right) {
                res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int waysToSplitArray(vector<int>& nums) {
        int n = nums.size();
        vector<long long> prefix(n + 1, 0);

        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        int res = 0;
        for (int i = 1; i < n; i++) {
            long long left = prefix[i];
            long long right = prefix[n] - prefix[i];
            if (left >= right) {
                res++;
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
    waysToSplitArray(nums) {
        const n = nums.length;
        const prefix = Array(n + 1).fill(0);

        for (let i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        let res = 0;
        for (let i = 1; i < n; i++) {
            const left = prefix[i];
            const right = prefix[n] - prefix[i];
            if (left >= right) {
                res++;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Prefix Sum (Optimal)

::tabs-start

```python
class Solution:
    def waysToSplitArray(self, nums: List[int]) -> int:
        right = sum(nums)
        left = res = 0

        for i in range(len(nums) - 1):
            left += nums[i]
            right -= nums[i]
            res += 1 if left >= right else 0

        return res
```

```java
public class Solution {
    public int waysToSplitArray(int[] nums) {
        long right = 0, left = 0;
        for (int num : nums) {
            right += num;
        }

        int res = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            left += nums[i];
            right -= nums[i];
            if (left >= right) {
                res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int waysToSplitArray(vector<int>& nums) {
        long long right = 0, left = 0;
        for (int num : nums) {
            right += num;
        }

        int res = 0;
        for (int i = 0; i < nums.size() - 1; i++) {
            left += nums[i];
            right -= nums[i];
            if (left >= right) {
                res++;
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
    waysToSplitArray(nums) {
        let right = nums.reduce((a, b) => a + b, 0);
        let left = 0,
            res = 0;

        for (let i = 0; i < nums.length - 1; i++) {
            left += nums[i];
            right -= nums[i];
            if (left >= right) {
                res++;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
