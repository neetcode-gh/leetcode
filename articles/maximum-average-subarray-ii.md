## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Search on Real Numbers** - Searching over a continuous range rather than discrete indices
- **Prefix Sums** - Computing cumulative sums to efficiently query subarray sums
- **Sliding Window** - Understanding how to efficiently compute values over fixed-size windows

---

## 1. Iterative

### Intuition

We need to find a contiguous subarray of length at least `k` with the maximum average. The brute force approach checks every possible subarray by trying all starting positions and all valid ending positions.

For each starting index, we extend the subarray one element at a time, maintaining a running sum. Once the length reaches `k` or more, we compute the average and update our result if it is larger.

### Algorithm

1. Initialize `res` to negative infinity.
2. For each starting index `s` from `0` to `n - k`:
   - Initialize `sum_val = 0`.
   - For each ending index `i` from `s` to `n - 1`:
     - Add `nums[i]` to `sum_val`.
     - If the subarray length `i - s + 1 >= k`:
       - Compute average and update `res` if larger.
3. Return `res`.

::tabs-start

```python
class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        res = float('-inf')

        for s in range(len(nums) - k + 1):
            sum_val = 0
            for i in range(s, len(nums)):
                sum_val += nums[i]
                if i - s + 1 >= k:
                    res = max(res, sum_val / (i - s + 1))

        return res
```

```java
class Solution {
    public double findMaxAverage(int[] nums, int k) {
        double res = Integer.MIN_VALUE;

        for (int s = 0; s < nums.length - k + 1; s++) {
            long sum = 0;
            for (int i = s; i < nums.length; i++) {
                sum += nums[i];
                if (i - s + 1 >= k)
                    res = Math.max(res, sum * 1.0 / (i - s + 1));
            }
        }
        
        return res;
    }
}
```

```cpp
class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        double res = -INFINITY;

        for (int s = 0; s < nums.size() - k + 1; s++) {
            long long sum = 0;
            for (int i = s; i < nums.size(); i++) {
                sum += nums[i];
                if (i - s + 1 >= k)
                    res = max(res, sum * 1.0 / (i - s + 1));
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
    findMaxAverage(nums, k) {
        let res = -Infinity;

        for (let s = 0; s < nums.length - k + 1; s++) {
            let sum = 0;
            for (let i = s; i < nums.length; i++) {
                sum += nums[i];
                if (i - s + 1 >= k)
                    res = Math.max(res, sum / (i - s + 1));
            }
        }

        return res;
    }
}
```

```go
func findMaxAverage(nums []int, k int) float64 {
    res := math.Inf(-1)

    for s := 0; s < len(nums)-k+1; s++ {
        sum := 0
        for i := s; i < len(nums); i++ {
            sum += nums[i]
            if i-s+1 >= k {
                res = math.Max(res, float64(sum)/float64(i-s+1))
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findMaxAverage(nums: IntArray, k: Int): Double {
        var res = Double.NEGATIVE_INFINITY

        for (s in 0..nums.size - k) {
            var sum = 0L
            for (i in s until nums.size) {
                sum += nums[i]
                if (i - s + 1 >= k) {
                    res = maxOf(res, sum.toDouble() / (i - s + 1))
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findMaxAverage(_ nums: [Int], _ k: Int) -> Double {
        var res = -Double.infinity

        for s in 0...(nums.count - k) {
            var sum = 0
            for i in s..<nums.count {
                sum += nums[i]
                if i - s + 1 >= k {
                    res = max(res, Double(sum) / Double(i - s + 1))
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n^2)$
- Space complexity: $O(1)$ constant space

>  Where $n$ is the number of elements in the array `nums`.

---

## 2. Binary Search

### Intuition

Instead of checking all subarrays, we can binary search on the answer. The key insight is that the maximum average lies between the minimum and maximum values in the array. For a candidate average `mid`, we can efficiently check if there exists a subarray of length at least `k` with average greater than or equal to `mid`.

To check this, we subtract `mid` from each element. Now we need to find a subarray of length at least `k` with non-negative sum. Using prefix sums and tracking the minimum prefix sum before the current window, we can do this in linear time.

### Algorithm

1. Initialize `min_val` and `max_val` as the minimum and maximum of `nums`.
2. Binary search while the error exceeds `0.00001`:
   - Compute `mid = (min_val + max_val) / 2`.
   - Call `check(nums, mid, k)` to see if a valid subarray exists.
   - If `true`, set `min_val = mid` (answer is at least `mid`).
   - Otherwise, set `max_val = mid`.
3. The `check` function:
   - Compute prefix sums of `nums[i] - mid`.
   - Track `min_sum` as the minimum prefix sum seen at least `k` positions before.
   - If `current_sum - min_sum >= 0` at any point, return `true`.
4. Return `min_val`.

::tabs-start

```python
class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        max_val = float('-inf')
        min_val = float('inf')
        for n in nums:
            max_val = max(max_val, n)
            min_val = min(min_val, n)
        
        prev_mid = max_val
        error = float('inf')
        
        while error > 0.00001:
            mid = (max_val + min_val) * 0.5
            if self.check(nums, mid, k):
                min_val = mid
            else:
                max_val = mid
            error = abs(prev_mid - mid)
            prev_mid = mid
        
        return min_val
    
    def check(self, nums: List[int], mid: float, k: int) -> bool:
        sum_val = 0
        prev = 0
        min_sum = 0
        
        for i in range(k):
            sum_val += nums[i] - mid
        
        if sum_val >= 0:
            return True
        
        for i in range(k, len(nums)):
            sum_val += nums[i] - mid
            prev += nums[i - k] - mid
            min_sum = min(prev, min_sum)
            if sum_val >= min_sum:
                return True
        
        return False
