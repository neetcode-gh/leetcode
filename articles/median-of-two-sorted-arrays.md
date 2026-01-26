## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Search** - Efficiently searching in sorted data by eliminating half the search space
- **Two Pointers** - Merging or comparing elements from two sorted arrays
- **Median Calculation** - Understanding how to find the middle value(s) for odd and even length arrays
- **Array Partitioning** - Conceptually dividing arrays to balance elements on left and right sides

---

## 1. Brute Force

### Intuition

The simplest way to find the median of two sorted arrays is to **combine them into one array** and then sort it.  
Once everything is merged and sorted, finding the median becomes straightforward:
- If the total number of elements is odd → the middle element is the median.
- If even → the median is the average of the two middle elements.

This method is easy to understand but does not take advantage of the fact that the input arrays are already sorted.

### Algorithm

1. Merge both arrays into a single list.
2. Sort the merged list.
3. Compute the total length:
   - If it’s odd, return the middle element.
   - If it’s even, return the average of the two middle elements.

::tabs-start

```python
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        len1 = len(nums1)
        len2 = len(nums2)
        merged = nums1 + nums2
        merged.sort()

        totalLen = len(merged)
        if totalLen % 2 == 0:
            return (merged[totalLen // 2 - 1] + merged[totalLen // 2]) / 2.0
        else:
            return merged[totalLen // 2]
```

```java
public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int len1 = nums1.length, len2 = nums2.length;
        int[] merged = new int[len1 + len2];
        System.arraycopy(nums1, 0, merged, 0, len1);
        System.arraycopy(nums2, 0, merged, len1, len2);
        Arrays.sort(merged);

        int totalLen = merged.length;
        if (totalLen % 2 == 0) {
            return (merged[totalLen / 2 - 1] + merged[totalLen / 2]) / 2.0;
        } else {
            return merged[totalLen / 2];
        }
    }
}
```

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int len1 = nums1.size();
        int len2 = nums2.size();
        vector<int> merged(len1 + len2);
        copy(nums1.begin(), nums1.end(), merged.begin());
        copy(nums2.begin(), nums2.end(), merged.begin() + len1);
        sort(merged.begin(), merged.end());

        int totalLen = merged.size();
        if (totalLen % 2 == 0) {
            return (merged[totalLen / 2 - 1] + merged[totalLen / 2]) / 2.0;
        } else {
            return merged[totalLen / 2];
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    findMedianSortedArrays(nums1, nums2) {
        const len1 = nums1.length;
        const len2 = nums2.length;
        const merged = nums1.concat(nums2);
        merged.sort((a, b) => a - b);

        const totalLen = merged.length;
        if (totalLen % 2 === 0) {
            return (merged[totalLen / 2 - 1] + merged[totalLen / 2]) / 2.0;
        } else {
            return merged[Math.floor(totalLen / 2)];
        }
    }
}
```

```csharp
public class Solution {
    public double FindMedianSortedArrays(int[] nums1, int[] nums2) {
        int len1 = nums1.Length;
        int len2 = nums2.Length;
        int[] merged = new int[len1 + len2];
        Array.Copy(nums1, merged, len1);
        Array.Copy(nums2, 0, merged, len1, len2);
        Array.Sort(merged);

        int totalLen = merged.Length;
        if (totalLen % 2 == 0) {
            return (merged[totalLen / 2 - 1] + merged[totalLen / 2]) / 2.0;
        } else {
            return merged[totalLen / 2];
        }
    }
}
```

```go
func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
    merged := append(nums1, nums2...)
    sort.Ints(merged)

    totalLen := len(merged)
    if totalLen%2 == 0 {
        return float64(merged[totalLen/2-1]+merged[totalLen/2]) / 2.0
    }
    return float64(merged[totalLen/2])
}
```

```kotlin
class Solution {
    fun findMedianSortedArrays(nums1: IntArray, nums2: IntArray): Double {
        val merged = (nums1 + nums2).sorted()
        val totalLen = merged.size
        return if (totalLen % 2 == 0) {
            (merged[totalLen / 2 - 1] + merged[totalLen / 2]) / 2.0
        } else {
            merged[totalLen / 2].toDouble()
        }
    }
}
```

```swift
class Solution {
    func findMedianSortedArrays(_ nums1: [Int], _ nums2: [Int]) -> Double {
        var merged = nums1 + nums2
        merged.sort()

        let totalLen = merged.count
        if totalLen % 2 == 0 {
            return (Double(merged[totalLen / 2 - 1]) + Double(merged[totalLen / 2])) / 2.0
        } else {
            return Double(merged[totalLen / 2])
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n + m)\log (n + m))$
- Space complexity: $O(n + m)$

> Where $n$ is the length of $nums1$ and $m$ is the length of $nums2$.

---

## 2. Two Pointers

### Intuition

Since both arrays are already sorted, we don't need to fully merge them or sort again.
We can **simulate the merge process** using two pointers—just like in merge sort—but only advance until we reach the middle of the combined array.

Because the median depends only on the middle elements, we do not need to process the entire merged array.
We simply track the last one or two values seen while merging, and once we reach the halfway point, we can compute the median.

### Algorithm

1. Initialize two pointers `i` and `j` for each array.
2. Iterate until you have processed `(len1 + len2) // 2 + 1` elements:
   - At each step, pick the smaller of the two current elements.
   - Move the corresponding pointer forward.
   - Track the last two picked values (`median1` and `median2`).
3. After the loop:
   - If the total size is odd → return the last picked value (`median1`).
   - If even → return the average of the last two values (`(median1 + median2) / 2`).

::tabs-start

```python
class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        len1, len2 = len(nums1), len(nums2)
        i = j = 0
        median1 = median2 = 0

        for count in range((len1 + len2) // 2 + 1):
            median2 = median1
            if i < len1 and j < len2:
                if nums1[i] > nums2[j]:
                    median1 = nums2[j]
                    j += 1
                else:
                    median1 = nums1[i]
                    i += 1
            elif i < len1:
                median1 = nums1[i]
                i += 1
            else:
                median1 = nums2[j]
                j += 1

        if (len1 + len2) % 2 == 1:
            return float(median1)
        else:
            return (median1 + median2) / 2.0
```

```java
public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int len1 = nums1.length, len2 = nums2.length;
        int i = 0, j = 0;
        int median1 = 0, median2 = 0;

        for (int count = 0; count < (len1 + len2) / 2 + 1; count++) {
            median2 = median1;
            if (i < len1 && j < len2) {
                if (nums1[i] > nums2[j]) {
                    median1 = nums2[j];
                    j++;
                } else {
                    median1 = nums1[i];
                    i++;
                }
            } else if (i < len1) {
                median1 = nums1[i];
                i++;
            } else {
                median1 = nums2[j];
                j++;
            }
        }

        if ((len1 + len2) % 2 == 1) {
            return (double) median1;
        } else {
            return (median1 + median2) / 2.0;
        }
    }
}
```

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int len1 = nums1.size(), len2 = nums2.size();
        int i = 0, j = 0;
        int median1 = 0, median2 = 0;

