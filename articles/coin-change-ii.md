## 1. Recursion

### Intuition

This problem asks us to find the number of different ways to make up a given amount using unlimited coins of given denominations.

At every step, we make a choice for the current coin:
- **skip the coin** and move to the next one
- **use the coin** and reduce the remaining amount

Recursion is a natural fit here because each choice leads to a smaller subproblem.  
The recursive function represents:  
**“How many ways can we form amount `a` using coins starting from index `i`?”**

By sorting the coins and always moving forward in the list, we avoid counting the same combination in different orders.

### Algorithm

1. Sort the coin denominations to maintain a consistent order.
2. Define a recursive function `dfs(i, a)`:
   - `i` is the current coin index
   - `a` is the remaining amount
3. If the remaining amount `a` becomes `0`:
   - Return `1` because a valid combination is formed
4. If all coins are exhausted (`i` goes out of bounds):
   - Return `0` because no combination can be formed
5. Initialize a result counter `res` to `0`
6. If the current coin can be used (`a >= coins[i]`):
   - Option 1: Skip the current coin and move to the next one
   - Option 2: Use the current coin and reduce the amount (stay at the same index)
   - Add the results of both options to `res`
7. Return `res` as the number of ways for the current state
8. Start the recursion from coin index `0` with the full amount

::tabs-start

```python
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        coins.sort()

        def dfs(i, a):
            if a == 0:
                return 1
            if i >= len(coins):
                return 0

            res = 0
            if a >= coins[i]:
                res = dfs(i + 1, a)
                res += dfs(i, a - coins[i])
            return res

        return dfs(0, amount)
```

```java
public class Solution {
    public int change(int amount, int[] coins) {
        Arrays.sort(coins);

        return dfs(coins, 0, amount);
    }

    private int dfs(int[] coins, int i, int a) {
        if (a == 0) {
            return 1;
        }
        if (i >= coins.length) {
            return 0;
        }

        int res = 0;
        if (a >= coins[i]) {
            res = dfs(coins, i + 1, a);
            res += dfs(coins, i, a - coins[i]);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        sort(coins.begin(), coins.end());
        return dfs(coins, 0, amount);
    }

private:
    int dfs(const vector<int>& coins, int i, int a) {
        if (a == 0) {
            return 1;
        }
        if (i >= coins.size()) {
            return 0;
        }

        int res = 0;
        if (a >= coins[i]) {
            res = dfs(coins, i + 1, a);
            res += dfs(coins, i, a - coins[i]);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} amount
     * @param {number[]} coins
     * @return {number}
     */
    change(amount, coins) {
        coins.sort((a, b) => a - b);

        const dfs = (i, a) => {
            if (a === 0) return 1;
            if (i >= coins.length) return 0;

            let res = 0;
            if (a >= coins[i]) {
                res = dfs(i + 1, a);
                res += dfs(i, a - coins[i]);
            }
            return res;
        };

        return dfs(0, amount);
    }
}
```

```csharp
public class Solution {
    public int Change(int amount, int[] coins) {
        Array.Sort(coins);
        return Dfs(coins, 0, amount);
    }

    private int Dfs(int[] coins, int i, int a) {
        if (a == 0) {
            return 1;
        }
        if (i >= coins.Length) {
            return 0;
        }

        int res = 0;
        if (a >= coins[i]) {
            res = Dfs(coins, i + 1, a);
            res += Dfs(coins, i, a - coins[i]);
        }
        return res;
    }
}
```

```go
func change(amount int, coins []int) int {
    sort.Ints(coins)

    var dfs func(i, a int) int
    dfs = func(i, a int) int {
        if a == 0 {
            return 1
        }
        if i >= len(coins) {
            return 0
        }

        res := 0
        if a >= coins[i] {
            res = dfs(i+1, a)
            res += dfs(i, a-coins[i])
        }
        return res
    }

    return dfs(0, amount)
}
```

