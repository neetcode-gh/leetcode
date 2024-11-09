## 1. Recursion

::tabs-start

```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:

        def dfs(i):
            if i == len(s):
                return True
            
            for w in wordDict:
                if ((i + len(w)) <= len(s) and 
                     s[i : i + len(w)] == w
                ):
                    if dfs(i + len(w)):
                        return True
            return False
        
        return dfs(0)
```

```java
public class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        return dfs(s, wordDict, 0);
    }
    
    private boolean dfs(String s, List<String> wordDict, int i) {
        if (i == s.length()) {
            return true;
        }

        for (String w : wordDict) {
            if (i + w.length() <= s.length() && 
                s.substring(i, i + w.length()).equals(w)) {
                if (dfs(s, wordDict, i + w.length())) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        return dfs(s, wordDict, 0);
    }

private:
    bool dfs(const string& s, const vector<string>& wordDict, int i) {
        if (i == s.length()) {
            return true;
        }

        for (const string& w : wordDict) {
            if (i + w.length() <= s.length() && 
                s.substr(i, w.length()) == w) {
                if (dfs(s, wordDict, i + w.length())) {
                    return true;
                }
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @return {boolean}
     */
    wordBreak(s, wordDict) {
        return this.dfs(s, wordDict, 0);
    }

    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @param {number} i
     * @return {boolean}
     */
    dfs(s, wordDict, i) {
        if (i === s.length) {
            return true;
        }

        for (let w of wordDict) {
            if (i + w.length <= s.length && 
                s.substring(i, i + w.length) === w) {
                if (this.dfs(s, wordDict, i + w.length)) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool WordBreak(string s, List<string> wordDict) {
        return Dfs(s, wordDict, 0);
    }

    private bool Dfs(string s, List<string> wordDict, int i) {
        if (i == s.Length) {
            return true;
        }

        foreach (string w in wordDict) {
            if (i + w.Length <= s.Length && 
                s.Substring(i, w.Length) == w) {
                if (Dfs(s, wordDict, i + w.Length)) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```go
func wordBreak(s string, wordDict []string) bool {
    return dfs(s, wordDict, 0)
}

