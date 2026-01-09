## 1. Recursion

### Intuition

At each position in the string, we have two choices: either skip the current character (counting it as extra), or try to match a dictionary word starting at this position. If a word matches, we can jump past it without counting those characters as extra.

This recursive approach explores all possibilities. For each index, we take the minimum of skipping one character versus matching any dictionary word that starts at that index.

### Algorithm

1. Convert the dictionary to a set for O(1) lookups.
2. Define a recursive function `dfs(i)` that returns the minimum extra characters from index `i` to the end:
   - If `i == len(s)`, return `0` (no characters left).
   - Start with `res = 1 + dfs(i + 1)` (skip current character).
   - For each ending index `j` from `i` to `len(s) - 1`:
     - If `s[i:j+1]` is in the dictionary, update `res = min(res, dfs(j + 1))`.
   - Return `res`.
3. Return `dfs(0)`.

::tabs-start

```python
class Solution:
    def minExtraChar(self, s: str, dictionary: List[str]) -> int:
        words = set(dictionary)

        def dfs(i):
            if i == len(s):
                return 0

            res = 1 + dfs(i + 1)
            for j in range(i, len(s)):
                if s[i:j + 1] in words:
                    res = min(res, dfs(j + 1))

            return res

        return dfs(0)
```

```java
public class Solution {
    public int minExtraChar(String s, String[] dictionary) {
        Set<String> words = new HashSet<>();
        for (String word : dictionary) {
            words.add(word);
        }
        return dfs(0, s, words);
    }

    private int dfs(int i, String s, Set<String> words) {
        if (i == s.length()) {
            return 0;
        }

        int res = 1 + dfs(i + 1, s, words);
        for (int j = i; j < s.length(); j++) {
            if (words.contains(s.substring(i, j + 1))) {
                res = Math.min(res, dfs(j + 1, s, words));
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minExtraChar(string s, vector<string>& dictionary) {
        unordered_set<string> words(dictionary.begin(), dictionary.end());
        return dfs(0, s, words);
    }

private:
    int dfs(int i, const string& s, unordered_set<string>& words) {
        if (i == s.size()) {
            return 0;
        }

        int res = 1 + dfs(i + 1, s, words);
        for (int j = i; j < s.size(); j++) {
            if (words.count(s.substr(i, j - i + 1))) {
                res = min(res, dfs(j + 1, s, words));
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string[]} dictionary
     * @return {number}
     */
    minExtraChar(s, dictionary) {
        const words = new Set(dictionary);

        const dfs = (i) => {
            if (i === s.length) {
                return 0;
            }

            let res = 1 + dfs(i + 1);
            for (let j = i; j < s.length; j++) {
                if (words.has(s.slice(i, j + 1))) {
                    res = Math.min(res, dfs(j + 1));
                }
            }

            return res;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public int MinExtraChar(string s, string[] dictionary) {
        HashSet<string> words = new HashSet<string>(dictionary);
        return Dfs(0, s, words);
    }

    private int Dfs(int i, string s, HashSet<string> words) {
        if (i == s.Length) {
            return 0;
        }

        int res = 1 + Dfs(i + 1, s, words);
        for (int j = i; j < s.Length; j++) {
            if (words.Contains(s.Substring(i, j - i + 1))) {
                res = Math.Min(res, Dfs(j + 1, s, words));
            }
        }

        return res;
    }
}
```

```go
func minExtraChar(s string, dictionary []string) int {
    words := make(map[string]bool)
    for _, word := range dictionary {
        words[word] = true
    }

    var dfs func(i int) int
    dfs = func(i int) int {
        if i == len(s) {
            return 0
        }

        res := 1 + dfs(i+1)
        for j := i; j < len(s); j++ {
            if words[s[i:j+1]] {
                res = min(res, dfs(j+1))
            }
        }
        return res
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    fun minExtraChar(s: String, dictionary: Array<String>): Int {
        val words = dictionary.toHashSet()

        fun dfs(i: Int): Int {
            if (i == s.length) {
                return 0
            }

            var res = 1 + dfs(i + 1)
            for (j in i until s.length) {
                if (s.substring(i, j + 1) in words) {
                    res = minOf(res, dfs(j + 1))
                }
            }
            return res
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func minExtraChar(_ s: String, _ dictionary: [String]) -> Int {
        let words = Set(dictionary)
        let chars = Array(s)

        func dfs(_ i: Int) -> Int {
            if i == chars.count {
                return 0
            }

            var res = 1 + dfs(i + 1)
            for j in i..<chars.count {
                if words.contains(String(chars[i...j])) {
                    res = min(res, dfs(j + 1))
                }
            }
            return res
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n + m * k)$
- Space complexity: $O(n + m * k)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in the dictionary, and $k$ is the average length of a word in the dictionary.

---

## 2. Dynamic Programming (Top-Down) Using Hash Set

### Intuition

The recursive solution has overlapping subproblems since we may compute the answer for the same index multiple times. Memoization stores results so each subproblem is solved only once.

Using a hash set for the dictionary allows efficient substring lookups. The memoization table `dp[i]` stores the minimum extra characters from index `i` onward.

### Algorithm

1. Convert the dictionary to a set for O(1) lookups.
2. Initialize `dp` with `dp[len(s)] = 0` as the base case.
3. Define `dfs(i)`:
   - If `i` is already in `dp`, return `dp[i]`.
   - Start with `res = 1 + dfs(i + 1)`.
   - For each `j` from `i` to `len(s) - 1`, if `s[i:j+1]` is in the set, update `res = min(res, dfs(j + 1))`.
   - Store and return `dp[i] = res`.
4. Return `dfs(0)`.

::tabs-start

```python
class Solution:
    def minExtraChar(self, s: str, dictionary: List[str]) -> int:
        words = set(dictionary)
        dp = {len(s): 0}

        def dfs(i):
            if i in dp:
                return dp[i]
            res = 1 + dfs(i + 1)
            for j in range(i, len(s)):
                if s[i:j + 1] in words:
                    res = min(res, dfs(j + 1))
            dp[i] = res
            return res

        return dfs(0)
