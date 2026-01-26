## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Tree Basics** - Understanding tree structure, nodes, and parent-child relationships
- **Depth-First Search (DFS)** - Recursive and iterative traversal techniques
- **Tree Height Calculation** - Computing the height of a subtree recursively

---

## 1. Brute Force

### Intuition
For any node in a tree, the longest path that goes **through** it is:
- height of left subtree + height of right subtree

So to find the tree’s diameter, we check this value **for every node**.  
We also compare it with the best diameter found in the left and right subtrees.

### Algorithm
1. If the tree is empty, return `0`.
2. For each node:
   - Compute height of its left subtree.
   - Compute height of its right subtree.
   - Compute diameter through that node = `leftHeight + rightHeight`.
3. Recursively find diameter of left subtree.
4. Recursively find diameter of right subtree.
5. The final diameter for this node is the maximum of:
   - diameter through this node
   - diameter in left subtree
   - diameter in right subtree
6. Return that maximum.


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
        let sub = Math.max(
            this.diameterOfBinaryTree(root.left),
            this.diameterOfBinaryTree(root.right),
        );
        return Math.max(diameter, sub);
    }

    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxHeight(root) {
        if (!root) return 0;
        return (
            1 + Math.max(this.maxHeight(root.left), this.maxHeight(root.right))
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

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func diameterOfBinaryTree(root *TreeNode) int {
    if root == nil {
        return 0
    }

    leftHeight := maxHeight(root.Left)
    rightHeight := maxHeight(root.Right)
    diameter := leftHeight + rightHeight

    sub := max(diameterOfBinaryTree(root.Left),
              diameterOfBinaryTree(root.Right))

    return max(diameter, sub)
}

func maxHeight(root *TreeNode) int {
    if root == nil {
        return 0
    }

    return 1 + max(maxHeight(root.Left), maxHeight(root.Right))
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
    fun diameterOfBinaryTree(root: TreeNode?): Int {
        if (root == null) {
            return 0
        }

        val leftHeight = maxHeight(root.left)
        val rightHeight = maxHeight(root.right)
        val diameter = leftHeight + rightHeight

        val sub = maxOf(
            diameterOfBinaryTree(root.left),
            diameterOfBinaryTree(root.right)
        )

        return maxOf(diameter, sub)
    }

    private fun maxHeight(root: TreeNode?): Int {
        if (root == null) {
            return 0
        }

        return 1 + maxOf(maxHeight(root.left), maxHeight(root.right))
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
    func diameterOfBinaryTree(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }

        let leftHeight = maxHeight(root.left)
        let rightHeight = maxHeight(root.right)
        let diameter = leftHeight + rightHeight
        let sub = max(diameterOfBinaryTree(root.left), diameterOfBinaryTree(root.right))

        return max(diameter, sub)
    }

    private func maxHeight(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }
        return 1 + max(maxHeight(root.left), maxHeight(root.right))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Depth First Search

### Intuition
The diameter of a binary tree is the **longest path between any two nodes**.  
This path *must go through some node*, and at that node the path length is:
- (left subtree height) + (right subtree height)

So while doing a DFS to compute heights, we can simultaneously track the
maximum `left + right` seen so far.
This gives the diameter in one pass without recomputing heights.

### Algorithm
1. Use DFS to compute the height of every subtree.
2. For each node during DFS:
   - Recursively get `left` height.
   - Recursively get `right` height.
   - Diameter through this node = `left + right`.
   - Update the global answer with this diameter.
3. Height returned to parent = `1 + max(left, right)`.
4. After DFS finishes, the global answer contains the diameter.

This gives an **O(n)** time solution with a single DFS traversal.

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

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func diameterOfBinaryTree(root *TreeNode) int {
    res := 0

    var dfs func(*TreeNode) int
    dfs = func(root *TreeNode) int {
        if root == nil {
            return 0
        }

        left := dfs(root.Left)
        right := dfs(root.Right)
        res = max(res, left + right)

        return 1 + max(left, right)
    }

    dfs(root)
    return res
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
    private var res = 0

    fun diameterOfBinaryTree(root: TreeNode?): Int {
        dfs(root)
        return res
    }

    private fun dfs(root: TreeNode?): Int {
        if (root == null) {
            return 0
        }

        val left = dfs(root.left)
        val right = dfs(root.right)
        res = maxOf(res, left + right)

        return 1 + maxOf(left, right)
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
    func diameterOfBinaryTree(_ root: TreeNode?) -> Int {
        var res = 0

        func dfs(_ root: TreeNode?) -> Int {
            guard let root = root else { return 0 }
            let left = dfs(root.left)
            let right = dfs(root.right)
            res = max(res, left + right)
            return 1 + max(left, right)
        }

        dfs(root)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(h)$
    - Best Case ([balanced tree](https://www.geeksforgeeks.org/balanced-binary-tree/)): $O(log(n))$
    - Worst Case ([degenerate tree](https://www.geeksforgeeks.org/introduction-to-degenerate-binary-tree/)): $O(n)$

> Where $n$ is the number of nodes in the tree and $h$ is the height of the tree.

---

## 3. Iterative DFS

### Intuition
Recursive DFS is the easiest way to compute diameter, but it uses the call stack.
We can simulate the same behavior **iteratively** using our own stack.

We perform a **post-order traversal**:
- Visit left subtree
- Visit right subtree
- Then process the current node

For each node, we store in a map:
- its **height**
- its **best diameter**

After both children are processed, we can compute:
- `height = 1 + max(leftHeight, rightHeight)`
- `diameter = max(leftHeight + rightHeight, leftDiameter, rightDiameter)`

This means every node is processed exactly once.

### Algorithm
1. Use a stack to simulate DFS.
2. Maintain a map storing `(height, diameter)` for each visited node.
3. For each node:
   - First push its children until you reach the bottom (post-order).
   - When both children are processed, pop the node:
     - Retrieve left and right heights/diameters.
     - Compute `height = 1 + max(leftHeight, rightHeight)` and `diameter = max(leftHeight + rightHeight, leftDiameter, rightDiameter)`.
     - Save these results in the map.
4. The final diameter is the second value stored for the root.

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
                let diameter = Math.max(
                    leftHeight + rightHeight,
                    Math.max(leftDiameter, rightDiameter),
                );

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

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func diameterOfBinaryTree(root *TreeNode) int {
   if root == nil {
       return 0
   }

   stack := linkedliststack.New()
   stack.Push(root)
   mp := make(map[*TreeNode][]int)
   mp[nil] = []int{0, 0}

   for !stack.Empty() {
       val, _ := stack.Peek()
       node := val.(*TreeNode)

       if node.Left != nil && len(mp[node.Left]) == 0 {
           stack.Push(node.Left)
       } else if node.Right != nil && len(mp[node.Right]) == 0 {
           stack.Push(node.Right)
       } else {
           stack.Pop()

           leftHeight := mp[node.Left][0]
           leftDiameter := mp[node.Left][1]
           rightHeight := mp[node.Right][0]
           rightDiameter := mp[node.Right][1]

           height := 1 + max(leftHeight, rightHeight)
           diameter := max(leftHeight+rightHeight,
                         max(leftDiameter, rightDiameter))

           mp[node] = []int{height, diameter}
       }
   }

   return mp[root][1]
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
    fun diameterOfBinaryTree(root: TreeNode?): Int {
        if (root == null) {
            return 0
        }

        val stack = ArrayDeque<TreeNode>()
        stack.addLast(root)

        val mp = HashMap<TreeNode?, Pair<Int, Int>>()
        mp[null] = Pair(0, 0)

        while (stack.isNotEmpty()) {
            val node = stack.last()

            when {
                node.left != null && !mp.containsKey(node.left) -> {
                    stack.addLast(node.left)
                }
                node.right != null && !mp.containsKey(node.right) -> {
                    stack.addLast(node.right)
                }
                else -> {
                    stack.removeLast()

                    val (leftHeight, leftDiameter) = mp[node.left] ?: Pair(0, 0)
                    val (rightHeight, rightDiameter) = mp[node.right] ?: Pair(0, 0)

                    val height = 1 + maxOf(leftHeight, rightHeight)
                    val diameter = maxOf(leftHeight + rightHeight,
                                      leftDiameter,
                                      rightDiameter)

                    mp[node] = Pair(height, diameter)
                }
            }
        }

        return mp[root]?.second ?: 0
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
    func diameterOfBinaryTree(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }
        var stack: [TreeNode] = [root]
        var mp = [ObjectIdentifier: (Int, Int)]()

        while !stack.isEmpty {
            let node = stack.last!
            if let left = node.left, mp[ObjectIdentifier(left)] == nil {
                stack.append(left)
            } else if let right = node.right, mp[ObjectIdentifier(right)] == nil {
                stack.append(right)
            } else {
                let node = stack.removeLast()
                let leftTuple = node.left != nil ? mp[ObjectIdentifier(node.left!)]! : (0, 0)
                let rightTuple = node.right != nil ? mp[ObjectIdentifier(node.right!)]! : (0, 0)
                let height = 1 + max(leftTuple.0, rightTuple.0)
                let diameter = max(leftTuple.0 + rightTuple.0, leftTuple.1, rightTuple.1)
                mp[ObjectIdentifier(node)] = (height, diameter)
            }
        }

        return mp[ObjectIdentifier(root)]!.1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Returning Diameter Instead of Height from DFS
The DFS function must return height (for the parent to use), but update the global diameter. A common mistake is returning the diameter, which breaks the height calculation for ancestors.
```python
# Wrong: return left + right (diameter)
# Correct: return 1 + max(left, right) (height)
```

### Assuming the Longest Path Goes Through the Root
The diameter may pass through any node, not just the root. A solution that only calculates `leftHeight + rightHeight` at the root will fail on trees where the longest path is entirely within a subtree.
