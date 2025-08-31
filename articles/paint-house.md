## 1. Recursion

::tabs-start

```python
class Solution:
    def minCost(self, costs: List[List[int]]) -> int:
        n = len(costs)

        def dfs(i, prevColor):
            if i == n:
                return 0

            res = float("inf")
            for c in range(3):
                if c == prevColor:
                    continue
                res = min(res, costs[i][c] + dfs(i + 1, c))
            return res

        return dfs(0, -1)
```

```java
public class Solution {
    private int[][] costs;
    private int n;

    public int minCost(int[][] costs) {
        this.costs = costs;
        this.n = costs.length;
        return dfs(0, -1);
    }

    private int dfs(int i, int prevColor) {
        if (i == n) {
            return 0;
        }

        int res = Integer.MAX_VALUE;
        for (int c = 0; c < 3; c++) {
            if (c == prevColor) {
                continue;
            }
            res = Math.min(res, costs[i][c] + dfs(i + 1, c));
        }
        return res;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> costs;
    int n;

    int dfs(int i, int prevColor) {
        if (i == n) {
            return 0;
        }

        int res = INT_MAX;
        for (int c = 0; c < 3; c++) {
            if (c == prevColor) {
                continue;
            }
            res = min(res, costs[i][c] + dfs(i + 1, c));
        }
        return res;
    }

public:
    int minCost(vector<vector<int>>& costs) {
        this->costs = costs;
        this->n = costs.size();
        return dfs(0, -1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    minCost(costs) {
        const n = costs.length;

        const dfs = (i, prevColor) => {
            if (i === n) return 0;

            let res = Infinity;
            for (let c = 0; c < 3; c++) {
                if (c === prevColor) continue;
                res = Math.min(res, costs[i][c] + dfs(i + 1, c));
            }
            return res;
        };

        return dfs(0, -1);
    }
}
```

```csharp
public class Solution {
    int[][] costs;
    int n;

    public int MinCost(int[][] costs) {
        this.costs = costs;
        n = costs.Length;
        return Dfs(0, -1);
    }

    private int Dfs(int i, int prevColor) {
        if (i == n) return 0;

        int res = int.MaxValue;
        for (int c = 0; c < 3; c++) {
            if (c == prevColor) continue;
            res = Math.Min(res, costs[i][c] + Dfs(i + 1, c));
        }
        return res;
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
    def min_cost(self, costs: List[List[int]]) -> int:
        n = len(costs)
        dp = [[-1] * 4 for _ in range(n)]

        def dfs(i, prevColor):
            if i == n:
                return 0
            if dp[i][prevColor + 1] != -1:
                return dp[i][prevColor + 1]

            res = float("inf")
            for c in range(3):
                if c == prevColor:
                    continue
                res = min(res, costs[i][c] + dfs(i + 1, c))

            dp[i][prevColor + 1] = res
            return res

        return dfs(0, -1)
```

```java
public class Solution {
    private int[][] dp;
    private int[][] costs;

    public int minCost(int[][] costs) {
        int n = costs.length;
        this.costs = costs;
        this.dp = new int[n][4];

        for (int i = 0; i < n; i++) {
            Arrays.fill(dp[i], -1);
        }

        return dfs(0, -1);
    }

    private int dfs(int i, int prevColor) {
        if (i == costs.length) {
            return 0;
        }
        if (dp[i][prevColor + 1] != -1) {
            return dp[i][prevColor + 1];
        }

        int res = Integer.MAX_VALUE;
        for (int c = 0; c < 3; c++) {
            if (c == prevColor) continue;
            res = Math.min(res, costs[i][c] + dfs(i + 1, c));
        }

        return dp[i][prevColor + 1] = res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> dp;
    vector<vector<int>> costs;

    int minCost(vector<vector<int>>& costs) {
        int n = costs.size();
        this->costs = costs;
        dp.assign(n, vector<int>(4, -1));
        return dfs(0, -1);
    }

private:
    int dfs(int i, int prevColor) {
        if (i == costs.size()) {
            return 0;
        }
        if (dp[i][prevColor + 1] != -1) {
            return dp[i][prevColor + 1];
        }

        int res = INT_MAX;
        for (int c = 0; c < 3; c++) {
            if (c == prevColor) continue;
            res = min(res, costs[i][c] + dfs(i + 1, c));
        }

        return dp[i][prevColor + 1] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    minCost(costs) {
        const n = costs.length;
        const dp = Array.from({ length: n }, () => Array(4).fill(-1));

        const dfs = (i, prevColor) => {
            if (i === n) {
                return 0;
            }
            if (dp[i][prevColor + 1] !== -1) {
                return dp[i][prevColor + 1];
            }

            let res = Infinity;
            for (let c = 0; c < 3; c++) {
                if (c === prevColor) continue;
                res = Math.min(res, costs[i][c] + dfs(i + 1, c));
            }

            return (dp[i][prevColor + 1] = res);
        };

        return dfs(0, -1);
    }
}
```

```csharp
public class Solution {
    int[][] costs;
    int[][] dp;
    int n;

    public int MinCost(int[][] costs) {
        this.costs = costs;
        n = costs.Length;
        dp = new int[n][];
        for (int i = 0; i < n; i++) {
            dp[i] = new int[4];
            for (int j = 0; j < 4; j++) dp[i][j] = -1;
        }
        return Dfs(0, -1);
    }

    private int Dfs(int i, int prevColor) {
        if (i == n) return 0;
        if (dp[i][prevColor + 1] != -1) return dp[i][prevColor + 1];

        int res = int.MaxValue;
        for (int c = 0; c < 3; c++) {
            if (c == prevColor) continue;
            res = Math.Min(res, costs[i][c] + Dfs(i + 1, c));
        }

        dp[i][prevColor + 1] = res;
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def min_cost(self, costs: List[List[int]]) -> int:
        n = len(costs)
        if n == 0:
            return 0

        dp = [[0] * 3 for _ in range(n)]
        for c in range(3):
            dp[0][c] = costs[0][c]

        for i in range(1, n):
            for c in range(3):
                dp[i][c] = (
                    costs[i][c] +
                    min(dp[i - 1][(c + 1) % 3], dp[i - 1][(c + 2) % 3])
                )

        return min(dp[n - 1])
```

