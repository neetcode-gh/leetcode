## 1. Hash Set

### Intuition

Since each node has a parent pointer, we can trace the path from `p` to the root and store all visited nodes in a set. Then we trace from `q` upward until we find a node that already exists in the set. This intersection point is the lowest common ancestor.

### Algorithm

1. Create a hash set to store ancestors.
2. Traverse from `p` to the root, adding each node to the set.
3. Traverse from `q` to the root, checking if each node exists in the set.
4. Return the first node found in the set (the LCA).

::tabs-start

```python
"""
# Definition for a Node.
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.parent = None
"""

class Solution:
    def lowestCommonAncestor(self, p: 'Node', q: 'Node') -> 'Node':
        seen = set()
        while p:
            seen.add(p)
            p = p.parent

        while q:
            if q in seen:
                return q
            q = q.parent
```

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node parent;
};
*/

public class Solution {
    public Node lowestCommonAncestor(Node p, Node q) {
        Set<Node> seen = new HashSet<>();
        while (p != null) {
            seen.add(p);
            p = p.parent;
        }
        while (q != null) {
            if (seen.contains(q)) return q;
            q = q.parent;
        }
        return null;
    }
}
```

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* parent;
};
*/

class Solution {
public:
    Node* lowestCommonAncestor(Node* p, Node* q) {
        unordered_set<Node*> seen;
        while (p) {
            seen.insert(p);
            p = p->parent;
        }
        while (q) {
            if (seen.count(q)) return q;
            q = q->parent;
        }
        return nullptr;
    }
};
```

```javascript
/**
 * // Definition for a _Node.
 * function _Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */
class Solution {
    /**
     * @param {_Node} p
     * @param {_Node} q
     * @return {_Node}
     */
    lowestCommonAncestor(p, q) {
        const seen = new Set();
        while (p) {
            seen.add(p);
            p = p.parent;
        }
        while (q) {
            if (seen.has(q)) return q;
            q = q.parent;
        }
        return null;
    }
}
```

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public Node left;
    public Node right;
    public Node parent;
}
*/

public class Solution {
    public Node LowestCommonAncestor(Node p, Node q) {
        var seen = new HashSet<Node>();
        while (p != null) {
            seen.Add(p);
            p = p.parent;
        }
        while (q != null) {
            if (seen.Contains(q)) return q;
            q = q.parent;
        }
        return null;
    }
}
```

```go
/**
 * Definition for Node.
 * type Node struct {
 *     Val int
 *     Left *Node
 *     Right *Node
 *     Parent *Node
 * }
 */

func lowestCommonAncestor(p *Node, q *Node) *Node {
    seen := make(map[*Node]bool)
    for p != nil {
        seen[p] = true
        p = p.Parent
    }
    for q != nil {
        if seen[q] {
            return q
        }
        q = q.Parent
    }
    return nil
}
```

```kotlin
/**
 * Definition for a Node.
 * class Node(var `val`: Int) {
 *     var left: Node? = null
 *     var right: Node? = null
 *     var parent: Node? = null
 * }
 */

class Solution {
    fun lowestCommonAncestor(p: Node?, q: Node?): Node? {
        val seen = HashSet<Node>()
        var pNode = p
        while (pNode != null) {
            seen.add(pNode)
            pNode = pNode.parent
        }
        var qNode = q
        while (qNode != null) {
            if (qNode in seen) return qNode
            qNode = qNode.parent
        }
        return null
    }
}
```

```swift
/**
 * Definition for a Node.
 * public class Node {
 *     public var val: Int
 *     public var left: Node?
 *     public var right: Node?
 *     public var parent: Node?
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.left = nil
 *         self.right = nil
 *         self.parent = nil
 *     }
 * }
 */

