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
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        res = -float('inf')
        def dfs(root):
            nonlocal res
            if not root:
                return 
            left = self.getMax(root.left)
            right = self.getMax(root.right)
            res =max(res, root.val + left + right)
            dfs(root.left)
            dfs(root.right)
        dfs(root)
        return res
            
    def getMax(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        
        left = self.getMax(root.left)
        right = self.getMax(root.right)
        path = root.val + max(left, right)
        return max(0, path)
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
    int res = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        dfs(root);
        return res;
    }

    private int getMax(TreeNode root) {
        if (root == null) return 0;
        int left = getMax(root.left);
        int right = getMax(root.right);
        int path = root.val + Math.max(left, right);
        return Math.max(0, path);
    }

    private void dfs(TreeNode root) {
        if (root == null) return;
        int left = getMax(root.left);
        int right = getMax(root.right);
        res = Math.max(res, root.val + left + right);
        dfs(root.left);
        dfs(root.right);
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
    int res = INT_MIN;

    int getMax(TreeNode* root) {
        if (!root) return 0;
        int left = getMax(root->left);
        int right = getMax(root->right);
        int path = root->val + std::max(left, right);
        return std::max(0, path);
    }

    void dfs(TreeNode* root) {
        if (!root) return;
        int left = getMax(root->left);
        int right = getMax(root->right);
        res = std::max(res, root->val + left + right);
        dfs(root->left);
        dfs(root->right);
    }

public:
    int maxPathSum(TreeNode* root) {
        dfs(root);
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
    maxPathSum(root) {
        let res = -Infinity;

        function getMax(root) {
            if (!root) return 0;
            let left = getMax(root.left);
            let right = getMax(root.right);
            let path = root.val + Math.max(left, right);
            return Math.max(0, path);
        }

        function dfs(root) {
            if (!root) return;
            let left = getMax(root.left);
            let right = getMax(root.right);
            res = Math.max(res, root.val + left + right);
            dfs(root.left);
            dfs(root.right);
        }

        dfs(root);
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
    int res = int.MinValue;

    public int MaxPathSum(TreeNode root) {
        dfs(root);
        return res;
    }

    private int GetMax(TreeNode root) {
        if (root == null) return 0;
        int left = GetMax(root.left);
        int right = GetMax(root.right);
        int path = root.val + Math.Max(left, right);
        return Math.Max(0, path);
    }

    private void dfs(TreeNode root) {
        if (root == null) return;
        int left = GetMax(root.left);
        int right = GetMax(root.right);
        res = Math.Max(res, root.val + left + right);
        dfs(root.left);
        dfs(root.right);
    }
}
```

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func maxPathSum(root *TreeNode) int {
    res := -1 << 31 
    dfs(root, &res)
    return res
}

func dfs(root *TreeNode, res *int) {
    if root == nil {
        return
    }
    left := getMax(root.Left)
    right := getMax(root.Right)
    *res = max(*res, root.Val + left + right)
    dfs(root.Left, res)
    dfs(root.Right, res)
}

func getMax(root *TreeNode) int {
    if root == nil {
        return 0
    }
    left := getMax(root.Left)
    right := getMax(root.Right)
    path := root.Val + max(left, right)
    return max(0, path)
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    private var res = Int.MIN_VALUE

    fun maxPathSum(root: TreeNode?): Int {
        dfs(root)
        return res
    }

    private fun dfs(root: TreeNode?) {
        if (root == null) return

        val left = getMax(root.left)
        val right = getMax(root.right)
        res = maxOf(res, root.`val` + left + right)

        dfs(root.left)
        dfs(root.right)
    }

    private fun getMax(root: TreeNode?): Int {
        if (root == null) return 0

        val left = getMax(root.left)
        val right = getMax(root.right)
        val path = root.`val` + maxOf(left, right)
        return maxOf(0, path)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 2. Depth First Search (Optimal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        res = [root.val]

        def dfs(root):
            if not root:
                return 0

            leftMax = dfs(root.left)
            rightMax = dfs(root.right)
            leftMax = max(leftMax, 0)
            rightMax = max(rightMax, 0)

            res[0] = max(res[0], root.val + leftMax + rightMax)
            return root.val + max(leftMax, rightMax)

        dfs(root)
        return res[0]
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

    public int maxPathSum(TreeNode root) {
        int[] res = new int[]{root.val};
        dfs(root, res);
        return res[0];
    }

    private int dfs(TreeNode root, int[] res) {
        if (root == null) {
            return 0;
        }

        int leftMax = Math.max(dfs(root.left, res), 0);
        int rightMax = Math.max(dfs(root.right, res), 0);

        res[0] = Math.max(res[0], root.val + leftMax + rightMax);
        return root.val + Math.max(leftMax, rightMax);
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
    int maxPathSum(TreeNode* root) {
        int res = root->val;
        dfs(root, res);
        return res;
    }

private:
    int dfs(TreeNode* root, int& res) {
        if (!root) {
            return 0;
        }

        int leftMax = max(dfs(root->left, res), 0);
        int rightMax = max(dfs(root->right, res), 0);

        res = max(res, root->val + leftMax + rightMax);
        return root->val + max(leftMax, rightMax);
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
    maxPathSum(root) {
        const res = [root.val];
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

        const leftMax = Math.max(this.dfs(root.left, res), 0);
        const rightMax = Math.max(this.dfs(root.right, res), 0);

        res[0] = Math.max(res[0], root.val + leftMax + rightMax);
        return root.val + Math.max(leftMax, rightMax);
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

    public int MaxPathSum(TreeNode root) {
        int res = root.val;
        Dfs(root, ref res);
        return res;
    }

    private int Dfs(TreeNode root, ref int res) {
        if (root == null) {
            return 0;
        }

        int leftMax = Math.Max(Dfs(root.left, ref res), 0);
        int rightMax = Math.Max(Dfs(root.right, ref res), 0);

        res = Math.Max(res, root.val + leftMax + rightMax);
        return root.val + Math.Max(leftMax, rightMax);
    }
}
```

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func maxPathSum(root *TreeNode) int {
    res := []int{root.Val}
    
    var dfs func(node *TreeNode) int
    dfs = func(node *TreeNode) int {
        if node == nil {
            return 0
        }
        
        leftMax := dfs(node.Left)
        rightMax := dfs(node.Right)
        
        leftMax = max(leftMax, 0)
        rightMax = max(rightMax, 0)
        
        res[0] = max(res[0], node.Val+leftMax+rightMax)
        
        return node.Val + max(leftMax, rightMax)
    }
    
    dfs(root)
    return res[0]
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    private var res = Int.MIN_VALUE
    
    fun maxPathSum(root: TreeNode?): Int {
        dfs(root)
        return res
    }
    
    private fun dfs(node: TreeNode?): Int {
        if (node == null) {
            return 0
        }
        
        val leftMax = maxOf(dfs(node.left), 0)
        val rightMax = maxOf(dfs(node.right), 0)
        
        res = maxOf(res, node.`val` + leftMax + rightMax)
        
        return node.`val` + maxOf(leftMax, rightMax)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$