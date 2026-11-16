## 1. Recursion

::tabs-start

```python
class Solution:
    def scoreOfParentheses(self, s: str) -> int:
        def dfs(l, r):
            res = bal = 0
            start = l
            for i in range(l, r):
                if s[i] == '(':
                    bal += 1
                else:
                    bal -= 1
                if bal == 0:
                    if i - start == 1:
                        res += 1
                    else:
                        res += 2 * dfs(start + 1, i)
                    start = i + 1
            return res

        return dfs(0, len(s))
```

```java
public class Solution {
    public int scoreOfParentheses(String s) {
        return dfs(s, 0, s.length());
    }

    private int dfs(String s, int l, int r) {
        int res = 0, bal = 0, start = l;
        for (int i = l; i < r; i++) {
            if (s.charAt(i) == '(') {
                bal++;
            } else {
                bal--;
            }
            if (bal == 0) {
                if (i - start == 1) {
                    res += 1;
                } else {
                    res += 2 * dfs(s, start + 1, i);
                }
                start = i + 1;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int scoreOfParentheses(string s) {
        return dfs(s, 0, s.size());
    }

private:
    int dfs(const string& s, int l, int r) {
        int res = 0, bal = 0, start = l;
        for (int i = l; i < r; i++) {
            if (s[i] == '(') {
                bal++;
            } else {
                bal--;
            }
            if (bal == 0) {
                if (i - start == 1) {
                    res += 1;
                } else {
                    res += 2 * dfs(s, start + 1, i);
                }
                start = i + 1;
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
    scoreOfParentheses(s) {
        const dfs = (l, r) => {
            let res = 0, bal = 0, start = l;
            for (let i = l; i < r; i++) {
                if (s[i] === '(') {
                    bal++;
                } else {
                    bal--;
                }
                if (bal === 0) {
                    if (i - start === 1) {
                        res += 1;
                    } else {
                        res += 2 * dfs(start + 1, i);
                    }
                    start = i + 1;
                }
            }
            return res;
        };

        return dfs(0, s.length);
    }
}
```

```csharp
public class Solution {
    public int ScoreOfParentheses(string s) {
        return Dfs(s, 0, s.Length);
    }

    private int Dfs(string s, int l, int r) {
        int res = 0, bal = 0, start = l;
        for (int i = l; i < r; i++) {
            if (s[i] == '(') {
                bal++;
            } else {
                bal--;
            }
            if (bal == 0) {
                if (i - start == 1) {
                    res += 1;
                } else {
                    res += 2 * Dfs(s, start + 1, i);
                }
                start = i + 1;
            }
        }
        return res;
    }
}
```

```go
func scoreOfParentheses(s string) int {
    var dfs func(l, r int) int
    dfs = func(l, r int) int {
        res, bal, start := 0, 0, l
        for i := l; i < r; i++ {
            if s[i] == '(' {
                bal++
            } else {
                bal--
            }
            if bal == 0 {
                if i-start == 1 {
                    res += 1
                } else {
                    res += 2 * dfs(start+1, i)
                }
                start = i + 1
            }
        }
        return res
    }

    return dfs(0, len(s))
}
```

```kotlin
class Solution {
    fun scoreOfParentheses(s: String): Int {
        return dfs(s, 0, s.length)
    }

    private fun dfs(s: String, l: Int, r: Int): Int {
        var res = 0
        var bal = 0
        var start = l
        for (i in l until r) {
            if (s[i] == '(') {
                bal++
            } else {
                bal--
            }
            if (bal == 0) {
                if (i - start == 1) {
                    res += 1
                } else {
                    res += 2 * dfs(s, start + 1, i)
                }
                start = i + 1
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func scoreOfParentheses(_ s: String) -> Int {
        let chars = Array(s)

        func dfs(_ l: Int, _ r: Int) -> Int {
            var res = 0, bal = 0, start = l
            for i in l..<r {
                if chars[i] == "(" {
                    bal += 1
                } else {
                    bal -= 1
                }
                if bal == 0 {
                    if i - start == 1 {
                        res += 1
                    } else {
                        res += 2 * dfs(start + 1, i)
                    }
                    start = i + 1
                }
            }
            return res
        }

        return dfs(0, chars.count)
    }
}
```

