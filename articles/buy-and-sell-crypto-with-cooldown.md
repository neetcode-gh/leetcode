## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Recursion** - Making decisions at each step and exploring all possibilities
- **Dynamic Programming** - Memoization to cache results and avoid redundant calculations
- **State Machine Thinking** - Tracking multiple states (buying vs. selling) throughout the problem
- **Space Optimization** - Reducing DP table to constant space using rolling variables

---

## 1. Recursion

### Intuition

This problem is about deciding the best days to buy and sell a stock to maximize profit, with one important rule: **after selling a stock, you must wait one day before buying again (cooldown)**.

At every day, we have two possible states:
- we are **allowed to buy** (we are not holding a stock)
- we are **allowed to sell** (we are currently holding a stock)

Using recursion, we try **all possible decisions** starting from day `0` and choose the one that gives the maximum profit.
At each step, we either:
- take an action (buy or sell), or
- skip the day (cooldown)

The recursive function represents:
**"What is the maximum profit we can make starting from day `i`, given whether we are allowed to buy or not?"**

### Algorithm

1. Define a recursive function `dfs(i, buying)`:
   - `i` represents the current day
   - `buying` indicates whether we are allowed to buy (`true`) or must sell (`false`)
2. If `i` goes beyond the last day:
   - Return `0` because no more profit can be made
3. Always compute the option to **skip the current day** (cooldown):
   - Move to the next day without changing state
4. If we are allowed to buy:
   - Option 1: Buy the stock today (subtract price and move to selling state)
   - Option 2: Skip the day
   - Take the maximum of these two options
5. If we are holding a stock:
   - Option 1: Sell the stock today (add price and skip the next day due to cooldown)
   - Option 2: Skip the day
   - Take the maximum of these two options
6. Start the recursion from day `0` with `buying = true`
7. Return the result of this initial call

::tabs-start

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:

        def dfs(i, buying):
            if i >= len(prices):
                return 0

            cooldown = dfs(i + 1, buying)
            if buying:
                buy = dfs(i + 1, not buying) - prices[i]
                return max(buy, cooldown)
            else:
                sell = dfs(i + 2, not buying) + prices[i]
                return max(sell, cooldown)

        return dfs(0, True)
```

```java
public class Solution {
    public int maxProfit(int[] prices) {

        return dfs(0, true, prices);
    }

    private int dfs(int i, boolean buying, int[] prices) {
        if (i >= prices.length) {
            return 0;
        }

        int cooldown = dfs(i + 1, buying, prices);
        if (buying) {
            int buy = dfs(i + 1, false, prices) - prices[i];
            return Math.max(buy, cooldown);
        } else {
            int sell = dfs(i + 2, true, prices) + prices[i];
            return Math.max(sell, cooldown);
        }
    }
}
```

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        return dfs(0, true, prices);
    }

private:
    int dfs(int i, bool buying, vector<int>& prices) {
        if (i >= prices.size()) {
            return 0;
        }

        int cooldown = dfs(i + 1, buying, prices);
        if (buying) {
            int buy = dfs(i + 1, false, prices) - prices[i];
            return max(buy, cooldown);
        } else {
            int sell = dfs(i + 2, true, prices) + prices[i];
            return max(sell, cooldown);
        }
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
        const dfs = (i, buying) => {
            if (i >= prices.length) {
                return 0;
            }

            let cooldown = dfs(i + 1, buying);
            if (buying) {
                let buy = dfs(i + 1, false) - prices[i];
                return Math.max(buy, cooldown);
            } else {
                let sell = dfs(i + 2, true) + prices[i];
                return Math.max(sell, cooldown);
            }
        };

        return dfs(0, true);
    }
}
```

```csharp
public class Solution {
    public int MaxProfit(int[] prices) {
        return Dfs(0, true, prices);
    }

    private int Dfs(int i, bool buying, int[] prices) {
        if (i >= prices.Length) {
            return 0;
        }

        int cooldown = Dfs(i + 1, buying, prices);
        if (buying) {
            int buy = Dfs(i + 1, false, prices) - prices[i];
            return Math.Max(buy, cooldown);
        } else {
            int sell = Dfs(i + 2, true, prices) + prices[i];
            return Math.Max(sell, cooldown);
        }
    }
}
```

