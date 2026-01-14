## 1. Recursion

### Intuition

This problem is a variant of the 0/1 knapsack problem with two constraints instead of one. For each binary string, we must decide whether to include it in our subset or not.

We can try all possible combinations by exploring two branches at each string: include it (if we have enough zeros and ones remaining) or skip it. The goal is to maximize the count of strings we can include while staying within the budget of `m` zeros and `n` ones.

### Algorithm

1. Preprocess each string to count its zeros and ones, storing in an array `arr`.
2. Define a recursive function `dfs(i, m, n)` that returns the maximum strings we can select starting from index `i` with `m` zeros and `n` ones remaining.
3. Base case: If `i` reaches the end of the array, return `0`.
4. At each index, we have two choices:
   - Skip the current string: `dfs(i + 1, m, n)`.
   - Include the current string (if affordable): `1 + dfs(i + 1, m - zeros, n - ones)`.
5. Return the maximum of both choices.

::tabs-start

```python
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        arr = [[0] * 2 for _ in range(len(strs))]
        for i, s in enumerate(strs):
            for c in s:
                arr[i][ord(c) - ord('0')] += 1

        def dfs(i, m, n):
            if i == len(strs):
                return 0

            res = dfs(i + 1, m, n)
            if m >= arr[i][0] and n >= arr[i][1]:
                res = max(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]))
            return res

        return dfs(0, m, n)
```

```java
public class Solution {
    public int findMaxForm(String[] strs, int m, int n) {
        int[][] arr = new int[strs.length][2];
        for (int i = 0; i < strs.length; i++) {
            for (char c : strs[i].toCharArray()) {
                arr[i][c - '0']++;
            }
        }

        return dfs(0, m, n, arr);
    }

    private int dfs(int i, int m, int n, int[][] arr) {
        if (i == arr.length) {
            return 0;
        }

        int res = dfs(i + 1, m, n, arr);
        if (m >= arr[i][0] && n >= arr[i][1]) {
            res = Math.max(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1], arr));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<vector<int>> arr(strs.size(), vector<int>(2));
        for (int i = 0; i < strs.size(); i++) {
            for (char c : strs[i]) {
                arr[i][c - '0']++;
            }
        }
        return dfs(0, m, n, arr);
    }

private:
    int dfs(int i, int m, int n, vector<vector<int>>& arr) {
        if (i == arr.size()) {
            return 0;
        }

        int res = dfs(i + 1, m, n, arr);
        if (m >= arr[i][0] && n >= arr[i][1]) {
            res = max(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1], arr));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    findMaxForm(strs, m, n) {
        const arr = Array.from({ length: strs.length }, () => [0, 0]);
        for (let i = 0; i < strs.length; i++) {
            for (const c of strs[i]) {
                arr[i][c - '0']++;
            }
        }

        const dfs = (i, m, n) => {
            if (i === strs.length) {
                return 0;
            }

            let res = dfs(i + 1, m, n);
            if (m >= arr[i][0] && n >= arr[i][1]) {
                res = Math.max(
                    res,
                    1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]),
                );
            }
            return res;
        };

        return dfs(0, m, n);
    }
}
```

```csharp
public class Solution {
    public int FindMaxForm(string[] strs, int m, int n) {
        int[][] arr = new int[strs.Length][];
        for (int i = 0; i < strs.Length; i++) {
            arr[i] = new int[2];
            foreach (char c in strs[i]) {
                arr[i][c - '0']++;
            }
        }
        return Dfs(0, m, n, arr);
    }

    private int Dfs(int i, int m, int n, int[][] arr) {
        if (i == arr.Length) return 0;

        int res = Dfs(i + 1, m, n, arr);
        if (m >= arr[i][0] && n >= arr[i][1]) {
            res = Math.Max(res, 1 + Dfs(i + 1, m - arr[i][0], n - arr[i][1], arr));
        }
        return res;
    }
}
```

```go
func findMaxForm(strs []string, m int, n int) int {
    arr := make([][]int, len(strs))
    for i, s := range strs {
        arr[i] = make([]int, 2)
        for _, c := range s {
            arr[i][c-'0']++
        }
    }

    var dfs func(i, m, n int) int
    dfs = func(i, m, n int) int {
        if i == len(strs) {
            return 0
        }

        res := dfs(i+1, m, n)
        if m >= arr[i][0] && n >= arr[i][1] {
            res = max(res, 1+dfs(i+1, m-arr[i][0], n-arr[i][1]))
        }
        return res
    }

    return dfs(0, m, n)
}
```

