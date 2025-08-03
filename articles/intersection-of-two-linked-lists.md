## 1. Brute Force

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        while headA:
            cur = headB
            while cur:
                if headA == cur:
                    return headA
                cur = cur.next
            headA = headA.next
        return None
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        while (headA != null) {
            ListNode cur = headB;
            while (cur != null) {
                if (headA == cur) {
                    return headA;
                }
                cur = cur.next;
            }
            headA = headA.next;
        }
        return null;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
        while (headA) {
            ListNode* cur = headB;
            while (cur) {
                if (headA == cur) {
                    return headA;
                }
                cur = cur->next;
            }
            headA = headA->next;
        }
        return nullptr;
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
     * @param {ListNode} headA
     * @param {ListNode} headB
     * @return {ListNode}
     */
    getIntersectionNode(headA, headB) {
        while (headA) {
            let cur = headB;
            while (cur) {
                if (headA === cur) {
                    return headA;
                }
                cur = cur.next;
            }
            headA = headA.next;
        }
        return null;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode GetIntersectionNode(ListNode headA, ListNode headB) {
        while (headA != null) {
            ListNode cur = headB;
            while (cur != null) {
                if (headA == cur) {
                    return headA;
                }
                cur = cur.next;
            }
            headA = headA.next;
        }
        return null;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the length of the first list and $n$ is the length of the second list.

---

## 2. Hash Set

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        nodeSet = set()
        cur = headA
        while cur:
            nodeSet.add(cur)
            cur = cur.next

        cur = headB
        while cur:
            if cur in nodeSet:
                return cur
            cur = cur.next

        return None
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        HashSet<ListNode> nodeSet = new HashSet<>();

        ListNode cur = headA;
        while (cur != null) {
            nodeSet.add(cur);
            cur = cur.next;
        }

        cur = headB;
        while (cur != null) {
            if (nodeSet.contains(cur)) {
                return cur;
            }
            cur = cur.next;
        }

        return null;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
        unordered_set<ListNode*> nodeSet;

        ListNode* cur = headA;
        while (cur) {
            nodeSet.insert(cur);
            cur = cur->next;
        }

        cur = headB;
        while (cur) {
            if (nodeSet.find(cur) != nodeSet.end()) {
                return cur;
            }
            cur = cur->next;
        }

        return nullptr;
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
     * @param {ListNode} headA
     * @param {ListNode} headB
     * @return {ListNode}
     */
    getIntersectionNode(headA, headB) {
        const nodeSet = new Set();

        let cur = headA;
        while (cur) {
            nodeSet.add(cur);
            cur = cur.next;
        }

        cur = headB;
        while (cur) {
            if (nodeSet.has(cur)) {
                return cur;
            }
            cur = cur.next;
        }

        return null;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode GetIntersectionNode(ListNode headA, ListNode headB) {
        var nodeSet = new HashSet<ListNode>();
        var cur = headA;
        while (cur != null) {
            nodeSet.Add(cur);
            cur = cur.next;
        }

        cur = headB;
        while (cur != null) {
            if (nodeSet.Contains(cur)) {
                return cur;
            }
            cur = cur.next;
        }

        return null;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(m)$

> Where $m$ is the length of the first list and $n$ is the length of the second list.

---

## 3. Two Pointers - I

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        def getLength(head):
            length, cur = 0, head
            while cur:
                length += 1
                cur = cur.next
            return length

        m = getLength(headA)
        n = getLength(headB)
        l1, l2 = headA, headB

        if m < n:
            m, n = n, m
            l1, l2 = headB, headA

        while m - n:
            m -= 1
            l1 = l1.next

        while l1 != l2:
            l1 = l1.next
            l2 = l2.next

        return l1
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    private int getLength(ListNode head) {
        int length = 0;
        while (head != null) {
            length++;
            head = head.next;
        }
        return length;
    }

    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        int m = getLength(headA);
        int n = getLength(headB);
        ListNode l1 = headA, l2 = headB;

        if (m < n) {
            int temp = m; m = n; n = temp;
            ListNode tempNode = l1; l1 = l2; l2 = tempNode;
        }

        while (m > n) {
            l1 = l1.next;
            m--;
        }

        while (l1 != null && l1 != l2) {
            l1 = l1.next;
            l2 = l2.next;
        }

        return l1;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
    int getLength(ListNode* head) {
        int length = 0;
        while (head) {
            length++;
            head = head->next;
        }
        return length;
    }

public:
    ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
        int m = getLength(headA), n = getLength(headB);
        ListNode* l1 = headA, *l2 = headB;

        if (m < n) {
            swap(m, n);
            swap(l1, l2);
        }

        while (m-- > n) {
            l1 = l1->next;
        }

        while (l1 && l1 != l2) {
            l1 = l1->next;
            l2 = l2->next;
        }

        return l1;
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
     * @param {ListNode} headA
     * @param {ListNode} headB
     * @return {ListNode}
     */
    getIntersectionNode(headA, headB) {
        const getLength = (head) => {
            let length = 0,
                cur = head;
            while (cur) {
                length++;
                cur = cur.next;
            }
            return length;
        };

        let m = getLength(headA);
        let n = getLength(headB);
        let l1 = headA,
            l2 = headB;

        if (m < n) {
            [m, n] = [n, m];
            [l1, l2] = [l2, l1];
        }

        while (m-- > n) {
            l1 = l1.next;
        }

        while (l1 && l1 !== l2) {
            l1 = l1.next;
            l2 = l2.next;
        }

        return l1;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode GetIntersectionNode(ListNode headA, ListNode headB) {
        int GetLength(ListNode head) {
            int length = 0;
            while (head != null) {
                length++;
                head = head.next;
            }
            return length;
        }

        int m = GetLength(headA);
        int n = GetLength(headB);
        ListNode l1 = headA, l2 = headB;

        if (m < n) {
            int temp = m; m = n; n = temp;
            l1 = headB;
            l2 = headA;
        }

        for (int i = 0; i < m - n; i++) {
            l1 = l1.next;
        }

        while (l1 != l2) {
            l1 = l1.next;
            l2 = l2.next;
        }

        return l1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the length of the first list and $n$ is the length of the second list.

---

## 4. Two Pointers - II

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        l1, l2 = headA, headB
        while l1 != l2:
            l1 = l1.next if l1 else headB
            l2 = l2.next if l2 else headA
        return l1
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode l1 = headA, l2 = headB;
        while (l1 != l2) {
            l1 = (l1 != null) ? l1.next : headB;
            l2 = (l2 != null) ? l2.next : headA;
        }
        return l1;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
        ListNode* l1 = headA;
        ListNode* l2 = headB;
        while (l1 != l2) {
            l1 = l1 ? l1->next : headB;
            l2 = l2 ? l2->next : headA;
        }
        return l1;
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
     * @param {ListNode} headA
     * @param {ListNode} headB
     * @return {ListNode}
     */
    getIntersectionNode(headA, headB) {
        let l1 = headA,
            l2 = headB;
        while (l1 !== l2) {
            l1 = l1 ? l1.next : headB;
            l2 = l2 ? l2.next : headA;
        }
        return l1;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode GetIntersectionNode(ListNode headA, ListNode headB) {
        ListNode l1 = headA, l2 = headB;

        while (l1 != l2) {
            l1 = (l1 != null) ? l1.next : headB;
            l2 = (l2 != null) ? l2.next : headA;
        }

        return l1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the length of the first list and $n$ is the length of the second list.
