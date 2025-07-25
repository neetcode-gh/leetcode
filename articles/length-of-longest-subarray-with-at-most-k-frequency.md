## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxSubarrayLength(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0

        for i in range(n):
            count = defaultdict(int)
            for j in range(i, n):
                count[nums[j]] += 1
                if count[nums[j]] > k:
                    break
                res = max(res, j - i + 1)

        return res
```

```java
public class Solution {
    public int maxSubarrayLength(int[] nums, int k) {
        int n = nums.length, res = 0;

        for (int i = 0; i < n; i++) {
            Map<Integer, Integer> count = new HashMap<>();
            for (int j = i; j < n; j++) {
                count.put(nums[j], count.getOrDefault(nums[j], 0) + 1);
                if (count.get(nums[j]) > k) {
                    break;
                }
                res = Math.max(res, j - i + 1);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxSubarrayLength(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;

        for (int i = 0; i < n; i++) {
            unordered_map<int, int> count;
            for (int j = i; j < n; j++) {
                count[nums[j]]++;
                if (count[nums[j]] > k) {
                    break;
                }
                res = max(res, j - i + 1);
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
    maxSubarrayLength(nums, k) {
        let n = nums.length,
            res = 0;

        for (let i = 0; i < n; i++) {
            let count = new Map();
            for (let j = i; j < n; j++) {
                count.set(nums[j], (count.get(nums[j]) || 0) + 1);
                if (count.get(nums[j]) > k) {
                    break;
                }
                res = Math.max(res, j - i + 1);
            }
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

## 2. Sliding Window

::tabs-start

```python
class Solution:
    def maxSubarrayLength(self, nums: List[int], k: int) -> int:
        res = 0
        count = defaultdict(int)
        l = 0
        for r in range(len(nums)):
            count[nums[r]] += 1
            while count[nums[r]] > k:
                count[nums[l]] -= 1
                l += 1
            res = max(res, r - l + 1)
        return res
```

```java
public class Solution {
    public int maxSubarrayLength(int[] nums, int k) {
        int res = 0;
        Map<Integer, Integer> count = new HashMap<>();
        int l = 0;

        for (int r = 0; r < nums.length; r++) {
            count.put(nums[r], count.getOrDefault(nums[r], 0) + 1);
            while (count.get(nums[r]) > k) {
                count.put(nums[l], count.get(nums[l]) - 1);
                l++;
            }
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxSubarrayLength(vector<int>& nums, int k) {
        int res = 0;
        unordered_map<int, int> count;
        int l = 0;

        for (int r = 0; r < nums.size(); r++) {
            count[nums[r]]++;
            while (count[nums[r]] > k) {
                count[nums[l]]--;
                l++;
            }
            res = max(res, r - l + 1);
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
    maxSubarrayLength(nums, k) {
        let res = 0;
        let count = new Map();
        let l = 0;

        for (let r = 0; r < nums.length; r++) {
            count.set(nums[r], (count.get(nums[r]) || 0) + 1);
            while (count.get(nums[r]) > k) {
                count.set(nums[l], count.get(nums[l]) - 1);
                l++;
            }
            res = Math.max(res, r - l + 1);
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

## 3. Sliding Window (Optimal)

::tabs-start

```python
class Solution:
    def maxSubarrayLength(self, nums: List[int], k: int) -> int:
        count = defaultdict(int)
        l = res = 0
        cnt = 0  # count of numbers with freq > k
        for r in range(len(nums)):
            count[nums[r]] += 1
            cnt += count[nums[r]] > k
            if cnt > 0:
                cnt -= count[nums[l]] > k
                count[nums[l]] -= 1
                l += 1
        return len(nums) - l
```

```java
public class Solution {
    public int maxSubarrayLength(int[] nums, int k) {
        HashMap<Integer, Integer> count = new HashMap<>();
        int l = 0, cnt = 0; // count of numbers with freq > k
        for (int r = 0; r < nums.length; r++) {
            count.put(nums[r], count.getOrDefault(nums[r], 0) + 1);
            if (count.get(nums[r]) > k) cnt++;
            if (cnt > 0) {
                if (count.get(nums[l]) > k) cnt--;
                count.put(nums[l], count.get(nums[l]) - 1);
                l++;
            }
        }
        return nums.length - l;
    }
}
```

```cpp
class Solution {
public:
    int maxSubarrayLength(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        int l = 0, cnt = 0; // count of numbers with freq > k
        for (int r = 0; r < nums.size(); r++) {
            count[nums[r]]++;
            cnt += count[nums[r]] > k;
            if (cnt > 0) {
                cnt -= count[nums[l]] > k;
                count[nums[l]]--;
                l++;
            }
        }
        return nums.size() - l;
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
    maxSubarrayLength(nums, k) {
        let count = new Map();
        let l = 0,
            cnt = 0; // count of numbers with freq > k
        for (let r = 0; r < nums.length; r++) {
            count.set(nums[r], (count.get(nums[r]) || 0) + 1);
            if (count.get(nums[r]) > k) cnt++;
            if (cnt > 0) {
                if (count.get(nums[l]) > k) cnt--;
                count.set(nums[l], count.get(nums[l]) - 1);
                l++;
            }
        }
        return nums.length - l;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
