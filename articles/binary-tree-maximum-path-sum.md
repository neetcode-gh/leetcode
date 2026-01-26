## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Tree Structure** - Understanding nodes, left/right children, and tree traversal
- **Depth-First Search (DFS)** - Recursively visiting all nodes in a tree
- **Recursion with Return Values** - Functions that both compute results and return values to parent calls
- **Handling Negative Numbers** - Knowing when to exclude negative contributions from sums
- **Global vs Local State** - Tracking a global maximum while computing local path values

---

## 1. Depth First Search

### Intuition
For each node, consider it as the **highest point** of a potential path.
A path can pass through a node as:

**left-subtree → node → right-subtree**

So for every node we need two things:

1. **Maximum downward path** from its left child
2. **Maximum downward path** from its right child

A downward path ends at that child and goes only downward (no turning back up).
This is computed using `getMax()`.

Then we compute the best full path through this node:
```
node.val + leftDown + rightDown
```

We try this for **every node** using `DFS` and update the global answer.

### Algorithm
1. Use `DFS` to visit each node.
2. At each node:
   - Compute the max downward path from the left subtree.
   - Compute the max downward path from the right subtree.
   - Update the result with
     `node.val + leftDown + rightDown`
3. The helper `getMax(node)` returns the best downward path:
   - Compute `node.val + max(leftDown, rightDown)`
   - Return `0` if it is negative (since negative paths should be ignored).
4. Return the global maximum path sum.

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

```swift
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init() { self.val = 0; self.left = nil; self.right = nil; }
 *     public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
 *     public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
 *         self.val = val
 *         self.left = left
 *         self.right = right
 *     }
 * }
 */
class Solution {
    var res = Int.min

    func maxPathSum(_ root: TreeNode?) -> Int {
        dfs(root)
        return res
    }

    private func dfs(_ root: TreeNode?) {
        guard let node = root else { return }
        let left = getMax(node.left)
        let right = getMax(node.right)
        res = max(res, node.val + left + right)
        dfs(node.left)
        dfs(node.right)
    }

    private func getMax(_ root: TreeNode?) -> Int {
        guard let node = root else { return 0 }
        let left = getMax(node.left)
        let right = getMax(node.right)
        let path = node.val + max(left, right)
        return max(0, path)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Depth First Search (Optimal)

### Intuition
In the maximum path sum problem, a *path* can start and end anywhere in the tree, but it must go **downward** at each step (parent → child).

For every node, two values matter:

1. **Max Downward Path** starting at this node
   - This path can only go to *one* side (left or right).
   - Used by the parent to extend the path upward.
   - Computed as:
     ```
     node.val + max(leftDown, rightDown)
     ```

2. **Max Path Through This Node**
   - This can include **both** left and right downward paths:
     ```
     node.val + leftDown + rightDown
     ```
   - This may form the global maximum path.

While computing `DFS`:
- If a downward path sum is negative, we drop it (take `0`), because adding negative values only makes the path worse.
- At each node, update the global maximum using the "path through this node".
- Return the best downward path to the parent.

This ensures each node is visited once — **O(n)** optimal time.


### Algorithm
1. Maintain a global result `res`, initialized with the root’s value.
2. Define `dfs(node)`:
   - If node is `None`, return `0`.
   - Recursively compute:
     ```
     leftMax = dfs(node.left)
     rightMax = dfs(node.right)
     ```
   - Ignore negative downward paths:
     ```
     leftMax = max(leftMax, 0)
     rightMax = max(rightMax, 0)
     ```
   - Update global result with the best path *through* node:
     ```
     res = max(res, node.val + leftMax + rightMax)
     ```
   - Return the best "extendable" downward path:
     ```
     node.val + max(leftMax, rightMax)
     ```
3. Call `dfs(root)` and return `res`.

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

```swift
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init() { self.val = 0; self.left = nil; self.right = nil; }
 *     public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
 *     public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
 *         self.val = val
 *         self.left = left
 *         self.right = right
 *     }
 * }
 */
class Solution {
    func maxPathSum(_ root: TreeNode?) -> Int {
        var res = root!.val

        func dfs(_ root: TreeNode?) -> Int {
            guard let node = root else { return 0 }

            let leftMax = max(dfs(node.left), 0)
            let rightMax = max(dfs(node.right), 0)

            res = max(res, node.val + leftMax + rightMax)
            return node.val + max(leftMax, rightMax)
        }

        dfs(root)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Initializing Result to Zero Instead of Negative Infinity
When all node values are negative, the maximum path sum is still negative. Initializing the result to 0 causes incorrect answers for trees with all negative values.
```python
# Wrong: fails for trees like [-3]
res = 0  # should be: res = float('-inf') or root.val
```

### Forgetting to Clamp Negative Subtree Contributions to Zero
A subtree with negative sum should not be included in the path. Failing to take `max(0, subtree_sum)` adds negative values that reduce the total.
```python
# Wrong: includes negative contributions
leftMax = dfs(root.left)  # should be: max(dfs(root.left), 0)
```

### Returning the Full Path Sum Instead of Single-Branch Sum
The recursive function must return only one branch (left OR right) to the parent, not both. Returning `node.val + leftMax + rightMax` allows invalid paths that fork at multiple nodes.
```python
# Wrong: returns both branches (creates invalid forking path)
return node.val + leftMax + rightMax
# Correct: return node.val + max(leftMax, rightMax)
```

### Not Considering Single-Node Paths
A valid path can be just one node. The algorithm must consider `node.val` alone as a potential maximum, especially when both subtrees contribute negative values.

### Confusing Path Sum With Downward Path
The maximum path can go through any node as the "turning point" (left subtree -> node -> right subtree). This is different from paths that only go downward from root to leaf.
