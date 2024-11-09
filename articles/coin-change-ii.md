## 1. Recursion

::tabs-start

```python
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        coins.sort()

        def dfs(i, a):
            if a == 0:
                return 1
            if i >= len(coins):
                return 0

            res = 0
            if a >= coins[i]:
                res = dfs(i + 1, a)
                res += dfs(i, a - coins[i])
            return res

        return dfs(0, amount)
```

```java
public class Solution {
    public int change(int amount, int[] coins) {
        Arrays.sort(coins);

        return dfs(coins, 0, amount);
    }

    private int dfs(int[] coins, int i, int a) {
        if (a == 0) {
            return 1;
        }
        if (i >= coins.length) {
            return 0;
        }

        int res = 0;
        if (a >= coins[i]) {
            res = dfs(coins, i + 1, a);
            res += dfs(coins, i, a - coins[i]);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        sort(coins.begin(), coins.end());
        return dfs(coins, 0, amount);
    }

private:
    int dfs(const vector<int>& coins, int i, int a) {
        if (a == 0) {
            return 1;
        }
        if (i >= coins.size()) {
            return 0;
        }

        int res = 0;
        if (a >= coins[i]) {
            res = dfs(coins, i + 1, a);
            res += dfs(coins, i, a - coins[i]);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} amount
     * @param {number[]} coins
     * @return {number}
     */
    change(amount, coins) {
        coins.sort((a, b) => a - b);
    
        const dfs = (i, a) => {
            if (a === 0) return 1;
            if (i >= coins.length) return 0;

            let res = 0;
            if (a >= coins[i]) {
                res = dfs(i + 1, a);
                res += dfs(i, a - coins[i]);
            }
            return res;
        };

        return dfs(0, amount);
    }
}
```

```csharp
public class Solution {
    public int Change(int amount, int[] coins) {
        Array.Sort(coins);
        return Dfs(coins, 0, amount);
    }

    private int Dfs(int[] coins, int i, int a) {
        if (a == 0) {
            return 1;
        }
        if (i >= coins.Length) {
            return 0;
        }

        int res = 0;
        if (a >= coins[i]) {
            res = Dfs(coins, i + 1, a);
            res += Dfs(coins, i, a - coins[i]);
        }
        return res;
    }
}
```

```go
func change(amount int, coins []int) int {
    sort.Ints(coins) 

    var dfs func(i, a int) int
    dfs = func(i, a int) int {
        if a == 0 {
            return 1
        }
        if i >= len(coins) {
            return 0
        }

        res := 0
        if a >= coins[i] {
            res = dfs(i+1, a)
            res += dfs(i, a-coins[i])
        }
        return res
    }

    return dfs(0, amount)
}
```

```kotlin
class Solution {
    fun change(amount: Int, coins: IntArray): Int {
        coins.sort() 

        fun dfs(i: Int, a: Int): Int {
            if (a == 0) {
                return 1
            }
            if (i >= coins.size) {
                return 0
            }

            var res = 0
            if (a >= coins[i]) {
                res = dfs(i + 1, a)
                res += dfs(i, a - coins[i])
            }
            return res
        }

        return dfs(0, amount)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ {max(n, \frac{a}{m})})$
* Space complexity: $O(max(n, \frac{a}{m}))$

> Where $n$ is the number of coins, $a$ is the given amount and $m$ is the minimum value among all the coins.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        coins.sort()
        memo = [[-1] * (amount + 1) for _ in range(len(coins) + 1)]

        def dfs(i, a):
            if a == 0:
                return 1
            if i >= len(coins):
                return 0
            if memo[i][a] != -1:
                return memo[i][a]
            
            res = 0
            if a >= coins[i]:
                res = dfs(i + 1, a)
                res += dfs(i, a - coins[i])

            memo[i][a] = res
            return res

        return dfs(0, amount)
```

