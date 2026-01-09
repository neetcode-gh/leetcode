## 1. Brute Force

### Intuition

The most straightforward approach is to check every possible subarray and count those filled entirely with zeros. For each starting index, we extend the subarray as long as we keep seeing zeros, incrementing our count for each valid zero-filled subarray we find.

### Algorithm

1. Initialize a result counter `res = 0`.
2. For each starting index `i` from `0` to `n-1`:
   - For each ending index `j` from `i` to `n-1`:
     - If `nums[j]` is not `0`, break out of the inner loop.
     - Otherwise, increment `res` (we found another zero-filled subarray).
3. Return `res`.

::tabs-start

```python
class Solution:
    def zeroFilledSubarray(self, nums: List[int]) -> int:
        res = 0
        for i in range(len(nums)):
            for j in range(i, len(nums)):
                if nums[j] != 0:
                    break
                res += 1
        return res
```

```java
public class Solution {
    public long zeroFilledSubarray(int[] nums) {
        long res = 0;
        for (int i = 0; i < nums.length; i++) {
            for (int j = i; j < nums.length; j++) {
                if (nums[j] != 0) break;
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
    long long zeroFilledSubarray(vector<int>& nums) {
        long long res = 0;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i; j < nums.size(); j++) {
                if (nums[j] != 0) break;
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
    zeroFilledSubarray(nums) {
        let res = 0;
        for (let i = 0; i < nums.length; i++) {
            for (let j = i; j < nums.length; j++) {
                if (nums[j] != 0) break;
                res++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long ZeroFilledSubarray(int[] nums) {
        long res = 0;
        for (int i = 0; i < nums.Length; i++) {
            for (int j = i; j < nums.Length; j++) {
                if (nums[j] != 0) break;
                res++;
            }
        }
        return res;
    }
}
```

```go
func zeroFilledSubarray(nums []int) int64 {
    var res int64 = 0
    for i := 0; i < len(nums); i++ {
        for j := i; j < len(nums); j++ {
            if nums[j] != 0 {
                break
            }
            res++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun zeroFilledSubarray(nums: IntArray): Long {
        var res = 0L
        for (i in nums.indices) {
            for (j in i until nums.size) {
                if (nums[j] != 0) break
                res++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func zeroFilledSubarray(_ nums: [Int]) -> Int {
        var res = 0
        for i in 0..<nums.count {
            for j in i..<nums.count {
                if nums[j] != 0 { break }
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

## 2. Count Consecutive Zeros - I

### Intuition

Instead of checking every subarray, we can be smarter by processing consecutive groups of zeros. When we find a sequence of `k` consecutive zeros, the number of zero-filled subarrays within that sequence is `1 + 2 + ... + k`.

We can compute this incrementally: as we extend a run of zeros by one element, we add the current run length to our total. For example, if we have seen `3` zeros so far and see a `4`th, we add `4` to the count (representing the `4` new subarrays ending at this position).

### Algorithm

1. Initialize `res = 0` and index `i = 0`.
2. While `i < n`:
   - Initialize `count = 0` for the current run of zeros.
   - While `nums[i] == 0`:
     - Increment `count`.
     - Add `count` to `res` (this counts all subarrays ending at the current zero).
     - Increment `i`.
   - Increment `i` to skip the non-zero element.
3. Return `res`.

::tabs-start

```python
class Solution:
    def zeroFilledSubarray(self, nums: List[int]) -> int:
        res = i = 0
        while i < len(nums):
            count = 0
            while i < len(nums) and nums[i] == 0:
                count += 1
                i += 1
                res += count
            i += 1
        return res
