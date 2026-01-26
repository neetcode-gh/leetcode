## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Sorting and Deduplication** - Removing duplicates and ordering elements for efficient processing
- **Binary Search** - Finding boundary positions in sorted arrays in O(log n) time
- **Sliding Window Technique** - Maintaining a valid window of consecutive values with two pointers
- **Set/HashSet Operations** - Efficiently identifying and removing duplicate elements

---

## 1. Brute Force

### Intuition

An array is continuous if it contains `n` unique elements where the difference between the maximum and minimum is exactly `n - 1`. This means a valid continuous array is just a range of consecutive integers. We can replace any element with any value, so the goal is to keep as many original elements as possible and replace the rest.

For each unique element, we treat it as the potential minimum of our final array. Then we count how many other unique elements fall within the valid range (from that minimum to `minimum + n - 1`). The elements outside this range need to be replaced.

### Algorithm

1. Remove duplicates from the array and sort the unique elements.
2. For each unique element at index `i`, treat it as the minimum of the target range.
3. Count how many elements fall within the range `[nums[i], nums[i] + n - 1]`.
4. The number of operations needed is `n - count` (total elements minus those already in range).
5. Return the `min` operations across all starting positions.

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        N = len(nums)
        res = float("inf")
        nums = sorted(set(nums))
        n = len(nums)

        for i in range(n):
            noChange = 1
            for j in range(i + 1, n):
                if nums[i] < nums[j] < nums[i] + N:
                    noChange += 1
            res = min(res, N - noChange)

        return res
