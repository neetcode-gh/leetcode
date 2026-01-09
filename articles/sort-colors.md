## 1. Brute Force

### Intuition

The simplest approach is to use a standard sorting algorithm. Since the array only contains values 0, 1, and 2, sorting will naturally arrange them in the required order. While this works, it does not take advantage of the limited value range.

### Algorithm

1. Use the built-in sort function to sort the array in ascending order.
2. The array is now sorted with all 0s first, then 1s, then 2s.

::tabs-start

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        nums.sort()
```

```java
public class Solution {
    public void sortColors(int[] nums) {
        Arrays.sort(nums);
    }
}
```

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        sort(nums.begin(), nums.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    sortColors(nums) {
        nums.sort((a, b) => a - b);
    }
}
```

```csharp
public class Solution {
    public void SortColors(int[] nums) {
        Array.Sort(nums);
    }
}
```

```go
func sortColors(nums []int) {
    sort.Ints(nums)
}
```

```kotlin
class Solution {
    fun sortColors(nums: IntArray) {
        nums.sort()
    }
}
```

```swift
class Solution {
    func sortColors(_ nums: inout [Int]) {
        nums.sort()
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Counting Sort

### Intuition

Since there are only three possible values (0, 1, 2), we can count how many times each appears in a single pass. Then we overwrite the array in a second pass, placing the correct number of 0s, followed by 1s, followed by 2s. This is a classic application of counting sort.

### Algorithm

1. Count the occurrences of `0`, `1`, and `2` in the array.
2. Overwrite the array:
   - Fill the first `count[0]` positions with `0`.
   - Fill the next `count[1]` positions with `1`.
   - Fill the remaining `count[2]` positions with `2`.

::tabs-start

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        count = [0] * 3
        for num in nums:
            count[num] += 1

        index = 0
        for i in range(3):
            while count[i]:
                count[i] -= 1
                nums[index] = i
                index += 1
```

```java
public class Solution {
    public void sortColors(int[] nums) {
        int[] count = new int[3];
        for (int num : nums) {
            count[num]++;
        }

        int index = 0;
        for (int i = 0; i < 3; i++) {
            while (count[i]-- > 0) {
                nums[index++] = i;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        vector<int> count(3);
        for (int& num : nums) {
            count[num]++;
        }

        int index = 0;
        for (int i = 0; i < 3; i++) {
            while (count[i]-- > 0) {
                nums[index++] = i;
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    sortColors(nums) {
        const count = new Int32Array(3);
        for (let num of nums) {
            count[num]++;
        }

        let index = 0;
        for (let i = 0; i < 3; i++) {
            while (count[i]-- > 0) {
                nums[index++] = i;
            }
        }
    }
}
```

```csharp
public class Solution {
    public void SortColors(int[] nums) {
        int[] count = new int[3];
        foreach (int num in nums) {
            count[num]++;
        }

        int index = 0;
        for (int i = 0; i < 3; i++) {
            while (count[i]-- > 0) {
                nums[index++] = i;
            }
        }
    }
}
```

```go
func sortColors(nums []int) {
    count := make([]int, 3)
    for _, num := range nums {
        count[num]++
    }

    index := 0
    for i := 0; i < 3; i++ {
        for count[i] > 0 {
            count[i]--
            nums[index] = i
            index++
        }
    }
}
```

```kotlin
class Solution {
    fun sortColors(nums: IntArray) {
        val count = IntArray(3)
        for (num in nums) {
            count[num]++
        }

        var index = 0
        for (i in 0 until 3) {
            while (count[i]-- > 0) {
                nums[index++] = i
            }
        }
    }
}
```

```swift
class Solution {
    func sortColors(_ nums: inout [Int]) {
        var count = [Int](repeating: 0, count: 3)
        for num in nums {
            count[num] += 1
        }

        var index = 0
        for i in 0..<3 {
            while count[i] > 0 {
                count[i] -= 1
                nums[index] = i
                index += 1
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Three Pointers - I

### Intuition

The Dutch National Flag algorithm partitions the array into three sections in a single pass. We maintain pointers for the boundary of 0s (left), the boundary of 2s (right), and the current element being examined. When we see a 0, we swap it to the left section. When we see a 2, we swap it to the right section. 1s naturally end up in the middle.

### Algorithm

1. Initialize three pointers: `l` (boundary for `0`s), `i` (current element), and `r` (boundary for `2`s).
2. While `i <= r`:
   - If `nums[i]` is `0`, swap with `nums[l]`, increment both `l` and `i`.
   - If `nums[i]` is `2`, swap with `nums[r]`, decrement `r` (do not increment `i` since the swapped element needs to be checked).
   - If `nums[i]` is `1`, just increment `i`.

::tabs-start

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        l, r = 0, len(nums) - 1
        i = 0

        def swap(i, j):
            temp = nums[i]
            nums[i] = nums[j]
            nums[j] = temp

        while i <= r:
            if nums[i] == 0:
                swap(l, i)
                l += 1
            elif nums[i] == 2:
                swap(i, r)
                r -= 1
                i -= 1
            i += 1
```

