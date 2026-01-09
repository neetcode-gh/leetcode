## 1. Recursion

### Intuition
At each day, we have a choice: if we are not holding stock, we can either buy or skip. If we are holding stock, we can either sell or skip. We want to maximize profit by exploring all possible combinations of buy and sell decisions. This naturally leads to a recursive approach where we try both options at each step and return the maximum profit.

### Algorithm
1. Define a recursive function `rec(i, bought)` where `i` is the current day and `bought` indicates if we are holding stock.
2. Base case: if we have processed all days, return 0.
3. At each day, we always have the option to skip (do nothing).
4. If we are holding stock (`bought = true`), we can sell at the current price and add it to our profit.
5. If we are not holding stock (`bought = false`), we can buy at the current price (subtract it from profit).
6. Return the maximum of all possible choices.

<details>
<summary>Example - Dry Run</summary>

```markdown
Input: prices = [7, 1, 5, 3, 6, 4]

Price Array:
┌─────┬─────┬─────┬─────┬─────┬─────┐
│  7  │  1  │  5  │  3  │  6  │  4  │
└─────┴─────┴─────┴─────┴─────┴─────┘
  [0]   [1]   [2]   [3]   [4]   [5]


Visualization:

              BUY           BUY
               ↓             ↓
    ┌─────┬─────┬─────┬─────┬─────┬─────┐
    │  7  │  1  │  5  │  3  │  6  │  4  │
    └─────┴─────┴─────┴─────┴─────┴─────┘
       0     1     2     3     4     5      ← day
                   ↑           ↑
                 SELL        SELL


    Transaction Flow:

    Day 1: BUY at $1   ───────────────────╮
                                         │  Profit: $5 - $1 = $4
    Day 2: SELL at $5  ←─────────────────╯


    Day 3: BUY at $3   ───────────────────╮
                                         │  Profit: $6 - $3 = $3
    Day 4: SELL at $6  ←─────────────────╯


    ┌────────────────────────────────────────┐
    │                                        │
    │   Total Profit:  $4 + $3  =  $7        │
    │                                        │
    └────────────────────────────────────────┘


The recursion explores all possible buy/sell decisions:

rec(0, False) - At day 0, not holding stock
├── Skip day 0: rec(1, False)
│   ├── Buy at day 1 (price=1): -1 + rec(2, True)
│   │   ├── Sell at day 2 (price=5): 5 + rec(3, False) → profit = 4
│   │   │   ├── Buy at day 3: -3 + rec(4, True)
│   │   │   │   └── Sell at day 4: 6 + rec(5, False) → profit = 3
│   │   │   │       └── Total path: 4 + 3 = 7 ✓ (Optimal)
│   │   │   └── Skip, buy at day 4, etc...
│   │   └── Skip day 2, sell at day 3, etc...
│   └── Skip day 1: rec(2, False)...
└── Buy at day 0 (price=7): -7 + rec(1, True)
    └── Sell at day 1 (price=1): 1 + rec(2, False) → profit = -6 (bad choice)


Optimal Path Found - Step by Step:

┌────────────────────────────────────────────────────────────────────────────┐
│  Step 1: Day 1 - BUY                                                       │
│                                                                            │
│      Action: Buy at price 1                                                │
│      Balance: -1                                                           │
│      Status: Holding stock                                                 │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Step 2: Day 2 - SELL                                                      │
│                                                                            │
│      Action: Sell at price 5                                               │
│      Balance: -1 + 5 = 4                                                   │
│      Status: Not holding stock                                             │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Step 3: Day 3 - BUY                                                       │
│                                                                            │
│      Action: Buy at price 3                                                │
│      Balance: 4 - 3 = 1                                                    │
│      Status: Holding stock                                                 │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Step 4: Day 4 - SELL                                                      │
│                                                                            │
│      Action: Sell at price 6                                               │
│      Balance: 1 + 6 = 7                                                    │
│      Status: Not holding stock                                             │
└────────────────────────────────────────────────────────────────────────────┘


Summary:
┌──────────┬────────────┬────────────┬─────────────────┐
│   Day    │   Price    │   Action   │     Balance     │
├──────────┼────────────┼────────────┼─────────────────┤
│    1     │     1      │    BUY     │       -1        │
│    2     │     5      │   SELL     │        4        │
│    3     │     3      │    BUY     │        1        │
│    4     │     6      │   SELL     │        7        │
└──────────┴────────────┴────────────┴─────────────────┘

Final Answer: 7
```

