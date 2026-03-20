## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Recursion** - Foundation for exploring all buy/sell decision combinations
- **Dynamic Programming (Memoization)** - Optimizes recursion by caching computed states
- **Dynamic Programming (Tabulation)** - Builds solutions iteratively from base cases
- **Greedy Algorithms** - Key insight that capturing every upward price movement is optimal

---

## 1. Recursion

### Intuition

At each day, we have a choice: if we are not holding stock, we can either buy or skip. If we are holding stock, we can either sell or skip. We want to maximize profit by exploring all possible combinations of buy and sell decisions. This naturally leads to a recursive approach where we try both options at each step and return the maximum profit.

### Algorithm

1. Define a recursive function `rec(i, bought)` where `i` is the current day and `bought` indicates if we are holding stock.
2. Base case: if we have processed all days, return `0`.
3. At each day, we always have the option to skip (do nothing).
4. If we are holding stock (`bought = true`), we can sell at the current price and add it to our profit.
5. If we are not holding stock (`bought = false`), we can buy at the current price (subtract it from profit).
6. Return the maximum of all possible choices.


<br>

::tabs-start

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        def rec(i, bought):
            if i == len(prices):
                return 0
            res = rec(i + 1, bought)
            if bought:
                res = max(res, prices[i] + rec(i + 1, False))
            else:
                res = max(res, -prices[i] + rec(i + 1, True))
            return res
        return rec(0, False)
```

```java
public class Solution {
    public int maxProfit(int[] prices) {
        return rec(prices, 0, false);
    }

    private int rec(int[] prices, int i, boolean bought) {
        if (i == prices.length) {
            return 0;
        }
        int res = rec(prices, i + 1, bought);
        if (bought) {
            res = Math.max(res, prices[i] + rec(prices, i + 1, false));
        } else {
            res = Math.max(res, -prices[i] + rec(prices, i + 1, true));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        return rec(prices, 0, false);
    }

private:
    int rec(vector<int>& prices, int i, bool bought) {
        if (i == prices.size()) {
            return 0;
        }
        int res = rec(prices, i + 1, bought);
        if (bought) {
            res = max(res, prices[i] + rec(prices, i + 1, false));
        } else {
            res = max(res, -prices[i] + rec(prices, i + 1, true));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        const rec = (i, bought) => {
            if (i === prices.length) {
                return 0;
            }
            let res = rec(i + 1, bought);
            if (bought) {
                res = Math.max(res, prices[i] + rec(i + 1, false));
            } else {
                res = Math.max(res, -prices[i] + rec(i + 1, true));
            }
            return res;
        };
        return rec(0, false);
    }
}
```

```csharp
public class Solution {
    public int MaxProfit(int[] prices) {
        return Rec(prices, 0, false);
    }

    private int Rec(int[] prices, int i, bool bought) {
        if (i == prices.Length) {
            return 0;
        }

        int res = Rec(prices, i + 1, bought);

        if (bought) {
            res = Math.Max(res, prices[i] + Rec(prices, i + 1, false));
        } else {
            res = Math.Max(res, -prices[i] + Rec(prices, i + 1, true));
        }

        return res;
    }
}
```

```go
func maxProfit(prices []int) int {
    var rec func(i int, bought bool) int
    rec = func(i int, bought bool) int {
        if i == len(prices) {
            return 0
        }
        res := rec(i+1, bought)
        if bought {
            if prices[i]+rec(i+1, false) > res {
                res = prices[i] + rec(i+1, false)
            }
        } else {
            if -prices[i]+rec(i+1, true) > res {
                res = -prices[i] + rec(i+1, true)
            }
        }
        return res
    }
    return rec(0, false)
}
```

```kotlin
class Solution {
    fun maxProfit(prices: IntArray): Int {
        fun rec(i: Int, bought: Boolean): Int {
            if (i == prices.size) return 0
            var res = rec(i + 1, bought)
            if (bought) {
                res = maxOf(res, prices[i] + rec(i + 1, false))
            } else {
                res = maxOf(res, -prices[i] + rec(i + 1, true))
            }
            return res
        }
        return rec(0, false)
    }
}
```

```swift
class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        func rec(_ i: Int, _ bought: Bool) -> Int {
            if i == prices.count { return 0 }
            var res = rec(i + 1, bought)
            if bought {
                res = max(res, prices[i] + rec(i + 1, false))
            } else {
                res = max(res, -prices[i] + rec(i + 1, true))
            }
            return res
        }
        return rec(0, false)
    }
}
```

```rust
impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        fn rec(prices: &[i32], i: usize, bought: bool) -> i32 {
            if i == prices.len() {
                return 0;
            }
            let mut res = rec(prices, i + 1, bought);
            if bought {
                res = res.max(prices[i] + rec(prices, i + 1, false));
            } else {
                res = res.max(-prices[i] + rec(prices, i + 1, true));
            }
            res
        }
        rec(&prices, 0, false)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution recalculates the same states multiple times. For example, the state (day 3, not holding) might be reached through different paths. By storing computed results in a memoization table, we avoid redundant work. Each unique state (day, holding_status) is computed only once.

