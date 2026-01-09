## 1. Recursion

### Intuition

We need to check if the string `s` matches the pattern `p`, where:
- `.` matches any single character
- `*` means "zero or more of the previous character"

A recursive approach works because at each step we decide how to match the current part of the pattern with the current part of the string.

The function `dfs(i, j)` represents:
**"Can `s[i:]` be matched by `p[j:]`?"**

There are two main cases:
1. The next pattern character is NOT `*`
   - then the current characters must match (directly or via `.`), and we move both pointers forward.
2. The next pattern character IS `*`
   - then we have two choices:
     - **skip** the `x*` part entirely (use `*` as zero occurrences)
     - **use** the `x*` part to match one character from the string (if it matches), and stay on the same pattern index to potentially match more

### Algorithm

1. Let `m = len(s)` and `n = len(p)`.
2. Define a recursive function `dfs(i, j)`:
   - `i` is the current index in `s`
   - `j` is the current index in `p`
3. If `j` reaches the end of the pattern:
   - Return `true` only if `i` also reached the end of the string
4. Compute whether the current characters match:
   - `match` is `true` if `i` is in bounds and (`s[i] == p[j]` or `p[j] == '.'`)
5. If the next character in the pattern is `*` (i.e., `p[j + 1] == '*'`):
   - Option 1: Skip `p[j]` and `*` → `dfs(i, j + 2)`
   - Option 2: If `match` is `true`, consume one character from `s` and keep pattern at `j` → `dfs(i + 1, j)`
   - Return `true` if either option works
6. Otherwise (no `*` case):
   - If `match` is `true`, move both pointers forward → `dfs(i + 1, j + 1)`
   - If not, return `false`
7. Start with `dfs(0, 0)` and return the result

::tabs-start

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)

        def dfs(i, j):
            if j == n:
                return i == m

            match = i < m and (s[i] == p[j] or p[j] == ".")
            if (j + 1) < n and p[j + 1] == "*":
                return (dfs(i, j + 2) or          # don't use *
                       (match and dfs(i + 1, j))) # use *
            if match:
                return dfs(i + 1, j + 1)
            return False

        return dfs(0, 0)
