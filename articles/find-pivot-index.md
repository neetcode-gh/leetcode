## 1. Brute Force

### Intuition

The pivot index is where the sum of elements to the left equals the sum of elements to the right. The most straightforward approach is to check each index by computing both sums from scratch. For every potential pivot, sum all elements before it and all elements after it, then compare.

### Algorithm

1. Iterate through each index `i` from `0` to `n-1`.
2. For each index:
   - Compute the left sum by adding all elements before index `i`.
   - Compute the right sum by adding all elements after index `i`.
   - If the two sums are equal, return `i`.
3. If no pivot is found, return `-1`.

::tabs-start

```python
class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        n = len(nums)
        for i in range(n):
            leftSum = rightSum = 0
            for l in range(i):
                leftSum += nums[l]
            for r in range(i + 1, n):
                rightSum += nums[r]
            if leftSum == rightSum:
                return i
        return -1
```

```java
public class Solution {
    public int pivotIndex(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            int leftSum = 0, rightSum = 0;
            for (int l = 0; l < i; l++) {
                leftSum += nums[l];
            }
            for (int r = i + 1; r < n; r++) {
                rightSum += nums[r];
            }
            if (leftSum == rightSum) {
                return i;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            int leftSum = 0, rightSum = 0;
            for (int l = 0; l < i; l++) {
                leftSum += nums[l];
            }
            for (int r = i + 1; r < n; r++) {
                rightSum += nums[r];
            }
            if (leftSum == rightSum) {
                return i;
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    pivotIndex(nums) {
        const n = nums.length;
        for (let i = 0; i < n; i++) {
            let leftSum = 0,
                rightSum = 0;
            for (let l = 0; l < i; l++) {
                leftSum += nums[l];
            }
            for (let r = i + 1; r < n; r++) {
                rightSum += nums[r];
            }
            if (leftSum === rightSum) {
                return i;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int PivotIndex(int[] nums) {
        int n = nums.Length;
        for (int i = 0; i < n; i++) {
            int leftSum = 0, rightSum = 0;
            for (int l = 0; l < i; l++) {
                leftSum += nums[l];
            }
            for (int r = i + 1; r < n; r++) {
                rightSum += nums[r];
            }
            if (leftSum == rightSum) {
                return i;
            }
        }
        return -1;
    }
}
```

```go
func pivotIndex(nums []int) int {
    n := len(nums)
    for i := 0; i < n; i++ {
        leftSum, rightSum := 0, 0
        for l := 0; l < i; l++ {
            leftSum += nums[l]
        }
        for r := i + 1; r < n; r++ {
            rightSum += nums[r]
        }
        if leftSum == rightSum {
            return i
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun pivotIndex(nums: IntArray): Int {
        val n = nums.size
        for (i in 0 until n) {
            var leftSum = 0
            var rightSum = 0
            for (l in 0 until i) {
                leftSum += nums[l]
            }
            for (r in i + 1 until n) {
                rightSum += nums[r]
            }
            if (leftSum == rightSum) {
                return i
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func pivotIndex(_ nums: [Int]) -> Int {
        let n = nums.count
        for i in 0..<n {
            var leftSum = 0
            var rightSum = 0
            for l in 0..<i {
                leftSum += nums[l]
            }
            for r in (i + 1)..<n {
                rightSum += nums[r]
            }
            if leftSum == rightSum {
                return i
            }
        }
        return -1
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

We can avoid recomputing sums repeatedly by precomputing a prefix sum array. The prefix sum at index `i` represents the sum of all elements from index `0` to `i-1`. With this, the left sum at any index is simply `prefixSum[i]`, and the right sum is `prefixSum[n] - prefixSum[i+1]`. This reduces each lookup to constant time.

### Algorithm

1. Build a prefix sum array where `prefixSum[i+1] = prefixSum[i] + nums[i]`.
2. For each index `i`:
   - Left sum = `prefixSum[i]`.
   - Right sum = `prefixSum[n] - prefixSum[i+1]`.
   - If they are equal, return `i`.
3. If no pivot is found, return `-1`.

::tabs-start

```python
class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        n = len(nums)
        prefixSum = [0] * (n + 1)
        for i in range(n):
            prefixSum[i + 1] = prefixSum[i] + nums[i]

        for i in range(n):
            leftSum = prefixSum[i]
            rightSum = prefixSum[n] - prefixSum[i + 1]
            if leftSum == rightSum:
                return i
        return -1
