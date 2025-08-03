## 1. Convert To Array

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the first list and $m$ is the length of the second list.

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the length of the first list and $m$ is the length of the second list.

---

## 3. Recursion

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n)$ for recursion stack.

> Where $n$ is the length of the first list and $m$ is the length of the second list.
