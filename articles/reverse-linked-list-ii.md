## 1. Recursion - I

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head
        prev = dummy
        for _ in range(left - 1):
            prev = prev.next

        sublist_head = prev.next
        sublist_tail = sublist_head
        for _ in range(right - left):
            sublist_tail = sublist_tail.next

        next_node = sublist_tail.next
        sublist_tail.next = None
        reversed_sublist = self.reverseList(sublist_head)
        prev.next = reversed_sublist
        sublist_head.next = next_node

        return dummy.next

    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head:
            return None

        newHead = head
        if head.next:
            newHead = self.reverseList(head.next)
            head.next.next = head
        head.next = None

        return newHead
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public class Solution {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;

        for (int i = 0; i < left - 1; i++) {
            prev = prev.next;
        }

        ListNode sublistHead = prev.next;
        ListNode sublistTail = sublistHead;
        for (int i = 0; i < right - left; i++) {
            sublistTail = sublistTail.next;
        }

        ListNode nextNode = sublistTail.next;
        sublistTail.next = null;
        prev.next = reverseList(sublistHead);
        sublistHead.next = nextNode;

        return dummy.next;
    }

    private ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode newHead = reverseList(head.next);
        head.next.next = head;
        head.next = null;

        return newHead;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode* prev = &dummy;

        for (int i = 0; i < left - 1; ++i) {
            prev = prev->next;
        }

        ListNode* sublistHead = prev->next;
        ListNode* sublistTail = sublistHead;
        for (int i = 0; i < right - left; ++i) {
            sublistTail = sublistTail->next;
        }

        ListNode* nextNode = sublistTail->next;
        sublistTail->next = nullptr;
        prev->next = reverseList(sublistHead);
        sublistHead->next = nextNode;

        return dummy.next;
    }

