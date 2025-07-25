## 1. Recursion

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ m)$
- Space complexity: $O(m)$ for recursion stack.

> Where $n$ is the length of the $ring$ and $m$ is the length of the $key$.

---

## 2. Dynamic Programming (Top-Down)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the length of the $ring$ and $m$ is the length of the $key$.

---

## 3. Dynamic Programming (Bottom-Up)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the length of the $ring$ and $m$ is the length of the $key$.

---

## 4. Dynamic Programming (Space Optimized) - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the $ring$ and $m$ is the length of the $key$.

---

## 5. Dynamic Programming (Space optimized) - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the $ring$ and $m$ is the length of the $key$.

---

## 6. Dynamic Programming (Optimal)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the $ring$ and $m$ is the length of the $key$.
