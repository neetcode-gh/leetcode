## 1. Convert To Array

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def splitListToParts(self, head: Optional[ListNode], k: int) -> List[Optional[ListNode]]:
        arr, cur = [], head
        while cur:
            arr.append(cur)
            cur = cur.next

        N = len(arr)
        base_len, remainder = N // k, N % k

        res = [None] * k
        start = 0
        for i in range(k):
            if start < N:
                res[i] = arr[start]
                tail = start + base_len - 1
                if remainder:
                    tail += 1
                    remainder -= 1
                arr[tail].next = None
                start = tail + 1

        return res
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
    public ListNode[] splitListToParts(ListNode head, int k) {
        List<ListNode> arr = new ArrayList<>();
        for (ListNode cur = head; cur != null; cur = cur.next) {
            arr.add(cur);
        }

        int N = arr.size();
        int base_len = N / k, remainder = N % k;

        ListNode[] res = new ListNode[k];
        int start = 0;
        for (int i = 0; i < k; i++) {
            if (start < N) {
                res[i] = arr.get(start);
                int tail = start + base_len - 1;
                if (remainder > 0) {
                    tail++;
                    remainder--;
                }
                arr.get(tail).next = null;
                start = tail + 1;
            }
        }

        return res;
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
    vector<ListNode*> splitListToParts(ListNode* head, int k) {
        vector<ListNode*> arr;
        for (ListNode* cur = head; cur != nullptr; cur = cur->next) {
            arr.push_back(cur);
        }

        int N = arr.size();
        int base_len = N / k, remainder = N % k;

        vector<ListNode*> res(k, nullptr);
        int start = 0;
        for (int i = 0; i < k; i++) {
            if (start < N) {
                res[i] = arr[start];
                int tail = start + base_len - 1;
                if (remainder > 0) {
                    tail++;
                    remainder--;
                }
                arr[tail]->next = nullptr;
                start = tail + 1;
            }
        }

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
     * @param {ListNode} head
     * @param {number} k
     * @return {ListNode[]}
     */
    splitListToParts(head, k) {
        let arr = [];
        for (let cur = head; cur !== null; cur = cur.next) {
            arr.push(cur);
        }

        let N = arr.length;
        let base_len = Math.floor(N / k),
            remainder = N % k;

        let res = new Array(k).fill(null);
        let start = 0;
        for (let i = 0; i < k; i++) {
            if (start < N) {
                res[i] = arr[start];
                let tail = start + base_len - 1;
                if (remainder > 0) {
                    tail++;
                    remainder--;
                }
                arr[tail].next = null;
                start = tail + 1;
            }
        }

        return res;
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
    def splitListToParts(self, head: Optional[ListNode], k: int) -> List[Optional[ListNode]]:
        length, curr = 0, head
        while curr:
            curr = curr.next
            length += 1

        base_len, remainder = length // k, length % k
        curr, res = head, []

        for i in range(k):
            res.append(curr)
            for j in range(base_len - 1 + (1 if remainder else 0)):
                if not curr:
                    break
                curr = curr.next
            remainder -= 1 if remainder else 0
            if curr:
                curr.next, curr = None, curr.next

        return res
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
    public ListNode[] splitListToParts(ListNode head, int k) {
        int length = 0;
        ListNode curr = head;
        while (curr != null) {
            curr = curr.next;
            length++;
        }

        int baseLen = length / k, remainder = length % k;
        ListNode[] res = new ListNode[k];
        curr = head;

        for (int i = 0; i < k; i++) {
            res[i] = curr;
            for (int j = 0; j < baseLen - 1 + (remainder > 0 ? 1 : 0); j++) {
                if (curr == null) break;
                curr = curr.next;
            }
            if (curr != null) {
                ListNode temp = curr.next;
                curr.next = null;
                curr = temp;
            }
            remainder--;
        }
        return res;
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
    vector<ListNode*> splitListToParts(ListNode* head, int k) {
        int length = 0;
        ListNode* curr = head;
        while (curr) {
            curr = curr->next;
            length++;
        }

        int baseLen = length / k, remainder = length % k;
        vector<ListNode*> res(k, nullptr);
        curr = head;

        for (int i = 0; i < k; i++) {
            res[i] = curr;
            for (int j = 0; j < baseLen - 1 + (remainder > 0 ? 1 : 0); j++) {
                if (!curr) break;
                curr = curr->next;
            }
            if (curr) {
                ListNode* temp = curr->next;
                curr->next = nullptr;
                curr = temp;
            }
            remainder--;
        }
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
     * @param {ListNode} head
     * @param {number} k
     * @return {ListNode[]}
     */
    splitListToParts(head, k) {
        let length = 0,
            curr = head;
        while (curr) {
            curr = curr.next;
            length++;
        }

        let baseLen = Math.floor(length / k),
            remainder = length % k;
        let res = new Array(k).fill(null);
        curr = head;

        for (let i = 0; i < k; i++) {
            res[i] = curr;
            for (let j = 0; j < baseLen - 1 + (remainder > 0 ? 1 : 0); j++) {
                if (!curr) break;
                curr = curr.next;
            }
            if (curr) {
                let temp = curr.next;
                curr.next = null;
                curr = temp;
            }
            remainder--;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.
