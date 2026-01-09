## 1. Brute Force

### Intuition

The most straightforward approach is to check every possible starting position and see how far we can extend while flipping at most `k` zeros. For each starting index, we move forward and count zeros. Once the count exceeds `k`, we stop and record the window length. This method explores all contiguous subarrays but performs redundant work by rescanning overlapping regions.

### Algorithm

1. Initialize `res` to store the maximum length found.
2. For each starting index `l`, set a zero counter `cnt` to 0 and expand with pointer `r`:
   - If the current element is 0 and `cnt` already equals `k`, stop expanding.
   - Otherwise, if the element is 0, increment `cnt`.
   - Move `r` forward.
3. After the inner loop, update `res` with `r - l`.
4. Return `res` after checking all starting positions.

::tabs-start

```python
class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        res = 0
        for l in range(len(nums)):
            cnt, r = 0, l
            while r < len(nums):
                if nums[r] == 0:
                    if cnt == k:
                        break
                    cnt += 1
                r += 1
            res = max(res, r - l)
        return res
```

```java
public class Solution {
    public int longestOnes(int[] nums, int k) {
        int res = 0;
        for (int l = 0; l < nums.length; l++) {
            int cnt = 0, r = l;
            while (r < nums.length) {
                if (nums[r] == 0) {
                    if (cnt == k) break;
                    cnt++;
                }
                r++;
            }
            res = Math.max(res, r - l);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int res = 0;
        for (int l = 0; l < nums.size(); l++) {
            int cnt = 0, r = l;
            while (r < nums.size()) {
                if (nums[r] == 0) {
                    if (cnt == k) break;
                    cnt++;
                }
                r++;
            }
            res = max(res, r - l);
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
    longestOnes(nums, k) {
        let res = 0;
        for (let l = 0; l < nums.length; l++) {
            let cnt = 0, r = l;
            while (r < nums.length) {
                if (nums[r] === 0) {
                    if (cnt === k) break;
                    cnt++;
                }
                r++;
            }
            res = Math.max(res, r - l);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestOnes(int[] nums, int k) {
        int res = 0;
        for (int l = 0; l < nums.Length; l++) {
            int cnt = 0, r = l;
            while (r < nums.Length) {
                if (nums[r] == 0) {
                    if (cnt == k) break;
                    cnt++;
                }
                r++;
            }
            res = Math.Max(res, r - l);
        }
        return res;
    }
}
```

```go
func longestOnes(nums []int, k int) int {
    res := 0
    for l := 0; l < len(nums); l++ {
        cnt, r := 0, l
        for r < len(nums) {
            if nums[r] == 0 {
                if cnt == k {
                    break
                }
                cnt++
            }
            r++
        }
        if r-l > res {
            res = r - l
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun longestOnes(nums: IntArray, k: Int): Int {
        var res = 0
        for (l in nums.indices) {
            var cnt = 0
            var r = l
            while (r < nums.size) {
                if (nums[r] == 0) {
                    if (cnt == k) break
                    cnt++
                }
                r++
            }
            res = maxOf(res, r - l)
        }
        return res
    }
}
```

```swift
class Solution {
    func longestOnes(_ nums: [Int], _ k: Int) -> Int {
        var res = 0
        for l in 0..<nums.count {
            var cnt = 0
            var r = l
            while r < nums.count {
                if nums[r] == 0 {
                    if cnt == k { break }
                    cnt += 1
                }
                r += 1
            }
            res = max(res, r - l)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Binary Search + Prefix Sum

### Intuition

We can precompute a prefix sum array that counts zeros up to each index. For any subarray from `l` to `r`, the number of zeros is simply `prefix[r+1] - prefix[l]`. This allows us to quickly check if a window is valid (contains at most `k` zeros). For each starting position, we binary search for the farthest ending position where the zero count stays within the limit. This avoids the linear scan of the brute force approach.

### Algorithm

1. Build a prefix sum array where `prefix[i]` stores the count of zeros in `nums[0..i-1]`.
2. For each starting index `l`, binary search for the largest `r` such that `prefix[r+1] - prefix[l] <= k`.
3. Update `res` with `r - l` (the window length).
4. Return `res` after processing all starting positions.

::tabs-start

```python
class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        prefix = [0]
        for num in nums:
            prefix.append(prefix[-1] + (1 if num == 0 else 0))
        
        res = 0
        for l in range(len(nums)):
            low, high = l, len(nums)
            while low < high:
                mid = (low + high) // 2
                if prefix[mid + 1] - prefix[l] <= k:
                    low = mid + 1
                else:
                    high = mid
            res = max(res, low - l)
        return res
