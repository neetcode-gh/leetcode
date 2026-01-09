## 1. Recursion

### Intuition

We need to send exactly `n` people to city A and `n` people to city B, minimizing total cost. For each person, we have two choices: send them to A or B. We can explore all possible assignments using recursion, tracking how many slots remain for each city.

### Algorithm

1. For each person at index `i`, try sending them to city A (if slots remain) and to city B (if slots remain).
2. Recursively compute the minimum cost for the remaining people.
3. Return the minimum of both choices.
4. Base case: when all people are assigned (`i == len(costs)`), return 0.

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

```go
func twoCitySchedCost(costs [][]int) int {
    n := len(costs) / 2

    var dfs func(i, aCount, bCount int) int
    dfs = func(i, aCount, bCount int) int {
        if i == len(costs) {
            return 0
        }

        res := 1 << 30
        if aCount > 0 {
            res = costs[i][0] + dfs(i+1, aCount-1, bCount)
        }

        if bCount > 0 {
            if val := costs[i][1] + dfs(i+1, aCount, bCount-1); val < res {
                res = val
            }
        }
        return res
    }

    return dfs(0, n, n)
}
```

```kotlin
class Solution {
    fun twoCitySchedCost(costs: Array<IntArray>): Int {
        val n = costs.size / 2

        fun dfs(i: Int, aCount: Int, bCount: Int): Int {
            if (i == costs.size) return 0

            var res = Int.MAX_VALUE
            if (aCount > 0) {
                res = costs[i][0] + dfs(i + 1, aCount - 1, bCount)
            }

            if (bCount > 0) {
                res = minOf(res, costs[i][1] + dfs(i + 1, aCount, bCount - 1))
            }
            return res
        }

        return dfs(0, n, n)
    }
}
```

