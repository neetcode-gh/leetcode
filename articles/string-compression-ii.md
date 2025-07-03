## 1. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def getLengthOfOptimalCompression(self, s: str, k: int) -> int:
        cache = {}

        def count(i, k, prev, prev_cnt):
            if (i, k, prev, prev_cnt) in cache:
                return cache[(i, k, prev, prev_cnt)]
            if k < 0:
                return float("inf")
            if i == len(s):
                return 0

            if s[i] == prev:
                incr = 1 if prev_cnt in [1, 9, 99] else 0
                res = incr + count(i + 1, k, prev, prev_cnt + 1)
            else:
                res = min(
                    count(i + 1, k - 1, prev, prev_cnt),  # delete s[i]
                    1 + count(i + 1, k, s[i], 1)  # don't delete
                )

            cache[(i, k, prev, prev_cnt)] = res
            return res

        return count(0, k, "", 0)
```

```java
public class Solution {
    private final int INF = Integer.MAX_VALUE / 2;
    private String s;
    private int[][][][] dp;

    public int getLengthOfOptimalCompression(String s, int k) {
        this.s = s;
        int n = s.length();
        dp = new int[n + 1][k + 1][27][n + 1];
        for (int[][][] arr1 : dp) {
            for (int[][] arr2 : arr1) {
                for (int[] arr3 : arr2) {
                    Arrays.fill(arr3, -1);
                }
            }
        }
        return count(0, k, 26, 0);
    }

    private int count(int i, int k, int prev, int prevCnt) {
        if (k < 0) return INF;
        if (i == s.length()) return 0;
        if (dp[i][k][prev][prevCnt] != -1) return dp[i][k][prev][prevCnt];

        int res;
        if (prev == (s.charAt(i) - 'a')) {
            int incr = (prevCnt == 1 || prevCnt == 9 || prevCnt == 99) ? 1 : 0;
            res = incr + count(i + 1, k, prev, prevCnt + 1);
        } else {
            res = Math.min(
                count(i + 1, k - 1, prev, prevCnt), // delete s[i]
                1 + count(i + 1, k, s.charAt(i) - 'a', 1) // don't delete
            );
        }

        return dp[i][k][prev][prevCnt] = res;
    }
}
```

```cpp
class Solution {
    static const int INF = INT_MAX / 2;
    vector<vector<vector<vector<int>>>> dp;

