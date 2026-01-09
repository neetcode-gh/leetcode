## 1. Recursion

### Intuition

We need to paint each house with one of three colors such that no two adjacent houses have the same color. The most natural way to approach this is to consider each house in order and try all valid color choices.

For each house, we pick a color different from the previous house, add its cost, and recurse to the next house. By exploring all possible valid combinations, we can find the minimum total cost. This brute force approach considers every valid painting configuration.

### Algorithm

1. Define a recursive function `dfs(i, prevColor)` where `i` is the current house index and `prevColor` is the color used on the previous house.
2. Base case: If `i` equals the number of houses, return `0` (no more houses to paint).
3. For each of the three colors (`0`, `1`, `2`), if the color is different from `prevColor`, recursively compute the cost of painting the remaining houses.
4. Return the minimum cost among all valid color choices.
5. Start the recursion from house `0` with `prevColor = -1` (indicating no previous color constraint).

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

```go
func minCost(costs [][]int) int {
    n := len(costs)

    var dfs func(i, prevColor int) int
    dfs = func(i, prevColor int) int {
        if i == n {
            return 0
        }

        res := math.MaxInt32
        for c := 0; c < 3; c++ {
            if c == prevColor {
                continue
            }
            res = min(res, costs[i][c] + dfs(i+1, c))
        }
        return res
    }

    return dfs(0, -1)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun minCost(costs: Array<IntArray>): Int {
        val n = costs.size

        fun dfs(i: Int, prevColor: Int): Int {
            if (i == n) return 0

            var res = Int.MAX_VALUE
            for (c in 0 until 3) {
                if (c == prevColor) continue
                res = minOf(res, costs[i][c] + dfs(i + 1, c))
            }
            return res
        }

        return dfs(0, -1)
    }
}
```