</details>

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
6. Start the recursion from day 0 with no stock held.

<details>
<summary>Example - Dry Run</summary>

```markdown
Input: prices = [7, 1, 5, 3, 6, 4]

Price Array:
┌─────┬─────┬─────┬─────┬─────┬─────┐
│  7  │  1  │  5  │  3  │  6  │  4  │
└─────┴─────┴─────┴─────┴─────┴─────┘
  [0]   [1]   [2]   [3]   [4]   [5]


Visualization:

              BUY           BUY
               ↓             ↓
    ┌─────┬─────┬─────┬─────┬─────┬─────┐
    │  7  │  1  │  5  │  3  │  6  │  4  │
    └─────┴─────┴─────┴─────┴─────┴─────┘
       0     1     2     3     4     5      ← day
                   ↑           ↑
                 SELL        SELL


    Transaction Flow:

    Day 1: BUY at $1   ───────────────────╮
                                         │  Profit: $5 - $1 = $4
    Day 2: SELL at $5  ←─────────────────╯


    Day 3: BUY at $3   ───────────────────╮
                                         │  Profit: $6 - $3 = $3
    Day 4: SELL at $6  ←─────────────────╯


    ┌────────────────────────────────────────┐
    │                                        │
    │   Total Profit:  $4 + $3  =  $7        │
    │                                        │
    └────────────────────────────────────────┘


Memoization avoids recomputing the same states.
dp[i][bought] stores max profit from day i with bought status.

Call Tree with Memoization:

rec(0, 0) → not cached
├── rec(1, 0) → not cached
│   ├── rec(2, 0) → not cached
│   │   ├── rec(3, 0) → not cached
│   │   │   ├── rec(4, 0) → not cached
│   │   │   │   └── rec(5, 0) = 0, rec(5, 1) = 0
│   │   │   │   dp[4][0] = max(0, -6+0) = 0
│   │   │   │   dp[4][1] = max(0, 6+0) = 6
│   │   │   └── dp[3][0] = max(dp[4][0], -3+dp[4][1]) = max(0, 3) = 3
│   │   │       dp[3][1] = max(dp[4][1], 3+dp[4][0]) = max(6, 3) = 6
│   │   └── dp[2][0] = max(dp[3][0], -5+dp[3][1]) = max(3, 1) = 3
│   │       dp[2][1] = max(dp[3][1], 5+dp[3][0]) = max(6, 8) = 8
│   └── dp[1][0] = max(dp[2][0], -1+dp[2][1]) = max(3, 7) = 7
│       dp[1][1] = max(dp[2][1], 1+dp[2][0]) = max(8, 4) = 8
└── dp[0][0] = max(dp[1][0], -7+dp[1][1]) = max(7, 1) = 7


DP State Computation - Step by Step:

┌────────────────────────────────────────────────────────────────────────────┐
│  Base Case: Day 5 (beyond array)                                           │
│                                                                            │
│      dp[5][0] = 0  (can buy, but no days left)                             │
│      dp[5][1] = 0  (can sell, but no days left)                            │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Day 4: price = 6                                                          │
│                                                                            │
│      dp[4][0] = max(dp[5][0], -6 + dp[5][1])                               │
│               = max(0, -6 + 0) = 0                                         │
│                                                                            │
│      dp[4][1] = max(dp[5][1], 6 + dp[5][0])                                │
│               = max(0, 6 + 0) = 6                                          │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Day 3: price = 3                                                          │
│                                                                            │
│      dp[3][0] = max(dp[4][0], -3 + dp[4][1])                               │
│               = max(0, -3 + 6) = 3                                         │
│                                                                            │
│      dp[3][1] = max(dp[4][1], 3 + dp[4][0])                                │
│               = max(6, 3 + 0) = 6                                          │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Day 2: price = 5                                                          │
│                                                                            │
│      dp[2][0] = max(dp[3][0], -5 + dp[3][1])                               │
│               = max(3, -5 + 6) = 3                                         │
│                                                                            │
│      dp[2][1] = max(dp[3][1], 5 + dp[3][0])                                │
│               = max(6, 5 + 3) = 8                                          │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Day 1: price = 1                                                          │
│                                                                            │
│      dp[1][0] = max(dp[2][0], -1 + dp[2][1])                               │
│               = max(3, -1 + 8) = 7                                         │
│                                                                            │
│      dp[1][1] = max(dp[2][1], 1 + dp[2][0])                                │
│               = max(8, 1 + 3) = 8                                          │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Day 0: price = 7                                                          │
│                                                                            │
│      dp[0][0] = max(dp[1][0], -7 + dp[1][1])                               │
│               = max(7, -7 + 8) = 7                                         │
│                                                                            │
│      dp[0][1] = max(dp[1][1], 7 + dp[1][0])                                │
│               = max(8, 7 + 7) = 14                                         │
└────────────────────────────────────────────────────────────────────────────┘


Final DP Table:

┌─────────┬─────────────────────────┬─────────────────────────┐
│   Day   │  bought=0 (can buy)     │  bought=1 (can sell)    │
├─────────┼─────────────────────────┼─────────────────────────┤
│    0    │           7             │           14            │
│    1    │           7             │            8            │
│    2    │           3             │            8            │
│    3    │           3             │            6            │
│    4    │           0             │            6            │
│    5    │           0             │            0            │
└─────────┴─────────────────────────┴─────────────────────────┘

Final Answer: dp[0][0] = 7
```

