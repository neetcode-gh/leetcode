## 1. Recursion

::tabs-start

```python
class Solution:
    def numWays(self, words: List[str], target: str) -> int:
        mod = 10**9 + 7
        n, m = len(target), len(words[0])

        def dfs(i, k):
            if i == n:
                return 1
            if k == m:
                return 0

            res = dfs(i, k + 1)
            for w in words:
                if w[k] != target[i]:
                    continue
                res = (res + dfs(i + 1, k + 1)) % mod
            return res

        return dfs(0, 0)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int numWays(String[] words, String target) {
        return dfs(words, target, 0, 0);
    }

    private int dfs(String[] words, String target, int i, int k) {
        if (i == target.length()) return 1;
        if (k == words[0].length()) return 0;

        int res = dfs(words, target, i, k + 1);
        for (String w : words) {
            if (w.charAt(k) != target.charAt(i)) {
                continue;
            }
            res = (int) (res + 0L + dfs(words, target, i + 1, k + 1)) % MOD;
        }

        return res;
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;

    int dfs(vector<string>& words, string target, int i, int k) {
        if (i == target.length()) return 1;
        if (k == words[0].length()) return 0;

        int res = dfs(words, target, i, k + 1);
        for (string& w : words) {
            if (w[k] != target[i]) {
                continue;
            }
            res = (int) (res + 0LL + dfs(words, target, i + 1, k + 1)) % MOD;
        }

        return res;
    }

public:
    int numWays(vector<string>& words, string target) {
        return dfs(words, target, 0, 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {string} target
     * @return {number}
     */
    numWays(words, target) {
        const n = target.length;
        const m = words[0].length;
        const MOD = 1e9 + 7;

        const dfs = (i, k) => {
            if (i === n) return 1;
            if (k === m) return 0;

            let res = dfs(i, k + 1);
            for (const w of words) {
                if (w[k] != target[i]) {
                    continue;
                }
                res = (res + dfs(i + 1, k + 1)) % MOD;
            }

            return res;
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    public int NumWays(string[] words, string target) {
        return Dfs(words, target, 0, 0);
    }

    private int Dfs(string[] words, string target, int i, int k) {
        if (i == target.Length) return 1;
        if (k == words[0].Length) return 0;

        int res = Dfs(words, target, i, k + 1);
        foreach (var w in words) {
            if (w[k] != target[i]) continue;
            res = (int)((res + (long)Dfs(words, target, i + 1, k + 1)) % MOD);
        }
        return res;
    }
}
```

