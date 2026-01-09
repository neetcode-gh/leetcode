## 1. Dynamic Programming (Top-Down) - I

### Intuition

A valid attendance record has at most 1 absence (A) and no more than 2 consecutive late days (L). We can think of this as a state machine where each state tracks two things: how many absences used so far (0 or 1) and how many consecutive late days at the current position (0, 1, or 2). At each position, we decide whether to place P (present), A (absent), or L (late), and transition to the appropriate next state.

### Algorithm

1. Define a recursive function `dfs(i, cntA, cntL)` where `i` is the remaining length, `cntA` is the number of absences used, and `cntL` is the current consecutive late streak.
2. Base case: when `i == 0`, we have built a valid record, so return 1.
3. For each position, we have three choices:
   - Place 'P': always valid, resets consecutive late count to 0.
   - Place 'A': only valid if `cntA == 0` (no absence used yet), resets late count to 0.
   - Place 'L': only valid if `cntL < 2` (fewer than 2 consecutive lates), increments late count.
4. Sum all valid transitions and cache the result.
5. Return `dfs(n, 0, 0)` as the answer.

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

```csharp
public class Solution {
    private const int MOD = 1000000007;
    private int[,,] cache;

    public int CheckRecord(int n) {
        cache = new int[n + 1, 2, 3];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j < 2; j++) {
                for (int k = 0; k < 3; k++) {
                    cache[i, j, k] = -1;
                }
            }
        }
        return Dfs(n, 0, 0);
    }

    private int Dfs(int i, int cntA, int cntL) {
        if (i == 0) return 1;
        if (cache[i, cntA, cntL] != -1) return cache[i, cntA, cntL];

        int res = Dfs(i - 1, cntA, 0) % MOD;

        if (cntA == 0) {
            res = (res + Dfs(i - 1, 1, 0)) % MOD;
        }

        if (cntL < 2) {
            res = (res + Dfs(i - 1, cntA, cntL + 1)) % MOD;
        }

        cache[i, cntA, cntL] = res;
        return res;
    }
}
```

```go
func checkRecord(n int) int {
    const MOD = 1000000007
    cache := make([][][]int, n+1)
    for i := range cache {
        cache[i] = make([][]int, 2)
        for j := range cache[i] {
            cache[i][j] = []int{-1, -1, -1}
        }
    }

    var dfs func(i, cntA, cntL int) int
    dfs = func(i, cntA, cntL int) int {
        if i == 0 {
            return 1
        }
        if cache[i][cntA][cntL] != -1 {
            return cache[i][cntA][cntL]
        }

        res := dfs(i-1, cntA, 0) % MOD

        if cntA == 0 {
            res = (res + dfs(i-1, 1, 0)) % MOD
        }

        if cntL < 2 {
            res = (res + dfs(i-1, cntA, cntL+1)) % MOD
        }

        cache[i][cntA][cntL] = res
        return res
    }

    return dfs(n, 0, 0)
}
```

```kotlin
class Solution {
    private val MOD = 1000000007
    private lateinit var cache: Array<Array<IntArray>>

    fun checkRecord(n: Int): Int {
        cache = Array(n + 1) { Array(2) { IntArray(3) { -1 } } }
        return dfs(n, 0, 0)
    }

    private fun dfs(i: Int, cntA: Int, cntL: Int): Int {
        if (i == 0) return 1
        if (cache[i][cntA][cntL] != -1) return cache[i][cntA][cntL]

        var res = dfs(i - 1, cntA, 0) % MOD

        if (cntA == 0) {
            res = (res + dfs(i - 1, 1, 0)) % MOD
        }

        if (cntL < 2) {
            res = (res + dfs(i - 1, cntA, cntL + 1)) % MOD
        }

        cache[i][cntA][cntL] = res
        return res
    }
}
```

