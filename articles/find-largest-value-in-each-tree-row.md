## 1. Breadth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        res = []
        q = deque([root])
        while q:
            row_max = q[0].val
            for _ in range(len(q)):
                node = q.popleft()
                row_max = max(row_max, node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            res.append(row_max)

        return res
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
    public List<Integer> largestValues(TreeNode root) {
        if (root == null) return new ArrayList<>();

        List<Integer> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);

        while (!q.isEmpty()) {
            int rowMax = q.peek().val;
            for (int i = q.size(); i > 0; i--) {
                TreeNode node = q.poll();
                rowMax = Math.max(rowMax, node.val);
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(rowMax);
        }

        return res;
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
    vector<int> largestValues(TreeNode* root) {
        if (!root) return {};

        vector<int> res;
        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            int rowMax = q.front()->val;
            for (int i = q.size(); i > 0; i--) {
                TreeNode* node = q.front(); q.pop();
                rowMax = max(rowMax, node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(rowMax);
        }

        return res;
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
     * @return {number[]}
     */
    largestValues(root) {
        if (!root) return [];

        const res = [];
        const q = new Queue([root]);

        while (!q.isEmpty()) {
            let rowMax = q.front().val;
            for (let i = q.size(); i > 0; i--) {
                const node = q.pop();
                rowMax = Math.max(rowMax, node.val);
                if (node.left) q.push(node.left);
                if (node.right) q.push(node.right);
            }
            res.push(rowMax);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Depth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        res = []
        def dfs(node, level):
            if not node:
                return
            if level == len(res):
                res.append(node.val)
            else:
                res[level] = max(res[level], node.val)

            dfs(node.left, level + 1)
            dfs(node.right, level + 1)

        dfs(root, 0)
        return res
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
    public List<Integer> largestValues(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, 0, res);
        return res;
    }

    private void dfs(TreeNode node, int level, List<Integer> res) {
        if (node == null) return;
        if (level == res.size()) {
            res.add(node.val);
        } else {
            res.set(level, Math.max(res.get(level), node.val));
        }

        dfs(node.left, level + 1, res);
        dfs(node.right, level + 1, res);
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
    vector<int> largestValues(TreeNode* root) {
        vector<int> res;
        dfs(root, 0, res);
        return res;
    }

private:
    void dfs(TreeNode* node, int level, vector<int>& res) {
        if (!node) return;
        if (level == res.size()) {
            res.push_back(node->val);
        } else {
            res[level] = max(res[level], node->val);
        }

        dfs(node->left, level + 1, res);
        dfs(node->right, level + 1, res);
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
     * @return {number[]}
     */
    largestValues(root) {
        if (!root) return [];

        const res = [];
        const dfs = (node, level) => {
            if (!node) return;
            if (level === res.length) {
                res.push(node.val);
            } else {
                res[level] = Math.max(res[level], node.val);
            }
            dfs(node.left, level + 1);
            dfs(node.right, level + 1);
        };

        dfs(root, 0);
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

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
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        res = []
        stack = [(root, 0)]
        while stack:
            node, level = stack.pop()
            if level == len(res):
                res.append(node.val)
            else:
                res[level] = max(res[level], node.val)

            if node.right:
                stack.append((node.right, level + 1))
            if node.left:
                stack.append((node.left, level + 1))

        return res
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
    public List<Integer> largestValues(TreeNode root) {
        if (root == null) return new ArrayList<>();

        List<Integer> res = new ArrayList<>();
        Stack<Pair<TreeNode, Integer>> stack = new Stack<>();
        stack.push(new Pair<>(root, 0));
        while (!stack.isEmpty()) {
            Pair<TreeNode, Integer> p = stack.pop();
            TreeNode node = p.getKey();
            int level = p.getValue();
            if (level == res.size()) {
                res.add(node.val);
            } else {
                res.set(level, Math.max(res.get(level), node.val));
            }

            if (node.right != null) stack.push(new Pair<>(node.right, level + 1));
            if (node.left != null) stack.push(new Pair<>(node.left, level + 1));
        }

        return res;
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
    vector<int> largestValues(TreeNode* root) {
        if (!root) return {};

        vector<int> res;
        stack<pair<TreeNode*, int>> stk;
        stk.push({root, 0});
        while (!stk.empty()) {
            auto [node, level] = stk.top();stk.pop();
            if (level == res.size()) {
                res.push_back(node->val);
            } else {
                res[level] = max(res[level], node->val);
            }

            if (node->right) stk.push({node->right, level + 1});
            if (node->left) stk.push({node->left, level + 1});
        }

        return res;
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
     * @return {number[]}
     */
    largestValues(root) {
        if (!root) return [];

        const res = [];
        const stack = [[root, 0]];
        while (stack.length) {
            const [node, level] = stack.pop();
            if (level === res.length) {
                res.push(node.val);
            } else {
                res[level] = Math.max(res[level], node.val);
            }

            if (node.right) stack.push([node.right, level + 1]);
            if (node.left) stack.push([node.left, level + 1]);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
