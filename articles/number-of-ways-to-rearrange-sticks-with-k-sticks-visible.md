## 1. Recursion

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n * k)$

> Where $n$ represents the total number of sticks, and $k$ denotes the number of sticks that must be visible from the left side.

---

## 3. Dynamic Programming (Bottom-Up)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n * k)$

> Where $n$ represents the total number of sticks, and $k$ denotes the number of sticks that must be visible from the left side.

---

## 4. Dynamic Programming (Space Optimized)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(k)$

> Where $n$ represents the total number of sticks, and $k$ denotes the number of sticks that must be visible from the left side.
