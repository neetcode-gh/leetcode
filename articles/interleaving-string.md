## 1. Recursion

### Intuition

This problem asks whether the string `s3` can be formed by **interleaving** characters from `s1` and `s2`, while keeping the relative order of characters from each string.

At any position in `s3`, we have at most two choices:
- take the next character from `s1`
- take the next character from `s2`

Using recursion, we try all valid ways of building `s3` character by character.  
The recursive function represents:  
**“Can we form `s3` starting from index `k`, using characters from `s1` starting at `i` and `s2` starting at `j`?”**

If we successfully consume all characters of `s3` and also reach the end of both `s1` and `s2`, then `s3` is a valid interleaving.

### Algorithm

1. Define a recursive function `dfs(i, j, k)`:
   - `i` is the current index in `s1`
   - `j` is the current index in `s2`
   - `k` is the current index in `s3`
2. If `k` reaches the end of `s3`:
   - Return `true` only if both `s1` and `s2` are also fully used
3. If the next character of `s1` matches `s3[k]`:
   - Recurse by taking the character from `s1`
   - If it returns `true`, stop and return `true`
4. If the next character of `s2` matches `s3[k]`:
   - Recurse by taking the character from `s2`
   - If it returns `true`, stop and return `true`
5. If neither choice works:
   - Return `false`
6. Start the recursion from indices `(0, 0, 0)`
7. Return the final result

::tabs-start

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:

        def dfs(i, j, k):
            if k == len(s3):
                return (i == len(s1)) and (j == len(s2))

            if i < len(s1) and s1[i] == s3[k]:
                if dfs(i + 1, j, k + 1):
                    return True

            if j < len(s2) and s2[j] == s3[k]:
                if dfs(i, j + 1, k + 1):
                    return True

            return False

        return dfs(0, 0, 0)
```

```java
public class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {

