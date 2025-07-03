## 1. Brute Force

::tabs-start

```python
class Solution:
    def minSubarray(self, nums: List[int], p: int) -> int:
        n = len(nums)
        totSum = sum(nums)

        if totSum % p == 0:
            return 0

        for l in range(1, n):
            curSum = 0
            for i in range(n):
                curSum += nums[i]
                if i >= l:
                    curSum -= nums[i - l]

                remainSum = totSum - curSum
                if remainSum % p == 0:
                    return l

        return -1
```

```java
public class Solution {
    public int minSubarray(int[] nums, int p) {
        int n = nums.length;
        long totSum = 0;
        for (int num : nums) totSum += num;

        if (totSum % p == 0) return 0;

        for (int l = 1; l < n; l++) {
            long curSum = 0;
            for (int i = 0; i < n; i++) {
                curSum += nums[i];
                if (i >= l) curSum -= nums[i - l];

                long remainSum = totSum - curSum;
                if (remainSum % p == 0) return l;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int minSubarray(vector<int>& nums, int p) {
        int n = nums.size();
        long long totSum = 0;
        for (int num : nums) totSum += num;

        if (totSum % p == 0) return 0;

        for (int l = 1; l < n; l++) {
            long long curSum = 0;
            for (int i = 0; i < n; i++) {
                curSum += nums[i];
                if (i >= l) curSum -= nums[i - l];

                long long remainSum = totSum - curSum;
                if (remainSum % p == 0) return l;
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} p
     * @return {number}
     */
    minSubarray(nums, p) {
        const n = nums.length;
        let totSum = nums.reduce((a, b) => a + b, 0);

        if (totSum % p === 0) return 0;

        for (let l = 1; l < n; l++) {
            let curSum = 0;
            for (let i = 0; i < n; i++) {
                curSum += nums[i];
                if (i >= l) curSum -= nums[i - l];

                const remainSum = totSum - curSum;
                if (remainSum % p === 0) return l;
            }
        }

        return -1;
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
    def minSubarray(self, nums: List[int], p: int) -> int:
        total = sum(nums)
        remain = total % p
        if remain == 0:
            return 0

        res = len(nums)
        cur_sum = 0
        remain_to_idx = {0: -1}

        for i, n in enumerate(nums):
            cur_sum = (cur_sum + n) % p
            prefix = (cur_sum - remain + p) % p
            if prefix in remain_to_idx:
                length = i - remain_to_idx[prefix]
                res = min(res, length)
            remain_to_idx[cur_sum] = i

        return -1 if res == len(nums) else res
```

```java
public class Solution {
    public int minSubarray(int[] nums, int p) {
        long total = 0;
        for (int num : nums) total += num;
        int remain = (int)(total % p);
        if (remain == 0) return 0;

        int res = nums.length;
        long curSum = 0;
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);

        for (int i = 0; i < nums.length; i++) {
            curSum = (curSum + nums[i]) % p;
            int prefix = (int)((curSum - remain + p) % p);
            if (map.containsKey(prefix)) {
                res = Math.min(res, i - map.get(prefix));
            }
            map.put((int)curSum, i);
        }

        return res == nums.length ? -1 : res;
    }
}
```

```cpp
class Solution {
public:
    int minSubarray(vector<int>& nums, int p) {
        long total = 0;
        for (int num : nums) total += num;
        int remain = total % p;
        if (remain == 0) return 0;

        int res = nums.size();
        long curSum = 0;
        unordered_map<int, int> map;
        map[0] = -1;

        for (int i = 0; i < nums.size(); i++) {
            curSum = (curSum + nums[i]) % p;
            int prefix = (curSum - remain + p) % p;
            if (map.count(prefix)) {
                res = min(res, i - map[prefix]);
            }
            map[curSum] = i;
        }

        return res == nums.size() ? -1 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} p
     * @return {number}
     */
    minSubarray(nums, p) {
        let total = nums.reduce((a, b) => a + b, 0);
        let remain = total % p;
        if (remain === 0) return 0;

        let res = nums.length;
        let curSum = 0;
        const map = new Map();
        map.set(0, -1);

        for (let i = 0; i < nums.length; i++) {
            curSum = (curSum + nums[i]) % p;
            let prefix = (curSum - remain + p) % p;
            if (map.has(prefix)) {
                res = Math.min(res, i - map.get(prefix));
            }
            map.set(curSum, i);
        }

        return res === nums.length ? -1 : res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
