## 1. Recursion

::tabs-start

```python
class Solution:
    def twoCitySchedCost(self, costs: List[List[int]]) -> int:
        n = len(costs) // 2

        def dfs(i, aCount, bCount):
            if i == len(costs):
                return 0

            res = float("inf")
            if aCount > 0:
                res = costs[i][0] + dfs(i + 1, aCount - 1, bCount)

            if bCount > 0:
                res = min(res, costs[i][1] + dfs(i + 1, aCount, bCount - 1))
            return res

        return dfs(0, n, n)
```

```java
public class Solution {
    public int twoCitySchedCost(int[][] costs) {
        int n = costs.length / 2;
        return dfs(costs, 0, n, n);
    }

    private int dfs(int[][] costs, int i, int aCount, int bCount) {
        if (i == costs.length) {
            return 0;
        }

        int res = Integer.MAX_VALUE;
        if (aCount > 0) {
            res = costs[i][0] + dfs(costs, i + 1, aCount - 1, bCount);
        }

        if (bCount > 0) {
            res = Math.min(res, costs[i][1] + dfs(costs, i + 1, aCount, bCount - 1));
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int twoCitySchedCost(vector<vector<int>>& costs) {
        int n = costs.size() / 2;
        return dfs(costs, 0, n, n);
    }

private:
    int dfs(vector<vector<int>>& costs, int i, int aCount, int bCount) {
        if (i == costs.size()) {
            return 0;
        }

        int res = INT_MAX;
        if (aCount > 0) {
            res = costs[i][0] + dfs(costs, i + 1, aCount - 1, bCount);
        }

        if (bCount > 0) {
            res = min(res, costs[i][1] + dfs(costs, i + 1, aCount, bCount - 1));
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    twoCitySchedCost(costs) {
        let n = costs.length / 2;

        const dfs = (i, aCount, bCount) => {
            if (i === costs.length) {
                return 0;
            }

            let res = Infinity;
            if (aCount > 0) {
                res = costs[i][0] + dfs(i + 1, aCount - 1, bCount);
            }

            if (bCount > 0) {
                res = Math.min(
                    res,
                    costs[i][1] + dfs(i + 1, aCount, bCount - 1),
                );
            }

            return res;
        };

        return dfs(0, n, n);
    }
}
```

```csharp
public class Solution {
    public int TwoCitySchedCost(int[][] costs) {
        int n = costs.Length / 2;

        int Dfs(int i, int aCount, int bCount) {
            if (i == costs.Length) return 0;

            int res = int.MaxValue;
            if (aCount > 0) {
                res = costs[i][0] + Dfs(i + 1, aCount - 1, bCount);
            }

            if (bCount > 0) {
                res = Math.Min(res, costs[i][1] + Dfs(i + 1, aCount, bCount - 1));
            }
            return res;
        }

        return Dfs(0, n, n);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ N)$
- Space complexity: $O(N)$ for recursion stack.

> Where $N$ is the size of the array $costs$.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def twoCitySchedCost(self, costs: List[List[int]]) -> int:
        n = len(costs) // 2
        dp = [[-1] * (n + 1) for _ in range(n + 1)]

        def dfs(i, aCount, bCount):
            if i == len(costs):
                return 0
            if dp[aCount][bCount] != -1:
                return dp[aCount][bCount]

            res = float("inf")
            if aCount > 0:
                res = costs[i][0] + dfs(i + 1, aCount - 1, bCount)
            if bCount > 0:
                res = min(res, costs[i][1] + dfs(i + 1, aCount, bCount - 1))

            dp[aCount][bCount] = res
            return res

        return dfs(0, n, n)
```

