## 1. Brute Force

::tabs-start

```python
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        res = 0
        for i in range(len(nums)):
            sum = 0
            for j in range(i, len(nums)):
                sum += nums[j]
                if sum == k:
                    res += 1
        return res
```

```java
public class Solution {
    public int subarraySum(int[] nums, int k) {
        int res = 0;
        for (int i = 0; i < nums.length; i++) {
            int sum = 0;
            for (int j = i; j < nums.length; j++) {
                sum += nums[j];
                if (sum == k) res++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int res = 0;
        for (int i = 0; i < nums.size(); i++) {
            int sum = 0;
            for (int j = i; j < nums.size(); j++) {
                sum += nums[j];
                if (sum == k) res++;
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
    subarraySum(nums, k) {
        let res = 0;
        for (let i = 0; i < nums.length; i++) {
            let sum = 0;
            for (let j = i; j < nums.length; j++) {
                sum += nums[j];
                if (sum == k) res++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int SubarraySum(int[] nums, int k) {
        int res = 0;
        for (int i = 0; i < nums.Length; i++) {
            int sum = 0;
            for (int j = i; j < nums.Length; j++) {
                sum += nums[j];
                if (sum == k) {
                    res++;
                }
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

## 2. Hash Map

::tabs-start

```python
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        res = curSum = 0
        prefixSums = { 0 : 1 }

        for num in nums:
            curSum += num
            diff = curSum - k

            res += prefixSums.get(diff, 0)
            prefixSums[curSum] = 1 + prefixSums.get(curSum, 0)

        return res
```

```java
public class Solution {
    public int subarraySum(int[] nums, int k) {
        int res = 0, curSum = 0;
        Map<Integer, Integer> prefixSums = new HashMap<>();
        prefixSums.put(0, 1);

        for (int num : nums) {
            curSum += num;
            int diff = curSum - k;
            res += prefixSums.getOrDefault(diff, 0);
            prefixSums.put(curSum, prefixSums.getOrDefault(curSum, 0) + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int res = 0, curSum = 0;
        unordered_map<int, int> prefixSums;
        prefixSums[0] = 1;

        for (int num : nums) {
            curSum += num;
            int diff = curSum - k;
            res += prefixSums[diff];
            prefixSums[curSum]++;
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
    subarraySum(nums, k) {
        let res = 0,
            curSum = 0;
        const prefixSums = new Map();
        prefixSums.set(0, 1);

        for (let num of nums) {
            curSum += num;
            let diff = curSum - k;
            res += prefixSums.get(diff) || 0;
            prefixSums.set(curSum, (prefixSums.get(curSum) || 0) + 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int SubarraySum(int[] nums, int k) {
        int res = 0, curSum = 0;
        Dictionary<int, int> prefixSums = new Dictionary<int, int>();
        prefixSums[0] = 1;

        foreach (int num in nums) {
            curSum += num;
            int diff = curSum - k;

            if (prefixSums.ContainsKey(diff)) {
                res += prefixSums[diff];
            }

            if (!prefixSums.ContainsKey(curSum)) {
                prefixSums[curSum] = 0;
            }
            prefixSums[curSum]++;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
