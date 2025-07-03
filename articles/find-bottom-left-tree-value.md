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
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        q = deque([root])

        while q:
            node = q.popleft()
            if node.right:
                q.append(node.right)
            if node.left:
                q.append(node.left)

        return node.val
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
    public int findBottomLeftValue(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        TreeNode node = null;

        while (!q.isEmpty()) {
            node = q.poll();
            if (node.right != null) q.offer(node.right);
            if (node.left != null) q.offer(node.left);
        }
        return node.val;
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
    int findBottomLeftValue(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        TreeNode* node = nullptr;

        while (!q.empty()) {
            node = q.front();
            q.pop();
            if (node->right) q.push(node->right);
            if (node->left) q.push(node->left);
        }
        return node->val;
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
     * @return {number}
     */
    findBottomLeftValue(root) {
        const q = new Queue([root]);
        let node = null;

        while (!q.isEmpty()) {
            node = q.pop();
            if (node.right) q.push(node.right);
            if (node.left) q.push(node.left);
        }
        return node.val;
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
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        self.maxDepth, self.res = -1, root.val

        def dfs(node, depth):
            if not node:
                return
            if depth > self.maxDepth:
                self.maxDepth, self.res = depth, node.val

            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)

        dfs(root, 0)
        return self.res
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
    private int maxDepth = -1;
    private int res;

    public int findBottomLeftValue(TreeNode root) {
        res = root.val;
        dfs(root, 0);
        return res;
    }

    private void dfs(TreeNode node, int depth) {
        if (node == null) return;
        if (depth > maxDepth) {
            maxDepth = depth;
            res = node.val;
        }

        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
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
    int maxDepth = -1, res;

    int findBottomLeftValue(TreeNode* root) {
        res = root->val;
        dfs(root, 0);
        return res;
    }

private:
    void dfs(TreeNode* node, int depth) {
        if (!node) return;
        if (depth > maxDepth) {
            maxDepth = depth;
            res = node->val;
        }

        dfs(node->left, depth + 1);
        dfs(node->right, depth + 1);
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
     * @return {number}
     */
    findBottomLeftValue(root) {
        let maxDepth = -1,
            res = root.val;

        const dfs = (node, depth) => {
            if (!node) return;
            if (depth > maxDepth) {
                maxDepth = depth;
                res = node.val;
            }

            dfs(node.left, depth + 1);
            dfs(node.right, depth + 1);
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
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        res, maxDepth = root.val, -1
        stack = [(root, 0)]

        while stack:
            node, depth = stack.pop()
            if depth > maxDepth:
                maxDepth = depth
                res = node.val

            if node.right:
                stack.append((node.right, depth + 1))
            if node.left:
                stack.append((node.left, depth + 1))

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
    public int findBottomLeftValue(TreeNode root) {
        int res = root.val, maxDepth = -1;
        Stack<Pair<TreeNode, Integer>> stack = new Stack<>();
        stack.push(new Pair<>(root, 0));

        while (!stack.isEmpty()) {
            Pair<TreeNode, Integer> p = stack.pop();
            TreeNode node = p.getKey();
            int depth = p.getValue();
            if (depth > maxDepth) {
                maxDepth = depth;
                res = node.val;
            }

            if (node.right != null) {
                stack.push(new Pair<>(node.right, depth + 1));
            }
            if (node.left != null) {
                stack.push(new Pair<>(node.left, depth + 1));
            }
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
    int findBottomLeftValue(TreeNode* root) {
        int res = root->val, maxDepth = -1;
        stack<pair<TreeNode*, int>> stack;
        stack.push({root, 0});

        while (!stack.empty()) {
            auto [node, depth] = stack.top();stack.pop();
            if (depth > maxDepth) {
                maxDepth = depth;
                res = node->val;
            }

            if (node->right) {
                stack.push({node->right, depth + 1});
            }
            if (node->left) {
                stack.push({node->left, depth + 1});
            }
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
     * @return {number}
     */
    findBottomLeftValue(root) {
        let res = root.val,
            maxDepth = -1;
        const stack = [[root, 0]];

        while (stack.length) {
            const [node, depth] = stack.pop();
            if (depth > maxDepth) {
                maxDepth = depth;
                res = node.val;
            }

            if (node.right) stack.push([node.right, depth + 1]);
            if (node.left) stack.push([node.left, depth + 1]);
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

## 4. Morris Traversal

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        res, maxDepth, curDepth = root.val, -1, 0
        cur = root

        while cur:
            if not cur.left:
                if curDepth > maxDepth:
                    maxDepth, res = curDepth, cur.val
                cur = cur.right
                curDepth += 1
            else:
                prev = cur.left
                steps = 1
                while prev.right and prev.right != cur:
                    prev = prev.right
                    steps += 1

                if not prev.right:
                    prev.right = cur
                    cur = cur.left
                    curDepth += 1
                else:
                    prev.right = None
                    curDepth -= steps
                    cur = cur.right

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
    public int findBottomLeftValue(TreeNode root) {
        int res = root.val, maxDepth = -1, curDepth = 0;
        TreeNode cur = root;

        while (cur != null) {
            if (cur.left == null) {
                if (curDepth > maxDepth) {
                    maxDepth = curDepth;
                    res = cur.val;
                }
                cur = cur.right;
                curDepth++;
            } else {
                TreeNode prev = cur.left;
                int steps = 1;
                while (prev.right != null && prev.right != cur) {
                    prev = prev.right;
                    steps++;
                }

                if (prev.right == null) {
                    prev.right = cur;
                    cur = cur.left;
                    curDepth++;
                } else {
                    prev.right = null;
                    curDepth -= steps;
                    cur = cur.right;
                }
            }
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
    int findBottomLeftValue(TreeNode* root) {
        int res = root->val, maxDepth = -1, curDepth = 0;
        TreeNode* cur = root;

        while (cur) {
            if (!cur->left) {
                if (curDepth > maxDepth) {
                    maxDepth = curDepth;
                    res = cur->val;
                }
                cur = cur->right;
                curDepth++;
            } else {
                TreeNode* prev = cur->left;
                int steps = 1;
                while (prev->right && prev->right != cur) {
                    prev = prev->right;
                    steps++;
                }

                if (!prev->right) {
                    prev->right = cur;
                    cur = cur->left;
                    curDepth++;
                } else {
                    prev->right = nullptr;
                    curDepth -= steps;
                    cur = cur->right;
                }
            }
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
     * @return {number}
     */
    findBottomLeftValue(root) {
        let res = root.val,
            maxDepth = -1,
            curDepth = 0;
        let cur = root;

        while (cur) {
            if (!cur.left) {
                if (curDepth > maxDepth) {
                    maxDepth = curDepth;
                    res = cur.val;
                }
                cur = cur.right;
                curDepth++;
            } else {
                let prev = cur.left,
                    steps = 1;
                while (prev.right && prev.right !== cur) {
                    prev = prev.right;
                    steps++;
                }

                if (!prev.right) {
                    prev.right = cur;
                    cur = cur.left;
                    curDepth++;
                } else {
                    prev.right = null;
                    curDepth -= steps;
                    cur = cur.right;
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
