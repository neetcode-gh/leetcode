## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Trees** - Understanding tree node structure and parent-child relationships
- **Depth First Search (DFS)** - Recursive tree traversal to explore all nodes and combine subtree results
- **Breadth First Search (BFS)** - Level-order traversal using a queue to build parent pointers
- **Hash Maps** - Storing parent references for each node to trace paths back to the root

---

## 1. Depth First Search

### Intuition

The lowest common ancestor (LCA) is the deepest node that has both `p` and `q` as descendants. We traverse the tree and track whether each subtree contains `p`, `q`, or both. The first node where we find both targets in its subtree (including itself) is the LCA. Once found, we can stop searching.

### Algorithm

1. Define `dfs(node)` that returns a pair of booleans indicating whether `p` and `q` are found in the subtree rooted at `node`.
2. If `node` is `null` or LCA is already found, return `[false, false]`.
3. Recursively search left and right subtrees.
4. Combine results: `foundP = left[0] or right[0] or (node == p)` and similarly for `foundQ`.
5. If both `foundP` and `foundQ` are `true` and LCA is not yet set, mark the current node as LCA.
6. Return the combined result.
7. Call `dfs(root)` and return the LCA.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        lca = None

        def dfs(node):
            nonlocal lca
            if not node:
                return [False, False]
            if lca:
                return [False, False]

            left = dfs(node.left)
            right = dfs(node.right)
            res = [left[0] or right[0] or (node == p), left[1] or right[1] or (node == q)]
            if res[0] and res[1] and not lca:
                lca = node

            return res 

        dfs(root)
        return lca
```

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    private TreeNode lca = null;

    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        lca = null;
        dfs(root, p, q);
        return lca;
    }

    private boolean[] dfs(TreeNode node, TreeNode p, TreeNode q) {
        if (node == null || lca != null) {
            return new boolean[]{false, false};
        }
        boolean[] left = dfs(node.left, p, q);
        boolean[] right = dfs(node.right, p, q);
        boolean foundP = left[0] || right[0] || node == p;
        boolean foundQ = left[1] || right[1] || node == q;
        if (foundP && foundQ && lca == null) {
            lca = node;
        }
        return new boolean[]{foundP, foundQ};
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
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        lca = nullptr;
        dfs(root, p, q);
        return lca;
    }

private:
    TreeNode* lca;

    pair<bool,bool> dfs(TreeNode* node, TreeNode* p, TreeNode* q) {
        if (!node || lca) {
            return {false, false};
        }
        auto left = dfs(node->left, p, q);
        auto right = dfs(node->right, p, q);
        bool foundP = left.first || right.first || node == p;
        bool foundQ = left.second || right.second || node == q;
        if (foundP && foundQ && !lca) {
            lca = node;
        }
        return {foundP, foundQ};
    }
};
```

