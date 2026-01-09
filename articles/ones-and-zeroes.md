## 1. Recursion

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
