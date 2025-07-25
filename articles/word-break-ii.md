## 1. Backtracking

::tabs-start

```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        wordDict = set(wordDict)

        def backtrack(i):
            if i == len(s):
                res.append(" ".join(cur))
                return

            for j in range(i, len(s)):
                w = s[i:j + 1]
                if w in wordDict:
                    cur.append(w)
                    backtrack(j + 1)
                    cur.pop()

        cur = []
        res = []
        backtrack(0)
        return res
```

```java
public class Solution {
    private Set<String> wordSet;
    private List<String> res;

    public List<String> wordBreak(String s, List<String> wordDict) {
        wordSet = new HashSet<>(wordDict);
        res = new ArrayList<>();
        List<String> cur = new ArrayList<>();
        backtrack(s, 0, cur);
        return res;
    }

    private void backtrack(String s, int i, List<String> cur) {
        if (i == s.length()) {
            res.add(String.join(" ", cur));
            return;
        }

        for (int j = i; j < s.length(); j++) {
            String w = s.substring(i, j + 1);
            if (wordSet.contains(w)) {
                cur.add(w);
                backtrack(s, j + 1, cur);
                cur.remove(cur.size() - 1);
            }
        }
    }
}
```

```cpp
class Solution {
    unordered_set<string> wordSet;
    vector<string> res;

public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        wordSet = unordered_set<string>(wordDict.begin(), wordDict.end());
        vector<string> cur;
        backtrack(s, 0, cur);
        return res;
    }

private:
    void backtrack(const string& s, int i, vector<string>& cur) {
        if (i == s.size()) {
            res.push_back(join(cur));
            return;
        }

        for (int j = i; j < s.size(); ++j) {
            string w = s.substr(i, j - i + 1);
            if (wordSet.count(w)) {
                cur.push_back(w);
                backtrack(s, j + 1, cur);
                cur.pop_back();
            }
        }
    }

    string join(const vector<string>& words) {
        ostringstream oss;
        for (int i = 0; i < words.size(); ++i) {
            if (i > 0) oss << " ";
            oss << words[i];
        }
        return oss.str();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @return {string[]}
     */
    wordBreak(s, wordDict) {
        const wordSet = new Set(wordDict);
        const res = [];
        const cur = [];

        const backtrack = (i) => {
            if (i === s.length) {
                res.push(cur.join(' '));
                return;
            }

            for (let j = i; j < s.length; j++) {
                const w = s.substring(i, j + 1);
                if (wordSet.has(w)) {
                    cur.push(w);
                    backtrack(j + 1);
                    cur.pop();
                }
            }
        };

        backtrack(0);
        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> WordBreak(string s, List<string> wordDict) {
        HashSet<string> wordSet = new HashSet<string>(wordDict);
        List<string> res = new List<string>();
        List<string> cur = new List<string>();

        void Backtrack(int i) {
            if (i == s.Length) {
                res.Add(string.Join(" ", cur));
                return;
            }

            for (int j = i; j < s.Length; j++) {
                string word = s.Substring(i, j - i + 1);
                if (wordSet.Contains(word)) {
                    cur.Add(word);
                    Backtrack(j + 1);
                    cur.RemoveAt(cur.Count - 1);
                }
            }
        }

        Backtrack(0);
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n * 2 ^ n)$
- Space complexity: $O(m + 2 ^ n)$

> Where $n$ is the length of the string $s$ and $m$ is the sum of the lengths of the strings in the $wordDict$.

---

## 2. Backtracking + Trie

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
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        trie = Trie()
        for word in wordDict:
            trie.addWord(word)

        def backtrack(i, path):
            if i == len(s):
                res.append(" ".join(path))
                return

            node = trie.root
            word = []
            for i in range(i, len(s)):
                char = s[i]
                if char not in node.children:
                    break

                word.append(char)
                node = node.children[char]

                if node.isWord:
                    path.append("".join(word))
                    backtrack(i + 1, path)
                    path.pop()

        res = []
        backtrack(0, [])
        return res
```

