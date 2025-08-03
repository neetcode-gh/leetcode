## 1. Using Two Queues

::tabs-start

```python
class MyStack:

    def __init__(self):
        self.q1 = deque()
        self.q2 = deque()

    def push(self, x: int) -> None:
        self.q2.append(x)
        while self.q1:
            self.q2.append(self.q1.popleft())

        self.q1, self.q2 = self.q2, self.q1

    def pop(self) -> int:
        return self.q1.popleft()

    def top(self) -> int:
        return self.q1[0]

    def empty(self) -> bool:
        return len(self.q1) == 0
```

```java
public class MyStack {
    private Queue<Integer> q1;
    private Queue<Integer> q2;

    public MyStack() {
        q1 = new LinkedList<>();
        q2 = new LinkedList<>();
    }

    public void push(int x) {
        q2.offer(x);
        while (!q1.isEmpty()) {
            q2.offer(q1.poll());
        }
        Queue<Integer> temp = q1;
        q1 = q2;
        q2 = temp;
    }

    public int pop() {
        return q1.poll();
    }

    public int top() {
        return q1.peek();
    }

    public boolean empty() {
        return q1.isEmpty();
    }
}
```

```cpp
class MyStack {
private:
    queue<int> q1;
    queue<int> q2;

public:
    MyStack() {}

    void push(int x) {
        q2.push(x);
        while (!q1.empty()) {
            q2.push(q1.front());
            q1.pop();
        }
        swap(q1, q2);
    }

    int pop() {
        int top = q1.front();
        q1.pop();
        return top;
    }

    int top() {
        return q1.front();
    }

    bool empty() {
        return q1.empty();
    }
};
```

```javascript
class MyStack {
    constructor() {
        this.q1 = new Queue();
        this.q2 = new Queue();
    }

    /**
     * @param {number} x
     * @return {void}
     */
    push(x) {
        this.q2.push(x);

        while (!this.q1.isEmpty()) {
            this.q2.push(this.q1.pop());
        }

        [this.q1, this.q2] = [this.q2, this.q1];
    }

    /**
     * @return {number}
     */
    pop() {
        return this.q1.pop();
    }

    /**
     * @return {number}
     */
    top() {
        return this.q1.front();
    }

    /**
     * @return {boolean}
     */
    empty() {
        return this.q1.isEmpty();
    }
}
```

```csharp
public class MyStack {
    private Queue<int> q1;
    private Queue<int> q2;

    public MyStack() {
        q1 = new Queue<int>();
        q2 = new Queue<int>();
    }

    public void Push(int x) {
        q2.Enqueue(x);
        while (q1.Count > 0) {
            q2.Enqueue(q1.Dequeue());
        }
        var temp = q1;
        q1 = q2;
        q2 = temp;
    }

    public int Pop() {
        return q1.Dequeue();
    }

    public int Top() {
        return q1.Peek();
    }

    public bool Empty() {
        return q1.Count == 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(n)$ time for each $push()$ function call.
    - $O(1)$ time for each $pop()$ function call.
- Space complexity: $O(n)$

---

## 2. Using One Queue

::tabs-start

```python
class MyStack:

    def __init__(self):
        self.q = deque()

    def push(self, x: int) -> None:
        self.q.append(x)
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())

    def pop(self) -> int:
        return self.q.popleft()

    def top(self) -> int:
        return self.q[0]

    def empty(self) -> bool:
        return len(self.q) == 0
```

```java
public class MyStack {
    private Queue<Integer> q;

    public MyStack() {
        q = new LinkedList<>();
    }

    public void push(int x) {
        q.offer(x);
        for (int i = q.size() - 1; i > 0; i--) {
            q.offer(q.poll());
        }
    }

    public int pop() {
        return q.poll();
    }

    public int top() {
        return q.peek();
    }

    public boolean empty() {
        return q.isEmpty();
    }
}
```

```cpp
class MyStack {
    queue<int> q;

public:
    MyStack() {}

    void push(int x) {
        q.push(x);
        for (int i = q.size() - 1; i > 0; i--) {
            q.push(q.front());
            q.pop();
        }
    }

    int pop() {
        int top = q.front();
        q.pop();
        return top;
    }