```

```java
public class Solution {
    public long zeroFilledSubarray(int[] nums) {
        long res = 0;
        int i = 0;
        while (i < nums.length) {
            long count = 0;
            while (i < nums.length && nums[i] == 0) {
                count++;
                i++;
                res += count;
            }
            i++;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long zeroFilledSubarray(vector<int>& nums) {
        long long res = 0;
        int i = 0;
        while (i < nums.size()) {
            long long count = 0;
            while (i < nums.size() && nums[i] == 0) {
                count++;
                i++;
                res += count;
            }
            i++;
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
    zeroFilledSubarray(nums) {
        let res = 0,
            i = 0;
        while (i < nums.length) {
            let count = 0;
            while (i < nums.length && nums[i] === 0) {
                count++;
                i++;
                res += count;
            }
            i++;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long ZeroFilledSubarray(int[] nums) {
        long res = 0;
        int i = 0;
        while (i < nums.Length) {
            long count = 0;
            while (i < nums.Length && nums[i] == 0) {
                count++;
                i++;
                res += count;
            }
            i++;
        }
        return res;
    }
}
```

```go
func zeroFilledSubarray(nums []int) int64 {
    var res int64 = 0
    i := 0
    for i < len(nums) {
        var count int64 = 0
        for i < len(nums) && nums[i] == 0 {
            count++
            i++
            res += count
        }
        i++
    }
    return res
}
```

```kotlin
class Solution {
    fun zeroFilledSubarray(nums: IntArray): Long {
        var res = 0L
        var i = 0
        while (i < nums.size) {
            var count = 0L
            while (i < nums.size && nums[i] == 0) {
                count++
                i++
                res += count
            }
            i++
        }
        return res
    }
}
```

```swift
class Solution {
    func zeroFilledSubarray(_ nums: [Int]) -> Int {
        var res = 0
        var i = 0
        while i < nums.count {
            var count = 0
            while i < nums.count && nums[i] == 0 {
                count += 1
                i += 1
                res += count
            }
            i += 1
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

## 3. Count Consecutive Zeros - II

### Intuition

This is a cleaner version of the previous approach using a single loop. We maintain a running count of consecutive zeros. Each time we see a zero, we increment the count and add it to our result. Each time we see a non-zero, we reset the count to `0`.

The key insight remains the same: when we are at the `k`-th consecutive zero, there are exactly `k` new zero-filled subarrays ending at this position (subarrays of length `1`, `2`, ..., `k`).

### Algorithm

1. Initialize `res = 0` and `count = 0`.
2. For each number in the array:
   - If the number is `0`, increment `count`.
   - Otherwise, reset `count = 0`.
   - Add `count` to `res`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def zeroFilledSubarray(self, nums: List[int]) -> int:
        res = count = 0

        for num in nums:
            if num == 0:
                count += 1
            else:
                count = 0
            res += count

        return res
```

```java
public class Solution {
    public long zeroFilledSubarray(int[] nums) {
        long res = 0;
        int count = 0;

        for (int num : nums) {
            if (num == 0) {
                count++;
            } else {
                count = 0;
            }
            res += count;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long zeroFilledSubarray(vector<int>& nums) {
        long long res = 0;
        int count = 0;

        for (int& num : nums) {
            if (num == 0) {
                count++;
            } else {
                count = 0;
            }
            res += count;
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
    zeroFilledSubarray(nums) {
        let res = 0,
            count = 0;

        for (let num of nums) {
            if (num === 0) {
                count++;
            } else {
                count = 0;
            }
            res += count;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long ZeroFilledSubarray(int[] nums) {
        long res = 0;
        int count = 0;

        foreach (int num in nums) {
            if (num == 0) {
                count++;
            } else {
                count = 0;
            }
            res += count;
        }

        return res;
    }
}
```

```go
func zeroFilledSubarray(nums []int) int64 {
    var res int64 = 0
    count := 0

    for _, num := range nums {
        if num == 0 {
            count++
        } else {
            count = 0
        }
        res += int64(count)
    }

    return res
}
```

```kotlin
class Solution {
    fun zeroFilledSubarray(nums: IntArray): Long {
        var res = 0L
        var count = 0

        for (num in nums) {
            if (num == 0) {
                count++
            } else {
                count = 0
            }
            res += count
        }

        return res
    }
}
```

```swift
class Solution {
    func zeroFilledSubarray(_ nums: [Int]) -> Int {
        var res = 0
        var count = 0

        for num in nums {
            if num == 0 {
                count += 1
            } else {
                count = 0
            }
            res += count
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

## 4. Count Consecutive Zeros (Math)

### Intuition

Instead of adding incrementally during each run of zeros, we can use the mathematical formula directly. A sequence of `k` consecutive zeros contains exactly `k * (k + 1) / 2` zero-filled subarrays (the sum of `1 + 2 + ... + k`).

We scan through the array, counting the length of each consecutive zero sequence. When a sequence ends (we hit a non-zero or reach the end), we apply the formula to add all subarrays from that sequence at once.

### Algorithm

1. Initialize `res = 0` and `count = 0`.
2. For each number in the array:
   - If the number is `0`, increment `count`.
   - Otherwise:
     - Add `count * (count + 1) / 2` to `res`.
     - Reset `count = 0`.
3. After the loop, add the final `count * (count + 1) / 2` to handle any trailing zeros.
4. Return `res`.

::tabs-start

```python
class Solution:
    def zeroFilledSubarray(self, nums: List[int]) -> int:
        res = count = 0
        for num in nums:
            if num == 0:
                count += 1
            else:
                res += (count * (count + 1)) // 2
                count = 0
        res += (count * (count + 1)) // 2
        return res
```

```java
public class Solution {
    public long zeroFilledSubarray(int[] nums) {
        long res = 0, count = 0;
        for (int num : nums) {
            if (num == 0) {
                count++;
            } else {
                res += count * (count + 1) / 2;
                count = 0;
            }
        }
        res += count * (count + 1) / 2;
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long zeroFilledSubarray(vector<int>& nums) {
        long long res = 0, count = 0;
        for (int num : nums) {
            if (num == 0) {
                count++;
            } else {
                res += count * (count + 1) / 2;
                count = 0;
            }
        }
        res += count * (count + 1) / 2;
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
    zeroFilledSubarray(nums) {
        let res = 0,
            count = 0;
        for (let num of nums) {
            if (num === 0) {
                count++;
            } else {
                res += (count * (count + 1)) / 2;
                count = 0;
            }
        }
        res += (count * (count + 1)) / 2;
        return res;
    }
}
```

```csharp
public class Solution {
    public long ZeroFilledSubarray(int[] nums) {
        long res = 0, count = 0;
        foreach (int num in nums) {
            if (num == 0) {
                count++;
            } else {
                res += count * (count + 1) / 2;
                count = 0;
            }
        }
        res += count * (count + 1) / 2;
        return res;
    }
}
```

```go
func zeroFilledSubarray(nums []int) int64 {
    var res, count int64 = 0, 0
    for _, num := range nums {
        if num == 0 {
            count++
        } else {
            res += count * (count + 1) / 2
            count = 0
        }
    }
    res += count * (count + 1) / 2
    return res
}
```

```kotlin
class Solution {
    fun zeroFilledSubarray(nums: IntArray): Long {
        var res = 0L
        var count = 0L
        for (num in nums) {
            if (num == 0) {
                count++
            } else {
                res += count * (count + 1) / 2
                count = 0
            }
        }
        res += count * (count + 1) / 2
        return res
    }
}
```

```swift
class Solution {
    func zeroFilledSubarray(_ nums: [Int]) -> Int {
        var res = 0
        var count = 0
        for num in nums {
            if num == 0 {
                count += 1
            } else {
                res += count * (count + 1) / 2
                count = 0
            }
        }
        res += count * (count + 1) / 2
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
