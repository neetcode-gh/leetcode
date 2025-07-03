## 1. Recursion

::tabs-start

```python
class Solution:
    def paintWalls(self, cost: List[int], time: List[int]) -> int:

        def dfs(i, remain):
            if remain <= 0:
                return 0
            if i == len(cost):
                return float("inf")

            paint = cost[i] + dfs(i + 1, remain - 1 - time[i])
            skip = dfs(i + 1, remain)
            return min(paint, skip)

        return dfs(0, len(cost))
```

```java
public class Solution {
    public int paintWalls(int[] cost, int[] time) {
        return dfs(cost, time, 0, cost.length);
    }

    private int dfs(int[] cost, int[] time, int i, int remain) {
        if (remain <= 0) {
            return 0;
        }
        if (i == cost.length) {
            return Integer.MAX_VALUE;
        }

        int paint = dfs(cost, time, i + 1, remain - 1 - time[i]);
        if (paint != Integer.MAX_VALUE) paint += cost[i];
        int skip = dfs(cost, time, i + 1, remain);
        return Math.min(paint, skip);
    }
}
```

```cpp
class Solution {
public:
    int paintWalls(vector<int>& cost, vector<int>& time) {
        return dfs(cost, time, 0, cost.size());
    }

private:
    int dfs(vector<int>& cost, vector<int>& time, int i, int remain) {
        if (remain <= 0) {
            return 0;
        }
        if (i == cost.size()) {
            return INT_MAX;
        }

        int paint = dfs(cost, time, i + 1, remain - 1 - time[i]);
        if (paint != INT_MAX) paint += cost[i];

        int skip = dfs(cost, time, i + 1, remain);
        return min(paint, skip);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @param {number[]} time
     * @return {number}
     */
    paintWalls(cost, time) {
        const dfs = (i, remain) => {
            if (remain <= 0) {
                return 0;
            }
            if (i === cost.length) {
                return Infinity;
            }

            const paint = cost[i] + dfs(i + 1, remain - 1 - time[i]);
            const skip = dfs(i + 1, remain);
            return Math.min(paint, skip);
        };

        return dfs(0, cost.length);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def paintWalls(self, cost: List[int], time: List[int]) -> int:
        dp = {}

        def dfs(i, remain):
            if remain <= 0:
                return 0
            if i == len(cost):
                return float("inf")
            if (i, remain) in dp:
                return dp[(i, remain)]

            paint = cost[i] + dfs(i + 1, remain - 1 - time[i])
            skip = dfs(i + 1, remain)
            dp[(i, remain)] = min(paint, skip)
            return dp[(i, remain)]

        return dfs(0, len(cost))
```

```java
public class Solution {
    private int[][] dp;

    public int paintWalls(int[] cost, int[] time) {
        dp = new int[cost.length][cost.length + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }
        return dfs(cost, time, 0, cost.length);
    }

    private int dfs(int[] cost, int[] time, int i, int remain) {
        if (remain <= 0) {
            return 0;
        }
        if (i == cost.length) {
            return Integer.MAX_VALUE;
        }
        if (dp[i][remain] != -1) {
            return dp[i][remain];
        }

        int paint = dfs(cost, time, i + 1, remain - 1 - time[i]);
        if (paint != Integer.MAX_VALUE) paint += cost[i];

        int skip = dfs(cost, time, i + 1, remain);
        return dp[i][remain] = Math.min(paint, skip);
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;

public:
    int paintWalls(vector<int>& cost, vector<int>& time) {
        dp.assign(cost.size(), vector<int>(cost.size() + 1, -1));
        return dfs(cost, time, 0, cost.size());
    }

private:
    int dfs(vector<int>& cost, vector<int>& time, int i, int remain) {
        if (remain <= 0) {
            return 0;
        }
        if (i == cost.size()) {
            return INT_MAX;
        }
        if (dp[i][remain] != -1) {
            return dp[i][remain];
        }

        int paint = dfs(cost, time, i + 1, remain - 1 - time[i]);
        if (paint != INT_MAX) paint += cost[i];

        int skip = dfs(cost, time, i + 1, remain);
        return dp[i][remain] = min(paint, skip);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @param {number[]} time
     * @return {number}
     */
    paintWalls(cost, time) {
        const n = cost.length;
        const dp = Array.from({ length: n }, () => Array(n + 1).fill(-1));
        const dfs = (i, remain) => {
            if (remain <= 0) {
                return 0;
            }
            if (i === n) {
                return Infinity;
            }
            if (dp[i][remain] !== -1) {
                return dp[i][remain];
            }

            const paint = cost[i] + dfs(i + 1, remain - 1 - time[i]);
            const skip = dfs(i + 1, remain);
            return (dp[i][remain] = Math.min(paint, skip));
        };

        return dfs(0, cost.length);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def paintWalls(self, cost: List[int], time: List[int]) -> int:
        n = len(cost)
        dp = [[0] * (n + 2) for _ in range(n + 1)]
        for remain in range(1, n + 1):
            dp[n][remain] = float("inf")

        for i in range(n - 1, -1, -1):
            for remain in range(1, n + 1):
                paint = cost[i] + dp[i + 1][max(remain - 1 - time[i], 0)]
                skip = dp[i + 1][remain]
                dp[i][remain] = min(paint, skip)

        return dp[0][n]
```

