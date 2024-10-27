## 1. Brute Force

::tabs-start

```python
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        while len(tokens) > 1:
            for i in range(len(tokens)):
                if tokens[i] in "+-*/":
                    a = int(tokens[i-2])
                    b = int(tokens[i-1])
                    if tokens[i] == '+':
                        result = a + b
                    elif tokens[i] == '-':
                        result = a - b
                    elif tokens[i] == '*':
                        result = a * b
                    elif tokens[i] == '/':
                        result = int(a / b)
                    tokens = tokens[:i-2] + [str(result)] + tokens[i+1:]
                    break
        return int(tokens[0])
```

```java
public class Solution {
    public int evalRPN(String[] tokens) {
        List<String> tokenList = new ArrayList<>(Arrays.asList(tokens));
        
        while (tokenList.size() > 1) {
            for (int i = 0; i < tokenList.size(); i++) {
                String token = tokenList.get(i);
                
                if ("+-*/".contains(token)) {
                    int a = Integer.parseInt(tokenList.get(i - 2));
                    int b = Integer.parseInt(tokenList.get(i - 1));
                    int result = 0;
                    
                    if (token.equals("+")) {
                        result = a + b;
                    } else if (token.equals("-")) {
                        result = a - b;
                    } else if (token.equals("*")) {
                        result = a * b;
                    } else if (token.equals("/")) {
                        result = a / b;
                    }
                    
                    tokenList.set(i - 2, String.valueOf(result));
                    tokenList.remove(i); 
                    tokenList.remove(i - 1);                     
                    break;
                }
            }
        }
        return Integer.parseInt(tokenList.get(0));
    }
}
```

```cpp
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        while (tokens.size() > 1) {
            for (int i = 0; i < tokens.size(); i++) {
                if (tokens[i] == "+" 
                    || tokens[i] == "-" 
                    || tokens[i] == "*" 
                    || tokens[i] == "/") 
                {
                    int a = stoi(tokens[i - 2]);
                    int b = stoi(tokens[i - 1]);
                    int result = 0;
                    if (tokens[i] == "+") result = a + b;
                    else if (tokens[i] == "-") result = a - b;
                    else if (tokens[i] == "*") result = a * b;
                    else if (tokens[i] == "/") result = a / b;
                    
                    tokens.erase(tokens.begin() + i - 2, tokens.begin() + i + 1);
                    tokens.insert(tokens.begin() + i - 2, to_string(result));
                    break;
                }
            }
        }
        return stoi(tokens[0]);
    }
};
```

```javascript
class Solution {
    evalRPN(tokens) {
        while (tokens.length > 1) {
            for (let i = 0; i < tokens.length; i++) {
                if ("+-*/".includes(tokens[i])) {
                    const a = parseInt(tokens[i - 2]);
                    const b = parseInt(tokens[i - 1]);
                    let result;
                    if (tokens[i] === "+") result = a + b;
                    else if (tokens[i] === "-") result = a - b;
                    else if (tokens[i] === "*") result = a * b;
                    else if (tokens[i] === "/") result = Math.trunc(a / b);
                    
                    tokens.splice(i - 2, 3, result.toString());
                    break;
                }
            }
        }
        return parseInt(tokens[0]);
    }
}
```

```csharp
public class Solution {
    public int EvalRPN(string[] tokens) {
        List<string> tokenList = new List<string>(tokens);
        
        while (tokenList.Count > 1) {
            for (int i = 0; i < tokenList.Count; i++) {
                if ("+-*/".Contains(tokenList[i])) {
                    int a = int.Parse(tokenList[i - 2]);
                    int b = int.Parse(tokenList[i - 1]);
                    int result = 0;
                    switch (tokenList[i]) {
                        case "+":
                            result = a + b;
                            break;
                        case "-":
                            result = a - b;
                            break;
                        case "*":
                            result = a * b;
                            break;
                        case "/":
                            result = a / b;
                            break;
                    }
                    tokenList.RemoveRange(i - 2, 3);
                    tokenList.Insert(i - 2, result.ToString());
                    break;
                }
            }
        }
        return int.Parse(tokenList[0]);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 2. Doubly Linked List

::tabs-start

```python
class DoublyLinkedList:
    def __init__(self, val, next=None, prev=None):
        self.val = val
        self.next = next
        self.prev = prev

