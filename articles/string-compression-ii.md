## 1. Dynamic Programming (Top-Down)

### Intuition

We want to delete at most k characters to minimize the run-length encoded length. The key observation is that the encoded length only increases at certain thresholds: going from 1 to 2 characters adds a digit, going from 9 to 10 adds another digit, and going from 99 to 100 adds yet another. We use recursion with memoization, tracking the current position, remaining deletions, the previous character, and its count. At each step, we either extend a run (if the current character matches the previous) or start a new run (keeping or deleting the current character).

### Algorithm

1. Define `count(i, k, prev, prev_cnt)` where `i` is current index, `k` is remaining deletions, `prev` is the previous character, and `prev_cnt` is how many times it has appeared consecutively.
2. Base cases: if `k < 0`, return infinity (invalid). If `i == n`, return `0`.
3. If `s[i] == prev`, extend the current run. Add `1` to the result only if `prev_cnt` is `1`, `9`, or `99` (thresholds where encoded length increases).
4. If `s[i] != prev`, choose the minimum of: deleting `s[i]` (using one deletion), or keeping `s[i]` (starting a new run with length contribution of `1`).
5. Memoize with a 4D cache.
6. Return `count(0, k, "", 0)`.

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

```csharp
public class Solution {
    private const int INF = int.MaxValue / 2;
    private string s;
    private int[,,,] dp;

    public int GetLengthOfOptimalCompression(string s, int k) {
        this.s = s;
        int n = s.Length;
        dp = new int[n + 1, k + 1, 27, n + 1];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= k; j++) {
                for (int p = 0; p < 27; p++) {
                    for (int c = 0; c <= n; c++) {
                        dp[i, j, p, c] = -1;
                    }
                }
            }
        }
        return Count(0, k, 26, 0);
    }

    private int Count(int i, int k, int prev, int prevCnt) {
        if (k < 0) return INF;
        if (i == s.Length) return 0;
        if (dp[i, k, prev, prevCnt] != -1) return dp[i, k, prev, prevCnt];

        int res;
        if (prev == (s[i] - 'a')) {
            int incr = (prevCnt == 1 || prevCnt == 9 || prevCnt == 99) ? 1 : 0;
            res = incr + Count(i + 1, k, prev, prevCnt + 1);
        } else {
            res = 1 + Count(i + 1, k, s[i] - 'a', 1);
            if (k > 0) {
                res = Math.Min(res, Count(i + 1, k - 1, prev, prevCnt));
            }
        }

        return dp[i, k, prev, prevCnt] = res;
    }
}
```

```go
func getLengthOfOptimalCompression(s string, k int) int {
    const INF = 1 << 30
    n := len(s)
    dp := make(map[string]int)

    var count func(i, k, prev, prevCnt int) int
    count = func(i, k, prev, prevCnt int) int {
        if k < 0 {
            return INF
        }
        if i == n {
            return 0
        }
        key := fmt.Sprintf("%d,%d,%d,%d", i, k, prev, prevCnt)
        if val, ok := dp[key]; ok {
            return val
        }

        var res int
        if prev == int(s[i]-'a') {
            incr := 0
            if prevCnt == 1 || prevCnt == 9 || prevCnt == 99 {
                incr = 1
            }
            res = incr + count(i+1, k, prev, prevCnt+1)
        } else {
            res = 1 + count(i+1, k, int(s[i]-'a'), 1)
            if k > 0 {
                res = min(res, count(i+1, k-1, prev, prevCnt))
            }
        }

        dp[key] = res
        return res
    }

    return count(0, k, 26, 0)
}
```