```java
public class Solution {
    public int paintWalls(int[] cost, int[] time) {
        int n = cost.length;
        int[][] dp = new int[n + 1][n + 2];
        for (int remain = 1; remain <= n; remain++) {
            dp[n][remain] = Integer.MAX_VALUE;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int remain = 1; remain <= n; remain++) {
                int paint = dp[i + 1][Math.max(remain - 1 - time[i], 0)];
                if (paint != Integer.MAX_VALUE) paint += cost[i];

                int skip = dp[i + 1][remain];
                dp[i][remain] = Math.min(paint, skip);
            }
        }

        return dp[0][n];
    }
}
```

```cpp
class Solution {
public:
    int paintWalls(vector<int>& cost, vector<int>& time) {
        int n = cost.size();
        vector<vector<int>> dp(n + 1, vector<int>(n + 2, 0));

        for (int remain = 1; remain <= n; remain++) {
            dp[n][remain] = INT_MAX;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int remain = 1; remain <= n; remain++) {
                int paint = dp[i + 1][max(remain - 1 - time[i], 0)];
                if (paint !=  INT_MAX) paint += cost[i];

                int skip = dp[i + 1][remain];
                dp[i][remain] = min(paint, skip);
            }
        }

        return dp[0][n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @param {number[]} time
     * @return {number}
     */
    paintWalls(cost, time) {
        const n = cost.length;
        const dp = Array.from({ length: n + 1 }, () => Array(n + 2).fill(0));

        for (let remain = 1; remain <= n; remain++) {
            dp[n][remain] = Infinity;
        }

        for (let i = n - 1; i >= 0; i--) {
            for (let remain = 1; remain <= n; remain++) {
                const paint =
                    cost[i] + dp[i + 1][Math.max(remain - 1 - time[i], 0)];
                const skip = dp[i + 1][remain];
                dp[i][remain] = Math.min(paint, skip);
            }
        }

        return dp[0][n];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def paintWalls(self, cost: List[int], time: List[int]) -> int:
        n = len(cost)
        dp = [float("inf")] * (n + 2)
        dp[0] = 0

        for i in range(n):
            for remain in range(n, 0, -1):
                paint = cost[i] + dp[max(remain - 1 - time[i], 0)]
                dp[remain] = min(paint, dp[remain])

        return dp[n]
```

```java
public class Solution {
    public int paintWalls(int[] cost, int[] time) {
        int n = cost.length;
        int[] dp = new int[n + 2];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        for (int i = 0; i < n; i++) {
            for (int remain = n; remain > 0; remain--) {
                int paint = dp[Math.max(remain - 1 - time[i], 0)];
                if (paint != Integer.MAX_VALUE) paint += cost[i];
                dp[remain] = Math.min(paint, dp[remain]);
            }
        }

        return dp[n];
    }
}
```

```cpp
class Solution {
public:
    int paintWalls(vector<int>& cost, vector<int>& time) {
        int n = cost.size();
        vector<int> dp(n + 2, INT_MAX);
        dp[0] = 0;

        for (int i = 0; i < n; i++) {
            for (int remain = n; remain > 0; remain--) {
                int paint = dp[max(remain - 1 - time[i], 0)];
                if (paint != INT_MAX) paint += cost[i];
                dp[remain] = min(paint, dp[remain]);
            }
        }

        return dp[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @param {number[]} time
     * @return {number}
     */
    paintWalls(cost, time) {
        const n = cost.length;
        const dp = Array(n + 2).fill(Infinity);
        dp[0] = 0;

        for (let i = 0; i < n; i++) {
            for (let remain = n; remain > 0; remain--) {
                const paint = cost[i] + dp[Math.max(remain - 1 - time[i], 0)];
                dp[remain] = Math.min(paint, dp[remain]);
            }
        }

        return dp[n];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$
