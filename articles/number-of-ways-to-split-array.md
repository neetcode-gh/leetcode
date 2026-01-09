## 1. Brute Force

### Intuition

A valid split at index `i` means the sum of elements from 0 to `i` is at least as large as the sum from `i+1` to the end. The straightforward approach is to compute both sums for every possible split point by iterating through the relevant portions of the array each time.

### Algorithm

1. For each possible split index `i` from 0 to `n - 2`:
   - Compute the left sum by iterating from 0 to `i`.
   - Compute the right sum by iterating from `i + 1` to `n - 1`.
   - If left sum >= right sum, increment the result.
2. Return the count of valid splits.

::tabs-start

```python
class Solution:
    def waysToSplitArray(self, nums: List[int]) -> int:
        n = len(nums)
        res = 0

        for i in range(n - 1):
            leftSum = 0
            for j in range(i + 1):
                leftSum += nums[j]

            rightSum = 0
            for j in range(i + 1, n):
                rightSum += nums[j]

            res += (1 if leftSum >= rightSum else 0)

        return res
```

```java
public class Solution {
    public int waysToSplitArray(int[] nums) {
        int n = nums.length;
        int res = 0;

        for (int i = 0; i < n - 1; i++) {
            long leftSum = 0;
            for (int j = 0; j <= i; j++) {
                leftSum += nums[j];
            }

            long rightSum = 0;
            for (int j = i + 1; j < n; j++) {
                rightSum += nums[j];
            }

            if (leftSum >= rightSum) {
                res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int waysToSplitArray(vector<int>& nums) {
        int n = nums.size();
        int res = 0;

        for (int i = 0; i < n - 1; i++) {
            long long leftSum = 0;
            for (int j = 0; j <= i; j++) {
                leftSum += nums[j];
            }

            long long rightSum = 0;
            for (int j = i + 1; j < n; j++) {
                rightSum += nums[j];
            }

            if (leftSum >= rightSum) {
                res++;
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
    waysToSplitArray(nums) {
        let n = nums.length;
        let res = 0;

        for (let i = 0; i < n - 1; i++) {
            let leftSum = 0;
            for (let j = 0; j <= i; j++) {
                leftSum += nums[j];
            }

            let rightSum = 0;
            for (let j = i + 1; j < n; j++) {
                rightSum += nums[j];
            }

            if (leftSum >= rightSum) {
                res++;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int WaysToSplitArray(int[] nums) {
        int n = nums.Length;
        int res = 0;

        for (int i = 0; i < n - 1; i++) {
            long leftSum = 0;
            for (int j = 0; j <= i; j++) {
                leftSum += nums[j];
            }

            long rightSum = 0;
            for (int j = i + 1; j < n; j++) {
                rightSum += nums[j];
            }

            if (leftSum >= rightSum) {
                res++;
            }
        }

        return res;
    }
}
```

```go
func waysToSplitArray(nums []int) int {
    n := len(nums)
    res := 0

    for i := 0; i < n-1; i++ {
        leftSum := 0
        for j := 0; j <= i; j++ {
            leftSum += nums[j]
        }

        rightSum := 0
        for j := i + 1; j < n; j++ {
            rightSum += nums[j]
        }

        if leftSum >= rightSum {
            res++
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun waysToSplitArray(nums: IntArray): Int {
        val n = nums.size
        var res = 0

        for (i in 0 until n - 1) {
            var leftSum = 0L
            for (j in 0..i) {
                leftSum += nums[j]
            }

            var rightSum = 0L
            for (j in i + 1 until n) {
                rightSum += nums[j]
            }

            if (leftSum >= rightSum) {
                res++
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func waysToSplitArray(_ nums: [Int]) -> Int {
        let n = nums.count
        var res = 0

        for i in 0..<(n - 1) {
            var leftSum = 0
            for j in 0...i {
                leftSum += nums[j]
            }

            var rightSum = 0
            for j in (i + 1)..<n {
                rightSum += nums[j]
            }

            if leftSum >= rightSum {
                res += 1
            }
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

## 2. Prefix Sum

### Intuition

Recomputing sums from scratch for each split is wasteful. By precomputing a prefix sum array, we can find the sum of any subarray in constant time. The left sum up to index `i` is `prefix[i+1]`, and the right sum is `prefix[n] - prefix[i+1]`.

### Algorithm

1. Build a prefix sum array where `prefix[i]` is the sum of the first `i` elements.
2. For each split index `i` from 1 to `n - 1`:
   - Left sum = `prefix[i]`.
   - Right sum = `prefix[n] - prefix[i]`.
   - If left >= right, increment the result.
3. Return the count.

::tabs-start

```python
class Solution:
    def waysToSplitArray(self, nums: List[int]) -> int:
        n = len(nums)
        prefix = [0] * (n + 1)

        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]

        res = 0
        for i in range(1, n):
            left = prefix[i]
            right = prefix[n] - prefix[i]
            if left >= right:
                res += 1

        return res
