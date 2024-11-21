## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        res = 0
        for i in range(len(prices)):
            buy = prices[i]
            for j in range(i + 1, len(prices)):
                sell  = prices[j]
                res = max(res, sell - buy)
        return res
```

```java
public class Solution {
    public int maxProfit(int[] prices) {
        int res = 0;
        for (int i = 0; i < prices.length; i++) {
            int buy = prices[i];
            for (int j = i + 1; j < prices.length; j++) {
                int sell = prices[j];
                res = Math.max(res, sell - buy);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int res = 0;
        for (int i = 0; i < prices.size(); i++) {
            int buy = prices[i];
            for (int j = i + 1; j < prices.size(); j++) {
                int sell = prices[j];
                res = max(res, sell - buy);
            }
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
        let res = 0;
        for (let i = 0; i < prices.length; i++) {
            let buy = prices[i];
            for (let j = i + 1; j < prices.length; j++) {
                let sell = prices[j];
                res = Math.max(res, sell - buy);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxProfit(int[] prices) {
        int res = 0;
        for (int i = 0; i < prices.Length; i++) {
            int buy = prices[i];
            for (int j = i + 1; j < prices.Length; j++) {
                int sell = prices[j];
                res = Math.Max(res, sell - buy);
            }
        }
        return res;
    }
}
```

```go
func maxProfit(prices []int) int {
    res := 0
    for i := 0; i < len(prices); i++ {
        buy := prices[i]
        for j := i + 1; j < len(prices); j++ {
            sell := prices[j]
            res = max(res, sell - buy)
        }
    }
    return res
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
        var res = 0
        for (i in prices.indices) {
            val buy = prices[i]
            for (j in i + 1 until prices.size) {
                val sell = prices[j]
                res = maxOf(res, sell - buy)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Two Pointers

::tabs-start

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        l, r = 0, 1
        maxP = 0

        while r < len(prices):
            if prices[l] < prices[r]:
                profit = prices[r] - prices[l]
                maxP = max(maxP, profit)
            else:
                l = r
            r += 1
        return maxP
```

```java
public class Solution {
    public int maxProfit(int[] prices) {
        int l = 0, r = 1;
        int maxP = 0;

        while (r < prices.length) {
            if (prices[l] < prices[r]) {
                int profit = prices[r] - prices[l];
                maxP = Math.max(maxP, profit);
            } else {
                l = r;
            }
            r++;
        }
        return maxP;
    }
}
```

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int l = 0, r = 1;
        int maxP = 0;

        while (r < prices.size()) {
            if (prices[l] < prices[r]) {
                int profit = prices[r] - prices[l];
                maxP = max(maxP, profit);
            } else {
                l = r;
            }
            r++;
        }
        return maxP;
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
        let l = 0, r = 1;
        let maxP = 0;

        while (r < prices.length) {
            if (prices[l] < prices[r]) {
                let profit = prices[r] - prices[l];
                maxP = Math.max(maxP, profit);
            } else {
                l = r;
            }
            r++;
        }
        return maxP;
    }
}
```

```csharp
public class Solution {
    public int MaxProfit(int[] prices) {
        int l = 0, r = 1;
        int maxP = 0;

        while (r < prices.Length) {
            if (prices[l] < prices[r]) {
                int profit = prices[r] - prices[l];
                maxP = Math.Max(maxP, profit);
            } else {
                l = r;
            }
            r++;
        }
        return maxP;
    }
}
```

```go
func maxProfit(prices []int) int {
    l, r := 0, 1
    maxP := 0

    for r < len(prices) {
        if prices[l] < prices[r] {
            profit := prices[r] - prices[l]
            if profit > maxP {
                maxP = profit
            }
        } else {
            l = r
        }
        r++
    }
    return maxP
}
```

```kotlin
class Solution {
    fun maxProfit(prices: IntArray): Int {
        var l = 0
        var r = 1
        var maxP = 0

        while (r < prices.size) {
            if (prices[l] < prices[r]) {
                val profit = prices[r] - prices[l]
                maxP = maxOf(maxP, profit)
            } else {
                l = r
            }
            r++
        }
        return maxP
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 3. Dynamic Programming

::tabs-start

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        maxP = 0
        minBuy = prices[0]

        for sell in prices:
            maxP = max(maxP, sell - minBuy)
            minBuy = min(minBuy, sell)
        return maxP
```

```java
public class Solution {
    public int maxProfit(int[] prices) {
        int maxP = 0;
        int minBuy = prices[0];

        for (int sell : prices) {
            maxP = Math.max(maxP, sell - minBuy);
            minBuy = Math.min(minBuy, sell);
        }
        return maxP;
    }
}
```

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int maxP = 0;
        int minBuy = prices[0];

        for (int& sell : prices) {
            maxP = max(maxP, sell - minBuy);
            minBuy = min(minBuy, sell);
        }
        return maxP;
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
        let maxP = 0;
        let minBuy = prices[0];

        for (let sell of prices) {
            maxP = Math.max(maxP, sell - minBuy);
            minBuy = Math.min(minBuy, sell);
        }
        return maxP;
    }
}
```

```csharp
public class Solution {
    public int MaxProfit(int[] prices) {
        int maxP = 0;
        int minBuy = prices[0];

        foreach (int sell in prices) {
            maxP = Math.Max(maxP, sell - minBuy);
            minBuy = Math.Min(minBuy, sell);
        }
        return maxP;
    }
}
```

```go
func maxProfit(prices []int) int {
    maxP := 0
    minBuy := math.MaxInt32

    for _, sell := range prices {
        if sell - minBuy > maxP {
            maxP = sell - minBuy
        }
        if sell < minBuy {
            minBuy = sell
        }
    }
    return maxP
}
```

```kotlin
class Solution {
    fun maxProfit(prices: IntArray): Int {
        var maxP = 0
        var minBuy = Int.MAX_VALUE

        for (sell in prices) {
            maxP = maxOf(maxP, sell - minBuy)
            minBuy = minOf(minBuy, sell)
        }
        return maxP
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$