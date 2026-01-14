## 1. Binary Search

### Intuition

The operation allows us to move value from a position to its left neighbor. This means we can redistribute values leftward but never rightward. The key observation is: for any target maximum value `m`, we can achieve it if and only if the prefix sum up to each index `i` does not exceed `m * (i + 1)`. This is because we can spread the total sum of the first `i+1` elements evenly among those positions.

Since the answer lies between 0 and the maximum element, we can binary search for the smallest valid maximum. For each candidate, we check if the prefix sum constraint holds for all positions.

### Algorithm

1. Binary search on the answer between `0` and `max(nums)`.
2. For each candidate maximum `mid`, check validity:
   - Iterate through the array maintaining a running `prefix_sum`.
   - If at any index `i`, the `prefix_sum` exceeds `mid * (i + 1)`, the candidate is too small.
3. If valid, try a smaller maximum. If invalid, try a larger one.
4. Return the smallest valid maximum.

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

```csharp
public class Solution {
    public int MinimizeArrayValue(int[] nums) {
        int left = 0, right = nums.Max();

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (IsValid(nums, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return left;
    }

    private bool IsValid(int[] nums, int maxVal) {
        long prefixSum = 0;
        for (int i = 0; i < nums.Length; i++) {
            prefixSum += nums[i];
            if (prefixSum > (long)maxVal * (i + 1)) {
                return false;
            }
        }
        return true;
    }
}
```

```go
func minimizeArrayValue(nums []int) int {
    isValid := func(maxVal int) bool {
        var prefixSum int64 = 0
        for i := 0; i < len(nums); i++ {
            prefixSum += int64(nums[i])
            if prefixSum > int64(maxVal)*int64(i+1) {
                return false
            }
        }
        return true
    }

    left, right := 0, 0
    for _, num := range nums {
        if num > right {
            right = num
        }
    }

    for left < right {
        mid := left + (right-left)/2
        if isValid(mid) {
            right = mid
        } else {
            left = mid + 1
        }
    }

    return left
}
```

```kotlin
class Solution {
    fun minimizeArrayValue(nums: IntArray): Int {
        fun isValid(maxVal: Int): Boolean {
            var prefixSum: Long = 0
            for (i in nums.indices) {
                prefixSum += nums[i]
                if (prefixSum > maxVal.toLong() * (i + 1)) {
                    return false
                }
            }
            return true
        }

        var left = 0
        var right = nums.max()

        while (left < right) {
            val mid = left + (right - left) / 2
            if (isValid(mid)) {
                right = mid
            } else {
                left = mid + 1
            }
        }

        return left
    }
}
```

```swift
class Solution {
    func minimizeArrayValue(_ nums: [Int]) -> Int {
        func isValid(_ maxVal: Int) -> Bool {
            var prefixSum: Int64 = 0
            for i in 0..<nums.count {
                prefixSum += Int64(nums[i])
                if prefixSum > Int64(maxVal) * Int64(i + 1) {
                    return false
                }
            }
            return true
        }

        var left = 0
        var right = nums.max()!

        while left < right {
            let mid = left + (right - left) / 2
            if isValid(mid) {
                right = mid
            } else {
                left = mid + 1
            }
        }

        return left
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

### Intuition

Building on the prefix sum insight, we can solve this directly without binary search. At each position `i`, the minimum possible maximum considering elements `0` to `i` is the ceiling of `prefixSum / (i + 1)`. This represents the best we can do by spreading the total sum evenly across those positions.

The overall answer is the maximum of these values across all prefixes. We cannot do better than this because each prefix constrains how low the maximum can go, and the tightest constraint determines the answer.

### Algorithm

1. Initialize `res` and `total` with the first element (the first element cannot be reduced).
2. For each subsequent index `i`:
   - Add `nums[i]` to the running `total`.
   - Compute the ceiling of `total / (i + 1)`.
   - Update `res` to be the maximum of itself and this ceiling.
3. Return `res`.

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

```csharp
public class Solution {
    public int MinimizeArrayValue(int[] nums) {
        int res = nums[0];
        long total = nums[0];

        for (int i = 1; i < nums.Length; i++) {
            total += nums[i];
            res = Math.Max(res, (int)Math.Ceiling((double)total / (i + 1)));
        }

        return res;
    }
}
```

```go
func minimizeArrayValue(nums []int) int {
    res := nums[0]
    total := int64(nums[0])

    for i := 1; i < len(nums); i++ {
        total += int64(nums[i])
        ceil := int((total + int64(i)) / int64(i+1))
        if ceil > res {
            res = ceil
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun minimizeArrayValue(nums: IntArray): Int {
        var res = nums[0]
        var total: Long = nums[0].toLong()

        for (i in 1 until nums.size) {
            total += nums[i]
            res = maxOf(res, ((total + i) / (i + 1)).toInt())
        }

        return res
    }
}
```

```swift
class Solution {
    func minimizeArrayValue(_ nums: [Int]) -> Int {
        var res = nums[0]
        var total = Int64(nums[0])

        for i in 1..<nums.count {
            total += Int64(nums[i])
            let ceil = Int((total + Int64(i)) / Int64(i + 1))
            res = max(res, ceil)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Forgetting That the First Element Cannot Be Reduced

The operation only moves value from position `i` to position `i-1`. This means you can never reduce the first element `nums[0]}` since there is no position to its left. Many solutions incorrectly assume you can redistribute values in both directions. The first element sets a lower bound on the answer since it can only increase, never decrease.

### Integer Overflow in Prefix Sum Calculations

When computing prefix sums and comparing against `maxVal * (i + 1)`, the multiplication can overflow if using 32-bit integers. For arrays with large values (up to 10^9) and indices up to 10^5, the product can exceed 2^31. Always use 64-bit integers (`long`, `long long`, `Int64`) for the prefix sum and the multiplication result.

### Off-by-One Errors in the Ceiling Division

The greedy solution requires computing the ceiling of `prefixSum / (i + 1)`. A common mistake is using integer division directly, which gives the floor. The ceiling can be computed as `(prefixSum + i) / (i + 1)` or using explicit ceiling functions. Also ensure the divisor is `i + 1` (not `i`) since indices are 0-based but we need the count of elements.