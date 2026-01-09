## 1. Breadth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isEvenOddTree(self, root: Optional[TreeNode]) -> bool:
        even = True
        q = deque([root])

        while q:
            prev = float("-inf") if even else float("inf")
            for _ in range(len(q)):
                node = q.popleft()

                if even and (node.val % 2 == 0 or node.val <= prev):
                    return False
                elif not even and (node.val % 2 == 1 or node.val >= prev):
                    return False

                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)

                prev = node.val

            even = not even

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
    public boolean isEvenOddTree(TreeNode root) {
        boolean even = true;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);

        while (!q.isEmpty()) {
            int prev = even ? Integer.MIN_VALUE : Integer.MAX_VALUE;
            for (int i = q.size(); i > 0; i--) {
                TreeNode node = q.poll();

                if (even && (node.val % 2 == 0 || node.val <= prev)) return false;
                if (!even && (node.val % 2 == 1 || node.val >= prev)) return false;

                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);

                prev = node.val;
            }
            even = !even;
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
    bool isEvenOddTree(TreeNode* root) {
        bool even = true;
        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            int prev = even ? INT_MIN : INT_MAX;
            for (int i = q.size(); i > 0; i--) {
                TreeNode* node = q.front();q.pop();

                if (even && (node->val % 2 == 0 || node->val <= prev)) return false;
                if (!even && (node->val % 2 == 1 || node->val >= prev)) return false;

                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);

                prev = node->val;
            }
            even = !even;
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
    isEvenOddTree(root) {
        let even = true;
        const q = new Queue([root]);

        while (!q.isEmpty()) {
            let prev = even ? -Infinity : Infinity;
            for (let i = q.size(); i > 0; i--) {
                let node = q.pop();

                if (even && (node.val % 2 === 0 || node.val <= prev))
                    return false;
                if (!even && (node.val % 2 === 1 || node.val >= prev))
                    return false;

                if (node.left) q.push(node.left);
                if (node.right) q.push(node.right);

                prev = node.val;
            }
            even = !even;
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
    public bool IsEvenOddTree(TreeNode root) {
        bool even = true;
        Queue<TreeNode> q = new Queue<TreeNode>();
        q.Enqueue(root);

        while (q.Count > 0) {
            int prev = even ? int.MinValue : int.MaxValue;
            for (int i = q.Count; i > 0; i--) {
                TreeNode node = q.Dequeue();

                if (even && (node.val % 2 == 0 || node.val <= prev)) return false;
                if (!even && (node.val % 2 == 1 || node.val >= prev)) return false;

                if (node.left != null) q.Enqueue(node.left);
                if (node.right != null) q.Enqueue(node.right);

                prev = node.val;
            }
            even = !even;
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
func isEvenOddTree(root *TreeNode) bool {
    even := true
    q := []*TreeNode{root}

    for len(q) > 0 {
        var prev int
        if even {
            prev = math.MinInt32
        } else {
            prev = math.MaxInt32
        }

        size := len(q)
        for i := 0; i < size; i++ {
            node := q[0]
            q = q[1:]

            if even && (node.Val%2 == 0 || node.Val <= prev) {
                return false
            }
            if !even && (node.Val%2 == 1 || node.Val >= prev) {
                return false
            }

            if node.Left != nil {
                q = append(q, node.Left)
            }
            if node.Right != nil {
                q = append(q, node.Right)
            }

            prev = node.Val
        }
        even = !even
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
    fun isEvenOddTree(root: TreeNode?): Boolean {
        var even = true
        val q: ArrayDeque<TreeNode> = ArrayDeque()
        root?.let { q.add(it) }

        while (q.isNotEmpty()) {
            var prev = if (even) Int.MIN_VALUE else Int.MAX_VALUE
            val size = q.size

            repeat(size) {
                val node = q.removeFirst()

                if (even && (node.`val` % 2 == 0 || node.`val` <= prev)) return false
                if (!even && (node.`val` % 2 == 1 || node.`val` >= prev)) return false

                node.left?.let { q.add(it) }
                node.right?.let { q.add(it) }

                prev = node.`val`
            }
            even = !even
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
    func isEvenOddTree(_ root: TreeNode?) -> Bool {
        guard let root = root else { return true }

        var even = true
        var q: [TreeNode] = [root]

        while !q.isEmpty {
            var prev = even ? Int.min : Int.max
            let size = q.count

            for _ in 0..<size {
                let node = q.removeFirst()

                if even && (node.val % 2 == 0 || node.val <= prev) {
                    return false
                }
                if !even && (node.val % 2 == 1 || node.val >= prev) {
                    return false
                }

                if let left = node.left {
                    q.append(left)
                }
                if let right = node.right {
                    q.append(right)
                }

                prev = node.val
            }
            even = !even
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

## 2. Depth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isEvenOddTree(self, root: Optional[TreeNode]) -> bool:
        levels = []

        def dfs(node, level):
            if not node:
                return True

            even = level % 2 == 0
            if ((even and node.val % 2 == 0) or
                (not even and (node.val % 2 == 1))
            ):
                return False

            if len(levels) == level:
                levels.append(node.val)
            else:
                if ((even and node.val <= levels[level]) or
                    (not even and node.val >= levels[level])
                ):
                    return False
                levels[level] = node.val

            return dfs(node.left, level + 1) and dfs(node.right, level + 1)

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
    List<Integer> levels = new ArrayList<>();

    private boolean dfs(TreeNode node, int level) {
        if (node == null) return true;

        boolean even = level % 2 == 0;
        if ((even && node.val % 2 == 0) ||
            (!even && node.val % 2 == 1)) {
            return false;
        }

        if (levels.size() == level) {
            levels.add(node.val);
        } else {
            if ((even && node.val <= levels.get(level)) ||
                (!even && node.val >= levels.get(level))) {
                return false;
            }
            levels.set(level, node.val);
        }

        return dfs(node.left, level + 1) && dfs(node.right, level + 1);
    }

    public boolean isEvenOddTree(TreeNode root) {
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
    vector<int> levels;

    bool dfs(TreeNode* node, int level) {
        if (!node) return true;

        bool even = level % 2 == 0;
        if ((even && node->val % 2 == 0) ||
            (!even && node->val % 2 == 1)) {
            return false;
        }

        if (levels.size() == level) {
            levels.push_back(node->val);
        } else {
            if ((even && node->val <= levels[level]) ||
                (!even && node->val >= levels[level])) {
                return false;
            }
            levels[level] = node->val;
        }

        return dfs(node->left, level + 1) && dfs(node->right, level + 1);
    }

    bool isEvenOddTree(TreeNode* root) {
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
    isEvenOddTree(root) {
        const levels = [];

        const dfs = (node, level) => {
            if (!node) return true;

            const even = level % 2 === 0;
            if ((even && node.val % 2 === 0) || (!even && node.val % 2 === 1)) {
                return false;
            }

            if (levels.length === level) {
                levels.push(node.val);
            } else {
                if (
                    (even && node.val <= levels[level]) ||
                    (!even && node.val >= levels[level])
                ) {
                    return false;
                }
                levels[level] = node.val;
            }

            return dfs(node.left, level + 1) && dfs(node.right, level + 1);
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
    List<int> levels = new List<int>();

    private bool Dfs(TreeNode node, int level) {
        if (node == null) return true;

        bool even = level % 2 == 0;
        if ((even && node.val % 2 == 0) ||
            (!even && node.val % 2 == 1)) {
            return false;
        }

        if (levels.Count == level) {
            levels.Add(node.val);
        } else {
            if ((even && node.val <= levels[level]) ||
                (!even && node.val >= levels[level])) {
                return false;
            }
            levels[level] = node.val;
        }

        return Dfs(node.left, level + 1) && Dfs(node.right, level + 1);
    }

    public bool IsEvenOddTree(TreeNode root) {
        return Dfs(root, 0);
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
func isEvenOddTree(root *TreeNode) bool {
    levels := []int{}

    var dfs func(node *TreeNode, level int) bool
    dfs = func(node *TreeNode, level int) bool {
        if node == nil {
            return true
        }

        even := level%2 == 0
        if (even && node.Val%2 == 0) || (!even && node.Val%2 == 1) {
            return false
        }

        if len(levels) == level {
            levels = append(levels, node.Val)
        } else {
            if (even && node.Val <= levels[level]) ||
                (!even && node.Val >= levels[level]) {
                return false
            }
            levels[level] = node.Val
        }

        return dfs(node.Left, level+1) && dfs(node.Right, level+1)
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
    private val levels = mutableListOf<Int>()

    private fun dfs(node: TreeNode?, level: Int): Boolean {
        if (node == null) return true

        val even = level % 2 == 0
        if ((even && node.`val` % 2 == 0) ||
            (!even && node.`val` % 2 == 1)) {
            return false
        }

        if (levels.size == level) {
            levels.add(node.`val`)
        } else {
            if ((even && node.`val` <= levels[level]) ||
                (!even && node.`val` >= levels[level])) {
                return false
            }
            levels[level] = node.`val`
        }

        return dfs(node.left, level + 1) && dfs(node.right, level + 1)
    }

    fun isEvenOddTree(root: TreeNode?): Boolean {
        levels.clear()
        return dfs(root, 0)
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
    func isEvenOddTree(_ root: TreeNode?) -> Bool {
        var levels = [Int]()

        func dfs(_ node: TreeNode?, _ level: Int) -> Bool {
            guard let node = node else { return true }

            let even = level % 2 == 0
            if (even && node.val % 2 == 0) ||
               (!even && node.val % 2 == 1) {
                return false
            }

            if levels.count == level {
                levels.append(node.val)
            } else {
                if (even && node.val <= levels[level]) ||
                   (!even && node.val >= levels[level]) {
                    return false
                }
                levels[level] = node.val
            }

            return dfs(node.left, level + 1) && dfs(node.right, level + 1)
        }

        return dfs(root, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Iterative DFS

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isEvenOddTree(self, root: Optional[TreeNode]) -> bool:
        stack = [(root, 0)]
        levels = []

        while stack:
            node, level = stack.pop()

            even = level % 2 == 0
            if ((even and node.val % 2 == 0) or
                (not even and node.val % 2 == 1)
            ):
                return False

            if len(levels) == level:
                levels.append(node.val)
            else:
                if ((even and node.val <= levels[level]) or
                    (not even and node.val >= levels[level])
                ):
                    return False
                levels[level] = node.val

            if node.right:
                stack.append((node.right, level + 1))
            if node.left:
                stack.append((node.left, level + 1))

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
    public boolean isEvenOddTree(TreeNode root) {
        Stack<Pair<TreeNode, Integer>> stack = new Stack<>();
        stack.push(new Pair<>(root, 0));
        List<Integer> levels = new ArrayList<>();

        while (!stack.isEmpty()) {
            Pair<TreeNode, Integer> pair = stack.pop();
            TreeNode node = pair.getKey();
            int level = pair.getValue();

            boolean even = level % 2 == 0;
            if ((even && node.val % 2 == 0) ||
                (!even && node.val % 2 == 1))
                return false;

            if (levels.size() == level) {
                levels.add(node.val);
            } else {
                if ((even && node.val <= levels.get(level)) ||
                    (!even && node.val >= levels.get(level)))
                    return false;
                levels.set(level, node.val);
            }

            if (node.right != null) stack.push(new Pair<>(node.right, level + 1));
            if (node.left != null) stack.push(new Pair<>(node.left, level + 1));
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
    bool isEvenOddTree(TreeNode* root) {
        stack<pair<TreeNode*, int>> stack;
        stack.push({root, 0});
        vector<int> levels;

        while (!stack.empty()) {
            auto [node, level] = stack.top();
            stack.pop();

            bool even = level % 2 == 0;
            if ((even && node->val % 2 == 0) ||
                (!even && node->val % 2 == 1))
                return false;

            if (levels.size() == level) {
                levels.push_back(node->val);
            } else {
                if ((even && node->val <= levels[level]) ||
                    (!even && node->val >= levels[level]))
                    return false;
                levels[level] = node->val;
            }

            if (node->right) stack.push({node->right, level + 1});
            if (node->left) stack.push({node->left, level + 1});
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
    isEvenOddTree(root) {
        const stack = [[root, 0]];
        const levels = [];

        while (stack.length) {
            const [node, level] = stack.pop();

            const even = level % 2 === 0;
            if ((even && node.val % 2 === 0) || (!even && node.val % 2 === 1))
                return false;

            if (levels.length === level) {
                levels.push(node.val);
            } else {
                if (
                    (even && node.val <= levels[level]) ||
                    (!even && node.val >= levels[level])
                )
                    return false;
                levels[level] = node.val;
            }

            if (node.right) stack.push([node.right, level + 1]);
            if (node.left) stack.push([node.left, level + 1]);
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
    public bool IsEvenOddTree(TreeNode root) {
        Stack<(TreeNode, int)> stack = new Stack<(TreeNode, int)>();
        stack.Push((root, 0));
        List<int> levels = new List<int>();

        while (stack.Count > 0) {
            var (node, level) = stack.Pop();

            bool even = level % 2 == 0;
            if ((even && node.val % 2 == 0) ||
                (!even && node.val % 2 == 1))
                return false;

            if (levels.Count == level) {
                levels.Add(node.val);
            } else {
                if ((even && node.val <= levels[level]) ||
                    (!even && node.val >= levels[level]))
                    return false;
                levels[level] = node.val;
            }

            if (node.right != null) stack.Push((node.right, level + 1));
            if (node.left != null) stack.Push((node.left, level + 1));
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
func isEvenOddTree(root *TreeNode) bool {
    type pair struct {
        node  *TreeNode
        level int
    }

    stack := []pair{{root, 0}}
    levels := []int{}

    for len(stack) > 0 {
        p := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        node, level := p.node, p.level

        even := level%2 == 0
        if (even && node.Val%2 == 0) || (!even && node.Val%2 == 1) {
            return false
        }

        if len(levels) == level {
            levels = append(levels, node.Val)
        } else {
            if (even && node.Val <= levels[level]) ||
                (!even && node.Val >= levels[level]) {
                return false
            }
            levels[level] = node.Val
        }

        if node.Right != nil {
            stack = append(stack, pair{node.Right, level + 1})
        }
        if node.Left != nil {
            stack = append(stack, pair{node.Left, level + 1})
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
    fun isEvenOddTree(root: TreeNode?): Boolean {
        val stack = ArrayDeque<Pair<TreeNode, Int>>()
        root?.let { stack.add(Pair(it, 0)) }
        val levels = mutableListOf<Int>()

        while (stack.isNotEmpty()) {
            val (node, level) = stack.removeLast()

            val even = level % 2 == 0
            if ((even && node.`val` % 2 == 0) ||
                (!even && node.`val` % 2 == 1))
                return false

            if (levels.size == level) {
                levels.add(node.`val`)
            } else {
                if ((even && node.`val` <= levels[level]) ||
                    (!even && node.`val` >= levels[level]))
                    return false
                levels[level] = node.`val`
            }

            node.right?.let { stack.add(Pair(it, level + 1)) }
            node.left?.let { stack.add(Pair(it, level + 1)) }
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
    func isEvenOddTree(_ root: TreeNode?) -> Bool {
        guard let root = root else { return true }

        var stack: [(TreeNode, Int)] = [(root, 0)]
        var levels = [Int]()

        while !stack.isEmpty {
            let (node, level) = stack.removeLast()

            let even = level % 2 == 0
            if (even && node.val % 2 == 0) || (!even && node.val % 2 == 1) {
                return false
            }

            if levels.count == level {
                levels.append(node.val)
            } else {
                if (even && node.val <= levels[level]) ||
                   (!even && node.val >= levels[level]) {
                    return false
                }
                levels[level] = node.val
            }

            if let right = node.right {
                stack.append((right, level + 1))
            }
            if let left = node.left {
                stack.append((left, level + 1))
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