```swift
class Solution {
    private let MOD = 1000000007
    private var cache: [[[Int]]] = []

    func checkRecord(_ n: Int) -> Int {
        cache = Array(repeating: Array(repeating: Array(repeating: -1, count: 3), count: 2), count: n + 1)
        return dfs(n, 0, 0)
    }

    private func dfs(_ i: Int, _ cntA: Int, _ cntL: Int) -> Int {
        if i == 0 { return 1 }
        if cache[i][cntA][cntL] != -1 { return cache[i][cntA][cntL] }

        var res = dfs(i - 1, cntA, 0) % MOD

        if cntA == 0 {
            res = (res + dfs(i - 1, 1, 0)) % MOD
        }

        if cntL < 2 {
            res = (res + dfs(i - 1, cntA, cntL + 1)) % MOD
        }

        cache[i][cntA][cntL] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down) - II

### Intuition

This approach reorganizes the state representation. Instead of tracking individual decisions, we store a 2D map keyed by (absence count, consecutive late count) for each length. The recursive function returns all six possible state counts for strings of length `n`, and we combine them when extending to longer strings.

### Algorithm

1. For the base case `n == 1`, manually define the counts for each (A, L) state.
2. For larger `n`, recursively get the state counts for `n - 1`.
3. Build the new state counts by considering what character we append:
   - Appending 'P' sums all states with the same absence count (resets late to 0).
   - Appending 'L' shifts the late count up by 1.
   - Appending 'A' moves from absence count 0 to 1 (resets late to 0).
4. Cache results to avoid recomputation.
5. Sum all six final state values modulo $10^9 + 7$.

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

```csharp
public class Solution {
    private const int MOD = 1000000007;
    private int[,] baseCase = { { 1, 1, 0 }, { 1, 0, 0 } };
    private int[,,] cache;

    public int CheckRecord(int n) {
        cache = new int[n + 1, 2, 3];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j < 2; j++) {
                for (int k = 0; k < 3; k++) {
                    cache[i, j, k] = -1;
                }
            }
        }
        int[,] result = Count(n);
        int total = 0;
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 3; j++) {
                total = (total + result[i, j]) % MOD;
            }
        }
        return total;
    }

    private int[,] Count(int n) {
        if (n == 1) return baseCase;
        if (cache[n, 0, 0] != -1) {
            return new int[,] {
                { cache[n, 0, 0], cache[n, 0, 1], cache[n, 0, 2] },
                { cache[n, 1, 0], cache[n, 1, 1], cache[n, 1, 2] }
            };
        }

        int[,] prev = Count(n - 1);

        // Choose P
        cache[n, 0, 0] = ((prev[0, 0] + prev[0, 1]) % MOD + prev[0, 2]) % MOD;
        cache[n, 1, 0] = ((prev[1, 0] + prev[1, 1]) % MOD + prev[1, 2]) % MOD;

        // Choose L
        cache[n, 0, 1] = prev[0, 0];
        cache[n, 0, 2] = prev[0, 1];
        cache[n, 1, 1] = prev[1, 0];
        cache[n, 1, 2] = prev[1, 1];

        // Choose A
        cache[n, 1, 0] = (cache[n, 1, 0] + ((prev[0, 0] + prev[0, 1]) % MOD + prev[0, 2]) % MOD) % MOD;

        return new int[,] {
            { cache[n, 0, 0], cache[n, 0, 1], cache[n, 0, 2] },
            { cache[n, 1, 0], cache[n, 1, 1], cache[n, 1, 2] }
        };
    }
}
```

```go
func checkRecord(n int) int {
    const MOD = 1000000007
    baseCase := [][]int{{1, 1, 0}, {1, 0, 0}}
    cache := make([][][]int, n+1)
    for i := range cache {
        cache[i] = make([][]int, 2)
        for j := range cache[i] {
            cache[i][j] = []int{-1, -1, -1}
        }
    }

    var count func(n int) [][]int
    count = func(n int) [][]int {
        if n == 1 {
            return baseCase
        }
        if cache[n][0][0] != -1 {
            return cache[n]
        }

        prev := count(n - 1)
        res := cache[n]

        // Choose P
        res[0][0] = ((prev[0][0]+prev[0][1])%MOD + prev[0][2]) % MOD
        res[1][0] = ((prev[1][0]+prev[1][1])%MOD + prev[1][2]) % MOD

        // Choose L
        res[0][1] = prev[0][0]
        res[0][2] = prev[0][1]
        res[1][1] = prev[1][0]
        res[1][2] = prev[1][1]

        // Choose A
        res[1][0] = (res[1][0] + ((prev[0][0]+prev[0][1])%MOD+prev[0][2])%MOD) % MOD

        return res
    }

    result := count(n)
    total := 0
    for _, row := range result {
        for _, val := range row {
            total = (total + val) % MOD
        }
    }
    return total
}
```

```kotlin
class Solution {
    private val MOD = 1000000007
    private val baseCase = arrayOf(intArrayOf(1, 1, 0), intArrayOf(1, 0, 0))
    private lateinit var cache: Array<Array<IntArray>>

