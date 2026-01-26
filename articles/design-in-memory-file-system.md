## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Tree Data Structures** - Modeling hierarchical relationships like directories and subdirectories
- **Hash Maps/Dictionaries** - Storing and retrieving children nodes by name efficiently
- **String Parsing** - Splitting file paths by delimiters and traversing path components
- **Object-Oriented Design** - Creating classes to represent files and directories with their attributes

---

## 1. Using separate Directory and File List

### Intuition
A file system has a natural tree structure where each directory can contain subdirectories and files. We model this by creating a `Dir` class that holds two hash maps: one for subdirectories and one for files. The root of the file system is a single `Dir` object. When we need to navigate to a path, we split it by "/" and traverse through the tree one directory at a time. This separation of directories and files makes it easy to distinguish between them when listing contents or reading file data.

### Algorithm
1. **Initialization:** Create a root `Dir` object with empty maps for subdirectories and files.
2. **ls(path):** Split the path and traverse to the target. If the last component is a file, return just its name. Otherwise, collect all directory and file names at that location, sort them, and return.
3. **mkdir(path):** Split the path and traverse from root. At each level, create a new `Dir` if it does not exist, then move into it.
4. **addContentToFile(filePath, content):** Navigate to the parent directory, then append the content to the file (creating it if needed).
5. **readContentFromFile(filePath):** Navigate to the parent directory and return the file's content.

::tabs-start

```python
class FileSystem:
    class Dir:
        def __init__(self):
            self.dirs = {}
            self.files = {}
    
    def __init__(self):
        self.root = self.Dir()
    
    def ls(self, path: str) -> List[str]:
        t = self.root
        files = []
        
        if path != "/":
            d = path.split("/")

            for i in range(1, len(d) - 1):
                t = t.dirs[d[i]]
            
            if d[-1] in t.files:
                files.append(d[-1])
                return files
            else:
                t = t.dirs[d[-1]]
        
        files.extend(t.dirs.keys())
        files.extend(t.files.keys())
        files.sort()
        return files
    
    def mkdir(self, path: str) -> None:
        t = self.root
        d = path.split("/")
        
        for i in range(1, len(d)):
            if d[i] not in t.dirs:
                t.dirs[d[i]] = self.Dir()
            t = t.dirs[d[i]]
    
    def addContentToFile(self, filePath: str, content: str) -> None:
        t = self.root
        d = filePath.split("/")
        
        for i in range(1, len(d) - 1):
            t = t.dirs[d[i]]
        
        if d[-1] not in t.files:
            t.files[d[-1]] = ""
        t.files[d[-1]] += content
    
    def readContentFromFile(self, filePath: str) -> str:
        t = self.root
        d = filePath.split("/")
        
        for i in range(1, len(d) - 1):
            t = t.dirs[d[i]]
        
        return t.files[d[-1]]
```

```java
class FileSystem {

    class Dir {
        HashMap < String, Dir > dirs = new HashMap < > ();
        HashMap < String, String > files = new HashMap < > ();
    }

    Dir root;

    public FileSystem() {
        root = new Dir();
    }

    public List < String > ls(String path) {
        Dir t = root;
        List < String > files = new ArrayList < > ();
        if (!path.equals("/")) {
            String[] d = path.split("/");
            for (int i = 1; i < d.length - 1; i++) {
                t = t.dirs.get(d[i]);
            }
            if (t.files.containsKey(d[d.length - 1])) {
                files.add(d[d.length - 1]);
                return files;
            } else {
                t = t.dirs.get(d[d.length - 1]);
            }
        }
        files.addAll(new ArrayList < > (t.dirs.keySet()));
        files.addAll(new ArrayList < > (t.files.keySet()));
        Collections.sort(files);
        return files;
    }

    public void mkdir(String path) {
        Dir t = root;
        String[] d = path.split("/");
        for (int i = 1; i < d.length; i++) {
            if (!t.dirs.containsKey(d[i]))
                t.dirs.put(d[i], new Dir());
            t = t.dirs.get(d[i]);
        }
    }

    public void addContentToFile(String filePath, String content) {
        Dir t = root;
        String[] d = filePath.split("/");
        for (int i = 1; i < d.length - 1; i++) {
            t = t.dirs.get(d[i]);
        }
        t.files.put(d[d.length - 1], t.files.getOrDefault(d[d.length - 1], "") + content);
    }

    public String readContentFromFile(String filePath) {
        Dir t = root;
        String[] d = filePath.split("/");
        for (int i = 1; i < d.length - 1; i++) {
            t = t.dirs.get(d[i]);
        }
        return t.files.get(d[d.length - 1]);
    }
}
```

