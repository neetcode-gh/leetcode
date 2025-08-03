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
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        def dfs(left, right):
            if not left and not right:
                return True
            if not left or not right:
                return False
            return (
                left.val == right.val and
                dfs(left.left, right.right) and
                dfs(left.right, right.left)
            )
        return dfs(root.left, root.right)
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
    public boolean isSymmetric(TreeNode root) {
        return dfs(root.left, root.right);
    }

    private boolean dfs(TreeNode left, TreeNode right) {
        if (left == null && right == null) {
            return true;
        }
        if (left == null || right == null) {
            return false;
        }
        return left.val == right.val &&
               dfs(left.left, right.right) &&
               dfs(left.right, right.left);
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
    bool isSymmetric(TreeNode* root) {
        return dfs(root->left, root->right);
    }

private:
    bool dfs(TreeNode* left, TreeNode* right) {
        if (!left && !right) {
            return true;
        }
        if (!left || !right) {
            return false;
        }
        return (left->val == right->val) &&
                dfs(left->left, right->right) &&
                dfs(left->right, right->left);
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
    isSymmetric(root) {
        const dfs = (left, right) => {
            if (!left && !right) {
                return true;
            }
            if (!left || !right) {
                return false;
            }
            return (
                left.val === right.val &&
                dfs(left.left, right.right) &&
                dfs(left.right, right.left)
            );
        };
        return dfs(root.left, root.right);
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
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        if not root:
            return True

        stack = [(root.left, root.right)]
        while stack:
            left, right = stack.pop()
            if not left and not right:
                continue
            if not left or not right or left.val != right.val:
                return False
            stack.append((left.left, right.right))
            stack.append((left.right, right.left))
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
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;

        Stack<TreeNode[]> stack = new Stack<>();
        stack.push(new TreeNode[]{root.left, root.right});

        while (!stack.isEmpty()) {
            TreeNode[] nodes = stack.pop();
            TreeNode left = nodes[0], right = nodes[1];

            if (left == null && right == null) continue;
            if (left == null || right == null || left.val != right.val) {
                return false;
            }

            stack.push(new TreeNode[]{left.left, right.right});
            stack.push(new TreeNode[]{left.right, right.left});
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
    bool isSymmetric(TreeNode* root) {
        if (!root) return true;

        std::stack<pair<TreeNode*, TreeNode*>> stack;
        stack.push({root->left, root->right});

        while (!stack.empty()) {
            auto [left, right] = stack.top();
            stack.pop();

            if (!left && !right) continue;
            if (!left || !right || left->val != right->val) {
                return false;
            }
            stack.push({left->left, right->right});
            stack.push({left->right, right->left});
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
     * @param {TreeNode} root
     * @return {boolean}
     */
    isSymmetric(root) {
        if (!root) return true;

        const stack = [[root.left, root.right]];

        while (stack.length > 0) {
            const [left, right] = stack.pop();

            if (!left && !right) continue;
            if (!left || !right || left.val !== right.val) {
                return false;
            }

            stack.push([left.left, right.right]);
            stack.push([left.right, right.left]);
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Breadth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        if not root:
            return True

        queue = deque([(root.left, root.right)])
        while queue:
            for _ in range(len(queue)):
                left, right = queue.popleft()
                if not left and not right:
                    continue
                if not left or not right or left.val != right.val:
                    return False
                queue.append((left.left, right.right))
                queue.append((left.right, right.left))

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
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;

        Queue<TreeNode[]> queue = new LinkedList<>();
        queue.add(new TreeNode[]{root.left, root.right});

        while (!queue.isEmpty()) {
            for (int i = queue.size(); i > 0; i--) {
                TreeNode[] nodes = queue.poll();
                TreeNode left = nodes[0], right = nodes[1];

                if (left == null && right == null) continue;
                if (left == null || right == null || left.val != right.val) {
                    return false;
                }
                queue.add(new TreeNode[]{left.left, right.right});
                queue.add(new TreeNode[]{left.right, right.left});
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
    bool isSymmetric(TreeNode* root) {
        if (!root) return true;

        queue<pair<TreeNode*, TreeNode*>> queue;
        queue.push({root->left, root->right});

        while (!queue.empty()) {
            for (int i = queue.size(); i > 0; i--) {
                auto [left, right] = queue.front();
                queue.pop();

                if (!left && !right) continue;
                if (!left || !right || left->val != right->val) {
                    return false;
                }
                queue.push({left->left, right->right});
                queue.push({left->right, right->left});
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
     * @param {TreeNode} root
     * @return {boolean}
     */
    isSymmetric(root) {
        if (!root) return true;

        const queue = new Queue([[root.left, root.right]]);

        while (!queue.isEmpty()) {
            for (let i = queue.size(); i > 0; i--) {
                const [left, right] = queue.pop();

                if (!left && !right) continue;
                if (!left || !right || left.val !== right.val) {
                    return false;
                }
                queue.push([left.left, right.right]);
                queue.push([left.right, right.left]);
            }
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