```java
public class Solution {
    public int change(int amount, int[] coins) {
        Arrays.sort(coins);
        int[][] memo = new int[coins.length + 1][amount + 1];
        for (int[] row : memo) {
            Arrays.fill(row, -1);
        }

        return dfs(0, amount, coins, memo);
    }

    private int dfs(int i, int a, int[] coins, int[][] memo) {
        if (a == 0) return 1;
        if (i >= coins.length) return 0;
        if (memo[i][a] != -1) return memo[i][a];

        int res = 0;
        if (a >= coins[i]) {
            res = dfs(i + 1, a, coins, memo);
            res += dfs(i, a - coins[i], coins, memo);
        }
        memo[i][a] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        sort(coins.begin(), coins.end());
        vector<vector<int>> memo(coins.size() + 1, 
                            vector<int>(amount + 1, -1));

        return dfs(0, amount, coins, memo);
    }

    int dfs(int i, int a, vector<int>& coins, vector<vector<int>>& memo) {
        if (a == 0) return 1;
        if (i >= coins.size()) return 0;
        if (memo[i][a] != -1) return memo[i][a];

        int res = 0;
        if (a >= coins[i]) {
            res = dfs(i + 1, a, coins, memo);
            res += dfs(i, a - coins[i], coins, memo);
        }
        memo[i][a] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} amount
     * @param {number[]} coins
     * @return {number}
     */
    change(amount, coins) {
        coins.sort((a, b) => a - b);
        let memo = Array.from({ length: coins.length + 1 }, () =>
                   Array(amount + 1).fill(-1));

        const dfs = (i, a) => {
            if (a === 0) return 1;
            if (i >= coins.length) return 0;
            if (memo[i][a] !== -1) return memo[i][a];

            let res = 0;
            if (a >= coins[i]) {
                res = dfs(i + 1, a);
                res += dfs(i, a - coins[i]);
            }
            memo[i][a] = res;
            return res;
        };

        return dfs(0, amount);
    }
}
```

```csharp
public class Solution {
    public int Change(int amount, int[] coins) {
        Array.Sort(coins);
        int[,] memo = new int[coins.Length + 1, amount + 1];
        for (int i = 0; i <= coins.Length; i++) {
            for (int j = 0; j <= amount; j++) {
                memo[i, j] = -1;
            }
        }

        return Dfs(0, amount, coins, memo);
    }

    private int Dfs(int i, int a, int[] coins, int[,] memo) {
        if (a == 0) return 1;
        if (i >= coins.Length) return 0;
        if (memo[i, a] != -1) return memo[i, a];

        int res = 0;
        if (a >= coins[i]) {
            res = Dfs(i + 1, a, coins, memo);
            res += Dfs(i, a - coins[i], coins, memo);
        }
        memo[i, a] = res;
        return res;
    }
}
```

```go
func change(amount int, coins []int) int {
    sort.Ints(coins)
    memo := make([][]int, len(coins) + 1)
    for i := range memo {
        memo[i] = make([]int, amount + 1)
        for j := range memo[i] {
            memo[i][j] = -1
        }
    }

    var dfs func(i, a int) int
    dfs = func(i, a int) int {
        if a == 0 {
            return 1
        }
        if i >= len(coins) {
            return 0
        }
        if memo[i][a] != -1 {
            return memo[i][a]
        }

        res := 0
        if a >= coins[i] {
            res = dfs(i+1, a)
            res += dfs(i, a-coins[i])
        }
        memo[i][a] = res
        return res
    }

    return dfs(0, amount)
}
```

```kotlin
class Solution {
    fun change(amount: Int, coins: IntArray): Int {
        coins.sort()
        val memo = Array(coins.size + 1) { IntArray(amount + 1) { -1 } }

        fun dfs(i: Int, a: Int): Int {
            if (a == 0) {
                return 1
            }
            if (i >= coins.size) {
                return 0
            }
            if (memo[i][a] != -1) return memo[i][a]

            var res = 0
            if (a >= coins[i]) {
                res = dfs(i + 1, a)
                res += dfs(i, a - coins[i])
            }
            memo[i][a] = res
            return res
        }

        return dfs(0, amount)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * a)$
* Space complexity: $O(n * a)$

> Where $n$ is the number of coins and $a$ is the given amount.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        n = len(coins)
        coins.sort()
        dp = [[0] * (amount + 1) for _ in range(n + 1)]
        
        for i in range(n + 1):
            dp[i][0] = 1
        
        for i in range(n - 1, -1, -1):
            for a in range(amount + 1):
                if a >= coins[i]:
                    dp[i][a] = dp[i + 1][a]  
                    dp[i][a] += dp[i][a - coins[i]]  

        return dp[0][amount]
```