```go
func maxProfit(prices []int) int {
    var dfs func(i int, buying bool) int
    dfs = func(i int, buying bool) int {
        if i >= len(prices) {
            return 0
        }

        cooldown := dfs(i + 1, buying)
        if buying {
            buy := dfs(i + 1, false) - prices[i]
            return max(buy, cooldown)
        } else {
            sell := dfs(i + 2, true) + prices[i]
            return max(sell, cooldown)
        }
    }

    return dfs(0, true)
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
        fun dfs(i: Int, buying: Boolean): Int {
            if (i >= prices.size) return 0

            val cooldown = dfs(i + 1, buying)
            return if (buying) {
                val buy = dfs(i + 1, false) - prices[i]
                maxOf(buy, cooldown)
            } else {
                val sell = dfs(i + 2, true) + prices[i]
                maxOf(sell, cooldown)
            }
        }

        return dfs(0, true)
    }
}
```

```swift
class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        let n = prices.count

        func dfs(_ i: Int, _ buying: Bool) -> Int {
            if i >= n {
                return 0
            }

            let cooldown = dfs(i + 1, buying)
            if buying {
                let buy = dfs(i + 1, false) - prices[i]
                return max(buy, cooldown)
            } else {
                let sell = dfs(i + 2, true) + prices[i]
                return max(sell, cooldown)
            }
        }

        return dfs(0, true)
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

This problem asks for the maximum profit from buying and selling stocks, with the restriction that **after selling a stock, you must wait one day before buying again (cooldown)**.

The recursive solution tries all possible choices, but it repeats the same calculations many times. To make it efficient, we use **Dynamic Programming (Top-Down)** with memoization.

We define a state using:
- the current day `i`
- whether we are allowed to buy (`buying = true`) or must sell (`buying = false`)

For each state, we store the best profit we can achieve so that we never compute it again.

### Algorithm

1. Create a memoization table `dp` where:
   - the key is `(i, buying)`
   - the value is the maximum profit from day `i` with the given state
2. Define a recursive function `dfs(i, buying)`:
   - `i` is the current day
   - `buying` indicates whether we can buy or must sell
3. If `i` is beyond the last day:
   - Return `0` since no more profit can be made
4. If the state `(i, buying)` is already in `dp`:
   - Return the stored result to avoid recomputation
5. Always consider the option to **skip the current day** (cooldown):
   - Move to the next day without changing the state
6. If we are allowed to buy:
   - Option 1: Buy the stock today (subtract price and move to selling state)
   - Option 2: Skip the day
   - Store the maximum of these two options in `dp`
7. If we are holding a stock:
   - Option 1: Sell the stock today (add price and skip the next day due to cooldown)
   - Option 2: Skip the day
   - Store the maximum of these two options in `dp`
8. Start the recursion from day `0` with `buying = true`
9. Return the result from this initial call

::tabs-start

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        dp = {}  # key=(i, buying) val=max_profit

        def dfs(i, buying):
            if i >= len(prices):
                return 0
            if (i, buying) in dp:
                return dp[(i, buying)]

            cooldown = dfs(i + 1, buying)
            if buying:
                buy = dfs(i + 1, not buying) - prices[i]
                dp[(i, buying)] = max(buy, cooldown)
            else:
                sell = dfs(i + 2, not buying) + prices[i]
                dp[(i, buying)] = max(sell, cooldown)
            return dp[(i, buying)]

        return dfs(0, True)
```

```java
public class Solution {
    private Map<String, Integer> dp = new HashMap<>();

    public int maxProfit(int[] prices) {
        return dfs(0, true, prices);
    }

    private int dfs(int i, boolean buying, int[] prices) {
        if (i >= prices.length) {
            return 0;
        }

        String key = i + "-" + buying;
        if (dp.containsKey(key)) {
            return dp.get(key);
        }

        int cooldown = dfs(i + 1, buying, prices);
        if (buying) {
            int buy = dfs(i + 1, false, prices) - prices[i];
            dp.put(key, Math.max(buy, cooldown));
        } else {
            int sell = dfs(i + 2, true, prices) + prices[i];
            dp.put(key, Math.max(sell, cooldown));
        }

        return dp.get(key);
    }
}
```