```java
class TrieNode {
    HashMap<Character, TrieNode> children = new HashMap<>();
    boolean isWord = false;
}

class Trie {
    TrieNode root;

    Trie() {
        root = new TrieNode();
    }

    void addWord(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            curr.children.putIfAbsent(c, new TrieNode());
            curr = curr.children.get(c);
        }
        curr.isWord = true;
    }
}

public class Solution {
    public List<String> wordBreak(String s, List<String> wordDict) {
        Trie trie = new Trie();
        for (String word : wordDict) {
            trie.addWord(word);
        }

        List<String> res = new ArrayList<>();
        backtrack(0, s, new ArrayList<>(), trie, res);
        return res;
    }

    private void backtrack(int index, String s, List<String> path, Trie trie, List<String> res) {
        if (index == s.length()) {
            res.add(String.join(" ", path));
            return;
        }

        TrieNode node = trie.root;
        StringBuilder word = new StringBuilder();
        for (int i = index; i < s.length(); i++) {
            char c = s.charAt(i);
            if (!node.children.containsKey(c)) {
                break;
            }

            word.append(c);
            node = node.children.get(c);

            if (node.isWord) {
                path.add(word.toString());
                backtrack(i + 1, s, path, trie, res);
                path.remove(path.size() - 1);
            }
        }
    }
}
```

```cpp
struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isWord = false;
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
            if (!curr->children.count(c)) {
                curr->children[c] = new TrieNode();
            }
            curr = curr->children[c];
        }
        curr->isWord = true;
    }
};

class Solution {
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        Trie trie;
        for (const string& word : wordDict) {
            trie.addWord(word);
        }

        vector<string> res;
        vector<string> path;
        backtrack(0, s, path, trie, res);
        return res;
    }

private:
    void backtrack(int index, string& s, vector<string>& path, Trie& trie, vector<string>& res) {
        if (index == s.size()) {
            stringstream ss;
            for (int i = 0; i < path.size(); ++i) {
                if (i > 0) ss << " ";
                ss << path[i];
            }
            res.push_back(ss.str());
            return;
        }

        TrieNode* node = trie.root;
        string word;
        for (int i = index; i < s.size(); ++i) {
            char c = s[i];
            if (!node->children.count(c)) break;

            word.push_back(c);
            node = node->children[c];

            if (node->isWord) {
                path.push_back(word);
                backtrack(i + 1, s, path, trie, res);
                path.pop_back();
            }
        }
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = new Map();
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
            if (!curr.children.has(c)) {
                curr.children.set(c, new TrieNode());
            }
            curr = curr.children.get(c);
        }
        curr.isWord = true;
    }
}

class Solution {
    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @return {string[]}
     */
    wordBreak(s, wordDict) {
        const trie = new Trie();
        for (const word of wordDict) {
            trie.addWord(word);
        }

        const res = [];
        const backtrack = (index, path) => {
            if (index === s.length) {
                res.push(path.join(' '));
                return;
            }

            let node = trie.root;
            let word = '';
            for (let i = index; i < s.length; i++) {
                const char = s[i];
                if (!node.children.has(char)) {
                    break;
                }

                word += char;
                node = node.children.get(char);

                if (node.isWord) {
                    path.push(word);
                    backtrack(i + 1, path);
                    path.pop();
                }
            }
        };

        backtrack(0, []);
        return res;
    }
}
```

```csharp
public class TrieNode {
    public Dictionary<char, TrieNode> children = new Dictionary<char, TrieNode>();
    public bool isWord = false;
}

public class Trie {
    public TrieNode root = new TrieNode();

    public void AddWord(string word) {
        TrieNode curr = root;
        foreach (char c in word) {
            if (!curr.children.ContainsKey(c)) {
                curr.children[c] = new TrieNode();
            }
            curr = curr.children[c];
        }
        curr.isWord = true;
    }
}

public class Solution {
    public List<string> WordBreak(string s, List<string> wordDict) {
        Trie trie = new Trie();
        foreach (string word in wordDict) {
            trie.AddWord(word);
        }

        List<string> res = new List<string>();

        void Backtrack(int index, List<string> path) {
            if (index == s.Length) {
                res.Add(string.Join(" ", path));
                return;
            }

            TrieNode node = trie.root;
            StringBuilder word = new StringBuilder();

            for (int i = index; i < s.Length; i++) {
                char c = s[i];
                if (!node.children.ContainsKey(c)) break;

                word.Append(c);
                node = node.children[c];

                if (node.isWord) {
                    path.Add(word.ToString());
                    Backtrack(i + 1, path);
                    path.RemoveAt(path.Count - 1);
                }
            }
        }

        Backtrack(0, new List<string>());
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n * 2 ^ n)$
- Space complexity: $O(m + 2 ^ n)$

> Where $n$ is the length of the string $s$ and $m$ is the sum of the lengths of the strings in the $wordDict$.

---

## 3. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        wordDict = set(wordDict)
        cache = {}

        def backtrack(i):
            if i == len(s):
                return [""]
            if i in cache:
                return cache[i]

            res = []
            for j in range(i, len(s)):
                w = s[i:j + 1]
                if w not in wordDict:
                    continue
                strings = backtrack(j + 1)
                for substr in strings:
                    sentence = w
                    if substr:
                        sentence += " " + substr
                    res.append(sentence)
            cache[i] = res
            return res

        return backtrack(0)
```