```cpp
class FileSystem {
private:
    class Dir {
    public:
        unordered_map<string, Dir*> dirs;
        unordered_map<string, string> files;
    };
    
    Dir* root;
    
    vector<string> split(const string& path) {
        vector<string> result;
        string current = "";
        
        for (char c : path) {
            if (c == '/') {
                if (!current.empty()) {
                    result.push_back(current);
                    current = "";
                }
            } else {
                current += c;
            }
        }
        if (!current.empty()) {
            result.push_back(current);
        }
        
        return result;
    }
    
public:
    FileSystem() {
        root = new Dir();
    }
    
    vector<string> ls(string path) {
        Dir* t = root;
        vector<string> files;
        
        if (path != "/") {
            vector<string> d = split(path);
            
            for (int i = 0; i < d.size() - 1; i++) {
                t = t->dirs[d[i]];
            }
            
            if (t->files.find(d[d.size() - 1]) != t->files.end()) {
                files.push_back(d[d.size() - 1]);
                return files;
            } else {
                t = t->dirs[d[d.size() - 1]];
            }
        }
        
        for (auto& pair : t->dirs) {
            files.push_back(pair.first);
        }
        
        for (auto& pair : t->files) {
            files.push_back(pair.first);
        }
        
        sort(files.begin(), files.end());
        return files;
    }
    
    void mkdir(string path) {
        Dir* t = root;
        vector<string> d = split(path);
        
        for (int i = 0; i < d.size(); i++) {
            if (t->dirs.find(d[i]) == t->dirs.end()) {
                t->dirs[d[i]] = new Dir();
            }
            t = t->dirs[d[i]];
        }
    }
    
    void addContentToFile(string filePath, string content) {
        Dir* t = root;
        vector<string> d = split(filePath);
        
        for (int i = 0; i < d.size() - 1; i++) {
            t = t->dirs[d[i]];
        }
        
        t->files[d[d.size() - 1]] += content;
    }
    
    string readContentFromFile(string filePath) {
        Dir* t = root;
        vector<string> d = split(filePath);
        
        for (int i = 0; i < d.size() - 1; i++) {
            t = t->dirs[d[i]];
        }
        
        return t->files[d[d.size() - 1]];
    }
};
```

```javascript
class FileSystem {
    constructor() {
        this.root = {
            dirs: new Map(),
            files: new Map()
        };
    }
    
    /** 
     * @param {string} path
     * @return {string[]}
     */
    ls(path) {
        let t = this.root;
        let files = [];
        
        if (path !== "/") {
            const d = path.split("/").filter(x => x !== "");
            
            for (let i = 0; i < d.length - 1; i++) {
                t = t.dirs.get(d[i]);
            }
            
            if (t.files.has(d[d.length - 1])) {
                files.push(d[d.length - 1]);
                return files;
            } else {
                t = t.dirs.get(d[d.length - 1]);
            }
        }
        
        files.push(...t.dirs.keys());
        files.push(...t.files.keys());
        files.sort();
        return files;
    }
    
    /** 
     * @param {string} path
     * @return {void}
     */
    mkdir(path) {
        let t = this.root;
        const d = path.split("/").filter(x => x !== "");
        
        for (let i = 0; i < d.length; i++) {
            if (!t.dirs.has(d[i])) {
                t.dirs.set(d[i], {
                    dirs: new Map(),
                    files: new Map()
                });
            }
            t = t.dirs.get(d[i]);
        }
    }
    
    /** 
     * @param {string} filePath 
     * @param {string} content
     * @return {void}
     */
    addContentToFile(filePath, content) {
        let t = this.root;
        const d = filePath.split("/").filter(x => x !== "");
        
        for (let i = 0; i < d.length - 1; i++) {
            t = t.dirs.get(d[i]);
        }
        
        const fileName = d[d.length - 1];
        const currentContent = t.files.get(fileName) || "";
        t.files.set(fileName, currentContent + content);
    }
    
    /** 
     * @param {string} filePath
     * @return {string}
     */
    readContentFromFile(filePath) {
        let t = this.root;
        const d = filePath.split("/").filter(x => x !== "");
        
        for (let i = 0; i < d.length - 1; i++) {
            t = t.dirs.get(d[i]);
        }
        
        return t.files.get(d[d.length - 1]);
    }
}
```

