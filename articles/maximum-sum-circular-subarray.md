## 1. Brute Force

### Intuition

Since the array is circular, any contiguous subarray can wrap around from the end back to the beginning. The most direct approach is to try every possible starting position and extend the subarray up to the full length of the array, tracking the maximum sum found. Using modular indexing allows us to wrap around seamlessly. While simple to understand, this method is slow because it examines every possible subarray.

### Algorithm

1. Initialize `res` with the first element.
2. For each starting index `i` from `0` to `n` - `1`:
   - Reset `cur_sum` to `0`.
   - Extend the subarray from index `i` up to `i` + `n` - `1`, using `j` % `n` to wrap around.
   - Add each element to `cur_sum` and update `res` with the maximum.
3. Return `res`.

::tabs-start

```python
class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        n = len(nums)
        res = nums[0]

        for i in range(n):
            cur_sum = 0
            for j in range(i, i + n):
                cur_sum += nums[j % n]
                res = max(res, cur_sum)

        return res
```

```java
public class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int n = nums.length;
        int res = nums[0];

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < i + n; j++) {
                curSum += nums[j % n];
                res = Math.max(res, curSum);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int n = nums.size();
        int res = nums[0];

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < i + n; j++) {
                curSum += nums[j % n];
                res = max(res, curSum);
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
    maxSubarraySumCircular(nums) {
        const n = nums.length;
        let res = nums[0];

        for (let i = 0; i < n; i++) {
            let curSum = 0;
            for (let j = i; j < i + n; j++) {
                curSum += nums[j % n];
                res = Math.max(res, curSum);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxSubarraySumCircular(int[] nums) {
        int n = nums.Length;
        int res = nums[0];

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < i + n; j++) {
                curSum += nums[j % n];
                res = Math.Max(res, curSum);
            }
        }

        return res;
    }
}
```

```go
func maxSubarraySumCircular(nums []int) int {
    n := len(nums)
    res := nums[0]

    for i := 0; i < n; i++ {
        curSum := 0
        for j := i; j < i+n; j++ {
            curSum += nums[j%n]
            if curSum > res {
                res = curSum
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxSubarraySumCircular(nums: IntArray): Int {
        val n = nums.size
        var res = nums[0]

        for (i in 0 until n) {
            var curSum = 0
            for (j in i until i + n) {
                curSum += nums[j % n]
                res = maxOf(res, curSum)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func maxSubarraySumCircular(_ nums: [Int]) -> Int {
        let n = nums.count
        var res = nums[0]

        for i in 0..<n {
            var curSum = 0
            for j in i..<(i + n) {
                curSum += nums[j % n]
                res = max(res, curSum)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Prefix & Suffix Sums

### Intuition

A circular subarray with maximum sum either lies entirely within the array (no wrap), or it wraps around (takes a prefix and a suffix). For the non-wrapping case, we can use standard Kadane's algorithm. For the wrapping case, we want the best prefix ending at some index combined with the best suffix starting after that index. By precomputing the maximum suffix sum from each position, we can efficiently find the best combination of prefix and suffix sums in a single pass.

### Algorithm

1. Compute `right_max[i]` as the maximum suffix sum starting at index `i` or later, iterating from right to left.
2. Initialize `max_sum` with `nums[0]`, and set `cur_max` and `prefix_sum` to `0`.
3. Iterate from left to right:
   - Update `cur_max` using Kadane's logic: `cur_max` = `max(cur_max, 0)` + `nums[i]`.
   - Update `max_sum` with `cur_max` (non-wrapping case).
   - Add `nums[i]` to `prefix_sum`.
   - If `i` + `1` < `n`, update `max_sum` with `prefix_sum` + `right_max[i + 1]` (wrapping case).
4. Return `max_sum`.

::tabs-start

```python
class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        n = len(nums)
        right_max = [0] * n
        right_max[-1] = nums[-1]
        suffix_sum = nums[-1]

        for i in range(n - 2, -1, -1):
            suffix_sum += nums[i]
            right_max[i] = max(right_max[i + 1], suffix_sum)

        max_sum = nums[0]
        cur_max = 0
        prefix_sum = 0

        for i in range(n):
            cur_max = max(cur_max, 0) + nums[i]
            max_sum = max(max_sum, cur_max)
            prefix_sum += nums[i]
            if i + 1 < n:
                max_sum = max(max_sum, prefix_sum + right_max[i + 1])

        return max_sum
