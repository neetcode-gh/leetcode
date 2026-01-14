## 1. Recursion

### Intuition

We need to pick exactly `k` coins from the tops of various piles to maximize total value. For each pile, we can take zero or more coins from the top, but once we move to the next pile, we cannot return. This naturally suggests a recursive approach: at each pile, try all possible numbers of coins to take (from zero up to the pile size or remaining coins), then recurse on the next pile with fewer coins left to pick. The answer is the maximum across all choices.

### Algorithm

1. Define a recursive function `dfs(i, coins)` that returns the maximum value starting from pile `i` with `coins` remaining.
2. Base case: if `i` == `n`, return `0` (no more piles).
3. First, consider skipping the current pile entirely: `res` = `dfs(i + 1, coins)`.
4. Then, for each `j` from `0` to `min(coins, len(piles[i]))` - `1`:
   - Accumulate the sum of the top `j` + `1` coins from pile `i`.
   - Update `res` with `curPile` + `dfs(i + 1, coins - (j + 1))`.
5. Return `res`.
6. Call `dfs(0, k)` as the final answer.

::tabs-start

```python
class Solution:
    def maxValueOfCoins(self, piles: List[List[int]], k: int) -> int:
        n = len(piles)

        def dfs(i, coins):
            if i == n:
                return 0

            res = dfs(i + 1, coins)  # skip current pile
            curPile = 0
            for j in range(min(coins, len(piles[i]))):
                curPile += piles[i][j]
                res = max(res, curPile + dfs(i + 1, coins - (j + 1)))
            return res

        return dfs(0, k)
```

```java
public class Solution {
    public int maxValueOfCoins(List<List<Integer>> piles, int k) {
        int n = piles.size();
        return dfs(0, k, piles);
    }

    private int dfs(int i, int coins, List<List<Integer>> piles) {
        if (i == piles.size()) {
            return 0;
        }

        int res = dfs(i + 1, coins, piles);  // skip current pile
        int curPile = 0;
        for (int j = 0; j < Math.min(coins, piles.get(i).size()); j++) {
            curPile += piles.get(i).get(j);
            res = Math.max(res, curPile + dfs(i + 1, coins - (j + 1), piles));
        }
        return res;
    }
}
```

```cpp
class Solution {
private:
    int dfs(int i, int coins, const vector<vector<int>>& piles) {
        if (i == piles.size()) {
            return 0;
        }

        int res = dfs(i + 1, coins, piles);  // skip current pile
        int curPile = 0;
        for (int j = 0; j < min(coins, (int)piles[i].size()); j++) {
            curPile += piles[i][j];
            res = max(res, curPile + dfs(i + 1, coins - (j + 1), piles));
        }
        return res;
    }

public:
    int maxValueOfCoins(vector<vector<int>>& piles, int k) {
        int n = piles.size();
        return dfs(0, k, piles);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} piles
     * @param {number} k
     * @return {number}
     */
    maxValueOfCoins = (piles, k) => {
        const n = piles.length;

        const dfs = (i, coins) => {
            if (i === n) return 0;

            let res = dfs(i + 1, coins); // skip current pile
            let curPile = 0;
            for (let j = 0; j < Math.min(coins, piles[i].length); j++) {
                curPile += piles[i][j];
                res = Math.max(res, curPile + dfs(i + 1, coins - (j + 1)));
            }
            return res;
        };

        return dfs(0, k);
    };
}
```

```go
func maxValueOfCoins(piles [][]int, k int) int {
    n := len(piles)

    var dfs func(i, coins int) int
    dfs = func(i, coins int) int {
        if i == n {
            return 0
        }

        res := dfs(i+1, coins)
        curPile := 0
        for j := 0; j < min(coins, len(piles[i])); j++ {
            curPile += piles[i][j]
            res = max(res, curPile+dfs(i+1, coins-(j+1)))
        }
        return res
    }

    return dfs(0, k)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxValueOfCoins(piles: List<List<Int>>, k: Int): Int {
        val n = piles.size

        fun dfs(i: Int, coins: Int): Int {
            if (i == n) return 0

            var res = dfs(i + 1, coins)
            var curPile = 0
            for (j in 0 until minOf(coins, piles[i].size)) {
                curPile += piles[i][j]
                res = maxOf(res, curPile + dfs(i + 1, coins - (j + 1)))
            }
            return res
        }

        return dfs(0, k)
    }
}
```

