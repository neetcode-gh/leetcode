## 1. Brute Force

### Intuition

A rotated sorted array still contains all its original values, just shifted.  
So the simplest way to find the minimum is to **look at every element and pick the smallest one**.  
This requires no special logic and works in all cases, but it is not the most efficient.

---

### Algorithm

1. Scan through the entire array.
2. Track the smallest value seen so far.
3. After checking every element, return the minimum.

::tabs-start

```python
class Solution:
    def findMin(self, nums: List[int]) -> int:
        return min(nums)
```

```java
public class Solution {
    public int findMin(int[] nums) {
        return Arrays.stream(nums).min().getAsInt();
    }
}
```

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        return *min_element(nums.begin(), nums.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findMin(nums) {
        return Math.min(...nums);
    }
}
```

```csharp
public class Solution {
    public int FindMin(int[] nums) {
        return nums.Min();
    }
}
```

```go
func findMin(nums []int) int {
    minVal := nums[0]
    for _, num := range nums {
        if num < minVal {
            minVal = num
        }
    }
    return minVal
}
```

```kotlin
class Solution {
    fun findMin(nums: IntArray): Int {
        return nums.min()
    }
}
```

```swift
class Solution {
    func findMin(_ nums: [Int]) -> Int {
        return nums.min()!
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

A rotated sorted array has one special property:  
**one part is always sorted, and the other part contains the rotation (and the minimum element).**

We can use binary search to identify which side is sorted:
- If the left half is sorted, then the minimum cannot be there, so we search the right half.
- If the right half is sorted, then the minimum must be in the left half (or at the midpoint).

This lets us eliminate half of the array each time and quickly narrow down to the smallest value.

---

### Algorithm

1. Initialize `left = 0`, `right = n - 1`, and store the first element as the current answer.
2. While `left <= right`:
   - If the current window is already sorted, update the answer with `nums[left]` and stop.
   - Compute `mid`.
   - Update the answer with `nums[mid]`.
   - If the left half is sorted:
     - Move search to the right half.
   - Otherwise:
     - Search in the left half.
3. Return the smallest value found.

::tabs-start

```python
class Solution:
    def findMin(self, nums: List[int]) -> int:
        res = nums[0]
        l, r = 0, len(nums) - 1

        while l <= r:
            if nums[l] < nums[r]:
                res = min(res, nums[l])
                break

            m = (l + r) // 2
            res = min(res, nums[m])
            if nums[m] >= nums[l]:
                l = m + 1
            else:
                r = m - 1
        return res
```

```java
public class Solution {
    public int findMin(int[] nums) {
        int l = 0;
        int r = nums.length - 1;
        int res = nums[0];

        while (l <= r) {
            if (nums[l] < nums[r]) {
                res = Math.min(res, nums[l]);
                break;
            }

            int m = l + (r - l) / 2;
            res = Math.min(res, nums[m]);
            if (nums[m] >= nums[l]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findMin(vector<int> &nums) {
        int res = nums[0];
        int l = 0;
        int r = nums.size() - 1;

        while (l <= r) {
            if (nums[l] < nums[r]) {
                res = min(res, nums[l]);
                break;
            }
            int m = l + (r - l) / 2;
            res = min(res, nums[m]);

            if (nums[m] >= nums[l]) {
                l = m + 1;
            } else {
                r = m - 1;
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
    findMin(nums) {
        let l = 0;
        let r = nums.length - 1;
        let res = nums[0];

        while (l <= r) {
            if (nums[l] <= nums[r]) {
                res = Math.min(res, nums[l]);
                break;
            }

            let m = l + Math.floor((r - l) / 2);
            res = Math.min(res, nums[m]);
            if (nums[m] >= nums[l]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int FindMin(int[] nums) {
        int l = 0, r = nums.Length - 1;
        int res = nums[0];

        while (l <= r) {
            if (nums[l] < nums[r]) {
                res = Math.Min(res, nums[l]);
                break;
            }

            int m = l + (r - l) / 2;
            res = Math.Min(res, nums[m]);
            if (nums[m] >= nums[l]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return res;
    }
}
```

```go
func findMin(nums []int) int {
    res := nums[0]
    l, r := 0, len(nums)-1

    for l <= r {
        if nums[l] < nums[r] {
            if nums[l] < res {
                res = nums[l]
            }
            break
        }

        m := l + (r-l)/2
        if nums[m] < res {
            res = nums[m]
        }

        if nums[m] >= nums[l] {
            l = m + 1
        } else {
            r = m - 1
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findMin(nums: IntArray): Int {
        var res = nums[0]
        var l = 0
        var r = nums.size - 1

        while (l <= r) {
            if (nums[l] < nums[r]) {
                res = minOf(res, nums[l])
                break
            }

            val m = l + (r - l) / 2
            res = minOf(res, nums[m])

            if (nums[m] >= nums[l]) {
                l = m + 1
            } else {
                r = m - 1
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findMin(_ nums: [Int]) -> Int {
        var res = nums[0]
        var l = 0, r = nums.count - 1

        while l <= r {
            if nums[l] < nums[r] {
                res = min(res, nums[l])
                break
            }

            let m = (l + r) / 2
            res = min(res, nums[m])

            if nums[m] >= nums[l] {
                l = m + 1
            } else {
                r = m - 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 3. Binary Search (Lower Bound)

### Intuition

In a rotated sorted array, the minimum element is the **first element of the rotated portion**.  
Using binary search, we compare the middle value with the rightmost value:

- If `nums[mid] < nums[right]`, then the minimum lies **in the left half (including mid)**.
- Otherwise, the minimum lies **in the right half (excluding mid)**.

This behaves exactly like finding a **lower bound**, gradually shrinking the search space until only the minimum remains.

---

### Algorithm

1. Set `left = 0` and `right = n - 1`.
2. While `left < right`:
   - Compute `mid`.
   - If `nums[mid]` is less than `nums[right]`, move `right` to `mid` (minimum is on the left).
   - Otherwise, move `left` to `mid + 1` (minimum is on the right).
3. When the loop ends, `left` points to the smallest element.
4. Return `nums[left]`.

::tabs-start

```python
class Solution:
    def findMin(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1
        while l < r:
            m = l + (r - l) // 2
            if nums[m] < nums[r]:
                r = m
            else:
                l = m + 1
        return nums[l]
```

```java
public class Solution {
    public int findMin(int[] nums) {
        int l = 0;
        int r = nums.length - 1;

        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] < nums[r]) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return nums[l];
    }
}
```

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] < nums[r]) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return nums[l];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findMin(nums) {
        let l = 0,
            r = nums.length - 1;
        while (l < r) {
            let m = l + Math.floor((r - l) / 2);
            if (nums[m] < nums[r]) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return nums[l];
    }
}
```

```csharp
public class Solution {
    public int FindMin(int[] nums) {
        int l = 0;
        int r = nums.Length - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] < nums[r]) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return nums[l];
    }
}
```

```go
func findMin(nums []int) int {
    l, r := 0, len(nums)-1
    for l < r {
        m := l + (r-l)/2
        if nums[m] < nums[r] {
            r = m
        } else {
            l = m + 1
        }
    }
    return nums[l]
}
```

```kotlin
class Solution {
    fun findMin(nums: IntArray): Int {
        var l = 0
        var r = nums.size - 1
        while (l < r) {
            val m = l + (r - l) / 2
            if (nums[m] < nums[r]) {
                r = m
            } else {
                l = m + 1
            }
        }
        return nums[l]
    }
}
```

```swift
class Solution {
    func findMin(_ nums: [Int]) -> Int {
        var l = 0, r = nums.count - 1
        while l < r {
            let m = l + (r - l) / 2
            if nums[m] < nums[r] {
                r = m
            } else {
                l = m + 1
            }
        }
        return nums[l]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$
