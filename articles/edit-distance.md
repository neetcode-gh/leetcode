## 1. Recursion

::tabs-start

```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)

        def dfs(i, j):
            if i == m:
                return n - j
            if j == n:
                return m - i
            if word1[i] == word2[j]:
                return dfs(i + 1, j + 1)
            res = min(dfs(i + 1, j), dfs(i, j + 1))
            res = min(res, dfs(i + 1, j + 1))
            return res + 1
        
        return dfs(0, 0)
```

```java
public class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();

        return dfs(0, 0, word1, word2, m, n);
    }

    private int dfs(int i, int j, String word1, String word2, int m, int n) {
        if (i == m) return n - j;
        if (j == n) return m - i;

        if (word1.charAt(i) == word2.charAt(j)) {
            return dfs(i + 1, j + 1, word1, word2, m, n);
        }

        int res = Math.min(dfs(i + 1, j, word1, word2, m, n), 
                           dfs(i, j + 1, word1, word2, m, n));
        res = Math.min(res, dfs(i + 1, j + 1, word1, word2, m, n));
        return res + 1;
    }
}
```

```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        return dfs(0, 0, word1, word2, m, n);
    }
    
    int dfs(int i, int j, string& word1, string& word2, int m, int n) {
        if (i == m) return n - j;
        if (j == n) return m - i;
        if (word1[i] == word2[j]){
            return dfs(i + 1, j + 1, word1, word2, m, n);
        } 

        int res = min(dfs(i + 1, j, word1, word2, m, n), 
                      dfs(i, j + 1, word1, word2, m, n));
        res = min(res, dfs(i + 1, j + 1, word1, word2, m, n));
        return res + 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} word1
     * @param {string} word2
     * @return {number}
     */
    minDistance(word1, word2) {
        const m = word1.length, n = word2.length;

        const dfs = (i, j) => {
            if (i === m) return n - j;
            if (j === n) return m - i;
            if (word1[i] === word2[j]) {
                return dfs(i + 1, j + 1);
            }
            let res = Math.min(dfs(i + 1, j), dfs(i, j + 1));
            res = Math.min(res, dfs(i + 1, j + 1));
            return res + 1;
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public int MinDistance(string word1, string word2) {
        int m = word1.Length, n = word2.Length;
        return Dfs(0, 0, word1, word2, m, n);
    }

    private int Dfs(int i, int j, string word1, string word2, int m, int n) {
        if (i == m) return n - j;
        if (j == n) return m - i;

        if (word1[i] == word2[j]) {
            return Dfs(i + 1, j + 1, word1, word2, m, n);
        }

        int res = Math.Min(Dfs(i + 1, j, word1, word2, m, n), 
                           Dfs(i, j + 1, word1, word2, m, n));
        res = Math.Min(res, Dfs(i + 1, j + 1, word1, word2, m, n));
        return res + 1;
    }
}
```

```go
func minDistance(word1 string, word2 string) int {
    m, n := len(word1), len(word2)

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == m {
            return n - j
        }
        if j == n {
            return m - i
        }
        if word1[i] == word2[j] {
            return dfs(i+1, j+1)
        }
        res := min(dfs(i+1, j), dfs(i, j+1))
        res = min(res, dfs(i+1, j+1))
        return res + 1
    }

    return dfs(0, 0)
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
    fun minDistance(word1: String, word2: String): Int {
        val m = word1.length
        val n = word2.length

        fun dfs(i: Int, j: Int): Int {
            if (i == m) return n - j
            if (j == n) return m - i
            if (word1[i] == word2[j]) return dfs(i + 1, j + 1)

            var res = minOf(dfs(i + 1, j), dfs(i, j + 1))
            res = minOf(res, dfs(i + 1, j + 1))
            return res + 1
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(3 ^ {m + n})$
* Space complexity: $O(m + n)$

> Where $m$ is the length of $word1$ and $n$ is the length of $word2$.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)

        dp = {}
        def dfs(i, j):
            if i == m:
                return n - j
            if j == n:
                return m - i
            if (i, j) in dp:
                return dp[(i, j)]
                
            if word1[i] == word2[j]:
                dp[(i, j)] = dfs(i + 1, j + 1)
            else:
                res = min(dfs(i + 1, j), dfs(i, j + 1))
                res = min(res, dfs(i + 1, j + 1))
                dp[(i, j)] = res + 1
            return dp[(i, j)]
        
        return dfs(0, 0)
```

