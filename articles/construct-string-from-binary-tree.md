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
    def tree2str(self, root: Optional[TreeNode]) -> str:
        if not root:
            return ""

        cur = root.val
        left = self.tree2str(root.left)
        right = self.tree2str(root.right)

        if left and right:
            return f"{cur}({left})({right})"

        if right:
            return f"{cur}()({right})"

        if left:
            return f"{cur}({left})"

        return str(cur)
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
    public String tree2str(TreeNode root) {
        if (root == null) {
            return "";
        }

        String cur = Integer.toString(root.val);
        String left = tree2str(root.left);
        String right = tree2str(root.right);

        if (!left.isEmpty() && !right.isEmpty()) {
            return cur + "(" + left + ")" + "(" + right + ")";
        }

        if (!right.isEmpty()) {
            return cur + "()" + "(" + right + ")";
        }

        if (!left.isEmpty()) {
            return cur + "(" + left + ")";
        }

        return cur;
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
    string tree2str(TreeNode* root) {
        if (!root) {
            return "";
        }

        string cur = to_string(root->val);
        string left = tree2str(root->left);
        string right = tree2str(root->right);

        if (!left.empty() && !right.empty()) {
            return cur + "(" + left + ")(" + right + ")";
        }

        if (!right.empty()) {
            return cur + "()(" + right + ")";
        }

        if (!left.empty()) {
            return cur + "(" + left + ")";
        }

        return cur;
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
     * @return {string}
     */
    tree2str(root) {
        if (!root) {
            return '';
        }

        const cur = root.val.toString();
        const left = this.tree2str(root.left);
        const right = this.tree2str(root.right);

        if (left && right) {
            return `${cur}(${left})(${right})`;
        }

        if (right) {
            return `${cur}()(${right})`;
        }

        if (left) {
            return `${cur}(${left})`;
        }

        return cur;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Depth First Search (Optimal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def tree2str(self, root: Optional[TreeNode]) -> str:
        res = []

        def preorder(root):
            if not root:
                return
            res.append("(")
            res.append(str(root.val))
            if not root.left and root.right:
                res.append("()")
            preorder(root.left)
            preorder(root.right)
            res.append(")")

        preorder(root)
        return "".join(res)[1:-1]
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
    public String tree2str(TreeNode root) {
        StringBuilder res = new StringBuilder();

        preorder(root, res);
        return res.substring(1, res.length() - 1);
    }

    private void preorder(TreeNode root, StringBuilder res) {
        if (root == null) return;

        res.append("(").append(root.val);
        if (root.left == null && root.right != null) {
            res.append("()");
        }
        preorder(root.left, res);
        preorder(root.right, res);
        res.append(")");
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
    string tree2str(TreeNode* root) {
        string res;
        preorder(root, res);
        return res.substr(1, res.size() - 2);
    }

private:
    void preorder(TreeNode* root, string& res) {
        if (!root) return;

        res += "(" + to_string(root->val);
        if (!root->left && root->right) {
            res += "()";
        }
        preorder(root->left, res);
        preorder(root->right, res);
        res += ")";
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
     * @return {string}
     */
    tree2str(root) {
        let res = [];

        const preorder = (root) => {
            if (!root) return;

            res.push('(');
            res.push(root.val.toString());
            if (!root.left && root.right) {
                res.push('()');
            }
            preorder(root.left);
            preorder(root.right);
            res.push(')');
        };

        preorder(root);
        return res.join('').slice(1, -1);
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
    def tree2str(self, root: Optional[TreeNode]) -> str:
        if not root:
            return ""

        res = []
        stack = []
        last_visited = None
        cur = root

        while cur or stack:
            if cur:
                res.append(f"({cur.val}")
                if not cur.left and cur.right:
                    res.append("()")

                stack.append(cur)
                cur = cur.left
            else:
                top = stack[-1]
                if top.right and last_visited != top.right:
                    cur = top.right
                else:
                    stack.pop()
                    res.append(")")
                    last_visited = top

        return "".join(res)[1:-1]
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
    public String tree2str(TreeNode root) {
        if (root == null) {
            return "";
        }

        StringBuilder res = new StringBuilder();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode lastVisited = null;
        TreeNode cur = root;

        while (cur != null || !stack.isEmpty()) {
            if (cur != null) {
                res.append("(").append(cur.val);
                if (cur.left == null && cur.right != null) {
                    res.append("()");
                }

                stack.push(cur);
                cur = cur.left;
            } else {
                TreeNode top = stack.peek();
                if (top.right != null && lastVisited != top.right) {
                    cur = top.right;
                } else {
                    stack.pop();
                    res.append(")");
                    lastVisited = top;
                }
            }
        }

        return res.substring(1, res.length() - 1);
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
    string tree2str(TreeNode* root) {
        if (!root) {
            return "";
        }

        string res;
        stack<TreeNode*> stack;
        TreeNode* lastVisited = nullptr;
        TreeNode* cur = root;

        while (cur || !stack.empty()) {
            if (cur) {
                res += "(" + to_string(cur->val);
                if (!cur->left && cur->right) {
                    res += "()";
                }

                stack.push(cur);
                cur = cur->left;
            } else {
                TreeNode* top = stack.top();
                if (top->right && lastVisited != top->right) {
                    cur = top->right;
                } else {
                    stack.pop();
                    res += ")";
                    lastVisited = top;
                }
            }
        }

        return res.substr(1, res.size() - 2);
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
     * @return {string}
     */
    tree2str(root) {
        if (!root) {
            return '';
        }

        let res = [];
        let stack = [];
        let lastVisited = null;
        let cur = root;

        while (cur || stack.length > 0) {
            if (cur) {
                res.push(`(${cur.val}`);
                if (!cur.left && cur.right) {
                    res.push('()');
                }

                stack.push(cur);
                cur = cur.left;
            } else {
                let top = stack[stack.length - 1];
                if (top.right && lastVisited !== top.right) {
                    cur = top.right;
                } else {
                    stack.pop();
                    res.push(')');
                    lastVisited = top;
                }
            }
        }

        return res.join('').slice(1, -1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
