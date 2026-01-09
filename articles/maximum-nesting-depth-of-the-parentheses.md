## 1. Recursion

::tabs-start

```python
class Solution:
    def maxDepth(self, s: str) -> int:
        res = 0

        def dfs(i):
            nonlocal res
            if i == len(s):
                return 0

            cur = dfs(i + 1)
            if s[i] == '(':
                cur += 1
            elif s[i] == ')':
                cur -= 1

            res = max(res, abs(cur))
            return cur

        dfs(0)
        return res
```

```java
public class Solution {
    private int res = 0;

    public int maxDepth(String s) {
        dfs(s, 0);
        return res;
    }

    private int dfs(String s, int i) {
        if (i == s.length()) {
            return 0;
        }

        int cur = dfs(s, i + 1);
        if (s.charAt(i) == '(') {
            cur += 1;
        } else if (s.charAt(i) == ')') {
            cur -= 1;
        }

        res = Math.max(res, Math.abs(cur));
        return cur;
    }
}
```

```cpp
class Solution {
private:
    int res = 0;

    int dfs(const string& s, int i) {
        if (i == s.length()) {
            return 0;
        }

        int cur = dfs(s, i + 1);
        if (s[i] == '(') {
            cur += 1;
        } else if (s[i] == ')') {
            cur -= 1;
        }

        res = max(res, abs(cur));
        return cur;
    }

public:
    int maxDepth(string s) {
        dfs(s, 0);
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxDepth(s) {
        let res = 0;

        const dfs = (i) => {
            if (i === s.length) {
                return 0;
            }

            let cur = dfs(i + 1);
            if (s[i] === '(') {
                cur += 1;
            } else if (s[i] === ')') {
                cur -= 1;
            }

            res = Math.max(res, Math.abs(cur));
            return cur;
        };

        dfs(0);
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxDepth(string s) {
        int res = 0;

        int Dfs(int i) {
            if (i == s.Length) {
                return 0;
            }

            int cur = Dfs(i + 1);
            if (s[i] == '(') {
                cur += 1;
            }
            else if (s[i] == ')') {
                cur -= 1;
            }

            res = Math.Max(res, Math.Abs(cur));
            return cur;
        }

        Dfs(0);
        return res;
    }
}
```

```go
func maxDepth(s string) int {
    res := 0

    var dfs func(i int) int
    dfs = func(i int) int {
        if i == len(s) {
            return 0
        }

        cur := dfs(i + 1)
        if s[i] == '(' {
            cur += 1
        } else if s[i] == ')' {
            cur -= 1
        }

        if cur < 0 {
            if -cur > res {
                res = -cur
            }
        } else {
            if cur > res {
                res = cur
            }
        }
        return cur
    }

    dfs(0)
    return res
}
```

```kotlin
class Solution {
    fun maxDepth(s: String): Int {
        var res = 0

        fun dfs(i: Int): Int {
            if (i == s.length) {
                return 0
            }

            var cur = dfs(i + 1)
            if (s[i] == '(') {
                cur += 1
            } else if (s[i] == ')') {
                cur -= 1
            }

            res = maxOf(res, kotlin.math.abs(cur))
            return cur
        }

        dfs(0)
        return res
    }
}
```

```swift
class Solution {
    func maxDepth(_ s: String) -> Int {
        var res = 0
        let chars = Array(s)

        func dfs(_ i: Int) -> Int {
            if i == chars.count {
                return 0
            }

            var cur = dfs(i + 1)
            if chars[i] == "(" {
                cur += 1
            } else if chars[i] == ")" {
                cur -= 1
            }

            res = max(res, abs(cur))
            return cur
        }

        dfs(0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Stack

::tabs-start

```python
class Solution:
    def maxDepth(self, s: str) -> int:
        res, stack = 0, []

        for c in s:
            if c == "(":
                stack.append(c)
                res = max(res, len(stack))
            elif c == ")":
                stack.pop()

        return res
