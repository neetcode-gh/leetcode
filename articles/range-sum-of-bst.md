## 1. Depth First Search

### Intuition

We traverse the entire tree and sum up values that fall within the given range. For each node, we check if its value is between low and high, adding it to our sum if so. We then recursively process both children. This approach visits every node regardless of the BST property.

### Algorithm

1. Base case: if the node is null, return 0.
2. Check if the current node's value is within [low, high]. If yes, include it in the result.
3. Recursively compute the range sum for the left subtree.
4. Recursively compute the range sum for the right subtree.
5. Return the sum of all contributions.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rangeSumBST(self, root: Optional[TreeNode], low: int, high: int) -> int:
        if not root:
            return 0

        res = root.val if low <= root.val <= high else 0
        res += self.rangeSumBST(root.left, low, high)
        res += self.rangeSumBST(root.right, low, high)
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
    public int rangeSumBST(TreeNode root, int low, int high) {
        if (root == null) return 0;

        int res = (low <= root.val && root.val <= high) ? root.val : 0;
        res += rangeSumBST(root.left, low, high);
        res += rangeSumBST(root.right, low, high);
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
    int rangeSumBST(TreeNode* root, int low, int high) {
        if (!root) return 0;

        int res = (low <= root->val && root->val <= high) ? root->val : 0;
        res += rangeSumBST(root->left, low, high);
        res += rangeSumBST(root->right, low, high);
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
     * @param {number} low
     * @param {number} high
     * @return {number}
     */
    rangeSumBST(root, low, high) {
        if (!root) return 0;

        let res = low <= root.val && root.val <= high ? root.val : 0;
        res += this.rangeSumBST(root.left, low, high);
        res += this.rangeSumBST(root.right, low, high);
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
    public int RangeSumBST(TreeNode root, int low, int high) {
        if (root == null) return 0;

        int res = (root.val >= low && root.val <= high) ? root.val : 0;
        res += RangeSumBST(root.left, low, high);
        res += RangeSumBST(root.right, low, high);
        return res;
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
func rangeSumBST(root *TreeNode, low int, high int) int {
    if root == nil {
        return 0
    }

    res := 0
    if root.Val >= low && root.Val <= high {
        res = root.Val
    }
    res += rangeSumBST(root.Left, low, high)
    res += rangeSumBST(root.Right, low, high)
    return res
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
    fun rangeSumBST(root: TreeNode?, low: Int, high: Int): Int {
        if (root == null) return 0

        var res = if (root.`val` in low..high) root.`val` else 0
        res += rangeSumBST(root.left, low, high)
        res += rangeSumBST(root.right, low, high)
        return res
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
    func rangeSumBST(_ root: TreeNode?, _ low: Int, _ high: Int) -> Int {
        guard let root = root else { return 0 }

        var res = (root.val >= low && root.val <= high) ? root.val : 0
        res += rangeSumBST(root.left, low, high)
        res += rangeSumBST(root.right, low, high)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Depth First Search (Optimal)

### Intuition

We can leverage the BST property to prune unnecessary branches. If the current node's value is greater than high, all values in the right subtree are also too large, so we only need to search left. Similarly, if the current value is less than low, we only search right. This eliminates entire subtrees that cannot contribute to the sum.

### Algorithm

1. Base case: if the node is null, return 0.
2. If the current value exceeds high, skip the right subtree and recurse only on the left.
3. If the current value is below low, skip the left subtree and recurse only on the right.
4. Otherwise, the current value is in range. Add it to the sum of both subtree results.
5. Return the computed sum.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rangeSumBST(self, root: Optional[TreeNode], low: int, high: int) -> int:
        if not root:
            return 0

        if root.val > high:
            return self.rangeSumBST(root.left, low, high)
        if root.val < low:
            return self.rangeSumBST(root.right, low, high)

        return (
            root.val +
            self.rangeSumBST(root.left, low, high) +
            self.rangeSumBST(root.right, low, high)
        )
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
    public int rangeSumBST(TreeNode root, int low, int high) {
        if (root == null) return 0;

        if (root.val > high) {
            return rangeSumBST(root.left, low, high);
        }
        if (root.val < low) {
            return rangeSumBST(root.right, low, high);
        }

        return root.val + rangeSumBST(root.left, low, high) +
                          rangeSumBST(root.right, low, high);
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
    int rangeSumBST(TreeNode* root, int low, int high) {
        if (!root) return 0;

        if (root->val > high) {
            return rangeSumBST(root->left, low, high);
        }
        if (root->val < low) {
            return rangeSumBST(root->right, low, high);
        }

        return root->val + rangeSumBST(root->left, low, high) +
                           rangeSumBST(root->right, low, high);
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
     * @return {number}
     */
    rangeSumBST(root, low, high) {
        if (!root) return 0;

        if (root.val > high) {
            return rangeSumBST(root.left, low, high);
        }
        if (root.val < low) {
            return rangeSumBST(root.right, low, high);
        }

        return (
            root.val +
            this.rangeSumBST(root.left, low, high) +
            this.rangeSumBST(root.right, low, high)
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
    public int RangeSumBST(TreeNode root, int low, int high) {
        if (root == null) return 0;

        if (root.val > high) {
            return RangeSumBST(root.left, low, high);
        }
        if (root.val < low) {
            return RangeSumBST(root.right, low, high);
        }

        return root.val
             + RangeSumBST(root.left, low, high)
             + RangeSumBST(root.right, low, high);
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
func rangeSumBST(root *TreeNode, low int, high int) int {
    if root == nil {
        return 0
    }

    if root.Val > high {
        return rangeSumBST(root.Left, low, high)
    }
    if root.Val < low {
        return rangeSumBST(root.Right, low, high)
    }

    return root.Val + rangeSumBST(root.Left, low, high) + rangeSumBST(root.Right, low, high)
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
    fun rangeSumBST(root: TreeNode?, low: Int, high: Int): Int {
        if (root == null) return 0

        if (root.`val` > high) {
            return rangeSumBST(root.left, low, high)
        }
        if (root.`val` < low) {
            return rangeSumBST(root.right, low, high)
        }

        return root.`val` + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high)
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
    func rangeSumBST(_ root: TreeNode?, _ low: Int, _ high: Int) -> Int {
        guard let root = root else { return 0 }

        if root.val > high {
            return rangeSumBST(root.left, low, high)
        }
        if root.val < low {
            return rangeSumBST(root.right, low, high)
        }

        return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high)
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

The recursive solution can be converted to an iterative one using an explicit stack. We maintain the same pruning logic: only push children onto the stack if they might contain values in range. This avoids function call overhead while preserving the efficiency of the optimal approach.

### Algorithm

1. Initialize a stack with the root node and a result variable set to 0.
2. While the stack is not empty:
   - Pop a node. If null, continue.
   - If the node's value is in range [low, high], add it to the result.
   - If the node's value is greater than low, push the left child.
   - If the node's value is less than high, push the right child.
3. Return the accumulated result.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rangeSumBST(self, root: Optional[TreeNode], low: int, high: int) -> int:
        stack = [root]
        res = 0

        while stack:
            node = stack.pop()
            if not node:
                continue

            if low <= node.val <= high:
                res += node.val
            if node.val > low:
                stack.append(node.left)
            if node.val < high:
                stack.append(node.right)

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
    public int rangeSumBST(TreeNode root, int low, int high) {
        int res = 0;
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node == null) continue;

            if (low <= node.val && node.val <= high) {
                res += node.val;
            }
            if (node.val > low) {
                stack.push(node.left);
            }
            if (node.val < high) {
                stack.push(node.right);
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
    int rangeSumBST(TreeNode* root, int low, int high) {
        int res = 0;
        stack<TreeNode*> stack;
        stack.push(root);

        while (!stack.empty()) {
            TreeNode* node = stack.top();
            stack.pop();
            if (!node) continue;

            if (low <= node->val && node->val <= high) {
                res += node->val;
            }
            if (node->val > low) {
                stack.push(node->left);
            }
            if (node->val < high) {
                stack.push(node->right);
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
     * @param {number} low
     * @param {number} high
     * @return {number}
     */
    rangeSumBST(root, low, high) {
        let res = 0;
        let stack = [root];

        while (stack.length > 0) {
            let node = stack.pop();
            if (!node) continue;

            if (low <= node.val && node.val <= high) {
                res += node.val;
            }
            if (node.val > low) {
                stack.push(node.left);
            }
            if (node.val < high) {
                stack.push(node.right);
            }
        }

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
    public int RangeSumBST(TreeNode root, int low, int high) {
        var stack = new Stack<TreeNode>();
        stack.Push(root);
        int res = 0;

        while (stack.Count > 0) {
            var node = stack.Pop();
            if (node == null) continue;

            if (node.val >= low && node.val <= high) {
                res += node.val;
            }
            if (node.val > low) {
                stack.Push(node.left);
            }
            if (node.val < high) {
                stack.Push(node.right);
            }
        }

        return res;
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
func rangeSumBST(root *TreeNode, low int, high int) int {
    stack := []*TreeNode{root}
    res := 0

    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if node == nil {
            continue
        }

        if node.Val >= low && node.Val <= high {
            res += node.Val
        }
        if node.Val > low {
            stack = append(stack, node.Left)
        }
        if node.Val < high {
            stack = append(stack, node.Right)
        }
    }

    return res
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
    fun rangeSumBST(root: TreeNode?, low: Int, high: Int): Int {
        val stack = ArrayDeque<TreeNode?>()
        stack.addLast(root)
        var res = 0

        while (stack.isNotEmpty()) {
            val node = stack.removeLast() ?: continue

            if (node.`val` in low..high) {
                res += node.`val`
            }
            if (node.`val` > low) {
                stack.addLast(node.left)
            }
            if (node.`val` < high) {
                stack.addLast(node.right)
            }
        }

        return res
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
    func rangeSumBST(_ root: TreeNode?, _ low: Int, _ high: Int) -> Int {
        var stack: [TreeNode?] = [root]
        var res = 0

        while !stack.isEmpty {
            guard let node = stack.removeLast() else { continue }

            if node.val >= low && node.val <= high {
                res += node.val
            }
            if node.val > low {
                stack.append(node.left)
            }
            if node.val < high {
                stack.append(node.right)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