### Algorithm

1. Create a memoization table (dictionary or 2D array) to store results for each state.
2. Define a recursive function `rec(i, bought)` that first checks if the result is already cached.
3. If cached, return the stored result immediately.
4. Otherwise, compute the result by considering skip, buy, or sell options.
5. Store the result in the cache before returning.
6. Start the recursion from day `0` with no stock held.


<br>

::tabs-start

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        dp = {}

        def rec(i, bought):
            if i == len(prices):
                return 0
            if (i, bought) in dp:
                return dp[(i, bought)]
            res = rec(i + 1, bought)
            if bought:
                res = max(res, prices[i] + rec(i + 1, False))
            else:
                res = max(res, -prices[i] + rec(i + 1, True))
            dp[(i, bought)] = res
            return res

        return rec(0, False)
```

```java
public class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int[][] dp = new int[n][2];
        for (int i = 0; i < n; i++) {
            dp[i][0] = -1;
            dp[i][1] = -1;
        }
        return rec(prices, 0, 0, dp);
    }

    private int rec(int[] prices, int i, int bought, int[][] dp) {
        if (i == prices.length) {
            return 0;
        }
        if (dp[i][bought] != -1) {
            return dp[i][bought];
        }
        int res = rec(prices, i + 1, bought, dp);
        if (bought == 1) {
            res = Math.max(res, prices[i] + rec(prices, i + 1, 0, dp));
        } else {
            res = Math.max(res, -prices[i] + rec(prices, i + 1, 1, dp));
        }
        dp[i][bought] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> dp(n, vector<int>(2, -1));
        return rec(prices, 0, 0, dp);
    }

private:
    int rec(vector<int>& prices, int i, int bought, vector<vector<int>>& dp) {
        if (i == prices.size()) {
            return 0;
        }
        if (dp[i][bought] != -1) {
            return dp[i][bought];
        }
        int res = rec(prices, i + 1, bought, dp);
        if (bought == 1) {
            res = max(res, prices[i] + rec(prices, i + 1, 0, dp));
        } else {
            res = max(res, -prices[i] + rec(prices, i + 1, 1, dp));
        }
        dp[i][bought] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        const n = prices.length;
        const dp = Array.from({ length: n }, () => Array(2).fill(-1));

        const rec = (i, bought) => {
            if (i === n) {
                return 0;
            }
            if (dp[i][bought] !== -1) {
                return dp[i][bought];
            }
            let res = rec(i + 1, bought);
            if (bought) {
                res = Math.max(res, prices[i] + rec(i + 1, 0));
            } else {
                res = Math.max(res, -prices[i] + rec(i + 1, 1));
            }
            dp[i][bought] = res;
            return res;
        };

        return rec(0, 0);
    }
}
```

```csharp
public class Solution {
    public int MaxProfit(int[] prices) {
        int n = prices.Length;
        int[,] dp = new int[n, 2];

        for (int i = 0; i < n; i++) {
            dp[i, 0] = -1;
            dp[i, 1] = -1;
        }

        return Rec(prices, 0, 0, dp);
    }

