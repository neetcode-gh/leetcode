## 1. Recursion - I

### Intuition

To reverse a portion of a linked list, we first locate the sublist boundaries, disconnect it from the rest, reverse it using standard list reversal, and reconnect the pieces. A dummy node simplifies edge cases where the reversal starts at the head. The recursive reversal handles the sublist by making each node point to its predecessor.

### Algorithm

1. Create a dummy node pointing to the head to handle edge cases.
2. Traverse to find the node just before position `left` (call it `prev`).
3. Identify the sublist head and traverse to find the sublist tail at position `right`.
4. Save the node after the sublist (`nextNode`) and disconnect the sublist by setting tail's next to null.
5. Recursively reverse the sublist: base case returns the single node; otherwise, recurse on the next node and make it point back.
6. Connect `prev` to the new sublist head (returned from reversal) and connect the original sublist head (now tail) to `nextNode`.
7. Return `dummy.next`.

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

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reverseBetween(head *ListNode, left int, right int) *ListNode {
    dummy := &ListNode{Val: 0, Next: head}
    prev := dummy

    for i := 0; i < left-1; i++ {
        prev = prev.Next
    }

    sublistHead := prev.Next
    sublistTail := sublistHead
    for i := 0; i < right-left; i++ {
        sublistTail = sublistTail.Next
    }

    nextNode := sublistTail.Next
    sublistTail.Next = nil

    var reverseList func(*ListNode) *ListNode
    reverseList = func(node *ListNode) *ListNode {
        if node == nil {
            return nil
        }
        newHead := node
        if node.Next != nil {
            newHead = reverseList(node.Next)
            node.Next.Next = node
        }
        node.Next = nil
        return newHead
    }

    prev.Next = reverseList(sublistHead)
    sublistHead.Next = nextNode

    return dummy.Next
}
```

```kotlin
/**
 * Example:
 * var li = ListNode(5)
 * var v = li.`val`
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */
class Solution {
    fun reverseBetween(head: ListNode?, left: Int, right: Int): ListNode? {
        val dummy = ListNode(0)
        dummy.next = head
        var prev: ListNode? = dummy

        for (i in 0 until left - 1) {
            prev = prev?.next
        }

        val sublistHead = prev?.next
        var sublistTail = sublistHead
        for (i in 0 until right - left) {
            sublistTail = sublistTail?.next
        }

        val nextNode = sublistTail?.next
        sublistTail?.next = null

        prev?.next = reverseList(sublistHead)
        sublistHead?.next = nextNode

        return dummy.next
    }

    private fun reverseList(head: ListNode?): ListNode? {
        if (head == null) return null

        var newHead = head
        if (head.next != null) {
            newHead = reverseList(head.next)
            head.next?.next = head
        }
        head.next = null
        return newHead
    }
}
```

```swift
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init() { self.val = 0; self.next = nil; }
 *     public init(_ val: Int) { self.val = val; self.next = nil; }
 *     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 * }
 */
class Solution {
    func reverseBetween(_ head: ListNode?, _ left: Int, _ right: Int) -> ListNode? {
        let dummy = ListNode(0, head)
        var prev: ListNode? = dummy

        for _ in 0..<(left - 1) {
            prev = prev?.next
        }

        let sublistHead = prev?.next
        var sublistTail = sublistHead
        for _ in 0..<(right - left) {
            sublistTail = sublistTail?.next
        }

        let nextNode = sublistTail?.next
        sublistTail?.next = nil

        prev?.next = reverseList(sublistHead)
        sublistHead?.next = nextNode

        return dummy.next
    }