```kotlin
class Solution {
    fun findMaxForm(strs: Array<String>, m: Int, n: Int): Int {
        val arr = Array(strs.size) { IntArray(2) }
        for (i in strs.indices) {
            for (c in strs[i]) {
                arr[i][c - '0']++
            }
        }

        fun dfs(i: Int, m: Int, n: Int): Int {
            if (i == strs.size) return 0

            var res = dfs(i + 1, m, n)
            if (m >= arr[i][0] && n >= arr[i][1]) {
                res = maxOf(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]))
            }
            return res
        }

        return dfs(0, m, n)
    }
}
```

```swift
class Solution {
    func findMaxForm(_ strs: [String], _ m: Int, _ n: Int) -> Int {
        var arr = [[Int]](repeating: [0, 0], count: strs.count)
        for i in 0..<strs.count {
            for c in strs[i] {
                arr[i][Int(c.asciiValue!) - Int(Character("0").asciiValue!)] += 1
            }
        }

        func dfs(_ i: Int, _ m: Int, _ n: Int) -> Int {
            if i == strs.count { return 0 }

            var res = dfs(i + 1, m, n)
            if m >= arr[i][0] && n >= arr[i][1] {
                res = max(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]))
            }
            return res
        }

        return dfs(0, m, n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ N)$
- Space complexity: $O(N)$ for recursion stack.

> Where $N$ represents the number of binary strings, and $m$ and $n$ are the maximum allowable counts of zeros and ones, respectively.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution has overlapping subproblems. The same state `(i, m, n)` can be reached through different paths, leading to redundant computations.

We add memoization to cache results for each unique state. The state is defined by three variables: the current string index, remaining zeros budget, and remaining ones budget. Once we compute the answer for a state, we store it and return immediately on future calls.

### Algorithm

1. Preprocess each string to count its zeros and ones.
2. Create a 3D memoization table indexed by `(i, m, n)`.
3. Define `dfs(i, m, n)` as before, but check the cache first and store results before returning.
4. Early termination: If both `m` and `n` are `0`, we cannot include any more strings.
5. Return `dfs(0, m, n)`.

::tabs-start

```python
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        arr = [[0] * 2 for _ in range(len(strs))]
        for i, s in enumerate(strs):
            for c in s:
                arr[i][ord(c) - ord('0')] += 1

        dp = {}

        def dfs(i, m, n):
            if i == len(strs):
                return 0
            if m == 0 and n == 0:
                return 0
            if (i, m, n) in dp:
                return dp[(i, m, n)]

            res = dfs(i + 1, m, n)
            if m >= arr[i][0] and n >= arr[i][1]:
                res = max(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]))
            dp[(i, m, n)] = res
            return res

        return dfs(0, m, n)
```

```java
public class Solution {
    private int[][][] dp;
    private int[][] arr;

    public int findMaxForm(String[] strs, int m, int n) {
        arr = new int[strs.length][2];
        for (int i = 0; i < strs.length; i++) {
            for (char c : strs[i].toCharArray()) {
                arr[i][c - '0']++;
            }
        }

        dp = new int[strs.length][m + 1][n + 1];
        for (int i = 0; i < strs.length; i++) {
            for (int j = 0; j <= m; j++) {
                for (int k = 0; k <= n; k++) {
                    dp[i][j][k] = -1;
                }
            }
        }

        return dfs(0, m, n);
    }

    private int dfs(int i, int m, int n) {
        if (i == arr.length) {
            return 0;
        }
        if (m == 0 && n == 0) {
            return 0;
        }
        if (dp[i][m][n] != -1) {
            return dp[i][m][n];
        }

        int res = dfs(i + 1, m, n);
        if (m >= arr[i][0] && n >= arr[i][1]) {
            res = Math.max(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]));
        }
        dp[i][m][n] = res;
        return res;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<vector<int>>> dp;
    vector<vector<int>> arr;

