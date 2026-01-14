## 1. Brute Force

### Intuition

An ascending subarray is a contiguous sequence where each element is strictly greater than the previous. We want the maximum sum among all such subarrays.

The brute force approach considers every possible starting position. From each start, we extend the subarray as long as elements keep increasing, accumulating the sum. We track the maximum sum seen across all starting positions.

### Algorithm

1. Initialize `res = 0` to store the maximum sum found.
2. For each starting index `i`:
   - Initialize `curSum = nums[i]`.
   - Extend from `j = i + 1` while `nums[j] > nums[j-1]`:
     - Add `nums[j]` to `curSum`.
   - Update `res = max(res, curSum)`.
3. Return `res`.

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

```go
func maxAscendingSum(nums []int) int {
    res := 0
    for i := 0; i < len(nums); i++ {
        curSum := nums[i]
        for j := i + 1; j < len(nums); j++ {
            if nums[j] <= nums[j-1] {
                break
            }
            curSum += nums[j]
        }
        if curSum > res {
            res = curSum
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxAscendingSum(nums: IntArray): Int {
        var res = 0
        for (i in nums.indices) {
            var curSum = nums[i]
            for (j in i + 1 until nums.size) {
                if (nums[j] <= nums[j - 1]) break
                curSum += nums[j]
            }
            res = maxOf(res, curSum)
        }
        return res
    }
}
```

```swift
class Solution {
    func maxAscendingSum(_ nums: [Int]) -> Int {
        var res = 0
        for i in 0..<nums.count {
            var curSum = nums[i]
            for j in (i + 1)..<nums.count {
                if nums[j] <= nums[j - 1] {
                    break
                }
                curSum += nums[j]
            }
            res = max(res, curSum)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Iteration

### Intuition

We can solve this in a single pass. As we scan through the array, we maintain a running sum of the current ascending subarray. Whenever we encounter an element that does not continue the ascending pattern, we reset the running sum and start a new subarray from that element.

This works because ascending subarrays are naturally separated by positions where the ascending condition breaks.

### Algorithm

1. Initialize `res = nums[0]` and `curSum = nums[0]`.
2. For each index `i` from `1` to `n-1`:
   - If `nums[i] <= nums[i-1]`, reset `curSum = 0`.
   - Add `nums[i]` to `curSum`.
   - Update `res = max(res, curSum)`.
3. Return `res`.

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

```go
func maxAscendingSum(nums []int) int {
    res, curSum := nums[0], nums[0]

    for i := 1; i < len(nums); i++ {
        if nums[i] <= nums[i-1] {
            curSum = 0
        }
        curSum += nums[i]
        if curSum > res {
            res = curSum
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxAscendingSum(nums: IntArray): Int {
        var res = nums[0]
        var curSum = nums[0]

        for (i in 1 until nums.size) {
            if (nums[i] <= nums[i - 1]) {
                curSum = 0
            }
            curSum += nums[i]
            res = maxOf(res, curSum)
        }
        return res
    }
}
```

```swift
class Solution {
    func maxAscendingSum(_ nums: [Int]) -> Int {
        var res = nums[0]
        var curSum = nums[0]

        for i in 1..<nums.count {
            if nums[i] <= nums[i - 1] {
                curSum = 0
            }
            curSum += nums[i]
            res = max(res, curSum)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Using Non-Strict Inequality

The problem requires strictly ascending elements, meaning each element must be greater than the previous one. Using `>=` instead of `>` when checking the ascending condition will incorrectly include equal consecutive elements in your subarray, leading to wrong answers.

### Forgetting Single-Element Subarrays

A single element by itself forms a valid ascending subarray. If you forget to consider this case or initialize your result incorrectly, you might miss the maximum when the answer is a single large element surrounded by non-ascending neighbors.