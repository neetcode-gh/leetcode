## 1. Brute Force

### Intuition

The simplest approach is to scan the array and check each element against its neighbors. If an element is different from both its left and right neighbors, it must be the single element. This works because every other element appears exactly twice and must be adjacent to its duplicate in a sorted array.

### Algorithm

1. Iterate through the array with index `i`.
2. For each element, check if it equals its left neighbor (if exists) or right neighbor (if exists).
3. If the element matches neither neighbor, return it as the single element.

::tabs-start

```python
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        n = len(nums)
        for i in range(n):
            if ((i and nums[i] == nums[i - 1]) or
                (i < n - 1 and nums[i] == nums[i + 1])
            ):
                continue
            return nums[i]
```

```java
public class Solution {
    public int singleNonDuplicate(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            if ((i > 0 && nums[i] == nums[i - 1]) ||
                (i < n - 1 && nums[i] == nums[i + 1])) {
                continue;
            }
            return nums[i];
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            if ((i > 0 && nums[i] == nums[i - 1]) ||
                (i < n - 1 && nums[i] == nums[i + 1])) {
                continue;
            }
            return nums[i];
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
    singleNonDuplicate(nums) {
        const n = nums.length;
        for (let i = 0; i < n; i++) {
            if (
                (i > 0 && nums[i] === nums[i - 1]) ||
                (i < n - 1 && nums[i] === nums[i + 1])
            ) {
                continue;
            }
            return nums[i];
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int SingleNonDuplicate(int[] nums) {
        int n = nums.Length;
        for (int i = 0; i < n; i++) {
            if ((i > 0 && nums[i] == nums[i - 1]) ||
                (i < n - 1 && nums[i] == nums[i + 1])) {
                continue;
            }
            return nums[i];
        }
        return -1;
    }
}
```

```go
func singleNonDuplicate(nums []int) int {
    n := len(nums)
    for i := 0; i < n; i++ {
        if (i > 0 && nums[i] == nums[i-1]) ||
            (i < n-1 && nums[i] == nums[i+1]) {
            continue
        }
        return nums[i]
    }
    return -1
}
```

```kotlin
class Solution {
    fun singleNonDuplicate(nums: IntArray): Int {
        val n = nums.size
        for (i in 0 until n) {
            if ((i > 0 && nums[i] == nums[i - 1]) ||
                (i < n - 1 && nums[i] == nums[i + 1])) {
                continue
            }
            return nums[i]
        }
        return -1
    }
}
```

```swift
class Solution {
    func singleNonDuplicate(_ nums: [Int]) -> Int {
        let n = nums.count
        for i in 0..<n {
            if (i > 0 && nums[i] == nums[i - 1]) ||
                (i < n - 1 && nums[i] == nums[i + 1]) {
                continue
            }
            return nums[i]
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

## 2. Brute Force (Bitwise Xor)

### Intuition

XOR has a useful property: a number XORed with itself gives 0, and a number XORed with 0 gives the number itself. Since every element except one appears twice, XORing all elements together will cancel out all pairs, leaving only the single element.

### Algorithm

1. Initialize a variable `xorr` to 0.
2. XOR every element in the array with `xorr`.
3. Return `xorr`, which now holds the single non-duplicate element.

::tabs-start

```python
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        xorr = 0
        for num in nums:
            xorr ^= num
        return xorr
```

```java
public class Solution {
    public int singleNonDuplicate(int[] nums) {
        int xorr = 0;
        for (int num : nums) {
            xorr ^= num;
        }
        return xorr;
    }
}
```

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int xorr = 0;
        for (int num : nums) {
            xorr ^= num;
        }
        return xorr;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    singleNonDuplicate(nums) {
        let xorr = 0;
        for (const num of nums) {
            xorr ^= num;
        }
        return xorr;
    }
}
```

```csharp
public class Solution {
    public int SingleNonDuplicate(int[] nums) {
        int xorr = 0;
        foreach (int num in nums) {
            xorr ^= num;
        }
        return xorr;
    }
}
```

```go
func singleNonDuplicate(nums []int) int {
    xorr := 0
    for _, num := range nums {
        xorr ^= num
    }
    return xorr
}
```

```kotlin
class Solution {
    fun singleNonDuplicate(nums: IntArray): Int {
        var xorr = 0
        for (num in nums) {
            xorr = xorr xor num
        }
        return xorr
    }
}
```

