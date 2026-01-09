## 1. Pre-Order Traversal

### Intuition

The most direct approach is to check every subtree: if a subtree is a valid BST, count its nodes. To verify the BST property, we need to ensure that every node in the left subtree is smaller than the current node, and every node in the right subtree is larger. We do this by finding the maximum value in the left subtree and the minimum value in the right subtree, then comparing them against the current node.

### Algorithm

1. For each node, check if its subtree is a valid BST:
   - Find the maximum value in the left subtree; it must be less than the current node's value.
   - Find the minimum value in the right subtree; it must be greater than the current node's value.
   - Recursively verify that both left and right subtrees are also valid BSTs.
2. If the current subtree is a valid BST, count and return the number of nodes.
3. Otherwise, recursively search the left and right subtrees and return the maximum size found.

::tabs-start

```python
class Solution:
    def is_valid_bst(self, root: Optional[TreeNode]) -> bool:
        """Check if given tree is a valid Binary Search Tree."""
        # An empty tree is a valid Binary Search Tree.
        if not root:
            return True

        # Find the max node in the left subtree of current node.
        left_max = self.find_max(root.left)

        # If the left subtree has a node greater than or equal to the current node,
        # then it is not a valid Binary Search Tree.
        if left_max >= root.val:
            return False

        # Find the min node in the right subtree of current node.
        right_min = self.find_min(root.right)

        # If the right subtree has a value less than or equal to the current node,
        # then it is not a valid Binary Search Tree.
        if right_min <= root.val:
            return False

        # If the left and right subtrees of current tree are also valid BST.
        # then the whole tree is a BST.
        return self.is_valid_bst(root.left) and self.is_valid_bst(root.right)

    def find_max(self, root: Optional[TreeNode]) -> int:
        # Max node in a empty tree should be smaller than parent.
        if not root:
            return float('-inf')
    
        # Check the maximum node from the current node, left and right subtree of the current tree.
        return max(root.val, self.find_max(root.left), self.find_max(root.right))

    def find_min(self, root: Optional[TreeNode]) -> int:
        # Min node in a empty tree should be larger than parent.
        if not root:
            return float('inf')
        
        # Check the minimum node from the current node, left and right subtree of the current tree
        return min(root.val, self.find_min(root.left), self.find_min(root.right))

    def count_nodes(self, root: Optional[TreeNode]) -> int:
        if not root: 
            return 0

        # Add nodes in left and right subtree.
        # Add 1 and return total size.
        return 1 + self.count_nodes(root.left) + self.count_nodes(root.right) 

    def largestBSTSubtree(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        
        # If current subtree is a validBST, its children will have smaller size BST.
        if self.is_valid_bst(root):
            return self.count_nodes(root)
        
        # Find BST in left and right subtrees of current nodes.
        return max(self.largestBSTSubtree(root.left), self.largestBSTSubtree(root.right))
```

```java
class Solution {
    // Function to check if given tree is a valid Binary Search Tree or not.
    private boolean isValidBST(TreeNode root) {
        // An empty tree is a valid Binary Search Tree.
        if (root == null) {
            return true;
        }

        // Find the max node in the left subtree of current node.
        int leftMax = findMax(root.left);

        // If the left subtree has a node greater than or equal to the current node,
        // then it is not a valid Binary Search Tree.
        if (leftMax >= root.val) {
            return false;
        }

        // Find the min node in the right subtree of current node.
        int rightMin = findMin(root.right);

        // If the right subtree has a value less than or equal to the current node,
        // then it is not a valid Binary Search Tree.
        if (rightMin <= root.val) {
            return false;
        }

        // If the left and right subtrees of current tree are also valid BST.
        // then the whole tree is a BST.
        if (isValidBST(root.left) && isValidBST(root.right)) {
            return true;
        }
        
        return false;
    }

    private int findMax(TreeNode root) {
        // Max node in a empty tree should be smaller than parent.
        if (root == null) {
            return Integer.MIN_VALUE;
        }
        
        // Check the maximum node from the current node, left and right subtree of the current tree
        return Math.max(Math.max(root.val, findMax(root.left)), findMax(root.right));
    }

    private int findMin(TreeNode root) {
        // Min node in a empty tree should be larger than parent.
        if (root == null) {
            return Integer.MAX_VALUE;
        }
        
        // Check the minimum node from the current node, left and right subtree of the current tree
        return Math.min(Math.min(root.val, findMin(root.left)), findMin(root.right));
    }
    
    private int countNodes(TreeNode root) {
        // Empty tree has 0 nodes.
        if (root == null) {
             return 0;
        }
        
        // Add nodes in left and right subtree.
        // Add 1 and return total size.
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
    
    public int largestBSTSubtree(TreeNode root) {
        if (root == null) {
            return 0;
        }
        
        // If current subtree is a validBST, its children will have smaller size BST.
        if (isValidBST(root)) {
            return countNodes(root);
        }
        
        // Find BST in left and right subtrees of current nodes.
        return Math.max(largestBSTSubtree(root.left), largestBSTSubtree(root.right));
    }
}
```

