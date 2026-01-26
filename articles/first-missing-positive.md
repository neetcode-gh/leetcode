## Prerequisites
Before attempting this problem, you should be comfortable with:
- **In-Place Array Modification** - Using the input array itself as auxiliary storage to achieve O(1) space
- **Cycle Sort** - Placing elements at their "correct" indices through swapping
- **Index Mapping** - Understanding that value `v` should be at index `v-1` for positive integers
- **Negative Marking Technique** - Using the sign of array elements as boolean flags

---

## 1. Brute Force

### Intuition

The simplest way to find the first missing positive is to just check each positive integer one by one.
We start with `1`, scan the entire array looking for it, and if we find it, move on to `2`, then `3`, and so on.
The first number we can't find in the array is our answer.

This works because we're guaranteed the answer exists somewhere between `1` and `n + 1` (where `n` is the array size). In the worst case, if the array contains exactly `[1, 2, 3, ..., n]`, the answer would be `n + 1`.

### Algorithm

1. Start with `missing = 1`.
2. Search the entire array for `missing`.
3. If found, increment `missing` and repeat.
4. If not found, return `missing`.

::tabs-start

```python
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        missing = 1
        while True:
            flag = True
            for num in nums:
                if missing == num:
                    flag = False
                    break

            if flag:
                return missing
            missing += 1
```