```java
public class Solution {
    private int[][] dp;
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        dp = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dp[i][j] = -1;
            }
        }
        return dfs(0, 0, word1, word2, m, n);
    }

    private int dfs(int i, int j, String word1, String word2, int m, int n) {
        if (i == m) return n - j;
        if (j == n) return m - i;
        if (dp[i][j] != -1) return dp[i][j];

        if (word1.charAt(i) == word2.charAt(j)) {
            dp[i][j] = dfs(i + 1, j + 1, word1, word2, m, n);
        } else {
            int res = Math.min(dfs(i + 1, j, word1, word2, m, n), 
                            dfs(i, j + 1, word1, word2, m, n));
            res = Math.min(res, dfs(i + 1, j + 1, word1, word2, m, n));
            dp[i][j] = res + 1;
        }
        return dp[i][j];
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        dp = vector<vector<int>>(m, vector<int>(n, -1));
        return dfs(0, 0, word1, word2, m, n);
    }
    
    int dfs(int i, int j, string& word1, string& word2, int m, int n) {
        if (i == m) return n - j;
        if (j == n) return m - i;
        if (dp[i][j] != -1) return dp[i][j];
        if (word1[i] == word2[j]){
            dp[i][j] = dfs(i + 1, j + 1, word1, word2, m, n);
        } else {
            int res = min(dfs(i + 1, j, word1, word2, m, n), 
                        dfs(i, j + 1, word1, word2, m, n));
            res = min(res, dfs(i + 1, j + 1, word1, word2, m, n));
            dp[i][j] = res + 1;
        }
        return dp[i][j];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} word1
     * @param {string} word2
     * @return {number}
     */
    minDistance(word1, word2) {
        const m = word1.length, n = word2.length;
        let dp = Array.from({ length: m + 1 }, () =>
                   Array(n + 1).fill(-1));
        const dfs = (i, j) => {
            if (i === m) return n - j;
            if (j === n) return m - i;
            if (dp[i][j] != -1) return dp[i][j];

            if (word1[i] === word2[j]) {
                dp[i][j] = dfs(i + 1, j + 1);
            } else {
                let res = Math.min(dfs(i + 1, j), dfs(i, j + 1));
                res = Math.min(res, dfs(i + 1, j + 1));
                dp[i][j] = res + 1;
            }
            return dp[i][j];
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private int?[,] dp; 
    public int MinDistance(string word1, string word2) {
        int m = word1.Length, n = word2.Length;
        dp = new int?[m + 1, n + 1]; 
        return Dfs(0, 0, word1, word2, m, n);
    }

    private int Dfs(int i, int j, string word1, string word2, int m, int n) {
        if (i == m) return n - j; 
        if (j == n) return m - i; 

        if (dp[i, j].HasValue) { 
            return dp[i, j].Value;
        }

        if (word1[i] == word2[j]) {
            dp[i, j] = Dfs(i + 1, j + 1, word1, word2, m, n); 
        } else {
            int res = Math.Min(Dfs(i + 1, j, word1, word2, m, n), 
                               Dfs(i, j + 1, word1, word2, m, n));
            res = Math.Min(res, Dfs(i + 1, j + 1, word1, word2, m, n)); 
            dp[i, j] = res + 1; 
        }

        return dp[i, j].Value; 
    }
}
```