```java
public class Solution {
    private Set<String> wordSet;
    private Map<Integer, List<String>> cache;

    public List<String> wordBreak(String s, List<String> wordDict) {
        wordSet = new HashSet<>(wordDict);
        cache = new HashMap<>();
        return backtrack(s, 0);
    }

    private List<String> backtrack(String s, int i) {
        if (i == s.length())
            return Arrays.asList("");
        if (cache.containsKey(i))
            return cache.get(i);

        List<String> res = new ArrayList<>();
        for (int j = i; j < s.length(); j++) {
            String w = s.substring(i, j + 1);
            if (!wordSet.contains(w))
                continue;
            List<String> strings = backtrack(s, j + 1);
            for (String substr : strings) {
                String sentence = w;
                if (!substr.isEmpty())
                    sentence += " " + substr;
                res.add(sentence);
            }
        }
        cache.put(i, res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        wordSet = unordered_set<string>(wordDict.begin(), wordDict.end());
        cache = unordered_map<int, vector<string>>();
        return backtrack(s, 0);
    }

private:
    unordered_set<string> wordSet;
    unordered_map<int, vector<string>> cache;

    vector<string> backtrack(const string& s, int i) {
        if (i == s.size())
            return {""};
        if (cache.count(i))
            return cache[i];

        vector<string> res;
        for (int j = i; j < s.size(); ++j) {
            string w = s.substr(i, j - i + 1);
            if (!wordSet.count(w))
                continue;
            vector<string> strings = backtrack(s, j + 1);
            for (const string& substr : strings) {
                string sentence = w;
                if (!substr.empty())
                    sentence += " " + substr;
                res.push_back(sentence);
            }
        }
        cache[i] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @return {string[]}
     */
    wordBreak(s, wordDict) {
        const wordSet = new Set(wordDict);
        const cache = new Map();

        const backtrack = (i) => {
            if (i === s.length) {
                return [''];
            }
            if (cache.has(i)) {
                return cache.get(i);
            }

            const res = [];
            for (let j = i; j < s.length; j++) {
                const w = s.substring(i, j + 1);
                if (!wordSet.has(w)) continue;

                const strings = backtrack(j + 1);
                for (const substr of strings) {
                    let sentence = w;
                    if (substr) {
                        sentence += ' ' + substr;
                    }
                    res.push(sentence);
                }
            }
            cache.set(i, res);
            return res;
        };

        return backtrack(0);
    }
}
```

```csharp
public class Solution {
    public List<string> WordBreak(string s, List<string> wordDictList) {
        HashSet<string> wordDict = new HashSet<string>(wordDictList);
        Dictionary<int, List<string>> cache = new Dictionary<int, List<string>>();

        List<string> Backtrack(int i) {
            if (i == s.Length) return new List<string> { "" };
            if (cache.ContainsKey(i)) return cache[i];

            List<string> res = new List<string>();
            for (int j = i; j < s.Length; j++) {
                string w = s.Substring(i, j - i + 1);
                if (!wordDict.Contains(w)) continue;

                List<string> substrings = Backtrack(j + 1);
                foreach (string substr in substrings) {
                    string sentence = w;
                    if (!string.IsNullOrEmpty(substr)) {
                        sentence += " " + substr;
                    }
                    res.Add(sentence);
                }
            }

            cache[i] = res;
            return res;
        }

        return Backtrack(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n * 2 ^ n)$
- Space complexity: $O(m + n * 2 ^ n)$

> Where $n$ is the length of the string $s$ and $m$ is the sum of the lengths of the strings in the $wordDict$.

---

## 4. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        wordSet = set(wordDict)
        n = len(s)
        dp = [[] for _ in range(n + 1)]
        dp[0] = [""]

        for i in range(1, n + 1):
            for j in range(i):
                if s[j:i] in wordSet:
                    for sentence in dp[j]:
                        dp[i].append((sentence + " " + s[j:i]).strip())

        return dp[n]
```

