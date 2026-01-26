## Prerequisites
Before attempting this problem, you should be comfortable with:
- **0/1 Knapsack Problem** - This is a variation with two constraints (members and profit)
- **Recursion** - Building decision trees where each item can be included or excluded
- **Memoization** - Caching results to avoid redundant computation in overlapping subproblems
- **Dynamic Programming** - Converting recursive solutions to iterative bottom-up approaches
- **Modular Arithmetic** - Handling large results with modulo operations to prevent overflow

---

## 1. Recursion

### Intuition

This is a variation of the 0/1 knapsack problem with two constraints: number of members and minimum profit. For each crime, we decide whether to include it or skip it. If we include a crime, we use its required members and gain its profit. At the end, we count paths where total profit meets the threshold and total members used does not exceed the limit.

### Algorithm

1. Define a recursive function `dfs(i, n, p)` where:
   - `i` is the current crime index.
   - `n` is the remaining number of members available.
   - `p` is the profit accumulated so far.
2. Base case: if `i` equals the number of crimes, return `1` if `p >= minProfit`, else return `0`.
3. For the current crime:
   - Option 1: skip it and recurse with `dfs(i + 1, n, p)`.
   - Option 2: if we have enough members, include it and recurse with `dfs(i + 1, n - group[i], p + profit[i])`.
4. Sum both options and return the result modulo `10^9 + 7`.

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

```csharp
public class Solution {
    private const int MOD = 1000000007;

    public int ProfitableSchemes(int n, int minProfit, int[] group, int[] profit) {
        return Dfs(0, n, 0, group, profit, minProfit);
    }

    private int Dfs(int i, int n, int p, int[] group, int[] profit, int minProfit) {
        if (i == group.Length) {
            return p >= minProfit ? 1 : 0;
        }

        int res = Dfs(i + 1, n, p, group, profit, minProfit);
        if (n - group[i] >= 0) {
            res = (res + Dfs(i + 1, n - group[i], p + profit[i], group, profit, minProfit)) % MOD;
        }

        return res;
    }
}
```

```go
func profitableSchemes(n int, minProfit int, group []int, profit []int) int {
    const MOD = 1000000007

    var dfs func(i, n, p int) int
    dfs = func(i, n, p int) int {
        if i == len(group) {
            if p >= minProfit {
                return 1
            }
            return 0
        }

        res := dfs(i+1, n, p)
        if n-group[i] >= 0 {
            res = (res + dfs(i+1, n-group[i], p+profit[i])) % MOD
        }

        return res
    }

    return dfs(0, n, 0)
}
```

```kotlin
class Solution {
    private val MOD = 1000000007

    fun profitableSchemes(n: Int, minProfit: Int, group: IntArray, profit: IntArray): Int {
        return dfs(0, n, 0, group, profit, minProfit)
    }

    private fun dfs(i: Int, n: Int, p: Int, group: IntArray, profit: IntArray, minProfit: Int): Int {
        if (i == group.size) {
            return if (p >= minProfit) 1 else 0
        }

        var res = dfs(i + 1, n, p, group, profit, minProfit)
        if (n - group[i] >= 0) {
            res = (res + dfs(i + 1, n - group[i], p + profit[i], group, profit, minProfit)) % MOD
        }

        return res
    }
}
```

```swift
class Solution {
    let MOD = 1000000007

    func profitableSchemes(_ n: Int, _ minProfit: Int, _ group: [Int], _ profit: [Int]) -> Int {
        func dfs(_ i: Int, _ n: Int, _ p: Int) -> Int {
            if i == group.count {
                return p >= minProfit ? 1 : 0
            }

            var res = dfs(i + 1, n, p)
            if n - group[i] >= 0 {
                res = (res + dfs(i + 1, n - group[i], p + profit[i])) % MOD
            }

            return res
        }

        return dfs(0, n, 0)
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

### Intuition

The recursive solution has overlapping subproblems because the same state (crime index, remaining members, current profit) can be reached through different paths. By memoizing results, we avoid redundant computation. We also cap profit at `minProfit` since any profit beyond the threshold is equivalent for counting purposes.

### Algorithm

1. Create a 3D memoization table indexed by (crime index, remaining members, current profit).
2. Define `dfs(i, n, p)` with the same logic as the recursive approach.
3. Before computing, check if the state is already in the cache.
4. When including a crime, cap the new profit at `minProfit` to reduce state space.
5. Store and return the result modulo `10^9 + 7`.

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

```csharp
public class Solution {
    private const int MOD = 1000000007;
    private int[,,] dp;

