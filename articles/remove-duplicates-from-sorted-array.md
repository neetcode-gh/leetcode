## 1. Sorted Set

### Intuition

A set automatically removes duplicates, and a sorted set maintains order. We insert all elements into a sorted set, then copy the unique elements back to the original array. This approach is simple but uses extra space and doesn't take advantage of the array already being sorted.

### Algorithm

1. Insert all elements from the array into a sorted set to eliminate duplicates.
2. Copy the unique elements from the set back into the beginning of the original array.
3. Return the size of the set (number of unique elements).

Note: This approach is simple but uses extra `O(n)` space.

::tabs-start

```python
class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        unique = sorted(set(nums))
        nums[:len(unique)] = unique
        return len(unique)
```

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        TreeSet<Integer> unique = new TreeSet<>();
        for (int num : nums) {
            unique.add(num);
        }
        int i = 0;
        for (int num : unique) {
            nums[i++] = num;
        }
        return unique.size();
    }
}
```

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        set<int> unique(nums.begin(), nums.end());
        int i = 0;
        for (int num : unique) {
            nums[i++] = num;
        }
        return unique.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    removeDuplicates(nums) {
        const unique = Array.from(new Set(nums)).sort((a, b) => a - b);
        for (let i = 0; i < unique.length; i++) {
            nums[i] = unique[i];
        }
        return unique.length;
    }
}
```

```csharp
public class Solution {
    public int RemoveDuplicates(int[] nums) {
        int[] unique = nums.Distinct().OrderBy(x => x).ToArray();
        Array.Copy(unique, nums, unique.Length);
        return unique.Length;
    }
}
```

```go
func removeDuplicates(nums []int) int {
    seen := make(map[int]bool)
    var unique []int
    for _, num := range nums {
        if !seen[num] {
            seen[num] = true
            unique = append(unique, num)
        }
    }
    sort.Ints(unique)
    copy(nums, unique)
    return len(unique)
}
```

```kotlin
class Solution {
    fun removeDuplicates(nums: IntArray): Int {
        val unique = nums.toSet().sorted()
        for (i in unique.indices) {
            nums[i] = unique[i]
        }
        return unique.size
    }
}
```

```swift
class Solution {
    func removeDuplicates(_ nums: inout [Int]) -> Int {
        let unique = Array(Set(nums)).sorted()
        for i in 0..<unique.count {
            nums[i] = unique[i]
        }
        return unique.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Two Pointers - I

### Intuition

Since the array is sorted, duplicates are adjacent. We use two pointers: one (`l`) marks where to place the next unique element, and another (`r`) scans through the array. When `r` finds a new value (different from what's at `l`), we copy it to position `l` and advance both pointers. This modifies the array in-place.

### Algorithm

1. Initialize both pointers `l` and `r` to `0`.
2. Copy the current element at `r` to position `l`.
3. Skip all duplicates by advancing `r` while consecutive elements are equal.
4. Move `l` forward to prepare for the next unique element.
5. Return `l` as the count of unique elements.

::tabs-start

```python
class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        n = len(nums)
        l = r = 0
        while r < n:
            nums[l] = nums[r]
            while r < n and nums[r] == nums[l]:
                r += 1
            l += 1
        return l
```

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        int n = nums.length, l = 0, r = 0;
        while (r < n) {
            nums[l] = nums[r];
            while (r < n && nums[r] == nums[l]) {
                r++;
            }
            l++;
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int n = nums.size(), l = 0, r = 0;
        while (r < n) {
            nums[l] = nums[r];
            while (r < n && nums[r] == nums[l]) {
                r++;
            }
            l++;
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
    removeDuplicates(nums) {
        let n = nums.length,
            l = 0,
            r = 0;
        while (r < n) {
            nums[l] = nums[r];
            while (r < n && nums[r] === nums[l]) {
                r++;
            }
            l++;
        }
        return l;
    }
}
```

```csharp
public class Solution {
    public int RemoveDuplicates(int[] nums) {
        int n = nums.Length;
        int l = 0, r = 0;

        while (r < n) {
            nums[l] = nums[r];
            while (r < n && nums[r] == nums[l]) {
                r++;
            }
            l++;
        }

        return l;
    }
}
```

```go
func removeDuplicates(nums []int) int {
    n := len(nums)
    l, r := 0, 0
    for r < n {
        nums[l] = nums[r]
        for r < n && nums[r] == nums[l] {
            r++
        }
        l++
    }
    return l
}
```

```kotlin
class Solution {
    fun removeDuplicates(nums: IntArray): Int {
        val n = nums.size
        var l = 0
        var r = 0
        while (r < n) {
            nums[l] = nums[r]
            while (r < n && nums[r] == nums[l]) {
                r++
            }
            l++
        }
        return l
    }
}
```

```swift
class Solution {
    func removeDuplicates(_ nums: inout [Int]) -> Int {
        let n = nums.count
        var l = 0, r = 0
        while r < n {
            nums[l] = nums[r]
            while r < n && nums[r] == nums[l] {
                r += 1
            }
            l += 1
        }
        return l
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Two Pointers - II

### Intuition

A more elegant approach: we compare each element with its predecessor. Since duplicates are consecutive in a sorted array, an element is unique if it differs from the one before it. We maintain a write pointer that only advances when we find a new unique value.

### Algorithm

1. Start with `l = 1` since the first element is always unique.
2. Iterate `r` from `1` to the end of the array.
3. If `nums[r]` differs from `nums[r - 1]`, it's a new unique value.
4. Copy it to position `l` and increment `l`.
5. Return `l` as the count of unique elements.

::tabs-start

```python
class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        l = 1
        for r in range(1, len(nums)):
            if nums[r] != nums[r - 1]:
                nums[l] = nums[r]
                l += 1
        return l
```

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        int l = 1;
        for (int r = 1; r < nums.length; r++) {
            if (nums[r] != nums[r - 1]) {
                nums[l++] = nums[r];
            }
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int l = 1;
        for (int r = 1; r < nums.size(); r++) {
            if (nums[r] != nums[r - 1]) {
                nums[l++] = nums[r];
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
    removeDuplicates(nums) {
        let l = 1;
        for (let r = 1; r < nums.length; r++) {
            if (nums[r] !== nums[r - 1]) {
                nums[l++] = nums[r];
            }
        }
        return l;
    }
}
```

```csharp
public class Solution {
    public int RemoveDuplicates(int[] nums) {
        int l = 1;
        for (int r = 1; r < nums.Length; r++) {
            if (nums[r] != nums[r - 1]) {
                nums[l] = nums[r];
                l++;
            }
        }

        return l;
    }
}
```

```go
func removeDuplicates(nums []int) int {
    l := 1
    for r := 1; r < len(nums); r++ {
        if nums[r] != nums[r-1] {
            nums[l] = nums[r]
            l++
        }
    }
    return l
}
```

```kotlin
class Solution {
    fun removeDuplicates(nums: IntArray): Int {
        var l = 1
        for (r in 1 until nums.size) {
            if (nums[r] != nums[r - 1]) {
                nums[l++] = nums[r]
            }
        }
        return l
    }
}
```

```swift
class Solution {
    func removeDuplicates(_ nums: inout [Int]) -> Int {
        var l = 1
        for r in 1..<nums.count {
            if nums[r] != nums[r - 1] {
                nums[l] = nums[r]
                l += 1
            }
        }
        return l
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