```

```java
class Solution {
    public double findMaxAverage(int[] nums, int k) {
        double max_val = Integer.MIN_VALUE;
        double min_val = Integer.MAX_VALUE;

        for (int n: nums) {
            max_val = Math.max(max_val, n);
            min_val = Math.min(min_val, n);
        }

        double prev_mid = max_val, error = Integer.MAX_VALUE;

        while (error > 0.00001) {
            double mid = (max_val + min_val) * 0.5;

            if (check(nums, mid, k))
                min_val = mid;
            else
                max_val = mid;

            error = Math.abs(prev_mid - mid);
            prev_mid = mid;
        }

        return min_val;
    }

    public boolean check(int[] nums, double mid, int k) {
        double sum = 0, prev = 0, min_sum = 0;

        for (int i = 0; i < k; i++)
            sum += nums[i] - mid;

        if (sum >= 0)
            return true;

        for (int i = k; i < nums.length; i++) {
            sum += nums[i] - mid;
            prev += nums[i - k] - mid;
            min_sum = Math.min(prev, min_sum);

            if (sum >= min_sum)
                return true;
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        double max_val = INT_MIN;
        double min_val = INT_MAX;
        
        for (int n : nums) {
            max_val = max(max_val, (double)n);
            min_val = min(min_val, (double)n);
        }
        
        double prev_mid = max_val;
        double error = INT_MAX;
        
        while (error > 0.00001) {
            double mid = (max_val + min_val) * 0.5;
            if (check(nums, mid, k))
                min_val = mid;
            else
                max_val = mid;
            error = abs(prev_mid - mid);
            prev_mid = mid;
        }
        
        return min_val;
    }
    
private:
    bool check(vector<int>& nums, double mid, int k) {
        double sum = 0, prev = 0, min_sum = 0;
        
        for (int i = 0; i < k; i++)
            sum += nums[i] - mid;
        
        if (sum >= 0)
            return true;
        
        for (int i = k; i < nums.size(); i++) {
            sum += nums[i] - mid;
            prev += nums[i - k] - mid;
            min_sum = min(prev, min_sum);
            if (sum >= min_sum)
                return true;
        }
        
        return false;
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
    findMaxAverage(nums, k) {
        let max_val = -Infinity;
        let min_val = Infinity;

        for (let n of nums) {
            max_val = Math.max(max_val, n);
            min_val = Math.min(min_val, n);
        }

        let prev_mid = max_val;
        let error = Infinity;

        while (error > 0.00001) {
            let mid = (max_val + min_val) * 0.5;
            if (this.check(nums, mid, k))
                min_val = mid;
            else
                max_val = mid;
            error = Math.abs(prev_mid - mid);
            prev_mid = mid;
        }

        return min_val;
    }

    /**
     * @param {number[]} nums
     * @param {number} mid
     * @param {number} k
     * @return {boolean}
     */
    check(nums, mid, k) {
        let sum = 0, prev = 0, min_sum = 0;

        for (let i = 0; i < k; i++)
            sum += nums[i] - mid;

        if (sum >= 0)
            return true;

        for (let i = k; i < nums.length; i++) {
            sum += nums[i] - mid;
            prev += nums[i - k] - mid;
            min_sum = Math.min(prev, min_sum);
            if (sum >= min_sum)
                return true;
        }

        return false;
    }
}
```

```go
func findMaxAverage(nums []int, k int) float64 {
    maxVal := float64(nums[0])
    minVal := float64(nums[0])
    for _, n := range nums {
        maxVal = math.Max(maxVal, float64(n))
        minVal = math.Min(minVal, float64(n))
    }

    prevMid := maxVal
    err := math.MaxFloat64

    for err > 0.00001 {
        mid := (maxVal + minVal) * 0.5
        if check(nums, mid, k) {
            minVal = mid
        } else {
            maxVal = mid
        }
        err = math.Abs(prevMid - mid)
        prevMid = mid
    }
    return minVal
}

func check(nums []int, mid float64, k int) bool {
    sum, prev, minSum := 0.0, 0.0, 0.0

    for i := 0; i < k; i++ {
        sum += float64(nums[i]) - mid
    }
    if sum >= 0 {
        return true
    }

    for i := k; i < len(nums); i++ {
        sum += float64(nums[i]) - mid
        prev += float64(nums[i-k]) - mid
        minSum = math.Min(prev, minSum)
        if sum >= minSum {
            return true
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun findMaxAverage(nums: IntArray, k: Int): Double {
        var maxVal = nums.maxOrNull()!!.toDouble()
        var minVal = nums.minOrNull()!!.toDouble()

        var prevMid = maxVal
        var error = Double.MAX_VALUE

        while (error > 0.00001) {
            val mid = (maxVal + minVal) * 0.5
            if (check(nums, mid, k)) {
                minVal = mid
            } else {
                maxVal = mid
            }
            error = kotlin.math.abs(prevMid - mid)
            prevMid = mid
        }
        return minVal
    }

    private fun check(nums: IntArray, mid: Double, k: Int): Boolean {
        var sum = 0.0
        var prev = 0.0
        var minSum = 0.0

        for (i in 0 until k) {
            sum += nums[i] - mid
        }
        if (sum >= 0) return true

        for (i in k until nums.size) {
            sum += nums[i] - mid
            prev += nums[i - k] - mid
            minSum = minOf(prev, minSum)
            if (sum >= minSum) return true
        }
        return false
    }
}
```

```swift
class Solution {
    func findMaxAverage(_ nums: [Int], _ k: Int) -> Double {
        var maxVal = Double(nums.max()!)
        var minVal = Double(nums.min()!)

        var prevMid = maxVal
        var error = Double.infinity

        while error > 0.00001 {
            let mid = (maxVal + minVal) * 0.5
            if check(nums, mid, k) {
                minVal = mid
            } else {
                maxVal = mid
            }
            error = abs(prevMid - mid)
            prevMid = mid
        }
        return minVal
    }

    private func check(_ nums: [Int], _ mid: Double, _ k: Int) -> Bool {
        var sum = 0.0
        var prev = 0.0
        var minSum = 0.0

        for i in 0..<k {
            sum += Double(nums[i]) - mid
        }
        if sum >= 0 { return true }

        for i in k..<nums.count {
            sum += Double(nums[i]) - mid
            prev += Double(nums[i - k]) - mid
            minSum = min(prev, minSum)
            if sum >= minSum { return true }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \cdot \log_2 \frac{(\text{max\_val} - \text{min\_val})}{0.00001})$.
    - The algorithm consists of a binary search loop in the function of `findMaxAverage()`.
    - At each iteration of the loop, the `check()` function dominates the time complexity, which is of $O(N)$ for each invocation.
    - It now boils down to how many iterations the loop would run eventually. To calculate the number of iterations, let us break it down in the following steps.
    - After the first iteration, the error would be $\frac{\text{range}}{2}$, as one can see. Further on, at each iteration, the error would be reduced into half. For example, after the second iteration, we would have the error as $\frac{\text{range}}{2} \cdot \frac{1}{2}$.
    - As a result, after $K$ iterations, the error would become $\text{error} = \text{range} \cdot 2^{-K}$. Given the condition of the loop, i.e. $\text{error} < 0.00001$, we can deduct that $K > \log_2 \frac{\text{range}}{0.00001} = \log_2 \frac{(\text{max\_val} - \text{min\_val})}{0.00001}$.
    - To sum up, the time complexity of the algorithm would be $O(N \cdot K) = O(N \cdot \log_2 \frac{(\text{max\_val} - \text{min\_val})}{0.00001})$.
- Space complexity: $O(1)$ constant space

>  Where $N$ is the number of elements in the array, and `range` is the difference between the maximal and minimal values in the array, i.e. `range = max_val - min_val`, and finally `error` is the precision required in the problem.

---

## Common Pitfalls

### Forgetting the Minimum Length Constraint

The subarray must have length at least `k`. A common mistake is to check all subarrays without enforcing this constraint, or to only check subarrays of exactly length `k` and miss longer subarrays that could have a higher average.

### Floating-Point Precision Issues

Binary search on real numbers requires careful handling of precision. Setting the tolerance too tight can cause infinite loops, while setting it too loose yields inaccurate answers. The epsilon value of `0.00001` must be chosen to match the problem's precision requirements.

### Incorrect Check Function Logic

The check function determines if a subarray with average at least `mid` exists. The trick of subtracting `mid` from each element and finding a non-negative sum subarray is subtle. Errors in tracking prefix sums or the minimum prefix sum lead to false positives or negatives.

### Not Tracking Minimum Prefix Sum Correctly

In the check function, you need the minimum prefix sum that ends at least `k` positions before the current index. Off-by-one errors in when to update `min_sum` versus when to use it cause the check to return incorrect results.

### Binary Search Direction Confusion

When the check returns true, it means a valid subarray exists with average at least `mid`, so the answer is at least `mid` and we should search higher. Reversing this logic inverts the binary search and produces wrong answers.