```go
func numWays(words []string, target string) int {
    MOD := int(1e9 + 7)
    n, m := len(target), len(words[0])

    var dfs func(i, k int) int
    dfs = func(i, k int) int {
        if i == n {
            return 1
        }
        if k == m {
            return 0
        }

        res := dfs(i, k+1)
        for _, w := range words {
            if w[k] != target[i] {
                continue
            }
            res = (res + dfs(i+1, k+1)) % MOD
        }
        return res
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007

    fun numWays(words: Array<String>, target: String): Int {
        val n = target.length
        val m = words[0].length

        fun dfs(i: Int, k: Int): Int {
            if (i == n) return 1
            if (k == m) return 0

            var res = dfs(i, k + 1)
            for (w in words) {
                if (w[k] != target[i]) continue
                res = ((res + dfs(i + 1, k + 1)) % MOD).toInt()
            }
            return res
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func numWays(_ words: [String], _ target: String) -> Int {
        let MOD = 1_000_000_007
        let n = target.count
        let m = words[0].count
        let targetArr = Array(target)
        let wordsArr = words.map { Array($0) }

        func dfs(_ i: Int, _ k: Int) -> Int {
            if i == n { return 1 }
            if k == m { return 0 }

            var res = dfs(i, k + 1)
            for w in wordsArr {
                if w[k] != targetArr[i] { continue }
                res = (res + dfs(i + 1, k + 1)) % MOD
            }
            return res
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N ^ m)$
- Space complexity: $O(m)$

> Where $N$ is the number of words, $m$ is the length of each word, and $n$ is the length of the $target$ string.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def numWays(self, words: List[str], target: str) -> int:
        mod = 10**9 + 7
        cnt = defaultdict(int)  # (index, char) --> count among all words
        for w in words:
            for i, c in enumerate(w):
                cnt[(i, c)] += 1

        dp = {}

        def dfs(i, k):
            if i == len(target):
                return 1
            if k == len(words[0]):
                return 0
            if (i, k) in dp:
                return dp[(i, k)]

            c = target[i]
            dp[(i, k)] = dfs(i, k + 1)  # skip k position
            dp[(i, k)] += cnt[(k, c)] * dfs(i + 1, k + 1)
            dp[(i, k)] %= mod
            return dp[(i, k)]

        return dfs(0, 0)
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;
    private int[][] dp;
    private int[][] cnt;

    public int numWays(String[] words, String target) {
        int n = target.length(), m = words[0].length();
        cnt = new int[m][26];

        for (String word : words) {
            for (int i = 0; i < word.length(); i++) {
                cnt[i][word.charAt(i) - 'a']++;
            }
        }

        dp = new int[n + 1][m + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }

        return dfs(0, 0, target, n, m);
    }

    private int dfs(int i, int k, String target, int n, int m) {
        if (i == n) return 1;
        if (k == m) return 0;
        if (dp[i][k] != -1) return dp[i][k];

        int c = target.charAt(i) - 'a';
        dp[i][k] = dfs(i, k + 1, target, n, m);  // Skip k position
        dp[i][k] = (int) ((dp[i][k] + (long) cnt[k][c] * dfs(i + 1, k + 1, target, n, m)) % MOD);
        return dp[i][k];
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;
    vector<vector<int>> dp;
    vector<vector<int>> cnt;

public:
    int numWays(vector<string>& words, string target) {
        int n = target.size(), m = words[0].size();
        cnt = vector<vector<int>>(m, vector<int>(26, 0));

        for (const string& word : words) {
            for (int i = 0; i < word.size(); i++) {
                cnt[i][word[i] - 'a']++;
            }
        }

        dp = vector<vector<int>>(n + 1, vector<int>(m + 1, -1));
        return dfs(0, 0, target, n, m);
    }

private:
    int dfs(int i, int k, const string& target, int n, int m) {
        if (i == n) return 1;
        if (k == m) return 0;
        if (dp[i][k] != -1) return dp[i][k];

        int c = target[i] - 'a';
        dp[i][k] = dfs(i, k + 1, target, n, m);  // Skip k position
        dp[i][k] = (dp[i][k] + (long long) cnt[k][c] * dfs(i + 1, k + 1, target, n, m)) % MOD;
        return dp[i][k];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {string} target
     * @return {number}
     */
    numWays(words, target) {
        const MOD = 1e9 + 7;
        const n = target.length,
            m = words[0].length;
        const cnt = Array.from({ length: m }, () => Array(26).fill(0));

        for (const word of words) {
            for (let i = 0; i < word.length; i++) {
                cnt[i][word.charCodeAt(i) - 97]++;
            }
        }

        const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(-1));

        const dfs = (i, k) => {
            if (i === n) return 1;
            if (k === m) return 0;
            if (dp[i][k] !== -1) return dp[i][k];

            const c = target.charCodeAt(i) - 97;
            dp[i][k] = dfs(i, k + 1); // Skip k position
            dp[i][k] = (dp[i][k] + cnt[k][c] * dfs(i + 1, k + 1)) % MOD;
            return dp[i][k];
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;
    private int[,] dp;
    private int[,] cnt;

    public int NumWays(string[] words, string target) {
        int n = target.Length, m = words[0].Length;
        cnt = new int[m, 26];

        foreach (var word in words) {
            for (int i = 0; i < word.Length; i++) {
                cnt[i, word[i] - 'a']++;
            }
        }

        dp = new int[n + 1, m + 1];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= m; j++) {
                dp[i, j] = -1;
            }
        }

        return Dfs(0, 0, target, n, m);
    }

    private int Dfs(int i, int k, string target, int n, int m) {
        if (i == n) return 1;
        if (k == m) return 0;
        if (dp[i, k] != -1) return dp[i, k];

        int c = target[i] - 'a';
        dp[i, k] = Dfs(i, k + 1, target, n, m);
        dp[i, k] = (int)((dp[i, k] + (long)cnt[k, c] * Dfs(i + 1, k + 1, target, n, m)) % MOD);
        return dp[i, k];
    }
}
```