```go
func minDistance(word1 string, word2 string) int {
    m, n := len(word1), len(word2)
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
        for j := range dp[i] {
            dp[i][j] = -1 
        }
    }

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == m {
            return n - j
        }
        if j == n {
            return m - i
        }
        if dp[i][j] != -1 {
            return dp[i][j]
        }

        if word1[i] == word2[j] {
            dp[i][j] = dfs(i+1, j+1)
        } else {
            insert := dfs(i, j+1)
            delete := dfs(i+1, j)
            replace := dfs(i+1, j+1)
            dp[i][j] = 1 + min(insert, min(delete, replace))
        }
        return dp[i][j]
    }

    return dfs(0, 0)
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
    fun minDistance(word1: String, word2: String): Int {
        val m = word1.length
        val n = word2.length
        val dp = Array(m + 1) { IntArray(n + 1) { -1 } }

        fun dfs(i: Int, j: Int): Int {
            if (i == m) return n - j
            if (j == n) return m - i
            if (dp[i][j] != -1) return dp[i][j]

            dp[i][j] = if (word1[i] == word2[j]) {
                dfs(i + 1, j + 1)
            } else {
                val insert = dfs(i, j + 1)
                val delete = dfs(i + 1, j)
                val replace = dfs(i + 1, j + 1)
                1 + minOf(insert, delete, replace)
            }
            return dp[i][j]
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the length of $word1$ and $n$ is the length of $word2$.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        dp = [[float("inf")] * (len(word2) + 1) for i in range(len(word1) + 1)]

        for j in range(len(word2) + 1):
            dp[len(word1)][j] = len(word2) - j
        for i in range(len(word1) + 1):
            dp[i][len(word2)] = len(word1) - i

        for i in range(len(word1) - 1, -1, -1):
            for j in range(len(word2) - 1, -1, -1):
                if word1[i] == word2[j]:
                    dp[i][j] = dp[i + 1][j + 1]
                else:
                    dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1])
        return dp[0][0]
```

```java
public class Solution {
    public int minDistance(String word1, String word2) {
        int[][] dp = new int[word1.length() + 1][word2.length() + 1];

        for (int j = 0; j <= word2.length(); j++) {
            dp[word1.length()][j] = word2.length() - j;
        }
        for (int i = 0; i <= word1.length(); i++) {
            dp[i][word2.length()] = word1.length() - i;
        }

        for (int i = word1.length() - 1; i >= 0; i--) {
            for (int j = word2.length() - 1; j >= 0; j--) {
                if (word1.charAt(i) == word2.charAt(j)) {
                    dp[i][j] = dp[i + 1][j + 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i + 1][j], 
                                   Math.min(dp[i][j + 1], dp[i + 1][j + 1]));
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
    int minDistance(string word1, string word2) {
        vector<vector<int>> dp(word1.length() + 1, 
                               vector<int>(word2.length() + 1, 0));

        for (int j = 0; j <= word2.length(); j++) {
            dp[word1.length()][j] = word2.length() - j;
        }
        for (int i = 0; i <= word1.length(); i++) {
            dp[i][word2.length()] = word1.length() - i;
        }

        for (int i = word1.length() - 1; i >= 0; i--) {
            for (int j = word2.length() - 1; j >= 0; j--) {
                if (word1[i] == word2[j]) {
                    dp[i][j] = dp[i + 1][j + 1];
                } else {
                    dp[i][j] = 1 + min(dp[i + 1][j], 
                                   min(dp[i][j + 1], dp[i + 1][j + 1]));
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
     * @param {string} word1
     * @param {string} word2
     * @return {number}
     */
    minDistance(word1, word2) {
        const dp = new Array(word1.length + 1)
            .fill(0)
            .map(() => new Array(word2.length + 1).fill(0));

        for (let j = 0; j <= word2.length; j++) {
            dp[word1.length][j] = word2.length - j;
        }
        for (let i = 0; i <= word1.length; i++) {
            dp[i][word2.length] = word1.length - i;
        }

        for (let i = word1.length - 1; i >= 0; i--) {
            for (let j = word2.length - 1; j >= 0; j--) {
                if (word1[i] === word2[j]) {
                    dp[i][j] = dp[i + 1][j + 1];
                } else {
                    dp[i][j] =
                        1 +
                        Math.min(
                            dp[i + 1][j],
                            Math.min(dp[i][j + 1], dp[i + 1][j + 1]),
                        );
                }
            }
        }
        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public int MinDistance(string word1, string word2) {
        int[,] dp = new int[word1.Length + 1, word2.Length + 1];

        for (int j = 0; j <= word2.Length; j++) {
            dp[word1.Length, j] = word2.Length - j;
        }
        for (int i = 0; i <= word1.Length; i++) {
            dp[i, word2.Length] = word1.Length - i;
        }

        for (int i = word1.Length - 1; i >= 0; i--) {
            for (int j = word2.Length - 1; j >= 0; j--) {
                if (word1[i] == word2[j]) {
                    dp[i, j] = dp[i + 1, j + 1];
                } else {
                    dp[i, j] = 1 + Math.Min(dp[i + 1, j], 
                                   Math.Min(dp[i, j + 1], dp[i + 1, j + 1]));
                }
            }
        }
        return dp[0, 0];
    }
}
```

