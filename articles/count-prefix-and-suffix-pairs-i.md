## 1. Brute Force

### Intuition
For each pair of indices (i, j) where i < j, we need to check if words[i] is both a prefix and suffix of words[j]. We compare characters at the beginning and end of words[j] with words[i].

### Algorithm
1. Create a helper function that checks if s1 is both a prefix and suffix of s2.
2. First verify s1 is not longer than s2.
3. Compare s1 character by character with the start of s2 (prefix check).
4. Compare s1 character by character with the end of s2 (suffix check).
5. Iterate through all pairs (i, j) with i < j and count valid prefix-suffix pairs.

::tabs-start

```python
class Solution:
    def countPrefixSuffixPairs(self, words: List[str]) -> int:
        def isPrefixAndSuffix(s1, s2):
            if len(s1) > len(s2):
                return False

            for i in range(len(s1)):
                if s1[i] != s2[i]:
                    return False

            j = 0
            for i in range(len(s2) - len(s1), len(s2)):
                if s1[j] != s2[i]:
                    return False
                j += 1

            return True

        res = 0
        for i in range(len(words)):
            for j in range(i + 1, len(words)):
                res += isPrefixAndSuffix(words[i], words[j])
        return res
```

```java
public class Solution {
    public int countPrefixSuffixPairs(String[] words) {
        int res = 0;
        for (int i = 0; i < words.length; i++) {
            for (int j = i + 1; j < words.length; j++) {
                if (isPrefixAndSuffix(words[i], words[j])) {
                    res++;
                }
            }
        }
        return res;
    }

    private boolean isPrefixAndSuffix(String s1, String s2) {
        if (s1.length() > s2.length()) return false;

        for (int i = 0; i < s1.length(); i++) {
            if (s1.charAt(i) != s2.charAt(i)) return false;
        }

        int j = 0;
        for (int i = s2.length() - s1.length(); i < s2.length(); i++) {
            if (s1.charAt(j) != s2.charAt(i)) return false;
            j++;
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    int countPrefixSuffixPairs(vector<string>& words) {
        int res = 0;
        for (int i = 0; i < words.size(); i++) {
            for (int j = i + 1; j < words.size(); j++) {
                if (isPrefixAndSuffix(words[i], words[j])) {
                    res++;
                }
            }
        }
        return res;
    }

    bool isPrefixAndSuffix(string s1, string s2) {
        if (s1.size() > s2.size()) return false;

        for (int i = 0; i < s1.size(); i++) {
            if (s1[i] != s2[i]) return false;
        }

        int j = 0;
        for (int i = s2.size() - s1.size(); i < s2.size(); i++) {
            if (s1[j] != s2[i]) return false;
            j++;
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} words
     * @return {number}
     */
    countPrefixSuffixPairs(words) {
        const isPrefixAndSuffix = (s1, s2) => {
            if (s1.length > s2.length) return false;

            for (let i = 0; i < s1.length; i++) {
                if (s1[i] !== s2[i]) return false;
            }

            let j = 0;
            for (let i = s2.length - s1.length; i < s2.length; i++) {
                if (s1[j] !== s2[i]) return false;
                j++;
            }

            return true;
        };

        let res = 0;
        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j < words.length; j++) {
                if (isPrefixAndSuffix(words[i], words[j])) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CountPrefixSuffixPairs(string[] words) {
        int res = 0;
        for (int i = 0; i < words.Length; i++) {
            for (int j = i + 1; j < words.Length; j++) {
                if (IsPrefixAndSuffix(words[i], words[j])) {
                    res++;
                }
            }
        }
        return res;
    }

    private bool IsPrefixAndSuffix(string s1, string s2) {
        if (s1.Length > s2.Length) return false;

        for (int i = 0; i < s1.Length; i++) {
            if (s1[i] != s2[i]) return false;
        }

        int j = 0;
        for (int i = s2.Length - s1.Length; i < s2.Length; i++) {
            if (s1[j] != s2[i]) return false;
            j++;
        }

        return true;
    }
}
```

