## 1. Stack

### Intuition

This problem adds parentheses to the basic calculator, which introduces nested sub-expressions. We handle this by using a stack that can hold both numbers and operators. When we see an opening parenthesis, we save the current operator and reset our state. When we see a closing parenthesis, we evaluate everything inside, then retrieve the saved operator to continue. The stack essentially lets us pause the outer expression, fully evaluate the inner one, and resume.

### Algorithm

1. Append a sentinel character `@` to the string to trigger final processing.
2. For each character:
   - If it's a digit, build the current number.
   - If it's `(`, push the previous operator onto the stack and reset the operator to `+`.
   - Otherwise (operator or `)` or `@`):
     - Apply the previous operator to the current number (handle `*` and `/` by popping and computing immediately).
     - If it's `)`, sum all numbers on the stack until we hit a saved operator, then use that operator for the combined result.
     - Update the previous operator and reset the current number.
3. Return the sum of remaining numbers on the stack.

::tabs-start

```python
class Solution:
    def calculate(self, s: str) -> int:
        def evaluate(x, y, operator):
            if operator == "+":
                return x
            if operator == "-":
                return -x
            if operator == "*":
                return x * y
            return int(x / y)
        
        stack = []
        curr = 0
        previous_operator = "+"
        s += "@"
        
        for c in s:
            if c.isdigit():
                curr = curr * 10 + int(c)
            elif c == "(":
                stack.append(previous_operator)
                previous_operator = "+"
            else:
                if previous_operator in "*/":
                    stack.append(evaluate(stack.pop(), curr, previous_operator))
                else:
                    stack.append(evaluate(curr, 0, previous_operator))
                
                curr = 0
                previous_operator = c
                if c == ")":
                    while type(stack[-1]) == int:
                        curr += stack.pop()
                    previous_operator = stack.pop()

        return sum(stack)
```

```java
class Solution {
    private String evaluate(char operator, String first, String second) {
        int x = Integer.parseInt(first);
        int y = Integer.parseInt(second);
        int res = 0;
        
        if (operator == '+') {
            res = x;
        } else if (operator == '-') {
            res = -x;
        } else if (operator == '*') {
            res = x * y;
        } else {
            res = x / y;
        }
        
        return Integer.toString(res);
    }
    
    public int calculate(String s) {
        Stack<String> stack = new Stack<>();
        String curr = "";
        char previousOperator = '+';
        s += "@";
        Set<String> operators = new HashSet<>(Arrays.asList("+", "-", "*", "/"));
        
        for (char c: s.toCharArray()) {
            if (Character.isDigit(c)) {
                curr += c;
            } else if (c == '(') {
                stack.push("" + previousOperator); // convert char to string before pushing
                previousOperator = '+';
            } else {
                if (previousOperator == '*' || previousOperator == '/') {
                    stack.push(evaluate(previousOperator, stack.pop(), curr));
                } else {
                    stack.push(evaluate(previousOperator, curr, "0"));
                }
                
                curr = "";
                previousOperator = c;
                if (c == ')') {
                    int currentTerm = 0;
                    while (!operators.contains(stack.peek())) {
                        currentTerm += Integer.parseInt(stack.pop());
                    }
                    
                    curr = Integer.toString(currentTerm);
                    previousOperator = stack.pop().charAt(0); // convert string from stack back to char
                }
            }
        }
        
        int ans = 0;
        for (String num: stack) {
            ans += Integer.parseInt(num);
        }

        return ans;
    }
}
```

