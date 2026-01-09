## 1. Sorted Set

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
