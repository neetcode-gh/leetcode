## 1. Recursion

::tabs-start

```python
class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        def rec(row, glass):
            if row < 0 or glass < 0 or glass > row:
                return 0

            if row == 0 and glass == 0:
                return poured

            left_parent = max(0, rec(row - 1, glass - 1) - 1)
            right_parent = max(0, rec(row - 1, glass) - 1)

            return (left_parent + right_parent) / 2

        return min(1, rec(query_row, query_glass))
```

```java
public class Solution {
    public double champagneTower(int poured, int query_row, int query_glass) {
        return Math.min(1, rec(poured, query_row, query_glass));
    }

    private double rec(int poured, int row, int glass) {
        if (row < 0 || glass < 0 || glass > row) {
            return 0;
        }

        if (row == 0 && glass == 0) {
            return poured;
        }

        double leftParent = Math.max(0, rec(poured, row - 1, glass - 1) - 1);
        double rightParent = Math.max(0, rec(poured, row - 1, glass) - 1);

        return (leftParent + rightParent) / 2;
    }
}
```

```cpp
class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        return min(1.0, rec(poured, query_row, query_glass));
    }

private:
    double rec(int poured, int row, int glass) {
        if (row < 0 || glass < 0 || glass > row) {
            return 0;
        }

        if (row == 0 && glass == 0) {
            return poured;
        }

        double leftParent = max(0.0, rec(poured, row - 1, glass - 1) - 1);
        double rightParent = max(0.0, rec(poured, row - 1, glass) - 1);

        return (leftParent + rightParent) / 2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} poured
     * @param {number} query_row
     * @param {number} query_glass
     * @return {number}
     */
    champagneTower(poured, query_row, query_glass) {
        const rec = (row, glass) => {
            if (row < 0 || glass < 0 || glass > row) {
                return 0;
            }

            if (row === 0 && glass === 0) {
                return poured;
            }

            const leftParent = Math.max(0, rec(row - 1, glass - 1) - 1);
            const rightParent = Math.max(0, rec(row - 1, glass) - 1);

            return (leftParent + rightParent) / 2;
        };

        return Math.min(1, rec(query_row, query_glass));
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$

> Where $n$ is the given $queryRow$.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        memo = { (0, 0) : poured }

        def rec(row, glass):
            if row < 0 or glass < 0 or glass > row:
                return 0
            if (row, glass) in memo:
                return memo[(row, glass)]

            left_parent = max(0, rec(row - 1, glass - 1) - 1)
            right_parent = max(0, rec(row - 1, glass) - 1)

            memo[(row, glass)] = (left_parent + right_parent) / 2
            return memo[(row, glass)]

        return min(1, rec(query_row, query_glass))
```

```java
public class Solution {
    public double champagneTower(int poured, int query_row, int query_glass) {
        double[][] memo = new double[query_row + 5][];
        for (int i = 0; i < query_row + 5; i++) {
            memo[i] = new double[i + 1];
            Arrays.fill(memo[i], -1);
        }
        memo[0][0] = poured;

        return Math.min(1, rec(memo, query_row, query_glass));
    }

    private double rec(double[][] memo, int row, int glass) {
        if (row < 0 || glass < 0 || glass > row) {
            return 0;
        }

        if (memo[row][glass] != -1) {
            return memo[row][glass];
        }

        double leftParent = Math.max(0, rec(memo, row - 1, glass - 1) - 1);
        double rightParent = Math.max(0, rec(memo, row - 1, glass) - 1);

        memo[row][glass] = (leftParent + rightParent) / 2;
        return memo[row][glass];
    }
}
```

