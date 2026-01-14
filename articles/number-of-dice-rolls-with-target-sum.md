## 1. Recursion

### Intuition

This is a counting problem where we need to find all ways to roll `n` dice (each with `k` faces) to get a sum of `target`. For each die, we can roll any value from 1 to `k`, and we need to count how many combinations lead to the `target`. This naturally leads to a recursive approach: for each die roll, we try all possible face values and recursively count the ways to achieve the remaining `target` with the remaining dice.

### Algorithm

1. Define a recursive function `count(n, target)` that returns the number of ways to reach `target` using `n` dice.
2. Base case: If `n == 0`, return `1` if `target == 0` (found a valid combination), else return `0`.
3. If `target < 0`, return `0` (invalid path).
4. For each face value from 1 to `k`, recursively count ways with `n - 1` dice and `target - val`.
5. Sum up all the ways and return the result modulo 10^9 + 7.

::tabs-start

```python
class Solution:
    def numRollsToTarget(self, n: int, k: int, target: int) -> int:
        MOD = 10**9 + 7

        def count(n, target):
            if n == 0:
                return 1 if target == 0 else 0
            if target < 0:
                return 0

            res = 0
            for val in range(1, k + 1):
                res = (res + count(n - 1, target - val)) % MOD
            return res

        return count(n, target)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int numRollsToTarget(int n, int k, int target) {
        return count(n, target, k);
    }

    private int count(int n, int target, int k) {
        if (n == 0) {
            return target == 0 ? 1 : 0;
        }
        if (target < 0) {
            return 0;
        }

        int res = 0;
        for (int val = 1; val <= k; val++) {
            res = (res + count(n - 1, target - val, k)) % MOD;
        }
        return res;
    }
}
```

```cpp
class Solution {
private:
    const int MOD = 1e9 + 7;

public:
    int numRollsToTarget(int n, int k, int target) {
        return count(n, target, k);
    }

private:
    int count(int n, int target, int k) {
        if (n == 0) {
            return target == 0 ? 1 : 0;
        }
        if (target < 0) {
            return 0;
        }

        int res = 0;
        for (int val = 1; val <= k; val++) {
            res = (res + count(n - 1, target - val, k)) % MOD;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @param {number} target
     * @return {number}
     */
    numRollsToTarget(n, k, target) {
        const MOD = 1e9 + 7;

        const count = (n, target) => {
            if (n === 0) {
                return target === 0 ? 1 : 0;
            }
            if (target < 0) {
                return 0;
            }

            let res = 0;
            for (let val = 1; val <= k; val++) {
                res = (res + count(n - 1, target - val)) % MOD;
            }
            return res;
        };

        return count(n, target);
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1000000007;

    public int NumRollsToTarget(int n, int k, int target) {
        return Count(n, target, k);
    }

    private int Count(int n, int target, int k) {
        if (n == 0) {
            return target == 0 ? 1 : 0;
        }
        if (target < 0) {
            return 0;
        }

        int res = 0;
        for (int val = 1; val <= k; val++) {
            res = (res + Count(n - 1, target - val, k)) % MOD;
        }
        return res;
    }
}
```

```go
func numRollsToTarget(n int, k int, target int) int {
    MOD := int(1e9 + 7)

    var count func(n, target int) int
    count = func(n, target int) int {
        if n == 0 {
            if target == 0 {
                return 1
            }
            return 0
        }
        if target < 0 {
            return 0
        }

        res := 0
        for val := 1; val <= k; val++ {
            res = (res + count(n-1, target-val)) % MOD
        }
        return res
    }

    return count(n, target)
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007

    fun numRollsToTarget(n: Int, k: Int, target: Int): Int {
        return count(n, target, k)
    }

    private fun count(n: Int, target: Int, k: Int): Int {
        if (n == 0) {
            return if (target == 0) 1 else 0
        }
        if (target < 0) {
            return 0
        }

        var res = 0
        for (v in 1..k) {
            res = (res + count(n - 1, target - v, k)) % MOD
        }
        return res
    }
}
```