```javascript
/**
 * // Definition for a Node.
 * function Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {TreeNode}
     */
    lowestCommonAncestor(root, p, q) {
        let lca = null;
        const dfs = node => {
            if (!node || lca) return [false, false];
            const left = dfs(node.left);
            const right = dfs(node.right);
            const foundP = left[0] || right[0] || node === p;
            const foundQ = left[1] || right[1] || node === q;
            if (foundP && foundQ && !lca) {
                lca = node;
            }
            return [foundP, foundQ];
        };
        dfs(root);
        return lca;
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
 *     public TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    private TreeNode lca = null;

    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        lca = null;
        Dfs(root, p, q);
        return lca;
    }

    private (bool, bool) Dfs(TreeNode node, TreeNode p, TreeNode q) {
        if (node == null || lca != null) {
            return (false, false);
        }
        var left = Dfs(node.left, p, q);
        var right = Dfs(node.right, p, q);
        bool foundP = left.Item1 || right.Item1 || node == p;
        bool foundQ = left.Item2 || right.Item2 || node == q;
        if (foundP && foundQ && lca == null) {
            lca = node;
        }
        return (foundP, foundQ);
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
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    var lca *TreeNode

    var dfs func(node *TreeNode) (bool, bool)
    dfs = func(node *TreeNode) (bool, bool) {
        if node == nil || lca != nil {
            return false, false
        }
        leftP, leftQ := dfs(node.Left)
        rightP, rightQ := dfs(node.Right)
        foundP := leftP || rightP || node == p
        foundQ := leftQ || rightQ || node == q
        if foundP && foundQ && lca == nil {
            lca = node
        }
        return foundP, foundQ
    }

    dfs(root)
    return lca
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
    private var lca: TreeNode? = null

    fun lowestCommonAncestor(root: TreeNode?, p: TreeNode?, q: TreeNode?): TreeNode? {
        lca = null
        dfs(root, p, q)
        return lca
    }

    private fun dfs(node: TreeNode?, p: TreeNode?, q: TreeNode?): Pair<Boolean, Boolean> {
        if (node == null || lca != null) {
            return Pair(false, false)
        }
        val left = dfs(node.left, p, q)
        val right = dfs(node.right, p, q)
        val foundP = left.first || right.first || node === p
        val foundQ = left.second || right.second || node === q
        if (foundP && foundQ && lca == null) {
            lca = node
        }
        return Pair(foundP, foundQ)
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
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.left = nil
 *         self.right = nil
 *     }
 * }
 */
class Solution {
    private var lca: TreeNode? = nil

    func lowestCommonAncestor(_ root: TreeNode?, _ p: TreeNode?, _ q: TreeNode?) -> TreeNode? {
        lca = nil
        dfs(root, p, q)
        return lca
    }

    private func dfs(_ node: TreeNode?, _ p: TreeNode?, _ q: TreeNode?) -> (Bool, Bool) {
        guard let node = node, lca == nil else {
            return (false, false)
        }
        let left = dfs(node.left, p, q)
        let right = dfs(node.right, p, q)
        let foundP = left.0 || right.0 || node === p
        let foundQ = left.1 || right.1 || node === q
        if foundP && foundQ && lca == nil {
            lca = node
        }
        return (foundP, foundQ)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 2. Depth First Search (Optimal)

### Intuition

We can simplify the approach by returning the node itself rather than boolean flags. If a node is `p` or `q`, we return it immediately. Otherwise, we recursively search both subtrees. If both return non-`null` values, the current node must be the LCA. If only one side returns a value, we propagate that up since both targets are in that subtree.

### Algorithm

1. If `root` is `null`, return `null`.
2. If `root` equals `p` or `q`, return `root`.
3. Recursively call on the `left` and `right` children.
4. If both `left` and `right` return non-`null`, return `root` (it's the LCA).
5. Otherwise, return whichever side is non-`null` (or `null` if both are `null`).

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(
        self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode'
    ) -> 'TreeNode':
        if root is None or root is p or root is q:
            return root

        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        if left and right:
            return root

        return left if left else right
```

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            return root;
        }
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) {
            return root;
        }
        return left != null ? left : right;
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
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) {
            return root;
        }
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left && right) {
            return root;
        }
        return left ? left : right;
    }
};
```

```javascript
/**
 * // Definition for a Node.
 * function Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {TreeNode}
     */
    lowestCommonAncestor(root, p, q) {
        if (!root || root === p || root === q) {
            return root;
        }
        const left = this.lowestCommonAncestor(root.left, p, q);
        const right = this.lowestCommonAncestor(root.right, p, q);
        return left && right ? root : (left || right);
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
 *     public TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            return root;
        }
        TreeNode left = LowestCommonAncestor(root.left, p, q);
        TreeNode right = LowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) {
            return root;
        }
        return left ?? right;
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
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    if root == nil || root == p || root == q {
        return root
    }
    left := lowestCommonAncestor(root.Left, p, q)
    right := lowestCommonAncestor(root.Right, p, q)
    if left != nil && right != nil {
        return root
    }
    if left != nil {
        return left
    }
    return right
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
    fun lowestCommonAncestor(root: TreeNode?, p: TreeNode?, q: TreeNode?): TreeNode? {
        if (root == null || root === p || root === q) {
            return root
        }
        val left = lowestCommonAncestor(root.left, p, q)
        val right = lowestCommonAncestor(root.right, p, q)
        if (left != null && right != null) {
            return root
        }
        return left ?: right
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
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.left = nil
 *         self.right = nil
 *     }
 * }
 */
