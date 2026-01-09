## 1. Brute Force

::tabs-start

```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        m, n = len(matrix), len(matrix[0])
        res = 0

        for r in range(m):
            for c in range(n):
                if matrix[r][c] == "0":
                    continue
                k = 1
                while True:
                    if r + k > m or c + k > n:
                        break
                    flag = True

                    for i in range(r, r + k):
                        if matrix[i][c + k - 1] == "0":
                            flag = False
                            break
                    for j in range(c, c + k):
                        if matrix[r + k - 1][j] == "0":
                            flag = False
                            break

                    if not flag:
                        break
                    res = max(res, k * k)
                    k += 1

        return res
```

```java
public class Solution {
    public int maximalSquare(char[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int res = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (matrix[r][c] == '0') {
                    continue;
                }
                int k = 1;
                while (true) {
                    if (r + k > m || c + k > n) {
                        break;
                    }
                    boolean flag = true;

                    for (int i = r; i < r + k; i++) {
                        if (matrix[i][c + k - 1] == '0') {
                            flag = false;
                            break;
                        }
                    }
                    for (int j = c; j < c + k; j++) {
                        if (matrix[r + k - 1][j] == '0') {
                            flag = false;
                            break;
                        }
                    }

                    if (!flag) {
                        break;
                    }
                    res = Math.max(res, k * k);
                    k++;
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        int res = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (matrix[r][c] == '0') {
                    continue;
                }
                int k = 1;
                while (true) {
                    if (r + k > m || c + k > n) {
                        break;
                    }
                    bool flag = true;

                    for (int i = r; i < r + k; i++) {
                        if (matrix[i][c + k - 1] == '0') {
                            flag = false;
                            break;
                        }
                    }
                    for (int j = c; j < c + k; j++) {
                        if (matrix[r + k - 1][j] == '0') {
                            flag = false;
                            break;
                        }
                    }

                    if (!flag) {
                        break;
                    }
                    res = max(res, k * k);
                    k++;
                }
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} matrix
     * @return {number}
     */
    maximalSquare(matrix) {
        const m = matrix.length,
            n = matrix[0].length;
        let res = 0;

        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                if (matrix[r][c] === '0') {
                    continue;
                }
                let k = 1;
                while (true) {
                    if (r + k > m || c + k > n) {
                        break;
                    }
                    let flag = true;

                    for (let i = r; i < r + k; i++) {
                        if (matrix[i][c + k - 1] === '0') {
                            flag = false;
                            break;
                        }
                    }
                    for (let j = c; j < c + k; j++) {
                        if (matrix[r + k - 1][j] === '0') {
                            flag = false;
                            break;
                        }
                    }

                    if (!flag) {
                        break;
                    }
                    res = Math.max(res, k * k);
                    k++;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaximalSquare(char[][] matrix) {
        int m = matrix.Length;
        int n = matrix[0].Length;
        int res = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (matrix[r][c] == '0') continue;
                int k = 1;
                while (true) {
                    if (r + k > m || c + k > n) break;
                    bool flag = true;

                    for (int i = r; i < r + k; i++) {
                        if (matrix[i][c + k - 1] == '0') {
                            flag = false;
                            break;
                        }
                    }

                    for (int j = c; j < c + k; j++) {
                        if (matrix[r + k - 1][j] == '0') {
                            flag = false;
                            break;
                        }
                    }

                    if (!flag) break;
                    res = Math.Max(res, k * k);
                    k++;
                }
            }
        }

        return res;
    }
}
```

