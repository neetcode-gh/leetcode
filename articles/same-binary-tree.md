## 1. Depth First Search

### Intuition
Two binary trees are the same if:
1. Their structure is identical.
2. Their corresponding nodes have the same values.

So at every position:
- If both nodes are `null` → they match.
- If one is `null` but the other isn't → mismatch.
- If both exist but values differ → mismatch.
- Otherwise, compare their left subtrees and right subtrees recursively.

This is a direct structural + value-based DFS comparison.

### Algorithm
1. If both `p` and `q` are `null`, return `true`.
2. If only one is `null`, return `false`.
3. If their values differ, return `false`.
4. Recursively compare:
   - `p.left` with `q.left`
   - `p.right` with `q.right`
5. Return `true` only if both subtree comparisons are `true`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if not p and not q:
            return True
        if p and q and p.val == q.val:
            return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
        else:
            return False
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

class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        }
        if (p != null && q != null && p.val == q.val) {
            return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
        } else {
            return false;
        }
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
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q) {
            return true;
        }
        if (p && q && p->val == q->val) {
            return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
        } else {
            return false;
        }
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
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {boolean}
     */
    isSameTree(p, q) {
        if (!p && !q) {
            return true;
        }
        if (p && q && p.val === q.val) {
            return (
                this.isSameTree(p.left, q.left) &&
                this.isSameTree(p.right, q.right)
            );
        } else {
            return false;
        }
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
    public bool IsSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        }
        if (p != null && q != null && p.val == q.val) {
            return IsSameTree(p.left, q.left) && IsSameTree(p.right, q.right);
        } else {
            return false;
        }
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
func isSameTree(p *TreeNode, q *TreeNode) bool {
    if p == nil && q == nil {
        return true
    }
    if p != nil && q != nil && p.Val == q.Val {
        return isSameTree(p.Left, q.Left) && isSameTree(p.Right, q.Right)
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
    fun isSameTree(p: TreeNode?, q: TreeNode?): Boolean {
        if (p == null && q == null) {
            return true
        }
        if (p != null && q != null && p.`val` == q.`val`) {
            return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
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
    func isSameTree(_ p: TreeNode?, _ q: TreeNode?) -> Bool {
        if p == nil && q == nil {
            return true
        }
        if let p = p, let q = q, p.val == q.val {
            return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
        } else {
            return false
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
    - Best Case ([balanced tree](https://www.geeksforgeeks.org/balanced-binary-tree/)): $O(log(n))$
    - Worst Case ([degenerate tree](https://www.geeksforgeeks.org/introduction-to-degenerate-binary-tree/)): $O(n)$

> Where $n$ is the number of nodes in the tree and $h$ is the height of the tree.

---

## 2. Iterative DFS

### Intuition
Instead of using recursion, we can use an explicit stack to compare the two trees.
Each stack entry contains a pair of nodes—one from each tree—that should match.

For every pair:
- If both are `null`, they match → continue.
- If only one is `null`, or their values differ → trees are not the same.
- If they match, push their children in the same order:
  - Left child pair
  - Right child pair

If we finish processing all pairs with no mismatch, the trees are identical.

### Algorithm
1. Initialize a stack with the pair `(p, q)`.
2. While the stack is not empty:
   - Pop a pair `(node1, node2)`.
   - If both are `null`, continue.
   - If exactly one is `null`, return `false`.
   - If `node1.val != node2.val`, return `false`.
   - Push:
     - `(node1.left, node2.left)`
     - `(node1.right, node2.right)`
3. After the loop finishes, return `true` (all nodes matched).

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        stack = [(p, q)]

        while stack:
            node1, node2 = stack.pop()

            if not node1 and not node2:
                continue
            if not node1 or not node2 or node1.val != node2.val:
                return False

            stack.append((node1.right, node2.right))
            stack.append((node1.left, node2.left))

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
    public boolean isSameTree(TreeNode p, TreeNode q) {
        Stack<TreeNode[]> stack = new Stack<>();
        stack.push(new TreeNode[]{p, q});

        while (!stack.isEmpty()) {
            TreeNode[] nodes = stack.pop();
            TreeNode node1 = nodes[0], node2 = nodes[1];

            if (node1 == null && node2 == null) continue;
            if (node1 == null || node2 == null || node1.val != node2.val) {
                return false;
            }
            stack.push(new TreeNode[]{node1.right, node2.right});
            stack.push(new TreeNode[]{node1.left, node2.left});
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
    bool isSameTree(TreeNode* p, TreeNode* q) {
        stack<pair<TreeNode*, TreeNode*>> stk;
        stk.push({p, q});

        while (!stk.empty()) {
            auto [node1, node2] = stk.top();
            stk.pop();

            if (!node1 && !node2) continue;
            if (!node1 || !node2 || node1->val != node2->val) return false;

            stk.push({node1->right, node2->right});
            stk.push({node1->left, node2->left});
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
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {boolean}
     */
    isSameTree(p, q) {
        const stack = [[p, q]];

        while (stack.length) {
            const [node1, node2] = stack.pop();

            if (!node1 && !node2) continue;
            if (!node1 || !node2 || node1.val !== node2.val) {
                return false;
            }
            stack.push([node1.right, node2.right]);
            stack.push([node1.left, node2.left]);
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
    public bool IsSameTree(TreeNode p, TreeNode q) {
        var stack = new Stack<(TreeNode, TreeNode)>();
        stack.Push((p, q));

        while (stack.Count > 0) {
            var (node1, node2) = stack.Pop();

            if (node1 == null && node2 == null) continue;
            if (node1 == null || node2 == null || node1.val != node2.val) {
                return false;
            }
            stack.Push((node1.right, node2.right));
            stack.Push((node1.left, node2.left));
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
func isSameTree(p *TreeNode, q *TreeNode) bool {
    type Pair struct {
        first, second *TreeNode
    }

    stack := []Pair{{p, q}}

    for len(stack) > 0 {
        lastIdx := len(stack) - 1
        node1, node2 := stack[lastIdx].first, stack[lastIdx].second
        stack = stack[:lastIdx]

        if node1 == nil && node2 == nil {
            continue
        }
        if node1 == nil || node2 == nil || node1.Val != node2.Val {
            return false
        }

        stack = append(stack, Pair{node1.Right, node2.Right})
        stack = append(stack, Pair{node1.Left, node2.Left})
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
    fun isSameTree(p: TreeNode?, q: TreeNode?): Boolean {
        val stack = ArrayDeque<Pair<TreeNode?, TreeNode?>>()
        stack.addLast(Pair(p, q))

        while (stack.isNotEmpty()) {
            val (node1, node2) = stack.removeLast()

            if (node1 == null && node2 == null) continue
            if (node1 == null || node2 == null || node1.`val` != node2.`val`) {
                return false
            }
            stack.addLast(Pair(node1.right, node2.right))
            stack.addLast(Pair(node1.left, node2.left))
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
    func isSameTree(_ p: TreeNode?, _ q: TreeNode?) -> Bool {
        var stack: [(TreeNode?, TreeNode?)] = [(p, q)]

        while !stack.isEmpty {
            let (node1, node2) = stack.removeLast()

            if node1 == nil && node2 == nil {
                continue
            }
            if node1 == nil || node2 == nil || node1!.val != node2!.val {
                return false
            }

            stack.append((node1!.right, node2!.right))
            stack.append((node1!.left, node2!.left))
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
BFS (level-order traversal) lets us compare the two trees **level by level**.
We maintain two queues—one for each tree. At every step, we remove a pair of nodes
that should match:

- If both nodes are `null`, they match → continue.
- If only one is `null`, or their values differ → trees are not the same.
- If they match, we push their children into their respective queues
  **in the same order**: left child first, then right child.

### Algorithm
1. Initialize two queues:
   - `q1` containing the root of the first tree.
   - `q2` containing the root of the second tree.
2. While both queues are non-empty:
   - Pop one node from each queue: `nodeP`, `nodeQ`.
   - If both are `null`, continue.
   - If only one is `null`, return `false`.
   - If their values differ, return `false`.
   - Enqueue their children:
     - Left children of both trees.
     - Right children of both trees.
3. After BFS completes with no mismatch, return `true`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        q1 = deque([p])
        q2 = deque([q])

        while q1 and q2:
            for _ in range(len(q1)):
                nodeP = q1.popleft()
                nodeQ = q2.popleft()

                if nodeP is None and nodeQ is None:
                    continue
                if nodeP is None or nodeQ is None or nodeP.val != nodeQ.val:
                    return False

                q1.append(nodeP.left)
                q1.append(nodeP.right)
                q2.append(nodeQ.left)
                q2.append(nodeQ.right)

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
    public boolean isSameTree(TreeNode p, TreeNode q) {
        Queue<TreeNode> q1 = new LinkedList<>();
        Queue<TreeNode> q2 = new LinkedList<>();
        q1.add(p);
        q2.add(q);

        while (!q1.isEmpty() && !q2.isEmpty()) {
            for (int i = q1.size(); i > 0; i--) {
                TreeNode nodeP = q1.poll();
                TreeNode nodeQ = q2.poll();

                if (nodeP == null && nodeQ == null) continue;
                if (nodeP == null || nodeQ == null || nodeP.val != nodeQ.val)
                    return false;

                q1.add(nodeP.left);
                q1.add(nodeP.right);
                q2.add(nodeQ.left);
                q2.add(nodeQ.right);
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
    bool isSameTree(TreeNode* p, TreeNode* q) {
        queue<TreeNode*> q1;
        queue<TreeNode*> q2;
        q1.push(p);
        q2.push(q);

        while (!q1.empty() && !q2.empty()) {
            for (int i = q1.size(); i > 0; i--) {
                TreeNode* nodeP = q1.front(); q1.pop();
                TreeNode* nodeQ = q2.front(); q2.pop();

                if (!nodeP && !nodeQ) continue;
                if (!nodeP || !nodeQ || nodeP->val != nodeQ->val)
                    return false;

                q1.push(nodeP->left);
                q1.push(nodeP->right);
                q2.push(nodeQ->left);
                q2.push(nodeQ->right);
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
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {boolean}
     */
    isSameTree(p, q) {
        const q1 = new Queue();
        const q2 = new Queue();
        q1.push(p);
        q2.push(q);

        while (!q1.isEmpty() && !q2.isEmpty()) {
            for (let i = q1.size(); i > 0; i--) {
                let nodeP = q1.pop();
                let nodeQ = q2.pop();

                if (nodeP === null && nodeQ === null) continue;
                if (
                    nodeP === null ||
                    nodeQ === null ||
                    nodeP.val !== nodeQ.val
                ) {
                    return false;
                }

                q1.push(nodeP.left);
                q1.push(nodeP.right);
                q2.push(nodeQ.left);
                q2.push(nodeQ.right);
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
    public bool IsSameTree(TreeNode p, TreeNode q) {
        var q1 = new Queue<TreeNode>(new[] { p });
        var q2 = new Queue<TreeNode>(new[] { q });

        while (q1.Count > 0 && q2.Count > 0) {
            for (int i = q1.Count; i > 0; i--) {
                var nodeP = q1.Dequeue();
                var nodeQ = q2.Dequeue();

                if (nodeP == null && nodeQ == null) continue;
                if (nodeP == null || nodeQ == null || nodeP.val != nodeQ.val) {
                    return false;
                }

                q1.Enqueue(nodeP.left);
                q1.Enqueue(nodeP.right);
                q2.Enqueue(nodeQ.left);
                q2.Enqueue(nodeQ.right);
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
func isSameTree(p *TreeNode, q *TreeNode) bool {
    queue1 := []*TreeNode{p}
    queue2 := []*TreeNode{q}

    for len(queue1) > 0 && len(queue2) > 0 {
        for i := len(queue1); i > 0; i-- {
            nodeP := queue1[0]
            nodeQ := queue2[0]
            queue1 = queue1[1:]
            queue2 = queue2[1:]

            if nodeP == nil && nodeQ == nil {
                continue
            }
            if nodeP == nil || nodeQ == nil || nodeP.Val != nodeQ.Val {
                return false
            }

            queue1 = append(queue1, nodeP.Left, nodeP.Right)
            queue2 = append(queue2, nodeQ.Left, nodeQ.Right)
        }
    }

    return len(queue1) == 0 && len(queue2) == 0
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
    fun isSameTree(p: TreeNode?, q: TreeNode?): Boolean {
        val q1 = ArrayDeque<TreeNode?>()
        val q2 = ArrayDeque<TreeNode?>()

        q1.add(p)
        q2.add(q)

        while (q1.isNotEmpty() && q2.isNotEmpty()) {
            for (i in q1.size downTo 1) {
                val nodeP = q1.removeFirst()
                val nodeQ = q2.removeFirst()

                if (nodeP == null && nodeQ == null) {
                    continue
                }
                if (nodeP == null || nodeQ == null || nodeP.`val` != nodeQ.`val`) {
                    return false
                }

                q1.add(nodeP.left)
                q1.add(nodeP.right)
                q2.add(nodeQ.left)
                q2.add(nodeQ.right)
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
    func isSameTree(_ p: TreeNode?, _ q: TreeNode?) -> Bool {
        var q1 = Deque<TreeNode?>()
        var q2 = Deque<TreeNode?>()
        q1.append(p)
        q2.append(q)

        while !q1.isEmpty && !q2.isEmpty {
            let nodeP = q1.removeFirst()
            let nodeQ = q2.removeFirst()

            if nodeP == nil && nodeQ == nil {
                continue
            }
            if nodeP == nil || nodeQ == nil || nodeP!.val != nodeQ!.val {
                return false
            }

            q1.append(nodeP!.left)
            q1.append(nodeP!.right)
            q2.append(nodeQ!.left)
            q2.append(nodeQ!.right)
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
