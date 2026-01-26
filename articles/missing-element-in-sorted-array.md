## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Search** - The optimal solution uses binary search to find the position containing the k-th missing number in logarithmic time
- **Sorted Array Properties** - Understanding how to calculate missing elements between consecutive values in a sorted sequence

---

## 1. Iteration

### Intuition

Since the array is sorted and strictly increasing, any missing numbers must fall in the gaps between consecutive elements. For each pair of adjacent elements, we can calculate how many numbers are missing by looking at the difference minus one. As we scan through the array, we count missing numbers until we accumulate at least `k` of them. Once we find the gap that contains the `k`-th missing number, we can compute its exact value.

### Algorithm

1. Iterate through the array from index `1` to `n - 1`.
2. For each pair of consecutive elements, calculate `missedInGap = nums[i] - nums[i - 1] - 1`.
3. If `missedInGap >= k`, the `k`-th missing number lies in this gap. Return `nums[i - 1] + k`.
4. Otherwise, subtract `missedInGap` from `k` and continue.
5. If we finish the loop without finding the answer, the `k`-th missing number is beyond the last element. Return `nums[n - 1] + k`.

::tabs-start

```python
class Solution:
    def missingElement(self, nums: List[int], k: int) -> int:
        n = len(nums)

        for i in range(1, n):
            missed_in_gap = nums[i] - nums[i - 1] - 1
            if missed_in_gap >= k:
                return nums[i - 1] + k
            k -= missed_in_gap
        
        return nums[n - 1] + k
```

```java
class Solution {
    public int missingElement(int[] nums, int k) {
        int n = nums.length;
        
        for (int i = 1; i < n; ++i) {
            int missedInGap = nums[i] - nums[i - 1] - 1;
            if (missedInGap >= k) {
                return nums[i - 1] + k;
            }
            k -= missedInGap;
        }
        
        return nums[n - 1] + k;
    }
}
```

```cpp
class Solution {
public:
    int missingElement(vector<int>& nums, int k) {
        int n = nums.size();
        
        for (int i = 1; i < n; ++i) {
            int missedInGap = nums[i] - nums[i - 1] - 1;
            if (missedInGap >= k) {
                return nums[i - 1] + k;
            }
            k -= missedInGap;
        }
        
        return nums[n - 1] + k;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    missingElement(nums, k) {
        const n = nums.length;

        for (let i = 1; i < n; i++) {
            const missedInGap = nums[i] - nums[i - 1] - 1;
            if (missedInGap >= k) {
                return nums[i - 1] + k;
            }
            k -= missedInGap;
        }

        return nums[n - 1] + k;
    }
}
```

```csharp
public class Solution {
    public int MissingElement(int[] nums, int k) {
        int n = nums.Length;

        for (int i = 1; i < n; i++) {
            int missedInGap = nums[i] - nums[i - 1] - 1;
            if (missedInGap >= k) {
                return nums[i - 1] + k;
            }
            k -= missedInGap;
        }

        return nums[n - 1] + k;
    }
}
```

```go
func missingElement(nums []int, k int) int {
    n := len(nums)

    for i := 1; i < n; i++ {
        missedInGap := nums[i] - nums[i-1] - 1
        if missedInGap >= k {
            return nums[i-1] + k
        }
        k -= missedInGap
    }

    return nums[n-1] + k
}
```

```kotlin
class Solution {
    fun missingElement(nums: IntArray, k: Int): Int {
        val n = nums.size
        var remaining = k

        for (i in 1 until n) {
            val missedInGap = nums[i] - nums[i - 1] - 1
            if (missedInGap >= remaining) {
                return nums[i - 1] + remaining
            }
            remaining -= missedInGap
        }

        return nums[n - 1] + remaining
    }
}
```

