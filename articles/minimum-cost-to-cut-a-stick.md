## 1. Recursion

::tabs-start

```python
class Solution:
    def minCost(self, n: int, cuts: List[int]) -> int:
        def dfs(l, r):
            if r - l == 1:
                return 0
            res = float("inf")
            for c in cuts:
                if l < c < r:
                    res = min(res, (r - l) + dfs(l, c) + dfs(c, r))
            res = 0 if res == float("inf") else res
            return res

        return dfs(0, n)
```

```java
public class Solution {
    public int minCost(int n, int[] cuts) {
        return dfs(0, n, cuts);
    }

    private int dfs(int l, int r, int[] cuts) {
        if (r - l == 1) {
            return 0;
        }
        int res = Integer.MAX_VALUE;
        for (int c : cuts) {
            if (l < c && c < r) {
                res = Math.min(res, (r - l) + dfs(l, c, cuts) + dfs(c, r, cuts));
            }
        }
        return res == Integer.MAX_VALUE ? 0 : res;
    }
}
```

```cpp
class Solution {
public:
    int minCost(int n, vector<int>& cuts) {
        return dfs(0, n, cuts);
    }

private:
    int dfs(int l, int r, vector<int>& cuts) {
        if (r - l == 1) {
            return 0;
        }
        int res = INT_MAX;
        for (int c : cuts) {
            if (l < c && c < r) {
                res = min(res, (r - l) + dfs(l, c, cuts) + dfs(c, r, cuts));
            }
        }
        return res == INT_MAX ? 0 : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[]} cuts
     * @return {number}
     */
    minCost(n, cuts) {
        const dfs = (l, r) => {
            if (r - l === 1) {
                return 0;
            }
            let res = Infinity;
            for (const c of cuts) {
                if (l < c && c < r) {
                    res = Math.min(res, r - l + dfs(l, c) + dfs(c, r));
                }
            }
            return res === Infinity ? 0 : res;
        };

        return dfs(0, n);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m ^ N)$
- Space complexity: $O(N)$ for recursion stack.

> Where $m$ is the size of the $cuts$ array, $n$ is the length of the stick, and $N = min(n, m)$.

---

## 2. Dynamic Programming (Top-Down) - I

::tabs-start

```python
class Solution:
    def minCost(self, n: int, cuts: List[int]) -> int:
        dp = {}

        def dfs(l, r):
            if r - l == 1:
                return 0
            if (l, r) in dp:
                return dp[(l, r)]

            res = float("inf")
            for c in cuts:
                if l < c < r:
                    res = min(res, (r - l) + dfs(l, c) + dfs(c, r))
            res = 0 if res == float("inf") else res
            dp[(l, r)] = res
            return res

        return dfs(0, n)
```

```java
public class Solution {
    private Map<String, Integer> dp;

    public int minCost(int n, int[] cuts) {
        dp = new HashMap<>();
        return dfs(0, n, cuts);
    }