```java
public class Solution {
    public int change(int amount, int[] coins) {
        int n = coins.length;
        Arrays.sort(coins);
        int[][] dp = new int[n + 1][amount + 1];

        for (int i = 0; i <= n; i++) {
            dp[i][0] = 1;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int a = 0; a <= amount; a++) {
                if (a >= coins[i]) {
                    dp[i][a] = dp[i + 1][a];
                    dp[i][a] += dp[i][a - coins[i]];
                }
            }
        }

        return dp[0][amount];
    }
}
```

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        sort(coins.begin(), coins.end());
        vector<vector<int>> dp(n + 1, vector<int>(amount + 1, 0));
        
        for (int i = 0; i <= n; i++) {
            dp[i][0] = 1;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int a = 0; a <= amount; a++) {
                if (a >= coins[i]) {
                    dp[i][a] = dp[i + 1][a];
                    dp[i][a] += dp[i][a - coins[i]];
                }
            }
        }

        return dp[0][amount];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} amount
     * @param {number[]} coins
     * @return {number}
     */
    change(amount, coins) {
        coins.sort((a, b) => a - b);
        const n = coins.length;
        const dp = Array.from({ length: n + 1 }, () => Array(amount + 1).fill(0));

        for (let i = 0; i <= n; i++) {
            dp[i][0] = 1;
        }

        for (let i = n - 1; i >= 0; i--) {
            for (let a = 0; a <= amount; a++) {
                if (a >= coins[i]) {
                    dp[i][a] = dp[i + 1][a];
                    dp[i][a] += dp[i][a - coins[i]];
                }
            }
        }

        return dp[0][amount];
    }
}
```

```csharp
public class Solution {
    public int Change(int amount, int[] coins) {
        int n = coins.Length;
        Array.Sort(coins);
        int[,] dp = new int[n + 1, amount + 1];

        for (int i = 0; i <= n; i++) {
            dp[i, 0] = 1;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int a = 0; a <= amount; a++) {
                if (a >= coins[i]) {
                    dp[i, a] = dp[i + 1, a];
                    dp[i, a] += dp[i, a - coins[i]];
                }
            }
        }

        return dp[0, amount];
    }
}
```

```go
func change(amount int, coins []int) int {
    n := len(coins)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, amount+1)
    }

    for i := 0; i <= n; i++ {
        dp[i][0] = 1
    }

    for i := n - 1; i >= 0; i-- {
        for a := 0; a <= amount; a++ {
            if a >= coins[i] {
                dp[i][a] = dp[i+1][a] 
                dp[i][a] += dp[i][a-coins[i]] 
            } else {
                dp[i][a] = dp[i+1][a]
            }
        }
    }

    return dp[0][amount]
}
```

```kotlin
class Solution {
    fun change(amount: Int, coins: IntArray): Int {
        val n = coins.size
        val dp = Array(n + 1) { IntArray(amount + 1) }

        for (i in 0..n) {
            dp[i][0] = 1
        }

        for (i in n - 1 downTo 0) {
            for (a in 0..amount) {
                if (a >= coins[i]) {
                    dp[i][a] = dp[i + 1][a] 
                    dp[i][a] += dp[i][a - coins[i]] 
                } else {
                    dp[i][a] = dp[i + 1][a] 
                }
            }
        }

        return dp[0][amount]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * a)$
* Space complexity: $O(n * a)$

> Where $n$ is the number of coins and $a$ is the given amount.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        dp = [0] * (amount + 1)
        dp[0] = 1
        for i in range(len(coins) - 1, -1, -1):
            nextDP = [0] * (amount + 1)
            nextDP[0] = 1

            for a in range(1, amount + 1):
                nextDP[a] = dp[a]
                if a - coins[i] >= 0:
                    nextDP[a] += nextDP[a - coins[i]]
            dp = nextDP
        return dp[amount]
```

```java
public class Solution {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int i = coins.length - 1; i >= 0; i--) {
            int[] nextDP = new int[amount + 1];
            nextDP[0] = 1;

            for (int a = 1; a <= amount; a++) {
                nextDP[a] = dp[a];
                if (a - coins[i] >= 0) {
                    nextDP[a] += nextDP[a - coins[i]];
                }
            }
            dp = nextDP;
        }
        return dp[amount];
    }
}
```

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0);
        dp[0] = 1;
        for (int i = coins.size() - 1; i >= 0; i--) {
            vector<int> nextDP(amount + 1, 0);
            nextDP[0] = 1;

            for (int a = 1; a <= amount; a++) {
                nextDP[a] = dp[a];
                if (a - coins[i] >= 0) {
                    nextDP[a] += nextDP[a - coins[i]];
                }
            }
            dp = nextDP;
        }
        return dp[amount];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} amount
     * @param {number[]} coins
     * @return {number}
     */
    change(amount, coins) {
        let dp = new Array(amount + 1).fill(0);
        dp[0] = 1;
        for (let i = coins.length - 1; i >= 0; i--) {
            const nextDP = new Array(amount + 1).fill(0);
            nextDP[0] = 1;

            for (let a = 1; a <= amount; a++) {
                nextDP[a] = dp[a];
                if (a - coins[i] >= 0) {
                    nextDP[a] += nextDP[a - coins[i]];
                }
            }
            dp = nextDP;
        }
        return dp[amount];
    }
}
```