```kotlin
class Solution {
    private val INF = Int.MAX_VALUE / 2
    private lateinit var s: String
    private lateinit var dp: Array<Array<Array<IntArray>>>

    fun getLengthOfOptimalCompression(s: String, k: Int): Int {
        this.s = s
        val n = s.length
        dp = Array(n + 1) { Array(k + 1) { Array(27) { IntArray(n + 1) { -1 } } } }
        return count(0, k, 26, 0)
    }

    private fun count(i: Int, k: Int, prev: Int, prevCnt: Int): Int {
        if (k < 0) return INF
        if (i == s.length) return 0
        if (dp[i][k][prev][prevCnt] != -1) return dp[i][k][prev][prevCnt]

        val res: Int
        if (prev == s[i] - 'a') {
            val incr = if (prevCnt == 1 || prevCnt == 9 || prevCnt == 99) 1 else 0
            res = incr + count(i + 1, k, prev, prevCnt + 1)
        } else {
            var temp = 1 + count(i + 1, k, s[i] - 'a', 1)
            if (k > 0) {
                temp = minOf(temp, count(i + 1, k - 1, prev, prevCnt))
            }
            res = temp
        }

        dp[i][k][prev][prevCnt] = res
        return res
    }
}
```

```swift
class Solution {
    private let INF = Int.max / 2
    private var s: [Character] = []
    private var dp: [[[[Int]]]] = []

    func getLengthOfOptimalCompression(_ s: String, _ k: Int) -> Int {
        self.s = Array(s)
        let n = s.count
        dp = Array(repeating: Array(repeating: Array(repeating: Array(repeating: -1, count: n + 1), count: 27), count: k + 1), count: n + 1)
        return count(0, k, 26, 0)
    }

    private func count(_ i: Int, _ k: Int, _ prev: Int, _ prevCnt: Int) -> Int {
        if k < 0 { return INF }
        if i == s.count { return 0 }
        if dp[i][k][prev][prevCnt] != -1 { return dp[i][k][prev][prevCnt] }

        var res: Int
        let curr = Int(s[i].asciiValue! - Character("a").asciiValue!)
        if prev == curr {
            let incr = (prevCnt == 1 || prevCnt == 9 || prevCnt == 99) ? 1 : 0
            res = incr + count(i + 1, k, prev, prevCnt + 1)
        } else {
            res = 1 + count(i + 1, k, curr, 1)
            if k > 0 {
                res = min(res, count(i + 1, k - 1, prev, prevCnt))
            }
        }

        dp[i][k][prev][prevCnt] = res
        return res
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

### Intuition

Instead of tracking the previous character and its count explicitly, we can think of the problem differently. At each position, we decide to either delete the current character or make it the start of a new run. If we start a new run, we scan forward and try to extend it by keeping matching characters and deleting non-matching ones (within our deletion budget). This reduces the state space to just position and remaining deletions.

### Algorithm

1. Define `dfs(i, k)` where `i` is the current index and `k` is the remaining deletion budget.
2. Base case: if `n - i <= k`, we can delete all remaining characters, so return `0`.
3. Option 1: delete `s[i]` if `k > 0`, giving `dfs(i + 1, k - 1)`.
4. Option 2: start a run with `s[i]`. Scan forward, counting matching characters and deleting non-matching ones. Track the compressed length (which increases at counts `1`, `9`, `99`). For each endpoint, compute `comp_len + dfs(j + 1, k - delCnt)`.
5. Take the minimum across all options.
6. Memoize with a 2D cache `dp[n][k+1]`.
7. Return `dfs(0, k)`.

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

```csharp
public class Solution {
    private int n;
    private int[,] dp;

