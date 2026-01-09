## 1. Dynamic Programming (Top-Down)

### Intuition

We need to count valid playlists of exactly `goal` songs using exactly `n` different songs, where a song can only repeat after `k` other songs have played. At each position in the playlist, we have two choices: add a new song we have not used yet, or replay an old song (if enough songs have been played since its last appearance). The number of ways to add a new song depends on how many songs we have already used, and the number of ways to replay an old song depends on how many songs are eligible for replay.

### Algorithm

1. Define a recursive function `count(cur_goal, old_songs)` where `cur_goal` is the remaining playlist slots and `old_songs` is the number of distinct songs used so far.
2. Base cases:
   - If `cur_goal == 0` and `old_songs == n`, we have a valid playlist, return `1`.
   - If `cur_goal == 0` or `old_songs > n`, this path is invalid, return `0`.
3. Recursive transitions:
   - Add a new song: there are `(n - old_songs)` new songs available, and this leads to `count(cur_goal - 1, old_songs + 1)`.
   - Replay an old song: if `old_songs > k`, there are `(old_songs - k)` songs eligible for replay, leading to `count(cur_goal - 1, old_songs)`.
4. Memoize results to avoid recomputation.
5. Return `count(goal, 0)` as the final answer, modulo `10^9 + 7`.

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

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;
    private int[,] dp;

    public int NumMusicPlaylists(int n, int goal, int k) {
        dp = new int[goal + 1, n + 1];
        for (int i = 0; i <= goal; i++) {
            for (int j = 0; j <= n; j++) {
                dp[i, j] = -1;
            }
        }
        return Count(goal, 0, n, k);
    }

    private int Count(int curGoal, int oldSongs, int n, int k) {
        if (curGoal == 0 && oldSongs == n) return 1;
        if (curGoal == 0 || oldSongs > n) return 0;
        if (dp[curGoal, oldSongs] != -1) return dp[curGoal, oldSongs];

        long res = (long)(n - oldSongs) * Count(curGoal - 1, oldSongs + 1, n, k) % MOD;
        if (oldSongs > k) {
            res = (res + (long)(oldSongs - k) * Count(curGoal - 1, oldSongs, n, k)) % MOD;
        }
        dp[curGoal, oldSongs] = (int)res;
        return dp[curGoal, oldSongs];
    }
}
```

```go
func numMusicPlaylists(n int, goal int, k int) int {
    const MOD = 1_000_000_007
    dp := make([][]int, goal+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var count func(curGoal, oldSongs int) int
    count = func(curGoal, oldSongs int) int {
        if curGoal == 0 && oldSongs == n {
            return 1
        }
        if curGoal == 0 || oldSongs > n {
            return 0
        }
        if dp[curGoal][oldSongs] != -1 {
            return dp[curGoal][oldSongs]
        }

        res := (n - oldSongs) * count(curGoal-1, oldSongs+1) % MOD
        if oldSongs > k {
            res = (res + (oldSongs-k)*count(curGoal-1, oldSongs)) % MOD
        }
        dp[curGoal][oldSongs] = res
        return res
    }

    return count(goal, 0)
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007
    private lateinit var dp: Array<IntArray>

    fun numMusicPlaylists(n: Int, goal: Int, k: Int): Int {
        dp = Array(goal + 1) { IntArray(n + 1) { -1 } }
        return count(goal, 0, n, k)
    }

    private fun count(curGoal: Int, oldSongs: Int, n: Int, k: Int): Int {
        if (curGoal == 0 && oldSongs == n) return 1
        if (curGoal == 0 || oldSongs > n) return 0
        if (dp[curGoal][oldSongs] != -1) return dp[curGoal][oldSongs]

        var res = ((n - oldSongs).toLong() * count(curGoal - 1, oldSongs + 1, n, k)) % MOD
        if (oldSongs > k) {
            res = (res + (oldSongs - k).toLong() * count(curGoal - 1, oldSongs, n, k)) % MOD
        }
        dp[curGoal][oldSongs] = res.toInt()
        return dp[curGoal][oldSongs]
    }
}
```

```swift
class Solution {
    private let MOD = 1_000_000_007
    private var dp: [[Int]] = []

    func numMusicPlaylists(_ n: Int, _ goal: Int, _ k: Int) -> Int {
        dp = Array(repeating: Array(repeating: -1, count: n + 1), count: goal + 1)
        return count(goal, 0, n, k)
    }

    private func count(_ curGoal: Int, _ oldSongs: Int, _ n: Int, _ k: Int) -> Int {
        if curGoal == 0 && oldSongs == n { return 1 }
        if curGoal == 0 || oldSongs > n { return 0 }
        if dp[curGoal][oldSongs] != -1 { return dp[curGoal][oldSongs] }

        var res = (n - oldSongs) * count(curGoal - 1, oldSongs + 1, n, k) % MOD
        if oldSongs > k {
            res = (res + (oldSongs - k) * count(curGoal - 1, oldSongs, n, k)) % MOD
        }
        dp[curGoal][oldSongs] = res
        return res
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

### Intuition

The top-down solution can be converted to a bottom-up approach by iterating through all possible states. We build a 2D table where `dp[i][j]` represents the number of ways to create a playlist of length `i` using exactly `j` distinct songs. We fill this table row by row, starting from the base case and building up to our target state.

### Algorithm

1. Create a 2D array `dp[goal+1][n+1]` initialized to `0`, with `dp[0][0] = 1` as the base case (empty playlist with no songs used).
2. For each playlist length `cur_goal` from `1` to `goal`:
   - For each count of distinct songs `old_songs` from `1` to `n`:
     - Add a new song: multiply `dp[cur_goal - 1][old_songs - 1]` by `(n - old_songs + 1)`.
     - Replay an old song (if `old_songs > k`): add `dp[cur_goal - 1][old_songs] * (old_songs - k)`.
     - Store the sum in `dp[cur_goal][old_songs]`, taking modulo `10^9 + 7`.
3. Return `dp[goal][n]`.

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

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    public int NumMusicPlaylists(int n, int goal, int k) {
        int[,] dp = new int[goal + 1, n + 1];
        dp[0, 0] = 1;

        for (int curGoal = 1; curGoal <= goal; curGoal++) {
            for (int oldSongs = 1; oldSongs <= n; oldSongs++) {
                int res = (int)(((long)dp[curGoal - 1, oldSongs - 1] * (n - oldSongs + 1)) % MOD);
                if (oldSongs > k) {
                    res = (res + (int)(((long)dp[curGoal - 1, oldSongs] * (oldSongs - k)) % MOD)) % MOD;
                }
                dp[curGoal, oldSongs] = res;
            }
        }

        return dp[goal, n];
    }
}
```

```go
func numMusicPlaylists(n int, goal int, k int) int {
    const MOD = 1_000_000_007
    dp := make([][]int, goal+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }
    dp[0][0] = 1

    for curGoal := 1; curGoal <= goal; curGoal++ {
        for oldSongs := 1; oldSongs <= n; oldSongs++ {
            res := dp[curGoal-1][oldSongs-1] * (n - oldSongs + 1) % MOD
            if oldSongs > k {
                res = (res + dp[curGoal-1][oldSongs]*(oldSongs-k)) % MOD
            }
            dp[curGoal][oldSongs] = res
        }
    }

    return dp[goal][n]
}
```

```kotlin
class Solution {
    fun numMusicPlaylists(n: Int, goal: Int, k: Int): Int {
        val MOD = 1_000_000_007
        val dp = Array(goal + 1) { IntArray(n + 1) }
        dp[0][0] = 1

        for (curGoal in 1..goal) {
            for (oldSongs in 1..n) {
                var res = ((dp[curGoal - 1][oldSongs - 1].toLong() * (n - oldSongs + 1)) % MOD).toInt()
                if (oldSongs > k) {
                    res = ((res + (dp[curGoal - 1][oldSongs].toLong() * (oldSongs - k)) % MOD) % MOD).toInt()
                }
                dp[curGoal][oldSongs] = res
            }
        }

        return dp[goal][n]
    }
}
```

```swift
class Solution {
    func numMusicPlaylists(_ n: Int, _ goal: Int, _ k: Int) -> Int {
        let MOD = 1_000_000_007
        var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: goal + 1)
        dp[0][0] = 1

        for curGoal in 1...goal {
            for oldSongs in 1...n {
                var res = dp[curGoal - 1][oldSongs - 1] * (n - oldSongs + 1) % MOD
                if oldSongs > k {
                    res = (res + dp[curGoal - 1][oldSongs] * (oldSongs - k)) % MOD
                }
                dp[curGoal][oldSongs] = res
            }
        }

        return dp[goal][n]
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

### Intuition

Looking at the bottom-up recurrence, each row only depends on the previous row. This means we do not need to store the entire 2D table. Instead, we can use a single 1D array and update it in place, being careful to preserve the previous row's values where needed. This reduces space from `O(goal * n)` to `O(n)`.

### Algorithm

1. Create a 1D array `dp[n+1]` initialized to `0`.
2. For each playlist length `cur_goal` from `1` to `goal`:
   - Track `prev` to store the value from the previous row that we need before overwriting.
   - Initialize `prev = 1` when `cur_goal == 1` (base case for adding the first song), otherwise `prev = 0`.
   - For each count of distinct songs `old_songs` from `1` to `n`:
     - Compute the new value using `prev` (for adding a new song) and `dp[old_songs]` (for replaying an old song).
     - Update `prev` to the old value of `dp[old_songs]` before overwriting.
     - Store the result in `dp[old_songs]`.
3. Return `dp[n]`.

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

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    public int NumMusicPlaylists(int n, int goal, int k) {
        int[] dp = new int[n + 1];

        for (int curGoal = 1; curGoal <= goal; curGoal++) {
            int prev = curGoal == 1 ? 1 : 0;
            for (int oldSongs = 1; oldSongs <= n; oldSongs++) {
                int res = (int)(((long)prev * (n - oldSongs + 1)) % MOD);
                if (oldSongs > k) {
                    res = (res + (int)(((long)dp[oldSongs] * (oldSongs - k)) % MOD)) % MOD;
                }
                prev = dp[oldSongs];
                dp[oldSongs] = res;
            }
        }

        return dp[n];
    }
}
```

```go
func numMusicPlaylists(n int, goal int, k int) int {
    const MOD = 1_000_000_007
    dp := make([]int, n+1)

    for curGoal := 1; curGoal <= goal; curGoal++ {
        prev := 0
        if curGoal == 1 {
            prev = 1
        }
        for oldSongs := 1; oldSongs <= n; oldSongs++ {
            res := prev * (n - oldSongs + 1) % MOD
            if oldSongs > k {
                res = (res + dp[oldSongs]*(oldSongs-k)) % MOD
            }
            prev = dp[oldSongs]
            dp[oldSongs] = res
        }
    }

    return dp[n]
}
```

```kotlin
class Solution {
    fun numMusicPlaylists(n: Int, goal: Int, k: Int): Int {
        val MOD = 1_000_000_007
        val dp = IntArray(n + 1)

        for (curGoal in 1..goal) {
            var prev = if (curGoal == 1) 1 else 0
            for (oldSongs in 1..n) {
                var res = ((prev.toLong() * (n - oldSongs + 1)) % MOD).toInt()
                if (oldSongs > k) {
                    res = ((res + (dp[oldSongs].toLong() * (oldSongs - k)) % MOD) % MOD).toInt()
                }
                prev = dp[oldSongs]
                dp[oldSongs] = res
            }
        }

        return dp[n]
    }
}
```

```swift
class Solution {
    func numMusicPlaylists(_ n: Int, _ goal: Int, _ k: Int) -> Int {
        let MOD = 1_000_000_007
        var dp = Array(repeating: 0, count: n + 1)

        for curGoal in 1...goal {
            var prev = curGoal == 1 ? 1 : 0
            for oldSongs in 1...n {
                var res = prev * (n - oldSongs + 1) % MOD
                if oldSongs > k {
                    res = (res + dp[oldSongs] * (oldSongs - k)) % MOD
                }
                prev = dp[oldSongs]
                dp[oldSongs] = res
            }
        }

        return dp[n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(g * n)$
- Space complexity: $O(n)$

> Where $g$ is the number of songs to listen and $n$ is the number of different songs.
