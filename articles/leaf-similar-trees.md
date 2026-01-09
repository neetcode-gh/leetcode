## 1. Depth First Search

### Intuition

Two trees are leaf-similar if their leaf nodes, read from left to right, form the same sequence. We can collect the leaf values from each tree using a depth-first traversal. A node is a leaf if it has no children. By traversing left before right, we naturally encounter leaves in left-to-right order.

### Algorithm

1. Create a helper function `dfs` that traverses a tree and appends leaf values to a list.
2. For each node:
   - If it's null, return immediately.
   - If it's a leaf (no left or right child), add its value to the list.
   - Otherwise, recursively process the left subtree, then the right subtree.
3. Collect leaves from both trees into separate lists.
4. Compare the two lists and return whether they are equal.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        def dfs(root, leaf):
            if not root:
                return
            if not root.left and not root.right:
                leaf.append(root.val)
                return
            dfs(root.left, leaf)
            dfs(root.right, leaf)

        leaf1, leaf2 = [], []
        dfs(root1, leaf1)
        dfs(root2, leaf2)
        return leaf1 == leaf2
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
    public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        List<Integer> leaf1 = new ArrayList<>();
        List<Integer> leaf2 = new ArrayList<>();

        dfs(root1, leaf1);
        dfs(root2, leaf2);

        return leaf1.equals(leaf2);
    }

    private void dfs(TreeNode root, List<Integer> leaf) {
        if (root == null) return;
        if (root.left == null && root.right == null) {
            leaf.add(root.val);
            return;
        }
        dfs(root.left, leaf);
        dfs(root.right, leaf);
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
    bool leafSimilar(TreeNode* root1, TreeNode* root2) {
        vector<int> leaf1, leaf2;
        dfs(root1, leaf1);
        dfs(root2, leaf2);
        return leaf1 == leaf2;
    }

private:
    void dfs(TreeNode* root, vector<int>& leaf) {
        if (!root) return;
        if (!root->left && !root->right) {
            leaf.push_back(root->val);
            return;
        }
        dfs(root->left, leaf);
        dfs(root->right, leaf);
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
     * @param {TreeNode} root1
     * @param {TreeNode} root2
     * @return {boolean}
     */
    leafSimilar(root1, root2) {
        const dfs = (root, leaf) => {
            if (!root) return;
            if (!root.left && !root.right) {
                leaf.push(root.val);
                return;
            }
            dfs(root.left, leaf);
            dfs(root.right, leaf);
        };

        const leaf1 = [];
        const leaf2 = [];
        dfs(root1, leaf1);
        dfs(root2, leaf2);

        return JSON.stringify(leaf1) === JSON.stringify(leaf2);
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
    public bool LeafSimilar(TreeNode root1, TreeNode root2) {
        List<int> leaf1 = new List<int>();
        List<int> leaf2 = new List<int>();
        Dfs(root1, leaf1);
        Dfs(root2, leaf2);
        return leaf1.SequenceEqual(leaf2);
    }

    private void Dfs(TreeNode root, List<int> leaf) {
        if (root == null) return;
        if (root.left == null && root.right == null) {
            leaf.Add(root.val);
            return;
        }
        Dfs(root.left, leaf);
        Dfs(root.right, leaf);
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
func leafSimilar(root1 *TreeNode, root2 *TreeNode) bool {
    var dfs func(root *TreeNode, leaf *[]int)
    dfs = func(root *TreeNode, leaf *[]int) {
        if root == nil {
            return
        }
        if root.Left == nil && root.Right == nil {
            *leaf = append(*leaf, root.Val)
            return
        }
        dfs(root.Left, leaf)
        dfs(root.Right, leaf)
    }

    leaf1, leaf2 := []int{}, []int{}
    dfs(root1, &leaf1)
    dfs(root2, &leaf2)

    if len(leaf1) != len(leaf2) {
        return false
    }
    for i := range leaf1 {
        if leaf1[i] != leaf2[i] {
            return false
        }
    }
    return true
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
    fun leafSimilar(root1: TreeNode?, root2: TreeNode?): Boolean {
        val leaf1 = mutableListOf<Int>()
        val leaf2 = mutableListOf<Int>()
        dfs(root1, leaf1)
        dfs(root2, leaf2)
        return leaf1 == leaf2
    }

    private fun dfs(root: TreeNode?, leaf: MutableList<Int>) {
        if (root == null) return
        if (root.left == null && root.right == null) {
            leaf.add(root.`val`)
            return
        }
        dfs(root.left, leaf)
        dfs(root.right, leaf)
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
    func leafSimilar(_ root1: TreeNode?, _ root2: TreeNode?) -> Bool {
        var leaf1 = [Int]()
        var leaf2 = [Int]()
        dfs(root1, &leaf1)
        dfs(root2, &leaf2)
        return leaf1 == leaf2
    }

    private func dfs(_ root: TreeNode?, _ leaf: inout [Int]) {
        guard let root = root else { return }
        if root.left == nil && root.right == nil {
            leaf.append(root.val)
            return
        }
        dfs(root.left, &leaf)
        dfs(root.right, &leaf)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ and $m$ are the number of nodes in the given trees.

---

## 2. Depth First Search (Space Optimized)

### Intuition

Instead of storing both leaf sequences and comparing at the end, we can collect leaves from the first tree and then verify them against the second tree on the fly. By traversing the second tree in reverse order (right to left) and using a stack, we can pop leaves one by one and compare them immediately. This saves space when one tree has significantly fewer leaves than expected.

### Algorithm

1. Traverse the first tree using DFS and store all leaf values in a stack (leaves appear in reverse order due to left-to-right traversal).
2. Define a second DFS function for the second tree that traverses right-to-left:
   - If a leaf is found, pop from the stack and compare. Return false on mismatch or if the stack is empty.
3. After traversing the second tree, check that the stack is empty (no extra leaves in the first tree).
4. Return true only if all leaves matched and both trees had the same number of leaves.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        def dfs(root, leaf):
            if not root:
                return
            if not root.left and not root.right:
                leaf.append(root.val)
                return
            dfs(root.left, leaf)
            dfs(root.right, leaf)

        leaf1 = []
        dfs(root1, leaf1)

        def dfs1(root, leaf):
            if not root:
                return True
            if not root.left and not root.right:
                if not leaf:
                    return False
                return leaf.pop() == root.val
            return dfs1(root.right, leaf) and dfs1(root.left, leaf)

        return dfs1(root2, leaf1) and not leaf1
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
    public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        Stack<Integer> leaf1 = new Stack<>();
        dfs(root1, leaf1);
        return dfs1(root2, leaf1) && leaf1.isEmpty();
    }

    private void dfs(TreeNode root, Stack<Integer> leaf) {
        if (root == null) return;
        if (root.left == null && root.right == null) {
            leaf.push(root.val);
            return;
        }
        dfs(root.left, leaf);
        dfs(root.right, leaf);
    }

    private boolean dfs1(TreeNode root, Stack<Integer> leaf) {
        if (root == null) return true;
        if (root.left == null && root.right == null) {
            if (leaf.isEmpty()) return false;
            return leaf.pop() == root.val;
        }
        return dfs1(root.right, leaf) && dfs1(root.left, leaf);
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
    bool leafSimilar(TreeNode* root1, TreeNode* root2) {
        vector<int> leaf1;
        dfs(root1, leaf1);
        return dfs1(root2, leaf1) && leaf1.empty();
    }

private:
    void dfs(TreeNode* root, vector<int>& leaf) {
        if (!root) return;
        if (!root->left && !root->right) {
            leaf.push_back(root->val);
            return;
        }
        dfs(root->left, leaf);
        dfs(root->right, leaf);
    }

    bool dfs1(TreeNode* root, vector<int>& leaf) {
        if (!root) return true;
        if (!root->left && !root->right) {
            if (leaf.empty() || leaf.back() != root->val) {
                return false;
            }
            leaf.pop_back();
            return true;
        }
        return dfs1(root->right, leaf) && dfs1(root->left, leaf);
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
     * @param {TreeNode} root1
     * @param {TreeNode} root2
     * @return {boolean}
     */
    leafSimilar(root1, root2) {
        const dfs = (root, leaf) => {
            if (!root) return;
            if (!root.left && !root.right) {
                leaf.push(root.val);
                return;
            }
            dfs(root.left, leaf);
            dfs(root.right, leaf);
        };

        const dfs1 = (root, leaf) => {
            if (!root) return true;
            if (!root.left && !root.right) {
                if (!leaf.length) return false;
                return leaf.pop() === root.val;
            }
            return dfs1(root.right, leaf) && dfs1(root.left, leaf);
        };

        const leaf1 = [];
        dfs(root1, leaf1);
        return dfs1(root2, leaf1) && leaf1.length === 0;
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
    public bool LeafSimilar(TreeNode root1, TreeNode root2) {
        Stack<int> leaf1 = new Stack<int>();
        Dfs(root1, leaf1);
        return Dfs1(root2, leaf1) && leaf1.Count == 0;
    }

    private void Dfs(TreeNode root, Stack<int> leaf) {
        if (root == null) return;
        if (root.left == null && root.right == null) {
            leaf.Push(root.val);
            return;
        }
        Dfs(root.left, leaf);
        Dfs(root.right, leaf);
    }

    private bool Dfs1(TreeNode root, Stack<int> leaf) {
        if (root == null) return true;
        if (root.left == null && root.right == null) {
            if (leaf.Count == 0) return false;
            return leaf.Pop() == root.val;
        }
        return Dfs1(root.right, leaf) && Dfs1(root.left, leaf);
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
func leafSimilar(root1 *TreeNode, root2 *TreeNode) bool {
    var dfs func(root *TreeNode, leaf *[]int)
    dfs = func(root *TreeNode, leaf *[]int) {
        if root == nil {
            return
        }
        if root.Left == nil && root.Right == nil {
            *leaf = append(*leaf, root.Val)
            return
        }
        dfs(root.Left, leaf)
        dfs(root.Right, leaf)
    }

    var dfs1 func(root *TreeNode, leaf *[]int) bool
    dfs1 = func(root *TreeNode, leaf *[]int) bool {
        if root == nil {
            return true
        }
        if root.Left == nil && root.Right == nil {
            if len(*leaf) == 0 {
                return false
            }
            val := (*leaf)[len(*leaf)-1]
            *leaf = (*leaf)[:len(*leaf)-1]
            return val == root.Val
        }
        return dfs1(root.Right, leaf) && dfs1(root.Left, leaf)
    }

    leaf1 := []int{}
    dfs(root1, &leaf1)
    return dfs1(root2, &leaf1) && len(leaf1) == 0
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
    fun leafSimilar(root1: TreeNode?, root2: TreeNode?): Boolean {
        val leaf1 = ArrayDeque<Int>()
        dfs(root1, leaf1)
        return dfs1(root2, leaf1) && leaf1.isEmpty()
    }

    private fun dfs(root: TreeNode?, leaf: ArrayDeque<Int>) {
        if (root == null) return
        if (root.left == null && root.right == null) {
            leaf.addLast(root.`val`)
            return
        }
        dfs(root.left, leaf)
        dfs(root.right, leaf)
    }

    private fun dfs1(root: TreeNode?, leaf: ArrayDeque<Int>): Boolean {
        if (root == null) return true
        if (root.left == null && root.right == null) {
            if (leaf.isEmpty()) return false
            return leaf.removeLast() == root.`val`
        }
        return dfs1(root.right, leaf) && dfs1(root.left, leaf)
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
    func leafSimilar(_ root1: TreeNode?, _ root2: TreeNode?) -> Bool {
        var leaf1 = [Int]()
        dfs(root1, &leaf1)
        return dfs1(root2, &leaf1) && leaf1.isEmpty
    }

    private func dfs(_ root: TreeNode?, _ leaf: inout [Int]) {
        guard let root = root else { return }
        if root.left == nil && root.right == nil {
            leaf.append(root.val)
            return
        }
        dfs(root.left, &leaf)
        dfs(root.right, &leaf)
    }

    private func dfs1(_ root: TreeNode?, _ leaf: inout [Int]) -> Bool {
        guard let root = root else { return true }
        if root.left == nil && root.right == nil {
            if leaf.isEmpty { return false }
            return leaf.popLast() == root.val
        }
        return dfs1(root.right, &leaf) && dfs1(root.left, &leaf)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ and $m$ are the number of nodes in the given trees.

---

## 3. Iterative DFS

### Intuition

Rather than collecting all leaves first, we can compare leaves one at a time using two parallel iterative traversals. Each tree maintains its own stack. We advance each stack until we find the next leaf, compare the two leaves, and continue. This approach can exit early if a mismatch is found without traversing the entire trees.

### Algorithm

1. Initialize two stacks, one for each tree, and push their root nodes.
2. Create a helper function `getPathLeaf` that pops nodes from a stack until a leaf is found, pushing children along the way.
3. While both stacks are non-empty:
   - Get the next leaf from each stack.
   - If the values differ, return false.
4. After the loop, return true only if both stacks are empty (both trees exhausted their leaves together).

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        def getPathLeaf(stack):
            while stack:
                node = stack.pop()
                if node.right:
                    stack.append(node.right)
                if node.left:
                    stack.append(node.left)
                if not node.left and not node.right:
                    return node.val

        stack1, stack2 = [root1], [root2]
        while stack1 and stack2:
            if getPathLeaf(stack1) != getPathLeaf(stack2):
                return False

        return not stack1 and not stack2
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
    public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        Stack<TreeNode> stack1 = new Stack<>();
        Stack<TreeNode> stack2 = new Stack<>();
        stack1.push(root1);
        stack2.push(root2);

        while (!stack1.isEmpty() && !stack2.isEmpty()) {
            if (getPathLeaf(stack1) != getPathLeaf(stack2)) {
                return false;
            }
        }
        return stack1.isEmpty() && stack2.isEmpty();
    }

    private int getPathLeaf(Stack<TreeNode> stack) {
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node.right != null) {
                stack.push(node.right);
            }
            if (node.left != null) {
                stack.push(node.left);
            }
            if (node.left == null && node.right == null) {
                return node.val;
            }
        }
        return -1;
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
    bool leafSimilar(TreeNode* root1, TreeNode* root2) {
        stack<TreeNode*> stack1, stack2;
        stack1.push(root1);
        stack2.push(root2);

        while (!stack1.empty() && !stack2.empty()) {
            if (getPathLeaf(stack1) != getPathLeaf(stack2)) {
                return false;
            }
        }
        return stack1.empty() && stack2.empty();
    }

private:
    int getPathLeaf(stack<TreeNode*>& stack) {
        while (!stack.empty()) {
            TreeNode* node = stack.top();
            stack.pop();
            if (node->right) {
                stack.push(node->right);
            }
            if (node->left) {
                stack.push(node->left);
            }
            if (!node->left && !node->right) {
                return node->val;
            }
        }
        return -1;
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
     * @param {TreeNode} root1
     * @param {TreeNode} root2
     * @return {boolean}
     */
    leafSimilar(root1, root2) {
        const getPathLeaf = (stack) => {
            while (stack.length) {
                const node = stack.pop();
                if (node.right) stack.push(node.right);
                if (node.left) stack.push(node.left);
                if (!node.left && !node.right) return node.val;
            }
        };

        const stack1 = [root1],
            stack2 = [root2];
        while (stack1.length && stack2.length) {
            if (getPathLeaf(stack1) !== getPathLeaf(stack2)) {
                return false;
            }
        }
        return stack1.length === 0 && stack2.length === 0;
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
    public bool LeafSimilar(TreeNode root1, TreeNode root2) {
        Stack<TreeNode> stack1 = new Stack<TreeNode>();
        Stack<TreeNode> stack2 = new Stack<TreeNode>();
        stack1.Push(root1);
        stack2.Push(root2);

        while (stack1.Count > 0 && stack2.Count > 0) {
            if (GetPathLeaf(stack1) != GetPathLeaf(stack2)) {
                return false;
            }
        }
        return stack1.Count == 0 && stack2.Count == 0;
    }

    private int GetPathLeaf(Stack<TreeNode> stack) {
        while (stack.Count > 0) {
            TreeNode node = stack.Pop();
            if (node.right != null) stack.Push(node.right);
            if (node.left != null) stack.Push(node.left);
            if (node.left == null && node.right == null) {
                return node.val;
            }
        }
        return -1;
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
func leafSimilar(root1 *TreeNode, root2 *TreeNode) bool {
    getPathLeaf := func(stack *[]*TreeNode) int {
        for len(*stack) > 0 {
            node := (*stack)[len(*stack)-1]
            *stack = (*stack)[:len(*stack)-1]
            if node.Right != nil {
                *stack = append(*stack, node.Right)
            }
            if node.Left != nil {
                *stack = append(*stack, node.Left)
            }
            if node.Left == nil && node.Right == nil {
                return node.Val
            }
        }
        return -1
    }

    stack1, stack2 := []*TreeNode{root1}, []*TreeNode{root2}
    for len(stack1) > 0 && len(stack2) > 0 {
        if getPathLeaf(&stack1) != getPathLeaf(&stack2) {
            return false
        }
    }
    return len(stack1) == 0 && len(stack2) == 0
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
    fun leafSimilar(root1: TreeNode?, root2: TreeNode?): Boolean {
        val stack1 = ArrayDeque<TreeNode>()
        val stack2 = ArrayDeque<TreeNode>()
        root1?.let { stack1.addLast(it) }
        root2?.let { stack2.addLast(it) }

        while (stack1.isNotEmpty() && stack2.isNotEmpty()) {
            if (getPathLeaf(stack1) != getPathLeaf(stack2)) {
                return false
            }
        }
        return stack1.isEmpty() && stack2.isEmpty()
    }

    private fun getPathLeaf(stack: ArrayDeque<TreeNode>): Int {
        while (stack.isNotEmpty()) {
            val node = stack.removeLast()
            node.right?.let { stack.addLast(it) }
            node.left?.let { stack.addLast(it) }
            if (node.left == null && node.right == null) {
                return node.`val`
            }
        }
        return -1
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
    func leafSimilar(_ root1: TreeNode?, _ root2: TreeNode?) -> Bool {
        var stack1 = [TreeNode]()
        var stack2 = [TreeNode]()
        if let r1 = root1 { stack1.append(r1) }
        if let r2 = root2 { stack2.append(r2) }

        while !stack1.isEmpty && !stack2.isEmpty {
            if getPathLeaf(&stack1) != getPathLeaf(&stack2) {
                return false
            }
        }
        return stack1.isEmpty && stack2.isEmpty
    }

    private func getPathLeaf(_ stack: inout [TreeNode]) -> Int {
        while !stack.isEmpty {
            let node = stack.removeLast()
            if let right = node.right { stack.append(right) }
            if let left = node.left { stack.append(left) }
            if node.left == nil && node.right == nil {
                return node.val
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ and $m$ are the number of nodes in the given trees.
