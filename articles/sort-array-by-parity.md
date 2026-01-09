## 1. Sorting

### Intuition

We want all even numbers before odd numbers. By treating the parity (even/odd) as a sort key, we can leverage a built-in sort. Even numbers have parity 0, odd numbers have parity 1, so sorting by parity naturally places evens first.

### Algorithm

1. Sort the array using a custom comparator based on `num & 1` (or `num % 2`).
2. Elements with result `0` (even) come before elements with result `1` (odd).
3. Return the sorted array.

::tabs-start

```python
class Solution:
    def sortArrayByParity(self, nums: List[int]) -> List[int]:
        nums.sort(key = lambda x: x & 1)
        return nums
```

```java
public class Solution {
    public int[] sortArrayByParity(int[] nums) {
        Integer[] A = Arrays.stream(nums).boxed().toArray(Integer[]::new);
        Arrays.sort(A, (a, b) -> (a & 1) - (b & 1));
        return Arrays.stream(A).mapToInt(Integer::intValue).toArray();
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortArrayByParity(vector<int>& nums) {
        sort(nums.begin(), nums.end(), [&](int& a, int& b) {
            return (a & 1) < (b & 1);
        });
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
    sortArrayByParity(nums) {
        return nums.sort((a, b) => (a & 1) - (b & 1));
    }
}
```

```csharp
public class Solution {
    public int[] SortArrayByParity(int[] nums) {
        Array.Sort(nums, (a, b) => (a & 1).CompareTo(b & 1));
        return nums;
    }
}
```

```go
func sortArrayByParity(nums []int) []int {
    sort.Slice(nums, func(i, j int) bool {
        return (nums[i] & 1) < (nums[j] & 1)
    })
    return nums
}
```

```kotlin
class Solution {
    fun sortArrayByParity(nums: IntArray): IntArray {
        return nums.sortedBy { it and 1 }.toIntArray()
    }
}
```

```swift
class Solution {
    func sortArrayByParity(_ nums: [Int]) -> [Int] {
        return nums.sorted { ($0 & 1) < ($1 & 1) }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Array

### Intuition

Instead of sorting, we can separate elements into two groups in a single pass. Collect all even numbers in one list and all odd numbers in another, then concatenate them. This avoids the overhead of comparison-based sorting.

### Algorithm

1. Create two lists: one for even numbers, one for odd numbers.
2. Iterate through the array and add each element to the appropriate list based on its parity.
3. Concatenate the even list followed by the odd list.
4. Copy the result back into the original array (or return the concatenated result).

::tabs-start

```python
class Solution:
    def sortArrayByParity(self, nums: List[int]) -> List[int]:
        even, odd = [], []
        for num in nums:
            if num & 1:
                odd.append(num)
            else:
                even.append(num)

        idx = 0
        for e in even:
            nums[idx] = e
            idx += 1
        for o in odd:
            nums[idx] = o
            idx += 1
        return nums
