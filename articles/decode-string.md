## 1. Recursion

::tabs-start

```python
class Solution:
    def decodeString(self, s: str) -> str:
        self.i = 0

        def helper():
            res = ""
            k = 0

            while self.i < len(s):
                c = s[self.i]

                if c.isdigit():
                    k = k * 10 + int(c)
                elif c == "[":
                    self.i += 1
                    res += k * helper()
                    k = 0
                elif c == "]":
                    return res
                else:
                    res += c

                self.i += 1
            return res

        return helper()
```

```java
public class Solution {
    private int i = 0;

    public String decodeString(String s) {
        return helper(s);
    }

    private String helper(String s) {
        StringBuilder res = new StringBuilder();
        int k = 0;

        while (i < s.length()) {
            char c = s.charAt(i);

            if (Character.isDigit(c)) {
                k = k * 10 + (c - '0');
            } else if (c == '[') {
                i++;
                String subRes = helper(s);
                while (k-- > 0) res.append(subRes);
                k = 0;
            } else if (c == ']') {
                return res.toString();
            } else {
                res.append(c);
            }

            i++;
        }

        return res.toString();
    }
}
```

```cpp
class Solution {
private:
    string helper(int& i, string& s) {
        string res;
        int k = 0;

        while (i < s.size()) {
            char c = s[i];

            if (isdigit(c)) {
                k = k * 10 + (c - '0');
            } else if (c == '[') {
                i++;
                string subRes = helper(i, s);
                while (k-- > 0) res += subRes;
                k = 0;
            } else if (c == ']') {
                return res;
            } else {
                res += c;
            }

            i++;
        }

        return res;
    }

public:
    string decodeString(string s) {
        int i = 0;
        return helper(i, s);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    decodeString(s) {
        let i = 0;

        const helper = () => {
            let res = '';
            let k = 0;

            while (i < s.length) {
                const c = s[i];

                if (!isNaN(c)) {
                    k = k * 10 + parseInt(c, 10);
                } else if (c === '[') {
                    i++;
                    res += helper().repeat(k);
                    k = 0;
                } else if (c === ']') {
                    return res;
                } else {
                    res += c;
                }

                i++;
            }

            return res;
        };

        return helper();
    }
}
```

```csharp
public class Solution {
    private int i;

    public string DecodeString(string s) {
        i = 0;
        return Helper(s);
    }

    private string Helper(string s) {
        string res = "";
        int k = 0;

        while (i < s.Length) {
            char c = s[i];

            if (char.IsDigit(c)) {
                k = k * 10 + (c - '0');
            } else if (c == '[') {
                i++;
                string inner = Helper(s);
                res += new string(' ', 0).PadLeft(0);
                for (int j = 0; j < k; j++) {
                    res += inner;
                }
                k = 0;
            } else if (c == ']') {
                return res;
            } else {
                res += c;
            }

            i++;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + N)$
- Space complexity: $O(n + N)$

> Where $n$ is the length of the input string and $N$ is the length of the output string.

---

## 2. One Stack

::tabs-start

```python
class Solution:
    def decodeString(self, s: str) -> str:
        stack = []

        for i in range(len(s)):
            if s[i] != "]":
                stack.append(s[i])
            else:
                substr = ""
                while stack[-1] != "[":
                    substr = stack.pop() + substr
                stack.pop()

                k = ""
                while stack and stack[-1].isdigit():
                    k = stack.pop() + k
                stack.append(int(k) * substr)

        return "".join(stack)
