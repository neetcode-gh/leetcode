## 1. Convert To Array

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapNodes(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        arr = []
        cur = head
        while cur:
            arr.append(cur.val)
            cur = cur.next

        n = len(arr)
        arr[k - 1], arr[n - k] = arr[n - k], arr[k - 1]

        cur, i = head, 0
        while cur:
            cur.val = arr[i]
            cur = cur.next
            i += 1

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
    public ListNode swapNodes(ListNode head, int k) {
        List<Integer> arr = new ArrayList<>();
        ListNode cur = head;

        while (cur != null) {
            arr.add(cur.val);
            cur = cur.next;
        }

        int n = arr.size();
        int temp = arr.get(k - 1);
        arr.set(k - 1, arr.get(n - k));
        arr.set(n - k, temp);

        cur = head;
        int i = 0;
        while (cur != null) {
            cur.val = arr.get(i);
            cur = cur.next;
            i++;
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
    ListNode* swapNodes(ListNode* head, int k) {
        vector<int> arr;
        ListNode* cur = head;

        while (cur) {
            arr.push_back(cur->val);
            cur = cur->next;
        }

        int n = arr.size();
        swap(arr[k - 1], arr[n - k]);

        cur = head;
        int i = 0;
        while (cur) {
            cur->val = arr[i];
            cur = cur->next;
            i++;
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
    swapNodes(head, k) {
        let arr = [];
        let cur = head;

        while (cur) {
            arr.push(cur.val);
            cur = cur.next;
        }

        let n = arr.length;
        [arr[k - 1], arr[n - k]] = [arr[n - k], arr[k - 1]];

        cur = head;
        let i = 0;
        while (cur) {
            cur.val = arr[i];
            cur = cur.next;
            i++;
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

## 2. Recursion

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapNodes(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        left, right, startIdx = None, None, 0

        def dfs(node):
            nonlocal left, right, startIdx
            if not node:
                return 0

            startIdx += 1
            if startIdx == k:
                left = node

            endIdx = dfs(node.next) + 1
            if endIdx == k:
                right = node

            return endIdx

        dfs(head)
        if left and right:
            left.val, right.val = right.val, left.val

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
    public ListNode swapNodes(ListNode head, int k) {
        ListNode[] left = new ListNode[1];
        ListNode[] right = new ListNode[1];
        int[] startIdx = {0};

        dfs(head, k, startIdx, left, right);

        if (left[0] != null && right[0] != null) {
            int temp = left[0].val;
            left[0].val = right[0].val;
            right[0].val = temp;
        }

        return head;
    }

    private int dfs(ListNode node, int k, int[] startIdx, ListNode[] left, ListNode[] right) {
        if (node == null) {
            return 0;
        }

        startIdx[0]++;
        if (startIdx[0] == k) {
            left[0] = node;
        }

        int endIdx = dfs(node.next, k, startIdx, left, right) + 1;
        if (endIdx == k) {
            right[0] = node;
        }

        return endIdx;
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
    ListNode* swapNodes(ListNode* head, int k) {
        ListNode* left = nullptr;
        ListNode* right = nullptr;
        int startIdx = 0;

        dfs(head, k, startIdx, left, right);

        if (left && right) {
            swap(left->val, right->val);
        }

        return head;
    }

private:
    int dfs(ListNode* node, int k, int& startIdx, ListNode*& left, ListNode*& right) {
        if (!node) {
            return 0;
        }

        startIdx++;
        if (startIdx == k) {
            left = node;
        }

        int endIdx = dfs(node->next, k, startIdx, left, right) + 1;
        if (endIdx == k) {
            right = node;
        }

        return endIdx;
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
    swapNodes(head, k) {
        let left = null,
            right = null,
            startIdx = 0;

        const dfs = (node) => {
            if (!node) return 0;

            startIdx++;
            if (startIdx === k) left = node;

            let endIdx = dfs(node.next) + 1;
            if (endIdx === k) right = node;

            return endIdx;
        };

        dfs(head);
        if (left && right) {
            [left.val, right.val] = [right.val, left.val];
        }

        return head;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Iteration (Two Pass)

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapNodes(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        n = 0
        cur = head
        while cur:
            n += 1
            cur = cur.next

        left, right = None, None
        cur = head
        for i in range(1, n + 1):
            if i == k:
                left = cur
            if i == (n - k + 1):
                right = cur
            cur = cur.next

        left.val, right.val = right.val, left.val
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
    public ListNode swapNodes(ListNode head, int k) {
        int n = 0;
        ListNode cur = head;
        while (cur != null) {
            n++;
            cur = cur.next;
        }

        ListNode left = null, right = null;
        cur = head;
        for (int i = 1; i <= n; i++) {
            if (i == k) {
                left = cur;
            }
            if (i == (n - k + 1)) {
                right = cur;
            }
            cur = cur.next;
        }

        int temp = left.val;
        left.val = right.val;
        right.val = temp;

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
    ListNode* swapNodes(ListNode* head, int k) {
        int n = 0;
        ListNode* cur = head;
        while (cur) {
            n++;
            cur = cur->next;
        }

        ListNode* left = nullptr;
        ListNode* right = nullptr;
        cur = head;
        for (int i = 1; i <= n; i++) {
            if (i == k) {
                left = cur;
            }
            if (i == (n - k + 1)) {
                right = cur;
            }
            cur = cur->next;
        }

        swap(left->val, right->val);
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
    swapNodes(head, k) {
        let n = 0;
        let cur = head;
        while (cur) {
            n++;
            cur = cur.next;
        }

        let left = null,
            right = null;
        cur = head;
        for (let i = 1; i <= n; i++) {
            if (i === k) {
                left = cur;
            }
            if (i === n - k + 1) {
                right = cur;
            }
            cur = cur.next;
        }

        [left.val, right.val] = [right.val, left.val];
        return head;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Iteration (One Pass) - I

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapNodes(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        cur = head
        for _ in range(k - 1):
            cur = cur.next

        left = cur
        right = head

        while cur.next:
            cur = cur.next
            right = right.next

        left.val, right.val = right.val, left.val
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
    public ListNode swapNodes(ListNode head, int k) {
        ListNode cur = head;
        for (int i = 0; i < k - 1; i++) {
            cur = cur.next;
        }

        ListNode left = cur;
        ListNode right = head;

        while (cur.next != null) {
            cur = cur.next;
            right = right.next;
        }

        int temp = left.val;
        left.val = right.val;
        right.val = temp;

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
    ListNode* swapNodes(ListNode* head, int k) {
        ListNode* cur = head;
        for (int i = 0; i < k - 1; i++) {
            cur = cur->next;
        }

        ListNode* left = cur;
        ListNode* right = head;

        while (cur->next) {
            cur = cur->next;
            right = right->next;
        }

        swap(left->val, right->val);
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
    swapNodes(head, k) {
        let cur = head;
        for (let i = 0; i < k - 1; i++) {
            cur = cur.next;
        }

        let left = cur;
        let right = head;

        while (cur.next) {
            cur = cur.next;
            right = right.next;
        }

        [left.val, right.val] = [right.val, left.val];
        return head;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 5. Iteration (One Pass) - II

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapNodes(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        left, right = None, None
        cur = head

        while cur:
            if right:
                right = right.next
            if k == 1:
                left = cur
                right = head
            k -= 1
            cur = cur.next

        left.val, right.val = right.val, left.val
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
    public ListNode swapNodes(ListNode head, int k) {
        ListNode left = null, right = null, cur = head;

        while (cur != null) {
            if (right != null) {
                right = right.next;
            }
            if (k == 1) {
                left = cur;
                right = head;
            }
            k--;
            cur = cur.next;
        }

        int temp = left.val;
        left.val = right.val;
        right.val = temp;

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
    ListNode* swapNodes(ListNode* head, int k) {
        ListNode* left = nullptr;
        ListNode* right = nullptr;
        ListNode* cur = head;

        while (cur) {
            if (right) {
                right = right->next;
            }
            if (k == 1) {
                left = cur;
                right = head;
            }
            k--;
            cur = cur->next;
        }

        swap(left->val, right->val);
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
    swapNodes(head, k) {
        let left = null,
            right = null,
            cur = head;

        while (cur) {
            if (right) {
                right = right.next;
            }
            if (k === 1) {
                left = cur;
                right = head;
            }
            k--;
            cur = cur.next;
        }

        [left.val, right.val] = [right.val, left.val];
        return head;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
