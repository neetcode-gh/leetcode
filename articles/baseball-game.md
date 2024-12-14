## 1. Stack

::tabs-start

```python
class Solution:
    def calPoints(self, operations: List[str]) -> int:
        stack = []
        for op in operations:
            if op == "+":
                stack.append(stack[-1] + stack[-2])
            elif op == "D":
                stack.append(2 * stack[-1])
            elif op == "C":
                stack.pop()
            else:
                stack.append(int(op))
        return sum(stack)
```

```java
public class Solution {
    public int calPoints(String[] operations) {
        Stack<Integer> stack = new Stack<>();
        for (String op : operations) {
            if (op.equals("+")) {
                int top = stack.pop();
                int newTop = top + stack.peek();
                stack.push(top);
                stack.push(newTop);
            } else if (op.equals("D")) {
                stack.push(2 * stack.peek());
            } else if (op.equals("C")) {
                stack.pop();
            } else {
                stack.push(Integer.parseInt(op));
            }
        }
        int sum = 0;
        for (int score : stack) {
            sum += score;
        }
        return sum;
    }
}
```

```cpp
class Solution {
public:
    int calPoints(vector<string>& operations) {
        vector<int> stack;
        for (const string& op : operations) {
            if (op == "+") {
                int top = stack.back(); stack.pop_back();
                int newTop = top + stack.back();
                stack.push_back(top);
                stack.push_back(newTop);
            } else if (op == "D") {
                stack.push_back(2 * stack.back());
            } else if (op == "C") {
                stack.pop_back();
            } else {
                stack.push_back(stoi(op));
            }
        }
        return accumulate(stack.begin(), stack.end(), 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} operations
     * @return {number}
     */
    calPoints(operations) {
        const stack = [];
        for (const op of operations) {
            if (op === "+") {
                const top = stack.pop();
                const newTop = top + stack[stack.length - 1];
                stack.push(top);
                stack.push(newTop);
            } else if (op === "D") {
                stack.push(2 * stack[stack.length - 1]);
            } else if (op === "C") {
                stack.pop();
            } else {
                stack.push(parseInt(op));
            }
        }
        return stack.reduce((a, b) => a + b, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 2. Stack - II

::tabs-start

```python
class Solution:
    def calPoints(self, operations: List[str]) -> int:
        stack, res = [], 0
        for op in operations:
            if op == "+":
                res += stack[-1] + stack[-2]
                stack.append(stack[-1] + stack[-2])
            elif op == "D":
                res += (2 * stack[-1])
                stack.append(2 * stack[-1])
            elif op == "C":
                res -= stack.pop()
            else:
                res += int(op)
                stack.append(int(op))
        return res
```

```java
public class Solution {
    public int calPoints(String[] ops) {
        int res = 0;
        Stack<Integer> stack = new Stack<>();
        for (String op : ops) {
            if (op.equals("+")) {
                int top = stack.pop();
                int newTop = top + stack.peek();
                stack.push(top);
                stack.push(newTop);
                res += newTop;
            } else if (op.equals("D")) {
                stack.push(2 * stack.peek());
                res += stack.peek();
            } else if (op.equals("C")) {
                res -= stack.pop();
            } else {
                stack.push(Integer.parseInt(op));
                res += stack.peek();
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int calPoints(vector<string>& ops) {
        stack<int> stack;
        int res = 0;
        for (const string& op : ops) {
            if (op == "+") {
                int top = stack.top(); stack.pop();
                int newTop = top + stack.top();
                stack.push(top);
                stack.push(newTop);
                res += newTop;
            } else if (op == "D") {
                stack.push(2 * stack.top());
                res += stack.top();
            } else if (op == "C") {
                res -= stack.top();
                stack.pop();
            } else {
                stack.push(stoi(op));
                res += stack.top();
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} operations
     * @return {number}
     */
    calPoints(operations) {
        const stack = [];
        let res = 0;
        for (const op of operations) {
            if (op === "+") {
                const top = stack.pop();
                const newTop = top + stack[stack.length - 1];
                stack.push(top);
                stack.push(newTop);
                res += newTop;
            } else if (op === "D") {
                stack.push(2 * stack[stack.length - 1]);
                res += stack[stack.length - 1];
            } else if (op === "C") {
                res -= stack.pop();
            } else {
                stack.push(parseInt(op));
                res += stack[stack.length - 1];
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$