```

```java
public class Solution {
    public int maxDepth(String s) {
        int res = 0;
        Stack<Character> stack = new Stack<>();

        for (char c : s.toCharArray()) {
            if (c == '(') {
                stack.push(c);
                res = Math.max(res, stack.size());
            } else if (c == ')') {
                stack.pop();
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxDepth(string s) {
        int res = 0;
        stack<char> stack;

        for (char c : s) {
            if (c == '(') {
                stack.push(c);
                res = max(res, (int)stack.size());
            } else if (c == ')') {
                stack.pop();
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxDepth(s) {
        let res = 0;
        let stack = [];

        for (let c of s) {
            if (c === '(') {
                stack.push(c);
                res = Math.max(res, stack.length);
            } else if (c === ')') {
                stack.pop();
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxDepth(string s) {
        int res = 0;
        Stack<char> stack = new Stack<char>();

        foreach (char c in s) {
            if (c == '(') {
                stack.Push(c);
                res = Math.Max(res, stack.Count);
            }
            else if (c == ')') {
                stack.Pop();
            }
        }

        return res;
    }
}
```

```go
func maxDepth(s string) int {
    res := 0
    stack := []rune{}

    for _, c := range s {
        if c == '(' {
            stack = append(stack, c)
            if len(stack) > res {
                res = len(stack)
            }
        } else if c == ')' {
            stack = stack[:len(stack)-1]
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxDepth(s: String): Int {
        var res = 0
        val stack = ArrayDeque<Char>()

        for (c in s) {
            if (c == '(') {
                stack.addLast(c)
                res = maxOf(res, stack.size)
            } else if (c == ')') {
                stack.removeLast()
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func maxDepth(_ s: String) -> Int {
        var res = 0
        var stack = [Character]()

        for c in s {
            if c == "(" {
                stack.append(c)
                res = max(res, stack.count)
            } else if c == ")" {
                stack.removeLast()
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Iteration

::tabs-start

```python
class Solution:
    def maxDepth(self, s: str) -> int:
        res = 0
        cur = 0

        for c in s:
            if c == "(":
                cur += 1
            elif c == ")":
                cur -= 1
            res = max(res, cur)

        return res
```

```java
public class Solution {
    public int maxDepth(String s) {
        int res = 0, cur = 0;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(') {
                cur++;
            } else if (c == ')') {
                cur--;
            }
            res = Math.max(res, cur);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxDepth(string s) {
        int res = 0, cur = 0;

        for (char c : s) {
            if (c == '(') {
                cur++;
            } else if (c == ')') {
                cur--;
            }
            res = max(res, cur);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxDepth(s) {
        let res = 0,
            cur = 0;

        for (let c of s) {
            if (c === '(') {
                cur++;
            } else if (c === ')') {
                cur--;
            }
            res = Math.max(res, cur);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxDepth(string s) {
        int res = 0;
        int cur = 0;

        foreach (char c in s) {
            if (c == '(') {
                cur++;
            }
            else if (c == ')') {
                cur--;
            }
            res = Math.Max(res, cur);
        }

        return res;
    }
}
```

```go
func maxDepth(s string) int {
    res := 0
    cur := 0

    for _, c := range s {
        if c == '(' {
            cur++
        } else if c == ')' {
            cur--
        }
        if cur > res {
            res = cur
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxDepth(s: String): Int {
        var res = 0
        var cur = 0

        for (c in s) {
            if (c == '(') {
                cur++
            } else if (c == ')') {
                cur--
            }
            res = maxOf(res, cur)
        }

        return res
    }
}
```

```swift
class Solution {
    func maxDepth(_ s: String) -> Int {
        var res = 0
        var cur = 0

        for c in s {
            if c == "(" {
                cur += 1
            } else if c == ")" {
                cur -= 1
            }
            res = max(res, cur)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
