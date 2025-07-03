## 1. Dynamic Programming (Top-Down) - I

::tabs-start

```python
class Solution:
    def stoneGameIII(self, stoneValue: List[int]) -> str:
        n = len(stoneValue)
        dp = [[None] * 2 for _ in range(n)]

        def dfs(i, alice):
            if i >= n:
                return 0
            if dp[i][alice] is not None:
                return dp[i][alice]

            res = float("-inf") if alice == 1 else float("inf")
            score = 0
            for j in range(i, min(i + 3, n)):
                if alice == 1:
                    score += stoneValue[j]
                    res = max(res, score + dfs(j + 1, 0))
                else:
                    score -= stoneValue[j]
                    res = min(res, score + dfs(j + 1, 1))

            dp[i][alice] = res
            return res

        result = dfs(0, 1)
        if result == 0:
            return "Tie"
        return "Alice" if result > 0 else "Bob"
```

```java
public class Solution {
    private Integer[][] dp;
    private int n;

    public String stoneGameIII(int[] stoneValue) {
        n = stoneValue.length;
        dp = new Integer[n][2];

        int result = dfs(0, 1, stoneValue);
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }

    private int dfs(int i, int alice, int[] stoneValue) {
        if (i >= n) return 0;
        if (dp[i][alice] != null) return dp[i][alice];

        int res = alice == 1 ? Integer.MIN_VALUE : Integer.MAX_VALUE;
        int score = 0;
        for (int j = i; j < Math.min(i + 3, n); j++) {
            if (alice == 1) {
                score += stoneValue[j];
                res = Math.max(res, score + dfs(j + 1, 0, stoneValue));
            } else {
                score -= stoneValue[j];
                res = Math.min(res, score + dfs(j + 1, 1, stoneValue));
            }
        }

        dp[i][alice] = res;
        return res;
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;
    int n;

public:
    string stoneGameIII(vector<int>& stoneValue) {
        n = stoneValue.size();
        dp.assign(n, vector<int>(2, INT_MIN));

        int result = dfs(0, 1, stoneValue);
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }

private:
    int dfs(int i, int alice, vector<int>& stoneValue) {
        if (i >= n) return 0;
        if (dp[i][alice] != INT_MIN) return dp[i][alice];

        int res = alice == 1 ? INT_MIN : INT_MAX;
        int score = 0;
        for (int j = i; j < min(i + 3, n); j++) {
            if (alice == 1) {
                score += stoneValue[j];
                res = max(res, score + dfs(j + 1, 0, stoneValue));
            } else {
                score -= stoneValue[j];
                res = min(res, score + dfs(j + 1, 1, stoneValue));
            }
        }

        dp[i][alice] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stoneValue
     * @return {string}
     */
    stoneGameIII(stoneValue) {
        const n = stoneValue.length;
        const dp = Array.from({ length: n }, () => [null, null]);

        const dfs = (i, alice) => {
            if (i >= n) return 0;
            if (dp[i][alice] !== null) return dp[i][alice];

            let res = alice === 1 ? -Infinity : Infinity;
            let score = 0;
            for (let j = i; j < Math.min(i + 3, n); j++) {
                if (alice === 1) {
                    score += stoneValue[j];
                    res = Math.max(res, score + dfs(j + 1, 0));
                } else {
                    score -= stoneValue[j];
                    res = Math.min(res, score + dfs(j + 1, 1));
                }
            }

            dp[i][alice] = res;
            return res;
        };

        const result = dfs(0, 1);
        if (result === 0) return 'Tie';
        return result > 0 ? 'Alice' : 'Bob';
    }
}
```

```csharp
public class Solution {
    public string StoneGameIII(int[] stoneValue) {
        int n = stoneValue.Length;
        int?[,] dp = new int?[n, 2];

        int Dfs(int i, int alice) {
            if (i >= n) return 0;
            if (dp[i, alice].HasValue) return dp[i, alice].Value;

            int res = alice == 1 ? int.MinValue : int.MaxValue;
            int score = 0;

            for (int j = i; j < Math.Min(i + 3, n); j++) {
                if (alice == 1) {
                    score += stoneValue[j];
                    res = Math.Max(res, score + Dfs(j + 1, 0));
                } else {
                    score -= stoneValue[j];
                    res = Math.Min(res, score + Dfs(j + 1, 1));
                }
            }

            dp[i, alice] = res;
            return res;
        }

        int result = Dfs(0, 1);
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down) - II

::tabs-start

```python
class Solution:
    def stoneGameIII(self, stoneValue: List[int]) -> str:
        n = len(stoneValue)
        dp = {}

        def dfs(i):
            if i >= n:
                return 0
            if i in dp:
                return dp[i]

            res, total = float("-inf"), 0
            for j in range(i, min(i + 3, n)):
                total += stoneValue[j]
                res = max(res, total - dfs(j + 1))

            dp[i] = res
            return res

        result = dfs(0)
        if result == 0:
            return "Tie"
        return "Alice" if result > 0 else "Bob"
