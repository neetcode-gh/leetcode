## 1. Brute Force

### Intuition
The simplest approach is to use a dynamic array and treat it like a regular queue. We add elements to the back and remove from the front. While this works, removing from the front requires shifting all remaining elements, making it inefficient. We check the array size against the capacity to determine if the queue is full.

### Algorithm
1. Initialize an empty array `q` and store the capacity `k`.
2. For `enQueue(value)`: If the array size equals `k`, return `false`. Otherwise, append the value and return `true`.
3. For `deQueue()`: If the array is empty, return `false`. Otherwise, remove the first element (index `0`) and return `true`.
4. For `Front()`: Return the first element if the array is non-empty, otherwise return `-1`.
5. For `Rear()`: Return the last element if the array is non-empty, otherwise return `-1`.
6. For `isEmpty()`: Return `true` if the array size is `0`.
7. For `isFull()`: Return `true` if the array size equals `k`.

::tabs-start

```python
class MyCircularQueue:

    def __init__(self, k: int):
        self.q = []
        self.k = k

    def enQueue(self, value: int) -> bool:
        if len(self.q) == self.k:
            return False
        self.q.append(value)
        return True

    def deQueue(self) -> bool:
        if not self.q:
            return False
        self.q.pop(0)
        return True

    def Front(self) -> int:
        if self.q:
            return self.q[0]
        return -1

    def Rear(self) -> int:
        if self.q:
            return self.q[-1]
        return -1

    def isEmpty(self) -> bool:
        return len(self.q) == 0

    def isFull(self) -> bool:
        return len(self.q) == self.k
```

```java
public class MyCircularQueue {
    private List<Integer> queue;
    private int capacity;

    public MyCircularQueue(int k) {
        queue = new ArrayList<>();
        capacity = k;
    }

    public boolean enQueue(int value) {
        if (queue.size() == capacity) {
            return false;
        }
        queue.add(value);
        return true;
    }

    public boolean deQueue() {
        if (queue.isEmpty()) {
            return false;
        }
        queue.remove(0);
        return true;
    }

    public int Front() {
        return queue.isEmpty() ? -1 : queue.get(0);
    }

    public int Rear() {
        return queue.isEmpty() ? -1 : queue.get(queue.size() - 1);
    }

    public boolean isEmpty() {
        return queue.isEmpty();
    }

    public boolean isFull() {
        return queue.size() == capacity;
    }
}
```

```cpp
class MyCircularQueue {
private:
    vector<int> queue;
    int capacity;

public:
    MyCircularQueue(int k) {
        capacity = k;
    }

    bool enQueue(int value) {
        if (queue.size() == capacity) {
            return false;
        }
        queue.push_back(value);
        return true;
    }

    bool deQueue() {
        if (queue.empty()) {
            return false;
        }
        queue.erase(queue.begin());
        return true;
    }

    int Front() {
        return queue.empty() ? -1 : queue.front();
    }

    int Rear() {
        return queue.empty() ? -1 : queue.back();
    }

    bool isEmpty() {
        return queue.empty();
    }

    bool isFull() {
        return queue.size() == capacity;
    }
};
```

```javascript
class MyCircularQueue {
    /**
     * @param {number} k
     */
    constructor(k) {
        this.queue = [];
        this.capacity = k;
    }

    /**
     * @param {number} value
     * @return {boolean}
     */
    enQueue(value) {
        if (this.queue.length === this.capacity) {
            return false;
        }
        this.queue.push(value);
        return true;
    }

    /**
     * @return {boolean}
     */
    deQueue() {
        if (this.queue.length === 0) {
            return false;
        }
        this.queue.shift();
        return true;
    }

    /**
     * @return {number}
     */
    Front() {
        return this.queue.length === 0 ? -1 : this.queue[0];
    }

    /**
     * @return {number}
     */
    Rear() {
        return this.queue.length === 0 ? -1 : this.queue[this.queue.length - 1];
    }

    /**
     * @return {boolean}
     */
    isEmpty() {
        return this.queue.length === 0;
    }

    /**
     * @return {boolean}
     */
    isFull() {
        return this.queue.length === this.capacity;
    }
}
```

```csharp
public class MyCircularQueue {
    private List<int> q;
    private int k;

    public MyCircularQueue(int k) {
        this.k = k;
        q = new List<int>();
    }

    public bool EnQueue(int value) {
        if (q.Count == k) return false;
        q.Add(value);
        return true;
    }

    public bool DeQueue() {
        if (q.Count == 0) return false;
        q.RemoveAt(0);
        return true;
    }

    public int Front() {
        if (q.Count > 0) return q[0];
        return -1;
    }

    public int Rear() {
        if (q.Count > 0) return q[q.Count - 1];
        return -1;
    }

    public bool IsEmpty() {
        return q.Count == 0;
    }

    public bool IsFull() {
        return q.Count == k;
    }
}
```