```go
func maximalSquare(matrix [][]byte) int {
    m, n := len(matrix), len(matrix[0])
    res := 0

    for r := 0; r < m; r++ {
        for c := 0; c < n; c++ {
            if matrix[r][c] == '0' {
                continue
            }
            k := 1
            for {
                if r+k > m || c+k > n {
                    break
                }
                flag := true

                for i := r; i < r+k; i++ {
                    if matrix[i][c+k-1] == '0' {
                        flag = false
                        break
                    }
                }
                for j := c; j < c+k; j++ {
                    if matrix[r+k-1][j] == '0' {
                        flag = false
                        break
                    }
                }

                if !flag {
                    break
                }
                if k*k > res {
                    res = k * k
                }
                k++
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maximalSquare(matrix: Array<CharArray>): Int {
        val m = matrix.size
        val n = matrix[0].size
        var res = 0

        for (r in 0 until m) {
            for (c in 0 until n) {
                if (matrix[r][c] == '0') continue
                var k = 1
                while (true) {
                    if (r + k > m || c + k > n) break
                    var flag = true

                    for (i in r until r + k) {
                        if (matrix[i][c + k - 1] == '0') {
                            flag = false
                            break
                        }
                    }
                    for (j in c until c + k) {
                        if (matrix[r + k - 1][j] == '0') {
                            flag = false
                            break
                        }
                    }

                    if (!flag) break
                    res = maxOf(res, k * k)
                    k++
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func maximalSquare(_ matrix: [[Character]]) -> Int {
        let m = matrix.count, n = matrix[0].count
        var res = 0

        for r in 0..<m {
            for c in 0..<n {
                if matrix[r][c] == "0" {
                    continue
                }
                var k = 1
                while true {
                    if r + k > m || c + k > n {
                        break
                    }
                    var flag = true

                    for i in r..<(r + k) {
                        if matrix[i][c + k - 1] == "0" {
                            flag = false
                            break
                        }
                    }
                    for j in c..<(c + k) {
                        if matrix[r + k - 1][j] == "0" {
                            flag = false
                            break
                        }
                    }

                    if !flag {
                        break
                    }
                    res = max(res, k * k)
                    k += 1
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((m * n) ^ 2)$
- Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number columns.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        cache = {}

        def dfs(r, c):
            if r >= ROWS or c >= COLS:
                return 0
            if (r, c) not in cache:
                down = dfs(r + 1, c)
                right = dfs(r, c + 1)
                diag = dfs(r + 1, c + 1)
                cache[(r, c)] = 0
                if matrix[r][c] == "1":
                    cache[(r, c)] = 1 + min(down, right, diag)
            return cache[(r, c)]

        dfs(0, 0)
        return max(cache.values()) ** 2
```

```java
public class Solution {
    private int[][] dp;

    public int maximalSquare(char[][] matrix) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        dp = new int[ROWS][COLS];
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                dp[i][j] = -1;
            }
        }

        dfs(0, 0, matrix);
        int maxSquare = 0;
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                maxSquare = Math.max(maxSquare, dp[i][j]);
            }
        }
        return maxSquare * maxSquare;
    }

    private int dfs(int r, int c, char[][] matrix) {
        if (r >= matrix.length || c >= matrix[0].length) {
            return 0;
        }
        if (dp[r][c] != -1) {
            return dp[r][c];
        }
        int down = dfs(r + 1, c, matrix);
        int right = dfs(r, c + 1, matrix);
        int diag = dfs(r + 1, c + 1, matrix);
        dp[r][c] = 0;
        if (matrix[r][c] == '1') {
            dp[r][c] = 1 + Math.min(down, Math.min(right, diag));
        }
        return dp[r][c];
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        dp = vector<vector<int>>(ROWS, vector<int>(COLS, -1));

        dfs(0, 0, matrix);
        int maxSquare = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                maxSquare = max(maxSquare, dp[r][c]);
            }
        }
        return maxSquare * maxSquare;
    }

    int dfs(int r, int c, vector<vector<char>>& matrix) {
        if (r >= matrix.size() || c >= matrix[0].size()) {
            return 0;
        }
        if (dp[r][c] != -1) {
            return dp[r][c];
        }
        int down = dfs(r + 1, c, matrix);
        int right = dfs(r, c + 1, matrix);
        int diag = dfs(r + 1, c + 1, matrix);
        dp[r][c] = 0;
        if (matrix[r][c] == '1') {
            dp[r][c] = 1 + min(down, min(right, diag));
        }
        return dp[r][c];
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} matrix
     * @return {number}
     */
    maximalSquare(matrix) {
        const ROWS = matrix.length,
            COLS = matrix[0].length;
        const dp = Array.from({ length: ROWS }, () => Array(COLS).fill(-1));

        const dfs = (r, c) => {
            if (r >= ROWS || c >= COLS) {
                return 0;
            }
            if (dp[r][c] !== -1) {
                return dp[r][c];
            }
            const down = dfs(r + 1, c);
            const right = dfs(r, c + 1);
            const diag = dfs(r + 1, c + 1);
            dp[r][c] = 0;
            if (matrix[r][c] === '1') {
                dp[r][c] = 1 + Math.min(down, Math.min(right, diag));
            }
            return dp[r][c];
        };

        dfs(0, 0);
        let maxSquare = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                maxSquare = Math.max(maxSquare, dp[r][c]);
            }
        }
        return maxSquare * maxSquare;
    }
}
```

