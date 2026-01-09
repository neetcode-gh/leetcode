## 1. Stack - I

### Intuition

A Unix-style path can contain special directory references: `.` means the current directory (stay in place), and `..` means the parent directory (go up one level). Multiple slashes should be treated as a single separator. A stack is ideal here because navigating to a parent directory is just like popping from a stack, while entering a subdirectory is like pushing onto it.

### Algorithm

1. Append a trailing `/` to ensure the last directory name is processed.
2. Iterate character by character, building up the current directory name.
3. When encountering a `/`:
   - If the accumulated name is `..`, pop from the `stack` (if not empty).
   - If the name is a valid directory (not empty and not `.`), push it onto the `stack`.
   - Reset the current name.
4. Join the `stack` elements with `/` and prepend a leading `/` to form the canonical path.

::tabs-start

```python
class Solution:
    def simplifyPath(self, path: str) -> str:
        stack = []
        cur = ""

        for c in path + "/":
            if c == "/":
                if cur == "..":
                    if stack:
                        stack.pop()
                elif cur != "" and cur != ".":
                    stack.append(cur)
                cur = ""
            else:
                cur += c

        return "/" + "/".join(stack)
```

```java
public class Solution {
    public String simplifyPath(String path) {
        Stack<String> stack = new Stack<>();
        StringBuilder cur = new StringBuilder();

        for (char c : (path + "/").toCharArray()) {
            if (c == '/') {
                if (cur.toString().equals("..")) {
                    if (!stack.isEmpty()) stack.pop();
                } else if (!cur.toString().equals("") && !cur.toString().equals(".")) {
                    stack.push(cur.toString());
                }
                cur.setLength(0);
            } else {
                cur.append(c);
            }
        }

        return "/" + String.join("/", stack);
    }
}
```

```cpp
class Solution {
public:
    string simplifyPath(string path) {
        vector<string> stack;
        string cur;

        for (char c : path + "/") {
            if (c == '/') {
                if (cur == "..") {
                    if (!stack.empty()) stack.pop_back();
                } else if (!cur.empty() && cur != ".") {
                    stack.push_back(cur);
                }
                cur.clear();
            } else {
                cur += c;
            }
        }

        string result = "/";
        for (int i = 0; i < stack.size(); ++i) {
            if (i > 0) result += "/";
            result += stack[i];
        }

        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} path
     * @return {string}
     */
    simplifyPath(path) {
        const stack = [];
        let cur = '';

        for (const c of path + '/') {
            if (c === '/') {
                if (cur === '..') {
                    if (stack.length) stack.pop();
                } else if (cur !== '' && cur !== '.') {
                    stack.push(cur);
                }
                cur = '';
            } else {
                cur += c;
            }
        }

        return '/' + stack.join('/');
    }
}
```

```csharp
public class Solution {
    public string SimplifyPath(string path) {
        Stack<string> stack = new Stack<string>();
        string cur = "";

        foreach (char c in path + "/") {
            if (c == '/') {
                if (cur == "..") {
                    if (stack.Count > 0) stack.Pop();
                } else if (cur != "" && cur != ".") {
                    stack.Push(cur);
                }
                cur = "";
            } else {
                cur += c;
            }
        }

        var result = new List<string>(stack);
        result.Reverse();
        return "/" + string.Join("/", result);
    }
}
```

```go
func simplifyPath(path string) string {
    stack := []string{}
    cur := ""

    for _, c := range path + "/" {
        if c == '/' {
            if cur == ".." {
                if len(stack) > 0 {
                    stack = stack[:len(stack)-1]
                }
            } else if cur != "" && cur != "." {
                stack = append(stack, cur)
            }
            cur = ""
        } else {
            cur += string(c)
        }
    }

    return "/" + strings.Join(stack, "/")
}
```

```kotlin
class Solution {
    fun simplifyPath(path: String): String {
        val stack = ArrayDeque<String>()
        var cur = StringBuilder()

        for (c in path + "/") {
            if (c == '/') {
                val s = cur.toString()
                if (s == "..") {
                    if (stack.isNotEmpty()) stack.removeLast()
                } else if (s != "" && s != ".") {
                    stack.addLast(s)
                }
                cur = StringBuilder()
            } else {
                cur.append(c)
            }
        }

        return "/" + stack.joinToString("/")
    }
}
```

