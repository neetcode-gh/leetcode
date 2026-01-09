## 1. Two Pass

### Intuition

An array is monotonic if it is entirely non-decreasing or entirely non-increasing. We can check each condition separately. First, scan to see if every element is greater than or equal to the previous one. If this holds, the array is monotonically increasing. If not, scan again to check if every element is less than or equal to the previous one. If either condition is satisfied, the array is monotonic.

### Algorithm

1. Assume the array is increasing. Iterate through and check if `nums[i] < nums[i - 1]` for any `i`. If found, the array is not increasing.
2. If the array passed the increasing check, return `true`.
3. Otherwise, assume the array is decreasing. Iterate through and check if `nums[i] > nums[i - 1]` for any `i`. If found, the array is not decreasing.
4. Return whether the array passed the decreasing check.

::tabs-start

```python
class Solution:
    def isMonotonic(self, nums: List[int]) -> bool:
        n = len(nums)
        increase = True
        for i in range(1, n):
            if nums[i] < nums[i - 1]:
                increase = False
                break

        if increase:
            return True

        decrease = True
        for i in range(1, n):
            if nums[i] > nums[i - 1]:
                decrease = False
                break
        return decrease
```

```java
public class Solution {
    public boolean isMonotonic(int[] nums) {
        int n = nums.length;
        boolean increase = true;
        for (int i = 1; i < n; i++) {
            if (nums[i] < nums[i - 1]) {
                increase = false;
                break;
            }
        }
        if (increase) {
            return true;
        }

        boolean decrease = true;
        for (int i = 1; i < n; i++) {
            if (nums[i] > nums[i - 1]) {
                decrease = false;
                break;
            }
        }
        return decrease;
    }
}
```

```cpp
class Solution {
public:
    bool isMonotonic(vector<int>& nums) {
        int n = nums.size();
        bool increase = true;
        for (int i = 1; i < n; ++i) {
            if (nums[i] < nums[i - 1]) {
                increase = false;
                break;
            }
        }
        if (increase) {
            return true;
        }

        bool decrease = true;
        for (int i = 1; i < n; ++i) {
            if (nums[i] > nums[i - 1]) {
                decrease = false;
                break;
            }
        }
        return decrease;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    isMonotonic(nums) {
        const n = nums.length;
        let increase = true;
        for (let i = 1; i < n; i++) {
            if (nums[i] < nums[i - 1]) {
                increase = false;
                break;
            }
        }
        if (increase) {
            return true;
        }

        let decrease = true;
        for (let i = 1; i < n; i++) {
            if (nums[i] > nums[i - 1]) {
                decrease = false;
                break;
            }
        }
        return decrease;
    }
}
```

```csharp
public class Solution {
    public bool IsMonotonic(int[] nums) {
        int n = nums.Length;
        bool increase = true;
        for (int i = 1; i < n; i++) {
            if (nums[i] < nums[i - 1]) {
                increase = false;
                break;
            }
        }
        if (increase) {
            return true;
        }

        bool decrease = true;
        for (int i = 1; i < n; i++) {
            if (nums[i] > nums[i - 1]) {
                decrease = false;
                break;
            }
        }
        return decrease;
    }
}
```

```go
func isMonotonic(nums []int) bool {
    n := len(nums)
    increase := true
    for i := 1; i < n; i++ {
        if nums[i] < nums[i-1] {
            increase = false
            break
        }
    }
    if increase {
        return true
    }

    decrease := true
    for i := 1; i < n; i++ {
        if nums[i] > nums[i-1] {
            decrease = false
            break
        }
    }
    return decrease
}
```

```kotlin
class Solution {
    fun isMonotonic(nums: IntArray): Boolean {
        val n = nums.size
        var increase = true
        for (i in 1 until n) {
            if (nums[i] < nums[i - 1]) {
                increase = false
                break
            }
        }
        if (increase) {
            return true
        }

        var decrease = true
        for (i in 1 until n) {
            if (nums[i] > nums[i - 1]) {
                decrease = false
                break
            }
        }
        return decrease
    }
}
```

