## 1. Brute Force (DFS)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def minDiffInBST(self, root: Optional[TreeNode]) -> int:
        def dfs(node):
            if not node:
                return float("inf")
            res = dfs1(root, node)
            res = min(res, dfs(node.left))
            res = min(res, dfs(node.right))
            return res

        def dfs1(root, node):
            if not root:
                return float("inf")

            res = float("inf")
            if root != node:
                res = abs(root.val - node.val)
            res = min(res, dfs1(root.left, node))
            res = min(res, dfs1(root.right, node))
            return res

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
    public int minDiffInBST(TreeNode root) {
        return dfs(root, root);
    }

    private int dfs(TreeNode root, TreeNode node) {
        if (node == null) {
            return Integer.MAX_VALUE;
        }
        int res = dfs1(root, node);
        res = Math.min(res, dfs(root, node.left));
        res = Math.min(res, dfs(root, node.right));
        return res;
    }

    private int dfs1(TreeNode root, TreeNode node) {
        if (root == null) {
            return Integer.MAX_VALUE;
        }
        int res = Integer.MAX_VALUE;
        if (root != node) {
            res = Math.abs(root.val - node.val);
        }
        res = Math.min(res, dfs1(root.left, node));
        res = Math.min(res, dfs1(root.right, node));
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
    int minDiffInBST(TreeNode* root) {
        return dfs(root, root);
    }

private:
    int dfs(TreeNode* root, TreeNode* node) {
        if (!node) {
            return INT_MAX;
        }
        int res = dfs1(root, node);
        res = min(res, dfs(root, node->left));
        res = min(res, dfs(root, node->right));
        return res;
    }

    int dfs1(TreeNode* root, TreeNode* node) {
        if (!root) {
            return INT_MAX;
        }
        int res = INT_MAX;
        if (root != node) {
            res = abs(root->val - node->val);
        }
        res = min(res, dfs1(root->left, node));
        res = min(res, dfs1(root->right, node));
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
    minDiffInBST(root) {
        const dfs = (node) => {
            if (!node) {
                return Infinity;
            }
            let res = dfs1(root, node);
            res = Math.min(res, dfs(node.left));
            res = Math.min(res, dfs(node.right));
            return res;
        };

        const dfs1 = (root, node) => {
            if (!root) {
                return Infinity;
            }
            let res = Infinity;
            if (root !== node) {
                res = Math.abs(root.val - node.val);
            }
            res = Math.min(res, dfs1(root.left, node));
            res = Math.min(res, dfs1(root.right, node));
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
    public int MinDiffInBST(TreeNode root) {
        return Dfs(root, root);
    }

    private int Dfs(TreeNode root, TreeNode node) {
        if (node == null) return int.MaxValue;
        int res = Dfs1(root, node);
        res = Math.Min(res, Dfs(root, node.left));
        res = Math.Min(res, Dfs(root, node.right));
        return res;
    }

    private int Dfs1(TreeNode root, TreeNode node) {
        if (root == null) return int.MaxValue;
        int res = int.MaxValue;
        if (root != node) {
            res = Math.Abs(root.val - node.val);
        }
        res = Math.Min(res, Dfs1(root.left, node));
        res = Math.Min(res, Dfs1(root.right, node));
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
func minDiffInBST(root *TreeNode) int {
    var dfs func(node *TreeNode) int
    var dfs1 func(r, node *TreeNode) int

    dfs1 = func(r, node *TreeNode) int {
        if r == nil {
            return math.MaxInt32
        }
        res := math.MaxInt32
        if r != node {
            res = abs(r.Val - node.Val)
        }
        res = min(res, dfs1(r.Left, node))
        res = min(res, dfs1(r.Right, node))
        return res
    }

    dfs = func(node *TreeNode) int {
        if node == nil {
            return math.MaxInt32
        }
        res := dfs1(root, node)
        res = min(res, dfs(node.Left))
        res = min(res, dfs(node.Right))
        return res
    }

    return dfs(root)
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}

func min(a, b int) int {
    if a < b {
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
    fun minDiffInBST(root: TreeNode?): Int {
        return dfs(root, root)
    }

    private fun dfs(root: TreeNode?, node: TreeNode?): Int {
        if (node == null) return Int.MAX_VALUE
        var res = dfs1(root, node)
        res = minOf(res, dfs(root, node.left))
        res = minOf(res, dfs(root, node.right))
        return res
    }

    private fun dfs1(root: TreeNode?, node: TreeNode?): Int {
        if (root == null) return Int.MAX_VALUE
        var res = Int.MAX_VALUE
        if (root !== node) {
            res = kotlin.math.abs(root.`val` - node!!.`val`)
        }
        res = minOf(res, dfs1(root.left, node))
        res = minOf(res, dfs1(root.right, node))
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
    func minDiffInBST(_ root: TreeNode?) -> Int {
        return dfs(root, root)
    }

    private func dfs(_ root: TreeNode?, _ node: TreeNode?) -> Int {
        guard let node = node else { return Int.max }
        var res = dfs1(root, node)
        res = min(res, dfs(root, node.left))
        res = min(res, dfs(root, node.right))
        return res
    }

    private func dfs1(_ root: TreeNode?, _ node: TreeNode) -> Int {
        guard let root = root else { return Int.max }
        var res = Int.max
        if root !== node {
            res = abs(root.val - node.val)
        }
        res = min(res, dfs1(root.left, node))
        res = min(res, dfs1(root.right, node))
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Inorder Traversal

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def minDiffInBST(self, root: Optional[TreeNode]) -> int:
        arr = []

        def dfs(node):
            if not node:
                return
            dfs(node.left)
            arr.append(node.val)
            dfs(node.right)

        dfs(root)
        res = arr[1] - arr[0]
        for i in range(2, len(arr)):
            res = min(res, arr[i] - arr[i - 1])
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
    public int minDiffInBST(TreeNode root) {
        List<Integer> arr = new ArrayList<>();

        dfs(root, arr);
        int res = arr.get(1) - arr.get(0);
        for (int i = 2; i < arr.size(); i++) {
            res = Math.min(res, arr.get(i) - arr.get(i - 1));
        }
        return res;
    }

    private void dfs(TreeNode node, List<Integer> arr) {
        if (node == null) {
            return;
        }
        dfs(node.left, arr);
        arr.add(node.val);
        dfs(node.right, arr);
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
    int minDiffInBST(TreeNode* root) {
        vector<int> arr;
        dfs(root, arr);

        int res = arr[1] - arr[0];
        for (int i = 2; i < arr.size(); i++) {
            res = min(res, arr[i] - arr[i - 1]);
        }
        return res;
    }

private:
    void dfs(TreeNode* node, vector<int>& arr) {
        if (!node) return;
        dfs(node->left, arr);
        arr.push_back(node->val);
        dfs(node->right, arr);
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
    minDiffInBST(root) {
        const arr = [];

        const dfs = (node) => {
            if (!node) return;
            dfs(node.left);
            arr.push(node.val);
            dfs(node.right);
        };

        dfs(root);
        let res = arr[1] - arr[0];
        for (let i = 2; i < arr.length; i++) {
            res = Math.min(res, arr[i] - arr[i - 1]);
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
    public int MinDiffInBST(TreeNode root) {
        List<int> arr = new List<int>();
        Dfs(root, arr);

        int res = arr[1] - arr[0];
        for (int i = 2; i < arr.Count; i++) {
            res = Math.Min(res, arr[i] - arr[i - 1]);
        }
        return res;
    }

    private void Dfs(TreeNode node, List<int> arr) {
        if (node == null) return;
        Dfs(node.left, arr);
        arr.Add(node.val);
        Dfs(node.right, arr);
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
func minDiffInBST(root *TreeNode) int {
    var arr []int

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }
        dfs(node.Left)
        arr = append(arr, node.Val)
        dfs(node.Right)
    }

    dfs(root)
    res := arr[1] - arr[0]
    for i := 2; i < len(arr); i++ {
        res = min(res, arr[i]-arr[i-1])
    }
    return res
}

func min(a, b int) int {
    if a < b {
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
    fun minDiffInBST(root: TreeNode?): Int {
        val arr = mutableListOf<Int>()

        fun dfs(node: TreeNode?) {
            if (node == null) return
            dfs(node.left)
            arr.add(node.`val`)
            dfs(node.right)
        }

        dfs(root)
        var res = arr[1] - arr[0]
        for (i in 2 until arr.size) {
            res = minOf(res, arr[i] - arr[i - 1])
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
    func minDiffInBST(_ root: TreeNode?) -> Int {
        var arr = [Int]()

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }
            dfs(node.left)
            arr.append(node.val)
            dfs(node.right)
        }

        dfs(root)
        var res = arr[1] - arr[0]
        for i in 2..<arr.count {
            res = min(res, arr[i] - arr[i - 1])
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

## 3. Inorder Traversal (Space Optimized)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def minDiffInBST(self, root: Optional[TreeNode]) -> int:
        prev, res = None, float("inf")

        def dfs(node):
            nonlocal prev, res
            if not node:
                return

            dfs(node.left)
            if prev:
                res = min(res, node.val - prev.val)
            prev = node
            dfs(node.right)

        dfs(root)
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
    private TreeNode prev = null;
    private int res = Integer.MAX_VALUE;

    public int minDiffInBST(TreeNode root) {
        dfs(root);
        return res;
    }

    private void dfs(TreeNode node) {
        if (node == null) return;

        dfs(node.left);
        if (prev != null) {
            res = Math.min(res, node.val - prev.val);
        }
        prev = node;
        dfs(node.right);
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
    int minDiffInBST(TreeNode* root) {
        TreeNode* prev = nullptr;
        int res = INT_MAX;

        dfs(root, prev, res);
        return res;
    }

private:
    void dfs(TreeNode* node, TreeNode*& prev, int& res) {
        if (!node) return;

        dfs(node->left, prev, res);
        if (prev) {
            res = min(res, node->val - prev->val);
        }
        prev = node;
        dfs(node->right, prev, res);
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
    minDiffInBST(root) {
        let prev = null;
        let res = Infinity;

        const dfs = (node) => {
            if (!node) return;

            dfs(node.left);
            if (prev !== null) {
                res = Math.min(res, node.val - prev.val);
            }
            prev = node;
            dfs(node.right);
        };

        dfs(root);
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
    private TreeNode prev = null;
    private int res = int.MaxValue;

    public int MinDiffInBST(TreeNode root) {
        Dfs(root);
        return res;
    }

    private void Dfs(TreeNode node) {
        if (node == null) return;

        Dfs(node.left);
        if (prev != null) {
            res = Math.Min(res, node.val - prev.val);
        }
        prev = node;
        Dfs(node.right);
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
func minDiffInBST(root *TreeNode) int {
    var prev *TreeNode
    res := math.MaxInt32

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }

        dfs(node.Left)
        if prev != nil {
            res = min(res, node.Val-prev.Val)
        }
        prev = node
        dfs(node.Right)
    }

    dfs(root)
    return res
}

func min(a, b int) int {
    if a < b {
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
    private var prev: TreeNode? = null
    private var res = Int.MAX_VALUE

    fun minDiffInBST(root: TreeNode?): Int {
        dfs(root)
        return res
    }

    private fun dfs(node: TreeNode?) {
        if (node == null) return

        dfs(node.left)
        prev?.let {
            res = minOf(res, node.`val` - it.`val`)
        }
        prev = node
        dfs(node.right)
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
    func minDiffInBST(_ root: TreeNode?) -> Int {
        var prev: TreeNode? = nil
        var res = Int.max

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }

            dfs(node.left)
            if let p = prev {
                res = min(res, node.val - p.val)
            }
            prev = node
            dfs(node.right)
        }

        dfs(root)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 4. Iterative DFS (Inorder Traversal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def minDiffInBST(self, root: Optional[TreeNode]) -> int:
        stack, prev, res = [], None, float("inf")
        cur = root

        while stack or cur:
            while cur:
                stack.append(cur)
                cur = cur.left

            cur = stack.pop()
            if prev:
                res = min(res, cur.val - prev.val)
            prev = cur
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
    public int minDiffInBST(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode prev = null;
        int res = Integer.MAX_VALUE;
        TreeNode cur = root;

        while (!stack.isEmpty() || cur != null) {
            while (cur != null) {
                stack.push(cur);
                cur = cur.left;
            }

            cur = stack.pop();
            if (prev != null) {
                res = Math.min(res, cur.val - prev.val);
            }
            prev = cur;
            cur = cur.right;
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
    int minDiffInBST(TreeNode* root) {
        stack<TreeNode*> st;
        TreeNode* prev = nullptr;
        TreeNode* cur = root;
        int res = INT_MAX;

        while (!st.empty() || cur) {
            while (cur) {
                st.push(cur);
                cur = cur->left;
            }

            cur = st.top();
            st.pop();
            if (prev) {
                res = min(res, cur->val - prev->val);
            }
            prev = cur;
            cur = cur->right;
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
    minDiffInBST(root) {
        let stack = [];
        let prev = null;
        let res = Infinity;
        let cur = root;

        while (stack.length > 0 || cur !== null) {
            while (cur !== null) {
                stack.push(cur);
                cur = cur.left;
            }

            cur = stack.pop();
            if (prev !== null) {
                res = Math.min(res, cur.val - prev.val);
            }
            prev = cur;
            cur = cur.right;
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
    public int MinDiffInBST(TreeNode root) {
        Stack<TreeNode> stack = new Stack<TreeNode>();
        TreeNode prev = null;
        int res = int.MaxValue;
        TreeNode cur = root;

        while (stack.Count > 0 || cur != null) {
            while (cur != null) {
                stack.Push(cur);
                cur = cur.left;
            }

            cur = stack.Pop();
            if (prev != null) {
                res = Math.Min(res, cur.val - prev.val);
            }
            prev = cur;
            cur = cur.right;
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
func minDiffInBST(root *TreeNode) int {
    stack := []*TreeNode{}
    var prev *TreeNode
    res := math.MaxInt32
    cur := root

    for len(stack) > 0 || cur != nil {
        for cur != nil {
            stack = append(stack, cur)
            cur = cur.Left
        }

        cur = stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        if prev != nil {
            res = min(res, cur.Val-prev.Val)
        }
        prev = cur
        cur = cur.Right
    }

    return res
}

func min(a, b int) int {
    if a < b {
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
    fun minDiffInBST(root: TreeNode?): Int {
        val stack = ArrayDeque<TreeNode>()
        var prev: TreeNode? = null
        var res = Int.MAX_VALUE
        var cur = root

        while (stack.isNotEmpty() || cur != null) {
            while (cur != null) {
                stack.addLast(cur)
                cur = cur.left
            }

            cur = stack.removeLast()
            prev?.let {
                res = minOf(res, cur!!.`val` - it.`val`)
            }
            prev = cur
            cur = cur?.right
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
    func minDiffInBST(_ root: TreeNode?) -> Int {
        var stack = [TreeNode]()
        var prev: TreeNode? = nil
        var res = Int.max
        var cur = root

        while !stack.isEmpty || cur != nil {
            while cur != nil {
                stack.append(cur!)
                cur = cur?.left
            }

            cur = stack.removeLast()
            if let p = prev {
                res = min(res, cur!.val - p.val)
            }
            prev = cur
            cur = cur?.right
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

## 5. Morris Traversal

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def minDiffInBST(self, root: Optional[TreeNode]) -> int:
        prevVal = res = float("inf")
        cur = root

        while cur:
            if not cur.left:
                if prevVal != float("inf"):
                    res = min(res, cur.val - prevVal)
                prevVal = cur.val
                cur = cur.right
            else:
                prev = cur.left
                while prev.right and prev.right != cur:
                    prev = prev.right

                if not prev.right:
                    prev.right = cur
                    cur = cur.left
                else:
                    prev.right = None
                    if prevVal != float("inf"):
                        res = min(res, cur.val - prevVal)
                    prevVal = cur.val
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
    public int minDiffInBST(TreeNode root) {
        int prevVal = Integer.MAX_VALUE, res = Integer.MAX_VALUE;
        TreeNode cur = root;

        while (cur != null) {
            if (cur.left == null) {
                if (prevVal != Integer.MAX_VALUE) {
                    res = Math.min(res, cur.val - prevVal);
                }
                prevVal = cur.val;
                cur = cur.right;
            } else {
                TreeNode prev = cur.left;
                while (prev.right != null && prev.right != cur) {
                    prev = prev.right;
                }

                if (prev.right == null) {
                    prev.right = cur;
                    cur = cur.left;
                } else {
                    prev.right = null;
                    if (prevVal != Integer.MAX_VALUE) {
                        res = Math.min(res, cur.val - prevVal);
                    }
                    prevVal = cur.val;
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
    int minDiffInBST(TreeNode* root) {
        int prevVal = INT_MAX, res = INT_MAX;
        TreeNode* cur = root;

        while (cur) {
            if (!cur->left) {
                if (prevVal != INT_MAX) {
                    res = min(res, cur->val - prevVal);
                }
                prevVal = cur->val;
                cur = cur->right;
            } else {
                TreeNode* prev = cur->left;
                while (prev->right && prev->right != cur) {
                    prev = prev->right;
                }

                if (!prev->right) {
                    prev->right = cur;
                    cur = cur->left;
                } else {
                    prev->right = nullptr;
                    if (prevVal != INT_MAX) {
                        res = min(res, cur->val - prevVal);
                    }
                    prevVal = cur->val;
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
    minDiffInBST(root) {
        let prevVal = Infinity,
            res = Infinity;
        let cur = root;

        while (cur !== null) {
            if (cur.left === null) {
                if (prevVal !== Infinity) {
                    res = Math.min(res, cur.val - prevVal);
                }
                prevVal = cur.val;
                cur = cur.right;
            } else {
                let prev = cur.left;
                while (prev.right !== null && prev.right !== cur) {
                    prev = prev.right;
                }

                if (prev.right === null) {
                    prev.right = cur;
                    cur = cur.left;
                } else {
                    prev.right = null;
                    if (prevVal !== Infinity) {
                        res = Math.min(res, cur.val - prevVal);
                    }
                    prevVal = cur.val;
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
    public int MinDiffInBST(TreeNode root) {
        int prevVal = int.MaxValue, res = int.MaxValue;
        TreeNode cur = root;

        while (cur != null) {
            if (cur.left == null) {
                if (prevVal != int.MaxValue) {
                    res = Math.Min(res, cur.val - prevVal);
                }
                prevVal = cur.val;
                cur = cur.right;
            } else {
                TreeNode prev = cur.left;
                while (prev.right != null && prev.right != cur) {
                    prev = prev.right;
                }

                if (prev.right == null) {
                    prev.right = cur;
                    cur = cur.left;
                } else {
                    prev.right = null;
                    if (prevVal != int.MaxValue) {
                        res = Math.Min(res, cur.val - prevVal);
                    }
                    prevVal = cur.val;
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
func minDiffInBST(root *TreeNode) int {
    prevVal := math.MaxInt32
    res := math.MaxInt32
    cur := root

    for cur != nil {
        if cur.Left == nil {
            if prevVal != math.MaxInt32 {
                res = min(res, cur.Val-prevVal)
            }
            prevVal = cur.Val
            cur = cur.Right
        } else {
            prev := cur.Left
            for prev.Right != nil && prev.Right != cur {
                prev = prev.Right
            }

            if prev.Right == nil {
                prev.Right = cur
                cur = cur.Left
            } else {
                prev.Right = nil
                if prevVal != math.MaxInt32 {
                    res = min(res, cur.Val-prevVal)
                }
                prevVal = cur.Val
                cur = cur.Right
            }
        }
    }

    return res
}

func min(a, b int) int {
    if a < b {
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
    fun minDiffInBST(root: TreeNode?): Int {
        var prevVal = Int.MAX_VALUE
        var res = Int.MAX_VALUE
        var cur = root

        while (cur != null) {
            if (cur.left == null) {
                if (prevVal != Int.MAX_VALUE) {
                    res = minOf(res, cur.`val` - prevVal)
                }
                prevVal = cur.`val`
                cur = cur.right
            } else {
                var prev = cur.left
                while (prev?.right != null && prev.right != cur) {
                    prev = prev.right
                }

                if (prev?.right == null) {
                    prev?.right = cur
                    cur = cur.left
                } else {
                    prev.right = null
                    if (prevVal != Int.MAX_VALUE) {
                        res = minOf(res, cur.`val` - prevVal)
                    }
                    prevVal = cur.`val`
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
    func minDiffInBST(_ root: TreeNode?) -> Int {
        var prevVal = Int.max
        var res = Int.max
        var cur = root

        while cur != nil {
            if cur!.left == nil {
                if prevVal != Int.max {
                    res = min(res, cur!.val - prevVal)
                }
                prevVal = cur!.val
                cur = cur!.right
            } else {
                var prev = cur!.left
                while prev!.right != nil && prev!.right !== cur {
                    prev = prev!.right
                }

                if prev!.right == nil {
                    prev!.right = cur
                    cur = cur!.left
                } else {
                    prev!.right = nil
                    if prevVal != Int.max {
                        res = min(res, cur!.val - prevVal)
                    }
                    prevVal = cur!.val
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
