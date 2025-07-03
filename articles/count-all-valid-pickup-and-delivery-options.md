## 1. Recursion

::tabs-start

```python
class Solution:
    def countOrders(self, n: int) -> int:
        MOD = 1000000007

        def dfs(picked, delivered):
            if picked == n and delivered == n:
                return 1

            res = 0
            if picked < n:
                res = (res + (n - picked) * dfs(picked + 1, delivered)) % MOD
            if delivered < picked:
                res = (res + (picked - delivered) * dfs(picked, delivered + 1)) % MOD

            return res

        return dfs(0, 0)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int countOrders(int n) {
        return dfs(0, 0, n);
    }

    private int dfs(int picked, int delivered, int n) {
        if (picked == n && delivered == n) {
            return 1;
        }

        long res = 0;
        if (picked < n) {
            res = ((res + (n - picked) * 1L * dfs(picked + 1, delivered, n)) % MOD);
        }
        if (delivered < picked) {
            res = ((res + (picked - delivered) * 1L * dfs(picked, delivered + 1, n)) % MOD);
        }

        return (int) res;
    }
}
```

```cpp
class Solution {
public:
    static const int MOD = 1'000'000'007;

    int countOrders(int n) {
        return dfs(0, 0, n);
    }

private:
    int dfs(int picked, int delivered, int n) {
        if (picked == n && delivered == n) {
            return 1;
        }

        int res = 0;
        if (picked < n) {
            res = (res + (n - picked) * 1LL * dfs(picked + 1, delivered, n)) % MOD;
        }
        if (delivered < picked) {
            res = (res + (picked - delivered) * 1LL * dfs(picked, delivered + 1, n)) % MOD;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countOrders(n) {
        const MOD = 1_000_000_007;

        const dfs = (picked, delivered) => {
            if (picked === n && delivered === n) {
                return 1;
            }

            let res = 0;
            if (picked < n) {
                res = (res + (n - picked) * dfs(picked + 1, delivered)) % MOD;
            }
            if (delivered < picked) {
                res =
                    (res + (picked - delivered) * dfs(picked, delivered + 1)) %
                    MOD;
            }

            return res;
        };

        return dfs(0, 0);
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
    def countOrders(self, n: int) -> int:
        MOD = 1000000007
        dp = [[-1] * (n + 1) for _ in range(n + 1)]
        dp[n][n] = 1

        def dfs(picked, delivered):
            if dp[picked][delivered] != -1:
                return dp[picked][delivered]

            res = 0
            if picked < n:
                res = (res + (n - picked) * dfs(picked + 1, delivered)) % MOD
            if delivered < picked:
                res = (res + (picked - delivered) * dfs(picked, delivered + 1)) % MOD

            dp[picked][delivered] = res
            return res

        return dfs(0, 0)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;
    private int[][] dp;

    public int countOrders(int n) {
        dp = new int[n + 1][n + 1];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= n; j++) {
                dp[i][j] = -1;
            }
        }
        dp[n][n] = 1;
        return dfs(0, 0, n);
    }

    private int dfs(int picked, int delivered, int n) {
        if (dp[picked][delivered] != -1) {
            return dp[picked][delivered];
        }

        long res = 0;
        if (picked < n) {
            res = ((res + (n - picked) * 1L * dfs(picked + 1, delivered, n)) % MOD);
        }
        if (delivered < picked) {
            res = ((res + (picked - delivered) * 1L * dfs(picked, delivered + 1, n)) % MOD);
        }

        return dp[picked][delivered] = (int)res;
    }
}
```

