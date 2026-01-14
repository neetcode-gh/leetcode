## 1. Dynamic Programming (Top-Down)

### Intuition

When placing the number `n` into a permutation of `n - 1` elements, we can create `0` to `n - 1` new inverse pairs depending on its position. Placing `n` at the end creates `0` new pairs, while placing it at the start creates `n - 1` pairs since `n` is larger than all other elements. This gives us a recurrence: the count for `(n, k)` equals the sum of counts for `(n - 1, k)`, `(n - 1, k - 1)`, ..., `(n - 1, k - (n - 1))`.

### Algorithm

1. Define `count(n, k)` as the number of permutations of `n` elements with exactly `k` inverse pairs.
2. Base case: If `n == 0`, return `1` if `k == 0`, else return `0`.
3. For each position where we can place `n`, it creates `i` inverse pairs (where `i` goes from `0` to `n - 1`).
4. Sum up `count(n - 1, k - i)` for all valid `i`.
5. Cache results to avoid recomputation.

::tabs-start

```python
class Solution:
    def kInversePairs(self, n: int, k: int) -> int:
        MOD = 10**9 + 7
        cache = {}

        def count(n, k):
            if n == 0:
                return 1 if k == 0 else 0
            if k < 0:
                return 0
            if (n, k) in cache:
                return cache[(n, k)]

            cache[(n, k)] = 0
            for i in range(n):
                cache[(n, k)] = (cache[(n, k)] + count(n - 1, k - i)) % MOD

            return cache[(n, k)]

        return count(n, k)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;
    private int[][] dp;

    public int kInversePairs(int n, int k) {
        dp = new int[n + 1][k + 1];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= k; j++) {
                dp[i][j] = -1;
            }
        }
        return count(n, k);
    }

    private int count(int n, int k) {
        if (n == 0) return k == 0 ? 1 : 0;
        if (k < 0) return 0;
        if (dp[n][k] != -1) return dp[n][k];

        int res = 0;
        for (int i = 0; i < n; i++) {
            res = (res + count(n - 1, k - i)) % MOD;
        }

        dp[n][k] = res;
        return res;
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;
    vector<vector<int>> dp;

    int count(int n, int k) {
        if (n == 0) {
            return k == 0 ? 1 : 0;
        }
        if (k < 0) {
            return 0;
        }
        if (dp[n][k] != -1) {
            return dp[n][k];
        }

        int res = 0;
        for (int i = 0; i < n; ++i) {
            res = (res + count(n - 1, k - i)) % MOD;
        }
        dp[n][k] = res;
        return res;
    }

public:
    int kInversePairs(int n, int k) {
        dp.assign(n + 1, vector<int>(k + 1, -1));
        return count(n, k);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kInversePairs(n, k) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(-1));

        const count = (n, k) => {
            if (n === 0) return k === 0 ? 1 : 0;
            if (k < 0) return 0;
            if (dp[n][k] !== -1) return dp[n][k];

            let res = 0;
            for (let i = 0; i < n; i++) {
                res = (res + count(n - 1, k - i)) % MOD;
            }

            dp[n][k] = res;
            return res;
        };

        return count(n, k);
    }
}
```

```csharp
public class Solution {
    private static readonly int MOD = 1000000007;
    private int[,] dp;

    public int KInversePairs(int n, int k) {
        dp = new int[n + 1, k + 1];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= k; j++) {
                dp[i, j] = -1;
            }
        }
        return Count(n, k);
    }

    private int Count(int n, int k) {
        if (n == 0) return k == 0 ? 1 : 0;
        if (k < 0) return 0;
        if (dp[n, k] != -1) return dp[n, k];

        int res = 0;
        for (int i = 0; i < n; i++) {
            res = (res + Count(n - 1, k - i)) % MOD;
        }

        dp[n, k] = res;
        return res;
    }
}
```

```go
func kInversePairs(n int, k int) int {
    MOD := 1000000007
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, k+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var count func(n, k int) int
    count = func(n, k int) int {
        if n == 0 {
            if k == 0 {
                return 1
            }
            return 0
        }
        if k < 0 {
            return 0
        }
        if dp[n][k] != -1 {
            return dp[n][k]
        }

        res := 0
        for i := 0; i < n; i++ {
            res = (res + count(n-1, k-i)) % MOD
        }
        dp[n][k] = res
        return res
    }

    return count(n, k)
}
```