```go
type MyCircularQueue struct {
    q []int
    k int
}

func Constructor(k int) MyCircularQueue {
    return MyCircularQueue{
        q: []int{},
        k: k,
    }
}

func (this *MyCircularQueue) EnQueue(value int) bool {
    if len(this.q) == this.k {
        return false
    }
    this.q = append(this.q, value)
    return true
}

func (this *MyCircularQueue) DeQueue() bool {
    if len(this.q) == 0 {
        return false
    }
    this.q = this.q[1:]
    return true
}

func (this *MyCircularQueue) Front() int {
    if len(this.q) > 0 {
        return this.q[0]
    }
    return -1
}

func (this *MyCircularQueue) Rear() int {
    if len(this.q) > 0 {
        return this.q[len(this.q)-1]
    }
    return -1
}

func (this *MyCircularQueue) IsEmpty() bool {
    return len(this.q) == 0
}

func (this *MyCircularQueue) IsFull() bool {
    return len(this.q) == this.k
}
```

```kotlin
class MyCircularQueue(k: Int) {
    private val q = mutableListOf<Int>()
    private val capacity = k

    fun enQueue(value: Int): Boolean {
        if (q.size == capacity) return false
        q.add(value)
        return true
    }

    fun deQueue(): Boolean {
        if (q.isEmpty()) return false
        q.removeAt(0)
        return true
    }

    fun Front(): Int {
        return if (q.isNotEmpty()) q[0] else -1
    }

    fun Rear(): Int {
        return if (q.isNotEmpty()) q[q.size - 1] else -1
    }

    fun isEmpty(): Boolean {
        return q.isEmpty()
    }

    fun isFull(): Boolean {
        return q.size == capacity
    }
}
```

```swift
class MyCircularQueue {
    private var q: [Int]
    private var k: Int

    init(_ k: Int) {
        self.q = []
        self.k = k
    }

    func enQueue(_ value: Int) -> Bool {
        if q.count == k {
            return false
        }
        q.append(value)
        return true
    }

    func deQueue() -> Bool {
        if q.isEmpty {
            return false
        }
        q.removeFirst()
        return true
    }

    func Front() -> Int {
        return q.isEmpty ? -1 : q[0]
    }

    func Rear() -> Int {
        return q.isEmpty ? -1 : q[q.count - 1]
    }

    func isEmpty() -> Bool {
        return q.isEmpty
    }

    func isFull() -> Bool {
        return q.count == k
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $enQueue()$, $Front()$, $Rear()$, $isEmpty()$ and $isFull()$ function calls.
    - $O(n)$ time for each $deQueue()$ function call.
- Space complexity: $O(n)$

> Where $n$ is the size of the queue.

---

## 2. Array

### Intuition
To achieve O(1) operations, we use a fixed-size array with two pointers: `front` pointing to the first element and `rear` pointing to the last. The "circular" aspect comes from using modulo arithmetic so that when we reach the end of the array, we wrap around to the beginning. We track the current size separately to distinguish between empty and full states.

### Algorithm
1. Initialize an array of size `k`, set `front = 0`, `rear = -1`, and `size = 0`.
2. For `enQueue(value)`: If full, return `false`. Otherwise, compute `rear = (rear + 1) % k`, store the value at that index, increment `size`, and return `true`.
3. For `deQueue()`: If empty, return `false`. Otherwise, compute `front = (front + 1) % k`, decrement `size`, and return `true`.
4. For `Front()`: If empty, return `-1`. Otherwise, return `q[front]`.
5. For `Rear()`: If empty, return `-1`. Otherwise, return `q[rear]`.
6. For `isEmpty()`: Return `true` if `size` equals `0`.
7. For `isFull()`: Return `true` if `size` equals `k`.

::tabs-start

```python
class MyCircularQueue:

    def __init__(self, k: int):
        self.q = [0] * k
        self.k = k
        self.front = 0
        self.rear = -1
        self.size = 0

    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False
        self.rear = (self.rear + 1) % self.k
        self.q[self.rear] = value
        self.size += 1
        return True

    def deQueue(self) -> bool:
        if self.isEmpty():
            return False
        self.front = (self.front + 1) % self.k
        self.size -= 1
        return True

    def Front(self) -> int:
        if self.isEmpty():
            return -1
        return self.q[self.front]

    def Rear(self) -> int:
        if self.isEmpty():
            return -1
        return self.q[self.rear]

    def isEmpty(self) -> bool:
        return self.size == 0

    def isFull(self) -> bool:
        return self.size == self.k
