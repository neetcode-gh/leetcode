## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Trees** - Understanding tree structure with left and right children
- **Tree Traversal (DFS/BFS)** - Visiting nodes recursively or iteratively using stacks/queues
- **Recursion** - Comparing subtrees and handling base cases with null nodes

---

## 1. Depth First Search

### Intuition

Two trees are flip equivalent if we can make them identical by swapping the left and right children of some nodes. At each node, the subtrees either match directly (left with left, right with right) or match when flipped (left with right, right with left). We recursively check both possibilities.

### Algorithm

1. Base case: If either node is `null`, return `true` only if both are `null`.
2. If the values of the two nodes differ, return `false`.
3. Recursively check two scenarios:
   - No flip: left subtrees match AND right subtrees match.
   - Flip: left of tree1 matches right of tree2 AND right of tree1 matches left of tree2.
4. Return `true` if either scenario succeeds.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def flipEquiv(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        if not root1 or not root2:
            return not root1 and not root2
        if root1.val != root2.val:
            return False

        return (
                self.flipEquiv(root1.left, root2.left) and
                self.flipEquiv(root1.right, root2.right) or
                self.flipEquiv(root1.left, root2.right) and
                self.flipEquiv(root1.right, root2.left)
            )
```

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution {
    public boolean flipEquiv(TreeNode root1, TreeNode root2) {
        if (root1 == null || root2 == null)
            return root1 == null && root2 == null;
        if (root1.val != root2.val)
            return false;

        return (flipEquiv(root1.left, root2.left) &&
                flipEquiv(root1.right, root2.right) ||
                flipEquiv(root1.left, root2.right) &&
                flipEquiv(root1.right, root2.left));
    }
}
```

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool flipEquiv(TreeNode* root1, TreeNode* root2) {
        if (!root1 || !root2)
            return !root1 && !root2;
        if (root1->val != root2->val)
            return false;

        return (flipEquiv(root1->left, root2->left) &&
                flipEquiv(root1->right, root2->right) ||
                flipEquiv(root1->left, root2->right) &&
                flipEquiv(root1->right, root2->left));
    }
};
```

```javascript
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root1
     * @param {TreeNode} root2
     * @return {boolean}
     */
    flipEquiv(root1, root2) {
        if (!root1 || !root2) return !root1 && !root2;
        if (root1.val !== root2.val) return false;

        return (
            (this.flipEquiv(root1.left, root2.left) &&
                this.flipEquiv(root1.right, root2.right)) ||
            (this.flipEquiv(root1.left, root2.right) &&
                this.flipEquiv(root1.right, root2.left))
        );
    }
}
```

```csharp
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left;
 *     public TreeNode right;
 *     public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution {
    public bool FlipEquiv(TreeNode root1, TreeNode root2) {
        if (root1 == null || root2 == null)
            return root1 == null && root2 == null;
        if (root1.val != root2.val)
            return false;

        return (FlipEquiv(root1.left, root2.left) &&
                FlipEquiv(root1.right, root2.right)) ||
               (FlipEquiv(root1.left, root2.right) &&
                FlipEquiv(root1.right, root2.left));
    }
}
```

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func flipEquiv(root1 *TreeNode, root2 *TreeNode) bool {
    if root1 == nil || root2 == nil {
        return root1 == nil && root2 == nil
    }
    if root1.Val != root2.Val {
        return false
    }

    return (flipEquiv(root1.Left, root2.Left) &&
            flipEquiv(root1.Right, root2.Right)) ||
           (flipEquiv(root1.Left, root2.Right) &&
            flipEquiv(root1.Right, root2.Left))
}
```

```kotlin
/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun flipEquiv(root1: TreeNode?, root2: TreeNode?): Boolean {
        if (root1 == null || root2 == null)
            return root1 == null && root2 == null
        if (root1.`val` != root2.`val`)
            return false

        return (flipEquiv(root1.left, root2.left) &&
                flipEquiv(root1.right, root2.right)) ||
               (flipEquiv(root1.left, root2.right) &&
                flipEquiv(root1.right, root2.left))
    }
}
```

