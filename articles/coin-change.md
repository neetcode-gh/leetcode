## 1. Recursion

### Intuition
This is the **pure recursive brute-force approach**.

For a given `amount`, we try **every coin**:
- Pick one coin
- Solve the remaining subproblem `amount - coin`
- Take the minimum coins needed among all choices

We explore **all possible combinations**, which leads to many repeated subproblems and exponential time — this solution is correct but inefficient.

If no combination reaches exactly `0`, we treat it as invalid using a very large number.

### Algorithm
1. Define a recursive function `dfs(amount)`:
   - If `amount == 0`, return `0` (no coins needed)
2. Initialize `res` as a very large value
3. For each coin:
   - If `amount - coin >= 0`
     - Recursively compute `1 + dfs(amount - coin)`
     - Update `res` with the minimum
4. Return `res`
5. If the final result is still very large, return `-1`, else return the result

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
                    res = Math.min(res, 1 + dfs(amount - coin));
                }
            }
            return res;
        };

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

```swift
class Solution {
    func coinChange(_ coins: [Int], _ amount: Int) -> Int {
        func dfs(_ amount: Int) -> Int {
            if amount == 0 {
                return 0
            }

            var res = Int(1e9)
            for coin in coins {
                if amount - coin >= 0 {
                    res = min(res, 1 + dfs(amount - coin))
                }
            }
            return res
        }

        let minCoins = dfs(amount)
        return minCoins >= Int(1e9) ? -1 : minCoins
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ t)$
- Space complexity: $O(t)$

> Where $n$ is the length of the array $coins$ and $t$ is the given $amount$.

---

## 2. Dynamic Programming (Top-Down)

### Intuition
This is the **optimized version of the brute-force recursion** using **memoization**.

The key observation is that the same `amount` gets solved **multiple times** in recursion.  
So instead of recomputing it, we **store the result** the first time and reuse it.

Each `amount` represents a subproblem:  
> *Minimum coins needed to make this amount*

### Algorithm
1. Use a hashmap `memo` to store results for already computed amounts
2. Define `dfs(amount)`:
   - If `amount == 0`, return `0`
   - If `amount` exists in `memo`, return it
3. Try every coin:
   - If `amount - coin >= 0`
     - Compute `1 + dfs(amount - coin)`
     - Track the minimum
4. Store the result in `memo[amount]`
5. Return the stored value
6. If the final answer is still very large, return `-1`

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
            if (memo[amount] !== undefined) return memo[amount];

            let res = Infinity;
            for (let coin of coins) {
                if (amount - coin >= 0) {
                    res = Math.min(res, 1 + dfs(amount - coin));
                }
            }

            memo[amount] = res;
            return res;
        };

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

```swift
class Solution {
    func coinChange(_ coins: [Int], _ amount: Int) -> Int {
        var memo = [Int: Int]()

        func dfs(_ amount: Int) -> Int {
            if amount == 0 {
                return 0
            }
            if let cached = memo[amount] {
                return cached
            }

            var res = Int(1e9)
            for coin in coins {
                if amount - coin >= 0 {
                    res = min(res, 1 + dfs(amount - coin))
                }
            }

            memo[amount] = res
            return res
        }

        let minCoins = dfs(amount)
        return minCoins >= Int(1e9) ? -1 : minCoins
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * t)$
- Space complexity: $O(t)$

> Where $n$ is the length of the array $coins$ and $t$ is the given $amount$.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition
This is the **bottom-up DP version** of Coin Change.

Instead of asking *“how many coins to make this amount?”* recursively, we **build answers from smaller amounts to larger ones**.

Key idea:
- If we know the minimum coins to make `a - coin`,
- then we can make `a` using **1 extra coin**.

So each amount depends on **previously solved smaller amounts**.

### Algorithm
1. Create a DP array `dp` where `dp[a]` = minimum coins needed to make amount `a`
2. Initialize:
   - `dp[0] = 0` (0 coins to make amount 0)
   - All other values as a large number (`amount + 1`)
3. For every amount `a` from `1` to `amount`:
   - For each coin `c`:
     - If `a - c >= 0`
       - Update `dp[a] = min(dp[a], 1 + dp[a - c])`
4. If `dp[amount]` is still large, return `-1`
5. Otherwise return `dp[amount]`

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

```swift
class Solution {
    func coinChange(_ coins: [Int], _ amount: Int) -> Int {
        if amount == 0 {
            return 0
        }

        var dp = [Int](repeating: amount + 1, count: amount + 1)
        dp[0] = 0

        for a in 1...amount {
            for coin in coins {
                if a - coin >= 0 {
                    dp[a] = min(dp[a], 1 + dp[a - coin])
                }
            }
        }

        return dp[amount] == amount + 1 ? -1 : dp[amount]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * t)$
- Space complexity: $O(t)$

> Where $n$ is the length of the array $coins$ and $t$ is the given $amount$.

---

## 4. Breadth First Search

### Intuition
Think of each **amount** as a node in a graph.

- From a current amount `x`, you can go to `x + coin` for every coin.
- Each edge represents **using one coin**.
- We want the **minimum number of coins**, which means the **shortest path** from `0` to `amount`.

This makes the problem a **shortest path in an unweighted graph**, so **Breadth First Search (BFS)** is a natural fit.

BFS explores level by level:
- Level 1 → amounts reachable using 1 coin
- Level 2 → amounts reachable using 2 coins
- First time we reach `amount`, we’ve used the minimum coins.

### Algorithm
1. If `amount == 0`, return `0`
2. Initialize a queue with `0` (starting amount)
3. Use a `seen` array to avoid revisiting amounts
4. Set `steps = 0`
5. While the queue is not empty:
   - Increment `steps` (represents number of coins used)
   - For each element in the current level:
     - Try adding every coin
     - If `current + coin == amount`, return `steps`
     - If within bounds and unseen, mark seen and push into queue
6. If BFS finishes without reaching `amount`, return `-1`

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

```swift
class Solution {
    func coinChange(_ coins: [Int], _ amount: Int) -> Int {
        if amount == 0 {
            return 0
        }

        var q = Deque([0])
        var seen = Array(repeating: false, count: amount + 1)
        seen[0] = true
        var res = 0

        while !q.isEmpty {
            res += 1
            for _ in 0..<q.count {
                let cur = q.popFirst()!
                for coin in coins {
                    let nxt = cur + coin
                    if nxt == amount {
                        return res
                    }
                    if nxt > amount || seen[nxt] {
                        continue
                    }
                    seen[nxt] = true
                    q.append(nxt)
                }
            }
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * t)$
- Space complexity: $O(t)$

> Where $n$ is the length of the array $coins$ and $t$ is the given $amount$.