```cpp
class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        vector<vector<double>> memo(query_row + 5);
        for (int i = 0; i <= query_row + 4; i++) {
            memo[i].resize(i + 1, -1);
        }

        memo[0][0] = poured;
        return min(1.0, rec(memo, query_row, query_glass));
    }

private:
    double rec(vector<vector<double>>& memo, int row, int glass) {
        if (row < 0 || glass < 0 || glass > row) {
            return 0;
        }

        if (memo[row][glass] != -1) {
            return memo[row][glass];
        }

        double leftParent = max(0.0, rec(memo, row - 1, glass - 1) - 1);
        double rightParent = max(0.0, rec(memo, row - 1, glass) - 1);

        memo[row][glass] = (leftParent + rightParent) / 2;
        return memo[row][glass];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} poured
     * @param {number} query_row
     * @param {number} query_glass
     * @return {number}
     */
    champagneTower(poured, query_row, query_glass) {
        const memo = Array.from({ length: query_row + 5 }, (_, i) =>
            Array(i + 1).fill(-1),
        );
        memo[0][0] = poured;

        const rec = (row, glass) => {
            if (row < 0 || glass < 0 || glass > row) {
                return 0;
            }

            if (memo[row][glass] != -1) {
                return memo[row][glass];
            }

            const leftParent = Math.max(0, rec(row - 1, glass - 1) - 1);
            const rightParent = Math.max(0, rec(row - 1, glass) - 1);

            memo[row][glass] = (leftParent + rightParent) / 2;
            return memo[row][glass];

            return (leftParent + rightParent) / 2;
        };

        return Math.min(1, rec(query_row, query_glass));
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the given $queryRow$ and $m$ is the given $queryGlass$.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        dp = [[0] * (i + 1) for i in range(query_row + 5)]
        dp[0][0] += poured

        for row in range(min(99, query_row + 1)):
            for glass in range(row + 1):
                excess = (dp[row][glass] - 1.0) / 2.0
                if excess > 0:
                    dp[row + 1][glass] += excess
                    dp[row + 1][glass + 1] += excess

        return min(1.0, dp[query_row][query_glass])
```

```java
public class Solution {
    public double champagneTower(int poured, int query_row, int query_glass) {
        double[][] dp = new double[query_row + 5][];
        for (int i = 0; i < query_row + 5; i++) {
            dp[i] = new double[i + 1];
        }

        dp[0][0] += poured;

        for (int row = 0; row < Math.min(99, query_row + 1); row++) {
            for (int glass = 0; glass <= row; glass++) {
                double excess = (dp[row][glass] - 1.0) / 2.0;
                if (excess > 0) {
                    dp[row + 1][glass] += excess;
                    dp[row + 1][glass + 1] += excess;
                }
            }
        }

        return Math.min(1.0, dp[query_row][query_glass]);
    }
}
```

```cpp
class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        vector<vector<double>> dp(query_row + 5);
        for (int i = 0; i <= query_row + 4; i++) {
            dp[i].resize(i + 1, 0);
        }

        dp[0][0] += poured;

        for (int row = 0; row < min(99, query_row + 1); row++) {
            for (int glass = 0; glass <= row; glass++) {
                double excess = (dp[row][glass] - 1.0) / 2.0;
                if (excess > 0) {
                    dp[row + 1][glass] += excess;
                    dp[row + 1][glass + 1] += excess;
                }
            }
        }

        return min(1.0, dp[query_row][query_glass]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} poured
     * @param {number} query_row
     * @param {number} query_glass
     * @return {number}
     */
    champagneTower(poured, query_row, query_glass) {
        const dp = Array.from({ length: query_row + 5 }, (_, i) =>
            Array(i + 1).fill(0),
        );
        dp[0][0] += poured;

        for (let row = 0; row < Math.min(99, query_row + 1); row++) {
            for (let glass = 0; glass <= row; glass++) {
                const excess = (dp[row][glass] - 1.0) / 2.0;
                if (excess > 0) {
                    dp[row + 1][glass] += excess;
                    dp[row + 1][glass + 1] += excess;
                }
            }
        }

        return Math.min(1.0, dp[query_row][query_glass]);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the given $queryRow$ and $m$ is the given $queryGlass$.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        prev_row = [poured]  # Flow

        for row in range(1, query_row + 1):
            cur_row = [0] * (row + 1)
            for i in range(row):
                extra = prev_row[i] - 1
                if extra > 0:
                    cur_row[i] += 0.5 * extra
                    cur_row[i + 1] += 0.5 * extra
            prev_row = cur_row

        return min(1, prev_row[query_glass])
```