```swift
class Solution {
    func maxValueOfCoins(_ piles: [[Int]], _ k: Int) -> Int {
        let n = piles.count

        func dfs(_ i: Int, _ coins: Int) -> Int {
            if i == n { return 0 }

            var res = dfs(i + 1, coins)
            var curPile = 0
            for j in 0..<min(coins, piles[i].count) {
                curPile += piles[i][j]
                res = max(res, curPile + dfs(i + 1, coins - (j + 1)))
            }
            return res
        }

        return dfs(0, k)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k ^ n)$
- Space complexity: $O(n)$ for the recursion stack.

> Where $n$ is the number of piles and $k$ is the number of coins to choose.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The plain recursive solution recomputes the same subproblems many times. We can add memoization by storing results for each state `(pile index, remaining coins)`. Once a state is computed, we return the cached result instead of recomputing. This reduces exponential time complexity to polynomial.

### Algorithm

1. Create a 2D array `dp` of size `n` x `(k + 1)`, initialized to `-1`.
2. Define `dfs(i, coins)` as before, but before computing, check if `dp[i][coins]` is already computed. If so, return it.
3. Compute the result as in the recursive approach.
4. Store the result in `dp[i][coins]` before returning.
5. Call `dfs(0, k)` as the final answer.

::tabs-start

```python
class Solution:
    def maxValueOfCoins(self, piles: List[List[int]], k: int) -> int:
        n = len(piles)
        dp = [[-1] * (k + 1) for _ in range(n)]

        def dfs(i, coins):
            if i == n:
                return 0
            if dp[i][coins] != -1:
                return dp[i][coins]

            dp[i][coins] = dfs(i + 1, coins)  # skip current pile
            curPile = 0
            for j in range(min(coins, len(piles[i]))):
                curPile += piles[i][j]
                dp[i][coins] = max(dp[i][coins], curPile + dfs(i + 1, coins - (j + 1)))
            return dp[i][coins]

        return dfs(0, k)
```

```java
public class Solution {
    private int[][] dp;

    public int maxValueOfCoins(List<List<Integer>> piles, int k) {
        int n = piles.size();
        dp = new int[n][k + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }
        return dfs(0, k, piles);
    }

    private int dfs(int i, int coins, List<List<Integer>> piles) {
        if (i == piles.size()) {
            return 0;
        }
        if (dp[i][coins] != -1) {
            return dp[i][coins];
        }

        dp[i][coins] = dfs(i + 1, coins, piles);  // skip current pile
        int curPile = 0;
        for (int j = 0; j < Math.min(coins, piles.get(i).size()); j++) {
            curPile += piles.get(i).get(j);
            dp[i][coins] = Math.max(dp[i][coins], curPile + dfs(i + 1, coins - (j + 1), piles));
        }
        return dp[i][coins];
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

    int dfs(int i, int coins, const vector<vector<int>>& piles) {
        if (i == piles.size()) {
            return 0;
        }
        if (dp[i][coins] != -1) {
            return dp[i][coins];
        }

        dp[i][coins] = dfs(i + 1, coins, piles);  // skip current pile
        int curPile = 0;
        for (int j = 0; j < min(coins, (int)piles[i].size()); j++) {
            curPile += piles[i][j];
            dp[i][coins] = max(dp[i][coins], curPile + dfs(i + 1, coins - (j + 1), piles));
        }
        return dp[i][coins];
    }

public:
    int maxValueOfCoins(vector<vector<int>>& piles, int k) {
        int n = piles.size();
        dp = vector<vector<int>>(n, vector<int>(k + 1, -1));
        return dfs(0, k, piles);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} piles
     * @param {number} k
     * @return {number}
     */
    maxValueOfCoins = (piles, k) => {
        const n = piles.length;
        const dp = Array.from({ length: n }, () => Array(k + 1).fill(-1));

        const dfs = (i, coins) => {
            if (i === n) return 0;
            if (dp[i][coins] !== -1) return dp[i][coins];

            dp[i][coins] = dfs(i + 1, coins); // skip current pile
            let curPile = 0;
            for (let j = 0; j < Math.min(coins, piles[i].length); j++) {
                curPile += piles[i][j];
                dp[i][coins] = Math.max(
                    dp[i][coins],
                    curPile + dfs(i + 1, coins - (j + 1)),
                );
            }
            return dp[i][coins];
        };

        return dfs(0, k);
    };
}
```

```go
func maxValueOfCoins(piles [][]int, k int) int {
    n := len(piles)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, k+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, coins int) int
    dfs = func(i, coins int) int {
        if i == n {
            return 0
        }
        if dp[i][coins] != -1 {
            return dp[i][coins]
        }

        dp[i][coins] = dfs(i+1, coins)
        curPile := 0
        for j := 0; j < min(coins, len(piles[i])); j++ {
            curPile += piles[i][j]
            dp[i][coins] = max(dp[i][coins], curPile+dfs(i+1, coins-(j+1)))
        }
        return dp[i][coins]
    }

