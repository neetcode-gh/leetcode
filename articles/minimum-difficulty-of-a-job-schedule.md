## 1. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def minDifficulty(self, jobDifficulty: List[int], d: int) -> int:
        if len(jobDifficulty) < d:
            return -1

        n = len(jobDifficulty)
        dp = {}

        def dfs(i, d, cur_max):
            if i == n:
                return 0 if d == 0 else float("inf")
            if d == 0:
                return float("inf")
            if (i, d, cur_max) in dp:
                return dp[(i, d, cur_max)]

            cur_max = max(cur_max, jobDifficulty[i])
            res = min(
                dfs(i + 1, d, cur_max),
                cur_max + dfs(i + 1, d - 1, -1)
            )
            dp[(i, d, cur_max)] = res
            return res

        return dfs(0, d, -1)
```

```java
public class Solution {
    private int[][][] dp;

    public int minDifficulty(int[] jobDifficulty, int d) {
        int n = jobDifficulty.length;
        if (n < d) return -1;
        int m = 0;
        for (int i = 0; i < n; i++) {
            m = Math.max(m, jobDifficulty[i]);
        }

        dp = new int[n][d + 1][m + 5];
        for (int[][] layer : dp) {
            for (int[] row : layer) {
                Arrays.fill(row, -1);
            }
        }

        return dfs(0, d, -1, jobDifficulty);
    }

    private int dfs(int i, int d, int curMax, int[] jobDifficulty) {
        if (i == jobDifficulty.length) return d == 0 ? 0 : Integer.MAX_VALUE / 2;
        if (d == 0) return Integer.MAX_VALUE / 2;
        if (dp[i][d][curMax + 1] != -1) return dp[i][d][curMax + 1];

        int maxSoFar = Math.max(curMax, jobDifficulty[i]);
        int res = Math.min(
            dfs(i + 1, d, maxSoFar, jobDifficulty),
            maxSoFar + dfs(i + 1, d - 1, -1, jobDifficulty)
        );

        dp[i][d][curMax + 1] = res;
        return res;
    }
}
```

```cpp
class Solution {
    vector<vector<vector<int>>> dp;

