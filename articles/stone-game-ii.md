## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Dynamic Programming (Memoization)** - Caching optimal results for each game state to avoid redundant computation
- **Game Theory / Minimax** - Understanding two-player optimal play where one player maximizes and the other minimizes
- **Suffix Sum** - Precomputing cumulative sums from right to left to efficiently calculate remaining stones
- **Multi-dimensional State Tracking** - Managing DP states with multiple parameters (position, M value, whose turn)

---

## 1. Dynamic Programming (Top-Down)

### Intuition

This is a two-player game where Alice and Bob take turns picking piles from the front. The key insight is that both players play optimally, meaning Alice tries to maximize her score while Bob tries to minimize Alice's score. We can model this using recursion with memoization, tracking whose turn it is, the current index, and the value of `M`. When it's Alice's turn, she picks the option that maximizes her total; when it's Bob's turn, he picks the option that minimizes Alice's total.

### Algorithm

1. Use a recursive function `dfs(alice, i, M)` where `alice` indicates whose turn it is, `i` is the current pile index, and `M` is the maximum number of piles that can be taken.
2. Base case: if `i == n`, return `0` (no more piles).
3. If it's Alice's turn, try taking `X` piles (1 to `2M`) and maximize the result by adding the stones taken plus the recursive call for Bob's turn.
4. If it's Bob's turn, try taking `X` piles and minimize the result since Bob wants to minimize Alice's score.
5. Update `M` to `max(M, X)` after each move.
6. Memoize results using a 3D cache with dimensions `[2][n][n+1]`.
7. Return `dfs(True, 0, 1)` to get Alice's maximum score.

::tabs-start

```python
class Solution:
    def stoneGameII(self, piles: List[int]) -> int:
        dp = {}

        def dfs(alice, i, M):
            if i == len(piles):
                return 0
            if (alice, i, M) in dp:
                return dp[(alice, i, M)]

            res = 0 if alice else float("inf")
            total = 0
            for X in range(1, 2 * M + 1):
                if i + X > len(piles):
                    break
                total += piles[i + X - 1]
                if alice:
                    res = max(res, total + dfs(not alice, i + X, max(M, X)))
                else:
                    res = min(res, dfs(not alice, i + X, max(M, X)))

            dp[(alice, i, M)] = res
            return res

        return dfs(True, 0, 1)
```

```java
public class Solution {
    private int[][][] dp;

    public int stoneGameII(int[] piles) {
        int n = piles.length;
        dp = new int[2][n][n + 1];
        for (int[][] layer : dp) {
            for (int[] row : layer) {
                Arrays.fill(row, -1);
            }
        }

        return dfs(1, 0, 1, piles);
    }

    private int dfs(int alice, int i, int M, int[] piles) {
        if (i == piles.length) return 0;
        if (dp[alice][i][M] != -1) return dp[alice][i][M];

        int res = alice == 1 ? 0 : Integer.MAX_VALUE;
        int total = 0;

        for (int X = 1; X <= 2 * M; X++) {
            if (i + X > piles.length) break;
            total += piles[i + X - 1];
            if (alice == 1) {
                res = Math.max(res, total + dfs(0, i + X, Math.max(M, X), piles));
            } else {
                res = Math.min(res, dfs(1, i + X, Math.max(M, X), piles));
            }
        }

        dp[alice][i][M] = res;
        return res;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<vector<int>>> dp;

public:
    int stoneGameII(vector<int>& piles) {
        int n = piles.size();
        dp.resize(2, vector<vector<int>>(n, vector<int>(n + 1, -1)));
        return dfs(1, 0, 1, piles);
    }

private:
    int dfs(int alice, int i, int M, vector<int>& piles) {
        if (i == piles.size()) return 0;
        if (dp[alice][i][M] != -1) return dp[alice][i][M];

        int res = alice == 1 ? 0 : INT_MAX;
        int total = 0;

        for (int X = 1; X <= 2 * M; X++) {
            if (i + X > piles.size()) break;
            total += piles[i + X - 1];
            if (alice == 1) {
                res = max(res, total + dfs(0, i + X, max(M, X), piles));
            } else {
                res = min(res, dfs(1, i + X, max(M, X), piles));
            }
        }

        dp[alice][i][M] = res;
        return dp[alice][i][M];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} piles
     * @return {number}
     */
    stoneGameII(piles) {
        const n = piles.length;
        this.dp = Array.from({ length: 2 }, () =>
            Array.from({ length: n }, () => Array(n + 1).fill(-1)),
        );

        const dfs = (alice, i, M) => {
            if (i === n) return 0;
            if (this.dp[alice][i][M] !== -1) return this.dp[alice][i][M];

            let res = alice === 1 ? 0 : Infinity;
            let total = 0;

            for (let X = 1; X <= 2 * M; X++) {
                if (i + X > n) break;
                total += piles[i + X - 1];
                if (alice === 1) {
                    res = Math.max(res, total + dfs(0, i + X, Math.max(M, X)));
                } else {
                    res = Math.min(res, dfs(1, i + X, Math.max(M, X)));
                }
            }

            this.dp[alice][i][M] = res;
            return res;
        };

        return dfs(1, 0, 1);
    }
}
```

