## 1. Recursion

### Intuition

Consider placing sticks from tallest to shortest. The tallest stick must be visible. For the remaining sticks, we decide where to place each one relative to previously placed sticks. If a stick is placed at the leftmost available position, it becomes visible. Otherwise, it hides behind a taller stick already placed to its left.

### Algorithm

1. Define `dfs(N, K)` where `N` is the number of sticks remaining and `K` is how many still need to be visible.
2. Base cases:
   - If `N == K`, all remaining sticks must be visible (only one way: place them in increasing order from left), return 1.
   - If `N == 0` or `K == 0` (but not both), it's impossible, return 0.
3. Two choices for the shortest remaining stick:
   - Place it at the leftmost position, making it visible: `dfs(N-1, K-1)`.
   - Place it in one of the `N-1` positions behind a taller stick: `(N-1) * dfs(N-1, K)`.
4. Return the sum modulo 10^9 + 7.

::tabs-start

```python
class Solution:
    def rearrangeSticks(self, n: int, k: int) -> int:
        MOD = 10**9 + 7

        def dfs(N, K):
            if N == K:
                return 1
            if N == 0 or K == 0:
                return 0
            return (dfs(N - 1, K - 1) + (N - 1) * dfs(N - 1, K)) % MOD

        return dfs(n, k)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int rearrangeSticks(int n, int k) {
        return dfs(n, k);
    }

    private int dfs(int N, int K) {
        if (N == K) return 1;
        if (N == 0 || K == 0) return 0;
        return (int) ((dfs(N - 1, K - 1) + (long) (N - 1) * dfs(N - 1, K)) % MOD);
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;

    int dfs(int N, int K) {
        if (N == K) return 1;
        if (N == 0 || K == 0) return 0;
        return (dfs(N - 1, K - 1) + (long long)(N - 1) * dfs(N - 1, K) % MOD) % MOD;
    }

public:
    int rearrangeSticks(int n, int k) {
        return dfs(n, k);
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
    rearrangeSticks(n, k) {
        const MOD = 1e9 + 7;

        const dfs = (N, K) => {
            if (N === K) return 1;
            if (N === 0 || K === 0) return 0;
            return (dfs(N - 1, K - 1) + (N - 1) * dfs(N - 1, K)) % MOD;
        };

        return dfs(n, k);
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    public int RearrangeSticks(int n, int k) {
        return Dfs(n, k);
    }

    private int Dfs(int N, int K) {
        if (N == K) return 1;
        if (N == 0 || K == 0) return 0;
        return (int)((Dfs(N - 1, K - 1) + (long)(N - 1) * Dfs(N - 1, K)) % MOD);
    }
}
```

```go
func rearrangeSticks(n int, k int) int {
    MOD := int(1e9 + 7)

    var dfs func(N, K int) int
    dfs = func(N, K int) int {
        if N == K {
            return 1
        }
        if N == 0 || K == 0 {
            return 0
        }
        return (dfs(N-1, K-1) + (N-1)*dfs(N-1, K)) % MOD
    }

    return dfs(n, k)
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007

    fun rearrangeSticks(n: Int, k: Int): Int {
        fun dfs(N: Int, K: Int): Int {
            if (N == K) return 1
            if (N == 0 || K == 0) return 0
            return ((dfs(N - 1, K - 1) + (N - 1).toLong() * dfs(N - 1, K)) % MOD).toInt()
        }
        return dfs(n, k)
    }
}
```

