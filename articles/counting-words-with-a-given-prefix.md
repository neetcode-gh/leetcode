## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(1)$

> Where $m$ is the number of words and $n$ is the length of the string $pref$.

---

## 2. Built-In Method

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(1)$

> Where $m$ is the number of words and $n$ is the length of the string $pref$.

---

## 3. Trie

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * l + n)$
* Space complexity: $O(m * l)$

> Where $m$ is the number of words, $n$ is the length of the string $pref$ and $l$ is the maximum length of a word.