## 1. Convert TO Array

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head:
            return None
        arr = []
        cur = head

        while cur:
            arr.append(cur)
            cur = cur.next

        for i in range(0, len(arr) - 1, 2):
            arr[i], arr[i + 1] = arr[i + 1], arr[i]

        for i in range(len(arr) - 1):
            arr[i].next = arr[i + 1]

        arr[-1].next = None
        return arr[0]
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
    public ListNode swapPairs(ListNode head) {
        if (head == null) return null;

        List<ListNode> arr = new ArrayList<>();
        ListNode cur = head;

        while (cur != null) {
            arr.add(cur);
            cur = cur.next;
        }

        for (int i = 0; i < arr.size() - 1; i += 2) {
            ListNode temp = arr.get(i);
            arr.set(i, arr.get(i + 1));
            arr.set(i + 1, temp);
        }

        for (int i = 0; i < arr.size() - 1; i++) {
            arr.get(i).next = arr.get(i + 1);
        }

        arr.get(arr.size() - 1).next = null;
        return arr.get(0);
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
    ListNode* swapPairs(ListNode* head) {
        if (!head) return nullptr;

        vector<ListNode*> arr;
        ListNode* cur = head;

        while (cur) {
            arr.push_back(cur);
            cur = cur->next;
        }

        for (size_t i = 0; i + 1 < arr.size(); i += 2) {
            swap(arr[i], arr[i + 1]);
        }

        for (size_t i = 0; i + 1 < arr.size(); i++) {
            arr[i]->next = arr[i + 1];
        }

        arr.back()->next = nullptr;
        return arr[0];
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
    swapPairs(head) {
        if (!head) return null;

        let arr = [];
        let cur = head;

        while (cur) {
            arr.push(cur);
            cur = cur.next;
        }

        for (let i = 0; i + 1 < arr.length; i += 2) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }

        for (let i = 0; i + 1 < arr.length; i++) {
            arr[i].next = arr[i + 1];
        }

        arr[arr.length - 1].next = null;
        return arr[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Recursion

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        cur = head
        nxt = head.next
        cur.next = self.swapPairs(nxt.next)
        nxt.next = cur
        return nxt
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
    public ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode cur = head;
        ListNode nxt = head.next;
        cur.next = swapPairs(nxt.next);
        nxt.next = cur;

        return nxt;
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
    ListNode* swapPairs(ListNode* head) {
        if (!head || !head->next) {
            return head;
        }

        ListNode* cur = head;
        ListNode* nxt = head->next;
        cur->next = swapPairs(nxt->next);
        nxt->next = cur;

        return nxt;
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
    swapPairs(head) {
        if (!head || !head.next) {
            return head;
        }

        let cur = head;
        let nxt = head.next;
        cur.next = this.swapPairs(nxt.next);
        nxt.next = cur;

        return nxt;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Iteration

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        prev, curr = dummy, head

        while curr and curr.next:
            nxtPair = curr.next.next
            second = curr.next

            # Reverse this pair
            second.next = curr
            curr.next = nxtPair
            prev.next = second

            # Update pointers
            prev = curr
            curr = nxtPair

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
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy, curr = head;

        while (curr != null && curr.next != null) {
            ListNode nxtPair = curr.next.next;
            ListNode second = curr.next;

            // Reverse this pair
            second.next = curr;
            curr.next = nxtPair;
            prev.next = second;

            // Update pointers
            prev = curr;
            curr = nxtPair;
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
    ListNode* swapPairs(ListNode* head) {
        ListNode dummy(0, head);
        ListNode* prev = &dummy, *curr = head;

        while (curr && curr->next) {
            ListNode* nxtPair = curr->next->next;
            ListNode* second = curr->next;

            // Reverse this pair
            second->next = curr;
            curr->next = nxtPair;
            prev->next = second;

            // Update pointers
            prev = curr;
            curr = nxtPair;
        }

        return dummy.next;
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
    swapPairs(head) {
        let dummy = new ListNode(0, head);
        let prev = dummy,
            curr = head;

        while (curr && curr.next) {
            let nxtPair = curr.next.next;
            let second = curr.next;

            // Reverse this pair
            second.next = curr;
            curr.next = nxtPair;
            prev.next = second;

            // Update pointers
            prev = curr;
            curr = nxtPair;
        }

        return dummy.next;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