```

```java
public class Solution {
    public boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        return dfs(0, 0, s, p, m, n);
    }

    private boolean dfs(int i, int j, String s, String p, int m, int n) {
        if (j == n) return i == m;

        boolean match = i < m && (s.charAt(i) == p.charAt(j) ||
                        p.charAt(j) == '.');
        if (j + 1 < n && p.charAt(j + 1) == '*') {
            return dfs(i, j + 2, s, p, m, n) ||
                   (match && dfs(i + 1, j, s, p, m, n));
        }

        if (match) {
            return dfs(i + 1, j + 1, s, p, m, n);
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        return dfs(0, 0, s, p, m, n);
    }

    bool dfs(int i, int j, const string& s, const string& p, int m, int n) {
        if (j == n) return i == m;

        bool match = (i < m && (s[i] == p[j] || p[j] == '.'));
        if (j + 1 < n && p[j + 1] == '*') {
            return dfs(i, j + 2, s, p, m, n) ||
                   (match && dfs(i + 1, j, s, p, m, n));
        }

        if (match) {
            return dfs(i + 1, j + 1, s, p, m, n);
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} p
     * @return {boolean}
     */
    isMatch(s, p) {
        let m = s.length,
            n = p.length;

        const dfs = (i, j) => {
            if (j === n) {
                return i === m;
            }

            let match = i < m && (s[i] === p[j] || p[j] === '.');
            if (j + 1 < n && p[j + 1] === '*') {
                return dfs(i, j + 2) || (match && dfs(i + 1, j));
            }

            if (match) {
                return dfs(i + 1, j + 1);
            }

            return false;
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public bool IsMatch(string s, string p) {
        int m = s.Length, n = p.Length;
        return Dfs(0, 0, s, p, m, n);
    }

    private bool Dfs(int i, int j, string s, string p, int m, int n) {
        if (j == n) {
            return i == m;
        }

        bool match = i < m && (s[i] == p[j] || p[j] == '.');
        if (j + 1 < n && p[j + 1] == '*') {
            return Dfs(i, j + 2, s, p, m, n) ||
                   (match && Dfs(i + 1, j, s, p, m, n));
        }

        if (match) {
            return Dfs(i + 1, j + 1, s, p, m, n);
        }

        return false;
    }
}
```

```go
func isMatch(s string, p string) bool {
    m, n := len(s), len(p)

    var dfs func(i, j int) bool
    dfs = func(i, j int) bool {
        if j == n {
            return i == m
        }

        match := i < m && (s[i] == p[j] || p[j] == '.')

        if (j+1) < n && p[j+1] == '*' {
            return dfs(i, j+2) || (match && dfs(i+1, j))
        }

        if match {
            return dfs(i+1, j+1)
        }

        return false
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    fun isMatch(s: String, p: String): Boolean {
        val m = s.length
        val n = p.length

        fun dfs(i: Int, j: Int): Boolean {
            if (j == n) return i == m

            val match = i < m && (s[i] == p[j] || p[j] == '.')

            if ((j + 1) < n && p[j + 1] == '*') {
                return dfs(i, j + 2) || (match && dfs(i + 1, j))
            }

            return match && dfs(i + 1, j + 1)
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func isMatch(_ s: String, _ p: String) -> Bool {
        let sArr = Array(s), pArr = Array(p)
        let m = sArr.count, n = pArr.count

        func dfs(_ i: Int, _ j: Int) -> Bool {
            if j == n {
                return i == m
            }

            let match = i < m && (sArr[i] == pArr[j] || pArr[j] == ".")

            if j + 1 < n && pArr[j + 1] == "*" {
                return dfs(i, j + 2) || (match && dfs(i + 1, j))
            }

            if match {
                return dfs(i + 1, j + 1)
            }

            return false
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ {m + n})$
- Space complexity: $O(m + n)$

> Where $m$ is the length of the string $s$ and $n$ is the length of the string $p$.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

We need to check if `s` matches pattern `p`, where:
- `.` matches any single character
- `*` means "zero or more of the previous character"

A recursive solution explores all matching possibilities, especially because `*` can represent many choices.
However, the same `(i, j)` states get recomputed multiple times, making plain recursion slow.

So we use **top-down dynamic programming (memoization)**.

We define `dfs(i, j)` as:
**"Can the substring `s[i:]` match the pattern `p[j:]`?"**

Whenever we compute the answer for a state `(i, j)`, we store it in a cache so future calls can reuse it instantly.

### Algorithm

1. Let `m = len(s)` and `n = len(p)`.
2. Create a cache (map) to store results for states `(i, j)`.
3. Define a recursive function `dfs(i, j)`:
   - `i` is the current index in `s`
   - `j` is the current index in `p`
4. If `j` reaches the end of the pattern:
   - Return `true` only if `i` also reaches the end of the string
5. If `(i, j)` is already in the cache:
   - Return the cached result
6. Check if the current characters match:
   - `match` is `true` if `i < m` and (`s[i] == p[j]` or `p[j] == '.'`)
7. If the next character in the pattern is `*` (`p[j + 1] == '*'`):
   - Option 1: Skip the `x*` part completely → `dfs(i, j + 2)`
   - Option 2: If `match` is `true`, consume one char from `s` and stay on `j` → `dfs(i + 1, j)`
   - Store and return whether either option works
8. Otherwise (no `*` case):
   - If `match` is `true`, move both pointers forward → `dfs(i + 1, j + 1)`
   - Otherwise, return `false`
9. Store the computed result in the cache before returning it
10. Start with `dfs(0, 0)` and return the final answer

::tabs-start

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        cache = {}

        def dfs(i, j):
            if j == n:
                return i == m
            if (i, j) in cache:
                return cache[(i, j)]

            match = i < m and (s[i] == p[j] or p[j] == ".")
            if (j + 1) < n and p[j + 1] == "*":
                cache[(i, j)] = (dfs(i, j + 2) or
                                (match and dfs(i + 1, j)))
                return cache[(i, j)]

            if match:
                cache[(i, j)] = dfs(i + 1, j + 1)
                return cache[(i, j)]

            cache[(i, j)] = False
            return False

        return dfs(0, 0)
```

```java
public class Solution {
    private Boolean[][] dp;

    public boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        dp = new Boolean[m + 1][n + 1];
        return dfs(0, 0, s, p, m, n);
    }

    private boolean dfs(int i, int j, String s, String p, int m, int n) {
        if (j == n) {
            return i == m;
        }
        if (dp[i][j] != null) {
            return dp[i][j];
        }

        boolean match = i < m && (s.charAt(i) == p.charAt(j) ||
                                  p.charAt(j) == '.');
        if (j + 1 < n && p.charAt(j + 1) == '*') {
            dp[i][j] = dfs(i, j + 2, s, p, m, n) ||
                       (match && dfs(i + 1, j, s, p, m, n));
        } else {
            dp[i][j] = match && dfs(i + 1, j + 1, s, p, m, n);
        }

        return dp[i][j];
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;

public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        dp.assign(m + 1, vector<int>(n + 1, -1));
        return dfs(0, 0, s, p, m, n);
    }

private:
    bool dfs(int i, int j, string& s, string& p, int m, int n) {
        if (j == n) {
            return i == m;
        }
        if (dp[i][j] != -1) {
            return dp[i][j];
        }
        bool match = i < m && (s[i] == p[j] || p[j] == '.');
        if (j + 1 < n && p[j + 1] == '*') {
            dp[i][j] = dfs(i, j + 2, s, p, m, n) ||
                       (match && dfs(i + 1, j, s, p, m, n));
        } else {
            dp[i][j] = match && dfs(i + 1, j + 1, s, p, m, n);
        }
        return dp[i][j];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} p
     * @return {boolean}
     */
    isMatch(s, p) {
        const m = s.length,
            n = p.length;
        let dp = Array(m + 1)
            .fill()
            .map(() => Array(n + 1).fill(null));

        const dfs = (i, j) => {
            if (j === n) {
                return i === m;
            }
            if (dp[i][j] !== null) {
                return dp[i][j];
            }
            const match = i < m && (s[i] === p[j] || p[j] === '.');
            if (j + 1 < n && p[j + 1] === '*') {
                dp[i][j] = dfs(i, j + 2) || (match && dfs(i + 1, j));
            } else {
                dp[i][j] = match && dfs(i + 1, j + 1);
            }
            return dp[i][j];
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private bool?[,] dp;

    public bool IsMatch(string s, string p) {
        int m = s.Length, n = p.Length;
        dp = new bool?[m + 1, n + 1];
        return Dfs(0, 0, s, p, m, n);
    }

    private bool Dfs(int i, int j, string s, string p, int m, int n) {
        if (j == n) {
            return i == m;
        }
        if (dp[i, j].HasValue) {
            return dp[i, j].Value;
        }
        bool match = i < m && (s[i] == p[j] || p[j] == '.');
        if (j + 1 < n && p[j + 1] == '*') {
            dp[i, j] = Dfs(i, j + 2, s, p, m, n) ||
                       (match && Dfs(i + 1, j, s, p, m, n));
        } else {
            dp[i, j] = match && Dfs(i + 1, j + 1, s, p, m, n);
        }
        return dp[i, j].Value;
    }
}
```

```go
func isMatch(s string, p string) bool {
    m, n := len(s), len(p)
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, j int) bool
    dfs = func(i, j int) bool {
        if j == n {
            return i == m
        }
        if dp[i][j] != -1 {
            return dp[i][j] == 1
        }

        match := i < m && (s[i] == p[j] || p[j] == '.')

        if (j+1) < n && p[j+1] == '*' {
            dp[i][j] = boolToInt(dfs(i, j+2) || (match && dfs(i+1, j)))
            return dp[i][j] == 1
        }

        if match {
            dp[i][j] = boolToInt(dfs(i+1, j+1))
            return dp[i][j] == 1
        }

        dp[i][j] = 0
        return false
    }

    return dfs(0, 0)
}

func boolToInt(b bool) int {
    if b {
        return 1
    }
    return 0
}
```

```kotlin
class Solution {
    fun isMatch(s: String, p: String): Boolean {
        val m = s.length
        val n = p.length
        val dp = Array(m + 1) { IntArray(n + 1) { -1 } }

        fun dfs(i: Int, j: Int): Boolean {
            if (j == n) return i == m
            if (dp[i][j] != -1) return dp[i][j] == 1

            val match = i < m && (s[i] == p[j] || p[j] == '.')

            if ((j + 1) < n && p[j + 1] == '*') {
                dp[i][j] = if (dfs(i, j + 2) || (match && dfs(i + 1, j))) 1 else 0
                return dp[i][j] == 1
            }

            if (match) {
                dp[i][j] = if (dfs(i + 1, j + 1)) 1 else 0
                return dp[i][j] == 1
            }

            dp[i][j] = 0
            return false
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func isMatch(_ s: String, _ p: String) -> Bool {
        let sArr = Array(s), pArr = Array(p)
        let m = sArr.count, n = pArr.count
        var cache = [[Bool?]](repeating: [Bool?](repeating: nil, count: n + 1), count: m + 1)

        func dfs(_ i: Int, _ j: Int) -> Bool {
            if j == n {
                return i == m
            }
            if let cached = cache[i][j] {
                return cached
            }

            let match = i < m && (sArr[i] == pArr[j] || pArr[j] == ".")

            if j + 1 < n && pArr[j + 1] == "*" {
                cache[i][j] = dfs(i, j + 2) || (match && dfs(i + 1, j))
                return cache[i][j]!
            }

            if match {
                cache[i][j] = dfs(i + 1, j + 1)
                return cache[i][j]!
            }

            cache[i][j] = false
            return false
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the length of the string $s$ and $n$ is the length of the string $p$.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We want to check whether the string `s` matches the pattern `p`, where:
- `.` matches any single character
- `*` means "zero or more of the previous character"

Instead of recursion, we can solve this using **bottom-up dynamic programming** by building answers for smaller suffixes of the strings.

We define a DP state that answers:
**"Can the substring `s[i:]` be matched by the pattern `p[j:]`?"**

By filling a table from the end of both strings toward the beginning, we ensure that when we compute a state, all the states it depends on are already known.

### Algorithm

1. Create a 2D boolean DP table `dp` of size
   `(len(s) + 1) × (len(p) + 1)`.
2. Let `dp[i][j]` represent whether `s[i:]` matches `p[j:]`.
3. Initialize the base case:
   - `dp[len(s)][len(p)] = true` because two empty strings match
4. Fill the table from bottom to top and right to left:
5. For each position `(i, j)`:
   - First check if the current characters match:
     - `match` is `true` if `i < len(s)` and (`s[i] == p[j]` or `p[j] == '.'`)
6. If the next character in the pattern is `*`:
   - Option 1: Treat `x*` as zero occurrences → `dp[i][j] = dp[i][j + 2]`
   - Option 2: If `match` is `true`, consume one character from `s` and stay on the same pattern → `dp[i + 1][j]`
   - Set `dp[i][j]` to `true` if either option works
7. If the next character is not `*`:
   - If `match` is `true`, move both pointers forward:
     - `dp[i][j] = dp[i + 1][j + 1]`
8. After filling the table, the final answer is stored in `dp[0][0]`
9. Return `dp[0][0]`

::tabs-start

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        dp = [[False] * (len(p) + 1) for i in range(len(s) + 1)]
        dp[len(s)][len(p)] = True

        for i in range(len(s), -1, -1):
            for j in range(len(p) - 1, -1, -1):
                match = i < len(s) and (s[i] == p[j] or p[j] == ".")

                if (j + 1) < len(p) and p[j + 1] == "*":
                    dp[i][j] = dp[i][j + 2]
                    if match:
                        dp[i][j] = dp[i + 1][j] or dp[i][j]
                elif match:
                    dp[i][j] = dp[i + 1][j + 1]

        return dp[0][0]
```

```java
class Solution {
    public boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[m][n] = true;

        for (int i = m; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                boolean match = i < m && (s.charAt(i) == p.charAt(j) ||
                                          p.charAt(j) == '.');

                if ((j + 1) < n && p.charAt(j + 1) == '*') {
                    dp[i][j] = dp[i][j + 2];
                    if (match) {
                        dp[i][j] = dp[i + 1][j] || dp[i][j];
                    }
                } else if (match) {
                    dp[i][j] = dp[i + 1][j + 1];
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
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[m][n] = true;

        for (int i = m; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                bool match = i < m && (s[i] == p[j] || p[j] == '.');

                if ((j + 1) < n && p[j + 1] == '*') {
                    dp[i][j] = dp[i][j + 2];
                    if (match) {
                        dp[i][j] = dp[i + 1][j] || dp[i][j];
                    }
                } else if (match) {
                    dp[i][j] = dp[i + 1][j + 1];
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
     * @param {string} p
     * @return {boolean}
     */
    isMatch(s, p) {
        const dp = new Array(s.length + 1)
            .fill(false)
            .map(() => new Array(p.length + 1).fill(false));
        dp[s.length][p.length] = true;

        for (let i = s.length; i >= 0; i--) {
            for (let j = p.length - 1; j >= 0; j--) {
                const match = i < s.length && (s[i] === p[j] || p[j] === '.');

                if (j + 1 < p.length && p[j + 1] === '*') {
                    dp[i][j] = dp[i][j + 2];
                    if (match) {
                        dp[i][j] = dp[i + 1][j] || dp[i][j];
                    }
                } else if (match) {
                    dp[i][j] = dp[i + 1][j + 1];
                }
            }
        }

        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public bool IsMatch(string s, string p) {
        bool[,] dp = new bool[s.Length + 1, p.Length + 1];
        dp[s.Length, p.Length] = true;

        for (int i = s.Length; i >= 0; i--) {
            for (int j = p.Length - 1; j >= 0; j--) {
                bool match = i < s.Length &&
                             (s[i] == p[j] || p[j] == '.');

                if ((j + 1) < p.Length && p[j + 1] == '*') {
                    dp[i, j] = dp[i, j + 2];
                    if (match) {
                        dp[i, j] = dp[i + 1, j] || dp[i, j];
                    }
                } else if (match) {
                    dp[i, j] = dp[i + 1, j + 1];
                }
            }
        }

        return dp[0, 0];
    }
}
```

```go
func isMatch(s, p string) bool {
    m, n := len(s), len(p)
    dp := make([][]bool, m+1)
    for i := range dp {
        dp[i] = make([]bool, n+1)
    }
    dp[m][n] = true

    for i := m; i >= 0; i-- {
        for j := n - 1; j >= 0; j-- {
            match := i < m && (s[i] == p[j] || p[j] == '.')

            if j+1 < n && p[j+1] == '*' {
                dp[i][j] = dp[i][j+2]
                if match {
                    dp[i][j] = dp[i][j] || dp[i+1][j]
                }
            } else if match {
                dp[i][j] = dp[i+1][j+1]
            }
        }
    }
    return dp[0][0]
}
```

```kotlin
class Solution {
    fun isMatch(s: String, p: String): Boolean {
        val m = s.length
        val n = p.length
        val dp = Array(m + 1) { BooleanArray(n + 1) }
        dp[m][n] = true

        for (i in m downTo 0) {
            for (j in n - 1 downTo 0) {
                val match = i < m && (s[i] == p[j] || p[j] == '.')

                if (j + 1 < n && p[j + 1] == '*') {
                    dp[i][j] = dp[i][j + 2] || (match && dp[i + 1][j])
                } else if (match) {
                    dp[i][j] = dp[i + 1][j + 1]
                }
            }
        }
        return dp[0][0]
    }
}
```

```swift
class Solution {
    func isMatch(_ s: String, _ p: String) -> Bool {
        let sArr = Array(s), pArr = Array(p)
        let m = sArr.count, n = pArr.count
        var dp = Array(repeating: Array(repeating: false, count: n + 1), count: m + 1)
        dp[m][n] = true

        for i in stride(from: m, through: 0, by: -1) {
            for j in stride(from: n - 1, through: 0, by: -1) {
                let match = i < m && (sArr[i] == pArr[j] || pArr[j] == ".")

                if j + 1 < n && pArr[j + 1] == "*" {
                    dp[i][j] = dp[i][j + 2]
                    if match {
                        dp[i][j] = dp[i][j] || dp[i + 1][j]
                    }
                } else if match {
                    dp[i][j] = dp[i + 1][j + 1]
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

> Where $m$ is the length of the string $s$ and $n$ is the length of the string $p$.

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

We need to determine if string `s` matches pattern `p`, where:
- `.` matches any single character
- `*` means "zero or more of the previous character"

In the bottom-up DP solution, we used a 2D table `dp[i][j]` meaning:
**"Does `s[i:]` match `p[j:]`?"**

But each row `i` only depends on:
- the next row (`i + 1`)
- values within the current row while moving across `j`

So we don't need the full 2D table. We can compress it into:
- `dp` → represents the row for `i + 1`
- `nextDp` → represents the row for `i`

This keeps the same logic while using much less memory.

### Algorithm

1. Create a 1D boolean array `dp` of size `len(p) + 1`:
   - it represents results for matching `s[i+1:]` with `p[j:]`
2. Initialize the base case:
   - `dp[len(p)] = true` (empty pattern matches empty string at the very end)
3. Iterate `i` from `len(s)` down to `0`:
   - Create a new array `nextDp` for the current row (`i`)
   - Set `nextDp[len(p)] = (i == len(s))`
     - empty pattern only matches if we are also at the end of the string
4. For each `i`, iterate `j` from `len(p) - 1` down to `0`:
   - Compute `match`:
     - `true` if `i < len(s)` and (`s[i] == p[j]` or `p[j] == '.'`)
   - If the next pattern character is `*`:
     - Option 1: skip `x*` (zero occurrences) → `nextDp[j + 2]`
     - Option 2: if `match`, consume one char from `s` and stay on `j` → `dp[j]`
     - Combine both options to set `nextDp[j]`
   - Otherwise (no `*`):
     - if `match`, move both forward → `nextDp[j] = dp[j + 1]`
5. After finishing the row, set `dp = nextDp`
6. The final answer is `dp[0]` (matching `s[0:]` with `p[0:]`)
7. Return `dp[0]`

::tabs-start

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        dp = [False] * (len(p) + 1)
        dp[len(p)] = True

        for i in range(len(s), -1, -1):
            nextDp = [False] * (len(p) + 1)
            nextDp[len(p)] = (i == len(s))

            for j in range(len(p) - 1, -1, -1):
                match = i < len(s) and (s[i] == p[j] or p[j] == ".")

                if (j + 1) < len(p) and p[j + 1] == "*":
                    nextDp[j] = nextDp[j + 2]
                    if match:
                        nextDp[j] |= dp[j]
                elif match:
                    nextDp[j] = dp[j + 1]

            dp = nextDp

        return dp[0]
```

```java
public class Solution {
    public boolean isMatch(String s, String p) {
        boolean[] dp = new boolean[p.length() + 1];
        dp[p.length()] = true;

        for (int i = s.length(); i >= 0; i--) {
            boolean[] nextDp = new boolean[p.length() + 1];
            nextDp[p.length()] = (i == s.length());

            for (int j = p.length() - 1; j >= 0; j--) {
                boolean match = i < s.length() &&
                                (s.charAt(i) == p.charAt(j) ||
                                 p.charAt(j) == '.');

                if (j + 1 < p.length() && p.charAt(j + 1) == '*') {
                    nextDp[j] = nextDp[j + 2];
                    if (match) {
                        nextDp[j] |= dp[j];
                    }
                } else if (match) {
                    nextDp[j] = dp[j + 1];
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
    bool isMatch(string s, string p) {
        vector<bool> dp(p.length() + 1, false);
        dp[p.length()] = true;

        for (int i = s.length(); i >= 0; i--) {
            vector<bool> nextDp(p.length() + 1, false);
            nextDp[p.length()] = (i == s.length());

            for (int j = p.length() - 1; j >= 0; j--) {
                bool match = i < s.length() &&
                             (s[i] == p[j] || p[j] == '.');

                if (j + 1 < p.length() && p[j + 1] == '*') {
                    nextDp[j] = nextDp[j + 2];
                    if (match) {
                        nextDp[j] = nextDp[j] || dp[j];
                    }
                } else if (match) {
                    nextDp[j] = dp[j + 1];
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
     * @param {string} s
     * @param {string} p
     * @return {boolean}
     */
    isMatch(s, p) {
        let dp = new Array(p.length + 1).fill(false);
        dp[p.length] = true;

        for (let i = s.length; i >= 0; i--) {
            let nextDp = new Array(p.length + 1).fill(false);
            nextDp[p.length] = i === s.length;

            for (let j = p.length - 1; j >= 0; j--) {
                const match = i < s.length && (s[i] === p[j] || p[j] === '.');

                if (j + 1 < p.length && p[j + 1] === '*') {
                    nextDp[j] = nextDp[j + 2];
                    if (match) {
                        nextDp[j] = nextDp[j] || dp[j];
                    }
                } else if (match) {
                    nextDp[j] = dp[j + 1];
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
    public bool IsMatch(string s, string p) {
        bool[] dp = new bool[p.Length + 1];
        dp[p.Length] = true;

        for (int i = s.Length; i >= 0; i--) {
            bool[] nextDp = new bool[p.Length + 1];
            nextDp[p.Length] = (i == s.Length);

            for (int j = p.Length - 1; j >= 0; j--) {
                bool match = i < s.Length && (s[i] == p[j] || p[j] == '.');

                if (j + 1 < p.Length && p[j + 1] == '*') {
                    nextDp[j] = nextDp[j + 2];
                    if (match) {
                        nextDp[j] |= dp[j];
                    }
                } else if (match) {
                    nextDp[j] = dp[j + 1];
                }
            }

            dp = nextDp;
        }

        return dp[0];
    }
}
```

```go
func isMatch(s, p string) bool {
    m, n := len(s), len(p)
    dp := make([]bool, n+1)
    dp[n] = true

    for i := m; i >= 0; i-- {
        nextDp := make([]bool, n+1)
        nextDp[n] = i == m

        for j := n - 1; j >= 0; j-- {
            match := i < m && (s[i] == p[j] || p[j] == '.')

            if j+1 < n && p[j+1] == '*' {
                nextDp[j] = nextDp[j+2] || (match && dp[j])
            } else if match {
                nextDp[j] = dp[j+1]
            }
        }
        dp = nextDp
    }
    return dp[0]
}
```

```kotlin
class Solution {
    fun isMatch(s: String, p: String): Boolean {
        val m = s.length
        val n = p.length
        var dp = BooleanArray(n + 1)
        dp[n] = true

        for (i in m downTo 0) {
            val nextDp = BooleanArray(n + 1)
            nextDp[n] = (i == m)

            for (j in n - 1 downTo 0) {
                val match = i < m && (s[i] == p[j] || p[j] == '.')

                if (j + 1 < n && p[j + 1] == '*') {
                    nextDp[j] = nextDp[j + 2] || (match && dp[j])
                } else if (match) {
                    nextDp[j] = dp[j + 1]
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
    func isMatch(_ s: String, _ p: String) -> Bool {
        let sArr = Array(s), pArr = Array(p)
        var dp = Array(repeating: false, count: pArr.count + 1)
        dp[pArr.count] = true

        for i in stride(from: sArr.count, through: 0, by: -1) {
            var nextDp = Array(repeating: false, count: pArr.count + 1)
            nextDp[pArr.count] = (i == sArr.count)

            for j in stride(from: pArr.count - 1, through: 0, by: -1) {
                let match = i < sArr.count && (sArr[i] == pArr[j] || pArr[j] == ".")

                if j + 1 < pArr.count && pArr[j + 1] == "*" {
                    nextDp[j] = nextDp[j + 2]
                    if match {
                        nextDp[j] = nextDp[j] || dp[j]
                    }
                } else if match {
                    nextDp[j] = dp[j + 1]
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
- Space complexity: $O(n)$

> Where $m$ is the length of the string $s$ and $n$ is the length of the string $p$.

---

## 5. Dynamic Programming (Optimal)

### Intuition

We want to check if `s` matches `p`, where:
- `.` matches any single character
- `*` means "zero or more of the previous character"

The usual bottom-up DP state is:
**`dp[i][j]` = does `s[i:]` match `p[j:]`?**

A 2D table works, and a 1D array also works if we update carefully.
This "optimal" version goes one step further: it updates the 1D array **in-place** without creating a second array.

The main challenge with in-place updates is that some transitions need the **diagonal value**:
- `dp[i + 1][j + 1]` (move both forward)

When we compress to 1D, that diagonal value would get overwritten while we move left through `j`.
To handle this, we keep one extra variable (`dp1`) that stores the previous diagonal value as we update the row.

So at each `(i, j)` we can still access:
- `dp[j]`      → old value for `dp[i + 1][j]`
- `dp[j + 2]`  → current row value for skipping `x*`
- `dp1`        → old diagonal `dp[i + 1][j + 1]`

### Algorithm

1. Create a 1D boolean array `dp` of size `len(p) + 1`:
   - `dp[j]` represents whether `s[i + 1:]` matches `p[j:]` for the current outer loop
2. Initialize the base case:
   - `dp[len(p)] = true` (empty pattern matches empty string at the end)
3. Iterate `i` from `len(s)` down to `0`:
   - Save the old end value in `dp1` (this will act as the diagonal when `j` moves left)
   - Update `dp[len(p)] = (i == len(s))` since empty pattern only matches if string is also empty
4. Iterate `j` from `len(p) - 1` down to `0`:
   - Compute `match`:
     - `true` if `i < len(s)` and (`s[i] == p[j]` or `p[j] == '.'`)
   - If the next pattern character is `*`:
     - Option 1: skip `x*` → use `dp[j + 2]`
     - Option 2: if `match`, consume one char from `s` and stay on `j` → use `dp[j]`
     - Combine both to get the result for `dp[j]`
   - Otherwise (no `*`):
     - If `match`, move both forward → result is the diagonal `dp1`
   - Update `dp[j]` with the computed result
   - Shift the diagonal tracker:
     - set `dp1` to the old `dp[j]` value before it was overwritten
5. After all updates, `dp[0]` represents whether `s[0:]` matches `p[0:]`
6. Return `dp[0]`

::tabs-start

```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        dp = [False] * (len(p) + 1)
        dp[len(p)] = True

        for i in range(len(s), -1, -1):
            dp1 = dp[len(p)]
            dp[len(p)] = (i == len(s))

            for j in range(len(p) - 1, -1, -1):
                match = i < len(s) and (s[i] == p[j] or p[j] == ".")
                res = False
                if (j + 1) < len(p) and p[j + 1] == "*":
                    res = dp[j + 2]
                    if match:
                        res |= dp[j]
                elif match:
                    res = dp1
                dp[j], dp1 = res, dp[j]

        return dp[0]
```

```java
public class Solution {
    public boolean isMatch(String s, String p) {
        boolean[] dp = new boolean[p.length() + 1];
        dp[p.length()] = true;

        for (int i = s.length(); i >= 0; i--) {
            boolean dp1 = dp[p.length()];
            dp[p.length()] = (i == s.length());

            for (int j = p.length() - 1; j >= 0; j--) {
                boolean match = i < s.length() &&
                                (s.charAt(i) == p.charAt(j) ||
                                 p.charAt(j) == '.');
                boolean res = false;
                if (j + 1 < p.length() && p.charAt(j + 1) == '*') {
                    res = dp[j + 2];
                    if (match) {
                        res |= dp[j];
                    }
                } else if (match) {
                    res = dp1;
                }
                dp1 = dp[j];
                dp[j] = res;
            }
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        vector<bool> dp(p.length() + 1, false);
        dp[p.length()] = true;

        for (int i = s.length(); i >= 0; i--) {
            bool dp1 = dp[p.length()];
            dp[p.length()] = (i == s.length());

            for (int j = p.length() - 1; j >= 0; j--) {
                bool match = i < s.length() &&
                             (s[i] == p[j] || p[j] == '.');
                bool res = false;
                if (j + 1 < p.length() && p[j + 1] == '*') {
                    res = dp[j + 2];
                    if (match) {
                        res = res || dp[j];
                    }
                } else if (match) {
                    res = dp1;
                }
                dp1 = dp[j];
                dp[j] = res;
            }
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} p
     * @return {boolean}
     */
    isMatch(s, p) {
        let dp = new Array(p.length + 1).fill(false);
        dp[p.length] = true;

        for (let i = s.length; i >= 0; i--) {
            let dp1 = dp[p.length];
            dp[p.length] = i == s.length;

            for (let j = p.length - 1; j >= 0; j--) {
                const match = i < s.length && (s[i] === p[j] || p[j] === '.');
                let res = false;
                if (j + 1 < p.length && p[j + 1] === '*') {
                    res = dp[j + 2];
                    if (match) {
                        res = res || dp[j];
                    }
                } else if (match) {
                    res = dp1;
                }
                dp1 = dp[j];
                dp[j] = res;
            }
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public bool IsMatch(string s, string p) {
        bool[] dp = new bool[p.Length + 1];
        dp[p.Length] = true;

        for (int i = s.Length; i >= 0; i--) {
            bool dp1 = dp[p.Length];
            dp[p.Length] = (i == s.Length);

            for (int j = p.Length - 1; j >= 0; j--) {
                bool match = i < s.Length && (s[i] == p[j] || p[j] == '.');
                bool res = false;
                if (j + 1 < p.Length && p[j + 1] == '*') {
                    res = dp[j + 2];
                    if (match) {
                        res |= dp[j];
                    }
                } else if (match) {
                    res = dp1;
                }
                dp1 = dp[j];
                dp[j] = res;
            }
        }

        return dp[0];
    }
}
```

```go
func isMatch(s, p string) bool {
    m, n := len(s), len(p)
    dp := make([]bool, n+1)
    dp[n] = true

    for i := m; i >= 0; i-- {
        dp1 := dp[n]
        dp[n] = (i == m)

        for j := n - 1; j >= 0; j-- {
            match := i < m && (s[i] == p[j] || p[j] == '.')
            res := false
            if j+1 < n && p[j+1] == '*' {
                res = dp[j+2]
                if match {
                    res = res || dp[j]
                }
            } else if match {
                res = dp1
            }
            dp[j], dp1 = res, dp[j]
        }
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun isMatch(s: String, p: String): Boolean {
        val m = s.length
        val n = p.length
        var dp = BooleanArray(n + 1)
        dp[n] = true

        for (i in m downTo 0) {
            var dp1 = dp[n]
            dp[n] = (i == m)

            for (j in n - 1 downTo 0) {
                val match = i < m && (s[i] == p[j] || p[j] == '.')
                var res = false
                if (j + 1 < n && p[j + 1] == '*') {
                    res = dp[j + 2]
                    if (match) {
                        res = res || dp[j]
                    }
                } else if (match) {
                    res = dp1
                }
                dp1 = dp[j]
                dp[j] = res
            }
        }
        return dp[0]
    }
}
```

```swift
class Solution {
    func isMatch(_ s: String, _ p: String) -> Bool {
        let sArr = Array(s)
        let pArr = Array(p)
        var dp = [Bool](repeating: false, count: pArr.count + 1)
        dp[pArr.count] = true

        for i in stride(from: sArr.count, through: 0, by: -1) {
            var dp1 = dp[pArr.count]
            dp[pArr.count] = (i == sArr.count)

            for j in stride(from: pArr.count - 1, through: 0, by: -1) {
                let match = i < sArr.count && (sArr[i] == pArr[j] || pArr[j] == ".")
                var res = false
                if j + 1 < pArr.count && pArr[j + 1] == "*" {
                    res = dp[j + 2]
                    if match {
                        res = res || dp[j]
                    }
                } else if match {
                    res = dp1
                }
                dp1 = dp[j]
                dp[j] = res
            }
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(n)$

> Where $m$ is the length of the string $s$ and $n$ is the length of the string $p$.
