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
    def evaluateTree(self, root: Optional[TreeNode]) -> bool:
        if not root.left:
            return root.val == 1

        if root.val == 2:
            return self.evaluateTree(root.left) or self.evaluateTree(root.right)

        if root.val == 3:
            return self.evaluateTree(root.left) and self.evaluateTree(root.right)
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
    public boolean evaluateTree(TreeNode root) {
        if (root.left == null) {
            return root.val == 1;
        }

        if (root.val == 2) {
            return evaluateTree(root.left) || evaluateTree(root.right);
        }

        if (root.val == 3) {
            return evaluateTree(root.left) && evaluateTree(root.right);
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
    bool evaluateTree(TreeNode* root) {
        if (!root->left) {
            return root->val == 1;
        }

        if (root->val == 2) {
            return evaluateTree(root->left) || evaluateTree(root->right);
        }

        if (root->val == 3) {
            return evaluateTree(root->left) && evaluateTree(root->right);
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
     * @return {boolean}
     */
    evaluateTree(root) {
        if (!root.left) {
            return root.val === 1;
        }

        if (root.val === 2) {
            return (
                this.evaluateTree(root.left) || this.evaluateTree(root.right)
            );
        }

        if (root.val === 3) {
            return (
                this.evaluateTree(root.left) && this.evaluateTree(root.right)
            );
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
    public bool EvaluateTree(TreeNode root) {
        if (root.left == null) {
            return root.val == 1;
        }

        if (root.val == 2) {
            return EvaluateTree(root.left) || EvaluateTree(root.right);
        }

        if (root.val == 3) {
            return EvaluateTree(root.left) && EvaluateTree(root.right);
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
func evaluateTree(root *TreeNode) bool {
    if root.Left == nil {
        return root.Val == 1
    }

    if root.Val == 2 {
        return evaluateTree(root.Left) || evaluateTree(root.Right)
    }

    if root.Val == 3 {
        return evaluateTree(root.Left) && evaluateTree(root.Right)
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
    fun evaluateTree(root: TreeNode?): Boolean {
        if (root?.left == null) {
            return root?.`val` == 1
        }

        if (root.`val` == 2) {
            return evaluateTree(root.left) || evaluateTree(root.right)
        }

        if (root.`val` == 3) {
            return evaluateTree(root.left) && evaluateTree(root.right)
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
    func evaluateTree(_ root: TreeNode?) -> Bool {
        guard let root = root else { return false }

        if root.left == nil {
            return root.val == 1
        }

        if root.val == 2 {
            return evaluateTree(root.left) || evaluateTree(root.right)
        }

        if root.val == 3 {
            return evaluateTree(root.left) && evaluateTree(root.right)
        }

        return false
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
    def evaluateTree(self, root: Optional[TreeNode]) -> bool:
        stack = [root]
        value = {} # map (node -> value)

        while stack:
            node = stack.pop()

            if not node.left:
                value[node] = node.val == 1
            elif node.left in value:
                if node.val == 2:
                    value[node] = value[node.left] or value[node.right]
                if node.val == 3:
                    value[node] = value[node.left] and value[node.right]
            else:
                stack.extend([node, node.left, node.right])

        return value[root]
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
    public boolean evaluateTree(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        Map<TreeNode, Boolean> value = new HashMap<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();

            if (node.left == null) {
                value.put(node, node.val == 1);
            } else if (value.containsKey(node.left)) {
                boolean leftValue = value.get(node.left);
                boolean rightValue = value.get(node.right);

                if (node.val == 2) {
                    value.put(node, leftValue || rightValue);
                } else if (node.val == 3) {
                    value.put(node, leftValue && rightValue);
                }
            } else {
                stack.push(node);
                stack.push(node.right);
                stack.push(node.left);
            }
        }

        return value.get(root);
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
    bool evaluateTree(TreeNode* root) {
        stack<TreeNode*> stk;
        unordered_map<TreeNode*, bool> value;
        stk.push(root);

        while (!stk.empty()) {
            TreeNode* node = stk.top();
            stk.pop();

            if (!node->left) {
                value[node] = node->val == 1;
            } else if (value.count(node->left)) {
                bool leftValue = value[node->left];
                bool rightValue = value[node->right];

                if (node->val == 2) {
                    value[node] = leftValue || rightValue;
                } else if (node->val == 3) {
                    value[node] = leftValue && rightValue;
                }
            } else {
                stk.push(node);
                stk.push(node->right);
                stk.push(node->left);
            }
        }

        return value[root];
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
    evaluateTree(root) {
        const stack = [root];
        const value = new Map();

        while (stack.length) {
            const node = stack.pop();

            if (!node.left) {
                value.set(node, node.val === 1);
            } else if (value.has(node.left)) {
                const leftValue = value.get(node.left);
                const rightValue = value.get(node.right);

                if (node.val === 2) {
                    value.set(node, leftValue || rightValue);
                } else if (node.val === 3) {
                    value.set(node, leftValue && rightValue);
                }
            } else {
                stack.push(node, node.right, node.left);
            }
        }

        return value.get(root);
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
    public bool EvaluateTree(TreeNode root) {
        Stack<TreeNode> stack = new Stack<TreeNode>();
        Dictionary<TreeNode, bool> value = new Dictionary<TreeNode, bool>();
        stack.Push(root);

        while (stack.Count > 0) {
            TreeNode node = stack.Pop();

            if (node.left == null) {
                value[node] = node.val == 1;
            } else if (value.ContainsKey(node.left)) {
                bool leftValue = value[node.left];
                bool rightValue = value[node.right];

                if (node.val == 2) {
                    value[node] = leftValue || rightValue;
                } else if (node.val == 3) {
                    value[node] = leftValue && rightValue;
                }
            } else {
                stack.Push(node);
                stack.Push(node.right);
                stack.Push(node.left);
            }
        }

        return value[root];
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
func evaluateTree(root *TreeNode) bool {
    stack := []*TreeNode{root}
    value := make(map[*TreeNode]bool)

    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if node.Left == nil {
            value[node] = node.Val == 1
        } else if _, ok := value[node.Left]; ok {
            leftValue := value[node.Left]
            rightValue := value[node.Right]

            if node.Val == 2 {
                value[node] = leftValue || rightValue
            } else if node.Val == 3 {
                value[node] = leftValue && rightValue
            }
        } else {
            stack = append(stack, node)
            stack = append(stack, node.Right)
            stack = append(stack, node.Left)
        }
    }

    return value[root]
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
    fun evaluateTree(root: TreeNode?): Boolean {
        val stack = ArrayDeque<TreeNode>()
        val value = HashMap<TreeNode, Boolean>()
        root?.let { stack.add(it) }

        while (stack.isNotEmpty()) {
            val node = stack.removeLast()

            if (node.left == null) {
                value[node] = node.`val` == 1
            } else if (value.containsKey(node.left)) {
                val leftValue = value[node.left]!!
                val rightValue = value[node.right]!!

                if (node.`val` == 2) {
                    value[node] = leftValue || rightValue
                } else if (node.`val` == 3) {
                    value[node] = leftValue && rightValue
                }
            } else {
                stack.add(node)
                node.right?.let { stack.add(it) }
                node.left?.let { stack.add(it) }
            }
        }

        return value[root] ?: false
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
    func evaluateTree(_ root: TreeNode?) -> Bool {
        guard let root = root else { return false }

        var stack: [TreeNode] = [root]
        var value: [ObjectIdentifier: Bool] = [:]

        while !stack.isEmpty {
            let node = stack.removeLast()
            let nodeId = ObjectIdentifier(node)

            if node.left == nil {
                value[nodeId] = node.val == 1
            } else if let leftVal = value[ObjectIdentifier(node.left!)] {
                let rightVal = value[ObjectIdentifier(node.right!)]!

                if node.val == 2 {
                    value[nodeId] = leftVal || rightVal
                } else if node.val == 3 {
                    value[nodeId] = leftVal && rightVal
                }
            } else {
                stack.append(node)
                if let right = node.right {
                    stack.append(right)
                }
                if let left = node.left {
                    stack.append(left)
                }
            }
        }

        return value[ObjectIdentifier(root)] ?? false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