```swift
class Solution {
    func simplifyPath(_ path: String) -> String {
        var stack = [String]()
        var cur = ""

        for c in path + "/" {
            if c == "/" {
                if cur == ".." {
                    if !stack.isEmpty { stack.removeLast() }
                } else if cur != "" && cur != "." {
                    stack.append(cur)
                }
                cur = ""
            } else {
                cur += String(c)
            }
        }

        return "/" + stack.joined(separator: "/")
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Stack - II

### Intuition

Instead of processing character by character, we can split the path by `/` to get all the directory names at once. This simplifies the logic since we directly work with directory names rather than building them up. The same `stack`-based approach applies: push valid directories and pop on `..`.

### Algorithm

1. Split the path string by `/` to get an array of parts.
2. For each part:
   - If it equals `..`, pop from the `stack` (if not empty).
   - If it is a valid directory name (not empty and not `.`), push it onto the `stack`.
3. Join the `stack` with `/` and prepend a leading `/` to return the simplified path.

::tabs-start

```python
class Solution:
    def simplifyPath(self, path: str) -> str:
        stack = []
        paths = path.split("/")

        for cur in paths:
            if cur == "..":
                if stack:
                    stack.pop()
            elif cur != "" and cur != ".":
                stack.append(cur)

        return "/" + "/".join(stack)
```

```java
public class Solution {
    public String simplifyPath(String path) {
        Stack<String> stack = new Stack<>();
        String[] paths = path.split("/");

        for (String cur : paths) {
            if (cur.equals("..")) {
                if (!stack.isEmpty()) stack.pop();
            } else if (!cur.equals("") && !cur.equals(".")) {
                stack.push(cur);
            }
        }

        return "/" + String.join("/", stack);
    }
}
```

```cpp
class Solution {
public:
    string simplifyPath(string path) {
        vector<string> stack;
        string cur;
        stringstream ss(path);
        while (getline(ss, cur, '/')) {
            if (cur.empty()) continue;
            if (cur == "..") {
                if (!stack.empty()) stack.pop_back();
            } else if (!cur.empty() && cur != ".") {
                stack.push_back(cur);
            }
        }

        string result = "/";
        for (int i = 0; i < stack.size(); ++i) {
            if (i > 0) result += "/";
            result += stack[i];
        }

        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} path
     * @return {string}
     */
    simplifyPath(path) {
        const stack = [];
        const paths = path.split('/');

        for (const cur of paths) {
            if (cur === '..') {
                if (stack.length) {
                    stack.pop();
                }
            } else if (cur !== '' && cur !== '.') {
                stack.push(cur);
            }
        }

        return '/' + stack.join('/');
    }
}
```

```csharp
public class Solution {
    public string SimplifyPath(string path) {
        Stack<string> stack = new Stack<string>();
        string[] parts = path.Split('/');

        foreach (string part in parts) {
            if (part == "..") {
                if (stack.Count > 0) {
                    stack.Pop();
                }
            } else if (part != "" && part != ".") {
                stack.Push(part);
            }
        }

        var result = new List<string>(stack);
        result.Reverse();
        return "/" + string.Join("/", result);
    }
}
```

```go
func simplifyPath(path string) string {
    stack := []string{}
    paths := strings.Split(path, "/")

    for _, cur := range paths {
        if cur == ".." {
            if len(stack) > 0 {
                stack = stack[:len(stack)-1]
            }
        } else if cur != "" && cur != "." {
            stack = append(stack, cur)
        }
    }

    return "/" + strings.Join(stack, "/")
}
```

```kotlin
class Solution {
    fun simplifyPath(path: String): String {
        val stack = ArrayDeque<String>()
        val paths = path.split("/")

        for (cur in paths) {
            if (cur == "..") {
                if (stack.isNotEmpty()) stack.removeLast()
            } else if (cur != "" && cur != ".") {
                stack.addLast(cur)
            }
        }

        return "/" + stack.joinToString("/")
    }
}
```

```swift
class Solution {
    func simplifyPath(_ path: String) -> String {
        var stack = [String]()
        let paths = path.split(separator: "/")

        for cur in paths {
            let part = String(cur)
            if part == ".." {
                if !stack.isEmpty { stack.removeLast() }
            } else if part != "" && part != "." {
                stack.append(part)
            }
        }

        return "/" + stack.joined(separator: "/")
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