        for (int count = 0; count < (len1 + len2) / 2 + 1; count++) {
            median2 = median1;
            if (i < len1 && j < len2) {
                if (nums1[i] > nums2[j]) {
                    median1 = nums2[j];
                    j++;
                } else {
                    median1 = nums1[i];
                    i++;
                }
            } else if (i < len1) {
                median1 = nums1[i];
                i++;
            } else {
                median1 = nums2[j];
                j++;
            }
        }

        if ((len1 + len2) % 2 == 1) {
            return (double) median1;
        } else {
            return (median1 + median2) / 2.0;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    findMedianSortedArrays(nums1, nums2) {
        let len1 = nums1.length,
            len2 = nums2.length;
        let i = 0,
            j = 0;
        let median1 = 0,
            median2 = 0;

        for (
            let count = 0;
            count < Math.floor((len1 + len2) / 2) + 1;
            count++
        ) {
            median2 = median1;
            if (i < len1 && j < len2) {
                if (nums1[i] > nums2[j]) {
                    median1 = nums2[j];
                    j++;
                } else {
                    median1 = nums1[i];
                    i++;
                }
            } else if (i < len1) {
                median1 = nums1[i];
                i++;
            } else {
                median1 = nums2[j];
                j++;
            }
        }

        if ((len1 + len2) % 2 === 1) {
            return median1;
        } else {
            return (median1 + median2) / 2.0;
        }
    }
}
```

```csharp
public class Solution {
    public double FindMedianSortedArrays(int[] nums1, int[] nums2) {
        int len1 = nums1.Length, len2 = nums2.Length;
        int i = 0, j = 0;
        int median1 = 0, median2 = 0;

        for (int count = 0; count < (len1 + len2) / 2 + 1; count++) {
            median2 = median1;
            if (i < len1 && j < len2) {
                if (nums1[i] > nums2[j]) {
                    median1 = nums2[j];
                    j++;
                } else {
                    median1 = nums1[i];
                    i++;
                }
            } else if (i < len1) {
                median1 = nums1[i];
                i++;
            } else {
                median1 = nums2[j];
                j++;
            }
        }

        if ((len1 + len2) % 2 == 1) {
            return (double) median1;
        } else {
            return (median1 + median2) / 2.0;
        }
    }
}
```

```go
func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
    len1, len2 := len(nums1), len(nums2)
    i, j := 0, 0
    median1, median2 := 0, 0

