## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Trees** - Understanding tree structure, nodes, and traversal patterns
- **Depth First Search (DFS)** - Recursive traversal of tree structures from leaves to root
- **Post-order Traversal** - Processing children before parent nodes to aggregate subtree information

---

## 1. Depth First Search

### Intuition

A uni-value subtree is one where all nodes have the same value. We can use DFS to check each subtree from the bottom up. For a node to be the root of a uni-value subtree, both its children must be roots of uni-value subtrees, and the node's value must match its children's values (if they exist). Leaf nodes are always uni-value subtrees.

### Algorithm

1. Initialize a global counter to track uni-value subtrees.
2. Define a recursive DFS function that returns `true` if the subtree rooted at the current node is a uni-value subtree.
3. Base case: if the node is `null`, return `true`.
4. Recursively check the left and right subtrees.
5. If both subtrees are uni-value:
   - Check if the left child exists and has a different value; if so, return `false`.
   - Check if the right child exists and has a different value; if so, return `false`.
   - Increment the counter and return `true`.
6. Otherwise, return `false` (one of the subtrees is not uni-value).
7. Call DFS on the root and return the counter.

::tabs-start

```python
class Solution:
    def countUnivalSubtrees(self, root: Optional[TreeNode]) -> int:
        self.count = 0

        def dfs(node):
            if node is None:
                return True

            isLeftUniValue = dfs(node.left)
            isRightUniValue = dfs(node.right)

            # If both the children form uni-value subtrees, we compare the value of
            # chidrens node with the node value.
            if isLeftUniValue and isRightUniValue:
                if node.left and node.val != node.left.val:
                    return False
                if node.right and node.val != node.right.val:
                    return False
    
                self.count += 1
                return True
            # Else if any of the child does not form a uni-value subtree, the subtree
            # rooted at node cannot be a uni-value subtree.
            return False
        
        dfs(root)
        return self.count
```

```java
class Solution {
    int count = 0;

    public boolean dfs(TreeNode node) {
        if (node == null) {
            return true;
        }

        boolean left = dfs(node.left);
        boolean right = dfs(node.right);

        // If both the children form uni-value subtrees, we compare the value of
        // chidren's node with the node value.
        if (left && right) {
            if (node.left != null && node.left.val != node.val) {
                return false;
            }
            if (node.right != null && node.right.val != node.val) {
                return false;
            }
            count++;
            return true;
        }
        // Else if any of the child does not form a uni-value subtree, the subtree
        // rooted at node cannot be a uni-value subtree.
        return false;
    }

    public int countUnivalSubtrees(TreeNode root) {
        dfs(root);
        return count;
    }
}
```

```cpp
class Solution {
public:
    int count = 0;

    bool dfs(TreeNode* node) {
        if (node == nullptr) {
            return true;
        }

        bool isLeftUniValue = dfs(node->left);
        bool isRightUniValue = dfs(node->right);

        // If both the children form uni-value subtrees, we compare the value of
        // chidren's node with the node value.
        if (isLeftUniValue && isRightUniValue) {
            if (node->left != nullptr && node->left->val != node->val) {
                return false;
            }
            if (node->right != nullptr && node->right->val != node->val) {
                return false;
            }
            count++;
            return true;
        }
        // Else if any of the child does not form a uni-value subtree, the subtree
        // rooted at node cannot be a uni-value subtree.
        return false;
    }

    int countUnivalSubtrees(TreeNode* root) {
        dfs(root);
        return count;
    }
};
```

```javascript
class Solution {
    constructor() {
        this.count = 0;
    }

    /**
     * @param {TreeNode} node
     * @return {boolean}
     */
    dfs(node) {
        if (node === null) {
            return true;
        }

        let left = this.dfs(node.left);
        let right = this.dfs(node.right);

        // If both the children form uni-value subtrees, we compare the value of
        // children's node with the node value.
        if (left && right) {
            if (node.left !== null && node.left.val !== node.val) {
                return false;
            }
            if (node.right !== null && node.right.val !== node.val) {
                return false;
            }
            this.count++;
            return true;
        }

        // Else if any of the child does not form a uni-value subtree, the subtree
        // rooted at node cannot be a uni-value subtree.
        return false;
    }

    /**
     * @param {TreeNode} root
     * @return {number}
     */
    countUnivalSubtrees(root) {
        this.count = 0;
        this.dfs(root);
        return this.count;
    }
}
```