```kotlin
class Solution {
    fun change(amount: Int, coins: IntArray): Int {
        coins.sort()

        fun dfs(i: Int, a: Int): Int {
            if (a == 0) {
                return 1
            }
            if (i >= coins.size) {
                return 0
            }

            var res = 0
            if (a >= coins[i]) {
                res = dfs(i + 1, a)
                res += dfs(i, a - coins[i])
            }
            return res
        }

        return dfs(0, amount)
    }
}
```

```swift
class Solution {
    func change(_ amount: Int, _ coins: [Int]) -> Int {
        let coins = coins.sorted()

        func dfs(_ i: Int, _ a: Int) -> Int {
            if a == 0 {
                return 1
            }
            if i >= coins.count {
                return 0
            }

            var res = 0
            if a >= coins[i] {
                res = dfs(i + 1, a)
                res += dfs(i, a - coins[i])
            }
            return res
        }

        return dfs(0, amount)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ {max(n, \frac{a}{m})})$
- Space complexity: $O(max(n, \frac{a}{m}))$

> Where $n$ is the number of coins, $a$ is the given amount and $m$ is the minimum value among all the coins.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

This problem is about counting how many **different combinations** of coins can make up a given amount, where each coin can be used **any number of times**.

The pure recursive solution works, but it recomputes the same subproblems again and again. To optimize this, we use **top-down dynamic programming (memoization)**.

Each state is uniquely defined by:
- the current coin index `i`
- the remaining amount `a`

The function answers the question:  
**“How many ways can we form amount `a` using coins starting from index `i`?”**

By storing results for each state, we avoid repeated calculations and greatly improve efficiency.

### Algorithm

1. Sort the coin denominations to keep combinations in a fixed order.
2. Create a 2D memo table `memo` where:
   - `memo[i][a]` stores the number of ways to form amount `a` using coins from index `i` onward
3. Define a recursive function `dfs(i, a)`:
   - `i` is the current coin index
   - `a` is the remaining amount
4. If `a` becomes `0`:
   - Return `1` since a valid combination is formed
5. If all coins are exhausted (`i` is out of bounds):
   - Return `0` because no combination can be formed
6. If the current state is already computed in `memo`:
   - Return the stored value
7. Initialize the result `res` to `0`
8. If the current coin can be used (`a >= coins[i]`):
   - Option 1: Skip the current coin and move to the next one
   - Option 2: Use the current coin and reduce the amount (stay at the same index)
   - Add both results to `res`
9. Store `res` in `memo[i][a]`
10. Start the recursion from index `0` with the full amount
11. Return the final result

::tabs-start

```python
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        coins.sort()
        memo = [[-1] * (amount + 1) for _ in range(len(coins) + 1)]

        def dfs(i, a):
            if a == 0:
                return 1
            if i >= len(coins):
                return 0
            if memo[i][a] != -1:
                return memo[i][a]

            res = 0
            if a >= coins[i]:
                res = dfs(i + 1, a)
                res += dfs(i, a - coins[i])

            memo[i][a] = res
            return res

        return dfs(0, amount)
```

```java
public class Solution {
    public int change(int amount, int[] coins) {
        Arrays.sort(coins);
        int[][] memo = new int[coins.length + 1][amount + 1];
        for (int[] row : memo) {
            Arrays.fill(row, -1);
        }

        return dfs(0, amount, coins, memo);
    }

    private int dfs(int i, int a, int[] coins, int[][] memo) {
        if (a == 0) return 1;
        if (i >= coins.length) return 0;
        if (memo[i][a] != -1) return memo[i][a];

        int res = 0;
        if (a >= coins[i]) {
            res = dfs(i + 1, a, coins, memo);
            res += dfs(i, a - coins[i], coins, memo);
        }
        memo[i][a] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        sort(coins.begin(), coins.end());
        vector<vector<int>> memo(coins.size() + 1,
                            vector<int>(amount + 1, -1));

        return dfs(0, amount, coins, memo);
    }

