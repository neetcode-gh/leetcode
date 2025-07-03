## 1. Recursion

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n + m * k)$
- Space complexity: $O(n + m * k)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in the dictionary, and $k$ is the average length of a word in the dictionary.

---

## 2. Dynamic Programming (Top-Down) Using Hash Set

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3 + m * k)$
- Space complexity: $O(n + m * k)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in the dictionary, and $k$ is the average length of a word in the dictionary.

---

## 3. Dynamic Programming (Bottom-Up) Using Hash Set

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3 + m * k)$
- Space complexity: $O(n + m * k)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in the dictionary, and $k$ is the average length of a word in the dictionary.

---

## 4. Dynamic Programming (Top-Down)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m * k)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in the dictionary, and $k$ is the average length of a word in the dictionary.

---

## 5. Dynamic Programming (Bottom-Up)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m * k)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in the dictionary, and $k$ is the average length of a word in the dictionary.

---

## 6. Dynamic Programming (Top-Down) Using Trie

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 + m * k)$
- Space complexity: $O(n + m * k)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in the dictionary, and $k$ is the average length of a word in the dictionary.

---

## 7. Dynamic Programming (Bottom-Up) Using Trie

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 + m * k)$
- Space complexity: $O(n + m * k)$

> Where $n$ is the length of the string $s$, $m$ is the number of words in the dictionary, and $k$ is the average length of a word in the dictionary.