        return dfs(0, 0, 0, s1, s2, s3);
    }

    private boolean dfs(int i, int j, int k, String s1, String s2, String s3) {
        if (k == s3.length()) {
            return (i == s1.length()) && (j == s2.length());
        }

        if (i < s1.length() && s1.charAt(i) == s3.charAt(k)) {
            if (dfs(i + 1, j, k + 1, s1, s2, s3)) {
                return true;
            }
        }

        if (j < s2.length() && s2.charAt(j) == s3.charAt(k)) {
            if (dfs(i, j + 1, k + 1, s1, s2, s3)) {
                return true;
            }
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        return dfs(0, 0, 0, s1, s2, s3);
    }

    bool dfs(int i, int j, int k, string& s1, string& s2, string& s3) {
        if (k == s3.length()) {
            return (i == s1.length()) && (j == s2.length());
        }

        if (i < s1.length() && s1[i] == s3[k]) {
            if (dfs(i + 1, j, k + 1, s1, s2, s3)) {
                return true;
            }
        }

        if (j < s2.length() && s2[j] == s3[k]) {
            if (dfs(i, j + 1, k + 1, s1, s2, s3)) {
                return true;
            }
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @param {string} s3
     * @return {boolean}
     */
    isInterleave(s1, s2, s3) {
        const dfs = (i, j, k) => {
            if (k === s3.length) {
                return i === s1.length && j === s2.length;
            }

            if (i < s1.length && s1[i] === s3[k]) {
                if (dfs(i + 1, j, k + 1)) {
                    return true;
                }
            }

            if (j < s2.length && s2[j] === s3[k]) {
                if (dfs(i, j + 1, k + 1)) {
                    return true;
                }
            }

            return false;
        };

        return dfs(0, 0, 0);
    }
}
```

```csharp
public class Solution {
    public bool IsInterleave(string s1, string s2, string s3) {
        return dfs(0, 0, 0, s1, s2, s3);
    }

    private bool dfs(int i, int j, int k, string s1, string s2, string s3) {
        if (k == s3.Length) {
            return (i == s1.Length) && (j == s2.Length);
        }

        if (i < s1.Length && s1[i] == s3[k]) {
            if (dfs(i + 1, j, k + 1, s1, s2, s3)) {
                return true;
            }
        }

        if (j < s2.Length && s2[j] == s3[k]) {
            if (dfs(i, j + 1, k + 1, s1, s2, s3)) {
                return true;
            }
        }

        return false;
    }
}
```

```go
func isInterleave(s1, s2, s3 string) bool {
    var dfs func(i, j, k int) bool
    dfs = func(i, j, k int) bool {
        if k == len(s3) {
            return i == len(s1) && j == len(s2)
        }

        if i < len(s1) && s1[i] == s3[k] {
            if dfs(i+1, j, k+1) {
                return true
            }
        }

        if j < len(s2) && s2[j] == s3[k] {
            if dfs(i, j+1, k+1) {
                return true
            }
        }

        return false
    }

    return dfs(0, 0, 0)
}
```

```kotlin
class Solution {
    fun isInterleave(s1: String, s2: String, s3: String): Boolean {
        fun dfs(i: Int, j: Int, k: Int): Boolean {
            if (k == s3.length) {
                return i == s1.length && j == s2.length
            }

            if (i < s1.length && s1[i] == s3[k]) {
                if (dfs(i + 1, j, k + 1)) {
                    return true
                }
            }

            if (j < s2.length && s2[j] == s3[k]) {
                if (dfs(i, j + 1, k + 1)) {
                    return true
                }
            }

            return false
        }

        return dfs(0, 0, 0)
    }
}
```

```swift
class Solution {
    func isInterleave(_ s1: String, _ s2: String, _ s3: String) -> Bool {
        let n1 = s1.count, n2 = s2.count, n3 = s3.count
        if n1 + n2 != n3 { return false }

        let s1 = Array(s1), s2 = Array(s2), s3 = Array(s3)

        func dfs(_ i: Int, _ j: Int, _ k: Int) -> Bool {
            if k == n3 {
                return i == n1 && j == n2
            }

            if i < n1 && s1[i] == s3[k] {
                if dfs(i + 1, j, k + 1) {
                    return true
                }
            }

            if j < n2 && s2[j] == s3[k] {
                if dfs(i, j + 1, k + 1) {
                    return true
                }
            }

            return false
        }

        return dfs(0, 0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ {m + n})$
- Space complexity: $O(m + n)$

> Where $m$ is the length of the string $s1$ and $n$ is the length of the string $s2$.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

This problem asks whether the string `s3` can be formed by interleaving characters from `s1` and `s2` while preserving the relative order of characters in both strings.

The recursive approach explores all possible interleavings, but many states repeat. To make it efficient, we use **top-down dynamic programming (memoization)**.

A key observation is that the position in `s3` is always determined by how many characters we have already taken from `s1` and `s2`.  
So the state can be defined using just:
- index `i` in `s1`
- index `j` in `s2`

The recursive function answers:  
**“Can we form the rest of `s3` using `s1[i:]` and `s2[j:]`?”**

### Algorithm

1. First, check if the lengths of `s1` and `s2` add up to the length of `s3`:
   - If not, return `false` immediately
2. Create a memoization map `dp` where:
   - the key is `(i, j)`
   - the value is whether `s3[k:]` can be formed from `s1[i:]` and `s2[j:]`
3. Define a recursive function `dfs(i, j, k)`:
   - `i` is the current index in `s1`
   - `j` is the current index in `s2`
   - `k` is the current index in `s3`
4. If `k` reaches the end of `s3`:
   - Return `true` only if both `s1` and `s2` are fully used
5. If the state `(i, j)` is already in `dp`:
   - Return the stored result
6. Try taking the next character from `s1` if it matches `s3[k]`
7. If that does not work, try taking the next character from `s2` if it matches `s3[k]`
8. Store the result in `dp[(i, j)]`
9. Start the recursion from `(0, 0, 0)`
10. Return the final result

::tabs-start

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        if len(s1) + len(s2) != len(s3):
            return False

        dp = {}
        def dfs(i, j, k):
            if k == len(s3):
                return (i == len(s1)) and (j == len(s2))
            if (i, j) in dp:
                return dp[(i, j)]

            res = False
            if i < len(s1) and s1[i] == s3[k]:
                res = dfs(i + 1, j, k + 1)
            if not res and j < len(s2) and s2[j] == s3[k]:
                res = dfs(i, j + 1, k + 1)

            dp[(i, j)] = res
            return res

        return dfs(0, 0, 0)
```

```java
public class Solution {
    private Boolean[][] dp;

    public boolean isInterleave(String s1, String s2, String s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        dp = new Boolean[m + 1][n + 1];
        return dfs(0, 0, 0, s1, s2, s3);
    }

    private boolean dfs(int i, int j, int k, String s1, String s2, String s3) {
        if (k == s3.length()) {
            return (i == s1.length()) && (j == s2.length());
        }
        if (dp[i][j] != null) {
            return dp[i][j];
        }

        boolean res = false;
        if (i < s1.length() && s1.charAt(i) == s3.charAt(k)) {
            res = dfs(i + 1, j, k + 1, s1, s2, s3);
        }
        if (!res && j < s2.length() && s2.charAt(j) == s3.charAt(k)) {
            res = dfs(i, j + 1, k + 1, s1, s2, s3);
        }

        dp[i][j] = res;
        return res;
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;

public:
    bool isInterleave(string s1, string s2, string s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        dp = vector<vector<int>>(m + 1, vector<int>(n + 1, -1));
        return dfs(0, 0, 0, s1, s2, s3);
    }

    bool dfs(int i, int j, int k, string& s1, string& s2, string& s3) {
        if (k == s3.length()) {
            return (i == s1.length()) && (j == s2.length());
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }

        bool res = false;
        if (i < s1.length() && s1[i] == s3[k]) {
            res = dfs(i + 1, j, k + 1, s1, s2, s3);
        }
        if (!res && j < s2.length() && s2[j] == s3[k]) {
            res = dfs(i, j + 1, k + 1, s1, s2, s3);
        }

        dp[i][j] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @param {string} s3
     * @return {boolean}
     */
    isInterleave(s1, s2, s3) {
        const m = s1.length,
            n = s2.length;
        if (m + n !== s3.length) return false;

        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(-1));
        const dfs = (i, j, k) => {
            if (k === s3.length) {
                return i === s1.length && j === s2.length;
            }
            if (dp[i][j] !== -1) {
                return dp[i][j];
            }

            let res = false;
            if (i < s1.length && s1[i] === s3[k]) {
                res = dfs(i + 1, j, k + 1);
            }

            if (!res && j < s2.length && s2[j] === s3[k]) {
                res = dfs(i, j + 1, k + 1);
            }
            dp[i][j] = res;
            return res;
        };

        return dfs(0, 0, 0);
    }
}
```

```csharp
public class Solution {
    private bool?[,] dp;

    public bool IsInterleave(string s1, string s2, string s3) {
        int m = s1.Length, n = s2.Length;
        if (m + n != s3.Length) return false;
        dp = new bool?[m + 1, n + 1];
        return dfs(0, 0, 0, s1, s2, s3);
    }

    private bool dfs(int i, int j, int k, string s1, string s2, string s3) {
        if (k == s3.Length) {
            return (i == s1.Length) && (j == s2.Length);
        }
        if (dp[i, j].HasValue) {
            return dp[i, j].Value;
        }

        bool res = false;
        if (i < s1.Length && s1[i] == s3[k]) {
            res = dfs(i + 1, j, k + 1, s1, s2, s3);
        }
        if (!res && j < s2.Length && s2[j] == s3[k]) {
            res = dfs(i, j + 1, k + 1, s1, s2, s3);
        }

        dp[i, j] = res;
        return res;
    }
}
```

```go
func isInterleave(s1, s2, s3 string) bool {
    if len(s1)+len(s2) != len(s3) {
        return false
    }

    m, n := len(s1), len(s2)
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, j, k int) bool
    dfs = func(i, j, k int) bool {
        if k == len(s3) {
            return i == len(s1) && j == len(s2)
        }

        if dp[i][j] != -1 {
            return dp[i][j] == 1
        }

        res := false
        if i < len(s1) && s1[i] == s3[k] {
            res = dfs(i+1, j, k+1)
        }
        if !res && j < len(s2) && s2[j] == s3[k] {
            res = dfs(i, j+1, k+1)
        }

        if res {
            dp[i][j] = 1
        } else {
            dp[i][j] = 0
        }

        return res
    }

    return dfs(0, 0, 0)
}
```

```kotlin
class Solution {
    fun isInterleave(s1: String, s2: String, s3: String): Boolean {
        if (s1.length + s2.length != s3.length) {
            return false
        }

        val m = s1.length
        val n = s2.length
        val dp = Array(m + 1) { IntArray(n + 1) { -1 } }

        fun dfs(i: Int, j: Int, k: Int): Boolean {
            if (k == s3.length) {
                return i == m && j == n
            }

            if (dp[i][j] != -1) {
                return dp[i][j] == 1
            }

            var res = false
            if (i < s1.length && s1[i] == s3[k]) {
                res = dfs(i + 1, j, k + 1)
            }
            if (!res && j < s2.length && s2[j] == s3[k]) {
                res = dfs(i, j + 1, k + 1)
            }

            dp[i][j] = if (res) 1 else 0

            return res
        }

        return dfs(0, 0, 0)
    }
}
```

```swift
class Solution {
    func isInterleave(_ s1: String, _ s2: String, _ s3: String) -> Bool {
        let m = s1.count, n = s2.count, l = s3.count
        if m + n != l { return false }

        let s1 = Array(s1), s2 = Array(s2), s3 = Array(s3)
        var dp = Array(repeating: Array(repeating: nil as Bool?, count: n + 1), count: m + 1)

        func dfs(_ i: Int, _ j: Int, _ k: Int) -> Bool {
            if k == l {
                return i == m && j == n
            }
            if let cached = dp[i][j] {
                return cached
            }

            var res = false
            if i < m && s1[i] == s3[k] {
                res = dfs(i + 1, j, k + 1)
            }
            if !res && j < n && s2[j] == s3[k] {
                res = dfs(i, j + 1, k + 1)
            }

            dp[i][j] = res
            return res
        }

        return dfs(0, 0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the length of the string $s1$ and $n$ is the length of the string $s2$.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We need to check whether the string `s3` can be formed by interleaving `s1` and `s2`, while keeping the relative order of characters from both strings.

Instead of recursion, we can solve this using **bottom-up dynamic programming**.  
The idea is to determine, for every possible pair of positions `(i, j)`, whether it is possible to form the suffix of `s3` starting at position `i + j` using:
- the substring `s1[i:]`
- the substring `s2[j:]`

If either taking the next character from `s1` or from `s2` leads to a valid state, then the current state is also valid.

### Algorithm

1. First, check if the lengths of `s1` and `s2` add up to the length of `s3`:
   - If not, return `false`
2. Create a 2D DP table `dp` of size `(len(s1) + 1) x (len(s2) + 1)`:
   - `dp[i][j]` is `true` if `s3[i + j:]` can be formed using `s1[i:]` and `s2[j:]`
3. Initialize the base case:
   - `dp[len(s1)][len(s2)] = true` because empty strings can form an empty string
4. Fill the table in reverse order (from bottom-right to top-left):
5. For each position `(i, j)`:
   - If the next character of `s1` matches `s3[i + j]` and `dp[i + 1][j]` is `true`, then set `dp[i][j] = true`
   - If the next character of `s2` matches `s3[i + j]` and `dp[i][j + 1]` is `true`, then set `dp[i][j] = true`
6. After filling the table, the answer is stored in `dp[0][0]`
7. Return `dp[0][0]`

::tabs-start

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        if len(s1) + len(s2) != len(s3):
            return False

        dp = [[False] * (len(s2) + 1) for i in range(len(s1) + 1)]
        dp[len(s1)][len(s2)] = True

        for i in range(len(s1), -1, -1):
            for j in range(len(s2), -1, -1):
                if i < len(s1) and s1[i] == s3[i + j] and dp[i + 1][j]:
                    dp[i][j] = True
                if j < len(s2) and s2[j] == s3[i + j] and dp[i][j + 1]:
                    dp[i][j] = True
        return dp[0][0]
```

```java
public class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) {
            return false;
        }

        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[m][n] = true;

        for (int i = m; i >= 0; i--) {
            for (int j = n; j >= 0; j--) {
                if (i < m && s1.charAt(i) == s3.charAt(i + j) && dp[i + 1][j]) {
                    dp[i][j] = true;
                }
                if (j < n && s2.charAt(j) == s3.charAt(i + j) && dp[i][j + 1]) {
                    dp[i][j] = true;
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
    bool isInterleave(string s1, string s2, string s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) {
            return false;
        }

        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[m][n] = true;

        for (int i = m; i >= 0; i--) {
            for (int j = n; j >= 0; j--) {
                if (i < m && s1[i] == s3[i + j] && dp[i + 1][j]) {
                    dp[i][j] = true;
                }
                if (j < n && s2[j] == s3[i + j] && dp[i][j + 1]) {
                    dp[i][j] = true;
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
     * @param {string} s1
     * @param {string} s2
     * @param {string} s3
     * @return {boolean}
     */
    isInterleave(s1, s2, s3) {
        let m = s1.length,
            n = s2.length;
        if (m + n !== s3.length) {
            return false;
        }

        const dp = Array.from({ length: m + 1 }, () =>
            Array(n + 1).fill(false),
        );
        dp[m][n] = true;

        for (let i = m; i >= 0; i--) {
            for (let j = n; j >= 0; j--) {
                if (i < m && s1[i] === s3[i + j] && dp[i + 1][j]) {
                    dp[i][j] = true;
                }
                if (j < n && s2[j] === s3[i + j] && dp[i][j + 1]) {
                    dp[i][j] = true;
                }
            }
        }
        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public bool IsInterleave(string s1, string s2, string s3) {
        int m = s1.Length, n = s2.Length;
        if (m + n != s3.Length) {
            return false;
        }

        bool[,] dp = new bool[m + 1, n + 1];
        dp[m, n] = true;

        for (int i = m; i >= 0; i--) {
            for (int j = n; j >= 0; j--) {
                if (i < m && s1[i] == s3[i + j] && dp[i + 1, j]) {
                    dp[i, j] = true;
                }
                if (j < n && s2[j] == s3[i + j] && dp[i, j + 1]) {
                    dp[i, j] = true;
                }
            }
        }
        return dp[0, 0];
    }
}
```

```go
func isInterleave(s1 string, s2 string, s3 string) bool {
    if len(s1) + len(s2) != len(s3) {
        return false
    }

    dp := make([][]bool, len(s1)+1)
    for i := range dp {
        dp[i] = make([]bool, len(s2)+1)
    }
    dp[len(s1)][len(s2)] = true

    for i := len(s1); i >= 0; i-- {
        for j := len(s2); j >= 0; j-- {
            if i < len(s1) && s1[i] == s3[i+j] && dp[i+1][j] {
                dp[i][j] = true
            }
            if j < len(s2) && s2[j] == s3[i+j] && dp[i][j+1] {
                dp[i][j] = true
            }
        }
    }

    return dp[0][0]
}
```

```kotlin
class Solution {
    fun isInterleave(s1: String, s2: String, s3: String): Boolean {
        if (s1.length + s2.length != s3.length) {
            return false
        }

        val dp = Array(s1.length + 1) { BooleanArray(s2.length + 1) }
        dp[s1.length][s2.length] = true

        for (i in s1.length downTo 0) {
            for (j in s2.length downTo 0) {
                if (i < s1.length && s1[i] == s3[i + j] && dp[i + 1][j]) {
                    dp[i][j] = true
                }
                if (j < s2.length && s2[j] == s3[i + j] && dp[i][j + 1]) {
                    dp[i][j] = true
                }
            }
        }

        return dp[0][0]
    }
}
```

```swift
class Solution {
    func isInterleave(_ s1: String, _ s2: String, _ s3: String) -> Bool {
        let m = s1.count, n = s2.count, l = s3.count
        if m + n != l { return false }

        let s1 = Array(s1), s2 = Array(s2), s3 = Array(s3)
        var dp = Array(repeating: Array(repeating: false, count: n + 1), count: m + 1)
        dp[m][n] = true

        for i in stride(from: m, through: 0, by: -1) {
            for j in stride(from: n, through: 0, by: -1) {
                if i < m && s1[i] == s3[i + j] && dp[i + 1][j] {
                    dp[i][j] = true
                }
                if j < n && s2[j] == s3[i + j] && dp[i][j + 1] {
                    dp[i][j] = true
                }
            }
        }
        return dp[0][0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the length of the string $s1$ and $n$ is the length of the string $s2$.

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

We want to know if `s3` can be built by interleaving `s1` and `s2` while keeping the order of characters from each string.

In the 2D DP solution, we used a table `dp[i][j]` to represent whether `s3[i + j:]` can be formed using `s1[i:]` and `s2[j:]`.  
But notice something important: to compute row `i`, we only need information from:
- the row below (`i + 1`) and
- the current row as we move across columns

So we do not need the full 2D table. We can compress it and keep only **one row at a time**, which reduces memory usage.

To make this even more efficient, we ensure that `s2` is the longer string so the 1D array stays as small as possible.

### Algorithm

1. Let `m = len(s1)` and `n = len(s2)`. If `m + n != len(s3)`, return `false`.
2. If `s2` is shorter than `s1`, swap them so that `s2` is always the longer string.
3. Create a 1D boolean array `dp` of size `n + 1`:
   - `dp[j]` will represent the DP values from the "next row" (i.e., for `i + 1`)
4. Initialize the base case where both strings are fully used:
   - set the last position to `true`
5. Iterate `i` from `m` down to `0`:
   - Create a new array `nextDp` for the current row
   - If `i == m`, set `nextDp[n] = true` (empty suffixes match)
6. Iterate `j` from `n` down to `0`:
   - If we can take the next character from `s1` (matches `s3[i + j]`) and `dp[j]` is `true`, set `nextDp[j] = true`
   - If we can take the next character from `s2` (matches `s3[i + j]`) and `nextDp[j + 1]` is `true`, set `nextDp[j] = true`
7. After finishing the row, assign `dp = nextDp`
8. The final answer will be `dp[0]`, meaning we can form `s3` starting from the beginning of both strings

::tabs-start

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        if n < m:
            s1, s2 = s2, s1
            m, n = n, m

        dp = [False for _ in range(n + 1)]
        dp[n] = True
        for i in range(m, -1, -1):
            nextDp = [False for _ in range(n + 1)]
            if i == m:
                nextDp[n] = True
            for j in range(n, -1, -1):
                if i < m and s1[i] == s3[i + j] and dp[j]:
                    nextDp[j] = True
                if j < n and s2[j] == s3[i + j] and nextDp[j + 1]:
                    nextDp[j] = True
            dp = nextDp
        return dp[0]
```

```java
public class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        if (n < m) {
            String temp = s1;
            s1 = s2;
            s2 = temp;
            int tempLength = m;
            m = n;
            n = tempLength;
        }

        boolean[] dp = new boolean[n + 1];
        dp[n] = true;
        for (int i = m; i >= 0; i--) {
            boolean[] nextDp = new boolean[n + 1];
            if (i == m) nextDp[n] = true;
            for (int j = n; j >= 0; j--) {
                if (i < m && s1.charAt(i) == s3.charAt(i + j) && dp[j]) {
                    nextDp[j] = true;
                }
                if (j < n && s2.charAt(j) == s3.charAt(i + j) && nextDp[j + 1]) {
                    nextDp[j] = true;
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
    bool isInterleave(string s1, string s2, string s3) {
        int m = s1.size(), n = s2.size();
        if (m + n != s3.size()) return false;
        if (n < m) {
            swap(s1, s2);
            swap(m, n);
        }

        vector<bool> dp(n + 1);
        dp[n] = true;
        for (int i = m; i >= 0; --i) {
            vector<bool> nextDp(n + 1);
            if (i == m) nextDp[n] = true;
            for (int j = n; j >= 0; --j) {
                if (i < m && s1[i] == s3[i + j] && dp[j]) {
                    nextDp[j] = true;
                }
                if (j < n && s2[j] == s3[i + j] && nextDp[j + 1]) {
                    nextDp[j] = true;
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
     * @param {string} s1
     * @param {string} s2
     * @param {string} s3
     * @return {boolean}
     */
    isInterleave(s1, s2, s3) {
        let m = s1.length,
            n = s2.length;
        if (m + n !== s3.length) return false;
        if (n < m) {
            [s1, s2] = [s2, s1];
            [m, n] = [n, m];
        }

        let dp = Array(n + 1).fill(false);
        dp[n] = true;
        for (let i = m; i >= 0; i--) {
            let nextDp = Array(n + 1).fill(false);
            if (i === m) nextDp[n] = true;
            for (let j = n; j >= 0; j--) {
                if (i < m && s1[i] === s3[i + j] && dp[j]) {
                    nextDp[j] = true;
                }
                if (j < n && s2[j] === s3[i + j] && nextDp[j + 1]) {
                    nextDp[j] = true;
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
    public bool IsInterleave(string s1, string s2, string s3) {
        int m = s1.Length, n = s2.Length;
        if (m + n != s3.Length) return false;
        if (n < m) {
            var temp = s1;
            s1 = s2;
            s2 = temp;
            int tempLength = m;
            m = n;
            n = tempLength;
        }

        bool[] dp = new bool[n + 1];
        dp[n] = true;
        for (int i = m; i >= 0; i--) {
            bool[] nextDp = new bool[n + 1];
            if (i == m) nextDp[n] = true;
            for (int j = n; j >= 0; j--) {
                if (i < m && s1[i] == s3[i + j] && dp[j]) {
                    nextDp[j] = true;
                }
                if (j < n && s2[j] == s3[i + j] && nextDp[j + 1]) {
                    nextDp[j] = true;
                }
            }
            dp = nextDp;
        }
        return dp[0];
    }
}
```

```go
func isInterleave(s1 string, s2 string, s3 string) bool {
    m, n := len(s1), len(s2)
    if m + n != len(s3) {
        return false
    }
    if n < m {
        s1, s2 = s2, s1
        m, n = n, m
    }

    dp := make([]bool, n+1)
    dp[n] = true
    for i := m; i >= 0; i-- {
        nextDp := make([]bool, n+1)
        if i == m {
            nextDp[n] = true
        }
        for j := n; j >= 0; j-- {
            if i < m && s1[i] == s3[i+j] && dp[j] {
                nextDp[j] = true
            }
            if j < n && s2[j] == s3[i+j] && nextDp[j+1] {
                nextDp[j] = true
            }
        }
        dp = nextDp
    }
    return dp[0]
}
```

```kotlin
class Solution {
    fun isInterleave(s1: String, s2: String, s3: String): Boolean {
        var s1 = s1
        var s2 = s2
        var m = s1.length
        var n = s2.length
        if (m + n != s3.length) {
            return false
        }
        if (n < m) {
            val temp = s1
            s1 = s2
            s2 = temp

            val temp1 = m
            m = n
            n = temp1
        }

        val dp = BooleanArray(n + 1)
        dp[n] = true
        for (i in m downTo 0) {
            val nextDp = BooleanArray(n + 1)
            if (i == m) nextDp[n] = true
            for (j in n downTo 0) {
                if (i < m && s1[i] == s3[i + j] && dp[j]) {
                    nextDp[j] = true
                }
                if (j < n && s2[j] == s3[i + j] && nextDp[j + 1]) {
                    nextDp[j] = true
                }
            }
            System.arraycopy(nextDp, 0, dp, 0, n + 1)
        }
        return dp[0]
    }
}
```

```swift
class Solution {
    func isInterleave(_ s1: String, _ s2: String, _ s3: String) -> Bool {
        var s1 = Array(s1), s2 = Array(s2), s3 = Array(s3)
        var m = s1.count, n = s2.count
        if m + n != s3.count { return false }
        if n < m {
            swap(&s1, &s2)
            swap(&m, &n)
        }

        var dp = Array(repeating: false, count: n + 1)
        dp[n] = true

        for i in stride(from: m, through: 0, by: -1) {
            var nextDp = Array(repeating: false, count: n + 1)
            if i == m {
                nextDp[n] = true
            }
            for j in stride(from: n, through: 0, by: -1) {
                if i < m && s1[i] == s3[i + j] && dp[j] {
                    nextDp[j] = true
                }
                if j < n && s2[j] == s3[i + j] && nextDp[j + 1] {
                    nextDp[j] = true
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

- Time complexity: $O(m * n)$
- Space complexity: $O(min(m, n))$

> Where $m$ is the length of the string $s1$ and $n$ is the length of the string $s2$.

---

## 5. Dynamic Programming (Optimal)

### Intuition

We want to check if `s3` can be formed by interleaving `s1` and `s2` while keeping the order of characters from both strings.

A common DP idea is:
- at positions `(i, j)`, we have used `i` characters from `s1` and `j` characters from `s2`
- so the next character we must match in `s3` is at index `i + j`

From this state, we can move forward in two ways:
- take `s1[i]` if it matches `s3[i + j]`
- take `s2[j]` if it matches `s3[i + j]`

The 2D DP solution stores this for every `(i, j)`, but we can do better:
- each DP row only depends on the row below and the current row being built
- so we can reuse a single 1D array
- and instead of building a separate `next` array, we can update the 1D array in-place using one extra variable that tracks the “right neighbor” value

We also swap strings so that `s2` is the longer one, keeping the DP array as small as possible.

### Algorithm

1. Let `m = len(s1)` and `n = len(s2)`.
2. If `m + n != len(s3)`, return `false` immediately.
3. If `s2` is shorter than `s1`, swap them so the DP array size becomes `O(min(m, n))`.
4. Create a boolean array `dp` of size `n + 1`:
   - `dp[j]` represents whether `s3[i + j:]` can be formed using `s1[i:]` and `s2[j:]` for the current `i`
5. Initialize the base case:
   - set `dp[n] = true` (when both suffixes are empty)
6. Iterate `i` from `m` down to `0`:
   - keep a variable `nextDp` that represents the value to the right (`dp[j + 1]`) for the current row
   - initialize it as `true` only when `i == m` (bottom row base case)
7. Iterate `j` from `n` down to `0`:
   - compute whether the state `(i, j)` is valid:
     - it is valid if taking from `s1` matches and the state below (`dp[j]`) was valid
     - or taking from `s2` matches and the state to the right (`nextDp`) is valid
   - write the result back into `dp[j]` (in-place update)
   - update `nextDp` to the new `dp[j]` for the next iteration to the left
8. After all updates, `dp[0]` tells whether `s3` can be formed starting from the beginning of both strings.
9. Return `dp[0]`

::tabs-start

```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        if n < m:
            s1, s2 = s2, s1
            m, n = n, m

        dp = [False for _ in range(n + 1)]
        dp[n] = True
        for i in range(m, -1, -1):
            nextDp = True if i == m else False
            for j in range(n, -1, -1):
                res = False if j < n else nextDp
                if i < m and s1[i] == s3[i + j] and dp[j]:
                    res = True
                if j < n and s2[j] == s3[i + j] and nextDp:
                    res = True
                dp[j] = res
                nextDp = dp[j]
        return dp[0]
```

```java
public class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        if (n < m) {
            String temp = s1;
            s1 = s2;
            s2 = temp;
            int tempLen = m;
            m = n;
            n = tempLen;
        }

        boolean[] dp = new boolean[n + 1];
        dp[n] = true;
        for (int i = m; i >= 0; i--) {
            boolean nextDp = (i == m ? true : false);
            for (int j = n; j >= 0; j--) {
                boolean res = (j < n ? false : nextDp);
                if (i < m && s1.charAt(i) == s3.charAt(i + j) && dp[j]) {
                    res = true;
                }
                if (j < n && s2.charAt(j) == s3.charAt(i + j) && nextDp) {
                    res = true;
                }
                dp[j] = res;
                nextDp = dp[j];
            }
        }
        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int m = s1.size(), n = s2.size();
        if (m + n != s3.size()) return false;
        if (n < m) {
            swap(s1, s2);
            swap(m, n);
        }

        vector<bool> dp(n + 1, false);
        dp[n] = true;
        for (int i = m; i >= 0; i--) {
            bool nextDp = (i == m ? true : false);
            for (int j = n; j >= 0; j--) {
                bool res = (j < n ? false : nextDp);
                if (i < m && s1[i] == s3[i + j] && dp[j]) {
                    res = true;
                }
                if (j < n && s2[j] == s3[i + j] && nextDp) {
                    res = true;
                }
                dp[j] = res;
                nextDp = dp[j];
            }
        }
        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @param {string} s3
     * @return {boolean}
     */
    isInterleave(s1, s2, s3) {
        let m = s1.length,
            n = s2.length;
        if (m + n !== s3.length) return false;
        if (n < m) {
            [s1, s2] = [s2, s1];
            [m, n] = [n, m];
        }

        let dp = Array(n + 1).fill(false);
        dp[n] = true;
        for (let i = m; i >= 0; i--) {
            let nextDp = (i === m ? true : false);
            for (let j = n; j >= 0; j--) {
                let res = (j < n ? false : nextDp);
                if (i < m && s1[i] === s3[i + j] && dp[j]) {
                    res = true;
                }
                if (j < n && s2[j] === s3[i + j] && nextDp) {
                    res = true;
                }
                dp[j] = res;
                nextDp = dp[j];
            }
        }
        return dp[0];
    }
}
```

```csharp
public class Solution {
    public bool IsInterleave(string s1, string s2, string s3) {
        int m = s1.Length, n = s2.Length;
        if (m + n != s3.Length) return false;
        if (n < m) {
            var temp = s1;
            s1 = s2;
            s2 = temp;
            int tempLen = m;
            m = n;
            n = tempLen;
        }

        bool[] dp = new bool[n + 1];
        dp[n] = true;
        for (int i = m; i >= 0; i--) {
            bool nextDp = (i == m ? true : false);
            for (int j = n; j >= 0; j--) {
                bool res = (j < n ? false : nextDp);
                if (i < m && s1[i] == s3[i + j] && dp[j]) {
                    res = true;
                }
                if (j < n && s2[j] == s3[i + j] && nextDp) {
                    res = true;
                }
                dp[j] = res;
                nextDp = dp[j];
            }
        }
        return dp[0];
    }
}
```

```go
func isInterleave(s1, s2, s3 string) bool {
    m, n := len(s1), len(s2)
    if m+n != len(s3) {
        return false
    }
    if n < m {
        s1, s2 = s2, s1
        m, n = n, m
    }

    dp := make([]bool, n+1)
    dp[n] = true
    for i := m; i >= 0; i-- {
        nextDp := (i == m)
        for j := n; j >= 0; j-- {
            res := nextDp
            if j < n {
                res = false
            }
            if i < m && s1[i] == s3[i+j] && dp[j] {
                res = true
            }
            if j < n && s2[j] == s3[i+j] && nextDp {
                res = true
            }
            dp[j] = res
            nextDp = dp[j]
        }
    }
    return dp[0]
}
```

```kotlin
class Solution {
    fun isInterleave(s1: String, s2: String, s3: String): Boolean {
        var s1 = s1
        var s2 = s2
        var m = s1.length
        var n = s2.length
        if (m + n != s3.length) {
            return false
        }
        if (n < m) {
            val temp = s1
            s1 = s2
            s2 = temp

            val temp1 = m
            m = n
            n = temp1
        }

        val dp = BooleanArray(n + 1)
        dp[n] = true
        for (i in m downTo 0) {
            var nextDp = (i == m)
            for (j in n downTo 0) {
                var res = nextDp
                if (j < n) res = false
                if (i < m && s1[i] == s3[i + j] && dp[j]) {
                    res = true
                }
                if (j < n && s2[j] == s3[i + j] && nextDp) {
                    res = true
                }
                dp[j] = res
                nextDp = dp[j]
            }
        }
        return dp[0]
    }
}
```

```swift
class Solution {
    func isInterleave(_ s1: String, _ s2: String, _ s3: String) -> Bool {
        var s1 = Array(s1), s2 = Array(s2), s3 = Array(s3)
        var m = s1.count, n = s2.count
        if m + n != s3.count { return false }
        if n < m {
            swap(&s1, &s2)
            swap(&m, &n)
        }

        var dp = Array(repeating: false, count: n + 1)
        dp[n] = true

        for i in stride(from: m, through: 0, by: -1) {
            var nextDp = (i == m)
            for j in stride(from: n, through: 0, by: -1) {
                var res = nextDp
                if j < n {
                    res = false
                }
                if i < m && s1[i] == s3[i + j] && dp[j] {
                    res = true
                }
                if j < n && s2[j] == s3[i + j] && nextDp {
                    res = true
                }
                dp[j] = res
                nextDp = dp[j]
            }
        }
        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(min(m, n))$

> Where $m$ is the length of the string $s1$ and $n$ is the length of the string $s2$.

---

## Common Pitfalls

### Skipping the Length Check

A quick optimization that many solutions miss is checking if `len(s1) + len(s2) == len(s3)` upfront. If the lengths do not match, interleaving is impossible regardless of the characters. Skipping this check leads to unnecessary computation and can cause index out-of-bounds errors in some implementations.

### Confusing Position Tracking with Three Indices

Since `k = i + j` always holds (where `k` is position in `s3`, `i` in `s1`, `j` in `s2`), you only need to track two indices. Some implementations incorrectly track all three independently, leading to inconsistent states or missed memoization opportunities. The key insight is that knowing positions in `s1` and `s2` uniquely determines the position in `s3`.

### Greedy Character Matching

When both `s1[i]` and `s2[j]` match `s3[k]`, you cannot greedily choose one over the other. Both branches must be explored. A common bug is to always prefer taking from `s1` (or `s2`) when both match, which fails for cases like `s1 = "a"`, `s2 = "a"`, `s3 = "aa"` where either order works but a greedy approach might get stuck.
