## 1. Recursion

::tabs-start

```python
class Solution:
    def longestIdealString(self, s: str, k: int) -> int:
        def dfs(i, prev):
            if i == len(s):
                return 0
            skip = dfs(i + 1, prev)
            include = 0
            if prev == "" or abs(ord(s[i]) - ord(prev)) <= k:
                include = 1 + dfs(i + 1, s[i])
            return max(skip, include)

        return dfs(0, "")
```

```java
public class Solution {
    public int longestIdealString(String s, int k) {
        return dfs(0, -1, s, k);
    }

    private int dfs(int i, int prev, String s, int k) {
        if (i == s.length()) {
            return 0;
        }
        int skip = dfs(i + 1, prev, s, k);
        int include = 0;
        if (prev == -1 || Math.abs(s.charAt(i) - prev) <= k) {
            include = 1 + dfs(i + 1, s.charAt(i), s, k);
        }
        return Math.max(skip, include);
    }
}
```

```cpp
class Solution {
public:
    int longestIdealString(string s, int k) {
        return dfs(0, -1, s, k);
    }

private:
    int dfs(int i, int prev, const string &s, int k) {
        if (i == s.size()) {
            return 0;
        }
        int skip = dfs(i + 1, prev, s, k);
        int include = 0;
        if (prev == -1 || abs(s[i] - prev) <= k) {
            include = 1 + dfs(i + 1, s[i], s, k);
        }
        return max(skip, include);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    longestIdealString(s, k) {
        const dfs = (i, prev) => {
            if (i === s.length) {
                return 0;
            }
            const skip = dfs(i + 1, prev);
            let include = 0;
            if (prev === -1 || Math.abs(s.charCodeAt(i) - prev) <= k) {
                include = 1 + dfs(i + 1, s.charCodeAt(i));
            }
            return Math.max(skip, include);
        };

        return dfs(0, -1);
    }
}
```

```csharp
public class Solution {
    public int LongestIdealString(string s, int k) {
        return Dfs(0, -1, s, k);
    }

    private int Dfs(int i, int prev, string s, int k) {
        if (i == s.Length) {
            return 0;
        }
        int skip = Dfs(i + 1, prev, s, k);
        int include = 0;
        if (prev == -1 || Math.Abs(s[i] - prev) <= k) {
            include = 1 + Dfs(i + 1, s[i], s, k);
        }
        return Math.Max(skip, include);
    }
}
```

```go
func longestIdealString(s string, k int) int {
    var dfs func(i, prev int) int
    dfs = func(i, prev int) int {
        if i == len(s) {
            return 0
        }
        skip := dfs(i+1, prev)
        include := 0
        if prev == -1 || abs(int(s[i])-prev) <= k {
            include = 1 + dfs(i+1, int(s[i]))
        }
        return max(skip, include)
    }
    return dfs(0, -1)
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
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
    fun longestIdealString(s: String, k: Int): Int {
        fun dfs(i: Int, prev: Int): Int {
            if (i == s.length) {
                return 0
            }
            val skip = dfs(i + 1, prev)
            var include = 0
            if (prev == -1 || kotlin.math.abs(s[i].code - prev) <= k) {
                include = 1 + dfs(i + 1, s[i].code)
            }
            return maxOf(skip, include)
        }
        return dfs(0, -1)
    }
}
```

```swift
class Solution {
    func longestIdealString(_ s: String, _ k: Int) -> Int {
        let chars = Array(s)

        func dfs(_ i: Int, _ prev: Int) -> Int {
            if i == chars.count {
                return 0
            }
            let skip = dfs(i + 1, prev)
            var include = 0
            let curr = Int(chars[i].asciiValue!)
            if prev == -1 || abs(curr - prev) <= k {
                include = 1 + dfs(i + 1, curr)
            }
            return max(skip, include)
        }

        return dfs(0, -1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def longestIdealString(self, s: str, k: int) -> int:
        cache = [[-1] * 27 for _ in range(len(s))]

        def dfs(i, prev):
            if i == len(s):
                return 0
            if cache[i][prev + 1] != -1:
                return cache[i][prev + 1]

            skip = dfs(i + 1, prev)
            include = 0
            c = ord(s[i]) - ord('a')
            if prev == -1 or abs(c - prev) <= k:
                include = 1 + dfs(i + 1, c)
            cache[i][prev + 1] = max(skip, include)
            return cache[i][prev + 1]

        return dfs(0, -1)
```

