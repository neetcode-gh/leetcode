## 1. Brute Force

### Intuition

We need to find the shortest subarray to remove so that the remaining elements sum to a multiple of `p`. The brute force approach tries every possible subarray length starting from 1. For each length, we slide a window across the array and check if removing that window leaves a sum divisible by `p`. We return the first (smallest) length `l` that works.

### Algorithm

1. Compute the total sum of the array. If it is already divisible by `p`, return `0`.
2. For each possible subarray length `l` from `1` to `n - 1`:
   - Use a sliding window to compute the sum of each subarray of length `l`.
   - For each window position, calculate the remaining sum (total minus window sum).
   - If the remaining sum is divisible by `p`, return `l`.
3. If no valid subarray is found, return `-1`.

::tabs-start

```python
class Solution:
    def minSubarray(self, nums: List[int], p: int) -> int:
        n = len(nums)
        totSum = sum(nums)

        if totSum % p == 0:
            return 0

        for l in range(1, n):
            curSum = 0
            for i in range(n):
                curSum += nums[i]
                if i >= l:
                    curSum -= nums[i - l]

                remainSum = totSum - curSum
                if remainSum % p == 0:
                    return l

        return -1
```

```java
public class Solution {
    public int minSubarray(int[] nums, int p) {
        int n = nums.length;
        long totSum = 0;
        for (int num : nums) totSum += num;

        if (totSum % p == 0) return 0;

        for (int l = 1; l < n; l++) {
            long curSum = 0;
            for (int i = 0; i < n; i++) {
                curSum += nums[i];
                if (i >= l) curSum -= nums[i - l];

                long remainSum = totSum - curSum;
                if (remainSum % p == 0) return l;
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int minSubarray(vector<int>& nums, int p) {
        int n = nums.size();
        long long totSum = 0;
        for (int num : nums) totSum += num;

        if (totSum % p == 0) return 0;

        for (int l = 1; l < n; l++) {
            long long curSum = 0;
            for (int i = 0; i < n; i++) {
                curSum += nums[i];
                if (i >= l) curSum -= nums[i - l];

                long long remainSum = totSum - curSum;
                if (remainSum % p == 0) return l;
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} p
     * @return {number}
     */
    minSubarray(nums, p) {
        const n = nums.length;
        let totSum = nums.reduce((a, b) => a + b, 0);

        if (totSum % p === 0) return 0;

        for (let l = 1; l < n; l++) {
            let curSum = 0;
            for (let i = 0; i < n; i++) {
                curSum += nums[i];
                if (i >= l) curSum -= nums[i - l];

                const remainSum = totSum - curSum;
                if (remainSum % p === 0) return l;
            }
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int MinSubarray(int[] nums, int p) {
        int n = nums.Length;
        long totSum = 0;
        foreach (int num in nums) totSum += num;

        if (totSum % p == 0) return 0;

        for (int l = 1; l < n; l++) {
            long curSum = 0;
            for (int i = 0; i < n; i++) {
                curSum += nums[i];
                if (i >= l) curSum -= nums[i - l];

                long remainSum = totSum - curSum;
                if (remainSum % p == 0) return l;
            }
        }

        return -1;
    }
}
```

```go
func minSubarray(nums []int, p int) int {
    n := len(nums)
    totSum := 0
    for _, num := range nums {
        totSum += num
    }

    if totSum%p == 0 {
        return 0
    }

    for l := 1; l < n; l++ {
        curSum := 0
        for i := 0; i < n; i++ {
            curSum += nums[i]
            if i >= l {
                curSum -= nums[i-l]
            }

            remainSum := totSum - curSum
            if remainSum%p == 0 {
                return l
            }
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun minSubarray(nums: IntArray, p: Int): Int {
        val n = nums.size
        var totSum = 0L
        for (num in nums) totSum += num

        if (totSum % p == 0L) return 0

        for (l in 1 until n) {
            var curSum = 0L
            for (i in 0 until n) {
                curSum += nums[i]
                if (i >= l) curSum -= nums[i - l]

                val remainSum = totSum - curSum
                if (remainSum % p == 0L) return l
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func minSubarray(_ nums: [Int], _ p: Int) -> Int {
        let n = nums.count
        var totSum = 0
        for num in nums {
            totSum += num
        }

        if totSum % p == 0 {
            return 0
        }

        for l in 1..<n {
            var curSum = 0
            for i in 0..<n {
                curSum += nums[i]
                if i >= l {
                    curSum -= nums[i - l]
                }

                let remainSum = totSum - curSum
                if remainSum % p == 0 {
                    return l
                }
            }
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Prefix Sum

### Intuition

If the total sum has remainder `r` when divided by `p`, we need to remove a subarray whose sum also has remainder `r` (mod `p`). This transforms the problem into finding the shortest subarray with a specific remainder. Using prefix sums, if the current prefix has remainder `curSum`, we look for an earlier prefix with remainder `(curSum - r + p) % p`. A hash map stores the most recent index for each remainder, allowing `O(1)` lookups.

### Algorithm

1. Calculate the total sum and its remainder `remain` when divided by `p`. If `remain` is `0`, return `0`.
2. Initialize a hash map with `{0: -1}` to handle subarrays starting from index `0`.
3. Iterate through the array, maintaining the running prefix sum modulo `p`.
4. For each position, compute the target prefix remainder: `(curSum - remain + p) % p`.
5. If this target exists in the map, update the minimum length.
6. Store the current prefix remainder and its index in the map.
7. Return the minimum length found, or `-1` if no valid subarray exists (or if removing it would leave an empty array).

::tabs-start

```python
class Solution:
    def minSubarray(self, nums: List[int], p: int) -> int:
        total = sum(nums)
        remain = total % p
        if remain == 0:
            return 0

        res = len(nums)
        cur_sum = 0
        remain_to_idx = {0: -1}

        for i, n in enumerate(nums):
            cur_sum = (cur_sum + n) % p
            prefix = (cur_sum - remain + p) % p
            if prefix in remain_to_idx:
                length = i - remain_to_idx[prefix]
                res = min(res, length)
            remain_to_idx[cur_sum] = i

        return -1 if res == len(nums) else res
