## 1. Recursion (Postorder Traversal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def removeLeafNodes(self, root: Optional[TreeNode], target: int) -> Optional[TreeNode]:
        if not root:
            return None

        root.left = self.removeLeafNodes(root.left, target)
        root.right = self.removeLeafNodes(root.right, target)

        if not root.left and not root.right and root.val == target:
            return None

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
    public TreeNode removeLeafNodes(TreeNode root, int target) {
        if (root == null) {
            return null;
        }

        root.left = removeLeafNodes(root.left, target);
        root.right = removeLeafNodes(root.right, target);

        if (root.left == null && root.right == null && root.val == target) {
            return null;
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
    TreeNode* removeLeafNodes(TreeNode* root, int target) {
        if (!root) {
            return nullptr;
        }

        root->left = removeLeafNodes(root->left, target);
        root->right = removeLeafNodes(root->right, target);

        if (!root->left && !root->right && root->val == target) {
            return nullptr;
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
     * @param {number} target
     * @return {TreeNode}
     */
    removeLeafNodes(root, target) {
        if (!root) {
            return null;
        }

        root.left = this.removeLeafNodes(root.left, target);
        root.right = this.removeLeafNodes(root.right, target);

        if (!root.left && !root.right && root.val === target) {
            return null;
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
    public TreeNode RemoveLeafNodes(TreeNode root, int target) {
        if (root == null) return null;

        root.left = RemoveLeafNodes(root.left, target);
        root.right = RemoveLeafNodes(root.right, target);

        if (root.left == null && root.right == null && root.val == target) {
            return null;
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
func removeLeafNodes(root *TreeNode, target int) *TreeNode {
    if root == nil {
        return nil
    }

    root.Left = removeLeafNodes(root.Left, target)
    root.Right = removeLeafNodes(root.Right, target)

    if root.Left == nil && root.Right == nil && root.Val == target {
        return nil
    }

    return root
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
    fun removeLeafNodes(root: TreeNode?, target: Int): TreeNode? {
        if (root == null) return null

        root.left = removeLeafNodes(root.left, target)
        root.right = removeLeafNodes(root.right, target)

        if (root.left == null && root.right == null && root.`val` == target) {
            return null
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
    func removeLeafNodes(_ root: TreeNode?, _ target: Int) -> TreeNode? {
        guard let root = root else { return nil }

        root.left = removeLeafNodes(root.left, target)
        root.right = removeLeafNodes(root.right, target)

        if root.left == nil && root.right == nil && root.val == target {
            return nil
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Iterative Postorder Traversal

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def removeLeafNodes(self, root: Optional[TreeNode], target: int) -> Optional[TreeNode]:
        stack = [root]
        visit = set()
        parents = {root: None}

        while stack:
            node = stack.pop()
            if not node.left and not node.right:
                if node.val == target:
                    p = parents[node]
                    if not p:
                        return None
                    if p.left == node:
                        p.left = None
                    if p.right == node:
                        p.right = None
            elif node not in visit:
                visit.add(node)
                stack.append(node)
                if node.left:
                    stack.append(node.left)
                    parents[node.left] = node
                if node.right:
                    stack.append(node.right)
                    parents[node.right] = node

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
    public TreeNode removeLeafNodes(TreeNode root, int target) {
        Stack<TreeNode> stack = new Stack<>();
        Set<TreeNode> visit = new HashSet<>();
        Map<TreeNode, TreeNode> parents = new HashMap<>();
        parents.put(root, null);
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node.left == null && node.right == null) {
                if (node.val == target) {
                    TreeNode p = parents.get(node);
                    if (p == null) {
                        return null;
                    }
                    if (p.left == node) {
                        p.left = null;
                    }
                    if (p.right == node) {
                        p.right = null;
                    }
                }
            } else if (!visit.contains(node)) {
                visit.add(node);
                stack.push(node);
                if (node.left != null) {
                    stack.push(node.left);
                    parents.put(node.left, node);
                }
                if (node.right != null) {
                    stack.push(node.right);
                    parents.put(node.right, node);
                }
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
    TreeNode* removeLeafNodes(TreeNode* root, int target) {
        stack<TreeNode*> stack;
        unordered_set<TreeNode*> visit;
        unordered_map<TreeNode*, TreeNode*> parents;
        parents[root] = nullptr;
        stack.push(root);

        while (!stack.empty()) {
            TreeNode* node = stack.top();
            stack.pop();
            if (!node->left && !node->right) {
                if (node->val == target) {
                    TreeNode* p = parents[node];
                    if (!p) {
                        return nullptr;
                    }
                    if (p->left == node) {
                        p->left = nullptr;
                    }
                    if (p->right == node) {
                        p->right = nullptr;
                    }
                }
            } else if (visit.find(node) == visit.end()) {
                visit.insert(node);
                stack.push(node);
                if (node->left) {
                    stack.push(node->left);
                    parents[node->left] = node;
                }
                if (node->right) {
                    stack.push(node->right);
                    parents[node->right] = node;
                }
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
     * @param {number} target
     * @return {TreeNode}
     */
    removeLeafNodes(root, target) {
        const stack = [root];
        const visit = new Set();
        const parents = new Map();
        parents.set(root, null);

        while (stack.length > 0) {
            const node = stack.pop();
            if (!node.left && !node.right) {
                if (node.val === target) {
                    const p = parents.get(node);
                    if (!p) {
                        return null;
                    }
                    if (p.left === node) {
                        p.left = null;
                    }
                    if (p.right === node) {
                        p.right = null;
                    }
                }
            } else if (!visit.has(node)) {
                visit.add(node);
                stack.push(node);
                if (node.left) {
                    stack.push(node.left);
                    parents.set(node.left, node);
                }
                if (node.right) {
                    stack.push(node.right);
                    parents.set(node.right, node);
                }
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
    public TreeNode RemoveLeafNodes(TreeNode root, int target) {
        if (root == null) return null;

        Stack<TreeNode> stack = new Stack<TreeNode>();
        HashSet<TreeNode> visited = new HashSet<TreeNode>();
        Dictionary<TreeNode, TreeNode> parents = new Dictionary<TreeNode, TreeNode>();

        stack.Push(root);
        parents[root] = null;

        while (stack.Count > 0) {
            TreeNode node = stack.Pop();

            if (node.left == null && node.right == null) {
                if (node.val == target) {
                    TreeNode parent = parents[node];
                    if (parent == null) {
                        return null;
                    }
                    if (parent.left == node) parent.left = null;
                    if (parent.right == node) parent.right = null;
                }
            } else if (!visited.Contains(node)) {
                visited.Add(node);
                stack.Push(node);
                if (node.left != null) {
                    stack.Push(node.left);
                    parents[node.left] = node;
                }
                if (node.right != null) {
                    stack.Push(node.right);
                    parents[node.right] = node;
                }
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
func removeLeafNodes(root *TreeNode, target int) *TreeNode {
    stack := []*TreeNode{root}
    visit := make(map[*TreeNode]bool)
    parents := make(map[*TreeNode]*TreeNode)
    parents[root] = nil

    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if node.Left == nil && node.Right == nil {
            if node.Val == target {
                p := parents[node]
                if p == nil {
                    return nil
                }
                if p.Left == node {
                    p.Left = nil
                }
                if p.Right == node {
                    p.Right = nil
                }
            }
        } else if !visit[node] {
            visit[node] = true
            stack = append(stack, node)
            if node.Left != nil {
                stack = append(stack, node.Left)
                parents[node.Left] = node
            }
            if node.Right != nil {
                stack = append(stack, node.Right)
                parents[node.Right] = node
            }
        }
    }

    return root
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
    fun removeLeafNodes(root: TreeNode?, target: Int): TreeNode? {
        if (root == null) return null

        val stack = ArrayDeque<TreeNode>()
        val visit = mutableSetOf<TreeNode>()
        val parents = mutableMapOf<TreeNode, TreeNode?>()

        stack.addLast(root)
        parents[root] = null

        while (stack.isNotEmpty()) {
            val node = stack.removeLast()

            if (node.left == null && node.right == null) {
                if (node.`val` == target) {
                    val p = parents[node]
                    if (p == null) return null
                    if (p.left == node) p.left = null
                    if (p.right == node) p.right = null
                }
            } else if (node !in visit) {
                visit.add(node)
                stack.addLast(node)
                node.left?.let {
                    stack.addLast(it)
                    parents[it] = node
                }
                node.right?.let {
                    stack.addLast(it)
                    parents[it] = node
                }
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
    func removeLeafNodes(_ root: TreeNode?, _ target: Int) -> TreeNode? {
        guard let root = root else { return nil }

        var stack = [root]
        var visit = Set<ObjectIdentifier>()
        var parents = [ObjectIdentifier: TreeNode?]()
        parents[ObjectIdentifier(root)] = nil

        while !stack.isEmpty {
            let node = stack.removeLast()
            let nodeId = ObjectIdentifier(node)

            if node.left == nil && node.right == nil {
                if node.val == target {
                    guard let p = parents[nodeId] as? TreeNode else {
                        return nil
                    }
                    if p.left === node { p.left = nil }
                    if p.right === node { p.right = nil }
                }
            } else if !visit.contains(nodeId) {
                visit.insert(nodeId)
                stack.append(node)
                if let left = node.left {
                    stack.append(left)
                    parents[ObjectIdentifier(left)] = node
                }
                if let right = node.right {
                    stack.append(right)
                    parents[ObjectIdentifier(right)] = node
                }
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

## 3. Iterative Postorder Traversal (Optimal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def removeLeafNodes(self, root: Optional[TreeNode], target: int) -> Optional[TreeNode]:
        if not root:
            return None

        stack = []
        cur = root
        visited = None

        while stack or cur:
            while cur:
                stack.append(cur)
                cur = cur.left

            cur = stack[-1]
            if cur.right and cur.right != visited:
                cur = cur.right
                continue

            stack.pop()
            if not cur.left and not cur.right and cur.val == target:
                if not stack:
                    return None

                parent = stack[-1]
                if parent.left == cur:
                    parent.left = None
                elif parent.right == cur:
                    parent.right = None
            else:
                visited = cur

            cur = None

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
    public TreeNode removeLeafNodes(TreeNode root, int target) {
        if (root == null) return null;

        Stack<TreeNode> stack = new Stack<>();
        TreeNode cur = root, visited = null;

        while (!stack.isEmpty() || cur != null) {
            while (cur != null) {
                stack.push(cur);
                cur = cur.left;
            }

            cur = stack.peek();
            if (cur.right != null && cur.right != visited) {
                cur = cur.right;
                continue;
            }

            stack.pop();
            if (cur.left == null && cur.right == null && cur.val == target) {
                if (stack.isEmpty()) return null;

                TreeNode parent = stack.peek();
                if (parent.left == cur) {
                    parent.left = null;
                } else if (parent.right == cur) {
                    parent.right = null;
                }
            } else {
                visited = cur;
            }

            cur = null;
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
    TreeNode* removeLeafNodes(TreeNode* root, int target) {
        if (!root) return nullptr;

        stack<TreeNode*> stack;
        TreeNode* cur = root;
        TreeNode* visited = nullptr;

        while (!stack.empty() || cur) {
            while (cur) {
                stack.push(cur);
                cur = cur->left;
            }

            cur = stack.top();
            if (cur->right && cur->right != visited) {
                cur = cur->right;
                continue;
            }

            stack.pop();
            if (!cur->left && !cur->right && cur->val == target) {
                if (stack.empty()) return nullptr;

                TreeNode* parent = stack.top();
                if (parent->left == cur) {
                    parent->left = nullptr;
                } else if (parent->right == cur) {
                    parent->right = nullptr;
                }
            } else {
                visited = cur;
            }

            cur = nullptr;
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
     * @param {number} target
     * @return {TreeNode}
     */
    removeLeafNodes(root, target) {
        if (!root) return null;

        const stack = [];
        let cur = root,
            visited = null;

        while (stack.length > 0 || cur !== null) {
            while (cur !== null) {
                stack.push(cur);
                cur = cur.left;
            }

            cur = stack[stack.length - 1];
            if (cur.right && cur.right !== visited) {
                cur = cur.right;
                continue;
            }

            stack.pop();
            if (!cur.left && !cur.right && cur.val === target) {
                if (stack.length === 0) return null;

                const parent = stack[stack.length - 1];
                if (parent.left === cur) {
                    parent.left = null;
                } else if (parent.right === cur) {
                    parent.right = null;
                }
            } else {
                visited = cur;
            }

            cur = null;
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
    public TreeNode RemoveLeafNodes(TreeNode root, int target) {
        if (root == null) return null;

        Stack<TreeNode> stack = new Stack<TreeNode>();
        TreeNode cur = root;
        TreeNode visited = null;

        while (stack.Count > 0 || cur != null) {
            while (cur != null) {
                stack.Push(cur);
                cur = cur.left;
            }

            cur = stack.Peek();
            if (cur.right != null && cur.right != visited) {
                cur = cur.right;
                continue;
            }

            stack.Pop();
            if (cur.left == null && cur.right == null && cur.val == target) {
                if (stack.Count == 0) return null;

                TreeNode parent = stack.Peek();
                if (parent.left == cur) {
                    parent.left = null;
                } else if (parent.right == cur) {
                    parent.right = null;
                }
            } else {
                visited = cur;
            }

            cur = null;
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
func removeLeafNodes(root *TreeNode, target int) *TreeNode {
    if root == nil {
        return nil
    }

    stack := []*TreeNode{}
    cur := root
    var visited *TreeNode

    for len(stack) > 0 || cur != nil {
        for cur != nil {
            stack = append(stack, cur)
            cur = cur.Left
        }

        cur = stack[len(stack)-1]
        if cur.Right != nil && cur.Right != visited {
            cur = cur.Right
            continue
        }

        stack = stack[:len(stack)-1]
        if cur.Left == nil && cur.Right == nil && cur.Val == target {
            if len(stack) == 0 {
                return nil
            }

            parent := stack[len(stack)-1]
            if parent.Left == cur {
                parent.Left = nil
            } else if parent.Right == cur {
                parent.Right = nil
            }
        } else {
            visited = cur
        }

        cur = nil
    }

    return root
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
    fun removeLeafNodes(root: TreeNode?, target: Int): TreeNode? {
        if (root == null) return null

        val stack = ArrayDeque<TreeNode>()
        var cur: TreeNode? = root
        var visited: TreeNode? = null

        while (stack.isNotEmpty() || cur != null) {
            while (cur != null) {
                stack.addLast(cur)
                cur = cur.left
            }

            cur = stack.last()
            if (cur.right != null && cur.right != visited) {
                cur = cur.right
                continue
            }

            stack.removeLast()
            if (cur.left == null && cur.right == null && cur.`val` == target) {
                if (stack.isEmpty()) return null

                val parent = stack.last()
                if (parent.left == cur) {
                    parent.left = null
                } else if (parent.right == cur) {
                    parent.right = null
                }
            } else {
                visited = cur
            }

            cur = null
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
    func removeLeafNodes(_ root: TreeNode?, _ target: Int) -> TreeNode? {
        guard let root = root else { return nil }

        var stack = [TreeNode]()
        var cur: TreeNode? = root
        var visited: TreeNode? = nil

        while !stack.isEmpty || cur != nil {
            while cur != nil {
                stack.append(cur!)
                cur = cur!.left
            }

            cur = stack.last
            if cur!.right != nil && cur!.right !== visited {
                cur = cur!.right
                continue
            }

            stack.removeLast()
            if cur!.left == nil && cur!.right == nil && cur!.val == target {
                if stack.isEmpty { return nil }

                let parent = stack.last!
                if parent.left === cur {
                    parent.left = nil
                } else if parent.right === cur {
                    parent.right = nil
                }
            } else {
                visited = cur
            }

            cur = nil
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