```rust
impl Solution {
    pub fn score_of_parentheses(s: String) -> i32 {
        let s = s.as_bytes();
        Self::dfs(s, 0, s.len())
    }

    fn dfs(s: &[u8], l: usize, r: usize) -> i32 {
        let mut res = 0;
        let mut bal = 0;
        let mut start = l;
        for i in l..r {
            if s[i] == b'(' {
                bal += 1;
            } else {
                bal -= 1;
            }
            if bal == 0 {
                if i - start == 1 {
                    res += 1;
                } else {
                    res += 2 * Self::dfs(s, start + 1, i);
                }
                start = i + 1;
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    scoreOfParentheses(s: string): number {
        const dfs = (l: number, r: number): number => {
            let res = 0, bal = 0, start = l;
            for (let i = l; i < r; i++) {
                if (s[i] === '(') {
                    bal++;
                } else {
                    bal--;
                }
                if (bal === 0) {
                    if (i - start === 1) {
                        res += 1;
                    } else {
                        res += 2 * dfs(start + 1, i);
                    }
                    start = i + 1;
                }
            }
            return res;
        };

        return dfs(0, s.length);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for recursion stack.

> Where $n$ is the length of the string $s$.

---

## 2. Stack

::tabs-start

```python
class Solution:
    def scoreOfParentheses(self, s: str) -> int:
        stack = [0]
        for c in s:
            if c == '(':
                stack.append(0)
            else:
                cur = stack.pop()
                stack[-1] += max(2 * cur, 1)
        return stack[-1]
