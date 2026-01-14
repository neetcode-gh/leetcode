## 1. Brute Force (Recursion)

### Intuition

We generate all possible subsequences using recursion, tracking the minimum and maximum values chosen so far. If a non-empty subsequence has `min + max <= target`, we count it. This explores the full power set of the array.

### Algorithm

1. Use a recursive function with parameters for current index, running `max`, and running `min`.
2. At each index, branch into two choices: skip the element or include it.
3. When including, update the running `min` and `max`.
4. At the end of the array, check if we have a valid non-empty subsequence where `min + max <= target`.
5. Return the total count modulo `10^9 + 7`.

::tabs-start

```python
class Solution:
    def numSubseq(self, nums: List[int], target: int) -> int:
        MOD = 1000000007

        def dfs(maxi, mini, i):
            if i == len(nums):
                if mini != float("inf") and (maxi + mini) <= target:
                    return 1
                return 0

            skip = dfs(maxi, mini, i + 1)
            include = dfs(max(maxi, nums[i]), min(mini, nums[i]), i + 1)
            return (skip + include) % MOD

        return dfs(float("-inf"), float("inf"), 0)
```

```java
public class Solution {
    private static final int MOD = 1000000007;

    public int numSubseq(int[] nums, int target) {
        return dfs(nums, Integer.MIN_VALUE, Integer.MAX_VALUE, 0, target);
    }

    private int dfs(int[] nums, int maxi, int mini, int i, int target) {
        if (i == nums.length) {
            if (mini != Integer.MAX_VALUE && (maxi + mini) <= target) {
                return 1;
            }
            return 0;
        }

        int skip = dfs(nums, maxi, mini, i + 1, target);
        int include = dfs(nums, Math.max(maxi, nums[i]), Math.min(mini, nums[i]), i + 1, target);
        return (skip + include) % MOD;
    }
}
```

```cpp
class Solution {
public:
    const int MOD = 1e9 + 7;

    int numSubseq(vector<int>& nums, int target) {
        return dfs(nums, INT_MIN, INT_MAX, 0, target);
    }

private:
    int dfs(vector<int>& nums, int maxi, int mini, int i, int target) {
        if (i == nums.size()) {
            if (mini != INT_MAX && (maxi + mini) <= target) {
                return 1;
            }
            return 0;
        }

        int skip = dfs(nums, maxi, mini, i + 1, target);
        int include = dfs(nums, max(maxi, nums[i]), min(mini, nums[i]), i + 1, target);
        return (skip + include) % MOD;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    numSubseq(nums, target) {
        const MOD = 1000000007;

        const dfs = (maxi, mini, i) => {
            if (i === nums.length) {
                if (mini !== Infinity && maxi + mini <= target) {
                    return 1;
                }
                return 0;
            }

            const skip = dfs(maxi, mini, i + 1);
            const include = dfs(
                Math.max(maxi, nums[i]),
                Math.min(mini, nums[i]),
                i + 1,
            );
            return (skip + include) % MOD;
        };

        return dfs(-Infinity, Infinity, 0);
    }
}
```

```csharp
public class Solution {
    const int MOD = 1000000007;
    int[] nums;
    int target;

    public int NumSubseq(int[] nums, int target) {
        this.nums = nums;
        this.target = target;
        return Dfs(int.MinValue, int.MaxValue, 0);
    }

    int Dfs(int maxi, int mini, int i) {
        if (i == nums.Length) {
            if (mini != int.MaxValue && (maxi + mini) <= target)
                return 1;
            return 0;
        }

        int skip = Dfs(maxi, mini, i + 1);
        int include = Dfs(Math.Max(maxi, nums[i]), Math.Min(mini, nums[i]), i + 1);
        return (int)(((long)skip + include) % MOD);
    }
}
```

