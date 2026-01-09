## 1. Convert TO Array

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head:
            return None
        arr = []
        cur = head

        while cur:
            arr.append(cur)
            cur = cur.next

        for i in range(0, len(arr) - 1, 2):
            arr[i], arr[i + 1] = arr[i + 1], arr[i]

        for i in range(len(arr) - 1):
            arr[i].next = arr[i + 1]

        arr[-1].next = None
        return arr[0]
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
    public ListNode swapPairs(ListNode head) {
        if (head == null) return null;

        List<ListNode> arr = new ArrayList<>();
        ListNode cur = head;

        while (cur != null) {
            arr.add(cur);
            cur = cur.next;
        }

        for (int i = 0; i < arr.size() - 1; i += 2) {
            ListNode temp = arr.get(i);
            arr.set(i, arr.get(i + 1));
            arr.set(i + 1, temp);
        }

        for (int i = 0; i < arr.size() - 1; i++) {
            arr.get(i).next = arr.get(i + 1);
        }

        arr.get(arr.size() - 1).next = null;
        return arr.get(0);
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
    ListNode* swapPairs(ListNode* head) {
        if (!head) return nullptr;

        vector<ListNode*> arr;
        ListNode* cur = head;

        while (cur) {
            arr.push_back(cur);
            cur = cur->next;
        }

        for (size_t i = 0; i + 1 < arr.size(); i += 2) {
            swap(arr[i], arr[i + 1]);
        }

        for (size_t i = 0; i + 1 < arr.size(); i++) {
            arr[i]->next = arr[i + 1];
        }

        arr.back()->next = nullptr;
        return arr[0];
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
     * @return {ListNode}
     */
    swapPairs(head) {
        if (!head) return null;

        let arr = [];
        let cur = head;

        while (cur) {
            arr.push(cur);
            cur = cur.next;
        }

        for (let i = 0; i + 1 < arr.length; i += 2) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }

        for (let i = 0; i + 1 < arr.length; i++) {
            arr[i].next = arr[i + 1];
        }

        arr[arr.length - 1].next = null;
        return arr[0];
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
    public ListNode SwapPairs(ListNode head) {
        if (head == null) return null;

        var arr = new List<ListNode>();
        var cur = head;

        while (cur != null) {
            arr.Add(cur);
            cur = cur.next;
        }

        for (int i = 0; i + 1 < arr.Count; i += 2) {
            (arr[i], arr[i + 1]) = (arr[i + 1], arr[i]);
        }

        for (int i = 0; i + 1 < arr.Count; i++) {
            arr[i].next = arr[i + 1];
        }

        arr[arr.Count - 1].next = null;
        return arr[0];
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
func swapPairs(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    arr := []*ListNode{}
    cur := head

    for cur != nil {
        arr = append(arr, cur)
        cur = cur.Next
    }

    for i := 0; i+1 < len(arr); i += 2 {
        arr[i], arr[i+1] = arr[i+1], arr[i]
    }

    for i := 0; i+1 < len(arr); i++ {
        arr[i].Next = arr[i+1]
    }

    arr[len(arr)-1].Next = nil
    return arr[0]
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
    fun swapPairs(head: ListNode?): ListNode? {
        if (head == null) return null

        val arr = mutableListOf<ListNode>()
        var cur = head

        while (cur != null) {
            arr.add(cur)
            cur = cur.next
        }

        var i = 0
        while (i + 1 < arr.size) {
            val temp = arr[i]
            arr[i] = arr[i + 1]
            arr[i + 1] = temp
            i += 2
        }

        for (j in 0 until arr.size - 1) {
            arr[j].next = arr[j + 1]
        }

        arr[arr.size - 1].next = null
        return arr[0]
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
    func swapPairs(_ head: ListNode?) -> ListNode? {
        guard let head = head else { return nil }

        var arr = [ListNode]()
        var cur: ListNode? = head

        while let node = cur {
            arr.append(node)
            cur = node.next
        }

        var i = 0
        while i + 1 < arr.count {
            arr.swapAt(i, i + 1)
            i += 2
        }

        for j in 0..<(arr.count - 1) {
            arr[j].next = arr[j + 1]
        }

        arr[arr.count - 1].next = nil
        return arr[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Recursion

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        cur = head
        nxt = head.next
        cur.next = self.swapPairs(nxt.next)
        nxt.next = cur
        return nxt
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
    public ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode cur = head;
        ListNode nxt = head.next;
        cur.next = swapPairs(nxt.next);
        nxt.next = cur;

        return nxt;
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
    ListNode* swapPairs(ListNode* head) {
        if (!head || !head->next) {
            return head;
        }

        ListNode* cur = head;
        ListNode* nxt = head->next;
        cur->next = swapPairs(nxt->next);
        nxt->next = cur;

        return nxt;
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
     * @return {ListNode}
     */
    swapPairs(head) {
        if (!head || !head.next) {
            return head;
        }

        let cur = head;
        let nxt = head.next;
        cur.next = this.swapPairs(nxt.next);
        nxt.next = cur;

        return nxt;
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
    public ListNode SwapPairs(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode cur = head;
        ListNode nxt = head.next;
        cur.next = SwapPairs(nxt.next);
        nxt.next = cur;

        return nxt;
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
func swapPairs(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }

    cur := head
    nxt := head.Next
    cur.Next = swapPairs(nxt.Next)
    nxt.Next = cur

    return nxt
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
    fun swapPairs(head: ListNode?): ListNode? {
        if (head == null || head.next == null) {
            return head
        }

        val cur = head
        val nxt = head.next
        cur.next = swapPairs(nxt?.next)
        nxt?.next = cur

        return nxt
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
    func swapPairs(_ head: ListNode?) -> ListNode? {
        if head == nil || head?.next == nil {
            return head
        }

        let cur = head
        let nxt = head?.next
        cur?.next = swapPairs(nxt?.next)
        nxt?.next = cur

        return nxt
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Iteration

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        prev, curr = dummy, head

        while curr and curr.next:
            nxtPair = curr.next.next
            second = curr.next

            # Reverse this pair
            second.next = curr
            curr.next = nxtPair
            prev.next = second

            # Update pointers
            prev = curr
            curr = nxtPair

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
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy, curr = head;

        while (curr != null && curr.next != null) {
            ListNode nxtPair = curr.next.next;
            ListNode second = curr.next;

            // Reverse this pair
            second.next = curr;
            curr.next = nxtPair;
            prev.next = second;

            // Update pointers
            prev = curr;
            curr = nxtPair;
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
    ListNode* swapPairs(ListNode* head) {
        ListNode dummy(0, head);
        ListNode* prev = &dummy, *curr = head;

        while (curr && curr->next) {
            ListNode* nxtPair = curr->next->next;
            ListNode* second = curr->next;

            // Reverse this pair
            second->next = curr;
            curr->next = nxtPair;
            prev->next = second;

            // Update pointers
            prev = curr;
            curr = nxtPair;
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
     * @return {ListNode}
     */
    swapPairs(head) {
        let dummy = new ListNode(0, head);
        let prev = dummy,
            curr = head;

        while (curr && curr.next) {
            let nxtPair = curr.next.next;
            let second = curr.next;

            // Reverse this pair
            second.next = curr;
            curr.next = nxtPair;
            prev.next = second;

            // Update pointers
            prev = curr;
            curr = nxtPair;
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
    public ListNode SwapPairs(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy, curr = head;

        while (curr != null && curr.next != null) {
            ListNode nxtPair = curr.next.next;
            ListNode second = curr.next;

            // Reverse this pair
            second.next = curr;
            curr.next = nxtPair;
            prev.next = second;

            // Update pointers
            prev = curr;
            curr = nxtPair;
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
func swapPairs(head *ListNode) *ListNode {
    dummy := &ListNode{Val: 0, Next: head}
    prev, curr := dummy, head

    for curr != nil && curr.Next != nil {
        nxtPair := curr.Next.Next
        second := curr.Next

        // Reverse this pair
        second.Next = curr
        curr.Next = nxtPair
        prev.Next = second

        // Update pointers
        prev = curr
        curr = nxtPair
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
    fun swapPairs(head: ListNode?): ListNode? {
        val dummy = ListNode(0).apply { next = head }
        var prev: ListNode? = dummy
        var curr = head

        while (curr != null && curr.next != null) {
            val nxtPair = curr.next?.next
            val second = curr.next

            // Reverse this pair
            second?.next = curr
            curr.next = nxtPair
            prev?.next = second

            // Update pointers
            prev = curr
            curr = nxtPair
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
    func swapPairs(_ head: ListNode?) -> ListNode? {
        let dummy = ListNode(0, head)
        var prev: ListNode? = dummy
        var curr = head

        while curr != nil && curr?.next != nil {
            let nxtPair = curr?.next?.next
            let second = curr?.next

            // Reverse this pair
            second?.next = curr
            curr?.next = nxtPair
            prev?.next = second

            // Update pointers
            prev = curr
            curr = nxtPair
        }

        return dummy.next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
