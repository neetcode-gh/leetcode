## 1. Recursion

::tabs-start

```python
class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        def dfs(l, r):
            if l > r:
                return 0
            even = (r - l) % 2 == 0
            left = piles[l] if even else 0
            right = piles[r] if even else 0
            return max(dfs(l + 1, r) + left, dfs(l, r - 1) + right)

        total = sum(piles)
        alice_score = dfs(0, len(piles) - 1)
        return alice_score > total - alice_score
```

```java
public class Solution {
    public boolean stoneGame(int[] piles) {
        int total = 0;
        for (int pile : piles) {
            total += pile;
        }

        int aliceScore = dfs(0, piles.length - 1, piles);
        return aliceScore > total - aliceScore;
    }

    private int dfs(int l, int r, int[] piles) {
        if (l > r) {
            return 0;
        }
        boolean even = (r - l) % 2 == 0;
        int left = even ? piles[l] : 0;
        int right = even ? piles[r] : 0;
        return Math.max(dfs(l + 1, r, piles) + left, dfs(l, r - 1, piles) + right);
    }
}
```

```cpp
class Solution {
public:
    bool stoneGame(vector<int>& piles) {
        int total = accumulate(piles.begin(), piles.end(), 0);
        int aliceScore = dfs(0, piles.size() - 1, piles);
        return aliceScore > total - aliceScore;
    }

private:
    int dfs(int l, int r, const vector<int>& piles) {
        if (l > r) {
            return 0;
        }
        bool even = (r - l) % 2 == 0;
        int left = even ? piles[l] : 0;
        int right = even ? piles[r] : 0;
        return max(dfs(l + 1, r, piles) + left, dfs(l, r - 1, piles) + right);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} piles
     * @return {boolean}
     */
    stoneGame(piles) {
        const total = piles.reduce((a, b) => a + b, 0);

        const dfs = (l, r) => {
            if (l > r) {
                return 0;
            }
            const even = (r - l) % 2 === 0;
            const left = even ? piles[l] : 0;
            const right = even ? piles[r] : 0;
            return Math.max(dfs(l + 1, r) + left, dfs(l, r - 1) + right);
        };

        const aliceScore = dfs(0, piles.length - 1);
        return aliceScore > total - aliceScore;
    }
}
```

```csharp
public class Solution {
    public bool StoneGame(int[] piles) {
        int total = 0;
        foreach (int pile in piles) {
            total += pile;
        }

        int aliceScore = Dfs(0, piles.Length - 1, piles);
        return aliceScore > total - aliceScore;
    }

    private int Dfs(int l, int r, int[] piles) {
        if (l > r) {
            return 0;
        }
        bool even = (r - l) % 2 == 0;
        int left = even ? piles[l] : 0;
        int right = even ? piles[r] : 0;
        return Math.Max(Dfs(l + 1, r, piles) + left, Dfs(l, r - 1, piles) + right);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        dp = {}

        def dfs(l, r):
            if l > r:
                return 0
            if (l, r) in dp:
                return dp[(l, r)]
            even = (r - l) % 2 == 0
            left = piles[l] if even else 0
            right = piles[r] if even else 0
            dp[(l, r)] = max(dfs(l + 1, r) + left, dfs(l, r - 1) + right)
            return dp[(l, r)]

        total = sum(piles)
        alice_score = dfs(0, len(piles) - 1)
        return alice_score > total - alice_score
```

```java
public class Solution {
    private int[][] dp;

    public boolean stoneGame(int[] piles) {
        int n = piles.length;
        dp = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                dp[i][j] = -1;
            }
        }

        int total = 0;
        for (int pile : piles) {
            total += pile;
        }

        int aliceScore = dfs(0, n - 1, piles);
        return aliceScore > total - aliceScore;
    }

    private int dfs(int l, int r, int[] piles) {
        if (l > r) {
            return 0;
        }
        if (dp[l][r] != -1) {
            return dp[l][r];
        }
        boolean even = (r - l) % 2 == 0;
        int left = even ? piles[l] : 0;
        int right = even ? piles[r] : 0;
        dp[l][r] = Math.max(dfs(l + 1, r, piles) + left, dfs(l, r - 1, piles) + right);
        return dp[l][r];
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    bool stoneGame(vector<int>& piles) {
        int n = piles.size();
        dp = vector<vector<int>>(n, vector<int>(n, -1));
        int total = accumulate(piles.begin(), piles.end(), 0);
        int aliceScore = dfs(0, n - 1, piles);
        return aliceScore > total - aliceScore;
    }

private:
    int dfs(int l, int r, const vector<int>& piles) {
        if (l > r) {
            return 0;
        }
        if (dp[l][r] != -1) {
            return dp[l][r];
        }
        bool even = (r - l) % 2 == 0;
        int left = even ? piles[l] : 0;
        int right = even ? piles[r] : 0;
        dp[l][r] = max(dfs(l + 1, r, piles) + left, dfs(l, r - 1, piles) + right);
        return dp[l][r];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} piles
     * @return {boolean}
     */
    stoneGame(piles) {
        const n = piles.length;
        const dp = Array.from({ length: n }, () => Array(n).fill(-1));

        const dfs = (l, r) => {
            if (l > r) {
                return 0;
            }
            if (dp[l][r] !== -1) {
                return dp[l][r];
            }
            const even = (r - l) % 2 === 0;
            const left = even ? piles[l] : 0;
            const right = even ? piles[r] : 0;
            dp[l][r] = Math.max(dfs(l + 1, r) + left, dfs(l, r - 1) + right);
            return dp[l][r];
        };

        const total = piles.reduce((a, b) => a + b, 0);
        const aliceScore = dfs(0, n - 1);
        return aliceScore > total - aliceScore;
    }
}
```

