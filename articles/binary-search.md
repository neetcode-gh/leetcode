## 1. Recursive Binary Search

::tabs-start

```python
class Solution:
    def binary_search(self, l: int, r: int, nums: List[int], target: int) -> int:
        if l > r:
            return -1
        m = l + (r - l) // 2
        
        if nums[m] == target:
            return m
        if nums[m] < target:
            return self.binary_search(m + 1, r, nums, target)
        return self.binary_search(l, m - 1, nums, target)

    def search(self, nums: List[int], target: int) -> int:
        return self.binary_search(0, len(nums) - 1, nums, target)
```

```java
public class Solution {
    public int binary_search(int l, int r, int[] nums, int target) {
        if (l > r) return -1;
        int m = l + (r - l) / 2;
        
        if (nums[m] == target) return m;
        return (nums[m] < target) ? 
            binary_search(m + 1, r, nums, target) : 
            binary_search(l, m - 1, nums, target);
    }

    public int search(int[] nums, int target) {
        return binary_search(0, nums.length - 1, nums, target);
    }
}
```

```cpp
class Solution {
public:
    int binary_search(int l, int r, vector<int>& nums, int target){
        if (l > r) return -1;
        int m = l + (r - l) / 2;
        
        if (nums[m] == target) return m;
        return ((nums[m] < target) ? 
                binary_search(m + 1, r, nums, target) : 
                binary_search(l, m - 1, nums, target));
    }

    int search(vector<int>& nums, int target) {
        return binary_search(0, nums.size() - 1, nums, target);
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
    binary_search(l, r, nums, target) {
        if (l > r) return -1;
        let m = l + Math.floor((r - l) / 2);
        
        if (nums[m] === target) return m;
        return (nums[m] < target) ? 
            this.binary_search(m + 1, r, nums, target) : 
            this.binary_search(l, m - 1, nums, target);
    }

    search(nums, target) {
        return this.binary_search(0, nums.length - 1, nums, target);
    }
}
```

```csharp
public class Solution {
    public int BinarySearch(int l, int r, int[] nums, int target) {
        if (l > r) return -1;
        int m = l + (r - l) / 2;
        
        if (nums[m] == target) return m;
        return (nums[m] < target) ? 
            BinarySearch(m + 1, r, nums, target) : 
            BinarySearch(l, m - 1, nums, target);
    }

    public int Search(int[] nums, int target) {
        return BinarySearch(0, nums.Length - 1, nums, target);
    }
}
```

```go
func binarySearch(l, r int, nums []int, target int) int {
    if l > r {
        return -1
    }
    m := l + (r-l)/2

    if nums[m] == target {
        return m
    }
    if nums[m] < target {
        return binarySearch(m+1, r, nums, target)
    }
    return binarySearch(l, m-1, nums, target)
}

func search(nums []int, target int) int {
    return binarySearch(0, len(nums)-1, nums, target)
}
```

```kotlin
class Solution {
    private fun binarySearch(l: Int, r: Int, nums: IntArray, target: Int): Int {
        if (l > r) {
            return -1
        }
        val m = l + (r - l) / 2

        return when {
            nums[m] == target -> m
            nums[m] < target -> binarySearch(m + 1, r, nums, target)
            else -> binarySearch(l, m - 1, nums, target)
        }
    }

    fun search(nums: IntArray, target: Int): Int {
        return binarySearch(0, nums.size - 1, nums, target)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\log n)$
* Space complexity: $O(\log n)$

---

## 2. Iterative Binary Search

::tabs-start

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1

        while l <= r:
            # (l + r) // 2 can lead to overflow
            m = l + ((r - l) // 2)  

            if nums[m] > target:
                r = m - 1
            elif nums[m] < target:
                l = m + 1
            else:
                return m
        return -1
```

```java
public class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;

        while (l <= r) {
            int m = l + ((r - l) / 2);
            if (nums[m] > target) {
                r = m - 1;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                return m;
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

        while (l <= r) {
            int m = l + ((r - l) / 2);
            if (nums[m] > target) {
                r = m - 1;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                return m;
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

        while (l <= r) {
            const m = l + Math.floor((r - l) / 2);
            if (nums[m] > target) {
                r = m - 1;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                return m;
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
            int m = l + ((r - l) / 2);
            if (nums[m] > target) {
                r = m - 1;
            } else if (nums[m] < target) {
                l = m + 1;
            } else {
                return m;
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
        m := l + (r-l)/2

        if nums[m] > target {
            r = m - 1
        } else if nums[m] < target {
            l = m + 1
        } else {
            return m
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
            val m = l + (r - l) / 2

            when {
                nums[m] > target -> r = m - 1
                nums[m] < target -> l = m + 1
                else -> return m
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\log n)$
* Space complexity: $O(1)$

---

## 3. Upper Bound

::tabs-start

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums)

        while l < r:
            m = l + ((r - l) // 2)  
            if nums[m] > target:
                r = m
            elif nums[m] <= target:
                l = m + 1
        return l - 1 if (l and nums[l - 1] == target) else -1 
```

