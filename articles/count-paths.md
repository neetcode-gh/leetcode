## 1. Recursion

::tabs-start

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        
        def dfs(i, j):
            if i == (m - 1) and j == (n - 1):
                return 1
            if i >= m or j >= n:
                return 0
            return dfs(i, j + 1) + dfs(i + 1, j)
        
        return dfs(0, 0)
```

```java
public class Solution {
    public int uniquePaths(int m, int n) {
        return dfs(0, 0, m, n);
    }

    public int dfs(int i, int j, int m, int n) {
        if (i == (m - 1) && j == (n - 1)) {
            return 1;
        }
        if (i >= m || j >= n) return 0;
        return dfs(i, j + 1, m, n) + 
               dfs(i + 1, j, m, n);
    }
}
```

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        return dfs(0, 0, m, n);
    }

    int dfs(int i, int j, int m, int n) {
        if (i == (m - 1) && j == (n - 1)) {
            return 1;
        }
        if (i >= m || j >= n) return 0;
        return dfs(i, j + 1, m, n) + 
               dfs(i + 1, j, m, n);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    uniquePaths(m, n) {

        const dfs = (i, j) => {
            if (i == (m - 1) && j == (n - 1)) {
                return 1;
            }
            if (i >= m || j >= n) return 0;
            return dfs(i, j + 1) + dfs(i + 1, j);
        }

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public int UniquePaths(int m, int n) {
        return Dfs(0, 0, m, n);
    }

    int Dfs(int i, int j, int m, int n) {
        if (i == (m - 1) && j == (n - 1)) {
            return 1;
        }
        if (i >= m || j >= n) return 0;
        return Dfs(i, j + 1, m, n) + 
               Dfs(i + 1, j, m, n);
    }
}
```

```go
func uniquePaths(m int, n int) int {
    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == m-1 && j == n-1 {
            return 1
        }
        if i >= m || j >= n {
            return 0
        }
        return dfs(i, j+1) + dfs(i+1, j)
    }
    
    return dfs(0, 0)
}
```

```kotlin
class Solution {
    fun uniquePaths(m: Int, n: Int): Int {
        fun dfs(i: Int, j: Int): Int {
            if (i == m - 1 && j == n - 1) return 1
            if (i >= m || j >= n) return 0
            return dfs(i, j + 1) + dfs(i + 1, j)
        }
        
        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ {m + n})$
* Space complexity: $O(m + n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        memo = [[-1] * n for _ in range(m)]
        def dfs(i, j):
            if i == (m - 1) and j == (n - 1):
                return 1
            if i >= m or j >= n:
                return 0
            if memo[i][j] != -1:
                return memo[i][j]
            
            memo[i][j] =  dfs(i, j + 1) + dfs(i + 1, j)
            return memo[i][j]
        
        return dfs(0, 0)
```

```java
public class Solution {
    int[][] memo;
    public int uniquePaths(int m, int n) {
        memo = new int[m][n];
        for(int[] it : memo) {
            Arrays.fill(it, -1);
        }
        return dfs(0, 0, m, n);
    }

    public int dfs(int i, int j, int m, int n) {
        if (i == (m - 1) && j == (n - 1)) {
            return 1;
        }
        if (i >= m || j >= n) return 0;
        if (memo[i][j] != -1) {
            return memo[i][j];
        }
        return memo[i][j] = dfs(i, j + 1, m, n) + 
                            dfs(i + 1, j, m, n);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> memo;
    int uniquePaths(int m, int n) {
        memo.resize(m, vector<int>(n, -1));
        return dfs(0, 0, m, n);
    }

    int dfs(int i, int j, int m, int n) {
        if (i == (m - 1) && j == (n - 1)) {
            return 1;
        }
        if (i >= m || j >= n) return 0;
        if (memo[i][j] != -1) {
            return memo[i][j];
        }
        return memo[i][j] = dfs(i, j + 1, m, n) + 
                            dfs(i + 1, j, m, n);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    uniquePaths(m, n) {
        const memo = Array.from({ length: m }, () => 
                     Array(n).fill(-1));
        const dfs = (i, j) => {
            if (i == (m - 1) && j == (n - 1)) {
                return 1;
            }
            if (i >= m || j >= n) return 0;
            if (memo[i][j] != -1) {
                return memo[i][j];
            }
            memo[i][j] = dfs(i, j + 1) + dfs(i + 1, j);
            return memo[i][j];
        }

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    int[,] memo;
    public int UniquePaths(int m, int n) {
        memo = new int[m, n];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                memo[i, j] = -1;

        return Dfs(0, 0, m, n);
    }

    int Dfs(int i, int j, int m, int n) {
        if (i == (m - 1) && j == (n - 1)) {
            return 1;
        }
        if (i >= m || j >= n) return 0;
        if (memo[i, j] != -1) {
            return memo[i, j];
        }
        return memo[i, j] = Dfs(i, j + 1, m, n) + 
                            Dfs(i + 1, j, m, n);
    }
}
```

