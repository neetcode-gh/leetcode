## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Linked Lists** - Understanding node structure, traversal, and pointer manipulation
- **Two Pointers** - Building and maintaining separate lists for partitioning
- **Dummy Nodes** - Using sentinel nodes to simplify edge case handling when building linked lists

---

## 1. Brute Force

### Intuition

We need to partition the linked list so that all nodes with values less than `x` come before nodes with values greater than or equal to `x`, while preserving the original relative order within each group.

The brute force approach extracts all values into two separate lists based on the partition condition, then writes them back to the original nodes. This simplifies the logic but requires extra space proportional to the list size.

### Algorithm

1. Create two arrays: one for values less than `x`, another for values greater than or equal to `x`.
2. Traverse the linked list once, appending each value to the appropriate array.
3. Traverse the linked list again, overwriting node values in order: first all values from the "less" array, then all values from the "greater" array.
4. Return the `head` of the modified list.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
        if not head:
            return None

        less, greater = [], []
        cur = head
        while cur:
            if cur.val < x:
                less.append(cur.val)
            else:
                greater.append(cur.val)
            cur = cur.next

        cur = head
        for val in less:
            cur.val = val
            cur = cur.next

        for val in greater:
            cur.val = val
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
    public ListNode partition(ListNode head, int x) {
        if (head == null) {
            return null;
        }

        List<Integer> less = new ArrayList<>();
        List<Integer> greater = new ArrayList<>();
        ListNode cur = head;

        while (cur != null) {
            if (cur.val < x) {
                less.add(cur.val);
            } else {
                greater.add(cur.val);
            }
            cur = cur.next;
        }

        cur = head;
        for (int val : less) {
            cur.val = val;
            cur = cur.next;
        }

        for (int val : greater) {
            cur.val = val;
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
    ListNode* partition(ListNode* head, int x) {
        if (!head) return nullptr;

        vector<int> less, greater;
        ListNode* cur = head;

        while (cur) {
            if (cur->val < x) {
                less.push_back(cur->val);
            } else {
                greater.push_back(cur->val);
            }
            cur = cur->next;
        }

        cur = head;
        for (int val : less) {
            cur->val = val;
            cur = cur->next;
        }

        for (int val : greater) {
            cur->val = val;
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
     * @param {number} x
     * @return {ListNode}
     */
    partition(head, x) {
        if (!head) return null;

        let less = [],
            greater = [];
        let cur = head;

        while (cur) {
            if (cur.val < x) {
                less.push(cur.val);
            } else {
                greater.push(cur.val);
            }
            cur = cur.next;
        }

        cur = head;
        for (let val of less) {
            cur.val = val;
            cur = cur.next;
        }

        for (let val of greater) {
            cur.val = val;
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
    public ListNode Partition(ListNode head, int x) {
        if (head == null) return null;

        List<int> less = new List<int>();
        List<int> greater = new List<int>();
        ListNode cur = head;

        while (cur != null) {
            if (cur.val < x) {
                less.Add(cur.val);
            } else {
                greater.Add(cur.val);
            }
            cur = cur.next;
        }

        cur = head;
        foreach (int val in less) {
            cur.val = val;
            cur = cur.next;
        }

        foreach (int val in greater) {
            cur.val = val;
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
func partition(head *ListNode, x int) *ListNode {
    if head == nil {
        return nil
    }

    var less, greater []int
    cur := head

    for cur != nil {
        if cur.Val < x {
            less = append(less, cur.Val)
        } else {
            greater = append(greater, cur.Val)
        }
        cur = cur.Next
    }

    cur = head
    for _, val := range less {
        cur.Val = val
        cur = cur.Next
    }

    for _, val := range greater {
        cur.Val = val
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
    fun partition(head: ListNode?, x: Int): ListNode? {
        if (head == null) return null

        val less = mutableListOf<Int>()
        val greater = mutableListOf<Int>()
        var cur = head

        while (cur != null) {
            if (cur.`val` < x) {
                less.add(cur.`val`)
            } else {
                greater.add(cur.`val`)
            }
            cur = cur.next
        }

        cur = head
        for (v in less) {
            cur!!.`val` = v
            cur = cur.next
        }

        for (v in greater) {
            cur!!.`val` = v
            cur = cur.next
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
    func partition(_ head: ListNode?, _ x: Int) -> ListNode? {
        guard let head = head else { return nil }

        var less = [Int]()
        var greater = [Int]()
        var cur: ListNode? = head

        while cur != nil {
            if cur!.val < x {
                less.append(cur!.val)
            } else {
                greater.append(cur!.val)
            }
            cur = cur!.next
        }

        cur = head
        for val in less {
            cur!.val = val
            cur = cur!.next
        }

        for val in greater {
            cur!.val = val
            cur = cur!.next
        }

        return head
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Two Pointers

### Intuition

Instead of storing values in arrays, we can build two separate linked lists as we traverse: one for nodes less than `x`, one for nodes greater than or equal to `x`. Using dummy head nodes simplifies edge case handling.

At the end, we connect the tail of the "less" list to the head of the "greater" list, and terminate the "greater" list to avoid cycles. This achieves O(1) extra space by reusing the original nodes.

### Algorithm

1. Create two dummy nodes as heads for the "left" (less than `x`) and "right" (greater or equal) lists.
2. Maintain tail pointers for both lists.
3. Traverse the original list:
   - If the current node's value is less than `x`, append it to the left list.
   - Otherwise, append it to the right list.
4. Connect the left list's tail to the right list's first real node (skip dummy).
5. Set the right list's tail's `next` to `null` to terminate the list.
6. Return the first real node of the left list.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
        left, right = ListNode(), ListNode()
        ltail, rtail = left, right

        while head:
            if head.val < x:
                ltail.next = head
                ltail = ltail.next
            else:
                rtail.next = head
                rtail = rtail.next
            head = head.next

        ltail.next = right.next
        rtail.next = None
        return left.next
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
    public ListNode partition(ListNode head, int x) {
        ListNode left = new ListNode(0), right = new ListNode(0);
        ListNode ltail = left, rtail = right;

        while (head != null) {
            if (head.val < x) {
                ltail.next = head;
                ltail = ltail.next;
            } else {
                rtail.next = head;
                rtail = rtail.next;
            }
            head = head.next;
        }

        ltail.next = right.next;
        rtail.next = null;
        return left.next;
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
    ListNode* partition(ListNode* head, int x) {
        ListNode leftDummy(0), rightDummy(0);
        ListNode *ltail = &leftDummy, *rtail = &rightDummy;

        while (head) {
            if (head->val < x) {
                ltail->next = head;
                ltail = ltail->next;
            } else {
                rtail->next = head;
                rtail = rtail->next;
            }
            head = head->next;
        }

        ltail->next = rightDummy.next;
        rtail->next = nullptr;
        return leftDummy.next;
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
     * @param {number} x
     * @return {ListNode}
     */
    partition(head, x) {
        let left = new ListNode(0),
            right = new ListNode(0);
        let ltail = left,
            rtail = right;

        while (head) {
            if (head.val < x) {
                ltail.next = head;
                ltail = ltail.next;
            } else {
                rtail.next = head;
                rtail = rtail.next;
            }
            head = head.next;
        }

        ltail.next = right.next;
        rtail.next = null;
        return left.next;
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
    public ListNode Partition(ListNode head, int x) {
        ListNode left = new ListNode(0), right = new ListNode(0);
        ListNode ltail = left, rtail = right;

        while (head != null) {
            if (head.val < x) {
                ltail.next = head;
                ltail = ltail.next;
            } else {
                rtail.next = head;
                rtail = rtail.next;
            }
            head = head.next;
        }

        ltail.next = right.next;
        rtail.next = null;
        return left.next;
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
func partition(head *ListNode, x int) *ListNode {
    left := &ListNode{}
    right := &ListNode{}
    ltail, rtail := left, right

    for head != nil {
        if head.Val < x {
            ltail.Next = head
            ltail = ltail.Next
        } else {
            rtail.Next = head
            rtail = rtail.Next
        }
        head = head.Next
    }

    ltail.Next = right.Next
    rtail.Next = nil
    return left.Next
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
    fun partition(head: ListNode?, x: Int): ListNode? {
        val left = ListNode(0)
        val right = ListNode(0)
        var ltail = left
        var rtail = right
        var cur = head

        while (cur != null) {
            if (cur.`val` < x) {
                ltail.next = cur
                ltail = ltail.next!!
            } else {
                rtail.next = cur
                rtail = rtail.next!!
            }
            cur = cur.next
        }

        ltail.next = right.next
        rtail.next = null
        return left.next
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
    func partition(_ head: ListNode?, _ x: Int) -> ListNode? {
        let left = ListNode(0)
        let right = ListNode(0)
        var ltail = left
        var rtail = right
        var cur = head

        while cur != nil {
            if cur!.val < x {
                ltail.next = cur
                ltail = ltail.next!
            } else {
                rtail.next = cur
                rtail = rtail.next!
            }
            cur = cur!.next
        }

        ltail.next = right.next
        rtail.next = nil
        return left.next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Forgetting to Terminate the Right List

After connecting the left list to the right list, you must set `rtail.next = null`. Without this, the last node of the right list may still point to a node in the left list from the original structure, creating a cycle and causing infinite loops.

### Using Strict Greater Than Instead of Greater or Equal

The partition condition requires nodes with values **less than** `x` to come first, and nodes **greater than or equal to** `x` to come second. Using `>` instead of `>=` for the right partition will incorrectly place nodes equal to `x` in the left partition.

### Not Using Dummy Nodes

Trying to handle the head of each partition manually without dummy nodes leads to complex edge case handling. Using dummy nodes (`left` and `right`) as placeholders simplifies the code and eliminates null checks when the first node is encountered for each partition.