    public int ProfitableSchemes(int n, int minProfit, int[] group, int[] profit) {
        dp = new int[group.Length, n + 1, minProfit + 1];
        for (int i = 0; i < group.Length; i++) {
            for (int j = 0; j <= n; j++) {
                for (int k = 0; k <= minProfit; k++) {
                    dp[i, j, k] = -1;
                }
            }
        }
        return Dfs(0, n, 0, group, profit, minProfit);
    }

    private int Dfs(int i, int n, int p, int[] group, int[] profit, int minProfit) {
        if (i == group.Length) {
            return p >= minProfit ? 1 : 0;
        }
        if (dp[i, n, p] != -1) {
            return dp[i, n, p];
        }

        int res = Dfs(i + 1, n, p, group, profit, minProfit);
        if (n >= group[i]) {
            int nxtP = Math.Min(p + profit[i], minProfit);
            res = (res + Dfs(i + 1, n - group[i], nxtP, group, profit, minProfit)) % MOD;
        }

        dp[i, n, p] = res;
        return res;
    }
}
```

```go
func profitableSchemes(n int, minProfit int, group []int, profit []int) int {
    const MOD = 1000000007
    N := len(group)
    dp := make([][][]int, N)
    for i := range dp {
        dp[i] = make([][]int, n+1)
        for j := range dp[i] {
            dp[i][j] = make([]int, minProfit+1)
            for k := range dp[i][j] {
                dp[i][j][k] = -1
            }
        }
    }

    var dfs func(i, n, p int) int
    dfs = func(i, n, p int) int {
        if i == N {
            if p >= minProfit {
                return 1
            }
            return 0
        }
        if dp[i][n][p] != -1 {
            return dp[i][n][p]
        }

        res := dfs(i+1, n, p)
        if n >= group[i] {
            nxtP := p + profit[i]
            if nxtP > minProfit {
                nxtP = minProfit
            }
            res = (res + dfs(i+1, n-group[i], nxtP)) % MOD
        }

        dp[i][n][p] = res
        return res
    }

    return dfs(0, n, 0)
}
```

```kotlin
class Solution {
    private val MOD = 1000000007
    private lateinit var dp: Array<Array<IntArray>>

    fun profitableSchemes(n: Int, minProfit: Int, group: IntArray, profit: IntArray): Int {
        dp = Array(group.size) { Array(n + 1) { IntArray(minProfit + 1) { -1 } } }
        return dfs(0, n, 0, group, profit, minProfit)
    }

    private fun dfs(i: Int, n: Int, p: Int, group: IntArray, profit: IntArray, minProfit: Int): Int {
        if (i == group.size) {
            return if (p >= minProfit) 1 else 0
        }
        if (dp[i][n][p] != -1) {
            return dp[i][n][p]
        }

        var res = dfs(i + 1, n, p, group, profit, minProfit)
        if (n >= group[i]) {
            val nxtP = minOf(p + profit[i], minProfit)
            res = (res + dfs(i + 1, n - group[i], nxtP, group, profit, minProfit)) % MOD
        }

        dp[i][n][p] = res
        return res
    }
}
```

```swift
class Solution {
    let MOD = 1000000007
    var dp: [[[Int]]] = []

    func profitableSchemes(_ n: Int, _ minProfit: Int, _ group: [Int], _ profit: [Int]) -> Int {
        dp = Array(repeating: Array(repeating: Array(repeating: -1, count: minProfit + 1), count: n + 1), count: group.count)
        return dfs(0, n, 0, group, profit, minProfit)
    }

