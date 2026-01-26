## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Tree Structure** - Understanding nodes, left/right children, and tree traversal basics
- **Recursion** - Writing recursive functions that process tree nodes and combine results from subtrees
- **DFS/BFS on Trees** - Traversing trees iteratively using stacks (DFS) or queues (BFS)

---

## 1. Depth First Search

### Intuition

A tree is symmetric if its left subtree is a mirror reflection of its right subtree. Two trees are mirrors of each other if their roots have the same value, and the left subtree of one is a mirror of the right subtree of the other (and vice versa). We can check this recursively by comparing pairs of nodes that should be mirror images of each other.

### Algorithm

1. Define a recursive helper that takes two nodes: one from the left subtree and one from the right subtree.
2. If both nodes are `null`, they are mirrors (return `true`).
3. If only one is `null`, or their values differ, they are not mirrors (return `false`).
4. Recursively check:
   - The left child of the left node against the right child of the right node.
   - The right child of the left node against the left child of the right node.
5. Return `true` only if both recursive checks pass.
6. Start by comparing the root's left and right children.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        def dfs(left, right):
            if not left and not right:
                return True
            if not left or not right:
                return False
            return (
                left.val == right.val and
                dfs(left.left, right.right) and
                dfs(left.right, right.left)
            )
        return dfs(root.left, root.right)
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
    public boolean isSymmetric(TreeNode root) {
        return dfs(root.left, root.right);
    }

    private boolean dfs(TreeNode left, TreeNode right) {
        if (left == null && right == null) {
            return true;
        }
        if (left == null || right == null) {
            return false;
        }
        return left.val == right.val &&
               dfs(left.left, right.right) &&
               dfs(left.right, right.left);
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
    bool isSymmetric(TreeNode* root) {
        return dfs(root->left, root->right);
    }

private:
    bool dfs(TreeNode* left, TreeNode* right) {
        if (!left && !right) {
            return true;
        }
        if (!left || !right) {
            return false;
        }
        return (left->val == right->val) &&
                dfs(left->left, right->right) &&
                dfs(left->right, right->left);
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
     * @return {boolean}
     */
    isSymmetric(root) {
        const dfs = (left, right) => {
            if (!left && !right) {
                return true;
            }
            if (!left || !right) {
                return false;
            }
            return (
                left.val === right.val &&
                dfs(left.left, right.right) &&
                dfs(left.right, right.left)
            );
        };
        return dfs(root.left, root.right);
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
    public bool IsSymmetric(TreeNode root) {
        return Dfs(root.left, root.right);
    }

    private bool Dfs(TreeNode left, TreeNode right) {
        if (left == null && right == null) {
            return true;
        }
        if (left == null || right == null) {
            return false;
        }
        return left.val == right.val &&
               Dfs(left.left, right.right) &&
               Dfs(left.right, right.left);
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
func isSymmetric(root *TreeNode) bool {
    var dfs func(left, right *TreeNode) bool
    dfs = func(left, right *TreeNode) bool {
        if left == nil && right == nil {
            return true
        }
        if left == nil || right == nil {
            return false
        }
        return left.Val == right.Val &&
               dfs(left.Left, right.Right) &&
               dfs(left.Right, right.Left)
    }
    return dfs(root.Left, root.Right)
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
    fun isSymmetric(root: TreeNode?): Boolean {
        fun dfs(left: TreeNode?, right: TreeNode?): Boolean {
            if (left == null && right == null) {
                return true
            }
            if (left == null || right == null) {
                return false
            }
            return left.`val` == right.`val` &&
                   dfs(left.left, right.right) &&
                   dfs(left.right, right.left)
        }
        return dfs(root?.left, root?.right)
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
    func isSymmetric(_ root: TreeNode?) -> Bool {
        func dfs(_ left: TreeNode?, _ right: TreeNode?) -> Bool {
            if left == nil && right == nil {
                return true
            }
            if left == nil || right == nil {
                return false
            }
            return left!.val == right!.val &&
                   dfs(left!.left, right!.right) &&
                   dfs(left!.right, right!.left)
        }
        return dfs(root?.left, root?.right)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Iterative DFS

### Intuition

The recursive solution can be converted to an iterative one using a stack. Instead of implicit recursive calls, we explicitly push pairs of nodes onto a stack. Each pair represents two nodes that should be mirror images. By processing pairs from the stack, we maintain the same comparison logic without recursion.

### Algorithm

1. Push the initial pair `(root.left, root.right)` onto the stack.
2. While the stack is not empty:
   - Pop a pair of nodes.
   - If both are `null`, continue to the next pair.
   - If only one is `null` or their values differ, return `false`.
   - Push two new pairs: `(left.left, right.right)` and `(left.right, right.left)`.
3. If all pairs pass, return `true`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        if not root:
            return True

        stack = [(root.left, root.right)]
        while stack:
            left, right = stack.pop()
            if not left and not right:
                continue
            if not left or not right or left.val != right.val:
                return False
            stack.append((left.left, right.right))
            stack.append((left.right, right.left))
        return True
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
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;

        Stack<TreeNode[]> stack = new Stack<>();
        stack.push(new TreeNode[]{root.left, root.right});

        while (!stack.isEmpty()) {
            TreeNode[] nodes = stack.pop();
            TreeNode left = nodes[0], right = nodes[1];

            if (left == null && right == null) continue;
            if (left == null || right == null || left.val != right.val) {
                return false;
            }

            stack.push(new TreeNode[]{left.left, right.right});
            stack.push(new TreeNode[]{left.right, right.left});
        }

        return true;
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
    bool isSymmetric(TreeNode* root) {
        if (!root) return true;

        std::stack<pair<TreeNode*, TreeNode*>> stack;
        stack.push({root->left, root->right});

        while (!stack.empty()) {
            auto [left, right] = stack.top();
            stack.pop();

            if (!left && !right) continue;
            if (!left || !right || left->val != right->val) {
                return false;
            }
            stack.push({left->left, right->right});
            stack.push({left->right, right->left});
        }

        return true;
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
     * @return {boolean}
     */
    isSymmetric(root) {
        if (!root) return true;

        const stack = [[root.left, root.right]];

        while (stack.length > 0) {
            const [left, right] = stack.pop();

            if (!left && !right) continue;
            if (!left || !right || left.val !== right.val) {
                return false;
            }

            stack.push([left.left, right.right]);
            stack.push([left.right, right.left]);
        }

        return true;
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
    public bool IsSymmetric(TreeNode root) {
        if (root == null) return true;

        var stack = new Stack<(TreeNode, TreeNode)>();
        stack.Push((root.left, root.right));

        while (stack.Count > 0) {
            var (left, right) = stack.Pop();

            if (left == null && right == null) continue;
            if (left == null || right == null || left.val != right.val) {
                return false;
            }

            stack.Push((left.left, right.right));
            stack.Push((left.right, right.left));
        }

        return true;
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
func isSymmetric(root *TreeNode) bool {
    if root == nil {
        return true
    }

    type pair struct {
        left, right *TreeNode
    }
    stack := []pair{{root.Left, root.Right}}

    for len(stack) > 0 {
        p := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if p.left == nil && p.right == nil {
            continue
        }
        if p.left == nil || p.right == nil || p.left.Val != p.right.Val {
            return false
        }

        stack = append(stack, pair{p.left.Left, p.right.Right})
        stack = append(stack, pair{p.left.Right, p.right.Left})
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
    fun isSymmetric(root: TreeNode?): Boolean {
        if (root == null) return true

        val stack = ArrayDeque<Pair<TreeNode?, TreeNode?>>()
        stack.addLast(Pair(root.left, root.right))

        while (stack.isNotEmpty()) {
            val (left, right) = stack.removeLast()

            if (left == null && right == null) continue
            if (left == null || right == null || left.`val` != right.`val`) {
                return false
            }

            stack.addLast(Pair(left.left, right.right))
            stack.addLast(Pair(left.right, right.left))
        }

        return true
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
    func isSymmetric(_ root: TreeNode?) -> Bool {
        guard let root = root else { return true }

        var stack: [(TreeNode?, TreeNode?)] = [(root.left, root.right)]

        while !stack.isEmpty {
            let (left, right) = stack.removeLast()

            if left == nil && right == nil { continue }
            if left == nil || right == nil || left!.val != right!.val {
                return false
            }

            stack.append((left!.left, right!.right))
            stack.append((left!.right, right!.left))
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Breadth First Search

### Intuition

BFS processes nodes level by level using a queue. For symmetry checking, we enqueue pairs of nodes that should be mirrors. Processing the queue ensures we compare nodes at the same depth before moving deeper. This approach gives a level-by-level validation of the mirror property.

### Algorithm

1. Initialize a queue with the pair `(root.left, root.right)`.
2. While the queue is not empty:
   - For each pair in the current level:
     - Dequeue a pair.
     - If both are `null`, continue.
     - If only one is `null` or values differ, return `false`.
     - Enqueue pairs: `(left.left, right.right)` and `(left.right, right.left)`.
3. If all comparisons pass, return `true`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        if not root:
            return True

        queue = deque([(root.left, root.right)])
        while queue:
            for _ in range(len(queue)):
                left, right = queue.popleft()
                if not left and not right:
                    continue
                if not left or not right or left.val != right.val:
                    return False
                queue.append((left.left, right.right))
                queue.append((left.right, right.left))

        return True
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
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;

        Queue<TreeNode[]> queue = new LinkedList<>();
        queue.add(new TreeNode[]{root.left, root.right});

        while (!queue.isEmpty()) {
            for (int i = queue.size(); i > 0; i--) {
                TreeNode[] nodes = queue.poll();
                TreeNode left = nodes[0], right = nodes[1];

                if (left == null && right == null) continue;
                if (left == null || right == null || left.val != right.val) {
                    return false;
                }
                queue.add(new TreeNode[]{left.left, right.right});
                queue.add(new TreeNode[]{left.right, right.left});
            }
        }

        return true;
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
    bool isSymmetric(TreeNode* root) {
        if (!root) return true;

        queue<pair<TreeNode*, TreeNode*>> queue;
        queue.push({root->left, root->right});

        while (!queue.empty()) {
            for (int i = queue.size(); i > 0; i--) {
                auto [left, right] = queue.front();
                queue.pop();

                if (!left && !right) continue;
                if (!left || !right || left->val != right->val) {
                    return false;
                }
                queue.push({left->left, right->right});
                queue.push({left->right, right->left});
            }
        }

        return true;
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
     * @return {boolean}
     */
    isSymmetric(root) {
        if (!root) return true;

        const queue = new Queue([[root.left, root.right]]);

        while (!queue.isEmpty()) {
            for (let i = queue.size(); i > 0; i--) {
                const [left, right] = queue.pop();

                if (!left && !right) continue;
                if (!left || !right || left.val !== right.val) {
                    return false;
                }
                queue.push([left.left, right.right]);
                queue.push([left.right, right.left]);
            }
        }

        return true;
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
    public bool IsSymmetric(TreeNode root) {
        if (root == null) return true;

        var queue = new Queue<(TreeNode, TreeNode)>();
        queue.Enqueue((root.left, root.right));

        while (queue.Count > 0) {
            for (int i = queue.Count; i > 0; i--) {
                var (left, right) = queue.Dequeue();

                if (left == null && right == null) continue;
                if (left == null || right == null || left.val != right.val) {
                    return false;
                }
                queue.Enqueue((left.left, right.right));
                queue.Enqueue((left.right, right.left));
            }
        }

        return true;
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
func isSymmetric(root *TreeNode) bool {
    if root == nil {
        return true
    }

    type pair struct {
        left, right *TreeNode
    }
    queue := []pair{{root.Left, root.Right}}

    for len(queue) > 0 {
        size := len(queue)
        for i := 0; i < size; i++ {
            p := queue[0]
            queue = queue[1:]

            if p.left == nil && p.right == nil {
                continue
            }
            if p.left == nil || p.right == nil || p.left.Val != p.right.Val {
                return false
            }
            queue = append(queue, pair{p.left.Left, p.right.Right})
            queue = append(queue, pair{p.left.Right, p.right.Left})
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
    fun isSymmetric(root: TreeNode?): Boolean {
        if (root == null) return true

        val queue = ArrayDeque<Pair<TreeNode?, TreeNode?>>()
        queue.addLast(Pair(root.left, root.right))

        while (queue.isNotEmpty()) {
            repeat(queue.size) {
                val (left, right) = queue.removeFirst()

                if (left == null && right == null) return@repeat
                if (left == null || right == null || left.`val` != right.`val`) {
                    return false
                }
                queue.addLast(Pair(left.left, right.right))
                queue.addLast(Pair(left.right, right.left))
            }
        }

        return true
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
    func isSymmetric(_ root: TreeNode?) -> Bool {
        guard let root = root else { return true }

        var queue: [(TreeNode?, TreeNode?)] = [(root.left, root.right)]

        while !queue.isEmpty {
            let size = queue.count
            for _ in 0..<size {
                let (left, right) = queue.removeFirst()

                if left == nil && right == nil { continue }
                if left == nil || right == nil || left!.val != right!.val {
                    return false
                }
                queue.append((left!.left, right!.right))
                queue.append((left!.right, right!.left))
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Comparing Wrong Node Pairs

A frequent mistake is comparing `left.left` with `right.left` instead of `left.left` with `right.right`. For a mirror reflection, the left child of the left subtree must match the right child of the right subtree, and vice versa.

### Forgetting to Handle Null Cases First

When checking symmetry, you must handle the null cases before accessing node values. Checking `left.val == right.val` when either node is null will cause a null pointer exception. Always check if both are null (return true) or only one is null (return false) before comparing values.