```cpp
class Solution {
public:
    // Function to check if given tree is a valid Binary Search Tree or not.
    bool isValidBST(TreeNode* root) {
        // An empty tree is a valid Binary Search Tree.
        if (!root) {
            return true;
        }

        // Find the max node in the left subtree of current node.
        int leftMax = findMax(root->left);

        // If the left subtree has a node greater than or equal to the current node,
        // then it is not a valid Binary Search Tree.
        if (leftMax >= root->val) {
            return false;
        }
        
        // Find the min node in the right subtree of current node.
        int rightMin = findMin(root->right);

        // If the right subtree has a value less than or equal to the current node,
        // then it is not a valid Binary Search Tree.
        if (rightMin <= root->val) {
            return false;
        }

        // If the left and right subtrees of current tree are also valid BST.
        // then the whole tree is a BST.
        if (isValidBST(root->left) && isValidBST(root->right)) {
            return true;
        }
        
        return false;
    }

    int findMax(TreeNode* root) {
        // Max node in a empty tree should be smaller than parent.
        if (!root) {
            return INT_MIN;
        }

        // Check the maximum node from the current node, left and right subtree of the current tree
        return max({ root->val, findMax(root->left), findMax(root->right) });
    }

    int findMin(TreeNode* root) {
        // Min node in a empty tree should be larger than parent.
        if (!root) {
            return INT_MAX;
        }

        // Check the minimum node from the current node, left and right subtree of the current tree
        return min({ root->val, findMin(root->left), findMin(root->right) });
    }
    
    int countNodes(TreeNode* root) {
        // Empty tree has 0 nodes.
        if (!root) {
            return 0;
        }
        
        // Add nodes in left and right subtree.
        // Add 1 and return total size.
        return 1 + countNodes(root->left) + countNodes(root->right);
    }
    
    int largestBSTSubtree(TreeNode* root) {
        if (!root) {
            return 0;
        }
        
        // If current subtree is a validBST, its children will have smaller size BST.
        if (isValidBST(root)) {
            return countNodes(root);
        }
        
        // Find BST in left and right subtrees of current nodes.
        return max(largestBSTSubtree(root->right), largestBSTSubtree(root->left));
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    largestBSTSubtree(root) {
        if (!root) {
            return 0;
        }

        // If current subtree is a validBST, its children will have smaller size BST.
        if (this.isValidBST(root)) {
            return this.countNodes(root);
        }
        // Find BST in left and right subtrees of current nodes.
        return Math.max(this.largestBSTSubtree(root.left), this.largestBSTSubtree(root.right));
    }

    // Function to check if given tree is a valid Binary Search Tree or not.
    isValidBST(root) {
        // An empty tree is a valid Binary Search Tree.
        if (!root) {
            return true;
        }
        // Find the max node in the left subtree of current node.
        let leftMax = this.findMax(root.left);
        // If the left subtree has a node greater than or equal to the current node,
        // then it is not a valid Binary Search Tree.
        if (leftMax >= root.val) {
            return false;
        }
        // Find the min node in the right subtree of current node.
        let rightMin = this.findMin(root.right);
        // If the right subtree has a value less than or equal to the current node,
        // then it is not a valid Binary Search Tree.
        if (rightMin <= root.val) {
            return false;
        }
        // If the left and right subtrees of current tree are also valid BST.
        // then the whole tree is a BST.
        if (this.isValidBST(root.left) && this.isValidBST(root.right)) {
            return true;
        }
        return false;
    }

    findMax(root) {
        // Max node in a empty tree should me smaller than parent.
        if (!root) {
            return Number.MIN_SAFE_INTEGER;
        }

        // Check the maximum node from the current node, left and right subtree of the current tree
        return Math.max(root.val, this.findMax(root.left), this.findMax(root.right));
    }

    findMin(root) {
        // Min node in a empty tree should me larger than parent.
        if (!root) {
            return Number.MAX_SAFE_INTEGER;
        }

        // Check the minimum node from the current node, left and right subtree of the current tree
        return Math.min(root.val, this.findMin(root.left), this.findMin(root.right));
    }

    countNodes(root) {
        // Empty tree has 0 nodes.
        if (!root) {
            return 0;
        }
        // Add nodes in left and right subtree.
        // Add 1 and return total size.
        return 1 + this.countNodes(root.left) + this.countNodes(root.right);
    }
}
```

