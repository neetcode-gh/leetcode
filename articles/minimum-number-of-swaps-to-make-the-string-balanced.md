## 1. Stack

::tabs-start

```python
class Solution:
    def minSwaps(self, s: str) -> int:
        stack = []
        for c in s:
            if c == '[':
                stack.append(c)
            elif stack:
                stack.pop()
        return (len(stack) + 1) // 2
```

```java
public class Solution {
    public int minSwaps(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '[') {
                stack.push(c);
            } else if (!stack.isEmpty()) {
                stack.pop();
            }
        }
        return (stack.size() + 1) / 2;
    }
}
```

```cpp
class Solution {
public:
    int minSwaps(string s) {
        vector<char> stack;
        for (char c : s) {
            if (c == '[') {
                stack.push_back(c);
            } else if (!stack.empty()) {
                stack.pop_back();
            }
        }
        return (stack.size() + 1) / 2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minSwaps(s) {
        let stack = [];
        for (const c of s) {
            if (c === '[') {
                stack.push(c);
            } else if (stack.length > 0) {
                stack.pop();
            }
        }
        return Math.floor((stack.length + 1) / 2);
    }
}
```

```csharp
public class Solution {
    public int MinSwaps(string s) {
        Stack<char> stack = new Stack<char>();
        foreach (char c in s) {
            if (c == '[') {
                stack.Push(c);
            } else if (stack.Count > 0) {
                stack.Pop();
            }
        }
        return (stack.Count + 1) / 2;
    }
}
```

```go
func minSwaps(s string) int {
    stack := 0
    for _, c := range s {
        if c == '[' {
            stack++
        } else if stack > 0 {
            stack--
        }
    }
    return (stack + 1) / 2
}
```

```kotlin
class Solution {
    fun minSwaps(s: String): Int {
        val stack = ArrayDeque<Char>()
        for (c in s) {
            if (c == '[') {
                stack.addLast(c)
            } else if (stack.isNotEmpty()) {
                stack.removeLast()
            }
        }
        return (stack.size + 1) / 2
    }
}
```

```swift
class Solution {
    func minSwaps(_ s: String) -> Int {
        var stack = [Character]()
        for c in s {
            if c == "[" {
                stack.append(c)
            } else if !stack.isEmpty {
                stack.removeLast()
            }
        }
        return (stack.count + 1) / 2
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Greedy - I

::tabs-start

```python
class Solution:
    def minSwaps(self, s: str) -> int:
        close = maxClose = 0

        for c in s:
            if c == '[':
                close -= 1
            else:
                close += 1
            maxClose = max(maxClose, close)

        return (maxClose + 1) // 2
```

```java
public class Solution {
    public int minSwaps(String s) {
        int close = 0, maxClose = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '[') close--;
            else close++;
            maxClose = Math.max(maxClose, close);
        }
        return (maxClose + 1) / 2;
    }
}
```

```cpp
class Solution {
public:
    int minSwaps(string s) {
        int close = 0, maxClose = 0;
        for (auto& c : s) {
            if (c == '[') close--;
            else close++;
            maxClose = max(maxClose, close);
        }
        return (maxClose + 1) / 2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minSwaps(s) {
        let close = 0,
            maxClose = 0;
        for (let i = 0; i < s.length; i++) {
            if (s.charAt(i) == '[') close--;
            else close++;
            maxClose = Math.max(maxClose, close);
        }
        return Math.floor((maxClose + 1) / 2);
    }
}
```

```csharp
public class Solution {
    public int MinSwaps(string s) {
        int close = 0, maxClose = 0;
        foreach (char c in s) {
            if (c == '[') close--;
            else close++;
            maxClose = Math.Max(maxClose, close);
        }
        return (maxClose + 1) / 2;
    }
}
```

```go
func minSwaps(s string) int {
    close, maxClose := 0, 0
    for _, c := range s {
        if c == '[' {
            close--
        } else {
            close++
        }
        if close > maxClose {
            maxClose = close
        }
    }
    return (maxClose + 1) / 2
}
```

```kotlin
class Solution {
    fun minSwaps(s: String): Int {
        var close = 0
        var maxClose = 0
        for (c in s) {
            if (c == '[') close--
            else close++
            maxClose = maxOf(maxClose, close)
        }
        return (maxClose + 1) / 2
    }
}
```

```swift
class Solution {
    func minSwaps(_ s: String) -> Int {
        var close = 0
        var maxClose = 0
        for c in s {
            if c == "[" {
                close -= 1
            } else {
                close += 1
            }
            maxClose = max(maxClose, close)
        }
        return (maxClose + 1) / 2
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Greedy - II

::tabs-start

```python
class Solution:
    def minSwaps(self, s: str) -> int:
        stackSize = 0
        for c in s:
            if c == '[':
                stackSize += 1
            elif stackSize > 0:
                stackSize -= 1
        return (stackSize + 1) // 2
```

```java
public class Solution {
    public int minSwaps(String s) {
        int stackSize = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '[') stackSize++;
            else if (stackSize > 0) stackSize--;
        }
        return (stackSize + 1) / 2;
    }
}
```

```cpp
class Solution {
public:
    int minSwaps(string s) {
        int stackSize = 0;
        for (auto& c : s) {
            if (c == '[') stackSize++;
            else if (stackSize > 0) stackSize--;
        }
        return (stackSize + 1) / 2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minSwaps(s) {
        let stackSize = 0;
        for (let i = 0; i < s.length; i++) {
            if (s.charAt(i) == '[') stackSize++;
            else if (stackSize > 0) stackSize--;
        }
        return Math.floor((stackSize + 1) / 2);
    }
}
```

```csharp
public class Solution {
    public int MinSwaps(string s) {
        int stackSize = 0;
        foreach (char c in s) {
            if (c == '[') stackSize++;
            else if (stackSize > 0) stackSize--;
        }
        return (stackSize + 1) / 2;
    }
}
```

```go
func minSwaps(s string) int {
    stackSize := 0
    for _, c := range s {
        if c == '[' {
            stackSize++
        } else if stackSize > 0 {
            stackSize--
        }
    }
    return (stackSize + 1) / 2
}
```

```kotlin
class Solution {
    fun minSwaps(s: String): Int {
        var stackSize = 0
        for (c in s) {
            if (c == '[') stackSize++
            else if (stackSize > 0) stackSize--
        }
        return (stackSize + 1) / 2
    }
}
```

```swift
class Solution {
    func minSwaps(_ s: String) -> Int {
        var stackSize = 0
        for c in s {
            if c == "[" {
                stackSize += 1
            } else if stackSize > 0 {
                stackSize -= 1
            }
        }
        return (stackSize + 1) / 2
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