</details>

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition
Instead of solving recursively from day 0 forward, we can build the solution iteratively from the last day backward. At each day, we compute the maximum profit for both states (holding and not holding stock) using the already-computed values for the next day. This eliminates recursion overhead.

### Algorithm
1. Create a 2D dp array where `dp[i][0]` is the max profit from day `i` when we can buy, and `dp[i][1]` is the max profit when we can sell.
2. Initialize the base case: `dp[n][0] = dp[n][1] = 0` (no profit after the last day).
3. Iterate from the last day to the first day.
4. For each day, compute `dp[i][0]` as the max of skipping or buying (subtract price, transition to sell state).
5. Compute `dp[i][1]` as the max of skipping or selling (add price, transition to buy state).
6. Return `dp[0][0]` as we start without holding any stock.

<details>
<summary>Example - Dry Run</summary>

```markdown
Input: prices = [7, 1, 5, 3, 6, 4]

Price Array:
┌─────┬─────┬─────┬─────┬─────┬─────┐
│  7  │  1  │  5  │  3  │  6  │  4  │
└─────┴─────┴─────┴─────┴─────┴─────┘
  [0]   [1]   [2]   [3]   [4]   [5]


Visualization:

              BUY           BUY
               ↓             ↓
    ┌─────┬─────┬─────┬─────┬─────┬─────┐
    │  7  │  1  │  5  │  3  │  6  │  4  │
    └─────┴─────┴─────┴─────┴─────┴─────┘
       0     1     2     3     4     5      ← day
                   ↑           ↑
                 SELL        SELL


    Transaction Flow:

    Day 1: BUY at $1   ───────────────────╮
                                         │  Profit: $5 - $1 = $4
    Day 2: SELL at $5  ←─────────────────╯


    Day 3: BUY at $3   ───────────────────╮
                                         │  Profit: $6 - $3 = $3
    Day 4: SELL at $6  ←─────────────────╯


    ┌────────────────────────────────────────┐
    │                                        │
    │   Total Profit:  $4 + $3  =  $7        │
    │                                        │
    └────────────────────────────────────────┘


Building DP table from right to left:
  - dp[i][0] = max profit from day i when we CAN buy
  - dp[i][1] = max profit from day i when we CAN sell (holding stock)


Step-by-Step DP Table Construction:

┌────────────────────────────────────────────────────────────────────────────┐
│  Base Case: i = 6 (beyond array)                                           │
│                                                                            │
│      dp[6][0] = 0  (base case)                                             │
│      dp[6][1] = 0  (base case)                                             │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  i = 5 (price = 4):                                                        │
│                                                                            │
│      dp[5][0] = max(dp[6][0], -4 + dp[6][1])                               │
│               = max(0, -4 + 0) = 0  (skip buying)                          │
│                                                                            │
│      dp[5][1] = max(dp[6][1], 4 + dp[6][0])                                │
│               = max(0, 4 + 0) = 4   (sell at price 4)                      │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  i = 4 (price = 6):                                                        │
│                                                                            │
│      dp[4][0] = max(dp[5][0], -6 + dp[5][1])                               │
│               = max(0, -6 + 4) = 0  (skip buying)                          │
│                                                                            │
│      dp[4][1] = max(dp[5][1], 6 + dp[5][0])                                │
│               = max(4, 6 + 0) = 6   (sell at price 6)                      │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  i = 3 (price = 3):                                                        │
│                                                                            │
│      dp[3][0] = max(dp[4][0], -3 + dp[4][1])                               │
│               = max(0, -3 + 6) = 3  (buy at price 3)                       │
│                                                                            │
│      dp[3][1] = max(dp[4][1], 3 + dp[4][0])                                │
│               = max(6, 3 + 0) = 6   (keep holding)                         │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  i = 2 (price = 5):                                                        │
│                                                                            │
│      dp[2][0] = max(dp[3][0], -5 + dp[3][1])                               │
│               = max(3, -5 + 6) = 3  (skip buying)                          │
│                                                                            │
│      dp[2][1] = max(dp[3][1], 5 + dp[3][0])                                │
│               = max(6, 5 + 3) = 8   (sell at price 5)                      │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  i = 1 (price = 1):                                                        │
│                                                                            │
│      dp[1][0] = max(dp[2][0], -1 + dp[2][1])                               │
│               = max(3, -1 + 8) = 7  (buy at price 1)                       │
│                                                                            │
│      dp[1][1] = max(dp[2][1], 1 + dp[2][0])                                │
│               = max(8, 1 + 3) = 8   (keep holding)                         │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  i = 0 (price = 7):                                                        │
│                                                                            │
│      dp[0][0] = max(dp[1][0], -7 + dp[1][1])                               │
│               = max(7, -7 + 8) = 7  (skip buying)                          │
│                                                                            │
│      dp[0][1] = max(dp[1][1], 7 + dp[1][0])                                │
│               = max(8, 7 + 7) = 14  (would sell, but unused)               │
└────────────────────────────────────────────────────────────────────────────┘


Final DP Table:

┌─────────┬───────────────────────────────────────────────────────────────────┐
│   Day   │    0      1      2      3      4      5      6                    │
├─────────┼───────────────────────────────────────────────────────────────────┤
│ dp[i][0]│    7      7      3      3      0      0      0                    │
│ (buy)   │                                                                   │
├─────────┼───────────────────────────────────────────────────────────────────┤
│ dp[i][1]│   14      8      8      6      6      4      0                    │
│ (sell)  │                                                                   │
└─────────┴───────────────────────────────────────────────────────────────────┘

Final Answer: dp[0][0] = 7
```