```kotlin
class Solution {
    private val MOD = 1000000007
    private lateinit var dp: Array<IntArray>

    fun kInversePairs(n: Int, k: Int): Int {
        dp = Array(n + 1) { IntArray(k + 1) { -1 } }
        return count(n, k)
    }

    private fun count(n: Int, k: Int): Int {
        if (n == 0) return if (k == 0) 1 else 0
        if (k < 0) return 0
        if (dp[n][k] != -1) return dp[n][k]

        var res = 0
        for (i in 0 until n) {
            res = (res + count(n - 1, k - i)) % MOD
        }

        dp[n][k] = res
        return res
    }
}
```

```swift
class Solution {
    let MOD = 1000000007
    var dp: [[Int]] = []

    func kInversePairs(_ n: Int, _ k: Int) -> Int {
        dp = [[Int]](repeating: [Int](repeating: -1, count: k + 1), count: n + 1)
        return count(n, k)
    }

    private func count(_ n: Int, _ k: Int) -> Int {
        if n == 0 { return k == 0 ? 1 : 0 }
        if k < 0 { return 0 }
        if dp[n][k] != -1 { return dp[n][k] }

        var res = 0
        for i in 0..<n {
            res = (res + count(n - 1, k - i)) % MOD
        }

        dp[n][k] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the size of the permutation and $k$ is the number of inverse pairs in the permutation.

---

## 2. Dynamic Programming (Top-Down Optimized)

### Intuition

The basic recurrence sums up to `n` terms. We can optimize using the relationship: `count(n, k) = count(n, k - 1) + count(n - 1, k) - count(n - 1, k - n)`. This comes from observing that `count(n, k)` and `count(n, k - 1)` share most terms, differing only at the boundaries. We also add early termination when `k` exceeds the maximum possible inverse pairs for `n` elements, which is `n * (n - 1) / 2`.

### Algorithm

1. Base cases: Return `1` if `k == 0`, return `0` if `n == 1`, and handle bounds based on max pairs.
2. Use the optimized recurrence: `count(n, k) = count(n, k - 1) + count(n - 1, k) - count(n - 1, k - n)`.
3. The subtraction handles the term that falls outside the valid range when shifting from `k - 1` to `k`.
4. Apply modular arithmetic to keep numbers manageable.

::tabs-start

```python
class Solution:
    def kInversePairs(self, n: int, k: int) -> int:
        MOD = 10**9 + 7
        dp = [[-1] * (k + 1) for _ in range(n + 1)]

        def count(n, k):
            if k == 0:
                return 1
            if n == 1:
                return 0
            if n * (n - 1) // 2 < k:
                return 0
            if n * (n - 1) // 2 == k:
                return 1
            if dp[n][k] != -1:
                return dp[n][k]

            res = count(n, k - 1)
            if k >= n:
                res -= count(n - 1, k - n)
            res = (res + count(n - 1, k)) % MOD

            dp[n][k] = res
            return res

        return count(n, k)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;
    private int[][] dp;

    public int kInversePairs(int n, int k) {
        dp = new int[n + 1][k + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }
        return count(n, k);
    }

    private int count(int n, int k) {
        if (k == 0) return 1;
        if (n == 1) return 0;
        if (n * (n - 1) / 2 < k) return 0;
        if (n * (n - 1) / 2 == k) return 1;
        if (dp[n][k] != -1) return dp[n][k];

        long res = count(n, k - 1);
        if (k >= n) {
            res -= count(n - 1, k - n);
        }
        res = (res + count(n - 1, k)) % MOD;

        dp[n][k] = (int) (res + MOD) % MOD;
        return dp[n][k];
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;
    vector<vector<int>> dp;

    int count(int n, int k) {
        if (k == 0) return 1;
        if (n == 1) return 0;
        if (n * (n - 1) / 2 < k) return 0;
        if (n * (n - 1) / 2 == k) return 1;
        if (dp[n][k] != -1) return dp[n][k];

        long long res = count(n, k - 1);
        if (k >= n) {
            res -= count(n - 1, k - n);
        }
        res = (res + count(n - 1, k) + MOD) % MOD;

        dp[n][k] = int(res);
        return dp[n][k];
    }

public:
    int kInversePairs(int n, int k) {
        dp.assign(n + 1, vector<int>(k + 1, -1));
        return count(n, k);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kInversePairs(n, k) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(-1));

        const count = (n, k) => {
            if (k === 0) return 1;
            if (n === 1) return 0;
            if ((n * (n - 1)) / 2 < k) return 0;
            if ((n * (n - 1)) / 2 === k) return 1;
            if (dp[n][k] !== -1) return dp[n][k];

            let res = count(n, k - 1);
            if (k >= n) {
                res -= count(n - 1, k - n);
            }
            res = (res + count(n - 1, k) + MOD) % MOD;

            dp[n][k] = res;
            return res;
        };

        return count(n, k);
    }
}
```

```csharp
public class Solution {
    private static readonly int MOD = 1000000007;
    private int[,] dp;