    private func reverseList(_ head: ListNode?) -> ListNode? {
        if head == nil {
            return nil
        }

        var newHead = head
        if head?.next != nil {
            newHead = reverseList(head?.next)
            head?.next?.next = head
        }
        head?.next = nil
        return newHead
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Recursion - II

### Intuition

This approach uses recursion to navigate to the start of the reversal range. Once `left` equals 1, we reverse the first `right` nodes using a helper that tracks the successor node (the node after the reversed portion). The key insight is that as recursion unwinds, we can rewire pointers to achieve the reversal while maintaining the connection to the rest of the list.

### Algorithm

1. If `left` is 1, call the helper function to reverse the first `right` nodes.
2. Otherwise, recurse with `head.next` and decremented `left` and `right` values, then attach the result to `head.next`.
3. The helper function reverses `n` nodes starting from the given node:
   - Base case: when `n` is 1, save the successor (next node) and return current node.
   - Recurse on the next node with `n - 1`.
   - After recursion, make the next node point back to current and set current's next to the saved successor.
4. Return the new head of the reversed portion.

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

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reverseBetween(head *ListNode, left int, right int) *ListNode {
    var successor *ListNode

    var reverseList func(*ListNode, int) *ListNode
    reverseList = func(node *ListNode, n int) *ListNode {
        if n == 1 {
            successor = node.Next
            return node
        }
        newHead := reverseList(node.Next, n-1)
        node.Next.Next = node
        node.Next = successor
        return newHead
    }

    if left == 1 {
        return reverseList(head, right)
    }
    head.Next = reverseBetween(head.Next, left-1, right-1)
    return head
}
```

```kotlin
/**
 * Example:
 * var li = ListNode(5)
 * var v = li.`val`
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */
class Solution {
    private var successor: ListNode? = null

    fun reverseBetween(head: ListNode?, left: Int, right: Int): ListNode? {
        if (left == 1) {
            return reverseList(head, right)
        }
        head?.next = reverseBetween(head?.next, left - 1, right - 1)
        return head
    }

    private fun reverseList(node: ListNode?, n: Int): ListNode? {
        if (n == 1) {
            successor = node?.next
            return node
        }
        val newHead = reverseList(node?.next, n - 1)
        node?.next?.next = node
        node?.next = successor
        return newHead
    }
}
```

```swift
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init() { self.val = 0; self.next = nil; }
 *     public init(_ val: Int) { self.val = val; self.next = nil; }
 *     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 * }
 */
class Solution {
    private var successor: ListNode? = nil

    func reverseBetween(_ head: ListNode?, _ left: Int, _ right: Int) -> ListNode? {
        if left == 1 {
            return reverseList(head, right)
        }
        head?.next = reverseBetween(head?.next, left - 1, right - 1)
        return head
    }

    private func reverseList(_ node: ListNode?, _ n: Int) -> ListNode? {
        if n == 1 {
            successor = node?.next
            return node
        }
        let newHead = reverseList(node?.next, n - 1)
        node?.next?.next = node
        node?.next = successor
        return newHead
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Iteration - I

### Intuition

The iterative approach follows the same structure as the first recursive solution but reverses the sublist using a loop instead of recursion. We traverse to find the boundaries, detach the sublist, reverse it in place using the standard three-pointer technique, and reconnect everything.

### Algorithm

1. Create a dummy node pointing to the head.
2. Traverse `left - 1` steps to find `prev` (node before the sublist).
3. Identify the sublist head and traverse `right - left` more steps to find the sublist tail.
4. Save the node after the sublist and disconnect by setting tail's next to null.
5. Reverse the sublist iteratively using `prev` and `curr` pointers:
   - For each node, save next, point current to previous, advance both pointers.
6. Connect `prev.next` to the new head (final `prev` after reversal) and connect the original head (now tail) to the saved successor.
7. Return `dummy.next`.

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

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reverseBetween(head *ListNode, left int, right int) *ListNode {
    dummy := &ListNode{Val: 0, Next: head}
    prev := dummy

    for i := 0; i < left-1; i++ {
        prev = prev.Next
    }

    sublistHead := prev.Next
    sublistTail := sublistHead
    for i := 0; i < right-left; i++ {
        sublistTail = sublistTail.Next
    }

    nextNode := sublistTail.Next
    sublistTail.Next = nil
    prev.Next = reverseList(sublistHead)
    sublistHead.Next = nextNode

    return dummy.Next
}

func reverseList(head *ListNode) *ListNode {
    var prev *ListNode
    curr := head

    for curr != nil {
        temp := curr.Next
        curr.Next = prev
        prev = curr
        curr = temp
    }
    return prev
}
```

```kotlin
/**
 * Example:
 * var li = ListNode(5)
 * var v = li.`val`
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */
class Solution {
    fun reverseBetween(head: ListNode?, left: Int, right: Int): ListNode? {
        val dummy = ListNode(0)
        dummy.next = head
        var prev: ListNode? = dummy

        for (i in 0 until left - 1) {
            prev = prev?.next
        }

        val sublistHead = prev?.next
        var sublistTail = sublistHead
        for (i in 0 until right - left) {
            sublistTail = sublistTail?.next
        }

        val nextNode = sublistTail?.next
        sublistTail?.next = null
        prev?.next = reverseList(sublistHead)
        sublistHead?.next = nextNode

        return dummy.next
    }

    private fun reverseList(head: ListNode?): ListNode? {
        var prev: ListNode? = null
        var curr = head

        while (curr != null) {
            val temp = curr.next
            curr.next = prev
            prev = curr
            curr = temp
        }
        return prev
    }
}
```

```swift
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init() { self.val = 0; self.next = nil; }
 *     public init(_ val: Int) { self.val = val; self.next = nil; }
 *     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 * }
 */
class Solution {
    func reverseBetween(_ head: ListNode?, _ left: Int, _ right: Int) -> ListNode? {
        let dummy = ListNode(0, head)
        var prev: ListNode? = dummy

        for _ in 0..<(left - 1) {
            prev = prev?.next
        }

        let sublistHead = prev?.next
        var sublistTail = sublistHead
        for _ in 0..<(right - left) {
            sublistTail = sublistTail?.next
        }

        let nextNode = sublistTail?.next
        sublistTail?.next = nil
        prev?.next = reverseList(sublistHead)
        sublistHead?.next = nextNode

        return dummy.next
    }

