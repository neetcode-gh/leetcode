## 1. Brute Force

### Intuition
We store all nodes in an array so we can directly access the node that is `n` positions from the end.  
Once we know which node to delete, we simply adjust the `next` pointer of the previous node.

### Algorithm
1. Traverse the linked list and push every node into an array.
2. Compute the index of the node to remove: `len(nodes) - n`.
3. If this index is `0`, it means the head must be removed → return `head.next`.
4. Otherwise, connect `nodes[removeIndex - 1].next` to `nodes[removeIndex].next`.
5. Return the updated head.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        nodes = []
        cur = head
        while cur:
            nodes.append(cur)
            cur = cur.next

        removeIndex = len(nodes) - n
        if removeIndex == 0:
            return head.next

        nodes[removeIndex - 1].next = nodes[removeIndex].next
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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        List<ListNode> nodes = new ArrayList<>();
        ListNode cur = head;
        while (cur != null) {
            nodes.add(cur);
            cur = cur.next;
        }

        int removeIndex = nodes.size() - n;
        if (removeIndex == 0) {
            return head.next;
        }

        nodes.get(removeIndex - 1).next = nodes.get(removeIndex).next;
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
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        vector<ListNode*> nodes;
        ListNode* cur = head;
        while (cur != nullptr) {
            nodes.push_back(cur);
            cur = cur->next;
        }

        int removeIndex = nodes.size() - n;
        if (removeIndex == 0) {
            return head->next;
        }

        nodes[removeIndex - 1]->next = nodes[removeIndex]->next;
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
     * @param {number} n
     * @return {ListNode}
     */
    removeNthFromEnd(head, n) {
        const nodes = [];
        let cur = head;
        while (cur) {
            nodes.push(cur);
            cur = cur.next;
        }

        const removeIndex = nodes.length - n;
        if (removeIndex === 0) {
            return head.next;
        }

        nodes[removeIndex - 1].next = nodes[removeIndex].next;
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
    public ListNode RemoveNthFromEnd(ListNode head, int n) {
        var nodes = new List<ListNode>();
        var cur = head;
        while (cur != null) {
            nodes.Add(cur);
            cur = cur.next;
        }

        int removeIndex = nodes.Count - n;
        if (removeIndex == 0) {
            return head.next;
        }

        nodes[removeIndex - 1].next = nodes[removeIndex].next;
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
func removeNthFromEnd(head *ListNode, n int) *ListNode {
    nodes := []*ListNode{}
    cur := head
    for cur != nil {
        nodes = append(nodes, cur)
        cur = cur.Next
    }

    removeIndex := len(nodes) - n
    if removeIndex == 0 {
        return head.Next
    }

    nodes[removeIndex-1].Next = nodes[removeIndex].Next
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
    fun removeNthFromEnd(head: ListNode?, n: Int): ListNode? {
        val nodes = mutableListOf<ListNode?>()
        var cur = head

        while (cur != null) {
            nodes.add(cur)
            cur = cur.next
        }

        val removeIndex = nodes.size - n
        if (removeIndex == 0) {
            return head?.next
        }

        nodes[removeIndex - 1]?.next = nodes[removeIndex]?.next
        return head
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
    func removeNthFromEnd(_ head: ListNode?, _ n: Int) -> ListNode? {
        var nodes: [ListNode] = []
        var cur = head

        while cur != nil {
            nodes.append(cur!)
            cur = cur?.next
        }

        let removeIndex = nodes.count - n
        if removeIndex == 0 {
            return head?.next
        }

        nodes[removeIndex - 1].next = nodes[removeIndex].next
        return head
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

---

## 2. Iteration (Two Pass)

### Intuition
We first count how many nodes are in the list.  
Once we know the total length, the node to delete is at position `N - n` from the start.  
We run a second pass to reach the node just before it and skip it.

### Algorithm
1. Traverse the list once to compute total nodes `N`.
2. Compute `removeIndex = N - n`.
3. If `removeIndex == 0`, delete the head → return `head.next`.
4. Traverse again until reaching the node before `removeIndex`.
5. Update its `next` pointer to skip the unwanted node.
6. Return the modified head.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        N = 0
        cur = head
        while cur:
            N += 1
            cur = cur.next

        removeIndex = N - n
        if removeIndex == 0:
            return head.next

        cur = head
        for i in range(N - 1):
            if (i + 1) == removeIndex:
                cur.next = cur.next.next
                break
            cur = cur.next
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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        int N = 0;
        ListNode cur = head;
        while (cur != null) {
            N++;
            cur = cur.next;
        }

        int removeIndex = N - n;
        if (removeIndex == 0) {
            return head.next;
        }

        cur = head;
        for (int i = 0; i < N - 1; i++) {
            if ((i + 1) == removeIndex) {
                cur.next = cur.next.next;
                break;
            }
            cur = cur.next;
        }
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
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        int N = 0;
        ListNode* cur = head;
        while (cur != nullptr) {
            N++;
            cur = cur->next;
        }

        int removeIndex = N - n;
        if (removeIndex == 0) {
            return head->next;
        }

        cur = head;
        for (int i = 0; i < N - 1; i++) {
            if ((i + 1) == removeIndex) {
                cur->next = cur->next->next;
                break;
            }
            cur = cur->next;
        }
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
     * @param {number} n
     * @return {ListNode}
     */
    removeNthFromEnd(head, n) {
        let N = 0;
        let cur = head;
        while (cur) {
            N++;
            cur = cur.next;
        }

        const removeIndex = N - n;
        if (removeIndex === 0) {
            return head.next;
        }

        cur = head;
        for (let i = 0; i < N - 1; i++) {
            if (i + 1 === removeIndex) {
                cur.next = cur.next.next;
                break;
            }
            cur = cur.next;
        }
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
    public ListNode RemoveNthFromEnd(ListNode head, int n) {
        int N = 0;
        ListNode cur = head;
        while (cur != null) {
            N++;
            cur = cur.next;
        }

        int removeIndex = N - n;
        if (removeIndex == 0) {
            return head.next;
        }

        cur = head;
        for (int i = 0; i < N - 1; i++) {
            if (i + 1 == removeIndex) {
                cur.next = cur.next.next;
                break;
            }
            cur = cur.next;
        }
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
func removeNthFromEnd(head *ListNode, n int) *ListNode {
    N := 0
    cur := head
    for cur != nil {
        N++
        cur = cur.Next
    }

    removeIndex := N - n
    if removeIndex == 0 {
        return head.Next
    }

    cur = head
    for i := 0; i < N-1; i++ {
        if (i + 1) == removeIndex {
            cur.Next = cur.Next.Next
            break
        }
        cur = cur.Next
    }
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
    fun removeNthFromEnd(head: ListNode?, n: Int): ListNode? {
        var N = 0
        var cur = head

        while (cur != null) {
            N++
            cur = cur.next
        }

        val removeIndex = N - n
        if (removeIndex == 0) {
            return head?.next
        }

        cur = head
        for (i in 0 until N - 1) {
            if (i + 1 == removeIndex) {
                cur?.next = cur?.next?.next
                break
            }
            cur = cur?.next
        }
        return head
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
    func removeNthFromEnd(_ head: ListNode?, _ n: Int) -> ListNode? {
        var N = 0
        var cur = head
        while cur != nil {
            N += 1
            cur = cur?.next
        }

        let removeIndex = N - n
        if removeIndex == 0 {
            return head?.next
        }

        cur = head
        for i in 0..<(N - 1) {
            if (i + 1) == removeIndex {
                cur?.next = cur?.next?.next
                break
            }
            cur = cur?.next
        }
        return head
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(1)$

---

## 3. Recursion

### Intuition
Recursion naturally processes the list from the end toward the start.  
When the recursive calls unwind, we count backwards.  
When the count reaches the nth node from the end, we skip it by returning `head.next` instead of the current node.

### Algorithm
1. Recursively go to the end of the list.
2. As recursion unwinds, decrement `n` each time you return.
3. When `n` becomes 0, this is the node to delete → return its `next` node.
4. Otherwise, return the current node to rebuild the list.
5. The head of the resulting rebuilt list is the final answer.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def rec(self, head, n):
        if not head:
            return None

        head.next = self.rec(head.next, n)
        n[0] -= 1
        if n[0] == 0:
            return head.next
        return head

    def removeNthFromEnd(self, head, n):
        return self.rec(head, [n])
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
    public ListNode rec(ListNode head, int[] n) {
        if (head == null) {
            return null;
        }

        head.next = rec(head.next, n);
        n[0]--;
        if (n[0] == 0) {
            return head.next;
        }
        return head;
    }

    public ListNode removeNthFromEnd(ListNode head, int n) {
        return rec(head, new int[]{n});
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
    ListNode* rec(ListNode* head, int& n) {
        if (!head) {
            return NULL;
        }

        head -> next = rec(head -> next, n);
        n--;
        if (n == 0) {
            return head -> next;
        }
        return head;
    }

    ListNode* removeNthFromEnd(ListNode* head, int n) {
        return rec(head, n);
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
     * @param {number[]} n
     * @return {ListNode}
     */
    rec(head, n) {
        if (!head) {
            return null;
        }

        head.next = this.rec(head.next, n);
        n[0]--;
        if (n[0] === 0) {
            return head.next;
        }
        return head;
    }

    /**
     * @param {ListNode} head
     * @param {number} n
     * @return {ListNode}
     */
    removeNthFromEnd(head, n) {
        return this.rec(head, [n]);
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
    public ListNode rec(ListNode head, ref int n) {
        if (head == null) {
            return null;
        }

        head.next = rec(head.next, ref n);
        n--;
        if (n == 0) {
            return head.next;
        }
        return head;
    }

    public ListNode RemoveNthFromEnd(ListNode head, int n) {
        return rec(head, ref n);
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
func rec(head *ListNode, n *int) *ListNode {
    if head == nil {
        return nil
    }

    head.Next = rec(head.Next, n)
    (*n)--

    if *n == 0 {
        return head.Next
    }
    return head
}

func removeNthFromEnd(head *ListNode, n int) *ListNode {
    return rec(head, &n)
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
    private fun rec(head: ListNode?, n: IntArray): ListNode? {
        if (head == null) {
            return null
        }

        head.next = rec(head.next, n)
        n[0]--

        return if (n[0] == 0) {
            head.next
        } else {
            head
        }
    }

    fun removeNthFromEnd(head: ListNode?, n: Int): ListNode? {
        return rec(head, intArrayOf(n))
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
    func rec(_ head: ListNode?, _ n: inout Int) -> ListNode? {
        if head == nil {
            return nil
        }

        head?.next = rec(head?.next, &n)
        n -= 1
        if n == 0 {
            return head?.next
        }
        return head
    }

    func removeNthFromEnd(_ head: ListNode?, _ n: Int) -> ListNode? {
        var n = n
        return rec(head, &n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$ for recursion stack.

---

## 4. Two Pointers

### Intuition
Use two pointers so that the gap between them is exactly `n`.  
Move the right pointer `n` steps ahead first.  
Then move both pointers together.  
When the right pointer reaches the end, the left pointer will be just before the node we must remove.  
This avoids counting the entire list and removes the target in one pass.

### Algorithm
1. Create a dummy node pointing to the head (helps handle deletion of the first node).
2. Set two pointers:  
   - `left` at dummy  
   - `right` at head
3. Move `right` forward `n` steps.
4. Move both pointers until `right` reaches the end.
5. Now `left.next` is the node to delete → skip it by doing `left.next = left.next.next`.
6. Return `dummy.next` as the updated head.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        left = dummy
        right = head

        while n > 0:
            right = right.next
            n -= 1

        while right:
            left = left.next
            right = right.next

        left.next = left.next.next
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

class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode left = dummy;
        ListNode right = head;

        while (n > 0) {
            right = right.next;
            n--;
        }

        while (right != null) {
            left = left.next;
            right = right.next;
        }

        left.next = left.next.next;
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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* left = dummy;
        ListNode* right = head;

        while (n > 0) {
            right = right->next;
            n--;
        }

        while (right != nullptr) {
            left = left->next;
            right = right->next;
        }

        left->next = left->next->next;
        return dummy->next;
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
     * @param {number} n
     * @return {ListNode}
     */
    removeNthFromEnd(head, n) {
        const dummy = new ListNode(0, head);
        let left = dummy;
        let right = head;

        while (n > 0) {
            right = right.next;
            n--;
        }

        while (right !== null) {
            left = left.next;
            right = right.next;
        }

        left.next = left.next.next;
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
    public ListNode RemoveNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode left = dummy;
        ListNode right = head;

        while (n > 0) {
            right = right.next;
            n--;
        }

        while (right != null) {
            left = left.next;
            right = right.next;
        }

        left.next = left.next.next;
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
func removeNthFromEnd(head *ListNode, n int) *ListNode {
    dummy := &ListNode{Next: head}
    left := dummy
    right := head

    for n > 0 {
        right = right.Next
        n--
    }

    for right != nil {
        left = left.Next
        right = right.Next
    }

    left.Next = left.Next.Next
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
    fun removeNthFromEnd(head: ListNode?, n: Int): ListNode? {
        val dummy = ListNode(0).apply { next = head }
        var left: ListNode? = dummy
        var right: ListNode? = head

        var count = n
        while (count > 0) {
            right = right?.next
            count--
        }

        while (right != null) {
            left = left?.next
            right = right.next
        }

        left?.next = left?.next?.next
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
    func removeNthFromEnd(_ head: ListNode?, _ n: Int) -> ListNode? {
        let dummy = ListNode(0, head)
        var left: ListNode? = dummy
        var right: ListNode? = head
        var n = n

        while n > 0 {
            right = right?.next
            n -= 1
        }

        while right != nil {
            left = left?.next
            right = right?.next
        }

        left?.next = left?.next?.next
        return dummy.next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(1)$
