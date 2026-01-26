## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Search** - Using binary search to find a target value or boundary in a sorted space
- **Two Pointers Technique** - Efficiently traversing sorted arrays from both ends to count elements meeting certain conditions
- **Sorted Array Properties** - Leveraging the sorted nature of arrays to optimize counting and searching operations
- **Handling Negative Numbers** - Understanding how multiplication sign rules affect product ordering

---

## 1. Brute Force

### Intuition

The most direct approach computes all possible products by multiplying each element in the first array with each element in the second. After generating all products, we sort them and return the k-th smallest. While simple, this requires `O(m * n)` space and time for generation, plus `O(m * n * log(m * n))` for sorting, making it impractical for large inputs.

### Algorithm

1. Create an empty list to store all products.
2. For each element in `nums1`, multiply it with each element in `nums2` and add to the list.
3. Sort the product list.
4. Return the element at index `k - 1`.

::tabs-start

```python
class Solution:
    def kthSmallestProduct(self, nums1: List[int], nums2: List[int], k: int) -> int:
        prod = []

        for i in range(len(nums1)):
            for j in range(len(nums2)):
                prod.append(nums1[i] * nums2[j])

        prod.sort()
        return prod[k - 1]
```

```java
public class Solution {
    public long kthSmallestProduct(int[] nums1, int[] nums2, long k) {
        int n = nums1.length, m = nums2.length;
        long[] prod = new long[n * m];
        int idx = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                prod[idx++] = 1L * nums1[i] * nums2[j];
            }
        }
        Arrays.sort(prod);
        return prod[(int)k - 1];
    }
}
```

```cpp
class Solution {
public:
    long long kthSmallestProduct(vector<int>& nums1, vector<int>& nums2, long long k) {
        int n = nums1.size(), m = nums2.size();
        vector<long long> prod;
        prod.reserve((size_t)n * m);
        for (int x : nums1) {
            for (int y : nums2) {
                prod.push_back(1LL * x * y);
            }
        }
        sort(prod.begin(), prod.end());
        return prod[k - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k
     * @return {number}
     */
    kthSmallestProduct(nums1, nums2, k) {
        const prod = [];
        for (let x of nums1) {
            for (let y of nums2) {
                prod.push(x * y);
            }
        }
        prod.sort((a, b) => a - b);
        return prod[k - 1];
    }
}
```

```csharp
public class Solution {
    public long KthSmallestProduct(int[] nums1, int[] nums2, long k) {
        int n = nums1.Length, m = nums2.Length;
        long[] prod = new long[n * m];
        int idx = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                prod[idx++] = (long)nums1[i] * nums2[j];
            }
        }
        Array.Sort(prod);
        return prod[k - 1];
    }
}
```

```go
func kthSmallestProduct(nums1 []int, nums2 []int, k int64) int64 {
    n, m := len(nums1), len(nums2)
    prod := make([]int64, 0, n*m)
    for _, x := range nums1 {
        for _, y := range nums2 {
            prod = append(prod, int64(x)*int64(y))
        }
    }
    sort.Slice(prod, func(i, j int) bool {
        return prod[i] < prod[j]
    })
    return prod[k-1]
}
```

```kotlin
class Solution {
    fun kthSmallestProduct(nums1: IntArray, nums2: IntArray, k: Long): Long {
        val prod = mutableListOf<Long>()
        for (x in nums1) {
            for (y in nums2) {
                prod.add(x.toLong() * y.toLong())
            }
        }
        prod.sort()
        return prod[(k - 1).toInt()]
    }
}
```