    int dfs(int i, int a, vector<int>& coins, vector<vector<int>>& memo) {
        if (a == 0) return 1;
        if (i >= coins.size()) return 0;
        if (memo[i][a] != -1) return memo[i][a];

        int res = 0;
        if (a >= coins[i]) {
            res = dfs(i + 1, a, coins, memo);
            res += dfs(i, a - coins[i], coins, memo);
        }
        memo[i][a] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} amount
     * @param {number[]} coins
     * @return {number}
     */
    change(amount, coins) {
        coins.sort((a, b) => a - b);
        let memo = Array.from({ length: coins.length + 1 }, () =>
            Array(amount + 1).fill(-1),
        );

        const dfs = (i, a) => {
            if (a === 0) return 1;
            if (i >= coins.length) return 0;
            if (memo[i][a] !== -1) return memo[i][a];

            let res = 0;
            if (a >= coins[i]) {
                res = dfs(i + 1, a);
                res += dfs(i, a - coins[i]);
            }
            memo[i][a] = res;
            return res;
        };

        return dfs(0, amount);
    }
}
```

```csharp
public class Solution {
    public int Change(int amount, int[] coins) {
        Array.Sort(coins);
        int[,] memo = new int[coins.Length + 1, amount + 1];
        for (int i = 0; i <= coins.Length; i++) {
            for (int j = 0; j <= amount; j++) {
                memo[i, j] = -1;
            }
        }

        return Dfs(0, amount, coins, memo);
    }

    private int Dfs(int i, int a, int[] coins, int[,] memo) {
        if (a == 0) return 1;
        if (i >= coins.Length) return 0;
        if (memo[i, a] != -1) return memo[i, a];

        int res = 0;
        if (a >= coins[i]) {
            res = Dfs(i + 1, a, coins, memo);
            res += Dfs(i, a - coins[i], coins, memo);
        }
        memo[i, a] = res;
        return res;
    }
}
```

```go
func change(amount int, coins []int) int {
    sort.Ints(coins)
    memo := make([][]int, len(coins) + 1)
    for i := range memo {
        memo[i] = make([]int, amount + 1)
        for j := range memo[i] {
            memo[i][j] = -1
        }
    }

    var dfs func(i, a int) int
    dfs = func(i, a int) int {
        if a == 0 {
            return 1
        }
        if i >= len(coins) {
            return 0
        }
        if memo[i][a] != -1 {
            return memo[i][a]
        }

        res := 0
        if a >= coins[i] {
            res = dfs(i+1, a)
            res += dfs(i, a-coins[i])
        }
        memo[i][a] = res
        return res
    }

    return dfs(0, amount)
}
```

```kotlin
class Solution {
    fun change(amount: Int, coins: IntArray): Int {
        coins.sort()
        val memo = Array(coins.size + 1) { IntArray(amount + 1) { -1 } }

        fun dfs(i: Int, a: Int): Int {
            if (a == 0) {
                return 1
            }
            if (i >= coins.size) {
                return 0
            }
            if (memo[i][a] != -1) return memo[i][a]

            var res = 0
            if (a >= coins[i]) {
                res = dfs(i + 1, a)
                res += dfs(i, a - coins[i])
            }
            memo[i][a] = res
            return res
        }

        return dfs(0, amount)
    }
}
```

```swift
class Solution {
    func change(_ amount: Int, _ coins: [Int]) -> Int {
        let coins = coins.sorted()
        var memo = Array(repeating: Array(repeating: -1, count: amount + 1), count: coins.count + 1)

        func dfs(_ i: Int, _ a: Int) -> Int {
            if a == 0 {
                return 1
            }
            if i >= coins.count {
                return 0
            }
            if memo[i][a] != -1 {
                return memo[i][a]
            }

            var res = 0
            if a >= coins[i] {
                res = dfs(i + 1, a)
                res += dfs(i, a - coins[i])
            }

            memo[i][a] = res
            return res
        }

        return dfs(0, amount)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * a)$
- Space complexity: $O(n * a)$

> Where $n$ is the number of coins and $a$ is the given amount.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

This problem asks for the number of different ways to make up a given amount using unlimited coins, where **order does not matter**.

Instead of using recursion, we can solve this using **bottom-up dynamic programming**, where we build the answer step by step using a table.

The key idea is to define a state that represents:
- how many ways we can form a certain amount
- using coins starting from a particular index

By filling the DP table from the base cases upward, we ensure that all required subproblems are already solved when needed.

### Algorithm

1. Sort the coin denominations to maintain a consistent order and avoid duplicate combinations.
2. Let `n` be the number of coins.
3. Create a 2D DP table `dp` of size `(n + 1) x (amount + 1)`:
   - `dp[i][a]` represents the number of ways to form amount `a` using coins from index `i` onward
4. Initialize the base case:
   - For any `i`, set `dp[i][0] = 1` since there is exactly one way to make amount `0` (choose no coins)
5. Iterate through the coins in reverse order:
6. For each coin index `i` and for each amount `a` from `0` to `amount`:
   - If the current coin can be used (`a >= coins[i]`):
     - Option 1: Skip the current coin -> `dp[i + 1][a]`
     - Option 2: Use the current coin -> `dp[i][a - coins[i]]`
     - Add both options to get `dp[i][a]`
7. After filling the table, the answer is stored in `dp[0][amount]`
8. Return `dp[0][amount]`

::tabs-start

```python
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        n = len(coins)
        coins.sort()
        dp = [[0] * (amount + 1) for _ in range(n + 1)]

        for i in range(n + 1):
            dp[i][0] = 1

        for i in range(n - 1, -1, -1):
            for a in range(amount + 1):
                if a >= coins[i]:
                    dp[i][a] = dp[i + 1][a]
                    dp[i][a] += dp[i][a - coins[i]]

        return dp[0][amount]
```

```java
public class Solution {
    public int change(int amount, int[] coins) {
        int n = coins.length;
        Arrays.sort(coins);
        int[][] dp = new int[n + 1][amount + 1];

        for (int i = 0; i <= n; i++) {
            dp[i][0] = 1;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int a = 0; a <= amount; a++) {
                if (a >= coins[i]) {
                    dp[i][a] = dp[i + 1][a];
                    dp[i][a] += dp[i][a - coins[i]];
                }
            }
        }

        return dp[0][amount];
    }
}
```

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        sort(coins.begin(), coins.end());
        vector<vector<uint>> dp(n + 1, vector<uint>(amount + 1, 0));