```go
func uniquePaths(m int, n int) int {
    memo := make([][]int, m)
    for i := range memo {
        memo[i] = make([]int, n)
        for j := range memo[i] {
            memo[i][j] = -1
        }
    }

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == m-1 && j == n-1 {
            return 1
        }
        if i >= m || j >= n {
            return 0
        }
        if memo[i][j] != -1 {
            return memo[i][j]
        }
        
        memo[i][j] = dfs(i, j+1) + dfs(i+1, j)
        return memo[i][j]
    }
    
    return dfs(0, 0)
}
```

```kotlin
class Solution {
    fun uniquePaths(m: Int, n: Int): Int {
        val memo = Array(m) { IntArray(n) { -1 } }

        fun dfs(i: Int, j: Int): Int {
            if (i == m - 1 && j == n - 1) return 1
            if (i >= m || j >= n) return 0
            if (memo[i][j] != -1) return memo[i][j]

            memo[i][j] = dfs(i, j + 1) + dfs(i + 1, j)
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

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        dp[m - 1][n - 1] = 1

        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                dp[i][j] += dp[i + 1][j] + dp[i][j + 1]

        return dp[0][0]
```

```java
public class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m + 1][n + 1];
        dp[m - 1][n - 1] = 1;

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                dp[i][j] += dp[i + 1][j] + dp[i][j + 1];
            }
        }

        return dp[0][0];
    }
}
```

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        dp[m - 1][n - 1] = 1;

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                dp[i][j] += dp[i + 1][j] + dp[i][j + 1];
            }
        }

        return dp[0][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    uniquePaths(m, n) {
        let dp = Array.from({ length: m + 1 }, () => 
                 Array(n + 1).fill(0));
        dp[m - 1][n - 1] = 1;

        for (let i = m - 1; i >= 0; i--) {
            for (let j = n - 1; j >= 0; j--) {
                dp[i][j] += dp[i + 1][j] + dp[i][j + 1];
            }
        }

        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    public int UniquePaths(int m, int n) {
        int[,] dp = new int[m + 1, n + 1];
        dp[m - 1, n - 1] = 1;

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                dp[i, j] += dp[i + 1, j] + dp[i, j + 1];
            }
        }

        return dp[0, 0];
    }
}
```

```go
func uniquePaths(m int, n int) int {
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }
    dp[m-1][n-1] = 1

    for i := m - 1; i >= 0; i-- {
        for j := n - 1; j >= 0; j-- {
            dp[i][j] += dp[i+1][j] + dp[i][j+1]
        }
    }

    return dp[0][0]
}
```

```kotlin
class Solution {
    fun uniquePaths(m: Int, n: Int): Int {
        val dp = Array(m + 1) { IntArray(n + 1) }
        dp[m - 1][n - 1] = 1

        for (i in m - 1 downTo 0) {
            for (j in n - 1 downTo 0) {
                dp[i][j] += dp[i + 1][j] + dp[i][j + 1]
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

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        row = [1] * n

        for i in range(m - 1):
            newRow = [1] * n
            for j in range(n - 2, -1, -1):
                newRow[j] = newRow[j + 1] + row[j]
            row = newRow
        return row[0]
```

```java
public class Solution {
    public int uniquePaths(int m, int n) {
        int[] row = new int[n];
        Arrays.fill(row, 1);

        for (int i = 0; i < m - 1; i++) {
            int[] newRow = new int[n];
            Arrays.fill(newRow, 1);
            for (int j = n - 2; j >= 0; j--) {
                newRow[j] = newRow[j + 1] + row[j];
            }
            row = newRow;
        }
        return row[0];
    }
}
```

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> row(n, 1);

        for (int i = 0; i < m - 1; ++i) {
            vector<int> newRow(n, 1);
            for (int j = n - 2; j >= 0; --j) {
                newRow[j] = newRow[j + 1] + row[j];
            }
            row = newRow;
        }
        return row[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    uniquePaths(m, n) {
        let row = new Array(n).fill(1);

        for (let i = 0; i < m - 1; i++) {
            const newRow = new Array(n).fill(1);
            for (let j = n - 2; j >= 0; j--) {
                newRow[j] = newRow[j + 1] + row[j];
            }
            row = newRow;
        }
        return row[0];
    }
}
```

```csharp
public class Solution {
    public int UniquePaths(int m, int n) {
        var row = new int[n];
        Array.Fill(row, 1);
        for (int i = 0; i < m - 1; i++) {
            var newRow = new int[n];
            Array.Fill(newRow, 1);
            for (int j = n - 2; j >=0; j--) { 
                newRow[j] = newRow[j + 1] + row[j];
            }
            row = newRow;
        }
        return row[0];
    }
}
```

```go
func uniquePaths(m int, n int) int {
    row := make([]int, n)
    for i := range row {
        row[i] = 1
    }

    for i := 0; i < m - 1; i++ {
        newRow := make([]int, n)
        newRow[n-1] = 1
        for j := n - 2; j >= 0; j-- {
            newRow[j] = newRow[j+1] + row[j]
        }
        row = newRow
    }

    return row[0]
}
```

```kotlin
class Solution {
    fun uniquePaths(m: Int, n: Int): Int {
        var row = IntArray(n) { 1 }

        for (i in 0 until m - 1) {
            val newRow = IntArray(n) { 1 }
            for (j in n - 2 downTo 0) {
                newRow[j] = newRow[j + 1] + row[j]
            }
            row = newRow
        }

        return row[0]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 5. Dynamic Programming (Optimal)

::tabs-start

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [1] * n
        for i in range(m - 2, -1, -1):
            for j in range(n - 2, -1, -1):
                dp[j] += dp[j + 1]
                
        return dp[0]
```

```java
public class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        
        for (int i = m - 2; i >= 0; i--) {
            for (int j = n - 2; j >= 0; j--) {
                dp[j] += dp[j + 1];
            }
        }
        
        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(n, 1);
        
        for (int i = m - 2; i >= 0; i--) {
            for (int j = n - 2; j >= 0; j--) {
                dp[j] += dp[j + 1];
            }
        }
        
        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    uniquePaths(m, n) {
        let dp = new Array(n).fill(1);
    
        for (let i = m - 2; i >= 0; i--) {
            for (let j = n - 2; j >= 0; j--) {
                dp[j] += dp[j + 1];
            }
        }
        
        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int UniquePaths(int m, int n) {
        int[] dp = new int[n];
        Array.Fill(dp, 1);
        
        for (int i = m - 2; i >= 0; i--) {
            for (int j = n - 2; j >= 0; j--) {
                dp[j] += dp[j + 1];
            }
        }
        
        return dp[0];
    }
}
```

```go
func uniquePaths(m int, n int) int {
    dp := make([]int, n)
    for i := range dp {
        dp[i] = 1
    }

    for i := m - 2; i >= 0; i-- {
        for j := n - 2; j >= 0; j-- {
            dp[j] += dp[j+1]
        }
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun uniquePaths(m: Int, n: Int): Int {
        var dp = IntArray(n) { 1 }

        for (i in m - 2 downTo 0) {
            for (j in n - 2 downTo 0) {
                dp[j] += dp[j + 1]
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

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 6. Math

::tabs-start

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        if m == 1 or n == 1:
            return 1
        if m < n:
            m, n = n, m

        res = j = 1
        for i in range(m, m + n - 1):
            res *= i
            res //= j
            j += 1

        return res
```

```java
public class Solution {
    public int uniquePaths(int m, int n) {
        if (m == 1 || n == 1) {
            return 1;
        }
        if (m < n) {
            int temp = m;
            m = n;
            n = temp;
        }

        long res = 1;
        int j = 1;
        for (int i = m; i < m + n - 1; i++) {
            res *= i;
            res /= j;
            j++;
        }

        return (int) res;
    }
}
```

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        if (m == 1 || n == 1) {
            return 1;
        }
        if (m < n) {
            swap(m, n);
        }

        long long res = 1;
        int j = 1;
        for (int i = m; i < m + n - 1; i++) {
            res *= i;
            res /= j;
            j++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    uniquePaths(m, n) {
        if (m === 1 || n === 1) {
            return 1;
        }
        if (m < n) {
            [m, n] = [n, m];
        }

        let res = 1, j = 1;
        for (let i = m; i < m + n - 1; i++) {
            res *= i;
            res = Math.floor(res / j);
            j++;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int UniquePaths(int m, int n) {
        if (m == 1 || n == 1) {
            return 1;
        }
        if (m < n) {
            int temp = m;
            m = n;
            n = temp;
        }

        long res = 1;
        int j = 1;
        for (int i = m; i < m + n - 1; i++) {
            res *= i;
            res /= j;
            j++;
        }

        return (int) res;
    }
}
```

```go
func uniquePaths(m int, n int) int {
    if m == 1 || n == 1 {
        return 1
    }
    if m < n {
        tmp := m
        m = n
        n = tmp
    }

    res, j := 1, 1
    for i := m; i < m + n - 1; i++ {
        res *= i
        res /= j
        j++
    }

    return res
}
```

```kotlin
class Solution {
    fun uniquePaths(m: Int, n: Int): Int {
        if (m == 1 || n == 1) return 1
        var m = m
        var n = n
        if (m < n) {
            val tmp = m
            m = n
            n = tmp
        }

        var res: Long = 1
        var j = 1
        for (i in m until m + n - 1) {
            res *= i
            res /= j
            j++
        }
        
        return res.toInt()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(min(m, n))$
* Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns.