## 1. Brute Force

### Intuition

The straightforward approach is to check every possible starting position and see how far we can extend a monotonic subarray from there. For each starting index, we determine if the subarray is increasing or decreasing based on the first two elements, then continue as long as the pattern holds.

### Algorithm

1. Initialize `res = 1` to track the maximum length found.
2. For each starting index `i` from `0` to `n-2`:
   - Start with `curLen = 1`.
   - Determine if the subarray starting at `i` is increasing or decreasing.
   - Extend `j` from `i+1` while the pattern continues (strictly increasing or strictly decreasing).
   - Update `res` with the maximum of `res` and `curLen`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def longestMonotonicSubarray(self, nums: List[int]) -> int:
        n = len(nums)
        res = 1

        for i in range(n - 1):
            curLen = 1
            for j in range(i + 1, n):
                if nums[j] == nums[j - 1] or ((nums[i] < nums[i + 1]) != (nums[j - 1] < nums[j])):
                    break
                curLen += 1

            res = max(res, curLen)

        return res
```

```java
public class Solution {
    public int longestMonotonicSubarray(int[] nums) {
        int n = nums.length;
        int res = 1;

        for (int i = 0; i < n - 1; i++) {
            int curLen = 1;
            for (int j = i + 1; j < n; j++) {
                if (nums[j] == nums[j - 1] || ((nums[i] < nums[i + 1]) != (nums[j - 1] < nums[j]))) {
                    break;
                }
                curLen++;
            }
            res = Math.max(res, curLen);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestMonotonicSubarray(vector<int>& nums) {
        int n = nums.size();
        int res = 1;

        for (int i = 0; i < n - 1; i++) {
            int curLen = 1;
            for (int j = i + 1; j < n; j++) {
                if (nums[j] == nums[j - 1] || ((nums[i] < nums[i + 1]) != (nums[j - 1] < nums[j]))) {
                    break;
                }
                curLen++;
            }
            res = max(res, curLen);
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
    longestMonotonicSubarray(nums) {
        let n = nums.length;
        let res = 1;

        for (let i = 0; i < n - 1; i++) {
            let curLen = 1;
            for (let j = i + 1; j < n; j++) {
                if (
                    nums[j] === nums[j - 1] ||
                    nums[i] < nums[i + 1] !== nums[j - 1] < nums[j]
                ) {
                    break;
                }
                curLen++;
            }
            res = Math.max(res, curLen);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestMonotonicSubarray(int[] nums) {
        int n = nums.Length;
        int res = 1;

        for (int i = 0; i < n - 1; i++) {
            int curLen = 1;
            for (int j = i + 1; j < n; j++) {
                if (nums[j] == nums[j - 1] || ((nums[i] < nums[i + 1]) != (nums[j - 1] < nums[j]))) {
                    break;
                }
                curLen++;
            }
            res = Math.Max(res, curLen);
        }

        return res;
    }
}
```

```go
func longestMonotonicSubarray(nums []int) int {
    n := len(nums)
    res := 1

    for i := 0; i < n-1; i++ {
        curLen := 1
        for j := i + 1; j < n; j++ {
            if nums[j] == nums[j-1] || ((nums[i] < nums[i+1]) != (nums[j-1] < nums[j])) {
                break
            }
            curLen++
        }
        if curLen > res {
            res = curLen
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun longestMonotonicSubarray(nums: IntArray): Int {
        val n = nums.size
        var res = 1

        for (i in 0 until n - 1) {
            var curLen = 1
            for (j in i + 1 until n) {
                if (nums[j] == nums[j - 1] || ((nums[i] < nums[i + 1]) != (nums[j - 1] < nums[j]))) {
                    break
                }
                curLen++
            }
            res = maxOf(res, curLen)
        }

        return res
    }
}
```

```swift
class Solution {
    func longestMonotonicSubarray(_ nums: [Int]) -> Int {
        let n = nums.count
        var res = 1

        for i in 0..<(n - 1) {
            var curLen = 1
            for j in (i + 1)..<n {
                if nums[j] == nums[j - 1] || ((nums[i] < nums[i + 1]) != (nums[j - 1] < nums[j])) {
                    break
                }
                curLen += 1
            }
            res = max(res, curLen)
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

## 2. Iteration - I

### Intuition

We can solve this in a single pass by tracking the current monotonic subarray's length and direction. As we scan through the array, we check if the current element continues the same pattern (increasing or decreasing). If it does, we extend the current subarray. If not, we start a new subarray with the current pair of elements.

### Algorithm

1. Initialize `cur = 1` (current subarray length), `res = 1` (result), and `increasing = 0` (direction flag).
2. For each index `i` from `1` to `n-1`:
   - If `nums[i-1] < nums[i]` (increasing):
     - If already in increasing mode, increment `cur`.
     - Otherwise, reset `cur = 2` and set `increasing = 1`.
   - Else if `nums[i-1] > nums[i]` (decreasing):
     - If already in decreasing mode, increment `cur`.
     - Otherwise, reset `cur = 2` and set `increasing = -1`.
   - Else (equal elements): reset `cur = 1` and `increasing = 0`.
   - Update `res = max(res, cur)`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def longestMonotonicSubarray(self, nums: List[int]) -> int:
        cur = 1
        res = 1
        increasing = 0

        for i in range(1, len(nums)):
            if nums[i - 1] < nums[i]:
                if increasing > 0:
                    cur += 1
                else:
                    cur = 2
                    increasing = 1
            elif nums[i - 1] > nums[i]:
                if increasing < 0:
                    cur += 1
                else:
                    cur = 2
                    increasing = -1
            else:
                cur = 1
                increasing = 0
            res = max(res, cur)

        return res
```

```java
public class Solution {
    public int longestMonotonicSubarray(int[] nums) {
        int cur = 1;
        int res = 1;
        int increasing = 0;

        for (int i = 1; i < nums.length; i++) {
            if (nums[i - 1] < nums[i]) {
                if (increasing > 0) {
                    cur++;
                } else {
                    cur = 2;
                    increasing = 1;
                }
            } else if (nums[i - 1] > nums[i]) {
                if (increasing < 0) {
                    cur++;
                } else {
                    cur = 2;
                    increasing = -1;
                }
            } else {
                cur = 1;
                increasing = 0;
            }
            res = Math.max(res, cur);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestMonotonicSubarray(vector<int>& nums) {
        int cur = 1;
        int res = 1;
        int increasing = 0;

        for (int i = 1; i < nums.size(); i++) {
            if (nums[i - 1] < nums[i]) {
                if (increasing > 0) {
                    cur++;
                } else {
                    cur = 2;
                    increasing = 1;
                }
            } else if (nums[i - 1] > nums[i]) {
                if (increasing < 0) {
                    cur++;
                } else {
                    cur = 2;
                    increasing = -1;
                }
            } else {
                cur = 1;
                increasing = 0;
            }
            res = max(res, cur);
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
    longestMonotonicSubarray(nums) {
        let cur = 1;
        let res = 1;
        let increasing = 0;

        for (let i = 1; i < nums.length; i++) {
            if (nums[i - 1] < nums[i]) {
                if (increasing > 0) {
                    cur++;
                } else {
                    cur = 2;
                    increasing = 1;
                }
            } else if (nums[i - 1] > nums[i]) {
                if (increasing < 0) {
                    cur++;
                } else {
                    cur = 2;
                    increasing = -1;
                }
            } else {
                cur = 1;
                increasing = 0;
            }
            res = Math.max(res, cur);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestMonotonicSubarray(int[] nums) {
        int cur = 1;
        int res = 1;
        int increasing = 0;

        for (int i = 1; i < nums.Length; i++) {
            if (nums[i - 1] < nums[i]) {
                if (increasing > 0) {
                    cur++;
                } else {
                    cur = 2;
                    increasing = 1;
                }
            } else if (nums[i - 1] > nums[i]) {
                if (increasing < 0) {
                    cur++;
                } else {
                    cur = 2;
                    increasing = -1;
                }
            } else {
                cur = 1;
                increasing = 0;
            }
            res = Math.Max(res, cur);
        }

        return res;
    }
}
```

```go
func longestMonotonicSubarray(nums []int) int {
    cur := 1
    res := 1
    increasing := 0

    for i := 1; i < len(nums); i++ {
        if nums[i-1] < nums[i] {
            if increasing > 0 {
                cur++
            } else {
                cur = 2
                increasing = 1
            }
        } else if nums[i-1] > nums[i] {
            if increasing < 0 {
                cur++
            } else {
                cur = 2
                increasing = -1
            }
        } else {
            cur = 1
            increasing = 0
        }
        if cur > res {
            res = cur
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun longestMonotonicSubarray(nums: IntArray): Int {
        var cur = 1
        var res = 1
        var increasing = 0

        for (i in 1 until nums.size) {
            if (nums[i - 1] < nums[i]) {
                if (increasing > 0) {
                    cur++
                } else {
                    cur = 2
                    increasing = 1
                }
            } else if (nums[i - 1] > nums[i]) {
                if (increasing < 0) {
                    cur++
                } else {
                    cur = 2
                    increasing = -1
                }
            } else {
                cur = 1
                increasing = 0
            }
            res = maxOf(res, cur)
        }

        return res
    }
}
```

```swift
class Solution {
    func longestMonotonicSubarray(_ nums: [Int]) -> Int {
        var cur = 1
        var res = 1
        var increasing = 0

        for i in 1..<nums.count {
            if nums[i - 1] < nums[i] {
                if increasing > 0 {
                    cur += 1
                } else {
                    cur = 2
                    increasing = 1
                }
            } else if nums[i - 1] > nums[i] {
                if increasing < 0 {
                    cur += 1
                } else {
                    cur = 2
                    increasing = -1
                }
            } else {
                cur = 1
                increasing = 0
            }
            res = max(res, cur)
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

## 3. Iteration - II

### Intuition

A cleaner approach is to maintain two separate counters: one for the current strictly increasing subarray length and one for the current strictly decreasing subarray length. At each step, we update both counters based on the relationship between consecutive elements.

### Algorithm

1. Initialize `inc = 1`, `dec = 1` (current lengths), and `res = 1` (result).
2. For each index `i` from `1` to `n-1`:
   - If `nums[i] == nums[i-1]`: reset both `inc = 1` and `dec = 1`.
   - Else if `nums[i] > nums[i-1]`: increment `inc`, reset `dec = 1`.
   - Else: increment `dec`, reset `inc = 1`.
   - Update `res = max(res, inc, dec)`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def longestMonotonicSubarray(self, nums: List[int]) -> int:
        inc = dec = 1
        res = 1

        for i in range(1, len(nums)):
            if nums[i] == nums[i - 1]:
                inc = dec = 1
            elif nums[i] > nums[i - 1]:
                inc, dec = inc + 1, 1
            else:
                inc, dec = 1, dec + 1

            res = max(res, inc, dec)

        return res
```

```java
public class Solution {
    public int longestMonotonicSubarray(int[] nums) {
        int inc = 1, dec = 1, res = 1;

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i - 1]) {
                inc = dec = 1;
            } else if (nums[i] > nums[i - 1]) {
                inc = inc + 1;
                dec = 1;
            } else {
                inc = 1;
                dec = dec + 1;
            }
            res = Math.max(res, Math.max(inc, dec));
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestMonotonicSubarray(vector<int>& nums) {
        int inc = 1, dec = 1, res = 1;

        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1]) {
                inc = dec = 1;
            } else if (nums[i] > nums[i - 1]) {
                inc = inc + 1;
                dec = 1;
            } else {
                inc = 1;
                dec = dec + 1;
            }
            res = max(res, max(inc, dec));
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
    longestMonotonicSubarray(nums) {
        let inc = 1,
            dec = 1,
            res = 1;

        for (let i = 1; i < nums.length; i++) {
            if (nums[i] === nums[i - 1]) {
                inc = dec = 1;
            } else if (nums[i] > nums[i - 1]) {
                inc = inc + 1;
                dec = 1;
            } else {
                inc = 1;
                dec = dec + 1;
            }
            res = Math.max(res, inc, dec);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestMonotonicSubarray(int[] nums) {
        int inc = 1, dec = 1, res = 1;

        for (int i = 1; i < nums.Length; i++) {
            if (nums[i] == nums[i - 1]) {
                inc = dec = 1;
            } else if (nums[i] > nums[i - 1]) {
                inc = inc + 1;
                dec = 1;
            } else {
                inc = 1;
                dec = dec + 1;
            }
            res = Math.Max(res, Math.Max(inc, dec));
        }

        return res;
    }
}
```

```go
func longestMonotonicSubarray(nums []int) int {
    inc, dec, res := 1, 1, 1

    for i := 1; i < len(nums); i++ {
        if nums[i] == nums[i-1] {
            inc, dec = 1, 1
        } else if nums[i] > nums[i-1] {
            inc = inc + 1
            dec = 1
        } else {
            inc = 1
            dec = dec + 1
        }
        if inc > res {
            res = inc
        }
        if dec > res {
            res = dec
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun longestMonotonicSubarray(nums: IntArray): Int {
        var inc = 1
        var dec = 1
        var res = 1

        for (i in 1 until nums.size) {
            if (nums[i] == nums[i - 1]) {
                inc = 1
                dec = 1
            } else if (nums[i] > nums[i - 1]) {
                inc = inc + 1
                dec = 1
            } else {
                inc = 1
                dec = dec + 1
            }
            res = maxOf(res, inc, dec)
        }

        return res
    }
}
```

```swift
class Solution {
    func longestMonotonicSubarray(_ nums: [Int]) -> Int {
        var inc = 1
        var dec = 1
        var res = 1

        for i in 1..<nums.count {
            if nums[i] == nums[i - 1] {
                inc = 1
                dec = 1
            } else if nums[i] > nums[i - 1] {
                inc = inc + 1
                dec = 1
            } else {
                inc = 1
                dec = dec + 1
            }
            res = max(res, max(inc, dec))
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

## 4. Iteration - III

### Intuition

Another variation uses a single counter and checks if the current direction matches the direction at the start of the current subarray. By comparing the relationship between elements at the subarray's start with the relationship at the current position, we can determine if we're still following the same monotonic pattern.

### Algorithm

1. Initialize `curLen = 1` and `res = 1`.
2. For each index `i` from `1` to `n-1`:
   - If elements are equal, or if the direction at position `i-curLen` differs from the direction at position `i-1`:
     - Reset `curLen` to `1` (if equal) or `2` (if different direction).
     - Continue to the next iteration.
   - Otherwise, increment `curLen` and update `res = max(res, curLen)`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def longestMonotonicSubarray(self, nums: List[int]) -> int:
        curLen = res = 1

        for i in range(1, len(nums)):
            if (nums[i] == nums[i - 1] or
                ((nums[i - curLen] < nums[i - curLen + 1]) != (nums[i - 1] < nums[i]))
            ):
                curLen = 1 if (nums[i] == nums[i - 1]) else 2
                continue

            curLen += 1
            res = max(res, curLen)

        return res
```

```java
public class Solution {
    public int longestMonotonicSubarray(int[] nums) {
        int curLen = 1, res = 1;

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i - 1] ||
                ((nums[i - curLen] < nums[i - curLen + 1]) != (nums[i - 1] < nums[i]))) {
                curLen = (nums[i] == nums[i - 1]) ? 1 : 2;
                continue;
            }

            curLen++;
            res = Math.max(res, curLen);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestMonotonicSubarray(vector<int>& nums) {
        int curLen = 1, res = 1;

        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1] ||
                ((nums[i - curLen] < nums[i - curLen + 1]) != (nums[i - 1] < nums[i]))) {
                curLen = (nums[i] == nums[i - 1]) ? 1 : 2;
                continue;
            }

            curLen++;
            res = max(res, curLen);
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
    longestMonotonicSubarray(nums) {
        let curLen = 1,
            res = 1;

        for (let i = 1; i < nums.length; i++) {
            if (
                nums[i] === nums[i - 1] ||
                nums[i - curLen] < nums[i - curLen + 1] !==
                    nums[i - 1] < nums[i]
            ) {
                curLen = nums[i] === nums[i - 1] ? 1 : 2;
                continue;
            }

            curLen++;
            res = Math.max(res, curLen);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestMonotonicSubarray(int[] nums) {
        int curLen = 1, res = 1;

        for (int i = 1; i < nums.Length; i++) {
            if (nums[i] == nums[i - 1] ||
                ((nums[i - curLen] < nums[i - curLen + 1]) != (nums[i - 1] < nums[i]))) {
                curLen = (nums[i] == nums[i - 1]) ? 1 : 2;
                continue;
            }

            curLen++;
            res = Math.Max(res, curLen);
        }

        return res;
    }
}
```

```go
func longestMonotonicSubarray(nums []int) int {
    curLen, res := 1, 1

    for i := 1; i < len(nums); i++ {
        if nums[i] == nums[i-1] ||
            ((nums[i-curLen] < nums[i-curLen+1]) != (nums[i-1] < nums[i])) {
            if nums[i] == nums[i-1] {
                curLen = 1
            } else {
                curLen = 2
            }
            continue
        }

        curLen++
        if curLen > res {
            res = curLen
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun longestMonotonicSubarray(nums: IntArray): Int {
        var curLen = 1
        var res = 1

        for (i in 1 until nums.size) {
            if (nums[i] == nums[i - 1] ||
                ((nums[i - curLen] < nums[i - curLen + 1]) != (nums[i - 1] < nums[i]))) {
                curLen = if (nums[i] == nums[i - 1]) 1 else 2
                continue
            }

            curLen++
            res = maxOf(res, curLen)
        }

        return res
    }
}
```

```swift
class Solution {
    func longestMonotonicSubarray(_ nums: [Int]) -> Int {
        var curLen = 1
        var res = 1

        for i in 1..<nums.count {
            if nums[i] == nums[i - 1] ||
                ((nums[i - curLen] < nums[i - curLen + 1]) != (nums[i - 1] < nums[i])) {
                curLen = (nums[i] == nums[i - 1]) ? 1 : 2
                continue
            }

            curLen += 1
            res = max(res, curLen)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
