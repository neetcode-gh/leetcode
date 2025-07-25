## 1. Brute Force (Backtracking)

::tabs-start

```python
class Solution:
    def maxScore(self, nums: List[int]) -> int:
        N = len(nums)
        visit = [False] * N

        def dfs(n):
            if n > (N // 2):
                return 0

            res = 0
            for i in range(N):
                if visit[i]:
                    continue
                visit[i] = True
                for j in range(i + 1, N):
                    if visit[j]:
                        continue
                    visit[j] = True
                    g = gcd(nums[i], nums[j])
                    res = max(res, n * g + dfs(n + 1))
                    visit[j] = False
                visit[i] = False

            return res

        return dfs(1)
```

```java
public class Solution {
    public int maxScore(int[] nums) {
        int N = nums.length;
        boolean[] visit = new boolean[N];
        return dfs(nums, visit, 1, N);
    }

    private int dfs(int[] nums, boolean[] visit, int n, int N) {
        if (n > N / 2) {
            return 0;
        }

        int res = 0;
        for (int i = 0; i < N; i++) {
            if (visit[i]) continue;
            visit[i] = true;
            for (int j = i + 1; j < N; j++) {
                if (visit[j]) continue;
                visit[j] = true;
                int g = gcd(nums[i], nums[j]);
                res = Math.max(res, n * g + dfs(nums, visit, n + 1, N));
                visit[j] = false;
            }
            visit[i] = false;
        }

        return res;
    }

    private int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}
```

```cpp
class Solution {
public:
    int maxScore(vector<int>& nums) {
        int N = nums.size();
        vector<bool> visit(N, false);
        return dfs(nums, visit, 1, N);
    }

private:
    int dfs(vector<int>& nums, vector<bool>& visit, int n, int N) {
        if (n > N / 2) {
            return 0;
        }

        int res = 0;
        for (int i = 0; i < N; i++) {
            if (visit[i]) continue;
            visit[i] = true;
            for (int j = i + 1; j < N; j++) {
                if (visit[j]) continue;
                visit[j] = true;
                int g = gcd(nums[i], nums[j]);
                res = max(res, n * g + dfs(nums, visit, n + 1, N));
                visit[j] = false;
            }
            visit[i] = false;
        }

        return res;
    }

    int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxScore(nums) {
        const N = nums.length;
        const visit = new Array(N).fill(false);

        const gcd = (a, b) => {
            return b === 0 ? a : gcd(b, a % b);
        };
        const dfs = (n) => {
            if (n > N / 2) {
                return 0;
            }

            let res = 0;
            for (let i = 0; i < N; i++) {
                if (visit[i]) continue;
                visit[i] = true;
                for (let j = i + 1; j < N; j++) {
                    if (visit[j]) continue;
                    visit[j] = true;
                    let g = gcd(nums[i], nums[j]);
                    res = Math.max(res, n * g + dfs(n + 1));
                    visit[j] = false;
                }
                visit[i] = false;
            }

            return res;
        };

        return dfs(1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ n * \log m)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum element in the array.

---

## 2. Bitmask DP (Top-Down) - I

::tabs-start

```python
class Solution:
    def maxScore(self, nums: List[int]) -> int:
        cache = collections.defaultdict(int)

        def dfs(mask, op):
            if mask in cache:
                return cache[mask]

            for i in range(len(nums)):
                for j in range(i + 1, len(nums)):
                    if (1 << i) & mask or (1 << j) & mask:
                        continue

                    newMask = mask | (1 << i) | (1 << j)
                    score = op * math.gcd(nums[i], nums[j])
                    cache[mask] = max(
                        cache[mask],
                        score + dfs(newMask, op + 1)
                    )

            return cache[mask]

        return dfs(0, 1)
```

```java
public class Solution {
    private Map<Integer, Integer> cache;

    public int maxScore(int[] nums) {
        cache = new HashMap<>();
        return dfs(0, 1, nums);
    }

    private int dfs(int mask, int op, int[] nums) {
        if (cache.containsKey(mask)) {
            return cache.get(mask);
        }

        int maxScore = 0;
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) != 0) continue;
            for (int j = i + 1; j < n; j++) {
                if ((mask & (1 << j)) != 0) continue;
                int newMask = mask | (1 << i) | (1 << j);
                int score = op * gcd(nums[i], nums[j]) + dfs(newMask, op + 1, nums);
                maxScore = Math.max(maxScore, score);
            }
        }

        cache.put(mask, maxScore);
        return maxScore;
    }

    private int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}