```go
func countPrefixSuffixPairs(words []string) int {
    isPrefixAndSuffix := func(s1, s2 string) bool {
        if len(s1) > len(s2) {
            return false
        }

        for i := 0; i < len(s1); i++ {
            if s1[i] != s2[i] {
                return false
            }
        }

        j := 0
        for i := len(s2) - len(s1); i < len(s2); i++ {
            if s1[j] != s2[i] {
                return false
            }
            j++
        }

        return true
    }

    res := 0
    for i := 0; i < len(words); i++ {
        for j := i + 1; j < len(words); j++ {
            if isPrefixAndSuffix(words[i], words[j]) {
                res++
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countPrefixSuffixPairs(words: Array<String>): Int {
        fun isPrefixAndSuffix(s1: String, s2: String): Boolean {
            if (s1.length > s2.length) return false

            for (i in s1.indices) {
                if (s1[i] != s2[i]) return false
            }

            var j = 0
            for (i in s2.length - s1.length until s2.length) {
                if (s1[j] != s2[i]) return false
                j++
            }

            return true
        }

        var res = 0
        for (i in words.indices) {
            for (j in i + 1 until words.size) {
                if (isPrefixAndSuffix(words[i], words[j])) {
                    res++
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countPrefixSuffixPairs(_ words: [String]) -> Int {
        func isPrefixAndSuffix(_ s1: String, _ s2: String) -> Bool {
            if s1.count > s2.count { return false }

            let arr1 = Array(s1)
            let arr2 = Array(s2)

            for i in 0..<arr1.count {
                if arr1[i] != arr2[i] { return false }
            }

            var j = 0
            for i in (arr2.count - arr1.count)..<arr2.count {
                if arr1[j] != arr2[i] { return false }
                j += 1
            }

            return true
        }

        var res = 0
        for i in 0..<words.count {
            for j in (i + 1)..<words.count {
                if isPrefixAndSuffix(words[i], words[j]) {
                    res += 1
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 * m)$
* Space complexity: $O(1)$

> Where $n$ is the size of the input array $words$, and $m$ is the maximum length of a string.

---

## 2. Brute Force (Using Built-In Function)

### Intuition
Most programming languages provide built-in methods to check if a string starts with or ends with another string. We can use these to simplify the prefix and suffix checks.

### Algorithm
1. Loop through all pairs (i, j) where i < j.
2. For each pair, check if words[j] starts with words[i] using the built-in prefix check.
3. Also check if words[j] ends with words[i] using the built-in suffix check.
4. If both conditions are true, increment the result counter.
5. Return the total count.

::tabs-start

```python
class Solution:
    def countPrefixSuffixPairs(self, words: List[str]) -> int:
        res = 0

        for i in range(len(words)):
            for j in range(i + 1, len(words)):
                w1, w2 = words[i], words[j]
                if w2.startswith(w1) and w2.endswith(w1):
                    res += 1

        return res
