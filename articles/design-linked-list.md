## 1. Singly Linked List

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for $addAtHead()$.
    - $O(n)$ time for $get()$, $addAtTail()$, $addAtIndex()$, $deleteAtIndex()$.
- Space complexity: $O(n)$

---

## 2. Singly Linked List (Optimal)

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for $addAtHead()$.
    - $O(n)$ time for $get()$, $addAtTail()$, $addAtIndex()$, $deleteAtIndex()$.
- Space complexity: $O(n)$

---

## 3. Doubly Linked List

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for $addAtHead()$, $addAtTail()$.
    - $O(n)$ time for $get()$, $addAtIndex()$, $deleteAtIndex()$.
- Space complexity: $O(n)$

---

## 4. Doubly Linked List (Optimal)

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for $addAtHead()$, $addAtTail()$.
    - $O(n)$ time for $get()$, $addAtIndex()$, $deleteAtIndex()$.
- Space complexity: $O(n)$
