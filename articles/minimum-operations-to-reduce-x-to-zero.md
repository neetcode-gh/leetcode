## 1. Brute Force

### Intuition

We can only remove elements from the left or right ends of the array. The total sum we remove must equal `x`. We try every possible combination: take some elements from the left (prefix) and some from the right (suffix), checking if their combined sum equals `x`. For each valid combination, we track the `min` number of elements removed.

### Algorithm

1. First, check all suffix-only cases by iterating from the right and accumulating a `suffixSum`. If `suffixSum == x`, update `res`.
2. Then, for each prefix length (iterating from left), calculate `prefixSum`. If `prefixSum == x`, update `res`.
3. For each prefix, try combining it with suffixes by iterating from the right. If `prefixSum + suffixSum == x`, update `res` with the combined count.
4. Return `-1` if no valid combination is found, otherwise return `res`.

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
        n = len(nums)
        res = n + 1
        suffixSum = prefixSum = 0

        for i in range(n - 1, -1, -1):
            suffixSum += nums[i]
            if suffixSum == x:
                res = min(res, n - i)

        for i in range(n):
            prefixSum += nums[i]
            suffixSum = 0
            if prefixSum == x:
                res = min(res, i + 1)

            for j in range(n - 1, i, -1):
                suffixSum += nums[j]
                if prefixSum + suffixSum == x:
                    res = min(res, i + 1 + n - j)

        return -1 if res == n + 1 else res
