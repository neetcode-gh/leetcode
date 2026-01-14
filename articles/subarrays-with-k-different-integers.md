## 1. Brute Force

### Intuition

The most straightforward approach is to check every possible subarray and count those with exactly `k` distinct integers. For each starting index, we expand the subarray one element at a time, tracking distinct values using a set. Once we exceed `k` distinct values, we stop and move to the next starting position.

### Algorithm

1. Initialize a result counter `res` to store the count of valid subarrays.
2. For each starting index `i`:
   - Create an empty set to track distinct values.
   - Expand the subarray by moving index `j` from `i` to the end.
   - Add each new element to the set.
   - If the set size exceeds `k`, break out of the inner loop.
   - If the set size equals `k`, increment `res`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def subarraysWithKDistinct(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0

        for i in range(n):
            seen = set()
            for j in range(i, n):
                seen.add(nums[j])
                if len(seen) > k:
                    break

                if len(seen) == k:
                    res += 1

        return res
```

```java
public class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        int n = nums.length, res = 0;

        for (int i = 0; i < n; i++) {
            Set<Integer> seen = new HashSet<>();
            for (int j = i; j < n; j++) {
                seen.add(nums[j]);
                if (seen.size() > k) {
                    break;
                }
                if (seen.size() == k) {
                    res++;
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
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;

        for (int i = 0; i < n; i++) {
            unordered_set<int> seen;
            for (int j = i; j < n; j++) {
                seen.insert(nums[j]);
                if (seen.size() > k) {
                    break;
                }
                if (seen.size() == k) {
                    res++;
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
    subarraysWithKDistinct(nums, k) {
        let n = nums.length,
            res = 0;

        for (let i = 0; i < n; i++) {
            let seen = new Set();
            for (let j = i; j < n; j++) {
                seen.add(nums[j]);
                if (seen.size > k) {
                    break;
                }
                if (seen.size === k) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int SubarraysWithKDistinct(int[] nums, int k) {
        int n = nums.Length;
        int res = 0;

        for (int i = 0; i < n; i++) {
            HashSet<int> seen = new HashSet<int>();
            for (int j = i; j < n; j++) {
                seen.Add(nums[j]);
                if (seen.Count > k) {
                    break;
                }
                if (seen.Count == k) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```go
func subarraysWithKDistinct(nums []int, k int) int {
    n, res := len(nums), 0

    for i := 0; i < n; i++ {
        seen := make(map[int]bool)
        for j := i; j < n; j++ {
            seen[nums[j]] = true
            if len(seen) > k {
                break
            }
            if len(seen) == k {
                res++
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun subarraysWithKDistinct(nums: IntArray, k: Int): Int {
        val n = nums.size
        var res = 0

        for (i in 0 until n) {
            val seen = HashSet<Int>()
            for (j in i until n) {
                seen.add(nums[j])
                if (seen.size > k) {
                    break
                }
                if (seen.size == k) {
                    res++
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func subarraysWithKDistinct(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        var res = 0

        for i in 0..<n {
            var seen = Set<Int>()
            for j in i..<n {
                seen.insert(nums[j])
                if seen.count > k {
                    break
                }
                if seen.count == k {
                    res += 1
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Sliding Window

### Intuition

Counting subarrays with exactly `k` distinct values is tricky because adding an element can either increase or maintain the count of distinct values. A clever observation is that we can reframe the problem: subarrays with exactly `k` distinct = subarrays with at most `k` distinct minus subarrays with at most `k-1` distinct. Counting "at most k" is easier using a sliding window that shrinks whenever we exceed `k` distinct values.

### Algorithm

1. Define a helper function `atMostK(k)` that counts subarrays with at most `k` distinct values:
   - Use two pointers `l` and `r` to define the window.
   - Maintain a frequency map to track counts of elements in the window.
   - Expand `r` and add each element to the map.
   - When distinct count exceeds `k`, shrink from `l` until we have at most `k` distinct.
   - For each position of `r`, add `(r - l + 1)` to the result, representing all valid subarrays ending at `r`.
2. Return `atMostK(k) - atMostK(k - 1)`.

::tabs-start

```python
class Solution:
    def subarraysWithKDistinct(self, nums: List[int], k: int) -> int:

        def atMostK(k):
            count = defaultdict(int)
            res = l = 0

            for r in range(len(nums)):
                count[nums[r]] += 1
                if count[nums[r]] == 1:
                    k -= 1

                while k < 0:
                    count[nums[l]] -= 1
                    if count[nums[l]] == 0:
                        k += 1
                    l += 1

                res += (r - l + 1)

            return res

        return atMostK(k) - atMostK(k - 1)
```

```java
public class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        return atMostK(nums, k) - atMostK(nums, k - 1);
    }

    private int atMostK(int[] nums, int k) {
        HashMap<Integer, Integer> count = new HashMap<>();
        int res = 0, l = 0;

        for (int r = 0; r < nums.length; r++) {
            count.put(nums[r], count.getOrDefault(nums[r], 0) + 1);
            if (count.get(nums[r]) == 1) {
                k--;
            }

            while (k < 0) {
                count.put(nums[l], count.get(nums[l]) - 1);
                if (count.get(nums[l]) == 0) {
                    k++;
                }
                l++;
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
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        return atMostK(nums, k) - atMostK(nums, k - 1);
    }

private:
    int atMostK(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        int res = 0, l = 0;

        for (int r = 0; r < nums.size(); r++) {
            count[nums[r]]++;
            if (count[nums[r]] == 1) {
                k--;
            }

            while (k < 0) {
                count[nums[l]]--;
                if (count[nums[l]] == 0) {
                    k++;
                }
                l++;
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
    subarraysWithKDistinct(nums, k) {
        const atMostK = (k) => {
            const count = new Map();
            let res = 0,
                l = 0;

            for (let r = 0; r < nums.length; r++) {
                count.set(nums[r], (count.get(nums[r]) || 0) + 1);
                if (count.get(nums[r]) === 1) {
                    k--;
                }

                while (k < 0) {
                    count.set(nums[l], count.get(nums[l]) - 1);
                    if (count.get(nums[l]) === 0) {
                        k++;
                    }
                    l++;
                }

                res += r - l + 1;
            }

            return res;
        };

        return atMostK(k) - atMostK(k - 1);
    }
}
```

```csharp
public class Solution {
    public int SubarraysWithKDistinct(int[] nums, int k) {
        return AtMostK(nums, k) - AtMostK(nums, k - 1);
    }

    private int AtMostK(int[] nums, int k) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        int res = 0, l = 0;

        for (int r = 0; r < nums.Length; r++) {
            if (!count.ContainsKey(nums[r])) {
                count[nums[r]] = 0;
            }
            count[nums[r]]++;
            if (count[nums[r]] == 1) {
                k--;
            }

            while (k < 0) {
                count[nums[l]]--;
                if (count[nums[l]] == 0) {
                    count.Remove(nums[l]);
                    k++;
                }
                l++;
            }

            res += (r - l + 1);
        }

        return res;
    }
}
```

```go
func subarraysWithKDistinct(nums []int, k int) int {
    atMostK := func(k int) int {
        count := make(map[int]int)
        res, l := 0, 0

        for r := 0; r < len(nums); r++ {
            count[nums[r]]++
            if count[nums[r]] == 1 {
                k--
            }

            for k < 0 {
                count[nums[l]]--
                if count[nums[l]] == 0 {
                    delete(count, nums[l])
                    k++
                }
                l++
            }

            res += r - l + 1
        }

        return res
    }

    return atMostK(k) - atMostK(k-1)
}
```

```kotlin
class Solution {
    fun subarraysWithKDistinct(nums: IntArray, k: Int): Int {
        return atMostK(nums, k) - atMostK(nums, k - 1)
    }

    private fun atMostK(nums: IntArray, k: Int): Int {
        var k = k
        val count = HashMap<Int, Int>()
        var res = 0
        var l = 0

        for (r in nums.indices) {
            count[nums[r]] = count.getOrDefault(nums[r], 0) + 1
            if (count[nums[r]] == 1) {
                k--
            }

            while (k < 0) {
                count[nums[l]] = count[nums[l]]!! - 1
                if (count[nums[l]] == 0) {
                    count.remove(nums[l])
                    k++
                }
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
    func subarraysWithKDistinct(_ nums: [Int], _ k: Int) -> Int {
        func atMostK(_ k: Int) -> Int {
            var k = k
            var count = [Int: Int]()
            var res = 0
            var l = 0

            for r in 0..<nums.count {
                count[nums[r], default: 0] += 1
                if count[nums[r]] == 1 {
                    k -= 1
                }

                while k < 0 {
                    count[nums[l]]! -= 1
                    if count[nums[l]] == 0 {
                        count.removeValue(forKey: nums[l])
                        k += 1
                    }
                    l += 1
                }

                res += r - l + 1
            }

            return res
        }

        return atMostK(k) - atMostK(k - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Sliding Window (One Pass) - I

### Intuition

Instead of computing "at most k" twice, we can count exactly `k` in a single pass by tracking a range of valid left boundaries. For any right pointer position with exactly `k` distinct values, there may be multiple valid starting positions. We maintain two left pointers: `l_far` marks the leftmost valid start, and `l_near` marks the rightmost valid start (where the leftmost element appears exactly once). The count of valid subarrays ending at `r` is `l_near - l_far + 1`.

### Algorithm

1. Initialize `l_far` and `l_near` to `0`, and a frequency map `count`.
2. For each right pointer `r`:
   - Add `nums[r]` to the frequency map.
   - If distinct count exceeds `k`, shrink by moving `l_near` right and removing elements until we have `k` distinct. Set `l_far = l_near`.
   - While the leftmost element has count greater than `1`, decrement its count and move `l_near` right.
   - If we have exactly `k` distinct values, add `l_near - l_far + 1` to the result.
3. Return the result.

::tabs-start

```python
class Solution:
    def subarraysWithKDistinct(self, nums: List[int], k: int) -> int:
        count = defaultdict(int)
        res = 0
        l_far = 0
        l_near = 0

        for r in range(len(nums)):
            count[nums[r]] += 1

            while len(count) > k:
                count[nums[l_near]] -= 1
                if count[nums[l_near]] == 0:
                    count.pop(nums[l_near])
                l_near += 1
                l_far = l_near

            while count[nums[l_near]] > 1:
                count[nums[l_near]] -= 1
                l_near += 1

            if len(count) == k:
                res += l_near - l_far + 1

        return res
```

```java
public class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        HashMap<Integer, Integer> count = new HashMap<>();
        int res = 0, l_far = 0, l_near = 0;

        for (int r = 0; r < nums.length; r++) {
            count.put(nums[r], count.getOrDefault(nums[r], 0) + 1);

            while (count.size() > k) {
                count.put(nums[l_near], count.get(nums[l_near]) - 1);
                if (count.get(nums[l_near]) == 0) {
                    count.remove(nums[l_near]);
                }
                l_near++;
                l_far = l_near;
            }

            while (count.get(nums[l_near]) > 1) {
                count.put(nums[l_near], count.get(nums[l_near]) - 1);
                l_near++;
            }

            if (count.size() == k) {
                res += l_near - l_far + 1;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        int res = 0, l_far = 0, l_near = 0;

        for (int r = 0; r < nums.size(); r++) {
            count[nums[r]]++;

            while (count.size() > k) {
                count[nums[l_near]]--;
                if (count[nums[l_near]] == 0) {
                    count.erase(nums[l_near]);
                }
                l_near++;
                l_far = l_near;
            }

            while (count[nums[l_near]] > 1) {
                count[nums[l_near]]--;
                l_near++;
            }

            if (count.size() == k) {
                res += l_near - l_far + 1;
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
    subarraysWithKDistinct(nums, k) {
        const count = new Map();
        let res = 0,
            l_far = 0,
            l_near = 0;

        for (let r = 0; r < nums.length; r++) {
            count.set(nums[r], (count.get(nums[r]) || 0) + 1);

            while (count.size > k) {
                count.set(nums[l_near], count.get(nums[l_near]) - 1);
                if (count.get(nums[l_near]) === 0) {
                    count.delete(nums[l_near]);
                }
                l_near++;
            }

            while (count.get(nums[l_near]) > 1) {
                count.set(nums[l_near], count.get(nums[l_near]) - 1);
                l_near++;
            }

            if (count.size === k) {
                res += l_near - l_far + 1;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int SubarraysWithKDistinct(int[] nums, int k) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        int res = 0, l_far = 0, l_near = 0;

        for (int r = 0; r < nums.Length; r++) {
            if (!count.ContainsKey(nums[r])) {
                count[nums[r]] = 0;
            }
            count[nums[r]]++;

            while (count.Count > k) {
                count[nums[l_near]]--;
                if (count[nums[l_near]] == 0) {
                    count.Remove(nums[l_near]);
                }
                l_near++;
                l_far = l_near;
            }

            while (count[nums[l_near]] > 1) {
                count[nums[l_near]]--;
                l_near++;
            }

            if (count.Count == k) {
                res += l_near - l_far + 1;
            }
        }

        return res;
    }
}
```

```go
func subarraysWithKDistinct(nums []int, k int) int {
    count := make(map[int]int)
    res, lFar, lNear := 0, 0, 0

    for r := 0; r < len(nums); r++ {
        count[nums[r]]++

        for len(count) > k {
            count[nums[lNear]]--
            if count[nums[lNear]] == 0 {
                delete(count, nums[lNear])
            }
            lNear++
            lFar = lNear
        }

        for count[nums[lNear]] > 1 {
            count[nums[lNear]]--
            lNear++
        }

        if len(count) == k {
            res += lNear - lFar + 1
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun subarraysWithKDistinct(nums: IntArray, k: Int): Int {
        val count = HashMap<Int, Int>()
        var res = 0
        var lFar = 0
        var lNear = 0

        for (r in nums.indices) {
            count[nums[r]] = count.getOrDefault(nums[r], 0) + 1

            while (count.size > k) {
                count[nums[lNear]] = count[nums[lNear]]!! - 1
                if (count[nums[lNear]] == 0) {
                    count.remove(nums[lNear])
                }
                lNear++
                lFar = lNear
            }

            while (count[nums[lNear]]!! > 1) {
                count[nums[lNear]] = count[nums[lNear]]!! - 1
                lNear++
            }

            if (count.size == k) {
                res += lNear - lFar + 1
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func subarraysWithKDistinct(_ nums: [Int], _ k: Int) -> Int {
        var count = [Int: Int]()
        var res = 0
        var lFar = 0
        var lNear = 0

        for r in 0..<nums.count {
            count[nums[r], default: 0] += 1

            while count.count > k {
                count[nums[lNear]]! -= 1
                if count[nums[lNear]] == 0 {
                    count.removeValue(forKey: nums[lNear])
                }
                lNear += 1
                lFar = lNear
            }

            while count[nums[lNear]]! > 1 {
                count[nums[lNear]]! -= 1
                lNear += 1
            }

            if count.count == k {
                res += lNear - lFar + 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Sliding Window (One Pass) - II

### Intuition

This approach simplifies the previous one by using a single left pointer and a counter `cnt` to track how many positions we can extend the left boundary. When we have exactly `k` distinct values, we shrink the window from the left as long as the leftmost element has duplicates, incrementing `cnt` each time. The number of valid subarrays ending at the current position is `cnt + 1`.

### Algorithm

1. Create an array `count` of size `n + 1` for frequency tracking (since values are in range `[1, n]`).
2. Initialize `l`, `cnt`, and `res` to `0`.
3. For each right pointer `r`:
   - Increment `count[nums[r]]`. If this is a new distinct value, decrement `k`.
   - If `k < 0` (more than k distinct), decrement `count[nums[l]]`, increment `l`, increment `k`, and reset `cnt = 0`.
   - If `k == 0` (exactly k distinct), shrink from the left while `count[nums[l]] > 1`, incrementing `cnt` each time.
   - Add `cnt + 1` to `res`.
4. Return `res`.

::tabs-start

```python
class Solution:
    def subarraysWithKDistinct(self, nums: List[int], k: int) -> int:
        n = len(nums)
        count = [0] * (n + 1)
        res = l = cnt = 0

        for r in range(n):
            count[nums[r]] += 1
            if count[nums[r]] == 1:
                k -= 1

            if k < 0:
                count[nums[l]] -= 1
                l += 1
                k += 1
                cnt = 0

            if k == 0:
                while count[nums[l]] > 1:
                    count[nums[l]] -= 1
                    l += 1
                    cnt += 1

                res += (cnt + 1)

        return res
```

```java
public class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        int n = nums.length;
        int[] count = new int[n + 1];
        int res = 0, l = 0, cnt = 0;

        for (int r = 0; r < n; r++) {
            count[nums[r]]++;
            if (count[nums[r]] == 1) {
                k--;
            }

            if (k < 0) {
                count[nums[l]]--;
                l++;
                k++;
                cnt = 0;
            }

            if (k == 0) {
                while (count[nums[l]] > 1) {
                    count[nums[l]]--;
                    l++;
                    cnt++;
                }

                res += (cnt + 1);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> count(n + 1, 0);
        int res = 0, l = 0, cnt = 0;

        for (int r = 0; r < n; r++) {
            count[nums[r]]++;
            if (count[nums[r]] == 1) {
                k--;
            }

            if (k < 0) {
                count[nums[l]]--;
                l++;
                k++;
                cnt = 0;
            }

            if (k == 0) {
                while (count[nums[l]] > 1) {
                    count[nums[l]]--;
                    l++;
                    cnt++;
                }

                res += (cnt + 1);
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
    subarraysWithKDistinct(nums, k) {
        const n = nums.length;
        const count = new Array(n + 1).fill(0);
        let res = 0,
            l = 0,
            cnt = 0;

        for (let r = 0; r < n; r++) {
            count[nums[r]]++;
            if (count[nums[r]] === 1) {
                k--;
            }

            if (k < 0) {
                count[nums[l]]--;
                l++;
                k++;
                cnt = 0;
            }

            if (k === 0) {
                while (count[nums[l]] > 1) {
                    count[nums[l]]--;
                    l++;
                    cnt++;
                }

                res += cnt + 1;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int SubarraysWithKDistinct(int[] nums, int k) {
        int n = nums.Length;
        int[] count = new int[n + 1];
        int res = 0, l = 0, cnt = 0;

        for (int r = 0; r < n; r++) {
            count[nums[r]]++;
            if (count[nums[r]] == 1) {
                k--;
            }

            if (k < 0) {
                count[nums[l]]--;
                l++;
                k++;
                cnt = 0;
            }

            if (k == 0) {
                while (count[nums[l]] > 1) {
                    count[nums[l]]--;
                    l++;
                    cnt++;
                }
                res += (cnt + 1);
            }
        }

        return res;
    }
}
```

```go
func subarraysWithKDistinct(nums []int, k int) int {
    n := len(nums)
    count := make([]int, n+1)
    res, l, cnt := 0, 0, 0

    for r := 0; r < n; r++ {
        count[nums[r]]++
        if count[nums[r]] == 1 {
            k--
        }

        if k < 0 {
            count[nums[l]]--
            l++
            k++
            cnt = 0
        }

        if k == 0 {
            for count[nums[l]] > 1 {
                count[nums[l]]--
                l++
                cnt++
            }
            res += cnt + 1
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun subarraysWithKDistinct(nums: IntArray, k: Int): Int {
        var k = k
        val n = nums.size
        val count = IntArray(n + 1)
        var res = 0
        var l = 0
        var cnt = 0

        for (r in 0 until n) {
            count[nums[r]]++
            if (count[nums[r]] == 1) {
                k--
            }

            if (k < 0) {
                count[nums[l]]--
                l++
                k++
                cnt = 0
            }

            if (k == 0) {
                while (count[nums[l]] > 1) {
                    count[nums[l]]--
                    l++
                    cnt++
                }
                res += cnt + 1
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func subarraysWithKDistinct(_ nums: [Int], _ k: Int) -> Int {
        var k = k
        let n = nums.count
        var count = [Int](repeating: 0, count: n + 1)
        var res = 0
        var l = 0
        var cnt = 0

        for r in 0..<n {
            count[nums[r]] += 1
            if count[nums[r]] == 1 {
                k -= 1
            }

            if k < 0 {
                count[nums[l]] -= 1
                l += 1
                k += 1
                cnt = 0
            }

            if k == 0 {
                while count[nums[l]] > 1 {
                    count[nums[l]] -= 1
                    l += 1
                    cnt += 1
                }
                res += cnt + 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Trying to Count Exactly K Directly with a Single Sliding Window

A single sliding window can only count subarrays with "at most k" distinct values, not "exactly k." To count exactly `k`, you must use the formula `atMostK(k) - atMostK(k-1)` or maintain two pointers to track a range of valid left boundaries.

### Off-by-One Errors in Subarray Counting

When counting subarrays ending at position `r`, the count is `r - l + 1`, not `r - l`. This represents all subarrays starting at any position from `l` to `r` and ending at `r`. Forgetting the `+1` leads to undercounting.

### Not Properly Tracking When Distinct Count Changes

When a new element is added, increment the distinct count only if its frequency becomes `1` (first occurrence). When removing, decrement the distinct count only when its frequency drops to `0`. Using set size directly on every operation is less efficient and error-prone.

### Resetting State Incorrectly in the One-Pass Approach

In the one-pass sliding window variant, when the distinct count exceeds `k`, you must reset the accumulated count `cnt` to `0`. Forgetting this reset causes the algorithm to incorrectly carry over counts from invalid window states.

### Confusing the Two Left Pointers in One-Pass Solutions

The one-pass approach uses two left pointers: `l_far` (leftmost valid start) and `l_near` (rightmost valid start where the leftmost element appears exactly once). Mixing up their roles or forgetting to update `l_far = l_near` when shrinking past `k` distinct values produces incorrect results.
