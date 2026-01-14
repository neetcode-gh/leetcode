## 1. Brute Force

### Intuition

The most straightforward approach is to check every possible subarray. For each starting index, extend the subarray one element at a time while tracking the running product. If the product stays below `k`, count it. Once the product reaches or exceeds `k`, no further extensions from this starting point will work (since all elements are positive, the product only grows).

### Algorithm

1. Initialize a counter `res = 0`.
2. For each starting index `i` from `0` to `n - 1`:
   - Set `curProd = 1`.
   - For each ending index `j` from `i` to `n - 1`:
     - Multiply `curProd` by `nums[j]`.
     - If `curProd >= k`, `break` out of the inner loop.
     - Otherwise, increment `res`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0

        for i in range(n):
            curProd = 1
            for j in range(i, n):
                curProd *= nums[j]
                if curProd >= k:
                    break
                res += 1

        return res
```

```java
public class Solution {
    public int numSubarrayProductLessThanK(int[] nums, int k) {
        int n = nums.length, res = 0;

        for (int i = 0; i < n; i++) {
            int curProd = 1;
            for (int j = i; j < n; j++) {
                curProd *= nums[j];
                if (curProd >= k) break;
                res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;

        for (int i = 0; i < n; i++) {
            int curProd = 1;
            for (int j = i; j < n; j++) {
                curProd *= nums[j];
                if (curProd >= k) break;
                res++;
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
     * @param {number} k
     * @return {number}
     */
    numSubarrayProductLessThanK(nums, k) {
        let n = nums.length,
            res = 0;

        for (let i = 0; i < n; i++) {
            let curProd = 1;
            for (let j = i; j < n; j++) {
                curProd *= nums[j];
                if (curProd >= k) break;
                res++;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int NumSubarrayProductLessThanK(int[] nums, int k) {
        int n = nums.Length, res = 0;

        for (int i = 0; i < n; i++) {
            long curProd = 1;
            for (int j = i; j < n; j++) {
                curProd *= nums[j];
                if (curProd >= k) break;
                res++;
            }
        }

        return res;
    }
}
```

```go
func numSubarrayProductLessThanK(nums []int, k int) int {
    n := len(nums)
    res := 0

    for i := 0; i < n; i++ {
        curProd := 1
        for j := i; j < n; j++ {
            curProd *= nums[j]
            if curProd >= k {
                break
            }
            res++
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun numSubarrayProductLessThanK(nums: IntArray, k: Int): Int {
        val n = nums.size
        var res = 0

        for (i in 0 until n) {
            var curProd = 1
            for (j in i until n) {
                curProd *= nums[j]
                if (curProd >= k) break
                res++
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func numSubarrayProductLessThanK(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        var res = 0

        for i in 0..<n {
            var curProd = 1
            for j in i..<n {
                curProd *= nums[j]
                if curProd >= k { break }
                res += 1
            }
        }

        return res
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

Products grow multiplicatively, which makes binary search tricky with raw values. However, taking logarithms converts products into sums: `log(a * b) = log(a) + log(b)`. This means we can build a prefix sum of logarithms and binary search for the rightmost position where the prefix sum difference is less than `log(k)`. For each starting index, we find how many valid ending positions exist.

### Algorithm

1. Handle the edge case: if `k <= 1`, return `0` (no positive product can be less than `1` or less).
2. Build a prefix sum array of logarithms: `logs[i+1] = logs[i] + log(nums[i])`.
3. For each starting index `i`:
   - Binary search for the smallest index `j` where `logs[j] >= logs[i] + log(k)`.
   - The count of valid subarrays starting at `i` is `j - (i + 1)`.
4. Sum all counts and return.

::tabs-start

```python
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        if k <= 1:
            return 0

        n = len(nums)
        res = 0
        logs = [0] * (n + 1)
        logK = log(k)
        for i in range(n):
            logs[i + 1] = logs[i] + log(nums[i])

        for i in range(n):
            l, r = i + 1, n + 1
            while l < r:
                mid = (l + r) >> 1
                if logs[mid] < logs[i] + logK - 1e-9:
                    l = mid + 1
                else:
                    r = mid
            res += l - (i + 1)

        return res
```

```java
public class Solution {
    public int numSubarrayProductLessThanK(int[] nums, int k) {
        if (k <= 1) return 0;
        int n = nums.length;
        double[] logs = new double[n + 1];
        double logK = Math.log(k);
        for (int i = 0; i < n; i++) {
            logs[i + 1] = logs[i] + Math.log(nums[i]);
        }
        int res = 0;
        for (int i = 0; i < n; i++) {
            int l = i + 1, r = n + 1;
            while (l < r) {
                int mid = (l + r) >> 1;
                if (logs[mid] < logs[i] + logK - 1e-12) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            res += l - (i + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if (k <= 1) return 0;
        int n = nums.size();
        vector<double> logs(n + 1, 0.0);
        double logK = log(k);
        for (int i = 0; i < n; i++) {
            logs[i + 1] = logs[i] + log(nums[i]);
        }
        int res = 0;
        for (int i = 0; i < n; i++) {
            int l = i + 1, r = n + 1;
            while (l < r) {
                int mid = (l + r) >> 1;
                if (logs[mid] < logs[i] + logK - 1e-12) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            res += l - (i + 1);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    numSubarrayProductLessThanK(nums, k) {
        if (k <= 1) return 0;
        const n = nums.length;
        const logs = new Array(n + 1).fill(0);
        const logK = Math.log(k);
        for (let i = 0; i < n; i++) {
            logs[i + 1] = logs[i] + Math.log(nums[i]);
        }
        let res = 0;
        for (let i = 0; i < n; i++) {
            let l = i + 1, r = n + 1;
            while (l < r) {
                let mid = (l + r) >> 1;
                if (logs[mid] < logs[i] + logK - 1e-12) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            res += l - (i + 1);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumSubarrayProductLessThanK(int[] nums, int k) {
        if (k <= 1) return 0;
        int n = nums.Length;
        double[] logs = new double[n + 1];
        double logK = Math.Log(k);
        for (int i = 0; i < n; i++) {
            logs[i + 1] = logs[i] + Math.Log(nums[i]);
        }
        int res = 0;
        for (int i = 0; i < n; i++) {
            int l = i + 1, r = n + 1;
            while (l < r) {
                int mid = (l + r) >> 1;
                if (logs[mid] < logs[i] + logK - 1e-12) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            res += l - (i + 1);
        }
        return res;
    }
}
```

```go
func numSubarrayProductLessThanK(nums []int, k int) int {
    if k <= 1 {
        return 0
    }
    n := len(nums)
    logs := make([]float64, n+1)
    logK := math.Log(float64(k))
    for i := 0; i < n; i++ {
        logs[i+1] = logs[i] + math.Log(float64(nums[i]))
    }
    res := 0
    for i := 0; i < n; i++ {
        l, r := i+1, n+1
        for l < r {
            mid := (l + r) >> 1
            if logs[mid] < logs[i]+logK-1e-12 {
                l = mid + 1
            } else {
                r = mid
            }
        }
        res += l - (i + 1)
    }
    return res
}
```

```kotlin
class Solution {
    fun numSubarrayProductLessThanK(nums: IntArray, k: Int): Int {
        if (k <= 1) return 0
        val n = nums.size
        val logs = DoubleArray(n + 1)
        val logK = kotlin.math.ln(k.toDouble())
        for (i in 0 until n) {
            logs[i + 1] = logs[i] + kotlin.math.ln(nums[i].toDouble())
        }
        var res = 0
        for (i in 0 until n) {
            var l = i + 1
            var r = n + 1
            while (l < r) {
                val mid = (l + r) shr 1
                if (logs[mid] < logs[i] + logK - 1e-12) {
                    l = mid + 1
                } else {
                    r = mid
                }
            }
            res += l - (i + 1)
        }
        return res
    }
}
```

```swift
class Solution {
    func numSubarrayProductLessThanK(_ nums: [Int], _ k: Int) -> Int {
        if k <= 1 { return 0 }
        let n = nums.count
        var logs = [Double](repeating: 0, count: n + 1)
        let logK = log(Double(k))
        for i in 0..<n {
            logs[i + 1] = logs[i] + log(Double(nums[i]))
        }
        var res = 0
        for i in 0..<n {
            var l = i + 1
            var r = n + 1
            while l < r {
                let mid = (l + r) >> 1
                if logs[mid] < logs[i] + logK - 1e-12 {
                    l = mid + 1
                } else {
                    r = mid
                }
            }
            res += l - (i + 1)
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

Since all numbers are positive, the product of a subarray increases as we add elements and decreases as we remove them. This monotonic property makes sliding window ideal. We maintain a window [l, r] where the product is less than `k`. When adding `nums[r]` causes the product to exceed or equal `k`, we shrink from the left until the product drops below `k` again. Each valid window ending at `r` contributes `r - l + 1` new subarrays.

### Algorithm

1. Initialize `l = 0`, `product = 1`, and `res = 0`.
2. For each `r` from `0` to `n - 1`:
   - Multiply `product` by `nums[r]`.
   - While `product >= k` and `l <= r`, divide `product` by `nums[l]` and increment `l`.
   - Add `r - l + 1` to `res` (this counts all subarrays ending at `r` with product < k).
3. Return `res`.

::tabs-start

```python
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        res = 0
        l = 0
        product = 1
        for r in range(len(nums)):
            product *= nums[r]
            while l <= r and product >= k:
                product //= nums[l]
                l += 1
            res += (r - l + 1)
        return res
```

```java
public class Solution {
    public int numSubarrayProductLessThanK(int[] nums, int k) {
        int res = 0, l = 0;
        long product = 1;
        for (int r = 0; r < nums.length; r++) {
            product *= nums[r];
            while (l <= r && product >= k) {
                product /= nums[l++];
            }
            res += (r - l + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        int res = 0, l = 0;
        long long product = 1;
        for (int r = 0; r < nums.size(); r++) {
            product *= nums[r];
            while (l <= r && product >= k) {
                product /= nums[l++];
            }
            res += (r - l + 1);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    numSubarrayProductLessThanK(nums, k) {
        let res = 0,
            l = 0,
            product = 1;
        for (let r = 0; r < nums.length; r++) {
            product *= nums[r];
            while (l <= r && product >= k) {
                product = Math.floor(product / nums[l++]);
            }
            res += r - l + 1;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int NumSubarrayProductLessThanK(int[] nums, int k) {
        int res = 0;
        int l = 0;
        long product = 1;
        for (int r = 0; r < nums.Length; r++) {
            product *= nums[r];
            while (l <= r && product >= k) {
                product /= nums[l];
                l++;
            }
            res += (r - l + 1);
        }
        return res;
    }
}
```

```go
func numSubarrayProductLessThanK(nums []int, k int) int {
    res := 0
    l := 0
    product := 1
    for r := 0; r < len(nums); r++ {
        product *= nums[r]
        for l <= r && product >= k {
            product /= nums[l]
            l++
        }
        res += r - l + 1
    }
    return res
}
```

```kotlin
class Solution {
    fun numSubarrayProductLessThanK(nums: IntArray, k: Int): Int {
        var res = 0
        var l = 0
        var product = 1L
        for (r in nums.indices) {
            product *= nums[r]
            while (l <= r && product >= k) {
                product /= nums[l]
                l++
            }
            res += r - l + 1
        }
        return res
    }
}
```

```swift
class Solution {
    func numSubarrayProductLessThanK(_ nums: [Int], _ k: Int) -> Int {
        var res = 0
        var l = 0
        var product = 1
        for r in 0..<nums.count {
            product *= nums[r]
            while l <= r && product >= k {
                product /= nums[l]
                l += 1
            }
            res += r - l + 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Forgetting the Edge Case When k <= 1

When `k` is `0` or `1`, no positive product can be less than `k`. Failing to handle this edge case leads to incorrect results or infinite loops. Always check `if k <= 1: return 0` at the start.

### Using Strict Less-Than Comparison Incorrectly

The problem asks for products **strictly less than** `k`, not less than or equal. Using `product <= k` instead of `product < k` will overcount subarrays where the product equals exactly `k`.

### Integer Overflow in Product Calculation

When multiplying elements together, the product can quickly exceed integer bounds. In languages like Java or C++, use `long` instead of `int` for the product variable to avoid overflow issues, especially with large arrays.