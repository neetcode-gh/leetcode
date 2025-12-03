## 1. Two-Pointers Iteration

::tabs-start

```python
class Solution:
    def insert(self, head: 'Node', insertVal: int) -> 'Node':

        if head == None:
            newNode = Node(insertVal, None)
            newNode.next = newNode
            return newNode
 
        prev, curr = head, head.next
        toInsert = False

        while True:
            
            if prev.val <= insertVal <= curr.val:
                # Case #1.
                toInsert = True
            elif prev.val > curr.val:
                # Case #2. where we locate the tail element
                # 'prev' points to the tail, i.e. the largest element!
                if insertVal >= prev.val or insertVal <= curr.val:
                    toInsert = True

            if toInsert:
                prev.next = Node(insertVal, curr)
                # mission accomplished
                return head

            prev, curr = curr, curr.next
            # loop condition
            if prev == head:
                break
        # Case #3.
        # did not insert the node in the loop
        prev.next = Node(insertVal, curr)
        return head
```

```java
class Solution {
    public Node insert(Node head, int insertVal) {
        if (head == null) {
            Node newNode = new Node(insertVal, null);
            newNode.next = newNode;
            return newNode;
        }

        Node prev = head;
        Node curr = head.next;
        boolean toInsert = false;

        do {
            if (prev.val <= insertVal && insertVal <= curr.val) {
                // Case 1
                toInsert = true;
            } else if (prev.val > curr.val) {
                // Case 2
                if (insertVal >= prev.val || insertVal <= curr.val)
                    toInsert = true;
            }

            if (toInsert) {
                prev.next = new Node(insertVal, curr);
                return head;
            }

            prev = curr;
            curr = curr.next;
        } while (prev != head);

        // Case 3
        prev.next = new Node(insertVal, curr);
        return head;
    }
}
```

```cpp
class Solution {
public:
    Node* insert(Node* head, int insertVal) {
        if (head == nullptr) {
            Node* newNode = new Node(insertVal, nullptr);
            newNode->next = newNode;
            return newNode;
        }
        
        Node* prev = head;
        Node* curr = head->next;
        bool toInsert = false;
        
        do {
            if (prev->val <= insertVal && insertVal <= curr->val) {
                // Case 1
                toInsert = true;
            } else if (prev->val > curr->val) {
                // Case 2
                if (insertVal >= prev->val || insertVal <= curr->val)
                    toInsert = true;
            }
            
            if (toInsert) {
                prev->next = new Node(insertVal, curr);
                return head;
            }
            
            prev = curr;
            curr = curr->next;
        } while (prev != head);
        
        // Case 3
        prev->next = new Node(insertVal, curr);
        return head;
    }
};
```

```javascript
class Solution {
    /**
     * @param {_Node} head
     * @param {number} insertVal
     * @return {_Node}
     */
    insert(head, insertVal) {
        if (head === null) {
            let newNode = new _Node(insertVal, null);
            newNode.next = newNode;
            return newNode;
        }
        
        let prev = head;
        let curr = head.next;
        let toInsert = false;
        
        do {
            if (prev.val <= insertVal && insertVal <= curr.val) {
                // Case 1
                toInsert = true;
            } else if (prev.val > curr.val) {
                // Case 2
                if (insertVal >= prev.val || insertVal <= curr.val)
                    toInsert = true;
            }
            
            if (toInsert) {
                prev.next = new _Node(insertVal, curr);
                return head;
            }
            
            prev = curr;
            curr = curr.next;
        } while (prev !== head);
        
        // Case 3
        prev.next = new _Node(insertVal, curr);
        return head;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(1)$

>  Where $N$ is the size of the list.
