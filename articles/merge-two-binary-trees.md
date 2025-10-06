## 1. Depth First Search (Creating New Tree)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity:
    - $O(m + n)$ space for recursion stack.
    - $O(m + n)$ space for the output.

> Where $m$ and $n$ are the number of nodes in the given trees.

---

## 2. Depth First Search (In Place)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(min(m, n))$
- Space complexity: $O(min(m, n))$ for recursion stack.

> Where $m$ and $n$ are the number of nodes in the given trees.

---

## 3. Iterative DFS (Creating New Tree)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity:
    - $O(m + n)$ space for the stack.
    - $O(m + n)$ space for the output.

> Where $m$ and $n$ are the number of nodes in the given trees.

---

## 4. Iterative DFS (In Place)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(min(m, n))$
- Space complexity: $O(min(m, n))$ for the stack.

> Where $m$ and $n$ are the number of nodes in the given trees.