```

```java
public class Solution {
    public int pivotIndex(int[] nums) {
        int n = nums.length;
        int[] prefixSum = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        for (int i = 0; i < n; i++) {
            int leftSum = prefixSum[i];
            int rightSum = prefixSum[n] - prefixSum[i + 1];
            if (leftSum == rightSum) {
                return i;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int n = nums.size();
        vector<int> prefixSum(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        for (int i = 0; i < n; i++) {
            int leftSum = prefixSum[i];
            int rightSum = prefixSum[n] - prefixSum[i + 1];
            if (leftSum == rightSum) {
                return i;
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    pivotIndex(nums) {
        const n = nums.length;
        const prefixSum = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        for (let i = 0; i < n; i++) {
            const leftSum = prefixSum[i];
            const rightSum = prefixSum[n] - prefixSum[i + 1];
            if (leftSum === rightSum) {
                return i;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int PivotIndex(int[] nums) {
        int n = nums.Length;
        int[] prefixSum = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }
        for (int i = 0; i < n; i++) {
            int leftSum = prefixSum[i];
            int rightSum = prefixSum[n] - prefixSum[i + 1];
            if (leftSum == rightSum) {
                return i;
            }
        }
        return -1;
    }
}
```

```go
func pivotIndex(nums []int) int {
    n := len(nums)
    prefixSum := make([]int, n+1)
    for i := 0; i < n; i++ {
        prefixSum[i+1] = prefixSum[i] + nums[i]
    }

    for i := 0; i < n; i++ {
        leftSum := prefixSum[i]
        rightSum := prefixSum[n] - prefixSum[i+1]
        if leftSum == rightSum {
            return i
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun pivotIndex(nums: IntArray): Int {
        val n = nums.size
        val prefixSum = IntArray(n + 1)
        for (i in 0 until n) {
            prefixSum[i + 1] = prefixSum[i] + nums[i]
        }

        for (i in 0 until n) {
            val leftSum = prefixSum[i]
            val rightSum = prefixSum[n] - prefixSum[i + 1]
            if (leftSum == rightSum) {
                return i
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func pivotIndex(_ nums: [Int]) -> Int {
        let n = nums.count
        var prefixSum = [Int](repeating: 0, count: n + 1)
        for i in 0..<n {
            prefixSum[i + 1] = prefixSum[i] + nums[i]
        }

        for i in 0..<n {
            let leftSum = prefixSum[i]
            let rightSum = prefixSum[n] - prefixSum[i + 1]
            if leftSum == rightSum {
                return i
            }
        }
        return -1
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

We can eliminate the need for a separate prefix sum array by maintaining a running left sum and computing the right sum on the fly. First, calculate the total sum of the array. As we iterate, the right sum at any index equals `total - leftSum - nums[i]`. We update `leftSum` after each comparison, keeping space usage constant.

### Algorithm

1. Compute the total sum of the array.
2. Initialize `leftSum = 0`.
3. For each index `i`:
   - Compute `rightSum = total - leftSum - nums[i]`.
   - If `leftSum == rightSum`, return `i`.
   - Add `nums[i]` to `leftSum`.
4. If no pivot is found, return `-1`.

::tabs-start

```python
class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        total = sum(nums)
        leftSum = 0
        for i in range(len(nums)):
            rightSum = total - nums[i] - leftSum
            if leftSum == rightSum:
                return i
            leftSum += nums[i]
        return -1
```

```java
public class Solution {
    public int pivotIndex(int[] nums) {
        int total = 0;
        for (int num : nums) {
            total += num;
        }

        int leftSum = 0;
        for (int i = 0; i < nums.length; i++) {
            int rightSum = total - leftSum - nums[i];
            if (leftSum == rightSum) {
                return i;
            }
            leftSum += nums[i];
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int total = 0;
        for (int num : nums) {
            total += num;
        }

        int leftSum = 0;
        for (int i = 0; i < nums.size(); i++) {
            int rightSum = total - leftSum - nums[i];
            if (leftSum == rightSum) {
                return i;
            }
            leftSum += nums[i];
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    pivotIndex(nums) {
        let total = 0;
        for (let num of nums) {
            total += num;
        }

        let leftSum = 0;
        for (let i = 0; i < nums.length; i++) {
            let rightSum = total - leftSum - nums[i];
            if (leftSum === rightSum) {
                return i;
            }
            leftSum += nums[i];
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int PivotIndex(int[] nums) {
        int total = 0;
        foreach (int num in nums) {
            total += num;
        }
        int leftSum = 0;
        for (int i = 0; i < nums.Length; i++) {
            int rightSum = total - nums[i] - leftSum;
            if (leftSum == rightSum) {
                return i;
            }
            leftSum += nums[i];
        }
        return -1;
    }
}
```

```go
func pivotIndex(nums []int) int {
    total := 0
    for _, num := range nums {
        total += num
    }

    leftSum := 0
    for i := 0; i < len(nums); i++ {
        rightSum := total - leftSum - nums[i]
        if leftSum == rightSum {
            return i
        }
        leftSum += nums[i]
    }
    return -1
}
```

```kotlin
class Solution {
    fun pivotIndex(nums: IntArray): Int {
        var total = 0
        for (num in nums) {
            total += num
        }

        var leftSum = 0
        for (i in nums.indices) {
            val rightSum = total - leftSum - nums[i]
            if (leftSum == rightSum) {
                return i
            }
            leftSum += nums[i]
        }
        return -1
    }
}
```

```swift
class Solution {
    func pivotIndex(_ nums: [Int]) -> Int {
        var total = 0
        for num in nums {
            total += num
        }

        var leftSum = 0
        for i in 0..<nums.count {
            let rightSum = total - leftSum - nums[i]
            if leftSum == rightSum {
                return i
            }
            leftSum += nums[i]
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

## Common Pitfalls

### Confusing Empty Sum as Zero

When the pivot is at index 0, the left sum is 0 (sum of no elements). Similarly, when the pivot is at the last index, the right sum is 0. Some solutions incorrectly skip checking the first or last index, assuming a pivot must have elements on both sides. The problem defines sums of empty ranges as 0, so boundary indices are valid pivot candidates.

### Including the Pivot Element in the Sum

The pivot index itself should not be included in either the left sum or the right sum. A common mistake is computing `leftSum` as the sum up to and including index `i`, or computing `rightSum` starting from index `i`. The correct formula is `rightSum = total - leftSum - nums[i]`, which explicitly excludes the pivot element from both sums.