```csharp
public class Solution {
    private int[,,] dp;

    public int StoneGameII(int[] piles) {
        int n = piles.Length;
        dp = new int[2, n, n + 1];
        for (int a = 0; a < 2; a++) {
            for (int i = 0; i < n; i++) {
                for (int m = 0; m <= n; m++) {
                    dp[a, i, m] = -1;
                }
            }
        }

        return Dfs(1, 0, 1, piles);
    }

    private int Dfs(int alice, int i, int M, int[] piles) {
        if (i == piles.Length) return 0;
        if (dp[alice, i, M] != -1) return dp[alice, i, M];

        int res = alice == 1 ? 0 : int.MaxValue;
        int total = 0;

        for (int X = 1; X <= 2 * M; X++) {
            if (i + X > piles.Length) break;
            total += piles[i + X - 1];
            if (alice == 1) {
                res = Math.Max(res, total + Dfs(0, i + X, Math.Max(M, X), piles));
            } else {
                res = Math.Min(res, Dfs(1, i + X, Math.Max(M, X), piles));
            }
        }

        dp[alice, i, M] = res;
        return res;
    }
}
```

```go
func stoneGameII(piles []int) int {
    n := len(piles)
    dp := make([][][]int, 2)
    for a := 0; a < 2; a++ {
        dp[a] = make([][]int, n)
        for i := 0; i < n; i++ {
            dp[a][i] = make([]int, n+1)
            for m := 0; m <= n; m++ {
                dp[a][i][m] = -1
            }
        }
    }

    var dfs func(alice, i, M int) int
    dfs = func(alice, i, M int) int {
        if i == n {
            return 0
        }
        if dp[alice][i][M] != -1 {
            return dp[alice][i][M]
        }

        res := 0
        if alice == 0 {
            res = math.MaxInt32
        }
        total := 0

        for X := 1; X <= 2*M; X++ {
            if i+X > n {
                break
            }
            total += piles[i+X-1]
            if alice == 1 {
                res = max(res, total+dfs(0, i+X, max(M, X)))
            } else {
                res = min(res, dfs(1, i+X, max(M, X)))
            }
        }

        dp[alice][i][M] = res
        return res
    }

    return dfs(1, 0, 1)
}
```

```kotlin
class Solution {
    private lateinit var dp: Array<Array<IntArray>>

    fun stoneGameII(piles: IntArray): Int {
        val n = piles.size
        dp = Array(2) { Array(n) { IntArray(n + 1) { -1 } } }
        return dfs(1, 0, 1, piles)
    }

    private fun dfs(alice: Int, i: Int, M: Int, piles: IntArray): Int {
        if (i == piles.size) return 0
        if (dp[alice][i][M] != -1) return dp[alice][i][M]

        var res = if (alice == 1) 0 else Int.MAX_VALUE
        var total = 0

        for (X in 1..2 * M) {
            if (i + X > piles.size) break
            total += piles[i + X - 1]
            res = if (alice == 1) {
                maxOf(res, total + dfs(0, i + X, maxOf(M, X), piles))
            } else {
                minOf(res, dfs(1, i + X, maxOf(M, X), piles))
            }
        }

        dp[alice][i][M] = res
        return res
    }
}
```

