## 1. Recursion

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
                return (i === s1.length) && (j === s2.length);
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
        }

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ {m + n})$
* Space complexity: $O(m + n)$

> Where $m$ is the length of the string $s1$ and $n$ is the length of the string $s2$.

---

## 2. Dynamic Programming (Top-Down)

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
        const m = s1.length, n = s2.length;
        if (m + n !== s3.length) return false;
    
        const dp = Array.from({ length: m + 1 }, () => 
                   Array(n + 1).fill(-1));
        const dfs = (i, j, k) => {
            if (k === s3.length) {
                return (i === s1.length) && (j === s2.length);
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
        }

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the length of the string $s1$ and $n$ is the length of the string $s2$.

---

## 3. Dynamic Programming (Bottom-Up)

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
        let m = s1.length, n = s2.length;
        if (m + n !== s3.length) {
            return false;
        }

        const dp = Array.from({ length: m + 1 }, () =>
                   Array(n + 1).fill(false));
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the length of the string $s1$ and $n$ is the length of the string $s2$.

---

## 4. Dynamic Programming (Space Optimized)

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
            nextDp[n] = true;
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
            nextDp[n] = true;
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
        let m = s1.length, n = s2.length;
        if (m + n !== s3.length) return false;
        if (n < m) {
            [s1, s2] = [s2, s1];
            [m, n] = [n, m];
        }
        
        let dp = Array(n + 1).fill(false);
        dp[n] = true;
        for (let i = m; i >= 0; i--) {
            let nextDp = Array(n + 1).fill(false);
            nextDp[n] = true;
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
            nextDp[n] = true;
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
        nextDp[n] = true
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
            nextDp[n] = true
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(min(m, n))$

> Where $m$ is the length of the string $s1$ and $n$ is the length of the string $s2$.

---

## 5. Dynamic Programming (Optimal)

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
            nextDp = True
            for j in range(n - 1, -1, -1):
                res = False
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
            boolean nextDp = true;
            for (int j = n - 1; j >= 0; j--) {
                boolean res = false;
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
            bool nextDp = true;
            for (int j = n - 1; j >= 0; j--) {
                bool res = false;
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
        let m = s1.length, n = s2.length;
        if (m + n !== s3.length) return false;
        if (n < m) {
            [s1, s2] = [s2, s1];
            [m, n] = [n, m];
        }

        let dp = Array(n + 1).fill(false);
        dp[n] = true;
        for (let i = m; i >= 0; i--) {
            let nextDp = true;
            for (let j = n - 1; j >= 0; j--) {
                let res = false;
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
            bool nextDp = true;
            for (int j = n - 1; j >= 0; j--) {
                bool res = false;
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
        nextDp := true
        for j := n - 1; j >= 0; j-- {
            res := false
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
            var nextDp = true
            for (j in n - 1 downTo 0) {
                var res = false
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(min(m, n))$

> Where $m$ is the length of the string $s1$ and $n$ is the length of the string $s2$.