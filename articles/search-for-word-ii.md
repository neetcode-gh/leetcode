## 1. Backtracking

::tabs-start

```python
class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        ROWS, COLS = len(board), len(board[0])
        res = []

        def backtrack(r, c, i):
            if i == len(word):
                return True
            if (r < 0 or c < 0 or r >= ROWS or 
                c >= COLS or board[r][c] != word[i]
            ):
                return False

            board[r][c] = '*'
            ret = (backtrack(r + 1, c, i + 1) or
                   backtrack(r - 1, c, i + 1) or
                   backtrack(r, c + 1, i + 1) or
                   backtrack(r, c - 1, i + 1))
            board[r][c] = word[i]
            return ret

        for word in words:
            flag = False
            for r in range(ROWS):
                if flag:
                    break
                for c in range(COLS):
                    if board[r][c] != word[0]:
                        continue
                    if backtrack(r, c, 0):
                        res.append(word)
                        flag = True
                        break
        return res
```

```java
public class Solution {
    public List<String> findWords(char[][] board, String[] words) {
        int ROWS = board.length, COLS = board[0].length;
        List<String> res = new ArrayList<>();

        for (String word : words) {
            boolean flag = false;
            for (int r = 0; r < ROWS && !flag; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (board[r][c] != word.charAt(0)) continue;
                    if (backtrack(board, r, c, word, 0)) {
                        res.add(word);
                        flag = true;
                        break;
                    }
                }
            }
        }
        return res;
    }

    private boolean backtrack(char[][] board, int r, int c, String word, int i) {
        if (i == word.length()) return true;
        if (r < 0 || c < 0 || r >= board.length || 
            c >= board[0].length || board[r][c] != word.charAt(i))
            return false;

        board[r][c] = '*';
        boolean ret = backtrack(board, r + 1, c, word, i + 1) ||
                      backtrack(board, r - 1, c, word, i + 1) ||
                      backtrack(board, r, c + 1, word, i + 1) ||
                      backtrack(board, r, c - 1, word, i + 1);
        board[r][c] = word.charAt(i);
        return ret;
    }
}
```

```cpp
class Solution {
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        int ROWS = board.size(), COLS = board[0].size();
        vector<string> res;

        for (string& word : words) {
            bool flag = false;
            for (int r = 0; r < ROWS && !flag; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (board[r][c] != word[0]) continue;
                    if (backtrack(board, r, c, word, 0)) {
                        res.push_back(word);
                        flag = true;
                        break;
                    }
                }
            }
        }
        return res;
    }

private:
    bool backtrack(vector<vector<char>>& board, int r, int c, string& word, int i) {
        if (i == word.length()) return true;
        if (r < 0 || c < 0 || r >= board.size() || 
            c >= board[0].size() || board[r][c] != word[i])
            return false;

        board[r][c] = '*';
        bool ret = backtrack(board, r + 1, c, word, i + 1) ||
                   backtrack(board, r - 1, c, word, i + 1) ||
                   backtrack(board, r, c + 1, word, i + 1) ||
                   backtrack(board, r, c - 1, word, i + 1);
        board[r][c] = word[i];
        return ret;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @param {string[]} words
     * @return {string[]}
     */
    findWords(board, words) {
        const ROWS = board.length, COLS = board[0].length;
        const res = [];

        const backtrack = (r, c, word, i) => {
            if (i === word.length) return true;
            if (r < 0 || c < 0 || r >= ROWS || 
                c >= COLS || board[r][c] !== word[i]) return false;

            const temp = board[r][c];
            board[r][c] = '*';
            const ret = backtrack(r + 1, c, word, i + 1) ||
                        backtrack(r - 1, c, word, i + 1) ||
                        backtrack(r, c + 1, word, i + 1) ||
                        backtrack(r, c - 1, word, i + 1);
            board[r][c] = temp;
            return ret;
        };

        for (const word of words) {
            let flag = false;
            for (let r = 0; r < ROWS; r++) {
                if (flag) break;
                for (let c = 0; c < COLS; c++) {
                    if (board[r][c] !== word[0]) continue;
                    if (backtrack(r, c, word, 0)) {
                        res.push(word);
                        flag = true;
                        break;
                    }
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> FindWords(char[][] board, string[] words) {
        int ROWS = board.Length, COLS = board[0].Length;
        List<string> res = new List<string>();

        foreach (string word in words) {
            bool flag = false;
            for (int r = 0; r < ROWS && !flag; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (board[r][c] != word[0]) continue;
                    if (Backtrack(board, r, c, word, 0)) {
                        res.Add(word);
                        flag = true;
                        break;
                    }
                }
            }
        }
        return res;
    }

    private bool Backtrack(char[][] board, int r, int c, string word, int i) {
        if (i == word.Length) return true;
        if (r < 0 || c < 0 || r >= board.Length || 
            c >= board[0].Length || board[r][c] != word[i])
            return false;

        board[r][c] = '*';
        bool ret = Backtrack(board, r + 1, c, word, i + 1) ||
                   Backtrack(board, r - 1, c, word, i + 1) ||
                   Backtrack(board, r, c + 1, word, i + 1) ||
                   Backtrack(board, r, c - 1, word, i + 1);
        board[r][c] = word[i];
        return ret;
    }
}
```

