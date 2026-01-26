## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Sorting** - Used to arrange elements so we can pick from smallest and largest ends
- **Two Pointers** - Needed to efficiently pick elements from both ends of the sorted array
- **Greedy Algorithms** - Understanding why interleaving small and large values guarantees a valid arrangement

---

## 1. Greedy

### Intuition

If we sort the array, adjacent elements become close in value, which makes it more likely for an element to be the average of its neighbors. To avoid this, we can interleave elements from the small and large ends of the sorted array. By alternating between picking from the front (small) and back (large), we create a pattern where neighbors differ significantly, preventing any element from being the exact average of its neighbors.

### Algorithm

1. Sort the array in ascending order.
2. Use two pointers: one at the beginning (`l`) and one at the end (`r`) of the sorted array.
3. Build the result by alternating between taking from `l` (small values) and `r` (large values).
4. Continue until all elements are placed.
5. Return the result array.

::tabs-start

```python
class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        nums.sort()
        res = []
        l, r = 0, len(nums) - 1
        while len(res) != len(nums):
            res.append(nums[l])
            l += 1
            if l <= r:
                res.append(nums[r])
                r -= 1
        return res
```

```java
public class Solution {
    public int[] rearrangeArray(int[] nums) {
        Arrays.sort(nums);
        int[] res = new int[nums.length];
        int l = 0, r = nums.length - 1;
        int idx = 0;

        while (idx != nums.length) {
            res[idx++] = nums[l++];
            if (l <= r) {
                res[idx++] = nums[r--];
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<int> res;
        int l = 0, r = nums.size() - 1;

        while (res.size() != nums.size()) {
            res.push_back(nums[l++]);
            if (l <= r) {
                res.push_back(nums[r--]);
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
     * @return {number[]}
     */
    rearrangeArray(nums) {
        nums.sort((a, b) => a - b);
        const res = [];
        let l = 0,
            r = nums.length - 1;

        while (res.length !== nums.length) {
            res.push(nums[l++]);
            if (l <= r) {
                res.push(nums[r--]);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] RearrangeArray(int[] nums) {
        Array.Sort(nums);
        int[] res = new int[nums.Length];
        int l = 0, r = nums.Length - 1;
        int idx = 0;

        while (idx != nums.Length) {
            res[idx++] = nums[l++];
            if (l <= r) {
                res[idx++] = nums[r--];
            }
        }

        return res;
    }
}
```

```go
func rearrangeArray(nums []int) []int {
    sort.Ints(nums)
    res := make([]int, 0, len(nums))
    l, r := 0, len(nums)-1

    for len(res) != len(nums) {
        res = append(res, nums[l])
        l++
        if l <= r {
            res = append(res, nums[r])
            r--
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun rearrangeArray(nums: IntArray): IntArray {
        nums.sort()
        val res = IntArray(nums.size)
        var l = 0
        var r = nums.size - 1
        var idx = 0

        while (idx != nums.size) {
            res[idx++] = nums[l++]
            if (l <= r) {
                res[idx++] = nums[r--]
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func rearrangeArray(_ nums: [Int]) -> [Int] {
        var nums = nums.sorted()
        var res = [Int]()
        var l = 0
        var r = nums.count - 1

        while res.count != nums.count {
            res.append(nums[l])
            l += 1
            if l <= r {
                res.append(nums[r])
                r -= 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log n)$
- Space complexity: $O(n)$

---

## 2. Greedy (Space Optimized)

### Intuition

Instead of building a new array, we can rearrange in place. After sorting, if we swap every pair of adjacent elements at odd indices with their preceding element, we create a zigzag pattern. This ensures that each element at an odd index is a local maximum or minimum relative to its neighbors, which prevents any element from being the average of its neighbors.

### Algorithm

1. Sort the array in ascending order.
2. Iterate through the array starting at index 1, stepping by 2.
3. At each step, swap the element at index `i` with the element at index `i - 1`.
4. This creates pairs where the larger element comes before the smaller one in each pair.
5. Return the modified array.

::tabs-start

```python
class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        nums.sort()
        for i in range(1, len(nums), 2):
            nums[i], nums[i - 1] = nums[i - 1], nums[i]
        return nums