    private int dfs(int l, int r, int[] cuts) {
        if (r - l == 1) {
            return 0;
        }
        String key = l + "," + r;
        if (dp.containsKey(key)) {
            return dp.get(key);
        }

        int res = Integer.MAX_VALUE;
        for (int c : cuts) {
            if (l < c && c < r) {
                res = Math.min(res, (r - l) + dfs(l, c, cuts) + dfs(c, r, cuts));
            }
        }
        res = res == Integer.MAX_VALUE ? 0 : res;
        dp.put(key, res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minCost(int n, vector<int>& cuts) {
        return dfs(0, n, cuts);
    }

private:
    unordered_map<string, int> dp;

    int dfs(int l, int r, vector<int>& cuts) {
        if (r - l == 1) {
            return 0;
        }
        string key = to_string(l) + "," + to_string(r);
        if (dp.find(key) != dp.end()) {
            return dp[key];
        }

        int res = INT_MAX;
        for (int c : cuts) {
            if (l < c && c < r) {
                res = min(res, (r - l) + dfs(l, c, cuts) + dfs(c, r, cuts));
            }
        }
        res = res == INT_MAX ? 0 : res;
        dp[key] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[]} cuts
     * @return {number}
     */
    minCost(n, cuts) {
        const dp = new Map();

        const dfs = (l, r) => {
            if (r - l === 1) {
                return 0;
            }
            const key = `${l},${r}`;
            if (dp.has(key)) {
                return dp.get(key);
            }

            let res = Infinity;
            for (const c of cuts) {
                if (l < c && c < r) {
                    res = Math.min(res, r - l + dfs(l, c) + dfs(c, r));
                }
            }
            res = res === Infinity ? 0 : res;
            dp.set(key, res);
            return res;
        };

        return dfs(0, n);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * N ^ 2)$
- Space complexity: $O(N ^ 2)$

> Where $m$ is the size of the $cuts$ array, $n$ is the length of the stick, and $N = min(n, m)$.

---

## 3. Dynamic Programming (Top-Down) - II

::tabs-start

```python
class Solution:
    def minCost(self, n: int, cuts: List[int]) -> int:
        m = len(cuts)
        cuts.sort()
        dp = [[-1] * (m + 1) for _ in range(m + 1)]

        def dfs(l, r, i, j):
            if i > j:
                return 0
            if dp[i][j] != -1:
                return dp[i][j]

            res = float("inf")
            for mid in range(i, j + 1):
                cur = (r - l) + dfs(l, cuts[mid], i, mid - 1) + dfs(cuts[mid], r, mid + 1, j)
                res = min(res, cur)

            dp[i][j] = res
            return res

        return dfs(0, n, 0, m - 1)
```

```java
public class Solution {
    private int[][] dp;

    public int minCost(int n, int[] cuts) {
        int m = cuts.length;
        Arrays.sort(cuts);
        dp = new int[m + 1][m + 1];

        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }

        return dfs(0, n, 0, m - 1, cuts);
    }

    private int dfs(int l, int r, int i, int j, int[] cuts) {
        if (i > j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int res = Integer.MAX_VALUE;
        for (int mid = i; mid <= j; mid++) {
            int cur = (r - l) + dfs(l, cuts[mid], i, mid - 1, cuts) + dfs(cuts[mid], r, mid + 1, j, cuts);
            res = Math.min(res, cur);
        }

        dp[i][j] = res;
        return res;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    int minCost(int n, vector<int>& cuts) {
        int m = cuts.size();
        sort(cuts.begin(), cuts.end());
        dp = vector<vector<int>>(m + 1, vector<int>(m + 1, -1));
        return dfs(0, n, 0, m - 1, cuts);
    }

private:
    int dfs(int l, int r, int i, int j, vector<int>& cuts) {
        if (i > j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int res = INT_MAX;
        for (int mid = i; mid <= j; mid++) {
            int cur = (r - l) + dfs(l, cuts[mid], i, mid - 1, cuts) + dfs(cuts[mid], r, mid + 1, j, cuts);
            res = min(res, cur);
        }

        dp[i][j] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[]} cuts
     * @return {number}
     */
    minCost(n, cuts) {
        const m = cuts.length;
        cuts.sort((a, b) => a - b);
        const dp = Array.from({ length: m + 1 }, () => Array(m + 1).fill(-1));

        const dfs = (l, r, i, j) => {
            if (i > j) return 0;
            if (dp[i][j] !== -1) return dp[i][j];

            let res = Infinity;
            for (let mid = i; mid <= j; mid++) {
                const cur =
                    r -
                    l +
                    dfs(l, cuts[mid], i, mid - 1) +
                    dfs(cuts[mid], r, mid + 1, j);
                res = Math.min(res, cur);
            }

            dp[i][j] = res;
            return res;
        };

        return dfs(0, n, 0, m - 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m\log m + m ^ 3)$
- Space complexity: $O(m ^ 2)$

> Where $m$ is the size of the $cuts$ array and $n$ is the length of the stick.

---

## 4. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def minCost(self, n: int, cuts: List[int]) -> int:
        m = len(cuts)
        cuts = [0] + sorted(cuts) + [n]
        dp = [[0] * (m + 2) for _ in range(m + 2)]

        for length in range(2, m + 2):
            for i in range(m + 2 - length):
                j = i + length
                dp[i][j] = float("inf")
                for mid in range(i + 1, j):
                    dp[i][j] = min(
                        dp[i][j],
                        cuts[j] - cuts[i] + dp[i][mid] + dp[mid][j]
                    )

        return dp[0][m + 1]
```

```java
public class Solution {
    public int minCost(int n, int[] cuts) {
        int m = cuts.length;
        int[] newCuts = new int[m + 2];
        System.arraycopy(cuts, 0, newCuts, 1, m);
        newCuts[0] = 0;
        newCuts[m + 1] = n;
        Arrays.sort(newCuts);

        int[][] dp = new int[m + 2][m + 2];

        for (int length = 2; length <= m + 1; length++) {
            for (int i = 0; i + length <= m + 1; i++) {
                int j = i + length;
                dp[i][j] = Integer.MAX_VALUE;
                for (int mid = i + 1; mid < j; mid++) {
                    dp[i][j] = Math.min(dp[i][j],
                        newCuts[j] - newCuts[i] + dp[i][mid] + dp[mid][j]);
                }
            }
        }

        return dp[0][m + 1];
    }
}
```

```cpp
class Solution {
public:
    int minCost(int n, vector<int>& cuts) {
        int m = cuts.size();
        cuts.push_back(0);
        cuts.push_back(n);
        sort(cuts.begin(), cuts.end());

        vector<vector<int>> dp(m + 2, vector<int>(m + 2, 0));

        for (int length = 2; length <= m + 1; length++) {
            for (int i = 0; i + length <= m + 1; i++) {
                int j = i + length;
                dp[i][j] = INT_MAX;
                for (int mid = i + 1; mid < j; mid++) {
                    dp[i][j] = min(dp[i][j],
                        cuts[j] - cuts[i] + dp[i][mid] + dp[mid][j]);
                }
            }
        }

        return dp[0][m + 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[]} cuts
     * @return {number}
     */
    minCost(n, cuts) {
        const m = cuts.length;
        cuts = [0, ...cuts.sort((a, b) => a - b), n];
        const dp = Array.from({ length: m + 2 }, () => Array(m + 2).fill(0));

        for (let length = 2; length <= m + 1; length++) {
            for (let i = 0; i + length <= m + 1; i++) {
                const j = i + length;
                dp[i][j] = Infinity;
                for (let mid = i + 1; mid < j; mid++) {
                    dp[i][j] = Math.min(
                        dp[i][j],
                        cuts[j] - cuts[i] + dp[i][mid] + dp[mid][j],
                    );
                }
            }
        }

        return dp[0][m + 1];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m\log m + m ^ 3)$
- Space complexity: $O(m ^ 2)$

> Where $m$ is the size of the $cuts$ array and $n$ is the length of the stick.
