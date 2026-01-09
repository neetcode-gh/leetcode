## 1. Using Two Stacks (Brute Force)

### Intuition

A stack is LIFO (last in, first out) while a queue is FIFO (first in, first out).
To simulate a queue, we need to reverse the order of elements.
By transferring all elements except the bottom one to a second stack, popping the bottom, and transferring back, we can access the first element.
This approach is simple but inefficient since every pop/peek requires moving all elements twice.

### Algorithm

1. For `push`: Simply push the element onto stack1.
2. For `pop`: Move all elements except the last from stack1 to stack2, pop the remaining element from stack1, then move all elements back from stack2 to stack1.
3. For `peek`: Same as pop, but instead of popping, just read the top element of stack1 after moving elements.
4. For `empty`: Return true if stack1 is empty.

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

```go
type MyQueue struct {
    stack1 []int
    stack2 []int
}

func Constructor() MyQueue {
    return MyQueue{
        stack1: []int{},
        stack2: []int{},
    }
}

func (this *MyQueue) Push(x int) {
    this.stack1 = append(this.stack1, x)
}

func (this *MyQueue) Pop() int {
    for len(this.stack1) > 1 {
        this.stack2 = append(this.stack2, this.stack1[len(this.stack1)-1])
        this.stack1 = this.stack1[:len(this.stack1)-1]
    }
    res := this.stack1[len(this.stack1)-1]
    this.stack1 = this.stack1[:len(this.stack1)-1]
    for len(this.stack2) > 0 {
        this.stack1 = append(this.stack1, this.stack2[len(this.stack2)-1])
        this.stack2 = this.stack2[:len(this.stack2)-1]
    }
    return res
}

func (this *MyQueue) Peek() int {
    for len(this.stack1) > 1 {
        this.stack2 = append(this.stack2, this.stack1[len(this.stack1)-1])
        this.stack1 = this.stack1[:len(this.stack1)-1]
    }
    res := this.stack1[len(this.stack1)-1]
    for len(this.stack2) > 0 {
        this.stack1 = append(this.stack1, this.stack2[len(this.stack2)-1])
        this.stack2 = this.stack2[:len(this.stack2)-1]
    }
    return res
}

func (this *MyQueue) Empty() bool {
    return len(this.stack1) == 0
}
```

```kotlin
class MyQueue() {
    private val stack1 = ArrayDeque<Int>()
    private val stack2 = ArrayDeque<Int>()

    fun push(x: Int) {
        stack1.addLast(x)
    }

    fun pop(): Int {
        while (stack1.size > 1) {
            stack2.addLast(stack1.removeLast())
        }
        val res = stack1.removeLast()
        while (stack2.isNotEmpty()) {
            stack1.addLast(stack2.removeLast())
        }
        return res
    }

    fun peek(): Int {
        while (stack1.size > 1) {
            stack2.addLast(stack1.removeLast())
        }
        val res = stack1.last()
        while (stack2.isNotEmpty()) {
            stack1.addLast(stack2.removeLast())
        }
        return res
    }

    fun empty(): Boolean {
        return stack1.isEmpty()
    }
}
```

```swift
class MyQueue {
    private var stack1: [Int]
    private var stack2: [Int]

    init() {
        stack1 = []
        stack2 = []
    }

    func push(_ x: Int) {
        stack1.append(x)
    }

    func pop() -> Int {
        while stack1.count > 1 {
            stack2.append(stack1.removeLast())
        }
        let res = stack1.removeLast()
        while !stack2.isEmpty {
            stack1.append(stack2.removeLast())
        }
        return res
    }

    func peek() -> Int {
        while stack1.count > 1 {
            stack2.append(stack1.removeLast())
        }
        let res = stack1.last!
        while !stack2.isEmpty {
            stack1.append(stack2.removeLast())
        }
        return res
    }

    func empty() -> Bool {
        return stack1.isEmpty
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

### Intuition

Instead of moving elements back after each pop, we can keep them in the second stack.
Stack1 handles incoming elements (push), while stack2 holds elements in reversed order for popping.
When stack2 is empty and we need to pop, we transfer all elements from stack1 to stack2 at once.
Each element is moved at most twice (once to stack2, once when popped), giving amortized O(1) per operation.

### Algorithm

1. For `push`: Push the element onto s1.
2. For `pop`: If s2 is empty, transfer all elements from s1 to s2. Then pop from s2.
3. For `peek`: If s2 is empty, transfer all elements from s1 to s2. Then return the top of s2.
4. For `empty`: Return true if both s1 and s2 are empty.

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

```go
type MyQueue struct {
    s1 []int
    s2 []int
}

func Constructor() MyQueue {
    return MyQueue{
        s1: []int{},
        s2: []int{},
    }
}

func (this *MyQueue) Push(x int) {
    this.s1 = append(this.s1, x)
}

func (this *MyQueue) Pop() int {
    if len(this.s2) == 0 {
        for len(this.s1) > 0 {
            this.s2 = append(this.s2, this.s1[len(this.s1)-1])
            this.s1 = this.s1[:len(this.s1)-1]
        }
    }
    res := this.s2[len(this.s2)-1]
    this.s2 = this.s2[:len(this.s2)-1]
    return res
}

func (this *MyQueue) Peek() int {
    if len(this.s2) == 0 {
        for len(this.s1) > 0 {
            this.s2 = append(this.s2, this.s1[len(this.s1)-1])
            this.s1 = this.s1[:len(this.s1)-1]
        }
    }
    return this.s2[len(this.s2)-1]
}

func (this *MyQueue) Empty() bool {
    return len(this.s1) == 0 && len(this.s2) == 0
}
```

```kotlin
class MyQueue() {
    private val s1 = ArrayDeque<Int>()
    private val s2 = ArrayDeque<Int>()

    fun push(x: Int) {
        s1.addLast(x)
    }

    fun pop(): Int {
        if (s2.isEmpty()) {
            while (s1.isNotEmpty()) {
                s2.addLast(s1.removeLast())
            }
        }
        return s2.removeLast()
    }

    fun peek(): Int {
        if (s2.isEmpty()) {
            while (s1.isNotEmpty()) {
                s2.addLast(s1.removeLast())
            }
        }
        return s2.last()
    }

    fun empty(): Boolean {
        return s1.isEmpty() && s2.isEmpty()
    }
}
```

```swift
class MyQueue {
    private var s1: [Int]
    private var s2: [Int]

    init() {
        s1 = []
        s2 = []
    }

    func push(_ x: Int) {
        s1.append(x)
    }

    func pop() -> Int {
        if s2.isEmpty {
            while !s1.isEmpty {
                s2.append(s1.removeLast())
            }
        }
        return s2.removeLast()
    }

    func peek() -> Int {
        if s2.isEmpty {
            while !s1.isEmpty {
                s2.append(s1.removeLast())
            }
        }
        return s2.last!
    }

    func empty() -> Bool {
        return s1.isEmpty && s2.isEmpty
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