```cpp
class Solution {
public:
    static const int MOD = 1'000'000'007;
    vector<vector<int>> dp;

    int countOrders(int n) {
        dp.assign(n + 1, vector<int>(n + 1, -1));
        dp[n][n] = 1;
        return dfs(0, 0, n);
    }

private:
    int dfs(int picked, int delivered, int n) {
        if (dp[picked][delivered] != -1) {
            return dp[picked][delivered];
        }

        int res = 0;
        if (picked < n) {
            res = (res + (n - picked) * 1LL * dfs(picked + 1, delivered, n)) % MOD;
        }
        if (delivered < picked) {
            res = (res + (picked - delivered) * 1LL * dfs(picked, delivered + 1, n)) % MOD;
        }

        return dp[picked][delivered] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countOrders(n) {
        const MOD = 1_000_000_007;
        const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(-1));

        const dfs = (picked, delivered) => {
            if (picked === n && delivered === n) {
                return 1;
            }
            if (dp[picked][delivered] !== -1) {
                return dp[picked][delivered];
            }

            let res = 0;
            if (picked < n) {
                res = (res + (n - picked) * dfs(picked + 1, delivered)) % MOD;
            }
            if (delivered < picked) {
                res =
                    (res + (picked - delivered) * dfs(picked, delivered + 1)) %
                    MOD;
            }

            dp[picked][delivered] = res;
            return res;
        };

        return dfs(0, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def countOrders(self, n: int) -> int:
        MOD = 1000000007
        dp = [[0] * (n + 1) for _ in range(n + 1)]
        dp[0][0] = 1

        for picked in range(n + 1):
            for delivered in range(n + 1):
                if picked < n:
                    dp[picked + 1][delivered] = (
                        (dp[picked + 1][delivered] +
                        (n - picked) * dp[picked][delivered]) % MOD
                    )

                if delivered < picked:
                    dp[picked][delivered + 1] = (
                        (dp[picked][delivered + 1] +
                        (picked - delivered) * dp[picked][delivered]) % MOD
                    )

        return dp[n][n]
```

```java
public class Solution {
    public int countOrders(int n) {
        final int MOD = 1_000_000_007;
        int[][] dp = new int[n + 1][n + 1];
        dp[0][0] = 1;

        for (int picked = 0; picked <= n; picked++) {
            for (int delivered = 0; delivered <= n; delivered++) {
                if (picked < n) {
                    dp[picked + 1][delivered] = (int) ((dp[picked + 1][delivered] +
                                                (n - picked) * 1L * dp[picked][delivered]) % MOD);
                }
                if (delivered < picked) {
                    dp[picked][delivered + 1] = (int) ((dp[picked][delivered + 1] +
                                                (picked - delivered) * 1L * dp[picked][delivered]) % MOD);
                }
            }
        }

        return dp[n][n];
    }
}
```

```cpp
class Solution {
public:
    int countOrders(int n) {
        const int MOD = 1'000'000'007;
        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));
        dp[0][0] = 1;

        for (int picked = 0; picked <= n; picked++) {
            for (int delivered = 0; delivered <= n; delivered++) {
                if (picked < n) {
                    dp[picked + 1][delivered] = (dp[picked + 1][delivered] +
                                                (n - picked) * 1LL * dp[picked][delivered]) % MOD;
                }
                if (delivered < picked) {
                    dp[picked][delivered + 1] = (dp[picked][delivered + 1] +
                                                (picked - delivered) * 1LL * dp[picked][delivered]) % MOD;
                }
            }
        }

        return dp[n][n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countOrders(n) {
        const MOD = 1_000_000_007;
        const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
        dp[0][0] = 1;

        for (let picked = 0; picked <= n; picked++) {
            for (let delivered = 0; delivered <= n; delivered++) {
                if (picked < n) {
                    dp[picked + 1][delivered] =
                        (dp[picked + 1][delivered] +
                            (n - picked) * dp[picked][delivered]) %
                        MOD;
                }

                if (delivered < picked) {
                    dp[picked][delivered + 1] =
                        (dp[picked][delivered + 1] +
                            (picked - delivered) * dp[picked][delivered]) %
                        MOD;
                }
            }
        }

        return dp[n][n];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def countOrders(self, n: int) -> int:
        MOD = 1000000007
        dp = [0] * (n + 1)
        dp[0] = 1

        for picked in range(n + 1):
            for delivered in range(picked):
                dp[delivered + 1] = (
                    (dp[delivered + 1] +
                    (picked - delivered) * dp[delivered]) % MOD
                )

            if picked < n:
                next_dp = [0] * (n + 1)
                for delivered in range(picked + 1):
                    next_dp[delivered] = (
                        (next_dp[delivered] +
                        (n - picked) * dp[delivered]) % MOD
                    )
                dp = next_dp

        return dp[n]
```

```java
public class Solution {
    public int countOrders(int n) {
        int MOD = 1000000007;
        int[] dp = new int[n + 1];
        dp[0] = 1;

        for (int picked = 0; picked <= n; picked++) {
            for (int delivered = 0; delivered < picked; delivered++) {
                dp[delivered + 1] = (int)((dp[delivered + 1] +
                                    (picked - delivered) * 1L * dp[delivered]) % MOD);
            }

            if (picked < n) {
                int[] next_dp = new int[n + 1];
                for (int delivered = 0; delivered <= picked; delivered++) {
                    next_dp[delivered] = (int)((next_dp[delivered] +
                                         (n - picked) *  1L *dp[delivered]) % MOD);
                }
                dp = next_dp;
            }
        }

        return dp[n];
    }
}
```

