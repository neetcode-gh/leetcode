## 1. Using Two Queues

### Intuition

A stack follows Last-In-First-Out (LIFO) order, but a queue follows First-In-First-Out (FIFO). To simulate a stack using queues, we need to reverse the order of elements on each push.
The idea is to use two queues: when pushing a new element, we add it to the empty second queue, then move all elements from the first queue behind it. This places the newest element at the front, ready to be popped first.
After rearranging, we swap the two queues so the main queue always has elements in stack order.

### Algorithm

1. Initialize two empty queues `q1` and `q2`.
2. **push(x)**: Add `x` to `q2`, then move all elements from `q1` to `q2` one by one. Finally, swap `q1` and `q2`.
3. **pop()**: Remove and return the front element from `q1`.
4. **top()**: Return the front element of `q1` without removing it.
5. **empty()**: Return true if `q1` is empty.

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

```go
type MyStack struct {
    q1 []int
    q2 []int
}

func Constructor() MyStack {
    return MyStack{
        q1: []int{},
        q2: []int{},
    }
}

func (this *MyStack) Push(x int) {
    this.q2 = append(this.q2, x)
    for len(this.q1) > 0 {
        this.q2 = append(this.q2, this.q1[0])
        this.q1 = this.q1[1:]
    }
    this.q1, this.q2 = this.q2, this.q1
}

func (this *MyStack) Pop() int {
    top := this.q1[0]
    this.q1 = this.q1[1:]
    return top
}

func (this *MyStack) Top() int {
    return this.q1[0]
}

func (this *MyStack) Empty() bool {
    return len(this.q1) == 0
}
```

```kotlin
class MyStack() {
    private val q1 = ArrayDeque<Int>()
    private val q2 = ArrayDeque<Int>()

    fun push(x: Int) {
        q2.addLast(x)
        while (q1.isNotEmpty()) {
            q2.addLast(q1.removeFirst())
        }
        val temp = q1
        q1.addAll(q2)
        q2.clear()
    }

    fun pop(): Int {
        return q1.removeFirst()
    }

    fun top(): Int {
        return q1.first()
    }

    fun empty(): Boolean {
        return q1.isEmpty()
    }
}
```

```swift
class MyStack {
    private var q1: [Int]
    private var q2: [Int]

    init() {
        q1 = []
        q2 = []
    }

    func push(_ x: Int) {
        q2.append(x)
        while !q1.isEmpty {
            q2.append(q1.removeFirst())
        }
        swap(&q1, &q2)
    }

    func pop() -> Int {
        return q1.removeFirst()
    }

    func top() -> Int {
        return q1.first!
    }

    func empty() -> Bool {
        return q1.isEmpty
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

### Intuition

We can achieve the same result with just one queue. The trick is to rotate the queue after each push so the newest element moves to the front.
When we add an element, we push it to the back of the queue, then dequeue and re-enqueue all the elements that were already there. This effectively moves the new element to the front.
This approach uses less space than two queues while maintaining the same time complexity for push operations.

### Algorithm

1. Initialize a single empty queue `q`.
2. **push(x)**: Add `x` to the back of `q`. Then, rotate the queue by removing and re-adding elements `size - 1` times. This moves `x` to the front.
3. **pop()**: Remove and return the front element from `q`.
4. **top()**: Return the front element of `q` without removing it.
5. **empty()**: Return true if `q` is empty.

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

```go
type MyStack struct {
    q []int
}

func Constructor() MyStack {
    return MyStack{q: []int{}}
}

func (this *MyStack) Push(x int) {
    this.q = append(this.q, x)
    for i := len(this.q) - 1; i > 0; i-- {
        this.q = append(this.q, this.q[0])
        this.q = this.q[1:]
    }
}

func (this *MyStack) Pop() int {
    top := this.q[0]
    this.q = this.q[1:]
    return top
}

func (this *MyStack) Top() int {
    return this.q[0]
}

func (this *MyStack) Empty() bool {
    return len(this.q) == 0
}
```

```kotlin
class MyStack() {
    private val q = ArrayDeque<Int>()

    fun push(x: Int) {
        q.addLast(x)
        for (i in 0 until q.size - 1) {
            q.addLast(q.removeFirst())
        }
    }

    fun pop(): Int {
        return q.removeFirst()
    }

    fun top(): Int {
        return q.first()
    }

    fun empty(): Boolean {
        return q.isEmpty()
    }
}
```

```swift
class MyStack {
    private var q: [Int]

    init() {
        q = []
    }

    func push(_ x: Int) {
        q.append(x)
        for _ in 0..<(q.count - 1) {
            q.append(q.removeFirst())
        }
    }

    func pop() -> Int {
        return q.removeFirst()
    }

    func top() -> Int {
        return q.first!
    }

    func empty() -> Bool {
        return q.isEmpty
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

### Intuition

This approach takes a different perspective by nesting structures. Instead of rearranging elements, we create a new queue (or node) for each push that contains the value and a reference to the previous structure.
Each push wraps the current state inside a new container, with the new value at the front. This creates a chain where the most recent element is always immediately accessible.
In practice, this behaves like building a linked list where each node holds a value and points to the rest of the stack.

### Algorithm

1. Initialize `q` as `null` (empty stack).
2. **push(x)**: Create a new queue/node containing `x` as the first element and the old `q` as the second element. Update `q` to point to this new structure.
3. **pop()**: Extract the first element (the value), update `q` to point to the second element (the rest of the stack), and return the value.
4. **top()**: Return the first element of `q` without modifying anything.
5. **empty()**: Return true if `q` is `null`.

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

```go
type Node struct {
    val  int
    next *Node
}

type MyStack struct {
    q *Node
}

func Constructor() MyStack {
    return MyStack{q: nil}
}

func (this *MyStack) Push(x int) {
    this.q = &Node{val: x, next: this.q}
}

func (this *MyStack) Pop() int {
    if this.q == nil {
        return -1
    }
    top := this.q.val
    this.q = this.q.next
    return top
}

func (this *MyStack) Top() int {
    if this.q == nil {
        return -1
    }
    return this.q.val
}

func (this *MyStack) Empty() bool {
    return this.q == nil
}
```

```kotlin
class Node(val value: Int, val next: Node?)

class MyStack() {
    private var q: Node? = null

    fun push(x: Int) {
        q = Node(x, q)
    }

    fun pop(): Int {
        if (q == null) return -1
        val top = q!!.value
        q = q!!.next
        return top
    }

    fun top(): Int {
        return q?.value ?: -1
    }

    fun empty(): Boolean {
        return q == null
    }
}
```

```swift
class Node {
    let val: Int
    var next: Node?

    init(_ val: Int, _ next: Node?) {
        self.val = val
        self.next = next
    }
}

class MyStack {
    private var q: Node?

    init() {
        q = nil
    }

    func push(_ x: Int) {
        q = Node(x, q)
    }

    func pop() -> Int {
        guard let node = q else { return -1 }
        q = node.next
        return node.val
    }

    func top() -> Int {
        return q?.val ?? -1
    }

    func empty() -> Bool {
        return q == nil
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
