## 1. Stack

::tabs-start

```python
class Solution:
    def calculate(self, s: str) -> int:
        stack = []
        num = 0
        op = '+'
        s = s.replace(' ', '')

        for i, ch in enumerate(s):
            if ch.isdigit():
                num = num * 10 + int(ch)
            if (not ch.isdigit()) or i == len(s) - 1:
                if op == '+':
                    stack.append(num)
                elif op == '-':
                    stack.append(-num)
                elif op == '*':
                    stack.append(stack.pop() * num)
                else:
                    prev = stack.pop()
                    stack.append(int(prev / num))
                op = ch
                num = 0

        return sum(stack)
```

```java
public class Solution {
    public int calculate(String s) {
        s = s.replace(" ", "");
        Stack<Integer> stack = new Stack<>();
        int num = 0;
        char op = '+';

        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (Character.isDigit(ch)) {
                num = num * 10 + (ch - '0');
            }
            if (!Character.isDigit(ch) || i == s.length() - 1) {
                if (op == '+') {
                    stack.push(num);
                } else if (op == '-') {
                    stack.push(-num);
                } else if (op == '*') {
                    stack.push(stack.pop() * num);
                } else { // op == '/'
                    int prev = stack.pop();
                    stack.push(prev / num);
                }
                op = ch;
                num = 0;
            }
        }

        int res = 0;
        while (!stack.isEmpty()) {
            res += stack.pop();
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int calculate(string s) {
        s.erase(remove(s.begin(), s.end(), ' '), s.end());
        vector<int> stack;
        int num = 0;
        char op = '+';
        for (int i = 0; i < s.size(); i++) {
            char ch = s[i];
            if (isdigit(ch)) {
                num = num * 10 + (ch - '0');
            }
            if (!isdigit(ch) || i == s.size() - 1) {
                if (op == '+') {
                    stack.push_back(num);
                } else if (op == '-') {
                    stack.push_back(-num);
                } else if (op == '*') {
                    int prev = stack.back(); stack.pop_back();
                    stack.push_back(prev * num);
                } else {
                    int prev = stack.back(); stack.pop_back();
                    stack.push_back(prev / num);
                }
                op = ch;
                num = 0;
            }
        }
        int res = 0;
        for (int x : stack) res += x;
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
    calculate(s) {
        s = s.replace(/\s+/g, '');
        const stack = [];
        let num = 0;
        let op = '+';
        for (let i = 0; i < s.length; i++) {
            const ch = s[i];
            if (/\d/.test(ch)) {
                num = num * 10 + (ch - '0');
            }
            if (!/\d/.test(ch) || i === s.length - 1) {
                if (op === '+') {
                    stack.push(num);
                } else if (op === '-') {
                    stack.push(-num);
                } else if (op === '*') {
                    stack.push(stack.pop() * num);
                } else {
                    const prev = stack.pop();
                    stack.push(Math.trunc(prev / num));
                }
                op = ch;
                num = 0;
            }
        }
        return stack.reduce((a, b) => a + b, 0);
    }
}
```

```csharp
public class Solution {
    public int Calculate(string s) {
        s = s.Replace(" ", "");
        var stack = new Stack<int>();
        int num = 0;
        char op = '+';

        for (int i = 0; i < s.Length; i++) {
            char ch = s[i];
            if (char.IsDigit(ch)) {
                num = num * 10 + (ch - '0');
            }
            if (!char.IsDigit(ch) || i == s.Length - 1) {
                if (op == '+') {
                    stack.Push(num);
                } else if (op == '-') {
                    stack.Push(-num);
                } else if (op == '*') {
                    int prev = stack.Pop();
                    stack.Push(prev * num);
                } else {
                    int prev = stack.Pop();
                    stack.Push(prev / num);
                }
                op = ch;
                num = 0;
            }
        }

        int res = 0;
        while (stack.Count > 0) {
            res += stack.Pop();
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Without Stack

::tabs-start

```python
class Solution:
    def calculate(self, s: str) -> int:
        total = prev = num = 0
        op = '+'
        n = len(s)
        i = 0

        while i <= n:
            ch = s[i] if i < n else '+'
            if ch == ' ':
                i += 1
                continue

            if '0' <= ch <= '9':
                num = num * 10 + (ord(ch) - ord('0'))
            else:
                if op == '+':
                    total += prev
                    prev = num
                elif op == '-':
                    total += prev
                    prev = -num
                elif op == '*':
                    prev = prev * num
                else:
                    if prev < 0:
                        prev = -(-prev // num)
                    else:
                        prev = prev // num

                op = ch
                num = 0

            i += 1

        total += prev
        return total
```

```java
public class Solution {
    public int calculate(String s) {
        int total = 0, prev = 0, num = 0;
        char op = '+';
        int n = s.length(), i = 0;
        while (i <= n) {
            char ch = i < n ? s.charAt(i) : '+';
            if (ch == ' ') {
                i++;
                continue;
            }
            if (Character.isDigit(ch)) {
                num = num * 10 + (ch - '0');
            } else {
                switch (op) {
                    case '+':
                        total += prev;
                        prev = num;
                        break;
                    case '-':
                        total += prev;
                        prev = -num;
                        break;
                    case '*':
                        prev = prev * num;
                        break;
                    default:
                        prev = prev / num;
                }
                op = ch;
                num = 0;
            }
            i++;
        }
        total += prev;
        return total;
    }
}
```

```cpp
class Solution {
public:
    int calculate(string s) {
        int total = 0, prev = 0, num = 0;
        char op = '+';
        int n = s.size(), i = 0;
        while (i <= n) {
            char ch = i < n ? s[i] : '+';
            if (ch == ' ') {
                i++;
                continue;
            }
            if (isdigit(ch)) {
                num = num * 10 + (ch - '0');
            } else {
                if (op == '+') {
                    total += prev;
                    prev = num;
                } else if (op == '-') {
                    total += prev;
                    prev = -num;
                } else if (op == '*') {
                    prev = prev * num;
                } else {
                    prev = prev / num;
                }
                op = ch;
                num = 0;
            }
            i++;
        }
        total += prev;
        return total;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    calculate(s) {
        let total = 0,
            prev = 0,
            num = 0;
        let op = '+';
        const n = s.length;
        let i = 0;
        while (i <= n) {
            const ch = i < n ? s[i] : '+';
            if (ch === ' ') {
                i++;
                continue;
            }
            if (ch >= '0' && ch <= '9') {
                num = num * 10 + (ch.charCodeAt(0) - 48);
            } else {
                if (op === '+') {
                    total += prev;
                    prev = num;
                } else if (op === '-') {
                    total += prev;
                    prev = -num;
                } else if (op === '*') {
                    prev = prev * num;
                } else {
                    prev = (prev / num) | 0;
                }
                op = ch;
                num = 0;
            }
            i++;
        }
        total += prev;
        return total;
    }
}
```

```csharp
public class Solution {
    public int Calculate(string s) {
        int total = 0, prev = 0, num = 0;
        char op = '+';
        int n = s.Length, i = 0;
        while (i <= n) {
            char ch = i < n ? s[i] : '+';
            if (ch == ' ') {
                i++;
                continue;
            }
            if (char.IsDigit(ch)) {
                num = num * 10 + (ch - '0');
            } else {
                switch (op) {
                    case '+':
                        total += prev;
                        prev = num;
                        break;
                    case '-':
                        total += prev;
                        prev = -num;
                        break;
                    case '*':
                        prev = prev * num;
                        break;
                    default:
                        prev = prev / num;
                        break;
                }
                op = ch;
                num = 0;
            }
            i++;
        }
        total += prev;
        return total;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