```

```java
public class Solution {
    public String decodeString(String s) {
        Stack<String> stack = new Stack<>();

        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) != ']') {
                stack.push(String.valueOf(s.charAt(i)));
            } else {
                StringBuilder substr = new StringBuilder();
                while (!stack.peek().equals("[")) {
                    substr.insert(0, stack.pop());
                }
                stack.pop();

                StringBuilder k = new StringBuilder();
                while (!stack.isEmpty() && Character.isDigit(stack.peek().charAt(0))) {
                    k.insert(0, stack.pop());
                }
                int count = Integer.parseInt(k.toString());
                String repeatedStr = substr.toString().repeat(count);
                stack.push(repeatedStr);
            }
        }

        StringBuilder res = new StringBuilder();
        while (!stack.isEmpty()) {
            res.insert(0, stack.pop());
        }
        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string decodeString(string s) {
        vector<string> stack;

        for (char& c : s) {
            if (c != ']') {
                stack.push_back(string(1, c));
            } else {
                string substr = "";
                while (stack.back() != "[") {
                    substr = stack.back() + substr;
                    stack.pop_back();
                }
                stack.pop_back();

                string k = "";
                while (!stack.empty() && isdigit(stack.back()[0])) {
                    k = stack.back() + k;
                    stack.pop_back();
                }
                int repeatCount = stoi(k);

                string repeated = "";
                for (int i = 0; i < repeatCount; ++i) {
                    repeated += substr;
                }
                stack.push_back(repeated);
            }
        }

        string res = "";
        for (const string& part : stack) {
            res += part;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    decodeString(s) {
        const stack = [];

        for (let i = 0; i < s.length; i++) {
            const char = s[i];

            if (char !== ']') {
                stack.push(char);
            } else {
                let substr = '';
                while (stack[stack.length - 1] !== '[') {
                    substr = stack.pop() + substr;
                }
                stack.pop();

                let k = '';
                while (stack.length > 0 && !isNaN(stack[stack.length - 1])) {
                    k = stack.pop() + k;
                }
                stack.push(substr.repeat(parseInt(k, 10)));
            }
        }

        return stack.join('');
    }
}
```

```csharp
public class Solution {
    public string DecodeString(string s) {
        Stack<string> stack = new Stack<string>();

        for (int i = 0; i < s.Length; i++) {
            if (s[i] != ']') {
                stack.Push(s[i].ToString());
            } else {
                string substr = "";
                while (stack.Peek() != "[") {
                    substr = stack.Pop() + substr;
                }
                stack.Pop(); // remove '['

                string k = "";
                while (stack.Count > 0 && char.IsDigit(stack.Peek()[0])) {
                    k = stack.Pop() + k;
                }

                int repeat = int.Parse(k);
                string expanded = new StringBuilder().Insert(0, substr, repeat).ToString();
                stack.Push(expanded);
            }
        }

        var result = new StringBuilder();
        foreach (string part in stack) {
            result.Insert(0, part);
        }
        return result.ToString();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + N ^ 2)$
- Space complexity: $O(n + N)$

> Where $n$ is the length of the input string and $N$ is the length of the output string.

---

## 3. Two Stacks

::tabs-start

```python
class Solution:
    def decodeString(self, s: str) -> str:
        string_stack = []
        count_stack = []
        cur = ""
        k = 0

        for c in s:
            if c.isdigit():
                k = k * 10 + int(c)
            elif c == "[":
                string_stack.append(cur)
                count_stack.append(k)
                cur = ""
                k = 0
            elif c == "]":
                temp = cur
                cur = string_stack.pop()
                count = count_stack.pop()
                cur += temp * count
            else:
                cur += c

        return cur
```

```java
public class Solution {
    public String decodeString(String s) {
        Stack<String> stringStack = new Stack<>();
        Stack<Integer> countStack = new Stack<>();
        StringBuilder cur = new StringBuilder();
        int k = 0;

        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                k = k * 10 + (c - '0');
            } else if (c == '[') {
                stringStack.push(cur.toString());
                countStack.push(k);
                cur = new StringBuilder();
                k = 0;
            } else if (c == ']') {
                String temp = cur.toString();
                cur = new StringBuilder(stringStack.pop());
                int count = countStack.pop();
                for (int i = 0; i < count; i++) {
                    cur.append(temp);
                }
            } else {
                cur.append(c);
            }
        }

        return cur.toString();
    }
}
```

```cpp
class Solution {
public:
    string decodeString(string s) {
        vector<string> stringStack;
        vector<int> countStack;
        string cur = "";
        int k = 0;

        for (char c : s) {
            if (isdigit(c)) {
                k = k * 10 + (c - '0');
            } else if (c == '[') {
                stringStack.push_back(cur);
                countStack.push_back(k);
                cur = "";
                k = 0;
            } else if (c == ']') {
                string temp = cur;
                cur = stringStack.back();
                stringStack.pop_back();
                int count = countStack.back();
                countStack.pop_back();
                for (int i = 0; i < count; i++) {
                    cur += temp;
                }
            } else {
                cur += c;
            }
        }

        return cur;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    decodeString(s) {
        const stringStack = [];
        const countStack = [];
        let cur = '';
        let k = 0;

        for (const c of s) {
            if (!isNaN(c)) {
                k = k * 10 + parseInt(c, 10);
            } else if (c === '[') {
                stringStack.push(cur);
                countStack.push(k);
                cur = '';
                k = 0;
            } else if (c === ']') {
                const temp = cur;
                cur = stringStack.pop();
                const count = countStack.pop();
                cur += temp.repeat(count);
            } else {
                cur += c;
            }
        }

        return cur;
    }
}
```

```csharp
public class Solution {
    public string DecodeString(string s) {
        Stack<string> stringStack = new Stack<string>();
        Stack<int> countStack = new Stack<int>();
        string cur = "";
        int k = 0;

        foreach (char c in s) {
            if (char.IsDigit(c)) {
                k = k * 10 + (c - '0');
            } else if (c == '[') {
                stringStack.Push(cur);
                countStack.Push(k);
                cur = "";
                k = 0;
            } else if (c == ']') {
                string temp = cur;
                cur = stringStack.Pop();
                int count = countStack.Pop();
                for (int i = 0; i < count; i++) {
                    cur += temp;
                }
            } else {
                cur += c;
            }
        }

        return cur;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + N)$
- Space complexity: $O(n + N)$

> Where $n$ is the length of the input string and $N$ is the length of the output string.