```java
public class Solution {
    public List<String> wordBreak(String s, List<String> wordDict) {
        Set<String> wordSet = new HashSet<>(wordDict);
        int n = s.length();
        List<String>[] dp = new ArrayList[n + 1];
        for (int i = 0; i <= n; i++) {
            dp[i] = new ArrayList<>();
        }
        dp[0].add("");

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (wordSet.contains(s.substring(j, i))) {
                    for (String sentence : dp[j]) {
                        dp[i].add((sentence + " " + s.substring(j, i)).trim());
                    }
                }
            }
        }

        return dp[n];
    }
}
```

```cpp
class Solution {
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> wordSet(wordDict.begin(), wordDict.end());
        int n = s.size();
        vector<vector<string>> dp(n + 1);
        dp[0] = {""};

        for (int i = 1; i <= n; ++i) {
            for (int j = 0; j < i; ++j) {
                string word = s.substr(j, i - j);
                if (wordSet.count(word)) {
                    for (const string& sentence : dp[j]) {
                        if (sentence.empty()) {
                            dp[i].push_back(word);
                        } else {
                            dp[i].push_back(sentence + " " + word);
                        }
                    }
                }
            }
        }

        return dp[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @return {string[]}
     */
    wordBreak(s, wordDict) {
        const wordSet = new Set(wordDict);
        const n = s.length;
        const dp = Array.from({ length: n + 1 }, () => []);
        dp[0].push('');

        for (let i = 1; i <= n; i++) {
            for (let j = 0; j < i; j++) {
                if (wordSet.has(s.substring(j, i))) {
                    for (const sentence of dp[j]) {
                        dp[i].push((sentence + ' ' + s.substring(j, i)).trim());
                    }
                }
            }
        }

        return dp[n];
    }
}
```

```csharp
public class Solution {
    public List<string> WordBreak(string s, List<string> wordDictList) {
        HashSet<string> wordSet = new HashSet<string>(wordDictList);
        int n = s.Length;
        List<string>[] dp = new List<string>[n + 1];
        for (int i = 0; i <= n; i++) {
            dp[i] = new List<string>();
        }
        dp[0].Add("");

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                string word = s.Substring(j, i - j);
                if (wordSet.Contains(word)) {
                    foreach (string sentence in dp[j]) {
                        string space = string.IsNullOrEmpty(sentence) ? "" : " ";
                        dp[i].Add(sentence + space + word);
                    }
                }
            }
        }

        return dp[n];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n * 2 ^ n)$
- Space complexity: $O(m + n * 2 ^ n)$

> Where $n$ is the length of the string $s$ and $m$ is the sum of the lengths of the strings in the $wordDict$.

---

## 5. Dynamic Programming (Top-Down) Using Trie

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
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        trie = Trie()
        for word in wordDict:
            trie.addWord(word)

        cache = {}

        def backtrack(index):
            if index == len(s):
                return [""]
            if index in cache:
                return cache[index]

            res = []
            curr = trie.root
            for i in range(index, len(s)):
                char = s[i]
                if char not in curr.children:
                    break
                curr = curr.children[char]
                if curr.isWord:
                    for suffix in backtrack(i + 1):
                        if suffix:
                            res.append(s[index:i + 1] + " " + suffix)
                        else:
                            res.append(s[index:i + 1])

            cache[index] = res
            return res

        return backtrack(0)
```

```java
class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isWord = false;
}

class Trie {
    TrieNode root;

    Trie() {
        root = new TrieNode();
    }

    void addWord(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            curr.children.putIfAbsent(c, new TrieNode());
            curr = curr.children.get(c);
        }
        curr.isWord = true;
    }
}

public class Solution {
    public List<String> wordBreak(String s, List<String> wordDict) {
        Trie trie = new Trie();
        for (String word : wordDict) {
            trie.addWord(word);
        }

        Map<Integer, List<String>> cache = new HashMap<>();
        return backtrack(0, s, trie, cache);
    }

    private List<String> backtrack(int index, String s, Trie trie, Map<Integer, List<String>> cache) {
        if (index == s.length()) {
            return Collections.singletonList("");
        }

        if (cache.containsKey(index)) {
            return cache.get(index);
        }

        List<String> res = new ArrayList<>();
        TrieNode curr = trie.root;

        for (int i = index; i < s.length(); i++) {
            char c = s.charAt(i);
            if (!curr.children.containsKey(c)) {
                break;
            }
            curr = curr.children.get(c);
            if (curr.isWord) {
                for (String suffix : backtrack(i + 1, s, trie, cache)) {
                    if (!suffix.isEmpty()) {
                        res.add(s.substring(index, i + 1) + " " + suffix);
                    } else {
                        res.add(s.substring(index, i + 1));
                    }
                }
            }
        }

        cache.put(index, res);
        return res;
    }
}
```

