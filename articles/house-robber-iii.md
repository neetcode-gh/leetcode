## 1. Recursion

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rob(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        res = root.val
        if root.left:
            res += self.rob(root.left.left) + self.rob(root.left.right)
        if root.right:
            res += self.rob(root.right.left) + self.rob(root.right.right)

        res = max(res, self.rob(root.left) + self.rob(root.right))
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
    public int rob(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int res = root.val;
        if (root.left != null) {
            res += rob(root.left.left) + rob(root.left.right);
        }
        if (root.right != null) {
            res += rob(root.right.left) + rob(root.right.right);
        }

        res = Math.max(res, rob(root.left) + rob(root.right));
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
    int rob(TreeNode* root) {
        if (!root) {
            return 0;
        }

        int res = root->val;
        if (root->left) {
            res += rob(root->left->left) + rob(root->left->right);
        }
        if (root->right) {
            res += rob(root->right->left) + rob(root->right->right);
        }

        res = max(res, rob(root->left) + rob(root->right));
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
    rob(root) {
        if (!root) {
            return 0;
        }

        let res = root.val;
        if (root.left) {
            res += this.rob(root.left.left) + this.rob(root.left.right);
        }
        if (root.right) {
            res += this.rob(root.right.left) + this.rob(root.right.right);
        }

        res = Math.max(res, this.rob(root.left) + this.rob(root.right));
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
    public int Rob(TreeNode root) {
        if (root == null) return 0;

        int res = root.val;
        if (root.left != null) {
            res += Rob(root.left.left) + Rob(root.left.right);
        }
        if (root.right != null) {
            res += Rob(root.right.left) + Rob(root.right.right);
        }

        res = Math.Max(res, Rob(root.left) + Rob(root.right));
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
func rob(root *TreeNode) int {
    if root == nil {
        return 0
    }

    res := root.Val
    if root.Left != nil {
        res += rob(root.Left.Left) + rob(root.Left.Right)
    }
    if root.Right != nil {
        res += rob(root.Right.Left) + rob(root.Right.Right)
    }

    return max(res, rob(root.Left)+rob(root.Right))
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
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
    fun rob(root: TreeNode?): Int {
        if (root == null) return 0

        var res = root.`val`
        if (root.left != null) {
            res += rob(root.left?.left) + rob(root.left?.right)
        }
        if (root.right != null) {
            res += rob(root.right?.left) + rob(root.right?.right)
        }

        return maxOf(res, rob(root.left) + rob(root.right))
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
    func rob(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }

        var res = root.val
        if let left = root.left {
            res += rob(left.left) + rob(left.right)
        }
        if let right = root.right {
            res += rob(right.left) + rob(right.right)
        }

        return max(res, rob(root.left) + rob(root.right))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Memoization)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rob(self, root: Optional[TreeNode]) -> int:
        cache = { None : 0 }

        def dfs(root):
            if root in cache:
                return cache[root]

            cache[root] = root.val
            if root.left:
                cache[root] += dfs(root.left.left) + dfs(root.left.right)
            if root.right:
                cache[root] += dfs(root.right.left) + dfs(root.right.right)

            cache[root] = max(cache[root], dfs(root.left) + dfs(root.right))
            return cache[root]

        return dfs(root)
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
    private Map<TreeNode, Integer> cache;

    public int rob(TreeNode root) {
        cache = new HashMap<>();
        cache.put(null, 0);
        return dfs(root);
    }

    private int dfs(TreeNode root) {
        if (cache.containsKey(root)) {
            return cache.get(root);
        }

        int res = root.val;
        if (root.left != null) {
            res += dfs(root.left.left) + dfs(root.left.right);
        }
        if (root.right != null) {
            res += dfs(root.right.left) + dfs(root.right.right);
        }

        res = Math.max(res, dfs(root.left) + dfs(root.right));
        cache.put(root, res);
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
    unordered_map<TreeNode*, int> cache;

public:
    int rob(TreeNode* root) {
        cache[nullptr] = 0;
        return dfs(root);
    }

private:
    int dfs(TreeNode* root) {
        if (cache.find(root) != cache.end()) {
            return cache[root];
        }

        int res = root->val;
        if (root->left) {
            res += rob(root->left->left) + rob(root->left->right);
        }
        if (root->right) {
            res += rob(root->right->left) + rob(root->right->right);
        }

        res = max(res, rob(root->left) + rob(root->right));
        cache[root] = res;
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
    rob(root) {
        const cache = new Map();
        cache.set(null, 0);

        const dfs = (root) => {
            if (cache.has(root)) {
                return cache.get(root);
            }

            let res = root.val;
            if (root.left) {
                res += dfs(root.left.left) + dfs(root.left.right);
            }
            if (root.right) {
                res += dfs(root.right.left) + dfs(root.right.right);
            }

            res = Math.max(res, dfs(root.left) + dfs(root.right));
            cache.set(root, res);
            return res;
        };

        return dfs(root);
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
    private Dictionary<TreeNode, int> cache = new();

    public int Rob(TreeNode root) {
        return Dfs(root);
    }

    private int Dfs(TreeNode root) {
        if (root == null) return 0;
        if (cache.ContainsKey(root)) return cache[root];

        int res = root.val;
        if (root.left != null) {
            res += Dfs(root.left.left) + Dfs(root.left.right);
        }
        if (root.right != null) {
            res += Dfs(root.right.left) + Dfs(root.right.right);
        }

        res = Math.Max(res, Dfs(root.left) + Dfs(root.right));
        cache[root] = res;
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
func rob(root *TreeNode) int {
    cache := make(map[*TreeNode]int)

    var dfs func(node *TreeNode) int
    dfs = func(node *TreeNode) int {
        if node == nil {
            return 0
        }
        if val, ok := cache[node]; ok {
            return val
        }

        res := node.Val
        if node.Left != nil {
            res += dfs(node.Left.Left) + dfs(node.Left.Right)
        }
        if node.Right != nil {
            res += dfs(node.Right.Left) + dfs(node.Right.Right)
        }

        res = max(res, dfs(node.Left)+dfs(node.Right))
        cache[node] = res
        return res
    }

    return dfs(root)
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
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
    private val cache = HashMap<TreeNode?, Int>()

    fun rob(root: TreeNode?): Int {
        return dfs(root)
    }

    private fun dfs(root: TreeNode?): Int {
        if (root == null) return 0
        if (cache.containsKey(root)) return cache[root]!!

        var res = root.`val`
        if (root.left != null) {
            res += dfs(root.left?.left) + dfs(root.left?.right)
        }
        if (root.right != null) {
            res += dfs(root.right?.left) + dfs(root.right?.right)
        }

        res = maxOf(res, dfs(root.left) + dfs(root.right))
        cache[root] = res
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
    func rob(_ root: TreeNode?) -> Int {
        var cache = [ObjectIdentifier: Int]()

        func dfs(_ node: TreeNode?) -> Int {
            guard let node = node else { return 0 }
            let id = ObjectIdentifier(node)
            if let cached = cache[id] {
                return cached
            }

            var res = node.val
            if let left = node.left {
                res += dfs(left.left) + dfs(left.right)
            }
            if let right = node.right {
                res += dfs(right.left) + dfs(right.right)
            }

            res = max(res, dfs(node.left) + dfs(node.right))
            cache[id] = res
            return res
        }

        return dfs(root)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Optimal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rob(self, root: TreeNode) -> int:
        def dfs(root):
            if not root:
                return [0, 0]

            leftPair = dfs(root.left)
            rightPair = dfs(root.right)

            withRoot = root.val + leftPair[1] + rightPair[1]
            withoutRoot = max(leftPair) + max(rightPair)

            return [withRoot, withoutRoot]

        return max(dfs(root))
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
    public int rob(TreeNode root) {
        int[] result = dfs(root);
        return Math.max(result[0], result[1]);
    }

    private int[] dfs(TreeNode root) {
        if (root == null) {
            return new int[]{0, 0};
        }

        int[] leftPair = dfs(root.left);
        int[] rightPair = dfs(root.right);

        int withRoot = root.val + leftPair[1] + rightPair[1];
        int withoutRoot = Math.max(leftPair[0], leftPair[1]) +
                          Math.max(rightPair[0], rightPair[1]);

        return new int[]{withRoot, withoutRoot};
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
    int rob(TreeNode* root) {
        auto result = dfs(root);
        return max(result.first, result.second);
    }

private:
    pair<int, int> dfs(TreeNode* root) {
        if (!root) {
            return {0, 0};
        }

        auto leftPair = dfs(root->left);
        auto rightPair = dfs(root->right);

        int withRoot = root->val + leftPair.second + rightPair.second;
        int withoutRoot = max(leftPair.first, leftPair.second) +
                          max(rightPair.first, rightPair.second);

        return {withRoot, withoutRoot};
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
    rob(root) {
        const dfs = (node) => {
            if (!node) {
                return [0, 0];
            }

            const leftPair = dfs(node.left);
            const rightPair = dfs(node.right);

            const withRoot = node.val + leftPair[1] + rightPair[1];
            const withoutRoot = Math.max(...leftPair) + Math.max(...rightPair);

            return [withRoot, withoutRoot];
        };

        const result = dfs(root);
        return Math.max(...result);
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
    public int Rob(TreeNode root) {
        var result = Dfs(root);
        return Math.Max(result.withRoot, result.withoutRoot);
    }

    private (int withRoot, int withoutRoot) Dfs(TreeNode root) {
        if (root == null) return (0, 0);

        var left = Dfs(root.left);
        var right = Dfs(root.right);

        int withRoot = root.val + left.withoutRoot + right.withoutRoot;
        int withoutRoot = Math.Max(left.withRoot, left.withoutRoot) + Math.Max(right.withRoot, right.withoutRoot);

        return (withRoot, withoutRoot);
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
func rob(root *TreeNode) int {
    result := dfs(root)
    return max(result[0], result[1])
}

func dfs(root *TreeNode) [2]int {
    if root == nil {
        return [2]int{0, 0}
    }

    leftPair := dfs(root.Left)
    rightPair := dfs(root.Right)

    withRoot := root.Val + leftPair[1] + rightPair[1]
    withoutRoot := max(leftPair[0], leftPair[1]) + max(rightPair[0], rightPair[1])

    return [2]int{withRoot, withoutRoot}
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
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
    fun rob(root: TreeNode?): Int {
        val result = dfs(root)
        return maxOf(result[0], result[1])
    }

    private fun dfs(root: TreeNode?): IntArray {
        if (root == null) {
            return intArrayOf(0, 0)
        }

        val leftPair = dfs(root.left)
        val rightPair = dfs(root.right)

        val withRoot = root.`val` + leftPair[1] + rightPair[1]
        val withoutRoot = maxOf(leftPair[0], leftPair[1]) + maxOf(rightPair[0], rightPair[1])

        return intArrayOf(withRoot, withoutRoot)
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
    func rob(_ root: TreeNode?) -> Int {
        let result = dfs(root)
        return max(result.0, result.1)
    }

    private func dfs(_ root: TreeNode?) -> (Int, Int) {
        guard let root = root else {
            return (0, 0)
        }

        let leftPair = dfs(root.left)
        let rightPair = dfs(root.right)

        let withRoot = root.val + leftPair.1 + rightPair.1
        let withoutRoot = max(leftPair.0, leftPair.1) + max(rightPair.0, rightPair.1)

        return (withRoot, withoutRoot)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.
