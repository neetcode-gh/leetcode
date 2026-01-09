## 1. Recursion

::tabs-start

```python
class Solution:
    def knightDialer(self, n: int) -> int:
        if n == 1:
            return 10

        mod = 1000000007
        jumps = [
            [4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
            [], [0, 1, 7], [2, 6], [1, 3], [2, 4]
        ]

        def dfs(n, d):
            if n == 0:
                return 1

            res = 0
            for j in jumps[d]:
                res = (res + dfs(n - 1, j)) % mod
            return res

        res = 0
        for d in range(10):
            res = (res + dfs(n - 1, d)) % mod
        return res
```

```java
public class Solution {
    private static final int MOD = 1000000007;
    private static final int[][] jumps = {
        {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
        {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4}
    };

    public int knightDialer(int n) {
        if (n == 1) return 10;
        int res = 0;

        for (int d = 0; d < 10; d++) {
            res = (res + dfs(n - 1, d)) % MOD;
        }
        return res;
    }

    private int dfs(int n, int d) {
        if (n == 0) return 1;

        int res = 0;
        for (int next : jumps[d]) {
            res = (res + dfs(n - 1, next)) % MOD;
        }
        return res;
    }
}
```

```cpp
class Solution {
private:
    static constexpr int MOD = 1000000007;
    const vector<vector<int>> jumps = {
        {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
        {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4}
    };

public:
    int knightDialer(int n) {
        if (n == 1) return 10;
        int res = 0;

        for (int d = 0; d < 10; d++) {
            res = (res + dfs(n - 1, d)) % MOD;
        }
        return res;
    }

private:
    int dfs(int n, int d) {
        if (n == 0) return 1;

        int res = 0;
        for (int next : jumps[d]) {
            res = (res + dfs(n - 1, next)) % MOD;
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
    knightDialer(n) {
        if (n === 1) return 10;
        const MOD = 1000000007;
        const jumps = [
            [4, 6],
            [6, 8],
            [7, 9],
            [4, 8],
            [0, 3, 9],
            [],
            [0, 1, 7],
            [2, 6],
            [1, 3],
            [2, 4],
        ];

        const dfs = (n, d) => {
            if (n === 0) return 1;

            let res = 0;
            for (const next of jumps[d]) {
                res = (res + dfs(n - 1, next)) % MOD;
            }
            return res;
        };

        let res = 0;
        for (let d = 0; d < 10; d++) {
            res = (res + dfs(n - 1, d)) % MOD;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private static readonly int MOD = 1000000007;
    private static readonly int[][] jumps = new int[][] {
        new[] {4, 6}, new[] {6, 8}, new[] {7, 9}, new[] {4, 8}, new[] {0, 3, 9},
        new int[] {}, new[] {0, 1, 7}, new[] {2, 6}, new[] {1, 3}, new[] {2, 4}
    };

    public int KnightDialer(int n) {
        if (n == 1) return 10;
        int res = 0;
        for (int d = 0; d < 10; d++) {
            res = (res + Dfs(n - 1, d)) % MOD;
        }
        return res;
    }

    private int Dfs(int n, int d) {
        if (n == 0) return 1;
        int res = 0;
        foreach (int next in jumps[d]) {
            res = (res + Dfs(n - 1, next)) % MOD;
        }
        return res;
    }
}
```

```go
func knightDialer(n int) int {
    if n == 1 {
        return 10
    }
    MOD := 1000000007
    jumps := [][]int{
        {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
        {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4},
    }

    var dfs func(n, d int) int
    dfs = func(n, d int) int {
        if n == 0 {
            return 1
        }
        res := 0
        for _, next := range jumps[d] {
            res = (res + dfs(n-1, next)) % MOD
        }
        return res
    }

    res := 0
    for d := 0; d < 10; d++ {
        res = (res + dfs(n-1, d)) % MOD
    }
    return res
}
```

```kotlin
class Solution {
    private val MOD = 1000000007
    private val jumps = arrayOf(
        intArrayOf(4, 6), intArrayOf(6, 8), intArrayOf(7, 9), intArrayOf(4, 8), intArrayOf(0, 3, 9),
        intArrayOf(), intArrayOf(0, 1, 7), intArrayOf(2, 6), intArrayOf(1, 3), intArrayOf(2, 4)
    )

    fun knightDialer(n: Int): Int {
        if (n == 1) return 10
        var res = 0
        for (d in 0 until 10) {
            res = (res + dfs(n - 1, d)) % MOD
        }
        return res
    }

    private fun dfs(n: Int, d: Int): Int {
        if (n == 0) return 1
        var res = 0
        for (next in jumps[d]) {
            res = (res + dfs(n - 1, next)) % MOD
        }
        return res
    }
}
```