```java
public class Solution {
    private int[][] dp;

    public int twoCitySchedCost(int[][] costs) {
        int n = costs.length / 2;
        dp = new int[n + 1][n + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }
        return dfs(costs, 0, n, n);
    }

    private int dfs(int[][] costs, int i, int aCount, int bCount) {
        if (i == costs.length) {
            return 0;
        }
        if (dp[aCount][bCount] != -1) {
            return dp[aCount][bCount];
        }

        int res = Integer.MAX_VALUE;
        if (aCount > 0) {
            res = costs[i][0] + dfs(costs, i + 1, aCount - 1, bCount);
        }
        if (bCount > 0) {
            res = Math.min(res, costs[i][1] + dfs(costs, i + 1, aCount, bCount - 1));
        }

        dp[aCount][bCount] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> dp;

    int twoCitySchedCost(vector<vector<int>>& costs) {
        int n = costs.size() / 2;
        dp = vector<vector<int>>(n + 1, vector<int>(n + 1, -1));
        return dfs(costs, 0, n, n);
    }

private:
    int dfs(vector<vector<int>>& costs, int i, int aCount, int bCount) {
        if (i == costs.size()) {
            return 0;
        }
        if (dp[aCount][bCount] != -1) {
            return dp[aCount][bCount];
        }

        int res = INT_MAX;
        if (aCount > 0) {
            res = costs[i][0] + dfs(costs, i + 1, aCount - 1, bCount);
        }
        if (bCount > 0) {
            res = min(res, costs[i][1] + dfs(costs, i + 1, aCount, bCount - 1));
        }

        dp[aCount][bCount] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    twoCitySchedCost(costs) {
        let n = costs.length / 2;
        let dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(-1));

        const dfs = (i, aCount, bCount) => {
            if (i === costs.length) {
                return 0;
            }
            if (dp[aCount][bCount] !== -1) {
                return dp[aCount][bCount];
            }

            let res = Infinity;
            if (aCount > 0) {
                res = costs[i][0] + dfs(i + 1, aCount - 1, bCount);
            }
            if (bCount > 0) {
                res = Math.min(
                    res,
                    costs[i][1] + dfs(i + 1, aCount, bCount - 1),
                );
            }

            dp[aCount][bCount] = res;
            return res;
        };

        return dfs(0, n, n);
    }
}
```

```csharp
public class Solution {
    public int TwoCitySchedCost(int[][] costs) {
        int n = costs.Length / 2;
        int[,] dp = new int[n + 1, n + 1];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= n; j++) {
                dp[i, j] = -1;
            }
        }

        int Dfs(int i, int aCount, int bCount) {
            if (i == costs.Length) return 0;
            if (dp[aCount, bCount] != -1) return dp[aCount, bCount];

            int res = int.MaxValue;
            if (aCount > 0) {
                res = costs[i][0] + Dfs(i + 1, aCount - 1, bCount);
            }
            if (bCount > 0) {
                res = Math.Min(res, costs[i][1] + Dfs(i + 1, aCount, bCount - 1));
            }

            dp[aCount, bCount] = res;
            return res;
        }

        return Dfs(0, n, n);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

> Where $n$ is the half of the size of the array $costs$.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def twoCitySchedCost(self, costs: List[List[int]]) -> int:
        n = len(costs) // 2
        dp = [[0] * (n + 1) for _ in range(n + 1)]

        for aCount in range(n + 1):
            for bCount in range(n + 1):
                i = aCount + bCount
                if i == 0:
                    continue

                dp[aCount][bCount] = float("inf")
                if aCount > 0:
                    dp[aCount][bCount] = min(dp[aCount][bCount], dp[aCount - 1][bCount] + costs[i - 1][0])
                if bCount > 0:
                    dp[aCount][bCount] = min(dp[aCount][bCount], dp[aCount][bCount - 1] + costs[i - 1][1])

        return dp[n][n]
```

```java
public class Solution {
    public int twoCitySchedCost(int[][] costs) {
        int n = costs.length / 2;
        int[][] dp = new int[n + 1][n + 1];

        for (int aCount = 0; aCount <= n; aCount++) {
            for (int bCount = 0; bCount <= n; bCount++) {
                int i = aCount + bCount;
                if (i == 0) continue;

                dp[aCount][bCount] = Integer.MAX_VALUE;
                if (aCount > 0) {
                    dp[aCount][bCount] = Math.min(dp[aCount][bCount], dp[aCount - 1][bCount] + costs[i - 1][0]);
                }
                if (bCount > 0) {
                    dp[aCount][bCount] = Math.min(dp[aCount][bCount], dp[aCount][bCount - 1] + costs[i - 1][1]);
                }
            }
        }

        return dp[n][n];
    }
}
```

```cpp
class Solution {
public:
    int twoCitySchedCost(vector<vector<int>>& costs) {
        int n = costs.size() / 2;
        vector<vector<int>> dp(n + 1, vector<int>(n + 1));

        for (int aCount = 0; aCount <= n; aCount++) {
            for (int bCount = 0; bCount <= n; bCount++) {
                int i = aCount + bCount;
                if (i == 0) continue;

                dp[aCount][bCount] = INT_MAX;
                if (aCount > 0) {
                    dp[aCount][bCount] = min(dp[aCount][bCount], dp[aCount - 1][bCount] + costs[i - 1][0]);
                }
                if (bCount > 0) {
                    dp[aCount][bCount] = min(dp[aCount][bCount], dp[aCount][bCount - 1] + costs[i - 1][1]);
                }
            }
        }

        return dp[n][n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    twoCitySchedCost(costs) {
        let n = costs.length / 2;
        let dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

        for (let aCount = 0; aCount <= n; aCount++) {
            for (let bCount = 0; bCount <= n; bCount++) {
                let i = aCount + bCount;
                if (i === 0) continue;

                dp[aCount][bCount] = Infinity;
                if (aCount > 0) {
                    dp[aCount][bCount] = Math.min(
                        dp[aCount][bCount],
                        dp[aCount - 1][bCount] + costs[i - 1][0],
                    );
                }
                if (bCount > 0) {
                    dp[aCount][bCount] = Math.min(
                        dp[aCount][bCount],
                        dp[aCount][bCount - 1] + costs[i - 1][1],
                    );
                }
            }
        }

        return dp[n][n];
    }
}
```

