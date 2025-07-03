## 1. Hash Set

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Iteration - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Iteration - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