```swift
class Solution {
    private var dp: [[[Int]]] = []

    func stoneGameII(_ piles: [Int]) -> Int {
        let n = piles.count
        dp = Array(repeating: Array(repeating: Array(repeating: -1, count: n + 1), count: n), count: 2)
        return dfs(1, 0, 1, piles)
    }

    private func dfs(_ alice: Int, _ i: Int, _ M: Int, _ piles: [Int]) -> Int {
        if i == piles.count { return 0 }
        if dp[alice][i][M] != -1 { return dp[alice][i][M] }

        var res = alice == 1 ? 0 : Int.max
        var total = 0

        for X in 1...(2 * M) {
            if i + X > piles.count { break }
            total += piles[i + X - 1]
            if alice == 1 {
                res = max(res, total + dfs(0, i + X, max(M, X), piles))
            } else {
                res = min(res, dfs(1, i + X, max(M, X), piles))
            }
        }

        dp[alice][i][M] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$

---

## 2. Dynamic Programming (Top-Down) + Suffix Sum

### Intuition

Instead of tracking both players separately, we can simplify by focusing on a single player's perspective. At each position, the current player wants to maximize their own score. The trick is that whatever stones remain after the current player's turn will be split optimally by the opponent. Using suffix sums, if the current player takes some stones, their score equals those stones plus whatever remains minus the opponent's optimal result from the remaining position.

### Algorithm

1. Precompute suffix sums where `suffix_sum[i]` is the total stones from index `i` to the end.
2. Define `dfs(i, M)` to return the maximum stones the current player can get starting at index `i` with parameter `M`.
3. Base case: if `i == n`, return `0`.
4. For each choice `X` from `1` to `2M`, the current player can take `suffix_sum[i] - dfs(i + X, max(M, X))`. This works because the current player gets all remaining stones minus what the opponent will optimally take.
5. Memoize with a 2D cache of size `[n][n+1]`.
6. Return `dfs(0, 1)` to get Alice's maximum score.

::tabs-start

```python
class Solution:
    def stoneGameII(self, piles: List[int]) -> int:
        n = len(piles)
        dp = [[None] * (n + 1) for _ in range(n)]
        suffix_sum = [0] * n
        suffix_sum[-1] = piles[-1]
        for i in range(n - 2, -1, -1):
            suffix_sum[i] = piles[i] + suffix_sum[i + 1]

        def dfs(i, M):
            if i == n:
                return 0
            if dp[i][M] is not None:
                return dp[i][M]

            res = 0
            for X in range(1, 2 * M + 1):
                if i + X > n:
                    break
                res = max(res, suffix_sum[i] - dfs(i + X, max(M, X)))
            dp[i][M] = res
            return res

        return dfs(0, 1)
```

```java
public class Solution {
    private int[][] dp;
    private int[] suffixSum;

    public int stoneGameII(int[] piles) {
        int n = piles.length;
        dp = new int[n][n + 1];
        for (int i = 0; i < n; i++) {
            Arrays.fill(dp[i], -1);
        }

        suffixSum = new int[n];
        suffixSum[n - 1] = piles[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            suffixSum[i] = piles[i] + suffixSum[i + 1];
        }

        return dfs(0, 1);
    }