    int top() {
        return q.front();
    }

    bool empty() {
        return q.empty();
    }
};
```

```javascript
class MyStack {
    constructor() {
        this.q = new Queue();
    }

    /**
     * @param {number} x
     * @return {void}
     */
    push(x) {
        this.q.push(x);

        for (let i = this.q.size() - 1; i > 0; i--) {
            this.q.push(this.q.pop());
        }
    }

    /**
     * @return {number}
     */
    pop() {
        return this.q.pop();
    }

    /**
     * @return {number}
     */
    top() {
        return this.q.front();
    }

    /**
     * @return {boolean}
     */
    empty() {
        return this.q.isEmpty();
    }
}
```

```csharp
public class MyStack {
    private Queue<int> q;

    public MyStack() {
        q = new Queue<int>();
    }

    public void Push(int x) {
        q.Enqueue(x);
        for (int i = q.Count - 1; i > 0; i--) {
            q.Enqueue(q.Dequeue());
        }
    }

    public int Pop() {
        return q.Dequeue();
    }

    public int Top() {
        return q.Peek();
    }

    public bool Empty() {
        return q.Count == 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(n)$ time for each $push()$ function call.
    - $O(1)$ time for each $pop()$ function call.
- Space complexity: $O(n)$

---

## 3. Queue Of Queues

::tabs-start

```python
class MyStack:

    def __init__(self):
        self.q = None

    def push(self, x: int) -> None:
        self.q = deque([x, self.q])

    def pop(self) -> int:
        top = self.q.popleft()
        self.q = self.q.popleft()
        return top

    def top(self) -> int:
        return self.q[0]

    def empty(self) -> bool:
        return not self.q
```

```java
public class MyStack {
    private Queue<Object> q;

    public MyStack() {
        q = null;
    }

    public void push(int x) {
        Queue<Object> newQueue = new LinkedList<>();
        newQueue.add(x);
        newQueue.add(q);
        q = newQueue;
    }

    public int pop() {
        if (q == null) return -1;

        int top = (int) q.poll();
        q = (Queue<Object>) q.poll();
        return top;
    }

    public int top() {
        if (q == null) return -1;
        return (int) q.peek();
    }

    public boolean empty() {
        return q == null;
    }
}
```

```cpp
class MyStack {
private:
    struct Node {
        int val;
        shared_ptr<Node> next;
        Node(int v, shared_ptr<Node> n) : val(v), next(n) {}
    };
    shared_ptr<Node> q;

public:
    MyStack() : q(nullptr) {}

    void push(int x) {
        q = make_shared<Node>(x, q);
    }

    int pop() {
        if (!q) return -1;
        int top = q->val;
        q = q->next;
        return top;
    }

    int top() {
        if (!q) return -1;
        return q->val;
    }

    bool empty() {
        return q == nullptr;
    }
};
```

```javascript
class MyStack {
    constructor() {
        this.q = null;
    }

    /**
     * @param {number} x
     * @return {void}
     */
    push(x) {
        const newQueue = new Queue();
        newQueue.enqueue(x);
        newQueue.enqueue(this.q);
        this.q = newQueue;
    }

    /**
     * @return {number}
     */
    pop() {
        if (this.q === null) return -1;

        const top = this.q.dequeue();
        this.q = this.q.dequeue();
        return top;
    }

    /**
     * @return {number}
     */
    top() {
        if (this.q === null) return -1;
        return this.q.front();
    }

    /**
     * @return {boolean}
     */
    empty() {
        return this.q === null;
    }
}
```

```csharp
public class MyStack {
    private Queue<object> q;

    public MyStack() {
        q = null;
    }

    public void Push(int x) {
        Queue<object> newQueue = new Queue<object>();
        newQueue.Enqueue(x);
        newQueue.Enqueue(q);
        q = newQueue;
    }

    public int Pop() {
        if (q == null) return -1;

        int top = (int)q.Dequeue();
        q = (Queue<object>)q.Dequeue();
        return top;
    }

    public int Top() {
        if (q == null) return -1;
        return (int)q.Peek();
    }

    public bool Empty() {
        return q == null;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $push()$ function call.
    - $O(1)$ time for each $pop()$ function call.
- Space complexity: $O(n)$
