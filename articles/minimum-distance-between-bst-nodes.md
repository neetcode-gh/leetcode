## 1. Brute Force (DFS)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def minDiffInBST(self, root: Optional[TreeNode]) -> int:
        def dfs(node):
            if not node:
                return float("inf")
            res = dfs1(root, node)
            res = min(res, dfs(node.left))
            res = min(res, dfs(node.right))
            return res

        def dfs1(root, node):
            if not root:
                return float("inf")

            res = float("inf")
            if root != node:
                res = abs(root.val - node.val)
            res = min(res, dfs1(root.left, node))
            res = min(res, dfs1(root.right, node))
            return res

        return dfs(root)
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
    public int minDiffInBST(TreeNode root) {
        return dfs(root, root);
    }

    private int dfs(TreeNode root, TreeNode node) {
        if (node == null) {
            return Integer.MAX_VALUE;
        }
        int res = dfs1(root, node);
        res = Math.min(res, dfs(root, node.left));
        res = Math.min(res, dfs(root, node.right));
        return res;
    }

    private int dfs1(TreeNode root, TreeNode node) {
        if (root == null) {
            return Integer.MAX_VALUE;
        }
        int res = Integer.MAX_VALUE;
        if (root != node) {
            res = Math.abs(root.val - node.val);
        }
        res = Math.min(res, dfs1(root.left, node));
        res = Math.min(res, dfs1(root.right, node));
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
    int minDiffInBST(TreeNode* root) {
        return dfs(root, root);
    }

private:
    int dfs(TreeNode* root, TreeNode* node) {
        if (!node) {
            return INT_MAX;
        }
        int res = dfs1(root, node);
        res = min(res, dfs(root, node->left));
        res = min(res, dfs(root, node->right));
        return res;
    }

    int dfs1(TreeNode* root, TreeNode* node) {
        if (!root) {
            return INT_MAX;
        }
        int res = INT_MAX;
        if (root != node) {
            res = abs(root->val - node->val);
        }
        res = min(res, dfs1(root->left, node));
        res = min(res, dfs1(root->right, node));
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
    minDiffInBST(root) {
        const dfs = (node) => {
            if (!node) {
                return Infinity;
            }
            let res = dfs1(root, node);
            res = Math.min(res, dfs(node.left));
            res = Math.min(res, dfs(node.right));
            return res;
        };

        const dfs1 = (root, node) => {
            if (!root) {
                return Infinity;
            }
            let res = Infinity;
            if (root !== node) {
                res = Math.abs(root.val - node.val);
            }
            res = Math.min(res, dfs1(root.left, node));
            res = Math.min(res, dfs1(root.right, node));
            return res;
        };

        return dfs(root);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Inorder Traversal

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def minDiffInBST(self, root: Optional[TreeNode]) -> int:
        arr = []

        def dfs(node):
            if not node:
                return
            dfs(node.left)
            arr.append(node.val)
            dfs(node.right)

        dfs(root)
        res = arr[1] - arr[0]
        for i in range(2, len(arr)):
            res = min(res, arr[i] - arr[i - 1])
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
    public int minDiffInBST(TreeNode root) {
        List<Integer> arr = new ArrayList<>();

        dfs(root, arr);
        int res = arr.get(1) - arr.get(0);
        for (int i = 2; i < arr.size(); i++) {
            res = Math.min(res, arr.get(i) - arr.get(i - 1));
        }
        return res;
    }

    private void dfs(TreeNode node, List<Integer> arr) {
        if (node == null) {
            return;
        }
        dfs(node.left, arr);
        arr.add(node.val);
        dfs(node.right, arr);
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
    int minDiffInBST(TreeNode* root) {
        vector<int> arr;
        dfs(root, arr);

        int res = arr[1] - arr[0];
        for (int i = 2; i < arr.size(); i++) {
            res = min(res, arr[i] - arr[i - 1]);
        }
        return res;
    }

private:
    void dfs(TreeNode* node, vector<int>& arr) {
        if (!node) return;
        dfs(node->left, arr);
        arr.push_back(node->val);
        dfs(node->right, arr);
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
    minDiffInBST(root) {
        const arr = [];

        const dfs = (node) => {
            if (!node) return;
            dfs(node.left);
            arr.push(node.val);
            dfs(node.right);
        };

        dfs(root);
        let res = arr[1] - arr[0];
        for (let i = 2; i < arr.length; i++) {
            res = Math.min(res, arr[i] - arr[i - 1]);
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

## 3. Inorder Traversal (Space Optimized)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def minDiffInBST(self, root: Optional[TreeNode]) -> int:
        prev, res = None, float("inf")

        def dfs(node):
            nonlocal prev, res
            if not node:
                return

            dfs(node.left)
            if prev:
                res = min(res, node.val - prev.val)
            prev = node
            dfs(node.right)

        dfs(root)
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
    private TreeNode prev = null;
    private int res = Integer.MAX_VALUE;

    public int minDiffInBST(TreeNode root) {
        dfs(root);
        return res;
    }

    private void dfs(TreeNode node) {
        if (node == null) return;

        dfs(node.left);
        if (prev != null) {
            res = Math.min(res, node.val - prev.val);
        }
        prev = node;
        dfs(node.right);
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
    int minDiffInBST(TreeNode* root) {
        TreeNode* prev = nullptr;
        int res = INT_MAX;

        dfs(root, prev, res);
        return res;
    }

private:
    void dfs(TreeNode* node, TreeNode*& prev, int& res) {
        if (!node) return;

        dfs(node->left, prev, res);
        if (prev) {
            res = min(res, node->val - prev->val);
        }
        prev = node;
        dfs(node->right, prev, res);
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
    minDiffInBST(root) {
        let prev = null;
        let res = Infinity;

        const dfs = (node) => {
            if (!node) return;

            dfs(node.left);
            if (prev !== null) {
                res = Math.min(res, node.val - prev.val);
            }
            prev = node;
            dfs(node.right);
        };

        dfs(root);
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 4. Iterative DFS (Inorder Traversal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def minDiffInBST(self, root: Optional[TreeNode]) -> int:
        stack, prev, res = [], None, float("inf")
        cur = root

        while stack or cur:
            while cur:
                stack.append(cur)
                cur = cur.left

            cur = stack.pop()
            if prev:
                res = min(res, cur.val - prev.val)
            prev = cur
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
    public int minDiffInBST(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode prev = null;
        int res = Integer.MAX_VALUE;
        TreeNode cur = root;

        while (!stack.isEmpty() || cur != null) {
            while (cur != null) {
                stack.push(cur);
                cur = cur.left;
            }

            cur = stack.pop();
            if (prev != null) {
                res = Math.min(res, cur.val - prev.val);
            }
            prev = cur;
            cur = cur.right;
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
    int minDiffInBST(TreeNode* root) {
        stack<TreeNode*> st;
        TreeNode* prev = nullptr;
        TreeNode* cur = root;
        int res = INT_MAX;

        while (!st.empty() || cur) {
            while (cur) {
                st.push(cur);
                cur = cur->left;
            }

            cur = st.top();
            st.pop();
            if (prev) {
                res = min(res, cur->val - prev->val);
            }
            prev = cur;
            cur = cur->right;
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
    minDiffInBST(root) {
        let stack = [];
        let prev = null;
        let res = Infinity;
        let cur = root;

        while (stack.length > 0 || cur !== null) {
            while (cur !== null) {
                stack.push(cur);
                cur = cur.left;
            }

            cur = stack.pop();
            if (prev !== null) {
                res = Math.min(res, cur.val - prev.val);
            }
            prev = cur;
            cur = cur.right;
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

## 5. Morris Traversal

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def minDiffInBST(self, root: Optional[TreeNode]) -> int:
        prevVal = res = float("inf")
        cur = root

        while cur:
            if not cur.left:
                if prevVal != float("inf"):
                    res = min(res, cur.val - prevVal)
                prevVal = cur.val
                cur = cur.right
            else:
                prev = cur.left
                while prev.right and prev.right != cur:
                    prev = prev.right

                if not prev.right:
                    prev.right = cur
                    cur = cur.left
                else:
                    prev.right = None
                    if prevVal != float("inf"):
                        res = min(res, cur.val - prevVal)
                    prevVal = cur.val
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
    public int minDiffInBST(TreeNode root) {
        int prevVal = Integer.MAX_VALUE, res = Integer.MAX_VALUE;
        TreeNode cur = root;

        while (cur != null) {
            if (cur.left == null) {
                if (prevVal != Integer.MAX_VALUE) {
                    res = Math.min(res, cur.val - prevVal);
                }
                prevVal = cur.val;
                cur = cur.right;
            } else {
                TreeNode prev = cur.left;
                while (prev.right != null && prev.right != cur) {
                    prev = prev.right;
                }

                if (prev.right == null) {
                    prev.right = cur;
                    cur = cur.left;
                } else {
                    prev.right = null;
                    if (prevVal != Integer.MAX_VALUE) {
                        res = Math.min(res, cur.val - prevVal);
                    }
                    prevVal = cur.val;
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
    int minDiffInBST(TreeNode* root) {
        int prevVal = INT_MAX, res = INT_MAX;
        TreeNode* cur = root;

        while (cur) {
            if (!cur->left) {
                if (prevVal != INT_MAX) {
                    res = min(res, cur->val - prevVal);
                }
                prevVal = cur->val;
                cur = cur->right;
            } else {
                TreeNode* prev = cur->left;
                while (prev->right && prev->right != cur) {
                    prev = prev->right;
                }

                if (!prev->right) {
                    prev->right = cur;
                    cur = cur->left;
                } else {
                    prev->right = nullptr;
                    if (prevVal != INT_MAX) {
                        res = min(res, cur->val - prevVal);
                    }
                    prevVal = cur->val;
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
    minDiffInBST(root) {
        let prevVal = Infinity,
            res = Infinity;
        let cur = root;

        while (cur !== null) {
            if (cur.left === null) {
                if (prevVal !== Infinity) {
                    res = Math.min(res, cur.val - prevVal);
                }
                prevVal = cur.val;
                cur = cur.right;
            } else {
                let prev = cur.left;
                while (prev.right !== null && prev.right !== cur) {
                    prev = prev.right;
                }

                if (prev.right === null) {
                    prev.right = cur;
                    cur = cur.left;
                } else {
                    prev.right = null;
                    if (prevVal !== Infinity) {
                        res = Math.min(res, cur.val - prevVal);
                    }
                    prevVal = cur.val;
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