```cpp
class Solution {
public:
    int calculate(string s) {
        auto evaluate = [](int x, int y, char op) -> int {
            if (op == '+') {
                return x;
            }
            if (op == '-') {
                return -x;
            }
            if (op == '*') {
                return x * y;
            }
            return x / y;
        };

        vector<pair<int, bool>> stack;  // {value, isInt}
        int curr = 0;
        char previousOperator = '+';
        s += "@";

        for (char c : s) {
            if (isdigit(c)) {
                curr = curr * 10 + (c - '0');
            } else if (c == '(') {
                stack.push_back({previousOperator, false});
                previousOperator = '+';
            } else {
                if (previousOperator == '*' || previousOperator == '/') {
                    int top = stack.back().first;
                    stack.pop_back();
                    stack.push_back({evaluate(top, curr, previousOperator), true});
                } else {
                    stack.push_back({evaluate(curr, 0, previousOperator), true});
                }

                curr = 0;
                previousOperator = c;

                if (c == ')') {
                    while (!stack.empty() && stack.back().second) {
                        curr += stack.back().first;
                        stack.pop_back();
                    }
                    previousOperator = stack.back().first;
                    stack.pop_back();
                }
            }
        }

        int ans = 0;
        for (auto& p : stack) {
            ans += p.first;
        }

        return ans;
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
        /**
         * @param {number} x
         * @param {number} y
         * @param {string} operator
         * @return {number}
         */
        function evaluate(x, y, operator) {
            if (operator === "+") {
                return x;
            }
            if (operator === "-") {
                return -x;
            }
            if (operator === "*") {
                return x * y;
            }
            return Math.trunc(x / y);
        }

        const stack = [];
        let curr = 0;
        let previousOperator = "+";
        s += "@";

        for (const c of s) {
            if (c >= "0" && c <= "9") {
                curr = curr * 10 + parseInt(c);
            } else if (c === "(") {
                stack.push(previousOperator);
                previousOperator = "+";
            } else {
                if (previousOperator === "*" || previousOperator === "/") {
                    stack.push(evaluate(stack.pop(), curr, previousOperator));
                } else {
                    stack.push(evaluate(curr, 0, previousOperator));
                }

                curr = 0;
                previousOperator = c;

                if (c === ")") {
                    while (typeof stack[stack.length - 1] === "number") {
                        curr += stack.pop();
                    }
                    previousOperator = stack.pop();
                }
            }
        }

        return stack.reduce(function(sum, val) { return sum + val; }, 0);
    }
}
```

```csharp
public class Solution {
    public int Calculate(string s) {
        var stack = new List<object>();
        int curr = 0;
        char previousOperator = '+';
        s += "@";

        foreach (char c in s) {
            if (char.IsDigit(c)) {
                curr = curr * 10 + (c - '0');
            } else if (c == '(') {
                stack.Add(previousOperator);
                previousOperator = '+';
            } else {
                if (previousOperator == '*' || previousOperator == '/') {
                    int prev = (int)stack[stack.Count - 1];
                    stack.RemoveAt(stack.Count - 1);
                    stack.Add(Evaluate(prev, curr, previousOperator));
                } else {
                    stack.Add(Evaluate(curr, 0, previousOperator));
                }

                curr = 0;
                previousOperator = c;

                if (c == ')') {
                    while (stack.Count > 0 && stack[stack.Count - 1] is int) {
                        curr += (int)stack[stack.Count - 1];
                        stack.RemoveAt(stack.Count - 1);
                    }
                    previousOperator = (char)stack[stack.Count - 1];
                    stack.RemoveAt(stack.Count - 1);
                }
            }
        }

        int result = 0;
        foreach (var item in stack) {
            result += (int)item;
        }
        return result;
    }

    private int Evaluate(int x, int y, char op) {
        if (op == '+') return x;
        if (op == '-') return -x;
        if (op == '*') return x * y;
        return x / y;
    }
}
```

```go
func calculate(s string) int {
    evaluate := func(x, y int, op byte) int {
        switch op {
        case '+':
            return x
        case '-':
            return -x
        case '*':
            return x * y
        default:
            return x / y
        }
    }

    type item struct {
        val   int
        isInt bool
    }

    stack := []item{}
    curr := 0
    previousOperator := byte('+')
    s += "@"

    for i := 0; i < len(s); i++ {
        c := s[i]
        if c >= '0' && c <= '9' {
            curr = curr*10 + int(c-'0')
        } else if c == '(' {
            stack = append(stack, item{int(previousOperator), false})
            previousOperator = '+'
        } else {
            if previousOperator == '*' || previousOperator == '/' {
                prev := stack[len(stack)-1].val
                stack = stack[:len(stack)-1]
                stack = append(stack, item{evaluate(prev, curr, previousOperator), true})
            } else {
                stack = append(stack, item{evaluate(curr, 0, previousOperator), true})
            }

            curr = 0
            previousOperator = c

            if c == ')' {
                for len(stack) > 0 && stack[len(stack)-1].isInt {
                    curr += stack[len(stack)-1].val
                    stack = stack[:len(stack)-1]
                }
                previousOperator = byte(stack[len(stack)-1].val)
                stack = stack[:len(stack)-1]
            }
        }
    }

    result := 0
    for _, it := range stack {
        result += it.val
    }
    return result
}
```