```csharp
public class FileSystem {
    private class Dir {
        public Dictionary<string, Dir> dirs = new Dictionary<string, Dir>();
        public Dictionary<string, string> files = new Dictionary<string, string>();
    }

    private Dir root;

    public FileSystem() {
        root = new Dir();
    }

    public IList<string> Ls(string path) {
        Dir t = root;
        List<string> files = new List<string>();

        if (path != "/") {
            string[] d = path.Split('/');
            for (int i = 1; i < d.Length - 1; i++) {
                t = t.dirs[d[i]];
            }
            if (t.files.ContainsKey(d[d.Length - 1])) {
                files.Add(d[d.Length - 1]);
                return files;
            } else {
                t = t.dirs[d[d.Length - 1]];
            }
        }

        files.AddRange(t.dirs.Keys);
        files.AddRange(t.files.Keys);
        files.Sort();
        return files;
    }

    public void Mkdir(string path) {
        Dir t = root;
        string[] d = path.Split('/');
        for (int i = 1; i < d.Length; i++) {
            if (!t.dirs.ContainsKey(d[i])) {
                t.dirs[d[i]] = new Dir();
            }
            t = t.dirs[d[i]];
        }
    }

    public void AddContentToFile(string filePath, string content) {
        Dir t = root;
        string[] d = filePath.Split('/');
        for (int i = 1; i < d.Length - 1; i++) {
            t = t.dirs[d[i]];
        }
        if (!t.files.ContainsKey(d[d.Length - 1])) {
            t.files[d[d.Length - 1]] = "";
        }
        t.files[d[d.Length - 1]] += content;
    }

    public string ReadContentFromFile(string filePath) {
        Dir t = root;
        string[] d = filePath.Split('/');
        for (int i = 1; i < d.Length - 1; i++) {
            t = t.dirs[d[i]];
        }
        return t.files[d[d.Length - 1]];
    }
}
```

```go
type Dir struct {
    dirs  map[string]*Dir
    files map[string]string
}

type FileSystem struct {
    root *Dir
}

func Constructor() FileSystem {
    return FileSystem{root: &Dir{
        dirs:  make(map[string]*Dir),
        files: make(map[string]string),
    }}
}

func (this *FileSystem) Ls(path string) []string {
    t := this.root
    files := []string{}

    if path != "/" {
        d := strings.Split(path, "/")[1:]

        for i := 0; i < len(d)-1; i++ {
            t = t.dirs[d[i]]
        }

        if _, ok := t.files[d[len(d)-1]]; ok {
            return []string{d[len(d)-1]}
        } else {
            t = t.dirs[d[len(d)-1]]
        }
    }

    for k := range t.dirs {
        files = append(files, k)
    }
    for k := range t.files {
        files = append(files, k)
    }
    sort.Strings(files)
    return files
}

func (this *FileSystem) Mkdir(path string) {
    t := this.root
    d := strings.Split(path, "/")[1:]

    for i := 0; i < len(d); i++ {
        if _, ok := t.dirs[d[i]]; !ok {
            t.dirs[d[i]] = &Dir{
                dirs:  make(map[string]*Dir),
                files: make(map[string]string),
            }
        }
        t = t.dirs[d[i]]
    }
}

func (this *FileSystem) AddContentToFile(filePath string, content string) {
    t := this.root
    d := strings.Split(filePath, "/")[1:]

    for i := 0; i < len(d)-1; i++ {
        t = t.dirs[d[i]]
    }
    t.files[d[len(d)-1]] += content
}

func (this *FileSystem) ReadContentFromFile(filePath string) string {
    t := this.root
    d := strings.Split(filePath, "/")[1:]

    for i := 0; i < len(d)-1; i++ {
        t = t.dirs[d[i]]
    }
    return t.files[d[len(d)-1]]
}
```

