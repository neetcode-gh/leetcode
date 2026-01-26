## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Linked Lists** - Traversing and creating new nodes in a singly linked list
- **Recursion** - Understanding how to break down problems into smaller subproblems
- **Carry Propagation** - How carry works when adding numbers digit by digit

---

## 1. Recursion

### Intuition

We add the two linked lists exactly like adding two numbers on paper.

Each node contains one digit, and since the lists are stored in **reverse order**, the head contains the ones place — making addition easy.  
At every step:

1. Take a digit from `l1` (or `0` if it's finished)
2. Take a digit from `l2` (or `0` if it's finished)
3. Add them with the incoming `carry`
4. Create a new node for the current digit (`sum % 10`)
5. Pass the new `carry` (`sum // 10`) forward using **recursion**

The recursion naturally processes digits from left to right and stops only when:
- both lists are fully processed **and**
- no carry remains.

### Algorithm

1. Define a recursive function `add(l1, l2, carry)`:
   - If `l1`, `l2` are both `None` and `carry` is `0`, return `None`.
   - Extract:
     - `v1 = l1.val` if `l1` exists, else `0`
     - `v2 = l2.val` if `l2` exists, else `0`
   - Compute:
     - `total = v1 + v2 + carry`
     - `carry, digit = divmod(total, 10)`
   - Recursively compute the next node using:
     - `l1.next` if exists
     - `l2.next` if exists
     - updated `carry`
   - Return a node with value `digit` whose `next` is the recursive result.

2. In `addTwoNumbers`, call:
    - `return add(l1, l2, 0)`

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def add(self, l1: Optional[ListNode], l2: Optional[ListNode], carry: int) -> Optional[ListNode]:
        if not l1 and not l2 and carry == 0:
            return None

        v1 = l1.val if l1 else 0
        v2 = l2.val if l2 else 0

        carry, val = divmod(v1 + v2 + carry, 10)

        next_node = self.add(
            l1.next if l1 else None,
            l2.next if l2 else None,
            carry
        )
        return ListNode(val, next_node)

    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        return self.add(l1, l2, 0)
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
    public ListNode add(ListNode l1, ListNode l2, int carry) {
        if (l1 == null && l2 == null && carry == 0) {
            return null;
        }

        int v1 = 0;
        int v2 = 0;
        if (l1 != null) {
            v1 = l1.val;
        }
        if (l2 != null) {
            v2 = l2.val;
        }

        int sum = v1 + v2 + carry;
        int newCarry = sum / 10;
        int nodeValue = sum % 10;

        ListNode nextNode = add(
            (l1 != null) ? l1.next : null,
            (l2 != null) ? l2.next : null,
            newCarry
        );

        return new ListNode(nodeValue, nextNode);
    }

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        return add(l1, l2, 0);
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
    ListNode* add(ListNode* l1, ListNode* l2, int carry) {
        if (!l1 && !l2 && carry == 0) {
            return nullptr;
        }

        int v1 = 0;
        int v2 = 0;
        if (l1) {
            v1 = l1->val;
        }
        if (l2) {
            v2 = l2->val;
        }

        int sum = v1 + v2 + carry;
        int newCarry = sum / 10;
        int nodeValue = sum % 10;

        ListNode* nextNode = add(
            (l1 ? l1->next : nullptr),
            (l2 ? l2->next : nullptr),
            newCarry
        );

        return new ListNode(nodeValue, nextNode);
    }

    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        return add(l1, l2, 0);
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
     * @param {number} carry
     * @return {ListNode}
     */
    add(l1, l2, carry) {
        if (!l1 && !l2 && carry === 0) {
            return null;
        }

        let v1 = 0;
        let v2 = 0;
        if (l1) {
            v1 = l1.val;
        }
        if (l2) {
            v2 = l2.val;
        }

        let sum = v1 + v2 + carry;
        let newCarry = Math.floor(sum / 10);
        let nodeValue = sum % 10;

        let nextNode = this.add(
            l1 ? l1.next : null,
            l2 ? l2.next : null,
            newCarry,
        );

        return new ListNode(nodeValue, nextNode);
    }

    /**
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    addTwoNumbers(l1, l2) {
        return this.add(l1, l2, 0);
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
    public ListNode Add(ListNode l1, ListNode l2, int carry) {
        if (l1 == null && l2 == null && carry == 0) {
            return null;
        }

        int v1 = 0;
        int v2 = 0;
        if (l1 != null) {
            v1 = l1.val;
        }
        if (l2 != null) {
            v2 = l2.val;
        }

        int sum = v1 + v2 + carry;
        int newCarry = sum / 10;
        int nodeValue = sum % 10;

        ListNode nextNode = Add(
            (l1 != null ? l1.next : null),
            (l2 != null ? l2.next : null),
            newCarry
        );

        return new ListNode(nodeValue) { next = nextNode };
    }

    public ListNode AddTwoNumbers(ListNode l1, ListNode l2) {
        return Add(l1, l2, 0);
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
func add(l1 *ListNode, l2 *ListNode, carry int) *ListNode {
    if l1 == nil && l2 == nil && carry == 0 {
        return nil
    }

    v1, v2 := 0, 0
    if l1 != nil {
        v1 = l1.Val
    }
    if l2 != nil {
        v2 = l2.Val
    }

    sum := v1 + v2 + carry
    carry, val := sum/10, sum%10

    var nextNode *ListNode
    nextL1 := l1
    nextL2 := l2
    if l1 != nil {
        nextL1 = l1.Next
    } else {
        nextL1 = nil
    }
    if l2 != nil {
        nextL2 = l2.Next
    } else {
        nextL2 = nil
    }
    nextNode = add(nextL1, nextL2, carry)

    return &ListNode{Val: val, Next: nextNode}
}

func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    return add(l1, l2, 0)
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
    private fun add(l1: ListNode?, l2: ListNode?, carry: Int): ListNode? {
        if (l1 == null && l2 == null && carry == 0) return null

        val v1 = l1?.`val` ?: 0
        val v2 = l2?.`val` ?: 0
        val sum = v1 + v2 + carry
        val newCarry = sum / 10
        val valNode = sum % 10

        val nextNode = add(l1?.next, l2?.next, newCarry)
        return ListNode(valNode).apply { next = nextNode }
    }

    fun addTwoNumbers(l1: ListNode?, l2: ListNode?): ListNode? {
        return add(l1, l2, 0)
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
    private func add(_ l1: ListNode?, _ l2: ListNode?, _ carry: Int) -> ListNode? {
        if l1 == nil && l2 == nil && carry == 0 {
            return nil
        }

        let v1 = l1?.val ?? 0
        let v2 = l2?.val ?? 0

        let sum = v1 + v2 + carry
        let newCarry = sum / 10
        let val = sum % 10

        let nextNode = add(l1?.next, l2?.next, newCarry)
        return ListNode(val, nextNode)
    }

    func addTwoNumbers(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
        return add(l1, l2, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(m + n)$

> Where $m$ is the length of $l1$ and $n$ is the length of $l2$.

---

## 2. Iteration

### Intuition

We simulate normal addition the same way we do on paper — digit by digit.

The linked lists store numbers in **reverse order**, so the first nodes represent the 1’s place.  
This makes addition straightforward:

- Add the two digits.
- Add the `carry` from the previous step.
- Save the resulting digit (`sum % 10`) into a new node.
- Update the `carry` (`sum // 10`).
- Move both pointers forward.

We continue until **both lists are finished AND no carry remains**.  
A dummy node helps us easily build and return the final linked list.

### Algorithm

1. Create:
   - A `dummy` node (to build the answer)
   - A pointer `cur` pointing to `dummy`
   - An integer `carry = 0`

2. Loop while `l1` exists, `l2` exists, or `carry` is non-zero:
   - Read the current digit of each list (`0` if that list already ended)
   - Compute
     `sum = v1 + v2 + carry`
   - Update:
     `carry = sum // 10`
     `digit = sum % 10`
   - Append a new node containing `digit`
   - Move the pointers `l1`, `l2`, and `cur` forward

3. Return `dummy.next` (the head of the result list)

This ensures correct handling of:
- different lengths of input lists  
- leftover carry  
- building the result in one pass  

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        cur = dummy

        carry = 0
        while l1 or l2 or carry:
            v1 = l1.val if l1 else 0
            v2 = l2.val if l2 else 0

            # new digit
            val = v1 + v2 + carry
            carry = val // 10
            val = val % 10
            cur.next = ListNode(val)

            # update ptrs
            cur = cur.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None

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
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode();
        ListNode cur = dummy;

        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int v1 = (l1 != null) ? l1.val : 0;
            int v2 = (l2 != null) ? l2.val : 0;

            int val = v1 + v2 + carry;
            carry = val / 10;
            val = val % 10;
            cur.next = new ListNode(val);

            cur = cur.next;
            l1 = (l1 != null) ? l1.next : null;
            l2 = (l2 != null) ? l2.next : null;
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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* dummy = new ListNode();
        ListNode* cur = dummy;

        int carry = 0;
        while (l1 != nullptr || l2 != nullptr || carry != 0) {
            int v1 = (l1 != nullptr) ? l1->val : 0;
            int v2 = (l2 != nullptr) ? l2->val : 0;

            int val = v1 + v2 + carry;
            carry = val / 10;
            val = val % 10;
            cur->next = new ListNode(val);

            cur = cur->next;
            l1 = (l1 != nullptr) ? l1->next : nullptr;
            l2 = (l2 != nullptr) ? l2->next : nullptr;
        }
        ListNode* res = dummy->next;
        delete dummy;
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
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    addTwoNumbers(l1, l2) {
        const dummy = new ListNode();
        let cur = dummy;

        let carry = 0;
        while (l1 || l2 || carry) {
            const v1 = l1 ? l1.val : 0;
            const v2 = l2 ? l2.val : 0;

            let val = v1 + v2 + carry;
            carry = Math.floor(val / 10);
            val = val % 10;
            cur.next = new ListNode(val);

            cur = cur.next;
            l1 = l1 ? l1.next : null;
            l2 = l2 ? l2.next : null;
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
    public ListNode AddTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode();
        ListNode cur = dummy;

        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int v1 = (l1 != null) ? l1.val : 0;
            int v2 = (l2 != null) ? l2.val : 0;

            int val = v1 + v2 + carry;
            carry = val / 10;
            val = val % 10;
            cur.next = new ListNode(val);

            cur = cur.next;
            l1 = (l1 != null) ? l1.next : null;
            l2 = (l2 != null) ? l2.next : null;
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
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    dummy := &ListNode{}
    cur := dummy
    carry := 0

    for l1 != nil || l2 != nil || carry != 0 {
        v1 := 0
        if l1 != nil {
            v1 = l1.Val
            l1 = l1.Next
        }

        v2 := 0
        if l2 != nil {
            v2 = l2.Val
            l2 = l2.Next
        }

        val := v1 + v2 + carry
        carry = val / 10
        cur.Next = &ListNode{Val: val % 10}
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
    fun addTwoNumbers(l1: ListNode?, l2: ListNode?): ListNode? {
        val dummy = ListNode(0)
        var cur = dummy
        var carry = 0

        var p1 = l1
        var p2 = l2

        while (p1 != null || p2 != null || carry != 0) {
            val v1 = p1?.`val` ?: 0
            val v2 = p2?.`val` ?: 0

            val sum = v1 + v2 + carry
            carry = sum / 10
            cur.next = ListNode(sum % 10)

            cur = cur.next!!
            p1 = p1?.next
            p2 = p2?.next
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
    func addTwoNumbers(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
        let dummy = ListNode(0)
        var cur = dummy
        var l1 = l1, l2 = l2
        var carry = 0

        while l1 != nil || l2 != nil || carry != 0 {
            let v1 = l1?.val ?? 0
            let v2 = l2?.val ?? 0

            let sum = v1 + v2 + carry
            carry = sum / 10
            let val = sum % 10
            cur.next = ListNode(val)

            cur = cur.next!
            l1 = l1?.next
            l2 = l2?.next
        }
        return dummy.next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(max(m, n))$ for the output list.

> Where $m$ is the length of $l1$ and $n$ is the length of $l2$.

---

## Common Pitfalls

### Forgetting the Final Carry
When both lists are exhausted, there may still be a carry of 1 (e.g., `999 + 1 = 1000`). Stopping the loop early without checking for remaining carry produces an incorrect result.
```python
# Wrong: missing carry check
while l1 or l2:  # Should be: while l1 or l2 or carry
    # ...
```

### Not Handling Lists of Different Lengths
When one list is longer than the other, the loop must continue processing the remaining nodes. Using `l1 and l2` instead of `l1 or l2` stops too early.
```python
# Wrong: requires both lists to have nodes
while l1 and l2:  # Stops when either list ends
    # ...
```
