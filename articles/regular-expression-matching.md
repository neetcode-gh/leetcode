## 1. Recursion

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
        let m = s.length, n = p.length;

        const dfs = (i, j) => {
            if (j === n) {
                return i === m;
            }

            let match = i < m && (s[i] === p[j] || p[j] === '.');
            if (j + 1 < n && p[j + 1] === '*') {
                return dfs(i, j + 2) || 
                       (match && dfs(i + 1, j));
            }

            if (match) {
                return dfs(i + 1, j + 1);
            }

            return false;
        }

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ {m + n})$
* Space complexity: $O(m + n)$

> Where $m$ is the length of the string $s$ and $n$ is the length of the string $p$.

---

## 2. Dynamic Programming (Top-Down)

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
        const m = s.length, n = p.length;
        let dp = Array(m + 1).fill().map(() => 
                 Array(n + 1).fill(null));
        
        const dfs = (i, j) => {
            if (j === n) {
                return i === m;
            }
            if (dp[i][j] !== null) {
                return dp[i][j];
            }
            const match = i < m && (s[i] === p[j] || p[j] === '.');
            if (j + 1 < n && p[j + 1] === '*') {
                dp[i][j] = dfs(i, j + 2) || 
                           (match && dfs(i + 1, j));
            } else {
                dp[i][j] = match && dfs(i + 1, j + 1);
            }
            return dp[i][j];
        }

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the length of the string $s$ and $n$ is the length of the string $p$.

---

## 3. Dynamic Programming (Bottom-Up)

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
                const match = i < s.length && 
                              (s[i] === p[j] || p[j] === '.');

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the length of the string $s$ and $n$ is the length of the string $p$.

---

## 4. Dynamic Programming (Space Optimized)

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
            nextDp[p.length] = (i === s.length);

            for (let j = p.length - 1; j >= 0; j--) {
                const match = i < s.length && 
                              (s[i] === p[j] || p[j] === ".");

                if (j + 1 < p.length && p[j + 1] === "*") {
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(n)$

> Where $m$ is the length of the string $s$ and $n$ is the length of the string $p$.

---

## 5. Dynamic Programming (Optimal)

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
            dp[p.length] = (i == s.length);

            for (let j = p.length - 1; j >= 0; j--) {
                const match = i < s.length && 
                              (s[i] === p[j] || p[j] === ".");
                let res = false;
                if (j + 1 < p.length && p[j + 1] === "*") {
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(n)$

> Where $m$ is the length of the string $s$ and $n$ is the length of the string $p$.