```swift
class Solution {
    func minCost(_ costs: [[Int]]) -> Int {
        let n = costs.count

        func dfs(_ i: Int, _ prevColor: Int) -> Int {
            if i == n {
                return 0
            }

            var res = Int.max
            for c in 0..<3 {
                if c == prevColor {
                    continue
                }
                res = min(res, costs[i][c] + dfs(i + 1, c))
            }
            return res
        }

        return dfs(0, -1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution recomputes the same subproblems many times. For example, computing the minimum cost to paint houses 2 through n starting with color 0 might be calculated multiple times from different paths.

We can use memoization to store results for each unique state `(house index, previous color)`. When we encounter the same state again, we simply return the cached result instead of recomputing it.

### Algorithm

1. Create a 2D memoization table `dp` where `dp[i][c]` stores the minimum cost to paint houses from index `i` to the end, given that the previous house was painted with color `c`.
2. In the recursive function, first check if the result is already cached. If so, return it.
3. Otherwise, compute the result by trying all valid colors and store it in the cache before returning.
4. The state needs to account for the previous color, so we offset by `1` to handle the initial case where `prevColor = -1`.

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

```go
func minCost(costs [][]int) int {
    n := len(costs)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, 4)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, prevColor int) int
    dfs = func(i, prevColor int) int {
        if i == n {
            return 0
        }
        if dp[i][prevColor+1] != -1 {
            return dp[i][prevColor+1]
        }

        res := math.MaxInt32
        for c := 0; c < 3; c++ {
            if c == prevColor {
                continue
            }
            res = min(res, costs[i][c]+dfs(i+1, c))
        }

        dp[i][prevColor+1] = res
        return res
    }

    return dfs(0, -1)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun minCost(costs: Array<IntArray>): Int {
        val n = costs.size
        val dp = Array(n) { IntArray(4) { -1 } }

        fun dfs(i: Int, prevColor: Int): Int {
            if (i == n) return 0
            if (dp[i][prevColor + 1] != -1) return dp[i][prevColor + 1]

            var res = Int.MAX_VALUE
            for (c in 0 until 3) {
                if (c == prevColor) continue
                res = minOf(res, costs[i][c] + dfs(i + 1, c))
            }

            dp[i][prevColor + 1] = res
            return res
        }

        return dfs(0, -1)
    }
}
```

```swift
class Solution {
    func minCost(_ costs: [[Int]]) -> Int {
        let n = costs.count
        var dp = [[Int]](repeating: [Int](repeating: -1, count: 4), count: n)

        func dfs(_ i: Int, _ prevColor: Int) -> Int {
            if i == n {
                return 0
            }
            if dp[i][prevColor + 1] != -1 {
                return dp[i][prevColor + 1]
            }

            var res = Int.max
            for c in 0..<3 {
                if c == prevColor {
                    continue
                }
                res = min(res, costs[i][c] + dfs(i + 1, c))
            }

            dp[i][prevColor + 1] = res
            return res
        }

        return dfs(0, -1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of working top-down with recursion, we can build up the solution iteratively. For each house, we compute the minimum cost to paint it with each color, considering that we must have painted the previous house with a different color.

The key insight is that the minimum cost to paint house `i` with color `c` equals `costs[i][c]` plus the minimum of the costs from the previous house painted with the other two colors.

### Algorithm

1. Create a 2D DP table where `dp[i][c]` represents the minimum cost to paint houses `0` through `i` with house `i` painted color `c`.
2. Initialize the first row with the costs of the first house for each color.
3. For each subsequent house `i`, compute `dp[i][c] = costs[i][c] + min(dp[i-1][(c+1)%3], dp[i-1][(c+2)%3])`. This adds the current cost plus the minimum from the two other colors in the previous row.
4. Return the minimum value in the last row.

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

```go
func minCost(costs [][]int) int {
    n := len(costs)
    if n == 0 {
        return 0
    }

    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, 3)
    }

    for c := 0; c < 3; c++ {
        dp[0][c] = costs[0][c]
    }

    for i := 1; i < n; i++ {
        for c := 0; c < 3; c++ {
            dp[i][c] = costs[i][c] + min(dp[i-1][(c+1)%3], dp[i-1][(c+2)%3])
        }
    }

    return min(dp[n-1][0], min(dp[n-1][1], dp[n-1][2]))
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun minCost(costs: Array<IntArray>): Int {
        val n = costs.size
        if (n == 0) return 0

        val dp = Array(n) { IntArray(3) }
        for (c in 0 until 3) {
            dp[0][c] = costs[0][c]
        }

        for (i in 1 until n) {
            for (c in 0 until 3) {
                dp[i][c] = costs[i][c] + minOf(dp[i - 1][(c + 1) % 3], dp[i - 1][(c + 2) % 3])
            }
        }

        return minOf(dp[n - 1][0], dp[n - 1][1], dp[n - 1][2])
    }
}
```

```swift
class Solution {
    func minCost(_ costs: [[Int]]) -> Int {
        let n = costs.count
        if n == 0 {
            return 0
        }

        var dp = [[Int]](repeating: [Int](repeating: 0, count: 3), count: n)
        for c in 0..<3 {
            dp[0][c] = costs[0][c]
        }

        for i in 1..<n {
            for c in 0..<3 {
                dp[i][c] = costs[i][c] + min(dp[i - 1][(c + 1) % 3], dp[i - 1][(c + 2) % 3])
            }
        }

        return min(dp[n - 1][0], min(dp[n - 1][1], dp[n - 1][2]))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

Looking at the bottom-up solution, we notice that computing the DP values for house `i` only requires the values from house `i-1`. We do not need to keep track of all previous houses.

This means we can reduce space from O(n) to O(1) by only storing the costs for the previous house. We maintain three variables representing the minimum costs ending with each color and update them as we process each house.

### Algorithm

1. Initialize three variables `dp0`, `dp1`, `dp2` to `0`, representing the minimum cost to reach the current position ending with each color.
2. For each house, compute new values for all three colors simultaneously. For each color, add the current cost to the minimum of the other two previous costs.
3. Update all three variables at once to avoid using stale values.
4. Return the minimum of the three final values.

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

```go
func minCost(costs [][]int) int {
    dp0, dp1, dp2 := 0, 0, 0

    for _, cost := range costs {
        newDp0 := cost[0] + min(dp1, dp2)
        newDp1 := cost[1] + min(dp0, dp2)
        newDp2 := cost[2] + min(dp0, dp1)
        dp0, dp1, dp2 = newDp0, newDp1, newDp2
    }

    return min(dp0, min(dp1, dp2))
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun minCost(costs: Array<IntArray>): Int {
        var dp0 = 0
        var dp1 = 0
        var dp2 = 0

        for (cost in costs) {
            val newDp0 = cost[0] + minOf(dp1, dp2)
            val newDp1 = cost[1] + minOf(dp0, dp2)
            val newDp2 = cost[2] + minOf(dp0, dp1)
            dp0 = newDp0
            dp1 = newDp1
            dp2 = newDp2
        }

        return minOf(dp0, dp1, dp2)
    }
}
```

```swift
class Solution {
    func minCost(_ costs: [[Int]]) -> Int {
        var dp0 = 0
        var dp1 = 0
        var dp2 = 0

        for cost in costs {
            let newDp0 = cost[0] + min(dp1, dp2)
            let newDp1 = cost[1] + min(dp0, dp2)
            let newDp2 = cost[2] + min(dp0, dp1)
            dp0 = newDp0
            dp1 = newDp1
            dp2 = newDp2
        }

        return min(dp0, min(dp1, dp2))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