```csharp
public class Solution {
    private int[][] dp;

    public int MaximalSquare(char[][] matrix) {
        int ROWS = matrix.Length, COLS = matrix[0].Length;
        dp = new int[ROWS][];
        for (int i = 0; i < ROWS; i++) {
            dp[i] = new int[COLS];
            for (int j = 0; j < COLS; j++) {
                dp[i][j] = -1;
            }
        }

        Dfs(0, 0, matrix);
        int maxSquare = 0;
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                maxSquare = Math.Max(maxSquare, dp[i][j]);
            }
        }
        return maxSquare * maxSquare;
    }

    private int Dfs(int r, int c, char[][] matrix) {
        if (r >= matrix.Length || c >= matrix[0].Length) {
            return 0;
        }
        if (dp[r][c] != -1) {
            return dp[r][c];
        }

        int down = Dfs(r + 1, c, matrix);
        int right = Dfs(r, c + 1, matrix);
        int diag = Dfs(r + 1, c + 1, matrix);

        dp[r][c] = 0;
        if (matrix[r][c] == '1') {
            dp[r][c] = 1 + Math.Min(down, Math.Min(right, diag));
        }

        return dp[r][c];
    }
}
```

```go
func maximalSquare(matrix [][]byte) int {
    ROWS, COLS := len(matrix), len(matrix[0])
    dp := make([][]int, ROWS)
    for i := range dp {
        dp[i] = make([]int, COLS)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(r, c int) int
    dfs = func(r, c int) int {
        if r >= ROWS || c >= COLS {
            return 0
        }
        if dp[r][c] != -1 {
            return dp[r][c]
        }
        down := dfs(r+1, c)
        right := dfs(r, c+1)
        diag := dfs(r+1, c+1)
        dp[r][c] = 0
        if matrix[r][c] == '1' {
            dp[r][c] = 1 + min(down, min(right, diag))
        }
        return dp[r][c]
    }

    dfs(0, 0)
    maxSquare := 0
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if dp[r][c] > maxSquare {
                maxSquare = dp[r][c]
            }
        }
    }
    return maxSquare * maxSquare
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private lateinit var dp: Array<IntArray>

    fun maximalSquare(matrix: Array<CharArray>): Int {
        val ROWS = matrix.size
        val COLS = matrix[0].size
        dp = Array(ROWS) { IntArray(COLS) { -1 } }

        dfs(0, 0, matrix)
        var maxSquare = 0
        for (i in 0 until ROWS) {
            for (j in 0 until COLS) {
                maxSquare = maxOf(maxSquare, dp[i][j])
            }
        }
        return maxSquare * maxSquare
    }

    private fun dfs(r: Int, c: Int, matrix: Array<CharArray>): Int {
        if (r >= matrix.size || c >= matrix[0].size) {
            return 0
        }
        if (dp[r][c] != -1) {
            return dp[r][c]
        }
        val down = dfs(r + 1, c, matrix)
        val right = dfs(r, c + 1, matrix)
        val diag = dfs(r + 1, c + 1, matrix)
        dp[r][c] = 0
        if (matrix[r][c] == '1') {
            dp[r][c] = 1 + minOf(down, right, diag)
        }
        return dp[r][c]
    }
}
```

```swift
class Solution {
    private var dp: [[Int]] = []

    func maximalSquare(_ matrix: [[Character]]) -> Int {
        let ROWS = matrix.count, COLS = matrix[0].count
        dp = Array(repeating: Array(repeating: -1, count: COLS), count: ROWS)

        dfs(0, 0, matrix)
        var maxSquare = 0
        for i in 0..<ROWS {
            for j in 0..<COLS {
                maxSquare = max(maxSquare, dp[i][j])
            }
        }
        return maxSquare * maxSquare
    }

    private func dfs(_ r: Int, _ c: Int, _ matrix: [[Character]]) -> Int {
        if r >= matrix.count || c >= matrix[0].count {
            return 0
        }
        if dp[r][c] != -1 {
            return dp[r][c]
        }
        let down = dfs(r + 1, c, matrix)
        let right = dfs(r, c + 1, matrix)
        let diag = dfs(r + 1, c + 1, matrix)
        dp[r][c] = 0
        if matrix[r][c] == "1" {
            dp[r][c] = 1 + min(down, min(right, diag))
        }
        return dp[r][c]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number columns.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        m, n = len(matrix), len(matrix[0])
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        max_square = 0

        for r in range(m - 1, -1, -1):
            for c in range(n - 1, -1, -1):
                if matrix[r][c] == "1":
                    dp[r][c] = 1 + min(dp[r + 1][c], dp[r][c + 1], dp[r + 1][c + 1])
                    max_square = max(max_square, dp[r][c])

        return max_square * max_square
```

