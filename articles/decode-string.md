## 1. Recursion

### Intuition
The encoded string has a nested structure where patterns like `k[encoded_string]` can contain other encoded patterns inside. This naturally maps to recursion. When we encounter an opening bracket, we recursively decode the inner content, then repeat it `k` times. The recursion handles arbitrary nesting depth automatically.

### Algorithm
1. Maintain a global index `i` to track the current position in the string.
2. Define a recursive helper function:
   - Initialize an empty result string and a multiplier `k = 0`.
   - While `i` is within bounds:
     - If the current character is a digit, update `k` by shifting left and adding the digit.
     - If it's `[`, increment `i` and recursively decode the inner string. Multiply the result by `k` and append it. Reset `k` to `0`.
     - If it's `]`, return the current result (end of this level).
     - Otherwise, append the character to the result.
     - Increment `i` after each iteration.
   - Return the result.
3. Call the helper function and return its result.

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

```go
func decodeString(s string) string {
    i := 0

    var helper func() string
    helper = func() string {
        res := ""
        k := 0

        for i < len(s) {
            c := s[i]

            if c >= '0' && c <= '9' {
                k = k*10 + int(c-'0')
            } else if c == '[' {
                i++
                subRes := helper()
                for j := 0; j < k; j++ {
                    res += subRes
                }
                k = 0
            } else if c == ']' {
                return res
            } else {
                res += string(c)
            }

            i++
        }

        return res
    }

    return helper()
}
```