    int count(int i, int k, int prev, int prevCnt, string& s) {
        if (k < 0) return INF;
        if (i == s.size()) return 0;
        if (dp[i][k][prev][prevCnt] != -1) return dp[i][k][prev][prevCnt];

        int res;
        if (prev == s[i] - 'a') {
            int incr = (prevCnt == 1 || prevCnt == 9 || prevCnt == 99) ? 1 : 0;
            res = incr + count(i + 1, k, prev, prevCnt + 1, s);
        } else {
            res = 1 + count(i + 1, k, s[i] - 'a', 1, s); // don't delete
            if (k > 0) {
                res = min(res, count(i + 1, k - 1, prev, prevCnt, s)); // delete s[i]
            }
        }

        return dp[i][k][prev][prevCnt] = res;
    }

public:
    int getLengthOfOptimalCompression(string s, int k) {
        int n = s.size();
        dp = vector<vector<vector<vector<int>>>>(
            n + 1, vector<vector<vector<int>>>(k + 1, vector<vector<int>>(27, vector<int>(101, -1)))
        );
        return count(0, k, 26, 0, s);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    getLengthOfOptimalCompression(s, k) {
        const INF = 1e9;
        const n = s.length;
        const dp = {};

        const count = (i, k, prev, prevCnt) => {
            if (k < 0) return INF;
            if (i === n) return 0;
            const key = `${i},${k},${prev},${prevCnt}`;
            if (key in dp) return dp[key];

            let res;
            if (prev === s.charCodeAt(i) - 97) {
                const incr =
                    prevCnt === 1 || prevCnt === 9 || prevCnt === 99 ? 1 : 0;
                res = incr + count(i + 1, k, prev, prevCnt + 1);
            } else {
                res = 1 + count(i + 1, k, s.charCodeAt(i) - 97, 1); // don't delete
                if (k > 0) {
                    res = Math.min(res, count(i + 1, k - 1, prev, prevCnt)); // delete s[i]
                }
            }

            dp[key] = res;
            return res;
        };

        return count(0, k, 26, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * n ^ 2)$
- Space complexity: $O(k * n ^ 2)$

> Where $n$ is the length of the string $s$ and $k$ is the maximum number of characters that can be deleted from the string.

---

## 2. Dynamic Programming (Top-Down Optimized)

::tabs-start

```python
class Solution:
    def getLengthOfOptimalCompression(self, s: str, k: int) -> int:
        n = len(s)
        dp = {}

        def dfs(i, k):
            if n - i <= k:
                return 0
            if (i, k) in dp:
                return dp[(i, k)]

            res = 150
            if k > 0:
                res = dfs(i + 1, k - 1)

            freq = delCnt = 0
            comp_len = 1
            for j in range(i, n):
                if s[i] == s[j]:
                    if freq in [1, 9, 99]:
                        comp_len += 1
                    freq += 1
                else:
                    delCnt += 1
                    if delCnt > k:
                        break
                res = min(res, comp_len + dfs(j + 1, k - delCnt))
            dp[(i, k)] = res
            return res

        return dfs(0, k)
```

```java
public class Solution {
    private int n;
    private int[][] dp;

    public int getLengthOfOptimalCompression(String s, int k) {
        n = s.length();
        dp = new int[n + 1][k + 1];
        for (int[] row : dp) Arrays.fill(row, -1);
        return dfs(0, k, s);
    }

    private int dfs(int i, int k, String s) {
        if (n - i <= k) return 0;
        if (dp[i][k] != -1) return dp[i][k];

        int res = 150;
        if (k > 0) res = dfs(i + 1, k - 1, s);

        int freq = 0, delCnt = 0, comp_len = 1;
        for (int j = i; j < n; j++) {
            if (s.charAt(i) == s.charAt(j)) {
                if (freq == 1 || freq == 9 || freq == 99) comp_len++;
                freq++;
            } else {
                delCnt++;
                if (delCnt > k) break;
            }
            res = Math.min(res, comp_len + dfs(j + 1, k - delCnt, s));
        }
        dp[i][k] = res;
        return res;
    }
}
```

```cpp
class Solution {
private:
    int n;
    vector<vector<int>> dp;

    int dfs(int i, int k, const string& s) {
        if (n - i <= k) return 0;
        if (dp[i][k] != -1) return dp[i][k];

        int res = 150;
        if (k > 0) res = dfs(i + 1, k - 1, s);

        int freq = 0, delCnt = 0, comp_len = 1;
        for (int j = i; j < n; j++) {
            if (s[i] == s[j]) {
                if (freq == 1 || freq == 9 || freq == 99) comp_len++;
                freq++;
            } else {
                delCnt++;
                if (delCnt > k) break;
            }
            res = min(res, comp_len + dfs(j + 1, k - delCnt, s));
        }
        dp[i][k] = res;
        return res;
    }

public:
    int getLengthOfOptimalCompression(string s, int k) {
        n = s.size();
        dp = vector<vector<int>>(n + 1, vector<int>(k + 1, -1));
        return dfs(0, k, s);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    getLengthOfOptimalCompression(s, k) {
        const n = s.length;
        const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(-1));

        const dfs = (i, k) => {
            if (n - i <= k) return 0;
            if (dp[i][k] !== -1) return dp[i][k];

            let res = 150;
            if (k > 0) res = dfs(i + 1, k - 1);

            let freq = 0,
                delCnt = 0,
                comp_len = 1;
            for (let j = i; j < n; j++) {
                if (s[i] === s[j]) {
                    if (freq === 1 || freq === 9 || freq === 99) comp_len++;
                    freq++;
                } else {
                    delCnt++;
                    if (delCnt > k) break;
                }
                res = Math.min(res, comp_len + dfs(j + 1, k - delCnt));
            }
            dp[i][k] = res;
            return res;
        };

        return dfs(0, k);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the length of the string $s$ and $k$ is the maximum number of characters that can be deleted from the string.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def getLengthOfOptimalCompression(self, s: str, k: int) -> int:
        n = len(s)
        dp = [[150] * (k + 1) for _ in range(n)]
        dp.append([0] * (k + 1))

        for i in range(n - 1, -1, -1):
            for rem_k in range(k + 1):
                if rem_k > 0:
                    dp[i][rem_k] = dp[i + 1][rem_k - 1]

                freq = delCnt = 0
                comp_len = 1
                for j in range(i, n):
                    if s[i] == s[j]:
                        if freq in [1, 9, 99]:
                            comp_len += 1
                        freq += 1
                    else:
                        delCnt += 1
                        if delCnt > rem_k:
                            break
                    dp[i][rem_k] = min(dp[i][rem_k], comp_len + dp[j + 1][rem_k - delCnt])

        return dp[0][k]
```

```java
public class Solution {
    public int getLengthOfOptimalCompression(String s, int k) {
        int n = s.length();
        int[][] dp = new int[n + 1][k + 1];

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= k; j++) {
                dp[i][j] = 150;
            }
        }

        for (int remK = 0; remK <= k; remK++) {
            dp[n][remK] = 0;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int remK = 0; remK <= k; remK++) {
                if (remK > 0) {
                    dp[i][remK] = dp[i + 1][remK - 1];
                }

                int freq = 0, delCnt = 0, compLen = 1;
                for (int j = i; j < n; j++) {
                    if (s.charAt(i) == s.charAt(j)) {
                        if (freq == 1 || freq == 9 || freq == 99) {
                            compLen++;
                        }
                        freq++;
                    } else {
                        delCnt++;
                        if (delCnt > remK) break;
                    }
                    dp[i][remK] = Math.min(dp[i][remK], compLen + dp[j + 1][remK - delCnt]);
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
    int getLengthOfOptimalCompression(string s, int k) {
        int n = s.size();
        vector<vector<int>> dp(n + 1, vector<int>(k + 1, 150));

        for (int remK = 0; remK <= k; remK++) {
            dp[n][remK] = 0;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int remK = 0; remK <= k; remK++) {
                if (remK > 0) {
                    dp[i][remK] = dp[i + 1][remK - 1];
                }

                int freq = 0, delCnt = 0, compLen = 1;
                for (int j = i; j < n; j++) {
                    if (s[i] == s[j]) {
                        if (freq == 1 || freq == 9 || freq == 99) {
                            compLen++;
                        }
                        freq++;
                    } else {
                        delCnt++;
                        if (delCnt > remK) break;
                    }
                    dp[i][remK] = min(dp[i][remK], compLen + dp[j + 1][remK - delCnt]);
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
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    getLengthOfOptimalCompression(s, k) {
        const n = s.length;
        const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(150));

        for (let remK = 0; remK <= k; remK++) {
            dp[n][remK] = 0;
        }

        for (let i = n - 1; i >= 0; i--) {
            for (let remK = 0; remK <= k; remK++) {
                if (remK > 0) {
                    dp[i][remK] = dp[i + 1][remK - 1];
                }

                let freq = 0,
                    delCnt = 0,
                    compLen = 1;
                for (let j = i; j < n; j++) {
                    if (s[i] === s[j]) {
                        if (freq === 1 || freq === 9 || freq === 99) {
                            compLen++;
                        }
                        freq++;
                    } else {
                        delCnt++;
                        if (delCnt > remK) break;
                    }
                    dp[i][remK] = Math.min(
                        dp[i][remK],
                        compLen + dp[j + 1][remK - delCnt],
                    );
                }
            }
        }

        return dp[0][k];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the length of the string $s$ and $k$ is the maximum number of characters that can be deleted from the string.