```java
public class Solution {
    public int maximalSquare(char[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int[][] dp = new int[m + 1][n + 1];
        int maxSquare = 0;

        for (int r = m - 1; r >= 0; r--) {
            for (int c = n - 1; c >= 0; c--) {
                if (matrix[r][c] == '1') {
                    dp[r][c] = 1 + Math.min(dp[r + 1][c], Math.min(dp[r][c + 1], dp[r + 1][c + 1]));
                    maxSquare = Math.max(maxSquare, dp[r][c]);
                }
            }
        }

        return maxSquare * maxSquare;
    }
}
```

```cpp
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        int maxSquare = 0;

        for (int r = m - 1; r >= 0; r--) {
            for (int c = n - 1; c >= 0; c--) {
                if (matrix[r][c] == '1') {
                    dp[r][c] = 1 + min({dp[r + 1][c], dp[r][c + 1], dp[r + 1][c + 1]});
                    maxSquare = max(maxSquare, dp[r][c]);
                }
            }
        }

        return maxSquare * maxSquare;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} matrix
     * @return {number}
     */
    maximalSquare(matrix) {
        const m = matrix.length,
            n = matrix[0].length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
        let maxSquare = 0;

        for (let r = m - 1; r >= 0; r--) {
            for (let c = n - 1; c >= 0; c--) {
                if (matrix[r][c] === '1') {
                    dp[r][c] =
                        1 +
                        Math.min(dp[r + 1][c], dp[r][c + 1], dp[r + 1][c + 1]);
                    maxSquare = Math.max(maxSquare, dp[r][c]);
                }
            }
        }

        return maxSquare * maxSquare;
    }
}
```

```csharp
public class Solution {
    public int MaximalSquare(char[][] matrix) {
        int m = matrix.Length, n = matrix[0].Length;
        int[][] dp = new int[m + 1][];
        for (int i = 0; i <= m; i++) {
            dp[i] = new int[n + 1];
        }

        int maxSquare = 0;
        for (int r = m - 1; r >= 0; r--) {
            for (int c = n - 1; c >= 0; c--) {
                if (matrix[r][c] == '1') {
                    dp[r][c] = 1 + Math.Min(dp[r + 1][c], Math.Min(dp[r][c + 1], dp[r + 1][c + 1]));
                    maxSquare = Math.Max(maxSquare, dp[r][c]);
                }
            }
        }

        return maxSquare * maxSquare;
    }
}
```

```go
func maximalSquare(matrix [][]byte) int {
    m, n := len(matrix), len(matrix[0])
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }
    maxSquare := 0

    for r := m - 1; r >= 0; r-- {
        for c := n - 1; c >= 0; c-- {
            if matrix[r][c] == '1' {
                dp[r][c] = 1 + min(dp[r+1][c], min(dp[r][c+1], dp[r+1][c+1]))
                if dp[r][c] > maxSquare {
                    maxSquare = dp[r][c]
                }
            }
        }
    }

    return maxSquare * maxSquare
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maximalSquare(matrix: Array<CharArray>): Int {
        val m = matrix.size
        val n = matrix[0].size
        val dp = Array(m + 1) { IntArray(n + 1) }
        var maxSquare = 0

        for (r in m - 1 downTo 0) {
            for (c in n - 1 downTo 0) {
                if (matrix[r][c] == '1') {
                    dp[r][c] = 1 + minOf(dp[r + 1][c], dp[r][c + 1], dp[r + 1][c + 1])
                    maxSquare = maxOf(maxSquare, dp[r][c])
                }
            }
        }

        return maxSquare * maxSquare
    }
}
```

```swift
class Solution {
    func maximalSquare(_ matrix: [[Character]]) -> Int {
        let m = matrix.count, n = matrix[0].count
        var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: m + 1)
        var maxSquare = 0

        for r in stride(from: m - 1, through: 0, by: -1) {
            for c in stride(from: n - 1, through: 0, by: -1) {
                if matrix[r][c] == "1" {
                    dp[r][c] = 1 + min(dp[r + 1][c], min(dp[r][c + 1], dp[r + 1][c + 1]))
                    maxSquare = max(maxSquare, dp[r][c])
                }
            }
        }

        return maxSquare * maxSquare
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number columns.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        m, n = len(matrix), len(matrix[0])
        dp = [0] * (n + 1)
        max_square = 0

        for r in range(m - 1, -1, -1):
            prev = 0
            for c in range(n - 1, -1, -1):
                temp = dp[c]
                if matrix[r][c] == "1":
                    dp[c] = 1 + min(dp[c], dp[c + 1], prev)
                    max_square = max(max_square, dp[c])
                else:
                    dp[c] = 0
                prev = temp

        return max_square * max_square
```

