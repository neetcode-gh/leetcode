## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Search** - The divide-and-conquer search algorithm that eliminates half the search space at each step
- **Rotated Sorted Arrays** - Understanding how rotation affects a sorted array and identifying which half remains sorted
- **Handling Duplicates** - Recognizing when duplicates prevent determining the sorted half and falling back to linear elimination

---

## 1. Brute Force

### Intuition

The simplest approach is to scan every element until we find the target. This ignores the sorted structure but guarantees correctness. Since we only need to know if the target exists, we return immediately upon finding it.

### Algorithm

1. Iterate through each element in the array.
2. If the current element equals the target, return `true`.
3. If no match is found after checking all elements, return `false`.

::tabs-start

```python
class Solution:
    def search(self, nums: List[int], target: int) -> bool:
        return target in nums
```

```java
public class Solution {
    public boolean search(int[] nums, int target) {
        for (int num : nums) {
            if (num == target) {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        for (int& num : nums) {
            if (num == target) {
                return true;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {boolean}
     */
    search(nums, target) {
        for (let num of nums) {
            if (num === target) {
                return true;
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool Search(int[] nums, int target) {
        return nums.Contains(target);
    }
}
```

```go
func search(nums []int, target int) bool {
    for _, num := range nums {
        if num == target {
            return true
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun search(nums: IntArray, target: Int): Boolean {
        return target in nums
    }
}
```

```swift
class Solution {
    func search(_ nums: [Int], _ target: Int) -> Bool {
        return nums.contains(target)
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

A rotated sorted array with duplicates still has a useful property: at least one half (left or right of `mid`) is always sorted. We can determine which half is sorted and check if the target lies within that range. The tricky case is when `nums[l] == nums[m]`, which means we cannot tell which side is sorted. In this case, we simply increment `l` to skip the duplicate and try again.

### Algorithm

1. Initialize two pointers `l = 0` and `r = n - 1`.
2. While `l <= r`:
   - Compute `m = l + (r - l) / 2`.
   - If `nums[m]` equals the target, return `true`.
   - If `nums[l] < nums[m]`, the left half is sorted:
     - If the target lies in `[nums[l], nums[m])`, search left by setting `r = m - 1`.
     - Otherwise, search right by setting `l = m + 1`.
   - Else if `nums[l] > nums[m]`, the right half is sorted:
     - If the target lies in `(nums[m], nums[r]]`, search right by setting `l = m + 1`.
     - Otherwise, search left by setting `r = m - 1`.
   - Else (`nums[l] == nums[m]`), increment `l` to skip the duplicate.
3. Return `false` if the loop ends without finding the target.

::tabs-start

```python
class Solution:
    def search(self, nums: List[int], target: int) -> bool:
        l, r = 0, len(nums) - 1
        while l <= r:
            m = l + (r - l) // 2
            if nums[m] == target:
                return True

            if nums[l] < nums[m]:  # Left portion
                if nums[l] <= target < nums[m]:
                    r = m - 1
                else:
                    l = m + 1
            elif nums[l] > nums[m]:  # Right portion
                if nums[m] < target <= nums[r]:
                    l = m + 1
                else:
                    r = m - 1
            else:
                l += 1

        return False
```

```java
public class Solution {
    public boolean search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;

        while (l <= r) {
            int m = l + (r - l) / 2;

            if (nums[m] == target) {
                return true;
            }

            if (nums[l] < nums[m]) { // Left portion
                if (nums[l] <= target && target < nums[m]) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            } else if (nums[l] > nums[m]) { // Right portion
                if (nums[m] < target && target <= nums[r]) {
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            } else {
                l++;
            }
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;

        while (l <= r) {
            int m = l + (r - l) / 2;

            if (nums[m] == target) {
                return true;
            }

            if (nums[l] < nums[m]) { // Left portion
                if (nums[l] <= target && target < nums[m]) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            } else if (nums[l] > nums[m]) { // Right portion
                if (nums[m] < target && target <= nums[r]) {
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            } else {
                l++;
            }
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {boolean}
     */
    search(nums, target) {
        let l = 0,
            r = nums.length - 1;

        while (l <= r) {
            const m = Math.floor(l + (r - l) / 2);

            if (nums[m] === target) {
                return true;
            }

            if (nums[l] < nums[m]) {
                // Left portion
                if (nums[l] <= target && target < nums[m]) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            } else if (nums[l] > nums[m]) {
                // Right portion
                if (nums[m] < target && target <= nums[r]) {
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            } else {
                l++;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool Search(int[] nums, int target) {
        int l = 0, r = nums.Length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (nums[m] == target) {
                return true;
            }

            if (nums[l] < nums[m]) {
                if (nums[l] <= target && target < nums[m]) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            } else if (nums[l] > nums[m]) {
                if (nums[m] < target && target <= nums[r]) {
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            } else {
                l++;
            }
        }
        return false;
    }
}
```

```go
func search(nums []int, target int) bool {
    l, r := 0, len(nums)-1
    for l <= r {
        m := l + (r-l)/2
        if nums[m] == target {
            return true
        }

        if nums[l] < nums[m] {
            if nums[l] <= target && target < nums[m] {
                r = m - 1
            } else {
                l = m + 1
            }
        } else if nums[l] > nums[m] {
            if nums[m] < target && target <= nums[r] {
                l = m + 1
            } else {
                r = m - 1
            }
        } else {
            l++
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun search(nums: IntArray, target: Int): Boolean {
        var l = 0
        var r = nums.size - 1

        while (l <= r) {
            val m = l + (r - l) / 2
            if (nums[m] == target) {
                return true
            }

            if (nums[l] < nums[m]) {
                if (nums[l] <= target && target < nums[m]) {
                    r = m - 1
                } else {
                    l = m + 1
                }
            } else if (nums[l] > nums[m]) {
                if (nums[m] < target && target <= nums[r]) {
                    l = m + 1
                } else {
                    r = m - 1
                }
            } else {
                l++
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func search(_ nums: [Int], _ target: Int) -> Bool {
        var l = 0
        var r = nums.count - 1

        while l <= r {
            let m = l + (r - l) / 2
            if nums[m] == target {
                return true
            }

            if nums[l] < nums[m] {
                if nums[l] <= target && target < nums[m] {
                    r = m - 1
                } else {
                    l = m + 1
                }
            } else if nums[l] > nums[m] {
                if nums[m] < target && target <= nums[r] {
                    l = m + 1
                } else {
                    r = m - 1
                }
            } else {
                l += 1
            }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$ in average case, $O(n)$ in worst case.
- Space complexity: $O(1)$

---

## Common Pitfalls

### Not Handling the Duplicate Case

When `nums[l] == nums[m]`, you cannot determine which half is sorted. Simply incrementing `l` by one is the correct approach, but forgetting this case or trying to apply normal binary search logic will produce incorrect results. This case is what distinguishes this problem from the version without duplicates.

### Incorrect Boundary Checks for Target Range

When checking if the target lies in the sorted half, using incorrect comparison operators is a common mistake. For the left sorted portion, use `nums[l] <= target < nums[m]`. For the right sorted portion, use `nums[m] < target <= nums[r]`. Missing the equals sign on the boundary elements will cause the algorithm to miss valid targets.

### Assuming O(log n) Time Complexity

Unlike the non-duplicate version, this problem has O(n) worst-case time complexity when all elements are duplicates except one. Assuming O(log n) performance and not accounting for this edge case in time-sensitive applications can lead to timeout issues.
