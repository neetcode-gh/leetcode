## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 * m)$
* Space complexity: $O(1)$

> Where $n$ is the size of the input array $words$, and $m$ is the maximum length of a string.

---

## 2. Brute Force (Using Built-In Function)

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 * m)$
* Space complexity: $O(1)$

> Where $n$ is the size of the input array $words$, and $m$ is the maximum length of a string.

---

## 3. Trie

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m)$
* Space complexity: $O(n * m)$

> Where $n$ is the size of the input array $words$, and $m$ is the maximum length of a string.