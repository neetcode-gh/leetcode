## 1. Depth First Search (Two Pass)

### Intuition
For each node in a BST, the Greater Tree value should be the sum of all nodes with values greater than or equal to the current node. In a BST, all greater values are found in the right subtree and ancestors that are greater. A simple two-pass approach first calculates the total sum of all nodes, then traverses in-order (left to right). As we visit each node, we update its value to the remaining sum and subtract its original value from the total.

### Algorithm
1. First pass: Recursively calculate the sum of all node values in the tree.
2. Second pass: Perform an in-order traversal (left, current, right).
3. At each node during the second pass:
   - Save the original value temporarily.
   - Update the node's value to the current total sum (which represents all values >= this node).
   - Subtract the original value from the total sum for subsequent nodes.
4. Return the modified root.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        def getSum(node):
            if not node:
                return 0
            return node.val + getSum(node.left) + getSum(node.right)

        totalSum = getSum(root)

        def dfs(node):
            nonlocal totalSum
            if not node:
                return

            dfs(node.left)
            tmp = node.val
            node.val = totalSum
            totalSum -= tmp
            dfs(node.right)

        dfs(root)
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
    private int totalSum;

    public TreeNode convertBST(TreeNode root) {
        totalSum = getSum(root);
        dfs(root);
        return root;
    }

    private int getSum(TreeNode node) {
        if (node == null) return 0;
        return node.val + getSum(node.left) + getSum(node.right);
    }

    private void dfs(TreeNode node) {
        if (node == null) return;

        dfs(node.left);
        int tmp = node.val;
        node.val = totalSum;
        totalSum -= tmp;
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
    int totalSum;

    TreeNode* convertBST(TreeNode* root) {
        totalSum = getSum(root);
        dfs(root);
        return root;
    }

private:
    int getSum(TreeNode* node) {
        if (!node) return 0;
        return node->val + getSum(node->left) + getSum(node->right);
    }

    void dfs(TreeNode* node) {
        if (!node) return;

        dfs(node->left);
        int tmp = node->val;
        node->val = totalSum;
        totalSum -= tmp;
        dfs(node->right);
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
     * @return {TreeNode}
     */
    convertBST(root) {
        const getSum = (node) => {
            if (!node) return 0;
            return node.val + getSum(node.left) + getSum(node.right);
        };

        let totalSum = getSum(root);

        const dfs = (node) => {
            if (!node) return;

            dfs(node.left);
            let tmp = node.val;
            node.val = totalSum;
            totalSum -= tmp;
            dfs(node.right);
        };

        dfs(root);
        return root;
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
    public TreeNode ConvertBST(TreeNode root) {
        int GetSum(TreeNode node) {
            if (node == null) return 0;
            return node.val + GetSum(node.left) + GetSum(node.right);
        }

        int totalSum = GetSum(root);

        void Dfs(TreeNode node) {
            if (node == null) return;

            Dfs(node.left);
            int tmp = node.val;
            node.val = totalSum;
            totalSum -= tmp;
            Dfs(node.right);
        }

        Dfs(root);
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
func convertBST(root *TreeNode) *TreeNode {
    var getSum func(node *TreeNode) int
    getSum = func(node *TreeNode) int {
        if node == nil {
            return 0
        }
        return node.Val + getSum(node.Left) + getSum(node.Right)
    }

    totalSum := getSum(root)

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }
        dfs(node.Left)
        tmp := node.Val
        node.Val = totalSum
        totalSum -= tmp
        dfs(node.Right)
    }

    dfs(root)
    return root
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int = 0) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun convertBST(root: TreeNode?): TreeNode? {
        fun getSum(node: TreeNode?): Int {
            if (node == null) return 0
            return node.`val` + getSum(node.left) + getSum(node.right)
        }

        var totalSum = getSum(root)

        fun dfs(node: TreeNode?) {
            if (node == null) return
            dfs(node.left)
            val tmp = node.`val`
            node.`val` = totalSum
            totalSum -= tmp
            dfs(node.right)
        }

        dfs(root)
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
    func convertBST(_ root: TreeNode?) -> TreeNode? {
        func getSum(_ node: TreeNode?) -> Int {
            guard let node = node else { return 0 }
            return node.val + getSum(node.left) + getSum(node.right)
        }

        var totalSum = getSum(root)

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }
            dfs(node.left)
            let tmp = node.val
            node.val = totalSum
            totalSum -= tmp
            dfs(node.right)
        }

        dfs(root)
        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Depth First Search (One Pass)

### Intuition
We can do this in a single pass by traversing the tree in reverse in-order (right, current, left). In a BST, this visits nodes from largest to smallest. We maintain a running sum of all nodes visited so far. When we visit a node, all previously visited nodes have greater values, so we add the current node's value to our running sum and update the node to this sum.

### Algorithm
1. Initialize a running sum variable to `0`.
2. Perform a reverse in-order traversal: first visit the right subtree, then the current node, then the left subtree.
3. At each node:
   - Save the node's original value.
   - Add the running sum to the node's value (this gives the sum of all greater nodes plus itself).
   - Add the original value to the running sum for future nodes.
4. Continue until all nodes are processed and return the root.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        curSum = 0

        def dfs(node):
            nonlocal curSum
            if not node:
                return

            dfs(node.right)
            tmp = node.val
            node.val += curSum
            curSum += tmp
            dfs(node.left)

        dfs(root)
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
    private int curSum = 0;

    public TreeNode convertBST(TreeNode root) {
        dfs(root);
        return root;
    }

    private void dfs(TreeNode node) {
        if (node == null) return;

        dfs(node.right);
        int tmp = node.val;
        node.val += curSum;
        curSum += tmp;
        dfs(node.left);
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
    int curSum = 0;

    TreeNode* convertBST(TreeNode* root) {
        dfs(root);
        return root;
    }

private:
    void dfs(TreeNode* node) {
        if (!node) return;

        dfs(node->right);
        int tmp = node->val;
        node->val += curSum;
        curSum += tmp;
        dfs(node->left);
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
     * @return {TreeNode}
     */
    convertBST(root) {
        let curSum = 0;

        const dfs = (node) => {
            if (!node) return;

            dfs(node.right);
            let tmp = node.val;
            node.val += curSum;
            curSum += tmp;
            dfs(node.left);
        };

        dfs(root);
        return root;
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
    public TreeNode ConvertBST(TreeNode root) {
        int curSum = 0;

        void Dfs(TreeNode node) {
            if (node == null) return;

            Dfs(node.right);
            int tmp = node.val;
            node.val += curSum;
            curSum += tmp;
            Dfs(node.left);
        }

        Dfs(root);
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
func convertBST(root *TreeNode) *TreeNode {
    curSum := 0

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }
        dfs(node.Right)
        tmp := node.Val
        node.Val += curSum
        curSum += tmp
        dfs(node.Left)
    }

    dfs(root)
    return root
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int = 0) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun convertBST(root: TreeNode?): TreeNode? {
        var curSum = 0

        fun dfs(node: TreeNode?) {
            if (node == null) return
            dfs(node.right)
            val tmp = node.`val`
            node.`val` += curSum
            curSum += tmp
            dfs(node.left)
        }

        dfs(root)
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
    func convertBST(_ root: TreeNode?) -> TreeNode? {
        var curSum = 0

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }
            dfs(node.right)
            let tmp = node.val
            node.val += curSum
            curSum += tmp
            dfs(node.left)
        }

        dfs(root)
        return root
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
The recursive reverse in-order traversal can be converted to an iterative version using a stack. We simulate the call stack explicitly, pushing nodes as we traverse right, then processing them in order. This achieves the same result as the recursive one-pass solution but avoids recursion overhead and potential stack overflow for very deep trees.

### Algorithm
1. Initialize a running sum to `0` and an empty stack.
2. Start with the root node and traverse as far right as possible, pushing each node onto the stack.
3. Pop a node from the stack:
   - Add its value to the running sum.
   - Update the node's value to the running sum.
   - Move to its left child and repeat the right-traversal process.
4. Continue until the stack is empty and there are no more nodes to process.
5. Return the root.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        curSum = 0
        stack = []
        node = root

        while stack or node:
            while node:
                stack.append(node)
                node = node.right

            node = stack.pop()
            curSum += node.val
            node.val = curSum
            node = node.left

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
    public TreeNode convertBST(TreeNode root) {
        int curSum = 0;
        Stack<TreeNode> stack = new Stack<>();
        TreeNode node = root;

        while (!stack.isEmpty() || node != null) {
            while (node != null) {
                stack.push(node);
                node = node.right;
            }

            node = stack.pop();
            curSum += node.val;
            node.val = curSum;
            node = node.left;
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
    TreeNode* convertBST(TreeNode* root) {
        int curSum = 0;
        stack<TreeNode*> st;
        TreeNode* node = root;

        while (!st.empty() || node) {
            while (node) {
                st.push(node);
                node = node->right;
            }

            node = st.top(); st.pop();
            curSum += node->val;
            node->val = curSum;
            node = node->left;
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
     * @return {TreeNode}
     */
    convertBST(root) {
        let curSum = 0;
        const stack = [];
        let node = root;

        while (stack.length || node) {
            while (node) {
                stack.push(node);
                node = node.right;
            }

            node = stack.pop();
            curSum += node.val;
            node.val = curSum;
            node = node.left;
        }
        return root;
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
    public TreeNode ConvertBST(TreeNode root) {
        int curSum = 0;
        Stack<TreeNode> stack = new Stack<TreeNode>();
        TreeNode node = root;

        while (stack.Count > 0 || node != null) {
            while (node != null) {
                stack.Push(node);
                node = node.right;
            }

            node = stack.Pop();
            curSum += node.val;
            node.val = curSum;
            node = node.left;
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
func convertBST(root *TreeNode) *TreeNode {
    curSum := 0
    stack := []*TreeNode{}
    node := root

    for len(stack) > 0 || node != nil {
        for node != nil {
            stack = append(stack, node)
            node = node.Right
        }

        node = stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        curSum += node.Val
        node.Val = curSum
        node = node.Left
    }

    return root
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int = 0) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun convertBST(root: TreeNode?): TreeNode? {
        var curSum = 0
        val stack = ArrayDeque<TreeNode>()
        var node = root

        while (stack.isNotEmpty() || node != null) {
            while (node != null) {
                stack.addLast(node)
                node = node.right
            }

            node = stack.removeLast()
            curSum += node.`val`
            node.`val` = curSum
            node = node.left
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
    func convertBST(_ root: TreeNode?) -> TreeNode? {
        var curSum = 0
        var stack = [TreeNode]()
        var node = root

        while !stack.isEmpty || node != nil {
            while node != nil {
                stack.append(node!)
                node = node?.right
            }

            node = stack.removeLast()
            curSum += node!.val
            node!.val = curSum
            node = node?.left
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

## 4. Morris Traversal

### Intuition
Morris traversal allows us to traverse a tree without using extra space for a stack or recursion. It works by temporarily modifying the tree structure to create links back to ancestor nodes, then restoring the original structure. For this problem, we use reverse Morris in-order traversal to visit nodes from largest to smallest while maintaining only O(1) extra space.

### Algorithm
1. Initialize a running sum to `0` and start at the root.
2. While the current node is not `null`:
   - If the current node has a right child, find its in-order predecessor in the right subtree (the leftmost node).
   - If the predecessor's left child is `null`, set it to point to the current node (create a thread) and move to the right child.
   - If the predecessor's left child points to the current node, remove the thread, process the current node (add to running sum and update value), and move to the left child.
   - If there's no right child, process the current node and move to the left child.
3. Return the root after all nodes are processed.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        curSum = 0
        cur = root

        while cur:
            if cur.right:
                prev = cur.right
                while prev.left and prev.left != cur:
                    prev = prev.left

                if not prev.left:
                    prev.left = cur
                    cur = cur.right
                else:
                    prev.left = None
                    curSum += cur.val
                    cur.val = curSum
                    cur = cur.left
            else:
                curSum += cur.val
                cur.val = curSum
                cur = cur.left

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
    public TreeNode convertBST(TreeNode root) {
        int curSum = 0;
        TreeNode cur = root;

        while (cur != null) {
            if (cur.right != null) {
                TreeNode prev = cur.right;
                while (prev.left != null && prev.left != cur) {
                    prev = prev.left;
                }

                if (prev.left == null) {
                    prev.left = cur;
                    cur = cur.right;
                } else {
                    prev.left = null;
                    curSum += cur.val;
                    cur.val = curSum;
                    cur = cur.left;
                }
            } else {
                curSum += cur.val;
                cur.val = curSum;
                cur = cur.left;
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
    TreeNode* convertBST(TreeNode* root) {
        int curSum = 0;
        TreeNode* cur = root;

        while (cur) {
            if (cur->right) {
                TreeNode* prev = cur->right;
                while (prev->left && prev->left != cur) {
                    prev = prev->left;
                }

                if (!prev->left) {
                    prev->left = cur;
                    cur = cur->right;
                } else {
                    prev->left = nullptr;
                    curSum += cur->val;
                    cur->val = curSum;
                    cur = cur->left;
                }
            } else {
                curSum += cur->val;
                cur->val = curSum;
                cur = cur->left;
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
     * @return {TreeNode}
     */
    convertBST(root) {
        let curSum = 0;
        let cur = root;

        while (cur) {
            if (cur.right) {
                let prev = cur.right;
                while (prev.left && prev.left !== cur) {
                    prev = prev.left;
                }

                if (!prev.left) {
                    prev.left = cur;
                    cur = cur.right;
                } else {
                    prev.left = null;
                    curSum += cur.val;
                    cur.val = curSum;
                    cur = cur.left;
                }
            } else {
                curSum += cur.val;
                cur.val = curSum;
                cur = cur.left;
            }
        }
        return root;
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
    public TreeNode ConvertBST(TreeNode root) {
        int curSum = 0;
        TreeNode cur = root;

        while (cur != null) {
            if (cur.right != null) {
                TreeNode prev = cur.right;
                while (prev.left != null && prev.left != cur) {
                    prev = prev.left;
                }

                if (prev.left == null) {
                    prev.left = cur;
                    cur = cur.right;
                } else {
                    prev.left = null;
                    curSum += cur.val;
                    cur.val = curSum;
                    cur = cur.left;
                }
            } else {
                curSum += cur.val;
                cur.val = curSum;
                cur = cur.left;
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
func convertBST(root *TreeNode) *TreeNode {
    curSum := 0
    cur := root

    for cur != nil {
        if cur.Right != nil {
            prev := cur.Right
            for prev.Left != nil && prev.Left != cur {
                prev = prev.Left
            }

            if prev.Left == nil {
                prev.Left = cur
                cur = cur.Right
            } else {
                prev.Left = nil
                curSum += cur.Val
                cur.Val = curSum
                cur = cur.Left
            }
        } else {
            curSum += cur.Val
            cur.Val = curSum
            cur = cur.Left
        }
    }

    return root
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int = 0) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun convertBST(root: TreeNode?): TreeNode? {
        var curSum = 0
        var cur = root

        while (cur != null) {
            if (cur.right != null) {
                var prev = cur.right
                while (prev!!.left != null && prev.left != cur) {
                    prev = prev.left
                }

                if (prev.left == null) {
                    prev.left = cur
                    cur = cur.right
                } else {
                    prev.left = null
                    curSum += cur.`val`
                    cur.`val` = curSum
                    cur = cur.left
                }
            } else {
                curSum += cur.`val`
                cur.`val` = curSum
                cur = cur.left
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
    func convertBST(_ root: TreeNode?) -> TreeNode? {
        var curSum = 0
        var cur = root

        while cur != nil {
            if cur!.right != nil {
                var prev = cur!.right
                while prev!.left != nil && prev!.left !== cur {
                    prev = prev!.left
                }

                if prev!.left == nil {
                    prev!.left = cur
                    cur = cur!.right
                } else {
                    prev!.left = nil
                    curSum += cur!.val
                    cur!.val = curSum
                    cur = cur!.left
                }
            } else {
                curSum += cur!.val
                cur!.val = curSum
                cur = cur!.left
            }
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Using Standard In-Order Traversal Instead of Reverse In-Order
Standard in-order traversal visits nodes from smallest to largest. For the Greater Tree, we need to accumulate sums from larger values first, requiring reverse in-order (right, node, left).

```python
# Wrong - standard in-order (left, node, right)
dfs(node.left)
node.val += curSum
dfs(node.right)

# Correct - reverse in-order (right, node, left)
dfs(node.right)
node.val += curSum
dfs(node.left)
```

### Incorrect Order of Update and Accumulation
A subtle bug occurs when you add to `curSum` before updating the node's value, or update the node before adding the original value to `curSum`. The sequence must be: save original, update node with accumulated sum, then add original to running sum.

```python
# Wrong - loses original value
curSum += node.val
node.val = curSum  # curSum already includes node.val

# Correct
tmp = node.val
node.val += curSum
curSum += tmp
```

### Forgetting to Handle Null Nodes in Recursive Calls
Without a proper base case, the recursion will crash when reaching null children. Always check for null before processing a node.

```python
# Wrong - crashes on null nodes
def dfs(node):
    dfs(node.right)  # NullPointerException if node is None

# Correct
def dfs(node):
    if not node:
        return
    dfs(node.right)
```