```go
func findWords(board [][]byte, words []string) []string {
    var res []string
    rows, cols := len(board), len(board[0])

    var backtrack func(r, c int, i int, word string) bool
    backtrack = func(r, c int, i int, word string) bool {
        if i == len(word) {
            return true
        }
        if r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] != word[i] {
            return false
        }
        board[r][c] = '*'
        defer func() { board[r][c] = word[i] }()
        return backtrack(r+1, c, i+1, word) ||
            backtrack(r-1, c, i+1, word) ||
            backtrack(r, c+1, i+1, word) ||
            backtrack(r, c-1, i+1, word)
    }

    for _, word := range words {
        found := false
        for r := 0; r < rows; r++ {
            if found {
                break
            }
            for c := 0; c < cols; c++ {
                if board[r][c] == word[0] && backtrack(r, c, 0, word) {
                    res = append(res, word)
                    found = true
                    break
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findWords(board: Array<CharArray>, words: Array<String>): List<String> {
        val res = mutableListOf<String>()
        val rows = board.size
        val cols = board[0].size

        fun backtrack(r: Int, c: Int, i: Int, word: String): Boolean {
            if (i == word.length) return true
            if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] != word[i]) {
                return false
            }
            board[r][c] = '*'
            val ret = backtrack(r + 1, c, i + 1, word) ||
                    backtrack(r - 1, c, i + 1, word) ||
                    backtrack(r, c + 1, i + 1, word) ||
                    backtrack(r, c - 1, i + 1, word)
            board[r][c] = word[i]
            return ret
        }

        for (word in words) {
            var found = false
            for (r in 0 until rows) {
                if (found) break
                for (c in 0 until cols) {
                    if (board[r][c] == word[0] && backtrack(r, c, 0, word)) {
                        res.add(word)
                        found = true
                        break
                    }
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n * 4 ^ t + s)$
* Space complexity: $O(t)$

> Where $m$ is the number of rows, $n$ is the number of columns, $t$ is the maximum length of any word in the array $words$ and $s$ is the sum of the lengths of all the words. 

---

## 2. Backtracking (Trie + Hash Set)

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.isWord = False

    def addWord(self, word):
        cur = self
        for c in word:
            if c not in cur.children:
                cur.children[c] = TrieNode()
            cur = cur.children[c]
        cur.isWord = True

class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        root = TrieNode()
        for w in words:
            root.addWord(w)

        ROWS, COLS = len(board), len(board[0])
        res, visit = set(), set()

        def dfs(r, c, node, word):
            if (r < 0 or c < 0 or r >= ROWS or 
                c >= COLS or (r, c) in visit or 
                board[r][c] not in node.children
            ):
                return

            visit.add((r, c))
            node = node.children[board[r][c]]
            word += board[r][c]
            if node.isWord:
                res.add(word)

            dfs(r + 1, c, node, word)
            dfs(r - 1, c, node, word)
            dfs(r, c + 1, node, word)
            dfs(r, c - 1, node, word)
            visit.remove((r, c))

        for r in range(ROWS):
            for c in range(COLS):
                dfs(r, c, root, "")

        return list(res)
```