    private int Rec(int[] prices, int i, int bought, int[,] dp) {
        if (i == prices.Length) {
            return 0;
        }

        if (dp[i, bought] != -1) {
            return dp[i, bought];
        }

        int res = Rec(prices, i + 1, bought, dp);

        if (bought == 1) {
            res = Math.Max(res, prices[i] + Rec(prices, i + 1, 0, dp));
        } else {
            res = Math.Max(res, -prices[i] + Rec(prices, i + 1, 1, dp));
        }

        dp[i, bought] = res;
        return res;
    }
}
```

```go
func maxProfit(prices []int) int {
    n := len(prices)
    dp := make([][2]int, n)
    for i := range dp {
        dp[i][0], dp[i][1] = -1, -1
    }

    var rec func(i, bought int) int
    rec = func(i, bought int) int {
        if i == n {
            return 0
        }
        if dp[i][bought] != -1 {
            return dp[i][bought]
        }
        res := rec(i+1, bought)
        if bought == 1 {
            if prices[i]+rec(i+1, 0) > res {
                res = prices[i] + rec(i+1, 0)
            }
        } else {
            if -prices[i]+rec(i+1, 1) > res {
                res = -prices[i] + rec(i+1, 1)
            }
        }
        dp[i][bought] = res
        return res
    }
    return rec(0, 0)
}
```

```kotlin
class Solution {
    fun maxProfit(prices: IntArray): Int {
        val n = prices.size
        val dp = Array(n) { IntArray(2) { -1 } }

        fun rec(i: Int, bought: Int): Int {
            if (i == n) return 0
            if (dp[i][bought] != -1) return dp[i][bought]
            var res = rec(i + 1, bought)
            if (bought == 1) {
                res = maxOf(res, prices[i] + rec(i + 1, 0))
            } else {
                res = maxOf(res, -prices[i] + rec(i + 1, 1))
            }
            dp[i][bought] = res
            return res
        }
        return rec(0, 0)
    }
}
```

```swift
class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        let n = prices.count
        var dp = [[Int]](repeating: [Int](repeating: -1, count: 2), count: n)

        func rec(_ i: Int, _ bought: Int) -> Int {
            if i == n { return 0 }
            if dp[i][bought] != -1 { return dp[i][bought] }
            var res = rec(i + 1, bought)
            if bought == 1 {
                res = max(res, prices[i] + rec(i + 1, 0))
            } else {
                res = max(res, -prices[i] + rec(i + 1, 1))
            }
            dp[i][bought] = res
            return res
        }
        return rec(0, 0)
    }
}
```

```rust
impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        let n = prices.len();
        let mut dp = vec![[-1i32; 2]; n];

        fn rec(prices: &[i32], i: usize, bought: usize, dp: &mut Vec<[i32; 2]>) -> i32 {
            if i == prices.len() {
                return 0;
            }
            if dp[i][bought] != -1 {
                return dp[i][bought];
            }
            let mut res = rec(prices, i + 1, bought, dp);
            if bought == 1 {
                res = res.max(prices[i] + rec(prices, i + 1, 0, dp));
            } else {
                res = res.max(-prices[i] + rec(prices, i + 1, 1, dp));
            }
            dp[i][bought] = res;
            res
        }

        rec(&prices, 0, 0, &mut dp)
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

Instead of solving recursively from day `0` forward, we can build the solution iteratively from the last day backward. At each day, we compute the maximum profit for both states (holding and not holding stock) using the already-computed values for the next day. This eliminates recursion overhead.

### Algorithm