    int dfs(int i, int d, int curMax, const vector<int>& jobDifficulty) {
        if (i == jobDifficulty.size()) return d == 0 ? 0 : INT_MAX / 2;
        if (d == 0) return INT_MAX / 2;
        if (dp[i][d][curMax + 1] != -1) return dp[i][d][curMax + 1];

        int maxSoFar = max(curMax, jobDifficulty[i]);
        int res = min(
            dfs(i + 1, d, maxSoFar, jobDifficulty),
            maxSoFar + dfs(i + 1, d - 1, -1, jobDifficulty)
        );

        dp[i][d][curMax + 1] = res;
        return res;
    }

public:
    int minDifficulty(vector<int>& jobDifficulty, int d) {
        int n = jobDifficulty.size();
        if (n < d) return -1;

        int m = *max_element(jobDifficulty.begin(), jobDifficulty.end());
        dp = vector<vector<vector<int>>>(n, vector<vector<int>>(d + 1, vector<int>(m + 5, -1)));
        return dfs(0, d, -1, jobDifficulty);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} jobDifficulty
     * @param {number} d
     * @return {number}
     */
    minDifficulty(jobDifficulty, d) {
        const n = jobDifficulty.length;
        if (n < d) return -1;
        let m = 0;
        for (let it of jobDifficulty) {
            m = Math.max(m, it);
        }

        const dp = Array.from({ length: n }, () =>
            Array.from({ length: d + 1 }, () => Array(m + 5).fill(-1)),
        );

        const dfs = (i, d, curMax) => {
            if (i === n) return d === 0 ? 0 : Infinity;
            if (d === 0) return Infinity;
            if (dp[i][d][curMax + 1] !== -1) return dp[i][d][curMax + 1];

            const maxSoFar = Math.max(curMax, jobDifficulty[i]);
            const res = Math.min(
                dfs(i + 1, d, maxSoFar),
                maxSoFar + dfs(i + 1, d - 1, -1),
            );

            dp[i][d][curMax + 1] = res;
            return res;
        };

        return dfs(0, d, -1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * d * m)$
- Space complexity: $O(n * d * m)$

> Where $n$ is the number of jobs, $d$ is the number of days, and $m$ is the maximum difficulty value among all the job difficulties.

---

## 2. Dynamic Programming (Top-Down Optimized)

::tabs-start

```python
class Solution:
    def minDifficulty(self, jobDifficulty: List[int], d: int) -> int:
        if len(jobDifficulty) < d:
            return -1

        n = len(jobDifficulty)
        dp = {}

        def dfs(i, d):
            if (i, d) in dp:
                return dp[(i, d)]

            maxi = jobDifficulty[i]
            if d == 1:
                idx = i
                while i < n:
                    maxi = max(maxi, jobDifficulty[i])
                    i += 1
                dp[(idx, d)] = maxi
                return maxi

            res = float("inf")
            for j in range(i + 1, n):
                res = min(res, maxi + dfs(j, d - 1))
                maxi = max(maxi, jobDifficulty[j])
            dp[(i, d)] = res
            return res

        return dfs(0, d)
```

```java
public class Solution {
    private int[][] dp;

    public int minDifficulty(int[] jobDifficulty, int d) {
        int n = jobDifficulty.length;
        if (n < d) return -1;

        dp = new int[n][d + 1];
        for (int[] row : dp) Arrays.fill(row, -1);

        return dfs(0, d, jobDifficulty);
    }

    private int dfs(int i, int d, int[] jobDifficulty) {
        if (dp[i][d] != -1) return dp[i][d];

        int n = jobDifficulty.length;
        int maxi = jobDifficulty[i];
        if (d == 1) {
            for (int j = i; j < n; j++) {
                maxi = Math.max(maxi, jobDifficulty[j]);
            }
            dp[i][d] = maxi;
            return maxi;
        }

        int res = Integer.MAX_VALUE / 2;
        for (int j = i + 1; j < n; j++) {
            res = Math.min(res, maxi + dfs(j, d - 1, jobDifficulty));
            maxi = Math.max(maxi, jobDifficulty[j]);
        }
        dp[i][d] = res;
        return res;
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;

public:
    int minDifficulty(vector<int>& jobDifficulty, int d) {
        int n = jobDifficulty.size();
        if (n < d) return -1;

        dp.assign(n, vector<int>(d + 1, -1));
        return dfs(0, d, jobDifficulty);
    }

private:
    int dfs(int i, int d, vector<int>& jobDifficulty) {
        if (dp[i][d] != -1) return dp[i][d];

        int n = jobDifficulty.size();
        int maxi = jobDifficulty[i];
        if (d == 1) {
            for (int j = i; j < n; j++) {
                maxi = max(maxi, jobDifficulty[j]);
            }
            dp[i][d] = maxi;
            return maxi;
        }

        int res = INT_MAX / 2;
        for (int j = i + 1; j < n; j++) {
            res = min(res, maxi + dfs(j, d - 1, jobDifficulty));
            maxi = max(maxi, jobDifficulty[j]);
        }
        dp[i][d] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} jobDifficulty
     * @param {number} d
     * @return {number}
     */
    minDifficulty(jobDifficulty, d) {
        const n = jobDifficulty.length;
        if (n < d) return -1;

        const dp = Array.from({ length: n }, () => Array(d + 1).fill(-1));

        const dfs = (i, d) => {
            if (dp[i][d] !== -1) return dp[i][d];

            let maxi = jobDifficulty[i];
            if (d === 1) {
                for (let j = i; j < n; j++) {
                    maxi = Math.max(maxi, jobDifficulty[j]);
                }
                dp[i][d] = maxi;
                return maxi;
            }

            let res = Infinity;
            for (let j = i + 1; j < n; j++) {
                res = Math.min(res, maxi + dfs(j, d - 1));
                maxi = Math.max(maxi, jobDifficulty[j]);
            }
            dp[i][d] = res;
            return res;
        };

        return dfs(0, d);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * d)$
- Space complexity: $O(n * d)$

> Where $n$ is the number of jobs and $d$ is the number of days.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def minDifficulty(self, jobDifficulty: List[int], d: int) -> int:
        if len(jobDifficulty) < d:
            return -1

        n = len(jobDifficulty)
        dp = [[float("inf")] * (d + 1) for _ in range(n + 1)]
        dp[n][0] = 0

        for day in range(1, d + 1):
            for i in range(n - 1, -1, -1):
                maxi = 0
                for j in range(i, n - day + 1):
                    maxi = max(maxi, jobDifficulty[j])
                    dp[i][day] = min(dp[i][day], maxi + dp[j + 1][day - 1])

        return dp[0][d]
```

```java
public class Solution {
    public int minDifficulty(int[] jobDifficulty, int d) {
        int n = jobDifficulty.length;
        if (n < d) return -1;

        int[][] dp = new int[n + 1][d + 1];
        for (int[] row : dp) Arrays.fill(row, Integer.MAX_VALUE / 2);
        dp[n][0] = 0;

        for (int day = 1; day <= d; day++) {
            for (int i = n - 1; i >= 0; i--) {
                int maxi = 0;
                for (int j = i; j <= n - day; j++) {
                    maxi = Math.max(maxi, jobDifficulty[j]);
                    dp[i][day] = Math.min(dp[i][day], maxi + dp[j + 1][day - 1]);
                }
            }
        }

        return dp[0][d];
    }
}
```

```cpp
class Solution {
public:
    int minDifficulty(vector<int>& jobDifficulty, int d) {
        int n = jobDifficulty.size();
        if (n < d) return -1;

        vector<vector<int>> dp(n + 1, vector<int>(d + 1, INT_MAX / 2));
        dp[n][0] = 0;

        for (int day = 1; day <= d; day++) {
            for (int i = n - 1; i >= 0; i--) {
                int maxi = 0;
                for (int j = i; j <= n - day; j++) {
                    maxi = max(maxi, jobDifficulty[j]);
                    dp[i][day] = min(dp[i][day], maxi + dp[j + 1][day - 1]);
                }
            }
        }

        return dp[0][d];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} jobDifficulty
     * @param {number} d
     * @return {number}
     */
    minDifficulty(jobDifficulty, d) {
        const n = jobDifficulty.length;
        if (n < d) return -1;

        const dp = Array.from({ length: n + 1 }, () =>
            Array(d + 1).fill(Infinity),
        );
        dp[n][0] = 0;

        for (let day = 1; day <= d; day++) {
            for (let i = n - 1; i >= 0; i--) {
                let maxi = 0;
                for (let j = i; j <= n - day; j++) {
                    maxi = Math.max(maxi, jobDifficulty[j]);
                    dp[i][day] = Math.min(
                        dp[i][day],
                        maxi + dp[j + 1][day - 1],
                    );
                }
            }
        }

        return dp[0][d];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * d)$
- Space complexity: $O(n * d)$

> Where $n$ is the number of jobs and $d$ is the number of days.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def minDifficulty(self, jobDifficulty: List[int], d: int) -> int:
        if len(jobDifficulty) < d:
            return -1

        n = len(jobDifficulty)
        dp = [float("inf")] * (n + 1)
        dp[n] = 0

        for day in range(1, d + 1):
            for i in range(n - day + 1):
                maxi = 0
                dp[i] = float("inf")
                for j in range(i, n - day + 1):
                    maxi = max(maxi, jobDifficulty[j])
                    dp[i] = min(dp[i], maxi + dp[j + 1])

        return dp[0]
```

```java
public class Solution {
    public int minDifficulty(int[] jobDifficulty, int d) {
        int n = jobDifficulty.length;
        if (n < d) return -1;

        int INF = Integer.MAX_VALUE / 2;
        int[] dp = new int[n + 1];
        Arrays.fill(dp, INF);
        dp[n] = 0;

        for (int day = 1; day <= d; day++) {
            for (int i = 0; i <= n - day; i++) {
                int maxi = 0;
                dp[i] = INF;
                for (int j = i; j <= n - day; j++) {
                    maxi = Math.max(maxi, jobDifficulty[j]);
                    dp[i] = Math.min(dp[i], maxi + dp[j + 1]);
                }
            }
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int minDifficulty(vector<int>& jobDifficulty, int d) {
        int n = jobDifficulty.size();
        if (n < d) return -1;

        int INF = INT_MAX / 2;
        vector<int> dp(n + 1, INF);
        dp[n] = 0;

        for (int day = 1; day <= d; day++) {
            for (int i = 0; i <= n - day; i++) {
                int maxi = 0;
                dp[i] = INF;
                for (int j = i; j <= n - day; j++) {
                    maxi = max(maxi, jobDifficulty[j]);
                    dp[i] = min(dp[i], maxi + dp[j + 1]);
                }
            }
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} jobDifficulty
     * @param {number} d
     * @return {number}
     */
    minDifficulty(jobDifficulty, d) {
        const n = jobDifficulty.length;
        if (n < d) return -1;

        let dp = new Array(n + 1).fill(Infinity);
        dp[n] = 0;

        for (let day = 1; day <= d; day++) {
            for (let i = 0; i <= n - day; i++) {
                let maxi = 0;
                dp[i] = Infinity;
                for (let j = i; j <= n - day; j++) {
                    maxi = Math.max(maxi, jobDifficulty[j]);
                    dp[i] = Math.min(dp[i], maxi + dp[j + 1]);
                }
            }
        }

        return dp[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * d)$
- Space complexity: $O(n)$

> Where $n$ is the number of jobs and $d$ is the number of days.

---

## 5. Monotonic Decreasing Stack

::tabs-start

```python
class Solution:
    def minDifficulty(self, jobDifficulty: List[int], d: int) -> int:
        n = len(jobDifficulty)
        if n < d:
            return -1

        dp = [float("inf")] * n
        for day in range(1, d + 1):
            next_dp = [float("inf")] * n
            stack = []
            for i in range(day - 1, n):
                next_dp[i] = dp[i - 1] + jobDifficulty[i] if i > 0 else jobDifficulty[i]
                while stack and jobDifficulty[stack[-1]] <= jobDifficulty[i]:
                    j = stack.pop()
                    next_dp[i] = min(next_dp[i], next_dp[j] - jobDifficulty[j] + jobDifficulty[i])
                if stack:
                    next_dp[i] = min(next_dp[i], next_dp[stack[-1]])
                stack.append(i)
            dp = next_dp

        return dp[-1]
```

```java
public class Solution {
    public int minDifficulty(int[] jobDifficulty, int d) {
        int n = jobDifficulty.length;
        if (n < d) return -1;

        int[] dp = new int[n];
        Arrays.fill(dp, Integer.MAX_VALUE / 2);

        for (int day = 1; day <= d; day++) {
            int[] nextDp = new int[n];
            Arrays.fill(nextDp, Integer.MAX_VALUE / 2);
            Stack<Integer> stack = new Stack<>();
            for (int i = day - 1; i < n; i++) {
                nextDp[i] = (i > 0 ? dp[i - 1] : 0) + jobDifficulty[i];
                while (!stack.isEmpty() && jobDifficulty[stack.peek()] <= jobDifficulty[i]) {
                    int j = stack.pop();
                    nextDp[i] = Math.min(nextDp[i], nextDp[j] - jobDifficulty[j] + jobDifficulty[i]);
                }
                if (!stack.isEmpty()) {
                    nextDp[i] = Math.min(nextDp[i], nextDp[stack.peek()]);
                }
                stack.add(i);
            }
            dp = nextDp;
        }

        return dp[n - 1];
    }
}
```

```cpp
class Solution {
public:
    int minDifficulty(vector<int>& jobDifficulty, int d) {
        int n = jobDifficulty.size();
        if (n < d) return -1;

        vector<int> dp(n, INT_MAX / 2);

        for (int day = 1; day <= d; day++) {
            vector<int> nextDp(n, INT_MAX / 2);
            stack<int> st;
            for (int i = day - 1; i < n; i++) {
                nextDp[i] = (i > 0 ? dp[i - 1] : 0) + jobDifficulty[i];
                while (!st.empty() && jobDifficulty[st.top()] <= jobDifficulty[i]) {
                    int j = st.top(); st.pop();
                    nextDp[i] = min(nextDp[i], nextDp[j] - jobDifficulty[j] + jobDifficulty[i]);
                }
                if (!st.empty()) {
                    nextDp[i] = min(nextDp[i], nextDp[st.top()]);
                }
                st.push(i);
            }
            dp = nextDp;
        }

        return dp[n - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} jobDifficulty
     * @param {number} d
     * @return {number}
     */
    minDifficulty(jobDifficulty, d) {
        const n = jobDifficulty.length;
        if (n < d) return -1;

        let dp = Array(n).fill(Infinity);

        for (let day = 1; day <= d; day++) {
            const nextDp = Array(n).fill(Infinity);
            const stack = [];
            for (let i = day - 1; i < n; i++) {
                nextDp[i] = (i > 0 ? dp[i - 1] : 0) + jobDifficulty[i];
                while (
                    stack.length > 0 &&
                    jobDifficulty[stack[stack.length - 1]] <= jobDifficulty[i]
                ) {
                    const j = stack.pop();
                    nextDp[i] = Math.min(
                        nextDp[i],
                        nextDp[j] - jobDifficulty[j] + jobDifficulty[i],
                    );
                }
                if (stack.length > 0) {
                    nextDp[i] = Math.min(
                        nextDp[i],
                        nextDp[stack[stack.length - 1]],
                    );
                }
                stack.push(i);
            }
            dp = nextDp;
        }

        return dp[n - 1];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * d)$
- Space complexity: $O(n)$

> Where $n$ is the number of jobs and $d$ is the number of days.
