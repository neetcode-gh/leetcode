## 1. Stack - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Stack - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
