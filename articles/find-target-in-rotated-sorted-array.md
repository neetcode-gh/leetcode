## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Search** - The optimal solutions use binary search to achieve O(log n) time complexity
- **Arrays** - Understanding array indexing and how rotation affects a sorted array
- **Sorted Array Properties** - Recognizing how a rotated sorted array forms two sorted subarrays

---

## 1. Brute Force

### Intuition

The simplest way to search for a value in an array is to **check every element one by one**.  
If we find the target, we return its index.  
If we reach the end without finding it, the target is not present.

This method always works, but it's not efficient for large arrays.

### Algorithm

1. Loop through the array from left to right.
2. For each index, compare the element with the target.
3. If they match, return that index.
4. If the loop finishes without a match, return `-1`.

::tabs-start

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        for i in range(len(nums)):
            if nums[i] == target:
                return i
        return -1
```

```java
class Solution {
    public int search(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
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
    int search(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == target) {
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
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                return i;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int Search(int[] nums, int target) {
        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] == target) {
                return i;
            }
        }
        return -1;
    }
}
```

```go
func search(nums []int, target int) int {
    for i := 0; i < len(nums); i++ {
        if nums[i] == target {
            return i
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun search(nums: IntArray, target: Int): Int {
        for (i in nums.indices) {
            if (nums[i] == target) {
                return i
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func search(_ nums: [Int], _ target: Int) -> Int {
        for i in 0..<nums.count {
            if nums[i] == target {
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
- Space complexity: $O(1)$

---

## 2. Binary Search

### Intuition

A rotated sorted array is basically two sorted subarrays joined together.  
So the idea is:

1. **Find the pivot** — the index of the smallest element.  
   This tells us where the rotation happened.

2. After finding the pivot, the array becomes:
   - A sorted left half  
   - A sorted right half  

3. Now we can perform a **normal binary search** on the correct half where the target could lie.

By combining these two binary searches, we efficiently find the target in logarithmic time.

### Algorithm

1. Use binary search to find the **pivot**:
   - Compare middle element with the rightmost element.
   - If `nums[mid] > nums[right]`, the pivot is in the right half.
   - Otherwise, it's in the left half.
2. Once the pivot is identified:
   - The subarray before the pivot is one sorted half.
   - The subarray starting at the pivot is the other sorted half.
3. Perform a standard binary search on:
   - The left half; if found, return the index.
   - Otherwise, search the right half.
4. If the target is not in either half, return `-1`.

::tabs-start

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1

        while l < r:
            m = (l + r) // 2
            if nums[m] > nums[r]:
                l = m + 1
            else:
                r = m

        pivot = l

        def binary_search(left: int, right: int) -> int:
            while left <= right:
                mid = (left + right) // 2
                if nums[mid] == target:
                    return mid
                elif nums[mid] < target:
                    left = mid + 1
                else:
                    right = mid - 1
            return -1

        result = binary_search(0, pivot - 1)
        if result != -1:
            return result

        return binary_search(pivot, len(nums) - 1)
```

```java
public class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;

        while (l < r) {
            int m = (l + r) / 2;
            if (nums[m] > nums[r]) {
                l = m + 1;
            } else {
                r = m;
            }
        }

        int pivot = l;

        int result = binarySearch(nums, target, 0, pivot - 1);
        if (result != -1) {
            return result;
        }

        return binarySearch(nums, target, pivot, nums.length - 1);
    }

    public int binarySearch(int[] nums, int target, int left, int right) {
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;

        while (l < r) {
            int m = (l + r) / 2;
            if (nums[m] > nums[r]) {
                l = m + 1;
            } else {
                r = m;
            }
        }

        int pivot = l;

        int result = binarySearch(nums, target, 0, pivot - 1);
        if (result != -1) {
            return result;
        }

        return binarySearch(nums, target, pivot, nums.size() - 1);
    }

    int binarySearch(vector<int>& nums, int target, int left, int right) {
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
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
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        let l = 0;
        let r = nums.length - 1;

        while (l < r) {
            const m = Math.floor((l + r) / 2);
            if (nums[m] > nums[r]) {
                l = m + 1;
            } else {
                r = m;
            }
        }

        const pivot = l;

        const result = this.binarySearch(nums, target, 0, pivot - 1);
        if (result !== -1) {
            return result;
        }

        return this.binarySearch(nums, target, pivot, nums.length - 1);
    }

    /**
     * @param {number[]} nums
     * @param {number} target
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    binarySearch(nums, target, left, right) {
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int Search(int[] nums, int target) {
        int l = 0, r = nums.Length - 1;

        while (l < r) {
            int m = (l + r) / 2;
            if (nums[m] > nums[r]) {
                l = m + 1;
            } else {
                r = m;
            }
        }

        int pivot = l;

        int result = BinarySearch(nums, target, 0, pivot - 1);
        if (result != -1) {
            return result;
        }

        return BinarySearch(nums, target, pivot, nums.Length - 1);
    }

    public int BinarySearch(int[] nums, int target, int left, int right) {
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}
```

```go
func search(nums []int, target int) int {
    l, r := 0, len(nums)-1

    for l < r {
        m := (l + r) / 2
        if nums[m] > nums[r] {
            l = m + 1
        } else {
            r = m
        }
    }

    pivot := l

    var binarySearch func(left, right int) int
    binarySearch = func(left, right int) int {
        for left <= right {
            mid := (left + right) / 2
            if nums[mid] == target {
                return mid
            } else if nums[mid] < target {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
        return -1
    }

    result := binarySearch(0, pivot-1)
    if result != -1 {
        return result
    }

    return binarySearch(pivot, len(nums)-1)
}
```

```kotlin
class Solution {
    fun search(nums: IntArray, target: Int): Int {
        var l = 0
        var r = nums.size - 1

        while (l < r) {
            val m = (l + r) / 2
            if (nums[m] > nums[r]) {
                l = m + 1
            } else {
                r = m
            }
        }

        val pivot = l

        fun binarySearch(left: Int, right: Int): Int {
            var left = left
            var right = right
            while (left <= right) {
                val mid = (left + right) / 2
                when {
                    nums[mid] == target -> return mid
                    nums[mid] < target -> left = mid + 1
                    else -> right = mid - 1
                }
            }
            return -1
        }

        var result = binarySearch(0, pivot - 1)
        if (result != -1) {
            return result
        }

        return binarySearch(pivot, nums.size - 1)
    }
}
```

```swift
class Solution {
    func search(_ nums: [Int], _ target: Int) -> Int {
        var l = 0, r = nums.count - 1

        while l < r {
            let m = (l + r) / 2
            if nums[m] > nums[r] {
                l = m + 1
            } else {
                r = m
            }
        }

        let pivot = l

        func binarySearch(_ left: Int, _ right: Int) -> Int {
            var l = left, r = right
            while l <= r {
                let mid = (l + r) / 2
                if nums[mid] == target {
                    return mid
                } else if nums[mid] < target {
                    l = mid + 1
                } else {
                    r = mid - 1
                }
            }
            return -1
        }

        let result = binarySearch(0, pivot - 1)
        if result != -1 {
            return result
        }

        return binarySearch(pivot, nums.count - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 3. Binary Search (Two Pass)

### Intuition

A rotated sorted array is really two sorted arrays stuck together.  
So we break the problem into **two simple binary searches**:

1. **First binary search**:  
   Find the pivot — the index of the smallest element.  
   This tells us where the array was rotated.

2. **Second binary search**:  
   Decide which sorted half may contain the target,  
   then run a standard binary search only on that half.

### Algorithm

1. Use binary search to locate the **pivot**:
   - Compare middle and right elements.
   - If `nums[mid] > nums[right]`, the pivot is to the right.
   - Otherwise, it's to the left (including `mid`).
2. After finding the pivot:
   - If the target lies between `nums[pivot]` and the last element, search the **right half**.
   - Otherwise, search the **left half**.
3. Perform a standard binary search on the selected half.
4. Return the index if found, else `-1`.

::tabs-start

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1

        while l < r:
            m = (l + r) // 2
            if nums[m] > nums[r]:
                l = m + 1
            else:
                r = m

        pivot = l
        l, r = 0, len(nums) - 1

        if target >= nums[pivot] and target <= nums[r]:
            l = pivot
        else:
            r = pivot - 1

        while l <= r:
            m = (l + r) // 2
            if nums[m] == target:
                return m
            elif nums[m] < target:
                l = m + 1
            else:
                r = m - 1

        return -1
```

```java
public class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;

        while (l < r) {
            int m = (l + r) / 2;
            if (nums[m] > nums[r]) {
                l = m + 1;
            } else {
                r = m;
            }
        }

        int pivot = l;
        l = 0;
        r = nums.length - 1;

        if (target >= nums[pivot] && target <= nums[r]) {
            l = pivot;
        } else {
            r = pivot - 1;
        }

        while (l <= r) {
            int m = (l + r) / 2;
            if (nums[m] == target) {
                return m;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;

        while (l < r) {
            int m = (l + r) / 2;
            if (nums[m] > nums[r]) {
                l = m + 1;
            } else {
                r = m;
            }
        }

        int pivot = l;
        l = 0;
        r = nums.size() - 1;

        if (target >= nums[pivot] && target <= nums[r]) {
            l = pivot;
        } else {
            r = pivot - 1;
        }

        while (l <= r) {
            int m = (l + r) / 2;
            if (nums[m] == target) {
                return m;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                r = m - 1;
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
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        let l = 0,
            r = nums.length - 1;

        while (l < r) {
            let m = Math.floor((l + r) / 2);
            if (nums[m] > nums[r]) {
                l = m + 1;
            } else {
                r = m;
            }
        }

        let pivot = l;
        l = 0;
        r = nums.length - 1;

        if (target >= nums[pivot] && target <= nums[r]) {
            l = pivot;
        } else {
            r = pivot - 1;
        }

        while (l <= r) {
            let m = Math.floor((l + r) / 2);
            if (nums[m] === target) {
                return m;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int Search(int[] nums, int target) {
        int l = 0, r = nums.Length - 1;

        while (l < r) {
            int m = (l + r) / 2;
            if (nums[m] > nums[r]) {
                l = m + 1;
            } else {
                r = m;
            }
        }

        int pivot = l;
        l = 0;
        r = nums.Length - 1;

        if (target >= nums[pivot] && target <= nums[r]) {
            l = pivot;
        } else {
            r = pivot - 1;
        }

        while (l <= r) {
            int m = (l + r) / 2;
            if (nums[m] == target) {
                return m;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }

        return -1;
    }
}
```

```go
func search(nums []int, target int) int {
    l, r := 0, len(nums)-1

    for l < r {
        m := (l + r) / 2
        if nums[m] > nums[r] {
            l = m + 1
        } else {
            r = m
        }
    }

    pivot := l
    l, r = 0, len(nums)-1

    if target >= nums[pivot] && target <= nums[r] {
        l = pivot
    } else {
        r = pivot - 1
    }

    for l <= r {
        m := (l + r) / 2
        if nums[m] == target {
            return m
        } else if nums[m] < target {
            l = m + 1
        } else {
            r = m - 1
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun search(nums: IntArray, target: Int): Int {
        var l = 0
        var r = nums.size - 1

        while (l < r) {
            val m = (l + r) / 2
            if (nums[m] > nums[r]) {
                l = m + 1
            } else {
                r = m
            }
        }

        val pivot = l
        l = 0
        r = nums.size - 1

        if (target >= nums[pivot] && target <= nums[r]) {
            l = pivot
        } else {
            r = pivot - 1
        }

        while (l <= r) {
            val m = (l + r) / 2
            if (nums[m] == target) {
                return m
            } else if (nums[m] < target) {
                l = m + 1
            } else {
                r = m - 1
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func search(_ nums: [Int], _ target: Int) -> Int {
        var l = 0, r = nums.count - 1

        while l < r {
            let m = (l + r) / 2
            if nums[m] > nums[r] {
                l = m + 1
            } else {
                r = m
            }
        }

        let pivot = l
        l = 0
        r = nums.count - 1

        if target >= nums[pivot] && target <= nums[r] {
            l = pivot
        } else {
            r = pivot - 1
        }

        while l <= r {
            let m = (l + r) / 2
            if nums[m] == target {
                return m
            } else if nums[m] < target {
                l = m + 1
            } else {
                r = m - 1
            }
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 4. Binary Search (One Pass)

::tabs-start

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1

        while l <= r:
            mid = (l + r) // 2
            if target == nums[mid]:
                return mid

            if nums[l] <= nums[mid]:
                if target > nums[mid] or target < nums[l]:
                    l = mid + 1
                else:
                    r = mid - 1

            else:
                if target < nums[mid] or target > nums[r]:
                    r = mid - 1
                else:
                    l = mid + 1
        return -1
```

```java
class Solution {
    public int search(int[] nums, int target) {
        int l = 0;
        int r = nums.length - 1;

        while(l <= r) {

            int mid = (l + r) / 2;

            if (nums[mid] == target) {
                return mid;
            }

            if (nums[l] <= nums[mid]) {
                if (target > nums[mid] || target < nums[l]) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            } else {
                if (target < nums[mid] || target > nums [r]) {
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }

        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int search(std::vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;

        while (l <= r) {
            int mid = (l + r) / 2;
            if (target == nums[mid]) {
                return mid;
            }

            if (nums[l] <= nums[mid]) {
                if (target > nums[mid] || target < nums[l]) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            } else {
                if (target < nums[mid] || target > nums[r]) {
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
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
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        let l = 0,
            r = nums.length - 1;

        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (target === nums[mid]) {
                return mid;
            }

            if (nums[l] <= nums[mid]) {
                if (target > nums[mid] || target < nums[l]) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            } else {
                if (target < nums[mid] || target > nums[r]) {
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int Search(int[] nums, int target) {
        int l = 0, r = nums.Length - 1;

        while (l <= r) {
            int mid = (l + r) / 2;
            if (target == nums[mid]) {
                return mid;
            }

            if (nums[l] <= nums[mid]) {
                if (target > nums[mid] || target < nums[l]) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            } else {
                if (target < nums[mid] || target > nums[r]) {
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }
        }
        return -1;
    }
}
```

```go
func search(nums []int, target int) int {
    l, r := 0, len(nums)-1

    for l <= r {
        mid := (l + r) / 2
        if target == nums[mid] {
            return mid
        }

        if nums[l] <= nums[mid] {
            if target > nums[mid] || target < nums[l] {
                l = mid + 1
            } else {
                r = mid - 1
            }
        } else {
            if target < nums[mid] || target > nums[r] {
                r = mid - 1
            } else {
                l = mid + 1
            }
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun search(nums: IntArray, target: Int): Int {
        var l = 0
        var r = nums.size - 1

        while (l <= r) {
            val mid = (l + r) / 2
            if (target == nums[mid]) {
                return mid
            }

            if (nums[l] <= nums[mid]) {
                if (target > nums[mid] || target < nums[l]) {
                    l = mid + 1
                } else {
                    r = mid - 1
                }
            } else {
                if (target < nums[mid] || target > nums[r]) {
                    r = mid - 1
                } else {
                    l = mid + 1
                }
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func search(_ nums: [Int], _ target: Int) -> Int {
        var l = 0, r = nums.count - 1

        while l <= r {
            let mid = (l + r) / 2
            if target == nums[mid] {
                return mid
            }

            if nums[l] <= nums[mid] {
                if target > nums[mid] || target < nums[l] {
                    l = mid + 1
                } else {
                    r = mid - 1
                }
            } else {
                if target < nums[mid] || target > nums[r] {
                    r = mid - 1
                } else {
                    l = mid + 1
                }
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Using Strict Inequality When Comparing with Left Element

In the one-pass binary search, the condition `nums[l] <= nums[mid]` uses `<=` rather than `<`. This handles the edge case when `l == mid`, which occurs in small subarrays. Using `<` instead can cause incorrect half selection and miss the target.

### Confusing Pivot Finding with Target Finding

The two-pass approach requires finding the pivot first (smallest element), then searching the appropriate half. Do not conflate these steps. The pivot search uses `nums[mid] > nums[r]` to move left, while the target search is a standard binary search. Mixing the logic leads to wrong results.

### Not Handling the Non-Rotated Array Case

When the array is not rotated (or rotated by 0), the pivot is at index 0. Your solution should still work correctly. Test with sorted arrays like `[1, 2, 3, 4, 5]` to ensure your pivot-finding logic returns index 0 and the subsequent search works.
