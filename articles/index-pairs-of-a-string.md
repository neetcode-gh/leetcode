## 1. Brute Force

::tabs-start

```python
class Solution:
    def indexPairs(self, text: str, words: List[str]) -> List[List[int]]:
        n = len(text)
        res = []
        for word in words:
            for i in range(n - len(word) + 1):
                if text[i:i + len(word)] == word:
                    res.append([i, i + len(word) - 1])
        res.sort()
        return res
```

```java
public class Solution {
    public int[][] indexPairs(String text, String[] words) {
        int n = text.length();
        List<int[]> res = new ArrayList<>();
        for (String word : words) {
            for (int i = 0; i + word.length() <= n; i++) {
                if (text.startsWith(word, i)) {
                    res.add(new int[] { i, i + word.length() - 1 });
                }
            }
        }
        res.sort((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
        return res.toArray(new int[0][]);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> indexPairs(string text, vector<string>& words) {
        int n = text.size();
        vector<vector<int>> res;
        for (const string& word : words) {
            int len = word.size();
            for (int i = 0; i + len <= n; i++) {
                if (text.compare(i, len, word) == 0) {
                    res.push_back({i, i + len - 1});
                }
            }
        }
        sort(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} text
     * @param {string[]} words
     * @return {number[][]}
     */
    indexPairs(text, words) {
        const n = text.length;
        const res = [];
        for (const word of words) {
            for (let i = 0; i + word.length <= n; i++) {
                if (text.startsWith(word, i)) {
                    res.push([i, i + word.length - 1]);
                }
            }
        }
        res.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] IndexPairs(string text, string[] words) {
        int n = text.Length;
        List<int[]> res = new List<int[]>();
        foreach (string word in words) {
            for (int i = 0; i + word.Length <= n; i++) {
                if (string.CompareOrdinal(text, i, word, 0, word.Length) == 0) {
                    res.Add(new int[] { i, i + word.Length - 1 });
                }
            }
        }
        res.Sort((a, b) => a[0] != b[0] ? a[0].CompareTo(b[0]) : a[1].CompareTo(b[1]));
        return res.ToArray();
    }
}
```

```go
func indexPairs(text string, words []string) [][]int {
    n := len(text)
    res := [][]int{}
    for _, word := range words {
        for i := 0; i+len(word) <= n; i++ {
            if text[i:i+len(word)] == word {
                res = append(res, []int{i, i + len(word) - 1})
            }
        }
    }
    sort.Slice(res, func(a, b int) bool {
        if res[a][0] != res[b][0] {
            return res[a][0] < res[b][0]
        }
        return res[a][1] < res[b][1]
    })
    return res
}
```

```kotlin
class Solution {
    fun indexPairs(text: String, words: Array<String>): Array<IntArray> {
        val n = text.length
        val res = mutableListOf<IntArray>()
        for (word in words) {
            for (i in 0..n - word.length) {
                if (text.startsWith(word, i)) {
                    res.add(intArrayOf(i, i + word.length - 1))
                }
            }
        }
        res.sortWith(compareBy({ it[0] }, { it[1] }))
        return res.toTypedArray()
    }
}
```

```swift
class Solution {
    func indexPairs(_ text: String, _ words: [String]) -> [[Int]] {
        let chars = Array(text)
        let n = chars.count
        var res = [[Int]]()
        for word in words {
            let w = Array(word)
            for i in stride(from: 0, through: n - w.count, by: 1) {
                if Array(chars[i..<(i + w.count)]) == w {
                    res.append([i, i + w.count - 1])
                }
            }
        }
        res.sort { $0[0] != $1[0] ? $0[0] < $1[0] : $0[1] < $1[1] }
        return res
    }
}
```

```rust
impl Solution {
    pub fn index_pairs(text: String, words: Vec<String>) -> Vec<Vec<i32>> {
        let t = text.as_bytes();
        let n = t.len();
        let mut res = Vec::new();
        for word in &words {
            let w = word.as_bytes();
            if w.len() > n {
                continue;
            }
            for i in 0..=n - w.len() {
                if &t[i..i + w.len()] == w {
                    res.push(vec![i as i32, (i + w.len() - 1) as i32]);
                }
            }
        }
        res.sort();
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} text
     * @param {string[]} words
     * @return {number[][]}
     */
    indexPairs(text: string, words: string[]): number[][] {
        const n = text.length;
        const res: number[][] = [];
        for (const word of words) {
            for (let i = 0; i + word.length <= n; i++) {
                if (text.startsWith(word, i)) {
                    res.push([i, i + word.length - 1]);
                }
            }
        }
        res.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * k + p \log p)$
- Space complexity: $O(p)$

> Where $n$ is the length of the string $text$, $m$ is the number of words, $k$ is the average length of a word, and $p$ is the number of index pairs in the output.

---

## 2. Hash Set

::tabs-start

```python
class Solution:
    def indexPairs(self, text: str, words: List[str]) -> List[List[int]]:
        wordSet = set(words)
        n = len(text)
        res = []
        for i in range(n):
            for j in range(i, n):
                if text[i:j + 1] in wordSet:
                    res.append([i, j])
        return res