```swift
class Solution {
    func kthSmallestProduct(_ nums1: [Int], _ nums2: [Int], _ k: Int64) -> Int64 {
        var prod = [Int64]()
        for x in nums1 {
            for y in nums2 {
                prod.append(Int64(x) * Int64(y))
            }
        }
        prod.sort()
        return prod[Int(k) - 1]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ and $n$ are the lengths of the arrays $nums1$ and $nums2$, respectively.

---

## 2. Binary Search

### Intuition

Instead of enumerating all products, we can binary search on the answer. For a candidate product value, we count how many products are less than or equal to it. If the count is less than `k`, we need a larger product; otherwise, we search smaller. The counting function leverages the sorted nature of both arrays: for positive numbers in `nums1`, we use upper bound on `nums2`; for negative numbers, we use lower bound with adjusted logic.

### Algorithm

1. Set the search range from `-10^10` to `10^10` (product bounds).
2. Binary search for the smallest product where at least `k` products are less than or equal to it.
3. For counting products <= `prod`:
   - For positive `a` in `nums1`: count elements in `nums2` where `a * b <= prod`.
   - For negative `a`: count elements where the product doesn't exceed `prod` (direction reverses).
   - For `a = 0`: if `prod >= 0`, all of `nums2` contributes.
4. Return the binary search result.

::tabs-start

```python
class Solution:
    def kthSmallestProduct(self, nums1: List[int], nums2: List[int], k: int) -> int:
        def count(prod):
            cnt = 0
            n2 = len(nums2)
            for a in nums1:
                if a > 0:
                    cnt += bisect.bisect_right(nums2, prod // a)
                elif a < 0:
                    threshold = math.ceil(prod / a)
                    idx = bisect.bisect_left(nums2, threshold)
                    cnt += n2 - idx
                else:
                    if prod >= 0:
                        cnt += n2
            return cnt


        l, r = -(10**10), 10**10
        while l <= r:
            m = l + (r - l) // 2
            if count(m) < k:
                l = m + 1
            else:
                r = m - 1
        return l
```

```java
public class Solution {
    public long kthSmallestProduct(int[] nums1, int[] nums2, long k) {
        long left = -10_000_000_000L, right = 10_000_000_000L;
        while (left <= right) {
            long mid = left + (right - left) / 2;
            if (count(nums1, nums2, mid) < k) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }

    private long count(int[] nums1, int[] nums2, long prod) {
        long cnt = 0;
        int n2 = nums2.length;
        for (int a : nums1) {
            if (a > 0) {
                long bound = Math.floorDiv(prod, a);
                cnt += upperBound(nums2, bound);
            } else if (a < 0) {
                double div = (double) prod / a;
                long threshold = (long) Math.ceil(div);
                cnt += n2 - lowerBound(nums2, threshold);
            } else {
                if (prod >= 0) {
                    cnt += n2;
                }
            }
        }
        return cnt;
    }

    private int lowerBound(int[] arr, long target) {
        int l = 0, r = arr.length;
        while (l < r) {
            int m = (l + r) / 2;
            if (arr[m] < target) l = m + 1;
            else r = m;
        }
        return l;
    }

    private int upperBound(int[] arr, long target) {
        int l = 0, r = arr.length;
        while (l < r) {
            int m = (l + r) / 2;
            if (arr[m] <= target) l = m + 1;
            else r = m;
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    long long kthSmallestProduct(vector<int>& nums1, vector<int>& nums2, long long k) {
        long long left = -10000000000LL, right = 10000000000LL;
        while (left <= right) {
            long long mid = left + (right - left) / 2;
            if (count(nums1, nums2, mid) < k) left = mid + 1;
            else right = mid - 1;
        }
        return left;
    }
    
private:
    long long count(vector<int>& nums1, vector<int>& nums2, long long prod) {
        long long cnt = 0;
        int n2 = nums2.size();
        for (int a : nums1) {
            if (a > 0) {
                long long bound = prod >= 0
                    ? prod / a
                    : -(( -prod + a - 1) / a);
                cnt += upper_bound(nums2.begin(), nums2.end(), bound) - nums2.begin();
            } else if (a < 0) {
                long long threshold = (long long)ceil((long double)prod / a);
                cnt += n2 - (lower_bound(nums2.begin(), nums2.end(), threshold) - nums2.begin());
            } else {
                if (prod >= 0) cnt += n2;
            }
        }
        return cnt;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k
     * @return {number}
     */
    kthSmallestProduct(nums1, nums2, k) {
        const lowerBound = (arr, target) => {
            let l = 0, r = arr.length;
            while (l < r) {
                const m = (l + r) >>> 1;
                if (arr[m] < target) l = m + 1;
                else r = m;
            }
            return l;
        };

        const upperBound = (arr, target) => {
            let l = 0, r = arr.length;
            while (l < r) {
                const m = (l + r) >>> 1;
                if (arr[m] <= target) l = m + 1;
                else r = m;
            }
            return l;
        };

        let left = -1e10, right = 1e10;
        const n2 = nums2.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            let cnt = 0;
            for (const a of nums1) {
                if (a > 0) {
                    cnt += upperBound(nums2, Math.floor(mid / a));
                } else if (a < 0) {
                    cnt += n2 - lowerBound(nums2, Math.ceil(mid / a));
                } else if (mid >= 0) {
                    cnt += n2;
                }
                if (cnt >= k) break;
            }
            if (cnt < k) left = mid + 1;
            else right = mid;
        }
        return left;
    }
}
```

```csharp
public class Solution {
    public long KthSmallestProduct(int[] nums1, int[] nums2, long k) {
        long left = -10000000000L, right = 10000000000L;
        while (left <= right) {
            long mid = left + (right - left) / 2;
            if (Count(nums1, nums2, mid) < k) left = mid + 1;
            else right = mid - 1;
        }
        return left;
    }

    private long Count(int[] nums1, int[] nums2, long prod) {
        long cnt = 0;
        int n2 = nums2.Length;
        foreach (int a in nums1) {
            if (a > 0) {
                long bound = prod >= 0
                    ? prod / a
                    : -(( -prod + a - 1) / a);
                cnt += UpperBound(nums2, bound);
            } else if (a < 0) {
                long threshold = (long)Math.Ceiling((double)prod / a);
                cnt += n2 - LowerBound(nums2, threshold);
            } else {
                if (prod >= 0) cnt += n2;
            }
        }
        return cnt;
    }

    private int LowerBound(int[] arr, long target) {
        int l = 0, r = arr.Length;
        while (l < r) {
            int m = (l + r) >> 1;
            if (arr[m] < target) l = m + 1;
            else r = m;
        }
        return l;
    }

    private int UpperBound(int[] arr, long target) {
        int l = 0, r = arr.Length;
        while (l < r) {
            int m = (l + r) >> 1;
            if (arr[m] <= target) l = m + 1;
            else r = m;
        }
        return l;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m \log (\log N))$
* Space complexity: $O(1)$

> Where $m$ and $n$ are the lengths of the arrays $nums1$ and $nums2$, respectively. $N$ is the size of the range of the product.

---

## 3. Binary Search + Two Pointers

### Intuition

We can optimize the counting step using two pointers instead of binary search for each element. By separating negative and non-negative numbers in both arrays, we handle four cases: negative times negative (positive result), positive times positive, negative times positive, and positive times negative. For each case, two pointers can efficiently count products less than or equal to the target by exploiting monotonicity.

### Algorithm

1. Find the boundary indices where negative numbers end in both arrays (`pos1`, `pos2`).
2. Binary search on the product value.
3. For each candidate, count products using four two-pointer traversals:
   - Negatives from `nums1` with negatives from `nums2` (yields positives).
   - Positives from `nums1` with positives from `nums2`.
   - Negatives from `nums1` with positives from `nums2` (yields negatives).
   - Positives from `nums1` with negatives from `nums2`.
4. Adjust pointers based on whether the current product exceeds the target.
5. Return the smallest product where count >= `k`.

::tabs-start

```python
class Solution:
    def kthSmallestProduct(self, nums1: List[int], nums2: List[int], k: int) -> int:
        n1, n2 = len(nums1), len(nums2)
        pos1 = 0 # first non-negative in nums1
        while pos1 < n1 and nums1[pos1] < 0:
            pos1 += 1

        pos2 = 0 # first non-negative in nums2
        while pos2 < n2 and nums2[pos2] < 0:
            pos2 += 1

        def count(prod):
            cnt = 0

            # negative * negative -> positive
            i, j = 0, pos2 - 1
            while i < pos1 and j >= 0:
                if nums1[i] * nums2[j] > prod:
                    i += 1
                else:
                    cnt += (pos1 - i)
                    j -= 1

            # positive * positive -> positive
            i, j = pos1, n2 - 1
            while i < n1 and j >= pos2:
                if nums1[i] * nums2[j] > prod:
                    j -= 1
                else:
                    cnt += (j - pos2 + 1)
                    i += 1

            # negative * positive -> negative
            i, j = 0, pos2
            while i < pos1 and j < n2:
                if nums1[i] * nums2[j] > prod:
                    j += 1
                else:
                    cnt += (n2 - j)
                    i += 1

            # positive * negative → negative
            i, j = pos1, 0
            while i < n1 and j < pos2:
                if nums1[i] * nums2[j] > prod:
                    i += 1
                else:
                    cnt += (n1 - i)
                    j += 1

            return cnt

        left, right = -10**10, 10**10
        while left <= right:
            mid = (left + right) // 2
            if count(mid) < k:
                left = mid + 1
            else:
                right = mid - 1

        return left
```

```java
public class Solution {
    public long kthSmallestProduct(int[] nums1, int[] nums2, long k) {
        int n1 = nums1.length, n2 = nums2.length;
        int pos1 = 0; // first non-negative in nums1
        while (pos1 < n1 && nums1[pos1] < 0) {
            pos1++;
        }
        int pos2 = 0; // first non-negative in nums2
        while (pos2 < n2 && nums2[pos2] < 0) {
            pos2++;
        }

        long left = -10_000_000_000L, right = 10_000_000_000L;
        while (left <= right) {
            long mid = left + (right - left) / 2;
            if (count(nums1, nums2, pos1, pos2, n1, n2, mid) < k) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }

    private long count(int[] nums1, int[] nums2,
                       int pos1, int pos2, int n1, int n2,
                       long prod) {
        long cnt = 0;

        // negative * negative -> positive
        int i = 0, j = pos2 - 1;
        while (i < pos1 && j >= 0) {
            if ((long)nums1[i] * nums2[j] > prod) {
                i++;
            } else {
                cnt += (pos1 - i);
                j--;
            }
        }

        // positive * positive -> positive
        i = pos1; j = n2 - 1;
        while (i < n1 && j >= pos2) {
            if ((long)nums1[i] * nums2[j] > prod) {
                j--;
            } else {
                cnt += (j - pos2 + 1);
                i++;
            }
        }

        // negative * positive -> negative
        i = 0; j = pos2;
        while (i < pos1 && j < n2) {
            if ((long)nums1[i] * nums2[j] > prod) {
                j++;
            } else {
                cnt += (n2 - j);
                i++;
            }
        }

        // positive * negative -> negative
        i = pos1; j = 0;
        while (i < n1 && j < pos2) {
            if ((long)nums1[i] * nums2[j] > prod) {
                i++;
            } else {
                cnt += (n1 - i);
                j++;
            }
        }

        return cnt;
    }
}
```

```cpp
class Solution {
public:
    long long kthSmallestProduct(vector<int>& nums1, vector<int>& nums2, long long k) {
        int n1 = nums1.size(), n2 = nums2.size();
        int pos1 = 0; // first non-negative in nums1
        while (pos1 < n1 && nums1[pos1] < 0) {
            pos1++;
        }
        int pos2 = 0; // first non-negative in nums2
        while (pos2 < n2 && nums2[pos2] < 0) {
            pos2++;
        }

        long long left = -10000000000LL, right = 10000000000LL;
        while (left <= right) {
            long long mid = left + (right - left) / 2;
            if (count(nums1, nums2, pos1, pos2, n1, n2, mid) < k) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }

private:
    long long count(const vector<int>& nums1, const vector<int>& nums2,
                    int pos1, int pos2, int n1, int n2,
                    long long prod) {
        long long cnt = 0;

        // negative * negative -> positive
        int i = 0, j = pos2 - 1;
        while (i < pos1 && j >= 0) {
            if ((long long)nums1[i] * nums2[j] > prod) {
                i++;
            } else {
                cnt += (pos1 - i);
                j--;
            }
        }

        // positive * positive -> positive
        i = pos1; j = n2 - 1;
        while (i < n1 && j >= pos2) {
            if ((long long)nums1[i] * nums2[j] > prod) {
                j--;
            } else {
                cnt += (j - pos2 + 1);
                i++;
            }
        }

        // negative * positive -> negative
        i = 0; j = pos2;
        while (i < pos1 && j < n2) {
            if ((long long)nums1[i] * nums2[j] > prod) {
                j++;
            } else {
                cnt += (n2 - j);
                i++;
            }
        }

        // positive * negative -> negative
        i = pos1; j = 0;
        while (i < n1 && j < pos2) {
            if ((long long)nums1[i] * nums2[j] > prod) {
                i++;
            } else {
                cnt += (n1 - i);
                j++;
            }
        }

        return cnt;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k
     * @return {number}
     */
    kthSmallestProduct(nums1, nums2, k) {
        const n1 = nums1.length, n2 = nums2.length;
        
        let pos1 = 0; // first non-negative in nums1
        while (pos1 < n1 && nums1[pos1] < 0) {
            pos1++;
        }
        let pos2 = 0; // first non-negative in nums2
        while (pos2 < n2 && nums2[pos2] < 0) {
            pos2++;
        }

        let left = -1e10, right = 1e10;
        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);
            let cnt = 0;

            // negative * negative -> positive
            let i = 0, j = pos2 - 1;
            while (i < pos1 && j >= 0) {
                if (nums1[i] * nums2[j] > mid) {
                    i++;
                } else {
                    cnt += (pos1 - i);
                    j--;
                }
            }

            // positive * positive -> positive
            i = pos1; j = n2 - 1;
            while (i < n1 && j >= pos2) {
                if (nums1[i] * nums2[j] > mid) {
                    j--;
                } else {
                    cnt += (j - pos2 + 1);
                    i++;
                }
            }

            // negative * positive -> negative
            i = 0; j = pos2;
            while (i < pos1 && j < n2) {
                if (nums1[i] * nums2[j] > mid) {
                    j++;
                } else {
                    cnt += (n2 - j);
                    i++;
                }
            }

            // positive * negative -> negative
            i = pos1; j = 0;
            while (i < n1 && j < pos2) {
                if (nums1[i] * nums2[j] > mid) {
                    i++;
                } else {
                    cnt += (n1 - i);
                    j++;
                }
            }

            if (cnt < k) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return left;
    }
}
```

```csharp
public class Solution {
    public long KthSmallestProduct(int[] nums1, int[] nums2, long k) {
        int n1 = nums1.Length, n2 = nums2.Length;
        int pos1 = 0; // first non-negative in nums1
        while (pos1 < n1 && nums1[pos1] < 0) {
            pos1++;
        }
        int pos2 = 0; // first non-negative in nums2
        while (pos2 < n2 && nums2[pos2] < 0) {
            pos2++;
        }

        long left = -10000000000L, right = 10000000000L;
        while (left <= right) {
            long mid = left + (right - left) / 2;
            if (count(nums1, nums2, pos1, pos2, n1, n2, mid) < k) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }

    private long count(int[] nums1, int[] nums2,
                       int pos1, int pos2, int n1, int n2,
                       long prod) {
        long cnt = 0;

        // negative * negative -> positive
        int i = 0, j = pos2 - 1;
        while (i < pos1 && j >= 0) {
            if ((long)nums1[i] * nums2[j] > prod) {
                i++;
            } else {
                cnt += (pos1 - i);
                j--;
            }
        }

        // positive * positive -> positive
        i = pos1; j = n2 - 1;
        while (i < n1 && j >= pos2) {
            if ((long)nums1[i] * nums2[j] > prod) {
                j--;
            } else {
                cnt += (j - pos2 + 1);
                i++;
            }
        }

        // negative * positive -> negative
        i = 0; j = pos2;
        while (i < pos1 && j < n2) {
            if ((long)nums1[i] * nums2[j] > prod) {
                j++;
            } else {
                cnt += (n2 - j);
                i++;
            }
        }

        // positive * negative -> negative
        i = pos1; j = 0;
        while (i < n1 && j < pos2) {
            if ((long)nums1[i] * nums2[j] > prod) {
                i++;
            } else {
                cnt += (n1 - i);
                j++;
            }
        }

        return cnt;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O((m + n) \log N)$
* Space complexity: $O(1)$

> Where $m$ and $n$ are the lengths of the arrays $nums1$ and $nums2$, respectively. $N$ is the size of the range of the product.

---

## Common Pitfalls

### Integer Overflow in Product Calculations

Products of two integers can exceed the 32-bit integer range, especially when values approach 10^5 in magnitude. Always use 64-bit integers (long long in C++, long in Java) for product calculations and comparisons. Failing to do so causes incorrect counts and wrong answers.

### Incorrect Handling of Negative Numbers

When one or both arrays contain negative numbers, the sign of the product flips, and the ordering reverses. A negative number multiplied by a large positive yields a more negative (smaller) result. You must handle negative-negative, negative-positive, positive-negative, and positive-positive cases separately to count products correctly.

### Incorrect Floor/Ceiling Division for Negative Values

Standard integer division truncates toward zero, but counting products requires floor division for positive divisors and ceiling logic for negative divisors. Using the wrong rounding direction causes off-by-one errors in binary search bounds. Use language-specific floor division functions or manually adjust for negative operands.

### Not Accounting for Zero Values

When an element is zero, its product with any number is zero. This affects counting: if the target product is non-negative, all pairs involving zero contribute to the count. Forgetting to handle zeros separately leads to missing or double-counting products.

### Binary Search Boundary Errors

The search range must cover all possible products, from the most negative to the most positive. Setting bounds too tight causes the algorithm to miss the answer. Use safe bounds like -10^10 to 10^10 based on the problem constraints, and ensure the binary search condition correctly finds the smallest value with at least k products less than or equal to it.