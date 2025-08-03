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
    def smallestFromLeaf(self, root: Optional[TreeNode]) -> str:
        def dfs(root, cur):
            if not root:
                return

            cur = chr(ord('a') + root.val) + cur
            if root.left and root.right:
                return min(
                    dfs(root.left, cur),
                    dfs(root.right, cur)
                )

            if root.right:
                return dfs(root.right, cur)
            if root.left:
                return dfs(root.left, cur)
            return cur

        return dfs(root, "")
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
    public String smallestFromLeaf(TreeNode root) {
        return dfs(root, "");
    }

    private String dfs(TreeNode root, String cur) {
        if (root == null) {
            return null;
        }

        cur = (char) ('a' + root.val) + cur;
        if (root.left != null && root.right != null) {
            return min(dfs(root.left, cur), dfs(root.right, cur));
        }

        if (root.right != null) {
            return dfs(root.right, cur);
        }
        if (root.left != null) {
            return dfs(root.left, cur);
        }
        return cur;
    }

    private String min(String a, String b) {
        if (a == null) return b;
        if (b == null) return a;
        return a.compareTo(b) < 0 ? a : b;
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
    string smallestFromLeaf(TreeNode* root) {
        return dfs(root, "");
    }

private:
    string dfs(TreeNode* root, string cur) {
        if (!root) return "";

        cur = char('a' + root->val) + cur;
        if (root->left && root->right) {
            return min(dfs(root->left, cur), dfs(root->right, cur));
        }

        if (root->right) return dfs(root->right, cur);
        if (root->left) return dfs(root->left, cur);
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
    smallestFromLeaf(root) {
        const min = (a, b) => {
            if (!a) return b;
            if (!b) return a;
            return a < b ? a : b;
        };

        const dfs = (node, cur) => {
            if (!node) return;

            cur = String.fromCharCode(97 + node.val) + cur;

            if (node.left && node.right) {
                return min(dfs(node.left, cur), dfs(node.right, cur));
            }
            if (node.left) return dfs(node.left, cur);
            if (node.right) return dfs(node.right, cur);
            return cur;
        };

        return dfs(root, '');
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

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
    def smallestFromLeaf(self, root: Optional[TreeNode]) -> str:
        q = deque([(root, "")])
        res = None

        while q:
            node, cur = q.popleft()
            cur = chr(ord('a') + node.val) + cur

            if not node.left and not node.right:
                res = min(res, cur) if res else cur

            if node.left:
                q.append((node.left, cur))
            if node.right:
                q.append((node.right, cur))

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
    public String smallestFromLeaf(TreeNode root) {
        Queue<Pair<TreeNode, String>> q = new LinkedList<>();
        q.offer(new Pair<>(root, ""));
        String res = null;

        while (!q.isEmpty()) {
            Pair<TreeNode, String> pair = q.poll();
            TreeNode node = pair.getKey();
            String cur = (char) ('a' + node.val) + pair.getValue();

            if (node.left == null && node.right == null) {
                if (res == null || cur.compareTo(res) < 0) {
                    res = cur;
                }
            }

            if (node.left != null) q.offer(new Pair<>(node.left, cur));
            if (node.right != null) q.offer(new Pair<>(node.right, cur));
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
    string smallestFromLeaf(TreeNode* root) {
        queue<pair<TreeNode*, string>> q;
        q.push({root, ""});
        string res;

        while (!q.empty()) {
            auto [node, cur] = q.front();
            q.pop();
            cur = char('a' + node->val) + cur;

            if (!node->left && !node->right) {
                if (res.empty() || cur < res) {
                    res = cur;
                }
            }

            if (node->left) q.push({node->left, cur});
            if (node->right) q.push({node->right, cur});
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
     * @return {string}
     */
    smallestFromLeaf(root) {
        const q = new Queue();
        q.push([root, '']);
        let res = null;

        while (!q.isEmpty()) {
            const [node, cur] = q.pop();
            const newCur = String.fromCharCode(97 + node.val) + cur;

            if (!node.left && !node.right) {
                res = res === null || newCur < res ? newCur : res;
            }

            if (node.left) q.push([node.left, newCur]);
            if (node.right) q.push([node.right, newCur]);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

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
    def smallestFromLeaf(self, root: Optional[TreeNode]) -> str:
        stack = [(root, "")]
        res = None

        while stack:
            node, cur = stack.pop()
            cur = chr(ord('a') + node.val) + cur

            if not node.left and not node.right:
                res = min(res, cur) if res else cur

            if node.right:
                stack.append((node.right, cur))
            if node.left:
                stack.append((node.left, cur))

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
    public String smallestFromLeaf(TreeNode root) {
        Stack<Pair<TreeNode, String>> stack = new Stack<>();
        stack.push(new Pair<>(root, ""));
        String res = null;

        while (!stack.isEmpty()) {
            Pair<TreeNode, String> pair = stack.pop();
            TreeNode node = pair.getKey();
            String cur = (char) ('a' + node.val) + pair.getValue();

            if (node.left == null && node.right == null) {
                if (res == null || cur.compareTo(res) < 0) {
                    res = cur;
                }
            }

            if (node.right != null) stack.push(new Pair<>(node.right, cur));
            if (node.left != null) stack.push(new Pair<>(node.left, cur));
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
    string smallestFromLeaf(TreeNode* root) {
        stack<pair<TreeNode*, string>> stk;
        stk.push({root, ""});
        string res;

        while (!stk.empty()) {
            auto [node, cur] = stk.top();stk.pop();
            cur = char('a' + node->val) + cur;

            if (!node->left && !node->right) {
                if (res.empty() || cur < res) {
                    res = cur;
                }
            }

            if (node->right) stk.push({node->right, cur});
            if (node->left) stk.push({node->left, cur});
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
     * @return {string}
     */
    smallestFromLeaf(root) {
        const stack = [[root, '']];
        let res = null;

        while (stack.length) {
            const [node, cur] = stack.pop();
            const newCur = String.fromCharCode(97 + node.val) + cur;

            if (!node.left && !node.right) {
                res = res === null || newCur < res ? newCur : res;
            }

            if (node.right) stack.push([node.right, newCur]);
            if (node.left) stack.push([node.left, newCur]);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$
