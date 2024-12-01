## 1. Brute Force

::tabs-start

```python
class WordDictionary:

    def __init__(self):
        self.store = []

    def addWord(self, word: str) -> None:
        self.store.append(word)

    def search(self, word: str) -> bool:
        for w in self.store:
            if len(w) != len(word):
                continue
            i = 0
            while i < len(w):
                if w[i] == word[i] or word[i] == '.':
                    i += 1
                else:
                    break
            if i == len(w):
                return True
        return False
```

```java
public class WordDictionary {

    private List<String> store;

    public WordDictionary() {
        store = new ArrayList<>();
    }

    public void addWord(String word) {
        store.add(word);
    }

    public boolean search(String word) {
        for (String w : store) {
            if (w.length() != word.length()) continue;
            int i = 0;
            while (i < w.length()) {
                if (w.charAt(i) == word.charAt(i) || 
                    word.charAt(i) == '.') {
                    i++;
                } else {
                    break;
                }
            }
            if (i == w.length()) {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class WordDictionary {
public:
    vector<string> store;

    WordDictionary() {}

    void addWord(string word) {
        store.push_back(word);
    }

    bool search(string word) {
        for (string w : store) {
            if (w.length() != word.length()) continue;
            int i = 0;
            while (i < w.length()) {
                if (w[i] == word[i] || word[i] == '.') {
                    i++;
                } else {
                    break;
                }
            }
            if (i == w.length()) {
                return true;
            }
        }
        return false;
    }
};
```

```javascript
class WordDictionary {
    constructor() {
        this.store = [];
    }

    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        this.store.push(word);
    }
    
    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        for (let w of this.store) {
            if (w.length !== word.length) continue;
            let i = 0;
            while (i < w.length) {
                if (w[i] === word[i] || 
                    word[i] === '.') {
                    i++;
                } else {
                    break;
                }
            }
            if (i === w.length) {
                return true;
            }
        }
        return false;
    }
}
```

```csharp
public class WordDictionary {

    private List<string> store;

    public WordDictionary() {
        store = new List<string>();
    }

    public void AddWord(string word) {
        store.Add(word);
    }

    public bool Search(string word) {
        foreach (string w in store) {
            if (w.Length != word.Length) continue;
            int i = 0;
            while (i < w.Length) {
                if (w[i] == word[i] || word[i] == '.') {
                    i++;
                } else {
                    break;
                }
            }
            if (i == w.Length) {
                return true;
            }
        }
        return false;
    }
}
```

```go
type WordDictionary struct {
	store []string
}

func Constructor() WordDictionary {
	return WordDictionary{store: []string{}}
}

func (this *WordDictionary) AddWord(word string) {
	this.store = append(this.store, word)
}

func (this *WordDictionary) Search(word string) bool {
	for _, w := range this.store {
		if len(w) != len(word) {
			continue
		}
		match := true
		for i := 0; i < len(w); i++ {
			if w[i] != word[i] && word[i] != '.' {
				match = false
				break
			}
		}
		if match {
			return true
		}
	}
	return false
}
```

```kotlin
class WordDictionary {

    private val store = mutableListOf<String>()

    fun addWord(word: String) {
        store.add(word)
    }

    fun search(word: String): Boolean {
        for (w in store) {
            if (w.length != word.length) continue
            var match = true
            for (i in w.indices) {
                if (w[i] != word[i] && word[i] != '.') {
                    match = false
                    break
                }
            }
            if (match) return true
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ for $addWord()$, $O(m * n)$ for $search()$.
* Space complexity: $O(m * n)$

> Where $m$ is the number of words added and $n$ is the length of the string.

---

## 2. Depth First Search (Trie)

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = False


class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        cur = self.root
        for c in word:
            if c not in cur.children:
                cur.children[c] = TrieNode()
            cur = cur.children[c]
        cur.word = True

    def search(self, word: str) -> bool:
        def dfs(j, root):
            cur = root

            for i in range(j, len(word)):
                c = word[i]
                if c == ".":
                    for child in cur.children.values():
                        if dfs(i + 1, child):
                            return True
                    return False
                else:
                    if c not in cur.children:
                        return False
                    cur = cur.children[c]
            return cur.word

        return dfs(0, self.root)
```

```java
public class TrieNode {
    
    TrieNode[] children;
    boolean word;
    
    public TrieNode() {
        children = new TrieNode[26];
        word = false;
    }
}

public class WordDictionary {
    
    private TrieNode root;

    public WordDictionary() {
        root = new TrieNode();
    }

    public void addWord(String word) {
        TrieNode cur = root;
        for (char c : word.toCharArray()) {
            if (cur.children[c - 'a'] == null) {
                cur.children[c - 'a'] = new TrieNode();
            }
            cur = cur.children[c - 'a'];
        }
        cur.word = true;
    }

    public boolean search(String word) {
        return dfs(word, 0, root);
    }

    private boolean dfs(String word, int j, TrieNode root) {
        TrieNode cur = root;

        for (int i = j; i < word.length(); i++) {
            char c = word.charAt(i);
            if (c == '.') {
                for (TrieNode child : cur.children) {
                    if (child != null && dfs(word, i + 1, child)) {
                        return true;
                    }
                }
                return false;
            } else {
                if (cur.children[c - 'a'] == null) {
                    return false;
                }
                cur = cur.children[c - 'a'];
            }
        }
        return cur.word;
    }
}
```