public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        arr = vector<vector<int>>(strs.size(), vector<int>(2));
        for (int i = 0; i < strs.size(); i++) {
            for (char c : strs[i]) {
                arr[i][c - '0']++;
            }
        }

        dp = vector<vector<vector<int>>>(strs.size(), vector<vector<int>>(m + 1, vector<int>(n + 1, -1)));
        return dfs(0, m, n);
    }

private:
    int dfs(int i, int m, int n) {
        if (i == arr.size()) {
            return 0;
        }
        if (m == 0 && n == 0) {
            return 0;
        }
        if (dp[i][m][n] != -1) {
            return dp[i][m][n];
        }

        int res = dfs(i + 1, m, n);
        if (m >= arr[i][0] && n >= arr[i][1]) {
            res = max(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]));
        }
        dp[i][m][n] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    findMaxForm(strs, m, n) {
        const arr = Array.from({ length: strs.length }, () => [0, 0]);
        for (let i = 0; i < strs.length; i++) {
            for (const c of strs[i]) {
                arr[i][c - '0']++;
            }
        }

        const dp = Array.from({ length: strs.length }, () =>
            Array.from({ length: m + 1 }, () => Array(n + 1).fill(-1)),
        );

        const dfs = (i, m, n) => {
            if (i === strs.length) return 0;
            if (m === 0 && n === 0) return 0;
            if (dp[i][m][n] !== -1) return dp[i][m][n];

            let res = dfs(i + 1, m, n);
            if (m >= arr[i][0] && n >= arr[i][1]) {
                res = Math.max(
                    res,
                    1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]),
                );
            }
            dp[i][m][n] = res;
            return res;
        };

        return dfs(0, m, n);
    }
}
```

```csharp
public class Solution {
    private int[,,] dp;
    private int[][] arr;

    public int FindMaxForm(string[] strs, int m, int n) {
        arr = new int[strs.Length][];
        for (int i = 0; i < strs.Length; i++) {
            arr[i] = new int[2];
            foreach (char c in strs[i]) {
                arr[i][c - '0']++;
            }
        }

        dp = new int[strs.Length, m + 1, n + 1];
        for (int i = 0; i < strs.Length; i++) {
            for (int j = 0; j <= m; j++) {
                for (int k = 0; k <= n; k++) {
                    dp[i, j, k] = -1;
                }
            }
        }

        return Dfs(0, m, n);
    }

    private int Dfs(int i, int m, int n) {
        if (i == arr.Length) return 0;
        if (m == 0 && n == 0) return 0;
        if (dp[i, m, n] != -1) return dp[i, m, n];

        int res = Dfs(i + 1, m, n);
        if (m >= arr[i][0] && n >= arr[i][1]) {
            res = Math.Max(res, 1 + Dfs(i + 1, m - arr[i][0], n - arr[i][1]));
        }
        dp[i, m, n] = res;
        return res;
    }
}
```

```go
func findMaxForm(strs []string, m int, n int) int {
    arr := make([][]int, len(strs))
    for i, s := range strs {
        arr[i] = make([]int, 2)
        for _, c := range s {
            arr[i][c-'0']++
        }
    }

    dp := make([][][]int, len(strs))
    for i := range dp {
        dp[i] = make([][]int, m+1)
        for j := range dp[i] {
            dp[i][j] = make([]int, n+1)
            for k := range dp[i][j] {
                dp[i][j][k] = -1
            }
        }
    }

    var dfs func(i, m, n int) int
    dfs = func(i, m, n int) int {
        if i == len(strs) {
            return 0
        }
        if m == 0 && n == 0 {
            return 0
        }
        if dp[i][m][n] != -1 {
            return dp[i][m][n]
        }

        res := dfs(i+1, m, n)
        if m >= arr[i][0] && n >= arr[i][1] {
            res = max(res, 1+dfs(i+1, m-arr[i][0], n-arr[i][1]))
        }
        dp[i][m][n] = res
        return res
    }

    return dfs(0, m, n)
}
```

```kotlin
class Solution {
    private lateinit var dp: Array<Array<IntArray>>
    private lateinit var arr: Array<IntArray>

    fun findMaxForm(strs: Array<String>, m: Int, n: Int): Int {
        arr = Array(strs.size) { IntArray(2) }
        for (i in strs.indices) {
            for (c in strs[i]) {
                arr[i][c - '0']++
            }
        }

        dp = Array(strs.size) { Array(m + 1) { IntArray(n + 1) { -1 } } }
        return dfs(0, m, n)
    }