```

```java
public class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int n = nums.length;
        int[] rightMax = new int[n];
        rightMax[n - 1] = nums[n - 1];
        int suffixSum = nums[n - 1];

        for (int i = n - 2; i >= 0; i--) {
            suffixSum += nums[i];
            rightMax[i] = Math.max(rightMax[i + 1], suffixSum);
        }

        int maxSum = nums[0];
        int curMax = 0;
        int prefixSum = 0;

        for (int i = 0; i < n; i++) {
            curMax = Math.max(curMax, 0) + nums[i];
            maxSum = Math.max(maxSum, curMax);
            prefixSum += nums[i];
            if (i + 1 < n) {
                maxSum = Math.max(maxSum, prefixSum + rightMax[i + 1]);
            }
        }

        return maxSum;
    }
}
```

```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int n = nums.size();
        vector<int> rightMax(n);
        rightMax[n - 1] = nums[n - 1];
        int suffixSum = nums[n - 1];

        for (int i = n - 2; i >= 0; --i) {
            suffixSum += nums[i];
            rightMax[i] = max(rightMax[i + 1], suffixSum);
        }

        int maxSum = nums[0];
        int curMax = 0;
        int prefixSum = 0;

        for (int i = 0; i < n; ++i) {
            curMax = max(curMax, 0) + nums[i];
            maxSum = max(maxSum, curMax);
            prefixSum += nums[i];
            if (i + 1 < n) {
                maxSum = max(maxSum, prefixSum + rightMax[i + 1]);
            }
        }

        return maxSum;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubarraySumCircular(nums) {
        const n = nums.length;
        const rightMax = new Array(n).fill(0);
        rightMax[n - 1] = nums[n - 1];
        let suffixSum = nums[n - 1];

        for (let i = n - 2; i >= 0; i--) {
            suffixSum += nums[i];
            rightMax[i] = Math.max(rightMax[i + 1], suffixSum);
        }

        let maxSum = nums[0];
        let curMax = 0;
        let prefixSum = 0;

        for (let i = 0; i < n; i++) {
            curMax = Math.max(curMax, 0) + nums[i];
            maxSum = Math.max(maxSum, curMax);
            prefixSum += nums[i];
            if (i + 1 < n) {
                maxSum = Math.max(maxSum, prefixSum + rightMax[i + 1]);
            }
        }

        return maxSum;
    }
}
```

```csharp
public class Solution {
    public int MaxSubarraySumCircular(int[] nums) {
        int n = nums.Length;
        int[] rightMax = new int[n];
        rightMax[n - 1] = nums[n - 1];
        int suffixSum = nums[n - 1];

        for (int i = n - 2; i >= 0; i--) {
            suffixSum += nums[i];
            rightMax[i] = Math.Max(rightMax[i + 1], suffixSum);
        }

        int maxSum = nums[0];
        int curMax = 0;
        int prefixSum = 0;

        for (int i = 0; i < n; i++) {
            curMax = Math.Max(curMax, 0) + nums[i];
            maxSum = Math.Max(maxSum, curMax);
            prefixSum += nums[i];
            if (i + 1 < n) {
                maxSum = Math.Max(maxSum, prefixSum + rightMax[i + 1]);
            }
        }

        return maxSum;
    }
}
```

```go
func maxSubarraySumCircular(nums []int) int {
    n := len(nums)
    rightMax := make([]int, n)
    rightMax[n-1] = nums[n-1]
    suffixSum := nums[n-1]

    for i := n - 2; i >= 0; i-- {
        suffixSum += nums[i]
        rightMax[i] = max(rightMax[i+1], suffixSum)
    }

    maxSum := nums[0]
    curMax := 0
    prefixSum := 0

    for i := 0; i < n; i++ {
        curMax = max(curMax, 0) + nums[i]
        maxSum = max(maxSum, curMax)
        prefixSum += nums[i]
        if i+1 < n {
            maxSum = max(maxSum, prefixSum+rightMax[i+1])
        }
    }

    return maxSum
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxSubarraySumCircular(nums: IntArray): Int {
        val n = nums.size
        val rightMax = IntArray(n)
        rightMax[n - 1] = nums[n - 1]
        var suffixSum = nums[n - 1]

        for (i in n - 2 downTo 0) {
            suffixSum += nums[i]
            rightMax[i] = maxOf(rightMax[i + 1], suffixSum)
        }

        var maxSum = nums[0]
        var curMax = 0
        var prefixSum = 0

        for (i in 0 until n) {
            curMax = maxOf(curMax, 0) + nums[i]
            maxSum = maxOf(maxSum, curMax)
            prefixSum += nums[i]
            if (i + 1 < n) {
                maxSum = maxOf(maxSum, prefixSum + rightMax[i + 1])
            }
        }

        return maxSum
    }
}
```

```swift
class Solution {
    func maxSubarraySumCircular(_ nums: [Int]) -> Int {
        let n = nums.count
        var rightMax = [Int](repeating: 0, count: n)
        rightMax[n - 1] = nums[n - 1]
        var suffixSum = nums[n - 1]

        for i in stride(from: n - 2, through: 0, by: -1) {
            suffixSum += nums[i]
            rightMax[i] = max(rightMax[i + 1], suffixSum)
        }

        var maxSum = nums[0]
        var curMax = 0
        var prefixSum = 0

        for i in 0..<n {
            curMax = max(curMax, 0) + nums[i]
            maxSum = max(maxSum, curMax)
            prefixSum += nums[i]
            if i + 1 < n {
                maxSum = max(maxSum, prefixSum + rightMax[i + 1])
            }
        }

        return maxSum
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Kadane's Algorithm

### Intuition

The maximum circular subarray sum falls into one of two cases: either the subarray does not wrap around, or it does. For the non-wrapping case, standard Kadane's algorithm finds the maximum subarray sum. For the wrapping case, if we remove a contiguous middle portion from the array, what remains is a prefix plus a suffix. Removing the minimum subarray sum leaves behind the maximum wrapping sum, which equals `total - minSubarraySum`. We take the better of these two cases, but if all elements are negative, the maximum is simply the largest single element.

### Algorithm

1. Initialize `globMax` and `globMin` to `nums[0]`, and set `curMax`, `curMin`, and `total` to `0`.
2. For each `num` in `nums`:
   - Update `curMax` = `max(curMax` + `num, num)` and `globMax` = `max(globMax, curMax)`.
   - Update `curMin` = `min(curMin` + `num, num)` and `globMin` = `min(globMin, curMin)`.
   - Add `num` to `total`.
3. If `globMax` > `0`, return `max(globMax, total - globMin)`. Otherwise, return `globMax`.

::tabs-start

```python
class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        globMax, globMin = nums[0], nums[0]
        curMax, curMin = 0, 0
        total = 0

        for num in nums:
            curMax = max(curMax + num, num)
            curMin = min(curMin + num, num)
            total += num
            globMax = max(globMax, curMax)
            globMin = min(globMin, curMin)

        return max(globMax, total - globMin) if globMax > 0 else globMax
```

```java
public class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int globMax = nums[0], globMin = nums[0];
        int curMax = 0, curMin = 0, total = 0;

        for (int num : nums) {
            curMax = Math.max(curMax + num, num);
            curMin = Math.min(curMin + num, num);
            total += num;
            globMax = Math.max(globMax, curMax);
            globMin = Math.min(globMin, curMin);
        }

        return globMax > 0 ? Math.max(globMax, total - globMin) : globMax;
    }
}
```

```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int globMax = nums[0], globMin = nums[0];
        int curMax = 0, curMin = 0, total = 0;

        for (int& num : nums) {
            curMax = max(curMax + num, num);
            curMin = min(curMin + num, num);
            total += num;
            globMax = max(globMax, curMax);
            globMin = min(globMin, curMin);
        }

        return globMax > 0 ? max(globMax, total - globMin) : globMax;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxSubarraySumCircular(nums) {
        let globMax = nums[0],
            globMin = nums[0];
        let curMax = 0,
            curMin = 0,
            total = 0;

        for (const num of nums) {
            curMax = Math.max(curMax + num, num);
            curMin = Math.min(curMin + num, num);
            total += num;
            globMax = Math.max(globMax, curMax);
            globMin = Math.min(globMin, curMin);
        }

        return globMax > 0 ? Math.max(globMax, total - globMin) : globMax;
    }
}
```

```csharp
public class Solution {
    public int MaxSubarraySumCircular(int[] nums) {
        int globMax = nums[0], globMin = nums[0];
        int curMax = 0, curMin = 0, total = 0;

        foreach (int num in nums) {
            curMax = Math.Max(curMax + num, num);
            globMax = Math.Max(globMax, curMax);

            curMin = Math.Min(curMin + num, num);
            globMin = Math.Min(globMin, curMin);

            total += num;
        }

        return globMax > 0 ? Math.Max(globMax, total - globMin) : globMax;
    }
}
```

```go
func maxSubarraySumCircular(nums []int) int {
    globMax, globMin := nums[0], nums[0]
    curMax, curMin, total := 0, 0, 0

    for _, num := range nums {
        curMax = max(curMax+num, num)
        curMin = min(curMin+num, num)
        total += num
        globMax = max(globMax, curMax)
        globMin = min(globMin, curMin)
    }

    if globMax > 0 {
        return max(globMax, total-globMin)
    }
    return globMax
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxSubarraySumCircular(nums: IntArray): Int {
        var globMax = nums[0]
        var globMin = nums[0]
        var curMax = 0
        var curMin = 0
        var total = 0

        for (num in nums) {
            curMax = maxOf(curMax + num, num)
            curMin = minOf(curMin + num, num)
            total += num
            globMax = maxOf(globMax, curMax)
            globMin = minOf(globMin, curMin)
        }

        return if (globMax > 0) maxOf(globMax, total - globMin) else globMax
    }
}
```

```swift
class Solution {
    func maxSubarraySumCircular(_ nums: [Int]) -> Int {
        var globMax = nums[0]
        var globMin = nums[0]
        var curMax = 0
        var curMin = 0
        var total = 0

        for num in nums {
            curMax = max(curMax + num, num)
            curMin = min(curMin + num, num)
            total += num
            globMax = max(globMax, curMax)
            globMin = min(globMin, curMin)
        }

        return globMax > 0 ? max(globMax, total - globMin) : globMax
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