```csharp
public class Solution {
    public int Change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int i = coins.Length - 1; i >= 0; i--) {
            int[] nextDP = new int[amount + 1];
            nextDP[0] = 1;

            for (int a = 1; a <= amount; a++) {
                nextDP[a] = dp[a];
                if (a - coins[i] >= 0) {
                    nextDP[a] += nextDP[a - coins[i]];
                }
            }
            dp = nextDP;
        }
        return dp[amount];
    }
}
```

```go
func change(amount int, coins []int) int {
    dp := make([]int, amount+1)
    dp[0] = 1

    for i := len(coins) - 1; i >= 0; i-- {
        nextDP := make([]int, amount+1)
        nextDP[0] = 1

        for a := 1; a <= amount; a++ {
            nextDP[a] = dp[a]
            if a-coins[i] >= 0 {
                nextDP[a] += nextDP[a-coins[i]]
            }
        }
        dp = nextDP
    }

    return dp[amount]
}
```

```kotlin
class Solution {
    fun change(amount: Int, coins: IntArray): Int {
        val dp = IntArray(amount + 1)
        dp[0] = 1

        for (i in coins.size - 1 downTo 0) {
            val nextDP = IntArray(amount + 1)
            nextDP[0] = 1

            for (a in 1..amount) {
                nextDP[a] = dp[a]
                if (a - coins[i] >= 0) {
                    nextDP[a] += nextDP[a - coins[i]]
                }
            }
            System.arraycopy(nextDP, 0, dp, 0, amount + 1)
        }

        return dp[amount]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * a)$
* Space complexity: $O(a)$

> Where $n$ is the number of coins and $a$ is the given amount.

---

## 5. Dynamic Programming (Optimal)

::tabs-start

```python
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        dp = [0] * (amount + 1)
        dp[0] = 1
        for i in range(len(coins) - 1, -1, -1):
            for a in range(1, amount + 1):
                dp[a] += dp[a - coins[i]] if coins[i] <= a else 0
        return dp[amount]
```

```java
public class Solution {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1]; 
        dp[0] = 1;
        for (int i = coins.length - 1; i >= 0; i--)
            for (int a = 1; a <= amount; a++) 
                dp[a] = dp[a] + (coins[i] <= a ? dp[a - coins[i]] : 0);
        return dp[amount]; 
    }
}
```

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0);
        dp[0] = 1;
        for (int i = coins.size() - 1; i >= 0; i--) {
            for (int a = 1; a <= amount; a++) {
                dp[a] = dp[a] + (coins[i] <= a ? dp[a - coins[i]] : 0);
            }
        }
        return dp[amount];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} amount
     * @param {number[]} coins
     * @return {number}
     */
    change(amount, coins) {
        const dp = new Array(amount + 1).fill(0);
        dp[0] = 1;
        for (let i = coins.length - 1; i >= 0; i--) {
            for (let a = 1; a <= amount; a++) {
                dp[a] += (coins[i] <= a ? dp[a - coins[i]] : 0);
            }
        }
        return dp[amount];
    }
}
```

```csharp
public class Solution {
    public int Change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int i = coins.Length - 1; i >= 0; i--) {
            for (int a = 1; a <= amount; a++) {
                dp[a] += (coins[i] <= a ? dp[a - coins[i]] : 0);
            }
        }
        return dp[amount];
    }
}
```

```go
func change(amount int, coins []int) int {
    dp := make([]int, amount+1)
    dp[0] = 1

    for i := len(coins) - 1; i >= 0; i-- {
        for a := 1; a <= amount; a++ {
            if a-coins[i] >= 0 {
                dp[a] += dp[a - coins[i]]
            }
        }
    }

    return dp[amount]
}
```

```kotlin
class Solution {
    fun change(amount: Int, coins: IntArray): Int {
        val dp = IntArray(amount + 1)
        dp[0] = 1

        for (i in coins.size - 1 downTo 0) {
            for (a in 1..amount) {
                if (a - coins[i] >= 0) {
                    dp[a] += dp[a - coins[i]]
                }
            }
        }

        return dp[amount]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * a)$
* Space complexity: $O(a)$

> Where $n$ is the number of coins and $a$ is the given amount.