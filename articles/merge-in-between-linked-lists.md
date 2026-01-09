## 1. Convert To Array

### Intuition

The problem asks us to remove nodes from index `a` to `b` in `list1` and insert `list2` in their place. By storing all nodes of `list1` in an array, we gain direct access to any node by index. This makes it straightforward to connect the node just before position `a` to the head of `list2`, and then connect the tail of `list2` to the node just after position `b`.

### Algorithm

1. Traverse `list1` and store all nodes in an array.
2. Connect the node at index `a - 1` to the head of `list2`.
3. Traverse `list2` to find its last node.
4. Connect the last node of `list2` to the node at index `b + 1` in the array.
5. Return the head of `list1`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeInBetween(self, list1: ListNode, a: int, b: int, list2: ListNode) -> ListNode:
        cur = list1
        arr = []
        while cur:
            arr.append(cur)
            cur = cur.next
        arr[a - 1].next = list2

        cur = list2
        while cur.next:
            cur = cur.next

        cur.next = arr[b + 1]
        return list1
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
    public ListNode mergeInBetween(ListNode list1, int a, int b, ListNode list2) {
        ListNode cur = list1;
        List<ListNode> arr = new ArrayList<>();

        while (cur != null) {
            arr.add(cur);
            cur = cur.next;
        }

        arr.get(a - 1).next = list2;
        cur = list2;

        while (cur.next != null) {
            cur = cur.next;
        }

        cur.next = arr.get(b + 1);
        return list1;
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
    ListNode* mergeInBetween(ListNode* list1, int a, int b, ListNode* list2) {
        ListNode* cur = list1;
        vector<ListNode*> arr;

        while (cur) {
            arr.push_back(cur);
            cur = cur->next;
        }

        arr[a - 1]->next = list2;
        cur = list2;

        while (cur->next) {
            cur = cur->next;
        }

        cur->next = arr[b + 1];
        return list1;
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
     * @param {ListNode} list1
     * @param {number} a
     * @param {number} b
     * @param {ListNode} list2
     * @return {ListNode}
     */
    mergeInBetween(list1, a, b, list2) {
        let cur = list1;
        let arr = [];

        while (cur) {
            arr.push(cur);
            cur = cur.next;
        }

        arr[a - 1].next = list2;
        cur = list2;

        while (cur.next) {
            cur = cur.next;
        }

        cur.next = arr[b + 1];
        return list1;
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
func mergeInBetween(list1 *ListNode, a int, b int, list2 *ListNode) *ListNode {
    cur := list1
    arr := []*ListNode{}

    for cur != nil {
        arr = append(arr, cur)
        cur = cur.Next
    }

    arr[a-1].Next = list2
    cur = list2

    for cur.Next != nil {
        cur = cur.Next
    }

    cur.Next = arr[b+1]
    return list1
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
    fun mergeInBetween(list1: ListNode?, a: Int, b: Int, list2: ListNode?): ListNode? {
        var cur = list1
        val arr = mutableListOf<ListNode>()

        while (cur != null) {
            arr.add(cur)
            cur = cur.next
        }

        arr[a - 1].next = list2
        cur = list2

        while (cur?.next != null) {
            cur = cur.next
        }

        cur?.next = arr[b + 1]
        return list1
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
    func mergeInBetween(_ list1: ListNode?, _ a: Int, _ b: Int, _ list2: ListNode?) -> ListNode? {
        var cur = list1
        var arr = [ListNode]()

        while cur != nil {
            arr.append(cur!)
            cur = cur?.next
        }

        arr[a - 1].next = list2
        cur = list2

        while cur?.next != nil {
            cur = cur?.next
        }

        cur?.next = arr[b + 1]
        return list1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the first list and $m$ is the length of the second list.

---

## 2. Two Pointers

### Intuition

Instead of using extra space to store all nodes, we can traverse `list1` directly using pointers. We walk through the list, counting nodes until we reach position `a - 1` (the node just before the removal range). We save this position, then continue until we pass position `b` to find the node that should come after `list2`. Finally, we rewire the pointers to splice `list2` in place.

### Algorithm

1. Initialize a pointer `curr` at the head of `list1` and a counter `i` at 0.
2. Move `curr` forward until `i` equals `a - 1`. Save this node as `head`.
3. Continue moving `curr` forward until `i` exceeds `b`. Now `curr` points to the node after the removed segment.
4. Set `head.next` to point to `list2`.
5. Traverse `list2` to find its tail node.
6. Set the tail of `list2` to point to `curr`.
7. Return the head of `list1`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeInBetween(self, list1: ListNode, a: int, b: int, list2: ListNode) -> ListNode:
        curr = list1
        i = 0

        while i < a - 1:
            curr = curr.next
            i += 1
        head = curr

        while i <= b:
            curr = curr.next
            i += 1

        head.next = list2

        while list2.next:
            list2 = list2.next
        list2.next = curr

        return list1
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
    public ListNode mergeInBetween(ListNode list1, int a, int b, ListNode list2) {
        ListNode curr = list1;
        int i = 0;

        while (i < a - 1) {
            curr = curr.next;
            i++;
        }
        ListNode head = curr;

        while (i <= b) {
            curr = curr.next;
            i++;
        }

        head.next = list2;

        while (list2.next != null) {
            list2 = list2.next;
        }
        list2.next = curr;

        return list1;
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
    ListNode* mergeInBetween(ListNode* list1, int a, int b, ListNode* list2) {
        ListNode* curr = list1;
        int i = 0;

        while (i < a - 1) {
            curr = curr->next;
            i++;
        }
        ListNode* head = curr;

        while (i <= b) {
            curr = curr->next;
            i++;
        }
        head->next = list2;

        while (list2->next) {
            list2 = list2->next;
        }
        list2->next = curr;

        return list1;
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
     * @param {ListNode} list1
     * @param {number} a
     * @param {number} b
     * @param {ListNode} list2
     * @return {ListNode}
     */
    mergeInBetween(list1, a, b, list2) {
        let curr = list1,
            i = 0;

        while (i < a - 1) {
            curr = curr.next;
            i++;
        }
        let head = curr;

        while (i <= b) {
            curr = curr.next;
            i++;
        }
        head.next = list2;

        while (list2.next) {
            list2 = list2.next;
        }
        list2.next = curr;

        return list1;
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
func mergeInBetween(list1 *ListNode, a int, b int, list2 *ListNode) *ListNode {
    curr := list1
    i := 0

    for i < a-1 {
        curr = curr.Next
        i++
    }
    head := curr

    for i <= b {
        curr = curr.Next
        i++
    }
    head.Next = list2

    for list2.Next != nil {
        list2 = list2.Next
    }
    list2.Next = curr

    return list1
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
    fun mergeInBetween(list1: ListNode?, a: Int, b: Int, list2: ListNode?): ListNode? {
        var curr = list1
        var i = 0

        while (i < a - 1) {
            curr = curr?.next
            i++
        }
        val head = curr

        while (i <= b) {
            curr = curr?.next
            i++
        }
        head?.next = list2

        var tail = list2
        while (tail?.next != null) {
            tail = tail.next
        }
        tail?.next = curr

        return list1
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
    func mergeInBetween(_ list1: ListNode?, _ a: Int, _ b: Int, _ list2: ListNode?) -> ListNode? {
        var curr = list1
        var i = 0

        while i < a - 1 {
            curr = curr?.next
            i += 1
        }
        let head = curr

        while i <= b {
            curr = curr?.next
            i += 1
        }
        head?.next = list2

        var tail = list2
        while tail?.next != nil {
            tail = tail?.next
        }
        tail?.next = curr

        return list1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the first list and $m$ is the length of the second list.

---

## 3. Recursion

### Intuition

We can solve this problem recursively by reducing the indices `a` and `b` as we move deeper into `list1`. When `a` reaches 1, we have found the insertion point and can attach `list2`. We then continue recursing with `list2`'s tail to skip over the nodes that should be removed (while `b` counts down). When `b` reaches 0, we have passed all nodes to remove and can connect the tail of `list2` to the remaining nodes of `list1`.

### Algorithm

1. If `a == 1`, we are at the insertion point:
   - Save `list1.next` as `nxt`.
   - Set `list1.next = list2`.
   - Traverse to the end of `list2` to find its tail.
   - Recursively call the function with `nxt`, `a = 0`, `b - 1`, and the tail of `list2`.
   - Return `list1`.
2. If `b == 0`, we have skipped all nodes to remove:
   - Set `list2.next = list1.next` to connect the tail of `list2` to the rest of `list1`.
   - Return `list1`.
3. Otherwise, recurse on `list1.next` with `a - 1` and `b - 1`.
4. Return `list1`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeInBetween(self, list1: ListNode, a: int, b: int, list2: ListNode) -> ListNode:
        if a == 1 :
            nxt = list1.next
            list1.next = list2
            while list2.next:
                list2 = list2.next
            self.mergeInBetween(nxt, 0, b - 1, list2)
            return list1

        if b == 0:
            list2.next = list1.next
            return list1

        self.mergeInBetween(list1.next, a - 1, b - 1, list2)
        return list1
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
    public ListNode mergeInBetween(ListNode list1, int a, int b, ListNode list2) {
        if (a == 1) {
            ListNode nxt = list1.next;
            list1.next = list2;

            while (list2.next != null) {
                list2 = list2.next;
            }
            mergeInBetween(nxt, 0, b - 1, list2);
            return list1;
        }

        if (b == 0) {
            list2.next = list1.next;
            return list1;
        }

        mergeInBetween(list1.next, a - 1, b - 1, list2);
        return list1;
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
    ListNode* mergeInBetween(ListNode* list1, int a, int b, ListNode* list2) {
        if (a == 1) {
            ListNode* nxt = list1->next;
            list1->next = list2;

            while (list2->next) {
                list2 = list2->next;
            }
            mergeInBetween(nxt, 0, b - 1, list2);
            return list1;
        }

        if (b == 0) {
            list2->next = list1->next;
            return list1;
        }

        mergeInBetween(list1->next, a - 1, b - 1, list2);
        return list1;
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
     * @param {ListNode} list1
     * @param {number} a
     * @param {number} b
     * @param {ListNode} list2
     * @return {ListNode}
     */
    mergeInBetween(list1, a, b, list2) {
        if (a === 1) {
            let nxt = list1.next;
            list1.next = list2;

            while (list2.next) {
                list2 = list2.next;
            }
            this.mergeInBetween(nxt, 0, b - 1, list2);
            return list1;
        }

        if (b === 0) {
            list2.next = list1.next;
            return list1;
        }

        this.mergeInBetween(list1.next, a - 1, b - 1, list2);
        return list1;
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
func mergeInBetween(list1 *ListNode, a int, b int, list2 *ListNode) *ListNode {
    if a == 1 {
        nxt := list1.Next
        list1.Next = list2

        for list2.Next != nil {
            list2 = list2.Next
        }
        mergeInBetween(nxt, 0, b-1, list2)
        return list1
    }

    if b == 0 {
        list2.Next = list1.Next
        return list1
    }

    mergeInBetween(list1.Next, a-1, b-1, list2)
    return list1
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
    fun mergeInBetween(list1: ListNode?, a: Int, b: Int, list2: ListNode?): ListNode? {
        if (a == 1) {
            val nxt = list1?.next
            list1?.next = list2

            var tail = list2
            while (tail?.next != null) {
                tail = tail.next
            }
            mergeInBetween(nxt, 0, b - 1, tail)
            return list1
        }

        if (b == 0) {
            list2?.next = list1?.next
            return list1
        }

        mergeInBetween(list1?.next, a - 1, b - 1, list2)
        return list1
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
    func mergeInBetween(_ list1: ListNode?, _ a: Int, _ b: Int, _ list2: ListNode?) -> ListNode? {
        if a == 1 {
            let nxt = list1?.next
            list1?.next = list2

            var tail = list2
            while tail?.next != nil {
                tail = tail?.next
            }
            _ = mergeInBetween(nxt, 0, b - 1, tail)
            return list1
        }

        if b == 0 {
            list2?.next = list1?.next
            return list1
        }

        _ = mergeInBetween(list1?.next, a - 1, b - 1, list2)
        return list1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n)$ for recursion stack.

> Where $n$ is the length of the first list and $m$ is the length of the second list.
