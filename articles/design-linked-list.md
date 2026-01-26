## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Linked List Fundamentals** - Understanding nodes with value and next/prev pointers
- **Pointer Manipulation** - Rewiring node connections for insertion and deletion
- **Dummy/Sentinel Nodes** - Using placeholder nodes to simplify edge cases at list boundaries

---

## 1. Singly Linked List

### Intuition
A singly linked list stores elements in nodes where each node points to the next one. We use a dummy head node to simplify edge cases like inserting at the beginning or deleting the first element. The dummy head always exists, so we never have to handle a null head pointer. We also track the size to quickly validate indices without traversing the entire list.

### Algorithm
1. **Initialization:** Create a dummy head node and set size to `0`.
2. **get(index):** If the index is out of bounds, return `-1`. Otherwise, start from the node after the dummy head and traverse `index` times, then return the value.
3. **addAtHead(val):** Create a new node, point it to the current first real node, and update the dummy head's next pointer to the new node. Increment size.
4. **addAtTail(val):** Traverse from the dummy head to the last node, then append the new node. Increment size.
5. **addAtIndex(index, val):** If index is greater than size, do nothing. Otherwise, traverse to the node just before the target position, insert the new node by adjusting pointers, and increment size.
6. **deleteAtIndex(index):** If index is out of bounds, do nothing. Otherwise, traverse to the node before the target, skip over the target node by updating the next pointer, and decrement size.

::tabs-start

```python
class ListNode:
    def __init__(self, val: int):
        self.val = val
        self.next = None

class MyLinkedList:
    def __init__(self):
        self.head = ListNode(0)
        self.size = 0

    def get(self, index: int) -> int:
        if index >= self.size:
            return -1
        cur = self.head.next
        for _ in range(index):
            cur = cur.next
        return cur.val

    def addAtHead(self, val: int) -> None:
        node = ListNode(val)
        node.next = self.head.next
        self.head.next = node
        self.size += 1

    def addAtTail(self, val: int) -> None:
        node = ListNode(val)
        cur = self.head
        while cur.next:
            cur = cur.next
        cur.next = node
        self.size += 1

    def addAtIndex(self, index: int, val: int) -> None:
        if index > self.size:
            return
        cur = self.head
        for _ in range(index):
            cur = cur.next
        node = ListNode(val)
        node.next = cur.next
        cur.next = node
        self.size += 1

    def deleteAtIndex(self, index: int) -> None:
        if index >= self.size:
            return
        cur = self.head
        for _ in range(index):
            cur = cur.next
        cur.next = cur.next.next
        self.size -= 1
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

public class MyLinkedList {
    private ListNode head;
    private int size;
    MyLinkedList() {
        head = new ListNode(0);
        size = 0;
    }
    public int get(int index) {
        if (index >= size) return -1;
        ListNode cur = head.next;
        for (int i = 0; i < index; i++) {
            cur = cur.next;
        }
        return cur.val;
    }
    public void addAtHead(int val) {
        ListNode node = new ListNode(val);
        node.next = head.next;
        head.next = node;
        size++;
    }
    public void addAtTail(int val) {
        ListNode node = new ListNode(val);
        ListNode cur = head;
        while (cur.next != null) {
            cur = cur.next;
        }
        cur.next = node;
        size++;
    }
    public void addAtIndex(int index, int val) {
        if (index > size) return;
        ListNode cur = head;
        for (int i = 0; i < index; i++) {
            cur = cur.next;
        }
        ListNode node = new ListNode(val);
        node.next = cur.next;
        cur.next = node;
        size++;
    }
    public void deleteAtIndex(int index) {
        if (index >= size) return;
        ListNode cur = head;
        for (int i = 0; i < index; i++) {
            cur = cur.next;
        }
        cur.next = cur.next.next;
        size--;
    }
}
```

```cpp
class MyLinkedList {
    struct ListNode {
        int val;
        ListNode* next;
        ListNode(int val) : val(val), next(nullptr) {}
    };

public:
    ListNode* head;
    int size;
    MyLinkedList() {
        head = new ListNode(0);
        size = 0;
    }
    int get(int index) {
        if (index >= size) return -1;
        ListNode* cur = head->next;
        for (int i = 0; i < index; i++) {
            cur = cur->next;
        }
        return cur->val;
    }
    void addAtHead(int val) {
        ListNode* node = new ListNode(val);
        node->next = head->next;
        head->next = node;
        size++;
    }
    void addAtTail(int val) {
        ListNode* node = new ListNode(val);
        ListNode* cur = head;
        while (cur->next != nullptr) {
            cur = cur->next;
        }
        cur->next = node;
        size++;
    }
    void addAtIndex(int index, int val) {
        if (index > size) return;
        ListNode* cur = head;
        for (int i = 0; i < index; i++) {
            cur = cur->next;
        }
        ListNode* node = new ListNode(val);
        node->next = cur->next;
        cur->next = node;
        size++;
    }
    void deleteAtIndex(int index) {
        if (index >= size) return;
        ListNode* cur = head;
        for (int i = 0; i < index; i++) {
            cur = cur->next;
        }
        ListNode* temp = cur->next;
        cur->next = cur->next->next;
        delete temp;
        size--;
    }
};
```

```javascript
class ListNode {
    /**
     * @constructor
     * @param {number} val
     */
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class MyLinkedList {
    constructor() {
        this.head = new ListNode(0);
        this.size = 0;
    }

    /**
     * @param {number} index
     * @return {number}
     */
    get(index) {
        if (index >= this.size) return -1;
        let cur = this.head.next;
        for (let i = 0; i < index; i++) {
            cur = cur.next;
        }
        return cur.val;
    }

    /**
     * @param {number} val
     * @return {void}
     */
    addAtHead(val) {
        const node = new ListNode(val);
        node.next = this.head.next;
        this.head.next = node;
        this.size++;
    }

    /**
     * @param {number} val
     * @return {void}
     */
    addAtTail(val) {
        const node = new ListNode(val);
        let cur = this.head;
        while (cur.next !== null) {
            cur = cur.next;
        }
        cur.next = node;
        this.size++;
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    addAtIndex(index, val) {
        if (index > this.size) return;
        let cur = this.head;
        for (let i = 0; i < index; i++) {
            cur = cur.next;
        }
        const node = new ListNode(val);
        node.next = cur.next;
        cur.next = node;
        this.size++;
    }

    /**
     * @param {number} index
     * @return {void}
     */
    deleteAtIndex(index) {
        if (index >= this.size) return;
        let cur = this.head;
        for (let i = 0; i < index; i++) {
            cur = cur.next;
        }
        cur.next = cur.next.next;
        this.size--;
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

public class MyLinkedList {
    private ListNode head;
    private int size;

    public MyLinkedList() {
        head = new ListNode(0);
        size = 0;
    }

    public int Get(int index) {
        if (index >= size) return -1;
        ListNode cur = head.next;
        for (int i = 0; i < index; i++) {
            cur = cur.next;
        }
        return cur.val;
    }

    public void AddAtHead(int val) {
        ListNode node = new ListNode(val);
        node.next = head.next;
        head.next = node;
        size++;
    }

    public void AddAtTail(int val) {
        ListNode node = new ListNode(val);
        ListNode cur = head;
        while (cur.next != null) {
            cur = cur.next;
        }
        cur.next = node;
        size++;
    }

    public void AddAtIndex(int index, int val) {
        if (index > size) return;
        ListNode cur = head;
        for (int i = 0; i < index; i++) {
            cur = cur.next;
        }
        ListNode node = new ListNode(val);
        node.next = cur.next;
        cur.next = node;
        size++;
    }

    public void DeleteAtIndex(int index) {
        if (index >= size) return;
        ListNode cur = head;
        for (int i = 0; i < index; i++) {
            cur = cur.next;
        }
        cur.next = cur.next.next;
        size--;
    }
}
```