```cpp
class Solution {
public:
    unordered_map<string, int> dp;

    int maxProfit(vector<int>& prices) {
        return dfs(0, true, prices);
    }

private:
    int dfs(int i, bool buying, vector<int>& prices) {
        if (i >= prices.size()) {
            return 0;
        }

        string key = to_string(i) + "-" + to_string(buying);
        if (dp.find(key) != dp.end()) {
            return dp[key];
        }

        int cooldown = dfs(i + 1, buying, prices);
        if (buying) {
            int buy = dfs(i + 1, false, prices) - prices[i];
            dp[key] = max(buy, cooldown);
        } else {
            int sell = dfs(i + 2, true, prices) + prices[i];
            dp[key] = max(sell, cooldown);
        }

        return dp[key];
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
        const dp = {};
        const dfs = (i, buying) => {
            if (i >= prices.length) {
                return 0;
            }
            let key = `${i}-${buying}`;
            if (key in dp) {
                return dp[key];
            }

            let cooldown = dfs(i + 1, buying);
            if (buying) {
                let buy = dfs(i + 1, false) - prices[i];
                dp[key] = Math.max(buy, cooldown);
            } else {
                let sell = dfs(i + 2, true) + prices[i];
                dp[key] = Math.max(sell, cooldown);
            }
            return dp[key];
        };

        return dfs(0, true);
    }
}
```

```csharp
public class Solution {
    private Dictionary<(int, bool), int> dp =
                    new Dictionary<(int, bool), int>();

    public int MaxProfit(int[] prices) {
        return Dfs(0, true, prices);
    }

    private int Dfs(int i, bool buying, int[] prices) {
        if (i >= prices.Length) {
            return 0;
        }

        var key = (i, buying);
        if (dp.ContainsKey(key)) {
            return dp[key];
        }

        int cooldown = Dfs(i + 1, buying, prices);
        if (buying) {
            int buy = Dfs(i + 1, false, prices) - prices[i];
            dp[key] = Math.Max(buy, cooldown);
        } else {
            int sell = Dfs(i + 2, true, prices) + prices[i];
            dp[key] = Math.Max(sell, cooldown);
        }

        return dp[key];
    }
}
```

```go
func maxProfit(prices []int) int {
    dp := make(map[[2]int]int) // key is [i, buying], value is max profit

    var dfs func(i int, buying bool) int
    dfs = func(i int, buying bool) int {
        if i >= len(prices) {
            return 0
        }

        key := [2]int{i, boolToInt(buying)}
        if val, found := dp[key]; found {
            return val
        }

        cooldown := dfs(i + 1, buying)
        if buying {
            buy := dfs(i + 1, false) - prices[i]
            dp[key] = max(buy, cooldown)
        } else {
            sell := dfs(i + 2, true) + prices[i]
            dp[key] = max(sell, cooldown)
        }

        return dp[key]
    }

    return dfs(0, true)
}

func boolToInt(b bool) int {
    if b {
        return 1
    }
    return 0
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
        val dp = HashMap<Pair<Int, Boolean>, Int>() // key is Pair(i, buying)

        fun dfs(i: Int, buying: Boolean): Int {
            if (i >= prices.size) return 0

            val key = Pair(i, buying)
            if (key in dp) return dp[key]!!

            val cooldown = dfs(i + 1, buying)
            dp[key] = if (buying) {
                val buy = dfs(i + 1, false) - prices[i]
                maxOf(buy, cooldown)
            } else {
                val sell = dfs(i + 2, true) + prices[i]
                maxOf(sell, cooldown)
            }

            return dp[key]!!
        }

        return dfs(0, true)
    }
}
```