```swift
class Solution {
    func isMonotonic(_ nums: [Int]) -> Bool {
        let n = nums.count
        var increase = true
        for i in 1..<n {
            if nums[i] < nums[i - 1] {
                increase = false
                break
            }
        }
        if increase {
            return true
        }

        var decrease = true
        for i in 1..<n {
            if nums[i] > nums[i - 1] {
                decrease = false
                break
            }
        }
        return decrease
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. One Pass - I

### Intuition

We can determine the expected direction by comparing the first and last elements. If the first element is less than or equal to the last, the array should be non-decreasing. Otherwise, it should be non-increasing. With the direction determined upfront, a single pass can verify whether all consecutive pairs follow the expected pattern.

### Algorithm

1. Compare `nums[0]` and `nums[n - 1]` to determine the expected direction.
2. If `nums[0] <= nums[n - 1]`, the array should be non-decreasing:
   - Iterate through and return `false` if any `nums[i] < nums[i - 1]`.
3. Otherwise, the array should be non-increasing:
   - Iterate through and return `false` if any `nums[i] > nums[i - 1]`.
4. If no violations are found, return `true`.

::tabs-start

```python
class Solution:
    def isMonotonic(self, nums: List[int]) -> bool:
        n = len(nums)
        if nums[0] <= nums[-1]:
            for i in range(1, n):
                if nums[i] < nums[i - 1]:
                    return False
            return True
        else:
            for i in range(1, n):
                if nums[i] > nums[i - 1]:
                    return False
            return True