class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        head = DoublyLinkedList(tokens[0])
        curr = head

        for i in range(1, len(tokens)):
            curr.next = DoublyLinkedList(tokens[i], prev=curr)
            curr = curr.next

        while head is not None:
            if head.val in "+-*/":
                l = int(head.prev.prev.val)
                r = int(head.prev.val)
                if head.val == '+':
                    res = l + r
                elif head.val == '-':
                    res = l - r
                elif head.val == '*':
                    res = l * r
                else:
                    res = int(l / r)

                head.val = str(res)
                head.prev = head.prev.prev.prev
                if head.prev is not None:
                    head.prev.next = head

            ans = int(head.val)
            head = head.next

        return ans
```

```java
public class DoublyLinkedList {
    String val;
    DoublyLinkedList next;
    DoublyLinkedList prev;

    DoublyLinkedList(String val, DoublyLinkedList next, DoublyLinkedList prev) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}

public class Solution {
    public int evalRPN(String[] tokens) {
        DoublyLinkedList head = new DoublyLinkedList(tokens[0], null, null);
        DoublyLinkedList curr = head;

        for (int i = 1; i < tokens.length; i++) {
            curr.next = new DoublyLinkedList(tokens[i], null, curr);
            curr = curr.next;
        }

        int ans = 0;
        while (head != null) {
            if ("+-*/".contains(head.val)) {
                int l = Integer.parseInt(head.prev.prev.val);
                int r = Integer.parseInt(head.prev.val);
                int res = 0;
                if (head.val.equals("+")) {
                    res = l + r;
                } else if (head.val.equals("-")) {
                    res = l - r;
                } else if (head.val.equals("*")) {
                    res = l * r;
                } else {
                    res = l / r;
                }

                head.val = String.valueOf(res);
                head.prev = head.prev.prev.prev;
                if (head.prev != null) {
                    head.prev.next = head;
                }
            }

            ans = Integer.parseInt(head.val);
            head = head.next;
        }

        return ans;
    }
}
```

```cpp
class DoublyLinkedList {
public:
    string val;
    DoublyLinkedList* next;
    DoublyLinkedList* prev;

    DoublyLinkedList(string val, DoublyLinkedList* next = nullptr, 
                        DoublyLinkedList* prev = nullptr) {
        this->val = val;
        this->next = next;
        this->prev = prev;
    }
};

class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        DoublyLinkedList* head = new DoublyLinkedList(tokens[0]);
        DoublyLinkedList* curr = head;

        for (int i = 1; i < tokens.size(); i++) {
            curr->next = new DoublyLinkedList(tokens[i], nullptr, curr);
            curr = curr->next;
        }

        int ans = 0;
        while (head != nullptr) {
            if (head->val == "+" ||
                 head->val == "-" || 
                 head->val == "*" || 
                 head->val == "/") 
            {
                int l = stoi(head->prev->prev->val);
                int r = stoi(head->prev->val);
                int res = 0;
                if (head->val == "+") {
                    res = l + r;
                } else if (head->val == "-") {
                    res = l - r;
                } else if (head->val == "*") {
                    res = l * r;
                } else {
                    res = l / r;
                }

                head->val = to_string(res);
                head->prev = head->prev->prev->prev;
                if (head->prev != nullptr) {
                    head->prev->next = head;
                }
            }

            ans = stoi(head->val);
            head = head->next;
        }

        return ans;
    }
};
```

```javascript
class DoublyLinkedList {
    constructor(val, next = null, prev = null) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}

