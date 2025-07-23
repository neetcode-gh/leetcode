## 1. Reverse List

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m + n)$
* Space complexity: $O(max(m, n))$ for the output list.

> Where $m$ is the length of $l1$ and $n$ is the length of $l2$.

---

## 2. Stack

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m + n)$
* Space complexity: $O(m + n)$

> Where $m$ is the length of $l1$ and $n$ is the length of $l2$.