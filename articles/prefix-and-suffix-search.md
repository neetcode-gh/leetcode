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

```csharp
public class WordFilter {
    private string[] words;

    public WordFilter(string[] words) {
        this.words = words;
    }

    public int F(string pref, string suff) {
        for (int i = words.Length - 1; i >= 0; i--) {
            string w = words[i];
            if (w.Length < pref.Length || w.Length < suff.Length) {
                continue;
            }

            bool flag = true;
            for (int j = 0; j < pref.Length; j++) {
                if (w[j] != pref[j]) {
                    flag = false;
                    break;
                }
            }

            if (!flag) {
                continue;
            }

            int idx = w.Length - suff.Length;
            for (int k = 0; k < suff.Length; k++) {
                if (w[idx + k] != suff[k]) {
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

```go
type WordFilter struct {
    words []string
}

func Constructor(words []string) WordFilter {
    return WordFilter{words: words}
}

func (this *WordFilter) F(pref string, suff string) int {
    for i := len(this.words) - 1; i >= 0; i-- {
        w := this.words[i]
        if len(w) < len(pref) || len(w) < len(suff) {
            continue
        }

        flag := true
        for j := 0; j < len(pref); j++ {
            if w[j] != pref[j] {
                flag = false
                break
            }
        }

        if !flag {
            continue
        }

        idx := len(w) - len(suff)
        for k := 0; k < len(suff); k++ {
            if w[idx+k] != suff[k] {
                flag = false
                break
            }
        }

        if flag {
            return i
        }
    }

    return -1
}
```

```kotlin
class WordFilter(words: Array<String>) {
    private val words = words

    fun f(pref: String, suff: String): Int {
        for (i in words.size - 1 downTo 0) {
            val w = words[i]
            if (w.length < pref.length || w.length < suff.length) {
                continue
            }

            var flag = true
            for (j in pref.indices) {
                if (w[j] != pref[j]) {
                    flag = false
                    break
                }
            }

            if (!flag) {
                continue
            }

            val idx = w.length - suff.length
            for (k in suff.indices) {
                if (w[idx + k] != suff[k]) {
                    flag = false
                    break
                }
            }

            if (flag) {
                return i
            }
        }

        return -1
    }
}
```

```swift
class WordFilter {
    private let words: [String]

    init(_ words: [String]) {
        self.words = words
    }

