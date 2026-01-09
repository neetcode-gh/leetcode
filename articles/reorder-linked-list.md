## 1. Brute Force

### Intuition

To reorder the linked list in the pattern:

**L0 → Ln → L1 → L(n−1) → L2 → ...**

A straightforward approach is to **store all nodes in an array**.
Once stored, we can easily access nodes from both the start and end using two pointers.
By alternately linking nodes from the front (index `i`) and back (index `j`), we can reshape the list in the required order.

### Algorithm

1. Traverse the linked list and push every node into an array called `nodes`.
2. Initialize two pointers:
   - `i = 0` (start)
   - `j = len(nodes) - 1` (end)
3. While `i < j`:
   - Link `nodes[i].next` to `nodes[j]`; increment `i`.
   - If `i >= j`, break the loop.
   - Link `nodes[j].next` to `nodes[i]`; decrement `j`.
4. After the loop, set `nodes[i].next = None` to terminate the list.
5. The reordered list is constructed in-place.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        if not head:
            return

        nodes = []
        cur = head
        while cur:
            nodes.append(cur)
            cur = cur.next

        i, j = 0, len(nodes) - 1
        while i < j:
            nodes[i].next = nodes[j]
            i += 1
            if i >= j:
                break
            nodes[j].next = nodes[i]
            j -= 1

        nodes[i].next = None
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
    public void reorderList(ListNode head) {
        if (head == null) {
            return;
        }

        List<ListNode> nodes = new ArrayList<>();
        ListNode cur = head;
        while (cur != null) {
            nodes.add(cur);
            cur = cur.next;
        }

        int i = 0, j = nodes.size() - 1;
        while (i < j) {
            nodes.get(i).next = nodes.get(j);
            i++;
            if (i >= j) {
                break;
            }
            nodes.get(j).next = nodes.get(i);
            j--;
        }

        nodes.get(i).next = null;
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
    void reorderList(ListNode* head) {
        if (!head) return;

        vector<ListNode*> nodes;
        ListNode* cur = head;
        while (cur) {
            nodes.push_back(cur);
            cur = cur->next;
        }

        int i = 0, j = nodes.size() - 1;
        while (i < j) {
            nodes[i]->next = nodes[j];
            i++;
            if (i >= j) break;
            nodes[j]->next = nodes[i];
            j--;
        }

        nodes[i]->next = nullptr;
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
     * @return {void}
     */
    reorderList(head) {
        if (!head) return;

        const nodes = [];
        let cur = head;
        while (cur) {
            nodes.push(cur);
            cur = cur.next;
        }

        let i = 0,
            j = nodes.length - 1;
        while (i < j) {
            nodes[i].next = nodes[j];
            i++;
            if (i >= j) break;
            nodes[j].next = nodes[i];
            j--;
        }

        nodes[i].next = null;
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
    public void ReorderList(ListNode head) {
        if (head == null) return;

        List<ListNode> nodes = new List<ListNode>();
        ListNode cur = head;
        while (cur != null) {
            nodes.Add(cur);
            cur = cur.next;
        }

        int i = 0, j = nodes.Count - 1;
        while (i < j) {
            nodes[i].next = nodes[j];
            i++;
            if (i >= j) break;
            nodes[j].next = nodes[i];
            j--;
        }

        nodes[i].next = null;
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
func reorderList(head *ListNode) {
    if head == nil {
        return
    }

    nodes := []*ListNode{}
    cur := head
    for cur != nil {
        nodes = append(nodes, cur)
        cur = cur.Next
    }

    i, j := 0, len(nodes)-1
    for i < j {
        nodes[i].Next = nodes[j]
        i++
        if i >= j {
            break
        }
        nodes[j].Next = nodes[i]
        j--
    }

    nodes[i].Next = nil
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
    fun reorderList(head: ListNode?) {
        if (head == null) return

        val nodes = mutableListOf<ListNode>()
        var cur: ListNode? = head
        while (cur != null) {
            nodes.add(cur)
            cur = cur.next
        }

        var i = 0
        var j = nodes.size - 1
        while (i < j) {
            nodes[i].next = nodes[j]
            i++
            if (i >= j) break
            nodes[j].next = nodes[i]
            j--
        }

        nodes[i].next = null
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
    func reorderList(_ head: ListNode?) {
        if head == nil {
            return
        }

        var nodes: [ListNode] = []
        var cur = head

        while cur != nil {
            nodes.append(cur!)
            cur = cur?.next
        }

        var i = 0, j = nodes.count - 1
        while i < j {
            nodes[i].next = nodes[j]
            i += 1
            if i >= j {
                break
            }
            nodes[j].next = nodes[i]
            j -= 1
        }

        nodes[i].next = nil
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

This recursive approach reorders the list by pairing nodes from the **front** and **back** during the recursion unwind phase.

The idea is:
- Move to the end of the list using recursion.
- On the way back up (unwinding), connect the current node from the end (`cur`) to the corresponding node from the front (`root`).
- Advance the front pointer (`root`) step-by-step as recursion unwinds.
- Stop when the pointers meet or cross.

Recursion naturally processes the list from back to front, making it convenient to match front and back nodes without using extra lists.

### Algorithm

1. Define a recursive function `rec(root, cur)`:
   - `cur` moves to the end of the list via recursion.
   - `root` marks the current front node during unwinding.
2. In the base case:
   - If `cur` is `None`, return the front pointer (`root`).
3. Recursively call `rec` on `cur.next` to reach the tail.
4. During unwinding:
   - If `root` meets or crosses `cur`, set `cur.next = None` to finish and stop further links.
   - Otherwise:
     - Temporarily save `root.next` in `tmp`.
     - Link `root.next → cur`.
     - Link `cur.next → tmp`.
5. Return the next node (`tmp`) as the updated front pointer.
6. Start recursion with `rec(head, head.next)`.

This reorders the list in place without extra storage.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:

        def rec(root: ListNode, cur: ListNode) -> ListNode:
            if not cur:
                return root

            root = rec(root, cur.next)
            if not root:
                return None

            tmp = None
            if root == cur or root.next == cur:
                cur.next = None
            else:
                tmp = root.next
                root.next = cur
                cur.next = tmp

            return tmp

        head = rec(head, head.next)
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
    public void reorderList(ListNode head) {
        head = rec(head, head.next);
    }

    private ListNode rec(ListNode root, ListNode cur) {
        if (cur == null) {
            return root;
        }

        root = rec(root, cur.next);
        if (root == null) {
            return null;
        }

        ListNode tmp = null;
        if (root == cur || root.next == cur) {
            cur.next = null;
        } else {
            tmp = root.next;
            root.next = cur;
            cur.next = tmp;
        }

        return tmp;
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
    void reorderList(ListNode* head) {
        head = rec(head, head->next);
    }

private:
    ListNode* rec(ListNode* root, ListNode* cur) {
        if (cur == nullptr) {
            return root;
        }

        root = rec(root, cur->next);
        if (root == nullptr) {
            return nullptr;
        }

        ListNode* tmp = nullptr;
        if (root == cur || root->next == cur) {
            cur->next = nullptr;
        } else {
            tmp = root->next;
            root->next = cur;
            cur->next = tmp;
        }

        return tmp;
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
     * @return {void}
     */
    reorderList(head) {
        head = this.rec(head, head.next);
    }

    /**
     * @param {ListNode} root
     * @param {ListNode} cur
     * @return {ListNode}
     */
    rec(root, cur) {
        if (cur === null) {
            return root;
        }

        root = this.rec(root, cur.next);
        if (root === null) {
            return null;
        }

        let tmp = null;
        if (root === cur || root.next === cur) {
            cur.next = null;
        } else {
            tmp = root.next;
            root.next = cur;
            cur.next = tmp;
        }

        return tmp;
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
    public void ReorderList(ListNode head) {
        head = Rec(head, head.next);
    }

    private ListNode Rec(ListNode root, ListNode cur) {
        if (cur == null) {
            return root;
        }

        root = Rec(root, cur.next);
        if (root == null) {
            return null;
        }

        ListNode tmp = null;
        if (root == cur || root.next == cur) {
            cur.next = null;
        } else {
            tmp = root.next;
            root.next = cur;
            cur.next = tmp;
        }

        return tmp;
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
func reorderList(head *ListNode) {
    if head == nil {
        return
    }

    var rec func(root, cur *ListNode) *ListNode
    rec = func(root, cur *ListNode) *ListNode {
        if cur == nil {
            return root
        }

        root = rec(root, cur.Next)
        if root == nil {
            return nil
        }

        var tmp *ListNode
        if root == cur || root.Next == cur {
            cur.Next = nil
        } else {
            tmp = root.Next
            root.Next = cur
            cur.Next = tmp
        }

        return tmp
    }

    rec(head, head.Next)
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
    fun reorderList(head: ListNode?) {
        if (head == null) return

        fun rec(root: ListNode?, cur: ListNode?): ListNode? {
            if (cur == null) {
                return root
            }

            var updatedRoot = rec(root, cur.next)
            if (updatedRoot == null) {
                return null
            }

            var tmp: ListNode? = null
            if (updatedRoot == cur || updatedRoot?.next == cur) {
                cur.next = null
            } else {
                tmp = updatedRoot.next
                updatedRoot.next = cur
                cur.next = tmp
            }

            return tmp
        }

        rec(head, head.next)
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
    func reorderList(_ head: ListNode?) {
        func rec(_ root: ListNode?, _ cur: ListNode?) -> ListNode? {
            if cur == nil {
                return root
            }

            var root = rec(root, cur?.next)
            if root == nil {
                return nil
            }

            var tmp: ListNode? = nil
            if root === cur || root?.next === cur {
                cur?.next = nil
            } else {
                tmp = root?.next
                root?.next = cur
                cur?.next = tmp
            }

            return tmp
        }

        rec(head, head?.next)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Reverse And Merge

### Intuition

To reorder the list into the pattern
**L1 → Ln → L2 → Ln−1 → L3 → Ln−2 → ...**,
we can break the problem into **three simple steps**:

1. **Find the middle** of the linked list using `slow` and `fast` pointers.
   This splits the list into two halves.

2. **Reverse the second half** of the list.
   Doing this makes it easy to merge nodes from the front and back alternately.

3. **Merge the two halves** one-by-one:
   Take one node from the first half (`first`), then one from the reversed second half (`second`), and repeat.

This method is clean, intuitive, and uses only `O(1)` extra space.

### Algorithm

1. **Find the middle**:
   - Use `slow` and `fast` pointers.
   - When `fast` reaches the end, `slow` will be at the midpoint.

2. **Reverse the second half**:
   - Start from `slow.next`.
   - Reverse it using the standard linked-list reversal approach with `prev` and `tmp` variables.

3. **Merge the two lists**:
   - Take a node from `first` half.
   - Take a node from the reversed `second` half.
   - Continue until `second` is exhausted.

This produces the desired reordered list in-place with no extra memory.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        slow, fast = head, head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        second = slow.next
        prev = slow.next = None
        while second:
            tmp = second.next
            second.next = prev
            prev = second
            second = tmp

        first, second = head, prev
        while second:
            tmp1, tmp2 = first.next, second.next
            first.next = second
            second.next = tmp1
            first, second = tmp1, tmp2
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
    public void reorderList(ListNode head) {
        ListNode slow = head;
        ListNode fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode second = slow.next;
        ListNode prev = slow.next = null;
        while (second != null) {
            ListNode tmp = second.next;
            second.next = prev;
            prev = second;
            second = tmp;
        }

        ListNode first = head;
        second = prev;
        while (second != null) {
            ListNode tmp1 = first.next;
            ListNode tmp2 = second.next;
            first.next = second;
            second.next = tmp1;
            first = tmp1;
            second = tmp2;
        }
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
    void reorderList(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head->next;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }

        ListNode* second = slow->next;
        ListNode* prev = slow->next = nullptr;
        while (second != nullptr) {
            ListNode* tmp = second->next;
            second->next = prev;
            prev = second;
            second = tmp;
        }

        ListNode* first = head;
        second = prev;
        while (second != nullptr) {
            ListNode* tmp1 = first->next;
            ListNode* tmp2 = second->next;
            first->next = second;
            second->next = tmp1;
            first = tmp1;
            second = tmp2;
        }
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
     * @return {void}
     */
    reorderList(head) {
        let slow = head;
        let fast = head.next;
        while (fast !== null && fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        let second = slow.next;
        let prev = (slow.next = null);
        while (second !== null) {
            const tmp = second.next;
            second.next = prev;
            prev = second;
            second = tmp;
        }

        let first = head;
        second = prev;
        while (second !== null) {
            const tmp1 = first.next;
            const tmp2 = second.next;
            first.next = second;
            second.next = tmp1;
            first = tmp1;
            second = tmp2;
        }
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
    public void ReorderList(ListNode head) {
        ListNode slow = head;
        ListNode fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode second = slow.next;
        ListNode prev = slow.next = null;
        while (second != null) {
            ListNode tmp = second.next;
            second.next = prev;
            prev = second;
            second = tmp;
        }

        ListNode first = head;
        second = prev;
        while (second != null) {
            ListNode tmp1 = first.next;
            ListNode tmp2 = second.next;
            first.next = second;
            second.next = tmp1;
            first = tmp1;
            second = tmp2;
        }
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
func reorderList(head *ListNode) {
    if head == nil || head.Next == nil {
        return
    }

    slow, fast := head, head.Next
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }

    second := slow.Next
    slow.Next = nil
    var prev *ListNode
    for second != nil {
        tmp := second.Next
        second.Next = prev
        prev = second
        second = tmp
    }

    first := head
    second = prev
    for second != nil {
        tmp1, tmp2 := first.Next, second.Next
        first.Next = second
        second.Next = tmp1
        first, second = tmp1, tmp2
    }
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
    fun reorderList(head: ListNode?) {
        if (head == null || head.next == null) return

        var slow: ListNode? = head
        var fast: ListNode? = head.next
        while (fast != null && fast.next != null) {
            slow = slow?.next
            fast = fast.next.next
        }

        val second = slow?.next
        slow?.next = null
        var prev: ListNode? = null
        var curr = second
        while (curr != null) {
            val tmp = curr.next
            curr.next = prev
            prev = curr
            curr = tmp
        }

        var first: ListNode? = head
        var secondList: ListNode? = prev
        while (first != null && secondList != null) {
            val tmp1 = first.next
            val tmp2 = secondList.next
            first.next = secondList
            secondList.next = tmp1
            first = tmp1
            secondList = tmp2
        }
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
    func reorderList(_ head: ListNode?) {
        var slow = head, fast = head?.next
        while fast != nil && fast?.next != nil {
            slow = slow?.next
            fast = fast?.next?.next
        }

        var second = slow?.next
        var prev: ListNode? = nil
        slow?.next = nil

        while second != nil {
            let tmp = second?.next
            second?.next = prev
            prev = second
            second = tmp
        }

        var first = head
        second = prev

        while second != nil {
            let tmp1 = first?.next
            let tmp2 = second?.next
            first?.next = second
            second?.next = tmp1
            first = tmp1
            second = tmp2
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