```go
func numSubseq(nums []int, target int) int {
    MOD := 1000000007
    n := len(nums)

    var dfs func(maxi, mini, i int) int
    dfs = func(maxi, mini, i int) int {
        if i == n {
            if mini != 1<<31-1 && (maxi+mini) <= target {
                return 1
            }
            return 0
        }

        skip := dfs(maxi, mini, i+1)
        newMaxi := maxi
        if nums[i] > maxi {
            newMaxi = nums[i]
        }
        newMini := mini
        if nums[i] < mini {
            newMini = nums[i]
        }
        include := dfs(newMaxi, newMini, i+1)
        return (skip + include) % MOD
    }

    return dfs(-1<<31, 1<<31-1, 0)
}
```

```kotlin
class Solution {
    fun numSubseq(nums: IntArray, target: Int): Int {
        val MOD = 1000000007

        fun dfs(maxi: Int, mini: Int, i: Int): Int {
            if (i == nums.size) {
                return if (mini != Int.MAX_VALUE && (maxi + mini) <= target) 1 else 0
            }

            val skip = dfs(maxi, mini, i + 1)
            val include = dfs(maxOf(maxi, nums[i]), minOf(mini, nums[i]), i + 1)
            return ((skip.toLong() + include) % MOD).toInt()
        }

        return dfs(Int.MIN_VALUE, Int.MAX_VALUE, 0)
    }
}
```

```swift
class Solution {
    func numSubseq(_ nums: [Int], _ target: Int) -> Int {
        let MOD = 1000000007

        func dfs(_ maxi: Int, _ mini: Int, _ i: Int) -> Int {
            if i == nums.count {
                if mini != Int.max && (maxi + mini) <= target {
                    return 1
                }
                return 0
            }

            let skip = dfs(maxi, mini, i + 1)
            let include = dfs(max(maxi, nums[i]), min(mini, nums[i]), i + 1)
            return (skip + include) % MOD
        }

        return dfs(Int.min, Int.max, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Binary Search

### Intuition

After sorting, for each element as the minimum, we use binary search to find the rightmost element that can serve as the maximum (where `min + max <= target`). All elements between these two positions can freely be included or excluded, giving `2^(count)` valid subsequences with this minimum.

### Algorithm

1. Sort the array.
2. For each index `i` where `nums[i] * 2 <= target` (it can be both min and max):
   - Binary search for the largest index `r` where `nums[i] + nums[r] <= target`.
   - The elements between `i` and `r` can each be included or not, giving `2^(r-i)` subsequences.
3. Sum all counts modulo `10^9 + 7`.

::tabs-start

```python
class Solution:
    def numSubseq(self, nums: List[int], target: int) -> int:
        nums.sort()
        MOD = 1000000007
        res = 0

        for i in range(len(nums)):
            if nums[i] * 2 > target:
                break

            l, r = i, len(nums) - 1
            while l <= r:
                mid = (l + r) // 2
                if nums[i] + nums[mid] <= target:
                    l = mid + 1
                else:
                    r = mid - 1

            count = pow(2, r - i, MOD)
            res = (res + count) % MOD

        return res
```

```java
public class Solution {
    public int numSubseq(int[] nums, int target) {
        Arrays.sort(nums);
        int MOD = 1000000007;
        int res = 0;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] * 2 > target) break;

            int l = i, r = nums.length - 1;
            while (l <= r) {
                int mid = l + (r - l) / 2;
                if (nums[i] + nums[mid] <= target) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }

            long count = pow(2, r - i, MOD);
            res = (int) ((res + count) % MOD);
        }
        return res;
    }

    private long pow(int base, int exp, int mod) {
        long result = 1;
        long b = base;
        while (exp > 0) {
            if ((exp & 1) == 1) result = (result * b) % mod;
            b = (b * b) % mod;
            exp >>= 1;
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    int numSubseq(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int MOD = 1000000007;
        int res = 0;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] * 2 > target) break;

            int l = i, r = nums.size() - 1;
            while (l <= r) {
                int mid = l + (r - l) / 2;
                if (nums[i] + nums[mid] <= target) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }

            long long count = powMod(2, r - i, MOD);
            res = (res + count) % MOD;
        }
        return res;
    }