```

```java
public class Solution {
    public int countPrefixSuffixPairs(String[] words) {
        int res = 0;
        for (int i = 0; i < words.length; i++) {
            for (int j = i + 1; j < words.length; j++) {
                String w1 = words[i], w2 = words[j];
                if (w2.startsWith(w1) && w2.endsWith(w1)) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countPrefixSuffixPairs(vector<string>& words) {
        int res = 0;
        for (int i = 0; i < words.size(); i++) {
            for (int j = i + 1; j < words.size(); j++) {
                string w1 = words[i], w2 = words[j];
                if (w2.rfind(w1, 0) == 0 && 
                    w2.compare(w2.size() - w1.size(), w1.size(), w1) == 0) {
                    res++;
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
     * @param {string[]} words
     * @return {number}
     */
    countPrefixSuffixPairs(words) {
        let res = 0;
        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j < words.length; j++) {
                let w1 = words[i], w2 = words[j];
                if (w2.startsWith(w1) && w2.endsWith(w1)) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int CountPrefixSuffixPairs(string[] words) {
        int res = 0;
        for (int i = 0; i < words.Length; i++) {
            for (int j = i + 1; j < words.Length; j++) {
                string w1 = words[i], w2 = words[j];
                if (w2.StartsWith(w1) && w2.EndsWith(w1)) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```go
func countPrefixSuffixPairs(words []string) int {
    res := 0
    for i := 0; i < len(words); i++ {
        for j := i + 1; j < len(words); j++ {
            w1, w2 := words[i], words[j]
            if strings.HasPrefix(w2, w1) && strings.HasSuffix(w2, w1) {
                res++
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countPrefixSuffixPairs(words: Array<String>): Int {
        var res = 0
        for (i in words.indices) {
            for (j in i + 1 until words.size) {
                val w1 = words[i]
                val w2 = words[j]
                if (w2.startsWith(w1) && w2.endsWith(w1)) {
                    res++
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countPrefixSuffixPairs(_ words: [String]) -> Int {
        var res = 0
        for i in 0..<words.count {
            for j in (i + 1)..<words.count {
                let w1 = words[i]
                let w2 = words[j]
                if w2.hasPrefix(w1) && w2.hasSuffix(w1) {
                    res += 1
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 * m)$
* Space complexity: $O(1)$

> Where $n$ is the size of the input array $words$, and $m$ is the maximum length of a string.

---

## 3. Trie

### Intuition
We can use a trie where each node is keyed by a pair of characters: one from the prefix and one from the suffix. By processing words in reverse order and storing them in this combined trie, when we look up a word, we find how many previously seen words have it as both prefix and suffix.

### Algorithm
1. Create a trie where each edge is labeled by a pair (prefix char, suffix char).
2. Process words from the end of the array to the beginning.
3. For each word, traverse the trie using pairs of (word[i], word[n-1-i]) and count matches.
4. Then insert the word into the trie, incrementing counts at each node.
5. Return the total count of matching pairs.

::tabs-start

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.count = 0

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def add(self, w: str) -> None:
        cur = self.root
        for c1, c2 in zip(w, reversed(w)):
            if (c1, c2) not in cur.children:
                cur.children[(c1, c2)] = TrieNode()
            cur = cur.children[(c1, c2)]
            cur.count += 1

    def count(self, w: str) -> int:
        cur = self.root
        for c1, c2 in zip(w, reversed(w)):
            if (c1, c2) not in cur.children:
                return 0
            cur = cur.children[(c1, c2)]
        return cur.count

class Solution:
    def countPrefixSuffixPairs(self, words: List[str]) -> int:
        res = 0
        root = Trie()

        for w in reversed(words):
            res += root.count(w)
            root.add(w)

        return res
```

```java
class TrieNode {
    Map<String, TrieNode> children = new HashMap<>();
    int count = 0;
}

class Trie {
    TrieNode root = new TrieNode();

    void add(String w) {
        TrieNode cur = root;
        int n = w.length();
        for (int i = 0; i < n; i++) {
            String key = "" + w.charAt(i) + w.charAt(n - 1 - i);
            cur.children.putIfAbsent(key, new TrieNode());
            cur = cur.children.get(key);
            cur.count++;
        }
    }

    int count(String w) {
        TrieNode cur = root;
        int n = w.length();
        for (int i = 0; i < n; i++) {
            String key = "" + w.charAt(i) + w.charAt(n - 1 - i);
            if (!cur.children.containsKey(key)) return 0;
            cur = cur.children.get(key);
        }
        return cur.count;
    }
}

public class Solution {
    public int countPrefixSuffixPairs(String[] words) {
        int res = 0;
        Trie root = new Trie();
        for (int i = words.length - 1; i >= 0; i--) {
            res += root.count(words[i]);
            root.add(words[i]);
        }
        return res;
    }
}
```

```cpp
class TrieNode {
public:
    unordered_map<string, TrieNode*> children;
    int count = 0;
};

class Trie {
public:
    TrieNode* root;
    Trie() {
        root = new TrieNode();
    }

    void add(string w) {
        TrieNode* cur = root;
        int n = w.size();
        for (int i = 0; i < n; i++) {
            string key = string(1, w[i]) + w[n - 1 - i];
            if (cur->children.find(key) == cur->children.end()) {
                cur->children[key] = new TrieNode();
            }
            cur = cur->children[key];
            cur->count++;
        }
    }

    int count(string w) {
        TrieNode* cur = root;
        int n = w.size();
        for (int i = 0; i < n; i++) {
            string key = string(1, w[i]) + w[n - 1 - i];
            if (cur->children.find(key) == cur->children.end()) return 0;
            cur = cur->children[key];
        }
        return cur->count;
    }
};

class Solution {
public:
    int countPrefixSuffixPairs(vector<string>& words) {
        int res = 0;
        Trie root;
        for (int i = words.size() - 1; i >= 0; i--) {
            res += root.count(words[i]);
            root.add(words[i]);
        }
        return res;
    }
};
```

```javascript
class TrieNode {
    constructor() {
        this.children = new Map();
        this.count = 0;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} w
     * @return {void}
     */
    add(w) {
        let cur = this.root;
        let n = w.length;
        for (let i = 0; i < n; i++) {
            let key = w[i] + w[n - 1 - i];
            if (!cur.children.has(key)) {
                cur.children.set(key, new TrieNode());
            }
            cur = cur.children.get(key);
            cur.count++;
        }
    }

    /**
     * @param {string} words
     * @return {number}
     */
    count(w) {
        let cur = this.root;
        let n = w.length;
        for (let i = 0; i < n; i++) {
            let key = w[i] + w[n - 1 - i];
            if (!cur.children.has(key)) return 0;
            cur = cur.children.get(key);
        }
        return cur.count;
    }
}

class Solution {
    /**
     * @param {string[]} words
     * @return {number}
     */
    countPrefixSuffixPairs(words) {
        let res = 0;
        let root = new Trie();
        for (let i = words.length - 1; i >= 0; i--) {
            res += root.count(words[i]);
            root.add(words[i]);
        }
        return res;
    }
}
```

```csharp
public class TrieNode {
    public Dictionary<string, TrieNode> children = new Dictionary<string, TrieNode>();
    public int count = 0;
}

public class Trie {
    public TrieNode root = new TrieNode();

    public void Add(string w) {
        TrieNode cur = root;
        int n = w.Length;
        for (int i = 0; i < n; i++) {
            string key = w[i].ToString() + w[n - 1 - i];
            if (!cur.children.ContainsKey(key)) {
                cur.children[key] = new TrieNode();
            }
            cur = cur.children[key];
            cur.count++;
        }
    }

    public int Count(string w) {
        TrieNode cur = root;
        int n = w.Length;
        for (int i = 0; i < n; i++) {
            string key = w[i].ToString() + w[n - 1 - i];
            if (!cur.children.ContainsKey(key)) return 0;
            cur = cur.children[key];
        }
        return cur.count;
    }
}

public class Solution {
    public int CountPrefixSuffixPairs(string[] words) {
        int res = 0;
        Trie root = new Trie();
        for (int i = words.Length - 1; i >= 0; i--) {
            res += root.Count(words[i]);
            root.Add(words[i]);
        }
        return res;
    }
}
```

```go
type TrieNode struct {
    children map[string]*TrieNode
    count    int
}

func newTrieNode() *TrieNode {
    return &TrieNode{children: make(map[string]*TrieNode)}
}

type Trie struct {
    root *TrieNode
}

func newTrie() *Trie {
    return &Trie{root: newTrieNode()}
}

func (t *Trie) add(w string) {
    cur := t.root
    n := len(w)
    for i := 0; i < n; i++ {
        key := string(w[i]) + string(w[n-1-i])
        if _, ok := cur.children[key]; !ok {
            cur.children[key] = newTrieNode()
        }
        cur = cur.children[key]
        cur.count++
    }
}

func (t *Trie) getCount(w string) int {
    cur := t.root
    n := len(w)
    for i := 0; i < n; i++ {
        key := string(w[i]) + string(w[n-1-i])
        if _, ok := cur.children[key]; !ok {
            return 0
        }
        cur = cur.children[key]
    }
    return cur.count
}

func countPrefixSuffixPairs(words []string) int {
    res := 0
    trie := newTrie()
    for i := len(words) - 1; i >= 0; i-- {
        res += trie.getCount(words[i])
        trie.add(words[i])
    }
    return res
}
```

```kotlin
class TrieNode {
    val children = HashMap<String, TrieNode>()
    var count = 0
}

class Trie {
    val root = TrieNode()

    fun add(w: String) {
        var cur = root
        val n = w.length
        for (i in 0 until n) {
            val key = "${w[i]}${w[n - 1 - i]}"
            if (!cur.children.containsKey(key)) {
                cur.children[key] = TrieNode()
            }
            cur = cur.children[key]!!
            cur.count++
        }
    }

    fun count(w: String): Int {
        var cur = root
        val n = w.length
        for (i in 0 until n) {
            val key = "${w[i]}${w[n - 1 - i]}"
            if (!cur.children.containsKey(key)) return 0
            cur = cur.children[key]!!
        }
        return cur.count
    }
}

class Solution {
    fun countPrefixSuffixPairs(words: Array<String>): Int {
        var res = 0
        val trie = Trie()
        for (i in words.size - 1 downTo 0) {
            res += trie.count(words[i])
            trie.add(words[i])
        }
        return res
    }
}
```

```swift
class TrieNode {
    var children = [String: TrieNode]()
    var count = 0
}

class Trie {
    var root = TrieNode()

    func add(_ w: String) {
        var cur = root
        let chars = Array(w)
        let n = chars.count
        for i in 0..<n {
            let key = "\(chars[i])\(chars[n - 1 - i])"
            if cur.children[key] == nil {
                cur.children[key] = TrieNode()
            }
            cur = cur.children[key]!
            cur.count += 1
        }
    }

    func getCount(_ w: String) -> Int {
        var cur = root
        let chars = Array(w)
        let n = chars.count
        for i in 0..<n {
            let key = "\(chars[i])\(chars[n - 1 - i])"
            if cur.children[key] == nil { return 0 }
            cur = cur.children[key]!
        }
        return cur.count
    }
}

class Solution {
    func countPrefixSuffixPairs(_ words: [String]) -> Int {
        var res = 0
        let trie = Trie()
        for i in stride(from: words.count - 1, through: 0, by: -1) {
            res += trie.getCount(words[i])
            trie.add(words[i])
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m)$
* Space complexity: $O(n * m)$

> Where $n$ is the size of the input array $words$, and $m$ is the maximum length of a string.