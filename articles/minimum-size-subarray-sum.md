## 1. Brute Force

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
