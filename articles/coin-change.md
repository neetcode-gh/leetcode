## 1. Recursion

::tabs-start

```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        
        def dfs(amount):
            if amount == 0:
                return 0
            
            res = 1e9
            for coin in coins:
                if amount - coin >= 0:
                    res = min(res, 1 + dfs(amount - coin))
            return res

        minCoins = dfs(amount)
        return -1 if minCoins >= 1e9 else minCoins
```

```java
public class Solution {
    public int dfs(int[] coins, int amount) {
        if (amount == 0) return 0;

        int res = (int) 1e9;
        for (int coin : coins) {
            if (amount - coin >= 0) {
                res = Math.min(res, 
                      1 + dfs(coins, amount - coin));
            }
        }
        return res;
    }

    public int coinChange(int[] coins, int amount) {
        int minCoins = dfs(coins, amount);
        return (minCoins >= 1e9) ? -1 : minCoins;
    }
}
```

```cpp
class Solution {
public:
    int dfs(vector<int>& coins, int amount) {
        if (amount == 0) return 0;
        
        int res = 1e9;
        for (int coin : coins) {
            if (amount - coin >= 0) {
                res = min(res, 
                      1 + dfs(coins, amount - coin));
            }
        }
        return res;
    }

    int coinChange(vector<int>& coins, int amount) {
        int minCoins = dfs(coins, amount);
        return (minCoins >= 1e9) ? -1 : minCoins;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} coins
     * @param {number} amount
     * @return {number}
     */
    coinChange(coins, amount) {

        const dfs = (amount) => {
            if (amount === 0) return 0;

            let res = Infinity;
            for (let coin of coins) {
                if (amount - coin >= 0) {
                    res = Math.min(res, 
                          1 + dfs(amount - coin));
                }
            }
            return res;
        }

        const minCoins = dfs(amount);
        return minCoins === Infinity ? -1 : minCoins;
    }
}
```

```csharp
public class Solution {
    public int Dfs(int[] coins, int amount) {
        if (amount == 0) return 0;

        int res = (int)1e9;
        foreach (var coin in coins) {
            if (amount - coin >= 0) {
                res = Math.Min(res, 
                      1 + Dfs(coins, amount - coin));
            }
        }
        return res;
    }

    public int CoinChange(int[] coins, int amount) {
        int minCoins = Dfs(coins, amount);
        return (minCoins >= 1e9) ? -1 : minCoins;
    }
}
```

```go
func coinChange(coins []int, amount int) int {
    var dfs func(int) int
    dfs = func(amt int) int {
        if amt == 0 {
            return 0
        }
        
        res := math.MaxInt32
        for _, coin := range coins {
            if amt - coin >= 0 {
                res = min(res, 1 + dfs(amt - coin))
            }
        }
        
        return res
    }

    minCoins := dfs(amount)
    if minCoins >= math.MaxInt32 {
        return -1
    }
    return minCoins
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun coinChange(coins: IntArray, amount: Int): Int {
        val INF = 1000000000
        fun dfs(amt: Int): Int {
            if (amt == 0) return 0

            var res = INF
            for (coin in coins) {
                if (amt - coin >= 0) {
                    res = minOf(res, 1 + dfs(amt - coin))
                }
            }
            return res
        }

        val minCoins = dfs(amount)
        return if (minCoins >= INF) -1 else minCoins
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ t)$
* Space complexity: $O(t)$

> Where $n$ is the length of the array $coins$ and $t$ is the given $amount$.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        memo = {}

        def dfs(amount):
            if amount == 0:
                return 0
            if amount in memo:
                return memo[amount]
            
            res = 1e9
            for coin in coins:
                if amount - coin >= 0:
                    res = min(res, 1 + dfs(amount - coin))
            
            memo[amount] = res
            return res
        
        minCoins = dfs(amount)
        return -1 if minCoins >= 1e9 else minCoins
```

```java
public class Solution {
    HashMap<Integer, Integer> memo = new HashMap<>();

    public int dfs(int amount, int[] coins) {
        if (amount == 0) return 0;
        if (memo.containsKey(amount)) 
            return memo.get(amount);

        int res = Integer.MAX_VALUE;
        for (int coin : coins) {
            if (amount - coin >= 0) {
                int result = dfs(amount - coin, coins);
                if (result != Integer.MAX_VALUE) {
                    res = Math.min(res, 1 + result);
                }
            }
        }
        
        memo.put(amount, res);
        return res;
    }

    public int coinChange(int[] coins, int amount) {
        int minCoins = dfs(amount, coins);
        return minCoins == Integer.MAX_VALUE ? -1 : minCoins;
    }
}
```