        for (int i = 0; i <= n; i++) {
            dp[i][0] = 1;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int a = 0; a <= amount; a++) {
                if (a >= coins[i]) {
                    dp[i][a] = dp[i + 1][a];
                    dp[i][a] += dp[i][a - coins[i]];
                }
            }
        }

        return dp[0][amount];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} amount
     * @param {number[]} coins
     * @return {number}
     */
    change(amount, coins) {
        coins.sort((a, b) => a - b);
        const n = coins.length;
        const dp = Array.from({ length: n + 1 }, () =>
            Array(amount + 1).fill(0),
        );

        for (let i = 0; i <= n; i++) {
            dp[i][0] = 1;
        }

        for (let i = n - 1; i >= 0; i--) {
            for (let a = 0; a <= amount; a++) {
                if (a >= coins[i]) {
                    dp[i][a] = dp[i + 1][a];
                    dp[i][a] += dp[i][a - coins[i]];
                }
            }
        }

        return dp[0][amount];
    }
}
```

```csharp
public class Solution {
    public int Change(int amount, int[] coins) {
        int n = coins.Length;
        Array.Sort(coins);
        int[,] dp = new int[n + 1, amount + 1];

        for (int i = 0; i <= n; i++) {
            dp[i, 0] = 1;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int a = 0; a <= amount; a++) {
                if (a >= coins[i]) {
                    dp[i, a] = dp[i + 1, a];
                    dp[i, a] += dp[i, a - coins[i]];
                }
            }
        }

