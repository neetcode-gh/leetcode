## 1. Brute Force

### Intuition

We can check every pair of different elements in the array and return `true` if any pair has equal values.  
This is the most intuitive approach because it directly compares all possible pairs, but it is also the least efficient since it examines every combination.

### Algorithm

1. Iterate through the array using two nested loops to check all possible pairs of distinct indices.
2. If any pair of elements has the same value, return `true`.
3. If all pairs are checked and no duplicates are found, return `false`.

::tabs-start

```python
class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] == nums[j]:
                    return True
        return False
```

```java
public class Solution {
    public boolean hasDuplicate(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] == nums[j]) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool hasDuplicate(vector<int>& nums) {
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] == nums[j]) {
                    return true;
                }
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
     * @return {boolean}
     */
    hasDuplicate(nums) {
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[i] === nums[j]) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool hasDuplicate(int[] nums) {
        for (int i = 0; i < nums.Length; i++) {
            for (int j = i + 1; j < nums.Length; j++) {
                if (nums[i] == nums[j]) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```go
func hasDuplicate(nums []int) bool {
    for i := 0; i < len(nums); i++ {
        for j := i + 1; j < len(nums); j++ {
            if nums[i] == nums[j] {
                return true
            }
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun hasDuplicate(nums: IntArray): Boolean {
        for (i in nums.indices) {
            for (j in i + 1 until nums.size) {
                if (nums[i] == nums[j]) {
                    return true
                }
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func hasDuplicate(_ nums: [Int]) -> Bool {
        for i in 0..<nums.count {
            for j in (i + 1)..<nums.count {
                if nums[i] == nums[j] {
                    return true
                }
            }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Sorting

### Intuition

If we sort the array, then any duplicate values will appear next to each other.  
Sorting groups identical elements together, so we can simply check adjacent positions to detect duplicates.  
This reduces the problem to a single linear scan after sorting, making it easy to identify if any value repeats.

### Algorithm

1. Sort the array in non-decreasing order.
2. Iterate through the array starting from index `1`.
3. Compare the current element with the previous element.
4. If both elements are equal, we have found a duplicate — return `true`.
5. If the loop finishes without detecting equal neighbors, return `false`.

::tabs-start

```python
class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        nums.sort()
        for i in range(1, len(nums)):
            if nums[i] == nums[i - 1]:
                return True
        return False
```

```java
public class Solution {
    public boolean hasDuplicate(int[] nums) {
        Arrays.sort(nums);
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i - 1]) {
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
    bool hasDuplicate(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1]) {
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
     * @return {boolean}
     */
    hasDuplicate(nums) {
        nums.sort((a, b) => a - b);
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] === nums[i - 1]) {
                return true;
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool hasDuplicate(int[] nums) {
        Array.Sort(nums);
        for (int i = 1; i < nums.Length; i++) {
            if (nums[i] == nums[i - 1]) {
                return true;
            }
        }
        return false;
    }
}
```

```go
func hasDuplicate(nums []int) bool {
    sort.Ints(nums)
    for i := 1; i < len(nums); i++ {
        if nums[i] == nums[i-1] {
            return true
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun hasDuplicate(nums: IntArray): Boolean {
        nums.sort()
        for (i in 1 until nums.size) {
            if (nums[i] == nums[i - 1]) {
                return true
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func hasDuplicate(_ nums: [Int]) -> Bool {
        var nums = nums.sorted()
        for i in 1..<nums.count {
            if nums[i] == nums[i - 1] {
                return true
            }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Hash Set

### Intuition

We can use a hash set to efficiently keep track of the values we have already encountered.  
As we iterate through the array, we check whether the current value is already present in the set.  
If it is, that means we've seen this value before, so a duplicate exists.  
Using a hash set allows constant-time lookups, making this approach much more efficient than comparing every pair.

### Algorithm

1. Initialize an empty hash set to store seen values.
2. Iterate through each number in the array.
3. For each number:
   - If it is already in the set, return `true` because a duplicate has been found.
   - Otherwise, add it to the set.
4. If the loop finishes without finding any duplicates, return `false`.

::tabs-start

```python
class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False
```

```java
public class Solution {
    public boolean hasDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (seen.contains(num)) {
                return true;
            }
            seen.add(num);
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool hasDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int num : nums) {
            if (seen.count(num)) {
                return true;
            }
            seen.insert(num);
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        const seen = new Set();
        for (const num of nums) {
            if (seen.has(num)) {
                return true;
            }
            seen.add(num);
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool hasDuplicate(int[] nums) {
        HashSet<int> seen = new HashSet<int>();
        foreach (int num in nums) {
            if (seen.Contains(num)) {
                return true;
            }
            seen.Add(num);
        }
        return false;
    }
}
```

```go
func hasDuplicate(nums []int) bool {
    seen := make(map[int]bool)
    for _, num := range nums {
        if seen[num] {
            return true
        }
        seen[num] = true
    }
    return false
}
```

```kotlin
class Solution {
    fun hasDuplicate(nums: IntArray): Boolean {
        val seen = HashSet<Int>()
        for (num in nums) {
            if (num in seen) {
                return true
            }
            seen.add(num)
        }
        return false
    }
}
```

```swift
class Solution {
    func hasDuplicate(_ nums: [Int]) -> Bool {
        var seen = Set<Int>()
        for num in nums {
            if seen.contains(num) {
                return true
            }
            seen.insert(num)
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Hash Set Length

### Intuition

This approach uses the same idea as the previous hash set method: a set only stores unique values, so duplicates are automatically removed.  
Instead of checking each element manually, we simply compare the length of the set to the length of the original array.  
If duplicates exist, the set will contain fewer elements.  
The logic is identical to the earlier approach — this version is just a shorter and more concise implementation of it.

### Algorithm

1. Convert the array into a hash set, which removes duplicates.
2. Compare the size of the set with the size of the original array.
3. If the set is smaller, return `true` because duplicates must have been removed.
4. Otherwise, return `false`.

::tabs-start

```python
class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        return len(set(nums)) < len(nums)
```

```java
public class Solution {
    public boolean hasDuplicate(int[] nums) {
        return Arrays.stream(nums).distinct().count() < nums.length;
    }
}
```

```cpp
class Solution {
public:
    bool hasDuplicate(vector<int>& nums) {
        return unordered_set<int>(nums.begin(), nums.end()).size() < nums.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        return new Set(nums).size < nums.length;
    }
}
```

```csharp
public class Solution {
    public bool hasDuplicate(int[] nums) {
        return new HashSet<int>(nums).Count < nums.Length;
    }
}
```

```go
func hasDuplicate(nums []int) bool {
    seen := make(map[int]struct{})
    for _, num := range nums {
        seen[num] = struct{}{}
    }
    return len(seen) < len(nums)
}
```

```kotlin
class Solution {
    fun hasDuplicate(nums: IntArray): Boolean {
        return nums.toSet().size < nums.size
    }
}
```

```swift
class Solution {
    func hasDuplicate(_ nums: [Int]) -> Bool {
        return Set(nums).count < nums.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Using Wrong Comparison in Brute Force

When using nested loops, a common mistake is comparing an element with itself by starting the inner loop at `i` instead of `i + 1`.

```python
# Wrong: Compares element with itself
for i in range(len(nums)):
    for j in range(len(nums)):  # Should start at i + 1
        if nums[i] == nums[j]:
            return True

# Correct: Skip self-comparison
for i in range(len(nums)):
    for j in range(i + 1, len(nums)):
        if nums[i] == nums[j]:
            return True
```

### Modifying Input Array Unexpectedly

The sorting approach modifies the original array, which may not be acceptable in some contexts. If the original order matters, make a copy first.

```python
# Caution: This modifies the input
nums.sort()

# Safer: Sort a copy if original order matters
sorted_nums = sorted(nums)
```