```swift
class Solution {
    func singleNonDuplicate(_ nums: [Int]) -> Int {
        var xorr = 0
        for num in nums {
            xorr ^= num
        }
        return xorr
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Binary Search

### Intuition

Since the array is sorted and every element except one appears twice, we can use binary search. Before the single element, pairs start at even indices (0, 2, 4...). After the single element, this pattern shifts. By checking whether the middle element pairs correctly with its neighbor, we can determine which half contains the single element.

### Algorithm

1. Initialize two pointers `l` and `r` at the start and end of the array.
2. While `l <= r`:
   - Compute the middle index `m`.
   - If `nums[m]` differs from both neighbors, return `nums[m]`.
   - Calculate the size of the left portion (excluding the pair containing `m`).
   - If the left size is odd, the single element is on the left; move `r` to `m - 1`.
   - Otherwise, the single element is on the right; move `l` to `m + 1`.
3. Return the found element.

::tabs-start

```python
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1

        while l <= r:
            m = l + ((r - l) // 2)
            if ((m - 1 < 0 or nums[m - 1] != nums[m]) and
                (m + 1 == len(nums) or nums[m] != nums[m + 1])):
                return nums[m]

            leftSize = m - 1 if nums[m - 1] == nums[m] else m
            if leftSize % 2:
                r = m - 1
            else:
                l = m + 1
```

```java
public class Solution {
    public int singleNonDuplicate(int[] nums) {
        int l = 0, r = nums.length - 1;

        while (l <= r) {
            int m = l + (r - l) / 2;
            if ((m - 1 < 0 || nums[m - 1] != nums[m]) &&
                (m + 1 == nums.length || nums[m] != nums[m + 1])) {
                return nums[m];
            }

            int leftSize = (m - 1 >= 0 && nums[m - 1] == nums[m]) ? m - 1 : m;
            if (leftSize % 2 == 1) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;

        while (l <= r) {
            int m = l + (r - l) / 2;
            if ((m - 1 < 0 || nums[m - 1] != nums[m]) &&
                (m + 1 == nums.size() || nums[m] != nums[m + 1])) {
                return nums[m];
            }

            int leftSize = (m - 1 >= 0 && nums[m - 1] == nums[m]) ? m - 1 : m;
            if (leftSize % 2 == 1) {
                r = m - 1;
            } else {
                l = m + 1;
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
    singleNonDuplicate(nums) {
        let l = 0,
            r = nums.length - 1;

        while (l <= r) {
            let m = l + Math.floor((r - l) / 2);
            if (
                (m - 1 < 0 || nums[m - 1] !== nums[m]) &&
                (m + 1 === nums.length || nums[m] !== nums[m + 1])
            ) {
                return nums[m];
            }

            let leftSize = m - 1 >= 0 && nums[m - 1] === nums[m] ? m - 1 : m;
            if (leftSize % 2 === 1) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }
    }
}
```

```csharp
public class Solution {
    public int SingleNonDuplicate(int[] nums) {
        int l = 0, r = nums.Length - 1;

        while (l <= r) {
            int m = l + (r - l) / 2;

            if ((m - 1 < 0 || nums[m - 1] != nums[m]) &&
                (m + 1 == nums.Length || nums[m] != nums[m + 1])) {
                return nums[m];
            }

            int leftSize = (m - 1 >= 0 && nums[m - 1] == nums[m]) ? m - 1 : m;

            if (leftSize % 2 == 1) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }

        return -1;
    }
}
```

```go
func singleNonDuplicate(nums []int) int {
    l, r := 0, len(nums)-1

    for l <= r {
        m := l + (r-l)/2
        if (m-1 < 0 || nums[m-1] != nums[m]) &&
            (m+1 == len(nums) || nums[m] != nums[m+1]) {
            return nums[m]
        }

        leftSize := m
        if m-1 >= 0 && nums[m-1] == nums[m] {
            leftSize = m - 1
        }

        if leftSize%2 == 1 {
            r = m - 1
        } else {
            l = m + 1
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun singleNonDuplicate(nums: IntArray): Int {
        var l = 0
        var r = nums.size - 1

        while (l <= r) {
            val m = l + (r - l) / 2
            if ((m - 1 < 0 || nums[m - 1] != nums[m]) &&
                (m + 1 == nums.size || nums[m] != nums[m + 1])) {
                return nums[m]
            }

            val leftSize = if (m - 1 >= 0 && nums[m - 1] == nums[m]) m - 1 else m

            if (leftSize % 2 == 1) {
                r = m - 1
            } else {
                l = m + 1
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func singleNonDuplicate(_ nums: [Int]) -> Int {
        var l = 0, r = nums.count - 1

        while l <= r {
            let m = l + (r - l) / 2
            if (m - 1 < 0 || nums[m - 1] != nums[m]) &&
                (m + 1 == nums.count || nums[m] != nums[m + 1]) {
                return nums[m]
            }

            let leftSize = (m - 1 >= 0 && nums[m - 1] == nums[m]) ? m - 1 : m

            if leftSize % 2 == 1 {
                r = m - 1
            } else {
                l = m + 1
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

## 4. Binary Search On Even Indexes

### Intuition

We can simplify binary search by only considering even indices. In a valid array without the single element disruption, every pair starts at an even index, so `nums[even] == nums[even + 1]`. If this condition holds at the middle even index, the single element must be to the right. Otherwise, it is on the left or at the current position.

### Algorithm

1. Initialize `l = 0` and `r = n - 1`.
2. While `l < r`:
   - Compute the middle index `m`. If `m` is odd, decrement it to make it even.
   - If `nums[m] != nums[m + 1]`, the single element is at or before `m`; set `r = m`.
   - Otherwise, the single element is after `m`; set `l = m + 2`.
3. Return `nums[l]`.

::tabs-start

```python
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1

        while l < r:
            m = l + (r - l) // 2
            if m & 1:
                m -= 1
            if nums[m] != nums[m + 1]:
                r = m
            else:
                l = m + 2

        return nums[l]
```

```java
public class Solution {
    public int singleNonDuplicate(int[] nums) {
        int l = 0, r = nums.length - 1;

        while (l < r) {
            int m = l + (r - l) / 2;
            if ((m & 1) == 1) {
                m--;
            }
            if (nums[m] != nums[m + 1]) {
                r = m;
            } else {
                l = m + 2;
            }
        }

        return nums[l];
    }
}
```

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;

        while (l < r) {
            int m = l + (r - l) / 2;
            if (m & 1) {
                m--;
            }
            if (nums[m] != nums[m + 1]) {
                r = m;
            } else {
                l = m + 2;
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
    singleNonDuplicate(nums) {
        let l = 0,
            r = nums.length - 1;

        while (l < r) {
            let m = Math.floor(l + (r - l) / 2);
            if (m & 1) {
                m--;
            }
            if (nums[m] !== nums[m + 1]) {
                r = m;
            } else {
                l = m + 2;
            }
        }

        return nums[l];
    }
}
```

```csharp
public class Solution {
    public int SingleNonDuplicate(int[] nums) {
        int l = 0, r = nums.Length - 1;

        while (l < r) {
            int m = l + (r - l) / 2;
            if ((m & 1) == 1) {
                m--;
            }
            if (nums[m] != nums[m + 1]) {
                r = m;
            } else {
                l = m + 2;
            }
        }

        return nums[l];
    }
}
```

```go
func singleNonDuplicate(nums []int) int {
    l, r := 0, len(nums)-1

    for l < r {
        m := l + (r-l)/2
        if m&1 == 1 {
            m--
        }
        if nums[m] != nums[m+1] {
            r = m
        } else {
            l = m + 2
        }
    }

    return nums[l]
}
```

```kotlin
class Solution {
    fun singleNonDuplicate(nums: IntArray): Int {
        var l = 0
        var r = nums.size - 1

        while (l < r) {
            var m = l + (r - l) / 2
            if (m and 1 == 1) {
                m--
            }
            if (nums[m] != nums[m + 1]) {
                r = m
            } else {
                l = m + 2
            }
        }

        return nums[l]
    }
}
```

```swift
class Solution {
    func singleNonDuplicate(_ nums: [Int]) -> Int {
        var l = 0, r = nums.count - 1

        while l < r {
            var m = l + (r - l) / 2
            if m & 1 == 1 {
                m -= 1
            }
            if nums[m] != nums[m + 1] {
                r = m
            } else {
                l = m + 2
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

---

## 5. Binary Search + Bit Manipulation

### Intuition

We can use XOR with 1 to elegantly find the pair index. For even indices, `m ^ 1` gives `m + 1`; for odd indices, it gives `m - 1`. This means `nums[m]` should equal `nums[m ^ 1]` if we are in the portion before the single element. If they differ, the single element is at or before index `m`.

### Algorithm

1. Initialize `l = 0` and `r = n - 1`.
2. While `l < r`:
   - Compute the middle index `m`.
   - If `nums[m] != nums[m ^ 1]`, the single element is at or before `m`; set `r = m`.
   - Otherwise, the single element is after `m`; set `l = m + 1`.
3. Return `nums[l]`.

::tabs-start

```python
class Solution:
    def singleNonDuplicate(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1

        while l < r:
            m = (l + r) >> 1
            if nums[m] != nums[m ^ 1]:
                r = m
            else:
                l = m + 1

        return nums[l]
```

```java
public class Solution {
    public int singleNonDuplicate(int[] nums) {
        int l = 0, r = nums.length - 1;

        while (l < r) {
            int m = (l + r) >> 1;
            if (nums[m] != nums[m ^ 1]) {
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
    int singleNonDuplicate(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;

        while (l < r) {
            int m = (l + r) >> 1;
            if (nums[m] != nums[m ^ 1]) {
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
    singleNonDuplicate(nums) {
        let l = 0,
            r = nums.length - 1;

        while (l < r) {
            let m = (l + r) >> 1;
            if (nums[m] !== nums[m ^ 1]) {
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
    public int SingleNonDuplicate(int[] nums) {
        int l = 0, r = nums.Length - 1;

        while (l < r) {
            int m = (l + r) >> 1;
            if (nums[m] != nums[m ^ 1]) {
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
func singleNonDuplicate(nums []int) int {
    l, r := 0, len(nums)-1

    for l < r {
        m := (l + r) >> 1
        if nums[m] != nums[m^1] {
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
    fun singleNonDuplicate(nums: IntArray): Int {
        var l = 0
        var r = nums.size - 1

        while (l < r) {
            val m = (l + r) shr 1
            if (nums[m] != nums[m xor 1]) {
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
    func singleNonDuplicate(_ nums: [Int]) -> Int {
        var l = 0, r = nums.count - 1

        while l < r {
            let m = (l + r) >> 1
            if nums[m] != nums[m ^ 1] {
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