    private int dfs(int i, int M) {
        if (i == suffixSum.length) return 0;
        if (dp[i][M] != -1) return dp[i][M];

        int res = 0;
        for (int X = 1; X <= 2 * M; X++) {
            if (i + X > suffixSum.length) break;
            res = Math.max(res, suffixSum[i] - dfs(i + X, Math.max(M, X)));
        }

        return dp[i][M] = res;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;
    vector<int> suffixSum;

public:
    int stoneGameII(vector<int>& piles) {
        int n = piles.size();
        dp.resize(n, vector<int>(n + 1, -1));

        suffixSum.resize(n);
        suffixSum[n - 1] = piles[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            suffixSum[i] = piles[i] + suffixSum[i + 1];
        }

        return dfs(0, 1, piles);
    }

private:
    int dfs(int i, int M, vector<int>& piles) {
        if (i == suffixSum.size()) return 0;
        if (dp[i][M] != -1) return dp[i][M];

        int res = 0;
        for (int X = 1; X <= 2 * M; X++) {
            if (i + X > suffixSum.size()) break;
            res = max(res, suffixSum[i] - dfs(i + X, max(M, X), piles));
        }

        return dp[i][M] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} piles
     * @return {number}
     */
    stoneGameII(piles) {
        const n = piles.length;
        const dp = Array.from({ length: n }, () => Array(n + 1).fill(-1));

        const suffixSum = Array(n).fill(0);
        suffixSum[n - 1] = piles[n - 1];
        for (let i = n - 2; i >= 0; i--) {
            suffixSum[i] = piles[i] + suffixSum[i + 1];
        }

        const dfs = (i, M) => {
            if (i === n) return 0;
            if (dp[i][M] !== -1) return dp[i][M];

            let res = 0;
            for (let X = 1; X <= 2 * M; X++) {
                if (i + X > n) break;
                res = Math.max(res, suffixSum[i] - dfs(i + X, Math.max(M, X)));
            }

            return (dp[i][M] = res);
        };

        return dfs(0, 1);
    }
}
```

```csharp
public class Solution {
    private int[,] dp;
    private int[] suffixSum;

    public int StoneGameII(int[] piles) {
        int n = piles.Length;
        dp = new int[n, n + 1];

        for (int i = 0; i < n; i++) {
            for (int m = 0; m <= n; m++) {
                dp[i, m] = -1;
            }
        }

        suffixSum = new int[n];
        suffixSum[n - 1] = piles[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            suffixSum[i] = piles[i] + suffixSum[i + 1];
        }

        return Dfs(0, 1);
    }

    private int Dfs(int i, int M) {
        if (i == suffixSum.Length) return 0;
        if (dp[i, M] != -1) return dp[i, M];

        int res = 0;
        for (int X = 1; X <= 2 * M; X++) {
            if (i + X > suffixSum.Length) break;
            res = Math.Max(res, suffixSum[i] - Dfs(i + X, Math.Max(M, X)));
        }

        dp[i, M] = res;
        return res;
    }
}
```

```go
func stoneGameII(piles []int) int {
    n := len(piles)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, n+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    suffixSum := make([]int, n)
    suffixSum[n-1] = piles[n-1]
    for i := n - 2; i >= 0; i-- {
        suffixSum[i] = piles[i] + suffixSum[i+1]
    }

    var dfs func(i, M int) int
    dfs = func(i, M int) int {
        if i == n {
            return 0
        }
        if dp[i][M] != -1 {
            return dp[i][M]
        }

        res := 0
        for X := 1; X <= 2*M; X++ {
            if i+X > n {
                break
            }
            res = max(res, suffixSum[i]-dfs(i+X, max(M, X)))
        }

        dp[i][M] = res
        return res
    }

    return dfs(0, 1)
}
```

```kotlin
class Solution {
    private lateinit var dp: Array<IntArray>
    private lateinit var suffixSum: IntArray

    fun stoneGameII(piles: IntArray): Int {
        val n = piles.size
        dp = Array(n) { IntArray(n + 1) { -1 } }

        suffixSum = IntArray(n)
        suffixSum[n - 1] = piles[n - 1]
        for (i in n - 2 downTo 0) {
            suffixSum[i] = piles[i] + suffixSum[i + 1]
        }

        return dfs(0, 1)
    }

