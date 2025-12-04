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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(1)$

>  Where $N$ is the length of the linked list pointed by `head`.
