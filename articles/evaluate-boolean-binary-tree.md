## 1. Depth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def evaluateTree(self, root: Optional[TreeNode]) -> bool:
        if not root.left:
            return root.val == 1

        if root.val == 2:
            return self.evaluateTree(root.left) or self.evaluateTree(root.right)

        if root.val == 3:
            return self.evaluateTree(root.left) and self.evaluateTree(root.right)
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
    public boolean evaluateTree(TreeNode root) {
        if (root.left == null) {
            return root.val == 1;
        }

        if (root.val == 2) {
            return evaluateTree(root.left) || evaluateTree(root.right);
        }

        if (root.val == 3) {
            return evaluateTree(root.left) && evaluateTree(root.right);
        }

        return false;
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
    bool evaluateTree(TreeNode* root) {
        if (!root->left) {
            return root->val == 1;
        }

        if (root->val == 2) {
            return evaluateTree(root->left) || evaluateTree(root->right);
        }

        if (root->val == 3) {
            return evaluateTree(root->left) && evaluateTree(root->right);
        }

        return false;
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
     * @return {boolean}
     */
    evaluateTree(root) {
        if (!root.left) {
            return root.val === 1;
        }

        if (root.val === 2) {
            return (
                this.evaluateTree(root.left) || this.evaluateTree(root.right)
            );
        }

        if (root.val === 3) {
            return (
                this.evaluateTree(root.left) && this.evaluateTree(root.right)
            );
        }

        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Iterative DFS

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def evaluateTree(self, root: Optional[TreeNode]) -> bool:
        stack = [root]
        value = {} # map (node -> value)

        while stack:
            node = stack.pop()

            if not node.left:
                value[node] = node.val == 1
            elif node.left in value:
                if node.val == 2:
                    value[node] = value[node.left] or value[node.right]
                if node.val == 3:
                    value[node] = value[node.left] and value[node.right]
            else:
                stack.extend([node, node.left, node.right])

        return value[root]
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
    public boolean evaluateTree(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        Map<TreeNode, Boolean> value = new HashMap<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();

            if (node.left == null) {
                value.put(node, node.val == 1);
            } else if (value.containsKey(node.left)) {
                boolean leftValue = value.get(node.left);
                boolean rightValue = value.get(node.right);

                if (node.val == 2) {
                    value.put(node, leftValue || rightValue);
                } else if (node.val == 3) {
                    value.put(node, leftValue && rightValue);
                }
            } else {
                stack.push(node);
                stack.push(node.right);
                stack.push(node.left);
            }
        }

        return value.get(root);
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
    bool evaluateTree(TreeNode* root) {
        stack<TreeNode*> stk;
        unordered_map<TreeNode*, bool> value;
        stk.push(root);

        while (!stk.empty()) {
            TreeNode* node = stk.top();
            stk.pop();

            if (!node->left) {
                value[node] = node->val == 1;
            } else if (value.count(node->left)) {
                bool leftValue = value[node->left];
                bool rightValue = value[node->right];

                if (node->val == 2) {
                    value[node] = leftValue || rightValue;
                } else if (node->val == 3) {
                    value[node] = leftValue && rightValue;
                }
            } else {
                stk.push(node);
                stk.push(node->right);
                stk.push(node->left);
            }
        }

        return value[root];
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
     * @return {boolean}
     */
    evaluateTree(root) {
        const stack = [root];
        const value = new Map();

        while (stack.length) {
            const node = stack.pop();

            if (!node.left) {
                value.set(node, node.val === 1);
            } else if (value.has(node.left)) {
                const leftValue = value.get(node.left);
                const rightValue = value.get(node.right);

                if (node.val === 2) {
                    value.set(node, leftValue || rightValue);
                } else if (node.val === 3) {
                    value.set(node, leftValue && rightValue);
                }
            } else {
                stack.push(node, node.right, node.left);
            }
        }

        return value.get(root);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
