## 1. Recursion

### Intuition

Imagine a circular dial with letters. To spell a word, we rotate the dial to align each required letter with the top position, then press a button. The challenge is finding the minimum total rotations.

For each character in the key, we might have multiple positions on the ring that match. From our current position, we can rotate clockwise or counterclockwise to reach any matching position. We try all possibilities recursively and take the minimum.

Since the ring is circular, the distance between two positions is the minimum of going directly or wrapping around.

### Algorithm

1. Define a recursive function `dfs(r, k)` where `r` is the current ring position and `k` is the current index in the key.
2. Base case: if `k` equals the key length, return `0`.
3. For each position `i` in the ring where `ring[i]` matches `key[k]`:
   - Calculate the minimum rotation distance (direct or wrap-around).
   - Recursively solve for the rest of the key starting from position `i`.
   - Track the minimum total cost.
4. Add `1` for the button press at each step.
5. Return the minimum total from `dfs(0, 0)`.

::tabs-start

```python
class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        def dfs(r, k):
            if k == len(key):
                return 0

            res = float("inf")
            for i, c in enumerate(ring):
                if c == key[k]:
                    min_dist = min(abs(r - i), len(ring) - abs(r - i))
                    res = min(res, min_dist + 1 + dfs(i, k + 1))
            return res

        return dfs(0, 0)
```

```java
public class Solution {
    public int findRotateSteps(String ring, String key) {
        return dfs(0, 0, ring, key);
    }

    private int dfs(int r, int k, String ring, String key) {
        if (k == key.length()) return 0;

        int res = Integer.MAX_VALUE;
        for (int i = 0; i < ring.length(); i++) {
            if (ring.charAt(i) == key.charAt(k)) {
                int minDist = Math.min(Math.abs(r - i), ring.length() - Math.abs(r - i));
                res = Math.min(res, minDist + 1 + dfs(i, k + 1, ring, key));
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findRotateSteps(string ring, string key) {
        return dfs(0, 0, ring, key);
    }

private:
    int dfs(int r, int k, const string& ring, const string& key) {
        if (k == key.size()) return 0;

        int res = INT_MAX;
        for (int i = 0; i < ring.size(); i++) {
            if (ring[i] == key[k]) {
                int minDist = min(abs(r - i), int(ring.size()) - abs(r - i));
                res = min(res, minDist + 1 + dfs(i, k + 1, ring, key));
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} ring
     * @param {string} key
     * @return {number}
     */
    findRotateSteps(ring, key) {
        const dfs = (r, k) => {
            if (k === key.length) return 0;

            let res = Infinity;
            for (let i = 0; i < ring.length; i++) {
                if (ring[i] === key[k]) {
                    const minDist = Math.min(
                        Math.abs(r - i),
                        ring.length - Math.abs(r - i),
                    );
                    res = Math.min(res, minDist + 1 + dfs(i, k + 1));
                }
            }
            return res;
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public int FindRotateSteps(string ring, string key) {
        return Dfs(0, 0, ring, key);
    }

    private int Dfs(int r, int k, string ring, string key) {
        if (k == key.Length) return 0;

        int res = int.MaxValue;
        for (int i = 0; i < ring.Length; i++) {
            if (ring[i] == key[k]) {
                int minDist = Math.Min(Math.Abs(r - i), ring.Length - Math.Abs(r - i));
                res = Math.Min(res, minDist + 1 + Dfs(i, k + 1, ring, key));
            }
        }
        return res;
    }
}
```

```go
func findRotateSteps(ring string, key string) int {
    var dfs func(r, k int) int
    dfs = func(r, k int) int {
        if k == len(key) {
            return 0
        }

        res := 1 << 30
        for i := 0; i < len(ring); i++ {
            if ring[i] == key[k] {
                minDist := min(abs(r-i), len(ring)-abs(r-i))
                res = min(res, minDist+1+dfs(i, k+1))
            }
        }
        return res
    }

    return dfs(0, 0)
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun findRotateSteps(ring: String, key: String): Int {
        fun dfs(r: Int, k: Int): Int {
            if (k == key.length) return 0

            var res = Int.MAX_VALUE
            for (i in ring.indices) {
                if (ring[i] == key[k]) {
                    val minDist = minOf(kotlin.math.abs(r - i), ring.length - kotlin.math.abs(r - i))
                    res = minOf(res, minDist + 1 + dfs(i, k + 1))
                }
            }
            return res
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func findRotateSteps(_ ring: String, _ key: String) -> Int {
        let ringArr = Array(ring)
        let keyArr = Array(key)

        func dfs(_ r: Int, _ k: Int) -> Int {
            if k == keyArr.count { return 0 }

            var res = Int.max
            for i in 0..<ringArr.count {
                if ringArr[i] == keyArr[k] {
                    let minDist = min(abs(r - i), ringArr.count - abs(r - i))
                    res = min(res, minDist + 1 + dfs(i, k + 1))
                }
            }
            return res
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ m)$
- Space complexity: $O(m)$ for recursion stack.

> Where $n$ is the length of the $ring$ and $m$ is the length of the $key$.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The plain recursion has overlapping subproblems. From the same ring position trying to match the same key index, we always get the same answer. Adding memoization avoids recomputing these states.

The state is defined by two parameters: current ring position and current key index. There are at most `n * m` unique states, where `n` is the `ring` length and `m` is the `key` length.

### Algorithm

1. Create a memoization table `dp[r][k]` initialized to `-1`.
2. Define `dfs(r, k)` that returns the minimum steps from ring position `r` to spell `key[k:]`.
3. If `k` equals key length, return `0`.
4. If `dp[r][k]` is already computed, return it.
5. For each ring position `i` matching `key[k]`:
   - Compute distance as `min(|r - i|, n - |r - i|)`.
   - Update the result with `distance + 1 + dfs(i, k + 1)`.
6. Store and return `dp[r][k]`.
7. Call `dfs(0, 0)` for the final answer.

::tabs-start

```python
class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        n = len(ring)
        m = len(key)
        dp = {}

        def dfs(r, k):
            if k == m:
                return 0
            if (r, k) in dp:
                return dp[(r, k)]

            res = float("inf")
            for i, c in enumerate(ring):
                if c == key[k]:
                    min_dist = min(abs(r - i), n - abs(r - i))
                    res = min(res, min_dist + 1 + dfs(i, k + 1))
            dp[(r, k)] = res
            return res

        return dfs(0, 0)
