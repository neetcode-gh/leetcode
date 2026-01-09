## 1. Depth First Search - I

### Intuition

We traverse the tree from root to leaves, accumulating the sum along the way. When we reach a leaf node, we check if the accumulated sum equals the target. DFS naturally explores all root-to-leaf paths, making it ideal for this problem.

### Algorithm

1. Define `dfs(node, curSum)` that returns whether a valid path exists from this node.
2. If `node` is null, return false.
3. Add `node.val` to `curSum`.
4. If `node` is a leaf (no children), return whether `curSum == targetSum`.
5. Otherwise, recursively check the left and right subtrees, returning true if either has a valid path.
6. Call `dfs(root, 0)` to start the search.

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

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func hasPathSum(root *TreeNode, targetSum int) bool {
    var dfs func(node *TreeNode, curSum int) bool
    dfs = func(node *TreeNode, curSum int) bool {
        if node == nil {
            return false
        }

        curSum += node.Val
        if node.Left == nil && node.Right == nil {
            return curSum == targetSum
        }

        return dfs(node.Left, curSum) || dfs(node.Right, curSum)
    }

    return dfs(root, 0)
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
    fun hasPathSum(root: TreeNode?, targetSum: Int): Boolean {
        fun dfs(node: TreeNode?, curSum: Int): Boolean {
            if (node == null) return false

            val newSum = curSum + node.`val`
            if (node.left == null && node.right == null) {
                return newSum == targetSum
            }

            return dfs(node.left, newSum) || dfs(node.right, newSum)
        }

        return dfs(root, 0)
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
    func hasPathSum(_ root: TreeNode?, _ targetSum: Int) -> Bool {
        func dfs(_ node: TreeNode?, _ curSum: Int) -> Bool {
            guard let node = node else { return false }

            let newSum = curSum + node.val
            if node.left == nil && node.right == nil {
                return newSum == targetSum
            }

            return dfs(node.left, newSum) || dfs(node.right, newSum)
        }

        return dfs(root, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Depth First Search - II

### Intuition

Instead of accumulating a sum, we subtract each node's value from the target. When we reach a leaf, we check if the remaining target is zero. This approach avoids passing an extra parameter and keeps the logic clean.

### Algorithm

1. If `root` is null, return false.
2. Subtract `root.val` from `targetSum`.
3. If `root` is a leaf, return whether `targetSum == 0`.
4. Recursively call the function on left and right children with the updated target.
5. Return true if either subtree finds a valid path.

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

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func hasPathSum(root *TreeNode, targetSum int) bool {
    if root == nil {
        return false
    }

    targetSum -= root.Val
    return hasPathSum(root.Left, targetSum) ||
           hasPathSum(root.Right, targetSum) ||
           (targetSum == 0 && root.Left == nil && root.Right == nil)
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
    fun hasPathSum(root: TreeNode?, targetSum: Int): Boolean {
        if (root == null) return false

        val remaining = targetSum - root.`val`
        return hasPathSum(root.left, remaining) ||
               hasPathSum(root.right, remaining) ||
               (remaining == 0 && root.left == null && root.right == null)
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
    func hasPathSum(_ root: TreeNode?, _ targetSum: Int) -> Bool {
        guard let root = root else { return false }

        let remaining = targetSum - root.val
        return hasPathSum(root.left, remaining) ||
               hasPathSum(root.right, remaining) ||
               (remaining == 0 && root.left == nil && root.right == nil)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Iterative DFS

### Intuition

We can simulate the recursive DFS using an explicit stack. Each stack entry stores a node and the remaining sum needed to reach the target from that node. This approach avoids recursion depth issues for very deep trees.

### Algorithm

1. If `root` is null, return false.
2. Initialize a stack with `(root, targetSum - root.val)`.
3. While the stack is not empty:
   - Pop a node and its remaining sum.
   - If it's a leaf and the remaining sum is zero, return true.
   - Push the right child (if exists) with its updated remaining sum.
   - Push the left child (if exists) with its updated remaining sum.
4. If the stack empties without finding a valid path, return false.

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

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func hasPathSum(root *TreeNode, targetSum int) bool {
    if root == nil {
        return false
    }

    type pair struct {
        node   *TreeNode
        curSum int
    }

    stack := []pair{{root, targetSum - root.Val}}
    for len(stack) > 0 {
        p := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if p.node.Left == nil && p.node.Right == nil && p.curSum == 0 {
            return true
        }

        if p.node.Right != nil {
            stack = append(stack, pair{p.node.Right, p.curSum - p.node.Right.Val})
        }
        if p.node.Left != nil {
            stack = append(stack, pair{p.node.Left, p.curSum - p.node.Left.Val})
        }
    }

    return false
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
    fun hasPathSum(root: TreeNode?, targetSum: Int): Boolean {
        if (root == null) return false

        val stack = ArrayDeque<Pair<TreeNode, Int>>()
        stack.addLast(Pair(root, targetSum - root.`val`))

        while (stack.isNotEmpty()) {
            val (node, currSum) = stack.removeLast()

            if (node.left == null && node.right == null && currSum == 0) {
                return true
            }

            node.right?.let {
                stack.addLast(Pair(it, currSum - it.`val`))
            }
            node.left?.let {
                stack.addLast(Pair(it, currSum - it.`val`))
            }
        }

        return false
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
    func hasPathSum(_ root: TreeNode?, _ targetSum: Int) -> Bool {
        guard let root = root else { return false }

        var stack: [(TreeNode, Int)] = [(root, targetSum - root.val)]
        while !stack.isEmpty {
            let (node, currSum) = stack.removeLast()

            if node.left == nil && node.right == nil && currSum == 0 {
                return true
            }

            if let right = node.right {
                stack.append((right, currSum - right.val))
            }
            if let left = node.left {
                stack.append((left, currSum - left.val))
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Breadth First Search

### Intuition

BFS explores the tree level by level. We use a queue to store each node along with the remaining sum needed. When we reach a leaf, we check if the target has been met. BFS guarantees we explore all paths systematically.

### Algorithm

1. If `root` is null, return false.
2. Initialize a queue with `(root, targetSum - root.val)`.
3. While the queue is not empty:
   - Dequeue a node and its remaining sum.
   - If it's a leaf and the remaining sum is zero, return true.
   - Enqueue the left child (if exists) with its updated remaining sum.
   - Enqueue the right child (if exists) with its updated remaining sum.
4. Return false if no valid path is found.

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

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func hasPathSum(root *TreeNode, targetSum int) bool {
    if root == nil {
        return false
    }

    type pair struct {
        node   *TreeNode
        curSum int
    }

    queue := []pair{{root, targetSum - root.Val}}
    for len(queue) > 0 {
        p := queue[0]
        queue = queue[1:]

        if p.node.Left == nil && p.node.Right == nil && p.curSum == 0 {
            return true
        }

        if p.node.Left != nil {
            queue = append(queue, pair{p.node.Left, p.curSum - p.node.Left.Val})
        }
        if p.node.Right != nil {
            queue = append(queue, pair{p.node.Right, p.curSum - p.node.Right.Val})
        }
    }

    return false
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
    fun hasPathSum(root: TreeNode?, targetSum: Int): Boolean {
        if (root == null) return false

        val queue = ArrayDeque<Pair<TreeNode, Int>>()
        queue.addLast(Pair(root, targetSum - root.`val`))

        while (queue.isNotEmpty()) {
            val (node, currSum) = queue.removeFirst()

            if (node.left == null && node.right == null && currSum == 0) {
                return true
            }

            node.left?.let {
                queue.addLast(Pair(it, currSum - it.`val`))
            }
            node.right?.let {
                queue.addLast(Pair(it, currSum - it.`val`))
            }
        }

        return false
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
    func hasPathSum(_ root: TreeNode?, _ targetSum: Int) -> Bool {
        guard let root = root else { return false }

        var queue: [(TreeNode, Int)] = [(root, targetSum - root.val)]
        while !queue.isEmpty {
            let (node, currSum) = queue.removeFirst()

            if node.left == nil && node.right == nil && currSum == 0 {
                return true
            }

            if let left = node.left {
                queue.append((left, currSum - left.val))
            }
            if let right = node.right {
                queue.append((right, currSum - right.val))
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