```kotlin
class Solution {
    private var i = 0

    fun decodeString(s: String): String {
        i = 0
        return helper(s)
    }

    private fun helper(s: String): String {
        val res = StringBuilder()
        var k = 0

        while (i < s.length) {
            val c = s[i]

            when {
                c.isDigit() -> k = k * 10 + (c - '0')
                c == '[' -> {
                    i++
                    val subRes = helper(s)
                    repeat(k) { res.append(subRes) }
                    k = 0
                }
                c == ']' -> return res.toString()
                else -> res.append(c)
            }

            i++
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    private var i = 0

    func decodeString(_ s: String) -> String {
        i = 0
        let chars = Array(s)
        return helper(chars)
    }

    private func helper(_ s: [Character]) -> String {
        var res = ""
        var k = 0

        while i < s.count {
            let c = s[i]

            if c.isNumber {
                k = k * 10 + Int(String(c))!
            } else if c == "[" {
                i += 1
                let subRes = helper(s)
                res += String(repeating: subRes, count: k)
                k = 0
            } else if c == "]" {
                return res
            } else {
                res += String(c)
            }

            i += 1
        }

        return res
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

### Intuition
We can convert the recursive approach to an iterative one using a single stack. Push every character onto the stack until we hit a closing bracket `]`. At that point, pop characters to extract the substring inside the brackets, then pop the digits to get the repeat count `k`. Multiply the substring and push the result back onto the stack. This simulates the recursive call stack.

### Algorithm
1. Initialize an empty stack.
2. Iterate through each character in the string:
   - If the character is not `]`, push it onto the stack.
   - If it is `]`:
     - Pop characters until `[` is found to build the substring.
     - Pop `[` from the stack.
     - Pop all consecutive digits to form the repeat count `k`.
     - Repeat the substring `k` times and push the result back onto the stack.
3. After processing all characters, join the stack contents to form the final decoded string.

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

```go
func decodeString(s string) string {
    stack := []string{}

    for i := 0; i < len(s); i++ {
        c := s[i]
        if c != ']' {
            stack = append(stack, string(c))
        } else {
            substr := ""
            for stack[len(stack)-1] != "[" {
                substr = stack[len(stack)-1] + substr
                stack = stack[:len(stack)-1]
            }
            stack = stack[:len(stack)-1] // remove '['

            k := ""
            for len(stack) > 0 && stack[len(stack)-1][0] >= '0' && stack[len(stack)-1][0] <= '9' {
                k = stack[len(stack)-1] + k
                stack = stack[:len(stack)-1]
            }

            count, _ := strconv.Atoi(k)
            repeated := strings.Repeat(substr, count)
            stack = append(stack, repeated)
        }
    }

    return strings.Join(stack, "")
}
```

```kotlin
class Solution {
    fun decodeString(s: String): String {
        val stack = mutableListOf<String>()

        for (c in s) {
            if (c != ']') {
                stack.add(c.toString())
            } else {
                var substr = ""
                while (stack.last() != "[") {
                    substr = stack.removeLast() + substr
                }
                stack.removeLast() // remove '['

                var k = ""
                while (stack.isNotEmpty() && stack.last()[0].isDigit()) {
                    k = stack.removeLast() + k
                }

                val count = k.toInt()
                stack.add(substr.repeat(count))
            }
        }

        return stack.joinToString("")
    }
}
```

```swift
class Solution {
    func decodeString(_ s: String) -> String {
        var stack = [String]()

        for c in s {
            if c != "]" {
                stack.append(String(c))
            } else {
                var substr = ""
                while stack.last! != "[" {
                    substr = stack.removeLast() + substr
                }
                stack.removeLast() // remove '['

                var k = ""
                while !stack.isEmpty && stack.last!.first!.isNumber {
                    k = stack.removeLast() + k
                }

                let count = Int(k)!
                stack.append(String(repeating: substr, count: count))
            }
        }

        return stack.joined()
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

### Intuition
Using two separate stacks provides cleaner logic: one stack for accumulated strings and another for repeat counts. When we see `[`, we save the current string and count, then start fresh. When we see `]`, we pop the previous string and count, repeat the current string, and concatenate. This approach avoids the overhead of extracting digits and substrings from a mixed stack.

### Algorithm
1. Initialize two stacks: one for strings (`stringStack`) and one for counts (`countStack`).
2. Maintain a current string `cur` and a current multiplier `k`.
3. Iterate through each character:
   - If it's a digit, update `k = k * 10 + digit`.
   - If it's `[`, push `cur` and `k` onto their respective stacks, then reset `cur` to empty and `k` to `0`.
   - If it's `]`, pop the previous string and count. Set `cur` to the popped string plus the current string repeated by the popped count.
   - Otherwise, append the character to `cur`.
4. Return `cur` as the final decoded string.

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

```go
func decodeString(s string) string {
    stringStack := []string{}
    countStack := []int{}
    cur := ""
    k := 0

    for _, c := range s {
        if c >= '0' && c <= '9' {
            k = k*10 + int(c-'0')
        } else if c == '[' {
            stringStack = append(stringStack, cur)
            countStack = append(countStack, k)
            cur = ""
            k = 0
        } else if c == ']' {
            temp := cur
            cur = stringStack[len(stringStack)-1]
            stringStack = stringStack[:len(stringStack)-1]
            count := countStack[len(countStack)-1]
            countStack = countStack[:len(countStack)-1]
            for i := 0; i < count; i++ {
                cur += temp
            }
        } else {
            cur += string(c)
        }
    }

    return cur
}
```

```kotlin
class Solution {
    fun decodeString(s: String): String {
        val stringStack = ArrayDeque<String>()
        val countStack = ArrayDeque<Int>()
        var cur = ""
        var k = 0

        for (c in s) {
            when {
                c.isDigit() -> k = k * 10 + (c - '0')
                c == '[' -> {
                    stringStack.addLast(cur)
                    countStack.addLast(k)
                    cur = ""
                    k = 0
                }
                c == ']' -> {
                    val temp = cur
                    cur = stringStack.removeLast()
                    val count = countStack.removeLast()
                    repeat(count) { cur += temp }
                }
                else -> cur += c
            }
        }

        return cur
    }
}
```

```swift
class Solution {
    func decodeString(_ s: String) -> String {
        var stringStack = [String]()
        var countStack = [Int]()
        var cur = ""
        var k = 0

        for c in s {
            if c.isNumber {
                k = k * 10 + Int(String(c))!
            } else if c == "[" {
                stringStack.append(cur)
                countStack.append(k)
                cur = ""
                k = 0
            } else if c == "]" {
                let temp = cur
                cur = stringStack.removeLast()
                let count = countStack.removeLast()
                cur += String(repeating: temp, count: count)
            } else {
                cur += String(c)
            }
        }

        return cur
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + N)$
- Space complexity: $O(n + N)$

> Where $n$ is the length of the input string and $N$ is the length of the output string.