```java
public class TrieNode {
    Map<Character, TrieNode> children;
    boolean isWord;

    public TrieNode() {
        children = new HashMap<>();
        isWord = false;
    }

    public void addWord(String word) {
        TrieNode cur = this;
        for (char c : word.toCharArray()) {
            cur.children.putIfAbsent(c, new TrieNode());
            cur = cur.children.get(c);
        }
        cur.isWord = true;
    }
}

public class Solution {
    private Set<String> res;
    private boolean[][] visit;
    
    public List<String> findWords(char[][] board, String[] words) {
        TrieNode root = new TrieNode();
        for (String word : words) {
            root.addWord(word);
        }

        int ROWS = board.length, COLS = board[0].length;
        res = new HashSet<>();
        visit = new boolean[ROWS][COLS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                dfs(board, r, c, root, "");
            }
        }
        return new ArrayList<>(res);
    }

    private void dfs(char[][] board, int r, int c, TrieNode node, String word) {
        int ROWS = board.length, COLS = board[0].length;
        if (r < 0 || c < 0 || r >= ROWS || 
            c >= COLS || visit[r][c] || 
            !node.children.containsKey(board[r][c])) {
            return;
        }

        visit[r][c] = true;
        node = node.children.get(board[r][c]);
        word += board[r][c];
        if (node.isWord) {
            res.add(word);
        }

        dfs(board, r + 1, c, node, word);
        dfs(board, r - 1, c, node, word);
        dfs(board, r, c + 1, node, word);
        dfs(board, r, c - 1, node, word);

        visit[r][c] = false;
    }
}
```

```cpp
class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isWord;

    TrieNode() : isWord(false) {}

    void addWord(const string& word) {
        TrieNode* cur = this;
        for (char c : word) {
            if (!cur->children.count(c)) {
                cur->children[c] = new TrieNode();
            }
            cur = cur->children[c];
        }
        cur->isWord = true;
    }
};

class Solution {
    unordered_set<string> res;
    vector<vector<bool>> visit;
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        TrieNode* root = new TrieNode();
        for (const string& word : words) {
            root->addWord(word);
        }

        int ROWS = board.size(), COLS = board[0].size();
        visit.assign(ROWS, vector<bool>(COLS, false));

        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                dfs(board, r, c, root, "");
            }
        }
        return vector<string>(res.begin(), res.end());
    }

private:
    void dfs(vector<vector<char>>& board, int r, int c, TrieNode* node, string word) {
        int ROWS = board.size(), COLS = board[0].size();
        if (r < 0 || c < 0 || r >= ROWS || 
            c >= COLS || visit[r][c] || 
            !node->children.count(board[r][c])) {
            return;
        }

        visit[r][c] = true;
        node = node->children[board[r][c]];
        word += board[r][c];
        if (node->isWord) {
            res.insert(word);
        }

        dfs(board, r + 1, c, node, word);
        dfs(board, r - 1, c, node, word);
        dfs(board, r, c + 1, node, word);
        dfs(board, r, c - 1, node, word);

        visit[r][c] = false;
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isWord = false;
    }

    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        let cur = this;
        for (const c of word) {
            if (!(c in cur.children)) {
                cur.children[c] = new TrieNode();
            }
            cur = cur.children[c];
        }
        cur.isWord = true;
    }
}

class Solution {
    /**
     * @param {character[][]} board
     * @param {string[]} words
     * @return {string[]}
     */
    findWords(board, words) {
        const root = new TrieNode();
        for (const word of words) {
            root.addWord(word);
        }

        const ROWS = board.length, COLS = board[0].length;
        const res = new Set(), visit = new Set();

        const dfs = (r, c, node, word) => {
            if (r < 0 || c < 0 || r >= ROWS || 
                c >= COLS || visit.has(`${r},${c}`) || 
                !(board[r][c] in node.children)) {
                return;
            }

            visit.add(`${r},${c}`);
            node = node.children[board[r][c]];
            word += board[r][c];
            if (node.isWord) {
                res.add(word);
            }

            dfs(r + 1, c, node, word);
            dfs(r - 1, c, node, word);
            dfs(r, c + 1, node, word);
            dfs(r, c - 1, node, word);

            visit.delete(`${r},${c}`);
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                dfs(r, c, root, "");
            }
        }

        return Array.from(res);
    }
}
```

