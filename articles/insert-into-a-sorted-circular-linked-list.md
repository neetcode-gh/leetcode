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

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
        next = null;
    }

    public Node(int _val, Node _next) {
        val = _val;
        next = _next;
    }
}
*/
public class Solution {
    public Node Insert(Node head, int insertVal) {
        if (head == null) {
            Node newNode = new Node(insertVal, null);
            newNode.next = newNode;
            return newNode;
        }

        Node prev = head;
        Node curr = head.next;
        bool toInsert = false;

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

```go
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Next *Node
 * }
 */

func insert(head *Node, insertVal int) *Node {
    if head == nil {
        newNode := &Node{Val: insertVal}
        newNode.Next = newNode
        return newNode
    }

    prev := head
    curr := head.Next
    toInsert := false

    for {
        if prev.Val <= insertVal && insertVal <= curr.Val {
            // Case 1
            toInsert = true
        } else if prev.Val > curr.Val {
            // Case 2
            if insertVal >= prev.Val || insertVal <= curr.Val {
                toInsert = true
            }
        }

        if toInsert {
            prev.Next = &Node{Val: insertVal, Next: curr}
            return head
        }

        prev = curr
        curr = curr.Next
        if prev == head {
            break
        }
    }

    // Case 3
    prev.Next = &Node{Val: insertVal, Next: curr}
    return head
}
```

```kotlin
/**
 * Definition for a Node.
 * class Node(var `val`: Int) {
 *     var next: Node? = null
 * }
 */
class Solution {
    fun insert(head: Node?, insertVal: Int): Node? {
        if (head == null) {
            val newNode = Node(insertVal)
            newNode.next = newNode
            return newNode
        }

        var prev = head
        var curr = head.next
        var toInsert = false

        do {
            if (prev!!.`val` <= insertVal && insertVal <= curr!!.`val`) {
                // Case 1
                toInsert = true
            } else if (prev.`val` > curr!!.`val`) {
                // Case 2
                if (insertVal >= prev.`val` || insertVal <= curr.`val`) {
                    toInsert = true
                }
            }

            if (toInsert) {
                prev.next = Node(insertVal).apply { next = curr }
                return head
            }

            prev = curr
            curr = curr.next
        } while (prev != head)

        // Case 3
        prev!!.next = Node(insertVal).apply { next = curr }
        return head
    }
}
```

```swift
/**
 * Definition for a Node.
 * public class Node {
 *     public var val: Int
 *     public var next: Node?
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.next = nil
 *     }
 * }
 */
class Solution {
    func insert(_ head: Node?, _ insertVal: Int) -> Node? {
        if head == nil {
            let newNode = Node(insertVal)
            newNode.next = newNode
            return newNode
        }

        var prev = head
        var curr = head?.next
        var toInsert = false

        repeat {
            if prev!.val <= insertVal && insertVal <= curr!.val {
                // Case 1
                toInsert = true
            } else if prev!.val > curr!.val {
                // Case 2
                if insertVal >= prev!.val || insertVal <= curr!.val {
                    toInsert = true
                }
            }

            if toInsert {
                let newNode = Node(insertVal)
                newNode.next = curr
                prev!.next = newNode
                return head
            }

            prev = curr
            curr = curr?.next
        } while prev !== head

        // Case 3
        let newNode = Node(insertVal)
        newNode.next = curr
        prev!.next = newNode
        return head
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(1)$

>  Where $N$ is the size of the list.
