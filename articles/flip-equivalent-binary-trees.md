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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Breadth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Iterative DFS

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
