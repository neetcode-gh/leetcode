## 1. Brute Force

### Intuition
To check if a word has a given prefix, we compare the first few characters of the word with the prefix string. If the word is shorter than the prefix, it cannot have that prefix. Otherwise, we check character by character until we either find a mismatch or confirm all prefix characters match.

### Algorithm
1. Initialize a counter to `0`.
2. For each word in the array:
   - Skip if the word is shorter than the prefix length.
   - Compare each character of the word with the corresponding character of the prefix.
   - If all characters match, increment the counter.
3. Return the final count.

::tabs-start

```python
class Solution:
    def prefixCount(self, words: List[str], pref: str) -> int:
        N, res = len(pref), 0

        for w in words:
            if len(w) < len(pref):
                continue
            inc = 1
            for i in range(N):
                if w[i] != pref[i]:
                    inc = 0
                    break
            res += inc

        return res
```

```java
public class Solution {
    public int prefixCount(String[] words, String pref) {
        int N = pref.length(), res = 0;

        for (String w : words) {
            if (w.length() < N) continue;
            int inc = 1;
            for (int i = 0; i < N; i++) {
                if (w.charAt(i) != pref.charAt(i)) {
                    inc = 0;
                    break;
                }
            }
            res += inc;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int prefixCount(vector<string>& words, string pref) {
        int N = pref.size(), res = 0;

        for (auto &w : words) {
            if ((int)w.size() < N) continue;
            int inc = 1;
            for (int i = 0; i < N; i++) {
                if (w[i] != pref[i]) {
                    inc = 0;
                    break;
                }
            }
            res += inc;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {string} pref
     * @return {number}
     */
    prefixCount(words, pref) {
        let N = pref.length, res = 0;

        for (let w of words) {
            if (w.length < N) continue;
            let inc = 1;
            for (let i = 0; i < N; i++) {
                if (w[i] !== pref[i]) {
                    inc = 0;
                    break;
                }
            }
            res += inc;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int PrefixCount(string[] words, string pref) {
        int N = pref.Length, res = 0;

        foreach (string w in words) {
            if (w.Length < N) continue;
            int inc = 1;
            for (int i = 0; i < N; i++) {
                if (w[i] != pref[i]) {
                    inc = 0;
                    break;
                }
            }
            res += inc;
        }

        return res;
    }
}
```

```go
func prefixCount(words []string, pref string) int {
    N := len(pref)
    res := 0

    for _, w := range words {
        if len(w) < N {
            continue
        }
        inc := 1
        for i := 0; i < N; i++ {
            if w[i] != pref[i] {
                inc = 0
                break
            }
        }
        res += inc
    }

    return res
}
```

```kotlin
class Solution {
    fun prefixCount(words: Array<String>, pref: String): Int {
        val N = pref.length
        var res = 0

        for (w in words) {
            if (w.length < N) continue
            var inc = 1
            for (i in 0 until N) {
                if (w[i] != pref[i]) {
                    inc = 0
                    break
                }
            }
            res += inc
        }

        return res
    }
}
```

```swift
class Solution {
    func prefixCount(_ words: [String], _ pref: String) -> Int {
        let N = pref.count
        var res = 0
        let prefArr = Array(pref)

        for w in words {
            if w.count < N { continue }
            let wArr = Array(w)
            var inc = 1
            for i in 0..<N {
                if wArr[i] != prefArr[i] {
                    inc = 0
                    break
                }
            }
            res += inc
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(1)$

> Where $m$ is the number of words and $n$ is the length of the string $pref$.

---

## 2. Built-In Method

### Intuition
Most programming languages provide built-in methods to check if a string starts with a given prefix. These methods handle the character comparison internally and are optimized for the task, making the code cleaner and less error-prone.

### Algorithm
1. Initialize a counter to `0`.
2. For each word in the array, use the language's built-in prefix checking method (like `startsWith` or `hasPrefix`).
3. If the word starts with the prefix, increment the counter.
4. Return the final count.

::tabs-start

```python
class Solution:
    def prefixCount(self, words: List[str], pref: str) -> int:
        res = 0
        for w in words:
            res += w.startswith(pref)
        return res