```cpp
class Solution {
public:
    unordered_map<int, int> memo;
    int dfs(int amount, vector<int>& coins) {
        if (amount == 0) return 0;
        if (memo.find(amount) != memo.end()) 
            return memo[amount];

        int res = INT_MAX;
        for (int coin : coins) {
            if (amount - coin >= 0) {
                int result = dfs(amount - coin, coins);
                if (result != INT_MAX) {
                    res = min(res, 1 + result);
                }
            }
        }
        
        memo[amount] = res;
        return res;
    }

    int coinChange(vector<int>& coins, int amount) {
        int minCoins = dfs(amount, coins);
        return minCoins == INT_MAX ? -1 : minCoins;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} coins
     * @param {number} amount
     * @return {number}
     */
    coinChange(coins, amount) {
        let memo = {};

        const dfs = (amount) => {
            if (amount === 0) return 0;
            if (memo[amount] !== undefined) 
                return memo[amount];

            let res = Infinity;
            for (let coin of coins) {
                if (amount - coin >= 0) {
                    res = Math.min(res, 1 + dfs(amount - coin));
                }
            }

            memo[amount] = res;
            return res;
        }

        const minCoins = dfs(amount);
        return minCoins === Infinity ? -1 : minCoins;
    }
}
```

```csharp
public class Solution {
    private Dictionary<int, int> memo = new Dictionary<int, int>();

    private int Dfs(int amount, int[] coins) {
        if (amount == 0) return 0;
        if (memo.ContainsKey(amount)) 
            return memo[amount];

        int res = int.MaxValue;
        foreach (int coin in coins) {
            if (amount - coin >= 0) {
                int result = Dfs(amount - coin, coins);
                if (result != int.MaxValue) {
                    res = Math.Min(res, 1 + result);
                }
            }
        }
        
        memo[amount] = res;
        return res;
    }

    public int CoinChange(int[] coins, int amount) {
        int minCoins = Dfs(amount, coins);
        return minCoins == int.MaxValue ? -1 : minCoins;
    }
}
```

```go
func coinChange(coins []int, amount int) int {
    var memo = make(map[int]int)
    memo[0] = 0

    var dfs func(int) int
    dfs = func(amt int) int {
        if val, ok := memo[amt]; ok {
            return val
        }
        
        res := math.MaxInt32
        for _, coin := range coins {
            if amt - coin >= 0 {
                res = min(res, 1 + dfs(amt - coin))
            }
        }
        memo[amt] = res
        return res
    }

    minCoins := dfs(amount)
    if minCoins >= math.MaxInt32 {
        return -1
    }
    return minCoins
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun coinChange(coins: IntArray, amount: Int): Int {
        val INF = 1000000000
        var memo = hashMapOf(0 to 0)

        fun dfs(amt: Int): Int {
            if (amt in memo) {
                return memo[amt]!!
            }

            var res = INF
            for (coin in coins) {
                if (amt - coin >= 0) {
                    res = minOf(res, 1 + dfs(amt - coin))
                }
            }
            memo[amt] = res
            return res
        }

        val minCoins = dfs(amount)
        return if (minCoins >= INF) -1 else minCoins
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * t)$
* Space complexity: $O(t)$

> Where $n$ is the length of the array $coins$ and $t$ is the given $amount$.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [amount + 1] * (amount + 1)
        dp[0] = 0

        for a in range(1, amount + 1):
            for c in coins:
                if a - c >= 0:
                    dp[a] = min(dp[a], 1 + dp[a - c])
        return dp[amount] if dp[amount] != amount + 1 else -1
```

```java
public class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int j = 0; j < coins.length; j++) {
                if (coins[j] <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
```

```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int j = 0; j < coins.size(); j++) {
                if (coins[j] <= i) {
                    dp[i] = min(dp[i], dp[i - coins[j]] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} coins
     * @param {number} amount
     * @return {number}
     */
    coinChange(coins, amount) {
        const dp = new Array(amount + 1).fill(amount + 1);
        dp[0] = 0;
        for (let i = 1; i <= amount; i++) {
            for (let j = 0; j < coins.length; j++) {
                if (coins[j] <= i) {
                    dp[i] = Math.min(dp[i], 1 + dp[i - coins[j]]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
```

```csharp
public class Solution {
    public int CoinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Array.Fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            foreach (int coin in coins) {
                if (coin <= i) {
                    dp[i] = Math.Min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
```