class Solution {
    func lowestCommonAncestor(_ p: Node?,_ q: Node?) -> Node? {
        var seen = Set<ObjectIdentifier>()
        var pNode = p
        while let node = pNode {
            seen.insert(ObjectIdentifier(node))
            pNode = node.parent
        }
        var qNode = q
        while let node = qNode {
            if seen.contains(ObjectIdentifier(node)) {
                return node
            }
            qNode = node.parent
        }
        return nil
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Iteration - I

### Intuition

If we know the depth of both nodes, we can align them first. We move the deeper node upward until both nodes are at the same depth. Then we move both nodes upward in lockstep until they meet. The meeting point is the LCA. This avoids using extra space for a hash set.

### Algorithm

1. Compute the height (distance to root) of both `p` and `q`.
2. If one node is deeper, move it upward until both are at the same level.
3. Move both pointers upward together until they point to the same node.
4. Return that node as the LCA.

::tabs-start

```python
"""
# Definition for a Node.
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.parent = None
"""

class Solution:
    def lowestCommonAncestor(self, p: 'Node', q: 'Node') -> 'Node':
        def height(node):
            h = 0
            while node:
                h += 1
                node = node.parent
            return h

        h1, h2 = height(p), height(q)
        if h2 < h1:
            p, q = q, p

        diff = abs(h1 - h2)
        while diff:
            q = q.parent
            diff -= 1

        while p != q:
            p = p.parent
            q = q.parent

        return p
```

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node parent;
};
*/

public class Solution {
    public Node lowestCommonAncestor(Node p, Node q) {
        int h1 = height(p), h2 = height(q);
        if (h2 < h1) {
            Node tmp = p; p = q; q = tmp;
            int th = h1; h1 = h2; h2 = th;
        }

        int diff = h2 - h1;
        while (diff-- > 0) {
            q = q.parent;
        }

        while (p != q) {
            p = p.parent;
            q = q.parent;
        }
        return p;
    }

    private int height(Node node) {
        int h = 0;
        while (node != null) {
            h++;
            node = node.parent;
        }
        return h;
    }
}
```

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* parent;
};
*/

class Solution {
public:
    Node* lowestCommonAncestor(Node* p, Node* q) {
        int h1 = height(p), h2 = height(q);
        if (h2 < h1) {
            swap(p, q);
            swap(h1, h2);
        }
        int diff = h2 - h1;
        while (diff-- > 0) {
            q = q->parent;
        }
        while (p != q) {
            p = p->parent;
            q = q->parent;
        }
        return p;
    }

private:
    int height(Node* node) {
        int h = 0;
        while (node) {
            h++;
            node = node->parent;
        }
        return h;
    }
};
```

```javascript
/**
 * // Definition for a _Node.
 * function _Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */
class Solution {
    /**
     * @param {_Node} p
     * @param {_Node} q
     * @return {_Node}
     */
    lowestCommonAncestor(p, q) {
        const height = (node) => {
            let h = 0;
            while (node) {
                h++;
                node = node.parent;
            }
            return h;
        };

        let h1 = height(p),
            h2 = height(q);
        if (h2 < h1) {
            [p, q] = [q, p];
            [h1, h2] = [h2, h1];
        }

        let diff = h2 - h1;
        while (diff-- > 0) {
            q = q.parent;
        }

        while (p !== q) {
            p = p.parent;
            q = q.parent;
        }
        return p;
    }
}
```

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public Node left;
    public Node right;
    public Node parent;
}
*/

public class Solution {
    public Node LowestCommonAncestor(Node p, Node q) {
        int h1 = Height(p), h2 = Height(q);
        if (h2 < h1) {
            var tmp = p; p = q; q = tmp;
            int th = h1; h1 = h2; h2 = th;
        }

        int diff = h2 - h1;
        while (diff-- > 0) {
            q = q.parent;
        }

        while (p != q) {
            p = p.parent;
            q = q.parent;
        }
        return p;
    }

    private int Height(Node node) {
        int h = 0;
        while (node != null) {
            h++;
            node = node.parent;
        }
        return h;
    }
}
```

```go
/**
 * Definition for Node.
 * type Node struct {
 *     Val int
 *     Left *Node
 *     Right *Node
 *     Parent *Node
 * }
 */

