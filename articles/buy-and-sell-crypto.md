## 1. Brute Force

### Intuition

The brute-force approach checks every possible buy–sell pair.  
For each day, we pretend to buy the stock, and then we look at all the future days to see what the best selling price would be.  
Among all these profits, we keep the highest one.

### Algorithm

1. Initialize `res = 0` to store the maximum profit.
2. Loop through each day `i` as the buy day.
3. For each buy day, loop through each day `j > i` as the sell day.
4. Calculate the profit `prices[j] - prices[i]` and update `res`.
5. Return `res` after checking all pairs.

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

```swift
class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        var res = 0
        for i in 0..<prices.count {
            let buy = prices[i]
            for j in (i + 1)..<prices.count {
                let sell = prices[j]
                res = max(res, sell - buy)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Two Pointers

### Intuition

We want to buy at a low price and sell at a higher price that comes **after** it.  
Using two pointers helps us track this efficiently:

- `l` is the **buy day** (looking for the lowest price)
- `r` is the **sell day** (looking for a higher price)

If the price at `r` is higher than at `l`, we can make a profit — so we update the maximum.
If the price at `r` is lower, then `r` becomes the new `l` because a cheaper buying price is always better.

By moving the pointers this way, we scan the list once and always keep the best buying opportunity.

### Algorithm

1. Set two pointers:
   - `l = 0` (buy day)
   - `r = 1` (sell day)
   - `maxP = 0` to track maximum profit
2. While `r` is within the array:
   - If `prices[r] > prices[l]`, compute the profit and update `maxP`.
   - Otherwise, move `l` to `r` (we found a cheaper buy price).
   - Move `r` to the next day.
3. Return `maxP` at the end.

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
        let l = 0,
            r = 1;
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

```swift
class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        var l = 0, r = 1
        var maxP = 0

        while r < prices.count {
            if prices[l] < prices[r] {
                let profit = prices[r] - prices[l]
                maxP = max(maxP, profit)
            } else {
                l = r
            }
            r += 1
        }
        return maxP
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Dynamic Programming

### Intuition

As we scan through the prices, we keep track of two things:

1. **The lowest price so far** → this is the best day to buy.
2. **The best profit so far** → selling today minus the lowest buy price seen earlier.

At each price, we imagine selling on that day.  
The profit would be:  
`current price – lowest price seen so far`

We then update:
- the maximum profit,
- and the lowest price if we find a cheaper one.

This way, we make the optimal buy–sell decision in one simple pass.

### Algorithm

1. Initialize:
   - `minBuy` as the first price
   - `maxP = 0` for the best profit
2. Loop through each price `sell`:
   - Update `maxP` with `sell - minBuy`.
   - Update `minBuy` if we find a smaller price.
3. Return `maxP` after scanning all days.

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

```swift
class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        var maxP = 0
        var minBuy = prices[0]

        for sell in prices {
            maxP = max(maxP, sell - minBuy)
            minBuy = min(minBuy, sell)
        }
        return maxP
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
