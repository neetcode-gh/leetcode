## 1. Prefix Tree (Array)

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = [None] * 26
        self.endOfWord = False

class PrefixTree:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        cur = self.root
        for c in word:
            i = ord(c) - ord("a")
            if cur.children[i] == None:
                cur.children[i] = TrieNode()
            cur = cur.children[i]
        cur.endOfWord = True

    def search(self, word: str) -> bool:
        cur = self.root
        for c in word:
            i = ord(c) - ord("a")
            if cur.children[i] == None:
                return False
            cur = cur.children[i]
        return cur.endOfWord

    def startsWith(self, prefix: str) -> bool:
        cur = self.root
        for c in prefix:
            i = ord(c) - ord("a")
            if cur.children[i] == None:
                return False
            cur = cur.children[i]
        return True
```

```java
public class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean endOfWord = false;
}

public class PrefixTree {
    private TrieNode root;

    public PrefixTree() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode cur = root;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (cur.children[i] == null) {
                cur.children[i] = new TrieNode();
            }
            cur = cur.children[i];
        }
        cur.endOfWord = true;
    }

    public boolean search(String word) {
        TrieNode cur = root;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (cur.children[i] == null) {
                return false;
            }
            cur = cur.children[i];
        }
        return cur.endOfWord;
    }

    public boolean startsWith(String prefix) {
        TrieNode cur = root;
        for (char c : prefix.toCharArray()) {
            int i = c - 'a';
            if (cur.children[i] == null) {
                return false;
            }
            cur = cur.children[i];
        }
        return true;
    }
}
```

```cpp
class TrieNode {
public:
    TrieNode* children[26];
    bool endOfWord;
    
    TrieNode() {
        for (int i = 0; i < 26; i++) {
            children[i] = nullptr;
        } 
        endOfWord = false;
    }
};

class PrefixTree {
    TrieNode* root;
    
public:
    PrefixTree() {
        root = new TrieNode();
    }

    void insert(string word) {
        TrieNode* cur = root;
        for (char c : word) {
            int i = c - 'a';
            if (cur->children[i] == nullptr) {
                cur->children[i] = new TrieNode();
            }
            cur = cur->children[i];
        }
        cur->endOfWord = true;
    }

    bool search(string word) {
        TrieNode* cur = root;
        for (char c : word) {
            int i = c - 'a';
            if (cur->children[i] == nullptr) {
                return false;
            }
            cur = cur->children[i];
        }
        return cur->endOfWord;
    }

    bool startsWith(string prefix) {
        TrieNode* cur = root;
        for (char c : prefix) {
            int i = c - 'a';
            if (cur->children[i] == nullptr) {
                return false;
            }
            cur = cur->children[i];
        }
        return true;
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = new Array(26).fill(null);
        this.endOfWord = false;
    }
}

