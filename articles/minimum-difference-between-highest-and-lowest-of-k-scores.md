## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Sorting** - Sorting ensures that contiguous subarrays contain the smallest possible range of values
- **Sliding Window** - A fixed-size window of k elements slides across the sorted array to find the minimum difference

---

## 1. Sorting + Sliding Window

### Intuition

When we need to minimize the difference between the highest and lowest values among any `k` chosen elements, sorting the array first is key. After sorting, the smallest possible range of `k` elements will always be a contiguous segment. Why? Because picking non-adjacent elements after sorting would only increase the gap between `max` and `min`. So, we sort the array and then slide a window of size `k` across it, tracking the minimum difference between the first and last element of each window.

### Algorithm

1. Sort the input array in ascending order.
2. Initialize two pointers: `l = 0` and `r = k - 1` to represent a window of size `k`.
3. Initialize `res` to infinity to track the minimum difference found.
4. While `r` is within bounds:
   - Compute `nums[r] - nums[l]` (the difference between `max` and `min` in this window).
   - Update `res` with the minimum of the current `res` and this difference.
   - Slide the window by incrementing both `l` and `r`.
5. Return `res`.

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

```go
func minimumDifference(nums []int, k int) int {
    sort.Ints(nums)
    l, r := 0, k-1
    res := math.MaxInt32

    for r < len(nums) {
        if nums[r]-nums[l] < res {
            res = nums[r] - nums[l]
        }
        l++
        r++
    }

    return res
}
```

```kotlin
class Solution {
    fun minimumDifference(nums: IntArray, k: Int): Int {
        nums.sort()
        var l = 0
        var r = k - 1
        var res = Int.MAX_VALUE

        while (r < nums.size) {
            res = minOf(res, nums[r] - nums[l])
            l++
            r++
        }

        return res
    }
}
```

```swift
class Solution {
    func minimumDifference(_ nums: [Int], _ k: Int) -> Int {
        let nums = nums.sorted()
        var l = 0
        var r = k - 1
        var res = Int.max

        while r < nums.count {
            res = min(res, nums[r] - nums[l])
            l += 1
            r += 1
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## Common Pitfalls

### Forgetting to Sort the Array First

The sliding window approach only works on a sorted array because it relies on contiguous elements having the minimum possible range. Applying the window on an unsorted array compares arbitrary elements, missing the optimal k-element subset.

### Off-by-One Error in Window Size

The window should contain exactly `k` elements, meaning if `l` is the left index and `r` is the right index, then `r - l + 1 = k`, so `r = l + k - 1`. Initializing `r = k` instead of `r = k - 1` creates a window of size `k + 1`, producing incorrect difference calculations.