```

```java
public class MyCircularQueue {
    private int[] queue;
    private int size;
    private int front;
    private int rear;

    public MyCircularQueue(int k) {
        queue = new int[k];
        size = 0;
        front = 0;
        rear = -1;
    }

    public boolean enQueue(int value) {
        if (isFull()) {
            return false;
        }
        rear = (rear + 1) % queue.length;
        queue[rear] = value;
        size++;
        return true;
    }

    public boolean deQueue() {
        if (isEmpty()) {
            return false;
        }
        front = (front + 1) % queue.length;
        size--;
        return true;
    }

    public int Front() {
        return isEmpty() ? -1 : queue[front];
    }

    public int Rear() {
        return isEmpty() ? -1 : queue[rear];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == queue.length;
    }
}
```

```cpp
class MyCircularQueue {
private:
    vector<int> queue;
    int size;
    int front;
    int rear;
    int capacity;

public:
    MyCircularQueue(int k) {
        queue = vector<int>(k);
        size = 0;
        front = 0;
        rear = -1;
        capacity = k;
    }

    bool enQueue(int value) {
        if (isFull()) {
            return false;
        }
        rear = (rear + 1) % capacity;
        queue[rear] = value;
        size++;
        return true;
    }

    bool deQueue() {
        if (isEmpty()) {
            return false;
        }
        front = (front + 1) % capacity;
        size--;
        return true;
    }

    int Front() {
        return isEmpty() ? -1 : queue[front];
    }

    int Rear() {
        return isEmpty() ? -1 : queue[rear];
    }

    bool isEmpty() {
        return size == 0;
    }

    bool isFull() {
        return size == capacity;
    }
};
```

```javascript
class MyCircularQueue {
    /**
     * @param {number} k
     */
    constructor(k) {
        this.queue = new Array(k);
        this.size = 0;
        this.front = 0;
        this.rear = -1;
        this.capacity = k;
    }

    /**
     * @param {number} value
     * @return {boolean}
     */
    enQueue(value) {
        if (this.isFull()) {
            return false;
        }
        this.rear = (this.rear + 1) % this.capacity;
        this.queue[this.rear] = value;
        this.size++;
        return true;
    }

    /**
     * @return {boolean}
     */
    deQueue() {
        if (this.isEmpty()) {
            return false;
        }
        this.front = (this.front + 1) % this.capacity;
        this.size--;
        return true;
    }

    /**
     * @return {number}
     */
    Front() {
        return this.isEmpty() ? -1 : this.queue[this.front];
    }

    /**
     * @return {number}
     */
    Rear() {
        return this.isEmpty() ? -1 : this.queue[this.rear];
    }

    /**
     * @return {boolean}
     */
    isEmpty() {
        return this.size === 0;
    }

    /**
     * @return {boolean}
     */
    isFull() {
        return this.size === this.capacity;
    }
}
```

```csharp
public class MyCircularQueue {
    private int[] q;
    private int k;
    private int front;
    private int rear;
    private int size;

    public MyCircularQueue(int k) {
        this.k = k;
        this.q = new int[k];
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }

    public bool EnQueue(int value) {
        if (IsFull()) return false;
        rear = (rear + 1) % k;
        q[rear] = value;
        size++;
        return true;
    }

    public bool DeQueue() {
        if (IsEmpty()) return false;
        front = (front + 1) % k;
        size--;
        return true;
    }

    public int Front() {
        if (IsEmpty()) return -1;
        return q[front];
    }

    public int Rear() {
        if (IsEmpty()) return -1;
        return q[rear];
    }

    public bool IsEmpty() {
        return size == 0;
    }

    public bool IsFull() {
        return size == k;
    }
}
```

```go
type MyCircularQueue struct {
    q        []int
    k        int
    front    int
    rear     int
    size     int
}

func Constructor(k int) MyCircularQueue {
    return MyCircularQueue{
        q:     make([]int, k),
        k:     k,
        front: 0,
        rear:  -1,
        size:  0,
    }
}

func (this *MyCircularQueue) EnQueue(value int) bool {
    if this.IsFull() {
        return false
    }
    this.rear = (this.rear + 1) % this.k
    this.q[this.rear] = value
    this.size++
    return true
}

func (this *MyCircularQueue) DeQueue() bool {
    if this.IsEmpty() {
        return false
    }
    this.front = (this.front + 1) % this.k
    this.size--
    return true
}

func (this *MyCircularQueue) Front() int {
    if this.IsEmpty() {
        return -1
    }
    return this.q[this.front]
}

