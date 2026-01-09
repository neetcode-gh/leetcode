## 1. Recursion

### Intuition

To check if `s` is a subsequence of `t`, we need to find all characters of `s` in `t` in the same order, though not necessarily contiguous. Recursively, we compare the current characters of both strings: if they match, we advance both pointers; if they do not match, we only advance the pointer in `t` to continue searching. The base cases are reaching the end of `s` (success) or the end of `t` before finishing `s` (failure).

### Algorithm

1. Define a recursive function `rec(i, j)` where `i` is the index in `s` and `j` is the index in `t`.
2. Base cases:
   - If `i == len(s)`, all characters matched, return true.
   - If `j == len(t)`, ran out of characters in `t`, return false.
3. If `s[i] == t[j]`, both characters match, so recurse with `rec(i + 1, j + 1)`.
4. Otherwise, skip the current character in `t` and recurse with `rec(i, j + 1)`.
5. Start with `rec(0, 0)`.

::tabs-start

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        def rec(i, j):
            if i == len(s):
                return True
            if j == len(t):
                return False

            if s[i] == t[j]:
                return rec(i + 1, j + 1)
            return rec(i, j + 1)
        return rec(0, 0)
```

```java
public class Solution {
    public boolean isSubsequence(String s, String t) {
        return rec(s, t, 0, 0);
    }

    private boolean rec(String s, String t, int i, int j) {
        if (i == s.length()) return true;
        if (j == t.length()) return false;
        if (s.charAt(i) == t.charAt(j)) {
            return rec(s, t, i + 1, j + 1);
        }
        return rec(s, t, i, j + 1);
    }
}
```

```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        return rec(s, t, 0, 0);
    }