        return dp[0, amount];
    }
}
```

```go
func change(amount int, coins []int) int {
    n := len(coins)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, amount+1)
    }

    for i := 0; i <= n; i++ {
        dp[i][0] = 1
    }

    for i := n - 1; i >= 0; i-- {
        for a := 0; a <= amount; a++ {
            if a >= coins[i] {
                dp[i][a] = dp[i+1][a]
                dp[i][a] += dp[i][a-coins[i]]
            } else {
                dp[i][a] = dp[i+1][a]
            }
        }
    }

    return dp[0][amount]
}
```

```kotlin
class Solution {
    fun change(amount: Int, coins: IntArray): Int {
        val n = coins.size
        val dp = Array(n + 1) { IntArray(amount + 1) }

        for (i in 0..n) {
            dp[i][0] = 1
        }

        for (i in n - 1 downTo 0) {
            for (a in 0..amount) {
                if (a >= coins[i]) {
                    dp[i][a] = dp[i + 1][a]
                    dp[i][a] += dp[i][a - coins[i]]
                } else {
                    dp[i][a] = dp[i + 1][a]
                }
            }
        }

        return dp[0][amount]
    }
}
```

```swift
class Solution {
    func change(_ amount: Int, _ coins: [Int]) -> Int {
        let n = coins.count
        let sortedCoins = coins.sorted()
        var dp = Array(
            repeating: Array(repeating: 0, count: amount + 1),
            count: n + 1
        )

        for i in 0...n {
            dp[i][0] = 1
        }

        for i in stride(from: n - 1, through: 0, by: -1) {
            for a in 0...amount {
                let base = dp[i + 1][a]
                if a >= sortedCoins[i] {
                    let addend = dp[i][a - sortedCoins[i]]
                    if base > Int.max - addend {
                        dp[i][a] = 0
                    } else {
                        dp[i][a] = base + addend
                    }
                } else {
                    dp[i][a] = base
                }
            }
        }

        return dp[0][amount]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * a)$
- Space complexity: $O(n * a)$

> Where $n$ is the number of coins and $a$ is the given amount.

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

This problem asks for the number of different combinations of coins that can make up a given amount, where each coin can be used unlimited times and the order of coins does not matter.

In the bottom-up dynamic programming approach, we used a 2D table to store results for each coin index and amount. However, each row only depends on:
- the row below it (skipping the coin)
- the current row itself (using the same coin)

Because of this, we can **optimize the space** and store only one 1D array at a time, updating it carefully to preserve correctness.

### Algorithm

1. Create a 1D array `dp` of size `amount + 1`:
   - `dp[a]` represents the number of ways to form amount `a` using coins processed so far
2. Initialize `dp[0] = 1` since there is exactly one way to form amount `0`
3. Iterate through the coins in reverse order:
4. For each coin:
   - Create a new array `nextDP` to store updated results
   - Set `nextDP[0] = 1` as the base case
5. For each amount `a` from `1` to `amount`:
   - First copy the value from `dp[a]` (skipping the current coin)
   - If the current coin can be used (`a - coins[i] >= 0`):
     - Add `nextDP[a - coins[i]]` (using the current coin again)
6. Replace `dp` with `nextDP` after processing the current coin
7. After all coins are processed, `dp[amount]` contains the total number of combinations
8. Return `dp[amount]`

::tabs-start

```python
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        dp = [0] * (amount + 1)
        dp[0] = 1
        for i in range(len(coins) - 1, -1, -1):
            nextDP = [0] * (amount + 1)
            nextDP[0] = 1

            for a in range(1, amount + 1):
                nextDP[a] = dp[a]
                if a - coins[i] >= 0:
                    nextDP[a] += nextDP[a - coins[i]]
            dp = nextDP
        return dp[amount]
```

```java
public class Solution {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int i = coins.length - 1; i >= 0; i--) {
            int[] nextDP = new int[amount + 1];
            nextDP[0] = 1;

            for (int a = 1; a <= amount; a++) {
                nextDP[a] = dp[a];
                if (a - coins[i] >= 0) {
                    nextDP[a] += nextDP[a - coins[i]];
                }
            }
            dp = nextDP;
        }
        return dp[amount];
    }
}
```

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<uint> dp(amount + 1, 0);
        dp[0] = 1;
        for (int i = coins.size() - 1; i >= 0; i--) {
            vector<uint> nextDP(amount + 1, 0);
            nextDP[0] = 1;

            for (int a = 1; a <= amount; a++) {
                nextDP[a] = dp[a];
                if (a - coins[i] >= 0) {
                    nextDP[a] += nextDP[a - coins[i]];
                }
            }
            dp = nextDP;
        }
        return dp[amount];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} amount
     * @param {number[]} coins
     * @return {number}
     */
    change(amount, coins) {
        let dp = new Array(amount + 1).fill(0);
        dp[0] = 1;
        for (let i = coins.length - 1; i >= 0; i--) {
            const nextDP = new Array(amount + 1).fill(0);
            nextDP[0] = 1;

            for (let a = 1; a <= amount; a++) {
                nextDP[a] = dp[a];
                if (a - coins[i] >= 0) {
                    nextDP[a] += nextDP[a - coins[i]];
                }
            }
            dp = nextDP;
        }
        return dp[amount];
    }
}
```

```csharp
public class Solution {
    public int Change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int i = coins.Length - 1; i >= 0; i--) {
            int[] nextDP = new int[amount + 1];
            nextDP[0] = 1;

            for (int a = 1; a <= amount; a++) {
                nextDP[a] = dp[a];
                if (a - coins[i] >= 0) {
                    nextDP[a] += nextDP[a - coins[i]];
                }
            }
            dp = nextDP;
        }
        return dp[amount];
    }
}
```

```go
func change(amount int, coins []int) int {
    dp := make([]int, amount+1)
    dp[0] = 1

    for i := len(coins) - 1; i >= 0; i-- {
        nextDP := make([]int, amount+1)
        nextDP[0] = 1

        for a := 1; a <= amount; a++ {
            nextDP[a] = dp[a]
            if a-coins[i] >= 0 {
                nextDP[a] += nextDP[a-coins[i]]
            }
        }
        dp = nextDP
    }

    return dp[amount]
}
```

```kotlin
class Solution {
    fun change(amount: Int, coins: IntArray): Int {
        val dp = IntArray(amount + 1)
        dp[0] = 1

        for (i in coins.size - 1 downTo 0) {
            val nextDP = IntArray(amount + 1)
            nextDP[0] = 1

            for (a in 1..amount) {
                nextDP[a] = dp[a]
                if (a - coins[i] >= 0) {
                    nextDP[a] += nextDP[a - coins[i]]
                }
            }
            System.arraycopy(nextDP, 0, dp, 0, amount + 1)
        }

        return dp[amount]
    }
}
```

```swift
class Solution {
    func change(_ amount: Int, _ coins: [Int]) -> Int {
        var dp = [Int](repeating: 0, count: amount + 1)
        dp[0] = 1

        for i in stride(from: coins.count - 1, through: 0, by: -1) {
            var nextDP = [Int](repeating: 0, count: amount + 1)
            nextDP[0] = 1

            for a in 1..<(amount + 1) {
                nextDP[a] = dp[a]
                if a - coins[i] >= 0 {
                    let addend = nextDP[a - coins[i]]
                    if nextDP[a] > Int.max - addend {
                        nextDP[a] = 0
                    } else {
                        nextDP[a] += addend
                    }
                }
            }

            dp = nextDP
        }

        return dp[amount]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * a)$
- Space complexity: $O(a)$

> Where $n$ is the number of coins and $a$ is the given amount.

---

## 5. Dynamic Programming (Optimal)

### Intuition

We need to count how many **different combinations** of coins can make up a given amount, where:
- each coin can be used unlimited times
- the order of coins does **not** matter

From earlier dynamic programming approaches, we observe that for each coin, the number of ways to form an amount only depends on:
- the number of ways to form the same amount without using the coin
- the number of ways to form a smaller amount using the current coin

Because of this, we can use a **single 1D DP array** and update it in place, achieving the most space-efficient solution.

The DP array always represents the number of ways to form each amount using the coins processed so far.

### Algorithm

1. Create a 1D array `dp` of size `amount + 1`:
   - `dp[a]` represents the number of ways to form amount `a`
2. Initialize `dp[0] = 1` since there is exactly one way to form amount `0`
3. Iterate through the coins in reverse order:
4. For each coin, iterate through all amounts from `1` to `amount`:
   - If the current coin value is less than or equal to the amount:
     - Add `dp[a - coin]` to `dp[a]`
5. After processing all coins, `dp[amount]` holds the total number of combinations
6. Return `dp[amount]`

::tabs-start

```python
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        dp = [0] * (amount + 1)
        dp[0] = 1
        for i in range(len(coins) - 1, -1, -1):
            for a in range(1, amount + 1):
                dp[a] += dp[a - coins[i]] if coins[i] <= a else 0
        return dp[amount]
```

```java
public class Solution {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int i = coins.length - 1; i >= 0; i--)
            for (int a = 1; a <= amount; a++)
                dp[a] = dp[a] + (coins[i] <= a ? dp[a - coins[i]] : 0);
        return dp[amount];
    }
}
```

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<uint> dp(amount + 1, 0);
        dp[0] = 1;
        for (int i = coins.size() - 1; i >= 0; i--) {
            for (int a = 1; a <= amount; a++) {
                dp[a] = dp[a] + (coins[i] <= a ? dp[a - coins[i]] : 0);
            }
        }
        return dp[amount];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} amount
     * @param {number[]} coins
     * @return {number}
     */
    change(amount, coins) {
        const dp = new Array(amount + 1).fill(0);
        dp[0] = 1;
        for (let i = coins.length - 1; i >= 0; i--) {
            for (let a = 1; a <= amount; a++) {
                dp[a] += coins[i] <= a ? dp[a - coins[i]] : 0;
            }
        }
        return dp[amount];
    }
}
```

```csharp
public class Solution {
    public int Change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int i = coins.Length - 1; i >= 0; i--) {
            for (int a = 1; a <= amount; a++) {
                dp[a] += (coins[i] <= a ? dp[a - coins[i]] : 0);
            }
        }
        return dp[amount];
    }
}
```

```go
func change(amount int, coins []int) int {
    dp := make([]int, amount+1)
    dp[0] = 1

    for i := len(coins) - 1; i >= 0; i-- {
        for a := 1; a <= amount; a++ {
            if a-coins[i] >= 0 {
                dp[a] += dp[a - coins[i]]
            }
        }
    }

    return dp[amount]
}
```

```kotlin
class Solution {
    fun change(amount: Int, coins: IntArray): Int {
        val dp = IntArray(amount + 1)
        dp[0] = 1

        for (i in coins.size - 1 downTo 0) {
            for (a in 1..amount) {
                if (a - coins[i] >= 0) {
                    dp[a] += dp[a - coins[i]]
                }
            }
        }

        return dp[amount]
    }
}
```

```swift
class Solution {
    func change(_ amount: Int, _ coins: [Int]) -> Int {
        var dp = [Int](repeating: 0, count: amount + 1)
        dp[0] = 1

        for i in stride(from: coins.count - 1, through: 0, by: -1) {
            for a in 1..<(amount + 1) {
                if coins[i] <= a {
                    let addend = dp[a - coins[i]]
                    if dp[a] > Int.max - addend {
                        dp[a] = 0
                    } else {
                        dp[a] += addend
                    }
                }
            }
        }

        return dp[amount]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * a)$
- Space complexity: $O(a)$

> Where $n$ is the number of coins and $a$ is the given amount.
