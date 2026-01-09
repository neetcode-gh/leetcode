## 1. Brute Force

### Intuition

We need to find a value `x` such that exactly `x` elements in the array are greater than or equal to `x`. The simplest approach is to try every possible value of `x` from `1` to `n` (the array length) and count how many elements satisfy the condition. If we find a match, we return that value. Since `x` must equal the count, `x` cannot exceed `n` (we can have at most `n` elements).

### Algorithm

1. Iterate through each candidate value `i` from `1` to `n`.
2. For each candidate, count how many elements in the array are greater than or equal to `i`.
3. If the count equals `i`, return `i` as the special value.
4. If no valid value is found after checking all candidates, return `-1`.

::tabs-start

```python
class Solution:
    def specialArray(self, nums: List[int]) -> int:
        for i in range(1, len(nums) + 1):
            cnt = 0
            for num in nums:
                if num >= i:
                    cnt += 1

            if cnt == i:
                return i

        return -1
```

```java
public class Solution {
    public int specialArray(int[] nums) {
        for (int i = 1; i <= nums.length; i++) {
            int count = 0;
            for (int num : nums) {
                if (num >= i) {
                    count++;
                }
            }
            if (count == i) {
                return i;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int specialArray(vector<int>& nums) {
        for (int i = 1; i <= nums.size(); i++) {
            int count = 0;
            for (int num : nums) {
                if (num >= i) {
                    count++;
                }
            }
            if (count == i) {
                return i;
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
    specialArray(nums) {
        for (let i = 1; i <= nums.length; i++) {
            let count = 0;
            for (let num of nums) {
                if (num >= i) {
                    count++;
                }
            }
            if (count === i) {
                return i;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int SpecialArray(int[] nums) {
        for (int i = 1; i <= nums.Length; i++) {
            int count = 0;
            foreach (int num in nums) {
                if (num >= i) {
                    count++;
                }
            }
            if (count == i) {
                return i;
            }
        }
        return -1;
    }
}
```

```go
func specialArray(nums []int) int {
    for i := 1; i <= len(nums); i++ {
        count := 0
        for _, num := range nums {
            if num >= i {
                count++
            }
        }
        if count == i {
            return i
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun specialArray(nums: IntArray): Int {
        for (i in 1..nums.size) {
            var count = 0
            for (num in nums) {
                if (num >= i) {
                    count++
                }
            }
            if (count == i) {
                return i
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func specialArray(_ nums: [Int]) -> Int {
        for i in 1...nums.count {
            var count = 0
            for num in nums {
                if num >= i {
                    count += 1
                }
            }
            if count == i {
                return i
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Binary Search

### Intuition

Instead of checking every value linearly, we can use binary search on the answer. The key observation is that as `x` increases, the count of elements greater than or equal to `x` decreases (or stays the same). This monotonic property allows us to binary search for the special value. If the count is less than `mid`, we need a smaller `x`. If the count is greater than `mid`, we need a larger `x`.

### Algorithm

1. Set search bounds: `l = 1` and `r = n` (the array length).
2. While `l <= r`:
   - Calculate `mid = (l + r) / 2`.
   - Count elements greater than or equal to `mid`.
   - If count equals `mid`, return `mid`.
   - If count is less than `mid`, search the lower half by setting `r = mid - 1`.
   - Otherwise, search the upper half by setting `l = mid + 1`.
3. Return `-1` if no special value exists.

::tabs-start

```python
class Solution:
    def specialArray(self, nums: List[int]) -> int:
        l, r = 1, len(nums)
        while l <= r:
            mid = (l + r) >> 1
            cnt = sum(1 for num in nums if num >= mid)

            if cnt == mid:
                return mid

            if cnt < mid:
                r = mid - 1
            else:
                l = mid + 1

        return -1