```swift
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init() { self.val = 0; self.left = nil; self.right = nil; }
 *     public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
 *     public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
 *         self.val = val
 *         self.left = left
 *         self.right = right
 *     }
 * }
 */
class Solution {
    func flipEquiv(_ root1: TreeNode?, _ root2: TreeNode?) -> Bool {
        if root1 == nil || root2 == nil {
            return root1 == nil && root2 == nil
        }
        if root1!.val != root2!.val {
            return false
        }

        return (flipEquiv(root1?.left, root2?.left) &&
                flipEquiv(root1?.right, root2?.right)) ||
               (flipEquiv(root1?.left, root2?.right) &&
                flipEquiv(root1?.right, root2?.left))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Breadth First Search

### Intuition

We can solve this iteratively using a queue to process node pairs level by level. For each pair of nodes, we check if their values match. Then we determine whether to compare children directly or in flipped order by checking which pairing makes the left children's values match.

### Algorithm

1. Initialize a queue with the pair `(root1, root2)`.
2. While the queue is not empty:
   - Dequeue a pair of nodes.
   - If either is `null`, check that both are `null`. If not, return `false`.
   - If their values differ, return `false`.
   - Determine child pairing: if both left children exist and have equal values, or both are `null`, pair children directly. Otherwise, pair them in flipped order.
   - Enqueue the appropriate child pairs.
3. Return `true` if all pairs are processed successfully.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def flipEquiv(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        q = deque([(root1, root2)])

        while q:
            node1, node2 = q.popleft()
            if not node1 or not node2:
                if node1 != node2:
                    return False
                continue

            if node1.val != node2.val:
                return False

            if ((node1.right and node2.right and
                 node1.right.val == node2.right.val) or
                (not node1.right and not node2.right)
            ):
                q.append((node1.left, node2.left))
                q.append((node1.right, node2.right))
            else:
                q.append((node1.left, node2.right))
                q.append((node1.right, node2.left))

        return True
```

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution {
    public boolean flipEquiv(TreeNode root1, TreeNode root2) {
        Queue<TreeNode[]> q = new LinkedList<>();
        q.offer(new TreeNode[]{root1, root2});

        while (!q.isEmpty()) {
            TreeNode[] pair = q.poll();
            TreeNode node1 = pair[0], node2 = pair[1];

            if (node1 == null || node2 == null) {
                if (node1 != node2) return false;
                continue;
            }

            if (node1.val != node2.val) return false;

            if ((node1.left != null && node2.left != null &&
                 node1.left.val == node2.left.val) ||
                (node1.left == null && node2.left == null)) {
                q.offer(new TreeNode[]{node1.left, node2.left});
                q.offer(new TreeNode[]{node1.right, node2.right});
            } else {
                q.offer(new TreeNode[]{node1.left, node2.right});
                q.offer(new TreeNode[]{node1.right, node2.left});
            }
        }

        return true;
    }
}
```

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool flipEquiv(TreeNode* root1, TreeNode* root2) {
        queue<pair<TreeNode*, TreeNode*>> q;
        q.push({root1, root2});

        while (!q.empty()) {
            auto [node1, node2] = q.front();
            q.pop();

            if (!node1 || !node2) {
                if (node1 != node2) return false;
                continue;
            }

            if (node1->val != node2->val) return false;

            if ((node1->left && node2->left && node1->left->val == node2->left->val) ||
                (!node1->left && !node2->left)) {
                q.push({node1->left, node2->left});
                q.push({node1->right, node2->right});
            } else {
                q.push({node1->left, node2->right});
                q.push({node1->right, node2->left});
            }
        }

        return true;
    }
};
```

```javascript
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root1
     * @param {TreeNode} root2
     * @return {boolean}
     */
    flipEquiv(root1, root2) {
        let q = new Queue([[root1, root2]]);

        while (!q.isEmpty()) {
            let [node1, node2] = q.pop();

            if (!node1 || !node2) {
                if (node1 !== node2) return false;
                continue;
            }

            if (node1.val !== node2.val) return false;

            if (
                (node1.left &&
                    node2.left &&
                    node1.left.val === node2.left.val) ||
                (!node1.left && !node2.left)
            ) {
                q.push([node1.left, node2.left]);
                q.push([node1.right, node2.right]);
            } else {
                q.push([node1.left, node2.right]);
                q.push([node1.right, node2.left]);
            }
        }

        return true;
    }
}
```