1. Create a 2D `dp` array where `dp[i][0]` is the max profit from day `i` when we can buy, and `dp[i][1]` is the max profit when we can sell.
2. Initialize the base case: `dp[n][0] = dp[n][1] = 0` (no profit after the last day).
3. Iterate from the last day to the first day.
4. For each day, compute `dp[i][0]` as the max of skipping or buying (subtract price, transition to sell state).
5. Compute `dp[i][1]` as the max of skipping or selling (add price, transition to buy state).
6. Return `dp[0][0]` as we start without holding any stock.


<br>

::tabs-start

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        dp = [[0] * 2 for _ in range(n + 1)]

        for i in range(n - 1, -1, -1):
            dp[i][0] = max(dp[i + 1][0], -prices[i] + dp[i + 1][1])
            dp[i][1] = max(dp[i + 1][1], prices[i] + dp[i + 1][0])

        return dp[0][0]
```

```java
public class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int[][] dp = new int[n + 1][2];

        for (int i = n - 1; i >= 0; i--) {
            dp[i][0] = Math.max(dp[i + 1][0], -prices[i] + dp[i + 1][1]);
            dp[i][1] = Math.max(dp[i + 1][1], prices[i] + dp[i + 1][0]);
        }

        return dp[0][0];
    }
}
```

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, 0));

        for (int i = n - 1; i >= 0; i--) {
            dp[i][0] = max(dp[i + 1][0], -prices[i] + dp[i + 1][1]);
            dp[i][1] = max(dp[i + 1][1], prices[i] + dp[i + 1][0]);
        }

        return dp[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        const n = prices.length;
        const dp = Array.from({ length: n + 1 }, () => Array(2).fill(0));

        for (let i = n - 1; i >= 0; i--) {
            dp[i][0] = Math.max(dp[i + 1][0], -prices[i] + dp[i + 1][1]);
            dp[i][1] = Math.max(dp[i + 1][1], prices[i] + dp[i + 1][0]);
        }

        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public int MaxProfit(int[] prices) {
        int n = prices.Length;
        int[,] dp = new int[n + 1, 2];

        for (int i = n - 1; i >= 0; i--) {
            dp[i, 0] = Math.Max(dp[i + 1, 0], -prices[i] + dp[i + 1, 1]);
            dp[i, 1] = Math.Max(dp[i + 1, 1], prices[i] + dp[i + 1, 0]);
        }

        return dp[0, 0];
    }
}
```

```go
func maxProfit(prices []int) int {
    n := len(prices)
    dp := make([][2]int, n+1)

    for i := n - 1; i >= 0; i-- {
        dp[i][0] = max(dp[i+1][0], -prices[i]+dp[i+1][1])
        dp[i][1] = max(dp[i+1][1], prices[i]+dp[i+1][0])
    }

    return dp[0][0]
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxProfit(prices: IntArray): Int {
        val n = prices.size
        val dp = Array(n + 1) { IntArray(2) }

        for (i in n - 1 downTo 0) {
            dp[i][0] = maxOf(dp[i + 1][0], -prices[i] + dp[i + 1][1])
            dp[i][1] = maxOf(dp[i + 1][1], prices[i] + dp[i + 1][0])
        }

        return dp[0][0]
    }
}
```

```swift
class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        let n = prices.count
        var dp = [[Int]](repeating: [0, 0], count: n + 1)

        for i in stride(from: n - 1, through: 0, by: -1) {
            dp[i][0] = max(dp[i + 1][0], -prices[i] + dp[i + 1][1])
            dp[i][1] = max(dp[i + 1][1], prices[i] + dp[i + 1][0])
        }

        return dp[0][0]
    }
}
```

