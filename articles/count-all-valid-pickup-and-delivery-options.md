## 1. Recursion

### Intuition
We need to count all valid orderings where each delivery happens after its corresponding pickup. At any point, we can either pick up a new order (if any remain) or deliver an order that has already been picked up. The number of choices at each step depends on how many orders are still available for pickup and how many are picked but not yet delivered.

### Algorithm
1. Use recursion with two state variables: the count of picked orders and delivered orders.
2. At each step, if we can pick up more orders, branch with `(n - picked)` choices for which order to pick next.
3. If there are orders picked but not delivered, branch with `(picked - delivered)` choices for which order to deliver.
4. Return 1 when all orders are picked and delivered (base case).
5. Multiply the count of choices at each branch and sum all paths.

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

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    public int CountOrders(int n) {
        return Dfs(0, 0, n);
    }

    private int Dfs(int picked, int delivered, int n) {
        if (picked == n && delivered == n) {
            return 1;
        }

        long res = 0;
        if (picked < n) {
            res = (res + (n - picked) * 1L * Dfs(picked + 1, delivered, n)) % MOD;
        }
        if (delivered < picked) {
            res = (res + (picked - delivered) * 1L * Dfs(picked, delivered + 1, n)) % MOD;
        }

        return (int) res;
    }
}
```

```go
func countOrders(n int) int {
    MOD := 1000000007

    var dfs func(picked, delivered int) int
    dfs = func(picked, delivered int) int {
        if picked == n && delivered == n {
            return 1
        }

        res := 0
        if picked < n {
            res = (res + (n-picked)*dfs(picked+1, delivered)) % MOD
        }
        if delivered < picked {
            res = (res + (picked-delivered)*dfs(picked, delivered+1)) % MOD
        }

        return res
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007

    fun countOrders(n: Int): Int {
        return dfs(0, 0, n)
    }

    private fun dfs(picked: Int, delivered: Int, n: Int): Int {
        if (picked == n && delivered == n) {
            return 1
        }

        var res: Long = 0
        if (picked < n) {
            res = (res + (n - picked).toLong() * dfs(picked + 1, delivered, n)) % MOD
        }
        if (delivered < picked) {
            res = (res + (picked - delivered).toLong() * dfs(picked, delivered + 1, n)) % MOD
        }

        return res.toInt()
    }
}
```

```swift
class Solution {
    let MOD = 1_000_000_007

    func countOrders(_ n: Int) -> Int {
        func dfs(_ picked: Int, _ delivered: Int) -> Int {
            if picked == n && delivered == n {
                return 1
            }

            var res = 0
            if picked < n {
                res = (res + (n - picked) * dfs(picked + 1, delivered)) % MOD
            }
            if delivered < picked {
                res = (res + (picked - delivered) * dfs(picked, delivered + 1)) % MOD
            }

            return res
        }

        return dfs(0, 0)
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
The recursive solution recalculates the same states multiple times. For example, the state (picked=2, delivered=1) might be reached through different orderings. By caching these results, we avoid redundant computation.

### Algorithm
1. Create a 2D memoization table indexed by (picked, delivered).
2. Before computing a state, check if it exists in the cache and return it if found.
3. Apply the same recursive logic as before: pick an unpicked order or deliver a picked order.
4. Store the computed result in the cache before returning.
5. Start the recursion from (0, 0) and return the cached result.

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

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;
    private int[,] dp;

    public int CountOrders(int n) {
        dp = new int[n + 1, n + 1];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= n; j++) {
                dp[i, j] = -1;
            }
        }
        dp[n, n] = 1;
        return Dfs(0, 0, n);
    }

    private int Dfs(int picked, int delivered, int n) {
        if (dp[picked, delivered] != -1) {
            return dp[picked, delivered];
        }

        long res = 0;
        if (picked < n) {
            res = (res + (n - picked) * 1L * Dfs(picked + 1, delivered, n)) % MOD;
        }
        if (delivered < picked) {
            res = (res + (picked - delivered) * 1L * Dfs(picked, delivered + 1, n)) % MOD;
        }

        dp[picked, delivered] = (int)res;
        return (int)res;
    }
}
```

```go
func countOrders(n int) int {
    MOD := 1000000007
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }
    dp[n][n] = 1

    var dfs func(picked, delivered int) int
    dfs = func(picked, delivered int) int {
        if dp[picked][delivered] != -1 {
            return dp[picked][delivered]
        }

        res := 0
        if picked < n {
            res = (res + (n-picked)*dfs(picked+1, delivered)) % MOD
        }
        if delivered < picked {
            res = (res + (picked-delivered)*dfs(picked, delivered+1)) % MOD
        }

        dp[picked][delivered] = res
        return res
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007
    private lateinit var dp: Array<IntArray>

    fun countOrders(n: Int): Int {
        dp = Array(n + 1) { IntArray(n + 1) { -1 } }
        dp[n][n] = 1
        return dfs(0, 0, n)
    }

    private fun dfs(picked: Int, delivered: Int, n: Int): Int {
        if (dp[picked][delivered] != -1) {
            return dp[picked][delivered]
        }

        var res: Long = 0
        if (picked < n) {
            res = (res + (n - picked).toLong() * dfs(picked + 1, delivered, n)) % MOD
        }
        if (delivered < picked) {
            res = (res + (picked - delivered).toLong() * dfs(picked, delivered + 1, n)) % MOD
        }

        dp[picked][delivered] = res.toInt()
        return res.toInt()
    }
}
```

```swift
class Solution {
    let MOD = 1_000_000_007
    var dp: [[Int]] = []