    func f(_ pref: String, _ suff: String) -> Int {
        for i in stride(from: words.count - 1, through: 0, by: -1) {
            let w = words[i]
            if w.count < pref.count || w.count < suff.count {
                continue
            }

            let wArr = Array(w)
            let prefArr = Array(pref)
            let suffArr = Array(suff)

            var flag = true
            for j in 0..<prefArr.count {
                if wArr[j] != prefArr[j] {
                    flag = false
                    break
                }
            }

            if !flag {
                continue
            }

            let idx = wArr.count - suffArr.count
            for k in 0..<suffArr.count {
                if wArr[idx + k] != suffArr[k] {
                    flag = false
                    break
                }
            }

            if flag {
                return i
            }
        }

        return -1
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

```csharp
public class WordFilter {
    private Dictionary<string, int> mp;

    public WordFilter(string[] words) {
        mp = new Dictionary<string, int>();
        for (int i = 0; i < words.Length; i++) {
            string w = words[i];
            for (int j = 0; j < w.Length; j++) {
                string pref = w.Substring(0, j + 1);
                for (int k = 0; k < w.Length; k++) {
                    string cur = pref + "$" + w.Substring(k);
                    mp[cur] = i;
                }
            }
        }
    }

    public int F(string pref, string suff) {
        string s = pref + "$" + suff;
        return mp.ContainsKey(s) ? mp[s] : -1;
    }
}
```

```go
type WordFilter struct {
    mp map[string]int
}

func Constructor(words []string) WordFilter {
    mp := make(map[string]int)
    for i, w := range words {
        for j := 0; j < len(w); j++ {
            pref := w[:j+1]
            for k := 0; k < len(w); k++ {
                cur := pref + "$" + w[k:]
                mp[cur] = i
            }
        }
    }
    return WordFilter{mp: mp}
}

func (this *WordFilter) F(pref string, suff string) int {
    s := pref + "$" + suff
    if val, exists := this.mp[s]; exists {
        return val
    }
    return -1
}
```

```kotlin
class WordFilter(words: Array<String>) {
    private val mp = HashMap<String, Int>()

    init {
        for ((i, w) in words.withIndex()) {
            for (j in 0 until w.length) {
                val pref = w.substring(0, j + 1)
                for (k in 0 until w.length) {
                    val cur = pref + "$" + w.substring(k)
                    mp[cur] = i
                }
            }
        }
    }

    fun f(pref: String, suff: String): Int {
        val s = pref + "$" + suff
        return mp[s] ?: -1
    }
}
```

```swift
class WordFilter {
    private var mp = [String: Int]()

    init(_ words: [String]) {
        for (i, w) in words.enumerated() {
            let wArr = Array(w)
            for j in 0..<wArr.count {
                let pref = String(wArr[0...j])
                for k in 0..<wArr.count {
                    let cur = pref + "$" + String(wArr[k...])
                    mp[cur] = i
                }
            }
        }
    }

    func f(_ pref: String, _ suff: String) -> Int {
        let s = pref + "$" + suff
        return mp[s] ?? -1
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

```csharp
public class TrieNode {
    public TrieNode[] children;
    public int index;

    public TrieNode() {
        children = new TrieNode[27];
        index = -1;
    }
}

public class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void AddWord(string word, int i) {
        TrieNode cur = root;
        foreach (char ch in word) {
            int c = ch == '{' ? 26 : ch - 'a';
            if (cur.children[c] == null) {
                cur.children[c] = new TrieNode();
            }
            cur = cur.children[c];
        }
        cur.index = i;
    }

    public int Search(string word) {
        TrieNode cur = root;
        foreach (char ch in word) {
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
    private const char CHAR = '{';

    public WordFilter(string[] words) {
        trie = new Trie();
        for (int i = 0; i < words.Length; i++) {
            string word = words[i];
            int wLen = word.Length;
            for (int j = 0; j < wLen; j++) {
                string suffix = word.Substring(j);
                for (int k = 0; k <= wLen; k++) {
                    string prefix = word.Substring(0, k);
                    trie.AddWord(suffix + CHAR + prefix, i);
                }
            }
        }
    }

    public int F(string pref, string suff) {
        return trie.Search(suff + CHAR + pref);
    }
}
```

```go
type TrieNode struct {
    children [27]*TrieNode
    index    int
}

func NewTrieNode() *TrieNode {
    return &TrieNode{index: -1}
}

type Trie struct {
    root *TrieNode
}

func NewTrie() *Trie {
    return &Trie{root: NewTrieNode()}
}

func (t *Trie) AddWord(word string, i int) {
    cur := t.root
    for _, ch := range word {
        c := int(ch - 'a')
        if ch == '{' {
            c = 26
        }
        if cur.children[c] == nil {
            cur.children[c] = NewTrieNode()
        }
        cur = cur.children[c]
    }
    cur.index = i
}

func (t *Trie) Search(word string) int {
    cur := t.root
    for _, ch := range word {
        c := int(ch - 'a')
        if ch == '{' {
            c = 26
        }
        if cur.children[c] == nil {
            return -1
        }
        cur = cur.children[c]
    }
    return cur.index
}

type WordFilter struct {
    trie *Trie
}

func Constructor(words []string) WordFilter {
    trie := NewTrie()
    charSep := "{"
    for i, word := range words {
        wLen := len(word)
        for j := 0; j < wLen; j++ {
            suffix := word[j:]
            for k := 0; k <= wLen; k++ {
                prefix := word[:k]
                trie.AddWord(suffix+charSep+prefix, i)
            }
        }
    }
    return WordFilter{trie: trie}
}

func (this *WordFilter) F(pref string, suff string) int {
    return this.trie.Search(suff + "{" + pref)
}
```

```kotlin
class TrieNode {
    val children = arrayOfNulls<TrieNode>(27)
    var index = -1
}

class Trie {
    private val root = TrieNode()

    fun addWord(word: String, i: Int) {
        var cur = root
        for (ch in word) {
            val c = if (ch == '{') 26 else ch - 'a'
            if (cur.children[c] == null) {
                cur.children[c] = TrieNode()
            }
            cur = cur.children[c]!!
        }
        cur.index = i
    }

    fun search(word: String): Int {
        var cur = root
        for (ch in word) {
            val c = if (ch == '{') 26 else ch - 'a'
            if (cur.children[c] == null) {
                return -1
            }
            cur = cur.children[c]!!
        }
        return cur.index
    }
}

class WordFilter(words: Array<String>) {
    private val trie = Trie()
    private val charSep = '{'

    init {
        for ((i, word) in words.withIndex()) {
            val wLen = word.length
            for (j in 0 until wLen) {
                val suffix = word.substring(j)
                for (k in 0..wLen) {
                    val prefix = word.substring(0, k)
                    trie.addWord(suffix + charSep + prefix, i)
                }
            }
        }
    }

    fun f(pref: String, suff: String): Int {
        return trie.search(suff + charSep + pref)
    }
}
```

```swift
class TrieNode {
    var children = [TrieNode?](repeating: nil, count: 27)
    var index = -1
}

class Trie {
    private let root = TrieNode()

    func addWord(_ word: String, _ i: Int) {
        var cur = root
        for ch in word {
            let c = ch == "{" ? 26 : Int(ch.asciiValue! - Character("a").asciiValue!)
            if cur.children[c] == nil {
                cur.children[c] = TrieNode()
            }
            cur = cur.children[c]!
        }
        cur.index = i
    }

    func search(_ word: String) -> Int {
        var cur = root
        for ch in word {
            let c = ch == "{" ? 26 : Int(ch.asciiValue! - Character("a").asciiValue!)
            if cur.children[c] == nil {
                return -1
            }
            cur = cur.children[c]!
        }
        return cur.index
    }
}

class WordFilter {
    private let trie = Trie()
    private let charSep: Character = "{"

    init(_ words: [String]) {
        for (i, word) in words.enumerated() {
            let wLen = word.count
            let wArr = Array(word)
            for j in 0..<wLen {
                let suffix = String(wArr[j...])
                for k in 0...wLen {
                    let prefix = String(wArr[0..<k])
                    trie.addWord(suffix + String(charSep) + prefix, i)
                }
            }
        }
    }

    func f(_ pref: String, _ suff: String) -> Int {
        return trie.search(suff + String(charSep) + pref)
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
