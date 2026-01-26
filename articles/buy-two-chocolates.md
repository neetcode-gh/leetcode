## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Arrays** - Basic array traversal and accessing elements by index
- **Sorting** - Understanding how sorting works and its time complexity
- **Greedy Algorithms** - Making locally optimal choices to find a global optimum

---

## 1. Brute Force

### Intuition

We want to buy two chocolates and maximize the leftover money, which means we should minimize the total cost of the two chocolates. The brute force approach tries every possible pair of chocolates and keeps track of the maximum leftover (or equivalently, the pair with minimum total cost that we can afford).

### Algorithm

1. Initialize result to `-1` (indicating no valid purchase found yet).
2. For each pair of chocolates `(i, j)` where `i < j`:
   - If the sum of their prices is within our budget, calculate the leftover money.
   - Update result with the maximum leftover found.
3. If no valid pair was found (result is `-1`), return the original money (we buy nothing).
4. Otherwise, return the maximum leftover amount.

::tabs-start

```python
class Solution:
    def buyChoco(self, prices: List[int], money: int) -> int:
        res = -1
        for i in range(len(prices)):
            for j in range(i + 1, len(prices)):
                if prices[i] + prices[j] <= money:
                    res = max(res, money - prices[i] - prices[j])
        return res if res != -1 else money
```

```java
public class Solution {
    public int buyChoco(int[] prices, int money) {
        int res = -1;
        for (int i = 0; i < prices.length; i++) {
            for (int j = i + 1; j < prices.length; j++) {
                if (prices[i] + prices[j] <= money) {
                    res = Math.max(res, money - prices[i] - prices[j]);
                }
            }
        }
        return res == -1 ? money : res;
    }
}
```

```cpp
class Solution {
public:
    int buyChoco(vector<int>& prices, int money) {
        int res = -1;
        for (int i = 0; i < prices.size(); i++) {
            for (int j = i + 1; j < prices.size(); j++) {
                if (prices[i] + prices[j] <= money) {
                    res = max(res, money - prices[i] - prices[j]);
                }
            }
        }
        return res == -1 ? money : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} prices
     * @param {number} money
     * @return {number}
     */
    buyChoco(prices, money) {
        let res = -1;
        for (let i = 0; i < prices.length; i++) {
            for (let j = i + 1; j < prices.length; j++) {
                if (prices[i] + prices[j] <= money) {
                    res = Math.max(res, money - prices[i] - prices[j]);
                }
            }
        }
        return res === -1 ? money : res;
    }
}
```

```csharp
public class Solution {
    public int BuyChoco(int[] prices, int money) {
        int res = -1;
        for (int i = 0; i < prices.Length; i++) {
            for (int j = i + 1; j < prices.Length; j++) {
                if (prices[i] + prices[j] <= money) {
                    res = Math.Max(res, money - prices[i] - prices[j]);
                }
            }
        }
        return res == -1 ? money : res;
    }
}
```

```go
func buyChoco(prices []int, money int) int {
    res := -1
    for i := 0; i < len(prices); i++ {
        for j := i + 1; j < len(prices); j++ {
            if prices[i]+prices[j] <= money {
                if money-prices[i]-prices[j] > res {
                    res = money - prices[i] - prices[j]
                }
            }
        }
    }
    if res == -1 {
        return money
    }
    return res
}
```

```kotlin
class Solution {
    fun buyChoco(prices: IntArray, money: Int): Int {
        var res = -1
        for (i in prices.indices) {
            for (j in i + 1 until prices.size) {
                if (prices[i] + prices[j] <= money) {
                    res = maxOf(res, money - prices[i] - prices[j])
                }
            }
        }
        return if (res == -1) money else res
    }
}
```

```swift
class Solution {
    func buyChoco(_ prices: [Int], _ money: Int) -> Int {
        var res = -1
        for i in 0..<prices.count {
            for j in (i + 1)..<prices.count {
                if prices[i] + prices[j] <= money {
                    res = max(res, money - prices[i] - prices[j])
                }
            }
        }
        return res == -1 ? money : res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Sorting

### Intuition

To maximize leftover money, we need to buy the two cheapest chocolates. After sorting the prices, the two cheapest chocolates will be at the beginning of the array. We just need to check if we can afford them.

### Algorithm

1. Sort the prices array in ascending order.
2. Calculate the cost of buying the two cheapest chocolates (first two elements).
3. If this cost exceeds our money, return the original money (we buy nothing).
4. Otherwise, return money minus the cost of the two chocolates.

::tabs-start

```python
class Solution:
    def buyChoco(self, prices: List[int], money: int) -> int:
        prices.sort()
        buy = prices[0] + prices[1]
        return money if buy > money else money - buy
