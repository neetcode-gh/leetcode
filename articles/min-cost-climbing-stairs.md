## 1. Recursion

::tabs-start

```python
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        
        def dfs(i):
            if i >= len(cost):
                return 0
            return cost[i] + min(dfs(i + 1), dfs(i + 2))
        
        return min(dfs(0), dfs(1))
```

```java
public class Solution {
    public int minCostClimbingStairs(int[] cost) {
        
        return Math.min(dfs(cost, 0), dfs(cost, 1));
    }
    
    private int dfs(int[] cost, int i) {
        if (i >= cost.length) {
            return 0;
        }
        return cost[i] + Math.min(dfs(cost, i + 1),
                                  dfs(cost, i + 2));
    }
}
```

```cpp
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        return min(dfs(cost, 0), dfs(cost, 1));
    }
    
    int dfs(vector<int>& cost, int i) {
        if (i >= cost.size()) {
            return 0;
        }
        return cost[i] + min(dfs(cost, i + 1),
                             dfs(cost, i + 2));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @return {number}
     */
    minCostClimbingStairs(cost) {
        const dfs = (i) => {
            if (i >= cost.length) {
                return 0;
            }
            return cost[i] + Math.min(dfs(i + 1), dfs(i + 2));
        }
        return Math.min(dfs(0), dfs(1));
    }
}
```

```csharp
public class Solution {
    public int MinCostClimbingStairs(int[] cost) {
        return Math.Min(Dfs(cost, 0), Dfs(cost, 1));
    }
    
    private int Dfs(int[] cost, int i) {
        if (i >= cost.Length) {
            return 0;
        }
        return cost[i] + Math.Min(Dfs(cost, i + 1),
                                  Dfs(cost, i + 2));
    }
}
```

```go
func minCostClimbingStairs(cost []int) int {
    var dfs func(i int) int
    dfs = func(i int) int {
        if i >= len(cost) {
            return 0
        }
        return cost[i] + min(dfs(i+1), dfs(i+2))
    }
    
    return min(dfs(0), dfs(1))
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
    fun minCostClimbingStairs(cost: IntArray): Int {
        fun dfs(i: Int): Int {
            if (i >= cost.size) {
                return 0
            }
            return cost[i] + minOf(dfs(i + 1), dfs(i + 2))
        }
        
        return minOf(dfs(0), dfs(1))
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
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        memo = [-1] * len(cost)
        
        def dfs(i):
            if i >= len(cost):
                return 0
            if memo[i] != -1:
                return memo[i]
            memo[i] = cost[i] + min(dfs(i + 1), dfs(i + 2))
            return memo[i]
        
        return min(dfs(0), dfs(1))
```

```java
public class Solution {
    int[] memo;
    
    public int minCostClimbingStairs(int[] cost) {
        memo = new int[cost.length];
        Arrays.fill(memo, -1);
        return Math.min(dfs(cost, 0), dfs(cost, 1));
    }
    
    private int dfs(int[] cost, int i) {
        if (i >= cost.length) {
            return 0;
        }
        if (memo[i] != -1) {
            return memo[i];
        }
        memo[i] = cost[i] + Math.min(dfs(cost, i + 1),
                                     dfs(cost, i + 2));
        return memo[i];
    }
}
```

```cpp
class Solution {
public:
    vector<int> memo;
    
    int minCostClimbingStairs(vector<int>& cost) {
        memo.resize(cost.size(), -1);
        return min(dfs(cost, 0), dfs(cost, 1));
    }
    
    int dfs(vector<int>& cost, int i) {
        if (i >= cost.size()) {
            return 0;
        }
        if (memo[i] != -1) {
            return memo[i];
        }
        memo[i] = cost[i] + min(dfs(cost, i + 1),
                                dfs(cost, i + 2));
        return memo[i];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @return {number}
     */
    minCostClimbingStairs(cost) {
        const memo = new Int32Array(cost.length).fill(-1);
        const dfs = (i) => {
            if (i >= cost.length) {
                return 0;
            }
            if (memo[i] !== -1) {
                return memo[i];
            }
            memo[i] = cost[i] + Math.min(dfs(i + 1),
                                         dfs(i + 2));
            return memo[i];
        }
        return Math.min(dfs(0), dfs(1));
    }
}
```

```csharp
public class Solution {
    int[] memo;
    
    public int MinCostClimbingStairs(int[] cost) {
        memo = new int[cost.Length];
        Array.Fill(memo, -1);
        return Math.Min(Dfs(cost, 0), Dfs(cost, 1));
    }
    
    private int Dfs(int[] cost, int i) {
        if (i >= cost.Length) {
            return 0;
        }
        if (memo[i] != -1) {
            return memo[i];
        }
        memo[i] = cost[i] + Math.Min(Dfs(cost, i + 1),
                                     Dfs(cost, i + 2));
        return memo[i];
    }
}
```