```

```java
public class Solution {
    public int[][] indexPairs(String text, String[] words) {
        Set<String> wordSet = new HashSet<>(Arrays.asList(words));
        int n = text.length();
        List<int[]> res = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                if (wordSet.contains(text.substring(i, j + 1))) {
                    res.add(new int[] { i, j });
                }
            }
        }
        return res.toArray(new int[0][]);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> indexPairs(string text, vector<string>& words) {
        unordered_set<string> wordSet(words.begin(), words.end());
        int n = text.size();
        vector<vector<int>> res;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                if (wordSet.count(text.substr(i, j - i + 1))) {
                    res.push_back({i, j});
                }
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} text
     * @param {string[]} words
     * @return {number[][]}
     */
    indexPairs(text, words) {
        const wordSet = new Set(words);
        const n = text.length;
        const res = [];
        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                if (wordSet.has(text.slice(i, j + 1))) {
                    res.push([i, j]);
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] IndexPairs(string text, string[] words) {
        HashSet<string> wordSet = new HashSet<string>(words);
        int n = text.Length;
        List<int[]> res = new List<int[]>();
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                if (wordSet.Contains(text.Substring(i, j - i + 1))) {
                    res.Add(new int[] { i, j });
                }
            }
        }
        return res.ToArray();
    }
}
```

```go
func indexPairs(text string, words []string) [][]int {
    wordSet := map[string]bool{}
    for _, word := range words {
        wordSet[word] = true
    }
    n := len(text)
    res := [][]int{}
    for i := 0; i < n; i++ {
        for j := i; j < n; j++ {
            if wordSet[text[i:j+1]] {
                res = append(res, []int{i, j})
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun indexPairs(text: String, words: Array<String>): Array<IntArray> {
        val wordSet = words.toHashSet()
        val n = text.length
        val res = mutableListOf<IntArray>()
        for (i in 0 until n) {
            for (j in i until n) {
                if (text.substring(i, j + 1) in wordSet) {
                    res.add(intArrayOf(i, j))
                }
            }
        }
        return res.toTypedArray()
    }
}
```

```swift
class Solution {
    func indexPairs(_ text: String, _ words: [String]) -> [[Int]] {
        let wordSet = Set(words)
        let chars = Array(text)
        let n = chars.count
        var res = [[Int]]()
        for i in 0..<n {
            for j in i..<n {
                if wordSet.contains(String(chars[i...j])) {
                    res.append([i, j])
                }
            }
        }
        return res
    }
}
```

```rust
use std::collections::HashSet;

impl Solution {
    pub fn index_pairs(text: String, words: Vec<String>) -> Vec<Vec<i32>> {
        let word_set: HashSet<&str> = words.iter().map(|w| w.as_str()).collect();
        let n = text.len();
        let mut res = Vec::new();
        for i in 0..n {
            for j in i..n {
                if word_set.contains(&text[i..=j]) {
                    res.push(vec![i as i32, j as i32]);
                }
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} text
     * @param {string[]} words
     * @return {number[][]}
     */
    indexPairs(text: string, words: string[]): number[][] {
        const wordSet = new Set<string>(words);
        const n = text.length;
        const res: number[][] = [];
        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                if (wordSet.has(text.slice(i, j + 1))) {
                    res.push([i, j]);
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * k + n ^ 3)$
- Space complexity: $O(m * k)$

> Where $n$ is the length of the string $text$, $m$ is the number of words, and $k$ is the average length of a word.

---

## 3. Trie

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
    def indexPairs(self, text: str, words: List[str]) -> List[List[int]]:
        trie = Trie()
        for w in words:
            trie.addWord(w)

        n = len(text)
        res = []
        for i in range(n):
            curr = trie.root
            for j in range(i, n):
                if text[j] not in curr.children:
                    break
                curr = curr.children[text[j]]
                if curr.isWord:
                    res.append([i, j])

        return res
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
    public int[][] indexPairs(String text, String[] words) {
        Trie trie = new Trie();
        for (String word : words) {
            trie.addWord(word);
        }

        int n = text.length();
        List<int[]> res = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            TrieNode curr = trie.root;

            for (int j = i; j < n; j++) {
                if (curr.children[text.charAt(j) - 'a'] == null) break;
                curr = curr.children[text.charAt(j) - 'a'];
                if (curr.isWord) {
                    res.add(new int[] { i, j });
                }
            }
        }

        return res.toArray(new int[0][]);
    }
}
```

```cpp
class TrieNode {
public:
    TrieNode* children[26];
    bool isWord;

    TrieNode() {
        for (int i = 0; i < 26; ++i) {
            children[i] = nullptr;
        }
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
    vector<vector<int>> indexPairs(string text, vector<string>& words) {
        Trie trie;
        for (const string& word : words) {
            trie.addWord(word);
        }

        int n = text.size();
        vector<vector<int>> res;
        for (int i = 0; i < n; ++i) {
            TrieNode* curr = trie.root;

            for (int j = i; j < n; ++j) {
                if (!curr->children[text[j] - 'a']) break;
                curr = curr->children[text[j] - 'a'];
                if (curr->isWord) {
                    res.push_back({i, j});
                }
            }
        }

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
     * @param {string} text
     * @param {string[]} words
     * @return {number[][]}
     */
    indexPairs(text, words) {
        const trie = new Trie();
        for (const word of words) {
            trie.addWord(word);
        }

        const n = text.length;
        const res = [];
        for (let i = 0; i < n; i++) {
            let curr = trie.root;

            for (let j = i; j < n; j++) {
                if (!curr.children[text[j]]) break;
                curr = curr.children[text[j]];
                if (curr.isWord) {
                    res.push([i, j]);
                }
            }
        }

        return res;
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
    public int[][] IndexPairs(string text, string[] words) {
        Trie trie = new Trie();
        foreach (string word in words) {
            trie.AddWord(word);
        }

        int n = text.Length;
        List<int[]> res = new List<int[]>();
        for (int i = 0; i < n; i++) {
            TrieNode curr = trie.Root;

            for (int j = i; j < n; j++) {
                int idx = text[j] - 'a';
                if (curr.Children[idx] == null) break;
                curr = curr.Children[idx];
                if (curr.IsWord) {
                    res.Add(new int[] { i, j });
                }
            }
        }

        return res.ToArray();
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

func indexPairs(text string, words []string) [][]int {
    trie := newTrie()
    for _, word := range words {
        trie.addWord(word)
    }

    n := len(text)
    res := [][]int{}
    for i := 0; i < n; i++ {
        curr := trie.root

        for j := i; j < n; j++ {
            idx := text[j] - 'a'
            if curr.children[idx] == nil {
                break
            }
            curr = curr.children[idx]
            if curr.isWord {
                res = append(res, []int{i, j})
            }
        }
    }

    return res
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
    fun indexPairs(text: String, words: Array<String>): Array<IntArray> {
        val trie = Trie()
        for (word in words) {
            trie.addWord(word)
        }

        val n = text.length
        val res = mutableListOf<IntArray>()
        for (i in 0 until n) {
            var curr = trie.root

            for (j in i until n) {
                val idx = text[j] - 'a'
                if (curr.children[idx] == null) break
                curr = curr.children[idx]!!
                if (curr.isWord) {
                    res.add(intArrayOf(i, j))
                }
            }
        }

        return res.toTypedArray()
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
    func indexPairs(_ text: String, _ words: [String]) -> [[Int]] {
        let trie = Trie()
        for word in words {
            trie.addWord(word)
        }

        let chars = Array(text)
        let n = chars.count
        var res = [[Int]]()
        for i in 0..<n {
            var curr = trie.root

            for j in i..<n {
                guard let next = curr.children[chars[j]] else { break }
                curr = next
                if curr.isWord {
                    res.append([i, j])
                }
            }
        }

        return res
    }
}
```

```rust
struct TrieNode {
    children: [Option<Box<TrieNode>>; 26],
    is_word: bool,
}

impl TrieNode {
    fn new() -> Self {
        TrieNode {
            children: Default::default(),
            is_word: false,
        }
    }
}

struct Trie {
    root: TrieNode,
}

impl Trie {
    fn new() -> Self {
        Trie { root: TrieNode::new() }
    }

    fn add_word(&mut self, word: &str) {
        let mut curr = &mut self.root;
        for &b in word.as_bytes() {
            let idx = (b - b'a') as usize;
            curr = curr.children[idx].get_or_insert_with(|| Box::new(TrieNode::new()));
        }
        curr.is_word = true;
    }
}

impl Solution {
    pub fn index_pairs(text: String, words: Vec<String>) -> Vec<Vec<i32>> {
        let mut trie = Trie::new();
        for word in &words {
            trie.add_word(word);
        }

        let t = text.as_bytes();
        let n = t.len();
        let mut res = Vec::new();
        for i in 0..n {
            let mut curr = &trie.root;

            for j in i..n {
                let idx = (t[j] - b'a') as usize;
                match &curr.children[idx] {
                    Some(next) => curr = next,
                    None => break,
                }
                if curr.is_word {
                    res.push(vec![i as i32, j as i32]);
                }
            }
        }

        res
    }
}
```

```typescript
class TrieNode {
    children: { [key: string]: TrieNode };
    isWord: boolean;

    constructor() {
        this.children = {};
        this.isWord = false;
    }
}

class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word: string): void {
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
     * @param {string} text
     * @param {string[]} words
     * @return {number[][]}
     */
    indexPairs(text: string, words: string[]): number[][] {
        const trie = new Trie();
        for (const word of words) {
            trie.addWord(word);
        }

        const n = text.length;
        const res: number[][] = [];
        for (let i = 0; i < n; i++) {
            let curr = trie.root;

            for (let j = i; j < n; j++) {
                if (!curr.children[text[j]]) break;
                curr = curr.children[text[j]];
                if (curr.isWord) {
                    res.push([i, j]);
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * k + n ^ 2)$
- Space complexity: $O(m * k)$

> Where $n$ is the length of the string $text$, $m$ is the number of words, and $k$ is the average length of a word.