```swift
class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        let n = prices.count
        var dp = [[Int?]](repeating: [Int?](repeating: nil, count: 2), count: n)

        func dfs(_ i: Int, _ buying: Int) -> Int {
            if i >= n {
                return 0
            }
            if let cached = dp[i][buying] {
                return cached
            }

            let cooldown = dfs(i + 1, buying)
            if buying == 1 {
                let buy = dfs(i + 1, 0) - prices[i]
                dp[i][buying] = max(buy, cooldown)
            } else {
                let sell = dfs(i + 2, 1) + prices[i]
                dp[i][buying] = max(sell, cooldown)
            }
            return dp[i][buying]!
        }

        return dfs(0, 1)
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

This problem is about maximizing stock trading profit with a **cooldown rule**:  
after selling a stock, you must wait **one full day** before buying again.

Instead of using recursion, we solve this using **bottom-up dynamic programming**, where we build the solution starting from the **last day** and move backward to day `0`.

At every day, we only care about two possible states:
- **buying = true** → we do not own a stock and are allowed to buy
- **buying = false** → we currently own a stock and are allowed to sell

For each day and state, we compute the **maximum profit possible from that point onward** and store it in a table.  
This way, future decisions are already known when we process earlier days.

### Algorithm

1. Let `n` be the number of days.
2. Create a 2D DP table `dp` of size `(n + 1) x 2`:
   - `dp[i][1]` → maximum profit starting at day `i` when we are allowed to buy
   - `dp[i][0]` → maximum profit starting at day `i` when we are holding a stock
3. Initialize the DP table with `0` since no profit can be made after the last day.
4. Traverse days from `n - 1` down to `0`.
5. For each day `i`, evaluate both states:
   - **If buying is allowed**:
     - Option 1: Buy today (subtract price and move to selling state on next day)
     - Option 2: Skip today (cooldown, stay in buying state)
     - Store the maximum of these two choices in `dp[i][1]`
   - **If holding a stock**:
     - Option 1: Sell today (add price and skip one day due to cooldown)
     - Option 2: Skip today (cooldown, stay in selling state)
     - Store the maximum of these two choices in `dp[i][0]`
6. After filling the table, the answer is stored in `dp[0][1]`, meaning:
   - starting from day `0` with permission to buy
7. Return `dp[0][1]`

::tabs-start

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        dp = [[0] * 2 for _ in range(n + 1)]

        for i in range(n - 1, -1, -1):
            for buying in [True, False]:
                if buying:
                    buy = dp[i + 1][False] - prices[i] if i + 1 < n else -prices[i]
                    cooldown = dp[i + 1][True] if i + 1 < n else 0
                    dp[i][1] = max(buy, cooldown)
                else:
                    sell = dp[i + 2][True] + prices[i] if i + 2 < n else prices[i]
                    cooldown = dp[i + 1][False] if i + 1 < n else 0
                    dp[i][0] = max(sell, cooldown)

        return dp[0][1]
```

```java
public class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int[][] dp = new int[n + 1][2];

        for (int i = n - 1; i >= 0; i--) {
            for (int buying = 1; buying >= 0; buying--) {
                if (buying == 1) {
                    int buy = dp[i + 1][0] - prices[i];
                    int cooldown = dp[i + 1][1];
                    dp[i][1] = Math.max(buy, cooldown);
                } else {
                    int sell = (i + 2 < n) ? dp[i + 2][1] + prices[i] : prices[i];
                    int cooldown = dp[i + 1][0];
                    dp[i][0] = Math.max(sell, cooldown);
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
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, 0));

        for (int i = n - 1; i >= 0; --i) {
            for (int buying = 1; buying >= 0; --buying) {
                if (buying == 1) {
                    int buy = dp[i + 1][0] - prices[i];
                    int cooldown = dp[i + 1][1];
                    dp[i][1] = max(buy, cooldown);
                } else {
                    int sell = (i + 2 < n) ? dp[i + 2][1] + prices[i] : prices[i];
                    int cooldown = dp[i + 1][0];
                    dp[i][0] = max(sell, cooldown);
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
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        const n = prices.length;
        const dp = Array.from({ length: n + 1 }, () => [0, 0]);

        for (let i = n - 1; i >= 0; i--) {
            for (let buying = 1; buying >= 0; buying--) {
                if (buying === 1) {
                    let buy = dp[i + 1][0] - prices[i];
                    let cooldown = dp[i + 1][1];
                    dp[i][1] = Math.max(buy, cooldown);
                } else {
                    let sell = i + 2 < n ? dp[i + 2][1] + prices[i] : prices[i];
                    let cooldown = dp[i + 1][0];
                    dp[i][0] = Math.max(sell, cooldown);
                }
            }
        }

        return dp[0][1];
    }
}
```