```go
type ListNode struct {
    val  int
    next *ListNode
}

type MyLinkedList struct {
    head *ListNode
    size int
}

func Constructor() MyLinkedList {
    return MyLinkedList{head: &ListNode{val: 0}, size: 0}
}

func (this *MyLinkedList) Get(index int) int {
    if index >= this.size {
        return -1
    }
    cur := this.head.next
    for i := 0; i < index; i++ {
        cur = cur.next
    }
    return cur.val
}

func (this *MyLinkedList) AddAtHead(val int) {
    node := &ListNode{val: val}
    node.next = this.head.next
    this.head.next = node
    this.size++
}

func (this *MyLinkedList) AddAtTail(val int) {
    node := &ListNode{val: val}
    cur := this.head
    for cur.next != nil {
        cur = cur.next
    }
    cur.next = node
    this.size++
}

func (this *MyLinkedList) AddAtIndex(index int, val int) {
    if index > this.size {
        return
    }
    cur := this.head
    for i := 0; i < index; i++ {
        cur = cur.next
    }
    node := &ListNode{val: val}
    node.next = cur.next
    cur.next = node
    this.size++
}

func (this *MyLinkedList) DeleteAtIndex(index int) {
    if index >= this.size {
        return
    }
    cur := this.head
    for i := 0; i < index; i++ {
        cur = cur.next
    }
    cur.next = cur.next.next
    this.size--
}
```

```kotlin
class ListNode(var `val`: Int) {
    var next: ListNode? = null
}

class MyLinkedList() {
    private val head = ListNode(0)
    private var size = 0

    fun get(index: Int): Int {
        if (index >= size) return -1
        var cur = head.next
        for (i in 0 until index) {
            cur = cur?.next
        }
        return cur?.`val` ?: -1
    }

    fun addAtHead(`val`: Int) {
        val node = ListNode(`val`)
        node.next = head.next
        head.next = node
        size++
    }

    fun addAtTail(`val`: Int) {
        val node = ListNode(`val`)
        var cur: ListNode? = head
        while (cur?.next != null) {
            cur = cur.next
        }
        cur?.next = node
        size++
    }

    fun addAtIndex(index: Int, `val`: Int) {
        if (index > size) return
        var cur: ListNode? = head
        for (i in 0 until index) {
            cur = cur?.next
        }
        val node = ListNode(`val`)
        node.next = cur?.next
        cur?.next = node
        size++
    }

    fun deleteAtIndex(index: Int) {
        if (index >= size) return
        var cur: ListNode? = head
        for (i in 0 until index) {
            cur = cur?.next
        }
        cur?.next = cur?.next?.next
        size--
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

class MyLinkedList {
    private var head: ListNode
    private var size: Int

    init() {
        head = ListNode(0)
        size = 0
    }

    func get(_ index: Int) -> Int {
        if index >= size { return -1 }
        var cur = head.next
        for _ in 0..<index {
            cur = cur?.next
        }
        return cur!.val
    }

    func addAtHead(_ val: Int) {
        let node = ListNode(val)
        node.next = head.next
        head.next = node
        size += 1
    }

    func addAtTail(_ val: Int) {
        let node = ListNode(val)
        var cur: ListNode? = head
        while cur?.next != nil {
            cur = cur?.next
        }
        cur?.next = node
        size += 1
    }

    func addAtIndex(_ index: Int, _ val: Int) {
        if index > size { return }
        var cur: ListNode? = head
        for _ in 0..<index {
            cur = cur?.next
        }
        let node = ListNode(val)
        node.next = cur?.next
        cur?.next = node
        size += 1
    }

    func deleteAtIndex(_ index: Int) {
        if index >= size { return }
        var cur: ListNode? = head
        for _ in 0..<index {
            cur = cur?.next
        }
        cur?.next = cur?.next?.next
        size -= 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for $addAtHead()$.
    - $O(n)$ time for $get()$, $addAtTail()$, $addAtIndex()$, $deleteAtIndex()$.
- Space complexity: $O(n)$

---

## 2. Singly Linked List (Optimal)

### Intuition
This approach refactors the singly linked list by introducing a helper function `getPrev(index)` that returns the node immediately before the target index. Since insertion and deletion both require access to the predecessor node, centralizing this logic reduces code duplication. The `addAtHead()` and `addAtTail()` operations now simply call `addAtIndex()`, making the implementation cleaner and easier to maintain.

### Algorithm
1. **Initialization:** Create a dummy head node and set size to `0`.
2. **getPrev(index):** Starting from the dummy head, traverse `index` steps and return that node.
3. **get(index):** If out of bounds, return `-1`. Otherwise, call `getPrev(index)` and return the value of its next node.
4. **addAtHead(val):** Call `addAtIndex(0, val)`.
5. **addAtTail(val):** Call `addAtIndex(size, val)`.
6. **addAtIndex(index, val):** If index is greater than size, return. Get the predecessor using `getPrev(index)`, create a new node pointing to the predecessor's next, and update the predecessor's next to the new node. Increment size.
7. **deleteAtIndex(index):** If out of bounds, return. Get the predecessor using `getPrev(index)` and skip over the target node. Decrement size.

::tabs-start

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class MyLinkedList:
    def __init__(self):
        self.head = ListNode(0)
        self.size = 0

    def getPrev(self, index: int) -> ListNode:
        cur = self.head
        for _ in range(index):
            cur = cur.next
        return cur

    def get(self, index: int) -> int:
        if index >= self.size:
            return -1
        return self.getPrev(index).next.val

    def addAtHead(self, val: int) -> None:
        self.addAtIndex(0, val)

    def addAtTail(self, val: int) -> None:
        self.addAtIndex(self.size, val)

    def addAtIndex(self, index: int, val: int) -> None:
        if index > self.size:
            return
        prev = self.getPrev(index)
        node = ListNode(val, prev.next)
        prev.next = node
        self.size += 1

    def deleteAtIndex(self, index: int) -> None:
        if index >= self.size:
            return
        prev = self.getPrev(index)
        prev.next = prev.next.next
        self.size -= 1
```