func (this *MyCircularQueue) Rear() int {
    if this.IsEmpty() {
        return -1
    }
    return this.q[this.rear]
}

func (this *MyCircularQueue) IsEmpty() bool {
    return this.size == 0
}

func (this *MyCircularQueue) IsFull() bool {
    return this.size == this.k
}
```

```kotlin
class MyCircularQueue(k: Int) {
    private val q = IntArray(k)
    private val capacity = k
    private var front = 0
    private var rear = -1
    private var size = 0

    fun enQueue(value: Int): Boolean {
        if (isFull()) return false
        rear = (rear + 1) % capacity
        q[rear] = value
        size++
        return true
    }

    fun deQueue(): Boolean {
        if (isEmpty()) return false
        front = (front + 1) % capacity
        size--
        return true
    }

    fun Front(): Int {
        return if (isEmpty()) -1 else q[front]
    }

    fun Rear(): Int {
        return if (isEmpty()) -1 else q[rear]
    }

    fun isEmpty(): Boolean {
        return size == 0
    }

    fun isFull(): Boolean {
        return size == capacity
    }
}
```

```swift
class MyCircularQueue {
    private var q: [Int]
    private var k: Int
    private var front: Int
    private var rear: Int
    private var size: Int

    init(_ k: Int) {
        self.q = [Int](repeating: 0, count: k)
        self.k = k
        self.front = 0
        self.rear = -1
        self.size = 0
    }

    func enQueue(_ value: Int) -> Bool {
        if isFull() {
            return false
        }
        rear = (rear + 1) % k
        q[rear] = value
        size += 1
        return true
    }

    func deQueue() -> Bool {
        if isEmpty() {
            return false
        }
        front = (front + 1) % k
        size -= 1
        return true
    }

    func Front() -> Int {
        return isEmpty() ? -1 : q[front]
    }

    func Rear() -> Int {
        return isEmpty() ? -1 : q[rear]
    }

    func isEmpty() -> Bool {
        return size == 0
    }