    private fun dfs(i: Int, M: Int): Int {
        if (i == suffixSum.size) return 0
        if (dp[i][M] != -1) return dp[i][M]

        var res = 0
        for (X in 1..2 * M) {
            if (i + X > suffixSum.size) break
            res = maxOf(res, suffixSum[i] - dfs(i + X, maxOf(M, X)))
        }

        dp[i][M] = res
        return res
    }
}
```

```swift
class Solution {
    private var dp: [[Int]] = []
    private var suffixSum: [Int] = []

    func stoneGameII(_ piles: [Int]) -> Int {
        let n = piles.count
        dp = Array(repeating: Array(repeating: -1, count: n + 1), count: n)

        suffixSum = Array(repeating: 0, count: n)
        suffixSum[n - 1] = piles[n - 1]
        for i in stride(from: n - 2, through: 0, by: -1) {
            suffixSum[i] = piles[i] + suffixSum[i + 1]
        }

        return dfs(0, 1)
    }

    private func dfs(_ i: Int, _ M: Int) -> Int {
        if i == suffixSum.count { return 0 }
        if dp[i][M] != -1 { return dp[i][M] }

        var res = 0
        for X in 1...(2 * M) {
            if i + X > suffixSum.count { break }
            res = max(res, suffixSum[i] - dfs(i + X, max(M, X)))
        }

        dp[i][M] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We can convert the top-down approach to bottom-up by filling the DP table from the end of the piles array backward. At each position, we compute the optimal result for both Alice and Bob, considering all possible moves. Working backward ensures that when we compute a state, all states it depends on have already been computed.

### Algorithm

1. Create a 3D DP array `dp[2][n+1][n+1]` where the first dimension represents the player (1 for Alice, 0 for Bob).
2. Iterate from `i = n-1` down to `0`, and for each `M` from `1` to `n`.
3. For Alice's turn, initialize `dp[1][i][M] = 0` and try taking `X` piles (1 to `2M`), computing `total + dp[0][i+X][max(M, X)]` and taking the maximum.
4. For Bob's turn, initialize `dp[0][i][M] = infinity` and try taking `X` piles, computing `dp[1][i+X][max(M, X)]` and taking the minimum.
5. Return `dp[1][0][1]` for Alice's maximum score starting at position `0` with `M=1`.

::tabs-start

```python
class Solution:
    def stoneGameII(self, piles: List[int]) -> int:
        n = len(piles)
        dp = [[[0] * (n + 1) for _ in range(n + 1)] for _ in range(2)]

        for i in range(n - 1, -1, -1):
            for M in range(1, n + 1):
                total = 0
                dp[1][i][M] = 0
                dp[0][i][M] = float("inf")

                for X in range(1, 2 * M + 1):
                    if i + X > n:
                        break
                    total += piles[i + X - 1]

                    dp[1][i][M] = max(dp[1][i][M], total + dp[0][i + X][max(M, X)])
                    dp[0][i][M] = min(dp[0][i][M], dp[1][i + X][max(M, X)])

        return dp[1][0][1]
```

```java
public class Solution {
    public int stoneGameII(int[] piles) {
        int n = piles.length;
        int[][][] dp = new int[2][n + 1][n + 1];

        for (int i = n - 1; i >= 0; i--) {
            for (int M = 1; M <= n; M++) {
                int total = 0;
                dp[1][i][M] = 0;
                dp[0][i][M] = Integer.MAX_VALUE;

                for (int X = 1; X <= 2 * M; X++) {
                    if (i + X > n) break;
                    total += piles[i + X - 1];
                    dp[1][i][M] = Math.max(dp[1][i][M], total + dp[0][i + X][Math.max(M, X)]);
                    dp[0][i][M] = Math.min(dp[0][i][M], dp[1][i + X][Math.max(M, X)]);
                }
            }
        }

        return dp[1][0][1];
    }
}
```

```cpp
class Solution {
public:
    int stoneGameII(vector<int>& piles) {
        int n = piles.size();
        vector<vector<vector<int>>> dp(2, vector<vector<int>>(n + 1, vector<int>(n + 1, 0)));

        for (int i = n - 1; i >= 0; i--) {
            for (int M = 1; M <= n; M++) {
                int total = 0;
                dp[1][i][M] = 0;
                dp[0][i][M] = INT_MAX;

                for (int X = 1; X <= 2 * M; X++) {
                    if (i + X > n) break;
                    total += piles[i + X - 1];

                    dp[1][i][M] = max(dp[1][i][M], total + dp[0][i + X][max(M, X)]);
                    dp[0][i][M] = min(dp[0][i][M], dp[1][i + X][max(M, X)]);
                }
            }
        }

        return dp[1][0][1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} piles
     * @return {number}
     */
    stoneGameII(piles) {
        const n = piles.length;
        const dp = Array.from({ length: 2 }, () =>
            Array.from({ length: n + 1 }, () => Array(n + 1).fill(0)),
        );

        for (let i = n - 1; i >= 0; i--) {
            for (let M = 1; M <= n; M++) {
                let total = 0;
                dp[1][i][M] = 0;
                dp[0][i][M] = Infinity;

                for (let X = 1; X <= 2 * M; X++) {
                    if (i + X > n) break;
                    total += piles[i + X - 1];

                    dp[1][i][M] = Math.max(
                        dp[1][i][M],
                        total + dp[0][i + X][Math.max(M, X)],
                    );
                    dp[0][i][M] = Math.min(
                        dp[0][i][M],
                        dp[1][i + X][Math.max(M, X)],
                    );
                }
            }
        }

        return dp[1][0][1];
    }
}
```

```csharp
public class Solution {
    public int StoneGameII(int[] piles) {
        int n = piles.Length;
        int[,,] dp = new int[2, n + 1, n + 1];

        for (int i = n - 1; i >= 0; i--) {
            for (int M = 1; M <= n; M++) {
                int total = 0;
                dp[1, i, M] = 0;
                dp[0, i, M] = int.MaxValue;

                for (int X = 1; X <= 2 * M; X++) {
                    if (i + X > n) break;
                    total += piles[i + X - 1];
                    dp[1, i, M] = Math.Max(dp[1, i, M], total + dp[0, i + X, Math.Max(M, X)]);
                    dp[0, i, M] = Math.Min(dp[0, i, M], dp[1, i + X, Math.Max(M, X)]);
                }
            }
        }

        return dp[1, 0, 1];
    }
}
```

```go
func stoneGameII(piles []int) int {
    n := len(piles)
    dp := make([][][]int, 2)
    for a := 0; a < 2; a++ {
        dp[a] = make([][]int, n+1)
        for i := 0; i <= n; i++ {
            dp[a][i] = make([]int, n+1)
        }
    }

    for i := n - 1; i >= 0; i-- {
        for M := 1; M <= n; M++ {
            total := 0
            dp[1][i][M] = 0
            dp[0][i][M] = math.MaxInt32

            for X := 1; X <= 2*M; X++ {
                if i+X > n {
                    break
                }
                total += piles[i+X-1]

                dp[1][i][M] = max(dp[1][i][M], total+dp[0][i+X][max(M, X)])
                dp[0][i][M] = min(dp[0][i][M], dp[1][i+X][max(M, X)])
            }
        }
    }

    return dp[1][0][1]
}
```

```kotlin
class Solution {
    fun stoneGameII(piles: IntArray): Int {
        val n = piles.size
        val dp = Array(2) { Array(n + 1) { IntArray(n + 1) } }

        for (i in n - 1 downTo 0) {
            for (M in 1..n) {
                var total = 0
                dp[1][i][M] = 0
                dp[0][i][M] = Int.MAX_VALUE

                for (X in 1..2 * M) {
                    if (i + X > n) break
                    total += piles[i + X - 1]

                    dp[1][i][M] = maxOf(dp[1][i][M], total + dp[0][i + X][maxOf(M, X)])
                    dp[0][i][M] = minOf(dp[0][i][M], dp[1][i + X][maxOf(M, X)])
                }
            }
        }

        return dp[1][0][1]
    }
}
```

```swift
class Solution {
    func stoneGameII(_ piles: [Int]) -> Int {
        let n = piles.count
        var dp = Array(repeating: Array(repeating: Array(repeating: 0, count: n + 1), count: n + 1), count: 2)

        for i in stride(from: n - 1, through: 0, by: -1) {
            for M in 1...n {
                var total = 0
                dp[1][i][M] = 0
                dp[0][i][M] = Int.max

                for X in 1...(2 * M) {
                    if i + X > n { break }
                    total += piles[i + X - 1]

                    dp[1][i][M] = max(dp[1][i][M], total + dp[0][i + X][max(M, X)])
                    dp[0][i][M] = min(dp[0][i][M], dp[1][i + X][max(M, X)])
                }
            }
        }

        return dp[1][0][1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Bottom-Up) + Suffix Sum

### Intuition

Combining the bottom-up approach with the suffix sum optimization gives us a cleaner solution. Since we treat both players symmetrically (each maximizes their own score), we only need a 2D DP table. The suffix sum lets us compute how many stones the current player gets by subtracting the opponent's optimal result from the remaining total.

### Algorithm

1. Precompute suffix sums where `suffix_sum[i]` is the total stones from index `i` to the end.
2. Create a 2D DP array `dp[n+1][n+1]` initialized to `0`.
3. Iterate from `i = n-1` down to `0`, and for each `M` from `1` to `n`.
4. For each `X` from `1` to `2M` (while `i + X <= n`), compute `dp[i][M] = max(dp[i][M], suffix_sum[i] - dp[i+X][max(M, X)])`.
5. Return `dp[0][1]` as Alice's maximum score.

::tabs-start

```python
class Solution:
    def stoneGameII(self, piles: List[int]) -> int:
        n = len(piles)
        suffix_sum = [0] * n
        suffix_sum[-1] = piles[-1]
        for i in range(n - 2, -1, -1):
            suffix_sum[i] = piles[i] + suffix_sum[i + 1]

        dp = [[0] * (n + 1) for _ in range(n + 1)]

        for i in range(n - 1, -1, -1):
            for M in range(1, n + 1):
                for X in range(1, 2 * M + 1):
                    if i + X > n:
                        break
                    dp[i][M] = max(dp[i][M], suffix_sum[i] - dp[i + X][max(M, X)])

        return dp[0][1]
```

```java
public class Solution {
    public int stoneGameII(int[] piles) {
        int n = piles.length;

        int[] suffixSum = new int[n];
        suffixSum[n - 1] = piles[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            suffixSum[i] = piles[i] + suffixSum[i + 1];
        }

        int[][] dp = new int[n + 1][n + 1];

        for (int i = n - 1; i >= 0; i--) {
            for (int M = 1; M <= n; M++) {
                for (int X = 1; X <= 2 * M; X++) {
                    if (i + X > n) break;
                    dp[i][M] = Math.max(dp[i][M], suffixSum[i] - dp[i + X][Math.max(M, X)]);
                }
            }
        }

        return dp[0][1];
    }
}
```

```cpp
class Solution {
public:
    int stoneGameII(vector<int>& piles) {
        int n = piles.size();

        vector<int> suffixSum(n, 0);
        suffixSum[n - 1] = piles[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            suffixSum[i] = piles[i] + suffixSum[i + 1];
        }

        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));

        for (int i = n - 1; i >= 0; i--) {
            for (int M = 1; M <= n; M++) {
                for (int X = 1; X <= 2 * M; X++) {
                    if (i + X > n) break;
                    dp[i][M] = max(dp[i][M], suffixSum[i] - dp[i + X][max(M, X)]);
                }
            }
        }

        return dp[0][1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} piles
     * @return {number}
     */
    stoneGameII(piles) {
        const n = piles.length;

        const suffixSum = Array(n).fill(0);
        suffixSum[n - 1] = piles[n - 1];
        for (let i = n - 2; i >= 0; i--) {
            suffixSum[i] = piles[i] + suffixSum[i + 1];
        }

        const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

        for (let i = n - 1; i >= 0; i--) {
            for (let M = 1; M <= n; M++) {
                for (let X = 1; X <= 2 * M; X++) {
                    if (i + X > n) break;
                    dp[i][M] = Math.max(
                        dp[i][M],
                        suffixSum[i] - dp[i + X][Math.max(M, X)],
                    );
                }
            }
        }

        return dp[0][1];
    }
}
```

```csharp
public class Solution {
    public int StoneGameII(int[] piles) {
        int n = piles.Length;

        int[] suffixSum = new int[n];
        suffixSum[n - 1] = piles[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            suffixSum[i] = piles[i] + suffixSum[i + 1];
        }

        int[,] dp = new int[n + 1, n + 1];

        for (int i = n - 1; i >= 0; i--) {
            for (int M = 1; M <= n; M++) {
                for (int X = 1; X <= 2 * M; X++) {
                    if (i + X > n) break;
                    dp[i, M] = Math.Max(dp[i, M], suffixSum[i] - dp[i + X, Math.Max(M, X)]);
                }
            }
        }

        return dp[0, 1];
    }
}
```

```go
func stoneGameII(piles []int) int {
    n := len(piles)

    suffixSum := make([]int, n)
    suffixSum[n-1] = piles[n-1]
    for i := n - 2; i >= 0; i-- {
        suffixSum[i] = piles[i] + suffixSum[i+1]
    }

    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }

    for i := n - 1; i >= 0; i-- {
        for M := 1; M <= n; M++ {
            for X := 1; X <= 2*M; X++ {
                if i+X > n {
                    break
                }
                dp[i][M] = max(dp[i][M], suffixSum[i]-dp[i+X][max(M, X)])
            }
        }
    }

    return dp[0][1]
}
```

```kotlin
class Solution {
    fun stoneGameII(piles: IntArray): Int {
        val n = piles.size

        val suffixSum = IntArray(n)
        suffixSum[n - 1] = piles[n - 1]
        for (i in n - 2 downTo 0) {
            suffixSum[i] = piles[i] + suffixSum[i + 1]
        }

        val dp = Array(n + 1) { IntArray(n + 1) }

        for (i in n - 1 downTo 0) {
            for (M in 1..n) {
                for (X in 1..2 * M) {
                    if (i + X > n) break
                    dp[i][M] = maxOf(dp[i][M], suffixSum[i] - dp[i + X][maxOf(M, X)])
                }
            }
        }

        return dp[0][1]
    }
}
```

```swift
class Solution {
    func stoneGameII(_ piles: [Int]) -> Int {
        let n = piles.count

        var suffixSum = [Int](repeating: 0, count: n)
        suffixSum[n - 1] = piles[n - 1]
        for i in stride(from: n - 2, through: 0, by: -1) {
            suffixSum[i] = piles[i] + suffixSum[i + 1]
        }

        var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: n + 1)

        for i in stride(from: n - 1, through: 0, by: -1) {
            for M in 1...n {
                for X in 1...(2 * M) {
                    if i + X > n { break }
                    dp[i][M] = max(dp[i][M], suffixSum[i] - dp[i + X][max(M, X)])
                }
            }
        }

        return dp[0][1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$

---

## Common Pitfalls

### Misunderstanding the M Parameter Update

A frequent error is updating `M` incorrectly after a move. The rule is `M = max(M, X)` where `X` is the number of piles taken, not `M = X` or `M = M + X`. Failing to take the maximum means `M` might decrease, which violates the game rules and leads to wrong answers.

### Confusing Whose Score to Track

Since both players play optimally but only Alice's score matters for the answer, it is easy to mix up the logic. When using the minimax approach, Alice maximizes her score while Bob minimizes it. When using the suffix sum trick, both players maximize their own score, and the recursion naturally handles the alternation.

### Off-by-One Errors in Loop Bounds

The player can take `X` piles where `1 <= X <= 2*M`. A common mistake is iterating `X` from `0` to `2*M` or from `1` to `2*M - 1`. Ensure your loop correctly covers exactly the valid range of moves, and check that `i + X` does not exceed the array length before accessing elements.
