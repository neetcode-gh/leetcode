## 1. Dynamic Programming (Top-Down) - I

::tabs-start

```python
class Solution:
    def checkRecord(self, n: int) -> int:
        MOD = 1000000007
        cache = [[[-1 for _ in range(3)] for _ in range(2)] for _ in range(n + 1)]

        def dfs(i, cntA, cntL):
            if i == 0:
                return 1
            if cache[i][cntA][cntL] != -1:
                return cache[i][cntA][cntL]

            res = dfs(i - 1, cntA, 0) % MOD

            if cntA == 0:
                res = (res + dfs(i - 1, 1, 0)) % MOD

            if cntL < 2:
                res = (res + dfs(i - 1, cntA, cntL + 1)) % MOD

            cache[i][cntA][cntL] = res
            return res

        return dfs(n, 0, 0)
```

```java
public class Solution {
    private static final int MOD = 1000000007;
    private int[][][] cache;

    public int checkRecord(int n) {
        this.cache = new int[n + 1][2][3];
        for (int[][] matrix : cache) {
            for (int[] row : matrix) {
                Arrays.fill(row, -1);
            }
        }
        return dfs(n, 0, 0);
    }

    private int dfs(int i, int cntA, int cntL) {
        if (i == 0) {
            return 1;
        }
        if (cache[i][cntA][cntL] != -1) {
            return cache[i][cntA][cntL];
        }

        int res = dfs(i - 1, cntA, 0) % MOD;

        if (cntA == 0) {
            res = (res + dfs(i - 1, 1, 0)) % MOD;
        }

        if (cntL < 2) {
            res = (res + dfs(i - 1, cntA, cntL + 1)) % MOD;
        }

        return cache[i][cntA][cntL] = res;
    }
}
```

```cpp
class Solution {
    const int MOD = 1000000007;
    vector<vector<vector<int>>> cache;

public:
    int checkRecord(int n) {
        cache.assign(n + 1, vector<vector<int>>(2, vector<int>(3, -1)));
        return dfs(n, 0, 0);
    }

private:
    int dfs(int i, int cntA, int cntL) {
        if (i == 0) {
            return 1;
        }
        if (cache[i][cntA][cntL] != -1) {
            return cache[i][cntA][cntL];
        }

        int res = dfs(i - 1, cntA, 0) % MOD;

        if (cntA == 0) {
            res = (res + dfs(i - 1, 1, 0)) % MOD;
        }

        if (cntL < 2) {
            res = (res + dfs(i - 1, cntA, cntL + 1)) % MOD;
        }

        return cache[i][cntA][cntL] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    checkRecord(n) {
        const MOD = 1000000007;
        let cache = Array.from({ length: n + 1 }, () =>
            Array.from({ length: 2 }, () => new Array(3).fill(-1)),
        );

        const dfs = (i, cntA, cntL) => {
            if (i === 0) return 1;
            if (cache[i][cntA][cntL] !== -1) return cache[i][cntA][cntL];

            let res = dfs(i - 1, cntA, 0) % MOD;

            if (cntA === 0) {
                res = (res + dfs(i - 1, 1, 0)) % MOD;
            }

            if (cntL < 2) {
                res = (res + dfs(i - 1, cntA, cntL + 1)) % MOD;
            }

            return (cache[i][cntA][cntL] = res);
        };

        return dfs(n, 0, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down) - II

::tabs-start

```python
class Solution:
    def checkRecord(self, n: int) -> int:
        MOD = 10**9 + 7
        cache = {}

        def count(n):
            if n == 1:
                # (A, L)
                return {
                    (0, 0): 1, (0, 1): 1, (0, 2): 0,
                    (1, 0): 1, (1, 1): 0, (1, 2): 0
                }

            if n in cache:
                return cache[n]

            tmp = count(n - 1)
            res = defaultdict(int)

            # Choose P
            res[(0, 0)] = ((tmp[(0, 0)] + tmp[(0, 1)]) % MOD + tmp[(0, 2)]) % MOD
            res[(1, 0)] = ((tmp[(1, 0)] + tmp[(1, 1)]) % MOD + tmp[(1, 2)]) % MOD

            # Choose L
            res[(0, 1)] = tmp[(0, 0)]
            res[(0, 2)] = tmp[(0, 1)]
            res[(1, 1)] = tmp[(1, 0)]
            res[(1, 2)] = tmp[(1, 1)]

            # Choose A
            res[(1, 0)] += ((tmp[(0, 0)] + tmp[(0, 1)]) % MOD + tmp[(0, 2)]) % MOD

            cache[n] = res
            return res

        return sum(count(n).values()) % MOD