```csharp
public class TrieNode {
    public Dictionary<char, TrieNode> Children = new Dictionary<char, TrieNode>();
    public bool IsWord = false;

    public void AddWord(string word) {
        TrieNode cur = this;
        foreach (char c in word) {
            if (!cur.Children.ContainsKey(c)) {
                cur.Children[c] = new TrieNode();
            }
            cur = cur.Children[c];
        }
        cur.IsWord = true;
    }
}

public class Solution {
    private HashSet<string> res = new HashSet<string>();
    private bool[,] visit;
    public List<string> FindWords(char[][] board, string[] words) {
        TrieNode root = new TrieNode();
        foreach (string word in words) {
            root.AddWord(word);
        }

        int ROWS = board.Length, COLS = board[0].Length;
        visit = new bool[ROWS, COLS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                Dfs(board, r, c, root, "");
            }
        }
        return new List<string>(res);
    }

    private void Dfs(char[][] board, int r, int c, TrieNode node, string word) {
        int ROWS = board.Length, COLS = board[0].Length;
        if (r < 0 || c < 0 || r >= ROWS || 
            c >= COLS || visit[r, c] || 
            !node.Children.ContainsKey(board[r][c])) {
            return;
        }

        visit[r, c] = true;
        node = node.Children[board[r][c]];
        word += board[r][c];
        if (node.IsWord) {
            res.Add(word);
        }

        Dfs(board, r + 1, c, node, word);
        Dfs(board, r - 1, c, node, word);
        Dfs(board, r, c + 1, node, word);
        Dfs(board, r, c - 1, node, word);

        visit[r, c] = false;
    }
}
```

```go
type TrieNode struct {
	children map[byte]*TrieNode
	isWord   bool
}

func NewTrieNode() *TrieNode {
	return &TrieNode{children: make(map[byte]*TrieNode)}
}

func (this *TrieNode) addWord(word string) {
	cur := this
	for i := 0; i < len(word); i++ {
		c := word[i]
		if _, found := cur.children[c]; !found {
			cur.children[c] = NewTrieNode()
		}
		cur = cur.children[c]
	}
	cur.isWord = true
}

func findWords(board [][]byte, words []string) []string {
    root := NewTrieNode()
	for _, w := range words {
		root.addWord(w)
	}

	rows, cols := len(board), len(board[0])
	var res []string
	visit := make(map[[2]int]bool)
	wordSet := make(map[string]bool)

	var dfs func(r, c int, node *TrieNode, word string)
	dfs = func(r, c int, node *TrieNode, word string) {
		if r < 0 || c < 0 || r >= rows || c >= cols || visit[[2]int{r, c}] || board[r][c] == 0 {
			return
		}

		char := board[r][c]
		nextNode, found := node.children[char]
		if !found {
			return
		}

		visit[[2]int{r, c}] = true
		word += string(char)
		if nextNode.isWord {
			wordSet[word] = true
		}

		dfs(r+1, c, nextNode, word)
		dfs(r-1, c, nextNode, word)
		dfs(r, c+1, nextNode, word)
		dfs(r, c-1, nextNode, word)

		visit[[2]int{r, c}] = false
	}

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			dfs(r, c, root, "")
		}
	}

	for word := range wordSet {
		res = append(res, word)
	}
	return res
}
```

