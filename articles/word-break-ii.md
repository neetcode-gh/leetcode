## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Backtracking** - Core technique for exploring all possible word segmentations by trying each valid prefix and recursing on the remainder
- **Dynamic Programming (Memoization)** - Caching results for each starting index avoids recomputing the same suffix segmentations
- **Trie Data Structure** - Optional optimization for efficient prefix matching when the dictionary has many words with common prefixes
- **Hash Sets** - Converting the word dictionary to a set enables O(1) word lookup instead of O(m) list search

---

## 1. Backtracking

### Intuition
We need to find all possible ways to segment the string into valid dictionary words. Starting from the beginning of the string, we try every possible prefix that exists in the dictionary. When we find a valid prefix, we recursively process the remaining substring. When we reach the end of the string, we have found a valid segmentation and add it to our result.

### Algorithm
1. Convert the word dictionary to a set for `O(1)` lookups.
2. Use a recursive backtracking function starting at index `0`.
3. At each position, try all substrings from the current index to the end.
4. If a substring exists in the dictionary, add it to the current path and recurse on the remaining string.
5. When the index reaches the end of the string, join the current path with spaces and add to results.
6. Backtrack by removing the last word from the path after each recursive call.

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

```go
func wordBreak(s string, wordDict []string) []string {
    wordSet := make(map[string]bool)
    for _, word := range wordDict {
        wordSet[word] = true
    }

    var res []string
    var cur []string

    var backtrack func(i int)
    backtrack = func(i int) {
        if i == len(s) {
            res = append(res, strings.Join(cur, " "))
            return
        }

        for j := i; j < len(s); j++ {
            w := s[i : j+1]
            if wordSet[w] {
                cur = append(cur, w)
                backtrack(j + 1)
                cur = cur[:len(cur)-1]
            }
        }
    }

    backtrack(0)
    return res
}
```

```kotlin
class Solution {
    fun wordBreak(s: String, wordDict: List<String>): List<String> {
        val wordSet = wordDict.toHashSet()
        val res = mutableListOf<String>()
        val cur = mutableListOf<String>()

        fun backtrack(i: Int) {
            if (i == s.length) {
                res.add(cur.joinToString(" "))
                return
            }

            for (j in i until s.length) {
                val w = s.substring(i, j + 1)
                if (w in wordSet) {
                    cur.add(w)
                    backtrack(j + 1)
                    cur.removeAt(cur.size - 1)
                }
            }
        }

        backtrack(0)
        return res
    }
}
```

