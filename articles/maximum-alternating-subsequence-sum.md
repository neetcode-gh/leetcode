## 1. Recursion

### Intuition

An alternating subsequence sum adds elements at even positions and subtracts elements at odd positions. At each index, we have two choices: include the current element in our subsequence or skip it. If we include it, the sign depends on whether we are at an even or odd position in our chosen subsequence.

The recursive approach explores both choices at every index and tracks whether the next element we pick would be at an even or odd position.

### Algorithm

1. Define `dfs(i, even)` where `i` is the current index and `even` indicates if the next picked element contributes positively.
2. Base case: if `i == n`, return `0`.
3. If `even` is `true`, we can either:
   - Pick `nums[i]` (adding it) and recurse with `even = false`.
   - Skip and recurse with `even = true`.
4. If `even` is `false`, we can either:
   - Pick `nums[i]` (subtracting it) and recurse with `even = true`.
   - Skip and recurse with `even = false`.
5. Return the maximum of including or skipping.
6. Start with `dfs(0, true)`.

::tabs-start

```python
class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        def dfs(i, even):
            if i == len(nums):
                return 0
            total = nums[i] if even else -nums[i]
            return max(total + dfs(i + 1, not even), dfs(i + 1, even))

        return dfs(0, True)
```

```java
public class Solution {
    public long maxAlternatingSum(int[] nums) {
        return dfs(nums, 0, true);
    }

    private long dfs(int[] nums, int i, boolean even) {
        if (i == nums.length) {
            return 0;
        }
        long total = even ? nums[i] : -nums[i];
        return Math.max(total + dfs(nums, i + 1, !even), dfs(nums, i + 1, even));
    }
}
```

```cpp
class Solution {
public:
    long long maxAlternatingSum(vector<int>& nums) {
        return dfs(nums, 0, true);
    }

private:
    long long dfs(vector<int>& nums, int i, bool even) {
        if (i == nums.size()) {
            return 0;
        }
        long long total = even ? nums[i] : -nums[i];
        return max(total + dfs(nums, i + 1, !even), dfs(nums, i + 1, even));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxAlternatingSum(nums) {
        const dfs = (i, even) => {
            if (i === nums.length) {
                return 0;
            }

            const total = even ? nums[i] : -nums[i];
            return Math.max(total + dfs(i + 1, !even), dfs(i + 1, even));
        };

        return dfs(0, true);
    }
}
```

```go
func maxAlternatingSum(nums []int) int64 {
    var dfs func(i int, even bool) int64
    dfs = func(i int, even bool) int64 {
        if i == len(nums) {
            return 0
        }
        var total int64
        if even {
            total = int64(nums[i])
        } else {
            total = -int64(nums[i])
        }
        return max64(total+dfs(i+1, !even), dfs(i+1, even))
    }
    return dfs(0, true)
}

func max64(a, b int64) int64 {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxAlternatingSum(nums: IntArray): Long {
        fun dfs(i: Int, even: Boolean): Long {
            if (i == nums.size) return 0L
            val total = if (even) nums[i].toLong() else -nums[i].toLong()
            return maxOf(total + dfs(i + 1, !even), dfs(i + 1, even))
        }
        return dfs(0, true)
    }
}
```

```swift
class Solution {
    func maxAlternatingSum(_ nums: [Int]) -> Int {
        func dfs(_ i: Int, _ even: Bool) -> Int {
            if i == nums.count { return 0 }
            let total = even ? nums[i] : -nums[i]
            return max(total + dfs(i + 1, !even), dfs(i + 1, even))
        }
        return dfs(0, true)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution has overlapping subproblems. The state `(i, even)` can be reached multiple times through different paths, so we can cache results to avoid redundant computation.

Since there are `n` possible indices and `2` possible parity states, we have `O(n)` unique states. Memoizing these transforms the exponential time complexity into linear.

### Algorithm

1. Create a memoization table `dp[i][even]` initialized to `-1` (unvisited).
2. Define `dfs(i, even)` with the same logic as before.
3. Before computing, check if `dp[i][even]` is cached and return it if so.
4. After computing the result, store it in `dp[i][even]`.
5. Return `dfs(0, 1)` where `1` represents the even state.

::tabs-start

```python
class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        dp = {}

        def dfs(i, even):
            if i == len(nums):
                return 0
            if (i, even) in dp:
                return dp[(i, even)]

            total = nums[i] if even else -nums[i]
            dp[(i, even)] = max(total + dfs(i + 1, not even), dfs(i + 1, even))
            return dp[(i, even)]

        return dfs(0, True)