private:
    ListNode* reverseList(ListNode* head) {
        if (!head || !head->next) {
            return head;
        }

        ListNode* newHead = reverseList(head->next);
        head->next->next = head;
        head->next = nullptr;

        return newHead;
    }
};
```

```javascript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} left
     * @param {number} right
     * @return {ListNode}
     */
    reverseBetween(head, left, right) {
        const reverseList = (head) => {
            if (!head || !head.next) {
                return head;
            }

            const newHead = reverseList(head.next);
            head.next.next = head;
            head.next = null;

            return newHead;
        };

        const dummy = new ListNode(0, head);
        let prev = dummy;
        for (let i = 0; i < left - 1; i++) {
            prev = prev.next;
        }

        const sublistHead = prev.next;
        let sublistTail = sublistHead;
        for (let i = 0; i < right - left; i++) {
            sublistTail = sublistTail.next;
        }

        const nextNode = sublistTail.next;
        sublistTail.next = null;
        prev.next = reverseList(sublistHead);
        sublistHead.next = nextNode;

        return dummy.next;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val=0, ListNode next=null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
public class Solution {
    public ListNode ReverseBetween(ListNode head, int left, int right) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;

        for (int i = 0; i < left - 1; i++) {
            prev = prev.next;
        }

        ListNode sublistHead = prev.next;
        ListNode sublistTail = sublistHead;
        for (int i = 0; i < right - left; i++) {
            sublistTail = sublistTail.next;
        }

        ListNode nextNode = sublistTail.next;
        sublistTail.next = null;

        ListNode reversedSublist = ReverseList(sublistHead);
        prev.next = reversedSublist;
        sublistHead.next = nextNode;

        return dummy.next;
    }

    private ListNode ReverseList(ListNode head) {
        if (head == null) return null;

        ListNode newHead = head;
        if (head.next != null) {
            newHead = ReverseList(head.next);
            head.next.next = head;
        }
        head.next = null;
        return newHead;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Recursion - II

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        def reverseList(node, n):
            if n == 1:
                return node, node.next
            new_head, next_node = reverseList(node.next, n - 1)
            node.next.next = node
            node.next = next_node
            return new_head, next_node

        if left == 1:
            new_head, _ = reverseList(head, right)
            return new_head

        head.next = self.reverseBetween(head.next, left - 1, right - 1)
        return head
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public class Solution {
    private ListNode[] reverseList(ListNode node, int n) {
        if (n == 1) {
            return new ListNode[] { node, node.next };
        }
        ListNode[] result = reverseList(node.next, n - 1);
        node.next.next = node;
        node.next = result[1];
        return new ListNode[] { result[0], node.next };
    }

    public ListNode reverseBetween(ListNode head, int left, int right) {
        if (left == 1) {
            return reverseList(head, right)[0];
        }
        head.next = reverseBetween(head.next, left - 1, right - 1);
        return head;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
private:
    pair<ListNode*, ListNode*> reverseList(ListNode* node, int n) {
        if (n == 1) {
            return {node, node->next};
        }
        auto result = reverseList(node->next, n - 1);
        node->next->next = node;
        node->next = result.second;
        return {result.first, node->next};
    }

public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        if (left == 1) {
            return reverseList(head, right).first;
        }
        head->next = reverseBetween(head->next, left - 1, right - 1);
        return head;
    }
};
```

```javascript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} left
     * @param {number} right
     * @return {ListNode}
     */
    reverseBetween(head, left, right) {
        const reverseList = (node, n) => {
            if (n === 1) {
                return [node, node.next];
            }
            const [newHead, nextNode] = reverseList(node.next, n - 1);
            node.next.next = node;
            node.next = nextNode;
            return [newHead, nextNode];
        };

        if (left === 1) {
            return reverseList(head, right)[0];
        }
        head.next = this.reverseBetween(head.next, left - 1, right - 1);
        return head;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val=0, ListNode next=null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
public class Solution {
    private ListNode successor = null;

    private ListNode ReverseList(ListNode node, int n) {
        if (n == 1) {
            successor = node.next;
            return node;
        }
        ListNode newHead = ReverseList(node.next, n - 1);
        node.next.next = node;
        node.next = successor;
        return newHead;
    }

    public ListNode ReverseBetween(ListNode head, int left, int right) {
        if (left == 1) {
            return ReverseList(head, right);
        }
        head.next = ReverseBetween(head.next, left - 1, right - 1);
        return head;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Iteration - I

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head
        prev = dummy
        for _ in range(left - 1):
            prev = prev.next

        sublist_head = prev.next
        sublist_tail = sublist_head
        for _ in range(right - left):
            sublist_tail = sublist_tail.next

        next_node = sublist_tail.next
        sublist_tail.next = None
        reversed_sublist = self.reverseList(sublist_head)
        prev.next = reversed_sublist
        sublist_head.next = next_node

        return dummy.next

    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev, curr = None, head

        while curr:
            temp = curr.next
            curr.next = prev
            prev = curr
            curr = temp
        return prev
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public class Solution {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;

        for (int i = 0; i < left - 1; i++) {
            prev = prev.next;
        }

        ListNode sublistHead = prev.next;
        ListNode sublistTail = sublistHead;
        for (int i = 0; i < right - left; i++) {
            sublistTail = sublistTail.next;
        }

        ListNode nextNode = sublistTail.next;
        sublistTail.next = null;
        prev.next = reverseList(sublistHead);
        sublistHead.next = nextNode;

        return dummy.next;
    }

    private ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }
        return prev;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode* prev = &dummy;

        for (int i = 0; i < left - 1; ++i) {
            prev = prev->next;
        }

        ListNode* sublistHead = prev->next;
        ListNode* sublistTail = sublistHead;
        for (int i = 0; i < right - left; ++i) {
            sublistTail = sublistTail->next;
        }

        ListNode* nextNode = sublistTail->next;
        sublistTail->next = nullptr;
        prev->next = reverseList(sublistHead);
        sublistHead->next = nextNode;

        return dummy.next;
    }

private:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;

        while (curr) {
            ListNode* temp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = temp;
        }
        return prev;
    }
};
```

```javascript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} left
     * @param {number} right
     * @return {ListNode}
     */
    reverseBetween(head, left, right) {
        const reverseList = (head) => {
            let prev = null;
            let curr = head;

            while (curr) {
                let temp = curr.next;
                curr.next = prev;
                prev = curr;
                curr = temp;
            }
            return prev;
        };

        const dummy = new ListNode(0, head);
        let prev = dummy;
        for (let i = 0; i < left - 1; i++) {
            prev = prev.next;
        }

        const sublistHead = prev.next;
        let sublistTail = sublistHead;
        for (let i = 0; i < right - left; i++) {
            sublistTail = sublistTail.next;
        }

        const nextNode = sublistTail.next;
        sublistTail.next = null;
        prev.next = reverseList(sublistHead);
        sublistHead.next = nextNode;

        return dummy.next;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val=0, ListNode next=null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
public class Solution {
    public ListNode ReverseBetween(ListNode head, int left, int right) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;

        for (int i = 0; i < left - 1; i++) {
            prev = prev.next;
        }

        ListNode sublistHead = prev.next;
        ListNode sublistTail = sublistHead;
        for (int i = 0; i < right - left; i++) {
            sublistTail = sublistTail.next;
        }

        ListNode nextNode = sublistTail.next;
        sublistTail.next = null;

        ListNode reversedSublist = ReverseList(sublistHead);
        prev.next = reversedSublist;

        sublistHead.next = nextNode;
        return dummy.next;
    }

    private ListNode ReverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }
        return prev;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Iteration - II

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        leftPrev, cur = dummy, head

        for _ in range(left - 1):
            leftPrev, cur = cur, cur.next

        prev = None
        for _ in range(right - left + 1):
            tmpNext = cur.next
            cur.next = prev
            prev, cur = cur, tmpNext

        leftPrev.next.next = cur
        leftPrev.next = prev

        return dummy.next
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public class Solution {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode leftPrev = dummy, cur = head;

        for (int i = 0; i < left - 1; i++) {
            leftPrev = cur;
            cur = cur.next;
        }

        ListNode prev = null;
        for (int i = 0; i < right - left + 1; i++) {
            ListNode tmpNext = cur.next;
            cur.next = prev;
            prev = cur;
            cur = tmpNext;
        }

        leftPrev.next.next = cur;
        leftPrev.next = prev;

        return dummy.next;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode* leftPrev = &dummy;
        ListNode* cur = head;

        for (int i = 0; i < left - 1; ++i) {
            leftPrev = cur;
            cur = cur->next;
        }

        ListNode* prev = nullptr;
        for (int i = 0; i < right - left + 1; ++i) {
            ListNode* tmpNext = cur->next;
            cur->next = prev;
            prev = cur;
            cur = tmpNext;
        }

        leftPrev->next->next = cur;
        leftPrev->next = prev;

        return dummy.next;
    }
};
```

```javascript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} left
     * @param {number} right
     * @return {ListNode}
     */
    reverseBetween(head, left, right) {
        const dummy = new ListNode(0, head);
        let leftPrev = dummy,
            cur = head;

        for (let i = 0; i < left - 1; i++) {
            leftPrev = cur;
            cur = cur.next;
        }

        let prev = null;
        for (let i = 0; i < right - left + 1; i++) {
            const tmpNext = cur.next;
            cur.next = prev;
            prev = cur;
            cur = tmpNext;
        }

        leftPrev.next.next = cur;
        leftPrev.next = prev;

        return dummy.next;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val=0, ListNode next=null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
public class Solution {
    public ListNode ReverseBetween(ListNode head, int left, int right) {
        ListNode dummy = new ListNode(0, head);
        ListNode leftPrev = dummy, curr = head;

        for (int i = 0; i < left - 1; i++) {
            leftPrev = curr;
            curr = curr.next;
        }

        ListNode prev = null;
        for (int i = 0; i < right - left + 1; i++) {
            ListNode tmpNext = curr.next;
            curr.next = prev;
            prev = curr;
            curr = tmpNext;
        }

        leftPrev.next.next = curr;
        leftPrev.next = prev;

        return dummy.next;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