```csharp
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left;
 *     public TreeNode right;
 *     public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution {
    public bool FlipEquiv(TreeNode root1, TreeNode root2) {
        Queue<(TreeNode, TreeNode)> q = new Queue<(TreeNode, TreeNode)>();
        q.Enqueue((root1, root2));

        while (q.Count > 0) {
            var (node1, node2) = q.Dequeue();

            if (node1 == null || node2 == null) {
                if (node1 != node2) return false;
                continue;
            }

            if (node1.val != node2.val) return false;

            if ((node1.left != null && node2.left != null &&
                 node1.left.val == node2.left.val) ||
                (node1.left == null && node2.left == null)) {
                q.Enqueue((node1.left, node2.left));
                q.Enqueue((node1.right, node2.right));
            } else {
                q.Enqueue((node1.left, node2.right));
                q.Enqueue((node1.right, node2.left));
            }
        }

        return true;
    }
}
```

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func flipEquiv(root1 *TreeNode, root2 *TreeNode) bool {
    type pair struct {
        n1, n2 *TreeNode
    }
    q := []pair{{root1, root2}}

    for len(q) > 0 {
        p := q[0]
        q = q[1:]
        node1, node2 := p.n1, p.n2

        if node1 == nil || node2 == nil {
            if node1 != node2 {
                return false
            }
            continue
        }

        if node1.Val != node2.Val {
            return false
        }

        if (node1.Left != nil && node2.Left != nil &&
            node1.Left.Val == node2.Left.Val) ||
            (node1.Left == nil && node2.Left == nil) {
            q = append(q, pair{node1.Left, node2.Left})
            q = append(q, pair{node1.Right, node2.Right})
        } else {
            q = append(q, pair{node1.Left, node2.Right})
            q = append(q, pair{node1.Right, node2.Left})
        }
    }

    return true
}
```

```kotlin
/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun flipEquiv(root1: TreeNode?, root2: TreeNode?): Boolean {
        val q: Queue<Pair<TreeNode?, TreeNode?>> = LinkedList()
        q.offer(Pair(root1, root2))

        while (q.isNotEmpty()) {
            val (node1, node2) = q.poll()

            if (node1 == null || node2 == null) {
                if (node1 != node2) return false
                continue
            }

            if (node1.`val` != node2.`val`) return false

            if ((node1.left != null && node2.left != null &&
                 node1.left!!.`val` == node2.left!!.`val`) ||
                (node1.left == null && node2.left == null)) {
                q.offer(Pair(node1.left, node2.left))
                q.offer(Pair(node1.right, node2.right))
            } else {
                q.offer(Pair(node1.left, node2.right))
                q.offer(Pair(node1.right, node2.left))
            }
        }

        return true
    }
}
```

```swift
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init() { self.val = 0; self.left = nil; self.right = nil; }
 *     public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
 *     public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
 *         self.val = val
 *         self.left = left
 *         self.right = right
 *     }
 * }
 */
