## 1. Convert To Array

### Intuition

A node should be removed if there exists a larger value somewhere to its right. To check this efficiently, we first convert the linked list into an array. Then we traverse the array from right to left, keeping track of the maximum value seen so far. Any node with a value smaller than this running maximum gets removed by adjusting the previous node's pointer.

### Algorithm

1. Create an array with a dummy node at the start, followed by all nodes from the linked list.
2. Initialize `rightMaxi` to track the maximum node seen from the right.
3. Traverse the array from right to left:
   - If the current node's value is less than `rightMaxi.val`, update the previous node's `next` pointer to skip it.
   - Otherwise, update `rightMaxi` to the current node.
4. Return `arr[0].next` as the new head.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNodes(self, head: Optional[ListNode]) -> Optional[ListNode]:
        cur, arr = head, [ListNode(0, head)]
        while cur:
            arr.append(cur)
            cur = cur.next

        rightMaxi = ListNode(0, None)
        for i in range(len(arr) - 1, 0, -1):
            if rightMaxi.val > arr[i].val:
                arr[i - 1].next = rightMaxi
            else:
                rightMaxi = arr[i]

        return arr[0].next
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
    public ListNode removeNodes(ListNode head) {
        List<ListNode> arr = new ArrayList<>();
        arr.add(new ListNode(0, head));
        ListNode cur = head;

        while (cur != null) {
            arr.add(cur);
            cur = cur.next;
        }

        ListNode rightMaxi = new ListNode(0, null);
        for (int i = arr.size() - 1; i > 0; i--) {
            if (rightMaxi.val > arr.get(i).val) {
                arr.get(i - 1).next = rightMaxi;
            } else {
                rightMaxi = arr.get(i);
            }
        }

        return arr.get(0).next;
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
    ListNode* removeNodes(ListNode* head) {
        vector<ListNode*> arr;
        arr.push_back(new ListNode(0, head));
        ListNode* cur = head;

        while (cur) {
            arr.push_back(cur);
            cur = cur->next;
        }

        ListNode* rightMaxi = new ListNode(0, nullptr);
        for (int i = arr.size() - 1; i > 0; i--) {
            if (rightMaxi->val > arr[i]->val) {
                arr[i - 1]->next = rightMaxi;
            } else {
                rightMaxi = arr[i];
            }
        }

        return arr[0]->next;
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
    removeNodes(head) {
        let cur = head,
            arr = [{ val: 0, next: head }];
        while (cur) {
            arr.push(cur);
            cur = cur.next;
        }

        let rightMaxi = { val: 0, next: null };
        for (let i = arr.length - 1; i > 0; i--) {
            if (rightMaxi.val > arr[i].val) {
                arr[i - 1].next = rightMaxi;
            } else {
                rightMaxi = arr[i];
            }
        }

        return arr[0].next;
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
    public ListNode RemoveNodes(ListNode head) {
        var arr = new List<ListNode>();
        arr.Add(new ListNode(0, head));
        var cur = head;

        while (cur != null) {
            arr.Add(cur);
            cur = cur.next;
        }

        var rightMaxi = new ListNode(0, null);
        for (int i = arr.Count - 1; i > 0; i--) {
            if (rightMaxi.val > arr[i].val) {
                arr[i - 1].next = rightMaxi;
            } else {
                rightMaxi = arr[i];
            }
        }

        return arr[0].next;
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
func removeNodes(head *ListNode) *ListNode {
    arr := []*ListNode{{Val: 0, Next: head}}
    cur := head

    for cur != nil {
        arr = append(arr, cur)
        cur = cur.Next
    }

    rightMaxi := &ListNode{Val: 0, Next: nil}
    for i := len(arr) - 1; i > 0; i-- {
        if rightMaxi.Val > arr[i].Val {
            arr[i-1].Next = rightMaxi
        } else {
            rightMaxi = arr[i]
        }
    }

    return arr[0].Next
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
    fun removeNodes(head: ListNode?): ListNode? {
        val arr = mutableListOf<ListNode>()
        val dummy = ListNode(0)
        dummy.next = head
        arr.add(dummy)
        var cur = head

        while (cur != null) {
            arr.add(cur)
            cur = cur.next
        }

        var rightMaxi = ListNode(0)
        for (i in arr.size - 1 downTo 1) {
            if (rightMaxi.`val` > arr[i].`val`) {
                arr[i - 1].next = rightMaxi
            } else {
                rightMaxi = arr[i]
            }
        }

        return arr[0].next
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
    func removeNodes(_ head: ListNode?) -> ListNode? {
        var arr: [ListNode] = [ListNode(0, head)]
        var cur = head

        while cur != nil {
            arr.append(cur!)
            cur = cur?.next
        }

        var rightMaxi = ListNode(0, nil)
        for i in stride(from: arr.count - 1, through: 1, by: -1) {
            if rightMaxi.val > arr[i].val {
                arr[i - 1].next = rightMaxi
            } else {
                rightMaxi = arr[i]
            }
        }

        return arr[0].next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Monotonic Decreasing Stack

### Intuition

We need to keep only nodes that have no larger value to their right. A monotonic decreasing stack naturally maintains this property. As we traverse the list, we pop any stack elements that are smaller than the current node's value. This ensures the stack always contains values in decreasing order from bottom to top, which are exactly the nodes that should remain.

### Algorithm

1. Initialize an empty stack to store node values.
2. Traverse the linked list:
   - While the stack is not empty and the current value is greater than the top of the stack, pop from the stack.
   - Push the current value onto the stack.
3. Build a new linked list from the stack values in order.
4. Return the head of the new list.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNodes(self, head: Optional[ListNode]) -> Optional[ListNode]:
        stack = []
        cur = head

        while cur:
            while stack and cur.val > stack[-1]:
                stack.pop()
            stack.append(cur.val)
            cur = cur.next

        dummy = ListNode()
        cur = dummy

        for num in stack:
            cur.next = ListNode(num)
            cur = cur.next

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
    public ListNode removeNodes(ListNode head) {
        Stack<Integer> stack = new Stack<>();
        ListNode cur = head;

        while (cur != null) {
            while (!stack.isEmpty() && cur.val > stack.peek()) {
                stack.pop();
            }
            stack.push(cur.val);
            cur = cur.next;
        }

        ListNode dummy = new ListNode();
        cur = dummy;

        for (int num : stack) {
            cur.next = new ListNode(num);
            cur = cur.next;
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
    ListNode* removeNodes(ListNode* head) {
        vector<int> stack;
        ListNode* cur = head;

        while (cur) {
            while (!stack.empty() && cur->val > stack.back()) {
                stack.pop_back();
            }
            stack.push_back(cur->val);
            cur = cur->next;
        }

        ListNode* dummy = new ListNode();
        cur = dummy;

        for (int num : stack) {
            cur->next = new ListNode(num);
            cur = cur->next;
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
    removeNodes(head) {
        let stack = [];
        let cur = head;

        while (cur) {
            while (stack.length && cur.val > stack[stack.length - 1]) {
                stack.pop();
            }
            stack.push(cur.val);
            cur = cur.next;
        }

        let dummy = new ListNode();
        cur = dummy;

        for (let num of stack) {
            cur.next = new ListNode(num);
            cur = cur.next;
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
    public ListNode RemoveNodes(ListNode head) {
        var stack = new List<int>();
        var cur = head;

        while (cur != null) {
            while (stack.Count > 0 && cur.val > stack[stack.Count - 1]) {
                stack.RemoveAt(stack.Count - 1);
            }
            stack.Add(cur.val);
            cur = cur.next;
        }

        var dummy = new ListNode();
        cur = dummy;

        foreach (int num in stack) {
            cur.next = new ListNode(num);
            cur = cur.next;
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
func removeNodes(head *ListNode) *ListNode {
    stack := []int{}
    cur := head

    for cur != nil {
        for len(stack) > 0 && cur.Val > stack[len(stack)-1] {
            stack = stack[:len(stack)-1]
        }
        stack = append(stack, cur.Val)
        cur = cur.Next
    }

    dummy := &ListNode{}
    cur = dummy

    for _, num := range stack {
        cur.Next = &ListNode{Val: num}
        cur = cur.Next
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
    fun removeNodes(head: ListNode?): ListNode? {
        val stack = mutableListOf<Int>()
        var cur = head

        while (cur != null) {
            while (stack.isNotEmpty() && cur.`val` > stack.last()) {
                stack.removeAt(stack.size - 1)
            }
            stack.add(cur.`val`)
            cur = cur.next
        }

        val dummy = ListNode(0)
        var node: ListNode? = dummy

        for (num in stack) {
            node?.next = ListNode(num)
            node = node?.next
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
    func removeNodes(_ head: ListNode?) -> ListNode? {
        var stack = [Int]()
        var cur = head

        while cur != nil {
            while !stack.isEmpty && cur!.val > stack.last! {
                stack.removeLast()
            }
            stack.append(cur!.val)
            cur = cur?.next
        }

        let dummy = ListNode()
        var node: ListNode? = dummy

        for num in stack {
            node?.next = ListNode(num)
            node = node?.next
        }

        return dummy.next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Recursion

### Intuition

Recursion lets us process the list from right to left naturally. We first recurse to the end, then on the way back, each node compares itself to whatever remains in the processed suffix. If the next node has a larger value, the current node should be removed, so we return `head.next` instead. Otherwise, we keep the current node.

### Algorithm

1. Base case: if `head` is `null`, return `null`.
2. Recursively process `head.next` and assign the result back to `head.next`.
3. If `head.next` exists and `head.val < head.next.val`, return `head.next` (remove current node).
4. Otherwise, return `head` (keep current node).

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNodes(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head:
            return None

        head.next = self.removeNodes(head.next)
        if head.next and head.val < head.next.val:
            return head.next
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
    public ListNode removeNodes(ListNode head) {
        if (head == null) return null;

        head.next = removeNodes(head.next);
        if (head.next != null && head.val < head.next.val) {
            return head.next;
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
    ListNode* removeNodes(ListNode* head) {
        if (!head) return nullptr;

        head->next = removeNodes(head->next);
        if (head->next && head->val < head->next->val) {
            return head->next;
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
    removeNodes(head) {
        if (!head) return null;

        head.next = this.removeNodes(head.next);
        if (head.next && head.val < head.next.val) {
            return head.next;
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
    public ListNode RemoveNodes(ListNode head) {
        if (head == null) return null;

        head.next = RemoveNodes(head.next);
        if (head.next != null && head.val < head.next.val) {
            return head.next;
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
func removeNodes(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    head.Next = removeNodes(head.Next)
    if head.Next != nil && head.Val < head.Next.Val {
        return head.Next
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
    fun removeNodes(head: ListNode?): ListNode? {
        if (head == null) return null

        head.next = removeNodes(head.next)
        if (head.next != null && head.`val` < head.next!!.`val`) {
            return head.next
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
    func removeNodes(_ head: ListNode?) -> ListNode? {
        guard let head = head else { return nil }

        head.next = removeNodes(head.next)
        if let next = head.next, head.val < next.val {
            return head.next
        }
        return head
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 4. Reverse Twice

### Intuition

Finding the maximum to the right is hard when traversing left to right, but finding the maximum to the left is easy. By reversing the list first, the problem transforms: now we just need to keep nodes that are greater than or equal to all previous nodes. We traverse once while tracking the running maximum and remove smaller nodes. Finally, we reverse again to restore the original order.

### Algorithm

1. Reverse the linked list.
2. Traverse the reversed list, tracking the maximum value seen so far (`cur_max`):
   - If `cur.next.val < cur_max`, skip it by setting `cur.next = cur.next.next`.
   - Otherwise, update `cur_max` and move to the next node.
3. Reverse the list again to restore original order.
4. Return the new head.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNodes(self, head: Optional[ListNode]) -> Optional[ListNode]:
        def reverse(head):
            prev, cur = None, head
            while cur:
                tmp = cur.next
                cur.next = prev
                prev, cur = cur, tmp
            return prev

        head = reverse(head)
        cur = head
        cur_max = head.val

        while cur and cur.next:
            if cur.next.val < cur_max:
                cur.next = cur.next.next
            else:
                cur_max = cur.next.val
                cur = cur.next

        return reverse(head)
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
    public ListNode removeNodes(ListNode head) {
        head = reverse(head);
        ListNode cur = head;
        int curMax = head.val;

        while (cur != null && cur.next != null) {
            if (cur.next.val < curMax) {
                cur.next = cur.next.next;
            } else {
                curMax = cur.next.val;
                cur = cur.next;
            }
        }
        return reverse(head);
    }

    private ListNode reverse(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) {
            ListNode tmp = cur.next;
            cur.next = prev;
            prev = cur;
            cur = tmp;
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
    ListNode* reverse(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* cur = head;
        while (cur) {
            ListNode* tmp = cur->next;
            cur->next = prev;
            prev = cur;
            cur = tmp;
        }
        return prev;
    }

    ListNode* removeNodes(ListNode* head) {
        head = reverse(head);
        ListNode* cur = head;
        int cur_max = head->val;

        while (cur && cur->next) {
            if (cur->next->val < cur_max) {
                cur->next = cur->next->next;
            } else {
                cur_max = cur->next->val;
                cur = cur->next;
            }
        }
        return reverse(head);
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
    removeNodes(head) {
        const reverse = (head) => {
            let prev = null,
                cur = head;
            while (cur) {
                let tmp = cur.next;
                cur.next = prev;
                prev = cur;
                cur = tmp;
            }
            return prev;
        };

        head = reverse(head);
        let cur = head;
        let cur_max = head.val;

        while (cur && cur.next) {
            if (cur.next.val < cur_max) {
                cur.next = cur.next.next;
            } else {
                cur_max = cur.next.val;
                cur = cur.next;
            }
        }
        return reverse(head);
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
    private ListNode Reverse(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) {
            ListNode tmp = cur.next;
            cur.next = prev;
            prev = cur;
            cur = tmp;
        }
        return prev;
    }

    public ListNode RemoveNodes(ListNode head) {
        head = Reverse(head);
        ListNode cur = head;
        int curMax = head.val;

        while (cur != null && cur.next != null) {
            if (cur.next.val < curMax) {
                cur.next = cur.next.next;
            } else {
                curMax = cur.next.val;
                cur = cur.next;
            }
        }
        return Reverse(head);
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
func removeNodes(head *ListNode) *ListNode {
    reverse := func(head *ListNode) *ListNode {
        var prev *ListNode = nil
        cur := head
        for cur != nil {
            tmp := cur.Next
            cur.Next = prev
            prev = cur
            cur = tmp
        }
        return prev
    }

    head = reverse(head)
    cur := head
    curMax := head.Val

    for cur != nil && cur.Next != nil {
        if cur.Next.Val < curMax {
            cur.Next = cur.Next.Next
        } else {
            curMax = cur.Next.Val
            cur = cur.Next
        }
    }
    return reverse(head)
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
    private fun reverse(head: ListNode?): ListNode? {
        var prev: ListNode? = null
        var cur = head
        while (cur != null) {
            val tmp = cur.next
            cur.next = prev
            prev = cur
            cur = tmp
        }
        return prev
    }

    fun removeNodes(head: ListNode?): ListNode? {
        var h = reverse(head)
        var cur = h
        var curMax = h!!.`val`

        while (cur != null && cur.next != null) {
            if (cur.next!!.`val` < curMax) {
                cur.next = cur.next!!.next
            } else {
                curMax = cur.next!!.`val`
                cur = cur.next
            }
        }
        return reverse(h)
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
    func reverse(_ head: ListNode?) -> ListNode? {
        var prev: ListNode? = nil
        var cur = head
        while cur != nil {
            let tmp = cur?.next
            cur?.next = prev
            prev = cur
            cur = tmp
        }
        return prev
    }

    func removeNodes(_ head: ListNode?) -> ListNode? {
        var head = reverse(head)
        var cur = head
        var curMax = head!.val

        while cur != nil && cur?.next != nil {
            if cur!.next!.val < curMax {
                cur?.next = cur?.next?.next
            } else {
                curMax = cur!.next!.val
                cur = cur?.next
            }
        }
        return reverse(head)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Comparing with Immediate Neighbor Instead of Maximum

The problem requires removing nodes that have *any* larger value to their right, not just an immediately adjacent larger value. A node should be kept only if it is greater than or equal to all nodes to its right. Using the wrong comparison leads to incorrect removals.

### Incorrect Stack Maintenance

When using a monotonic stack, the stack must remain strictly decreasing. Forgetting to pop smaller elements before pushing, or using the wrong comparison operator (e.g., `>=` instead of `>`), breaks the invariant and produces wrong results.

### Losing the New Head After Reversal

In the reverse-twice approach, both reversals change which node is the head. Failing to capture and return the correct head after the second reversal causes the function to return a pointer into the middle of the list or a stale reference.