```csharp
public class Solution {
    private int[,] dp;

    public bool StoneGame(int[] piles) {
        int n = piles.Length;
        dp = new int[n, n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                dp[i, j] = -1;
            }
        }

        int total = 0;
        foreach (int pile in piles) {
            total += pile;
        }

        int aliceScore = Dfs(0, n - 1, piles);
        return aliceScore > total - aliceScore;
    }

    private int Dfs(int l, int r, int[] piles) {
        if (l > r) {
            return 0;
        }
        if (dp[l, r] != -1) {
            return dp[l, r];
        }
        bool even = (r - l) % 2 == 0;
        int left = even ? piles[l] : 0;
        int right = even ? piles[r] : 0;
        dp[l, r] = Math.Max(Dfs(l + 1, r, piles) + left, Dfs(l, r - 1, piles) + right);
        return dp[l, r];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        n = len(piles)
        dp = [[0] * n for _ in range(n)]

        for l in range(n - 1, -1, -1):
            for r in range(l, n):
                even = (r - l) % 2 == 0
                left = piles[l] if even else 0
                right = piles[r] if even else 0
                if l == r:
                    dp[l][r] = left
                else:
                    dp[l][r] = max(dp[l + 1][r] + left, dp[l][r - 1] + right)

        total = sum(piles)
        alice_score = dp[0][n - 1]
        return alice_score > total - alice_score
```

```java
public class Solution {
    public boolean stoneGame(int[] piles) {
        int n = piles.length;
        int[][] dp = new int[n][n];

        for (int l = n - 1; l >= 0; l--) {
            for (int r = l; r < n; r++) {
                boolean even = (r - l) % 2 == 0;
                int left = even ? piles[l] : 0;
                int right = even ? piles[r] : 0;
                if (l == r) {
                    dp[l][r] = left;
                } else {
                    dp[l][r] = Math.max(dp[l + 1][r] + left, dp[l][r - 1] + right);
                }
            }
        }

        int total = 0;
        for (int pile : piles) {
            total += pile;
        }

        int aliceScore = dp[0][n - 1];
        return aliceScore > total - aliceScore;
    }
}
```

```cpp
class Solution {
public:
    bool stoneGame(vector<int>& piles) {
        int n = piles.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));

        for (int l = n - 1; l >= 0; l--) {
            for (int r = l; r < n; r++) {
                bool even = (r - l) % 2 == 0;
                int left = even ? piles[l] : 0;
                int right = even ? piles[r] : 0;
                if (l == r) {
                    dp[l][r] = left;
                } else {
                    dp[l][r] = max(dp[l + 1][r] + left, dp[l][r - 1] + right);
                }
            }
        }

        int total = accumulate(piles.begin(), piles.end(), 0);
        int aliceScore = dp[0][n - 1];
        return aliceScore > total - aliceScore;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} piles
     * @return {boolean}
     */
    stoneGame(piles) {
        const n = piles.length;
        const dp = Array.from({ length: n }, () => Array(n).fill(0));

        for (let l = n - 1; l >= 0; l--) {
            for (let r = l; r < n; r++) {
                const even = (r - l) % 2 === 0;
                const left = even ? piles[l] : 0;
                const right = even ? piles[r] : 0;
                if (l === r) {
                    dp[l][r] = left;
                } else {
                    dp[l][r] = Math.max(
                        dp[l + 1][r] + left,
                        dp[l][r - 1] + right,
                    );
                }
            }
        }

        const total = piles.reduce((a, b) => a + b, 0);
        const aliceScore = dp[0][n - 1];
        return aliceScore > total - aliceScore;
    }
}
```