```java
public class Solution {
    public void sortColors(int[] nums) {
        int i = 0, l = 0, r = nums.length - 1;
        while (i <= r) {
            if (nums[i] == 0) {
                swap(nums, l, i);
                l++;
            } else if (nums[i] == 2) {
                swap(nums, i, r);
                r--;
                i--;
            }
            i++;
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int i = 0, l = 0, r = nums.size() - 1;
        while (i <= r) {
            if (nums[i] == 0) {
                swap(nums[l], nums[i]);
                l++;
            } else if (nums[i] == 2) {
                swap(nums[i], nums[r]);
                r--;
                i--;
            }
            i++;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    sortColors(nums) {
        let i = 0,
            l = 0,
            r = nums.length - 1;
        while (i <= r) {
            if (nums[i] == 0) {
                [nums[l], nums[i]] = [nums[i], nums[l]];
                l++;
            } else if (nums[i] == 2) {
                [nums[i], nums[r]] = [nums[r], nums[i]];
                r--;
                i--;
            }
            i++;
        }
    }
}
```

```csharp
public class Solution {
    public void SortColors(int[] nums) {
        int i = 0, l = 0, r = nums.Length - 1;

        while (i <= r) {
            if (nums[i] == 0) {
                Swap(nums, l, i);
                l++;
            } else if (nums[i] == 2) {
                Swap(nums, i, r);
                r--;
                i--;
            }
            i++;
        }
    }

    private void Swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

```go
func sortColors(nums []int) {
    i, l, r := 0, 0, len(nums) - 1
    for i <= r {
        if nums[i] == 0 {
            nums[l], nums[i] = nums[i], nums[l]
            l++
        } else if nums[i] == 2 {
            nums[i], nums[r] = nums[r], nums[i]
            r--
            i--
        }
        i++
    }
}
```

```kotlin
class Solution {
    fun sortColors(nums: IntArray) {
        var i = 0
        var l = 0
        var r = nums.size - 1
        while (i <= r) {
            if (nums[i] == 0) {
                nums[l] = nums[i].also { nums[i] = nums[l] }
                l++
            } else if (nums[i] == 2) {
                nums[i] = nums[r].also { nums[r] = nums[i] }
                r--
                i--
            }
            i++
        }
    }
}
```

```swift
class Solution {
    func sortColors(_ nums: inout [Int]) {
        var i = 0, l = 0, r = nums.count - 1
        while i <= r {
            if nums[i] == 0 {
                nums.swapAt(l, i)
                l += 1
            } else if nums[i] == 2 {
                nums.swapAt(i, r)
                r -= 1
                i -= 1
            }
            i += 1
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Three Pointers - II

### Intuition

This approach uses insertion boundaries for each color. We track where the next 0, 1, and 2 should be placed. When we encounter a value, we shift the boundaries by overwriting in a cascading manner. For example, when we see a 0, we write 2 at position `two`, then 1 at position `one`, then 0 at position `zero`, and advance all three boundaries.

### Algorithm

1. Initialize three pointers `zero`, `one`, and `two`, all starting at `0`.
2. For each element in the array:
   - If it is `0`: write `2` at `two`, write `1` at `one`, write `0` at `zero`, then increment all three pointers.
   - If it is `1`: write `2` at `two`, write `1` at `one`, then increment `two` and `one`.
   - If it is `2`: write `2` at `two`, then increment `two`.

::tabs-start

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        zero = one = two = 0
        for i in range(len(nums)):
            if nums[i] == 0:
                nums[two] = 2
                nums[one] = 1
                nums[zero] = 0
                two += 1
                one += 1
                zero += 1
            elif nums[i] == 1:
                nums[two] = 2
                nums[one] = 1
                two += 1
                one += 1
            else:
                nums[two] = 2
                two += 1
```

```java
public class Solution {
    public void sortColors(int[] nums) {
        int zero = 0, one = 0, two = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 0) {
                nums[two++] = 2;
                nums[one++] = 1;
                nums[zero++] = 0;
            } else if (nums[i] == 1) {
                nums[two++] = 2;
                nums[one++] = 1;
            } else {
                nums[two++] = 2;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int zero = 0, one = 0, two = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == 0) {
                nums[two++] = 2;
                nums[one++] = 1;
                nums[zero++] = 0;
            } else if (nums[i] == 1) {
                nums[two++] = 2;
                nums[one++] = 1;
            } else {
                nums[two++] = 2;
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    sortColors(nums) {
        let zero = 0,
            one = 0,
            two = 0;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] == 0) {
                nums[two++] = 2;
                nums[one++] = 1;
                nums[zero++] = 0;
            } else if (nums[i] == 1) {
                nums[two++] = 2;
                nums[one++] = 1;
            } else {
                nums[two++] = 2;
            }
        }
    }
}
```

```csharp
public class Solution {
    public void SortColors(int[] nums) {
        int zero = 0, one = 0, two = 0;

        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] == 0) {
                nums[two++] = 2;
                nums[one++] = 1;
                nums[zero++] = 0;
            } else if (nums[i] == 1) {
                nums[two++] = 2;
                nums[one++] = 1;
            } else {
                nums[two++] = 2;
            }
        }
    }
}
```

```go
func sortColors(nums []int) {
    zero, one, two := 0, 0, 0
    for i := 0; i < len(nums); i++ {
        if nums[i] == 0 {
            nums[two] = 2
            two++
            nums[one] = 1
            one++
            nums[zero] = 0
            zero++
        } else if nums[i] == 1 {
            nums[two] = 2
            two++
            nums[one] = 1
            one++
        } else {
            nums[two] = 2
            two++
        }
    }
}
```

```kotlin
class Solution {
    fun sortColors(nums: IntArray) {
        var zero = 0
        var one = 0
        var two = 0
        for (i in nums.indices) {
            if (nums[i] == 0) {
                nums[two++] = 2
                nums[one++] = 1
                nums[zero++] = 0
            } else if (nums[i] == 1) {
                nums[two++] = 2
                nums[one++] = 1
            } else {
                nums[two++] = 2
            }
        }
    }
}
```

```swift
class Solution {
    func sortColors(_ nums: inout [Int]) {
        var zero = 0, one = 0, two = 0
        for i in 0..<nums.count {
            if nums[i] == 0 {
                nums[two] = 2
                two += 1
                nums[one] = 1
                one += 1
                nums[zero] = 0
                zero += 1
            } else if nums[i] == 1 {
                nums[two] = 2
                two += 1
                nums[one] = 1
                one += 1
            } else {
                nums[two] = 2
                two += 1
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 5. Three Pointers - III

### Intuition

This is a streamlined version of the previous approach. We iterate with pointer `two` and always write 2 at the current position. If the original value was less than 2, we also write 1 at position `one`. If it was less than 1 (i.e., 0), we also write 0 at position `zero`. This cascading write pattern ensures correct placement.

### Algorithm

1. Initialize pointers `zero` and `one` at `0`.
2. Iterate through the array with pointer `two`:
   - Save the current value, then set `nums[two] = 2`.
   - If the saved value was less than `2`, set `nums[one] = 1` and increment `one`.
   - If the saved value was less than `1`, set `nums[zero] = 0` and increment `zero`.

::tabs-start

```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        zero = one = 0
        for two in range(len(nums)):
            tmp = nums[two]
            nums[two] = 2
            if tmp < 2:
                nums[one] = 1
                one += 1
            if tmp < 1:
                nums[zero] = 0
                zero += 1
```

```java
public class Solution {
    public void sortColors(int[] nums) {
        int zero = 0, one = 0;
        for (int two = 0; two < nums.length; two++) {
            int tmp = nums[two];
            nums[two] = 2;
            if (tmp < 2) {
                nums[one++] = 1;
            }
            if (tmp < 1) {
                nums[zero++] = 0;
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int zero = 0, one = 0;
        for (int two = 0; two < nums.size(); two++) {
            int tmp = nums[two];
            nums[two] = 2;
            if (tmp < 2) {
                nums[one++] = 1;
            }
            if (tmp < 1) {
                nums[zero++] = 0;
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    sortColors(nums) {
        let zero = 0,
            one = 0;
        for (let two = 0; two < nums.length; two++) {
            let tmp = nums[two];
            nums[two] = 2;
            if (tmp < 2) {
                nums[one++] = 1;
            }
            if (tmp < 1) {
                nums[zero++] = 0;
            }
        }
    }
}
```

```csharp
public class Solution {
    public void SortColors(int[] nums) {
        int zero = 0, one = 0;

        for (int two = 0; two < nums.Length; two++) {
            int tmp = nums[two];
            nums[two] = 2;

            if (tmp < 2) {
                nums[one++] = 1;
            }
            if (tmp < 1) {
                nums[zero++] = 0;
            }
        }
    }
}
```

```go
func sortColors(nums []int) {
    zero, one := 0, 0
    for two := 0; two < len(nums); two++ {
        tmp := nums[two]
        nums[two] = 2
        if tmp < 2 {
            nums[one] = 1
            one++
        }
        if tmp < 1 {
            nums[zero] = 0
            zero++
        }
    }
}
```

```kotlin
class Solution {
    fun sortColors(nums: IntArray) {
        var zero = 0
        var one = 0
        for (two in nums.indices) {
            val tmp = nums[two]
            nums[two] = 2
            if (tmp < 2) {
                nums[one++] = 1
            }
            if (tmp < 1) {
                nums[zero++] = 0
            }
        }
    }
}
```

```swift
class Solution {
    func sortColors(_ nums: inout [Int]) {
        var zero = 0, one = 0
        for two in 0..<nums.count {
            let tmp = nums[two]
            nums[two] = 2
            if tmp < 2 {
                nums[one] = 1
                one += 1
            }
            if tmp < 1 {
                nums[zero] = 0
                zero += 1
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