```java
public class Solution {
    public int firstMissingPositive(int[] nums) {
        int missing = 1;
        while (true) {
            boolean flag = true;
            for (int num : nums) {
                if (missing == num) {
                    flag = false;
                    break;
                }
            }
            if (flag) return missing;
            missing++;
        }
    }
}
```

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int missing = 1;
        while (true) {
            bool flag = true;
            for (int& num : nums) {
                if (missing == num) {
                    flag = false;
                    break;
                }
            }
            if (flag) return missing;
            missing++;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    firstMissingPositive(nums) {
        let missing = 1;
        while (true) {
            let flag = true;
            for (let num of nums) {
                if (missing === num) {
                    flag = false;
                    break;
                }
            }
            if (flag) return missing;
            missing++;
        }
    }
}
```

```csharp
public class Solution {
    public int FirstMissingPositive(int[] nums) {
        int missing = 1;

        while (true) {
            bool found = false;

            foreach (int num in nums) {
                if (num == missing) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                return missing;
            }

            missing++;
        }
    }
}
```

```go
func firstMissingPositive(nums []int) int {
    missing := 1
    for {
        flag := true
        for _, num := range nums {
            if missing == num {
                flag = false
                break
            }
        }
        if flag {
            return missing
        }
        missing++
    }
}
```

```kotlin
class Solution {
    fun firstMissingPositive(nums: IntArray): Int {
        var missing = 1
        while (true) {
            var flag = true
            for (num in nums) {
                if (missing == num) {
                    flag = false
                    break
                }
            }
            if (flag) return missing
            missing++
        }
    }
}
```

```swift
class Solution {
    func firstMissingPositive(_ nums: [Int]) -> Int {
        var missing = 1
        while true {
            var flag = true
            for num in nums {
                if missing == num {
                    flag = false
                    break
                }
            }
            if flag {
                return missing
            }
            missing += 1
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Boolean Array

### Intuition

Here's a key observation: if the array has `n` elements, the answer must be in the range `[1, n + 1]`.
Why? Because even if the array contains `n` distinct positive integers, they can at most cover `1` through `n`, making `n + 1` the answer.

So we only care about numbers from `1` to `n`. We can create a boolean array of size `n` where `seen[i]` tells us whether `i + 1` exists in the input. Then we just find the first index that's still `false`.

### Algorithm

1. Create a boolean array `seen` of size `n`, initialized to `false`.
2. For each number in the input:
   - If it's between `1` and `n`, mark `seen[num - 1] = true`.
3. Scan `seen` from index `0` to `n - 1`:
   - Return `i + 1` for the first `false` entry.
4. If all entries are `true`, return `n + 1`.

::tabs-start

```python
class Solution:
    def firstMissingPositive(self, nums: list[int]) -> int:
        n = len(nums)
        seen = [False] * n
        for num in nums:
            if num > 0 and num <= n:
                seen[num - 1] = True

        for num in range(1, n + 1):
            if not seen[num - 1]:
                return num

        return n + 1
```

```java
public class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        boolean[] seen = new boolean[n];

        for (int num : nums) {
            if (num > 0 && num <= n) {
                seen[num - 1] = true;
            }
        }

        for (int i = 0; i < n; i++) {
            if (!seen[i]) {
                return i + 1;
            }
        }

        return n + 1;
    }
}
```

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        vector<bool> seen(n, false);

        for (int num : nums) {
            if (num > 0 && num <= n) {
                seen[num - 1] = true;
            }
        }

        for (int i = 0; i < n; i++) {
            if (!seen[i]) {
                return i + 1;
            }
        }

        return n + 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    firstMissingPositive(nums) {
        const n = nums.length;
        const seen = new Array(n).fill(false);

        for (const num of nums) {
            if (num > 0 && num <= n) {
                seen[num - 1] = true;
            }
        }

        for (let i = 0; i < n; i++) {
            if (!seen[i]) {
                return i + 1;
            }
        }

        return n + 1;
    }
}
```

```csharp
public class Solution {
    public int FirstMissingPositive(int[] nums) {
        int n = nums.Length;
        bool[] seen = new bool[n];

        foreach (int num in nums) {
            if (num > 0 && num <= n) {
                seen[num - 1] = true;
            }
        }

        for (int num = 1; num <= n; num++) {
            if (!seen[num - 1]) {
                return num;
            }
        }

        return n + 1;
    }
}
```

```go
func firstMissingPositive(nums []int) int {
    n := len(nums)
    seen := make([]bool, n)

    for _, num := range nums {
        if num > 0 && num <= n {
            seen[num-1] = true
        }
    }

    for i := 0; i < n; i++ {
        if !seen[i] {
            return i + 1
        }
    }

    return n + 1
}
```

```kotlin
class Solution {
    fun firstMissingPositive(nums: IntArray): Int {
        val n = nums.size
        val seen = BooleanArray(n)

        for (num in nums) {
            if (num > 0 && num <= n) {
                seen[num - 1] = true
            }
        }

        for (i in 0 until n) {
            if (!seen[i]) {
                return i + 1
            }
        }

        return n + 1
    }
}
```

```swift
class Solution {
    func firstMissingPositive(_ nums: [Int]) -> Int {
        let n = nums.count
        var seen = [Bool](repeating: false, count: n)

        for num in nums {
            if num > 0 && num <= n {
                seen[num - 1] = true
            }
        }

        for i in 0..<n {
            if !seen[i] {
                return i + 1
            }
        }

        return n + 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Sorting

### Intuition

If the array is sorted, finding the first missing positive becomes straightforward.
We walk through the sorted array while tracking the smallest positive integer we're looking for.
Whenever we see that number, we increment our target. The first target we don't find is the answer.

We skip negative numbers and zeros since they don't affect our search. Duplicates are also handled naturally since we only increment when we find an exact match.

### Algorithm

1. Sort the array.
2. Initialize `missing = 1`.
3. For each number in the sorted array:
   - If `num` is positive and equals `missing`, increment `missing`.
4. Return `missing`.

::tabs-start

```python
class Solution:
    def firstMissingPositive(self, nums: list[int]) -> int:
        nums.sort()
        missing = 1
        for num in nums:
            if num > 0 and missing == num:
                missing += 1
        return missing
```

```java
public class Solution {
    public int firstMissingPositive(int[] nums) {
        Arrays.sort(nums);
        int missing = 1;
        for (int num : nums) {
            if (num > 0 && missing == num) {
                missing++;
            }
        }
        return missing;
    }
}
```

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int missing = 1;
        for (int num : nums) {
            if (num > 0 && missing == num) {
                missing++;
            }
        }
        return missing;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    firstMissingPositive(nums) {
        nums.sort((a, b) => a - b);
        let missing = 1;
        for (const num of nums) {
            if (num > 0 && missing === num) {
                missing++;
            }
        }
        return missing;
    }
}
```

```csharp
public class Solution {
    public int FirstMissingPositive(int[] nums) {
        Array.Sort(nums);
        int missing = 1;

        foreach (int num in nums) {
            if (num > 0 && num == missing) {
                missing++;
            }
        }

        return missing;
    }
}
```

```go
func firstMissingPositive(nums []int) int {
    sort.Ints(nums)
    missing := 1
    for _, num := range nums {
        if num > 0 && missing == num {
            missing++
        }
    }
    return missing
}
```

```kotlin
class Solution {
    fun firstMissingPositive(nums: IntArray): Int {
        nums.sort()
        var missing = 1
        for (num in nums) {
            if (num > 0 && missing == num) {
                missing++
            }
        }
        return missing
    }
}
```

```swift
class Solution {
    func firstMissingPositive(_ nums: [Int]) -> Int {
        let sorted = nums.sorted()
        var missing = 1
        for num in sorted {
            if num > 0 && missing == num {
                missing += 1
            }
        }
        return missing
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 4. Negative Marking

### Intuition

Can we achieve O(1) space without sorting? Yes, by using the input array itself as our hash map.

The idea is to use the sign of each element as a flag. If the value at index `i` is negative, it means `i + 1` exists in the array. But there's a catch: the array might already contain negative numbers or zeros, which would interfere with our marking scheme.

So we first convert all non-positive numbers to `0`. Then for each value `v` in the range `[1, n]`, we mark the element at index `v - 1` as negative. If it's already `0`, we use a special marker `-(n + 1)` to indicate presence while keeping it distinguishable.

Finally, the first non-negative index tells us which number is missing.

### Algorithm

1. Replace all negative numbers with `0`.
2. For each number `val` (using absolute value to handle already-marked cells):
   - If `1 <= val <= n`:
     - If `nums[val - 1] > 0`, negate it.
     - If `nums[val - 1] == 0`, set it to `-(n + 1)`.
3. Find the first index where `nums[i] >= 0` and return `i + 1`.
4. If no such index exists, return `n + 1`.

::tabs-start

```python
class Solution:
    def firstMissingPositive(self, nums: list[int]) -> int:
        for i in range(len(nums)):
            if nums[i] < 0:
                nums[i] = 0

        for i in range(len(nums)):
            val = abs(nums[i])
            if 1 <= val <= len(nums):
                if nums[val - 1] > 0:
                    nums[val - 1] *= -1
                elif nums[val - 1] == 0:
                    nums[val - 1] = -1 * (len(nums) + 1)

        for i in range(1, len(nums) + 1):
            if nums[i - 1] >= 0:
                return i

        return len(nums) + 1
```

```java
public class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            if (nums[i] < 0) {
                nums[i] = 0;
            }
        }

        for (int i = 0; i < n; i++) {
            int val = Math.abs(nums[i]);
            if (val >= 1 && val <= n) {
                if (nums[val - 1] > 0) {
                    nums[val - 1] *= -1;
                } else if (nums[val - 1] == 0) {
                    nums[val - 1] = -1 * (n + 1);
                }
            }
        }

        for (int i = 1; i <= n; i++) {
            if (nums[i - 1] >= 0) {
                return i;
            }
        }

        return n + 1;
    }
}
```

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();

        for (int i = 0; i < n; i++) {
            if (nums[i] < 0) {
                nums[i] = 0;
            }
        }

        for (int i = 0; i < n; i++) {
            int val = abs(nums[i]);
            if (val >= 1 && val <= n) {
                if (nums[val - 1] > 0) {
                    nums[val - 1] *= -1;
                } else if (nums[val - 1] == 0) {
                    nums[val - 1] = -1 * (n + 1);
                }
            }
        }

        for (int i = 1; i <= n; i++) {
            if (nums[i - 1] >= 0) {
                return i;
            }
        }

        return n + 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    firstMissingPositive(nums) {
        const n = nums.length;

        for (let i = 0; i < n; i++) {
            if (nums[i] < 0) {
                nums[i] = 0;
            }
        }

        for (let i = 0; i < n; i++) {
            const val = Math.abs(nums[i]);
            if (val >= 1 && val <= n) {
                if (nums[val - 1] > 0) {
                    nums[val - 1] *= -1;
                } else if (nums[val - 1] === 0) {
                    nums[val - 1] = -1 * (n + 1);
                }
            }
        }

        for (let i = 1; i <= n; i++) {
            if (nums[i - 1] >= 0) {
                return i;
            }
        }

        return n + 1;
    }
}
```

```csharp
public class Solution {
    public int FirstMissingPositive(int[] nums) {
        int n = nums.Length;

        for (int i = 0; i < n; i++) {
            if (nums[i] < 0) {
                nums[i] = 0;
            }
        }

        for (int i = 0; i < n; i++) {
            int val = Math.Abs(nums[i]);
            if (val >= 1 && val <= n) {
                if (nums[val - 1] > 0) {
                    nums[val - 1] *= -1;
                } else if (nums[val - 1] == 0) {
                    nums[val - 1] = -(n + 1);
                }
            }
        }

        for (int i = 0; i < n; i++) {
            if (nums[i] >= 0) {
                return i + 1;
            }
        }

        return n + 1;
    }
}
```

```go
func firstMissingPositive(nums []int) int {
    n := len(nums)

    for i := 0; i < n; i++ {
        if nums[i] < 0 {
            nums[i] = 0
        }
    }

    for i := 0; i < n; i++ {
        val := nums[i]
        if val < 0 {
            val = -val
        }
        if val >= 1 && val <= n {
            if nums[val-1] > 0 {
                nums[val-1] *= -1
            } else if nums[val-1] == 0 {
                nums[val-1] = -(n + 1)
            }
        }
    }

    for i := 0; i < n; i++ {
        if nums[i] >= 0 {
            return i + 1
        }
    }

    return n + 1
}
```

```kotlin
class Solution {
    fun firstMissingPositive(nums: IntArray): Int {
        val n = nums.size

        for (i in 0 until n) {
            if (nums[i] < 0) {
                nums[i] = 0
            }
        }

        for (i in 0 until n) {
            val value = kotlin.math.abs(nums[i])
            if (value in 1..n) {
                if (nums[value - 1] > 0) {
                    nums[value - 1] *= -1
                } else if (nums[value - 1] == 0) {
                    nums[value - 1] = -(n + 1)
                }
            }
        }

        for (i in 0 until n) {
            if (nums[i] >= 0) {
                return i + 1
            }
        }

        return n + 1
    }
}
```

```swift
class Solution {
    func firstMissingPositive(_ nums: [Int]) -> Int {
        var nums = nums
        let n = nums.count

        for i in 0..<n {
            if nums[i] < 0 {
                nums[i] = 0
            }
        }

        for i in 0..<n {
            let val = abs(nums[i])
            if val >= 1 && val <= n {
                if nums[val - 1] > 0 {
                    nums[val - 1] *= -1
                } else if nums[val - 1] == 0 {
                    nums[val - 1] = -(n + 1)
                }
            }
        }

        for i in 0..<n {
            if nums[i] >= 0 {
                return i + 1
            }
        }

        return n + 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 5. Cycle Sort

### Intuition

Another way to use the array as its own hash map is through cycle sort. The goal is to place each number at its "correct" index: value `1` at index `0`, value `2` at index `1`, and so on.

We iterate through the array, and for each element, if it's a valid positive number in range `[1, n]` and not already in its correct position, we swap it to where it belongs. We keep swapping until the current position holds the right value or an out-of-range number.

After this rearrangement, we scan the array. The first position where `nums[i] != i + 1` gives us the missing number.

### Algorithm

1. Iterate through the array with index `i`:
   - While `nums[i]` is in range `[1, n]` and `nums[i] != nums[nums[i] - 1]`:
     - Swap `nums[i]` with `nums[nums[i] - 1]`.
2. Scan the array:
   - Return `i + 1` for the first index where `nums[i] != i + 1`.
3. If all positions are correct, return `n + 1`.

::tabs-start

```python
class Solution:
    def firstMissingPositive(self, nums: list[int]) -> int:
        n = len(nums)
        i = 0
        while i < n:
            if nums[i] <= 0 or nums[i] > n:
                i += 1
                continue

            index = nums[i] - 1
            if nums[i] != nums[index]:
                nums[i], nums[index] = nums[index], nums[i]
            else:
                i += 1

        for i in range(n):
            if nums[i] != i + 1:
                return i + 1

        return n + 1
```

```java
public class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        int i = 0;

        while (i < n) {
            if (nums[i] <= 0 || nums[i] > n) {
                i++;
                continue;
            }
            int index = nums[i] - 1;
            if (nums[i] != nums[index]) {
                int temp = nums[i];
                nums[i] = nums[index];
                nums[index] = temp;
            } else {
                i++;
            }
        }

        for (i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }

        return n + 1;
    }
}
```

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        int i = 0;

        while (i < n) {
            if (nums[i] <= 0 || nums[i] > n) {
                i++;
                continue;
            }
            int index = nums[i] - 1;
            if (nums[i] != nums[index]) {
                swap(nums[i], nums[index]);
            } else {
                i++;
            }
        }

        for (i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }

        return n + 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    firstMissingPositive(nums) {
        let n = nums.length;
        let i = 0;
        while (i < n) {
            if (nums[i] <= 0 || nums[i] > n) {
                i++;
                continue;
            }
            let index = nums[i] - 1;
            if (nums[i] != nums[index]) {
                [nums[i], nums[index]] = [nums[index], nums[i]];
            } else {
                i++;
            }
        }

        for (let i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }

        return n + 1;
    }
}
```

```csharp
public class Solution {
    public int FirstMissingPositive(int[] nums) {
        int n = nums.Length;
        int i = 0;

        while (i < n) {
            if (nums[i] <= 0 || nums[i] > n) {
                i++;
                continue;
            }

            int index = nums[i] - 1;
            if (nums[i] != nums[index]) {
                int temp = nums[i];
                nums[i] = nums[index];
                nums[index] = temp;
            } else {
                i++;
            }
        }

        for (i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }

        return n + 1;
    }
}
```

```go
func firstMissingPositive(nums []int) int {
    n := len(nums)
    i := 0

    for i < n {
        if nums[i] <= 0 || nums[i] > n {
            i++
            continue
        }

        index := nums[i] - 1
        if nums[i] != nums[index] {
            nums[i], nums[index] = nums[index], nums[i]
        } else {
            i++
        }
    }

    for i := 0; i < n; i++ {
        if nums[i] != i+1 {
            return i + 1
        }
    }

    return n + 1
}
```

```kotlin
class Solution {
    fun firstMissingPositive(nums: IntArray): Int {
        val n = nums.size
        var i = 0

        while (i < n) {
            if (nums[i] <= 0 || nums[i] > n) {
                i++
                continue
            }

            val index = nums[i] - 1
            if (nums[i] != nums[index]) {
                val temp = nums[i]
                nums[i] = nums[index]
                nums[index] = temp
            } else {
                i++
            }
        }

        for (i in 0 until n) {
            if (nums[i] != i + 1) {
                return i + 1
            }
        }

        return n + 1
    }
}
```

```swift
class Solution {
    func firstMissingPositive(_ nums: [Int]) -> Int {
        var nums = nums
        let n = nums.count
        var i = 0

        while i < n {
            if nums[i] <= 0 || nums[i] > n {
                i += 1
                continue
            }

            let index = nums[i] - 1
            if nums[i] != nums[index] {
                nums.swapAt(i, index)
            } else {
                i += 1
            }
        }

        for i in 0..<n {
            if nums[i] != i + 1 {
                return i + 1
            }
        }

        return n + 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Forgetting the Answer is Bounded by n+1

The first missing positive is always in the range `[1, n+1]`. Many solutions fail by not recognizing this constraint and trying to handle arbitrarily large numbers. If the array contains `[1, 2, ..., n]`, the answer is `n+1`. This insight is crucial for achieving O(n) time and O(1) space.

### Not Handling Negative Numbers and Zeros

The array can contain negative numbers, zeros, and duplicates. Solutions that use the array itself as a hash map (via negative marking or cycle sort) must first handle or ignore non-positive values. Forgetting to skip or neutralize these values leads to index-out-of-bounds errors or incorrect markings.

### Infinite Loops in Cycle Sort

When using cycle sort, failing to check if `nums[i] != nums[nums[i] - 1]` before swapping causes infinite loops. If the current element equals the element at its target position (duplicate case), you must move forward instead of swapping. Always verify both the value is in range and the target position needs updating.

### Corrupting Original Values Before Using Them

In negative marking approaches, reading `nums[i]` after it has been negated gives the wrong value. Always use `abs(nums[i])` to retrieve the original value when the array has been modified. Similarly, marking a zero requires special handling since negating zero has no effect.