    public int GetLengthOfOptimalCompression(string s, int k) {
        n = s.Length;
        dp = new int[n + 1, k + 1];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= k; j++) {
                dp[i, j] = -1;
            }
        }
        return Dfs(0, k, s);
    }

    private int Dfs(int i, int k, string s) {
        if (n - i <= k) return 0;
        if (dp[i, k] != -1) return dp[i, k];

        int res = 150;
        if (k > 0) res = Dfs(i + 1, k - 1, s);

        int freq = 0, delCnt = 0, compLen = 1;
        for (int j = i; j < n; j++) {
            if (s[i] == s[j]) {
                if (freq == 1 || freq == 9 || freq == 99) compLen++;
                freq++;
            } else {
                delCnt++;
                if (delCnt > k) break;
            }
            res = Math.Min(res, compLen + Dfs(j + 1, k - delCnt, s));
        }
        dp[i, k] = res;
        return res;
    }
}
```

```go
func getLengthOfOptimalCompression(s string, k int) int {
    n := len(s)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, k+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, k int) int
    dfs = func(i, k int) int {
        if n-i <= k {
            return 0
        }
        if dp[i][k] != -1 {
            return dp[i][k]
        }

        res := 150
        if k > 0 {
            res = dfs(i+1, k-1)
        }

        freq, delCnt, compLen := 0, 0, 1
        for j := i; j < n; j++ {
            if s[i] == s[j] {
                if freq == 1 || freq == 9 || freq == 99 {
                    compLen++
                }
                freq++
            } else {
                delCnt++
                if delCnt > k {
                    break
                }
            }
            res = min(res, compLen+dfs(j+1, k-delCnt))
        }
        dp[i][k] = res
        return res
    }

    return dfs(0, k)
}
```

```kotlin
class Solution {
    private var n = 0
    private lateinit var dp: Array<IntArray>

    fun getLengthOfOptimalCompression(s: String, k: Int): Int {
        n = s.length
        dp = Array(n + 1) { IntArray(k + 1) { -1 } }
        return dfs(0, k, s)
    }

    private fun dfs(i: Int, k: Int, s: String): Int {
        if (n - i <= k) return 0
        if (dp[i][k] != -1) return dp[i][k]

        var res = 150
        if (k > 0) res = dfs(i + 1, k - 1, s)

        var freq = 0
        var delCnt = 0
        var compLen = 1
        for (j in i until n) {
            if (s[i] == s[j]) {
                if (freq == 1 || freq == 9 || freq == 99) compLen++
                freq++
            } else {
                delCnt++
                if (delCnt > k) break
            }
            res = minOf(res, compLen + dfs(j + 1, k - delCnt, s))
        }
        dp[i][k] = res
        return res
    }
}
```

```swift
class Solution {
    private var n = 0
    private var dp: [[Int]] = []

    func getLengthOfOptimalCompression(_ s: String, _ k: Int) -> Int {
        let sArr = Array(s)
        n = sArr.count
        dp = Array(repeating: Array(repeating: -1, count: k + 1), count: n + 1)
        return dfs(0, k, sArr)
    }