```swift
class Solution {
    func twoCitySchedCost(_ costs: [[Int]]) -> Int {
        let n = costs.count / 2

        func dfs(_ i: Int, _ aCount: Int, _ bCount: Int) -> Int {
            if i == costs.count { return 0 }

            var res = Int.max
            if aCount > 0 {
                res = costs[i][0] + dfs(i + 1, aCount - 1, bCount)
            }

            if bCount > 0 {
                res = min(res, costs[i][1] + dfs(i + 1, aCount, bCount - 1))
            }
            return res
        }

        return dfs(0, n, n)
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

### Intuition

The recursive solution has overlapping subproblems because the same state (remaining slots for A and B) can be reached through different paths. We can use memoization to cache results and avoid redundant computation.

### Algorithm

1. Create a 2D memoization table `dp[aCount][bCount]` to store the minimum cost when `aCount` slots remain for city A and `bCount` slots remain for city B.
2. Use the same recursive logic as before, but check the cache before computing.
3. Store results in the cache before returning.
4. The person index `i` can be derived from `aCount + bCount` since the total remaining equals `2n - i`.

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

```go
func twoCitySchedCost(costs [][]int) int {
    n := len(costs) / 2
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, aCount, bCount int) int
    dfs = func(i, aCount, bCount int) int {
        if i == len(costs) {
            return 0
        }
        if dp[aCount][bCount] != -1 {
            return dp[aCount][bCount]
        }

        res := 1 << 30
        if aCount > 0 {
            res = costs[i][0] + dfs(i+1, aCount-1, bCount)
        }
        if bCount > 0 {
            if val := costs[i][1] + dfs(i+1, aCount, bCount-1); val < res {
                res = val
            }
        }

        dp[aCount][bCount] = res
        return res
    }

    return dfs(0, n, n)
}
```

```kotlin
class Solution {
    fun twoCitySchedCost(costs: Array<IntArray>): Int {
        val n = costs.size / 2
        val dp = Array(n + 1) { IntArray(n + 1) { -1 } }

        fun dfs(i: Int, aCount: Int, bCount: Int): Int {
            if (i == costs.size) return 0
            if (dp[aCount][bCount] != -1) return dp[aCount][bCount]

            var res = Int.MAX_VALUE
            if (aCount > 0) {
                res = costs[i][0] + dfs(i + 1, aCount - 1, bCount)
            }
            if (bCount > 0) {
                res = minOf(res, costs[i][1] + dfs(i + 1, aCount, bCount - 1))
            }

            dp[aCount][bCount] = res
            return res
        }

        return dfs(0, n, n)
    }
}
```

```swift
class Solution {
    func twoCitySchedCost(_ costs: [[Int]]) -> Int {
        let n = costs.count / 2
        var dp = [[Int]](repeating: [Int](repeating: -1, count: n + 1), count: n + 1)

        func dfs(_ i: Int, _ aCount: Int, _ bCount: Int) -> Int {
            if i == costs.count { return 0 }
            if dp[aCount][bCount] != -1 { return dp[aCount][bCount] }

            var res = Int.max
            if aCount > 0 {
                res = costs[i][0] + dfs(i + 1, aCount - 1, bCount)
            }
            if bCount > 0 {
                res = min(res, costs[i][1] + dfs(i + 1, aCount, bCount - 1))
            }

            dp[aCount][bCount] = res
            return res
        }

        return dfs(0, n, n)
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

### Intuition

Instead of recursion with memoization, we can build the solution iteratively. We fill a table where `dp[aCount][bCount]` represents the minimum cost to assign the first `aCount + bCount` people such that `aCount` go to city A and `bCount` go to city B.

### Algorithm

1. Initialize `dp[0][0] = 0` (no people assigned, zero cost).
2. For each state `(aCount, bCount)`:
   - Compute the person index as `i = aCount + bCount`.
   - If `aCount > 0`, consider the option of sending person `i-1` to city A.
   - If `bCount > 0`, consider the option of sending person `i-1` to city B.
   - Take the minimum of valid options.
3. Return `dp[n][n]`.

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

```go
func twoCitySchedCost(costs [][]int) int {
    n := len(costs) / 2
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }

    for aCount := 0; aCount <= n; aCount++ {
        for bCount := 0; bCount <= n; bCount++ {
            i := aCount + bCount
            if i == 0 {
                continue
            }

            dp[aCount][bCount] = 1 << 30
            if aCount > 0 {
                if val := dp[aCount-1][bCount] + costs[i-1][0]; val < dp[aCount][bCount] {
                    dp[aCount][bCount] = val
                }
            }
            if bCount > 0 {
                if val := dp[aCount][bCount-1] + costs[i-1][1]; val < dp[aCount][bCount] {
                    dp[aCount][bCount] = val
                }
            }
        }
    }

    return dp[n][n]
}
```

```kotlin
class Solution {
    fun twoCitySchedCost(costs: Array<IntArray>): Int {
        val n = costs.size / 2
        val dp = Array(n + 1) { IntArray(n + 1) }

        for (aCount in 0..n) {
            for (bCount in 0..n) {
                val i = aCount + bCount
                if (i == 0) continue

                dp[aCount][bCount] = Int.MAX_VALUE
                if (aCount > 0) {
                    dp[aCount][bCount] = minOf(dp[aCount][bCount], dp[aCount - 1][bCount] + costs[i - 1][0])
                }
                if (bCount > 0) {
                    dp[aCount][bCount] = minOf(dp[aCount][bCount], dp[aCount][bCount - 1] + costs[i - 1][1])
                }
            }
        }

        return dp[n][n]
    }
}
```

```swift
class Solution {
    func twoCitySchedCost(_ costs: [[Int]]) -> Int {
        let n = costs.count / 2
        var dp = [[Int]](repeating: [Int](repeating: 0, count: n + 1), count: n + 1)

        for aCount in 0...n {
            for bCount in 0...n {
                let i = aCount + bCount
                if i == 0 { continue }

                dp[aCount][bCount] = Int.max
                if aCount > 0 {
                    dp[aCount][bCount] = min(dp[aCount][bCount], dp[aCount - 1][bCount] + costs[i - 1][0])
                }
                if bCount > 0 {
                    dp[aCount][bCount] = min(dp[aCount][bCount], dp[aCount][bCount - 1] + costs[i - 1][1])
                }
            }
        }

        return dp[n][n]
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

### Intuition

Looking at the bottom-up recurrence, each cell `dp[aCount][bCount]` only depends on `dp[aCount-1][bCount]` and `dp[aCount][bCount-1]`. We can reduce space by using a 1D array and carefully updating it in the right order.

### Algorithm

1. Use a 1D array `dp` of size `n+1`.
2. Iterate through all `(aCount, bCount)` pairs in the same order as before.
3. Use a temporary variable to store the previous value of `dp[bCount]` before overwriting.
4. Update `dp[bCount]` using the temporary variable (for the city A option) and `dp[bCount-1]` (for the city B option).
5. Return `dp[n]`.

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

```go
func twoCitySchedCost(costs [][]int) int {
    n := len(costs) / 2
    dp := make([]int, n+1)

    for aCount := 0; aCount <= n; aCount++ {
        for bCount := 0; bCount <= n; bCount++ {
            i := aCount + bCount
            if i == 0 {
                continue
            }

            tmp := dp[bCount]
            dp[bCount] = 1 << 30
            if aCount > 0 {
                if val := tmp + costs[i-1][0]; val < dp[bCount] {
                    dp[bCount] = val
                }
            }
            if bCount > 0 {
                if val := dp[bCount-1] + costs[i-1][1]; val < dp[bCount] {
                    dp[bCount] = val
                }
            }
        }
    }

    return dp[n]
}
```

```kotlin
class Solution {
    fun twoCitySchedCost(costs: Array<IntArray>): Int {
        val n = costs.size / 2
        val dp = IntArray(n + 1)

        for (aCount in 0..n) {
            for (bCount in 0..n) {
                val i = aCount + bCount
                if (i == 0) continue

                val tmp = dp[bCount]
                dp[bCount] = Int.MAX_VALUE
                if (aCount > 0) {
                    dp[bCount] = minOf(dp[bCount], tmp + costs[i - 1][0])
                }
                if (bCount > 0) {
                    dp[bCount] = minOf(dp[bCount], dp[bCount - 1] + costs[i - 1][1])
                }
            }
        }

        return dp[n]
    }
}
```

```swift
class Solution {
    func twoCitySchedCost(_ costs: [[Int]]) -> Int {
        let n = costs.count / 2
        var dp = [Int](repeating: 0, count: n + 1)

        for aCount in 0...n {
            for bCount in 0...n {
                let i = aCount + bCount
                if i == 0 { continue }

                let tmp = dp[bCount]
                dp[bCount] = Int.max
                if aCount > 0 {
                    dp[bCount] = min(dp[bCount], tmp + costs[i - 1][0])
                }
                if bCount > 0 {
                    dp[bCount] = min(dp[bCount], dp[bCount - 1] + costs[i - 1][1])
                }
            }
        }

        return dp[n]
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

### Intuition

For each person, the "cost difference" `cost[B] - cost[A]` tells us how much extra we pay to send them to city B instead of A. A negative difference means B is cheaper. If we sort by this difference, the first half of people have the smallest (most negative) differences, meaning they benefit most from going to city B.

### Algorithm

1. For each person, compute the tuple `(cost[B] - cost[A], cost[A], cost[B])`.
2. Sort all tuples by the difference (ascending).
3. Send the first `n` people (smallest differences) to city B.
4. Send the remaining `n` people to city A.
5. Sum up all the costs.

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

```go
func twoCitySchedCost(costs [][]int) int {
    diffs := make([][3]int, len(costs))
    for i, cost := range costs {
        diffs[i] = [3]int{cost[1] - cost[0], cost[0], cost[1]}
    }

    sort.Slice(diffs, func(i, j int) bool {
        return diffs[i][0] < diffs[j][0]
    })

    res := 0
    for i := 0; i < len(diffs); i++ {
        if i < len(diffs)/2 {
            res += diffs[i][2]
        } else {
            res += diffs[i][1]
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun twoCitySchedCost(costs: Array<IntArray>): Int {
        val diffs = costs.map { intArrayOf(it[1] - it[0], it[0], it[1]) }
            .sortedBy { it[0] }

        var res = 0
        for (i in diffs.indices) {
            if (i < diffs.size / 2) {
                res += diffs[i][2]
            } else {
                res += diffs[i][1]
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func twoCitySchedCost(_ costs: [[Int]]) -> Int {
        var diffs = costs.map { [($0[1] - $0[0]), $0[0], $0[1]] }
        diffs.sort { $0[0] < $1[0] }

        var res = 0
        for i in 0..<diffs.count {
            if i < diffs.count / 2 {
                res += diffs[i][2]
            } else {
                res += diffs[i][1]
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 6. Greedy (Optimal)

### Intuition

We can simplify the greedy approach by sorting the original array directly by `cost[B] - cost[A]` without creating extra tuples. After sorting, the first `n` entries favor city B, and the last `n` favor city A.

### Algorithm

1. Sort the costs array by `cost[1] - cost[0]` (ascending).
2. For the first `n` people, add their city B cost.
3. For the last `n` people, add their city A cost.
4. Return the total.

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

```go
func twoCitySchedCost(costs [][]int) int {
    sort.Slice(costs, func(i, j int) bool {
        return (costs[i][1] - costs[i][0]) < (costs[j][1] - costs[j][0])
    })

    n := len(costs) / 2
    res := 0

    for i := 0; i < n; i++ {
        res += costs[i][1] + costs[i+n][0]
    }

    return res
}
```

```kotlin
class Solution {
    fun twoCitySchedCost(costs: Array<IntArray>): Int {
        costs.sortBy { it[1] - it[0] }
        val n = costs.size / 2
        var res = 0

        for (i in 0 until n) {
            res += costs[i][1] + costs[i + n][0]
        }

        return res
    }
}
```

```swift
class Solution {
    func twoCitySchedCost(_ costs: [[Int]]) -> Int {
        let sortedCosts = costs.sorted { ($0[1] - $0[0]) < ($1[1] - $1[0]) }
        let n = sortedCosts.count / 2
        var res = 0

        for i in 0..<n {
            res += sortedCosts[i][1] + sortedCosts[i + n][0]
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.