```go
func minDistance(word1, word2 string) int {
    m, n := len(word1), len(word2)
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }

    for j := 0; j <= n; j++ {
        dp[m][j] = n - j
    }
    for i := 0; i <= m; i++ {
        dp[i][n] = m - i
    }

    for i := m - 1; i >= 0; i-- {
        for j := n - 1; j >= 0; j-- {
            if word1[i] == word2[j] {
                dp[i][j] = dp[i+1][j+1]
            } else {
                dp[i][j] = 1 + min(dp[i+1][j], 
                                   min(dp[i][j+1], dp[i+1][j+1]))
            }
        }
    }

    return dp[0][0]
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
    fun minDistance(word1: String, word2: String): Int {
        val m = word1.length
        val n = word2.length
        val dp = Array(m + 1) { IntArray(n + 1) }

        for (j in 0..n) {
            dp[m][j] = n - j
        }
        for (i in 0..m) {
            dp[i][n] = m - i
        }

        for (i in m - 1 downTo 0) {
            for (j in n - 1 downTo 0) {
                if (word1[i] == word2[j]) {
                    dp[i][j] = dp[i + 1][j + 1]
                } else {
                    dp[i][j] = 1 + minOf(dp[i + 1][j], 
                                         minOf(dp[i][j + 1], dp[i + 1][j + 1]))
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

> Where $m$ is the length of $word1$ and $n$ is the length of $word2$.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        if m < n:
            m, n = n, m
            word1, word2 = word2, word1

        dp = [0] * (n + 1)
        nextDp = [0] * (n + 1)

        for j in range(n + 1):
            dp[j] = n - j

        for i in range(m - 1, -1, -1):
            nextDp[n] = m - i
            for j in range(n - 1, -1, -1):
                if word1[i] == word2[j]:
                    nextDp[j] = dp[j + 1]
                else:
                    nextDp[j] = 1 + min(dp[j], nextDp[j + 1], dp[j + 1])
            dp = nextDp[:]
        
        return dp[0]
```

```java
class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        if (m < n) {
            int temp = m;
            m = n;
            n = temp;
            String t = word1;
            word1 = word2;
            word2 = t;
        }

        int[] dp = new int[n + 1];
        int[] nextDp = new int[n + 1];
        
        for (int j = 0; j <= n; j++) {
            dp[j] = n - j;
        }

        for (int i = m - 1; i >= 0; i--) {
            nextDp[n] = m - i;
            for (int j = n - 1; j >= 0; j--) {
                if (word1.charAt(i) == word2.charAt(j)) {
                    nextDp[j] = dp[j + 1];
                } else {
                    nextDp[j] = 1 + Math.min(dp[j], 
                                Math.min(nextDp[j + 1], dp[j + 1]));
                }
            }
            System.arraycopy(nextDp, 0, dp, 0, n + 1);
        }
        
        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        if (m < n) {
            swap(m, n);
            swap(word1, word2);
        }

        vector<int> dp(n + 1), nextDp(n + 1);
        
        for (int j = 0; j <= n; ++j) {
            dp[j] = n - j;
        }

        for (int i = m - 1; i >= 0; --i) {
            nextDp[n] = m - i;
            for (int j = n - 1; j >= 0; --j) {
                if (word1[i] == word2[j]) {
                    nextDp[j] = dp[j + 1];
                } else {
                    nextDp[j] = 1 + min({dp[j], nextDp[j + 1], dp[j + 1]});
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
     * @param {string} word1
     * @param {string} word2
     * @return {number}
     */
    minDistance(word1, word2) {
        let m = word1.length, n = word2.length;
        if (m < n) {
            [m, n] = [n, m];
            [word1, word2] = [word2, word1];
        }

        let dp = new Array(n + 1).fill(0);
        let nextDp = new Array(n + 1).fill(0);

        for (let j = 0; j <= n; j++) {
            dp[j] = n - j;
        }

        for (let i = m - 1; i >= 0; i--) {
            nextDp[n] = m - i;
            for (let j = n - 1; j >= 0; j--) {
                if (word1[i] === word2[j]) {
                    nextDp[j] = dp[j + 1];
                } else {
                    nextDp[j] = 1 + Math.min(dp[j], 
                                Math.min(nextDp[j + 1], dp[j + 1]));
                }
            }
            dp = [...nextDp];
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int MinDistance(string word1, string word2) {
        int m = word1.Length, n = word2.Length;
        if (m < n) {
            var temp = m;
            m = n;
            n = temp;
            var t = word1;
            word1 = word2;
            word2 = t;
        }

        int[] dp = new int[n + 1];
        int[] nextDp = new int[n + 1];

        for (int j = 0; j <= n; j++) {
            dp[j] = n - j;
        }

        for (int i = m - 1; i >= 0; i--) {
            nextDp[n] = m - i;
            for (int j = n - 1; j >= 0; j--) {
                if (word1[i] == word2[j]) {
                    nextDp[j] = dp[j + 1];
                } else {
                    nextDp[j] = 1 + Math.Min(dp[j], 
                                Math.Min(nextDp[j + 1], dp[j + 1]));
                }
            }
            Array.Copy(nextDp, dp, n + 1);
        }

        return dp[0];
    }
}
```