```cpp
class TrieNode {
public:
    vector<TrieNode*> children;
    bool word;

    TrieNode() : children(26, nullptr), word(false) {}
};

class WordDictionary {
public:
    TrieNode* root;

    WordDictionary() : root(new TrieNode()) {}

    void addWord(string word) {
        TrieNode* cur = root;
        for (char c : word) {
            if (cur->children[c - 'a'] == nullptr) {
                cur->children[c - 'a'] = new TrieNode();
            }
            cur = cur->children[c - 'a'];
        }
        cur->word = true;
    }

    bool search(string word) {
        return dfs(word, 0, root);
    }

private:
    bool dfs(string word, int j, TrieNode* root) {
        TrieNode* cur = root;

        for (int i = j; i < word.size(); i++) {
            char c = word[i];
            if (c == '.') {
                for (TrieNode* child : cur->children) {
                    if (child != nullptr && dfs(word, i + 1, child)) {
                        return true;
                    }
                }
                return false;
            } else {
                if (cur->children[c - 'a'] == nullptr) {
                    return false;
                }
                cur = cur->children[c - 'a'];
            }
        }
        return cur->word;
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = Array(26).fill(null);
        this.word = false;
    }
}

class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }
    
    /**
     * @param {string} c
     * @return {number}
     */
    getIndex(c) {
        return c.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        let cur = this.root;
        for (const c of word) {
            const idx = this.getIndex(c); 
            if (cur.children[idx] === null) {
                cur.children[idx] = new TrieNode();
            }
            cur = cur.children[idx];
        }
        cur.word = true;
    }
    
     /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        return this.dfs(word, 0, this.root);
    }

    /**
     * @param {string} word
     * @param {number} j
     * @param {TrieNode} root
     * @return {boolean}
     */
    dfs(word, j, root) {
        let cur = root;

        for (let i = j; i < word.length; i++) {
            const c = word[i];
            if (c === '.') {
                for (const child of cur.children) {
                    if (child !== null && 
                        this.dfs(word, i + 1, child)) {
                        return true;
                    }
                }
                return false;
            } else {
                const idx = this.getIndex(c);  
                if (cur.children[idx] === null) {
                    return false;
                }
                cur = cur.children[idx];
            }
        }
        return cur.word;
    }
}
```

```csharp
public class TrieNode {
    public TrieNode[] children = new TrieNode[26];
    public bool word = false;
}

public class WordDictionary {
    
    private TrieNode root;

    public WordDictionary() {
        root = new TrieNode();
    }

    public void AddWord(string word) {
        TrieNode cur = root;
        foreach (char c in word) {
            if (cur.children[c - 'a'] == null) {
                cur.children[c - 'a'] = new TrieNode();
            }
            cur = cur.children[c - 'a'];
        }
        cur.word = true;
    }

    public bool Search(string word) {
        return Dfs(word, 0, root);
    }

    private bool Dfs(string word, int j, TrieNode root) {
        TrieNode cur = root;

        for (int i = j; i < word.Length; i++) {
            char c = word[i];
            if (c == '.') {
                foreach (TrieNode child in cur.children) {
                    if (child != null && Dfs(word, i + 1, child)) {
                        return true;
                    }
                }
                return false;
            } else {
                if (cur.children[c - 'a'] == null) {
                    return false;
                }
                cur = cur.children[c - 'a'];
            }
        }
        return cur.word;
    }
}
```

```go
type TrieNode struct {
	children [26]*TrieNode
	word     bool
}

func NewTrieNode() *TrieNode {
	return &TrieNode{}
}

type WordDictionary struct {
	root *TrieNode
}

func Constructor() WordDictionary {
	return WordDictionary{root: NewTrieNode()}
}

func (this *WordDictionary) AddWord(word string) {
	cur := this.root
	for _, c := range word {
		index := c - 'a'
		if cur.children[index] == nil {
			cur.children[index] = NewTrieNode()
		}
		cur = cur.children[index]
	}
	cur.word = true
}

func (this *WordDictionary) Search(word string) bool {
	return this.dfs(word, 0, this.root)
}

func (this *WordDictionary) dfs(word string, j int, root *TrieNode) bool {
	cur := root
	for i := j; i < len(word); i++ {
		c := word[i]
		if c == '.' {
			for _, child := range cur.children {
				if child != nil && this.dfs(word, i+1, child) {
					return true
				}
			}
			return false
		} else {
			index := c - 'a'
			if cur.children[index] == nil {
				return false
			}
			cur = cur.children[index]
		}
	}
	return cur.word
}
```

```kotlin
class TrieNode {
    val children = Array<TrieNode?>(26) { null }
    var word: Boolean = false
}

class WordDictionary {

    private val root = TrieNode()

    fun addWord(word: String) {
        var cur = root
        for (c in word) {
            val index = c - 'a'
            if (cur.children[index] == null) {
                cur.children[index] = TrieNode()
            }
            cur = cur.children[index]!!
        }
        cur.word = true
    }

    fun search(word: String): Boolean {
        return dfs(word, 0, root)
    }

    private fun dfs(word: String, j: Int, root: TrieNode): Boolean {
        var cur = root
        for (i in j until word.length) {
            val c = word[i]
            if (c == '.') {
                for (child in cur.children) {
                    if (child != null && dfs(word, i + 1, child)) {
                        return true
                    }
                }
                return false
            } else {
                val index = c - 'a'
                if (cur.children[index] == null) {
                    return false
                }
                cur = cur.children[index]!!
            }
        }
        return cur.word
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ for $addWord()$, $O(n)$ for $search()$.
* Space complexity: $O(t + n)$

> Where $n$ is the length of the string and $t$ is the total number of TrieNodes created in the Trie.