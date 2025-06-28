## 1. Depth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        lca = None

        def dfs(node):
            nonlocal lca
            if not node:
                return [False, False]
            if lca:
                return [False, False]

            left = dfs(node.left)
            right = dfs(node.right)
            res = [left[0] or right[0] or (node == p), left[1] or right[1] or (node == q)]
            if res[0] and res[1] and not lca:
                lca = node

            return res 

        dfs(root)
        return lca
```

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    private TreeNode lca = null;

    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        lca = null;
        dfs(root, p, q);
        return lca;
    }

    private boolean[] dfs(TreeNode node, TreeNode p, TreeNode q) {
        if (node == null || lca != null) {
            return new boolean[]{false, false};
        }
        boolean[] left = dfs(node.left, p, q);
        boolean[] right = dfs(node.right, p, q);
        boolean foundP = left[0] || right[0] || node == p;
        boolean foundQ = left[1] || right[1] || node == q;
        if (foundP && foundQ && lca == null) {
            lca = node;
        }
        return new boolean[]{foundP, foundQ};
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
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        lca = nullptr;
        dfs(root, p, q);
        return lca;
    }

private:
    TreeNode* lca;

    pair<bool,bool> dfs(TreeNode* node, TreeNode* p, TreeNode* q) {
        if (!node || lca) {
            return {false, false};
        }
        auto left = dfs(node->left, p, q);
        auto right = dfs(node->right, p, q);
        bool foundP = left.first || right.first || node == p;
        bool foundQ = left.second || right.second || node == q;
        if (foundP && foundQ && !lca) {
            lca = node;
        }
        return {foundP, foundQ};
    }
};
```

```javascript
/**
 * // Definition for a Node.
 * function Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {TreeNode}
     */
    lowestCommonAncestor(root, p, q) {
        let lca = null;
        const dfs = node => {
            if (!node || lca) return [false, false];
            const left = dfs(node.left);
            const right = dfs(node.right);
            const foundP = left[0] || right[0] || node === p;
            const foundQ = left[1] || right[1] || node === q;
            if (foundP && foundQ && !lca) {
                lca = node;
            }
            return [foundP, foundQ];
        };
        dfs(root);
        return lca;
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
 *     public TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    private TreeNode lca = null;

    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        lca = null;
        Dfs(root, p, q);
        return lca;
    }

    private (bool, bool) Dfs(TreeNode node, TreeNode p, TreeNode q) {
        if (node == null || lca != null) {
            return (false, false);
        }
        var left = Dfs(node.left, p, q);
        var right = Dfs(node.right, p, q);
        bool foundP = left.Item1 || right.Item1 || node == p;
        bool foundQ = left.Item2 || right.Item2 || node == q;
        if (foundP && foundQ && lca == null) {
            lca = node;
        }
        return (foundP, foundQ);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 2. Depth First Search (Optimal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(
        self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode'
    ) -> 'TreeNode':
        if root is None or root is p or root is q:
            return root

        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        if left and right:
            return root

        return left if left else right
```

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            return root;
        }
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) {
            return root;
        }
        return left != null ? left : right;
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
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) {
            return root;
        }
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left && right) {
            return root;
        }
        return left ? left : right;
    }
};
```

```javascript
/**
 * // Definition for a Node.
 * function Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {TreeNode}
     */
    lowestCommonAncestor(root, p, q) {
        if (!root || root === p || root === q) {
            return root;
        }
        const left = this.lowestCommonAncestor(root.left, p, q);
        const right = this.lowestCommonAncestor(root.right, p, q);
        return left && right ? root : (left || right);
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
 *     public TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            return root;
        }
        TreeNode left = LowestCommonAncestor(root.left, p, q);
        TreeNode right = LowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) {
            return root;
        }
        return left ?? right;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Breadth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(
        self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode'
    ) -> 'TreeNode':
        parent = {root: None}
        queue = deque([root])
        while p not in parent or q not in parent:
            node = queue.popleft()
            if node.left:
                parent[node.left] = node
                queue.append(node.left)
            if node.right:
                parent[node.right] = node
                queue.append(node.right)

        ancestors = set()
        while p:
            ancestors.add(p)
            p = parent[p]

        while q not in ancestors:
            q = parent[q]

        return q
```

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        Map<TreeNode, TreeNode> parent = new HashMap<>();
        Queue<TreeNode> queue = new LinkedList<>();
        parent.put(root, null);
        queue.add(root);
        while (!parent.containsKey(p) || !parent.containsKey(q)) {
            TreeNode node = queue.poll();
            if (node.left != null) {
                parent.put(node.left, node);
                queue.add(node.left);
            }
            if (node.right != null) {
                parent.put(node.right, node);
                queue.add(node.right);
            }
        }

        Set<TreeNode> ancestors = new HashSet<>();
        while (p != null) {
            ancestors.add(p);
            p = parent.get(p);
        }
        while (!ancestors.contains(q)) {
            q = parent.get(q);
        }
        return q;
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
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root) return nullptr;
        unordered_map<TreeNode*, TreeNode*> parent;
        queue<TreeNode*> queue;
        parent[root] = nullptr;
        queue.push(root);
        while (!parent.count(p) || !parent.count(q)) {
            TreeNode* node = queue.front(); queue.pop();
            if (node->left) {
                parent[node->left] = node;
                queue.push(node->left);
            }
            if (node->right) {
                parent[node->right] = node;
                queue.push(node->right);
            }
        }

        unordered_set<TreeNode*> ancestors;
        while (p) {
            ancestors.insert(p);
            p = parent[p];
        }
        while (!ancestors.count(q)) {
            q = parent[q];
        }
        return q;
    }
};
```

```javascript
/**
 * // Definition for a Node.
 * function Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {TreeNode}
     */
    lowestCommonAncestor(root, p, q) {
        if (!root) return null;
        const parent = new Map();
        const queue = new Queue([root]);
        parent.set(root, null);
        while (!parent.has(p) || !parent.has(q)) {
            const node = queue.pop();
            if (node.left) {
                parent.set(node.left, node);
                queue.push(node.left);
            }
            if (node.right) {
                parent.set(node.right, node);
                queue.push(node.right);
            }
        }

        const ancestors = new Set();
        while (p) {
            ancestors.add(p);
            p = parent.get(p);
        }
        while (!ancestors.has(q)) {
            q = parent.get(q);
        }
        return q;
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
 *     public TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        var parent = new Dictionary<TreeNode, TreeNode>();
        var queue = new Queue<TreeNode>();
        parent[root] = null;
        queue.Enqueue(root);
        while (!parent.ContainsKey(p) || !parent.ContainsKey(q)) {
            var node = queue.Dequeue();
            if (node.left != null) {
                parent[node.left] = node;
                queue.Enqueue(node.left);
            }
            if (node.right != null) {
                parent[node.right] = node;
                queue.Enqueue(node.right);
            }
        }

        var ancestors = new HashSet<TreeNode>();
        while (p != null) {
            ancestors.Add(p);
            p = parent[p];
        }
        while (!ancestors.Contains(q)) {
            q = parent[q];
        }
        return q;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$