```rust
impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        let n = prices.len();
        let mut dp = vec![[0i32; 2]; n + 1];

        for i in (0..n).rev() {
            dp[i][0] = dp[i + 1][0].max(-prices[i] + dp[i + 1][1]);
            dp[i][1] = dp[i + 1][1].max(prices[i] + dp[i + 1][0]);
        }

        dp[0][0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

Looking at the bottom-up solution, we notice that to compute the values for day `i`, we only need the values from day `i+1`. We do not need the entire `dp` array. This means we can reduce space from O(n) to O(1) by using just four variables to track the current and next day's states.

### Algorithm

1. Initialize four variables: `nextBuy`, `nextSell` (for day `i+1`), and `curBuy`, `curSell` (for day `i`).
2. Start with all variables set to `0`.
3. Iterate from the last day to the first day.
4. Compute `curBuy` as the max of skipping (`nextBuy`) or buying (`-price + nextSell`).
5. Compute `curSell` as the max of skipping (`nextSell`) or selling (`price + nextBuy`).
6. Update next variables with current values for the next iteration.
7. Return `curBuy` as the final answer.


<br>

::tabs-start

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        next_buy = next_sell = 0
        cur_buy = cur_sell = 0

        for i in range(n - 1, -1, -1):
            cur_buy = max(next_buy, -prices[i] + next_sell)
            cur_sell = max(next_sell, prices[i] + next_buy)
            next_buy = cur_buy
            next_sell = cur_sell

        return cur_buy
```

```java
public class Solution {
    public int maxProfit(int[] prices) {
        int nextBuy = 0, nextSell = 0;
        int curBuy = 0, curSell = 0;

        for (int i = prices.length - 1; i >= 0; i--) {
            curBuy = Math.max(nextBuy, -prices[i] + nextSell);
            curSell = Math.max(nextSell, prices[i] + nextBuy);
            nextBuy = curBuy;
            nextSell = curSell;
        }

        return curBuy;
    }
}
```

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int nextBuy = 0, nextSell = 0;
        int curBuy = 0, curSell = 0;

        for (int i = prices.size() - 1; i >= 0; i--) {
            curBuy = max(nextBuy, -prices[i] + nextSell);
            curSell = max(nextSell, prices[i] + nextBuy);
            nextBuy = curBuy;
            nextSell = curSell;
        }

        return curBuy;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        let nextBuy = 0,
            nextSell = 0;
        let curBuy = 0,
            curSell = 0;

        for (let i = prices.length - 1; i >= 0; i--) {
            curBuy = Math.max(nextBuy, -prices[i] + nextSell);
            curSell = Math.max(nextSell, prices[i] + nextBuy);
            nextBuy = curBuy;
            nextSell = curSell;
        }

        return curBuy;
    }
}
```

```csharp
public class Solution {
    public int MaxProfit(int[] prices) {
        int nextBuy = 0, nextSell = 0;
        int curBuy = 0, curSell = 0;

        for (int i = prices.Length - 1; i >= 0; i--) {
            curBuy = Math.Max(nextBuy, -prices[i] + nextSell);
            curSell = Math.Max(nextSell, prices[i] + nextBuy);
            nextBuy = curBuy;
            nextSell = curSell;
        }

        return curBuy;
    }
}
```

```go
func maxProfit(prices []int) int {
    nextBuy, nextSell := 0, 0
    curBuy, curSell := 0, 0

    for i := len(prices) - 1; i >= 0; i-- {
        curBuy = max(nextBuy, -prices[i]+nextSell)
        curSell = max(nextSell, prices[i]+nextBuy)
        nextBuy = curBuy
        nextSell = curSell
    }

    return curBuy
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxProfit(prices: IntArray): Int {
        var nextBuy = 0
        var nextSell = 0
        var curBuy = 0
        var curSell = 0

        for (i in prices.size - 1 downTo 0) {
            curBuy = maxOf(nextBuy, -prices[i] + nextSell)
            curSell = maxOf(nextSell, prices[i] + nextBuy)
            nextBuy = curBuy
            nextSell = curSell
        }

        return curBuy
    }
}
```

```swift
class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        var nextBuy = 0, nextSell = 0
        var curBuy = 0, curSell = 0

        for i in stride(from: prices.count - 1, through: 0, by: -1) {
            curBuy = max(nextBuy, -prices[i] + nextSell)
            curSell = max(nextSell, prices[i] + nextBuy)
            nextBuy = curBuy
            nextSell = curSell
        }

        return curBuy
    }
}
```

```rust
impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        let mut next_buy = 0;
        let mut next_sell = 0;
        let mut cur_buy = 0;
        let mut cur_sell = 0;

        for i in (0..prices.len()).rev() {
            cur_buy = next_buy.max(-prices[i] + next_sell);
            cur_sell = next_sell.max(prices[i] + next_buy);
            next_buy = cur_buy;
            next_sell = cur_sell;
        }

        cur_buy
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 5. Greedy

