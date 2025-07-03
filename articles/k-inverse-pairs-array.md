## 1. Dynamic Programming (Top-Down)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the size of the permutation and $k$ is the number of inverse pairs in the permutation.

---

## 2. Dynamic Programming (Top-Down Optimized)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the size of the permutation and $k$ is the number of inverse pairs in the permutation.

---

## 3. Dynamic Programming (Bottom-Up)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the size of the permutation and $k$ is the number of inverse pairs in the permutation.

---

## 4. Dynamic Programming (Bottom-Up Optimized)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the size of the permutation and $k$ is the number of inverse pairs in the permutation.

---

## 5. Dynamic Programming (Space Optimized)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(k)$

> Where $n$ is the size of the permutation and $k$ is the number of inverse pairs in the permutation.