func lowestCommonAncestor(p *Node, q *Node) *Node {
    height := func(node *Node) int {
        h := 0
        for node != nil {
            h++
            node = node.Parent
        }
        return h
    }

    h1, h2 := height(p), height(q)
    if h2 < h1 {
        p, q = q, p
        h1, h2 = h2, h1
    }

    diff := h2 - h1
    for diff > 0 {
        q = q.Parent
        diff--
    }

    for p != q {
        p = p.Parent
        q = q.Parent
    }
    return p
}
```

```kotlin
/**
 * Definition for a Node.
 * class Node(var `val`: Int) {
 *     var left: Node? = null
 *     var right: Node? = null
 *     var parent: Node? = null
 * }
 */

class Solution {
    fun lowestCommonAncestor(p: Node?, q: Node?): Node? {
        fun height(node: Node?): Int {
            var h = 0
            var curr = node
            while (curr != null) {
                h++
                curr = curr.parent
            }
            return h
        }

        var pNode = p
        var qNode = q
        var h1 = height(pNode)
        var h2 = height(qNode)

        if (h2 < h1) {
            val tmp = pNode
            pNode = qNode
            qNode = tmp
            val th = h1
            h1 = h2
            h2 = th
        }

        var diff = h2 - h1
        while (diff-- > 0) {
            qNode = qNode?.parent
        }

        while (pNode != qNode) {
            pNode = pNode?.parent
            qNode = qNode?.parent
        }
        return pNode
    }
}
```

```swift
/**
 * Definition for a Node.
 * public class Node {
 *     public var val: Int
 *     public var left: Node?
 *     public var right: Node?
 *     public var parent: Node?
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.left = nil
 *         self.right = nil
 *         self.parent = nil
 *     }
 * }
 */

class Solution {
    func lowestCommonAncestor(_ p: Node?,_ q: Node?) -> Node? {
        func height(_ node: Node?) -> Int {
            var h = 0
            var curr = node
            while curr != nil {
                h += 1
                curr = curr?.parent
            }
            return h
        }

        var pNode = p
        var qNode = q
        var h1 = height(pNode)
        var h2 = height(qNode)

        if h2 < h1 {
            swap(&pNode, &qNode)
            swap(&h1, &h2)
        }

        var diff = h2 - h1
        while diff > 0 {
            qNode = qNode?.parent
            diff -= 1
        }

        while pNode !== qNode {
            pNode = pNode?.parent
            qNode = qNode?.parent
        }
        return pNode
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Iteration - II

### Intuition

This approach is similar to finding the intersection of two linked lists. We use two pointers starting at `p` and `q`. When a pointer reaches the root (`null`), we redirect it to the other starting node. After at most two passes, both pointers will have traveled the same total distance and will meet at the LCA.

### Algorithm

1. Initialize two pointers `ptr1 = p` and `ptr2 = q`.
2. While `ptr1 != ptr2`:
   - Move `ptr1` to its parent, or to `q` if it reaches `null`.
   - Move `ptr2` to its parent, or to `p` if it reaches `null`.
3. Return `ptr1` (or `ptr2`) as the LCA.

::tabs-start

```python
"""
# Definition for a Node.
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.parent = None
"""

class Solution:
    def lowestCommonAncestor(self, p: 'Node', q: 'Node') -> 'Node':
        ptr1, ptr2 = p, q
        while ptr1 != ptr2:
            ptr1 = ptr1.parent if ptr1 else q
            ptr2 = ptr2.parent if ptr2 else p
        return ptr1
```

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node parent;
};
*/

public class Solution {
    public Node lowestCommonAncestor(Node p, Node q) {
        Node ptr1 = p, ptr2 = q;
        while (ptr1 != ptr2) {
            ptr1 = (ptr1 != null) ? ptr1.parent : q;
            ptr2 = (ptr2 != null) ? ptr2.parent : p;
        }
        return ptr1;
    }
}
```

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* parent;
};
*/

class Solution {
public:
    Node* lowestCommonAncestor(Node* p, Node* q) {
        Node* ptr1 = p;
        Node* ptr2 = q;
        while (ptr1 != ptr2) {
            ptr1 = ptr1 ? ptr1->parent : q;
            ptr2 = ptr2 ? ptr2->parent : p;
        }
        return ptr1;
    }
};
```

```javascript
/**
 * // Definition for a _Node.
 * function _Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */
class Solution {
    /**
     * @param {_Node} p
     * @param {_Node} q
     * @return {_Node}
     */
    lowestCommonAncestor(p, q) {
        let ptr1 = p,
            ptr2 = q;
        while (ptr1 !== ptr2) {
            ptr1 = ptr1 ? ptr1.parent : q;
            ptr2 = ptr2 ? ptr2.parent : p;
        }
        return ptr1;
    }
}
```

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public Node left;
    public Node right;
    public Node parent;
}
*/

