## 1. Stack

::tabs-start

```python
class Solution:
    def minOperations(self, logs: List[str]) -> int:
        stack = []
        for log in logs:
            if log == "../":
                if stack:
                    stack.pop()
            elif log != "./":
                stack.append(log)
        return len(stack)
```

```java
public class Solution {
    public int minOperations(String[] logs) {
        Stack<String> stack = new Stack<>();
        for (String log : logs) {
            if (log.equals("../")) {
                if (!stack.isEmpty()) {
                    stack.pop();
                }
            } else if (!log.equals("./")) {
                stack.push(log);
            }
        }
        return stack.size();
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<string>& logs) {
        stack<string> st;
        for (auto& log : logs) {
            if (log == "../") {
                if (!st.empty()) {
                    st.pop();
                }
            } else if (log != "./") {
                st.push(log);
            }
        }
        return st.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} logs
     * @return {number}
     */
    minOperations(logs) {
        let stack = [];
        for (let log of logs) {
            if (log === "../") {
                if (stack.length > 0) {
                    stack.pop();
                }
            } else if (log !== "./") {
                stack.push(log);
            }
        }
        return stack.length;
    }
}
```

```csharp
public class Solution {
    public int MinOperations(string[] logs) {
        Stack<string> stack = new Stack<string>();
        foreach (string log in logs) {
            if (log == "../") {
                if (stack.Count > 0) {
                    stack.Pop();
                }
            } else if (log != "./") {
                stack.Push(log);
            }
        }
        return stack.Count;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 2. Iteration

::tabs-start

```python
class Solution:
    def minOperations(self, logs: List[str]) -> int:
        res = 0
        for log in logs:
            if log == "./":
                continue
            if log == "../":
                res = max(0, res - 1)
            else:
                res += 1
        return res
```

```java
public class Solution {
    public int minOperations(String[] logs) {
        int res = 0;
        for (String log : logs) {
            if (log.equals("./")) {
                continue;
            }
            if (log.equals("../")) {
                res = Math.max(0, res - 1);
            } else {
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
    int minOperations(vector<string>& logs) {
        int res = 0;
        for (auto& log : logs) {
            if (log == "./") {
                continue;
            }
            if (log == "../") {
                res = max(0, res - 1);
            } else {
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
     * @param {string[]} logs
     * @return {number}
     */
    minOperations(logs) {
        let res = 0;
        for (let log of logs) {
            if (log === "./") {
                continue;
            }
            if (log === "../") {
                res = Math.max(0, res - 1);
            } else {
                res++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinOperations(string[] logs) {
        int res = 0;
        foreach (string log in logs) {
            if (log == "./") {
                continue;
            }
            if (log == "../") {
                res = Math.Max(0, res - 1);
            } else {
                res++;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$