```

```java
public class Solution {
    public int[] sortArrayByParity(int[] nums) {
        List<Integer> even = new ArrayList<>();
        List<Integer> odd = new ArrayList<>();

        for (int num : nums) {
            if ((num & 1) == 1) {
                odd.add(num);
            } else {
                even.add(num);
            }
        }

        int idx = 0;
        for (int e : even) {
            nums[idx++] = e;
        }
        for (int o : odd) {
            nums[idx++] = o;
        }

        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortArrayByParity(vector<int>& nums) {
        vector<int> even, odd;

        for (int& num : nums) {
            if (num & 1) {
                odd.push_back(num);
            } else {
                even.push_back(num);
            }
        }

        int idx = 0;
        for (int& e : even) {
            nums[idx++] = e;
        }
        for (int& o : odd) {
            nums[idx++] = o;
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
    sortArrayByParity(nums) {
        const even = [];
        const odd = [];

        for (let num of nums) {
            if (num % 2) {
                odd.push(num);
            } else {
                even.push(num);
            }
        }

        let idx = 0;
        for (let e of even) {
            nums[idx++] = e;
        }
        for (let o of odd) {
            nums[idx++] = o;
        }

        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] SortArrayByParity(int[] nums) {
        List<int> even = new List<int>();
        List<int> odd = new List<int>();

        foreach (int num in nums) {
            if ((num & 1) == 1) {
                odd.Add(num);
            } else {
                even.Add(num);
            }
        }

        int idx = 0;
        foreach (int e in even) {
            nums[idx++] = e;
        }
        foreach (int o in odd) {
            nums[idx++] = o;
        }

        return nums;
    }
}
```

```go
func sortArrayByParity(nums []int) []int {
    even := []int{}
    odd := []int{}

    for _, num := range nums {
        if num & 1 == 1 {
            odd = append(odd, num)
        } else {
            even = append(even, num)
        }
    }

    idx := 0
    for _, e := range even {
        nums[idx] = e
        idx++
    }
    for _, o := range odd {
        nums[idx] = o
        idx++
    }

    return nums
}
```

```kotlin
class Solution {
    fun sortArrayByParity(nums: IntArray): IntArray {
        val even = mutableListOf<Int>()
        val odd = mutableListOf<Int>()

        for (num in nums) {
            if (num and 1 == 1) {
                odd.add(num)
            } else {
                even.add(num)
            }
        }

        var idx = 0
        for (e in even) {
            nums[idx++] = e
        }
        for (o in odd) {
            nums[idx++] = o
        }

        return nums
    }
}
```

```swift
class Solution {
    func sortArrayByParity(_ nums: [Int]) -> [Int] {
        var even = [Int]()
        var odd = [Int]()

        for num in nums {
            if num & 1 == 1 {
                odd.append(num)
            } else {
                even.append(num)
            }
        }

        var result = [Int]()
        result.append(contentsOf: even)
        result.append(contentsOf: odd)

        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Two Pointers - I

### Intuition

We can partition the array in-place using two pointers at opposite ends. The left pointer finds odd numbers that need to move right, and the right pointer marks where odd numbers should go. When we find an odd number on the left, we swap it with whatever is on the right, effectively pushing odd numbers to the end.

### Algorithm

1. Initialize two pointers: `i` at the start, `j` at the end.
2. While `i < j`:
   - If `nums[i]` is odd, swap it with `nums[j]` and decrement `j`.
   - Otherwise, increment `i` (the element is even and already in place).
3. Return the modified array.

::tabs-start

```python
class Solution:
    def sortArrayByParity(self, nums: List[int]) -> List[int]:
        i, j = 0, len(nums) - 1
        while i < j:
            if nums[i] & 1:
                nums[i], nums[j] = nums[j], nums[i]
                j -= 1
            else:
                i += 1
        return nums
```

```java
public class Solution {
    public int[] sortArrayByParity(int[] nums) {
        int i = 0, j = nums.length - 1;
        while (i < j) {
            if ((nums[i] & 1) == 1) {
                int temp = nums[i];
                nums[i] = nums[j];
                nums[j--] = temp;
            } else {
                i++;
            }
        }
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortArrayByParity(vector<int>& nums) {
        int i = 0, j = nums.size() - 1;
        while (i < j) {
            if ((nums[i] & 1) == 1) {
                swap(nums[i], nums[j]);
                j--;
            } else {
                i++;
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
    sortArrayByParity(nums) {
        let i = 0,
            j = nums.length - 1;
        while (i < j) {
            if ((nums[i] & 1) == 1) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                j--;
            } else {
                i++;
            }
        }
        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] SortArrayByParity(int[] nums) {
        int i = 0, j = nums.Length - 1;
        while (i < j) {
            if ((nums[i] & 1) == 1) {
                int temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
                j--;
            } else {
                i++;
            }
        }
        return nums;
    }
}
```

```go
func sortArrayByParity(nums []int) []int {
    i, j := 0, len(nums) - 1
    for i < j {
        if nums[i] & 1 == 1 {
            nums[i], nums[j] = nums[j], nums[i]
            j--
        } else {
            i++
        }
    }
    return nums
}
```

```kotlin
class Solution {
    fun sortArrayByParity(nums: IntArray): IntArray {
        var i = 0
        var j = nums.size - 1
        while (i < j) {
            if (nums[i] and 1 == 1) {
                nums[i] = nums[j].also { nums[j] = nums[i] }
                j--
            } else {
                i++
            }
        }
        return nums
    }
}
```

```swift
class Solution {
    func sortArrayByParity(_ nums: [Int]) -> [Int] {
        var nums = nums
        var i = 0, j = nums.count - 1
        while i < j {
            if nums[i] & 1 == 1 {
                nums.swapAt(i, j)
                j -= 1
            } else {
                i += 1
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

## 4. Two Pointers - II

### Intuition

This approach uses a slow and fast pointer moving in the same direction. The slow pointer `l` tracks where the next even number should be placed. The fast pointer `r` scans through the array. Whenever we find an even number, we swap it to position `l` and advance `l`. This collects all even numbers at the front.

### Algorithm

1. Initialize a slow pointer `l` at `0`.
2. Iterate through the array with a fast pointer `r`:
   - If `nums[r]` is even, swap `nums[l]` with `nums[r]` and increment `l`.
3. Return the modified array.

::tabs-start

```python
class Solution:
    def sortArrayByParity(self, nums: List[int]) -> List[int]:
        l = 0
        for r in range(len(nums)):
            if nums[r] % 2 == 0:
                nums[l], nums[r] = nums[r], nums[l]
                l += 1
        return nums
```

```java
public class Solution {
    public int[] sortArrayByParity(int[] nums) {
        for (int l = 0, r = 0; r < nums.length; r++) {
            if (nums[r] % 2 == 0) {
                int temp = nums[l];
                nums[l] = nums[r];
                nums[r] = temp;
                l++;
            }
        }
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> sortArrayByParity(vector<int>& nums) {
        for (int l = 0, r = 0; r < nums.size(); r++) {
            if (nums[r] % 2 == 0) {
                swap(nums[l], nums[r]);
                l++;
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
    sortArrayByParity(nums) {
        for (let l = 0, r = 0; r < nums.length; r++) {
            if (nums[r] % 2 == 0) {
                [nums[l], nums[r]] = [nums[r], nums[l]];
                l++;
            }
        }
        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] SortArrayByParity(int[] nums) {
        int l = 0;
        for (int r = 0; r < nums.Length; r++) {
            if (nums[r] % 2 == 0) {
                int temp = nums[l];
                nums[l] = nums[r];
                nums[r] = temp;
                l++;
            }
        }
        return nums;
    }
}
```

```go
func sortArrayByParity(nums []int) []int {
    l := 0
    for r := 0; r < len(nums); r++ {
        if nums[r] % 2 == 0 {
            nums[l], nums[r] = nums[r], nums[l]
            l++
        }
    }
    return nums
}
```

```kotlin
class Solution {
    fun sortArrayByParity(nums: IntArray): IntArray {
        var l = 0
        for (r in nums.indices) {
            if (nums[r] % 2 == 0) {
                nums[l] = nums[r].also { nums[r] = nums[l] }
                l++
            }
        }
        return nums
    }
}
```

```swift
class Solution {
    func sortArrayByParity(_ nums: [Int]) -> [Int] {
        var nums = nums
        var l = 0
        for r in 0..<nums.count {
            if nums[r] % 2 == 0 {
                nums.swapAt(l, r)
                l += 1
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
