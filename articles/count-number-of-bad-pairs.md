## 1. Brute Force

::tabs-start

```python
class Solution:
    def countBadPairs(self, nums: List[int]) -> int:
        n, res = len(nums), 0
        for i in range(n - 1):
            for j in range(i + 1, n):
                if j - i != nums[j] - nums[i]:
                    res += 1
        return res
```

```java
public class Solution {
    public long countBadPairs(int[] nums) {
        int n = nums.length;
        long res = 0;
        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                if (j - i != nums[j] - nums[i]) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long countBadPairs(vector<int>& nums) {
        int n = nums.size();
        long long res = 0;
        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                if (j - i != nums[j] - nums[i]) {
                    res++;
                }
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
    countBadPairs(nums) {
        let n = nums.length,
            res = 0;
        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                if (j - i !== nums[j] - nums[i]) {
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
    def countBadPairs(self, nums: List[int]) -> int:
        good_pairs = 0
        total_pairs = 0
        count = defaultdict(int)

        for i in range(len(nums)):
            total_pairs += i
            good_pairs += count[nums[i] - i]
            count[nums[i] - i] += 1

        return total_pairs - good_pairs
```

```java
public class Solution {
    public long countBadPairs(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        long total = 0, good = 0;
        for (int i = 0; i < nums.length; i++) {
            int key = nums[i] - i;
            good += count.getOrDefault(key, 0);
            count.put(key, count.getOrDefault(key, 0) + 1);
            total += i;
        }
        return total - good;
    }
}
```

```cpp
class Solution {
public:
    long long countBadPairs(vector<int>& nums) {
        unordered_map<int, int> count;
        long long total = 0, good = 0;
        for (int i = 0; i < nums.size(); i++) {
            int key = nums[i] - i;
            good += count[key];
            count[key]++;
            total += i;
        }
        return total - good;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    countBadPairs(nums) {
        let count = new Map();
        let total = 0,
            good = 0;
        for (let i = 0; i < nums.length; i++) {
            let key = nums[i] - i;
            good += count.get(key) || 0;
            count.set(key, (count.get(key) || 0) + 1);
            total += i;
        }
        return total - good;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
