## 1. Recursion

::tabs-start

```python
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        def dfs(row, col):
            if row >= len(triangle):
                return 0
            return triangle[row][col] + min(dfs(row + 1, col), dfs(row + 1, col + 1))

        return dfs(0, 0)
```

```java
public class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        return dfs(0, 0, triangle);
    }

    private int dfs(int row, int col, List<List<Integer>> triangle) {
        if (row >= triangle.size()) {
            return 0;
        }
        return triangle.get(row).get(col) + Math.min(dfs(row + 1, col, triangle), dfs(row + 1, col + 1, triangle));
    }
}
```

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        return dfs(0, 0, triangle);
    }

private:
    int dfs(int row, int col, vector<vector<int>>& triangle) {
        if (row >= triangle.size()) {
            return 0;
        }
        return triangle[row][col] + min(dfs(row + 1, col, triangle), dfs(row + 1, col + 1, triangle));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} triangle
     * @return {number}
     */
    minimumTotal(triangle) {
        const dfs = (row, col) => {
            if (row >= triangle.length) {
                return 0;
            }
            return (
                triangle[row][col] +
                Math.min(dfs(row + 1, col), dfs(row + 1, col + 1))
            );
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public int MinimumTotal(List<List<int>> triangle) {
        int Dfs(int row, int col) {
            if (row >= triangle.Count) {
                return 0;
            }
            return triangle[row][col] + Math.Min(Dfs(row + 1, col), Dfs(row + 1, col + 1));
        }

        return Dfs(0, 0);
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
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        memo = [[0] * len(triangle[r]) for r in range(len(triangle))]
        INF = float("inf")
        for r in range(len(triangle)):
            for c in range(len(triangle[r])):
                memo[r][c] = INF

        def dfs(row, col):
            if row >= len(triangle):
                return 0
            if memo[row][col] != INF:
                return memo[row][col]

            memo[row][col] = triangle[row][col] + min(dfs(row + 1, col), dfs(row + 1, col + 1))
            return memo[row][col]

        return dfs(0, 0)
```

```java
public class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int[][] memo = new int[triangle.size()][];
        int INF = Integer.MAX_VALUE;
        for (int r = 0; r < triangle.size(); r++) {
            memo[r] = new int[triangle.get(r).size()];
            Arrays.fill(memo[r], INF);
        }

        return dfs(0, 0, triangle, memo);
    }

    private int dfs(int row, int col, List<List<Integer>> triangle, int[][] memo) {
        if (row >= triangle.size()) {
            return 0;
        }
        if (memo[row][col] != Integer.MAX_VALUE) {
            return memo[row][col];
        }

        memo[row][col] = triangle.get(row).get(col) + Math.min(dfs(row + 1, col, triangle, memo), dfs(row + 1, col + 1, triangle, memo));
        return memo[row][col];
    }
}
```

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        vector<vector<int>> memo(triangle.size(), vector<int>(0));
        int INF = INT_MAX;
        for (int r = 0; r < triangle.size(); ++r) {
            memo[r].resize(triangle[r].size(), INF);
        }

        return dfs(0, 0, triangle, memo);
    }

private:
    int dfs(int row, int col, vector<vector<int>>& triangle, vector<vector<int>>& memo) {
        if (row >= triangle.size()) {
            return 0;
        }
        if (memo[row][col] != INT_MAX) {
            return memo[row][col];
        }

        memo[row][col] = triangle[row][col] + min(dfs(row + 1, col, triangle, memo), dfs(row + 1, col + 1, triangle, memo));
        return memo[row][col];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} triangle
     * @return {number}
     */
    minimumTotal(triangle) {
        const memo = Array.from({ length: triangle.length }, (_, r) =>
            Array(triangle[r].length).fill(Infinity),
        );

        const dfs = (row, col) => {
            if (row >= triangle.length) {
                return 0;
            }
            if (memo[row][col] !== Infinity) {
                return memo[row][col];
            }

            memo[row][col] =
                triangle[row][col] +
                Math.min(dfs(row + 1, col), dfs(row + 1, col + 1));
            return memo[row][col];
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private int[][] memo;
    private List<List<int>> triangle;
    private int INF = int.MaxValue;

    public int MinimumTotal(List<List<int>> triangle) {
        this.triangle = triangle;
        memo = new int[triangle.Count][];
        for (int r = 0; r < triangle.Count; r++) {
            memo[r] = new int[triangle[r].Count];
            for (int c = 0; c < triangle[r].Count; c++) {
                memo[r][c] = INF;
            }
        }
        return Dfs(0, 0);
    }

    private int Dfs(int row, int col) {
        if (row >= triangle.Count) {
            return 0;
        }
        if (memo[row][col] != INF) {
            return memo[row][col];
        }

        memo[row][col] = triangle[row][col] + Math.Min(Dfs(row + 1, col), Dfs(row + 1, col + 1));
        return memo[row][col];
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
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        n = len(triangle)
        dp = [[0] * len(triangle[row]) for row in range(n)]
        dp[-1] = triangle[-1][:]

        for row in range(n - 2, -1, -1):
            for col in range(len(triangle[row])):
                dp[row][col] = triangle[row][col] + min(dp[row + 1][col], dp[row + 1][col + 1])

        return dp[0][0]
```

```java
public class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[][] dp = new int[n][n];
        for (int col = 0; col < triangle.get(n - 1).size(); col++) {
            dp[n - 1][col] = triangle.get(n - 1).get(col);
        }

        for (int row = n - 2; row >= 0; row--) {
            for (int col = 0; col < triangle.get(row).size(); col++) {
                dp[row][col] = triangle.get(row).get(col) + Math.min(dp[row + 1][col], dp[row + 1][col + 1]);
            }
        }

        return dp[0][0];
    }
}
```

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int col = 0; col < triangle[n - 1].size(); ++col) {
            dp[n - 1][col] = triangle[n - 1][col];
        }

        for (int row = n - 2; row >= 0; --row) {
            for (int col = 0; col < triangle[row].size(); ++col) {
                dp[row][col] = triangle[row][col] + min(dp[row + 1][col], dp[row + 1][col + 1]);
            }
        }

        return dp[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} triangle
     * @return {number}
     */
    minimumTotal(triangle) {
        const n = triangle.length;
        const dp = Array.from({ length: n }, (_, i) =>
            Array(triangle[i].length).fill(0),
        );
        for (let col = 0; col < triangle[n - 1].length; col++) {
            dp[n - 1][col] = triangle[n - 1][col];
        }

        for (let row = n - 2; row >= 0; row--) {
            for (let col = 0; col < triangle[row].length; col++) {
                dp[row][col] =
                    triangle[row][col] +
                    Math.min(dp[row + 1][col], dp[row + 1][col + 1]);
            }
        }

        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public int MinimumTotal(List<List<int>> triangle) {
        int n = triangle.Count;
        int[][] dp = new int[n][];
        for (int i = 0; i < n; i++) {
            dp[i] = new int[triangle[i].Count];
        }

        for (int c = 0; c < triangle[n - 1].Count; c++) {
            dp[n - 1][c] = triangle[n - 1][c];
        }

        for (int row = n - 2; row >= 0; row--) {
            for (int col = 0; col < triangle[row].Count; col++) {
                dp[row][col] = triangle[row][col] + Math.Min(dp[row + 1][col], dp[row + 1][col + 1]);
            }
        }

        return dp[0][0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Space Optimized) - I

::tabs-start

```python
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        n = len(triangle)
        dp = triangle[0][:]

        for row in range(1, n):
            nxtDp = [0] * len(triangle[row])
            nxtDp[0] = dp[0] + triangle[row][0]
            for col in range(1, len(triangle[row]) - 1):
                nxtDp[col] = triangle[row][col] + min(dp[col], dp[col - 1])
            nxtDp[-1] = dp[-1] + triangle[row][-1]
            dp = nxtDp

        return min(dp)
```

```java
public class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[] dp = new int[n];
        dp[0] = triangle.get(0).get(0);

        for (int row = 1; row < n; row++) {
            int[] nxtDp = new int[row + 1];
            nxtDp[0] = dp[0] + triangle.get(row).get(0);
            for (int col = 1; col < row; col++) {
                nxtDp[col] = triangle.get(row).get(col) + Math.min(dp[col], dp[col - 1]);
            }
            nxtDp[row] = dp[row - 1] + triangle.get(row).get(row);
            dp = nxtDp;
        }

        int minPath = Integer.MAX_VALUE;
        for (int value : dp) {
            minPath = Math.min(minPath, value);
        }
        return minPath;
    }
}
```

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> dp = triangle[0];

        for (int row = 1; row < n; row++) {
            vector<int> nxtDp(row + 1, 0);
            nxtDp[0] = dp[0] + triangle[row][0];
            for (int col = 1; col < row; col++) {
                nxtDp[col] = triangle[row][col] + min(dp[col], dp[col - 1]);
            }
            nxtDp[row] = dp[row - 1] + triangle[row][row];
            dp = nxtDp;
        }

        return *min_element(dp.begin(), dp.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} triangle
     * @return {number}
     */
    minimumTotal(triangle) {
        let n = triangle.length;
        let dp = [...triangle[0]];

        for (let row = 1; row < n; row++) {
            let nxtDp = new Array(row + 1).fill(0);
            nxtDp[0] = dp[0] + triangle[row][0];
            for (let col = 1; col < row; col++) {
                nxtDp[col] =
                    triangle[row][col] + Math.min(dp[col], dp[col - 1]);
            }
            nxtDp[row] = dp[row - 1] + triangle[row][row];
            dp = nxtDp;
        }

        return Math.min(...dp);
    }
}
```

```csharp
public class Solution {
    public int MinimumTotal(List<List<int>> triangle) {
        int n = triangle.Count;
        int[] dp = new int[triangle[0].Count];
        for (int i = 0; i < triangle[0].Count; i++) {
            dp[i] = triangle[0][i];
        }

        for (int row = 1; row < n; row++) {
            int[] nxtDp = new int[triangle[row].Count];
            nxtDp[0] = dp[0] + triangle[row][0];
            for (int col = 1; col < triangle[row].Count - 1; col++) {
                nxtDp[col] = triangle[row][col] + Math.Min(dp[col], dp[col - 1]);
            }
            nxtDp[triangle[row].Count - 1] = dp[dp.Length - 1] + triangle[row][triangle[row].Count - 1];
            dp = nxtDp;
        }

        int ans = dp[0];
        for (int i = 1; i < dp.Length; i++) {
            ans = Math.Min(ans, dp[i]);
        }
        return ans;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ extra space.

---

## 5. Dynamic Programming (Space Optimized) - II

::tabs-start

```python
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        n = len(triangle)
        dp = triangle[-1][:]

        for row in range(n - 2, -1, -1):
            for col in range(len(triangle[row])):
                dp[col] = triangle[row][col] + min(dp[col], dp[col + 1])

        return dp[0]
```

```java
public class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) {
            dp[i] = triangle.get(n - 1).get(i);
        }

        for (int row = n - 2; row >= 0; row--) {
            for (int col = 0; col < triangle.get(row).size(); col++) {
                dp[col] = triangle.get(row).get(col) + Math.min(dp[col], dp[col + 1]);
            }
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> dp(triangle.back());

        for (int row = n - 2; row >= 0; --row) {
            for (int col = 0; col < triangle[row].size(); ++col) {
                dp[col] = triangle[row][col] + min(dp[col], dp[col + 1]);
            }
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} triangle
     * @return {number}
     */
    minimumTotal(triangle) {
        const n = triangle.length;
        const dp = [...triangle[n - 1]];

        for (let row = n - 2; row >= 0; row--) {
            for (let col = 0; col < triangle[row].length; col++) {
                dp[col] = triangle[row][col] + Math.min(dp[col], dp[col + 1]);
            }
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int MinimumTotal(List<List<int>> triangle) {
        int n = triangle.Count;
        int[] dp = new int[triangle[n - 1].Count];
        for (int i = 0; i < triangle[n - 1].Count; i++) {
            dp[i] = triangle[n - 1][i];
        }

        for (int row = n - 2; row >= 0; row--) {
            for (int col = 0; col < triangle[row].Count; col++) {
                dp[col] = triangle[row][col] + Math.Min(dp[col], dp[col + 1]);
            }
        }

        return dp[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ extra space.

---

## 6. Dynamic Programming (In-Place)

::tabs-start

```python
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        for row in range(len(triangle) - 2, -1, -1):
            for col in range(len(triangle[row])):
                triangle[row][col] += min(triangle[row + 1][col], triangle[row + 1][col + 1])

        return triangle[0][0]
```

```java
public class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        for (int row = triangle.size() - 2; row >= 0; row--) {
            for (int col = 0; col < triangle.get(row).size(); col++) {
                triangle.get(row).set(col, triangle.get(row).get(col) +
                    Math.min(triangle.get(row + 1).get(col), triangle.get(row + 1).get(col + 1)));
            }
        }
        return triangle.get(0).get(0);
    }
}
```

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        for (int row = triangle.size() - 2; row >= 0; row--) {
            for (int col = 0; col < triangle[row].size(); col++) {
                triangle[row][col] += min(triangle[row + 1][col], triangle[row + 1][col + 1]);
            }
        }
        return triangle[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} triangle
     * @return {number}
     */
    minimumTotal(triangle) {
        for (let row = triangle.length - 2; row >= 0; row--) {
            for (let col = 0; col < triangle[row].length; col++) {
                triangle[row][col] += Math.min(
                    triangle[row + 1][col],
                    triangle[row + 1][col + 1],
                );
            }
        }
        return triangle[0][0];
    }
}
```

```csharp
public class Solution {
    public int MinimumTotal(List<List<int>> triangle) {
        for (int row = triangle.Count - 2; row >= 0; row--) {
            for (int col = 0; col < triangle[row].Count; col++) {
                triangle[row][col] += Math.Min(triangle[row + 1][col], triangle[row + 1][col + 1]);
            }
        }
        return triangle[0][0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.