private:
    bool rec(string& s, string& t, int i, int j) {
        if (i == s.size()) return true;
        if (j == t.size()) return false;
        if (s[i] == t[j]) {
            return rec(s, t, i + 1, j + 1);
        }
        return rec(s, t, i, j + 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isSubsequence(s, t) {
        const rec = (i, j) => {
            if (i === s.length) return true;
            if (j === t.length) return false;
            if (s[i] === t[j]) return rec(i + 1, j + 1);
            return rec(i, j + 1);
        };
        return rec(0, 0);
    }
}
```

```csharp
public class Solution {
    public bool IsSubsequence(string s, string t) {
        return Rec(0, 0, s, t);
    }

    private bool Rec(int i, int j, string s, string t) {
        if (i == s.Length) return true;
        if (j == t.Length) return false;

        if (s[i] == t[j]) {
            return Rec(i + 1, j + 1, s, t);
        }
        return Rec(i, j + 1, s, t);
    }
}
```

```go
func isSubsequence(s string, t string) bool {
    var rec func(i, j int) bool
    rec = func(i, j int) bool {
        if i == len(s) {
            return true
        }
        if j == len(t) {
            return false
        }
        if s[i] == t[j] {
            return rec(i+1, j+1)
        }
        return rec(i, j+1)
    }
    return rec(0, 0)
}
```

```kotlin
class Solution {
    fun isSubsequence(s: String, t: String): Boolean {
        fun rec(i: Int, j: Int): Boolean {
            if (i == s.length) return true
            if (j == t.length) return false
            return if (s[i] == t[j]) {
                rec(i + 1, j + 1)
            } else {
                rec(i, j + 1)
            }
        }
        return rec(0, 0)
    }
}
```

```swift
class Solution {
    func isSubsequence(_ s: String, _ t: String) -> Bool {
        let sArr = Array(s)
        let tArr = Array(t)

        func rec(_ i: Int, _ j: Int) -> Bool {
            if i == sArr.count { return true }
            if j == tArr.count { return false }
            if sArr[i] == tArr[j] {
                return rec(i + 1, j + 1)
            }
            return rec(i, j + 1)
        }
        return rec(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution may recompute the same subproblems multiple times. By adding memoization, we cache the result for each `(i, j)` state so that each pair is computed at most once. This transforms the exponential worst case into a polynomial time solution while keeping the recursive structure intact.

### Algorithm

1. Create a 2D memo table initialized to -1.
2. Define a recursive function `rec(i, j)`:
   - Base cases same as before.
   - If `memo[i][j]` is already computed, return the cached result.
   - Compute the result based on whether characters match or not.
   - Store the result in `memo[i][j]` and return it.
3. Call `rec(0, 0)`.

::tabs-start

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        n, m = len(s), len(t)
        memo = [[-1] * m for _ in range(n)]

        def rec(i, j):
            if i == n:
                return True
            if j == m:
                return False
            if memo[i][j] != -1:
                return memo[i][j] == 1
            if s[i] == t[j]:
                memo[i][j] = 1 if rec(i + 1, j + 1) else 0
            else:
                memo[i][j] = 1 if rec(i, j + 1) else 0
            return memo[i][j] == 1

        return rec(0, 0)
```

```java
public class Solution {
    public boolean isSubsequence(String s, String t) {
        int n = s.length(), m = t.length();
        int[][] memo = new int[n][m];
        for (int[] row : memo) {
            Arrays.fill(row, -1);
        }
        return rec(s, t, 0, 0, memo);
    }

    private boolean rec(String s, String t, int i, int j, int[][] memo) {
        if (i == s.length()) return true;
        if (j == t.length()) return false;
        if (memo[i][j] != -1) return memo[i][j] == 1;
        if (s.charAt(i) == t.charAt(j)) {
            memo[i][j] = rec(s, t, i + 1, j + 1, memo) ? 1 : 0;
        } else {
            memo[i][j] = rec(s, t, i, j + 1, memo) ? 1 : 0;
        }
        return memo[i][j] == 1;
    }
}
```

```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int n = s.size(), m = t.size();
        vector<vector<int>> memo(n, vector<int>(m, -1));
        return rec(s, t, 0, 0, memo);
    }

private:
    bool rec(string& s, string& t, int i, int j, vector<vector<int>>& memo) {
        if (i == s.size()) return true;
        if (j == t.size()) return false;
        if (memo[i][j] != -1) return memo[i][j] == 1;
        if (s[i] == t[j]) {
            memo[i][j] = rec(s, t, i + 1, j + 1, memo) ? 1 : 0;
        } else {
            memo[i][j] = rec(s, t, i, j + 1, memo) ? 1 : 0;
        }
        return memo[i][j] == 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isSubsequence(s, t) {
        const n = s.length,
            m = t.length;
        const memo = Array.from({ length: n }, () => Array(m).fill(-1));

        const rec = (i, j) => {
            if (i === n) return true;
            if (j === m) return false;
            if (memo[i][j] !== -1) return memo[i][j] === 1;
            if (s[i] === t[j]) {
                memo[i][j] = rec(i + 1, j + 1) ? 1 : 0;
            } else {
                memo[i][j] = rec(i, j + 1) ? 1 : 0;
            }
            return memo[i][j] === 1;
        };

        return rec(0, 0);
    }
}
```

```csharp
public class Solution {
    public bool IsSubsequence(string s, string t) {
        int n = s.Length, m = t.Length;
        int[,] memo = new int[n, m];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                memo[i, j] = -1;

        bool Rec(int i, int j) {
            if (i == n) return true;
            if (j == m) return false;
            if (memo[i, j] != -1) return memo[i, j] == 1;

            if (s[i] == t[j]) {
                memo[i, j] = Rec(i + 1, j + 1) ? 1 : 0;
            } else {
                memo[i, j] = Rec(i, j + 1) ? 1 : 0;
            }
            return memo[i, j] == 1;
        }

        return Rec(0, 0);
    }
}
```

```go
func isSubsequence(s string, t string) bool {
    n, m := len(s), len(t)
    memo := make([][]int, n)
    for i := range memo {
        memo[i] = make([]int, m)
        for j := range memo[i] {
            memo[i][j] = -1
        }
    }

    var rec func(i, j int) bool
    rec = func(i, j int) bool {
        if i == n {
            return true
        }
        if j == m {
            return false
        }
        if memo[i][j] != -1 {
            return memo[i][j] == 1
        }
        if s[i] == t[j] {
            if rec(i+1, j+1) {
                memo[i][j] = 1
            } else {
                memo[i][j] = 0
            }
        } else {
            if rec(i, j+1) {
                memo[i][j] = 1
            } else {
                memo[i][j] = 0
            }
        }
        return memo[i][j] == 1
    }

    return rec(0, 0)
}
```

```kotlin
class Solution {
    fun isSubsequence(s: String, t: String): Boolean {
        val n = s.length
        val m = t.length
        val memo = Array(n) { IntArray(m) { -1 } }

        fun rec(i: Int, j: Int): Boolean {
            if (i == n) return true
            if (j == m) return false
            if (memo[i][j] != -1) return memo[i][j] == 1

            memo[i][j] = if (s[i] == t[j]) {
                if (rec(i + 1, j + 1)) 1 else 0
            } else {
                if (rec(i, j + 1)) 1 else 0
            }
            return memo[i][j] == 1
        }

        return rec(0, 0)
    }
}
```

```swift
class Solution {
    func isSubsequence(_ s: String, _ t: String) -> Bool {
        let sArr = Array(s)
        let tArr = Array(t)
        let n = sArr.count, m = tArr.count
        var memo = [[Int]](repeating: [Int](repeating: -1, count: m), count: max(n, 1))

        func rec(_ i: Int, _ j: Int) -> Bool {
            if i == n { return true }
            if j == m { return false }
            if memo[i][j] != -1 { return memo[i][j] == 1 }

            if sArr[i] == tArr[j] {
                memo[i][j] = rec(i + 1, j + 1) ? 1 : 0
            } else {
                memo[i][j] = rec(i, j + 1) ? 1 : 0
            }
            return memo[i][j] == 1
        }

        return rec(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of recursion with memoization, we can fill a DP table iteratively from the end of both strings toward the beginning. The value `dp[i][j]` represents whether `s[i:]` is a subsequence of `t[j:]`. If the characters match, we look at `dp[i+1][j+1]`. Otherwise, we look at `dp[i][j+1]` (skip the character in `t`). The base case is that any suffix of `s` starting at `len(s)` is trivially a subsequence of anything (empty string).

### Algorithm

1. Create a 2D DP table of size `(n+1) x (m+1)` initialized to false.
2. Set `dp[n][j] = true` for all `j` (empty remainder of `s` is always a subsequence).
3. Iterate `i` from `n-1` down to 0, and `j` from `m-1` down to 0:
   - If `s[i] == t[j]`, set `dp[i][j] = dp[i+1][j+1]`.
   - Otherwise, set `dp[i][j] = dp[i][j+1]`.
4. Return `dp[0][0]`.

::tabs-start

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        n, m = len(s), len(t)
        dp = [[False] * (m + 1) for _ in range(n + 1)]

        for j in range(m + 1):
            dp[n][j] = True

        for i in range(n - 1, -1, -1):
            for j in range(m - 1, -1, -1):
                if s[i] == t[j]:
                    dp[i][j] = dp[i + 1][j + 1]
                else:
                    dp[i][j] = dp[i][j + 1]

        return dp[0][0]
```

```java
public class Solution {
    public boolean isSubsequence(String s, String t) {
        int n = s.length(), m = t.length();
        boolean[][] dp = new boolean[n + 1][m + 1];

        for (int j = 0; j <= m; j++) {
            dp[n][j] = true;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                if (s.charAt(i) == t.charAt(j)) {
                    dp[i][j] = dp[i + 1][j + 1];
                } else {
                    dp[i][j] = dp[i][j + 1];
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
    bool isSubsequence(string s, string t) {
        int n = s.size(), m = t.size();
        vector<vector<bool>> dp(n + 1, vector<bool>(m + 1, false));

        for (int j = 0; j <= m; ++j) {
            dp[n][j] = true;
        }

        for (int i = n - 1; i >= 0; --i) {
            for (int j = m - 1; j >= 0; --j) {
                if (s[i] == t[j]) {
                    dp[i][j] = dp[i + 1][j + 1];
                } else {
                    dp[i][j] = dp[i][j + 1];
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
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isSubsequence(s, t) {
        const n = s.length,
            m = t.length;
        const dp = Array.from({ length: n + 1 }, () =>
            Array(m + 1).fill(false),
        );

        for (let j = 0; j <= m; j++) {
            dp[n][j] = true;
        }

        for (let i = n - 1; i >= 0; i--) {
            for (let j = m - 1; j >= 0; j--) {
                if (s[i] === t[j]) {
                    dp[i][j] = dp[i + 1][j + 1];
                } else {
                    dp[i][j] = dp[i][j + 1];
                }
            }
        }

        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public bool IsSubsequence(string s, string t) {
        int n = s.Length, m = t.Length;
        bool[,] dp = new bool[n + 1, m + 1];

        for (int j = 0; j <= m; j++) {
            dp[n, j] = true;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                if (s[i] == t[j]) {
                    dp[i, j] = dp[i + 1, j + 1];
                } else {
                    dp[i, j] = dp[i, j + 1];
                }
            }
        }

        return dp[0, 0];
    }
}
```

```go
func isSubsequence(s string, t string) bool {
    n, m := len(s), len(t)
    dp := make([][]bool, n+1)
    for i := range dp {
        dp[i] = make([]bool, m+1)
    }

    for j := 0; j <= m; j++ {
        dp[n][j] = true
    }

    for i := n - 1; i >= 0; i-- {
        for j := m - 1; j >= 0; j-- {
            if s[i] == t[j] {
                dp[i][j] = dp[i+1][j+1]
            } else {
                dp[i][j] = dp[i][j+1]
            }
        }
    }

    return dp[0][0]
}
```

```kotlin
class Solution {
    fun isSubsequence(s: String, t: String): Boolean {
        val n = s.length
        val m = t.length
        val dp = Array(n + 1) { BooleanArray(m + 1) }

        for (j in 0..m) {
            dp[n][j] = true
        }

        for (i in n - 1 downTo 0) {
            for (j in m - 1 downTo 0) {
                dp[i][j] = if (s[i] == t[j]) {
                    dp[i + 1][j + 1]
                } else {
                    dp[i][j + 1]
                }
            }
        }

        return dp[0][0]
    }
}
```

```swift
class Solution {
    func isSubsequence(_ s: String, _ t: String) -> Bool {
        let sArr = Array(s)
        let tArr = Array(t)
        let n = sArr.count, m = tArr.count
        var dp = [[Bool]](repeating: [Bool](repeating: false, count: m + 1), count: n + 1)

        for j in 0...m {
            dp[n][j] = true
        }

        for i in stride(from: n - 1, through: 0, by: -1) {
            for j in stride(from: m - 1, through: 0, by: -1) {
                if sArr[i] == tArr[j] {
                    dp[i][j] = dp[i + 1][j + 1]
                } else {
                    dp[i][j] = dp[i][j + 1]
                }
            }
        }

        return dp[0][0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.

---

## 4. Two Pointers

### Intuition

The most efficient approach uses two pointers since we only need to make a single pass through both strings. Pointer `i` tracks our position in `s`, and pointer `j` tracks our position in `t`. We always advance `j`, but only advance `i` when we find a matching character. If we reach the end of `s`, all characters were found in order. This is optimal because each character in `t` is examined exactly once.

### Algorithm

1. Initialize pointers `i = 0` and `j = 0`.
2. While `i < len(s)` and `j < len(t)`:
   - If `s[i] == t[j]`, increment `i`.
   - Always increment `j`.
3. Return `i == len(s)`.

::tabs-start

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = j = 0
        while i < len(s) and j < len(t):
            if s[i] == t[j]:
                i += 1
            j += 1
        return i == len(s)
```

```java
public class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0, j = 0;
        while (i < s.length() && j < t.length()) {
            if (s.charAt(i) == t.charAt(j)) {
                i++;
            }
            j++;
        }
        return i == s.length();
    }
}
```

```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int i = 0, j = 0;
        while (i < s.length() && j < t.length()) {
            if (s[i] == t[j]) {
                i++;
            }
            j++;
        }
        return i == s.length();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isSubsequence(s, t) {
        let i = 0,
            j = 0;
        while (i < s.length && j < t.length) {
            if (s.charAt(i) == t.charAt(j)) {
                i++;
            }
            j++;
        }
        return i == s.length;
    }
}
```

```csharp
public class Solution {
    public bool IsSubsequence(string s, string t) {
        int i = 0, j = 0;
        while (i < s.Length && j < t.Length) {
            if (s[i] == t[j]) {
                i++;
            }
            j++;
        }
        return i == s.Length;
    }
}
```

```go
func isSubsequence(s string, t string) bool {
    i, j := 0, 0
    for i < len(s) && j < len(t) {
        if s[i] == t[j] {
            i++
        }
        j++
    }
    return i == len(s)
}
```

```kotlin
class Solution {
    fun isSubsequence(s: String, t: String): Boolean {
        var i = 0
        var j = 0
        while (i < s.length && j < t.length) {
            if (s[i] == t[j]) {
                i++
            }
            j++
        }
        return i == s.length
    }
}
```

```swift
class Solution {
    func isSubsequence(_ s: String, _ t: String) -> Bool {
        let sArr = Array(s)
        let tArr = Array(t)
        var i = 0, j = 0
        while i < sArr.count && j < tArr.count {
            if sArr[i] == tArr[j] {
                i += 1
            }
            j += 1
        }
        return i == sArr.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.

## 5. Follow-Up Solution (Index Jumping)

### Intuition

When checking many strings against the same `t`, the two-pointer approach becomes inefficient because we scan `t` repeatedly. Instead, we precompute for each position in `t` the next occurrence of each character. This lets us jump directly to the next matching character rather than scanning. The preprocessing takes O(26 * m) time and space, but each subsequence query then takes only O(n) time regardless of the length of `t`.

### Algorithm

1. Build a 2D array `store` of size `m x 26`. Entry `store[j][c]` holds the smallest index `>= j` where character `c` appears in `t`.
2. Fill `store` from right to left:
   - Initialize `store[m-1]` with `m + 1` for all characters except `t[m-1]`.
   - For each position `j` from `m-2` to 0, copy `store[j+1]` and update the entry for `t[j]`.
3. To check if `s` is a subsequence:
   - Start at `j = 0`.
   - For each character in `s`, look up its next position from `store[j]` and jump to it.
   - If the jump goes beyond `m`, return false.
4. Return true if all characters are matched.

::tabs-start

```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        n, m = len(s), len(t)
        if m == 0:
            return n == 0

        store = [[m + 1] * 26 for _ in range(m)]
        store[m - 1][ord(t[m - 1]) - ord('a')] = m - 1

        for i in range(m - 2, -1, -1):
            store[i] = store[i + 1][:]
            store[i][ord(t[i]) - ord('a')] = i

        i, j = 0, 0
        while i < n and j < m:
            j = store[j][ord(s[i]) - ord('a')] + 1
            if j > m:
                return False
            i += 1

        return i == n
```

```java
public class Solution {
    public boolean isSubsequence(String s, String t) {
        int n = s.length(), m = t.length();
        if (m == 0) return n == 0;

        int[][] store = new int[m][26];
        for (int i = 0; i < m; i++) {
            Arrays.fill(store[i], m + 1);
        }

        store[m - 1][t.charAt(m - 1) - 'a'] = m - 1;

        for (int i = m - 2; i >= 0; i--) {
            store[i] = store[i + 1].clone();
            store[i][t.charAt(i) - 'a'] = i;
        }

        int i = 0, j = 0;
        while (i < n && j < m) {
            j = store[j][s.charAt(i) - 'a'] + 1;
            if (j > m) return false;
            i++;
        }

        return i == n;
    }
}
```

```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int n = s.length(), m = t.length();
        if (m == 0) return n == 0;

        vector<vector<int>> store(m, vector<int>(26, m + 1));
        store[m - 1][t[m - 1] - 'a'] = m - 1;

        for (int i = m - 2; i >= 0; i--) {
            store[i] = store[i + 1];
            store[i][t[i] - 'a'] = i;
        }

        int i = 0, j = 0;
        while (i < n && j < m) {
            j = store[j][s[i] - 'a'] + 1;
            if (j > m) return false;
            i++;
        }

        return i == n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isSubsequence(s, t) {
        const n = s.length,
            m = t.length;
        if (m === 0) return n === 0;

        const store = Array.from({ length: m }, () => Array(26).fill(m + 1));
        store[m - 1][t.charCodeAt(m - 1) - 'a'.charCodeAt(0)] = m - 1;

        for (let i = m - 2; i >= 0; i--) {
            store[i] = [...store[i + 1]];
            store[i][t.charCodeAt(i) - 'a'.charCodeAt(0)] = i;
        }

        let i = 0,
            j = 0;
        while (i < n && j < m) {
            j = store[j][s.charCodeAt(i) - 'a'.charCodeAt(0)] + 1;
            if (j > m) return false;
            i++;
        }

        return i === n;
    }
}
```

```csharp
public class Solution {
    public bool IsSubsequence(string s, string t) {
        int n = s.Length, m = t.Length;
        if (m == 0) return n == 0;

        int[,] store = new int[m, 26];
        for (int i = 0; i < 26; i++) {
            for (int j = 0; j < m; j++) {
                store[j, i] = m + 1;
            }
        }

        store[m - 1, t[m - 1] - 'a'] = m - 1;

        for (int i = m - 2; i >= 0; i--) {
            for (int c = 0; c < 26; c++) {
                store[i, c] = store[i + 1, c];
            }
            store[i, t[i] - 'a'] = i;
        }

        int iPtr = 0, jPtr = 0;
        while (iPtr < n && jPtr < m) {
            jPtr = store[jPtr, s[iPtr] - 'a'] + 1;
            if (jPtr > m) return false;
            iPtr++;
        }

        return iPtr == n;
    }
}
```

```go
func isSubsequence(s string, t string) bool {
    n, m := len(s), len(t)
    if m == 0 {
        return n == 0
    }

    store := make([][]int, m)
    for i := range store {
        store[i] = make([]int, 26)
        for j := range store[i] {
            store[i][j] = m + 1
        }
    }

    store[m-1][t[m-1]-'a'] = m - 1

    for i := m - 2; i >= 0; i-- {
        copy(store[i], store[i+1])
        store[i][t[i]-'a'] = i
    }

    i, j := 0, 0
    for i < n && j < m {
        j = store[j][s[i]-'a'] + 1
        if j > m {
            return false
        }
        i++
    }

    return i == n
}
```

```kotlin
class Solution {
    fun isSubsequence(s: String, t: String): Boolean {
        val n = s.length
        val m = t.length
        if (m == 0) return n == 0

        val store = Array(m) { IntArray(26) { m + 1 } }
        store[m - 1][t[m - 1] - 'a'] = m - 1

        for (i in m - 2 downTo 0) {
            store[i + 1].copyInto(store[i])
            store[i][t[i] - 'a'] = i
        }

        var i = 0
        var j = 0
        while (i < n && j < m) {
            j = store[j][s[i] - 'a'] + 1
            if (j > m) return false
            i++
        }

        return i == n
    }
}
```

```swift
class Solution {
    func isSubsequence(_ s: String, _ t: String) -> Bool {
        let sArr = Array(s)
        let tArr = Array(t)
        let n = sArr.count, m = tArr.count
        if m == 0 { return n == 0 }

        var store = [[Int]](repeating: [Int](repeating: m + 1, count: 26), count: m)
        store[m - 1][Int(tArr[m - 1].asciiValue!) - 97] = m - 1

        for i in stride(from: m - 2, through: 0, by: -1) {
            store[i] = store[i + 1]
            store[i][Int(tArr[i].asciiValue!) - 97] = i
        }

        var i = 0, j = 0
        while i < n && j < m {
            j = store[j][Int(sArr[i].asciiValue!) - 97] + 1
            if j > m { return false }
            i += 1
        }

        return i == n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.