```java
public class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length;

        while (l < r) {
            int m = l + ((r - l) / 2);
            if (nums[m] > target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return (l > 0 && nums[l - 1] == target) ? l - 1 : -1;
    }
}
```

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size();

        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] > target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return (l > 0 && nums[l - 1] == target) ? l - 1 : -1;
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
        let l = 0, r = nums.length;

        while (l < r) {
            let m = l + Math.floor((r - l) / 2);
            if (nums[m] > target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return (l > 0 && nums[l - 1] === target) ? l - 1 : -1;
    }
}
```

```csharp
public class Solution {
    public int Search(int[] nums, int target) {
        int l = 0, r = nums.Length;

        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] > target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return (l > 0 && nums[l - 1] == target) ? l - 1 : -1;
    }
}
```

```go
func search(nums []int, target int) int {
    l, r := 0, len(nums)

    for l < r {
        m := l + (r-l)/2
        if nums[m] > target {
            r = m
        } else {
            l = m + 1
        }
    }
    if l > 0 && nums[l-1] == target {
        return l - 1
    }
    return -1
}
```

```kotlin
class Solution {
    fun search(nums: IntArray, target: Int): Int {
        var l = 0
        var r = nums.size

        while (l < r) {
            val m = l + (r - l) / 2
            if (nums[m] > target) {
                r = m
            } else {
                l = m + 1
            }
        }
        return if (l > 0 && nums[l - 1] == target) l - 1 else -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\log n)$
* Space complexity: $O(1)$

---

## 4. Lower Bound

::tabs-start

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums)

        while l < r:
            m = l + ((r - l) // 2)  
            if nums[m] >= target:
                r = m
            elif nums[m] < target:
                l = m + 1
        return l if (l < len(nums) and nums[l] == target) else -1 
```

```java
public class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length;

        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return (l < nums.length && nums[l] == target) ? l : -1;
    }
}
```

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size();

        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return (l < nums.size() && nums[l] == target) ? l : -1;
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
        let l = 0, r = nums.length;

        while (l < r) {
            let m = l + Math.floor((r - l) / 2);
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return (l < nums.length && nums[l] === target) ? l : -1;
    }
}
```

```csharp
public class Solution {
    public int Search(int[] nums, int target) {
        int l = 0, r = nums.Length;

        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return (l < nums.Length && nums[l] == target) ? l : -1;
    }
}
```

```go
func search(nums []int, target int) int {
    l, r := 0, len(nums)

    for l < r {
        m := l + (r-l)/2
        if nums[m] >= target {
            r = m
        } else {
            l = m + 1
        }
    }
    if l < len(nums) && nums[l] == target {
        return l
    }
    return -1
}
```

```kotlin
class Solution {
    fun search(nums: IntArray, target: Int): Int {
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
        return if (l < nums.size && nums[l] == target) l else -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\log n)$
* Space complexity: $O(1)$

---

## 5. Built-In Tool

::tabs-start

```python
import bisect
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        index = bisect.bisect_left(nums, target)
        return index if index < len(nums) and nums[index] == target else -1
```

```java
public class Solution {
    public int search(int[] nums, int target) {
        int index = Arrays.binarySearch(nums, target);
        return index >= 0 ? index : -1;
    }
}
```

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        auto it = lower_bound(nums.begin(), nums.end(), target);
        return (it != nums.end() && *it == target) ? it - nums.begin() : -1;
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
        // There is no built in function for JS.
        return nums.indexOf(target);
    }
}
```

```csharp
public class Solution {
    public int Search(int[] nums, int target) {
        int index = Array.BinarySearch(nums, target);
        return index >= 0 ? index : -1;
    }
}
```

```go
func search(nums []int, target int) int {
    index := sort.Search(len(nums), func(i int) bool { return nums[i] >= target })
    if index < len(nums) && nums[index] == target {
        return index
    }
    return -1
}
```

```kotlin
class Solution {
    fun search(nums: IntArray, target: Int): Int {
        val index = nums.binarySearch(target)
        return if (index >= 0) index else -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\log n)$
* Space complexity: $O(1)$