</details>

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

### Intuition
Looking at the bottom-up solution, we notice that to compute the values for day `i`, we only need the values from day `i+1`. We do not need the entire dp array. This means we can reduce space from O(n) to O(1) by using just four variables to track the current and next day's states.

### Algorithm
1. Initialize four variables: `nextBuy`, `nextSell` (for day i+1), and `curBuy`, `curSell` (for day i).
2. Start with all variables set to 0.
3. Iterate from the last day to the first day.
4. Compute `curBuy` as the max of skipping (nextBuy) or buying (-price + nextSell).
5. Compute `curSell` as the max of skipping (nextSell) or selling (price + nextBuy).
6. Update next variables with current values for the next iteration.
7. Return `curBuy` as the final answer.

<details>
<summary>Example - Dry Run</summary>

```markdown
Input: prices = [7, 1, 5, 3, 6, 4]

Price Array:
┌─────┬─────┬─────┬─────┬─────┬─────┐
│  7  │  1  │  5  │  3  │  6  │  4  │
└─────┴─────┴─────┴─────┴─────┴─────┘
  [0]   [1]   [2]   [3]   [4]   [5]


Visualization:

              BUY           BUY
               ↓             ↓
    ┌─────┬─────┬─────┬─────┬─────┬─────┐
    │  7  │  1  │  5  │  3  │  6  │  4  │
    └─────┴─────┴─────┴─────┴─────┴─────┘
       0     1     2     3     4     5      ← day
                   ↑           ↑
                 SELL        SELL


    Transaction Flow:

    Day 1: BUY at $1   ───────────────────╮
                                         │  Profit: $5 - $1 = $4
    Day 2: SELL at $5  ←─────────────────╯


    Day 3: BUY at $3   ───────────────────╮
                                         │  Profit: $6 - $3 = $3
    Day 4: SELL at $6  ←─────────────────╯


    ┌────────────────────────────────────────┐
    │                                        │
    │   Total Profit:  $4 + $3  =  $7        │
    │                                        │
    └────────────────────────────────────────┘


Using only 4 variables instead of full DP array:
  - nextBuy / curBuy:   max profit when we can buy
  - nextSell / curSell: max profit when we can sell


Initial State:

┌────────────────────────────────────────────────────────────────────────────┐
│  nextBuy  = 0                                                              │
│  nextSell = 0                                                              │
└────────────────────────────────────────────────────────────────────────────┘


Processing from right to left:

┌────────────────────────────────────────────────────────────────────────────┐
│  i = 5 (price = 4):                                                        │
│                                                                            │
│      curBuy  = max(nextBuy, -price + nextSell)                             │
│             = max(0, -4 + 0) = 0                                           │
│                                                                            │
│      curSell = max(nextSell, price + nextBuy)                              │
│             = max(0, 4 + 0) = 4                                            │
│                                                                            │
│      Update: nextBuy <- 0, nextSell <- 4                                   │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  i = 4 (price = 6):                                                        │
│                                                                            │
│      curBuy  = max(0, -6 + 4) = 0                                          │
│      curSell = max(4, 6 + 0) = 6                                           │
│                                                                            │
│      Update: nextBuy <- 0, nextSell <- 6                                   │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  i = 3 (price = 3):                                                        │
│                                                                            │
│      curBuy  = max(0, -3 + 6) = 3   <-- Buy here for profit!               │
│      curSell = max(6, 3 + 0) = 6                                           │
│                                                                            │
│      Update: nextBuy <- 3, nextSell <- 6                                   │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  i = 2 (price = 5):                                                        │
│                                                                            │
│      curBuy  = max(3, -5 + 6) = 3                                          │
│      curSell = max(6, 5 + 3) = 8   <-- Sell here!                          │
│                                                                            │
│      Update: nextBuy <- 3, nextSell <- 8                                   │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  i = 1 (price = 1):                                                        │
│                                                                            │
│      curBuy  = max(3, -1 + 8) = 7  <-- Best: buy at 1!                     │
│      curSell = max(8, 1 + 3) = 8                                           │
│                                                                            │
│      Update: nextBuy <- 7, nextSell <- 8                                   │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  i = 0 (price = 7):                                                        │
│                                                                            │
│      curBuy  = max(7, -7 + 8) = 7                                          │
│      curSell = max(8, 7 + 7) = 14                                          │
│                                                                            │
│      Final: curBuy = 7                                                     │
└────────────────────────────────────────────────────────────────────────────┘


Variable Trace Table:

┌──────────┬─────────┬──────────┬───────────┬───────────┬────────────┐
│    i     │  price  │  curBuy  │  curSell  │  nextBuy  │  nextSell  │
├──────────┼─────────┼──────────┼───────────┼───────────┼────────────┤
│   init   │    -    │    0     │     0     │     0     │      0     │
│    5     │    4    │    0     │     4     │     0     │      4     │
│    4     │    6    │    0     │     6     │     0     │      6     │
│    3     │    3    │    3     │     6     │     3     │      6     │
│    2     │    5    │    3     │     8     │     3     │      8     │
│    1     │    1    │    7     │     8     │     7     │      8     │
│    0     │    7    │    7     │    14     │     7     │      8     │
└──────────┴─────────┴──────────┴───────────┴───────────┴────────────┘

Final Answer: curBuy = 7
```