```swift
class Solution {
    let MOD = 1000000007
    let jumps = [
        [4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
        [], [0, 1, 7], [2, 6], [1, 3], [2, 4]
    ]

    func knightDialer(_ n: Int) -> Int {
        if n == 1 { return 10 }
        var res = 0
        for d in 0..<10 {
            res = (res + dfs(n - 1, d)) % MOD
        }
        return res
    }

    private func dfs(_ n: Int, _ d: Int) -> Int {
        if n == 0 { return 1 }
        var res = 0
        for next in jumps[d] {
            res = (res + dfs(n - 1, next)) % MOD
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(3 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def knightDialer(self, n: int) -> int:
        if n == 1:
            return 10

        mod = 1000000007
        jumps = [
            [4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
            [], [0, 1, 7], [2, 6], [1, 3], [2, 4]
        ]

        dp = [[-1] * (n + 1) for _ in range(10)]

        def dfs(n, d):
            if n == 0:
                return 1
            if dp[d][n] != -1:
                return dp[d][n]

            dp[d][n] = 0
            for j in jumps[d]:
                dp[d][n] = (dp[d][n] + dfs(n - 1, j)) % mod
            return dp[d][n]

        res = 0
        for d in range(10):
            res = (res + dfs(n - 1, d)) % mod
        return res
```

```java
public class Solution {
    private static final int MOD = 1000000007;
    private static final int[][] jumps = {
        {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
        {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4}
    };
    private int[][] dp;

    public int knightDialer(int n) {
        if (n == 1) return 10;
        dp = new int[10][n + 1];
        for (int[] row : dp) Arrays.fill(row, -1);

        int res = 0;
        for (int d = 0; d < 10; d++) {
            res = (res + dfs(n - 1, d)) % MOD;
        }
        return res;
    }

    private int dfs(int n, int d) {
        if (n == 0) return 1;
        if (dp[d][n] != -1) return dp[d][n];

        dp[d][n] = 0;
        for (int next : jumps[d]) {
            dp[d][n] = (dp[d][n] + dfs(n - 1, next)) % MOD;
        }
        return dp[d][n];
    }
}
```

```cpp
class Solution {
private:
    static constexpr int MOD = 1000000007;
    vector<vector<int>> jumps = {
        {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
        {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4}
    };
    vector<vector<int>> dp;

public:
    int knightDialer(int n) {
        if (n == 1) return 10;
        dp.assign(10, vector<int>(n + 1, -1));

        int res = 0;
        for (int d = 0; d < 10; d++) {
            res = (res + dfs(n - 1, d)) % MOD;
        }
        return res;
    }

private:
    int dfs(int n, int d) {
        if (n == 0) return 1;
        if (dp[d][n] != -1) return dp[d][n];

        dp[d][n] = 0;
        for (int next : jumps[d]) {
            dp[d][n] = (dp[d][n] + dfs(n - 1, next)) % MOD;
        }
        return dp[d][n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    knightDialer(n) {
        if (n === 1) return 10;
        const MOD = 1000000007;
        const jumps = [
            [4, 6],
            [6, 8],
            [7, 9],
            [4, 8],
            [0, 3, 9],
            [],
            [0, 1, 7],
            [2, 6],
            [1, 3],
            [2, 4],
        ];

        const dp = Array.from({ length: 10 }, () => Array(n + 1).fill(-1));

        const dfs = (n, d) => {
            if (n === 0) return 1;
            if (dp[d][n] !== -1) return dp[d][n];

            dp[d][n] = 0;
            for (const next of jumps[d]) {
                dp[d][n] = (dp[d][n] + dfs(n - 1, next)) % MOD;
            }
            return dp[d][n];
        };

        let res = 0;
        for (let d = 0; d < 10; d++) {
            res = (res + dfs(n - 1, d)) % MOD;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private static readonly int MOD = 1000000007;
    private static readonly int[][] jumps = new int[][] {
        new[] {4, 6}, new[] {6, 8}, new[] {7, 9}, new[] {4, 8}, new[] {0, 3, 9},
        new int[] {}, new[] {0, 1, 7}, new[] {2, 6}, new[] {1, 3}, new[] {2, 4}
    };
    private int[,] dp;

    public int KnightDialer(int n) {
        if (n == 1) return 10;
        dp = new int[10, n + 1];
        for (int i = 0; i < 10; i++)
            for (int j = 0; j <= n; j++)
                dp[i, j] = -1;

        int res = 0;
        for (int d = 0; d < 10; d++) {
            res = (res + Dfs(n - 1, d)) % MOD;
        }
        return res;
    }

    private int Dfs(int n, int d) {
        if (n == 0) return 1;
        if (dp[d, n] != -1) return dp[d, n];

        dp[d, n] = 0;
        foreach (int next in jumps[d]) {
            dp[d, n] = (dp[d, n] + Dfs(n - 1, next)) % MOD;
        }
        return dp[d, n];
    }
}
```

```go
func knightDialer(n int) int {
    if n == 1 {
        return 10
    }
    MOD := 1000000007
    jumps := [][]int{
        {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
        {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4},
    }

    dp := make([][]int, 10)
    for i := range dp {
        dp[i] = make([]int, n+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(n, d int) int
    dfs = func(n, d int) int {
        if n == 0 {
            return 1
        }
        if dp[d][n] != -1 {
            return dp[d][n]
        }

        dp[d][n] = 0
        for _, next := range jumps[d] {
            dp[d][n] = (dp[d][n] + dfs(n-1, next)) % MOD
        }
        return dp[d][n]
    }

    res := 0
    for d := 0; d < 10; d++ {
        res = (res + dfs(n-1, d)) % MOD
    }
    return res
}
```