class Solution {
    func lowestCommonAncestor(_ root: TreeNode?, _ p: TreeNode?, _ q: TreeNode?) -> TreeNode? {
        if root == nil || root === p || root === q {
            return root
        }
        let left = lowestCommonAncestor(root?.left, p, q)
        let right = lowestCommonAncestor(root?.right, p, q)
        if left != nil && right != nil {
            return root
        }
        return left ?? right
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Breadth First Search

### Intuition

Instead of recursion, we can use BFS to build a parent pointer map for each node. Once we have parent pointers, we trace the path from `p` to the root and store all ancestors. Then we trace from `q` upward until we hit a node that's already in `p`'s ancestor set. That node is the LCA.

### Algorithm

1. Use BFS to traverse the tree, storing each node's parent in a hash map.
2. Continue BFS until both `p` and `q` are found in the `parent` map.
3. Create an `ancestors` set and trace from `p` to the root, adding each node to the set.
4. Trace from `q` upward until finding a node that exists in the `ancestors` set.
5. Return that node as the LCA.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(
        self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode'
    ) -> 'TreeNode':
        parent = {root: None}
        queue = deque([root])
        while p not in parent or q not in parent:
            node = queue.popleft()
            if node.left:
                parent[node.left] = node
                queue.append(node.left)
            if node.right:
                parent[node.right] = node
                queue.append(node.right)

        ancestors = set()
        while p:
            ancestors.add(p)
            p = parent[p]

        while q not in ancestors:
            q = parent[q]

        return q
```

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        Map<TreeNode, TreeNode> parent = new HashMap<>();
        Queue<TreeNode> queue = new LinkedList<>();
        parent.put(root, null);
        queue.add(root);
        while (!parent.containsKey(p) || !parent.containsKey(q)) {
            TreeNode node = queue.poll();
            if (node.left != null) {
                parent.put(node.left, node);
                queue.add(node.left);
            }
            if (node.right != null) {
                parent.put(node.right, node);
                queue.add(node.right);
            }
        }

        Set<TreeNode> ancestors = new HashSet<>();
        while (p != null) {
            ancestors.add(p);
            p = parent.get(p);
        }
        while (!ancestors.contains(q)) {
            q = parent.get(q);
        }
        return q;
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
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root) return nullptr;
        unordered_map<TreeNode*, TreeNode*> parent;
        queue<TreeNode*> queue;
        parent[root] = nullptr;
        queue.push(root);
        while (!parent.count(p) || !parent.count(q)) {
            TreeNode* node = queue.front(); queue.pop();
            if (node->left) {
                parent[node->left] = node;
                queue.push(node->left);
            }
            if (node->right) {
                parent[node->right] = node;
                queue.push(node->right);
            }
        }

        unordered_set<TreeNode*> ancestors;
        while (p) {
            ancestors.insert(p);
            p = parent[p];
        }
        while (!ancestors.count(q)) {
            q = parent[q];
        }
        return q;
    }
};
```

```javascript
/**
 * // Definition for a Node.
 * function Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {TreeNode}
     */
    lowestCommonAncestor(root, p, q) {
        if (!root) return null;
        const parent = new Map();
        const queue = new Queue([root]);
        parent.set(root, null);
        while (!parent.has(p) || !parent.has(q)) {
            const node = queue.pop();
            if (node.left) {
                parent.set(node.left, node);
                queue.push(node.left);
            }
            if (node.right) {
                parent.set(node.right, node);
                queue.push(node.right);
            }
        }

        const ancestors = new Set();
        while (p) {
            ancestors.add(p);
            p = parent.get(p);
        }
        while (!ancestors.has(q)) {
            q = parent.get(q);
        }
        return q;
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
 *     public TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        var parent = new Dictionary<TreeNode, TreeNode>();
        var queue = new Queue<TreeNode>();
        parent[root] = null;
        queue.Enqueue(root);
        while (!parent.ContainsKey(p) || !parent.ContainsKey(q)) {
            var node = queue.Dequeue();
            if (node.left != null) {
                parent[node.left] = node;
                queue.Enqueue(node.left);
            }
            if (node.right != null) {
                parent[node.right] = node;
                queue.Enqueue(node.right);
            }
        }

        var ancestors = new HashSet<TreeNode>();
        while (p != null) {
            ancestors.Add(p);
            p = parent[p];
        }
        while (!ancestors.Contains(q)) {
            q = parent[q];
        }
        return q;
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
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    if root == nil {
        return nil
    }
    parent := make(map[*TreeNode]*TreeNode)
    parent[root] = nil
    queue := []*TreeNode{root}

    for _, hasP := parent[p]; !hasP; _, hasP = parent[p] {
        if _, hasQ := parent[q]; hasQ {
            break
        }
        node := queue[0]
        queue = queue[1:]
        if node.Left != nil {
            parent[node.Left] = node
            queue = append(queue, node.Left)
        }
        if node.Right != nil {
            parent[node.Right] = node
            queue = append(queue, node.Right)
        }
    }
    for _, hasQ := parent[q]; !hasQ; _, hasQ = parent[q] {
        node := queue[0]
        queue = queue[1:]
        if node.Left != nil {
            parent[node.Left] = node
            queue = append(queue, node.Left)
        }
        if node.Right != nil {
            parent[node.Right] = node
            queue = append(queue, node.Right)
        }
    }

    ancestors := make(map[*TreeNode]bool)
    for p != nil {
        ancestors[p] = true
        p = parent[p]
    }
    for !ancestors[q] {
        q = parent[q]
    }
    return q
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
    fun lowestCommonAncestor(root: TreeNode?, p: TreeNode?, q: TreeNode?): TreeNode? {
        if (root == null) return null
        val parent = HashMap<TreeNode, TreeNode?>()
        val queue: java.util.Queue<TreeNode> = java.util.LinkedList()
        parent[root] = null
        queue.add(root)

        var pNode = p
        var qNode = q

        while (!parent.containsKey(pNode) || !parent.containsKey(qNode)) {
            val node = queue.poll()
            node.left?.let {
                parent[it] = node
                queue.add(it)
            }
            node.right?.let {
                parent[it] = node
                queue.add(it)
            }
        }

        val ancestors = HashSet<TreeNode>()
        while (pNode != null) {
            ancestors.add(pNode)
            pNode = parent[pNode]
        }
        while (qNode !in ancestors) {
            qNode = parent[qNode]
        }
        return qNode
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
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.left = nil
 *         self.right = nil
 *     }
 * }
 */
class Solution {
    func lowestCommonAncestor(_ root: TreeNode?, _ p: TreeNode?, _ q: TreeNode?) -> TreeNode? {
        guard let root = root else { return nil }

        var parent: [ObjectIdentifier: TreeNode?] = [ObjectIdentifier(root): nil]
        var queue: [TreeNode] = [root]

        var pNode = p
        var qNode = q

        while (pNode == nil || parent[ObjectIdentifier(pNode!)] == nil && pNode !== root) ||
              (qNode == nil || parent[ObjectIdentifier(qNode!)] == nil && qNode !== root) {
            let node = queue.removeFirst()
            if let left = node.left {
                parent[ObjectIdentifier(left)] = node
                queue.append(left)
            }
            if let right = node.right {
                parent[ObjectIdentifier(right)] = node
                queue.append(right)
            }
        }

        var ancestors = Set<ObjectIdentifier>()
        while let pn = pNode {
            ancestors.insert(ObjectIdentifier(pn))
            pNode = parent[ObjectIdentifier(pn)] ?? nil
        }
        while let qn = qNode, !ancestors.contains(ObjectIdentifier(qn)) {
            qNode = parent[ObjectIdentifier(qn)] ?? nil
        }
        return qNode
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## Common Pitfalls

### Returning Early Without Checking Both Subtrees

A common mistake in the recursive approach is returning as soon as you find `p` or `q`, without considering that the other target might be in a different subtree. The correct approach returns the current node if it matches a target, but the parent call must still check both subtree results to determine if the current node is the LCA.

### Confusing Node Reference with Node Value

The problem asks for the LCA of specific nodes `p` and `q`, not nodes with values `p.val` and `q.val`. Since tree nodes can have duplicate values, you must compare node references (`node == p`) rather than values (`node.val == p.val`). Using value comparison fails when multiple nodes share the same value.

### Mishandling the Case Where One Node is Ancestor of the Other

When `p` is an ancestor of `q` (or vice versa), the LCA is the ancestor node itself. A common bug is failing to recognize this case and continuing to search unnecessarily. In the optimal recursive solution, returning the node immediately when it matches `p` or `q` naturally handles this case, since the other target will be found in that node's subtree.