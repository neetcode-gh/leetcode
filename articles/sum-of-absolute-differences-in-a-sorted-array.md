## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Prefix Sums** - Used to compute the sum of elements to the left of each index in O(1) time
- **Suffix Sums** - Used to compute the sum of elements to the right of each index efficiently
- **Sorted Array Properties** - Understanding that in a sorted array, left elements are smaller and right elements are larger eliminates the need for absolute values

---

## 1. Brute Force

### Intuition

For each element, we need to compute the sum of absolute differences with all other elements. Since we need every pair, the straightforward approach is to iterate through every element and compute the difference with every other element, summing them up.

### Algorithm

1. Create a result array `res` of the same size as `nums`.
2. For each index `i`:
   - Initialize `sum = 0`.
   - For each index `j`:
     - Add `|nums[i] - nums[j]|` to `sum`.
   - Store `sum` in `res[i]`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def getSumAbsoluteDifferences(self, nums: List[int]) -> List[int]:
        res = []

        for i in nums:
            sum = 0
            for j in nums:
                sum += abs(i - j)
            res.append(sum)

        return res
```

```java
public class Solution {
    public int[] getSumAbsoluteDifferences(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];

        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = 0; j < n; j++) {
                sum += Math.abs(nums[i] - nums[j]);
            }
            res[i] = sum;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getSumAbsoluteDifferences(vector<int>& nums) {
        int n = nums.size();
        vector<int> res;

        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = 0; j < n; j++) {
                sum += abs(nums[i] - nums[j]);
            }
            res.push_back(sum);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    getSumAbsoluteDifferences(nums) {
        const n = nums.length;
        const res = [];

        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < n; j++) {
                sum += Math.abs(nums[i] - nums[j]);
            }
            res.push(sum);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] GetSumAbsoluteDifferences(int[] nums) {
        int n = nums.Length;
        int[] res = new int[n];

        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (int j = 0; j < n; j++) {
                sum += Math.Abs(nums[i] - nums[j]);
            }
            res[i] = sum;
        }

        return res;
    }
}
```

```go
func getSumAbsoluteDifferences(nums []int) []int {
    n := len(nums)
    res := make([]int, n)

    for i := 0; i < n; i++ {
        sum := 0
        for j := 0; j < n; j++ {
            if nums[i] > nums[j] {
                sum += nums[i] - nums[j]
            } else {
                sum += nums[j] - nums[i]
            }
        }
        res[i] = sum
    }

    return res
}
```

```kotlin
class Solution {
    fun getSumAbsoluteDifferences(nums: IntArray): IntArray {
        val n = nums.size
        val res = IntArray(n)

        for (i in 0 until n) {
            var sum = 0
            for (j in 0 until n) {
                sum += kotlin.math.abs(nums[i] - nums[j])
            }
            res[i] = sum
        }

        return res
    }
}
```

```swift
class Solution {
    func getSumAbsoluteDifferences(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var res = [Int]()

        for i in 0..<n {
            var sum = 0
            for j in 0..<n {
                sum += abs(nums[i] - nums[j])
            }
            res.append(sum)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for the output array.

---

## 2. Prefix & Suffix Sums (Extra Space)

### Intuition

Since the array is sorted, we can remove the absolute value operation. For element at index `i`, all elements to its left are smaller (so we subtract them from `nums[i]`) and all elements to its right are larger (so we subtract `nums[i]` from them). Using prefix and suffix sums, we can compute these contributions efficiently without iterating through every pair.

### Algorithm

1. Build a prefix sum array where `prefix_sum[i]` is the sum of elements from index `0` to `i`.
2. Build a suffix sum array where `suffix_sum[i]` is the sum of elements from index `i` to `n-1`.
3. For each index `i`:
   - Left contribution: `i * nums[i] - prefix_sum[i-1]` (there are `i` elements to the left).
   - Right contribution: `suffix_sum[i+1] - (n - i - 1) * nums[i]` (there are `n - i - 1` elements to the right).
   - Store the sum in `res[i]`.
4. Return `res`.

::tabs-start

```python
class Solution:
    def getSumAbsoluteDifferences(self, nums: List[int]) -> List[int]:
        n = len(nums)
        prefix_sum = [0] * n
        suffix_sum = [0] * n
        res = [0] * n

        prefix_sum[0] = nums[0]
        for i in range(1, n):
            prefix_sum[i] = prefix_sum[i - 1] + nums[i]

        suffix_sum[n - 1] = nums[n - 1]
        for i in range(n - 2, -1, -1):
            suffix_sum[i] = suffix_sum[i + 1] + nums[i]

        for i in range(n):
            left_sum = (i * nums[i]) - (prefix_sum[i - 1] if i > 0 else 0)
            right_sum = (suffix_sum[i + 1] if i < n - 1 else 0) - ((n - i - 1) * nums[i])
            res[i] = left_sum + right_sum

        return res
```

```java
public class Solution {
    public int[] getSumAbsoluteDifferences(int[] nums) {
        int n = nums.length;
        int[] prefixSum = new int[n];
        int[] suffixSum = new int[n];
        int[] res = new int[n];

        prefixSum[0] = nums[0];
        for (int i = 1; i < n; i++) {
            prefixSum[i] = prefixSum[i - 1] + nums[i];
        }

        suffixSum[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            suffixSum[i] = suffixSum[i + 1] + nums[i];
        }

        for (int i = 0; i < n; i++) {
            int leftSum = i > 0 ? (i * nums[i] - prefixSum[i - 1]) : 0;
            int rightSum = i < n - 1 ? (suffixSum[i + 1] - (n - i - 1) * nums[i]) : 0;
            res[i] = leftSum + rightSum;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getSumAbsoluteDifferences(vector<int>& nums) {
        int n = nums.size();
        vector<int> prefixSum(n, 0), suffixSum(n, 0), res(n, 0);

        prefixSum[0] = nums[0];
        for (int i = 1; i < n; i++) {
            prefixSum[i] = prefixSum[i - 1] + nums[i];
        }

        suffixSum[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            suffixSum[i] = suffixSum[i + 1] + nums[i];
        }

        for (int i = 0; i < n; i++) {
            int leftSum = i > 0 ? (i * nums[i] - prefixSum[i - 1]) : 0;
            int rightSum = i < n - 1 ? (suffixSum[i + 1] - (n - i - 1) * nums[i]) : 0;
            res[i] = leftSum + rightSum;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    getSumAbsoluteDifferences(nums) {
        const n = nums.length;
        const prefixSum = Array(n).fill(0);
        const suffixSum = Array(n).fill(0);
        const res = Array(n).fill(0);

        prefixSum[0] = nums[0];
        for (let i = 1; i < n; i++) {
            prefixSum[i] = prefixSum[i - 1] + nums[i];
        }

        suffixSum[n - 1] = nums[n - 1];
        for (let i = n - 2; i >= 0; i--) {
            suffixSum[i] = suffixSum[i + 1] + nums[i];
        }

        for (let i = 0; i < n; i++) {
            const leftSum = i > 0 ? i * nums[i] - prefixSum[i - 1] : 0;
            const rightSum =
                i < n - 1 ? suffixSum[i + 1] - (n - i - 1) * nums[i] : 0;
            res[i] = leftSum + rightSum;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] GetSumAbsoluteDifferences(int[] nums) {
        int n = nums.Length;
        int[] prefixSum = new int[n];
        int[] suffixSum = new int[n];
        int[] res = new int[n];

        prefixSum[0] = nums[0];
        for (int i = 1; i < n; i++) {
            prefixSum[i] = prefixSum[i - 1] + nums[i];
        }

        suffixSum[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            suffixSum[i] = suffixSum[i + 1] + nums[i];
        }

        for (int i = 0; i < n; i++) {
            int leftSum = i > 0 ? (i * nums[i] - prefixSum[i - 1]) : 0;
            int rightSum = i < n - 1 ? (suffixSum[i + 1] - (n - i - 1) * nums[i]) : 0;
            res[i] = leftSum + rightSum;
        }

        return res;
    }
}
```

```go
func getSumAbsoluteDifferences(nums []int) []int {
    n := len(nums)
    prefixSum := make([]int, n)
    suffixSum := make([]int, n)
    res := make([]int, n)

    prefixSum[0] = nums[0]
    for i := 1; i < n; i++ {
        prefixSum[i] = prefixSum[i-1] + nums[i]
    }

    suffixSum[n-1] = nums[n-1]
    for i := n - 2; i >= 0; i-- {
        suffixSum[i] = suffixSum[i+1] + nums[i]
    }

    for i := 0; i < n; i++ {
        leftSum := 0
        if i > 0 {
            leftSum = i*nums[i] - prefixSum[i-1]
        }
        rightSum := 0
        if i < n-1 {
            rightSum = suffixSum[i+1] - (n-i-1)*nums[i]
        }
        res[i] = leftSum + rightSum
    }

    return res
}
```

```kotlin
class Solution {
    fun getSumAbsoluteDifferences(nums: IntArray): IntArray {
        val n = nums.size
        val prefixSum = IntArray(n)
        val suffixSum = IntArray(n)
        val res = IntArray(n)

        prefixSum[0] = nums[0]
        for (i in 1 until n) {
            prefixSum[i] = prefixSum[i - 1] + nums[i]
        }

        suffixSum[n - 1] = nums[n - 1]
        for (i in n - 2 downTo 0) {
            suffixSum[i] = suffixSum[i + 1] + nums[i]
        }

        for (i in 0 until n) {
            val leftSum = if (i > 0) i * nums[i] - prefixSum[i - 1] else 0
            val rightSum = if (i < n - 1) suffixSum[i + 1] - (n - i - 1) * nums[i] else 0
            res[i] = leftSum + rightSum
        }

        return res
    }
}
```

```swift
class Solution {
    func getSumAbsoluteDifferences(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var prefixSum = [Int](repeating: 0, count: n)
        var suffixSum = [Int](repeating: 0, count: n)
        var res = [Int](repeating: 0, count: n)

        prefixSum[0] = nums[0]
        for i in 1..<n {
            prefixSum[i] = prefixSum[i - 1] + nums[i]
        }

        suffixSum[n - 1] = nums[n - 1]
        for i in stride(from: n - 2, through: 0, by: -1) {
            suffixSum[i] = suffixSum[i + 1] + nums[i]
        }

        for i in 0..<n {
            let leftSum = i > 0 ? i * nums[i] - prefixSum[i - 1] : 0
            let rightSum = i < n - 1 ? suffixSum[i + 1] - (n - i - 1) * nums[i] : 0
            res[i] = leftSum + rightSum
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

## 3. Prefix & Suffix Sums

### Intuition

We can reduce space by reusing the result array to store suffix sums initially, then computing the final result in a single pass. We first fill the result array with suffix sums, then iterate from left to right, computing the answer for each position while building the prefix sum on the fly.

### Algorithm

1. Initialize the result array with suffix sums by iterating from right to left.
2. Iterate from left to right, maintaining a running prefix sum:
   - Compute left contribution using the running prefix sum.
   - Compute right contribution using the precomputed suffix sum at `i + 1`.
   - Store the sum in `res[i]`.
   - Update the prefix sum with `nums[i]`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def getSumAbsoluteDifferences(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [0] * n

        res[n - 1] = nums[n - 1]
        for i in range(n - 2, -1, -1):
            res[i] = res[i + 1] + nums[i]

        prefix_sum = 0
        for i in range(n):
            left_sum = (i * nums[i]) - prefix_sum
            right_sum = (res[i + 1] if i < n - 1 else 0) - ((n - i - 1) * nums[i])
            res[i] = left_sum + right_sum
            prefix_sum += nums[i]

        return res
```

```java
public class Solution {
    public int[] getSumAbsoluteDifferences(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];

        res[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            res[i] = res[i + 1] + nums[i];
        }

        int prefixSum = 0;
        for (int i = 0; i < n; i++) {
            int leftSum = i * nums[i] - prefixSum;
            int rightSum = i < n - 1 ? (res[i + 1] - (n - i - 1) * nums[i]) : 0;
            res[i] = leftSum + rightSum;
            prefixSum += nums[i];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getSumAbsoluteDifferences(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 0);

        res[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            res[i] = res[i + 1] + nums[i];
        }

        int prefixSum = 0;
        for (int i = 0; i < n; i++) {
            int leftSum = i * nums[i] - prefixSum;
            int rightSum = i < n - 1 ? (res[i + 1] - (n - i - 1) * nums[i]) : 0;
            res[i] = leftSum + rightSum;
            prefixSum += nums[i];
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    getSumAbsoluteDifferences(nums) {
        const n = nums.length;
        const res = Array(n).fill(0);

        res[n - 1] = nums[n - 1];
        for (let i = n - 2; i >= 0; i--) {
            res[i] = res[i + 1] + nums[i];
        }

        let prefixSum = 0;
        for (let i = 0; i < n; i++) {
            const leftSum = i * nums[i] - prefixSum;
            const rightSum = i < n - 1 ? res[i + 1] - (n - i - 1) * nums[i] : 0;
            res[i] = leftSum + rightSum;
            prefixSum += nums[i];
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] GetSumAbsoluteDifferences(int[] nums) {
        int n = nums.Length;
        int[] res = new int[n];

        res[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            res[i] = res[i + 1] + nums[i];
        }

        int prefixSum = 0;
        for (int i = 0; i < n; i++) {
            int leftSum = i * nums[i] - prefixSum;
            int rightSum = i < n - 1 ? (res[i + 1] - (n - i - 1) * nums[i]) : 0;
            res[i] = leftSum + rightSum;
            prefixSum += nums[i];
        }

        return res;
    }
}
```

```go
func getSumAbsoluteDifferences(nums []int) []int {
    n := len(nums)
    res := make([]int, n)

    res[n-1] = nums[n-1]
    for i := n - 2; i >= 0; i-- {
        res[i] = res[i+1] + nums[i]
    }

    prefixSum := 0
    for i := 0; i < n; i++ {
        leftSum := i*nums[i] - prefixSum
        rightSum := 0
        if i < n-1 {
            rightSum = res[i+1] - (n-i-1)*nums[i]
        }
        res[i] = leftSum + rightSum
        prefixSum += nums[i]
    }

    return res
}
```

```kotlin
class Solution {
    fun getSumAbsoluteDifferences(nums: IntArray): IntArray {
        val n = nums.size
        val res = IntArray(n)

        res[n - 1] = nums[n - 1]
        for (i in n - 2 downTo 0) {
            res[i] = res[i + 1] + nums[i]
        }

        var prefixSum = 0
        for (i in 0 until n) {
            val leftSum = i * nums[i] - prefixSum
            val rightSum = if (i < n - 1) res[i + 1] - (n - i - 1) * nums[i] else 0
            res[i] = leftSum + rightSum
            prefixSum += nums[i]
        }

        return res
    }
}
```

```swift
class Solution {
    func getSumAbsoluteDifferences(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var res = [Int](repeating: 0, count: n)

        res[n - 1] = nums[n - 1]
        for i in stride(from: n - 2, through: 0, by: -1) {
            res[i] = res[i + 1] + nums[i]
        }

        var prefixSum = 0
        for i in 0..<n {
            let leftSum = i * nums[i] - prefixSum
            let rightSum = i < n - 1 ? res[i + 1] - (n - i - 1) * nums[i] : 0
            res[i] = leftSum + rightSum
            prefixSum += nums[i]
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the output array.

---

## 4. Prefix & Suffix Sums (Optimal)

### Intuition

Instead of precomputing a suffix sum array, we can compute both prefix and suffix sums on the fly. We start by computing the total sum, then as we iterate through the array, we maintain a running prefix sum and derive the suffix sum by subtracting from the total. This eliminates the need for a separate preprocessing pass.

### Algorithm

1. Compute `total_sum` of all elements.
2. Initialize `prefix_sum = 0`.
3. For each index `i`:
   - Subtract `nums[i]` from `total_sum` to get the suffix sum of elements after index `i`.
   - Compute left contribution: `i * nums[i] - prefix_sum`.
   - Compute right contribution: `total_sum - (n - i - 1) * nums[i]`.
   - Store the sum in `res[i]`.
   - Add `nums[i]` to `prefix_sum`.
4. Return `res`.

::tabs-start

```python
class Solution:
    def getSumAbsoluteDifferences(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [0] * n

        total_sum = sum(nums)
        prefix_sum = 0

        for i, num in enumerate(nums):
            total_sum -= nums[i]
            left_sum = i * nums[i] - prefix_sum
            right_sum = total_sum - (n - i - 1) * nums[i]
            res[i] = left_sum + right_sum
            prefix_sum += nums[i]

        return res
```

```java
public class Solution {
    public int[] getSumAbsoluteDifferences(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];

        int totalSum = 0, prefixSum = 0;
        for (int num : nums) {
            totalSum += num;
        }

        for (int i = 0; i < n; i++) {
            totalSum -= nums[i];
            int leftSum = i * nums[i] - prefixSum;
            int rightSum = totalSum - (n - i - 1) * nums[i];
            res[i] = leftSum + rightSum;
            prefixSum += nums[i];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getSumAbsoluteDifferences(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 0);

        int totalSum = 0, prefixSum = 0;
        for (int& num : nums) {
            totalSum += num;
        }

        for (int i = 0; i < n; i++) {
            totalSum -= nums[i];
            int leftSum = i * nums[i] - prefixSum;
            int rightSum = totalSum - (n - i - 1) * nums[i];
            res[i] = leftSum + rightSum;
            prefixSum += nums[i];
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    getSumAbsoluteDifferences(nums) {
        const n = nums.length;
        const res = Array(n).fill(0);

        let totalSum = nums.reduce((sum, num) => sum + num, 0);
        let prefixSum = 0;

        for (let i = 0; i < n; i++) {
            totalSum -= nums[i];
            const leftSum = i * nums[i] - prefixSum;
            const rightSum = totalSum - (n - i - 1) * nums[i];
            res[i] = leftSum + rightSum;
            prefixSum += nums[i];
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] GetSumAbsoluteDifferences(int[] nums) {
        int n = nums.Length;
        int[] res = new int[n];

        int totalSum = 0, prefixSum = 0;
        foreach (int num in nums) {
            totalSum += num;
        }

        for (int i = 0; i < n; i++) {
            totalSum -= nums[i];
            int leftSum = i * nums[i] - prefixSum;
            int rightSum = totalSum - (n - i - 1) * nums[i];
            res[i] = leftSum + rightSum;
            prefixSum += nums[i];
        }

        return res;
    }
}
```

```go
func getSumAbsoluteDifferences(nums []int) []int {
    n := len(nums)
    res := make([]int, n)

    totalSum := 0
    for _, num := range nums {
        totalSum += num
    }

    prefixSum := 0
    for i := 0; i < n; i++ {
        totalSum -= nums[i]
        leftSum := i*nums[i] - prefixSum
        rightSum := totalSum - (n-i-1)*nums[i]
        res[i] = leftSum + rightSum
        prefixSum += nums[i]
    }

    return res
}
```

```kotlin
class Solution {
    fun getSumAbsoluteDifferences(nums: IntArray): IntArray {
        val n = nums.size
        val res = IntArray(n)

        var totalSum = nums.sum()
        var prefixSum = 0

        for (i in 0 until n) {
            totalSum -= nums[i]
            val leftSum = i * nums[i] - prefixSum
            val rightSum = totalSum - (n - i - 1) * nums[i]
            res[i] = leftSum + rightSum
            prefixSum += nums[i]
        }

        return res
    }
}
```

```swift
class Solution {
    func getSumAbsoluteDifferences(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var res = [Int](repeating: 0, count: n)

        var totalSum = nums.reduce(0, +)
        var prefixSum = 0

        for i in 0..<n {
            totalSum -= nums[i]
            let leftSum = i * nums[i] - prefixSum
            let rightSum = totalSum - (n - i - 1) * nums[i]
            res[i] = leftSum + rightSum
            prefixSum += nums[i]
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the output array.

---

## Common Pitfalls

### Not Leveraging the Sorted Property

Since the array is sorted, elements to the left of index `i` are always smaller or equal, and elements to the right are always larger or equal. A common mistake is using `abs()` for every pair when the sorted property allows us to eliminate the absolute value operation entirely by subtracting left elements from `nums[i]` and subtracting `nums[i]` from right elements.

### Incorrect Prefix/Suffix Sum Formula

When computing contributions from left and right elements, the formula involves both the count of elements and their sum. For left contribution, it should be `i * nums[i] - prefixSum[i-1]` (not just the sum). Similarly, for right contribution, it should be `suffixSum[i+1] - (n - i - 1) * nums[i]`. Mixing up these multipliers leads to wrong results.

### Index Out of Bounds at Array Edges

The first element has no left neighbors, and the last element has no right neighbors. Failing to handle these boundary cases by checking `i > 0` before accessing `prefixSum[i-1]` or `i < n-1` before accessing `suffixSum[i+1]` causes index out of bounds errors. Always initialize edge contributions to zero.