```kotlin
class Solution {
    private val MOD = 1000000007
    private val jumps = arrayOf(
        intArrayOf(4, 6), intArrayOf(6, 8), intArrayOf(7, 9), intArrayOf(4, 8), intArrayOf(0, 3, 9),
        intArrayOf(), intArrayOf(0, 1, 7), intArrayOf(2, 6), intArrayOf(1, 3), intArrayOf(2, 4)
    )
    private lateinit var dp: Array<IntArray>

    fun knightDialer(n: Int): Int {
        if (n == 1) return 10
        dp = Array(10) { IntArray(n + 1) { -1 } }

        var res = 0
        for (d in 0 until 10) {
            res = (res + dfs(n - 1, d)) % MOD
        }
        return res
    }

    private fun dfs(n: Int, d: Int): Int {
        if (n == 0) return 1
        if (dp[d][n] != -1) return dp[d][n]

        dp[d][n] = 0
        for (next in jumps[d]) {
            dp[d][n] = (dp[d][n] + dfs(n - 1, next)) % MOD
        }
        return dp[d][n]
    }
}
```

```swift
class Solution {
    let MOD = 1000000007
    let jumps = [
        [4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
        [], [0, 1, 7], [2, 6], [1, 3], [2, 4]
    ]
    var dp: [[Int]] = []

    func knightDialer(_ n: Int) -> Int {
        if n == 1 { return 10 }
        dp = Array(repeating: Array(repeating: -1, count: n + 1), count: 10)

        var res = 0
        for d in 0..<10 {
            res = (res + dfs(n - 1, d)) % MOD
        }
        return res
    }

    private func dfs(_ n: Int, _ d: Int) -> Int {
        if n == 0 { return 1 }
        if dp[d][n] != -1 { return dp[d][n] }

        dp[d][n] = 0
        for next in jumps[d] {
            dp[d][n] = (dp[d][n] + dfs(n - 1, next)) % MOD
        }
        return dp[d][n]
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
    def knightDialer(self, n: int) -> int:
        if n == 1:
            return 10

        mod = 1000000007
        jumps = [
            [4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
            [], [0, 1, 7], [2, 6], [1, 3], [2, 4]
        ]

        dp = [[0] * (n + 1) for _ in range(10)]

        for d in range(10):
            dp[d][0] = 1

        for step in range(1, n):
            for d in range(10):
                dp[d][step] = sum(dp[j][step - 1] for j in jumps[d]) % mod

        return sum(dp[d][n - 1] for d in range(10)) % mod
```

```java
public class Solution {
    private static final int MOD = 1000000007;
    private static final int[][] jumps = {
        {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
        {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4}
    };

    public int knightDialer(int n) {
        if (n == 1) return 10;

        int[][] dp = new int[10][n + 1];
        for (int d = 0; d < 10; d++) {
            dp[d][0] = 1;
        }

        for (int step = 1; step < n; step++) {
            for (int d = 0; d < 10; d++) {
                for (int j : jumps[d]) {
                    dp[d][step] = (dp[d][step] + dp[j][step - 1]) % MOD;
                }
            }
        }

        int res = 0;
        for (int d = 0; d < 10; d++) {
            res = (res + dp[d][n - 1]) % MOD;
        }
        return res;
    }
}
```

```cpp
class Solution {
private:
    static constexpr int MOD = 1000000007;
    vector<vector<int>> jumps = {
        {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
        {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4}
    };

public:
    int knightDialer(int n) {
        if (n == 1) return 10;

        vector<vector<int>> dp(10, vector<int>(n + 1, 0));
        for (int d = 0; d < 10; d++) {
            dp[d][0] = 1;
        }

        for (int step = 1; step < n; step++) {
            for (int d = 0; d < 10; d++) {
                for (int j : jumps[d]) {
                    dp[d][step] = (dp[d][step] + dp[j][step - 1]) % MOD;
                }
            }
        }

        int res = 0;
        for (int d = 0; d < 10; d++) {
            res = (res + dp[d][n - 1]) % MOD;
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
    knightDialer(n) {
        if (n === 1) return 10;
        const MOD = 1000000007;
        const jumps = [
            [4, 6],
            [6, 8],
            [7, 9],
            [4, 8],
            [0, 3, 9],
            [],
            [0, 1, 7],
            [2, 6],
            [1, 3],
            [2, 4],
        ];

        const dp = Array.from({ length: 10 }, () => Array(n + 1).fill(0));
        for (let d = 0; d < 10; d++) {
            dp[d][0] = 1;
        }

        for (let step = 1; step < n; step++) {
            for (let d = 0; d < 10; d++) {
                for (const j of jumps[d]) {
                    dp[d][step] = (dp[d][step] + dp[j][step - 1]) % MOD;
                }
            }
        }

        let res = 0;
        for (let d = 0; d < 10; d++) {
            res = (res + dp[d][n - 1]) % MOD;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private static readonly int MOD = 1000000007;
    private static readonly int[][] jumps = new int[][] {
        new[] {4, 6}, new[] {6, 8}, new[] {7, 9}, new[] {4, 8}, new[] {0, 3, 9},
        new int[] {}, new[] {0, 1, 7}, new[] {2, 6}, new[] {1, 3}, new[] {2, 4}
    };

    public int KnightDialer(int n) {
        if (n == 1) return 10;

        int[,] dp = new int[10, n + 1];
        for (int d = 0; d < 10; d++) dp[d, 0] = 1;

        for (int step = 1; step < n; step++) {
            for (int d = 0; d < 10; d++) {
                foreach (int j in jumps[d]) {
                    dp[d, step] = (dp[d, step] + dp[j, step - 1]) % MOD;
                }
            }
        }

        int res = 0;
        for (int d = 0; d < 10; d++) {
            res = (res + dp[d, n - 1]) % MOD;
        }
        return res;
    }
}
```