    private func dfs(_ i: Int, _ k: Int, _ s: [Character]) -> Int {
        if n - i <= k { return 0 }
        if dp[i][k] != -1 { return dp[i][k] }

        var res = 150
        if k > 0 { res = dfs(i + 1, k - 1, s) }

        var freq = 0, delCnt = 0, compLen = 1
        for j in i..<n {
            if s[i] == s[j] {
                if freq == 1 || freq == 9 || freq == 99 { compLen += 1 }
                freq += 1
            } else {
                delCnt += 1
                if delCnt > k { break }
            }
            res = min(res, compLen + dfs(j + 1, k - delCnt, s))
        }
        dp[i][k] = res
        return res
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

### Intuition

We convert the optimized top-down solution to bottom-up form. We process positions from right to left, computing for each position and deletion budget the minimum encoded length. This iterative approach fills the DP table systematically and avoids recursion overhead.

### Algorithm

1. Create a 2D DP array `dp[n+1][k+1]` initialized to a large value (e.g., 150), with `dp[n][*] = 0` as base cases.
2. Iterate `i` from `n-1` down to `0`, and for each `rem_k` from `0` to `k`.
3. Option 1: if `rem_k > 0`, set `dp[i][rem_k] = dp[i+1][rem_k-1]` (delete current character).
4. Option 2: scan forward from `i`, counting frequency of `s[i]` and deletions of other characters. Track compressed length (starts at `1`, increases at thresholds `1`, `9`, `99`). Update `dp[i][rem_k] = min(dp[i][rem_k], comp_len + dp[j+1][rem_k - delCnt])`.
5. Stop scanning when `delCnt > rem_k`.
6. Return `dp[0][k]`.

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

```csharp
public class Solution {
    public int GetLengthOfOptimalCompression(string s, int k) {
        int n = s.Length;
        int[,] dp = new int[n + 1, k + 1];

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= k; j++) {
                dp[i, j] = 150;
            }
        }

        for (int remK = 0; remK <= k; remK++) {
            dp[n, remK] = 0;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int remK = 0; remK <= k; remK++) {
                if (remK > 0) {
                    dp[i, remK] = dp[i + 1, remK - 1];
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
                    dp[i, remK] = Math.Min(dp[i, remK], compLen + dp[j + 1, remK - delCnt]);
                }
            }
        }

        return dp[0, k];
    }
}
```

```go
func getLengthOfOptimalCompression(s string, k int) int {
    n := len(s)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, k+1)
        for j := range dp[i] {
            dp[i][j] = 150
        }
    }

    for remK := 0; remK <= k; remK++ {
        dp[n][remK] = 0
    }

    for i := n - 1; i >= 0; i-- {
        for remK := 0; remK <= k; remK++ {
            if remK > 0 {
                dp[i][remK] = dp[i+1][remK-1]
            }

            freq, delCnt, compLen := 0, 0, 1
            for j := i; j < n; j++ {
                if s[i] == s[j] {
                    if freq == 1 || freq == 9 || freq == 99 {
                        compLen++
                    }
                    freq++
                } else {
                    delCnt++
                    if delCnt > remK {
                        break
                    }
                }
                dp[i][remK] = min(dp[i][remK], compLen+dp[j+1][remK-delCnt])
            }
        }
    }

    return dp[0][k]
}
```

```kotlin
class Solution {
    fun getLengthOfOptimalCompression(s: String, k: Int): Int {
        val n = s.length
        val dp = Array(n + 1) { IntArray(k + 1) { 150 } }

        for (remK in 0..k) {
            dp[n][remK] = 0
        }

        for (i in n - 1 downTo 0) {
            for (remK in 0..k) {
                if (remK > 0) {
                    dp[i][remK] = dp[i + 1][remK - 1]
                }

                var freq = 0
                var delCnt = 0
                var compLen = 1
                for (j in i until n) {
                    if (s[i] == s[j]) {
                        if (freq == 1 || freq == 9 || freq == 99) compLen++
                        freq++
                    } else {
                        delCnt++
                        if (delCnt > remK) break
                    }
                    dp[i][remK] = minOf(dp[i][remK], compLen + dp[j + 1][remK - delCnt])
                }
            }
        }

        return dp[0][k]
    }
}
```

```swift
class Solution {
    func getLengthOfOptimalCompression(_ s: String, _ k: Int) -> Int {
        let sArr = Array(s)
        let n = sArr.count
        var dp = Array(repeating: Array(repeating: 150, count: k + 1), count: n + 1)

        for remK in 0...k {
            dp[n][remK] = 0
        }

        for i in stride(from: n - 1, through: 0, by: -1) {
            for remK in 0...k {
                if remK > 0 {
                    dp[i][remK] = dp[i + 1][remK - 1]
                }

                var freq = 0, delCnt = 0, compLen = 1
                for j in i..<n {
                    if sArr[i] == sArr[j] {
                        if freq == 1 || freq == 9 || freq == 99 {
                            compLen += 1
                        }
                        freq += 1
                    } else {
                        delCnt += 1
                        if delCnt > remK { break }
                    }
                    dp[i][remK] = min(dp[i][remK], compLen + dp[j + 1][remK - delCnt])
                }
            }
        }

        return dp[0][k]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * k)$
- Space complexity: $O(n * k)$

> Where $n$ is the length of the string $s$ and $k$ is the maximum number of characters that can be deleted from the string.