</details>

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 5. Greedy

### Intuition
The key insight is that we can capture every upward price movement. If the price goes up from day i to day i+1, we can always "buy" on day i and "sell" on day i+1 to capture that profit. We do not need to track actual transactions because consecutive gains are equivalent to holding through multiple days. For example, buying at 1, holding through 3, 5, and selling at 6 gives the same profit as buying at 1, selling at 3, buying at 3, selling at 5, buying at 5, and selling at 6.

### Algorithm
1. Initialize a profit variable to 0.
2. Iterate through the prices from day 1 to the last day.
3. If today's price is higher than yesterday's price, add the difference to profit.
4. Return the total profit.

<details>
<summary>Example - Dry Run</summary>

```markdown
Input: prices = [7, 1, 5, 3, 6, 4]

Price Array:
┌─────┬─────┬─────┬─────┬─────┬─────┐
│  7  │  1  │  5  │  3  │  6  │  4  │
└─────┴─────┴─────┴─────┴─────┴─────┘
  [0]   [1]   [2]   [3]   [4]   [5]


Visualization:

              BUY           BUY
               ↓             ↓
    ┌─────┬─────┬─────┬─────┬─────┬─────┐
    │  7  │  1  │  5  │  3  │  6  │  4  │
    └─────┴─────┴─────┴─────┴─────┴─────┘
       0     1     2     3     4     5      ← day
                   ↑           ↑
                 SELL        SELL


    Transaction Flow:

    Day 1: BUY at $1   ───────────────────╮
                                         │  Profit: $5 - $1 = $4
    Day 2: SELL at $5  ←─────────────────╯


    Day 3: BUY at $3   ───────────────────╮
                                         │  Profit: $6 - $3 = $3
    Day 4: SELL at $6  ←─────────────────╯


    ┌────────────────────────────────────────┐
    │                                        │
    │   Total Profit:  $4 + $3  =  $7        │
    │                                        │
    └────────────────────────────────────────┘


Greedy Insight:

┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│   Capture EVERY upward movement!                                           │
│                                                                            │
│   If tomorrow's price > today's price, that's profit we can take.          │
│                                                                            │
│   We don't need to track actual buy/sell - just sum all positive gains.    │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘


Greedy Approach - Step by Step:

┌────────────────────────────────────────────────────────────────────────────┐
│  Step 1: Compare day 0 -> day 1                                            │
│                                                                            │
│      prices[0] = 7,  prices[1] = 1                                         │
│      Change: 1 - 7 = -6 (negative, price dropped)                          │
│                                                                            │
│      Action: Skip (no profit)                                              │
│      Total Profit: 0                                                       │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Step 2: Compare day 1 -> day 2                                            │
│                                                                            │
│      prices[1] = 1,  prices[2] = 5                                         │
│      Change: 5 - 1 = +4 (positive! price increased)                        │
│                                                                            │
│      Action: Take profit! (Buy at 1, Sell at 5)                            │
│      Total Profit: 0 + 4 = 4                                               │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Step 3: Compare day 2 -> day 3                                            │
│                                                                            │
│      prices[2] = 5,  prices[3] = 3                                         │
│      Change: 3 - 5 = -2 (negative, price dropped)                          │
│                                                                            │
│      Action: Skip (no profit)                                              │
│      Total Profit: 4                                                       │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Step 4: Compare day 3 -> day 4                                            │
│                                                                            │
│      prices[3] = 3,  prices[4] = 6                                         │
│      Change: 6 - 3 = +3 (positive! price increased)                        │
│                                                                            │
│      Action: Take profit! (Buy at 3, Sell at 6)                            │
│      Total Profit: 4 + 3 = 7                                               │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Step 5: Compare day 4 -> day 5                                            │
│                                                                            │
│      prices[4] = 6,  prices[5] = 4                                         │
│      Change: 4 - 6 = -2 (negative, price dropped)                          │
│                                                                            │
│      Action: Skip (no profit)                                              │
│      Total Profit: 7                                                       │
└────────────────────────────────────────────────────────────────────────────┘


Summary Table:

┌───────┬─────────┬──────────┬───────────────┬─────────────────┐
│  Day  │  Price  │  Change  │    Action     │  Total Profit   │
├───────┼─────────┼──────────┼───────────────┼─────────────────┤
│   0   │    7    │    -     │    Start      │        0        │
│   1   │    1    │   -6     │    Skip       │        0        │
│   2   │    5    │   +4     │  Capture +4   │        4        │
│   3   │    3    │   -2     │    Skip       │        4        │
│   4   │    6    │   +3     │  Capture +3   │        7        │
│   5   │    4    │   -2     │    Skip       │        7        │
└───────┴─────────┴──────────┴───────────────┴─────────────────┘


Transactions Made:

┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  Transaction 1:                                                            │
│      Buy  @ $1 (day 1)                                                     │
│      Sell @ $5 (day 2)                                                     │
│      Profit: +$4                                                           │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Transaction 2:                                                            │
│      Buy  @ $3 (day 3)                                                     │
│      Sell @ $6 (day 4)                                                     │
│      Profit: +$3                                                           │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Total Profit: $4 + $3 = $7                                                │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

Final Answer: 7
```

</details>

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