```java
public class Solution {
    private int[][] dp;

    public int longestIdealString(String s, int k) {
        dp = new int[s.length()][27];
        for (int i = 0; i < s.length(); i++) {
            for (int j = 0; j < 27; j++) {
                dp[i][j] = -1;
            }
        }
        return dfs(0, -1, s, k);
    }

    private int dfs(int i, int prev, String s, int k) {
        if (i == s.length()) {
            return 0;
        }
        if (dp[i][prev + 1] != -1) {
            return dp[i][prev + 1];
        }
        int skip = dfs(i + 1, prev, s, k);
        int include = 0;
        if (prev == -1 || Math.abs(s.charAt(i) - ('a' + prev)) <= k) {
            include = 1 + dfs(i + 1, s.charAt(i) - 'a', s, k);
        }
        dp[i][prev + 1] = Math.max(skip, include);
        return Math.max(skip, include);
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    int longestIdealString(string s, int k) {
        dp = vector<vector<int>>(s.size(), vector<int>(27, -1));
        return dfs(0, -1, s, k);
    }

private:
    int dfs(int i, int prev, const string &s, int k) {
        if (i == s.size()) {
            return 0;
        }
        if (dp[i][prev + 1] != -1) {
            return dp[i][prev + 1];
        }
        int skip = dfs(i + 1, prev, s, k);
        int include = 0;
        if (prev == -1 || abs(s[i] - ('a' + prev)) <= k) {
            include = 1 + dfs(i + 1, s[i] - 'a', s, k);
        }
        dp[i][prev + 1] = max(skip, include);
        return max(skip, include);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    longestIdealString(s, k) {
        const dp = Array.from({ length: s.length }, () => Array(27).fill(-1));

        const dfs = (i, prev) => {
            if (i === s.length) {
                return 0;
            }
            if (dp[i][prev + 1] !== -1) {
                return dp[i][prev + 1];
            }
            const skip = dfs(i + 1, prev);
            let include = 0;
            if (
                prev === -1 ||
                Math.abs(s.charCodeAt(i) - ('a'.charCodeAt(0) + prev)) <= k
            ) {
                include = 1 + dfs(i + 1, s.charCodeAt(i) - 'a'.charCodeAt(0));
            }
            dp[i][prev + 1] = Math.max(skip, include);
            return Math.max(skip, include);
        };

        return dfs(0, -1);
    }
}
```

```csharp
public class Solution {
    private int[,] dp;

    public int LongestIdealString(string s, int k) {
        dp = new int[s.Length, 27];
        for (int i = 0; i < s.Length; i++) {
            for (int j = 0; j < 27; j++) {
                dp[i, j] = -1;
            }
        }
        return Dfs(0, -1, s, k);
    }

    private int Dfs(int i, int prev, string s, int k) {
        if (i == s.Length) {
            return 0;
        }
        if (dp[i, prev + 1] != -1) {
            return dp[i, prev + 1];
        }
        int skip = Dfs(i + 1, prev, s, k);
        int include = 0;
        if (prev == -1 || Math.Abs(s[i] - ('a' + prev)) <= k) {
            include = 1 + Dfs(i + 1, s[i] - 'a', s, k);
        }
        dp[i, prev + 1] = Math.Max(skip, include);
        return Math.Max(skip, include);
    }
}
```

```go
func longestIdealString(s string, k int) int {
    n := len(s)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, 27)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, prev int) int
    dfs = func(i, prev int) int {
        if i == n {
            return 0
        }
        if dp[i][prev+1] != -1 {
            return dp[i][prev+1]
        }
        skip := dfs(i+1, prev)
        include := 0
        c := int(s[i] - 'a')
        if prev == -1 || abs(c-prev) <= k {
            include = 1 + dfs(i+1, c)
        }
        dp[i][prev+1] = max(skip, include)
        return dp[i][prev+1]
    }

    return dfs(0, -1)
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
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
    private lateinit var dp: Array<IntArray>

    fun longestIdealString(s: String, k: Int): Int {
        dp = Array(s.length) { IntArray(27) { -1 } }
        return dfs(0, -1, s, k)
    }

    private fun dfs(i: Int, prev: Int, s: String, k: Int): Int {
        if (i == s.length) {
            return 0
        }
        if (dp[i][prev + 1] != -1) {
            return dp[i][prev + 1]
        }
        val skip = dfs(i + 1, prev, s, k)
        var include = 0
        val c = s[i] - 'a'
        if (prev == -1 || kotlin.math.abs(c - prev) <= k) {
            include = 1 + dfs(i + 1, c, s, k)
        }
        dp[i][prev + 1] = maxOf(skip, include)
        return dp[i][prev + 1]
    }
}
```

