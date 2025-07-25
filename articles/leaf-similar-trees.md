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
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        def dfs(root, leaf):
            if not root:
                return
            if not root.left and not root.right:
                leaf.append(root.val)
                return
            dfs(root.left, leaf)
            dfs(root.right, leaf)

        leaf1, leaf2 = [], []
        dfs(root1, leaf1)
        dfs(root2, leaf2)
        return leaf1 == leaf2
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
    public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        List<Integer> leaf1 = new ArrayList<>();
        List<Integer> leaf2 = new ArrayList<>();

        dfs(root1, leaf1);
        dfs(root2, leaf2);

        return leaf1.equals(leaf2);
    }

    private void dfs(TreeNode root, List<Integer> leaf) {
        if (root == null) return;
        if (root.left == null && root.right == null) {
            leaf.add(root.val);
            return;
        }
        dfs(root.left, leaf);
        dfs(root.right, leaf);
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
    bool leafSimilar(TreeNode* root1, TreeNode* root2) {
        vector<int> leaf1, leaf2;
        dfs(root1, leaf1);
        dfs(root2, leaf2);
        return leaf1 == leaf2;
    }

private:
    void dfs(TreeNode* root, vector<int>& leaf) {
        if (!root) return;
        if (!root->left && !root->right) {
            leaf.push_back(root->val);
            return;
        }
        dfs(root->left, leaf);
        dfs(root->right, leaf);
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
    leafSimilar(root1, root2) {
        const dfs = (root, leaf) => {
            if (!root) return;
            if (!root.left && !root.right) {
                leaf.push(root.val);
                return;
            }
            dfs(root.left, leaf);
            dfs(root.right, leaf);
        };

        const leaf1 = [];
        const leaf2 = [];
        dfs(root1, leaf1);
        dfs(root2, leaf2);

        return JSON.stringify(leaf1) === JSON.stringify(leaf2);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ and $m$ are the number of nodes in the given trees.

---

## 2. Depth First Search (Space Optimized)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        def dfs(root, leaf):
            if not root:
                return
            if not root.left and not root.right:
                leaf.append(root.val)
                return
            dfs(root.left, leaf)
            dfs(root.right, leaf)

        leaf1 = []
        dfs(root1, leaf1)

        def dfs1(root, leaf):
            if not root:
                return True
            if not root.left and not root.right:
                if not leaf:
                    return False
                return leaf.pop() == root.val
            return dfs1(root.right, leaf) and dfs1(root.left, leaf)

        return dfs1(root2, leaf1) and not leaf1
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
    public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        Stack<Integer> leaf1 = new Stack<>();
        dfs(root1, leaf1);
        return dfs1(root2, leaf1) && leaf1.isEmpty();
    }

    private void dfs(TreeNode root, Stack<Integer> leaf) {
        if (root == null) return;
        if (root.left == null && root.right == null) {
            leaf.push(root.val);
            return;
        }
        dfs(root.left, leaf);
        dfs(root.right, leaf);
    }

    private boolean dfs1(TreeNode root, Stack<Integer> leaf) {
        if (root == null) return true;
        if (root.left == null && root.right == null) {
            if (leaf.isEmpty()) return false;
            return leaf.pop() == root.val;
        }
        return dfs1(root.right, leaf) && dfs1(root.left, leaf);
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
    bool leafSimilar(TreeNode* root1, TreeNode* root2) {
        vector<int> leaf1;
        dfs(root1, leaf1);
        return dfs1(root2, leaf1) && leaf1.empty();
    }

private:
    void dfs(TreeNode* root, vector<int>& leaf) {
        if (!root) return;
        if (!root->left && !root->right) {
            leaf.push_back(root->val);
            return;
        }
        dfs(root->left, leaf);
        dfs(root->right, leaf);
    }

    bool dfs1(TreeNode* root, vector<int>& leaf) {
        if (!root) return true;
        if (!root->left && !root->right) {
            if (leaf.empty() || leaf.back() != root->val) {
                return false;
            }
            leaf.pop_back();
            return true;
        }
        return dfs1(root->right, leaf) && dfs1(root->left, leaf);
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
    leafSimilar(root1, root2) {
        const dfs = (root, leaf) => {
            if (!root) return;
            if (!root.left && !root.right) {
                leaf.push(root.val);
                return;
            }
            dfs(root.left, leaf);
            dfs(root.right, leaf);
        };

        const dfs1 = (root, leaf) => {
            if (!root) return true;
            if (!root.left && !root.right) {
                if (!leaf.length) return false;
                return leaf.pop() === root.val;
            }
            return dfs1(root.right, leaf) && dfs1(root.left, leaf);
        };

        const leaf1 = [];
        dfs(root1, leaf1);
        return dfs1(root2, leaf1) && leaf1.length === 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ and $m$ are the number of nodes in the given trees.

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
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        def getPathLeaf(stack):
            while stack:
                node = stack.pop()
                if node.right:
                    stack.append(node.right)
                if node.left:
                    stack.append(node.left)
                if not node.left and not node.right:
                    return node.val

        stack1, stack2 = [root1], [root2]
        while stack1 and stack2:
            if getPathLeaf(stack1) != getPathLeaf(stack2):
                return False

        return not stack1 and not stack2
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
    public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        Stack<TreeNode> stack1 = new Stack<>();
        Stack<TreeNode> stack2 = new Stack<>();
        stack1.push(root1);
        stack2.push(root2);

        while (!stack1.isEmpty() && !stack2.isEmpty()) {
            if (getPathLeaf(stack1) != getPathLeaf(stack2)) {
                return false;
            }
        }
        return stack1.isEmpty() && stack2.isEmpty();
    }

    private int getPathLeaf(Stack<TreeNode> stack) {
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node.right != null) {
                stack.push(node.right);
            }
            if (node.left != null) {
                stack.push(node.left);
            }
            if (node.left == null && node.right == null) {
                return node.val;
            }
        }
        return -1;
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
    bool leafSimilar(TreeNode* root1, TreeNode* root2) {
        stack<TreeNode*> stack1, stack2;
        stack1.push(root1);
        stack2.push(root2);

        while (!stack1.empty() && !stack2.empty()) {
            if (getPathLeaf(stack1) != getPathLeaf(stack2)) {
                return false;
            }
        }
        return stack1.empty() && stack2.empty();
    }

private:
    int getPathLeaf(stack<TreeNode*>& stack) {
        while (!stack.empty()) {
            TreeNode* node = stack.top();
            stack.pop();
            if (node->right) {
                stack.push(node->right);
            }
            if (node->left) {
                stack.push(node->left);
            }
            if (!node->left && !node->right) {
                return node->val;
            }
        }
        return -1;
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
    leafSimilar(root1, root2) {
        const getPathLeaf = (stack) => {
            while (stack.length) {
                const node = stack.pop();
                if (node.right) stack.push(node.right);
                if (node.left) stack.push(node.left);
                if (!node.left && !node.right) return node.val;
            }
        };

        const stack1 = [root1],
            stack2 = [root2];
        while (stack1.length && stack2.length) {
            if (getPathLeaf(stack1) !== getPathLeaf(stack2)) {
                return false;
            }
        }
        return stack1.length === 0 && stack2.length === 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ and $m$ are the number of nodes in the given trees.
