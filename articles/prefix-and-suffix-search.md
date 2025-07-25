## 1. Brute Force

::tabs-start

```python
class WordFilter:

    def __init__(self, words: List[str]):
        self.words = words

    def f(self, pref: str, suff: str) -> int:
        for i in range(len(self.words) - 1, -1, -1):
            w = self.words[i]
            if len(w) < len(pref) or len(w) < len(suff):
                continue

            j, flag = 0, True
            for c in pref:
                if w[j] != c:
                    flag = False
                    break
                j += 1

            if not flag:
                continue

            j = len(w) - len(suff)
            for c in suff:
                if w[j] != c:
                    flag = False
                    break
                j += 1

            if flag:
                return i

        return -1
```

```java
public class WordFilter {
    private String[] words;

    public WordFilter(String[] words) {
        this.words = words;
    }

    public int f(String pref, String suff) {
        for (int i = words.length - 1; i >= 0; i--) {
            String w = words[i];
            if (w.length() < pref.length() || w.length() < suff.length()) {
                continue;
            }

            boolean flag = true;
            for (int j = 0; j < pref.length(); j++) {
                if (w.charAt(j) != pref.charAt(j)) {
                    flag = false;
                    break;
                }
            }

            if (!flag) {
                continue;
            }

            int j = w.length() - suff.length();
            for (int k = 0; k < suff.length(); k++) {
                if (w.charAt(j + k) != suff.charAt(k)) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                return i;
            }
        }

        return -1;
    }
}
```

```cpp
class WordFilter {
private:
    vector<string> words;

public:
    WordFilter(vector<string>& words) {
        this->words = words;
    }

    int f(string pref, string suff) {
        for (int i = words.size() - 1; i >= 0; i--) {
            const string& w = words[i];
            if (w.size() < pref.size() || w.size() < suff.size()) {
                continue;
            }

            bool flag = true;
            for (int j = 0; j < pref.size(); j++) {
                if (w[j] != pref[j]) {
                    flag = false;
                    break;
                }
            }

            if (!flag) {
                continue;
            }

            int j = w.size() - suff.size();
            for (int k = 0; k < suff.size(); k++) {
                if (w[j + k] != suff[k]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                return i;
            }
        }

        return -1;
    }
};
```

```javascript
class WordFilter {
    /**
     * @constructor
     * @param {string[]} words
     */
    constructor(words) {
        this.words = words;
    }

    /**
     * @param {string} pref
     * @param {string} suff
     * @return {number}
     */
    f(pref, suff) {
        for (let i = this.words.length - 1; i >= 0; i--) {
            const w = this.words[i];
            if (w.length < pref.length || w.length < suff.length) {
                continue;
            }

            let flag = true;
            for (let j = 0; j < pref.length; j++) {
                if (w[j] !== pref[j]) {
                    flag = false;
                    break;
                }
            }

            if (!flag) {
                continue;
            }

            let j = w.length - suff.length;
            for (let k = 0; k < suff.length; k++) {
                if (w[j + k] !== suff[k]) {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                return i;
            }
        }

        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N * m * n)$
- Space complexity: $O(1)$ extra space.

> Where $N$ is the number $f()$ function calls, $n$ is the number of words, and $m$ is the average length of each word.

---

## 2. Hash Map

::tabs-start

```python
class WordFilter:

    def __init__(self, words: List[str]):
        self.mp = {}
        for i, w in enumerate(words):
            for j in range(len(w)):
                pref = w[:j + 1]
                for k in range(len(w)):
                    cur = pref + "$" + w[k:]
                    self.mp[cur] = i

    def f(self, pref: str, suff: str) -> int:
        s = pref + "$" + suff
        if s not in self.mp:
            return -1

        return self.mp[s]
```

```java
public class WordFilter {
    private Map<String, Integer> mp;

    public WordFilter(String[] words) {
        mp = new HashMap<>();
        for (int i = 0; i < words.length; i++) {
            String w = words[i];
            for (int j = 0; j < w.length(); j++) {
                String pref = w.substring(0, j + 1);
                for (int k = 0; k < w.length(); k++) {
                    String cur = pref + "$" + w.substring(k);
                    mp.put(cur, i);
                }
            }
        }
    }

    public int f(String pref, String suff) {
        String s = pref + "$" + suff;
        return mp.getOrDefault(s, -1);
    }
}
```

```cpp
class WordFilter {
private:
    unordered_map<string, int> mp;

public:
    WordFilter(vector<string>& words) {
        for (int i = 0; i < words.size(); i++) {
            string w = words[i];
            for (int j = 0; j < w.size(); j++) {
                string pref = w.substr(0, j + 1);
                for (int k = 0; k < w.size(); k++) {
                    string cur = pref + "$" + w.substr(k);
                    mp[cur] = i;
                }
            }
        }
    }

    int f(string pref, string suff) {
        string s = pref + "$" + suff;
        if (mp.find(s) == mp.end()) {
            return -1;
        }
        return mp[s];
    }
};
```

```javascript
class WordFilter {
    /**
     * @constructor
     * @param {string[]} words
     */
    constructor(words) {
        this.mp = new Map();
        for (let i = 0; i < words.length; i++) {
            const w = words[i];
            for (let j = 0; j < w.length; j++) {
                const pref = w.slice(0, j + 1);
                for (let k = 0; k < w.length; k++) {
                    const cur = pref + '$' + w.slice(k);
                    this.mp.set(cur, i);
                }
            }
        }
    }

