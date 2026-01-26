## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Tree Traversal** - Understanding how to navigate through tree nodes using their left and right children
- **Breadth-First Search (BFS)** - Used to process nodes level by level using a queue
- **Depth-First Search (DFS)** - Alternative approach that tracks depth while recursively visiting nodes

---

## 1. Breadth First Search

### Intuition

To find the largest value in each row, we need to visit all nodes level by level. BFS naturally processes nodes in level order using a queue. For each level, we track the maximum value seen among all nodes at that depth.

### Algorithm

1. If the root is `null`, return an empty list.
2. Initialize a queue with the root node and an empty result list.
3. While the queue is not empty:
   - Record the number of nodes at the current level.
   - Initialize `rowMax` with the first node's value.
   - Process all nodes at this level: dequeue each node, update `rowMax` if needed, and enqueue its children.
   - Append `rowMax` to the result list.
4. Return the result list.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        res = []
        q = deque([root])
        while q:
            row_max = q[0].val
            for _ in range(len(q)):
                node = q.popleft()
                row_max = max(row_max, node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            res.append(row_max)

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
    public List<Integer> largestValues(TreeNode root) {
        if (root == null) return new ArrayList<>();

        List<Integer> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);

        while (!q.isEmpty()) {
            int rowMax = q.peek().val;
            for (int i = q.size(); i > 0; i--) {
                TreeNode node = q.poll();
                rowMax = Math.max(rowMax, node.val);
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(rowMax);
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
    vector<int> largestValues(TreeNode* root) {
        if (!root) return {};

        vector<int> res;
        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            int rowMax = q.front()->val;
            for (int i = q.size(); i > 0; i--) {
                TreeNode* node = q.front(); q.pop();
                rowMax = max(rowMax, node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(rowMax);
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
     * @return {number[]}
     */
    largestValues(root) {
        if (!root) return [];

        const res = [];
        const q = new Queue([root]);

        while (!q.isEmpty()) {
            let rowMax = q.front().val;
            for (let i = q.size(); i > 0; i--) {
                const node = q.pop();
                rowMax = Math.max(rowMax, node.val);
                if (node.left) q.push(node.left);
                if (node.right) q.push(node.right);
            }
            res.push(rowMax);
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
    public IList<int> LargestValues(TreeNode root) {
        if (root == null) return new List<int>();

        var res = new List<int>();
        var q = new Queue<TreeNode>();
        q.Enqueue(root);

        while (q.Count > 0) {
            int rowMax = q.Peek().val;
            int size = q.Count;
            for (int i = 0; i < size; i++) {
                var node = q.Dequeue();
                rowMax = Math.Max(rowMax, node.val);
                if (node.left != null) q.Enqueue(node.left);
                if (node.right != null) q.Enqueue(node.right);
            }
            res.Add(rowMax);
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
func largestValues(root *TreeNode) []int {
    if root == nil {
        return []int{}
    }

    res := []int{}
    q := []*TreeNode{root}

    for len(q) > 0 {
        rowMax := q[0].Val
        size := len(q)
        for i := 0; i < size; i++ {
            node := q[0]
            q = q[1:]
            if node.Val > rowMax {
                rowMax = node.Val
            }
            if node.Left != nil {
                q = append(q, node.Left)
            }
            if node.Right != nil {
                q = append(q, node.Right)
            }
        }
        res = append(res, rowMax)
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
    fun largestValues(root: TreeNode?): List<Int> {
        if (root == null) return emptyList()

        val res = mutableListOf<Int>()
        val q = ArrayDeque<TreeNode>()
        q.add(root)

        while (q.isNotEmpty()) {
            var rowMax = q.first().`val`
            repeat(q.size) {
                val node = q.removeFirst()
                rowMax = maxOf(rowMax, node.`val`)
                node.left?.let { q.add(it) }
                node.right?.let { q.add(it) }
            }
            res.add(rowMax)
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
    func largestValues(_ root: TreeNode?) -> [Int] {
        guard let root = root else { return [] }

        var res = [Int]()
        var q = [root]

        while !q.isEmpty {
            var rowMax = q[0].val
            let size = q.count
            for _ in 0..<size {
                let node = q.removeFirst()
                rowMax = max(rowMax, node.val)
                if let left = node.left {
                    q.append(left)
                }
                if let right = node.right {
                    q.append(right)
                }
            }
            res.append(rowMax)
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

## 2. Depth First Search

### Intuition

We can also solve this with DFS by tracking the current depth as we traverse. When we reach a node, if it's the first node at that depth, we add it to the result. Otherwise, we compare it with the existing maximum for that depth and update if necessary.

### Algorithm

1. Initialize an empty result list.
2. Define a recursive DFS function that takes a node and its level:
   - If the node is `null`, return.
   - If `level` equals the size of the result list, append the node's value (first node at this depth).
   - Otherwise, update `res[level]` to be the maximum of its current value and the node's value.
   - Recursively call DFS on the left and right children with `level + 1`.
3. Call DFS starting from the root at level `0`.
4. Return the result list.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        res = []
        def dfs(node, level):
            if not node:
                return
            if level == len(res):
                res.append(node.val)
            else:
                res[level] = max(res[level], node.val)

            dfs(node.left, level + 1)
            dfs(node.right, level + 1)

        dfs(root, 0)
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
    public List<Integer> largestValues(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, 0, res);
        return res;
    }

    private void dfs(TreeNode node, int level, List<Integer> res) {
        if (node == null) return;
        if (level == res.size()) {
            res.add(node.val);
        } else {
            res.set(level, Math.max(res.get(level), node.val));
        }

        dfs(node.left, level + 1, res);
        dfs(node.right, level + 1, res);
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
    vector<int> largestValues(TreeNode* root) {
        vector<int> res;
        dfs(root, 0, res);
        return res;
    }

private:
    void dfs(TreeNode* node, int level, vector<int>& res) {
        if (!node) return;
        if (level == res.size()) {
            res.push_back(node->val);
        } else {
            res[level] = max(res[level], node->val);
        }

        dfs(node->left, level + 1, res);
        dfs(node->right, level + 1, res);
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
     * @return {number[]}
     */
    largestValues(root) {
        if (!root) return [];

        const res = [];
        const dfs = (node, level) => {
            if (!node) return;
            if (level === res.length) {
                res.push(node.val);
            } else {
                res[level] = Math.max(res[level], node.val);
            }
            dfs(node.left, level + 1);
            dfs(node.right, level + 1);
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
    public IList<int> LargestValues(TreeNode root) {
        var res = new List<int>();
        Dfs(root, 0, res);
        return res;
    }

    private void Dfs(TreeNode node, int level, List<int> res) {
        if (node == null) return;
        if (level == res.Count) {
            res.Add(node.val);
        } else {
            res[level] = Math.Max(res[level], node.val);
        }
        Dfs(node.left, level + 1, res);
        Dfs(node.right, level + 1, res);
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
func largestValues(root *TreeNode) []int {
    res := []int{}

    var dfs func(node *TreeNode, level int)
    dfs = func(node *TreeNode, level int) {
        if node == nil {
            return
        }
        if level == len(res) {
            res = append(res, node.Val)
        } else if node.Val > res[level] {
            res[level] = node.Val
        }

        dfs(node.Left, level+1)
        dfs(node.Right, level+1)
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
    fun largestValues(root: TreeNode?): List<Int> {
        val res = mutableListOf<Int>()

        fun dfs(node: TreeNode?, level: Int) {
            if (node == null) return
            if (level == res.size) {
                res.add(node.`val`)
            } else {
                res[level] = maxOf(res[level], node.`val`)
            }
            dfs(node.left, level + 1)
            dfs(node.right, level + 1)
        }

        dfs(root, 0)
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
    func largestValues(_ root: TreeNode?) -> [Int] {
        var res = [Int]()

        func dfs(_ node: TreeNode?, _ level: Int) {
            guard let node = node else { return }
            if level == res.count {
                res.append(node.val)
            } else {
                res[level] = max(res[level], node.val)
            }
            dfs(node.left, level + 1)
            dfs(node.right, level + 1)
        }

        dfs(root, 0)
        return res
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

The recursive DFS can be converted to an iterative approach using a stack. Each stack entry stores both the node and its level. This avoids recursion overhead while maintaining the same logic.

### Algorithm

1. If the root is `null`, return an empty list.
2. Initialize a stack with `(root, 0)` and an empty result list.
3. While the stack is not empty:
   - Pop `(node, level)` from the stack.
   - If `level` equals the result list size, append the node's value.
   - Otherwise, update `res[level]` to the maximum of its current value and the node's value.
   - Push the right child first (if exists), then the left child, both with `level + 1`.
4. Return the result list.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        res = []
        stack = [(root, 0)]
        while stack:
            node, level = stack.pop()
            if level == len(res):
                res.append(node.val)
            else:
                res[level] = max(res[level], node.val)

            if node.right:
                stack.append((node.right, level + 1))
            if node.left:
                stack.append((node.left, level + 1))

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
    public List<Integer> largestValues(TreeNode root) {
        if (root == null) return new ArrayList<>();

        List<Integer> res = new ArrayList<>();
        Stack<Pair<TreeNode, Integer>> stack = new Stack<>();
        stack.push(new Pair<>(root, 0));
        while (!stack.isEmpty()) {
            Pair<TreeNode, Integer> p = stack.pop();
            TreeNode node = p.getKey();
            int level = p.getValue();
            if (level == res.size()) {
                res.add(node.val);
            } else {
                res.set(level, Math.max(res.get(level), node.val));
            }

            if (node.right != null) stack.push(new Pair<>(node.right, level + 1));
            if (node.left != null) stack.push(new Pair<>(node.left, level + 1));
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
    vector<int> largestValues(TreeNode* root) {
        if (!root) return {};

        vector<int> res;
        stack<pair<TreeNode*, int>> stk;
        stk.push({root, 0});
        while (!stk.empty()) {
            auto [node, level] = stk.top();stk.pop();
            if (level == res.size()) {
                res.push_back(node->val);
            } else {
                res[level] = max(res[level], node->val);
            }

            if (node->right) stk.push({node->right, level + 1});
            if (node->left) stk.push({node->left, level + 1});
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
     * @return {number[]}
     */
    largestValues(root) {
        if (!root) return [];

        const res = [];
        const stack = [[root, 0]];
        while (stack.length) {
            const [node, level] = stack.pop();
            if (level === res.length) {
                res.push(node.val);
            } else {
                res[level] = Math.max(res[level], node.val);
            }

            if (node.right) stack.push([node.right, level + 1]);
            if (node.left) stack.push([node.left, level + 1]);
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
    public IList<int> LargestValues(TreeNode root) {
        if (root == null) return new List<int>();

        var res = new List<int>();
        var stack = new Stack<(TreeNode node, int level)>();
        stack.Push((root, 0));

        while (stack.Count > 0) {
            var (node, level) = stack.Pop();
            if (level == res.Count) {
                res.Add(node.val);
            } else {
                res[level] = Math.Max(res[level], node.val);
            }

            if (node.right != null) stack.Push((node.right, level + 1));
            if (node.left != null) stack.Push((node.left, level + 1));
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
func largestValues(root *TreeNode) []int {
    if root == nil {
        return []int{}
    }

    res := []int{}
    type pair struct {
        node  *TreeNode
        level int
    }
    stack := []pair{{root, 0}}

    for len(stack) > 0 {
        p := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        node, level := p.node, p.level

        if level == len(res) {
            res = append(res, node.Val)
        } else if node.Val > res[level] {
            res[level] = node.Val
        }

        if node.Right != nil {
            stack = append(stack, pair{node.Right, level + 1})
        }
        if node.Left != nil {
            stack = append(stack, pair{node.Left, level + 1})
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
    fun largestValues(root: TreeNode?): List<Int> {
        if (root == null) return emptyList()

        val res = mutableListOf<Int>()
        val stack = ArrayDeque<Pair<TreeNode, Int>>()
        stack.add(Pair(root, 0))

        while (stack.isNotEmpty()) {
            val (node, level) = stack.removeLast()
            if (level == res.size) {
                res.add(node.`val`)
            } else {
                res[level] = maxOf(res[level], node.`val`)
            }

            node.right?.let { stack.add(Pair(it, level + 1)) }
            node.left?.let { stack.add(Pair(it, level + 1)) }
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
    func largestValues(_ root: TreeNode?) -> [Int] {
        guard let root = root else { return [] }

        var res = [Int]()
        var stack: [(TreeNode, Int)] = [(root, 0)]

        while !stack.isEmpty {
            let (node, level) = stack.removeLast()
            if level == res.count {
                res.append(node.val)
            } else {
                res[level] = max(res[level], node.val)
            }

            if let right = node.right {
                stack.append((right, level + 1))
            }
            if let left = node.left {
                stack.append((left, level + 1))
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

## Common Pitfalls

### Not Handling Empty Tree

Forgetting to check if the root is `null` before processing leads to null pointer exceptions or runtime errors. Always add an early return for the empty tree case, returning an empty list rather than attempting to traverse a non-existent tree.

### Initializing Row Maximum Incorrectly

When tracking the maximum value for each row, initializing `rowMax` to `0` or a small positive number fails for trees with negative values. The correct approach is to initialize `rowMax` with the first node's value in that row, or use `Integer.MIN_VALUE` (or equivalent) to ensure negative values are handled correctly.

### Mixing Up Level Boundaries in BFS

In BFS, you must process all nodes at the current level before moving to the next. A common mistake is not capturing the queue size before the inner loop, causing nodes from the next level to be processed prematurely. Always store `queue.size()` at the start of each level iteration and use that fixed count for the inner loop.