```csharp
public class Solution {
    private int count = 0;

    private bool Dfs(TreeNode node) {
        if (node == null) {
            return true;
        }

        bool left = Dfs(node.left);
        bool right = Dfs(node.right);

        if (left && right) {
            if (node.left != null && node.left.val != node.val) {
                return false;
            }
            if (node.right != null && node.right.val != node.val) {
                return false;
            }
            count++;
            return true;
        }
        return false;
    }

    public int CountUnivalSubtrees(TreeNode root) {
        count = 0;
        Dfs(root);
        return count;
    }
}
```

```go
func countUnivalSubtrees(root *TreeNode) int {
    count := 0

    var dfs func(node *TreeNode) bool
    dfs = func(node *TreeNode) bool {
        if node == nil {
            return true
        }

        left := dfs(node.Left)
        right := dfs(node.Right)

        if left && right {
            if node.Left != nil && node.Left.Val != node.Val {
                return false
            }
            if node.Right != nil && node.Right.Val != node.Val {
                return false
            }
            count++
            return true
        }
        return false
    }

    dfs(root)
    return count
}
```

```kotlin
class Solution {
    private var count = 0

    private fun dfs(node: TreeNode?): Boolean {
        if (node == null) return true

        val left = dfs(node.left)
        val right = dfs(node.right)

        if (left && right) {
            if (node.left != null && node.left.`val` != node.`val`) {
                return false
            }
            if (node.right != null && node.right.`val` != node.`val`) {
                return false
            }
            count++
            return true
        }
        return false
    }

    fun countUnivalSubtrees(root: TreeNode?): Int {
        count = 0
        dfs(root)
        return count
    }
}
```

```swift
class Solution {
    private var count = 0

    private func dfs(_ node: TreeNode?) -> Bool {
        guard let node = node else { return true }

        let left = dfs(node.left)
        let right = dfs(node.right)

        if left && right {
            if let leftNode = node.left, leftNode.val != node.val {
                return false
            }
            if let rightNode = node.right, rightNode.val != node.val {
                return false
            }
            count += 1
            return true
        }
        return false
    }

    func countUnivalSubtrees(_ root: TreeNode?) -> Int {
        count = 0
        _ = dfs(root)
        return count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the given binary tree

---

## 2. Depth First Search Without Using The Global Variable

### Intuition

The previous solution uses a global or instance variable to track the count. We can avoid this by passing a mutable container (like an array or reference) through the recursion. This makes the function more self-contained and easier to test, while keeping the same logic.

### Algorithm

1. Define a recursive DFS function that takes the current node and a count array (or reference) as parameters.
2. Base case: if the node is `null`, return `true`.
3. Recursively check the left and right subtrees, passing the count array.
4. If both subtrees are uni-value and the current node's value matches its children's values (when they exist):
   - Increment `count[0]` and return `true`.
5. Otherwise, return `false`.
6. Create a count array initialized to `0`, call DFS on the root, and return `count[0]`.

::tabs-start

```python
class Solution:
    def countUnivalSubtrees(self, root: Optional[TreeNode]) -> int:
        def dfs(node, count):
            if node is None:
                return True

            isLeftUniValue = dfs(node.left, count)
            isRightUniValue = dfs(node.right, count)

            # If both the children form uni-value subtrees, we compare the value of
            # chidrens node with the node value.
            if isLeftUniValue and isRightUniValue:
                if node.left and node.val != node.left.val:
                    return False
                if node.right and node.val != node.right.val:
                    return False
    
                count[0] += 1
                return True
            # Else if any of the child does not form a uni-value subtree, the subtree
            # rooted at node cannot be a uni-value subtree.
            return False

        count = [0]
        dfs(root, count)
        return count[0]
```

```java
class Solution {
    private boolean dfs(TreeNode root, int[] count) {
        if (root == null) {
            return true;
        }

        boolean isLeftUnival = dfs(root.left, count);
        boolean isRightUnival = dfs(root.right, count);

        if (isLeftUnival && isRightUnival &&
            (root.left == null || root.left.val == root.val) &&
            (root.right == null || root.right.val == root.val)
        ) {
            count[0]++;
            return true;
        }

        return false;
    }
    
    public int countUnivalSubtrees(TreeNode root) {
        int[] count = new int[1];
        dfs(root, count);
        return count[0];
    }
}
```

```cpp
class Solution {
public:
    bool dfs(TreeNode* node, int& count) {
        if (node == nullptr) {
            return true;
        }

        bool isLeftUniValue = dfs(node->left, count);
        bool isRightUniValue = dfs(node->right, count);

        // If both the children form uni-value subtrees, we compare the value of
        // chidren's node with the node value.
        if (isLeftUniValue && isRightUniValue) {
            if (node->left != nullptr && node->left->val != node->val) {
                return false;
            }
            if (node->right != nullptr && node->right->val != node->val) {
                return false;
            }
            count++;
            return true;
        }
        // Else if any of the child does not form a uni-value subtree, the subtree
        // rooted at node cannot be a uni-value subtree.
        return false;
    }