```cpp
struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isWord = false;
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
            if (!curr->children.count(c)) {
                curr->children[c] = new TrieNode();
            }
            curr = curr->children[c];
        }
        curr->isWord = true;
    }
};

class Solution {
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        Trie trie;
        for (const string& word : wordDict) {
            trie.addWord(word);
        }

        unordered_map<int, vector<string>> cache;
        return backtrack(0, s, trie, cache);
    }

private:
    vector<string> backtrack(int index, string& s, Trie& trie, unordered_map<int, vector<string>>& cache) {
        if (index == s.size()) {
            return {""};
        }

        if (cache.count(index)) {
            return cache[index];
        }

        vector<string> res;
        TrieNode* curr = trie.root;

        for (int i = index; i < s.size(); ++i) {
            char c = s[i];
            if (!curr->children.count(c)) {
                break;
            }
            curr = curr->children[c];
            if (curr->isWord) {
                for (const string& suffix : backtrack(i + 1, s, trie, cache)) {
                    if (!suffix.empty()) {
                        res.push_back(s.substr(index, i - index + 1) + " " + suffix);
                    } else {
                        res.push_back(s.substr(index, i - index + 1));
                    }
                }
            }
        }

        return cache[index] = res;
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = new Map();
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
            if (!curr.children.has(c)) {
                curr.children.set(c, new TrieNode());
            }
            curr = curr.children.get(c);
        }
        curr.isWord = true;
    }
}

class Solution {
    /**
     * @param {string} s
     * @param {string[]} wordDict
     * @return {string[]}
     */
    wordBreak(s, wordDict) {
        const trie = new Trie();
        for (const word of wordDict) {
            trie.addWord(word);
        }

        const cache = new Map();

        const backtrack = (index) => {
            if (index === s.length) {
                return [''];
            }
            if (cache.has(index)) {
                return cache.get(index);
            }

            const res = [];
            let curr = trie.root;

            for (let i = index; i < s.length; i++) {
                const char = s[i];
                if (!curr.children.has(char)) {
                    break;
                }
                curr = curr.children.get(char);
                if (curr.isWord) {
                    for (const suffix of backtrack(i + 1)) {
                        if (suffix) {
                            res.push(s.slice(index, i + 1) + ' ' + suffix);
                        } else {
                            res.push(s.slice(index, i + 1));
                        }
                    }
                }
            }

            cache.set(index, res);
            return res;
        };

        return backtrack(0);
    }
}
```

```csharp
public class TrieNode {
    public Dictionary<char, TrieNode> Children = new Dictionary<char, TrieNode>();
    public bool IsWord = false;
}

public class Trie {
    public TrieNode Root = new TrieNode();

    public void AddWord(string word) {
        TrieNode curr = Root;
        foreach (char c in word) {
            if (!curr.Children.ContainsKey(c)) {
                curr.Children[c] = new TrieNode();
            }
            curr = curr.Children[c];
        }
        curr.IsWord = true;
    }
}

public class Solution {
    private Dictionary<int, List<string>> cache = new Dictionary<int, List<string>>();

    public List<string> WordBreak(string s, List<string> wordDict) {
        Trie trie = new Trie();
        foreach (string word in wordDict) {
            trie.AddWord(word);
        }
        return Backtrack(0, s, trie.Root, trie);
    }

    private List<string> Backtrack(int index, string s, TrieNode root, Trie trie) {
        if (index == s.Length) return new List<string> { "" };
        if (cache.ContainsKey(index)) return cache[index];

        List<string> res = new List<string>();
        TrieNode curr = root;

        for (int i = index; i < s.Length; i++) {
            char c = s[i];
            if (!curr.Children.ContainsKey(c)) break;

            curr = curr.Children[c];
            if (curr.IsWord) {
                List<string> suffixes = Backtrack(i + 1, s, root, trie);
                foreach (string suffix in suffixes) {
                    if (suffix == "") {
                        res.Add(s.Substring(index, i - index + 1));
                    } else {
                        res.Add(s.Substring(index, i - index + 1) + " " + suffix);
                    }
                }
            }
        }

        cache[index] = res;
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n * 2 ^ n)$
- Space complexity: $O(m + n * 2 ^ n)$

> Where $n$ is the length of the string $s$ and $m$ is the sum of the lengths of the strings in the $wordDict$.
