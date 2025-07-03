## 1. Recursion

::tabs-start

```python
class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        stoneSum = sum(stones)
        target = (stoneSum + 1) // 2

        def dfs(i, total):
            if total >= target or i == len(stones):
                return abs(total - (stoneSum - total))
            return min(dfs(i + 1, total), dfs(i + 1, total + stones[i]))

        return dfs(0, 0)
```

```java
public class Solution {
    public int lastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        for (int stone : stones) {
            stoneSum += stone;
        }
        int target = (stoneSum + 1) / 2;

        return dfs(0, 0, stones, stoneSum, target);
    }

    private int dfs(int i, int total, int[] stones, int stoneSum, int target) {
        if (total >= target || i == stones.length) {
            return Math.abs(total - (stoneSum - total));
        }
        return Math.min(
            dfs(i + 1, total, stones, stoneSum, target),
            dfs(i + 1, total + stones[i], stones, stoneSum, target)
        );
    }
}
```

```cpp
class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int stoneSum = accumulate(stones.begin(), stones.end(), 0);
        int target = (stoneSum + 1) / 2;
        return dfs(0, 0, stones, stoneSum, target);
    }

private:
    int dfs(int i, int total, const vector<int>& stones, int stoneSum, int target) {
        if (total >= target || i == stones.size()) {
            return abs(total - (stoneSum - total));
        }
        return min(
            dfs(i + 1, total, stones, stoneSum, target),
            dfs(i + 1, total + stones[i], stones, stoneSum, target)
        );
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeightII(stones) {
        const stoneSum = stones.reduce((a, b) => a + b, 0);
        const target = Math.ceil(stoneSum / 2);

        const dfs = (i, total) => {
            if (total >= target || i === stones.length) {
                return Math.abs(total - (stoneSum - total));
            }
            return Math.min(dfs(i + 1, total), dfs(i + 1, total + stones[i]));
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public int LastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        foreach (int stone in stones) {
            stoneSum += stone;
        }
        int target = (stoneSum + 1) / 2;
        return Dfs(0, 0, stones, stoneSum, target);
    }

    private int Dfs(int i, int total, int[] stones, int stoneSum, int target) {
        if (total >= target || i == stones.Length) {
            return Math.Abs(total - (stoneSum - total));
        }

        return Math.Min(
            Dfs(i + 1, total, stones, stoneSum, target),
            Dfs(i + 1, total + stones[i], stones, stoneSum, target)
        );
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(min(n, m))$ for recursion stack.

> Where $n$ is the number of stones and $m$ is the sum of the weights of the stones.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        stoneSum = sum(stones)
        target = (stoneSum + 1) // 2
        dp = {}

        def dfs(i, total):
            if total >= target or i == len(stones):
                return abs(total - (stoneSum - total))
            if (i, total) in dp:
                return dp[(i, total)]

            dp[(i, total)] = min(dfs(i + 1, total), dfs(i + 1, total + stones[i]))
            return dp[(i, total)]

        return dfs(0, 0)
```

```java
public class Solution {
    private int[][] dp;

    public int lastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        for (int stone : stones) {
            stoneSum += stone;
        }
        int target = (stoneSum + 1) / 2;
        dp = new int[stones.length][target + 1];
        for (int i = 0; i < stones.length; i++) {
            for (int j = 0; j <= target; j++) {
                dp[i][j] = -1;
            }
        }

        return dfs(0, 0, stones, stoneSum, target);
    }

    private int dfs(int i, int total, int[] stones, int stoneSum, int target) {
        if (total >= target || i == stones.length) {
            return Math.abs(total - (stoneSum - total));
        }
        if (dp[i][total] != -1) {
            return dp[i][total];
        }

        dp[i][total] = Math.min(
            dfs(i + 1, total, stones, stoneSum, target),
            dfs(i + 1, total + stones[i], stones, stoneSum, target)
        );
        return dp[i][total];
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    int lastStoneWeightII(vector<int>& stones) {
        int stoneSum = accumulate(stones.begin(), stones.end(), 0);
        int target = (stoneSum + 1) / 2;
        dp = vector<vector<int>>(stones.size(), vector<int>(target + 1, -1));
        return dfs(0, 0, stones, stoneSum, target);
    }

private:
    int dfs(int i, int total, const vector<int>& stones, int stoneSum, int target) {
        if (total >= target || i == stones.size()) {
            return abs(total - (stoneSum - total));
        }
        if (dp[i][total] != -1) {
            return dp[i][total];
        }

        dp[i][total] = min(
            dfs(i + 1, total, stones, stoneSum, target),
            dfs(i + 1, total + stones[i], stones, stoneSum, target)
        );
        return dp[i][total];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeightII(stones) {
        const stoneSum = stones.reduce((a, b) => a + b, 0);
        const target = Math.ceil(stoneSum / 2);
        const dp = Array.from({ length: stones.length }, () =>
            Array(target + 1).fill(-1),
        );

        const dfs = (i, total) => {
            if (total >= target || i === stones.length) {
                return Math.abs(total - (stoneSum - total));
            }
            if (dp[i][total] !== -1) {
                return dp[i][total];
            }

            dp[i][total] = Math.min(
                dfs(i + 1, total),
                dfs(i + 1, total + stones[i]),
            );
            return dp[i][total];
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private int[][] dp;

    public int LastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        foreach (int stone in stones) {
            stoneSum += stone;
        }
        int target = (stoneSum + 1) / 2;
        dp = new int[stones.Length][];
        for (int i = 0; i < stones.Length; i++) {
            dp[i] = new int[target + 1];
            for (int j = 0; j <= target; j++) {
                dp[i][j] = -1;
            }
        }

        return Dfs(0, 0, stones, stoneSum, target);
    }

    private int Dfs(int i, int total, int[] stones, int stoneSum, int target) {
        if (total >= target || i == stones.Length) {
            return Math.Abs(total - (stoneSum - total));
        }
        if (dp[i][total] != -1) {
            return dp[i][total];
        }

        dp[i][total] = Math.Min(
            Dfs(i + 1, total, stones, stoneSum, target),
            Dfs(i + 1, total + stones[i], stones, stoneSum, target)
        );

        return dp[i][total];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the number of stones and $m$ is the sum of the weights of the stones.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        stoneSum = sum(stones)
        target = stoneSum // 2
        n = len(stones)

        dp = [[0] * (target + 1) for _ in range(n + 1)]

        for i in range(1, n + 1):
            for t in range(target + 1):
                if t >= stones[i - 1]:
                    dp[i][t] = max(dp[i - 1][t], dp[i - 1][t - stones[i - 1]] + stones[i - 1])
                else:
                    dp[i][t] = dp[i - 1][t]

        return stoneSum - 2 * dp[n][target]
```