```

```java
public class Solution {
    private int[][] dp;

    public int findRotateSteps(String ring, String key) {
        int n = ring.length();
        int m = key.length();
        dp = new int[n][m];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }
        return dfs(0, 0, ring, key);
    }

    private int dfs(int r, int k, String ring, String key) {
        if (k == key.length()) return 0;
        if (dp[r][k] != -1) return dp[r][k];

        int res = Integer.MAX_VALUE;
        for (int i = 0; i < ring.length(); i++) {
            if (ring.charAt(i) == key.charAt(k)) {
                int minDist = Math.min(Math.abs(r - i), ring.length() - Math.abs(r - i));
                res = Math.min(res, minDist + 1 + dfs(i, k + 1, ring, key));
            }
        }

        dp[r][k] = res;
        return res;
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;

public:
    int findRotateSteps(string ring, string key) {
        int n = ring.size();
        int m = key.size();
        dp.assign(n, vector<int>(m, -1));
        return dfs(0, 0, ring, key);
    }

private:
    int dfs(int r, int k, string& ring, string& key) {
        if (k == key.size()) return 0;
        if (dp[r][k] != -1) return dp[r][k];

        int res = INT_MAX;
        for (int i = 0; i < ring.size(); i++) {
            if (ring[i] == key[k]) {
                int minDist = min(abs(r - i), int(ring.size()) - abs(r - i));
                res = min(res, minDist + 1 + dfs(i, k + 1, ring, key));
            }
        }

        dp[r][k] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} ring
     * @param {string} key
     * @return {number}
     */
    findRotateSteps(ring, key) {
        const n = ring.length;
        const m = key.length;
        const dp = Array.from({ length: n }, () => Array(m).fill(-1));

        const dfs = (r, k) => {
            if (k === key.length) return 0;
            if (dp[r][k] !== -1) return dp[r][k];

            let res = Infinity;
            for (let i = 0; i < ring.length; i++) {
                if (ring[i] === key[k]) {
                    const minDist = Math.min(
                        Math.abs(r - i),
                        ring.length - Math.abs(r - i),
                    );
                    res = Math.min(res, minDist + 1 + dfs(i, k + 1));
                }
            }

            dp[r][k] = res;
            return res;
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private int[,] dp;

    public int FindRotateSteps(string ring, string key) {
        int n = ring.Length;
        int m = key.Length;
        dp = new int[n, m];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                dp[i, j] = -1;
            }
        }
        return Dfs(0, 0, ring, key);
    }

    private int Dfs(int r, int k, string ring, string key) {
        if (k == key.Length) return 0;
        if (dp[r, k] != -1) return dp[r, k];

        int res = int.MaxValue;
        for (int i = 0; i < ring.Length; i++) {
            if (ring[i] == key[k]) {
                int minDist = Math.Min(Math.Abs(r - i), ring.Length - Math.Abs(r - i));
                res = Math.Min(res, minDist + 1 + Dfs(i, k + 1, ring, key));
            }
        }

        dp[r, k] = res;
        return res;
    }
}
```

```go
func findRotateSteps(ring string, key string) int {
    n, m := len(ring), len(key)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, m)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(r, k int) int
    dfs = func(r, k int) int {
        if k == m {
            return 0
        }
        if dp[r][k] != -1 {
            return dp[r][k]
        }

        res := 1 << 30
        for i := 0; i < n; i++ {
            if ring[i] == key[k] {
                minDist := min(abs(r-i), n-abs(r-i))
                res = min(res, minDist+1+dfs(i, k+1))
            }
        }

        dp[r][k] = res
        return res
    }

    return dfs(0, 0)
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    private lateinit var dp: Array<IntArray>

    fun findRotateSteps(ring: String, key: String): Int {
        val n = ring.length
        val m = key.length
        dp = Array(n) { IntArray(m) { -1 } }
        return dfs(0, 0, ring, key)
    }

    private fun dfs(r: Int, k: Int, ring: String, key: String): Int {
        if (k == key.length) return 0
        if (dp[r][k] != -1) return dp[r][k]

        var res = Int.MAX_VALUE
        for (i in ring.indices) {
            if (ring[i] == key[k]) {
                val minDist = minOf(kotlin.math.abs(r - i), ring.length - kotlin.math.abs(r - i))
                res = minOf(res, minDist + 1 + dfs(i, k + 1, ring, key))
            }
        }

        dp[r][k] = res
        return res
    }
}
```

```swift
class Solution {
    func findRotateSteps(_ ring: String, _ key: String) -> Int {
        let ringArr = Array(ring)
        let keyArr = Array(key)
        let n = ringArr.count
        let m = keyArr.count
        var dp = [[Int]](repeating: [Int](repeating: -1, count: m), count: n)

        func dfs(_ r: Int, _ k: Int) -> Int {
            if k == m { return 0 }
            if dp[r][k] != -1 { return dp[r][k] }

            var res = Int.max
            for i in 0..<n {
                if ringArr[i] == keyArr[k] {
                    let minDist = min(abs(r - i), n - abs(r - i))
                    res = min(res, minDist + 1 + dfs(i, k + 1))
                }
            }

            dp[r][k] = res
            return res
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the length of the $ring$ and $m$ is the length of the $key$.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We can convert the top-down solution to bottom-up by filling the DP table iteratively. Process the key from the last character back to the first. For each key character, compute the minimum cost to reach it from every possible ring position.

The value `dp[k][r]` represents the minimum steps to spell `key[k:]` starting from ring position `r`. We build this by using already-computed values for `key[k + 1:]`.

### Algorithm

1. Create a 2D DP table of size `(m + 1) x n` initialized to infinity.
2. Set `dp[m][i] = 0` for all `i` (base case: no more characters to spell).
3. Iterate `k` from `m - 1` down to `0`.
4. For each ring position `r`, find all positions `i` where `ring[i] == key[k]`.
5. For each matching position, compute:
   - `distance = min(|r - i|, n - |r - i|)`
   - `dp[k][r] = min(dp[k][r], distance + 1 + dp[k + 1][i])`
6. Return `dp[0][0]`.

::tabs-start

```python
class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        n = len(ring)
        m = len(key)
        dp = [[float("inf")] * n for _ in range(m + 1)]

        for i in range(n):
            dp[m][i] = 0

        for k in range(m - 1, -1, -1):
            for r in range(n):
                for i in range(n):
                    if ring[i] == key[k]:
                        min_dist = min(abs(r - i), n - abs(r - i))
                        dp[k][r] = min(dp[k][r], min_dist + 1 + dp[k + 1][i])

        return dp[0][0]
```

```java
public class Solution {
    public int findRotateSteps(String ring, String key) {
        int n = ring.length();
        int m = key.length();
        int[][] dp = new int[m + 1][n];
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j < n; j++) {
                dp[i][j] = Integer.MAX_VALUE;
            }
        }

        for (int i = 0; i < n; i++) {
            dp[m][i] = 0;
        }

        for (int k = m - 1; k >= 0; k--) {
            for (int r = 0; r < n; r++) {
                for (int i = 0; i < n; i++) {
                    if (ring.charAt(i) == key.charAt(k)) {
                        int minDist = Math.min(Math.abs(r - i), n - Math.abs(r - i));
                        dp[k][r] = Math.min(dp[k][r], minDist + 1 + dp[k + 1][i]);
                    }
                }
            }
        }
        return dp[0][0];
    }
}
```

```cpp
class Solution {
public:
    int findRotateSteps(string ring, string key) {
        int n = ring.size();
        int m = key.size();
        vector<vector<int>> dp(m + 1, vector<int>(n, INT_MAX));

        for (int i = 0; i < n; ++i) {
            dp[m][i] = 0;
        }

        for (int k = m - 1; k >= 0; --k) {
            for (int r = 0; r < n; ++r) {
                for (int i = 0; i < n; ++i) {
                    if (ring[i] == key[k]) {
                        int minDist = min(abs(r - i), n - abs(r - i));
                        dp[k][r] = min(dp[k][r], minDist + 1 + dp[k + 1][i]);
                    }
                }
            }
        }
        return dp[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} ring
     * @param {string} key
     * @return {number}
     */
    findRotateSteps(ring, key) {
        const n = ring.length;
        const m = key.length;
        const dp = Array.from({ length: m + 1 }, () => Array(n).fill(Infinity));

        for (let i = 0; i < n; i++) {
            dp[m][i] = 0;
        }

        for (let k = m - 1; k >= 0; k--) {
            for (let r = 0; r < n; r++) {
                for (let i = 0; i < n; i++) {
                    if (ring[i] === key[k]) {
                        const minDist = Math.min(
                            Math.abs(r - i),
                            n - Math.abs(r - i),
                        );
                        dp[k][r] = Math.min(
                            dp[k][r],
                            minDist + 1 + dp[k + 1][i],
                        );
                    }
                }
            }
        }
        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public int FindRotateSteps(string ring, string key) {
        int n = ring.Length;
        int m = key.Length;
        int[,] dp = new int[m + 1, n];
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j < n; j++) {
                dp[i, j] = int.MaxValue;
            }
        }

        for (int i = 0; i < n; i++) {
            dp[m, i] = 0;
        }

        for (int k = m - 1; k >= 0; k--) {
            for (int r = 0; r < n; r++) {
                for (int i = 0; i < n; i++) {
                    if (ring[i] == key[k]) {
                        int minDist = Math.Min(Math.Abs(r - i), n - Math.Abs(r - i));
                        dp[k, r] = Math.Min(dp[k, r], minDist + 1 + dp[k + 1, i]);
                    }
                }
            }
        }
        return dp[0, 0];
    }
}
```

```go
func findRotateSteps(ring string, key string) int {
    n, m := len(ring), len(key)
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n)
        for j := range dp[i] {
            dp[i][j] = 1 << 30
        }
    }

    for i := 0; i < n; i++ {
        dp[m][i] = 0
    }

    for k := m - 1; k >= 0; k-- {
        for r := 0; r < n; r++ {
            for i := 0; i < n; i++ {
                if ring[i] == key[k] {
                    minDist := min(abs(r-i), n-abs(r-i))
                    dp[k][r] = min(dp[k][r], minDist+1+dp[k+1][i])
                }
            }
        }
    }
    return dp[0][0]
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun findRotateSteps(ring: String, key: String): Int {
        val n = ring.length
        val m = key.length
        val dp = Array(m + 1) { IntArray(n) { Int.MAX_VALUE } }

        for (i in 0 until n) {
            dp[m][i] = 0
        }

        for (k in m - 1 downTo 0) {
            for (r in 0 until n) {
                for (i in 0 until n) {
                    if (ring[i] == key[k]) {
                        val minDist = minOf(kotlin.math.abs(r - i), n - kotlin.math.abs(r - i))
                        dp[k][r] = minOf(dp[k][r], minDist + 1 + dp[k + 1][i])
                    }
                }
            }
        }
        return dp[0][0]
    }
}
```

```swift
class Solution {
    func findRotateSteps(_ ring: String, _ key: String) -> Int {
        let ringArr = Array(ring)
        let keyArr = Array(key)
        let n = ringArr.count
        let m = keyArr.count
        var dp = [[Int]](repeating: [Int](repeating: Int.max, count: n), count: m + 1)

        for i in 0..<n {
            dp[m][i] = 0
        }

        for k in stride(from: m - 1, through: 0, by: -1) {
            for r in 0..<n {
                for i in 0..<n {
                    if ringArr[i] == keyArr[k] {
                        let minDist = min(abs(r - i), n - abs(r - i))
                        dp[k][r] = min(dp[k][r], minDist + 1 + dp[k + 1][i])
                    }
                }
            }
        }
        return dp[0][0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the length of the $ring$ and $m$ is the length of the $key$.

---

## 4. Dynamic Programming (Space Optimized) - I

### Intuition

Since each DP row only depends on the next row, we can reduce space from O(n * m) to O(n) by keeping just two arrays: one for the current key index and one for the next.

Additionally, precomputing the positions of each character in the ring using an adjacency list speeds up lookups.

### Algorithm

1. Build an adjacency list `adj` where `adj[c]` contains all ring positions with character `c`.
2. Initialize `dp` array of size `n` with zeros (base case after processing all characters).
3. Iterate `k` from `m - 1` down to `0`.
4. Create `nextDp` array initialized to infinity.
5. For each ring position `r`, look up positions in `adj[key[k]]` and compute the minimum cost.
6. Swap `dp` and `nextDp` after each iteration.
7. Return `dp[0]`.

::tabs-start

```python
class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        n = len(ring)
        m = len(key)
        dp = [0] * n

        adj = [[] for _ in range(26)]
        for i in range(n):
            adj[ord(ring[i]) - ord('a')].append(i)

        for k in range(m - 1, -1, -1):
            next_dp = [float("inf")] * n
            for r in range(n):
                for i in adj[ord(key[k]) - ord('a')]:
                    min_dist = min(abs(r - i), n - abs(r - i))
                    next_dp[r] = min(next_dp[r], min_dist + 1 + dp[i])
            dp = next_dp

        return dp[0]
```

```java
public class Solution {
    public int findRotateSteps(String ring, String key) {
        int n = ring.length();
        int m = key.length();
        int[] dp = new int[n];

        List<Integer>[] adj = new ArrayList[26];
        for (int i = 0; i < 26; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int i = 0; i < n; i++) {
            adj[ring.charAt(i) - 'a'].add(i);
        }

        for (int k = m - 1; k >= 0; k--) {
            int[] nextDp = new int[n];
            Arrays.fill(nextDp, Integer.MAX_VALUE);
            for (int r = 0; r < n; r++) {
                for (int i : adj[key.charAt(k) - 'a']) {
                    int minDist = Math.min(Math.abs(r - i), n - Math.abs(r - i));
                    nextDp[r] = Math.min(nextDp[r], minDist + 1 + dp[i]);
                }
            }
            dp = nextDp;
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int findRotateSteps(string ring, string key) {
        int n = ring.size();
        int m = key.size();
        vector<int> dp(n, 0);

        vector<vector<int>> adj(26);
        for (int i = 0; i < n; ++i) {
            adj[ring[i] - 'a'].push_back(i);
        }

        for (int k = m - 1; k >= 0; --k) {
            vector<int> nextDp(n, INT_MAX);
            for (int r = 0; r < n; ++r) {
                for (int& i : adj[key[k] - 'a']) {
                    int minDist = min(abs(r - i), n - abs(r - i));
                    nextDp[r] = min(nextDp[r], minDist + 1 + dp[i]);
                }
            }
            dp = nextDp;
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} ring
     * @param {string} key
     * @return {number}
     */
    findRotateSteps(ring, key) {
        const n = ring.length;
        const m = key.length;
        let dp = new Array(n).fill(0);

        const adj = Array.from({ length: 26 }, () => []);
        for (let i = 0; i < n; i++) {
            adj[ring.charCodeAt(i) - 97].push(i);
        }

        for (let k = m - 1; k >= 0; k--) {
            const nextDp = new Array(n).fill(Infinity);
            for (let r = 0; r < n; r++) {
                for (const i of adj[key.charCodeAt(k) - 97]) {
                    const minDist = Math.min(
                        Math.abs(r - i),
                        n - Math.abs(r - i),
                    );
                    nextDp[r] = Math.min(nextDp[r], minDist + 1 + dp[i]);
                }
            }
            dp = nextDp;
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int FindRotateSteps(string ring, string key) {
        int n = ring.Length;
        int m = key.Length;
        int[] dp = new int[n];

        List<int>[] adj = new List<int>[26];
        for (int i = 0; i < 26; i++) {
            adj[i] = new List<int>();
        }
        for (int i = 0; i < n; i++) {
            adj[ring[i] - 'a'].Add(i);
        }

        for (int k = m - 1; k >= 0; k--) {
            int[] nextDp = new int[n];
            Array.Fill(nextDp, int.MaxValue);
            for (int r = 0; r < n; r++) {
                foreach (int i in adj[key[k] - 'a']) {
                    int minDist = Math.Min(Math.Abs(r - i), n - Math.Abs(r - i));
                    nextDp[r] = Math.Min(nextDp[r], minDist + 1 + dp[i]);
                }
            }
            dp = nextDp;
        }

        return dp[0];
    }
}
```

```go
func findRotateSteps(ring string, key string) int {
    n, m := len(ring), len(key)
    dp := make([]int, n)

    adj := make([][]int, 26)
    for i := 0; i < 26; i++ {
        adj[i] = []int{}
    }
    for i := 0; i < n; i++ {
        adj[ring[i]-'a'] = append(adj[ring[i]-'a'], i)
    }

    for k := m - 1; k >= 0; k-- {
        nextDp := make([]int, n)
        for i := range nextDp {
            nextDp[i] = 1 << 30
        }
        for r := 0; r < n; r++ {
            for _, i := range adj[key[k]-'a'] {
                minDist := min(abs(r-i), n-abs(r-i))
                nextDp[r] = min(nextDp[r], minDist+1+dp[i])
            }
        }
        dp = nextDp
    }

    return dp[0]
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun findRotateSteps(ring: String, key: String): Int {
        val n = ring.length
        val m = key.length
        var dp = IntArray(n)

        val adj = Array(26) { mutableListOf<Int>() }
        for (i in 0 until n) {
            adj[ring[i] - 'a'].add(i)
        }

        for (k in m - 1 downTo 0) {
            val nextDp = IntArray(n) { Int.MAX_VALUE }
            for (r in 0 until n) {
                for (i in adj[key[k] - 'a']) {
                    val minDist = minOf(kotlin.math.abs(r - i), n - kotlin.math.abs(r - i))
                    nextDp[r] = minOf(nextDp[r], minDist + 1 + dp[i])
                }
            }
            dp = nextDp
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func findRotateSteps(_ ring: String, _ key: String) -> Int {
        let ringArr = Array(ring)
        let keyArr = Array(key)
        let n = ringArr.count
        let m = keyArr.count
        var dp = [Int](repeating: 0, count: n)

        var adj = [[Int]](repeating: [], count: 26)
        for i in 0..<n {
            let idx = Int(ringArr[i].asciiValue! - Character("a").asciiValue!)
            adj[idx].append(i)
        }

        for k in stride(from: m - 1, through: 0, by: -1) {
            var nextDp = [Int](repeating: Int.max, count: n)
            let keyIdx = Int(keyArr[k].asciiValue! - Character("a").asciiValue!)
            for r in 0..<n {
                for i in adj[keyIdx] {
                    let minDist = min(abs(r - i), n - abs(r - i))
                    nextDp[r] = min(nextDp[r], minDist + 1 + dp[i])
                }
            }
            dp = nextDp
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the $ring$ and $m$ is the length of the $key$.

---

## 5. Dynamic Programming (Space Optimized) - II

### Intuition

Instead of tracking all ring positions, we can focus only on positions that match key characters. The `dp` array stores the minimum cost to reach each ring position after matching some prefix of the key.

Initially, we set `dp[i]` to the distance from position `0` to position `i`. Then for each subsequent key character, we update only the positions that match, computing the minimum cost by considering transitions from positions matching the previous key character.

### Algorithm

1. Initialize `dp[i] = min(i, n - i)` for each ring position (distance from `0`).
2. Build an adjacency list for quick character position lookups.
3. For each key index `k` from `1` to `m - 1`:
   - For each position `r` matching `key[k]`, find the minimum cost among all positions matching `key[k - 1]`.
   - Update `dp[r]` with this minimum cost plus the rotation distance.
4. Find the minimum value among positions matching the last key character.
5. Add `m` for all button presses and return.

::tabs-start

```python
class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        n = len(ring)
        m = len(key)
        dp = [min(i, n - i) for i in range(n)]

        adj = [[] for _ in range(26)]
        for i in range(n):
            adj[ord(ring[i]) - ord('a')].append(i)

        for k in range(1, m):
            for r in adj[ord(key[k]) - ord('a')]:
                min_dist = float("inf")
                for i in adj[ord(key[k - 1]) - ord('a')]:
                    min_dist = min(
                        min_dist,
                        min(abs(r - i), n - abs(r - i)) + dp[i]
                    )
                dp[r] = min_dist

        return min(dp[i] for i in adj[ord(key[-1]) - ord('a')]) + m
```

```java
public class Solution {
    public int findRotateSteps(String ring, String key) {
        int n = ring.length();
        int m = key.length();
        int[] dp = new int[n];

        for (int i = 0; i < n; i++) {
            dp[i] = Math.min(i, n - i);
        }

        List<Integer>[] adj = new ArrayList[26];
        for (int i = 0; i < 26; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int i = 0; i < n; i++) {
            adj[ring.charAt(i) - 'a'].add(i);
        }

        for (int k = 1; k < m; k++) {
            for (int r : adj[key.charAt(k) - 'a']) {
                int minDist = Integer.MAX_VALUE;
                for (int i : adj[key.charAt(k - 1) - 'a']) {
                    minDist = Math.min(minDist,
                                Math.min(Math.abs(r - i), n - Math.abs(r - i)) + dp[i]
                    );
                }
                dp[r] = minDist;
            }
        }

        int result = Integer.MAX_VALUE;
        for (int i : adj[key.charAt(m - 1) - 'a']) {
            result = Math.min(result, dp[i]);
        }

        return result + m;
    }
}
```

```cpp
class Solution {
public:
    int findRotateSteps(string ring, string key) {
        int n = ring.size(), m = key.size();
        vector<int> dp(n);

        for (int i = 0; i < n; i++) {
            dp[i] = min(i, n - i);
        }

        vector<vector<int>> adj(26);
        for (int i = 0; i < n; i++) {
            adj[ring[i] - 'a'].push_back(i);
        }

        for (int k = 1; k < m; k++) {
            for (int r : adj[key[k] - 'a']) {
                int minDist = INT_MAX;
                for (int i : adj[key[k - 1] - 'a']) {
                    minDist = min(minDist, min(abs(r - i), n - abs(r - i)) + dp[i]);
                }
                dp[r] = minDist;
            }
        }

        int result = INT_MAX;
        for (int& i : adj[key[m - 1] - 'a']) {
            result = min(result, dp[i]);
        }

        return result + m;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} ring
     * @param {string} key
     * @return {number}
     */
    findRotateSteps(ring, key) {
        const n = ring.length;
        const m = key.length;
        const dp = Array(n)
            .fill(0)
            .map((_, i) => Math.min(i, n - i));

        const adj = Array.from({ length: 26 }, () => []);
        for (let i = 0; i < n; i++) {
            adj[ring.charCodeAt(i) - 97].push(i);
        }

        for (let k = 1; k < m; k++) {
            for (let r of adj[key.charCodeAt(k) - 97]) {
                let minDist = Infinity;
                for (let i of adj[key.charCodeAt(k - 1) - 97]) {
                    minDist = Math.min(
                        minDist,
                        Math.min(Math.abs(r - i), n - Math.abs(r - i)) + dp[i],
                    );
                }
                dp[r] = minDist;
            }
        }

        return (
            Math.min(...adj[key.charCodeAt(m - 1) - 97].map((i) => dp[i])) + m
        );
    }
}
```

```csharp
public class Solution {
    public int FindRotateSteps(string ring, string key) {
        int n = ring.Length;
        int m = key.Length;
        int[] dp = new int[n];

        for (int i = 0; i < n; i++) {
            dp[i] = Math.Min(i, n - i);
        }

        List<int>[] adj = new List<int>[26];
        for (int i = 0; i < 26; i++) {
            adj[i] = new List<int>();
        }

        for (int i = 0; i < n; i++) {
            adj[ring[i] - 'a'].Add(i);
        }

        for (int k = 1; k < m; k++) {
            foreach (int r in adj[key[k] - 'a']) {
                int minDist = int.MaxValue;
                foreach (int i in adj[key[k - 1] - 'a']) {
                    minDist = Math.Min(minDist,
                                Math.Min(Math.Abs(r - i), n - Math.Abs(r - i)) + dp[i]);
                }
                dp[r] = minDist;
            }
        }

        int result = int.MaxValue;
        foreach (int i in adj[key[m - 1] - 'a']) {
            result = Math.Min(result, dp[i]);
        }

        return result + m;
    }
}
```

```go
func findRotateSteps(ring string, key string) int {
    n, m := len(ring), len(key)
    dp := make([]int, n)

    for i := 0; i < n; i++ {
        dp[i] = min(i, n-i)
    }

    adj := make([][]int, 26)
    for i := 0; i < 26; i++ {
        adj[i] = []int{}
    }

    for i := 0; i < n; i++ {
        adj[ring[i]-'a'] = append(adj[ring[i]-'a'], i)
    }

    for k := 1; k < m; k++ {
        for _, r := range adj[key[k]-'a'] {
            minDist := 1 << 30
            for _, i := range adj[key[k-1]-'a'] {
                minDist = min(minDist, min(abs(r-i), n-abs(r-i))+dp[i])
            }
            dp[r] = minDist
        }
    }

    result := 1 << 30
    for _, i := range adj[key[m-1]-'a'] {
        result = min(result, dp[i])
    }

    return result + m
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun findRotateSteps(ring: String, key: String): Int {
        val n = ring.length
        val m = key.length
        val dp = IntArray(n) { minOf(it, n - it) }

        val adj = Array(26) { mutableListOf<Int>() }
        for (i in 0 until n) {
            adj[ring[i] - 'a'].add(i)
        }

        for (k in 1 until m) {
            for (r in adj[key[k] - 'a']) {
                var minDist = Int.MAX_VALUE
                for (i in adj[key[k - 1] - 'a']) {
                    minDist = minOf(minDist, minOf(kotlin.math.abs(r - i), n - kotlin.math.abs(r - i)) + dp[i])
                }
                dp[r] = minDist
            }
        }

        var result = Int.MAX_VALUE
        for (i in adj[key[m - 1] - 'a']) {
            result = minOf(result, dp[i])
        }

        return result + m
    }
}
```

```swift
class Solution {
    func findRotateSteps(_ ring: String, _ key: String) -> Int {
        let ringArr = Array(ring)
        let keyArr = Array(key)
        let n = ringArr.count
        let m = keyArr.count
        var dp = (0..<n).map { min($0, n - $0) }

        var adj = [[Int]](repeating: [], count: 26)
        for i in 0..<n {
            let idx = Int(ringArr[i].asciiValue! - Character("a").asciiValue!)
            adj[idx].append(i)
        }

        for k in 1..<m {
            let keyIdx = Int(keyArr[k].asciiValue! - Character("a").asciiValue!)
            let prevIdx = Int(keyArr[k - 1].asciiValue! - Character("a").asciiValue!)
            for r in adj[keyIdx] {
                var minDist = Int.max
                for i in adj[prevIdx] {
                    minDist = min(minDist, min(abs(r - i), n - abs(r - i)) + dp[i])
                }
                dp[r] = minDist
            }
        }

        let lastIdx = Int(keyArr[m - 1].asciiValue! - Character("a").asciiValue!)
        var result = Int.max
        for i in adj[lastIdx] {
            result = min(result, dp[i])
        }

        return result + m
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the $ring$ and $m$ is the length of the $key$.

---

## 6. Dynamic Programming (Optimal)

### Intuition

For each ring position, we only need to consider the closest matching positions in each direction (clockwise and counterclockwise). Using binary search or maintaining sorted position lists, we can find these two candidates in O(1) amortized time per position.

Since the adjacency list positions are naturally sorted by index, we can use a two-pointer technique while iterating through ring positions. For each position, we find the nearest matching character on either side and choose the better option.

### Algorithm

1. Precompute sorted position lists for each character.
2. Initialize two arrays: `dp` for current state and `nextDp` for the next iteration.
3. For each key character (right to left):
   - Use a pointer to track position in the sorted list of matching indices.
   - For each ring position `r`:
     - If `ring[r]` matches the key character, copy the value from `dp`.
     - Otherwise, find the nearest matching position in each direction using the sorted list.
     - Compute minimum cost considering wrap-around distances.
4. Swap arrays and continue.
5. Return `dp[0] + m`.

::tabs-start

```python
class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        n = len(ring)
        m = len(key)

        dp = [0] * n
        next_dp = [0] * n

        adj = [[] for _ in range(26)]
        for i, c in enumerate(ring):
            adj[ord(c) - ord('a')].append(i)

        for k in range(m - 1, -1, -1):
            c = ord(key[k]) - ord('a')
            it, N = 0, len(adj[c])

            for r in range(n):
                if ord(ring[r]) - ord('a') != c:
                    next_dp[r] = float('inf')
                    while it < N and adj[c][it] < r:
                        it += 1

                    nextIdx = adj[c][it] if it < N else adj[c][0]
                    prevIdx = adj[c][it - 1] if it > 0 else adj[c][-1]

                    next_dp[r] = min(
                        (r - prevIdx if r > prevIdx else n - (prevIdx - r)) + dp[prevIdx],
                        (nextIdx - r if nextIdx > r else n - (r - nextIdx)) + dp[nextIdx]
                    )
                else:
                    next_dp[r] = dp[r]

            dp, next_dp = next_dp, dp

        return dp[0] + m
```

```java
public class Solution {
    public int findRotateSteps(String ring, String key) {
        int n = ring.length();
        int m = key.length();

        int[] dp = new int[n];
        int[] nextDp = new int[n];
        List<Integer>[] adj = new ArrayList[26];

        for (int i = 0; i < 26; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int i = 0; i < n; i++) {
            adj[ring.charAt(i) - 'a'].add(i);
        }

        for (int k = m - 1; k >= 0; k--) {
            int c = key.charAt(k) - 'a';
            int it = 0, N = adj[c].size();

            for (int r = 0; r < n; r++) {
                if (ring.charAt(r) - 'a' != c) {
                    nextDp[r] = Integer.MAX_VALUE;
                    while (it < N && adj[c].get(it) < r) {
                        it++;
                    }

                    int nextIdx = it < N ? adj[c].get(it) : adj[c].get(0);
                    int prevIdx = it > 0 ? adj[c].get(it - 1) : adj[c].get(N - 1);

                    nextDp[r] = Math.min(
                        (r > prevIdx ? r - prevIdx : n - (prevIdx - r)) + dp[prevIdx],
                        (nextIdx > r ? nextIdx - r : n - (r - nextIdx)) + dp[nextIdx]
                    );
                } else {
                    nextDp[r] = dp[r];
                }
            }

            int[] temp = dp;
            dp = nextDp;
            nextDp = temp;
        }

        return dp[0] + m;
    }
}
```

```cpp
class Solution {
public:
    int findRotateSteps(string ring, string key) {
        int n = ring.size(), m = key.size();

        vector<int> dp(n, 0);
        vector<int> nextDp(n, 0);
        vector<vector<int>> adj(26);

        for (int i = 0; i < n; i++) {
            adj[ring[i] - 'a'].push_back(i);
        }

        for (int k = m - 1; k >= 0; k--) {
            int c = key[k] - 'a';
            int it = 0, N = adj[c].size();

            for (int r = 0; r < n; r++) {
                if (ring[r] - 'a' != c) {
                    nextDp[r] = INT_MAX;
                    while (it < N && adj[c][it] < r) {
                        it++;
                    }

                    int nextIdx = it < N ? adj[c][it] : adj[c][0];
                    int prevIdx = it > 0 ? adj[c][it - 1] : adj[c][N - 1];

                    nextDp[r] = min(
                        (r > prevIdx ? r - prevIdx : n - (prevIdx - r)) + dp[prevIdx],
                        (nextIdx > r ? nextIdx - r : n - (r - nextIdx)) + dp[nextIdx]
                    );
                } else {
                    nextDp[r] = dp[r];
                }
            }

            dp.swap(nextDp);
        }

        return dp[0] + m;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} ring
     * @param {string} key
     * @return {number}
     */
    findRotateSteps(ring, key) {
        const n = ring.length,
            m = key.length;

        let dp = Array(n).fill(0);
        let nextDp = Array(n).fill(0);
        const adj = Array.from({ length: 26 }, () => []);

        for (let i = 0; i < n; i++) {
            adj[ring.charCodeAt(i) - 97].push(i);
        }

        for (let k = m - 1; k >= 0; k--) {
            const c = key.charCodeAt(k) - 97;
            let it = 0,
                N = adj[c].length;

            for (let r = 0; r < n; r++) {
                if (ring.charCodeAt(r) - 97 !== c) {
                    nextDp[r] = Infinity;
                    while (it < N && adj[c][it] < r) {
                        it++;
                    }

                    const nextIdx = it < N ? adj[c][it] : adj[c][0];
                    const prevIdx = it > 0 ? adj[c][it - 1] : adj[c][N - 1];

                    nextDp[r] = Math.min(
                        (r > prevIdx ? r - prevIdx : n - (prevIdx - r)) +
                            dp[prevIdx],
                        (nextIdx > r ? nextIdx - r : n - (r - nextIdx)) +
                            dp[nextIdx],
                    );
                } else {
                    nextDp[r] = dp[r];
                }
            }

            [dp, nextDp] = [nextDp, dp];
        }

        return dp[0] + m;
    }
}
```

```csharp
public class Solution {
    public int FindRotateSteps(string ring, string key) {
        int n = ring.Length, m = key.Length;

        int[] dp = new int[n];
        int[] nextDp = new int[n];
        List<int>[] adj = new List<int>[26];

        for (int i = 0; i < 26; i++) {
            adj[i] = new List<int>();
        }
        for (int i = 0; i < n; i++) {
            adj[ring[i] - 'a'].Add(i);
        }

        for (int k = m - 1; k >= 0; k--) {
            int c = key[k] - 'a';
            int it = 0, N = adj[c].Count;

            for (int r = 0; r < n; r++) {
                if (ring[r] - 'a' != c) {
                    nextDp[r] = int.MaxValue;
                    while (it < N && adj[c][it] < r) {
                        it++;
                    }

                    int nextIdx = it < N ? adj[c][it] : adj[c][0];
                    int prevIdx = it > 0 ? adj[c][it - 1] : adj[c][N - 1];

                    nextDp[r] = Math.Min(
                        (r > prevIdx ? r - prevIdx : n - (prevIdx - r)) + dp[prevIdx],
                        (nextIdx > r ? nextIdx - r : n - (r - nextIdx)) + dp[nextIdx]
                    );
                } else {
                    nextDp[r] = dp[r];
                }
            }

            var temp = dp;
            dp = nextDp;
            nextDp = temp;
        }

        return dp[0] + m;
    }
}
```

```go
func findRotateSteps(ring string, key string) int {
    n, m := len(ring), len(key)

    dp := make([]int, n)
    nextDp := make([]int, n)
    adj := make([][]int, 26)

    for i := 0; i < 26; i++ {
        adj[i] = []int{}
    }
    for i := 0; i < n; i++ {
        adj[ring[i]-'a'] = append(adj[ring[i]-'a'], i)
    }

    for k := m - 1; k >= 0; k-- {
        c := int(key[k] - 'a')
        it, N := 0, len(adj[c])

        for r := 0; r < n; r++ {
            if int(ring[r]-'a') != c {
                nextDp[r] = 1 << 30
                for it < N && adj[c][it] < r {
                    it++
                }

                nextIdx := adj[c][0]
                if it < N {
                    nextIdx = adj[c][it]
                }
                prevIdx := adj[c][N-1]
                if it > 0 {
                    prevIdx = adj[c][it-1]
                }

                dist1 := r - prevIdx
                if r <= prevIdx {
                    dist1 = n - (prevIdx - r)
                }
                dist2 := nextIdx - r
                if nextIdx <= r {
                    dist2 = n - (r - nextIdx)
                }

                nextDp[r] = min(dist1+dp[prevIdx], dist2+dp[nextIdx])
            } else {
                nextDp[r] = dp[r]
            }
        }

        dp, nextDp = nextDp, dp
    }

    return dp[0] + m
}
```

```kotlin
class Solution {
    fun findRotateSteps(ring: String, key: String): Int {
        val n = ring.length
        val m = key.length

        var dp = IntArray(n)
        var nextDp = IntArray(n)
        val adj = Array(26) { mutableListOf<Int>() }

        for (i in 0 until n) {
            adj[ring[i] - 'a'].add(i)
        }

        for (k in m - 1 downTo 0) {
            val c = key[k] - 'a'
            var it = 0
            val N = adj[c].size

            for (r in 0 until n) {
                if (ring[r] - 'a' != c) {
                    nextDp[r] = Int.MAX_VALUE
                    while (it < N && adj[c][it] < r) {
                        it++
                    }

                    val nextIdx = if (it < N) adj[c][it] else adj[c][0]
                    val prevIdx = if (it > 0) adj[c][it - 1] else adj[c][N - 1]

                    nextDp[r] = minOf(
                        (if (r > prevIdx) r - prevIdx else n - (prevIdx - r)) + dp[prevIdx],
                        (if (nextIdx > r) nextIdx - r else n - (r - nextIdx)) + dp[nextIdx]
                    )
                } else {
                    nextDp[r] = dp[r]
                }
            }

            val temp = dp
            dp = nextDp
            nextDp = temp
        }

        return dp[0] + m
    }
}
```

```swift
class Solution {
    func findRotateSteps(_ ring: String, _ key: String) -> Int {
        let ringArr = Array(ring)
        let keyArr = Array(key)
        let n = ringArr.count
        let m = keyArr.count

        var dp = [Int](repeating: 0, count: n)
        var nextDp = [Int](repeating: 0, count: n)
        var adj = [[Int]](repeating: [], count: 26)

        for i in 0..<n {
            let idx = Int(ringArr[i].asciiValue! - Character("a").asciiValue!)
            adj[idx].append(i)
        }

        for k in stride(from: m - 1, through: 0, by: -1) {
            let c = Int(keyArr[k].asciiValue! - Character("a").asciiValue!)
            var it = 0
            let N = adj[c].count

            for r in 0..<n {
                let ringIdx = Int(ringArr[r].asciiValue! - Character("a").asciiValue!)
                if ringIdx != c {
                    nextDp[r] = Int.max
                    while it < N && adj[c][it] < r {
                        it += 1
                    }

                    let nextIdx = it < N ? adj[c][it] : adj[c][0]
                    let prevIdx = it > 0 ? adj[c][it - 1] : adj[c][N - 1]

                    nextDp[r] = min(
                        (r > prevIdx ? r - prevIdx : n - (prevIdx - r)) + dp[prevIdx],
                        (nextIdx > r ? nextIdx - r : n - (r - nextIdx)) + dp[nextIdx]
                    )
                } else {
                    nextDp[r] = dp[r]
                }
            }

            swap(&dp, &nextDp)
        }

        return dp[0] + m
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the $ring$ and $m$ is the length of the $key$.
