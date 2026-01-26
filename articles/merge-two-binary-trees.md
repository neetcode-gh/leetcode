## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Trees** - Understanding tree node structure with left and right children
- **Depth First Search (DFS)** - Recursively or iteratively traversing tree structures
- **Recursion** - Solving problems by breaking them into smaller subproblems with base cases
- **Stack** - Using explicit stacks to convert recursive solutions to iterative ones

---

## 1. Depth First Search (Creating New Tree)

### Intuition

To merge two trees, we traverse both trees simultaneously. At each position, if both trees have a node, we create a new node with the sum of their values. If only one tree has a node at a position, we use that node's value. We recursively build the left and right subtrees the same way. This approach creates an entirely new tree without modifying the inputs.

### Algorithm

1. If both `root1` and `root2` are `null`, return `null`.
2. Get the values from each tree (use `0` if the node is `null`).
3. Create a new node with the sum of the two values.
4. Recursively merge the left children and assign to `root.left`.
5. Recursively merge the right children and assign to `root.right`.
6. Return the new root node.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def mergeTrees(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root1 and not root2:
            return None

        v1 = root1.val if root1 else 0
        v2 = root2.val if root2 else 0
        root = TreeNode(v1 + v2)

        root.left = self.mergeTrees(root1.left if root1 else None, root2.left if root2 else None)
        root.right = self.mergeTrees(root1.right if root1 else None, root2.right if root2 else None)

        return root
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
    public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
        if (root1 == null && root2 == null) {
            return null;
        }

        int v1 = (root1 != null) ? root1.val : 0;
        int v2 = (root2 != null) ? root2.val : 0;
        TreeNode root = new TreeNode(v1 + v2);

        root.left = mergeTrees(
            (root1 != null) ? root1.left : null, (root2 != null) ? root2.left : null
        );
        root.right = mergeTrees(
            (root1 != null) ? root1.right : null, (root2 != null) ? root2.right : null
        );

        return root;
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
    TreeNode* mergeTrees(TreeNode* root1, TreeNode* root2) {
        if (!root1 && !root2) {
            return nullptr;
        }

        int v1 = root1 ? root1->val : 0;
        int v2 = root2 ? root2->val : 0;
        TreeNode* root = new TreeNode(v1 + v2);

        root->left = mergeTrees(root1 ? root1->left : nullptr, root2 ? root2->left : nullptr);
        root->right = mergeTrees(root1 ? root1->right : nullptr, root2 ? root2->right : nullptr);

        return root;
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
     * @return {TreeNode}
     */
    mergeTrees(root1, root2) {
        if (!root1 && !root2) {
            return null;
        }

        const v1 = root1 ? root1.val : 0;
        const v2 = root2 ? root2.val : 0;
        const root = new TreeNode(v1 + v2);

        root.left = this.mergeTrees(
            root1 ? root1.left : null,
            root2 ? root2.left : null,
        );
        root.right = this.mergeTrees(
            root1 ? root1.right : null,
            root2 ? root2.right : null,
        );

        return root;
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
    public TreeNode MergeTrees(TreeNode root1, TreeNode root2) {
        if (root1 == null && root2 == null) {
            return null;
        }

        int v1 = root1 != null ? root1.val : 0;
        int v2 = root2 != null ? root2.val : 0;
        TreeNode root = new TreeNode(v1 + v2);

        root.left = MergeTrees(root1 != null ? root1.left : null, root2 != null ? root2.left : null);
        root.right = MergeTrees(root1 != null ? root1.right : null, root2 != null ? root2.right : null);

        return root;
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
func mergeTrees(root1 *TreeNode, root2 *TreeNode) *TreeNode {
    if root1 == nil && root2 == nil {
        return nil
    }

    v1, v2 := 0, 0
    var left1, right1, left2, right2 *TreeNode
    if root1 != nil {
        v1 = root1.Val
        left1 = root1.Left
        right1 = root1.Right
    }
    if root2 != nil {
        v2 = root2.Val
        left2 = root2.Left
        right2 = root2.Right
    }

    root := &TreeNode{Val: v1 + v2}
    root.Left = mergeTrees(left1, left2)
    root.Right = mergeTrees(right1, right2)

    return root
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
    fun mergeTrees(root1: TreeNode?, root2: TreeNode?): TreeNode? {
        if (root1 == null && root2 == null) {
            return null
        }

        val v1 = root1?.`val` ?: 0
        val v2 = root2?.`val` ?: 0
        val root = TreeNode(v1 + v2)

        root.left = mergeTrees(root1?.left, root2?.left)
        root.right = mergeTrees(root1?.right, root2?.right)

        return root
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
    func mergeTrees(_ root1: TreeNode?, _ root2: TreeNode?) -> TreeNode? {
        if root1 == nil && root2 == nil {
            return nil
        }

        let v1 = root1?.val ?? 0
        let v2 = root2?.val ?? 0
        let root = TreeNode(v1 + v2)

        root.left = mergeTrees(root1?.left, root2?.left)
        root.right = mergeTrees(root1?.right, root2?.right)

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity:
    - $O(m + n)$ space for recursion stack.
    - $O(m + n)$ space for the output.

> Where $m$ and $n$ are the number of nodes in the given trees.

---

## 2. Depth First Search (In Place)

### Intuition

Instead of creating new nodes, we can modify the first tree in place. If one tree is missing at a position, we simply return the other tree's subtree. If both exist, we add the second tree's value to the first tree's node and recursively merge the children. This saves memory by reusing existing nodes.

### Algorithm

1. If `root1` is `null`, return `root2`.
2. If `root2` is `null`, return `root1`.
3. Add `root2.val` to `root1.val`.
4. Recursively merge the left subtrees and assign to `root1.left`.
5. Recursively merge the right subtrees and assign to `root1.right`.
6. Return `root1`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def mergeTrees(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root1:
            return root2
        if not root2:
            return root1

        root1.val += root2.val
        root1.left = self.mergeTrees(root1.left, root2.left)
        root1.right = self.mergeTrees(root1.right, root2.right)
        return root1
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
    public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
        if (root1 == null) return root2;
        if (root2 == null) return root1;

        root1.val += root2.val;
        root1.left = mergeTrees(root1.left, root2.left);
        root1.right = mergeTrees(root1.right, root2.right);
        return root1;
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
    TreeNode* mergeTrees(TreeNode* root1, TreeNode* root2) {
        if (!root1) return root2;
        if (!root2) return root1;

        root1->val += root2->val;
        root1->left = mergeTrees(root1->left, root2->left);
        root1->right = mergeTrees(root1->right, root2->right);
        return root1;
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
     * @return {TreeNode}
     */
    mergeTrees(root1, root2) {
        if (!root1) return root2;
        if (!root2) return root1;

        root1.val += root2.val;
        root1.left = this.mergeTrees(root1.left, root2.left);
        root1.right = this.mergeTrees(root1.right, root2.right);
        return root1;
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
    public TreeNode MergeTrees(TreeNode root1, TreeNode root2) {
        if (root1 == null) {
            return root2;
        }
        if (root2 == null) {
            return root1;
        }

        root1.val += root2.val;
        root1.left = MergeTrees(root1.left, root2.left);
        root1.right = MergeTrees(root1.right, root2.right);
        return root1;
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
func mergeTrees(root1 *TreeNode, root2 *TreeNode) *TreeNode {
    if root1 == nil {
        return root2
    }
    if root2 == nil {
        return root1
    }

    root1.Val += root2.Val
    root1.Left = mergeTrees(root1.Left, root2.Left)
    root1.Right = mergeTrees(root1.Right, root2.Right)
    return root1
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
    fun mergeTrees(root1: TreeNode?, root2: TreeNode?): TreeNode? {
        if (root1 == null) return root2
        if (root2 == null) return root1

        root1.`val` += root2.`val`
        root1.left = mergeTrees(root1.left, root2.left)
        root1.right = mergeTrees(root1.right, root2.right)
        return root1
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
    func mergeTrees(_ root1: TreeNode?, _ root2: TreeNode?) -> TreeNode? {
        if root1 == nil {
            return root2
        }
        if root2 == nil {
            return root1
        }

        root1!.val += root2!.val
        root1!.left = mergeTrees(root1?.left, root2?.left)
        root1!.right = mergeTrees(root1?.right, root2?.right)
        return root1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(min(m, n))$
- Space complexity: $O(min(m, n))$ for recursion stack.

> Where $m$ and $n$ are the number of nodes in the given trees.

---

## 3. Iterative DFS (Creating New Tree)

### Intuition

We can avoid recursion by using an explicit stack to traverse both trees. We push triplets of (`node1`, `node2`, `merged_node`) onto the stack. For each triplet, we create children for the merged node based on whether the corresponding children exist in either input tree. This creates a new tree while simulating the recursive approach iteratively.

### Algorithm

1. Handle base cases where one or both trees are `null`.
2. Create a new root node with the sum of both root values.
3. Initialize a stack with the triplet (`root1`, `root2`, `root`).
4. While the stack is not empty:
   - Pop (`node1`, `node2`, `node`).
   - For left children: if either exists, create a merged left child and push to stack if both exist.
   - For right children: similarly handle and push if both exist.
5. Return the merged root.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def mergeTrees(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root1:
            return root2
        if not root2:
            return root1

        root = TreeNode(root1.val + root2.val)
        stack = [(root1, root2, root)]

        while stack:
            node1, node2, node = stack.pop()

            if node1.left and node2.left:
                node.left = TreeNode(node1.left.val + node2.left.val)
                stack.append((node1.left, node2.left, node.left))
            elif not node1.left:
                node.left = node2.left
            else:
                node.left = node1.left

            if node1.right and node2.right:
                node.right = TreeNode(node1.right.val + node2.right.val)
                stack.append((node1.right, node2.right, node.right))
            elif not node1.right:
                node.right = node2.right
            else:
                node.right = node1.right

        return root
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
    public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
        if (root1 == null && root2 == null) return null;

        int val = (root1 != null ? root1.val : 0) + (root2 != null ? root2.val : 0);
        TreeNode root = new TreeNode(val);
        Stack<TreeNode[]> stack = new Stack<>();
        stack.push(new TreeNode[]{root1, root2, root});

        while (!stack.isEmpty()) {
            TreeNode[] nodes = stack.pop();
            TreeNode node1 = nodes[0], node2 = nodes[1], node = nodes[2];

            TreeNode left1 = node1 != null ? node1.left : null;
            TreeNode left2 = node2 != null ? node2.left : null;
            if (left1 != null || left2 != null) {
                int leftVal = (left1 != null ? left1.val : 0) + (left2 != null ? left2.val : 0);
                node.left = new TreeNode(leftVal);
                stack.push(new TreeNode[]{left1, left2, node.left});
            }

            TreeNode right1 = node1 != null ? node1.right : null;
            TreeNode right2 = node2 != null ? node2.right : null;
            if (right1 != null || right2 != null) {
                int rightVal = (right1 != null ? right1.val : 0) + (right2 != null ? right2.val : 0);
                node.right = new TreeNode(rightVal);
                stack.push(new TreeNode[]{right1, right2, node.right});
            }
        }

        return root;
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
    TreeNode* mergeTrees(TreeNode* root1, TreeNode* root2) {
        if (!root1 && !root2) return nullptr;

        int val = (root1 ? root1->val : 0) + (root2 ? root2->val : 0);
        TreeNode* root = new TreeNode(val);
        stack<tuple<TreeNode*, TreeNode*, TreeNode*>> st;
        st.push({root1, root2, root});

        while (!st.empty()) {
            auto [node1, node2, node] = st.top();
            st.pop();

            TreeNode* left1 = node1 ? node1->left : nullptr;
            TreeNode* left2 = node2 ? node2->left : nullptr;
            if (left1 || left2) {
                int leftVal = (left1 ? left1->val : 0) + (left2 ? left2->val : 0);
                node->left = new TreeNode(leftVal);
                st.push({left1, left2, node->left});
            }

            TreeNode* right1 = node1 ? node1->right : nullptr;
            TreeNode* right2 = node2 ? node2->right : nullptr;
            if (right1 || right2) {
                int rightVal = (right1 ? right1->val : 0) + (right2 ? right2->val : 0);
                node->right = new TreeNode(rightVal);
                st.push({right1, right2, node->right});
            }
        }

        return root;
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
     * @return {TreeNode}
     */
    mergeTrees(root1, root2) {
        if (!root1 && !root2) return null;

        let val = (root1 ? root1.val : 0) + (root2 ? root2.val : 0);
        let root = new TreeNode(val);
        let stack = [[root1, root2, root]];

        while (stack.length) {
            let [node1, node2, node] = stack.pop();

            let left1 = node1 ? node1.left : null;
            let left2 = node2 ? node2.left : null;
            if (left1 || left2) {
                let leftVal = (left1 ? left1.val : 0) + (left2 ? left2.val : 0);
                node.left = new TreeNode(leftVal);
                stack.push([left1, left2, node.left]);
            }

            let right1 = node1 ? node1.right : null;
            let right2 = node2 ? node2.right : null;
            if (right1 || right2) {
                let rightVal =
                    (right1 ? right1.val : 0) + (right2 ? right2.val : 0);
                node.right = new TreeNode(rightVal);
                stack.push([right1, right2, node.right]);
            }
        }

        return root;
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
    public TreeNode MergeTrees(TreeNode root1, TreeNode root2) {
        if (root1 == null) {
            return root2;
        }
        if (root2 == null) {
            return root1;
        }

        TreeNode root = new TreeNode(root1.val + root2.val);
        Stack<(TreeNode, TreeNode, TreeNode)> stack = new Stack<(TreeNode, TreeNode, TreeNode)>();
        stack.Push((root1, root2, root));

        while (stack.Count > 0) {
            var (node1, node2, node) = stack.Pop();

            if (node1.left != null && node2.left != null) {
                node.left = new TreeNode(node1.left.val + node2.left.val);
                stack.Push((node1.left, node2.left, node.left));
            } else if (node1.left == null) {
                node.left = node2.left;
            } else {
                node.left = node1.left;
            }

            if (node1.right != null && node2.right != null) {
                node.right = new TreeNode(node1.right.val + node2.right.val);
                stack.Push((node1.right, node2.right, node.right));
            } else if (node1.right == null) {
                node.right = node2.right;
            } else {
                node.right = node1.right;
            }
        }

        return root;
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
func mergeTrees(root1 *TreeNode, root2 *TreeNode) *TreeNode {
    if root1 == nil {
        return root2
    }
    if root2 == nil {
        return root1
    }

    root := &TreeNode{Val: root1.Val + root2.Val}
    stack := [][3]*TreeNode{{root1, root2, root}}

    for len(stack) > 0 {
        top := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        node1, node2, node := top[0], top[1], top[2]

        if node1.Left != nil && node2.Left != nil {
            node.Left = &TreeNode{Val: node1.Left.Val + node2.Left.Val}
            stack = append(stack, [3]*TreeNode{node1.Left, node2.Left, node.Left})
        } else if node1.Left == nil {
            node.Left = node2.Left
        } else {
            node.Left = node1.Left
        }

        if node1.Right != nil && node2.Right != nil {
            node.Right = &TreeNode{Val: node1.Right.Val + node2.Right.Val}
            stack = append(stack, [3]*TreeNode{node1.Right, node2.Right, node.Right})
        } else if node1.Right == nil {
            node.Right = node2.Right
        } else {
            node.Right = node1.Right
        }
    }

    return root
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
    fun mergeTrees(root1: TreeNode?, root2: TreeNode?): TreeNode? {
        if (root1 == null) return root2
        if (root2 == null) return root1

        val root = TreeNode(root1.`val` + root2.`val`)
        val stack = ArrayDeque<Triple<TreeNode, TreeNode, TreeNode>>()
        stack.addLast(Triple(root1, root2, root))

        while (stack.isNotEmpty()) {
            val (node1, node2, node) = stack.removeLast()

            if (node1.left != null && node2.left != null) {
                node.left = TreeNode(node1.left!!.`val` + node2.left!!.`val`)
                stack.addLast(Triple(node1.left!!, node2.left!!, node.left!!))
            } else if (node1.left == null) {
                node.left = node2.left
            } else {
                node.left = node1.left
            }

            if (node1.right != null && node2.right != null) {
                node.right = TreeNode(node1.right!!.`val` + node2.right!!.`val`)
                stack.addLast(Triple(node1.right!!, node2.right!!, node.right!!))
            } else if (node1.right == null) {
                node.right = node2.right
            } else {
                node.right = node1.right
            }
        }

        return root
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
    func mergeTrees(_ root1: TreeNode?, _ root2: TreeNode?) -> TreeNode? {
        if root1 == nil {
            return root2
        }
        if root2 == nil {
            return root1
        }

        let root = TreeNode(root1!.val + root2!.val)
        var stack: [(TreeNode, TreeNode, TreeNode)] = [(root1!, root2!, root)]

        while !stack.isEmpty {
            let (node1, node2, node) = stack.removeLast()

            if node1.left != nil && node2.left != nil {
                node.left = TreeNode(node1.left!.val + node2.left!.val)
                stack.append((node1.left!, node2.left!, node.left!))
            } else if node1.left == nil {
                node.left = node2.left
            } else {
                node.left = node1.left
            }

            if node1.right != nil && node2.right != nil {
                node.right = TreeNode(node1.right!.val + node2.right!.val)
                stack.append((node1.right!, node2.right!, node.right!))
            } else if node1.right == nil {
                node.right = node2.right
            } else {
                node.right = node1.right
            }
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity:
    - $O(m + n)$ space for the stack.
    - $O(m + n)$ space for the output.

> Where $m$ and $n$ are the number of nodes in the given trees.

---

## 4. Iterative DFS (In Place)

### Intuition

Similar to the recursive in-place approach, we can modify the first tree iteratively using a stack. We push pairs of nodes from both trees. When both nodes exist, we add values and continue processing children. If only one tree has a child at a position, we directly attach that subtree to the first tree. This avoids creating new nodes.

### Algorithm

1. Handle base cases where one or both trees are `null`.
2. Initialize a stack with the pair (`root1`, `root2`).
3. While the stack is not empty:
   - Pop (`node1`, `node2`). Skip if either is `null`.
   - Add `node2.val` to `node1.val`.
   - If both have left children, push them to the stack. Otherwise, if `node1` has no left child, attach `node2.left`.
   - Similarly handle right children.
4. Return `root1`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def mergeTrees(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root1:
            return root2
        if not root2:
            return root1

        stack = [(root1, root2)]

        while stack:
            node1, node2 = stack.pop()
            if not node1 or not node2:
                continue

            node1.val += node2.val

            if node1.left and node2.left:
                stack.append((node1.left, node2.left))
            elif not node1.left:
                node1.left = node2.left

            if node1.right and node2.right:
                stack.append((node1.right, node2.right))
            elif not node1.right:
                node1.right = node2.right

        return root1
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
    public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
        if (root1 == null) return root2;
        if (root2 == null) return root1;

        Stack<TreeNode[]> stack = new Stack<>();
        stack.push(new TreeNode[] { root1, root2 });

        while (!stack.isEmpty()) {
            TreeNode[] nodes = stack.pop();
            TreeNode node1 = nodes[0];
            TreeNode node2 = nodes[1];

            if (node2 == null) continue;

            node1.val += node2.val;

            if (node1.left == null) {
                node1.left = node2.left;
            } else {
                stack.push(new TreeNode[] { node1.left, node2.left });
            }

            if (node1.right == null) {
                node1.right = node2.right;
            } else {
                stack.push(new TreeNode[] { node1.right, node2.right });
            }
        }

        return root1;
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
    TreeNode* mergeTrees(TreeNode* root1, TreeNode* root2) {
        if (!root1) return root2;
        if (!root2) return root1;

        stack<pair<TreeNode*, TreeNode*>> stk;
        stk.push({root1, root2});

        while (!stk.empty()) {
            auto [node1, node2] = stk.top();
            stk.pop();

            if (!node2) continue;

            node1->val += node2->val;

            if (!node1->left) {
                node1->left = node2->left;
            } else {
                stk.push({node1->left, node2->left});
            }

            if (!node1->right) {
                node1->right = node2->right;
            } else {
                stk.push({node1->right, node2->right});
            }
        }

        return root1;
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
     * @return {TreeNode}
     */
    mergeTrees(root1, root2) {
        if (!root1) return root2;
        if (!root2) return root1;

        let stack = [[root1, root2]];

        while (stack.length) {
            let [node1, node2] = stack.pop();
            if (!node1 || !node2) continue;

            node1.val += node2.val;

            if (node1.left && node2.left) {
                stack.push([node1.left, node2.left]);
            } else if (!node1.left) {
                node1.left = node2.left;
            }

            if (node1.right && node2.right) {
                stack.push([node1.right, node2.right]);
            } else if (!node1.right) {
                node1.right = node2.right;
            }
        }

        return root1;
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
    public TreeNode MergeTrees(TreeNode root1, TreeNode root2) {
        if (root1 == null) return root2;
        if (root2 == null) return root1;

        Stack<(TreeNode, TreeNode)> stack = new Stack<(TreeNode, TreeNode)>();
        stack.Push((root1, root2));

        while (stack.Count > 0) {
            var (node1, node2) = stack.Pop();
            if (node1 == null || node2 == null) continue;

            node1.val += node2.val;

            if (node1.left != null && node2.left != null) {
                stack.Push((node1.left, node2.left));
            } else if (node1.left == null) {
                node1.left = node2.left;
            }

            if (node1.right != null && node2.right != null) {
                stack.Push((node1.right, node2.right));
            } else if (node1.right == null) {
                node1.right = node2.right;
            }
        }

        return root1;
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
func mergeTrees(root1 *TreeNode, root2 *TreeNode) *TreeNode {
    if root1 == nil {
        return root2
    }
    if root2 == nil {
        return root1
    }

    stack := [][2]*TreeNode{{root1, root2}}

    for len(stack) > 0 {
        top := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        node1, node2 := top[0], top[1]
        if node1 == nil || node2 == nil {
            continue
        }

        node1.Val += node2.Val

        if node1.Left != nil && node2.Left != nil {
            stack = append(stack, [2]*TreeNode{node1.Left, node2.Left})
        } else if node1.Left == nil {
            node1.Left = node2.Left
        }

        if node1.Right != nil && node2.Right != nil {
            stack = append(stack, [2]*TreeNode{node1.Right, node2.Right})
        } else if node1.Right == nil {
            node1.Right = node2.Right
        }
    }

    return root1
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
    fun mergeTrees(root1: TreeNode?, root2: TreeNode?): TreeNode? {
        if (root1 == null) return root2
        if (root2 == null) return root1

        val stack = ArrayDeque<Pair<TreeNode, TreeNode>>()
        stack.addLast(Pair(root1, root2))

        while (stack.isNotEmpty()) {
            val (node1, node2) = stack.removeLast()

            node1.`val` += node2.`val`

            if (node1.left != null && node2.left != null) {
                stack.addLast(Pair(node1.left!!, node2.left!!))
            } else if (node1.left == null) {
                node1.left = node2.left
            }

            if (node1.right != null && node2.right != null) {
                stack.addLast(Pair(node1.right!!, node2.right!!))
            } else if (node1.right == null) {
                node1.right = node2.right
            }
        }

        return root1
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
    func mergeTrees(_ root1: TreeNode?, _ root2: TreeNode?) -> TreeNode? {
        if root1 == nil {
            return root2
        }
        if root2 == nil {
            return root1
        }

        var stack: [(TreeNode, TreeNode)] = [(root1!, root2!)]

        while !stack.isEmpty {
            let (node1, node2) = stack.removeLast()

            node1.val += node2.val

            if node1.left != nil && node2.left != nil {
                stack.append((node1.left!, node2.left!))
            } else if node1.left == nil {
                node1.left = node2.left
            }

            if node1.right != nil && node2.right != nil {
                stack.append((node1.right!, node2.right!))
            } else if node1.right == nil {
                node1.right = node2.right
            }
        }

        return root1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(min(m, n))$
- Space complexity: $O(min(m, n))$ for the stack.

> Where $m$ and $n$ are the number of nodes in the given trees.

---

## Common Pitfalls

### Not Handling the Case When One Tree is Null

When one of the input trees is `null` at a position while the other is not, you should return the non-null subtree directly. Failing to handle this base case properly leads to null pointer exceptions or missing nodes in the result.

### Modifying the Input Trees Unintentionally

When using the in-place approach, the first tree is modified to become the merged result. If the original trees need to be preserved for other purposes, this causes unexpected side effects. Use the approach that creates a new tree if the inputs must remain unchanged.
