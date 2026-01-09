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
    def trimBST(self, root: Optional[TreeNode], low: int, high: int) -> Optional[TreeNode]:
        if not root:
            return None

        if root.val > high:
            return self.trimBST(root.left, low, high)
        if root.val < low:
            return self.trimBST(root.right, low, high)

        root.left = self.trimBST(root.left, low, high)
        root.right = self.trimBST(root.right, low, high)
        return root
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
    public TreeNode trimBST(TreeNode root, int low, int high) {
        if (root == null) {
            return null;
        }

        if (root.val > high) {
            return trimBST(root.left, low, high);
        }
        if (root.val < low) {
            return trimBST(root.right, low, high);
        }

        root.left = trimBST(root.left, low, high);
        root.right = trimBST(root.right, low, high);
        return root;
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
    TreeNode* trimBST(TreeNode* root, int low, int high) {
        if (!root) return nullptr;

        if (root->val > high) {
            return trimBST(root->left, low, high);
        }
        if (root->val < low) {
            return trimBST(root->right, low, high);
        }

        root->left = trimBST(root->left, low, high);
        root->right = trimBST(root->right, low, high);
        return root;
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
     * @param {number} low
     * @param {number} high
     * @return {TreeNode}
     */
    trimBST(root, low, high) {
        if (!root) return null;

        if (root.val > high) return this.trimBST(root.left, low, high);
        if (root.val < low) return this.trimBST(root.right, low, high);

        root.left = this.trimBST(root.left, low, high);
        root.right = this.trimBST(root.right, low, high);
        return root;
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
func trimBST(root *TreeNode, low int, high int) *TreeNode {
    if root == nil {
        return nil
    }

    if root.Val > high {
        return trimBST(root.Left, low, high)
    }
    if root.Val < low {
        return trimBST(root.Right, low, high)
    }

    root.Left = trimBST(root.Left, low, high)
    root.Right = trimBST(root.Right, low, high)
    return root
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun trimBST(root: TreeNode?, low: Int, high: Int): TreeNode? {
        if (root == null) return null

        if (root.`val` > high) {
            return trimBST(root.left, low, high)
        }
        if (root.`val` < low) {
            return trimBST(root.right, low, high)
        }

        root.left = trimBST(root.left, low, high)
        root.right = trimBST(root.right, low, high)
        return root
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
    func trimBST(_ root: TreeNode?, _ low: Int, _ high: Int) -> TreeNode? {
        guard let root = root else { return nil }

        if root.val > high {
            return trimBST(root.left, low, high)
        }
        if root.val < low {
            return trimBST(root.right, low, high)
        }

        root.left = trimBST(root.left, low, high)
        root.right = trimBST(root.right, low, high)
        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Iterative DFS

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def trimBST(self, root, low, high):
        while root and (root.val < low or root.val > high):
            if root.val < low:
                root = root.right
            else:
                root = root.left

        stack = [root]
        while stack:
            node = stack.pop()
            if not node:
                continue
            left_out = node.left and node.left.val < low
            right_out = node.right and node.right.val > high
            if left_out:
                node.left = node.left.right
            if right_out:
                node.right = node.right.left
            if left_out or right_out:
                stack.append(node)
            else:
                if node.left:
                    stack.append(node.left)
                if node.right:
                    stack.append(node.right)
        return root
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
    public TreeNode trimBST(TreeNode root, int low, int high) {
        while (root != null && (root.val < low || root.val > high)) {
            root = (root.val < low) ? root.right : root.left;
        }

        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node == null) continue;

            boolean leftOut = (node.left != null && node.left.val < low);
            boolean rightOut = (node.right != null && node.right.val > high);

            if (leftOut) node.left = node.left.right;
            if (rightOut) node.right = node.right.left;

            if (leftOut || rightOut) {
                stack.push(node);
            } else {
                if (node.left != null) stack.push(node.left);
                if (node.right != null) stack.push(node.right);
            }
        }

        return root;
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
    TreeNode* trimBST(TreeNode* root, int low, int high) {
        while (root && (root->val < low || root->val > high)) {
            root = (root->val < low) ? root->right : root->left;
        }

        stack<TreeNode*> stack;
        stack.push(root);

        while (!stack.empty()) {
            TreeNode* node = stack.top();
            stack.pop();
            if (!node) continue;

            bool leftOut = (node->left && node->left->val < low);
            bool rightOut = (node->right && node->right->val > high);

            if (leftOut) node->left = node->left->right;
            if (rightOut) node->right = node->right->left;

            if (leftOut || rightOut) {
                stack.push(node);
            } else {
                if (node->left) stack.push(node->left);
                if (node->right) stack.push(node->right);
            }
        }

        return root;
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
     * @param {number} low
     * @param {number} high
     * @return {TreeNode}
     */
    trimBST(root, low, high) {
        while (root && (root.val < low || root.val > high)) {
            root = root.val < low ? root.right : root.left;
        }

        const stack = [root];

        while (stack.length > 0) {
            let node = stack.pop();
            if (!node) continue;

            let leftOut = node.left && node.left.val < low;
            let rightOut = node.right && node.right.val > high;

            if (leftOut) node.left = node.left.right;
            if (rightOut) node.right = node.right.left;

            if (leftOut || rightOut) {
                stack.push(node);
            } else {
                if (node.left) stack.push(node.left);
                if (node.right) stack.push(node.right);
            }
        }

        return root;
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
func trimBST(root *TreeNode, low int, high int) *TreeNode {
    for root != nil && (root.Val < low || root.Val > high) {
        if root.Val < low {
            root = root.Right
        } else {
            root = root.Left
        }
    }

    stack := []*TreeNode{root}

    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        if node == nil {
            continue
        }

        leftOut := node.Left != nil && node.Left.Val < low
        rightOut := node.Right != nil && node.Right.Val > high

        if leftOut {
            node.Left = node.Left.Right
        }
        if rightOut {
            node.Right = node.Right.Left
        }

        if leftOut || rightOut {
            stack = append(stack, node)
        } else {
            if node.Left != nil {
                stack = append(stack, node.Left)
            }
            if node.Right != nil {
                stack = append(stack, node.Right)
            }
        }
    }

    return root
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun trimBST(root: TreeNode?, low: Int, high: Int): TreeNode? {
        var root = root
        while (root != null && (root.`val` < low || root.`val` > high)) {
            root = if (root.`val` < low) root.right else root.left
        }

        val stack = ArrayDeque<TreeNode?>()
        stack.addLast(root)

        while (stack.isNotEmpty()) {
            val node = stack.removeLast() ?: continue

            val leftOut = node.left != null && node.left!!.`val` < low
            val rightOut = node.right != null && node.right!!.`val` > high

            if (leftOut) node.left = node.left?.right
            if (rightOut) node.right = node.right?.left

            if (leftOut || rightOut) {
                stack.addLast(node)
            } else {
                node.left?.let { stack.addLast(it) }
                node.right?.let { stack.addLast(it) }
            }
        }

        return root
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
    func trimBST(_ root: TreeNode?, _ low: Int, _ high: Int) -> TreeNode? {
        var root = root
        while root != nil && (root!.val < low || root!.val > high) {
            root = root!.val < low ? root!.right : root!.left
        }

        var stack: [TreeNode?] = [root]

        while !stack.isEmpty {
            guard let node = stack.removeLast() else { continue }

            let leftOut = node.left != nil && node.left!.val < low
            let rightOut = node.right != nil && node.right!.val > high

            if leftOut { node.left = node.left?.right }
            if rightOut { node.right = node.right?.left }

            if leftOut || rightOut {
                stack.append(node)
            } else {
                if node.left != nil { stack.append(node.left) }
                if node.right != nil { stack.append(node.right) }
            }
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Iterative DFS (Optimal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def trimBST(self, root: Optional[TreeNode], low: int, high: int) -> Optional[TreeNode]:
        while root and (root.val < low or root.val > high):
            root = root.right if root.val < low else root.left

        tmpRoot = root
        while root:
            while root.left and root.left.val < low:
                root.left = root.left.right
            root = root.left

        root = tmpRoot
        while root:
            while root.right and root.right.val > high:
                root.right = root.right.left
            root = root.right

        return tmpRoot
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
    public TreeNode trimBST(TreeNode root, int low, int high) {
        while (root != null && (root.val < low || root.val > high)) {
            root = (root.val < low) ? root.right : root.left;
        }

        TreeNode tmpRoot = root;
        while (root != null) {
            while (root.left != null && root.left.val < low) {
                root.left = root.left.right;
            }
            root = root.left;
        }

        root = tmpRoot;
        while (root != null) {
            while (root.right != null && root.right.val > high) {
                root.right = root.right.left;
            }
            root = root.right;
        }

        return tmpRoot;
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
    TreeNode* trimBST(TreeNode* root, int low, int high) {
        while (root && (root->val < low || root->val > high)) {
            root = (root->val < low) ? root->right : root->left;
        }

        TreeNode* tmpRoot = root;
        while (root) {
            while (root->left && root->left->val < low) {
                root->left = root->left->right;
            }
            root = root->left;
        }

        root = tmpRoot;
        while (root) {
            while (root->right && root->right->val > high) {
                root->right = root->right->left;
            }
            root = root->right;
        }

        return tmpRoot;
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
     * @param {number} low
     * @param {number} high
     * @return {TreeNode}
     */
    trimBST(root, low, high) {
        while (root && (root.val < low || root.val > high)) {
            root = root.val < low ? root.right : root.left;
        }

        let tmpRoot = root;
        while (root) {
            while (root.left && root.left.val < low) {
                root.left = root.left.right;
            }
            root = root.left;
        }

        root = tmpRoot;
        while (root) {
            while (root.right && root.right.val > high) {
                root.right = root.right.left;
            }
            root = root.right;
        }

        return tmpRoot;
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
func trimBST(root *TreeNode, low int, high int) *TreeNode {
    for root != nil && (root.Val < low || root.Val > high) {
        if root.Val < low {
            root = root.Right
        } else {
            root = root.Left
        }
    }

    tmpRoot := root
    for root != nil {
        for root.Left != nil && root.Left.Val < low {
            root.Left = root.Left.Right
        }
        root = root.Left
    }

    root = tmpRoot
    for root != nil {
        for root.Right != nil && root.Right.Val > high {
            root.Right = root.Right.Left
        }
        root = root.Right
    }

    return tmpRoot
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun trimBST(root: TreeNode?, low: Int, high: Int): TreeNode? {
        var root = root
        while (root != null && (root.`val` < low || root.`val` > high)) {
            root = if (root.`val` < low) root.right else root.left
        }

        val tmpRoot = root
        while (root != null) {
            while (root.left != null && root.left!!.`val` < low) {
                root.left = root.left?.right
            }
            root = root.left
        }

        root = tmpRoot
        while (root != null) {
            while (root.right != null && root.right!!.`val` > high) {
                root.right = root.right?.left
            }
            root = root.right
        }

        return tmpRoot
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
    func trimBST(_ root: TreeNode?, _ low: Int, _ high: Int) -> TreeNode? {
        var root = root
        while root != nil && (root!.val < low || root!.val > high) {
            root = root!.val < low ? root!.right : root!.left
        }

        let tmpRoot = root
        while root != nil {
            while root!.left != nil && root!.left!.val < low {
                root!.left = root!.left?.right
            }
            root = root!.left
        }

        root = tmpRoot
        while root != nil {
            while root!.right != nil && root!.right!.val > high {
                root!.right = root!.right?.left
            }
            root = root!.right
        }

        return tmpRoot
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