```java
public class Solution {
    public int lastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        for (int stone : stones) {
            stoneSum += stone;
        }
        int target = stoneSum / 2;
        int n = stones.length;

        int[][] dp = new int[n + 1][target + 1];

        for (int i = 1; i <= n; i++) {
            for (int t = 0; t <= target; t++) {
                if (t >= stones[i - 1]) {
                    dp[i][t] = Math.max(dp[i - 1][t], dp[i - 1][t - stones[i - 1]] + stones[i - 1]);
                } else {
                    dp[i][t] = dp[i - 1][t];
                }
            }
        }

        return stoneSum - 2 * dp[n][target];
    }
}
```

```cpp
class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int stoneSum = accumulate(stones.begin(), stones.end(), 0);
        int target = stoneSum / 2;
        int n = stones.size();

        vector<vector<int>> dp(n + 1, vector<int>(target + 1, 0));

        for (int i = 1; i <= n; i++) {
            for (int t = 0; t <= target; t++) {
                if (t >= stones[i - 1]) {
                    dp[i][t] = max(dp[i - 1][t], dp[i - 1][t - stones[i - 1]] + stones[i - 1]);
                } else {
                    dp[i][t] = dp[i - 1][t];
                }
            }
        }

        return stoneSum - 2 * dp[n][target];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeightII(stones) {
        const stoneSum = stones.reduce((a, b) => a + b, 0);
        const target = Math.floor(stoneSum / 2);
        const n = stones.length;

        const dp = Array.from({ length: n + 1 }, () =>
            Array(target + 1).fill(0),
        );

        for (let i = 1; i <= n; i++) {
            for (let t = 0; t <= target; t++) {
                if (t >= stones[i - 1]) {
                    dp[i][t] = Math.max(
                        dp[i - 1][t],
                        dp[i - 1][t - stones[i - 1]] + stones[i - 1],
                    );
                } else {
                    dp[i][t] = dp[i - 1][t];
                }
            }
        }

        return stoneSum - 2 * dp[n][target];
    }
}
```

```csharp
public class Solution {
    public int LastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        foreach (int stone in stones) {
            stoneSum += stone;
        }
        int target = stoneSum / 2;
        int n = stones.Length;

        int[,] dp = new int[n + 1, target + 1];

        for (int i = 1; i <= n; i++) {
            for (int t = 0; t <= target; t++) {
                if (t >= stones[i - 1]) {
                    dp[i, t] = Math.Max(dp[i - 1, t], dp[i - 1, t - stones[i - 1]] + stones[i - 1]);
                } else {
                    dp[i, t] = dp[i - 1, t];
                }
            }
        }

        return stoneSum - 2 * dp[n, target];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the number of stones and $m$ is the sum of the weights of the stones.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        stoneSum = sum(stones)
        target = stoneSum // 2
        dp = [0] * (target + 1)

        for stone in stones:
            for t in range(target, stone - 1, -1):
                dp[t] = max(dp[t], dp[t - stone] + stone)

        return stoneSum - 2 * dp[target]
```

```java
public class Solution {
    public int lastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        for (int stone : stones) {
            stoneSum += stone;
        }
        int target = stoneSum / 2;
        int[] dp = new int[target + 1];

        for (int stone : stones) {
            for (int t = target; t >= stone; t--) {
                dp[t] = Math.max(dp[t], dp[t - stone] + stone);
            }
        }

        return stoneSum - 2 * dp[target];
    }
}
```

