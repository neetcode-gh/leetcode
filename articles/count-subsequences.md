## 1. Recursion

::tabs-start

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        if len(t) > len(s):
            return 0
            
        def dfs(i, j):
            if j == len(t):
                return 1
            if i == len(s):
                return 0
            
            res = dfs(i + 1, j)
            if s[i] == t[j]:
                res += dfs(i + 1, j + 1)
            return res
        
        return dfs(0, 0)
```

```java
public class Solution {
    public int numDistinct(String s, String t) {
        if (t.length() > s.length()) {
            return 0;
        }
        return dfs(s, t, 0, 0);
    }

    private int dfs(String s, String t, int i, int j) {
        if (j == t.length()) {
            return 1;
        }
        if (i == s.length()) {
            return 0;
        }

        int res = dfs(s, t, i + 1, j);
        if (s.charAt(i) == t.charAt(j)) {
            res += dfs(s, t, i + 1, j + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        if (t.length() > s.length()) {
            return 0;
        }
        return dfs(s, t, 0, 0);
    }

private:
    int dfs(const string &s, const string &t, int i, int j) {
        if (j == t.length()) {
            return 1;
        }
        if (i == s.length()) {
            return 0;
        }

        int res = dfs(s, t, i + 1, j);
        if (s[i] == t[j]) {
            res += dfs(s, t, i + 1, j + 1);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {number}
     */
    numDistinct(s, t) {
        if (t.length > s.length) {
            return 0;
        }
        
        const dfs = (i, j) => {
            if (j === t.length) {
                return 1;
            }
            if (i === s.length) {
                return 0;
            }

            let res = dfs(i + 1, j);
            if (s[i] === t[j]) {
                res += dfs(i + 1, j + 1);
            }
            return res;
        }

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public int NumDistinct(string s, string t) {
        if (t.Length > s.Length) {
            return 0;
        }
        return Dfs(s, t, 0, 0);
    }

    private int Dfs(string s, string t, int i, int j) {
        if (j == t.Length) {
            return 1;
        }
        if (i == s.Length) {
            return 0;
        }

        int res = Dfs(s, t, i + 1, j);
        if (s[i] == t[j]) {
            res += Dfs(s, t, i + 1, j + 1);
        }
        return res;
    }
}
```

```go
func numDistinct(s string, t string) int {
    if len(t) > len(s) {
        return 0
    }

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if j == len(t) {
            return 1
        }
        if i == len(s) {
            return 0
        }

        res := dfs(i+1, j)
        if s[i] == t[j] {
            res += dfs(i+1, j+1)
        }
        return res
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    fun numDistinct(s: String, t: String): Int {
        if (t.length > s.length) return 0

        fun dfs(i: Int, j: Int): Int {
            if (j == t.length) return 1
            if (i == s.length) return 0

            var res = dfs(i + 1, j)
            if (s[i] == t[j]) {
                res += dfs(i + 1, j + 1)
            }
            return res
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ m)$
* Space complexity: $O(m)$

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        if len(t) > len(s):
            return 0
        
        dp = {}
        def dfs(i, j):
            if j == len(t):
                return 1
            if i == len(s):
                return 0
            if (i, j) in dp:
                return dp[(i, j)]
            
            res = dfs(i + 1, j)
            if s[i] == t[j]:
                res += dfs(i + 1, j + 1)
            dp[(i, j)] = res
            return res

        return dfs(0, 0)
```

```java
public class Solution {
    private int[][] dp;

    public int numDistinct(String s, String t) {
        int m = s.length(), n = t.length();
        if (n > m) return 0;
        dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) {
            Arrays.fill(dp[i], -1);
        }
        return dfs(s, t, 0, 0);
    }

    private int dfs(String s, String t, int i, int j) {
        if (j == t.length()) return 1;
        if (i == s.length()) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int res = dfs(s, t, i + 1, j);
        if (s.charAt(i) == t.charAt(j)) {
            res += dfs(s, t, i + 1, j + 1);
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
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        if (n > m) return 0;
        dp.assign(m + 1, vector<int>(n + 1, -1));
        return dfs(s, t, 0, 0);
    }

private:
    int dfs(const string &s, const string &t, int i, int j) {
        if (j == t.size()) return 1;
        if (i == s.size()) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int res = dfs(s, t, i + 1, j);
        if (s[i] == t[j]) {
            res += dfs(s, t, i + 1, j + 1);
        }
        dp[i][j] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {number}
     */
    numDistinct(s, t) {
        let m = s.length, n = t.length;
        if (n > m) return 0;
        let dp = Array(m + 1).fill().map(() => 
                 Array(n + 1).fill(-1));

        const dfs = (i, j) => {
            if (j === n) return 1;
            if (i === m) return 0;
            if (dp[i][j] !== -1) return dp[i][j];

            let res = dfs(i + 1, j);
            if (s[i] === t[j]) {
                res += dfs(i + 1, j + 1);
            }
            dp[i][j] = res;
            return res;
        }

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private int?[,] dp;

    public int NumDistinct(string s, string t) {
        int m = s.Length, n = t.Length;
        if (n > m) return 0;
        dp = new int?[m + 1, n + 1];
        return Dfs(s, t, 0, 0);
    }

    private int Dfs(string s, string t, int i, int j) {
        if (j == t.Length) return 1;
        if (i == s.Length) return 0;
        if (dp[i, j].HasValue) return dp[i, j].Value;

        int res = Dfs(s, t, i + 1, j);
        if (s[i] == t[j]) {
            res += Dfs(s, t, i + 1, j + 1);
        }
        dp[i, j] = res;
        return res;
    }
}
```

```go
func numDistinct(s string, t string) int {
    if len(t) > len(s) {
        return 0
    }

    dp := make([][]int, len(s)+1)
    for i := range dp {
        dp[i] = make([]int, len(t)+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }
    
    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if j == len(t) {
            return 1
        }
        if i == len(s) {
            return 0
        }
        if dp[i][j] != -1 {
            return dp[i][j]
        }

        res := dfs(i+1, j)
        if s[i] == t[j] {
            res += dfs(i+1, j+1)
        }

        dp[i][j] = res
        return res
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    fun numDistinct(s: String, t: String): Int {
        if (t.length > s.length) return 0

        val dp = Array(s.length + 1) { IntArray(t.length + 1) { -1 } }

        fun dfs(i: Int, j: Int): Int {
            if (j == t.length) return 1
            if (i == s.length) return 0
            if (dp[i][j] != -1) return dp[i][j]

            var res = dfs(i + 1, j)
            if (s[i] == t[j]) {
                res += dfs(i + 1, j + 1)
            }

            dp[i][j] = res
            return res
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the length of the string $s$ and $n$ is the length of the string $t$.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        for i in range(m + 1):
            dp[i][n] = 1
        
        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                dp[i][j] = dp[i + 1][j]
                if s[i] == t[j]:
                    dp[i][j] += dp[i + 1][j + 1]
                    
        return dp[0][0]
```

```java
public class Solution {
    public int numDistinct(String s, String t) {
        int m = s.length(), n = t.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 0; i <= m; i++) {
            dp[i][n] = 1;
        }

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                dp[i][j] = dp[i + 1][j];
                if (s.charAt(i) == t.charAt(j)) {
                    dp[i][j] += dp[i + 1][j + 1];
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
    int numDistinct(string s, string t) {
        int m = s.length(), n = t.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

        for (int i = 0; i <= m; i++) {
            dp[i][n] = 1;
        }

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                dp[i][j] = dp[i + 1][j];
                if (s[i] == t[j]) {
                    dp[i][j] += dp[i + 1][j + 1];
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
     * @return {number}
     */
    numDistinct(s, t) {
        let m = s.length, n = t.length;
        let dp = Array.from({ length: m + 1 }, () => 
                 Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) {
            dp[i][n] = 1;
        }

        for (let i = m - 1; i >= 0; i--) {
            for (let j = n - 1; j >= 0; j--) {
                dp[i][j] = dp[i + 1][j];
                if (s[i] === t[j]) {
                    dp[i][j] += dp[i + 1][j + 1];
                }
            }
        }

        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public int NumDistinct(string s, string t) {
        int m = s.Length, n = t.Length;
        int[,] dp = new int[m + 1, n + 1];

        for (int i = 0; i <= m; i++) {
            dp[i, n] = 1;
        }

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                dp[i, j] = dp[i + 1, j];
                if (s[i] == t[j]) {
                    dp[i, j] += dp[i + 1, j + 1];
                }
            }
        }

        return dp[0, 0];
    }
}
```

```go
func numDistinct(s string, t string) int {
    m, n := len(s), len(t)
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }

    for i := 0; i <= m; i++ {
        dp[i][n] = 1
    }

    for i := m - 1; i >= 0; i-- {
        for j := n - 1; j >= 0; j-- {
            dp[i][j] = dp[i+1][j]
            if s[i] == t[j] {
                dp[i][j] += dp[i+1][j+1]
            }
        }
    }

    return dp[0][0]
}
```

```kotlin
class Solution {
    fun numDistinct(s: String, t: String): Int {
        val m = s.length
        val n = t.length
        val dp = Array(m + 1) { IntArray(n + 1) }

        for (i in 0..m) {
            dp[i][n] = 1
        }

        for (i in m - 1 downTo 0) {
            for (j in n - 1 downTo 0) {
                dp[i][j] = dp[i + 1][j]
                if (s[i] == t[j]) {
                    dp[i][j] += dp[i + 1][j + 1]
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

> Where $m$ is the length of the string $s$ and $n$ is the length of the string $t$.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        dp = [0] * (n + 1)
        nextDp = [0] * (n + 1)

        dp[n] = nextDp[n] = 1
        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                nextDp[j] = dp[j]
                if s[i] == t[j]:
                    nextDp[j] += dp[j + 1]
            dp = nextDp[:]

        return dp[0]
```

```java
public class Solution {
    public int numDistinct(String s, String t) {
        int m = s.length(), n = t.length();
        int[] dp = new int[n + 1];
        int[] nextDp = new int[n + 1];

        dp[n] = nextDp[n] = 1;
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                nextDp[j] = dp[j];
                if (s.charAt(i) == t.charAt(j)) {
                    nextDp[j] += dp[j + 1];
                }
            }
            dp = nextDp.clone();
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        vector<int> dp(n + 1, 0);
        vector<int> nextDp(n + 1, 0);
        dp[n] = nextDp[n] = 1;

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                nextDp[j] = dp[j];
                if (s[i] == t[j]) {
                    nextDp[j] += dp[j + 1];
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
     * @param {string} t
     * @return {number}
     */
    numDistinct(s, t) {
        let m = s.length, n = t.length;
        let dp = new Array(n + 1).fill(0);
        let nextDp = new Array(n + 1).fill(0);

        dp[n] = nextDp[n] = 1;
        for (let i = m - 1; i >= 0; i--) {
            for (let j = n - 1; j >= 0; j--) {
                nextDp[j] = dp[j];
                if (s[i] === t[j]) {
                    nextDp[j] += dp[j + 1];
                }
            }
            dp = nextDp.slice();
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int NumDistinct(string s, string t) {
        int m = s.Length, n = t.Length;
        int[] dp = new int[n + 1];
        int[] nextDp = new int[n + 1];

        dp[n] = nextDp[n] = 1;
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                nextDp[j] = dp[j];
                if (s[i] == t[j]) {
                    nextDp[j] += dp[j + 1];
                }
            }
            dp = (int[])nextDp.Clone();
        }

        return dp[0];
    }
}
```

```go
func numDistinct(s string, t string) int {
    m, n := len(s), len(t)
    dp := make([]int, n+1)
    nextDp := make([]int, n+1)

    dp[n] = 1
    nextDp[n] = 1

    for i := m - 1; i >= 0; i-- {
        for j := n - 1; j >= 0; j-- {
            nextDp[j] = dp[j]
            if s[i] == t[j] {
                nextDp[j] += dp[j+1]
            }
        }
        dp = append([]int(nil), nextDp...) 
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun numDistinct(s: String, t: String): Int {
        val m = s.length
        val n = t.length
        var dp = IntArray(n + 1)
        var nextDp = IntArray(n + 1)

        dp[n] = 1
        nextDp[n] = 1

        for (i in m - 1 downTo 0) {
            for (j in n - 1 downTo 0) {
                nextDp[j] = dp[j]
                if (s[i] == t[j]) {
                    nextDp[j] += dp[j + 1]
                }
            }
            dp = nextDp.copyOf()
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(n)$

> Where $m$ is the length of the string $s$ and $n$ is the length of the string $t$.

---

## 5. Dynamic Programming (Optimal)

::tabs-start

```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        dp = [0] * (n + 1)

        dp[n] = 1
        for i in range(m - 1, -1, -1):
            prev = 1
            for j in range(n - 1, -1, -1):
                res = dp[j]
                if s[i] == t[j]:
                    res += prev

                prev = dp[j]
                dp[j] = res 
                
        return dp[0]
```

```java
public class Solution {
    public int numDistinct(String s, String t) {
        int m = s.length(), n = t.length();
        int[] dp = new int[n + 1];

        dp[n] = 1;
        for (int i = m - 1; i >= 0; i--) {
            int prev = 1;
            for (int j = n - 1; j >= 0; j--) {
                int res = dp[j];
                if (s.charAt(i) == t.charAt(j)) {
                    res += prev;
                }

                prev = dp[j];
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
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        vector<int> dp(n + 1, 0);
        dp[n] = 1;

        for (int i = m - 1; i >= 0; i--) {
            int prev = 1;
            for (int j = n - 1; j >= 0; j--) {
                int res = dp[j];
                if (s[i] == t[j]) {
                    res += prev;
                }

                prev = dp[j];
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
     * @param {string} t
     * @return {number}
     */
    numDistinct(s, t) {
        let m = s.length, n = t.length;
        let dp = new Array(n + 1).fill(0);

        dp[n] = 1;
        for (let i = m - 1; i >= 0; i--) {
            let prev = 1;
            for (let j = n - 1; j >= 0; j--) {
                let res = dp[j];
                if (s[i] === t[j]) {
                    res += prev;
                }

                prev = dp[j];
                dp[j] = res;
            }
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int NumDistinct(string s, string t) {
        int m = s.Length, n = t.Length;
        int[] dp = new int[n + 1];

        dp[n] = 1;
        for (int i = m - 1; i >= 0; i--) {
            int prev = 1;
            for (int j = n - 1; j >= 0; j--) {
                int res = dp[j];
                if (s[i] == t[j]) {
                    res += prev;
                }

                prev = dp[j];
                dp[j] = res;
            }
        }

        return dp[0];
    }
}
```

```go
func numDistinct(s string, t string) int {
    m, n := len(s), len(t)
    dp := make([]int, n+1)

    dp[n] = 1
    for i := m - 1; i >= 0; i-- {
        prev := 1
        for j := n - 1; j >= 0; j-- {
            res := dp[j]
            if s[i] == t[j] {
                res += prev
            }
            prev = dp[j]
            dp[j] = res
        }
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun numDistinct(s: String, t: String): Int {
        val m = s.length
        val n = t.length
        val dp = IntArray(n + 1)

        dp[n] = 1
        for (i in m - 1 downTo 0) {
            var prev = 1
            for (j in n - 1 downTo 0) {
                var res = dp[j]
                if (s[i] == t[j]) {
                    res += prev
                }
                prev = dp[j]
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

> Where $m$ is the length of the string $s$ and $n$ is the length of the string $t$.