```

```java
public class Solution {
    public int waysToSplitArray(int[] nums) {
        int n = nums.length;
        long[] prefix = new long[n + 1];

        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        int res = 0;
        for (int i = 1; i < n; i++) {
            long left = prefix[i];
            long right = prefix[n] - prefix[i];
            if (left >= right) {
                res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int waysToSplitArray(vector<int>& nums) {
        int n = nums.size();
        vector<long long> prefix(n + 1, 0);

        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        int res = 0;
        for (int i = 1; i < n; i++) {
            long long left = prefix[i];
            long long right = prefix[n] - prefix[i];
            if (left >= right) {
                res++;
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
    waysToSplitArray(nums) {
        const n = nums.length;
        const prefix = Array(n + 1).fill(0);

        for (let i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        let res = 0;
        for (let i = 1; i < n; i++) {
            const left = prefix[i];
            const right = prefix[n] - prefix[i];
            if (left >= right) {
                res++;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int WaysToSplitArray(int[] nums) {
        int n = nums.Length;
        long[] prefix = new long[n + 1];

        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        int res = 0;
        for (int i = 1; i < n; i++) {
            long left = prefix[i];
            long right = prefix[n] - prefix[i];
            if (left >= right) {
                res++;
            }
        }

        return res;
    }
}
```

```go
func waysToSplitArray(nums []int) int {
    n := len(nums)
    prefix := make([]int, n+1)

    for i := 0; i < n; i++ {
        prefix[i+1] = prefix[i] + nums[i]
    }

    res := 0
    for i := 1; i < n; i++ {
        left := prefix[i]
        right := prefix[n] - prefix[i]
        if left >= right {
            res++
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun waysToSplitArray(nums: IntArray): Int {
        val n = nums.size
        val prefix = LongArray(n + 1)

        for (i in 0 until n) {
            prefix[i + 1] = prefix[i] + nums[i]
        }

        var res = 0
        for (i in 1 until n) {
            val left = prefix[i]
            val right = prefix[n] - prefix[i]
            if (left >= right) {
                res++
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func waysToSplitArray(_ nums: [Int]) -> Int {
        let n = nums.count
        var prefix = [Int](repeating: 0, count: n + 1)

        for i in 0..<n {
            prefix[i + 1] = prefix[i] + nums[i]
        }

        var res = 0
        for i in 1..<n {
            let left = prefix[i]
            let right = prefix[n] - prefix[i]
            if left >= right {
                res += 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Prefix Sum (Optimal)

### Intuition

We don't need to store the entire prefix sum array. Instead, we can maintain a running left sum and right sum. Start with the right sum as the total, then shift elements from right to left as we iterate through possible split points.

### Algorithm

1. Compute the total sum and assign it to `right`.
2. Initialize `left = 0` and `result = 0`.
3. For each index `i` from 0 to `n - 2`:
   - Add `nums[i]` to `left` and subtract it from `right`.
   - If `left >= right`, increment `result`.
4. Return `result`.

::tabs-start

```python
class Solution:
    def waysToSplitArray(self, nums: List[int]) -> int:
        right = sum(nums)
        left = res = 0

        for i in range(len(nums) - 1):
            left += nums[i]
            right -= nums[i]
            res += 1 if left >= right else 0

        return res
```

```java
public class Solution {
    public int waysToSplitArray(int[] nums) {
        long right = 0, left = 0;
        for (int num : nums) {
            right += num;
        }

        int res = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            left += nums[i];
            right -= nums[i];
            if (left >= right) {
                res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int waysToSplitArray(vector<int>& nums) {
        long long right = 0, left = 0;
        for (int num : nums) {
            right += num;
        }

        int res = 0;
        for (int i = 0; i < nums.size() - 1; i++) {
            left += nums[i];
            right -= nums[i];
            if (left >= right) {
                res++;
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
    waysToSplitArray(nums) {
        let right = nums.reduce((a, b) => a + b, 0);
        let left = 0,
            res = 0;

        for (let i = 0; i < nums.length - 1; i++) {
            left += nums[i];
            right -= nums[i];
            if (left >= right) {
                res++;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int WaysToSplitArray(int[] nums) {
        long right = 0, left = 0;
        foreach (int num in nums) {
            right += num;
        }

        int res = 0;
        for (int i = 0; i < nums.Length - 1; i++) {
            left += nums[i];
            right -= nums[i];
            if (left >= right) {
                res++;
            }
        }

        return res;
    }
}
```

```go
func waysToSplitArray(nums []int) int {
    right := 0
    for _, num := range nums {
        right += num
    }

    left, res := 0, 0
    for i := 0; i < len(nums)-1; i++ {
        left += nums[i]
        right -= nums[i]
        if left >= right {
            res++
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun waysToSplitArray(nums: IntArray): Int {
        var right = nums.fold(0L) { acc, num -> acc + num }
        var left = 0L
        var res = 0

        for (i in 0 until nums.size - 1) {
            left += nums[i]
            right -= nums[i]
            if (left >= right) {
                res++
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func waysToSplitArray(_ nums: [Int]) -> Int {
        var right = nums.reduce(0, +)
        var left = 0
        var res = 0

        for i in 0..<(nums.count - 1) {
            left += nums[i]
            right -= nums[i]
            if left >= right {
                res += 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