```java
public class Solution {
    public double champagneTower(int poured, int query_row, int query_glass) {
        double[] prev_row = new double[] { poured };  // Flow

        for (int row = 1; row <= query_row; row++) {
            double[] cur_row = new double[row + 1];
            for (int i = 0; i < row; i++) {
                double extra = prev_row[i] - 1;
                if (extra > 0) {
                    cur_row[i] += 0.5 * extra;
                    cur_row[i + 1] += 0.5 * extra;
                }
            }
            prev_row = cur_row;
        }

        return Math.min(1.0, prev_row[query_glass]);
    }
}
```

```cpp
class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        vector<double> prev_row = {double(poured)};  // Flow

        for (int row = 1; row <= query_row; row++) {
            vector<double> cur_row(row + 1, 0);
            for (int i = 0; i < row; i++) {
                double extra = prev_row[i] - 1;
                if (extra > 0) {
                    cur_row[i] += 0.5 * extra;
                    cur_row[i + 1] += 0.5 * extra;
                }
            }
            prev_row = cur_row;
        }

        return min(1.0, prev_row[query_glass]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} poured
     * @param {number} query_row
     * @param {number} query_glass
     * @return {number}
     */
    champagneTower(poured, query_row, query_glass) {
        let prev_row = [poured]; // Flow

        for (let row = 1; row <= query_row; row++) {
            let cur_row = new Array(row + 1).fill(0);
            for (let i = 0; i < row; i++) {
                let extra = prev_row[i] - 1;
                if (extra > 0) {
                    cur_row[i] += 0.5 * extra;
                    cur_row[i + 1] += 0.5 * extra;
                }
            }
            prev_row = cur_row;
        }

        return Math.min(1, prev_row[query_glass]);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the given $queryRow$ and $m$ is the given $queryGlass$.

---

## 5. Dynamic Programming (Optimal)

::tabs-start

```python
class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        dp = [poured] + [0] * query_row

        for row in range(1, query_row + 1):
            for i in range(row - 1, -1, -1):
                extra = dp[i] - 1
                if extra > 0:
                    dp[i] = 0.5 * extra
                    dp[i + 1] += 0.5 * extra
                else:
                    dp[i] = 0

        return min(1, dp[query_glass])
```

```java
public class Solution {
    public double champagneTower(int poured, int query_row, int query_glass) {
        double[] dp = new double[query_row + 1];
        dp[0] = poured;

        for (int row = 1; row <= query_row; row++) {
            for (int i = row - 1; i >= 0; i--) {
                double extra = dp[i] - 1;
                if (extra > 0) {
                    dp[i] = 0.5 * extra;
                    dp[i + 1] += 0.5 * extra;
                } else {
                    dp[i] = 0;
                }
            }
        }

        return Math.min(1, dp[query_glass]);
    }
}
```

```cpp
class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        vector<double> dp(query_row + 1, 0);
        dp[0] = poured;

        for (int row = 1; row <= query_row; row++) {
            for (int i = row - 1; i >= 0; i--) {
                double extra = dp[i] - 1;
                if (extra > 0) {
                    dp[i] = 0.5 * extra;
                    dp[i + 1] += 0.5 * extra;
                } else {
                    dp[i] = 0;
                }
            }
        }

        return min(1.0, dp[query_glass]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} poured
     * @param {number} query_row
     * @param {number} query_glass
     * @return {number}
     */
    champagneTower(poured, query_row, query_glass) {
        let dp = new Array(query_row + 1).fill(0);
        dp[0] = poured;

        for (let row = 1; row <= query_row; row++) {
            for (let i = row - 1; i >= 0; i--) {
                let extra = dp[i] - 1;
                if (extra > 0) {
                    dp[i] = 0.5 * extra;
                    dp[i + 1] += 0.5 * extra;
                } else {
                    dp[i] = 0;
                }
            }
        }

        return Math.min(1, dp[query_glass]);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the given $queryRow$ and $m$ is the given $queryGlass$.