```swift
class Solution {
    func rearrangeSticks(_ n: Int, _ k: Int) -> Int {
        let MOD = 1_000_000_007

        func dfs(_ N: Int, _ K: Int) -> Int {
            if N == K { return 1 }
            if N == 0 || K == 0 { return 0 }
            return (dfs(N - 1, K - 1) + (N - 1) * dfs(N - 1, K)) % MOD
        }

        return dfs(n, k)
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

The recursive solution has overlapping subproblems. By caching results in a 2D table, we avoid redundant computation.

### Algorithm

1. Create a memoization table of size `(n+1) x (k+1)` initialized to -1.
2. In `dfs(N, K)`, check if the result is already computed.
3. Apply the same recurrence: `dfs(N-1, K-1) + (N-1) * dfs(N-1, K)`.
4. Store and return the result.

::tabs-start

```python
class Solution:
    def rearrangeSticks(self, n: int, k: int) -> int:
        MOD = 10**9 + 7
        dp = [[-1] * (k + 1) for _ in range(n + 1)]

        def dfs(N, K):
            if N == K:
                return 1
            if N == 0 or K == 0:
                return 0
            if dp[N][K] != -1:
                return dp[N][K]
            dp[N][K] = (dfs(N - 1, K - 1) + (N - 1) * dfs(N - 1, K)) % MOD
            return dp[N][K]

        return dfs(n, k)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;
    private int[][] dp;

    public int rearrangeSticks(int n, int k) {
        dp = new int[n + 1][k + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }
        return dfs(n, k);
    }

    private int dfs(int N, int K) {
        if (N == K) return 1;
        if (N == 0 || K == 0) return 0;
        if (dp[N][K] != -1) return dp[N][K];
        dp[N][K] = (int) ((dfs(N - 1, K - 1) + (long) (N - 1) * dfs(N - 1, K)) % MOD);
        return dp[N][K];
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;
    vector<vector<int>> dp;

    int dfs(int N, int K) {
        if (N == K) return 1;
        if (N == 0 || K == 0) return 0;
        if (dp[N][K] != -1) return dp[N][K];
        dp[N][K] = (dfs(N - 1, K - 1) + (long long)(N - 1) * dfs(N - 1, K) % MOD) % MOD;
        return dp[N][K];
    }

public:
    int rearrangeSticks(int n, int k) {
        dp = vector<vector<int>>(n + 1, vector<int>(k + 1, -1));
        return dfs(n, k);
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
    rearrangeSticks(n, k) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(-1));

        const dfs = (N, K) => {
            if (N === K) return 1;
            if (N === 0 || K === 0) return 0;
            if (dp[N][K] !== -1) return dp[N][K];
            dp[N][K] = (dfs(N - 1, K - 1) + (N - 1) * dfs(N - 1, K)) % MOD;
            return dp[N][K];
        };

        return dfs(n, k);
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;
    private int[,] dp;

    public int RearrangeSticks(int n, int k) {
        dp = new int[n + 1, k + 1];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= k; j++) {
                dp[i, j] = -1;
            }
        }
        return Dfs(n, k);
    }

    private int Dfs(int N, int K) {
        if (N == K) return 1;
        if (N == 0 || K == 0) return 0;
        if (dp[N, K] != -1) return dp[N, K];
        dp[N, K] = (int)((Dfs(N - 1, K - 1) + (long)(N - 1) * Dfs(N - 1, K)) % MOD);
        return dp[N, K];
    }
}
```

```go
func rearrangeSticks(n int, k int) int {
    MOD := int(1e9 + 7)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, k+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(N, K int) int
    dfs = func(N, K int) int {
        if N == K {
            return 1
        }
        if N == 0 || K == 0 {
            return 0
        }
        if dp[N][K] != -1 {
            return dp[N][K]
        }
        dp[N][K] = (dfs(N-1, K-1) + (N-1)*dfs(N-1, K)) % MOD
        return dp[N][K]
    }

    return dfs(n, k)
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007
    private lateinit var dp: Array<IntArray>

    fun rearrangeSticks(n: Int, k: Int): Int {
        dp = Array(n + 1) { IntArray(k + 1) { -1 } }
        return dfs(n, k)
    }

    private fun dfs(N: Int, K: Int): Int {
        if (N == K) return 1
        if (N == 0 || K == 0) return 0
        if (dp[N][K] != -1) return dp[N][K]
        dp[N][K] = ((dfs(N - 1, K - 1) + (N - 1).toLong() * dfs(N - 1, K)) % MOD).toInt()
        return dp[N][K]
    }
}
```

```swift
class Solution {
    func rearrangeSticks(_ n: Int, _ k: Int) -> Int {
        let MOD = 1_000_000_007
        var dp = [[Int]](repeating: [Int](repeating: -1, count: k + 1), count: n + 1)

        func dfs(_ N: Int, _ K: Int) -> Int {
            if N == K { return 1 }
            if N == 0 || K == 0 { return 0 }
            if dp[N][K] != -1 { return dp[N][K] }
            dp[N][K] = (dfs(N - 1, K - 1) + (N - 1) * dfs(N - 1, K)) % MOD
            return dp[N][K]
        }

        return dfs(n, k)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n * k)$

> Where $n$ represents the total number of sticks, and $k$ denotes the number of sticks that must be visible from the left side.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We fill the DP table iteratively from smaller subproblems to larger ones. `dp[N][K]` represents the number of ways to arrange `N` sticks with exactly `K` visible.

### Algorithm

1. Create a DP table of size `(n+1) x (k+1)` initialized to 0.
2. Set `dp[1][1] = 1` (one stick, one visible).
3. For each `N` from 2 to `n`, and each `K` from 1 to `k`:
   - `dp[N][K] = dp[N-1][K-1] + (N-1) * dp[N-1][K]`
4. Return `dp[n][k]`.

::tabs-start

```python
class Solution:
    def rearrangeSticks(self, n: int, k: int) -> int:
        MOD = 10**9 + 7
        dp = [[0] * (k + 1) for _ in range(n + 1)]
        dp[1][1] = 1

        for N in range(2, n + 1):
            for K in range(1, k + 1):
                dp[N][K] = (dp[N - 1][K - 1] + (N - 1) * dp[N - 1][K]) % MOD

        return dp[n][k]
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int rearrangeSticks(int n, int k) {
        int[][] dp = new int[n + 1][k + 1];
        dp[1][1] = 1;

        for (int N = 2; N <= n; N++) {
            for (int K = 1; K <= k; K++) {
                dp[N][K] = (int) ((dp[N - 1][K - 1] + (long) (N - 1) * dp[N - 1][K]) % MOD);
            }
        }

        return dp[n][k];
    }
}
```

```cpp
class Solution {
public:
    int rearrangeSticks(int n, int k) {
        const int MOD = 1e9 + 7;
        vector<vector<int>> dp(n + 1, vector<int>(k + 1, 0));
        dp[1][1] = 1;

        for (int N = 2; N <= n; N++) {
            for (int K = 1; K <= k; K++) {
                dp[N][K] = (dp[N - 1][K - 1] + (N - 1) * 1LL * dp[N - 1][K]) % MOD;
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
    rearrangeSticks(n, k) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));
        dp[1][1] = 1;

        for (let N = 2; N <= n; N++) {
            for (let K = 1; K <= k; K++) {
                dp[N][K] = (dp[N - 1][K - 1] + (N - 1) * dp[N - 1][K]) % MOD;
            }
        }

        return dp[n][k];
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    public int RearrangeSticks(int n, int k) {
        int[,] dp = new int[n + 1, k + 1];
        dp[1, 1] = 1;

        for (int N = 2; N <= n; N++) {
            for (int K = 1; K <= k; K++) {
                dp[N, K] = (int)((dp[N - 1, K - 1] + (long)(N - 1) * dp[N - 1, K]) % MOD);
            }
        }

        return dp[n, k];
    }
}
```

```go
func rearrangeSticks(n int, k int) int {
    MOD := int(1e9 + 7)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, k+1)
    }
    dp[1][1] = 1

    for N := 2; N <= n; N++ {
        for K := 1; K <= k; K++ {
            dp[N][K] = (dp[N-1][K-1] + (N-1)*dp[N-1][K]) % MOD
        }
    }

    return dp[n][k]
}
```

```kotlin
class Solution {
    fun rearrangeSticks(n: Int, k: Int): Int {
        val MOD = 1_000_000_007
        val dp = Array(n + 1) { IntArray(k + 1) }
        dp[1][1] = 1

        for (N in 2..n) {
            for (K in 1..k) {
                dp[N][K] = ((dp[N - 1][K - 1] + (N - 1).toLong() * dp[N - 1][K]) % MOD).toInt()
            }
        }

        return dp[n][k]
    }
}
```

```swift
class Solution {
    func rearrangeSticks(_ n: Int, _ k: Int) -> Int {
        let MOD = 1_000_000_007
        var dp = [[Int]](repeating: [Int](repeating: 0, count: k + 1), count: n + 1)
        dp[1][1] = 1

        for N in 2...n {
            for K in 1...k {
                dp[N][K] = (dp[N - 1][K - 1] + (N - 1) * dp[N - 1][K]) % MOD
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

> Where $n$ represents the total number of sticks, and $k$ denotes the number of sticks that must be visible from the left side.

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

Each row only depends on the previous row, so we can use a 1D array and update it carefully to avoid overwriting values we still need.

### Algorithm

1. Use a 1D DP array of size `k + 1`.
2. Set `dp[1] = 1`.
3. For each `N` from 2 to `n`:
   - Iterate through `K` from 1 to `k`, tracking the previous value before updating.
   - Update `dp[K] = prev + (N-1) * dp[K]`.
4. Return `dp[k]`.

::tabs-start

```python
class Solution:
    def rearrangeSticks(self, n: int, k: int) -> int:
        MOD = 10**9 + 7
        dp = [0] * (k + 1)
        dp[1] = 1