```csharp
public class Solution {
    public int LargestBSTSubtree(TreeNode root) {
        if (root == null) {
            return 0;
        }

        if (IsValidBST(root)) {
            return CountNodes(root);
        }

        return Math.Max(LargestBSTSubtree(root.left), LargestBSTSubtree(root.right));
    }

    private bool IsValidBST(TreeNode root) {
        if (root == null) {
            return true;
        }

        int leftMax = FindMax(root.left);
        if (leftMax >= root.val) {
            return false;
        }

        int rightMin = FindMin(root.right);
        if (rightMin <= root.val) {
            return false;
        }

        return IsValidBST(root.left) && IsValidBST(root.right);
    }

    private int FindMax(TreeNode root) {
        if (root == null) {
            return int.MinValue;
        }
        return Math.Max(root.val, Math.Max(FindMax(root.left), FindMax(root.right)));
    }

    private int FindMin(TreeNode root) {
        if (root == null) {
            return int.MaxValue;
        }
        return Math.Min(root.val, Math.Min(FindMin(root.left), FindMin(root.right)));
    }

    private int CountNodes(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return 1 + CountNodes(root.left) + CountNodes(root.right);
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
func largestBSTSubtree(root *TreeNode) int {
    if root == nil {
        return 0
    }

    if isValidBST(root) {
        return countNodes(root)
    }

    return max(largestBSTSubtree(root.Left), largestBSTSubtree(root.Right))
}

func isValidBST(root *TreeNode) bool {
    if root == nil {
        return true
    }

    leftMax := findMax(root.Left)
    if leftMax >= root.Val {
        return false
    }

    rightMin := findMin(root.Right)
    if rightMin <= root.Val {
        return false
    }

    return isValidBST(root.Left) && isValidBST(root.Right)
}

func findMax(root *TreeNode) int {
    if root == nil {
        return math.MinInt32
    }
    return max(root.Val, max(findMax(root.Left), findMax(root.Right)))
}

func findMin(root *TreeNode) int {
    if root == nil {
        return math.MaxInt32
    }
    return min(root.Val, min(findMin(root.Left), findMin(root.Right)))
}

func countNodes(root *TreeNode) int {
    if root == nil {
        return 0
    }
    return 1 + countNodes(root.Left) + countNodes(root.Right)
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
    fun largestBSTSubtree(root: TreeNode?): Int {
        if (root == null) return 0

        if (isValidBST(root)) {
            return countNodes(root)
        }

        return maxOf(largestBSTSubtree(root.left), largestBSTSubtree(root.right))
    }

    private fun isValidBST(root: TreeNode?): Boolean {
        if (root == null) return true

        val leftMax = findMax(root.left)
        if (leftMax >= root.`val`) return false

        val rightMin = findMin(root.right)
        if (rightMin <= root.`val`) return false

        return isValidBST(root.left) && isValidBST(root.right)
    }

    private fun findMax(root: TreeNode?): Int {
        if (root == null) return Int.MIN_VALUE
        return maxOf(root.`val`, maxOf(findMax(root.left), findMax(root.right)))
    }

    private fun findMin(root: TreeNode?): Int {
        if (root == null) return Int.MAX_VALUE
        return minOf(root.`val`, minOf(findMin(root.left), findMin(root.right)))
    }

    private fun countNodes(root: TreeNode?): Int {
        if (root == null) return 0
        return 1 + countNodes(root.left) + countNodes(root.right)
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
    func largestBSTSubtree(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }

        if isValidBST(root) {
            return countNodes(root)
        }

        return max(largestBSTSubtree(root.left), largestBSTSubtree(root.right))
    }

    private func isValidBST(_ root: TreeNode?) -> Bool {
        guard let root = root else { return true }

        let leftMax = findMax(root.left)
        if leftMax >= root.val { return false }

        let rightMin = findMin(root.right)
        if rightMin <= root.val { return false }

        return isValidBST(root.left) && isValidBST(root.right)
    }

    private func findMax(_ root: TreeNode?) -> Int {
        guard let root = root else { return Int.min }
        return max(root.val, max(findMax(root.left), findMax(root.right)))
    }

    private func findMin(_ root: TreeNode?) -> Int {
        guard let root = root else { return Int.max }
        return min(root.val, min(findMin(root.left), findMin(root.right)))
    }

    private func countNodes(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }
        return 1 + countNodes(root.left) + countNodes(root.right)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^3)$
- Space complexity: $O(N)$
    - The recursion call stack can take at most $O(H)$ space; in the worst-case scenario, the height of the tree will equal $N$.

>  Where $N$ and $H$ are the number of nodes and the max height of the given tree respectively

---

## 2. Pre-Order Traversal Optimized

### Intuition

Instead of finding the min/max of entire subtrees, we can validate the BST using in-order traversal. In a valid BST, an in-order traversal visits nodes in strictly increasing order. By tracking the previously visited node during the traversal, we can verify the BST property in a single pass through each subtree, which reduces redundant work.

### Algorithm

1. For each node, validate the BST using in-order traversal:
   - Recursively validate the left subtree first.
   - Check that the current node's value is greater than the previous node's value.
   - Update the previous node to the current node.
   - Recursively validate the right subtree.
2. If the subtree is a valid BST, count and return its nodes.
3. Otherwise, search the left and right subtrees and return the maximum size found.

::tabs-start

```python
class Solution:
    def is_valid_bst(self, root: Optional[TreeNode]) -> bool:
        """Check if given tree is a valid BST using in-order traversal."""
        # An empty tree is a valid Binary Search Tree.
        if not root:
            return True
        
        # If left subtree is not a valid BST return false.
        if not self.is_valid_bst(root.left):
            return False

        # If current node's value is not greater than the previous 
        # node's value in the in-order traversal return false.
        if self.previous and self.previous.val >= root.val:
            return False

        # Update previous node to current node.
        self.previous = root

        # If right subtree is not a valid BST return false.
        return self.is_valid_bst(root.right)

    # Count nodes in current tree.
    def count_nodes(self, root: Optional[TreeNode]) -> int:
        if not root: 
            return 0

        # Add nodes in left and right subtree.
        # Add 1 and return total size.
        return 1 + self.count_nodes(root.left) + self.count_nodes(root.right)
        
    def largestBSTSubtree(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        
        # Previous node is initially null.
        self.previous = None

        # If current subtree is a validBST, its children will have smaller size BST.
        if self.is_valid_bst(root):
            return self.count_nodes(root)
        
        # Find BST in left and right subtrees of current nodes.
        return max(self.largestBSTSubtree(root.left), self.largestBSTSubtree(root.right))
```

```java
class Solution {
    // Track previous node while doing inorder traversal.
    private TreeNode previous;
    
    // Function to check if given tree is a valid Binary Search Tree or not.
    private boolean isValidBST(TreeNode root) {
        // An empty tree is a valid Binary Search Tree.
        if (root == null) {
            return true;
        }

        // If left subtree is not a valid BST return false.
        if(!isValidBST(root.left)) {
            return false;
        }
        
        // If current node's value is not greater than the previous 
        // node's value in the in-order traversal return false.
        if (previous != null && previous.val >= root.val) {
            return false;
        }
        
        // Update previous node to current node.
        previous = root;
        
        // If right subtree is not a valid BST return false.
        return isValidBST(root.right);
    }

    private int countNodes(TreeNode root) {
        if (root == null) {
            return 0;
        }
        
        // Add nodes in left and right subtree.
        // Add 1 and return total size.
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
    
    public int largestBSTSubtree(TreeNode root) {
        if (root == null) {
            return 0;
        }
        
        // Set previous node to NULL initially.
        previous = null;
        
        // If current subtree is a validBST, its children will have smaller size BST.
        if (isValidBST(root)) {
            return countNodes(root);
        }
        
        // Find BST in left and right subtrees of current nodes.
        return Math.max(largestBSTSubtree(root.left), largestBSTSubtree(root.right));
    }
}
```

```cpp
class Solution {
public:
    // Track previous node while doing inorder traversal.
    TreeNode* previous = NULL;
    
    // Function to check if given tree is a valid Binary Search Tree or not.
    bool isValidBST(TreeNode* root) {
        // An empty tree is a valid Binary Search Tree.
        if (!root) {
            return true;
        }

        // If left subtree is not a valid BST return false.
        if(!isValidBST(root->left)) {
            return false;
        }
        
        // If current node's value is not greater than the previous 
        // node's value in the in-order traversal return false.
        if (previous && previous->val >= root->val) {
            return false;
        }
        
        // Update previous node to current node.
        previous = root;
        
        // If right subtree is not a valid BST return false.
        return isValidBST(root->right);
    }

    int countNodes(TreeNode* root) {
        if (!root) {
            return 0;
        }
        
        // Add nodes in left and right subtree.
        // Add 1 and return total size.
        return 1 + countNodes(root->left) + countNodes(root->right);
    }
    
    int largestBSTSubtree(TreeNode* root) {
        if (!root) {
            return 0;
        }
        
        // Set previous node to NULL initially.
        previous = NULL;
        
        // If current subtree is a validBST, its children will have smaller size BST.
        if (isValidBST(root)) {
            return countNodes(root);
        }
        
        // Find BST in left and right subtrees of current nodes.
        return max(largestBSTSubtree(root->left), largestBSTSubtree(root->right));
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    largestBSTSubtree(root) {
        if (!root) {
            return 0;
        }
        // Set previous node to NULL initially.
        this.previous = null;
        // If current subtree is a validBST, its children will have smaller size BST.
        if (this.isValidBST(root)) {
            return this.countNodes(root);
        }
        // Find BST in left and right subtrees of current nodes.
        return Math.max(this.largestBSTSubtree(root.left), this.largestBSTSubtree(root.right));
    }

    // Function to check if given tree is a valid Binary Search Tree or not.
    isValidBST(root) {
        // An empty tree is a valid Binary Search Tree.
        if (!root) {
            return true;
        }
        // If left subtree is not a valid BST return false.
        if (!this.isValidBST(root.left)) {
            return false;
        }
        // If current node's value is not greater than the previous
        // node's value in the in-order traversal return false.
        if (this.previous && this.previous.val >= root.val) {
            return false;
        }
        // Update previous node to current node.
        this.previous = root;
        // If right subtree is not a valid BST return false.
        return this.isValidBST(root.right);
    }

    countNodes(root) {
        if (!root) {
            return 0;
        }
        // Add nodes in left and right subtree.
        // Add 1 and return total size.
        return 1 + this.countNodes(root.left) + this.countNodes(root.right);
    }
}
```

```csharp
public class Solution {
    private TreeNode previous;

    public int LargestBSTSubtree(TreeNode root) {
        if (root == null) {
            return 0;
        }

        previous = null;

        if (IsValidBST(root)) {
            return CountNodes(root);
        }

        return Math.Max(LargestBSTSubtree(root.left), LargestBSTSubtree(root.right));
    }

    private bool IsValidBST(TreeNode root) {
        if (root == null) {
            return true;
        }

        if (!IsValidBST(root.left)) {
            return false;
        }

        if (previous != null && previous.val >= root.val) {
            return false;
        }

        previous = root;

        return IsValidBST(root.right);
    }

    private int CountNodes(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return 1 + CountNodes(root.left) + CountNodes(root.right);
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
func largestBSTSubtree(root *TreeNode) int {
    if root == nil {
        return 0
    }

    var previous *TreeNode

    var isValidBST func(node *TreeNode) bool
    isValidBST = func(node *TreeNode) bool {
        if node == nil {
            return true
        }

        if !isValidBST(node.Left) {
            return false
        }

        if previous != nil && previous.Val >= node.Val {
            return false
        }

        previous = node

        return isValidBST(node.Right)
    }

    var countNodes func(node *TreeNode) int
    countNodes = func(node *TreeNode) int {
        if node == nil {
            return 0
        }
        return 1 + countNodes(node.Left) + countNodes(node.Right)
    }

    previous = nil
    if isValidBST(root) {
        return countNodes(root)
    }

    return max(largestBSTSubtree(root.Left), largestBSTSubtree(root.Right))
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
    private var previous: TreeNode? = null

    fun largestBSTSubtree(root: TreeNode?): Int {
        if (root == null) return 0

        previous = null

        if (isValidBST(root)) {
            return countNodes(root)
        }

        return maxOf(largestBSTSubtree(root.left), largestBSTSubtree(root.right))
    }

    private fun isValidBST(root: TreeNode?): Boolean {
        if (root == null) return true

        if (!isValidBST(root.left)) return false

        if (previous != null && previous!!.`val` >= root.`val`) return false

        previous = root

        return isValidBST(root.right)
    }

    private fun countNodes(root: TreeNode?): Int {
        if (root == null) return 0
        return 1 + countNodes(root.left) + countNodes(root.right)
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
    private var previous: TreeNode? = nil

    func largestBSTSubtree(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }

        previous = nil

        if isValidBST(root) {
            return countNodes(root)
        }

        return max(largestBSTSubtree(root.left), largestBSTSubtree(root.right))
    }

    private func isValidBST(_ root: TreeNode?) -> Bool {
        guard let root = root else { return true }

        if !isValidBST(root.left) { return false }

        if let prev = previous, prev.val >= root.val { return false }

        previous = root

        return isValidBST(root.right)
    }

    private func countNodes(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }
        return 1 + countNodes(root.left) + countNodes(root.right)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^2)$
- Space complexity: $O(N)$
    - The recursion call stack can take at most $O(H)$ space; in the worst-case scenario, the height of the tree will equal $N$.

>  Where $N$ and $H$ are the number of nodes and the max height of the given tree respectively

---

## 3. Post-Order Traversal

### Intuition

The key insight is that we can determine if a subtree is a valid BST by looking at information from its children. If we process nodes bottom-up (post-order), each node can inherit the min/max values and sizes from its children. A node forms a valid BST if the maximum value in its left subtree is less than the node, and the minimum value in its right subtree is greater than the node. By returning both the valid range and size from each recursive call, we avoid redundant traversals.

### Algorithm

1. Define a helper function that returns three values for each node: minimum value, maximum value, and the size of the largest BST in that subtree.
2. For an empty node, return values that indicate a valid empty BST (`min = infinity`, `max = negative infinity`, `size = 0`).
3. Recursively process left and right children first.
4. If the current node is greater than the left max and less than the right min:
   - The subtree rooted here is a valid BST.
   - Return updated min/max bounds and the combined size.
5. Otherwise, return invalid bounds (to prevent parent from being a valid BST) and the maximum size found so far.

::tabs-start

```python
# Each node will return min node value, max node value, size
class NodeValue:
    def __init__(self, min_node, max_node, max_size):
        self.max_node = max_node
        self.min_node = min_node
        self.max_size = max_size

class Solution:
    def largest_bst_subtree_helper(self, root):
        # An empty tree is a BST of size 0.
        if not root:
            return NodeValue(float('inf'), float('-inf'), 0)

        # Get values from left and right subtree of current tree.
        left = self.largest_bst_subtree_helper(root.left)
        right = self.largest_bst_subtree_helper(root.right)
        
        # Current node is greater than max in left AND smaller than min in right, it is a BST.
        if left.max_node < root.val < right.min_node:
            # It is a BST.
            return NodeValue(min(root.val, left.min_node), max(root.val, right.max_node), 
                             left.max_size + right.max_size + 1)
        
        # Otherwise, return [-inf, inf] so that parent can't be valid BST
        return NodeValue(float('-inf'), float('inf'), max(left.max_size, right.max_size))

    def largestBSTSubtree(self, root: Optional[TreeNode]) -> int:
        return self.largest_bst_subtree_helper(root).max_size
```

```java
// Each node will return min node value, max node value, max size
class NodeValue {
    public int maxNode, minNode, maxSize;
    
    NodeValue(int minNode, int maxNode, int maxSize) {
        this.maxNode = maxNode;
        this.minNode = minNode;
        this.maxSize = maxSize;
    }
};

class Solution {
    public NodeValue largestBSTSubtreeHelper(TreeNode root) {
        // An empty tree is a BST of size 0.
        if (root == null) {
            return new NodeValue(Integer.MAX_VALUE, Integer.MIN_VALUE, 0);
        }
        
        // Get values from left and right subtree of current tree.
        NodeValue left = largestBSTSubtreeHelper(root.left);
        NodeValue right = largestBSTSubtreeHelper(root.right);
        
        // Current node is greater than max in left AND smaller than min in right, it is a BST.
        if (left.maxNode < root.val && root.val < right.minNode) {
            // It is a BST.
            return new NodeValue(Math.min(root.val, left.minNode), Math.max(root.val, right.maxNode), 
                                left.maxSize + right.maxSize + 1);
        }
        
        // Otherwise, return [-inf, inf] so that parent can't be valid BST
        return new NodeValue(Integer.MIN_VALUE, Integer.MAX_VALUE, 
                            Math.max(left.maxSize, right.maxSize));
    }
    
    public int largestBSTSubtree(TreeNode root) {
        return largestBSTSubtreeHelper(root).maxSize;
    }
}
```

```cpp
// Each node will return min node value, max node value, max size
class NodeValue {
public:
    int maxNode, minNode, maxSize;
    
    NodeValue(int minNode, int maxNode, int maxSize) {
        this->maxNode = maxNode;
        this->minNode = minNode;
        this->maxSize = maxSize;
    }
};

class Solution {
public:
    NodeValue largestBSTSubtreeHelper(TreeNode* root) {
        // An empty tree is a BST of size 0.
        if (!root) {
            return NodeValue(INT_MAX, INT_MIN, 0);
        }
        
        // Get values from left and right subtree of current tree.
        auto left = largestBSTSubtreeHelper(root->left);
        auto right = largestBSTSubtreeHelper(root->right);
        
        // Current node is greater than max in left AND smaller than min in right, it is a BST.
        if (left.maxNode < root->val && root->val < right.minNode) {
            // It is a BST.
            return NodeValue(min(root->val, left.minNode), max(root->val, right.maxNode), 
                            left.maxSize + right.maxSize + 1);
        }
        
        // Otherwise, return [-inf, inf] so that parent can't be valid BST
        return NodeValue(INT_MIN, INT_MAX, max(left.maxSize, right.maxSize));
    }
    
    int largestBSTSubtree(TreeNode* root) {
        return largestBSTSubtreeHelper(root).maxSize;
    }
};
```

```javascript
// Each node will return isBST, max node value, min node value, size
class NodeValue {
    constructor(minNode, maxNode, maxSize) {
        this.maxNode = maxNode;
        this.minNode = minNode;
        this.maxSize = maxSize;
    }
};

class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    largestBSTSubtree(root) {
        return largestBSTSubtreeHelper(root).maxSize;
    }

    largestBSTSubtreeHelper(root) {
        // An empty tree is a BST of size 0.
        if (!root) {
            return new NodeValue(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, 0);
        }

        // Get values from left and right subtree of current tree.
        let left = largestBSTSubtreeHelper(root.left);
        let right = largestBSTSubtreeHelper(root.right);

        // Current node is greater than max in left AND smaller than min in right, it is a BST.
        if (left.maxNode < root.val && root.val < right.minNode) {
            // It is a BST.
            return new NodeValue(Math.min(root.val, left.minNode), Math.max(root.val, right.maxNode),
                                left.maxSize + right.maxSize + 1);
        }

        // Otherwise, return [-inf, inf] so that parent can't be valid BST
        return new NodeValue(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER,
                            Math.max(left.maxSize, right.maxSize));
    }
}
```

```csharp
public class NodeValue {
    public int MaxNode, MinNode, MaxSize;

    public NodeValue(int minNode, int maxNode, int maxSize) {
        this.MaxNode = maxNode;
        this.MinNode = minNode;
        this.MaxSize = maxSize;
    }
}

public class Solution {
    public int LargestBSTSubtree(TreeNode root) {
        return LargestBSTSubtreeHelper(root).MaxSize;
    }

    private NodeValue LargestBSTSubtreeHelper(TreeNode root) {
        if (root == null) {
            return new NodeValue(int.MaxValue, int.MinValue, 0);
        }

        var left = LargestBSTSubtreeHelper(root.left);
        var right = LargestBSTSubtreeHelper(root.right);

        if (left.MaxNode < root.val && root.val < right.MinNode) {
            return new NodeValue(
                Math.Min(root.val, left.MinNode),
                Math.Max(root.val, right.MaxNode),
                left.MaxSize + right.MaxSize + 1
            );
        }

        return new NodeValue(int.MinValue, int.MaxValue, Math.Max(left.MaxSize, right.MaxSize));
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
type NodeValue struct {
    MinNode, MaxNode, MaxSize int
}

func largestBSTSubtree(root *TreeNode) int {
    return helper(root).MaxSize
}

func helper(root *TreeNode) NodeValue {
    if root == nil {
        return NodeValue{math.MaxInt32, math.MinInt32, 0}
    }

    left := helper(root.Left)
    right := helper(root.Right)

    if left.MaxNode < root.Val && root.Val < right.MinNode {
        return NodeValue{
            min(root.Val, left.MinNode),
            max(root.Val, right.MaxNode),
            left.MaxSize + right.MaxSize + 1,
        }
    }

    return NodeValue{math.MinInt32, math.MaxInt32, max(left.MaxSize, right.MaxSize)}
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
data class NodeValue(val minNode: Int, val maxNode: Int, val maxSize: Int)

class Solution {
    fun largestBSTSubtree(root: TreeNode?): Int {
        return helper(root).maxSize
    }

    private fun helper(root: TreeNode?): NodeValue {
        if (root == null) {
            return NodeValue(Int.MAX_VALUE, Int.MIN_VALUE, 0)
        }

        val left = helper(root.left)
        val right = helper(root.right)

        if (left.maxNode < root.`val` && root.`val` < right.minNode) {
            return NodeValue(
                minOf(root.`val`, left.minNode),
                maxOf(root.`val`, right.maxNode),
                left.maxSize + right.maxSize + 1
            )
        }

        return NodeValue(Int.MIN_VALUE, Int.MAX_VALUE, maxOf(left.maxSize, right.maxSize))
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
struct NodeValue {
    let minNode: Int
    let maxNode: Int
    let maxSize: Int
}

class Solution {
    func largestBSTSubtree(_ root: TreeNode?) -> Int {
        return helper(root).maxSize
    }

    private func helper(_ root: TreeNode?) -> NodeValue {
        guard let root = root else {
            return NodeValue(minNode: Int.max, maxNode: Int.min, maxSize: 0)
        }

        let left = helper(root.left)
        let right = helper(root.right)

        if left.maxNode < root.val && root.val < right.minNode {
            return NodeValue(
                minNode: min(root.val, left.minNode),
                maxNode: max(root.val, right.maxNode),
                maxSize: left.maxSize + right.maxSize + 1
            )
        }

        return NodeValue(minNode: Int.min, maxNode: Int.max, maxSize: max(left.maxSize, right.maxSize))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$
    - The recursion call stack can take at most $O(H)$ space; in the worst-case scenario, the height of the tree will equal $N$.

>  Where $N$ and $H$ are the number of nodes and the max height of the given tree respectively
