## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Dynamic Programming (2D)** - The solution requires a 2D DP table to track palindrome lengths for substrings defined by two indices
- **Recursion with Memoization** - Top-down approaches use recursive calls with caching to avoid recomputation
- **Longest Common Subsequence (LCS)** - One approach reduces this problem to finding the LCS between the string and its reverse
- **String Manipulation** - Understanding how to work with substrings and character comparisons

---

## 1. Dynamic Programming (Top Down)

### Intuition

A palindrome reads the same forwards and backwards, so we can think of building one by expanding outward from a center. For each possible center (single character for odd length, between two characters for even length), we try to extend the palindrome by checking if the characters on both sides match.

If the characters match, we include both in our subsequence and continue expanding. If they don't match, we have a choice: skip the left character or skip the right character, and take whichever gives a longer result. Memoization prevents us from recomputing the same subproblems.

### Algorithm

1. Create a 2D memoization table `dp` where `dp[i][j]` stores the longest palindromic subsequence that can be formed starting at index `i` and ending at index `j`.
2. Define a recursive function `dfs(i, j)` that:
   - Returns `0` if indices are out of bounds.
   - Returns the cached result if already computed.
   - If characters at `i` and `j` match, adds `1` (if same index) or `2` (different indices) plus the result of expanding outward.
   - Otherwise, takes the maximum of skipping either the left or right character.
3. Call `dfs` for all possible centers (both odd and even length palindromes).
4. Return the maximum value found in the DP table.

::tabs-start

```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        dp = [[-1] * n for _ in range(n)]

        def dfs(i, j):
            if i < 0 or j == n:
                return 0
            if dp[i][j] != -1:
                return dp[i][j]

            if s[i] == s[j]:
                length = 1 if i == j else 2
                dp[i][j] = length + dfs(i - 1, j + 1)
            else:
                dp[i][j] = max(dfs(i - 1, j), dfs(i, j + 1))

            return dp[i][j]

        for i in range(n):
            dfs(i, i)  # odd length
            dfs(i, i + 1)  # even length

        return max(max(row) for row in dp if row != -1)
```

```java
public class Solution {
    private int[][] dp;

    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        dp = new int[n][n];

        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }

        for (int i = 0; i < n; i++) {
            dfs(i, i, s);       // Odd length
            dfs(i, i + 1, s);   // Even length
        }

        int maxLength = 0;
        for (int[] row : dp) {
            for (int val : row) {
                maxLength = Math.max(maxLength, val);
            }
        }

        return maxLength;
    }

    private int dfs(int i, int j, String s) {
        if (i < 0 || j == s.length()) {
            return 0;
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }

        if (s.charAt(i) == s.charAt(j)) {
            int length = (i == j) ? 1 : 2;
            dp[i][j] = length + dfs(i - 1, j + 1, s);
        } else {
            dp[i][j] = Math.max(dfs(i - 1, j, s), dfs(i, j + 1, s));
        }

        return dp[i][j];
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    int longestPalindromeSubseq(string s) {
        int n = s.size();
        dp.resize(n, vector<int>(n, -1));

        for (int i = 0; i < n; i++) {
            dfs(i, i, s);       // Odd length
            dfs(i, i + 1, s);   // Even length
        }

        int maxLength = 0;
        for (const auto& row : dp) {
            for (int val : row) {
                maxLength = max(maxLength, val);
            }
        }

        return maxLength;
    }

private:
    int dfs(int i, int j, const string& s) {
        if (i < 0 || j == s.size()) {
            return 0;
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }

        if (s[i] == s[j]) {
            int length = (i == j) ? 1 : 2;
            dp[i][j] = length + dfs(i - 1, j + 1, s);
        } else {
            dp[i][j] = max(dfs(i - 1, j, s), dfs(i, j + 1, s));
        }

        return dp[i][j];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindromeSubseq(s) {
        const n = s.length;
        const dp = Array.from({ length: n }, () => Array(n).fill(-1));

        const dfs = (i, j) => {
            if (i < 0 || j === n) {
                return 0;
            }
            if (dp[i][j] !== -1) {
                return dp[i][j];
            }

            if (s[i] === s[j]) {
                const length = i === j ? 1 : 2;
                dp[i][j] = length + dfs(i - 1, j + 1);
            } else {
                dp[i][j] = Math.max(dfs(i - 1, j), dfs(i, j + 1));
            }

            return dp[i][j];
        };

        for (let i = 0; i < n; i++) {
            dfs(i, i); // Odd length
            dfs(i, i + 1); // Even length
        }

        let maxLength = 0;
        for (const row of dp) {
            for (const val of row) {
                maxLength = Math.max(maxLength, val);
            }
        }

        return maxLength;
    }
}
```