    int countUnivalSubtrees(TreeNode* root) {
        int count = 0;
        dfs(root, count);
        return count;
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number[]} count
     * @return {boolean}
     */
    dfs(root, count) {
        if (root === null) {
            return true;
        }

        let isLeftUnival = this.dfs(root.left, count);
        let isRightUnival = this.dfs(root.right, count);

        if (isLeftUnival && isRightUnival &&
            (root.left === null || root.left.val === root.val) &&
            (root.right === null || root.right.val === root.val)
        ) {
            count[0]++;
            return true;
        }

        return false;
    }

    /**
     * @param {TreeNode} root
     * @return {number}
     */
    countUnivalSubtrees(root) {
        let count = [0];
        this.dfs(root, count);
        return count[0];
    }
}
```

```csharp
public class Solution {
    private bool Dfs(TreeNode root, int[] count) {
        if (root == null) {
            return true;
        }

        bool isLeftUnival = Dfs(root.left, count);
        bool isRightUnival = Dfs(root.right, count);

        if (isLeftUnival && isRightUnival &&
            (root.left == null || root.left.val == root.val) &&
            (root.right == null || root.right.val == root.val)
        ) {
            count[0]++;
            return true;
        }

        return false;
    }

    public int CountUnivalSubtrees(TreeNode root) {
        int[] count = new int[1];
        Dfs(root, count);
        return count[0];
    }
}
```

```go
func countUnivalSubtrees(root *TreeNode) int {
    count := 0

    var dfs func(node *TreeNode) bool
    dfs = func(node *TreeNode) bool {
        if node == nil {
            return true
        }

        isLeftUnival := dfs(node.Left)
        isRightUnival := dfs(node.Right)

        if isLeftUnival && isRightUnival &&
            (node.Left == nil || node.Left.Val == node.Val) &&
            (node.Right == nil || node.Right.Val == node.Val) {
            count++
            return true
        }

        return false
    }

    dfs(root)
    return count
}
```

```kotlin
class Solution {
    private fun dfs(root: TreeNode?, count: IntArray): Boolean {
        if (root == null) return true

        val isLeftUnival = dfs(root.left, count)
        val isRightUnival = dfs(root.right, count)

        if (isLeftUnival && isRightUnival &&
            (root.left == null || root.left.`val` == root.`val`) &&
            (root.right == null || root.right.`val` == root.`val`)
        ) {
            count[0]++
            return true
        }

        return false
    }

    fun countUnivalSubtrees(root: TreeNode?): Int {
        val count = intArrayOf(0)
        dfs(root, count)
        return count[0]
    }
}
```

```swift
class Solution {
    private func dfs(_ root: TreeNode?, _ count: inout Int) -> Bool {
        guard let root = root else { return true }

        let isLeftUnival = dfs(root.left, &count)
        let isRightUnival = dfs(root.right, &count)

        if isLeftUnival && isRightUnival &&
            (root.left == nil || root.left!.val == root.val) &&
            (root.right == nil || root.right!.val == root.val) {
            count += 1
            return true
        }

        return false
    }

    func countUnivalSubtrees(_ root: TreeNode?) -> Int {
        var count = 0
        _ = dfs(root, &count)
        return count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the given binary tree

---

## Common Pitfalls

### Short-Circuit Evaluation Breaking the Count

Using short-circuit evaluation with `and` can skip processing one subtree entirely, causing missed counts. Both subtrees must be fully traversed to count all uni-value subtrees, even if one returns `false`.

```python
# Incorrect - if left is false, right subtree is never processed
if dfs(node.left) and dfs(node.right):
    # ...

# Correct - process both subtrees before combining results
left = dfs(node.left)
right = dfs(node.right)
if left and right:
    # ...
```

### Comparing Node Values Before Checking Null

Attempting to access a child's value without first checking if the child exists causes a null pointer exception. Always verify the child is not null before comparing values.

```python
# Incorrect - crashes if node.left is None
if node.left.val != node.val:
    return False

# Correct - check for null first
if node.left and node.left.val != node.val:
    return False
```

### Incrementing Count for Non-Univalue Subtrees

A common mistake is incrementing the count before validating that the current node's value matches its children. The count should only increase after confirming all uni-value conditions are met.

```python
# Incorrect - increments before checking value match
if left and right:
    count += 1
    if node.left and node.val != node.left.val:
        return False

# Correct - increment only after all checks pass
if left and right:
    if node.left and node.val != node.left.val:
        return False
    if node.right and node.val != node.right.val:
        return False
    count += 1
    return True
```