```kotlin
class Solution {
    fun calculate(s: String): Int {
        fun evaluate(x: Int, y: Int, op: Char): Int {
            return when (op) {
                '+' -> x
                '-' -> -x
                '*' -> x * y
                else -> x / y
            }
        }

        val stack = mutableListOf<Any>()
        var curr = 0
        var previousOperator = '+'
        val str = s + "@"

        for (c in str) {
            when {
                c.isDigit() -> curr = curr * 10 + (c - '0')
                c == '(' -> {
                    stack.add(previousOperator)
                    previousOperator = '+'
                }
                else -> {
                    if (previousOperator == '*' || previousOperator == '/') {
                        val prev = stack.removeLast() as Int
                        stack.add(evaluate(prev, curr, previousOperator))
                    } else {
                        stack.add(evaluate(curr, 0, previousOperator))
                    }

                    curr = 0
                    previousOperator = c

                    if (c == ')') {
                        while (stack.isNotEmpty() && stack.last() is Int) {
                            curr += stack.removeLast() as Int
                        }
                        previousOperator = stack.removeLast() as Char
                    }
                }
            }
        }

        return stack.sumOf { it as Int }
    }
}
```

```swift
class Solution {
    func calculate(_ s: String) -> Int {
        func evaluate(_ x: Int, _ y: Int, _ op: Character) -> Int {
            switch op {
            case "+": return x
            case "-": return -x
            case "*": return x * y
            default: return x / y
            }
        }

        enum StackItem {
            case num(Int)
            case op(Character)
        }

        var stack = [StackItem]()
        var curr = 0
        var previousOperator: Character = "+"
        let chars = Array(s) + ["@"]

        for c in chars {
            if c.isNumber {
                curr = curr * 10 + Int(String(c))!
            } else if c == "(" {
                stack.append(.op(previousOperator))
                previousOperator = "+"
            } else {
                if previousOperator == "*" || previousOperator == "/" {
                    if case .num(let prev) = stack.removeLast() {
                        stack.append(.num(evaluate(prev, curr, previousOperator)))
                    }
                } else {
                    stack.append(.num(evaluate(curr, 0, previousOperator)))
                }

                curr = 0
                previousOperator = c

                if c == ")" {
                    while !stack.isEmpty {
                        if case .num(let val) = stack.last! {
                            curr += val
                            stack.removeLast()
                        } else {
                            break
                        }
                    }
                    if case .op(let op) = stack.removeLast() {
                        previousOperator = op
                    }
                }
            }
        }

        var result = 0
        for item in stack {
            if case .num(let val) = item {
                result += val
            }
        }
        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the expression

---

## 2. Solve Isolated Expressions With Recursion

### Intuition

Parentheses naturally suggest recursion. When we encounter an opening parenthesis, we can recursively evaluate everything inside it and treat the result as a single number. This makes the problem cleaner since each recursive call handles one level of nesting. The base case is a simple expression without parentheses, which we evaluate using the same logic as Basic Calculator II.

### Algorithm

1. Append a sentinel `@` to the string. Use an index variable shared across recursive calls.
2. Define a recursive `solve` function:
   - Initialize a stack, current number, and previous operator (`+`).
   - While the index is within bounds:
     - If the character is `(`, increment the index and recursively call `solve` to get the inner result.
     - If it's a digit, build the current number.
     - Otherwise, apply the previous operator (push for `+/-`, compute for `*//`).
     - If it's `)`, break out of the loop.
     - Reset the number and update the operator.
   - Return the sum of the stack.
3. Call `solve` starting from index 0 and return its result.

::tabs-start

```python
class Solution:
    def calculate(self, s: str) -> int:
        def evaluate(x, y, operator):
            if operator == "+":
                return x
            if operator == "-":
                return -x
            if operator == "*":
                return x * y
            return int(x / y)
        
        def solve(i):
            stack = []
            curr = 0
            previous_operator = "+"
            
            while i[0] < len(s):
                c = s[i[0]]
                if c == "(":
                    i[0] += 1
                    curr = solve(i)
                elif c.isdigit():
                    curr = curr * 10 + int(c)
                else:
                    if previous_operator in "*/":
                        stack.append(evaluate(stack.pop(), curr, previous_operator))
                    else:
                        stack.append(evaluate(curr, 0, previous_operator))
                     
                    if c == ")":
                        break
                    
                    curr = 0
                    previous_operator = c
                    
                i[0] += 1
            
            return sum(stack)

        s += "@"
        return solve([0])
```

```java
class Solution {
    private int evaluate(char operator, int x, int y) {
        if (operator == '+') {
            return x;
        } else if (operator == '-') {
            return -x;
        } else if (operator == '*') {
            return x * y;
        }
        
        return x / y;
    }
    
    private int solve(String s, int[] i) {
        Stack<Integer> stack = new Stack<>();
        int curr = 0;
        char previousOperator = '+';
        
        while (i[0] < s.length()) {
            char c = s.charAt(i[0]);
            if (c == '(') {
                i[0]++;
                curr = solve(s, i);
            } else if (Character.isDigit(c)) {
                curr = curr * 10 + Character.getNumericValue(c);
            } else {
                if (previousOperator == '*' || previousOperator == '/') {
                    stack.push(evaluate(previousOperator, stack.pop(), curr));
                } else {
                    stack.push(evaluate(previousOperator, curr, 0));
                }
                
                if (c == ')') {
                    break;
                }
                
                curr = 0;
                previousOperator = c;
            }
            
            i[0]++;
        }
        
        int ans = 0;
        for (int num: stack) {
            ans += num;
        }
        
        return ans;
    }
    
    public int calculate(String s) {
        s += "@";
        int[] i = new int[1];
        return solve(s, i);
    }
}
```

```cpp
class Solution {
public:
    int calculate(string s) {
        s += "@";
        int i = 0;
        return solve(s, i);
    }

private:
    int evaluate(char op, int x, int y) {
        if (op == '+') {
            return x;
        } else if (op == '-') {
            return -x;
        } else if (op == '*') {
            return x * y;
        }

        return x / y;
    }

    int solve(string& s, int& i) {
        stack<int> stk;
        int curr = 0;
        char previousOperator = '+';

        while (i < s.length()) {
            char c = s[i];

            if (c == '(') {
                i++;
                curr = solve(s, i);
            } else if (isdigit(c)) {
                curr = curr * 10 + (c - '0');
            } else {
                if (previousOperator == '*' || previousOperator == '/') {
                    int top = stk.top();
                    stk.pop();
                    stk.push(evaluate(previousOperator, top, curr));
                } else {
                    stk.push(evaluate(previousOperator, curr, 0));
                }

                if (c == ')') {
                    break;
                }

                curr = 0;
                previousOperator = c;
            }

            i++;
        }

        int ans = 0;
        while (!stk.empty()) {
            ans += stk.top();
            stk.pop();
        }

        return ans;
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
        /**
         * @param {number} x
         * @param {number} y
         * @param {string} operator
         * @return {number}
         */
        function evaluate(x, y, operator) {
            if (operator === "+") {
                return x;
            }
            if (operator === "-") {
                return -x;
            }
            if (operator === "*") {
                return x * y;
            }
            return Math.trunc(x / y);
        }

        /**
         * @param {number[]} i
         * @return {number}
         */
        function solve(i) {
            const stack = [];
            let curr = 0;
            let previousOperator = "+";

            while (i[0] < s.length) {
                const c = s[i[0]];

                if (c === "(") {
                    i[0] += 1;
                    curr = solve(i);
                } else if (c >= "0" && c <= "9") {
                    curr = curr * 10 + parseInt(c);
                } else {
                    if (previousOperator === "*" || previousOperator === "/") {
                        stack.push(evaluate(stack.pop(), curr, previousOperator));
                    } else {
                        stack.push(evaluate(curr, 0, previousOperator));
                    }

                    if (c === ")") {
                        break;
                    }

                    curr = 0;
                    previousOperator = c;
                }

                i[0] += 1;
            }

            return stack.reduce(function(sum, val) { return sum + val; }, 0);
        }

        s += "@";
        return solve([0]);
    }
}
```

```csharp
public class Solution {
    private string s;

    public int Calculate(string s) {
        this.s = s + "@";
        int[] i = new int[1];
        return Solve(i);
    }

    private int Evaluate(int x, int y, char op) {
        if (op == '+') return x;
        if (op == '-') return -x;
        if (op == '*') return x * y;
        return x / y;
    }

    private int Solve(int[] i) {
        var stack = new List<int>();
        int curr = 0;
        char previousOperator = '+';

        while (i[0] < s.Length) {
            char c = s[i[0]];

            if (c == '(') {
                i[0]++;
                curr = Solve(i);
            } else if (char.IsDigit(c)) {
                curr = curr * 10 + (c - '0');
            } else {
                if (previousOperator == '*' || previousOperator == '/') {
                    int prev = stack[stack.Count - 1];
                    stack.RemoveAt(stack.Count - 1);
                    stack.Add(Evaluate(prev, curr, previousOperator));
                } else {
                    stack.Add(Evaluate(curr, 0, previousOperator));
                }

                if (c == ')') break;

                curr = 0;
                previousOperator = c;
            }

            i[0]++;
        }

        int result = 0;
        foreach (int val in stack) result += val;
        return result;
    }
}
```

```go
func calculate(s string) int {
    s += "@"
    i := 0
    return solve(s, &i)
}

func solve(s string, i *int) int {
    evaluate := func(x, y int, op byte) int {
        switch op {
        case '+':
            return x
        case '-':
            return -x
        case '*':
            return x * y
        default:
            return x / y
        }
    }

    stack := []int{}
    curr := 0
    previousOperator := byte('+')

    for *i < len(s) {
        c := s[*i]

        if c == '(' {
            *i++
            curr = solve(s, i)
        } else if c >= '0' && c <= '9' {
            curr = curr*10 + int(c-'0')
        } else {
            if previousOperator == '*' || previousOperator == '/' {
                prev := stack[len(stack)-1]
                stack = stack[:len(stack)-1]
                stack = append(stack, evaluate(prev, curr, previousOperator))
            } else {
                stack = append(stack, evaluate(curr, 0, previousOperator))
            }

            if c == ')' {
                break
            }

            curr = 0
            previousOperator = c
        }

        *i++
    }

    result := 0
    for _, v := range stack {
        result += v
    }
    return result
}
```

```kotlin
class Solution {
    private var idx = 0
    private lateinit var str: String

    fun calculate(s: String): Int {
        str = s + "@"
        idx = 0
        return solve()
    }

    private fun evaluate(x: Int, y: Int, op: Char): Int {
        return when (op) {
            '+' -> x
            '-' -> -x
            '*' -> x * y
            else -> x / y
        }
    }

    private fun solve(): Int {
        val stack = mutableListOf<Int>()
        var curr = 0
        var previousOperator = '+'

        while (idx < str.length) {
            val c = str[idx]

            when {
                c == '(' -> {
                    idx++
                    curr = solve()
                }
                c.isDigit() -> curr = curr * 10 + (c - '0')
                else -> {
                    if (previousOperator == '*' || previousOperator == '/') {
                        val prev = stack.removeLast()
                        stack.add(evaluate(prev, curr, previousOperator))
                    } else {
                        stack.add(evaluate(curr, 0, previousOperator))
                    }

                    if (c == ')') break

                    curr = 0
                    previousOperator = c
                }
            }

            idx++
        }

        return stack.sum()
    }
}
```

```swift
class Solution {
    private var s: [Character] = []
    private var idx = 0

    func calculate(_ s: String) -> Int {
        self.s = Array(s) + ["@"]
        idx = 0
        return solve()
    }

    private func evaluate(_ x: Int, _ y: Int, _ op: Character) -> Int {
        switch op {
        case "+": return x
        case "-": return -x
        case "*": return x * y
        default: return x / y
        }
    }

    private func solve() -> Int {
        var stack = [Int]()
        var curr = 0
        var previousOperator: Character = "+"

        while idx < s.count {
            let c = s[idx]

            if c == "(" {
                idx += 1
                curr = solve()
            } else if c.isNumber {
                curr = curr * 10 + Int(String(c))!
            } else {
                if previousOperator == "*" || previousOperator == "/" {
                    let prev = stack.removeLast()
                    stack.append(evaluate(prev, curr, previousOperator))
                } else {
                    stack.append(evaluate(curr, 0, previousOperator))
                }

                if c == ")" { break }

                curr = 0
                previousOperator = c
            }

            idx += 1
        }

        return stack.reduce(0, +)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the expression
