## 1. Recursion

::tabs-start

```python
class Solution:
    def profitableSchemes(self, n: int, minProfit: int, group: List[int], profit: List[int]) -> int:
        mod = 10**9 + 7

        def dfs(i, n, p):
            if i == len(group):
                return 1 if p >= minProfit else 0

            res = dfs(i + 1, n, p)
            if n - group[i] >= 0:
                res = (res + dfs(i + 1, n - group[i], p + profit[i])) % mod

            return res

        return dfs(0, n, 0)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int profitableSchemes(int n, int minProfit, int[] group, int[] profit) {
        return dfs(0, n, 0, group, profit, minProfit);
    }

    private int dfs(int i, int n, int p, int[] group, int[] profit, int minProfit) {
        if (i == group.length) {
            return p >= minProfit ? 1 : 0;
        }

        int res = dfs(i + 1, n, p, group, profit, minProfit);
        if (n - group[i] >= 0) {
            res = (res + dfs(i + 1, n - group[i], p + profit[i], group, profit, minProfit)) % MOD;
        }

        return res;
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;

public:
    int profitableSchemes(int n, int minProfit, vector<int>& group, vector<int>& profit) {
        return dfs(0, n, 0, group, profit, minProfit);
    }

private:
    int dfs(int i, int n, int p, const vector<int>& group, const vector<int>& profit, int minProfit) {
        if (i == group.size()) {
            return p >= minProfit ? 1 : 0;
        }

        int res = dfs(i + 1, n, p, group, profit, minProfit);
        if (n - group[i] >= 0) {
            res = (res + dfs(i + 1, n - group[i], p + profit[i], group, profit, minProfit)) % MOD;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} minProfit
     * @param {number[]} group
     * @param {number[]} profit
     * @return {number}
     */
    profitableSchemes(n, minProfit, group, profit) {
        const MOD = 1e9 + 7;

        const dfs = (i, n, p) => {
            if (i === group.length) {
                return p >= minProfit ? 1 : 0;
            }

            let res = dfs(i + 1, n, p);
            if (n - group[i] >= 0) {
                res = (res + dfs(i + 1, n - group[i], p + profit[i])) % MOD;
            }

            return res;
        };

        return dfs(0, n, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ N)$
- Space complexity: $O(N)$

> Where $N$ is the size of the $group$ array.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def profitableSchemes(self, n: int, minProfit: int, group: List[int], profit: List[int]) -> int:
        mod = 10**9 + 7
        dp = {}

        def dfs(i, n, p):
            if i == len(group):
                return 1 if p >= minProfit else 0
            if (i, n, p) in dp:
                return dp[(i, n, p)]

            res = dfs(i + 1, n, p)
            if n - group[i] >= 0:
                nxtP = min(p + profit[i], minProfit)
                res = (res + dfs(i + 1, n - group[i], nxtP)) % mod

            dp[(i, n, p)] = res
            return res

        return dfs(0, n, 0)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;
    private int[][][] dp;

    public int profitableSchemes(int n, int minProfit, int[] group, int[] profit) {
        dp = new int[group.length][n + 1][minProfit + 1];
        for (int[][] layer : dp) {
            for (int[] row : layer) {
                Arrays.fill(row, -1);
            }
        }
        return dfs(0, n, 0, group, profit, minProfit);
    }

    private int dfs(int i, int n, int p, int[] group, int[] profit, int minProfit) {
        if (i == group.length) {
            return p >= minProfit ? 1 : 0;
        }
        if (dp[i][n][p] != -1) {
            return dp[i][n][p];
        }

        int res = dfs(i + 1, n, p, group, profit, minProfit);
        if (n - group[i] >= 0) {
            int nxtP = Math.min(p + profit[i], minProfit);
            res = (res + dfs(i + 1, n - group[i], nxtP, group, profit, minProfit)) % MOD;
        }

        dp[i][n][p] = res;
        return res;
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;
    vector<vector<vector<int>>> dp;

public:
    int profitableSchemes(int n, int minProfit, vector<int>& group, vector<int>& profit) {
        dp = vector<vector<vector<int>>>(group.size(), vector<vector<int>>(n + 1, vector<int>(minProfit + 1, -1)));
        return dfs(0, n, 0, group, profit, minProfit);
    }

private:
    int dfs(int i, int n, int p, vector<int>& group, vector<int>& profit, int minProfit) {
        if (i == group.size()) {
            return p >= minProfit ? 1 : 0;
        }
        if (dp[i][n][p] != -1) {
            return dp[i][n][p];
        }

        int res = dfs(i + 1, n, p, group, profit, minProfit);
        if (n >= group[i]) {
            int nxtP = min(p + profit[i], minProfit);
            res = (res + dfs(i + 1, n - group[i], nxtP, group, profit, minProfit)) % MOD;
        }

        dp[i][n][p] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} minProfit
     * @param {number[]} group
     * @param {number[]} profit
     * @return {number}
     */
    profitableSchemes(n, minProfit, group, profit) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: group.length }, () =>
            Array.from({ length: n + 1 }, () => Array(minProfit + 1).fill(-1)),
        );

        const dfs = (i, n, p) => {
            if (i === group.length) {
                return p >= minProfit ? 1 : 0;
            }
            if (dp[i][n][p] !== -1) {
                return dp[i][n][p];
            }

            let res = dfs(i + 1, n, p);
            if (n >= group[i]) {
                const nxtP = Math.min(p + profit[i], minProfit);
                res = (res + dfs(i + 1, n - group[i], nxtP)) % MOD;
            }

            dp[i][n][p] = res;
            return res;
        };

        return dfs(0, n, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N * m * n)$
- Space complexity: $O(N * m * n)$

> Where $N$ is the size of the $group$ array, $m$ is the given minimum profit, and $n$ is the number of group members.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def profitableSchemes(self, n: int, minProfit: int, group: List[int], profit: List[int]) -> int:
        mod = 10**9 + 7
        N = len(group)

        dp = [[[0] * (minProfit + 1) for j in range(n + 2)] for i in range(N + 1)]
        for j in range(n + 1):
            dp[N][j][minProfit] = 1

        for i in range(N - 1, -1, -1):
            for j in range(n + 1):
                for p in range(minProfit + 1):
                    res = dp[i + 1][j][p]
                    if j >= group[i]:
                        nxtP = min(profit[i] + p, minProfit)
                        res = (res + dp[i + 1][j - group[i]][nxtP]) % mod
                    dp[i][j][p] = res

        return dp[0][n][0]
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int profitableSchemes(int n, int minProfit, int[] group, int[] profit) {
        int N = group.length;
        int[][][] dp = new int[N + 1][n + 2][minProfit + 1];

        for (int j = 0; j <= n; j++) {
            dp[N][j][minProfit] = 1;
        }

        for (int i = N - 1; i >= 0; i--) {
            for (int j = 0; j <= n; j++) {
                for (int p = 0; p <= minProfit; p++) {
                    int res = dp[i + 1][j][p];
                    if (j >= group[i]) {
                        int nxtP = Math.min(profit[i] + p, minProfit);
                        res = (res + dp[i + 1][j - group[i]][nxtP]) % MOD;
                    }
                    dp[i][j][p] = res;
                }
            }
        }

        return dp[0][n][0];
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;

public:
    int profitableSchemes(int n, int minProfit, vector<int>& group, vector<int>& profit) {
        int N = group.size();
        vector<vector<vector<int>>> dp(N + 1, vector<vector<int>>(n + 2, vector<int>(minProfit + 1, 0)));

        for (int j = 0; j <= n; j++) {
            dp[N][j][minProfit] = 1;
        }

        for (int i = N - 1; i >= 0; i--) {
            for (int j = 0; j <= n; j++) {
                for (int p = 0; p <= minProfit; p++) {
                    int res = dp[i + 1][j][p];
                    if (j >= group[i]) {
                        int nxtP = min(profit[i] + p, minProfit);
                        res = (res + dp[i + 1][j - group[i]][nxtP]) % MOD;
                    }
                    dp[i][j][p] = res;
                }
            }
        }

        return dp[0][n][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} minProfit
     * @param {number[]} group
     * @param {number[]} profit
     * @return {number}
     */
    profitableSchemes(n, minProfit, group, profit) {
        const MOD = 1e9 + 7;
        const N = group.length;

        const dp = Array.from({ length: N + 1 }, () =>
            Array.from({ length: n + 2 }, () => Array(minProfit + 1).fill(0)),
        );

        for (let j = 0; j <= n; j++) {
            dp[N][j][minProfit] = 1;
        }

        for (let i = N - 1; i >= 0; i--) {
            for (let j = 0; j <= n; j++) {
                for (let p = 0; p <= minProfit; p++) {
                    let res = dp[i + 1][j][p];
                    if (j >= group[i]) {
                        const nxtP = Math.min(profit[i] + p, minProfit);
                        res = (res + dp[i + 1][j - group[i]][nxtP]) % MOD;
                    }
                    dp[i][j][p] = res;
                }
            }
        }

        return dp[0][n][0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N * m * n)$
- Space complexity: $O(N * m * n)$

> Where $N$ is the size of the $group$ array, $m$ is the given minimum profit, and $n$ is the number of group members.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def profitableSchemes(self, n: int, minProfit: int, group: List[int], profit: List[int]) -> int:
        mod = 10**9 + 7
        N = len(group)

        dp = [[0] * (minProfit + 1) for j in range(n + 2)]
        for j in range(n + 1):
            dp[j][minProfit] = 1

        for i in range(N - 1, -1, -1):
            for j in range(n, -1, -1):
                for p in range(minProfit + 1):
                    res = dp[j][p]
                    if j >= group[i]:
                        nxtP = min(profit[i] + p, minProfit)
                        res = (res + dp[j - group[i]][nxtP]) % mod
                    dp[j][p] = res

        return dp[n][0]
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int profitableSchemes(int n, int minProfit, int[] group, int[] profit) {
        int N = group.length;
        int[][] dp = new int[n + 2][minProfit + 1];

        for (int j = 0; j <= n; j++) {
            dp[j][minProfit] = 1;
        }

        for (int i = N - 1; i >= 0; i--) {
            for (int j = n; j >= 0; j--) {
                for (int p = 0; p <= minProfit; p++) {
                    int res = dp[j][p];
                    if (j >= group[i]) {
                        int nxtP = Math.min(profit[i] + p, minProfit);
                        res = (res + dp[j - group[i]][nxtP]) % MOD;
                    }
                    dp[j][p] = res;
                }
            }
        }

        return dp[n][0];
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;

public:
    int profitableSchemes(int n, int minProfit, vector<int>& group, vector<int>& profit) {
        int N = group.size();
        vector<vector<int>> dp(n + 2, vector<int>(minProfit + 1, 0));

        for (int j = 0; j <= n; j++) {
            dp[j][minProfit] = 1;
        }

        for (int i = N - 1; i >= 0; i--) {
            for (int j = n; j >= 0; j--) {
                for (int p = 0; p <= minProfit; p++) {
                    int res = dp[j][p];
                    if (j >= group[i]) {
                        int nxtP = min(profit[i] + p, minProfit);
                        res = (res + dp[j - group[i]][nxtP]) % MOD;
                    }
                    dp[j][p] = res;
                }
            }
        }

        return dp[n][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} minProfit
     * @param {number[]} group
     * @param {number[]} profit
     * @return {number}
     */
    profitableSchemes(n, minProfit, group, profit) {
        const MOD = 1e9 + 7;
        const N = group.length;

        const dp = Array.from({ length: n + 2 }, () =>
            Array(minProfit + 1).fill(0),
        );

        for (let j = 0; j <= n; j++) {
            dp[j][minProfit] = 1;
        }

        for (let i = N - 1; i >= 0; i--) {
            for (let j = n; j >= 0; j--) {
                for (let p = 0; p <= minProfit; p++) {
                    let res = dp[j][p];
                    if (j >= group[i]) {
                        const nxtP = Math.min(profit[i] + p, minProfit);
                        res = (res + dp[j - group[i]][nxtP]) % MOD;
                    }
                    dp[j][p] = res;
                }
            }
        }

        return dp[n][0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N * m * n)$
- Space complexity: $O(m * n)$

> Where $N$ is the size of the $group$ array, $m$ is the given minimum profit, and $n$ is the number of group members.
