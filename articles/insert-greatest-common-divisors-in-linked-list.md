## 1. Simulation

### Intuition

The problem asks us to insert a new node between every pair of adjacent nodes, where the new node's value is the GCD of its neighbors. We traverse the list and for each pair of consecutive nodes, compute their GCD and create a new node with that value.
The Euclidean algorithm efficiently computes the GCD: repeatedly replace the larger number with the remainder of dividing the two numbers until one becomes zero. The other number is the GCD.
Since we're inserting nodes as we traverse, we need to be careful to advance the pointer past the newly inserted node to avoid processing it again.

### Algorithm

1. Start with `cur` pointing to the head of the list.
2. While `cur.next` exists:
   - Get the values of `cur` and `cur.next`.
   - Compute their GCD using the Euclidean algorithm.
   - Create a new node with the GCD value.
   - Insert it between `cur` and `cur.next` by adjusting pointers.
   - Move `cur` to `cur.next.next` to skip over the newly inserted node.
3. Return the head of the modified list.

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

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func insertGreatestCommonDivisors(head *ListNode) *ListNode {
    gcd := func(a, b int) int {
        for b > 0 {
            a, b = b, a%b
        }
        return a
    }

    cur := head
    for cur.Next != nil {
        n1, n2 := cur.Val, cur.Next.Val
        newNode := &ListNode{Val: gcd(n1, n2), Next: cur.Next}
        cur.Next = newNode
        cur = newNode.Next
    }

    return head
}
```

```kotlin
/**
 * Example:
 * var li = ListNode(5)
 * var v = li.`val`
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */
class Solution {
    fun insertGreatestCommonDivisors(head: ListNode?): ListNode? {
        fun gcd(a: Int, b: Int): Int {
            var x = a
            var y = b
            while (y > 0) {
                val temp = y
                y = x % y
                x = temp
            }
            return x
        }

        var cur = head
        while (cur?.next != null) {
            val n1 = cur.`val`
            val n2 = cur.next!!.`val`
            val newNode = ListNode(gcd(n1, n2))
            newNode.next = cur.next
            cur.next = newNode
            cur = newNode.next
        }

        return head
    }
}
```

```swift
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init() { self.val = 0; self.next = nil; }
 *     public init(_ val: Int) { self.val = val; self.next = nil; }
 *     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 * }
 */
class Solution {
    func insertGreatestCommonDivisors(_ head: ListNode?) -> ListNode? {
        func gcd(_ a: Int, _ b: Int) -> Int {
            var a = a, b = b
            while b > 0 {
                let temp = b
                b = a % b
                a = temp
            }
            return a
        }

        var cur = head
        while cur?.next != nil {
            let n1 = cur!.val
            let n2 = cur!.next!.val
            let newNode = ListNode(gcd(n1, n2), cur!.next)
            cur!.next = newNode
            cur = newNode.next
        }

        return head
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