```csharp
public class Solution {
    public int MaxProfit(int[] prices) {
        int n = prices.Length;
        int[,] dp = new int[n + 1, 2];

        for (int i = n - 1; i >= 0; i--) {
            for (int buying = 1; buying >= 0; buying--) {
                if (buying == 1) {
                    int buy = dp[i + 1, 0] - prices[i];
                    int cooldown = dp[i + 1, 1];
                    dp[i, 1] = Math.Max(buy, cooldown);
                } else {
                    int sell = (i + 2 < n) ? dp[i + 2, 1] + prices[i] : prices[i];
                    int cooldown = dp[i + 1, 0];
                    dp[i, 0] = Math.Max(sell, cooldown);
                }
            }
        }

        return dp[0, 1];
    }
}
```

```go
func maxProfit(prices []int) int {
    n := len(prices)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, 2)
    }

    for i := n - 1; i >= 0; i-- {
        for buying := 1; buying >= 0; buying-- {
            if buying == 1 {
                buy := dp[i+1][0] - prices[i]
                cooldown := dp[i+1][1]
                dp[i][1] = max(buy, cooldown)
            } else {
                sell := prices[i]
                if i+2 < n {
                    sell += dp[i+2][1]
                }
                cooldown := dp[i+1][0]
                dp[i][0] = max(sell, cooldown)
            }
        }
    }

    return dp[0][1]
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
            for (buying in 1 downTo 0) {
                dp[i][buying] = if (buying == 1) {
                    val buy = dp[i + 1][0] - prices[i]
                    val cooldown = dp[i + 1][1]
                    maxOf(buy, cooldown)
                } else {
                    val sell = if (i + 2 < n) dp[i + 2][1] + prices[i] else prices[i]
                    val cooldown = dp[i + 1][0]
                    maxOf(sell, cooldown)
                }
            }
        }

        return dp[0][1]
    }
}
```

```swift
class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        let n = prices.count
        var dp = Array(repeating: [0, 0], count: n + 1)

        for i in stride(from: n - 1, through: 0, by: -1) {
            for buying in 0...1 {
                if buying == 1 {
                    let buy = (i + 1 < n ? dp[i + 1][0] - prices[i] : -prices[i])
                    let cooldown = (i + 1 < n ? dp[i + 1][1] : 0)
                    dp[i][1] = max(buy, cooldown)
                } else {
                    let sell = (i + 2 < n ? dp[i + 2][1] + prices[i] : prices[i])
                    let cooldown = (i + 1 < n ? dp[i + 1][0] : 0)
                    dp[i][0] = max(sell, cooldown)
                }
            }
        }

        return dp[0][1]
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

This problem follows the same idea as the previous dynamic programming solutions:  
we want to maximize profit while respecting the **cooldown rule** (after selling, we must wait one day before buying again).

In the bottom-up DP approach, we only ever use values from the **next day** and the **day after next**. That means we do not need a full DP table — we can **compress the state** into a few variables.

Instead of storing results for every day, we keep track of:
- the best profit if we are allowed to buy on the next day
- the best profit if we are allowed to sell on the next day
- the best profit if we are allowed to buy two days ahead (needed for cooldown)

By updating these values while iterating backward, we achieve the same result using constant space.

### Algorithm

1. Initialize variables to represent future DP states:
   - `dp1_buy`: profit if we can buy on the next day
   - `dp1_sell`: profit if we can sell on the next day
   - `dp2_buy`: profit if we can buy two days ahead (used after selling)
2. Traverse the prices array from the last day to the first day.
3. For each day:
   - Compute the best profit if we are allowed to buy:
     - either buy today (use next day’s sell profit minus price)
     - or skip today (keep next day’s buy profit)
   - Compute the best profit if we are allowed to sell:
     - either sell today (use profit from two days ahead plus price)
     - or skip today (keep next day’s sell profit)
4. Shift the state variables forward to represent the next iteration:
   - update `dp2_buy`
   - update `dp1_buy` and `dp1_sell`
5. After processing all days, `dp1_buy` represents the maximum profit starting from day `0` with permission to buy
6. Return `dp1_buy`

::tabs-start

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        dp1_buy, dp1_sell = 0, 0
        dp2_buy = 0

        for i in range(n - 1, -1, -1):
            dp_buy = max(dp1_sell - prices[i], dp1_buy)
            dp_sell = max(dp2_buy + prices[i], dp1_sell)
            dp2_buy = dp1_buy
            dp1_buy, dp1_sell = dp_buy, dp_sell

        return dp1_buy
```