```java
public class Solution {
    public int minCost(int[][] costs) {
        int n = costs.length;
        if (n == 0) return 0;

        int[][] dp = new int[n][3];
        for (int c = 0; c < 3; c++) {
            dp[0][c] = costs[0][c];
        }

        for (int i = 1; i < n; i++) {
            for (int c = 0; c < 3; c++) {
                dp[i][c] = costs[i][c] +
                           Math.min(dp[i - 1][(c + 1) % 3], dp[i - 1][(c + 2) % 3]);
            }
        }

        return Math.min(dp[n - 1][0], Math.min(dp[n - 1][1], dp[n - 1][2]));
    }
}
```

```cpp
class Solution {
public:
    int minCost(vector<vector<int>>& costs) {
        int n = costs.size();
        if (n == 0) return 0;

        vector<vector<int>> dp(n, vector<int>(3, 0));
        for (int c = 0; c < 3; c++) {
            dp[0][c] = costs[0][c];
        }

        for (int i = 1; i < n; i++) {
            for (int c = 0; c < 3; c++) {
                dp[i][c] = costs[i][c] +
                           min(dp[i - 1][(c + 1) % 3], dp[i - 1][(c + 2) % 3]);
            }
        }

        return min({dp[n - 1][0], dp[n - 1][1], dp[n - 1][2]});
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    minCost(costs) {
        let n = costs.length;
        if (n === 0) return 0;

        let dp = Array.from({ length: n }, () => Array(3).fill(0));
        for (let c = 0; c < 3; c++) {
            dp[0][c] = costs[0][c];
        }

        for (let i = 1; i < n; i++) {
            for (let c = 0; c < 3; c++) {
                dp[i][c] =
                    costs[i][c] +
                    Math.min(dp[i - 1][(c + 1) % 3], dp[i - 1][(c + 2) % 3]);
            }
        }

        return Math.min(dp[n - 1][0], dp[n - 1][1], dp[n - 1][2]);
    }
}
```

```csharp
public class Solution {
    public int MinCost(int[][] costs) {
        int n = costs.Length;
        if (n == 0) return 0;

        int[][] dp = new int[n][];
        for (int i = 0; i < n; i++) {
            dp[i] = new int[3];
        }

        for (int c = 0; c < 3; c++) {
            dp[0][c] = costs[0][c];
        }

        for (int i = 1; i < n; i++) {
            for (int c = 0; c < 3; c++) {
                dp[i][c] = costs[i][c] + Math.Min(dp[i - 1][(c + 1) % 3], dp[i - 1][(c + 2) % 3]);
            }
        }

        return Math.Min(dp[n - 1][0], Math.Min(dp[n - 1][1], dp[n - 1][2]));
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def minCost(self, costs: List[List[int]]) -> int:
        dp = [0, 0, 0]

        for i in range(len(costs)):
            dp0 = costs[i][0] + min(dp[1], dp[2])
            dp1 = costs[i][1] + min(dp[0], dp[2])
            dp2 = costs[i][2] + min(dp[0], dp[1])
            dp = [dp0, dp1, dp2]

        return min(dp)
```

```java
public class Solution {
    public int minCost(int[][] costs) {
        int dp0 = 0, dp1 = 0, dp2 = 0;

        for (int i = 0; i < costs.length; i++) {
            int newDp0 = costs[i][0] + Math.min(dp1, dp2);
            int newDp1 = costs[i][1] + Math.min(dp0, dp2);
            int newDp2 = costs[i][2] + Math.min(dp0, dp1);
            dp0 = newDp0;
            dp1 = newDp1;
            dp2 = newDp2;
        }

        return Math.min(dp0, Math.min(dp1, dp2));
    }
}
```

```cpp
class Solution {
public:
    int minCost(vector<vector<int>>& costs) {
        int dp0 = 0, dp1 = 0, dp2 = 0;

        for (const auto& cost : costs) {
            int newDp0 = cost[0] + min(dp1, dp2);
            int newDp1 = cost[1] + min(dp0, dp2);
            int newDp2 = cost[2] + min(dp0, dp1);
            dp0 = newDp0;
            dp1 = newDp1;
            dp2 = newDp2;
        }

        return min({dp0, dp1, dp2});
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    minCost(costs) {
        let dp = [0, 0, 0];

        for (let i = 0; i < costs.length; i++) {
            let dp0 = costs[i][0] + Math.min(dp[1], dp[2]);
            let dp1 = costs[i][1] + Math.min(dp[0], dp[2]);
            let dp2 = costs[i][2] + Math.min(dp[0], dp[1]);
            dp = [dp0, dp1, dp2];
        }

        return Math.min(dp[0], dp[1], dp[2]);
    }
}
```

```csharp
public class Solution {
    public int MinCost(int[][] costs) {
        int[] dp = new int[3];

        for (int i = 0; i < costs.Length; i++) {
            int dp0 = costs[i][0] + Math.Min(dp[1], dp[2]);
            int dp1 = costs[i][1] + Math.Min(dp[0], dp[2]);
            int dp2 = costs[i][2] + Math.Min(dp[0], dp[1]);
            dp = new int[] { dp0, dp1, dp2 };
        }

        return Math.Min(dp[0], Math.Min(dp[1], dp[2]));
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