```go
func coinChange(coins []int, amount int) int {
    dp := make([]int, amount+1)
    for i := range dp {
        dp[i] = amount + 1
    }
    dp[0] = 0
    for a := 1; a <= amount; a++ {
        for _, c := range coins {
            if a-c >= 0 {
                dp[a] = min(dp[a], 1+dp[a-c])
            }
        }
    }
    if dp[amount] > amount {
        return -1
    }
    return dp[amount]
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun coinChange(coins: IntArray, amount: Int): Int {
        val dp = IntArray(amount + 1) { amount + 1 }
        dp[0] = 0
        for (a in 1..amount) {
            for (c in coins) {
                if (a - c >= 0) {
                    dp[a] = minOf(dp[a], 1 + dp[a - c])
                }
            }
        }
        return if (dp[amount] > amount) -1 else dp[amount]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * t)$
* Space complexity: $O(t)$

> Where $n$ is the length of the array $coins$ and $t$ is the given $amount$.

---

## 4. Breadth First Search

::tabs-start

```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        if amount == 0:
            return 0

        q = deque([0])
        seen = [False] * (amount + 1)
        seen[0] = True
        res = 0  

        while q:
            res += 1
            for _ in range(len(q)):
                cur = q.popleft()
                for coin in coins:
                    nxt = cur + coin
                    if nxt == amount:
                        return res
                    if nxt > amount or seen[nxt]:
                        continue
                    seen[nxt] = True
                    q.append(nxt)

        return -1
```

```java
public class Solution {
    public int coinChange(int[] coins, int amount) {
        if (amount == 0) return 0;

        Queue<Integer> q = new LinkedList<>();
        q.add(0);
        boolean[] seen = new boolean[amount + 1];
        seen[0] = true;
        int res = 0;

        while (!q.isEmpty()) {
            res++;
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int cur = q.poll();
                for (int coin : coins) {
                    int nxt = cur + coin;
                    if (nxt == amount) return res;
                    if (nxt > amount || seen[nxt]) continue;
                    seen[nxt] = true;
                    q.add(nxt);
                }
            }
        }

        return -1;
    }
}
```

```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        if (amount == 0) return 0;

        queue<int> q;
        q.push(0);
        vector<bool> seen(amount + 1, false);
        seen[0] = true;
        int res = 0;

        while (!q.empty()) {
            res++;
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int cur = q.front();
                q.pop();
                for (int coin : coins) {
                    int nxt = cur + coin;
                    if (nxt == amount) return res;
                    if (nxt > amount || seen[nxt]) continue;
                    seen[nxt] = true;
                    q.push(nxt);
                }
            }
        }

        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} coins
     * @param {number} amount
     * @return {number}
     */
    coinChange(coins, amount) {
        if (amount === 0) return 0;

        const q = new Queue([0]);
        const seen = new Array(amount + 1).fill(false);
        seen[0] = true;
        let res = 0;

        while (!q.isEmpty()) {
            res++;
            const size = q.size();
            for (let i = 0; i < size; i++) {
                const cur = q.pop();
                for (const coin of coins) {
                    const nxt = cur + coin;
                    if (nxt === amount) return res;
                    if (nxt > amount || seen[nxt]) continue;
                    seen[nxt] = true;
                    q.push(nxt);
                }
            }
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int CoinChange(int[] coins, int amount) {
        if (amount == 0) return 0;

        Queue<int> q = new Queue<int>();
        q.Enqueue(0);
        bool[] seen = new bool[amount + 1];
        seen[0] = true;
        int res = 0;

        while (q.Count > 0) {
            res++;
            int size = q.Count;
            for (int i = 0; i < size; i++) {
                int cur = q.Dequeue();
                foreach (int coin in coins) {
                    int nxt = cur + coin;
                    if (nxt == amount) return res;
                    if (nxt > amount || seen[nxt]) continue;
                    seen[nxt] = true;
                    q.Enqueue(nxt);
                }
            }
        }

        return -1;
    }
}
```

```go
func coinChange(coins []int, amount int) int {
    if amount == 0 {
        return 0
    }
    queue := []int{0}
    seen := make([]bool, amount+1)
    seen[0] = true
    res := 0
    for len(queue) > 0 {
        res++
        size := len(queue)
        for i := 0; i < size; i++ {
            cur := queue[0]
            queue = queue[1:]
            for _, coin := range coins {
                next := cur + coin
                if next == amount {
                    return res
                }
                if next > amount || seen[next] {
                    continue
                }
                seen[next] = true
                queue = append(queue, next)
            }
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun coinChange(coins: IntArray, amount: Int): Int {
        if (amount == 0) return 0
        val queue = ArrayDeque<Int>().apply { add(0) }
        val seen = BooleanArray(amount + 1) { false }
        seen[0] = true
        var res = 0
        while (queue.isNotEmpty()) {
            res++
            repeat(queue.size) {
                val cur = queue.removeFirst()
                for (coin in coins) {
                    val next = cur + coin
                    if (next == amount) return res
                    if (next > amount || seen[next]) continue
                    seen[next] = true
                    queue.addLast(next)
                }
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * t)$
* Space complexity: $O(t)$

> Where $n$ is the length of the array $coins$ and $t$ is the given $amount$.