```swift
class Solution {
    func wordBreak(_ s: String, _ wordDict: [String]) -> [String] {
        let wordSet = Set(wordDict)
        var res = [String]()
        var cur = [String]()
        let chars = Array(s)

        func backtrack(_ i: Int) {
            if i == chars.count {
                res.append(cur.joined(separator: " "))
                return
            }

            for j in i..<chars.count {
                let w = String(chars[i...j])
                if wordSet.contains(w) {
                    cur.append(w)
                    backtrack(j + 1)
                    cur.removeLast()
                }
            }
        }

        backtrack(0)
        return res
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

### Intuition
Building a Trie from the dictionary words allows us to efficiently check prefixes while traversing the string. Instead of checking each substring against a set, we walk character by character through the Trie. This can provide early termination when no dictionary word starts with the current prefix, avoiding unnecessary substring operations.

### Algorithm
1. Build a Trie by inserting all words from the dictionary.
2. Use backtracking starting at index `0` with an empty path.
3. At each position, traverse the Trie character by character from the current index.
4. When reaching a node marked as a word end, add that word to the path and recurse on the remaining string.
5. If a character is not found in the Trie, stop exploring that branch early.
6. When index reaches the end, join the path and add to results. Backtrack by removing the last word.

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

### Intuition
The pure backtracking approach may recompute results for the same suffix multiple times. By caching the list of all valid sentences that can be formed starting from each index, we avoid redundant computation. When we encounter a starting position we have already processed, we simply return the cached result.

### Algorithm
1. Convert the dictionary to a set and create a `cache` dictionary.
2. Define a recursive function that returns all valid sentences from index `i` to end.
3. Base case: when `i` equals the string length, return a list containing an empty string.
4. If `i` is in the `cache`, return the cached result.
5. Try all substrings from `i` to end. For each valid dictionary word, get all sentences from the next position and prepend the current word.
6. Store the result in the `cache` before returning.

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

```go
func wordBreak(s string, wordDict []string) []string {
    wordSet := make(map[string]bool)
    for _, word := range wordDict {
        wordSet[word] = true
    }
    cache := make(map[int][]string)

    var backtrack func(i int) []string
    backtrack = func(i int) []string {
        if i == len(s) {
            return []string{""}
        }
        if cached, ok := cache[i]; ok {
            return cached
        }

        res := []string{}
        for j := i; j < len(s); j++ {
            w := s[i : j+1]
            if !wordSet[w] {
                continue
            }
            substrings := backtrack(j + 1)
            for _, substr := range substrings {
                sentence := w
                if substr != "" {
                    sentence += " " + substr
                }
                res = append(res, sentence)
            }
        }
        cache[i] = res
        return res
    }

    return backtrack(0)
}
```

```kotlin
class Solution {
    fun wordBreak(s: String, wordDict: List<String>): List<String> {
        val wordSet = wordDict.toHashSet()
        val cache = mutableMapOf<Int, List<String>>()

        fun backtrack(i: Int): List<String> {
            if (i == s.length) return listOf("")
            cache[i]?.let { return it }

            val res = mutableListOf<String>()
            for (j in i until s.length) {
                val w = s.substring(i, j + 1)
                if (w !in wordSet) continue

                val substrings = backtrack(j + 1)
                for (substr in substrings) {
                    val sentence = if (substr.isNotEmpty()) "$w $substr" else w
                    res.add(sentence)
                }
            }
            cache[i] = res
            return res
        }

        return backtrack(0)
    }
}
```

```swift
class Solution {
    func wordBreak(_ s: String, _ wordDict: [String]) -> [String] {
        let wordSet = Set(wordDict)
        var cache = [Int: [String]]()
        let chars = Array(s)

        func backtrack(_ i: Int) -> [String] {
            if i == chars.count {
                return [""]
            }
            if let cached = cache[i] {
                return cached
            }

            var res = [String]()
            for j in i..<chars.count {
                let w = String(chars[i...j])
                if !wordSet.contains(w) { continue }

                let substrings = backtrack(j + 1)
                for substr in substrings {
                    let sentence = substr.isEmpty ? w : "\(w) \(substr)"
                    res.append(sentence)
                }
            }
            cache[i] = res
            return res
        }

        return backtrack(0)
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

### Intuition
Instead of recursing from the start, we can build the solution iteratively from the beginning. For each position `i`, we store all valid sentences that can be formed using characters from index `0` to `i-1`. We extend existing sentences by appending new words when a valid dictionary word ends at position `i`.

### Algorithm
1. Create a DP array where `dp[i]` contains all valid sentences using the first `i` characters.
2. Initialize `dp[0]` with an empty string as the base case.
3. For each position `i` from `1` to `n`, check all possible last words ending at `i`.
4. If substring `s[j:i]` is in the dictionary and `dp[j]` is not empty, extend each sentence in `dp[j]` by appending the new word.
5. After processing all positions, `dp[n]` contains all valid segmentations of the entire string.

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

```go
func wordBreak(s string, wordDict []string) []string {
    wordSet := make(map[string]bool)
    for _, word := range wordDict {
        wordSet[word] = true
    }

    n := len(s)
    dp := make([][]string, n+1)
    for i := range dp {
        dp[i] = []string{}
    }
    dp[0] = []string{""}

    for i := 1; i <= n; i++ {
        for j := 0; j < i; j++ {
            word := s[j:i]
            if wordSet[word] {
                for _, sentence := range dp[j] {
                    if sentence == "" {
                        dp[i] = append(dp[i], word)
                    } else {
                        dp[i] = append(dp[i], sentence+" "+word)
                    }
                }
            }
        }
    }

    return dp[n]
}
```

```kotlin
class Solution {
    fun wordBreak(s: String, wordDict: List<String>): List<String> {
        val wordSet = wordDict.toHashSet()
        val n = s.length
        val dp = Array(n + 1) { mutableListOf<String>() }
        dp[0].add("")

        for (i in 1..n) {
            for (j in 0 until i) {
                val word = s.substring(j, i)
                if (word in wordSet) {
                    for (sentence in dp[j]) {
                        val space = if (sentence.isEmpty()) "" else " "
                        dp[i].add(sentence + space + word)
                    }
                }
            }
        }

        return dp[n]
    }
}
```

```swift
class Solution {
    func wordBreak(_ s: String, _ wordDict: [String]) -> [String] {
        let wordSet = Set(wordDict)
        let chars = Array(s)
        let n = chars.count
        var dp = [[String]](repeating: [String](), count: n + 1)
        dp[0] = [""]

        for i in 1...n {
            for j in 0..<i {
                let word = String(chars[j..<i])
                if wordSet.contains(word) {
                    for sentence in dp[j] {
                        if sentence.isEmpty {
                            dp[i].append(word)
                        } else {
                            dp[i].append("\(sentence) \(word)")
                        }
                    }
                }
            }
        }

        return dp[n]
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

### Intuition
This combines the benefits of Trie-based prefix matching with memoization. The Trie provides efficient character-by-character matching and early termination, while the `cache` prevents recomputation of results for the same starting positions. This is particularly effective when the dictionary contains many words with common prefixes.

### Algorithm
1. Build a Trie from all dictionary words.
2. Create a `cache` to store results for each starting index.
3. Define a recursive function that returns all sentences from index `i`.
4. At each index, traverse the Trie character by character while building words.
5. When a word boundary is found in the Trie, recursively get all suffixes and combine with the current word.
6. Cache and return the results. If a character is not in the Trie, terminate that branch early.

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

```go
type TrieNode struct {
    children map[rune]*TrieNode
    isWord   bool
}

func newTrieNode() *TrieNode {
    return &TrieNode{children: make(map[rune]*TrieNode)}
}

type Trie struct {
    root *TrieNode
}

func newTrie() *Trie {
    return &Trie{root: newTrieNode()}
}

func (t *Trie) addWord(word string) {
    curr := t.root
    for _, c := range word {
        if _, ok := curr.children[c]; !ok {
            curr.children[c] = newTrieNode()
        }
        curr = curr.children[c]
    }
    curr.isWord = true
}

func wordBreak(s string, wordDict []string) []string {
    trie := newTrie()
    for _, word := range wordDict {
        trie.addWord(word)
    }

    cache := make(map[int][]string)

    var backtrack func(index int) []string
    backtrack = func(index int) []string {
        if index == len(s) {
            return []string{""}
        }
        if cached, ok := cache[index]; ok {
            return cached
        }

        res := []string{}
        curr := trie.root

        for i := index; i < len(s); i++ {
            c := rune(s[i])
            if _, ok := curr.children[c]; !ok {
                break
            }
            curr = curr.children[c]
            if curr.isWord {
                for _, suffix := range backtrack(i + 1) {
                    if suffix == "" {
                        res = append(res, s[index:i+1])
                    } else {
                        res = append(res, s[index:i+1]+" "+suffix)
                    }
                }
            }
        }

        cache[index] = res
        return res
    }

    return backtrack(0)
}
```

```kotlin
class TrieNode {
    val children = mutableMapOf<Char, TrieNode>()
    var isWord = false
}

class Trie {
    val root = TrieNode()

    fun addWord(word: String) {
        var curr = root
        for (c in word) {
            curr = curr.children.getOrPut(c) { TrieNode() }
        }
        curr.isWord = true
    }
}

class Solution {
    fun wordBreak(s: String, wordDict: List<String>): List<String> {
        val trie = Trie()
        for (word in wordDict) {
            trie.addWord(word)
        }

        val cache = mutableMapOf<Int, List<String>>()

        fun backtrack(index: Int): List<String> {
            if (index == s.length) return listOf("")
            cache[index]?.let { return it }

            val res = mutableListOf<String>()
            var curr = trie.root

            for (i in index until s.length) {
                val c = s[i]
                curr = curr.children[c] ?: break
                if (curr.isWord) {
                    for (suffix in backtrack(i + 1)) {
                        if (suffix.isEmpty()) {
                            res.add(s.substring(index, i + 1))
                        } else {
                            res.add(s.substring(index, i + 1) + " " + suffix)
                        }
                    }
                }
            }

            cache[index] = res
            return res
        }

        return backtrack(0)
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
    func wordBreak(_ s: String, _ wordDict: [String]) -> [String] {
        let trie = Trie()
        for word in wordDict {
            trie.addWord(word)
        }

        let chars = Array(s)
        var cache = [Int: [String]]()

        func backtrack(_ index: Int) -> [String] {
            if index == chars.count {
                return [""]
            }
            if let cached = cache[index] {
                return cached
            }

            var res = [String]()
            var curr = trie.root

            for i in index..<chars.count {
                let c = chars[i]
                guard let next = curr.children[c] else { break }
                curr = next
                if curr.isWord {
                    for suffix in backtrack(i + 1) {
                        if suffix.isEmpty {
                            res.append(String(chars[index...i]))
                        } else {
                            res.append(String(chars[index...i]) + " " + suffix)
                        }
                    }
                }
            }

            cache[index] = res
            return res
        }

        return backtrack(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n * 2 ^ n)$
- Space complexity: $O(m + n * 2 ^ n)$

> Where $n$ is the length of the string $s$ and $m$ is the sum of the lengths of the strings in the $wordDict$.

---

## Common Pitfalls

### Not Handling the Base Case Correctly When Building Sentences
When recursion reaches the end of the string, returning an empty list `[]` instead of a list with an empty string `[""]` causes all valid sentences to be lost since there's nothing to append the last word to.

```python
# Wrong: returns empty list, loses all sentences
if i == len(s):
    return []

# Correct: returns list with empty string for concatenation
if i == len(s):
    return [""]
```

### Forgetting to Add Space Between Words
When concatenating words to form sentences, forgetting to add spaces between words results in malformed output like "catsand" instead of "cats and".

```python
# Wrong: no space between words
sentence = word + substr

# Correct: add space only if there's a suffix
sentence = word if not substr else word + " " + substr
```

### Using List Instead of Set for Dictionary Lookup
Checking if a substring exists in the word dictionary using a list results in O(m * t) lookup per check instead of O(t). This significantly slows down the solution.

```python
# Wrong: O(m * t) lookup per check
if s[i:j+1] in wordDict:  # wordDict is a list

# Correct: O(t) lookup with hash set
wordSet = set(wordDict)
if s[i:j+1] in wordSet:
```

### Not Memoizing Results Leading to TLE
Without memoization, the same suffix is recomputed many times, leading to exponential time complexity even when not necessary. This causes Time Limit Exceeded on inputs with many overlapping subproblems.

```python
# Wrong: recomputes same suffixes repeatedly
def backtrack(i):
    if i == len(s):
        return [""]
    res = []
    for j in range(i, len(s)):
        # ... no caching

# Correct: cache results for each starting index
def backtrack(i):
    if i in cache:
        return cache[i]
    # ... compute and store in cache[i]
```

### Modifying Shared State Without Proper Backtracking
When using a shared list to build the current path, forgetting to pop the last word after recursion corrupts the path for other branches.

```python
# Wrong: path keeps growing incorrectly
cur.append(word)
backtrack(j + 1)
# forgot to pop!

# Correct: restore state after recursion
cur.append(word)
backtrack(j + 1)
cur.pop()
```
