## 1. Stack

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the expression

---

## 2. Solve Isolated Expressions With Recursion

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the length of the expression