```

```java
public class Solution {
    public int prefixCount(String[] words, String pref) {
        int res = 0;
        for (String w : words) {
            if (w.startsWith(pref)) {
                res++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int prefixCount(vector<string>& words, string pref) {
        int res = 0;
        for (string& w : words) {
            if (w.rfind(pref, 0) == 0) {
                res++;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @param {string} pref
     * @return {number}
     */
    prefixCount(words, pref) {
        let res = 0;
        for (let w of words) {
            if (w.startsWith(pref)) {
                res++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int PrefixCount(string[] words, string pref) {
        int res = 0;
        foreach (string w in words) {
            if (w.StartsWith(pref)) {
                res++;
            }
        }
        return res;
    }
}
```

```go
func prefixCount(words []string, pref string) int {
    res := 0
    for _, w := range words {
        if strings.HasPrefix(w, pref) {
            res++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun prefixCount(words: Array<String>, pref: String): Int {
        var res = 0
        for (w in words) {
            if (w.startsWith(pref)) {
                res++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func prefixCount(_ words: [String], _ pref: String) -> Int {
        var res = 0
        for w in words {
            if w.hasPrefix(pref) {
                res += 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(1)$

> Where $m$ is the number of words and $n$ is the length of the string $pref$.

---

## 3. Trie

### Intuition
A Trie (prefix tree) is a tree structure where each node represents a character. By inserting only the first few characters of each word (up to the prefix length), we build a compact structure. Each node keeps a count of how many words pass through it. After inserting all words, we traverse the trie following the prefix characters and return the count at the final node.

### Algorithm
1. Create a Trie data structure where each node has children and a count.
2. For each word in the array:
   - If the word is at least as long as the prefix, insert the first `prefix.length` characters into the trie.
   - Increment the count at each node during insertion.
3. Traverse the trie following the prefix characters.
4. If any character is missing, return `0`.
5. Otherwise, return the count at the final node.

::tabs-start

```python
class PrefixNode:
    def __init__(self):
        self.children = {}   # a -> PrefixNode
        self.count = 0

class PrefixTree:
    def __init__(self):
        self.root = PrefixNode()

    def add(self, w: str, length: int) -> None:
        cur = self.root
        for i in range(length):
            if w[i] not in cur.children:
                cur.children[w[i]] = PrefixNode()
            cur = cur.children[w[i]]
            cur.count += 1

    def count(self, pref: str) -> int:
        cur = self.root
        for c in pref:
            if c not in cur.children:
                return 0
            cur = cur.children[c]
        return cur.count

class Solution:
    def prefixCount(self, words: List[str], pref: str) -> int:
        prefix_tree = PrefixTree()

        for w in words:
            if len(w) >= len(pref):
                prefix_tree.add(w, len(pref))

        return prefix_tree.count(pref)
```

```java
class PrefixNode {
    PrefixNode[] children;
    int count;

    public PrefixNode() {
        children = new PrefixNode[26];
        count = 0;
    }
}

class PrefixTree {
    PrefixNode root;

    public PrefixTree() {
        root = new PrefixNode();
    }

    public void add(String w, int length) {
        PrefixNode cur = root;
        for (int i = 0; i < length; i++) {
            int idx = w.charAt(i) - 'a';
            if (cur.children[idx] == null) {
                cur.children[idx] = new PrefixNode();
            }
            cur = cur.children[idx];
            cur.count++;
        }
    }

    public int count(String pref) {
        PrefixNode cur = root;
        for (int i = 0; i < pref.length(); i++) {
            int idx = pref.charAt(i) - 'a';
            if (cur.children[idx] == null) {
                return 0;
            }
            cur = cur.children[idx];
        }
        return cur.count;
    }
}

public class Solution {
    public int prefixCount(String[] words, String pref) {
        PrefixTree prefixTree = new PrefixTree();

        for (String w : words) {
            if (w.length() >= pref.length()) {
                prefixTree.add(w, pref.length());
            }
        }

        return prefixTree.count(pref);
    }
}
```

```cpp
struct PrefixNode {
    PrefixNode* children[26];
    int count;
    PrefixNode() {
        for (int i = 0; i < 26; i++) children[i] = nullptr;
        count = 0;
    }
};

class PrefixTree {
public:
    PrefixNode* root;
    PrefixTree() {
        root = new PrefixNode();
    }

    void add(const string& w, int length) {
        PrefixNode* cur = root;
        for (int i = 0; i < length; i++) {
            int idx = w[i] - 'a';
            if (!cur->children[idx]) {
                cur->children[idx] = new PrefixNode();
            }
            cur = cur->children[idx];
            cur->count++;
        }
    }

    int count(const string& pref) {
        PrefixNode* cur = root;
        for (char c : pref) {
            int idx = c - 'a';
            if (!cur->children[idx]) return 0;
            cur = cur->children[idx];
        }
        return cur->count;
    }
};

class Solution {
public:
    int prefixCount(vector<string>& words, string pref) {
        PrefixTree prefixTree;
        for (string& w : words) {
            if ((int)w.size() >= (int)pref.size()) {
                prefixTree.add(w, pref.size());
            }
        }
        return prefixTree.count(pref);
    }
};
```

```javascript
class PrefixNode {
    constructor() {
        this.children = new Map();
        this.count = 0;
    }
}

class PrefixTree {
    constructor() {
        this.root = new PrefixNode();
    }

    add(w, length) {
        let cur = this.root;
        for (let i = 0; i < length; i++) {
            if (!cur.children.has(w[i])) {
                cur.children.set(w[i], new PrefixNode());
            }
            cur = cur.children.get(w[i]);
            cur.count++;
        }
    }

    count(pref) {
        let cur = this.root;
        for (let c of pref) {
            if (!cur.children.has(c)) {
                return 0;
            }
            cur = cur.children.get(c);
        }
        return cur.count;
    }
}

class Solution {
    /**
     * @param {string[]} words
     * @param {string} pref
     * @return {number}
     */
    prefixCount(words, pref) {
        let prefix_tree = new PrefixTree();
        for (let w of words) {
            if (w.length >= pref.length) {
                prefix_tree.add(w, pref.length);
            }
        }
        return prefix_tree.count(pref);
    }
}
```

```csharp
public class PrefixNode {
    public PrefixNode[] children;
    public int count;

    public PrefixNode() {
        children = new PrefixNode[26];
        count = 0;
    }
}

public class PrefixTree {
    private PrefixNode root;

    public PrefixTree() {
        root = new PrefixNode();
    }

    public void Add(string w, int length) {
        PrefixNode cur = root;
        for (int i = 0; i < length; i++) {
            int idx = w[i] - 'a';
            if (cur.children[idx] == null) {
                cur.children[idx] = new PrefixNode();
            }
            cur = cur.children[idx];
            cur.count++;
        }
    }

    public int Count(string pref) {
        PrefixNode cur = root;
        foreach (char c in pref) {
            int idx = c - 'a';
            if (cur.children[idx] == null) return 0;
            cur = cur.children[idx];
        }
        return cur.count;
    }
}

public class Solution {
    public int PrefixCount(string[] words, string pref) {
        PrefixTree prefixTree = new PrefixTree();
        foreach (string w in words) {
            if (w.Length >= pref.Length) {
                prefixTree.Add(w, pref.Length);
            }
        }
        return prefixTree.Count(pref);
    }
}
```

```go
type PrefixNode struct {
    children [26]*PrefixNode
    count    int
}

type PrefixTree struct {
    root *PrefixNode
}

func NewPrefixTree() *PrefixTree {
    return &PrefixTree{root: &PrefixNode{}}
}

func (t *PrefixTree) Add(w string, length int) {
    cur := t.root
    for i := 0; i < length; i++ {
        idx := w[i] - 'a'
        if cur.children[idx] == nil {
            cur.children[idx] = &PrefixNode{}
        }
        cur = cur.children[idx]
        cur.count++
    }
}

func (t *PrefixTree) Count(pref string) int {
    cur := t.root
    for _, c := range pref {
        idx := c - 'a'
        if cur.children[idx] == nil {
            return 0
        }
        cur = cur.children[idx]
    }
    return cur.count
}

func prefixCount(words []string, pref string) int {
    prefixTree := NewPrefixTree()
    for _, w := range words {
        if len(w) >= len(pref) {
            prefixTree.Add(w, len(pref))
        }
    }
    return prefixTree.Count(pref)
}
```

```kotlin
class PrefixNode {
    val children = arrayOfNulls<PrefixNode>(26)
    var count = 0
}

class PrefixTree {
    private val root = PrefixNode()

    fun add(w: String, length: Int) {
        var cur = root
        for (i in 0 until length) {
            val idx = w[i] - 'a'
            if (cur.children[idx] == null) {
                cur.children[idx] = PrefixNode()
            }
            cur = cur.children[idx]!!
            cur.count++
        }
    }

    fun count(pref: String): Int {
        var cur = root
        for (c in pref) {
            val idx = c - 'a'
            if (cur.children[idx] == null) return 0
            cur = cur.children[idx]!!
        }
        return cur.count
    }
}

class Solution {
    fun prefixCount(words: Array<String>, pref: String): Int {
        val prefixTree = PrefixTree()
        for (w in words) {
            if (w.length >= pref.length) {
                prefixTree.add(w, pref.length)
            }
        }
        return prefixTree.count(pref)
    }
}
```

```swift
class PrefixNode {
    var children = [Character: PrefixNode]()
    var count = 0
}

class PrefixTree {
    private let root = PrefixNode()

    func add(_ w: String, _ length: Int) {
        var cur = root
        let chars = Array(w)
        for i in 0..<length {
            let c = chars[i]
            if cur.children[c] == nil {
                cur.children[c] = PrefixNode()
            }
            cur = cur.children[c]!
            cur.count += 1
        }
    }

    func count(_ pref: String) -> Int {
        var cur = root
        for c in pref {
            if cur.children[c] == nil {
                return 0
            }
            cur = cur.children[c]!
        }
        return cur.count
    }
}

class Solution {
    func prefixCount(_ words: [String], _ pref: String) -> Int {
        let prefixTree = PrefixTree()
        for w in words {
            if w.count >= pref.count {
                prefixTree.add(w, pref.count)
            }
        }
        return prefixTree.count(pref)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * l + n)$
* Space complexity: $O(m * l)$

> Where $m$ is the number of words, $n$ is the length of the string $pref$ and $l$ is the maximum length of a word.

---

## Common Pitfalls

### Checking Contains Instead of Starts With

The problem asks for words that start with the prefix, not words that contain the prefix anywhere. Using a contains/includes check instead of a starts-with check will incorrectly count words where the prefix appears in the middle.

```python
# Wrong: Checks if prefix exists anywhere in the word
if pref in word:
    count += 1

# Correct: Checks if word starts with prefix
if word.startswith(pref):
    count += 1
```

### Not Handling Words Shorter Than the Prefix

When manually comparing characters, forgetting to check if the word is at least as long as the prefix leads to index out of bounds errors or incorrect matches.

```python
# Wrong: May cause index error if word is shorter than prefix
for i in range(len(pref)):
    if word[i] != pref[i]:  # Error when len(word) < len(pref)
        break

# Correct: Skip words shorter than the prefix
if len(word) < len(pref):
    continue
for i in range(len(pref)):
    if word[i] != pref[i]:
        break
```