```kotlin
class FileSystem() {
    private class Dir {
        val dirs = mutableMapOf<String, Dir>()
        val files = mutableMapOf<String, String>()
    }

    private val root = Dir()

    fun ls(path: String): List<String> {
        var t = root
        val files = mutableListOf<String>()

        if (path != "/") {
            val d = path.split("/").filter { it.isNotEmpty() }

            for (i in 0 until d.size - 1) {
                t = t.dirs[d[i]]!!
            }

            if (d.last() in t.files) {
                return listOf(d.last())
            } else {
                t = t.dirs[d.last()]!!
            }
        }

        files.addAll(t.dirs.keys)
        files.addAll(t.files.keys)
        files.sort()
        return files
    }

    fun mkdir(path: String) {
        var t = root
        val d = path.split("/").filter { it.isNotEmpty() }

        for (part in d) {
            if (part !in t.dirs) {
                t.dirs[part] = Dir()
            }
            t = t.dirs[part]!!
        }
    }

    fun addContentToFile(filePath: String, content: String) {
        var t = root
        val d = filePath.split("/").filter { it.isNotEmpty() }

        for (i in 0 until d.size - 1) {
            t = t.dirs[d[i]]!!
        }

        t.files[d.last()] = t.files.getOrDefault(d.last(), "") + content
    }

    fun readContentFromFile(filePath: String): String {
        var t = root
        val d = filePath.split("/").filter { it.isNotEmpty() }

        for (i in 0 until d.size - 1) {
            t = t.dirs[d[i]]!!
        }

        return t.files[d.last()]!!
    }
}
```

```swift
class FileSystem {
    private class Dir {
        var dirs: [String: Dir] = [:]
        var files: [String: String] = [:]
    }

    private var root: Dir

    init() {
        root = Dir()
    }

    func ls(_ path: String) -> [String] {
        var t = root
        var files: [String] = []

        if path != "/" {
            let d = path.split(separator: "/").map(String.init)

            for i in 0..<d.count - 1 {
                t = t.dirs[d[i]]!
            }

            if t.files[d[d.count - 1]] != nil {
                return [d[d.count - 1]]
            } else {
                t = t.dirs[d[d.count - 1]]!
            }
        }

        files.append(contentsOf: t.dirs.keys)
        files.append(contentsOf: t.files.keys)
        files.sort()
        return files
    }

    func mkdir(_ path: String) {
        var t = root
        let d = path.split(separator: "/").map(String.init)

        for part in d {
            if t.dirs[part] == nil {
                t.dirs[part] = Dir()
            }
            t = t.dirs[part]!
        }
    }

    func addContentToFile(_ filePath: String, _ content: String) {
        var t = root
        let d = filePath.split(separator: "/").map(String.init)

        for i in 0..<d.count - 1 {
            t = t.dirs[d[i]]!
        }

        t.files[d[d.count - 1], default: ""] += content
    }

    func readContentFromFile(_ filePath: String) -> String {
        var t = root
        let d = filePath.split(separator: "/").map(String.init)

        for i in 0..<d.count - 1 {
            t = t.dirs[d[i]]!
        }

        return t.files[d[d.count - 1]]!
    }
}
```

::tabs-end

### Time Complexity

- The time complexity of executing an `ls` command : $O(m + n + k\log (k))$
    - Here $m$ is the length of the input string, $n$ is the depth of the last directory level in the given input for `ls`, and $k$ is the number of entries(files + subdirectories) in the last level directory(in the current input)

- The time complexity of executing a `mkdir` command : $O(m + n)$
    - Here $m$ is the length of the input string and $n$ is the depth of the last directory level in the given input for `mkdir`

- The time complexity of both `addContentToFile` and `readContentFromFile` : $O(m + n)$
    - Here $m$ is the length of the input string and $n$ refers to the depth of the file name in the current input

## Common Pitfalls

### Forgetting to Handle the Root Path

When the path is `"/"`, splitting by `"/"` produces an empty string or array depending on the language. Failing to handle this case causes index errors or incorrect traversal.

