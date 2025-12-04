## 1. Recursion

::tabs-start

```python
class Solution:
    def printLinkedListInReverse(self, head: 'ImmutableListNode') -> None:
        if head is not None:
            self.printLinkedListInReverse(head.getNext())
            head.printValue()
```

```java
class Solution {
    public void printLinkedListInReverse(ImmutableListNode head) {
        if (head != null) {
            printLinkedListInReverse(head.getNext());
            head.printValue();
        }
    }
}
```

```cpp
class Solution {
public:
    void printLinkedListInReverse(ImmutableListNode* head) {
        if (head != NULL) {
            printLinkedListInReverse(head->getNext());
            head->printValue();
        }
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the size of the linked list. 

---

## 2. Using Stack

::tabs-start

```python
class Solution:
    def printLinkedListInReverse(self, head: 'ImmutableListNode') -> None:
        stack = []
        while head:
            stack.append(head)
            head = head.getNext()

        while stack:
            node = stack.pop()
            node.printValue()
```

```java
class Solution {
    public void printLinkedListInReverse(ImmutableListNode head) {
        Stack<ImmutableListNode> stack = new Stack<>();
        while (head != null) {
            stack.push(head);
            head = head.getNext();
        }

        while (!stack.empty()) {
            ImmutableListNode node = stack.pop();
            node.printValue();
        }
    }
}
```

```cpp
class Solution {
public:
    void printLinkedListInReverse(ImmutableListNode* head) {
        stack<ImmutableListNode*> s;
        while (head) {
            s.push(head);
            head = head->getNext();
        }

        while (!s.empty()) {
            ImmutableListNode* node = s.top();
            s.pop();
            node->printValue();
        }
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the size of the linked list. 

---

## 3. Square Root Decomposition

::tabs-start

```python
class Solution:
    def printLinkedListInReverseRecursively(self, head: 'ImmutableListNode', size: int) -> None:
        if size > 0 and head is not None:
            self.printLinkedListInReverseRecursively(head.getNext(), size - 1)
            head.printValue()

    def getLinkedListSize(self, head: 'ImmutableListNode') -> int:
        size = 0
        while head is not None:
            size += 1
            head = head.getNext()
        return size

    def printLinkedListInReverse(self, head: 'ImmutableListNode') -> None:
        linked_list_size = self.getLinkedListSize(head)
        block_size = math.ceil(math.sqrt(linked_list_size))

        blocks = []
        curr = head
        for i in range(linked_list_size):
            if i % block_size == 0:
                blocks.append(curr)
            curr = curr.getNext()

        while blocks:
            self.printLinkedListInReverseRecursively(blocks.pop(), block_size)
```

```java
class Solution {
    private void printLinkedListInReverseRecursively(ImmutableListNode head, int size) {
        if (size > 0 && head != null) {
            printLinkedListInReverseRecursively(head.getNext(), size - 1);
            head.printValue();
        }
    }

    private int getLinkedListSize(ImmutableListNode head) {
        int size = 0;
        while (head != null) {
            size += 1;
            head = head.getNext();
        }
        return size;
    }

    public void printLinkedListInReverse(ImmutableListNode head) {
        int linkedListSize = getLinkedListSize(head);
        int blockSize = (int) Math.ceil(Math.sqrt(linkedListSize));

        Stack<ImmutableListNode> blocks = new Stack<>();
        ImmutableListNode curr = head;
        for (int i = 0; i < linkedListSize; i++) {
            if (i % blockSize == 0) {
                blocks.push(curr);
            }
            curr = curr.getNext();
        }

        while (!blocks.empty()) {
            printLinkedListInReverseRecursively(blocks.pop(), blockSize);
        }
    }
}
```

```cpp
class Solution {
public:
    void printLinkedListInReverseRecursively(ImmutableListNode* head, int size) {
        if (size && head) {
            printLinkedListInReverseRecursively(head->getNext(), size - 1);
            head->printValue();
        }
    }

    int getLinkedListSize(ImmutableListNode* head) {
        int size = 0;
        while (head) {
            size += 1;
            head = head->getNext();
        }
        return size;
    }

    void printLinkedListInReverse(ImmutableListNode* head) {
        int linkedListSize = getLinkedListSize(head);
        int blockSize = ceil(sqrt(linkedListSize));

        stack<ImmutableListNode*> blocks;
        ImmutableListNode* curr = head;
        for (int i = 0; i < linkedListSize; i++) {
            if (i % blockSize == 0) {
                blocks.push(curr);
            }
            curr = curr->getNext();
        }

        while (!blocks.empty()) {
            printLinkedListInReverseRecursively(blocks.top(), blockSize);
            blocks.pop();
        }
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(\sqrt n)$

>  Where $n$ is the size of the linked list. 

---

## 4. Divide and Conquer

::tabs-start

```python
class Solution:
    def helper(self, start: 'ImmutableListNode', end: 'ImmutableListNode') -> None:
        if start is None or start == end:
            return
        if start.getNext() == end:
            start.printValue()
            return

        slow = start
        fast = start

        while fast != end and fast.getNext() != end:
            slow = slow.getNext()
            fast = fast.getNext().getNext()

        self.helper(slow, end)
        self.helper(start, slow)

    def printLinkedListInReverse(self, head: 'ImmutableListNode') -> None:
        self.helper(head, None)
```

```java
class Solution {
    private void helper(ImmutableListNode start, ImmutableListNode end) {
        if (start == null || start == end) {
            return;
        }
        if (start.getNext() == end) {
            start.printValue();
            return;
        }

        ImmutableListNode slow = start;
        ImmutableListNode fast = start;

        while (fast != end && fast.getNext() != end) {
            slow = slow.getNext();
            fast = fast.getNext().getNext();
        }

        helper(slow, end);
        helper(start, slow);
    }

    public void printLinkedListInReverse(ImmutableListNode head) {
        helper(head, null);
    }
}
```

```cpp
class Solution {
public:
    void helper(ImmutableListNode* start, ImmutableListNode* end) {
        if (start == NULL || start == end) {
            return;
        }
        if (start->getNext() == end) {
            start->printValue();
            return;
        }

        ImmutableListNode* slow = start;
        ImmutableListNode* fast = start;

        while (fast != end && fast->getNext() != end) {
            slow = slow->getNext();
            fast = fast->getNext()->getNext();
        }

        helper(slow, end);
        helper(start, slow);
    }

    void printLinkedListInReverse(ImmutableListNode* head) {
        helper(head, NULL);
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \log n)$
- Space complexity: $O(\log n)$

>  Where $n$ is the size of the linked list. 

---

## 5. Constant Space

::tabs-start

```python
class Solution:
    def printLinkedListInReverse(self, head: 'ImmutableListNode') -> None:
        end = None

        while head != end:
            curr = head
            while curr.getNext() != end:
                curr = curr.getNext()
            curr.printValue()
            end = curr
```

```java
class Solution {
    public void printLinkedListInReverse(ImmutableListNode head) {
        ImmutableListNode curr;
        ImmutableListNode end = null;

        while (head != end) {
            curr = head;
            while (curr.getNext() != end) {
                curr = curr.getNext();
            }
            curr.printValue();
            end = curr;
        }
    }
}
```

```cpp
class Solution {
public:
    void printLinkedListInReverse(ImmutableListNode* head) {
        ImmutableListNode* curr;
        ImmutableListNode* end = NULL;

        while (head != end) {
            curr = head;
            while (curr->getNext() != end) {
                curr = curr->getNext();
            }
            curr->printValue();
            end = curr;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {ImmutableListNode} head
     * @return {void}
     */
    printLinkedListInReverse(head) {
        let curr;
        let end = null;
        
        while (head !== end) {
            curr = head;
            while (curr.getNext() !== end) {
                curr = curr.getNext();
            }
            curr.printValue();
            end = curr;
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n^2)$
- Space complexity: $O(1)$

>  Where $n$ is the size of the linked list. 
