## 1. Sorting

### Intuition

If we sort the array, any duplicate numbers will appear **next to each other**.  
So after sorting, we just scan once and check if any two consecutive elements are equal.  
The first equal pair we find is the duplicate.

### Algorithm

1. Sort the array.
2. Loop through the array from index `0` to `n - 2`.
3. For each index `i`, check if `nums[i] == nums[i + 1]`.
   - If yes, return that value (this is the duplicate).
4. If no duplicate is found (theoretically impossible for this problem), return `-1`.

::tabs-start

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        nums.sort()
        for i in range(len(nums) - 1):
            if nums[i] == nums[i + 1]:
                return nums[i]
        return -1
```

```java
public class Solution {
    public int findDuplicate(int[] nums) {
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                return nums[i];
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findDuplicate(std::vector<int>& nums) {
        sort(nums.begin(), nums.end());
        for (int i = 0; i < nums.size() - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                return nums[i];
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
    findDuplicate(nums) {
        nums.sort((a, b) => a - b);
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] === nums[i + 1]) {
                return nums[i];
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindDuplicate(int[] nums) {
        Array.Sort(nums);
        for (int i = 0; i < nums.Length - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                return nums[i];
            }
        }
        return -1;
    }
}
```

```go
func findDuplicate(nums []int) int {
    sort.Ints(nums)
    for i := 0; i < len(nums)-1; i++ {
        if nums[i] == nums[i+1] {
            return nums[i]
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun findDuplicate(nums: IntArray): Int {
        nums.sort()
        for (i in 0 until nums.size - 1) {
            if (nums[i] == nums[i + 1]) {
                return nums[i]
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func findDuplicate(_ nums: [Int]) -> Int {
        var nums = nums.sorted()
        for i in 0..<nums.count - 1 {
            if nums[i] == nums[i + 1] {
                return nums[i]
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Hash Set

### Intuition

We can detect duplicates by remembering which numbers we have already seen.  
As we scan the array, each new number is checked:

- If it's **not in the set**, we add it.
- If it **is already in the set**, that number must be the duplicate.

A set gives constant-time lookup, so this approach is simple and efficient.

### Algorithm

1. Create an empty hash set `seen`.
2. Loop through each number in the array:
   - If the number is already in `seen`, return it (this is the duplicate).
   - Otherwise, insert the number into `seen`.
3. If no duplicate is found (should not happen in this problem), return `-1`.

::tabs-start

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        seen = set()
        for num in nums:
            if num in seen:
                return num
            seen.add(num)
        return -1
```

```java
public class Solution {
    public int findDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (seen.contains(num)) {
                return num;
            }
            seen.add(num);
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findDuplicate(std::vector<int>& nums) {
        unordered_set<int> seen;
        for (int num : nums) {
            if (seen.find(num) != seen.end()) {
                return num;
            }
            seen.insert(num);
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
    findDuplicate(nums) {
        let seen = new Set();
        for (let num of nums) {
            if (seen.has(num)) {
                return num;
            }
            seen.add(num);
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindDuplicate(int[] nums) {
        HashSet<int> seen = new HashSet<int>();
        foreach (int num in nums) {
            if (seen.Contains(num)) {
                return num;
            }
            seen.Add(num);
        }
        return -1;
    }
}
```

```go
func findDuplicate(nums []int) int {
    seen := make(map[int]struct{})
    for _, num := range nums {
        if _, exists := seen[num]; exists {
            return num
        }
        seen[num] = struct{}{}
    }
    return -1
}
```

```kotlin
class Solution {
    fun findDuplicate(nums: IntArray): Int {
        val seen = HashSet<Int>()
        for (num in nums) {
            if (num in seen) {
                return num
            }
            seen.add(num)
        }
        return -1
    }
}
```

```swift
class Solution {
    func findDuplicate(_ nums: [Int]) -> Int {
        var seen = Set<Int>()
        for num in nums {
            if seen.contains(num) {
                return num
            }
            seen.insert(num)
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Array

### Intuition

Since the values in the array are from **1 to n**, we can use an array to track whether we’ve seen a number before.  
Each number directly maps to an index (`num - 1`).  
- If that index is already marked, we’ve seen the number before → it's the duplicate.  
- Otherwise, we mark it as seen.

This avoids using a hash set while still providing fast lookups.

### Algorithm

1. Create an array `seen` of size `n` filled with zeros.
2. For each number `num` in the input array:
   - Check if `seen[num - 1]` is already set to `1`.
     - If yes → return `num` (duplicate found).
   - Otherwise, set `seen[num - 1] = 1`.
3. Return `-1` if no duplicate is found (though the problem guarantees one).

::tabs-start

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        seen = [0] * len(nums)
        for num in nums:
            if seen[num - 1]:
                return num
            seen[num - 1] = 1
        return -1
```

```java
public class Solution {
    public int findDuplicate(int[] nums) {
        int[] seen = new int[nums.length];
        for (int num : nums) {
            if (seen[num - 1] == 1) {
                return num;
            }
            seen[num - 1] = 1;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        vector<int> seen(nums.size(), 0);
        for (int num : nums) {
            if (seen[num - 1] == 1) {
                return num;
            }
            seen[num - 1] = 1;
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
    findDuplicate(nums) {
        let seen = new Array(nums.length).fill(0);
        for (let num of nums) {
            if (seen[num - 1]) {
                return num;
            }
            seen[num - 1] = 1;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindDuplicate(int[] nums) {
        int[] seen = new int[nums.Length];
        foreach (int num in nums) {
            if (seen[num - 1] == 1) {
                return num;
            }
            seen[num - 1] = 1;
        }
        return -1;
    }
}
```

```go
func findDuplicate(nums []int) int {
    seen := make([]int, len(nums))
    for _, num := range nums {
        if seen[num-1] == 1 {
            return num
        }
        seen[num-1] = 1
    }
    return -1
}
```

```kotlin
class Solution {
    fun findDuplicate(nums: IntArray): Int {
        val seen = IntArray(nums.size)
        for (num in nums) {
            if (seen[num - 1] == 1) {
                return num
            }
            seen[num - 1] = 1
        }
        return -1
    }
}
```

```swift
class Solution {
    func findDuplicate(_ nums: [Int]) -> Int {
        var seen = [Int](repeating: 0, count: nums.count)
        for num in nums {
            if seen[num - 1] == 1 {
                return num
            }
            seen[num - 1] = 1
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Negative Marking

### Intuition

Since every value is between **1 and n**, each number corresponds to an index in the array (`num - 1`).  
We can use the array itself as a marking tool:

- When we see a number, we go to its corresponding index and **flip the sign** of the value there.
- If we ever visit an index that is **already negative**, it means we've visited this number before → it's the duplicate.

This method avoids extra memory and uses the input array as a tracking structure.

### Algorithm

1. Loop through every number `num` in the array.
2. Compute its corresponding index: `idx = abs(num) - 1`.
3. If `nums[idx]` is already negative:
   - A duplicate has been found → return `abs(num)`.
4. Otherwise:
   - Mark the index by multiplying `nums[idx]` by `-1`.
5. If no duplicate is found (though guaranteed), return `-1`.

::tabs-start

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        for num in nums :
            idx = abs(num) - 1
            if nums[idx] < 0 :
                return abs(num)
            nums[idx] *= -1
        return -1
```

```java
public class Solution {
    public int findDuplicate(int[] nums) {
        for (int num : nums) {
            int idx = Math.abs(num) - 1;
            if (nums[idx] < 0) {
                return Math.abs(num);
            }
            nums[idx] *= -1;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        for (int num : nums) {
            int idx = abs(num) - 1;
            if (nums[idx] < 0) {
                return abs(num);
            }
            nums[idx] *= -1;
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
    findDuplicate(nums) {
        for (let num of nums) {
            let idx = Math.abs(num) - 1;
            if (nums[idx] < 0) {
                return Math.abs(num);
            }
            nums[idx] *= -1;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int FindDuplicate(int[] nums) {
        foreach (int num in nums) {
            int idx = Math.Abs(num) - 1;
            if (nums[idx] < 0) {
                return Math.Abs(num);
            }
            nums[idx] *= -1;
        }
        return -1;
    }
}
```

```go
func findDuplicate(nums []int) int {
    for _, num := range nums {
        idx := abs(num) - 1
        if nums[idx] < 0 {
            return abs(num)
        }
        nums[idx] *= -1
    }
    return -1
}

func abs(num int) int {
    if num < 0 {
        return -num
    }
    return num
}
```

```kotlin
class Solution {
    fun findDuplicate(nums: IntArray): Int {
        for (num in nums) {
            val idx = Math.abs(num) - 1
            if (nums[idx] < 0) {
                return Math.abs(num)
            }
            nums[idx] *= -1
        }
        return -1
    }
}
```

```swift
class Solution {
    func findDuplicate(_ nums: [Int]) -> Int {
        var nums = nums
        for num in nums {
            let idx = abs(num) - 1
            if nums[idx] < 0 {
                return abs(num)
            }
            nums[idx] *= -1
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

## 5. Binary Search

### Intuition

This method uses **binary search on the value range**, not on the array itself.

If all numbers from `1` to `mid` appeared **at most once**, then the count of numbers `≤ mid` should be **≤ mid**.  
But if the count is **greater than mid**, it means the duplicate must be in the range **[1, mid]**, because too many numbers fall into that range.

So we repeatedly:
- Count how many values are `≤ mid`.
- Shrink the search space based on whether this count is “too large.”

Eventually, `low == high`, and that value is the duplicate.

### Algorithm

1. Let `low = 1` and `high = n - 1` (value range).
2. While `low < high`:
   - Compute `mid = (low + high) // 2`.
   - Count how many numbers in the array are `≤ mid`.
   - If the count is **greater than mid**, the duplicate lies in `[low, mid]`, so set `high = mid`.
   - Otherwise, it lies in `[mid + 1, high]`, so set `low = mid + 1`.
3. When the loop ends, `low` is the duplicate.
4. Return `low`.

::tabs-start

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        n = len(nums)
        low, high = 1, n - 1
        while low < high:
            mid = low + (high - low) // 2
            lessOrEqual = sum(1 for num in nums if num <= mid)

            if lessOrEqual <= mid:
                low = mid + 1
            else:
                high = mid

        return low
```

```java
public class Solution {
    public int findDuplicate(int[] nums) {
        int n = nums.length;
        int low = 1;
        int high = n - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            int lessOrEqual = 0;
            for (int i = 0; i < n; i++) {
                if (nums[i] <= mid) {
                    lessOrEqual++;
                }
            }

            if (lessOrEqual <= mid) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
```

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int n = nums.size();
        int low = 1, high = n - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            int lessOrEqual = 0;
            for (int i = 0; i < n; i++) {
                if (nums[i] <= mid) {
                    lessOrEqual++;
                }
            }

            if (lessOrEqual <= mid) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        let n = nums.length;
        let low = 1,
            high = n - 1;

        while (low < high) {
            let mid = Math.floor(low + (high - low) / 2);
            let lessOrEqual = 0;

            for (let i = 0; i < n; i++) {
                if (nums[i] <= mid) {
                    lessOrEqual++;
                }
            }

            if (lessOrEqual <= mid) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
```

```csharp
public class Solution {
    public int FindDuplicate(int[] nums) {
        int n = nums.Length;
        int low = 1, high = n - 1;

        while (low < high) {
            int mid = low + (high - low) / 2;
            int lessOrEqual = 0;

            for (int i = 0; i < n; i++) {
                if (nums[i] <= mid) {
                    lessOrEqual++;
                }
            }

            if (lessOrEqual <= mid) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
```

```go
func findDuplicate(nums []int) int {
    n := len(nums)
    low, high := 1, n-1

    for low < high {
        mid := low + (high-low)/2
        lessOrEqual := 0

        for _, num := range nums {
            if num <= mid {
                lessOrEqual++
            }
        }

        if lessOrEqual <= mid {
            low = mid + 1
        } else {
            high = mid
        }
    }

    return low
}
```

```kotlin
class Solution {
    fun findDuplicate(nums: IntArray): Int {
        val n = nums.size
        var low = 1
        var high = n - 1

        while (low < high) {
            val mid = low + (high - low) / 2
            var lessOrEqual = 0

            for (num in nums) {
                if (num <= mid) {
                    lessOrEqual++
                }
            }

            if (lessOrEqual <= mid) {
                low = mid + 1
            } else {
                high = mid
            }
        }

        return low
    }
}
```

```swift
class Solution {
    func findDuplicate(_ nums: [Int]) -> Int {
        let n = nums.count
        var low = 1, high = n - 1

        while low < high {
            let mid = low + (high - low) / 2
            let lessOrEqual = nums.filter { $0 <= mid }.count

            if lessOrEqual <= mid {
                low = mid + 1
            } else {
                high = mid
            }
        }
        return low
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$

---

## 6. Bit Manipulation

### Intuition

Every number from **1 to n−1** should appear exactly **once**, but in the array, one number appears **twice**.  
So for each **bit position**, we compare:

- How many times this bit is set among all numbers in the array.
- How many times this bit *should* be set among the numbers `1` to `n-1`.

If a bit appears **more times in the array** than expected, that bit must belong to the **duplicate number**.

By combining all such bits, we reconstruct the duplicate.

### Algorithm

1. Let `res = 0` to build the duplicate number bit by bit.
2. For each bit position `b` from `0` to `31`:
   - Compute `mask = 1 << b`.
   - Count how many numbers in `nums` have this bit set → call it `x`.
   - Count how many numbers from `1` to `n−1` should have this bit set → call it `y`.
3. If `x > y`, it means the duplicate has this bit set, so add it to the answer:
   - `res |= mask`.
4. After processing all bits, return `res`.

::tabs-start

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        n = len(nums)
        res = 0
        for b in range(32):
            x = y = 0
            mask = 1 << b
            for num in nums:
                if num & mask:
                    x += 1

            for num in range(1, n):
                if num & mask:
                    y += 1

            if x > y:
                res |= mask
        return res
```

```java
public class Solution {
    public int findDuplicate(int[] nums) {
        int n = nums.length;
        int res = 0;
        for (int b = 0; b < 32; b++) {
            int x = 0, y = 0;
            int mask = 1 << b;
            for (int num : nums) {
                if ((num & mask) != 0) {
                    x++;
                }
            }
            for (int num = 1; num < n; num++) {
                if ((num & mask) != 0) {
                    y++;
                }
            }
            if (x > y) {
                res |= mask;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int n = nums.size();
        int res = 0;
        for (int b = 0; b < 32; b++) {
            int x = 0, y = 0;
            int mask = 1 << b;
            for (int num : nums) {
                if (num & mask) {
                    x++;
                }
            }
            for (int num = 1; num < n; num++) {
                if (num & mask) {
                    y++;
                }
            }
            if (x > y) {
                res |= mask;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        let n = nums.length;
        let res = 0;
        for (let b = 0; b < 32; b++) {
            let x = 0,
                y = 0;
            let mask = 1 << b;
            for (let num of nums) {
                if (num & mask) {
                    x++;
                }
            }
            for (let num = 1; num < n; num++) {
                if (num & mask) {
                    y++;
                }
            }
            if (x > y) {
                res |= mask;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int FindDuplicate(IList<int> nums) {
        int n = nums.Count;
        int res = 0;
        for (int b = 0; b < 32; b++) {
            int x = 0, y = 0;
            int mask = 1 << b;
            foreach (int num in nums) {
                if ((num & mask) != 0) {
                    x++;
                }
            }
            for (int num = 1; num < n; num++) {
                if ((num & mask) != 0) {
                    y++;
                }
            }
            if (x > y) {
                res |= mask;
            }
        }
        return res;
    }
}
```

```go
func findDuplicate(nums []int) int {
    n := len(nums)
    res := 0

    for b := 0; b < 32; b++ {
        x, y := 0, 0
        mask := 1 << b

        for _, num := range nums {
            if num&mask != 0 {
                x++
            }
        }

        for num := 1; num < n; num++ {
            if num&mask != 0 {
                y++
            }
        }

        if x > y {
            res |= mask
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findDuplicate(nums: IntArray): Int {
        val n = nums.size
        var res = 0

        for (b in 0 until 32) {
            var x = 0
            var y = 0
            val mask = 1 shl b

            for (num in nums) {
                if (num and mask != 0) {
                    x++
                }
            }

            for (num in 1 until n) {
                if (num and mask != 0) {
                    y++
                }
            }

            if (x > y) {
                res = res or mask
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findDuplicate(_ nums: [Int]) -> Int {
        let n = nums.count
        var res = 0

        for b in 0..<32 {
            var x = 0, y = 0
            let mask = 1 << b

            for num in nums {
                if num & mask != 0 {
                    x += 1
                }
            }

            for num in 1..<n {
                if num & mask != 0 {
                    y += 1
                }
            }

            if x > y {
                res |= mask
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(32 * n)$
- Space complexity: $O(1)$

---

## 7. Fast And Slow Pointers

### Intuition

Treat the array like a **linked list**, where each index points to the next index given by its value.  
Because one number is duplicated, two indices will point into the **same chain**, creating a **cycle** — exactly like a linked list with a loop.

Using Floyd’s **Fast & Slow Pointer** technique:

1. The **slow** pointer moves one step at a time.
2. The **fast** pointer moves two steps at a time.
3. If there’s a cycle, they will eventually meet.

Once they meet, we start a new pointer from the beginning:
- Move both pointers one step at a time.
- The point where they meet again is the **duplicate number** (the entry point of the cycle).

### Algorithm

1. Initialize two pointers `slow = 0` and `fast = 0`.
2. Move:
   - `slow = nums[slow]`
   - `fast = nums[nums[fast]]`
   until `slow == fast`.
3. Start a new pointer `slow2 = 0`.
4. Move both:
   - `slow = nums[slow]`
   - `slow2 = nums[slow2]`
   until they meet.
5. The meeting point is the duplicate number.  
6. Return that number.

::tabs-start

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        slow, fast = 0, 0
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break

        slow2 = 0
        while True:
            slow = nums[slow]
            slow2 = nums[slow2]
            if slow == slow2:
                return slow
```

```java
class Solution {
    public int findDuplicate(int[] nums) {
        int slow = 0, fast = 0;
        while (true) {
            slow = nums[slow];
            fast = nums[nums[fast]];
            if (slow == fast) {
                break;
            }
        }

        int slow2 = 0;
        while (true) {
            slow = nums[slow];
            slow2 = nums[slow2];
            if (slow == slow2) {
                return slow;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = 0, fast = 0;
        while (true) {
            slow = nums[slow];
            fast = nums[nums[fast]];
            if (slow == fast) {
                break;
            }
        }

        int slow2 = 0;
        while (true) {
            slow = nums[slow];
            slow2 = nums[slow2];
            if (slow == slow2) {
                return slow;
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findDuplicate(nums) {
        let slow = 0;
        let fast = 0;
        while (true) {
            slow = nums[slow];
            fast = nums[nums[fast]];
            if (slow === fast) {
                break;
            }
        }

        let slow2 = 0;
        while (true) {
            slow = nums[slow];
            slow2 = nums[slow2];
            if (slow === slow2) {
                return slow;
            }
        }
    }
}
```

```csharp
public class Solution {
    public int FindDuplicate(int[] nums) {
        int slow = 0, fast = 0;
        while (true) {
            slow = nums[slow];
            fast = nums[nums[fast]];
            if (slow == fast) {
                break;
            }
        }

        int slow2 = 0;
        while (true) {
            slow = nums[slow];
            slow2 = nums[slow2];
            if (slow == slow2) {
                return slow;
            }
        }
    }
}
```

```go
func findDuplicate(nums []int) int {
    slow, fast := 0, 0

    for {
        slow = nums[slow]
        fast = nums[nums[fast]]

        if slow == fast {
            break
        }
    }

    slow2 := 0
    for {
        slow = nums[slow]
        slow2 = nums[slow2]

        if slow == slow2 {
            return slow
        }
    }
}
```

```kotlin
class Solution {
    fun findDuplicate(nums: IntArray): Int {
        var slow = 0
        var fast = 0

        while (true) {
            slow = nums[slow]
            fast = nums[nums[fast]]

            if (slow == fast) {
                break
            }
        }

        var slow2 = 0
        while (true) {
            slow = nums[slow]
            slow2 = nums[slow2]

            if (slow == slow2) {
                return slow
            }
        }
    }
}
```

```swift
class Solution {
    func findDuplicate(_ nums: [Int]) -> Int {
        var slow = 0, fast = 0

        while true {
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast {
                break
            }
        }

        var slow2 = 0
        while true {
            slow = nums[slow]
            slow2 = nums[slow2]
            if slow == slow2 {
                return slow
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
