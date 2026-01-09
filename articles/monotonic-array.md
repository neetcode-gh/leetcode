## 1. Two Pass

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