class PrefixTree {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} word
     * @return {void}
     */
    insert(word) {
        let cur = this.root;
        for (let c of word) {
            let i = c.charCodeAt(0) - 97;
            if (cur.children[i] === null) {
                cur.children[i] = new TrieNode();
            }
            cur = cur.children[i];
        }
        cur.endOfWord = true;
    }

    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        let cur = this.root;
        for (let c of word) {
            let i = c.charCodeAt(0) - 97;
            if (cur.children[i] === null) {
                return false;
            }
            cur = cur.children[i];
        }
        return cur.endOfWord;
    }

    /**
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        let cur = this.root;
        for (let c of prefix) {
            let i = c.charCodeAt(0) - 97;
            if (cur.children[i] === null) {
                return false;
            }
            cur = cur.children[i];
        }
        return true;
    }
}
```

```csharp
public class TrieNode {
    public TrieNode[] children = new TrieNode[26];
    public bool endOfWord = false;
}

public class PrefixTree {
    private TrieNode root;

    public PrefixTree() {
        root = new TrieNode();
    }

    public void Insert(string word) {
        TrieNode cur = root;
        foreach (char c in word) {
            int i = c - 'a';
            if (cur.children[i] == null) {
                cur.children[i] = new TrieNode();
            }
            cur = cur.children[i];
        }
        cur.endOfWord = true;
    }

    public bool Search(string word) {
        TrieNode cur = root;
        foreach (char c in word) {
            int i = c - 'a';
            if (cur.children[i] == null) {
                return false;
            }
            cur = cur.children[i];
        }
        return cur.endOfWord;
    }

    public bool StartsWith(string prefix) {
        TrieNode cur = root;
        foreach (char c in prefix) {
            int i = c - 'a';
            if (cur.children[i] == null) {
                return false;
            }
            cur = cur.children[i];
        }
        return true;
    }
}
```

```go
type TrieNode struct {
	children [26]*TrieNode
	endOfWord bool
}

type PrefixTree struct {
	root *TrieNode
}

func Constructor() PrefixTree {
	return PrefixTree{root: &TrieNode{}}
}

func (this *PrefixTree) Insert(word string) {
	cur := this.root
	for _, c := range word {
		i := c - 'a'
		if cur.children[i] == nil {
			cur.children[i] = &TrieNode{}
		}
		cur = cur.children[i]
	}
	cur.endOfWord = true
}

func (this *PrefixTree) Search(word string) bool {
	cur := this.root
	for _, c := range word {
		i := c - 'a'
		if cur.children[i] == nil {
			return false
		}
		cur = cur.children[i]
	}
	return cur.endOfWord
}

func (this *PrefixTree) StartsWith(prefix string) bool {
	cur := this.root
	for _, c := range prefix {
		i := c - 'a'
		if cur.children[i] == nil {
			return false
		}
		cur = cur.children[i]
	}
	return true
}
```

```kotlin
class TrieNode {
    val children = arrayOfNulls<TrieNode>(26)
    var endOfWord = false
}

class PrefixTree {
    private val root = TrieNode()

    fun insert(word: String) {
        var cur = root
        for (c in word) {
            val i = c - 'a'
            if (cur.children[i] == null) {
                cur.children[i] = TrieNode()
            }
            cur = cur.children[i]!!
        }
        cur.endOfWord = true
    }

    fun search(word: String): Boolean {
        var cur = root
        for (c in word) {
            val i = c - 'a'
            if (cur.children[i] == null) {
                return false
            }
            cur = cur.children[i]!!
        }
        return cur.endOfWord
    }

    fun startsWith(prefix: String): Boolean {
        var cur = root
        for (c in prefix) {
            val i = c - 'a'
            if (cur.children[i] == null) {
                return false
            }
            cur = cur.children[i]!!
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ for each function call.
* Space complexity: $O(t)$

> Where $n$ is the length of the string and $t$ is the total number of TrieNodes created in the Trie.

---

## 2. Prefix Tree (Hash Map)

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.endOfWord = False

class PrefixTree:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        cur = self.root
        for c in word:
            if c not in cur.children:
                cur.children[c] = TrieNode()
            cur = cur.children[c]
        cur.endOfWord = True

    def search(self, word: str) -> bool:
        cur = self.root
        for c in word:
            if c not in cur.children:
                return False
            cur = cur.children[c]
        return cur.endOfWord

    def startsWith(self, prefix: str) -> bool:
        cur = self.root
        for c in prefix:
            if c not in cur.children:
                return False
            cur = cur.children[c]
        return True
```

```java
public class TrieNode {
    HashMap<Character, TrieNode> children = new HashMap<>();
    boolean endOfWord = false;
}

public class PrefixTree {
    private TrieNode root;

    public PrefixTree() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode cur = root;
        for (char c : word.toCharArray()) {
            cur.children.putIfAbsent(c, new TrieNode());
            cur = cur.children.get(c);
        }
        cur.endOfWord = true;
    }

    public boolean search(String word) {
        TrieNode cur = root;
        for (char c : word.toCharArray()) {
            if (!cur.children.containsKey(c)) {
                return false;
            }
            cur = cur.children.get(c);
        }
        return cur.endOfWord;
    }

    public boolean startsWith(String prefix) {
        TrieNode cur = root;
        for (char c : prefix.toCharArray()) {
            if (!cur.children.containsKey(c)) {
                return false;
            }
            cur = cur.children.get(c);
        }
        return true;
    }
}
```

```cpp
class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool endOfWord = false;
};

class PrefixTree {
    TrieNode* root;

public:
    PrefixTree() {
        root = new TrieNode();
    }

    void insert(string word) {
        TrieNode* cur = root;
        for (char c : word) {
            if (cur->children.find(c) == cur->children.end()) {
                cur->children[c] = new TrieNode();
            }
            cur = cur->children[c];
        }
        cur->endOfWord = true;
    }

    bool search(string word) {
        TrieNode* cur = root;
        for (char c : word) {
            if (cur->children.find(c) == cur->children.end()) {
                return false;
            }
            cur = cur->children[c];
        }
        return cur->endOfWord;
    }

    bool startsWith(string prefix) {
        TrieNode* cur = root;
        for (char c : prefix) {
            if (cur->children.find(c) == cur->children.end()) {
                return false;
            }
            cur = cur->children[c];
        }
        return true;
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = new Map();
        this.endOfWord = false;
    }
}

class PrefixTree {
    constructor() {
        this.root = new TrieNode();
    }
    
    /**
     * @param {string} word
     * @return {void}
     */
    insert(word) {
        let cur = this.root;
        for (let c of word) {
            if (!cur.children.has(c)) {
                cur.children.set(c, new TrieNode());
            }
            cur = cur.children.get(c);
        }
        cur.endOfWord = true;
    }

    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        let cur = this.root;
        for (let c of word) {
            if (!cur.children.has(c)) {
                return false;
            }
            cur = cur.children.get(c);
        }
        return cur.endOfWord;
    }

    /**
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        let cur = this.root;
        for (let c of prefix) {
            if (!cur.children.has(c)) {
                return false;
            }
            cur = cur.children.get(c);
        }
        return true;
    }
}
```

```csharp
public class TrieNode {
    public Dictionary<char, TrieNode> children = 
                            new Dictionary<char, TrieNode>();
    public bool endOfWord = false;
}

public class PrefixTree {
    private TrieNode root;

    public PrefixTree() {
        root = new TrieNode();
    }

    public void Insert(string word) {
        TrieNode cur = root;
        foreach (char c in word) {
            if (!cur.children.ContainsKey(c)) {
                cur.children[c] = new TrieNode();
            }
            cur = cur.children[c];
        }
        cur.endOfWord = true;
    }

    public bool Search(string word) {
        TrieNode cur = root;
        foreach (char c in word) {
            if (!cur.children.ContainsKey(c)) {
                return false;
            }
            cur = cur.children[c];
        }
        return cur.endOfWord;
    }

    public bool StartsWith(string prefix) {
        TrieNode cur = root;
        foreach (char c in prefix) {
            if (!cur.children.ContainsKey(c)) {
                return false;
            }
            cur = cur.children[c];
        }
        return true;
    }
}
```

```go
type TrieNode struct {
	children map[rune]*TrieNode
	endOfWord bool
}

type PrefixTree struct {
	root *TrieNode
}

func Constructor() PrefixTree {
	return PrefixTree{root: &TrieNode{children: make(map[rune]*TrieNode)}}
}

func (this *PrefixTree) Insert(word string) {
	cur := this.root
	for _, c := range word {
		if cur.children[c] == nil {
			cur.children[c] = &TrieNode{children: make(map[rune]*TrieNode)}
		}
		cur = cur.children[c]
	}
	cur.endOfWord = true
}

func (this *PrefixTree) Search(word string) bool {
	cur := this.root
	for _, c := range word {
		if cur.children[c] == nil {
			return false
		}
		cur = cur.children[c]
	}
	return cur.endOfWord
}

func (this *PrefixTree) StartsWith(prefix string) bool {
	cur := this.root
	for _, c := range prefix {
		if cur.children[c] == nil {
			return false
		}
		cur = cur.children[c]
	}
	return true
}
```

```kotlin
class TrieNode {
    val children = mutableMapOf<Char, TrieNode>()
    var endOfWord = false
}

class PrefixTree {
    private val root = TrieNode()

    fun insert(word: String) {
        var cur = root
        for (c in word) {
            cur.children.putIfAbsent(c, TrieNode())
            cur = cur.children[c]!!
        }
        cur.endOfWord = true
    }

    fun search(word: String): Boolean {
        var cur = root
        for (c in word) {
            if (c !in cur.children) {
                return false
            }
            cur = cur.children[c]!!
        }
        return cur.endOfWord
    }

    fun startsWith(prefix: String): Boolean {
        var cur = root
        for (c in prefix) {
            if (c !in cur.children) {
                return false
            }
            cur = cur.children[c]!!
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ for each function call.
* Space complexity: $O(t)$

> Where $n$ is the length of the string and $t$ is the total number of TrieNodes created in the Trie.