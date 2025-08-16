## 1. Convert To Array

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        arr = []
        cur = head
        while cur:
            arr.append(cur.val)
            cur = cur.next

        l, r = 0, len(arr) - 1
        while l < r:
            if arr[l] != arr[r]:
                return False
            l, r = l + 1, r - 1

        return True
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
    public boolean isPalindrome(ListNode head) {
        List<Integer> arr = new ArrayList<>();
        ListNode cur = head;
        while (cur != null) {
            arr.add(cur.val);
            cur = cur.next;
        }

        int l = 0, r = arr.size() - 1;
        while (l < r) {
            if (!arr.get(l).equals(arr.get(r))) {
                return false;
            }
            l++;
            r--;
        }

        return true;
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
    bool isPalindrome(ListNode* head) {
        std::vector<int> arr;
        ListNode* cur = head;
        while (cur) {
            arr.push_back(cur->val);
            cur = cur->next;
        }

        int l = 0, r = arr.size() - 1;
        while (l < r) {
            if (arr[l] != arr[r]) {
                return false;
            }
            l++;
            r--;
        }

        return true;
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
     * @return {boolean}
     */
    isPalindrome(head) {
        const arr = [];
        let cur = head;

        while (cur) {
            arr.push(cur.val);
            cur = cur.next;
        }

        let l = 0,
            r = arr.length - 1;
        while (l < r) {
            if (arr[l] !== arr[r]) {
                return false;
            }
            l++;
            r--;
        }

        return true;
    }
}
```

```csharp
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
    public bool IsPalindrome(ListNode head) {
        List<int> arr = new List<int>();
        ListNode cur = head;
        while (cur != null) {
            arr.Add(cur.val);
            cur = cur.next;
        }

        int l = 0, r = arr.Count - 1;
        while (l < r) {
            if (arr[l] != arr[r]) {
                return false;
            }
            l++;
            r--;
        }

        return true;
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
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        self.cur = head

        def rec(node):
            if node is not None:
                if not rec(node.next):
                    return False
                if self.cur.val != node.val:
                    return False
                self.cur = self.cur.next
            return True

        return rec(head)
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
    private ListNode cur;

    public boolean isPalindrome(ListNode head) {
        cur = head;
        return rec(head);
    }

    private boolean rec(ListNode node) {
        if (node != null) {
            if (!rec(node.next)) {
                return false;
            }
            if (cur.val != node.val) {
                return false;
            }
            cur = cur.next;
        }
        return true;
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
    ListNode* cur;

    bool rec(ListNode* node) {
        if (node != nullptr) {
            if (!rec(node->next)) {
                return false;
            }
            if (cur->val != node->val) {
                return false;
            }
            cur = cur->next;
        }
        return true;
    }

public:
    bool isPalindrome(ListNode* head) {
        cur = head;
        return rec(head);
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
     * @return {boolean}
     */
    isPalindrome(head) {
        let cur = head;

        const rec = (node) => {
            if (node !== null) {
                if (!rec(node.next)) {
                    return false;
                }
                if (cur.val !== node.val) {
                    return false;
                }
                cur = cur.next;
            }
            return true;
        };

        return rec(head);
    }
}
```

```csharp
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
    private ListNode cur;

    public bool IsPalindrome(ListNode head) {
        cur = head;
        return Rec(head);
    }

    private bool Rec(ListNode node) {
        if (node != null) {
            if (!Rec(node.next)) {
                return false;
            }
            if (cur.val != node.val) {
                return false;
            }
            cur = cur.next;
        }
        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Stack

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        stack = []
        cur = head

        while cur:
            stack.append(cur.val)
            cur = cur.next

        cur = head
        while cur and cur.val == stack.pop():
            cur = cur.next

        return not cur
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
    public boolean isPalindrome(ListNode head) {
        Stack<Integer> stack = new Stack<>();
        ListNode cur = head;

        while (cur != null) {
            stack.push(cur.val);
            cur = cur.next;
        }

        cur = head;
        while (cur != null && cur.val == stack.pop()) {
            cur = cur.next;
        }

        return cur == null;
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
    bool isPalindrome(ListNode* head) {
        stack<int> stack;
        ListNode* cur = head;

        while (cur != nullptr) {
            stack.push(cur->val);
            cur = cur->next;
        }

        cur = head;
        while (cur != nullptr && cur->val == stack.top()) {
            stack.pop();
            cur = cur->next;
        }

        return cur == nullptr;
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
     * @return {boolean}
     */
    isPalindrome(head) {
        const stack = [];
        let cur = head;

        while (cur) {
            stack.push(cur.val);
            cur = cur.next;
        }

        cur = head;
        while (cur && cur.val === stack.pop()) {
            cur = cur.next;
        }

        return cur === null;
    }
}
```

```csharp
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
    public bool IsPalindrome(ListNode head) {
        Stack<int> stack = new Stack<int>();
        ListNode cur = head;

        while (cur != null) {
            stack.Push(cur.val);
            cur = cur.next;
        }

        cur = head;
        while (cur != null && cur.val == stack.Pop()) {
            cur = cur.next;
        }

        return cur == null;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Fast & Slow Pointers

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
        fast = head
        slow = head

        # find middle (slow)
        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next

        # reverse second half
        prev = None
        while slow:
            tmp = slow.next
            slow.next = prev
            prev = slow
            slow = tmp

        # check palindrome
        left, right = head, prev
        while right:
            if left.val != right.val:
                return False
            left = left.next
            right = right.next

        return True
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
    public boolean isPalindrome(ListNode head) {
        ListNode fast = head, slow = head;

        // find middle (slow)
        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
        }

        // reverse second half
        ListNode prev = null;
        while (slow != null) {
            ListNode tmp = slow.next;
            slow.next = prev;
            prev = slow;
            slow = tmp;
        }

        // check palindrome
        ListNode left = head, right = prev;
        while (right != null) {
            if (left.val != right.val) {
                return false;
            }
            left = left.next;
            right = right.next;
        }

        return true;
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
    bool isPalindrome(ListNode* head) {
        ListNode *fast = head, *slow = head;

        // find middle (slow)
        while (fast && fast->next) {
            fast = fast->next->next;
            slow = slow->next;
        }

        // reverse second half
        ListNode *prev = nullptr;
        while (slow) {
            ListNode *tmp = slow->next;
            slow->next = prev;
            prev = slow;
            slow = tmp;
        }

        // check palindrome
        ListNode *left = head, *right = prev;
        while (right) {
            if (left->val != right->val) {
                return false;
            }
            left = left->next;
            right = right->next;
        }

        return true;
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
     * @return {boolean}
     */
    isPalindrome(head) {
        let fast = head,
            slow = head;

        // find middle (slow)
        while (fast && fast.next) {
            fast = fast.next.next;
            slow = slow.next;
        }

        // reverse second half
        let prev = null;
        while (slow) {
            let tmp = slow.next;
            slow.next = prev;
            prev = slow;
            slow = tmp;
        }

        // check palindrome
        let left = head,
            right = prev;
        while (right) {
            if (left.val !== right.val) {
                return false;
            }
            left = left.next;
            right = right.next;
        }

        return true;
    }
}
```

```csharp
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
    public bool IsPalindrome(ListNode head) {
        ListNode fast = head, slow = head;

        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
        }

        ListNode prev = null;
        while (slow != null) {
            ListNode tmp = slow.next;
            slow.next = prev;
            prev = slow;
            slow = tmp;
        }

        ListNode left = head, right = prev;
        while (right != null) {
            if (left.val != right.val) {
                return false;
            }
            left = left.next;
            right = right.next;
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