```python
# Wrong: assumes d[1] always exists
d = path.split("/")
t = t.dirs[d[1]]  # IndexError when path is "/"

# Correct: check for root path first
if path != "/":
    d = path.split("/")
    for i in range(1, len(d)):
        t = t.dirs[d[i]]
```

### Confusing Files and Directories in ls()

The `ls` command must return just the file name (not contents) when the path points to a file, but return sorted directory contents when pointing to a directory. Mixing up these cases leads to wrong output.

```python
# Wrong: always treating path as directory
return sorted(t.dirs.keys()) + sorted(t.files.keys())

# Correct: check if final component is a file
if d[-1] in t.files:
    return [d[-1]]  # Return just the filename
else:
    t = t.dirs[d[-1]]
    return sorted(list(t.dirs.keys()) + list(t.files.keys()))
```

### Replacing File Content Instead of Appending

The `addContentToFile` method should append to existing content, not replace it. This is a common oversight that causes test failures.

```python
# Wrong: overwrites existing content
t.files[filename] = content

# Correct: append to existing content
t.files[filename] = t.files.get(filename, "") + content
```

### Off-by-One Errors in Path Traversal

When navigating to a file's parent directory, you must stop one level before the final component. Traversing all the way causes you to look for the file as a directory.

```python
# Wrong: traverses to the file itself (crashes if file isn't a directory)
for i in range(1, len(d)):
    t = t.dirs[d[i]]

# Correct: stop before the last component
for i in range(1, len(d) - 1):
    t = t.dirs[d[i]]
# Now access the file: t.files[d[-1]]
```

### Not Sorting ls() Output

The problem requires `ls` to return entries in lexicographical order. Forgetting to sort causes wrong answer even when the data structure is correct.

```python
# Wrong: returns unsorted keys
return list(t.dirs.keys()) + list(t.files.keys())

# Correct: sort the combined result
files = list(t.dirs.keys()) + list(t.files.keys())
files.sort()
return files
```

---

## 2. Using unified Directory and File List

### Intuition
Instead of maintaining separate maps for directories and files, we can use a single unified structure. Each node in our tree is a `File` object that can act as either a directory or a file. A boolean flag `isFile` tells us which role it plays. Directories store child nodes in a map, while files store their content in a string. This unified approach simplifies the data structure since we only need one type of node, and path traversal becomes more uniform.

### Algorithm
1. **Initialization:** Create a root `File` object with `isFile = false` and an empty children map.
2. **ls(path):** Split the path and traverse through children. If the final node is a file, return its name. Otherwise, return the sorted keys of its children map.
3. **mkdir(path):** Split the path and create child `File` nodes (as directories) along the way if they do not exist.
4. **addContentToFile(filePath, content):** Traverse to the parent, create the file node if missing, mark it as a file, and append the content.
5. **readContentFromFile(filePath):** Traverse to the file node and return its content.

::tabs-start

```java
class FileSystem {

    class File {
        boolean isfile = false;
        HashMap < String, File > files = new HashMap < > ();
        String content = "";
    }
    
    File root;
    public FileSystem() {
        root = new File();
    }

    public List < String > ls(String path) {
        File t = root;
        List < String > files = new ArrayList < > ();
        if (!path.equals("/")) {
            String[] d = path.split("/");
            for (int i = 1; i < d.length; i++) {
                t = t.files.get(d[i]);
            }
            if (t.isfile) {
                files.add(d[d.length - 1]);
                return files;
            }
        }
        List < String > res_files = new ArrayList < > (t.files.keySet());
        Collections.sort(res_files);
        return res_files;
    }

    public void mkdir(String path) {
        File t = root;
        String[] d = path.split("/");
        for (int i = 1; i < d.length; i++) {
            if (!t.files.containsKey(d[i]))
                t.files.put(d[i], new File());
            t = t.files.get(d[i]);
        }
    }

    public void addContentToFile(String filePath, String content) {
        File t = root;
        String[] d = filePath.split("/");
        for (int i = 1; i < d.length - 1; i++) {
            t = t.files.get(d[i]);
        }
        if (!t.files.containsKey(d[d.length - 1]))
            t.files.put(d[d.length - 1], new File());
        t = t.files.get(d[d.length - 1]);
        t.isfile = true;
        t.content = t.content + content;
    }

    public String readContentFromFile(String filePath) {
        File t = root;
        String[] d = filePath.split("/");
        for (int i = 1; i < d.length - 1; i++) {
            t = t.files.get(d[i]);
        }
        return t.files.get(d[d.length - 1]).content;
    }
}
```