class Solution {
    func flipEquiv(_ root1: TreeNode?, _ root2: TreeNode?) -> Bool {
        var q: [(TreeNode?, TreeNode?)] = [(root1, root2)]

        while !q.isEmpty {
            let (node1, node2) = q.removeFirst()

            if node1 == nil || node2 == nil {
                if (node1 == nil) != (node2 == nil) {
                    return false
                }
                continue
            }

            if node1!.val != node2!.val {
                return false
            }

            if (node1?.left != nil && node2?.left != nil &&
                node1!.left!.val == node2!.left!.val) ||
               (node1?.left == nil && node2?.left == nil) {
                q.append((node1?.left, node2?.left))
                q.append((node1?.right, node2?.right))
            } else {
                q.append((node1?.left, node2?.right))
                q.append((node1?.right, node2?.left))
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Iterative DFS

### Intuition

This is the iterative version of the recursive DFS approach, using an explicit stack instead of the call stack. We process node pairs from the stack, checking values and pushing child pairs in the appropriate order (direct or flipped).

### Algorithm

1. Initialize a stack with the pair `(root1, root2)`.
2. While the stack is not empty:
   - Pop a pair of nodes.
   - If either is `null`, verify both are `null`. If not, return `false`.
   - If their values differ, return `false`.
   - Determine child pairing: if left children match (both `null` or same value), push direct pairs. Otherwise, push flipped pairs.
3. Return `true` if all pairs are processed successfully.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def flipEquiv(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        stack = [(root1, root2)]

        while stack:
            node1, node2 = stack.pop()

            if not node1 or not node2:
                if node1 != node2:
                    return False
                continue

            if node1.val != node2.val:
                return False

            if ((node1.left and node2.left and
                 node1.left.val == node2.left.val) or
                (not node1.left and not node2.left)
            ):
                stack.append((node1.left, node2.left))
                stack.append((node1.right, node2.right))
            else:
                stack.append((node1.left, node2.right))
                stack.append((node1.right, node2.left))

        return True
```

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution {
    public boolean flipEquiv(TreeNode root1, TreeNode root2) {
        Stack<TreeNode[]> stack = new Stack<>();
        stack.push(new TreeNode[]{root1, root2});

        while (!stack.isEmpty()) {
            TreeNode[] pair = stack.pop();
            TreeNode node1 = pair[0], node2 = pair[1];

            if (node1 == null || node2 == null) {
                if (node1 != node2) return false;
                continue;
            }

            if (node1.val != node2.val) return false;

            if ((node1.left != null && node2.left != null &&
                 node1.left.val == node2.left.val) ||
                (node1.left == null && node2.left == null)) {
                stack.push(new TreeNode[]{node1.left, node2.left});
                stack.push(new TreeNode[]{node1.right, node2.right});
            } else {
                stack.push(new TreeNode[]{node1.left, node2.right});
                stack.push(new TreeNode[]{node1.right, node2.left});
            }
        }

        return true;
    }
}
```

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool flipEquiv(TreeNode* root1, TreeNode* root2) {
        stack<pair<TreeNode*, TreeNode*>> stk;
        stk.push({root1, root2});

        while (!stk.empty()) {
            auto [node1, node2] = stk.top();stk.pop();

            if (!node1 || !node2) {
                if (node1 != node2) return false;
                continue;
            }

            if (node1->val != node2->val) return false;

            if ((node1->left && node2->left && node1->left->val == node2->left->val) ||
                (!node1->left && !node2->left)) {
                stk.push({node1->left, node2->left});
                stk.push({node1->right, node2->right});
            } else {
                stk.push({node1->left, node2->right});
                stk.push({node1->right, node2->left});
            }
        }

        return true;
    }
};
```

```javascript
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root1
     * @param {TreeNode} root2
     * @return {boolean}
     */
    flipEquiv(root1, root2) {
        let stack = [[root1, root2]];

        while (stack.length > 0) {
            let [node1, node2] = stack.pop();

            if (!node1 || !node2) {
                if (node1 !== node2) return false;
                continue;
            }

            if (node1.val !== node2.val) return false;

            if (
                (node1.left &&
                    node2.left &&
                    node1.left.val === node2.left.val) ||
                (!node1.left && !node2.left)
            ) {
                stack.push([node1.left, node2.left]);
                stack.push([node1.right, node2.right]);
            } else {
                stack.push([node1.left, node2.right]);
                stack.push([node1.right, node2.left]);
            }
        }

        return true;
    }
}
```

```csharp
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left;
 *     public TreeNode right;
 *     public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution {
    public bool FlipEquiv(TreeNode root1, TreeNode root2) {
        Stack<(TreeNode, TreeNode)> stack = new Stack<(TreeNode, TreeNode)>();
        stack.Push((root1, root2));

        while (stack.Count > 0) {
            var (node1, node2) = stack.Pop();

            if (node1 == null || node2 == null) {
                if (node1 != node2) return false;
                continue;
            }

            if (node1.val != node2.val) return false;

            if ((node1.left != null && node2.left != null &&
                 node1.left.val == node2.left.val) ||
                (node1.left == null && node2.left == null)) {
                stack.Push((node1.left, node2.left));
                stack.Push((node1.right, node2.right));
            } else {
                stack.Push((node1.left, node2.right));
                stack.Push((node1.right, node2.left));
            }
        }

        return true;
    }
}
```

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func flipEquiv(root1 *TreeNode, root2 *TreeNode) bool {
    type pair struct {
        n1, n2 *TreeNode
    }
    stack := []pair{{root1, root2}}

    for len(stack) > 0 {
        p := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        node1, node2 := p.n1, p.n2

        if node1 == nil || node2 == nil {
            if node1 != node2 {
                return false
            }
            continue
        }

        if node1.Val != node2.Val {
            return false
        }

        if (node1.Left != nil && node2.Left != nil &&
            node1.Left.Val == node2.Left.Val) ||
            (node1.Left == nil && node2.Left == nil) {
            stack = append(stack, pair{node1.Left, node2.Left})
            stack = append(stack, pair{node1.Right, node2.Right})
        } else {
            stack = append(stack, pair{node1.Left, node2.Right})
            stack = append(stack, pair{node1.Right, node2.Left})
        }
    }

    return true
}
```

```kotlin
/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun flipEquiv(root1: TreeNode?, root2: TreeNode?): Boolean {
        val stack = ArrayDeque<Pair<TreeNode?, TreeNode?>>()
        stack.addLast(Pair(root1, root2))

        while (stack.isNotEmpty()) {
            val (node1, node2) = stack.removeLast()

            if (node1 == null || node2 == null) {
                if (node1 != node2) return false
                continue
            }

            if (node1.`val` != node2.`val`) return false

            if ((node1.left != null && node2.left != null &&
                 node1.left!!.`val` == node2.left!!.`val`) ||
                (node1.left == null && node2.left == null)) {
                stack.addLast(Pair(node1.left, node2.left))
                stack.addLast(Pair(node1.right, node2.right))
            } else {
                stack.addLast(Pair(node1.left, node2.right))
                stack.addLast(Pair(node1.right, node2.left))
            }
        }

        return true
    }
}
```

```swift
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init() { self.val = 0; self.left = nil; self.right = nil; }
 *     public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
 *     public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
 *         self.val = val
 *         self.left = left
 *         self.right = right
 *     }
 * }
 */
class Solution {
    func flipEquiv(_ root1: TreeNode?, _ root2: TreeNode?) -> Bool {
        var stack: [(TreeNode?, TreeNode?)] = [(root1, root2)]

        while !stack.isEmpty {
            let (node1, node2) = stack.removeLast()

            if node1 == nil || node2 == nil {
                if (node1 == nil) != (node2 == nil) {
                    return false
                }
                continue
            }

            if node1!.val != node2!.val {
                return false
            }

            if (node1?.left != nil && node2?.left != nil &&
                node1!.left!.val == node2!.left!.val) ||
               (node1?.left == nil && node2?.left == nil) {
                stack.append((node1?.left, node2?.left))
                stack.append((node1?.right, node2?.right))
            } else {
                stack.append((node1?.left, node2?.right))
                stack.append((node1?.right, node2?.left))
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Forgetting to Check Both Flip Orderings

A common mistake is only checking if the trees match directly without considering the flipped case. The problem allows flipping at any node, so you must check both scenarios: (1) left matches left AND right matches right, OR (2) left matches right AND right matches left. Missing either case will produce incorrect results.

### Incorrect Null Handling in Base Cases

When comparing nodes, both null checks must be handled carefully. If only one node is null (but not both), the trees cannot be equivalent. Returning `true` when only one is null, or forgetting to handle the case where both are null, leads to incorrect behavior.

### Not Checking Node Values Before Recursing

Before exploring children, you must verify that the current nodes have the same value. Skipping this check and directly comparing children can cause false positives when nodes at the same position have different values but happen to have structurally similar subtrees.