```kotlin
class TrieNode {
    val children = HashMap<Char, TrieNode>()
    var isWord: Boolean = false

    fun addWord(word: String) {
        var cur = this
        for (c in word) {
            cur = cur.children.getOrPut(c) { TrieNode() }
        }
        cur.isWord = true
    }
}

class Solution {
    fun findWords(board: Array<CharArray>, words: Array<String>): List<String> {
        val root = TrieNode()
        for (w in words) {
            root.addWord(w)
        }

        val rows = board.size
        val cols = board[0].size
        val res = HashSet<String>()
        val visit = HashSet<Pair<Int, Int>>()

        fun dfs(r: Int, c: Int, node: TrieNode, word: String) {
            if (r < 0 || c < 0 || r >= rows || c >= cols || 
               (r to c) in visit || board[r][c] !in node.children) {
                return
            }

            visit.add(r to c)
            val nextNode = node.children[board[r][c]]!!
            val newWord = word + board[r][c]
            if (nextNode.isWord) {
                res.add(newWord)
            }

            dfs(r + 1, c, nextNode, newWord)
            dfs(r - 1, c, nextNode, newWord)
            dfs(r, c + 1, nextNode, newWord)
            dfs(r, c - 1, nextNode, newWord)

            visit.remove(r to c)
        }

        for (r in 0 until rows) {
            for (c in 0 until cols) {
                dfs(r, c, root, "")
            }
        }

        return res.toList()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n * 4 * 3 ^ {t - 1} + s)$
* Space complexity: $O(s)$

> Where $m$ is the number of rows, $n$ is the number of columns, $t$ is the maximum length of any word in the array $words$ and $s$ is the sum of the lengths of all the words. 

---

## 3. Backtracking (Trie)

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = [None] * 26
        self.idx = -1
        self.refs = 0

    def addWord(self, word, i):
        cur = self
        cur.refs += 1
        for c in word:
            index = ord(c) - ord('a')
            if not cur.children[index]:
                cur.children[index] = TrieNode()
            cur = cur.children[index]
            cur.refs += 1
        cur.idx = i

class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        root = TrieNode()
        for i in range(len(words)):
            root.addWord(words[i], i)

        ROWS, COLS = len(board), len(board[0])
        res = []

        def getIndex(c):
            index = ord(c) - ord('a')
            return index

        def dfs(r, c, node):
            if (r < 0 or c < 0 or r >= ROWS or 
                c >= COLS or board[r][c] == '*' or 
                not node.children[getIndex(board[r][c])]):
                return
            
            tmp = board[r][c]
            board[r][c] = '*'
            prev = node
            node = node.children[getIndex(tmp)]
            if node.idx != -1:
                res.append(words[node.idx])
                node.idx = -1
                node.refs -= 1
                if not node.refs:
                    prev.children[getIndex(tmp)] = None
                    node = None
                    board[r][c] = tmp
                    return

            dfs(r + 1, c, node)
            dfs(r - 1, c, node)
            dfs(r, c + 1, node)
            dfs(r, c - 1, node)

            board[r][c] = tmp

        for r in range(ROWS):
            for c in range(COLS):
                dfs(r, c, root)

        return res
```

```java
public class TrieNode {
    TrieNode[] children = new TrieNode[26];
    int idx = -1;
    int refs = 0;

    public void addWord(String word, int i) {
        TrieNode cur = this;
        cur.refs++;
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (cur.children[index] == null) {
                cur.children[index] = new TrieNode();
            }
            cur = cur.children[index];
            cur.refs++;
        }
        cur.idx = i;
    }
}

public class Solution {
    List<String> res = new ArrayList<>();

    public List<String> findWords(char[][] board, String[] words) {
        TrieNode root = new TrieNode();
        for (int i = 0; i < words.length; i++) {
            root.addWord(words[i], i);
        }

        for (int r = 0; r < board.length; r++) {
            for (int c = 0; c < board[0].length; c++) {
                dfs(board, root, r, c, words);
            }
        }

        return res;
    }

    private void dfs(char[][] board, TrieNode node, int r, int c, String[] words) {
        if (r < 0 || c < 0 || r >= board.length || 
            c >= board[0].length || board[r][c] == '*' || 
            node.children[board[r][c] - 'a'] == null) {
            return;
        }

        char temp = board[r][c];
        board[r][c] = '*';
        TrieNode prev = node;
        node = node.children[temp - 'a'];
        if (node.idx != -1) {
            res.add(words[node.idx]);
            node.idx = -1;
            node.refs--;
            if (node.refs == 0) {
                node = null;
                prev.children[temp - 'a'] = null;
                board[r][c] = temp;
                return;
            }
        }

        dfs(board, node, r + 1, c, words);
        dfs(board, node, r - 1, c, words);
        dfs(board, node, r, c + 1, words);
        dfs(board, node, r, c - 1, words);

        board[r][c] = temp;
    }
}
```