```java
public class Solution {
    public int maximalSquare(char[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int[] dp = new int[n + 1];
        int maxSquare = 0;

        for (int r = m - 1; r >= 0; r--) {
            int prev = 0;
            for (int c = n - 1; c >= 0; c--) {
                int temp = dp[c];
                if (matrix[r][c] == '1') {
                    dp[c] = 1 + Math.min(dp[c], Math.min(dp[c + 1], prev));
                    maxSquare = Math.max(maxSquare, dp[c]);
                } else {
                    dp[c] = 0;
                }
                prev = temp;
            }
        }

        return maxSquare * maxSquare;
    }
}
```

```cpp
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<int> dp(n + 1, 0);
        int maxSquare = 0;

        for (int r = m - 1; r >= 0; r--) {
            int prev = 0;
            for (int c = n - 1; c >= 0; c--) {
                int temp = dp[c];
                if (matrix[r][c] == '1') {
                    dp[c] = 1 + min({dp[c], dp[c + 1], prev});
                    maxSquare = max(maxSquare, dp[c]);
                } else {
                    dp[c] = 0;
                }
                prev = temp;
            }
        }

        return maxSquare * maxSquare;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} matrix
     * @return {number}
     */
    maximalSquare(matrix) {
        const m = matrix.length,
            n = matrix[0].length;
        const dp = new Array(n + 1).fill(0);
        let maxSquare = 0;
        let prev = 0;

        for (let r = m - 1; r >= 0; r--) {
            for (let c = n - 1; c >= 0; c--) {
                const temp = dp[c];
                if (matrix[r][c] === '1') {
                    dp[c] = 1 + Math.min(dp[c], dp[c + 1], prev);
                    maxSquare = Math.max(maxSquare, dp[c]);
                } else {
                    dp[c] = 0;
                }
                prev = temp;
            }
        }

        return maxSquare * maxSquare;
    }
}
```

```csharp
public class Solution {
    public int MaximalSquare(char[][] matrix) {
        int m = matrix.Length, n = matrix[0].Length;
        int[] dp = new int[n + 1];
        int maxSquare = 0;

        for (int r = m - 1; r >= 0; r--) {
            int prev = 0;
            for (int c = n - 1; c >= 0; c--) {
                int temp = dp[c];
                if (matrix[r][c] == '1') {
                    dp[c] = 1 + Math.Min(dp[c], Math.Min(dp[c + 1], prev));
                    maxSquare = Math.Max(maxSquare, dp[c]);
                } else {
                    dp[c] = 0;
                }
                prev = temp;
            }
        }

        return maxSquare * maxSquare;
    }
}
```

```go
func maximalSquare(matrix [][]byte) int {
    m, n := len(matrix), len(matrix[0])
    dp := make([]int, n+1)
    maxSquare := 0

    for r := m - 1; r >= 0; r-- {
        prev := 0
        for c := n - 1; c >= 0; c-- {
            temp := dp[c]
            if matrix[r][c] == '1' {
                dp[c] = 1 + min(dp[c], min(dp[c+1], prev))
                if dp[c] > maxSquare {
                    maxSquare = dp[c]
                }
            } else {
                dp[c] = 0
            }
            prev = temp
        }
    }

    return maxSquare * maxSquare
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maximalSquare(matrix: Array<CharArray>): Int {
        val m = matrix.size
        val n = matrix[0].size
        val dp = IntArray(n + 1)
        var maxSquare = 0

        for (r in m - 1 downTo 0) {
            var prev = 0
            for (c in n - 1 downTo 0) {
                val temp = dp[c]
                if (matrix[r][c] == '1') {
                    dp[c] = 1 + minOf(dp[c], dp[c + 1], prev)
                    maxSquare = maxOf(maxSquare, dp[c])
                } else {
                    dp[c] = 0
                }
                prev = temp
            }
        }

        return maxSquare * maxSquare
    }
}
```

```swift
class Solution {
    func maximalSquare(_ matrix: [[Character]]) -> Int {
        let m = matrix.count, n = matrix[0].count
        var dp = Array(repeating: 0, count: n + 1)
        var maxSquare = 0

        for r in stride(from: m - 1, through: 0, by: -1) {
            var prev = 0
            for c in stride(from: n - 1, through: 0, by: -1) {
                let temp = dp[c]
                if matrix[r][c] == "1" {
                    dp[c] = 1 + min(dp[c], min(dp[c + 1], prev))
                    maxSquare = max(maxSquare, dp[c])
                } else {
                    dp[c] = 0
                }
                prev = temp
            }
        }

        return maxSquare * maxSquare
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(n)$

> Where $m$ is the number of rows and $n$ is the number columns.
