## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ and $n$ are the lengths of the arrays $nums1$ and $nums2$, respectively.

---

## 2. Binary Search

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