    private func dfs(_ i: Int, _ n: Int, _ p: Int, _ group: [Int], _ profit: [Int], _ minProfit: Int) -> Int {
        if i == group.count {
            return p >= minProfit ? 1 : 0
        }
        if dp[i][n][p] != -1 {
            return dp[i][n][p]
        }

        var res = dfs(i + 1, n, p, group, profit, minProfit)
        if n >= group[i] {
            let nxtP = min(p + profit[i], minProfit)
            res = (res + dfs(i + 1, n - group[i], nxtP, group, profit, minProfit)) % MOD
        }

        dp[i][n][p] = res
        return res
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

### Intuition

We can convert the top-down solution to bottom-up by iterating through crimes in reverse order. We build up the answer by considering what happens if we include or exclude each crime, starting from the last crime and working backward to the first.

### Algorithm

1. Create a 3D DP table `dp[i][j][p]` representing the count of schemes considering crimes from index `i` onward, using at most `j` members, with current profit `p`.
2. Initialize: for all member counts `j`, set `dp[N][j][minProfit] = 1` (reached the goal).
3. Iterate `i` from `N-1` down to 0, `j` from 0 to `n`, and `p` from 0 to `minProfit`:
   - Start with the count from skipping this crime: `dp[i+1][j][p]`.
   - If we have enough members, add the count from including this crime with updated profit (capped at `minProfit`).
4. Return `dp[0][n][0]`.

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

```csharp
public class Solution {
    private const int MOD = 1000000007;

    public int ProfitableSchemes(int n, int minProfit, int[] group, int[] profit) {
        int N = group.Length;
        int[,,] dp = new int[N + 1, n + 2, minProfit + 1];

        for (int j = 0; j <= n; j++) {
            dp[N, j, minProfit] = 1;
        }

        for (int i = N - 1; i >= 0; i--) {
            for (int j = 0; j <= n; j++) {
                for (int p = 0; p <= minProfit; p++) {
                    int res = dp[i + 1, j, p];
                    if (j >= group[i]) {
                        int nxtP = Math.Min(profit[i] + p, minProfit);
                        res = (res + dp[i + 1, j - group[i], nxtP]) % MOD;
                    }
                    dp[i, j, p] = res;
                }
            }
        }

        return dp[0, n, 0];
    }
}
```

```go
func profitableSchemes(n int, minProfit int, group []int, profit []int) int {
    const MOD = 1000000007
    N := len(group)

    dp := make([][][]int, N+1)
    for i := range dp {
        dp[i] = make([][]int, n+2)
        for j := range dp[i] {
            dp[i][j] = make([]int, minProfit+1)
        }
    }

    for j := 0; j <= n; j++ {
        dp[N][j][minProfit] = 1
    }

    for i := N - 1; i >= 0; i-- {
        for j := 0; j <= n; j++ {
            for p := 0; p <= minProfit; p++ {
                res := dp[i+1][j][p]
                if j >= group[i] {
                    nxtP := profit[i] + p
                    if nxtP > minProfit {
                        nxtP = minProfit
                    }
                    res = (res + dp[i+1][j-group[i]][nxtP]) % MOD
                }
                dp[i][j][p] = res
            }
        }
    }

    return dp[0][n][0]
}
```

```kotlin
class Solution {
    fun profitableSchemes(n: Int, minProfit: Int, group: IntArray, profit: IntArray): Int {
        val MOD = 1000000007
        val N = group.size

        val dp = Array(N + 1) { Array(n + 2) { IntArray(minProfit + 1) } }

        for (j in 0..n) {
            dp[N][j][minProfit] = 1
        }

        for (i in N - 1 downTo 0) {
            for (j in 0..n) {
                for (p in 0..minProfit) {
                    var res = dp[i + 1][j][p]
                    if (j >= group[i]) {
                        val nxtP = minOf(profit[i] + p, minProfit)
                        res = (res + dp[i + 1][j - group[i]][nxtP]) % MOD
                    }
                    dp[i][j][p] = res
                }
            }
        }

        return dp[0][n][0]
    }
}
```

```swift
class Solution {
    func profitableSchemes(_ n: Int, _ minProfit: Int, _ group: [Int], _ profit: [Int]) -> Int {
        let MOD = 1000000007
        let N = group.count

        var dp = Array(repeating: Array(repeating: Array(repeating: 0, count: minProfit + 1), count: n + 2), count: N + 1)

        for j in 0...n {
            dp[N][j][minProfit] = 1
        }

        for i in stride(from: N - 1, through: 0, by: -1) {
            for j in 0...n {
                for p in 0...minProfit {
                    var res = dp[i + 1][j][p]
                    if j >= group[i] {
                        let nxtP = min(profit[i] + p, minProfit)
                        res = (res + dp[i + 1][j - group[i]][nxtP]) % MOD
                    }
                    dp[i][j][p] = res
                }
            }
        }

        return dp[0][n][0]
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

### Intuition

Since each crime's DP state only depends on the next crime's state, we can reduce the 3D table to 2D. We iterate through crimes and update the table in-place. By processing member counts in reverse order, we ensure we use the previous iteration's values before overwriting them.

### Algorithm

1. Create a 2D DP table `dp[j][p]` for member count `j` and profit `p`.
2. Initialize: for all `j`, set `dp[j][minProfit] = 1`.
3. Iterate `i` from `N-1` down to 0:
   - Iterate `j` from `n` down to 0 (reverse to avoid using updated values).
   - For each profit `p` from 0 to `minProfit`:
     - Add the contribution from including the crime if we have enough members.
4. Return `dp[n][0]`.

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

```csharp
public class Solution {
    private const int MOD = 1000000007;

    public int ProfitableSchemes(int n, int minProfit, int[] group, int[] profit) {
        int N = group.Length;
        int[,] dp = new int[n + 2, minProfit + 1];

        for (int j = 0; j <= n; j++) {
            dp[j, minProfit] = 1;
        }

        for (int i = N - 1; i >= 0; i--) {
            for (int j = n; j >= 0; j--) {
                for (int p = 0; p <= minProfit; p++) {
                    int res = dp[j, p];
                    if (j >= group[i]) {
                        int nxtP = Math.Min(profit[i] + p, minProfit);
                        res = (res + dp[j - group[i], nxtP]) % MOD;
                    }
                    dp[j, p] = res;
                }
            }
        }

        return dp[n, 0];
    }
}
```

```go
func profitableSchemes(n int, minProfit int, group []int, profit []int) int {
    const MOD = 1000000007
    N := len(group)

    dp := make([][]int, n+2)
    for j := range dp {
        dp[j] = make([]int, minProfit+1)
    }

    for j := 0; j <= n; j++ {
        dp[j][minProfit] = 1
    }

    for i := N - 1; i >= 0; i-- {
        for j := n; j >= 0; j-- {
            for p := 0; p <= minProfit; p++ {
                res := dp[j][p]
                if j >= group[i] {
                    nxtP := profit[i] + p
                    if nxtP > minProfit {
                        nxtP = minProfit
                    }
                    res = (res + dp[j-group[i]][nxtP]) % MOD
                }
                dp[j][p] = res
            }
        }
    }

    return dp[n][0]
}
```

```kotlin
class Solution {
    fun profitableSchemes(n: Int, minProfit: Int, group: IntArray, profit: IntArray): Int {
        val MOD = 1000000007
        val N = group.size

        val dp = Array(n + 2) { IntArray(minProfit + 1) }

        for (j in 0..n) {
            dp[j][minProfit] = 1
        }

        for (i in N - 1 downTo 0) {
            for (j in n downTo 0) {
                for (p in 0..minProfit) {
                    var res = dp[j][p]
                    if (j >= group[i]) {
                        val nxtP = minOf(profit[i] + p, minProfit)
                        res = (res + dp[j - group[i]][nxtP]) % MOD
                    }
                    dp[j][p] = res
                }
            }
        }

        return dp[n][0]
    }
}
```

```swift
class Solution {
    func profitableSchemes(_ n: Int, _ minProfit: Int, _ group: [Int], _ profit: [Int]) -> Int {
        let MOD = 1000000007
        let N = group.count

        var dp = Array(repeating: Array(repeating: 0, count: minProfit + 1), count: n + 2)

        for j in 0...n {
            dp[j][minProfit] = 1
        }

        for i in stride(from: N - 1, through: 0, by: -1) {
            for j in stride(from: n, through: 0, by: -1) {
                for p in 0...minProfit {
                    var res = dp[j][p]
                    if j >= group[i] {
                        let nxtP = min(profit[i] + p, minProfit)
                        res = (res + dp[j - group[i]][nxtP]) % MOD
                    }
                    dp[j][p] = res
                }
            }
        }

        return dp[n][0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N * m * n)$
- Space complexity: $O(m * n)$

> Where $N$ is the size of the $group$ array, $m$ is the given minimum profit, and $n$ is the number of group members.

---

## Common Pitfalls

### Not Capping Profit at minProfit

When accumulating profit in the DP state, tracking values beyond `minProfit` wastes memory and causes state explosion. Any profit exceeding the threshold is functionally equivalent for counting valid schemes. Always cap the profit dimension at `minProfit` to reduce the state space from potentially unbounded to O(minProfit).

### Forgetting the Modulo Operation

The problem requires results modulo 10^9 + 7 due to potentially huge answer values. Forgetting to apply modulo when summing the include and skip options leads to integer overflow. Apply modulo after every addition operation, not just at the end.

### Incorrect Base Case Logic

The base case must return 1 when all crimes are considered AND the accumulated profit meets the threshold. A common mistake is returning 1 unconditionally or checking the wrong condition. The check `p >= minProfit` must happen only when `i == len(group)`.

### Off-by-One in Member Count Check

When deciding whether to include a crime, the condition should be `n >= group[i]` or equivalently `n - group[i] >= 0`. Using strict inequality `n > group[i]` incorrectly excludes cases where exactly enough members are available.

### Iterating in Wrong Direction for Space Optimization

In the space-optimized bottom-up solution, iterating `j` (member count) in the wrong direction causes using updated values from the current iteration instead of the previous one. Process members from high to low to ensure correct dependency ordering.