```

```cpp
class Solution {
public:
    int maxScore(vector<int>& nums) {
        return dfs(0, 1, nums);
    }

private:
    unordered_map<int, int> cache;

    int dfs(int mask, int op, vector<int>& nums) {
        if (cache.count(mask)) {
            return cache[mask];
        }

        int maxScore = 0;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) != 0) continue;
            for (int j = i + 1; j < n; j++) {
                if ((mask & (1 << j)) != 0) continue;
                int newMask = mask | (1 << i) | (1 << j);
                int score = op * gcd(nums[i], nums[j]) + dfs(newMask, op + 1, nums);
                maxScore = max(maxScore, score);
            }
        }

        return cache[mask] = maxScore;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxScore(nums) {
        const cache = new Map();

        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

        const dfs = (mask, op) => {
            if (cache.has(mask)) {
                return cache.get(mask);
            }

            let maxScore = 0;
            const n = nums.length;
            for (let i = 0; i < n; i++) {
                if ((mask & (1 << i)) !== 0) continue;
                for (let j = i + 1; j < n; j++) {
                    if ((mask & (1 << j)) !== 0) continue;
                    let newMask = mask | (1 << i) | (1 << j);
                    let score =
                        op * gcd(nums[i], nums[j]) + dfs(newMask, op + 1);
                    maxScore = Math.max(maxScore, score);
                }
            }

            cache.set(mask, maxScore);
            return maxScore;
        };

        return dfs(0, 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * 2 ^ n * \log m)$
- Space complexity: $O(2 ^ n)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum element in the array.

---

## 3. Bitmask DP (Top-Down) - II

::tabs-start

```python
class Solution:
    def maxScore(self, nums: List[int]) -> int:
        n = len(nums)
        GCD = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(i + 1, n):
                GCD[i][j] = gcd(nums[i], nums[j])

        dp = [-1] * (1 << n)
        def dfs(mask, op):
            if dp[mask] != -1:
                return dp[mask]

            max_score = 0
            for i in range(n):
                if mask & (1 << i):
                    continue
                for j in range(i + 1, n):
                    if mask & (1 << j):
                        continue
                    new_mask = mask | (1 << i) | (1 << j)
                    max_score = max(
                        max_score,
                        op * GCD[i][j] + dfs(new_mask, op + 1)
                    )

            dp[mask] = max_score
            return max_score

        return dfs(0, 1)
```

```java
public class Solution {
    private int[][] GCD;
    private int[] dp;

    public int maxScore(int[] nums) {
        int n = nums.length;
        GCD = new int[n][n];
        dp = new int[1 << n];
        Arrays.fill(dp, -1);

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                GCD[i][j] = gcd(nums[i], nums[j]);
            }
        }

        return (int) dfs(0, 1, nums);
    }

    private int dfs(int mask, int op, int[] nums) {
        if (dp[mask] != -1) return dp[mask];

        int maxScore = 0;
        for (int i = 0; i < nums.length; i++) {
            if ((mask & (1 << i)) != 0) continue;
            for (int j = i + 1; j < nums.length; j++) {
                if ((mask & (1 << j)) != 0) continue;
                int newMask = mask | (1 << i) | (1 << j);
                maxScore = Math.max(
                    maxScore,
                    op * GCD[i][j] + dfs(newMask, op + 1, nums)
                );
            }
        }
        return dp[mask] = maxScore;
    }

    private int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}
```

```cpp
class Solution {
public:
    int maxScore(vector<int>& nums) {
        int n = nums.size();
        GCD.assign(n, vector<int>(n, 0));
        dp.assign(1 << n, -1);

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                GCD[i][j] = gcd(nums[i], nums[j]);
            }
        }

        return dfs(0, 1, nums);
    }

private:
    vector<vector<int>> GCD;
    vector<int> dp;

    int dfs(int mask, int op, vector<int>& nums) {
        if (dp[mask] != -1) return dp[mask];

        int maxScore = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (mask & (1 << i)) continue;
            for (int j = i + 1; j < nums.size(); j++) {
                if (mask & (1 << j)) continue;
                int newMask = mask | (1 << i) | (1 << j);
                maxScore = max(
                    maxScore,
                    op * GCD[i][j] + dfs(newMask, op + 1, nums)
                );
            }
        }
        return dp[mask] = maxScore;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxScore(nums) {
        const n = nums.length;
        const GCD = Array.from({ length: n }, () => Array(n).fill(0));
        const dp = Array(1 << n).fill(-1);

        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                GCD[i][j] = gcd(nums[i], nums[j]);
            }
        }

        const dfs = (mask, op) => {
            if (dp[mask] !== -1) return dp[mask];

            let maxScore = 0;
            for (let i = 0; i < n; i++) {
                if (mask & (1 << i)) continue;
                for (let j = i + 1; j < n; j++) {
                    if (mask & (1 << j)) continue;
                    const newMask = mask | (1 << i) | (1 << j);
                    maxScore = Math.max(
                        maxScore,
                        op * GCD[i][j] + dfs(newMask, op + 1),
                    );
                }
            }
            return (dp[mask] = maxScore);
        };

        return dfs(0, 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * (2 ^ n + \log m))$
- Space complexity: $O(n ^ 2 + 2 ^ n)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum element in the array.

---

## 4. Bitmask DP (Bottom-Up)

::tabs-start

```python
class Solution:
    def maxScore(self, nums: List[int]) -> int:
        n = len(nums)
        N = 1 << n
        GCD = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(i + 1, n):
                GCD[i][j] = gcd(nums[i], nums[j])

        dp = [0] * N
        for mask in range(N - 1, -1, -1):
            bits = bin(mask).count('1')
            if bits % 2 == 1:
                continue
            op = bits // 2 + 1

            for i in range(n):
                if mask & (1 << i):
                    continue
                for j in range(i + 1, n):
                    if mask & (1 << j):
                        continue
                    new_mask = mask | (1 << i) | (1 << j)
                    dp[mask] = max(dp[mask], op * GCD[i][j] + dp[new_mask])

        return dp[0]
```

```java
public class Solution {
    public int maxScore(int[] nums) {
        int n = nums.length;
        int N = 1 << n;
        int[][] GCD = new int[n][n];

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                GCD[i][j] = gcd(nums[i], nums[j]);
            }
        }

        int[] dp = new int[N];
        for (int mask = N - 1; mask >= 0; mask--) {
            int bits = Integer.bitCount(mask);
            if (bits % 2 == 1) continue;
            int op = bits / 2 + 1;

            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) continue;
                for (int j = i + 1; j < n; j++) {
                    if ((mask & (1 << j)) != 0) continue;
                    int newMask = mask | (1 << i) | (1 << j);
                    dp[mask] = Math.max(dp[mask], op * GCD[i][j] + dp[newMask]);
                }
            }
        }
        return dp[0];
    }

    private int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}