```

```java
public class Solution {
    public int[] rearrangeArray(int[] nums) {
        Arrays.sort(nums);
        for (int i = 1; i < nums.length; i += 2) {
            int temp = nums[i];
            nums[i] = nums[i - 1];
            nums[i - 1] = temp;
        }
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        for (int i = 1; i < nums.size(); i += 2) {
            swap(nums[i], nums[i - 1]);
        }
        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    rearrangeArray(nums) {
        nums.sort((a, b) => a - b);
        for (let i = 1; i < nums.length; i += 2) {
            [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
        }
        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] RearrangeArray(int[] nums) {
        Array.Sort(nums);
        for (int i = 1; i < nums.Length; i += 2) {
            int temp = nums[i];
            nums[i] = nums[i - 1];
            nums[i - 1] = temp;
        }
        return nums;
    }
}
```

```go
func rearrangeArray(nums []int) []int {
    sort.Ints(nums)
    for i := 1; i < len(nums); i += 2 {
        nums[i], nums[i-1] = nums[i-1], nums[i]
    }
    return nums
}
```

```kotlin
class Solution {
    fun rearrangeArray(nums: IntArray): IntArray {
        nums.sort()
        for (i in 1 until nums.size step 2) {
            val temp = nums[i]
            nums[i] = nums[i - 1]
            nums[i - 1] = temp
        }
        return nums
    }
}
```

```swift
class Solution {
    func rearrangeArray(_ nums: [Int]) -> [Int] {
        var nums = nums.sorted()
        for i in stride(from: 1, to: nums.count, by: 2) {
            nums.swapAt(i, i - 1)
        }
        return nums
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Greedy (Optimal) - I

### Intuition

We can fix violations as we find them without sorting first. If an element equals the average of its neighbors, swapping it with an adjacent element will break that relationship. By making one forward pass and one backward pass, we can fix all violations. The forward pass handles cases where swapping with the next element helps, and the backward pass catches any remaining issues.

### Algorithm

1. Make a forward pass from index `1` to `n-2`.
   - If the current element equals the average of its neighbors, swap it with the next element.
2. Make a backward pass from index `n-2` to `1`.
   - If the current element equals the average of its neighbors, swap it with the previous element.
3. Return the modified array.

::tabs-start

```python
class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        n = len(nums)

        for i in range(1, n - 1):
            if 2 * nums[i] == (nums[i - 1] + nums[i + 1]):
                nums[i], nums[i + 1] = nums[i + 1], nums[i]

        for i in range(n - 2, 0, -1):
            if 2 * nums[i] == (nums[i - 1] + nums[i + 1]):
                nums[i], nums[i - 1] = nums[i - 1], nums[i]

        return nums
```

```java
public class Solution {
    public int[] rearrangeArray(int[] nums) {
        int n = nums.length;

        for (int i = 1; i < n - 1; i++) {
            if (2 * nums[i] == (nums[i - 1] + nums[i + 1])) {
                int temp = nums[i];
                nums[i] = nums[i + 1];
                nums[i + 1] = temp;
            }
        }

        for (int i = n - 2; i > 0; i--) {
            if (2 * nums[i] == (nums[i - 1] + nums[i + 1])) {
                int temp = nums[i];
                nums[i] = nums[i - 1];
                nums[i - 1] = temp;
            }
        }

        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        int n = nums.size();

        for (int i = 1; i < n - 1; i++) {
            if (2 * nums[i] == (nums[i - 1] + nums[i + 1])) {
                swap(nums[i], nums[i + 1]);
            }
        }

        for (int i = n - 2; i > 0; i--) {
            if (2 * nums[i] == (nums[i - 1] + nums[i + 1])) {
                swap(nums[i], nums[i - 1]);
            }
        }

        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    rearrangeArray(nums) {
        const n = nums.length;

        for (let i = 1; i < n - 1; i++) {
            if (2 * nums[i] === nums[i - 1] + nums[i + 1]) {
                [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
            }
        }

        for (let i = n - 2; i > 0; i--) {
            if (2 * nums[i] === nums[i - 1] + nums[i + 1]) {
                [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
            }
        }

        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] RearrangeArray(int[] nums) {
        int n = nums.Length;

        for (int i = 1; i < n - 1; i++) {
            if (2 * nums[i] == (nums[i - 1] + nums[i + 1])) {
                int temp = nums[i];
                nums[i] = nums[i + 1];
                nums[i + 1] = temp;
            }
        }

        for (int i = n - 2; i > 0; i--) {
            if (2 * nums[i] == (nums[i - 1] + nums[i + 1])) {
                int temp = nums[i];
                nums[i] = nums[i - 1];
                nums[i - 1] = temp;
            }
        }

        return nums;
    }
}
```

```go
func rearrangeArray(nums []int) []int {
    n := len(nums)

    for i := 1; i < n-1; i++ {
        if 2*nums[i] == nums[i-1]+nums[i+1] {
            nums[i], nums[i+1] = nums[i+1], nums[i]
        }
    }

    for i := n - 2; i > 0; i-- {
        if 2*nums[i] == nums[i-1]+nums[i+1] {
            nums[i], nums[i-1] = nums[i-1], nums[i]
        }
    }

    return nums
}
```

```kotlin
class Solution {
    fun rearrangeArray(nums: IntArray): IntArray {
        val n = nums.size

        for (i in 1 until n - 1) {
            if (2 * nums[i] == nums[i - 1] + nums[i + 1]) {
                val temp = nums[i]
                nums[i] = nums[i + 1]
                nums[i + 1] = temp
            }
        }

        for (i in n - 2 downTo 1) {
            if (2 * nums[i] == nums[i - 1] + nums[i + 1]) {
                val temp = nums[i]
                nums[i] = nums[i - 1]
                nums[i - 1] = temp
            }
        }

        return nums
    }
}
```

```swift
class Solution {
    func rearrangeArray(_ nums: [Int]) -> [Int] {
        var nums = nums
        let n = nums.count

        for i in 1..<(n - 1) {
            if 2 * nums[i] == nums[i - 1] + nums[i + 1] {
                nums.swapAt(i, i + 1)
            }
        }

        for i in stride(from: n - 2, through: 1, by: -1) {
            if 2 * nums[i] == nums[i - 1] + nums[i + 1] {
                nums.swapAt(i, i - 1)
            }
        }

        return nums
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Greedy Optimal - II

### Intuition

A valid arrangement alternates between increasing and decreasing. We can enforce this pattern in a single pass by tracking whether the next step should increase or decrease. Starting from the relationship between the first two elements, we alternate the expected direction. If the actual relationship violates the expected direction, we swap to fix it.

### Algorithm

1. Determine the initial direction based on whether `nums[0] < nums[1]` (increasing) or not.
2. Iterate from index `1` to `n-2`.
3. If the direction is increasing and `nums[i] < nums[i+1]`, or if decreasing and `nums[i] > nums[i+1]`, swap `nums[i]` and `nums[i+1]`.
4. Toggle the direction after each step.
5. Return the modified array.

::tabs-start

```python
class Solution:
    def rearrangeArray(self, nums: List[int]) -> List[int]:
        increase = nums[0] < nums[1]
        for i in range(1, len(nums) - 1):
            if ((increase and nums[i] < nums[i + 1]) or
                (not increase and nums[i] > nums[i + 1])
            ):
                nums[i], nums[i + 1] = nums[i + 1], nums[i]
            increase = not increase
        return nums
```

```java
public class Solution {
    public int[] rearrangeArray(int[] nums) {
        boolean increase = nums[0] < nums[1];
        for (int i = 1; i < nums.length - 1; i++) {
            if ((increase && nums[i] < nums[i + 1]) ||
                (!increase && nums[i] > nums[i + 1])) {
                int temp = nums[i];
                nums[i] = nums[i + 1];
                nums[i + 1] = temp;
            }
            increase = !increase;
        }
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        bool increase = nums[0] < nums[1];
        for (int i = 1; i < nums.size() - 1; i++) {
            if ((increase && nums[i] < nums[i + 1]) ||
                (!increase && nums[i] > nums[i + 1])) {
                swap(nums[i], nums[i + 1]);
            }
            increase = !increase;
        }
        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    rearrangeArray(nums) {
        let increase = nums[0] < nums[1];
        for (let i = 1; i < nums.length - 1; i++) {
            if (
                (increase && nums[i] < nums[i + 1]) ||
                (!increase && nums[i] > nums[i + 1])
            ) {
                [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
            }
            increase = !increase;
        }
        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] RearrangeArray(int[] nums) {
        bool increase = nums[0] < nums[1];
        for (int i = 1; i < nums.Length - 1; i++) {
            if ((increase && nums[i] < nums[i + 1]) ||
                (!increase && nums[i] > nums[i + 1])) {
                int temp = nums[i];
                nums[i] = nums[i + 1];
                nums[i + 1] = temp;
            }
            increase = !increase;
        }
        return nums;
    }
}
```

```go
func rearrangeArray(nums []int) []int {
    increase := nums[0] < nums[1]
    for i := 1; i < len(nums)-1; i++ {
        if (increase && nums[i] < nums[i+1]) ||
            (!increase && nums[i] > nums[i+1]) {
            nums[i], nums[i+1] = nums[i+1], nums[i]
        }
        increase = !increase
    }
    return nums
}
```

```kotlin
class Solution {
    fun rearrangeArray(nums: IntArray): IntArray {
        var increase = nums[0] < nums[1]
        for (i in 1 until nums.size - 1) {
            if ((increase && nums[i] < nums[i + 1]) ||
                (!increase && nums[i] > nums[i + 1])) {
                val temp = nums[i]
                nums[i] = nums[i + 1]
                nums[i + 1] = temp
            }
            increase = !increase
        }
        return nums
    }
}
```

```swift
class Solution {
    func rearrangeArray(_ nums: [Int]) -> [Int] {
        var nums = nums
        var increase = nums[0] < nums[1]
        for i in 1..<(nums.count - 1) {
            if (increase && nums[i] < nums[i + 1]) ||
               (!increase && nums[i] > nums[i + 1]) {
                nums.swapAt(i, i + 1)
            }
            increase = !increase
        }
        return nums
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Checking Only One Direction After Swapping
When fixing a violation by swapping, the swap might create a new violation at the previous position. A single forward pass may not catch all cases, which is why some solutions use both forward and backward passes.
```python
# Wrong: only forward pass may leave violations
for i in range(1, n - 1):
    if 2 * nums[i] == nums[i-1] + nums[i+1]:
        nums[i], nums[i+1] = nums[i+1], nums[i]
# A backward pass is also needed
```

### Using Division for Average Check
Using division to check if an element equals the average of its neighbors can introduce floating-point precision issues. Instead, multiply both sides by 2 to avoid division entirely.
```python
# Wrong: floating-point comparison
if nums[i] == (nums[i-1] + nums[i+1]) / 2:

# Correct: integer comparison
if 2 * nums[i] == nums[i-1] + nums[i+1]:
```

### Forgetting to Handle Array Boundaries
The check only applies to elements with both neighbors (indices 1 through n-2). Applying the average check to the first or last element causes index out of bounds errors.
```python
# Wrong: starts at index 0
for i in range(len(nums) - 1):
    if 2 * nums[i] == nums[i-1] + nums[i+1]:  # i=0 causes nums[-1] access
```
