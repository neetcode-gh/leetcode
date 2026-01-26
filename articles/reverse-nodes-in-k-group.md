## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Linked Lists** - Understanding node structure, traversal, and pointer manipulation
- **Recursion** - Breaking problems into subproblems and handling base cases
- **Linked List Reversal** - Reversing a linked list using pointer manipulation
- **Dummy Nodes** - Using sentinel nodes to simplify edge cases at the head of a list

---

## 1. Recursion

### Intuition

To reverse nodes in groups of **k**, we first check whether the current segment contains at least **k** nodes.
- If **fewer than k**, we leave the nodes as they are.
- If we **do** have k nodes, then:
  1. **Recursively** reverse the rest of the list starting from the node after these k nodes.
  2. Then reverse the current group of k nodes.
  3. Attach the reversed group to the already-processed remainder.

This gives a clean top-down approach:
**solve the rest of the list first, then fix the current group.**

### Algorithm

1. Start at the given `head` and try to move forward `k` nodes.
   - Count how many nodes are available using counter `group`.
   - If fewer than `k`, return the current `head` unchanged.

2. If exactly `k` nodes exist:
   - Recursively call the function on the node after these `k` nodes (`cur`).
     - This returns the head of the reversed remainder.
   - Reverse the current group of `k` nodes:
     - For each of the `k` nodes:
       - Temporarily store `head.next` in `tmp`
       - Point `head.next` to the result of the recursive call
       - Move forward
   - After reversing all `k` nodes, return the new head of this group.

