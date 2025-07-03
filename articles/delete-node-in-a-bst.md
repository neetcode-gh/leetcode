## 1. Recursion - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(h)$
- Space complexity: $O(h)$ for the recursion stack.

> Where $h$ is the height of the given binary search tree.

---

## 2. Recursion - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(h)$
- Space complexity: $O(h)$ for the recursion stack.

> Where $h$ is the height of the given binary search tree.

---

## 3. Iteration

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(h)$
- Space complexity: $O(1)$ extra space.

> Where $h$ is the height of the given binary search tree.
