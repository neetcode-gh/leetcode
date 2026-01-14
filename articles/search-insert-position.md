## 1. Linear Search

### Intuition

We scan the array from left to right looking for the first element that is greater than or equal to the target. If we find such an element, that index is where the target either exists or should be inserted. If no element qualifies, the target belongs at the end.

### Algorithm

1. Iterate through each index `i` in the array.
2. If `nums[i] >= target`, return `i`.
3. If the loop completes without returning, return `n` (the length of the array to insert at the end).

::tabs-start

```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        for i in range(len(nums)):
            if nums[i] >= target:
                return i
        return len(nums)
```

```java
public class Solution {
    public int searchInsert(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] >= target) {
                return i;
            }
        }
        return nums.length;
    }
}
```

```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] >= target) {
                return i;
            }
        }
        return nums.size();
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
    searchInsert(nums, target) {
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] >= target) {
                return i;
            }
        }
        return nums.length;
    }
}
```

```csharp
public class Solution {
    public int SearchInsert(int[] nums, int target) {
        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] >= target) {
                return i;
            }
        }
        return nums.Length;
    }
}
```

```go
func searchInsert(nums []int, target int) int {
    for i := 0; i < len(nums); i++ {
        if nums[i] >= target {
            return i
        }
    }
    return len(nums)
}
```

```kotlin
class Solution {
    fun searchInsert(nums: IntArray, target: Int): Int {
        for (i in nums.indices) {
            if (nums[i] >= target) {
                return i
            }
        }
        return nums.size
    }
}
```

```swift
class Solution {
    func searchInsert(_ nums: [Int], _ target: Int) -> Int {
        for i in 0..<nums.count {
            if nums[i] >= target {
                return i
            }
        }
        return nums.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 2. Binary Search - I

### Intuition

Since the array is sorted, we can use binary search to find the target in logarithmic time. We track the potential insertion point as we search. Whenever we find an element greater than the target, we update our answer and continue searching left for a potentially smaller valid index.

### Algorithm

1. Initialize `res = n` (default insertion point at the end) and pointers `l = 0`, `r = n - 1`.
2. While `l <= r`:
   - Compute `mid = (l + r) / 2`.
   - If `nums[mid] == target`, return `mid`.
   - If `nums[mid] > target`, set `res = mid` and search left with `r = mid - 1`.
   - Otherwise, search right with `l = mid + 1`.
3. Return `res` (final insertion position).

::tabs-start

```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        res = len(nums)
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] > target:
                res = mid
                r = mid - 1
            else:
                l = mid + 1
        return res