    private fun dfs(i: Int, m: Int, n: Int): Int {
        if (i == arr.size) return 0
        if (m == 0 && n == 0) return 0
        if (dp[i][m][n] != -1) return dp[i][m][n]

        var res = dfs(i + 1, m, n)
        if (m >= arr[i][0] && n >= arr[i][1]) {
            res = maxOf(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]))
        }
        dp[i][m][n] = res
        return res
    }
}
```

```swift
class Solution {
    func findMaxForm(_ strs: [String], _ m: Int, _ n: Int) -> Int {
        var arr = [[Int]](repeating: [0, 0], count: strs.count)
        for i in 0..<strs.count {
            for c in strs[i] {
                arr[i][Int(c.asciiValue!) - Int(Character("0").asciiValue!)] += 1
            }
        }

        var dp = [[[Int]]](repeating: [[Int]](repeating: [Int](repeating: -1, count: n + 1), count: m + 1), count: strs.count)

        func dfs(_ i: Int, _ m: Int, _ n: Int) -> Int {
            if i == strs.count { return 0 }
            if m == 0 && n == 0 { return 0 }
            if dp[i][m][n] != -1 { return dp[i][m][n] }

            var res = dfs(i + 1, m, n)
            if m >= arr[i][0] && n >= arr[i][1] {
                res = max(res, 1 + dfs(i + 1, m - arr[i][0], n - arr[i][1]))
            }
            dp[i][m][n] = res
            return res
        }

        return dfs(0, m, n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * N)$
- Space complexity: $O(m * n * N)$

> Where $N$ represents the number of binary strings, and $m$ and $n$ are the maximum allowable counts of zeros and ones, respectively.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We can convert the top-down approach to bottom-up by building the solution iteratively. We process strings one by one and, for each combination of remaining zeros and ones budget, compute the maximum strings achievable.

The DP table `dp[i][j][k]` represents the maximum strings from the first `i` strings using at most `j` zeros and `k` ones.

### Algorithm

1. Preprocess each string to count its zeros and ones.
2. Create a 3D DP table of size `(len(strs) + 1) x (m + 1) x (n + 1)`, initialized to `0`.
3. For each string `i` from `1` to `len(strs)`:
   - For each zeros budget `j` from `0` to `m`:
     - For each ones budget `k` from `0` to `n`:
       - Copy the value from the previous string: `dp[i][j][k] = dp[i-1][j][k]`.
       - If we can afford the current string (`j >= zeros` and `k >= ones`):
         - Update: `dp[i][j][k] = max(dp[i][j][k], 1 + dp[i-1][j-zeros][k-ones])`.
4. Return `dp[len(strs)][m][n]`.

::tabs-start

```python
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        arr = [[0] * 2 for _ in range(len(strs))]
        for i, s in enumerate(strs):
            for c in s:
                arr[i][ord(c) - ord('0')] += 1

        dp = [[[0] * (n + 1) for _ in range(m + 1)] for _ in range(len(strs) + 1)]

        for i in range(1, len(strs) + 1):
            for j in range(m + 1):
                for k in range(n + 1):
                    dp[i][j][k] = dp[i - 1][j][k]
                    if j >= arr[i - 1][0] and k >= arr[i - 1][1]:
                        dp[i][j][k] = max(dp[i][j][k], 1 + dp[i - 1][j - arr[i - 1][0]][k - arr[i - 1][1]])

        return dp[len(strs)][m][n]
```

```java
public class Solution {
    public int findMaxForm(String[] strs, int m, int n) {
        int[][] arr = new int[strs.length][2];
        for (int i = 0; i < strs.length; i++) {
            for (char c : strs[i].toCharArray()) {
                arr[i][c - '0']++;
            }
        }

        int[][][] dp = new int[strs.length + 1][m + 1][n + 1];

        for (int i = 1; i <= strs.length; i++) {
            for (int j = 0; j <= m; j++) {
                for (int k = 0; k <= n; k++) {
                    dp[i][j][k] = dp[i - 1][j][k];
                    if (j >= arr[i - 1][0] && k >= arr[i - 1][1]) {
                        dp[i][j][k] = Math.max(dp[i][j][k], 1 + dp[i - 1][j - arr[i - 1][0]][k - arr[i - 1][1]]);
                    }
                }
            }
        }

        return dp[strs.length][m][n];
    }
}
```

```cpp
class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<vector<int>> arr(strs.size(), vector<int>(2));
        for (int i = 0; i < strs.size(); i++) {
            for (char c : strs[i]) {
                arr[i][c - '0']++;
            }
        }

        vector<vector<vector<int>>> dp(strs.size() + 1, vector<vector<int>>(m + 1, vector<int>(n + 1, 0)));

        for (int i = 1; i <= strs.size(); i++) {
            for (int j = 0; j <= m; j++) {
                for (int k = 0; k <= n; k++) {
                    dp[i][j][k] = dp[i - 1][j][k];
                    if (j >= arr[i - 1][0] && k >= arr[i - 1][1]) {
                        dp[i][j][k] = max(dp[i][j][k], 1 + dp[i - 1][j - arr[i - 1][0]][k - arr[i - 1][1]]);
                    }
                }
            }
        }

        return dp[strs.size()][m][n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    findMaxForm(strs, m, n) {
        const arr = strs.map((s) => {
            const zeros = s.split('').filter((c) => c === '0').length;
            const ones = s.length - zeros;
            return [zeros, ones];
        });

        const dp = Array.from({ length: strs.length + 1 }, () =>
            Array.from({ length: m + 1 }, () => Array(n + 1).fill(0)),
        );

        for (let i = 1; i <= strs.length; i++) {
            for (let j = 0; j <= m; j++) {
                for (let k = 0; k <= n; k++) {
                    dp[i][j][k] = dp[i - 1][j][k];
                    if (j >= arr[i - 1][0] && k >= arr[i - 1][1]) {
                        dp[i][j][k] = Math.max(
                            dp[i][j][k],
                            1 + dp[i - 1][j - arr[i - 1][0]][k - arr[i - 1][1]],
                        );
                    }
                }
            }
        }

        return dp[strs.length][m][n];
    }
}
```

```csharp
public class Solution {
    public int FindMaxForm(string[] strs, int m, int n) {
        int[][] arr = new int[strs.Length][];
        for (int i = 0; i < strs.Length; i++) {
            arr[i] = new int[2];
            foreach (char c in strs[i]) {
                arr[i][c - '0']++;
            }
        }

        int[,,] dp = new int[strs.Length + 1, m + 1, n + 1];

        for (int i = 1; i <= strs.Length; i++) {
            for (int j = 0; j <= m; j++) {
                for (int k = 0; k <= n; k++) {
                    dp[i, j, k] = dp[i - 1, j, k];
                    if (j >= arr[i - 1][0] && k >= arr[i - 1][1]) {
                        dp[i, j, k] = Math.Max(dp[i, j, k], 1 + dp[i - 1, j - arr[i - 1][0], k - arr[i - 1][1]]);
                    }
                }
            }
        }

        return dp[strs.Length, m, n];
    }
}
```

```go
func findMaxForm(strs []string, m int, n int) int {
    arr := make([][]int, len(strs))
    for i, s := range strs {
        arr[i] = make([]int, 2)
        for _, c := range s {
            arr[i][c-'0']++
        }
    }

    dp := make([][][]int, len(strs)+1)
    for i := range dp {
        dp[i] = make([][]int, m+1)
        for j := range dp[i] {
            dp[i][j] = make([]int, n+1)
        }
    }

    for i := 1; i <= len(strs); i++ {
        for j := 0; j <= m; j++ {
            for k := 0; k <= n; k++ {
                dp[i][j][k] = dp[i-1][j][k]
                if j >= arr[i-1][0] && k >= arr[i-1][1] {
                    dp[i][j][k] = max(dp[i][j][k], 1+dp[i-1][j-arr[i-1][0]][k-arr[i-1][1]])
                }
            }
        }
    }

    return dp[len(strs)][m][n]
}
```

```kotlin
class Solution {
    fun findMaxForm(strs: Array<String>, m: Int, n: Int): Int {
        val arr = Array(strs.size) { IntArray(2) }
        for (i in strs.indices) {
            for (c in strs[i]) {
                arr[i][c - '0']++
            }
        }

        val dp = Array(strs.size + 1) { Array(m + 1) { IntArray(n + 1) } }

        for (i in 1..strs.size) {
            for (j in 0..m) {
                for (k in 0..n) {
                    dp[i][j][k] = dp[i - 1][j][k]
                    if (j >= arr[i - 1][0] && k >= arr[i - 1][1]) {
                        dp[i][j][k] = maxOf(dp[i][j][k], 1 + dp[i - 1][j - arr[i - 1][0]][k - arr[i - 1][1]])
                    }
                }
            }
        }

        return dp[strs.size][m][n]
    }
}
```

```swift
class Solution {
    func findMaxForm(_ strs: [String], _ m: Int, _ n: Int) -> Int {
        var arr = [[Int]](repeating: [0, 0], count: strs.count)
        for i in 0..<strs.count {
            for c in strs[i] {
                arr[i][Int(c.asciiValue!) - Int(Character("0").asciiValue!)] += 1
            }
        }

        var dp = [[[Int]]](repeating: [[Int]](repeating: [Int](repeating: 0, count: n + 1), count: m + 1), count: strs.count + 1)

        for i in 1...strs.count {
            for j in 0...m {
                for k in 0...n {
                    dp[i][j][k] = dp[i - 1][j][k]
                    if j >= arr[i - 1][0] && k >= arr[i - 1][1] {
                        dp[i][j][k] = max(dp[i][j][k], 1 + dp[i - 1][j - arr[i - 1][0]][k - arr[i - 1][1]])
                    }
                }
            }
        }

        return dp[strs.count][m][n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * N)$
- Space complexity: $O(m * n * N)$

> Where $N$ represents the number of binary strings, and $m$ and $n$ are the maximum allowable counts of zeros and ones, respectively.

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

Notice that when computing `dp[i]`, we only need values from `dp[i-1]`. This means we can reduce the 3D table to a 2D table.

The key trick is to iterate the budgets in reverse order. When we update `dp[j][k]`, we need the old values of `dp[j-zeros][k-ones]`. By iterating backward, we ensure these values have not been overwritten yet in the current iteration.

### Algorithm

1. Preprocess each string to count its zeros and ones.
2. Create a 2D DP table of size `(m + 1) x (n + 1)`, initialized to `0`.
3. For each string with `zeros` zeros and `ones` ones:
   - For `j` from `m` down to `zeros`:
     - For `k` from `n` down to `ones`:
       - Update: `dp[j][k] = max(dp[j][k], 1 + dp[j-zeros][k-ones])`.
4. Return `dp[m][n]`.

::tabs-start

```python
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        arr = [[0, 0] for _ in range(len(strs))]
        for i, s in enumerate(strs):
            for c in s:
                arr[i][ord(c) - ord('0')] += 1

        dp = [[0] * (n + 1) for _ in range(m + 1)]

        for zeros, ones in arr:
            for j in range(m, zeros - 1, -1):
                for k in range(n, ones - 1, -1):
                    dp[j][k] = max(dp[j][k], 1 + dp[j - zeros][k - ones])

        return dp[m][n]
```

```java
public class Solution {
    public int findMaxForm(String[] strs, int m, int n) {
        int[][] arr = new int[strs.length][2];
        for (int i = 0; i < strs.length; i++) {
            for (char c : strs[i].toCharArray()) {
                arr[i][c - '0']++;
            }
        }

        int[][] dp = new int[m + 1][n + 1];

        for (int[] pair : arr) {
            int zeros = pair[0], ones = pair[1];
            for (int j = m; j >= zeros; j--) {
                for (int k = n; k >= ones; k--) {
                    dp[j][k] = Math.max(dp[j][k], 1 + dp[j - zeros][k - ones]);
                }
            }
        }

        return dp[m][n];
    }
}
```

```cpp
class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<vector<int>> arr(strs.size(), vector<int>(2));
        for (int i = 0; i < strs.size(); i++) {
            for (char c : strs[i]) {
                arr[i][c - '0']++;
            }
        }

        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

        for (const auto& pair : arr) {
            int zeros = pair[0], ones = pair[1];
            for (int j = m; j >= zeros; j--) {
                for (int k = n; k >= ones; k--) {
                    dp[j][k] = max(dp[j][k], 1 + dp[j - zeros][k - ones]);
                }
            }
        }

        return dp[m][n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} strs
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    findMaxForm(strs, m, n) {
        const arr = Array.from({ length: strs.length }, () => [0, 0]);
        for (let i = 0; i < strs.length; i++) {
            for (const c of strs[i]) {
                arr[i][c - '0']++;
            }
        }

        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

        for (const [zeros, ones] of arr) {
            for (let j = m; j >= zeros; j--) {
                for (let k = n; k >= ones; k--) {
                    dp[j][k] = Math.max(dp[j][k], 1 + dp[j - zeros][k - ones]);
                }
            }
        }

        return dp[m][n];
    }
}
```

```csharp
public class Solution {
    public int FindMaxForm(string[] strs, int m, int n) {
        int[][] arr = new int[strs.Length][];
        for (int i = 0; i < strs.Length; i++) {
            arr[i] = new int[2];
            foreach (char c in strs[i]) {
                arr[i][c - '0']++;
            }
        }

        int[,] dp = new int[m + 1, n + 1];

        foreach (int[] pair in arr) {
            int zeros = pair[0], ones = pair[1];
            for (int j = m; j >= zeros; j--) {
                for (int k = n; k >= ones; k--) {
                    dp[j, k] = Math.Max(dp[j, k], 1 + dp[j - zeros, k - ones]);
                }
            }
        }

        return dp[m, n];
    }
}
```

```go
func findMaxForm(strs []string, m int, n int) int {
    arr := make([][]int, len(strs))
    for i, s := range strs {
        arr[i] = make([]int, 2)
        for _, c := range s {
            arr[i][c-'0']++
        }
    }

    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }

    for _, pair := range arr {
        zeros, ones := pair[0], pair[1]
        for j := m; j >= zeros; j-- {
            for k := n; k >= ones; k-- {
                dp[j][k] = max(dp[j][k], 1+dp[j-zeros][k-ones])
            }
        }
    }

    return dp[m][n]
}
```

```kotlin
class Solution {
    fun findMaxForm(strs: Array<String>, m: Int, n: Int): Int {
        val arr = Array(strs.size) { IntArray(2) }
        for (i in strs.indices) {
            for (c in strs[i]) {
                arr[i][c - '0']++
            }
        }

        val dp = Array(m + 1) { IntArray(n + 1) }

        for (pair in arr) {
            val zeros = pair[0]
            val ones = pair[1]
            for (j in m downTo zeros) {
                for (k in n downTo ones) {
                    dp[j][k] = maxOf(dp[j][k], 1 + dp[j - zeros][k - ones])
                }
            }
        }

        return dp[m][n]
    }
}
```

```swift
class Solution {
    func findMaxForm(_ strs: [String], _ m: Int, _ n: Int) -> Int {
        var arr = [[Int]](repeating: [0, 0], count: strs.count)
        for i in 0..<strs.count {
            for c in strs[i] {
                arr[i][Int(c.asciiValue!) - Int(Character("0").asciiValue!)] += 1
            }
        }

        var dp = [[Int]](repeating: [Int](repeating: 0, count: n + 1), count: m + 1)

        for pair in arr {
            let zeros = pair[0]
            let ones = pair[1]
            for j in stride(from: m, through: zeros, by: -1) {
                for k in stride(from: n, through: ones, by: -1) {
                    dp[j][k] = max(dp[j][k], 1 + dp[j - zeros][k - ones])
                }
            }
        }

        return dp[m][n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * N)$
- Space complexity: $O(m * n + N)$

> Where $N$ represents the number of binary strings, and $m$ and $n$ are the maximum allowable counts of zeros and ones, respectively.

---

## Common Pitfalls

### Iterating Forward Instead of Backward in Space-Optimized DP

When using the 2D space-optimized solution, iterating from small values to large values causes the same string to be counted multiple times in one iteration. You must iterate `j` from `m` down to `zeros` and `k` from `n` down to `ones` to ensure each string is used at most once per subset.

### Confusing Zeros and Ones Counts

Mixing up which index stores the count of zeros versus ones leads to incorrect budget checks. Consistently use index `0` for zeros and index `1` for ones (or vice versa) throughout the solution, and ensure the comparison matches this convention.

### Treating This as Unbounded Knapsack

This is a 0/1 knapsack problem where each string can be selected at most once. Solutions that allow selecting the same string multiple times will overcount and return incorrect results. Each string must be processed exactly once, either included or excluded.