```

```java
public class Solution {
    public int minOperations(int[] nums, int x) {
        int n = nums.length;
        int res = n + 1;
        int suffixSum = 0, prefixSum = 0;

        for (int i = n - 1; i >= 0; i--) {
            suffixSum += nums[i];
            if (suffixSum == x) {
                res = Math.min(res, n - i);
            }
        }

        for (int i = 0; i < n; i++) {
            prefixSum += nums[i];
            suffixSum = 0;
            if (prefixSum == x) {
                res = Math.min(res, i + 1);
            }

            for (int j = n - 1; j > i; j--) {
                suffixSum += nums[j];
                if (prefixSum + suffixSum == x) {
                    res = Math.min(res, i + 1 + n - j);
                }
            }
        }

        return res == n + 1 ? -1 : res;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums, int x) {
        int n = nums.size();
        int res = n + 1, suffixSum = 0, prefixSum = 0;

        for (int i = n - 1; i >= 0; i--) {
            suffixSum += nums[i];
            if (suffixSum == x) {
                res = min(res, n - i);
            }
        }

        for (int i = 0; i < n; i++) {
            prefixSum += nums[i];
            suffixSum = 0;
            if (prefixSum == x) {
                res = min(res, i + 1);
            }

            for (int j = n - 1; j > i; j--) {
                suffixSum += nums[j];
                if (prefixSum + suffixSum == x) {
                    res = min(res, i + 1 + n - j);
                }
            }
        }

        return res == n + 1 ? -1 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} x
     * @return {number}
     */
    minOperations(nums, x) {
        const n = nums.length;
        let res = n + 1,
            suffixSum = 0,
            prefixSum = 0;

        for (let i = n - 1; i >= 0; i--) {
            suffixSum += nums[i];
            if (suffixSum === x) {
                res = Math.min(res, n - i);
            }
        }

        for (let i = 0; i < n; i++) {
            prefixSum += nums[i];
            suffixSum = 0;
            if (prefixSum === x) {
                res = Math.min(res, i + 1);
            }

            for (let j = n - 1; j > i; j--) {
                suffixSum += nums[j];
                if (prefixSum + suffixSum === x) {
                    res = Math.min(res, i + 1 + n - j);
                }
            }
        }

        return res === n + 1 ? -1 : res;
    }
}
```

```csharp
public class Solution {
    public int MinOperations(int[] nums, int x) {
        int n = nums.Length;
        int res = n + 1;
        int suffixSum = 0, prefixSum = 0;

        for (int i = n - 1; i >= 0; i--) {
            suffixSum += nums[i];
            if (suffixSum == x) {
                res = Math.Min(res, n - i);
            }
        }

        for (int i = 0; i < n; i++) {
            prefixSum += nums[i];
            suffixSum = 0;
            if (prefixSum == x) {
                res = Math.Min(res, i + 1);
            }

            for (int j = n - 1; j > i; j--) {
                suffixSum += nums[j];
                if (prefixSum + suffixSum == x) {
                    res = Math.Min(res, i + 1 + n - j);
                }
            }
        }

        return res == n + 1 ? -1 : res;
    }
}
```

```go
func minOperations(nums []int, x int) int {
    n := len(nums)
    res := n + 1
    suffixSum, prefixSum := 0, 0

    for i := n - 1; i >= 0; i-- {
        suffixSum += nums[i]
        if suffixSum == x {
            if n-i < res {
                res = n - i
            }
        }
    }

    for i := 0; i < n; i++ {
        prefixSum += nums[i]
        suffixSum = 0
        if prefixSum == x {
            if i+1 < res {
                res = i + 1
            }
        }

        for j := n - 1; j > i; j-- {
            suffixSum += nums[j]
            if prefixSum+suffixSum == x {
                if i+1+n-j < res {
                    res = i + 1 + n - j
                }
            }
        }
    }

    if res == n+1 {
        return -1
    }
    return res
}
```

```kotlin
class Solution {
    fun minOperations(nums: IntArray, x: Int): Int {
        val n = nums.size
        var res = n + 1
        var suffixSum = 0
        var prefixSum = 0

        for (i in n - 1 downTo 0) {
            suffixSum += nums[i]
            if (suffixSum == x) {
                res = minOf(res, n - i)
            }
        }

        for (i in 0 until n) {
            prefixSum += nums[i]
            suffixSum = 0
            if (prefixSum == x) {
                res = minOf(res, i + 1)
            }

            for (j in n - 1 downTo i + 1) {
                suffixSum += nums[j]
                if (prefixSum + suffixSum == x) {
                    res = minOf(res, i + 1 + n - j)
                }
            }
        }

        return if (res == n + 1) -1 else res
    }
}
```

```swift
class Solution {
    func minOperations(_ nums: [Int], _ x: Int) -> Int {
        let n = nums.count
        var res = n + 1
        var suffixSum = 0
        var prefixSum = 0

        for i in stride(from: n - 1, through: 0, by: -1) {
            suffixSum += nums[i]
            if suffixSum == x {
                res = min(res, n - i)
            }
        }

        for i in 0..<n {
            prefixSum += nums[i]
            suffixSum = 0
            if prefixSum == x {
                res = min(res, i + 1)
            }

            for j in stride(from: n - 1, to: i, by: -1) {
                suffixSum += nums[j]
                if prefixSum + suffixSum == x {
                    res = min(res, i + 1 + n - j)
                }
            }
        }

        return res == n + 1 ? -1 : res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Prefix Sum + Binary Search

### Intuition

Instead of recalculating prefix sums repeatedly, we precompute them. For each `suffixSum` we consider, we need to find a `prefixSum` that equals `x - suffixSum`. Since prefix sums are sorted in increasing order (all elements are positive), we can use binary search to quickly find if such a prefix exists. This eliminates the inner loop from the brute force approach.

### Algorithm

1. Build a prefix sum array where `prefixSum[i]` represents the sum of the first `i` elements.
2. If the total sum is less than `x`, return `-1` immediately.
3. Use binary search to find if any prefix alone equals `x`.
4. Iterate from the right, building `suffixSum`. For each `suffixSum`:
   - If `suffixSum == x`, update `res`.
   - If `suffixSum > x`, `break` early.
   - Binary search in the prefix array for `x - suffixSum`, ensuring the prefix and suffix do not overlap.
5. Return `-1` if no valid combination exists, otherwise return `res`.

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
        n = len(nums)
        prefixSum = [0] * (n + 1)
        for i in range(n):
            prefixSum[i + 1] = prefixSum[i] + nums[i]

        if x > prefixSum[n]:
            return -1

        def binarySearch(target, m):
            l, r = 1, m
            index = n + 1

            while l <= r:
                mid = (l + r) >> 1
                if prefixSum[mid] >= target:
                    if prefixSum[mid] == target:
                        index = mid
                    r = mid - 1
                else:
                    l = mid + 1

            return index

        res = binarySearch(x, n)
        suffixSum = 0
        for i in range(n - 1, 0, -1):
            suffixSum += nums[i]
            if suffixSum == x:
                res = min(res, n - i)
                break
            if suffixSum > x: break
            res = min(res, binarySearch(x - suffixSum, i) + n - i)

        return -1 if res == n + 1 else res
```

```java
public class Solution {
    public int minOperations(int[] nums, int x) {
        int n = nums.length;
        int[] prefixSum = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        if (x > prefixSum[n]) {
            return -1;
        }

        int res = binarySearch(prefixSum, x, n);
        int suffixSum = 0;
        for (int i = n - 1; i > 0; i--) {
            suffixSum += nums[i];
            if (suffixSum == x) {
                res = Math.min(res, n - i);
                break;
            }
            if (suffixSum > x) break;
            res = Math.min(res, binarySearch(prefixSum, x - suffixSum, i) + n - i);
        }

        return res == n + 1 ? -1 : res;
    }

    private int binarySearch(int[] prefixSum, int target, int m) {
        int l = 1, r = m;
        int index = prefixSum.length;

        while (l <= r) {
            int mid = (l + r) / 2;
            if (prefixSum[mid] >= target) {
                if (prefixSum[mid] == target) {
                    index = mid;
                }
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return index;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums, int x) {
        int n = nums.size();
        vector<int> prefixSum(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        if (x > prefixSum[n]) {
            return -1;
        }

        auto binarySearch = [&](int target, int m) {
            int l = 1, r = m, index = n + 1;
            while (l <= r) {
                int mid = (l + r) / 2;
                if (prefixSum[mid] >= target) {
                    if (prefixSum[mid] == target) {
                        index = mid;
                    }
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }
            return index;
        };

        int res = binarySearch(x, n);
        int suffixSum = 0;
        for (int i = n - 1; i > 0; i--) {
            suffixSum += nums[i];
            if (suffixSum == x) {
                res = min(res, n - i);
                break;
            }
            if (suffixSum > x) break;
            res = min(res, binarySearch(x - suffixSum, i) + n - i);
        }

        return res == n + 1 ? -1 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} x
     * @return {number}
     */
    minOperations(nums, x) {
        const n = nums.length;
        const prefixSum = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        if (x > prefixSum[n]) return -1;

        const binarySearch = (target, m) => {
            let l = 1,
                r = m;
            let index = n + 1;
            while (l <= r) {
                let mid = Math.floor((l + r) / 2);
                if (prefixSum[mid] >= target) {
                    if (prefixSum[mid] === target) {
                        index = mid;
                    }
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }
            return index;
        };

        let res = binarySearch(x, n);
        let suffixSum = 0;
        for (let i = n - 1; i > 0; i--) {
            suffixSum += nums[i];
            if (suffixSum === x) {
                res = Math.min(res, n - i);
                break;
            }
            if (suffixSum > x) break;
            res = Math.min(res, binarySearch(x - suffixSum, i) + n - i);
        }

        return res === n + 1 ? -1 : res;
    }
}
```

```csharp
public class Solution {
    private int[] prefixSum;

    public int MinOperations(int[] nums, int x) {
        int n = nums.Length;
        prefixSum = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        if (x > prefixSum[n]) {
            return -1;
        }

        int res = BinarySearch(x, n);
        int suffixSum = 0;
        for (int i = n - 1; i > 0; i--) {
            suffixSum += nums[i];
            if (suffixSum == x) {
                res = Math.Min(res, n - i);
                break;
            }
            if (suffixSum > x) break;
            res = Math.Min(res, BinarySearch(x - suffixSum, i) + n - i);
        }

        return res == n + 1 ? -1 : res;
    }

    private int BinarySearch(int target, int m) {
        int l = 1, r = m;
        int index = prefixSum.Length;

        while (l <= r) {
            int mid = (l + r) / 2;
            if (prefixSum[mid] >= target) {
                if (prefixSum[mid] == target) {
                    index = mid;
                }
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return index;
    }
}
```

```go
func minOperations(nums []int, x int) int {
    n := len(nums)
    prefixSum := make([]int, n+1)
    for i := 0; i < n; i++ {
        prefixSum[i+1] = prefixSum[i] + nums[i]
    }

    if x > prefixSum[n] {
        return -1
    }

    binarySearch := func(target, m int) int {
        l, r := 1, m
        index := n + 1

        for l <= r {
            mid := (l + r) / 2
            if prefixSum[mid] >= target {
                if prefixSum[mid] == target {
                    index = mid
                }
                r = mid - 1
            } else {
                l = mid + 1
            }
        }
        return index
    }

    res := binarySearch(x, n)
    suffixSum := 0
    for i := n - 1; i > 0; i-- {
        suffixSum += nums[i]
        if suffixSum == x {
            if n-i < res {
                res = n - i
            }
            break
        }
        if suffixSum > x {
            break
        }
        if binarySearch(x-suffixSum, i)+n-i < res {
            res = binarySearch(x-suffixSum, i) + n - i
        }
    }

    if res == n+1 {
        return -1
    }
    return res
}
```

```kotlin
class Solution {
    fun minOperations(nums: IntArray, x: Int): Int {
        val n = nums.size
        val prefixSum = IntArray(n + 1)
        for (i in 0 until n) {
            prefixSum[i + 1] = prefixSum[i] + nums[i]
        }

        if (x > prefixSum[n]) {
            return -1
        }

        fun binarySearch(target: Int, m: Int): Int {
            var l = 1
            var r = m
            var index = n + 1

            while (l <= r) {
                val mid = (l + r) / 2
                if (prefixSum[mid] >= target) {
                    if (prefixSum[mid] == target) {
                        index = mid
                    }
                    r = mid - 1
                } else {
                    l = mid + 1
                }
            }
            return index
        }

        var res = binarySearch(x, n)
        var suffixSum = 0
        for (i in n - 1 downTo 1) {
            suffixSum += nums[i]
            if (suffixSum == x) {
                res = minOf(res, n - i)
                break
            }
            if (suffixSum > x) break
            res = minOf(res, binarySearch(x - suffixSum, i) + n - i)
        }

        return if (res == n + 1) -1 else res
    }
}
```

```swift
class Solution {
    func minOperations(_ nums: [Int], _ x: Int) -> Int {
        let n = nums.count
        var prefixSum = [Int](repeating: 0, count: n + 1)
        for i in 0..<n {
            prefixSum[i + 1] = prefixSum[i] + nums[i]
        }

        if x > prefixSum[n] {
            return -1
        }

        func binarySearch(_ target: Int, _ m: Int) -> Int {
            var l = 1, r = m
            var index = n + 1

            while l <= r {
                let mid = (l + r) / 2
                if prefixSum[mid] >= target {
                    if prefixSum[mid] == target {
                        index = mid
                    }
                    r = mid - 1
                } else {
                    l = mid + 1
                }
            }
            return index
        }

        var res = binarySearch(x, n)
        var suffixSum = 0
        for i in stride(from: n - 1, to: 0, by: -1) {
            suffixSum += nums[i]
            if suffixSum == x {
                res = min(res, n - i)
                break
            }
            if suffixSum > x { break }
            res = min(res, binarySearch(x - suffixSum, i) + n - i)
        }

        return res == n + 1 ? -1 : res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Prefix Sum + Hash Map

### Intuition

Here is a clever reframing: removing elements from both ends that sum to `x` is the same as keeping a contiguous subarray in the middle that sums to `total - x`. The problem becomes finding the longest subarray with sum equal to `target = total - x`. A hash map storing prefix sums lets us check in `O(1)` whether the required complement exists.

### Algorithm

1. Calculate `target = total - x`. If `target` is negative, return `-1`. If `target` is `0`, return the array length.
2. Use a hash map to store each `prefixSum` and its `index`. Initialize with `{0: -1}` to handle subarrays starting at `index` `0`.
3. Iterate through the array, maintaining a running `prefixSum`:
   - Check if `prefixSum - target` exists in the map. If so, we found a subarray with sum `target`.
   - Track the `max` length of such subarrays.
   - Store the current `prefixSum` in the map.
4. Return `n - maxLength` if a valid subarray was found, otherwise `-1`.

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
        total = sum(nums)
        if total == x:
            return len(nums)

        target = total - x
        if target < 0:
            return -1

        res = -1
        prefixSum = 0
        prefixMap = {0: -1}  # prefixSum -> index

        for i, num in enumerate(nums):
            prefixSum += num
            if prefixSum - target in prefixMap:
                res = max(res, i - prefixMap[prefixSum - target])
            prefixMap[prefixSum] = i

        return len(nums) - res if res != -1 else -1
```

```java
public class Solution {
    public int minOperations(int[] nums, int x) {
        int total = 0;
        for (int num : nums) total += num;
        if (total == x) return nums.length;

        int target = total - x;
        if (target < 0) return -1;

        Map<Integer, Integer> prefixMap = new HashMap<>();
        prefixMap.put(0, -1);
        int prefixSum = 0, res = -1;

        for (int i = 0; i < nums.length; i++) {
            prefixSum += nums[i];
            if (prefixMap.containsKey(prefixSum - target)) {
                res = Math.max(res, i - prefixMap.get(prefixSum - target));
            }
            prefixMap.put(prefixSum, i);
        }

        return res == -1 ? -1 : nums.length - res;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums, int x) {
        int total = 0;
        for (int& num : nums) total += num;
        if (total == x) return nums.size();

        int target = total - x;
        if (target < 0) return -1;

        unordered_map<int, int> prefixMap;
        prefixMap[0] = -1;
        int prefixSum = 0, res = -1;

        for (int i = 0; i < nums.size(); i++) {
            prefixSum += nums[i];
            if (prefixMap.count(prefixSum - target)) {
                res = max(res, i - prefixMap[prefixSum - target]);
            }
            prefixMap[prefixSum] = i;
        }

        return res == -1 ? -1 : nums.size() - res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} x
     * @return {number}
     */
    minOperations(nums, x) {
        const total = nums.reduce((acc, num) => acc + num, 0);
        if (total === x) return nums.length;

        const target = total - x;
        if (target < 0) return -1;

        const prefixMap = new Map();
        prefixMap.set(0, -1);
        let prefixSum = 0,
            res = -1;

        for (let i = 0; i < nums.length; i++) {
            prefixSum += nums[i];
            if (prefixMap.has(prefixSum - target)) {
                res = Math.max(res, i - prefixMap.get(prefixSum - target));
            }
            prefixMap.set(prefixSum, i);
        }

        return res === -1 ? -1 : nums.length - res;
    }
}
```

```csharp
public class Solution {
    public int MinOperations(int[] nums, int x) {
        int total = 0;
        foreach (int num in nums) total += num;
        if (total == x) return nums.Length;

        int target = total - x;
        if (target < 0) return -1;

        Dictionary<int, int> prefixMap = new Dictionary<int, int>();
        prefixMap[0] = -1;
        int prefixSum = 0, res = -1;

        for (int i = 0; i < nums.Length; i++) {
            prefixSum += nums[i];
            if (prefixMap.ContainsKey(prefixSum - target)) {
                res = Math.Max(res, i - prefixMap[prefixSum - target]);
            }
            prefixMap[prefixSum] = i;
        }

        return res == -1 ? -1 : nums.Length - res;
    }
}
```

```go
func minOperations(nums []int, x int) int {
    total := 0
    for _, num := range nums {
        total += num
    }
    if total == x {
        return len(nums)
    }

    target := total - x
    if target < 0 {
        return -1
    }

    prefixMap := map[int]int{0: -1}
    prefixSum, res := 0, -1

    for i, num := range nums {
        prefixSum += num
        if j, ok := prefixMap[prefixSum-target]; ok {
            if i-j > res {
                res = i - j
            }
        }
        prefixMap[prefixSum] = i
    }

    if res == -1 {
        return -1
    }
    return len(nums) - res
}
```

```kotlin
class Solution {
    fun minOperations(nums: IntArray, x: Int): Int {
        val total = nums.sum()
        if (total == x) return nums.size

        val target = total - x
        if (target < 0) return -1

        val prefixMap = mutableMapOf(0 to -1)
        var prefixSum = 0
        var res = -1

        for (i in nums.indices) {
            prefixSum += nums[i]
            if (prefixMap.containsKey(prefixSum - target)) {
                res = maxOf(res, i - prefixMap[prefixSum - target]!!)
            }
            prefixMap[prefixSum] = i
        }

        return if (res == -1) -1 else nums.size - res
    }
}
```

```swift
class Solution {
    func minOperations(_ nums: [Int], _ x: Int) -> Int {
        let total = nums.reduce(0, +)
        if total == x { return nums.count }

        let target = total - x
        if target < 0 { return -1 }

        var prefixMap: [Int: Int] = [0: -1]
        var prefixSum = 0
        var res = -1

        for i in 0..<nums.count {
            prefixSum += nums[i]
            if let j = prefixMap[prefixSum - target] {
                res = max(res, i - j)
            }
            prefixMap[prefixSum] = i
        }

        return res == -1 ? -1 : nums.count - res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Sliding Window

### Intuition

Building on the same insight as the hash map approach, we want the longest subarray summing to `target = total - x`. Since all elements are positive, the subarray sum increases as we expand and decreases as we shrink. This monotonic property allows us to use a sliding window: expand the right boundary to include more elements, and shrink from the left when the sum exceeds the `target`.

### Algorithm

1. Calculate `target = total - x`. This is the sum we want the middle subarray to have.
2. Use two pointers `l` and `r` to define the current window, with `curSum` tracking the window sum.
3. Expand `r` to include elements. If `curSum` exceeds `target`, shrink from `l` until `curSum <= target`.
4. When `curSum == target`, record the `window` length if it is the `max` seen.
5. The answer is `n - maxWindow`. Return `-1` if no valid window was found.

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
        target = sum(nums) - x
        cur_sum = 0
        max_window = -1
        l = 0

        for r in range(len(nums)):
            cur_sum += nums[r]

            while l <= r and cur_sum > target:
                cur_sum -= nums[l]
                l += 1

            if cur_sum == target:
                max_window = max(max_window, r - l + 1)

        return -1 if max_window == -1 else len(nums) - max_window
```

```java
public class Solution {
    public int minOperations(int[] nums, int x) {
        int target = 0;
        for (int num : nums) target += num;
        target -= x;

        int curSum = 0, maxWindow = -1, l = 0;

        for (int r = 0; r < nums.length; r++) {
            curSum += nums[r];

            while (l <= r && curSum > target) {
                curSum -= nums[l];
                l++;
            }

            if (curSum == target) {
                maxWindow = Math.max(maxWindow, r - l + 1);
            }
        }

        return maxWindow == -1 ? -1 : nums.length - maxWindow;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums, int x) {
        int target = accumulate(nums.begin(), nums.end(), 0) - x;
        int curSum = 0, maxWindow = -1, l = 0;

        for (int r = 0; r < nums.size(); r++) {
            curSum += nums[r];

            while (l <= r && curSum > target) {
                curSum -= nums[l];
                l++;
            }

            if (curSum == target) {
                maxWindow = max(maxWindow, r - l + 1);
            }
        }

        return maxWindow == -1 ? -1 : nums.size() - maxWindow;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} x
     * @return {number}
     */
    minOperations(nums, x) {
        const target = nums.reduce((acc, num) => acc + num, 0) - x;
        let curSum = 0,
            maxWindow = -1,
            l = 0;

        for (let r = 0; r < nums.length; r++) {
            curSum += nums[r];

            while (l <= r && curSum > target) {
                curSum -= nums[l];
                l++;
            }

            if (curSum === target) {
                maxWindow = Math.max(maxWindow, r - l + 1);
            }
        }

        return maxWindow === -1 ? -1 : nums.length - maxWindow;
    }
}
```

```csharp
public class Solution {
    public int MinOperations(int[] nums, int x) {
        int target = 0;
        foreach (int num in nums) target += num;
        target -= x;

        int curSum = 0, maxWindow = -1, l = 0;

        for (int r = 0; r < nums.Length; r++) {
            curSum += nums[r];

            while (l <= r && curSum > target) {
                curSum -= nums[l];
                l++;
            }

            if (curSum == target) {
                maxWindow = Math.Max(maxWindow, r - l + 1);
            }
        }

        return maxWindow == -1 ? -1 : nums.Length - maxWindow;
    }
}
```

```go
func minOperations(nums []int, x int) int {
    target := 0
    for _, num := range nums {
        target += num
    }
    target -= x

    curSum, maxWindow, l := 0, -1, 0

    for r := 0; r < len(nums); r++ {
        curSum += nums[r]

        for l <= r && curSum > target {
            curSum -= nums[l]
            l++
        }

        if curSum == target {
            if r-l+1 > maxWindow {
                maxWindow = r - l + 1
            }
        }
    }

    if maxWindow == -1 {
        return -1
    }
    return len(nums) - maxWindow
}
```

```kotlin
class Solution {
    fun minOperations(nums: IntArray, x: Int): Int {
        val target = nums.sum() - x
        var curSum = 0
        var maxWindow = -1
        var l = 0

        for (r in nums.indices) {
            curSum += nums[r]

            while (l <= r && curSum > target) {
                curSum -= nums[l]
                l++
            }

            if (curSum == target) {
                maxWindow = maxOf(maxWindow, r - l + 1)
            }
        }

        return if (maxWindow == -1) -1 else nums.size - maxWindow
    }
}
```

```swift
class Solution {
    func minOperations(_ nums: [Int], _ x: Int) -> Int {
        let target = nums.reduce(0, +) - x
        var curSum = 0
        var maxWindow = -1
        var l = 0

        for r in 0..<nums.count {
            curSum += nums[r]

            while l <= r && curSum > target {
                curSum -= nums[l]
                l += 1
            }

            if curSum == target {
                maxWindow = max(maxWindow, r - l + 1)
            }
        }

        return maxWindow == -1 ? -1 : nums.count - maxWindow
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