```java
class ListNode {
    int val;
    ListNode next;
    ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }
    ListNode(int val) {
        this(val, null);
    }
}

public class MyLinkedList {
    ListNode head;
    int size;

    public MyLinkedList() {
        head = new ListNode(0, null);
        size = 0;
    }

    private ListNode getPrev(int index) {
        ListNode cur = head;
        for (int i = 0; i < index; i++) {
            cur = cur.next;
        }
        return cur;
    }

    public int get(int index) {
        if (index >= size) {
            return -1;
        }
        return getPrev(index).next.val;
    }

    public void addAtHead(int val) {
        addAtIndex(0, val);
    }

    public void addAtTail(int val) {
        addAtIndex(size, val);
    }

    public void addAtIndex(int index, int val) {
        if (index > size) {
            return;
        }
        ListNode prev = getPrev(index);
        ListNode node = new ListNode(val, prev.next);
        prev.next = node;
        size++;
    }

    public void deleteAtIndex(int index) {
        if (index >= size) {
            return;
        }
        ListNode prev = getPrev(index);
        prev.next = prev.next.next;
        size--;
    }
}
```

```cpp

class MyLinkedList {
    struct ListNode {
        int val;
        ListNode* next;
        ListNode(int val, ListNode* next) : val(val), next(next) {}
        ListNode(int val) : val(val), next(nullptr) {}
    };

public:
    MyLinkedList() {
        head = new ListNode(0, nullptr);
        size = 0;
    }

    int get(int index) {
        if (index >= size) return -1;
        return getPrev(index)->next->val;
    }

    void addAtHead(int val) {
        addAtIndex(0, val);
    }

    void addAtTail(int val) {
        addAtIndex(size, val);
    }

    void addAtIndex(int index, int val) {
        if (index > size) return;
        ListNode* prev = getPrev(index);
        ListNode* node = new ListNode(val, prev->next);
        prev->next = node;
        size++;
    }

    void deleteAtIndex(int index) {
        if (index >= size) return;
        ListNode* prev = getPrev(index);
        ListNode* toDelete = prev->next;
        prev->next = prev->next->next;
        delete toDelete;
        size--;
    }

private:
    ListNode* head;
    int size;

    ListNode* getPrev(int index) {
        ListNode* cur = head;
        for (int i = 0; i < index; i++) {
            cur = cur->next;
        }
        return cur;
    }
};
```

```javascript
class ListNode {
    /**
     * @constructor
     * @param {number}
     * @param {ListNode|null}
     */
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

class MyLinkedList {
    constructor() {
        this.head = new ListNode(0);
        this.size = 0;
    }

    /**
     * @param {number} index
     * @return {ListNode}
     */
    getPrev(index) {
        let cur = this.head;
        for (let i = 0; i < index; i++) {
            cur = cur.next;
        }
        return cur;
    }

    /**
     * @param {number} index
     * @return {number}
     */
    get(index) {
        if (index >= this.size) {
            return -1;
        }
        return this.getPrev(index).next.val;
    }

    /**
     * @param {number} val
     * @return {void}
     */
    addAtHead(val) {
        this.addAtIndex(0, val);
    }

    /**
     * @param {number} val
     * @return {void}
     */
    addAtTail(val) {
        this.addAtIndex(this.size, val);
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    addAtIndex(index, val) {
        if (index > this.size) {
            return;
        }
        let prev = this.getPrev(index);
        let node = new ListNode(val, prev.next);
        prev.next = node;
        this.size++;
    }

    /**
     * @param {number} index
     * @return {void}
     */
    deleteAtIndex(index) {
        if (index >= this.size) {
            return;
        }
        let prev = this.getPrev(index);
        prev.next = prev.next.next;
        this.size--;
    }
}
```

```csharp
public class ListNode {
    public int val;
    public ListNode next;
    public ListNode(int val, ListNode next = null) {
        this.val = val;
        this.next = next;
    }
}

public class MyLinkedList {
    private ListNode head;
    private int size;

    public MyLinkedList() {
        head = new ListNode(0, null);
        size = 0;
    }

    private ListNode GetPrev(int index) {
        ListNode cur = head;
        for (int i = 0; i < index; i++) {
            cur = cur.next;
        }
        return cur;
    }

    public int Get(int index) {
        if (index >= size) return -1;
        return GetPrev(index).next.val;
    }

    public void AddAtHead(int val) {
        AddAtIndex(0, val);
    }

    public void AddAtTail(int val) {
        AddAtIndex(size, val);
    }

    public void AddAtIndex(int index, int val) {
        if (index > size) return;
        ListNode prev = GetPrev(index);
        ListNode node = new ListNode(val, prev.next);
        prev.next = node;
        size++;
    }

    public void DeleteAtIndex(int index) {
        if (index >= size) return;
        ListNode prev = GetPrev(index);
        prev.next = prev.next.next;
        size--;
    }
}
```

```go
type ListNode struct {
    val  int
    next *ListNode
}

type MyLinkedList struct {
    head *ListNode
    size int
}

func Constructor() MyLinkedList {
    return MyLinkedList{head: &ListNode{val: 0}, size: 0}
}

func (this *MyLinkedList) getPrev(index int) *ListNode {
    cur := this.head
    for i := 0; i < index; i++ {
        cur = cur.next
    }
    return cur
}

func (this *MyLinkedList) Get(index int) int {
    if index >= this.size {
        return -1
    }
    return this.getPrev(index).next.val
}

func (this *MyLinkedList) AddAtHead(val int) {
    this.AddAtIndex(0, val)
}

func (this *MyLinkedList) AddAtTail(val int) {
    this.AddAtIndex(this.size, val)
}

func (this *MyLinkedList) AddAtIndex(index int, val int) {
    if index > this.size {
        return
    }
    prev := this.getPrev(index)
    node := &ListNode{val: val, next: prev.next}
    prev.next = node
    this.size++
}

func (this *MyLinkedList) DeleteAtIndex(index int) {
    if index >= this.size {
        return
    }
    prev := this.getPrev(index)
    prev.next = prev.next.next
    this.size--
}
```