```

```java
public class Solution {
    public int minOperations(int[] nums) {
        int N = nums.length;
        int res = Integer.MAX_VALUE;
        TreeSet<Integer> set = new TreeSet<>();
        for (int num : nums) {
            set.add(num);
        }
        Integer[] sortedNums = set.toArray(new Integer[0]);
        int n = sortedNums.length;

        for (int i = 0; i < n; i++) {
            int noChange = 1;
            for (int j = i + 1; j < n; j++) {
                if (sortedNums[j] < sortedNums[i] + N) {
                    noChange++;
                }
            }
            res = Math.min(res, N - noChange);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums) {
        int N = nums.size();
        int res = INT_MAX;
        set<int> uniqueNums(nums.begin(), nums.end());
        vector<int> sortedNums(uniqueNums.begin(), uniqueNums.end());
        int n = sortedNums.size();

        for (int i = 0; i < n; i++) {
            int noChange = 1;
            for (int j = i + 1; j < n; j++) {
                if (sortedNums[j] < sortedNums[i] + N) {
                    noChange++;
                }
            }
            res = min(res, N - noChange);
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
    minOperations(nums) {
        const N = nums.length;
        let res = Infinity;
        const uniqueNums = Array.from(new Set(nums)).sort((a, b) => a - b);
        const n = uniqueNums.length;

        for (let i = 0; i < n; i++) {
            let noChange = 1;
            for (let j = i + 1; j < n; j++) {
                if (uniqueNums[j] < uniqueNums[i] + N) {
                    noChange++;
                }
            }
            res = Math.min(res, N - noChange);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinOperations(int[] nums) {
        int N = nums.Length;
        int res = int.MaxValue;
        int[] sortedNums = nums.Distinct().OrderBy(x => x).ToArray();
        int n = sortedNums.Length;

        for (int i = 0; i < n; i++) {
            int noChange = 1;
            for (int j = i + 1; j < n; j++) {
                if (sortedNums[j] < sortedNums[i] + N) {
                    noChange++;
                }
            }
            res = Math.Min(res, N - noChange);
        }

        return res;
    }
}
```

```go
func minOperations(nums []int) int {
    N := len(nums)
    res := N
    seen := make(map[int]bool)
    var sortedNums []int
    for _, num := range nums {
        if !seen[num] {
            seen[num] = true
            sortedNums = append(sortedNums, num)
        }
    }
    sort.Ints(sortedNums)
    n := len(sortedNums)

    for i := 0; i < n; i++ {
        noChange := 1
        for j := i + 1; j < n; j++ {
            if sortedNums[j] < sortedNums[i]+N {
                noChange++
            }
        }
        if N-noChange < res {
            res = N - noChange
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun minOperations(nums: IntArray): Int {
        val N = nums.size
        var res = Int.MAX_VALUE
        val sortedNums = nums.toSet().sorted()
        val n = sortedNums.size

        for (i in 0 until n) {
            var noChange = 1
            for (j in i + 1 until n) {
                if (sortedNums[j] < sortedNums[i] + N) {
                    noChange++
                }
            }
            res = minOf(res, N - noChange)
        }

        return res
    }
}
```

```swift
class Solution {
    func minOperations(_ nums: [Int]) -> Int {
        let N = nums.count
        var res = Int.max
        let sortedNums = Array(Set(nums)).sorted()
        let n = sortedNums.count

        for i in 0..<n {
            var noChange = 1
            for j in (i + 1)..<n {
                if sortedNums[j] < sortedNums[i] + N {
                    noChange += 1
                }
            }
            res = min(res, N - noChange)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Binary Search

### Intuition

Instead of using a nested loop to count elements in range, we can use binary search. Once the array is sorted, for each starting element, we binary search for the first element that exceeds the valid range. The number of valid elements is the difference between the found position and the starting `index`.

### Algorithm

1. Remove duplicates and sort the unique elements.
2. For each unique element at index `i`, use binary search to find the first position `l` where `nums[l] >= nums[i] + n`.
3. The count of elements in range is `l - i`.
4. Track the `min` value of `n - count` across all positions.
5. Return the minimum operations found.

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        N = len(nums)
        res = float("inf")
        nums = sorted(set(nums))
        n = len(nums)

        for i in range(n):
            l, r = i, n
            while l < r:
                mid = (l + r) // 2
                if nums[mid] < nums[i] + N:
                    l = mid + 1
                else:
                    r = mid
            noChange = l - i
            res = min(res, N - noChange)

        return res
```

```java
public class Solution {
    public int minOperations(int[] nums) {
        int N = nums.length;
        int res = Integer.MAX_VALUE;
        TreeSet<Integer> set = new TreeSet<>();
        for (int num : nums) {
            set.add(num);
        }
        Integer[] sortedNums = set.toArray(new Integer[0]);
        int n = sortedNums.length;

        for (int i = 0; i < n; i++) {
            int l = i, r = n;
            while (l < r) {
                int mid = l + (r - l) / 2;
                if (sortedNums[mid] < sortedNums[i] + N) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            int noChange = l - i;
            res = Math.min(res, N - noChange);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums) {
        int N = nums.size();
        int res = INT_MAX;
        set<int> uniqueNums(nums.begin(), nums.end());
        vector<int> sortedNums(uniqueNums.begin(), uniqueNums.end());
        int n = sortedNums.size();

        for (int i = 0; i < n; i++) {
            int l = i, r = n;
            while (l < r) {
                int mid = l + (r - l) / 2;
                if (sortedNums[mid] < sortedNums[i] + N) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            int noChange = l - i;
            res = min(res, N - noChange);
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
    minOperations(nums) {
        const N = nums.length;
        let res = Infinity;
        const uniqueNums = Array.from(new Set(nums)).sort((a, b) => a - b);
        const n = uniqueNums.length;

        for (let i = 0; i < n; i++) {
            let l = i,
                r = n;
            while (l < r) {
                const mid = Math.floor((l + r) / 2);
                if (uniqueNums[mid] < uniqueNums[i] + N) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            const noChange = l - i;
            res = Math.min(res, N - noChange);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinOperations(int[] nums) {
        int N = nums.Length;
        int res = int.MaxValue;
        int[] sortedNums = nums.Distinct().OrderBy(x => x).ToArray();
        int n = sortedNums.Length;

        for (int i = 0; i < n; i++) {
            int l = i, r = n;
            while (l < r) {
                int mid = l + (r - l) / 2;
                if (sortedNums[mid] < sortedNums[i] + N) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            int noChange = l - i;
            res = Math.Min(res, N - noChange);
        }

        return res;
    }
}
```

```go
func minOperations(nums []int) int {
    N := len(nums)
    res := N
    seen := make(map[int]bool)
    var sortedNums []int
    for _, num := range nums {
        if !seen[num] {
            seen[num] = true
            sortedNums = append(sortedNums, num)
        }
    }
    sort.Ints(sortedNums)
    n := len(sortedNums)

    for i := 0; i < n; i++ {
        l, r := i, n
        for l < r {
            mid := l + (r-l)/2
            if sortedNums[mid] < sortedNums[i]+N {
                l = mid + 1
            } else {
                r = mid
            }
        }
        noChange := l - i
        if N-noChange < res {
            res = N - noChange
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun minOperations(nums: IntArray): Int {
        val N = nums.size
        var res = Int.MAX_VALUE
        val sortedNums = nums.toSet().sorted()
        val n = sortedNums.size

        for (i in 0 until n) {
            var l = i
            var r = n
            while (l < r) {
                val mid = l + (r - l) / 2
                if (sortedNums[mid] < sortedNums[i] + N) {
                    l = mid + 1
                } else {
                    r = mid
                }
            }
            val noChange = l - i
            res = minOf(res, N - noChange)
        }

        return res
    }
}
```

```swift
class Solution {
    func minOperations(_ nums: [Int]) -> Int {
        let N = nums.count
        var res = Int.max
        let sortedNums = Array(Set(nums)).sorted()
        let n = sortedNums.count

        for i in 0..<n {
            var l = i, r = n
            while l < r {
                let mid = l + (r - l) / 2
                if sortedNums[mid] < sortedNums[i] + N {
                    l = mid + 1
                } else {
                    r = mid
                }
            }
            let noChange = l - i
            res = min(res, N - noChange)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Sliding Window

### Intuition

Since the sorted unique elements are in increasing order, we can use a sliding window instead of binary search. As the left pointer moves right, the right pointer only needs to move forward (never backward) because the valid range shifts up. This gives us an efficient two-pointer approach.

### Algorithm

1. Remove duplicates and sort the unique elements.
2. Use two pointers `l` (left) and `r` (right) starting at 0.
3. For each left pointer position:
   - Expand the right pointer while elements are within range `[nums[l], nums[l] + n - 1]`.
   - The `window` size `r - l` represents elements that can stay.
   - Update the `result` as `min(result, n - window)`.
4. Return the minimum operations.

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        length = len(nums)
        nums = sorted(set(nums))
        res = length
        r = 0

        for l in range(len(nums)):
            while r < len(nums) and nums[r] < nums[l] + length:
                r += 1
            window = r - l
            res = min(res, length - window)

        return res
```

```java
public class Solution {
    public int minOperations(int[] nums) {
        int length = nums.length;
        TreeSet<Integer> set = new TreeSet<>();
        for (int num : nums) {
            set.add(num);
        }
        List<Integer> sortedNums = new ArrayList<>(set);
        int res = length, r = 0;

        for (int l = 0; l < sortedNums.size(); l++) {
            while (r < sortedNums.size() && sortedNums.get(r) < sortedNums.get(l) + length) {
                r++;
            }
            int window = r - l;
            res = Math.min(res, length - window);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums) {
        int length = nums.size();
        set<int> uniqueNums(nums.begin(), nums.end());
        vector<int> sortedNums(uniqueNums.begin(), uniqueNums.end());
        int res = length, r = 0;

        for (int l = 0; l < sortedNums.size(); l++) {
            while (r < sortedNums.size() && sortedNums[r] < sortedNums[l] + length) {
                r++;
            }
            int window = r - l;
            res = min(res, length - window);
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
    minOperations(nums) {
        const length = nums.length;
        const uniqueNums = Array.from(new Set(nums)).sort((a, b) => a - b);
        let res = length,
            r = 0;

        for (let l = 0; l < uniqueNums.length; l++) {
            while (
                r < uniqueNums.length &&
                uniqueNums[r] < uniqueNums[l] + length
            ) {
                r++;
            }
            const window = r - l;
            res = Math.min(res, length - window);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinOperations(int[] nums) {
        int length = nums.Length;
        int[] sortedNums = nums.Distinct().OrderBy(x => x).ToArray();
        int res = length, r = 0;

        for (int l = 0; l < sortedNums.Length; l++) {
            while (r < sortedNums.Length && sortedNums[r] < sortedNums[l] + length) {
                r++;
            }
            int window = r - l;
            res = Math.Min(res, length - window);
        }

        return res;
    }
}
```

```go
func minOperations(nums []int) int {
    length := len(nums)
    seen := make(map[int]bool)
    var sortedNums []int
    for _, num := range nums {
        if !seen[num] {
            seen[num] = true
            sortedNums = append(sortedNums, num)
        }
    }
    sort.Ints(sortedNums)
    res := length
    r := 0

    for l := 0; l < len(sortedNums); l++ {
        for r < len(sortedNums) && sortedNums[r] < sortedNums[l]+length {
            r++
        }
        window := r - l
        if length-window < res {
            res = length - window
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun minOperations(nums: IntArray): Int {
        val length = nums.size
        val sortedNums = nums.toSet().sorted()
        var res = length
        var r = 0

        for (l in sortedNums.indices) {
            while (r < sortedNums.size && sortedNums[r] < sortedNums[l] + length) {
                r++
            }
            val window = r - l
            res = minOf(res, length - window)
        }

        return res
    }
}
```

```swift
class Solution {
    func minOperations(_ nums: [Int]) -> Int {
        let length = nums.count
        let sortedNums = Array(Set(nums)).sorted()
        var res = length
        var r = 0

        for l in 0..<sortedNums.count {
            while r < sortedNums.count && sortedNums[r] < sortedNums[l] + length {
                r += 1
            }
            let window = r - l
            res = min(res, length - window)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Sliding Window (Optimal)

### Intuition

We can optimize space by removing duplicates in-place after sorting. Instead of creating a new array, we overwrite the original array with unique elements. The sliding window logic remains the same, but we avoid allocating extra space for the deduplicated array.

### Algorithm

1. Sort the array in place.
2. Remove duplicates by keeping a write pointer `n` that tracks the position for the next unique element.
3. Use a sliding window with the left pointer advancing when the range exceeds `length - 1`.
4. After processing, return `length - (n - l)`, where `n - l` is the `max` window size found.

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        length = len(nums)
        nums.sort()
        res = length
        n = 1

        for i in range(1, length):
            if nums[i] != nums[i - 1]:
                nums[n] = nums[i]
                n += 1

        l = 0
        for r in range(n):
            l += (nums[r] - nums[l] > length - 1)

        return length - (n - l)
```

```java
public class Solution {
    public int minOperations(int[] nums) {
        int length = nums.length;
        Arrays.sort(nums);
        int n = 1;

        for (int i = 1; i < length; i++) {
            if (nums[i] != nums[i - 1]) {
                nums[n] = nums[i];
                n++;
            }
        }

        int l = 0;
        for (int r = 0; r < n; r++) {
            if (nums[r] - nums[l] > length - 1) {
                l++;
            }
        }

        return length - (n - l);
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums) {
        int length = nums.size();
        sort(nums.begin(), nums.end());
        int n = 1;

        for (int i = 1; i < length; i++) {
            if (nums[i] != nums[i - 1]) {
                nums[n] = nums[i];
                n++;
            }
        }

        int l = 0;
        for (int r = 0; r < n; r++) {
            if (nums[r] - nums[l] > length - 1) {
                l++;
            }
        }

        return length - (n - l);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minOperations(nums) {
        const length = nums.length;
        nums.sort((a, b) => a - b);
        let n = 1;

        for (let i = 1; i < length; i++) {
            if (nums[i] !== nums[i - 1]) {
                nums[n] = nums[i];
                n++;
            }
        }

        let l = 0;
        for (let r = 0; r < n; r++) {
            if (nums[r] - nums[l] > length - 1) {
                l++;
            }
        }

        return length - (n - l);
    }
}
```

```csharp
public class Solution {
    public int MinOperations(int[] nums) {
        int length = nums.Length;
        Array.Sort(nums);
        int n = 1;

        for (int i = 1; i < length; i++) {
            if (nums[i] != nums[i - 1]) {
                nums[n] = nums[i];
                n++;
            }
        }

        int l = 0;
        for (int r = 0; r < n; r++) {
            if (nums[r] - nums[l] > length - 1) {
                l++;
            }
        }

        return length - (n - l);
    }
}
```

```go
func minOperations(nums []int) int {
    length := len(nums)
    sort.Ints(nums)
    n := 1

    for i := 1; i < length; i++ {
        if nums[i] != nums[i-1] {
            nums[n] = nums[i]
            n++
        }
    }

    l := 0
    for r := 0; r < n; r++ {
        if nums[r]-nums[l] > length-1 {
            l++
        }
    }

    return length - (n - l)
}
```

```kotlin
class Solution {
    fun minOperations(nums: IntArray): Int {
        val length = nums.size
        nums.sort()
        var n = 1

        for (i in 1 until length) {
            if (nums[i] != nums[i - 1]) {
                nums[n] = nums[i]
                n++
            }
        }

        var l = 0
        for (r in 0 until n) {
            if (nums[r] - nums[l] > length - 1) {
                l++
            }
        }

        return length - (n - l)
    }
}
```

```swift
class Solution {
    func minOperations(_ nums: [Int]) -> Int {
        let length = nums.count
        var nums = nums.sorted()
        var n = 1

        for i in 1..<length {
            if nums[i] != nums[i - 1] {
                nums[n] = nums[i]
                n += 1
            }
        }

        var l = 0
        for r in 0..<n {
            if nums[r] - nums[l] > length - 1 {
                l += 1
            }
        }

        return length - (n - l)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## Common Pitfalls

### Forgetting to Remove Duplicates

The continuous array must have `n` unique elements. If you count duplicates when determining how many elements can stay unchanged, you will overcount and return an incorrect (smaller) number of operations. Always deduplicate before processing.

### Using Original Array Length Instead of Unique Count

After removing duplicates, the unique array may be shorter than the original. If you use the original length `n` for window size calculations but iterate over the shorter unique array, your indexing will be off. Use the original `n` for the target range size but the unique array length for iteration bounds.

### Off-by-One in Range Boundary

The valid range for a continuous array starting at value `min` is `[min, min + n - 1]`. A common mistake is using `min + n` as the upper bound, which allows one extra value. This causes the algorithm to count elements that should not be in the window.

### Not Counting the Starting Element

When calculating how many elements are already in the valid range, some implementations forget to count the starting element itself. If the element at position `i` is the minimum, it should always be counted as one element that does not need replacement.

### Binary Search Target Error

When using binary search to find elements in range, the search should find the first position where `nums[j] >= nums[i] + n`. Searching for `nums[j] > nums[i] + n - 1` is equivalent but easy to get wrong. Off-by-one errors in binary search bounds lead to incorrect window sizes.