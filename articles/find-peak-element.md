## 1. Brute Force

::tabs-start

```python
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        for i in range(len(nums) - 1):
            if nums[i] > nums[i + 1]:
                return i

        return len(nums) - 1
```

```java
public class Solution {
    public int findPeakElement(int[] nums) {
        for (int i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                return i;
            }
        }
        return nums.length - 1;
    }
}
```

```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        for (int i = 0; i < nums.size() - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                return i;
            }
        }
        return nums.size() - 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findPeakElement(nums) {
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                return i;
            }
        }
        return nums.length - 1;
    }
}
```

```csharp
public class Solution {
    public int FindPeakElement(int[] nums) {
        for (int i = 0; i < nums.Length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                return i;
            }
        }
        return nums.Length - 1;
    }
}
```

```go
func findPeakElement(nums []int) int {
    for i := 0; i < len(nums)-1; i++ {
        if nums[i] > nums[i+1] {
            return i
        }
    }
    return len(nums) - 1
}
```

```kotlin
class Solution {
    fun findPeakElement(nums: IntArray): Int {
        for (i in 0 until nums.size - 1) {
            if (nums[i] > nums[i + 1]) {
                return i
            }
        }
        return nums.size - 1
    }
}
```

```swift
class Solution {
    func findPeakElement(_ nums: [Int]) -> Int {
        for i in 0..<nums.count - 1 {
            if nums[i] > nums[i + 1] {
                return i
            }
        }
        return nums.count - 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Binary Search

::tabs-start

```python
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1

        while l <= r:
            m = l + (r - l) // 2
            if m > 0 and nums[m] < nums[m - 1]:
                r = m - 1
            elif m < len(nums) - 1 and nums[m] < nums[m + 1]:
                l = m + 1
            else:
                return m