```go
func numWays(words []string, target string) int {
    MOD := int(1e9 + 7)
    n, m := len(target), len(words[0])

    cnt := make([][]int, m)
    for i := range cnt {
        cnt[i] = make([]int, 26)
    }
    for _, word := range words {
        for i := 0; i < len(word); i++ {
            cnt[i][word[i]-'a']++
        }
    }

    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, m+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, k int) int
    dfs = func(i, k int) int {
        if i == n {
            return 1
        }
        if k == m {
            return 0
        }
        if dp[i][k] != -1 {
            return dp[i][k]
        }

        c := target[i] - 'a'
        dp[i][k] = dfs(i, k+1)
        dp[i][k] = (dp[i][k] + cnt[k][c]*dfs(i+1, k+1)) % MOD
        return dp[i][k]
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    private val MOD = 1_000_000_007
    private lateinit var dp: Array<IntArray>
    private lateinit var cnt: Array<IntArray>

    fun numWays(words: Array<String>, target: String): Int {
        val n = target.length
        val m = words[0].length
        cnt = Array(m) { IntArray(26) }

        for (word in words) {
            for (i in word.indices) {
                cnt[i][word[i] - 'a']++
            }
        }

        dp = Array(n + 1) { IntArray(m + 1) { -1 } }
        return dfs(0, 0, target, n, m)
    }

    private fun dfs(i: Int, k: Int, target: String, n: Int, m: Int): Int {
        if (i == n) return 1
        if (k == m) return 0
        if (dp[i][k] != -1) return dp[i][k]

        val c = target[i] - 'a'
        dp[i][k] = dfs(i, k + 1, target, n, m)
        dp[i][k] = ((dp[i][k] + cnt[k][c].toLong() * dfs(i + 1, k + 1, target, n, m)) % MOD).toInt()
        return dp[i][k]
    }
}
```