```

```java
public class Solution {
    public boolean isMonotonic(int[] nums) {
        int n = nums.length;
        if (nums[0] <= nums[n - 1]) {
            for (int i = 1; i < n; i++) {
                if (nums[i] < nums[i - 1]) {
                    return false;
                }
            }
            return true;
        } else {
            for (int i = 1; i < n; i++) {
                if (nums[i] > nums[i - 1]) {
                    return false;
                }
            }
            return true;
        }
    }
}
```

```cpp
class Solution {
public:
    bool isMonotonic(vector<int>& nums) {
        int n = nums.size();
        if (nums[0] <= nums[n - 1]) {
            for (int i = 1; i < n; ++i) {
                if (nums[i] < nums[i - 1]) {
                    return false;
                }
            }
            return true;
        } else {
            for (int i = 1; i < n; ++i) {
                if (nums[i] > nums[i - 1]) {
                    return false;
                }
            }
            return true;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    isMonotonic(nums) {
        const n = nums.length;
        if (nums[0] <= nums[n - 1]) {
            for (let i = 1; i < n; i++) {
                if (nums[i] < nums[i - 1]) {
                    return false;
                }
            }
            return true;
        } else {
            for (let i = 1; i < n; i++) {
                if (nums[i] > nums[i - 1]) {
                    return false;
                }
            }
            return true;
        }
    }
}
```

```csharp
public class Solution {
    public bool IsMonotonic(int[] nums) {
        int n = nums.Length;
        if (nums[0] <= nums[n - 1]) {
            for (int i = 1; i < n; i++) {
                if (nums[i] < nums[i - 1]) {
                    return false;
                }
            }
            return true;
        } else {
            for (int i = 1; i < n; i++) {
                if (nums[i] > nums[i - 1]) {
                    return false;
                }
            }
            return true;
        }
    }
}
```

```go
func isMonotonic(nums []int) bool {
    n := len(nums)
    if nums[0] <= nums[n-1] {
        for i := 1; i < n; i++ {
            if nums[i] < nums[i-1] {
                return false
            }
        }
        return true
    } else {
        for i := 1; i < n; i++ {
            if nums[i] > nums[i-1] {
                return false
            }
        }
        return true
    }
}
```

```kotlin
class Solution {
    fun isMonotonic(nums: IntArray): Boolean {
        val n = nums.size
        if (nums[0] <= nums[n - 1]) {
            for (i in 1 until n) {
                if (nums[i] < nums[i - 1]) {
                    return false
                }
            }
            return true
        } else {
            for (i in 1 until n) {
                if (nums[i] > nums[i - 1]) {
                    return false
                }
            }
            return true
        }
    }
}
```

```swift
class Solution {
    func isMonotonic(_ nums: [Int]) -> Bool {
        let n = nums.count
        if nums[0] <= nums[n - 1] {
            for i in 1..<n {
                if nums[i] < nums[i - 1] {
                    return false
                }
            }
            return true
        } else {
            for i in 1..<n {
                if nums[i] > nums[i - 1] {
                    return false
                }
            }
            return true
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. One Pass - II

### Intuition

Rather than deciding the direction upfront, we can track both possibilities simultaneously. We maintain two flags: one for whether the array could still be non-decreasing, and one for whether it could still be non-increasing. As we scan, any violation disqualifies that direction. At the end, if at least one flag remains `true`, the array is monotonic.

### Algorithm

1. Initialize two boolean flags: `increase = true` and `decrease = true`.
2. Iterate through consecutive pairs `(nums[i], nums[i + 1])`:
   - If `nums[i] > nums[i + 1]`, set `increase = false`.
   - If `nums[i] < nums[i + 1]`, set `decrease = false`.
3. Return `increase || decrease`.

::tabs-start

```python
class Solution:
    def isMonotonic(self, nums: List[int]) -> bool:
        increase, decrease = True, True

        for i in range(len(nums) - 1):
            if not (nums[i] <= nums[i + 1]):
                increase = False
            if not (nums[i] >= nums[i + 1]):
                decrease = False
        return increase or decrease
```

```java
public class Solution {
    public boolean isMonotonic(int[] nums) {
        boolean increase = true, decrease = true;

        for (int i = 0; i < nums.length - 1; i++) {
            if (!(nums[i] <= nums[i + 1])) {
                increase = false;
            }
            if (!(nums[i] >= nums[i + 1])) {
                decrease = false;
            }
        }
        return increase || decrease;
    }
}
```

```cpp
class Solution {
public:
    bool isMonotonic(vector<int>& nums) {
        bool increase = true, decrease = true;

        for (int i = 0; i < nums.size() - 1; ++i) {
            if (!(nums[i] <= nums[i + 1])) {
                increase = false;
            }
            if (!(nums[i] >= nums[i + 1])) {
                decrease = false;
            }
        }
        return increase || decrease;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    isMonotonic(nums) {
        let increase = true,
            decrease = true;

        for (let i = 0; i < nums.length - 1; i++) {
            if (!(nums[i] <= nums[i + 1])) {
                increase = false;
            }
            if (!(nums[i] >= nums[i + 1])) {
                decrease = false;
            }
        }
        return increase || decrease;
    }
}
```

```csharp
public class Solution {
    public bool IsMonotonic(int[] nums) {
        bool increase = true, decrease = true;

        for (int i = 0; i < nums.Length - 1; i++) {
            if (!(nums[i] <= nums[i + 1])) {
                increase = false;
            }
            if (!(nums[i] >= nums[i + 1])) {
                decrease = false;
            }
        }
        return increase || decrease;
    }
}
```

```go
func isMonotonic(nums []int) bool {
    increase, decrease := true, true

    for i := 0; i < len(nums)-1; i++ {
        if !(nums[i] <= nums[i+1]) {
            increase = false
        }
        if !(nums[i] >= nums[i+1]) {
            decrease = false
        }
    }
    return increase || decrease
}
```

```kotlin
class Solution {
    fun isMonotonic(nums: IntArray): Boolean {
        var increase = true
        var decrease = true

        for (i in 0 until nums.size - 1) {
            if (!(nums[i] <= nums[i + 1])) {
                increase = false
            }
            if (!(nums[i] >= nums[i + 1])) {
                decrease = false
            }
        }
        return increase || decrease
    }
}
```

```swift
class Solution {
    func isMonotonic(_ nums: [Int]) -> Bool {
        var increase = true
        var decrease = true

        for i in 0..<(nums.count - 1) {
            if !(nums[i] <= nums[i + 1]) {
                increase = false
            }
            if !(nums[i] >= nums[i + 1]) {
                decrease = false
            }
        }
        return increase || decrease
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