```java
public class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int dp1_buy = 0, dp1_sell = 0;
        int dp2_buy = 0;

        for (int i = n - 1; i >= 0; i--) {
            int dp_buy = Math.max(dp1_sell - prices[i], dp1_buy);
            int dp_sell = Math.max(dp2_buy + prices[i], dp1_sell);
            dp2_buy = dp1_buy;
            dp1_buy = dp_buy;
            dp1_sell = dp_sell;
        }

        return dp1_buy;
    }
}
```

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        int dp1_buy = 0, dp1_sell = 0;
        int dp2_buy = 0;

        for (int i = n - 1; i >= 0; --i) {
            int dp_buy = max(dp1_sell - prices[i], dp1_buy);
            int dp_sell = max(dp2_buy + prices[i], dp1_sell);
            dp2_buy = dp1_buy;
            dp1_buy = dp_buy;
            dp1_sell = dp_sell;
        }

        return dp1_buy;
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
        let dp1_buy = 0,
            dp1_sell = 0;
        let dp2_buy = 0;

        for (let i = n - 1; i >= 0; i--) {
            let dp_buy = Math.max(dp1_sell - prices[i], dp1_buy);
            let dp_sell = Math.max(dp2_buy + prices[i], dp1_sell);
            dp2_buy = dp1_buy;
            dp1_buy = dp_buy;
            dp1_sell = dp_sell;
        }

        return dp1_buy;
    }
}
```

```csharp
public class Solution {
    public int MaxProfit(int[] prices) {
        int n = prices.Length;
        int dp1_buy = 0, dp1_sell = 0;
        int dp2_buy = 0;

        for (int i = n - 1; i >= 0; i--) {
            int dp_buy = Math.Max(dp1_sell - prices[i], dp1_buy);
            int dp_sell = Math.Max(dp2_buy + prices[i], dp1_sell);
            dp2_buy = dp1_buy;
            dp1_buy = dp_buy;
            dp1_sell = dp_sell;
        }

        return dp1_buy;
    }
}
```

```go
func maxProfit(prices []int) int {
    n := len(prices)
    dp1_buy, dp1_sell := 0, 0
    dp2_buy := 0

    for i := n - 1; i >= 0; i-- {
        dp_buy := max(dp1_sell - prices[i], dp1_buy)
        dp_sell := max(dp2_buy + prices[i], dp1_sell)
        dp2_buy, dp1_sell = dp1_buy, dp_sell
        dp1_buy = dp_buy
    }

    return dp1_buy
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
        var dp1_buy = 0
        var dp1_sell = 0
        var dp2_buy = 0

        for (i in prices.size - 1 downTo 0) {
            val dp_buy = maxOf(dp1_sell - prices[i], dp1_buy)
            val dp_sell = maxOf(dp2_buy + prices[i], dp1_sell)
            dp2_buy = dp1_buy
            dp1_buy = dp_buy
            dp1_sell = dp_sell
        }

        return dp1_buy
    }
}
```

```swift
class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        let n = prices.count
        var dp1Buy = 0, dp1Sell = 0
        var dp2Buy = 0

        for i in stride(from: n - 1, through: 0, by: -1) {
            let dpBuy = max(dp1Sell - prices[i], dp1Buy)
            let dpSell = max(dp2Buy + prices[i], dp1Sell)
            dp2Buy = dp1Buy
            dp1Buy = dpBuy
            dp1Sell = dpSell
        }

        return dp1Buy
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Forgetting the Cooldown Day After Selling
After selling, you must skip one day before buying again. A common mistake is transitioning directly to the buying state on the next day instead of skipping to `i + 2`.
```python
# Wrong: no cooldown after selling
sell = dfs(i + 1, True) + prices[i]  # Should be i + 2
```

### Confusing the Buying and Selling States
Mixing up which state allows buying versus selling leads to subtracting when you should add (or vice versa). When `buying=True`, you subtract the price; when `buying=False`, you add it.

### Off-by-One Errors in Bottom-Up DP Bounds
When iterating backward and accessing `dp[i + 2]`, forgetting to check bounds causes index out of range errors. The DP table needs size `n + 2` or proper boundary checks.