```swift
class Solution {
    func numWays(_ words: [String], _ target: String) -> Int {
        let MOD = 1_000_000_007
        let n = target.count
        let m = words[0].count
        let targetArr = Array(target)

        var cnt = [[Int]](repeating: [Int](repeating: 0, count: 26), count: m)
        for word in words {
            let wordArr = Array(word)
            for i in 0..<wordArr.count {
                cnt[i][Int(wordArr[i].asciiValue!) - Int(Character("a").asciiValue!)] += 1
            }
        }

        var dp = [[Int]](repeating: [Int](repeating: -1, count: m + 1), count: n + 1)

        func dfs(_ i: Int, _ k: Int) -> Int {
            if i == n { return 1 }
            if k == m { return 0 }
            if dp[i][k] != -1 { return dp[i][k] }

            let c = Int(targetArr[i].asciiValue!) - Int(Character("a").asciiValue!)
            dp[i][k] = dfs(i, k + 1)
            dp[i][k] = (dp[i][k] + cnt[k][c] * dfs(i + 1, k + 1)) % MOD
            return dp[i][k]
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * (n + N))$
- Space complexity: $O(n * m)$

> Where $N$ is the number of words, $m$ is the length of each word, and $n$ is the length of the $target$ string.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def numWays(self, words: List[str], target: str) -> int:
        MOD = 10**9 + 7
        n, m = len(target), len(words[0])

        cnt = [[0] * 26 for _ in range(m)]
        for word in words:
            for i, c in enumerate(word):
                cnt[i][ord(c) - ord('a')] += 1

        dp = [[0] * (m + 1) for _ in range(n + 1)]
        dp[n][m] = 1

        for i in range(n, -1, -1):
            for k in range(m - 1, -1, -1):
                dp[i][k] = dp[i][k + 1]
                if i < n:
                    c = ord(target[i]) - ord('a')
                    dp[i][k] = (dp[i][k] + cnt[k][c] * dp[i + 1][k + 1]) % MOD

        return dp[0][0]
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int numWays(String[] words, String target) {
        int n = target.length(), m = words[0].length();

        int[][] cnt = new int[m][26];
        for (String word : words) {
            for (int i = 0; i < word.length(); i++) {
                cnt[i][word.charAt(i) - 'a']++;
            }
        }

        int[][] dp = new int[n + 1][m + 1];
        dp[n][m] = 1;

        for (int i = n; i >= 0; i--) {
            for (int k = m - 1; k >= 0; k--) {
                dp[i][k] = dp[i][k + 1];
                if (i < n) {
                    int c = target.charAt(i) - 'a';
                    dp[i][k] = (int) ((dp[i][k] + (long) cnt[k][c] * dp[i + 1][k + 1]) % MOD);
                }
            }
        }

        return dp[0][0];
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;

public:
    int numWays(vector<string>& words, string target) {
        int n = target.size(), m = words[0].size();

        vector<vector<int>> cnt(m, vector<int>(26, 0));
        for (const string& word : words) {
            for (int i = 0; i < word.size(); i++) {
                cnt[i][word[i] - 'a']++;
            }
        }

        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
        dp[n][m] = 1;

        for (int i = n; i >= 0; i--) {
            for (int k = m - 1; k >= 0; k--) {
                dp[i][k] = dp[i][k + 1];
                if (i < n) {
                    int c = target[i] - 'a';
                    dp[i][k] = (dp[i][k] + (long long) cnt[k][c] * dp[i + 1][k + 1]) % MOD;
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
     * @param {string[]} words
     * @param {string} target
     * @return {number}
     */
    numWays(words, target) {
        const MOD = 1e9 + 7;
        const n = target.length,
            m = words[0].length;

        const cnt = Array.from({ length: m }, () => Array(26).fill(0));
        for (const word of words) {
            for (let i = 0; i < word.length; i++) {
                cnt[i][word.charCodeAt(i) - 'a'.charCodeAt(0)]++;
            }
        }

        const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
        dp[n][m] = 1;

        for (let i = n; i >= 0; i--) {
            for (let k = m - 1; k >= 0; k--) {
                dp[i][k] = dp[i][k + 1];
                if (i < n) {
                    const c = target.charCodeAt(i) - 'a'.charCodeAt(0);
                    dp[i][k] = (dp[i][k] + cnt[k][c] * dp[i + 1][k + 1]) % MOD;
                }
            }
        }

        return dp[0][0];
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    public int NumWays(string[] words, string target) {
        int n = target.Length, m = words[0].Length;

        int[,] cnt = new int[m, 26];
        foreach (var word in words) {
            for (int i = 0; i < word.Length; i++) {
                cnt[i, word[i] - 'a']++;
            }
        }

        int[,] dp = new int[n + 1, m + 1];
        dp[n, m] = 1;

        for (int i = n; i >= 0; i--) {
            for (int k = m - 1; k >= 0; k--) {
                dp[i, k] = dp[i, k + 1];
                if (i < n) {
                    int c = target[i] - 'a';
                    dp[i, k] = (int)((dp[i, k] + (long)cnt[k, c] * dp[i + 1, k + 1]) % MOD);
                }
            }
        }

        return dp[0, 0];
    }
}
```

```go
func numWays(words []string, target string) int {
    MOD := int(1e9 + 7)
    n, m := len(target), len(words[0])

    cnt := make([][]int, m)
    for i := range cnt {
        cnt[i] = make([]int, 26)
    }
    for _, word := range words {
        for i := 0; i < len(word); i++ {
            cnt[i][word[i]-'a']++
        }
    }

    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, m+1)
    }
    dp[n][m] = 1

    for i := n; i >= 0; i-- {
        for k := m - 1; k >= 0; k-- {
            dp[i][k] = dp[i][k+1]
            if i < n {
                c := target[i] - 'a'
                dp[i][k] = (dp[i][k] + cnt[k][c]*dp[i+1][k+1]) % MOD
            }
        }
    }

    return dp[0][0]
}
```

```kotlin
class Solution {
    fun numWays(words: Array<String>, target: String): Int {
        val MOD = 1_000_000_007
        val n = target.length
        val m = words[0].length

        val cnt = Array(m) { IntArray(26) }
        for (word in words) {
            for (i in word.indices) {
                cnt[i][word[i] - 'a']++
            }
        }

        val dp = Array(n + 1) { IntArray(m + 1) }
        dp[n][m] = 1

        for (i in n downTo 0) {
            for (k in m - 1 downTo 0) {
                dp[i][k] = dp[i][k + 1]
                if (i < n) {
                    val c = target[i] - 'a'
                    dp[i][k] = ((dp[i][k] + cnt[k][c].toLong() * dp[i + 1][k + 1]) % MOD).toInt()
                }
            }
        }

        return dp[0][0]
    }
}
```