    fun checkRecord(n: Int): Int {
        cache = Array(n + 1) { Array(2) { IntArray(3) { -1 } } }
        val result = count(n)
        var total = 0
        for (row in result) {
            for (value in row) {
                total = (total + value) % MOD
            }
        }
        return total
    }

    private fun count(n: Int): Array<IntArray> {
        if (n == 1) return baseCase
        if (cache[n][0][0] != -1) return cache[n]

        val prev = count(n - 1)
        val res = cache[n]

        // Choose P
        res[0][0] = ((prev[0][0] + prev[0][1]) % MOD + prev[0][2]) % MOD
        res[1][0] = ((prev[1][0] + prev[1][1]) % MOD + prev[1][2]) % MOD

        // Choose L
        res[0][1] = prev[0][0]
        res[0][2] = prev[0][1]
        res[1][1] = prev[1][0]
        res[1][2] = prev[1][1]

        // Choose A
        res[1][0] = (res[1][0] + ((prev[0][0] + prev[0][1]) % MOD + prev[0][2]) % MOD) % MOD

        return res
    }
}
```

```swift
class Solution {
    private let MOD = 1000000007
    private let baseCase = [[1, 1, 0], [1, 0, 0]]
    private var cache: [[[Int]]] = []

    func checkRecord(_ n: Int) -> Int {
        cache = Array(repeating: Array(repeating: Array(repeating: -1, count: 3), count: 2), count: n + 1)
        let result = count(n)
        var total = 0
        for row in result {
            for val in row {
                total = (total + val) % MOD
            }
        }
        return total
    }

