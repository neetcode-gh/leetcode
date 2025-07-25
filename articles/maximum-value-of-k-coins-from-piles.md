## 1. Recursion

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k ^ n)$
- Space complexity: $O(n)$ for the recursion stack.

> Where $n$ is the number of piles and $k$ is the number of coins to choose.

---

## 2. Dynamic Programming (Top-Down)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the number of piles, $k$ is the number of coins to choose, and $m$ is the total number of coins among all the piles.

---

## 3. Dynamic Programming (Bottom-Up)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the number of piles, $k$ is the number of coins to choose, and $m$ is the total number of coins among all the piles.

---

## 4. Dynamic Programming (Space Optimized)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the number of piles, $k$ is the number of coins to choose, and $m$ is the total number of coins among all the piles.