```python
class FileSystem:
    class File:
        def __init__(self):
            self.isfile = False
            self.files = {}
            self.content = ""

    def __init__(self):
        self.root = self.File()

    def ls(self, path: str) -> List[str]:
        t = self.root
        files = []
        if path != "/":
            d = path.split("/")
            for i in range(1, len(d)):
                t = t.files[d[i]]
            if t.isfile:
                files.append(d[-1])
                return files
        res_files = sorted(t.files.keys())
        return res_files

    def mkdir(self, path: str) -> None:
        t = self.root
        d = path.split("/")
        for i in range(1, len(d)):
            if d[i] not in t.files:
                t.files[d[i]] = self.File()
            t = t.files[d[i]]

    def addContentToFile(self, filePath: str, content: str) -> None:
        t = self.root
        d = filePath.split("/")
        for i in range(1, len(d) - 1):
            t = t.files[d[i]]
        if d[-1] not in t.files:
            t.files[d[-1]] = self.File()
        t = t.files[d[-1]]
        t.isfile = True
        t.content += content

    def readContentFromFile(self, filePath: str) -> str:
        t = self.root
        d = filePath.split("/")
        for i in range(1, len(d) - 1):
            t = t.files[d[i]]
        return t.files[d[-1]].content
```

```cpp
class FileSystem {
private:
    struct File {
        bool isfile = false;
        unordered_map<string, File*> files;
        string content = "";
    };

    File* root;

public:
    FileSystem() {
        root = new File();
    }

    vector<string> ls(string path) {
        File* t = root;
        vector<string> files;
        if (path != "/") {
            vector<string> d;
            stringstream ss(path);
            string item;
            while (getline(ss, item, '/')) {
                if (!item.empty()) d.push_back(item);
            }
            for (int i = 0; i < d.size(); i++) {
                t = t->files[d[i]];
            }
            if (t->isfile) {
                return {d[d.size() - 1]};
            }
        }
        for (auto& p : t->files) {
            files.push_back(p.first);
        }
        sort(files.begin(), files.end());
        return files;
    }

    void mkdir(string path) {
        File* t = root;
        vector<string> d;
        stringstream ss(path);
        string item;
        while (getline(ss, item, '/')) {
            if (!item.empty()) d.push_back(item);
        }
        for (int i = 0; i < d.size(); i++) {
            if (t->files.find(d[i]) == t->files.end()) {
                t->files[d[i]] = new File();
            }
            t = t->files[d[i]];
        }
    }

    void addContentToFile(string filePath, string content) {
        File* t = root;
        vector<string> d;
        stringstream ss(filePath);
        string item;
        while (getline(ss, item, '/')) {
            if (!item.empty()) d.push_back(item);
        }
        for (int i = 0; i < d.size() - 1; i++) {
            t = t->files[d[i]];
        }
        if (t->files.find(d[d.size() - 1]) == t->files.end()) {
            t->files[d[d.size() - 1]] = new File();
        }
        t = t->files[d[d.size() - 1]];
        t->isfile = true;
        t->content += content;
    }

    string readContentFromFile(string filePath) {
        File* t = root;
        vector<string> d;
        stringstream ss(filePath);
        string item;
        while (getline(ss, item, '/')) {
            if (!item.empty()) d.push_back(item);
        }
        for (int i = 0; i < d.size() - 1; i++) {
            t = t->files[d[i]];
        }
        return t->files[d[d.size() - 1]]->content;
    }
};
```