    /**
     * @param {string} pref
     * @param {string} suff
     * @return {number}
     */
    f(pref, suff) {
        const s = pref + '$' + suff;
        return this.mp.has(s) ? this.mp.get(s) : -1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n * m ^ 3)$ time for initialization.
    - $O(m)$ for each $f()$ function call.
- Space complexity: $O(n * m ^ 3)$

> Where $n$ is the number of words and $m$ is the average length of each word.

---

## 3. Trie

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = [None] * 27
        self.index = -1

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, w, i):
        cur = self.root
        for ch in w:
            c = ord(ch) - ord('a')
            if not cur.children[c]:
                cur.children[c] = TrieNode()
            cur = cur.children[c]
        cur.index = i

    def search(self, w):
        cur = self.root
        for ch in w:
            c = ord(ch) - ord('a')
            if not cur.children[c]:
                return -1
            cur = cur.children[c]
        return cur.index

class WordFilter:
    def __init__(self, words: List[str]):
        self.trie = Trie()
        self.CHAR = '{'
        for i, w in enumerate(words):
            w_len = len(w)
            for j in range(w_len):
                suffix = w[j:]
                for k in range(w_len + 1):
                    prefix = w[:k]
                    self.trie.addWord(suffix + self.CHAR + prefix, i)

    def f(self, pref: str, suff: str) -> int:
        return self.trie.search(suff + self.CHAR + pref)
```

```java
class TrieNode {
    TrieNode[] children;
    int index;

    TrieNode() {
        children = new TrieNode[27];
        index = -1;
    }
}

class Trie {
    private TrieNode root;

    Trie() {
        root = new TrieNode();
    }

    void addWord(String word, int i) {
        TrieNode cur = root;
        for (char ch : word.toCharArray()) {
            int c = ch == '{' ? 26 : ch - 'a';
            if (cur.children[c] == null) {
                cur.children[c] = new TrieNode();
            }
            cur = cur.children[c];
        }
        cur.index = i;
    }

    int search(String word) {
        TrieNode cur = root;
        for (char ch : word.toCharArray()) {
            int c = ch == '{' ? 26 : ch - 'a';
            if (cur.children[c] == null) {
                return -1;
            }
            cur = cur.children[c];
        }
        return cur.index;
    }
}

public class WordFilter {
    private Trie trie;
    private static final char CHAR = '{';

    public WordFilter(String[] words) {
        trie = new Trie();
        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            int wLen = word.length();
            for (int j = 0; j < wLen; j++) {
                String suffix = word.substring(j);
                for (int k = 0; k <= wLen; k++) {
                    String prefix = word.substring(0, k);
                    trie.addWord(suffix + CHAR + prefix, i);
                }
            }
        }
    }

    public int f(String pref, String suff) {
        return trie.search(suff + CHAR + pref);
    }
}
```

```cpp
class TrieNode {
public:
    TrieNode* children[27];
    int index;

    TrieNode() {
        for (int i = 0; i < 27; i++) {
            children[i] = nullptr;
        }
        index = -1;
    }
};

class Trie {
private:
    TrieNode* root;

public:
    Trie() {
        root = new TrieNode();
    }

    void addWord(const string& word, int i) {
        TrieNode* cur = root;
        for (char ch : word) {
            int c = (ch == '{') ? 26 : (ch - 'a');
            if (cur->children[c] == nullptr) {
                cur->children[c] = new TrieNode();
            }
            cur = cur->children[c];
        }
        cur->index = i;
    }

    int search(const string& word) {
        TrieNode* cur = root;
        for (char ch : word) {
            int c = (ch == '{') ? 26 : (ch - 'a');
            if (cur->children[c] == nullptr) {
                return -1;
            }
            cur = cur->children[c];
        }
        return cur->index;
    }
};

class WordFilter {
private:
    Trie trie;
    const char CHAR = '{';

public:
    WordFilter(vector<string>& words) {
        for (int i = 0; i < words.size(); i++) {
            string word = words[i];
            int wLen = word.length();
            for (int j = 0; j < wLen; j++) {
                string suffix = word.substr(j);
                for (int k = 0; k <= wLen; k++) {
                    string prefix = word.substr(0, k);
                    trie.addWord(suffix + CHAR + prefix, i);
                }
            }
        }
    }

    int f(string pref, string suff) {
        return trie.search(suff + CHAR + pref);
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = Array(27).fill(null);
        this.index = -1;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} word
     * @param {number} i
     * @return {void}
     */
    addWord(word, i) {
        let cur = this.root;
        for (const ch of word) {
            const c = ch === '{' ? 26 : ch.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!cur.children[c]) {
                cur.children[c] = new TrieNode();
            }
            cur = cur.children[c];
        }
        cur.index = i;
    }

    /**
     * @param {string} word
     * @return {number}
     */
    search(word) {
        let cur = this.root;
        for (const ch of word) {
            const c = ch === '{' ? 26 : ch.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!cur.children[c]) {
                return -1;
            }
            cur = cur.children[c];
        }
        return cur.index;
    }
}

class WordFilter {
    /**
     * @constructor
     * @param {string[]} words
     */
    constructor(words) {
        this.trie = new Trie();
        this.CHAR = '{';
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const wLen = word.length;
            for (let j = 0; j < wLen; j++) {
                const suffix = word.substring(j);
                for (let k = 0; k <= wLen; k++) {
                    const prefix = word.substring(0, k);
                    this.trie.addWord(suffix + this.CHAR + prefix, i);
                }
            }
        }
    }

    /**
     * @param {string} pref
     * @param {string} suff
     * @return {number}
     */
    f(pref, suff) {
        return this.trie.search(suff + this.CHAR + pref);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n * m ^ 3)$ time for initialization.
    - $O(m)$ for each $f()$ function call.
- Space complexity: $O(n * m ^ 3)$

> Where $n$ is the number of words and $m$ is the average length of each word.