    func isFull() -> Bool {
        return size == k
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ time for initialization.
    - $O(1)$ time for each $enQueue()$, $deQueue()$, $Front()$, $Rear()$, $isEmpty()$ and $isFull()$ function calls.
- Space complexity: $O(n)$

> Where $n$ is the size of the queue.

---

## 3. Doubly Linked List

### Intuition
A doubly linked list allows O(1) insertions and deletions at both ends. We use dummy head and tail nodes to simplify edge cases. New elements are inserted before the tail (at the rear), and elements are removed after the head (from the front). We track remaining space to know when the queue is full.

### Algorithm
1. Initialize dummy nodes `left` and `right` connected to each other, and set `space = k`.
2. For `enQueue(value)`: If full, return `false`. Create a new node, insert it between `right.prev` and `right`, decrement `space`, and return `true`.
3. For `deQueue()`: If empty, return `false`. Remove the node after `left` by updating pointers, increment `space`, and return `true`.
4. For `Front()`: If empty, return `-1`. Otherwise, return `left.next.val`.
5. For `Rear()`: If empty, return `-1`. Otherwise, return `right.prev.val`.
6. For `isEmpty()`: Return `true` if `left.next` equals `right`.
7. For `isFull()`: Return `true` if `space` equals `0`.

::tabs-start

```python
class ListNode:

    def __init__(self, val, nxt, prev):
        self.val, self.next, self.prev = val, nxt, prev

class MyCircularQueue:

    def __init__(self, k: int):
        self.space = k
        self.left = ListNode(0, None, None)
        self.right = ListNode(0, None, self.left)
        self.left.next = self.right

    def enQueue(self, value: int) -> bool:
        if self.isFull(): return False
        cur = ListNode(value, self.right, self.right.prev)
        self.right.prev.next = cur
        self.right.prev = cur
        self.space -= 1
        return True

    def deQueue(self) -> bool:
        if self.isEmpty(): return False
        self.left.next = self.left.next.next
        self.left.next.prev = self.left
        self.space += 1
        return True

    def Front(self) -> int:
        if self.isEmpty(): return -1
        return self.left.next.val

    def Rear(self) -> int:
        if self.isEmpty(): return -1
        return self.right.prev.val

    def isEmpty(self) -> bool:
        return self.left.next == self.right

    def isFull(self) -> bool:
        return self.space == 0
```

```java
class ListNode {
    int val;
    ListNode next, prev;

    ListNode(int val, ListNode next, ListNode prev) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}

public class MyCircularQueue {
    private int space;
    private ListNode left, right;

    public MyCircularQueue(int k) {
        space = k;
        left = new ListNode(0, null, null);
        right = new ListNode(0, null, left);
        left.next = right;
    }

    public boolean enQueue(int value) {
        if (isFull()) {
            return false;
        }
        ListNode cur = new ListNode(value, right, right.prev);
        right.prev.next = cur;
        right.prev = cur;
        space--;
        return true;
    }

    public boolean deQueue() {
        if (isEmpty()) {
            return false;
        }
        left.next = left.next.next;
        left.next.prev = left;
        space++;
        return true;
    }

    public int Front() {
        return isEmpty() ? -1 : left.next.val;
    }

    public int Rear() {
        return isEmpty() ? -1 : right.prev.val;
    }

    public boolean isEmpty() {
        return left.next == right;
    }

    public boolean isFull() {
        return space == 0;
    }
}
```

```cpp
class MyCircularQueue {
private:
    struct ListNode {
        int val;
        ListNode* next;
        ListNode* prev;
        ListNode(int v, ListNode* n = nullptr, ListNode* p = nullptr)
            : val(v), next(n), prev(p) {}
    };

    int space;
    ListNode* left;
    ListNode* right;

public:
    MyCircularQueue(int k) {
        space = k;
        left = new ListNode(0);
        right = new ListNode(0, nullptr, left);
        left->next = right;
    }

    bool enQueue(int value) {
        if (isFull()) return false;
        ListNode* cur = new ListNode(value, right, right->prev);
        right->prev->next = cur;
        right->prev = cur;
        space--;
        return true;
    }

    bool deQueue() {
        if (isEmpty()) return false;
        ListNode* tmp = left->next;
        left->next = left->next->next;
        left->next->prev = left;
        delete tmp;
        space++;
        return true;
    }

    int Front() {
        return isEmpty() ? -1 : left->next->val;
    }

    int Rear() {
        return isEmpty() ? -1 : right->prev->val;
    }

    bool isEmpty() {
        return left->next == right;
    }

    bool isFull() {
        return space == 0;
    }
};
```

```javascript
class ListNode {
    /**
     * @param {number} val
     * @param {ListNode} next
     * @param {ListNode} prev
     */
    constructor(val, next = null, prev = null) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}

class MyCircularQueue {
    /**
     * @param {number} k
     */
    constructor(k) {
        this.space = k;
        this.left = new ListNode(0);
        this.right = new ListNode(0, null, this.left);
        this.left.next = this.right;
    }

    /**
     * @param {number} value
     * @return {boolean}
     */
    enQueue(value) {
        if (this.isFull()) return false;
        const cur = new ListNode(value, this.right, this.right.prev);
        this.right.prev.next = cur;
        this.right.prev = cur;
        this.space--;
        return true;
    }

    /**
     * @return {boolean}
     */
    deQueue() {
        if (this.isEmpty()) return false;
        this.left.next = this.left.next.next;
        this.left.next.prev = this.left;
        this.space++;
        return true;
    }

    /**
     * @return {number}
     */
    Front() {
        return this.isEmpty() ? -1 : this.left.next.val;
    }

    /**
     * @return {number}
     */
    Rear() {
        return this.isEmpty() ? -1 : this.right.prev.val;
    }

    /**
     * @return {boolean}
     */
    isEmpty() {
        return this.left.next === this.right;
    }

    /**
     * @return {boolean}
     */
    isFull() {
        return this.space === 0;
    }
}
```

```csharp
public class ListNode {
    public int val;
    public ListNode next, prev;

    public ListNode(int val, ListNode next = null, ListNode prev = null) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}

public class MyCircularQueue {
    private int space;
    private ListNode left, right;

    public MyCircularQueue(int k) {
        space = k;
        left = new ListNode(0);
        right = new ListNode(0);
        left.next = right;
        right.prev = left;
    }

    public bool EnQueue(int value) {
        if (IsFull()) {
            return false;
        }
        ListNode cur = new ListNode(value, right, right.prev);
        right.prev.next = cur;
        right.prev = cur;
        space--;
        return true;
    }

    public bool DeQueue() {
        if (IsEmpty()) {
            return false;
        }
        left.next = left.next.next;
        left.next.prev = left;
        space++;
        return true;
    }

    public int Front() {
        return IsEmpty() ? -1 : left.next.val;
    }

    public int Rear() {
        return IsEmpty() ? -1 : right.prev.val;
    }

    public bool IsEmpty() {
        return left.next == right;
    }

    public bool IsFull() {
        return space == 0;
    }
}
```

```go
type ListNode struct {
    val  int
    next *ListNode
    prev *ListNode
}

type MyCircularQueue struct {
    space int
    left  *ListNode
    right *ListNode
}

func Constructor(k int) MyCircularQueue {
    left := &ListNode{val: 0}
    right := &ListNode{val: 0, prev: left}
    left.next = right
    return MyCircularQueue{
        space: k,
        left:  left,
        right: right,
    }
}

func (this *MyCircularQueue) EnQueue(value int) bool {
    if this.IsFull() {
        return false
    }
    cur := &ListNode{val: value, next: this.right, prev: this.right.prev}
    this.right.prev.next = cur
    this.right.prev = cur
    this.space--
    return true
}

func (this *MyCircularQueue) DeQueue() bool {
    if this.IsEmpty() {
        return false
    }
    this.left.next = this.left.next.next
    this.left.next.prev = this.left
    this.space++
    return true
}

func (this *MyCircularQueue) Front() int {
    if this.IsEmpty() {
        return -1
    }
    return this.left.next.val
}

func (this *MyCircularQueue) Rear() int {
    if this.IsEmpty() {
        return -1
    }
    return this.right.prev.val
}

func (this *MyCircularQueue) IsEmpty() bool {
    return this.left.next == this.right
}

func (this *MyCircularQueue) IsFull() bool {
    return this.space == 0
}
```

```kotlin
class ListNode(
    var `val`: Int,
    var next: ListNode? = null,
    var prev: ListNode? = null
)

class MyCircularQueue(k: Int) {
    private var space = k
    private val left = ListNode(0)
    private val right = ListNode(0)

    init {
        left.next = right
        right.prev = left
    }

    fun enQueue(value: Int): Boolean {
        if (isFull()) return false
        val cur = ListNode(value, right, right.prev)
        right.prev?.next = cur
        right.prev = cur
        space--
        return true
    }

    fun deQueue(): Boolean {
        if (isEmpty()) return false
        left.next = left.next?.next
        left.next?.prev = left
        space++
        return true
    }

    fun Front(): Int {
        return if (isEmpty()) -1 else left.next!!.`val`
    }

    fun Rear(): Int {
        return if (isEmpty()) -1 else right.prev!!.`val`
    }

    fun isEmpty(): Boolean {
        return left.next == right
    }

    fun isFull(): Boolean {
        return space == 0
    }
}
```

```swift
class ListNode {
    var val: Int
    var next: ListNode?
    var prev: ListNode?

    init(_ val: Int, _ next: ListNode? = nil, _ prev: ListNode? = nil) {
        self.val = val
        self.next = next
        self.prev = prev
    }
}

class MyCircularQueue {
    private var space: Int
    private var left: ListNode
    private var right: ListNode

    init(_ k: Int) {
        space = k
        left = ListNode(0)
        right = ListNode(0)
        left.next = right
        right.prev = left
    }

    func enQueue(_ value: Int) -> Bool {
        if isFull() {
            return false
        }
        let cur = ListNode(value, right, right.prev)
        right.prev?.next = cur
        right.prev = cur
        space -= 1
        return true
    }

    func deQueue() -> Bool {
        if isEmpty() {
            return false
        }
        left.next = left.next?.next
        left.next?.prev = left
        space += 1
        return true
    }

    func Front() -> Int {
        return isEmpty() ? -1 : left.next!.val
    }

    func Rear() -> Int {
        return isEmpty() ? -1 : right.prev!.val
    }

    func isEmpty() -> Bool {
        return left.next === right
    }

    func isFull() -> Bool {
        return space == 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ time for initialization.
    - $O(1)$ time for each $enQueue()$, $deQueue()$, $Front()$, $Rear()$, $isEmpty()$ and $isFull()$ function calls.
- Space complexity: $O(n)$

> Where $n$ is the size of the queue.

---

## 4. Singly Linked List

### Intuition
A singly linked list can also work, using less memory per node than a doubly linked list. We maintain a dummy head node and a pointer to the actual tail. New elements are added at the tail, and elements are removed from the front (after the dummy head). The only complication is updating the tail pointer when the queue becomes empty.

### Algorithm
1. Initialize a dummy node `left`, set `right = left`, and set `space = k`.
2. For `enQueue(value)`: If full, return `false`. Create a new node. If empty, set it as `left.next` and `right`. Otherwise, link it after `right` and update `right`. Decrement `space` and return `true`.
3. For `deQueue()`: If empty, return `false`. Remove `left.next` by updating `left.next` to `left.next.next`. If `left.next` becomes `null`, reset `right = left`. Increment `space` and return `true`.
4. For `Front()`: If empty, return `-1`. Otherwise, return `left.next.val`.
5. For `Rear()`: If empty, return `-1`. Otherwise, return `right.val`.
6. For `isEmpty()`: Return `true` if `left.next` is `null`.
7. For `isFull()`: Return `true` if `space` equals `0`.

::tabs-start

```python
class ListNode:
    def __init__(self, val, nxt=None):
        self.val = val
        self.next = nxt

class MyCircularQueue:
    def __init__(self, k: int):
        self.space = k
        self.left = ListNode(0)
        self.right = self.left

    def enQueue(self, value: int) -> bool:
        if self.isFull(): return False

        cur = ListNode(value)
        if self.isEmpty():
            self.left.next = cur
            self.right = cur
        else:
            self.right.next = cur
            self.right = cur

        self.space -= 1
        return True

    def deQueue(self) -> bool:
        if self.isEmpty(): return False

        self.left.next = self.left.next.next
        if self.left.next is None:
            self.right = self.left

        self.space += 1
        return True

    def Front(self) -> int:
        if self.isEmpty(): return -1
        return self.left.next.val

    def Rear(self) -> int:
        if self.isEmpty(): return -1
        return self.right.val

    def isEmpty(self) -> bool:
        return self.left.next is None

    def isFull(self) -> bool:
        return self.space == 0
```

```java
class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}

public class MyCircularQueue {
    private int space;
    private ListNode left;
    private ListNode right;