    func countOrders(_ n: Int) -> Int {
        dp = Array(repeating: Array(repeating: -1, count: n + 1), count: n + 1)
        dp[n][n] = 1

        func dfs(_ picked: Int, _ delivered: Int) -> Int {
            if dp[picked][delivered] != -1 {
                return dp[picked][delivered]
            }

            var res = 0
            if picked < n {
                res = (res + (n - picked) * dfs(picked + 1, delivered)) % MOD
            }
            if delivered < picked {
                res = (res + (picked - delivered) * dfs(picked, delivered + 1)) % MOD
            }

            dp[picked][delivered] = res
            return res
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition
Instead of recursing from (0, 0) and memoizing, we can build the solution iteratively. We start from the base case where no orders are processed and accumulate the number of ways to reach each state by considering all valid transitions.

### Algorithm
1. Create a 2D DP table where `dp[picked][delivered]` represents the number of ways to reach that state.
2. Initialize `dp[0][0] = 1` as the starting point.
3. Iterate through all states in order of increasing picked and delivered counts.
4. For each state, add its contribution to the next states: picking a new order or delivering a picked order.
5. Return `dp[n][n]` as the final answer.

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

```csharp
public class Solution {
    public int CountOrders(int n) {
        int MOD = 1_000_000_007;
        int[,] dp = new int[n + 1, n + 1];
        dp[0, 0] = 1;

        for (int picked = 0; picked <= n; picked++) {
            for (int delivered = 0; delivered <= n; delivered++) {
                if (picked < n) {
                    dp[picked + 1, delivered] = (int)((dp[picked + 1, delivered] +
                                                (n - picked) * 1L * dp[picked, delivered]) % MOD);
                }
                if (delivered < picked) {
                    dp[picked, delivered + 1] = (int)((dp[picked, delivered + 1] +
                                                (picked - delivered) * 1L * dp[picked, delivered]) % MOD);
                }
            }
        }

        return dp[n, n];
    }
}
```

```go
func countOrders(n int) int {
    MOD := 1000000007
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }
    dp[0][0] = 1

    for picked := 0; picked <= n; picked++ {
        for delivered := 0; delivered <= n; delivered++ {
            if picked < n {
                dp[picked+1][delivered] = (dp[picked+1][delivered] +
                    (n-picked)*dp[picked][delivered]) % MOD
            }
            if delivered < picked {
                dp[picked][delivered+1] = (dp[picked][delivered+1] +
                    (picked-delivered)*dp[picked][delivered]) % MOD
            }
        }
    }

    return dp[n][n]
}
```

```kotlin
class Solution {
    fun countOrders(n: Int): Int {
        val MOD = 1_000_000_007
        val dp = Array(n + 1) { LongArray(n + 1) }
        dp[0][0] = 1

        for (picked in 0..n) {
            for (delivered in 0..n) {
                if (picked < n) {
                    dp[picked + 1][delivered] = (dp[picked + 1][delivered] +
                        (n - picked) * dp[picked][delivered]) % MOD
                }
                if (delivered < picked) {
                    dp[picked][delivered + 1] = (dp[picked][delivered + 1] +
                        (picked - delivered) * dp[picked][delivered]) % MOD
                }
            }
        }

        return dp[n][n].toInt()
    }
}
```

```swift
class Solution {
    func countOrders(_ n: Int) -> Int {
        let MOD = 1_000_000_007
        var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: n + 1)
        dp[0][0] = 1

        for picked in 0...n {
            for delivered in 0...n {
                if picked < n {
                    dp[picked + 1][delivered] = (dp[picked + 1][delivered] +
                        (n - picked) * dp[picked][delivered]) % MOD
                }
                if delivered < picked {
                    dp[picked][delivered + 1] = (dp[picked][delivered + 1] +
                        (picked - delivered) * dp[picked][delivered]) % MOD
                }
            }
        }

        return dp[n][n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Space Optimized)

### Intuition
In the bottom-up approach, when processing states for a given number of picked orders, we only need the current row of delivered counts. After processing all deliveries for the current picked count, we can transition to the next picked count and discard the old row.

### Algorithm
1. Use a 1D array to track the number of ways for each delivered count.
2. For each picked count, first process all possible deliveries within that row.
3. Before moving to the next picked count, create a new array and populate it based on the pickup transition.
4. Continue until all n orders are processed.
5. Return `dp[n]` which represents the state where all n orders are picked and delivered.

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

```csharp
public class Solution {
    public int CountOrders(int n) {
        int MOD = 1000000007;
        long[] dp = new long[n + 1];
        dp[0] = 1;

        for (int picked = 0; picked <= n; picked++) {
            for (int delivered = 0; delivered < picked; delivered++) {
                dp[delivered + 1] = (dp[delivered + 1] +
                    (picked - delivered) * dp[delivered]) % MOD;
            }

            if (picked < n) {
                long[] next_dp = new long[n + 1];
                for (int delivered = 0; delivered <= picked; delivered++) {
                    next_dp[delivered] = (next_dp[delivered] +
                        (n - picked) * dp[delivered]) % MOD;
                }
                dp = next_dp;
            }
        }

        return (int)dp[n];
    }
}
```

```go
func countOrders(n int) int {
    MOD := 1000000007
    dp := make([]int, n+1)
    dp[0] = 1

    for picked := 0; picked <= n; picked++ {
        for delivered := 0; delivered < picked; delivered++ {
            dp[delivered+1] = (dp[delivered+1] +
                (picked-delivered)*dp[delivered]) % MOD
        }

        if picked < n {
            nextDp := make([]int, n+1)
            for delivered := 0; delivered <= picked; delivered++ {
                nextDp[delivered] = (nextDp[delivered] +
                    (n-picked)*dp[delivered]) % MOD
            }
            dp = nextDp
        }
    }

    return dp[n]
}
```

```kotlin
class Solution {
    fun countOrders(n: Int): Int {
        val MOD = 1000000007
        var dp = LongArray(n + 1)
        dp[0] = 1

        for (picked in 0..n) {
            for (delivered in 0 until picked) {
                dp[delivered + 1] = (dp[delivered + 1] +
                    (picked - delivered) * dp[delivered]) % MOD
            }

            if (picked < n) {
                val nextDp = LongArray(n + 1)
                for (delivered in 0..picked) {
                    nextDp[delivered] = (nextDp[delivered] +
                        (n - picked) * dp[delivered]) % MOD
                }
                dp = nextDp
            }
        }

        return dp[n].toInt()
    }
}
```

```swift
class Solution {
    func countOrders(_ n: Int) -> Int {
        let MOD = 1000000007
        var dp = [Int](repeating: 0, count: n + 1)
        dp[0] = 1

        for picked in 0...n {
            for delivered in 0..<picked {
                dp[delivered + 1] = (dp[delivered + 1] +
                    (picked - delivered) * dp[delivered]) % MOD
            }

            if picked < n {
                var nextDp = [Int](repeating: 0, count: n + 1)
                for delivered in 0...picked {
                    nextDp[delivered] = (nextDp[delivered] +
                        (n - picked) * dp[delivered]) % MOD
                }
                dp = nextDp
            }
        }

        return dp[n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 5. Combinatorics

### Intuition
Think of placing pickup and delivery events into 2n slots. For each order, we place its pickup first and then choose where to put the delivery among the remaining slots. When placing order i, there are (2i - 1) slots left, and we can place the delivery in any of the `(2i - 1) * 2i / 2` ways (choosing 2 slots for the pair where pickup comes first).

### Algorithm
1. Initialize the result to 1 and start with 2n available slots.
2. For each order, compute the number of valid ways to place its pickup-delivery pair: `slots * (slots - 1) / 2`.
3. Multiply this into the result and reduce the slot count by 2.
4. Repeat until all orders are placed.
5. Return the result modulo 10^9 + 7.

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

```csharp
public class Solution {
    public int CountOrders(int n) {
        int MOD = 1000000007;
        long slots = 2 * n, res = 1;

        while (slots > 0) {
            long validChoices = slots * (slots - 1) / 2;
            res = (res * validChoices) % MOD;
            slots -= 2;
        }
        return (int)res;
    }
}
```

```go
func countOrders(n int) int {
    MOD := 1000000007
    slots := 2 * n
    res := 1

    for slots > 0 {
        validChoices := slots * (slots - 1) / 2
        res = (res * validChoices) % MOD
        slots -= 2
    }
    return res
}
```

```kotlin
class Solution {
    fun countOrders(n: Int): Int {
        val MOD = 1000000007
        var slots = 2L * n
        var res = 1L

        while (slots > 0) {
            val validChoices = slots * (slots - 1) / 2
            res = (res * validChoices) % MOD
            slots -= 2
        }
        return res.toInt()
    }
}
```

```swift
class Solution {
    func countOrders(_ n: Int) -> Int {
        let MOD = 1000000007
        var slots = 2 * n
        var res = 1

        while slots > 0 {
            let validChoices = slots * (slots - 1) / 2
            res = (res * validChoices) % MOD
            slots -= 2
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 6. Probability

### Intuition
The total number of arrangements of 2n events is (2n)!. However, for each order, the delivery must come after the pickup, which has a 1/2 probability in a random arrangement. Since we have n independent orders, the valid arrangements are `(2n)! / 2^n`.

### Algorithm
1. Initialize the result to 1.
2. Iterate through slots from 1 to 2n.
3. Multiply the result by the current slot number.
4. Whenever the slot is even (meaning we just placed a delivery), divide by 2 to account for the ordering constraint.
5. Take modulo at each step and return the final result.

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

```csharp
public class Solution {
    public int CountOrders(int n) {
        int MOD = 1000000007;
        long res = 1;

        for (int slot = 1; slot <= 2 * n; slot++) {
            res *= slot;
            if (slot % 2 == 0) {
                res /= 2;
            }
            res %= MOD;
        }
        return (int)res;
    }
}
```

```go
func countOrders(n int) int {
    MOD := 1000000007
    res := 1

    for slot := 1; slot <= 2*n; slot++ {
        res *= slot
        if slot%2 == 0 {
            res /= 2
        }
        res %= MOD
    }
    return res
}
```

```kotlin
class Solution {
    fun countOrders(n: Int): Int {
        val MOD = 1000000007
        var res = 1L

        for (slot in 1..2 * n) {
            res *= slot
            if (slot % 2 == 0) {
                res /= 2
            }
            res %= MOD
        }
        return res.toInt()
    }
}
```

```swift
class Solution {
    func countOrders(_ n: Int) -> Int {
        let MOD = 1000000007
        var res = 1

        for slot in 1...(2 * n) {
            res *= slot
            if slot % 2 == 0 {
                res /= 2
            }
            res %= MOD
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
