## 1. Recursion

### Intuition

This problem asks for the **minimum number of operations** required to convert `word1` into `word2`.  
The allowed operations are:
- insert a character
- delete a character
- replace a character

At any position in both strings, we compare characters at indices `i` and `j`.

The recursive function represents:
**"What is the minimum number of operations needed to convert `word1[i:]` into `word2[j:]`?"**

If the characters already match, we simply move forward in both strings without using any operation.
If they do not match, we try all three possible operations and take the minimum cost.

### Algorithm

1. Let `m = len(word1)` and `n = len(word2)`.
2. Define a recursive function `dfs(i, j)`:
   - `i` is the current index in `word1`
   - `j` is the current index in `word2`
3. If we reach the end of `word1`:
   - All remaining characters in `word2` must be inserted
   - Return `n - j`
4. If we reach the end of `word2`:
   - All remaining characters in `word1` must be deleted
   - Return `m - i`
5. If `word1[i] == word2[j]`:
   - No operation is needed
   - Move both pointers forward: `dfs(i + 1, j + 1)`
6. Otherwise, consider all three operations:
   - **Delete** from `word1`: `dfs(i + 1, j)`
   - **Insert** into `word1`: `dfs(i, j + 1)`
   - **Replace** the character: `dfs(i + 1, j + 1)`
7. Take the minimum of these three results and add `1` for the current operation
8. Start the recursion from `(0, 0)` and return the final result

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
        const m = word1.length,
            n = word2.length;

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