```

```java
public class Solution {
    public int scoreOfParentheses(String s) {
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        for (char c : s.toCharArray()) {
            if (c == '(') {
                stack.push(0);
            } else {
                int cur = stack.pop();
                stack.push(stack.pop() + Math.max(2 * cur, 1));
            }
        }
        return stack.peek();
    }
}
```

```cpp
class Solution {
public:
    int scoreOfParentheses(string s) {
        vector<int> stack = {0};
        for (char c : s) {
            if (c == '(') {
                stack.push_back(0);
            } else {
                int cur = stack.back();
                stack.pop_back();
                stack.back() += max(2 * cur, 1);
            }
        }
        return stack.back();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    scoreOfParentheses(s) {
        const stack = [0];
        for (const c of s) {
            if (c === '(') {
                stack.push(0);
            } else {
                const cur = stack.pop();
                stack[stack.length - 1] += Math.max(2 * cur, 1);
            }
        }
        return stack[stack.length - 1];
    }
}
```

```csharp
public class Solution {
    public int ScoreOfParentheses(string s) {
        var stack = new Stack<int>();
        stack.Push(0);
        foreach (char c in s) {
            if (c == '(') {
                stack.Push(0);
            } else {
                int cur = stack.Pop();
                stack.Push(stack.Pop() + Math.Max(2 * cur, 1));
            }
        }
        return stack.Peek();
    }
}
```

```go
func scoreOfParentheses(s string) int {
    stack := []int{0}
    for _, c := range s {
        if c == '(' {
            stack = append(stack, 0)
        } else {
            cur := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            stack[len(stack)-1] += max(2*cur, 1)
        }
    }
    return stack[len(stack)-1]
}
```

```kotlin
class Solution {
    fun scoreOfParentheses(s: String): Int {
        val stack = ArrayDeque<Int>()
        stack.addLast(0)
        for (c in s) {
            if (c == '(') {
                stack.addLast(0)
            } else {
                val cur = stack.removeLast()
                stack.addLast(stack.removeLast() + maxOf(2 * cur, 1))
            }
        }
        return stack.last()
    }
}
```

```swift
class Solution {
    func scoreOfParentheses(_ s: String) -> Int {
        var stack = [0]
        for c in s {
            if c == "(" {
                stack.append(0)
            } else {
                let cur = stack.removeLast()
                stack[stack.count - 1] += max(2 * cur, 1)
            }
        }
        return stack[stack.count - 1]
    }
}
```

```rust
impl Solution {
    pub fn score_of_parentheses(s: String) -> i32 {
        let mut stack = vec![0];
        for c in s.bytes() {
            if c == b'(' {
                stack.push(0);
            } else {
                let cur = stack.pop().unwrap();
                *stack.last_mut().unwrap() += (2 * cur).max(1);
            }
        }
        stack[stack.len() - 1]
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    scoreOfParentheses(s: string): number {
        const stack: number[] = [0];
        for (const c of s) {
            if (c === '(') {
                stack.push(0);
            } else {
                const cur = stack.pop() as number;
                stack[stack.length - 1] += Math.max(2 * cur, 1);
            }
        }
        return stack[stack.length - 1];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$.

---

## 3. Iteration

::tabs-start

```python
class Solution:
    def scoreOfParentheses(self, s: str) -> int:
        res = depth = 0
        for i in range(len(s)):
            if s[i] == '(':
                depth += 1
            else:
                depth -= 1
                if s[i - 1] == '(':
                    res += 1 << depth
        return res
```

```java
public class Solution {
    public int scoreOfParentheses(String s) {
        int res = 0, depth = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                depth++;
            } else {
                depth--;
                if (s.charAt(i - 1) == '(') {
                    res += 1 << depth;
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
    int scoreOfParentheses(string s) {
        int res = 0, depth = 0;
        for (int i = 0; i < s.size(); i++) {
            if (s[i] == '(') {
                depth++;
            } else {
                depth--;
                if (s[i - 1] == '(') {
                    res += 1 << depth;
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
     * @param {string} s
     * @return {number}
     */
    scoreOfParentheses(s) {
        let res = 0, depth = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] === '(') {
                depth++;
            } else {
                depth--;
                if (s[i - 1] === '(') {
                    res += 1 << depth;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int ScoreOfParentheses(string s) {
        int res = 0, depth = 0;
        for (int i = 0; i < s.Length; i++) {
            if (s[i] == '(') {
                depth++;
            } else {
                depth--;
                if (s[i - 1] == '(') {
                    res += 1 << depth;
                }
            }
        }
        return res;
    }
}
```

```go
func scoreOfParentheses(s string) int {
    res, depth := 0, 0
    for i := 0; i < len(s); i++ {
        if s[i] == '(' {
            depth++
        } else {
            depth--
            if s[i-1] == '(' {
                res += 1 << depth
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun scoreOfParentheses(s: String): Int {
        var res = 0
        var depth = 0
        for (i in s.indices) {
            if (s[i] == '(') {
                depth++
            } else {
                depth--
                if (s[i - 1] == '(') {
                    res += 1 shl depth
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func scoreOfParentheses(_ s: String) -> Int {
        let chars = Array(s)
        var res = 0, depth = 0
        for i in 0..<chars.count {
            if chars[i] == "(" {
                depth += 1
            } else {
                depth -= 1
                if chars[i - 1] == "(" {
                    res += 1 << depth
                }
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn score_of_parentheses(s: String) -> i32 {
        let s = s.as_bytes();
        let mut res = 0;
        let mut depth = 0;
        for i in 0..s.len() {
            if s[i] == b'(' {
                depth += 1;
            } else {
                depth -= 1;
                if s[i - 1] == b'(' {
                    res += 1 << depth;
                }
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    scoreOfParentheses(s: string): number {
        let res = 0, depth = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] === '(') {
                depth++;
            } else {
                depth--;
                if (s[i - 1] === '(') {
                    res += 1 << depth;
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the string $s$.