class Solution {
    /**
     * @param {string[]} tokens
     * @return {number}
     */
    evalRPN(tokens) {
        let head = new DoublyLinkedList(tokens[0]);
        let curr = head;

        for (let i = 1; i < tokens.length; i++) {
            curr.next = new DoublyLinkedList(tokens[i], null, curr);
            curr = curr.next;
        }

        let ans = 0;
        while (head !== null) {
            if ("+-*/".includes(head.val)) {
                let l = parseInt(head.prev.prev.val);
                let r = parseInt(head.prev.val);
                let res = 0;
                if (head.val === "+") {
                    res = l + r;
                } else if (head.val === "-") {
                    res = l - r;
                } else if (head.val === "*") {
                    res = l * r;
                } else {
                    res = Math.trunc(l / r);
                }

                head.val = res.toString();
                head.prev = head.prev.prev.prev;
                if (head.prev !== null) {
                    head.prev.next = head;
                }
            }

            ans = parseInt(head.val);
            head = head.next;
        }

        return ans;
    }
}
```

```csharp
public class DoublyLinkedList {
    public string val;
    public DoublyLinkedList next;
    public DoublyLinkedList prev;

    public DoublyLinkedList(string val, DoublyLinkedList next = null, 
                            DoublyLinkedList prev = null) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}