```

```java
public class Solution {
    public int buyChoco(int[] prices, int money) {
        Arrays.sort(prices);
        int buy = prices[0] + prices[1];
        return buy > money ? money : money - buy;
    }
}
```

```cpp
class Solution {
public:
    int buyChoco(vector<int>& prices, int money) {
        sort(prices.begin(), prices.end());
        int buy = prices[0] + prices[1];
        return buy > money ? money : money - buy;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} prices
     * @param {number} money
     * @return {number}
     */
    buyChoco(prices, money) {
        prices.sort((a, b) => a - b);
        let buy = prices[0] + prices[1];
        return buy > money ? money : money - buy;
    }
}
```

```csharp
public class Solution {
    public int BuyChoco(int[] prices, int money) {
        Array.Sort(prices);
        int buy = prices[0] + prices[1];
        return buy > money ? money : money - buy;
    }
}
```

```go
func buyChoco(prices []int, money int) int {
    sort.Ints(prices)
    buy := prices[0] + prices[1]
    if buy > money {
        return money
    }
    return money - buy
}
```

```kotlin
class Solution {
    fun buyChoco(prices: IntArray, money: Int): Int {
        prices.sort()
        val buy = prices[0] + prices[1]
        return if (buy > money) money else money - buy
    }
}
```

```swift
class Solution {
    func buyChoco(_ prices: [Int], _ money: Int) -> Int {
        let sorted = prices.sorted()
        let buy = sorted[0] + sorted[1]
        return buy > money ? money : money - buy
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Greedy

### Intuition

We can find the two cheapest chocolates in a single pass without sorting. As we iterate through the prices, we maintain the two smallest values seen so far. This gives us the optimal pair to buy.

### Algorithm

1. Initialize two variables to track the smallest (`min1`) and second smallest (`min2`) prices, both set to infinity.
2. Iterate through each price:
   - If the current price is less than `min1`, update `min2` to be the old `min1`, and `min1` to be the current price.
   - Otherwise, if the current price is less than `min2`, update `min2` to be the current price.
3. Calculate the leftover money after buying chocolates at `min1` and `min2` prices.
4. If leftover is non-negative, return it; otherwise, return the original money.

::tabs-start

```python
class Solution:
    def buyChoco(self, prices: list[int], money: int) -> int:
        min1 = min2 = float('inf')

        for p in prices:
            if p < min1:
                min1, min2 = p, min1
            elif p < min2:
                min2 = p

        leftover = money - min1 - min2
        return leftover if leftover >= 0 else money
```

```java
public class Solution {
    public int buyChoco(int[] prices, int money) {
        int min1 = Integer.MAX_VALUE, min2 = Integer.MAX_VALUE;

        for (int p : prices) {
            if (p < min1) {
                min2 = min1;
                min1 = p;
            } else if (p < min2) {
                min2 = p;
            }
        }

        int leftover = money - min1 - min2;
        return leftover >= 0 ? leftover : money;
    }
}
```

```cpp
class Solution {
public:
    int buyChoco(vector<int>& prices, int money) {
        int min1 = INT_MAX, min2 = INT_MAX;

        for (int p : prices) {
            if (p < min1) {
                min2 = min1;
                min1 = p;
            } else if (p < min2) {
                min2 = p;
            }
        }

        int leftover = money - min1 - min2;
        return leftover >= 0 ? leftover : money;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} prices
     * @param {number} money
     * @return {number}
     */
    buyChoco(prices, money) {
        let min1 = Infinity,
            min2 = Infinity;

        for (const p of prices) {
            if (p < min1) {
                min2 = min1;
                min1 = p;
            } else if (p < min2) {
                min2 = p;
            }
        }

        const leftover = money - min1 - min2;
        return leftover >= 0 ? leftover : money;
    }
}
```

```csharp
public class Solution {
    public int BuyChoco(int[] prices, int money) {
        int min1 = int.MaxValue, min2 = int.MaxValue;

        foreach (int p in prices) {
            if (p < min1) {
                min2 = min1;
                min1 = p;
            } else if (p < min2) {
                min2 = p;
            }
        }

        int leftover = money - min1 - min2;
        return leftover >= 0 ? leftover : money;
    }
}
```

```go
func buyChoco(prices []int, money int) int {
    min1, min2 := math.MaxInt32, math.MaxInt32

    for _, p := range prices {
        if p < min1 {
            min2 = min1
            min1 = p
        } else if p < min2 {
            min2 = p
        }
    }

    leftover := money - min1 - min2
    if leftover >= 0 {
        return leftover
    }
    return money
}
```

```kotlin
class Solution {
    fun buyChoco(prices: IntArray, money: Int): Int {
        var min1 = Int.MAX_VALUE
        var min2 = Int.MAX_VALUE

        for (p in prices) {
            if (p < min1) {
                min2 = min1
                min1 = p
            } else if (p < min2) {
                min2 = p
            }
        }

        val leftover = money - min1 - min2
        return if (leftover >= 0) leftover else money
    }
}
```

```swift
class Solution {
    func buyChoco(_ prices: [Int], _ money: Int) -> Int {
        var min1 = Int.max
        var min2 = Int.max

        for p in prices {
            if p < min1 {
                min2 = min1
                min1 = p
            } else if p < min2 {
                min2 = p
            }
        }

        let leftover = money - min1 - min2
        return leftover >= 0 ? leftover : money
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Returning Leftover When You Cannot Afford Both Chocolates
If the sum of the two cheapest chocolates exceeds your money, you should return the original money (buy nothing), not a negative leftover or zero.
```python
# Wrong: returning negative leftover
return money - min1 - min2  # Could be negative
# Correct: check if affordable first
```

### Not Updating Both Minimums Correctly
When finding a new smallest price, forgetting to shift the old minimum to become the second minimum loses track of valid candidates.
```python
# Wrong: losing second minimum
if p < min1:
    min1 = p  # min2 is never updated with old min1
```
