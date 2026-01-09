## 1. Brute Force

### Intuition

The operation lets us pick a subarray and add a constant to every element in it. Our goal is to maximize how often some value `k` appears. The key insight is that we want to convert elements of some value `num` into `k` by choosing the right constant. For each candidate `num`, we try every possible subarray, count how many `num` values we convert to `k`, and subtract any `k` values that get changed to something else within the subarray.

### Algorithm

1. Count how many times `k` appears in the array (call it `cntK`).
2. For each possible value `num` from `1` to `50` (excluding `k`):
   - For each starting index `i`:
     - Reset the count and iterate through all ending indices `j`.
     - Increment count when we see `num` (it becomes `k` after the operation).
     - Decrement `cntK` when we see `k` (it changes to something else).
     - Track the maximum of `cntK + count`.
3. Return the maximum frequency found.

::tabs-start

```python
class Solution:
    def maxFrequency(self, nums: List[int], k: int) -> int:
        n = len(nums)
        cntK = nums.count(k)
        res = cntK

        for num in range(1, 51):
            if num == k: continue
            for i in range(n):
                tmp, cnt = cntK, 0
                for j in range(i, n):
                    if nums[j] == num:
                        cnt += 1
                    elif nums[j] == k:
                        cntK -= 1
                    res = max(res, cnt + cntK)

                cntK = tmp

        return res
```

```java
public class Solution {
    public int maxFrequency(int[] nums, int k) {
        int n = nums.length;
        int cntK = 0;
        for (int x : nums) if (x == k) cntK++;
        int res = cntK;

        for (int num = 1; num <= 50; num++) {
            if (num == k) continue;
            for (int i = 0; i < n; i++) {
                int tmp = cntK;
                int cnt = 0;
                for (int j = i; j < n; j++) {
                    if (nums[j] == num) {
                        cnt++;
                    } else if (nums[j] == k) {
                        cntK--;
                    }
                    res = Math.max(res, cnt + cntK);
                }
                cntK = tmp;
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
        int n = nums.size();
        int cntK = 0;
        for (int x : nums) if (x == k) cntK++;
        int res = cntK;

        for (int num = 1; num <= 50; num++) {
            if (num == k) continue;
            for (int i = 0; i < n; i++) {
                int tmp = cntK, cnt = 0;
                for (int j = i; j < n; j++) {
                    if (nums[j] == num) {
                        cnt++;
                    } else if (nums[j] == k) {
                        cntK--;
                    }
                    res = max(res, cnt + cntK);
                }
                cntK = tmp;
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
        const n = nums.length;
        let cntK = nums.filter(x => x === k).length;
        let res = cntK;

        for (let num = 1; num <= 50; num++) {
            if (num === k) continue;
            for (let i = 0; i < n; i++) {
                const tmp = cntK;
                let cnt = 0;
                for (let j = i; j < n; j++) {
                    if (nums[j] === num) {
                        cnt++;
                    } else if (nums[j] === k) {
                        cntK--;
                    }
                    res = Math.max(res, cnt + cntK);
                }
                cntK = tmp;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxFrequency(int[] nums, int k) {
        int n = nums.Length;
        int cntK = 0;
        foreach (var x in nums) if (x == k) cntK++;
        int res = cntK;

        for (int num = 1; num <= 50; num++) {
            if (num == k) continue;
            for (int i = 0; i < n; i++) {
                int tmp = cntK;
                int cnt = 0;
                for (int j = i; j < n; j++) {
                    if (nums[j] == num) {
                        cnt++;
                    } else if (nums[j] == k) {
                        cntK--;
                    }
                    res = Math.Max(res, cnt + cntK);
                }
                cntK = tmp;
            }
        }
        return res;
    }
}
```