```

```java
public class Solution {
    public int specialArray(int[] nums) {
        int l = 1, r = nums.length;
        while (l <= r) {
            int mid = (l + r) / 2;
            int cnt = 0;
            for (int num : nums) {
                if (num >= mid) cnt++;
            }

            if (cnt == mid) return mid;

            if (cnt < mid) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int specialArray(vector<int>& nums) {
        int l = 1, r = nums.size();
        while (l <= r) {
            int mid = (l + r) / 2;
            int cnt = 0;
            for (int num : nums) {
                if (num >= mid) cnt++;
            }

            if (cnt == mid) return mid;

            if (cnt < mid) {
                r = mid - 1;
            } else {
                l = mid + 1;
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
    specialArray(nums) {
        let l = 1,
            r = nums.length;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            const cnt = nums.filter((num) => num >= mid).length;

            if (cnt === mid) return mid;

            if (cnt < mid) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int SpecialArray(int[] nums) {
        int l = 1, r = nums.Length;
        while (l <= r) {
            int mid = (l + r) / 2;
            int cnt = 0;
            foreach (int num in nums) {
                if (num >= mid) cnt++;
            }

            if (cnt == mid) return mid;

            if (cnt < mid) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return -1;
    }
}
```

```go
func specialArray(nums []int) int {
    l, r := 1, len(nums)
    for l <= r {
        mid := (l + r) / 2
        cnt := 0
        for _, num := range nums {
            if num >= mid {
                cnt++
            }
        }

        if cnt == mid {
            return mid
        }

        if cnt < mid {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun specialArray(nums: IntArray): Int {
        var l = 1
        var r = nums.size
        while (l <= r) {
            val mid = (l + r) / 2
            val cnt = nums.count { it >= mid }

            if (cnt == mid) return mid

            if (cnt < mid) {
                r = mid - 1
            } else {
                l = mid + 1
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func specialArray(_ nums: [Int]) -> Int {
        var l = 1
        var r = nums.count
        while l <= r {
            let mid = (l + r) / 2
            let cnt = nums.filter { $0 >= mid }.count

            if cnt == mid { return mid }

            if cnt < mid {
                r = mid - 1
            } else {
                l = mid + 1
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$

---

## 3. Sorting

### Intuition

After sorting the array, we can efficiently determine how many elements are greater than or equal to any value. For each position `i` in the sorted array, there are `n - i` elements from index `i` to the end. We scan through the array and check if `totalRight` (the count of remaining elements) could be the special value. A valid special value must fall within a valid range defined by consecutive distinct elements.

### Algorithm

1. Sort the array in ascending order.
2. Initialize `totalRight = n` (all elements to the right including current).
3. Traverse the sorted array:
   - If `nums[i]` equals `totalRight`, or `totalRight` falls strictly between `prev` and `nums[i]`, return `totalRight`.
   - Skip duplicate elements.
   - Update `prev` and move to the next distinct element, updating `totalRight`.
4. Return `-1` if no special value is found.

::tabs-start

```python
class Solution:
    def specialArray(self, nums: List[int]) -> int:
        nums.sort()
        i = 0
        prev = -1
        total_right = len(nums)
        while i < len(nums):
            if nums[i] == total_right or (prev < total_right < nums[i]):
                return total_right

            while i + 1 < len(nums) and nums[i] == nums[i + 1]:
                i += 1

            prev = nums[i]
            i += 1
            total_right = len(nums) - i

        return -1
```

```java
public class Solution {
    public int specialArray(int[] nums) {
        Arrays.sort(nums);
        int i = 0, prev = -1, totalRight = nums.length;

        while (i < nums.length) {
            if (nums[i] == totalRight ||
               (prev < totalRight && totalRight < nums[i])) {
                return totalRight;
            }

            while (i + 1 < nums.length && nums[i] == nums[i + 1]) {
                i++;
            }

            prev = nums[i];
            i++;
            totalRight = nums.length - i;
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int specialArray(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int i = 0, prev = -1, totalRight = nums.size();

        while (i < nums.size()) {
            if (nums[i] == totalRight ||
               (prev < totalRight && totalRight < nums[i])) {
                return totalRight;
            }

            while (i + 1 < nums.size() && nums[i] == nums[i + 1]) {
                i++;
            }

            prev = nums[i];
            i++;
            totalRight = nums.size() - i;
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
    specialArray(nums) {
        nums.sort((a, b) => a - b);
        let i = 0,
            prev = -1,
            totalRight = nums.length;

        while (i < nums.length) {
            if (
                nums[i] === totalRight ||
                (prev < totalRight && totalRight < nums[i])
            ) {
                return totalRight;
            }

            while (i + 1 < nums.length && nums[i] === nums[i + 1]) {
                i++;
            }

            prev = nums[i];
            i++;
            totalRight = nums.length - i;
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int SpecialArray(int[] nums) {
        Array.Sort(nums);
        int i = 0, prev = -1, totalRight = nums.Length;

        while (i < nums.Length) {
            if (nums[i] == totalRight ||
               (prev < totalRight && totalRight < nums[i])) {
                return totalRight;
            }

            while (i + 1 < nums.Length && nums[i] == nums[i + 1]) {
                i++;
            }

            prev = nums[i];
            i++;
            totalRight = nums.Length - i;
        }

        return -1;
    }
}
```

```go
func specialArray(nums []int) int {
    sort.Ints(nums)
    i, prev, totalRight := 0, -1, len(nums)

    for i < len(nums) {
        if nums[i] == totalRight ||
           (prev < totalRight && totalRight < nums[i]) {
            return totalRight
        }

        for i+1 < len(nums) && nums[i] == nums[i+1] {
            i++
        }

        prev = nums[i]
        i++
        totalRight = len(nums) - i
    }

    return -1
}
```

```kotlin
class Solution {
    fun specialArray(nums: IntArray): Int {
        nums.sort()
        var i = 0
        var prev = -1
        var totalRight = nums.size

        while (i < nums.size) {
            if (nums[i] == totalRight ||
               (prev < totalRight && totalRight < nums[i])) {
                return totalRight
            }

            while (i + 1 < nums.size && nums[i] == nums[i + 1]) {
                i++
            }

            prev = nums[i]
            i++
            totalRight = nums.size - i
        }

        return -1
    }
}
```

```swift
class Solution {
    func specialArray(_ nums: [Int]) -> Int {
        var nums = nums.sorted()
        var i = 0
        var prev = -1
        var totalRight = nums.count

        while i < nums.count {
            if nums[i] == totalRight ||
               (prev < totalRight && totalRight < nums[i]) {
                return totalRight
            }

            while i + 1 < nums.count && nums[i] == nums[i + 1] {
                i += 1
            }

            prev = nums[i]
            i += 1
            totalRight = nums.count - i
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

## 4. Sorting + Two Pointers

### Intuition

After sorting, we use two pointers: one for the candidate value `j` and another for the array index `i`. As we increase `j`, the number of elements greater than or equal to `j` can only decrease. We advance `i` to skip elements smaller than the current candidate and check if the remaining count matches `j`.

### Algorithm

1. Sort the array in ascending order.
2. Initialize `i = 0` (array pointer) and `j = 1` (candidate value).
3. While both pointers are within valid bounds:
   - Advance `i` past all elements smaller than `j`.
   - If the count of remaining elements `(n - i)` equals `j`, return `j`.
   - Increment `j` to try the next candidate.
4. Return `-1` if no special value exists.

::tabs-start

```python
class Solution:
    def specialArray(self, nums: List[int]) -> int:
        nums.sort()
        n = len(nums)
        i, j = 0, 1

        while i < n and j <= n:
            while i < n and j > nums[i]:
                i += 1

            if j == n - i:
                return j
            j += 1

        return -1
```

```java
public class Solution {
    public int specialArray(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        int i = 0, j = 1;

        while (i < n && j <= n) {
            while (i < n && j > nums[i]) i++;

            if (j == n - i) {
                return j;
            }
            j++;
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int specialArray(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int i = 0, j = 1;

        while (i < n && j <= n) {
            while (i < n && j > nums[i]) i++;

            if (j == n - i) {
                return j;
            }
            j++;
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
    specialArray(nums) {
        nums.sort((a, b) => a - b);
        const n = nums.length;
        let i = 0,
            j = 1;

        while (i < n && j <= n) {
            while (i < n && j > nums[i]) i++;

            if (j == n - i) {
                return j;
            }
            j++;
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int SpecialArray(int[] nums) {
        Array.Sort(nums);
        int n = nums.Length;
        int i = 0, j = 1;

        while (i < n && j <= n) {
            while (i < n && j > nums[i]) i++;

            if (j == n - i) {
                return j;
            }
            j++;
        }

        return -1;
    }
}
```

```go
func specialArray(nums []int) int {
    sort.Ints(nums)
    n := len(nums)
    i, j := 0, 1

    for i < n && j <= n {
        for i < n && j > nums[i] {
            i++
        }

        if j == n-i {
            return j
        }
        j++
    }

    return -1
}
```

```kotlin
class Solution {
    fun specialArray(nums: IntArray): Int {
        nums.sort()
        val n = nums.size
        var i = 0
        var j = 1

        while (i < n && j <= n) {
            while (i < n && j > nums[i]) i++

            if (j == n - i) {
                return j
            }
            j++
        }

        return -1
    }
}
```

```swift
class Solution {
    func specialArray(_ nums: [Int]) -> Int {
        var nums = nums.sorted()
        let n = nums.count
        var i = 0
        var j = 1

        while i < n && j <= n {
            while i < n && j > nums[i] {
                i += 1
            }

            if j == n - i {
                return j
            }
            j += 1
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

## 5. Counting Sort

### Intuition

We can use a counting array to track how many elements have each value. Since any element greater than n is effectively the same as n for our purposes (they all contribute to counts for candidates 1 through n), we cap values at n. By iterating from the largest possible candidate down to 0 and accumulating counts, we can efficiently find when the running total equals the current index.

### Algorithm

1. Create a count array of size `n + 1`.
2. For each element, increment `count[min(num, n)]`.
3. Traverse from index `n` down to `0`, accumulating the count in `totalRight`.
4. If at any index `i`, `totalRight` equals `i`, return `i` as the special value.
5. Return `-1` if no match is found.

::tabs-start

```python
class Solution:
    def specialArray(self, nums: List[int]) -> int:
        count = [0] * (len(nums) + 1)
        for num in nums:
            index = min(num, len(nums))
            count[index] += 1

        total_right = 0
        for i in range(len(nums), -1, -1):
            total_right += count[i]
            if i == total_right:
                return total_right
        return -1
```

```java
public class Solution {
    public int specialArray(int[] nums) {
        int[] count = new int[nums.length + 1];
        for (int num : nums) {
            int index = Math.min(num, nums.length);
            count[index]++;
        }

        int totalRight = 0;
        for (int i = nums.length; i >= 0; i--) {
            totalRight += count[i];
            if (i == totalRight) {
                return totalRight;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int specialArray(vector<int>& nums) {
        vector<int> count(nums.size() + 1, 0);
        for (int num : nums) {
            int index = min(num, (int)nums.size());
            count[index]++;
        }

        int totalRight = 0;
        for (int i = nums.size(); i >= 0; --i) {
            totalRight += count[i];
            if (i == totalRight) {
                return totalRight;
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
    specialArray(nums) {
        const count = new Array(nums.length + 1).fill(0);
        for (const num of nums) {
            const index = Math.min(num, nums.length);
            count[index]++;
        }

        let totalRight = 0;
        for (let i = nums.length; i >= 0; i--) {
            totalRight += count[i];
            if (i === totalRight) {
                return totalRight;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int SpecialArray(int[] nums) {
        int[] count = new int[nums.Length + 1];
        foreach (int num in nums) {
            int index = Math.Min(num, nums.Length);
            count[index]++;
        }

        int totalRight = 0;
        for (int i = nums.Length; i >= 0; i--) {
            totalRight += count[i];
            if (i == totalRight) {
                return totalRight;
            }
        }
        return -1;
    }
}
```

```go
func specialArray(nums []int) int {
    count := make([]int, len(nums)+1)
    for _, num := range nums {
        index := num
        if index > len(nums) {
            index = len(nums)
        }
        count[index]++
    }

    totalRight := 0
    for i := len(nums); i >= 0; i-- {
        totalRight += count[i]
        if i == totalRight {
            return totalRight
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun specialArray(nums: IntArray): Int {
        val count = IntArray(nums.size + 1)
        for (num in nums) {
            val index = minOf(num, nums.size)
            count[index]++
        }

        var totalRight = 0
        for (i in nums.size downTo 0) {
            totalRight += count[i]
            if (i == totalRight) {
                return totalRight
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func specialArray(_ nums: [Int]) -> Int {
        var count = [Int](repeating: 0, count: nums.count + 1)
        for num in nums {
            let index = min(num, nums.count)
            count[index] += 1
        }

        var totalRight = 0
        for i in stride(from: nums.count, through: 0, by: -1) {
            totalRight += count[i]
            if i == totalRight {
                return totalRight
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
