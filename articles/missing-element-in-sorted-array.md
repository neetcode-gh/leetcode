## 1. Iteration

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