```csharp
public class Solution {
    private int[,] dp;

    public int LongestPalindromeSubseq(string s) {
        int n = s.Length;
        dp = new int[n, n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                dp[i, j] = -1;
            }
        }

        for (int i = 0; i < n; i++) {
            Dfs(i, i, s);      // Odd length
            Dfs(i, i + 1, s);  // Even length
        }

        int maxLength = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                maxLength = Math.Max(maxLength, dp[i, j]);
            }
        }

        return maxLength;
    }

    private int Dfs(int i, int j, string s) {
        if (i < 0 || j == s.Length) {
            return 0;
        }
        if (dp[i, j] != -1) {
            return dp[i, j];
        }

        if (s[i] == s[j]) {
            int length = (i == j) ? 1 : 2;
            dp[i, j] = length + Dfs(i - 1, j + 1, s);
        } else {
            dp[i, j] = Math.Max(Dfs(i - 1, j, s), Dfs(i, j + 1, s));
        }

        return dp[i, j];
    }
}
```

```go
func longestPalindromeSubseq(s string) int {
    n := len(s)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, n)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i < 0 || j == n {
            return 0
        }
        if dp[i][j] != -1 {
            return dp[i][j]
        }

        if s[i] == s[j] {
            length := 2
            if i == j {
                length = 1
            }
            dp[i][j] = length + dfs(i-1, j+1)
        } else {
            dp[i][j] = max(dfs(i-1, j), dfs(i, j+1))
        }

        return dp[i][j]
    }

    for i := 0; i < n; i++ {
        dfs(i, i)     // Odd length
        dfs(i, i+1)   // Even length
    }

    maxLength := 0
    for i := 0; i < n; i++ {
        for j := 0; j < n; j++ {
            if dp[i][j] > maxLength {
                maxLength = dp[i][j]
            }
        }
    }

    return maxLength
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private lateinit var dp: Array<IntArray>

    fun longestPalindromeSubseq(s: String): Int {
        val n = s.length
        dp = Array(n) { IntArray(n) { -1 } }

        for (i in 0 until n) {
            dfs(i, i, s)       // Odd length
            dfs(i, i + 1, s)   // Even length
        }

        var maxLength = 0
        for (row in dp) {
            for (value in row) {
                maxLength = maxOf(maxLength, value)
            }
        }

        return maxLength
    }

    private fun dfs(i: Int, j: Int, s: String): Int {
        if (i < 0 || j == s.length) {
            return 0
        }
        if (dp[i][j] != -1) {
            return dp[i][j]
        }

        dp[i][j] = if (s[i] == s[j]) {
            val length = if (i == j) 1 else 2
            length + dfs(i - 1, j + 1, s)
        } else {
            maxOf(dfs(i - 1, j, s), dfs(i, j + 1, s))
        }

        return dp[i][j]
    }
}
```

