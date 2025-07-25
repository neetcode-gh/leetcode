## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxAscendingSum(self, nums: List[int]) -> int:
        res = 0
        for i in range(len(nums)):
            curSum = nums[i]
            for j in range(i + 1, len(nums)):
                if nums[j] <= nums[j - 1]:
                    break
                curSum += nums[j]
            res = max(res, curSum)
        return res
```

```java
public class Solution {
    public int maxAscendingSum(int[] nums) {
        int res = 0;
        for (int i = 0; i < nums.length; i++) {
            int curSum = nums[i];
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[j] <= nums[j - 1]) {
                    break;
                }
                curSum += nums[j];
            }
            res = Math.max(res, curSum);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxAscendingSum(vector<int>& nums) {
        int res = 0;
        for (int i = 0; i < nums.size(); i++) {
            int curSum = nums[i];
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[j] <= nums[j - 1]) {
                    break;
                }
                curSum += nums[j];
            }
            res = max(res, curSum);
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
    maxAscendingSum(nums) {
        let res = 0;
        for (let i = 0; i < nums.length; i++) {
            let curSum = nums[i];
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[j] <= nums[j - 1]) {
                    break;
                }
                curSum += nums[j];
            }
            res = Math.max(res, curSum);
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

## 2. Iteration

::tabs-start

```python
class Solution:
    def maxAscendingSum(self, nums: List[int]) -> int:
        res = curSum= nums[0]

        for i in range(1, len(nums)):
            if nums[i] <= nums[i - 1]:
                curSum = 0

            curSum += nums[i]
            res = max(res, curSum)

        return res
```

```java
public class Solution {
    public int maxAscendingSum(int[] nums) {
        int res = nums[0], curSum = nums[0];

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] <= nums[i - 1]) {
                curSum = 0;
            }
            curSum += nums[i];
            res = Math.max(res, curSum);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxAscendingSum(vector<int>& nums) {
        int res = nums[0], curSum = nums[0];

        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] <= nums[i - 1]) {
                curSum = 0;
            }
            curSum += nums[i];
            res = max(res, curSum);
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
    maxAscendingSum(nums) {
        let res = nums[0],
            curSum = nums[0];

        for (let i = 1; i < nums.length; i++) {
            if (nums[i] <= nums[i - 1]) {
                curSum = 0;
            }
            curSum += nums[i];
            res = Math.max(res, curSum);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
