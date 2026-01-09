## 1. Stack

### Intuition

The challenge with evaluating expressions is handling operator precedence. Multiplication and division must be done before addition and subtraction. We can use a stack to defer the addition and subtraction while immediately computing multiplication and division. For `+` and `-`, we push numbers onto the stack (negative for subtraction). For `*` and `/`, we pop the previous number, compute the result, and push it back. At the end, summing the stack gives us the answer.

### Algorithm

1. Remove all spaces from the string and initialize an empty stack.
2. Track the current number and the previous operator (start with `+`).
3. For each character:
   - If it's a digit, build up the current number.
   - If it's an operator or the last character:
     - Apply the previous operator: push for `+`, push negative for `-`, multiply top for `*`, divide top for `/`.
     - Reset the current number and update the previous operator.
4. Return the sum of all elements in the stack.

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

```go
func calculate(s string) int {
    s = strings.ReplaceAll(s, " ", "")
    stack := []int{}
    num := 0
    op := byte('+')

    for i := 0; i < len(s); i++ {
        ch := s[i]
        if ch >= '0' && ch <= '9' {
            num = num*10 + int(ch-'0')
        }
        if (ch < '0' || ch > '9') || i == len(s)-1 {
            switch op {
            case '+':
                stack = append(stack, num)
            case '-':
                stack = append(stack, -num)
            case '*':
                prev := stack[len(stack)-1]
                stack = stack[:len(stack)-1]
                stack = append(stack, prev*num)
            case '/':
                prev := stack[len(stack)-1]
                stack = stack[:len(stack)-1]
                stack = append(stack, prev/num)
            }
            op = ch
            num = 0
        }
    }

    res := 0
    for _, v := range stack {
        res += v
    }
    return res
}
```

```kotlin
class Solution {
    fun calculate(s: String): Int {
        val str = s.replace(" ", "")
        val stack = mutableListOf<Int>()
        var num = 0
        var op = '+'

        for (i in str.indices) {
            val ch = str[i]
            if (ch.isDigit()) {
                num = num * 10 + (ch - '0')
            }
            if (!ch.isDigit() || i == str.length - 1) {
                when (op) {
                    '+' -> stack.add(num)
                    '-' -> stack.add(-num)
                    '*' -> stack.add(stack.removeLast() * num)
                    '/' -> stack.add(stack.removeLast() / num)
                }
                op = ch
                num = 0
            }
        }

        return stack.sum()
    }
}
```

```swift
class Solution {
    func calculate(_ s: String) -> Int {
        let str = s.filter { $0 != " " }
        let chars = Array(str)
        var stack = [Int]()
        var num = 0
        var op: Character = "+"

        for i in 0..<chars.count {
            let ch = chars[i]
            if ch.isNumber {
                num = num * 10 + Int(String(ch))!
            }
            if !ch.isNumber || i == chars.count - 1 {
                switch op {
                case "+":
                    stack.append(num)
                case "-":
                    stack.append(-num)
                case "*":
                    stack.append(stack.removeLast() * num)
                case "/":
                    stack.append(stack.removeLast() / num)
                default:
                    break
                }
                op = ch
                num = 0
            }
        }

        return stack.reduce(0, +)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Without Stack

### Intuition

We can avoid using a stack by realizing that we only need to track two values: the running total of all fully computed terms, and the previous term that might still be involved in a multiplication or division. When we see `+` or `-`, we can add the previous term to our total and start a new term. When we see `*` or `/`, we update the previous term directly. This reduces space complexity to O(1).

### Algorithm

1. Initialize `total`, `prev`, and `num` to 0, and set the initial operator to `+`.
2. Iterate through the string (plus one extra iteration to process the last number).
3. Skip spaces. Build up multi-digit numbers.
4. When we hit an operator or the end:
   - For `+`: add `prev` to `total`, set `prev` to `num`.
   - For `-`: add `prev` to `total`, set `prev` to `-num`.
   - For `*`: multiply `prev` by `num`.
   - For `/`: divide `prev` by `num` (truncate toward zero).
   - Update the operator and reset `num`.
5. Add the final `prev` to `total` and return it.

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

```go
func calculate(s string) int {
    total, prev, num := 0, 0, 0
    op := byte('+')
    n := len(s)
    i := 0

    for i <= n {
        var ch byte
        if i < n {
            ch = s[i]
        } else {
            ch = '+'
        }
        if ch == ' ' {
            i++
            continue
        }
        if ch >= '0' && ch <= '9' {
            num = num*10 + int(ch-'0')
        } else {
            switch op {
            case '+':
                total += prev
                prev = num
            case '-':
                total += prev
                prev = -num
            case '*':
                prev = prev * num
            default:
                prev = prev / num
            }
            op = ch
            num = 0
        }
        i++
    }
    total += prev
    return total
}
```

```kotlin
class Solution {
    fun calculate(s: String): Int {
        var total = 0
        var prev = 0
        var num = 0
        var op = '+'
        val n = s.length
        var i = 0

        while (i <= n) {
            val ch = if (i < n) s[i] else '+'
            if (ch == ' ') {
                i++
                continue
            }
            if (ch.isDigit()) {
                num = num * 10 + (ch - '0')
            } else {
                when (op) {
                    '+' -> {
                        total += prev
                        prev = num
                    }
                    '-' -> {
                        total += prev
                        prev = -num
                    }
                    '*' -> prev *= num
                    else -> prev /= num
                }
                op = ch
                num = 0
            }
            i++
        }
        total += prev
        return total
    }
}
```

```swift
class Solution {
    func calculate(_ s: String) -> Int {
        var total = 0, prev = 0, num = 0
        var op: Character = "+"
        let chars = Array(s)
        let n = chars.count
        var i = 0

        while i <= n {
            let ch: Character = i < n ? chars[i] : "+"
            if ch == " " {
                i += 1
                continue
            }
            if ch.isNumber {
                num = num * 10 + Int(String(ch))!
            } else {
                switch op {
                case "+":
                    total += prev
                    prev = num
                case "-":
                    total += prev
                    prev = -num
                case "*":
                    prev = prev * num
                default:
                    prev = prev / num
                }
                op = ch
                num = 0
            }
            i += 1
        }
        total += prev
        return total
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