    public MyCircularQueue(int k) {
        this.space = k;
        this.left = new ListNode(0);
        this.right = this.left;
    }

    public boolean enQueue(int value) {
        if (isFull()) return false;

        ListNode cur = new ListNode(value);
        if (isEmpty()) {
            this.left.next = cur;
            this.right = cur;
        } else {
            this.right.next = cur;
            this.right = cur;
        }

        this.space--;
        return true;
    }

    public boolean deQueue() {
        if (isEmpty()) return false;

        this.left.next = this.left.next.next;
        if (this.left.next == null) {
            this.right = this.left;
        }

        this.space++;
        return true;
    }

    public int Front() {
        return isEmpty() ? -1 : this.left.next.val;
    }

    public int Rear() {
        return isEmpty() ? -1 : this.right.val;
    }

    public boolean isEmpty() {
        return this.left.next == null;
    }

    public boolean isFull() {
        return this.space == 0;
    }
}
```

```cpp
class MyCircularQueue {
private:
    struct ListNode {
        int val;
        ListNode* next;
        ListNode(int v) : val(v), next(nullptr) {}
    };

    int space;
    ListNode* left;
    ListNode* right;

public:
    MyCircularQueue(int k) {
        space = k;
        left = new ListNode(0);
        right = left;
    }

