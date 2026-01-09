## 1. Stack

### Intuition
A file system path can be naturally modeled using a stack. Moving into a folder pushes onto the stack, while moving to the parent folder pops from the stack. The operation `"./"` does nothing (stay in current folder). At the end, the stack's size represents how deep we are from the main folder, which equals the minimum operations needed to return.

### Algorithm
1. Initialize an empty stack.
2. For each log operation:
   - If it is `"../"`, pop from the stack if it is not empty (move to parent).
   - If it is `"./"`, do nothing (stay in current folder).
   - Otherwise, push the folder name onto the stack (move into child folder).
3. Return the size of the stack, representing the depth from the main folder.

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

```go
func minOperations(logs []string) int {
    stack := []string{}
    for _, log := range logs {
        if log == "../" {
            if len(stack) > 0 {
                stack = stack[:len(stack)-1]
            }
        } else if log != "./" {
            stack = append(stack, log)
        }
    }
    return len(stack)
}
```

```kotlin
class Solution {
    fun minOperations(logs: Array<String>): Int {
        val stack = ArrayDeque<String>()
        for (log in logs) {
            if (log == "../") {
                if (stack.isNotEmpty()) {
                    stack.removeLast()
                }
            } else if (log != "./") {
                stack.addLast(log)
            }
        }
        return stack.size
    }
}
```

```swift
class Solution {
    func minOperations(_ logs: [String]) -> Int {
        var stack = [String]()
        for log in logs {
            if log == "../" {
                if !stack.isEmpty {
                    stack.removeLast()
                }
            } else if log != "./" {
                stack.append(log)
            }
        }
        return stack.count
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 2. Iteration

### Intuition
We do not actually need to store the folder names since we only care about the depth. A simple counter can track how many levels deep we are. Moving into a folder increments the counter, moving to parent decrements it (but never below `0` since we cannot go above the main folder), and `"./"` leaves it unchanged.

### Algorithm
1. Initialize a depth counter to `0`.
2. For each log operation:
   - If it is `"./"`, skip (no change in depth).
   - If it is `"../"`, decrement the counter but ensure it does not go below `0`.
   - Otherwise, increment the counter (moving into a child folder).
3. Return the counter value as the minimum operations to return to main folder.

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

```go
func minOperations(logs []string) int {
    res := 0
    for _, log := range logs {
        if log == "./" {
            continue
        }
        if log == "../" {
            if res > 0 {
                res--
            }
        } else {
            res++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun minOperations(logs: Array<String>): Int {
        var res = 0
        for (log in logs) {
            if (log == "./") {
                continue
            }
            if (log == "../") {
                res = maxOf(0, res - 1)
            } else {
                res++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func minOperations(_ logs: [String]) -> Int {
        var res = 0
        for log in logs {
            if log == "./" {
                continue
            }
            if log == "../" {
                res = max(0, res - 1)
            } else {
                res += 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$