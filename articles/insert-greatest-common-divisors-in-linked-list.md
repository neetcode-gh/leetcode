## 1. Simulation

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def insertGreatestCommonDivisors(self, head: Optional[ListNode]) -> Optional[ListNode]:
        def gcd(a, b):
            while b > 0:
                a, b = b, a % b
            return a

        cur = head
        while cur.next:
            n1, n2 = cur.val, cur.next.val
            cur.next = ListNode(gcd(n1, n2), cur.next)
            cur = cur.next.next

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
    public ListNode insertGreatestCommonDivisors(ListNode head) {
        if (head == null) return null;

        ListNode cur = head;

        while (cur.next != null) {
            int n1 = cur.val, n2 = cur.next.val;
            int gcdValue = gcd(n1, n2);
            ListNode newNode = new ListNode(gcdValue, cur.next);
            cur.next = newNode;
            cur = newNode.next;
        }

        return head;
    }

    private int gcd(int a, int b) {
        while (b > 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
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
    ListNode* insertGreatestCommonDivisors(ListNode* head) {
        if (!head) return nullptr;

        ListNode* cur = head;

        while (cur->next) {
            int n1 = cur->val, n2 = cur->next->val;
            int gcdValue = gcd(n1, n2);
            ListNode* newNode = new ListNode(gcdValue, cur->next);
            cur->next = newNode;
            cur = newNode->next;
        }

        return head;
    }

private:
    int gcd(int a, int b) {
        while (b > 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
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
    insertGreatestCommonDivisors(head) {
        if (!head) return null;
        const gcd = (a, b) => {
            while (b > 0) {
                [a, b] = [b, a % b];
            }
            return a;
        };

        let cur = head;

        while (cur.next) {
            const n1 = cur.val,
                n2 = cur.next.val;
            const gcdValue = gcd(n1, n2);
            const newNode = new ListNode(gcdValue, cur.next);
            cur.next = newNode;
            cur = newNode.next;
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
    public ListNode InsertGreatestCommonDivisors(ListNode head) {
        ListNode cur = head;

        while (cur.next != null) {
            int gcdVal = GCD(cur.val, cur.next.val);
            ListNode newNode = new ListNode(gcdVal, cur.next);
            cur.next = newNode;
            cur = newNode.next;
        }

        return head;
    }

    private int GCD(int a, int b) {
        while (b > 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * \log (min(a, b)))$
- Space complexity:
    - $O(n)$ space for the gcd ListNodes.
    - $O(1)$ extra space.

> Where $n$ is the length of the given list, and $a$ and $b$ are two numbers passed to the $gcd()$ function.
