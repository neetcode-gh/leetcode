## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Sorting

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Greedy

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
