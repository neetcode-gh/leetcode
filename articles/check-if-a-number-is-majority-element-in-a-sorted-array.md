## 1. Frequency Count

### Intuition

A majority element appears more than half the time. The simplest approach is to count how many times the target appears in the array by scanning through all elements. If the count exceeds `n`/2, the target is a majority element.

### Algorithm

1. Initialize a counter to 0.
2. Iterate through the array:
   - Increment the counter each time we encounter the target.
3. Return `true` if the count is greater than half the array length, `false` otherwise.

::tabs-start

```python
class Solution:
    def isMajorityElement(self, nums: List[int], target: int) -> bool:
        count = 0
        for num in nums:
            count = count + 1 if num == target else count
        
        return count > len(nums) // 2
```

```java
class Solution {
    public boolean isMajorityElement(int[] nums, int target) {
        int count = 0;
        for (int num : nums) {
            count = num == target ? count + 1 : count;
        }
        
        return count > nums.length / 2;
    }
}
```

```cpp
class Solution {
public:
    bool isMajorityElement(vector<int>& nums, int target) {
        int count = 0;
        for (int num : nums) {
            count = num == target ? count + 1 : count;
        }
        
        return count > nums.size() / 2;
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
    isMajorityElement(nums, target) {
        let count = 0;
        for (let num of nums) {
            count = num === target ? count + 1 : count;
        }
        
        return count > Math.floor(nums.length / 2);
    }
}
```

```csharp
public class Solution {
    public bool IsMajorityElement(int[] nums, int target) {
        int count = 0;
        foreach (int num in nums) {
            count = num == target ? count + 1 : count;
        }

        return count > nums.Length / 2;
    }
}
```

```go
func isMajorityElement(nums []int, target int) bool {
    count := 0
    for _, num := range nums {
        if num == target {
            count++
        }
    }

    return count > len(nums)/2
}
```

```kotlin
class Solution {
    fun isMajorityElement(nums: IntArray, target: Int): Boolean {
        var count = 0
        for (num in nums) {
            count = if (num == target) count + 1 else count
        }

        return count > nums.size / 2
    }
}
```

```swift
class Solution {
    func isMajorityElement(_ nums: [Int], _ target: Int) -> Bool {
        var count = 0
        for num in nums {
            count = num == target ? count + 1 : count
        }

        return count > nums.count / 2
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(1)$ constant space

>  Where $N$ is the size of `nums`.

---

## 2. Binary Search (Two Pass)

### Intuition

Since the array is sorted, all occurrences of the target are contiguous. We can use binary search to find the first and last occurrence of the target. The count is simply (`lastIndex` - `firstIndex` + 1), which we compare against `n`/2.

### Algorithm

1. Use `lower_bound` to find the index of the first element >= target.
2. Use `upper_bound` to find the index of the first element > target.
3. The count of target is (`upper_bound` - `lower_bound`).
4. Return `true` if this count is greater than `n`/2.

::tabs-start

```python
class Solution:
    def lower_bound(self, nums: List[int], target: int) -> int:
        """
        Returns the index of the first element equal to or greater than the target.
        If there is no instance of the target in the list, it returns the length of the list.
        """
        start = 0
        end = len(nums) - 1
        index = len(nums)
        
        while start <= end:
            mid = (start + end) // 2
            if nums[mid] >= target:
                end = mid - 1
                index = mid
            else:
                start = mid + 1
        
        return index
    
    def upper_bound(self, nums: List[int], target: int) -> int:
        """
        Returns the index of the first element greater than the target.
        If there is no instance of the target in the list, it returns the length of the list.
        """
        start = 0
        end = len(nums) - 1
        index = len(nums)
        
        while start <= end:
            mid = (start + end) // 2
            if nums[mid] > target:
                end = mid - 1
                index = mid
            else:
                start = mid + 1
        
        return index
    
    def isMajorityElement(self, nums: List[int], target: int) -> bool:
        first_index = self.lower_bound(nums, target)
        next_to_last_index = self.upper_bound(nums, target)
        return next_to_last_index - first_index > len(nums) // 2