```cpp
class TrieNode {
public:
    TrieNode* children[26];
    int idx;
    int refs;

    TrieNode() {
        for (int i = 0; i < 26; ++i) {
            children[i] = nullptr;
        }
        idx = -1;
        refs = 0;
    }

    void addWord(const string& word, int i) {
        TrieNode* cur = this;
        cur->refs++;
        for (char c : word) {
            int index = c - 'a';
            if (!cur->children[index]) {
                cur->children[index] = new TrieNode();
            }
            cur = cur->children[index];
            cur->refs++;
        }
        cur->idx = i;
    }
};

class Solution {
public:
    vector<string> res;

    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        TrieNode* root = new TrieNode();
        for (int i = 0; i < words.size(); ++i) {
            root->addWord(words[i], i);
        }

        for (int r = 0; r < board.size(); ++r) {
            for (int c = 0; c < board[0].size(); ++c) {
                dfs(board, root, r, c, words);
            }
        }

        return res;
    }

    void dfs(auto& board, TrieNode* node, int r, int c, auto& words) {
        if (r < 0 || c < 0 || r >= board.size() || 
            c >= board[0].size() || board[r][c] == '*' || 
            !node->children[board[r][c] - 'a']) {
            return;
        }

        char temp = board[r][c];
        board[r][c] = '*';
        TrieNode* prev = node;
        node = node->children[temp - 'a'];
        if (node->idx != -1) {
            res.push_back(words[node->idx]);
            node->idx = -1;
            node->refs--;
            if (!node->refs) {
                prev->children[temp - 'a'] = nullptr;
                node = nullptr;
                board[r][c] = temp;
                return;
            }
        }

        dfs(board, node, r + 1, c, words);
        dfs(board, node, r - 1, c, words);
        dfs(board, node, r, c + 1, words);
        dfs(board, node, r, c - 1, words);

        board[r][c] = temp;
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = Array(26).fill(null);
        this.idx = -1;
        this.refs = 0;
    }
    
    /**
     * @param {string} word
     * @param {number} i
     * @return {void}
     */
    addWord(word, i) {
        let cur = this;
        cur.refs++;
        for (const c of word) {
            const index = c.charCodeAt(0) - 'a'.charCodeAt(0);
            if (cur.children[index] === null) {
                cur.children[index] = new TrieNode();
            }
            cur = cur.children[index];
            cur.refs++;
        }
        cur.idx = i;
    }
}

class Solution {
    /**
     * @param {character[][]} board
     * @param {string[]} words
     * @return {string[]}
     */
    findWords(board, words) {
        const root = new TrieNode();
        for (let i = 0; i < words.length; i++) {
            root.addWord(words[i], i);
        }

        const ROWS = board.length, COLS = board[0].length;
        const res = [];

        const dfs = (r, c, node) => {
            if (r < 0 || c < 0 || r >= ROWS || 
                c >= COLS || board[r][c] === '*' || 
                node.children[this.getId(board[r][c])] === null) {
                return;
            }
            
            let tmp = board[r][c];
            board[r][c] = '*';
            let prev = node;
            node = node.children[this.getId(tmp)];
            if (node.idx !== -1) {
                res.push(words[node.idx]);
                node.idx = -1;
                node.refs--;
                if (node.refs === 0) {
                    prev.children[this.getId(tmp)] = null;
                    node = null;
                    board[r][c] = tmp;
                    return ;
                }
            }

            dfs(r + 1, c, node);
            dfs(r - 1, c, node);
            dfs(r, c + 1, node);
            dfs(r, c - 1, node);
            
            board[r][c] = tmp;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                dfs(r, c, root);
            }
        }

        return Array.from(res);
    }

    /**
     * @param {string} c
     * @return {number}
     */
    getId(c) {
        return c.charCodeAt(0) - 'a'.charCodeAt(0);
    }
}
```

```csharp
class TrieNode {
    public TrieNode[] children = new TrieNode[26];
    public int idx = -1;
    public int refs = 0;

    public void AddWord(string word, int i) {
        TrieNode cur = this;
        cur.refs++;
        foreach (char c in word) {
            int index = c - 'a';
            if (cur.children[index] == null) {
                cur.children[index] = new TrieNode();
            }
            cur = cur.children[index];
            cur.refs++;
        }
        cur.idx = i;
    }
}

public class Solution {
    private List<string> res = new List<string>();

    public List<string> FindWords(char[][] board, string[] words) {
        TrieNode root = new TrieNode();
        for (int i = 0; i < words.Length; i++) {
            root.AddWord(words[i], i);
        }

        for (int r = 0; r < board.Length; r++) {
            for (int c = 0; c < board[0].Length; c++) {
                Dfs(board, root, r, c, words);
            }
        }

        return res;
    }

    private void Dfs(char[][] board, TrieNode node, int r, int c, string[] words) {
        if (r < 0 || c < 0 || r >= board.Length || 
            c >= board[0].Length || board[r][c] == '*' || 
            node.children[board[r][c] - 'a'] == null) {
            return;
        }

        char temp = board[r][c];
        board[r][c] = '*';
        TrieNode prev = node;
        node = node.children[temp - 'a'];
        if (node.idx != -1) {
            res.Add(words[node.idx]);
            node.idx = -1;
            node.refs--;
            if (node.refs == 0) {
                node = null;
                prev.children[temp - 'a'] = null;
                board[r][c] = temp;
                return;
            }
        }

        Dfs(board, node, r + 1, c, words);
        Dfs(board, node, r - 1, c, words);
        Dfs(board, node, r, c + 1, words);
        Dfs(board, node, r, c - 1, words);

        board[r][c] = temp;
    }
}
```

