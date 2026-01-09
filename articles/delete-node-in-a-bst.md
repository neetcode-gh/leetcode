## 1. Recursion - I

### Intuition

To delete a node in a BST, we first need to locate it using the BST property (left children are smaller, right children are larger). Once found, we handle three cases: if the node has no left child, replace it with its right child; if no right child, replace with the left child. The tricky case is when the node has both children. We find the in-order successor (the smallest node in the right subtree), copy its value to the current node, and then delete that successor node. This approach swaps values rather than restructuring pointers.

### Algorithm

1. If the root is null, return null.
2. If the key is greater than the root's value, recursively delete from the right subtree.
3. If the key is less than the root's value, recursively delete from the left subtree.
4. If the key matches the root's value:
   - If there is no left child, return the right child.
   - If there is no right child, return the left child.
   - Otherwise, find the in-order successor (leftmost node in the right subtree), copy its value to the current node, and recursively delete the successor.
5. Return the root.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if not root:
            return root

        if key > root.val:
            root.right = self.deleteNode(root.right, key)
        elif key < root.val:
            root.left = self.deleteNode(root.left, key)
        else:
            if not root.left:
                return root.right
            elif not root.right:
                return root.left

            cur = root.right
            while cur.left:
                cur = cur.left
            root.val = cur.val
            root.right = self.deleteNode(root.right, root.val)

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
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return root;

        if (key > root.val) {
            root.right = deleteNode(root.right, key);
        } else if (key < root.val) {
            root.left = deleteNode(root.left, key);
        } else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;

            TreeNode cur = root.right;
            while (cur.left != null) {
                cur = cur.left;
            }
            root.val = cur.val;
            root.right = deleteNode(root.right, root.val);
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
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return root;

        if (key > root->val) {
            root->right = deleteNode(root->right, key);
        } else if (key < root->val) {
            root->left = deleteNode(root->left, key);
        } else {
            if (!root->left) return root->right;
            if (!root->right) return root->left;

            TreeNode* cur = root->right;
            while (cur->left) {
                cur = cur->left;
            }
            root->val = cur->val;
            root->right = deleteNode(root->right, root->val);
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
     * @param {TreeNode} root
     * @param {number} key
     * @return {TreeNode}
     */
    deleteNode(root, key) {
        if (!root) return root;

        if (key > root.val) {
            root.right = this.deleteNode(root.right, key);
        } else if (key < root.val) {
            root.left = this.deleteNode(root.left, key);
        } else {
            if (!root.left) return root.right;
            if (!root.right) return root.left;

            let cur = root.right;
            while (cur.left) {
                cur = cur.left;
            }
            root.val = cur.val;
            root.right = this.deleteNode(root.right, root.val);
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
    public TreeNode DeleteNode(TreeNode root, int key) {
        if (root == null) return null;

        if (key > root.val) {
            root.right = DeleteNode(root.right, key);
        } else if (key < root.val) {
            root.left = DeleteNode(root.left, key);
        } else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;

            TreeNode cur = root.right;
            while (cur.left != null) {
                cur = cur.left;
            }
            root.val = cur.val;
            root.right = DeleteNode(root.right, root.val);
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
func deleteNode(root *TreeNode, key int) *TreeNode {
    if root == nil {
        return nil
    }

    if key > root.Val {
        root.Right = deleteNode(root.Right, key)
    } else if key < root.Val {
        root.Left = deleteNode(root.Left, key)
    } else {
        if root.Left == nil {
            return root.Right
        }
        if root.Right == nil {
            return root.Left
        }

        cur := root.Right
        for cur.Left != nil {
            cur = cur.Left
        }
        root.Val = cur.Val
        root.Right = deleteNode(root.Right, root.Val)
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
    fun deleteNode(root: TreeNode?, key: Int): TreeNode? {
        if (root == null) return null

        if (key > root.`val`) {
            root.right = deleteNode(root.right, key)
        } else if (key < root.`val`) {
            root.left = deleteNode(root.left, key)
        } else {
            if (root.left == null) return root.right
            if (root.right == null) return root.left

            var cur = root.right
            while (cur?.left != null) {
                cur = cur.left
            }
            root.`val` = cur!!.`val`
            root.right = deleteNode(root.right, root.`val`)
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
    func deleteNode(_ root: TreeNode?, _ key: Int) -> TreeNode? {
        guard let root = root else { return nil }

        if key > root.val {
            root.right = deleteNode(root.right, key)
        } else if key < root.val {
            root.left = deleteNode(root.left, key)
        } else {
            if root.left == nil { return root.right }
            if root.right == nil { return root.left }

            var cur = root.right
            while cur?.left != nil {
                cur = cur?.left
            }
            root.val = cur!.val
            root.right = deleteNode(root.right, root.val)
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(h)$
- Space complexity: $O(h)$ for the recursion stack.

> Where $h$ is the height of the given binary search tree.

---

## 2. Recursion - II

### Intuition

Instead of copying the successor's value and deleting it separately, we can restructure the tree directly. When the node to delete has both children, we find the in-order successor (leftmost node in the right subtree) and attach the left subtree of the deleted node as the left child of this successor. Then we simply return the right subtree as the replacement. This avoids value copying and removes the node in a single pass through the tree.

### Algorithm

1. If the root is null, return null.
2. If the key is greater than the root's value, recursively delete from the right subtree.
3. If the key is less than the root's value, recursively delete from the left subtree.
4. If the key matches the root's value:
   - If there is no left child, return the right child.
   - If there is no right child, return the left child.
   - Otherwise, find the in-order successor (leftmost node in the right subtree), attach the deleted node's left subtree to this successor's left, delete the node, and return the right subtree.
5. Return the root.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if not root:
            return root

        if key > root.val:
            root.right = self.deleteNode(root.right, key)
        elif key < root.val:
            root.left = self.deleteNode(root.left, key)
        else:
            if not root.left:
                return root.right
            elif not root.right:
                return root.left

            cur = root.right
            while cur.left:
                cur = cur.left
            cur.left = root.left
            res = root.right
            del root
            return res

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
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return root;

        if (key > root.val) {
            root.right = deleteNode(root.right, key);
        } else if (key < root.val) {
            root.left = deleteNode(root.left, key);
        } else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;

            TreeNode cur = root.right;
            while (cur.left != null) {
                cur = cur.left;
            }
            cur.left = root.left;
            TreeNode res = root.right;
            root = null;
            return res;
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
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return root;

        if (key > root->val) {
            root->right = deleteNode(root->right, key);
        } else if (key < root->val) {
            root->left = deleteNode(root->left, key);
        } else {
            if (!root->left) return root->right;
            if (!root->right) return root->left;

            TreeNode* cur = root->right;
            while (cur->left) {
                cur = cur->left;
            }
            cur->left = root->left;
            TreeNode* res = root->right;
            delete root;
            return res;
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
     * @param {TreeNode} root
     * @param {number} key
     * @return {TreeNode}
     */
    deleteNode(root, key) {
        if (!root) return root;

        if (key > root.val) {
            root.right = this.deleteNode(root.right, key);
        } else if (key < root.val) {
            root.left = this.deleteNode(root.left, key);
        } else {
            if (!root.left) return root.right;
            if (!root.right) return root.left;

            let cur = root.right;
            while (cur.left) {
                cur = cur.left;
            }
            cur.left = root.left;
            let res = root.right;
            root = null;
            return res;
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
    public TreeNode DeleteNode(TreeNode root, int key) {
        if (root == null) return null;

        if (key > root.val) {
            root.right = DeleteNode(root.right, key);
        } else if (key < root.val) {
            root.left = DeleteNode(root.left, key);
        } else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;

            TreeNode cur = root.right;
            while (cur.left != null) {
                cur = cur.left;
            }
            cur.left = root.left;
            TreeNode res = root.right;
            return res;
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
func deleteNode(root *TreeNode, key int) *TreeNode {
    if root == nil {
        return nil
    }

    if key > root.Val {
        root.Right = deleteNode(root.Right, key)
    } else if key < root.Val {
        root.Left = deleteNode(root.Left, key)
    } else {
        if root.Left == nil {
            return root.Right
        }
        if root.Right == nil {
            return root.Left
        }

        cur := root.Right
        for cur.Left != nil {
            cur = cur.Left
        }
        cur.Left = root.Left
        return root.Right
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
    fun deleteNode(root: TreeNode?, key: Int): TreeNode? {
        if (root == null) return null

        if (key > root.`val`) {
            root.right = deleteNode(root.right, key)
        } else if (key < root.`val`) {
            root.left = deleteNode(root.left, key)
        } else {
            if (root.left == null) return root.right
            if (root.right == null) return root.left

            var cur = root.right
            while (cur?.left != null) {
                cur = cur.left
            }
            cur?.left = root.left
            return root.right
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
    func deleteNode(_ root: TreeNode?, _ key: Int) -> TreeNode? {
        guard let root = root else { return nil }

        if key > root.val {
            root.right = deleteNode(root.right, key)
        } else if key < root.val {
            root.left = deleteNode(root.left, key)
        } else {
            if root.left == nil { return root.right }
            if root.right == nil { return root.left }

            var cur = root.right
            while cur?.left != nil {
                cur = cur?.left
            }
            cur?.left = root.left
            return root.right
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(h)$
- Space complexity: $O(h)$ for the recursion stack.

> Where $h$ is the height of the given binary search tree.

---

## 3. Iteration

### Intuition

This approach avoids recursion by using a loop to find the node to delete and its parent. Once found, we handle the same three deletion cases, but we manually update parent pointers. When the node has two children, we find the in-order successor, detach it from its position, and replace the deleted node with it. This requires careful pointer manipulation to maintain tree structure.

### Algorithm

1. If the root is null, return null.
2. Use a loop to find the node with the given key, tracking its parent.
3. If the node is not found, return the original root.
4. If the node has zero or one child:
   - Determine the child (left or right, whichever exists).
   - If deleting the root, return the child.
   - Otherwise, update the parent's pointer to point to the child.
5. If the node has two children:
   - Find the in-order successor (leftmost node in the right subtree) and its parent.
   - If the successor is not the immediate right child, update its parent's left pointer to the successor's right child, then set the successor's right to the deleted node's right.
   - Set the successor's left to the deleted node's left.
   - Update the parent's pointer to the successor, or return the successor if deleting the root.
6. Return the root.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if not root:
            return root

        parent = None
        cur = root

        # Find the node to delete
        while cur and cur.val != key:
            parent = cur
            if key > cur.val:
                cur = cur.right
            else:
                cur = cur.left

        if not cur:
            return root

        # Node with only one child or no child
        if not cur.left or not cur.right:
            child = cur.left if cur.left else cur.right
            if not parent:
                return child
            if parent.left == cur:
                parent.left = child
            else:
                parent.right = child
        else:
            # Node with two children
            par = None  # parent of right subTree min node
            delNode = cur
            cur = cur.right
            while cur.left:
                par = cur
                cur = cur.left

            if par:  # if there was a left traversal
                par.left = cur.right
                cur.right = delNode.right

            cur.left = delNode.left

            if not parent:  # if we're deleting root
                return cur

            if parent.left == delNode:
                parent.left = cur
            else:
                parent.right = cur

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
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return root;

        TreeNode parent = null;
        TreeNode cur = root;

        // Find the node to delete
        while (cur != null && cur.val != key) {
            parent = cur;
            if (key > cur.val) {
                cur = cur.right;
            } else {
                cur = cur.left;
            }
        }

        if (cur == null) return root;

        // Node with only one child or no child
        if (cur.left == null || cur.right == null) {
            TreeNode child = (cur.left != null) ? cur.left : cur.right;
            if (parent == null) return child;
            if (parent.left == cur) {
                parent.left = child;
            } else {
                parent.right = child;
            }
        } else {
            // Node with two children
            TreeNode par = null; // parent of right subtree's min node
            TreeNode delNode = cur;
            cur = cur.right;
            while (cur.left != null) {
                par = cur;
                cur = cur.left;
            }

            if (par != null) { // if there was a left traversal
                par.left = cur.right;
                cur.right = delNode.right;
            }
            cur.left = delNode.left;

            if (parent == null) return cur; // if deleting root

            if (parent.left == delNode) {
                parent.left = cur;
            } else {
                parent.right = cur;
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
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return root;

        TreeNode* parent = nullptr;
        TreeNode* cur = root;

        // Find the node to delete
        while (cur && cur->val != key) {
            parent = cur;
            if (key > cur->val) {
                cur = cur->right;
            } else {
                cur = cur->left;
            }
        }

        if (!cur) return root;

        // Node with only one child or no child
        if (!cur->left || !cur->right) {
            TreeNode* child = cur->left ? cur->left : cur->right;
            if (!parent) return child;
            if (parent->left == cur) {
                parent->left = child;
            } else {
                parent->right = child;
            }
        } else {
            // Node with two children
            TreeNode* par = nullptr; // parent of right subtree's min node
            TreeNode* delNode = cur;
            cur = cur->right;
            while (cur->left) {
                par = cur;
                cur = cur->left;
            }

            if (par) { // if there was a left traversal
                par->left = cur->right;
                cur->right = delNode->right;
            }
            cur->left = delNode->left;

            if (!parent) return cur; // if deleting root

            if (parent->left == delNode) {
                parent->left = cur;
            } else {
                parent->right = cur;
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
     * @param {TreeNode} root
     * @param {number} key
     * @return {TreeNode}
     */
    deleteNode(root, key) {
        if (!root) return root;

        let parent = null;
        let cur = root;

        // Find the node to delete
        while (cur && cur.val !== key) {
            parent = cur;
            if (key > cur.val) {
                cur = cur.right;
            } else {
                cur = cur.left;
            }
        }

        if (!cur) return root;

        // Node with only one child or no child
        if (!cur.left || !cur.right) {
            const child = cur.left || cur.right;
            if (!parent) return child;
            if (parent.left === cur) {
                parent.left = child;
            } else {
                parent.right = child;
            }
        } else {
            // Node with two children
            let par = null; // parent of right subtree's min node
            const delNode = cur;
            cur = cur.right;
            while (cur.left) {
                par = cur;
                cur = cur.left;
            }

            if (par) {
                // if there was a left traversal
                par.left = cur.right;
                cur.right = delNode.right;
            }
            cur.left = delNode.left;

            if (!parent) return cur; // if deleting root

            if (parent.left === delNode) {
                parent.left = cur;
            } else {
                parent.right = cur;
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
    public TreeNode DeleteNode(TreeNode root, int key) {
        if (root == null) return null;

        TreeNode parent = null;
        TreeNode cur = root;

        // Find the node to delete
        while (cur != null && cur.val != key) {
            parent = cur;
            if (key > cur.val) {
                cur = cur.right;
            } else {
                cur = cur.left;
            }
        }

        if (cur == null) return root;

        // Node with one or no child
        if (cur.left == null || cur.right == null) {
            TreeNode child = cur.left != null ? cur.left : cur.right;

            if (parent == null) {
                return child;
            }

            if (parent.left == cur) {
                parent.left = child;
            } else {
                parent.right = child;
            }
        } else {
            // Node with two children
            TreeNode par = null;
            TreeNode delNode = cur;
            cur = cur.right;
            while (cur.left != null) {
                par = cur;
                cur = cur.left;
            }

            if (par != null) {
                par.left = cur.right;
                cur.right = delNode.right;
            }

            cur.left = delNode.left;

            if (parent == null) {
                return cur;
            }

            if (parent.left == delNode) {
                parent.left = cur;
            } else {
                parent.right = cur;
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
func deleteNode(root *TreeNode, key int) *TreeNode {
    if root == nil {
        return nil
    }

    var parent *TreeNode
    cur := root

    for cur != nil && cur.Val != key {
        parent = cur
        if key > cur.Val {
            cur = cur.Right
        } else {
            cur = cur.Left
        }
    }

    if cur == nil {
        return root
    }

    if cur.Left == nil || cur.Right == nil {
        var child *TreeNode
        if cur.Left != nil {
            child = cur.Left
        } else {
            child = cur.Right
        }

        if parent == nil {
            return child
        }

        if parent.Left == cur {
            parent.Left = child
        } else {
            parent.Right = child
        }
    } else {
        var par *TreeNode
        delNode := cur
        cur = cur.Right
        for cur.Left != nil {
            par = cur
            cur = cur.Left
        }

        if par != nil {
            par.Left = cur.Right
            cur.Right = delNode.Right
        }

        cur.Left = delNode.Left

        if parent == nil {
            return cur
        }

        if parent.Left == delNode {
            parent.Left = cur
        } else {
            parent.Right = cur
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
    fun deleteNode(root: TreeNode?, key: Int): TreeNode? {
        if (root == null) return null

        var parent: TreeNode? = null
        var cur: TreeNode? = root

        while (cur != null && cur.`val` != key) {
            parent = cur
            cur = if (key > cur.`val`) cur.right else cur.left
        }

        if (cur == null) return root

        if (cur.left == null || cur.right == null) {
            val child = cur.left ?: cur.right

            if (parent == null) return child

            if (parent.left == cur) {
                parent.left = child
            } else {
                parent.right = child
            }
        } else {
            var par: TreeNode? = null
            val delNode = cur
            cur = cur.right
            while (cur?.left != null) {
                par = cur
                cur = cur.left
            }

            if (par != null) {
                par.left = cur?.right
                cur?.right = delNode.right
            }

            cur?.left = delNode.left

            if (parent == null) return cur

            if (parent.left == delNode) {
                parent.left = cur
            } else {
                parent.right = cur
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
    func deleteNode(_ root: TreeNode?, _ key: Int) -> TreeNode? {
        guard let root = root else { return nil }

        var parent: TreeNode? = nil
        var cur: TreeNode? = root

        while cur != nil && cur!.val != key {
            parent = cur
            if key > cur!.val {
                cur = cur?.right
            } else {
                cur = cur?.left
            }
        }

        guard let node = cur else { return root }

        if node.left == nil || node.right == nil {
            let child = node.left ?? node.right

            if parent == nil {
                return child
            }

            if parent?.left === node {
                parent?.left = child
            } else {
                parent?.right = child
            }
        } else {
            var par: TreeNode? = nil
            let delNode = node
            cur = node.right
            while cur?.left != nil {
                par = cur
                cur = cur?.left
            }

            if par != nil {
                par?.left = cur?.right
                cur?.right = delNode.right
            }

            cur?.left = delNode.left

            if parent == nil {
                return cur
            }

            if parent?.left === delNode {
                parent?.left = cur
            } else {
                parent?.right = cur
            }
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(h)$
- Space complexity: $O(1)$ extra space.

> Where $h$ is the height of the given binary search tree.