```go
func maxFrequency(nums []int, k int) int {
    n := len(nums)
    cntK := 0
    for _, x := range nums {
        if x == k {
            cntK++
        }
    }
    res := cntK

    for num := 1; num <= 50; num++ {
        if num == k {
            continue
        }
        for i := 0; i < n; i++ {
            tmp := cntK
            cnt := 0
            for j := i; j < n; j++ {
                if nums[j] == num {
                    cnt++
                } else if nums[j] == k {
                    cntK--
                }
                if cnt+cntK > res {
                    res = cnt + cntK
                }
            }
            cntK = tmp
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxFrequency(nums: IntArray, k: Int): Int {
        val n = nums.size
        var cntK = nums.count { it == k }
        var res = cntK

        for (num in 1..50) {
            if (num == k) continue
            for (i in 0 until n) {
                val tmp = cntK
                var cnt = 0
                for (j in i until n) {
                    if (nums[j] == num) {
                        cnt++
                    } else if (nums[j] == k) {
                        cntK--
                    }
                    res = maxOf(res, cnt + cntK)
                }
                cntK = tmp
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxFrequency(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        var cntK = nums.filter { $0 == k }.count
        var res = cntK

        for num in 1...50 {
            if num == k { continue }
            for i in 0..<n {
                let tmp = cntK
                var cnt = 0
                for j in i..<n {
                    if nums[j] == num {
                        cnt += 1
                    } else if nums[j] == k {
                        cntK -= 1
                    }
                    res = max(res, cnt + cntK)
                }
                cntK = tmp
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(50 * n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Kadane's Algorithm - I

### Intuition

The brute force tries all subarrays, but we can use Kadane's algorithm to find the best subarray in linear time. For a fixed target value `num`, we want to find a subarray where converting `num` to `k` gives the maximum net gain. Treat each `num` as `+1` (we gain a `k`) and each `k` as `-1` (we lose a `k`). Kadane's algorithm finds the maximum sum subarray, giving us the best gain for that target.

### Algorithm

1. Count how many times `k` appears in the array (call it `cntK`).
2. For each possible value `i` from `1` to `50` (excluding `k`):
   - Initialize `cnt = 0`.
   - For each element in the array:
     - Add `1` if the element equals `i`.
     - Subtract `1` if the element equals `k`.
     - Reset `cnt` to `0` if it goes negative (Kadane's reset).
     - Track the maximum of `cntK + cnt`.
3. Return the maximum frequency found.

::tabs-start

```python
class Solution:
    def maxFrequency(self, nums: List[int], k: int) -> int:
        cntK = nums.count(k)
        res = 0

        for i in range(1, 51):
            if i == k:
                continue
            cnt = 0
            for num in nums:
                if num == i:
                    cnt += 1
                if num == k:
                    cnt -= 1
                cnt = max(cnt, 0)
                res = max(res, cntK + cnt)
        return res
