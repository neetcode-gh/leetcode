## 1. Sorting

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O((m + n) \log (m + n))$
- Space complexity: $O(1)$ or $O(m + n)$ depending on the sorting algorithm.

> Where $m$ and $n$ represent the number of elements in the arrays $nums1$ and $nums2$, respectively.

---

## 2. Three Pointers With Extra Space

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(m)$

> Where $m$ and $n$ represent the number of elements in the arrays $nums1$ and $nums2$, respectively.

---

## 3. Three Pointers Without Extra Space - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ and $n$ represent the number of elements in the arrays $nums1$ and $nums2$, respectively.

---

## 4. Three Pointers Without Extra Space - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ and $n$ represent the number of elements in the arrays $nums1$ and $nums2$, respectively.