public class Solution {
    public int EvalRPN(string[] tokens) {
        DoublyLinkedList head = new DoublyLinkedList(tokens[0]);
        DoublyLinkedList curr = head;

        for (int i = 1; i < tokens.Length; i++) {
            curr.next = new DoublyLinkedList(tokens[i], null, curr);
            curr = curr.next;
        }

        int ans = 0;
        while (head != null) {
            if ("+-*/".Contains(head.val)) {
                int l = int.Parse(head.prev.prev.val);
                int r = int.Parse(head.prev.val);
                int res = 0;
                if (head.val == "+") {
                    res = l + r;
                } else if (head.val == "-") {
                    res = l - r;
                } else if (head.val == "*") {
                    res = l * r;
                } else {
                    res = l / r;
                }

                head.val = res.ToString();
                head.prev = head.prev.prev.prev;
                if (head.prev != null) {
                    head.prev.next = head;
                }
            }

            ans = int.Parse(head.val);
            head = head.next;
        }

        return ans;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Recursion

::tabs-start

```python
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        def dfs():
            token = tokens.pop()
            if token not in "+-*/":
                return int(token)
            
            right = dfs()
            left = dfs()
            
            if token == '+':
                return left + right
            elif token == '-':
                return left - right
            elif token == '*':
                return left * right
            elif token == '/':
                return int(left / right)
        
        return dfs()
```

```java
public class Solution {
    public int evalRPN(String[] tokens) {
        List<String> tokenList = new ArrayList<>(Arrays.asList(tokens));
        return dfs(tokenList);
    }

    private int dfs(List<String> tokens) {
        String token = tokens.remove(tokens.size() - 1);
        
        if (!"+-*/".contains(token)) {
            return Integer.parseInt(token);
        }

        int right = dfs(tokens);
        int left = dfs(tokens);

        switch (token) {
            case "+":
                return left + right;
            case "-":
                return left - right;
            case "*":
                return left * right;
            case "/":
                return left / right;
        }

        return 0;
    }
}
```

```cpp
class Solution {
public:
    int dfs(vector<string>& tokens) {
        string token = tokens.back();
        tokens.pop_back();
        
        if (token != "+" && token != "-" &&
             token != "*" && token != "/") 
        {
            return stoi(token);
        }

        int right = dfs(tokens);
        int left = dfs(tokens);
        
        if (token == "+") {
            return left + right;
        } else if (token == "-") {
            return left - right;
        } else if (token == "*") {
            return left * right;
        } else {
            return left / right;
        }
    }

    int evalRPN(vector<string>& tokens) {
        return dfs(tokens);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} tokens
     * @return {number}
     */
    evalRPN(tokens) {
        
        /**
         * @return {number}
         */
        const dfs = () => {
            const token = tokens.pop();
            if (!"+-*/".includes(token)) {
                return parseInt(token);
            }

            const right = dfs();
            const left = dfs();

            if (token === '+') {
                return left + right;
            } else if (token === '-') {
                return left - right;
            } else if (token === '*') {
                return left * right;
            } else {
                return Math.trunc(left / right);
            }
        };

        return dfs();
    }
}
```

```csharp
public class Solution {
    public int EvalRPN(string[] tokens) {
        List<string> tokenList = new List<string>(tokens);
        return DFS(tokenList);
    }

    public int DFS(List<string> tokens) {
        string token = tokens[tokens.Count - 1];
        tokens.RemoveAt(tokens.Count - 1);

        if (token != "+" && token != "-" &&
         token != "*" && token != "/") {
            return int.Parse(token);
        }

        int right = DFS(tokens);
        int left = DFS(tokens);

        if (token == "+") {
            return left + right;
        } else if (token == "-") {
            return left - right;
        } else if (token == "*") {
            return left * right;
        } else {
            return left / right;
        }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Stack

::tabs-start

```python
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        for c in tokens:
            if c == "+":
                stack.append(stack.pop() + stack.pop())
            elif c == "-":
                a, b = stack.pop(), stack.pop()
                stack.append(b - a)
            elif c == "*":
                stack.append(stack.pop() * stack.pop())
            elif c == "/":
                a, b = stack.pop(), stack.pop()
                stack.append(int(float(b) / a))
            else:
                stack.append(int(c))
        return stack[0]
```

```java
class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        for (String c : tokens) {
            if (c.equals("+")) {
                stack.push(stack.pop() + stack.pop());
            } else if (c.equals("-")) {
                int a = stack.pop();
                int b = stack.pop();
                stack.push(b - a);
            } else if (c.equals("*")) {
                stack.push(stack.pop() * stack.pop());
            } else if (c.equals("/")) {
                int a = stack.pop();
                int b = stack.pop();
                stack.push(b / a);
            } else {
                stack.push(Integer.parseInt(c));
            }
        }
        return stack.pop();
    }
}
```

```cpp
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> stack;
        for (const string& c : tokens) {
            if (c == "+") {
                int a = stack.top(); stack.pop();
                int b = stack.top(); stack.pop();
                stack.push(b + a);
            } else if (c == "-") {
                int a = stack.top(); stack.pop();
                int b = stack.top(); stack.pop();
                stack.push(b - a);
            } else if (c == "*") {
                int a = stack.top(); stack.pop();
                int b = stack.top(); stack.pop();
                stack.push(b * a);
            } else if (c == "/") {
                int a = stack.top(); stack.pop();
                int b = stack.top(); stack.pop();
                stack.push(b / a);
            } else {
                stack.push(stoi(c));
            }
        }
        return stack.top();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} tokens
     * @return {number}
     */
    evalRPN(tokens) {
        const stack = [];
        for (const c of tokens) {
            if (c === '+') {
                stack.push(stack.pop() + stack.pop());
            } else if (c === '-') {
                const a = stack.pop();
                const b = stack.pop();
                stack.push(b - a);
            } else if (c === '*') {
                stack.push(stack.pop() * stack.pop());
            } else if (c === '/') {
                const a = stack.pop();
                const b = stack.pop();
                stack.push(Math.trunc(b / a));
            } else {
                stack.push(parseInt(c));
            }
        }
        return stack.pop();
    }
}
```

```csharp
public class Solution {
    public int EvalRPN(string[] tokens) {
        Stack<int> stack = new Stack<int>();
        foreach (string c in tokens) {
            if (c == "+") {
                stack.Push(stack.Pop() + stack.Pop());
            } else if (c == "-") {
                int a = stack.Pop();
                int b = stack.Pop();
                stack.Push(b - a);
            } else if (c == "*") {
                stack.Push(stack.Pop() * stack.Pop());
            } else if (c == "/") {
                int a = stack.Pop();
                int b = stack.Pop();
                stack.Push((int) ((double) b / a));
            } else {
                stack.Push(int.Parse(c));
            }
        }
        return stack.Pop();
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$