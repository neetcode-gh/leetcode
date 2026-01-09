## 1. Hash Set

### Intuition

A folder is a subfolder if any of its ancestor paths exist in the input. We can check this efficiently by storing all folder paths in a hash set. For each folder, we examine every prefix ending at a `/` character. If any such prefix exists in the set, the current folder is a subfolder and should be excluded.

### Algorithm

1. Store all folder paths in a hash set for O(1) lookups.
2. For each folder path:
   - Add it to the result list.
   - Scan through the path and check every prefix that ends just before a `/`.
   - If any prefix exists in the set, remove the folder from the result and move on.
3. Return the result list.

::tabs-start

```python
class Solution:
    def removeSubfolders(self, folder: List[str]) -> List[str]:
        res = []
        folder_set = set(folder)

        for f in folder:
            res.append(f)
            for i in range(len(f)):
                if f[i] == "/" and f[:i] in folder_set:
                    res.pop()
                    break

        return res
```

```java
public class Solution {
    public List<String> removeSubfolders(String[] folder) {
        List<String> res = new ArrayList<>();
        Set<String> folder_set = new HashSet<>(Arrays.asList(folder));

        for (String f : folder) {
            res.add(f);
            for (int i = 0; i < f.length(); i++) {
                if (f.charAt(i) == '/' && folder_set.contains(f.substring(0, i))) {
                    res.remove(res.size() - 1);
                    break;
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
    vector<string> removeSubfolders(vector<string>& folder) {
        vector<string> res;
        unordered_set<string> folder_set(folder.begin(), folder.end());

        for (string& f : folder) {
            res.push_back(f);
            for (int i = 0; i < f.size(); i++) {
                if (f[i] == '/' && folder_set.count(f.substr(0, i))) {
                    res.pop_back();
                    break;
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
     * @param {string[]} folder
     * @return {string[]}
     */
    removeSubfolders(folder) {
        let res = [];
        let folder_set = new Set(folder);

        for (let f of folder) {
            res.push(f);
            for (let i = 0; i < f.length; i++) {
                if (f[i] === '/' && folder_set.has(f.slice(0, i))) {
                    res.pop();
                    break;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> RemoveSubfolders(string[] folder) {
        List<string> res = new List<string>();
        HashSet<string> folder_set = new HashSet<string>(folder);

        foreach (string f in folder) {
            res.Add(f);
            for (int i = 0; i < f.Length; i++) {
                if (f[i] == '/' && folder_set.Contains(f.Substring(0, i))) {
                    res.RemoveAt(res.Count - 1);
                    break;
                }
            }
        }

        return res;
    }
}
```

```go
func removeSubfolders(folder []string) []string {
    res := []string{}
    folderSet := make(map[string]bool)
    for _, f := range folder {
        folderSet[f] = true
    }

    for _, f := range folder {
        res = append(res, f)
        for i := 0; i < len(f); i++ {
            if f[i] == '/' && folderSet[f[:i]] {
                res = res[:len(res)-1]
                break
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun removeSubfolders(folder: Array<String>): List<String> {
        val res = mutableListOf<String>()
        val folderSet = folder.toHashSet()

        for (f in folder) {
            res.add(f)
            for (i in f.indices) {
                if (f[i] == '/' && folderSet.contains(f.substring(0, i))) {
                    res.removeAt(res.size - 1)
                    break
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func removeSubfolders(_ folder: [String]) -> [String] {
        var res = [String]()
        let folderSet = Set(folder)

        for f in folder {
            res.append(f)
            let chars = Array(f)
            for i in 0..<chars.count {
                if chars[i] == "/" && folderSet.contains(String(chars[0..<i])) {
                    res.removeLast()
                    break
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m ^ 2)$
* Space complexity: $O(n * m)$

> Where $n$ is the size of the string array $folder$ and $m$ is the length of each string.

---

## 2. Sorting

### Intuition

When folder paths are sorted lexicographically, parent folders always appear before their subfolders. This means if we iterate through the sorted list, a folder is a subfolder only if it starts with the most recently added result folder followed by `/`. We only need to compare against the last folder in our result, not all of them.

### Algorithm

1. Sort the folder array lexicographically.
2. Add the first folder to the result.
3. For each subsequent folder:
   - Check if it starts with the last result folder plus `/`.
   - If not, add it to the result.
4. Return the result list.

::tabs-start

```python
class Solution:
    def removeSubfolders(self, folder: List[str]) -> List[str]:
        folder.sort()
        res = [folder[0]]

        for i in range(1, len(folder)):
            if not folder[i].startswith(res[-1] + "/"):
                res.append(folder[i])

        return res