```javascript
class FileSystem {
    constructor() {
        this.root = {
            isfile: false,
            files: new Map(),
            content: ""
        };
    }

    ls(path) {
        let t = this.root;
        let files = [];
        if (path !== "/") {
            const d = path.split("/").filter(x => x !== "");
            for (let i = 0; i < d.length; i++) {
                t = t.files.get(d[i]);
            }
            if (t.isfile) {
                return [d[d.length - 1]];
            }
        }
        files = [...t.files.keys()].sort();
        return files;
    }

    mkdir(path) {
        let t = this.root;
        const d = path.split("/").filter(x => x !== "");
        for (let i = 0; i < d.length; i++) {
            if (!t.files.has(d[i])) {
                t.files.set(d[i], {
                    isfile: false,
                    files: new Map(),
                    content: ""
                });
            }
            t = t.files.get(d[i]);
        }
    }

    addContentToFile(filePath, content) {
        let t = this.root;
        const d = filePath.split("/").filter(x => x !== "");
        for (let i = 0; i < d.length - 1; i++) {
            t = t.files.get(d[i]);
        }
        if (!t.files.has(d[d.length - 1])) {
            t.files.set(d[d.length - 1], {
                isfile: false,
                files: new Map(),
                content: ""
            });
        }
        t = t.files.get(d[d.length - 1]);
        t.isfile = true;
        t.content += content;
    }

    readContentFromFile(filePath) {
        let t = this.root;
        const d = filePath.split("/").filter(x => x !== "");
        for (let i = 0; i < d.length - 1; i++) {
            t = t.files.get(d[i]);
        }
        return t.files.get(d[d.length - 1]).content;
    }
}
```

```csharp
public class FileSystem {
    private class File {
        public bool isfile = false;
        public Dictionary<string, File> files = new Dictionary<string, File>();
        public string content = "";
    }

    private File root;

    public FileSystem() {
        root = new File();
    }

    public IList<string> Ls(string path) {
        File t = root;
        List<string> files = new List<string>();
        if (path != "/") {
            string[] d = path.Split('/').Where(x => x != "").ToArray();
            for (int i = 0; i < d.Length; i++) {
                t = t.files[d[i]];
            }
            if (t.isfile) {
                return new List<string> { d[d.Length - 1] };
            }
        }
        files = t.files.Keys.ToList();
        files.Sort();
        return files;
    }

    public void Mkdir(string path) {
        File t = root;
        string[] d = path.Split('/').Where(x => x != "").ToArray();
        for (int i = 0; i < d.Length; i++) {
            if (!t.files.ContainsKey(d[i])) {
                t.files[d[i]] = new File();
            }
            t = t.files[d[i]];
        }
    }

    public void AddContentToFile(string filePath, string content) {
        File t = root;
        string[] d = filePath.Split('/').Where(x => x != "").ToArray();
        for (int i = 0; i < d.Length - 1; i++) {
            t = t.files[d[i]];
        }
        if (!t.files.ContainsKey(d[d.Length - 1])) {
            t.files[d[d.Length - 1]] = new File();
        }
        t = t.files[d[d.Length - 1]];
        t.isfile = true;
        t.content += content;
    }

    public string ReadContentFromFile(string filePath) {
        File t = root;
        string[] d = filePath.Split('/').Where(x => x != "").ToArray();
        for (int i = 0; i < d.Length - 1; i++) {
            t = t.files[d[i]];
        }
        return t.files[d[d.Length - 1]].content;
    }
}
```

```go
type File struct {
    isfile  bool
    files   map[string]*File
    content string
}

type FileSystem struct {
    root *File
}

func Constructor() FileSystem {
    return FileSystem{root: &File{files: make(map[string]*File)}}
}

func (this *FileSystem) Ls(path string) []string {
    t := this.root
    files := []string{}
    if path != "/" {
        d := strings.Split(path, "/")[1:]
        for i := 0; i < len(d); i++ {
            t = t.files[d[i]]
        }
        if t.isfile {
            return []string{d[len(d)-1]}
        }
    }
    for k := range t.files {
        files = append(files, k)
    }
    sort.Strings(files)
    return files
}

func (this *FileSystem) Mkdir(path string) {
    t := this.root
    d := strings.Split(path, "/")[1:]
    for i := 0; i < len(d); i++ {
        if _, ok := t.files[d[i]]; !ok {
            t.files[d[i]] = &File{files: make(map[string]*File)}
        }
        t = t.files[d[i]]
    }
}

func (this *FileSystem) AddContentToFile(filePath string, content string) {
    t := this.root
    d := strings.Split(filePath, "/")[1:]
    for i := 0; i < len(d)-1; i++ {
        t = t.files[d[i]]
    }
    if _, ok := t.files[d[len(d)-1]]; !ok {
        t.files[d[len(d)-1]] = &File{files: make(map[string]*File)}
    }
    t = t.files[d[len(d)-1]]
    t.isfile = true
    t.content += content
}

func (this *FileSystem) ReadContentFromFile(filePath string) string {
    t := this.root
    d := strings.Split(filePath, "/")[1:]
    for i := 0; i < len(d)-1; i++ {
        t = t.files[d[i]]
    }
    return t.files[d[len(d)-1]].content
}
```