```

```java
public class Solution {
    private static final int MOD = 1000000007;
    private int[][][] cache;
    private int[][] baseCase;

    public int checkRecord(int n) {
        cache = new int[n + 1][2][3];
        baseCase = new int[][]{{1, 1, 0}, {1, 0, 0}};
        for (int[][] matrix : cache) {
            for (int[] row : matrix) {
                Arrays.fill(row, -1);
            }
        }
        int[][] result = count(n);
        int total = 0;
        for (int[] row : result) {
            for (int val : row) {
                total = (total + val) % MOD;
            }
        }
        return total;
    }

    private int[][] count(int n) {
        if (n == 1) {
            // (A, L)
            return baseCase;
        }

        if (cache[n][0][0] != -1) {
            return cache[n];
        }

        int[][] prev = count(n - 1);
        int[][] res = cache[n];

        // Choose P
        res[0][0] = ((prev[0][0] + prev[0][1]) % MOD + prev[0][2]) % MOD;
        res[1][0] = ((prev[1][0] + prev[1][1]) % MOD + prev[1][2]) % MOD;

        // Choose L
        res[0][1] = prev[0][0];
        res[0][2] = prev[0][1];
        res[1][1] = prev[1][0];
        res[1][2] = prev[1][1];

        // Choose A
        res[1][0] = (res[1][0] + ((prev[0][0] + prev[0][1]) % MOD + prev[0][2]) % MOD) % MOD;

        return cache[n];
    }
}
```

```cpp
class Solution {
private:
    static constexpr int MOD = 1000000007;
    vector<vector<int>> baseCase = {{1, 1, 0}, {1, 0, 0}};
    vector<vector<vector<int>>> cache;

public:
    int checkRecord(int n) {
        cache.assign(n + 1, vector<vector<int>>(2, vector<int>(3, -1)));
        const vector<vector<int>>& result = count(n);
        int total = 0;
        for (const auto& row : result) {
            for (int val : row) {
                total = (total + val) % MOD;
            }
        }
        return total;
    }

private:
    const vector<vector<int>>& count(int n) {
        if (n == 1) {
            return baseCase;
        }

        if (cache[n][0][0] != -1) {
            return cache[n];
        }

        const vector<vector<int>>& prev = count(n - 1);
        auto& res = cache[n];

        // Choose P
        res[0][0] = ((prev[0][0] + prev[0][1]) % MOD + prev[0][2]) % MOD;
        res[1][0] = ((prev[1][0] + prev[1][1]) % MOD + prev[1][2]) % MOD;

        // Choose L
        res[0][1] = prev[0][0];
        res[0][2] = prev[0][1];
        res[1][1] = prev[1][0];
        res[1][2] = prev[1][1];

        // Choose A
        res[1][0] = (res[1][0] + ((prev[0][0] + prev[0][1]) % MOD + prev[0][2]) % MOD) % MOD;

        return cache[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    checkRecord(n) {
        const MOD = 1000000007;
        const baseCase = [
            [1, 1, 0], // (A = 0, L = 0, 1, 2)
            [1, 0, 0], // (A = 1, L = 0, 1, 2)
        ];
        let cache = Array.from({ length: n + 1 }, () =>
            Array.from({ length: 2 }, () => new Array(3).fill(-1)),
        );

        const count = (n) => {
            if (n === 1) return baseCase;
            if (cache[n][0][0] !== -1) return cache[n];

            const prev = count(n - 1);
            const res = cache[n];

            // Choose P
            res[0][0] = (((prev[0][0] + prev[0][1]) % MOD) + prev[0][2]) % MOD;
            res[1][0] = (((prev[1][0] + prev[1][1]) % MOD) + prev[1][2]) % MOD;

            // Choose L
            res[0][1] = prev[0][0];
            res[0][2] = prev[0][1];
            res[1][1] = prev[1][0];
            res[1][2] = prev[1][1];

            // Choose A
            res[1][0] =
                (res[1][0] +
                    ((((prev[0][0] + prev[0][1]) % MOD) + prev[0][2]) % MOD)) %
                MOD;

            return res;
        };

        const result = count(n);
        let total = 0;
        for (const row of result) {
            for (const val of row) {
                total = (total + val) % MOD;
            }
        }
        return total;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def checkRecord(self, n: int) -> int:
        MOD = 1000000007
        dp = [[[0 for _ in range(3)] for _ in range(2)] for _ in range(n + 1)]

        dp[0][0][0] = 1  # Base case

        for i in range(1, n + 1):
            for cntA in range(2):
                for cntL in range(3):
                    # Choose P
                    dp[i][cntA][0] = (dp[i][cntA][0] + dp[i - 1][cntA][cntL]) % MOD

                    # Choose A
                    if cntA > 0:
                        dp[i][cntA][0] = (dp[i][cntA][0] + dp[i - 1][cntA - 1][cntL]) % MOD

                    # Choose L
                    if cntL > 0:
                        dp[i][cntA][cntL] = (dp[i][cntA][cntL] + dp[i - 1][cntA][cntL - 1]) % MOD

        return sum(dp[n][cntA][cntL] for cntA in range(2) for cntL in range(3)) % MOD
```

```java
public class Solution {
    public int checkRecord(int n) {
        final int MOD = 1000000007;
        int[][][] dp = new int[n + 1][2][3];

        dp[0][0][0] = 1;

        for (int i = 1; i <= n; i++) {
            for (int cntA = 0; cntA < 2; cntA++) {
                for (int cntL = 0; cntL < 3; cntL++) {
                    // Choose P
                    dp[i][cntA][0] = (dp[i][cntA][0] + dp[i - 1][cntA][cntL]) % MOD;

                    // Choose A
                    if (cntA > 0) {
                        dp[i][cntA][0] = (dp[i][cntA][0] + dp[i - 1][cntA - 1][cntL]) % MOD;
                    }

                    // Choose L
                    if (cntL > 0) {
                        dp[i][cntA][cntL] = (dp[i][cntA][cntL] + dp[i - 1][cntA][cntL - 1]) % MOD;
                    }
                }
            }
        }

        int result = 0;
        for (int cntA = 0; cntA < 2; cntA++) {
            for (int cntL = 0; cntL < 3; cntL++) {
                result = (result + dp[n][cntA][cntL]) % MOD;
            }
        }

        return result;
    }
}
```

```cpp
class Solution {
public:
    int checkRecord(int n) {
        const int MOD = 1000000007;
        vector<vector<vector<int>>> dp(n + 1, vector<vector<int>>(2, vector<int>(3, 0)));

        dp[0][0][0] = 1;

        for (int i = 1; i <= n; i++) {
            for (int cntA = 0; cntA < 2; cntA++) {
                for (int cntL = 0; cntL < 3; cntL++) {
                    // Choose P
                    dp[i][cntA][0] = (dp[i][cntA][0] + dp[i - 1][cntA][cntL]) % MOD;

                    // Choose A
                    if (cntA > 0) {
                        dp[i][cntA][0] = (dp[i][cntA][0] + dp[i - 1][cntA - 1][cntL]) % MOD;
                    }

                    // Choose L
                    if (cntL > 0) {
                        dp[i][cntA][cntL] = (dp[i][cntA][cntL] + dp[i - 1][cntA][cntL - 1]) % MOD;
                    }
                }
            }
        }

        int result = 0;
        for (int cntA = 0; cntA < 2; cntA++) {
            for (int cntL = 0; cntL < 3; cntL++) {
                result = (result + dp[n][cntA][cntL]) % MOD;
            }
        }

        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    checkRecord(n) {
        const MOD = 1000000007;
        const dp = Array.from({ length: n + 1 }, () =>
            Array.from({ length: 2 }, () => new Array(3).fill(0)),
        );

        dp[0][0][0] = 1;

        for (let i = 1; i <= n; i++) {
            for (let cntA = 0; cntA < 2; cntA++) {
                for (let cntL = 0; cntL < 3; cntL++) {
                    // Choose P
                    dp[i][cntA][0] =
                        (dp[i][cntA][0] + dp[i - 1][cntA][cntL]) % MOD;

                    // Choose A
                    if (cntA > 0) {
                        dp[i][cntA][0] =
                            (dp[i][cntA][0] + dp[i - 1][cntA - 1][cntL]) % MOD;
                    }

                    // Choose L
                    if (cntL > 0) {
                        dp[i][cntA][cntL] =
                            (dp[i][cntA][cntL] + dp[i - 1][cntA][cntL - 1]) %
                            MOD;
                    }
                }
            }
        }

        let result = 0;
        for (let cntA = 0; cntA < 2; cntA++) {
            for (let cntL = 0; cntL < 3; cntL++) {
                result = (result + dp[n][cntA][cntL]) % MOD;
            }
        }

        return result;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized) - I

::tabs-start

```python
class Solution:
    def checkRecord(self, n: int) -> int:
        if n == 1:
            return 3

        MOD = 10**9 + 7
        dp = {
            (0, 0): 1, (0, 1): 1, (0, 2): 0,
            (1, 0): 1, (1, 1): 0, (1, 2): 0
        }

        for i in range(n - 1):
            ndp = defaultdict(int)

            # Choose P
            ndp[(0, 0)] = ((dp[(0, 0)] + dp[(0, 1)]) % MOD + dp[(0, 2)]) % MOD
            ndp[(1, 0)] = ((dp[(1, 0)] + dp[(1, 1)]) % MOD + dp[(1, 2)]) % MOD

            # Choose L
            ndp[(0, 1)] = dp[(0, 0)]
            ndp[(1, 1)] = dp[(1, 0)]
            ndp[(0, 2)] = dp[(0, 1)]
            ndp[(1, 2)] = dp[(1, 1)]

            # Choose A
            ndp[(1, 0)] = (ndp[(1, 0)] + (((dp[(0, 0)] + dp[(0, 1)]) % MOD + dp[(0, 2)]) % MOD)) % MOD

            dp = ndp

        return sum(dp.values()) % MOD
```

```java
public class Solution {
    public int checkRecord(int n) {
        if (n == 1) return 3;

        final int MOD = 1000000007;
        int[][] dp = {{1, 1, 0}, {1, 0, 0}};

        for (int i = 0; i < n - 1; i++) {
            int[][] ndp = new int[2][3];

            // Choose P
            ndp[0][0] = ((dp[0][0] + dp[0][1]) % MOD + dp[0][2]) % MOD;
            ndp[1][0] = ((dp[1][0] + dp[1][1]) % MOD + dp[1][2]) % MOD;

            // Choose L
            ndp[0][1] = dp[0][0];
            ndp[1][1] = dp[1][0];
            ndp[0][2] = dp[0][1];
            ndp[1][2] = dp[1][1];

            // Choose A
            ndp[1][0] = (ndp[1][0] + ((dp[0][0] + dp[0][1]) % MOD + dp[0][2]) % MOD) % MOD;

            dp = ndp;
        }

        int total = 0;
        for (int[] row : dp) {
            for (int val : row) {
                total = (total + val) % MOD;
            }
        }
        return total;
    }
}
```

```cpp
class Solution {
public:
    int checkRecord(int n) {
        if (n == 1) return 3;

        const int MOD = 1000000007;
        vector<vector<int>> dp = {{1, 1, 0}, {1, 0, 0}};

        for (int i = 0; i < n - 1; i++) {
            vector<vector<int>> ndp(2, vector<int>(3, 0));

            // Choose P
            ndp[0][0] = ((dp[0][0] + dp[0][1]) % MOD + dp[0][2]) % MOD;
            ndp[1][0] = ((dp[1][0] + dp[1][1]) % MOD + dp[1][2]) % MOD;

            // Choose L
            ndp[0][1] = dp[0][0];
            ndp[1][1] = dp[1][0];
            ndp[0][2] = dp[0][1];
            ndp[1][2] = dp[1][1];

            // Choose A
            ndp[1][0] = (ndp[1][0] + ((dp[0][0] + dp[0][1]) % MOD + dp[0][2]) % MOD) % MOD;

            swap(dp, ndp);
        }

        int total = 0;
        for (auto& row : dp) {
            for (int val : row) {
                total = (total + val) % MOD;
            }
        }
        return total;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    checkRecord(n) {
        if (n === 1) return 3;

        const MOD = 1000000007;
        let dp = [
            [1, 1, 0],
            [1, 0, 0],
        ];

        for (let i = 0; i < n - 1; i++) {
            let ndp = Array.from({ length: 2 }, () => new Array(3).fill(0));

            // Choose P
            ndp[0][0] = (((dp[0][0] + dp[0][1]) % MOD) + dp[0][2]) % MOD;
            ndp[1][0] = (((dp[1][0] + dp[1][1]) % MOD) + dp[1][2]) % MOD;

            // Choose L
            ndp[0][1] = dp[0][0];
            ndp[1][1] = dp[1][0];
            ndp[0][2] = dp[0][1];
            ndp[1][2] = dp[1][1];

            // Choose A
            ndp[1][0] =
                (ndp[1][0] +
                    ((((dp[0][0] + dp[0][1]) % MOD) + dp[0][2]) % MOD)) %
                MOD;

            [dp, ndp] = [ndp, dp];
        }

        let total = 0;
        for (let row of dp) {
            for (let val of row) {
                total = (total + val) % MOD;
            }
        }
        return total;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 5. Dynamic Programming (Space Optimized) - II

::tabs-start

```python
class Solution:
    def checkRecord(self, n: int) -> int:
        MOD = 1000000007
        dp = [[0] * 3 for _ in range(2)]

        dp[0][0] = 1  # Base case

        for i in range(1, n + 1):
            next_dp = [[0] * 3 for _ in range(2)]

            for cntA in range(2):
                for cntL in range(3):
                    # Choose P
                    next_dp[cntA][0] = (next_dp[cntA][0] + dp[cntA][cntL]) % MOD

                    # Choose A
                    if cntA > 0:
                        next_dp[cntA][0] = (next_dp[cntA][0] + dp[cntA - 1][cntL]) % MOD

                    # Choose L
                    if cntL > 0:
                        next_dp[cntA][cntL] = (next_dp[cntA][cntL] + dp[cntA][cntL - 1]) % MOD

            dp = next_dp

        return sum(dp[cntA][cntL] for cntA in range(2) for cntL in range(3)) % MOD
```

```java
public class Solution {
    public int checkRecord(int n) {
        final int MOD = 1000000007;
        int[][] dp = new int[2][3];

        dp[0][0] = 1;

        for (int i = 1; i <= n; i++) {
            int[][] nextDp = new int[2][3];

            for (int cntA = 0; cntA < 2; cntA++) {
                for (int cntL = 0; cntL < 3; cntL++) {
                    // Choose P
                    nextDp[cntA][0] = (nextDp[cntA][0] + dp[cntA][cntL]) % MOD;

                    // Choose A
                    if (cntA > 0) {
                        nextDp[cntA][0] = (nextDp[cntA][0] + dp[cntA - 1][cntL]) % MOD;
                    }

                    // Choose L
                    if (cntL > 0) {
                        nextDp[cntA][cntL] = (nextDp[cntA][cntL] + dp[cntA][cntL - 1]) % MOD;
                    }
                }
            }

            dp = nextDp;
        }

        int result = 0;
        for (int cntA = 0; cntA < 2; cntA++) {
            for (int cntL = 0; cntL < 3; cntL++) {
                result = (result + dp[cntA][cntL]) % MOD;
            }
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    int checkRecord(int n) {
        const int MOD = 1000000007;
        vector<vector<int>> dp(2, vector<int>(3, 0));

        dp[0][0] = 1;

        for (int i = 1; i <= n; i++) {
            vector<vector<int>> nextDp(2, vector<int>(3, 0));

            for (int cntA = 0; cntA < 2; cntA++) {
                for (int cntL = 0; cntL < 3; cntL++) {
                    // Choose P
                    nextDp[cntA][0] = (nextDp[cntA][0] + dp[cntA][cntL]) % MOD;

                    // Choose A
                    if (cntA > 0) {
                        nextDp[cntA][0] = (nextDp[cntA][0] + dp[cntA - 1][cntL]) % MOD;
                    }

                    // Choose L
                    if (cntL > 0) {
                        nextDp[cntA][cntL] = (nextDp[cntA][cntL] + dp[cntA][cntL - 1]) % MOD;
                    }
                }
            }

            dp = nextDp;
        }

        int result = 0;
        for (int cntA = 0; cntA < 2; cntA++) {
            for (int cntL = 0; cntL < 3; cntL++) {
                result = (result + dp[cntA][cntL]) % MOD;
            }
        }

        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    checkRecord(n) {
        const MOD = 1000000007;
        let dp = Array.from({ length: 2 }, () => new Array(3).fill(0));

        dp[0][0] = 1;

        for (let i = 1; i <= n; i++) {
            let nextDp = Array.from({ length: 2 }, () => new Array(3).fill(0));

            for (let cntA = 0; cntA < 2; cntA++) {
                for (let cntL = 0; cntL < 3; cntL++) {
                    // Choose P
                    nextDp[cntA][0] = (nextDp[cntA][0] + dp[cntA][cntL]) % MOD;

                    // Choose A
                    if (cntA > 0) {
                        nextDp[cntA][0] =
                            (nextDp[cntA][0] + dp[cntA - 1][cntL]) % MOD;
                    }

                    // Choose L
                    if (cntL > 0) {
                        nextDp[cntA][cntL] =
                            (nextDp[cntA][cntL] + dp[cntA][cntL - 1]) % MOD;
                    }
                }
            }

            dp = nextDp;
        }

        let result = 0;
        for (let cntA = 0; cntA < 2; cntA++) {
            for (let cntL = 0; cntL < 3; cntL++) {
                result = (result + dp[cntA][cntL]) % MOD;
            }
        }

        return result;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
