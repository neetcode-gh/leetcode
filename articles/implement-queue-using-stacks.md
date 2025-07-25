## 1. Using Two Stacks (Brute Force)

::tabs-start

```python
class MyQueue:

    def __init__(self):
        self.stack1 = []
        self.stack2 = []

    def push(self, x: int) -> None:
        self.stack1.append(x)

    def pop(self) -> int:
        while len(self.stack1) > 1:
            self.stack2.append(self.stack1.pop())
        res = self.stack1.pop()
        while self.stack2:
            self.stack1.append(self.stack2.pop())
        return res

    def peek(self) -> int:
        while len(self.stack1) > 1:
            self.stack2.append(self.stack1.pop())
        res = self.stack1[-1]
        while self.stack2:
            self.stack1.append(self.stack2.pop())
        return res

    def empty(self) -> bool:
        return not self.stack1
```

```java
public class MyQueue {
    private Stack<Integer> stack1;
    private Stack<Integer> stack2;

    public MyQueue() {
        stack1 = new Stack<>();
        stack2 = new Stack<>();
    }

    public void push(int x) {
        stack1.push(x);
    }

    public int pop() {
        while (stack1.size() > 1) {
            stack2.push(stack1.pop());
        }
        int res = stack1.pop();
        while (!stack2.isEmpty()) {
            stack1.push(stack2.pop());
        }
        return res;
    }

    public int peek() {
        while (stack1.size() > 1) {
            stack2.push(stack1.pop());
        }
        int res = stack1.peek();
        while (!stack2.isEmpty()) {
            stack1.push(stack2.pop());
        }
        return res;
    }

    public boolean empty() {
        return stack1.isEmpty();
    }
}
```

```cpp
class MyQueue {
private:
    stack<int> stack1;
    stack<int> stack2;

public:
    MyQueue() {}

    void push(int x) {
        stack1.push(x);
    }

    int pop() {
        while (stack1.size() > 1) {
            stack2.push(stack1.top());
            stack1.pop();
        }
        int res = stack1.top();
        stack1.pop();
        while (!stack2.empty()) {
            stack1.push(stack2.top());
            stack2.pop();
        }
        return res;
    }

    int peek() {
        while (stack1.size() > 1) {
            stack2.push(stack1.top());
            stack1.pop();
        }
        int res = stack1.top();
        while (!stack2.empty()) {
            stack1.push(stack2.top());
            stack2.pop();
        }
        return res;
    }

    bool empty() {
        return stack1.empty();
    }
};
```

```javascript
class MyQueue {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }

    /**
     * @param {number} x
     * @return {void}
     */
    push(x) {
        this.stack1.push(x);
    }

    /**
     * @return {number}
     */
    pop() {
        while (this.stack1.length > 1) {
            this.stack2.push(this.stack1.pop());
        }
        const res = this.stack1.pop();
        while (this.stack2.length) {
            this.stack1.push(this.stack2.pop());
        }
        return res;
    }

    /**
     * @return {number}
     */
    peek() {
        while (this.stack1.length > 1) {
            this.stack2.push(this.stack1.pop());
        }
        const res = this.stack1[this.stack1.length - 1];
        while (this.stack2.length) {
            this.stack1.push(this.stack2.pop());
        }
        return res;
    }

    /**
     * @return {boolean}
     */
    empty() {
        return this.stack1.length === 0;
    }
}
```

```csharp
public class MyQueue {
    private Stack<int> stack1;
    private Stack<int> stack2;

    public MyQueue() {
        stack1 = new Stack<int>();
        stack2 = new Stack<int>();
    }

    public void Push(int x) {
        stack1.Push(x);
    }

    public int Pop() {
        while (stack1.Count > 1) {
            stack2.Push(stack1.Pop());
        }
        int res = stack1.Pop();
        while (stack2.Count > 0) {
            stack1.Push(stack2.Pop());
        }
        return res;
    }

    public int Peek() {
        while (stack1.Count > 1) {
            stack2.Push(stack1.Pop());
        }
        int res = stack1.Peek();
        while (stack2.Count > 0) {
            stack1.Push(stack2.Pop());
        }
        return res;
    }

    public bool Empty() {
        return stack1.Count == 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $push()$ and $empty()$ function calls.
    - $O(n)$ time for each $pop()$ and $peek()$ function calls.
- Space complexity: $O(n)$

---

## 2. Using Two Stacks (Amortized Complexity)

::tabs-start

```python
class MyQueue:

    def __init__(self):
        self.s1 = []
        self.s2 = []

    def push(self, x: int) -> None:
        self.s1.append(x)

    def pop(self) -> int:
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2.pop()

    def peek(self) -> int:
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2[-1]

    def empty(self) -> bool:
        return max(len(self.s1), len(self.s2)) == 0
```

```java
public class MyQueue {
    private Stack<Integer> s1;
    private Stack<Integer> s2;

    public MyQueue() {
        s1 = new Stack<>();
        s2 = new Stack<>();
    }

    public void push(int x) {
        s1.push(x);
    }

    public int pop() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }
        return s2.pop();
    }

    public int peek() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
        }
        return s2.peek();
    }

    public boolean empty() {
        return s1.isEmpty() && s2.isEmpty();
    }
}
```

```cpp
class MyQueue {
private:
    stack<int> s1, s2;

public:
    MyQueue() {}

    void push(int x) {
        s1.push(x);
    }

    int pop() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
        int res = s2.top();
        s2.pop();
        return res;
    }

    int peek() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
        return s2.top();
    }

    bool empty() {
        return s1.empty() && s2.empty();
    }
};
```

```javascript
class MyQueue {
    constructor() {
        this.s1 = [];
        this.s2 = [];
    }

    /**
     * @param {number} x
     * @return {void}
     */
    push(x) {
        this.s1.push(x);
    }

    /**
     * @return {number}
     */
    pop() {
        if (this.s2.length === 0) {
            while (this.s1.length > 0) {
                this.s2.push(this.s1.pop());
            }
        }
        return this.s2.pop();
    }

    /**
     * @return {number}
     */
    peek() {
        if (this.s2.length === 0) {
            while (this.s1.length > 0) {
                this.s2.push(this.s1.pop());
            }
        }
        return this.s2[this.s2.length - 1];
    }

    /**
     * @return {boolean}
     */
    empty() {
        return this.s1.length === 0 && this.s2.length === 0;
    }
}
```

```csharp
public class MyQueue {
    private Stack<int> s1;
    private Stack<int> s2;

    public MyQueue() {
        s1 = new Stack<int>();
        s2 = new Stack<int>();
    }

    public void Push(int x) {
        s1.Push(x);
    }

    public int Pop() {
        if (s2.Count == 0) {
            while (s1.Count > 0) {
                s2.Push(s1.Pop());
            }
        }
        return s2.Pop();
    }

    public int Peek() {
        if (s2.Count == 0) {
            while (s1.Count > 0) {
                s2.Push(s1.Pop());
            }
        }
        return s2.Peek();
    }

    public bool Empty() {
        return s1.Count == 0 && s2.Count == 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $push()$ and $empty()$ function calls.
    - $O(1)$ amortized time for each $pop()$ and $peek()$ function calls.
- Space complexity: $O(n)$
