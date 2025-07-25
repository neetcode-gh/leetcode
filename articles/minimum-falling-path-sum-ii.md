## 1. Recursion

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        N = len(grid)

        def helper(r, c):
            if r == N - 1:
                return grid[r][c]
            res = float("inf")
            for next_col in range(N):
                if c != next_col:
                    res = min(res, grid[r][c] + helper(r + 1, next_col))
            return res

        res = float("inf")
        for c in range(N):
            res = min(res, helper(0, c))
        return res
```

```java
public class Solution {
    private int helper(int[][] grid, int r, int c) {
        int N = grid.length;
        if (r == N - 1) {
            return grid[r][c];
        }
        int res = Integer.MAX_VALUE;
        for (int nextCol = 0; nextCol < N; nextCol++) {
            if (c != nextCol) {
                res = Math.min(res, grid[r][c] + helper(grid, r + 1, nextCol));
            }
        }
        return res;
    }

    public int minFallingPathSum(int[][] grid) {
        int N = grid.length;
        int res = Integer.MAX_VALUE;
        for (int c = 0; c < N; c++) {
            res = Math.min(res, helper(grid, 0, c));
        }
        return res;
    }
}
```

```cpp
class Solution {
    int helper(vector<vector<int>>& grid, int r, int c) {
        int N = grid.size();
        if (r == N - 1) {
            return grid[r][c];
        }
        int res = INT_MAX;
        for (int nextCol = 0; nextCol < N; nextCol++) {
            if (c != nextCol) {
                res = min(res, grid[r][c] + helper(grid, r + 1, nextCol));
            }
        }
        return res;
    }

public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int N = grid.size();
        int res = INT_MAX;
        for (int c = 0; c < N; c++) {
            res = min(res, helper(grid, 0, c));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    minFallingPathSum(grid) {
        const N = grid.length;

        const helper = (r, c) => {
            if (r === N - 1) return grid[r][c];
            let res = Infinity;
            for (let nextCol = 0; nextCol < N; nextCol++) {
                if (c !== nextCol) {
                    res = Math.min(res, grid[r][c] + helper(r + 1, nextCol));
                }
            }
            return res;
        };

        let res = Infinity;
        for (let c = 0; c < N; c++) {
            res = Math.min(res, helper(0, c));
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        N = len(grid)
        cache = {}

        def helper(r, c):
            if r == N - 1:
                return grid[r][c]
            if (r, c) in cache:
                return cache[(r, c)]

            res = float("inf")
            for next_col in range(N):
                if c != next_col:
                    res = min(res, grid[r][c] + helper(r + 1, next_col))
            cache[(r, c)] = res
            return res

        res = float("inf")
        for c in range(N):
            res = min(res, helper(0, c))
        return res
```

```java
public class Solution {
    private int[][] memo;

    private int helper(int[][] grid, int r, int c) {
        int N = grid.length;
        if (r == N - 1) {
            return grid[r][c];
        }
        if (memo[r][c] != Integer.MIN_VALUE) {
            return memo[r][c];
        }

        int res = Integer.MAX_VALUE;
        for (int nextCol = 0; nextCol < N; nextCol++) {
            if (c != nextCol) {
                res = Math.min(res, grid[r][c] + helper(grid, r + 1, nextCol));
            }
        }
        memo[r][c] = res;
        return res;
    }

    public int minFallingPathSum(int[][] grid) {
        int N = grid.length;
        memo = new int[N][N];
        for (int[] row : memo) {
            Arrays.fill(row, Integer.MIN_VALUE);
        }
        int res = Integer.MAX_VALUE;
        for (int c = 0; c < N; c++) {
            res = Math.min(res, helper(grid, 0, c));
        }
        return res;
    }
}
```

```cpp
class Solution {
    vector<vector<int>> memo;

    int helper(vector<vector<int>>& grid, int r, int c) {
        int N = grid.size();
        if (r == N - 1) {
            return grid[r][c];
        }
        if (memo[r][c] != INT_MIN) {
            return memo[r][c];
        }
        int res = INT_MAX;
        for (int nextCol = 0; nextCol < N; nextCol++) {
            if (c != nextCol) {
                res = min(res, grid[r][c] + helper(grid, r + 1, nextCol));
            }
        }
        memo[r][c] = res;
        return res;
    }

public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int N = grid.size();
        memo.assign(N, vector<int>(N, INT_MIN));
        int res = INT_MAX;
        for (int c = 0; c < N; c++) {
            res = min(res, helper(grid, 0, c));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    minFallingPathSum(grid) {
        const N = grid.length;
        const memo = Array.from({ length: N }, () => Array(N).fill(-Infinity));

        const helper = (r, c) => {
            if (r === N - 1) return grid[r][c];
            if (memo[r][c] !== -Infinity) return memo[r][c];
            let res = Infinity;
            for (let nextCol = 0; nextCol < N; nextCol++) {
                if (c !== nextCol) {
                    res = Math.min(res, grid[r][c] + helper(r + 1, nextCol));
                }
            }
            memo[r][c] = res;
            return res;
        };

        let res = Infinity;
        for (let c = 0; c < N; c++) {
            res = Math.min(res, helper(0, c));
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        N = len(grid)
        dp = [[float("inf")] * N for _ in range(N)]

        for c in range(N):
            dp[N - 1][c] = grid[N - 1][c]

        for r in range(N - 2, -1, -1):
            for c in range(N):
                for next_col in range(N):
                    if c != next_col:
                        dp[r][c] = min(dp[r][c], grid[r][c] + dp[r + 1][next_col])

        return min(dp[0])
```

```java
public class Solution {
    public int minFallingPathSum(int[][] grid) {
        int N = grid.length;
        int[][] dp = new int[N][N];

        for (int c = 0; c < N; c++) {
            dp[N - 1][c] = grid[N - 1][c];
        }

        for (int r = N - 2; r >= 0; r--) {
            for (int c = 0; c < N; c++) {
                dp[r][c] = Integer.MAX_VALUE;
                for (int nextCol = 0; nextCol < N; nextCol++) {
                    if (c != nextCol) {
                        dp[r][c] = Math.min(dp[r][c], grid[r][c] + dp[r + 1][nextCol]);
                    }
                }
            }
        }

        int res = Integer.MAX_VALUE;
        for (int c = 0; c < N; c++) {
            res = Math.min(res, dp[0][c]);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<vector<int>> dp(N, vector<int>(N, INT_MAX));

        for (int c = 0; c < N; c++) {
            dp[N - 1][c] = grid[N - 1][c];
        }

        for (int r = N - 2; r >= 0; r--) {
            for (int c = 0; c < N; c++) {
                dp[r][c] = INT_MAX;
                for (int nextCol = 0; nextCol < N; nextCol++) {
                    if (c != nextCol) {
                        dp[r][c] = min(dp[r][c], grid[r][c] + dp[r + 1][nextCol]);
                    }
                }
            }
        }

        int res = INT_MAX;
        for (int c = 0; c < N; c++) {
            res = min(res, dp[0][c]);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    minFallingPathSum(grid) {
        const N = grid.length;
        const dp = Array.from({ length: N }, () => Array(N).fill(Infinity));

        for (let c = 0; c < N; c++) {
            dp[N - 1][c] = grid[N - 1][c];
        }

        for (let r = N - 2; r >= 0; r--) {
            for (let c = 0; c < N; c++) {
                for (let nextCol = 0; nextCol < N; nextCol++) {
                    if (c !== nextCol) {
                        dp[r][c] = Math.min(
                            dp[r][c],
                            grid[r][c] + dp[r + 1][nextCol],
                        );
                    }
                }
            }
        }

        return Math.min(...dp[0]);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        N = len(grid)
        dp = grid[0]

        for r in range(1, N):
            next_dp = [float("inf")] * N
            for curr_c in range(N):
                for prev_c in range(N):
                    if prev_c != curr_c:
                        next_dp[curr_c] = min(
                            next_dp[curr_c],
                            grid[r][curr_c] + dp[prev_c]
                        )
            dp = next_dp

        return min(dp)
```

```java
public class Solution {
    public int minFallingPathSum(int[][] grid) {
        int N = grid.length;
        int[] dp = grid[0];

        for (int r = 1; r < N; r++) {
            int[] nextDp = new int[N];
            Arrays.fill(nextDp, Integer.MAX_VALUE);

            for (int currC = 0; currC < N; currC++) {
                for (int prevC = 0; prevC < N; prevC++) {
                    if (prevC != currC) {
                        nextDp[currC] = Math.min(
                            nextDp[currC],
                            grid[r][currC] + dp[prevC]
                        );
                    }
                }
            }
            dp = nextDp;
        }

        int res = Integer.MAX_VALUE;
        for (int i : dp) res = Math.min(res, i);
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<int> dp = grid[0];

        for (int r = 1; r < N; r++) {
            vector<int> nextDp(N, INT_MAX);
            for (int currC = 0; currC < N; currC++) {
                for (int prevC = 0; prevC < N; prevC++) {
                    if (prevC != currC) {
                        nextDp[currC] = min(
                            nextDp[currC],
                            grid[r][currC] + dp[prevC]
                        );
                    }
                }
            }
            dp = nextDp;
        }

        return *min_element(dp.begin(), dp.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    minFallingPathSum(grid) {
        const N = grid.length;
        let dp = grid[0];

        for (let r = 1; r < N; r++) {
            const nextDp = Array(N).fill(Infinity);
            for (let currC = 0; currC < N; currC++) {
                for (let prevC = 0; prevC < N; prevC++) {
                    if (prevC !== currC) {
                        nextDp[currC] = Math.min(
                            nextDp[currC],
                            grid[r][currC] + dp[prevC],
                        );
                    }
                }
            }
            dp = nextDp;
        }

        return Math.min(...dp);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n)$

---

## 5. Dynamic Programming (Time Optimized)

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        def get_min_two(row):
            two_smallest = []
            for val, idx in row:
                if len(two_smallest) < 2:
                    two_smallest.append((val, idx))
                elif two_smallest[1][0] > val:
                    two_smallest.pop()
                    two_smallest.append((val, idx))
                two_smallest.sort()
            return two_smallest

        N = len(grid)
        first_row = [(val, idx) for idx, val in enumerate(grid[0])]
        dp = get_min_two(first_row)

        for r in range(1, N):
            next_dp = []
            for curr_c in range(N):
                curr_val = grid[r][curr_c]
                min_val = float("inf")
                for prev_val, prev_c in dp:
                    if curr_c != prev_c:
                        min_val = min(min_val, curr_val + prev_val)
                next_dp.append((min_val, curr_c))
            dp = get_min_two(next_dp)

        return min(val for val, idx in dp)
```

```java
public class Solution {
    public List<int[]> getMinTwo(List<int[]> row) {
        List<int[]> twoSmallest = new ArrayList<>();
        for (int[] entry : row) {
            if (twoSmallest.size() < 2) {
                twoSmallest.add(entry);
            } else if (twoSmallest.get(1)[0] > entry[0]) {
                twoSmallest.remove(1);
                twoSmallest.add(entry);
            }
            twoSmallest.sort((a, b) -> a[0] - b[0]);
        }
        return twoSmallest;
    }

    public int minFallingPathSum(int[][] grid) {
        int N = grid.length;

        List<int[]> firstRow = new ArrayList<>();
        for (int i = 0; i < grid[0].length; i++) {
            firstRow.add(new int[]{grid[0][i], i});
        }

        List<int[]> dp = getMinTwo(firstRow);

        for (int r = 1; r < N; r++) {
            List<int[]> nextDp = new ArrayList<>();
            for (int c = 0; c < grid[0].length; c++) {
                int currVal = grid[r][c];
                int minVal = Integer.MAX_VALUE;
                for (int[] prev : dp) {
                    if (prev[1] != c) {
                        minVal = Math.min(minVal, currVal + prev[0]);
                    }
                }
                nextDp.add(new int[]{minVal, c});
            }
            dp = getMinTwo(nextDp);
        }

        return dp.stream().mapToInt(a -> a[0]).min().getAsInt();
    }
}
```

```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int N = grid.size();

        auto getMinTwo = [](vector<pair<int, int>>& row) {
            vector<pair<int, int>> twoSmallest;
            for (auto& entry : row) {
                if (twoSmallest.size() < 2) {
                    twoSmallest.push_back(entry);
                } else if (twoSmallest[1].first > entry.first) {
                    twoSmallest.pop_back();
                    twoSmallest.push_back(entry);
                }
                sort(twoSmallest.begin(), twoSmallest.end());
            }
            return twoSmallest;
        };

        vector<pair<int, int>> firstRow;
        for (int i = 0; i < grid[0].size(); i++) {
            firstRow.push_back({grid[0][i], i});
        }

        vector<pair<int, int>> dp = getMinTwo(firstRow);

        for (int r = 1; r < N; r++) {
            vector<pair<int, int>> nextDp;
            for (int c = 0; c < grid[0].size(); c++) {
                int currVal = grid[r][c];
                int minVal = INT_MAX;
                for (auto& prev : dp) {
                    if (prev.second != c) {
                        minVal = min(minVal, currVal + prev.first);
                    }
                }
                nextDp.push_back({minVal, c});
            }
            dp = getMinTwo(nextDp);
        }

        int result = INT_MAX;
        for (auto& entry : dp) {
            result = min(result, entry.first);
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    minFallingPathSum(grid) {
        const N = grid.length;

        const getMinTwo = (row) => {
            const twoSmallest = [];
            for (const [val, idx] of row) {
                if (twoSmallest.length < 2) {
                    twoSmallest.push([val, idx]);
                } else if (twoSmallest[1][0] > val) {
                    twoSmallest.pop();
                    twoSmallest.push([val, idx]);
                }
                twoSmallest.sort((a, b) => a[0] - b[0]);
            }
            return twoSmallest;
        };

        const firstRow = grid[0].map((val, idx) => [val, idx]);
        let dp = getMinTwo(firstRow);

        for (let r = 1; r < N; r++) {
            const nextDp = [];
            for (let c = 0; c < grid[0].length; c++) {
                const currVal = grid[r][c];
                let minVal = Infinity;
                for (const [prevVal, prevC] of dp) {
                    if (c !== prevC) {
                        minVal = Math.min(minVal, currVal + prevVal);
                    }
                }
                nextDp.push([minVal, c]);
            }
            dp = getMinTwo(nextDp);
        }

        return Math.min(...dp.map(([val]) => val));
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 6. Dynamic Programming (Optimal)

::tabs-start

```python
class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        n = len(grid)
        if n == 1:
            return grid[0][0]

        dp_idx1 = dp_idx2 = -1
        dp_val1 = dp_val2 = 0

        for i in range(n):
            nextDp_idx1 = nextDp_idx2 = -1
            nextDp_val1 = nextDp_val2 = float("inf")

            for j in range(n):
                cur = dp_val1 if j != dp_idx1 else dp_val2
                cur += grid[i][j]

                if nextDp_idx1 == -1 or cur < nextDp_val1:
                    nextDp_idx2, nextDp_val2 = nextDp_idx1, nextDp_val1
                    nextDp_idx1, nextDp_val1 = j, cur
                elif nextDp_idx2 == -1 or cur < nextDp_val2:
                    nextDp_idx2, nextDp_val2 = j, cur

            dp_idx1, dp_idx2, dp_val1, dp_val2 = nextDp_idx1, nextDp_idx2, nextDp_val1, nextDp_val2

        return dp_val1
```

```java
public class Solution {
    public int minFallingPathSum(int[][] grid) {
        int n = grid.length;
        if (n == 1) {
            return grid[0][0];
        }

        int dpIdx1 = -1, dpIdx2 = -1;
        int dpVal1 = 0, dpVal2 = 0;

        for (int i = 0; i < n; i++) {
            int nextDpIdx1 = -1, nextDpIdx2 = -1;
            int nextDpVal1 = Integer.MAX_VALUE, nextDpVal2 = Integer.MAX_VALUE;

            for (int j = 0; j < n; j++) {
                int cur = (j != dpIdx1) ? dpVal1 : dpVal2;
                cur += grid[i][j];

                if (nextDpIdx1 == -1 || cur < nextDpVal1) {
                    nextDpIdx2 = nextDpIdx1;
                    nextDpVal2 = nextDpVal1;
                    nextDpIdx1 = j;
                    nextDpVal1 = cur;
                } else if (nextDpIdx2 == -1 || cur < nextDpVal2) {
                    nextDpIdx2 = j;
                    nextDpVal2 = cur;
                }
            }

            dpIdx1 = nextDpIdx1;
            dpIdx2 = nextDpIdx2;
            dpVal1 = nextDpVal1;
            dpVal2 = nextDpVal2;
        }

        return dpVal1;
    }
}
```

```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& grid) {
        int n = grid.size();
        if (n == 1) {
            return grid[0][0];
        }

        int dpIdx1 = -1, dpIdx2 = -1;
        int dpVal1 = 0, dpVal2 = 0;

        for (int i = 1; i < n; i++) {
            int nextDpIdx1 = -1, nextDpIdx2 = -1;
            int nextDpVal1 = INT_MAX, nextDpVal2 = INT_MAX;

            for (int j = 0; j < n; j++) {
                int cur = (j != dpIdx1) ? dpVal1 : dpVal2;
                cur += grid[i][j];

                if (nextDpIdx1 == -1 || cur < nextDpVal1) {
                    nextDpIdx2 = nextDpIdx1;
                    nextDpVal2 = nextDpVal1;
                    nextDpIdx1 = j;
                    nextDpVal1 = cur;
                } else if (nextDpIdx2 == -1 || cur < nextDpVal2) {
                    nextDpIdx2 = j;
                    nextDpVal2 = cur;
                }
            }

            dpIdx1 = nextDpIdx1;
            dpIdx2 = nextDpIdx2;
            dpVal1 = nextDpVal1;
            dpVal2 = nextDpVal2;
        }

        return dpVal1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    minFallingPathSum(grid) {
        const n = grid.length;
        if (n === 1) return grid[0][0];

        let dpIdx1 = -1,
            dpIdx2 = -1;
        let dpVal1 = 0,
            dpVal2 = 0;

        for (let i = 0; i < n; i++) {
            let nextDpIdx1 = -1,
                nextDpIdx2 = -1;
            let nextDpVal1 = Infinity,
                nextDpVal2 = Infinity;

            for (let j = 0; j < n; j++) {
                let cur = j !== dpIdx1 ? dpVal1 : dpVal2;
                cur += grid[i][j];

                if (nextDpIdx1 === -1 || cur < nextDpVal1) {
                    nextDpIdx2 = nextDpIdx1;
                    nextDpVal2 = nextDpVal1;
                    nextDpIdx1 = j;
                    nextDpVal1 = cur;
                } else if (nextDpIdx2 === -1 || cur < nextDpVal2) {
                    nextDpIdx2 = j;
                    nextDpVal2 = cur;
                }
            }

            dpIdx1 = nextDpIdx1;
            dpIdx2 = nextDpIdx2;
            dpVal1 = nextDpVal1;
            dpVal2 = nextDpVal2;
        }

        return dpVal1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.