```

```java
public class Solution {
    public int maxFrequency(int[] nums, int k) {
        int cntK = 0;
        for (int num : nums) {
            if (num == k) cntK++;
        }
        int res = 0;

        for (int i = 1; i <= 50; i++) {
            if (i == k) continue;
            int cnt = 0;
            for (int num : nums) {
                if (num == i) cnt++;
                if (num == k) cnt--;
                cnt = Math.max(cnt, 0);
                res = Math.max(res, cntK + cnt);
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
        int cntK = 0;
        for (int num : nums) {
            if (num == k) cntK++;
        }
        int res = 0;

        for (int i = 1; i <= 50; i++) {
            if (i == k) continue;
            int cnt = 0;
            for (int num : nums) {
                if (num == i) cnt++;
                if (num == k) cnt--;
                cnt = max(cnt, 0);
                res = max(res, cntK + cnt);
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
        let cntK = 0;
        for (const num of nums) {
            if (num === k) cntK++;
        }
        let res = 0;

        for (let i = 1; i <= 50; i++) {
            if (i === k) continue;
            let cnt = 0;
            for (const num of nums) {
                if (num === i) cnt++;
                if (num === k) cnt--;
                cnt = Math.max(cnt, 0);
                res = Math.max(res, cntK + cnt);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxFrequency(int[] nums, int k) {
        int cntK = 0;
        foreach (var num in nums) {
            if (num == k) cntK++;
        }
        int res = 0;

        for (int i = 1; i <= 50; i++) {
            if (i == k) continue;
            int cnt = 0;
            foreach (var num in nums) {
                if (num == i) cnt++;
                if (num == k) cnt--;
                cnt = Math.Max(cnt, 0);
                res = Math.Max(res, cntK + cnt);
            }
        }
        return res;
    }
}
```

```go
func maxFrequency(nums []int, k int) int {
    cntK := 0
    for _, num := range nums {
        if num == k {
            cntK++
        }
    }
    res := 0

    for i := 1; i <= 50; i++ {
        if i == k {
            continue
        }
        cnt := 0
        for _, num := range nums {
            if num == i {
                cnt++
            }
            if num == k {
                cnt--
            }
            if cnt < 0 {
                cnt = 0
            }
            if cntK+cnt > res {
                res = cntK + cnt
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxFrequency(nums: IntArray, k: Int): Int {
        val cntK = nums.count { it == k }
        var res = 0

        for (i in 1..50) {
            if (i == k) continue
            var cnt = 0
            for (num in nums) {
                if (num == i) cnt++
                if (num == k) cnt--
                cnt = maxOf(cnt, 0)
                res = maxOf(res, cntK + cnt)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxFrequency(_ nums: [Int], _ k: Int) -> Int {
        let cntK = nums.filter { $0 == k }.count
        var res = 0

        for i in 1...50 {
            if i == k { continue }
            var cnt = 0
            for num in nums {
                if num == i { cnt += 1 }
                if num == k { cnt -= 1 }
                cnt = max(cnt, 0)
                res = max(res, cntK + cnt)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(50 * n)$
* Space complexity: $O(1)$

---

## 3. Kadane's Algorithm - II

### Intuition

We can process all target values simultaneously in a single pass. For each number, we track the best running sum ending at the current position. When we see a number, its count can either extend from its previous best or start fresh from `k`'s position (since we could start our subarray here). The maximum difference between any count and `k`'s count represents the best gain achievable.

### Algorithm

1. Maintain a hash map `cnt` where `cnt[num]` represents the best running sum ending at the current position for converting `num` to `k`.
2. For each element in the array:
   - Update `cnt[num] = max(cnt[num], cnt[k]) + 1`.
   - Track the maximum value of `cnt[num] - cnt[k]`.
3. Return `cnt[k] + res`, where `res` is the maximum gain found.

::tabs-start

```python
class Solution:
    def maxFrequency(self, nums: List[int], k: int) -> int:
        cnt = defaultdict(int)
        res = 0
        for num in nums:
            cnt[num] = max(cnt[num], cnt[k]) + 1
            res = max(res, cnt[num] - cnt[k])
        return cnt[k] + res
```

```java
public class Solution {
    public int maxFrequency(int[] nums, int k) {
        Map<Integer, Integer> cnt = new HashMap<>();
        int res = 0;
        for (int num : nums) {
            int prev = Math.max(cnt.getOrDefault(num, 0), cnt.getOrDefault(k, 0));
            cnt.put(num, prev + 1);
            res = Math.max(res, cnt.get(num) - cnt.getOrDefault(k, 0));
        }
        return cnt.getOrDefault(k, 0) + res;
    }
}
```

```cpp
class Solution {
public:
    int maxFrequency(vector<int>& nums, int k) {
        unordered_map<int,int> cnt;
        int res = 0;
        for (int num : nums) {
            int prev = max(cnt[num], cnt[k]);
            cnt[num] = prev + 1;
            res = max(res, cnt[num] - cnt[k]);
        }
        return cnt[k] + res;
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
        const cnt = new Map();
        let res = 0;
        for (const num of nums) {
            const prev = Math.max(cnt.get(num) || 0, cnt.get(k) || 0);
            cnt.set(num, prev + 1);
            res = Math.max(res, cnt.get(num) - (cnt.get(k) || 0));
        }
        return (cnt.get(k) || 0) + res;
    }
}
```

```csharp
public class Solution {
    public int MaxFrequency(int[] nums, int k) {
        var cnt = new Dictionary<int,int>();
        int res = 0;
        foreach (var num in nums) {
            int prev = Math.Max(
                cnt.TryGetValue(num, out var cn) ? cn : 0,
                cnt.TryGetValue(k, out var ck) ? ck : 0
            );
            cnt[num] = prev + 1;
            res = Math.Max(res, cnt[num] - (cnt.TryGetValue(k, out ck) ? ck : 0));
        }
        return (cnt.TryGetValue(k, out var ckk) ? ckk : 0) + res;
    }
}
```

```go
func maxFrequency(nums []int, k int) int {
    cnt := make(map[int]int)
    res := 0
    for _, num := range nums {
        prev := cnt[num]
        if cnt[k] > prev {
            prev = cnt[k]
        }
        cnt[num] = prev + 1
        if cnt[num]-cnt[k] > res {
            res = cnt[num] - cnt[k]
        }
    }
    return cnt[k] + res
}
```

```kotlin
class Solution {
    fun maxFrequency(nums: IntArray, k: Int): Int {
        val cnt = mutableMapOf<Int, Int>()
        var res = 0
        for (num in nums) {
            val prev = maxOf(cnt.getOrDefault(num, 0), cnt.getOrDefault(k, 0))
            cnt[num] = prev + 1
            res = maxOf(res, cnt[num]!! - cnt.getOrDefault(k, 0))
        }
        return cnt.getOrDefault(k, 0) + res
    }
}
```

```swift
class Solution {
    func maxFrequency(_ nums: [Int], _ k: Int) -> Int {
        var cnt = [Int: Int]()
        var res = 0
        for num in nums {
            let prev = max(cnt[num, default: 0], cnt[k, default: 0])
            cnt[num] = prev + 1
            res = max(res, cnt[num]! - cnt[k, default: 0])
        }
        return cnt[k, default: 0] + res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(50)$