func dfs(s string, wordDict []string, i int) bool {
    if i == len(s) {
        return true
    }

    for _, w := range wordDict {
        if len(s[i:]) >= len(w) && s[i:i+len(w)] == w {
            if dfs(s, wordDict, i+len(w)) {
                return true
            }
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun wordBreak(s: String, wordDict: List<String>): Boolean {
        return dfs(s, wordDict, 0)
    }

    private fun dfs(s: String, wordDict: List<String>, i: Int): Boolean {
        if (i == s.length) {
            return true
        }

        for (w in wordDict) {
            if (s.length - i >= w.length && s.substring(i, i + w.length) == w) {
                if (dfs(s, wordDict, i + w.length)) {
                    return true
                }
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(t * m ^ n)$
* Space complexity: $O(n)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in $wordDict$ and $t$ is the maximum length of any word in $wordDict$.

---

## 2. Recursion (Hash Set)

::tabs-start

```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        wordSet = set(wordDict)

        def dfs(i):
            if i == len(s):
                return True
            
            for j in range(i, len(s)):
                if s[i : j + 1] in wordSet:
                    if dfs(j + 1):
                        return True
            return False
        
        return dfs(0)
```

```java
public class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        HashSet<String> wordSet = new HashSet<>(wordDict);

        return dfs(s, wordSet, 0);
    }

    private boolean dfs(String s, HashSet<String> wordSet, int i) {
        if (i == s.length()) {
            return true;
        }

        for (int j = i; j < s.length(); j++) {
            if (wordSet.contains(s.substring(i, j + 1))) {
                if (dfs(s, wordSet, j + 1)) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> wordSet(wordDict.begin(), wordDict.end());
        return dfs(s, wordSet, 0);
    }

    bool dfs(const string& s, const unordered_set<string>& wordSet, int i) {
        if (i == s.size()) {
            return true;
        }

        for (int j = i; j < s.size(); j++) {
            if (wordSet.find(s.substr(i, j - i + 1)) != wordSet.end()) {
                if (dfs(s, wordSet, j + 1)) {
                    return true;
                }
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @return {boolean}
     */
    wordBreak(s, wordDict) {
        const wordSet = new Set(wordDict);
        const dfs = (i) => {
            if (i === s.length) {
                return true;
            }

            for (let j = i; j < s.length; j++) {
                if (wordSet.has(s.substring(i, j + 1))) {
                    if (dfs(j + 1)) {
                        return true;
                    }
                }
            }
            return false;
        }

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public bool WordBreak(string s, List<string> wordDict) {
        HashSet<string> wordSet = new HashSet<string>(wordDict);
        return Dfs(s, wordSet, 0);
    }

    private bool Dfs(string s, HashSet<string> wordSet, int i) {
        if (i == s.Length) {
            return true;
        }

        for (int j = i; j < s.Length; j++) {
            if (wordSet.Contains(s.Substring(i, j - i + 1))) {
                if (Dfs(s, wordSet, j + 1)) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```go
func wordBreak(s string, wordDict []string) bool {
    wordSet := make(map[string]bool)
    for _, w := range wordDict {
        wordSet[w] = true
    }
    return dfs(s, wordSet, 0)
}

func dfs(s string, wordSet map[string]bool, i int) bool {
    if i == len(s) {
        return true
    }

    for j := i; j < len(s); j++ {
        if wordSet[s[i:j+1]] {
            if dfs(s, wordSet, j+1) {
                return true
            }
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun wordBreak(s: String, wordDict: List<String>): Boolean {
        val wordSet = wordDict.toHashSet()
        return dfs(s, wordSet, 0)
    }

    private fun dfs(s: String, wordSet: HashSet<String>, i: Int): Boolean {
        if (i == s.length) {
            return true
        }

        for (j in i until s.length) {
            if (wordSet.contains(s.substring(i, j + 1))) {
                if (dfs(s, wordSet, j + 1)) {
                    return true
                }
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O( (n * 2 ^ n) + m)$
* Space complexity: $O(n + (m * t))$

>Where $n$ is the length of the string $s$ and $m$ is the number of words in $wordDict$.

---

## 3. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        memo = {len(s) : True}
        def dfs(i):
            if i in memo:
                return memo[i]
            
            for w in wordDict:
                if ((i + len(w)) <= len(s) and 
                     s[i : i + len(w)] == w
                ):
                    if dfs(i + len(w)):
                        memo[i] = True
                        return True
            memo[i] = False
            return False
        
        return dfs(0)
```

```java
public class Solution {
    private Map<Integer, Boolean> memo;

    public boolean wordBreak(String s, List<String> wordDict) {
        memo = new HashMap<>();
        memo.put(s.length(), true);
        return dfs(s, wordDict, 0);
    }

    private boolean dfs(String s, List<String> wordDict, int i) {
        if (memo.containsKey(i)) {
            return memo.get(i);
        }

        for (String w : wordDict) {
            if (i + w.length() <= s.length() && 
                s.substring(i, i + w.length()).equals(w)) {
                if (dfs(s, wordDict, i + w.length())) {
                    memo.put(i, true);
                    return true;
                }
            }
        }
        memo.put(i, false);
        return false;
    }
}
```

```cpp
class Solution {
public:
    unordered_map<int, bool> memo;

    bool wordBreak(string s, vector<string>& wordDict) {
        memo[s.length()] = true;
        return dfs(s, wordDict, 0);
    }

    bool dfs(string& s, vector<string>& wordDict, int i) {
        if (memo.find(i) != memo.end()) {
            return memo[i];
        }

        for (const string& w : wordDict) {
            if (i + w.length() <= s.length() && 
                s.substr(i, w.length()) == w) {
                if (dfs(s, wordDict, i + w.length())) {
                    memo[i] = true;
                    return true;
                }
            }
        }
        memo[i] = false;
        return false;
    }
};
```

```javascript
class Solution {
    constructor() {
        this.memo = {};
    }

    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @return {boolean}
     */
    wordBreak(s, wordDict) {
        this.memo = { [s.length]: true };
        return this.dfs(s, wordDict, 0);
    }

    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @param {number} i
     * @return {boolean}
     */
    dfs(s, wordDict, i) {
        if (i in this.memo) {
            return this.memo[i];
        }

        for (let w of wordDict) {
            if (i + w.length <= s.length && 
                s.substring(i, i + w.length) === w) {
                if (this.dfs(s, wordDict, i + w.length)) {
                    this.memo[i] = true;
                    return true;
                }
            }
        }
        this.memo[i] = false;
        return false;
    }
}
```

```csharp
public class Solution {
    private Dictionary<int, bool> memo;

    public bool WordBreak(string s, List<string> wordDict) {
        memo = new Dictionary<int, bool> { { s.Length, true } };
        return Dfs(s, wordDict, 0);
    }

    private bool Dfs(string s, List<string> wordDict, int i) {
        if (memo.ContainsKey(i)) {
            return memo[i];
        }

        foreach (var w in wordDict) {
            if (i + w.Length <= s.Length && 
                s.Substring(i, w.Length) == w) {
                if (Dfs(s, wordDict, i + w.Length)) {
                    memo[i] = true;
                    return true;
                }
            }
        }
        memo[i] = false;
        return false;
    }
}
```

```go
func wordBreak(s string, wordDict []string) bool {
    memo := make(map[int]bool)
    memo[len(s)] = true

    var dfs func(int) bool
    dfs = func(i int) bool {
        if val, found := memo[i]; found {
            return val
        }

        for _, w := range wordDict {
            if i+len(w) <= len(s) && s[i:i+len(w)] == w {
                if dfs(i + len(w)) {
                    memo[i] = true
                    return true
                }
            }
        }

        memo[i] = false
        return false
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    fun wordBreak(s: String, wordDict: List<String>): Boolean {
        val memo = hashMapOf(s.length to true)

        fun dfs(i: Int): Boolean {
            memo[i]?.let { return it }

            for (w in wordDict) {
                if (i + w.length <= s.length && 
                    s.substring(i, i + w.length) == w) {
                    if (dfs(i + w.length)) {
                        memo[i] = true
                        return true
                    }
                }
            }

            memo[i] = false
            return false
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m * t)$
* Space complexity: $O(n)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in $wordDict$ and $t$ is the maximum length of any word in $wordDict$.

---

## 4. Dynamic Programming (Hash Set)

::tabs-start

```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        wordSet = set(wordDict)
        t = 0
        for w in wordDict:
            t = max(t, len(w))

        memo = {}
        def dfs(i):
            if i in memo:
                return memo[i]
            if i == len(s):
                return True
            for j in range(i, min(len(s), i + t)):
                if s[i : j + 1] in wordSet:
                    if dfs(j + 1):
                        memo[i] = True
                        return True
            memo[i] = False
            return False
        
        return dfs(0)
```

```java
public class Solution {
    private HashSet<String> wordSet;
    private Boolean[] memo;
    private int t;

    public boolean wordBreak(String s, List<String> wordDict) {
        wordSet = new HashSet<>(wordDict);
        memo = new Boolean[s.length()];
        t = 0;
        for (int i = 0; i < wordDict.size(); i++) {
            t = Math.max(t, wordDict.get(i).length());
        }
        return dfs(s, 0);
    }

    private boolean dfs(String s, int i) {
        if (i == s.length()) {
            return true;
        }
        if (memo[i] != null) {
            return memo[i];
        }

        for (int j = i; j < Math.min(i + t, s.length()); j++) {
            if (wordSet.contains(s.substring(i, j + 1))) {
                if (dfs(s, j + 1)) {
                    memo[i] = true;
                    return true;
                }
            }
        }
        memo[i] = false;
        return false;
    }
}
```

```cpp
class Solution {
public:
    unordered_set<string> wordSet;
    vector<int> memo;
    int t;

    bool wordBreak(string s, vector<string>& wordDict) {
        wordSet.insert(wordDict.begin(), wordDict.end());
        memo.resize(s.size(), -1);
        t = 0;
        for (string& w : wordDict) {
            t = max(t, int(w.length()));
        }
        return dfs(s, 0);
    }

    bool dfs(string& s, int i) {
        if (i == s.size()) {
            return true;
        }
        if (memo[i] != -1) {
            return memo[i] == 1;
        }

        for (int j = i; j < (i + t, s.size()); j++) {
            if (wordSet.count(s.substr(i, j - i + 1))) {
                if (dfs(s, j + 1)) {
                    memo[i] = 1;
                    return true;
                }
            }
        }
        memo[i] = 0;
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @return {boolean}
     */
    wordBreak(s, wordDict) {
        this.wordSet = new Set(wordDict);
        this.memo = new Array(s.length).fill(null);
        this.t = 0;
        for (const w of wordDict) {
            this.t = Math.max(this.t, w.length);
        }
        return this.dfs(s, 0);
    }

    /**
     * @param {string} s
     * @param {number} i
     * @return {boolean}
     */
    dfs(s, i) {
        if (i === s.length) {
            return true;
        }
        if (this.memo[i] !== null) {
            return this.memo[i];
        }

        for (let j = i; j < Math.min(i + this.t, s.length); j++) {
            if (this.wordSet.has(s.substring(i, j + 1))) {
                if (this.dfs(s, j + 1)) {
                    this.memo[i] = true;
                    return true;
                }
            }
        }
        this.memo[i] = false;
        return false;
    }
}
```

```csharp
public class Solution {
    private HashSet<string> wordSet;
    private Dictionary<int, bool> memo;
    private int t;

    public bool WordBreak(string s, List<string> wordDict) {
        wordSet = new HashSet<string>(wordDict);
        memo = new Dictionary<int, bool>();
        t = 0;
        foreach (var w in wordDict) {
            t = Math.Max(t, w.Length);
        }
        return Dfs(s, 0);
    }

    private bool Dfs(string s, int i) {
        if (i == s.Length) {
            return true;
        }
        if (memo.ContainsKey(i)) {
            return memo[i];
        }

        for (int j = i; j < Math.Min(i + t, s.Length); j++) {
            if (wordSet.Contains(s.Substring(i, j - i + 1))) {
                if (Dfs(s, j + 1)) {
                    memo[i] = true;
                    return true;
                }
            }
        }
        memo[i] = false;
        return false;
    }
}
```

```go
func wordBreak(s string, wordDict []string) bool {
    wordSet := make(map[string]bool)
    maxLen := 0

    for _, w := range wordDict {
        wordSet[w] = true
        if len(w) > maxLen {
            maxLen = len(w)
        }
    }

    memo := make(map[int]bool)

    var dfs func(int) bool
    dfs = func(i int) bool {
        if val, found := memo[i]; found {
            return val
        }
        if i == len(s) {
            return true
        }
        for j := i; j < len(s) && j < i+maxLen; j++ {
            if wordSet[s[i:j+1]] {
                if dfs(j + 1) {
                    memo[i] = true
                    return true
                }
            }
        }
        memo[i] = false
        return false
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    fun wordBreak(s: String, wordDict: List<String>): Boolean {
        val wordSet = wordDict.toSet()
        val maxLen = wordDict.maxOfOrNull { it.length } ?: 0
        val memo = HashMap<Int, Boolean>()

        fun dfs(i: Int): Boolean {
            memo[i]?.let { return it }
            if (i == s.length) return true

            for (j in i until minOf(s.length, i + maxLen)) {
                if (s.substring(i, j + 1) in wordSet) {
                    if (dfs(j + 1)) {
                        memo[i] = true
                        return true
                    }
                }
            }

            memo[i] = false
            return false
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O((t ^ 2 * n) + m)$
* Space complexity: $O(n + (m * t))$

> Where $n$ is the length of the string $s$, $m$ is the number of words in $wordDict$ and $t$ is the maximum length of any word in $wordDict$.

---

## 5. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        dp = [False] * (len(s) + 1)
        dp[len(s)] = True

        for i in range(len(s) - 1, -1, -1):
            for w in wordDict:
                if (i + len(w)) <= len(s) and s[i : i + len(w)] == w:
                    dp[i] = dp[i + len(w)]
                if dp[i]:
                    break

        return dp[0]
```

```java
public class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        boolean[] dp = new boolean[s.length() + 1];
        dp[s.length()] = true;

        for (int i = s.length() - 1; i >= 0; i--) {
            for (String w : wordDict) {
                if ((i + w.length()) <= s.length() && 
                     s.substring(i, i + w.length()).equals(w)) {
                    dp[i] = dp[i + w.length()];
                }
                if (dp[i]) {
                    break;
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
    bool wordBreak(string s, vector<string>& wordDict) {
        vector<bool> dp(s.size() + 1, false);
        dp[s.size()] = true;

        for (int i = s.size() - 1; i >= 0; i--) {
            for (const auto& w : wordDict) {
                if ((i + w.size()) <= s.size() && 
                     s.substr(i, w.size()) == w) {
                    dp[i] = dp[i + w.size()];
                }
                if (dp[i]) {
                    break;
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
     * @param {string[]} wordDict
     * @return {boolean}
     */
    wordBreak(s, wordDict) {
        const dp = new Array(s.length + 1).fill(false);
        dp[s.length] = true;

        for (let i = s.length - 1; i >= 0; i--) {
            for (const w of wordDict) {
                if ( i + w.length <= s.length &&
                    s.slice(i, i + w.length) === w) {
                    dp[i] = dp[i + w.length];
                }
                if (dp[i]) {
                    break;
                }
            }
        }

        return dp[0];
    }
}
```

```csharp
public class Solution {
    public bool WordBreak(string s, List<string> wordDict) {
        bool[] dp = new bool[s.Length + 1];
        dp[s.Length] = true;

        for (int i = s.Length - 1; i >= 0; i--) {
            foreach (string w in wordDict) {
                if ((i + w.Length) <= s.Length && 
                     s.Substring(i, w.Length) == w) {
                    dp[i] = dp[i + w.Length];
                }
                if (dp[i]) {
                    break;
                }
            }
        }

        return dp[0];
    }
}
```

```go
func wordBreak(s string, wordDict []string) bool {
    dp := make([]bool, len(s)+1)
    dp[len(s)] = true

    for i := len(s) - 1; i >= 0; i-- {
        for _, w := range wordDict {
            if i+len(w) <= len(s) && s[i:i+len(w)] == w {
                dp[i] = dp[i+len(w)]
            }
            if dp[i] {
                break
            }
        }
    }

    return dp[0]
}
```

```kotlin
class Solution {
    fun wordBreak(s: String, wordDict: List<String>): Boolean {
        val dp = BooleanArray(s.length + 1)
        dp[s.length] = true

        for (i in s.length - 1 downTo 0) {
            for (w in wordDict) {
                if (i + w.length <= s.length && 
                    s.substring(i, i + w.length) == w) {
                    dp[i] = dp[i + w.length]
                }
                if (dp[i]) break
            }
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m * t)$
* Space complexity: $O(n)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in $wordDict$ and $t$ is the maximum length of any word in $wordDict$.

---

## 6. Dynamic Programming (Trie)

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_word = True

    def search(self, s, i, j):
        node = self.root
        for idx in range(i, j + 1):
            if s[idx] not in node.children:
                return False
            node = node.children[s[idx]]
        return node.is_word

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        trie = Trie()
        for word in wordDict:
            trie.insert(word)

        dp = [False] * (len(s) + 1)
        dp[len(s)] = True

        t = 0
        for w in wordDict:
            t = max(t, len(w))
        
        for i in range(len(s), -1, -1):
            for j in range(i, min(len(s), i + t)):
                if trie.search(s, i, j):
                    dp[i] = dp[j + 1]
                    if dp[i]:
                        break

        return dp[0]
```

```java
public class TrieNode {
    HashMap<Character, TrieNode> children;
    boolean isWord;

    public TrieNode() {
        children = new HashMap<>();
        isWord = false;
    }
}

public class Trie {
    TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
        }
        node.isWord = true;
    }

    public boolean search(String s, int i, int j) {
        TrieNode node = root;
        for (int idx = i; idx <= j; idx++) {
            if (!node.children.containsKey(s.charAt(idx))) {
                return false;
            }
            node = node.children.get(s.charAt(idx));
        }
        return node.isWord;
    }
}

public class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Trie trie = new Trie();
        for (String word : wordDict) {
            trie.insert(word);
        }

        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[n] = true;

        int maxLen = 0;
        for (String word : wordDict) {
            maxLen = Math.max(maxLen, word.length());
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < Math.min(n, i + maxLen); j++) {
                if (trie.search(s, i, j)) {
                    dp[i] = dp[j + 1];
                    if (dp[i]) break;
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
    unordered_map<char, TrieNode*> children;
    bool is_word = false;
};

class Trie {
public:
    TrieNode* root;

    Trie() {
        root = new TrieNode();
    }

    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->is_word = true;
    }

    bool search(string& s, int i, int j) {
        TrieNode* node = root;
        for (int idx = i; idx <= j; ++idx) {
            if (!node->children.count(s[idx])) {
                return false;
            }
            node = node->children[s[idx]];
        }
        return node->is_word;
    }
};

class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        Trie trie;
        for (string word : wordDict) {
            trie.insert(word);
        }

        int n = s.length();
        vector<bool> dp(n + 1, false);
        dp[n] = true;

        int maxLen = 0;
        for (string w : wordDict) {
            maxLen = max(maxLen, (int)w.size());
        }

        for (int i = n - 1; i >= 0; --i) {
            for (int j = i; j < min(n, i + maxLen); ++j) {
                if (trie.search(s, i, j)) {
                    dp[i] = dp[j + 1];
                    if (dp[i]) break;
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
    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isWord = true;
    }

    /**
     * @param {string} s
     * @param {number} i
     * @param {number} j
     * @return {boolean}
     */
    search(s, i, j) {
        let node = this.root;
        for (let idx = i; idx <= j; idx++) {
            if (!node.children[s[idx]]) {
                return false;
            }
            node = node.children[s[idx]];
        }
        return node.isWord;
    }
}

class Solution {
    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @return {boolean}
     */
    wordBreak(s, wordDict) {
        const trie = new Trie();
        for (let word of wordDict) {
            trie.insert(word);
        }

        const dp = new Array(s.length + 1).fill(false);
        dp[s.length] = true;

        let maxLen = 0;
        for (let w of wordDict) {
            maxLen = Math.max(maxLen, w.length);
        }

        for (let i = s.length - 1; i >= 0; i--) {
            for (let j = i; j < Math.min(s.length, i + maxLen); j++) {
                if (trie.search(s, i, j)) {
                    dp[i] = dp[j + 1];
                    if (dp[i]) break;
                }
            }
        }

        return dp[0];
    }
}
```

```csharp
public class TrieNode {
    public Dictionary<char, TrieNode> Children;
    public bool IsWord;

    public TrieNode() {
        Children = new Dictionary<char, TrieNode>();
        IsWord = false;
    }
}

public class Trie {
    public TrieNode Root;

    public Trie() {
        Root = new TrieNode();
    }

    public void Insert(string word) {
        TrieNode node = Root;
        foreach (char c in word) {
            if (!node.Children.ContainsKey(c)) {
                node.Children[c] = new TrieNode();
            }
            node = node.Children[c];
        }
        node.IsWord = true;
    }

    public bool Search(string s, int i, int j) {
        TrieNode node = Root;
        for (int idx = i; idx <= j; idx++) {
            if (!node.Children.ContainsKey(s[idx])) {
                return false;
            }
            node = node.Children[s[idx]];
        }
        return node.IsWord;
    }
}

public class Solution {
    public bool WordBreak(string s, IList<string> wordDict) {
        Trie trie = new Trie();
        foreach (string word in wordDict) {
            trie.Insert(word);
        }

        int n = s.Length;
        bool[] dp = new bool[n + 1];
        dp[n] = true;

        int maxLen = 0;
        foreach (string word in wordDict) {
            maxLen = Math.Max(maxLen, word.Length);
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < Math.Min(n, i + maxLen); j++) {
                if (trie.Search(s, i, j)) {
                    dp[i] = dp[j + 1];
                    if (dp[i]) break;
                }
            }
        }

        return dp[0];
    }
}
```

```go
type TrieNode struct {
    children map[rune]*TrieNode
    isWord   bool
}

func NewTrieNode() *TrieNode {
    return &TrieNode{children: make(map[rune]*TrieNode)}
}

type Trie struct {
    root *TrieNode
}

func NewTrie() *Trie {
    return &Trie{root: NewTrieNode()}
}

func (t *Trie) Insert(word string) {
    node := t.root
    for _, char := range word {
        if _, found := node.children[char]; !found {
            node.children[char] = NewTrieNode()
        }
        node = node.children[char]
    }
    node.isWord = true
}

func (t *Trie) Search(s string, i, j int) bool {
    node := t.root
    for idx := i; idx <= j; idx++ {
        char := rune(s[idx])
        if _, found := node.children[char]; !found {
            return false
        }
        node = node.children[char]
    }
    return node.isWord
}

func wordBreak(s string, wordDict []string) bool {
    trie := NewTrie()
    for _, word := range wordDict {
        trie.Insert(word)
    }

    dp := make([]bool, len(s)+1)
    dp[len(s)] = true

    maxLength := 0
    for _, word := range wordDict {
        if len(word) > maxLength {
            maxLength = len(word)
        }
    }

    for i := len(s) - 1; i >= 0; i-- {
        for j := i; j < len(s) && j < i+maxLength; j++ {
            if trie.Search(s, i, j) {
                dp[i] = dp[j+1]
                if dp[i] {
                    break
                }
            }
        }
    }

    return dp[0]
}
```

```kotlin
class TrieNode {
    val children = mutableMapOf<Char, TrieNode>()
    var isWord = false
}

class Trie {
    private val root = TrieNode()

    fun insert(word: String) {
        var node = root
        for (char in word) {
            node = node.children.computeIfAbsent(char) { TrieNode() }
        }
        node.isWord = true
    }

    fun search(s: String, i: Int, j: Int): Boolean {
        var node = root
        for (idx in i..j) {
            val char = s[idx]
            node = node.children[char] ?: return false
        }
        return node.isWord
    }
}

class Solution {
    fun wordBreak(s: String, wordDict: List<String>): Boolean {
        val trie = Trie()
        wordDict.forEach { trie.insert(it) }

        val dp = BooleanArray(s.length + 1)
        dp[s.length] = true

        val maxLength = wordDict.maxOfOrNull { it.length } ?: 0

        for (i in s.length - 1 downTo 0) {
            for (j in i until minOf(s.length, i + maxLength)) {
                if (trie.search(s, i, j)) {
                    dp[i] = dp[j + 1]
                    if (dp[i]) break
                }
            }
        }

        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O((n * t ^ 2) + m)$
* Space complexity: $O(n + (m * t))$

> Where $n$ is the length of the string $s$, $m$ is the number of words in $wordDict$ and $t$ is the maximum length of any word in $wordDict$.