    public int KInversePairs(int n, int k) {
        dp = new int[n + 1, k + 1];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= k; j++) {
                dp[i, j] = -1;
            }
        }
        return Count(n, k);
    }

    private int Count(int n, int k) {
        if (k == 0) return 1;
        if (n == 1) return 0;
        if (n * (n - 1) / 2 < k) return 0;
        if (n * (n - 1) / 2 == k) return 1;
        if (dp[n, k] != -1) return dp[n, k];

        long res = Count(n, k - 1);
        if (k >= n) {
            res -= Count(n - 1, k - n);
        }
        res = (res + Count(n - 1, k) + MOD) % MOD;

        dp[n, k] = (int)res;
        return dp[n, k];
    }
}
```

```go
func kInversePairs(n int, k int) int {
    MOD := 1000000007
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, k+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var count func(n, k int) int
    count = func(n, k int) int {
        if k == 0 {
            return 1
        }
        if n == 1 {
            return 0
        }
        if n*(n-1)/2 < k {
            return 0
        }
        if n*(n-1)/2 == k {
            return 1
        }
        if dp[n][k] != -1 {
            return dp[n][k]
        }

        res := count(n, k-1)
        if k >= n {
            res -= count(n-1, k-n)
        }
        res = (res + count(n-1, k) + MOD) % MOD

        dp[n][k] = res
        return res
    }

    return count(n, k)
}
```

```kotlin
class Solution {
    private val MOD = 1000000007
    private lateinit var dp: Array<IntArray>

    fun kInversePairs(n: Int, k: Int): Int {
        dp = Array(n + 1) { IntArray(k + 1) { -1 } }
        return count(n, k)
    }

    private fun count(n: Int, k: Int): Int {
        if (k == 0) return 1
        if (n == 1) return 0
        if (n * (n - 1) / 2 < k) return 0
        if (n * (n - 1) / 2 == k) return 1
        if (dp[n][k] != -1) return dp[n][k]

        var res = count(n, k - 1).toLong()
        if (k >= n) {
            res -= count(n - 1, k - n)
        }
        res = (res + count(n - 1, k) + MOD) % MOD

        dp[n][k] = res.toInt()
        return dp[n][k]
    }
}
```

```swift
class Solution {
    let MOD = 1000000007
    var dp: [[Int]] = []

    func kInversePairs(_ n: Int, _ k: Int) -> Int {
        dp = [[Int]](repeating: [Int](repeating: -1, count: k + 1), count: n + 1)
        return count(n, k)
    }

