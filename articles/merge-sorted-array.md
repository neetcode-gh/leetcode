## 1. Sorting

### Intuition

The simplest approach is to copy all elements from `nums2` into the empty slots at the end of `nums1`, then sort the entire array. Since `nums1` has enough space allocated for both arrays, we can place `nums2`'s elements starting at index `m`. After sorting, the merged result is in sorted order.

### Algorithm

1. Copy all `n` elements from `nums2` into `nums1` starting at index `m`.
2. Sort `nums1` in place.

::tabs-start

```python
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        nums1[m:] = nums2[:n]
        nums1.sort()
```

```java
public class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        for (int i = 0; i < n; i++) {
            nums1[i + m] = nums2[i];
        }
        Arrays.sort(nums1);
    }
}
```

```cpp
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        for (int i = 0; i < n; i++) {
            nums1[i + m] = nums2[i];
        }
        sort(nums1.begin(), nums1.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number} m
     * @param {number[]} nums2
     * @param {number} n
     * @return {void} Do not return anything, modify nums1 in-place instead.
     */
    merge(nums1, m, nums2, n) {
        for (let i = 0; i < n; i++) {
            nums1[i + m] = nums2[i];
        }
        nums1.sort((a, b) => a - b);
    }
}
```

```csharp
public class Solution {
    public void Merge(int[] nums1, int m, int[] nums2, int n) {
        for (int i = 0; i < n; i++) {
            nums1[i + m] = nums2[i];
        }
        Array.Sort(nums1);
    }
}
```

```go
func merge(nums1 []int, m int, nums2 []int, n int) {
    for i := 0; i < n; i++ {
        nums1[i+m] = nums2[i]
    }
    sort.Ints(nums1)
}
```

```kotlin
class Solution {
    fun merge(nums1: IntArray, m: Int, nums2: IntArray, n: Int) {
        for (i in 0 until n) {
            nums1[i + m] = nums2[i]
        }
        nums1.sort()
    }
}
```

```swift
class Solution {
    func merge(_ nums1: inout [Int], _ m: Int, _ nums2: [Int], _ n: Int) {
        for i in 0..<n {
            nums1[i + m] = nums2[i]
        }
        nums1.sort()
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((m + n) \log (m + n))$
- Space complexity: $O(1)$ or $O(m + n)$ depending on the sorting algorithm.

> Where $m$ and $n$ represent the number of elements in the arrays $nums1$ and $nums2$, respectively.

---

## 2. Three Pointers With Extra Space

### Intuition

Since both arrays are already sorted, we can merge them in linear time using the standard merge technique from merge sort. However, if we write directly into `nums1` from the front, we risk overwriting elements we still need. To avoid this, we first copy the original elements of `nums1` to a temporary array, then merge from both sources into `nums1`.

### Algorithm

1. Create a copy of the first `m` elements of `nums1`.
2. Use three pointers: `i` for the copy of `nums1`, `j` for `nums2`, and `idx` for the write position in `nums1`.
3. Compare elements from both sources and write the smaller one to `nums1[idx]`.
4. Increment the corresponding pointer and `idx`.
5. Continue until all elements from both sources are placed.

::tabs-start

```python
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        nums1_copy = nums1[:m]
        idx = 0
        i = j = 0
        while idx < m + n:
            if j >= n or (i < m and nums1_copy[i] <= nums2[j]):
                nums1[idx] = nums1_copy[i]
                i += 1
            else:
                nums1[idx] = nums2[j]
                j += 1
            idx += 1