```swift
class Solution {
    func numWays(_ words: [String], _ target: String) -> Int {
        let MOD = 1_000_000_007
        let n = target.count
        let m = words[0].count
        let targetArr = Array(target)

        var cnt = [[Int]](repeating: [Int](repeating: 0, count: 26), count: m)
        for word in words {
            let wordArr = Array(word)
            for i in 0..<wordArr.count {
                cnt[i][Int(wordArr[i].asciiValue!) - Int(Character("a").asciiValue!)] += 1
            }
        }

        var dp = [[Int]](repeating: [Int](repeating: 0, count: m + 1), count: n + 1)
        dp[n][m] = 1

        for i in stride(from: n, through: 0, by: -1) {
            for k in stride(from: m - 1, through: 0, by: -1) {
                dp[i][k] = dp[i][k + 1]
                if i < n {
                    let c = Int(targetArr[i].asciiValue!) - Int(Character("a").asciiValue!)
                    dp[i][k] = (dp[i][k] + cnt[k][c] * dp[i + 1][k + 1]) % MOD
                }
            }
        }

        return dp[0][0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * (n + N))$
- Space complexity: $O(n * m)$

> Where $N$ is the number of words, $m$ is the length of each word, and $n$ is the length of the $target$ string.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def numWays(self, words: List[str], target: str) -> int:
        MOD = 10**9 + 7
        n, m = len(target), len(words[0])

        cnt = [[0] * 26 for _ in range(m)]
        for word in words:
            for i, c in enumerate(word):
                cnt[i][ord(c) - ord('a')] += 1

        dp = [0] * (m + 1)
        dp[m] = 1

        for i in range(n, -1, -1):
            nxt = 1 if i == n - 1 else 0
            for k in range(m - 1, -1, -1):
                cur = dp[k]
                dp[k] = dp[k + 1]
                if i < n:
                    c = ord(target[i]) - ord('a')
                    dp[k] = (dp[k] + cnt[k][c] * nxt) % MOD
                nxt = cur
            dp[m] = 0

        return dp[0]
```

```java
public class Solution {
    private static final int MOD = 1_000_000_007;

    public int numWays(String[] words, String target) {
        int n = target.length(), m = words[0].length();

        int[][] cnt = new int[m][26];
        for (String word : words) {
            for (int i = 0; i < word.length(); i++) {
                cnt[i][word.charAt(i) - 'a']++;
            }
        }

        int[] dp = new int[m + 1];
        dp[m] = 1;

        for (int i = n; i >= 0; i--) {
            int nxt = i == n - 1 ? 1 : 0;
            for (int k = m - 1; k >= 0; k--) {
                int cur = dp[k];
                dp[k] = dp[k + 1];
                if (i < n) {
                    int c = target.charAt(i) - 'a';
                    dp[k] = (int) ((dp[k] + (long) cnt[k][c] * nxt) % MOD);
                }
                nxt = cur;
            }
            dp[m] = 0;
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
private:
    static const int MOD = 1e9 + 7;

public:
    int numWays(vector<string>& words, string target) {
        int n = target.size(), m = words[0].size();

        vector<vector<int>> cnt(m, vector<int>(26, 0));
        for (const string& word : words) {
            for (int i = 0; i < word.size(); i++) {
                cnt[i][word[i] - 'a']++;
            }
        }

        vector<int> dp(m + 1);
        dp[m] = 1;

        for (int i = n; i >= 0; i--) {
            int nxt = i == n - 1 ? 1 : 0;
            for (int k = m - 1; k >= 0; k--) {
                int cur = dp[k];
                dp[k] = dp[k + 1];
                if (i < n) {
                    int c = target[i] - 'a';
                    dp[k] = (dp[k] + (long long) cnt[k][c] * nxt) % MOD;
                }
                nxt = cur;
            }
            dp[m] = 0;
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {string} target
     * @return {number}
     */
    numWays(words, target) {
        const MOD = 1e9 + 7;
        const n = target.length,
            m = words[0].length;

        const cnt = Array.from({ length: m }, () => Array(26).fill(0));
        for (const word of words) {
            for (let i = 0; i < word.length; i++) {
                cnt[i][word.charCodeAt(i) - 'a'.charCodeAt(0)]++;
            }
        }

        const dp = new Array(m + 1).fill(0);
        dp[m] = 1;

        for (let i = n; i >= 0; i--) {
            let nxt = i === n - 1 ? 1 : 0;
            for (let k = m - 1; k >= 0; k--) {
                const cur = dp[k];
                dp[k] = dp[k + 1];
                if (i < n) {
                    const c = target.charCodeAt(i) - 'a'.charCodeAt(0);
                    dp[k] = (dp[k] + cnt[k][c] * nxt) % MOD;
                }
                nxt = cur;
            }
            dp[m] = 0;
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    private const int MOD = 1_000_000_007;

    public int NumWays(string[] words, string target) {
        int n = target.Length, m = words[0].Length;

        int[,] cnt = new int[m, 26];
        foreach (var word in words) {
            for (int i = 0; i < word.Length; i++) {
                cnt[i, word[i] - 'a']++;
            }
        }

        int[] dp = new int[m + 1];
        dp[m] = 1;

        for (int i = n; i >= 0; i--) {
            int nxt = i == n - 1 ? 1 : 0;
            for (int k = m - 1; k >= 0; k--) {
                int cur = dp[k];
                dp[k] = dp[k + 1];
                if (i < n) {
                    int c = target[i] - 'a';
                    dp[k] = (int)((dp[k] + (long)cnt[k, c] * nxt) % MOD);
                }
                nxt = cur;
            }
            dp[m] = 0;
        }

        return dp[0];
    }
}
```