```go
func knightDialer(n int) int {
    if n == 1 {
        return 10
    }
    MOD := 1000000007
    jumps := [][]int{
        {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
        {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4},
    }

    dp := make([][]int, 10)
    for i := range dp {
        dp[i] = make([]int, n+1)
        dp[i][0] = 1
    }

    for step := 1; step < n; step++ {
        for d := 0; d < 10; d++ {
            for _, j := range jumps[d] {
                dp[d][step] = (dp[d][step] + dp[j][step-1]) % MOD
            }
        }
    }

    res := 0
    for d := 0; d < 10; d++ {
        res = (res + dp[d][n-1]) % MOD
    }
    return res
}
```

```kotlin
class Solution {
    fun knightDialer(n: Int): Int {
        if (n == 1) return 10
        val MOD = 1000000007
        val jumps = arrayOf(
            intArrayOf(4, 6), intArrayOf(6, 8), intArrayOf(7, 9), intArrayOf(4, 8), intArrayOf(0, 3, 9),
            intArrayOf(), intArrayOf(0, 1, 7), intArrayOf(2, 6), intArrayOf(1, 3), intArrayOf(2, 4)
        )

        val dp = Array(10) { IntArray(n + 1) }
        for (d in 0 until 10) dp[d][0] = 1

        for (step in 1 until n) {
            for (d in 0 until 10) {
                for (j in jumps[d]) {
                    dp[d][step] = (dp[d][step] + dp[j][step - 1]) % MOD
                }
            }
        }

        var res = 0
        for (d in 0 until 10) {
            res = (res + dp[d][n - 1]) % MOD
        }
        return res
    }
}
```

```swift
class Solution {
    func knightDialer(_ n: Int) -> Int {
        if n == 1 { return 10 }
        let MOD = 1000000007
        let jumps = [
            [4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
            [], [0, 1, 7], [2, 6], [1, 3], [2, 4]
        ]

        var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: 10)
        for d in 0..<10 { dp[d][0] = 1 }

        for step in 1..<n {
            for d in 0..<10 {
                for j in jumps[d] {
                    dp[d][step] = (dp[d][step] + dp[j][step - 1]) % MOD
                }
            }
        }

        var res = 0
        for d in 0..<10 {
            res = (res + dp[d][n - 1]) % MOD
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def knightDialer(self, n: int) -> int:
        if n == 1:
            return 10

        mod = 1000000007
        jumps = [
            [4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
            [], [0, 1, 7], [2, 6], [1, 3], [2, 4]
        ]

        dp = [1] * 10
        for step in range(n - 1):
            next_dp = [0] * 10
            for d in range(10):
                for j in jumps[d]:
                    next_dp[j] = (next_dp[j] + dp[d]) % mod
            dp = next_dp

        res = 0
        for d in dp:
            res = (res + d) % mod
        return res
```

```java
public class Solution {
    private static final int MOD = 1000000007;
    private static final int[][] jumps = {
        {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
        {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4}
    };

    public int knightDialer(int n) {
        if (n == 1) return 10;

        int[] dp = new int[10];
        Arrays.fill(dp, 1);

        for (int step = 0; step < n - 1; step++) {
            int[] nextDp = new int[10];
            for (int d = 0; d < 10; d++) {
                for (int j : jumps[d]) {
                    nextDp[j] = (nextDp[j] + dp[d]) % MOD;
                }
            }
            dp = nextDp;
        }

        int res = 0;
        for (int d : dp) {
            res = (res + d) % MOD;
        }
        return res;
    }
}
```

```cpp
class Solution {
private:
    static constexpr int MOD = 1000000007;
    vector<vector<int>> jumps = {
        {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
        {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4}
    };

public:
    int knightDialer(int n) {
        if (n == 1) return 10;

        vector<int> dp(10, 1);

        for (int step = 0; step < n - 1; step++) {
            vector<int> nextDp(10, 0);
            for (int d = 0; d < 10; d++) {
                for (int j : jumps[d]) {
                    nextDp[j] = (nextDp[j] + dp[d]) % MOD;
                }
            }
            dp = nextDp;
        }

        int res = 0;
        for (int d : dp) {
            res = (res + d) % MOD;
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
    knightDialer(n) {
        if (n === 1) return 10;
        const MOD = 1000000007;
        const jumps = [
            [4, 6],
            [6, 8],
            [7, 9],
            [4, 8],
            [0, 3, 9],
            [],
            [0, 1, 7],
            [2, 6],
            [1, 3],
            [2, 4],
        ];

        let dp = new Array(10).fill(1);

        for (let step = 0; step < n - 1; step++) {
            let nextDp = new Array(10).fill(0);
            for (let d = 0; d < 10; d++) {
                for (const j of jumps[d]) {
                    nextDp[j] = (nextDp[j] + dp[d]) % MOD;
                }
            }
            dp = nextDp;
        }

        return dp.reduce((res, d) => (res + d) % MOD, 0);
    }
}
```