    private func count(_ n: Int) -> [[Int]] {
        if n == 1 { return baseCase }
        if cache[n][0][0] != -1 { return cache[n] }

        let prev = count(n - 1)

        // Choose P
        cache[n][0][0] = ((prev[0][0] + prev[0][1]) % MOD + prev[0][2]) % MOD
        cache[n][1][0] = ((prev[1][0] + prev[1][1]) % MOD + prev[1][2]) % MOD

        // Choose L
        cache[n][0][1] = prev[0][0]
        cache[n][0][2] = prev[0][1]
        cache[n][1][1] = prev[1][0]
        cache[n][1][2] = prev[1][1]

        // Choose A
        cache[n][1][0] = (cache[n][1][0] + ((prev[0][0] + prev[0][1]) % MOD + prev[0][2]) % MOD) % MOD

        return cache[n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of recursion, we iterate forward and build the DP table from length 0 to n. Each state `dp[i][cntA][cntL]` represents the number of valid records of length `i` that have used `cntA` absences and end with `cntL` consecutive lates.

### Algorithm

1. Initialize `dp[0][0][0] = 1` (one way to have an empty record with no absences and no lates).
2. For each position from 1 to `n`, for each state (cntA, cntL):
   - Adding 'P': transitions from any late count to late count 0 with the same absence count.
   - Adding 'A': if `cntA > 0`, transitions from absence count `cntA - 1` to `cntA` with late count 0.
   - Adding 'L': if `cntL > 0`, transitions from late count `cntL - 1` to `cntL` with the same absence count.
3. Sum all states at position `n` for the final answer.

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

```csharp
public class Solution {
    public int CheckRecord(int n) {
        const int MOD = 1000000007;
        int[,,] dp = new int[n + 1, 2, 3];

        dp[0, 0, 0] = 1;

        for (int i = 1; i <= n; i++) {
            for (int cntA = 0; cntA < 2; cntA++) {
                for (int cntL = 0; cntL < 3; cntL++) {
                    // Choose P
                    dp[i, cntA, 0] = (dp[i, cntA, 0] + dp[i - 1, cntA, cntL]) % MOD;

                    // Choose A
                    if (cntA > 0) {
                        dp[i, cntA, 0] = (dp[i, cntA, 0] + dp[i - 1, cntA - 1, cntL]) % MOD;
                    }

                    // Choose L
                    if (cntL > 0) {
                        dp[i, cntA, cntL] = (dp[i, cntA, cntL] + dp[i - 1, cntA, cntL - 1]) % MOD;
                    }
                }
            }
        }

        int result = 0;
        for (int cntA = 0; cntA < 2; cntA++) {
            for (int cntL = 0; cntL < 3; cntL++) {
                result = (result + dp[n, cntA, cntL]) % MOD;
            }
        }

        return result;
    }
}
```

```go
func checkRecord(n int) int {
    const MOD = 1000000007
    dp := make([][][]int, n+1)
    for i := range dp {
        dp[i] = make([][]int, 2)
        for j := range dp[i] {
            dp[i][j] = make([]int, 3)
        }
    }

    dp[0][0][0] = 1

    for i := 1; i <= n; i++ {
        for cntA := 0; cntA < 2; cntA++ {
            for cntL := 0; cntL < 3; cntL++ {
                // Choose P
                dp[i][cntA][0] = (dp[i][cntA][0] + dp[i-1][cntA][cntL]) % MOD

                // Choose A
                if cntA > 0 {
                    dp[i][cntA][0] = (dp[i][cntA][0] + dp[i-1][cntA-1][cntL]) % MOD
                }

                // Choose L
                if cntL > 0 {
                    dp[i][cntA][cntL] = (dp[i][cntA][cntL] + dp[i-1][cntA][cntL-1]) % MOD
                }
            }
        }
    }

    result := 0
    for cntA := 0; cntA < 2; cntA++ {
        for cntL := 0; cntL < 3; cntL++ {
            result = (result + dp[n][cntA][cntL]) % MOD
        }
    }

    return result
}
```

```kotlin
class Solution {
    fun checkRecord(n: Int): Int {
        val MOD = 1000000007
        val dp = Array(n + 1) { Array(2) { IntArray(3) } }

        dp[0][0][0] = 1

        for (i in 1..n) {
            for (cntA in 0 until 2) {
                for (cntL in 0 until 3) {
                    // Choose P
                    dp[i][cntA][0] = (dp[i][cntA][0] + dp[i - 1][cntA][cntL]) % MOD

                    // Choose A
                    if (cntA > 0) {
                        dp[i][cntA][0] = (dp[i][cntA][0] + dp[i - 1][cntA - 1][cntL]) % MOD
                    }

                    // Choose L
                    if (cntL > 0) {
                        dp[i][cntA][cntL] = (dp[i][cntA][cntL] + dp[i - 1][cntA][cntL - 1]) % MOD
                    }
                }
            }
        }

        var result = 0
        for (cntA in 0 until 2) {
            for (cntL in 0 until 3) {
                result = (result + dp[n][cntA][cntL]) % MOD
            }
        }

        return result
    }
}
```

```swift
class Solution {
    func checkRecord(_ n: Int) -> Int {
        let MOD = 1000000007
        var dp = Array(repeating: Array(repeating: Array(repeating: 0, count: 3), count: 2), count: n + 1)

        dp[0][0][0] = 1

        for i in 1...n {
            for cntA in 0..<2 {
                for cntL in 0..<3 {
                    // Choose P
                    dp[i][cntA][0] = (dp[i][cntA][0] + dp[i - 1][cntA][cntL]) % MOD

                    // Choose A
                    if cntA > 0 {
                        dp[i][cntA][0] = (dp[i][cntA][0] + dp[i - 1][cntA - 1][cntL]) % MOD
                    }

                    // Choose L
                    if cntL > 0 {
                        dp[i][cntA][cntL] = (dp[i][cntA][cntL] + dp[i - 1][cntA][cntL - 1]) % MOD
                    }
                }
            }
        }

        var result = 0
        for cntA in 0..<2 {
            for cntL in 0..<3 {
                result = (result + dp[n][cntA][cntL]) % MOD
            }
        }

        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized) - I

### Intuition

Since each position only depends on the previous position, we can reduce space from O(n) to O(1) by keeping only two layers: the current and previous states. We store a 2x3 array representing all six possible (absence count, late count) combinations.

### Algorithm

1. Initialize the base case for length 1: set counts for each (A, L) state.
2. For each additional position (from length 2 to n):
   - Compute new state counts based on appending 'P', 'L', or 'A'.
   - 'P' sums all late counts for the same absence count (resets late to 0).
   - 'L' shifts late count forward.
   - 'A' transfers from absence 0 to absence 1.
3. After all iterations, sum the six state values for the answer.

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

```csharp
public class Solution {
    public int CheckRecord(int n) {
        if (n == 1) return 3;

        const int MOD = 1000000007;
        int[,] dp = { { 1, 1, 0 }, { 1, 0, 0 } };

        for (int i = 0; i < n - 1; i++) {
            int[,] ndp = new int[2, 3];

            // Choose P
            ndp[0, 0] = ((dp[0, 0] + dp[0, 1]) % MOD + dp[0, 2]) % MOD;
            ndp[1, 0] = ((dp[1, 0] + dp[1, 1]) % MOD + dp[1, 2]) % MOD;

            // Choose L
            ndp[0, 1] = dp[0, 0];
            ndp[1, 1] = dp[1, 0];
            ndp[0, 2] = dp[0, 1];
            ndp[1, 2] = dp[1, 1];

            // Choose A
            ndp[1, 0] = (ndp[1, 0] + ((dp[0, 0] + dp[0, 1]) % MOD + dp[0, 2]) % MOD) % MOD;

            dp = ndp;
        }

        int total = 0;
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 3; j++) {
                total = (total + dp[i, j]) % MOD;
            }
        }
        return total;
    }
}
```

```go
func checkRecord(n int) int {
    if n == 1 {
        return 3
    }

    const MOD = 1000000007
    dp := [][]int{{1, 1, 0}, {1, 0, 0}}

    for i := 0; i < n-1; i++ {
        ndp := [][]int{{0, 0, 0}, {0, 0, 0}}

        // Choose P
        ndp[0][0] = ((dp[0][0]+dp[0][1])%MOD + dp[0][2]) % MOD
        ndp[1][0] = ((dp[1][0]+dp[1][1])%MOD + dp[1][2]) % MOD

        // Choose L
        ndp[0][1] = dp[0][0]
        ndp[1][1] = dp[1][0]
        ndp[0][2] = dp[0][1]
        ndp[1][2] = dp[1][1]

        // Choose A
        ndp[1][0] = (ndp[1][0] + ((dp[0][0]+dp[0][1])%MOD+dp[0][2])%MOD) % MOD

        dp = ndp
    }

    total := 0
    for _, row := range dp {
        for _, val := range row {
            total = (total + val) % MOD
        }
    }
    return total
}
```

```kotlin
class Solution {
    fun checkRecord(n: Int): Int {
        if (n == 1) return 3

        val MOD = 1000000007
        var dp = arrayOf(intArrayOf(1, 1, 0), intArrayOf(1, 0, 0))

        for (i in 0 until n - 1) {
            val ndp = arrayOf(IntArray(3), IntArray(3))

            // Choose P
            ndp[0][0] = ((dp[0][0] + dp[0][1]) % MOD + dp[0][2]) % MOD
            ndp[1][0] = ((dp[1][0] + dp[1][1]) % MOD + dp[1][2]) % MOD

            // Choose L
            ndp[0][1] = dp[0][0]
            ndp[1][1] = dp[1][0]
            ndp[0][2] = dp[0][1]
            ndp[1][2] = dp[1][1]

            // Choose A
            ndp[1][0] = (ndp[1][0] + ((dp[0][0] + dp[0][1]) % MOD + dp[0][2]) % MOD) % MOD

            dp = ndp
        }

        var total = 0
        for (row in dp) {
            for (value in row) {
                total = (total + value) % MOD
            }
        }
        return total
    }
}
```

```swift
class Solution {
    func checkRecord(_ n: Int) -> Int {
        if n == 1 { return 3 }

        let MOD = 1000000007
        var dp = [[1, 1, 0], [1, 0, 0]]

        for _ in 0..<(n - 1) {
            var ndp = [[0, 0, 0], [0, 0, 0]]

            // Choose P
            ndp[0][0] = ((dp[0][0] + dp[0][1]) % MOD + dp[0][2]) % MOD
            ndp[1][0] = ((dp[1][0] + dp[1][1]) % MOD + dp[1][2]) % MOD

            // Choose L
            ndp[0][1] = dp[0][0]
            ndp[1][1] = dp[1][0]
            ndp[0][2] = dp[0][1]
            ndp[1][2] = dp[1][1]

            // Choose A
            ndp[1][0] = (ndp[1][0] + ((dp[0][0] + dp[0][1]) % MOD + dp[0][2]) % MOD) % MOD

            dp = ndp
        }

        var total = 0
        for row in dp {
            for val in row {
                total = (total + val) % MOD
            }
        }
        return total
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 5. Dynamic Programming (Space Optimized) - II

### Intuition

This is an alternative space-optimized formulation that iterates forward from the empty state. We maintain a 2x3 DP array and update it in place, swapping between current and next arrays each iteration.

### Algorithm

1. Initialize `dp[0][0] = 1` (empty record with no absences and no consecutive lates).
2. For each position from 1 to `n`:
   - Create a fresh next state array.
   - For each (cntA, cntL) combination, compute transitions:
     - 'P': adds to state (cntA, 0) from any (cntA, cntL).
     - 'A': adds to state (cntA, 0) from (cntA - 1, cntL) if `cntA > 0`.
     - 'L': adds to state (cntA, cntL) from (cntA, cntL - 1) if `cntL > 0`.
   - Swap arrays and continue.
3. Sum all six states at the end for the final count.

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

```csharp
public class Solution {
    public int CheckRecord(int n) {
        const int MOD = 1000000007;
        int[,] dp = new int[2, 3];

        dp[0, 0] = 1;

        for (int i = 1; i <= n; i++) {
            int[,] nextDp = new int[2, 3];

            for (int cntA = 0; cntA < 2; cntA++) {
                for (int cntL = 0; cntL < 3; cntL++) {
                    // Choose P
                    nextDp[cntA, 0] = (nextDp[cntA, 0] + dp[cntA, cntL]) % MOD;

                    // Choose A
                    if (cntA > 0) {
                        nextDp[cntA, 0] = (nextDp[cntA, 0] + dp[cntA - 1, cntL]) % MOD;
                    }

                    // Choose L
                    if (cntL > 0) {
                        nextDp[cntA, cntL] = (nextDp[cntA, cntL] + dp[cntA, cntL - 1]) % MOD;
                    }
                }
            }

            dp = nextDp;
        }

        int result = 0;
        for (int cntA = 0; cntA < 2; cntA++) {
            for (int cntL = 0; cntL < 3; cntL++) {
                result = (result + dp[cntA, cntL]) % MOD;
            }
        }
        return result;
    }
}
```

```go
func checkRecord(n int) int {
    const MOD = 1000000007
    dp := make([][]int, 2)
    for i := range dp {
        dp[i] = make([]int, 3)
    }

    dp[0][0] = 1

    for i := 1; i <= n; i++ {
        nextDp := make([][]int, 2)
        for j := range nextDp {
            nextDp[j] = make([]int, 3)
        }

        for cntA := 0; cntA < 2; cntA++ {
            for cntL := 0; cntL < 3; cntL++ {
                // Choose P
                nextDp[cntA][0] = (nextDp[cntA][0] + dp[cntA][cntL]) % MOD

                // Choose A
                if cntA > 0 {
                    nextDp[cntA][0] = (nextDp[cntA][0] + dp[cntA-1][cntL]) % MOD
                }

                // Choose L
                if cntL > 0 {
                    nextDp[cntA][cntL] = (nextDp[cntA][cntL] + dp[cntA][cntL-1]) % MOD
                }
            }
        }

        dp = nextDp
    }

    result := 0
    for cntA := 0; cntA < 2; cntA++ {
        for cntL := 0; cntL < 3; cntL++ {
            result = (result + dp[cntA][cntL]) % MOD
        }
    }

    return result
}
```

```kotlin
class Solution {
    fun checkRecord(n: Int): Int {
        val MOD = 1000000007
        var dp = Array(2) { IntArray(3) }

        dp[0][0] = 1

        for (i in 1..n) {
            val nextDp = Array(2) { IntArray(3) }

            for (cntA in 0 until 2) {
                for (cntL in 0 until 3) {
                    // Choose P
                    nextDp[cntA][0] = (nextDp[cntA][0] + dp[cntA][cntL]) % MOD

                    // Choose A
                    if (cntA > 0) {
                        nextDp[cntA][0] = (nextDp[cntA][0] + dp[cntA - 1][cntL]) % MOD
                    }

                    // Choose L
                    if (cntL > 0) {
                        nextDp[cntA][cntL] = (nextDp[cntA][cntL] + dp[cntA][cntL - 1]) % MOD
                    }
                }
            }

            dp = nextDp
        }

        var result = 0
        for (cntA in 0 until 2) {
            for (cntL in 0 until 3) {
                result = (result + dp[cntA][cntL]) % MOD
            }
        }

        return result
    }
}
```

```swift
class Solution {
    func checkRecord(_ n: Int) -> Int {
        let MOD = 1000000007
        var dp = Array(repeating: Array(repeating: 0, count: 3), count: 2)

        dp[0][0] = 1

        for _ in 1...n {
            var nextDp = Array(repeating: Array(repeating: 0, count: 3), count: 2)

            for cntA in 0..<2 {
                for cntL in 0..<3 {
                    // Choose P
                    nextDp[cntA][0] = (nextDp[cntA][0] + dp[cntA][cntL]) % MOD

                    // Choose A
                    if cntA > 0 {
                        nextDp[cntA][0] = (nextDp[cntA][0] + dp[cntA - 1][cntL]) % MOD
                    }

                    // Choose L
                    if cntL > 0 {
                        nextDp[cntA][cntL] = (nextDp[cntA][cntL] + dp[cntA][cntL - 1]) % MOD
                    }
                }
            }

            dp = nextDp
        }

        var result = 0
        for cntA in 0..<2 {
            for cntL in 0..<3 {
                result = (result + dp[cntA][cntL]) % MOD
            }
        }

        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