    return dfs(0, k)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private lateinit var dp: Array<IntArray>
    private lateinit var piles: List<List<Int>>
    private var n = 0

    fun maxValueOfCoins(piles: List<List<Int>>, k: Int): Int {
        this.piles = piles
        n = piles.size
        dp = Array(n) { IntArray(k + 1) { -1 } }
        return dfs(0, k)
    }

    private fun dfs(i: Int, coins: Int): Int {
        if (i == n) return 0
        if (dp[i][coins] != -1) return dp[i][coins]

        dp[i][coins] = dfs(i + 1, coins)
        var curPile = 0
        for (j in 0 until minOf(coins, piles[i].size)) {
            curPile += piles[i][j]
            dp[i][coins] = maxOf(dp[i][coins], curPile + dfs(i + 1, coins - (j + 1)))
        }
        return dp[i][coins]
    }
}
```

```swift
class Solution {
    private var dp = [[Int]]()
    private var piles = [[Int]]()
    private var n = 0

    func maxValueOfCoins(_ piles: [[Int]], _ k: Int) -> Int {
        self.piles = piles
        n = piles.count
        dp = [[Int]](repeating: [Int](repeating: -1, count: k + 1), count: n)
        return dfs(0, k)
    }

    private func dfs(_ i: Int, _ coins: Int) -> Int {
        if i == n { return 0 }
        if dp[i][coins] != -1 { return dp[i][coins] }

        dp[i][coins] = dfs(i + 1, coins)
        var curPile = 0
        for j in 0..<min(coins, piles[i].count) {
            curPile += piles[i][j]
            dp[i][coins] = max(dp[i][coins], curPile + dfs(i + 1, coins - (j + 1)))
        }
        return dp[i][coins]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the number of piles, $k$ is the number of coins to choose, and $m$ is the total number of coins among all the piles.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of recursion with memoization, we can fill the DP table iteratively. We process piles from the last to the first. For each pile and each possible number of remaining coins, we compute the best value by considering all options: skip the pile or take some coins from it. The final answer is stored at `dp[0][k]`.

### Algorithm

1. Create a 2D array `dp` of size `(n + 1)` x `(k + 1)`, initialized to `0`.
2. Iterate `i` from `n` - `1` down to `0`:
   - For each `coins` from `0` to `k`:
     - Start with `dp[i][coins]` = `dp[i + 1][coins]` (skip pile `i`).
     - For each `j` from `0` to `min(coins, len(piles[i]))` - `1`:
       - Accumulate the top `j` + `1` coins' value.
       - Update `dp[i][coins]` with `curPile` + `dp[i + 1][coins - (j + 1)]` if larger.
3. Return `dp[0][k]`.

::tabs-start

```python
class Solution:
    def maxValueOfCoins(self, piles: List[List[int]], k: int) -> int:
        n = len(piles)
        dp = [[0] * (k + 1) for _ in range(n + 1)]

        for i in range(n - 1, -1, -1):
            for coins in range(k + 1):
                dp[i][coins] = dp[i + 1][coins]

                curPile = 0
                for j in range(min(coins, len(piles[i]))):
                    curPile += piles[i][j]
                    dp[i][coins] = max(
                        dp[i][coins],
                        curPile + dp[i + 1][coins - (j + 1)]
                    )

        return dp[0][k]
```

```java
public class Solution {
    public int maxValueOfCoins(List<List<Integer>> piles, int k) {
        int n = piles.size();
        int[][] dp = new int[n + 1][k + 1];

        for (int i = n - 1; i >= 0; i--) {
            for (int coins = 0; coins <= k; coins++) {
                dp[i][coins] = dp[i + 1][coins];

                int curPile = 0;
                for (int j = 0; j < Math.min(coins, piles.get(i).size()); j++) {
                    curPile += piles.get(i).get(j);
                    dp[i][coins] = Math.max(
                        dp[i][coins],
                        curPile + dp[i + 1][coins - (j + 1)]
                    );
                }
            }
        }

        return dp[0][k];
    }
}
```

```cpp
class Solution {
public:
    int maxValueOfCoins(vector<vector<int>>& piles, int k) {
        int n = piles.size();
        vector<vector<int>> dp(n + 1, vector<int>(k + 1, 0));

        for (int i = n - 1; i >= 0; i--) {
            for (int coins = 0; coins <= k; coins++) {
                dp[i][coins] = dp[i + 1][coins];

                int curPile = 0;
                for (int j = 0; j < min(coins, (int)piles[i].size()); j++) {
                    curPile += piles[i][j];
                    dp[i][coins] = max(
                        dp[i][coins],
                        curPile + dp[i + 1][coins - (j + 1)]
                    );
                }
            }
        }

        return dp[0][k];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} piles
     * @param {number} k
     * @return {number}
     */
    maxValueOfCoins = (piles, k) => {
        const n = piles.length;
        const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));

        for (let i = n - 1; i >= 0; i--) {
            for (let coins = 0; coins <= k; coins++) {
                dp[i][coins] = dp[i + 1][coins];

                let curPile = 0;
                for (let j = 0; j < Math.min(coins, piles[i].length); j++) {
                    curPile += piles[i][j];
                    dp[i][coins] = Math.max(
                        dp[i][coins],
                        curPile + dp[i + 1][coins - (j + 1)],
                    );
                }
            }
        }

        return dp[0][k];
    };
}
```

```go
func maxValueOfCoins(piles [][]int, k int) int {
    n := len(piles)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, k+1)
    }

    for i := n - 1; i >= 0; i-- {
        for coins := 0; coins <= k; coins++ {
            dp[i][coins] = dp[i+1][coins]

            curPile := 0
            for j := 0; j < min(coins, len(piles[i])); j++ {
                curPile += piles[i][j]
                dp[i][coins] = max(dp[i][coins], curPile+dp[i+1][coins-(j+1)])
            }
        }
    }

    return dp[0][k]
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxValueOfCoins(piles: List<List<Int>>, k: Int): Int {
        val n = piles.size
        val dp = Array(n + 1) { IntArray(k + 1) }

        for (i in n - 1 downTo 0) {
            for (coins in 0..k) {
                dp[i][coins] = dp[i + 1][coins]

                var curPile = 0
                for (j in 0 until minOf(coins, piles[i].size)) {
                    curPile += piles[i][j]
                    dp[i][coins] = maxOf(dp[i][coins], curPile + dp[i + 1][coins - (j + 1)])
                }
            }
        }

        return dp[0][k]
    }
}
```

```swift
class Solution {
    func maxValueOfCoins(_ piles: [[Int]], _ k: Int) -> Int {
        let n = piles.count
        var dp = [[Int]](repeating: [Int](repeating: 0, count: k + 1), count: n + 1)

        for i in stride(from: n - 1, through: 0, by: -1) {
            for coins in 0...k {
                dp[i][coins] = dp[i + 1][coins]

                var curPile = 0
                for j in 0..<min(coins, piles[i].count) {
                    curPile += piles[i][j]
                    dp[i][coins] = max(dp[i][coins], curPile + dp[i + 1][coins - (j + 1)])
                }
            }
        }

        return dp[0][k]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the number of piles, $k$ is the number of coins to choose, and $m$ is the total number of coins among all the piles.

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

In the bottom-up approach, each pile only depends on the results from the next pile. We can reduce space by using a single 1D array of size `k + 1`. Processing coins in reverse order ensures we do not overwrite values we still need for the current pile's computation.

### Algorithm

1. Create a 1D array `dp` of size `k + 1`, initialized to `0`.
2. For each pile in `piles`:
   - Iterate `coins` from `k` down to `1`:
     - For each `j` from `0` to `min(coins, len(pile)) - 1`:
       - Accumulate the top `j + 1` coins' value.
       - Update `dp[coins]` with `dp[coins - (j + 1)] + curPile` if larger.
3. Return `dp[k]`.

::tabs-start

```python
class Solution:
    def maxValueOfCoins(self, piles: List[List[int]], k: int) -> int:
        dp = [0] * (k + 1)

        for pile in piles:
            for coins in range(k, 0, -1):
                curPile = 0
                for j in range(min(coins, len(pile))):
                    curPile += pile[j]
                    dp[coins] = max(dp[coins], dp[coins - (j + 1)] + curPile)

        return dp[k]
```

```java
public class Solution {
    public int maxValueOfCoins(List<List<Integer>> piles, int k) {
        int[] dp = new int[k + 1];

        for (List<Integer> pile : piles) {
            for (int coins = k; coins >= 1; coins--) {
                int curPile = 0;
                for (int j = 0; j < Math.min(coins, pile.size()); j++) {
                    curPile += pile.get(j);
                    dp[coins] = Math.max(dp[coins], dp[coins - (j + 1)] + curPile);
                }
            }
        }

        return dp[k];
    }
}
```

```cpp
class Solution {
public:
    int maxValueOfCoins(vector<vector<int>>& piles, int k) {
        vector<int> dp(k + 1, 0);

        for (const auto& pile : piles) {
            for (int coins = k; coins >= 1; coins--) {
                int curPile = 0;
                for (int j = 0; j < min(coins, (int)pile.size()); j++) {
                    curPile += pile[j];
                    dp[coins] = max(dp[coins], dp[coins - (j + 1)] + curPile);
                }
            }
        }

        return dp[k];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} piles
     * @param {number} k
     * @return {number}
     */
    maxValueOfCoins = (piles, k) => {
        let dp = Array(k + 1).fill(0);

        for (const pile of piles) {
            for (let coins = k; coins >= 1; coins--) {
                let curPile = 0;
                for (let j = 0; j < Math.min(coins, pile.length); j++) {
                    curPile += pile[j];
                    dp[coins] = Math.max(
                        dp[coins],
                        dp[coins - (j + 1)] + curPile,
                    );
                }
            }
        }

        return dp[k];
    };
}
```

```go
func maxValueOfCoins(piles [][]int, k int) int {
    dp := make([]int, k+1)

    for _, pile := range piles {
        for coins := k; coins >= 1; coins-- {
            curPile := 0
            for j := 0; j < min(coins, len(pile)); j++ {
                curPile += pile[j]
                dp[coins] = max(dp[coins], dp[coins-(j+1)]+curPile)
            }
        }
    }

    return dp[k]
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxValueOfCoins(piles: List<List<Int>>, k: Int): Int {
        val dp = IntArray(k + 1)

        for (pile in piles) {
            for (coins in k downTo 1) {
                var curPile = 0
                for (j in 0 until minOf(coins, pile.size)) {
                    curPile += pile[j]
                    dp[coins] = maxOf(dp[coins], dp[coins - (j + 1)] + curPile)
                }
            }
        }

        return dp[k]
    }
}
```

```swift
class Solution {
    func maxValueOfCoins(_ piles: [[Int]], _ k: Int) -> Int {
        var dp = [Int](repeating: 0, count: k + 1)

        for pile in piles {
            for coins in stride(from: k, through: 1, by: -1) {
                var curPile = 0
                for j in 0..<min(coins, pile.count) {
                    curPile += pile[j]
                    dp[coins] = max(dp[coins], dp[coins - (j + 1)] + curPile)
                }
            }
        }

        return dp[k]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the number of piles, $k$ is the number of coins to choose, and $m$ is the total number of coins among all the piles.

---

## Common Pitfalls

### Off-By-One Errors in Coin Counting

When iterating through coins to take from a pile, it is easy to miscount. Taking `j + 1` coins means indices `0` through `j`, so loops should run from `0` to `min(coins, pile.size()) - 1`. Mixing up whether `j` represents the count or the last index causes incorrect state transitions.

### Forgetting to Consider Skipping a Pile

The option to take zero coins from a pile (skip it entirely) must be explicitly handled. In the DP transition, initialize the result with `dp[i + 1][coins]` before iterating over how many coins to take. Missing this case means you cannot skip piles, leading to suboptimal or incorrect answers.

### Incorrect DP Iteration Order for Space Optimization

In the space-optimized version, iterating `coins` from `0` to `k` instead of from `k` down to `1` causes you to overwrite values you still need for the current pile. Always iterate in reverse when using a 1D DP array to avoid using updated values prematurely.

### Accumulating Pile Sum Incorrectly

When computing the value of taking the top `j + 1` coins, you must accumulate the sum incrementally: `curPile += pile[j]`. Recomputing the sum from scratch each iteration is inefficient, and forgetting to accumulate leads to only counting the single coin at index `j` rather than all coins from `0` to `j`.