```go
func minDistance(word1, word2 string) int {
    m, n := len(word1), len(word2)
    if m < n {
        word1, word2 = word2, word1
        m, n = n, m
    }

    dp := make([]int, n+1)
    nextDp := make([]int, n+1)

    for j := 0; j <= n; j++ {
        dp[j] = n - j
    }

    for i := m - 1; i >= 0; i-- {
        nextDp[n] = m - i
        for j := n - 1; j >= 0; j-- {
            if word1[i] == word2[j] {
                nextDp[j] = dp[j+1]
            } else {
                nextDp[j] = 1 + min(dp[j], 
                                    min(nextDp[j+1], dp[j+1]))
            }
        }
        dp, nextDp = nextDp, dp
    }
    
    return dp[0]
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
    fun minDistance(word1: String, word2: String): Int {
        var m = word1.length
        var n = word2.length
        var word1Mod = word1
        var word2Mod = word2

        if (m < n) {
            word1Mod = word2
            word2Mod = word1
            m = word1Mod.length
            n = word2Mod.length
        }

        val dp = IntArray(n + 1)
        val nextDp = IntArray(n + 1)

        for (j in 0..n) {
            dp[j] = n - j
        }

        for (i in m - 1 downTo 0) {
            nextDp[n] = m - i
            for (j in n - 1 downTo 0) {
                if (word1Mod[i] == word2Mod[j]) {
                    nextDp[j] = dp[j + 1]
                } else {
                    nextDp[j] = 1 + minOf(dp[j], nextDp[j + 1], dp[j + 1])
                }
            }
            dp.indices.forEach { dp[it] = nextDp[it] }
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(min(m, n))$

> Where $m$ is the length of $word1$ and $n$ is the length of $word2$.

---

## 5. Dynamic Programming (Optimal)

::tabs-start

```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        if m < n:
            m, n = n, m
            word1, word2 = word2, word1
        
        dp = [n - i for i in range(n + 1)]

        for i in range(m - 1, -1, -1):
            nextDp = dp[n]
            dp[n] = m - i
            for j in range(n - 1, -1, -1):
                temp = dp[j]
                if word1[i] == word2[j]:
                    dp[j] = nextDp
                else:
                    dp[j] = 1 + min(dp[j], dp[j + 1], nextDp)
                nextDp = temp
        return dp[0]