    bool enQueue(int value) {
        if (isFull()) return false;

        ListNode* cur = new ListNode(value);
        if (isEmpty()) {
            left->next = cur;
            right = cur;
        } else {
            right->next = cur;
            right = cur;
        }

        space--;
        return true;
    }

    bool deQueue() {
        if (isEmpty()) return false;

        ListNode* tmp = left->next;
        left->next = left->next->next;
        delete tmp;
        if (!left->next) {
            right = left;
        }

        space++;
        return true;
    }

    int Front() {
        return isEmpty() ? -1 : left->next->val;
    }

    int Rear() {
        return isEmpty() ? -1 : right->val;
    }

    bool isEmpty() {
        return left->next == nullptr;
    }

    bool isFull() {
        return space == 0;
    }
};
```

```javascript
class ListNode {
    /**
     * @param {number} val
     * @param {ListNode} next
     */
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

class MyCircularQueue {
    /**
     * @param {number} k
     */
    constructor(k) {
        this.space = k;
        this.left = new ListNode(0);
        this.right = this.left;
    }

    /**
     * @param {number} value
     * @return {boolean}
     */
    enQueue(value) {
        if (this.isFull()) return false;

        const cur = new ListNode(value);
        if (this.isEmpty()) {
            this.left.next = cur;
            this.right = cur;
        } else {
            this.right.next = cur;
            this.right = cur;
        }

        this.space--;
        return true;
    }

    /**
     * @return {boolean}
     */
    deQueue() {
        if (this.isEmpty()) return false;

        this.left.next = this.left.next.next;
        if (!this.left.next) {
            this.right = this.left;
        }

        this.space++;
        return true;
    }

    /**
     * @return {number}
     */
    Front() {
        return this.isEmpty() ? -1 : this.left.next.val;
    }

    /**
     * @return {number}
     */
    Rear() {
        return this.isEmpty() ? -1 : this.right.val;
    }

    /**
     * @return {boolean}
     */
    isEmpty() {
        return this.left.next === null;
    }

    /**
     * @return {boolean}
     */
    isFull() {
        return this.space === 0;
    }
}
```

```csharp
public class ListNode {
    public int val;
    public ListNode next;