```

```java
public class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int[] nums1Copy = Arrays.copyOf(nums1, m);
        int idx = 0, i = 0, j = 0;

        while (idx < m + n) {
            if (j >= n || (i < m && nums1Copy[i] <= nums2[j])) {
                nums1[idx++] = nums1Copy[i++];
            } else {
                nums1[idx++] = nums2[j++];
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        vector<int> nums1Copy(nums1.begin(), nums1.begin() + m);
        int idx = 0, i = 0, j = 0;

        while (idx < m + n) {
            if (j >= n || (i < m && nums1Copy[i] <= nums2[j])) {
                nums1[idx++] = nums1Copy[i++];
            } else {
                nums1[idx++] = nums2[j++];
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number} m
     * @param {number[]} nums2
     * @param {number} n
     * @return {void} Do not return anything, modify nums1 in-place instead.
     */
    merge(nums1, m, nums2, n) {
        const nums1Copy = nums1.slice(0, m);
        let idx = 0,
            i = 0,
            j = 0;

        while (idx < m + n) {
            if (j >= n || (i < m && nums1Copy[i] <= nums2[j])) {
                nums1[idx++] = nums1Copy[i++];
            } else {
                nums1[idx++] = nums2[j++];
            }
        }
    }
}
```

```csharp
public class Solution {
    public void Merge(int[] nums1, int m, int[] nums2, int n) {
        int[] nums1Copy = new int[m];
        Array.Copy(nums1, nums1Copy, m);

        int idx = 0, i = 0, j = 0;

        while (idx < m + n) {
            if (j >= n || (i < m && nums1Copy[i] <= nums2[j])) {
                nums1[idx++] = nums1Copy[i++];
            } else {
                nums1[idx++] = nums2[j++];
            }
        }
    }
}
```

```go
func merge(nums1 []int, m int, nums2 []int, n int) {
    nums1Copy := make([]int, m)
    copy(nums1Copy, nums1[:m])

    idx, i, j := 0, 0, 0
    for idx < m+n {
        if j >= n || (i < m && nums1Copy[i] <= nums2[j]) {
            nums1[idx] = nums1Copy[i]
            i++
        } else {
            nums1[idx] = nums2[j]
            j++
        }
        idx++
    }
}
```

```kotlin
class Solution {
    fun merge(nums1: IntArray, m: Int, nums2: IntArray, n: Int) {
        val nums1Copy = nums1.copyOfRange(0, m)

        var idx = 0
        var i = 0
        var j = 0

        while (idx < m + n) {
            if (j >= n || (i < m && nums1Copy[i] <= nums2[j])) {
                nums1[idx++] = nums1Copy[i++]
            } else {
                nums1[idx++] = nums2[j++]
            }
        }
    }
}
```

```swift
class Solution {
    func merge(_ nums1: inout [Int], _ m: Int, _ nums2: [Int], _ n: Int) {
        let nums1Copy = Array(nums1[0..<m])

        var idx = 0, i = 0, j = 0

        while idx < m + n {
            if j >= n || (i < m && nums1Copy[i] <= nums2[j]) {
                nums1[idx] = nums1Copy[i]
                i += 1
            } else {
                nums1[idx] = nums2[j]
                j += 1
            }
            idx += 1
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(m)$

> Where $m$ and $n$ represent the number of elements in the arrays $nums1$ and $nums2$, respectively.

---

## 3. Three Pointers Without Extra Space - I

### Intuition

The key insight is that `nums1` has empty space at the end. If we fill from the back instead of the front, we never overwrite elements we still need. By comparing the largest remaining elements from both arrays and placing the larger one at the current end position, we can merge in place without extra space.

### Algorithm

1. Initialize `last` to `m + n - 1` (the last index of `nums1`).
2. While both `m > 0` and `n > 0`:
   - Compare `nums1[m - 1]` and `nums2[n - 1]`.
   - Place the larger value at `nums1[last]` and decrement the corresponding pointer.
   - Decrement `last`.
3. If any elements remain in `nums2`, copy them to `nums1`.

::tabs-start

```python
class Solution:
    def merge(self, nums1: list[int], m: int, nums2: list[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        last = m + n - 1

        # Merge in reverse order
        while m > 0 and n > 0:
            if nums1[m - 1] > nums2[n - 1]:
                nums1[last] = nums1[m - 1]
                m -= 1
            else:
                nums1[last] = nums2[n - 1]
                n -= 1
            last -= 1

        # Fill nums1 with leftover nums2 elements
        while n > 0:
            nums1[last] = nums2[n - 1]
            n -= 1
            last -= 1
```

```java
public class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int last = m + n - 1;

        // Merge in reverse order
        while (m > 0 && n > 0) {
            if (nums1[m - 1] > nums2[n - 1]) {
                nums1[last] = nums1[m - 1];
                m--;
            } else {
                nums1[last] = nums2[n - 1];
                n--;
            }
            last--;
        }

        // Fill nums1 with leftover nums2 elements
        while (n > 0) {
            nums1[last] = nums2[n - 1];
            n--;
            last--;
        }
    }
}
```

```cpp
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int last = m + n - 1;

        // Merge in reverse order
        while (m > 0 && n > 0) {
            if (nums1[m - 1] > nums2[n - 1]) {
                nums1[last] = nums1[m - 1];
                m--;
            } else {
                nums1[last] = nums2[n - 1];
                n--;
            }
            last--;
        }

        // Fill nums1 with leftover nums2 elements
        while (n > 0) {
            nums1[last] = nums2[n - 1];
            n--;
            last--;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number} m
     * @param {number[]} nums2
     * @param {number} n
     * @return {void} Do not return anything, modify nums1 in-place instead.
     */
    merge(nums1, m, nums2, n) {
        let last = m + n - 1;

        // Merge in reverse order
        while (m > 0 && n > 0) {
            if (nums1[m - 1] > nums2[n - 1]) {
                nums1[last--] = nums1[m-- - 1];
            } else {
                nums1[last--] = nums2[n-- - 1];
            }
        }

        // Fill nums1 with leftover nums2 elements
        while (n > 0) {
            nums1[last--] = nums2[n-- - 1];
        }
    }
}
```

```csharp
public class Solution {
    public void Merge(int[] nums1, int m, int[] nums2, int n) {
        int last = m + n - 1;

        // Merge in reverse order
        while (m > 0 && n > 0) {
            if (nums1[m - 1] > nums2[n - 1]) {
                nums1[last] = nums1[m - 1];
                m--;
            } else {
                nums1[last] = nums2[n - 1];
                n--;
            }
            last--;
        }

        // Fill nums1 with leftover nums2 elements
        while (n > 0) {
            nums1[last] = nums2[n - 1];
            n--;
            last--;
        }
    }
}
```

```go
func merge(nums1 []int, m int, nums2 []int, n int) {
    last := m + n - 1

    // Merge in reverse order
    for m > 0 && n > 0 {
        if nums1[m-1] > nums2[n-1] {
            nums1[last] = nums1[m-1]
            m--
        } else {
            nums1[last] = nums2[n-1]
            n--
        }
        last--
    }

    // Fill nums1 with leftover nums2 elements
    for n > 0 {
        nums1[last] = nums2[n-1]
        n--
        last--
    }
}
```

```kotlin
class Solution {
    fun merge(nums1: IntArray, m: Int, nums2: IntArray, n: Int) {
        var mIdx = m
        var nIdx = n
        var last = m + n - 1

        // Merge in reverse order
        while (mIdx > 0 && nIdx > 0) {
            if (nums1[mIdx - 1] > nums2[nIdx - 1]) {
                nums1[last] = nums1[mIdx - 1]
                mIdx--
            } else {
                nums1[last] = nums2[nIdx - 1]
                nIdx--
            }
            last--
        }

        // Fill nums1 with leftover nums2 elements
        while (nIdx > 0) {
            nums1[last] = nums2[nIdx - 1]
            nIdx--
            last--
        }
    }
}
```

```swift
class Solution {
    func merge(_ nums1: inout [Int], _ m: Int, _ nums2: [Int], _ n: Int) {
        var m = m
        var n = n
        var last = m + n - 1

        // Merge in reverse order
        while m > 0 && n > 0 {
            if nums1[m - 1] > nums2[n - 1] {
                nums1[last] = nums1[m - 1]
                m -= 1
            } else {
                nums1[last] = nums2[n - 1]
                n -= 1
            }
            last -= 1
        }

        // Fill nums1 with leftover nums2 elements
        while n > 0 {
            nums1[last] = nums2[n - 1]
            n -= 1
            last -= 1
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ and $n$ represent the number of elements in the arrays $nums1$ and $nums2$, respectively.

---

## 4. Three Pointers Without Extra Space - II

### Intuition

This is a cleaner version of the previous approach. We observe that once all elements from `nums2` are placed, the remaining elements of `nums1` are already in their correct positions. So we only need to loop while `j >= 0`. This simplifies the logic and removes the need for a separate cleanup loop.

### Algorithm

1. Initialize pointers `i = m - 1`, `j = n - 1`, and `last = m + n - 1`.
2. While `j >= 0`:
   - If `i >= 0` and `nums1[i] > nums2[j]`, place `nums1[i]` at `nums1[last]` and decrement `i`.
   - Otherwise, place `nums2[j]` at `nums1[last]` and decrement `j`.
   - Decrement `last`.

::tabs-start

```python
class Solution:
    def merge(self, nums1: list[int], m: int, nums2: list[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        last = m + n - 1
        i, j = m - 1, n - 1

        while j >= 0:
            if i >= 0 and nums1[i] > nums2[j]:
                nums1[last] = nums1[i]
                i -= 1
            else:
                nums1[last] = nums2[j]
                j -= 1

            last -= 1
```

```java
public class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int last = m + n - 1;
        int i = m - 1, j = n - 1;

        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) {
                nums1[last--] = nums1[i--];
            } else {
                nums1[last--] = nums2[j--];
            }
        }
    }
}
```

```cpp
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int last = m + n - 1;
        int i = m - 1, j = n - 1;

        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) {
                nums1[last--] = nums1[i--];
            } else {
                nums1[last--] = nums2[j--];
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number} m
     * @param {number[]} nums2
     * @param {number} n
     * @return {void} Do not return anything, modify nums1 in-place instead.
     */
    merge(nums1, m, nums2, n) {
        let last = m + n - 1;
        let i = m - 1,
            j = n - 1;

        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) {
                nums1[last--] = nums1[i--];
            } else {
                nums1[last--] = nums2[j--];
            }
        }
    }
}
```

```csharp
public class Solution {
    public void Merge(int[] nums1, int m, int[] nums2, int n) {
        int last = m + n - 1;
        int i = m - 1, j = n - 1;

        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) {
                nums1[last--] = nums1[i--];
            } else {
                nums1[last--] = nums2[j--];
            }
        }
    }
}
```

```go
func merge(nums1 []int, m int, nums2 []int, n int) {
    last := m + n - 1
    i, j := m-1, n-1

    for j >= 0 {
        if i >= 0 && nums1[i] > nums2[j] {
            nums1[last] = nums1[i]
            i--
        } else {
            nums1[last] = nums2[j]
            j--
        }
        last--
    }
}
```

```kotlin
class Solution {
    fun merge(nums1: IntArray, m: Int, nums2: IntArray, n: Int) {
        var last = m + n - 1
        var i = m - 1
        var j = n - 1

        while (j >= 0) {
            if (i >= 0 && nums1[i] > nums2[j]) {
                nums1[last--] = nums1[i--]
            } else {
                nums1[last--] = nums2[j--]
            }
        }
    }
}
```

```swift
class Solution {
    func merge(_ nums1: inout [Int], _ m: Int, _ nums2: [Int], _ n: Int) {
        var last = m + n - 1
        var i = m - 1
        var j = n - 1

        while j >= 0 {
            if i >= 0 && nums1[i] > nums2[j] {
                nums1[last] = nums1[i]
                i -= 1
            } else {
                nums1[last] = nums2[j]
                j -= 1
            }
            last -= 1
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ and $n$ represent the number of elements in the arrays $nums1$ and $nums2$, respectively.
