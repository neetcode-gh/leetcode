## 1. Binary Search

::tabs-start

```python
class Solution:
    def minimizeArrayValue(self, nums: List[int]) -> int:
        def isValid(maxVal):
            prefix_sum = 0
            for i in range(len(nums)):
                prefix_sum += nums[i]
                if prefix_sum > maxVal * (i + 1):
                    return False
            return True

        left, right = 0, max(nums)
        while left < right:
            mid = left + (right - left) // 2
            if isValid(mid):
                right = mid
            else:
                left = mid + 1

        return left
```

```java
public class Solution {
    public int minimizeArrayValue(int[] nums) {
        int left = 0, right = 0;
        for (int num : nums) {
            right = Math.max(right, num);
        }

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (isValid(nums, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return left;
    }

    private boolean isValid(int[] nums, int maxVal) {
        long prefixSum = 0;
        for (int i = 0; i < nums.length; i++) {
            prefixSum += nums[i];
            if (prefixSum > (long) maxVal * (i + 1)) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    int minimizeArrayValue(vector<int>& nums) {
        int left = 0, right = *max_element(nums.begin(), nums.end());

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (isValid(nums, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return left;
    }

private:
    bool isValid(vector<int>& nums, int maxVal) {
        long long prefixSum = 0;
        for (int i = 0; i < nums.size(); i++) {
            prefixSum += nums[i];
            if (prefixSum > (long long)maxVal * (i + 1)) {
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
     * @return {number}
     */
    minimizeArrayValue(nums) {
        const isValid = (maxVal) => {
            let prefixSum = 0;
            for (let i = 0; i < nums.length; i++) {
                prefixSum += nums[i];
                if (prefixSum > maxVal * (i + 1)) {
                    return false;
                }
            }
            return true;
        };

        let left = 0,
            right = Math.max(...nums);
        while (left < right) {
            let mid = left + Math.floor((right - left) / 2);
            if (isValid(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return left;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log m)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the size of the array $nums$ and $m$ is the maximum value in the array.

---

## 2. Prefix Sum + Greedy

::tabs-start

```python
class Solution:
    def minimizeArrayValue(self, nums: List[int]) -> int:
        res = total = nums[0]

        for i in range(1, len(nums)):
            total += nums[i]
            res = max(res, math.ceil(total / (i + 1)))

        return res
```

```java
public class Solution {
    public int minimizeArrayValue(int[] nums) {
        int res = nums[0];
        long total = nums[0];

        for (int i = 1; i < nums.length; i++) {
            total += nums[i];
            res = Math.max(res, (int) Math.ceil((double) total / (i + 1)));
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minimizeArrayValue(vector<int>& nums) {
        int res = nums[0];
        long long total = nums[0];

        for (int i = 1; i < nums.size(); i++) {
            total += nums[i];
            res = max(res, (int)ceil((double)total / (i + 1)));
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
    minimizeArrayValue(nums) {
        let res = nums[0];
        let total = nums[0];

        for (let i = 1; i < nums.length; i++) {
            total += nums[i];
            res = Math.max(res, Math.ceil(total / (i + 1)));
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