```go
func numWays(words []string, target string) int {
    MOD := int(1e9 + 7)
    n, m := len(target), len(words[0])

    cnt := make([][]int, m)
    for i := range cnt {
        cnt[i] = make([]int, 26)
    }
    for _, word := range words {
        for i := 0; i < len(word); i++ {
            cnt[i][word[i]-'a']++
        }
    }

    dp := make([]int, m+1)
    dp[m] = 1

    for i := n; i >= 0; i-- {
        nxt := 0
        if i == n-1 {
            nxt = 1
        }
        for k := m - 1; k >= 0; k-- {
            cur := dp[k]
            dp[k] = dp[k+1]
            if i < n {
                c := target[i] - 'a'
                dp[k] = (dp[k] + cnt[k][c]*nxt) % MOD
            }
            nxt = cur
        }
        dp[m] = 0
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun numWays(words: Array<String>, target: String): Int {
        val MOD = 1_000_000_007
        val n = target.length
        val m = words[0].length

        val cnt = Array(m) { IntArray(26) }
        for (word in words) {
            for (i in word.indices) {
                cnt[i][word[i] - 'a']++
            }
        }

        val dp = IntArray(m + 1)
        dp[m] = 1

        for (i in n downTo 0) {
            var nxt = if (i == n - 1) 1 else 0
            for (k in m - 1 downTo 0) {
                val cur = dp[k]
                dp[k] = dp[k + 1]
                if (i < n) {
                    val c = target[i] - 'a'
                    dp[k] = ((dp[k] + cnt[k][c].toLong() * nxt) % MOD).toInt()
                }
                nxt = cur
            }
            dp[m] = 0
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func numWays(_ words: [String], _ target: String) -> Int {
        let MOD = 1_000_000_007
        let n = target.count
        let m = words[0].count
        let targetArr = Array(target)

        var cnt = [[Int]](repeating: [Int](repeating: 0, count: 26), count: m)
        for word in words {
            let wordArr = Array(word)
            for i in 0..<wordArr.count {
                cnt[i][Int(wordArr[i].asciiValue!) - Int(Character("a").asciiValue!)] += 1
            }
        }

        var dp = [Int](repeating: 0, count: m + 1)
        dp[m] = 1

        for i in stride(from: n, through: 0, by: -1) {
            var nxt = i == n - 1 ? 1 : 0
            for k in stride(from: m - 1, through: 0, by: -1) {
                let cur = dp[k]
                dp[k] = dp[k + 1]
                if i < n {
                    let c = Int(targetArr[i].asciiValue!) - Int(Character("a").asciiValue!)
                    dp[k] = (dp[k] + cnt[k][c] * nxt) % MOD
                }
                nxt = cur
            }
            dp[m] = 0
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * (n + N))$
- Space complexity: $O(m)$

> Where $N$ is the number of words, $m$ is the length of each word, and $n$ is the length of the $target$ string.
