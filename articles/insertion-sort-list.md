## 1. Convert To Array

### Intuition

Since sorting a linked list in place can be tricky, we can simplify the problem by extracting all the values into an array. Once in array form, we can use any standard sorting algorithm. After sorting, we traverse the linked list again and overwrite each node's value with the sorted values in order.

### Algorithm

1. Traverse the linked list and collect all node values into an array.
2. Sort the array.
3. Traverse the linked list again, replacing each node's value with the next sorted value from the array.
4. Return the head of the list.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def insertionSortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        arr = []
        cur = head
        while cur:
            arr.append(cur.val)
            cur = cur.next

        arr.sort()
        cur = head
        for val in arr:
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
    public ListNode insertionSortList(ListNode head) {
        List<Integer> arr = new ArrayList<>();
        ListNode cur = head;

        while (cur != null) {
            arr.add(cur.val);
            cur = cur.next;
        }

        Collections.sort(arr);
        cur = head;

        for (int val : arr) {
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
    ListNode* insertionSortList(ListNode* head) {
        vector<int> arr;
        ListNode* cur = head;

        while (cur) {
            arr.push_back(cur->val);
            cur = cur->next;
        }

        sort(arr.begin(), arr.end());
        cur = head;

        for (int val : arr) {
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
     * @return {ListNode}
     */
    insertionSortList(head) {
        let arr = [];
        let cur = head;

        while (cur) {
            arr.push(cur.val);
            cur = cur.next;
        }

        arr.sort((a, b) => a - b);
        cur = head;

        for (let val of arr) {
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
    public ListNode InsertionSortList(ListNode head) {
        List<int> arr = new List<int>();
        ListNode cur = head;
        while (cur != null) {
            arr.Add(cur.val);
            cur = cur.next;
        }

        arr.Sort();
        cur = head;
        foreach (int val in arr) {
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
func insertionSortList(head *ListNode) *ListNode {
    arr := []int{}
    cur := head
    for cur != nil {
        arr = append(arr, cur.Val)
        cur = cur.Next
    }

    sort.Ints(arr)
    cur = head
    for _, val := range arr {
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
    fun insertionSortList(head: ListNode?): ListNode? {
        val arr = mutableListOf<Int>()
        var cur = head
        while (cur != null) {
            arr.add(cur.`val`)
            cur = cur.next
        }

        arr.sort()
        cur = head
        for (v in arr) {
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
    func insertionSortList(_ head: ListNode?) -> ListNode? {
        var arr = [Int]()
        var cur = head
        while cur != nil {
            arr.append(cur!.val)
            cur = cur?.next
        }

        arr.sort()
        cur = head
        for val in arr {
            cur!.val = val
            cur = cur?.next
        }
        return head
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Swapping Values

### Intuition

This approach mimics insertion sort by comparing values rather than rearranging node pointers. For each node, we scan from the head to find any earlier node with a larger value and swap values. This bubbles smaller values toward the front, eventually producing a sorted list. While simpler to implement than pointer manipulation, it still requires O(n^2) comparisons.

### Algorithm

1. Start with the second node (`cur = head.next`).
2. For each `cur`, traverse from `head` to `cur`:
   - If any node `tmp` has a value greater than `cur.val`, swap their values.
3. Move `cur` to the next node and repeat.
4. Return the `head` of the list.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def insertionSortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        cur = head.next
        while cur:
            tmp = head
            while tmp != cur:
                if tmp.val > cur.val:
                    tmp.val, cur.val = cur.val, tmp.val
                tmp = tmp.next
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
    public ListNode insertionSortList(ListNode head) {
        for (ListNode cur = head.next; cur != null; cur = cur.next) {
            for (ListNode tmp = head; tmp != cur; tmp = tmp.next) {
                if (tmp.val > cur.val) {
                    int swap = tmp.val;
                    tmp.val = cur.val;
                    cur.val = swap;
                }
            }
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
    ListNode* insertionSortList(ListNode* head) {
        for (ListNode* cur = head->next; cur; cur = cur->next) {
            for (ListNode* tmp = head; tmp != cur; tmp = tmp->next) {
                if (tmp->val > cur->val) {
                    swap(tmp->val, cur->val);
                }
            }
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
     * @return {ListNode}
     */
    insertionSortList(head) {
        for (let cur = head.next; cur; cur = cur.next) {
            for (let tmp = head; tmp !== cur; tmp = tmp.next) {
                if (tmp.val > cur.val) {
                    [tmp.val, cur.val] = [cur.val, tmp.val];
                }
            }
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
    public ListNode InsertionSortList(ListNode head) {
        if (head == null) return head;

        ListNode cur = head.next;
        while (cur != null) {
            ListNode tmp = head;
            while (tmp != cur) {
                if (tmp.val > cur.val) {
                    int t = tmp.val;
                    tmp.val = cur.val;
                    cur.val = t;
                }
                tmp = tmp.next;
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
func insertionSortList(head *ListNode) *ListNode {
    for cur := head.Next; cur != nil; cur = cur.Next {
        for tmp := head; tmp != cur; tmp = tmp.Next {
            if tmp.Val > cur.Val {
                tmp.Val, cur.Val = cur.Val, tmp.Val
            }
        }
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
    fun insertionSortList(head: ListNode?): ListNode? {
        var cur = head?.next
        while (cur != null) {
            var tmp = head
            while (tmp != cur) {
                if (tmp!!.`val` > cur.`val`) {
                    val t = tmp.`val`
                    tmp.`val` = cur.`val`
                    cur.`val` = t
                }
                tmp = tmp.next
            }
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
    func insertionSortList(_ head: ListNode?) -> ListNode? {
        var cur = head?.next
        while cur != nil {
            var tmp = head
            while tmp !== cur {
                if tmp!.val > cur!.val {
                    let t = tmp!.val
                    tmp!.val = cur!.val
                    cur!.val = t
                }
                tmp = tmp?.next
            }
            cur = cur?.next
        }
        return head
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 3. Swapping Nodes

### Intuition

This is the classic insertion sort adapted for linked lists. Instead of swapping values, we physically remove a node and reinsert it at the correct position in the already sorted portion. A dummy node simplifies insertions at the head. If the current node is already in order relative to the previous node, we just advance. Otherwise, we unlink it and search from the beginning for the right spot.

### Algorithm

1. Create a `dummy` node pointing to the `head` to handle edge cases.
2. Maintain `prev` as the last node of the sorted portion and `cur` as the node being examined.
3. If `cur.val >= prev.val`, the node is in place; advance both pointers.
4. Otherwise, find the correct insertion point by scanning from the `dummy`:
   - Unlink `cur` from its current position.
   - Insert `cur` after the found position.
   - Update `cur` to `prev.next` to continue.
5. Return `dummy.next`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def insertionSortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        prev, cur = head, head.next

        while cur:
            if cur.val >= prev.val:
                prev, cur = cur, cur.next
                continue

            tmp = dummy
            while cur.val > tmp.next.val:
                tmp = tmp.next

            prev.next = cur.next
            cur.next = tmp.next
            tmp.next = cur
            cur = prev.next

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
    public ListNode insertionSortList(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = head, cur = head.next;

        while (cur != null) {
            if (cur.val >= prev.val) {
                prev = cur;
                cur = cur.next;
                continue;
            }

            ListNode tmp = dummy;
            while (tmp.next.val < cur.val) {
                tmp = tmp.next;
            }

            prev.next = cur.next;
            cur.next = tmp.next;
            tmp.next = cur;
            cur = prev.next;
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
    ListNode* insertionSortList(ListNode* head) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* prev = head;
        ListNode* cur = head->next;

        while (cur) {
            if (cur->val >= prev->val) {
                prev = cur;
                cur = cur->next;
                continue;
            }

            ListNode* tmp = dummy;
            while (tmp->next->val < cur->val) {
                tmp = tmp->next;
            }

            prev->next = cur->next;
            cur->next = tmp->next;
            tmp->next = cur;
            cur = prev->next;
        }

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
     * @return {ListNode}
     */
    insertionSortList(head) {
        let dummy = new ListNode(0, head);
        let prev = head,
            cur = head.next;

        while (cur) {
            if (cur.val >= prev.val) {
                prev = cur;
                cur = cur.next;
                continue;
            }

            let tmp = dummy;
            while (tmp.next.val < cur.val) {
                tmp = tmp.next;
            }

            prev.next = cur.next;
            cur.next = tmp.next;
            tmp.next = cur;
            cur = prev.next;
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
    public ListNode InsertionSortList(ListNode head) {
        if (head == null) return head;

        ListNode dummy = new ListNode(0, head);
        ListNode prev = head, cur = head.next;

        while (cur != null) {
            if (cur.val >= prev.val) {
                prev = cur;
                cur = cur.next;
                continue;
            }

            ListNode tmp = dummy;
            while (cur.val > tmp.next.val) {
                tmp = tmp.next;
            }

            prev.next = cur.next;
            cur.next = tmp.next;
            tmp.next = cur;
            cur = prev.next;
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
func insertionSortList(head *ListNode) *ListNode {
    dummy := &ListNode{Val: 0, Next: head}
    prev, cur := head, head.Next

    for cur != nil {
        if cur.Val >= prev.Val {
            prev = cur
            cur = cur.Next
            continue
        }

        tmp := dummy
        for cur.Val > tmp.Next.Val {
            tmp = tmp.Next
        }

        prev.Next = cur.Next
        cur.Next = tmp.Next
        tmp.Next = cur
        cur = prev.Next
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
    fun insertionSortList(head: ListNode?): ListNode? {
        if (head == null) return null

        val dummy = ListNode(0).apply { next = head }
        var prev = head
        var cur = head.next

        while (cur != null) {
            if (cur.`val` >= prev!!.`val`) {
                prev = cur
                cur = cur.next
                continue
            }

            var tmp: ListNode? = dummy
            while (cur.`val` > tmp!!.next!!.`val`) {
                tmp = tmp.next
            }

            prev.next = cur.next
            cur.next = tmp!!.next
            tmp.next = cur
            cur = prev.next
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
    func insertionSortList(_ head: ListNode?) -> ListNode? {
        let dummy = ListNode(0, head)
        var prev = head
        var cur = head?.next

        while cur != nil {
            if cur!.val >= prev!.val {
                prev = cur
                cur = cur?.next
                continue
            }

            var tmp: ListNode? = dummy
            while cur!.val > tmp!.next!.val {
                tmp = tmp?.next
            }

            prev?.next = cur?.next
            cur?.next = tmp?.next
            tmp?.next = cur
            cur = prev?.next
        }

        return dummy.next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Losing Track of the Next Node Before Unlinking

When removing a node from its current position to reinsert it elsewhere, failing to save `cur.next` before modifying pointers causes the reference to the next node to be lost. Always store the next node in a temporary variable before performing any pointer manipulation.

### Not Using a Dummy Node for Head Insertions

When the smallest element is found later in the list and needs to become the new head, not using a dummy node makes head updates awkward and error-prone. A dummy node pointing to the head simplifies insertions at the beginning by providing a consistent previous node.

### Incorrectly Advancing Pointers After Insertion

After inserting a node into its correct sorted position, the `prev` pointer should not advance because the node that was after `cur` is now directly after `prev`. Advancing `prev` would skip a node. Only `cur` should be updated to `prev.next` to continue with the next unsorted element.