```csharp
public class Solution {
    public bool StoneGame(int[] piles) {
        int n = piles.Length;
        int[,] dp = new int[n, n];

        for (int l = n - 1; l >= 0; l--) {
            for (int r = l; r < n; r++) {
                bool even = (r - l) % 2 == 0;
                int left = even ? piles[l] : 0;
                int right = even ? piles[r] : 0;
                if (l == r) {
                    dp[l, r] = left;
                } else {
                    dp[l, r] = Math.Max(dp[l + 1, r] + left, dp[l, r - 1] + right);
                }
            }
        }

        int total = 0;
        foreach (int pile in piles) {
            total += pile;
        }

        int aliceScore = dp[0, n - 1];
        return aliceScore > total - aliceScore;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        n = len(piles)
        dp = [0] * n

        for l in reversed(range(n)):
            for r in range(l, n):
                even = ((r - l) % 2 == 0)
                left = piles[l] if even else 0
                right = piles[r] if even else 0

                if l == r:
                    dp[r] = left
                else:
                    dp[r] = max(dp[r] + left, dp[r - 1] + right)

        total = sum(piles)
        alice_score = dp[n - 1]
        return alice_score > (total - alice_score)
```

```java
public class Solution {
    public boolean stoneGame(int[] piles) {
        int n = piles.length;
        int[] dp = new int[n];

        for (int l = n - 1; l >= 0; l--) {
            for (int r = l; r < n; r++) {
                boolean even = (r - l) % 2 == 0;
                int left = even ? piles[l] : 0;
                int right = even ? piles[r] : 0;

                if (l == r) {
                    dp[r] = left;
                } else {
                    dp[r] = Math.max(dp[r] + left, dp[r - 1] + right);
                }
            }
        }

        int total = 0;
        for (int pile : piles) {
            total += pile;
        }

        int aliceScore = dp[n - 1];
        return aliceScore > (total - aliceScore);
    }
}
```

```cpp
class Solution {
public:
    bool stoneGame(vector<int>& piles) {
        int n = piles.size();
        vector<int> dp(n, 0);

        for (int l = n - 1; l >= 0; l--) {
            for (int r = l; r < n; r++) {
                bool even = (r - l) % 2 == 0;
                int left = even ? piles[l] : 0;
                int right = even ? piles[r] : 0;

                if (l == r) {
                    dp[r] = left;
                } else {
                    dp[r] = max(dp[r] + left, dp[r - 1] + right);
                }
            }
        }

        int total = accumulate(piles.begin(), piles.end(), 0);
        int aliceScore = dp[n - 1];
        return aliceScore > (total - aliceScore);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} piles
     * @return {boolean}
     */
    stoneGame(piles) {
        const n = piles.length;
        const dp = new Array(n).fill(0);

        for (let l = n - 1; l >= 0; l--) {
            for (let r = l; r < n; r++) {
                const even = (r - l) % 2 === 0;
                const left = even ? piles[l] : 0;
                const right = even ? piles[r] : 0;

                if (l === r) {
                    dp[r] = left;
                } else {
                    dp[r] = Math.max(dp[r] + left, dp[r - 1] + right);
                }
            }
        }

        const total = piles.reduce((a, b) => a + b, 0);
        const aliceScore = dp[n - 1];
        return aliceScore > total - aliceScore;
    }
}
```

```csharp
public class Solution {
    public bool StoneGame(int[] piles) {
        int n = piles.Length;
        int[] dp = new int[n];

        for (int l = n - 1; l >= 0; l--) {
            for (int r = l; r < n; r++) {
                bool even = (r - l) % 2 == 0;
                int left = even ? piles[l] : 0;
                int right = even ? piles[r] : 0;

                if (l == r) {
                    dp[r] = left;
                } else {
                    dp[r] = Math.Max(dp[r] + left, dp[r - 1] + right);
                }
            }
        }

        int total = 0;
        foreach (int pile in piles) {
            total += pile;
        }

        int aliceScore = dp[n - 1];
        return aliceScore > (total - aliceScore);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 5. Return TRUE

::tabs-start

```python
class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        return True
```

```java
public class Solution {
    public boolean stoneGame(int[] piles) {
        return true;
    }
}
```

```cpp
class Solution {
public:
    bool stoneGame(vector<int>& piles) {
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} piles
     * @return {boolean}
     */
    stoneGame(piles) {
        return true;
    }
}
```

```csharp
public class Solution {
    public bool StoneGame(int[] piles) {
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