```kotlin
class FileSystem() {
    private class File {
        var isfile = false
        val files = mutableMapOf<String, File>()
        var content = ""
    }

    private val root = File()

    fun ls(path: String): List<String> {
        var t = root
        if (path != "/") {
            val d = path.split("/").filter { it.isNotEmpty() }
            for (i in d.indices) {
                t = t.files[d[i]]!!
            }
            if (t.isfile) {
                return listOf(d.last())
            }
        }
        return t.files.keys.sorted()
    }

    fun mkdir(path: String) {
        var t = root
        val d = path.split("/").filter { it.isNotEmpty() }
        for (part in d) {
            if (part !in t.files) {
                t.files[part] = File()
            }
            t = t.files[part]!!
        }
    }

    fun addContentToFile(filePath: String, content: String) {
        var t = root
        val d = filePath.split("/").filter { it.isNotEmpty() }
        for (i in 0 until d.size - 1) {
            t = t.files[d[i]]!!
        }
        if (d.last() !in t.files) {
            t.files[d.last()] = File()
        }
        t = t.files[d.last()]!!
        t.isfile = true
        t.content += content
    }

    fun readContentFromFile(filePath: String): String {
        var t = root
        val d = filePath.split("/").filter { it.isNotEmpty() }
        for (i in 0 until d.size - 1) {
            t = t.files[d[i]]!!
        }
        return t.files[d.last()]!!.content
    }
}
```

```swift
class FileSystem {
    private class File {
        var isfile = false
        var files: [String: File] = [:]
        var content = ""
    }

    private var root: File

    init() {
        root = File()
    }

    func ls(_ path: String) -> [String] {
        var t = root
        if path != "/" {
            let d = path.split(separator: "/").map(String.init)
            for i in 0..<d.count {
                t = t.files[d[i]]!
            }
            if t.isfile {
                return [d[d.count - 1]]
            }
        }
        return t.files.keys.sorted()
    }

    func mkdir(_ path: String) {
        var t = root
        let d = path.split(separator: "/").map(String.init)
        for part in d {
            if t.files[part] == nil {
                t.files[part] = File()
            }
            t = t.files[part]!
        }
    }

    func addContentToFile(_ filePath: String, _ content: String) {
        var t = root
        let d = filePath.split(separator: "/").map(String.init)
        for i in 0..<d.count - 1 {
            t = t.files[d[i]]!
        }
        if t.files[d[d.count - 1]] == nil {
            t.files[d[d.count - 1]] = File()
        }
        t = t.files[d[d.count - 1]]!
        t.isfile = true
        t.content += content
    }

    func readContentFromFile(_ filePath: String) -> String {
        var t = root
        let d = filePath.split(separator: "/").map(String.init)
        for i in 0..<d.count - 1 {
            t = t.files[d[i]]!
        }
        return t.files[d[d.count - 1]]!.content
    }
}
```

::tabs-end

### Time Complexity

- The time complexity of executing an `ls` command : $O(m + n + k\log (k))$
    - Here $m$ is the length of the input string, $n$ is the depth of the last directory level in the given input for `ls`, and $k$ is the number of entries(files + subdirectories) in the last level directory(in the current input)

- The time complexity of executing a `mkdir` command : $O(m + n)$
    - Here $m$ is the length of the input string and $n$ is the depth of the last directory level in the given input for `mkdir`

- The time complexity of both `addContentToFile` and `readContentFromFile` : $O(m + n)$
    - Here $m$ is the length of the input string and $n$ refers to the depth of the file name in the current input
