## 1. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def numMusicPlaylists(self, n: int, goal: int, k: int) -> int:
        mod = 10**9 + 7
        dp = {}

        def count(cur_goal, old_songs):
            if cur_goal == 0 and old_songs == n:
                return 1
            if cur_goal == 0 or old_songs > n:
                return 0
            if (cur_goal, old_songs) in dp:
                return dp[(cur_goal, old_songs)]

            res = (n - old_songs) * count(cur_goal - 1, old_songs + 1)
            if old_songs > k:
                res += (old_songs - k) * count(cur_goal - 1, old_songs)
            dp[(cur_goal, old_songs)] = res % mod
            return dp[(cur_goal, old_songs)]

        return count(goal, 0)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;
    private int[][] dp;

    public int numMusicPlaylists(int n, int goal, int k) {
        dp = new int[goal + 1][n + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }
        return count(goal, 0, n, k);
    }

    private int count(int curGoal, int oldSongs, int n, int k) {
        if (curGoal == 0 && oldSongs == n) return 1;
        if (curGoal == 0 || oldSongs > n) return 0;
        if (dp[curGoal][oldSongs] != -1) return dp[curGoal][oldSongs];

        long res = (long) (n - oldSongs) * count(curGoal - 1, oldSongs + 1, n, k) % MOD;
        if (oldSongs > k) {
            res = (res + (long) (oldSongs - k) * count(curGoal - 1, oldSongs, n, k)) % MOD;
        }
        dp[curGoal][oldSongs] = (int) res;
        return dp[curGoal][oldSongs];
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;
    vector<vector<int>> dp;

    int count(int curGoal, int oldSongs, int n, int k) {
        if (curGoal == 0 && oldSongs == n) return 1;
        if (curGoal == 0 || oldSongs > n) return 0;
        if (dp[curGoal][oldSongs] != -1) return dp[curGoal][oldSongs];

        long long res = (long long)(n - oldSongs) * count(curGoal - 1, oldSongs + 1, n, k) % MOD;
        if (oldSongs > k) {
            res = (res + (long long)(oldSongs - k) * count(curGoal - 1, oldSongs, n, k)) % MOD;
        }
        dp[curGoal][oldSongs] = res;
        return dp[curGoal][oldSongs];
    }

public:
    int numMusicPlaylists(int n, int goal, int k) {
        dp.assign(goal + 1, vector<int>(n + 1, -1));
        return count(goal, 0, n, k);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} goal
     * @param {number} k
     * @return {number}
     */
    numMusicPlaylists(n, goal, k) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: goal + 1 }, () =>
            Array(n + 1).fill(-1),
        );

        const count = (curGoal, oldSongs) => {
            if (curGoal === 0 && oldSongs === n) return 1;
            if (curGoal === 0 || oldSongs > n) return 0;
            if (dp[curGoal][oldSongs] !== -1) return dp[curGoal][oldSongs];

            let res = ((n - oldSongs) * count(curGoal - 1, oldSongs + 1)) % MOD;
            if (oldSongs > k) {
                res =
                    (res +
                        (((oldSongs - k) * count(curGoal - 1, oldSongs)) %
                            MOD)) %
                    MOD;
            }
            dp[curGoal][oldSongs] = res;
            return res;
        };

        return count(goal, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(g * n)$
- Space complexity: $O(g * n)$

> Where $g$ is the number of songs to listen and $n$ is the number of different songs.

---

## 2. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def numMusicPlaylists(self, n: int, goal: int, k: int) -> int:
        mod = 10**9 + 7
        dp = [[0] * (n + 1) for _ in range(goal + 1)]
        dp[0][0] = 1

        for cur_goal in range(1, goal + 1):
            for old_songs in range(1, n + 1):
                res = (dp[cur_goal - 1][old_songs - 1] * (n - old_songs + 1)) % mod
                if old_songs > k:
                    res = (res + dp[cur_goal - 1][old_songs] * (old_songs - k)) % mod
                dp[cur_goal][old_songs] = res

        return dp[goal][n]
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int numMusicPlaylists(int n, int goal, int k) {
        int[][] dp = new int[goal + 1][n + 1];
        dp[0][0] = 1;

        for (int curGoal = 1; curGoal <= goal; curGoal++) {
            for (int oldSongs = 1; oldSongs <= n; oldSongs++) {
                int res  = (int) (((long) dp[curGoal - 1][oldSongs - 1] * (n - oldSongs + 1)) % MOD);
                if (oldSongs > k) {
                    res = (res + (int) (((long) dp[curGoal - 1][oldSongs] * (oldSongs - k)) % MOD)) % MOD;
                }
                dp[curGoal][oldSongs] = res;
            }
        }

        return dp[goal][n];
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;

public:
    int numMusicPlaylists(int n, int goal, int k) {
        vector<vector<int>> dp(goal + 1, vector<int>(n + 1, 0));
        dp[0][0] = 1;

        for (int curGoal = 1; curGoal <= goal; curGoal++) {
            for (int oldSongs = 1; oldSongs <= n; oldSongs++) {
                int res = (long long) dp[curGoal - 1][oldSongs - 1] * (n - oldSongs + 1) % MOD;
                if (oldSongs > k) {
                    res = (res + (long long) dp[curGoal - 1][oldSongs] * (oldSongs - k) % MOD) % MOD;
                }
                dp[curGoal][oldSongs] = res;
            }
        }

        return dp[goal][n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} goal
     * @param {number} k
     * @return {number}
     */
    numMusicPlaylists(n, goal, k) {
        const MOD = 1e9 + 7;
        const dp = Array.from({ length: goal + 1 }, () => Array(n + 1).fill(0));
        dp[0][0] = 1;

        for (let curGoal = 1; curGoal <= goal; curGoal++) {
            for (let oldSongs = 1; oldSongs <= n; oldSongs++) {
                let res =
                    (dp[curGoal - 1][oldSongs - 1] * (n - oldSongs + 1)) % MOD;
                if (oldSongs > k) {
                    res =
                        (res + dp[curGoal - 1][oldSongs] * (oldSongs - k)) %
                        MOD;
                }
                dp[curGoal][oldSongs] = res;
            }
        }

        return dp[goal][n];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(g * n)$
- Space complexity: $O(g * n)$

> Where $g$ is the number of songs to listen and $n$ is the number of different songs.

---

## 3. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def numMusicPlaylists(self, n: int, goal: int, k: int) -> int:
        mod = 10**9 + 7
        dp = [0] * (n + 1)

        for cur_goal in range(1, goal + 1):
            prev = 1 if cur_goal == 1 else 0
            for old_songs in range(1, n + 1):
                res = (prev * (n - old_songs + 1)) % mod
                if old_songs > k:
                    res = (res + dp[old_songs] * (old_songs - k)) % mod
                prev = dp[old_songs]
                dp[old_songs] = res

        return dp[n]
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int numMusicPlaylists(int n, int goal, int k) {
        int[] dp = new int[n + 1];

        for (int curGoal = 1; curGoal <= goal; curGoal++) {
            int prev = curGoal == 1 ? 1 : 0;
            for (int oldSongs = 1; oldSongs <= n; oldSongs++) {
                int res  = (int) (((long) prev * (n - oldSongs + 1)) % MOD);
                if (oldSongs > k) {
                    res = (res + (int) (((long) dp[oldSongs] * (oldSongs - k)) % MOD)) % MOD;
                }
                prev = dp[oldSongs];
                dp[oldSongs] = res;
            }
        }

        return dp[n];
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;

public:
    int numMusicPlaylists(int n, int goal, int k) {
        vector<int> dp(n + 1);

        for (int curGoal = 1; curGoal <= goal; curGoal++) {
            int prev = curGoal == 1 ? 1: 0;
            for (int oldSongs = 1; oldSongs <= n; oldSongs++) {
                int res = (long long) prev * (n - oldSongs + 1) % MOD;
                if (oldSongs > k) {
                    res = (res + (long long) dp[oldSongs] * (oldSongs - k) % MOD) % MOD;
                }
                prev = dp[oldSongs];
                dp[oldSongs] = res;
            }
        }

        return dp[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} goal
     * @param {number} k
     * @return {number}
     */
    numMusicPlaylists(n, goal, k) {
        const MOD = 1e9 + 7;
        const dp = new Array(n + 1).fill(0);

        for (let curGoal = 1; curGoal <= goal; curGoal++) {
            let prev = curGoal === 1 ? 1 : 0;
            for (let oldSongs = 1; oldSongs <= n; oldSongs++) {
                let res = (prev * (n - oldSongs + 1)) % MOD;
                if (oldSongs > k) {
                    res = (res + dp[oldSongs] * (oldSongs - k)) % MOD;
                }
                prev = dp[oldSongs];
                dp[oldSongs] = res;
            }
        }

        return dp[n];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(g * n)$
- Space complexity: $O(n)$

> Where $g$ is the number of songs to listen and $n$ is the number of different songs.
