## 1. Recursion

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
        }
        
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ n)$
* Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

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
        }
        
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

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
                    let sell = (i + 2 < n) ? dp[i + 2][1] + prices[i] : prices[i];
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

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
            dp2_buy, dp1_sell = dp1_buy, dp1_sell
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
            dp1_sell = dp1_sell;
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
            dp1_sell = dp1_sell;
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
        let dp1_buy = 0, dp1_sell = 0;
        let dp2_buy = 0;

        for (let i = n - 1; i >= 0; i--) {
            let dp_buy = Math.max(dp1_sell - prices[i], dp1_buy);
            let dp_sell = Math.max(dp2_buy + prices[i], dp1_sell);
            dp2_buy = dp1_buy;
            dp1_sell = dp1_sell;
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
            dp1_sell = dp1_sell;
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$