## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Linked List Traversal** - Navigating through nodes using next pointers
- **Pointer Manipulation** - Updating next pointers to skip or remove nodes from the list
- **In-Place Modification** - Modifying a data structure without using extra space for a new copy

---

## 1. Traverse Linked List and Delete In Place

### Intuition

The problem asks us to keep the first `m` nodes, then delete the next `n` nodes, and repeat this pattern throughout the linked list. Since we are modifying the list in place, we need to track two key positions: the last node we want to keep (the `m`-th node in each group) and the node that comes after the `n` deleted nodes. By linking these two positions, we effectively skip over the deleted nodes.

### Algorithm

1. Initialize two pointers: `currentNode` starting at the head, and `lastMNode` to track the last node we want to keep.
2. While `currentNode` is not `null`:
   - Traverse `m` nodes while updating `lastMNode` to point to each node. After this loop, `lastMNode` points to the `m`-th node.
   - Traverse `n` more nodes. These are the nodes to be deleted.
   - Link `lastMNode.next` to `currentNode`, effectively removing the `n` nodes from the list.
3. Return the head of the modified list.

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

## Common Pitfalls

### Forgetting to Handle the End of the List

When traversing through `m` nodes to keep or `n` nodes to delete, you must check for `null` at each step. If the list ends before completing a full cycle, failing to check will cause a null pointer exception.

```python
# Wrong: No null check during traversal
while m_count != 0:
    last_m_node = current_node
    current_node = current_node.next  # Crashes if current_node is None
    m_count -= 1

# Correct: Always check for null
while current_node is not None and m_count != 0:
    last_m_node = current_node
    current_node = current_node.next
    m_count -= 1
```

### Not Updating the `lastMNode` Pointer Before Deletion

The `lastMNode` pointer must be updated during the "keep m nodes" phase, not after. If you forget to track the last kept node, you cannot properly link it to the node after the deleted segment.

```python
# Wrong: lastMNode never gets updated
while current_node is not None and m_count != 0:
    current_node = current_node.next
    m_count -= 1

# Correct: Update lastMNode before moving forward
while current_node is not None and m_count != 0:
    last_m_node = current_node
    current_node = current_node.next
    m_count -= 1
```