```

```java
public class Solution {
    public int searchInsert(int[] nums, int target) {
        int res = nums.length;
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] > target) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int res = nums.size();
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] > target) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
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
     * @param {number} target
     * @return {number}
     */
    searchInsert(nums, target) {
        let res = nums.length;
        let l = 0,
            r = nums.length - 1;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (nums[mid] === target) {
                return mid;
            }
            if (nums[mid] > target) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int SearchInsert(int[] nums, int target) {
        int res = nums.Length;
        int l = 0, r = nums.Length - 1;

        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] > target) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }

        return res;
    }
}
```

```go
func searchInsert(nums []int, target int) int {
    res := len(nums)
    l, r := 0, len(nums)-1
    for l <= r {
        mid := (l + r) / 2
        if nums[mid] == target {
            return mid
        }
        if nums[mid] > target {
            res = mid
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun searchInsert(nums: IntArray, target: Int): Int {
        var res = nums.size
        var l = 0
        var r = nums.size - 1
        while (l <= r) {
            val mid = (l + r) / 2
            if (nums[mid] == target) {
                return mid
            }
            if (nums[mid] > target) {
                res = mid
                r = mid - 1
            } else {
                l = mid + 1
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func searchInsert(_ nums: [Int], _ target: Int) -> Int {
        var res = nums.count
        var l = 0
        var r = nums.count - 1
        while l <= r {
            let mid = (l + r) / 2
            if nums[mid] == target {
                return mid
            }
            if nums[mid] > target {
                res = mid
                r = mid - 1
            } else {
                l = mid + 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$ extra space.

---

## 3. Binary Search - II

### Intuition

A cleaner observation: when binary search ends without finding the target, the left pointer `l` naturally lands on the correct insertion position. This happens because `l` always moves past elements smaller than the target, stopping exactly where the target should go.

### Algorithm

1. Initialize pointers `l = 0` and `r = n - 1`.
2. While `l <= r`:
   - Compute `mid = (l + r) / 2`.
   - If `nums[mid] == target`, return `mid`.
   - If `nums[mid] > target`, search left with `r = mid - 1`.
   - Otherwise, search right with `l = mid + 1`.
3. Return `l` as the insertion index (where `l` naturally lands on the correct position).

::tabs-start

```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] > target:
                r = mid - 1
            else:
                l = mid + 1
        return l
```

```java
public class Solution {
    public int searchInsert(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] > target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] > target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return l;
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
    searchInsert(nums, target) {
        let l = 0,
            r = nums.length - 1;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (nums[mid] === target) {
                return mid;
            }
            if (nums[mid] > target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }
}
```

```csharp
public class Solution {
    public int SearchInsert(int[] nums, int target) {
        int l = 0, r = nums.Length - 1;

        while (l <= r) {
            int mid = (l + r) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] > target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }

        return l;
    }
}
```

```go
func searchInsert(nums []int, target int) int {
    l, r := 0, len(nums)-1
    for l <= r {
        mid := (l + r) / 2
        if nums[mid] == target {
            return mid
        }
        if nums[mid] > target {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return l
}
```

```kotlin
class Solution {
    fun searchInsert(nums: IntArray, target: Int): Int {
        var l = 0
        var r = nums.size - 1
        while (l <= r) {
            val mid = (l + r) / 2
            if (nums[mid] == target) {
                return mid
            }
            if (nums[mid] > target) {
                r = mid - 1
            } else {
                l = mid + 1
            }
        }
        return l
    }
}
```

```swift
class Solution {
    func searchInsert(_ nums: [Int], _ target: Int) -> Int {
        var l = 0
        var r = nums.count - 1
        while l <= r {
            let mid = (l + r) / 2
            if nums[mid] == target {
                return mid
            }
            if nums[mid] > target {
                r = mid - 1
            } else {
                l = mid + 1
            }
        }
        return l
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Binary Search (Lower Bound)

### Intuition

This is the classic lower bound algorithm. We find the smallest index where the element is greater than or equal to the target. By using `l < r` as the condition and setting `r = m` when `nums[m] >= target`, we converge on the lower bound without needing a separate result variable.

### Algorithm

1. Initialize pointers `l = 0` and `r = n` (note: `r` starts at `n`, not `n - 1`).
2. While `l < r`:
   - Compute `m = l + (r - l) / 2`.
   - If `nums[m] >= target`, set `r = m`.
   - Otherwise, set `l = m + 1`.
3. Return `l` (the lower bound position).

::tabs-start

```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums)
        while l < r:
            m = l + ((r - l) // 2)
            if nums[m] >= target:
                r = m
            elif nums[m] < target:
                l = m + 1
        return l
```

```java
public class Solution {
    public int searchInsert(int[] nums, int target) {
        int l = 0, r = nums.length;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int l = 0, r = nums.size();
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l;
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
    searchInsert(nums, target) {
        let l = 0,
            r = nums.length;
        while (l < r) {
            let m = l + Math.floor((r - l) / 2);
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l;
    }
}
```

```csharp
public class Solution {
    public int SearchInsert(int[] nums, int target) {
        int l = 0, r = nums.Length;

        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }

        return l;
    }
}
```

```go
func searchInsert(nums []int, target int) int {
    l, r := 0, len(nums)
    for l < r {
        m := l + (r-l)/2
        if nums[m] >= target {
            r = m
        } else {
            l = m + 1
        }
    }
    return l
}
```

```kotlin
class Solution {
    fun searchInsert(nums: IntArray, target: Int): Int {
        var l = 0
        var r = nums.size
        while (l < r) {
            val m = l + (r - l) / 2
            if (nums[m] >= target) {
                r = m
            } else {
                l = m + 1
            }
        }
        return l
    }
}
```

```swift
class Solution {
    func searchInsert(_ nums: [Int], _ target: Int) -> Int {
        var l = 0
        var r = nums.count
        while l < r {
            let m = l + (r - l) / 2
            if nums[m] >= target {
                r = m
            } else {
                l = m + 1
            }
        }
        return l
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 5. Built-In Binary Search Function

### Intuition

Most languages provide a built-in binary search or lower bound function. These functions return the index where the target is found or the position where it should be inserted to maintain sorted order. Using these avoids reimplementing binary search.

### Algorithm

1. Call the language's built-in binary search function (e.g., `bisect_left` in Python, `lower_bound` in C++, `Arrays.binarySearch` in Java).
2. If the function returns a negative value (Java), convert it to the insertion point (`-index - 1`).
3. Return the resulting index.

::tabs-start

```python
import bisect
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        return bisect.bisect_left(nums, target)
```

```java
public class Solution {
    public int searchInsert(int[] nums, int target) {
        int index = Arrays.binarySearch(nums, target);
        return index >= 0 ? index : -index - 1;
    }
}
```

```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        return lower_bound(nums.begin(), nums.end(), target) - nums.begin();
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
    searchInsert(nums, target) {
        // There is no built in Binary Search function for JS.
        let index = nums.findIndex((x) => x >= target);
        return index !== -1 ? index : nums.length;
    }
}
```

```csharp
public class Solution {
    public int SearchInsert(int[] nums, int target) {
        int idx = Array.BinarySearch(nums, target);
        return idx >= 0 ? idx : ~idx;
    }
}
```

```go
import "sort"

func searchInsert(nums []int, target int) int {
    return sort.SearchInts(nums, target)
}
```

```kotlin
class Solution {
    fun searchInsert(nums: IntArray, target: Int): Int {
        val idx = nums.binarySearch(target)
        return if (idx >= 0) idx else -(idx + 1)
    }
}
```

```swift
class Solution {
    func searchInsert(_ nums: [Int], _ target: Int) -> Int {
        var l = 0
        var r = nums.count
        while l < r {
            let m = l + (r - l) / 2
            if nums[m] >= target {
                r = m
            } else {
                l = m + 1
            }
        }
        return l
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Off-by-One Errors in Binary Search Boundaries

A frequent mistake is using incorrect loop conditions or boundary updates. Using `l < r` instead of `l <= r` (or vice versa) without adjusting the logic accordingly can cause the algorithm to miss elements or enter infinite loops. Similarly, setting `r = mid` instead of `r = mid - 1` in certain variants can lead to incorrect results or infinite loops.

### Forgetting to Handle the "Insert at End" Case

When the target is larger than all elements in the array, the insertion position should be `n` (the length of the array). Beginners often forget to account for this case, either returning `-1`, causing an index out of bounds error, or returning the last index incorrectly. Always ensure your algorithm correctly returns `n` when the target exceeds all array elements.
