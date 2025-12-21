## 1. Using separate Directory and File List

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

::tabs-end

### Time Complexity

- The time complexity of executing an `ls` command : $O(m + n + k\log (k))$
    - Here $m$ is the length of the input string, $n$ is the depth of the last directory level in the given input for `ls`, and $k$ is the number of entries(files + subdirectories) in the last level directory(in the current input)

- The time complexity of executing a `mkdir` command : $O(m + n)$
    - Here $m$ is the length of the input string and $n$ is the depth of the last directory level in the given input for `mkdir`

- The time complexity of both `addContentToFile` and `readContentFromFile` : $O(m + n)$
    - Here $m$ is the length of the input string and $n$ refers to the depth of the file name in the current input
>

---

## 2. Using unified Directory and File List

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

::tabs-end

### Time Complexity

- The time complexity of executing an `ls` command : $O(m + n + k\log (k))$
    - Here $m$ is the length of the input string, $n$ is the depth of the last directory level in the given input for `ls`, and $k$ is the number of entries(files + subdirectories) in the last level directory(in the current input)

- The time complexity of executing a `mkdir` command : $O(m + n)$
    - Here $m$ is the length of the input string and $n$ is the depth of the last directory level in the given input for `mkdir`

- The time complexity of both `addContentToFile` and `readContentFromFile` : $O(m + n)$
    - Here $m$ is the length of the input string and $n$ refers to the depth of the file name in the current input