```kotlin
class ListNode(var `val`: Int = 0, var next: ListNode? = null)

class MyLinkedList() {
    private val head = ListNode(0, null)
    private var size = 0

    private fun getPrev(index: Int): ListNode {
        var cur: ListNode = head
        for (i in 0 until index) {
            cur = cur.next!!
        }
        return cur
    }

    fun get(index: Int): Int {
        if (index >= size) return -1
        return getPrev(index).next!!.`val`
    }

    fun addAtHead(`val`: Int) {
        addAtIndex(0, `val`)
    }

    fun addAtTail(`val`: Int) {
        addAtIndex(size, `val`)
    }

    fun addAtIndex(index: Int, `val`: Int) {
        if (index > size) return
        val prev = getPrev(index)
        val node = ListNode(`val`, prev.next)
        prev.next = node
        size++
    }

    fun deleteAtIndex(index: Int) {
        if (index >= size) return
        val prev = getPrev(index)
        prev.next = prev.next?.next
        size--
    }
}
```

```swift
class ListNode {
    var val: Int
    var next: ListNode?

    init(_ val: Int = 0, _ next: ListNode? = nil) {
        self.val = val
        self.next = next
    }
}

class MyLinkedList {
    private var head: ListNode
    private var size: Int

    init() {
        head = ListNode(0)
        size = 0
    }

    private func getPrev(_ index: Int) -> ListNode {
        var cur = head
        for _ in 0..<index {
            cur = cur.next!
        }
        return cur
    }

    func get(_ index: Int) -> Int {
        if index >= size { return -1 }
        return getPrev(index).next!.val
    }

    func addAtHead(_ val: Int) {
        addAtIndex(0, val)
    }

    func addAtTail(_ val: Int) {
        addAtIndex(size, val)
    }

    func addAtIndex(_ index: Int, _ val: Int) {
        if index > size { return }
        let prev = getPrev(index)
        let node = ListNode(val, prev.next)
        prev.next = node
        size += 1
    }

    func deleteAtIndex(_ index: Int) {
        if index >= size { return }
        let prev = getPrev(index)
        prev.next = prev.next?.next
        size -= 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for $addAtHead()$.
    - $O(n)$ time for $get()$, $addAtTail()$, $addAtIndex()$, $deleteAtIndex()$.
- Space complexity: $O(n)$

---

## 3. Doubly Linked List

### Intuition
A doubly linked list adds a `prev` pointer to each node, allowing traversal in both directions. We use two sentinel nodes: a dummy head and a dummy tail. These sentinels eliminate `null` checks when inserting or deleting at the boundaries. Any real node is always between the head and tail sentinels, so insertion and deletion operations become symmetric and straightforward.

### Algorithm
1. **Initialization:** Create dummy head and tail nodes. Link head's next to tail and tail's prev to head.
2. **get(index):** Start from the first real node (head's next) and traverse until the index is reached or the tail is hit. Return the value if valid, otherwise return `-1`.
3. **addAtHead(val):** Create a new node. Set its next to head's current next and its prev to head. Update the neighboring pointers to include the new node.
4. **addAtTail(val):** Create a new node. Set its prev to tail's current prev and its next to tail. Update the neighboring pointers accordingly.
5. **addAtIndex(index, val):** Traverse to the node currently at that index. Insert the new node just before it by updating prev and next pointers on both sides.
6. **deleteAtIndex(index):** Traverse to the target node. Connect its prev and next neighbors directly, removing the target from the list.

::tabs-start

```python
class ListNode:
    def __init__(self, val):
        self.val = val
        self.prev = None
        self.next = None

class MyLinkedList:

    def __init__(self):
        self.head = ListNode(0)
        self.tail = ListNode(0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, index: int) -> int:
        cur = self.head.next
        while cur and index > 0:
            cur = cur.next
            index -= 1
        if cur and cur != self.tail and index == 0:
            return cur.val
        return -1

    def addAtHead(self, val: int) -> None:
        node, next, prev = ListNode(val), self.head.next, self.head
        prev.next = node
        next.prev = node
        node.next = next
        node.prev = prev

    def addAtTail(self, val: int) -> None:
        node, next, prev = ListNode(val), self.tail, self.tail.prev
        prev.next = node
        next.prev = node
        node.next = next
        node.prev = prev

    def addAtIndex(self, index: int, val: int) -> None:
        cur = self.head.next
        while cur and index > 0:
            cur = cur.next
            index -= 1
        if cur and index == 0:
            node, next, prev = ListNode(val), cur, cur.prev
            prev.next = node
            next.prev = node
            node.next = next
            node.prev = prev


    def deleteAtIndex(self, index: int) -> None:
        cur = self.head.next
        while cur and index > 0:
            cur = cur.next
            index -= 1
        if cur and cur != self.tail and index == 0:
            next, prev = cur.next, cur.prev
            next.prev = prev
            prev.next = next
```

```java
class ListNode {
    int val;
    ListNode prev;
    ListNode next;