```

```java
class Solution {
    // Returns the index of the first element equal to or greater than the target.
    // If there is no instance of the target in the list, it returns the length of the list.
    int lower_bound(int[] nums, int target) {
        int start = 0;
        int end = nums.length - 1;
        int index = nums.length;
            
        while (start <= end) {
            int mid = (start + end) / 2;
            
            if (nums[mid] >= target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    // Returns the index of the first element greater than the target.
    // If there is no instance of the target in the list, it returns the length of the list.
    int upper_bound(int[] nums, int target) {
        int start = 0;
        int end = nums.length - 1;
        int index = nums.length;
        
        while (start <= end) {
            int mid = (start + end) / 2;
            
            if (nums[mid] > target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    public boolean isMajorityElement(int[] nums, int target) {
        int firstIndex = lower_bound(nums, target);
        int nextToLastIndex = upper_bound(nums, target);
        
        return nextToLastIndex - firstIndex > nums.length / 2;
    }
}
```

```cpp
class Solution {
public:
    // Returns the index of the first element equal to or greater than the target.
    // If there is no instance of the target in the list, it returns the length of the list.
    int lower_bound(vector<int>& nums, int target) {
        int start = 0;
        int end = nums.size() - 1;
        int index = nums.size();
            
        while (start <= end) {
            int mid = (start + end) / 2;
            
            if (nums[mid] >= target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    // Returns the index of the first element greater than the target.
    // If there is no instance of the target in the list, it returns the length of the list.
    int upper_bound(vector<int>& nums, int target) {
        int start = 0;
        int end = nums.size() - 1;
        int index = nums.size();
        
        while (start <= end) {
            int mid = (start + end) / 2;
            
            if (nums[mid] > target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    bool isMajorityElement(vector<int>& nums, int target) {
        int firstIndex = lower_bound(nums, target);
        int nextToLastIndex = upper_bound(nums, target);
        
        return nextToLastIndex - firstIndex > nums.size() / 2;
    }
};
```

```javascript
class Solution {
    /**
     * Returns the index of the first element equal to or greater than the target.
     * If there is no instance of the target in the list, it returns the length of the list.
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    lowerBound(nums, target) {
        let start = 0;
        let end = nums.length - 1;
        let index = nums.length;
        
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            if (nums[mid] >= target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    /**
     * Returns the index of the first element greater than the target.
     * If there is no instance of the target in the list, it returns the length of the list.
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    upperBound(nums, target) {
        let start = 0;
        let end = nums.length - 1;
        let index = nums.length;
        
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            if (nums[mid] > target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {boolean}
     */
    isMajorityElement(nums, target) {
        const firstIndex = this.lowerBound(nums, target);
        const nextToLastIndex = this.upperBound(nums, target);
        return nextToLastIndex - firstIndex > Math.floor(nums.length / 2);
    }
}
```

```csharp
public class Solution {
    private int LowerBound(int[] nums, int target) {
        int start = 0;
        int end = nums.Length - 1;
        int index = nums.Length;

        while (start <= end) {
            int mid = (start + end) / 2;
            if (nums[mid] >= target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }

        return index;
    }

    private int UpperBound(int[] nums, int target) {
        int start = 0;
        int end = nums.Length - 1;
        int index = nums.Length;

        while (start <= end) {
            int mid = (start + end) / 2;
            if (nums[mid] > target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }

        return index;
    }

    public bool IsMajorityElement(int[] nums, int target) {
        int firstIndex = LowerBound(nums, target);
        int nextToLastIndex = UpperBound(nums, target);
        return nextToLastIndex - firstIndex > nums.Length / 2;
    }
}
```

```go
func isMajorityElement(nums []int, target int) bool {
    lowerBound := func(nums []int, target int) int {
        start, end := 0, len(nums)-1
        index := len(nums)

        for start <= end {
            mid := (start + end) / 2
            if nums[mid] >= target {
                end = mid - 1
                index = mid
            } else {
                start = mid + 1
            }
        }

        return index
    }

    upperBound := func(nums []int, target int) int {
        start, end := 0, len(nums)-1
        index := len(nums)

        for start <= end {
            mid := (start + end) / 2
            if nums[mid] > target {
                end = mid - 1
                index = mid
            } else {
                start = mid + 1
            }
        }

        return index
    }

    firstIndex := lowerBound(nums, target)
    nextToLastIndex := upperBound(nums, target)
    return nextToLastIndex-firstIndex > len(nums)/2
}
```

```kotlin
class Solution {
    private fun lowerBound(nums: IntArray, target: Int): Int {
        var start = 0
        var end = nums.size - 1
        var index = nums.size

        while (start <= end) {
            val mid = (start + end) / 2
            if (nums[mid] >= target) {
                end = mid - 1
                index = mid
            } else {
                start = mid + 1
            }
        }

        return index
    }

    private fun upperBound(nums: IntArray, target: Int): Int {
        var start = 0
        var end = nums.size - 1
        var index = nums.size

        while (start <= end) {
            val mid = (start + end) / 2
            if (nums[mid] > target) {
                end = mid - 1
                index = mid
            } else {
                start = mid + 1
            }
        }

        return index
    }

    fun isMajorityElement(nums: IntArray, target: Int): Boolean {
        val firstIndex = lowerBound(nums, target)
        val nextToLastIndex = upperBound(nums, target)
        return nextToLastIndex - firstIndex > nums.size / 2
    }
}
```

```swift
class Solution {
    func isMajorityElement(_ nums: [Int], _ target: Int) -> Bool {
        func lowerBound(_ nums: [Int], _ target: Int) -> Int {
            var start = 0
            var end = nums.count - 1
            var index = nums.count

            while start <= end {
                let mid = (start + end) / 2
                if nums[mid] >= target {
                    end = mid - 1
                    index = mid
                } else {
                    start = mid + 1
                }
            }

            return index
        }

        func upperBound(_ nums: [Int], _ target: Int) -> Int {
            var start = 0
            var end = nums.count - 1
            var index = nums.count

            while start <= end {
                let mid = (start + end) / 2
                if nums[mid] > target {
                    end = mid - 1
                    index = mid
                } else {
                    start = mid + 1
                }
            }

            return index
        }

        let firstIndex = lowerBound(nums, target)
        let nextToLastIndex = upperBound(nums, target)
        return nextToLastIndex - firstIndex > nums.count / 2
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log N)$
- Space complexity: $O(1)$  constant space

>  Where $N$ is the size of `nums`.

---

## 3. Binary Search (One Pass)

### Intuition

If the target is a majority element, it must occupy more than half the array positions. This means if we find the first occurrence at index `i`, the element at index `i` + `n`/2 must also be the target. We only need one binary search to find the first occurrence, then check this specific position.

### Algorithm

1. Use `lower_bound` to find the first occurrence of the target at index `i`.
2. Calculate the position `i` + `n`/2 (where `n` is the array length).
3. If this position is within bounds and the element at that position equals the target, return `true`.
4. Otherwise, return `false`.

::tabs-start

```python
class Solution:
    def lower_bound(self, nums: List[int], target: int) -> int:
        """
        Returns the index of the first element that is equal to or greater than the target.
        If there is no instance of the target in the list, it returns the length of the list.
        """
        start = 0
        end = len(nums) - 1
        index = len(nums)
        
        while start <= end:
            mid = (start + end) // 2
            if nums[mid] >= target:
                end = mid - 1
                index = mid
            else:
                start = mid + 1
        
        return index
    
    def isMajorityElement(self, nums: List[int], target: int) -> bool:
        first_index = self.lower_bound(nums, target)
        return first_index + len(nums) // 2 < len(nums) and nums[first_index + len(nums) // 2] == target
```

```java
class Solution {
    // Returns the index of the first element that is equal to or greater than the target.
    // If there is no instance of the target in the list, it returns the length of the list.
    int lower_bound(int[] nums, int target) {
        int start = 0;
        int end = nums.length - 1;
        int index = nums.length;
            
        while (start <= end) {
            int mid = (start + end) / 2;
            
            if (nums[mid] >= target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    public boolean isMajorityElement(int[] nums, int target) {
        int firstIndex = lower_bound(nums, target);
        
        return firstIndex + nums.length / 2 < nums.length && nums[firstIndex + nums.length / 2] == target;
    }
}
```

```cpp
class Solution {
public:
    // Returns the index of the first element equal to or greater than the target.
    // If there is no instance of the target in the list, it returns the length of the list.
    int lower_bound(vector<int>& nums, int target) {
        int start = 0;
        int end = nums.size() - 1;
        int index = nums.size();
            
        while (start <= end) {
            int mid = (start + end) / 2;
            
            if (nums[mid] >= target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    bool isMajorityElement(vector<int>& nums, int target) {
        int firstIndex = lower_bound(nums, target);
        
        return firstIndex + nums.size() / 2 < nums.size() && nums[firstIndex + nums.size() / 2] == target;
    }
};
```

```javascript
class Solution {
    /**
     * Returns the index of the first element that is equal to or greater than the target.
     * If there is no instance of the target in the list, it returns the length of the list.
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    lowerBound(nums, target) {
        let start = 0;
        let end = nums.length - 1;
        let index = nums.length;
        
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            if (nums[mid] >= target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }
        
        return index;
    }
    
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {boolean}
     */
    isMajorityElement(nums, target) {
        const firstIndex = this.lowerBound(nums, target);
        return firstIndex + Math.floor(nums.length / 2) < nums.length && nums[firstIndex + Math.floor(nums.length / 2)] === target;
    }
}
```

```csharp
public class Solution {
    private int LowerBound(int[] nums, int target) {
        int start = 0;
        int end = nums.Length - 1;
        int index = nums.Length;

        while (start <= end) {
            int mid = (start + end) / 2;
            if (nums[mid] >= target) {
                end = mid - 1;
                index = mid;
            } else {
                start = mid + 1;
            }
        }

        return index;
    }

    public bool IsMajorityElement(int[] nums, int target) {
        int firstIndex = LowerBound(nums, target);
        return firstIndex + nums.Length / 2 < nums.Length && nums[firstIndex + nums.Length / 2] == target;
    }
}
```

```go
func isMajorityElement(nums []int, target int) bool {
    lowerBound := func(nums []int, target int) int {
        start, end := 0, len(nums)-1
        index := len(nums)

        for start <= end {
            mid := (start + end) / 2
            if nums[mid] >= target {
                end = mid - 1
                index = mid
            } else {
                start = mid + 1
            }
        }

        return index
    }

    firstIndex := lowerBound(nums, target)
    return firstIndex+len(nums)/2 < len(nums) && nums[firstIndex+len(nums)/2] == target
}
```

```kotlin
class Solution {
    private fun lowerBound(nums: IntArray, target: Int): Int {
        var start = 0
        var end = nums.size - 1
        var index = nums.size

        while (start <= end) {
            val mid = (start + end) / 2
            if (nums[mid] >= target) {
                end = mid - 1
                index = mid
            } else {
                start = mid + 1
            }
        }

        return index
    }

    fun isMajorityElement(nums: IntArray, target: Int): Boolean {
        val firstIndex = lowerBound(nums, target)
        return firstIndex + nums.size / 2 < nums.size && nums[firstIndex + nums.size / 2] == target
    }
}
```

```swift
class Solution {
    func isMajorityElement(_ nums: [Int], _ target: Int) -> Bool {
        func lowerBound(_ nums: [Int], _ target: Int) -> Int {
            var start = 0
            var end = nums.count - 1
            var index = nums.count

            while start <= end {
                let mid = (start + end) / 2
                if nums[mid] >= target {
                    end = mid - 1
                    index = mid
                } else {
                    start = mid + 1
                }
            }

            return index
        }

        let firstIndex = lowerBound(nums, target)
        return firstIndex + nums.count / 2 < nums.count && nums[firstIndex + nums.count / 2] == target
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log N)$
- Space complexity: $O(1)$  constant space

>  Where $N$ is the size of `nums`.
