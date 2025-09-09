## 1. Convert To Array

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if not head:
            return None

        arr, cur = [], head
        while cur:
            arr.append(cur.val)
            cur = cur.next

        n = len(arr)
        k %= n
        cur = head
        for i in range(n - k, n):
            cur.val = arr[i]
            cur = cur.next

        for i in range(n - k):
            cur.val = arr[i]
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
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null) return null;

        ArrayList<Integer> arr = new ArrayList<>();
        ListNode cur = head;
        while (cur != null) {
            arr.add(cur.val);
            cur = cur.next;
        }

        int n = arr.size();
        k %= n;
        cur = head;
        for (int i = n - k; i < n; i++) {
            cur.val = arr.get(i);
            cur = cur.next;
        }
        for (int i = 0; i < n - k; i++) {
            cur.val = arr.get(i);
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
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head) return nullptr;

        vector<int> arr;
        ListNode* cur = head;
        while (cur) {
            arr.push_back(cur->val);
            cur = cur->next;
        }

        int n = arr.size();
        k %= n;
        cur = head;
        for (int i = n - k; i < n; i++) {
            cur->val = arr[i];
            cur = cur->next;
        }
        for (int i = 0; i < n - k; i++) {
            cur->val = arr[i];
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
     * @param {number} k
     * @return {ListNode}
     */
    rotateRight(head, k) {
        if (!head) return null;

        let arr = [];
        let cur = head;
        while (cur) {
            arr.push(cur.val);
            cur = cur.next;
        }

        let n = arr.length;
        k %= n;
        cur = head;
        for (let i = n - k; i < n; i++) {
            cur.val = arr[i];
            cur = cur.next;
        }
        for (let i = 0; i < n - k; i++) {
            cur.val = arr[i];
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
    public ListNode RotateRight(ListNode head, int k) {
        if (head == null) {
            return null;
        }

        List<int> arr = new List<int>();
        ListNode cur = head;
        while (cur != null) {
            arr.Add(cur.val);
            cur = cur.next;
        }

        int n = arr.Count;
        k %= n;
        cur = head;
        for (int i = n - k; i < n; i++) {
            cur.val = arr[i];
            cur = cur.next;
        }

        for (int i = 0; i < n - k; i++) {
            cur.val = arr[i];
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

## 2. Iteration

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if not head:
            return head

        length, tail = 1, head
        while tail.next:
            tail = tail.next
            length += 1

        k = k % length
        if k == 0:
            return head

        cur = head
        for i in range(length - k - 1):
            cur = cur.next
        newHead = cur.next
        cur.next = None
        tail.next = head

        return newHead
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
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null) {
            return head;
        }

        int length = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            length++;
        }

        k = k % length;
        if (k == 0) {
            return head;
        }

        ListNode cur = head;
        for (int i = 0; i < length - k - 1; i++) {
            cur = cur.next;
        }
        ListNode newHead = cur.next;
        cur.next = null;
        tail.next = head;

        return newHead;
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
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head) {
            return head;
        }

        int length = 1;
        ListNode* tail = head;
        while (tail->next) {
            tail = tail->next;
            length++;
        }

        k = k % length;
        if (k == 0) {
            return head;
        }

        ListNode* cur = head;
        for (int i = 0; i < length - k - 1; i++) {
            cur = cur->next;
        }
        ListNode* newHead = cur->next;
        cur->next = nullptr;
        tail->next = head;

        return newHead;
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
     * @param {number} k
     * @return {ListNode}
     */
    rotateRight(head, k) {
        if (!head) {
            return head;
        }

        let length = 1,
            tail = head;
        while (tail.next) {
            tail = tail.next;
            length++;
        }

        k = k % length;
        if (k === 0) {
            return head;
        }

        let cur = head;
        for (let i = 0; i < length - k - 1; i++) {
            cur = cur.next;
        }
        let newHead = cur.next;
        cur.next = null;
        tail.next = head;

        return newHead;
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
    public ListNode RotateRight(ListNode head, int k) {
        if (head == null) {
            return head;
        }

        int length = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            length++;
        }

        k = k % length;
        if (k == 0) {
            return head;
        }

        ListNode cur = head;
        for (int i = 0; i < length - k - 1; i++) {
            cur = cur.next;
        }

        ListNode newHead = cur.next;
        cur.next = null;
        tail.next = head;

        return newHead;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 3. Iteration (Using One Pointer)

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if not head:
            return head

        cur, n = head, 1
        while cur.next:
            n += 1
            cur = cur.next

        cur.next = head
        k %= n
        for i in range(n - k):
            cur = cur.next

        head = cur.next
        cur.next = None
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
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null) {
            return head;
        }

        ListNode cur = head;
        int n = 1;
        while (cur.next != null) {
            n++;
            cur = cur.next;
        }

        cur.next = head;
        k %= n;
        for (int i = 0; i < n - k; i++) {
            cur = cur.next;
        }

        head = cur.next;
        cur.next = null;
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
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head) {
            return head;
        }

        ListNode* cur = head;
        int n = 1;
        while (cur->next) {
            n++;
            cur = cur->next;
        }

        cur->next = head;
        k %= n;
        for (int i = 0; i < n - k; i++) {
            cur = cur->next;
        }

        head = cur->next;
        cur->next = nullptr;
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
     * @param {number} k
     * @return {ListNode}
     */
    rotateRight(head, k) {
        if (!head) {
            return head;
        }

        let cur = head,
            n = 1;
        while (cur.next) {
            n++;
            cur = cur.next;
        }

        cur.next = head;
        k %= n;
        for (let i = 0; i < n - k; i++) {
            cur = cur.next;
        }

        head = cur.next;
        cur.next = null;
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
    public ListNode RotateRight(ListNode head, int k) {
        if (head == null) {
            return head;
        }

        ListNode cur = head;
        int n = 1;
        while (cur.next != null) {
            n++;
            cur = cur.next;
        }

        cur.next = head;
        k %= n;
        for (int i = 0; i < n - k; i++) {
            cur = cur.next;
        }

        head = cur.next;
        cur.next = null;
        return head;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