```

```java
public class Solution {
    public int findPeakElement(int[] nums) {
        int l = 0, r = nums.length - 1;

        while (l <= r) {
            int m = l + (r - l) / 2;
            if (m > 0 && nums[m] < nums[m - 1]) {
                r = m - 1;
            } else if (m < nums.length - 1 && nums[m] < nums[m + 1]) {
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
    int findPeakElement(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;

        while (l <= r) {
            int m = l + (r - l) / 2;
            if (m > 0 && nums[m] < nums[m - 1]) {
                r = m - 1;
            } else if (m < nums.size() - 1 && nums[m] < nums[m + 1]) {
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
     * @return {number}
     */
    findPeakElement(nums) {
        let l = 0,
            r = nums.length - 1;

        while (l <= r) {
            let m = Math.floor(l + (r - l) / 2);
            if (m > 0 && nums[m] < nums[m - 1]) {
                r = m - 1;
            } else if (m < nums.length - 1 && nums[m] < nums[m + 1]) {
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
    public int FindPeakElement(int[] nums) {
        int l = 0, r = nums.Length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (m > 0 && nums[m] < nums[m - 1]) {
                r = m - 1;
            } else if (m < nums.Length - 1 && nums[m] < nums[m + 1]) {
                l = m + 1;
            } else {
                return m;
            }
        }
        return l;
    }
}
```

```go
func findPeakElement(nums []int) int {
    l, r := 0, len(nums)-1

    for l <= r {
        m := l + (r-l)/2
        if m > 0 && nums[m] < nums[m-1] {
            r = m - 1
        } else if m < len(nums)-1 && nums[m] < nums[m+1] {
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
    fun findPeakElement(nums: IntArray): Int {
        var l = 0
        var r = nums.size - 1

        while (l <= r) {
            val m = l + (r - l) / 2
            if (m > 0 && nums[m] < nums[m - 1]) {
                r = m - 1
            } else if (m < nums.size - 1 && nums[m] < nums[m + 1]) {
                l = m + 1
            } else {
                return m
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func findPeakElement(_ nums: [Int]) -> Int {
        var l = 0
        var r = nums.count - 1

        while l <= r {
            let m = l + (r - l) / 2
            if m > 0 && nums[m] < nums[m - 1] {
                r = m - 1
            } else if m < nums.count - 1 && nums[m] < nums[m + 1] {
                l = m + 1
            } else {
                return m
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

## 3. Recursive Binary Search

::tabs-start

```python
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        def binary_search(l, r):
            if l == r:
                return l
            m = l + (r - l) // 2
            if nums[m] > nums[m + 1]:
                return binary_search(l, m)
            return binary_search(m + 1, r)

        return binary_search(0, len(nums) - 1)
```

```java
public class Solution {
    public int findPeakElement(int[] nums) {
        return binarySearch(nums, 0, nums.length - 1);
    }

    private int binarySearch(int[] nums, int l, int r) {
        if (l == r) {
            return l;
        }
        int m = l + (r - l) / 2;
        if (nums[m] > nums[m + 1]) {
            return binarySearch(nums, l, m);
        }
        return binarySearch(nums, m + 1, r);
    }
}
```

```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        return binarySearch(nums, 0, nums.size() - 1);
    }

private:
    int binarySearch(vector<int>& nums, int l, int r) {
        if (l == r) {
            return l;
        }
        int m = l + (r - l) / 2;
        if (nums[m] > nums[m + 1]) {
            return binarySearch(nums, l, m);
        }
        return binarySearch(nums, m + 1, r);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findPeakElement(nums) {
        const binarySearch = (l, r) => {
            if (l === r) {
                return l;
            }
            let m = Math.floor((l + r) / 2);
            if (nums[m] > nums[m + 1]) {
                return binarySearch(l, m);
            } else {
                return binarySearch(m + 1, r);
            }
        };

        return binarySearch(0, nums.length - 1);
    }
}
```

```csharp
public class Solution {
    public int FindPeakElement(int[] nums) {
        return BinarySearch(nums, 0, nums.Length - 1);
    }

    private int BinarySearch(int[] nums, int l, int r) {
        if (l == r) {
            return l;
        }
        int m = l + (r - l) / 2;
        if (nums[m] > nums[m + 1]) {
            return BinarySearch(nums, l, m);
        }
        return BinarySearch(nums, m + 1, r);
    }
}
```

```go
func findPeakElement(nums []int) int {
    var binarySearch func(l, r int) int
    binarySearch = func(l, r int) int {
        if l == r {
            return l
        }
        m := l + (r-l)/2
        if nums[m] > nums[m+1] {
            return binarySearch(l, m)
        }
        return binarySearch(m+1, r)
    }

    return binarySearch(0, len(nums)-1)
}
```

```kotlin
class Solution {
    fun findPeakElement(nums: IntArray): Int {
        fun binarySearch(l: Int, r: Int): Int {
            if (l == r) {
                return l
            }
            val m = l + (r - l) / 2
            return if (nums[m] > nums[m + 1]) {
                binarySearch(l, m)
            } else {
                binarySearch(m + 1, r)
            }
        }

        return binarySearch(0, nums.size - 1)
    }
}
```

```swift
class Solution {
    func findPeakElement(_ nums: [Int]) -> Int {
        func binarySearch(_ l: Int, _ r: Int) -> Int {
            if l == r {
                return l
            }
            let m = l + (r - l) / 2
            if nums[m] > nums[m + 1] {
                return binarySearch(l, m)
            }
            return binarySearch(m + 1, r)
        }

        return binarySearch(0, nums.count - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$ for recursion stack.

---

## 4. Binary Search (Optimal)

::tabs-start

```python
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1

        while l < r:
            m = (l + r) >> 1
            if nums[m] > nums[m + 1]:
                r = m
            else:
                l = m + 1

        return l
```

```java
public class Solution {
    public int findPeakElement(int[] nums) {
        int l = 0, r = nums.length - 1;

        while (l < r) {
            int m = (l + r) >> 1;
            if (nums[m] > nums[m + 1]) {
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
    int findPeakElement(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;

        while (l < r) {
            int m = (l + r) >> 1;
            if (nums[m] > nums[m + 1]) {
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
     * @return {number}
     */
    findPeakElement(nums) {
        let l = 0,
            r = nums.length - 1;

        while (l < r) {
            let m = (l + r) >> 1;
            if (nums[m] > nums[m + 1]) {
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
    public int FindPeakElement(int[] nums) {
        int l = 0, r = nums.Length - 1;
        while (l < r) {
            int m = (l + r) >> 1;
            if (nums[m] > nums[m + 1]) {
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
func findPeakElement(nums []int) int {
    l, r := 0, len(nums)-1

    for l < r {
        m := (l + r) >> 1
        if nums[m] > nums[m+1] {
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
    fun findPeakElement(nums: IntArray): Int {
        var l = 0
        var r = nums.size - 1

        while (l < r) {
            val m = (l + r) shr 1
            if (nums[m] > nums[m + 1]) {
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
    func findPeakElement(_ nums: [Int]) -> Int {
        var l = 0
        var r = nums.count - 1

        while l < r {
            let m = (l + r) >> 1
            if nums[m] > nums[m + 1] {
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