```

```java
public class Solution {
    public int minSubarray(int[] nums, int p) {
        long total = 0;
        for (int num : nums) total += num;
        int remain = (int)(total % p);
        if (remain == 0) return 0;

        int res = nums.length;
        long curSum = 0;
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);

        for (int i = 0; i < nums.length; i++) {
            curSum = (curSum + nums[i]) % p;
            int prefix = (int)((curSum - remain + p) % p);
            if (map.containsKey(prefix)) {
                res = Math.min(res, i - map.get(prefix));
            }
            map.put((int)curSum, i);
        }

        return res == nums.length ? -1 : res;
    }
}
```

```cpp
class Solution {
public:
    int minSubarray(vector<int>& nums, int p) {
        long total = 0;
        for (int num : nums) total += num;
        int remain = total % p;
        if (remain == 0) return 0;

        int res = nums.size();
        long curSum = 0;
        unordered_map<int, int> map;
        map[0] = -1;

        for (int i = 0; i < nums.size(); i++) {
            curSum = (curSum + nums[i]) % p;
            int prefix = (curSum - remain + p) % p;
            if (map.count(prefix)) {
                res = min(res, i - map[prefix]);
            }
            map[curSum] = i;
        }

        return res == nums.size() ? -1 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} p
     * @return {number}
     */
    minSubarray(nums, p) {
        let total = nums.reduce((a, b) => a + b, 0);
        let remain = total % p;
        if (remain === 0) return 0;

        let res = nums.length;
        let curSum = 0;
        const map = new Map();
        map.set(0, -1);

        for (let i = 0; i < nums.length; i++) {
            curSum = (curSum + nums[i]) % p;
            let prefix = (curSum - remain + p) % p;
            if (map.has(prefix)) {
                res = Math.min(res, i - map.get(prefix));
            }
            map.set(curSum, i);
        }

        return res === nums.length ? -1 : res;
    }
}
```

```csharp
public class Solution {
    public int MinSubarray(int[] nums, int p) {
        long total = 0;
        foreach (int num in nums) total += num;
        int remain = (int)(total % p);
        if (remain == 0) return 0;

        int res = nums.Length;
        long curSum = 0;
        var map = new Dictionary<int, int>();
        map[0] = -1;

        for (int i = 0; i < nums.Length; i++) {
            curSum = (curSum + nums[i]) % p;
            int prefix = (int)((curSum - remain + p) % p);
            if (map.ContainsKey(prefix)) {
                res = Math.Min(res, i - map[prefix]);
            }
            map[(int)curSum] = i;
        }

        return res == nums.Length ? -1 : res;
    }
}
```

```go
func minSubarray(nums []int, p int) int {
    total := 0
    for _, num := range nums {
        total += num
    }
    remain := total % p
    if remain == 0 {
        return 0
    }

    res := len(nums)
    curSum := 0
    m := make(map[int]int)
    m[0] = -1

    for i, num := range nums {
        curSum = (curSum + num) % p
        prefix := (curSum - remain + p) % p
        if idx, ok := m[prefix]; ok {
            if i-idx < res {
                res = i - idx
            }
        }
        m[curSum] = i
    }

    if res == len(nums) {
        return -1
    }
    return res
}
```

```kotlin
class Solution {
    fun minSubarray(nums: IntArray, p: Int): Int {
        var total = 0L
        for (num in nums) total += num
        val remain = (total % p).toInt()
        if (remain == 0) return 0

        var res = nums.size
        var curSum = 0L
        val map = HashMap<Int, Int>()
        map[0] = -1

        for (i in nums.indices) {
            curSum = (curSum + nums[i]) % p
            val prefix = ((curSum - remain + p) % p).toInt()
            if (map.containsKey(prefix)) {
                res = minOf(res, i - map[prefix]!!)
            }
            map[curSum.toInt()] = i
        }

        return if (res == nums.size) -1 else res
    }
}
```

```swift
class Solution {
    func minSubarray(_ nums: [Int], _ p: Int) -> Int {
        var total = 0
        for num in nums {
            total += num
        }
        let remain = total % p
        if remain == 0 {
            return 0
        }

        var res = nums.count
        var curSum = 0
        var map = [Int: Int]()
        map[0] = -1

        for i in 0..<nums.count {
            curSum = (curSum + nums[i]) % p
            let prefix = (curSum - remain + p) % p
            if let idx = map[prefix] {
                res = min(res, i - idx)
            }
            map[curSum] = i
        }

        return res == nums.count ? -1 : res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Forgetting to Handle Negative Modulo Results

When computing `(curSum - remain) % p`, the result can be negative in many programming languages. Always add `p` before taking modulo: `(curSum - remain + p) % p`. Failing to do this causes incorrect hash map lookups and wrong answers.

### Not Initializing the Hash Map with {0: -1}

The hash map must start with `{0: -1}` to handle subarrays that start from index 0. Without this initialization, you cannot detect valid subarrays that begin at the first element of the array.

### Returning the Wrong Value When No Valid Subarray Exists

If the minimum length found equals `n` (the entire array), you must return `-1` because removing all elements leaves an empty array, which is invalid. A common mistake is forgetting this edge case and returning `n` instead.