```

```java
public class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        if (m < n) {
            String temp = word1; word1 = word2; word2 = temp;
            m = word1.length(); n = word2.length();
        }

        int[] dp = new int[n + 1];
        for (int i = 0; i <= n; i++) dp[i] = n - i;

        for (int i = m - 1; i >= 0; i--) {
            int nextDp = dp[n];
            dp[n] = m - i;
            for (int j = n - 1; j >= 0; j--) {
                int temp = dp[j];
                if (word1.charAt(i) == word2.charAt(j)) {
                    dp[j] = nextDp;
                } else {
                    dp[j] = 1 + Math.min(dp[j], 
                                Math.min(dp[j + 1], nextDp));
                }
                nextDp = temp;
            }
        }
        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        if (m < n) {
            swap(m, n);
            swap(word1, word2);
        }

        vector<int> dp(n + 1);
        for (int i = 0; i <= n; i++) dp[i] = n - i;

        for (int i = m - 1; i >= 0; i--) {
            int nextDp = dp[n];
            dp[n] = m - i;
            for (int j = n - 1; j >= 0; j--) {
                int temp = dp[j];
                if (word1[i] == word2[j]) {
                    dp[j] = nextDp;
                } else {
                    dp[j] = 1 + min({dp[j], dp[j + 1], nextDp});
                }
                nextDp = temp;
            }
        }
        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} word1
     * @param {string} word2
     * @return {number}
     */
    minDistance(word1, word2) {
        let m = word1.length, n = word2.length;
        if (m < n) {
            [m, n] = [n, m];
            [word1, word2] = [word2, word1];
        }

        let dp = new Array(n + 1).fill(0);
        for (let j = 0; j <= n; j++) {
            dp[j] = n - j;
        }

        for (let i = m - 1; i >= 0; i--) {
            let nextDp = dp[n];
            dp[n] = m - i;
            for (let j = n - 1; j >= 0; j--) {
                let temp = dp[j];
                if (word1[i] === word2[j]) {
                    dp[j] = nextDp;
                } else {
                    dp[j] = 1 + Math.min(dp[j], dp[j + 1], nextDp);
                }
                nextDp = temp;
            }
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int MinDistance(string word1, string word2) {
        int m = word1.Length, n = word2.Length;
        if (m < n) {
            string temp = word1; word1 = word2; word2 = temp;
            m = word1.Length; n = word2.Length;
        }

        int[] dp = new int[n + 1];
        for (int i = 0; i <= n; i++) dp[i] = n - i;

        for (int i = m - 1; i >= 0; i--) {
            int nextDp = dp[n];
            dp[n] = m - i;
            for (int j = n - 1; j >= 0; j--) {
                int temp = dp[j];
                if (word1[i] == word2[j]) {
                    dp[j] = nextDp;
                } else {
                    dp[j] = 1 + Math.Min(dp[j], 
                            Math.Min(dp[j + 1], nextDp));
                }
                nextDp = temp;
            }
        }
        return dp[0];
    }
}
```

```go
func minDistance(word1, word2 string) int {
    m, n := len(word1), len(word2)
    if m < n {
        word1, word2 = word2, word1
        m, n = n, m
    }

    dp := make([]int, n+1)
    for j := 0; j <= n; j++ {
        dp[j] = n - j
    }

    for i := m - 1; i >= 0; i-- {
        nextDp := dp[n]
        dp[n] = m - i
        for j := n - 1; j >= 0; j-- {
            temp := dp[j]
            if word1[i] == word2[j] {
                dp[j] = nextDp
            } else {
                dp[j] = 1 + min(dp[j], 
                                min(dp[j+1], nextDp))
            }
            nextDp = temp
        }
    }

    return dp[0]
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
    fun minDistance(word1: String, word2: String): Int {
        var m = word1.length
        var n = word2.length
        var word1Mod = word1
        var word2Mod = word2

        if (m < n) {
            word1Mod = word2
            word2Mod = word1
            m = word1Mod.length
            n = word2Mod.length
        }

        val dp = IntArray(n + 1) { n - it }

        for (i in m - 1 downTo 0) {
            var nextDp = dp[n]
            dp[n] = m - i
            for (j in n - 1 downTo 0) {
                val temp = dp[j]
                if (word1Mod[i] == word2Mod[j]) {
                    dp[j] = nextDp
                } else {
                    dp[j] = 1 + minOf(dp[j], dp[j + 1], nextDp)
                }
                nextDp = temp
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

> Where $m$ is the length of $word1$ and $n$ is the length of $word2$.