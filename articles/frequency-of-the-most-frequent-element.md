## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxFrequency(self, nums: List[int], k: int) -> int:
        nums.sort()
        res = 1
        for i in range(len(nums)):
            j = i - 1
            tmpK = k
            while j >= 0 and (tmpK - (nums[i] - nums[j])) >= 0:
                tmpK -= (nums[i] - nums[j])
                j -= 1
            res = max(res, i - j)
        return res
```

```java
public class Solution {
    public int maxFrequency(int[] nums, int k) {
        Arrays.sort(nums);
        int res = 1;

        for (int i = 0; i < nums.length; i++) {
            int j = i - 1;
            long tmpK = k;

            while (j >= 0 && (tmpK - (nums[i] - nums[j])) >= 0) {
                tmpK -= (nums[i] - nums[j]);
                j--;
            }
            res = Math.max(res, i - j);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxFrequency(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int res = 1;

        for (int i = 0; i < nums.size(); i++) {
            int j = i - 1;
            long long tmpK = k;

            while (j >= 0 && (tmpK - (nums[i] - nums[j])) >= 0) {
                tmpK -= (nums[i] - nums[j]);
                j--;
            }
            res = max(res, i - j);
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
    maxFrequency(nums, k) {
        nums.sort((a, b) => a - b);
        let res = 1;

        for (let i = 0; i < nums.length; i++) {
            let j = i - 1;
            let tmpK = k;

            while (j >= 0 && tmpK - (nums[i] - nums[j]) >= 0) {
                tmpK -= nums[i] - nums[j];
                j--;
            }
            res = Math.max(res, i - j);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxFrequency(int[] nums, int k) {
        Array.Sort(nums);
        int res = 1;

        for (int i = 0; i < nums.Length; i++) {
            int j = i - 1;
            long tmpK = k;

            while (j >= 0 && tmpK - (nums[i] - nums[j]) >= 0) {
                tmpK -= (nums[i] - nums[j]);
                j--;
            }
            res = Math.Max(res, i - j);
        }
        return res;
    }
}
```

```go
func maxFrequency(nums []int, k int) int {
    sort.Ints(nums)
    res := 1

    for i := 0; i < len(nums); i++ {
        j := i - 1
        tmpK := k

        for j >= 0 && tmpK-(nums[i]-nums[j]) >= 0 {
            tmpK -= nums[i] - nums[j]
            j--
        }
        if i-j > res {
            res = i - j
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxFrequency(nums: IntArray, k: Int): Int {
        nums.sort()
        var res = 1

        for (i in nums.indices) {
            var j = i - 1
            var tmpK = k.toLong()

            while (j >= 0 && tmpK - (nums[i] - nums[j]) >= 0) {
                tmpK -= (nums[i] - nums[j])
                j--
            }
            res = maxOf(res, i - j)
        }
        return res
    }
}
```

```swift
class Solution {
    func maxFrequency(_ nums: [Int], _ k: Int) -> Int {
        let nums = nums.sorted()
        var res = 1

        for i in 0..<nums.count {
            var j = i - 1
            var tmpK = k

            while j >= 0 && tmpK - (nums[i] - nums[j]) >= 0 {
                tmpK -= nums[i] - nums[j]
                j -= 1
            }
            res = max(res, i - j)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 + n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Prefix Sum + Binary Search

::tabs-start

```python
class Solution:
    def maxFrequency(self, nums: List[int], k: int) -> int:
        nums.sort()
        n = len(nums)
        prefix_sum = [0] * (n + 1)
        for i in range(n):
            prefix_sum[i + 1] = prefix_sum[i] + nums[i]

        res = 1
        for i in range(n):
            l, r = 0, i
            while l <= r:
                m = (l + r) // 2
                curSum = prefix_sum[i + 1] - prefix_sum[m]
                need = (i - m + 1) * nums[i] - curSum
                if need <= k:
                    r = m - 1
                    res = max(res, i - m + 1)
                else:
                    l = m + 1
        return res
```

```java
public class Solution {
    public int maxFrequency(int[] nums, int k) {
        Arrays.sort(nums);
        int n = nums.length;
        long[] prefixSum = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        int res = 1;
        for (int i = 0; i < n; i++) {
            int left = 0, right = i;
            while (left <= right) {
                int mid = (left + right) / 2;
                long curSum = prefixSum[i + 1] - prefixSum[mid];
                long need = (i - mid + 1) * 1L * nums[i] - curSum;
                if (need <= k) {
                    right = mid - 1;
                    res = Math.max(res, i - mid + 1);
                } else {
                    left = mid + 1;
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxFrequency(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        vector<long long> prefixSum(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        int res = 1;
        for (int i = 0; i < n; ++i) {
            int l = 0, r = i;
            while (l <= r) {
                int m = (l + r) / 2;
                long long curSum = prefixSum[i + 1] - prefixSum[m];
                long long need = (i - m + 1) * 1LL * nums[i] - curSum;
                if (need <= k) {
                    r = m - 1;
                    res = max(res, i - m + 1);
                } else {
                    l = m + 1;
                }
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
    maxFrequency(nums, k) {
        nums.sort((a, b) => a - b);
        const prefixSum = new Array(nums.length + 1).fill(0);
        for (let i = 0; i < nums.length; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        let res = 1;
        for (let i = 0; i < nums.length; i++) {
            let left = 0,
                right = i;
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                const curSum = prefixSum[i + 1] - prefixSum[mid];
                const need = (i - mid + 1) * nums[i] - curSum;
                if (need <= k) {
                    right = mid - 1;
                    res = Math.max(res, i - mid + 1);
                } else {
                    left = mid + 1;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxFrequency(int[] nums, int k) {
        Array.Sort(nums);
        int n = nums.Length;
        long[] prefixSum = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        int res = 1;
        for (int i = 0; i < n; i++) {
            int left = 0, right = i;
            while (left <= right) {
                int mid = (left + right) / 2;
                long curSum = prefixSum[i + 1] - prefixSum[mid];
                long need = (long)(i - mid + 1) * nums[i] - curSum;
                if (need <= k) {
                    res = Math.Max(res, i - mid + 1);
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
        }
        return res;
    }
}
```

```go
func maxFrequency(nums []int, k int) int {
    sort.Ints(nums)
    n := len(nums)
    prefixSum := make([]int64, n+1)
    for i := 0; i < n; i++ {
        prefixSum[i+1] = prefixSum[i] + int64(nums[i])
    }

    res := 1
    for i := 0; i < n; i++ {
        left, right := 0, i
        for left <= right {
            mid := (left + right) / 2
            curSum := prefixSum[i+1] - prefixSum[mid]
            need := int64(i-mid+1)*int64(nums[i]) - curSum
            if need <= int64(k) {
                right = mid - 1
                if i-mid+1 > res {
                    res = i - mid + 1
                }
            } else {
                left = mid + 1
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxFrequency(nums: IntArray, k: Int): Int {
        nums.sort()
        val n = nums.size
        val prefixSum = LongArray(n + 1)
        for (i in 0 until n) {
            prefixSum[i + 1] = prefixSum[i] + nums[i]
        }

        var res = 1
        for (i in 0 until n) {
            var left = 0
            var right = i
            while (left <= right) {
                val mid = (left + right) / 2
                val curSum = prefixSum[i + 1] - prefixSum[mid]
                val need = (i - mid + 1).toLong() * nums[i] - curSum
                if (need <= k) {
                    right = mid - 1
                    res = maxOf(res, i - mid + 1)
                } else {
                    left = mid + 1
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxFrequency(_ nums: [Int], _ k: Int) -> Int {
        let nums = nums.sorted()
        let n = nums.count
        var prefixSum = [Int](repeating: 0, count: n + 1)
        for i in 0..<n {
            prefixSum[i + 1] = prefixSum[i] + nums[i]
        }

        var res = 1
        for i in 0..<n {
            var left = 0, right = i
            while left <= right {
                let mid = (left + right) / 2
                let curSum = prefixSum[i + 1] - prefixSum[mid]
                let need = (i - mid + 1) * nums[i] - curSum
                if need <= k {
                    right = mid - 1
                    res = max(res, i - mid + 1)
                } else {
                    left = mid + 1
                }
            }
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

::tabs-start

```python
class Solution:
    def maxFrequency(self, nums: List[int], k: int) -> int:
        nums.sort()
        total = res = 0
        l = 0

        for r in range(len(nums)):
            total += nums[r]
            while nums[r] * (r - l + 1) > total + k:
                total -= nums[l]
                l += 1
            res = max(res, r - l + 1)

        return res
```

```java
public class Solution {
    public int maxFrequency(int[] nums, int k) {
        Arrays.sort(nums);
        long total = 0;
        int res = 0;
        int l = 0;

        for (int r = 0; r < nums.length; r++) {
            total += nums[r];
            while ((long) nums[r] * (r - l + 1) > total + k) {
                total -= nums[l];
                l++;
            }
            res = Math.max(res, r - l + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxFrequency(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        long long total = 0;
        int res = 0, l = 0;

        for (int r = 0; r < nums.size(); ++r) {
            total += nums[r];
            while ((long long)nums[r] * (r - l + 1) > total + k) {
                total -= nums[l];
                l++;
            }
            res = max(res, r - l + 1);
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
    maxFrequency(nums, k) {
        nums.sort((a, b) => a - b);
        let total = 0,
            res = 0,
            l = 0;

        for (let r = 0; r < nums.length; r++) {
            total += nums[r];
            while (nums[r] * (r - l + 1) > total + k) {
                total -= nums[l];
                l++;
            }
            res = Math.max(res, r - l + 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxFrequency(int[] nums, int k) {
        Array.Sort(nums);
        long total = 0;
        int res = 0, l = 0;

        for (int r = 0; r < nums.Length; r++) {
            total += nums[r];
            while ((long)nums[r] * (r - l + 1) > total + k) {
                total -= nums[l];
                l++;
            }
            res = Math.Max(res, r - l + 1);
        }

        return res;
    }
}
```

```go
func maxFrequency(nums []int, k int) int {
    sort.Ints(nums)
    var total int64 = 0
    res, l := 0, 0

    for r := 0; r < len(nums); r++ {
        total += int64(nums[r])
        for int64(nums[r])*int64(r-l+1) > total+int64(k) {
            total -= int64(nums[l])
            l++
        }
        if r-l+1 > res {
            res = r - l + 1
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxFrequency(nums: IntArray, k: Int): Int {
        nums.sort()
        var total = 0L
        var res = 0
        var l = 0

        for (r in nums.indices) {
            total += nums[r]
            while (nums[r].toLong() * (r - l + 1) > total + k) {
                total -= nums[l]
                l++
            }
            res = maxOf(res, r - l + 1)
        }

        return res
    }
}
```

```swift
class Solution {
    func maxFrequency(_ nums: [Int], _ k: Int) -> Int {
        let nums = nums.sorted()
        var total = 0
        var res = 0
        var l = 0

        for r in 0..<nums.count {
            total += nums[r]
            while nums[r] * (r - l + 1) > total + k {
                total -= nums[l]
                l += 1
            }
            res = max(res, r - l + 1)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 4. Advanced Sliding Window

::tabs-start

```python
class Solution:
    def maxFrequency(self, nums: List[int], k: int) -> int:
        nums.sort()
        l = 0
        total = 0

        for r in range(len(nums)):
            total += nums[r]

            if (r - l + 1) * nums[r] > total + k:
                total -= nums[l]
                l += 1

        return len(nums) - l
```

```java
public class Solution {
    public int maxFrequency(int[] nums, int k) {
        Arrays.sort(nums);
        long total = 0;
        int l = 0;

        for (int r = 0; r < nums.length; r++) {
            total += nums[r];
            if ((r - l + 1) * 1L * nums[r] > total + k) {
                total -= nums[l];
                l++;
            }
        }

        return nums.length - l;
    }
}
```

```cpp
class Solution {
public:
    int maxFrequency(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        long long total = 0;
        int l = 0;

        for (int r = 0; r < nums.size(); ++r) {
            total += nums[r];
            if ((r - l + 1) * 1L * nums[r] > total + k) {
                total -= nums[l];
                l++;
            }
        }

        return nums.size() - l;
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
    maxFrequency(nums, k) {
        nums.sort((a, b) => a - b);
        let total = 0,
            l = 0;

        for (let r = 0; r < nums.length; r++) {
            total += nums[r];
            if (nums[r] * (r - l + 1) > total + k) {
                total -= nums[l];
                l++;
            }
        }

        return nums.length - l;
    }
}
```

```csharp
public class Solution {
    public int MaxFrequency(int[] nums, int k) {
        Array.Sort(nums);
        long total = 0;
        int l = 0;

        for (int r = 0; r < nums.Length; r++) {
            total += nums[r];
            if ((long)(r - l + 1) * nums[r] > total + k) {
                total -= nums[l];
                l++;
            }
        }

        return nums.Length - l;
    }
}
```

```go
func maxFrequency(nums []int, k int) int {
    sort.Ints(nums)
    var total int64 = 0
    l := 0

    for r := 0; r < len(nums); r++ {
        total += int64(nums[r])
        if int64(r-l+1)*int64(nums[r]) > total+int64(k) {
            total -= int64(nums[l])
            l++
        }
    }

    return len(nums) - l
}
```

```kotlin
class Solution {
    fun maxFrequency(nums: IntArray, k: Int): Int {
        nums.sort()
        var total = 0L
        var l = 0

        for (r in nums.indices) {
            total += nums[r]
            if ((r - l + 1).toLong() * nums[r] > total + k) {
                total -= nums[l]
                l++
            }
        }

        return nums.size - l
    }
}
```

```swift
class Solution {
    func maxFrequency(_ nums: [Int], _ k: Int) -> Int {
        let nums = nums.sorted()
        var total = 0
        var l = 0

        for r in 0..<nums.count {
            total += nums[r]
            if (r - l + 1) * nums[r] > total + k {
                total -= nums[l]
                l += 1
            }
        }

        return nums.count - l
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.
