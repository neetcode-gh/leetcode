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
