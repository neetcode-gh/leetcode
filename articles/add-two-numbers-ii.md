## 1. Reverse List

### Intuition

When adding two numbers, we naturally start from the least significant digit. The problem gives us numbers stored with the most significant digit first, so reversing both lists makes the addition straightforward.

After reversing, we can walk through both lists simultaneously, adding corresponding digits along with any carry. We build the result by prepending each new digit to our answer, which naturally produces the correct order without needing another reversal at the end.

### Algorithm

1. Reverse both linked lists `l1` and `l2`.
2. Initialize `head = null` and `carry = 0`.
3. While either list has nodes remaining or `carry > 0`:
   - Get the values `v1` and `v2` from the current nodes (use 0 if a list is exhausted).
   - Compute `total = v1 + v2 + carry`.
   - Create a new node with value `total % 10` and prepend it to `head`.
   - Update `carry = total / 10`.
   - Advance both list pointers.
4. Return `head`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        def reverseList(head):
            prev, curr = None, head
            while curr:
                temp = curr.next
                curr.next = prev
                prev = curr
                curr = temp
            return prev

        l1 = reverseList(l1)
        l2 = reverseList(l2)
        head = None
        carry = 0

        while l1 or l2 or carry:
            v1 = l1.val if l1 else 0
            v2 = l2.val if l2 else 0
            total = v1 + v2 + carry
            carry = total // 10
            node = ListNode(total % 10)
            node.next = head
            head = node
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None

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
    private ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }
        return prev;
    }

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        l1 = reverseList(l1);
        l2 = reverseList(l2);
        ListNode head = null;
        int carry = 0;

        while (l1 != null || l2 != null || carry > 0) {
            int v1 = l1 != null ? l1.val : 0;
            int v2 = l2 != null ? l2.val : 0;
            int total = v1 + v2 + carry;
            carry = total / 10;
            ListNode node = new ListNode(total % 10);
            node.next = head;
            head = node;
            l1 = l1 != null ? l1.next : null;
            l2 = l2 != null ? l2.next : null;
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

public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        l1 = reverseList(l1);
        l2 = reverseList(l2);
        ListNode* head = nullptr;
        int carry = 0;

        while (l1 || l2 || carry) {
            int v1 = l1 ? l1->val : 0;
            int v2 = l2 ? l2->val : 0;
            int total = v1 + v2 + carry;
            carry = total / 10;
            ListNode* node = new ListNode(total % 10);
            node->next = head;
            head = node;
            l1 = l1 ? l1->next : nullptr;
            l2 = l2 ? l2->next : nullptr;
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
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    addTwoNumbers(l1, l2) {
        const reverseList = (head) => {
            let prev = null, curr = head;
            while (curr) {
                let temp = curr.next;
                curr.next = prev;
                prev = curr;
                curr = temp;
            }
            return prev;
        }

        l1 = reverseList(l1);
        l2 = reverseList(l2);
        let head = null;
        let carry = 0;

        while (l1 || l2 || carry) {
            let v1 = l1 ? l1.val : 0;
            let v2 = l2 ? l2.val : 0;
            let total = v1 + v2 + carry;
            carry = Math.floor(total / 10);
            let node = new ListNode(total % 10);
            node.next = head;
            head = node;
            l1 = l1 ? l1.next : null;
            l2 = l2 ? l2.next : null;
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
    private ListNode ReverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }
        return prev;
    }

    public ListNode AddTwoNumbers(ListNode l1, ListNode l2) {
        l1 = ReverseList(l1);
        l2 = ReverseList(l2);
        ListNode head = null;
        int carry = 0;

        while (l1 != null || l2 != null || carry != 0) {
            int v1 = l1 != null ? l1.val : 0;
            int v2 = l2 != null ? l2.val : 0;
            int total = v1 + v2 + carry;
            carry = total / 10;
            ListNode node = new ListNode(total % 10);
            node.next = head;
            head = node;
            l1 = l1 != null ? l1.next : null;
            l2 = l2 != null ? l2.next : null;
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
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    reverseList := func(head *ListNode) *ListNode {
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

    l1 = reverseList(l1)
    l2 = reverseList(l2)
    var head *ListNode
    carry := 0

    for l1 != nil || l2 != nil || carry > 0 {
        v1, v2 := 0, 0
        if l1 != nil {
            v1 = l1.Val
            l1 = l1.Next
        }
        if l2 != nil {
            v2 = l2.Val
            l2 = l2.Next
        }
        total := v1 + v2 + carry
        carry = total / 10
        node := &ListNode{Val: total % 10, Next: head}
        head = node
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

    fun addTwoNumbers(l1: ListNode?, l2: ListNode?): ListNode? {
        var list1 = reverseList(l1)
        var list2 = reverseList(l2)
        var head: ListNode? = null
        var carry = 0

        while (list1 != null || list2 != null || carry > 0) {
            val v1 = list1?.`val` ?: 0
            val v2 = list2?.`val` ?: 0
            val total = v1 + v2 + carry
            carry = total / 10
            val node = ListNode(total % 10)
            node.next = head
            head = node
            list1 = list1?.next
            list2 = list2?.next
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

    func addTwoNumbers(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
        var l1 = reverseList(l1)
        var l2 = reverseList(l2)
        var head: ListNode? = nil
        var carry = 0

        while l1 != nil || l2 != nil || carry > 0 {
            let v1 = l1?.val ?? 0
            let v2 = l2?.val ?? 0
            let total = v1 + v2 + carry
            carry = total / 10
            let node = ListNode(total % 10)
            node.next = head
            head = node
            l1 = l1?.next
            l2 = l2?.next
        }

        return head
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m + n)$
* Space complexity: $O(max(m, n))$ for the output list.

> Where $m$ is the length of $l1$ and $n$ is the length of $l2$.

---

## 2. Stack

### Intuition

If we want to avoid modifying the input lists, we can use stacks to reverse the digit order implicitly. Pushing all digits onto stacks gives us access to them in reverse order when we pop.

This approach preserves the original lists while still allowing us to process digits from least significant to most significant. The rest of the logic is identical: add digits with carry and build the result by prepending nodes.

### Algorithm

1. Push all values from `l1` onto stack `s1` and all values from `l2` onto stack `s2`.
2. Initialize `head = null` and `carry = 0`.
3. While either stack is non-empty or `carry > 0`:
   - Pop values from `s1` and `s2` (use 0 if a stack is empty).
   - Compute `total = v1 + v2 + carry`.
   - Create a new node with value `total % 10` and prepend it to `head`.
   - Update `carry = total / 10`.
4. Return `head`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        s1, s2 = [], []

        while l1:
            s1.append(l1.val)
            l1 = l1.next

        while l2:
            s2.append(l2.val)
            l2 = l2.next

        carry = 0
        head = None

        while s1 or s2 or carry:
            v1 = s1.pop() if s1 else 0
            v2 = s2.pop() if s2 else 0
            total = v1 + v2 + carry
            carry = total // 10
            node = ListNode(total % 10)
            node.next = head
            head = node

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
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        Stack<Integer> s1 = new Stack<>();
        Stack<Integer> s2 = new Stack<>();

        while (l1 != null) {
            s1.push(l1.val);
            l1 = l1.next;
        }

        while (l2 != null) {
            s2.push(l2.val);
            l2 = l2.next;
        }

        int carry = 0;
        ListNode head = null;

        while (!s1.isEmpty() || !s2.isEmpty() || carry > 0) {
            int v1 = s1.isEmpty() ? 0 : s1.pop();
            int v2 = s2.isEmpty() ? 0 : s2.pop();
            int total = v1 + v2 + carry;
            carry = total / 10;
            ListNode node = new ListNode(total % 10);
            node.next = head;
            head = node;
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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        stack<int> s1, s2;

        while (l1) {
            s1.push(l1->val);
            l1 = l1->next;
        }

        while (l2) {
            s2.push(l2->val);
            l2 = l2->next;
        }

        int carry = 0;
        ListNode* head = nullptr;

        while (!s1.empty() || !s2.empty() || carry) {
            int v1 = s1.empty() ? 0 : s1.top(); if (!s1.empty()) s1.pop();
            int v2 = s2.empty() ? 0 : s2.top(); if (!s2.empty()) s2.pop();
            int total = v1 + v2 + carry;
            carry = total / 10;
            ListNode* node = new ListNode(total % 10);
            node->next = head;
            head = node;
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
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    addTwoNumbers(l1, l2) {
        const s1 = [], s2 = [];

        while (l1) {
            s1.push(l1.val);
            l1 = l1.next;
        }

        while (l2) {
            s2.push(l2.val);
            l2 = l2.next;
        }

        let carry = 0;
        let head = null;

        while (s1.length || s2.length || carry) {
            const v1 = s1.length ? s1.pop() : 0;
            const v2 = s2.length ? s2.pop() : 0;
            const total = v1 + v2 + carry;
            carry = Math.floor(total / 10);
            const node = new ListNode(total % 10);
            node.next = head;
            head = node;
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
    public ListNode AddTwoNumbers(ListNode l1, ListNode l2) {
        Stack<int> s1 = new Stack<int>();
        Stack<int> s2 = new Stack<int>();

        while (l1 != null) {
            s1.Push(l1.val);
            l1 = l1.next;
        }

        while (l2 != null) {
            s2.Push(l2.val);
            l2 = l2.next;
        }

        int carry = 0;
        ListNode head = null;

        while (s1.Count > 0 || s2.Count > 0 || carry > 0) {
            int v1 = s1.Count > 0 ? s1.Pop() : 0;
            int v2 = s2.Count > 0 ? s2.Pop() : 0;
            int total = v1 + v2 + carry;
            carry = total / 10;
            ListNode node = new ListNode(total % 10);
            node.next = head;
            head = node;
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
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    s1 := []int{}
    s2 := []int{}

    for l1 != nil {
        s1 = append(s1, l1.Val)
        l1 = l1.Next
    }

    for l2 != nil {
        s2 = append(s2, l2.Val)
        l2 = l2.Next
    }

    carry := 0
    var head *ListNode

    for len(s1) > 0 || len(s2) > 0 || carry > 0 {
        v1, v2 := 0, 0
        if len(s1) > 0 {
            v1 = s1[len(s1)-1]
            s1 = s1[:len(s1)-1]
        }
        if len(s2) > 0 {
            v2 = s2[len(s2)-1]
            s2 = s2[:len(s2)-1]
        }
        total := v1 + v2 + carry
        carry = total / 10
        node := &ListNode{Val: total % 10, Next: head}
        head = node
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
    fun addTwoNumbers(l1: ListNode?, l2: ListNode?): ListNode? {
        val s1 = ArrayDeque<Int>()
        val s2 = ArrayDeque<Int>()

        var curr1 = l1
        while (curr1 != null) {
            s1.addLast(curr1.`val`)
            curr1 = curr1.next
        }

        var curr2 = l2
        while (curr2 != null) {
            s2.addLast(curr2.`val`)
            curr2 = curr2.next
        }

        var carry = 0
        var head: ListNode? = null

        while (s1.isNotEmpty() || s2.isNotEmpty() || carry > 0) {
            val v1 = if (s1.isNotEmpty()) s1.removeLast() else 0
            val v2 = if (s2.isNotEmpty()) s2.removeLast() else 0
            val total = v1 + v2 + carry
            carry = total / 10
            val node = ListNode(total % 10)
            node.next = head
            head = node
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
    func addTwoNumbers(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
        var s1 = [Int]()
        var s2 = [Int]()

        var curr1 = l1
        while curr1 != nil {
            s1.append(curr1!.val)
            curr1 = curr1?.next
        }

        var curr2 = l2
        while curr2 != nil {
            s2.append(curr2!.val)
            curr2 = curr2?.next
        }

        var carry = 0
        var head: ListNode? = nil

        while !s1.isEmpty || !s2.isEmpty || carry > 0 {
            let v1 = s1.isEmpty ? 0 : s1.removeLast()
            let v2 = s2.isEmpty ? 0 : s2.removeLast()
            let total = v1 + v2 + carry
            carry = total / 10
            let node = ListNode(total % 10)
            node.next = head
            head = node
        }

        return head
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m + n)$
* Space complexity: $O(m + n)$

> Where $m$ is the length of $l1$ and $n$ is the length of $l2$.