```csharp
public class Solution {
    public int KnightDialer(int n) {
        if (n == 1) return 10;
        int MOD = 1000000007;
        int[][] jumps = new int[][] {
            new[] {4, 6}, new[] {6, 8}, new[] {7, 9}, new[] {4, 8}, new[] {0, 3, 9},
            new int[] {}, new[] {0, 1, 7}, new[] {2, 6}, new[] {1, 3}, new[] {2, 4}
        };

        int[] dp = new int[10];
        Array.Fill(dp, 1);

        for (int step = 0; step < n - 1; step++) {
            int[] nextDp = new int[10];
            for (int d = 0; d < 10; d++) {
                foreach (int j in jumps[d]) {
                    nextDp[j] = (nextDp[j] + dp[d]) % MOD;
                }
            }
            dp = nextDp;
        }

        int res = 0;
        foreach (int d in dp) {
            res = (res + d) % MOD;
        }
        return res;
    }
}
```

```go
func knightDialer(n int) int {
    if n == 1 {
        return 10
    }
    MOD := 1000000007
    jumps := [][]int{
        {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
        {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4},
    }

    dp := make([]int, 10)
    for i := range dp {
        dp[i] = 1
    }

    for step := 0; step < n-1; step++ {
        nextDp := make([]int, 10)
        for d := 0; d < 10; d++ {
            for _, j := range jumps[d] {
                nextDp[j] = (nextDp[j] + dp[d]) % MOD
            }
        }
        dp = nextDp
    }

    res := 0
    for _, d := range dp {
        res = (res + d) % MOD
    }
    return res
}
```

```kotlin
class Solution {
    fun knightDialer(n: Int): Int {
        if (n == 1) return 10
        val MOD = 1000000007
        val jumps = arrayOf(
            intArrayOf(4, 6), intArrayOf(6, 8), intArrayOf(7, 9), intArrayOf(4, 8), intArrayOf(0, 3, 9),
            intArrayOf(), intArrayOf(0, 1, 7), intArrayOf(2, 6), intArrayOf(1, 3), intArrayOf(2, 4)
        )

        var dp = IntArray(10) { 1 }

        for (step in 0 until n - 1) {
            val nextDp = IntArray(10)
            for (d in 0 until 10) {
                for (j in jumps[d]) {
                    nextDp[j] = (nextDp[j] + dp[d]) % MOD
                }
            }
            dp = nextDp
        }

        return dp.fold(0) { res, d -> (res + d) % MOD }
    }
}
```

```swift
class Solution {
    func knightDialer(_ n: Int) -> Int {
        if n == 1 { return 10 }
        let MOD = 1000000007
        let jumps = [
            [4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
            [], [0, 1, 7], [2, 6], [1, 3], [2, 4]
        ]

        var dp = [Int](repeating: 1, count: 10)

        for _ in 0..<(n - 1) {
            var nextDp = [Int](repeating: 0, count: 10)
            for d in 0..<10 {
                for j in jumps[d] {
                    nextDp[j] = (nextDp[j] + dp[d]) % MOD
                }
            }
            dp = nextDp
        }

        return dp.reduce(0) { ($0 + $1) % MOD }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 5. Dynamic Programming (Optimal)

::tabs-start

```python
class Solution:
    def knightDialer(self, n: int) -> int:
        if n == 1:
            return 10

        mod = 10**9 + 7
        jumps = [1, 4, 2, 2]  # [D, A, B, C]

        for _ in range(n - 1):
            tmp = [0] * 4
            tmp[0] = jumps[3]
            tmp[1] = 2 * jumps[2] + 2 * jumps[3]
            tmp[2] = jumps[1]
            tmp[3] = 2 * jumps[0] + jumps[1]
            jumps = tmp

        return sum(jumps) % mod
```

```java
public class Solution {
    public int knightDialer(int n) {
        if (n == 1) return 10;

        int MOD = 1000000007;
        long[] jumps = {1, 4, 2, 2}; // [D, A, B, C]

        for (int i = 0; i < n - 1; i++) {
            long[] tmp = new long[4];
            tmp[0] = jumps[3];
            tmp[1] = (2 * jumps[2] + 2 * jumps[3]) % MOD;
            tmp[2] = jumps[1];
            tmp[3] = (2 * jumps[0] + jumps[1]) % MOD;
            jumps = tmp;
        }

        long res = 0;
        for (long num : jumps) {
            res = (res + num) % MOD;
        }
        return (int) res;
    }
}
```

```cpp
class Solution {
public:
    int knightDialer(int n) {
        if (n == 1) return 10;

        const int MOD = 1000000007;
        vector<long long> jumps = {1, 4, 2, 2}; // [D, A, B, C]

        for (int i = 0; i < n - 1; i++) {
            vector<long long> tmp(4);
            tmp[0] = jumps[3];
            tmp[1] = (2 * jumps[2] + 2 * jumps[3]) % MOD;
            tmp[2] = jumps[1];
            tmp[3] = (2 * jumps[0] + jumps[1]) % MOD;
            jumps = tmp;
        }

        return (jumps[0] + jumps[1] + jumps[2] + jumps[3]) % MOD;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    knightDialer(n) {
        if (n === 1) return 10;

        const MOD = 1000000007;
        let jumps = [1, 4, 2, 2]; // [D, A, B, C]

        for (let i = 0; i < n - 1; i++) {
            let tmp = new Array(4).fill(0);
            tmp[0] = jumps[3];
            tmp[1] = (2 * jumps[2] + 2 * jumps[3]) % MOD;
            tmp[2] = jumps[1];
            tmp[3] = (2 * jumps[0] + jumps[1]) % MOD;
            jumps = tmp;
        }

        return jumps.reduce((sum, num) => (sum + num) % MOD, 0);
    }
}
```

```csharp
public class Solution {
    public int KnightDialer(int n) {
        if (n == 1) return 10;
        int MOD = 1000000007;
        long[] jumps = {1, 4, 2, 2}; // [D, A, B, C]

        for (int i = 0; i < n - 1; i++) {
            long[] tmp = new long[4];
            tmp[0] = jumps[3];
            tmp[1] = (2 * jumps[2] + 2 * jumps[3]) % MOD;
            tmp[2] = jumps[1];
            tmp[3] = (2 * jumps[0] + jumps[1]) % MOD;
            jumps = tmp;
        }

        long res = 0;
        foreach (long num in jumps) {
            res = (res + num) % MOD;
        }
        return (int)res;
    }
}
```

```go
func knightDialer(n int) int {
    if n == 1 {
        return 10
    }
    MOD := int64(1000000007)
    jumps := []int64{1, 4, 2, 2} // [D, A, B, C]

    for i := 0; i < n-1; i++ {
        tmp := make([]int64, 4)
        tmp[0] = jumps[3]
        tmp[1] = (2*jumps[2] + 2*jumps[3]) % MOD
        tmp[2] = jumps[1]
        tmp[3] = (2*jumps[0] + jumps[1]) % MOD
        jumps = tmp
    }

    var res int64 = 0
    for _, num := range jumps {
        res = (res + num) % MOD
    }
    return int(res)
}
```

```kotlin
class Solution {
    fun knightDialer(n: Int): Int {
        if (n == 1) return 10
        val MOD = 1000000007L
        var jumps = longArrayOf(1, 4, 2, 2) // [D, A, B, C]

        for (i in 0 until n - 1) {
            val tmp = LongArray(4)
            tmp[0] = jumps[3]
            tmp[1] = (2 * jumps[2] + 2 * jumps[3]) % MOD
            tmp[2] = jumps[1]
            tmp[3] = (2 * jumps[0] + jumps[1]) % MOD
            jumps = tmp
        }

        return (jumps.sum() % MOD).toInt()
    }
}
```

```swift
class Solution {
    func knightDialer(_ n: Int) -> Int {
        if n == 1 { return 10 }
        let MOD = 1000000007
        var jumps = [1, 4, 2, 2] // [D, A, B, C]

        for _ in 0..<(n - 1) {
            var tmp = [Int](repeating: 0, count: 4)
            tmp[0] = jumps[3]
            tmp[1] = (2 * jumps[2] + 2 * jumps[3]) % MOD
            tmp[2] = jumps[1]
            tmp[3] = (2 * jumps[0] + jumps[1]) % MOD
            jumps = tmp
        }

        return jumps.reduce(0) { ($0 + $1) % MOD }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 6. Matrix Exponentiation

::tabs-start

```python
class Matrix:
    def __init__(self, size):
        self.n = size
        self.a = [[0] * size for _ in range(size)]

    def __mul__(self, other):
        n = self.n
        MOD = 10**9 + 7
        product = Matrix(n)
        for i in range(n):
            for j in range(n):
                for k in range(n):
                    product.a[i][k] = (product.a[i][k] + self.a[i][j] * other.a[j][k]) % MOD
        return product


def matpow(mat, n, size):
    res = Matrix(size)
    for i in range(size):
        res.a[i][i] = 1  # Identity matrix

    while n:
        if n & 1:
            res = res * mat
        mat = mat * mat
        n >>= 1

    return res


class Solution:
    def knightDialer(self, n: int) -> int:
        if n == 1:
            return 10

        MOD = 10**9 + 7
        jumps = [
            [4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
            [], [0, 1, 7], [2, 6], [1, 3], [2, 4]
        ]

        mat = Matrix(10)
        for i in range(10):
            for j in jumps[i]:
                mat.a[i][j] = 1

        res = matpow(mat, n - 1, 10)

        ans = sum(sum(res.a[i]) for i in range(10)) % MOD
        return ans
```

```java
class Matrix {
    int[][] a;
    int size;
    static final int MOD = 1_000_000_007;

    public Matrix(int size) {
        this.size = size;
        a = new int[size][size];
    }

    public Matrix multiply(Matrix other) {
        Matrix product = new Matrix(size);
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                for (int k = 0; k < size; k++) {
                    product.a[i][k] = (int)((product.a[i][k] + (long) a[i][j] * other.a[j][k]) % MOD);
                }
            }
        }
        return product;
    }
}

public class Solution {
    private Matrix matpow(Matrix mat, int n, int size) {
        Matrix res = new Matrix(size);
        for (int i = 0; i < size; i++) {
            res.a[i][i] = 1;  // Identity matrix
        }

        while (n > 0) {
            if ((n & 1) == 1) {
                res = res.multiply(mat);
            }
            mat = mat.multiply(mat);
            n >>= 1;
        }
        return res;
    }

    public int knightDialer(int n) {
        if (n == 1) return 10;

        int[][] jumps = {
            {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
            {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4}
        };

        Matrix mat = new Matrix(10);
        for (int i = 0; i < 10; i++) {
            for (int j : jumps[i]) {
                mat.a[i][j] = 1;
            }
        }

        Matrix res = matpow(mat, n - 1, 10);

        int ans = 0;
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {
                ans = (ans + res.a[i][j]) % Matrix.MOD;
            }
        }
        return ans;
    }
}
```

```cpp
class Matrix {
public:
    vector<vector<int>> a;
    int size;
    static const int MOD = 1'000'000'007;

    Matrix(int n) : size(n) {
        a.assign(n, vector<int>(n, 0));
    }

    Matrix operator*(const Matrix &other) const {
        Matrix product(size);
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                for (int k = 0; k < size; k++) {
                    product.a[i][k] = (product.a[i][k] + 1LL * a[i][j] * other.a[j][k]) % MOD;
                }
            }
        }
        return product;
    }
};

Matrix matpow(Matrix mat, int n, int size) {
    Matrix res(size);
    for (int i = 0; i < size; i++) {
        res.a[i][i] = 1; // Identity matrix
    }

    while (n > 0) {
        if (n & 1) res = res * mat;
        mat = mat * mat;
        n >>= 1;
    }
    return res;
}

class Solution {
public:
    int knightDialer(int n) {
        if (n == 1) return 10;

        vector<vector<int>> jumps = {
            {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
            {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4}
        };

        Matrix mat(10);
        for (int i = 0; i < 10; i++) {
            for (int j : jumps[i]) {
                mat.a[i][j] = 1;
            }
        }

        Matrix res = matpow(mat, n - 1, 10);

        int ans = 0;
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {
                ans = (ans + res.a[i][j]) % Matrix::MOD;
            }
        }
        return ans;
    }
};
```

```javascript
class Matrix {
    constructor(size) {
        this.size = size;
        this.a = Array.from({ length: size }, () => Array(size).fill(0));
        this.MOD = BigInt(1e9 + 7);
    }

    multiply(other) {
        const product = new Matrix(this.size);
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let sum = BigInt(0);
                for (let k = 0; k < this.size; k++) {
                    sum =
                        (sum + BigInt(this.a[i][k]) * BigInt(other.a[k][j])) %
                        this.MOD;
                }
                product.a[i][j] = Number(sum);
            }
        }
        return product;
    }
}

class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    knightDialer(n) {
        if (n === 1) return 10;

        const matpow = (mat, exp, size) => {
            let res = new Matrix(size);
            for (let i = 0; i < size; i++) {
                res.a[i][i] = 1; // Identity matrix
            }

            while (exp > 0) {
                if (exp & 1) {
                    res = res.multiply(mat);
                }
                mat = mat.multiply(mat);
                exp >>= 1;
            }
            return res;
        };

        const jumps = [
            [4, 6],
            [6, 8],
            [7, 9],
            [4, 8],
            [0, 3, 9],
            [],
            [0, 1, 7],
            [2, 6],
            [1, 3],
            [2, 4],
        ];

        const mat = new Matrix(10);
        for (let i = 0; i < 10; i++) {
            for (let j of jumps[i]) {
                mat.a[i][j] = 1;
            }
        }

        const res = matpow(mat, n - 1, 10);
        const mod = 1e9 + 7;
        let ans = 0;

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                ans = (ans + res.a[i][j]) % mod;
            }
        }

        return ans;
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1000000007;

    public int KnightDialer(int n) {
        if (n == 1) return 10;

        int[][] jumps = new int[][] {
            new[] {4, 6}, new[] {6, 8}, new[] {7, 9}, new[] {4, 8}, new[] {0, 3, 9},
            new int[] {}, new[] {0, 1, 7}, new[] {2, 6}, new[] {1, 3}, new[] {2, 4}
        };

        long[,] mat = new long[10, 10];
        for (int i = 0; i < 10; i++) {
            foreach (int j in jumps[i]) {
                mat[i, j] = 1;
            }
        }

        long[,] res = Matpow(mat, n - 1);

        long ans = 0;
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {
                ans = (ans + res[i, j]) % MOD;
            }
        }
        return (int)ans;
    }

    private long[,] Multiply(long[,] a, long[,] b) {
        int size = 10;
        long[,] product = new long[size, size];
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                for (int k = 0; k < size; k++) {
                    product[i, k] = (product[i, k] + a[i, j] * b[j, k]) % MOD;
                }
            }
        }
        return product;
    }

    private long[,] Matpow(long[,] mat, int n) {
        int size = 10;
        long[,] res = new long[size, size];
        for (int i = 0; i < size; i++) res[i, i] = 1;

        while (n > 0) {
            if ((n & 1) == 1) res = Multiply(res, mat);
            mat = Multiply(mat, mat);
            n >>= 1;
        }
        return res;
    }
}
```

```go
func knightDialer(n int) int {
    if n == 1 {
        return 10
    }
    MOD := int64(1000000007)
    jumps := [][]int{
        {4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9},
        {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4},
    }

    multiply := func(a, b [][]int64) [][]int64 {
        size := 10
        product := make([][]int64, size)
        for i := range product {
            product[i] = make([]int64, size)
        }
        for i := 0; i < size; i++ {
            for j := 0; j < size; j++ {
                for k := 0; k < size; k++ {
                    product[i][k] = (product[i][k] + a[i][j]*b[j][k]) % MOD
                }
            }
        }
        return product
    }

    matpow := func(mat [][]int64, exp int) [][]int64 {
        size := 10
        res := make([][]int64, size)
        for i := range res {
            res[i] = make([]int64, size)
            res[i][i] = 1
        }
        for exp > 0 {
            if exp&1 == 1 {
                res = multiply(res, mat)
            }
            mat = multiply(mat, mat)
            exp >>= 1
        }
        return res
    }

    mat := make([][]int64, 10)
    for i := range mat {
        mat[i] = make([]int64, 10)
        for _, j := range jumps[i] {
            mat[i][j] = 1
        }
    }

    res := matpow(mat, n-1)

    var ans int64 = 0
    for i := 0; i < 10; i++ {
        for j := 0; j < 10; j++ {
            ans = (ans + res[i][j]) % MOD
        }
    }
    return int(ans)
}
```

```kotlin
class Solution {
    private val MOD = 1000000007L

    fun knightDialer(n: Int): Int {
        if (n == 1) return 10

        val jumps = arrayOf(
            intArrayOf(4, 6), intArrayOf(6, 8), intArrayOf(7, 9), intArrayOf(4, 8), intArrayOf(0, 3, 9),
            intArrayOf(), intArrayOf(0, 1, 7), intArrayOf(2, 6), intArrayOf(1, 3), intArrayOf(2, 4)
        )

        val mat = Array(10) { LongArray(10) }
        for (i in 0 until 10) {
            for (j in jumps[i]) {
                mat[i][j] = 1L
            }
        }

        val res = matpow(mat, n - 1)

        var ans = 0L
        for (i in 0 until 10) {
            for (j in 0 until 10) {
                ans = (ans + res[i][j]) % MOD
            }
        }
        return ans.toInt()
    }

    private fun multiply(a: Array<LongArray>, b: Array<LongArray>): Array<LongArray> {
        val size = 10
        val product = Array(size) { LongArray(size) }
        for (i in 0 until size) {
            for (j in 0 until size) {
                for (k in 0 until size) {
                    product[i][k] = (product[i][k] + a[i][j] * b[j][k]) % MOD
                }
            }
        }
        return product
    }

    private fun matpow(mat: Array<LongArray>, exp: Int): Array<LongArray> {
        var m = mat
        var e = exp
        val size = 10
        var res = Array(size) { i -> LongArray(size) { if (it == i) 1L else 0L } }
        while (e > 0) {
            if (e and 1 == 1) res = multiply(res, m)
            m = multiply(m, m)
            e = e shr 1
        }
        return res
    }
}
```

```swift
class Solution {
    let MOD = 1000000007

    func knightDialer(_ n: Int) -> Int {
        if n == 1 { return 10 }

        let jumps = [
            [4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
            [], [0, 1, 7], [2, 6], [1, 3], [2, 4]
        ]

        var mat = [[Int]](repeating: [Int](repeating: 0, count: 10), count: 10)
        for i in 0..<10 {
            for j in jumps[i] {
                mat[i][j] = 1
            }
        }

        let res = matpow(mat, n - 1)

        var ans = 0
        for i in 0..<10 {
            for j in 0..<10 {
                ans = (ans + res[i][j]) % MOD
            }
        }
        return ans
    }

    private func multiply(_ a: [[Int]], _ b: [[Int]]) -> [[Int]] {
        let size = 10
        var product = [[Int]](repeating: [Int](repeating: 0, count: size), count: size)
        for i in 0..<size {
            for j in 0..<size {
                for k in 0..<size {
                    product[i][k] = (product[i][k] + a[i][j] * b[j][k]) % MOD
                }
            }
        }
        return product
    }

    private func matpow(_ mat: [[Int]], _ exp: Int) -> [[Int]] {
        var m = mat
        var e = exp
        let size = 10
        var res = [[Int]](repeating: [Int](repeating: 0, count: size), count: size)
        for i in 0..<size { res[i][i] = 1 }

        while e > 0 {
            if e & 1 == 1 { res = multiply(res, m) }
            m = multiply(m, m)
            e >>= 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$