    private func count(_ n: Int, _ k: Int) -> Int {
        if k == 0 { return 1 }
        if n == 1 { return 0 }
        if n * (n - 1) / 2 < k { return 0 }
        if n * (n - 1) / 2 == k { return 1 }
        if dp[n][k] != -1 { return dp[n][k] }

        var res = count(n, k - 1)
        if k >= n {
            res -= count(n - 1, k - n)
        }
        res = (res + count(n - 1, k) + MOD) % MOD

        dp[n][k] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the size of the permutation and $k$ is the number of inverse pairs in the permutation.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We build up the solution starting from smaller values of `n`. For each `(N, K)` state, we sum contributions from placing element `N` at different positions, each creating a different number of new inverse pairs. This iterative approach avoids recursion overhead and naturally fills the DP table row by row.

### Algorithm

1. Create a 2D DP table with `dp[0][0] = 1`.
2. For each `N` from `1` to `n`:
   - For each `K` from `0` to `k`:
     - Sum up `dp[N - 1][K - pairs]` for `pairs` from `0` to `N - 1` where `K - pairs >= 0`.
3. Return `dp[n][k]`.

::tabs-start

```python
class Solution:
    def kInversePairs(self, n: int, k: int) -> int:
        MOD = 10**9 + 7
        dp = [[0] * (k + 1) for _ in range(n + 1)]
        dp[0][0] = 1

        for N in range(1, n + 1):
            for K in range(k + 1):
                for pairs in range(N):
                    if K - pairs >= 0:
                        dp[N][K] = (dp[N][K] + dp[N - 1][K - pairs]) % MOD

        return dp[n][k]
```

```java
public class Solution {
    public int kInversePairs(int n, int k) {
        final int MOD = 1000000007;
        int[][] dp = new int[n + 1][k + 1];
        dp[0][0] = 1;

        for (int N = 1; N <= n; N++) {
            for (int K = 0; K <= k; K++) {
                for (int pairs = 0; pairs < N; pairs++) {
                    if (K - pairs >= 0) {
                        dp[N][K] = (dp[N][K] + dp[N - 1][K - pairs]) % MOD;
                    }
                }
            }
        }

        return dp[n][k];
    }
}
```

```cpp
class Solution {
public:
    int kInversePairs(int n, int k) {
        const int MOD = 1e9 + 7;
        vector<vector<int>> dp(n + 1, vector<int>(k + 1, 0));
        dp[0][0] = 1;

        for (int N = 1; N <= n; N++) {
            for (int K = 0; K <= k; K++) {
                for (int pairs = 0; pairs < N; pairs++) {
                    if (K - pairs >= 0) {
                        dp[N][K] = (dp[N][K] + dp[N - 1][K - pairs]) % MOD;
                    }
                }
            }
        }

        return dp[n][k];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kInversePairs(n, k) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));
        dp[0][0] = 1;

        for (let N = 1; N <= n; N++) {
            for (let K = 0; K <= k; K++) {
                for (let pairs = 0; pairs < N; pairs++) {
                    if (K - pairs >= 0) {
                        dp[N][K] = (dp[N][K] + dp[N - 1][K - pairs]) % MOD;
                    }
                }
            }
        }

        return dp[n][k];
    }
}
```

```csharp
public class Solution {
    public int KInversePairs(int n, int k) {
        int MOD = 1000000007;
        int[,] dp = new int[n + 1, k + 1];
        dp[0, 0] = 1;

        for (int N = 1; N <= n; N++) {
            for (int K = 0; K <= k; K++) {
                for (int pairs = 0; pairs < N; pairs++) {
                    if (K - pairs >= 0) {
                        dp[N, K] = (dp[N, K] + dp[N - 1, K - pairs]) % MOD;
                    }
                }
            }
        }

        return dp[n, k];
    }
}
```

```go
func kInversePairs(n int, k int) int {
    MOD := 1000000007
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, k+1)
    }
    dp[0][0] = 1

    for N := 1; N <= n; N++ {
        for K := 0; K <= k; K++ {
            for pairs := 0; pairs < N; pairs++ {
                if K-pairs >= 0 {
                    dp[N][K] = (dp[N][K] + dp[N-1][K-pairs]) % MOD
                }
            }
        }
    }

    return dp[n][k]
}
```

```kotlin
class Solution {
    fun kInversePairs(n: Int, k: Int): Int {
        val MOD = 1000000007
        val dp = Array(n + 1) { IntArray(k + 1) }
        dp[0][0] = 1

        for (N in 1..n) {
            for (K in 0..k) {
                for (pairs in 0 until N) {
                    if (K - pairs >= 0) {
                        dp[N][K] = (dp[N][K] + dp[N - 1][K - pairs]) % MOD
                    }
                }
            }
        }

        return dp[n][k]
    }
}
```

```swift
class Solution {
    func kInversePairs(_ n: Int, _ k: Int) -> Int {
        let MOD = 1000000007
        var dp = [[Int]](repeating: [Int](repeating: 0, count: k + 1), count: n + 1)
        dp[0][0] = 1

        for N in 1...n {
            for K in 0...k {
                for pairs in 0..<N {
                    if K - pairs >= 0 {
                        dp[N][K] = (dp[N][K] + dp[N - 1][K - pairs]) % MOD
                    }
                }
            }
        }

        return dp[n][k]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the size of the permutation and $k$ is the number of inverse pairs in the permutation.

---

## 4. Dynamic Programming (Bottom-Up Optimized)

### Intuition

Rather than summing `N` terms for each cell, we use the sliding window observation from the top-down optimized approach. The value at `dp[N][K]` builds on `dp[N][K - 1]` by adding `dp[N - 1][K]` (the new term entering the window) and subtracting `dp[N - 1][K - N]` (the term leaving the window). This reduces each cell computation to constant time.

### Algorithm

1. Create a 2D DP table with `dp[0][0] = 1`.
2. For each `N` from `1` to `n`, and each `K` from `0` to `k`:
   - Start with `dp[N][K] = dp[N - 1][K]`.
   - If `K > 0`, add `dp[N][K - 1]` (cumulative sum from left).
   - If `K >= N`, subtract `dp[N - 1][K - N]` (remove out-of-window term).
3. Return `dp[n][k]`.

::tabs-start

```python
class Solution:
    def kInversePairs(self, n: int, k: int) -> int:
        MOD = 10**9 + 7
        dp = [[0] * (k + 1) for _ in range(n + 1)]
        dp[0][0] = 1

        for N in range(1, n + 1):
            for K in range(k + 1):
                dp[N][K] = dp[N - 1][K]
                if K > 0:
                    dp[N][K] = (dp[N][K] + dp[N][K - 1]) % MOD
                if K >= N:
                    dp[N][K] = (dp[N][K] - dp[N - 1][K - N] + MOD) % MOD

        return dp[n][k]
```

```java
public class Solution {
    public int kInversePairs(int n, int k) {
        final int MOD = 1000000007;
        int[][] dp = new int[n + 1][k + 1];
        dp[0][0] = 1;

        for (int N = 1; N <= n; N++) {
            for (int K = 0; K <= k; K++) {
                dp[N][K] = dp[N - 1][K];
                if (K > 0) {
                    dp[N][K] = (dp[N][K] + dp[N][K - 1]) % MOD;
                }
                if (K >= N) {
                    dp[N][K] = (dp[N][K] - dp[N - 1][K - N] + MOD) % MOD;
                }
            }
        }

        return dp[n][k];
    }
}
```

```cpp
class Solution {
public:
    int kInversePairs(int n, int k) {
        const int MOD = 1e9 + 7;
        vector<vector<int>> dp(n + 1, vector<int>(k + 1, 0));
        dp[0][0] = 1;

        for (int N = 1; N <= n; N++) {
            for (int K = 0; K <= k; K++) {
                dp[N][K] = dp[N - 1][K];
                if (K > 0) {
                    dp[N][K] = (dp[N][K] + dp[N][K - 1]) % MOD;
                }
                if (K >= N) {
                    dp[N][K] = (dp[N][K] - dp[N - 1][K - N] + MOD) % MOD;
                }
            }
        }

        return dp[n][k];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kInversePairs(n, k) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));
        dp[0][0] = 1;

        for (let N = 1; N <= n; N++) {
            for (let K = 0; K <= k; K++) {
                dp[N][K] = dp[N - 1][K];
                if (K > 0) {
                    dp[N][K] = (dp[N][K] + dp[N][K - 1]) % MOD;
                }
                if (K >= N) {
                    dp[N][K] = (dp[N][K] - dp[N - 1][K - N] + MOD) % MOD;
                }
            }
        }

        return dp[n][k];
    }
}
```

```csharp
public class Solution {
    public int KInversePairs(int n, int k) {
        int MOD = 1000000007;
        int[,] dp = new int[n + 1, k + 1];
        dp[0, 0] = 1;

        for (int N = 1; N <= n; N++) {
            for (int K = 0; K <= k; K++) {
                dp[N, K] = dp[N - 1, K];
                if (K > 0) {
                    dp[N, K] = (dp[N, K] + dp[N, K - 1]) % MOD;
                }
                if (K >= N) {
                    dp[N, K] = (dp[N, K] - dp[N - 1, K - N] + MOD) % MOD;
                }
            }
        }

        return dp[n, k];
    }
}
```

```go
func kInversePairs(n int, k int) int {
    MOD := 1000000007
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, k+1)
    }
    dp[0][0] = 1

    for N := 1; N <= n; N++ {
        for K := 0; K <= k; K++ {
            dp[N][K] = dp[N-1][K]
            if K > 0 {
                dp[N][K] = (dp[N][K] + dp[N][K-1]) % MOD
            }
            if K >= N {
                dp[N][K] = (dp[N][K] - dp[N-1][K-N] + MOD) % MOD
            }
        }
    }

    return dp[n][k]
}
```

```kotlin
class Solution {
    fun kInversePairs(n: Int, k: Int): Int {
        val MOD = 1000000007
        val dp = Array(n + 1) { IntArray(k + 1) }
        dp[0][0] = 1

        for (N in 1..n) {
            for (K in 0..k) {
                dp[N][K] = dp[N - 1][K]
                if (K > 0) {
                    dp[N][K] = (dp[N][K] + dp[N][K - 1]) % MOD
                }
                if (K >= N) {
                    dp[N][K] = (dp[N][K] - dp[N - 1][K - N] + MOD) % MOD
                }
            }
        }

        return dp[n][k]
    }
}
```

```swift
class Solution {
    func kInversePairs(_ n: Int, _ k: Int) -> Int {
        let MOD = 1000000007
        var dp = [[Int]](repeating: [Int](repeating: 0, count: k + 1), count: n + 1)
        dp[0][0] = 1

        for N in 1...n {
            for K in 0...k {
                dp[N][K] = dp[N - 1][K]
                if K > 0 {
                    dp[N][K] = (dp[N][K] + dp[N][K - 1]) % MOD
                }
                if K >= N {
                    dp[N][K] = (dp[N][K] - dp[N - 1][K - N] + MOD) % MOD
                }
            }
        }

        return dp[n][k]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the size of the permutation and $k$ is the number of inverse pairs in the permutation.

---

## 5. Dynamic Programming (Space Optimized)

### Intuition

Since each row only depends on the previous row, we only need to keep two 1D arrays instead of the full 2D table. We maintain a running total that acts as a prefix sum, adding new values and subtracting values that fall outside the window of size `N`.

### Algorithm

1. Initialize `prev` array with `prev[0] = 1`.
2. For each `N` from `1` to `n`:
   - Create a new `cur` array and maintain a running `total`.
   - For each `K` from `0` to `k`:
     - Add `prev[K]` to `total`.
     - If `K >= N`, subtract `prev[K - N]` from `total`.
     - Set `cur[K] = total`.
   - Swap `prev = cur` for the next iteration.
3. Return `prev[k]`.

::tabs-start

```python
class Solution:
    def kInversePairs(self, n: int, k: int) -> int:
        MOD = 10**9 + 7
        prev = [0] * (k + 1)
        prev[0] = 1

        for N in range(1, n + 1):
            cur = [0] * (k + 1)
            total = 0
            for K in range(0, k + 1):
                total = (total + prev[K]) % MOD
                if K >= N:
                    total = (total - prev[K - N] + MOD) % MOD
                cur[K] = total
            prev = cur

        return prev[k]
```

```java
public class Solution {
    public int kInversePairs(int n, int k) {
        final int MOD = 1000000007;
        int[] prev = new int[k + 1];
        prev[0] = 1;

        for (int N = 1; N <= n; N++) {
            int[] cur = new int[k + 1];
            int total = 0;
            for (int K = 0; K <= k; K++) {
                total = (total + prev[K]) % MOD;
                if (K >= N) {
                    total = (total - prev[K - N] + MOD) % MOD;
                }
                cur[K] = total;
            }
            prev = cur;
        }

        return prev[k];
    }
}
```

```cpp
class Solution {
public:
    int kInversePairs(int n, int k) {
        const int MOD = 1e9 + 7;
        vector<int> prev(k + 1, 0);
        prev[0] = 1;

        for (int N = 1; N <= n; N++) {
            vector<int> cur(k + 1, 0);
            int total = 0;
            for (int K = 0; K <= k; K++) {
                total = (total + prev[K]) % MOD;
                if (K >= N) {
                    total = (total - prev[K - N] + MOD) % MOD;
                }
                cur[K] = total;
            }
            prev = cur;
        }

        return prev[k];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    kInversePairs(n, k) {
        const MOD = 1e9 + 7;
        let prev = new Array(k + 1).fill(0);
        prev[0] = 1;

        for (let N = 1; N <= n; N++) {
            const cur = new Array(k + 1).fill(0);
            let total = 0;
            for (let K = 0; K <= k; K++) {
                total = (total + prev[K]) % MOD;
                if (K >= N) {
                    total = (total - prev[K - N] + MOD) % MOD;
                }
                cur[K] = total;
            }
            prev = cur;
        }

        return prev[k];
    }
}
```

```csharp
public class Solution {
    public int KInversePairs(int n, int k) {
        int MOD = 1000000007;
        int[] prev = new int[k + 1];
        prev[0] = 1;

        for (int N = 1; N <= n; N++) {
            int[] cur = new int[k + 1];
            int total = 0;
            for (int K = 0; K <= k; K++) {
                total = (total + prev[K]) % MOD;
                if (K >= N) {
                    total = (total - prev[K - N] + MOD) % MOD;
                }
                cur[K] = total;
            }
            prev = cur;
        }

        return prev[k];
    }
}
```

```go
func kInversePairs(n int, k int) int {
    MOD := 1000000007
    prev := make([]int, k+1)
    prev[0] = 1

    for N := 1; N <= n; N++ {
        cur := make([]int, k+1)
        total := 0
        for K := 0; K <= k; K++ {
            total = (total + prev[K]) % MOD
            if K >= N {
                total = (total - prev[K-N] + MOD) % MOD
            }
            cur[K] = total
        }
        prev = cur
    }

    return prev[k]
}
```

```kotlin
class Solution {
    fun kInversePairs(n: Int, k: Int): Int {
        val MOD = 1000000007
        var prev = IntArray(k + 1)
        prev[0] = 1

        for (N in 1..n) {
            val cur = IntArray(k + 1)
            var total = 0
            for (K in 0..k) {
                total = (total + prev[K]) % MOD
                if (K >= N) {
                    total = (total - prev[K - N] + MOD) % MOD
                }
                cur[K] = total
            }
            prev = cur
        }

        return prev[k]
    }
}
```

```swift
class Solution {
    func kInversePairs(_ n: Int, _ k: Int) -> Int {
        let MOD = 1000000007
        var prev = [Int](repeating: 0, count: k + 1)
        prev[0] = 1

        for N in 1...n {
            var cur = [Int](repeating: 0, count: k + 1)
            var total = 0
            for K in 0...k {
                total = (total + prev[K]) % MOD
                if K >= N {
                    total = (total - prev[K - N] + MOD) % MOD
                }
                cur[K] = total
            }
            prev = cur
        }

        return prev[k]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(k)$

> Where $n$ is the size of the permutation and $k$ is the number of inverse pairs in the permutation.

---

## Common Pitfalls

### Forgetting Modular Arithmetic

Results can grow extremely large, requiring modulo `10^9 + 7` operations. Forgetting to apply the modulo after each addition causes integer overflow. Apply `% MOD` consistently in all accumulation steps.

### Incorrect Handling of Negative Values in Modular Subtraction

When subtracting in the optimized recurrence `(res - dp[n-1][k-n])`, the result may become negative before taking modulo. Always add `MOD` before the final modulo: `(res - value + MOD) % MOD` to ensure a non-negative result.

### Not Recognizing the Sliding Window Pattern

The naive approach sums `n` terms per cell, leading to `O(n^2 * k)` complexity. The key insight is that consecutive cells share most terms, allowing a sliding window optimization. Missing this pattern results in TLE on large inputs.

### Off-by-One Errors in Window Boundaries

When placing element `n`, it can create `0` to `n-1` inverse pairs (not `n` pairs). The window of previous row values spans `k` down to `k - (n-1)`. Getting these boundaries wrong produces incorrect counts.

### Missing Base Cases

The recurrence requires proper initialization: `dp[0][0] = 1` (one way to arrange zero elements with zero pairs). Missing this base case or incorrectly setting `dp[n][0]` values propagates errors through the entire table.