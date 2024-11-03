## 1. Brute Force

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        
        leftHeight = self.maxHeight(root.left)
        rightHeight = self.maxHeight(root.right)
        diameter = leftHeight + rightHeight 
        sub = max(self.diameterOfBinaryTree(root.left),
                  self.diameterOfBinaryTree(root.right))
        return max(diameter, sub)


    def maxHeight(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        return 1 + max(self.maxHeight(root.left), self.maxHeight(root.right))
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
    public int diameterOfBinaryTree(TreeNode root) {
        if (root == null) {
            return 0;
        }
        
        int leftHeight = maxHeight(root.left);
        int rightHeight = maxHeight(root.right);
        int diameter = leftHeight + rightHeight;
        int sub = Math.max(diameterOfBinaryTree(root.left),
                           diameterOfBinaryTree(root.right));
        return Math.max(diameter, sub);
    }

    public int maxHeight(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return 1 + Math.max(maxHeight(root.left), maxHeight(root.right));
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
    int diameterOfBinaryTree(TreeNode* root) {
        if (!root) return 0;
        
        int leftHeight = maxHeight(root->left);
        int rightHeight = maxHeight(root->right);
        int diameter = leftHeight + rightHeight;
        int sub = max(diameterOfBinaryTree(root->left),
                      diameterOfBinaryTree(root->right));
        return max(diameter, sub);
    }

    int maxHeight(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxHeight(root->left), maxHeight(root->right));
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
    diameterOfBinaryTree(root) {
        if (!root) return 0;
        
        let leftHeight = this.maxHeight(root.left);
        let rightHeight = this.maxHeight(root.right);
        let diameter = leftHeight + rightHeight;
        let sub = Math.max(this.diameterOfBinaryTree(root.left), 
                           this.diameterOfBinaryTree(root.right));
        return Math.max(diameter, sub);
    }

    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxHeight(root) {
        if (!root) return 0;
        return 1 + Math.max(this.maxHeight(root.left), this.maxHeight(root.right));
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
    public int DiameterOfBinaryTree(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int leftHeight = MaxHeight(root.left);
        int rightHeight = MaxHeight(root.right);
        int diameter = leftHeight + rightHeight;
        int sub = Math.Max(DiameterOfBinaryTree(root.left), 
                           DiameterOfBinaryTree(root.right));
        return Math.Max(diameter, sub);
    }

    public int MaxHeight(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return 1 + Math.Max(MaxHeight(root.left), MaxHeight(root.right));
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

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
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        res = 0

        def dfs(root):
            nonlocal res

            if not root:
                return 0
            left = dfs(root.left)
            right = dfs(root.right)
            res = max(res, left + right)

            return 1 + max(left, right)

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

class Solution {
    
    public int diameterOfBinaryTree(TreeNode root) {
        int[] res = new int[1];
        dfs(root, res);
        return res[0];
    }

    private int dfs(TreeNode root, int[] res) {
        if (root == null) {
            return 0;
        }
        int left = dfs(root.left, res);
        int right = dfs(root.right, res);
        res[0] = Math.max(res[0], left + right);
        return 1 + Math.max(left, right);
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
    int diameterOfBinaryTree(TreeNode* root) {
        int res = 0;
        dfs(root, res);
        return res;
    }

private:
    int dfs(TreeNode* root, int& res) {
        if (!root) {
            return 0;
        }
        int left = dfs(root->left, res);
        int right = dfs(root->right, res);
        res = max(res, left + right);
        return 1 + max(left, right);
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
    diameterOfBinaryTree(root) {
        const res = [0];
        this.dfs(root, res);
        return res[0];
    }

    /**
     * @param {TreeNode} root
     * @param {number[]} res
     * @return {number}
     */
    dfs(root, res) {
        if (root === null) {
            return 0;
        }
        const left = this.dfs(root.left, res);
        const right = this.dfs(root.right, res);
        res[0] = Math.max(res[0], left + right);
        return 1 + Math.max(left, right);
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
    
    public int DiameterOfBinaryTree(TreeNode root) {
        int res = 0;
        DFS(root, ref res);
        return res;
    }

    private int DFS(TreeNode root, ref int res) {
        if (root == null) {
            return 0;
        }
        int left = DFS(root.left, ref res);
        int right = DFS(root.right, ref res);
        res = Math.Max(res, left + right);
        return 1 + Math.Max(left, right);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

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
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        stack = [root]
        mp = {None: (0, 0)}

        while stack:
            node = stack[-1]

            if node.left and node.left not in mp:
                stack.append(node.left)
            elif node.right and node.right not in mp:
                stack.append(node.right)
            else:
                node = stack.pop()

                leftHeight, leftDiameter = mp[node.left]
                rightHeight, rightDiameter = mp[node.right]

                mp[node] = (1 + max(leftHeight, rightHeight),
                           max(leftHeight + rightHeight, leftDiameter, rightDiameter))

        return mp[root][1]
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
    public int diameterOfBinaryTree(TreeNode root) {
        Map<TreeNode, int[]> mp = new HashMap<>();
        mp.put(null, new int[]{0, 0});
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode node = stack.peek();

            if (node.left != null && !mp.containsKey(node.left)) {
                stack.push(node.left);
            } else if (node.right != null && !mp.containsKey(node.right)) {
                stack.push(node.right);
            } else {
                node = stack.pop();

                int[] leftData = mp.get(node.left);
                int[] rightData = mp.get(node.right);

                int leftHeight = leftData[0], leftDiameter = leftData[1];
                int rightHeight = rightData[0], rightDiameter = rightData[1];

                int height = 1 + Math.max(leftHeight, rightHeight);
                int diameter = Math.max(leftHeight + rightHeight, 
                               Math.max(leftDiameter, rightDiameter));

                mp.put(node, new int[]{height, diameter});
            }
        }
        return mp.get(root)[1];
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
    int diameterOfBinaryTree(TreeNode* root) {
        unordered_map<TreeNode*, pair<int, int>> mp;
        mp[nullptr] = {0, 0};
        stack<TreeNode*> stack;
        stack.push(root);

        while (!stack.empty()) {
            TreeNode* node = stack.top();

            if (node->left && mp.find(node->left) == mp.end()) {
                stack.push(node->left);
            } else if (node->right && mp.find(node->right) == mp.end()) {
                stack.push(node->right);
            } else {
                node = stack.top();
                stack.pop();

                auto[leftHeight, leftDiameter] = mp[node->left];
                auto[rightHeight, rightDiameter] = mp[node->right];

                int height = 1 + std::max(leftHeight, rightHeight);
                int diameter = max(leftHeight + rightHeight, 
                               max(leftDiameter, rightDiameter));

                mp[node] = {height, diameter};
            }
        }
        return mp[root].second;
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
    diameterOfBinaryTree(root) {
        let stack = [root];
        let mp = new Map();
        mp.set(null, [0, 0]);

        while (stack.length > 0) {
            let node = stack[stack.length - 1];

            if (node.left && !mp.has(node.left)) {
                stack.push(node.left);
            } else if (node.right && !mp.has(node.right)) {
                stack.push(node.right);
            } else {
                node = stack.pop();

                let [leftHeight, leftDiameter] = mp.get(node.left);
                let [rightHeight, rightDiameter] = mp.get(node.right);

                let height = 1 + Math.max(leftHeight, rightHeight);
                let diameter = Math.max(leftHeight + rightHeight, 
                               Math.max(leftDiameter, rightDiameter));

                mp.set(node, [height, diameter]);
            }
        }
        return mp.get(root)[1];
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
    public int DiameterOfBinaryTree(TreeNode root) {
        if (root == null) {
            return 0;
        }

        Stack<TreeNode> stack = new Stack<TreeNode>();
        Dictionary<TreeNode, (int, int)> mp = new Dictionary<TreeNode, (int, int)>();
        stack.Push(root);

        while (stack.Count > 0) {
            TreeNode node = stack.Peek();

            if (node.left != null && !mp.ContainsKey(node.left)) {
                stack.Push(node.left);
            } else if (node.right != null && !mp.ContainsKey(node.right)) {
                stack.Push(node.right);
            } else {
                node = stack.Pop();

                int leftHeight = 0, leftDiameter = 0;
                if (node.left != null && mp.ContainsKey(node.left)) {
                    (leftHeight, leftDiameter) = mp[node.left];
                }

                int rightHeight = 0, rightDiameter = 0;
                if (node.right != null && mp.ContainsKey(node.right)) {
                    (rightHeight, rightDiameter) = mp[node.right];
                }

                int height = 1 + Math.Max(leftHeight, rightHeight);
                int diameter = Math.Max(leftHeight + rightHeight, 
                               Math.Max(leftDiameter, rightDiameter));

                mp[node] = (height, diameter);
            }
        }

        return mp[root].Item2;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$