```

```java
public class Solution {
    public int minExtraChar(String s, String[] dictionary) {
        Set<String> words = new HashSet<>(Arrays.asList(dictionary));
        int n = s.length();
        int[] dp = new int[n + 1];
        Arrays.fill(dp, -1);
        dp[n] = 0;

        return dfs(0, s, words, dp);
    }

    private int dfs(int i, String s, Set<String> words, int[] dp) {
        if (dp[i] != -1) return dp[i];
        int res = 1 + dfs(i + 1, s, words, dp);
        for (int j = i; j < s.length(); j++) {
            if (words.contains(s.substring(i, j + 1))) {
                res = Math.min(res, dfs(j + 1, s, words, dp));
            }
        }
        dp[i] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minExtraChar(string s, vector<string>& dictionary) {
        unordered_set<string> words(dictionary.begin(), dictionary.end());
        int n = s.size();
        vector<int> dp(n + 1, -1);
        dp[n] = 0;
        return dfs(0, s, words, dp);
    }

private:
    int dfs(int i, string& s, unordered_set<string>& words, vector<int>& dp) {
        if (dp[i] != -1) return dp[i];
        int res = 1 + dfs(i + 1, s, words, dp);
        for (int j = i; j < s.size(); j++) {
            if (words.count(s.substr(i, j - i + 1))) {
                res = min(res, dfs(j + 1, s, words, dp));
            }
        }
        dp[i] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string[]} dictionary
     * @return {number}
     */
    minExtraChar(s, dictionary) {
        const words = new Set(dictionary);
        const n = s.length;
        const dp = new Array(n + 1).fill(-1);
        dp[n] = 0;

        const dfs = (i) => {
            if (dp[i] !== -1) return dp[i];
            let res = 1 + dfs(i + 1);
            for (let j = i; j < n; j++) {
                if (words.has(s.slice(i, j + 1))) {
                    res = Math.min(res, dfs(j + 1));
                }
            }
            dp[i] = res;
            return res;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public int MinExtraChar(string s, string[] dictionary) {
        HashSet<string> words = new HashSet<string>(dictionary);
        int n = s.Length;
        int[] dp = new int[n + 1];
        Array.Fill(dp, -1);
        dp[n] = 0;

        return Dfs(0, s, words, dp);
    }

    private int Dfs(int i, string s, HashSet<string> words, int[] dp) {
        if (dp[i] != -1) return dp[i];

        int res = 1 + Dfs(i + 1, s, words, dp);
        for (int j = i; j < s.Length; j++) {
            if (words.Contains(s.Substring(i, j - i + 1))) {
                res = Math.Min(res, Dfs(j + 1, s, words, dp));
            }
        }

        dp[i] = res;
        return res;
    }
}
```

```go
func minExtraChar(s string, dictionary []string) int {
    words := make(map[string]bool)
    for _, word := range dictionary {
        words[word] = true
    }
    n := len(s)
    dp := make([]int, n+1)
    for i := range dp {
        dp[i] = -1
    }
    dp[n] = 0

    var dfs func(i int) int
    dfs = func(i int) int {
        if dp[i] != -1 {
            return dp[i]
        }
        res := 1 + dfs(i+1)
        for j := i; j < n; j++ {
            if words[s[i:j+1]] {
                res = min(res, dfs(j+1))
            }
        }
        dp[i] = res
        return res
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    fun minExtraChar(s: String, dictionary: Array<String>): Int {
        val words = dictionary.toHashSet()
        val n = s.length
        val dp = IntArray(n + 1) { -1 }
        dp[n] = 0

        fun dfs(i: Int): Int {
            if (dp[i] != -1) return dp[i]
            var res = 1 + dfs(i + 1)
            for (j in i until n) {
                if (s.substring(i, j + 1) in words) {
                    res = minOf(res, dfs(j + 1))
                }
            }
            dp[i] = res
            return res
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func minExtraChar(_ s: String, _ dictionary: [String]) -> Int {
        let words = Set(dictionary)
        let chars = Array(s)
        let n = chars.count
        var dp = [Int](repeating: -1, count: n + 1)
        dp[n] = 0

        func dfs(_ i: Int) -> Int {
            if dp[i] != -1 { return dp[i] }
            var res = 1 + dfs(i + 1)
            for j in i..<n {
                if words.contains(String(chars[i...j])) {
                    res = min(res, dfs(j + 1))
                }
            }
            dp[i] = res
            return res
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3 + m * k)$
- Space complexity: $O(n + m * k)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in the dictionary, and $k$ is the average length of a word in the dictionary.

---

## 3. Dynamic Programming (Bottom-Up) Using Hash Set

### Intuition

Instead of recursion with memoization, we can fill the DP table iteratively from right to left. `dp[i]` represents the minimum extra characters when starting from index `i`. Since `dp[i]` depends on `dp[j+1]` for `j >= i`, processing from right to left ensures all dependencies are resolved.

### Algorithm

1. Convert the dictionary to a set.
2. Create an array `dp` of size `n + 1`, initialized to `0`.
3. For `i` from `n - 1` down to `0`:
   - Set `dp[i] = 1 + dp[i + 1]` (skip current character).
   - For each `j` from `i` to `n - 1`, if `s[i:j+1]` is in the set, update `dp[i] = min(dp[i], dp[j + 1])`.
4. Return `dp[0]`.

::tabs-start

```python
class Solution:
    def minExtraChar(self, s: str, dictionary: List[str]) -> int:
        words = set(dictionary)
        n = len(s)
        dp = [0] * (n + 1)

        for i in range(n - 1, -1, -1):
            dp[i] = 1 + dp[i + 1]
            for j in range(i, n):
                if s[i:j + 1] in words:
                    dp[i] = min(dp[i], dp[j + 1])
        return dp[0]
```

```java
public class Solution {
    public int minExtraChar(String s, String[] dictionary) {
        Set<String> words = new HashSet<>(Arrays.asList(dictionary));
        int n = s.length();
        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = 1 + dp[i + 1];
            for (int j = i; j < n; j++) {
                if (words.contains(s.substring(i, j + 1))) {
                    dp[i] = Math.min(dp[i], dp[j + 1]);
                }
            }
        }
        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int minExtraChar(string s, vector<string>& dictionary) {
        unordered_set<string> words(dictionary.begin(), dictionary.end());
        int n = s.size();
        vector<int> dp(n + 1, 0);

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = 1 + dp[i + 1];
            for (int j = i; j < n; j++) {
                if (words.count(s.substr(i, j - i + 1))) {
                    dp[i] = min(dp[i], dp[j + 1]);
                }
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
     * @param {string[]} dictionary
     * @return {number}
     */
    minExtraChar(s, dictionary) {
        const words = new Set(dictionary);
        const n = s.length;
        const dp = new Array(n + 1).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            dp[i] = 1 + dp[i + 1];
            for (let j = i; j < n; j++) {
                if (words.has(s.slice(i, j + 1))) {
                    dp[i] = Math.min(dp[i], dp[j + 1]);
                }
            }
        }
        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int MinExtraChar(string s, string[] dictionary) {
        HashSet<string> words = new HashSet<string>(dictionary);
        int n = s.Length;
        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = 1 + dp[i + 1];
            for (int j = i; j < n; j++) {
                if (words.Contains(s.Substring(i, j - i + 1))) {
                    dp[i] = Math.Min(dp[i], dp[j + 1]);
                }
            }
        }

        return dp[0];
    }
}
```

```go
func minExtraChar(s string, dictionary []string) int {
    words := make(map[string]bool)
    for _, word := range dictionary {
        words[word] = true
    }
    n := len(s)
    dp := make([]int, n+1)

    for i := n - 1; i >= 0; i-- {
        dp[i] = 1 + dp[i+1]
        for j := i; j < n; j++ {
            if words[s[i:j+1]] {
                dp[i] = min(dp[i], dp[j+1])
            }
        }
    }
    return dp[0]
}
```

```kotlin
class Solution {
    fun minExtraChar(s: String, dictionary: Array<String>): Int {
        val words = dictionary.toHashSet()
        val n = s.length
        val dp = IntArray(n + 1)

        for (i in n - 1 downTo 0) {
            dp[i] = 1 + dp[i + 1]
            for (j in i until n) {
                if (s.substring(i, j + 1) in words) {
                    dp[i] = minOf(dp[i], dp[j + 1])
                }
            }
        }
        return dp[0]
    }
}
```

```swift
class Solution {
    func minExtraChar(_ s: String, _ dictionary: [String]) -> Int {
        let words = Set(dictionary)
        let chars = Array(s)
        let n = chars.count
        var dp = [Int](repeating: 0, count: n + 1)

        for i in stride(from: n - 1, through: 0, by: -1) {
            dp[i] = 1 + dp[i + 1]
            for j in i..<n {
                if words.contains(String(chars[i...j])) {
                    dp[i] = min(dp[i], dp[j + 1])
                }
            }
        }
        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3 + m * k)$
- Space complexity: $O(n + m * k)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in the dictionary, and $k$ is the average length of a word in the dictionary.

---

## 4. Dynamic Programming (Top-Down)

### Intuition

Instead of checking all substrings against a hash set, we can iterate through dictionary words directly. For each position, we check if any dictionary word matches starting at that position. This can be faster when the dictionary is small relative to the string length.

### Algorithm

1. Initialize `dp` with `dp[len(s)] = 0`.
2. Define `dfs(i)`:
   - If `i` is in `dp`, return `dp[i]`.
   - Start with `res = 1 + dfs(i + 1)`.
   - For each `word` in the dictionary:
     - If `i + len(word) <= len(s)` and `s[i:i+len(word)] == word`, update `res = min(res, dfs(i + len(word)))`.
   - Store and return `dp[i] = res`.
3. Return `dfs(0)`.

::tabs-start

```python
class Solution:
    def minExtraChar(self, s: str, dictionary: List[str]) -> int:
        dp = {len(s) : 0}

        def dfs(i):
            if i in dp:
                return dp[i]

            res = 1 + dfs(i + 1)
            for word in dictionary:
                if i + len(word) > len(s):
                    continue

                flag = True
                for j in range(len(word)):
                    if s[i + j] != word[j]:
                        flag = False
                        break
                if flag:
                    res = min(res, dfs(i + len(word)))

            dp[i] = res
            return res

        return dfs(0)
```

```java
public class Solution {
    public int minExtraChar(String s, String[] dictionary) {
        Map<Integer, Integer> dp = new HashMap<>();
        dp.put(s.length(), 0);
        return dfs(0, s, dictionary, dp);
    }

    private int dfs(int i, String s, String[] dictionary, Map<Integer, Integer> dp) {
        if (dp.containsKey(i)) {
            return dp.get(i);
        }

        int res = 1 + dfs(i + 1, s, dictionary, dp);
        for (String word : dictionary) {
            if (i + word.length() > s.length()) continue;

            boolean flag = true;
            for (int j = 0; j < word.length(); j++) {
                if (s.charAt(i + j) != word.charAt(j)) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                res = Math.min(res, dfs(i + word.length(), s, dictionary, dp));
            }
        }
        dp.put(i, res);
        return res;
    }
}
```

```cpp
class Solution {
    unordered_map<int, int> dp;

public:
    int minExtraChar(string s, vector<string>& dictionary) {
        dp[s.size()] = 0;
        return dfs(0, s, dictionary);
    }

private:
    int dfs(int i, string& s, vector<string>& dictionary) {
        if (dp.count(i)) {
            return dp[i];
        }

        int res = 1 + dfs(i + 1, s, dictionary);
        for (const string& word : dictionary) {
            if (i + word.size() > s.size()) continue;

            bool flag = true;
            for (int j = 0; j < word.size(); j++) {
                if (s[i + j] != word[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                res = min(res, dfs(i + word.size(), s, dictionary));
            }
        }
        return dp[i] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string[]} dictionary
     * @return {number}
     */
    minExtraChar(s, dictionary) {
        const dp = new Map();
        dp.set(s.length, 0);

        const dfs = (i) => {
            if (dp.has(i)) return dp.get(i);

            let res = 1 + dfs(i + 1);
            for (const word of dictionary) {
                if (i + word.length > s.length) continue;

                let flag = true;
                for (let j = 0; j < word.length; j++) {
                    if (s[i + j] !== word[j]) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    res = Math.min(res, dfs(i + word.length));
                }
            }
            dp.set(i, res);
            return res;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public int MinExtraChar(string s, string[] dictionary) {
        Dictionary<int, int> dp = new Dictionary<int, int>();
        dp[s.Length] = 0;
        return Dfs(0, s, dictionary, dp);
    }

    private int Dfs(int i, string s, string[] dictionary, Dictionary<int, int> dp) {
        if (dp.ContainsKey(i)) {
            return dp[i];
        }

        int res = 1 + Dfs(i + 1, s, dictionary, dp);

        foreach (string word in dictionary) {
            if (i + word.Length > s.Length) continue;

            bool flag = true;
            for (int j = 0; j < word.Length; j++) {
                if (s[i + j] != word[j]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                res = Math.Min(res, Dfs(i + word.Length, s, dictionary, dp));
            }
        }

        dp[i] = res;
        return res;
    }
}
```

```go
func minExtraChar(s string, dictionary []string) int {
    dp := make(map[int]int)
    dp[len(s)] = 0

    var dfs func(i int) int
    dfs = func(i int) int {
        if val, ok := dp[i]; ok {
            return val
        }

        res := 1 + dfs(i+1)
        for _, word := range dictionary {
            if i+len(word) > len(s) {
                continue
            }

            flag := true
            for j := 0; j < len(word); j++ {
                if s[i+j] != word[j] {
                    flag = false
                    break
                }
            }
            if flag {
                res = min(res, dfs(i+len(word)))
            }
        }
        dp[i] = res
        return res
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    fun minExtraChar(s: String, dictionary: Array<String>): Int {
        val dp = mutableMapOf<Int, Int>()
        dp[s.length] = 0

        fun dfs(i: Int): Int {
            dp[i]?.let { return it }

            var res = 1 + dfs(i + 1)
            for (word in dictionary) {
                if (i + word.length > s.length) continue

                var flag = true
                for (j in word.indices) {
                    if (s[i + j] != word[j]) {
                        flag = false
                        break
                    }
                }
                if (flag) {
                    res = minOf(res, dfs(i + word.length))
                }
            }
            dp[i] = res
            return res
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func minExtraChar(_ s: String, _ dictionary: [String]) -> Int {
        var dp = [Int: Int]()
        let chars = Array(s)
        dp[chars.count] = 0

        func dfs(_ i: Int) -> Int {
            if let val = dp[i] { return val }

            var res = 1 + dfs(i + 1)
            for word in dictionary {
                let wordChars = Array(word)
                if i + wordChars.count > chars.count { continue }

                var flag = true
                for j in 0..<wordChars.count {
                    if chars[i + j] != wordChars[j] {
                        flag = false
                        break
                    }
                }
                if flag {
                    res = min(res, dfs(i + wordChars.count))
                }
            }
            dp[i] = res
            return res
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m * k)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in the dictionary, and $k$ is the average length of a word in the dictionary.

---

## 5. Dynamic Programming (Bottom-Up)

### Intuition

This is the iterative version of the previous approach, iterating through dictionary words at each position rather than checking all possible substrings. It avoids recursion overhead while maintaining the same logic.

### Algorithm

1. Create an array `dp` of size `n + 1`, initialized to `0`.
2. For `i` from `n - 1` down to `0`:
   - Set `dp[i] = 1 + dp[i + 1]`.
   - For each `word` in the dictionary:
     - If `i + len(word) <= n` and `s[i:i+len(word)] == word`, update `dp[i] = min(dp[i], dp[i + len(word)])`.
3. Return `dp[0]`.

::tabs-start

```python
class Solution:
    def minExtraChar(self, s: str, dictionary: List[str]) -> int:
        n = len(s)
        dp = [0] * (n + 1)

        for i in range(n - 1, -1, -1):
            dp[i] = 1 + dp[i + 1]
            for word in dictionary:
                if i + len(word) <= n and s[i:i + len(word)] == word:
                    dp[i] = min(dp[i], dp[i + len(word)])

        return dp[0]
```

```java
public class Solution {
    public int minExtraChar(String s, String[] dictionary) {
        int n = s.length();
        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = 1 + dp[i + 1];
            for (String word : dictionary) {
                if (i + word.length() <= n && s.startsWith(word, i)) {
                    dp[i] = Math.min(dp[i], dp[i + word.length()]);
                }
            }
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int minExtraChar(string s, vector<string>& dictionary) {
        int n = s.size();
        vector<int> dp(n + 1, 0);

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = 1 + dp[i + 1];
            for (const string& word : dictionary) {
                if (i + word.size() <= n && s.substr(i, word.size()) == word) {
                    dp[i] = min(dp[i], dp[i + word.size()]);
                }
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
     * @param {string[]} dictionary
     * @return {number}
     */
    minExtraChar(s, dictionary) {
        const n = s.length;
        const dp = new Array(n + 1).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            dp[i] = 1 + dp[i + 1];
            for (const word of dictionary) {
                if (
                    i + word.length <= n &&
                    s.slice(i, i + word.length) === word
                ) {
                    dp[i] = Math.min(dp[i], dp[i + word.length]);
                }
            }
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public int MinExtraChar(string s, string[] dictionary) {
        int n = s.Length;
        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = 1 + dp[i + 1];
            foreach (string word in dictionary) {
                if (i + word.Length <= n && s.Substring(i, word.Length) == word) {
                    dp[i] = Math.Min(dp[i], dp[i + word.Length]);
                }
            }
        }

        return dp[0];
    }
}
```

```go
func minExtraChar(s string, dictionary []string) int {
    n := len(s)
    dp := make([]int, n+1)

    for i := n - 1; i >= 0; i-- {
        dp[i] = 1 + dp[i+1]
        for _, word := range dictionary {
            if i+len(word) <= n && s[i:i+len(word)] == word {
                dp[i] = min(dp[i], dp[i+len(word)])
            }
        }
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun minExtraChar(s: String, dictionary: Array<String>): Int {
        val n = s.length
        val dp = IntArray(n + 1)

        for (i in n - 1 downTo 0) {
            dp[i] = 1 + dp[i + 1]
            for (word in dictionary) {
                if (i + word.length <= n && s.substring(i, i + word.length) == word) {
                    dp[i] = minOf(dp[i], dp[i + word.length])
                }
            }
        }

        return dp[0]
    }
}
```

```swift
class Solution {
    func minExtraChar(_ s: String, _ dictionary: [String]) -> Int {
        let chars = Array(s)
        let n = chars.count
        var dp = [Int](repeating: 0, count: n + 1)

        for i in stride(from: n - 1, through: 0, by: -1) {
            dp[i] = 1 + dp[i + 1]
            for word in dictionary {
                let wordChars = Array(word)
                if i + wordChars.count <= n && String(chars[i..<(i + wordChars.count)]) == word {
                    dp[i] = min(dp[i], dp[i + wordChars.count])
                }
            }
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m * k)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in the dictionary, and $k$ is the average length of a word in the dictionary.

---

## 6. Dynamic Programming (Top-Down) Using Trie

### Intuition

A Trie (prefix tree) allows efficient prefix matching. Instead of checking each dictionary word independently, we traverse the Trie character by character. If we hit a dead end (no child for the current character), we stop early. This is faster than checking each word when there are many dictionary words sharing common prefixes.

### Algorithm

1. Build a Trie from all dictionary words.
2. Initialize `dp` with `dp[len(s)] = 0`.
3. Define `dfs(i)`:
   - If `i` is in `dp`, return `dp[i]`.
   - Start with `res = 1 + dfs(i + 1)`.
   - Traverse the Trie starting from the `root`:
     - For `j` from `i` to `len(s) - 1`:
       - If `s[j]` is not a child of the current node, break.
       - Move to the child node.
       - If this node marks the end of a word, update `res = min(res, dfs(j + 1))`.
   - Store and return `dp[i] = res`.
4. Return `dfs(0)`.

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.isWord = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word):
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.isWord = True

class Solution:
    def minExtraChar(self, s: str, dictionary: List[str]) -> int:
        trie = Trie()
        for w in dictionary:
            trie.addWord(w)

        dp = {len(s): 0}

        def dfs(i):
            if i in dp:
                return dp[i]
            res = 1 + dfs(i + 1)
            curr = trie.root
            for j in range(i, len(s)):
                if s[j] not in curr.children:
                    break
                curr = curr.children[s[j]]
                if curr.isWord:
                    res = min(res, dfs(j + 1))

            dp[i] = res
            return res

        return dfs(0)
```

```java
class TrieNode {
    TrieNode[] children;
    boolean isWord;

    TrieNode() {
        children = new TrieNode[26];
        isWord = false;
    }
}

class Trie {
    TrieNode root;

    Trie() {
        root = new TrieNode();
    }

    void addWord(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            if (curr.children[c - 'a'] == null) {
                curr.children[c - 'a'] = new TrieNode();
            }
            curr = curr.children[c - 'a'];
        }
        curr.isWord = true;
    }
}

public class Solution {
    public int minExtraChar(String s, String[] dictionary) {
        Trie trie = new Trie();
        for (String word : dictionary) {
            trie.addWord(word);
        }

        int[] dp = new int[s.length() + 1];
        Arrays.fill(dp, -1);

        return dfs(0, s, trie, dp);
    }

    private int dfs(int i, String s, Trie trie, int[] dp) {
        if (i == s.length()) return 0;
        if (dp[i] != -1) return dp[i];

        int res = 1 + dfs(i + 1, s, trie, dp);
        TrieNode curr = trie.root;

        for (int j = i; j < s.length(); j++) {
            if (curr.children[s.charAt(j) - 'a'] == null) break;
            curr = curr.children[s.charAt(j) - 'a'];
            if (curr.isWord) {
                res = Math.min(res, dfs(j + 1, s, trie, dp));
            }
        }

        dp[i] = res;
        return res;
    }
}
```

```cpp
class TrieNode {
public:
    TrieNode* children[26];
    bool isWord;

    TrieNode() {
        for (int i = 0; i < 26; ++i) children[i] = nullptr;
        isWord = false;
    }
};

class Trie {
public:
    TrieNode* root;

    Trie() {
        root = new TrieNode();
    }

    void addWord(const string& word) {
        TrieNode* curr = root;
        for (char c : word) {
            if (!curr->children[c - 'a']) {
                curr->children[c - 'a'] = new TrieNode();
            }
            curr = curr->children[c - 'a'];
        }
        curr->isWord = true;
    }
};

class Solution {
public:
    int minExtraChar(string s, vector<string>& dictionary) {
        Trie trie;
        for (const string& word : dictionary) {
            trie.addWord(word);
        }

        vector<int> dp(s.size() + 1, -1);
        return dfs(0, s, trie, dp);
    }

private:
    int dfs(int i, const string& s, Trie& trie, vector<int>& dp) {
        if (i == s.size()) return 0;
        if (dp[i] != -1) return dp[i];

        int res = 1 + dfs(i + 1, s, trie, dp);
        TrieNode* curr = trie.root;

        for (int j = i; j < s.size(); ++j) {
            if (!curr->children[s[j] - 'a']) break;
            curr = curr->children[s[j] - 'a'];
            if (curr->isWord) {
                res = min(res, dfs(j + 1, s, trie, dp));
            }
        }

        dp[i] = res;
        return res;
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        let curr = this.root;
        for (const c of word) {
            if (!curr.children[c]) {
                curr.children[c] = new TrieNode();
            }
            curr = curr.children[c];
        }
        curr.isWord = true;
    }
}

class Solution {
    /**
     * @param {string} s
     * @param {string[]} dictionary
     * @return {number}
     */
    minExtraChar(s, dictionary) {
        const trie = new Trie();
        for (const word of dictionary) {
            trie.addWord(word);
        }

        const dp = Array(s.length + 1).fill(-1);

        const dfs = (i) => {
            if (i === s.length) return 0;
            if (dp[i] !== -1) return dp[i];

            let res = 1 + dfs(i + 1);
            let curr = trie.root;

            for (let j = i; j < s.length; j++) {
                if (!curr.children[s[j]]) break;
                curr = curr.children[s[j]];
                if (curr.isWord) {
                    res = Math.min(res, dfs(j + 1));
                }
            }

            dp[i] = res;
            return res;
        };

        return dfs(0);
    }
}
```

```csharp
public class TrieNode {
    public TrieNode[] Children = new TrieNode[26];
    public bool IsWord = false;
}

public class Trie {
    public TrieNode Root = new TrieNode();

    public void AddWord(string word) {
        TrieNode curr = Root;
        foreach (char c in word) {
            int idx = c - 'a';
            if (curr.Children[idx] == null) {
                curr.Children[idx] = new TrieNode();
            }
            curr = curr.Children[idx];
        }
        curr.IsWord = true;
    }
}

public class Solution {
    public int MinExtraChar(string s, string[] dictionary) {
        Trie trie = new Trie();
        foreach (string word in dictionary) {
            trie.AddWord(word);
        }

        int[] dp = new int[s.Length + 1];
        Array.Fill(dp, -1);

        return Dfs(0, s, trie, dp);
    }

    private int Dfs(int i, string s, Trie trie, int[] dp) {
        if (i == s.Length) return 0;
        if (dp[i] != -1) return dp[i];

        int res = 1 + Dfs(i + 1, s, trie, dp);
        TrieNode curr = trie.Root;

        for (int j = i; j < s.Length; j++) {
            int idx = s[j] - 'a';
            if (curr.Children[idx] == null) break;
            curr = curr.Children[idx];
            if (curr.IsWord) {
                res = Math.Min(res, Dfs(j + 1, s, trie, dp));
            }
        }

        dp[i] = res;
        return res;
    }
}
```

```go
type TrieNode struct {
    children [26]*TrieNode
    isWord   bool
}

type Trie struct {
    root *TrieNode
}

func newTrie() *Trie {
    return &Trie{root: &TrieNode{}}
}

func (t *Trie) addWord(word string) {
    curr := t.root
    for _, c := range word {
        idx := c - 'a'
        if curr.children[idx] == nil {
            curr.children[idx] = &TrieNode{}
        }
        curr = curr.children[idx]
    }
    curr.isWord = true
}

func minExtraChar(s string, dictionary []string) int {
    trie := newTrie()
    for _, word := range dictionary {
        trie.addWord(word)
    }

    dp := make([]int, len(s)+1)
    for i := range dp {
        dp[i] = -1
    }

    var dfs func(i int) int
    dfs = func(i int) int {
        if i == len(s) {
            return 0
        }
        if dp[i] != -1 {
            return dp[i]
        }

        res := 1 + dfs(i+1)
        curr := trie.root

        for j := i; j < len(s); j++ {
            idx := s[j] - 'a'
            if curr.children[idx] == nil {
                break
            }
            curr = curr.children[idx]
            if curr.isWord {
                res = min(res, dfs(j+1))
            }
        }

        dp[i] = res
        return res
    }

    return dfs(0)
}
```

```kotlin
class TrieNode {
    val children = arrayOfNulls<TrieNode>(26)
    var isWord = false
}

class Trie {
    val root = TrieNode()

    fun addWord(word: String) {
        var curr = root
        for (c in word) {
            val idx = c - 'a'
            if (curr.children[idx] == null) {
                curr.children[idx] = TrieNode()
            }
            curr = curr.children[idx]!!
        }
        curr.isWord = true
    }
}

class Solution {
    fun minExtraChar(s: String, dictionary: Array<String>): Int {
        val trie = Trie()
        for (word in dictionary) {
            trie.addWord(word)
        }

        val dp = IntArray(s.length + 1) { -1 }

        fun dfs(i: Int): Int {
            if (i == s.length) return 0
            if (dp[i] != -1) return dp[i]

            var res = 1 + dfs(i + 1)
            var curr = trie.root

            for (j in i until s.length) {
                val idx = s[j] - 'a'
                if (curr.children[idx] == null) break
                curr = curr.children[idx]!!
                if (curr.isWord) {
                    res = minOf(res, dfs(j + 1))
                }
            }

            dp[i] = res
            return res
        }

        return dfs(0)
    }
}
```

```swift
class TrieNode {
    var children = [Character: TrieNode]()
    var isWord = false
}

class Trie {
    let root = TrieNode()

    func addWord(_ word: String) {
        var curr = root
        for c in word {
            if curr.children[c] == nil {
                curr.children[c] = TrieNode()
            }
            curr = curr.children[c]!
        }
        curr.isWord = true
    }
}

class Solution {
    func minExtraChar(_ s: String, _ dictionary: [String]) -> Int {
        let trie = Trie()
        for word in dictionary {
            trie.addWord(word)
        }

        let chars = Array(s)
        var dp = [Int](repeating: -1, count: chars.count + 1)

        func dfs(_ i: Int) -> Int {
            if i == chars.count { return 0 }
            if dp[i] != -1 { return dp[i] }

            var res = 1 + dfs(i + 1)
            var curr = trie.root

            for j in i..<chars.count {
                guard let next = curr.children[chars[j]] else { break }
                curr = next
                if curr.isWord {
                    res = min(res, dfs(j + 1))
                }
            }

            dp[i] = res
            return res
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 + m * k)$
- Space complexity: $O(n + m * k)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in the dictionary, and $k$ is the average length of a word in the dictionary.

---

## 7. Dynamic Programming (Bottom-Up) Using Trie

### Intuition

This combines the bottom-up DP approach with Trie-based matching. We iterate from right to left, and at each position, we traverse the Trie to find all dictionary words that start at that position. The Trie allows early termination when no dictionary word can match the current prefix.

### Algorithm

1. Build a Trie from all dictionary words.
2. Create an array `dp` of size `n + 1`, initialized to `0`.
3. For `i` from `n - 1` down to `0`:
   - Set `dp[i] = 1 + dp[i + 1]`.
   - Start at the Trie `root` and traverse:
     - For `j` from `i` to `n - 1`:
       - If `s[j]` is not a child, break.
       - Move to the child node.
       - If this node marks a word end, update `dp[i] = min(dp[i], dp[j + 1])`.
4. Return `dp[0]`.

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.isWord = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word):
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.isWord = True

class Solution:
    def minExtraChar(self, s: str, dictionary: List[str]) -> int:
        trie = Trie()
        for w in dictionary:
            trie.addWord(w)

        n = len(s)
        dp = [0] * (n + 1)

        for i in range(n - 1, -1, -1):
            dp[i] = 1 + dp[i + 1]
            curr = trie.root
            for j in range(i, n):
                if s[j] not in curr.children:
                    break
                curr = curr.children[s[j]]
                if curr.isWord:
                    dp[i] = min(dp[i], dp[j + 1])

        return dp[0]
```

```java
class TrieNode {
    TrieNode[] children;
    boolean isWord;

    TrieNode() {
        children = new TrieNode[26];
        isWord = false;
    }
}

class Trie {
    TrieNode root;

    Trie() {
        root = new TrieNode();
    }

    void addWord(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            if (curr.children[c - 'a'] == null) {
                curr.children[c - 'a'] = new TrieNode();
            }
            curr = curr.children[c - 'a'];
        }
        curr.isWord = true;
    }
}

public class Solution {
    public int minExtraChar(String s, String[] dictionary) {
        Trie trie = new Trie();
        for (String word : dictionary) {
            trie.addWord(word);
        }

        int n = s.length();
        int[] dp = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            dp[i] = 1 + dp[i + 1];
            TrieNode curr = trie.root;

            for (int j = i; j < n; j++) {
                if (curr.children[s.charAt(j) - 'a'] == null) break;
                curr = curr.children[s.charAt(j) - 'a'];
                if (curr.isWord) {
                    dp[i] = Math.min(dp[i], dp[j + 1]);
                }
            }
        }

        return dp[0];
    }
}
```

```cpp
class TrieNode {
public:
    TrieNode* children[26];
    bool isWord;

    TrieNode() {
        for (int i = 0; i < 26; ++i) children[i] = nullptr;
        isWord = false;
    }
};

class Trie {
public:
    TrieNode* root;

    Trie() {
        root = new TrieNode();
    }

    void addWord(const string& word) {
        TrieNode* curr = root;
        for (char c : word) {
            if (!curr->children[c - 'a']) {
                curr->children[c - 'a'] = new TrieNode();
            }
            curr = curr->children[c - 'a'];
        }
        curr->isWord = true;
    }
};

class Solution {
public:
    int minExtraChar(string s, vector<string>& dictionary) {
        Trie trie;
        for (const string& word : dictionary) {
            trie.addWord(word);
        }

        int n = s.size();
        vector<int> dp(n + 1);
        for (int i = n - 1; i >= 0; --i) {
            dp[i] = 1 + dp[i + 1];
            TrieNode* curr = trie.root;

            for (int j = i; j < n; ++j) {
                if (!curr->children[s[j] - 'a']) break;
                curr = curr->children[s[j] - 'a'];
                if (curr->isWord) {
                    dp[i] = min(dp[i], dp[j + 1]);
                }
            }
        }

        return dp[0];
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        let curr = this.root;
        for (const c of word) {
            if (!curr.children[c]) {
                curr.children[c] = new TrieNode();
            }
            curr = curr.children[c];
        }
        curr.isWord = true;
    }
}

class Solution {
    /**
     * @param {string} s
     * @param {string[]} dictionary
     * @return {number}
     */
    minExtraChar(s, dictionary) {
        const trie = new Trie();
        for (const word of dictionary) {
            trie.addWord(word);
        }

        const n = s.length;
        const dp = new Int32Array(n + 1);
        for (let i = n - 1; i >= 0; i--) {
            dp[i] = 1 + dp[i + 1];
            let curr = trie.root;

            for (let j = i; j < n; j++) {
                if (!curr.children[s[j]]) break;
                curr = curr.children[s[j]];
                if (curr.isWord) {
                    dp[i] = Math.min(dp[i], dp[j + 1]);
                }
            }
        }

        return dp[0];
    }
}
```

```csharp
public class TrieNode {
    public TrieNode[] Children = new TrieNode[26];
    public bool IsWord = false;
}

public class Trie {
    public TrieNode Root = new TrieNode();

    public void AddWord(string word) {
        TrieNode curr = Root;
        foreach (char c in word) {
            int idx = c - 'a';
            if (curr.Children[idx] == null) {
                curr.Children[idx] = new TrieNode();
            }
            curr = curr.Children[idx];
        }
        curr.IsWord = true;
    }
}

public class Solution {
    public int MinExtraChar(string s, string[] dictionary) {
        Trie trie = new Trie();
        foreach (string word in dictionary) {
            trie.AddWord(word);
        }

        int n = s.Length;
        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = 1 + dp[i + 1];
            TrieNode curr = trie.Root;

            for (int j = i; j < n; j++) {
                int idx = s[j] - 'a';
                if (curr.Children[idx] == null) break;
                curr = curr.Children[idx];
                if (curr.IsWord) {
                    dp[i] = Math.Min(dp[i], dp[j + 1]);
                }
            }
        }

        return dp[0];
    }
}
```

```go
type TrieNode struct {
    children [26]*TrieNode
    isWord   bool
}

type Trie struct {
    root *TrieNode
}

func newTrie() *Trie {
    return &Trie{root: &TrieNode{}}
}

func (t *Trie) addWord(word string) {
    curr := t.root
    for _, c := range word {
        idx := c - 'a'
        if curr.children[idx] == nil {
            curr.children[idx] = &TrieNode{}
        }
        curr = curr.children[idx]
    }
    curr.isWord = true
}

func minExtraChar(s string, dictionary []string) int {
    trie := newTrie()
    for _, word := range dictionary {
        trie.addWord(word)
    }

    n := len(s)
    dp := make([]int, n+1)

    for i := n - 1; i >= 0; i-- {
        dp[i] = 1 + dp[i+1]
        curr := trie.root

        for j := i; j < n; j++ {
            idx := s[j] - 'a'
            if curr.children[idx] == nil {
                break
            }
            curr = curr.children[idx]
            if curr.isWord {
                dp[i] = min(dp[i], dp[j+1])
            }
        }
    }

    return dp[0]
}
```

```kotlin
class TrieNode {
    val children = arrayOfNulls<TrieNode>(26)
    var isWord = false
}

class Trie {
    val root = TrieNode()

    fun addWord(word: String) {
        var curr = root
        for (c in word) {
            val idx = c - 'a'
            if (curr.children[idx] == null) {
                curr.children[idx] = TrieNode()
            }
            curr = curr.children[idx]!!
        }
        curr.isWord = true
    }
}

class Solution {
    fun minExtraChar(s: String, dictionary: Array<String>): Int {
        val trie = Trie()
        for (word in dictionary) {
            trie.addWord(word)
        }

        val n = s.length
        val dp = IntArray(n + 1)

        for (i in n - 1 downTo 0) {
            dp[i] = 1 + dp[i + 1]
            var curr = trie.root

            for (j in i until n) {
                val idx = s[j] - 'a'
                if (curr.children[idx] == null) break
                curr = curr.children[idx]!!
                if (curr.isWord) {
                    dp[i] = minOf(dp[i], dp[j + 1])
                }
            }
        }

        return dp[0]
    }
}
```

```swift
class TrieNode {
    var children = [Character: TrieNode]()
    var isWord = false
}

class Trie {
    let root = TrieNode()

    func addWord(_ word: String) {
        var curr = root
        for c in word {
            if curr.children[c] == nil {
                curr.children[c] = TrieNode()
            }
            curr = curr.children[c]!
        }
        curr.isWord = true
    }
}

class Solution {
    func minExtraChar(_ s: String, _ dictionary: [String]) -> Int {
        let trie = Trie()
        for word in dictionary {
            trie.addWord(word)
        }

        let chars = Array(s)
        let n = chars.count
        var dp = [Int](repeating: 0, count: n + 1)

        for i in stride(from: n - 1, through: 0, by: -1) {
            dp[i] = 1 + dp[i + 1]
            var curr = trie.root

            for j in i..<n {
                guard let next = curr.children[chars[j]] else { break }
                curr = next
                if curr.isWord {
                    dp[i] = min(dp[i], dp[j + 1])
                }
            }
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 + m * k)$
- Space complexity: $O(n + m * k)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in the dictionary, and $k$ is the average length of a word in the dictionary.