private:
    long long powMod(int base, int exp, int mod) {
        long long result = 1, b = base;
        while (exp > 0) {
            if (exp & 1) result = (result * b) % mod;
            b = (b * b) % mod;
            exp >>= 1;
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    numSubseq(nums, target) {
        nums.sort((a, b) => a - b);
        const MOD = BigInt(1000000007);
        let res = 0n;

        const powerMod = (base, exp, mod) => {
            let result = 1n,
                b = BigInt(base);
            while (exp > 0) {
                if (exp & 1) result = (result * b) % mod;
                b = (b * b) % mod;
                exp >>= 1;
            }
            return result;
        };

        for (let i = 0; i < nums.length; i++) {
            if (nums[i] * 2 > target) break;

            let l = i,
                r = nums.length - 1;
            while (l <= r) {
                const mid = Math.floor((l + r) / 2);
                if (nums[i] + nums[mid] <= target) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }

            const count = powerMod(2, r - i, MOD);
            res = (res + count) % MOD;
        }

        return Number(res);
    }
}
```

```csharp
public class Solution {
    public int NumSubseq(int[] nums, int target) {
        Array.Sort(nums);
        const int MOD = 1000000007;
        long res = 0;

        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] * 2 > target) break;

            int l = i, r = nums.Length - 1;
            while (l <= r) {
                int mid = (l + r) / 2;
                if (nums[i] + nums[mid] <= target) l = mid + 1;
                else r = mid - 1;
            }

            long count = ModPow(2, r - i, MOD);
            res = (res + count) % MOD;
        }

        return (int)res;
    }

    long ModPow(long a, int b, int mod) {
        long result = 1;
        while (b > 0) {
            if ((b & 1) == 1) result = (result * a) % mod;
            a = (a * a) % mod;
            b >>= 1;
        }
        return result;
    }
}
```

```go
func numSubseq(nums []int, target int) int {
    sort.Ints(nums)
    MOD := 1000000007
    res := 0

    powMod := func(base, exp, mod int) int {
        result := 1
        b := base
        for exp > 0 {
            if exp&1 == 1 {
                result = (result * b) % mod
            }
            b = (b * b) % mod
            exp >>= 1
        }
        return result
    }

    for i := 0; i < len(nums); i++ {
        if nums[i]*2 > target {
            break
        }

        l, r := i, len(nums)-1
        for l <= r {
            mid := l + (r-l)/2
            if nums[i]+nums[mid] <= target {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }

        count := powMod(2, r-i, MOD)
        res = (res + count) % MOD
    }
    return res
}
```

```kotlin
class Solution {
    fun numSubseq(nums: IntArray, target: Int): Int {
        nums.sort()
        val MOD = 1000000007
        var res = 0L

        fun powMod(base: Long, exp: Int, mod: Int): Long {
            var result = 1L
            var b = base
            var e = exp
            while (e > 0) {
                if (e and 1 == 1) result = (result * b) % mod
                b = (b * b) % mod
                e = e shr 1
            }
            return result
        }

        for (i in nums.indices) {
            if (nums[i] * 2 > target) break

            var l = i
            var r = nums.size - 1
            while (l <= r) {
                val mid = l + (r - l) / 2
                if (nums[i] + nums[mid] <= target) l = mid + 1
                else r = mid - 1
            }

            val count = powMod(2L, r - i, MOD)
            res = (res + count) % MOD
        }
        return res.toInt()
    }
}
```

```swift
class Solution {
    func numSubseq(_ nums: [Int], _ target: Int) -> Int {
        let nums = nums.sorted()
        let MOD = 1000000007
        var res = 0

        func powMod(_ base: Int, _ exp: Int, _ mod: Int) -> Int {
            var result = 1
            var b = base
            var e = exp
            while e > 0 {
                if e & 1 == 1 {
                    result = (result * b) % mod
                }
                b = (b * b) % mod
                e >>= 1
            }
            return result
        }

        for i in 0..<nums.count {
            if nums[i] * 2 > target { break }

            var l = i, r = nums.count - 1
            while l <= r {
                let mid = l + (r - l) / 2
                if nums[i] + nums[mid] <= target {
                    l = mid + 1
                } else {
                    r = mid - 1
                }
            }

            let count = powMod(2, r - i, MOD)
            res = (res + count) % MOD
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

## 3. Two Pointers

### Intuition

After sorting, we use two pointers. The left pointer represents the minimum element we must include. The right pointer starts at the end and shrinks inward until the sum constraint is satisfied. Since the array is sorted, once the right pointer moves left, it never needs to go back.

### Algorithm

1. Sort the array and initialize left pointer at `0`, right pointer at the last index.
2. For each left pointer position:
   - Shrink the right pointer until `nums[left] + nums[right] <= target`.
   - If valid `(left <= right)`, add `2^(right - left)` subsequences.
   - Move left forward.
3. Return the total count modulo `10^9 + 7`.

::tabs-start

```python
class Solution:
    def numSubseq(self, nums: List[int], target: int) -> int:
        nums.sort()
        res = 0
        mod = 10**9 + 7

        r = len(nums) - 1
        for i, left in enumerate(nums):
            while i <= r and left + nums[r] > target:
                r -= 1
            if i <= r:
                res += pow(2, r - i, mod)
                res %= mod

        return res
```

```java
public class Solution {
    public int numSubseq(int[] nums, int target) {
        Arrays.sort(nums);
        int res = 0, mod = 1000000007;
        int r = nums.length - 1;

        for (int i = 0; i < nums.length; i++) {
            while (i <= r && nums[i] + nums[r] > target) {
                r--;
            }
            if (i <= r) {
                res = (res + power(2, r - i, mod)) % mod;
            }
        }
        return res;
    }

    private int power(int base, int exp, int mod) {
        long result = 1, b = base;
        while (exp > 0) {
            if ((exp & 1) == 1) result = (result * b) % mod;
            b = (b * b) % mod;
            exp >>= 1;
        }
        return (int) result;
    }
}
```

```cpp
class Solution {
public:
    int numSubseq(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int res = 0, mod = 1000000007;
        int r = nums.size() - 1;

        for (int i = 0; i < nums.size(); i++) {
            while (i <= r && nums[i] + nums[r] > target) {
                r--;
            }
            if (i <= r) {
                res = (res + power(2, r - i, mod)) % mod;
            }
        }
        return res;
    }

private:
    long long power(int base, int exp, int mod) {
        long long result = 1, b = base;
        while (exp > 0) {
            if (exp & 1) result = (result * b) % mod;
            b = (b * b) % mod;
            exp >>= 1;
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    numSubseq(nums, target) {
        nums.sort((a, b) => a - b);
        const mod = BigInt(1000000007);
        let res = 0n;

        const power = (base, exp, mod) => {
            let result = 1n,
                b = BigInt(base);
            while (exp > 0) {
                if (exp & 1) result = (result * b) % mod;
                b = (b * b) % mod;
                exp >>= 1;
            }
            return result;
        };

        for (let i = 0, r = nums.length - 1; i < nums.length; i++) {
            while (nums[i] + nums[r] > target && i <= r) {
                r--;
            }
            if (i <= r) {
                res = (res + power(2, r - i, mod)) % mod;
            }
        }

        return Number(res);
    }
}
```

```csharp
public class Solution {
    public int NumSubseq(int[] nums, int target) {
        Array.Sort(nums);
        const int MOD = 1000000007;
        long res = 0;
        int r = nums.Length - 1;

        for (int i = 0; i < nums.Length; i++) {
            int left = nums[i];
            while (i <= r && left + nums[r] > target) r--;
            if (i <= r) {
                res += ModPow(2, r - i, MOD);
                res %= MOD;
            }
        }

        return (int)res;
    }

    long ModPow(long a, int b, int mod) {
        long result = 1;
        while (b > 0) {
            if ((b & 1) == 1) result = (result * a) % mod;
            a = (a * a) % mod;
            b >>= 1;
        }
        return result;
    }
}
```

```go
func numSubseq(nums []int, target int) int {
    sort.Ints(nums)
    MOD := 1000000007
    res := 0
    r := len(nums) - 1

    power := func(base, exp, mod int) int {
        result := 1
        b := base
        for exp > 0 {
            if exp&1 == 1 {
                result = (result * b) % mod
            }
            b = (b * b) % mod
            exp >>= 1
        }
        return result
    }

    for i := 0; i < len(nums); i++ {
        for i <= r && nums[i]+nums[r] > target {
            r--
        }
        if i <= r {
            res = (res + power(2, r-i, MOD)) % MOD
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun numSubseq(nums: IntArray, target: Int): Int {
        nums.sort()
        val MOD = 1000000007
        var res = 0L
        var r = nums.size - 1

        fun power(base: Long, exp: Int, mod: Int): Long {
            var result = 1L
            var b = base
            var e = exp
            while (e > 0) {
                if (e and 1 == 1) result = (result * b) % mod
                b = (b * b) % mod
                e = e shr 1
            }
            return result
        }

        for (i in nums.indices) {
            while (i <= r && nums[i] + nums[r] > target) r--
            if (i <= r) {
                res = (res + power(2L, r - i, MOD)) % MOD
            }
        }

        return res.toInt()
    }
}
```

```swift
class Solution {
    func numSubseq(_ nums: [Int], _ target: Int) -> Int {
        let nums = nums.sorted()
        let MOD = 1000000007
        var res = 0
        var r = nums.count - 1

        func power(_ base: Int, _ exp: Int, _ mod: Int) -> Int {
            var result = 1
            var b = base
            var e = exp
            while e > 0 {
                if e & 1 == 1 {
                    result = (result * b) % mod
                }
                b = (b * b) % mod
                e >>= 1
            }
            return result
        }

        for i in 0..<nums.count {
            while i <= r && nums[i] + nums[r] > target {
                r -= 1
            }
            if i <= r {
                res = (res + power(2, r - i, MOD)) % MOD
            }
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

## 4. Two Pointers (Optimal)

### Intuition

We precompute all powers of `2` up to `n` to avoid repeated exponentiation. The two pointer logic moves inward from both ends: if the current pair satisfies the constraint, count the subsequences and advance the left pointer; otherwise, shrink the right pointer.

### Algorithm

1. Sort the array and precompute `power[i] = 2^i mod (10^9 + 7)` for `i` from `0` to `n-1`.
2. Use two pointers starting at both ends.
3. While `left <= right`:
   - If `nums[left] + nums[right] <= target`, add `power[right - left]` to `res` and increment `left`.
   - Otherwise, decrement `right`.
4. Return the total count.

::tabs-start

```python
class Solution:
    def numSubseq(self, nums: List[int], target: int) -> int:
        nums.sort()
        MOD = 1000000007
        res = 0
        l, r = 0, len(nums) - 1
        power = [1] * len(nums)

        for i in range(1, len(nums)):
            power[i] = (power[i - 1] * 2) % MOD

        while l <= r:
            if nums[l] + nums[r] <= target:
                res = (res + power[r - l]) % MOD
                l += 1
            else:
                r -= 1

        return res
```

```java
public class Solution {
    public int numSubseq(int[] nums, int target) {
        Arrays.sort(nums);
        int MOD = 1000000007;
        int res = 0, l = 0, r = nums.length - 1;
        int[] power = new int[nums.length];
        power[0] = 1;

        for (int i = 1; i < nums.length; i++) {
            power[i] = (power[i - 1] * 2) % MOD;
        }

        while (l <= r) {
            if (nums[l] + nums[r] <= target) {
                res = (res + power[r - l]) % MOD;
                l++;
            } else {
                r--;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numSubseq(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int MOD = 1000000007;
        int res = 0, l = 0, r = nums.size() - 1;
        vector<int> power(nums.size(), 1);

        for (int i = 1; i < nums.size(); i++) {
            power[i] = (power[i - 1] * 2) % MOD;
        }

        while (l <= r) {
            if (nums[l] + nums[r] <= target) {
                res = (res + power[r - l]) % MOD;
                l++;
            } else {
                r--;
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
     * @param {number} target
     * @return {number}
     */
    numSubseq(nums, target) {
        nums.sort((a, b) => a - b);
        const MOD = 1000000007;
        let res = 0,
            l = 0,
            r = nums.length - 1;
        const power = Array(nums.length).fill(1);

        for (let i = 1; i < nums.length; i++) {
            power[i] = (power[i - 1] * 2) % MOD;
        }

        while (l <= r) {
            if (nums[l] + nums[r] <= target) {
                res = (res + power[r - l]) % MOD;
                l++;
            } else {
                r--;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int NumSubseq(int[] nums, int target) {
        Array.Sort(nums);
        const int MOD = 1000000007;
        int n = nums.Length;
        long res = 0;
        int l = 0, r = n - 1;

        long[] power = new long[n];
        power[0] = 1;
        for (int i = 1; i < n; i++) {
            power[i] = (power[i - 1] * 2) % MOD;
        }

        while (l <= r) {
            if (nums[l] + nums[r] <= target) {
                res = (res + power[r - l]) % MOD;
                l++;
            } else {
                r--;
            }
        }

        return (int)res;
    }
}
```

```go
func numSubseq(nums []int, target int) int {
    sort.Ints(nums)
    MOD := 1000000007
    n := len(nums)
    res := 0
    l, r := 0, n-1

    power := make([]int, n)
    power[0] = 1
    for i := 1; i < n; i++ {
        power[i] = (power[i-1] * 2) % MOD
    }

    for l <= r {
        if nums[l]+nums[r] <= target {
            res = (res + power[r-l]) % MOD
            l++
        } else {
            r--
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun numSubseq(nums: IntArray, target: Int): Int {
        nums.sort()
        val MOD = 1000000007
        val n = nums.size
        var res = 0L
        var l = 0
        var r = n - 1

        val power = LongArray(n)
        power[0] = 1
        for (i in 1 until n) {
            power[i] = (power[i - 1] * 2) % MOD
        }

        while (l <= r) {
            if (nums[l] + nums[r] <= target) {
                res = (res + power[r - l]) % MOD
                l++
            } else {
                r--
            }
        }

        return res.toInt()
    }
}
```

```swift
class Solution {
    func numSubseq(_ nums: [Int], _ target: Int) -> Int {
        let nums = nums.sorted()
        let MOD = 1000000007
        let n = nums.count
        var res = 0
        var l = 0, r = n - 1

        var power = [Int](repeating: 1, count: n)
        for i in 1..<n {
            power[i] = (power[i - 1] * 2) % MOD
        }

        while l <= r {
            if nums[l] + nums[r] <= target {
                res = (res + power[r - l]) % MOD
                l += 1
            } else {
                r -= 1
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

## Common Pitfalls

### Forgetting to Sort the Array

The two-pointer and binary search approaches require a sorted array. Since we only care about the minimum and maximum values in each subsequence (not their order), sorting is valid and necessary. Forgetting to sort leads to incorrect results because the two-pointer logic assumes sorted order.

### Integer Overflow in Power Calculation

Computing `2^(r-l)` can produce astronomically large numbers. Using naive exponentiation without modular arithmetic causes overflow. You must use modular exponentiation or precompute powers with modulo applied at each step to avoid this issue.

### Misunderstanding the Counting Formula

For a valid range from index `l` to `r` where `nums[l]` is the minimum, there are `2^(r-l)` valid subsequences, not `2^(r-l+1)`. This is because we must include `nums[l]` (it's the minimum), but any subset of the remaining `r-l` elements can be included. Off-by-one errors in this exponent are common.