```cpp
class Solution {
public:
    int countOrders(int n) {
        const int MOD = 1000000007;
        vector<int> dp(n + 1);
        dp[0] = 1;

        for (int picked = 0; picked <= n; picked++) {
            for (int delivered = 0; delivered < picked; delivered++) {
                dp[delivered + 1] = (int)((dp[delivered + 1] +
                                    (picked - delivered) * 1LL * dp[delivered]) % MOD);
            }
            if (picked < n) {
                vector<int> next_dp(n + 1);
                for (int delivered = 0; delivered <= picked; delivered++) {
                    next_dp[delivered] = (int)((next_dp[delivered] +
                                         (n - picked) * 1LL * dp[delivered]) % MOD);
                }
                dp = next_dp;
            }
        }

        return dp[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countOrders(n) {
        const MOD = 1000000007;
        let dp = new Array(n + 1).fill(0);
        dp[0] = 1;

        for (let picked = 0; picked <= n; picked++) {
            for (let delivered = 0; delivered < picked; delivered++) {
                dp[delivered + 1] =
                    (dp[delivered + 1] + (picked - delivered) * dp[delivered]) %
                    MOD;
            }

            if (picked < n) {
                let next_dp = new Array(n + 1).fill(0);
                for (let delivered = 0; delivered <= picked; delivered++) {
                    next_dp[delivered] =
                        (next_dp[delivered] + (n - picked) * dp[delivered]) %
                        MOD;
                }
                dp = next_dp;
            }
        }

        return dp[n];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 5. Combinatorics

::tabs-start

```python
class Solution:
    def countOrders(self, n: int) -> int:
        MOD = 1000000007
        slots, res = 2 * n, 1
        while slots > 0:
            valid_choices = slots * (slots - 1) // 2
            res = (res * valid_choices) % MOD
            slots -= 2
        return res
```

```java
public class Solution {
    public int countOrders(int n) {
        int MOD = 1000000007;
        long slots = 2 * n, res = 1;

        while (slots > 0) {
            long validChoices = slots * (slots - 1) / 2;
            res = (res * validChoices) % MOD;
            slots -= 2;
        }
        return (int) res;
    }
}
```

```cpp
class Solution {
public:
    int countOrders(int n) {
        const int MOD = 1000000007;
        long long slots = 2 * n, res = 1;

        while (slots > 0) {
            long long validChoices = slots * (slots - 1) / 2;
            res = (res * validChoices) % MOD;
            slots -= 2;
        }
        return (int) res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countOrders(n) {
        const MOD = 1000000007;
        let slots = 2 * n,
            res = 1;

        while (slots > 0) {
            let validChoices = (slots * (slots - 1)) / 2;
            res = (res * validChoices) % MOD;
            slots -= 2;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 6. Probability

::tabs-start

```python
class Solution:
    def countOrders(self, n: int) -> int:
        MOD = 1000000007
        res = 1

        for slot in range(1, 2 * n + 1):
            res  *= slot
            if slot % 2 == 0:
                res >>= 1
            res %= MOD

        return res
```

```java
public class Solution {
    public int countOrders(int n) {
        int MOD = 1000000007;
        long res = 1;

        for (int slot = 1; slot <= 2 * n; slot++) {
            res *= slot;
            if (slot % 2 == 0) {
                res >>= 1;
            }
            res %= MOD;
        }
        return (int) res;
    }
}
```

```cpp
class Solution {
public:
    int countOrders(int n) {
        const int MOD = 1000000007;
        long long res = 1;

        for (int slot = 1; slot <= 2 * n; slot++) {
            res *= slot;
            if (slot % 2 == 0) {
                res >>= 1;
            }
            res %= MOD;
        }
        return (int) res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    countOrders(n) {
        const MOD = BigInt(1000000007);
        let res = BigInt(1);

        for (let slot = 1; slot <= 2 * n; slot++) {
            res *= BigInt(slot);
            if (slot % 2 === 0) {
                res /= BigInt(2);
            }
            res %= MOD;
        }
        return Number(res);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