        for N in range(2, n + 1):
            prev = 0
            for K in range(1, k + 1):
                tmp = dp[K]
                dp[K] = (prev + (N - 1) * dp[K]) % MOD
                prev = tmp

        return dp[k]
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int rearrangeSticks(int n, int k) {
        int[] dp = new int[k + 1];
        dp[1] = 1;

        for (int N = 2; N <= n; N++) {
            int prev = 0;
            for (int K = 1; K <= k; K++) {
                int tmp = dp[K];
                dp[K] = (int) ((prev + (long) (N - 1) * dp[K]) % MOD);
                prev = tmp;
            }
        }

        return dp[k];
    }
}
```

```cpp
class Solution {
public:
    int rearrangeSticks(int n, int k) {
        const int MOD = 1e9 + 7;
        vector<int> dp(k + 1);
        dp[1] = 1;

        for (int N = 2; N <= n; N++) {
            int prev = 0;
            for (int K = 1; K <= k; K++) {
                int tmp = dp[K];
                dp[K] = (prev + (N - 1) * 1LL * dp[K]) % MOD;
                prev = tmp;
            }
        }

        return dp[k];
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
    rearrangeSticks(n, k) {
        const MOD = 1e9 + 7;
        const dp = new Array(k + 1).fill(0);
        dp[1] = 1;

        for (let N = 2; N <= n; N++) {
            let prev = 0;
            for (let K = 1; K <= k; K++) {
                const tmp = dp[K];
                dp[K] = (prev + (N - 1) * dp[K]) % MOD;
                prev = tmp;
            }
        }

        return dp[k];
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    public int RearrangeSticks(int n, int k) {
        int[] dp = new int[k + 1];
        dp[1] = 1;

        for (int N = 2; N <= n; N++) {
            int prev = 0;
            for (int K = 1; K <= k; K++) {
                int tmp = dp[K];
                dp[K] = (int)((prev + (long)(N - 1) * dp[K]) % MOD);
                prev = tmp;
            }
        }

        return dp[k];
    }
}
```

```go
func rearrangeSticks(n int, k int) int {
    MOD := int(1e9 + 7)
    dp := make([]int, k+1)
    dp[1] = 1

    for N := 2; N <= n; N++ {
        prev := 0
        for K := 1; K <= k; K++ {
            tmp := dp[K]
            dp[K] = (prev + (N-1)*dp[K]) % MOD
            prev = tmp
        }
    }

    return dp[k]
}
```

```kotlin
class Solution {
    fun rearrangeSticks(n: Int, k: Int): Int {
        val MOD = 1_000_000_007
        val dp = IntArray(k + 1)
        dp[1] = 1

        for (N in 2..n) {
            var prev = 0
            for (K in 1..k) {
                val tmp = dp[K]
                dp[K] = ((prev + (N - 1).toLong() * dp[K]) % MOD).toInt()
                prev = tmp
            }
        }

        return dp[k]
    }
}
```

```swift
class Solution {
    func rearrangeSticks(_ n: Int, _ k: Int) -> Int {
        let MOD = 1_000_000_007
        var dp = [Int](repeating: 0, count: k + 1)
        dp[1] = 1

        for N in 2...n {
            var prev = 0
            for K in 1...k {
                let tmp = dp[K]
                dp[K] = (prev + (N - 1) * dp[K]) % MOD
                prev = tmp
            }
        }

        return dp[k]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(k)$

> Where $n$ represents the total number of sticks, and $k$ denotes the number of sticks that must be visible from the left side.