    private func reverseList(_ head: ListNode?) -> ListNode? {
        var prev: ListNode? = nil
        var curr = head

        while curr != nil {
            let temp = curr?.next
            curr?.next = prev
            prev = curr
            curr = temp
        }
        return prev
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Iteration - II

### Intuition

This approach reverses in a single pass without explicitly detaching the sublist. After finding the node before the reversal starts, we reverse links one at a time as we traverse. The key is maintaining a reference to the original sublist head (which becomes the tail after reversal) so we can reconnect it to the node following the reversed section.

### Algorithm

1. Create a dummy node pointing to the head.
2. Traverse `left - 1` steps to position `leftPrev` (node before reversal) and `cur` (first node to reverse).
3. Reverse `right - left + 1` nodes in place:
   - Save `cur.next` as `tmpNext`.
   - Point `cur.next` to `prev`.
   - Advance `prev` to `cur` and `cur` to `tmpNext`.
4. After the loop, `prev` points to the new head of the reversed section and `cur` points to the node after it.
5. Connect `leftPrev.next.next` (original first node, now last) to `cur`.
6. Connect `leftPrev.next` to `prev`.
7. Return `dummy.next`.

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

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reverseBetween(head *ListNode, left int, right int) *ListNode {
    dummy := &ListNode{Val: 0, Next: head}
    leftPrev := dummy
    cur := head

    for i := 0; i < left-1; i++ {
        leftPrev = cur
        cur = cur.Next
    }

    var prev *ListNode
    for i := 0; i < right-left+1; i++ {
        tmpNext := cur.Next
        cur.Next = prev
        prev = cur
        cur = tmpNext
    }

    leftPrev.Next.Next = cur
    leftPrev.Next = prev

    return dummy.Next
}
```

```kotlin
/**
 * Example:
 * var li = ListNode(5)
 * var v = li.`val`
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */
class Solution {
    fun reverseBetween(head: ListNode?, left: Int, right: Int): ListNode? {
        val dummy = ListNode(0)
        dummy.next = head
        var leftPrev: ListNode? = dummy
        var cur = head

        for (i in 0 until left - 1) {
            leftPrev = cur
            cur = cur?.next
        }

        var prev: ListNode? = null
        for (i in 0 until right - left + 1) {
            val tmpNext = cur?.next
            cur?.next = prev
            prev = cur
            cur = tmpNext
        }

        leftPrev?.next?.next = cur
        leftPrev?.next = prev

        return dummy.next
    }
}
```

```swift
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init() { self.val = 0; self.next = nil; }
 *     public init(_ val: Int) { self.val = val; self.next = nil; }
 *     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 * }
 */
class Solution {
    func reverseBetween(_ head: ListNode?, _ left: Int, _ right: Int) -> ListNode? {
        let dummy = ListNode(0, head)
        var leftPrev: ListNode? = dummy
        var cur = head

        for _ in 0..<(left - 1) {
            leftPrev = cur
            cur = cur?.next
        }

        var prev: ListNode? = nil
        for _ in 0..<(right - left + 1) {
            let tmpNext = cur?.next
            cur?.next = prev
            prev = cur
            cur = tmpNext
        }

        leftPrev?.next?.next = cur
        leftPrev?.next = prev

        return dummy.next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