```

```java
public class Solution {
    public List<String> removeSubfolders(String[] folder) {
        Arrays.sort(folder);
        List<String> res = new ArrayList<>();
        res.add(folder[0]);

        for (int i = 1; i < folder.length; i++) {
            if (!folder[i].startsWith(res.get(res.size() - 1) + "/")) {
                res.add(folder[i]);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<string> removeSubfolders(vector<string>& folder) {
        sort(folder.begin(), folder.end());
        vector<string> res;
        res.push_back(folder[0]);

        for (int i = 1; i < folder.size(); i++) {
            if (folder[i].find(res.back() + "/") != 0) {
                res.push_back(folder[i]);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} folder
     * @return {string[]}
     */
    removeSubfolders(folder) {
        folder.sort();
        let res = [folder[0]];

        for (let i = 1; i < folder.length; i++) {
            if (!folder[i].startsWith(res[res.length - 1] + "/")) {
                res.push(folder[i]);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<string> RemoveSubfolders(string[] folder) {
        Array.Sort(folder);
        List<string> res = new List<string>();
        res.Add(folder[0]);

        for (int i = 1; i < folder.Length; i++) {
            if (!folder[i].StartsWith(res[res.Count - 1] + "/")) {
                res.Add(folder[i]);
            }
        }

        return res;
    }
}
```

```go
import "sort"

func removeSubfolders(folder []string) []string {
    sort.Strings(folder)
    res := []string{folder[0]}

    for i := 1; i < len(folder); i++ {
        last := res[len(res)-1] + "/"
        if len(folder[i]) < len(last) || folder[i][:len(last)] != last {
            res = append(res, folder[i])
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun removeSubfolders(folder: Array<String>): List<String> {
        folder.sort()
        val res = mutableListOf(folder[0])

        for (i in 1 until folder.size) {
            if (!folder[i].startsWith(res.last() + "/")) {
                res.add(folder[i])
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func removeSubfolders(_ folder: [String]) -> [String] {
        let sorted = folder.sorted()
        var res = [sorted[0]]

        for i in 1..<sorted.count {
            if !sorted[i].hasPrefix(res.last! + "/") {
                res.append(sorted[i])
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m ^ 2)$
* Space complexity: $O(n * m)$

> Where $n$ is the size of the string array $folder$ and $m$ is the length of each string.

---

## 3. Trie

### Intuition

A trie naturally represents hierarchical folder structures. Each node corresponds to a folder name segment, and we mark nodes that represent complete folder paths. When checking if a folder is a subfolder, we traverse the trie along its path. If we encounter a marked node before reaching the end, a parent folder exists, meaning this is a subfolder.

### Algorithm

1. Build a trie by inserting all folder paths:
   - Split each path by `/` and traverse or create nodes for each segment.
   - Mark the final node as `end_of_folder`.
2. For each folder, search the trie:
   - Traverse the path segment by segment.
   - If any node before the last is marked as `end_of_folder`, skip this folder.
3. Add non-subfolder paths to the result.
4. Return the result list.

::tabs-start

```python
class Trie:
    def __init__(self):
        self.children = {}  # string -> Trie
        self.end_of_folder = False

    def add(self, path: str) -> None:
        cur = self
        for f in path.split("/"):
            if f not in cur.children:
                cur.children[f] = Trie()
            cur = cur.children[f]
        cur.end_of_folder = True

    def prefix_search(self, path: str) -> bool:
        cur = self
        folders = path.split("/")
        for i in range(len(folders) - 1):
            cur = cur.children[folders[i]]
            if cur.end_of_folder:
                return True
        return False


class Solution:
    def removeSubfolders(self, folder: List[str]) -> List[str]:
        trie = Trie()
        for f in folder:
            trie.add(f)

        res = []
        for f in folder:
            if not trie.prefix_search(f):
                res.append(f)
        return res
```

```java
class Trie {
    Trie[] children = new Trie[128];
    boolean end_of_folder = false;

    void add(String path) {
        Trie cur = this;
        for (String f : path.split("/")) {
            if (f.isEmpty()) continue;
            for (char c : f.toCharArray()) {
                if (cur.children[c] == null) cur.children[c] = new Trie();
                cur = cur.children[c];
            }
            if (cur.children['/'] == null) cur.children['/'] = new Trie();
            cur = cur.children['/'];
        }
        cur.end_of_folder = true;
    }

    boolean prefixSearch(String path) {
        Trie cur = this;
        String[] folders = path.split("/");
        for (int i = 0; i < folders.length - 1; i++) {
            if (folders[i].isEmpty()) continue;
            for (char c : folders[i].toCharArray()) {
                cur = cur.children[c];
            }
            cur = cur.children['/'];
            if (cur.end_of_folder) return true;
        }
        return false;
    }
}

public class Solution {
    public List<String> removeSubfolders(String[] folder) {
        Trie trie = new Trie();
        for (String f : folder) trie.add(f);

        List<String> res = new ArrayList<>();
        for (String f : folder) {
            if (!trie.prefixSearch(f)) res.add(f);
        }
        return res;
    }
}
```

```cpp
class Trie {
public:
    Trie* children[128] = {};
    bool end_of_folder = false;

    void add(const string& path) {
        Trie* cur = this;
        string part;
        for (int i = 0; i < path.size(); i++) {
            if (path[i] == '/') {
                if (!part.empty()) {
                    for (char c : part) {
                        if (!cur->children[(int)c]) cur->children[(int)c] = new Trie();
                        cur = cur->children[(int)c];
                    }
                    if (!cur->children[(int)'/']) cur->children[(int)'/'] = new Trie();
                    cur = cur->children[(int)'/'];
                    part.clear();
                }
            } else {
                part += path[i];
            }
        }
        if (!part.empty()) {
            for (char c : part) {
                if (!cur->children[(int)c]) cur->children[(int)c] = new Trie();
                cur = cur->children[(int)c];
            }
            if (!cur->children[(int)'/']) cur->children[(int)'/'] = new Trie();
            cur = cur->children[(int)'/'];
        }
        cur->end_of_folder = true;
    }

    bool prefixSearch(const string& path) {
        Trie* cur = this;
        string part;
        for (int i = 0; i < (int)path.size(); i++) {
            if (path[i] == '/') {
                if (!part.empty()) {
                    for (char c : part) cur = cur->children[(int)c];
                    cur = cur->children[(int)'/'];
                    if (cur->end_of_folder) return true;
                    part.clear();
                }
            } else {
                part += path[i];
            }
        }
        return false;
    }
};

class Solution {
public:
    vector<string> removeSubfolders(vector<string>& folder) {
        Trie trie;
        for (auto& f : folder) trie.add(f);
        vector<string> res;
        for (auto& f : folder) {
            if (!trie.prefixSearch(f)) res.push_back(f);
        }
        return res;
    }
};
```

```javascript
class Trie {
    constructor() {
        this.children = new Array(128).fill(null);
        this.end_of_folder = false;
    }

    /**
     * @param {string[]} path
     * @return {void}
     */
    add(path) {
        let cur = this;
        for (let f of path.split("/")) {
            if (f === "") continue;
            for (let c of f) {
                if (!cur.children[c.charCodeAt(0)]) cur.children[c.charCodeAt(0)] = new Trie();
                cur = cur.children[c.charCodeAt(0)];
            }
            if (!cur.children['/'.charCodeAt(0)]) cur.children['/'.charCodeAt(0)] = new Trie();
            cur = cur.children['/'.charCodeAt(0)];
        }
        cur.end_of_folder = true;
    }

    /**
     * @param {string} path
     * @return {boolean}
     */
    prefixSearch(path) {
        let cur = this;
        let folders = path.split("/");
        for (let i = 0; i < folders.length - 1; i++) {
            if (folders[i] === "") continue;
            for (let c of folders[i]) {
                cur = cur.children[c.charCodeAt(0)];
            }
            cur = cur.children['/'.charCodeAt(0)];
            if (cur.end_of_folder) return true;
        }
        return false;
    }
}

class Solution {
    /**
     * @param {string[]} folder
     * @return {string[]}
     */
    removeSubfolders(folder) {
        let trie = new Trie();
        for (let f of folder) trie.add(f);

        let res = [];
        for (let f of folder) {
            if (!trie.prefixSearch(f)) res.push(f);
        }
        return res;
    }
}
```

```csharp
public class Trie {
    public Trie[] children = new Trie[128];
    public bool end_of_folder = false;

    public void Add(string path) {
        Trie cur = this;
        foreach (string f in path.Split('/')) {
            if (f.Length == 0) continue;
            foreach (char c in f) {
                if (cur.children[c] == null) cur.children[c] = new Trie();
                cur = cur.children[c];
            }
            if (cur.children['/'] == null) cur.children['/'] = new Trie();
            cur = cur.children['/'];
        }
        cur.end_of_folder = true;
    }

    public bool PrefixSearch(string path) {
        Trie cur = this;
        string[] folders = path.Split('/');
        for (int i = 0; i < folders.Length - 1; i++) {
            if (folders[i].Length == 0) continue;
            foreach (char c in folders[i]) cur = cur.children[c];
            cur = cur.children['/'];
            if (cur.end_of_folder) return true;
        }
        return false;
    }
}

public class Solution {
    public List<string> RemoveSubfolders(string[] folder) {
        Trie trie = new Trie();
        foreach (string f in folder) trie.Add(f);

        List<string> res = new List<string>();
        foreach (string f in folder) {
            if (!trie.PrefixSearch(f)) res.Add(f);
        }
        return res;
    }
}
```

```go
import "strings"

type Trie struct {
    children     map[string]*Trie
    endOfFolder  bool
}

func NewTrie() *Trie {
    return &Trie{children: make(map[string]*Trie)}
}

func (t *Trie) Add(path string) {
    cur := t
    for _, f := range strings.Split(path, "/") {
        if f == "" {
            continue
        }
        if cur.children[f] == nil {
            cur.children[f] = NewTrie()
        }
        cur = cur.children[f]
    }
    cur.endOfFolder = true
}

func (t *Trie) PrefixSearch(path string) bool {
    cur := t
    folders := strings.Split(path, "/")
    for i := 0; i < len(folders)-1; i++ {
        if folders[i] == "" {
            continue
        }
        cur = cur.children[folders[i]]
        if cur.endOfFolder {
            return true
        }
    }
    return false
}

func removeSubfolders(folder []string) []string {
    trie := NewTrie()
    for _, f := range folder {
        trie.Add(f)
    }

    res := []string{}
    for _, f := range folder {
        if !trie.PrefixSearch(f) {
            res = append(res, f)
        }
    }
    return res
}
```

```kotlin
class Trie {
    val children = mutableMapOf<String, Trie>()
    var endOfFolder = false

    fun add(path: String) {
        var cur = this
        for (f in path.split("/")) {
            if (f.isEmpty()) continue
            if (!cur.children.containsKey(f)) {
                cur.children[f] = Trie()
            }
            cur = cur.children[f]!!
        }
        cur.endOfFolder = true
    }

    fun prefixSearch(path: String): Boolean {
        var cur = this
        val folders = path.split("/")
        for (i in 0 until folders.size - 1) {
            if (folders[i].isEmpty()) continue
            cur = cur.children[folders[i]]!!
            if (cur.endOfFolder) return true
        }
        return false
    }
}

class Solution {
    fun removeSubfolders(folder: Array<String>): List<String> {
        val trie = Trie()
        for (f in folder) {
            trie.add(f)
        }

        val res = mutableListOf<String>()
        for (f in folder) {
            if (!trie.prefixSearch(f)) {
                res.add(f)
            }
        }
        return res
    }
}
```

```swift
class Trie {
    var children = [String: Trie]()
    var endOfFolder = false

    func add(_ path: String) {
        var cur = self
        for f in path.split(separator: "/") {
            let key = String(f)
            if key.isEmpty { continue }
            if cur.children[key] == nil {
                cur.children[key] = Trie()
            }
            cur = cur.children[key]!
        }
        cur.endOfFolder = true
    }

    func prefixSearch(_ path: String) -> Bool {
        var cur = self
        let folders = path.split(separator: "/").map { String($0) }
        for i in 0..<(folders.count - 1) {
            if folders[i].isEmpty { continue }
            cur = cur.children[folders[i]]!
            if cur.endOfFolder { return true }
        }
        return false
    }
}

class Solution {
    func removeSubfolders(_ folder: [String]) -> [String] {
        let trie = Trie()
        for f in folder {
            trie.add(f)
        }

        var res = [String]()
        for f in folder {
            if !trie.prefixSearch(f) {
                res.append(f)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m)$
* Space complexity: $O(n * m)$

> Where $n$ is the size of the string array $folder$ and $m$ is the length of each string.