```

```cpp
class Solution {
public:
    int maxScore(vector<int>& nums) {
        int n = nums.size();
        int N = 1 << n;
        vector<vector<int>> GCD(n, vector<int>(n, 0));

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                GCD[i][j] = __gcd(nums[i], nums[j]);
            }
        }

        vector<int> dp(N, 0);
        for (int mask = N - 1; mask >= 0; mask--) {
            int bits = __builtin_popcount(mask);
            if (bits % 2 == 1) continue;
            int op = bits / 2 + 1;

            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) continue;
                for (int j = i + 1; j < n; j++) {
                    if (mask & (1 << j)) continue;
                    int newMask = mask | (1 << i) | (1 << j);
                    dp[mask] = max(dp[mask], op * GCD[i][j] + dp[newMask]);
                }
            }
        }
        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxScore(nums) {
        const n = nums.length;
        const N = 1 << n;
        const GCD = Array.from({ length: n }, () => Array(n).fill(0));

        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                GCD[i][j] = gcd(nums[i], nums[j]);
            }
        }

        const dp = Array(N).fill(0);
        for (let mask = N - 1; mask >= 0; mask--) {
            let bits = mask.toString(2).split('0').join('').length;
            if (bits % 2 === 1) continue;
            let op = bits / 2 + 1;

            for (let i = 0; i < n; i++) {
                if ((mask & (1 << i)) !== 0) continue;
                for (let j = i + 1; j < n; j++) {
                    if ((mask & (1 << j)) !== 0) continue;
                    let newMask = mask | (1 << i) | (1 << j);
                    dp[mask] = Math.max(dp[mask], op * GCD[i][j] + dp[newMask]);
                }
            }
        }
        return dp[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * (2 ^ n + \log m))$
- Space complexity: $O(n ^ 2 + 2 ^ n)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum element in the array.