    for count := 0; count < (len1+len2)/2+1; count++ {
        median2 = median1
        if i < len1 && j < len2 {
            if nums1[i] > nums2[j] {
                median1 = nums2[j]
                j++
            } else {
                median1 = nums1[i]
                i++
            }
        } else if i < len1 {
            median1 = nums1[i]
            i++
        } else {
            median1 = nums2[j]
            j++
        }
    }

    if (len1+len2)%2 == 1 {
        return float64(median1)
    }
    return float64(median1+median2) / 2.0
}
```

```kotlin
class Solution {
    fun findMedianSortedArrays(nums1: IntArray, nums2: IntArray): Double {
        val len1 = nums1.size
        val len2 = nums2.size
        var i = 0
        var j = 0
        var median1 = 0
        var median2 = 0

        for (count in 0 until (len1 + len2) / 2 + 1) {
            median2 = median1
            when {
                i < len1 && j < len2 -> {
                    if (nums1[i] > nums2[j]) {
                        median1 = nums2[j]
                        j++
                    } else {
                        median1 = nums1[i]
                        i++
                    }
                }
                i < len1 -> {
                    median1 = nums1[i]
                    i++
                }
                else -> {
                    median1 = nums2[j]
                    j++
                }
            }
        }

        return if ((len1 + len2) % 2 == 1) {
            median1.toDouble()
        } else {
            (median1 + median2) / 2.0
        }
    }
}
```

```kotlin
class Solution {
    func findMedianSortedArrays(_ nums1: [Int], _ nums2: [Int]) -> Double {
        let len1 = nums1.count, len2 = nums2.count
        var i = 0, j = 0
        var median1 = 0, median2 = 0

        for _ in 0..<(len1 + len2) / 2 + 1 {
            median2 = median1
            if i < len1 && j < len2 {
                if nums1[i] > nums2[j] {
                    median1 = nums2[j]
                    j += 1
                } else {
                    median1 = nums1[i]
                    i += 1
                }
            } else if i < len1 {
                median1 = nums1[i]
                i += 1
            } else {
                median1 = nums2[j]
                j += 1
            }
        }

        if (len1 + len2) % 2 == 1 {
            return Double(median1)
        } else {
            return (Double(median1) + Double(median2)) / 2.0
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$

> Where $n$ is the length of $nums1$ and $m$ is the length of $nums2$.

---

## 3. Binary Search

### Intuition

Instead of fully merging the two arrays, think about this question:

> “What is the **k-th smallest** element in the union of two sorted arrays?”

If we can find the k-th smallest element efficiently, then:
- The median is just the middle element (or the average of the two middle elements).

To find the k-th smallest:
- We compare the **k/2-th element** of each array.
- The smaller one (and everything before it in that array) **cannot** be the k-th element,
  because there are at least `k/2` elements smaller than or equal to it.
- So we discard that many elements from one array and **reduce k** accordingly.
- We repeat this process, shrinking the problem each time.

This is like a binary search on k: every step cuts off about half of the remaining elements, giving an `O(log(k))` (or `O(log(m + n))`) solution.

### Algorithm

1. Define a function `getKth(A, B, k)` that returns the k-th smallest element in two sorted arrays `A` and `B`:
   1. Always make sure `A` is the shorter array (swap if needed).
   2. If `A` is empty, the k-th element is simply `B[k-1]`.
   3. If `k == 1`, return `min(A[0], B[0])`.
   4. Let `i = min(len(A), k/2)` and `j = min(len(B), k/2)`.
   5. Compare `A[i-1]` and `B[j-1]`:
      - If `A[i-1] <= B[j-1]`, then the first `i` elements of `A` can't contain the k-th smallest.
        Call `getKth(A[i:], B, k - i)`.
      - Else, the first `j` elements of `B` can't contain the k-th smallest.
        Call `getKth(A, B[j:], k - j)`.

2. To find the median:
   - Let `total = len(A) + len(B)`.
   - If `total` is odd:
     - Median is `getKth(A, B, (total + 1) / 2)`.
   - If `total` is even:
     - Median is the average of:
       - `getKth(A, B, total / 2)` and
       - `getKth(A, B, total / 2 + 1)`.

3. Return that median value.

::tabs-start

```python
class Solution:
    def get_kth(self, a: List[int], m: int, b: List[int], n: int, k: int, a_start: int = 0, b_start: int = 0) -> int:
        if m > n:
            return self.get_kth(b, n, a, m, k, b_start, a_start)
        if m == 0:
            return b[b_start + k - 1]
        if k == 1:
            return min(a[a_start], b[b_start])

        i = min(m, k // 2)
        j = min(n, k // 2)

        if a[a_start + i - 1] > b[b_start + j - 1]:
            return self.get_kth(a, m, b, n - j, k - j, a_start, b_start + j)
        else:
            return self.get_kth(a, m - i, b, n, k - i, a_start + i, b_start)

    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        left = (len(nums1) + len(nums2) + 1) // 2
        right = (len(nums1) + len(nums2) + 2) // 2
        return (self.get_kth(nums1, len(nums1), nums2, len(nums2), left) +
                self.get_kth(nums1, len(nums1), nums2, len(nums2), right)) / 2.0
```

```java
public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int left = (nums1.length + nums2.length + 1) / 2;
        int right = (nums1.length + nums2.length + 2) / 2;
        return (getKth(nums1, nums1.length, nums2, nums2.length, left, 0, 0) +
                getKth(nums1, nums1.length, nums2, nums2.length, right, 0, 0)) / 2.0;
    }

    public int getKth(int[] a, int m, int[] b, int n, int k, int aStart, int bStart) {
        if (m > n) {
            return getKth(b, n, a, m, k, bStart, aStart);
        }
        if (m == 0) {
            return b[bStart + k - 1];
        }
        if (k == 1) {
            return Math.min(a[aStart], b[bStart]);
        }

        int i = Math.min(m, k / 2);
        int j = Math.min(n, k / 2);

        if (a[aStart + i - 1] > b[bStart + j - 1]) {
            return getKth(a, m, b, n - j, k - j, aStart, bStart + j);
        } else {
            return getKth(a, m - i, b, n, k - i, aStart + i, bStart);
        }
    }
}
```

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int left = (nums1.size() + nums2.size() + 1) / 2;
        int right = (nums1.size() + nums2.size() + 2) / 2;
        return (getKth(nums1, nums1.size(), nums2, nums2.size(), left, 0, 0) +
                getKth(nums1, nums1.size(), nums2, nums2.size(), right, 0, 0)) / 2.0;
    }

    int getKth(vector<int>& a, int m, vector<int>& b, int n, int k, int aStart, int bStart) {
        if (m > n) {
            return getKth(b, n, a, m, k, bStart, aStart);
        }
        if (m == 0) {
            return b[bStart + k - 1];
        }
        if (k == 1) {
            return min(a[aStart], b[bStart]);
        }

        int i = min(m, k / 2);
        int j = min(n, k / 2);

        if (a[aStart + i - 1] > b[bStart + j - 1]) {
            return getKth(a, m, b, n - j, k - j, aStart, bStart + j);
        } else {
            return getKth(a, m - i, b, n, k - i, aStart + i, bStart);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    findMedianSortedArrays(nums1, nums2) {
        const m = nums1.length;
        const n = nums2.length;
        const left = Math.floor((m + n + 1) / 2);
        const right = Math.floor((m + n + 2) / 2);

        return (
            (this.getKth(nums1, m, nums2, n, left) +
                this.getKth(nums1, m, nums2, n, right)) /
            2.0
        );
    }

    /**
     * @param {number[]} a
     * @param {number} m
     * @param {number[]} b
     * @param {number} n
     * @param {number} k
     * @param {number} aStart
     * @param {number} bStart
     * @return {number}
     */
    getKth(a, m, b, n, k, aStart = 0, bStart = 0) {
        if (m > n) {
            return this.getKth(b, n, a, m, k, bStart, aStart);
        }
        if (m === 0) {
            return b[bStart + k - 1];
        }
        if (k === 1) {
            return Math.min(a[aStart], b[bStart]);
        }

        const i = Math.min(m, Math.floor(k / 2));
        const j = Math.min(n, Math.floor(k / 2));

        if (a[aStart + i - 1] > b[bStart + j - 1]) {
            return this.getKth(a, m, b, n - j, k - j, aStart, bStart + j);
        } else {
            return this.getKth(a, m - i, b, n, k - i, aStart + i, bStart);
        }
    }
}
```

```csharp
public class Solution {
    public double FindMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.Length;
        int n = nums2.Length;
        int left = (m + n + 1) / 2;
        int right = (m + n + 2) / 2;

        return (GetKth(nums1, m, nums2, n, left, 0, 0) +
                GetKth(nums1, m, nums2, n, right, 0, 0)) / 2.0;
    }

    public int GetKth(int[] a, int m, int[] b, int n, int k, int aStart, int bStart) {
        if (m > n) {
            return GetKth(b, n, a, m, k, bStart, aStart);
        }
        if (m == 0) {
            return b[bStart + k - 1];
        }
        if (k == 1) {
            return Math.Min(a[aStart], b[bStart]);
        }

        int i = Math.Min(m, k / 2);
        int j = Math.Min(n, k / 2);

        if (a[aStart + i - 1] > b[bStart + j - 1]) {
            return GetKth(a, m, b, n - j, k - j, aStart, bStart + j);
        }
        else {
            return GetKth(a, m - i, b, n, k - i, aStart + i, bStart);
        }
    }
}
```

```go
func getKth(a []int, m int, b []int, n int, k int, aStart int, bStart int) int {
    if m > n {
        return getKth(b, n, a, m, k, bStart, aStart)
    }
    if m == 0 {
        return b[bStart+k-1]
    }
    if k == 1 {
        if a[aStart] < b[bStart] {
            return a[aStart]
        }
        return b[bStart]
    }

    i := min(m, k/2)
    j := min(n, k/2)

    if a[aStart+i-1] > b[bStart+j-1] {
        return getKth(a, m, b[bStart+j:], n-j, k-j, aStart, 0)
    }
    return getKth(a[aStart+i:], m-i, b, n, k-i, 0, bStart)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
    left := (len(nums1) + len(nums2) + 1) / 2
    right := (len(nums1) + len(nums2) + 2) / 2
    return float64(getKth(nums1, len(nums1), nums2, len(nums2), left, 0, 0) +
           getKth(nums1, len(nums1), nums2, len(nums2), right, 0, 0)) / 2.0
}
```

```kotlin
class Solution {
    private fun getKth(a: IntArray, m: Int, b: IntArray, n: Int, k: Int, aStart: Int = 0, bStart: Int = 0): Int {
        if (m > n) {
            return getKth(b, n, a, m, k, bStart, aStart)
        }
        if (m == 0) {
            return b[bStart + k - 1]
        }
        if (k == 1) {
            return minOf(a[aStart], b[bStart])
        }

        val i = minOf(m, k / 2)
        val j = minOf(n, k / 2)

        return if (a[aStart + i - 1] > b[bStart + j - 1]) {
            getKth(a, m, b, n - j, k - j, aStart, bStart + j)
        } else {
            getKth(a, m - i, b, n, k - i, aStart + i, bStart)
        }
    }

    fun findMedianSortedArrays(nums1: IntArray, nums2: IntArray): Double {
        val left = (nums1.size + nums2.size + 1) / 2
        val right = (nums1.size + nums2.size + 2) / 2
        return (getKth(nums1, nums1.size, nums2, nums2.size, left) +
                getKth(nums1, nums1.size, nums2, nums2.size, right)) / 2.0
    }
}
```

```swift
class Solution {
    func getKth(_ a: [Int], _ m: Int, _ b: [Int], _ n: Int, _ k: Int, _ aStart: Int = 0, _ bStart: Int = 0) -> Int {
        if m > n {
            return getKth(b, n, a, m, k, bStart, aStart)
        }
        if m == 0 {
            return b[bStart + k - 1]
        }
        if k == 1 {
            return min(a[aStart], b[bStart])
        }

        let i = min(m, k / 2)
        let j = min(n, k / 2)

        if a[aStart + i - 1] > b[bStart + j - 1] {
            return getKth(a, m, b, n - j, k - j, aStart, bStart + j)
        } else {
            return getKth(a, m - i, b, n, k - i, aStart + i, bStart)
        }
    }

    func findMedianSortedArrays(_ nums1: [Int], _ nums2: [Int]) -> Double {
        let left = (nums1.count + nums2.count + 1) / 2
        let right = (nums1.count + nums2.count + 2) / 2
        return (Double(getKth(nums1, nums1.count, nums2, nums2.count, left)) +
                Double(getKth(nums1, nums1.count, nums2, nums2.count, right))) / 2.0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log (m + n))$
- Space complexity: $O(\log (m + n))$ for recursion stack.

> Where $n$ is the length of $nums1$ and $m$ is the length of $nums2$.

---

## 4. Binary Search (Optimal)

### Intuition

We want the median of two **sorted** arrays without fully merging them.

Think of placing the two arrays side by side and making a **cut** (partition) so that:

- The left side of the cut contains exactly half of the total elements (or half + 1 if odd).
- All elements on the **left side** are `<=` all elements on the **right side**.

If we can find such a partition, then:
- The median must come from the **border elements** around this cut:
  - The largest element on the left side,
  - And the smallest element on the right side.

To find this cut efficiently, we:

- Only binary search on the **smaller array**.
- For a chosen cut in the smaller array, the cut in the larger array is fixed (so total elements on the left is half).
- Check if this partition is valid:
  - `Aleft <= Bright` and `Bleft <= Aright`
- If not valid:
  - Move the cut left or right (like normal binary search) until it becomes valid.

Once we have a valid partition, we compute the median using the max of left side and min of right side.

### Algorithm

1. Let the two sorted arrays be `A` and `B`.
   Ensure `A` is the **smaller** array (swap if needed).

2. Let:
   - `total = len(A) + len(B)`
   - `half = total // 2`

3. Use binary search on `A`:
   - `l = 0`, `r = len(A) - 1`
   - While searching:
     - Let `i` be the cut index in `A` (midpoint of `l` and `r`).
     - Let `j = half - i - 2` be the cut index in `B`
       (so that total elements on the left of both arrays equals `half`).

4. Define border values around the cut:
   - `Aleft = A[i]` if `i >= 0` else `-∞`
   - `Aright = A[i + 1]` if `i + 1 < len(A)` else `+∞`
   - `Bleft = B[j]` if `j >= 0` else `-∞`
   - `Bright = B[j + 1]` if `j + 1 < len(B)` else `+∞`

5. Check if the partition is valid:
   - If `Aleft <= Bright` **and** `Bleft <= Aright`:
     - We found the correct partition.
     - If `total` is odd:
       - Median = `min(Aright, Bright)`
     - Else (even total):
       - Median = `(max(Aleft, Bleft) + min(Aright, Bright)) / 2`
   - Else if `Aleft > Bright`:
       - Move the cut in `A` **left** → set `r = i - 1`.
   - Else (`Bleft > Aright`):
       - Move the cut in `A` **right** → set `l = i + 1`.

6. Return the median computed from the valid partition.

::tabs-start

```python
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        A, B = nums1, nums2
        total = len(nums1) + len(nums2)
        half = total // 2

        if len(B) < len(A):
            A, B = B, A

        l, r = 0, len(A) - 1
        while True:
            i = (l + r) // 2
            j = half - i - 2

            Aleft = A[i] if i >= 0 else float("-infinity")
            Aright = A[i + 1] if (i + 1) < len(A) else float("infinity")
            Bleft = B[j] if j >= 0 else float("-infinity")
            Bright = B[j + 1] if (j + 1) < len(B) else float("infinity")

            if Aleft <= Bright and Bleft <= Aright:
                if total % 2:
                    return min(Aright, Bright)
                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2
            elif Aleft > Bright:
                r = i - 1
            else:
                l = i + 1
```

```java
public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int[] A = nums1;
        int[] B = nums2;
        int total = A.length + B.length;
        int half = (total + 1) / 2;

        if (B.length < A.length) {
            int[] temp = A;
            A = B;
            B = temp;
        }

        int l = 0;
        int r = A.length;
        while (l <= r) {
            int i = (l + r) / 2;
            int j = half - i;

            int Aleft = i > 0 ? A[i - 1] : Integer.MIN_VALUE;
            int Aright = i < A.length ? A[i] : Integer.MAX_VALUE;
            int Bleft = j > 0 ? B[j - 1] : Integer.MIN_VALUE;
            int Bright = j < B.length ? B[j] : Integer.MAX_VALUE;

            if (Aleft <= Bright && Bleft <= Aright) {
                if (total % 2 != 0) {
                    return Math.max(Aleft, Bleft);
                }
                return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2.0;
            } else if (Aleft > Bright) {
                r = i - 1;
            } else {
                l = i + 1;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        vector<int>& A = nums1;
        vector<int>& B = nums2;
        int total = A.size() + B.size();
        int half = (total + 1) / 2;

        if (B.size() < A.size()) {
            swap(A, B);
        }

        int l = 0;
        int r = A.size();
        while (l <= r) {
            int i = (l + r) / 2;
            int j = half - i;

            int Aleft = i > 0 ? A[i - 1] : INT_MIN;
            int Aright = i < A.size() ? A[i] : INT_MAX;
            int Bleft = j > 0 ? B[j - 1] : INT_MIN;
            int Bright = j < B.size() ? B[j] : INT_MAX;

            if (Aleft <= Bright && Bleft <= Aright) {
                if (total % 2 != 0) {
                    return max(Aleft, Bleft);
                }
                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2.0;
            } else if (Aleft > Bright) {
                r = i - 1;
            } else {
                l = i + 1;
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    findMedianSortedArrays(nums1, nums2) {
        let A = nums1;
        let B = nums2;
        const total = A.length + B.length;
        const half = Math.floor((total + 1) / 2);

        if (B.length < A.length) {
            [A, B] = [B, A];
        }

        let l = 0;
        let r = A.length;
        while (l <= r) {
            const i = Math.floor((l + r) / 2);
            const j = half - i;

            const Aleft = i > 0 ? A[i - 1] : Number.MIN_SAFE_INTEGER;
            const Aright = i < A.length ? A[i] : Number.MAX_SAFE_INTEGER;
            const Bleft = j > 0 ? B[j - 1] : Number.MIN_SAFE_INTEGER;
            const Bright = j < B.length ? B[j] : Number.MAX_SAFE_INTEGER;

            if (Aleft <= Bright && Bleft <= Aright) {
                if (total % 2 !== 0) {
                    return Math.max(Aleft, Bleft);
                }
                return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
            } else if (Aleft > Bright) {
                r = i - 1;
            } else {
                l = i + 1;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public double FindMedianSortedArrays(int[] nums1, int[] nums2) {
        int[] A = nums1;
        int[] B = nums2;
        int total = A.Length + B.Length;
        int half = (total + 1) / 2;

        if (B.Length < A.Length) {
            int[] temp = A;
            A = B;
            B = temp;
        }

        int l = 0;
        int r = A.Length;
        while (l <= r) {
            int i = (l + r) / 2;
            int j = half - i;

            int Aleft = i > 0 ? A[i - 1] : int.MinValue;
            int Aright = i < A.Length ? A[i] : int.MaxValue;
            int Bleft = j > 0 ? B[j - 1] : int.MinValue;
            int Bright = j < B.Length ? B[j] : int.MaxValue;

            if (Aleft <= Bright && Bleft <= Aright) {
                if (total % 2 != 0) {
                    return Math.Max(Aleft, Bleft);
                }
                return (Math.Max(Aleft, Bleft) + Math.Min(Aright, Bright)) / 2.0;
            }
            else if (Aleft > Bright) {
                r = i - 1;
            }
            else {
                l = i + 1;
            }
        }
        return -1;
    }
}
```

```go
func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
    A, B := nums1, nums2
    total := len(A) + len(B)
    half := (total + 1) / 2

    if len(B) < len(A) {
        A, B = B, A
    }

    l, r := 0, len(A)
    for l <= r {
        i := (l + r) / 2
        j := half - i

        Aleft := math.MinInt64
        if i > 0 {
            Aleft = A[i-1]
        }
        Aright := math.MaxInt64
        if i < len(A) {
            Aright = A[i]
        }
        Bleft := math.MinInt64
        if j > 0 {
            Bleft = B[j-1]
        }
        Bright := math.MaxInt64
        if j < len(B) {
            Bright = B[j]
        }

        if Aleft <= Bright && Bleft <= Aright {
            if total%2 != 0 {
                return float64(max(Aleft, Bleft))
            }
            return (float64(max(Aleft, Bleft)) + float64(min(Aright, Bright))) / 2.0
        } else if Aleft > Bright {
            r = i - 1
        } else {
            l = i + 1
        }
    }
    return -1
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun findMedianSortedArrays(nums1: IntArray, nums2: IntArray): Double {
        var A = nums1
        var B = nums2
        val total = A.size + B.size
        val half = (total + 1) / 2

        if (B.size < A.size) {
            A = nums2
            B = nums1
        }

        var l = 0
        var r = A.size
        while (l <= r) {
            val i = (l + r) / 2
            val j = half - i

            val Aleft = if (i > 0) A[i - 1] else Int.MIN_VALUE
            val Aright = if (i < A.size) A[i] else Int.MAX_VALUE
            val Bleft = if (j > 0) B[j - 1] else Int.MIN_VALUE
            val Bright = if (j < B.size) B[j] else Int.MAX_VALUE

            if (Aleft <= Bright && Bleft <= Aright) {
                return if (total % 2 != 0) {
                    Math.max(Aleft.toDouble(), Bleft.toDouble())
                } else {
                    (Math.max(Aleft.toDouble(), Bleft.toDouble()) +
                     Math.min(Aright.toDouble(), Bright.toDouble())) / 2.0
                }
            } else if (Aleft > Bright) {
                r = i - 1
            } else {
                l = i + 1
            }
        }
        return -1.0
    }
}
```

```swift
class Solution {
    func findMedianSortedArrays(_ nums1: [Int], _ nums2: [Int]) -> Double {
        var A = nums1, B = nums2
        if A.count > B.count {
            swap(&A, &B)
        }

        let total = A.count + B.count
        let half = total / 2
        var l = 0
        var r = A.count

        while true {
            let i = (l + r) / 2
            let j = half - i

            let Aleft = i > 0 ? Double(A[i - 1]) : -Double.infinity
            let Aright = i < A.count ? Double(A[i]) : Double.infinity
            let Bleft = j > 0 ? Double(B[j - 1]) : -Double.infinity
            let Bright = j < B.count ? Double(B[j]) : Double.infinity

            if Aleft <= Bright && Bleft <= Aright {
                if total % 2 == 1 {
                    return min(Aright, Bright)
                } else {
                    return (max(Aleft, Bleft) + min(Aright, Bright)) / 2.0
                }
            } else if Aleft > Bright {
                r = i - 1
            } else {
                l = i + 1
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log (min(n, m)))$
- Space complexity: $O(1)$

> Where $n$ is the length of $nums1$ and $m$ is the length of $nums2$.

---

## Common Pitfalls

### Binary Searching on the Larger Array

The binary search should be performed on the smaller array to ensure the partition index in the larger array stays within bounds. If you search on the larger array, the computed index `j = half - i` for the smaller array may become negative or exceed its length, causing index-out-of-bounds errors.

### Incorrect Partition Index Calculation

A subtle bug arises from how you define the partition. Some implementations use `half = (m + n) / 2` while others use `half = (m + n + 1) / 2`. Depending on this choice, the indices `i` and `j` and the formula for the median differ. Mixing conventions leads to off-by-one errors or incorrect median values.

### Mishandling Edge Cases with Empty Partitions

When the partition places all elements of one array on one side (e.g., `i = 0` or `i = len(A)`), the corresponding `Aleft` or `Aright` does not exist. You must use sentinel values like negative infinity and positive infinity for these boundary conditions. Accessing `A[-1]` or `A[len(A)]` directly causes runtime errors.

### Confusing Odd and Even Total Length Cases

For odd total length, the median is a single element; for even, it is the average of two. The element(s) involved depend on whether you are taking the max of the left partition or the min of the right partition. Mixing up which elements to use for each case produces incorrect results.

### Forgetting Arrays Are Already Sorted

Some implementations unnecessarily sort the input arrays or merge them fully before finding the median. This ignores the key constraint that the arrays are already sorted, inflating time complexity to `O((m+n) log(m+n))` instead of the optimal `O(log(min(m, n)))`.

