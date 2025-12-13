## 1. Pre-Order Traversal

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^3)$
- Space complexity: $O(N)$
    - The recursion call stack can take at most $O(H)$ space; in the worst-case scenario, the height of the tree will equal $N$.

>  Where $N$ and $H$ are the number of nodes and the max height of the given tree respectively

---

## 2. Pre-Order Traversal Optimized

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N^2)$
- Space complexity: $O(N)$
    - The recursion call stack can take at most $O(H)$ space; in the worst-case scenario, the height of the tree will equal $N$.

>  Where $N$ and $H$ are the number of nodes and the max height of the given tree respectively

---

## 3. Post-Order Traversal

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$
    - The recursion call stack can take at most $O(H)$ space; in the worst-case scenario, the height of the tree will equal $N$.

>  Where $N$ and $H$ are the number of nodes and the max height of the given tree respectively