```

```java
public class Solution {
    private long dp[][];

    public long maxAlternatingSum(int[] nums) {
        int n = nums.length;
        dp = new long[n][2];
        for (int i = 0; i < n; i++) {
            dp[i][0] = -1;
            dp[i][1] = -1;
        }
        return dfs(nums, 0, 1);
    }

    private long dfs(int[] nums, int i, int even) {
        if (i == nums.length) {
            return 0;
        }
        if (dp[i][even] != -1) {
            return dp[i][even];
        }

        long total = even == 1 ? nums[i] : -nums[i];
        dp[i][even] = Math.max(total + dfs(nums, i + 1, 1 - even), dfs(nums, i + 1, even));
        return dp[i][even];
    }
}
```

```cpp
class Solution {
    vector<vector<long long>> dp;

public:
    long long maxAlternatingSum(vector<int>& nums) {
        dp.assign(nums.size(), vector<long long>(2, -1));
        return dfs(nums, 0, true);
    }

private:
    long long dfs(vector<int>& nums, int i, bool even) {
        if (i == nums.size()) {
            return 0;
        }
        if (dp[i][even] != -1) {
            return dp[i][even];
        }
        long long total = even ? nums[i] : -nums[i];
        dp[i][even] = max(total + dfs(nums, i + 1, !even), dfs(nums, i + 1, even));
        return dp[i][even];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxAlternatingSum(nums) {
        const n = nums.length;
        const dp = Array.from({ length: n }, () => Array(2).fill(-1));

        const dfs = (i, even) => {
            if (i === n) {
                return 0;
            }
            if (dp[i][even] !== -1) {
                return dp[i][even];
            }

            const total = even === 1 ? nums[i] : -nums[i];
            dp[i][even] = Math.max(
                total + dfs(i + 1, 1 - even),
                dfs(i + 1, even),
            );
            return dp[i][even];
        };

        return dfs(0, 1);
    }
}
```

```go
func maxAlternatingSum(nums []int) int64 {
    n := len(nums)
    dp := make([][]int64, n)
    for i := range dp {
        dp[i] = []int64{-1, -1}
    }

    var dfs func(i, even int) int64
    dfs = func(i, even int) int64 {
        if i == n {
            return 0
        }
        if dp[i][even] != -1 {
            return dp[i][even]
        }
        var total int64
        if even == 1 {
            total = int64(nums[i])
        } else {
            total = -int64(nums[i])
        }
        dp[i][even] = max64(total+dfs(i+1, 1-even), dfs(i+1, even))
        return dp[i][even]
    }
    return dfs(0, 1)
}

func max64(a, b int64) int64 {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxAlternatingSum(nums: IntArray): Long {
        val n = nums.size
        val dp = Array(n) { LongArray(2) { -1L } }

        fun dfs(i: Int, even: Int): Long {
            if (i == n) return 0L
            if (dp[i][even] != -1L) return dp[i][even]

            val total = if (even == 1) nums[i].toLong() else -nums[i].toLong()
            dp[i][even] = maxOf(total + dfs(i + 1, 1 - even), dfs(i + 1, even))
            return dp[i][even]
        }
        return dfs(0, 1)
    }
}
```

```swift
class Solution {
    func maxAlternatingSum(_ nums: [Int]) -> Int {
        let n = nums.count
        var dp = [[Int]](repeating: [-1, -1], count: n)

        func dfs(_ i: Int, _ even: Int) -> Int {
            if i == n { return 0 }
            if dp[i][even] != -1 { return dp[i][even] }

            let total = even == 1 ? nums[i] : -nums[i]
            dp[i][even] = max(total + dfs(i + 1, 1 - even), dfs(i + 1, even))
            return dp[i][even]
        }
        return dfs(0, 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We can convert the top-down approach to bottom-up by filling the DP table iteratively. For each position, we track two values: the maximum alternating sum if the next element we pick would be at an even position, and the maximum if it would be at an odd position.

Working backwards from the end of the array, we compute these values based on the two choices at each position (pick or skip).

### Algorithm

1. Create a 2D array `dp[n+1][2]` initialized to `0`.
2. Iterate from `i = n-1` down to `0`:
   - `dp[i][1]` (even) = max of picking `nums[i]` plus `dp[i+1][0]`, or skipping with `dp[i+1][1]`.
   - `dp[i][0]` (odd) = max of picking `-nums[i]` plus `dp[i+1][1]`, or skipping with `dp[i+1][0]`.
3. Return `dp[0][1]` since we start expecting an even-positioned pick.

::tabs-start

```python
class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        n = len(nums)
        dp = [[0] * 2 for _ in range(n + 1)]  # dp[i][0] -> odd, dp[i][1] -> even

        for i in range(n - 1, -1, -1):
            dp[i][1] = max(nums[i] + dp[i + 1][0], dp[i + 1][1])  # even
            dp[i][0] = max(-nums[i] + dp[i + 1][1], dp[i + 1][0])  # odd

        return dp[0][1]
```

```java
public class Solution {
    public long maxAlternatingSum(int[] nums) {
        int n = nums.length;
        long[][] dp = new long[n + 1][2]; // dp[i][0] -> odd, dp[i][1] -> even

        for (int i = n - 1; i >= 0; i--) {
            dp[i][1] = Math.max(nums[i] + dp[i + 1][0], dp[i + 1][1]); // even
            dp[i][0] = Math.max(-nums[i] + dp[i + 1][1], dp[i + 1][0]); // odd
        }

        return dp[0][1];
    }
}
```

```cpp
class Solution {
public:
    long long maxAlternatingSum(vector<int>& nums) {
        int n = nums.size();
        vector<vector<long long>> dp(n + 1, vector<long long>(2, 0)); // dp[i][0] -> odd, dp[i][1] -> even

        for (int i = n - 1; i >= 0; i--) {
            dp[i][1] = max(nums[i] + dp[i + 1][0], dp[i + 1][1]); // even
            dp[i][0] = max(-nums[i] + dp[i + 1][1], dp[i + 1][0]); // odd
        }

        return dp[0][1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxAlternatingSum(nums) {
        const n = nums.length;
        const dp = Array.from({ length: n + 1 }, () => [0, 0]); // dp[i][0] -> odd, dp[i][1] -> even

        for (let i = n - 1; i >= 0; i--) {
            dp[i][1] = Math.max(nums[i] + dp[i + 1][0], dp[i + 1][1]); // even
            dp[i][0] = Math.max(-nums[i] + dp[i + 1][1], dp[i + 1][0]); // odd
        }

        return dp[0][1]; // Result starts with even index
    }
}
```

```go
func maxAlternatingSum(nums []int) int64 {
    n := len(nums)
    dp := make([][]int64, n+1)
    for i := range dp {
        dp[i] = []int64{0, 0}
    }

    for i := n - 1; i >= 0; i-- {
        dp[i][1] = max64(int64(nums[i])+dp[i+1][0], dp[i+1][1]) // even
        dp[i][0] = max64(-int64(nums[i])+dp[i+1][1], dp[i+1][0]) // odd
    }
    return dp[0][1]
}

func max64(a, b int64) int64 {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxAlternatingSum(nums: IntArray): Long {
        val n = nums.size
        val dp = Array(n + 1) { LongArray(2) }

        for (i in n - 1 downTo 0) {
            dp[i][1] = maxOf(nums[i] + dp[i + 1][0], dp[i + 1][1]) // even
            dp[i][0] = maxOf(-nums[i] + dp[i + 1][1], dp[i + 1][0]) // odd
        }
        return dp[0][1]
    }
}
```

```swift
class Solution {
    func maxAlternatingSum(_ nums: [Int]) -> Int {
        let n = nums.count
        var dp = [[Int]](repeating: [0, 0], count: n + 1)

        for i in stride(from: n - 1, through: 0, by: -1) {
            dp[i][1] = max(nums[i] + dp[i + 1][0], dp[i + 1][1]) // even
            dp[i][0] = max(-nums[i] + dp[i + 1][1], dp[i + 1][0]) // odd
        }
        return dp[0][1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

Notice that each state only depends on the state at the next index. We do not need the entire DP table; just two variables suffice to track the best even-position sum and odd-position sum for the suffix starting at the current index.

This reduces space from O(n) to O(1) while maintaining the same logic.

### Algorithm

1. Initialize `sumEven = 0` and `sumOdd = 0`.
2. Iterate from `i = n-1` down to `0`:
   - `tmpEven = max(nums[i] + sumOdd, sumEven)` represents the best sum if next pick is even.
   - `tmpOdd = max(-nums[i] + sumEven, sumOdd)` represents the best sum if next pick is odd.
   - Update `sumEven = tmpEven` and `sumOdd = tmpOdd`.
3. Return `sumEven`.

::tabs-start

```python
class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        sumEven = sumOdd = 0

        for i in range(len(nums) - 1, -1, -1):
            tmpEven = max(sumOdd + nums[i], sumEven)
            tmpOdd = max(sumEven - nums[i], sumOdd)
            sumEven, sumOdd = tmpEven, tmpOdd

        return sumEven
```

```java
public class Solution {
    public long maxAlternatingSum(int[] nums) {
        long sumEven = 0, sumOdd = 0;

        for (int i = nums.length - 1; i >= 0; i--) {
            long tmpEven = Math.max(nums[i] + sumOdd, sumEven);
            long tmpOdd = Math.max(-nums[i] + sumEven, sumOdd);
            sumEven = tmpEven;
            sumOdd = tmpOdd;
        }

        return sumEven;
    }
}
```

```cpp
class Solution {
public:
    long long maxAlternatingSum(vector<int>& nums) {
        long long sumEven = 0, sumOdd = 0;

        for (int i = nums.size() - 1; i >= 0; i--) {
            long long tmpEven = max(nums[i] + sumOdd, sumEven);
            long long tmpOdd = max(-nums[i] + sumEven, sumOdd);
            sumEven = tmpEven;
            sumOdd = tmpOdd;
        }

        return sumEven;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxAlternatingSum(nums) {
        let sumEven = 0,
            sumOdd = 0;

        for (let i = nums.length - 1; i >= 0; i--) {
            let tmpEven = Math.max(nums[i] + sumOdd, sumEven);
            let tmpOdd = Math.max(-nums[i] + sumEven, sumOdd);
            sumEven = tmpEven;
            sumOdd = tmpOdd;
        }

        return sumEven;
    }
}
```

```go
func maxAlternatingSum(nums []int) int64 {
    var sumEven, sumOdd int64 = 0, 0

    for i := len(nums) - 1; i >= 0; i-- {
        tmpEven := max64(int64(nums[i])+sumOdd, sumEven)
        tmpOdd := max64(-int64(nums[i])+sumEven, sumOdd)
        sumEven, sumOdd = tmpEven, tmpOdd
    }
    return sumEven
}

func max64(a, b int64) int64 {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxAlternatingSum(nums: IntArray): Long {
        var sumEven = 0L
        var sumOdd = 0L

        for (i in nums.lastIndex downTo 0) {
            val tmpEven = maxOf(nums[i] + sumOdd, sumEven)
            val tmpOdd = maxOf(-nums[i] + sumEven, sumOdd)
            sumEven = tmpEven
            sumOdd = tmpOdd
        }
        return sumEven
    }
}
```

```swift
class Solution {
    func maxAlternatingSum(_ nums: [Int]) -> Int {
        var sumEven = 0
        var sumOdd = 0

        for i in stride(from: nums.count - 1, through: 0, by: -1) {
            let tmpEven = max(nums[i] + sumOdd, sumEven)
            let tmpOdd = max(-nums[i] + sumEven, sumOdd)
            sumEven = tmpEven
            sumOdd = tmpOdd
        }
        return sumEven
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
