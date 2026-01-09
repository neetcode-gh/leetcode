## 1. Traverse Linked List and Delete In Place

::tabs-start

```python
class Solution:
    def deleteNodes(self, head: Optional[ListNode], m: int, n: int) -> Optional[ListNode]:
        current_node = head
        last_m_node = head
        
        while current_node is not None:
            # initialize m_count to m and n_count to n
            m_count, n_count = m, n
            
            # traverse m nodes
            while current_node is not None and m_count != 0:
                last_m_node = current_node
                current_node = current_node.next
                m_count -= 1
            
            # traverse n nodes
            while current_node is not None and n_count != 0:
                current_node = current_node.next
                n_count -= 1
            
            # delete n nodes
            last_m_node.next = current_node
        
        return head
```

```java
class Solution {
    public ListNode deleteNodes(ListNode head, int m, int n) {
        ListNode currentNode = head;
        ListNode lastMNode = head;

        while (currentNode != null) {
            // initialize mCount to m and nCount to n
            int mCount = m, nCount = n;

            // traverse m nodes
            while (currentNode != null && mCount != 0) {
                lastMNode = currentNode;
                currentNode = currentNode.next;
                mCount--;
            }

            // traverse n nodes
            while (currentNode != null && nCount != 0) {
                currentNode = currentNode.next;
                nCount--;
            }

            // delete n nodes
            lastMNode.next = currentNode;
        }

        return head;
    }
}
```

```cpp
class Solution {
public:
    ListNode* deleteNodes(ListNode* head, int m, int n) {
        ListNode* currentNode = head;
        ListNode* lastMNode = head;

        while (currentNode != nullptr) {
            // initialize mCount to m and nCount to n
            int mCount = m, nCount = n;

            // traverse m nodes
            while (currentNode != nullptr && mCount != 0) {
                lastMNode = currentNode;
                currentNode = currentNode->next;
                mCount--;
            }

            // traverse n nodes
            while (currentNode != nullptr && nCount != 0) {
                currentNode = currentNode->next;
                nCount--;
            }

            // delete n nodes
            lastMNode->next = currentNode;
        }

        return head;    
    }
};
```

```javascript
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} m
     * @param {number} n
     * @return {ListNode}
     */
    deleteNodes(head, m, n) {
        let currentNode = head;
        let lastMNode = head;

        while (currentNode !== null) {
            // initialize mCount to m and nCount to n
            let mCount = m, nCount = n;

            // traverse m nodes
            while (currentNode !== null && mCount !== 0) {
                lastMNode = currentNode;
                currentNode = currentNode.next;
                mCount--;
            }

            // traverse n nodes
            while (currentNode !== null && nCount !== 0) {
                currentNode = currentNode.next;
                nCount--;
            }

            // delete n nodes
            lastMNode.next = currentNode;
        }

        return head;
    }
}
```

```csharp
public class Solution {
    public ListNode DeleteNodes(ListNode head, int m, int n) {
        ListNode currentNode = head;
        ListNode lastMNode = head;

        while (currentNode != null) {
            int mCount = m, nCount = n;

            while (currentNode != null && mCount != 0) {
                lastMNode = currentNode;
                currentNode = currentNode.next;
                mCount--;
            }

            while (currentNode != null && nCount != 0) {
                currentNode = currentNode.next;
                nCount--;
            }

            lastMNode.next = currentNode;
        }

        return head;
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
func deleteNodes(head *ListNode, m int, n int) *ListNode {
    currentNode := head
    var lastMNode *ListNode = head

    for currentNode != nil {
        mCount, nCount := m, n

        for currentNode != nil && mCount != 0 {
            lastMNode = currentNode
            currentNode = currentNode.Next
            mCount--
        }

        for currentNode != nil && nCount != 0 {
            currentNode = currentNode.Next
            nCount--
        }

        lastMNode.Next = currentNode
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
    fun deleteNodes(head: ListNode?, m: Int, n: Int): ListNode? {
        var currentNode = head
        var lastMNode = head

        while (currentNode != null) {
            var mCount = m
            var nCount = n

            while (currentNode != null && mCount != 0) {
                lastMNode = currentNode
                currentNode = currentNode.next
                mCount--
            }

            while (currentNode != null && nCount != 0) {
                currentNode = currentNode.next
                nCount--
            }

            lastMNode?.next = currentNode
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
    func deleteNodes(_ head: ListNode?, _ m: Int, _ n: Int) -> ListNode? {
        var currentNode = head
        var lastMNode = head

        while currentNode != nil {
            var mCount = m
            var nCount = n

            while currentNode != nil && mCount != 0 {
                lastMNode = currentNode
                currentNode = currentNode?.next
                mCount -= 1
            }

            while currentNode != nil && nCount != 0 {
                currentNode = currentNode?.next
                nCount -= 1
            }

            lastMNode?.next = currentNode
        }

        return head
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(1)$

>  Where $N$ is the length of the linked list pointed by `head`.