```csharp
public class Solution {
    public int TwoCitySchedCost(int[][] costs) {
        int n = costs.Length / 2;
        int[,] dp = new int[n + 1, n + 1];

        for (int aCount = 0; aCount <= n; aCount++) {
            for (int bCount = 0; bCount <= n; bCount++) {
                int i = aCount + bCount;
                if (i == 0) continue;

                dp[aCount, bCount] = int.MaxValue;
                if (aCount > 0) {
                    dp[aCount, bCount] = Math.Min(dp[aCount, bCount], dp[aCount - 1, bCount] + costs[i - 1][0]);
                }
                if (bCount > 0) {
                    dp[aCount, bCount] = Math.Min(dp[aCount, bCount], dp[aCount, bCount - 1] + costs[i - 1][1]);
                }
            }
        }

        return dp[n, n];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

> Where $n$ is the half of the size of the array $costs$.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def twoCitySchedCost(self, costs: List[List[int]]) -> int:
        n = len(costs) // 2
        dp = [0] * (n + 1)

        for aCount in range(n + 1):
            for bCount in range(n + 1):
                i = aCount + bCount
                if i == 0:
                    continue

                tmp = dp[bCount]
                dp[bCount] = float("inf")
                if aCount > 0:
                    dp[bCount] = min(dp[bCount], tmp + costs[i - 1][0])
                if bCount > 0:
                    dp[bCount] = min(dp[bCount], dp[bCount - 1] + costs[i - 1][1])

        return dp[n]
```

```java
public class Solution {
    public int twoCitySchedCost(int[][] costs) {
        int n = costs.length / 2;
        int[] dp = new int[n + 1];

        for (int aCount = 0; aCount <= n; aCount++) {
            for (int bCount = 0; bCount <= n; bCount++) {
                int i = aCount + bCount;
                if (i == 0) continue;

                int tmp = dp[bCount];
                dp[bCount] = Integer.MAX_VALUE;
                if (aCount > 0) {
                    dp[bCount] = Math.min(dp[bCount], tmp + costs[i - 1][0]);
                }
                if (bCount > 0) {
                    dp[bCount] = Math.min(dp[bCount], dp[bCount - 1] + costs[i - 1][1]);
                }
            }
        }

        return dp[n];
    }
}
```

```cpp
class Solution {
public:
    int twoCitySchedCost(vector<vector<int>>& costs) {
        int n = costs.size() / 2;
        vector<int> dp(n + 1, 0);

        for (int aCount = 0; aCount <= n; aCount++) {
            for (int bCount = 0; bCount <= n; bCount++) {
                int i = aCount + bCount;
                if (i == 0) continue;

                int tmp = dp[bCount];
                dp[bCount] = INT_MAX;
                if (aCount > 0) {
                    dp[bCount] = min(dp[bCount], tmp + costs[i - 1][0]);
                }
                if (bCount > 0) {
                    dp[bCount] = min(dp[bCount], dp[bCount - 1] + costs[i - 1][1]);
                }
            }
        }

        return dp[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    twoCitySchedCost(costs) {
        let n = costs.length / 2;
        let dp = new Array(n + 1).fill(0);

        for (let aCount = 0; aCount <= n; aCount++) {
            for (let bCount = 0; bCount <= n; bCount++) {
                let i = aCount + bCount;
                if (i === 0) continue;

                let tmp = dp[bCount];
                dp[bCount] = Infinity;
                if (aCount > 0) {
                    dp[bCount] = Math.min(dp[bCount], tmp + costs[i - 1][0]);
                }
                if (bCount > 0) {
                    dp[bCount] = Math.min(
                        dp[bCount],
                        dp[bCount - 1] + costs[i - 1][1],
                    );
                }
            }
        }

        return dp[n];
    }
}
```