```swift
class Solution {
    func missingElement(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        var k = k

        for i in 1..<n {
            let missedInGap = nums[i] - nums[i - 1] - 1
            if missedInGap >= k {
                return nums[i - 1] + k
            }
            k -= missedInGap
        }

        return nums[n - 1] + k
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ constant space

>  Where $n$ is the length of the input array `nums`.

---

## 2. Binary Search

### Intuition

Instead of scanning linearly, we can use binary search to find the position where the `k`-th missing number falls. The key observation is that for any index `i`, the count of missing numbers up to that point equals `nums[i] - nums[0] - i`. This formula works because in a complete sequence starting from `nums[0]`, we would expect `nums[0] + i` at index `i`. The difference tells us how many numbers were skipped. Since this count is monotonically increasing, binary search applies naturally.

### Algorithm

1. Initialize `left = 0` and `right = n - 1`.
2. While `left < right`:
   - Calculate `mid` using upper mid to avoid infinite loops.
   - Compute the number of missing elements up to index `mid`: `missing = nums[mid] - nums[0] - mid`.
   - If `missing < k`, the `k`-th missing number is to the right, so set `left = mid`.
   - Otherwise, set `right = mid - 1`.
3. After the loop, `left` points to the largest index where the count of missing numbers is less than `k`.
4. Return `nums[0] + k + left`.

::tabs-start

```python
class Solution:
    def missingElement(self, nums: List[int], k: int) -> int:
        n = len(nums)
        left, right = 0, n - 1
        
        while left < right:
            mid = right - (right - left) // 2
            if (nums[mid] - nums[0]) - mid < k:
                left = mid
            else:
                right = mid - 1

        return nums[0] + k + left 
```

```java
class Solution {
    public int missingElement(int[] nums, int k) {
        int n = nums.length;
        int left = 0, right = n - 1;
        
        while (left < right) {
            int mid = right - (right - left) / 2;
            if (nums[mid] - nums[0] - mid < k) {
                left = mid;
            } else{
                right = mid - 1;
            }
        }
        
        return nums[0] + k + left;
    }
}
```

```cpp
class Solution {
public:
    int missingElement(vector<int>& nums, int k) {
        int n = nums.size();
        int left = 0, right = n - 1;
        
        while (left < right) {
            int mid = right - (right - left) / 2;
            if (nums[mid] - nums[0] - mid < k) {
                left = mid;
            } else{
                right = mid - 1;
            }
        }
        
        return nums[0] + k + left;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    missingElement(nums, k) {
        const n = nums.length;
        let left = 0, right = n - 1;

        while (left < right) {
            const mid = right - Math.floor((right - left) / 2);
            if ((nums[mid] - nums[0]) - mid < k) {
                left = mid;
            } else {
                right = mid - 1;
            }
        }

        return nums[0] + k + left;
    }
}
```

```csharp
public class Solution {
    public int MissingElement(int[] nums, int k) {
        int n = nums.Length;
        int left = 0, right = n - 1;

        while (left < right) {
            int mid = right - (right - left) / 2;
            if (nums[mid] - nums[0] - mid < k) {
                left = mid;
            } else {
                right = mid - 1;
            }
        }

        return nums[0] + k + left;
    }
}
```

```go
func missingElement(nums []int, k int) int {
    n := len(nums)
    left, right := 0, n-1

    for left < right {
        mid := right - (right-left)/2
        if nums[mid]-nums[0]-mid < k {
            left = mid
        } else {
            right = mid - 1
        }
    }

    return nums[0] + k + left
}
```

```kotlin
class Solution {
    fun missingElement(nums: IntArray, k: Int): Int {
        val n = nums.size
        var left = 0
        var right = n - 1

        while (left < right) {
            val mid = right - (right - left) / 2
            if (nums[mid] - nums[0] - mid < k) {
                left = mid
            } else {
                right = mid - 1
            }
        }

        return nums[0] + k + left
    }
}
```

```swift
class Solution {
    func missingElement(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        var left = 0
        var right = n - 1

        while left < right {
            let mid = right - (right - left) / 2
            if nums[mid] - nums[0] - mid < k {
                left = mid
            } else {
                right = mid - 1
            }
        }

        return nums[0] + k + left
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$ constant space

>  Where $n$ is the length of the input array `nums`.

---

## Common Pitfalls

### Miscounting Missing Elements

The formula for counting missing elements up to index `i` is `nums[i] - nums[0] - i`. Using `nums[i] - i` without subtracting `nums[0]` gives incorrect counts when the array does not start at 0 or 1.

### Handling the Missing Element Beyond the Array

When `k` exceeds the total count of missing elements within the array, the answer lies beyond the last element. Failing to account for this case and only searching within array bounds leads to incorrect results or out-of-bounds errors.

### Binary Search Boundary Errors

Using the wrong mid calculation or boundary updates can cause infinite loops or skip valid positions. The upper-mid formula `mid = right - (right - left) / 2` is used here to avoid getting stuck; using standard lower-mid without proper boundary handling leads to incorrect convergence.
