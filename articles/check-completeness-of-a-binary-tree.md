## 1. Breadth First Search

### Intuition

In a complete binary tree, all nodes are as far left as possible, with no gaps. If we traverse level by level and encounter a null node, all subsequent nodes in the traversal must also be null. If we find any non-null node after a null, the tree is not complete.

### Algorithm

1. Initialize a queue with the root node.
2. Process nodes in BFS order:
   - Dequeue a node and add its left and right children (even if null) to the queue.
   - If the dequeued node is null, drain the remaining queue.
   - If any non-null node appears after a null, return false.
3. Return true if the entire queue is processed without finding a non-null after null.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isCompleteTree(self, root: Optional[TreeNode]) -> bool:
        q = deque([root])
        while q:
            node = q.popleft()
            if node:
                q.append(node.left)
                q.append(node.right)
            else:
                while q:
                    if q.popleft():
                        return False
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
    public boolean isCompleteTree(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);

        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node != null) {
                q.add(node.left);
                q.add(node.right);
            } else {
                while (!q.isEmpty()) {
                    if (q.poll() != null) {
                        return false;
                    }
                }
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
    bool isCompleteTree(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();
            if (node) {
                q.push(node->left);
                q.push(node->right);
            } else {
                while (!q.empty()) {
                    if (q.front()) {
                        return false;
                    }
                    q.pop();
                }
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
    isCompleteTree(root) {
        const queue = new Queue([root]);

        while (!queue.isEmpty()) {
            const node = queue.pop();
            if (node) {
                queue.push(node.left);
                queue.push(node.right);
            } else {
                while (!queue.isEmpty()) {
                    if (queue.pop()) {
                        return false;
                    }
                }
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
    public bool IsCompleteTree(TreeNode root) {
        Queue<TreeNode> q = new Queue<TreeNode>();
        q.Enqueue(root);

        while (q.Count > 0) {
            TreeNode node = q.Dequeue();
            if (node != null) {
                q.Enqueue(node.left);
                q.Enqueue(node.right);
            } else {
                while (q.Count > 0) {
                    if (q.Dequeue() != null) {
                        return false;
                    }
                }
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
func isCompleteTree(root *TreeNode) bool {
    q := []*TreeNode{root}

    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        if node != nil {
            q = append(q, node.Left)
            q = append(q, node.Right)
        } else {
            for len(q) > 0 {
                if q[0] != nil {
                    return false
                }
                q = q[1:]
            }
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
    fun isCompleteTree(root: TreeNode?): Boolean {
        val q = ArrayDeque<TreeNode?>()
        q.add(root)

        while (q.isNotEmpty()) {
            val node = q.removeFirst()
            if (node != null) {
                q.add(node.left)
                q.add(node.right)
            } else {
                while (q.isNotEmpty()) {
                    if (q.removeFirst() != null) {
                        return false
                    }
                }
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
    func isCompleteTree(_ root: TreeNode?) -> Bool {
        var queue = [root]

        while !queue.isEmpty {
            let node = queue.removeFirst()
            if let node = node {
                queue.append(node.left)
                queue.append(node.right)
            } else {
                while !queue.isEmpty {
                    if queue.removeFirst() != nil {
                        return false
                    }
                }
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

## 2. Breadth First Search (Optimal)

### Intuition

This is a cleaner version of the BFS approach. Instead of draining the queue after seeing null, we use a flag to track whether a null has been seen. If we encounter a non-null node after the flag is set, the tree is incomplete.

### Algorithm

1. Initialize a queue with the root and a boolean flag nullSeen = false.
2. Process each node from the queue:
   - If the node is non-null and nullSeen is true, return false.
   - If the node is non-null, add both children to the queue.
   - If the node is null, set nullSeen = true.
3. Return true after processing all nodes.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isCompleteTree(self, root: Optional[TreeNode]) -> bool:
        q = deque([root])
        nullSeen = False
        while q:
            node = q.popleft()
            if node:
                if nullSeen:
                    return False
                q.append(node.left)
                q.append(node.right)
            else:
                nullSeen = True
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
    public boolean isCompleteTree(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        boolean nullSeen = false;

        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node != null) {
                if (nullSeen) return false;
                q.add(node.left);
                q.add(node.right);
            } else {
                nullSeen = true;
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
    bool isCompleteTree(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        bool nullSeen = false;

        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();
            if (node) {
                if (nullSeen) return false;
                q.push(node->left);
                q.push(node->right);
            } else {
                nullSeen = true;
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
    isCompleteTree(root) {
        const queue = new Queue([root]);
        let nullSeen = false;

        while (!queue.isEmpty()) {
            const node = queue.pop();
            if (node) {
                if (nullSeen) return false;
                queue.push(node.left);
                queue.push(node.right);
            } else {
                nullSeen = true;
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
    public bool IsCompleteTree(TreeNode root) {
        Queue<TreeNode> q = new Queue<TreeNode>();
        q.Enqueue(root);
        bool nullSeen = false;

        while (q.Count > 0) {
            TreeNode node = q.Dequeue();
            if (node != null) {
                if (nullSeen) {
                    return false;
                }
                q.Enqueue(node.left);
                q.Enqueue(node.right);
            } else {
                nullSeen = true;
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
func isCompleteTree(root *TreeNode) bool {
    q := []*TreeNode{root}
    nullSeen := false

    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        if node != nil {
            if nullSeen {
                return false
            }
            q = append(q, node.Left)
            q = append(q, node.Right)
        } else {
            nullSeen = true
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
    fun isCompleteTree(root: TreeNode?): Boolean {
        val q = ArrayDeque<TreeNode?>()
        q.add(root)
        var nullSeen = false

        while (q.isNotEmpty()) {
            val node = q.removeFirst()
            if (node != null) {
                if (nullSeen) return false
                q.add(node.left)
                q.add(node.right)
            } else {
                nullSeen = true
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
    func isCompleteTree(_ root: TreeNode?) -> Bool {
        var queue: [TreeNode?] = [root]
        var nullSeen = false

        while !queue.isEmpty {
            let node = queue.removeFirst()
            if let node = node {
                if nullSeen { return false }
                queue.append(node.left)
                queue.append(node.right)
            } else {
                nullSeen = true
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

## 3. Depth First Search (Two Pass)

### Intuition

A complete binary tree with n nodes has a specific property: if we number nodes starting from 0 (root) where a node at index i has children at 2i+1 and 2i+2, then every node's index must be less than n. First count all nodes, then verify that no node has an index >= n.

### Algorithm

1. First pass: Count the total number of nodes in the tree using DFS.
2. Second pass: Perform DFS with indices, starting from (root, 0).
   - If a node is null, return true.
   - If a node's index >= total count, return false (gap exists).
   - Recursively check left child (index 2i+1) and right child (index 2i+2).
3. Return true if all nodes pass the index check.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isCompleteTree(self, root: Optional[TreeNode]) -> bool:
        def dfs(node, index, n):
            if not node:
                return True
            if index >= n:
                return False

            left = dfs(node.left, 2 * index + 1, n)
            right = dfs(node.right, 2 * index + 2, n)
            return left and right

        def countNodes(node):
            if not node:
                return 0
            return 1 + countNodes(node.left) + countNodes(node.right)

        n = countNodes(root)
        return dfs(root, 0, n)
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
    private int countNodes(TreeNode root) {
        if (root == null) return 0;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }

    private boolean dfs(TreeNode node, int index, int n) {
        if (node == null) return true;
        if (index >= n) return false;
        return dfs(node.left, 2 * index + 1, n) && dfs(node.right, 2 * index + 2, n);
    }

    public boolean isCompleteTree(TreeNode root) {
        int n = countNodes(root);
        return dfs(root, 0, n);
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
    int countNodes(TreeNode* root) {
        if (!root) return 0;
        return 1 + countNodes(root->left) + countNodes(root->right);
    }

    bool dfs(TreeNode* node, int index, int n) {
        if (!node) return true;
        if (index >= n) return false;
        return dfs(node->left, 2 * index + 1, n) && dfs(node->right, 2 * index + 2, n);
    }

    bool isCompleteTree(TreeNode* root) {
        int n = countNodes(root);
        return dfs(root, 0, n);
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
    isCompleteTree(root) {
        const countNodes = (node) => {
            if (!node) return 0;
            return 1 + countNodes(node.left) + countNodes(node.right);
        };

        const dfs = (node, index, n) => {
            if (!node) return true;
            if (index >= n) return false;
            return (
                dfs(node.left, 2 * index + 1, n) &&
                dfs(node.right, 2 * index + 2, n)
            );
        };

        const n = countNodes(root);
        return dfs(root, 0, n);
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
    public bool IsCompleteTree(TreeNode root) {
        int n = CountNodes(root);
        return Dfs(root, 0, n);
    }

    private bool Dfs(TreeNode node, int index, int n) {
        if (node == null) return true;
        if (index >= n) return false;
        return Dfs(node.left, 2 * index + 1, n) && Dfs(node.right, 2 * index + 2, n);
    }

    private int CountNodes(TreeNode node) {
        if (node == null) return 0;
        return 1 + CountNodes(node.left) + CountNodes(node.right);
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
func isCompleteTree(root *TreeNode) bool {
    var countNodes func(node *TreeNode) int
    countNodes = func(node *TreeNode) int {
        if node == nil {
            return 0
        }
        return 1 + countNodes(node.Left) + countNodes(node.Right)
    }

    var dfs func(node *TreeNode, index, n int) bool
    dfs = func(node *TreeNode, index, n int) bool {
        if node == nil {
            return true
        }
        if index >= n {
            return false
        }
        return dfs(node.Left, 2*index+1, n) && dfs(node.Right, 2*index+2, n)
    }

    n := countNodes(root)
    return dfs(root, 0, n)
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
    fun isCompleteTree(root: TreeNode?): Boolean {
        fun countNodes(node: TreeNode?): Int {
            if (node == null) return 0
            return 1 + countNodes(node.left) + countNodes(node.right)
        }

        fun dfs(node: TreeNode?, index: Int, n: Int): Boolean {
            if (node == null) return true
            if (index >= n) return false
            return dfs(node.left, 2 * index + 1, n) && dfs(node.right, 2 * index + 2, n)
        }

        val n = countNodes(root)
        return dfs(root, 0, n)
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
    func isCompleteTree(_ root: TreeNode?) -> Bool {
        func countNodes(_ node: TreeNode?) -> Int {
            guard let node = node else { return 0 }
            return 1 + countNodes(node.left) + countNodes(node.right)
        }

        func dfs(_ node: TreeNode?, _ index: Int, _ n: Int) -> Bool {
            guard let node = node else { return true }
            if index >= n { return false }
            return dfs(node.left, 2 * index + 1, n) && dfs(node.right, 2 * index + 2, n)
        }

        let n = countNodes(root)
        return dfs(root, 0, n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 4. Depth First Search (Optimal)

### Intuition

We can verify completeness in a single DFS pass by tracking the tree's height and whether we have seen a "short" path (one that ends before the maximum depth). In a complete tree, all paths to null nodes at the deepest level must appear before any paths ending one level higher, when traversing left to right.

### Algorithm

1. Track the tree height (initialized to 0) and a flag nullSeen (for detecting gaps).
2. Perform DFS, tracking the current height:
   - When reaching a null node, set treeHgt if not set.
   - If the null is at height (treeHgt - 1), mark nullSeen = true.
   - If the null is at treeHgt after nullSeen is true, return false (gap detected).
3. Recursively check left then right children.
4. Return true if no gaps are detected.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isCompleteTree(self, root: Optional[TreeNode]) -> bool:
        treeHgt = 0
        nullSeen = False

        def dfs(node, hgt):
            nonlocal treeHgt, nullSeen
            if not node:
                if treeHgt == 0:
                    treeHgt = hgt
                elif hgt == treeHgt - 1:
                    nullSeen = True
                elif hgt != treeHgt:
                    return False
                return not (hgt == treeHgt and nullSeen)

            return dfs(node.left, hgt + 1) and dfs(node.right, hgt + 1)

        return dfs(root, 0)
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
    private int treeHgt = 0;
    private boolean nullSeen = false;

    private boolean dfs(TreeNode node, int hgt) {
        if (node == null) {
            if (treeHgt == 0) {
                treeHgt = hgt;
            } else if (hgt == treeHgt - 1) {
                nullSeen = true;
            } else if (hgt != treeHgt) {
                return false;
            }
            return !(hgt == treeHgt && nullSeen);
        }

        return dfs(node.left, hgt + 1) && dfs(node.right, hgt + 1);
    }

    public boolean isCompleteTree(TreeNode root) {
        return dfs(root, 0);
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
    int treeHgt = 0;
    bool nullSeen = false;

    bool dfs(TreeNode* node, int hgt) {
        if (!node) {
            if (treeHgt == 0) {
                treeHgt = hgt;
            } else if (hgt == treeHgt - 1) {
                nullSeen = true;
            } else if (hgt != treeHgt) {
                return false;
            }
            return !(hgt == treeHgt && nullSeen);
        }

        return dfs(node->left, hgt + 1) && dfs(node->right, hgt + 1);
    }

    bool isCompleteTree(TreeNode* root) {
        return dfs(root, 0);
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
    isCompleteTree(root) {
        let treeHgt = 0;
        let nullSeen = false;

        const dfs = (node, hgt) => {
            if (!node) {
                if (treeHgt === 0) {
                    treeHgt = hgt;
                } else if (hgt === treeHgt - 1) {
                    nullSeen = true;
                } else if (hgt !== treeHgt) {
                    return false;
                }
                return !(hgt === treeHgt && nullSeen);
            }

            return dfs(node.left, hgt + 1) && dfs(node.right, hgt + 1);
        };

        return dfs(root, 0);
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
    private int treeHgt = 0;
    private bool nullSeen = false;

    public bool IsCompleteTree(TreeNode root) {
        return Dfs(root, 0);
    }

    private bool Dfs(TreeNode node, int hgt) {
        if (node == null) {
            if (treeHgt == 0) {
                treeHgt = hgt;
            } else if (hgt == treeHgt - 1) {
                nullSeen = true;
            } else if (hgt != treeHgt) {
                return false;
            }
            return !(hgt == treeHgt && nullSeen);
        }
        return Dfs(node.left, hgt + 1) && Dfs(node.right, hgt + 1);
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
func isCompleteTree(root *TreeNode) bool {
    treeHgt := 0
    nullSeen := false

    var dfs func(node *TreeNode, hgt int) bool
    dfs = func(node *TreeNode, hgt int) bool {
        if node == nil {
            if treeHgt == 0 {
                treeHgt = hgt
            } else if hgt == treeHgt-1 {
                nullSeen = true
            } else if hgt != treeHgt {
                return false
            }
            return !(hgt == treeHgt && nullSeen)
        }
        return dfs(node.Left, hgt+1) && dfs(node.Right, hgt+1)
    }

    return dfs(root, 0)
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
    private var treeHgt = 0
    private var nullSeen = false

    fun isCompleteTree(root: TreeNode?): Boolean {
        treeHgt = 0
        nullSeen = false
        return dfs(root, 0)
    }

    private fun dfs(node: TreeNode?, hgt: Int): Boolean {
        if (node == null) {
            if (treeHgt == 0) {
                treeHgt = hgt
            } else if (hgt == treeHgt - 1) {
                nullSeen = true
            } else if (hgt != treeHgt) {
                return false
            }
            return !(hgt == treeHgt && nullSeen)
        }
        return dfs(node.left, hgt + 1) && dfs(node.right, hgt + 1)
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
    func isCompleteTree(_ root: TreeNode?) -> Bool {
        var treeHgt = 0
        var nullSeen = false

        func dfs(_ node: TreeNode?, _ hgt: Int) -> Bool {
            if node == nil {
                if treeHgt == 0 {
                    treeHgt = hgt
                } else if hgt == treeHgt - 1 {
                    nullSeen = true
                } else if hgt != treeHgt {
                    return false
                }
                return !(hgt == treeHgt && nullSeen)
            }
            return dfs(node?.left, hgt + 1) && dfs(node?.right, hgt + 1)
        }

        return dfs(root, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.
