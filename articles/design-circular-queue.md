## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ time for initialization.
    - $O(1)$ time for each $enQueue()$, $deQueue()$, $Front()$, $Rear()$, $isEmpty()$ and $isFull()$ function calls.
- Space complexity: $O(n)$

> Where $n$ is the size of the queue.

---

## 3. Doubly Linked List

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ time for initialization.
    - $O(1)$ time for each $enQueue()$, $deQueue()$, $Front()$, $Rear()$, $isEmpty()$ and $isFull()$ function calls.
- Space complexity: $O(n)$

> Where $n$ is the size of the queue.

---

## 4. Singly Linked List

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ time for initialization.
    - $O(1)$ time for each $enQueue()$, $deQueue()$, $Front()$, $Rear()$, $isEmpty()$ and $isFull()$ function calls.
- Space complexity: $O(n)$

> Where $n$ is the size of the queue.
