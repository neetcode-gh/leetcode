## 1. Brute Force

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
