## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Queues** - Understanding FIFO (First-In-First-Out) operations including enqueue and dequeue
- **Stacks** - Understanding LIFO (Last-In-First-Out) behavior and why it differs from queues

---

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
5. **empty()**: Return `true` if `q1` is empty.

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
    private var q1 = ArrayDeque<Int>()
    private var q2 = ArrayDeque<Int>()

    fun push(x: Int) {
        q2.addLast(x)
        while (q1.isNotEmpty()) {
            q2.addLast(q1.removeFirst())
        }
        val temp = q1
        q1 = q2
        q2 = temp
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

```rust
struct MyStack {
    q1: VecDeque<i32>,
    q2: VecDeque<i32>,
}

impl MyStack {
    fn new() -> Self {
        MyStack {
            q1: VecDeque::new(),
            q2: VecDeque::new(),
        }
    }

    fn push(&mut self, x: i32) {
        self.q2.push_back(x);
        while let Some(val) = self.q1.pop_front() {
            self.q2.push_back(val);
        }
        std::mem::swap(&mut self.q1, &mut self.q2);
    }

    fn pop(&mut self) -> i32 {
        self.q1.pop_front().unwrap()
    }

    fn top(&self) -> i32 {
        *self.q1.front().unwrap()
    }

    fn empty(&self) -> bool {
        self.q1.is_empty()
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
5. **empty()**: Return `true` if `q` is empty.

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

```rust
struct MyStack {
    q: VecDeque<i32>,
}

impl MyStack {
    fn new() -> Self {
        MyStack {
            q: VecDeque::new(),
        }
    }

    fn push(&mut self, x: i32) {
        self.q.push_back(x);
        for _ in 0..self.q.len() - 1 {
            let val = self.q.pop_front().unwrap();
            self.q.push_back(val);
        }
    }

    fn pop(&mut self) -> i32 {
        self.q.pop_front().unwrap()
    }

    fn top(&self) -> i32 {
        *self.q.front().unwrap()
    }

    fn empty(&self) -> bool {
        self.q.is_empty()
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

## Common Pitfalls

### Incorrect Rotation Count in Single Queue Approach

When using one queue, after pushing a new element, the queue must be rotated exactly `size - 1` times to move the new element to the front. A common mistake is rotating `size` times, which brings the queue back to its original state and leaves the new element at the back. The loop should run `for i in range(len(q) - 1)`, not `for i in range(len(q))`.

### Forgetting to Swap Queues in Two Queue Approach

In the two-queue approach, after moving all elements from `q1` to `q2` behind the new element, the queues must be swapped so that `q1` always contains the elements in stack order. Forgetting to swap means subsequent `pop()` and `top()` operations will access the wrong queue, returning incorrect results or causing errors on an empty queue.

### Exceeding the Queue Restrictions

Creating a new nested queue for each pushed value keeps $n$ queues alive for $n$ stack elements, exceeding the two-queue limit. Using linked-list nodes directly also bypasses the requirement to use queue operations. Even if these implementations return the correct outputs, they do not satisfy the problem's constraints. Use at most two queues and access their elements only through the permitted FIFO operations.