```

```java
public class Solution {
    public int longestOnes(int[] nums, int k) {
        int[] prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + (nums[i] == 0 ? 1 : 0);
        }

        int res = 0;
        for (int l = 0; l < nums.length; l++) {
            int low = l, high = nums.length;
            while (low < high) {
                int mid = (low + high) / 2;
                if (prefix[mid + 1] - prefix[l] <= k) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            res = Math.max(res, low - l);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        vector<int> prefix(nums.size() + 1, 0);
        for (int i = 0; i < nums.size(); ++i) {
            prefix[i + 1] = prefix[i] + (nums[i] == 0 ? 1 : 0);
        }

        int res = 0;
        for (int l = 0; l < nums.size(); ++l) {
            int low = l, high = nums.size();
            while (low < high) {
                int mid = (low + high) / 2;
                if (prefix[mid + 1] - prefix[l] <= k) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            res = max(res, low - l);
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
    longestOnes(nums, k) {
        const prefix = [0];
        for (let i = 0; i < nums.length; i++) {
            prefix.push(prefix[prefix.length - 1] + (nums[i] === 0 ? 1 : 0));
        }

        let res = 0;
        for (let l = 0; l < nums.length; l++) {
            let low = l, high = nums.length;
            while (low < high) {
                let mid = Math.floor((low + high) / 2);
                if (prefix[mid + 1] - prefix[l] <= k) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            res = Math.max(res, low - l);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestOnes(int[] nums, int k) {
        int[] prefix = new int[nums.Length + 1];
        for (int i = 0; i < nums.Length; i++) {
            prefix[i + 1] = prefix[i] + (nums[i] == 0 ? 1 : 0);
        }

        int res = 0;
        for (int l = 0; l < nums.Length; l++) {
            int low = l, high = nums.Length;
            while (low < high) {
                int mid = (low + high) / 2;
                if (prefix[mid + 1] - prefix[l] <= k) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            res = Math.Max(res, low - l);
        }
        return res;
    }
}
```

```go
func longestOnes(nums []int, k int) int {
    prefix := make([]int, len(nums)+1)
    for i := 0; i < len(nums); i++ {
        if nums[i] == 0 {
            prefix[i+1] = prefix[i] + 1
        } else {
            prefix[i+1] = prefix[i]
        }
    }

    res := 0
    for l := 0; l < len(nums); l++ {
        low, high := l, len(nums)
        for low < high {
            mid := (low + high) / 2
            if prefix[mid+1]-prefix[l] <= k {
                low = mid + 1
            } else {
                high = mid
            }
        }
        if low-l > res {
            res = low - l
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun longestOnes(nums: IntArray, k: Int): Int {
        val prefix = IntArray(nums.size + 1)
        for (i in nums.indices) {
            prefix[i + 1] = prefix[i] + if (nums[i] == 0) 1 else 0
        }

        var res = 0
        for (l in nums.indices) {
            var low = l
            var high = nums.size
            while (low < high) {
                val mid = (low + high) / 2
                if (prefix[mid + 1] - prefix[l] <= k) {
                    low = mid + 1
                } else {
                    high = mid
                }
            }
            res = maxOf(res, low - l)
        }
        return res
    }
}
```

```swift
class Solution {
    func longestOnes(_ nums: [Int], _ k: Int) -> Int {
        var prefix = [Int](repeating: 0, count: nums.count + 1)
        for i in 0..<nums.count {
            prefix[i + 1] = prefix[i] + (nums[i] == 0 ? 1 : 0)
        }

        var res = 0
        for l in 0..<nums.count {
            var low = l
            var high = nums.count
            while low < high {
                let mid = (low + high) / 2
                if prefix[mid + 1] - prefix[l] <= k {
                    low = mid + 1
                } else {
                    high = mid
                }
            }
            res = max(res, low - l)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 3. Sliding Window

### Intuition

A sliding window provides the optimal approach. We maintain a window that can contain at most `k` zeros. As we expand the right boundary, we decrement `k` for each zero encountered. When `k` goes negative, the window has too many zeros, so we shrink from the left until the window is valid again. The maximum window size seen during this process is our answer. Each element is processed at most twice, yielding linear time complexity.

### Algorithm

1. Initialize `l` (left pointer) and `res` (result) to 0.
2. Iterate through the array with `r` (right pointer):
   - If `nums[r]` is 0, decrement `k`.
   - While `k < 0` (window is invalid):
     - If `nums[l]` is 0, increment `k` (restore the flip allowance).
     - Move `l` forward.
   - Update `res` with `r - l + 1`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        l = res = 0
        for r in range(len(nums)):
            k -= (1 if nums[r] == 0 else 0)
            while k < 0:
                k += (1 if nums[l] == 0 else 0)
                l += 1
            res = max(res, r - l + 1)
        return res
```

```java
public class Solution {
    public int longestOnes(int[] nums, int k) {
        int l = 0, res = 0;
        for (int r = 0; r < nums.length; r++) {
            k -= (nums[r] == 0 ? 1 : 0);
            while (k < 0) {
                k += (nums[l] == 0 ? 1 : 0);
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
    int longestOnes(vector<int>& nums, int k) {
        int l = 0, res = 0;
        for (int r = 0; r < nums.size(); ++r) {
            k -= (nums[r] == 0 ? 1 : 0);
            while (k < 0) {
                k += (nums[l] == 0 ? 1 : 0);
                ++l;
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
    longestOnes(nums, k) {
        let l = 0, res = 0;
        for (let r = 0; r < nums.length; r++) {
            k -= (nums[r] === 0 ? 1 : 0);
            while (k < 0) {
                k += (nums[l] === 0 ? 1 : 0);
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
    public int LongestOnes(int[] nums, int k) {
        int l = 0, res = 0;
        for (int r = 0; r < nums.Length; r++) {
            k -= (nums[r] == 0 ? 1 : 0);
            while (k < 0) {
                k += (nums[l] == 0 ? 1 : 0);
                l++;
            }
            res = Math.Max(res, r - l + 1);
        }
        return res;
    }
}
```

```go
func longestOnes(nums []int, k int) int {
    l, res := 0, 0
    for r := 0; r < len(nums); r++ {
        if nums[r] == 0 {
            k--
        }
        for k < 0 {
            if nums[l] == 0 {
                k++
            }
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
    fun longestOnes(nums: IntArray, k: Int): Int {
        var kVar = k
        var l = 0
        var res = 0
        for (r in nums.indices) {
            kVar -= if (nums[r] == 0) 1 else 0
            while (kVar < 0) {
                kVar += if (nums[l] == 0) 1 else 0
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
    func longestOnes(_ nums: [Int], _ k: Int) -> Int {
        var k = k
        var l = 0
        var res = 0
        for r in 0..<nums.count {
            k -= nums[r] == 0 ? 1 : 0
            while k < 0 {
                k += nums[l] == 0 ? 1 : 0
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

* Time complexity: $O(n)$
* Space complexity: $O(1)$