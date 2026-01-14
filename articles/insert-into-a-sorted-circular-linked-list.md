## 1. Two-Pointers Iteration

### Intuition

In a sorted circular linked list, we need to find the right spot to insert while maintaining sorted order. There are three cases to consider: the value fits between two existing nodes, the value is a new maximum or minimum (insert at the tail/head boundary), or all nodes have the same value.
We use two pointers to traverse the list, looking for the gap where our value belongs. The tail-to-head boundary is special because it's where the values wrap around from largest to smallest.
If we traverse the entire list without finding a spot, it means all values are equal, so we can insert anywhere.

### Algorithm

1. If the list is empty, create a new node pointing to itself and return it.
2. Initialize `prev` to `head` and `curr` to `head.next`. Use a flag `toInsert` to track when we find the insertion point.
3. Traverse the list:
   - **Case 1**: If `prev.val <= insertVal <= curr.val`, we found a normal insertion point between two nodes.
   - **Case 2**: If `prev.val > curr.val`, we're at the tail-to-head boundary. Insert here if `insertVal >= prev.val` (new maximum) or `insertVal <= curr.val` (new minimum).
   - If either case is true, insert the new node between `prev` and `curr` and return `head`.
4. Move the pointers forward. If we return to the starting position without inserting, insert the node anywhere (Case 3: all values are equal).

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

---

## Common Pitfalls

### Missing the Tail-to-Head Boundary Case

Only checking for normal insertion between two nodes (`prev.val <= insertVal <= curr.val`) without handling the wraparound point where the largest value connects to the smallest. At this boundary, the new value might be a new maximum (greater than tail) or new minimum (smaller than head), both of which should be inserted at this location.

### Infinite Loop When All Values Are Equal

When all nodes in the circular list have the same value, neither the normal insertion condition nor the boundary condition will ever be true. Without a fallback case that inserts the node after completing a full traversal, the algorithm loops forever. The solution must detect when it returns to the starting node without inserting.

### Forgetting to Handle Empty List

When the head is null, failing to create a self-referential node (where `node.next = node`) results in either a null pointer exception or an incorrectly formed list. The empty list case must create a new node that points to itself to maintain the circular property.
