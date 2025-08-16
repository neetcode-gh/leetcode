## 1. Sorting + Sliding Window

::tabs-start

```python
class Solution:
    def minimumDifference(self, nums: List[int], k: int) -> int:
        nums.sort()
        l, r = 0, k - 1
        res = float("inf")
        while r < len(nums):
            res = min(res, nums[r] - nums[l])
            l += 1
            r += 1
        return res
```

```java
public class Solution {
    public int minimumDifference(int[] nums, int k) {
        Arrays.sort(nums);
        int l = 0, r = k - 1, res = Integer.MAX_VALUE;
        while (r < nums.length) {
            res = Math.min(res, nums[r] - nums[l]);
            l++;
            r++;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minimumDifference(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int l = 0, r = k - 1, res = INT_MAX;
        while (r < nums.size()) {
            res = min(res, nums[r] - nums[l]);
            l++;
            r++;
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
    minimumDifference(nums, k) {
        nums.sort((a, b) => a - b);
        let l = 0,
            r = k - 1,
            res = Infinity;
        while (r < nums.length) {
            res = Math.min(res, nums[r] - nums[l]);
            l++;
            r++;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinimumDifference(int[] nums, int k) {
        Array.Sort(nums);
        int l = 0, r = k - 1;
        int res = int.MaxValue;

        while (r < nums.Length) {
            res = Math.Min(res, nums[r] - nums[l]);
            l++;
            r++;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.
