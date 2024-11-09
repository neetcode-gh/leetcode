## 1. Recursion

::tabs-start

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        
        def dfs(i, j):
            if i == len(text1) or j == len(text2):
                return 0
            if text1[i] == text2[j]:
                return 1 + dfs(i + 1, j + 1)
            return max(dfs(i + 1, j), dfs(i, j + 1))
        
        return dfs(0, 0)
```

```java
public class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        return dfs(text1, text2, 0, 0);
    }

    private int dfs(String text1, String text2, int i, int j) {
        if (i == text1.length() || j == text2.length()) {
            return 0;
        }
        if (text1.charAt(i) == text2.charAt(j)) {
            return 1 + dfs(text1, text2, i + 1, j + 1);
        }
        return Math.max(dfs(text1, text2, i + 1, j),
                        dfs(text1, text2, i, j + 1));
    }
}
```

```cpp
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        return dfs(text1, text2, 0, 0);
    }

private:
    int dfs(const string& text1, const string& text2, int i, int j) {
        if (i == text1.size() || j == text2.size()) {
            return 0;
        }
        if (text1[i] == text2[j]) {
            return 1 + dfs(text1, text2, i + 1, j + 1);
        }
        return max(dfs(text1, text2, i + 1, j),
                   dfs(text1, text2, i, j + 1));
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} text1
     * @param {string} text2
     * @return {number}
     */
    longestCommonSubsequence(text1, text2) {

        const dfs = (i, j) => {
            if (i === text1.length || j === text2.length) {
                return 0;
            }
            if (text1[i] === text2[j]) {
                return 1 + dfs(i + 1, j + 1);
            }
            return Math.max(dfs(i + 1, j), dfs(i, j + 1));
        }
        
        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public int LongestCommonSubsequence(string text1, string text2) {
        return Dfs(text1, text2, 0, 0);
    }

    private int Dfs(string text1, string text2, int i, int j) {
        if (i == text1.Length || j == text2.Length) {
            return 0;
        }
        if (text1[i] == text2[j]) {
            return 1 + Dfs(text1, text2, i + 1, j + 1);
        }
        return Math.Max(Dfs(text1, text2, i + 1, j), 
                        Dfs(text1, text2, i, j + 1));
    }
}
```

```go
func longestCommonSubsequence(text1 string, text2 string) int {
    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == len(text1) || j == len(text2) {
            return 0
        }
        if text1[i] == text2[j] {
            return 1 + dfs(i+1, j+1)
        }
        return max(dfs(i+1, j), dfs(i, j+1))
    }
    return dfs(0, 0)
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
    fun longestCommonSubsequence(text1: String, text2: String): Int {
        fun dfs(i: Int, j: Int): Int {
            if (i == text1.length || j == text2.length) return 0
            if (text1[i] == text2[j]) return 1 + dfs(i + 1, j + 1)
            return maxOf(dfs(i + 1, j), dfs(i, j + 1))
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ {m + n})$
* Space complexity: $O(m + n)$

> Where $m$ is the length of the string $text1$ and $n$ is the length of the string $text2$.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        memo = {}

        def dfs(i, j):
            if i == len(text1) or j == len(text2):
                return 0
            if (i, j) in memo:
                return memo[(i, j)]
            
            if text1[i] == text2[j]:
                memo[(i, j)] = 1 + dfs(i + 1, j + 1)
            else:
                memo[(i, j)] = max(dfs(i + 1, j), dfs(i, j + 1))
                
            return memo[(i, j)]
        
        return dfs(0, 0)
```

```java
public class Solution {
    private int[][] memo;

    public int longestCommonSubsequence(String text1, String text2) {
        memo = new int[text1.length()][text2.length()];
        for (int i = 0; i < text1.length(); i++) {
            for (int j = 0; j < text2.length(); j++) {
                memo[i][j] = -1;
            }
        }
        return dfs(text1, text2, 0, 0);
    }

    private int dfs(String text1, String text2, int i, int j) {
        if (i == text1.length() || j == text2.length()) {
            return 0;
        }
        if (memo[i][j] != -1) {
            return memo[i][j];
        }
        if (text1.charAt(i) == text2.charAt(j)) {
            memo[i][j] = 1 + dfs(text1, text2, i + 1, j + 1);
        } else {
            memo[i][j] = Math.max(dfs(text1, text2, i + 1, j), 
                                  dfs(text1, text2, i, j + 1));
        }
        return memo[i][j];
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> memo;

    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        memo.assign(m, vector<int>(n, -1));
        return dfs(text1, text2, 0, 0);
    }

    int dfs(string& text1, string& text2, int i, int j) {
        if (i == text1.size() || j == text2.size()) {
            return 0;
        }
        if (memo[i][j] != -1) {
            return memo[i][j];
        }
        if (text1[i] == text2[j]) {
            memo[i][j] = 1 + dfs(text1, text2, i + 1, j + 1);
        } else {
            memo[i][j] = max(dfs(text1, text2, i + 1, j), 
                             dfs(text1, text2, i, j + 1));
        }
        return memo[i][j];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} text1
     * @param {string} text2
     * @return {number}
     */
    longestCommonSubsequence(text1, text2) {

        const memo = Array(text1.length).fill().map(() => 
                     Array(text2.length).fill(-1));

        const dfs = (i, j) => {
            if (i === text1.length || j === text2.length) {
                return 0;
            }
            if (memo[i][j] !== -1) {
                return memo[i][j];
            }
            if (text1[i] === text2[j]) {
                memo[i][j] = 1 + dfs(i + 1, j + 1);
            } else {
                memo[i][j] = Math.max(dfs(i + 1, j), 
                                      dfs(i, j + 1));
            }
            return memo[i][j];
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private int[,] memo;

    public int LongestCommonSubsequence(string text1, string text2) {
        memo = new int[text1.Length, text2.Length];
        for (int i = 0; i < text1.Length; i++) {
            for (int j = 0; j < text2.Length; j++) {
                memo[i, j] = -1;
            }
        }
        return Dfs(text1, text2, 0, 0);
    }

    private int Dfs(string text1, string text2, int i, int j) {
        if (i == text1.Length || j == text2.Length) {
            return 0;
        }
        if (memo[i, j] != -1) {
            return memo[i, j];
        }
        if (text1[i] == text2[j]) {
            memo[i, j] = 1 + Dfs(text1, text2, i + 1, j + 1);
        } else {
            memo[i, j] = Math.Max(Dfs(text1, text2, i + 1, j), 
                                  Dfs(text1, text2, i, j + 1));
        }
        return memo[i, j];
    }
}
```

```go
func longestCommonSubsequence(text1 string, text2 string) int {
    m, n := len(text1), len(text2)
    memo := make([][]int, m+1)
    for i := range memo {
        memo[i] = make([]int, n+1)
        for j := range memo[i] {
            memo[i][j] = -1
        }
    }

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == m || j == n {
            return 0
        }
        if memo[i][j] != -1 {
            return memo[i][j]
        }
        
        if text1[i] == text2[j] {
            memo[i][j] = 1 + dfs(i+1, j+1)
        } else {
            memo[i][j] = max(dfs(i+1, j), dfs(i, j+1))
        }
        
        return memo[i][j]
    }

    return dfs(0, 0)
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
    fun longestCommonSubsequence(text1: String, text2: String): Int {
        val m = text1.length
        val n = text2.length
        val memo = Array(m + 1) { IntArray(n + 1) { -1 } }

        fun dfs(i: Int, j: Int): Int {
            if (i == m || j == n) return 0
            if (memo[i][j] != -1) return memo[i][j]

            memo[i][j] = if (text1[i] == text2[j]) {
                1 + dfs(i + 1, j + 1)
            } else {
                maxOf(dfs(i + 1, j), dfs(i, j + 1))
            }
            
            return memo[i][j]
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the length of the string $text1$ and $n$ is the length of the string $text2$.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        dp = [[0 for j in range(len(text2) + 1)] 
                 for i in range(len(text1) + 1)]

        for i in range(len(text1) - 1, -1, -1):
            for j in range(len(text2) - 1, -1, -1):
                if text1[i] == text2[j]:
                    dp[i][j] = 1 + dp[i + 1][j + 1]
                else:
                    dp[i][j] = max(dp[i][j + 1], dp[i + 1][j])

        return dp[0][0]
```

```java
public class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int[][] dp = new int[text1.length() + 1][text2.length() + 1];

        for (int i = text1.length() - 1; i >= 0; i--) {
            for (int j = text2.length() - 1; j >= 0; j--) {
                if (text1.charAt(i) == text2.charAt(j)) {
                    dp[i][j] = 1 + dp[i + 1][j + 1];
                } else {
                    dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j]);
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
    int longestCommonSubsequence(string text1, string text2) {
        vector<vector<int>> dp(text1.size() + 1, 
                               vector<int>(text2.size() + 1));

        for (int i = text1.size() - 1; i >= 0; i--) {
            for (int j = text2.size() - 1; j >= 0; j--) {
                if (text1[i] == text2[j]) {
                    dp[i][j] = 1 + dp[i + 1][j + 1];
                } else {
                    dp[i][j] = max(dp[i][j + 1], dp[i + 1][j]);
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
     * @param {string} text1
     * @param {string} text2
     * @return {number}
     */
    longestCommonSubsequence(text1, text2) {
        const dp = Array(text1.length + 1)
            .fill()
            .map(() => Array(text2.length + 1).fill(0));

        for (let i = text1.length - 1; i >= 0; i--) {
            for (let j = text2.length - 1; j >= 0; j--) {
                if (text1[i] === text2[j]) {
                    dp[i][j] = 1 + dp[i + 1][j + 1];
                } else {
                    dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j]);
                }
            }
        }

        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public int LongestCommonSubsequence(string text1, string text2) {
        int[,] dp = new int[text1.Length + 1, text2.Length + 1];

        for (int i = text1.Length - 1; i >= 0; i--) {
            for (int j = text2.Length - 1; j >= 0; j--) {
                if (text1[i] == text2[j]) {
                    dp[i, j] = 1 + dp[i + 1, j + 1];
                } else {
                    dp[i, j] = Math.Max(dp[i, j + 1], dp[i + 1, j]);
                }
            }
        }

        return dp[0, 0];
    }
}
```

```go
func longestCommonSubsequence(text1 string, text2 string) int {
    m, n := len(text1), len(text2)
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }

    for i := m - 1; i >= 0; i-- {
        for j := n - 1; j >= 0; j-- {
            if text1[i] == text2[j] {
                dp[i][j] = 1 + dp[i+1][j+1]
            } else {
                dp[i][j] = max(dp[i+1][j], dp[i][j+1])
            }
        }
    }

    return dp[0][0]
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
    fun longestCommonSubsequence(text1: String, text2: String): Int {
        val m = text1.length
        val n = text2.length
        val dp = Array(m + 1) { IntArray(n + 1) }

        for (i in m - 1 downTo 0) {
            for (j in n - 1 downTo 0) {
                dp[i][j] = if (text1[i] == text2[j]) {
                    1 + dp[i + 1][j + 1]
                } else {
                    maxOf(dp[i + 1][j], dp[i][j + 1])
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

> Where $m$ is the length of the string $text1$ and $n$ is the length of the string $text2$.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        if len(text1) < len(text2):
            text1, text2 = text2, text1
            
        prev = [0] * (len(text2) + 1)
        curr = [0] * (len(text2) + 1)

        for i in range(len(text1) - 1, -1, -1):
            for j in range(len(text2) - 1, -1, -1):
                if text1[i] == text2[j]:
                    curr[j] = 1 + prev[j + 1]
                else:
                    curr[j] = max(curr[j + 1], prev[j])
            prev, curr = curr, prev

        return prev[0]
```

```java
public class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        if (text1.length() < text2.length()) {
            String temp = text1;
            text1 = text2;
            text2 = temp;
        }

        int[] prev = new int[text2.length() + 1];
        int[] curr = new int[text2.length() + 1];

        for (int i = text1.length() - 1; i >= 0; i--) {
            for (int j = text2.length() - 1; j >= 0; j--) {
                if (text1.charAt(i) == text2.charAt(j)) {
                    curr[j] = 1 + prev[j + 1];
                } else {
                    curr[j] = Math.max(curr[j + 1], prev[j]);
                }
            }
            int[] temp = prev;
            prev = curr;
            curr = temp;
        }

        return prev[0];
    }
}
```

```cpp
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        if (text1.size() < text2.size()) {
            swap(text1, text2);
        }

        vector<int> prev(text2.size() + 1, 0);
        vector<int> curr(text2.size() + 1, 0);

        for (int i = text1.size() - 1; i >= 0; --i) {
            for (int j = text2.size() - 1; j >= 0; --j) {
                if (text1[i] == text2[j]) {
                    curr[j] = 1 + prev[j + 1];
                } else {
                    curr[j] = max(curr[j + 1], prev[j]);
                }
            }
            swap(prev, curr);
        }

        return prev[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} text1
     * @param {string} text2
     * @return {number}
     */
    longestCommonSubsequence(text1, text2) {
        if (text1.length < text2.length) {
            [text1, text2] = [text2, text1];
        }

        let prev = new Array(text2.length + 1).fill(0);
        let curr = new Array(text2.length + 1).fill(0);

        for (let i = text1.length - 1; i >= 0; i--) {
            for (let j = text2.length - 1; j >= 0; j--) {
                if (text1[i] === text2[j]) {
                    curr[j] = 1 + prev[j + 1];
                } else {
                    curr[j] = Math.max(curr[j + 1], prev[j]);
                }
            }
            [prev, curr] = [curr, prev];
        }

        return prev[0];
    }
}
```

```csharp
public class Solution {
    public int LongestCommonSubsequence(string text1, string text2) {
        if (text1.Length < text2.Length) {
            string temp = text1;
            text1 = text2;
            text2 = temp;
        }

        int[] prev = new int[text2.Length + 1];
        int[] curr = new int[text2.Length + 1];

        for (int i = text1.Length - 1; i >= 0; i--) {
            for (int j = text2.Length - 1; j >= 0; j--) {
                if (text1[i] == text2[j]) {
                    curr[j] = 1 + prev[j + 1];
                } else {
                    curr[j] = Math.Max(curr[j + 1], prev[j]);
                }
            }
            Array.Copy(curr, prev, text2.Length + 1);
        }

        return prev[0];
    }
}
```

```go
func longestCommonSubsequence(text1 string, text2 string) int {
    if len(text1) < len(text2) {
        text1, text2 = text2, text1
    }
    
    prev := make([]int, len(text2)+1)
    curr := make([]int, len(text2)+1)

    for i := len(text1) - 1; i >= 0; i-- {
        for j := len(text2) - 1; j >= 0; j-- {
            if text1[i] == text2[j] {
                curr[j] = 1 + prev[j+1]
            } else {
                curr[j] = max(curr[j+1], prev[j])
            }
        }
        prev, curr = curr, prev
    }

    return prev[0]
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
    fun longestCommonSubsequence(text1: String, text2: String): Int {
        var t1 = text1
        var t2 = text2

        if (t1.length < t2.length) {
            t1 = text2
            t2 = text1
        }

        val prev = IntArray(t2.length + 1)
        val curr = IntArray(t2.length + 1)

        for (i in t1.length - 1 downTo 0) {
            for (j in t2.length - 1 downTo 0) {
                curr[j] = if (t1[i] == t2[j]) {
                    1 + prev[j + 1]
                } else {
                    maxOf(curr[j + 1], prev[j])
                }
            }
            val temp = prev
            prev.fill(0) 
            prev.indices.forEach { prev[it] = curr[it] }
            curr.fill(0) 
        }

        return prev[0]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(min(m, n))$

> Where $m$ is the length of the string $text1$ and $n$ is the length of the string $text2$.

---

## 5. Dynamic Programming (Optimal)

::tabs-start

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        if len(text1) < len(text2):
            text1, text2 = text2, text1

        dp = [0] * (len(text2) + 1)

        for i in range(len(text1) - 1, -1, -1):
            prev = 0
            for j in range(len(text2) - 1, -1, -1):
                temp = dp[j]
                if text1[i] == text2[j]:
                    dp[j] = 1 + prev
                else:
                    dp[j] = max(dp[j], dp[j + 1])
                prev = temp

        return dp[0]
```

```java
public class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        if (text1.length() < text2.length()) {
            String temp = text1;
            text1 = text2;
            text2 = temp;
        }

        int[] dp = new int[text2.length() + 1];

        for (int i = text1.length() - 1; i >= 0; i--) {
            int prev = 0;
            for (int j = text2.length() - 1; j >= 0; j--) {
                int temp = dp[j];
                if (text1.charAt(i) == text2.charAt(j)) {
                    dp[j] = 1 + prev;
                } else {
                    dp[j] = Math.max(dp[j], dp[j + 1]);
                }
                prev = temp;
            }
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        if (text1.size() < text2.size()) {
            swap(text1, text2);
        }

        vector<int> dp(text2.size() + 1, 0);

        for (int i = text1.size() - 1; i >= 0; --i) {
            int prev = 0;
            for (int j = text2.size() - 1; j >= 0; --j) {
                int temp = dp[j];
                if (text1[i] == text2[j]) {
                    dp[j] = 1 + prev;
                } else {
                    dp[j] = max(dp[j], dp[j + 1]);
                }
                prev = temp;
            }
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} text1
     * @param {string} text2
     * @return {number}
     */
    longestCommonSubsequence(text1, text2) {
        if (text1.length < text2.length) {
            [text1, text2] = [text2, text1];
        }

        const dp = new Array(text2.length + 1).fill(0);

        for (let i = text1.length - 1; i >= 0; i--) {
            let prev = 0;
            for (let j = text2.length - 1; j >= 0; j--) {
                let temp = dp[j];
                if (text1[i] === text2[j]) {
                    dp[j] = 1 + prev;
                } else {
                    dp[j] = Math.max(dp[j], dp[j + 1]);
                }
                prev = temp;
            }
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int LongestCommonSubsequence(string text1, string text2) {
        if (text1.Length < text2.Length) {
            string temp = text1;
            text1 = text2;
            text2 = temp;
        }

        int[] dp = new int[text2.Length + 1];

        for (int i = text1.Length - 1; i >= 0; i--) {
            int prev = 0;
            for (int j = text2.Length - 1; j >= 0; j--) {
                int temp = dp[j];
                if (text1[i] == text2[j]) {
                    dp[j] = 1 + prev;
                } else {
                    dp[j] = Math.Max(dp[j], dp[j + 1]);
                }
                prev = temp;
            }
        }

        return dp[0];
    }
}
```

```go
func longestCommonSubsequence(text1 string, text2 string) int {
    if len(text1) < len(text2) {
        text1, text2 = text2, text1
    }

    dp := make([]int, len(text2)+1)

    for i := len(text1) - 1; i >= 0; i-- {
        prev := 0
        for j := len(text2) - 1; j >= 0; j-- {
            temp := dp[j]
            if text1[i] == text2[j] {
                dp[j] = 1 + prev
            } else {
                dp[j] = max(dp[j], dp[j+1])
            }
            prev = temp
        }
    }

    return dp[0]
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
    fun longestCommonSubsequence(text1: String, text2: String): Int {
        var t1 = text1
        var t2 = text2

        if (t1.length < t2.length) {
            t1 = text2
            t2 = text1
        }

        val dp = IntArray(t2.length + 1)

        for (i in t1.length - 1 downTo 0) {
            var prev = 0
            for (j in t2.length - 1 downTo 0) {
                val temp = dp[j]
                dp[j] = if (t1[i] == t2[j]) {
                    1 + prev
                } else {
                    maxOf(dp[j], dp[j + 1])
                }
                prev = temp
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

> Where $m$ is the length of the string $text1$ and $n$ is the length of the string $text2$.