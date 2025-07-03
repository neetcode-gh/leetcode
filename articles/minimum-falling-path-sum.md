## 1. Recursion

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        N = len(matrix)

        def dfs(r, c):
            if r == N:
                return 0
            if c < 0 or c >= N:
                return float("inf")
            return matrix[r][c] + min(
                dfs(r + 1, c - 1),
                dfs(r + 1, c),
                dfs(r + 1, c + 1)
            )

        res = float("inf")
        for c in range(N):
            res = min(res, dfs(0, c))
        return res
```

```java
public class Solution {
    private int dfs(int r, int c, int[][] matrix, int N) {
        if (r == N) return 0;
        if (c < 0 || c >= N) return Integer.MAX_VALUE;
        return matrix[r][c] + Math.min(
            Math.min(dfs(r + 1, c - 1, matrix, N), dfs(r + 1, c, matrix, N)),
            dfs(r + 1, c + 1, matrix, N)
        );
    }

    public int minFallingPathSum(int[][] matrix) {
        int N = matrix.length;
        int res = Integer.MAX_VALUE;
        for (int c = 0; c < N; c++) {
            res = Math.min(res, dfs(0, c, matrix, N));
        }
        return res;
    }
}
```

```cpp
class Solution {
private:
    int dfs(int r, int c, vector<vector<int>>& matrix, int N) {
        if (r == N) return 0;
        if (c < 0 || c >= N) return INT_MAX;
        return matrix[r][c] + min({
            dfs(r + 1, c - 1, matrix, N),
            dfs(r + 1, c, matrix, N),
            dfs(r + 1, c + 1, matrix, N)
        });
    }

public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int N = matrix.size();
        int res = INT_MAX;
        for (int c = 0; c < N; c++) {
            res = min(res, dfs(0, c, matrix, N));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    minFallingPathSum(matrix) {
        const N = matrix.length;

        const dfs = (r, c) => {
            if (r === N) return 0;
            if (c < 0 || c >= N) return Infinity;
            return (
                matrix[r][c] +
                Math.min(dfs(r + 1, c - 1), dfs(r + 1, c), dfs(r + 1, c + 1))
            );
        };

        let res = Infinity;
        for (let c = 0; c < N; c++) {
            res = Math.min(res, dfs(0, c));
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(3 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        N = len(matrix)
        cache = {}

        def dfs(r, c):
            if r == N:
                return 0
            if c < 0 or c >= N:
                return float("inf")
            if (r, c) in cache:
                return cache[(r, c)]
            cache[(r, c)] = matrix[r][c] + min(
                dfs(r + 1, c - 1),
                dfs(r + 1, c),
                dfs(r + 1, c + 1)
            )
            return cache[(r, c)]

        res = float("inf")
        for c in range(N):
            res = min(res, dfs(0, c))
        return res
```

```java
public class Solution {
    private int[][] cache;

    private int dfs(int r, int c, int[][] matrix, int N) {
        if (r == N) return 0;
        if (c < 0 || c >= N) return Integer.MAX_VALUE;
        if (cache[r][c] != Integer.MIN_VALUE) return cache[r][c];

        cache[r][c] = matrix[r][c] + Math.min(
            Math.min(dfs(r + 1, c - 1, matrix, N), dfs(r + 1, c, matrix, N)),
            dfs(r + 1, c + 1, matrix, N)
        );
        return cache[r][c];
    }

    public int minFallingPathSum(int[][] matrix) {
        int N = matrix.length;
        cache = new int[N][N];
        for (int[] row : cache) {
            Arrays.fill(row, Integer.MIN_VALUE);
        }

        int res = Integer.MAX_VALUE;
        for (int c = 0; c < N; c++) {
            res = Math.min(res, dfs(0, c, matrix, N));
        }
        return res;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> cache;

    int dfs(int r, int c, vector<vector<int>>& matrix, int N) {
        if (r == N) return 0;
        if (c < 0 || c >= N) return INT_MAX;
        if (cache[r][c] != INT_MIN) return cache[r][c];

        cache[r][c] = matrix[r][c] + min({
            dfs(r + 1, c - 1, matrix, N),
            dfs(r + 1, c, matrix, N),
            dfs(r + 1, c + 1, matrix, N)
        });
        return cache[r][c];
    }

public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int N = matrix.size();
        cache = vector<vector<int>>(N, vector<int>(N, INT_MIN));

        int res = INT_MAX;
        for (int c = 0; c < N; c++) {
            res = min(res, dfs(0, c, matrix, N));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    minFallingPathSum(matrix) {
        const N = matrix.length;
        const cache = Array.from({ length: N }, () => Array(N).fill(null));

        const dfs = (r, c) => {
            if (r === N) return 0;
            if (c < 0 || c >= N) return Infinity;
            if (cache[r][c] !== null) return cache[r][c];

            cache[r][c] =
                matrix[r][c] +
                Math.min(dfs(r + 1, c - 1), dfs(r + 1, c), dfs(r + 1, c + 1));
            return cache[r][c];
        };

        let res = Infinity;
        for (let c = 0; c < N; c++) {
            res = Math.min(res, dfs(0, c));
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * n)$
- Space complexity: $O(n * n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        N = len(matrix)
        dp = matrix[0][:]

        for r in range(1, N):
            leftUp = float('inf')
            for c in range(N):
                midUp = dp[c]
                rightUp = dp[c + 1] if c < N - 1 else float('inf')
                dp[c] = matrix[r][c] + min(midUp, leftUp, rightUp)
                leftUp = midUp

        return min(dp)
```

```java
public class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int N = matrix.length;
        int[] dp = new int[N];
        for (int c = 0; c < N; c++) {
            dp[c] = matrix[0][c];
        }

        for (int r = 1; r < N; r++) {
            int leftUp = Integer.MAX_VALUE;
            for (int c = 0; c < N; c++) {
                int midUp = dp[c];
                int rightUp = (c < N - 1) ? dp[c + 1] : Integer.MAX_VALUE;
                dp[c] = matrix[r][c] + Math.min(midUp, Math.min(leftUp, rightUp));
                leftUp = midUp;
            }
        }

        int ans = Integer.MAX_VALUE;
        for (int val : dp) {
            ans = Math.min(ans, val);
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int N = matrix.size();
        vector<int> dp(N);

        for (int c = 0; c < N; c++) {
            dp[c] = matrix[0][c];
        }

        for (int r = 1; r < N; r++) {
            int leftUp = INT_MAX;
            for (int c = 0; c < N; c++) {
                int midUp = dp[c];
                int rightUp = (c < N - 1) ? dp[c + 1] : INT_MAX;
                dp[c] = matrix[r][c] + min(midUp, min(leftUp, rightUp));
                leftUp = midUp;
            }
        }

        int ans = INT_MAX;
        for (int val : dp) {
            ans = min(ans, val);
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    minFallingPathSum(matrix) {
        const N = matrix.length;
        const dp = matrix[0].slice();

        for (let r = 1; r < N; r++) {
            let leftUp = Infinity;
            for (let c = 0; c < N; c++) {
                const midUp = dp[c];
                const rightUp = c < N - 1 ? dp[c + 1] : Infinity;
                dp[c] = matrix[r][c] + Math.min(midUp, leftUp, rightUp);
                leftUp = midUp;
            }
        }

        return Math.min(...dp);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (In-Place)

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        N = len(matrix)

        for r in range(1, N):
            for c in range(N):
                mid = matrix[r - 1][c]
                left = matrix[r - 1][c - 1] if c > 0 else float("inf")
                right = matrix[r - 1][c + 1] if c < N - 1 else float("inf")
                matrix[r][c] = matrix[r][c] + min(mid, left, right)

        return min(matrix[-1])
```

```java
public class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int N = matrix.length;

        for (int r = 1; r < N; r++) {
            for (int c = 0; c < N; c++) {
                int mid = matrix[r - 1][c];
                int left = (c > 0) ? matrix[r - 1][c - 1] : Integer.MAX_VALUE;
                int right = (c < N - 1) ? matrix[r - 1][c + 1] : Integer.MAX_VALUE;
                matrix[r][c] = matrix[r][c] + Math.min(mid, Math.min(left, right));
            }
        }

        int res = Integer.MAX_VALUE;
        for (int c = 0; c < N; c++) {
            res = Math.min(res, matrix[N - 1][c]);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int N = matrix.size();

        for (int r = 1; r < N; r++) {
            for (int c = 0; c < N; c++) {
                int mid = matrix[r - 1][c];
                int left = (c > 0) ? matrix[r - 1][c - 1] : INT_MAX;
                int right = (c < N - 1) ? matrix[r - 1][c + 1] : INT_MAX;
                matrix[r][c] = matrix[r][c] + min({mid, left, right});
            }
        }

        return *min_element(matrix[N - 1].begin(), matrix[N - 1].end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    minFallingPathSum(matrix) {
        const N = matrix.length;

        for (let r = 1; r < N; r++) {
            for (let c = 0; c < N; c++) {
                const mid = matrix[r - 1][c];
                const left = c > 0 ? matrix[r - 1][c - 1] : Infinity;
                const right = c < N - 1 ? matrix[r - 1][c + 1] : Infinity;
                matrix[r][c] = matrix[r][c] + Math.min(mid, left, right);
            }
        }

        return Math.min(...matrix[N - 1]);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.