### Intuition

The key insight is that we can capture every upward price movement. If the price goes up from day `i` to day `i+1`, we can always "buy" on day `i` and "sell" on day `i+1` to capture that profit. We do not need to track actual transactions because consecutive gains are equivalent to holding through multiple days. For example, buying at 1, holding through 3, 5, and selling at 6 gives the same profit as buying at 1, selling at 3, buying at 3, selling at 5, buying at 5, and selling at 6.

### Algorithm

1. Initialize a `profit` variable to `0`.
2. Iterate through the prices from day `1` to the last day.
3. If today's price is higher than yesterday's price, add the difference to `profit`.
4. Return the total `profit`.


<br>

::tabs-start

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        profit = 0

        for i in range(1, len(prices)):
            if prices[i] > prices[i - 1]:
                profit += (prices[i] - prices[i - 1])

        return profit
```

```java
public class Solution {
    public int maxProfit(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += (prices[i] - prices[i - 1]);
            }
        }
        return profit;
    }
}
```

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int profit = 0;
        for (int i = 1; i < prices.size(); i++) {
            if (prices[i] > prices[i - 1]) {
                profit += (prices[i] - prices[i - 1]);
            }
        }
        return profit;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        let profit = 0;
        for (let i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
}
```

```csharp
public class Solution {
    public int MaxProfit(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.Length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
}
```

```go
func maxProfit(prices []int) int {
    profit := 0
    for i := 1; i < len(prices); i++ {
        if prices[i] > prices[i-1] {
            profit += prices[i] - prices[i-1]
        }
    }
    return profit
}
```

```kotlin
class Solution {
    fun maxProfit(prices: IntArray): Int {
        var profit = 0
        for (i in 1 until prices.size) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1]
            }
        }
        return profit
    }
}
```

```swift
class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        var profit = 0
        for i in 1..<prices.count {
            if prices[i] > prices[i - 1] {
                profit += prices[i] - prices[i - 1]
            }
        }
        return profit
    }
}
```

```rust
impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        let mut profit = 0;
        for i in 1..prices.len() {
            if prices[i] > prices[i - 1] {
                profit += prices[i] - prices[i - 1];
            }
        }
        profit
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Confusing with Best Time to Buy and Sell Stock I

This problem allows unlimited transactions, while Stock I only allows one. Using the Stock I approach (tracking min price and max difference) will undercount the total profit.

### Missing Consecutive Gains

The greedy approach works because consecutive daily gains are equivalent to one larger transaction. Buying at 1, selling at 5 equals buying at 1, selling at 3, buying at 3, selling at 5. Missing this insight leads to overcomplicating the solution.

### Adding Negative Profits

When using the greedy approach, only add the difference when `prices[i] > prices[i-1]`. Adding negative differences (price drops) reduces your profit incorrectly.

```python
# Wrong: adds negative changes too
profit += prices[i] - prices[i - 1]
# Correct: only add positive gains
if prices[i] > prices[i - 1]:
    profit += prices[i] - prices[i - 1]
```

### Off-by-One in Loop

When comparing consecutive days, start the loop at index 1 (not 0) to safely access `prices[i-1]`. Starting at 0 causes an index out of bounds error.