```swift
class Solution {
    func longestIdealString(_ s: String, _ k: Int) -> Int {
        let chars = Array(s)
        let n = chars.count
        var dp = [[Int]](repeating: [Int](repeating: -1, count: 27), count: n)

        func dfs(_ i: Int, _ prev: Int) -> Int {
            if i == n {
                return 0
            }
            if dp[i][prev + 1] != -1 {
                return dp[i][prev + 1]
            }
            let skip = dfs(i + 1, prev)
            var include = 0
            let c = Int(chars[i].asciiValue! - Character("a").asciiValue!)
            if prev == -1 || abs(c - prev) <= k {
                include = 1 + dfs(i + 1, c)
            }
            dp[i][prev + 1] = max(skip, include)
            return dp[i][prev + 1]
        }

        return dfs(0, -1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def longestIdealString(self, s: str, k: int) -> int:
        dp = [[0] * 26 for _ in range(len(s) + 1)]

        for i in range(1, len(s) + 1):
            curr = ord(s[i - 1]) - ord('a')
            for prev in range(26):
                dp[i][prev] = max(dp[i][prev], dp[i - 1][prev])
                if abs(curr - prev) <= k:
                    dp[i][curr] = max(dp[i][curr], 1 + dp[i - 1][prev])

        return max(dp[len(s)])
```

```java
public class Solution {
    public int longestIdealString(String s, int k) {
        int n = s.length();
        int[][] dp = new int[n + 1][26];

        for (int i = 1; i <= n; i++) {
            int curr = s.charAt(i - 1) - 'a';
            for (int prev = 0; prev < 26; prev++) {
                dp[i][prev] = Math.max(dp[i][prev], dp[i - 1][prev]);
                if (Math.abs(curr - prev) <= k) {
                    dp[i][curr] = Math.max(dp[i][curr], 1 + dp[i - 1][prev]);
                }
            }
        }

        int max = 0;
        for (int val : dp[n]) {
            max = Math.max(max, val);
        }
        return max;
    }
}
```

```cpp
class Solution {
public:
    int longestIdealString(string s, int k) {
        int n = s.size();
        vector<vector<int>> dp(n + 1, vector<int>(26, 0));

        for (int i = 1; i <= n; i++) {
            int curr = s[i - 1] - 'a';
            for (int prev = 0; prev < 26; prev++) {
                dp[i][prev] = max(dp[i][prev], dp[i - 1][prev]);
                if (abs(curr - prev) <= k) {
                    dp[i][curr] = max(dp[i][curr], 1 + dp[i - 1][prev]);
                }
            }
        }

        return *max_element(dp[n].begin(), dp[n].end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    longestIdealString(s, k) {
        const n = s.length;
        const dp = Array.from({ length: n + 1 }, () => Array(26).fill(0));

        for (let i = 1; i <= n; i++) {
            const curr = s.charCodeAt(i - 1) - 'a'.charCodeAt(0);
            for (let prev = 0; prev < 26; prev++) {
                dp[i][prev] = Math.max(dp[i][prev], dp[i - 1][prev]);
                if (Math.abs(curr - prev) <= k) {
                    dp[i][curr] = Math.max(dp[i][curr], 1 + dp[i - 1][prev]);
                }
            }
        }
        return Math.max(...dp[n]);
    }
}
```

```csharp
public class Solution {
    public int LongestIdealString(string s, int k) {
        int n = s.Length;
        int[,] dp = new int[n + 1, 26];

        for (int i = 1; i <= n; i++) {
            int curr = s[i - 1] - 'a';
            for (int prev = 0; prev < 26; prev++) {
                dp[i, prev] = Math.Max(dp[i, prev], dp[i - 1, prev]);
                if (Math.Abs(curr - prev) <= k) {
                    dp[i, curr] = Math.Max(dp[i, curr], 1 + dp[i - 1, prev]);
                }
            }
        }

        int max = 0;
        for (int j = 0; j < 26; j++) {
            max = Math.Max(max, dp[n, j]);
        }
        return max;
    }
}
```

```go
func longestIdealString(s string, k int) int {
    n := len(s)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, 26)
    }

    for i := 1; i <= n; i++ {
        curr := int(s[i-1] - 'a')
        for prev := 0; prev < 26; prev++ {
            if dp[i][prev] < dp[i-1][prev] {
                dp[i][prev] = dp[i-1][prev]
            }
            if abs(curr-prev) <= k {
                if dp[i][curr] < 1+dp[i-1][prev] {
                    dp[i][curr] = 1 + dp[i-1][prev]
                }
            }
        }
    }

    res := 0
    for _, val := range dp[n] {
        if val > res {
            res = val
        }
    }
    return res
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun longestIdealString(s: String, k: Int): Int {
        val n = s.length
        val dp = Array(n + 1) { IntArray(26) }

        for (i in 1..n) {
            val curr = s[i - 1] - 'a'
            for (prev in 0 until 26) {
                dp[i][prev] = maxOf(dp[i][prev], dp[i - 1][prev])
                if (kotlin.math.abs(curr - prev) <= k) {
                    dp[i][curr] = maxOf(dp[i][curr], 1 + dp[i - 1][prev])
                }
            }
        }

        return dp[n].maxOrNull() ?: 0
    }
}
```