```swift
class Solution {
    func minDistance(_ word1: String, _ word2: String) -> Int {
        let m = word1.count, n = word2.count
        let word1Array = Array(word1), word2Array = Array(word2)

        func dfs(_ i: Int, _ j: Int) -> Int {
            if i == m { return n - j }
            if j == n { return m - i }
            if word1Array[i] == word2Array[j] {
                return dfs(i + 1, j + 1)
            }
            let res = min(dfs(i + 1, j), dfs(i, j + 1))
            return min(res, dfs(i + 1, j + 1)) + 1
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(3 ^ {m + n})$
- Space complexity: $O(m + n)$

> Where $m$ is the length of $word1$ and $n$ is the length of $word2$.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

This problem asks for the **minimum number of edit operations** required to convert `word1` into `word2`.  
The allowed operations are:
- insert a character
- delete a character
- replace a character

The recursive solution explores all possibilities, but many subproblems repeat. To optimize this, we use **top-down dynamic programming (memoization)**.

A state is uniquely defined by:
- `i`: current index in `word1`
- `j`: current index in `word2`

The recursive function answers:
**"What is the minimum number of operations needed to convert `word1[i:]` into `word2[j:]`?"**

By caching results for each `(i, j)` pair, we avoid recomputing the same states.

### Algorithm

1. Let `m = len(word1)` and `n = len(word2)`.
2. Create a memoization map `dp` where:
   - `dp[(i, j)]` stores the minimum edit distance for `word1[i:]` and `word2[j:]`
3. Define a recursive function `dfs(i, j)`:
   - `i` is the current index in `word1`
   - `j` is the current index in `word2`
4. If `i` reaches the end of `word1`:
   - Return the number of remaining characters in `word2` (`n - j`)
5. If `j` reaches the end of `word2`:
   - Return the number of remaining characters in `word1` (`m - i`)
6. If the state `(i, j)` is already in `dp`:
   - Return the cached result
7. If `word1[i] == word2[j]`:
   - No operation is needed
   - Store and return `dfs(i + 1, j + 1)`
8. Otherwise, consider all three operations:
   - Delete from `word1` → `dfs(i + 1, j)`
   - Insert into `word1` → `dfs(i, j + 1)`
   - Replace the character → `dfs(i + 1, j + 1)`
9. Take the minimum of the three results, add `1`, and store it in `dp[(i, j)]`
10. Start the recursion from `(0, 0)` and return the final answer

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
        const m = word1.length,
            n = word2.length;
        let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(-1));
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

```swift
class Solution {
    func minDistance(_ word1: String, _ word2: String) -> Int {
        let m = word1.count, n = word2.count
        let word1Array = Array(word1), word2Array = Array(word2)
        var dp = [[Int?]](repeating: [Int?](repeating: nil, count: n + 1), count: m + 1)

        func dfs(_ i: Int, _ j: Int) -> Int {
            if i == m { return n - j }
            if j == n { return m - i }
            if let val = dp[i][j] { return val }

            if word1Array[i] == word2Array[j] {
                dp[i][j] = dfs(i + 1, j + 1)
            } else {
                let res = min(dfs(i + 1, j), dfs(i, j + 1), dfs(i + 1, j + 1)) + 1
                dp[i][j] = res
            }
            return dp[i][j]!
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the length of $word1$ and $n$ is the length of $word2$.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We want the **minimum number of edits** needed to convert `word1` into `word2`, where an edit can be:
- insert a character
- delete a character
- replace a character

Instead of using recursion, we can solve this using **bottom-up dynamic programming** by building the answer for smaller suffixes first.

We define a DP state that answers:
**"What is the minimum edit distance between `word1[i:]` and `word2[j:]`?"**

By filling a table from the end of the strings toward the beginning, every subproblem we need is already solved when we reach it.

### Algorithm

1. Create a 2D DP table `dp` of size
   `(len(word1) + 1) × (len(word2) + 1)`.
2. Let `dp[i][j]` represent the minimum number of operations to convert
   `word1[i:]` into `word2[j:]`.
3. Initialize the base cases:
   - If `word1` is exhausted (`i == len(word1)`), all remaining characters of `word2` must be inserted:
     - `dp[len(word1)][j] = len(word2) - j`
   - If `word2` is exhausted (`j == len(word2)`), all remaining characters of `word1` must be deleted:
     - `dp[i][len(word2)] = len(word1) - i`
4. Fill the DP table from bottom-right to top-left:
5. For each position `(i, j)`:
   - If `word1[i] == word2[j]`:
     - No operation is needed
     - `dp[i][j] = dp[i + 1][j + 1]`
   - Otherwise:
     - Consider all three operations:
       - Delete → `dp[i + 1][j]`
       - Insert → `dp[i][j + 1]`
       - Replace → `dp[i + 1][j + 1]`
     - Take the minimum of these and add `1`
6. After filling the table, the answer is stored in `dp[0][0]`
7. Return `dp[0][0]`

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

```swift
class Solution {
    func minDistance(_ word1: String, _ word2: String) -> Int {
        let m = word1.count, n = word2.count
        let word1Array = Array(word1), word2Array = Array(word2)
        var dp = [[Int]](repeating: [Int](repeating: Int.max, count: n + 1), count: m + 1)

        for j in 0...n {
            dp[m][j] = n - j
        }
        for i in 0...m {
            dp[i][n] = m - i
        }

        for i in stride(from: m - 1, through: 0, by: -1) {
            for j in stride(from: n - 1, through: 0, by: -1) {
                if word1Array[i] == word2Array[j] {
                    dp[i][j] = dp[i + 1][j + 1]
                } else {
                    dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1])
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

> Where $m$ is the length of $word1$ and $n$ is the length of $word2$.

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

We want the minimum number of edits (insert, delete, replace) to convert `word1` into `word2`.

In the 2D DP solution, we used `dp[i][j]` to represent the answer for `word1[i:]` and `word2[j:]`.
But notice that each cell `dp[i][j]` depends only on:
- `dp[i + 1][j]`   (delete)
- `dp[i][j + 1]`   (insert)
- `dp[i + 1][j + 1]` (replace / match)

So when filling the table from bottom to top, we only need:
- the **next row** (`i + 1`) and
- the **current row** being built (`i`)

That means we can optimize space by keeping just two 1D arrays:
- `dp` for the next row
- `nextDp` for the current row

To reduce memory even more, we also ensure the 1D arrays are based on the **shorter string** (swap if needed).

### Algorithm

1. Let `m = len(word1)` and `n = len(word2)`.
2. If `word2` is longer than `word1`, swap them so that `n` is the smaller length (this keeps the DP arrays small).
3. Create two arrays of size `n + 1`:
   - `dp` represents the DP values for row `i + 1`
   - `nextDp` represents the DP values for row `i`
4. Initialize the base case for when `word1` is exhausted:
   - `dp[j] = n - j` for all `j`
   - meaning if `word1` is empty, we must insert the remaining characters of `word2`
5. Iterate `i` from `m - 1` down to `0`:
   - Set `nextDp[n] = m - i`
   - meaning if `word2` is exhausted, we must delete the remaining characters of `word1`
6. For each `i`, iterate `j` from `n - 1` down to `0`:
   - If `word1[i] == word2[j]`:
     - no edit needed: `nextDp[j] = dp[j + 1]`
   - Otherwise:
     - take `1` + minimum of:
       - delete: `dp[j]`
       - insert: `nextDp[j + 1]`
       - replace: `dp[j + 1]`
7. After finishing the row, copy `nextDp` into `dp` for the next iteration.
8. The final answer is `dp[0]`, which represents converting `word1[0:]` to `word2[0:]`.
9. Return `dp[0]`

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
        let m = word1.length,
            n = word2.length;
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
                    nextDp[j] =
                        1 + Math.min(dp[j], Math.min(nextDp[j + 1], dp[j + 1]));
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

```swift
class Solution {
    func minDistance(_ word1: String, _ word2: String) -> Int {
        var m = word1.count, n = word2.count
        var word1Array = Array(word1), word2Array = Array(word2)

        if m < n {
            swap(&m, &n)
            swap(&word1Array, &word2Array)
        }

        var dp = [Int](repeating: 0, count: n + 1)
        var nextDp = [Int](repeating: 0, count: n + 1)

        for j in 0...n {
            dp[j] = n - j
        }

        for i in stride(from: m - 1, through: 0, by: -1) {
            nextDp[n] = m - i
            for j in stride(from: n - 1, through: 0, by: -1) {
                if word1Array[i] == word2Array[j] {
                    nextDp[j] = dp[j + 1]
                } else {
                    nextDp[j] = 1 + min(dp[j], nextDp[j + 1], dp[j + 1])
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

> Where $m$ is the length of $word1$ and $n$ is the length of $word2$.

---

## 5. Dynamic Programming (Optimal)

### Intuition

We want the minimum number of edits (insert, delete, replace) needed to convert `word1` into `word2`.

The classic DP idea is:
- `dp[i][j]` = minimum operations to convert `word1[i:]` into `word2[j:]`

But to compute `dp[i][j]`, we only need three neighboring states:
- `dp[i + 1][j]`   (delete from `word1`)
- `dp[i][j + 1]`   (insert into `word1`)
- `dp[i + 1][j + 1]` (replace, or match if characters are equal)

That means we don't need the full 2D table. We can compress it into a single 1D array `dp`, and update it row-by-row (from the end of the strings to the start).

The tricky part of in-place updates is that `dp[i + 1][j + 1]` (the diagonal value) would get overwritten.
So we carry that diagonal value using one extra variable (`nextDp`), and another temporary variable to shift it correctly while moving left.

We also swap the strings if needed so the DP array is based on the shorter word, keeping memory minimal.

### Algorithm

1. Let `m = len(word1)` and `n = len(word2)`.
2. If `word2` is longer than `word1`, swap them so `n` is the smaller length (smaller DP array).
3. Create a 1D array `dp` of size `n + 1`:
   - Initialize it for the base case when `word1` is exhausted:
     - `dp[j] = n - j` (we must insert the remaining characters of `word2`)
4. Iterate `i` from `m - 1` down to `0`:
   - Store the old diagonal value using `nextDp` (this represents `dp[i + 1][j + 1]` during updates)
   - Update `dp[n] = m - i` (when `word2` is exhausted, we must delete remaining characters of `word1`)
5. Iterate `j` from `n - 1` down to `0`:
   - Save the current `dp[j]` in `temp` before overwriting it (this becomes the next diagonal)
   - If `word1[i] == word2[j]`:
     - no operation needed: set `dp[j] = nextDp`
   - Otherwise:
     - take `1` + minimum of:
       - delete: `dp[j]` (still represents `dp[i + 1][j]`)
       - insert: `dp[j + 1]` (already updated for current row)
       - replace: `nextDp` (the diagonal `dp[i + 1][j + 1]`)
   - Move the diagonal forward: set `nextDp = temp`
6. After finishing all updates, `dp[0]` represents converting the full `word1` into the full `word2`.
7. Return `dp[0]`

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
        let m = word1.length,
            n = word2.length;
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

```swift
class Solution {
    func minDistance(_ word1: String, _ word2: String) -> Int {
        var m = word1.count, n = word2.count
        var word1Array = Array(word1), word2Array = Array(word2)

        if m < n {
            swap(&m, &n)
            swap(&word1Array, &word2Array)
        }

        var dp = (0...n).map { n - $0 }

        for i in stride(from: m - 1, through: 0, by: -1) {
            var nextDp = dp[n]
            dp[n] = m - i
            for j in stride(from: n - 1, through: 0, by: -1) {
                let temp = dp[j]
                if word1Array[i] == word2Array[j] {
                    dp[j] = nextDp
                } else {
                    dp[j] = 1 + min(dp[j], dp[j + 1], nextDp)
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

- Time complexity: $O(m * n)$
- Space complexity: $O(min(m, n))$

> Where $m$ is the length of $word1$ and $n$ is the length of $word2$.

---

## Common Pitfalls

### Confusing Insert and Delete Operations

When converting `word1` to `word2`, an insert into `word1` is equivalent to advancing `j` (moving forward in `word2`), while a delete from `word1` advances `i`. Mixing these up leads to incorrect recurrence relations. Remember: insert adds a character to match `word2[j]`, delete removes `word1[i]`.

### Incorrect Base Case Initialization

The base cases require returning the number of remaining characters when one string is exhausted. A common mistake is returning `0` or forgetting to handle when `i == m` (return `n - j`) or `j == n` (return `m - i`). These represent the insertions or deletions needed to complete the transformation.

### Forgetting to Add 1 for the Current Operation

When characters don't match, you must add `1` to the minimum of the three recursive calls to account for the current operation. Forgetting this addition results in an answer that's always too small, as it doesn't count the edit being performed at the current position.

### Off-by-One Errors in DP Table Dimensions

The DP table needs dimensions `(m + 1) x (n + 1)` to accommodate the base cases where either string is empty. Using `m x n` causes index out of bounds errors when accessing `dp[m][j]` or `dp[i][n]` for the boundary conditions.

### Not Handling Equal Characters Correctly

When `word1[i] == word2[j]`, no operation is needed and you should directly use `dp[i+1][j+1]` without adding 1. A common mistake is still adding 1 or considering all three operations when characters match, leading to an inflated edit distance.