```swift
class Solution {
    let MOD = 1_000_000_007

    func numRollsToTarget(_ n: Int, _ k: Int, _ target: Int) -> Int {
        return count(n, target, k)
    }

    private func count(_ n: Int, _ target: Int, _ k: Int) -> Int {
        if n == 0 {
            return target == 0 ? 1 : 0
        }
        if target < 0 {
            return 0
        }

        var res = 0
        for val in 1...k {
            res = (res + count(n - 1, target - val, k)) % MOD
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k ^ n)$
- Space complexity: $O(n)$

> Where $n$ is the number of dices, $k$ is the number of faces each dice have, and $t$ is the target value.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution has overlapping subproblems. For example, reaching `target` 10 with 3 dice might be computed multiple times through different paths. By caching results in a memoization table, we avoid redundant calculations. The state is defined by two variables: the number of dice remaining and the current target sum.

### Algorithm

1. Create a cache (dictionary or 2D array) to store computed results.
2. Define a recursive function `count(n, target)` with memoization.
3. Base case: If `n == 0`, return `1` if `target == 0`, else return `0`.
4. If `target < 0`, return `0`.
5. If the result for `(n, target)` is already cached, return it.
6. For each face value from 1 to `k` (where `target - val >= 0`), add the recursive result.
7. Store the result in the cache and return it.

::tabs-start

```python
class Solution:
    def numRollsToTarget(self, n: int, k: int, target: int) -> int:
        MOD = 10**9 + 7
        cache = {}

        def count(n, target):
            if n == 0:
                return 1 if target == 0 else 0
            if (n, target) in cache:
                return cache[(n, target)]

            res = 0
            for val in range(1, k + 1):
                if target - val >= 0:
                    res = (res + count(n - 1, target - val)) % MOD
            cache[(n, target)] = res
            return res

        return count(n, target)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;
    private int[][] dp;

    public int numRollsToTarget(int n, int k, int target) {
        dp = new int[n + 1][target + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }
        return count(n, target, k);
    }

    private int count(int n, int target, int k) {
        if (n == 0) {
            return target == 0 ? 1 : 0;
        }
        if (target < 0) {
            return 0;
        }
        if (dp[n][target] != -1) {
            return dp[n][target];
        }

        int res = 0;
        for (int val = 1; val <= k; val++) {
            if (target - val >= 0) {
                res = (res + count(n - 1, target - val, k)) % MOD;
            }
        }
        dp[n][target] = res;
        return res;
    }
}
```

```cpp
class Solution {
private:
    const int MOD = 1e9 + 7;
    vector<vector<int>> dp;

public:
    int numRollsToTarget(int n, int k, int target) {
        dp = vector<vector<int>>(n + 1, vector<int>(target + 1, -1));
        return count(n, target, k);
    }

private:
    int count(int n, int target, int k) {
        if (n == 0) {
            return target == 0 ? 1 : 0;
        }
        if (target < 0) {
            return 0;
        }
        if (dp[n][target] != -1) {
            return dp[n][target];
        }

        int res = 0;
        for (int val = 1; val <= k; val++) {
            if (target - val >= 0) {
                res = (res + count(n - 1, target - val, k)) % MOD;
            }
        }
        dp[n][target] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @param {number} target
     * @return {number}
     */
    numRollsToTarget(n, k, target) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: n + 1 }, () =>
            Array(target + 1).fill(-1),
        );

        const count = (n, target) => {
            if (n === 0) {
                return target === 0 ? 1 : 0;
            }
            if (dp[n][target] !== -1) {
                return dp[n][target];
            }

            let res = 0;
            for (let val = 1; val <= k; val++) {
                if (target - val >= 0) {
                    res = (res + count(n - 1, target - val)) % MOD;
                }
            }
            dp[n][target] = res;
            return res;
        };

        return count(n, target);
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1000000007;
    private int[,] dp;

    public int NumRollsToTarget(int n, int k, int target) {
        dp = new int[n + 1, target + 1];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= target; j++) {
                dp[i, j] = -1;
            }
        }
        return Count(n, target, k);
    }

    private int Count(int n, int target, int k) {
        if (n == 0) {
            return target == 0 ? 1 : 0;
        }
        if (target < 0) {
            return 0;
        }
        if (dp[n, target] != -1) {
            return dp[n, target];
        }

        int res = 0;
        for (int val = 1; val <= k; val++) {
            if (target - val >= 0) {
                res = (res + Count(n - 1, target - val, k)) % MOD;
            }
        }
        dp[n, target] = res;
        return res;
    }
}
```

```go
func numRollsToTarget(n int, k int, target int) int {
    MOD := int(1e9 + 7)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, target+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var count func(n, target int) int
    count = func(n, target int) int {
        if n == 0 {
            if target == 0 {
                return 1
            }
            return 0
        }
        if target < 0 {
            return 0
        }
        if dp[n][target] != -1 {
            return dp[n][target]
        }

        res := 0
        for val := 1; val <= k; val++ {
            if target-val >= 0 {
                res = (res + count(n-1, target-val)) % MOD
            }
        }
        dp[n][target] = res
        return res
    }

    return count(n, target)
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007
    private lateinit var dp: Array<IntArray>

    fun numRollsToTarget(n: Int, k: Int, target: Int): Int {
        dp = Array(n + 1) { IntArray(target + 1) { -1 } }
        return count(n, target, k)
    }

    private fun count(n: Int, target: Int, k: Int): Int {
        if (n == 0) {
            return if (target == 0) 1 else 0
        }
        if (target < 0) {
            return 0
        }
        if (dp[n][target] != -1) {
            return dp[n][target]
        }

        var res = 0
        for (v in 1..k) {
            if (target - v >= 0) {
                res = (res + count(n - 1, target - v, k)) % MOD
            }
        }
        dp[n][target] = res
        return res
    }
}
```

```swift
class Solution {
    let MOD = 1_000_000_007
    var dp: [[Int]] = []

    func numRollsToTarget(_ n: Int, _ k: Int, _ target: Int) -> Int {
        dp = Array(repeating: Array(repeating: -1, count: target + 1), count: n + 1)
        return count(n, target, k)
    }

    private func count(_ n: Int, _ target: Int, _ k: Int) -> Int {
        if n == 0 {
            return target == 0 ? 1 : 0
        }
        if target < 0 {
            return 0
        }
        if dp[n][target] != -1 {
            return dp[n][target]
        }

        var res = 0
        for val in 1...k {
            if target - val >= 0 {
                res = (res + count(n - 1, target - val, k)) % MOD
            }
        }
        dp[n][target] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * t * k)$
- Space complexity: $O(n * t)$

> Where $n$ is the number of dices, $k$ is the number of faces each dice have, and $t$ is the target value.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of recursion with memoization, we can build the solution iteratively from the ground up. We use a 2D DP table where `dp[i][t]` represents the number of ways to achieve sum `t` using exactly `i` dice. We fill this table by considering each die one at a time and each possible face value.

### Algorithm

1. Create a 2D array `dp` of size `(n + 1) x (target + 1)`, initialized to 0.
2. Set `dp[0][0] = 1` (one way to achieve sum 0 with 0 dice).
3. For each die `i` from 1 to `n`:
   - For each face value `val` from 1 to `k`:
     - For each possible sum `t` from `val` to `target`:
       - Add `dp[i - 1][t - val]` to `dp[i][t]`.
4. Return `dp[n][target]`.

::tabs-start

```python
class Solution:
    def numRollsToTarget(self, n: int, k: int, target: int) -> int:
        MOD = 10**9 + 7
        dp = [[0] * (target + 1) for _ in range(n + 1)]
        dp[0][0] = 1

        for i in range(1, n + 1):
            for val in range(1, k + 1):
                for t in range(val, target + 1):
                    dp[i][t] = (dp[i][t] + dp[i - 1][t - val]) % MOD

        return dp[n][target]
```

```java
public class Solution {
    public int numRollsToTarget(int n, int k, int target) {
        int MOD = 1_000_000_007;
        int[][] dp = new int[n + 1][target + 1];
        dp[0][0] = 1;

        for (int i = 1; i <= n; i++) {
            for (int val = 1; val <= k; val++) {
                for (int t = val; t <= target; t++) {
                    dp[i][t] = (dp[i][t] + dp[i - 1][t - val]) % MOD;
                }
            }
        }

        return dp[n][target];
    }
}
```

```cpp
class Solution {
public:
    int numRollsToTarget(int n, int k, int target) {
        const int MOD = 1e9 + 7;
        vector<vector<int>> dp(n + 1, vector<int>(target + 1, 0));
        dp[0][0] = 1;

        for (int i = 1; i <= n; i++) {
            for (int val = 1; val <= k; val++) {
                for (int t = val; t <= target; t++) {
                    dp[i][t] = (dp[i][t] + dp[i - 1][t - val]) % MOD;
                }
            }
        }

        return dp[n][target];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @param {number} target
     * @return {number}
     */
    numRollsToTarget(n, k, target) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: n + 1 }, () =>
            Array(target + 1).fill(0),
        );
        dp[0][0] = 1;

        for (let i = 1; i <= n; i++) {
            for (let val = 1; val <= k; val++) {
                for (let t = val; t <= target; t++) {
                    dp[i][t] = (dp[i][t] + dp[i - 1][t - val]) % MOD;
                }
            }
        }

        return dp[n][target];
    }
}
```

```csharp
public class Solution {
    public int NumRollsToTarget(int n, int k, int target) {
        int MOD = 1_000_000_007;
        int[,] dp = new int[n + 1, target + 1];
        dp[0, 0] = 1;

        for (int i = 1; i <= n; i++) {
            for (int val = 1; val <= k; val++) {
                for (int t = val; t <= target; t++) {
                    dp[i, t] = (dp[i, t] + dp[i - 1, t - val]) % MOD;
                }
            }
        }

        return dp[n, target];
    }
}
```

```go
func numRollsToTarget(n int, k int, target int) int {
    MOD := int(1e9 + 7)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, target+1)
    }
    dp[0][0] = 1

    for i := 1; i <= n; i++ {
        for val := 1; val <= k; val++ {
            for t := val; t <= target; t++ {
                dp[i][t] = (dp[i][t] + dp[i-1][t-val]) % MOD
            }
        }
    }

    return dp[n][target]
}
```

```kotlin
class Solution {
    fun numRollsToTarget(n: Int, k: Int, target: Int): Int {
        val MOD = 1_000_000_007
        val dp = Array(n + 1) { IntArray(target + 1) }
        dp[0][0] = 1

        for (i in 1..n) {
            for (v in 1..k) {
                for (t in v..target) {
                    dp[i][t] = (dp[i][t] + dp[i - 1][t - v]) % MOD
                }
            }
        }

        return dp[n][target]
    }
}
```

```swift
class Solution {
    func numRollsToTarget(_ n: Int, _ k: Int, _ target: Int) -> Int {
        let MOD = 1_000_000_007
        var dp = Array(repeating: Array(repeating: 0, count: target + 1), count: n + 1)
        dp[0][0] = 1

        for i in 1...n {
            for val in 1...k {
                for t in val...target {
                    dp[i][t] = (dp[i][t] + dp[i - 1][t - val]) % MOD
                }
            }
        }

        return dp[n][target]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * t * k)$
- Space complexity: $O(n * t)$

> Where $n$ is the number of dices, $k$ is the number of faces each dice have, and $t$ is the target value.

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

In the bottom-up approach, we only need the previous row to compute the current row. This observation allows us to reduce space from O(n * target) to O(target) by using two 1D arrays: one for the current state and one for the next state. After processing each die, we swap the arrays.

### Algorithm

1. Create a 1D array `dp` of size `target + 1`, initialized to 0.
2. Set `dp[0] = 1`.
3. For each die (from 0 to `n - 1`):
   - Create a new array `next_dp` initialized to 0.
   - For each face value `val` from 1 to `k`:
     - For each sum `total` from `val` to `target`:
       - Add `dp[total - val]` to `next_dp[total]`.
   - Replace `dp` with `next_dp`.
4. Return `dp[target]`.

::tabs-start

```python
class Solution:
    def numRollsToTarget(self, n: int, k: int, target: int) -> int:
        dp = [0] * (target + 1)
        dp[0] = 1
        MOD = 10**9 + 7

        for dice in range(n):
            next_dp = [0] * (target + 1)
            for val in range(1, k + 1):
                for total in range(val, target + 1):
                    next_dp[total] = (next_dp[total] + dp[total - val]) % MOD
            dp = next_dp

        return dp[target]
```

```java
public class Solution {
    public int numRollsToTarget(int n, int k, int target) {
        int[] dp = new int[target + 1];
        dp[0] = 1;
        int MOD = 1_000_000_007;

        for (int dice = 0; dice < n; dice++) {
            int[] nextDp = new int[target + 1];
            for (int val = 1; val <= k; val++) {
                for (int total = val; total <= target; total++) {
                    nextDp[total] = (nextDp[total] + dp[total - val]) % MOD;
                }
            }
            dp = nextDp;
        }

        return dp[target];
    }
}
```

```cpp
class Solution {
public:
    int numRollsToTarget(int n, int k, int target) {
        const int MOD = 1e9 + 7;
        vector<int> dp(target + 1, 0);
        dp[0] = 1;

        for (int dice = 0; dice < n; dice++) {
            vector<int> nextDp(target + 1, 0);
            for (int val = 1; val <= k; val++) {
                for (int total = val; total <= target; total++) {
                    nextDp[total] = (nextDp[total] + dp[total - val]) % MOD;
                }
            }
            dp = nextDp;
        }

        return dp[target];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @param {number} target
     * @return {number}
     */
    numRollsToTarget(n, k, target) {
        const MOD = 1e9 + 7;
        let dp = Array(target + 1).fill(0);
        dp[0] = 1;

        for (let dice = 0; dice < n; dice++) {
            const nextDp = Array(target + 1).fill(0);
            for (let val = 1; val <= k; val++) {
                for (let total = val; total <= target; total++) {
                    nextDp[total] = (nextDp[total] + dp[total - val]) % MOD;
                }
            }
            dp = nextDp;
        }

        return dp[target];
    }
}
```

```csharp
public class Solution {
    public int NumRollsToTarget(int n, int k, int target) {
        int[] dp = new int[target + 1];
        dp[0] = 1;
        int MOD = 1_000_000_007;

        for (int dice = 0; dice < n; dice++) {
            int[] nextDp = new int[target + 1];
            for (int val = 1; val <= k; val++) {
                for (int total = val; total <= target; total++) {
                    nextDp[total] = (nextDp[total] + dp[total - val]) % MOD;
                }
            }
            dp = nextDp;
        }

        return dp[target];
    }
}
```

```go
func numRollsToTarget(n int, k int, target int) int {
    MOD := int(1e9 + 7)
    dp := make([]int, target+1)
    dp[0] = 1

    for dice := 0; dice < n; dice++ {
        nextDp := make([]int, target+1)
        for val := 1; val <= k; val++ {
            for total := val; total <= target; total++ {
                nextDp[total] = (nextDp[total] + dp[total-val]) % MOD
            }
        }
        dp = nextDp
    }

    return dp[target]
}
```

```kotlin
class Solution {
    fun numRollsToTarget(n: Int, k: Int, target: Int): Int {
        val MOD = 1_000_000_007
        var dp = IntArray(target + 1)
        dp[0] = 1

        for (dice in 0 until n) {
            val nextDp = IntArray(target + 1)
            for (v in 1..k) {
                for (total in v..target) {
                    nextDp[total] = (nextDp[total] + dp[total - v]) % MOD
                }
            }
            dp = nextDp
        }

        return dp[target]
    }
}
```

```swift
class Solution {
    func numRollsToTarget(_ n: Int, _ k: Int, _ target: Int) -> Int {
        let MOD = 1_000_000_007
        var dp = Array(repeating: 0, count: target + 1)
        dp[0] = 1

        for _ in 0..<n {
            var nextDp = Array(repeating: 0, count: target + 1)
            for val in 1...k {
                for total in val...target {
                    nextDp[total] = (nextDp[total] + dp[total - val]) % MOD
                }
            }
            dp = nextDp
        }

        return dp[target]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * t * k)$
- Space complexity: $O(t)$

> Where $n$ is the number of dices, $k$ is the number of faces each dice have, and $t$ is the target value.

---

## 5. Dynamic Programming (Optimal)

### Intuition

We can use a single array and iterate backwards to avoid overwriting values we still need. By processing sums in reverse order and resetting values before adding new contributions, we achieve the same result with a single array. This approach also skips positions with zero ways, providing a minor optimization.

### Algorithm

1. Create a 1D array `dp` of size `target + 1`, initialized to 0.
2. Set `dp[0] = 1`.
3. For each die (from 0 to `n - 1`):
   - Iterate `t` from `target` down to 0:
     - Store the current value `ways = dp[t]` and reset `dp[t] = 0`.
     - If `ways > 0`, for each face value `val` from 1 to `min(k, target - t)`:
       - Add `ways` to `dp[t + val]`.
4. Return `dp[target]`.

::tabs-start

```python
class Solution:
    def numRollsToTarget(self, n: int, k: int, target: int) -> int:
        MOD = 10**9 + 7
        dp = [0] * (target + 1)
        dp[0] = 1

        for dice in range(n):
            for t in range(target, -1, -1):
                ways = dp[t]
                dp[t] = 0
                if ways:
                    for val in range(1, min(k + 1, target - t + 1)):
                        dp[t + val] = (dp[t + val] + ways) % MOD

        return dp[target]
```

```java
public class Solution {
    public int numRollsToTarget(int n, int k, int target) {
        int MOD = 1_000_000_007;
        int[] dp = new int[target + 1];
        dp[0] = 1;

        for (int dice = 0; dice < n; dice++) {
            for (int t = target; t >= 0; t--) {
                int ways = dp[t];
                dp[t] = 0;
                if (ways > 0) {
                    for (int val = 1; val <= Math.min(k, target - t); val++) {
                        dp[t + val] = (dp[t + val] + ways) % MOD;
                    }
                }
            }
        }

        return dp[target];
    }
}
```

```cpp
class Solution {
public:
    int numRollsToTarget(int n, int k, int target) {
        const int MOD = 1e9 + 7;
        vector<int> dp(target + 1, 0);
        dp[0] = 1;

        for (int dice = 0; dice < n; dice++) {
            for (int t = target; t >= 0; t--) {
                int ways = dp[t];
                dp[t] = 0;
                if (ways > 0) {
                    for (int val = 1; val <= min(k, target - t); val++) {
                        dp[t + val] = (dp[t + val] + ways) % MOD;
                    }
                }
            }
        }

        return dp[target];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @param {number} target
     * @return {number}
     */
    numRollsToTarget(n, k, target) {
        const MOD = 1e9 + 7;
        const dp = Array(target + 1).fill(0);
        dp[0] = 1;

        for (let dice = 0; dice < n; dice++) {
            for (let t = target; t >= 0; t--) {
                const ways = dp[t];
                dp[t] = 0;
                if (ways > 0) {
                    for (let val = 1; val <= Math.min(k, target - t); val++) {
                        dp[t + val] = (dp[t + val] + ways) % MOD;
                    }
                }
            }
        }

        return dp[target];
    }
}
```

```csharp
public class Solution {
    public int NumRollsToTarget(int n, int k, int target) {
        int MOD = 1_000_000_007;
        int[] dp = new int[target + 1];
        dp[0] = 1;

        for (int dice = 0; dice < n; dice++) {
            for (int t = target; t >= 0; t--) {
                int ways = dp[t];
                dp[t] = 0;
                if (ways > 0) {
                    for (int val = 1; val <= Math.Min(k, target - t); val++) {
                        dp[t + val] = (dp[t + val] + ways) % MOD;
                    }
                }
            }
        }

        return dp[target];
    }
}
```

```go
func numRollsToTarget(n int, k int, target int) int {
    MOD := int(1e9 + 7)
    dp := make([]int, target+1)
    dp[0] = 1

    for dice := 0; dice < n; dice++ {
        for t := target; t >= 0; t-- {
            ways := dp[t]
            dp[t] = 0
            if ways > 0 {
                for val := 1; val <= k && val <= target-t; val++ {
                    dp[t+val] = (dp[t+val] + ways) % MOD
                }
            }
        }
    }

    return dp[target]
}
```

```kotlin
class Solution {
    fun numRollsToTarget(n: Int, k: Int, target: Int): Int {
        val MOD = 1_000_000_007
        val dp = IntArray(target + 1)
        dp[0] = 1

        for (dice in 0 until n) {
            for (t in target downTo 0) {
                val ways = dp[t]
                dp[t] = 0
                if (ways > 0) {
                    for (v in 1..minOf(k, target - t)) {
                        dp[t + v] = (dp[t + v] + ways) % MOD
                    }
                }
            }
        }

        return dp[target]
    }
}
```

```swift
class Solution {
    func numRollsToTarget(_ n: Int, _ k: Int, _ target: Int) -> Int {
        let MOD = 1_000_000_007
        var dp = Array(repeating: 0, count: target + 1)
        dp[0] = 1

        for _ in 0..<n {
            for t in stride(from: target, through: 0, by: -1) {
                let ways = dp[t]
                dp[t] = 0
                if ways > 0 {
                    for val in 1...min(k, target - t) {
                        dp[t + val] = (dp[t + val] + ways) % MOD
                    }
                }
            }
        }

        return dp[target]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * t * k)$
- Space complexity: $O(t)$

> Where $n$ is the number of dices, $k$ is the number of faces each dice have, and $t$ is the target value.

---

## Common Pitfalls

### Forgetting Modulo Operations

Not applying the modulo operation (`% (10^9 + 7)`) after each addition causes integer overflow. The number of ways can grow extremely large, exceeding the maximum value of 32-bit or even 64-bit integers. Apply modulo after every addition to keep values within bounds and avoid overflow errors.

### Incorrect Base Case Handling

Setting the wrong base case in the DP leads to incorrect counts. When `n == 0` (no dice left), the only valid result is if `target == 0` (we exactly hit the target), returning 1. If `target != 0` with no dice remaining, return 0. Mixing up these conditions produces wrong answers for edge cases.

### Off-by-One Errors in Face Values

Starting the face value loop at 0 instead of 1, or going up to `k - 1` instead of `k`, miscounts the valid dice rolls. Each die has faces numbered 1 through k (not 0 through k-1). Ensure your loop iterates from 1 to k inclusive to correctly enumerate all possible face values.