```go
type TrieNode struct {
	children [26]*TrieNode
	idx      int
	refs     int
}

func NewTrieNode() *TrieNode {
	return &TrieNode{idx: -1}
}

func (this *TrieNode) addWord(word string, i int) {
	cur := this
	cur.refs++
	for _, ch := range word {
		index := ch - 'a'
		if cur.children[index] == nil {
			cur.children[index] = NewTrieNode()
		}
		cur = cur.children[index]
		cur.refs++
	}
	cur.idx = i
}

func findWords(board [][]byte, words []string) []string {
    root := NewTrieNode()
	for i, word := range words {
		root.addWord(word, i)
	}

	rows, cols := len(board), len(board[0])
	var res []string

	getIndex := func(c byte) int { return int(c - 'a') }

	var dfs func(r, c int, node *TrieNode)
	dfs = func(r, c int, node *TrieNode) {
		if r < 0 || c < 0 || r >= rows || c >= cols || 
           board[r][c] == '*' || node.children[getIndex(board[r][c])] == nil {
			return
		}

		tmp := board[r][c]
		board[r][c] = '*'
		prev := node
		node = node.children[getIndex(tmp)]
		if node.idx != -1 {
			res = append(res, words[node.idx])
			node.idx = -1
			node.refs--
			if node.refs == 0 {
				prev.children[getIndex(tmp)] = nil
				board[r][c] = tmp
				return
			}
		}

		dfs(r+1, c, node)
		dfs(r-1, c, node)
		dfs(r, c+1, node)
		dfs(r, c-1, node)

		board[r][c] = tmp
	}

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			dfs(r, c, root)
		}
	}

	return res
}
```

```kotlin
class TrieNode {
    val children = Array<TrieNode?>(26) { null }
    var idx = -1
    var refs = 0

    fun addWord(word: String, i: Int) {
        var cur = this
        cur.refs++
        for (c in word) {
            val index = c - 'a'
            if (cur.children[index] == null) {
                cur.children[index] = TrieNode()
            }
            cur = cur.children[index]!!
            cur.refs++
        }
        cur.idx = i
    }
}

class Solution {
    fun findWords(board: Array<CharArray>, words: Array<String>): List<String> {
        val root = TrieNode()
        words.forEachIndexed { i, word -> root.addWord(word, i) }

        val rows = board.size
        val cols = board[0].size
        val res = mutableListOf<String>()

        fun getIndex(c: Char): Int = c - 'a'

        fun dfs(r: Int, c: Int, node: TrieNode?) {
            if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] == '*' || 
                node?.children?.get(getIndex(board[r][c])) == null) {
                return
            }

            val tmp = board[r][c]
            board[r][c] = '*'
            val prev = node
            val nextNode = node.children[getIndex(tmp)]

            if (nextNode != null && nextNode.idx != -1) {
                res.add(words[nextNode.idx])
                nextNode.idx = -1
                nextNode.refs--
                if (nextNode.refs == 0) {
                    prev?.children?.set(getIndex(tmp), null)
                    board[r][c] = tmp
                    return
                }
            }

            dfs(r + 1, c, nextNode)
            dfs(r - 1, c, nextNode)
            dfs(r, c + 1, nextNode)
            dfs(r, c - 1, nextNode)

            board[r][c] = tmp
        }

        for (r in 0 until rows) {
            for (c in 0 until cols) {
                dfs(r, c, root)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n * 4 * 3 ^ {t - 1} + s)$
* Space complexity: $O(s)$

> Where $m$ is the number of rows, $n$ is the number of columns, $t$ is the maximum length of any word in the array $words$ and $s$ is the sum of the lengths of all the words.