public class Solution {
    public Node LowestCommonAncestor(Node p, Node q) {
        Node ptr1 = p, ptr2 = q;
        while (ptr1 != ptr2) {
            ptr1 = ptr1 != null ? ptr1.parent : q;
            ptr2 = ptr2 != null ? ptr2.parent : p;
        }
        return ptr1;
    }
}
```

```go
/**
 * Definition for Node.
 * type Node struct {
 *     Val int
 *     Left *Node
 *     Right *Node
 *     Parent *Node
 * }
 */

func lowestCommonAncestor(p *Node, q *Node) *Node {
    ptr1, ptr2 := p, q
    for ptr1 != ptr2 {
        if ptr1 != nil {
            ptr1 = ptr1.Parent
        } else {
            ptr1 = q
        }
        if ptr2 != nil {
            ptr2 = ptr2.Parent
        } else {
            ptr2 = p
        }
    }
    return ptr1
}
```

```kotlin
/**
 * Definition for a Node.
 * class Node(var `val`: Int) {
 *     var left: Node? = null
 *     var right: Node? = null
 *     var parent: Node? = null
 * }
 */

class Solution {
    fun lowestCommonAncestor(p: Node?, q: Node?): Node? {
        var ptr1 = p
        var ptr2 = q
        while (ptr1 != ptr2) {
            ptr1 = if (ptr1 != null) ptr1.parent else q
            ptr2 = if (ptr2 != null) ptr2.parent else p
        }
        return ptr1
    }
}
```

```swift
/**
 * Definition for a Node.
 * public class Node {
 *     public var val: Int
 *     public var left: Node?
 *     public var right: Node?
 *     public var parent: Node?
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.left = nil
 *         self.right = nil
 *         self.parent = nil
 *     }
 * }
 */

class Solution {
    func lowestCommonAncestor(_ p: Node?,_ q: Node?) -> Node? {
        var ptr1 = p
        var ptr2 = q
        while ptr1 !== ptr2 {
            ptr1 = ptr1 != nil ? ptr1?.parent : q
            ptr2 = ptr2 != nil ? ptr2?.parent : p
        }
        return ptr1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Forgetting to Handle Equal Depths

When using the height-based iteration approach, a common mistake is assuming `p` and `q` are always at different depths. If both nodes are at the same level, no adjustment is needed before the lockstep traversal. Failing to handle this case correctly can lead to infinite loops or null pointer exceptions.

### Using Value Comparison Instead of Reference Comparison

Since nodes can have duplicate values, comparing `p.val == q.val` is incorrect. You must compare node references (`p == q` or `p is q`) to determine when the two pointers have met at the same node. Using value comparison will produce wrong results when different nodes have the same value.

### Not Recognizing the Linked List Intersection Pattern

This problem is essentially finding the intersection of two linked lists (the paths from `p` and `q` to the root). The elegant two-pointer solution works because both pointers travel the same total distance before meeting. Missing this insight leads to more complex solutions using extra space for hash sets when O(1) space is achievable.