```go
func minCostClimbingStairs(cost []int) int {
    memo := make([]int, len(cost))
    for i := 0; i < len(cost); i++ {
        memo[i] = -1
    }

    var dfs func(i int) int
    dfs = func(i int) int {
        if i >= len(cost) {
            return 0
        }
        if memo[i] != -1 {
            return memo[i]
        }
        memo[i] = cost[i] + min(dfs(i+1), dfs(i+2))
        return memo[i]
    }
    
    return min(dfs(0), dfs(1))
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
    fun minCostClimbingStairs(cost: IntArray): Int {
        var memo = IntArray(cost.size){-1}
        fun dfs(i: Int): Int {
            if (i >= cost.size) {
                return 0
            }
            if (memo[i] != -1) return memo[i]
            memo[i] = cost[i] + minOf(dfs(i + 1), dfs(i + 2))
            return memo[i]
        }
        
        return minOf(dfs(0), dfs(1))
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
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        n = len(cost)
        dp = [0] * (n + 1)
        
        for i in range(2, n + 1):
            dp[i] = min(dp[i - 1] + cost[i - 1],
                        dp[i - 2] + cost[i - 2])
        
        return dp[n]
```

```java
public class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int n = cost.length;
        int[] dp = new int[n + 1];
        
        for (int i = 2; i <= n; i++) {
            dp[i] = Math.min(dp[i - 1] + cost[i - 1],
                             dp[i - 2] + cost[i - 2]);
        }
        
        return dp[n];
    }
}
```

```cpp
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        vector<int> dp(n + 1);
        
        for (int i = 2; i <= n; i++) {
            dp[i] = min(dp[i - 1] + cost[i - 1],
                        dp[i - 2] + cost[i - 2]);
        }
        
        return dp[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @return {number}
     */
    minCostClimbingStairs(cost) {
        const n = cost.length;
        const dp = new Array(n + 1).fill(0);
        
        for (let i = 2; i <= n; i++) {
            dp[i] = Math.min(dp[i - 1] + cost[i - 1],
                             dp[i - 2] + cost[i - 2]);
        }
        
        return dp[n];
    }
}
```

```csharp
public class Solution {
    public int MinCostClimbingStairs(int[] cost) {
        int n = cost.Length;
        int[] dp = new int[n + 1];
        
        for (int i = 2; i <= n; i++) {
            dp[i] = Math.Min(dp[i - 1] + cost[i - 1],
                             dp[i - 2] + cost[i - 2]);
        }
        
        return dp[n];
    }
}
```

```go
func minCostClimbingStairs(cost []int) int {
    n := len(cost)
    dp := make([]int, n+1)

    for i := 2; i <= n; i++ {
        dp[i] = min(dp[i-1] + cost[i-1],
                    dp[i-2] + cost[i-2])
    }

    return dp[n]
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
    fun minCostClimbingStairs(cost: IntArray): Int {
        val n = cost.size
        var dp = IntArray(n + 1)

        for (i in 2..n) {
            dp[i] = minOf(dp[i - 1] + cost[i - 1],
                          dp[i - 2] + cost[i - 2])
        }

        return dp[n]
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
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        for i in range(len(cost) - 3, -1, -1):
            cost[i] += min(cost[i + 1], cost[i + 2])

        return min(cost[0], cost[1])
```

```java
public class Solution {
    public int minCostClimbingStairs(int[] cost) {
        for (int i = cost.length - 3; i >= 0; i--) {
            cost[i] += Math.min(cost[i + 1], cost[i + 2]);
        }
        return Math.min(cost[0], cost[1]);
    }
}
```

```cpp
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        for (int i = cost.size() - 3; i >= 0; i--) {
            cost[i] += min(cost[i + 1], cost[i + 2]);
        }
        return min(cost[0], cost[1]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @return {number}
     */
    minCostClimbingStairs(cost) {
        for (let i = cost.length - 3; i >= 0; i--) {
            cost[i] += Math.min(cost[i + 1], cost[i + 2]);
        }
        return Math.min(cost[0], cost[1]);
    }
}
```

```csharp
public class Solution {
    public int MinCostClimbingStairs(int[] cost) {
        for (int i = cost.Length - 3; i >= 0; i--) {
            cost[i] += Math.Min(cost[i + 1], cost[i + 2]);
        }
        return Math.Min(cost[0], cost[1]);
    }
}
```

```go
func minCostClimbingStairs(cost []int) int {
    n := len(cost)
    for i := n - 3; i >= 0; i-- {
        cost[i] += min(cost[i+1], cost[i+2])
    }
    return min(cost[0], cost[1])
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
    fun minCostClimbingStairs(cost: IntArray): Int {
        val n = cost.size
        for (i in n - 3 downTo 0) {
            cost[i] += minOf(cost[i + 1], cost[i + 2])
        }
        return minOf(cost[0], cost[1])
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$