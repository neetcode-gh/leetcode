## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Trees** - Understanding tree structure, nodes, left/right children, and tree depth concepts
- **Breadth-First Search (BFS)** - Level-order traversal using a queue to process nodes level by level
- **Depth-First Search (DFS)** - Recursive and iterative tree traversal techniques with depth tracking

---

## 1. Breadth First Search

### Intuition

We need the leftmost value in the bottom row of the tree. A clever BFS trick handles this: instead of traversing left-to-right, we process nodes right-to-left. This way, the last node we visit in the entire traversal is exactly the bottom-left node. No need to track levels or compare positions.

### Algorithm

1. Initialize a queue with the root node.
2. While the queue is not empty:
   - Dequeue a node.
   - Enqueue the right child first (if it exists), then the left child.
3. When the loop ends, the last dequeued node is the bottom-left value.
4. Return that node's value.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        q = deque([root])

        while q:
            node = q.popleft()
            if node.right:
                q.append(node.right)
            if node.left:
                q.append(node.left)

        return node.val
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
    public int findBottomLeftValue(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        TreeNode node = null;

        while (!q.isEmpty()) {
            node = q.poll();
            if (node.right != null) q.offer(node.right);
            if (node.left != null) q.offer(node.left);
        }
        return node.val;
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
    int findBottomLeftValue(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        TreeNode* node = nullptr;

        while (!q.empty()) {
            node = q.front();
            q.pop();
            if (node->right) q.push(node->right);
            if (node->left) q.push(node->left);
        }
        return node->val;
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
     * @return {number}
     */
    findBottomLeftValue(root) {
        const q = new Queue([root]);
        let node = null;

        while (!q.isEmpty()) {
            node = q.pop();
            if (node.right) q.push(node.right);
            if (node.left) q.push(node.left);
        }
        return node.val;
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
    public int FindBottomLeftValue(TreeNode root) {
        Queue<TreeNode> q = new Queue<TreeNode>();
        q.Enqueue(root);
        TreeNode node = null;

        while (q.Count > 0) {
            node = q.Dequeue();
            if (node.right != null) q.Enqueue(node.right);
            if (node.left != null) q.Enqueue(node.left);
        }
        return node.val;
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
func findBottomLeftValue(root *TreeNode) int {
    q := []*TreeNode{root}
    var node *TreeNode

    for len(q) > 0 {
        node = q[0]
        q = q[1:]
        if node.Right != nil {
            q = append(q, node.Right)
        }
        if node.Left != nil {
            q = append(q, node.Left)
        }
    }
    return node.Val
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
    fun findBottomLeftValue(root: TreeNode?): Int {
        val q: Queue<TreeNode> = LinkedList()
        q.offer(root)
        var node: TreeNode? = null

        while (q.isNotEmpty()) {
            node = q.poll()
            node.right?.let { q.offer(it) }
            node.left?.let { q.offer(it) }
        }
        return node!!.`val`
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
    func findBottomLeftValue(_ root: TreeNode?) -> Int {
        var q = [TreeNode]()
        q.append(root!)
        var node: TreeNode? = nil

        while !q.isEmpty {
            node = q.removeFirst()
            if let right = node?.right {
                q.append(right)
            }
            if let left = node?.left {
                q.append(left)
            }
        }
        return node!.val
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Depth First Search

### Intuition

Using DFS, we track the maximum depth seen so far. Whenever we reach a new maximum depth, we update our result with the current node's value. By visiting the left subtree before the right subtree, the first node we encounter at any given depth is guaranteed to be the leftmost one at that level.

### Algorithm

1. Initialize `maxDepth` to `-1` and `res` to the root's value.
2. Define a recursive DFS function that takes a node and its depth:
   - If the node is `null`, return.
   - If the current depth exceeds `maxDepth`, update `maxDepth` and store the node's value in `res`.
   - Recurse on the left child, then the right child, each with `depth + 1`.
3. Call DFS starting from the root at depth `0`.
4. Return `res`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        self.maxDepth, self.res = -1, root.val

        def dfs(node, depth):
            if not node:
                return
            if depth > self.maxDepth:
                self.maxDepth, self.res = depth, node.val

            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)

        dfs(root, 0)
        return self.res
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
    private int maxDepth = -1;
    private int res;

    public int findBottomLeftValue(TreeNode root) {
        res = root.val;
        dfs(root, 0);
        return res;
    }

    private void dfs(TreeNode node, int depth) {
        if (node == null) return;
        if (depth > maxDepth) {
            maxDepth = depth;
            res = node.val;
        }

        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
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
    int maxDepth = -1, res;

    int findBottomLeftValue(TreeNode* root) {
        res = root->val;
        dfs(root, 0);
        return res;
    }

private:
    void dfs(TreeNode* node, int depth) {
        if (!node) return;
        if (depth > maxDepth) {
            maxDepth = depth;
            res = node->val;
        }

        dfs(node->left, depth + 1);
        dfs(node->right, depth + 1);
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
     * @return {number}
     */
    findBottomLeftValue(root) {
        let maxDepth = -1,
            res = root.val;

        const dfs = (node, depth) => {
            if (!node) return;
            if (depth > maxDepth) {
                maxDepth = depth;
                res = node.val;
            }

            dfs(node.left, depth + 1);
            dfs(node.right, depth + 1);
        };

        dfs(root, 0);
        return res;
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
    private int maxDepth = -1;
    private int res;

    public int FindBottomLeftValue(TreeNode root) {
        res = root.val;
        Dfs(root, 0);
        return res;
    }

    private void Dfs(TreeNode node, int depth) {
        if (node == null) return;
        if (depth > maxDepth) {
            maxDepth = depth;
            res = node.val;
        }

        Dfs(node.left, depth + 1);
        Dfs(node.right, depth + 1);
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
func findBottomLeftValue(root *TreeNode) int {
    maxDepth := -1
    res := root.Val

    var dfs func(node *TreeNode, depth int)
    dfs = func(node *TreeNode, depth int) {
        if node == nil {
            return
        }
        if depth > maxDepth {
            maxDepth = depth
            res = node.Val
        }

        dfs(node.Left, depth+1)
        dfs(node.Right, depth+1)
    }

    dfs(root, 0)
    return res
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
    private var maxDepth = -1
    private var res = 0

    fun findBottomLeftValue(root: TreeNode?): Int {
        res = root!!.`val`
        dfs(root, 0)
        return res
    }

    private fun dfs(node: TreeNode?, depth: Int) {
        if (node == null) return
        if (depth > maxDepth) {
            maxDepth = depth
            res = node.`val`
        }

        dfs(node.left, depth + 1)
        dfs(node.right, depth + 1)
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
    private var maxDepth = -1
    private var res = 0

    func findBottomLeftValue(_ root: TreeNode?) -> Int {
        res = root!.val
        dfs(root, 0)
        return res
    }

    private func dfs(_ node: TreeNode?, _ depth: Int) {
        guard let node = node else { return }
        if depth > maxDepth {
            maxDepth = depth
            res = node.val
        }

        dfs(node.left, depth + 1)
        dfs(node.right, depth + 1)
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

This is the same logic as recursive DFS, but uses an explicit stack instead of the call stack. We push nodes along with their depths and process them in LIFO order. By pushing the right child before the left child, we ensure left children are processed first at each level, maintaining the leftmost-first property.

### Algorithm

1. Initialize `maxDepth` to `-1`, `res` to the root's value, and a stack containing `(root, 0)`.
2. While the stack is not empty:
   - Pop `(node, depth)` from the stack.
   - If `depth > maxDepth`, update `maxDepth` and set `res` to the node's value.
   - Push the right child (if exists) with `depth + 1`, then the left child with `depth + 1`.
3. Return `res`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        res, maxDepth = root.val, -1
        stack = [(root, 0)]

        while stack:
            node, depth = stack.pop()
            if depth > maxDepth:
                maxDepth = depth
                res = node.val

            if node.right:
                stack.append((node.right, depth + 1))
            if node.left:
                stack.append((node.left, depth + 1))

        return res
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
    public int findBottomLeftValue(TreeNode root) {
        int res = root.val, maxDepth = -1;
        Stack<Pair<TreeNode, Integer>> stack = new Stack<>();
        stack.push(new Pair<>(root, 0));

        while (!stack.isEmpty()) {
            Pair<TreeNode, Integer> p = stack.pop();
            TreeNode node = p.getKey();
            int depth = p.getValue();
            if (depth > maxDepth) {
                maxDepth = depth;
                res = node.val;
            }

            if (node.right != null) {
                stack.push(new Pair<>(node.right, depth + 1));
            }
            if (node.left != null) {
                stack.push(new Pair<>(node.left, depth + 1));
            }
        }

        return res;
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
    int findBottomLeftValue(TreeNode* root) {
        int res = root->val, maxDepth = -1;
        stack<pair<TreeNode*, int>> stack;
        stack.push({root, 0});

        while (!stack.empty()) {
            auto [node, depth] = stack.top();stack.pop();
            if (depth > maxDepth) {
                maxDepth = depth;
                res = node->val;
            }

            if (node->right) {
                stack.push({node->right, depth + 1});
            }
            if (node->left) {
                stack.push({node->left, depth + 1});
            }
        }

        return res;
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
     * @return {number}
     */
    findBottomLeftValue(root) {
        let res = root.val,
            maxDepth = -1;
        const stack = [[root, 0]];

        while (stack.length) {
            const [node, depth] = stack.pop();
            if (depth > maxDepth) {
                maxDepth = depth;
                res = node.val;
            }

            if (node.right) stack.push([node.right, depth + 1]);
            if (node.left) stack.push([node.left, depth + 1]);
        }

        return res;
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
    public int FindBottomLeftValue(TreeNode root) {
        int res = root.val, maxDepth = -1;
        Stack<(TreeNode, int)> stack = new Stack<(TreeNode, int)>();
        stack.Push((root, 0));

        while (stack.Count > 0) {
            var (node, depth) = stack.Pop();
            if (depth > maxDepth) {
                maxDepth = depth;
                res = node.val;
            }

            if (node.right != null) {
                stack.Push((node.right, depth + 1));
            }
            if (node.left != null) {
                stack.Push((node.left, depth + 1));
            }
        }

        return res;
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
func findBottomLeftValue(root *TreeNode) int {
    res := root.Val
    maxDepth := -1
    stack := []struct {
        node  *TreeNode
        depth int
    }{{root, 0}}

    for len(stack) > 0 {
        top := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        node, depth := top.node, top.depth

        if depth > maxDepth {
            maxDepth = depth
            res = node.Val
        }

        if node.Right != nil {
            stack = append(stack, struct {
                node  *TreeNode
                depth int
            }{node.Right, depth + 1})
        }
        if node.Left != nil {
            stack = append(stack, struct {
                node  *TreeNode
                depth int
            }{node.Left, depth + 1})
        }
    }

    return res
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
    fun findBottomLeftValue(root: TreeNode?): Int {
        var res = root!!.`val`
        var maxDepth = -1
        val stack = ArrayDeque<Pair<TreeNode, Int>>()
        stack.addLast(Pair(root, 0))

        while (stack.isNotEmpty()) {
            val (node, depth) = stack.removeLast()
            if (depth > maxDepth) {
                maxDepth = depth
                res = node.`val`
            }

            node.right?.let { stack.addLast(Pair(it, depth + 1)) }
            node.left?.let { stack.addLast(Pair(it, depth + 1)) }
        }

        return res
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
    func findBottomLeftValue(_ root: TreeNode?) -> Int {
        var res = root!.val
        var maxDepth = -1
        var stack: [(TreeNode, Int)] = [(root!, 0)]

        while !stack.isEmpty {
            let (node, depth) = stack.removeLast()
            if depth > maxDepth {
                maxDepth = depth
                res = node.val
            }

            if let right = node.right {
                stack.append((right, depth + 1))
            }
            if let left = node.left {
                stack.append((left, depth + 1))
            }
        }

        return res
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

Morris traversal lets us traverse the tree without using extra space for a stack or recursion. We temporarily modify the tree by threading right pointers of predecessor nodes back to their successors, creating a way to return after visiting the left subtree. We track depth manually by counting steps down and back up, updating our result whenever we reach a new maximum depth.

### Algorithm

1. Initialize `res` to the root's value, `maxDepth` to `-1`, `curDepth` to `0`, and `cur` to root.
2. While `cur` is not `null`:
   - If `cur` has no left child:
     - If `curDepth > maxDepth`, update `maxDepth` and `res`.
     - Move to the right child and increment `curDepth`.
   - Otherwise:
     - Find the rightmost node in the left subtree (the predecessor), counting steps.
     - If the predecessor's right pointer is `null`, set it to `cur`, move left, and increment `curDepth`.
     - If it points back to `cur`, restore it to `null`, decrement `curDepth` by the step count, and move right.
3. Return `res`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        res, maxDepth, curDepth = root.val, -1, 0
        cur = root

        while cur:
            if not cur.left:
                if curDepth > maxDepth:
                    maxDepth, res = curDepth, cur.val
                cur = cur.right
                curDepth += 1
            else:
                prev = cur.left
                steps = 1
                while prev.right and prev.right != cur:
                    prev = prev.right
                    steps += 1

                if not prev.right:
                    prev.right = cur
                    cur = cur.left
                    curDepth += 1
                else:
                    prev.right = None
                    curDepth -= steps
                    cur = cur.right

        return res
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
    public int findBottomLeftValue(TreeNode root) {
        int res = root.val, maxDepth = -1, curDepth = 0;
        TreeNode cur = root;

        while (cur != null) {
            if (cur.left == null) {
                if (curDepth > maxDepth) {
                    maxDepth = curDepth;
                    res = cur.val;
                }
                cur = cur.right;
                curDepth++;
            } else {
                TreeNode prev = cur.left;
                int steps = 1;
                while (prev.right != null && prev.right != cur) {
                    prev = prev.right;
                    steps++;
                }

                if (prev.right == null) {
                    prev.right = cur;
                    cur = cur.left;
                    curDepth++;
                } else {
                    prev.right = null;
                    curDepth -= steps;
                    cur = cur.right;
                }
            }
        }
        return res;
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
    int findBottomLeftValue(TreeNode* root) {
        int res = root->val, maxDepth = -1, curDepth = 0;
        TreeNode* cur = root;

        while (cur) {
            if (!cur->left) {
                if (curDepth > maxDepth) {
                    maxDepth = curDepth;
                    res = cur->val;
                }
                cur = cur->right;
                curDepth++;
            } else {
                TreeNode* prev = cur->left;
                int steps = 1;
                while (prev->right && prev->right != cur) {
                    prev = prev->right;
                    steps++;
                }

                if (!prev->right) {
                    prev->right = cur;
                    cur = cur->left;
                    curDepth++;
                } else {
                    prev->right = nullptr;
                    curDepth -= steps;
                    cur = cur->right;
                }
            }
        }
        return res;
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
     * @return {number}
     */
    findBottomLeftValue(root) {
        let res = root.val,
            maxDepth = -1,
            curDepth = 0;
        let cur = root;

        while (cur) {
            if (!cur.left) {
                if (curDepth > maxDepth) {
                    maxDepth = curDepth;
                    res = cur.val;
                }
                cur = cur.right;
                curDepth++;
            } else {
                let prev = cur.left,
                    steps = 1;
                while (prev.right && prev.right !== cur) {
                    prev = prev.right;
                    steps++;
                }

                if (!prev.right) {
                    prev.right = cur;
                    cur = cur.left;
                    curDepth++;
                } else {
                    prev.right = null;
                    curDepth -= steps;
                    cur = cur.right;
                }
            }
        }
        return res;
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
    public int FindBottomLeftValue(TreeNode root) {
        int res = root.val, maxDepth = -1, curDepth = 0;
        TreeNode cur = root;

        while (cur != null) {
            if (cur.left == null) {
                if (curDepth > maxDepth) {
                    maxDepth = curDepth;
                    res = cur.val;
                }
                cur = cur.right;
                curDepth++;
            } else {
                TreeNode prev = cur.left;
                int steps = 1;
                while (prev.right != null && prev.right != cur) {
                    prev = prev.right;
                    steps++;
                }

                if (prev.right == null) {
                    prev.right = cur;
                    cur = cur.left;
                    curDepth++;
                } else {
                    prev.right = null;
                    curDepth -= steps;
                    cur = cur.right;
                }
            }
        }
        return res;
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
func findBottomLeftValue(root *TreeNode) int {
    res := root.Val
    maxDepth := -1
    curDepth := 0
    cur := root

    for cur != nil {
        if cur.Left == nil {
            if curDepth > maxDepth {
                maxDepth = curDepth
                res = cur.Val
            }
            cur = cur.Right
            curDepth++
        } else {
            prev := cur.Left
            steps := 1
            for prev.Right != nil && prev.Right != cur {
                prev = prev.Right
                steps++
            }

            if prev.Right == nil {
                prev.Right = cur
                cur = cur.Left
                curDepth++
            } else {
                prev.Right = nil
                curDepth -= steps
                cur = cur.Right
            }
        }
    }
    return res
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
    fun findBottomLeftValue(root: TreeNode?): Int {
        var res = root!!.`val`
        var maxDepth = -1
        var curDepth = 0
        var cur = root

        while (cur != null) {
            if (cur.left == null) {
                if (curDepth > maxDepth) {
                    maxDepth = curDepth
                    res = cur.`val`
                }
                cur = cur.right
                curDepth++
            } else {
                var prev = cur.left
                var steps = 1
                while (prev?.right != null && prev.right != cur) {
                    prev = prev.right
                    steps++
                }

                if (prev?.right == null) {
                    prev?.right = cur
                    cur = cur.left
                    curDepth++
                } else {
                    prev.right = null
                    curDepth -= steps
                    cur = cur.right
                }
            }
        }
        return res
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
    func findBottomLeftValue(_ root: TreeNode?) -> Int {
        var res = root!.val
        var maxDepth = -1
        var curDepth = 0
        var cur = root

        while cur != nil {
            if cur!.left == nil {
                if curDepth > maxDepth {
                    maxDepth = curDepth
                    res = cur!.val
                }
                cur = cur!.right
                curDepth += 1
            } else {
                var prev = cur!.left
                var steps = 1
                while prev?.right != nil && prev?.right !== cur {
                    prev = prev?.right
                    steps += 1
                }

                if prev?.right == nil {
                    prev?.right = cur
                    cur = cur!.left
                    curDepth += 1
                } else {
                    prev?.right = nil
                    curDepth -= steps
                    cur = cur!.right
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Enqueueing Children in Wrong Order for BFS

The right-to-left BFS trick only works if right children are enqueued before left children. Reversing this order causes the last processed node to be the bottom-right instead of bottom-left.

### Not Tracking Depth in DFS

When using DFS, updating the result without checking if the current depth exceeds the maximum seen depth causes incorrect values to be recorded. Always compare depths before updating the result.

### Confusing Leftmost with First Encountered

The leftmost value at the deepest level is not necessarily the first node encountered during traversal. In DFS, left-first traversal combined with depth tracking ensures the leftmost node at maximum depth is correctly identified.