```cpp
class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int stoneSum = accumulate(stones.begin(), stones.end(), 0);
        int target = stoneSum / 2;
        vector<int> dp(target + 1, 0);

        for (int stone : stones) {
            for (int t = target; t >= stone; t--) {
                dp[t] = max(dp[t], dp[t - stone] + stone);
            }
        }

        return stoneSum - 2 * dp[target];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeightII(stones) {
        const stoneSum = stones.reduce((a, b) => a + b, 0);
        const target = Math.floor(stoneSum / 2);
        const dp = new Array(target + 1).fill(0);

        for (const stone of stones) {
            for (let t = target; t >= stone; t--) {
                dp[t] = Math.max(dp[t], dp[t - stone] + stone);
            }
        }

        return stoneSum - 2 * dp[target];
    }
}
```

```csharp
public class Solution {
    public int LastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        foreach (int stone in stones) {
            stoneSum += stone;
        }
        int target = stoneSum / 2;
        int[] dp = new int[target + 1];

        foreach (int stone in stones) {
            for (int t = target; t >= stone; t--) {
                dp[t] = Math.Max(dp[t], dp[t - stone] + stone);
            }
        }

        return stoneSum - 2 * dp[target];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(m)$

> Where $n$ is the number of stones and $m$ is the sum of the weights of the stones.

---

## 5. Dynamic Programming (Hash Set)

::tabs-start

```python
class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        stoneSum = sum(stones)
        target = stoneSum // 2
        dp = {0}

        for stone in stones:
            new_dp = set(dp)
            for val in dp:
                if val + stone == target:
                    return stoneSum - 2 * target
                if val + stone < target:
                    new_dp.add(val + stone)
            dp = new_dp

        return stoneSum - 2 * max(dp)
```

```java
public class Solution {
    public int lastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        for (int stone : stones) {
            stoneSum += stone;
        }
        int target = stoneSum / 2;

        Set<Integer> dp = new HashSet<>();
        dp.add(0);

        for (int stone : stones) {
            Set<Integer> newDp = new HashSet<>(dp);
            for (int val : dp) {
                if (val + stone == target) {
                    return stoneSum - 2 * target;
                }
                if (val + stone < target) {
                    newDp.add(val + stone);
                }
            }
            dp = newDp;
        }

        int maxVal = 0;
        for (int val : dp) {
            maxVal = Math.max(maxVal, val);
        }

        return stoneSum - 2 * maxVal;
    }
}
```

```cpp
class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int stoneSum = accumulate(stones.begin(), stones.end(), 0);
        int target = stoneSum / 2;

        unordered_set<int> dp = {0};

        for (int& stone : stones) {
            unordered_set<int> newDp(dp);
            for (int val : dp) {
                if (val + stone == target) {
                    return stoneSum - 2 * target;
                }
                if (val + stone < target) {
                    newDp.insert(val + stone);
                }
            }
            dp = newDp;
        }

        int maxVal = 0;
        for (int val : dp) {
            maxVal = max(maxVal, val);
        }

        return stoneSum - 2 * maxVal;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeightII(stones) {
        const stoneSum = stones.reduce((a, b) => a + b, 0);
        const target = Math.floor(stoneSum / 2);

        let dp = new Set([0]);

        for (const stone of stones) {
            const newDp = new Set(dp);
            for (const val of dp) {
                if (val + stone === target) {
                    return stoneSum - 2 * target;
                }
                if (val + stone < target) {
                    newDp.add(val + stone);
                }
            }
            dp = newDp;
        }

        return stoneSum - 2 * Math.max(...dp);
    }
}
```

```csharp
public class Solution {
    public int LastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        foreach (int stone in stones) {
            stoneSum += stone;
        }
        int target = stoneSum / 2;

        HashSet<int> dp = new HashSet<int>();
        dp.Add(0);

        foreach (int stone in stones) {
            HashSet<int> newDp = new HashSet<int>(dp);
            foreach (int val in dp) {
                if (val + stone == target) {
                    return stoneSum - 2 * target;
                }
                if (val + stone < target) {
                    newDp.Add(val + stone);
                }
            }
            dp = newDp;
        }

        int maxVal = 0;
        foreach (int val in dp) {
            maxVal = Math.Max(maxVal, val);
        }

        return stoneSum - 2 * maxVal;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(m)$

> Where $n$ is the number of stones and $m$ is the sum of the weights of the stones.

---

## 6. Dynamic Programming (Bitset)

::tabs-start

```python
class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        stoneSum = sum(stones)
        target = stoneSum // 2
        dp = 1

        for stone in stones:
            dp |= dp << stone

        for t in range(target, -1, -1):
            if dp & (1 << t):
                return stoneSum - 2 * t
```

```cpp
class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int stoneSum = accumulate(stones.begin(), stones.end(), 0);
        int target = stoneSum / 2;
        bitset<3001> dp;
        dp[0] = true;

        for (int stone : stones) {
            dp |= (dp << stone);
        }

        for (int t = target; t >= 0; --t) {
            if (dp[t]) {
                return stoneSum - 2 * t;
            }
        }
        return 0;
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(m)$

> Where $n$ is the number of stones and $m$ is the sum of the weights of the stones.
