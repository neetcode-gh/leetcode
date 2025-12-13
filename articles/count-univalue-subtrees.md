## 1. Depth First Search

::tabs-start

```python
class Solution:
    def countUnivalSubtrees(self, root: Optional[TreeNode]) -> int:
        self.count = 0

        def dfs(node):
            if node is None:
                return True

            isLeftUniValue = dfs(node.left)
            isRightUniValue = dfs(node.right)

            # If both the children form uni-value subtrees, we compare the value of
            # chidrens node with the node value.
            if isLeftUniValue and isRightUniValue:
                if node.left and node.val != node.left.val:
                    return False
                if node.right and node.val != node.right.val:
                    return False
    
                self.count += 1
                return True
            # Else if any of the child does not form a uni-value subtree, the subtree
            # rooted at node cannot be a uni-value subtree.
            return False
        
        dfs(root)
        return self.count
```

```java
class Solution {
    int count = 0;

    public boolean dfs(TreeNode node) {
        if (node == null) {
            return true;
        }

        boolean left = dfs(node.left);
        boolean right = dfs(node.right);

        // If both the children form uni-value subtrees, we compare the value of
        // chidren's node with the node value.
        if (left && right) {
            if (node.left != null && node.left.val != node.val) {
                return false;
            }
            if (node.right != null && node.right.val != node.val) {
                return false;
            }
            count++;
            return true;
        }
        // Else if any of the child does not form a uni-value subtree, the subtree
        // rooted at node cannot be a uni-value subtree.
        return false;
    }

    public int countUnivalSubtrees(TreeNode root) {
        dfs(root);
        return count;
    }
}
```

```cpp
class Solution {
public:
    int count = 0;

    bool dfs(TreeNode* node) {
        if (node == nullptr) {
            return true;
        }

        bool isLeftUniValue = dfs(node->left);
        bool isRightUniValue = dfs(node->right);

        // If both the children form uni-value subtrees, we compare the value of
        // chidren's node with the node value.
        if (isLeftUniValue && isRightUniValue) {
            if (node->left != nullptr && node->left->val != node->val) {
                return false;
            }
            if (node->right != nullptr && node->right->val != node->val) {
                return false;
            }
            count++;
            return true;
        }
        // Else if any of the child does not form a uni-value subtree, the subtree
        // rooted at node cannot be a uni-value subtree.
        return false;
    }

    int countUnivalSubtrees(TreeNode* root) {
        dfs(root);
        return count;
    }
};
```

```javascript
class Solution {
    constructor() {
        this.count = 0;
    }
    
    /**
     * @param {TreeNode} node
     * @return {boolean}
     */
    dfs(node) {
        if (node === null) {
            return true;
        }
        
        let left = this.dfs(node.left);
        let right = this.dfs(node.right);
        
        // If both the children form uni-value subtrees, we compare the value of
        // children's node with the node value.
        if (left && right) {
            if (node.left !== null && node.left.val !== node.val) {
                return false;
            }
            if (node.right !== null && node.right.val !== node.val) {
                return false;
            }
            this.count++;
            return true;
        }
        
        // Else if any of the child does not form a uni-value subtree, the subtree
        // rooted at node cannot be a uni-value subtree.
        return false;
    }
    
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    countUnivalSubtrees(root) {
        this.count = 0;
        this.dfs(root);
        return this.count;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the given binary tree

---

## 2. Depth First Search Without Using The Global Variable

::tabs-start

```python
class Solution:
    def countUnivalSubtrees(self, root: Optional[TreeNode]) -> int:
        def dfs(node, count):
            if node is None:
                return True

            isLeftUniValue = dfs(node.left, count)
            isRightUniValue = dfs(node.right, count)

            # If both the children form uni-value subtrees, we compare the value of
            # chidrens node with the node value.
            if isLeftUniValue and isRightUniValue:
                if node.left and node.val != node.left.val:
                    return False
                if node.right and node.val != node.right.val:
                    return False
    
                count[0] += 1
                return True
            # Else if any of the child does not form a uni-value subtree, the subtree
            # rooted at node cannot be a uni-value subtree.
            return False

        count = [0]
        dfs(root, count)
        return count[0]
```

```java
class Solution {
    private boolean dfs(TreeNode root, int[] count) {
        if (root == null) {
            return true;
        }

        boolean isLeftUnival = dfs(root.left, count);
        boolean isRightUnival = dfs(root.right, count);

        if (isLeftUnival && isRightUnival &&
            (root.left == null || root.left.val == root.val) &&
            (root.right == null || root.right.val == root.val)
        ) {
            count[0]++;
            return true;
        }

        return false;
    }
    
    public int countUnivalSubtrees(TreeNode root) {
        int[] count = new int[1];
        dfs(root, count);
        return count[0];
    }
}
```

```cpp
class Solution {
public:
    bool dfs(TreeNode* node, int& count) {
        if (node == nullptr) {
            return true;
        }

        bool isLeftUniValue = dfs(node->left, count);
        bool isRightUniValue = dfs(node->right, count);

        // If both the children form uni-value subtrees, we compare the value of
        // chidren's node with the node value.
        if (isLeftUniValue && isRightUniValue) {
            if (node->left != nullptr && node->left->val != node->val) {
                return false;
            }
            if (node->right != nullptr && node->right->val != node->val) {
                return false;
            }
            count++;
            return true;
        }
        // Else if any of the child does not form a uni-value subtree, the subtree
        // rooted at node cannot be a uni-value subtree.
        return false;
    }

    int countUnivalSubtrees(TreeNode* root) {
        int count = 0;
        dfs(root, count);
        return count;
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number[]} count
     * @return {boolean}
     */
    dfs(root, count) {
        if (root === null) {
            return true;
        }
        
        let isLeftUnival = this.dfs(root.left, count);
        let isRightUnival = this.dfs(root.right, count);
        
        if (isLeftUnival && isRightUnival &&
            (root.left === null || root.left.val === root.val) &&
            (root.right === null || root.right.val === root.val)
        ) {
            count[0]++;
            return true;
        }
        
        return false;
    }
    
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    countUnivalSubtrees(root) {
        let count = [0];
        this.dfs(root, count);
        return count[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the given binary tree