    public ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}

public class MyCircularQueue {
    private int space;
    private ListNode left;
    private ListNode right;

    public MyCircularQueue(int k) {
        this.space = k;
        this.left = new ListNode(0);
        this.right = this.left;
    }

    public bool EnQueue(int value) {
        if (IsFull()) return false;

        ListNode cur = new ListNode(value);
        if (IsEmpty()) {
            this.left.next = cur;
            this.right = cur;
        } else {
            this.right.next = cur;
            this.right = cur;
        }

        this.space--;
        return true;
    }

    public bool DeQueue() {
        if (IsEmpty()) return false;

        this.left.next = this.left.next.next;
        if (this.left.next == null) {
            this.right = this.left;
        }

        this.space++;
        return true;
    }

    public int Front() {
        return IsEmpty() ? -1 : this.left.next.val;
    }

    public int Rear() {
        return IsEmpty() ? -1 : this.right.val;
    }

    public bool IsEmpty() {
        return this.left.next == null;
    }

    public bool IsFull() {
        return this.space == 0;
    }
}
```

```go
type ListNode struct {
    val  int
    next *ListNode
}

type MyCircularQueue struct {
    space int
    left  *ListNode
    right *ListNode
}

func Constructor(k int) MyCircularQueue {
    left := &ListNode{val: 0}
    return MyCircularQueue{
        space: k,
        left:  left,
        right: left,
    }
}

func (this *MyCircularQueue) EnQueue(value int) bool {
    if this.IsFull() {
        return false
    }

    cur := &ListNode{val: value}
    if this.IsEmpty() {
        this.left.next = cur
        this.right = cur
    } else {
        this.right.next = cur
        this.right = cur
    }

    this.space--
    return true
}

func (this *MyCircularQueue) DeQueue() bool {
    if this.IsEmpty() {
        return false
    }

    this.left.next = this.left.next.next
    if this.left.next == nil {
        this.right = this.left
    }

    this.space++
    return true
}

func (this *MyCircularQueue) Front() int {
    if this.IsEmpty() {
        return -1
    }
    return this.left.next.val
}

func (this *MyCircularQueue) Rear() int {
    if this.IsEmpty() {
        return -1
    }
    return this.right.val
}

func (this *MyCircularQueue) IsEmpty() bool {
    return this.left.next == nil
}

func (this *MyCircularQueue) IsFull() bool {
    return this.space == 0
}
```

```kotlin
class ListNode(var `val`: Int) {
    var next: ListNode? = null
}

class MyCircularQueue(k: Int) {
    private var space = k
    private val left = ListNode(0)
    private var right = left

    fun enQueue(value: Int): Boolean {
        if (isFull()) return false

        val cur = ListNode(value)
        if (isEmpty()) {
            left.next = cur
            right = cur
        } else {
            right.next = cur
            right = cur
        }

        space--
        return true
    }

    fun deQueue(): Boolean {
        if (isEmpty()) return false

        left.next = left.next?.next
        if (left.next == null) {
            right = left
        }

        space++
        return true
    }

    fun Front(): Int {
        return if (isEmpty()) -1 else left.next!!.`val`
    }

    fun Rear(): Int {
        return if (isEmpty()) -1 else right.`val`
    }

    fun isEmpty(): Boolean {
        return left.next == null
    }

    fun isFull(): Boolean {
        return space == 0
    }
}
```

```swift
class ListNode {
    var val: Int
    var next: ListNode?

    init(_ val: Int) {
        self.val = val
        self.next = nil
    }
}

class MyCircularQueue {
    private var space: Int
    private var left: ListNode
    private var right: ListNode

    init(_ k: Int) {
        space = k
        left = ListNode(0)
        right = left
    }

    func enQueue(_ value: Int) -> Bool {
        if isFull() {
            return false
        }

        let cur = ListNode(value)
        if isEmpty() {
            left.next = cur
            right = cur
        } else {
            right.next = cur
            right = cur
        }

        space -= 1
        return true
    }

    func deQueue() -> Bool {
        if isEmpty() {
            return false
        }

        left.next = left.next?.next
        if left.next == nil {
            right = left
        }

        space += 1
        return true
    }

    func Front() -> Int {
        return isEmpty() ? -1 : left.next!.val
    }

    func Rear() -> Int {
        return isEmpty() ? -1 : right.val
    }

    func isEmpty() -> Bool {
        return left.next == nil
    }

    func isFull() -> Bool {
        return space == 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ time for initialization.
    - $O(1)$ time for each $enQueue()$, $deQueue()$, $Front()$, $Rear()$, $isEmpty()$ and $isFull()$ function calls.
- Space complexity: $O(n)$

> Where $n$ is the size of the queue.
