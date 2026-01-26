## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Sliding Window Technique** - Dynamically adjusting a window of elements by moving left and right pointers to find optimal subarrays
- **Prefix Sum Arrays** - Precomputing cumulative sums to enable O(1) range sum queries
- **Binary Search** - Efficiently finding target values or boundaries in sorted data in O(log n) time

---

## 1. Brute Force

### Intuition

The most straightforward approach is to check every possible subarray. For each starting index, we expand the subarray until the sum reaches or exceeds the target, then record the length. Since all numbers are positive, once we hit the target we can stop expanding from that starting point.

### Algorithm

1. Initialize `res` to infinity.
2. For each starting index `i` from `0` to `n-1`:
   - Initialize `curSum = 0`.
   - Expand `j` from `i` to `n-1`, adding `nums[j]` to `curSum`.
   - When `curSum >= target`, update `res` with `j - i + 1` and break.
3. Return `0` if `res` is still infinity, otherwise return `res`.

::tabs-start

```python
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        n = len(nums)
        res = float("inf")

        for i in range(n):
            curSum = 0
            for j in range(i, n):
                curSum += nums[j]
                if curSum >= target:
                    res = min(res, j - i + 1)
                    break

        return 0 if  res == float("inf") else res
```

```java
public class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int n = nums.length;
        int res =  Integer.MAX_VALUE;

        for (int i = 0; i < n; i++) {
            int curSum = 0, j = i;
            while (j < n) {
                curSum += nums[j];
                if (curSum >= target) {
                    res = Math.min(res, j - i + 1);
                    break;
                }
                j++;
            }
        }

        return res == Integer.MAX_VALUE ? 0 : res;
    }
}
```

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int n = nums.size();
        int res =  INT_MAX;

        for (int i = 0; i < n; i++) {
            int curSum = 0, j = i;
            while (j < n) {
                curSum += nums[j];
                if (curSum >= target) {
                    res = min(res, j - i + 1);
                    break;
                }
                j++;
            }
        }

        return res == INT_MAX ? 0 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} target
     * @param {number[]} nums
     * @return {number}
     */
    minSubArrayLen(target, nums) {
        let n = nums.length;
        let res = Infinity;

        for (let i = 0; i < n; i++) {
            let curSum = 0,
                j = i;
            while (j < n) {
                curSum += nums[j];
                if (curSum >= target) {
                    res = Math.min(res, j - i + 1);
                    break;
                }
                j++;
            }
        }

        return res == Infinity ? 0 : res;
    }
}
```

```csharp
public class Solution {
    public int MinSubArrayLen(int target, int[] nums) {
        int n = nums.Length;
        int res = int.MaxValue;

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < n; j++) {
                curSum += nums[j];
                if (curSum >= target) {
                    res = Math.Min(res, j - i + 1);
                    break;
                }
            }
        }

        return res == int.MaxValue ? 0 : res;
    }
}
```

```go
func minSubArrayLen(target int, nums []int) int {
    n := len(nums)
    res := n + 1

    for i := 0; i < n; i++ {
        curSum := 0
        for j := i; j < n; j++ {
            curSum += nums[j]
            if curSum >= target {
                if j-i+1 < res {
                    res = j - i + 1
                }
                break
            }
        }
    }

    if res == n+1 {
        return 0
    }
    return res
}
```

```kotlin
class Solution {
    fun minSubArrayLen(target: Int, nums: IntArray): Int {
        val n = nums.size
        var res = Int.MAX_VALUE

        for (i in 0 until n) {
            var curSum = 0
            for (j in i until n) {
                curSum += nums[j]
                if (curSum >= target) {
                    res = minOf(res, j - i + 1)
                    break
                }
            }
        }

        return if (res == Int.MAX_VALUE) 0 else res
    }
}
```

```swift
class Solution {
    func minSubArrayLen(_ target: Int, _ nums: [Int]) -> Int {
        let n = nums.count
        var res = Int.max

        for i in 0..<n {
            var curSum = 0
            for j in i..<n {
                curSum += nums[j]
                if curSum >= target {
                    res = min(res, j - i + 1)
                    break
                }
            }
        }

        return res == Int.max ? 0 : res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Sliding Window

### Intuition

Since all elements are positive, we can use a sliding window approach. We expand the window by moving the right pointer to increase the sum. Once the sum meets or exceeds the target, we try to shrink the window from the left to find the minimum length. This works because removing elements from the left will only decrease the sum, and we want the smallest window that still satisfies the condition.

### Algorithm

1. Initialize `l = 0`, `total = 0`, and `res = infinity`.
2. Iterate `r` from `0` to `n-1`:
   - Add `nums[r]` to `total`.
   - While `total >= target`:
     - Update `res` with the minimum of `res` and `r - l + 1`.
     - Subtract `nums[l]` from `total` and increment `l`.
3. Return `0` if `res` is infinity, otherwise return `res`.

::tabs-start

```python
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        l, total = 0, 0
        res = float("inf")

        for r in range(len(nums)):
            total += nums[r]
            while total >= target:
                res = min(r - l + 1, res)
                total -= nums[l]
                l += 1

        return 0 if res == float("inf") else res
```

```java
public class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int l = 0, total = 0;
        int res = Integer.MAX_VALUE;

        for (int r = 0; r < nums.length; r++) {
            total += nums[r];
            while (total >= target) {
                res = Math.min(r - l + 1, res);
                total -= nums[l];
                l++;
            }
        }

        return res == Integer.MAX_VALUE ? 0 : res;
    }
}
```

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int l = 0, total = 0, res = INT_MAX;

        for (int r = 0; r < nums.size(); r++) {
            total += nums[r];
            while (total >= target) {
                res = min(r - l + 1, res);
                total -= nums[l];
                l++;
            }
        }

        return res == INT_MAX ? 0 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} target
     * @param {number[]} nums
     * @return {number}
     */
    minSubArrayLen(target, nums) {
        let l = 0,
            total = 0;
        let res = Infinity;

        for (let r = 0; r < nums.length; r++) {
            total += nums[r];
            while (total >= target) {
                res = Math.min(r - l + 1, res);
                total -= nums[l];
                l++;
            }
        }

        return res === Infinity ? 0 : res;
    }
}
```

```csharp
public class Solution {
    public int MinSubArrayLen(int target, int[] nums) {
        int l = 0, total = 0;
        int res = int.MaxValue;

        for (int r = 0; r < nums.Length; r++) {
            total += nums[r];

            while (total >= target) {
                res = Math.Min(res, r - l + 1);
                total -= nums[l];
                l++;
            }
        }

        return res == int.MaxValue ? 0 : res;
    }
}
```

```go
func minSubArrayLen(target int, nums []int) int {
    l, total := 0, 0
    res := len(nums) + 1

    for r := 0; r < len(nums); r++ {
        total += nums[r]
        for total >= target {
            if r-l+1 < res {
                res = r - l + 1
            }
            total -= nums[l]
            l++
        }
    }

    if res == len(nums)+1 {
        return 0
    }
    return res
}
```

```kotlin
class Solution {
    fun minSubArrayLen(target: Int, nums: IntArray): Int {
        var l = 0
        var total = 0
        var res = Int.MAX_VALUE

        for (r in nums.indices) {
            total += nums[r]
            while (total >= target) {
                res = minOf(res, r - l + 1)
                total -= nums[l]
                l++
            }
        }

        return if (res == Int.MAX_VALUE) 0 else res
    }
}
```

```swift
class Solution {
    func minSubArrayLen(_ target: Int, _ nums: [Int]) -> Int {
        var l = 0
        var total = 0
        var res = Int.max

        for r in 0..<nums.count {
            total += nums[r]
            while total >= target {
                res = min(res, r - l + 1)
                total -= nums[l]
                l += 1
            }
        }

        return res == Int.max ? 0 : res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 3. Prefix Sum + Binary Search

### Intuition

We can precompute prefix sums so that the sum of any subarray from index `i` to `j` is `prefixSum[j+1] - prefixSum[i]`. Since all numbers are positive, the prefix sum array is strictly increasing. For each starting index `i`, we can binary search for the smallest ending index `j` where the subarray sum is at least `target`.

### Algorithm

1. Build a prefix sum array where `prefixSum[i]` represents the sum of the first `i` elements.
2. For each starting index `i`:
   - Binary search in range `[i, n]` to find the smallest `j` where `prefixSum[j+1] - prefixSum[i] >= target`.
   - If found, update `res` with `j - i + 1`.
3. Return `res % (n + 1)` to handle the case where no valid subarray exists (returns `0`).

::tabs-start

```python
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        n = len(nums)
        prefixSum = [0] * (n + 1)
        for i in range(n):
            prefixSum[i + 1] = prefixSum[i] + nums[i]

        res = n + 1
        for i in range(n):
            l, r = i, n
            while l < r:
                mid = (l + r) // 2
                curSum = prefixSum[mid + 1] - prefixSum[i]
                if curSum >= target:
                    r = mid
                else:
                    l = mid + 1
            if l != n:
                res = min(res, l - i + 1)

        return res % (n + 1)
```

```java
public class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int n = nums.length;
        int[] prefixSum = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        int res = n + 1;
        for (int i = 0; i < n; i++) {
            int l = i, r = n;
            while (l < r) {
                int mid = (l + r) / 2;
                int curSum = prefixSum[mid + 1] - prefixSum[i];
                if (curSum >= target) {
                    r = mid;
                } else {
                    l = mid + 1;
                }
            }
            if (l != n) {
                res = Math.min(res, l - i + 1);
            }
        }

        return res % (n + 1);
    }
}
```

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int n = nums.size();
        vector<int> prefixSum(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        int res = n + 1;
        for (int i = 0; i < n; i++) {
            int l = i, r = n;
            while (l < r) {
                int mid = (l + r) / 2;
                int curSum = prefixSum[mid + 1] - prefixSum[i];
                if (curSum >= target) {
                    r = mid;
                } else {
                    l = mid + 1;
                }
            }
            if (l != n) {
                res = min(res, l - i + 1);
            }
        }

        return res % (n + 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} target
     * @param {number[]} nums
     * @return {number}
     */
    minSubArrayLen(target, nums) {
        const n = nums.length;
        const prefixSum = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        let res = n + 1;
        for (let i = 0; i < n; i++) {
            let l = i,
                r = n;
            while (l < r) {
                const mid = Math.floor((l + r) / 2);
                const curSum = prefixSum[mid + 1] - prefixSum[i];
                if (curSum >= target) {
                    r = mid;
                } else {
                    l = mid + 1;
                }
            }
            if (l !== n) {
                res = Math.min(res, l - i + 1);
            }
        }

        return res % (n + 1);
    }
}
```

```csharp
public class Solution {
    public int MinSubArrayLen(int target, int[] nums) {
        int n = nums.Length;
        int[] prefixSum = new int[n + 1];

        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        int res = n + 1;

        for (int i = 0; i < n; i++) {
            int l = i, r = n;
            while (l < r) {
                int mid = (l + r) / 2;
                int curSum = prefixSum[mid + 1] - prefixSum[i];
                if (curSum >= target) {
                    r = mid;
                } else {
                    l = mid + 1;
                }
            }
            if (l != n) {
                res = Math.Min(res, l - i + 1);
            }
        }

        return res % (n + 1);
    }
}
```

```go
func minSubArrayLen(target int, nums []int) int {
    n := len(nums)
    prefixSum := make([]int, n+1)
    for i := 0; i < n; i++ {
        prefixSum[i+1] = prefixSum[i] + nums[i]
    }

    res := n + 1
    for i := 0; i < n; i++ {
        l, r := i, n
        for l < r {
            mid := (l + r) / 2
            curSum := prefixSum[mid+1] - prefixSum[i]
            if curSum >= target {
                r = mid
            } else {
                l = mid + 1
            }
        }
        if l != n {
            if l-i+1 < res {
                res = l - i + 1
            }
        }
    }

    return res % (n + 1)
}
```

```kotlin
class Solution {
    fun minSubArrayLen(target: Int, nums: IntArray): Int {
        val n = nums.size
        val prefixSum = IntArray(n + 1)
        for (i in 0 until n) {
            prefixSum[i + 1] = prefixSum[i] + nums[i]
        }

        var res = n + 1
        for (i in 0 until n) {
            var l = i
            var r = n
            while (l < r) {
                val mid = (l + r) / 2
                val curSum = prefixSum[mid + 1] - prefixSum[i]
                if (curSum >= target) {
                    r = mid
                } else {
                    l = mid + 1
                }
            }
            if (l != n) {
                res = minOf(res, l - i + 1)
            }
        }

        return res % (n + 1)
    }
}
```

```swift
class Solution {
    func minSubArrayLen(_ target: Int, _ nums: [Int]) -> Int {
        let n = nums.count
        var prefixSum = [Int](repeating: 0, count: n + 1)
        for i in 0..<n {
            prefixSum[i + 1] = prefixSum[i] + nums[i]
        }

        var res = n + 1
        for i in 0..<n {
            var l = i
            var r = n
            while l < r {
                let mid = (l + r) / 2
                let curSum = prefixSum[mid + 1] - prefixSum[i]
                if curSum >= target {
                    r = mid
                } else {
                    l = mid + 1
                }
            }
            if l != n {
                res = min(res, l - i + 1)
            }
        }

        return res % (n + 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Using Strict Equality Instead of Greater-Than-or-Equal

The problem asks for sum greater than or equal to `target`, not exactly equal. A common bug is checking `if (sum == target)` instead of `if (sum >= target)`. This causes the algorithm to miss valid subarrays where the sum exceeds the target, often returning 0 when a valid answer exists.

### Not Handling the No-Solution Case

When no subarray sums to at least `target`, you must return 0. Initializing `res` to `n + 1` or infinity and forgetting to check this at the end leads to returning invalid values. Always verify whether `res` was ever updated before returning it.

### Shrinking the Window Too Aggressively

In the sliding window approach, some implementations shrink the window by moving the left pointer multiple times in a single iteration without rechecking the sum condition. The correct approach uses a while loop that continues shrinking only as long as `sum >= target`, updating the minimum length at each valid position.