3. The recursion ensures each segment is reversed and correctly connected to the next processed segment.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        cur = head
        group = 0
        while cur and group < k:
            cur = cur.next
            group += 1

        if group == k:
            cur = self.reverseKGroup(cur, k)
            while group > 0:
                tmp = head.next
                head.next = cur
                cur = head
                head = tmp
                group -= 1
            head = cur
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
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode cur = head;
        int group = 0;
        while (cur != null && group < k) {
            cur = cur.next;
            group++;
        }

        if (group == k) {
            cur = reverseKGroup(cur, k);
            while (group-- > 0) {
                ListNode tmp = head.next;
                head.next = cur;
                cur = head;
                head = tmp;
            }
            head = cur;
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
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* cur = head;
        int group = 0;
        while (cur != nullptr && group < k) {
            cur = cur->next;
            group++;
        }

        if (group == k) {
            cur = reverseKGroup(cur, k);
            while (group-- > 0) {
                ListNode* tmp = head->next;
                head->next = cur;
                cur = head;
                head = tmp;
            }
            head = cur;
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
     * @param {number} k
     * @return {ListNode}
     */
    reverseKGroup(head, k) {
        let cur = head;
        let group = 0;
        while (cur && group < k) {
            cur = cur.next;
            group++;
        }

        if (group === k) {
            cur = this.reverseKGroup(cur, k);
            while (group-- > 0) {
                let tmp = head.next;
                head.next = cur;
                cur = head;
                head = tmp;
            }
            head = cur;
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
    public ListNode ReverseKGroup(ListNode head, int k) {
        ListNode cur = head;
        int group = 0;
        while (cur != null && group < k) {
            cur = cur.next;
            group++;
        }

        if (group == k) {
            cur = ReverseKGroup(cur, k);
            while (group-- > 0) {
                ListNode tmp = head.next;
                head.next = cur;
                cur = head;
                head = tmp;
            }
            head = cur;
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
func reverseKGroup(head *ListNode, k int) *ListNode {
    cur := head
    group := 0

    for cur != nil && group < k {
        cur = cur.Next
        group++
    }

    if group == k {
        cur = reverseKGroup(cur, k)
        for group > 0 {
            tmp := head.Next
            head.Next = cur
            cur = head
            head = tmp
            group--
        }
        head = cur
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
    fun reverseKGroup(head: ListNode?, k: Int): ListNode? {
        var cur = head
        var group = 0

        while (cur != null && group < k) {
            cur = cur.next
            group++
        }

        return if (group == k) {
            cur = reverseKGroup(cur, k)
            var newHead: ListNode? = null
            var tempHead = head

            while (group > 0) {
                val tmp = tempHead!!.next
                tempHead.next = cur
                cur = tempHead
                tempHead = tmp
                group--
            }
            cur
        } else {
            head
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
    func reverseKGroup(_ head: ListNode?, _ k: Int) -> ListNode? {
        var cur = head
        var group = 0

        while cur != nil && group < k {
            cur = cur!.next
            group += 1
        }

        if group == k {
            cur = reverseKGroup(cur, k)

            var tempHead = head
            while group > 0 {
                let tmp = tempHead!.next
                tempHead!.next = cur
                cur = tempHead
                tempHead = tmp
                group -= 1
            }

            return cur
        }

        return head
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(\frac{n}{k})$

---

## 2. Iteration

### Intuition

We reverse the list **one k-sized group at a time** using pointers, without recursion.

Key ideas:

- Use a **dummy node** before the head to simplify edge cases.
- For each step, we:
  1. Find the **k-th node** from the current group's previous node.
     - If there aren't `k` nodes left, we stop (leave the rest as-is).
  2. Reverse the nodes in this k-sized segment.
  3. Re-connect the reversed segment back into the list.
  4. Move forward to the next group.

By repeating this process, we reverse every full group of `k` nodes while keeping the rest of the list intact.

### Algorithm

1. Create a `dummy` node pointing to `head`.
   Set `groupPrev = dummy` (the node just before the current group).

2. Loop:
   - Use a helper `getKth(groupPrev, k)` to find the k-th node from `groupPrev`.
   - If `kth` is `null`, there are fewer than k nodes left → break.

3. Let:
   - `groupNext = kth.next` (first node after the current group).
   - `prev = groupNext`
   - `curr = groupPrev.next` (first node in the current group)

4. Reverse the current group:
   - While `curr != groupNext`:
     - Store `curr.next` in `tmp`.
     - Point `curr.next` to `prev`.
     - Move `prev` to `curr`.
     - Move `curr` to `tmp`.

5. After reversing:
   - `groupPrev.next` is now the **start** of the reversed group (`kth` node).
   - Store the original first node of this group (`tmp = groupPrev.next` before rewiring).
   - Set `groupPrev.next = kth`.
   - Move `groupPrev = tmp` (now the end of the reversed group).

6. Repeat steps 2–5 until no more full k-groups remain.

7. Return `dummy.next` as the new head of the list.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        groupPrev = dummy

        while True:
            kth = self.getKth(groupPrev, k)
            if not kth:
                break
            groupNext = kth.next

            prev, curr = kth.next, groupPrev.next
            while curr != groupNext:
                tmp = curr.next
                curr.next = prev
                prev = curr
                curr = tmp

            tmp = groupPrev.next
            groupPrev.next = kth
            groupPrev = tmp
        return dummy.next

    def getKth(self, curr, k):
        while curr and k > 0:
            curr = curr.next
            k -= 1
        return curr
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

    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode dummy = new ListNode(0, head);
        ListNode groupPrev = dummy;

        while (true) {
            ListNode kth = getKth(groupPrev, k);
            if (kth == null) {
                break;
            }
            ListNode groupNext = kth.next;

            ListNode prev = kth.next;
            ListNode curr = groupPrev.next;
            while (curr != groupNext) {
                ListNode tmp = curr.next;
                curr.next = prev;
                prev = curr;
                curr = tmp;
            }

            ListNode tmp = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = tmp;
        }
        return dummy.next;
    }

    private ListNode getKth(ListNode curr, int k) {
        while (curr != null && k > 0) {
            curr = curr.next;
            k--;
        }
        return curr;
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
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* groupPrev = dummy;

        while (true) {
            ListNode* kth = getKth(groupPrev, k);
            if (!kth) {
                break;
            }
            ListNode* groupNext = kth->next;

            ListNode* prev = kth->next;
            ListNode* curr = groupPrev->next;
            while (curr != groupNext) {
                ListNode* tmp = curr->next;
                curr->next = prev;
                prev = curr;
                curr = tmp;
            }

            ListNode* tmp = groupPrev->next;
            groupPrev->next = kth;
            groupPrev = tmp;
        }
        return dummy->next;
    }

private:
    ListNode* getKth(ListNode* curr, int k) {
        while (curr && k > 0) {
            curr = curr->next;
            k--;
        }
        return curr;
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
     * @param {number} k
     * @return {ListNode}
     */
    reverseKGroup(head, k) {
        const dummy = new ListNode(0, head);
        let groupPrev = dummy;

        while (true) {
            const kth = this.getKth(groupPrev, k);
            if (!kth) {
                break;
            }
            const groupNext = kth.next;

            let prev = kth.next;
            let curr = groupPrev.next;
            while (curr != groupNext) {
                const tmp = curr.next;
                curr.next = prev;
                prev = curr;
                curr = tmp;
            }

            const tmp = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = tmp;
        }
        return dummy.next;
    }

    getKth(curr, k) {
        while (curr && k > 0) {
            curr = curr.next;
            k--;
        }
        return curr;
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
    public ListNode ReverseKGroup(ListNode head, int k) {
        ListNode dummy = new ListNode(0, head);
        ListNode groupPrev = dummy;

        while (true) {
            ListNode kth = GetKth(groupPrev, k);
            if (kth == null) {
                break;
            }
            ListNode groupNext = kth.next;

            ListNode prev = kth.next;
            ListNode curr = groupPrev.next;
            while (curr != groupNext) {
                ListNode tmp = curr.next;
                curr.next = prev;
                prev = curr;
                curr = tmp;
            }

            ListNode tmpNode = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = tmpNode;
        }
        return dummy.next;
    }

    private ListNode GetKth(ListNode curr, int k) {
        while (curr != null && k > 0) {
            curr = curr.next;
            k--;
        }
        return curr;
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
func reverseKGroup(head *ListNode, k int) *ListNode {
    dummy := &ListNode{Next: head}
    groupPrev := dummy

    for {
        kth := getKth(groupPrev, k)
        if kth == nil {
            break
        }
        groupNext := kth.Next

        prev, curr := groupNext, groupPrev.Next
        for curr != groupNext {
            tmp := curr.Next
            curr.Next = prev
            prev = curr
            curr = tmp
        }

        tmp := groupPrev.Next
        groupPrev.Next = kth
        groupPrev = tmp
    }
    return dummy.Next
}

func getKth(curr *ListNode, k int) *ListNode {
    for curr != nil && k > 0 {
        curr = curr.Next
        k--
    }
    return curr
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
    fun reverseKGroup(head: ListNode?, k: Int): ListNode? {
        val dummy = ListNode(0)
        dummy.next = head
        var groupPrev: ListNode? = dummy

        while (true) {
            val kth = getKth(groupPrev, k)
            if (kth == null) {
                break
            }
            val groupNext = kth.next

            var prev: ListNode? = groupNext
            var curr = groupPrev!!.next
            while (curr != groupNext) {
                val tmp = curr!!.next
                curr.next = prev
                prev = curr
                curr = tmp
            }

            val tmp = groupPrev.next
            groupPrev.next = kth
            groupPrev = tmp
        }
        return dummy.next
    }

    private fun getKth(curr: ListNode?, k: Int): ListNode? {
        var curr = curr
        var k = k
        while (curr != null && k > 0) {
            curr = curr.next
            k--
        }
        return curr
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
    func reverseKGroup(_ head: ListNode?, _ k: Int) -> ListNode? {
        let dummy = ListNode(0, head)
        var groupPrev: ListNode? = dummy

        while true {
            guard let kth = getKth(groupPrev, k) else {
                break
            }
            let groupNext = kth.next

            var prev: ListNode? = kth.next
            var curr = groupPrev?.next

            while curr !== groupNext {
                let tmp = curr?.next
                curr?.next = prev
                prev = curr
                curr = tmp
            }

            let tmp = groupPrev?.next
            groupPrev?.next = kth
            groupPrev = tmp
        }
        return dummy.next
    }

    private func getKth(_ curr: ListNode?, _ k: Int) -> ListNode? {
        var curr = curr
        var k = k
        while curr != nil && k > 0 {
            curr = curr?.next
            k -= 1
        }
        return curr
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Forgetting to Handle Remaining Nodes

When there are fewer than `k` nodes remaining at the end of the list, they should be left as-is. A common mistake is attempting to reverse these remaining nodes anyway, which violates the problem requirements.

### Incorrect Pointer Rewiring After Reversal

After reversing a k-group, you must correctly connect the reversed segment back to the rest of the list. Failing to update `groupPrev.next` to point to the new head of the reversed segment (which was the k-th node) results in a broken list.

### Losing Track of the Original First Node

The original first node of each k-group becomes the last node after reversal. You need to save a reference to it before rewiring pointers, as it becomes the new `groupPrev` for the next iteration.

### Off-by-One Errors When Counting k Nodes

When checking if there are at least `k` nodes available, ensure your counting logic is correct. Starting the count at 0 vs 1, or using `<` vs `<=` incorrectly, can cause you to reverse groups of the wrong size.

### Not Using a Dummy Node

Without a dummy node before the head, handling the first k-group requires special case logic since there is no `groupPrev` node. Using a dummy simplifies the code and eliminates edge cases for updating the head of the list.