```swift
class Solution {
    func longestIdealString(_ s: String, _ k: Int) -> Int {
        let chars = Array(s)
        let n = chars.count
        var dp = [[Int]](repeating: [Int](repeating: 0, count: 26), count: n + 1)

        for i in 1...n {
            let curr = Int(chars[i - 1].asciiValue! - Character("a").asciiValue!)
            for prev in 0..<26 {
                dp[i][prev] = max(dp[i][prev], dp[i - 1][prev])
                if abs(curr - prev) <= k {
                    dp[i][curr] = max(dp[i][curr], 1 + dp[i - 1][prev])
                }
            }
        }

        return dp[n].max() ?? 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def longestIdealString(self, s: str, k: int) -> int:
        dp = [0] * 26

        for c in s:
            curr = ord(c) - ord('a')
            longest = 1
            for prev in range(26):
                if abs(curr - prev) <= k:
                    longest = max(longest, 1 + dp[prev])
            dp[curr] = max(dp[curr], longest)

        return max(dp)
```

```java
public class Solution {
    public int longestIdealString(String s, int k) {
        int[] dp = new int[26];

        for (char c : s.toCharArray()) {
            int curr = c - 'a'; // 0-25
            int longest = 1;
            for (int prev = 0; prev < 26; prev++) {
                if (Math.abs(curr - prev) <= k) {
                    longest = Math.max(longest, 1 + dp[prev]);
                }
            }
            dp[curr] = Math.max(dp[curr], longest);
        }

        int max = 0;
        for (int val : dp) {
            max = Math.max(max, val);
        }
        return max;
    }
}
```

```cpp
class Solution {
public:
    int longestIdealString(string s, int k) {
        vector<int> dp(26, 0);

        for (char c : s) {
            int curr = c - 'a';
            int longest = 1;
            for (int prev = 0; prev < 26; prev++) {
                if (abs(curr - prev) <= k) {
                    longest = max(longest, 1 + dp[prev]);
                }
            }
            dp[curr] = max(dp[curr], longest);
        }

        return *max_element(dp.begin(), dp.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    longestIdealString(s, k) {
        const dp = Array(26).fill(0);

        for (const c of s) {
            const curr = c.charCodeAt(0) - 'a'.charCodeAt(0);
            let longest = 1;
            for (let prev = 0; prev < 26; prev++) {
                if (Math.abs(curr - prev) <= k) {
                    longest = Math.max(longest, 1 + dp[prev]);
                }
            }
            dp[curr] = Math.max(dp[curr], longest);
        }

        return Math.max(...dp);
    }
}
```

```csharp
public class Solution {
    public int LongestIdealString(string s, int k) {
        int[] dp = new int[26];

        foreach (char c in s) {
            int curr = c - 'a';
            int longest = 1;
            for (int prev = 0; prev < 26; prev++) {
                if (Math.Abs(curr - prev) <= k) {
                    longest = Math.Max(longest, 1 + dp[prev]);
                }
            }
            dp[curr] = Math.Max(dp[curr], longest);
        }

        int max = 0;
        foreach (int val in dp) {
            max = Math.Max(max, val);
        }
        return max;
    }
}
```

```go
func longestIdealString(s string, k int) int {
    dp := make([]int, 26)

    for _, c := range s {
        curr := int(c - 'a')
        longest := 1
        for prev := 0; prev < 26; prev++ {
            if abs(curr-prev) <= k {
                if 1+dp[prev] > longest {
                    longest = 1 + dp[prev]
                }
            }
        }
        if longest > dp[curr] {
            dp[curr] = longest
        }
    }

    res := 0
    for _, val := range dp {
        if val > res {
            res = val
        }
    }
    return res
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun longestIdealString(s: String, k: Int): Int {
        val dp = IntArray(26)

        for (c in s) {
            val curr = c - 'a'
            var longest = 1
            for (prev in 0 until 26) {
                if (kotlin.math.abs(curr - prev) <= k) {
                    longest = maxOf(longest, 1 + dp[prev])
                }
            }
            dp[curr] = maxOf(dp[curr], longest)
        }

        return dp.maxOrNull() ?: 0
    }
}
```

```swift
class Solution {
    func longestIdealString(_ s: String, _ k: Int) -> Int {
        var dp = [Int](repeating: 0, count: 26)

        for c in s {
            let curr = Int(c.asciiValue! - Character("a").asciiValue!)
            var longest = 1
            for prev in 0..<26 {
                if abs(curr - prev) <= k {
                    longest = max(longest, 1 + dp[prev])
                }
            }
            dp[curr] = max(dp[curr], longest)
        }

        return dp.max() ?? 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most 26 different characters.