    ListNode(int val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

public class MyLinkedList {
    ListNode head;
    ListNode tail;

    MyLinkedList() {
        head = new ListNode(0);
        tail = new ListNode(0);
        head.next = tail;
        tail.prev = head;
    }

    int get(int index) {
        ListNode cur = head.next;
        while (cur != null && index > 0) {
            cur = cur.next;
            index--;
        }
        if (cur != null && cur != tail && index == 0) {
            return cur.val;
        }
        return -1;
    }

    void addAtHead(int val) {
        ListNode node = new ListNode(val);
        ListNode next = head.next;
        ListNode prev = head;
        prev.next = node;
        next.prev = node;
        node.next = next;
        node.prev = prev;
    }

    void addAtTail(int val) {
        ListNode node = new ListNode(val);
        ListNode next = tail;
        ListNode prev = tail.prev;
        prev.next = node;
        next.prev = node;
        node.next = next;
        node.prev = prev;
    }

    void addAtIndex(int index, int val) {
        ListNode cur = head.next;
        while (cur != null && index > 0) {
            cur = cur.next;
            index--;
        }
        if (cur != null && index == 0) {
            ListNode node = new ListNode(val);
            ListNode next = cur;
            ListNode prev = cur.prev;
            prev.next = node;
            next.prev = node;
            node.next = next;
            node.prev = prev;
        }
    }

    void deleteAtIndex(int index) {
        ListNode cur = head.next;
        while (cur != null && index > 0) {
            cur = cur.next;
            index--;
        }
        if (cur != null && cur != tail && index == 0) {
            ListNode next = cur.next;
            ListNode prev = cur.prev;
            next.prev = prev;
            prev.next = next;
        }
    }
}
```

```cpp
class MyLinkedList {
    struct ListNode {
        int val;
        ListNode* prev;
        ListNode* next;
        ListNode(int val) : val(val), prev(nullptr), next(nullptr) {}
    };
public:
	ListNode* head;
	ListNode* tail;

	MyLinkedList() {
		head = new ListNode(0);
		tail = new ListNode(0);
		head->next = tail;
		tail->prev = head;
	}

	int get(int index) {
		ListNode* cur = head->next;
		while (cur && index > 0) {
			cur = cur->next;
			index--;
		}
		if (cur && cur != tail && index == 0) {
			return cur->val;
		}
		return -1;
	}

	void addAtHead(int val) {
		ListNode* node = new ListNode(val);
		ListNode* next = head->next;
		ListNode* prev = head;
		prev->next = node;
		next->prev = node;
		node->next = next;
		node->prev = prev;
	}

	void addAtTail(int val) {
		ListNode* node = new ListNode(val);
		ListNode* next = tail;
		ListNode* prev = tail->prev;
		prev->next = node;
		next->prev = node;
		node->next = next;
		node->prev = prev;
	}

	void addAtIndex(int index, int val) {
		ListNode* cur = head->next;
		while (cur && index > 0) {
			cur = cur->next;
			index--;
		}
		if (cur && index == 0) {
			ListNode* node = new ListNode(val);
			ListNode* next = cur;
			ListNode* prev = cur->prev;
			prev->next = node;
			next->prev = node;
			node->next = next;
			node->prev = prev;
		}
	}

	void deleteAtIndex(int index) {
		ListNode* cur = head->next;
		while (cur && index > 0) {
			cur = cur->next;
			index--;
		}
		if (cur && cur != tail && index == 0) {
			ListNode* next = cur->next;
			ListNode* prev = cur->prev;
			next->prev = prev;
			prev->next = next;
			delete cur;
		}
	}
};
```

```javascript
class ListNode {
    /**
     * @constructor
     * @param {number} val
     */
    constructor(val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class MyLinkedList {
    constructor() {
        this.head = new ListNode(0);
        this.tail = new ListNode(0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * @param {number} index
     * @return {number}
     */
    get(index) {
        let cur = this.head.next;
        while (cur && index > 0) {
            cur = cur.next;
            index--;
        }
        if (cur && cur !== this.tail && index === 0) {
            return cur.val;
        }
        return -1;
    }

    /**
     * @param {number} val
     * @return {void}
     */
    addAtHead(val) {
        const node = new ListNode(val);
        const next = this.head.next;
        const prev = this.head;
        prev.next = node;
        next.prev = node;
        node.next = next;
        node.prev = prev;
    }

    /**
     * @param {number} val
     * @return {void}
     */
    addAtTail(val) {
        const node = new ListNode(val);
        const next = this.tail;
        const prev = this.tail.prev;
        prev.next = node;
        next.prev = node;
        node.next = next;
        node.prev = prev;
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    addAtIndex(index, val) {
        let cur = this.head.next;
        while (cur && index > 0) {
            cur = cur.next;
            index--;
        }
        if (cur && index === 0) {
            const node = new ListNode(val);
            const next = cur;
            const prev = cur.prev;
            prev.next = node;
            next.prev = node;
            node.next = next;
            node.prev = prev;
        }
    }

    /**
     * @param {number} index
     * @return {void}
     */
    deleteAtIndex(index) {
        let cur = this.head.next;
        while (cur && index > 0) {
            cur = cur.next;
            index--;
        }
        if (cur && cur !== this.tail && index === 0) {
            const next = cur.next;
            const prev = cur.prev;
            next.prev = prev;
            prev.next = next;
        }
    }
}
```

```csharp
public class ListNode {
    public int val;
    public ListNode prev;
    public ListNode next;

    public ListNode(int val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

public class MyLinkedList {
    private ListNode head;
    private ListNode tail;

    public MyLinkedList() {
        head = new ListNode(0);
        tail = new ListNode(0);
        head.next = tail;
        tail.prev = head;
    }

    public int Get(int index) {
        ListNode cur = head.next;
        while (cur != null && index > 0) {
            cur = cur.next;
            index--;
        }
        if (cur != null && cur != tail && index == 0) {
            return cur.val;
        }
        return -1;
    }

    public void AddAtHead(int val) {
        ListNode node = new ListNode(val);
        ListNode next = head.next;
        ListNode prev = head;
        prev.next = node;
        next.prev = node;
        node.next = next;
        node.prev = prev;
    }

    public void AddAtTail(int val) {
        ListNode node = new ListNode(val);
        ListNode next = tail;
        ListNode prev = tail.prev;
        prev.next = node;
        next.prev = node;
        node.next = next;
        node.prev = prev;
    }

    public void AddAtIndex(int index, int val) {
        ListNode cur = head.next;
        while (cur != null && index > 0) {
            cur = cur.next;
            index--;
        }
        if (cur != null && index == 0) {
            ListNode node = new ListNode(val);
            ListNode next = cur;
            ListNode prev = cur.prev;
            prev.next = node;
            next.prev = node;
            node.next = next;
            node.prev = prev;
        }
    }

    public void DeleteAtIndex(int index) {
        ListNode cur = head.next;
        while (cur != null && index > 0) {
            cur = cur.next;
            index--;
        }
        if (cur != null && cur != tail && index == 0) {
            ListNode next = cur.next;
            ListNode prev = cur.prev;
            next.prev = prev;
            prev.next = next;
        }
    }
}
```

```go
type ListNode struct {
    val  int
    prev *ListNode
    next *ListNode
}

type MyLinkedList struct {
    head *ListNode
    tail *ListNode
}

func Constructor() MyLinkedList {
    head := &ListNode{val: 0}
    tail := &ListNode{val: 0}
    head.next = tail
    tail.prev = head
    return MyLinkedList{head: head, tail: tail}
}

func (this *MyLinkedList) Get(index int) int {
    cur := this.head.next
    for cur != nil && index > 0 {
        cur = cur.next
        index--
    }
    if cur != nil && cur != this.tail && index == 0 {
        return cur.val
    }
    return -1
}

func (this *MyLinkedList) AddAtHead(val int) {
    node := &ListNode{val: val}
    next := this.head.next
    prev := this.head
    prev.next = node
    next.prev = node
    node.next = next
    node.prev = prev
}

func (this *MyLinkedList) AddAtTail(val int) {
    node := &ListNode{val: val}
    next := this.tail
    prev := this.tail.prev
    prev.next = node
    next.prev = node
    node.next = next
    node.prev = prev
}

func (this *MyLinkedList) AddAtIndex(index int, val int) {
    cur := this.head.next
    for cur != nil && index > 0 {
        cur = cur.next
        index--
    }
    if cur != nil && index == 0 {
        node := &ListNode{val: val}
        next := cur
        prev := cur.prev
        prev.next = node
        next.prev = node
        node.next = next
        node.prev = prev
    }
}

func (this *MyLinkedList) DeleteAtIndex(index int) {
    cur := this.head.next
    for cur != nil && index > 0 {
        cur = cur.next
        index--
    }
    if cur != nil && cur != this.tail && index == 0 {
        next := cur.next
        prev := cur.prev
        next.prev = prev
        prev.next = next
    }
}
```

```kotlin
class ListNode(var `val`: Int) {
    var prev: ListNode? = null
    var next: ListNode? = null
}

class MyLinkedList() {
    private val head = ListNode(0)
    private val tail = ListNode(0)

    init {
        head.next = tail
        tail.prev = head
    }

    fun get(index: Int): Int {
        var idx = index
        var cur = head.next
        while (cur != null && idx > 0) {
            cur = cur.next
            idx--
        }
        if (cur != null && cur != tail && idx == 0) {
            return cur.`val`
        }
        return -1
    }

    fun addAtHead(`val`: Int) {
        val node = ListNode(`val`)
        val next = head.next
        val prev = head
        prev.next = node
        next?.prev = node
        node.next = next
        node.prev = prev
    }

    fun addAtTail(`val`: Int) {
        val node = ListNode(`val`)
        val next = tail
        val prev = tail.prev
        prev?.next = node
        next.prev = node
        node.next = next
        node.prev = prev
    }

    fun addAtIndex(index: Int, `val`: Int) {
        var idx = index
        var cur = head.next
        while (cur != null && idx > 0) {
            cur = cur.next
            idx--
        }
        if (cur != null && idx == 0) {
            val node = ListNode(`val`)
            val next = cur
            val prev = cur.prev
            prev?.next = node
            next.prev = node
            node.next = next
            node.prev = prev
        }
    }

    fun deleteAtIndex(index: Int) {
        var idx = index
        var cur = head.next
        while (cur != null && idx > 0) {
            cur = cur.next
            idx--
        }
        if (cur != null && cur != tail && idx == 0) {
            val next = cur.next
            val prev = cur.prev
            next?.prev = prev
            prev?.next = next
        }
    }
}
```

```swift
class ListNode {
    var val: Int
    var prev: ListNode?
    var next: ListNode?

    init(_ val: Int) {
        self.val = val
        self.prev = nil
        self.next = nil
    }
}

class MyLinkedList {
    private var head: ListNode
    private var tail: ListNode

    init() {
        head = ListNode(0)
        tail = ListNode(0)
        head.next = tail
        tail.prev = head
    }

    func get(_ index: Int) -> Int {
        var idx = index
        var cur = head.next
        while cur != nil && idx > 0 {
            cur = cur?.next
            idx -= 1
        }
        if cur != nil && cur !== tail && idx == 0 {
            return cur!.val
        }
        return -1
    }

    func addAtHead(_ val: Int) {
        let node = ListNode(val)
        let next = head.next
        let prev = head
        prev.next = node
        next?.prev = node
        node.next = next
        node.prev = prev
    }

    func addAtTail(_ val: Int) {
        let node = ListNode(val)
        let next = tail
        let prev = tail.prev
        prev?.next = node
        next.prev = node
        node.next = next
        node.prev = prev
    }

    func addAtIndex(_ index: Int, _ val: Int) {
        var idx = index
        var cur = head.next
        while cur != nil && idx > 0 {
            cur = cur?.next
            idx -= 1
        }
        if cur != nil && idx == 0 {
            let node = ListNode(val)
            let next = cur
            let prev = cur?.prev
            prev?.next = node
            next?.prev = node
            node.next = next
            node.prev = prev
        }
    }

    func deleteAtIndex(_ index: Int) {
        var idx = index
        var cur = head.next
        while cur != nil && idx > 0 {
            cur = cur?.next
            idx -= 1
        }
        if cur != nil && cur !== tail && idx == 0 {
            let next = cur?.next
            let prev = cur?.prev
            next?.prev = prev
            prev?.next = next
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for $addAtHead()$, $addAtTail()$.
    - $O(n)$ time for $get()$, $addAtIndex()$, $deleteAtIndex()$.
- Space complexity: $O(n)$

---

## 4. Doubly Linked List (Optimal)

### Intuition
This optimization improves traversal time by choosing the shorter path. For indices in the first half of the list, we traverse forward from the head. For indices in the second half, we traverse backward from the tail. The `getPrev(index)` helper returns the predecessor node using this bidirectional approach, cutting worst-case traversal roughly in half on average.

### Algorithm
1. **Initialization:** Create dummy head and tail nodes linked to each other. Set size to 0.
2. **getPrev(index):** If `index <= size / 2`, traverse forward from head for `index` steps. Otherwise, traverse backward from tail for `size - index + 1` steps. Return the predecessor node.
3. **get(index):** If out of bounds, return -1. Call `getPrev(index)` and return the value of its next node.
4. **addAtHead(val):** Call `addAtIndex(0, val)`.
5. **addAtTail(val):** Call `addAtIndex(size, val)`.
6. **addAtIndex(index, val):** If index is greater than size, return. Use `getPrev(index)` to find the predecessor, create the new node, and wire it between the predecessor and its current next. Increment size.
7. **deleteAtIndex(index):** If out of bounds, return. Use `getPrev(index)` to find the predecessor, then bypass the target node by linking predecessor directly to the node after the target. Decrement size.

::tabs-start

```python
class ListNode:
    def __init__(self, val=0, next=None, prev=None):
        self.val = val
        self.next = next
        self.prev = prev

class MyLinkedList:
    def __init__(self):
        self.head = ListNode(0)
        self.tail = ListNode(0)
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0

    def getPrev(self, index: int) -> ListNode:
        if index <= self.size // 2:
            cur = self.head
            for _ in range(index):
                cur = cur.next
        else:
            cur = self.tail
            for _ in range(self.size - index + 1):
                cur = cur.prev
        return cur

    def get(self, index: int) -> int:
        if index >= self.size:
            return -1
        return self.getPrev(index).next.val

    def addAtHead(self, val: int) -> None:
        self.addAtIndex(0, val)

    def addAtTail(self, val: int) -> None:
        self.addAtIndex(self.size, val)

    def addAtIndex(self, index: int, val: int) -> None:
        if index > self.size:
            return
        node = ListNode(val)
        prev = self.getPrev(index)
        next = prev.next
        prev.next = node
        node.prev = prev
        node.next = next
        next.prev = node
        self.size += 1

    def deleteAtIndex(self, index: int) -> None:
        if index >= self.size:
            return
        prev = self.getPrev(index)
        cur = prev.next
        next = cur.next
        prev.next = next
        next.prev = prev
        self.size -= 1
```

```java
class ListNode {
    int val;
    ListNode next;
    ListNode prev;

    ListNode(int val) {
        this(val, null, null);
    }

    ListNode(int val, ListNode next, ListNode prev) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}

public class MyLinkedList {
    ListNode head;
    ListNode tail;
    int size;

    public MyLinkedList() {
        head = new ListNode(0);
        tail = new ListNode(0);
        head.next = tail;
        tail.prev = head;
        size = 0;
    }

    private ListNode getPrev(int index) {
        if (index <= size / 2) {
            ListNode cur = head;
            for (int i = 0; i < index; i++) {
                cur = cur.next;
            }
            return cur;
        } else {
            ListNode cur = tail;
            for (int i = 0; i < size - index + 1; i++) {
                cur = cur.prev;
            }
            return cur;
        }
    }

    public int get(int index) {
        if (index >= size) return -1;
        return getPrev(index).next.val;
    }

    public void addAtHead(int val) {
        addAtIndex(0, val);
    }

    public void addAtTail(int val) {
        addAtIndex(size, val);
    }

    public void addAtIndex(int index, int val) {
        if (index > size) return;
        ListNode node = new ListNode(val);
        ListNode prev = getPrev(index);
        ListNode next = prev.next;
        prev.next = node;
        node.prev = prev;
        node.next = next;
        next.prev = node;
        size++;
    }

    public void deleteAtIndex(int index) {
        if (index >= size) return;
        ListNode prev = getPrev(index);
        ListNode cur = prev.next;
        ListNode next = cur.next;
        prev.next = next;
        next.prev = prev;
        size--;
    }
}
```

```cpp
class MyLinkedList {
    struct ListNode {
        int val;
        ListNode* next;
        ListNode* prev;
        ListNode(int val = 0, ListNode* next = nullptr, ListNode* prev = nullptr) {
            this->val = val;
            this->next = next;
            this->prev = prev;
        }
    };

public:
    ListNode* head;
    ListNode* tail;
    int size;

    MyLinkedList() {
        head = new ListNode(0);
        tail = new ListNode(0);
        head->next = tail;
        tail->prev = head;
        size = 0;
    }

    ListNode* getPrev(int index) {
        if (index <= size / 2) {
            ListNode* cur = head;
            for (int i = 0; i < index; i++) {
                cur = cur->next;
            }
            return cur;
        } else {
            ListNode* cur = tail;
            for (int i = 0; i < size - index + 1; i++) {
                cur = cur->prev;
            }
            return cur;
        }
    }

    int get(int index) {
        if (index >= size) return -1;
        return getPrev(index)->next->val;
    }

    void addAtHead(int val) {
        addAtIndex(0, val);
    }

    void addAtTail(int val) {
        addAtIndex(size, val);
    }

    void addAtIndex(int index, int val) {
        if (index > size) return;
        ListNode* node = new ListNode(val);
        ListNode* prev = getPrev(index);
        ListNode* next = prev->next;
        prev->next = node;
        node->prev = prev;
        node->next = next;
        next->prev = node;
        size++;
    }

    void deleteAtIndex(int index) {
        if (index >= size) return;
        ListNode* prev = getPrev(index);
        ListNode* cur = prev->next;
        ListNode* next = cur->next;
        prev->next = next;
        next->prev = prev;
        delete cur;
        size--;
    }
};
```

```javascript
class ListNode {
    /**
     * @constructor
     * @param {number}
     * @param {ListNode|null}
     * @param {ListNode|null}
     */
    constructor(val = 0, next = null, prev = null) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}

class MyLinkedList {
    constructor() {
        this.head = new ListNode(0);
        this.tail = new ListNode(0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.size = 0;
    }

    /**
     * @param {number} index
     * @return {ListNode}
     */
    getPrev(index) {
        let cur;
        if (index <= this.size / 2) {
            cur = this.head;
            for (let i = 0; i < index; i++) {
                cur = cur.next;
            }
        } else {
            cur = this.tail;
            for (let i = 0; i < this.size - index + 1; i++) {
                cur = cur.prev;
            }
        }
        return cur;
    }

    /**
     * @param {number} index
     * @return {number}
     */
    get(index) {
        if (index >= this.size) {
            return -1;
        }
        return this.getPrev(index).next.val;
    }

    /**
     * @param {number} val
     * @return {void}
     */
    addAtHead(val) {
        this.addAtIndex(0, val);
    }

    /**
     * @param {number} val
     * @return {void}
     */
    addAtTail(val) {
        this.addAtIndex(this.size, val);
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    addAtIndex(index, val) {
        if (index > this.size) {
            return;
        }
        const node = new ListNode(val);
        const prev = this.getPrev(index);
        const next = prev.next;
        prev.next = node;
        node.prev = prev;
        node.next = next;
        next.prev = node;
        this.size++;
    }

    /**
     * @param {number} index
     * @return {void}
     */
    deleteAtIndex(index) {
        if (index >= this.size) {
            return;
        }
        const prev = this.getPrev(index);
        const cur = prev.next;
        const next = cur.next;
        prev.next = next;
        next.prev = prev;
        this.size--;
    }
}
```

```csharp
public class ListNode {
    public int val;
    public ListNode next;
    public ListNode prev;

    public ListNode(int val = 0, ListNode next = null, ListNode prev = null) {
        this.val = val;
        this.next = next;
        this.prev = prev;
    }
}

public class MyLinkedList {
    private ListNode head;
    private ListNode tail;
    private int size;

    public MyLinkedList() {
        head = new ListNode(0);
        tail = new ListNode(0);
        head.next = tail;
        tail.prev = head;
        size = 0;
    }

    private ListNode GetPrev(int index) {
        ListNode cur;
        if (index <= size / 2) {
            cur = head;
            for (int i = 0; i < index; i++) {
                cur = cur.next;
            }
        } else {
            cur = tail;
            for (int i = 0; i < size - index + 1; i++) {
                cur = cur.prev;
            }
        }
        return cur;
    }

    public int Get(int index) {
        if (index >= size) return -1;
        return GetPrev(index).next.val;
    }

    public void AddAtHead(int val) {
        AddAtIndex(0, val);
    }

    public void AddAtTail(int val) {
        AddAtIndex(size, val);
    }

    public void AddAtIndex(int index, int val) {
        if (index > size) return;
        ListNode node = new ListNode(val);
        ListNode prev = GetPrev(index);
        ListNode next = prev.next;
        prev.next = node;
        node.prev = prev;
        node.next = next;
        next.prev = node;
        size++;
    }

    public void DeleteAtIndex(int index) {
        if (index >= size) return;
        ListNode prev = GetPrev(index);
        ListNode cur = prev.next;
        ListNode next = cur.next;
        prev.next = next;
        next.prev = prev;
        size--;
    }
}
```

```go
type ListNode struct {
    val  int
    next *ListNode
    prev *ListNode
}

type MyLinkedList struct {
    head *ListNode
    tail *ListNode
    size int
}

func Constructor() MyLinkedList {
    head := &ListNode{val: 0}
    tail := &ListNode{val: 0}
    head.next = tail
    tail.prev = head
    return MyLinkedList{head: head, tail: tail, size: 0}
}

func (this *MyLinkedList) getPrev(index int) *ListNode {
    var cur *ListNode
    if index <= this.size/2 {
        cur = this.head
        for i := 0; i < index; i++ {
            cur = cur.next
        }
    } else {
        cur = this.tail
        for i := 0; i < this.size-index+1; i++ {
            cur = cur.prev
        }
    }
    return cur
}

func (this *MyLinkedList) Get(index int) int {
    if index >= this.size {
        return -1
    }
    return this.getPrev(index).next.val
}

func (this *MyLinkedList) AddAtHead(val int) {
    this.AddAtIndex(0, val)
}

func (this *MyLinkedList) AddAtTail(val int) {
    this.AddAtIndex(this.size, val)
}

func (this *MyLinkedList) AddAtIndex(index int, val int) {
    if index > this.size {
        return
    }
    node := &ListNode{val: val}
    prev := this.getPrev(index)
    next := prev.next
    prev.next = node
    node.prev = prev
    node.next = next
    next.prev = node
    this.size++
}

func (this *MyLinkedList) DeleteAtIndex(index int) {
    if index >= this.size {
        return
    }
    prev := this.getPrev(index)
    cur := prev.next
    next := cur.next
    prev.next = next
    next.prev = prev
    this.size--
}
```

```kotlin
class ListNode(var `val`: Int = 0, var next: ListNode? = null, var prev: ListNode? = null)

class MyLinkedList() {
    private val head = ListNode(0)
    private val tail = ListNode(0)
    private var size = 0

    init {
        head.next = tail
        tail.prev = head
    }

    private fun getPrev(index: Int): ListNode {
        var cur: ListNode
        if (index <= size / 2) {
            cur = head
            for (i in 0 until index) {
                cur = cur.next!!
            }
        } else {
            cur = tail
            for (i in 0 until size - index + 1) {
                cur = cur.prev!!
            }
        }
        return cur
    }

    fun get(index: Int): Int {
        if (index >= size) return -1
        return getPrev(index).next!!.`val`
    }

    fun addAtHead(`val`: Int) {
        addAtIndex(0, `val`)
    }

    fun addAtTail(`val`: Int) {
        addAtIndex(size, `val`)
    }

    fun addAtIndex(index: Int, `val`: Int) {
        if (index > size) return
        val node = ListNode(`val`)
        val prev = getPrev(index)
        val next = prev.next
        prev.next = node
        node.prev = prev
        node.next = next
        next?.prev = node
        size++
    }

    fun deleteAtIndex(index: Int) {
        if (index >= size) return
        val prev = getPrev(index)
        val cur = prev.next
        val next = cur?.next
        prev.next = next
        next?.prev = prev
        size--
    }
}
```

```swift
class ListNode {
    var val: Int
    var next: ListNode?
    var prev: ListNode?

    init(_ val: Int = 0, _ next: ListNode? = nil, _ prev: ListNode? = nil) {
        self.val = val
        self.next = next
        self.prev = prev
    }
}

class MyLinkedList {
    private var head: ListNode
    private var tail: ListNode
    private var size: Int

    init() {
        head = ListNode(0)
        tail = ListNode(0)
        head.next = tail
        tail.prev = head
        size = 0
    }

    private func getPrev(_ index: Int) -> ListNode {
        var cur: ListNode
        if index <= size / 2 {
            cur = head
            for _ in 0..<index {
                cur = cur.next!
            }
        } else {
            cur = tail
            for _ in 0..<(size - index + 1) {
                cur = cur.prev!
            }
        }
        return cur
    }

    func get(_ index: Int) -> Int {
        if index >= size { return -1 }
        return getPrev(index).next!.val
    }

    func addAtHead(_ val: Int) {
        addAtIndex(0, val)
    }

    func addAtTail(_ val: Int) {
        addAtIndex(size, val)
    }

    func addAtIndex(_ index: Int, _ val: Int) {
        if index > size { return }
        let node = ListNode(val)
        let prev = getPrev(index)
        let next = prev.next
        prev.next = node
        node.prev = prev
        node.next = next
        next?.prev = node
        size += 1
    }

    func deleteAtIndex(_ index: Int) {
        if index >= size { return }
        let prev = getPrev(index)
        let cur = prev.next
        let next = cur?.next
        prev.next = next
        next?.prev = prev
        size -= 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for $addAtHead()$, $addAtTail()$.
    - $O(n)$ time for $get()$, $addAtIndex()$, $deleteAtIndex()$.
- Space complexity: $O(n)$

## Common Pitfalls

### Using Wrong Bound Check for addAtIndex vs deleteAtIndex

The `addAtIndex` allows inserting at position `size` (appending), but `deleteAtIndex` does not allow deleting at position `size`. Using the same condition for both causes bugs.

```python
# addAtIndex: index == size is valid (append)
def addAtIndex(self, index: int, val: int) -> None:
    if index > self.size:  # Note: > not >=
        return

# deleteAtIndex: index == size is invalid
def deleteAtIndex(self, index: int) -> None:
    if index >= self.size:  # Note: >= not >
        return
```

### Forgetting to Update Size

Every insertion must increment size and every deletion must decrement it. Forgetting this causes subsequent operations to use stale bounds, leading to crashes or incorrect behavior.

```python
# Wrong: forgot to update size
def addAtHead(self, val: int) -> None:
    node = ListNode(val)
    node.next = self.head.next
    self.head.next = node
    # Missing: self.size += 1

# Correct
def addAtHead(self, val: int) -> None:
    node = ListNode(val)
    node.next = self.head.next
    self.head.next = node
    self.size += 1
```

### Incorrect Pointer Order When Inserting

When inserting a node, you must set the new node's `next` pointer before updating the previous node's `next`. Reversing this order loses the reference to the rest of the list.

```python
# Wrong: loses reference to rest of list
prev.next = node
node.next = prev.next  # node.next now points to itself!

# Correct: set new node's next first
node.next = prev.next
prev.next = node
```