```swift
class Solution {
    func longestPalindromeSubseq(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var dp = [[Int]](repeating: [Int](repeating: -1, count: n), count: n)

        func dfs(_ i: Int, _ j: Int) -> Int {
            if i < 0 || j == n {
                return 0
            }
            if dp[i][j] != -1 {
                return dp[i][j]
            }

            if chars[i] == chars[j] {
                let length = (i == j) ? 1 : 2
                dp[i][j] = length + dfs(i - 1, j + 1)
            } else {
                dp[i][j] = max(dfs(i - 1, j), dfs(i, j + 1))
            }

            return dp[i][j]
        }

        for i in 0..<n {
            _ = dfs(i, i)      // Odd length
            _ = dfs(i, i + 1)  // Even length
        }

        var maxLength = 0
        for row in dp {
            for val in row {
                maxLength = max(maxLength, val)
            }
        }

        return maxLength
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 2. Dynamic Programming (Top-Down Optimized)

### Intuition

Instead of expanding from centers, we can approach this problem by considering the entire string and shrinking inward. We define our subproblem as finding the longest palindromic subsequence within the substring from index `i` to index `j`.

When the first and last characters match, they can both be part of our palindrome, so we add 2 and solve for the inner substring. When they don't match, one of them must be excluded, so we try both options and take the better one.

### Algorithm

1. Create a memoization cache (hash map or 2D array) to store computed results.
2. Define a recursive function `dfs(i, j)` that:
   - Returns `0` if `i > j` (empty substring).
   - Returns `1` if `i == j` (single character is a palindrome of length `1`).
   - Returns the cached result if already computed.
   - If `s[i] == s[j]`, returns `2 + dfs(i+1, j-1)`.
   - Otherwise, returns `max(dfs(i+1, j), dfs(i, j-1))`.
3. Call `dfs(0, n-1)` to get the answer for the entire string.

::tabs-start

```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        cache = {}

        def dfs(i, j):
            if i > j:
                return 0
            if i == j:
                return 1
            if (i, j) in cache:
                return cache[(i, j)]

            if s[i] == s[j]:
                cache[(i, j)] = dfs(i + 1, j - 1) + 2
            else:
                cache[(i, j)] = max(dfs(i + 1, j), dfs(i, j - 1))

            return cache[(i, j)]

        return dfs(0, len(s) - 1)