```

```java
public class Solution {
    private int[] dp;
    private int n;

    public String stoneGameIII(int[] stoneValue) {
        this.n = stoneValue.length;
        this.dp = new int[n];
        Arrays.fill(dp, Integer.MIN_VALUE);

        int result = dfs(0, stoneValue);
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }

    private int dfs(int i, int[] stoneValue) {
        if (i >= n) return 0;
        if (dp[i] != Integer.MIN_VALUE) return dp[i];

        int res = Integer.MIN_VALUE, total = 0;
        for (int j = i; j < Math.min(i + 3, n); j++) {
            total += stoneValue[j];
            res = Math.max(res, total - dfs(j + 1, stoneValue));
        }

        dp[i] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    string stoneGameIII(vector<int>& stoneValue) {
        n = stoneValue.size();
        dp.assign(n, INT_MIN);

        int result = dfs(0, stoneValue);
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }

private:
    vector<int> dp;
    int n;

    int dfs(int i, vector<int>& stoneValue) {
        if (i >= n) return 0;
        if (dp[i] != INT_MIN) return dp[i];

        int res = INT_MIN, total = 0;
        for (int j = i; j < min(i + 3, n); j++) {
            total += stoneValue[j];
            res = max(res, total - dfs(j + 1, stoneValue));
        }

        dp[i] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stoneValue
     * @return {string}
     */
    stoneGameIII(stoneValue) {
        const n = stoneValue.length;
        const dp = new Array(n);

        const dfs = (i) => {
            if (i >= n) return 0;
            if (dp[i] !== undefined) return dp[i];

            let res = -Infinity,
                total = 0;
            for (let j = i; j < Math.min(i + 3, n); j++) {
                total += stoneValue[j];
                res = Math.max(res, total - dfs(j + 1));
            }

            dp[i] = res;
            return res;
        };

        const result = dfs(0);
        if (result === 0) return 'Tie';
        return result > 0 ? 'Alice' : 'Bob';
    }
}
```

```csharp
public class Solution {
    public string StoneGameIII(int[] stoneValue) {
        int n = stoneValue.Length;
        Dictionary<int, int> dp = new Dictionary<int, int>();

        int Dfs(int i) {
            if (i >= n) return 0;
            if (dp.ContainsKey(i)) return dp[i];

            int res = int.MinValue, total = 0;
            for (int j = i; j < Math.Min(i + 3, n); j++) {
                total += stoneValue[j];
                res = Math.Max(res, total - Dfs(j + 1));
            }

            dp[i] = res;
            return res;
        }

        int result = Dfs(0);
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def stoneGameIII(self, stoneValue: List[int]) -> str:
        n = len(stoneValue)
        dp = [float("-inf")] * (n + 1)
        dp[n] = 0

        for i in range(n - 1, -1, -1):
            total = 0
            for j in range(i, min(i + 3, n)):
                total += stoneValue[j]
                dp[i] = max(dp[i], total - dp[j + 1])

        result = dp[0]
        if result == 0:
            return "Tie"
        return "Alice" if result > 0 else "Bob"
```

```java
public class Solution {
    public String stoneGameIII(int[] stoneValue) {
        int n = stoneValue.length;
        int[] dp = new int[n + 1];
        Arrays.fill(dp, Integer.MIN_VALUE);
        dp[n] = 0;

        for (int i = n - 1; i >= 0; i--) {
            int total = 0;
            dp[i] = Integer.MIN_VALUE;
            for (int j = i; j < Math.min(i + 3, n); j++) {
                total += stoneValue[j];
                dp[i] = Math.max(dp[i], total - dp[j + 1]);
            }
        }

        int result = dp[0];
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }
}
```

```cpp
class Solution {
public:
    string stoneGameIII(vector<int>& stoneValue) {
        int n = stoneValue.size();
        vector<int> dp(n + 1, INT_MIN);
        dp[n] = 0;

        for (int i = n - 1; i >= 0; i--) {
            int total = 0;
            dp[i] = INT_MIN;
            for (int j = i; j < min(i + 3, n); j++) {
                total += stoneValue[j];
                dp[i] = max(dp[i], total - dp[j + 1]);
            }
        }

        int result = dp[0];
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stoneValue
     * @return {string}
     */
    stoneGameIII(stoneValue) {
        const n = stoneValue.length;
        const dp = new Array(n + 1).fill(-Infinity);
        dp[n] = 0;

        for (let i = n - 1; i >= 0; i--) {
            let total = 0;
            dp[i] = -Infinity;
            for (let j = i; j < Math.min(i + 3, n); j++) {
                total += stoneValue[j];
                dp[i] = Math.max(dp[i], total - dp[j + 1]);
            }
        }

        const result = dp[0];
        if (result === 0) return 'Tie';
        return result > 0 ? 'Alice' : 'Bob';
    }
}
```

```csharp
public class Solution {
    public string StoneGameIII(int[] stoneValue) {
        int n = stoneValue.Length;
        int[] dp = new int[n + 1];
        for (int i = 0; i <= n; i++) dp[i] = int.MinValue;
        dp[n] = 0;

        for (int i = n - 1; i >= 0; i--) {
            int total = 0;
            for (int j = i; j < Math.Min(i + 3, n); j++) {
                total += stoneValue[j];
                dp[i] = Math.Max(dp[i], total - dp[j + 1]);
            }
        }

        int result = dp[0];
        if (result == 0) return "Tie";
        return result > 0 ? "Alice" : "Bob";
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def stoneGameIII(self, stoneValue: List[int]) -> str:
        n = len(stoneValue)
        dp = [0] * 4

        for i in range(n - 1, -1, -1):
            total = 0
            dp[i % 4] = float("-inf")
            for j in range(i, min(i + 3, n)):
                total += stoneValue[j]
                dp[i % 4] = max(dp[i % 4], total - dp[(j + 1) % 4])

        if dp[0] == 0:
            return "Tie"
        return "Alice" if dp[0] > 0 else "Bob"
```

```java
public class Solution {
    public String stoneGameIII(int[] stoneValue) {
        int n = stoneValue.length;
        int[] dp = new int[4];

        for (int i = n - 1; i >= 0; i--) {
            int total = 0;
            dp[i % 4] = Integer.MIN_VALUE;
            for (int j = i; j < Math.min(i + 3, n); j++) {
                total += stoneValue[j];
                dp[i % 4] = Math.max(dp[i % 4], total - dp[(j + 1) % 4]);
            }
        }

        if (dp[0] == 0) return "Tie";
        return dp[0] > 0 ? "Alice" : "Bob";
    }
}
```

```cpp
class Solution {
public:
    string stoneGameIII(vector<int>& stoneValue) {
        int n = stoneValue.size();
        vector<int> dp(4, 0);

        for (int i = n - 1; i >= 0; --i) {
            int total = 0;
            dp[i % 4] = INT_MIN;
            for (int j = i; j < min(i + 3, n); ++j) {
                total += stoneValue[j];
                dp[i % 4] = max(dp[i % 4], total - dp[(j + 1) % 4]);
            }
        }

        if (dp[0] == 0) return "Tie";
        return dp[0] > 0 ? "Alice" : "Bob";
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stoneValue
     * @return {string}
     */
    stoneGameIII(stoneValue) {
        const n = stoneValue.length;
        const dp = new Array(4).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            let total = 0;
            dp[i % 4] = -Infinity;
            for (let j = i; j < Math.min(i + 3, n); j++) {
                total += stoneValue[j];
                dp[i % 4] = Math.max(dp[i % 4], total - dp[(j + 1) % 4]);
            }
        }

        if (dp[0] === 0) return 'Tie';
        return dp[0] > 0 ? 'Alice' : 'Bob';
    }
}
```

```csharp
public class Solution {
    public string StoneGameIII(int[] stoneValue) {
        int n = stoneValue.Length;
        int[] dp = new int[4];

        for (int i = n - 1; i >= 0; i--) {
            int total = 0;
            dp[i % 4] = int.MinValue;

            for (int j = i; j < Math.Min(i + 3, n); j++) {
                total += stoneValue[j];
                dp[i % 4] = Math.Max(dp[i % 4], total - dp[(j + 1) % 4]);
            }
        }

        if (dp[0] == 0) return "Tie";
        return dp[0] > 0 ? "Alice" : "Bob";
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
