## 1. Recursion

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
            (l1 ? l1.next : null), 
            (l2 ? l2.next : null), 
            newCarry
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m + n)$
* Space complexity: $O(m + n)$

> Where $m$ is the length $l1$ and $n$ is the length of $l2$.

---

## 2. Iteration

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m + n)$
* Space complexity: $O(1)$

> Where $m$ is the length $l1$ and $n$ is the length of $l2$.