```

```java
public class Solution {
    private int[][] dp;

    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        dp = new int[n][n];

        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }

        return dfs(0, n - 1, s);
    }

    private int dfs(int i, int j, String s) {
        if (i > j) {
            return 0;
        }
        if (i == j) {
            return 1;
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }

        if (s.charAt(i) == s.charAt(j)) {
            dp[i][j] = dfs(i + 1, j - 1, s) + 2;
        } else {
            dp[i][j] = Math.max(dfs(i + 1, j, s), dfs(i, j - 1, s));
        }

        return dp[i][j];
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    int longestPalindromeSubseq(string s) {
        int n = s.size();
        dp.resize(n, vector<int>(n, -1));
        return dfs(0, n - 1, s);
    }

private:
    int dfs(int i, int j, const string& s) {
        if (i > j) {
            return 0;
        }
        if (i == j) {
            return 1;
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }

        if (s[i] == s[j]) {
            dp[i][j] = dfs(i + 1, j - 1, s) + 2;
        } else {
            dp[i][j] = max(dfs(i + 1, j, s), dfs(i, j - 1, s));
        }

        return dp[i][j];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindromeSubseq(s) {
        const n = s.length;
        const dp = Array.from({ length: n }, () => Array(n).fill(-1));

        const dfs = (i, j) => {
            if (i > j) {
                return 0;
            }
            if (i === j) {
                return 1;
            }
            if (dp[i][j] !== -1) {
                return dp[i][j];
            }

            if (s[i] === s[j]) {
                dp[i][j] = dfs(i + 1, j - 1) + 2;
            } else {
                dp[i][j] = Math.max(dfs(i + 1, j), dfs(i, j - 1));
            }

            return dp[i][j];
        };

        return dfs(0, n - 1);
    }
}
```

```csharp
public class Solution {
    private int[,] dp;

    public int LongestPalindromeSubseq(string s) {
        int n = s.Length;
        dp = new int[n, n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                dp[i, j] = -1;
            }
        }

        return Dfs(0, n - 1, s);
    }

    private int Dfs(int i, int j, string s) {
        if (i > j) {
            return 0;
        }
        if (i == j) {
            return 1;
        }
        if (dp[i, j] != -1) {
            return dp[i, j];
        }

        if (s[i] == s[j]) {
            dp[i, j] = Dfs(i + 1, j - 1, s) + 2;
        } else {
            dp[i, j] = Math.Max(Dfs(i + 1, j, s), Dfs(i, j - 1, s));
        }

        return dp[i, j];
    }
}
```

```go
func longestPalindromeSubseq(s string) int {
    n := len(s)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, n)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i > j {
            return 0
        }
        if i == j {
            return 1
        }
        if dp[i][j] != -1 {
            return dp[i][j]
        }

        if s[i] == s[j] {
            dp[i][j] = dfs(i+1, j-1) + 2
        } else {
            dp[i][j] = max(dfs(i+1, j), dfs(i, j-1))
        }

        return dp[i][j]
    }

    return dfs(0, n-1)
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private lateinit var dp: Array<IntArray>

    fun longestPalindromeSubseq(s: String): Int {
        val n = s.length
        dp = Array(n) { IntArray(n) { -1 } }
        return dfs(0, n - 1, s)
    }

    private fun dfs(i: Int, j: Int, s: String): Int {
        if (i > j) {
            return 0
        }
        if (i == j) {
            return 1
        }
        if (dp[i][j] != -1) {
            return dp[i][j]
        }

        dp[i][j] = if (s[i] == s[j]) {
            dfs(i + 1, j - 1, s) + 2
        } else {
            maxOf(dfs(i + 1, j, s), dfs(i, j - 1, s))
        }

        return dp[i][j]
    }
}
```

```swift
class Solution {
    func longestPalindromeSubseq(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var dp = [[Int]](repeating: [Int](repeating: -1, count: n), count: n)

        func dfs(_ i: Int, _ j: Int) -> Int {
            if i > j {
                return 0
            }
            if i == j {
                return 1
            }
            if dp[i][j] != -1 {
                return dp[i][j]
            }

            if chars[i] == chars[j] {
                dp[i][j] = dfs(i + 1, j - 1) + 2
            } else {
                dp[i][j] = max(dfs(i + 1, j), dfs(i, j - 1))
            }

            return dp[i][j]
        }

        return dfs(0, n - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Using LCS Idea)

### Intuition

A clever observation: the longest palindromic subsequence of a string is the same as the longest common subsequence (LCS) between the string and its reverse. Why? Any palindromic subsequence appears in the same order when read forwards or backwards, making it a common subsequence of both strings.

This transforms our problem into the classic LCS problem, which has a well-known dynamic programming solution.

### Algorithm

1. Create the reverse of the input string.
2. Use the standard LCS algorithm:
   - Create a 2D DP table where `dp[i][j]` represents the LCS length of the first `i` characters of the original string and the first `j` characters of the reversed string.
   - If characters match, `dp[i+1][j+1] = dp[i][j] + 1`.
   - Otherwise, `dp[i+1][j+1] = max(dp[i+1][j], dp[i][j+1])`.
3. Return `dp[n][n]` as the final answer.

::tabs-start

```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        return self.longestCommonSubsequence(s, s[::-1])

    def longestCommonSubsequence(self, s1: str, s2: str) -> int:
        N, M = len(s1), len(s2)
        dp = [[0] * (M + 1) for _ in range(N + 1)]

        for i in range(N):
            for j in range(M):
                if s1[i] == s2[j]:
                    dp[i + 1][j + 1] = 1 + dp[i][j]
                else:
                    dp[i + 1][j + 1] = max(dp[i + 1][j], dp[i][j + 1])

        return dp[N][M]
```

```java
public class Solution {
    public int longestPalindromeSubseq(String s) {
        return longestCommonSubsequence(s, new StringBuilder(s).reverse().toString());
    }

    public int longestCommonSubsequence(String s1, String s2) {
        int N = s1.length(), M = s2.length();
        int[][] dp = new int[N + 1][M + 1];

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (s1.charAt(i) == s2.charAt(j)) {
                    dp[i + 1][j + 1] = 1 + dp[i][j];
                } else {
                    dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
        }

        return dp[N][M];
    }
}
```

```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        string reversedS = s;
        reverse(reversedS.begin(), reversedS.end());
        return longestCommonSubsequence(s, reversedS);
    }

    int longestCommonSubsequence(const string& s1, const string& s2) {
        int N = s1.size(), M = s2.size();
        vector<vector<int>> dp(N + 1, vector<int>(M + 1, 0));

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (s1[i] == s2[j]) {
                    dp[i + 1][j + 1] = 1 + dp[i][j];
                } else {
                    dp[i + 1][j + 1] = max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
        }

        return dp[N][M];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindromeSubseq(s) {
        return this.longestCommonSubsequence(s, s.split('').reverse().join(''));
    }

    /**
     * @param {string} s1
     * @param {string} s2
     * @return {number}
     */
    longestCommonSubsequence(s1, s2) {
        const N = s1.length,
            M = s2.length;
        const dp = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                if (s1[i] === s2[j]) {
                    dp[i + 1][j + 1] = 1 + dp[i][j];
                } else {
                    dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
        }

        return dp[N][M];
    }
}
```

```csharp
public class Solution {
    public int LongestPalindromeSubseq(string s) {
        char[] arr = s.ToCharArray();
        Array.Reverse(arr);
        return LongestCommonSubsequence(s, new string(arr));
    }

    private int LongestCommonSubsequence(string s1, string s2) {
        int N = s1.Length, M = s2.Length;
        int[,] dp = new int[N + 1, M + 1];

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (s1[i] == s2[j]) {
                    dp[i + 1, j + 1] = 1 + dp[i, j];
                } else {
                    dp[i + 1, j + 1] = Math.Max(dp[i + 1, j], dp[i, j + 1]);
                }
            }
        }

        return dp[N, M];
    }
}
```

```go
func longestPalindromeSubseq(s string) int {
    reversed := reverse(s)
    return longestCommonSubsequence(s, reversed)
}

func reverse(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}

func longestCommonSubsequence(s1, s2 string) int {
    N, M := len(s1), len(s2)
    dp := make([][]int, N+1)
    for i := range dp {
        dp[i] = make([]int, M+1)
    }

    for i := 0; i < N; i++ {
        for j := 0; j < M; j++ {
            if s1[i] == s2[j] {
                dp[i+1][j+1] = 1 + dp[i][j]
            } else {
                dp[i+1][j+1] = max(dp[i+1][j], dp[i][j+1])
            }
        }
    }

    return dp[N][M]
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun longestPalindromeSubseq(s: String): Int {
        return longestCommonSubsequence(s, s.reversed())
    }

    private fun longestCommonSubsequence(s1: String, s2: String): Int {
        val N = s1.length
        val M = s2.length
        val dp = Array(N + 1) { IntArray(M + 1) }

        for (i in 0 until N) {
            for (j in 0 until M) {
                if (s1[i] == s2[j]) {
                    dp[i + 1][j + 1] = 1 + dp[i][j]
                } else {
                    dp[i + 1][j + 1] = maxOf(dp[i + 1][j], dp[i][j + 1])
                }
            }
        }

        return dp[N][M]
    }
}
```

```swift
class Solution {
    func longestPalindromeSubseq(_ s: String) -> Int {
        return longestCommonSubsequence(s, String(s.reversed()))
    }

    private func longestCommonSubsequence(_ s1: String, _ s2: String) -> Int {
        let arr1 = Array(s1)
        let arr2 = Array(s2)
        let N = arr1.count
        let M = arr2.count
        var dp = [[Int]](repeating: [Int](repeating: 0, count: M + 1), count: N + 1)

        for i in 0..<N {
            for j in 0..<M {
                if arr1[i] == arr2[j] {
                    dp[i + 1][j + 1] = 1 + dp[i][j]
                } else {
                    dp[i + 1][j + 1] = max(dp[i + 1][j], dp[i][j + 1])
                }
            }
        }

        return dp[N][M]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

The bottom-up DP approach can be optimized for space. When filling the DP table, each cell only depends on cells from the current and previous rows (or in this formulation, the current row and the previous diagonal value). By processing in the right order and keeping track of just the necessary values, we can reduce space from O(n^2) to O(n).

### Algorithm

1. Create a 1D DP array of size `n`.
2. Iterate `i` from `n-1` down to `0`:
   - Set `dp[i] = 1` (single character palindrome).
   - Track `prev` to store the previous diagonal value.
   - For each `j` from `i+1` to `n-1`:
     - Save current `dp[j]` before updating.
     - If `s[i] == s[j]`, set `dp[j] = prev + 2`.
     - Otherwise, set `dp[j] = max(dp[j], dp[j-1])`.
     - Update `prev` with the saved value.
3. Return `dp[n-1]`.

::tabs-start

```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        dp = [0] * n

        for i in range(n - 1, -1, -1):
            dp[i] = 1
            prev = 0
            for j in range(i + 1, n):
                temp = dp[j]

                if s[i] == s[j]:
                    dp[j] = prev + 2
                else:
                    dp[j] = max(dp[j], dp[j - 1])

                prev = temp

        return dp[n - 1]
```

```java
public class Solution {
    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        int[] dp = new int[n];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = 1;
            int prev = 0;
            for (int j = i + 1; j < n; j++) {
                int temp = dp[j];

                if (s.charAt(i) == s.charAt(j)) {
                    dp[j] = prev + 2;
                } else {
                    dp[j] = Math.max(dp[j], dp[j - 1]);
                }
                prev = temp;
            }
        }

        return dp[n - 1];
    }
}
```

```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        int n = s.size();
        vector<int> dp(n, 0);

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = 1;
            int prev = 0;
            for (int j = i + 1; j < n; j++) {
                int temp = dp[j];

                if (s[i] == s[j]) {
                    dp[j] = prev + 2;
                } else {
                    dp[j] = max(dp[j], dp[j - 1]);
                }

                prev = temp;
            }
        }

        return dp[n - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindromeSubseq(s) {
        const n = s.length;
        const dp = new Array(n).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            dp[i] = 1;
            let prev = 0;
            for (let j = i + 1; j < n; j++) {
                const temp = dp[j];

                if (s[i] === s[j]) {
                    dp[j] = prev + 2;
                } else {
                    dp[j] = Math.max(dp[j], dp[j - 1]);
                }

                prev = temp;
            }
        }

        return dp[n - 1];
    }
}
```

```csharp
public class Solution {
    public int LongestPalindromeSubseq(string s) {
        int n = s.Length;
        int[] dp = new int[n];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = 1;
            int prev = 0;
            for (int j = i + 1; j < n; j++) {
                int temp = dp[j];

                if (s[i] == s[j]) {
                    dp[j] = prev + 2;
                } else {
                    dp[j] = Math.Max(dp[j], dp[j - 1]);
                }

                prev = temp;
            }
        }

