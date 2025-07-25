## 1. Recursion

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rob(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        res = root.val
        if root.left:
            res += self.rob(root.left.left) + self.rob(root.left.right)
        if root.right:
            res += self.rob(root.right.left) + self.rob(root.right.right)

        res = max(res, self.rob(root.left) + self.rob(root.right))
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
    public int rob(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int res = root.val;
        if (root.left != null) {
            res += rob(root.left.left) + rob(root.left.right);
        }
        if (root.right != null) {
            res += rob(root.right.left) + rob(root.right.right);
        }

        res = Math.max(res, rob(root.left) + rob(root.right));
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
    int rob(TreeNode* root) {
        if (!root) {
            return 0;
        }

        int res = root->val;
        if (root->left) {
            res += rob(root->left->left) + rob(root->left->right);
        }
        if (root->right) {
            res += rob(root->right->left) + rob(root->right->right);
        }

        res = max(res, rob(root->left) + rob(root->right));
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
    rob(root) {
        if (!root) {
            return 0;
        }

        let res = root.val;
        if (root.left) {
            res += this.rob(root.left.left) + this.rob(root.left.right);
        }
        if (root.right) {
            res += this.rob(root.right.left) + this.rob(root.right.right);
        }

        res = Math.max(res, this.rob(root.left) + this.rob(root.right));
        return res;
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
    public int Rob(TreeNode root) {
        if (root == null) return 0;

        int res = root.val;
        if (root.left != null) {
            res += Rob(root.left.left) + Rob(root.left.right);
        }
        if (root.right != null) {
            res += Rob(root.right.left) + Rob(root.right.right);
        }

        res = Math.Max(res, Rob(root.left) + Rob(root.right));
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Memoization)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rob(self, root: Optional[TreeNode]) -> int:
        cache = { None : 0 }

        def dfs(root):
            if root in cache:
                return cache[root]

            cache[root] = root.val
            if root.left:
                cache[root] += dfs(root.left.left) + dfs(root.left.right)
            if root.right:
                cache[root] += dfs(root.right.left) + dfs(root.right.right)

            cache[root] = max(cache[root], dfs(root.left) + dfs(root.right))
            return cache[root]

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
    private Map<TreeNode, Integer> cache;

    public int rob(TreeNode root) {
        cache = new HashMap<>();
        cache.put(null, 0);
        return dfs(root);
    }

    private int dfs(TreeNode root) {
        if (cache.containsKey(root)) {
            return cache.get(root);
        }

        int res = root.val;
        if (root.left != null) {
            res += dfs(root.left.left) + dfs(root.left.right);
        }
        if (root.right != null) {
            res += dfs(root.right.left) + dfs(root.right.right);
        }

        res = Math.max(res, dfs(root.left) + dfs(root.right));
        cache.put(root, res);
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
    unordered_map<TreeNode*, int> cache;

public:
    int rob(TreeNode* root) {
        cache[nullptr] = 0;
        return dfs(root);
    }

private:
    int dfs(TreeNode* root) {
        if (cache.find(root) != cache.end()) {
            return cache[root];
        }

        int res = root->val;
        if (root->left) {
            res += rob(root->left->left) + rob(root->left->right);
        }
        if (root->right) {
            res += rob(root->right->left) + rob(root->right->right);
        }

        res = max(res, rob(root->left) + rob(root->right));
        cache[root] = res;
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
    rob(root) {
        const cache = new Map();
        cache.set(null, 0);

        const dfs = (root) => {
            if (cache.has(root)) {
                return cache.get(root);
            }

            let res = root.val;
            if (root.left) {
                res += dfs(root.left.left) + dfs(root.left.right);
            }
            if (root.right) {
                res += dfs(root.right.left) + dfs(root.right.right);
            }

            res = Math.max(res, dfs(root.left) + dfs(root.right));
            cache.set(root, res);
            return res;
        };

        return dfs(root);
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
    private Dictionary<TreeNode, int> cache = new();

    public int Rob(TreeNode root) {
        return Dfs(root);
    }

    private int Dfs(TreeNode root) {
        if (root == null) return 0;
        if (cache.ContainsKey(root)) return cache[root];

        int res = root.val;
        if (root.left != null) {
            res += Dfs(root.left.left) + Dfs(root.left.right);
        }
        if (root.right != null) {
            res += Dfs(root.right.left) + Dfs(root.right.right);
        }

        res = Math.Max(res, Dfs(root.left) + Dfs(root.right));
        cache[root] = res;
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Optimal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rob(self, root: TreeNode) -> int:
        def dfs(root):
            if not root:
                return [0, 0]

            leftPair = dfs(root.left)
            rightPair = dfs(root.right)

            withRoot = root.val + leftPair[1] + rightPair[1]
            withoutRoot = max(leftPair) + max(rightPair)

            return [withRoot, withoutRoot]

        return max(dfs(root))
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
    public int rob(TreeNode root) {
        int[] result = dfs(root);
        return Math.max(result[0], result[1]);
    }

    private int[] dfs(TreeNode root) {
        if (root == null) {
            return new int[]{0, 0};
        }

        int[] leftPair = dfs(root.left);
        int[] rightPair = dfs(root.right);

        int withRoot = root.val + leftPair[1] + rightPair[1];
        int withoutRoot = Math.max(leftPair[0], leftPair[1]) +
                          Math.max(rightPair[0], rightPair[1]);

        return new int[]{withRoot, withoutRoot};
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
    int rob(TreeNode* root) {
        auto result = dfs(root);
        return max(result.first, result.second);
    }

private:
    pair<int, int> dfs(TreeNode* root) {
        if (!root) {
            return {0, 0};
        }

        auto leftPair = dfs(root->left);
        auto rightPair = dfs(root->right);

        int withRoot = root->val + leftPair.second + rightPair.second;
        int withoutRoot = max(leftPair.first, leftPair.second) +
                          max(rightPair.first, rightPair.second);

        return {withRoot, withoutRoot};
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
    rob(root) {
        const dfs = (node) => {
            if (!node) {
                return [0, 0];
            }

            const leftPair = dfs(node.left);
            const rightPair = dfs(node.right);

            const withRoot = node.val + leftPair[1] + rightPair[1];
            const withoutRoot = Math.max(...leftPair) + Math.max(...rightPair);

            return [withRoot, withoutRoot];
        };

        const result = dfs(root);
        return Math.max(...result);
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
    public int Rob(TreeNode root) {
        var result = Dfs(root);
        return Math.Max(result.withRoot, result.withoutRoot);
    }

    private (int withRoot, int withoutRoot) Dfs(TreeNode root) {
        if (root == null) return (0, 0);

        var left = Dfs(root.left);
        var right = Dfs(root.right);

        int withRoot = root.val + left.withoutRoot + right.withoutRoot;
        int withoutRoot = Math.Max(left.withRoot, left.withoutRoot) + Math.Max(right.withRoot, right.withoutRoot);

        return (withRoot, withoutRoot);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.