```csharp
public class Solution {
    public int TwoCitySchedCost(int[][] costs) {
        int n = costs.Length / 2;
        int[] dp = new int[n + 1];

        for (int aCount = 0; aCount <= n; aCount++) {
            for (int bCount = 0; bCount <= n; bCount++) {
                int i = aCount + bCount;
                if (i == 0) continue;

                int tmp = dp[bCount];
                dp[bCount] = int.MaxValue;
                if (aCount > 0) {
                    dp[bCount] = Math.Min(dp[bCount], tmp + costs[i - 1][0]);
                }
                if (bCount > 0) {
                    dp[bCount] = Math.Min(dp[bCount], dp[bCount - 1] + costs[i - 1][1]);
                }
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

> Where $n$ is the half of the size of the array $costs$.

---

## 5. Greedy

::tabs-start

```python
class Solution:
    def twoCitySchedCost(self, costs: List[List[int]]) -> int:
        diffs = []
        for c1, c2 in costs:
            diffs.append([c2 - c1, c1, c2])

        diffs.sort()
        res = 0
        for i in range(len(diffs)):
            if i < len(diffs) // 2:
                res += diffs[i][2]
            else:
                res += diffs[i][1]

        return res
```

```java
public class Solution {
    public int twoCitySchedCost(int[][] costs) {
        List<int[]> diffs = new ArrayList<>();
        for (int[] cost : costs) {
            diffs.add(new int[]{cost[1] - cost[0], cost[0], cost[1]});
        }

        diffs.sort(Comparator.comparingInt(a -> a[0]));

        int res = 0;
        for (int i = 0; i < diffs.size(); i++) {
            if (i < diffs.size() / 2) {
                res += diffs.get(i)[2];
            } else {
                res += diffs.get(i)[1];
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int twoCitySchedCost(vector<vector<int>>& costs) {
        vector<vector<int>> diffs;
        for (auto& cost : costs) {
            diffs.push_back({cost[1] - cost[0], cost[0], cost[1]});
        }

        sort(diffs.begin(), diffs.end());

        int res = 0;
        for (int i = 0; i < diffs.size(); i++) {
            if (i < diffs.size() / 2) {
                res += diffs[i][2];
            } else {
                res += diffs[i][1];
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    twoCitySchedCost(costs) {
        let diffs = [];
        for (let cost of costs) {
            diffs.push([cost[1] - cost[0], cost[0], cost[1]]);
        }

        diffs.sort((a, b) => a[0] - b[0]);

        let res = 0;
        for (let i = 0; i < diffs.length; i++) {
            if (i < diffs.length / 2) {
                res += diffs[i][2];
            } else {
                res += diffs[i][1];
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int TwoCitySchedCost(int[][] costs) {
        List<int[]> diffs = new List<int[]>();
        foreach (var cost in costs) {
            diffs.Add(new int[] { cost[1] - cost[0], cost[0], cost[1] });
        }

        diffs.Sort((a, b) => a[0].CompareTo(b[0]));
        int res = 0;
        for (int i = 0; i < diffs.Count; i++) {
            if (i < diffs.Count / 2) {
                res += diffs[i][2];
            } else {
                res += diffs[i][1];
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 6. Greedy (Optimal)

::tabs-start

```python
class Solution:
    def twoCitySchedCost(self, costs: List[List[int]]) -> int:
        costs.sort(key=lambda x: x[1] - x[0])
        n, res = len(costs) // 2, 0

        for i in range(n):
            res += costs[i][1] + costs[i + n][0]
        return res
```

```java
public class Solution {
    public int twoCitySchedCost(int[][] costs) {
        Arrays.sort(costs, (a, b) -> Integer.compare(a[1] - a[0], b[1] - b[0]));
        int n = costs.length / 2, res = 0;

        for (int i = 0; i < n; i++) {
            res += costs[i][1] + costs[i + n][0];
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int twoCitySchedCost(vector<vector<int>>& costs) {
        sort(costs.begin(), costs.end(), [](const auto& a, const auto& b) {
            return (a[1] - a[0]) < (b[1] - b[0]);
        });

        int n = costs.size() / 2, res = 0;
        for (int i = 0; i < n; i++) {
            res += costs[i][1] + costs[i + n][0];
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    twoCitySchedCost(costs) {
        costs.sort((a, b) => a[1] - a[0] - (b[1] - b[0]));
        let n = costs.length / 2,
            res = 0;

        for (let i = 0; i < n; i++) {
            res += costs[i][1] + costs[i + n][0];
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int TwoCitySchedCost(int[][] costs) {
        Array.Sort(costs, (a, b) => (a[1] - a[0]).CompareTo(b[1] - b[0]));
        int n = costs.Length / 2;
        int res = 0;

        for (int i = 0; i < n; i++) {
            res += costs[i][1] + costs[i + n][0];
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.