        return dp[n - 1];
    }
}
```

```go
func longestPalindromeSubseq(s string) int {
    n := len(s)
    dp := make([]int, n)

    for i := n - 1; i >= 0; i-- {
        dp[i] = 1
        prev := 0
        for j := i + 1; j < n; j++ {
            temp := dp[j]

            if s[i] == s[j] {
                dp[j] = prev + 2
            } else {
                if dp[j-1] > dp[j] {
                    dp[j] = dp[j-1]
                }
            }

            prev = temp
        }
    }

    return dp[n-1]
}
```

```kotlin
class Solution {
    fun longestPalindromeSubseq(s: String): Int {
        val n = s.length
        val dp = IntArray(n)

        for (i in n - 1 downTo 0) {
            dp[i] = 1
            var prev = 0
            for (j in i + 1 until n) {
                val temp = dp[j]

                if (s[i] == s[j]) {
                    dp[j] = prev + 2
                } else {
                    dp[j] = maxOf(dp[j], dp[j - 1])
                }

                prev = temp
            }
        }

        return dp[n - 1]
    }
}
```

```swift
class Solution {
    func longestPalindromeSubseq(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var dp = [Int](repeating: 0, count: n)

        for i in stride(from: n - 1, through: 0, by: -1) {
            dp[i] = 1
            var prev = 0
            for j in (i + 1)..<n {
                let temp = dp[j]

                if chars[i] == chars[j] {
                    dp[j] = prev + 2
                } else {
                    dp[j] = max(dp[j], dp[j - 1])
                }

                prev = temp
            }
        }

        return dp[n - 1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Confusing Subsequence with Substring

A subsequence does not require contiguous characters, while a substring does. For the string `"bbbab"`, the longest palindromic subsequence is `"bbbb"` (length 4), but the longest palindromic substring is `"bbb"` (length 3). Make sure your solution allows skipping characters when they do not contribute to the palindrome.

### Incorrect Base Case Handling

When implementing the recursive or DP solution, a common error is mishandling the base cases. A single character (`i == j`) is always a palindrome of length 1, and when `i > j` (empty range), the length is 0. Forgetting to return 1 for single characters or incorrectly initializing the DP table leads to off-by-one errors.

### Wrong Iteration Order in Bottom-Up DP

In the bottom-up approach, the DP table must be filled in the correct order so that smaller subproblems are solved before larger ones. You need to iterate `i` from `n-1` down to `0` and `j` from `i` to `n-1`. Iterating in the wrong direction causes the algorithm to read uncomputed values, producing incorrect results.
