## 1. Recursion

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
