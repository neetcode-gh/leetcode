## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Linked Lists** - Understanding node structure with value and next pointer, traversing linked lists
- **Dummy Node Technique** - Using a sentinel node to simplify edge cases like removing the head
- **Recursion** - Solving problems by breaking them into smaller subproblems on the remaining list
- **Pointer Manipulation** - Updating next pointers to remove nodes and maintain list integrity

---

## 1. Brute Force

### Intuition

A straightforward approach is to extract all values we want to keep into an array, then build a new linked list from scratch.
We traverse the original list, skipping nodes with the target value, and collect the remaining values.
Finally, we create new nodes from this array and link them together.
This works but requires extra space and creates entirely new nodes.

### Algorithm

1. Traverse the linked list and collect all node values that are not equal to `val` into an array.
2. If the array is empty, return `null`.
3. Create a new linked list by making nodes from each value in the array.
4. Return the head of the new list.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeElements(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:
        arr = []
        cur = head

        while cur:
            if cur.val != val:
                arr.append(cur.val)
            cur = cur.next

        if not arr:
            return None

        res = ListNode(arr[0])
        cur = res
        for i in range(1, len(arr)):
            node = ListNode(arr[i])
            cur.next = node
            cur = cur.next

        return res
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
    public ListNode removeElements(ListNode head, int val) {
        List<Integer> arr = new ArrayList<>();
        ListNode cur = head;

        while (cur != null) {
            if (cur.val != val) {
                arr.add(cur.val);
            }
            cur = cur.next;
        }

        if (arr.isEmpty()) {
            return null;
        }

        ListNode res = new ListNode(arr.get(0));
        cur = res;
        for (int i = 1; i < arr.size(); i++) {
            ListNode node = new ListNode(arr.get(i));
            cur.next = node;
            cur = cur.next;
        }

        return res;
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
    ListNode* removeElements(ListNode* head, int val) {
        vector<int> arr;
        ListNode* cur = head;

        while (cur) {
            if (cur->val != val) {
                arr.push_back(cur->val);
            }
            cur = cur->next;
        }

        if (arr.empty()) {
            return nullptr;
        }

        ListNode* res = new ListNode(arr[0]);
        cur = res;
        for (int i = 1; i < arr.size(); i++) {
            ListNode* node = new ListNode(arr[i]);
            cur->next = node;
            cur = cur->next;
        }

        return res;
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
     * @param {number} val
     * @return {ListNode}
     */
    removeElements(head, val) {
        const arr = [];
        let cur = head;

        while (cur) {
            if (cur.val !== val) {
                arr.push(cur.val);
            }
            cur = cur.next;
        }

        if (arr.length === 0) {
            return null;
        }

        const res = new ListNode(arr[0]);
        cur = res;
        for (let i = 1; i < arr.length; i++) {
            const node = new ListNode(arr[i]);
            cur.next = node;
            cur = cur.next;
        }

        return res;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val = 0, ListNode next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
public class Solution {
    public ListNode RemoveElements(ListNode head, int val) {
        List<int> arr = new List<int>();
        ListNode cur = head;

        while (cur != null) {
            if (cur.val != val) {
                arr.Add(cur.val);
            }
            cur = cur.next;
        }

        if (arr.Count == 0) {
            return null;
        }

        ListNode res = new ListNode(arr[0]);
        cur = res;
        for (int i = 1; i < arr.Count; i++) {
            ListNode node = new ListNode(arr[i]);
            cur.next = node;
            cur = cur.next;
        }

        return res;
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
func removeElements(head *ListNode, val int) *ListNode {
    arr := []int{}
    cur := head

    for cur != nil {
        if cur.Val != val {
            arr = append(arr, cur.Val)
        }
        cur = cur.Next
    }

    if len(arr) == 0 {
        return nil
    }

    res := &ListNode{Val: arr[0]}
    cur = res
    for i := 1; i < len(arr); i++ {
        node := &ListNode{Val: arr[i]}
        cur.Next = node
        cur = cur.Next
    }

    return res
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
    fun removeElements(head: ListNode?, `val`: Int): ListNode? {
        val arr = mutableListOf<Int>()
        var cur = head

        while (cur != null) {
            if (cur.`val` != `val`) {
                arr.add(cur.`val`)
            }
            cur = cur.next
        }

        if (arr.isEmpty()) {
            return null
        }

        val res = ListNode(arr[0])
        cur = res
        for (i in 1 until arr.size) {
            val node = ListNode(arr[i])
            cur!!.next = node
            cur = cur.next
        }

        return res
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
    func removeElements(_ head: ListNode?, _ val: Int) -> ListNode? {
        var arr = [Int]()
        var cur = head

        while cur != nil {
            if cur!.val != val {
                arr.append(cur!.val)
            }
            cur = cur?.next
        }

        if arr.isEmpty {
            return nil
        }

        let res = ListNode(arr[0])
        cur = res
        for i in 1..<arr.count {
            let node = ListNode(arr[i])
            cur?.next = node
            cur = cur?.next
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Recursion

### Intuition

Recursion naturally fits linked list problems because each node is structurally similar to the rest of the list.
We recursively process the remainder of the list first, then decide whether to include the current node.
If the current node matches the target value, we skip it by returning the already-processed next portion.
Otherwise, we attach the current node to the processed tail and return it.

### Algorithm

1. Base case: if the list is empty, return `null`.
2. Recursively call the function on `head.next` to process the rest of the list.
3. Attach the result to `head.next`.
4. If `head.val` equals `val`, return `head.next` to skip the current node; otherwise return `head`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeElements(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:
        if not head:
            return None
        head.next = self.removeElements(head.next, val)
        return head if head.val != val else head.next
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
    public ListNode removeElements(ListNode head, int val) {
        if (head == null) return null;
        head.next = removeElements(head.next, val);
        return head.val != val ? head : head.next;
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
    ListNode* removeElements(ListNode* head, int val) {
        if (head == nullptr) return nullptr;
        head->next = removeElements(head->next, val);
        return head->val != val ? head : head->next;
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
     * @param {number} val
     * @return {ListNode}
     */
    removeElements(head, val) {
        if (head === null) return null;
        head.next = this.removeElements(head.next, val);
        return head.val !== val ? head : head.next;
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
    public ListNode RemoveElements(ListNode head, int val) {
        if (head == null) {
            return null;
        }
        head.next = RemoveElements(head.next, val);
        return head.val != val ? head : head.next;
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
func removeElements(head *ListNode, val int) *ListNode {
    if head == nil {
        return nil
    }
    head.Next = removeElements(head.Next, val)
    if head.Val != val {
        return head
    }
    return head.Next
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
    fun removeElements(head: ListNode?, `val`: Int): ListNode? {
        if (head == null) return null
        head.next = removeElements(head.next, `val`)
        return if (head.`val` != `val`) head else head.next
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
    func removeElements(_ head: ListNode?, _ val: Int) -> ListNode? {
        guard let head = head else { return nil }
        head.next = removeElements(head.next, val)
        return head.val != val ? head : head.next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Iteration

### Intuition

To remove nodes in place without recursion, we use a dummy node to handle edge cases like removing the head.
We maintain two pointers: `prev` (the last valid node) and `curr` (the node being examined).
When we find a matching value, we bypass the current node by updating `prev.next`.
When the value does not match, we simply advance `prev`.

### Algorithm

1. Create a dummy node pointing to `head`.
2. Initialize `prev` to the dummy node and `curr` to `head`.
3. While `curr` is not `null`:
   - If `curr.val` equals `val`, set `prev.next` to `curr.next` to skip the current node.
   - Otherwise, move `prev` to `curr`.
   - Move `curr` to the next node.
4. Return `dummy.next`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeElements(self, head: ListNode, val: int) -> ListNode:
        dummy = ListNode(0, head)
        prev, curr = dummy, head

        while curr:
            nxt = curr.next
            if curr.val == val:
                prev.next = nxt
            else:
                prev = curr
            curr = nxt

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
    public ListNode removeElements(ListNode head, int val) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy, curr = head;

        while (curr != null) {
            ListNode nxt = curr.next;
            if (curr.val == val) {
                prev.next = nxt;
            } else {
                prev = curr;
            }
            curr = nxt;
        }

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
    ListNode* removeElements(ListNode* head, int val) {
        ListNode dummy(0, head);
        ListNode *prev = &dummy, *curr = head;

        while (curr) {
            ListNode* nxt = curr->next;
            if (curr->val == val) {
                prev->next = nxt;
            } else {
                prev = curr;
            }
            curr = nxt;
        }

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
     * @param {number} val
     * @return {ListNode}
     */
    removeElements(head, val) {
        let dummy = new ListNode(0, head);
        let prev = dummy,
            curr = head;

        while (curr) {
            let nxt = curr.next;
            if (curr.val === val) {
                prev.next = nxt;
            } else {
                prev = curr;
            }
            curr = nxt;
        }

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
    public ListNode RemoveElements(ListNode head, int val) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy, curr = head;

        while (curr != null) {
            ListNode nxt = curr.next;
            if (curr.val == val) {
                prev.next = nxt;
            } else {
                prev = curr;
            }
            curr = nxt;
        }

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
func removeElements(head *ListNode, val int) *ListNode {
    dummy := &ListNode{Val: 0, Next: head}
    prev, curr := dummy, head

    for curr != nil {
        nxt := curr.Next
        if curr.Val == val {
            prev.Next = nxt
        } else {
            prev = curr
        }
        curr = nxt
    }

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
    fun removeElements(head: ListNode?, `val`: Int): ListNode? {
        val dummy = ListNode(0)
        dummy.next = head
        var prev: ListNode? = dummy
        var curr = head

        while (curr != null) {
            val nxt = curr.next
            if (curr.`val` == `val`) {
                prev?.next = nxt
            } else {
                prev = curr
            }
            curr = nxt
        }

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
    func removeElements(_ head: ListNode?, _ val: Int) -> ListNode? {
        let dummy = ListNode(0, head)
        var prev: ListNode? = dummy
        var curr = head

        while curr != nil {
            let nxt = curr?.next
            if curr!.val == val {
                prev?.next = nxt
            } else {
                prev = curr
            }
            curr = nxt
        }

        return dummy.next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Iteration Without Prev Pointer

### Intuition

We can simplify the iteration by always looking ahead at the next node instead of the current one.
By checking `curr.next` rather than `curr`, we can remove nodes without needing a separate `prev` pointer.
If the next node should be removed, we skip it by updating `curr.next` directly.
Otherwise, we advance `curr` to continue scanning.

### Algorithm

1. Create a dummy node pointing to `head`.
2. Set `curr` to the dummy node.
3. While `curr.next` is not `null`:
   - If `curr.next.val` equals `val`, set `curr.next` to `curr.next.next` to remove the node.
   - Otherwise, advance `curr` to `curr.next`.
4. Return `dummy.next`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeElements(self, head: ListNode, val: int) -> ListNode:
        dummy = ListNode(-1, head)
        curr = dummy

        while curr.next:
            if curr.next.val == val:
                curr.next = curr.next.next
            else:
                curr = curr.next

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
    public ListNode removeElements(ListNode head, int val) {
        ListNode dummy = new ListNode(-1, head);
        ListNode curr = dummy;

        while (curr.next != null) {
            if (curr.next.val == val) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
            }
        }

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
    ListNode* removeElements(ListNode* head, int val) {
        ListNode dummy(-1, head);
        ListNode *curr = &dummy;

        while (curr->next) {
            if (curr->next->val == val) {
                curr->next = curr->next->next;
            } else {
                curr = curr->next;
            }
        }

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
     * @param {number} val
     * @return {ListNode}
     */
    removeElements(head, val) {
        let dummy = new ListNode(-1, head);
        let curr = dummy;

        while (curr.next) {
            if (curr.next.val === val) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
            }
        }

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
    public ListNode RemoveElements(ListNode head, int val) {
        ListNode dummy = new ListNode(-1, head);
        ListNode curr = dummy;

        while (curr.next != null) {
            if (curr.next.val == val) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
            }
        }

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
func removeElements(head *ListNode, val int) *ListNode {
    dummy := &ListNode{Val: -1, Next: head}
    curr := dummy

    for curr.Next != nil {
        if curr.Next.Val == val {
            curr.Next = curr.Next.Next
        } else {
            curr = curr.Next
        }
    }

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
    fun removeElements(head: ListNode?, `val`: Int): ListNode? {
        val dummy = ListNode(-1)
        dummy.next = head
        var curr: ListNode? = dummy

        while (curr?.next != null) {
            if (curr.next!!.`val` == `val`) {
                curr.next = curr.next!!.next
            } else {
                curr = curr.next
            }
        }

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
    func removeElements(_ head: ListNode?, _ val: Int) -> ListNode? {
        let dummy = ListNode(-1, head)
        var curr: ListNode? = dummy

        while curr?.next != nil {
            if curr!.next!.val == val {
                curr?.next = curr?.next?.next
            } else {
                curr = curr?.next
            }
        }

        return dummy.next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Not Handling Head Node Removal

When the head node itself contains the target value, returning `head` without adjustment results in incorrect output. This is why a dummy node pointing to the head is essential. The dummy node acts as a stable anchor, and returning `dummy.next` correctly handles cases where the original head is removed.

### Advancing the Pointer After Removal

When removing a node, a common mistake is advancing `curr` or `prev` immediately after the deletion. If you move `curr` forward after setting `prev.next = curr.next`, you skip the node that was just moved into position and may miss consecutive nodes with the target value. Only advance the pointer when no removal occurs; otherwise, keep it in place to check the newly linked node.
