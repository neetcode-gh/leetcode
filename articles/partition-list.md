## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Two Pointers

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
