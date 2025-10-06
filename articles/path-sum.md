## 1. Depth First Search - I

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        def dfs(node, curSum):
            if not node:
                return False

            curSum += node.val
            if not node.left and not node.right:
                return curSum == targetSum

            return dfs(node.left, curSum) or dfs(node.right, curSum)

        return dfs(root, 0)
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
    public boolean hasPathSum(TreeNode root, int targetSum) {
        return dfs(root, 0, targetSum);
    }

    private boolean dfs(TreeNode node, int curSum, int targetSum) {
        if (node == null) return false;

        curSum += node.val;
        if (node.left == null && node.right == null) {
            return curSum == targetSum;
        }

        return dfs(node.left, curSum, targetSum) || dfs(node.right, curSum, targetSum);
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
    bool hasPathSum(TreeNode* root, int targetSum) {
        return dfs(root, 0, targetSum);
    }

private:
    bool dfs(TreeNode* node, int curSum, int targetSum) {
        if (node == nullptr) return false;

        curSum += node->val;
        if (node->left == nullptr && node->right == nullptr) {
            return curSum == targetSum;
        }

        return dfs(node->left, curSum, targetSum) || dfs(node->right, curSum, targetSum);
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
     * @param {number} targetSum
     * @return {boolean}
     */
    hasPathSum(root, targetSum) {
        const dfs = (node, curSum) => {
            if (!node) return false;

            curSum += node.val;
            if (!node.left && !node.right) {
                return curSum === targetSum;
            }

            return dfs(node.left, curSum) || dfs(node.right, curSum);
        };

        return dfs(root, 0);
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
    public bool HasPathSum(TreeNode root, int targetSum) {
        bool Dfs(TreeNode node, int curSum) {
            if (node == null) return false;

            curSum += node.val;
            if (node.left == null && node.right == null) {
                return curSum == targetSum;
            }

            return Dfs(node.left, curSum) || Dfs(node.right, curSum);
        }

        return Dfs(root, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Depth First Search - II

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if not root:
            return False

        targetSum -= root.val
        return (self.hasPathSum(root.left, targetSum) or
                self.hasPathSum(root.right, targetSum) or
                (not targetSum and not root.left and not root.right))
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
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        targetSum -= root.val;
        return hasPathSum(root.left, targetSum) ||
               hasPathSum(root.right, targetSum) ||
               (targetSum == 0 && root.left == null && root.right == null);
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
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        targetSum -= root->val;
        return hasPathSum(root->left, targetSum) ||
               hasPathSum(root->right, targetSum) ||
               (targetSum == 0 && !root->left && !root->right);
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
     * @param {number} targetSum
     * @return {boolean}
     */
    hasPathSum(root, targetSum) {
        if (!root) return false;
        targetSum -= root.val;
        return (
            this.hasPathSum(root.left, targetSum) ||
            this.hasPathSum(root.right, targetSum) ||
            (targetSum === 0 && !root.left && !root.right)
        );
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
    public bool HasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;

        targetSum -= root.val;
        return HasPathSum(root.left, targetSum) ||
               HasPathSum(root.right, targetSum) ||
               (targetSum == 0 && root.left == null && root.right == null);
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
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if not root:
            return False

        stack = [(root, targetSum - root.val)]
        while stack:
            node, curr_sum = stack.pop()
            if not node.left and not node.right and curr_sum == 0:
                return True
            if node.right:
                stack.append((node.right, curr_sum - node.right.val))
            if node.left:
                stack.append((node.left, curr_sum - node.left.val))
        return False
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
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;

        Stack<TreeNode> stack = new Stack<>();
        Stack<Integer> sumStack = new Stack<>();
        stack.push(root);
        sumStack.push(targetSum - root.val);

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            int currSum = sumStack.pop();

            if (node.left == null && node.right == null && currSum == 0) {
                return true;
            }

            if (node.right != null) {
                stack.push(node.right);
                sumStack.push(currSum - node.right.val);
            }

            if (node.left != null) {
                stack.push(node.left);
                sumStack.push(currSum - node.left.val);
            }
        }

        return false;
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
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;

        stack<pair<TreeNode*, int>> s;
        s.push({root, targetSum - root->val});

        while (!s.empty()) {
            auto [node, currSum] = s.top();
            s.pop();

            if (!node->left && !node->right && currSum == 0) {
                return true;
            }

            if (node->right) {
                s.push({node->right, currSum - node->right->val});
            }

            if (node->left) {
                s.push({node->left, currSum - node->left->val});
            }
        }

        return false;
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
     * @param {number} targetSum
     * @return {boolean}
     */
    hasPathSum(root, targetSum) {
        if (!root) return false;

        const stack = [[root, targetSum - root.val]];
        while (stack.length) {
            const [node, currSum] = stack.pop();

            if (!node.left && !node.right && currSum === 0) {
                return true;
            }

            if (node.right) {
                stack.push([node.right, currSum - node.right.val]);
            }

            if (node.left) {
                stack.push([node.left, currSum - node.left.val]);
            }
        }

        return false;
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
    public bool HasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;

        Stack<(TreeNode, int)> stack = new Stack<(TreeNode, int)>();
        stack.Push((root, targetSum - root.val));

        while (stack.Count > 0) {
            var (node, currSum) = stack.Pop();

            if (node.left == null && node.right == null && currSum == 0) {
                return true;
            }

            if (node.right != null) {
                stack.Push((node.right, currSum - node.right.val));
            }
            if (node.left != null) {
                stack.Push((node.left, currSum - node.left.val));
            }
        }

        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Breadth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if not root:
            return False

        queue = deque([(root, targetSum - root.val)])
        while queue:
            node, curr_sum = queue.popleft()
            if not node.left and not node.right and curr_sum == 0:
                return True
            if node.left:
                queue.append((node.left, curr_sum - node.left.val))
            if node.right:
                queue.append((node.right, curr_sum - node.right.val))
        return False
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
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;

        Queue<TreeNode> nodeQueue = new LinkedList<>();
        Queue<Integer> sumQueue = new LinkedList<>();
        nodeQueue.add(root);
        sumQueue.add(targetSum - root.val);

        while (!nodeQueue.isEmpty()) {
            TreeNode node = nodeQueue.poll();
            int currSum = sumQueue.poll();

            if (node.left == null && node.right == null && currSum == 0) {
                return true;
            }

            if (node.left != null) {
                nodeQueue.add(node.left);
                sumQueue.add(currSum - node.left.val);
            }

            if (node.right != null) {
                nodeQueue.add(node.right);
                sumQueue.add(currSum - node.right.val);
            }
        }

        return false;
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
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;

        queue<pair<TreeNode*, int>> q;
        q.push({root, targetSum - root->val});

        while (!q.empty()) {
            auto [node, currSum] = q.front();
            q.pop();

            if (!node->left && !node->right && currSum == 0) {
                return true;
            }

            if (node->left) {
                q.push({node->left, currSum - node->left->val});
            }

            if (node->right) {
                q.push({node->right, currSum - node->right->val});
            }
        }

        return false;
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
     * @param {number} targetSum
     * @return {boolean}
     */
    hasPathSum(root, targetSum) {
        if (!root) return false;

        const queue = new Queue([[root, targetSum - root.val]]);
        while (!queue.isEmpty()) {
            const [node, currSum] = queue.pop();

            if (!node.left && !node.right && currSum === 0) {
                return true;
            }

            if (node.left) {
                queue.push([node.left, currSum - node.left.val]);
            }

            if (node.right) {
                queue.push([node.right, currSum - node.right.val]);
            }
        }

        return false;
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
    public bool HasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;

        Queue<(TreeNode, int)> queue = new Queue<(TreeNode, int)>();
        queue.Enqueue((root, targetSum - root.val));

        while (queue.Count > 0) {
            var (node, currSum) = queue.Dequeue();

            if (node.left == null && node.right == null && currSum == 0) {
                return true;
            }

            if (node.left != null) {
                queue.Enqueue((node.left, currSum - node.left.val));
            }
            if (node.right != null) {
                queue.Enqueue((node.right, currSum - node.right.val));
            }
        }

        return false;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
